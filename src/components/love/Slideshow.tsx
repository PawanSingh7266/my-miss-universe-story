import { useCallback, useEffect, useState } from "react";

import photo1 from "@/assets/photo1.jpg.asset.json";
import photo2 from "@/assets/photo2.jpg.asset.json";
import photo3 from "@/assets/photo3.jpg.asset.json";
import photo4 from "@/assets/photo4.jpg.asset.json";

type Slide = {
  src: string;
  alt: string;
  caption: string;
  effect: "zoom" | "hearts" | "glow" | "featured";
};

const SLIDES: Slide[] = [
  {
    src: photo1.url,
    alt: "My love standing against a warm wooden wall",
    caption: "❤️ “The day I met you, my life changed forever.”",
    effect: "zoom",
  },
  {
    src: photo2.url,
    alt: "My love smiling softly at a café table",
    caption: "🌹 “Your smile is the most beautiful thing I’ve ever seen.”",
    effect: "hearts",
  },
  {
    src: photo3.url,
    alt: "Polaroid memories of us together",
    caption: "✨ “Every moment with you becomes my favorite memory.”",
    effect: "glow",
  },
  {
    src: photo4.url,
    alt: "My Miss Universe in a green saree",
    caption: "👑 My Miss Universe 👑",
    effect: "featured",
  },
];

export function Slideshow() {
  const [index, setIndex] = useState(0);

  const go = useCallback((dir: number) => {
    setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => go(1), 5000);
    return () => window.clearInterval(id);
  }, [go]);

  const slide = SLIDES[index]!;
  const featured = slide.effect === "featured";

  return (
    <section id="memories" className="relative z-10 mx-auto w-full max-w-4xl px-5 py-20">
      <h2 className="text-center text-2xl font-semibold sm:text-4xl">
        <span className="text-gradient-rose animate-shimmer">Our Photo Memories</span>
      </h2>

      <div className="glass relative mt-10 overflow-hidden rounded-4xl p-4 sm:p-6">
        {featured && (
          <div className="animate-crown pointer-events-none absolute left-1/2 top-1 z-20 -translate-x-1/2 text-4xl sm:text-5xl">
            👑
          </div>
        )}

        <div
          className={`relative overflow-hidden rounded-3xl ${
            featured ? "animate-gold-pulse border-2 border-gold" : "border border-border"
          }`}
        >
          {SLIDES.map((s, i) => (
            <img
              key={s.src}
              src={s.src}
              alt={s.alt}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              className={`h-[54vh] w-full object-cover transition-all duration-1000 ease-out sm:h-[62vh] ${
                i === index
                  ? "relative scale-100 opacity-100 blur-0"
                  : "pointer-events-none absolute inset-0 scale-110 opacity-0 blur-sm"
              } ${i === index && s.effect === "zoom" ? "animate-slow-zoom" : ""}`}
              style={
                i === index && s.effect === "glow"
                  ? { boxShadow: "inset 0 0 90px oklch(0.72 0.19 350 / 45%)" }
                  : undefined
              }
            />
          ))}

          {slide.effect === "hearts" && (
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
              {Array.from({ length: 10 }).map((_, i) => (
                <span
                  key={i}
                  className="absolute bottom-0 text-2xl"
                  style={{
                    left: `${8 + i * 9}%`,
                    ["--drift" as string]: `${(i % 2 ? 1 : -1) * 40}px`,
                    animation: `float-up ${8 + i}s linear ${i * 0.6}s infinite`,
                  }}
                >
                  💖
                </span>
              ))}
            </div>
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-5 pt-16 sm:p-8">
            {featured ? (
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gold sm:text-4xl">{slide.caption}</h3>
                <p className="font-display mx-auto mt-3 max-w-lg text-sm leading-relaxed text-foreground/90 sm:text-lg">
                  “If someone asks me what perfection looks like, I won’t explain… I’ll simply show
                  them your smile.”
                </p>
              </div>
            ) : (
              <p className="font-display text-center text-base leading-relaxed sm:text-2xl">
                {slide.caption}
              </p>
            )}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <button
            onClick={() => go(-1)}
            aria-label="Previous photo"
            className="glass rounded-full px-5 py-2 text-sm transition-transform hover:scale-110"
          >
            ‹ Prev
          </button>

          <div className="flex gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.src}
                onClick={() => setIndex(i)}
                aria-label={`Go to photo ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  i === index ? "w-8 bg-primary" : "w-2.5 bg-muted"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            aria-label="Next photo"
            className="glass rounded-full px-5 py-2 text-sm transition-transform hover:scale-110"
          >
            Next ›
          </button>
        </div>
      </div>
    </section>
  );
}
