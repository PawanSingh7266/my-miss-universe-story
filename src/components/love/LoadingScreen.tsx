import { useEffect, useState } from "react";

const MESSAGES = [
  "Loading Smile...",
  "Loading Happiness...",
  "Loading My Favorite Person...",
  "Almost There...",
];

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setProgress((p) => {
        const next = p + 100 / 60;
        if (next >= 100) {
          window.clearInterval(id);
          window.setTimeout(onDone, 700);
          return 100;
        }
        return next;
      });
    }, 100);
    return () => window.clearInterval(id);
  }, [onDone]);

  const message = MESSAGES[Math.min(MESSAGES.length - 1, Math.floor((progress / 100) * MESSAGES.length))];

  return (
    <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="animate-heartbeat text-7xl drop-shadow-[0_0_40px_oklch(0.72_0.19_350/70%)] sm:text-8xl">
        ❤️
      </div>
      <h2 className="mt-8 text-xl font-semibold sm:text-3xl">❤️ Loading Beautiful Memories ❤️</h2>

      <div className="glass mt-8 h-3 w-full max-w-md overflow-hidden rounded-full p-[2px]">
        <div
          className="h-full rounded-full transition-[width] duration-200 ease-out"
          style={{ width: `${progress}%`, backgroundImage: "var(--gradient-rose)" }}
        />
      </div>

      <p className="font-script mt-6 text-2xl text-blush sm:text-3xl">{message}</p>
      <p className="mt-2 text-xs tracking-widest text-muted-foreground">
        {Math.round(progress)}%
      </p>
    </section>
  );
}
