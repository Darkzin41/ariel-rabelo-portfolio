# Scroll-aware navigation and skills implementation plan

[Português](2026-09-25-navigation-scroll-skills.md) | [English](2026-09-25-navigation-scroll-skills.en.md)

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development (recommended) or executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix Navbar navigation, scroll restoration, and active state while updating only the home Skills carousel.

**Architecture:** Pure navigation rules live in `src/lib/navigation.ts` so they can be tested without a DOM. The Navbar consumes these rules and receives the language selector's open state; `App.tsx` restores routes before paint. Detailed stack data remains intact and only `carouselCards` changes.

**Tech Stack:** React 19, React Router, TypeScript, Node Test Runner, Tailwind CSS 4.

---

### Task 1: Pure navigation rules

**Files:** Create `src/lib/navigation.test.ts` and `src/lib/navigation.ts`; modify `package.json`.

- [ ] Write failing tests for destinations, active-item resolution, scroll threshold, top visibility, and panel locking.
- [ ] Run `node --experimental-strip-types --test src/lib/navigation.test.ts`; expect missing-module failure.
- [ ] Implement `NAV_LINKS`, `resolveActiveNavItem`, and `getNextNavbarState` with a 64 px top zone and 8 px accumulated threshold.
- [ ] Run the focused test and `npm test`; expect PASS.
- [ ] Commit as `test: define portfolio navigation behavior`.

### Task 2: Synchronized scroll-aware Navbar

**Files:** Modify `src/components/Navbar.tsx` and `src/components/LanguageSelector.tsx`.

- [ ] Add `onOpenChange?: (open: boolean) => void` to the language selector.
- [ ] Replace local hash definitions with localized `NAV_LINKS` and `resolveActiveNavItem`.
- [ ] Navigate Projects to `/projects` and keep section destinations as `/#...`.
- [ ] Use `getNextNavbarState` and `translateY(-110%)` to hide down/show up, keeping the Navbar visible while a panel is open.
- [ ] Run TypeScript and tests; expect PASS.
- [ ] Commit as `feat: synchronize scroll-aware navigation`.

### Task 3: Route entry at the top

**Files:** Modify `src/App.tsx`.

- [ ] Set `history.scrollRestoration` to `manual` while mounted.
- [ ] Use `useLayoutEffect` and `window.scrollTo({ top: 0, left: 0, behavior: "auto" })` on pathname changes.
- [ ] Run TypeScript and build; expect PASS without warnings.
- [ ] Commit as `fix: restore routed pages at the top`.

### Task 4: Home Skills content

**Files:** Modify `src/i18n/content.test.ts` and `src/data/stack.ts`.

- [ ] Add a failing test requiring PostgreSQL and excluding Next.js and Power BI from `carouselCards`.
- [ ] Run the focused test; expect assertion failure.
- [ ] Modify only `carouselCards`, adding `{ group: "POSTGRESQL", color: "#4169E1", items: ["PostgreSQL"] }`.
- [ ] Run `npm test`; expect PASS.
- [ ] Commit as `feat: update home skills carousel`.

### Task 5: Technical memory and final validation

**Files:** Update PT/EN capability, system, testing, history, and session-state documents.

- [ ] Record scroll-aware Navbar behavior, destinations, active state, top restoration, Skills content, dates, test count, and handoff.
- [ ] Run `npm run check`, `npm run specs:check`, `npm audit --omit=dev`, and `git diff --check`; expect zero failures and zero vulnerabilities.
- [ ] Verify desktop/mobile, PT-BR/English, both scroll directions, active state, `/projects` at the top, mobile menu, keyboard, and a clean console.
- [ ] Commit as `docs: record navigation and skills behavior`.
