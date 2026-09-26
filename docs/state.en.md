# Session state

[Português](state.md) | [English](state.en.md)

## Operational overview

The bilingual personal portfolio lives in the independent `Darkzin41/ariel-rabelo-portfolio` repository. The changes were integrated and synchronized into `main`; the `codex/navbar-scroll-skills` branch and `ariel-rabelo-portfolio-nav-worktree` worktree remain preserved for recovery.

## Current outcome

- Complete interface, assistive content, and metadata in PT-BR and English.
- Ariel Rabelo public identity and Full Stack/Python/PHP/AI positioning.
- Independent codebase, standardized on npm and free of design-tool-specific infrastructure.
- Direction-aware Navbar, synchronized active item, direct `/projects` route, and instant top reset.
- Home Skills carousel with PostgreSQL and without Next.js or Power BI; detailed data preserved.
- Public repository: `Darkzin41/ariel-rabelo-portfolio`.
- Production: `https://ariel-rabelo-portfolio.vercel.app`, published through the GitHub/Vercel integration.
- SPA fallback enabled for direct access and reloads on public routes.

## Verification

TypeScript, 22 tests, build, specs, production audit, completed deployment, and `200` responses for `/`, `/projects`, and `/stack` form the final gate described in `../specs/testing.en.md`.

## Handoff

There is no pending action in this delivery. Preserve the branch and worktree for recovery; the academic repository must not receive this branch.
