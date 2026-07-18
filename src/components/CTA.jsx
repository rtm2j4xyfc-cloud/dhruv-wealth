import Reveal from "./Reveal.jsx"

export default function CTA() {
  return (
    <section id="contact" className="px-4 pb-6">
      <div className="sky grain mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] px-6 py-20 text-center ring-1 ring-ink/10 md:py-28">
        <Reveal>
          <h2 className="text-glow mx-auto max-w-2xl font-serif text-5xl leading-[1.05] text-ink md:text-7xl">
            The <em className="text-neon">Letter</em>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-ink/90">
            One honest idea about money at a time, straight from Alberta. No
            stock tips, no spam, nothing for sale — unsubscribe whenever.
          </p>
          <form
            className="mx-auto mt-10 flex max-w-md rounded-full bg-card p-1.5 ring-1 ring-ink/15 shadow-lg shadow-ink/10"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="w-full bg-transparent px-5 text-sm text-ink outline-none placeholder:text-body/60"
            />
            <button
              type="submit"
              className="glow-neon shrink-0 rounded-full bg-neon px-6 py-3 text-sm font-medium text-white transition-all hover:bg-ink hover:text-paper hover:shadow-none"
            >
              Get the Letter
            </button>
          </form>
          <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-ink/40">
            🍁 Built for Canadians · Alberta Proud
          </p>
        </Reveal>
      </div>
    </section>
  )
}
