import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'perfil', label: 'Perfil' },
  { id: 'habilidades', label: 'Habilidades' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'formacion', label: 'Formación' },
  { id: 'contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('inicio');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div
        className={`mx-auto max-w-6xl overflow-hidden rounded-2xl border transition-all duration-300 ${
          scrolled
            ? 'border-white/15 bg-[#120b18]/80 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur-2xl'
            : 'border-white/10 bg-white/[0.04] backdrop-blur-xl'
        }`}
      >
        <nav className="flex h-16 items-center justify-between px-4 sm:px-6">
          <button
            onClick={() => handleClick('inicio')}
            className="font-display text-lg font-bold tracking-tight text-white"
          >
            Keylor<span className="text-rose-200">.</span>Zúñiga
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => handleClick(link.id)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  active === link.id ? 'text-white' : 'text-white/50 hover:text-white/80'
                }`}
              >
                {active === link.id && (
                  <span className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.08]" />
                )}
                <span className="relative">{link.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => handleClick('contacto')}
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-rose-200 via-pink-200 to-amber-100 px-5 py-2 text-sm font-semibold text-[#1a1020] shadow-[0_12px_30px_-14px_rgba(251,113,133,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-14px_rgba(251,113,133,1)] active:scale-95 md:inline-flex"
          >
            Contáctame
          </button>

          <button
            className="text-white/80 transition-colors hover:text-white md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </nav>

        <div
          className={`overflow-hidden border-white/10 transition-all duration-300 md:hidden ${
            open ? 'max-h-96 border-t bg-white/[0.03]' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col gap-1 px-4 py-4">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => handleClick(link.id)}
                className={`rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                  active === link.id
                    ? 'bg-white/[0.08] text-rose-200'
                    : 'text-white/60 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
