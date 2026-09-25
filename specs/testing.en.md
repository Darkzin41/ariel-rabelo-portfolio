# Test strategy and evidence map

[Português](testing.md) | [English](testing.en.md)

**Last verified:** 2026-09-24

## Automated gates

| Command | Evidence |
|---|---|
| `npm run typecheck` | TypeScript contracts |
| `npm test` | Eight language/content tests and five carousel tests |
| `npm run build` | Production bundle without legacy configuration warnings |
| `python scripts/validate_specs.py .` | Technical-memory structure, language pairs, links, and contracts |
| `npm audit --omit=dev` | Production dependency audit |

`npm run check` runs TypeScript, all 13 tests, and the build in sequence.

## Responsibility by layer

| Behavior | Evidence |
|---|---|
| Locale resolution, fallback, and persistence | `src/i18n/core.test.ts` |
| Catalog, project, and specialty integrity | `src/i18n/content.test.ts` |
| Deterministic carousel movement | `src/lib/carouselMotion.test.ts` |
| UI, routes, and data | TypeScript, build, and local browser inspection |
| Responsiveness | Local browser at 375, 1280, and 1920 px, with no horizontal overflow |
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
- Browser console remained free of errors and warnings during review.

## Gaps

There is no persisted E2E suite. Real touch gestures and visibility events depend on a browser or device; the code uses Pointer Events, `visibilitychange`, and `touch-action: pan-y`, while automated tests cover the related deterministic rules.
