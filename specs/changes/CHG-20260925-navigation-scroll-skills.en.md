---
id: CHG-20260925-navigation-scroll-skills
status: verified
date: 2026-09-25
affected_capabilities: core
---

# Direction-aware navigation and Skills adjustment

[Português](CHG-20260925-navigation-scroll-skills.md) | [English](CHG-20260925-navigation-scroll-skills.en.md)

## Problem and context

The Navbar kept Home selected outside its corresponding section, the Projects link targeted a home-page anchor, and new pages could inherit the previous scroll position. The Skills carousel also needed to replace Next.js and Power BI with PostgreSQL without rewriting detailed stack data or project facts.

## Expected outcome

Deliver a Navbar that hides while moving down, returns while moving up, and correctly communicates the active section or page. Projects must open `/projects` at the top, and the summarized home carousel must reflect only the requested technology change.

## Scope

- Scroll direction, stable threshold, and a pinned bar while menus are open.
- Active state by home section and by route on Projects, details, and Stack.
- Direct `/projects` destination and pre-paint scroll reset on pathname changes.
- Scroll-root and visual-progress normalization.
- PostgreSQL in the home Skills carousel, removing Next.js and Power BI only from that set.

## Out of scope

- Redesign, new routes, or changes to slugs, URLs, projects, or detailed stack data.
- Removing Next.js or Power BI from projects, descriptions, or the `/stack` page.
- Deployment or infrastructure changes.

## Alternatives and decision

The visual pill remains, now driven by a single route and scroll-spy rule. Removing all emphasis would reduce visitor orientation; keeping the old rule would preserve the incorrect state. For scrolling, the document remains the main surface instead of introducing a parallel container.

## Solution and flow

`src/lib/navigation.ts` defines destinations, resolves the active item, and calculates visibility by direction. The Navbar observes effective page scrolling, uses `inicio`, `habilidades`, `experiencia`, and `contato` sections on the home page, and remains pinned while menus are open. `ScrollToTop` disables automatic restoration and forces only pathname changes to the top instantly; hashes remain smooth.

## Affected interfaces and data

- `NavItemId`, `NAV_LINKS`, `resolveActiveNavItem()`, `getNextNavbarScrollState()`, and `resolvePageScrollY()`.
- Optional `LanguageSelector.onOpenChange` callback to keep the Navbar visible while its menu is open.
- `carouselCards` in `src/data/stack.ts`; `stackCategories` and project data remain unchanged.

## Failure handling, security, and compatibility

Movements below eight pixels do not toggle the bar, the top region always keeps it visible, and open panels block hiding. Scroll readings accept `window`, `documentElement`, and `body` for compatibility. The change adds no data input, dependency, network access, or new security risk.

## Test strategy

Six pure tests cover destinations, active-item resolution, threshold/direction, panel locking, and scroll sources. One content test guarantees the carousel-only adjustment. TypeScript, build, audit, and manual desktop/mobile review in PT-BR/English complete the evidence.

## Acceptance criteria

- The Navbar hides while moving down, returns while moving up, and remains visible at the top or with an open menu.
- Emphasis follows the defined sections and routes instead of leaving Home permanently selected.
- Projects opens `/projects`, activates its item, and starts at `scrollY = 0`.
- Skills shows PostgreSQL and does not show Next.js or Power BI in the home carousel.
- Routes, detailed data, languages, keyboard behavior, mobile layout, and console remain intact.

## Living-memory consolidation

Consolidated into `../capabilities/core.en.md`, `../system.en.md`, `../testing.en.md`, `../history.en.md`, and `../../docs/state.en.md`.
