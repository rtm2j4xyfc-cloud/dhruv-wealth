import { useState } from "react"
import Reveal from "./Reveal.jsx"

const cad = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 0,
})

function Slider({ label, value, display, min, max, step, onChange }) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-body">{label}</span>
        <span className="text-lg font-semibold text-ink tabular">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full"
      />
    </label>
  )
}

export default function Calculator() {
  const [monthly, setMonthly] = useState(50)
  const [years, setYears] = useState(40)
  const [rate, setRate] = useState(7)

  const r = rate / 100 / 12
  const n = years * 12
  const contributed = monthly * n
  const futureValue = r === 0 ? contributed : monthly * ((Math.pow(1 + r, n) - 1) / r)
  const growth = futureValue - contributed
  const growthPct = futureValue > 0 ? (growth / futureValue) * 100 : 0

  return (
    <section id="calculator" className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full bg-card px-4 py-1.5 ring-1 ring-ink/10">
            <span className="text-neon">★</span>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-ink/70">
              Run Your Own Numbers
            </span>
          </div>
          <h2 className="mt-6 text-center font-serif text-5xl leading-tight text-ink md:text-6xl">
            See the math <em className="text-neon">for yourself</em>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-center text-[15px] text-body">
            Average market returns, monthly contributions, time. That's the
            whole machine — drag the sliders and watch.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-14 grid gap-6 rounded-[2rem] bg-panel p-8 ring-1 ring-ink/8 md:grid-cols-[1fr_1.2fr] md:p-10">
            <div className="space-y-7">
              <Slider
                label="Monthly contribution"
                value={monthly}
                display={cad.format(monthly)}
                min={25}
                max={1000}
                step={25}
                onChange={setMonthly}
              />
              <Slider
                label="Years invested"
                value={years}
                display={`${years} yrs`}
                min={5}
                max={50}
                step={1}
                onChange={setYears}
              />
              <Slider
                label="Average annual return"
                value={rate}
                display={`${rate}%`}
                min={2}
                max={12}
                step={0.5}
                onChange={setRate}
              />
              <p className="text-xs leading-relaxed text-ink/35">
                For illustration only — markets don't move in straight lines.
                Long-run diversified index returns have historically averaged
                6–8% before inflation.
              </p>
            </div>

            <div className="flex flex-col justify-between rounded-2xl bg-card p-7 ring-1 ring-ink/10">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-ink/40">
                  You'd end up with
                </p>
                <p className="mt-2 font-serif text-6xl text-neon tabular md:text-7xl">
                  {cad.format(futureValue)}
                </p>
                <p className="mt-3 text-sm text-body">
                  from {cad.format(contributed)} out of pocket —{" "}
                  <span className="text-ink">
                    {cad.format(growth)} is pure growth.
                  </span>{" "}
                  Inside a TFSA, all of it is tax-free.
                </p>
              </div>

              <div className="mt-8">
                <div className="flex h-3 overflow-hidden rounded-full bg-ink/5">
                  <div
                    className="bg-ink/25 transition-all duration-300"
                    style={{ width: `${100 - growthPct}%` }}
                  />
                  <div
                    className="bg-gradient-to-r from-neon to-ember transition-all duration-300"
                    style={{ width: `${growthPct}%` }}
                  />
                </div>
                <div className="mt-3 flex justify-between text-[11px] text-body">
                  <span>
                    <i className="mr-1.5 inline-block h-2 w-2 rounded-full bg-ink/25" />
                    Your contributions
                  </span>
                  <span>
                    <i className="mr-1.5 inline-block h-2 w-2 rounded-full bg-neon" />
                    Compound growth ({Math.round(growthPct)}%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
