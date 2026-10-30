import { Briefcase } from 'lucide-react';
import { useSiteContent } from '@/context/SiteContentContext';
import Reveal from '@/components/Reveal';
import GlassCard from '@/components/GlassCard';
import SectionHeader from '@/components/SectionHeader';

export default function Experience() {
  const { content } = useSiteContent();
  const { experience } = content;

  return (
    <section id="experiencia" className="relative px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <SectionHeader eyebrow="Trayectoria" title="Experiencia laboral" />
        </Reveal>

        <div className="relative ml-4 border-l border-white/10 sm:ml-6">
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 120}>
              <div className="relative pb-14 pl-8 last:pb-0 sm:pl-10">
                <span className="absolute -left-[7px] top-2 h-3.5 w-3.5 rounded-full bg-rose-200 shadow-[0_0_20px_rgba(253,164,175,0.65)] ring-4 ring-[#0b0710]" />

                <GlassCard className="p-7 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.055]">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.07] text-rose-200">
                    <Briefcase size={18} />
                  </div>
                  <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold text-white">
                      {job.role}
                    </h3>
                    <span className="whitespace-nowrap text-xs font-medium text-white/40">
                      {job.period}
                    </span>
                  </div>
                  <p className="mb-4 text-sm font-medium text-rose-200/90">{job.company}</p>
                  <ul className="space-y-2">
                    {job.tasks.map((task) => (
                      <li key={task} className="flex gap-2.5 text-sm leading-relaxed text-white/55">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/30" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
