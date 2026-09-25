import { useState, useEffect, useRef, type MouseEvent } from "react"

import { Link, useLocation, useNavigate } from "react-router-dom"
import { useTheme } from "../contexts/theme"
import { useLanguage } from "../contexts/language"
import LanguageSelector from "./LanguageSelector"

const accentOptions = [
  { id: "blue", labelKey: "accentBlue", color: "#3B82F6" },
  { id: "violet", labelKey: "accentViolet", color: "#8B5CF6" },
  { id: "emerald", labelKey: "accentEmerald", color: "#10B981" },
  { id: "amber", labelKey: "accentAmber", color: "#F59E0B" },
] as const

const navLinkDefinitions = [
  { href: "#inicio", labelKey: "home" },
  { href: "#projetos", labelKey: "projects" },
  { href: "#habilidades", labelKey: "skills" },
  { href: "#experiencia", labelKey: "experience" },
  { href: "#contato", labelKey: "contact" },
] as const

export default function Navbar() {
  const { accent, setAccent } = useTheme()
  const { messages } = useLanguage()
  const copy = messages.nav
  const navLinks = navLinkDefinitions.map((link) => ({
    href: link.href,
    label: copy[link.labelKey],
  }))
  const [scrolled, setScrolled] = useState(false)

  const [accentOpen, setAccentOpen] = useState(false)

  const [menuOpen, setMenuOpen] = useState(false)

  const [activeSection, setActiveSection] = useState("inicio")

  const menuTriggerRef = useRef<HTMLButtonElement>(null)

  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null)

  const accentTriggerRef = useRef<HTMLButtonElement>(null)

  const accentPanelRef = useRef<HTMLDivElement>(null)

  const location = useLocation()

  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)

    onScroll()

    window.addEventListener("scroll", onScroll, { passive: true })

    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Scroll-spy: track which section is in view

  useEffect(() => {
    if (location.pathname !== "/") return

    const ids = ["inicio", "projetos", "habilidades", "experiencia", "contato"]

    const update = () => {
      const offset = 120

      let current = "inicio"

      for (const id of ids) {
        const el = document.getElementById(id)

        if (el) {
          const top = el.getBoundingClientRect().top

          if (top - offset <= 0) current = id
        }
      }

      setActiveSection(current)
    }

    window.addEventListener("scroll", update, { passive: true })

    update()

    return () => window.removeEventListener("scroll", update)
  }, [location.pathname])

  useEffect(() => {
    setMenuOpen(false)

    setAccentOpen(false)
  }, [location])

  useEffect(() => {
    if (menuOpen) firstMenuLinkRef.current?.focus()
  }, [menuOpen])

  useEffect(() => {
    if (accentOpen)
      accentPanelRef.current
        ?.querySelector<HTMLButtonElement>("button[aria-pressed='true']")
        ?.focus()
  }, [accentOpen])

  useEffect(() => {
    if (!menuOpen && !accentOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return

      event.preventDefault()

      if (accentOpen) {
        setAccentOpen(false)

        accentTriggerRef.current?.focus()
      } else {
        setMenuOpen(false)

        menuTriggerRef.current?.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)

    return () => document.removeEventListener("keydown", onKeyDown)
  }, [menuOpen, accentOpen])

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1280px)")

    const closePanels = () => {
      setMenuOpen(false)

      setAccentOpen(false)
    }

    desktop.addEventListener("change", closePanels)

    return () => desktop.removeEventListener("change", closePanels)
  }, [])

  // Routes mount before the next frame, so hash scrolling runs after ScrollToTop.

  useEffect(() => {
    if (
      location.pathname !== "/" ||
      !navLinks.some((link) => link.href === location.hash)
    )
      return

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [location.pathname, location.hash, location.key])

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
      return

    e.preventDefault()

    setMenuOpen(false)

    navigate(`/${href}`)
  }

  return (
    <>
      <nav
        aria-label={copy.mainLabel}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(8,9,12,0.88)" : "transparent",

          backdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",

          borderBottom: scrolled
            ? "1px solid var(--border)"
            : "1px solid transparent",
        }}
      >
        <div className="w-wide h-16 grid grid-cols-[auto_1fr_auto] items-center gap-4 xl:gap-6">
          {/* Logo */}
          <Link
            to="/"
            className="flex min-h-11 min-w-11 items-center gap-2.5 group flex-shrink-0"
            aria-label={copy.home}
          >
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 group-hover:scale-110"
              style={{
                background: "var(--accent)",
                color: "#fff",
                boxShadow: "0 0 12px var(--accent-glow)",
              }}
            >
              A
            </span>
            <span
              className="text-sm font-semibold tracking-wide hidden sm:block"
              style={{ color: "var(--text-primary)" }}
            >
              Ariel Rabelo
            </span>
          </Link>

          {/* Desktop nav links — individual pills */}
          <div className="hidden xl:flex items-center justify-center gap-2">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "")

              const isActive = location.pathname === "/" && activeSection === id

              return (
                <a
                  key={link.href}
                  href={`/${link.href}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-current={isActive ? "location" : undefined}
                  className="min-h-11 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap"
                  style={{
                    padding: "10px 16px",

                    color: isActive
                      ? "var(--text-primary)"
                      : "var(--text-secondary)",

                    background: isActive ? "var(--surface-el)" : "transparent",

                    border: "1px solid",

                    borderColor: isActive ? "var(--border)" : "transparent",

                    boxShadow: isActive ? "0 1px 6px rgba(0,0,0,0.3)" : "none",
                  }}
                >
                  {link.label}
                </a>
              )
            })}
          </div>

          {/* Right actions */}
          <div className="hidden xl:flex items-center gap-2 flex-shrink-0">
            <a
              href="https://www.linkedin.com/in/ariel-asafedev"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-11 inline-flex items-center px-2 rounded-full text-xs font-medium underline-anim transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com/Darkzin41"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-11 inline-flex items-center px-2 rounded-full text-xs font-medium underline-anim transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              GitHub ↗
            </a>

            <LanguageSelector />

            {/* Accent toggle */}
            <div className="relative">
              <button
                ref={accentTriggerRef}
                onClick={() => setAccentOpen((o) => !o)}
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-[1.02] active:scale-95"
                style={{
                  background: "var(--surface-el)",
                  border: "1px solid var(--border)",
                }}
                aria-label={copy.chooseAccent}
                aria-expanded={accentOpen}
                aria-controls="accent-options"
              >
                <span
                  className="w-3.5 h-3.5 rounded-full block"
                  style={{
                    background: "var(--accent)",
                    boxShadow: "0 0 8px var(--accent-glow)",
                  }}
                />
              </button>
              {accentOpen && (
                <div
                  id="accent-options"
                  ref={accentPanelRef}
                  className="absolute right-0 top-13 p-3 rounded-xl flex flex-col gap-1 w-48 z-50"
                  style={{
                    background: "var(--surface-el)",
                    border: "1px solid var(--border)",
                    boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
                  }}
                >
                  <p
                    className="text-[10px] uppercase tracking-widest mb-1"
                    style={{
                      color: "var(--text-secondary)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {copy.accentTitle}
                  </p>
                  {accentOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setAccent(opt.id)
                        setAccentOpen(false)
                        accentTriggerRef.current?.focus()
                      }}
                      aria-pressed={accent === opt.id}
                      className="min-h-11 flex items-center gap-2.5 px-2 py-1.5 rounded-lg transition-all text-left hover:bg-white/5"
                    >
                      <span
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ background: opt.color }}
                      />
                      <span
                        className="text-xs font-medium"
                        style={{
                          color:
                            accent === opt.id
                              ? "var(--text-primary)"
                              : "var(--text-secondary)",
                        }}
                      >
                        {copy[opt.labelKey]}
                      </span>
                      {accent === opt.id && (
                        <svg
                          className="ml-auto"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile actions */}
          <div className="xl:hidden col-start-3 flex items-center gap-2">
            <LanguageSelector />
            <button
              ref={menuTriggerRef}
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{
                background: "var(--surface-el)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? copy.closeMenu : copy.openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              {menuOpen ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            id="mobile-navigation"
            className="xl:hidden max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t"
            style={{
              background: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            <div className="w-wide py-4 flex flex-col gap-1">
              {navLinks.map((link, index) => {
                const id = link.href.replace("#", "")

                const isActive =
                  location.pathname === "/" && activeSection === id

                return (
                  <a
                    key={link.href}
                    ref={index === 0 ? firstMenuLinkRef : undefined}
                    href={`/${link.href}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                    aria-current={isActive ? "location" : undefined}
                    className="min-h-11 flex items-center px-3 py-2.5 rounded-lg text-sm font-medium"
                    style={{
                      color: isActive
                        ? "var(--text-primary)"
                        : "var(--text-secondary)",

                      background: isActive
                        ? "var(--surface-el)"
                        : "transparent",
                    }}
                  >
                    {link.label}
                  </a>
                )
              })}
              <div
                className="border-t my-2"
                style={{ borderColor: "var(--border)" }}
              />
              <a
                href="https://www.linkedin.com/in/ariel-asafedev"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="min-h-11 flex items-center px-3 py-2.5 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                LinkedIn ↗
              </a>
              <a
                href="https://github.com/Darkzin41"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="min-h-11 flex items-center px-3 py-2.5 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                GitHub ↗
              </a>
              <div className="flex flex-wrap items-center gap-2 px-3 pt-2">
                {accentOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setAccent(opt.id)}
                    className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-[1.02]"
                    style={{
                      background: "var(--surface-el)",
                      border:
                        accent === opt.id
                          ? `2px solid ${opt.color}`
                          : "1px solid var(--border)",
                    }}
                    aria-label={copy[opt.labelKey]}
                    aria-pressed={accent === opt.id}
                  >
                    <span
                      className="w-5 h-5 rounded-full"
                      style={{ background: opt.color }}
                      aria-hidden
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
