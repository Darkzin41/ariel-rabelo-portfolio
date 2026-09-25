import { useState, useEffect } from "react"

import ScanGridButton from "./ui/ScanGridButton"
import { useScrollReveal, revealStyle } from "../hooks/useScrollReveal"
import { useLanguage } from "../contexts/language"

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)
  const { messages } = useLanguage()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)

    window.addEventListener("scroll", onScroll, { passive: true })

    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={messages.footer.backToTop}
      className="fixed bottom-8 right-8 z-40 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300"
      style={{
        background: "var(--surface-el)",

        border: "1px solid var(--border)",

        color: "var(--text-secondary)",

        opacity: visible ? 1 : 0,

        pointerEvents: visible ? "auto" : "none",

        transform: visible ? "translateY(0)" : "translateY(12px)",

        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  const { messages } = useLanguage()
  const copy = messages.footer
  const { ref: ctaRef, visible: ctaVisible } = useScrollReveal({
    threshold: 0.1,
  })

  const { ref: bottomRef, visible: bottomVisible } = useScrollReveal({
    threshold: 0.05,
  })

  return (
    <>
      <footer
        id="contato"
        style={{
          background: "var(--bg-contact)",
          borderTop: "1px solid var(--border)",
        }}
      >
        {/* Big CTA */}
        <div
          ref={ctaRef as React.RefObject<HTMLDivElement>}
          className="w-wide pt-32 pb-10"
          style={revealStyle(ctaVisible, 0, "up")}
        >
          <div className="mb-20">
            <p
              className="text-[10px] tracking-[0.2em] uppercase font-medium mb-6"
              style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
            >
              {copy.contact}
            </p>
            <h2
              className="leading-[1.05] mb-10 max-w-2xl"
              style={{
                fontSize: "clamp(36px, 5.5vw, 80px)",

                fontWeight: 600,

                color: "var(--text-primary)",

                letterSpacing: "-0.03em",
              }}
            >
              {copy.headlineStart}{" "}
              <span
                className="font-serif font-normal italic"
                style={{ color: "var(--text-secondary)" }}
              >
                {copy.headlineEmphasis}
              </span>{" "}
              {copy.headlineEnd}
            </h2>
            <div className="flex flex-wrap items-center gap-4">
              <ScanGridButton href="mailto:arielasafe09@gmail.com" size="lg">
                {copy.action}
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </ScanGridButton>
              <a
                href="https://www.linkedin.com/in/ariel-asafedev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium transition-all hover:scale-[1.02]"
                style={{
                  minHeight: "52px",

                  padding: "16px 24px",

                  borderRadius: "12px",

                  fontSize: "14px",

                  border: "1px solid var(--border)",

                  color: "var(--text-secondary)",

                  textDecoration: "none",
                }}
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            ref={bottomRef as React.RefObject<HTMLDivElement>}
            className="border-t pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            style={{
              borderColor: "var(--border)",
              ...revealStyle(bottomVisible, 0.1),
            }}
          >
            <div>
              <p
                className="text-lg font-semibold tracking-wide"
                style={{ color: "var(--text-primary)" }}
              >
                ARIEL RABELO
              </p>
              <p
                className="text-sm mt-1"
                style={{ color: "var(--text-secondary)" }}
              >
                {copy.role}
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ color: "var(--text-secondary)", opacity: 0.5 }}
              >
                {copy.location}
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-3">
              <div className="flex gap-5">
                <a
                  href="https://github.com/Darkzin41"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm underline-anim"
                  style={{ color: "var(--text-secondary)" }}
                >
                  GitHub ↗
                </a>
                <a
                  href="https://www.linkedin.com/in/ariel-asafedev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm underline-anim"
                  style={{ color: "var(--text-secondary)" }}
                >
                  LinkedIn ↗
                </a>
              </div>
              <p
                className="text-xs"
                style={{ color: "var(--text-secondary)", opacity: 0.35 }}
              >
                {copy.builtWith} © {year}
              </p>
            </div>
          </div>
        </div>
      </footer>

      <ScrollToTopButton />
    </>
  )
}
