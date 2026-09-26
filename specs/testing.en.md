# Test strategy and evidence map

[Português](testing.md) | [English](testing.en.md)

**Last verified:** 2026-09-25

## Automated gates

| Command | Evidence |
|---|---|
| `npm run typecheck` | TypeScript contracts |
| `npm test` | Ten language/content tests, five carousel tests, six navigation tests, and one deployment-configuration test |
| `npm run build` | Production bundle without legacy configuration warnings |
| `python scripts/validate_specs.py .` | Technical-memory structure, language pairs, links, and contracts |
| `npm audit --omit=dev` | Production dependency audit |

`npm run check` runs TypeScript, all 22 tests, and the build in sequence.

## Responsibility by layer

| Behavior | Evidence |
|---|---|
| Locale resolution, fallback, and persistence | `src/i18n/core.test.ts` |
| Catalog, project, and specialty integrity | `src/i18n/content.test.ts` |
| Deterministic carousel movement | `src/lib/carouselMotion.test.ts` |
| Destinations, active item, Navbar direction, and scroll sources | `src/lib/navigation.test.ts` |
| Vercel public-route fallback | `src/lib/deployment.test.ts` |
| UI, routes, and data | TypeScript, build, and local browser inspection |
| Responsiveness | Local browser at 375, 1440, and 1920 px, with no horizontal overflow |
| Interactive accessibility | Menus, ARIA, `Escape`, focus restoration, filters, and carousel controls |
| Metadata | `html[lang]`, title, description, and Open Graph inspected in both languages |

## Capability map

| Capability | Files or globs | Status |
|---|---|---|
| `core` | `src/**/*`, `src/**/*.test.ts` | Implemented and locally verified |

## Recorded manual validation

- Home, projects, project detail, and stack checked in Portuguese and English.
- Language preference confirmed after reload.
- Language selector and mobile menu checked with mouse and keyboard; `Escape` restores focus.
- Accent color and existing routes preserved.
- Navbar checked at 1440 px: it hides while moving down, returns while moving up, synchronizes its active item, and remains visible with open menus.
- “Projects” confirmed at `/projects`, entering immediately at the top even when navigation starts midway through the home page.
- Skills carousel confirmed with PostgreSQL and without Next.js or Power BI; detailed data remains unchanged.
- Mobile menu checked at 375 px, including the Projects destination, English, `Escape`, and focus restoration.
- Browser console remained free of errors and warnings during review.

## Gaps

There is no persisted E2E suite. Real touch gestures and visibility events depend on a browser or device; the code uses Pointer Events, `visibilitychange`, and `touch-action: pan-y`, while automated tests cover the related deterministic rules.
