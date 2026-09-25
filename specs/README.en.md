# Project technical memory

[Português](README.md) | [English](README.en.md)

This directory records the contract required to understand and modify the bilingual portfolio.

## Reading order

1. Read this index.
2. Open `capabilities/core.en.md` for the portfolio contract.
3. Check `system.en.md` for the implemented architecture.
4. Check `testing.en.md` before changing validation.
5. Read `open-decisions.en.md` and the related change specification when a task touches a pending decision.
6. Use `../docs/state.en.md` only for local handoff.

## Authority

| Document | Authority |
|---|---|
| `capabilities/*.md` | Contract and delivery status |
| `system.md` | Architecture actually implemented |
| `testing.md` | Validation strategy and evidence map |
| `open-decisions.md` | Questions that must not be invented |
| `changes/*.md` | Scope and acceptance criteria for complex changes |
| `history.md` | Milestones; Git preserves details |

## Task routing

| Topic | Read |
|---|---|
| Home, projects, stack, language, and navigation | `capabilities/core.en.md` |
| Architecture, routes, state, or persistence | `system.en.md` |
| Tests, accessibility, and responsiveness | `testing.en.md` |
| Internationalization and decoupling | `changes/CHG-20260924-bilingual-personal-portfolio.en.md` |

## Maintenance

- Every substantive document has Portuguese at its canonical path and English in `*.en.md`.
- A functional change updates the capability.
- An evidence change updates `testing.md`.
- A lasting decision creates or supersedes an ADR.
- A relevant milestone updates `history.md`.
