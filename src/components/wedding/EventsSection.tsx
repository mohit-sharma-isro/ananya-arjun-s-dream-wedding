import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { events, themes, type WeddingEvent } from "@/data/weddingData";
import { formatEventDate, formatTimeRange } from "@/lib/eventUtils";
import { SectionHeading } from "./SectionHeading";
import { EventSheet } from "./EventSheet";

const filters = ["All", ...events.map((e) => e.name)];

export function EventsSection() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<WeddingEvent | null>(null);

  const shown = filter === "All" ? events : events.filter((e) => e.name === filter);

  return (
    <section id="events" className="bg-blush-soft/50 px-5 py-20 sm:py-28">
      <SectionHeading
        eyebrow="Wedding Celebrations"
        title="Wedding Events"
        subtitle="Tap any celebration for timings, dress code, directions and a calendar reminder."
      />

      <div className="reveal mx-auto mb-10 flex max-w-3xl snap-x gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`shrink-0 snap-start rounded-full border px-4 py-2 text-[0.62rem] uppercase tracking-[0.22em] transition ${
              filter === f
                ? "border-transparent bg-ink text-ivory"
                : "border-gold/35 bg-card/60 text-ink hover:bg-champagne-soft"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((e, i) => {
          const theme = themes[e.theme];
          return (
            <button
              key={e.id}
              type="button"
              onClick={() => setActive(e)}
              style={{ transitionDelay: `${i * 70}ms` }}
              className="reveal group overflow-hidden rounded-3xl border border-gold/20 bg-card text-left shadow-[0_26px_60px_-48px_var(--ink)] transition hover:-translate-y-1 hover:shadow-[0_30px_70px_-40px_var(--ink)]"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={e.image}
                  alt={e.name}
                  loading="lazy"
                  width={1000}
                  height={1000}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <span
                  className="absolute left-3 top-3 rounded-full px-3 py-1 text-[0.55rem] uppercase tracking-[0.24em]"
                  style={{ background: theme.soft, color: theme.ink }}
                >
                  {theme.label}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-2xl text-ink">{e.name}</h3>
                    <p className="font-script text-xs italic text-muted-foreground">{e.subtitle}</p>
                  </div>
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-gold transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <div className="mt-4 space-y-1 text-xs text-ink/70">
                  <p>{formatEventDate(e.date)}</p>
                  <p>{formatTimeRange(e)}</p>
                  <p className="truncate text-muted-foreground">{e.venue}</p>
                </div>
                <div className="mt-4 h-px w-full" style={{ background: theme.color, opacity: 0.55 }} />
              </div>
            </button>
          );
        })}
      </div>

      <EventSheet event={active} onClose={() => setActive(null)} />
    </section>
  );
}
