const benefits = [
  {
    icon: (
      <path d="M4 19V9m5.5 10V5M15 19v-8m5 8V3" strokeLinecap="round" />
    ),
    title: "Boring beats brilliant",
    body: "Almost every time. A dull index fund, held for decades, quietly outruns nearly every genius stock-picker on Bay Street.",
  },
  {
    icon: (
      <path d="M12 2v20M17 7H9.5a2.5 2.5 0 000 5h5a2.5 2.5 0 010 5H6" strokeLinecap="round" />
    ),
    title: "Fees eat fortunes",
    body: "A 2% fee sounds tiny — until you learn it can quietly consume a third of your lifetime returns. Know what you pay, always.",
  },
  {
    icon: (
      <>
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18M7 15h4" strokeLinecap="round" />
      </>
    ),
    title: "TFSA, RRSP & FHSA",
    body: "Canada hands you three unfair advantages. The account you pick matters as much as what goes inside — learn the right order.",
  },
  {
    icon: (
      <>
        <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    title: "Education, not advice",
    body: "I'm an educator, not a licensed advisor — and I'll always tell you which one you need.",
  },
]

export default function Hero() {
  return (
    <section className="sky overflow-hidden px-4 pb-16 pt-36 md:pb-24 md:pt-44">
      <div className="mx-auto max-w-6xl">
        <p className="rise text-center text-xs font-semibold uppercase tracking-[0.25em] text-body">
          🍁 Built for Canadians · Alberta proud
        </p>

        <h1
          className="rise mx-auto mt-6 max-w-3xl text-center font-serif text-6xl font-medium leading-[1.04] text-ink md:text-8xl"
          style={{ animationDelay: "120ms" }}
        >
          Wealth favours{" "}
          <em className="font-normal text-neon">the informed.</em>
        </h1>

        <p
          className="rise mx-auto mt-8 max-w-xl text-center text-base leading-relaxed text-body"
          style={{ animationDelay: "240ms" }}
        >
          Investing education for Canadians who want to make confident,
          informed decisions — plain language, real tools, built right here in
          Alberta.
        </p>

        <div
          className="rise mt-10 flex items-center justify-center gap-4"
          style={{ animationDelay: "360ms" }}
        >
          <a
            href="#/articles"
            className="rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-neon"
          >
            Start learning free →
          </a>
          <a
            href="#/tools"
            className="rounded-full px-7 py-3.5 text-sm font-medium text-ink ring-1 ring-ink/20 transition-colors hover:bg-ink/5"
          >
            Try the tools
          </a>
        </div>

        <p
          className="rise mx-auto mt-8 w-fit text-xs text-body tabular"
          style={{ animationDelay: "440ms" }}
        >
          $0 forever · 9 full articles · 0% sales pitch
        </p>

        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <article
              key={b.title}
              className="rise rounded-3xl bg-card p-7 shadow-[0_1px_2px_rgba(27,26,22,0.06)] ring-1 ring-ink/8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgba(27,26,22,0.18)]"
              style={{ animationDelay: `${480 + i * 100}ms` }}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-neon/10">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-neon" fill="none" stroke="currentColor" strokeWidth="1.8">
                  {b.icon}
                </svg>
              </span>
              <h3 className="mt-6 font-serif text-2xl font-medium leading-tight text-ink">{b.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-body">{b.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
