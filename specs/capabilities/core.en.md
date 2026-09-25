---
id: core
contract_status: confirmed
implementation_status: verified
last_verified: 2026-09-25
last_verified_ref: working-tree
---

# Bilingual personal portfolio

[Português](core.md) | [English](core.en.md)

## Purpose and boundaries

Present Ariel Rabelo's professional identity, projects, stack, experience, education, and contact channels. The central positioning is Full Stack Developer specializing in Python, PHP, and Artificial Intelligence. The application is frontend-only and does not include a backend, authentication, data collection, hosting, or deployment.

## Actors, permissions, inputs, and outcomes

Any visitor can browse, switch between Brazilian Portuguese and English, filter projects, open details, follow external links, choose an accent color, and operate the carousel with mouse, touch, or keyboard. Language and color are browser-local preferences; there are no accounts or personal-data inputs.

## Behavioral contract and acceptance criteria

- `pt-BR` is the default language; `en` is the alternative, persisted in `ariel-rabelo.locale`.
- A globe selector sits in the upper-right corner on desktop and mobile, exposes ARIA states, closes with `Escape`, and restores focus.
- Visible content, assistive content, `html[lang]`, title, description, and social metadata follow the language.
- The Hero, stack, README, and footer emphasize Full Stack, Python, PHP, and AI.
- Recognition includes “Member of the Artificial Intelligence Academic League — Universidade Ceuma” without an invented position or period.
- The theme remains dark with four accent choices.
- Only Agiliza Transparência and Arquivo Digital de História Indígena are featured projects.
- The complete grid keeps six projects and the routes `/`, `/projects`, `/projects/:slug`, and `/stack`.
- The carousel retains mouse, touch, keyboard, pause, and reduced-motion support.
- The Navbar remains visible at the top, hides while scrolling down, and returns while scrolling up; open menus keep it visible.
- Active state follows Home, Skills, Experience, and Contact sections on the home page, Projects on `/projects` and detail routes, and Skills on `/stack`.
- “Projects” opens `/projects` directly, and every pathname change positions the new page at the top before paint.
- The home Skills carousel contains PostgreSQL and excludes Next.js and Power BI.

## Invariants and business rules

- Slugs, URLs, proper names, technologies, and facts for all six projects remain stable in both languages.
- Statuses, classifications, and technical levels are semantic keys translated only in the presentation layer.
- Python and PHP use the `specialty` level; AI is a specialty category without artificially promoting every AI tool.
- Scikit-learn remains `exploring`, with no project association.
- The carousel advances at 27 px/s and preserves the remainder when normalizing in both directions.
- Invalid locale values or unavailable storage safely fall back to `pt-BR`.
- The PostgreSQL replacement is limited to the home Skills carousel; detailed stack data and project facts remain unchanged.

## Current state and gaps

The contract is implemented and locally verified. There is no persisted E2E suite; UI interactions and breakpoints are checked manually. Code publication and site deployment are separate operations, and deployment is outside this delivery.

## Implementation and test evidence

- Language and metadata: `src/contexts/language.tsx`, `src/components/LanguageSelector.tsx`, and `src/i18n/`.
- Localized data: `src/data/projects.ts` and `src/data/stack.ts`.
- Navigation and scrolling: `src/lib/navigation.ts`, `src/components/Navbar.tsx`, `src/App.tsx`, and `src/index.css`.
- Reproducible gates: `npm run check` and `python scripts/validate_specs.py .`.
- Audit: `npm audit --omit=dev`.
- Manual validation: all routes in both languages, persistence after reload, keyboard menus, and breakpoints from 375 to 1920 px.

## Relationships

- Related specification: `../changes/CHG-20260924-bilingual-personal-portfolio.en.md`.
- Related specification: `../changes/CHG-20260925-navigation-scroll-skills.en.md`.
- Open decisions: `../open-decisions.en.md`.
- Related ADR: none.
