import { useEffect, useState } from "react"
import Nav from "./components/Nav.jsx"
import Hero from "./components/Hero.jsx"
import Statement from "./components/Statement.jsx"
import HowItWorks from "./components/HowItWorks.jsx"
import Bento from "./components/Bento.jsx"
import Articles from "./components/Articles.jsx"
import Tools from "./components/Tools.jsx"
import Calculator from "./components/Calculator.jsx"
import MeetDhruv from "./components/MeetDhruv.jsx"
import Founder from "./components/Founder.jsx"
import FAQ from "./components/FAQ.jsx"
import CredentialsDrawer from "./components/CredentialsDrawer.jsx"
import ArticleReader from "./components/ArticleReader.jsx"
import ToolsHub from "./components/ToolsHub.jsx"
import CTA from "./components/CTA.jsx"
import Footer from "./components/Footer.jsx"
import Reveal from "./components/Reveal.jsx"

const parseRoute = () => {
  const r = window.location.hash.replace(/^#\/?/, "").split("?")[0]
  return ["articles", "tools", "about", "letter"].includes(r) ? r : "home"
}

function useRoute() {
  const [route, setRoute] = useState(parseRoute)
  useEffect(() => {
    const onHash = () => {
      setRoute(parseRoute())
      window.scrollTo({ top: 0, behavior: "instant" })
    }
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [])
  return route
}

const explore = [
  {
    href: "#/articles",
    kicker: "Articles",
    title: "Read your way to confidence",
    desc: "Nine full pieces — Canada Basics, Accounts, Strategy, ETFs, Budgeting.",
  },
  {
    href: "#/tools",
    kicker: "Tools",
    title: "Run your own numbers",
    desc: "Calculators and trackers built for Canadian accounts. No sign-up.",
  },
  {
    href: "#/about",
    kicker: "About",
    title: "Meet Dhruv",
    desc: "The story, the mission, and the credentials — receipts included.",
  },
]

function ExploreLinks() {
  return (
    <section className="px-4 pb-20 md:pb-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-5 md:grid-cols-3">
          {explore.map((e, i) => (
            <Reveal key={e.href} delay={i * 100}>
              <a
                href={e.href}
                className="group flex h-full flex-col rounded-[2rem] bg-panel p-8 ring-1 ring-ink/8 transition-all duration-300 hover:-translate-y-1.5 hover:ring-neon/50"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neon">
                  {e.kicker}
                </p>
                <h3 className="mt-4 font-serif text-3xl leading-tight text-ink transition-colors group-hover:text-neon">
                  {e.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-body">{e.desc}</p>
                <p className="mt-6 text-sm font-medium text-ink/50 transition-colors group-hover:text-neon">
                  Open <span aria-hidden="true">→</span>
                </p>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal delay={150}>
          <a
            href="#/letter"
            className="group mt-5 flex items-center justify-between rounded-[2rem] bg-neon/10 px-8 py-6 ring-1 ring-neon/30 transition-all duration-300 hover:bg-neon/15 hover:ring-neon/60"
          >
            <div>
              <p className="font-serif text-2xl text-ink">
                The Letter — one honest idea at a time.
              </p>
              <p className="mt-1 text-sm text-body">Straight from Alberta. Nothing for sale.</p>
            </div>
            <span className="rounded-full bg-neon px-6 py-3 text-sm font-medium text-white transition-colors group-hover:bg-ink group-hover:text-paper">
              Join free →
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}

const pages = {
  home: (
    <>
      <Hero />
      <Statement />
      <HowItWorks />
      <Bento />
      <ExploreLinks />
    </>
  ),
  articles: (
    <div className="pt-24">
      <Articles />
    </div>
  ),
  tools: (
    <div className="pt-24">
      <Tools />
      <Calculator />
    </div>
  ),
  about: (
    <div className="pt-24">
      <MeetDhruv />
      <Founder />
      <FAQ />
    </div>
  ),
  letter: (
    <div className="pt-24">
      <CTA />
    </div>
  ),
}

export default function App() {
  const route = useRoute()
  return (
    <main>
      <Nav route={route} />
      {pages[route]}
      <Footer />
      <CredentialsDrawer />
      <ArticleReader />
      <ToolsHub />
    </main>
  )
}
