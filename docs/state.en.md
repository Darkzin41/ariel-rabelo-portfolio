# Session state

[Português](state.md) | [English](state.en.md)

## Operational overview

The bilingual personal portfolio lives in the independent `Darkzin41/ariel-rabelo-portfolio` repository. The current fixes are isolated on `codex/navbar-scroll-skills` in the `ariel-rabelo-portfolio-nav-worktree` worktree; `main` remains untouched until integration.

## Current outcome

- Complete interface, assistive content, and metadata in PT-BR and English.
- Ariel Rabelo public identity and Full Stack/Python/PHP/AI positioning.
- Independent codebase, standardized on npm and free of design-tool-specific infrastructure.
- Direction-aware Navbar, synchronized active item, direct `/projects` route, and instant top reset.
- Home Skills carousel with PostgreSQL and without Next.js or Power BI; detailed data preserved.
- Public repository: `Darkzin41/ariel-rabelo-portfolio`.
- No deployment planned in this iteration.

## Verification

TypeScript, 20 tests, build, specs, production audit, manual responsive review, and a clean console form the final gate described in `../specs/testing.en.md`.

## Handoff

Integrate only into the personal repository after the final gate. Preserve the branch and worktree through synchronization; the academic repository must not receive this branch.
