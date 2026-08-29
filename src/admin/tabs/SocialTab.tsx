import type { SiteContent } from '@/types/content';
import type { SocialPlatformId } from '@/types/content';
import { socialPlatforms, getSocialPlatform } from '@/lib/socialPlatforms';
import { Card, AddButton, SectionHeading } from '@/admin/ui';
import { Trash2 } from 'lucide-react';

interface Props {
  draft: SiteContent;
  setDraft: (next: SiteContent) => void;
}

export default function SocialTab({ draft, setDraft }: Props) {
  const links = draft.socialLinks;

  const update = (index: number, patch: Partial<{ platform: SocialPlatformId; url: string }>) => {
    const next = links.map((l, i) => (i === index ? { ...l, ...patch } : l));
    setDraft({ ...draft, socialLinks: next });
  };

  const remove = (index: number) => {
    setDraft({ ...draft, socialLinks: links.filter((_, i) => i !== index) });
  };

  const add = () => {
    const used = new Set(links.map((l) => l.platform));
    const next = socialPlatforms.find((p) => !used.has(p.id)) ?? socialPlatforms[0];
    setDraft({
      ...draft,
      socialLinks: [...links, { id: `${Date.now()}`, platform: next.id, url: '' }],
    });
  };

  return (
    <div>
      <SectionHeading
        title="Redes sociales"
        description="Añade los enlaces que quieres mostrar en el sitio. Se mostrarán como íconos en una nueva sección."
      />

      <div className="space-y-3 mb-4">
        {links.length === 0 && (
          <p className="text-sm text-slate-500">Todavía no has añadido ninguna red social.</p>
        )}
        {links.map((link, i) => {
          const platform = getSocialPlatform(link.platform);
          return (
            <Card key={link.id}>
              <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
                <div className="w-full sm:w-44">
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Plataforma</label>
                  <select
                    value={link.platform}
                    onChange={(e) => update(i, { platform: e.target.value as SocialPlatformId })}
                    className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-sm text-slate-100 outline-none transition-colors focus:border-teal-400/60"
                  >
                    {socialPlatforms.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Enlace</label>
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) => update(i, { url: e.target.value })}
                    placeholder={platform.placeholder}
                    className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors focus:border-teal-400/60"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-rose-400 hover:text-rose-300 transition-colors px-3 py-2.5 shrink-0"
                >
                  <Trash2 size={14} /> Eliminar
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      <AddButton label="Añadir red social" onClick={add} />
    </div>
  );
}
