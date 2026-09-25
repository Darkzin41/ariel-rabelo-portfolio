import { useNavigate } from "react-router-dom"

import { useScrollReveal, revealStyle } from "../hooks/useScrollReveal"
import ScanGridButton from "./ui/ScanGridButton"
import { useLanguage } from "../contexts/language"

export default function MoreProjectsCta() {
  const navigate = useNavigate()
  const { messages } = useLanguage()
  const copy = messages.moreProjects
  const { ref, visible } = useScrollReveal({ threshold: 0.15 })

  return (
    <section
      className="py-24"
      style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}
    >
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="w-medium text-center mx-auto px-6"
        style={revealStyle(visible)}
      >
        <p
          className="text-[10px] tracking-[0.25em] uppercase font-medium mb-5"
          style={{
            color: "var(--text-secondary)",
            fontFamily: "var(--font-mono)",
            opacity: 0.5,
          }}
        >
          {copy.eyebrow}
        </p>
        <p
          className="font-medium leading-snug mb-8 mx-auto"
          style={{
            fontSize: "clamp(18px, 2.5vw, 26px)",

            color: "var(--text-secondary)",

            maxWidth: "480px",
          }}
        >
          {copy.text}{" "}
          <span
            className="font-serif italic"
            style={{ color: "var(--text-primary)" }}
          >
            {copy.emphasis}
          </span>
        </p>

        <ScanGridButton onClick={() => navigate("/projects")} size="lg">
          {copy.action}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </ScanGridButton>
      </div>
    </section>
  )
}
