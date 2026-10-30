import { FolderGit2, ArrowUpRight } from 'lucide-react';
import { useSiteContent } from '@/context/SiteContentContext';
import Reveal from '@/components/Reveal';
import GlassCard from '@/components/GlassCard';
import SectionHeader from '@/components/SectionHeader';

export default function Projects() {
  const { content } = useSiteContent();
  const { projects } = content;

  return (
    <section id="proyectos" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeader eyebrow="Trabajo destacado" title="Proyectos" />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => {
            const card = (
              <GlassCard className="group flex h-full flex-col p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.055] hover:shadow-[0_30px_80px_-30px_rgba(251,113,133,0.25)]">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07] text-rose-200 transition-colors group-hover:bg-white/[0.1]">
                    <FolderGit2 size={20} />
                  </div>
                  {project.url && (
                    <ArrowUpRight
                      size={18}
                      className="text-white/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rose-200"
                    />
                  )}
                </div>
                <h3 className="mb-2.5 font-display text-lg font-semibold text-white">
                  {project.title}
                </h3>
                <p className="mb-5 flex-1 text-sm leading-relaxed text-white/55">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-white/10 bg-white/[0.06] px-2 py-1 text-xs font-medium text-white/65"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </GlassCard>
            );

            return (
              <Reveal key={project.title} delay={i * 100} className="h-full">
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Ver ${project.title}`}
                    className="block h-full"
                  >
                    {card}
                  </a>
                ) : (
                  card
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
