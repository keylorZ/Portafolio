import { GraduationCap, Target, Sparkles } from 'lucide-react';
import { useSiteContent } from '@/context/SiteContentContext';
import Reveal from '@/components/Reveal';
import GlassCard from '@/components/GlassCard';
import SectionHeader from '@/components/SectionHeader';

export default function About() {
  const { content } = useSiteContent();
  const personalInfo = content.personalInfo;

  return (
    <section id="perfil" className="relative px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeader eyebrow="Perfil profesional" title="Quién soy" />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          <Reveal delay={50}>
            <GlassCard className="h-full p-8 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.055]">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07] text-rose-200">
                <GraduationCap size={22} />
              </div>
              <h3 className="mb-3 font-display text-lg font-semibold text-white">
                Formación y experiencia
              </h3>
              <p className="leading-relaxed text-white/55">{personalInfo.summary}</p>
            </GlassCard>
          </Reveal>

          <Reveal delay={150}>
            <GlassCard className="h-full p-8 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.055]">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07] text-amber-200">
                <Target size={22} />
              </div>
              <h3 className="mb-3 font-display text-lg font-semibold text-white">
                Lo que busco
              </h3>
              <p className="leading-relaxed text-white/55">{personalInfo.goal}</p>
            </GlassCard>
          </Reveal>
        </div>

        <Reveal delay={250}>
          <GlassCard className="mt-6 flex items-start gap-4 bg-gradient-to-r from-rose-300/10 via-pink-300/5 to-amber-200/10 p-8">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07] text-rose-200">
              <Sparkles size={22} />
            </div>
            <p className="leading-relaxed text-white/70">
              Me caracterizo por mi capacidad de aprendizaje, organización, atención al detalle
              y adaptación a diferentes funciones.
            </p>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
