import { useEffect, useRef, useState, type CSSProperties } from "react"

import ParticleSaturn from "./ParticleSaturn"
import ScanGridButton from "./ui/ScanGridButton"
import FluidText from "./ui/FluidText"
import { useLanguage } from "../contexts/language"

export default function Hero() {
  const { messages } = useLanguage()
  const copy = messages.hero
  const [visible, setVisible] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)

  const backgroundRef = useRef<HTMLDivElement>(null)

  const contentRef = useRef<HTMLDivElement>(null)

  const saturnRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 80)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const section = sectionRef.current

    const background = backgroundRef.current

    const content = contentRef.current

    const saturn = saturnRef.current

    if (!section || !background || !content || !saturn) return

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    )

    let frame = 0

    let active = true

    const update = () => {
      frame = 0

      if (!active || motionPreference.matches) {
        background.style.transform = "translate3d(0, 0, 0)"

        content.style.transform = "translate3d(0, 0, 0)"

        saturn.style.setProperty("--saturn-parallax", "0px")

        return
      }

      const scroll = window.scrollY

      background.style.transform = `translate3d(0, ${scroll * 0.08}px, 0)`

      content.style.transform = `translate3d(0, ${scroll * 0.12}px, 0)`

      saturn.style.setProperty("--saturn-parallax", `${scroll * 0.35}px`)
    }

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    const visibility = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting

      schedule()
    })

    visibility.observe(section)

    window.addEventListener("scroll", schedule, { passive: true })

    window.addEventListener("resize", schedule)

    motionPreference.addEventListener("change", schedule)

    schedule()

    return () => {
      window.cancelAnimationFrame(frame)

      visibility.disconnect()

      window.removeEventListener("scroll", schedule)

      window.removeEventListener("resize", schedule)

      motionPreference.removeEventListener("change", schedule)
    }
  }, [])

  const appear = (delay: number): CSSProperties => ({
    opacity: visible ? 1 : 0,

    transform: visible ? "translateY(0)" : "translateY(28px)",

    transition: `opacity 0.9s ${delay}s cubic-bezier(0.16,1,0.3,1), transform 0.9s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
  })

  const scrollToProjects = () => {
    document.getElementById("projetos")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    })
  }

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-screen overflow-hidden"
      style={{ background: "var(--bg-hero)" }}
      aria-label={copy.sectionLabel}
    >
      <div
        ref={backgroundRef}
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 70% 48%, var(--accent-soft), transparent 70%)",
          opacity: 0.5,
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 pointer-events-none grain-overlay"
        style={{ opacity: 0.03 }}
        aria-hidden
      />

      <div className="w-wide relative z-[2] grid min-h-screen grid-cols-1 content-start pt-28 pb-16 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] lg:content-center lg:py-24">
        <div
          ref={contentRef}
          className="flex max-w-[560px] flex-col items-start will-change-transform"
        >
          <div style={appear(0)}>
            <p
              className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-medium"
              style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: "var(--accent)",
                  animation: "pulse 2s infinite",
                }}
              />
              {copy.eyebrow}
            </p>
          </div>

          <div style={appear(0.12)} className="mt-6 max-w-full">
            <FluidText scale={4}>
              <h1
                className="font-semibold leading-[0.9] select-none"
                style={{
                  fontSize: "clamp(64px, 10vw, 148px)",
                  color: "var(--text-primary)",
                  letterSpacing: "-0.04em",
                }}
              >
                ARIEL
              </h1>
              <p
                className="font-serif font-normal italic leading-[0.88] select-none"
                style={{
                  fontSize: "clamp(58px, 8.5vw, 128px)",
                  color: "var(--text-secondary)",
                  letterSpacing: "-0.03em",
                  marginTop: "-0.04em",
                }}
              >
                Rabelo
              </p>
            </FluidText>
          </div>

          <div style={appear(0.26)} className="mt-8">
            <p
              className="font-medium leading-snug"
              style={{
                fontSize: "clamp(15px, 1.8vw, 19px)",
                color: "var(--text-primary)",
                opacity: 0.92,
              }}
            >
              {copy.statementStart}{" "}
              <span
                className="font-serif italic"
                style={{ color: "var(--accent)" }}
              >
                {copy.statementEmphasis}
              </span>{" "}
              {copy.statementEnd}
            </p>
          </div>

          <div
            style={appear(0.38)}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <ScanGridButton onClick={scrollToProjects} size="lg">
              {copy.exploreProjects}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </ScanGridButton>
            <a
              href="https://github.com/Darkzin41"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] items-center gap-2 rounded-xl px-6 py-4 text-sm font-medium transition-all hover:scale-[1.02]"
              style={{
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
              }}
            >
              GitHub ↗
            </a>
          </div>

          <div style={appear(0.48)} className="mt-7">
            <p
              className="text-xs tracking-widest"
              style={{
                color: "var(--text-secondary)",
                fontFamily: "var(--font-mono)",
                opacity: 0.5,
              }}
            >
              {copy.location}
            </p>
          </div>
        </div>

        <div
          ref={saturnRef}
          className="hero-saturn pointer-events-none mt-12 aspect-square w-[min(360px,calc(100vw-48px))] justify-self-end will-change-transform lg:mt-0 lg:w-full lg:max-w-[640px]"
          style={
            {
              opacity: visible ? 0.72 : 0,
              transition: "opacity 1.4s 0.3s cubic-bezier(0.16,1,0.3,1)",
            } as CSSProperties
          }
          aria-hidden
        >
          <ParticleSaturn size={640} />
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 lg:flex"
        style={{
          opacity: visible ? 0.3 : 0,
          transition: "opacity 1s 1.8s",
          zIndex: 3,
        }}
        aria-hidden
      >
        <span
          className="text-[9px] tracking-[0.25em] uppercase"
          style={{
            color: "var(--text-secondary)",
            fontFamily: "var(--font-mono)",
          }}
        >
          {copy.scroll}
        </span>
        <div
          className="w-px rounded-full"
          style={{
            height: "40px",
            background:
              "linear-gradient(to bottom, var(--accent), transparent)",
            animation: "scrollFade 2.2s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        .hero-saturn { transform: translate3d(0, var(--saturn-parallax, 0px), 0); }
        @keyframes scrollFade { 0%, 100% { opacity: .3; transform: scaleY(1); } 50% { opacity: .8; transform: scaleY(.7) translateY(4px); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .4; } }
      `}</style>
    </section>
  )
}
