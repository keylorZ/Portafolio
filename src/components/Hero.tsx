import { useRef } from 'react';
import { Mail, Phone, MapPin, ArrowDown } from 'lucide-react';
import { useSiteContent } from '@/context/SiteContentContext';
import ProfilePhoto from '@/components/ProfilePhoto';
import { useMagneticLetters } from '@/hooks/useMagneticLetters';

export default function Hero() {
  const { content } = useSiteContent();
  const personalInfo = content.personalInfo;
  const titleRef = useRef<HTMLHeadingElement>(null);

  useMagneticLetters(titleRef);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const gradientStops: [number, number, number][] = [
    [253, 164, 175],
    [249, 168, 212],
    [253, 230, 138],
  ];

  const getGradientColor = (index: number, total: number) => {
    const t = total <= 1 ? 0 : index / (total - 1);
    const scaled = t * (gradientStops.length - 1);
    const stop = Math.min(Math.floor(scaled), gradientStops.length - 2);
    const local = scaled - stop;
    const from = gradientStops[stop];
    const to = gradientStops[stop + 1];
    const mix = (a: number, b: number) => Math.round(a + (b - a) * local);
    return `rgb(${mix(from[0], to[0])}, ${mix(from[1], to[1])}, ${mix(from[2], to[2])})`;
  };

  const renderMagneticLetters = (text: string, gradient = false) => {
    const total = Array.from(text).length;
    let index = 0;

    return text
      .split(/(\s+)/)
      .filter(Boolean)
      .map((word, wordIndex) => {
        const chars = Array.from(word);
        const wordStart = index;
        index += chars.length;

        if (/^\s+$/.test(word)) {
          return (
            <span key={`space-${wordIndex}`} className="magnetic-space">
              {' '}
            </span>
          );
        }

        return (
          <span key={`word-${wordIndex}`} className="magnetic-word">
            {chars.map((char, i) => (
              <span
                key={`${char}-${wordStart + i}`}
                data-magnetic-letter
                className="magnetic-letter"
                style={
                  gradient
                    ? { color: getGradientColor(wordStart + i, total) }
                    : undefined
                }
              >
                {char}
              </span>
            ))}
          </span>
        );
      });
  };

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center px-6 pb-20 pt-28"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[1.1fr_0.9fr]">
        <div className="order-2 text-center md:order-1 md:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-200 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-200" />
            </span>
            <span className="text-xs font-medium tracking-wide text-rose-100/80">
              {personalInfo.availability}
            </span>
          </div>

          <h1
            ref={titleRef}
            className="relative mb-4 font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl"
          >
            {renderMagneticLetters('Hola, soy ')}
            {renderMagneticLetters(personalInfo.name, true)}
          </h1>

          <p className="mb-8 text-lg font-medium text-white/55 sm:text-xl">
            {personalInfo.title} · Soporte técnico · Desarrollo de software
          </p>

          <div className="mb-10 flex flex-wrap justify-center gap-3 md:justify-start">
            <button
              onClick={() => scrollTo('contacto')}
              className="rounded-full bg-gradient-to-r from-rose-200 via-pink-200 to-amber-100 px-7 py-3 text-sm font-semibold text-[#1a1020] shadow-[0_16px_40px_-16px_rgba(251,113,133,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-16px_rgba(251,113,133,0.9)] active:scale-95"
            >
              Contáctame
            </button>
            <button
              onClick={() => scrollTo('proyectos')}
              className="rounded-full border border-white/15 bg-white/[0.05] px-7 py-3 text-sm font-semibold text-white/80 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.08] hover:text-white active:scale-95"
            >
              Ver proyectos
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:justify-start">
            <a
              href={`mailto:${personalInfo.email}`}
              className="group flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-rose-200"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] transition-colors group-hover:border-rose-200/40 group-hover:bg-white/[0.08]">
                <Mail size={16} />
              </span>
              {personalInfo.email}
            </a>
            <a
              href={`tel:${personalInfo.phone.replace(/\s/g, '')}`}
              className="group flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-rose-200"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] transition-colors group-hover:border-rose-200/40 group-hover:bg-white/[0.08]">
                <Phone size={16} />
              </span>
              {personalInfo.phone}
            </a>
            <span className="flex items-center gap-2 text-sm text-white/50">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                <MapPin size={16} />
              </span>
              {personalInfo.location}
            </span>
          </div>
        </div>

        <div className="order-1 flex justify-center md:order-2">
          <div className="relative animate-float">
            <div className="rounded-[2.75rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)] backdrop-blur-lg sm:p-8">
              <ProfilePhoto />
            </div>

            <div className="absolute -left-6 top-10 hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-medium text-white/70 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)] backdrop-blur-lg sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-200" />
              Soporte técnico
            </div>
            <div className="absolute -right-4 bottom-12 hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-medium text-white/70 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)] backdrop-blur-lg sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-200" />
              Desarrollo web
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollTo('perfil')}
        aria-label="Bajar a la siguiente sección"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/35 transition-colors hover:text-rose-200"
      >
        <ArrowDown size={22} />
      </button>
    </section>
  );
}
