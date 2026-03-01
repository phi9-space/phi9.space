# phi9.space (Astro + Obsidian Vault)

phi9.space is a content-heavy Astro site with a vault-native publishing workflow.

## Architecture

- Brand site routes: `/`, `/lab`
- Vault-derived routes: `/research`, `/datasets`, `/vault`, `/vault/graph`, `/vault/tags/[tag]`, `/vault/[...slug]`
- Archived route: `/products` redirects to `/lab`
- Legacy redirects: `/blog` -> `/research`, `/blog/:slug` -> `/vault/:slug`, `/manifesto` -> `/lab/manifesto`

## Source of Truth

Obsidian vault remains canonical.

- Vault path is read from `PHI9_VAULT_PATH`
- Fallback path is repo-local `.vault` symlink
- Sync source folder is `${PHI9_VAULT_PATH}/5 - Full Notes`

Set the vault path in repo root `.env` (or `.env.local`):

```bash
cp .env.example .env
```

## Frontmatter Contract (publishable notes)

```yaml
publish: true
type: note # note | dataset | product
category: robotics-data
datasetKind: catalog # for datasets: model-card | catalog | other
status: draft # draft | review | published
featured: false
series: ""
title: Optional override
description: Optional override
tags: ["physical-agents", "phi9"]
date: 2026-02-26
updated: 2026-02-26
slug: optional/custom-path
aliases: ["Alias Name"]
cover: relative-or-root-local-media-path
video: local-path-or-youtube/vimeo-url
```

Default policy: if `publish` is missing, the note is private and not exported.

## Generated Artifacts

- `src/content/vault/**/*.md` (synced publishable notes)
- `public/vault-media/**` (copied referenced local media)
- `src/generated/vault-manifest.json` (nodes, edges, unresolved)

## Commands

```bash
npm install
npm run vault:sync      # export from Obsidian vault
npm run vault:check     # validate generated content + manifest
npm run dev
npm run build
```

## Git Hooks and CI

Pre-commit hook runs:

1. `npm run vault:sync`
2. `npm run vault:check`
3. `npm run build`

GitHub Pages workflow validates synced artifacts with `npm run vault:check` before build.

## Notes on Embeds

- Obsidian wikilinks and transclusions are transformed during sync.
- Local media embeds are copied to `/vault-media/...`.
- External embeds allow only YouTube and Vimeo.
- Raw non-approved iframes are blocked.

## Editorial Management (v1)

- `status`: `draft | review | published` (workflow signal shown in listing and vault metadata)
- `featured`: `true | false` (highlight signal)
- `series`: optional grouping label for multi-post arcs
- `type`: `note | dataset | product`
- `datasetKind`: `model-card | catalog | other` (dataset pages auto-group by this)
