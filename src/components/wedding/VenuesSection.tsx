import { useState } from "react";
import { Navigation, Calendar, Sparkles } from "lucide-react";
import { embedMapUrl } from "@/lib/eventUtils";
import { SectionHeading } from "./SectionHeading";

export interface VenueLocation {
  id: string;
  name: string;
  subtitle: string;
  address: string;
  dateStr: string;
  events: Array<{
    name: string;
    timing: string;
    badge: string;
  }>;
  lat: number;
  lng: number;
  mapsLink: string;
}

export const venueLocations: VenueLocation[] = [
  {
    id: "dhamot",
    name: "Dhamot",
    subtitle: "Ancestral Venue for Pre-Wedding Functions",
    address: "Dhamot, Punjab",
    dateStr: "Thursday, 19 November 2026",
    events: [
      { name: "Haldi Ceremony", timing: "11:00 AM – 3:00 PM", badge: "Turmeric & Sunshine" },
      { name: "Jaago (Sangeet)", timing: "6:00 PM onwards", badge: "Music & Dhol Night" },
    ],
    lat: 30.6385,
    lng: 76.0125,
    mapsLink: "https://maps.app.goo.gl/jQ3kYXVQoQn5Yy3Z8?g_st=ic",
  },
  {
    id: "ludhiana",
    name: "By the Falls Mansion",
    subtitle: "Grand Wedding Ceremony & Reception",
    address: "Ludhiana, Punjab",
    dateStr: "Saturday, 21 November 2026",
    events: [
      { name: "Wedding & Pheras", timing: "7:00 PM onwards", badge: "Royal Formal" },
    ],
    lat: 30.8654,
    lng: 75.7891,
    mapsLink: "https://maps.app.goo.gl/Qbd3A9LUKMCBLbGk9?g_st=ic",
  },
];

export function VenuesSection() {
  const [active, setActive] = useState<VenueLocation>(venueLocations[0]!);

  return (
    <section id="venues" className="bg-sage-soft/50 px-5 py-20 sm:py-28">
      <SectionHeading
        eyebrow="Finding Us"
        title="Venues & Map"
        subtitle="Explore our two primary venue locations in Punjab. Tap a venue to view events hosted and map details."
      />

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_1.25fr]">
        {/* Venue Location Cards */}
        <div className="reveal space-y-4">
          {venueLocations.map((loc) => {
            const isSelected = active.id === loc.id;
            return (
              <div key={loc.id}>
                <button
                  type="button"
                  onClick={() => setActive(loc)}
                  aria-pressed={isSelected}
                  className={`w-full rounded-3xl border p-6 text-left transition-all duration-300 ${
                    isSelected
                      ? "border-gold bg-card shadow-[0_20px_50px_-30px_var(--ink)] scale-[1.01]"
                      : "border-gold/20 bg-card/60 hover:bg-card hover:border-gold/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-2xl text-ink">{loc.name}</h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">{loc.address}</p>
                    </div>
                  </div>

                  {/* Date & Hosted Events List */}
                  <div className="mt-4 pt-3 border-t border-gold/15 space-y-2">
                    <p className="text-xs font-medium text-gold-ink flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-gold" />
                      {loc.dateStr}
                    </p>
                    
                    <div className="space-y-1.5 pt-1">
                      {loc.events.map((ev) => (
                        <div key={ev.name} className="flex items-center justify-between text-xs text-ink/80 bg-background/50 rounded-xl px-3 py-2 border border-gold/10">
                          <span className="font-medium text-ink flex items-center gap-1.5">
                            <Sparkles className="h-3 w-3 text-gold shrink-0" />
                            {ev.name}
                          </span>
                          <span className="text-[0.7rem] text-muted-foreground">{ev.timing}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Map Frame & Direct Actions */}
        <div className="reveal overflow-hidden rounded-3xl border border-gold/30 bg-card shadow-[0_30px_70px_-50px_var(--ink)]">
          <iframe
            key={active.id}
            title={`Map of ${active.name}`}
            src={embedMapUrl(active.lat, active.lng)}
            loading="lazy"
            className="h-80 w-full border-0 sm:h-[26rem]"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between bg-card/90 backdrop-blur-sm border-t border-gold/20">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-display text-2xl text-ink">{active.name}</p>
                <span className="text-xs text-gold-ink italic">({active.address})</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Hosting: <strong className="text-ink">{active.events.map(e => e.name).join(" & ")}</strong>
              </p>
            </div>
            <a
              href={active.mapsLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full bg-gold text-ink px-6 py-3 text-xs uppercase font-semibold tracking-[0.2em] shadow-md transition hover:bg-gold-soft hover:scale-105"
            >
              <Navigation className="h-4 w-4" /> Open Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

