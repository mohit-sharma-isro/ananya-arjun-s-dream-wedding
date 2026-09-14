import { useMemo } from "react";

const PALETTE = ["var(--blush)", "var(--peach)", "var(--champagne)", "var(--blush-soft)"];

export function Petals({ count = 18 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const seed = (i * 9301 + 49297) % 233280;
        const r = seed / 233280;
        return {
          left: `${(r * 100 + i * 5.5) % 100}%`,
          size: 8 + ((i * 7) % 10),
          delay: `${(i * 1.37) % 14}s`,
          duration: `${13 + ((i * 3) % 9)}s`,
          drift: `${((i % 2 === 0 ? 1 : -1) * (30 + ((i * 13) % 70))).toFixed(0)}px`,
          color: PALETTE[i % PALETTE.length],
        };
      }),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden">
      {petals.map((p, i) => (
        <span
          key={i}
          className="absolute top-0 block"
          style={{
            left: p.left,
            width: p.size,
            height: p.size * 0.7,
            background: p.color,
            borderRadius: "60% 20% 60% 20%",
            opacity: 0.75,
            animation: `petal-fall ${p.duration} linear ${p.delay} infinite`,
            ["--drift" as string]: p.drift,
          }}
        />
      ))}
    </div>
  );
}
