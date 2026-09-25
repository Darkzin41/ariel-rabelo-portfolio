import { useScrollReveal, revealStyle } from "../hooks/useScrollReveal"
import { useLanguage } from "../contexts/language"

export default function Experience() {
  const { ref: sectionRef, visible } = useScrollReveal({ threshold: 0.1 })
  const { messages } = useLanguage()
  const copy = messages.experience

  return (
    <section
      id="experiencia"
      className="py-40"
      style={{ background: "var(--bg-experience)" }}
    >
      <div className="w-wide">
        <div
          ref={sectionRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32"
          style={revealStyle(visible, 0, "up")}
        >
          {/* Experience */}
          <div>
            <p
              className="text-[10px] tracking-[0.25em] uppercase font-medium mb-16"
              style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
            >
              {copy.experienceLabel}
            </p>

            <div
              className="relative pl-6"
              style={{ borderLeft: "1px solid var(--border)" }}
            >
              <span
                className="absolute -left-1 top-1.5 w-2 h-2 rounded-full"
                style={{
                  background: "var(--accent)",
                  boxShadow: "0 0 12px var(--accent-glow)",
                }}
              />

              <p
                className="text-[10px] tracking-widest uppercase mb-2"
                style={{
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-mono)",
                  opacity: 0.5,
                }}
              >
                {copy.present}
                <span
                  className="ml-2 px-1.5 py-0.5 rounded-full text-[9px]"
                  style={{
                    background: "var(--accent-soft)",
                    color: "var(--accent)",
                  }}
                >
                  {copy.current}
                </span>
              </p>

              <h3
                className="text-xl font-semibold mb-1"
                style={{ color: "var(--text-primary)" }}
              >
                {copy.jobTitle}
              </h3>
              <p
                className="text-sm font-medium mb-3"
                style={{ color: "var(--text-secondary)" }}
              >
                {copy.organization}
              </p>
              <p
                className="text-xs italic mb-4"
                style={{ color: "var(--text-secondary)", opacity: 0.4 }}
              >
                {copy.location}
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {copy.description}
              </p>

              <a
                href="https://www.linkedin.com/in/ariel-asafedev"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 font-medium transition-all hover:scale-[1.02]"
                style={{
                  padding: "12px 20px",

                  borderRadius: "10px",

                  fontSize: "13px",

                  border: "1px solid var(--border)",

                  color: "var(--text-secondary)",

                  textDecoration: "none",

                  background: "var(--surface-el)",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {copy.linkedIn}
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Education */}
          <div>
            <p
              className="text-[10px] tracking-[0.25em] uppercase font-medium mb-16"
              style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
            >
              {copy.educationLabel}
            </p>

            <div className="flex flex-col gap-14">
              {[
                {
                  org: "Universidade Ceuma",

                  course: copy.ceumaCourse,
                  period: "2026 — 2028",

                  current: true,
                },

                {
                  org: "IFMA — Instituto Federal do Maranhão",

                  course: copy.ifmaCourse,
                  period: "2023 — 2025",

                  current: false,

                  note: copy.ifmaNote,
                },

                {
                  org: "INCODE — Tech School",

                  course: copy.incodeCourse,
                  period: "2025",

                  current: false,
                },
              ].map((e, i) => (
                <div
                  key={i}
                  className="relative pl-6"
                  style={{ borderLeft: "1px solid var(--border)" }}
                >
                  {e.current && (
                    <span
                      className="absolute -left-1 top-1.5 w-2 h-2 rounded-full"
                      style={{
                        background: "var(--accent)",
                        boxShadow: "0 0 10px var(--accent-glow)",
                      }}
                    />
                  )}
                  <p
                    className="text-[10px] tracking-widest uppercase mb-1.5"
                    style={{
                      color: "var(--text-secondary)",
                      fontFamily: "var(--font-mono)",
                      opacity: 0.4,
                    }}
                  >
                    {e.period}
                    {e.current && (
                      <span
                        className="ml-2 px-1.5 py-0.5 rounded-full text-[9px]"
                        style={{
                          background: "var(--accent-soft)",
                          color: "var(--accent)",
                          opacity: 1,
                        }}
                      >
                        {copy.ongoing}
                      </span>
                    )}
                  </p>
                  <p
                    className="text-base font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {e.org}
                  </p>
                  <p
                    className="text-sm mt-0.5"
                    style={{ color: "var(--text-secondary)", opacity: 0.7 }}
                  >
                    {e.course}
                  </p>
                  {e.note && (
                    <p
                      className="text-xs mt-1.5 italic"
                      style={{ color: "var(--accent)", opacity: 0.75 }}
                    >
                      {e.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
