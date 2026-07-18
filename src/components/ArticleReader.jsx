import { useEffect, useState } from "react"
import { ARTICLES } from "../data/articles.js"

// Full-screen reader for the embedded articles. Open with:
// window.dispatchEvent(new CustomEvent("open-article", { detail: "guide" }))
export default function ArticleReader() {
  const [key, setKey] = useState(null)
  const article = key ? ARTICLES[key] : null

  useEffect(() => {
    const openReader = (e) => setKey(e.detail)
    const onKey = (e) => e.key === "Escape" && setKey(null)
    window.addEventListener("open-article", openReader)
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("open-article", openReader)
      window.removeEventListener("keydown", onKey)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = key ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [key])

  if (!article) return null

  return (
    <div
      className="fixed inset-0 z-[70] overflow-y-auto bg-ink/40 backdrop-blur-sm"
      onClick={() => setKey(null)}
    >
      <article
        role="dialog"
        aria-label={article.title}
        onClick={(e) => e.stopPropagation()}
        className="mx-auto my-8 w-[min(100%-2rem,52rem)] rounded-[2rem] bg-panel ring-1 ring-ink/10"
      >
        <header className="sticky top-0 z-10 flex items-start justify-between gap-6 rounded-t-[2rem] border-b border-ink/8 bg-panel/95 px-7 py-6 backdrop-blur-md md:px-12">
          <div>
            <span className="inline-block rounded-full bg-neon/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-neon ring-1 ring-neon/30">
              {article.tag}
            </span>
            <h1 className="mt-3 font-serif text-3xl leading-tight text-ink md:text-4xl">
              {article.title}
            </h1>
            <p className="mt-2 text-xs text-body tabular">{article.meta}</p>
          </div>
          <button
            onClick={() => setKey(null)}
            aria-label="Close article"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-1 ring-ink/15 transition-colors hover:bg-ink hover:text-paper"
          >
            ✕
          </button>
        </header>

        <div
          className="article-body px-7 py-8 md:px-12 md:py-10"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <footer className="flex flex-col items-center gap-4 border-t border-ink/8 px-7 py-8 md:px-12">
          <p className="text-center text-xs text-ink/35">
            Education, not advice — always consult a licensed professional
            before making investment decisions.
          </p>
          <button
            onClick={() => setKey(null)}
            className="rounded-full bg-neon px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-ink hover:text-paper"
          >
            ← Back to the site
          </button>
        </footer>
      </article>
    </div>
  )
}
