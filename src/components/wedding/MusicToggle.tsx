import { useCallback, useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";

type Ctx = {
  ctx: AudioContext;
  gain: GainNode;
  stop: () => void;
};

/**
 * Ambient shehnai-inspired pad generated with the Web Audio API, so the
 * invitation carries soft background music without shipping an audio file.
 */
function createAmbience(): Ctx {
  const AudioCtor: typeof AudioContext =
    window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new AudioCtor();

  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 1400;
  filter.connect(master);

  // Gentle raga-like drone: Sa - Pa - Sa' with slow shimmer.
  const freqs = [146.83, 220, 293.66, 440];
  const nodes: OscillatorNode[] = [];
  freqs.forEach((f, i) => {
    const osc = ctx.createOscillator();
    osc.type = i === 3 ? "triangle" : "sine";
    osc.frequency.value = f;

    const g = ctx.createGain();
    g.gain.value = i === 3 ? 0.05 : 0.12 / (i + 1);

    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.05 + i * 0.03;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = i === 3 ? 0.03 : 0.04;
    lfo.connect(lfoGain).connect(g.gain);
    lfo.start();

    osc.connect(g).connect(filter);
    osc.start();
    nodes.push(osc, lfo);
  });

  return {
    ctx,
    gain: master,
    stop: () => {
      nodes.forEach((n) => {
        try {
          n.stop();
        } catch {
          /* already stopped */
        }
      });
      void ctx.close();
    },
  };
}

export function MusicToggle({ autoStart = false, className = "" }: { autoStart?: boolean; className?: string }) {
  const ref = useRef<Ctx | null>(null);
  const [playing, setPlaying] = useState(false);

  const start = useCallback(() => {
    try {
      if (!ref.current) ref.current = createAmbience();
      const { ctx, gain } = ref.current;
      void ctx.resume();
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.setTargetAtTime(0.32, ctx.currentTime, 1.2);
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }, []);

  const stop = useCallback(() => {
    const cur = ref.current;
    if (cur) cur.gain.gain.setTargetAtTime(0, cur.ctx.currentTime, 0.4);
    setPlaying(false);
  }, []);

  useEffect(() => {
    if (autoStart) start();
  }, [autoStart, start]);

  useEffect(() => () => ref.current?.stop(), []);

  return (
    <button
      type="button"
      onClick={() => (playing ? stop() : start())}
      aria-pressed={playing}
      aria-label={playing ? "Mute background music" : "Play background music"}
      className={`relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-card/80 text-ink shadow-sm backdrop-blur transition hover:border-gold hover:bg-card ${className}`}
    >
      {playing ? <Music className="h-4 w-4 text-gold" /> : <VolumeX className="h-4 w-4 text-muted-foreground" />}
      {playing && (
        <span
          aria-hidden
          className="absolute h-11 w-11 rounded-full border border-gold/40"
          style={{ animation: "soft-pulse 2.6s ease-in-out infinite" }}
        />
      )}
    </button>
  );
}
