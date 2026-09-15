import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { couple } from "@/data/weddingData";

const links = [
  { id: "home", label: "Home" },
  { id: "couple", label: "Couple" },
  { id: "events", label: "Events" },
  { id: "venues", label: "Venues" },
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
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          solid ? "border-b border-gold/15 bg-ivory/90 backdrop-blur-md py-2.5" : "bg-transparent py-4"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <button type="button" onClick={() => go("home")} className="flex items-center">
            <img src={couple.logoImage} alt={`${couple.groom.name} & ${couple.bride.name} Logo`} className="h-9 w-auto object-contain" />
          </button>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.slice(1).map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => go(l.id)}
                className={`text-[0.65rem] uppercase tracking-[0.26em] transition-colors duration-300 ${
                  active === l.id ? "text-gold font-semibold" : "text-ink/75 hover:text-ink"
                }`}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex h-9 w-9 items-center justify-center text-ink lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button aria-label="Close menu" onClick={() => setOpen(false)} className="absolute inset-0 bg-ink/45" />
          <nav className="absolute inset-y-0 right-0 w-72 max-w-[82%] bg-ivory p-7 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="font-script text-xl text-ink">{couple.groom.name} &amp; {couple.bride.name}</span>
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

      {/* Clean text action links on small mobile screens */}
      <nav className="fixed inset-x-3 bottom-3 z-40 flex items-center justify-around px-2 py-2 sm:hidden">
        {["couple", "events", "venues", "rsvp"].map((id) => {
          const label = links.find((l) => l.id === id)!.label;
          return (
            <button
              key={id}
              type="button"
              onClick={() => go(id)}
              className={`px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.2em] font-medium transition ${
                active === id ? "text-gold" : "text-ink/70"
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
