import { useState } from "react"
import { Link } from "react-router-dom"
import { getLocalizedProjects, type LocalizedProject } from "../data/projects"
import Footer from "../components/Footer"
import { useScrollReveal, revealStyle } from "../hooks/useScrollReveal"
import { useLanguage } from "../contexts/language"

type Filter = "all" | "professional" | "research" | "academic" | "experimental" | "earlywork"

const categoryColors: Record<string, string> = {
  professional: "var(--accent)",

  research: "#8B5CF6",

  academic: "#10B981",

  experimental: "#F59E0B",

  earlywork: "#9CA3AF",
}

function ProjectCard({
  project,
  index,
}: {
  project: LocalizedProject
  index: number
}) {
  const { ref, visible } = useScrollReveal<HTMLAnchorElement>({
    rootMargin: "0px 0px -30px 0px",
  })
  const { messages } = useLanguage()
  const color = categoryColors[project.filterCategory] || "var(--accent)"

  return (
    <article>
      <Link
        ref={ref}
        to={`/projects/${project.slug}`}
        className="group block rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
        style={{
          background: "var(--surface)",

          border: "1px solid var(--border)",

          ...revealStyle(visible, index * 0.045),
        }}
        aria-label={`${messages.projects.exploreAria}: ${project.title}`}
      >
        {/* Visual */}
        <div
          className="relative h-44 overflow-hidden"
          style={{ background: "var(--surface-el)" }}
        >
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,

              backgroundSize: "22px 22px",
            }}
            aria-hidden
          />
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              background: `radial-gradient(ellipse at center, color-mix(in srgb, ${color} 10%, transparent), transparent 65%)`,
            }}
            aria-hidden
          />
          {/* Classification badge */}
          <div className="absolute inset-x-0 bottom-0 px-5 py-3">
            <p
              className="text-[9px] tracking-[0.2em] uppercase"
              style={{ color, fontFamily: "var(--font-mono)", opacity: 0.6 }}
            >
              {project.classificationLabel}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pt-5 pb-6">
          {/* Category · Year */}
          <p
            className="text-[10px] tracking-widest uppercase mb-3"
            style={{
              color: "var(--text-secondary)",
              fontFamily: "var(--font-mono)",
              opacity: 0.45,
            }}
          >
            {project.category.split("·")[0].trim()} · {project.year}
          </p>

          <h3
            className="text-base font-semibold leading-tight mb-1"
            style={{ color: "var(--text-primary)" }}
          >
            {project.title}
          </h3>
          {project.subtitle && (
            <p
              className="text-sm font-serif italic"
              style={{ color: "var(--text-secondary)", opacity: 0.7 }}
            >
              {project.subtitle}
            </p>
          )}

          <p
            className="text-sm mt-4 leading-relaxed"
            style={
              {
                color: "var(--text-secondary)",

                opacity: 0.75,

                display: "-webkit-box",

                WebkitLineClamp: 2,

                WebkitBoxOrient: "vertical",

                overflow: "hidden",
              } as React.CSSProperties
            }
          >
            {project.shortDescription}
          </p>

          {/* Stack — dot separated, max 3 */}
          <p
            className="text-[11px] mt-4 mb-5"
            style={{
              color: "var(--text-secondary)",
              opacity: 0.4,
              fontFamily: "var(--font-mono)",
            }}
          >
            {project.stack.slice(0, 3).join(" · ")}
          </p>

          {/* CTA arrow */}
          <div className="flex items-center gap-1.5 group/arrow">
            <span
              className="text-xs font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              {messages.projects.openProject}
            </span>
            <svg
              className="transition-transform duration-300 group-hover/arrow:translate-x-1"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{ color }}
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

export default function Projects() {
  const [active, setActive] = useState<Filter>("all")
  const { locale, messages } = useLanguage()
  const copy = messages.projects
  const { ref: headerRef, visible: headerVisible } = useScrollReveal({
    once: false,
  })
  const allProjects = getLocalizedProjects(locale)
  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: copy.all },
    { id: "professional", label: copy.professional },
    { id: "research", label: copy.research },
    { id: "academic", label: copy.academic },
    { id: "experimental", label: copy.experimental },
    { id: "earlywork", label: copy.earlyWork },
  ]

  const filtered =
    active === "all"
      ? allProjects
      : allProjects.filter((p) => p.filterCategory === active)

  return (
    <>
      <main className="min-h-screen pt-28" style={{ background: "var(--bg)" }}>
        <div className="w-wide">
          {/* Header */}
          <div
            ref={headerRef as React.RefObject<HTMLDivElement>}
            className="mb-14"
            style={revealStyle(headerVisible)}
          >
            <p
              className="text-[10px] tracking-[0.25em] uppercase font-medium mb-4"
              style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
            >
              {copy.pageLabel}
            </p>
            <h1
              className="font-semibold leading-tight"
              style={{
                fontSize: "clamp(36px, 5.5vw, 72px)",
                color: "var(--text-primary)",
                letterSpacing: "-0.03em",
              }}
            >
              {copy.title}
              <br />
              <span
                className="font-serif font-normal italic"
                style={{ color: "var(--text-secondary)" }}
              >
                {copy.titleEmphasis}
              </span>
            </h1>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActive(f.id)}
                aria-pressed={active === f.id}
                className="min-h-11 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background:
                    active === f.id ? "var(--accent)" : "var(--surface-el)",

                  color: active === f.id ? "#fff" : "var(--text-secondary)",

                  border: "1px solid",

                  borderColor:
                    active === f.id ? "var(--accent)" : "var(--border)",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Count */}
          <p
            className="text-[10px] mb-8"
            style={{
              color: "var(--text-secondary)",
              fontFamily: "var(--font-mono)",
              opacity: 0.35,
            }}
          >
            {filtered.length}{" "}
            {filtered.length === 1 ? copy.project : copy.projects}
          </p>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 mb-28">
            {filtered.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
