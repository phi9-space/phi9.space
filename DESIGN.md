# DESIGN.md — phi9.space design system

Single source of truth for the visual, typographic, and interaction system of
phi9.space. This document complements but does not repeat `docs/website-overhaul-blueprint.md`
(information architecture and copy intent) or `docs/page-by-page-copy-brief.md`
(page-level working copy). Read those for what to say; read this for how the
site should look, feel, and behave.

Scope:

- color system and tokens
- typography roles and scale
- spacing, layout, and section grammar
- components and reusable surfaces
- motion and interaction
- imagery and proof surfaces
- dark mode rules
- custom visual elements
- Figma linkage
- accessibility
- constraints and anti-patterns

Whenever code and this document disagree, the correct action is to update one
to match the other. This is the canonical description.

---

## 1. Brand foundations

### Identity

phi9 is a physical AI lab. The site should read as a humane research
institution, not a SaaS product, a robotics marketplace, or a design demo.

The voice rule set, restated for reference:

- presence over pitch
- soul on the surface, rigor underneath
- artifacts before abstractions
- research infrastructure is part of the product
- progress should remain legible

### Voice constraints

- Never use the word `genuinely`.
- Never write sentimental or startup-cliché phrasing.
- Prefer nouns, tensions, and artifacts over explanatory clauses.
- Each section should state one sharp claim and let proof follow.
- Compression wins over completeness on the public surface; detail pages can
  breathe more.

### Logo system

The canonical brand lockup is the `phi9.space` icon + wordmark (Figma node
`212:8` in file `O7xxYPHxFUj4xChsJT9uNZ`). The wordmark is set in `Source Serif
Pro Regular`. The period between `phi9` and `space` is rendered in Signal
Orange (`#ff5c00`). The icon to the left is the monochrome phi-9 glyph.

Brand asset files, current canonical state:

- `public/assets/brand/phi9-lockup-black.svg` — primary lockup, dark ink
- `public/assets/brand/phi9-mark-black.svg` — icon only, dark ink
- `public/assets/brand/phi9-mark-white.svg` — icon only, paper
- `public/assets/brand/phi9-wordmark.svg` — wordmark only (legacy; prefer the
  lockup)

The navbar shows the full lockup on desktop and the icon only on mobile. The
footer banner shows the full lockup. Dark-mode assets must be produced before
dark mode is considered shippable (see section 8).

Stale logo files in `public/` root (`PHI9 BL.svg`, `PHI9 LOGO.svg`,
`PHI9.SPACE.svg`) should be removed. They predate the current brand system
and are never referenced.

---

## 2. Color system

phi9.space is paper-first. The site has one theme: cream Canvas ground,
Graphite ink text, Signal Orange as the sole accent. There is no dark
mode. This is a deliberate brand decision — the paper aesthetic is the
brand, and committing to it makes the poster language work.

### Primitive tokens (`src/styles/tokens.css`)

```
--brand-signal:      #ff5c00   Signal Orange — the only accent
--brand-ink:         #16161d   Graphite — the only dark value
--brand-paper:       #fcf7e9   Canvas — the only ground
--brand-paper-warm:  derived from paper
--brand-paper-stone: derived from paper
```

These five are the only brand primitives. Introducing a sixth should
require a dedicated decision with documented reason.

### Semantic tokens

Semantic tokens are what components should reference. They resolve to
primitives.

```
--color-bg:            brand-paper
--color-bg-elevated:   mix(paper 92%, ink 8%)
--color-surface:       brand-paper-warm
--color-surface-alt:   brand-paper-stone
--color-border:        mix(paper 84%, ink 16%)
--color-text:          brand-ink
--color-text-inverse:  brand-paper
--color-muted:         mix(ink 66%, paper 34%)
--color-accent:        brand-signal
--color-accent-hover:  mix(signal 86%, ink 14%)
--color-accent-soft:   mix(signal 10%, paper 90%)
--color-link:          brand-signal
--color-rule:          brand-ink (editorial divider color)
--gradient-hero:       paper → paper (intentionally flat)
```

The signal color is brand identity, not atmosphere. It should not shift.
Do not introduce hover-state color variants that desaturate it.

### Usage rules

- Use semantic tokens in components, not primitives. Reach for a primitive
  only to define a new semantic layer.
- Accent is signal, not decoration. Reserve it for one element per section:
  a CTA, an eyebrow, a coral dot, a meaningful chip. Two accent elements in
  one viewport is usually one too many.
- Borders are quiet. They separate, they do not decorate. Never stack more
  than one border weight in a component.
- Muted text is for metadata, secondary captions, archive density. Never use
  muted for section bodies.
- Do not introduce shadows beyond the three defined shadow tokens.
- Do not re-tint surfaces per section. Use the three surface tokens or leave
  the section on `--color-bg`.

### Forbidden color moves

- Multiple accents per page.
- Gradients that sweep across a hero.
- Background color swaps between sections that are not structurally distinct.
- Soft coral backgrounds used as decoration rather than as signal state.
- Any glass or frosted surface beyond the site header's subtle blur.

---

## 3. Typography

### Roles

Three font families, three roles, strict separation.

| Role    | Family             | Purpose                                                                       |
|---------|--------------------|-------------------------------------------------------------------------------|
| Display | `Radio Canada Big` | Headlines, section titles, dominant statements, institutional presence        |
| Prose   | `Source Serif Pro` | Body copy, longform reading, editorial captions, manifesto                    |
| Mono    | `JetBrains Mono`   | Eyebrows, labels, metadata, counts, numeric chips, code, schema fragments     |

The brand wordmark itself is set in Source Serif Pro (see section 1). That
is an identity constant, not a role.

### Scale — poster-class

```
Base body size: 17px
Line height (body):    1.5
Line height (heading): 0.98
Letter spacing (heading): -0.04em
Letter spacing (body):    -0.01em
Reading measure: 70ch default, 62ch on dense surfaces
Heading weight: 600

Display tokens:
--type-display-xl: clamp(3.5rem, 10vw, 9rem)   homepage hero only
--type-display-lg: clamp(2.5rem, 6vw, 5.25rem) page heroes (h1)
--type-display-md: clamp(1.875rem, 4vw, 3.5rem) section h2
--type-display-sm: clamp(1.25rem, 2vw, 1.625rem) h3
```

Typography is intentionally poster-scale. Headlines are meant to feel
like physical print, not like web page text. Let them wrap to multiple
lines when content requires it; wrapping is part of the rhythm.

Every `.section-heading` h2 automatically receives a thick editorial rule
(`::after`) directly under the headline. This is part of the section
grammar — do not suppress it unless using `.section-heading--no-rule`.

### Rules

- Never show all three families with equal weight in one viewport.
- In most viewports use two roles at once.
- Hero is typically `display + prose`.
- Dense proof surfaces are `display + mono` or `prose + mono`.
- Mono must only appear in short runs. Long mono blocks are reserved for
  code.
- Eyebrow labels always live in mono, uppercase, letter-spacing `0.08em`,
  font size `0.74rem` to `0.76rem`, color `--color-accent`.
- Do not introduce a fourth family, weight, or size for a one-off need.

### Dependencies to resolve

- `@fontsource/ibm-plex-sans` is installed but never imported. Either use
  it intentionally in a future role or remove the dependency.
- `JetBrains Mono` currently falls back to system mono. Explicitly import
  it via Fontsource for rendering consistency.

---

## 4. Spacing and layout

### Container

- `--max-width: 1200px`
- Container padding: `clamp(1rem, 3vw, 2rem)`
- Reading column cap: 62ch to 70ch depending on role

### Section rhythm

- Section vertical padding: `clamp(3rem, 5vw, 4rem)`
- Hero vertical padding: `clamp(7rem, 12vw, 10rem)` top, `clamp(3.5rem, 6vw, 5rem)` bottom
- Sections should alternate densities, not backgrounds. Let whitespace do
  the work.
- First viewport should read like a poster: narrow column, dominant
  typographic anchor, one artifact.

### Grid

- Default grid: two columns, content-leading, artifact-trailing, `0.92fr`
  artifact column.
- Four-up strips (capability loop, methods) use equal columns at `1fr` each.
- Single-column composition is always legitimate.

### Cards

Default to cardless composition. Rails, dividers, and artifact frames should
carry the layout.

Cards are allowed only in:

- archive listings (research index)
- product tiles (lab, future data products)

Each of those cards must include a real image, not a placeholder gradient
or illustration. If no image exists, use a typographic-only row.

---

## 5. Section grammar

Every major section uses the same anatomy unless there is a documented
reason to deviate.

```
eyebrow label
thesis headline
one-to-two-line body
dominant proof surface (artifact, diagram, table, or figure)
next action or proof caption
```

On the homepage and the lab page, this anatomy is the stitching rule for
every section. On the manifesto and longform pages, the anatomy collapses
into typographic-only sections.

### Eyebrows

- mono, uppercase, `0.74rem` to `0.76rem`, letter-spacing `0.08–0.12em`,
  color `--color-accent`
- one or two words where possible
- never wraps

### Thesis headlines

- display family
- one sharp claim
- maximum 12 words
- avoid explanatory sub-clauses
- no trailing question marks unless the section is about an open problem

### Bodies

- prose family
- one or two sentences
- avoid repeating the thesis

### Proof surfaces

- choose one of: artifact, diagram, table, figure crop, typographic-only
- if none of the above is available, collapse to typographic-only
- never insert a decorative placeholder

### Next action

- one primary CTA if any
- avoid two same-weight CTAs side by side except on homepage hero and
  the closing contact block

---

## 6. Components

The following reusable surfaces should become real components over time.
Until then, duplicated markup is acceptable as long as it follows the rules
below.

### Primary components

- `SectionHeader` — eyebrow + thesis + body.
- `Eyebrow` — standalone mono label.
- `ArtifactFrame` — image + rule + title + metric chips + caption.
- `EvidenceStrip` — horizontal strip of mono chips or metric pills.
- `DataTable` — research-grade tables with sparse borders and mono headers.
- `QuoteBlock` — pull quote with coral rule and attribution.
- `CTA` — button or button pair with optional supporting line.

### Existing implementations

- `src/components/Navbar.astro` — responsive lockup + menu toggle.
- `src/components/Footer.astro` — column grid + wordmark banner.
- `src/components/SeoHead.astro` — metadata, structured data.
- `src/components/LongformArticleShell.astro` — for manifesto and long posts.
- `src/components/TableOfContents.astro` — article TOC.
- `src/components/AsciiShader.astro` — placeholder; should become a real
  generative backdrop or be removed.

### Rules for new components

- Components do not tint their own backgrounds unless the role requires
  a different surface token. Let the section set the surface.
- Components live at the semantic layer: they reference tokens, never
  primitives.
- Components must behave correctly in both themes without runtime branching.
- Components must collapse gracefully on narrow viewports with no more than
  two breakpoints.

### Forbidden components

- Floating glass cards as primary storytelling.
- Full-bleed gradient heroes.
- Dashboard mockups or SaaS-style status panes.
- AI-blob imagery or generative-abstract filler.
- Hover-reveal interactions that hide load-bearing content.

---

## 7. Motion and interaction

### Primitives

The site has a small motion vocabulary. It should stay small.

- `.reveal` — fade-up on page entry. Already implemented in
  `src/layouts/BaseLayout.astro`. Applies to any element that should
  appear with restraint on load.
- Scroll-sticky narrative — a pinned panel whose caption or artifact state
  changes as content scrolls past. Use sparingly, and only when the
  narrative needs more than one frame.
- Hover transitions — color, border, transform only. Max 200ms ease.
- Cursor-driven micro-motion — acceptable only where the motion clarifies
  a system (for example, a sensor-field attractor).

### Rules

- Motion should sharpen hierarchy or deepen atmosphere; it should never
  be the concept of a page.
- Do not hide above-the-fold content behind scroll animations.
- Do not use parallax.
- Do not animate text letter-by-letter.
- Page-load reveal delays cap at 320ms so long pages are not sluggish
  and screenshots remain legible.
- `prefers-reduced-motion` must disable all non-essential motion. Reveal
  transitions fall back to no opacity change.

### Site header

The site header is fixed. On scroll beyond 20px the header blurs and
adopts a muted background. This behavior is already implemented; do not
tune it without a reason.

---

## 8. One theme, no dark mode

phi9.space does not implement a dark mode. The paper aesthetic is the
brand, and inverting it would dilute the poster language.

A white lockup asset (`public/assets/brand/phi9-lockup-white.svg`) is
retained for use against dark image grounds in OG cards, social posters,
and future surfaces where paper-on-ink is called for — but the site
itself stays paper.

If a future decision revives dark mode, it should be a deliberately
different surface (gallery at night) rather than a color invert of the
existing rules. It is out of scope for v1 and beyond.

---

## 9. Imagery and proof surfaces

### Decision rule

For every section that calls for visual content, answer these questions in
order:

1. Does motion itself carry the meaning? If yes, use `video`.
2. Does the artifact need authority and clarity? If yes, use `still image`.
3. Is the idea procedural, structural, or systemic? If yes, use a `diagram`.
4. Is the proof comparative, technical, or operational? If yes, use a `table`.
5. If none of the above, use `text-only`.

Text-only is always legitimate. Placeholder filler is never.

### Figure policy

- Research posts can use motion as evidence. Embedded video is permitted
  where it clarifies behavior.
- Index pages should not default to video.
- Hero images should be real artifacts, not moodboards.
- Figures in articles should carry captions in mono, short.

### Asset queue

Assets to produce, in priority order:

1. One strong homepage institutional still or annotated composite.
2. Four capability-loop visual states (capture, multiply, train, evaluate).
3. One strong MoCap rig still.
4. One MoCap anatomy or calibration diagram.
5. One methods diagram that moves from question to system.
6. Three to five visual cues for open-problem rows.
7. A white-on-ink logo lockup for dark mode.

Until a real asset exists for a surface, that surface collapses to
typographic-only or to a custom generative element (see section 10).

---

## 10. Custom visual elements

The site uses a small set of custom, code-driven visuals that express the
phi9 aesthetic without relying on outside assets. These elements are
token-aware so they work in both themes without runtime branching.

### Principles

- Code-driven, not image-driven.
- Built with SVG, CSS, or canvas. No third-party animation libraries.
- One idea per element. No stacked effects.
- Motion restrained. Each element should feel at home in a research
  notebook.
- Animated elements honor `prefers-reduced-motion`.

### Vocabulary

The following elements form the core of the phi9 visual language. Each
is a candidate for a reusable component or an inline block.

**Motion trace composite.** A small SVG where one or more bezier paths
draw themselves in on scroll or load. Used to evoke captured trajectories.
Stroke uses `--color-accent` at low opacity.

**Sensor lattice.** A field of small circles on a regular grid, with a
subtle sinusoidal pulse or a cursor-driven attractor. Evokes mocap
marker arrays and calibration targets.

**Capture frame grid.** A row of thin rectangles drawn in a repeating
pattern, one of which holds a brighter fill to suggest the current frame.
Used to anchor the capture step of the capability loop.

**Multiplication fork.** A single shape that emits two, three, or four
echoes in scaled and rotated form. Used for the multiply step.

**Training waveform.** A simple oscillation that converges toward a flat
line. Used for the train step or any evaluation-of-loss moment.

**Benchmark fragment.** A small bar-chart with one bar highlighted in
`--color-accent`. Used for evaluation and transfer contexts.

**Data stream rail.** A horizontal rail of mono packets scrolling slowly,
each annotated with a timestamp and a short tag. Used as a header
treatment for the data page.

**Tension glyph.** A small SVG for each open-problem row expressing
incompleteness — a broken line, a half-drawn circle, a forked path.
Used inline with the problem title.

**Ascii backdrop.** A noise or character field implemented in canvas,
masked to sit behind a hero or as a section divider. Replaces the
current `AsciiShader.astro` placeholder.

### Implemented primitives

The following primitives live in `src/components/visuals/`. They accept
size, color, and density props and default to semantic tokens so they
work without overrides.

- `SignalCircle.astro` — filled circle, defaults to `--color-accent`.
  Used as the dominant poster mark. One per composition.
- `InkRect.astro` — filled rectangle, defaults to `--color-text`. Used
  as ground or constraint in poster compositions.
- `DotGrid.astro` — rows × cols grid of small dots. Evokes marker arrays
  and measurement lattices.
- `HalfCircle.astro` — half-disc in four orientations (top/bottom/left/
  right). Used for contrast and directional weight.
- `VerticalBar.astro` — tall accent bar, defaults to accent color. Used
  as punctuation inside posters.

The site-wide `.rule` class and its `--short` / `--wide` variants are
the canonical horizontal rule divider — no component needed.

### Implementation guidance for new primitives

- Live under `src/components/visuals/`.
- Accept size + color props with semantic-token defaults.
- Never hardcode colors inside the component — receive via prop with a
  token default.
- Animations must be CSS where possible. Canvas only when the effect
  cannot be expressed otherwise.
- Honor `prefers-reduced-motion` on any animated primitive.
- Each visual should have a static fallback state.

---

## 11. Figma linkage

### Canonical file

- File key: `O7xxYPHxFUj4xChsJT9uNZ`
- File name: `phi9.space`
- URL: https://www.figma.com/design/O7xxYPHxFUj4xChsJT9uNZ/phi9.space

### Known pages and sections

- Assets page — brand logos, primary lockups, base color swatches.
- Social Posters page — includes `3:1 Cover Posters / Substack + X`
  (section id `258:2`) and its export frames.

Section and node IDs to pin:

- `212:8` — primary lockup (icon + type), Source Serif Pro wordmark with
  Signal Orange dot.
- `29:40` — logo plain black, icon only.
- `29:36` — logo plain white, icon only.
- `67:22` — Signal Orange swatch, `#ff5c00`.
- `67:21` — Canvas swatch, `#fcf7e9`.
- `203:24` — Graphite swatch, `#16161d`.

### Export conventions

- Poster frames on the Social Posters page use PNG/SRGB at `1080w` for
  4:5 frames and `1584w` for LinkedIn cover frames.
- 3:1 export frames (`1500x500`) and the Substack social preview
  (`1200x630`) export as PNG/SRGB at native size.
- Local export path for social: `/Users/a3fckx/Desktop/Attri/phi9/social-exports/`.

### Figma-to-code expectations

- Website screen designs do not yet live in Figma. The blueprint and this
  document are the source of truth. When screens are designed in Figma,
  they should be organized on a `Screens` page with one frame per route.
- Any component added to Figma should have a matching Astro component
  with the same name, or a row in this document explaining why it
  diverges.

---

## 12. Accessibility

- Contrast: all text-on-surface pairs must meet WCAG AA. The Signal
  Orange on Canvas pair is acceptable for non-text graphic elements
  (dots, rules, chips). Use the ink or paper text colors for readable
  runs.
- Focus states: visible outline on every interactive element, using
  `outline: 2px solid var(--color-accent); outline-offset: 2px`.
- Skip link: `BaseLayout.astro` includes a skip link to `#main-content`.
  Do not remove it.
- Semantic HTML: use `section`, `article`, `nav`, `header`, `footer`
  rather than divs where possible. Headings should not skip levels.
- `aria-label` on icon-only controls, including the nav toggle and the
  brand link.
- Form inputs, when added, must have explicit labels and visible focus.
- Reduced motion: every non-essential animation checks
  `prefers-reduced-motion: reduce` and collapses to a static state.

---

## 13. Routes and information architecture

The public route set is locked. Changes require a blueprint amendment.

### Primary routes

- `/` — homepage
- `/lab` — lab index
- `/research` — research archive
- `/research/[slug]` — research article
- `/data` — data layer index
- `/manifesto` — worldview longform

### Utility routes

- `/about` — footer utility
- `/privacy` — legal
- `/terms` — legal
- `/404` — not found

### Removed routes

- `/newsroom` — removed from the public site
- `/collaborations` — removed; replaced by the contact CTA and mailto
  `research@phi9.space`
- `/lab/about` — reduced to the footer `About` page

### Nested detail pages

- `/lab/mocap-rig` folds into the `/data` narrative; the standalone
  page remains available but should no longer be promoted.

---

## 14. Anti-patterns

Add to this list when new anti-patterns emerge. It is the fastest way to
communicate what the site should not become.

### Content

- Explanatory clauses that dilute a sharp claim.
- Sentimental or startup-cliché phrasing.
- Any use of the word `genuinely`.
- Redundant section intros that restate the thesis.
- Marketing language in research or manifesto surfaces.

### Visual

- Repeated rounded icon boxes.
- Placeholder gradient blocks where a real figure would fit.
- Floating glass cards as a primary storytelling device.
- Full-bleed gradient heroes.
- Decorative AI blobs or abstract filler.
- Dashboard mockups.
- Colored backgrounds that switch between sections without reason.

### Interaction

- Parallax.
- Novelty hover-reveals that hide content.
- Auto-playing audio.
- Cursor trails.
- Letter-by-letter headline animation.

### System

- Components with hardcoded color literals.
- Routes that duplicate a surface already covered by an existing page.
- New component sets added before the page rhythms are locked.
- New fonts introduced for a one-off surface.
- Inconsistent spacing scales within a single page.

---

## 15. How to extend this document

- Prefer edits to existing sections over new sections.
- When adding a new rule, include a one-line reason.
- When removing a rule, leave a short note in the commit message so the
  history carries the intent.
- Keep this document inside the repo root so it is always next to the
  code that enforces it.
