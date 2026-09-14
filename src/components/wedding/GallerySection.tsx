import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { gallery, galleryCategories } from "@/data/weddingData";
import { SectionHeading } from "./SectionHeading";

export function GallerySection() {
  const [category, setCategory] = useState<(typeof galleryCategories)[number]>("All");
  const [index, setIndex] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const items = category === "All" ? gallery : gallery.filter((g) => g.category === category);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: number) => setIndex((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [index, close, step]);

  const current = index === null ? null : (items[index] ?? null);

  return (
    <section id="gallery" className="bg-champagne-soft/45 px-5 py-20 sm:py-28">
      <SectionHeading eyebrow="Moments" title="Gallery" subtitle="Swipe, tap, linger. More to come after December." />

      <div className="reveal mx-auto mb-8 flex max-w-2xl flex-wrap justify-center gap-2">
        {galleryCategories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => {
              setCategory(c);
              setIndex(null);
            }}
            aria-pressed={category === c}
            className={`rounded-full border px-4 py-2 text-[0.62rem] uppercase tracking-[0.22em] transition ${
              category === c
                ? "border-transparent bg-ink text-ivory"
                : "border-gold/35 bg-card/70 text-ink hover:bg-card"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mx-auto max-w-5xl columns-2 gap-3 sm:columns-3 sm:gap-4">
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setIndex(i)}
            className="reveal mb-3 block w-full overflow-hidden rounded-2xl sm:mb-4"
            aria-label={`Open ${item.alt}`}
          >
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              width={1000}
              height={item.tall ? 1333 : 1000}
              className={`w-full object-cover transition duration-700 hover:scale-[1.04] ${
                item.tall ? "aspect-[3/4]" : "aspect-square"
              }`}
            />
          </button>
        ))}
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/92 p-4"
          onTouchStart={(e) => (touchX.current = e.touches[0]?.clientX ?? null)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;

            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close gallery"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/15 text-ivory backdrop-blur"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous photo"
            className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full bg-ivory/15 text-ivory backdrop-blur sm:left-8"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <figure className="max-h-[86svh] max-w-3xl text-center">
            <img
              src={current.src}
              alt={current.alt}
              className="mx-auto max-h-[76svh] w-auto rounded-2xl object-contain"
            />
            <figcaption className="mt-4 text-xs uppercase tracking-[0.24em] text-ivory/70">
              {current.alt} · {index! + 1}/{items.length}
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next photo"
            className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full bg-ivory/15 text-ivory backdrop-blur sm:right-8"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </section>
  );
}
