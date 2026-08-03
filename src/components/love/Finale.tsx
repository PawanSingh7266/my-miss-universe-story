import { useEffect, useState } from "react";

import { Confetti, FloatingHearts, RosePetals, Sparkles, StarField, heartExplosion } from "./atmosphere";

function useTypewriter(text: string, active: boolean, speed = 70) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!active) return;
    setOut("");
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [text, active, speed]);
  return out;
}

const TIMELINE = [2000, 4200, 6000, 5200, 5600, 5200];

export function Finale() {
  const [step, setStep] = useState(0);
  const [answered, setAnswered] = useState(false);
  const typed = useTypewriter("I LOVE YOU DARLING SO MUCH", step >= 2, 65);

  useEffect(() => {
    if (step >= TIMELINE.length) return;
    const id = window.setTimeout(() => setStep((s) => s + 1), TIMELINE[step]!);
    return () => window.clearTimeout(id);
  }, [step]);

  useEffect(() => {
    if (step === TIMELINE.length) {
      heartExplosion(window.innerWidth / 2, window.innerHeight / 2, 60);
    }
  }, [step]);

  const celebrating = step >= TIMELINE.length;

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <StarField count={140} bright />
      {celebrating && (
        <>
          <RosePetals count={26} />
          <Confetti pieces={110} />
          <Sparkles count={36} />
        </>
      )}
      {answered && <FloatingHearts count={40} />}

      <div className="relative z-40 flex min-h-screen flex-col items-center justify-center gap-8 px-6 text-center">
        {step >= 1 && step < TIMELINE.length && (
          <p className="font-display animate-rise-in max-w-xl text-lg leading-relaxed text-blush sm:text-2xl">
            One last message for the most beautiful girl in my universe…
          </p>
        )}

        {step >= 2 && (
          <div className="animate-rise-in relative flex items-center justify-center">
            <div
              className="animate-heartbeat text-[9rem] leading-none sm:text-[14rem]"
              style={{ filter: "drop-shadow(0 0 60px oklch(0.72 0.19 350 / 80%))" }}
              aria-hidden
            >
              ❤️
            </div>
            <p className="absolute inset-x-4 text-sm font-semibold tracking-widest text-primary-foreground sm:text-xl">
              {typed}
              <span className="ml-0.5" style={{ animation: "caret 1s step-end infinite" }}>
                |
              </span>
            </p>
          </div>
        )}

        {step >= 3 && (
          <p className="font-display animate-rise-in max-w-xl text-base leading-relaxed sm:text-2xl">
            “No matter how many stars shine in the sky, my favorite one will always be you.”
          </p>
        )}

        {step >= 4 && (
          <p className="font-display animate-rise-in max-w-xl text-base leading-relaxed text-blush sm:text-2xl">
            You are my happiness. You are my peace. You are my favorite person. You are my forever.
          </p>
        )}

        {step >= 5 && (
          <p className="font-display animate-rise-in max-w-xl text-base leading-relaxed text-gold sm:text-2xl">
            “I may not be perfect, but my love for you always will be.”
          </p>
        )}

        {celebrating && !answered && (
          <div className="glass animate-rise-in mt-4 rounded-4xl px-6 py-10 sm:px-12">
            <h2 className="text-gradient-rose animate-shimmer text-3xl font-semibold sm:text-5xl">
              ❤️ FOREVER YOURS ❤️
            </h2>
            <p className="font-script mt-6 text-3xl text-blush sm:text-4xl">From,</p>
            <p className="font-display mt-1 text-xl sm:text-2xl">Your Idiot ❤️</p>
            <p className="mt-1 text-sm text-muted-foreground sm:text-base">
              Who Will Always Love You 🥹❤️
            </p>

            <button
              onClick={(e) => {
                heartExplosion(e.clientX, e.clientY, 44);
                setAnswered(true);
              }}
              className="glow-gold mt-9 rounded-full px-7 py-4 text-sm font-semibold text-primary-foreground transition-transform duration-500 hover:scale-110 sm:text-base"
              style={{ backgroundImage: "var(--gradient-rose)" }}
            >
              💍 Will You Stay With Me Forever? ❤️
            </button>
          </div>
        )}

        {answered && (
          <div className="glass animate-rise-in rounded-4xl px-6 py-10 sm:px-14">
            <h2 className="text-gradient-rose animate-shimmer text-2xl font-semibold sm:text-5xl">
              ❤️ YES… THIS LOVE IS FOREVER ❤️
            </h2>
            <p className="font-display mt-6 max-w-lg text-base leading-relaxed sm:text-xl">
              “Thank you for being the most beautiful chapter of my life.”
            </p>
            <p
              className="font-script mt-8 text-3xl text-gold sm:text-5xl"
              style={{ animation: "rise-in 2.4s ease-out 1.2s both" }}
            >
              ❤️ I Love You Darling So Much ❤️
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
