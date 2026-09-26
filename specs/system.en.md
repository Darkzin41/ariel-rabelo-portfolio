# Implemented system

[Português](system.md) | [English](system.en.md)

**Last verified:** 2026-09-25

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

## Navigation and scrolling

`src/lib/navigation.ts` centralizes destinations, active-item resolution, and the deterministic Navbar direction rule. On the home page, scroll-spy follows Home, Skills, Experience, and Contact; `/projects` and its detail routes activate Projects, while `/stack` activates Skills. The Navbar observes document scrolling, hides while moving down, returns while moving up, and stays visible while an interactive menu is in use.

`ScrollToTop` disables automatic history restoration and resets pathname changes before paint without interfering with smooth hash navigation. The root uses minimum height and `overflow-x: clip`, keeping the document as the scrolling surface and preventing a route from inheriting the previous route's position.

## Internationalization and metadata

`Locale` accepts only `pt-BR | en`. `LanguageProvider` initializes from a valid `localStorage` preference, falls back to Portuguese, and writes to `ariel-rabelo.locale`. Changes update `html[lang]`, title, description, Open Graph, and Twitter metadata. `useLanguage()` exposes locale, messages, and language changes to components.

## State, persistence, and integrations

There is no backend. Language and accent color are the only browser-persisted preferences. External links point to GitHub, LinkedIn, and email; the application requires no secret or token to run. The GitHub repository is externally integrated with Vercel, which publishes the `main` branch to production.

## Constraints

- Content is static and must be updated in both languages.
- Routes share the same slugs in Portuguese and English.
- Metadata is updated on the client; static rendering and SSR are outside the current architecture.
- `vercel.json` rewrites public route requests to `index.html`, allowing direct access to React Router routes; credentials and project linkage remain outside the repository.
- The summarized Skills carousel and detailed stack page are independent sets; the home page shows PostgreSQL instead of Next.js and Power BI without rewriting detailed facts.
