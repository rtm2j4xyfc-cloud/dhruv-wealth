import { useEffect, useState } from "react"

const links = [
  { label: "Home", href: "#/", route: "home" },
  { label: "Articles", href: "#/articles", route: "articles" },
  { label: "Tools", href: "#/tools", route: "tools" },
  { label: "About", href: "#/about", route: "about" },
  { label: "Letter", href: "#/letter", route: "letter" },
]

export default function Nav({ route = "home" }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [route])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 px-4">
      <header className="pointer-events-auto mx-auto max-w-4xl rounded-[1.75rem] bg-card ring-1 ring-ink/10 shadow-lg shadow-ink/10 md:rounded-full">
        <div className="flex items-center justify-between py-2 pl-3 pr-2">
          <a href="#/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neon font-serif text-lg text-white">
              D
            </span>
            <span className="text-sm font-semibold tracking-tight">Dhruv Wealth</span>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                aria-current={route === l.route ? "page" : undefined}
                className={`text-sm transition-colors hover:text-ink ${
                  route === l.route ? "font-medium text-neon" : "text-ink/70"
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#/articles"
              className="hidden rounded-full bg-neon px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink hover:text-paper sm:block"
            >
              Start Learning
            </a>
            <button
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-ink/15 transition-colors hover:bg-ink/5 md:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-ink" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-ink/8 px-5 py-4 md:hidden">
            <ul className="space-y-1">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    aria-current={route === l.route ? "page" : undefined}
                    className={`block rounded-xl px-3 py-2.5 text-[15px] transition-colors ${
                      route === l.route
                        ? "bg-neon/10 font-medium text-neon"
                        : "text-ink/80 hover:bg-ink/5"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-2 sm:hidden">
                <a
                  href="#/articles"
                  className="block rounded-full bg-ink px-5 py-3 text-center text-sm font-medium text-paper"
                >
                  Start Learning
                </a>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </div>
  )
}
