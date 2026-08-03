import { heartExplosion } from "./atmosphere";

export function Welcome({ onEnter }: { onEnter: () => void }) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    heartExplosion(e.clientX, e.clientY, 34);
    window.setTimeout(onEnter, 900);
  };

  return (
    <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="glass animate-rise-in w-full max-w-xl rounded-4xl px-6 py-12 sm:px-12 sm:py-16">
        <p className="font-script text-gradient-rose animate-shimmer text-3xl leading-tight sm:text-5xl">
          A Special Surprise
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-wide sm:text-5xl">
          ✨ For My Queen ✨
        </h1>
        <p className="mx-auto mt-6 max-w-sm text-sm text-muted-foreground sm:text-base">
          “Every click brings you closer to my heart.”
        </p>

        <button
          onClick={handleClick}
          className="glow-rose mt-10 rounded-full px-8 py-4 text-base font-semibold text-primary-foreground transition-all duration-500 hover:scale-110 hover:brightness-110 sm:text-lg"
          style={{ backgroundImage: "var(--gradient-rose)" }}
        >
          💝 Let&apos;s Go Darling 💝
        </button>

        <p className="mt-8 text-xs tracking-[0.3em] text-muted-foreground uppercase">
          To My Miss Universe
        </p>
      </div>
    </section>
  );
}
