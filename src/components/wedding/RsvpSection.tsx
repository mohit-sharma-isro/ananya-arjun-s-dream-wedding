import { Phone, Heart } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

export function RsvpSection() {
  return (
    <section id="rsvp" className="bg-blush-soft/50 px-5 py-12 sm:py-16">
      <SectionHeading
        eyebrow="Presence & Blessings"
        title="Warm Invite"
      />

      <div className="mx-auto max-w-2xl">
        <div className="reveal space-y-6 rounded-[2.5rem] border border-gold/30 bg-card p-8 text-center shadow-[0_30px_70px_-45px_var(--ink)] sm:p-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold">
            <Heart className="h-6 w-6 fill-gold/30 text-gold" />
          </div>

          <p className="font-display text-2xl sm:text-3xl leading-relaxed text-ink drop-shadow-sm">
            We would be honoured by your presence at our celebration
          </p>

          <div className="gold-rule mx-auto w-28 opacity-60" />

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold mb-1">
              R.S.V.P
            </p>
            <h4 className="font-display text-2xl text-gold-ink font-medium">
              Sharma Family
            </h4>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-ink/80">
              <a
                href="tel:9814005251"
                className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-background/60 px-5 py-2.5 transition hover:border-gold hover:bg-card hover:text-gold"
              >
                <Phone className="h-4 w-4 text-gold" />
                9814005251
              </a>
              <a
                href="tel:9872178451"
                className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-background/60 px-5 py-2.5 transition hover:border-gold hover:bg-card hover:text-gold"
              >
                <Phone className="h-4 w-4 text-gold" />
                9872178451
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

