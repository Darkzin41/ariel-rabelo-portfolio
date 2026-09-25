export const SUPPORTED_LOCALES = ["pt-BR", "en"] as const

export type Locale = typeof SUPPORTED_LOCALES[number]

export const DEFAULT_LOCALE: Locale = "pt-BR"
export const LOCALE_STORAGE_KEY = "ariel-rabelo.locale"

export interface StorageLike {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
}

export function resolveLocale(value: string | null | undefined): Locale {
  return value === "pt-BR" || value === "en" ? value : DEFAULT_LOCALE
}

export function readStoredLocale(storage?: StorageLike): Locale {
  try {
    return resolveLocale(storage?.getItem(LOCALE_STORAGE_KEY))
  } catch {
    return DEFAULT_LOCALE
  }
}

export function writeStoredLocale(
  storage: StorageLike | undefined,
  locale: Locale,
): void {
  try {
    storage?.setItem(LOCALE_STORAGE_KEY, locale)
  } catch {
    // Language selection remains available for the current session.
  }
}
