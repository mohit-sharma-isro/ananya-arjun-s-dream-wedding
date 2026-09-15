export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="reveal mx-auto mb-8 sm:mb-9 max-w-2xl text-center">
      <p className="text-[0.6rem] uppercase tracking-[0.4em] text-gold sm:text-[0.68rem]">{eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl text-ink sm:text-5xl">{title}</h2>
      <div className="gold-rule mx-auto mt-5 w-28" />
      {subtitle && <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">{subtitle}</p>}
    </header>
  );
}
