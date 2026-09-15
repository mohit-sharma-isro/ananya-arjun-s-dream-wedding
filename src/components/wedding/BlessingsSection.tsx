import { blessings } from "@/data/weddingData";
import { SectionHeading } from "./SectionHeading";

const sides = ["Bride's Family", "Groom's Family"] as const;

export function BlessingsSection() {
  return (
    <section id="blessings" className="relative px-5 py-12 sm:py-16">
      <SectionHeading
        eyebrow="Ashirvaad"
        title="Family & Blessings"
        subtitle="A wedding is two families saying yes. Here is what ours have to say"
      />

      <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2">
        {sides.map((side, si) => (
          <div key={side} className="reveal" style={{ transitionDelay: `${si * 120}ms` }}>
            <h3 className="mb-5 text-center font-display text-2xl text-ink">{side}</h3>
            <div className="space-y-5">
              {blessings
                .filter((b) => b.side === side)
                .map((b) => (
                  <figure
                    key={b.id}
                    className="rounded-3xl border border-gold/20 bg-card p-6 shadow-[0_24px_55px_-50px_var(--ink)] transition duration-300 hover:border-gold/40"
                  >
                    <span aria-hidden className="font-display text-4xl leading-none text-gold/60">
                      &ldquo;
                    </span>
                    <blockquote className="-mt-3 font-display text-lg italic leading-relaxed text-ink/85">
                      {b.message}
                    </blockquote>
                    <figcaption className="mt-4 border-t border-border pt-3">
                      <p className="text-sm text-ink">{b.names}</p>
                      <p className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">{b.relation}</p>
                    </figcaption>
                  </figure>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
