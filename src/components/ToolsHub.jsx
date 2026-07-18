import { useEffect, useMemo, useState } from "react"
import { CARDS, ETFS, TERMS } from "../data/toolsData.js"

const cad = new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 })

/* ---------- shared bits ---------- */

function Field({ label, value, onChange, min, max, step = 1, prefix }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.15em] text-ink/40">{label}</span>
      <div className="mt-1.5 flex items-center rounded-xl bg-card ring-1 ring-ink/15 focus-within:ring-neon/60">
        {prefix && <span className="pl-4 text-sm text-body">{prefix}</span>}
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full bg-transparent px-3 py-2.5 text-sm text-ink outline-none"
        />
      </div>
    </label>
  )
}

function Note({ children }) {
  return <p className="mt-6 text-[11px] leading-relaxed text-ink/35">{children}</p>
}

function BigStat({ label, value, accent }) {
  return (
    <div className="rounded-2xl bg-card p-5 ring-1 ring-ink/10">
      <p className="text-[11px] uppercase tracking-[0.15em] text-ink/40">{label}</p>
      <p className={`mt-1 font-serif text-3xl tabular ${accent ? "text-neon" : "text-ink"}`}>{value}</p>
    </div>
  )
}

/* ---------- 1. TFSA room tracker ---------- */

const TFSA_LIMITS = {
  2009: 5000, 2010: 5000, 2011: 5000, 2012: 5000, 2013: 5500, 2014: 5500,
  2015: 10000, 2016: 5500, 2017: 5500, 2018: 5500, 2019: 6000, 2020: 6000,
  2021: 6000, 2022: 6000, 2023: 6500, 2024: 7000, 2025: 7000,
}

function TfsaTool() {
  const [birthYear, setBirthYear] = useState(2000)
  const [contributed, setContributed] = useState(10000)
  const eligibleFrom = Math.max(2009, birthYear + 18)
  const totalRoom = Object.entries(TFSA_LIMITS)
    .filter(([y]) => Number(y) >= eligibleFrom)
    .reduce((s, [, v]) => s + v, 0)
  const remaining = Math.max(0, totalRoom - contributed)
  const over = contributed > totalRoom

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Birth year" value={birthYear} onChange={setBirthYear} min={1930} max={2007} />
        <Field label="Contributed so far" value={contributed} onChange={setContributed} min={0} step={500} prefix="$" />
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <BigStat label="Total room since eligibility" value={cad.format(totalRoom)} />
        <BigStat label={over ? "Over-contributed!" : "Room remaining"} value={cad.format(over ? contributed - totalRoom : remaining)} accent />
      </div>
      <p className="mt-4 text-sm text-body">
        Eligible from <span className="text-ink">{eligibleFrom}</span> (the year you turned 18, or 2009 when the TFSA launched).
        {over && <span className="text-neon"> Over-contributions are taxed at 1% per month — check CRA My Account.</span>}
      </p>
      <Note>
        Assumes Canadian residency every year since turning 18 and no withdrawals (withdrawn amounts come back the next January).
        Your official number lives in CRA My Account — always confirm there.
      </Note>
    </div>
  )
}

/* ---------- 2. Budget calculator ---------- */

function BudgetTool() {
  const [income, setIncome] = useState(2400)
  const [housing, setHousing] = useState(900)
  const [food, setFood] = useState(400)
  const [transport, setTransport] = useState(150)
  const [fun, setFun] = useState(250)
  const [other, setOther] = useState(150)

  const spent = housing + food + transport + fun + other
  const left = income - spent
  const rows = [
    ["Housing", housing], ["Food", food], ["Transport", transport],
    ["Fun", fun], ["Other", other],
  ]

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Monthly income" value={income} onChange={setIncome} min={0} step={50} prefix="$" />
        <Field label="Housing" value={housing} onChange={setHousing} min={0} step={25} prefix="$" />
        <Field label="Food" value={food} onChange={setFood} min={0} step={25} prefix="$" />
        <Field label="Transport" value={transport} onChange={setTransport} min={0} step={25} prefix="$" />
        <Field label="Fun" value={fun} onChange={setFun} min={0} step={25} prefix="$" />
        <Field label="Other" value={other} onChange={setOther} min={0} step={25} prefix="$" />
      </div>

      <div className="mt-6 flex h-4 overflow-hidden rounded-full bg-ink/5">
        {rows.map(([name, v], i) => (
          <div
            key={name}
            title={name}
            className="h-full"
            style={{
              width: `${Math.max(0, Math.min(100, (v / Math.max(income, 1)) * 100))}%`,
              background: `rgba(27,26,22,${0.14 + i * 0.07})`,
            }}
          />
        ))}
        {left > 0 && (
          <div className="h-full bg-gradient-to-r from-neon to-ember" style={{ width: `${(left / income) * 100}%` }} />
        )}
      </div>
      <div className="mt-3 flex justify-between text-[11px] text-body">
        <span>Spending: {cad.format(spent)}</span>
        <span className={left >= 0 ? "text-neon" : "text-ink"}>
          {left >= 0 ? `Left to invest: ${cad.format(left)}/mo` : `Short by ${cad.format(-left)} — trim something`}
        </span>
      </div>

      {left > 0 && (
        <p className="mt-5 text-sm leading-relaxed text-body">
          Investing that <span className="text-ink">{cad.format(left)}/month</span> at 7% for 30 years grows to about{" "}
          <span className="font-serif text-xl text-neon tabular">
            {cad.format(left * ((Math.pow(1 + 0.07 / 12, 360) - 1) / (0.07 / 12)))}
          </span>
          . Pay yourself first — automate it on payday.
        </p>
      )}
      <Note>A budget that leaves no room for fun fails by February. Keep the fun line — just decide it on purpose.</Note>
    </div>
  )
}

/* ---------- 3. Monte Carlo simulator ---------- */

function randn() {
  let u = 0, v = 0
  while (u === 0) u = Math.random()
  while (v === 0) v = Math.random()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

function MonteCarloTool() {
  const [start, setStart] = useState(10000)
  const [monthly, setMonthly] = useState(300)
  const [years, setYears] = useState(30)
  const [mean, setMean] = useState(7)
  const [vol, setVol] = useState(15)
  const [goal, setGoal] = useState(500000)
  const [seedTick, setSeedTick] = useState(0)

  const result = useMemo(() => {
    const SIMS = 1000
    const finals = []
    const paths = []
    for (let s = 0; s < SIMS; s++) {
      let bal = start
      const path = [bal]
      for (let y = 0; y < years; y++) {
        const r = mean / 100 + (vol / 100) * randn()
        bal = Math.max(0, bal * (1 + r) + monthly * 12)
        path.push(bal)
      }
      finals.push(bal)
      if (s < 100) paths.push(path)
    }
    finals.sort((a, b) => a - b)
    const pct = (p) => finals[Math.floor((p / 100) * (SIMS - 1))]
    const yearly = (p) => {
      const idx = Math.floor((p / 100) * (paths.length - 1))
      return null
    }
    const success = finals.filter((f) => f >= goal).length / SIMS
    return { p10: pct(10), p50: pct(50), p90: pct(90), success, finals }
  }, [start, monthly, years, mean, vol, goal, seedTick])

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Starting amount" value={start} onChange={setStart} min={0} step={1000} prefix="$" />
        <Field label="Monthly contribution" value={monthly} onChange={setMonthly} min={0} step={25} prefix="$" />
        <Field label="Years" value={years} onChange={setYears} min={1} max={60} />
        <Field label="Avg return %" value={mean} onChange={setMean} min={0} max={15} step={0.5} />
        <Field label="Volatility %" value={vol} onChange={setVol} min={1} max={40} />
        <Field label="Goal" value={goal} onChange={setGoal} min={0} step={25000} prefix="$" />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <BigStat label="Rough decade (p10)" value={cad.format(result.p10)} />
        <BigStat label="Median outcome" value={cad.format(result.p50)} accent />
        <BigStat label="Great decade (p90)" value={cad.format(result.p90)} />
      </div>

      <div className="mt-6 rounded-2xl bg-card p-5 ring-1 ring-ink/10">
        <div className="flex items-baseline justify-between">
          <p className="text-sm text-body">
            Chance of reaching <span className="text-ink">{cad.format(goal)}</span>
          </p>
          <p className="font-serif text-3xl text-neon tabular">{Math.round(result.success * 100)}%</p>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-ink/5">
          <div className="h-full bg-gradient-to-r from-neon to-ember transition-all duration-500" style={{ width: `${result.success * 100}%` }} />
        </div>
      </div>

      <button
        onClick={() => setSeedTick((t) => t + 1)}
        className="mt-5 rounded-full px-5 py-2.5 text-sm font-medium text-neon ring-1 ring-neon/40 transition-colors hover:bg-neon hover:text-white"
      >
        Re-roll 1,000 markets ↻
      </button>
      <Note>
        Runs 1,000 simulated market histories with normally-distributed annual returns. Real markets have fatter tails —
        treat this as intuition-building, not prophecy.
      </Note>
    </div>
  )
}

/* ---------- 4. Top 10 ETFs ---------- */

function EtfTool() {
  const [openTicker, setOpenTicker] = useState(null)
  return (
    <div>
      <div className="space-y-2">
        {ETFS.map((e) => (
          <div key={e.ticker} className="overflow-hidden rounded-2xl bg-card ring-1 ring-ink/10">
            <button
              onClick={() => setOpenTicker(openTicker === e.ticker ? null : e.ticker)}
              className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-ink/5"
            >
              <span className="w-6 font-serif text-lg italic text-neon tabular">{e.rank}</span>
              <span className="w-16 font-semibold text-ink tabular">{e.ticker}</span>
              <span className="flex-1 text-sm text-body">{e.name}</span>
              <span className="hidden rounded-full bg-neon/10 px-2.5 py-0.5 text-[11px] text-neon ring-1 ring-neon/25 sm:block">
                MER {e.mer}%
              </span>
              <span className={`text-xs tabular ${e.up1 ? "text-ember" : "text-body"}`}>{e.ytd}</span>
            </button>
            {openTicker === e.ticker && (
              <div className="border-t border-ink/8 px-5 py-4 text-sm text-body">
                <div className="grid gap-2 sm:grid-cols-2">
                  <p><span className="text-ink/40">Provider:</span> <span className="text-ink">{e.provider}</span></p>
                  <p><span className="text-ink/40">1-year:</span> <span className="text-ink tabular">{e.oneyr}</span></p>
                  <p><span className="text-ink/40">Assets:</span> <span className="text-ink tabular">{e.aum}</span></p>
                  <p><span className="text-ink/40">Distributions:</span> <span className="text-ink tabular">{e.dist} {e.freq}</span></p>
                  <p className="sm:col-span-2"><span className="text-ink/40">Holds:</span> <span className="text-ink">{e.alloc}</span></p>
                  <p className="sm:col-span-2"><span className="text-ink/40">Best for:</span> {e.best}</p>
                  <p><span className="text-ink/40">Risk:</span> {e.risk}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <Note>
        Education, not a recommendation — figures are approximate and change; verify MERs and returns with the provider
        before acting. Owning one broad all-in-one ETF is a complete strategy.
      </Note>
    </div>
  )
}

/* ---------- 5. Glossary ---------- */

function GlossaryTool() {
  const [q, setQ] = useState("")
  const filtered = TERMS.filter(
    (t) => t.t.toLowerCase().includes(q.toLowerCase()) || t.d.toLowerCase().includes(q.toLowerCase())
  )
  return (
    <div>
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search 27 terms — try 'MER' or 'dividend'"
        className="w-full rounded-xl bg-card px-4 py-3 text-sm text-ink outline-none ring-1 ring-ink/15 placeholder:text-ink/30 focus:ring-neon/60"
      />
      <div className="mt-4 max-h-[50vh] space-y-2 overflow-y-auto pr-1">
        {filtered.map((t) => (
          <div key={t.t} className="rounded-2xl bg-card p-4 ring-1 ring-ink/10">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-sm font-semibold text-ink">{t.t}</h3>
              <span className="rounded-full bg-neon/10 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.1em] text-neon ring-1 ring-neon/25">
                {t.l}
              </span>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-body">{t.d}</p>
          </div>
        ))}
        {filtered.length === 0 && <p className="py-8 text-center text-sm text-body">No matches — try a shorter word.</p>}
      </div>
    </div>
  )
}

/* ---------- 6. Investment journal ---------- */

const JOURNAL_KEY = "dw-journal"

function JournalTool() {
  const [entries, setEntries] = useState(() => {
    try { return JSON.parse(localStorage.getItem(JOURNAL_KEY)) || [] } catch { return [] }
  })
  const [type, setType] = useState("Contribution")
  const [note, setNote] = useState("")

  const save = (next) => {
    setEntries(next)
    localStorage.setItem(JOURNAL_KEY, JSON.stringify(next))
  }
  const add = () => {
    if (!note.trim()) return
    save([{ id: Date.now(), date: new Date().toLocaleDateString("en-CA"), type, note: note.trim() }, ...entries])
    setNote("")
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {["Contribution", "Bought", "Sold", "Rebalanced", "Note"].map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              type === t ? "bg-neon text-white" : "bg-card text-body ring-1 ring-ink/15 hover:text-ink"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="What did you do, and why? The 'why' is the whole point."
          className="w-full rounded-xl bg-card px-4 py-3 text-sm text-ink outline-none ring-1 ring-ink/15 placeholder:text-ink/30 focus:ring-neon/60"
        />
        <button onClick={add} className="shrink-0 rounded-xl bg-neon px-5 text-sm font-medium text-white transition-colors hover:bg-ink hover:text-paper">
          Log it
        </button>
      </div>

      <div className="mt-5 max-h-[42vh] space-y-2 overflow-y-auto pr-1">
        {entries.length === 0 && (
          <p className="py-8 text-center text-sm text-body">
            No entries yet. Your future self wants to know why you made each move — start logging.
          </p>
        )}
        {entries.map((e) => (
          <div key={e.id} className="flex items-start gap-3 rounded-2xl bg-card p-4 ring-1 ring-ink/10">
            <span className="rounded-full bg-neon/10 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.1em] text-neon ring-1 ring-neon/25">
              {e.type}
            </span>
            <div className="flex-1">
              <p className="text-sm leading-relaxed text-ink">{e.note}</p>
              <p className="mt-1 text-[11px] text-ink/35 tabular">{e.date}</p>
            </div>
            <button
              onClick={() => save(entries.filter((x) => x.id !== e.id))}
              aria-label="Delete entry"
              className="text-ink/30 transition-colors hover:text-neon"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <Note>Stays in your browser only — nothing is uploaded, tracked, or shared. Clearing site data erases it.</Note>
    </div>
  )
}

/* ---------- 7. Starter credit cards ---------- */

function CardsTool() {
  return (
    <div>
      <div className="space-y-3">
        {CARDS.map((c) => (
          <div key={c.name} className="rounded-2xl bg-card p-5 ring-1 ring-ink/10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-serif text-lg italic text-neon tabular">{c.rank}</span>
              <h3 className="text-[15px] font-semibold text-ink">{c.name}</h3>
              <span className="text-xs text-body">{c.issuer}</span>
              <span className="ml-auto rounded-full bg-neon/10 px-3 py-1 text-[11px] text-neon ring-1 ring-neon/25">{c.badge}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-body">{c.verdict}</p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-body">
              <span><span className="text-ink/40">Fee:</span> <span className="text-ink tabular">${c.fee}/yr</span></span>
              <span><span className="text-ink/40">APR:</span> <span className="text-ink tabular">{c.apr}</span></span>
              <span><span className="text-ink/40">Credit check:</span> <span className="text-ink">{c.check}</span></span>
            </div>
            <ul className="mt-3 grid gap-1.5 text-sm text-body sm:grid-cols-2">
              {c.perks.map((p) => (
                <li key={p} className="flex gap-2"><span className="text-neon">✓</span>{p}</li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-ember">Watch for: {c.watch}</p>
          </div>
        ))}
      </div>
      <Note>
        Education, not a recommendation. Offers change constantly — confirm fees and terms on the issuer's site. The real
        rule: pay the full balance every month, no exceptions.
      </Note>
    </div>
  )
}

/* ---------- host modal ---------- */

const TOOLS = {
  tfsa: { title: "TFSA Contribution Room Tracker", sub: "Know your number before you contribute", el: <TfsaTool /> },
  budget: { title: "Budget Calculator", sub: "A budget that leaves room to invest", el: <BudgetTool /> },
  montecarlo: { title: "Monte Carlo Retirement Simulator", sub: "Stress-test your plan against 1,000 markets", el: <MonteCarloTool /> },
  etfs: { title: "Top 10 Canadian ETFs", sub: "What each one owns and what it costs", el: <EtfTool /> },
  glossary: { title: "Canadian Investing Glossary", sub: "Every term, translated into plain English", el: <GlossaryTool /> },
  journal: { title: "Personalized Investment Journal", sub: "Track your decisions, not just your returns", el: <JournalTool /> },
  cards: { title: "Best Starter Credit Cards", sub: "Build credit without the traps", el: <CardsTool /> },
}

export default function ToolsHub() {
  const [key, setKey] = useState(null)
  const tool = key ? TOOLS[key] : null

  useEffect(() => {
    const openTool = (e) => setKey(e.detail)
    const onKey = (e) => e.key === "Escape" && setKey(null)
    window.addEventListener("open-tool", openTool)
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("open-tool", openTool)
      window.removeEventListener("keydown", onKey)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = key ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [key])

  if (!tool) return null

  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto bg-ink/40 backdrop-blur-sm" onClick={() => setKey(null)}>
      <div
        role="dialog"
        aria-label={tool.title}
        onClick={(e) => e.stopPropagation()}
        className="mx-auto my-8 w-[min(100%-2rem,46rem)] rounded-[2rem] bg-panel ring-1 ring-ink/10"
      >
        <header className="flex items-start justify-between gap-6 border-b border-ink/8 px-7 py-6 md:px-10">
          <div>
            <h1 className="font-serif text-3xl leading-tight text-ink">{tool.title}</h1>
            <p className="mt-1 text-sm text-body">{tool.sub}</p>
          </div>
          <button
            onClick={() => setKey(null)}
            aria-label="Close tool"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-1 ring-ink/15 transition-colors hover:bg-ink hover:text-paper"
          >
            ✕
          </button>
        </header>
        <div className="px-7 py-7 md:px-10">{tool.el}</div>
      </div>
    </div>
  )
}
