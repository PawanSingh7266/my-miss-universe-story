import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

import {
  CursorHearts,
  FloatingHearts,
  RosePetals,
  StarField,
  heartExplosion,
} from "@/components/love/atmosphere";
import { Finale } from "@/components/love/Finale";
import { LoadingScreen } from "@/components/love/LoadingScreen";
import { Slideshow } from "@/components/love/Slideshow";
import {
  LoveLetter,
  LoveTimer,
  MemoriesSection,
  QuotesSection,
} from "@/components/love/StorySections";
import { Welcome } from "@/components/love/Welcome";
import { useRomanticMusic } from "@/lib/use-romantic-music";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "To My Miss Universe — A Love Story For You ❤️" },
      {
        name: "description",
        content:
          "A cinematic, interactive love letter for the most beautiful girl in my universe: memories, quotes, a live love timer and one last surprise.",
      },
      { property: "og:title", content: "To My Miss Universe — A Love Story For You ❤️" },
      {
        property: "og:description",
        content:
          "Floating hearts, twinkling stars and a handwritten love letter — a magical surprise made just for you.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoveStory,
});

type Stage = "welcome" | "loading" | "story" | "fading" | "finale";

function LoveStory() {
  const [stage, setStage] = useState<Stage>("welcome");
  const music = useRomanticMusic();

  useEffect(() => {
    if (stage === "story") window.scrollTo({ top: 0, behavior: "auto" });
  }, [stage]);

  const goFinale = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      heartExplosion(e.clientX, e.clientY, 30);
      music.fadeTo(0.1, 3);
      setStage("fading");
      window.setTimeout(() => setStage("finale"), 2600);
    },
    [music],
  );

  return (
    <main className="relative min-h-screen">
      <CursorHearts />

      {stage !== "finale" && (
        <>
          <StarField count={110} />
          <FloatingHearts count={stage === "story" ? 14 : 20} />
          {stage === "story" && <RosePetals count={16} />}
        </>
      )}

      {/* Music control */}
      <button
        onClick={() => music.toggle()}
        aria-label={music.playing ? "Mute romantic music" : "Play romantic music"}
        className="glass fixed right-4 top-4 z-[60] rounded-full px-4 py-3 text-lg transition-transform hover:scale-110"
      >
        {music.playing ? "🔊" : "🔈"}
      </button>

      {stage === "welcome" && (
        <Welcome
          onEnter={() => {
            music.start();
            setStage("loading");
          }}
        />
      )}

      {stage === "loading" && <LoadingScreen onDone={() => setStage("story")} />}

      {(stage === "story" || stage === "fading") && (
        <div
          className="relative z-10 transition-opacity duration-[2200ms]"
          style={{ opacity: stage === "fading" ? 0 : 1 }}
        >
          <header className="relative z-10 px-5 pt-20 pb-6 text-center">
            <p className="text-xs tracking-[0.4em] text-muted-foreground uppercase">
              A Love Story
            </p>
            <h1 className="font-script text-gradient-rose animate-shimmer mt-3 text-4xl leading-tight sm:text-7xl">
              To My Miss Universe
            </h1>
            <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground sm:text-base">
              Scroll gently, darling — every section is a piece of my heart.
            </p>
          </header>

          <Slideshow />
          <QuotesSection />
          <LoveTimer />
          <LoveLetter />
          <MemoriesSection />

          <section className="relative z-10 px-5 pb-28 pt-6 text-center">
            <button
              onClick={goFinale}
              className="glow-rose rounded-full px-9 py-4 text-base font-semibold text-primary-foreground transition-transform duration-500 hover:scale-110 sm:text-lg"
              style={{ backgroundImage: "var(--gradient-rose)" }}
            >
              ❤️ One Last Thing… ❤️
            </button>
          </section>
        </div>
      )}

      {stage === "fading" && (
        <div
          className="pointer-events-none fixed inset-0 z-40 bg-black transition-opacity duration-[2400ms]"
          style={{ opacity: 0.98 }}
        />
      )}

      {stage === "finale" && <Finale />}
    </main>
  );
}
