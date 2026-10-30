interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export default function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-14 text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-200/90 backdrop-blur-xl">
        <span className="h-1.5 w-1.5 rounded-full bg-rose-200/80" />
        {eyebrow}
      </span>
      <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mx-auto mt-4 max-w-2xl text-white/55">{description}</p>
      ) : null}
    </div>
  );
}
