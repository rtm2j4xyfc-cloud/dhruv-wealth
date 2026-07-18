import { useEffect, useRef } from "react"

// Adds .in when the element scrolls into view, driving the CSS reveal
// and widget animations. Children render inside a single wrapper div.
export default function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in")
          io.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  )
}
