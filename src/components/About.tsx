import { GraduationCap, Target, Sparkles } from 'lucide-react';
import { useSiteContent } from '@/context/SiteContentContext';
import Reveal from '@/components/Reveal';

export default function About() {
  const { content } = useSiteContent();
  const personalInfo = content.personalInfo;

  return (
    <section id="perfil" className="relative bg-slate-900 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <span className="text-red-400 text-sm font-semibold tracking-widest uppercase">
              Perfil profesional
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-3">
              Quién soy
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          <Reveal delay={50}>
            <div className="h-full rounded-2xl border border-slate-800 bg-slate-950/50 p-8 transition-all duration-300 hover:border-red-400/40 hover:shadow-lg hover:shadow-red-500/5">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-red-500/10 text-red-400 mb-5">
                <GraduationCap size={22} />
              </div>
              <h3 className="font-display font-semibold text-white text-lg mb-3">
                Formación y experiencia
              </h3>
              <p className="text-slate-400 leading-relaxed">{personalInfo.summary}</p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="h-full rounded-2xl border border-slate-800 bg-slate-950/50 p-8 transition-all duration-300 hover:border-red-400/40 hover:shadow-lg hover:shadow-red-500/5">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-orange-500/10 text-orange-400 mb-5">
                <Target size={22} />
              </div>
              <h3 className="font-display font-semibold text-white text-lg mb-3">
                Lo que busco
              </h3>
              <p className="text-slate-400 leading-relaxed">{personalInfo.goal}</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={250}>
          <div className="mt-6 rounded-2xl border border-red-400/20 bg-gradient-to-r from-red-500/10 via-rose-500/5 to-orange-500/10 p-8 flex items-start gap-4">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-rose-500/10 text-rose-400 shrink-0">
              <Sparkles size={22} />
            </div>
            <p className="text-slate-300 leading-relaxed">
              Me caracterizo por mi capacidad de aprendizaje, responsabilidad, organización,
              atención al detalle y adaptación a diferentes entornos laborales.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
