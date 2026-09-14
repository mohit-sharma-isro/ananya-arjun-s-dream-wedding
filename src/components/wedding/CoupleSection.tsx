import { couple } from "@/data/weddingData";
import { SectionHeading } from "./SectionHeading";

const people = [
  { ...couple.bride, role: "The Bride" },
  { ...couple.groom, role: "The Groom" },
];

export function CoupleSection() {
  return (
    <section id="couple" className="relative px-5 py-20 sm:py-28">
      <SectionHeading
        eyebrow="The Two of Us"
        title="Ananya & Arjun"
        subtitle="Seven years of shared umbrellas, road trips and very long phone calls — and now, one shared surname's worth of forever."
      />

      <div className="mx-auto grid max-w-4xl gap-10 sm:grid-cols-2 sm:gap-12">
        {people.map((p, i) => (
          <article
            key={p.name}
            className="reveal text-center"
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <div className="relative mx-auto w-full max-w-[19rem]">
              <div className="absolute -inset-2.5 rounded-[9rem_9rem_1.5rem_1.5rem] border border-gold/35" />
              <img
                src={p.image}
                alt={p.fullName}
                loading="lazy"
                width={912}
                height={1200}
                className="relative h-[24rem] w-full rounded-[8.5rem_8.5rem_1rem_1rem] object-cover object-top shadow-[0_30px_60px_-40px_var(--ink)] sm:h-[26rem]"
              />
            </div>
            <p className="mt-7 text-[0.6rem] uppercase tracking-[0.38em] text-gold">{p.role}</p>
            <h3 className="mt-2 font-display text-3xl text-ink sm:text-4xl">{p.fullName}</h3>
            <p className="mt-1.5 text-xs italic text-muted-foreground">{p.parents}</p>
            <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-ink/75">{p.bio}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
