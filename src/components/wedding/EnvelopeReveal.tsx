import { useState, useEffect } from "react";
import { couple } from "@/data/weddingData";
import { Petals } from "./Petals";

interface EnvelopeRevealProps {
  onOpened: () => void;
}

export function EnvelopeReveal({ onOpened }: EnvelopeRevealProps) {
  const [opening, setOpening] = useState(false);
  const [done, setDone] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    // Notify parent immediately so sections mount behind doors
    onOpened();

    // After animation finishes, remove overlay
    setTimeout(() => {
      setDone(true);
    }, 1400);
  };

  if (done) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-opacity duration-700 ${
        opening ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* Left Curtain Door */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 bg-ivory border-r-2 border-gold/40 shadow-2xl transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          opening ? "-translate-x-full" : "translate-x-0"
        }`}
        style={{
          backgroundImage:
            "radial-gradient(circle at 100% 50%, var(--blush-soft) 0%, transparent 70%), linear-gradient(135deg, rgba(212,175,55,0.06) 0%, transparent 100%)",
        }}
      >
        <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-transparent via-gold/50 to-transparent" />
        <div className="absolute top-12 left-12 font-display text-xs tracking-[0.3em] text-gold/60 uppercase">
          {couple.invocation}
        </div>
      </div>

      {/* Right Curtain Door */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 bg-ivory border-l-2 border-gold/40 shadow-2xl transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          opening ? "translate-x-full" : "translate-x-0"
        }`}
        style={{
          backgroundImage:
            "radial-gradient(circle at 0% 50%, var(--peach-soft) 0%, transparent 70%), linear-gradient(-135deg, rgba(212,175,55,0.06) 0%, transparent 100%)",
        }}
      >
        <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-transparent via-gold/50 to-transparent" />
        <div className="absolute bottom-12 right-12 font-display text-xs tracking-[0.3em] text-gold/60 uppercase">
          {couple.displayDate}
        </div>
      </div>

      {/* Petal burst during opening */}
      {opening && <Petals count={35} />}

      {/* Center Wax Seal Badge & Button */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center p-8 transition-all duration-700 ${
          opening ? "scale-150 opacity-0 blur-sm" : "scale-100 opacity-100"
        }`}
      >
        {/* Decorative Ring */}
        <div className="absolute -inset-6 rounded-full border border-gold/30 animate-[spin_20s_linear_infinite]" />
        <div className="absolute -inset-12 rounded-full border border-dashed border-gold/20 animate-[spin_35s_linear_infinite_reverse]" />

        {/* Monogram Seal Container */}
        <div className="relative flex h-36 w-36 sm:h-44 sm:w-44 items-center justify-center rounded-full bg-card border-2 border-gold/60 shadow-[0_20px_50px_rgba(212,175,55,0.25)] p-4 backdrop-blur-md">
          <img
            src={couple.logoImage}
            alt={`${couple.groom.name} & ${couple.bride.name} Logo`}
            className="h-full w-full object-contain drop-shadow"
          />
        </div>

        <p className="mt-6 font-display text-2xl tracking-wider text-ink sm:text-3xl">
          {couple.groom.name} <span className="font-script text-gold">&amp;</span> {couple.bride.name}
        </p>

        <p className="mt-1 text-[0.62rem] uppercase tracking-[0.35em] text-muted-foreground">
          {couple.displayDate}
        </p>

        <button
          type="button"
          onClick={handleOpen}
          className="mt-8 group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-primary px-10 py-4 text-xs font-medium uppercase tracking-[0.3em] text-primary-foreground shadow-xl transition-all duration-300 hover:scale-105 hover:bg-primary/90 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gold/50"
        >
          <span className="relative z-10 flex items-center gap-2">
            <span>Open Invitation</span>
            <span className="text-gold group-hover:translate-x-1 transition-transform">✦</span>
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/30 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[pulse_2s_infinite]" />
        </button>

        <p className="mt-4 text-[0.6rem] uppercase tracking-[0.25em] text-gold/80">
          ॥ Click seal to open ॥
        </p>
      </div>
    </div>
  );
}
