import assert from "node:assert/strict"
import test from "node:test"
import {
  NAV_LINKS,
  getNextNavbarScrollState,
  resolveActiveNavItem,
} from "./navigation.ts"

test("navigation destinations keep Projects as a page and the remaining home items as sections", () => {
  assert.deepEqual(
    NAV_LINKS.map(({ id, to }) => ({ id, to })),
    [
      { id: "home", to: "/#inicio" },
      { id: "projects", to: "/projects" },
      { id: "skills", to: "/#habilidades" },
      { id: "experience", to: "/#experiencia" },
      { id: "contact", to: "/#contato" },
    ],
  )
})

test("home sections resolve to their matching navigation item", () => {
  assert.equal(resolveActiveNavItem("/", "inicio"), "home")
  assert.equal(resolveActiveNavItem("/", "habilidades"), "skills")
  assert.equal(resolveActiveNavItem("/", "experiencia"), "experience")
  assert.equal(resolveActiveNavItem("/", "contato"), "contact")
})

test("public pages select Projects or Skills without depending on home scroll position", () => {
  assert.equal(resolveActiveNavItem("/projects", "inicio"), "projects")
  assert.equal(resolveActiveNavItem("/projects/portfolio-pessoal", "inicio"), "projects")
  assert.equal(resolveActiveNavItem("/stack", "inicio"), "skills")
  assert.equal(resolveActiveNavItem("/unknown", "inicio"), null)
})

test("navbar hides after a meaningful downward movement and returns when scrolling up", () => {
  assert.deepEqual(
    getNextNavbarScrollState({ anchorY: 100, currentY: 106, visible: true }),
    { anchorY: 100, visible: true },
  )
  assert.deepEqual(
    getNextNavbarScrollState({ anchorY: 100, currentY: 112, visible: true }),
    { anchorY: 112, visible: false },
  )
  assert.deepEqual(
    getNextNavbarScrollState({ anchorY: 112, currentY: 96, visible: false }),
    { anchorY: 96, visible: true },
  )
})

test("navbar stays visible near the top and while an interactive panel is open", () => {
  assert.deepEqual(
    getNextNavbarScrollState({ anchorY: 120, currentY: 32, visible: false }),
    { anchorY: 32, visible: true },
  )
  assert.deepEqual(
    getNextNavbarScrollState({
      anchorY: 120,
      currentY: 180,
      visible: false,
      locked: true,
    }),
    { anchorY: 180, visible: true },
  )
})
