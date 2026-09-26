---
id: CHG-20260925-vercel-production
status: verified
date: 2026-09-25
affected_capabilities: core
---

# GitHub publication and Vercel production

[Português](CHG-20260925-vercel-production.md) | [English](CHG-20260925-vercel-production.en.md)

## Problem and context

The local `main` contains the approved portfolio version, while the remote still points to the initial revision. The existing GitHub/Vercel integration only publishes the remote, and without an SPA fallback, direct requests to `/projects` and `/stack` return `404` even though the home page works.

## Expected outcome

Publish the approved revision to `origin/main`, deliver the same commit to production, and make every public route respond correctly on direct access and reload.

## Scope

- Synchronize the personal repository's `main` branch with GitHub.
- Production deployment through the existing GitHub/Vercel integration.
- SPA fallback for React Router routes.
- Automated configuration evidence and post-deployment HTTP verification.

## Out of scope

- Changing the account, team, custom domain, or provider.
- Adding credentials, tokens, or private identifiers to Git.
- Redesigning or changing portfolio content, routes, or data.

## Alternatives and decision

The existing automatic GitHub/Vercel integration remains in use instead of introducing local CLI authentication. Route requests are rewritten to `index.html`, preserving `BrowserRouter` and readable URLs; moving to hash routing would change public URLs unnecessarily.

## Solution and flow

A push to `main` triggers the Vite build on Vercel. `vercel.json` rewrites every public route to `index.html`, and React Router then resolves `/`, `/projects`, `/projects/:slug`, and `/stack` on the client. If the build fails, the previous production deployment remains active.

## Affected interfaces and data

- `vercel.json`: hosting-edge routing contract.
- `src/lib/deployment.test.ts`: fallback-configuration regression test.
- `package.json`: includes the deployment test in the standard gate.
- No React interface, project data, or browser persistence changes.

## Failure handling, security, and compatibility

Credentials and project linkage remain in the external integration and are not versioned. The fallback returns the SPA shell for public routes while generated assets continue to be served normally. Deployment status and the published revision are checked through the GitHub/Vercel APIs before completion is declared.

## Test strategy

Run `npm run check`, `npm run specs:check`, `npm audit --omit=dev`, and `git diff --check` before pushing. After deployment, confirm the deployment commit and `200` responses for `/`, `/projects`, and `/stack`.

## Acceptance criteria

- `origin/main` points to the locally approved commit.
- The Vercel production deployment succeeds for the same commit.
- `/`, `/projects`, and `/stack` return `200` on the public domain.
- TypeScript, tests, build, spec validation, and the production dependency audit pass before publication.

## Living-memory consolidation

The decision is consolidated into `../capabilities/core.en.md`, `../system.en.md`, `../testing.en.md`, and `../open-decisions.en.md`. The milestone and handoff are updated after production verification.
