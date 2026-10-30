import { ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import { useSiteContent } from '@/context/SiteContentContext';

export default function Footer() {
  const { content } = useSiteContent();
  const personalInfo = content.personalInfo;

  const scrollToTop = () =>
    document.getElementById('inicio')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="relative border-t border-white/10 bg-white/[0.02] px-6 pb-8 pt-14 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-xl font-bold text-white">
              Keylor<span className="text-rose-200">.</span>Zúñiga
            </p>
            <p className="mt-2 max-w-sm text-sm text-white/45">
              Bachiller en Ingeniería en Sistemas, listo para aportar en soporte técnico,
              desarrollo de software y gestión administrativa.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 text-sm text-white/50">
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-2 transition-colors hover:text-rose-200"
            >
              <Mail size={15} /> {personalInfo.email}
            </a>
            <a
              href={`tel:${personalInfo.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 transition-colors hover:text-rose-200"
            >
              <Phone size={15} /> {personalInfo.phone}
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={15} /> {personalInfo.location}
            </span>
          </div>
        </div>

        <div className="flex flex-col-reverse items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} {personalInfo.name}. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/50 transition-all duration-200 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.08] hover:text-rose-200"
              aria-label="Volver arriba"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
