import { Briefcase } from 'lucide-react';
import { useSiteContent } from '@/context/SiteContentContext';
import Reveal from '@/components/Reveal';

export default function Experience() {
  const { content } = useSiteContent();
  const { experience } = content;

  return (
    <section id="experiencia" className="relative bg-slate-950 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <span className="text-red-400 text-sm font-semibold tracking-widest uppercase">
              Trayectoria
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-3">
              Experiencia laboral
            </h2>
          </div>
        </Reveal>

        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-6">
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 120}>
              <div className="relative pl-8 sm:pl-10 pb-14 last:pb-0">
                <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-red-400 ring-4 ring-slate-950 shadow-lg shadow-red-500/40" />

                <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-7 transition-all duration-300 hover:border-red-400/40 hover:shadow-lg hover:shadow-red-500/5">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/10 text-red-400 mb-4">
                    <Briefcase size={18} />
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                    <h3 className="font-display font-semibold text-white text-lg">
                      {job.role}
                    </h3>
                    <span className="text-xs font-medium text-slate-500 whitespace-nowrap">
                      {job.period}
                    </span>
                  </div>
                  <p className="text-red-300 text-sm font-medium mb-4">{job.company}</p>
                  <ul className="space-y-2">
                    {job.tasks.map((task) => (
                      <li key={task} className="flex gap-2.5 text-sm text-slate-400 leading-relaxed">
                        <span className="mt-2 w-1 h-1 rounded-full bg-slate-600 shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
