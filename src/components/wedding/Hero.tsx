import { couple } from "@/data/weddingData";
import { Petals } from "./Petals";
import { MusicToggle } from "./MusicToggle";
import { Countdown } from "./Countdown";

export function Hero({ opened, onOpen }: { opened: boolean; onOpen: () => void }) {
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
      <Petals count={20} />

      <div className="absolute right-4 top-4 z-20 sm:right-6 sm:top-6">
        <MusicToggle autoStart={opened} />
      </div>

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center animate-rise">
        <p className="font-display text-base tracking-[0.18em] text-gold sm:text-lg">{couple.invocation}</p>

        <div className="mt-7 flex h-24 w-24 items-center justify-center rounded-full border border-gold/50 sm:h-28 sm:w-28">
          <div className="flex h-[86%] w-[86%] items-center justify-center rounded-full border border-gold/25">
            <span className="font-script text-2xl text-ink sm:text-3xl">A&nbsp;&amp;&nbsp;A</span>
          </div>
        </div>

        <p className="mt-8 text-[0.62rem] uppercase tracking-[0.42em] text-muted-foreground sm:text-xs">
          Together with our families
        </p>

        <h1 className="mt-4 font-display text-[3.25rem] leading-[0.95] text-ink sm:text-8xl">
          Ananya
          <span className="mx-2 font-script text-3xl italic text-gold sm:mx-4 sm:text-5xl">&amp;</span>
          Arjun
        </h1>

        <div className="gold-rule mt-7 w-44 sm:w-64" />

        <p className="mt-5 font-display text-lg text-ink/80 sm:text-2xl">{couple.displayDate}</p>
        <p className="mt-1 text-[0.68rem] uppercase tracking-[0.3em] text-muted-foreground">{couple.city}</p>

        <div className="mt-9 w-full">
          <Countdown />
        </div>

        {!opened ? (
          <button
            type="button"
            onClick={onOpen}
            className="mt-10 rounded-full bg-primary px-9 py-3.5 text-xs uppercase tracking-[0.28em] text-primary-foreground shadow-[0_18px_40px_-20px_var(--primary)] transition hover:scale-[1.03] active:scale-95"
          >
            Open Invitation
          </button>
        ) : (
          <p className="mt-10 max-w-md font-display text-lg italic leading-relaxed text-ink/75">{couple.welcome}</p>
        )}

        <p className="mt-6 text-[0.6rem] uppercase tracking-[0.3em] text-gold">{couple.hashtag}</p>
      </div>
    </section>
  );
}
