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
import { useReveal } from '@/hooks/useReveal';

const icons = [Code2, Globe, Server, Database, GitBranch, Wrench, FileSpreadsheet, ShieldCheck];

export default function Skills() {
  const { content } = useSiteContent();
  const { skillGroups, softSkills, languages } = content;

  return (
    <section id="habilidades" className="relative bg-slate-950 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <span className="text-red-400 text-sm font-semibold tracking-widest uppercase">
              Competencias técnicas
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-3">
              Habilidades
            </h2>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {skillGroups.map((group, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={group.title} delay={i * 70}>
                <div className="h-full rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition-all duration-300 hover:border-red-400/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/10">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-500/10 text-red-400 mb-4">
                    <Icon size={19} />
                  </div>
                  <h3 className="font-semibold text-white text-sm mb-3">{group.title}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs font-medium text-slate-300 bg-slate-800/80 border border-slate-700/60 rounded-md px-2 py-1"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <Reveal>
            <div>
              <h3 className="font-display font-semibold text-white text-lg mb-5">
                Habilidades blandas
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {softSkills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2.5 text-sm text-slate-300 rounded-lg border border-slate-800 bg-slate-900/40 px-3.5 py-2.5 transition-colors hover:border-red-400/30"
                  >
                    <CheckCircle2 size={16} className="text-red-400 shrink-0" />
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div>
              <h3 className="font-display font-semibold text-white text-lg mb-5">Idiomas</h3>
              <div className="space-y-6">
                {languages.map((lang) => (
                  <div key={lang.name}>
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="font-medium text-slate-200">{lang.name}</span>
                      <span className="text-xs text-slate-500">{lang.level}</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
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
      className="h-full rounded-full bg-gradient-to-r from-red-500 to-orange-400 transition-all duration-1000 ease-out"
      style={{ width: visible ? `${percent}%` : '0%' }}
    />
  );
}
