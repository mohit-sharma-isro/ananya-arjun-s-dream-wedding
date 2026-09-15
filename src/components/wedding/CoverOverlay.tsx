import { useState, useEffect } from "react";
import { couple } from "@/data/weddingData";

interface CoverOverlayProps {
  onOpened: () => void;
}

export function CoverOverlay({ onOpened }: CoverOverlayProps) {
  const [opening, setOpening] = useState(false);
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!hidden) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [hidden]);

  const handleOpen = () => {
    if (opening || hidden) return;
    setOpening(true);

    // Notify parent to reveal main site
    onOpened();

    // Start graceful fade-out halfway through door slide for a continuous 100% smooth transition
    setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        setHidden(true);
      }, 1000);
    }, 1400);
  };

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden select-none transition-opacity duration-1000 ease-out ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
      }`}
    >
      {/* Left Split Door Panel */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 bg-ivory border-r border-gold/40 shadow-2xl transition-transform duration-[2400ms] ease-[cubic-bezier(0.65,0,0.07,1)] ${
          opening ? "-translate-x-full pointer-events-none" : "translate-x-0"
        }`}
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 100% 50%, rgba(212,175,55,0.22) 0%, var(--ivory) 75%), linear-gradient(135deg, var(--ivory) 0%, var(--blush-soft) 100%)",
        }}
      >
        {/* Left Arch Border Overlay */}
        <div className="absolute inset-4 sm:inset-8 border border-r-0 border-gold/30 rounded-l-3xl pointer-events-none" />
        {/* Vertical Gold Seam Trim */}
        <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-gold/20 via-gold to-gold/20 shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
      </div>

      {/* Right Split Door Panel */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 bg-ivory border-l border-gold/40 shadow-2xl transition-transform duration-[2400ms] ease-[cubic-bezier(0.65,0,0.07,1)] ${
          opening ? "translate-x-full pointer-events-none" : "translate-x-0"
        }`}
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 0% 50%, rgba(212,175,55,0.22) 0%, var(--ivory) 75%), linear-gradient(-135deg, var(--ivory) 0%, var(--blush-soft) 100%)",
        }}
      >
        {/* Right Arch Border Overlay */}
        <div className="absolute inset-4 sm:inset-8 border border-l-0 border-gold/30 rounded-r-3xl pointer-events-none" />
        {/* Vertical Gold Seam Trim */}
        <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-gold/20 via-gold to-gold/20 shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
      </div>

      {/* Center Large Interactive Monogram Seal */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <button
          type="button"
          onClick={handleOpen}
          aria-label="Click monogram logo seal to open invitation"
          className="group relative flex flex-col items-center focus:outline-none cursor-pointer"
        >
          {/* Circular Shockwave Ripple Rings on Click */}
          {opening && (
            <>
              <div className="absolute inset-0 rounded-full border-2 border-gold/70 animate-ring-expand pointer-events-none" />
              <div className="absolute -inset-8 rounded-full border-2 border-gold/40 animate-ring-expand [animation-delay:200ms] pointer-events-none" />
              <div className="absolute -inset-16 rounded-full bg-gold/25 blur-xl animate-ping pointer-events-none" />
            </>
          )}

          {/* Outer Rotating Floral Orbits */}
          <div className="absolute -inset-6 rounded-full border border-gold/30 animate-[spin_30s_linear_infinite] group-hover:border-gold/60 transition-colors" />
          <div className="absolute -inset-12 rounded-full border border-dashed border-gold/20 animate-[spin_45s_linear_infinite_reverse] group-hover:border-gold/40 transition-colors" />

          {/* Center Large Logo Container */}
          <div
            className={`relative flex h-48 w-48 sm:h-64 sm:w-64 items-center justify-center rounded-full border-2 border-gold/60 bg-card p-7 sm:p-9 shadow-[0_25px_60px_rgba(212,175,55,0.3)] backdrop-blur-md transition-all duration-1000 ${
              opening
                ? "scale-125 opacity-0 blur-md rotate-12"
                : "scale-100 opacity-100 hover:scale-105 hover:shadow-[0_30px_70px_rgba(212,175,55,0.45)]"
            }`}
          >
            <img
              src={couple.logoImage}
              alt={`${couple.groom.name} & ${couple.bride.name} Logo`}
              className="h-full w-full object-contain filter drop-shadow-md transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        </button>
      </div>
    </div>
  );
}
