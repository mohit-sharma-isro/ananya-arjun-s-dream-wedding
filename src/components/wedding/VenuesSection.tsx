import { useState } from "react";
import { Navigation } from "lucide-react";
import { events } from "@/data/weddingData";
import { directionsUrl, embedMapUrl } from "@/lib/eventUtils";
import { SectionHeading } from "./SectionHeading";

export function VenuesSection() {
  const [active, setActive] = useState(events[3]!);

  return (
    <section id="venues" className="bg-sage-soft/50 px-5 py-20 sm:py-28">
      <SectionHeading
        eyebrow="Finding Us"
        title="Venues & Map"
        subtitle="Everything happens in and around Ahmedabad. Pick a venue to see it on the map."
      />

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_1.25fr]">
        <ul className="reveal space-y-3">
          {events.map((e) => (
            <li key={e.id}>
              <button
                type="button"
                onClick={() => setActive(e)}
                aria-pressed={active.id === e.id}
                className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                  active.id === e.id
                    ? "border-gold bg-card shadow-[0_20px_40px_-34px_var(--ink)]"
                    : "border-transparent bg-card/60 hover:bg-card"
                }`}
              >
                <p className="font-display text-xl text-ink">{e.name}</p>
                <p className="mt-0.5 text-sm text-ink/75">{e.venue}</p>
                <p className="mt-1 text-xs text-muted-foreground">{e.address}</p>
              </button>
            </li>
          ))}
        </ul>

        <div className="reveal overflow-hidden rounded-3xl border border-gold/25 bg-card shadow-[0_30px_70px_-50px_var(--ink)]">
          <iframe
            key={active.id}
            title={`Map of ${active.venue}`}
            src={embedMapUrl(active.lat, active.lng)}
            loading="lazy"
            className="h-72 w-full border-0 sm:h-96"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-xl text-ink">{active.venue}</p>
              <p className="text-xs text-muted-foreground">{active.address}</p>
            </div>
            <a
              href={directionsUrl(active)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-[0.65rem] uppercase tracking-[0.2em] text-primary-foreground transition hover:opacity-90"
            >
              <Navigation className="h-4 w-4" /> Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
