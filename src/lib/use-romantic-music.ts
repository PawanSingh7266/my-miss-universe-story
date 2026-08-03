import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Soft, generated romantic piano-pad loop (Web Audio API).
 * No external audio file needed, so it always plays and never 404s.
 */
const PROGRESSION: number[][] = [
  [329.63, 415.3, 493.88], // C#m-ish shimmer
  [293.66, 369.99, 440.0],
  [261.63, 329.63, 392.0],
  [246.94, 311.13, 369.99],
];

export function useRomanticMusic() {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);
  const stepRef = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.28);

  const playChord = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;
    const chord = PROGRESSION[stepRef.current % PROGRESSION.length]!;
    stepRef.current += 1;

    chord.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = i === 0 ? "sine" : "triangle";
      osc.frequency.value = freq;
      const start = ctx.currentTime + i * 0.12;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.linearRampToValueAtTime(0.16, start + 0.9);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 4.6);
      osc.connect(gain).connect(master);
      osc.start(start);
      osc.stop(start + 4.8);
    });
  }, []);

  const start = useCallback(() => {
    if (typeof window === "undefined") return;
    if (!ctxRef.current) {
      const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      const master = ctx.createGain();
      master.gain.value = volume;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 1600;
      master.connect(filter).connect(ctx.destination);
      ctxRef.current = ctx;
      masterRef.current = master;
    }
    void ctxRef.current.resume();
    if (timerRef.current === null) {
      playChord();
      timerRef.current = window.setInterval(playChord, 4200);
    }
    setPlaying(true);
  }, [playChord, volume]);

  const stop = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    void ctxRef.current?.suspend();
    setPlaying(false);
  }, []);

  const toggle = useCallback(() => (playing ? stop() : start()), [playing, start, stop]);

  const fadeTo = useCallback((target: number, seconds = 3) => {
    setVolume(target);
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.linearRampToValueAtTime(Math.max(target, 0.0001), ctx.currentTime + seconds);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
      void ctxRef.current?.close();
    };
  }, []);

  return { playing, start, stop, toggle, fadeTo };
}
