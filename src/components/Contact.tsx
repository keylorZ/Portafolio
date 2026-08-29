import { FormEvent, useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useSiteContent } from '@/context/SiteContentContext';
import Reveal from '@/components/Reveal';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const { content } = useSiteContent();
  const personalInfo = content.personalInfo;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStatus('sending');
    let ok = false;
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
      });
      const data = await res.json();
      ok = res.ok && data?.ok === true;
    } catch {
      ok = false;
    }

    if (!ok) {
      setStatus('error');
      return;
    }

    setStatus('success');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <section id="contacto" className="relative bg-slate-950 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <span className="text-teal-400 text-sm font-semibold tracking-widest uppercase">
              Hablemos
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-3">
              Contacto
            </h2>
            <p className="text-slate-400 mt-4 max-w-xl mx-auto">
              Estoy disponible de inmediato para nuevas oportunidades. Escríbeme y te responderé
              lo antes posible.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-[0.85fr_1.15fr] gap-6">
          <Reveal className="space-y-4">
            <a
              href={`mailto:${personalInfo.email}`}
              className="group flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 transition-all duration-300 hover:border-teal-400/40 hover:-translate-y-0.5"
            >
              <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-teal-500/10 text-teal-400 shrink-0 group-hover:bg-teal-500/20">
                <Mail size={19} />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-slate-500 uppercase tracking-wide">Correo</p>
                <p className="text-slate-200 font-medium truncate">{personalInfo.email}</p>
              </div>
            </a>

            <a
              href={`tel:${personalInfo.phone.replace(/\s/g, '')}`}
              className="group flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 transition-all duration-300 hover:border-teal-400/40 hover:-translate-y-0.5"
            >
              <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-teal-500/10 text-teal-400 shrink-0 group-hover:bg-teal-500/20">
                <Phone size={19} />
              </span>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Teléfono</p>
                <p className="text-slate-200 font-medium">{personalInfo.phone}</p>
              </div>
            </a>

            <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
              <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-teal-500/10 text-teal-400 shrink-0">
                <MapPin size={19} />
              </span>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Ubicación</p>
                <p className="text-slate-200 font-medium">{personalInfo.location}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-7 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-slate-400 mb-2">
                    Nombre
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    maxLength={200}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-700 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors focus:border-teal-400/60"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-slate-400 mb-2">
                    Correo
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    maxLength={200}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-700 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors focus:border-teal-400/60"
                    placeholder="tucorreo@ejemplo.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-medium text-slate-400 mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  required
                  maxLength={5000}
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-700 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors focus:border-teal-400/60 resize-none"
                  placeholder="Cuéntame en qué puedo ayudarte..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-teal-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-all duration-200 hover:bg-teal-400 hover:shadow-lg hover:shadow-teal-500/30 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  'Enviando...'
                ) : (
                  <>
                    Enviar mensaje <Send size={16} />
                  </>
                )}
              </button>

              {status === 'success' && (
                <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-400/20 rounded-lg px-4 py-3">
                  <CheckCircle2 size={16} />
                  ¡Mensaje enviado! Te responderé pronto.
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 text-sm text-rose-400 bg-rose-500/10 border border-rose-400/20 rounded-lg px-4 py-3">
                  <AlertCircle size={16} />
                  No se pudo enviar el mensaje. Intenta de nuevo.
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
