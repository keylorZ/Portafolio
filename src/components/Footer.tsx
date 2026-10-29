import { ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import { useSiteContent } from '@/context/SiteContentContext';

export default function Footer() {
  const { content } = useSiteContent();
  const personalInfo = content.personalInfo;

  const scrollToTop = () =>
    document.getElementById('inicio')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800/60 pt-14 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-10">
          <div>
            <p className="font-display text-xl font-bold text-white">
              Keylor<span className="text-red-400">.</span>Zúñiga
            </p>
            <p className="text-slate-500 text-sm mt-2 max-w-sm">
              Estudiante de Ingeniería en Sistemas, listo para aportar en soporte técnico,
              desarrollo de software y gestión administrativa.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 text-sm text-slate-400">
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:text-red-300 transition-colors">
              <Mail size={15} /> {personalInfo.email}
            </a>
            <a href={`tel:${personalInfo.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-red-300 transition-colors">
              <Phone size={15} /> {personalInfo.phone}
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={15} /> {personalInfo.location}
            </span>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800/60">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} {personalInfo.name}. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-800 text-slate-400 transition-all duration-200 hover:border-red-400/50 hover:text-red-300 hover:-translate-y-1"
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
