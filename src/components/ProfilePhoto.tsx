import { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import { useSiteContent } from '@/context/SiteContentContext';

export default function ProfilePhoto() {
  const { content } = useSiteContent();
  const [imageFailed, setImageFailed] = useState(false);

  const src = content.photoUrl || '/profile.jpg';

  useEffect(() => {
    setImageFailed(false);
  }, [src]);

  return (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80">
      <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-teal-400 via-cyan-400 to-emerald-400 opacity-70 blur-xl animate-pulse" />
      <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-teal-400 via-cyan-400 to-emerald-400" />
      <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-800 border-4 border-slate-950 flex items-center justify-center">
        {!imageFailed ? (
          <img
            src={src}
            alt={content.personalInfo.name}
            className="w-full h-full object-cover"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-slate-500">
            <User size={80} strokeWidth={1.2} />
            <span className="text-xs font-medium tracking-wide">Foto pendiente</span>
          </div>
        )}
      </div>
    </div>
  );
}
