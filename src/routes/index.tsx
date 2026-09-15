import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { couple } from "@/data/weddingData";
import { CoverOverlay } from "@/components/wedding/CoverOverlay";
import { Hero } from "@/components/wedding/Hero";
import { Navigation } from "@/components/wedding/Navigation";
import { CoupleSection } from "@/components/wedding/CoupleSection";
import { EventsSection } from "@/components/wedding/EventsSection";
import { VenuesSection } from "@/components/wedding/VenuesSection";
import { BlessingsSection } from "@/components/wedding/BlessingsSection";
import { RsvpSection } from "@/components/wedding/RsvpSection";

const title = "Mohit & Akansha — Wedding Invitation · 21 Nov 2026, Ludhiana, Punjab";
const description =
  "Join Mohit & Akansha in Ludhiana, Punjab on 21 November 2026. Explore the Haldi, Jaago (Sangeet), and Wedding, view venues and RSVP online.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Invitation,
});

function Invitation() {
  const [opened, setOpened] = useState(false);
  useReveal([opened]);

  return (
    <main className="relative min-h-screen bg-ivory text-ink overflow-x-hidden">
      <CoverOverlay onOpened={() => setOpened(true)} />

      {opened && <Navigation />}

      <Hero />

      <div>
        <CoupleSection />
        <EventsSection />
        <VenuesSection />
        <BlessingsSection />
        <RsvpSection />

        <footer className="border-t border-gold/20 bg-card/60 px-5 py-12 text-center">
          <p className="font-display text-lg text-gold">{couple.invocation}</p>
          <img src={couple.logoImage} alt={`${couple.groom.name} & ${couple.bride.name} Logo`} className="mx-auto mt-3 h-14 w-auto object-contain" />
          <p className="mt-3 font-display text-3xl text-ink">{couple.groom.name} &amp; {couple.bride.name}</p>
          <p className="mt-2 text-[0.62rem] uppercase tracking-[0.3em] text-muted-foreground">
            {couple.displayDate} · {couple.city}
          </p>
          <div className="gold-rule mx-auto mt-6 w-24" />
          <p className="mt-6 text-xs italic text-muted-foreground">
            Made with love, and a great deal of help from our families.
          </p>
          <div className="h-16 sm:h-0" />
        </footer>
      </div>
    </main>
  );
}
