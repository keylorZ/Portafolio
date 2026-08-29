import { useState } from 'react';
import type { SiteContent } from '@/types/content';
import { Field, TextAreaField, TagsField, Card, AddButton, SectionHeading } from '@/admin/ui';

interface Props {
  draft: SiteContent;
  setDraft: (next: SiteContent) => void;
}

type SubTab = 'skills' | 'projects' | 'experience' | 'education' | 'soft' | 'languages';

const subTabs: { id: SubTab; label: string }[] = [
  { id: 'skills', label: 'Habilidades técnicas' },
  { id: 'projects', label: 'Proyectos' },
  { id: 'experience', label: 'Experiencia' },
  { id: 'education', label: 'Formación' },
  { id: 'soft', label: 'Habilidades blandas' },
  { id: 'languages', label: 'Idiomas' },
];

export default function SectionsTab({ draft, setDraft }: Props) {
  const [sub, setSub] = useState<SubTab>('skills');

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {subTabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setSub(t.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
              sub === t.id
                ? 'bg-teal-500/15 text-teal-300 border border-teal-400/30'
                : 'text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {sub === 'skills' && <SkillGroupsEditor draft={draft} setDraft={setDraft} />}
      {sub === 'projects' && <ProjectsEditor draft={draft} setDraft={setDraft} />}
      {sub === 'experience' && <ExperienceEditor draft={draft} setDraft={setDraft} />}
      {sub === 'education' && <EducationEditor draft={draft} setDraft={setDraft} />}
      {sub === 'soft' && <SoftSkillsEditor draft={draft} setDraft={setDraft} />}
      {sub === 'languages' && <LanguagesEditor draft={draft} setDraft={setDraft} />}
    </div>
  );
}

function SkillGroupsEditor({ draft, setDraft }: Props) {
  const groups = draft.skillGroups;
  return (
    <div>
      <SectionHeading title="Grupos de habilidades técnicas" description="Cada tarjeta de la sección Habilidades." />
      <div className="space-y-4 mb-4">
        {groups.map((g, i) => (
          <Card
            key={i}
            title={g.title || `Grupo ${i + 1}`}
            onRemove={() => setDraft({ ...draft, skillGroups: groups.filter((_, idx) => idx !== i) })}
          >
            <Field
              label="Título del grupo"
              value={g.title}
              onChange={(v) =>
                setDraft({
                  ...draft,
                  skillGroups: groups.map((x, idx) => (idx === i ? { ...x, title: v } : x)),
                })
              }
            />
            <TagsField
              label="Elementos"
              value={g.items}
              onChange={(v) =>
                setDraft({
                  ...draft,
                  skillGroups: groups.map((x, idx) => (idx === i ? { ...x, items: v } : x)),
                })
              }
            />
          </Card>
        ))}
      </div>
      <AddButton
        label="Añadir grupo de habilidades"
        onClick={() => setDraft({ ...draft, skillGroups: [...groups, { title: '', items: [] }] })}
      />
    </div>
  );
}

function ProjectsEditor({ draft, setDraft }: Props) {
  const items = draft.projects;
  return (
    <div>
      <SectionHeading title="Proyectos" />
      <div className="space-y-4 mb-4">
        {items.map((p, i) => (
          <Card
            key={i}
            title={p.title || `Proyecto ${i + 1}`}
            onRemove={() => setDraft({ ...draft, projects: items.filter((_, idx) => idx !== i) })}
          >
            <Field
              label="Título"
              value={p.title}
              onChange={(v) => setDraft({ ...draft, projects: items.map((x, idx) => (idx === i ? { ...x, title: v } : x)) })}
            />
            <TextAreaField
              label="Descripción"
              value={p.description}
              rows={3}
              onChange={(v) =>
                setDraft({ ...draft, projects: items.map((x, idx) => (idx === i ? { ...x, description: v } : x)) })
              }
            />
            <TagsField
              label="Tecnologías"
              value={p.tags}
              onChange={(v) => setDraft({ ...draft, projects: items.map((x, idx) => (idx === i ? { ...x, tags: v } : x)) })}
            />
          </Card>
        ))}
      </div>
      <AddButton
        label="Añadir proyecto"
        onClick={() => setDraft({ ...draft, projects: [...items, { title: '', description: '', tags: [] }] })}
      />
    </div>
  );
}

function ExperienceEditor({ draft, setDraft }: Props) {
  const items = draft.experience;
  return (
    <div>
      <SectionHeading title="Experiencia laboral" />
      <div className="space-y-4 mb-4">
        {items.map((job, i) => (
          <Card
            key={i}
            title={job.company || `Empleo ${i + 1}`}
            onRemove={() => setDraft({ ...draft, experience: items.filter((_, idx) => idx !== i) })}
          >
            <div className="grid sm:grid-cols-3 gap-4">
              <Field
                label="Empresa"
                value={job.company}
                onChange={(v) => setDraft({ ...draft, experience: items.map((x, idx) => (idx === i ? { ...x, company: v } : x)) })}
              />
              <Field
                label="Puesto"
                value={job.role}
                onChange={(v) => setDraft({ ...draft, experience: items.map((x, idx) => (idx === i ? { ...x, role: v } : x)) })}
              />
              <Field
                label="Periodo"
                value={job.period}
                onChange={(v) => setDraft({ ...draft, experience: items.map((x, idx) => (idx === i ? { ...x, period: v } : x)) })}
              />
            </div>
            <TextAreaField
              label="Tareas"
              value={job.tasks.join('\n')}
              rows={4}
              placeholder="Una tarea por línea"
              onChange={(v) =>
                setDraft({
                  ...draft,
                  experience: items.map((x, idx) =>
                    idx === i ? { ...x, tasks: v.split('\n').map((t) => t.trim()).filter(Boolean) } : x
                  ),
                })
              }
            />
          </Card>
        ))}
      </div>
      <AddButton
        label="Añadir experiencia"
        onClick={() => setDraft({ ...draft, experience: [...items, { company: '', role: '', period: '', tasks: [] }] })}
      />
    </div>
  );
}

function EducationEditor({ draft, setDraft }: Props) {
  const items = draft.education;
  return (
    <div>
      <SectionHeading title="Formación académica" />
      <div className="space-y-4 mb-4">
        {items.map((ed, i) => (
          <Card
            key={i}
            title={ed.institution || `Institución ${i + 1}`}
            onRemove={() => setDraft({ ...draft, education: items.filter((_, idx) => idx !== i) })}
          >
            <div className="grid sm:grid-cols-3 gap-4">
              <Field
                label="Institución"
                value={ed.institution}
                onChange={(v) => setDraft({ ...draft, education: items.map((x, idx) => (idx === i ? { ...x, institution: v } : x)) })}
              />
              <Field
                label="Título"
                value={ed.degree}
                onChange={(v) => setDraft({ ...draft, education: items.map((x, idx) => (idx === i ? { ...x, degree: v } : x)) })}
              />
              <Field
                label="Periodo"
                value={ed.period}
                onChange={(v) => setDraft({ ...draft, education: items.map((x, idx) => (idx === i ? { ...x, period: v } : x)) })}
              />
            </div>
          </Card>
        ))}
      </div>
      <AddButton
        label="Añadir formación"
        onClick={() => setDraft({ ...draft, education: [...items, { institution: '', degree: '', period: '' }] })}
      />
    </div>
  );
}

function SoftSkillsEditor({ draft, setDraft }: Props) {
  return (
    <div>
      <SectionHeading title="Habilidades blandas" />
      <TagsField
        label="Lista de habilidades"
        value={draft.softSkills}
        onChange={(v) => setDraft({ ...draft, softSkills: v })}
      />
    </div>
  );
}

function LanguagesEditor({ draft, setDraft }: Props) {
  const items = draft.languages;
  return (
    <div>
      <SectionHeading title="Idiomas" />
      <div className="space-y-4 mb-4">
        {items.map((lang, i) => (
          <Card
            key={i}
            title={lang.name || `Idioma ${i + 1}`}
            onRemove={() => setDraft({ ...draft, languages: items.filter((_, idx) => idx !== i) })}
          >
            <div className="grid sm:grid-cols-3 gap-4">
              <Field
                label="Idioma"
                value={lang.name}
                onChange={(v) => setDraft({ ...draft, languages: items.map((x, idx) => (idx === i ? { ...x, name: v } : x)) })}
              />
              <Field
                label="Nivel"
                value={lang.level}
                onChange={(v) => setDraft({ ...draft, languages: items.map((x, idx) => (idx === i ? { ...x, level: v } : x)) })}
              />
              <Field
                label="Porcentaje (0-100)"
                value={String(lang.percent)}
                onChange={(v) =>
                  setDraft({
                    ...draft,
                    languages: items.map((x, idx) =>
                      idx === i ? { ...x, percent: Math.max(0, Math.min(100, Number(v) || 0)) } : x
                    ),
                  })
                }
              />
            </div>
          </Card>
        ))}
      </div>
      <AddButton
        label="Añadir idioma"
        onClick={() => setDraft({ ...draft, languages: [...items, { name: '', level: '', percent: 0 }] })}
      />
    </div>
  );
}
