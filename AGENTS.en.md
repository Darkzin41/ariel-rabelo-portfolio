# ariel-rabelo-portfolio

[Português](AGENTS.md) | [English](AGENTS.en.md)

React + Vite + Tailwind CSS application for Ariel Rabelo's bilingual portfolio.

## Workflow

1. Read `specs/README.md`.
2. Open only the capabilities related to the task.
3. Check `specs/system.md` to confirm what is implemented.
4. Check `specs/testing.md` before changing coverage.
5. Use `docs/state.md` only for local handoff.

A functional change updates the capability; a lasting decision creates or supersedes an ADR; an evidence change updates `testing.md`; a relevant milestone updates `history.md`.

## Canonical structure

- `src/main.tsx`: React entry point and global CSS import;
- `src/App.tsx`: routes and global providers;
- `src/contexts/language.tsx`: locale state, persistence, and document effects;
- `src/i18n/`: types, catalog, and pure locale rules;
- `src/data/`: localized projects and stack;
- `src/index.css`: Tailwind CSS 4, tokens, and global styles;
- `package.json`: scripts and dependencies;
- `vite.config.ts`: React, Tailwind, and the `@` alias.

## Commands

- `npm ci`: reproducible install;
- `npm run dev`: local server;
- `npm run check`: TypeScript, tests, and build;
- `python scripts/validate_specs.py .`: technical documentation.

## Conventions

- Use npm and keep only `package-lock.json`.
- Preserve `/`, `/projects`, `/projects/:slug`, and `/stack`.
- Preserve slugs, proper names, technologies, and URLs when localizing content.
- Translate visible text, assistive text, and metadata in both catalogs.
- Represent statuses and levels with semantic keys; translate only in the presentation layer.
- Keep `pt-BR` as the fallback and `ariel-rabelo.locale` as the persistence key.
- Use double quotes for strings containing apostrophes or escape the apostrophe.
- Close JSX tags, keep braces balanced, and default-export components where applicable.
