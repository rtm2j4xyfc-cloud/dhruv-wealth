import Reveal from "./Reveal.jsx"
import { ARTICLES } from "../data/articles.js"

const FEATURED_KEY = "guide"

const open = (key) =>
  window.dispatchEvent(new CustomEvent("open-article", { detail: key }))

function Meta({ article }) {
  const time = article.meta.split("·")[0].trim()
  return (
    <div className="flex items-center gap-3">
      <span className="rounded-full bg-neon/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-neon ring-1 ring-neon/30">
        {article.tag}
      </span>
      <span className="text-xs text-body tabular">{time}</span>
    </div>
  )
}

export default function Articles() {
  const featured = ARTICLES[FEATURED_KEY]
  const rest = Object.entries(ARTICLES).filter(([k]) => k !== FEATURED_KEY)

  return (
    <section id="articles" className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full bg-card px-4 py-1.5 ring-1 ring-ink/10">
            <span className="text-neon">★</span>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-ink/70">
              Articles
            </span>
          </div>
          <h2 className="mt-6 text-center font-serif text-5xl leading-tight text-ink md:text-6xl">
            Read your way to <em className="text-neon">confidence</em>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-center text-[15px] text-body">
            Four full articles, right here on the page — every concept
            explained from zero, written for Canadians.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          <Reveal className="md:col-span-3">
            <button
              onClick={() => open(FEATURED_KEY)}
              className="group relative block w-full overflow-hidden rounded-[2rem] bg-panel p-8 text-left ring-1 ring-ink/8 transition-all duration-300 hover:ring-neon/50 md:p-10"
            >
              <span className="absolute right-8 top-8 rounded-full bg-ink px-3 py-1 text-[11px] font-semibold text-paper">
                Start here
              </span>
              <Meta article={featured} />
              <h3 className="mt-6 max-w-2xl font-serif text-4xl leading-tight text-ink transition-colors group-hover:text-neon md:text-5xl">
                {featured.title}
              </h3>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-body">
                TFSAs, RRSPs, FHSAs, and ETFs — every concept from zero, in
                plain language. If you've never invested a dollar, this is the
                starting point.
              </p>
              <p className="mt-6 text-sm font-medium text-neon">
                Read the guide <span aria-hidden="true">→</span>
              </p>
            </button>
          </Reveal>

          {rest.map(([key, a], i) => (
            <Reveal key={key} delay={(i % 3) * 100}>
              <button
                onClick={() => open(key)}
                className="group flex h-full w-full flex-col rounded-3xl bg-card p-7 text-left ring-1 ring-ink/10 transition-all duration-300 hover:-translate-y-1.5 hover:ring-neon/50"
              >
                <Meta article={a} />
                <h3 className="mt-5 flex-1 font-serif text-[26px] leading-snug text-ink transition-colors group-hover:text-neon">
                  {a.title}
                </h3>
                <p className="mt-5 text-sm font-medium text-ink/50 transition-colors group-hover:text-neon">
                  Read article <span aria-hidden="true">→</span>
                </p>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
