import { useEffect, useState } from "react";

import { heartExplosion, useReveal } from "./atmosphere";

const QUOTES = [
  "You are my favorite notification.",
  "You are my peace.",
  "You are my safest place.",
  "You are my happiness.",
  "You are my forever.",
];

const MEMORIES = [
  { title: "First Conversation", text: "The night words turned into butterflies." },
  { title: "First Smile", text: "The moment my whole world went quiet." },
  { title: "First Date", text: "Two coffees, one heart, endless laughter." },
  { title: "Every Beautiful Memory", text: "Every single one of them has you in it." },
];

/** Change this to your real anniversary. */
const TOGETHER_SINCE = new Date("2026-06-10T00:00:00");

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={shown ? "animate-rise-in" : "opacity-0"}
    >
      {children}
    </div>
  );
}

export function QuotesSection() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-5xl px-5 py-16">
      <h2 className="text-center text-2xl font-semibold sm:text-4xl">
        <span className="text-gradient-rose animate-shimmer">Little Truths About You</span>
      </h2>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {QUOTES.map((q, i) => (
          <Reveal key={q} delay={i * 90}>
            <article className="glass h-full rounded-3xl p-7 text-center transition-all duration-500 hover:-translate-y-2 hover:glow-rose">
              <div className="animate-heartbeat text-3xl">❤️</div>
              <p className="font-display mt-4 text-lg leading-relaxed sm:text-xl">“{q}”</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function LoveTimer() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const start = TOGETHER_SINCE;
  const current = new Date(now);
  let years = current.getFullYear() - start.getFullYear();
  let months = current.getMonth() - start.getMonth();
  let days = current.getDate() - start.getDate();
  let hours = current.getHours() - start.getHours();
  let minutes = current.getMinutes() - start.getMinutes();
  let seconds = current.getSeconds() - start.getSeconds();

  if (seconds < 0) (seconds += 60), minutes--;
  if (minutes < 0) (minutes += 60), hours--;
  if (hours < 0) (hours += 24), days--;
  if (days < 0) {
    const prev = new Date(current.getFullYear(), current.getMonth(), 0).getDate();
    days += prev;
    months--;
  }
  if (months < 0) (months += 12), years--;

  const units = [
    { label: "Years", value: years },
    { label: "Months", value: months },
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  return (
    <section className="relative z-10 mx-auto w-full max-w-4xl px-5 py-16">
      <div className="glass rounded-4xl p-8 text-center sm:p-12">
        <h2 className="text-2xl font-semibold sm:text-3xl">❤️ Together Since ❤️</h2>
        <p className="mt-2 text-xs tracking-[0.3em] text-muted-foreground uppercase">
          {start.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })}
        </p>
        <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-4">
          {units.map((u) => (
            <div key={u.label} className="glass rounded-2xl px-2 py-4">
              <div className="text-gradient-rose text-2xl font-semibold tabular-nums sm:text-3xl">
                {String(u.value).padStart(2, "0")}
              </div>
              <div className="mt-1 text-[10px] tracking-widest text-muted-foreground uppercase">
                {u.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LoveLetter() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative z-10 mx-auto w-full max-w-3xl px-5 py-16 text-center">
      {!open && (
        <button
          onClick={(e) => {
            heartExplosion(e.clientX, e.clientY, 22);
            setOpen(true);
          }}
          className="glow-rose rounded-full px-8 py-4 text-base font-semibold text-primary-foreground transition-transform duration-500 hover:scale-110"
          style={{ backgroundImage: "var(--gradient-rose)" }}
        >
          💌 Open My Heart
        </button>
      )}

      {open && (
        <article className="glass animate-rise-in rounded-4xl p-7 text-left sm:p-12">
          <p className="font-script text-gradient-rose text-4xl sm:text-5xl">My Dearest,</p>
          <div className="font-display mt-6 space-y-4 text-base leading-relaxed sm:text-xl">
            <p>Thank you for choosing me every single day.</p>
            <p>
              Before you came into my life, I never knew someone could make my world so beautiful.
            </p>
            <p>Every smile of yours makes my heart happier.</p>
            <p>Every conversation with you becomes my favorite memory.</p>
            <p>
              You are not just my girlfriend… You are my peace, my happiness, my safe place, my best
              friend, and my forever.
            </p>
            <p>I don’t promise a perfect life.</p>
            <p>But I promise that no matter what happens… I will always choose you.</p>
            <p className="text-blush">Again. Again. And forever.</p>
            <p className="text-gold">You are my Miss Universe.</p>
            <p className="font-script text-3xl text-gradient-rose sm:text-4xl">
              I Love You Forever ❤️
            </p>
          </div>
        </article>
      )}
    </section>
  );
}

export function MemoriesSection() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-5xl px-5 py-16">
      <h2 className="text-center text-2xl font-semibold sm:text-4xl">
        <span className="text-gradient-rose animate-shimmer">Our Memories</span>
      </h2>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {MEMORIES.map((m, i) => (
          <Reveal key={m.title} delay={i * 100}>
            <article className="glass group h-full rounded-3xl p-7 transition-all duration-500 hover:-translate-y-2 hover:glow-gold">
              <h3 className="text-xl font-semibold sm:text-2xl">❤️ {m.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground transition-colors group-hover:text-foreground sm:text-base">
                {m.text}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
