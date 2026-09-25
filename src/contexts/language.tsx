import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import {
  DEFAULT_LOCALE,
  readStoredLocale,
  writeStoredLocale,
  type Locale,
  type StorageLike,
} from "../i18n/core"
import { catalogs, type AppMessages } from "../i18n/messages"

export interface LanguageContextValue {
  locale: Locale
  messages: AppMessages
  setLocale(locale: Locale): void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function updateMeta(selector: string, content: string): void {
  document
    .querySelector<HTMLMetaElement>(selector)
    ?.setAttribute("content", content)
}

function getBrowserStorage(): StorageLike | undefined {
  if (typeof window === "undefined") return undefined
  try {
    return window.localStorage
  } catch {
    return undefined
  }
}

function readInitialLocale(): Locale {
  return readStoredLocale(getBrowserStorage())
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(readInitialLocale)
  const messages = catalogs[locale]

  useEffect(() => {
    writeStoredLocale(getBrowserStorage(), locale)
    document.documentElement.lang = locale
    document.title = messages.metadata.title
    updateMeta('meta[name="description"]', messages.metadata.description)
    updateMeta('meta[property="og:title"]', messages.metadata.title)
    updateMeta(
      'meta[property="og:description"]',
      messages.metadata.socialDescription,
    )
    updateMeta('meta[name="twitter:title"]', messages.metadata.title)
    updateMeta(
      'meta[name="twitter:description"]',
      messages.metadata.socialDescription,
    )
  }, [locale, messages])

  const value = useMemo<LanguageContextValue>(
    () => ({ locale, messages, setLocale }),
    [locale, messages],
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const value = useContext(LanguageContext)
  if (!value)
    throw new Error("useLanguage must be used within LanguageProvider")
  return value
}
