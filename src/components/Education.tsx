import { GraduationCap } from 'lucide-react';
import { useSiteContent } from '@/context/SiteContentContext';
import Reveal from '@/components/Reveal';

export default function Education() {
  const { content } = useSiteContent();
  const { education } = content;

  return (
    <section id="formacion" className="relative bg-slate-900 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <span className="text-red-400 text-sm font-semibold tracking-widest uppercase">
              Estudios
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-3">
              Formación académica
            </h2>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          {education.map((item, i) => (
            <Reveal key={item.institution} delay={i * 100}>
              <div className="h-full rounded-2xl border border-slate-800 bg-slate-950/60 p-7 transition-all duration-300 hover:border-red-400/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/10">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-orange-500/10 text-orange-400 mb-5">
                  <GraduationCap size={22} />
                </div>
                <h3 className="font-display font-semibold text-white text-lg mb-1.5">
                  {item.institution}
                </h3>
                <p className="text-slate-400 text-sm mb-4">{item.degree}</p>
                <span className="inline-block text-xs font-medium text-red-300 bg-red-500/10 border border-red-400/20 rounded-full px-3 py-1">
                  {item.period}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        </div>
    </section>
  );
}
