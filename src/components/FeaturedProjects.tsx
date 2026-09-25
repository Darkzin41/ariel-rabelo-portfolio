import { useEffect, useRef, type RefObject } from "react"
import { Link } from "react-router-dom"
import { getLocalizedProjects, type LocalizedProject } from "../data/projects"
import { useScrollReveal, revealStyle } from "../hooks/useScrollReveal"
import { useLanguage } from "../contexts/language"

/* ─── Project visual mockups ─────────────────────────────────── */

function AgilizaVisual({
  mockupRef,
}: {
  mockupRef: RefObject<HTMLDivElement | null>
}) {
  const { messages } = useLanguage()
  const copy = messages.featured
  return (
    <div
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg, #0b1120 0%, #080d18 60%, #05080f 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)",

          backgroundSize: "36px 36px",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 60% 45%, var(--accent-soft), transparent 70%)",
        }}
        aria-hidden
      />

      <div
        ref={mockupRef}
        className="relative z-10 w-full max-w-5xl px-5 sm:px-12 lg:px-16"
      >
        {/* Dashboard mockup */}
        <div
          className="rounded-xl overflow-hidden"
          style={{
            border: "1px solid rgba(59,130,246,0.2)",
            background: "rgba(8,13,24,0.9)",
          }}
        >
          {/* Topbar */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{ borderBottom: "1px solid rgba(59,130,246,0.12)" }}
          >
            <div className="flex gap-1.5">
              {["#FF5F57", "#FFBD2E", "#28CA41"].map((c) => (
                <span
                  key={c}
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: c }}
                />
              ))}
            </div>
            <div
              className="flex-1 mx-3 h-5 rounded-md"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <p
                className="text-[9px] text-center leading-5"
                style={{
                  color: "rgba(255,255,255,0.2)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                agiliza.stc.ma.gov.br
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 p-4">
            {[
              { label: copy.objects, v: "49", color: "var(--accent)" },
              { label: copy.fields, v: "276", color: "#8B5CF6" },
              { label: copy.associations, v: "484", color: "#10B981" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-lg p-3 text-center"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid color-mix(in srgb, ${s.color} 14%, transparent)`,
                }}
              >
                <p className="text-lg font-bold" style={{ color: s.color }}>
                  {s.v}
                </p>
                <p
                  className="text-[9px] mt-0.5"
                  style={{
                    color: "rgba(255,255,255,0.35)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <div className="px-4 pb-4 flex flex-col gap-2">
            {[
              { label: copy.authValidation, icon: "◉", w: "85%" },
              { label: "OCR · Google Vision API", icon: "◎", w: "72%" },
              { label: copy.dataSync, icon: "◈", w: "60%" },
            ].map((row) => (
              <div key={row.label} className="flex items-center gap-3">
                <span
                  className="text-[10px] w-4 flex-shrink-0"
                  style={{ color: "var(--accent)", opacity: 0.6 }}
                >
                  {row.icon}
                </span>
                <div
                  className="flex-1 h-1.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: row.w,
                      background: "var(--accent)",
                      opacity: 0.5,
                    }}
                  />
                </div>
                <p
                  className="text-[9px] w-32 text-right"
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {row.label}
                </p>
              </div>
            ))}
          </div>

          <div
            className="px-4 py-3 flex items-center justify-between"
            style={{
              borderTop: "1px solid rgba(59,130,246,0.1)",
              background: "rgba(59,130,246,0.03)",
            }}
          >
            <p
              className="text-[9px]"
              style={{
                color: "rgba(255,255,255,0.25)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {copy.tests}
            </p>
            <p
              className="text-[9px] px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(59,130,246,0.15)",
                color: "var(--accent)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {copy.inDevelopment}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ArquivoVisual({
  mockupRef,
}: {
  mockupRef: RefObject<HTMLDivElement | null>
}) {
  const { messages } = useLanguage()
  const docs = [
    { name: "historia_indigena_sjr.pdf", type: "PDF", size: "2.4 MB" },

    { name: "acervo_metadados.json", type: "JSON", size: "180 KB" },

    { name: "index.html", type: "HTML", size: "34 KB" },

    { name: "busca_acervo.js", type: "JS", size: "11 KB" },

    { name: "documentos_historicos/", type: "DIR", size: "—" },
  ]

  return (
    <div
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #0e0a1a 0%, #09070f 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#8B5CF6 1px, transparent 1px), linear-gradient(90deg, #8B5CF6 1px, transparent 1px)",

          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 45% 50%, rgba(139,92,246,0.08), transparent 70%)",
        }}
        aria-hidden
      />

      <div
        ref={mockupRef}
        className="relative z-10 w-full max-w-5xl px-5 sm:px-12 lg:px-16"
      >
        <div
          className="rounded-xl overflow-hidden"
          style={{
            border: "1px solid rgba(139,92,246,0.2)",
            background: "rgba(9,7,15,0.95)",
          }}
        >
          <div
            className="px-4 py-3 flex items-center gap-3"
            style={{ borderBottom: "1px solid rgba(139,92,246,0.12)" }}
          >
            <div className="flex gap-1.5">
              {["#FF5F57", "#FFBD2E", "#28CA41"].map((c) => (
                <span
                  key={c}
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: c }}
                />
              ))}
            </div>
            <p
              className="text-[10px]"
              style={{
                color: "rgba(255,255,255,0.25)",
                fontFamily: "var(--font-mono)",
              }}
            >
              /arquivo-indigena/
            </p>
          </div>
          <div className="p-4 flex flex-col gap-1.5">
            {docs.map((doc, i) => (
              <div
                key={doc.name}
                className="flex items-center gap-3 px-3 py-2 rounded-lg"
                style={{
                  background:
                    i === 0 ? "rgba(139,92,246,0.1)" : "rgba(255,255,255,0.02)",

                  border: `1px solid ${
                    i === 0 ? "rgba(139,92,246,0.2)" : "transparent"
                  }`,

                  opacity: 1 - i * 0.12,
                }}
              >
                <span
                  className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold flex-shrink-0"
                  style={{
                    background:
                      doc.type === "PDF"
                        ? "rgba(239,68,68,0.15)"
                        : doc.type === "JSON"
                          ? "rgba(245,158,11,0.15)"
                          : doc.type === "DIR"
                            ? "rgba(139,92,246,0.15)"
                            : "rgba(59,130,246,0.15)",

                    color:
                      doc.type === "PDF"
                        ? "#EF4444"
                        : doc.type === "JSON"
                          ? "#F59E0B"
                          : doc.type === "DIR"
                            ? "#8B5CF6"
                            : "#3B82F6",
                  }}
                >
                  {doc.type}
                </span>
                <p
                  className="text-xs flex-1 truncate"
                  style={{
                    color: "rgba(255,255,255,0.55)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {doc.name}
                </p>
                <p
                  className="text-[9px] flex-shrink-0"
                  style={{ color: "rgba(255,255,255,0.2)" }}
                >
                  {doc.size}
                </p>
              </div>
            ))}
          </div>
          <div
            className="px-4 py-3 flex items-center gap-2"
            style={{ borderTop: "1px solid rgba(139,92,246,0.1)" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#10B981" }}
            />
            <p
              className="text-[9px]"
              style={{ color: "#10B981", fontFamily: "var(--font-mono)" }}
            >
              {messages.featured.published}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Section intro ──────────────────────────────────────────── */

function SectionIntro() {
  const { ref, visible } = useScrollReveal({ rootMargin: "0px 0px -60px 0px" })
  const { messages } = useLanguage()
  const copy = messages.featured
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="w-medium text-center mx-auto mb-20"
      style={revealStyle(visible)}
    >
      <p
        className="text-[10px] tracking-[0.25em] uppercase font-medium mb-5"
        style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
      >
        {copy.eyebrow}
      </p>
      <h2
        className="font-semibold leading-tight"
        style={{
          fontSize: "var(--type-h2)",
          color: "var(--text-primary)",
          letterSpacing: "-0.03em",
        }}
      >
        {copy.title}{" "}
        <span
          className="font-serif font-normal italic"
          style={{ color: "var(--text-secondary)" }}
        >
          {copy.titleEmphasis}
        </span>
      </h2>
    </div>
  )
}

/* ─── Individual editorial project card ─────────────────────── */

const visuals = [AgilizaVisual, ArquivoVisual]

function EditorialProject({
  project,

  index,
}: {
  project: LocalizedProject
  index: number
}) {
  const { ref: visualRef, visible: visualVisible } = useScrollReveal({
    rootMargin: "0px 0px -80px 0px",
  })

  const { ref: textRef, visible: textVisible } = useScrollReveal({
    rootMargin: "0px 0px -40px 0px",
  })

  const mockupRef = useRef<HTMLDivElement>(null)
  const { messages } = useLanguage()
  const copy = messages.featured

  useEffect(() => {
    const visual = visualRef.current

    const mockup = mockupRef.current

    if (!visual || !mockup) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    let frame = 0

    const update = () => {
      frame = 0

      if (reducedMotion.matches) {
        mockup.style.transform = "none"

        return
      }

      const bounds = visual.getBoundingClientRect()

      const distance =
        (window.innerHeight / 2 - (bounds.top + bounds.height / 2)) * 0.025

      const offset = Math.max(-12, Math.min(12, distance))

      mockup.style.transform = `translate3d(0, ${offset}px, 0)`
    }

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    schedule()

    window.addEventListener("scroll", schedule, { passive: true })

    window.addEventListener("resize", schedule)

    reducedMotion.addEventListener("change", schedule)

    return () => {
      window.cancelAnimationFrame(frame)

      window.removeEventListener("scroll", schedule)

      window.removeEventListener("resize", schedule)

      reducedMotion.removeEventListener("change", schedule)
    }
  }, [visualRef])

  const Visual = visuals[index]

  return (
    <article className="group">
      <Link
        to={`/projects/${project.slug}`}
        className="block rounded-2xl"
        aria-label={`${copy.exploreProjectAria}: ${project.title}`}
      >
        {/* Visual — full width, tall */}
        <div
          ref={visualRef as React.RefObject<HTMLDivElement>}
          className="w-full rounded-2xl overflow-hidden"
          style={{
            height: "clamp(340px, 46vw, 600px)",

            border: "1px solid var(--border)",

            transition: "border-color 0.4s",

            ...revealStyle(visualVisible, 0),
          }}
        >
          <div className="w-full h-full transition-transform duration-700 group-hover:scale-[1.015]">
            <Visual mockupRef={mockupRef} />
          </div>
        </div>

        {/* Text — below the visual */}
        <div
          ref={textRef as React.RefObject<HTMLDivElement>}
          className="mt-10 mx-auto"
          style={{
            maxWidth: "560px",

            ...revealStyle(textVisible, 0.1, "up"),
          }}
        >
          {/* Category + Year */}
          <p
            className="text-[10px] tracking-[0.2em] uppercase font-medium mb-6"
            style={{
              color: "var(--text-secondary)",
              fontFamily: "var(--font-mono)",
              opacity: 0.6,
            }}
          >
            {project.category.split("·")[0].trim()} · {project.year}
            <span
              className="ml-3 px-2 py-0.5 rounded-full text-[9px]"
              style={{
                background: "var(--accent-soft)",
                color: "var(--accent)",
              }}
            >
              {project.classificationLabel}
            </span>
          </p>

          {/* Title */}
          <h3
            className="font-semibold leading-[1.05] mb-6"
            style={{
              fontSize: "var(--type-h3)",

              color: "var(--text-primary)",

              letterSpacing: "-0.03em",
            }}
          >
            {project.title.toUpperCase()}
            {project.subtitle && (
              <span
                className="block font-serif font-normal italic text-[0.7em]"
                style={{ color: "var(--text-secondary)", marginTop: "0.1em" }}
              >
                {project.subtitle}
              </span>
            )}
          </h3>

          {/* Description */}
          <p
            className="leading-relaxed mb-7"
            style={{
              color: "var(--text-secondary)",
              fontSize: "var(--type-body)",
            }}
          >
            {project.shortDescription}
          </p>

          {/* Stack — dot-separated */}
          <p
            className="text-xs mb-8"
            style={{
              color: "var(--text-secondary)",
              opacity: 0.5,
              fontFamily: "var(--font-mono)",
            }}
          >
            {project.stack.slice(0, 3).join(" · ")}
          </p>

          {/* CTA */}
          <div
            className="inline-flex min-h-[52px] items-center gap-3 rounded-xl px-5 transition-all duration-300 group-hover:scale-[1.02] group-focus-within:scale-[1.02]"
            style={{
              color: "#fff",

              background: "var(--accent)",

              boxShadow: "0 10px 28px var(--accent-glow)",
            }}
          >
            <span
              className="text-sm font-semibold"
              style={{ color: "inherit" }}
            >
              {copy.exploreProject}
            </span>
            <svg
              className="transition-transform duration-300 group-hover:translate-x-2 group-focus-within:translate-x-2"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{ color: "inherit" }}
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      </Link>
    </article>
  )
}

/* ─── Main export ────────────────────────────────────────────── */

export default function FeaturedProjects() {
  const { locale } = useLanguage()
  const featuredProjects = getLocalizedProjects(locale).filter(
    (project) => project.featured,
  )
  return (
    <section
      id="projetos"
      style={{
        background: "var(--bg-projects)",
        paddingBlock: "var(--section-space)",
      }}
    >
      <div className="w-wide">
        <SectionIntro />

        <div className="flex flex-col gap-24 md:gap-36">
          {featuredProjects.map((project, i) => (
            <EditorialProject key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
