import Reveal from "./Reveal.jsx"

function Pill({ children }) {
  return (
    <span className="inline-block rounded-full bg-neon/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-neon ring-1 ring-neon/30">
      {children}
    </span>
  )
}

function WidgetFrame({ label, range, children }) {
  return (
    <div className="mt-8 rounded-2xl bg-card p-6 ring-1 ring-ink/10">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-ink">{label}</span>
        <span className="rounded-full bg-ink/5 px-3 py-1 text-[11px] text-body">{range} ▾</span>
      </div>
      {children}
    </div>
  )
}

function BarWidget() {
  const bars = [28, 44, 24, 36, 62, 78]
  return (
    <WidgetFrame label="TFSA Growth" range="Yearly">
      <p className="mt-3 text-4xl font-medium text-neon tabular">+85%</p>
      <div className="mt-5 flex h-24 items-end gap-3">
        {bars.map((h, i) => (
          <div
            key={i}
            className="bar-grow flex-1 rounded-full bg-gradient-to-t from-neon to-ember/50"
            style={{
              height: `${h}%`,
              opacity: 0.35 + (i / bars.length) * 0.65,
              transitionDelay: `${i * 90}ms`,
            }}
          />
        ))}
      </div>
    </WidgetFrame>
  )
}

function GaugeWidget() {
  const segments = 13
  const filled = 10
  return (
    <WidgetFrame label="Fees Avoided" range="Monthly">
      <div className="relative mx-auto mt-4 h-28 w-52">
        <svg viewBox="0 0 200 110" className="w-full">
          {Array.from({ length: segments }).map((_, i) => {
            const angle = Math.PI * (1 - i / (segments - 1))
            const cx = 100 + 78 * Math.cos(angle)
            const cy = 100 - 78 * Math.sin(angle)
            const deg = (angle * 180) / Math.PI
            return (
              <rect
                key={i}
                className="seg-pop"
                style={{ transitionDelay: `${i * 60}ms` }}
                x={cx - 7}
                y={cy - 16}
                width="14"
                height="32"
                rx="7"
                fill={i < filled ? "#a87b3d" : "#e2dbc9"}
                opacity={i < filled ? 0.45 + (i / filled) * 0.55 : 1}
                transform={`rotate(${90 - deg} ${cx} ${cy})`}
              />
            )
          })}
        </svg>
        <p className="absolute inset-x-0 bottom-0 text-center text-3xl font-medium text-ink tabular">
          80%
        </p>
      </div>
    </WidgetFrame>
  )
}

function CurveWidget() {
  return (
    <div className="mt-8 rounded-2xl bg-card p-6 ring-1 ring-ink/10">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-ink">$50/month · average market returns · TFSA</span>
        <div className="flex items-center gap-4 text-[11px] text-body">
          <span className="flex items-center gap-1.5">
            <i className="h-1.5 w-4 rounded-full bg-neon" /> investing
          </span>
          <span className="flex items-center gap-1.5">
            <i className="h-px w-4 border-t border-dashed border-ink/40" /> saving alone
          </span>
        </div>
      </div>
      <svg viewBox="0 0 600 220" className="mt-4 w-full">
        <defs>
          <linearGradient id="curveFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a87b3d" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#a87b3d" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[45, 90, 135, 180].map((y) => (
          <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="#1b1a16" strokeOpacity="0.06" />
        ))}
        <path
          d="M 10 205 L 590 150"
          fill="none"
          stroke="#1b1a16"
          strokeOpacity="0.35"
          strokeWidth="1.5"
          strokeDasharray="5 6"
        />
        <path
          d="M 10 208 C 160 202, 310 180, 430 115 S 565 28, 590 16 L 590 220 L 10 220 Z"
          fill="url(#curveFill)"
          stroke="none"
        />
        <path
          className="draw-line"
          pathLength="620"
          d="M 10 208 C 160 202, 310 180, 430 115 S 565 28, 590 16"
          fill="none"
          stroke="#a87b3d"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="590" cy="16" r="5" fill="#a87b3d" />
        <text x="18" y="196" fontSize="11" fill="#1b1a16" fillOpacity="0.35" fontFamily="Inter, sans-serif">
          yr 0
        </text>
        <text x="548" y="210" fontSize="11" fill="#1b1a16" fillOpacity="0.35" fontFamily="Inter, sans-serif">
          yr 40
        </text>
      </svg>
    </div>
  )
}

const cards = [
  {
    pill: "The Student's Guide",
    title: "Start from absolute zero",
    body: "One 18-minute read covering TFSAs, RRSPs, FHSAs, and ETFs. If you've never invested a dollar, start here",
    widget: <BarWidget />,
  },
  {
    pill: "Time in the market",
    title: "Stop predicting, start automating",
    body: "Set contributions once and let dollar-cost averaging buy every dip for you — no crystal ball required",
    widget: <GaugeWidget />,
  },
]

export default function Bento() {
  return (
    <section id="lessons" className="px-4 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
        {cards.map((c, i) => (
          <Reveal key={c.pill} delay={i * 120}>
            <article className="group h-full rounded-[2rem] bg-panel p-8 ring-1 ring-ink/8 transition-all duration-300 hover:ring-neon/40 md:p-10">
              <Pill>{c.pill}</Pill>
              <h3 className="mt-6 font-serif text-4xl leading-tight text-ink md:text-[42px]">
                {c.title}
              </h3>
              {c.widget}
              <p className="mt-6 text-[15px] leading-relaxed text-body">{c.body}</p>
            </article>
          </Reveal>
        ))}

        <Reveal className="md:col-span-2" delay={100}>
          <article className="rounded-[2rem] bg-panel p-8 ring-1 ring-ink/8 transition-all duration-300 hover:ring-neon/40 md:p-10">
            <div className="md:flex md:items-end md:justify-between">
              <div>
                <Pill>The math that changes everything</Pill>
                <h3 className="mt-6 font-serif text-4xl leading-tight text-ink md:text-[42px]">
                  Half a million, <em className="text-neon">tax-free</em>
                </h3>
              </div>
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-body md:mt-0 md:text-right">
                $50 a month for 40 years is $24,000 in contributions. Inside a
                TFSA at average market returns, that becomes over half a
                million. The earlier you start, the less you need —{" "}
                <em className="font-serif text-ink">that's the entire game.</em>
              </p>
            </div>
            <CurveWidget />
          </article>
        </Reveal>
      </div>
    </section>
  )
}
