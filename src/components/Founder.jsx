import Reveal from "./Reveal.jsx"

const journey = [
  {
    title: "The degree that didn't help",
    body: "Four years of finance classes — and not one on what to actually do with my first paycheque.",
  },
  {
    title: "The night I opened my TFSA",
    body: "Hours second-guessing a single ETF, wondering if I was missing something obvious. The textbooks never covered real life.",
  },
  {
    title: "The view from inside a Big Five bank",
    body: "Working in one of Canada's largest banks, I see daily how little of this knowledge ever reaches regular people.",
  },
  {
    title: "The notes became Dhruv Wealth",
    body: "Friends kept asking the same questions, so I published everything I was figuring out — as I figure it out, receipts included.",
  },
]

const mission = [
  {
    title: "Built for Canada",
    body: "TFSAs, RRSPs, FHSAs — everything here is built around Canadian tools, rules, and context.",
  },
  {
    title: "Education first, always",
    body: "This platform exists to teach. Every piece is written to build genuine understanding.",
  },
  {
    title: "Clarity over complexity",
    body: "Every concept stripped down to its clearest form, so anyone can walk away understanding it.",
  },
  {
    title: "Years of research, summarized",
    body: "Dhruv did the digging so you don't have to.",
  },
  {
    title: "Alberta roots",
    body: "Written with an Alberta perspective — including the provincial tax advantages that matter here.",
  },
  {
    title: "Knowledge for every path",
    body: "Invest alone or with an advisor — understanding the fundamentals helps either way.",
  },
]

export default function Founder() {
  return (
    <section id="founder" className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full bg-card px-4 py-1.5 ring-1 ring-ink/10">
            <span className="text-neon">★</span>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-ink/70">
              Meet the Founder
            </span>
          </div>
          <h2 className="mt-6 text-center font-serif text-5xl leading-tight text-ink md:text-6xl">
            Learning in public, <em className="text-neon">receipts included</em>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-center text-[15px] leading-relaxed text-body">
            "An informed investor makes better decisions — whether working with
            a financial advisor, doing it themselves, or somewhere in between.
            My goal is to give everyone that foundation of knowledge."
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          {/* My Journey */}
          <Reveal>
            <article className="h-full rounded-[2rem] bg-panel p-8 ring-1 ring-ink/8 md:p-10">
              <span className="inline-block rounded-full bg-neon/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-neon ring-1 ring-neon/30">
                My Journey
              </span>
              <p className="mt-7 font-serif text-3xl leading-snug text-ink md:text-4xl">
                Even people who studied finance feel lost the first time they
                open a TFSA.{" "}
                <em className="text-neon">I know, because I'm one of them.</em>
              </p>

              <ol className="mt-9 space-y-0">
                {journey.map((step, i) => (
                  <li key={step.title} className="relative flex gap-5 pb-8 last:pb-0">
                    {i < journey.length - 1 && (
                      <span className="absolute left-[7px] top-5 h-full w-px bg-gradient-to-b from-neon/60 to-ink/10" />
                    )}
                    <span
                      className={`relative mt-1.5 h-[15px] w-[15px] shrink-0 rounded-full ${
                        i === journey.length - 1
                          ? "bg-neon shadow-[0_0_16px_rgba(168,123,61,0.6)]"
                          : "bg-card ring-1 ring-neon/50"
                      }`}
                    />
                    <div>
                      <h3 className="text-[15px] font-semibold text-ink">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-body">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-9 flex items-center gap-3 border-t border-ink/8 pt-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neon font-serif text-lg text-white">
                  D
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">Dhruv Sharma</p>
                  <p className="text-xs text-body">Self-taught investor · Alberta, Canada</p>
                </div>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("open-credentials"))}
                  className="ml-auto rounded-full px-4 py-2 text-xs font-medium text-neon ring-1 ring-neon/40 transition-colors hover:bg-neon hover:text-white"
                >
                  View credentials →
                </button>
              </div>
            </article>
          </Reveal>

          {/* Our Mission */}
          <Reveal delay={120}>
            <article className="flex h-full flex-col rounded-[2rem] bg-panel p-8 ring-1 ring-ink/8 md:p-10">
              <span className="inline-block w-fit rounded-full bg-neon/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-neon ring-1 ring-neon/30">
                Our Mission
              </span>
              <p className="mt-7 text-[15px] leading-relaxed text-body">
                Nobody has this fully solved. We're all building our financial
                foundations one decision at a time — hopefully a little less
                alone than the generation before us.
              </p>

              <div className="mt-7 grid flex-1 gap-3 sm:grid-cols-2">
                {mission.map((m) => (
                  <div
                    key={m.title}
                    className="rounded-2xl bg-card p-5 ring-1 ring-ink/10 transition-colors duration-300 hover:ring-neon/40"
                  >
                    <h3 className="text-sm font-semibold text-ink">{m.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-body">{m.body}</p>
                  </div>
                ))}
              </div>

              <p className="mt-8 font-serif text-2xl leading-snug text-ink">
                "Come build the foundation with me.{" "}
                <em className="text-neon">
                  The earlier we start, the more time the math has to work."
                </em>
              </p>
              <a
                href="#/letter"
                className="mt-6 w-fit rounded-full bg-neon px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-ink hover:text-paper"
              >
                Build it with me →
              </a>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
