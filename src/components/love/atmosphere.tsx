import { useEffect, useMemo, useRef, useState } from "react";

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

/* ---------------- Twinkling stars ---------------- */
export function StarField({ count = 90, bright = false }: { count?: number; bright?: boolean }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: rand(0, 100),
        top: rand(0, 100),
        size: rand(1, 3.2),
        delay: rand(0, 4),
        duration: rand(2.2, 5.5),
      })),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: bright ? "var(--gold)" : "var(--blush)",
            boxShadow: `0 0 ${s.size * 4}px currentColor`,
            color: bright ? "var(--gold)" : "var(--blush)",
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ---------------- Floating hearts ---------------- */
export function FloatingHearts({ count = 18 }: { count?: number }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: rand(0, 100),
        size: rand(12, 30),
        delay: rand(0, 14),
        duration: rand(11, 22),
        drift: rand(-90, 90),
        opacity: rand(0.35, 0.85),
      })),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {hearts.map((h, i) => (
        <span
          key={i}
          className="absolute bottom-0 select-none"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            opacity: h.opacity,
            filter: "drop-shadow(0 0 12px oklch(0.72 0.19 350 / 70%))",
            ["--drift" as string]: `${h.drift}px`,
            animation: `float-up ${h.duration}s linear ${h.delay}s infinite`,
          }}
        >
          {i % 3 === 0 ? "💖" : i % 3 === 1 ? "❤️" : "🩷"}
        </span>
      ))}
    </div>
  );
}

/* ---------------- Rose petals ---------------- */
export function RosePetals({ count = 22 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: rand(0, 100),
        size: rand(10, 22),
        delay: rand(0, 12),
        duration: rand(9, 18),
        drift: rand(-140, 140),
      })),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {petals.map((p, i) => (
        <span
          key={i}
          className="absolute top-0 block"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 0.75}px`,
            borderRadius: "60% 40% 60% 40% / 70% 70% 30% 30%",
            background: "var(--gradient-rose)",
            opacity: 0.75,
            ["--drift" as string]: `${p.drift}px`,
            animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ---------------- Confetti (one-shot) ---------------- */
export function Confetti({ pieces = 120 }: { pieces?: number }) {
  const bits = useMemo(
    () =>
      Array.from({ length: pieces }, () => ({
        left: rand(0, 100),
        size: rand(6, 12),
        delay: rand(0, 3),
        duration: rand(3.5, 7),
        drift: rand(-160, 160),
        color: ["var(--primary)", "var(--gold)", "var(--rose-gold)", "var(--blush)"][
          Math.floor(rand(0, 4))
        ],
        round: Math.random() > 0.6,
      })),
    [pieces],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {bits.map((b, i) => (
        <span
          key={i}
          className="absolute top-0"
          style={{
            left: `${b.left}%`,
            width: `${b.size}px`,
            height: `${b.size * (b.round ? 1 : 0.45)}px`,
            background: b.color,
            borderRadius: b.round ? "50%" : "2px",
            ["--drift" as string]: `${b.drift}px`,
            animation: `confetti-fall ${b.duration}s ease-in ${b.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ---------------- Sparkles ---------------- */
export function Sparkles({ count = 40 }: { count?: number }) {
  const sparks = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: rand(0, 100),
        top: rand(0, 100),
        delay: rand(0, 3),
        duration: rand(1.4, 3.4),
        size: rand(8, 18),
      })),
    [count],
  );
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {sparks.map((s, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            fontSize: `${s.size}px`,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        >
          ✨
        </span>
      ))}
    </div>
  );
}

/* ---------------- Cursor heart trail ---------------- */
export function CursorHearts() {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = layer.current;
    if (!host) return;
    let last = 0;

    const spawn = (x: number, y: number) => {
      const now = Date.now();
      if (now - last < 70) return;
      last = now;
      const el = document.createElement("span");
      el.textContent = Math.random() > 0.5 ? "❤" : "💗";
      el.style.cssText = `position:fixed;left:${x}px;top:${y}px;font-size:${rand(10, 20)}px;pointer-events:none;filter:drop-shadow(0 0 8px oklch(0.72 0.19 350 / 80%));animation:cursor-heart 1s ease-out forwards;`;
      host.appendChild(el);
      window.setTimeout(() => el.remove(), 1000);
    };

    const onMove = (e: PointerEvent) => spawn(e.clientX, e.clientY);
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return <div ref={layer} aria-hidden className="pointer-events-none fixed inset-0 z-50" />;
}

/* ---------------- Heart explosion at a point ---------------- */
export function heartExplosion(x: number, y: number, amount = 26) {
  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:60;";
  document.body.appendChild(host);

  for (let i = 0; i < amount; i++) {
    const angle = (Math.PI * 2 * i) / amount + rand(-0.2, 0.2);
    const dist = rand(90, 320);
    const el = document.createElement("span");
    el.textContent = i % 2 ? "❤️" : "💖";
    el.style.cssText = `position:absolute;left:${x}px;top:${y}px;font-size:${rand(14, 34)}px;--bx:${Math.cos(angle) * dist}px;--by:${Math.sin(angle) * dist}px;animation:burst ${rand(0.8, 1.5)}s cubic-bezier(.16,.84,.44,1) forwards;`;
    host.appendChild(el);
  }
  window.setTimeout(() => host.remove(), 1800);
}

/* ---------------- Reveal on scroll ---------------- */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.18 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return { ref, shown };
}
