import { GraduationCap } from 'lucide-react';
import { useSiteContent } from '@/context/SiteContentContext';
import Reveal from '@/components/Reveal';
import GlassCard from '@/components/GlassCard';
import SectionHeader from '@/components/SectionHeader';

export default function Education() {
  const { content } = useSiteContent();
  const { education } = content;

  return (
    <section id="formacion" className="relative px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <SectionHeader eyebrow="Estudios" title="Formación académica" />
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2">
          {education.map((item, i) => (
            <Reveal key={item.institution} delay={i * 100}>
              <GlassCard className="h-full p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.055]">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07] text-amber-200">
                  <GraduationCap size={22} />
                </div>
                <h3 className="mb-1.5 font-display text-lg font-semibold text-white">
                  {item.institution}
                </h3>
                <p className="mb-4 text-sm text-white/55">{item.degree}</p>
                <span className="inline-block rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-medium text-rose-200/80">
                  {item.period}
                </span>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
