import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import multer from 'multer';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOAD_DIR = path.join(__dirname, 'uploads');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const PORT = Number(process.env.PORT) || 3001;
const __root = path.resolve(__dirname, '..');
const DIST_DIR = path.join(__root, 'dist');

const pool = mysql.createPool({
  host: process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
  port: Number(process.env.MYSQLPORT || process.env.DB_PORT) || 3306,
  user: process.env.MYSQLUSER || process.env.DB_USER || 'root',
  password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '',
  database: process.env.MYSQLDATABASE || process.env.DB_NAME || 'portafolioK',
  waitForConnections: true,
  connectionLimit: 10,
});

async function ensureTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS visitas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      fecha_visita DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      ip VARCHAR(45) DEFAULT NULL,
      user_agent VARCHAR(512) DEFAULT NULL
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS mensajes_contacto (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(200) NOT NULL,
      correo VARCHAR(200) NOT NULL,
      mensaje TEXT NOT NULL,
      fecha_envio DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS site_content (
      id VARCHAR(50) PRIMARY KEY,
      content LONGTEXT NOT NULL,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
}

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use('/uploads', express.static(UPLOAD_DIR));

// Sirve el frontend compilado (Vite -> dist) si existe.
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
    filename: (_req, file, cb) => {
      const ext = (file.originalname.split('.').pop() || 'jpg').toLowerCase();
      cb(null, `perfil-${Date.now()}.${ext}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Solo se permiten imágenes'));
  },
});

// ---------- Seguridad del panel administrativo ----------

const TOKEN_TTL_MS = 12 * 60 * 60 * 1000; // 12 horas
const adminSecret = () => process.env.ADMIN_SECRET || '';

function sign(data) {
  return crypto
    .createHmac('sha256', adminSecret())
    .update(data)
    .digest('base64url');
}

function createToken(payload) {
  const body = Buffer.from(JSON.stringify({ ...payload, exp: Date.now() + TOKEN_TTL_MS })).toString(
    'base64url'
  );
  return `${body}.${sign(body)}`;
}

function verifyToken(token) {
  if (!token || !adminSecret()) return false;
  try {
    const [body, sig] = token.split('.');
    if (!body || !sig) return false;
    const expected = Buffer.from(sign(body));
    const received = Buffer.from(sig);
    if (received.length !== expected.length || !crypto.timingSafeEqual(received, expected)) {
      return false;
    }
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    return typeof payload.exp === 'number' && payload.exp > Date.now();
  } catch {
    return false;
  }
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!verifyToken(token)) {
    return res.status(401).json({ ok: false, error: 'No autorizado' });
  }
  next();
}

function ipCliente(req) {
  return (req.headers['x-forwarded-for'] ?? req.ip ?? '').toString().split(',')[0].trim() || 'unknown';
}

const loginAttempts = new Map();
const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

app.post('/api/login', (req, res) => {
  const ip = ipCliente(req);
  const now = Date.now();
  const rec = loginAttempts.get(ip) || { failures: 0, first: now };

  if (rec.failures >= MAX_LOGIN_ATTEMPTS && now - rec.first < LOGIN_WINDOW_MS) {
    return res.status(429).json({ ok: false, error: 'Demasiados intentos. Espera unos minutos.' });
  }

  const username = String(req.body?.username ?? '');
  const password = String(req.body?.password ?? '');
  const esperadoUser = process.env.ADMIN_USER || '';
  const esperadoPass = process.env.ADMIN_PASS || '';

  const h = (s) => crypto.createHash('sha256').update(s).digest();
  const okUser = crypto.timingSafeEqual(h(username), h(esperadoUser));
  const okPass = crypto.timingSafeEqual(h(password), h(esperadoPass));

  if (!okUser || !okPass) {
    if (now - rec.first > LOGIN_WINDOW_MS) {
      loginAttempts.set(ip, { failures: 1, first: now });
    } else {
      loginAttempts.set(ip, { failures: rec.failures + 1, first: rec.first });
    }
    return res.status(401).json({ ok: false, error: 'Usuario o contraseña incorrectos' });
  }

  loginAttempts.delete(ip);
  res.json({ ok: true, token: createToken({ user: username }) });
});

app.get('/api/verify', (req, res) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (verifyToken(token)) return res.json({ ok: true });
  res.status(401).json({ ok: false });
});

app.get('/api/contenido', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, content, updated_at FROM site_content WHERE id = ?', [
      'main',
    ]);
    if (rows.length === 0) {
      return res.json({ content: null, updated_at: null });
    }
    res.json({ content: JSON.parse(rows[0].content), updated_at: fmtFechaHoraLocal(rows[0].updated_at) });
  } catch (err) {
    console.error('Error al leer el contenido del sitio:', err);
    res.status(500).json({ ok: false, error: 'No se pudo leer el contenido' });
  }
});

app.put('/api/contenido', requireAuth, async (req, res) => {
  try {
    const content = req.body?.content;
    if (!content || typeof content !== 'object') {
      return res.status(400).json({ ok: false, error: 'Contenido inválido' });
    }
    await pool.query(
      `INSERT INTO site_content (id, content, updated_at) VALUES ('main', ?, NOW())
       ON DUPLICATE KEY UPDATE content = VALUES(content), updated_at = NOW()`,
      [JSON.stringify(content)]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error('Error al guardar el contenido del sitio:', err);
    res.status(500).json({ ok: false, error: 'No se pudo guardar el contenido' });
  }
});

app.post('/api/foto', requireAuth, upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ ok: false, error: 'No se recibió el archivo o no es una imagen' });
  }
  try {
    const oldFiles = fs
      .readdirSync(UPLOAD_DIR)
      .filter((f) => f.startsWith('perfil-') && f !== req.file.filename);
    for (const f of oldFiles) {
      try {
        fs.unlinkSync(path.join(UPLOAD_DIR, f));
      } catch {
        /* ignora archivos que no se puedan borrar */
      }
    }
  } catch {
    /* el directorio no existe o no se pudo leer */
  }
  res.json({ ok: true, url: `/uploads/${req.file.filename}` });
});

app.post('/api/contacto', async (req, res) => {
  try {
    const name = String(req.body?.name ?? '').trim().slice(0, 200);
    const correo = String(req.body?.email ?? '').trim().slice(0, 200);
    const message = String(req.body?.message ?? '').trim().slice(0, 5000);

    if (!name || !correo || !message) {
      return res.status(400).json({ ok: false, error: 'Todos los campos son obligatorios' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      return res.status(400).json({ ok: false, error: 'El correo no es válido' });
    }

    await pool.query(
      'INSERT INTO mensajes_contacto (nombre, correo, mensaje) VALUES (?, ?, ?)',
      [name, correo, message]
    );

    res.json({ ok: true });
  } catch (err) {
    console.error('Error al procesar el mensaje:', err);
    res.status(500).json({ ok: false, error: 'No se pudo enviar el mensaje' });
  }
});

app.get('/api/contacto', requireAuth, async (_req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, nombre, correo, mensaje, fecha_envio FROM mensajes_contacto ORDER BY fecha_envio DESC'
    );
    const mensajes = rows.map((r) => ({
      id: r.id,
      nombre: r.nombre,
      correo: r.correo,
      mensaje: r.mensaje,
      fecha: fmtFechaHoraLocal(r.fecha_envio),
    }));
    res.json({ mensajes });
  } catch (err) {
    console.error('Error al leer los mensajes:', err);
    res.status(500).json({ ok: false, error: 'No se pudieron leer los mensajes' });
  }
});

app.delete('/api/contacto/:id', requireAuth, async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ ok: false, error: 'Id inválido' });
    }
    await pool.query('DELETE FROM mensajes_contacto WHERE id = ?', [id]);
    res.json({ ok: true });
  } catch (err) {
    console.error('Error al eliminar el mensaje:', err);
    res.status(500).json({ ok: false, error: 'No se pudo eliminar el mensaje' });
  }
});

app.post('/api/visitas', async (req, res) => {
  try {
    const ip =
      (req.headers['x-forwarded-for'] ?? req.ip ?? '').toString().split(',')[0].trim() || null;
    const userAgent = (req.headers['user-agent'] ?? '').toString().slice(0, 512) || null;

    await pool.query('INSERT INTO visitas (fecha_visita, ip, user_agent) VALUES (NOW(), ?, ?)', [
      ip,
      userAgent,
    ]);
    res.json({ ok: true });
  } catch (err) {
    console.error('Error al registrar visita:', err);
    res.status(500).json({ ok: false, error: 'No se pudo registrar la visita' });
  }
});

app.get('/api/visitas/contador', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT COUNT(*) AS total FROM visitas');
    res.json({ total: Number(rows[0].total) });
  } catch (err) {
    console.error('Error al leer el contador de visitas:', err);
    res.status(500).json({ ok: false, error: 'No se pudo leer el contador' });
  }
});

function fmtFechaLocal(d) {
  if (d instanceof Date && !isNaN(d)) {
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }
  return String(d).slice(0, 10);
}

function fmtFechaHoraLocal(d) {
  if (d instanceof Date && !isNaN(d)) {
    const pad = (n) => String(n).padStart(2, '0');
    return `${fmtFechaLocal(d)} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }
  return String(d);
}

app.get('/api/visitas/detalle', requireAuth, async (_req, res) => {
  try {
    const [totalRows] = await pool.query('SELECT COUNT(*) AS total FROM visitas');
    const total = Number(totalRows[0].total);

    const [todayRows] = await pool.query(
      'SELECT COUNT(*) AS total FROM visitas WHERE DATE(fecha_visita) = CURDATE()'
    );
    const hoy = Number(todayRows[0].total);

    const [ipsRows] = await pool.query('SELECT COUNT(DISTINCT ip) AS total FROM visitas WHERE ip IS NOT NULL');
    const visitantes = Number(ipsRows[0].total);

    const [seriesRows] = await pool.query(`
      SELECT DATE(fecha_visita) AS fecha, COUNT(*) AS total
      FROM visitas
      WHERE fecha_visita >= DATE_SUB(CURDATE(), INTERVAL 13 DAY)
      GROUP BY DATE(fecha_visita)
      ORDER BY fecha ASC
    `);
    const serie = seriesRows.map((r) => ({
      fecha: fmtFechaLocal(r.fecha),
      total: Number(r.total),
    }));

    const [recentRows] = await pool.query(
      'SELECT id, fecha_visita, ip, user_agent FROM visitas ORDER BY fecha_visita DESC LIMIT 20'
    );
    const recientes = recentRows.map((r) => ({
      id: r.id,
      fecha: fmtFechaHoraLocal(r.fecha_visita),
      ip: r.ip,
      userAgent: r.user_agent,
    }));

    res.json({ total, hoy, visitantes, serie, recientes });
  } catch (err) {
    console.error('Error al leer detalle de visitas:', err);
    res.status(500).json({ ok: false, error: 'No se pudieron leer las visitas' });
  }
});

// Fallback SPA: cualquier ruta que no sea una API ni un archivo existente
// devuelve el index.html del frontend (para que /key05adminadmin funcione al recargar).
if (fs.existsSync(DIST_DIR)) {
  app.get(/\/(?!api\/|uploads\/).*/, (_req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });
}

app.listen(PORT, async () => {
  try {
    await ensureTable();
    console.log(`Servidor listo en http://localhost:${PORT} (tabla "visitas" asegurada)`);
  } catch (err) {
    console.error(`No se pudo conectar a MySQL o crear la tabla: ${err.message}`);
    console.error('Revisa las credenciales en server/.env');
  }
});