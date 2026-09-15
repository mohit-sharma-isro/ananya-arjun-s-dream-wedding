import { story, type StoryMoment } from "@/data/weddingData";
import { SectionHeading } from "./SectionHeading";

export function StorySection() {
  return (
    <section id="story" className="relative bg-blush-soft/50 px-5 py-20 sm:py-28">
      <SectionHeading
        eyebrow="How It Happened"
        title="Our Story"
        subtitle="A few of the moments that quietly turned into a lifetime."
      />

      <ol className="relative mx-auto max-w-3xl">
        <span aria-hidden className="absolute left-[1.15rem] top-2 bottom-2 w-px bg-gold/30 sm:left-1/2" />

        {story.map((m: StoryMoment, i: number) => (
          <li
            key={m.id}
            className={`reveal relative mb-12 pl-12 last:mb-0 sm:mb-16 sm:w-1/2 sm:pl-0 ${
              i % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:ml-auto sm:pl-12 sm:text-left"
            }`}
            style={{ transitionDelay: `${(i % 2) * 80}ms` }}
          >
            <span
              aria-hidden
              className={`absolute left-[0.72rem] top-2 h-4 w-4 rounded-full border border-gold bg-ivory sm:left-auto ${
                i % 2 === 0 ? "sm:-right-[0.6rem]" : "sm:-left-[0.6rem]"
              }`}
            >
              <span className="absolute inset-1 rounded-full bg-gold" />
            </span>

            <p className="text-[0.6rem] uppercase tracking-[0.32em] text-gold">{m.date}</p>
            <h3 className="mt-2 font-display text-2xl text-ink sm:text-3xl">{m.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-ink/75">{m.description}</p>
            <img
              src={m.image}
              alt={m.title}
              loading="lazy"
              width={1000}
              height={1000}
              className="mt-4 h-44 w-full rounded-2xl object-cover shadow-[0_24px_50px_-38px_var(--ink)] sm:h-40"
            />
          </li>
        ))}
      </ol>
    </section>
  );
}
