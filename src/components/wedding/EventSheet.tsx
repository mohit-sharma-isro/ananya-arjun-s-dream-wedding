import { useEffect } from "react";
import { CalendarPlus, MapPin, Navigation, Shirt, X, Clock } from "lucide-react";
import { themes, type WeddingEvent } from "@/data/weddingData";
import {
  directionsUrl,
  embedMapUrl,
  formatEventDate,
  formatTimeRange,
  googleCalendarUrl,
} from "@/lib/eventUtils";

export function EventSheet({ event, onClose }: { event: WeddingEvent | null; onClose: () => void }) {
  useEffect(() => {
    if (!event) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [event, onClose]);

  if (!event) return null;
  const theme = themes[event.theme];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${event.name} details`}
      className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-ink/45 backdrop-blur-sm"
      />

      <div
        className="relative max-h-[92svh] w-full overflow-y-auto rounded-t-[2rem] bg-card shadow-2xl sm:max-w-lg sm:rounded-3xl"
        style={{ animation: "rise-in .45s cubic-bezier(.22,1,.36,1) both" }}
      >
        <div className="sticky top-0 z-10 flex justify-center bg-card/90 pt-3 backdrop-blur sm:hidden">
          <span className="h-1 w-10 rounded-full bg-border" />
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-ivory/90 text-ink shadow"
        >
          <X className="h-4 w-4" />
        </button>

        <img
          src={event.image}
          alt={event.name}
          loading="lazy"
          width={1000}
          height={1000}
          className="h-44 w-full object-cover sm:h-52 sm:rounded-t-3xl"
        />

        <div className="p-6 sm:p-7">
          <span
            className="inline-block rounded-full px-3 py-1 text-[0.58rem] uppercase tracking-[0.26em]"
            style={{ background: theme.soft, color: theme.ink }}
          >
            {theme.label}
          </span>
          <h3 className="mt-3 font-display text-3xl text-ink">{event.name}</h3>
          <p className="font-script text-sm italic text-muted-foreground">{event.subtitle}</p>

          <p className="mt-4 text-sm leading-relaxed text-ink/75">{event.description}</p>

          <dl className="mt-6 space-y-4 text-sm">
            <div className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <div>
                <dt className="text-[0.58rem] uppercase tracking-[0.24em] text-muted-foreground">When</dt>
                <dd className="text-ink">
                  {formatEventDate(event.date)}
                  <br />
                  {formatTimeRange(event)} IST
                </dd>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <div>
                <dt className="text-[0.58rem] uppercase tracking-[0.24em] text-muted-foreground">Where</dt>
                <dd className="text-ink">
                  {event.venue}
                  <br />
                  <span className="text-muted-foreground">{event.address}</span>
                </dd>
              </div>
            </div>
            <div className="flex gap-3">
              <Shirt className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <div>
                <dt className="text-[0.58rem] uppercase tracking-[0.24em] text-muted-foreground">Dress code</dt>
                <dd className="text-ink">{event.dressCode}</dd>
              </div>
            </div>
          </dl>

          <div className="mt-6 overflow-hidden rounded-2xl border border-border">
            <iframe
              title={`Map of ${event.venue}`}
              src={embedMapUrl(event.lat, event.lng)}
              loading="lazy"
              className="h-44 w-full border-0"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
            <a
              href={googleCalendarUrl(event)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-[0.68rem] uppercase tracking-[0.2em] text-primary-foreground transition hover:opacity-90"
            >
              <CalendarPlus className="h-4 w-4" /> Google Calendar
            </a>
            <a
              href={directionsUrl(event)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-full border border-gold/50 px-4 py-3 text-[0.68rem] uppercase tracking-[0.2em] text-ink transition hover:bg-champagne-soft"
            >
              <Navigation className="h-4 w-4" /> Get Directions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
