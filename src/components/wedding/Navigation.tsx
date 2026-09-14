import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { MusicToggle } from "./MusicToggle";

const links = [
  { id: "home", label: "Home" },
  { id: "couple", label: "Couple" },
  { id: "story", label: "Story" },
  { id: "events", label: "Events" },
  { id: "venues", label: "Venues" },
  { id: "gallery", label: "Gallery" },
  { id: "blessings", label: "Blessings" },
  { id: "rsvp", label: "RSVP" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 80);
      let current = "home";
      for (const l of links) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= 140) current = l.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition ${
          solid ? "border-b border-gold/15 bg-ivory/85 backdrop-blur-md" : ""
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <button type="button" onClick={() => go("home")} className="font-script text-lg text-ink">
            A &amp; A
          </button>

          <nav className="hidden items-center gap-6 lg:flex">
            {links.slice(1).map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => go(l.id)}
                className={`text-[0.62rem] uppercase tracking-[0.24em] transition ${
                  active === l.id ? "text-gold" : "text-ink/70 hover:text-ink"
                }`}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <MusicToggle className="h-9 w-9" />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-card/80 text-ink backdrop-blur lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button aria-label="Close menu" onClick={() => setOpen(false)} className="absolute inset-0 bg-ink/45" />
          <nav className="absolute inset-y-0 right-0 w-72 max-w-[82%] bg-ivory p-7 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="font-script text-xl text-ink">Ananya &amp; Arjun</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="gold-rule my-6 w-full" />
            <ul className="space-y-1">
              {links.map((l) => (
                <li key={l.id}>
                  <button
                    type="button"
                    onClick={() => go(l.id)}
                    className={`w-full rounded-xl px-3 py-3 text-left font-display text-xl transition ${
                      active === l.id ? "bg-blush-soft text-ink" : "text-ink/75"
                    }`}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {/* Thumb-friendly bottom bar on small screens */}
      <nav className="fixed inset-x-3 bottom-3 z-50 flex items-center justify-around rounded-full border border-gold/25 bg-ivory/92 px-2 py-2 shadow-[0_18px_40px_-28px_var(--ink)] backdrop-blur-md sm:hidden">
        {["couple", "events", "gallery", "rsvp"].map((id) => {
          const label = links.find((l) => l.id === id)!.label;
          return (
            <button
              key={id}
              type="button"
              onClick={() => go(id)}
              className={`rounded-full px-4 py-2 text-[0.6rem] uppercase tracking-[0.18em] transition ${
                active === id ? "bg-ink text-ivory" : "text-ink/70"
              }`}
            >
              {label}
            </button>
          );
        })}
      </nav>
    </>
  );
}
