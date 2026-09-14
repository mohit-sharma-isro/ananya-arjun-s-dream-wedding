import { useState } from "react";
import { Copy, Check, Share2 } from "lucide-react";
import { couple, shareMessage } from "@/data/weddingData";

export function ShareSection() {
  const [copied, setCopied] = useState(false);

  const link = typeof window !== "undefined" ? window.location.origin + window.location.pathname : "";
  const fullText = `${shareMessage} ${link}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <section className="px-5 pb-24 pt-4 sm:pb-28">
      <div className="reveal mx-auto max-w-2xl rounded-3xl border border-gold/25 bg-card p-8 text-center shadow-[0_30px_70px_-55px_var(--ink)] sm:p-10">
        <p className="text-[0.6rem] uppercase tracking-[0.36em] text-gold">Spread the joy</p>
        <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">Share our invitation</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Send this invitation to family and friends on WhatsApp, complete with dates, venues and RSVP.
        </p>

        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(fullText)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-[0.66rem] uppercase tracking-[0.24em] text-primary-foreground transition hover:opacity-90 sm:w-auto"
          >
            <Share2 className="h-4 w-4" /> Share on WhatsApp
          </a>
          <button
            type="button"
            onClick={copy}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/50 px-7 py-3.5 text-[0.66rem] uppercase tracking-[0.24em] text-ink transition hover:bg-champagne-soft sm:w-auto"
          >
            {copied ? <Check className="h-4 w-4 text-sage-ink" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy invitation"}
          </button>
        </div>

        <p className="mt-8 font-script text-lg italic text-ink/70">{couple.hashtag}</p>
      </div>
    </section>
  );
}
