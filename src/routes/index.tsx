import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { couple } from "@/data/weddingData";
import { Hero } from "@/components/wedding/Hero";
import { Navigation } from "@/components/wedding/Navigation";
import { CoupleSection } from "@/components/wedding/CoupleSection";
import { StorySection } from "@/components/wedding/StorySection";
import { EventsSection } from "@/components/wedding/EventsSection";
import { VenuesSection } from "@/components/wedding/VenuesSection";
import { GallerySection } from "@/components/wedding/GallerySection";
import { BlessingsSection } from "@/components/wedding/BlessingsSection";
import { RsvpSection } from "@/components/wedding/RsvpSection";
import { ShareSection } from "@/components/wedding/ShareSection";

const title = "Ananya & Arjun — Wedding Invitation · 20 Dec 2026, Ahmedabad";
const description =
  "Join Ananya & Arjun in Ahmedabad on 20 December 2026. Explore the Mehendi, Haldi, Sangeet, Wedding and Reception, view venues and RSVP online.";

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

  const open = () => {
    setOpened(true);
    requestAnimationFrame(() => {
      setTimeout(() => document.getElementById("couple")?.scrollIntoView({ behavior: "smooth" }), 120);
    });
  };

  return (
    <main className="relative min-h-screen bg-ivory text-ink">
      {opened && <Navigation />}

      <Hero opened={opened} onOpen={open} />

      {opened && (
        <div>
          <CoupleSection />
          <StorySection />
          <EventsSection />
          <VenuesSection />
          <GallerySection />
          <BlessingsSection />
          <RsvpSection />
          <ShareSection />

          <footer className="border-t border-gold/20 bg-card/60 px-5 py-12 text-center">
            <p className="font-display text-lg text-gold">{couple.invocation}</p>
            <p className="mt-4 font-display text-3xl text-ink">Ananya &amp; Arjun</p>
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
      )}
    </main>
  );
}
