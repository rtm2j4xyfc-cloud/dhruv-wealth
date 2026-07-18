import Reveal from "./Reveal.jsx"

const faqs = [
  {
    q: "Is this actually free?",
    a: "Yes — every article, guide, and tool, forever. No paywalls, no affiliate links, no course to buy at the end. Education should be free; advice should be transparent.",
  },
  {
    q: "Are you a financial advisor?",
    a: "No, and that's the point. I'm an educator, not a licensed advisor — and I'll always tell you which one you need. Nothing here is personalized advice.",
  },
  {
    q: "I've never invested a dollar. Where do I start?",
    a: "The Student's Guide — one 18-minute read covering TFSAs, RRSPs, FHSAs, and ETFs, written for someone starting from absolute zero.",
  },
  {
    q: "Do I need a lot of money to begin?",
    a: "$50 a month for 40 years is $24,000 in contributions. Inside a TFSA at average market returns, that becomes over half a million — tax-free. The earlier you start, the less you need.",
  },
  {
    q: "TFSA or RRSP first?",
    a: "It depends on your income, goals, and timeline — which is exactly why account choice matters as much as what goes inside. The Accounts articles walk through the decision step by step.",
  },
  {
    q: "Why should I trust you?",
    a: "You shouldn't have to take my word for it — check the credentials panel, read the reasoning, and verify everything yourself. That's the skill this site teaches.",
    credentials: true,
  },
]

export default function FAQ() {
  return (
    <section id="faq" className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full bg-card px-4 py-1.5 ring-1 ring-ink/10">
            <span className="text-neon">★</span>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-ink/70">
              Fair Questions
            </span>
          </div>
          <h2 className="mt-6 text-center font-serif text-5xl leading-tight text-ink md:text-6xl">
            Asked <em className="text-neon">& answered</em>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl bg-card ring-1 ring-ink/10 transition-colors open:ring-neon/40"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="font-serif text-xl text-ink">{f.q}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-neon ring-1 ring-neon/40 transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-[15px] leading-relaxed text-body">{f.a}</p>
                  {f.credentials && (
                    <button
                      onClick={() => window.dispatchEvent(new CustomEvent("open-credentials"))}
                      className="mt-4 rounded-full px-4 py-2 text-xs font-medium text-neon ring-1 ring-neon/40 transition-colors hover:bg-neon hover:text-white"
                    >
                      Open the credentials panel →
                    </button>
                  )}
                </div>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
