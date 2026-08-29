import { FolderGit2, ArrowUpRight } from 'lucide-react';
import { useSiteContent } from '@/context/SiteContentContext';
import Reveal from '@/components/Reveal';

export default function Projects() {
  const { content } = useSiteContent();
  const { projects } = content;

  return (
    <section id="proyectos" className="relative bg-slate-900 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <span className="text-teal-400 text-sm font-semibold tracking-widest uppercase">
              Trabajo destacado
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-3">
              Proyectos
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 100}>
              <div className="group h-full rounded-2xl border border-slate-800 bg-slate-950/60 p-7 flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-400/50 hover:shadow-xl hover:shadow-teal-500/10">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-teal-500/10 text-teal-400 transition-colors group-hover:bg-teal-500/20">
                    <FolderGit2 size={20} />
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-slate-600 transition-all duration-300 group-hover:text-teal-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
                <h3 className="font-display font-semibold text-white text-lg mb-2.5">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-teal-300 bg-teal-500/10 border border-teal-400/20 rounded-md px-2 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
