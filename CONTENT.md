# Content Management Guide

## Overview

phi9.space uses Astro's content collections for automatic content management. Simply add markdown files and they appear on the site - no configuration needed.

## Adding a New Blog Post

### 1. Create the File

Create a new markdown file in `src/content/blog/`:

```bash
src/content/blog/your-post-name.md
```

### 2. Add Frontmatter

```markdown
---
title: "Your Post Title"
description: "Brief description for SEO and previews"
pubDate: 2024-01-15
updatedDate: 2024-01-20  # Optional - shows "Updated" date
tags: ["research", "navigation", "ai"]  # For filtering
heroImage: /PHI9.SPACE.svg  # Optional - displays at top of post
draft: false  # Set to true to hide from listings
---

# Your Content Here

Write your post content in Markdown...
```

### 3. That's It!

Your post automatically appears in:
- Blog listing at `/blog`
- RSS feed at `/rss.xml`
- "More posts" sections
- Tag filtering system
- Sitemap for SEO

## Content Structure

```
src/content/
├── blog/              # Blog posts (auto-listed at /blog)
│   ├── post-one.md
│   └── post-two.md
└── pages/             # Static pages
    └── manifesto.md   # About page content
```

## Frontmatter Fields

### Blog Posts (`src/content/blog/*.md`)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ | Post title |
| `description` | string | ✅ | SEO description |
| `pubDate` | date | ✅ | Publication date (YYYY-MM-DD) |
| `updatedDate` | date | ❌ | Last update date |
| `tags` | array | ❌ | Filter tags (e.g., ["research", "ai"]) |
| `heroImage` | string | ❌ | Image path (displays at post top) |
| `draft` | boolean | ❌ | Hide from listings (default: false) |

### Pages (`src/content/pages/*.md`)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ | Page title |
| `description` | string | ✅ | SEO description |
| `heroSubtitle` | string | ❌ | Subtitle text |
| `updated` | date | ❌ | Last update date |

## Markdown Features

### Supported Syntax

- **Headers**: `#`, `##`, `###` (automatically linked in TOC)
- **Lists**: Ordered and unordered
- **Links**: `[text](url)`
- **Images**: `![alt](path)`
- **Code blocks**: Triple backticks with language
- **Tables**: GFM-style tables
- **Blockquotes**: `> quote text`

### Code Blocks

\`\`\`python
def example():
    return "Syntax highlighting works!"
\`\`\`

### Blockquotes

```markdown
> Important callouts render with accent color border
```

## Site Structure

| Route | Content Source | Purpose |
|-------|---------------|---------|
| `/` | `src/pages/index.astro` | Home page |
| `/blog` | `src/content/blog/*.md` | Blog listing (labeled "Research") |
| `/blog/[slug]` | Individual blog posts | Post detail pages |
| `/manifesto` | `src/content/pages/manifesto.md` | About page |
| `/rss.xml` | Auto-generated from blog | RSS feed |

## Navigation

Current navigation:
- **Research** (`/blog`) - All blog posts with filtering
- **About** (`/manifesto`) - Company manifesto
- **Contact** - Email link (`contact@phi9.space`)

Press `R` anywhere on the site to jump to Research page.

## Tips

### SEO Best Practices
- Keep titles under 60 characters
- Write descriptions 150-160 characters
- Use descriptive slugs (filename becomes URL)
- Add relevant tags for discoverability

### Image Handling
- Store images in `/public/` directory
- Reference with `/image-name.svg` in frontmatter
- SVG preferred for logos, PNG/JPG for photos
- Images auto-optimize during build

### Draft Posts
Set `draft: true` to work on posts without publishing:

```markdown
---
title: "Work in Progress"
draft: true
---
```

## Questions?

The content system is fully automatic - just add markdown files and they appear. No rebuilds or configuration needed during development (`npm run dev` watches for changes).
