import { useEffect, useState } from 'react';
import { LogOut, Save, ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';
import { useSiteContent } from '@/context/SiteContentContext';
import type { SiteContent } from '@/types/content';
import TextsTab from '@/admin/tabs/TextsTab';
import PhotoTab from '@/admin/tabs/PhotoTab';
import SocialTab from '@/admin/tabs/SocialTab';
import SectionsTab from '@/admin/tabs/SectionsTab';
import VisitsTab from '@/admin/tabs/VisitsTab';
import MensajesTab from '@/admin/tabs/MensajesTab';

type Tab = 'textos' | 'foto' | 'redes' | 'secciones' | 'visitas' | 'mensajes';

const tabs: { id: Tab; label: string }[] = [
  { id: 'textos', label: 'Textos' },
  { id: 'foto', label: 'Foto' },
  { id: 'redes', label: 'Redes sociales' },
  { id: 'secciones', label: 'Secciones (CV)' },
  { id: 'mensajes', label: 'Mensajes' },
  { id: 'visitas', label: 'Visitas' },
];

export default function Dashboard() {
  const { content, saveContent, saving, error, logout } = useSiteContent();
  const [tab, setTab] = useState<Tab>('textos');
  const [draft, setDraft] = useState<SiteContent>(content);
  const [savedFlash, setSavedFlash] = useState(false);

  useEffect(() => {
    setDraft(content);
  }, [content]);

  const dirty = JSON.stringify(draft) !== JSON.stringify(content);

  const handleSave = async () => {
    const ok = await saveContent(draft);
    if (ok) {
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="sticky top-0 z-10 border-b border-slate-800/60 bg-slate-950/90 backdrop-blur-lg">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div>
            <p className="font-display font-bold text-white text-sm sm:text-base">Panel de administración</p>
            <p className="text-xs text-slate-500 hidden sm:block">Edita el contenido de tu sitio</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 hover:text-teal-300 transition-colors px-2 sm:px-3 py-2"
            >
              <ExternalLink size={14} /> <span className="hidden sm:inline">Ver sitio</span>
            </a>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 hover:text-rose-300 transition-colors px-2 sm:px-3 py-2"
            >
              <LogOut size={14} /> <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 pt-6">
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                tab === t.id
                  ? 'bg-teal-500 text-slate-950'
                  : 'text-slate-300 border border-slate-800 hover:border-teal-400/40 hover:text-teal-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 pb-32">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8">
          {tab === 'textos' && <TextsTab draft={draft} setDraft={setDraft} />}
          {tab === 'foto' && <PhotoTab />}
          {tab === 'redes' && <SocialTab draft={draft} setDraft={setDraft} />}
          {tab === 'secciones' && <SectionsTab draft={draft} setDraft={setDraft} />}
          {tab === 'mensajes' && <MensajesTab />}
          {tab === 'visitas' && <VisitsTab />}
        </div>
      </main>

      {tab !== 'foto' && tab !== 'visitas' && tab !== 'mensajes' && (
        <div className="fixed bottom-0 inset-x-0 border-t border-slate-800/60 bg-slate-950/95 backdrop-blur-lg">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
            <div className="text-xs sm:text-sm">
              {savedFlash && (
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 size={15} /> Cambios guardados
                </span>
              )}
              {error && !savedFlash && (
                <span className="flex items-center gap-1.5 text-rose-400">
                  <AlertCircle size={15} /> {error}
                </span>
              )}
              {!savedFlash && !error && dirty && (
                <span className="text-amber-400">Tienes cambios sin guardar</span>
              )}
            </div>
            <button
              onClick={handleSave}
              disabled={saving || !dirty}
              className="inline-flex items-center gap-2 rounded-lg bg-teal-500 px-6 py-2.5 text-sm font-semibold text-slate-950 transition-all duration-200 hover:bg-teal-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={16} /> {saving ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
