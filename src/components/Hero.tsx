import { Mail, Phone, MapPin, ArrowDown } from 'lucide-react';
import { useSiteContent } from '@/context/SiteContentContext';
import ProfilePhoto from '@/components/ProfilePhoto';

export default function Hero() {
  const { content } = useSiteContent();
  const personalInfo = content.personalInfo;

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const gradientStops: [number, number, number][] = [
    [248, 113, 113],
    [251, 113, 133],
    [251, 146, 60],
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

  const renderWaveLetters = (text: string, offset = 0, gradient = false) => {
    const chars = Array.from(text);
    return chars.map((char, i) => (
      <span
        key={`${char}-${offset + i}`}
        className="wave-letter"
        style={{
          animationDelay: `${(offset + i) * 0.04}s`,
          ...(gradient ? { color: getGradientColor(i, chars.length) } : {}),
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden bg-slate-950 pt-24 pb-16"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-24 w-96 h-96 bg-red-500/25 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-40 -right-16 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl animate-blob animation-delay-4000" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
        <div className="text-center md:text-left order-2 md:order-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-4 py-1.5 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400" />
            </span>
            <span className="text-xs font-medium text-red-300 tracking-wide">
              {personalInfo.availability}
            </span>
          </div>

          <h1 className="wave-text font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-4">
            {renderWaveLetters('Hola, soy ')}
            {renderWaveLetters(personalInfo.name, 10, true)}
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 font-medium mb-8">
            {personalInfo.title} · Soporte técnico · Desarrollo de software
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-10">
            <button
              onClick={() => scrollTo('contacto')}
              className="rounded-full bg-red-500 px-7 py-3 text-sm font-semibold text-slate-950 transition-all duration-200 hover:bg-red-400 hover:shadow-xl hover:shadow-red-500/30 hover:-translate-y-0.5 active:scale-95"
            >
              Contáctame
            </button>
            <button
              onClick={() => scrollTo('proyectos')}
              className="rounded-full border border-slate-700 bg-slate-900/60 px-7 py-3 text-sm font-semibold text-slate-200 backdrop-blur transition-all duration-200 hover:border-red-400/50 hover:text-red-300 hover:-translate-y-0.5 active:scale-95"
            >
              Ver proyectos
            </button>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <a
              href={`mailto:${personalInfo.email}`}
              className="group flex items-center gap-2 text-sm text-slate-400 hover:text-red-300 transition-colors"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-900 border border-slate-800 group-hover:border-red-400/50 transition-colors">
                <Mail size={16} />
              </span>
              {personalInfo.email}
            </a>
            <a
              href={`tel:${personalInfo.phone.replace(/\s/g, '')}`}
              className="group flex items-center gap-2 text-sm text-slate-400 hover:text-red-300 transition-colors"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-900 border border-slate-800 group-hover:border-red-400/50 transition-colors">
                <Phone size={16} />
              </span>
              {personalInfo.phone}
            </a>
            <span className="flex items-center gap-2 text-sm text-slate-400">
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-900 border border-slate-800">
                <MapPin size={16} />
              </span>
              {personalInfo.location}
            </span>
          </div>
        </div>

        <div className="order-1 md:order-2 flex justify-center animate-float">
          <ProfilePhoto />
        </div>
      </div>

      <button
        onClick={() => scrollTo('perfil')}
        aria-label="Bajar a la siguiente sección"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-red-300 transition-colors animate-bounce"
      >
        <ArrowDown size={22} />
      </button>
    </section>
  );
}
