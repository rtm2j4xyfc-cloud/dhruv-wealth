import Reveal from "./Reveal.jsx"

const tools = [
  {
    key: "compound",
    name: "Compound Interest Calculator",
    desc: "Watch small monthly amounts turn into decades of growth.",
    icon: <path d="M4 19c3-1 5-3 6.5-6.5S14 5.5 20 4M14 4h6v6" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    key: "tfsa",
    name: "TFSA Contribution Room Tracker",
    desc: "Know exactly how much room you have, by birth year.",
    icon: (
      <>
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18M7 15h4" strokeLinecap="round" />
      </>
    ),
  },
  {
    key: "budget",
    name: "Budget Calculator",
    desc: "A student budget that actually leaves room to invest.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v9l6.5 4" strokeLinecap="round" />
      </>
    ),
  },
  {
    key: "montecarlo",
    name: "Monte Carlo Retirement Simulator",
    desc: "Stress-test your plan against thousands of possible markets.",
    icon: <path d="M3 17l4-6 4 3 4-8 6 9M3 21h18" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    key: "etfs",
    name: "Top 10 Canadian ETFs",
    desc: "A curated shortlist — what each one owns and what it costs.",
    icon: (
      <>
        <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
        <path d="M12 8v5M9.5 10.5h5" strokeLinecap="round" />
      </>
    ),
  },
  {
    key: "glossary",
    name: "Canadian Investing Glossary",
    desc: "Every term, translated into plain English.",
    icon: (
      <>
        <path d="M5 4h11a3 3 0 013 3v13H8a3 3 0 00-3 3V4z" />
        <path d="M5 17h14" strokeLinecap="round" />
      </>
    ),
  },
  {
    key: "journal",
    name: "Personalized Investment Journal",
    desc: "Track your decisions, not just your returns.",
    icon: <path d="M16 3l5 5-11 11H5v-5L16 3zM13 6l5 5" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    key: "cards",
    name: "Best Starter Credit Cards",
    desc: "Build credit without falling into the traps.",
    icon: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 9h20" />
      </>
    ),
  },
]

export default function Tools() {
  return (
    <section id="tools" className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full bg-card px-4 py-1.5 ring-1 ring-ink/10">
            <span className="text-neon">★</span>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-ink/70">
              Tools
            </span>
          </div>
          <h2 className="mt-6 text-center font-serif text-5xl leading-tight text-ink md:text-6xl">
            Run your <em className="text-neon">own</em> numbers
          </h2>
          <p className="mx-auto mt-5 max-w-md text-center text-[15px] text-body">
            Eight free tools built for Canadian accounts. No sign-up, no
            tracking, no email walls — education should be free.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((t, i) => (
            <Reveal key={t.name} delay={(i % 4) * 90}>
              <button
                onClick={() => {
                  if (t.key === "compound") {
                    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })
                  } else {
                    window.dispatchEvent(new CustomEvent("open-tool", { detail: t.key }))
                  }
                }}
                className="group flex h-full w-full flex-col rounded-3xl bg-card p-6 text-left ring-1 ring-ink/10 transition-all duration-300 hover:-translate-y-1.5 hover:ring-neon/50"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-neon/10 ring-1 ring-neon/25 transition-shadow duration-300 group-hover:shadow-[0_0_24px_rgba(168,123,61,0.35)]">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-neon" fill="none" stroke="currentColor" strokeWidth="1.7">
                    {t.icon}
                  </svg>
                </span>
                <h3 className="mt-5 text-[15px] font-semibold leading-snug text-ink">
                  {t.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{t.desc}</p>
                <p className="mt-4 text-sm font-medium text-ink/50 transition-colors group-hover:text-neon">
                  Try it <span aria-hidden="true">→</span>
                </p>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
