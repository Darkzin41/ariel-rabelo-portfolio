import assert from "node:assert/strict"
import test from "node:test"
import { allProjects, getLocalizedProjects } from "../data/projects.ts"
import {
  carouselCards,
  getLocalizedStackCategories,
} from "../data/stack.ts"
import { catalogs } from "./messages.ts"
import { SUPPORTED_LOCALES, type Locale } from "./core.ts"

function assertNoEmptyStrings(value: unknown, path = "catalog"): void {
  if (typeof value === "string") {
    assert.ok(value.trim().length > 0, `${path} must not be empty`)
    return
  }

  if (Array.isArray(value)) {
    value.forEach((entry, index) =>
      assertNoEmptyStrings(entry, `${path}[${index}]`),
    )
    return
  }

  if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, entry]) =>
      assertNoEmptyStrings(entry, `${path}.${key}`),
    )
  }
}

function objectShape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(objectShape)
  if (!value || typeof value !== "object") return typeof value

  return Object.fromEntries(
    Object.entries(value)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, entry]) => [key, objectShape(entry)]),
  )
}

test("Portuguese and English catalogs have the same complete shape", () => {
  assert.deepEqual(objectShape(catalogs.en), objectShape(catalogs["pt-BR"]))
  SUPPORTED_LOCALES.forEach((locale) =>
    assertNoEmptyStrings(catalogs[locale], locale),
  )
})

test("all six projects keep stable identifiers in both locales", () => {
  const expectedSlugs = allProjects.map((project) => project.slug)
  assert.equal(expectedSlugs.length, 6)

  SUPPORTED_LOCALES.forEach((locale: Locale) => {
    const localized = getLocalizedProjects(locale)
    assert.deepEqual(
      localized.map((project) => project.slug),
      expectedSlugs,
    )
    localized.forEach((project) => {
      assertNoEmptyStrings(project.title, `${locale}.${project.slug}.title`)
      assertNoEmptyStrings(
        project.shortDescription,
        `${locale}.${project.slug}.shortDescription`,
      )
      assertNoEmptyStrings(
        project.longDescription,
        `${locale}.${project.slug}.longDescription`,
      )
      assertNoEmptyStrings(project.context, `${locale}.${project.slug}.context`)
      assertNoEmptyStrings(
        project.challenge,
        `${locale}.${project.slug}.challenge`,
      )
      assertNoEmptyStrings(project.myRole, `${locale}.${project.slug}.myRole`)
      assertNoEmptyStrings(project.impact, `${locale}.${project.slug}.impact`)
      assertNoEmptyStrings(
        project.learnings,
        `${locale}.${project.slug}.learnings`,
      )
    })
  })
})

test("Python, PHP, and AI are modeled as specialties without inflating every AI tool", () => {
  SUPPORTED_LOCALES.forEach((locale: Locale) => {
    const categories = getLocalizedStackCategories(locale)
    const backend = categories.find((category) => category.id === "backend")
    const ai = categories.find((category) => category.id === "ai")

    assert.equal(
      backend?.items.find((item) => item.name === "Python")?.level,
      "specialty",
    )
    assert.equal(
      backend?.items.find((item) => item.name === "PHP")?.level,
      "specialty",
    )
    assert.equal(ai?.specialty, true)
    assert.equal(
      ai?.items.every((item) => item.level === "specialty"),
      false,
    )
  })
})

test("the home Skills carousel replaces Next.js and Power BI with PostgreSQL only there", () => {
  const carouselSkills = carouselCards.flatMap((card) => card.items)

  assert.equal(carouselSkills.includes("Next.js"), false)
  assert.equal(carouselSkills.includes("Power BI"), false)
  assert.equal(carouselSkills.includes("PostgreSQL"), true)

  const detailedStack = getLocalizedStackCategories("pt-BR").flatMap(
    (category) => category.items.map((item) => item.name),
  )

  assert.equal(detailedStack.includes("Next.js"), true)
  assert.equal(detailedStack.includes("Power BI"), true)
  assert.equal(detailedStack.includes("PostgreSQL"), false)
})
