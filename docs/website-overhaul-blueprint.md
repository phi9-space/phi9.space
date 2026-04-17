# phi9.space Website Overhaul Blueprint

## Purpose

This document defines the next full overhaul of `phi9.space` as a site system, not a page reskin.

The goal is to make the site feel like a humane research institution building physical intelligence:

- present, not salesy
- rigorous, not sterile
- visual, but not decorative
- compressed, but not vague

This is a blueprint for structure, copy intent, and visual direction. It is not a UI changelog and it is not a component-by-component implementation plan.

## Core Positioning

Phi9 should read as:

- a physical AI lab
- a builder of data systems, research workflows, and research infrastructure
- a place where artifacts, methods, and questions are as important as products

Phi9 should not read as:

- a robotics SaaS company
- a dataset marketplace
- a generic AI infra startup
- a moodboard-first design exercise

## Writing Philosophy

The site voice should preserve the existing Phi9 direction:

- presence over pitch
- soul on the surface, rigor underneath
- one sharp claim per section
- proof follows language quickly
- compression through nouns, tensions, and artifacts rather than explanatory clauses

Use this sequence across the site:

1. thesis
2. grounding sentence
3. proof surface
4. invitation or next action

## Information Architecture

### Recommended top-level navigation

- `Lab`
- `Research`
- `Data`
- `Manifesto`

The home page should remain the institutional front door. The brand mark returns to `/`.

Primary utility action should sit to the right of the main nav:

- `Get in touch`

### Recommended route decisions

- Keep `/` as the canonical institutional homepage.
- Keep `/lab` as the systems, products, and experiments index.
- Keep `/research` and `/research/[slug]`.
- Add `/data` as a first-class index for capture, sourcing networks, datasets, and data systems.
- Fold `MoCap Rig` into the data story rather than treating it as a primary standalone destination.
- Keep `About` as a footer-level utility page.
- Replace the standalone collaboration route with one direct inquiry flow.
- Keep `/manifesto` active as a primary worldview page.
- Remove `/newsroom`.
- Keep `privacy` and `terms` simple and utilitarian.

### Current to future route mapping

- `/` stays the homepage and becomes more institutional.
- `/lab` stays, but becomes a tighter systems and products index rather than carrying the whole company story.
- `/research` stays as the archive of open work and research output.
- `/data` becomes the public surface for capture systems, sourcing networks, data quality, and data outputs.
- `/lab/mocap-rig` should be folded into `/data` as a nested detail or section, not a primary content pillar.
- `/lab/about` should be reduced to footer-level `About` material.
- `/collaborations` should be removed as a primary route and replaced by one CTA-driven inquiry flow.
- `/manifesto` should become a live primary route.
- `/newsroom` should be removed from the public site.

### Phaseing note

For the next overhaul, keep the top-level IA compact.

Do not expand beyond the four public surfaces unless the content volume grows enough to justify it. The immediate need is clarity and authority, not route multiplication.

The working public structure is:

- `Lab`
- `Research`
- `Data`
- `Manifesto`

For now, `Methods` and `Open Problems` should remain major homepage sections rather than separate routes.

### Content model

The site should operate with four page types:

- `Poster pages`: Home
- `Institutional index pages`: Lab, Research, Data
- `Detail pages`: future products, data systems, datasets, and nested artifact pages where needed
- `Longform pages`: Manifesto, research articles
- `Utility pages`: About, contact or demo flows, legal pages

Each page type should have its own rhythm. The site should not force one layout model onto every route.

## System Rules

### Section grammar

Most major sections should use the same underlying anatomy:

- section label
- thesis headline
- one to two line body
- one dominant artifact, image, diagram, or proof surface
- one next action or one proof caption

This is the main stitching rule for the overhaul.

### Typography

Use three roles with strict separation.

- `Display`: `Radio Canada Big`
- `Prose`: `Source Serif Pro`
- `Mono`: `JetBrains Mono` or equivalent mono already in the system

Rules:

- Display is for headlines, section titles, and high-importance statements only.
- Prose is for body copy, longform, captions with full sentences, and editorial reading.
- Mono is for labels, metadata, counts, technical captions, schema fragments, and interface markers.
- Avoid showing all three families with equal weight in the same viewport.
- In most viewports, use only two roles at once.
- The hero should usually be `display + prose`.
- Dense proof surfaces should usually be `display + mono` or `prose + mono`.

### Layout

- Default to cardless composition.
- Use rails, dividers, media frames, tables, annotated lists, and spacing before adding cards.
- Use cards only for archive listings and product tiles when they are genuinely useful.
- Treat each first viewport like a poster.
- Keep the text column narrow and deliberate.
- Use larger whitespace shifts between section types so the page feels authored rather than stacked.

### Color and surface

- Keep the existing Phi9 coral as the single accent.
- Keep the site predominantly light.
- Use neutrals and whitespace to create authority.
- Use accent color as signal, not decoration.
- Replace placeholder surfaces with real artifact surfaces wherever possible.
- Avoid decorative gradients as a primary storytelling device.

### Motion

Use a small set of reusable primitives:

- hero entrance choreography
- sticky narrative with synced media or caption state
- restrained hover or reveal transition

Rules:

- motion should sharpen hierarchy or deepen atmosphere
- motion should not become the page concept
- no novelty interactions that do not clarify content

## Shared Visual Vocabulary

Across the overhaul, use these recurring visual forms:

- annotated diagrams
- motion traces
- rig photography
- sensor layouts
- benchmark fragments
- notebook-like margin notes
- research tables
- simple line icons only when tied to method or system logic

Avoid:

- dashboard mockups
- floating glass cards as the core style
- decorative AI blobs
- repetitive rounded boxes with icons and copy

## Design-System Cleanup Constraints

Before or alongside the visual overhaul, the system layer should be tightened.

### Token and primitive priorities

- Add semantic spacing tokens instead of relying on scattered literal spacing values.
- Add a true type scale instead of relying on page-local heading sizes.
- Add shared primitives for `SectionHeader`, `Eyebrow`, `ArtifactFrame`, `EvidenceStrip`, `QuoteBlock`, `DataTable`, and `CTA`.
- Fix token drift where components reference undefined variables.
- Decide whether dark mode is real. If not, remove the dead dark-theme branch.

### Typography cleanup priorities

- Import the mono font explicitly instead of falling back to system mono.
- Either use `IBM Plex Sans` intentionally or remove it from the dependency story.
- Introduce one true display scale for institutional headlines; the current hierarchy is too shallow.

### Visual cleanup priorities

- Remove placeholder abstract visuals from key sections.
- Reduce repeated gradient heroes.
- Replace repeated card grids with rails, dividers, artifact frames, and proof surfaces.
- Collapse the palette to `ink / paper / border / coral / one controlled secondary tone`.

## Homepage Spec

### Job

The homepage establishes Phi9 as an institution. It should communicate:

- what Phi9 is
- what kind of work it does
- what questions it is pursuing
- how it works
- why its worldview matters

### Recommended section order

1. Hero
2. Capability Loop
3. Featured Artifact
4. Research Proof
5. Open Problems
6. Methods
7. Principles
8. Collaboration CTA

### Hero

#### Job

State the institutional thesis in one screen.

#### Structure

- brand presence
- headline
- short prose paragraph
- 1 to 2 actions
- one dominant visual artifact

#### Copy intent

This should be philosophical enough to feel like Phi9, but concrete enough to avoid fog.

Keep the current headline family and tighten the support copy around it.

#### Visual direction

- no generic block mosaic
- use one real visual anchor: rig photograph, motion trace composite, system diagram, or lab artifact
- the right side should feel like an authored research artifact, not a placeholder

### Capability Loop

#### Job

Show the loop from capture to evaluation as the operational core of Phi9.

#### Structure

- short section heading
- 4-part stitched sequence: `Capture / Multiply / Train / Evaluate`
- sticky or synced visual plane
- one artifact state per step

#### Copy intent

This section should explain method without becoming a pipeline doc.

The four verbs should remain locked.

#### Visual direction

- each step should reveal a different evidence surface
- example surfaces: body tracking frame, simulation variants, rollout trace, benchmark slice

### Featured Artifact

#### Job

Move from institutional thesis to one concrete thing Phi9 has built.

#### Structure

- small label
- artifact title
- why it exists
- one clear action

#### Copy intent

This section should feel tactile and specific.

The MoCap rig is the right first artifact because it makes Phi9’s research infrastructure legible.

#### Visual direction

- large product image or technical composite
- supporting micro-captions
- no ornamental circles or abstract placeholders

### Research Proof

#### Job

Show active thinking and evidence, not just publication volume.

#### Structure

- section thesis
- one featured research item
- 2 to 3 secondary items

#### Copy intent

Research should read as active lab output, not as a blog.

#### Visual direction

- archive feeling
- dates, tags, reading time in mono
- images should be real figures, diagrams, or technical crops

### Open Problems

#### Job

Show what remains unresolved. This is where Phi9 becomes intellectually alive.

#### Structure

- section label
- short intro
- 3 to 5 problem statements
- associated artifact or visual cue per problem

#### Copy intent

Write each problem as a research tension, not a solution statement.

Each item should be:

- one-line problem statement
- one clarifying sentence

#### Copy prompt

`Write each open problem as an unresolved research tension in physical AI. Keep the first line compressed and institutional. Use the second line to clarify what makes the tension difficult. Avoid feature language, fundraising language, or solution promises.`

#### Visual direction

- sparse visual field
- benchmark fragments
- failed attempt frames
- scene reconstructions
- annotated motion diagrams
- redacted notebook-style experiments

### Methods

#### Job

Bridge capability and worldview. Explain how Phi9 approaches difficult problems.

#### Structure

- section label
- section thesis
- 4-part method stack
- one stitched image plane or one large diagram with changing captions

#### Copy intent

This section should sound like a research practice, not like a feature list.

Suggested method stack:

- frame the question
- capture signal
- shape training data
- evaluate in the real loop

#### Copy prompt

`Describe Phi9’s way of working in four moves. Each move should sound like a method or discipline, not a product feature. Keep every move under 8 words, then add one sentence of consequence.`

#### Visual direction

- rig closeups
- dataset schema snippets
- pipeline diagrams
- evaluation notebooks
- deployment feedback loops

### Principles

#### Job

State the operating beliefs behind the work.

#### Structure

- section label
- short introduction
- 4 to 6 principles

#### Copy intent

Each principle should feel durable, compressed, and institutional.

Use:

- one line for the principle
- one line for its consequence in practice

#### Copy prompt

`Write Phi9 principles as concise institutional statements. The first line should be memorable and plain. The second line should describe how that principle changes what Phi9 builds or how it works. Avoid sentimentality and avoid startup clichés.`

#### Visual direction

- mostly typographic
- margin notes
- small hand-marked diagrams
- low-motion reveals

### Collaboration CTA

#### Job

Convert aligned visitors without sounding transactional.

#### Structure

- invitation headline
- one sentence about who Phi9 wants to work with
- one primary action
- one secondary action

#### Copy intent

This CTA should feel like an invitation into shared work, not lead generation.

#### Visual direction

- quiet
- breathable
- no large banner box

## Lab Index Spec

### Job

The Lab page is the systems and artifacts index. It should feel operational and research-adjacent.

### Structure

1. Hero
2. Featured systems
3. Methods in practice
4. Infrastructure stack
5. Current experiments or upcoming artifacts
6. CTA

### Section notes

#### Hero

- thesis: what the lab builds and why
- support line should be more concrete than the homepage

#### Featured systems

- MoCap Rig first
- Data Catalog second when ready
- future slots for other infrastructure or systems

#### Methods in practice

- a more applied version of the homepage `Methods` section
- can include process fragments, data flow, or pipeline stages

#### Infrastructure stack

- show the stack behind the lab: capture, processing, annotation, post-training, evaluation, deployment
- use a diagram or annotated rails, not feature cards

#### Current experiments

- lightweight, almost notebook-like
- can include “in progress,” “expected,” or “under construction”

### Visual direction

- more technical than home
- more diagrams and artifact photography
- less atmosphere, more infrastructure clarity

## Artifact Detail Page Spec

This applies to `MoCap Rig` now and future products, datasets, or systems later.

### Job

Make one artifact legible in technical and institutional terms.

### Structure

1. Hero
2. Why it exists
3. System anatomy
4. Technical specifications
5. Why it matters for training or deployment
6. Integration into the Phi9 stack
7. Use cases
8. CTA

### Copy intent

- more concrete than any other page
- confident, technical, and sparse
- no brand fog

### Visual direction

- real product or system visuals only
- labeled diagrams
- spec tables
- motion only where it clarifies anatomy or flow

## Research Index Spec

### Job

The Research page is the lab archive. It should feel editorial and alive, not like a standard blog listing.

### Structure

1. Hero
2. Featured note or latest major piece
3. Archive list
4. Subscription or follow CTA

### Copy intent

The page should frame the research log as active inquiry and field notes.

### Visual direction

- quieter than home
- more typographic
- archive density is acceptable
- images should be secondary to titles and summaries

## Research Article Template Spec

### Job

Make individual research entries feel serious, readable, and referenceable.

### Structure

- article metadata
- title
- optional hero figure
- body with strong typographic reading rhythm
- side metadata or table of contents where useful
- recent related work

### Copy intent

- clean, readable prose
- support longform
- maintain credibility and calm

### Visual direction

- editorial
- wide margins
- real figures
- no decorative article hero placeholders

## Data Page Spec

### Job

The Data page explains how Phi9 captures, sources, structures, multiplies, and operationalizes data for physical AI.

### Structure

1. Hero
2. Why data is the constraint
3. Data types and modalities
4. Capture systems
5. Sourcing networks
6. Data quality and synchronization
7. Outputs and integration
8. CTA

### Copy intent

This page should make Phi9's data layer feel like serious infrastructure.

It should focus on:

- data types
- capture
- sourcing
- quality
- formats
- infrastructure

### Visual direction

- one strong data proof surface
- diagrams over decoration
- video only where motion or synchronization is the evidence
- tables where the proof is technical

## About And Contact Utility Spec

### Job

Keep `About` and `Get in touch` lightweight and direct.

### Structure

- `About`: short institutional note, team, contact
- `Get in touch`: direct CTA or mail link that can handle demo requests too

### Copy intent

These should reduce friction, not add another narrative page.

### Visual direction

- minimal
- direct
- operational

## Manifesto Page Spec

### Job

Provide the worldview surface for Phi9: the longform document that makes the institution legible.

### Structure

- no heavy UI
- one strong title
- longform prose
- sparse section breaks
- selected pull quotes or margin notes

### Copy intent

The manifesto should be more lyrical than the rest of the site, but still precise.

### Visual direction

- almost book-like
- minimal chrome
- typography does the work

## Newsroom Spec

Remove this route from the public site. It does not belong in the next overhaul.

## Utility Pages

### Legal pages

Keep `Terms` and `Privacy` plain and readable.

Rules:

- no redesign theatrics
- strong hierarchy
- comfortable line length
- simple legal template shared across both pages

### 404 page

Keep minimal. Make it feel aligned with the institution without inventing personality.

## Footer Spec

### Job

Make the footer feel quiet, complete, and useful.

It should not behave like a secondary homepage. It should behave like a clean institutional index.

### Structure

Use a simple multi-column footer with one restrained divider above it.

Recommended columns:

- brand mark and copyright
- `Lab`, `Research`, `Data`, `Manifesto`
- `About`, `Get in touch`
- selected research or utility links when needed
- `Privacy`, `Terms`

### Rules

- keep it light, not dense
- avoid heavy cards, background blocks, or decorative gradients
- use compact text and clean spacing
- let the footer feel archival and composed, not promotional
- if categories grow, prefer editing link selection rather than adding more columns

## Copy Modules To Write Next

The highest-leverage writing tasks for the overhaul are:

1. Homepage hero support copy
2. Open Problems section
3. Methods section
4. Principles section
5. Data page thesis and structure
6. Lab page hero and infrastructure thesis
7. Manifesto draft

## Implementation Notes

- Replace current placeholder visuals before redesigning smaller details.
- Preserve the current token foundation where possible.
- Tighten the typography role usage before adding more components.
- Do not expand the component set until the page rhythms are locked.
- Build the homepage first, then use its system to refactor the other pages.
