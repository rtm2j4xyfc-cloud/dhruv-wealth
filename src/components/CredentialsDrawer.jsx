import { useEffect, useState } from "react"

const brings = [
  {
    icon: (
      <path d="M12 3L2 8l10 5 10-5-10-5zM6 10.5V15c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5" strokeLinecap="round" strokeLinejoin="round" />
    ),
    title: "Finance education",
    body: "Studied finance in school — and learned the textbooks don't cover real life.",
  },
  {
    icon: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 12h18" strokeLinecap="round" />
      </>
    ),
    title: "Industry experience",
    body: "Gaining hands-on experience inside one of Canada's largest banks, right now.",
  },
  {
    icon: (
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z" strokeLinecap="round" strokeLinejoin="round" />
    ),
    title: "Years of research",
    body: "Self-taught investor. Years of digging, summarized — with the receipts to back it up.",
  },
  {
    icon: (
      <path d="M12 21s-7-5.6-7-11a7 7 0 0114 0c0 5.4-7 11-7 11zM12 12a2 2 0 100-4 2 2 0 000 4z" strokeLinecap="round" strokeLinejoin="round" />
    ),
    title: "Alberta, Canada",
    body: "Canadian accounts, Canadian rules — including the provincial tax context that matters here.",
  },
]

export default function CredentialsDrawer() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const openDrawer = () => setOpen(true)
    const onKey = (e) => e.key === "Escape" && setOpen(false)
    window.addEventListener("open-credentials", openDrawer)
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("open-credentials", openDrawer)
      window.removeEventListener("keydown", onKey)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  return (
    <>
      {/* Side tab */}
      <button
        onClick={() => setOpen(true)}
        className="fixed right-0 top-1/2 z-40 -translate-y-1/2 rounded-l-xl bg-card px-2.5 py-4 ring-1 ring-ink/15 transition-colors hover:bg-neon [writing-mode:vertical-rl]"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink">
          ★ Credentials
        </span>
      </button>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 bg-ink/30 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-label="Credentials and transparency"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col overflow-y-auto bg-panel ring-1 ring-ink/10 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-ink/8 px-7 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neon">
            Credentials & Transparency
          </p>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close credentials panel"
            className="flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-ink/15 transition-colors hover:bg-ink hover:text-paper"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 px-7 py-7">
          <h2 className="font-serif text-3xl leading-tight text-ink">
            What I bring — and{" "}
            <em className="text-neon">what I'm not</em>
          </h2>

          <p className="mt-4 text-[13px] uppercase tracking-[0.2em] text-ink/40">
            What I bring
          </p>
          <ul className="mt-4 space-y-3">
            {brings.map((c) => (
              <li key={c.title} className="flex gap-4 rounded-2xl bg-card p-5 ring-1 ring-ink/10">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neon/10 ring-1 ring-neon/25">
                  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 text-neon" fill="none" stroke="currentColor" strokeWidth="1.7">
                    {c.icon}
                  </svg>
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-ink">{c.title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-body">{c.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-[13px] uppercase tracking-[0.2em] text-ink/40">
            What I'm not
          </p>
          <div className="mt-4 rounded-2xl bg-neon/10 p-5 ring-1 ring-neon/30">
            <p className="text-sm leading-relaxed text-ink">
              Not a licensed financial advisor.{" "}
              <em className="font-serif text-neon">
                "I'm an educator, not a licensed advisor — and I'll always tell
                you which one you need."
              </em>
            </p>
          </div>

          <p className="mt-8 text-[11px] leading-relaxed text-ink/35">
            Dhruv Wealth is an educational platform only. Nothing on this site
            constitutes personalized financial, legal, or investment advice.
            Always consult a licensed financial professional before making
            investment decisions. Investing involves risk, including the
            possible loss of principal.
          </p>
        </div>

        <div className="border-t border-ink/8 px-7 py-5">
          <a
            href="#/letter"
            onClick={() => setOpen(false)}
            className="block rounded-full bg-neon px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-ink hover:text-paper"
          >
            Questions? I read every message →
          </a>
        </div>
      </aside>
    </>
  )
}
