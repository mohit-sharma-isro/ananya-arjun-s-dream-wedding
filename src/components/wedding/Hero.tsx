import { useState } from "react";
import { couple } from "@/data/weddingData";
import { Petals } from "./Petals";
import { Countdown } from "./Countdown";
import { Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 py-16 text-center"
    >
      <img
        src={couple.heroImage}
        alt="Floral mandap at golden hour"
        width={1600}
        height={1008}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-ivory/72" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, transparent 20%, var(--ivory) 92%), radial-gradient(70% 50% at 50% 40%, var(--blush-soft) 0%, transparent 70%)",
        }}
      />

      <Petals count={25} />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center animate-rise">
        <p className="font-display text-base font-bold tracking-[0.18em] text-[#b38328] sm:text-lg drop-shadow-sm">
          {couple.invocation}
        </p>

        <img
          src={couple.logoImage}
          alt={`${couple.groom.name} & ${couple.bride.name} Monogram Logo`}
          className="mt-6 h-28 w-28 object-contain drop-shadow-sm sm:h-36 sm:w-36"
        />



        <h1 className="mt-4 font-display text-[3.25rem] leading-[0.95] text-ink sm:text-8xl">
          {couple.groom.name}
          <span className="mx-2 font-script text-3xl italic text-gold sm:mx-4 sm:text-5xl">&amp;</span>
          {couple.bride.name}
        </h1>

        <div className="mt-6 max-w-md rounded-2xl border border-gold/25 bg-card/60 p-6 shadow-sm backdrop-blur-sm">
          <p className="font-display text-base italic leading-relaxed text-ink/85 sm:text-lg">{couple.welcome}</p>
        </div>

        <p className="mt-5 text-[0.8rem] uppercase tracking-[0.3em] text-gold">{couple.hashtag}</p>

        <p className="mt-3 font-display text-lg text-ink/80 sm:text-2xl">{couple.displayDate}</p>
        <p className="mt-1 text-[0.68rem] uppercase tracking-[0.3em] text-muted-foreground">{couple.city}</p>

        <div className="gold-rule mt-6 w-44 sm:w-64" />

        <div className="mt-8 w-full">
          <Countdown />
        </div>
      </div>
    </section>
  );
}
