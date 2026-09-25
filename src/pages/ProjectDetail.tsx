import { useParams, useNavigate, Link } from "react-router-dom"
import { getLocalizedProjects } from "../data/projects"
import Tag from "../components/ui/Tag"
import Footer from "../components/Footer"
import { useScrollReveal, revealStyle } from "../hooks/useScrollReveal"
import { useLanguage } from "../contexts/language"

function CaseSection({
  n,
  title,
  content,
  delay,
}: {
  n: string
  title: string
  content: string
  delay: number
}) {
  const { ref, visible } = useScrollReveal({ rootMargin: "0px 0px -40px 0px" })

  return (
    <section
      ref={ref as React.RefObject<HTMLDivElement>}
      className="mb-16 pb-16"
      style={{
        borderBottom: "1px solid var(--border)",
        ...revealStyle(visible, delay),
      }}
    >
      <div className="flex items-baseline gap-4 mb-6">
        <span
          className="text-xs"
          style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
        >
          {n}
        </span>
        <h2
          className="text-2xl font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          {title}
        </h2>
      </div>
      <p
        className="text-base leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        {content}
      </p>
    </section>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { locale, messages } = useLanguage()
  const copy = messages.projectDetail
  const allProjects = getLocalizedProjects(locale)
  const project = allProjects.find((p) => p.slug === slug)
  const projectIndex = allProjects.findIndex((p) => p.slug === slug)

  const nextProject = allProjects[(projectIndex + 1) % allProjects.length]

  const { ref: heroRef, visible: heroVisible } = useScrollReveal({
    once: false,
  })

  const { ref: metaRef, visible: metaVisible } = useScrollReveal({
    once: false,
  })

  const { ref: visualRef, visible: visualVisible } = useScrollReveal()

  const { ref: nextRef, visible: nextVisible } = useScrollReveal({
    threshold: 0.1,
  })

  if (!project) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--bg)" }}
      >
        <div className="text-center">
          <p style={{ color: "var(--text-secondary)" }}>{copy.notFound}</p>
          <button
            onClick={() => navigate("/projects")}
            className="mt-4 underline-anim"
            style={{ color: "var(--accent)" }}
          >
            {copy.viewAll}
          </button>
        </div>
      </div>
    )
  }

  const statusColor =
    project.status === "inDevelopment"
      ? "var(--accent)"
      : project.status === "completed"
        ? "#10B981"
        : project.status === "experimental"
          ? "#F59E0B"
          : "#8B5CF6"

  return (
    <>
      <main className="min-h-screen pt-28" style={{ background: "var(--bg)" }}>
        <div className="w-wide">
          {/* Breadcrumb */}
          <nav
            className="mb-12 flex items-center gap-2 text-sm"
            aria-label={copy.breadcrumbLabel}
          >
            <Link
              to="/projects"
              className="underline-anim transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              {copy.projects}
            </Link>
            <span style={{ color: "var(--text-secondary)", opacity: 0.3 }}>
              /
            </span>
            <span style={{ color: "var(--text-primary)" }}>
              {project.title}
            </span>
          </nav>

          {/* Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 mb-20">
            <div
              ref={heroRef as React.RefObject<HTMLDivElement>}
              className="lg:col-span-2"
              style={revealStyle(heroVisible, 0, "up")}
            >
              <p
                className="text-[10px] tracking-[0.2em] uppercase font-medium mb-4"
                style={{
                  color: "var(--accent)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {project.category}
              </p>
              <h1
                className="font-semibold leading-tight mb-6"
                style={{
                  fontSize: "clamp(36px, 5vw, 72px)",

                  color: "var(--text-primary)",

                  letterSpacing: "-0.03em",
                }}
              >
                {project.title}
                {project.subtitle && (
                  <span
                    className="block font-serif font-normal italic mt-2"
                    style={{
                      fontSize: "clamp(28px, 3.5vw, 48px)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {project.subtitle}
                  </span>
                )}
              </h1>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {project.shortDescription}
              </p>
            </div>

            {/* Meta */}
            <div
              ref={metaRef as React.RefObject<HTMLDivElement>}
              style={revealStyle(metaVisible, 0.15, "right")}
            >
              {[
                {
                  label: copy.classification,
                  value: project.classificationLabel,
                },
                { label: copy.year, value: project.year },
                { label: copy.role, value: project.role },
                {
                  label: copy.status,
                  value: project.statusLabel,
                  color: statusColor,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="py-4"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <p
                    className="text-[10px] uppercase tracking-widest mb-1"
                    style={{
                      color: "var(--text-secondary)",
                      fontFamily: "var(--font-mono)",
                      opacity: 0.5,
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="text-sm font-medium"
                    style={{
                      color:
                        (item as { color?: string }).color ||
                        "var(--text-primary)",
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
              <div
                className="py-4"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <p
                  className="text-[10px] uppercase tracking-widest mb-2"
                  style={{
                    color: "var(--text-secondary)",
                    fontFamily: "var(--font-mono)",
                    opacity: 0.5,
                  }}
                >
                  {copy.stack}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((s) => (
                    <Tag key={s} variant="mono">
                      {s}
                    </Tag>
                  ))}
                </div>
              </div>
              <div className="pt-4">
                {project.repoPublic && project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm underline-anim font-medium"
                    style={{ color: "var(--accent)" }}
                  >
                    GitHub ↗
                  </a>
                ) : (
                  <p
                    className="text-xs"
                    style={{
                      color: "var(--text-secondary)",
                      opacity: 0.4,
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {copy.privateRepository}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Visual placeholder */}
          <div
            ref={visualRef as React.RefObject<HTMLDivElement>}
            className="w-full rounded-2xl mb-20 overflow-hidden flex items-center justify-center relative"
            style={{
              height: "clamp(240px, 40vw, 480px)",

              background: "var(--surface-el)",

              border: "1px solid var(--border)",

              ...revealStyle(visualVisible, 0.1),
            }}
          >
            {/* Abstract visual */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)",

                backgroundSize: "40px 40px",
              }}
              aria-hidden
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, var(--accent-soft), transparent 55%)",
              }}
              aria-hidden
            />
            <div className="relative z-10 text-center">
              <p
                className="text-xs font-medium mb-2"
                style={{
                  color: "var(--text-secondary)",
                  opacity: 0.35,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {copy.screenshot}
              </p>
              <p
                className="text-[10px]"
                style={{
                  color: "var(--text-secondary)",
                  opacity: 0.2,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {copy.replaceScreenshot}
              </p>
            </div>
          </div>

          {/* Case study sections */}
          <div className="max-w-3xl mx-auto">
            {[
              { n: "01", title: copy.context, content: project.context },
              { n: "02", title: copy.challenge, content: project.challenge },
              { n: "03", title: copy.contribution, content: project.myRole },
              { n: "04", title: copy.resultImpact, content: project.impact },
              { n: "05", title: copy.learnings, content: project.learnings },
            ].map((s, i) => (
              <CaseSection key={s.n} {...s} delay={i * 0.04} />
            ))}

            {/* Tags */}
            <div className="mb-16">
              <p
                className="text-[10px] uppercase tracking-widest mb-4"
                style={{
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-mono)",
                  opacity: 0.5,
                }}
              >
                {copy.tags}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Next project */}
        {nextProject && (
          <div
            className="mt-8 border-t"
            style={{
              borderColor: "var(--border)",
              background: "var(--surface)",
            }}
          >
            <div
              ref={nextRef as React.RefObject<HTMLDivElement>}
              className="w-wide py-16"
              style={revealStyle(nextVisible, 0, "up")}
            >
              <p
                className="text-[10px] uppercase tracking-widest mb-6"
                style={{
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-mono)",
                  opacity: 0.5,
                }}
              >
                {copy.nextProject}
              </p>
              <button
                onClick={() => navigate(`/projects/${nextProject.slug}`)}
                className="group flex items-center gap-6 text-left"
              >
                <h3
                  className="font-semibold transition-colors duration-300 group-hover:text-[color:var(--accent)]"
                  style={{
                    fontSize: "clamp(24px, 4vw, 52px)",

                    color: "var(--text-primary)",

                    letterSpacing: "-0.02em",
                  }}
                >
                  {nextProject.title}
                </h3>
                <svg
                  className="flex-shrink-0 transition-transform duration-300 group-hover:translate-x-2"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  style={{ color: "var(--accent)" }}
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
              <p
                className="mt-3 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                {nextProject.category}
              </p>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
