import {
  Code2,
  Globe,
  Server,
  Database,
  GitBranch,
  Wrench,
  FileSpreadsheet,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useSiteContent } from '@/context/SiteContentContext';
import Reveal from '@/components/Reveal';
import GlassCard from '@/components/GlassCard';
import SectionHeader from '@/components/SectionHeader';
import { useReveal } from '@/hooks/useReveal';

const icons = [Code2, Globe, Server, Database, GitBranch, Wrench, FileSpreadsheet, ShieldCheck];

export default function Skills() {
  const { content } = useSiteContent();
  const { skillGroups, softSkills, languages } = content;

  return (
    <section id="habilidades" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeader eyebrow="Competencias técnicas" title="Habilidades" />
        </Reveal>

        <div className="mb-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={group.title} delay={i * 70}>
                <GlassCard className="h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.055]">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.07] text-rose-200">
                    <Icon size={19} />
                  </div>
                  <h3 className="mb-3 text-sm font-semibold text-white">{group.title}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg border border-white/10 bg-white/[0.06] px-2 py-1 text-xs font-medium text-white/65"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <div>
              <h3 className="mb-5 font-display text-lg font-semibold text-white">
                Habilidades blandas
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {softSkills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white/70 backdrop-blur-xl transition-colors hover:border-white/20 hover:bg-white/[0.07]"
                  >
                    <CheckCircle2 size={16} className="shrink-0 text-rose-200" />
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div>
              <h3 className="mb-5 font-display text-lg font-semibold text-white">Idiomas</h3>
              <div className="space-y-6">
                {languages.map((lang) => (
                  <div key={lang.name}>
                    <div className="mb-2 flex items-baseline justify-between">
                      <span className="font-medium text-white/80">{lang.name}</span>
                      <span className="text-xs text-white/40">{lang.level}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <LanguageBar percent={lang.percent} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function LanguageBar({ percent }: { percent: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="h-full rounded-full bg-gradient-to-r from-rose-300 via-pink-300 to-amber-200 transition-all duration-1000 ease-out"
      style={{ width: visible ? `${percent}%` : '0%' }}
    />
  );
}
