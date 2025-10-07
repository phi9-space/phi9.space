---
title: Crafting a Content-Heavy Astro Stack
description: How we moved phi9.space to Astro to unlock a content-first publishing workflow with Markdown, tagging, and persistent view toggles.
pubDate: 2024-05-20
updatedDate: 2024-05-20
tags:
  - updates
# heroImage: /PHI9.SPACE.svg
---
Migrating to Astro let us keep the expressive layout from the original phi9.space build while stripping client-side frameworks from the core reading experience. The result is near-zero JavaScript for static content and a handful of islands for interactivity.

```bash
# Local development
npm install
npm run dev

# Build for production
npm run build
```

### What changed

- **Content collections** define schema for `pages` and `blog`, so every Markdown file includes the metadata we need for SEO and navigation.
- **MarkdownRenderer** applies the phi9 aesthetic in Human mode and surfaces raw Markdown in AI mode using a single toggle persisted in `localStorage`.
- **Right rail** slots let us hydrate contextual components like tag filters without touching the main article markup.

> Astro keeps Core Web Vitals in the green even with heavy typography and embedded code blocks.
