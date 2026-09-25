import assert from "node:assert/strict"
import test from "node:test"
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  readStoredLocale,
  resolveLocale,
  writeStoredLocale,
  type Locale,
  type StorageLike,
} from "./core.ts"

function createStorage(
  initial?: string,
): StorageLike & { value: string | null } {
  return {
    value: initial ?? null,
    getItem(key) {
      assert.equal(key, LOCALE_STORAGE_KEY)
      return this.value
    },
    setItem(key, value) {
      assert.equal(key, LOCALE_STORAGE_KEY)
      this.value = value
    },
  }
}

test("Portuguese is the default locale", () => {
  assert.equal(DEFAULT_LOCALE, "pt-BR")
  assert.equal(resolveLocale(null), "pt-BR")
})

test("only supported locale values are accepted", () => {
  assert.equal(resolveLocale("pt-BR"), "pt-BR")
  assert.equal(resolveLocale("en"), "en")
  assert.equal(resolveLocale("en-US"), "pt-BR")
  assert.equal(resolveLocale("javascript:alert(1)"), "pt-BR")
})

test("stored locale is read and written with a stable key", () => {
  const storage = createStorage("en")

  assert.equal(readStoredLocale(storage), "en")
  writeStoredLocale(storage, "pt-BR")
  assert.equal(storage.value, "pt-BR")
})

test("storage failures fall back safely and never escape", () => {
  const unavailableStorage: StorageLike = {
    getItem() {
      throw new Error("storage unavailable")
    },
    setItem() {
      throw new Error("storage unavailable")
    },
  }

  assert.equal(readStoredLocale(unavailableStorage), DEFAULT_LOCALE)
  assert.doesNotThrow(() => writeStoredLocale(unavailableStorage, "en"))
  assert.equal(readStoredLocale(undefined), DEFAULT_LOCALE)
  assert.doesNotThrow(() => writeStoredLocale(undefined, "en"))
})

test("locale remains a closed two-value contract", () => {
  const locales: Locale[] = ["pt-BR", "en"]
  assert.deepEqual(locales.map(resolveLocale), locales)
})
