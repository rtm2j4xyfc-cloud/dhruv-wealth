import Reveal from "./Reveal.jsx"

const steps = [
  {
    no: "01",
    title: "Read the guide",
    body: "One 18-minute read covers TFSAs, RRSPs, FHSAs, and ETFs — every concept from zero, no background needed.",
  },
  {
    no: "02",
    title: "Open the right accounts",
    body: "Canada gives you three unfair advantages. Learn which to open first for your situation, and why the order matters.",
  },
  {
    no: "03",
    title: "Automate & live your life",
    body: "Set monthly contributions once, own the whole market, and let thirty years of compounding do the heavy lifting.",
  },
]

export default function HowItWorks() {
  return (
    <section id="start" className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full bg-card px-4 py-1.5 ring-1 ring-ink/10">
            <span className="text-neon">★</span>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-ink/70">
              Start Here
            </span>
          </div>
          <h2 className="mt-6 text-center font-serif text-5xl leading-tight text-ink md:text-6xl">
            Three steps, <em className="text-neon">thirty years</em>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.no} delay={i * 120}>
              <article className="group relative h-full overflow-hidden rounded-[2rem] bg-panel p-8 ring-1 ring-ink/8 transition-all duration-300 hover:ring-neon/40 md:p-10">
                <span className="pointer-events-none absolute -right-4 -top-8 font-serif text-[120px] leading-none text-ink/[0.04] transition-colors duration-300 group-hover:text-neon/10">
                  {s.no}
                </span>
                <span className="font-serif text-2xl italic text-neon">{s.no}</span>
                <h3 className="mt-4 font-serif text-3xl leading-tight text-ink">{s.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-body">{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
