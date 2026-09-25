# Implemented system

[Português](system.md) | [English](system.en.md)

**Last verified:** 2026-09-24

**Reference:** `working-tree`

## Purpose and executable unit

The project delivers a bilingual personal portfolio as a React single-page application. `src/main.tsx` mounts `src/App.tsx`, which installs the global providers and browser router. Vite serves and bundles the application without plugins or infrastructure tied to design tools.

## Stack and entry points

- React 19, React DOM, and React Router;
- Vite 8 and TypeScript 5.7;
- Tailwind CSS 4 through the official `@tailwindcss/vite` plugin;
- `src/index.css` for tokens and global styles;
- `src/i18n/messages.ts` for the typed catalog;
- `src/data/projects.ts` and `src/data/stack.ts` for structured localized data.

## Boundaries and flow

- `src/pages/Home.tsx` composes the introduction, projects, stack, experience, education, and contact sections.
- `src/pages/Projects.tsx` filters the six localized projects.
- `src/pages/ProjectDetail.tsx` resolves details through a stable slug.
- `src/pages/Stack.tsx` presents semantic levels and related projects.
- `LanguageProvider` resolves and persists language; `AccentColorProvider` preserves the visual preference.
- Navbar, Hero, featured projects, Saturn, and carousel encapsulate their interactions.

## Internationalization and metadata

`Locale` accepts only `pt-BR | en`. `LanguageProvider` initializes from a valid `localStorage` preference, falls back to Portuguese, and writes to `ariel-rabelo.locale`. Changes update `html[lang]`, title, description, Open Graph, and Twitter metadata. `useLanguage()` exposes locale, messages, and language changes to components.

## State, persistence, and integrations

There is no backend. Language and accent color are the only browser-persisted preferences. External links point to GitHub, LinkedIn, and email; the application requires no secret or token to run.

## Constraints

- Content is static and must be updated in both languages.
- Routes share the same slugs in Portuguese and English.
- Metadata is updated on the client; static rendering and SSR are outside the current architecture.
- Deployment is not configured in this repository.
