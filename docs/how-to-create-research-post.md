# How to Create a New Research Blog Post

This guide documents the process for adding new research articles to phi9.space.

## Quick Reference

**Location**: `src/content/blog/`

**Filename**: Use kebab-case (e.g., `your-article-title.md`)

**URL**: Automatically generated as `/research/your-article-title/`

---

## Step-by-Step

### 1. Create the Markdown File

Create a new `.md` file in `src/content/blog/`:

```bash
src/content/blog/your-article-title.md
```

The filename becomes the URL slug automatically. Examples:
- `scaling-egocentric-video.md` → `/research/scaling-egocentric-video/`
- `benchmarking-transfer-in-manipulation.md` → `/research/benchmarking-transfer-in-manipulation/`

### 2. Add Frontmatter

Every post requires this frontmatter block at the top:

```yaml
---
title: "Your Article Title"
description: "A concise one-line summary that appears in listings."
pubDate: 2026-04-21
tags:
  - physical-ai
  - datasets
heroImage: /research/your-article/hero.png
author: Your Name
draft: false
---
```

**Field Reference**:

| Field | Required | Description |
|-------|----------|-------------|
| `title` | ✅ | Article headline |
| `description` | ✅ | Short summary for cards/listings |
| `pubDate` | ✅ | Publication date (YYYY-MM-DD) |
| `tags` | ✅ | Array of tags (first tag is primary) |
| `heroImage` | Optional | Path to hero image in `/public/` |
| `author` | Optional | Author name (defaults to "Phi9") |
| `draft` | Optional | Set `true` to hide from public |
| `updatedDate` | Optional | Last updated date |

### 3. Tag Conventions

Use these tags to categorize your content:

**Primary Research Tags**:
- `reinforcement-learning` - RL methods, algorithms, training
- `robotics` - Hardware, manipulation, control
- `physical-ai` - General physical intelligence
- `datasets` - Data collection, curation, formats
- `evaluation` - Benchmarks, metrics, testing

**Secondary Tags**:
- `simulation` - Sim environments, Isaac Sim, etc.
- `motion-capture` - MoCap systems, kinematics
- `policy-gradient` - Specific RL methods
- `hierarchical-rl` - HRL architectures
- `field-notes` - External Physical AI writeups

**Tag Tips**:
- First tag appears as the primary category on cards
- Use 2–4 tags per article
- Be consistent with existing tags

### 4. Add Media Assets

**Images**:
1. Place images in `/public/research/your-article/`
2. Reference in frontmatter: `heroImage: /research/your-article/hero.png`
3. Reference in markdown: `![Alt text](/research/your-article/diagram.png)`

**Videos**:
```markdown
<video controls preload="metadata" src="/research/your-article/demo.mp4"></video>
```

Supported formats: PNG, JPG, MP4, WebM

**No GIFs**: Use MP4/WebM for animations (better quality, smaller size)

### 5. Write Content

Below the frontmatter, write in standard Markdown:

```markdown
---
frontmatter here
---

## Introduction

Your content here. Use ## for section headings.

### Subsection

- Bullet points
- Are supported

**Bold text** and *italic text* work.

### Code Blocks

```python
def example():
    return "syntax highlighted"
```

### Math (KaTeX)

Inline: $E = mc^2$

Block:
$$
\hat{A_t}(S_t,A_t) = \hat{G_t} - \hat{v_{\pi}}(S_t)
$$

### Tables

| Column 1 | Column 2 |
|----------|----------|
| Data     | Data     |

### Videos

<video controls preload="metadata" src="/research/your-article/demo.mp4"></video>
```

### 6. Test Locally

```bash
npm run dev
```

Visit `http://localhost:4321/research/` to see your post in the listing.

### 7. Build and Deploy

```bash
npm run build
```

Commit and push. Netlify will auto-deploy.

---

## Examples

See existing posts for reference:

- `policy-based-deep-rl-lunar-landing.md` - Full research article with videos
- `the-first-project.md` - Technical walkthrough with diagrams

---

## Tag-Based Filtering

The research page supports filtering by tag. When you add a new tag, it will automatically appear in the filter dropdown. Users can filter posts by:

- `reinforcement-learning`
- `robotics`
- `physical-ai`
- `datasets`
- `evaluation`
- Plus any custom tags you add

Tags help distinguish:
- **Original phi9 research** (e.g., `reinforcement-learning`, `robotics`)
- **Physical AI field writeups** (use `field-notes` tag)
- **Dataset articles** (use `datasets` tag)

---

## Checklist

Before publishing:

- [ ] Filename is kebab-case
- [ ] All required frontmatter fields filled
- [ ] At least one tag added
- [ ] Hero image path is correct (if used)
- [ ] Media files placed in `/public/research/your-article/`
- [ ] Draft set to `false`
- [ ] Tested locally
- [ ] Proofread content

---

## Need Help?

Contact: research@phi9.space
