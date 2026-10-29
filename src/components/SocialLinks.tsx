import { useSiteContent } from '@/context/SiteContentContext';
import { getSocialPlatform } from '@/lib/socialPlatforms';
import Reveal from '@/components/Reveal';

export default function SocialLinks() {
  const { content } = useSiteContent();
  const links = content.socialLinks.filter((l) => l.url.trim().length > 0);

  if (links.length === 0) return null;

  return (
    <section id="redes" className="relative bg-slate-900 py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <Reveal>
          <span className="text-red-400 text-sm font-semibold tracking-widest uppercase">
            Sígueme
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-3 mb-10">
            Redes sociales
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {links.map((link) => {
              const platform = getSocialPlatform(link.platform);
              const Icon = platform.icon;
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={platform.label}
                  title={platform.label}
                  className="group flex items-center justify-center w-14 h-14 rounded-2xl border border-slate-800 bg-slate-950/60 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-red-400/50 hover:text-red-300 hover:shadow-lg hover:shadow-red-500/10"
                >
                  <Icon size={22} />
                </a>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
