import { useCallback, useEffect, useState } from 'react';
import { Mail, Trash2, RefreshCw, AlertCircle, Loader2, Inbox } from 'lucide-react';
import { SectionHeading } from '@/admin/ui';
import { authFetch } from '@/lib/adminApi';

interface Mensaje {
  id: number;
  nombre: string;
  correo: string;
  mensaje: string;
  fecha: string;
}

export default function MensajesTab() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await authFetch('/api/contacto');
      if (!res.ok) throw new Error('No se pudieron cargar los mensajes');
      const json = await res.json();
      setMensajes(json.mensajes ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar los mensajes');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      const res = await authFetch(`/api/contacto/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('No se pudo eliminar');
      setMensajes((prev) => prev.filter((m) => m.id !== id));
    } catch {
      setError('No se pudo eliminar el mensaje');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <SectionHeading
          title="Mensajes de contacto"
          description="Los mensajes que los visitantes envían desde el formulario de contacto."
        />
        <button
          onClick={load}
          disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-teal-400/50 hover:text-teal-300 disabled:opacity-50"
        >
          <RefreshCw size={13} className={loading ? 'animate-spin' : ''} /> Actualizar
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {loading && mensajes.length === 0 ? (
        <div className="flex items-center justify-center py-16 text-slate-500">
          <Loader2 size={22} className="animate-spin mr-2" /> Cargando mensajes...
        </div>
      ) : mensajes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-slate-500 gap-2">
          <Inbox size={32} className="text-slate-600" />
          <p className="text-sm">Aún no hay mensajes de contacto.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {mensajes.map((m) => (
            <div
              key={m.id}
              className="rounded-xl border border-slate-800 bg-slate-900/50 p-5"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 shrink-0">
                    <Mail size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-200 truncate">{m.nombre}</p>
                    <a
                      href={`mailto:${m.correo}`}
                      className="text-xs text-teal-400 hover:text-teal-300 transition-colors"
                    >
                      {m.correo}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-slate-600 whitespace-nowrap">{m.fecha}</span>
                  <button
                    onClick={() => handleDelete(m.id)}
                    disabled={deletingId === m.id}
                    className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 transition-colors disabled:opacity-50"
                  >
                    <Trash2 size={13} />
                    {deletingId === m.id ? 'Eliminando...' : 'Eliminar'}
                  </button>
                </div>
              </div>
              <p className="text-sm text-slate-300 whitespace-pre-wrap break-words">{m.mensaje}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}