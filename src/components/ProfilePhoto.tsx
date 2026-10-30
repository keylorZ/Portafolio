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
    <div className="relative h-56 w-56 sm:h-72 sm:w-72">
      <div className="absolute -inset-4 animate-pulse rounded-full bg-gradient-to-tr from-rose-300/50 via-pink-300/40 to-amber-200/50 blur-2xl" />
      <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-rose-200 via-pink-200 to-amber-100 opacity-80" />
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/10">
        {!imageFailed ? (
          <img
            src={src}
            alt={content.personalInfo.name}
            className="h-full w-full object-cover"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-white/40">
            <User size={72} strokeWidth={1.2} />
            <span className="text-xs font-medium tracking-wide">Foto pendiente</span>
          </div>
        )}
      </div>
    </div>
  );
}
