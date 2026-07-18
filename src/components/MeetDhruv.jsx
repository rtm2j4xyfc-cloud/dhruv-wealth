import { useState } from "react"
import Reveal from "./Reveal.jsx"

const facts = [
  "Finance grad",
  "Inside a Big Five bank",
  "Self-taught investor",
  "Alberta, Canada",
]

export default function MeetDhruv() {
  const [photoOk, setPhotoOk] = useState(true)
  return (
    <section id="meet" className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="grid items-center gap-10 rounded-[2rem] bg-panel p-8 ring-1 ring-ink/8 md:grid-cols-[auto_1fr] md:p-12">
            {/* portrait — swap the monogram for a real photo when ready */}
            <div className="mx-auto text-center">
              <div className="relative">
                <div className="absolute -inset-3 rounded-full bg-neon/20 blur-2xl" aria-hidden="true" />
                {photoOk ? (
                  <img
                    src="/dhruv.jpg"
                    alt="Dhruv Sharma"
                    onError={() => setPhotoOk(false)}
                    className="relative h-40 w-40 rounded-full object-cover object-top ring-2 ring-ink/15 md:h-48 md:w-48"
                  />
                ) : (
                  <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-b from-neon to-[#8f1020] ring-2 ring-ink/15 md:h-48 md:w-48">
                    <span className="font-serif text-7xl text-ink md:text-8xl">D</span>
                  </div>
                )}
              </div>
              <p className="mt-5 text-lg font-semibold text-ink">Dhruv Sharma</p>
              <p className="text-sm text-body">Founder, Dhruv Wealth</p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neon">
                Meet Dhruv
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-ink md:text-5xl">
                Hi — I'm the one <em className="text-neon">writing everything down.</em>
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-body">
                I started writing things down partly for me, partly because
                friends kept asking the same questions. Nobody has this fully
                solved — Dhruv Wealth is me sharing what I'm learning, in real
                time, with the receipts to back it up.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {facts.map((f) => (
                  <span
                    key={f}
                    className="rounded-full bg-card px-4 py-1.5 text-xs text-ink/70 ring-1 ring-ink/15"
                  >
                    {f}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#/letter"
                  className="rounded-full bg-neon px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-ink hover:text-paper"
                >
                  Ask me anything →
                </a>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("open-credentials"))}
                  className="rounded-full px-6 py-3 text-sm font-medium text-neon ring-1 ring-neon/40 transition-colors hover:bg-neon hover:text-white"
                >
                  View credentials
                </button>
                <p className="text-xs text-ink/40">
                  I read every message personally.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
