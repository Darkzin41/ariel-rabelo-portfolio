import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react"
import { SUPPORTED_LOCALES, type Locale } from "../i18n/core"
import { useLanguage } from "../contexts/language"

export default function LanguageSelector() {
  const { locale, messages, setLocale } = useLanguage()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  useEffect(() => {
    if (!open) return

    menuRef.current
      ?.querySelector<HTMLButtonElement>(`button[data-locale="${locale}"]`)
      ?.focus()

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      event.preventDefault()
      setOpen(false)
      triggerRef.current?.focus()
    }

    document.addEventListener("mousedown", closeOnOutsideClick)
    document.addEventListener("keydown", closeOnEscape)
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick)
      document.removeEventListener("keydown", closeOnEscape)
    }
  }, [locale, open])

  const localeLabels: Record<Locale, string> = {
    "pt-BR": messages.language.portuguese,
    en: messages.language.english,
  }

  const chooseLocale = (nextLocale: Locale) => {
    setLocale(nextLocale)
    setOpen(false)
    window.requestAnimationFrame(() => triggerRef.current?.focus())
  }

  const focusOption = (index: number) => {
    menuRef.current
      ?.querySelectorAll<HTMLButtonElement>("button[data-locale]")
      .item(index)
      .focus()
  }

  const handleOptionKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault()
      const offset = event.key === "ArrowDown" ? 1 : -1
      focusOption(
        (index + offset + SUPPORTED_LOCALES.length) %
          SUPPORTED_LOCALES.length,
      )
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault()
      focusOption(event.key === "Home" ? 0 : SUPPORTED_LOCALES.length - 1)
    }
  }

  return (
    <div ref={rootRef} className="relative flex-shrink-0">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return
          event.preventDefault()
          setOpen(true)
        }}
        className="min-h-11 inline-flex items-center gap-2 rounded-full px-3 text-xs font-semibold transition-all hover:scale-[1.02] active:scale-95"
        style={{
          background: "var(--surface-el)",
          border: "1px solid var(--border)",
          color: "var(--text-primary)",
        }}
        aria-label={`${messages.language.buttonLabel}: ${localeLabels[locale]}`}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.4 2.5 3.6 5.5 3.6 9S14.4 18.5 12 21M12 3C9.6 5.5 8.4 8.5 8.4 12s1.2 6.5 3.6 9" />
        </svg>
        <span>{locale === "pt-BR" ? "PT-BR" : "EN"}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          id={menuId}
          ref={menuRef}
          role="menu"
          aria-label={messages.language.menuLabel}
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-52 rounded-xl p-2"
          style={{
            background: "var(--surface-el)",
            border: "1px solid var(--border)",
            boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
          }}
        >
          {SUPPORTED_LOCALES.map((option, index) => (
            <button
              key={option}
              type="button"
              role="menuitemradio"
              data-locale={option}
              aria-checked={locale === option}
              onClick={() => chooseLocale(option)}
              onKeyDown={(event) => handleOptionKeyDown(event, index)}
              className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-left text-sm transition-colors hover:bg-white/5"
              style={{
                color:
                  locale === option
                    ? "var(--text-primary)"
                    : "var(--text-secondary)",
              }}
            >
              <span
                className="w-9 font-mono text-[10px] uppercase"
                style={{ color: "var(--accent)" }}
              >
                {option === "pt-BR" ? "PT" : "EN"}
              </span>
              <span>{localeLabels[option]}</span>
              {locale === option && (
                <svg
                  className="ml-auto"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
