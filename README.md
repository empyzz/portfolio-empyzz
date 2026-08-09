# Rafael Gonçalves — Software Engineering Portfolio

A one-page React and TypeScript portfolio focused on backend engineering, automation, connected systems, and applied AI.

## Development

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run build
npm run lint
```

## Architecture

Visible professional content is separated from presentation components:

- `src/content/` contains projects, capabilities, experience, and profile data.
- `src/types/portfolio.ts` defines the project and experience models.
- `src/components/sections/` owns page-level semantic sections.
- `src/components/projects/ProjectCard.tsx` renders compact and expanded case-study content.
- `src/App.css` contains the Atmospheric Neo-Aero visual system and responsive rules.

Project details use native `<details>` elements. This keeps case studies keyboard-accessible and usable without adding dialog state or another dependency.

The animated background is CSS-only, limited to the hero, and disabled through `prefers-reduced-motion`.

## Content integrity

Project statuses and validation notes are explicit. No performance metrics, public repository URLs, or production claims should be added without verification. Edit project information in `src/content/projects.ts` rather than inside UI components.

## Deployment

The current production assumption is GitHub Pages at:

```text
https://empyzz.github.io/Portifolio/
```

The Vite `base`, canonical metadata, sitemap, manifest, and social metadata use that path. Update all of them together if the site moves to a custom domain.

The Portuguese résumé is published as:

```text
Rafael-Silva-Engenharia-de-Software-Curriculo-PT-BR.pdf
```
