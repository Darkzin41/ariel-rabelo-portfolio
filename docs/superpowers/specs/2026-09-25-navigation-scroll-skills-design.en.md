# Scroll-aware navigation and skills adjustment

[Português](2026-09-25-navigation-scroll-skills-design.md) | [English](2026-09-25-navigation-scroll-skills-design.en.md)

## Context

The Navbar remains visible at all times, Home can stay highlighted outside its section, and Projects points to a home-page anchor instead of `/projects`. When a route opens after the visitor has scrolled through the home page, the previous position can appear before scroll correction. The home Skills block also needs to reflect the current technology selection.

## Expected outcome

- The Navbar remains visible at the top of the page.
- After scrolling begins, the Navbar hides while scrolling down and reappears while scrolling up.
- The Navbar remains visible while the mobile menu, language selector, or accent selector is open.
- The visual pill follows the active section or page.
- Projects navigates directly to `/projects` on desktop and mobile.
- Every pathname change positions the new page at the top before visible paint.
- The home Skills block removes Next.js and Power BI and adds PostgreSQL.
- Project stacks and the detailed `/stack` page remain unchanged by this content adjustment.

## Navigation and active state

Destinations gain explicit semantics:

- Home: `/#inicio`;
- Projects: `/projects`;
- Skills: `/#habilidades`;
- Experience: `/#experiencia`;
- Contact: `/#contato`.

On the home page, scroll-spy selects the active pill among Home, Skills, Experience, and Contact. On `/projects` and `/projects/:slug`, Projects is active. On `/stack`, Skills is active. The change preserves `aria-current` and matching desktop/mobile behavior.

## Navbar visibility

Scroll direction will be calculated by a pure, testable function. A small threshold will ignore minor oscillations. The Navbar:

- remains visible while `scrollY` is near the top;
- hides after a meaningful downward movement;
- reappears after a meaningful upward movement;
- reappears on route changes;
- never hides while a navigation panel is open.

The transition uses only `transform` and retains reduced-motion support through the existing styles.

## Scroll restoration

Route reset moves to `useLayoutEffect`, before paint, and browser history uses manual restoration while the application is mounted. The key is `pathname`; hash-only changes remain controlled by the Navbar and scroll to their matching section.

## Skills

Only `carouselCards`, which powers the home Skills block, changes:

- remove the Next.js card;
- remove the Power BI card;
- add a PostgreSQL card.

PostgreSQL will not be associated with projects, assigned a new technical level, or added to the `/stack` data.

## Tests

- Pure tests for scroll direction, threshold, top state, and visibility locking.
- Tests for destinations and active-item resolution by route/section.
- Carousel-content test confirming PostgreSQL and the absence of Next.js and Power BI.
- TypeScript, existing suite, build, and spec validation.
- Manual desktop/mobile verification: both scroll directions, active item, `/projects` opening at the top, and keyboard navigation.

## Out of scope

- Navbar or carousel redesign.
- Changes to technologies recorded in the six projects.
- Changes to the detailed `/stack` page.
- Deployment in this iteration.
