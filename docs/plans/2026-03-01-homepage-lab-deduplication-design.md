# Homepage & Lab Page Deduplication

## Problem

The homepage and lab page share identical hero action links ("Read manifesto", "Browse research", "Explore datasets"). The homepage copy talks about vault-native publishing internals instead of the value prop. The three sections (Lab, Research, Datasets) need clearer identity:

- **Lab** = interactive products and experiments
- **Research** = published technical writing and findings
- **Datasets** = robotics training data synced from HuggingFace org

## Changes

### Homepage (`src/pages/index.astro`)

**Hero copy** — replace vault-native/Obsidian paragraph with:

> We build one of the cheapest pipelines for capturing physical AI training data at scale — full-body motion capture, multi-view video, and structured action datasets ready for post-training.

**Hero actions** — change from three links to two:

- "Read manifesto →" (keep, stays accent-colored)
- "Enter the Lab →" (new, replaces "Browse research" and "Explore datasets")

**Card descriptions** — update to reflect distinct identities:

- **Lab**: "Experiments, interactive tools, and products built from our research pipeline."
- **Research**: "Technical notes, benchmarks, and findings from our work on physical AI systems."
- **Datasets**: "Robotics training data — motion capture, multi-view video, and action datasets from our HuggingFace org."

### Lab page (`src/pages/lab/index.astro`)

**Hero actions** — change from three links to one:

- "Read manifesto →" (keep)
- Remove "Browse research →" and "Explore datasets →"

**Cards** — no changes (Manifesto, Research operating model, Vault-native publishing stay as-is).

### No other files change

Research page, Datasets page, layouts, components — all unchanged.

## Files touched

1. `src/pages/index.astro` — hero copy, hero actions, card descriptions
2. `src/pages/lab/index.astro` — hero actions only
