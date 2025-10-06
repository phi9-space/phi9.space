# phi9.space Astro Migration TODO

## Project Setup
- [x] Scaffold Astro project with Tailwind integration and sitemap/rss tooling
- [x] Centralize theme tokens (colors, spacing, typography) in `src/styles/tokens.css`
- [x] Configure global layout with 25vw / 50vw / 25vw responsive grid

## Core Components
- [x] Build `BaseLayout.astro` composing navbar, content shell, footer, shader placeholder
- [x] Implement `Navbar.astro` with Home / Manifesto / Research / Blogs sections
- [x] Create `Footer.astro` and shared utility components (social links, contact CTA)
- [x] Add placeholder `AsciiShader` component for future shader integration

## Content Pipeline
- [x] Configure Astro content collections (`pages`, `blog`) and Markdown frontmatter schema
- [x] Build `MarkdownRenderer.astro` with remark-gfm + code highlighting + quote styling
- [x] Ensure Obsidian-compatible folder structure for markdown + assets
- [x] Implement persistent Human ⇄ AI view toggle storing state (localStorage)

## Blog & Research Features
- [x] Create blog listing with latest feed, tag filters, and SEO-friendly URLs
- [x] Scaffold research section layout pulling from `pages` collection
- [x] Style Markdown typography (headings, lists, callouts, code blocks)

## SEO & Performance
- [x] Migrate meta tags to Astro `SeoHead.astro` component with JSON-LD
- [x] Add sitemap generation, RSS feed, and Open Graph defaults
- [ ] Audit CLS/LCP in Astro build and tune image handling

## Future Enhancements
- [ ] Implement ASCII shader hero effect
- [ ] Expand Human ⇄ AI toggle to expose raw markdown navigation aids
- [ ] Add image optimization pipeline for content-heavy pages
