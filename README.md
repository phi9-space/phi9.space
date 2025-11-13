# phi9.space — Astro rebuild

Content-first rebuild of [phi9.space](https://phi9.space) using [Astro](https://astro.build/), Tailwind, and Markdown collections to support a heavy publishing cadence.

## Key features
- **Layout grid** with 25vw / 50vw / 25vw structure, responsive fallbacks, and persistent Human ⇄ AI view toggle stored in `localStorage`.
- **Content collections** (`pages`, `blog`) with tag support, Markdown styling, code block highlighting, and Obsidian-friendly frontmatter.
- **SEO tooling** including structured data, sitemap generation, RSS feed, and social cards rendered at build time.
- **Component library** for navbar, footer, latest-feed rail, tag filters, and Markdown rendering with dual-mode output.
- **Glass surfaces** standardized via `.glass-panel`, `.glass-tile`, and `.glass-chip` utility classes for reusable frosted UI treatments (dark-mode aware).
- **Future-ready shader slot** exposing an `AsciiShader` component for upcoming WebGL experiments without blocking launch.

## Getting started

```bash
npm install
npm run dev
```

- `npm run dev` – start local development server
- `npm run build` – generate the production build in `dist/`
- `npm run preview` – preview the built site locally
- `npm run lint` – run `astro check` to validate content collections and TypeScript

## Content authoring
- Markdown files live in `src/content/pages` (static sections) and `src/content/blog` (posts).
- Blog posts require `title`, `description`, `pubDate`, and optional `tags`, `updatedDate`, `heroImage` frontmatter.
- Page frontmatter extends Markdown with `heroSubtitle`, `updated`, and `navTitle` fields so navigation copy stays consistent.
- Assets (logos, favicons) remain in `public/`.

### Adding a page (e.g. `research`)
1. Create `src/content/pages/<slug>.md` with frontmatter + Markdown content.
2. Duplicate an existing page template (like `src/pages/research.astro`) or create a new Astro page that imports the entry via `getEntry('pages', '<slug>')`.
3. Update `src/components/Navbar.astro` if the new page should appear in navigation.

### Adding a blog post
1. Create `src/content/blog/<slug>.md` with the required frontmatter and Markdown body.
2. Run `npm run dev` to preview; the post is automatically routed to `/blog/<slug>/`.
3. Add `tags` to control filters in the blog index—keep them simple (e.g. `research`, `updates`).

## Roadmap
Refer to [`TODO.md`](./TODO.md) for outstanding tasks including the ASCII shader rollout and enhanced AI view features.
