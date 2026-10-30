import { FormEvent, useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useSiteContent } from '@/context/SiteContentContext';
import Reveal from '@/components/Reveal';
import GlassCard from '@/components/GlassCard';
import SectionHeader from '@/components/SectionHeader';

export default function Contact() {
  const { content } = useSiteContent();
  const personalInfo = content.personalInfo;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    const subject = encodeURIComponent(`Contacto desde tu portafolio - ${name.trim()}`);
    const body = encodeURIComponent(`${message.trim()}\n\n— ${name.trim()} (${email.trim()})`);
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
  };

  const inputClass =
    'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-rose-200/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-rose-200/10';

  return (
    <section id="contacto" className="relative px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeader
            eyebrow="Hablemos"
            title="Contacto"
            description="Estoy disponible de inmediato para nuevas oportunidades. Escríbeme y te responderé lo antes posible."
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="space-y-4">
            <a href={`mailto:${personalInfo.email}`} className="group block">
              <GlassCard className="flex items-center gap-4 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.055]">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.07] text-rose-200 transition-colors group-hover:bg-white/[0.1]">
                  <Mail size={19} />
                </span>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wide text-white/40">Correo</p>
                  <p className="truncate font-medium text-white/80">{personalInfo.email}</p>
                </div>
              </GlassCard>
            </a>

            <a href={`tel:${personalInfo.phone.replace(/\s/g, '')}`} className="group block">
              <GlassCard className="flex items-center gap-4 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.055]">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.07] text-rose-200 transition-colors group-hover:bg-white/[0.1]">
                  <Phone size={19} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/40">Teléfono</p>
                  <p className="font-medium text-white/80">{personalInfo.phone}</p>
                </div>
              </GlassCard>
            </a>

            <GlassCard className="flex items-center gap-4 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.07] text-rose-200">
                <MapPin size={19} />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wide text-white/40">Ubicación</p>
                <p className="font-medium text-white/80">{personalInfo.location}</p>
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={100}>
            <GlassCard className="p-7">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-xs font-medium text-white/50">
                      Nombre
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      maxLength={200}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputClass}
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-xs font-medium text-white/50">
                      Correo
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      maxLength={200}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputClass}
                      placeholder="tucorreo@ejemplo.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-xs font-medium text-white/50">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    required
                    maxLength={5000}
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`${inputClass} resize-none`}
                    placeholder="Cuéntame en qué puedo ayudarte..."
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-200 via-pink-200 to-amber-100 px-6 py-3 text-sm font-semibold text-[#1a1020] shadow-[0_16px_40px_-16px_rgba(251,113,133,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-16px_rgba(251,113,133,0.9)] active:scale-[0.98]"
                >
                  Enviar mensaje <Send size={16} />
                </button>
              </form>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
