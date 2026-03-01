---
title: How Labs Collect Data
description: >-
  A breakdown of how major robotics labs acquire training data — what they do
  internally, what they buy, and where the gaps are that Phi9 can fill.
publish: false
type: note
category: research
datasetKind: other
tags:
  - concept-note
  - robotics-data
  - data-collection
  - labs
status: published
featured: false
slug: how-labs-collect-data
aliases: []
sourcePath: How Labs Collect Data.md
date: '2026-02-22T00:00:00.000Z'
updated: '2026-02-27T00:00:00.000Z'
---
# How Labs Collect Data

## What It Is
A breakdown of how the major robotics labs actually acquire training data — what they do internally, what they buy, and where the gaps are that <span class="wikilink wikilink--unresolved">Phi9</span> can fill.

## Lab-by-Lab

### Google DeepMind
- **Open X-Embodiment** — 33 labs, 22 robot types, 500+ skills, 150K+ tasks, 1M+ episodes. Largest open robotics dataset.
- **AutoRT** — Deploys up to 20 robots simultaneously. VLMs understand scenes, LLMs suggest tasks. Automating data collection itself.
- **RoboVQA** — Crowdsourced: egocentric videos from humans/robots, crowdworkers segment and label.
- **RT-Trajectory** — Overlays visual outlines on training videos. Pure augmentation, no new data needed.
- **Gemini Robotics** — 2026 plans: "Robotics-Native Gemini" pretrained with robot data, billions of simulated trajectories.
- **<span class="wikilink wikilink--unresolved">Phi9</span> gap**: Best open dataset but still needs domain-specific data. Can't deploy 20 robots in every Indian factory.

### Toyota Research Institute
- VR, teleoperation, and simulation combined.
- "Robotic Manipulation Data Engine" — autonomous exploration + automated collection/labeling + iterative refinement.
- Photorealistic data generation from single-view scene recovery.
- **<span class="wikilink wikilink--unresolved">Phi9</span> gap**: Building self-sufficient internal engines. Less likely to buy external data. But validates the capture-real + multiply-synthetic model.

### <span class="wikilink wikilink--unresolved">Physical Intelligence</span>
- See dedicated note: <span class="wikilink wikilink--unresolved">Physical Intelligence</span>
- 10K+ hours, 7 robots, 68 tasks. Zhiyuan partnership for manufacturing data.
- **<span class="wikilink wikilink--unresolved">Phi9</span> gap**: Actively seeking domain-specific post-training data. Top prospect.

### Figure AI
- **Project Go-Big** — Partnership with Brookfield (100K+ residential units). First-person human video.
- **Helix Lab** — Dedicated R&D for large-scale egocentric data collection.
- Betting on "zero-shot human-to-robot transfer" — learn from human video without teleop data.
- **<span class="wikilink wikilink--unresolved">Phi9</span> gap**: Building their own residential pipeline. Need industrial/factory data they don't have.

### 1X Technologies
- **Neo Gamma** — Deploying in hundreds to thousands of homes (late 2025).
- Human-in-the-loop: teleoperators remotely guide robots = deliberate data collection strategy.
- World model from internet-scale video, fine-tuned with robot-specific data.
- **<span class="wikilink wikilink--unresolved">Phi9</span> gap**: Home deployment is their flywheel. No factory/industrial data.

### Agility Robotics
- **Digit humanoid** — Operational in logistics facilities. Loading/unloading totes.
- Agility Arc: cloud platform for workflow management.
- Task-specific data from own industrial deployments. Phased, safety-first.
- **<span class="wikilink wikilink--unresolved">Phi9</span> gap**: Potential buyer of industrial data for new warehouse tasks. Focus is narrow (logistics, not assembly).

### Covariant
- Foundation models for warehouse robots. "Covariant Brain" — deep RL for warehouse ops.
- Combines real-world robot datasets + internet data.
- **<span class="wikilink wikilink--unresolved">Phi9</span> gap**: Self-sufficient in their niche. Low probability unless <span class="wikilink wikilink--unresolved">Phi9</span> offers unique warehouse tasks.

## The Pattern

Labs self-sufficient in **home and warehouse** data. Nobody is self-sufficient in **factory/assembly** data.

| Lab | Home Data | Factory Data | Likely Buyer? |
|-----|-----------|-------------|---------------|
| <span class="wikilink wikilink--unresolved">Physical Intelligence</span> | Some | Needs it | Yes — top prospect |
| Google DeepMind | Some | Needs diversity | Moderate |
| Figure AI | Building own | None | Yes — for industrial |
| 1X Technologies | Building own | None | Yes — for factory |
| Agility Robotics | N/A | Some logistics | Moderate |
| Covariant | N/A | Warehouse only | Low |
| TRI | Building own | Building own | Low |
| Tesla Optimus | Unclear | Unclear | Unclear |

## Connections
- <span class="wikilink wikilink--unresolved">Robotics Data Market</span> — commercial context
- <span class="wikilink wikilink--unresolved">Robotics Data Competitors</span> — supply side
- <span class="wikilink wikilink--unresolved">Physical Intelligence</span> — detailed breakdown
- <span class="wikilink wikilink--unresolved">Phi9 Value Chain</span> — what <span class="wikilink wikilink--unresolved">Phi9</span> offers to fill these gaps

## Open Questions
- Which lab is most accessible for a first conversation?
- Do labs prefer to buy finished datasets or commission custom captures?
- How do open-source contributions (like RT-X) affect willingness to pay?

---
Last Updated: 2026-02-22
