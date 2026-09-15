import { useState } from "react";
import { couple } from "@/data/weddingData";
import { SectionHeading } from "./SectionHeading";

export function CoupleSection() {
  const [activePerson, setActivePerson] = useState<"groom" | "bride" | "both">("both");

  // Select image based on active tab: dedicated portrait for individual, combined m&a.png for both
  const currentImage =
    activePerson === "groom"
      ? couple.groom.image
      : activePerson === "bride"
      ? couple.bride.image
      : couple.coupleImage;

  return (
    <section id="couple" className="relative px-5 py-20 sm:py-28">
      <SectionHeading
        eyebrow="The Two of Us"
        title={`${couple.groom.name} & ${couple.bride.name}`}
        subtitle="Different origins, a shared horizon, and a lifetime left to wander side by side."
      />

      <div className="mx-auto max-w-4xl">
        {/* Person Selector Tabs */}
        <div className="mb-8 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => setActivePerson("groom")}
            className={`rounded-full px-6 py-2.5 text-xs uppercase tracking-[0.22em] transition-all duration-300 ${
              activePerson === "groom"
                ? "bg-gold text-ink font-semibold shadow-md scale-105"
                : "border border-gold/30 bg-card/60 text-ink/75 hover:border-gold/60"
            }`}
          >
            {couple.groom.name} (Groom)
          </button>
          <button
            type="button"
            onClick={() => setActivePerson("both")}
            className={`rounded-full px-6 py-2.5 text-xs uppercase tracking-[0.22em] transition-all duration-300 ${
              activePerson === "both"
                ? "bg-gold text-ink font-semibold shadow-md scale-105"
                : "border border-gold/30 bg-card/60 text-ink/75 hover:border-gold/60"
            }`}
          >
            Both
          </button>
          <button
            type="button"
            onClick={() => setActivePerson("bride")}
            className={`rounded-full px-6 py-2.5 text-xs uppercase tracking-[0.22em] transition-all duration-300 ${
              activePerson === "bride"
                ? "bg-gold text-ink font-semibold shadow-md scale-105"
                : "border border-gold/30 bg-card/60 text-ink/75 hover:border-gold/60"
            }`}
          >
            {couple.bride.name} (Bride)
          </button>
        </div>

        {/* Central Single Photo Frame with Crossfade Transition */}
        <div className="reveal relative mx-auto max-w-2xl overflow-hidden rounded-[3rem] border-2 border-gold/35 bg-card/80 shadow-[0_30px_70px_-35px_var(--ink)] backdrop-blur-sm">
          <div className="relative h-[28rem] sm:h-[36rem] w-full overflow-hidden bg-[#e8ded3]/30">
            <img
              key={activePerson}
              src={currentImage}
              alt={
                activePerson === "groom"
                  ? couple.groom.fullName
                  : activePerson === "bride"
                  ? couple.bride.fullName
                  : `${couple.groom.name} & ${couple.bride.name}`
              }
              className={`h-full w-full object-cover transition-all duration-700 ease-out animate-rise ${
                activePerson === "bride" ? "object-[center_75%]" : "object-top"
              }`}
            />

            {/* Bottom Dark Gradient for Text Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent pointer-events-none" />

            {/* Dynamic Centered Info Overlay inside Image */}
            <div className="absolute bottom-6 inset-x-6 text-center text-ivory">
              <p className="text-[0.65rem] uppercase tracking-[0.38em] text-gold-soft">
                {activePerson === "groom"
                  ? "The Groom"
                  : activePerson === "bride"
                  ? "The Bride"
                  : "Together Forever"}
              </p>

              <h4 className="mt-1 font-display text-3xl sm:text-4xl text-ivory drop-shadow-sm">
                {activePerson === "groom"
                  ? couple.groom.fullName
                  : activePerson === "bride"
                  ? couple.bride.fullName
                  : `${couple.groom.name} & ${couple.bride.name}`}
              </h4>

              {(activePerson === "groom" || activePerson === "bride") && (
                <p className="mt-1 text-xs italic text-gold-soft/90">
                  {activePerson === "groom" ? couple.groom.parents : couple.bride.parents}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
