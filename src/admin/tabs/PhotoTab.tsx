import { useRef, useState } from 'react';
import { Upload, Trash2, User } from 'lucide-react';
import { useSiteContent } from '@/context/SiteContentContext';
import { SectionHeading } from '@/admin/ui';

export default function PhotoTab() {
  const { content, uploadPhoto, removePhoto, saving, error } = useSiteContent();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    setLocalError(null);
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setLocalError('Selecciona un archivo de imagen válido.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setLocalError('La imagen debe pesar menos de 5 MB.');
      return;
    }
    await uploadPhoto(file);
  };

  return (
    <div>
      <SectionHeading
        title="Foto de perfil"
        description="Sube una nueva foto, o elimínala para volver al ícono por defecto."
      />

      <div className="flex flex-col sm:flex-row items-center gap-8">
        <div className="relative w-40 h-40 shrink-0 rounded-full overflow-hidden bg-slate-800 border-4 border-slate-900 flex items-center justify-center">
          {content.photoUrl ? (
            <img src={content.photoUrl} alt="Foto de perfil" className="w-full h-full object-cover" />
          ) : (
            <User size={48} className="text-slate-500" strokeWidth={1.2} />
          )}
        </div>

        <div className="flex flex-col gap-3 w-full sm:w-auto">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <button
            type="button"
            disabled={saving}
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-all duration-200 hover:bg-teal-400 disabled:opacity-60"
          >
            <Upload size={16} /> {saving ? 'Subiendo...' : 'Cambiar foto'}
          </button>
          {content.photoUrl && (
            <button
              type="button"
              disabled={saving}
              onClick={() => removePhoto()}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-rose-400/30 text-rose-400 px-6 py-3 text-sm font-semibold transition-all duration-200 hover:bg-rose-500/10 disabled:opacity-60"
            >
              <Trash2 size={16} /> Eliminar foto
            </button>
          )}
          <p className="text-xs text-slate-500 max-w-xs">Formatos: JPG, PNG o WEBP. Máximo 5 MB.</p>
        </div>
      </div>

      {(localError || error) && (
        <p className="mt-5 text-sm text-rose-400 bg-rose-500/10 border border-rose-400/20 rounded-lg px-4 py-3">
          {localError || error}
        </p>
      )}
    </div>
  );
}
