import { GraduationCap, IdCard } from 'lucide-react';
import { useSiteContent } from '@/context/SiteContentContext';
import Reveal from '@/components/Reveal';

export default function Education() {
  const { content } = useSiteContent();
  const { education, personalInfo } = content;

  return (
    <section id="formacion" className="relative bg-slate-900 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <span className="text-teal-400 text-sm font-semibold tracking-widest uppercase">
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
              <div className="h-full rounded-2xl border border-slate-800 bg-slate-950/60 p-7 transition-all duration-300 hover:border-teal-400/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-500/10">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 mb-5">
                  <GraduationCap size={22} />
                </div>
                <h3 className="font-display font-semibold text-white text-lg mb-1.5">
                  {item.institution}
                </h3>
                <p className="text-slate-400 text-sm mb-4">{item.degree}</p>
                <span className="inline-block text-xs font-medium text-teal-300 bg-teal-500/10 border border-teal-400/20 rounded-full px-3 py-1">
                  {item.period}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6 flex items-center gap-4">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-slate-800 text-slate-400 shrink-0">
              <IdCard size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">Cédula</p>
              <p className="text-slate-200 font-medium">{personalInfo.cedula}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
