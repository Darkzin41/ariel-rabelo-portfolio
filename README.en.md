# Ariel Rabelo Portfolio

[Português](README.md) | [English](README.en.md)

The bilingual personal portfolio of **Ariel Rabelo**, a **Full Stack Developer specializing in Python, PHP, and Artificial Intelligence** and a member of Universidade Ceuma's Artificial Intelligence Academic League.

The application brings together professional projects, research, academic experiments, experience, education, and technologies in a responsive editorial interface. The code is an independent React codebase maintained directly in this repository.

## Live site

[Open the production portfolio](https://ariel-rabelo-portfolio.vercel.app).

## Highlights

- Complete interface in Brazilian Portuguese and English;
- Portuguese as the default language, with the preference persisted in `localStorage`;
- Accessible upper-right language selector on desktop and mobile;
- Metadata, visible content, and assistive text updated with the selected language;
- Six projects with filters and individual pages;
- Stack with Python and PHP as specialties and AI as a specialty area;
- Dark theme with four accent colors;
- Canvas-based Saturn hero visual;
- Continuous carousel operated by mouse, touch, or keyboard;
- `prefers-reduced-motion` support and offscreen animation pausing.

## Technologies and architecture

- React 19 and React Router;
- TypeScript 5.7;
- Vite 8;
- Tailwind CSS 4;
- Canvas API;
- Native typed internationalization in `src/contexts/language.tsx` and `src/i18n/`;
- Structured localized content in `src/data/`.

The site has no backend, authentication, or personal-data collection. Language (`ariel-rabelo.locale`) and accent-color preferences are stored only in the browser.

## Running locally

Requirements: Node.js 22 and npm.

```bash
npm ci
npm run dev
```

Vite will print the local address in the terminal.

## Quality and tests

```bash
npm run typecheck
npm test
npm run build
python scripts/validate_specs.py .
npm audit --omit=dev
```

`npm test` runs locale resolution, catalog and localized-data integrity, navigation, deployment configuration, and the carousel's five deterministic tests.

## Main structure

```text
src/
├── components/     # Sections, navigation, and reusable components
│   └── ui/         # Visual primitives
├── contexts/       # Language and accent color
├── data/           # Localized projects and technologies
├── hooks/          # Reusable behavior
├── i18n/           # Types, catalogs, and locale persistence
├── lib/            # Carousel rules and tests
├── pages/          # Home, projects, details, and stack
├── App.tsx         # Routes and global providers
├── index.css       # Tailwind, tokens, and global styles
└── main.tsx        # Application entry point
```

## Routes

| Route | Content |
|---|---|
| `/` | Home page |
| `/projects` | List and filters for all six projects |
| `/projects/:slug` | Project details |
| `/stack` | Technologies and experience levels |

Slugs and URLs remain identical in both languages.

## Accessibility

- Keyboard navigation and visible focus;
- Language and mobile menus with `Escape` and focus restoration;
- ARIA states for menus, filters, and controls;
- Carousel controls for pause, arrow keys, `Home`, and `End`;
- Decorative copies hidden from assistive technologies;
- Reduced motion based on the operating-system preference.

## License and personal content

The source code is available under the [MIT License](LICENSE). Text, visual identity, project information, and personal images remain reserved to Ariel Rabelo as described in the [NOTICE](NOTICE.en.md).

## Contact

- [LinkedIn](https://www.linkedin.com/in/ariel-asafedev)
- [GitHub](https://github.com/Darkzin41)
- Email: `arielasafe09@gmail.com`

Built by **Ariel Rabelo**.
