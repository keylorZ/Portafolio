import type { SiteContent } from '@/types/content';
import { Field, TextAreaField, SectionHeading } from '@/admin/ui';

interface Props {
  draft: SiteContent;
  setDraft: (next: SiteContent) => void;
}

export default function TextsTab({ draft, setDraft }: Props) {
  const info = draft.personalInfo;

  const update = (field: keyof typeof info, value: string) => {
    setDraft({ ...draft, personalInfo: { ...info, [field]: value } });
  };

  return (
    <div className="space-y-8">
      <div>
        <SectionHeading
          title="Textos principales"
          description="Estos textos se usan en el inicio, el perfil, el pie de página y el formulario de contacto."
        />
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Nombre completo" value={info.name} onChange={(v) => update('name', v)} />
          <Field label="Título / puesto" value={info.title} onChange={(v) => update('title', v)} />
          <Field label="Estado de disponibilidad" value={info.availability} onChange={(v) => update('availability', v)} />
          <Field label="Cédula" value={info.cedula} onChange={(v) => update('cedula', v)} />
          <Field label="Teléfono" value={info.phone} onChange={(v) => update('phone', v)} />
          <Field label="Correo electrónico" value={info.email} onChange={(v) => update('email', v)} />
          <Field label="Ubicación" value={info.location} onChange={(v) => update('location', v)} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <TextAreaField
          label="Resumen / Formación y experiencia"
          value={info.summary}
          onChange={(v) => update('summary', v)}
          rows={6}
        />
        <TextAreaField label="Objetivo / Lo que busco" value={info.goal} onChange={(v) => update('goal', v)} rows={6} />
      </div>
    </div>
  );
}
