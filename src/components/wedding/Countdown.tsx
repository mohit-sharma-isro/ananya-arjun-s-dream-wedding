import { useEffect, useState } from "react";
import { couple } from "@/data/weddingData";

const TARGET = new Date(couple.weddingDate).getTime();

function diff() {
  const ms = TARGET - Date.now();
  if (ms <= 0) return null;
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms / 3_600_000) % 24),
    minutes: Math.floor((ms / 60_000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

export function Countdown({ compact = false }: { compact?: boolean }) {
  const [left, setLeft] = useState<ReturnType<typeof diff>>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLeft(diff());
    setReady(true);
    const id = setInterval(() => setLeft(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!ready) {
    return <div className="h-24" aria-hidden />;
  }

  if (!left) {
    return (
      <p className="font-display text-3xl text-blush-ink sm:text-4xl">The day has arrived ❤️</p>
    );
  }

  const cells = [
    { label: "Days", value: left.days },
    { label: "Hours", value: left.hours },
    { label: "Minutes", value: left.minutes },
    { label: "Seconds", value: left.seconds },
  ];

  return (
    <div
      className={`grid grid-cols-4 gap-2 sm:gap-4 ${compact ? "max-w-xs" : "max-w-lg"} mx-auto w-full`}
      aria-label="Countdown to the wedding day"
    >
      {cells.map((c) => (
        <div
          key={c.label}
          className="rounded-2xl border border-gold/25 bg-card/70 px-1 py-3 text-center shadow-[0_10px_30px_-24px_var(--gold)] backdrop-blur sm:py-5"
        >
          <div className="font-display text-2xl leading-none tabular-nums text-ink sm:text-4xl">
            {String(c.value).padStart(2, "0")}
          </div>
          <div className="mt-1.5 text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground sm:text-[0.65rem]">
            {c.label}
          </div>
        </div>
      ))}
    </div>
  );
}
