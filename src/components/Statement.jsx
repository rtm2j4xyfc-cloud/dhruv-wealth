import Reveal from "./Reveal.jsx"

export default function Statement() {
  return (
    <section id="about" className="px-6 py-24 md:py-32">
      <Reveal>
        <h2 className="mx-auto max-w-4xl text-center font-serif text-4xl leading-[1.18] text-ink md:text-6xl">
          Most investing advice is built to sell you something.{" "}
          <em className="text-neon">This isn't.</em>
        </h2>
        <p className="mx-auto mt-8 max-w-md text-center text-sm leading-relaxed text-body">
          No products, no commissions, no "book a call." Just years of
          research written down in plain English — because the more you
          understand your money, the better every decision gets.
        </p>
        <div className="mx-auto mt-10 flex w-fit items-center gap-3 rounded-full bg-card px-5 py-2.5 ring-1 ring-ink/10">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neon font-serif text-white">
            D
          </span>
          <span className="text-sm text-ink/80">
            Dhruv Sharma · Self-taught investor, Alberta
          </span>
        </div>
      </Reveal>
    </section>
  )
}
