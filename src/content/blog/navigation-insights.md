---
title: Lessons from GPS-Denied Missions
description: Field insights from running autonomous navigation stacks in mines, megacities, and planetary analog habitats.
pubDate: 2024-04-12
updatedDate: 2024-04-25
tags:
  - google
  - research
# heroImage: /PHI9 LOGO.svg
draft: true
---

The transition from lab-grade autonomy to mission-ready navigation is filled with subtle failure modes. From dust ingestion to RF reflections, every site demands its own playbook.

## Stabilising Perception

We prioritise redundant sensing and low-drift estimation:

1. Fuse complementary modalities (visual-inertial + UWB) to prevent catastrophic loss when any single stream degrades.
2. Run self-checks on pose graphs and drop suspect edges before they corrupt the map.
3. Keep operators in the loop with Markdown status feeds rendered through the AI view toggle.

## Lightweight Markdown Ops

Obsidian becomes the single source of truth for:

- Mission briefs
- Experiment logs
- Component changelogs

These notes sync straight into Astro collections, keeping our publishing pipeline frictionless.
