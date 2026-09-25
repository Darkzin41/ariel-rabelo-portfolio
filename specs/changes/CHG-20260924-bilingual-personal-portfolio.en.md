---
id: CHG-20260924-bilingual-personal-portfolio
status: verified
date: 2026-09-24
affected_capabilities: core
---

# Independent bilingual personal portfolio

[Português](CHG-20260924-bilingual-personal-portfolio.md) | [English](CHG-20260924-bilingual-personal-portfolio.en.md)

## Problem and context

The previous portfolio depended on an external design scaffold and mixed Portuguese and English content. The new version must be a personal, independent codebase suitable for Brazilian and international visitors.

## Expected outcome

Deliver the same visual portfolio under Ariel Rabelo's public identity, with a persistent Brazilian Portuguese/English selector and professional positioning centered on Full Stack development, Python, PHP, and artificial intelligence.

## Scope

- Typed internationalization for visible content, assistive content, and metadata.
- An accessible language selector in the upper-right corner on desktop and mobile.
- Technical decoupling from the previous scaffold and removal of historical artifacts with no current authority.
- Bilingual documentation and an explicit licensing and copyright policy.
- Later publication to a public repository with clean history.

## Out of scope

- Visual redesign or changes to routes, slugs, projects, animations, or external integrations.
- Site deployment or hosting.
- Backend, authentication, or personal-data collection.

## Alternatives and decision

A native, typed internationalization layer with no external dependency was selected. `react-i18next` would add unnecessary configuration for two static languages; duplicated pages would increase divergence and maintenance.

## Solution and flow

A language provider manages `pt-BR | en`, defaults to Portuguese, safely reads and writes the local preference, and updates the document language and metadata. Components consume typed catalogs, while structured data keeps stable identifiers and localizes only language-dependent content.

## Affected interfaces and data

- `Locale`, `LanguageContextValue`, and `useLanguage()`.
- Localized profile, interface, project, and stack content.
- Semantic skill levels, including `specialty`, translated at presentation time.
- Persisted key `ariel-rabelo.locale`.

## Failure handling, security, and compatibility

Unknown locale values and `localStorage` failures fall back to `pt-BR`. React continues to escape static content; no arbitrary HTML rendering will be introduced. Routes, slugs, external links, and accent preferences remain compatible.

## Test strategy

Pure tests cover locale resolution, fallback, persistence, and the integrity of both catalogs and all six projects. Build, TypeScript, carousel tests, dependency audit, and responsive manual review complete the evidence.

## Acceptance criteria

- All visible and assistive interface content switches between Portuguese and English without navigation.
- The preference survives reloads and the document exposes matching language and metadata.
- Python, PHP, and AI are presented as specialties; membership in Universidade Ceuma's AI Academic League appears without an invented role or date.
- The build no longer depends on external design infrastructure or emits the previous Vite loader warnings.
- The original academic version remains untouched.

## Living-memory consolidation

Consolidated into `../capabilities/core.en.md`, `../system.en.md`, `../testing.en.md`, `../history.en.md`, and `../../docs/state.en.md`.
