import { useSiteContent } from '@/context/SiteContentContext';
import { getSocialPlatform } from '@/lib/socialPlatforms';
import Reveal from '@/components/Reveal';
import SectionHeader from '@/components/SectionHeader';

export default function SocialLinks() {
  const { content } = useSiteContent();
  const links = content.socialLinks.filter((l) => l.url.trim().length > 0);

  if (links.length === 0) return null;

  return (
    <section id="redes" className="relative px-6 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <SectionHeader eyebrow="Sígueme" title="Redes sociales" />
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
                  className="group flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.08] hover:text-rose-200 hover:shadow-[0_18px_40px_-20px_rgba(251,113,133,0.6)]"
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
