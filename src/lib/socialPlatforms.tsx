import type { ComponentType } from 'react';
import {
  Github,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Globe,
  MessageCircle,
  Music2,
} from 'lucide-react';
import type { SocialPlatformId } from '@/types/content';

type IconComponent = ComponentType<{ size?: number | string; className?: string }>;

interface PlatformDef {
  id: SocialPlatformId;
  label: string;
  icon: IconComponent;
  placeholder: string;
}

// lucide-react no trae un icono de "X" en esta versión, así que usamos un SVG propio
// con la misma firma mínima (size/className) que los íconos de lucide-react.
function XIcon({ size = 24, className }: { size?: number | string; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.244 2H21.5l-7.53 8.61L23 22h-6.99l-5.47-6.53L4.24 22H1l8.06-9.22L1.5 2h7.16l4.94 5.94L18.24 2Zm-1.23 18h1.93L7.08 4H5.02l11.99 16Z" />
    </svg>
  );
}

export const socialPlatforms: PlatformDef[] = [
  { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, placeholder: 'https://www.linkedin.com/in/tu-usuario' },
  { id: 'github', label: 'GitHub', icon: Github, placeholder: 'https://github.com/tu-usuario' },
  { id: 'instagram', label: 'Instagram', icon: Instagram, placeholder: 'https://instagram.com/tu-usuario' },
  { id: 'facebook', label: 'Facebook', icon: Facebook, placeholder: 'https://facebook.com/tu-usuario' },
  { id: 'x', label: 'X (Twitter)', icon: XIcon, placeholder: 'https://x.com/tu-usuario' },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, placeholder: 'https://wa.me/50600000000' },
  { id: 'youtube', label: 'YouTube', icon: Youtube, placeholder: 'https://youtube.com/@tu-canal' },
  { id: 'tiktok', label: 'TikTok', icon: Music2, placeholder: 'https://tiktok.com/@tu-usuario' },
  { id: 'website', label: 'Sitio web', icon: Globe, placeholder: 'https://tu-sitio.com' },
];

export function getSocialPlatform(id: SocialPlatformId): PlatformDef {
  return socialPlatforms.find((p) => p.id === id) ?? socialPlatforms[8];
}
