const columns = [
  {
    head: "Learn",
    links: [
      { label: "Canada Basics", href: "#/articles" },
      { label: "Accounts", href: "#/articles" },
      { label: "Strategy", href: "#/articles" },
      { label: "Stocks & ETFs", href: "#/articles" },
      { label: "Budgeting", href: "#/articles" },
    ],
  },
  {
    head: "Explore",
    links: [
      { label: "Articles", href: "#/articles" },
      { label: "Tools", href: "#/tools" },
      { label: "The Student's Guide", href: "#/articles" },
      { label: "The Letter", href: "#/letter" },
    ],
  },
  {
    head: "About",
    links: [
      { label: "Meet Dhruv", href: "#/about" },
      { label: "My Journey", href: "#/about" },
      { label: "Our Mission", href: "#/about" },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="px-6 pb-10 pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neon font-serif text-lg text-white">
                D
              </span>
              <span className="text-[15px] font-semibold">Dhruv Wealth</span>
            </div>
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-body">
              Education, not advice. I'm an educator, not a licensed advisor —
              and I'll always tell you which one you need.
            </p>
          </div>
          {columns.map((c) => (
            <nav key={c.head}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">
                {c.head}
              </p>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-body transition-colors hover:text-ink">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-ink/8 pt-6 md:flex-row">
          <p className="text-xs text-ink/35 tabular">
            © {new Date().getFullYear()} Dhruv Wealth · Alberta, Canada
          </p>
          <p className="font-serif text-sm italic text-neon">built to compound</p>
        </div>
      </div>
    </footer>
  )
}
