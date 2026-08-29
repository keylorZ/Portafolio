import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { defaultContent } from '@/data/profile';
import type { SiteContent } from '@/types/content';
import { authFetch, getAdminToken, setAdminToken } from '@/lib/adminApi';

interface SiteContentContextValue {
  content: SiteContent;
  loading: boolean;
  saving: boolean;
  error: string | null;
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  saveContent: (next: SiteContent) => Promise<boolean>;
  uploadPhoto: (file: File) => Promise<boolean>;
  removePhoto: () => Promise<boolean>;
  refresh: () => Promise<void>;
}

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!getAdminToken()) return;
    setIsAdmin(true);
    // Valida que la sesión siga siendo válida en el servidor.
    authFetch('/api/verify')
      .then((res) => {
        if (!res.ok) {
          setAdminToken(null);
          setIsAdmin(false);
        }
      })
      .catch(() => {
        // Sin conexión: se mantiene la sesión; el backend rechazará cualquier intento real.
      });
  }, []);

  const fetchContent = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/contenido');
      if (res.ok) {
        const data = await res.json();
        if (data?.content) {
          const merged: SiteContent = {
            ...defaultContent,
            ...(data.content as Partial<SiteContent>),
            personalInfo: {
              ...defaultContent.personalInfo,
              ...((data.content as Partial<SiteContent>).personalInfo ?? {}),
            },
          };
          setContent(merged);
        }
      }
    } catch {
      // El servidor puede no estar disponible; no romper el sitio.
    }
    // Si no hay fila guardada todavía, seguimos mostrando el contenido por defecto.
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const login = useCallback(async (username: string, password: string) => {
    setError(null);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        if (res.status === 429) {
          setError('Demasiados intentos. Espera unos minutos e intenta de nuevo.');
        } else {
          setError('Usuario o contraseña incorrectos.');
        }
        return false;
      }
      const data = await res.json();
      setAdminToken(data.token);
      setIsAdmin(true);
      return true;
    } catch {
      setError('No se pudo conectar con el servidor. Intenta de nuevo.');
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setAdminToken(null);
    setIsAdmin(false);
  }, []);

  const saveContent = useCallback(async (next: SiteContent) => {
    setSaving(true);
    setError(null);
    try {
      const res = await authFetch('/api/contenido', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: next }),
      });
      if (!res.ok) throw new Error('El servidor respondió con un error');
    } catch (err) {
      setSaving(false);
      setError(
        'No se pudo guardar en la base de datos. Verifica que el servidor esté corriendo. (' +
          (err instanceof Error ? err.message : 'error') +
          ')'
      );
      return false;
    }
    setSaving(false);
    setContent(next);
    return true;
  }, []);

  const uploadPhoto = useCallback(
    async (file: File) => {
      setSaving(true);
      setError(null);
      try {
        const form = new FormData();
        form.append('photo', file, file.name);
        const res = await authFetch('/api/foto', { method: 'POST', body: form });
        if (!res.ok) throw new Error('No se pudo subir la foto');
        const data = await res.json();
        const next: SiteContent = { ...content, photoUrl: data.url };
        return await saveContent(next);
      } catch (err) {
        setSaving(false);
        setError(
          'No se pudo subir la foto. (' + (err instanceof Error ? err.message : 'error') + ')'
        );
        return false;
      }
    },
    [content, saveContent]
  );

  const removePhoto = useCallback(async () => {
    const next: SiteContent = { ...content, photoUrl: null };
    return saveContent(next);
  }, [content, saveContent]);

  return (
    <SiteContentContext.Provider
      value={{
        content,
        loading,
        saving,
        error,
        isAdmin,
        login,
        logout,
        saveContent,
        uploadPhoto,
        removePhoto,
        refresh: fetchContent,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) {
    throw new Error('useSiteContent debe usarse dentro de <SiteContentProvider>');
  }
  return ctx;
}
