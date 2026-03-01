# HuggingFace Integration Workflow

This document describes how to manage datasets on HuggingFace Hub and sync them to the phi9.space website.

## Architecture

```
HuggingFace Hub (phi-9/*)          Your Workflow              phi9.space
┌─────────────────────┐            ┌──────────────┐           ┌─────────────┐
│ Create/Edit         │ ────────▶  │ Review on HF │ ────────▶ │ pnpm run    │
│ Dataset Cards       │   Web UI   │              │   Sync    │ hf:sync     │
│                     │            │              │           │             │
│ README.md           │            │              │           │ Auto-update │
│ phi9_card.yaml      │            │              │           │ website     │
│ data/               │            │              │           │             │
└─────────────────────┘            └──────────────┘           └─────────────┘
```

## Workflow

### 1. Create Dataset on HuggingFace

1. Go to [huggingface.co/phi-9](https://huggingface.co/phi-9)
2. Create a new dataset repository
3. Upload your data files (Parquet, video chunks, etc.)
4. Edit the README.md (model card) with your dataset description

### 2. Add Phi9 Metadata (Optional)

Create a `phi9_card.yaml` file in your HF repo for extended metadata:

```yaml
# phi9_card.yaml - Extended metadata for phi9.space integration
phi9:
  tier: 2                    # Data fidelity tier (0-5)
  domain: "tabletop"         # Domain: tabletop, manufacturing, household, dexterous, locomotion
  taskType: "pick-place"     # Task type
  access: "public"           # public | request | private
  featured: true             # Show in featured section
  episodes: 500              # Number of episodes
  totalHours: 25             # Total hours of data
  formats:                   # Available export formats
    - lerobot
    - hdf5
    - zarr
    - mujoco
    - isaac_sim
  status: "published"        # draft | review | published
  benchmarks:                # Benchmark results
    simpler:
      success_rate: 0.85
      baseline: 0.72
```

### 3. Sync to Website

Run the sync command:

```bash
pnpm run hf:sync
```

This will:
- Fetch all datasets from `phi-9` org on HF Hub
- Download README.md and card data
- Generate vault markdown files in `src/content/vault/`
- Update the vault manifest

### 4. Build and Deploy

```bash
pnpm run build
# Deploy to Netlify/Vercel/etc.
```

## Access Levels

### Public (`access: public`)
- Visible to everyone
- Direct download from HF Hub
- Shows download/like counts

### Request Access (`access: request`)
- Shows "Request Access" badge
- Links to HF Hub for access request
- Gated dataset on HF side
- Good for commercial datasets

### Private (`access: private`)
- Shows "Private" badge
- Visible on site but requires approval
- Used for internal/pilot datasets

## Model Card Template

```markdown
---
title: "phi9/tabletop-pick-place-v1"
emoji: "🤖"
colorFrom: "blue"
colorTo: "green"
license: "phi9-commercial-v1"
language:
  - en
  - python
library_name: "lerobot"
tags:
  - robotics
  - motion-capture
  - imitation-learning
  - robotics-datasets
  - lerobot
---

# phi9/tabletop-pick-place-v1

Full-body motion capture + multi-view RGB of varied pick-and-place tasks on a tabletop.

## Dataset Description

This dataset contains 500 episodes of human operators picking objects of varied shapes, 
sizes, and materials from a tabletop and placing them at target locations.

### Key Features
- **23 DOF full-body motion capture** at 120 Hz
- **3-view synchronized RGB video** at 60 fps
- **Per-episode language instructions**
- **Object metadata and success labels**

## Usage

### With LeRobot
```python
from lerobot.datasets import LeRobotDataset

dataset = LeRobotDataset(
    repo_id="phi-9/tabletop-pick-place-v1",
    root="./data"
)
```

### Data Structure
```
episodes/
├── episode_000/
│   ├── video_ego.mp4
│   ├── video_overhead.mp4
│   ├── video_side.mp4
│   ├── joints.bvh
│   ├── ee_right.csv
│   ├── ee_left.csv
│   ├── metadata.json
│   └── instruction.txt
```

## Citation

```bibtex
@dataset{phi9_tabletop_v1,
  author = {Phi9 Team},
  title = {phi9/tabletop-pick-place-v1},
  year = {2026},
  url = {https://huggingface.co/datasets/phi-9/tabletop-pick-place-v1}
}
```
```

## Current Datasets

| Dataset | Access | Tier | Domain | Episodes | HF Link |
|---------|--------|------|--------|----------|---------|
| tabletop-pick-place-v1 | public | 2 | tabletop | 500 | [phi-9/tabletop-pick-place-v1](https://huggingface.co/datasets/phi-9/tabletop-pick-place-v1) |
| manufacturing-bracket-assembly | request | 2 | manufacturing | 250 | [phi-9/manufacturing-bracket-assembly](https://huggingface.co/datasets/phi-9/manufacturing-bracket-assembly) |
| dexterous-hand-grasp-v1 | request | 3 | dexterous | 300 | [phi-9/dexterous-hand-grasp-v1](https://huggingface.co/datasets/phi-9/dexterous-hand-grasp-v1) |

## Community Datasets

Users can contribute datasets to the `phi-9/community` namespace:

1. Create a dataset on HF
2. Transfer to phi-9/community namespace (requires approval)
3. We'll sync it to the website
4. Community datasets show contributor attribution

## Sync Script Options

```bash
# Sync all datasets from phi-9 org
pnpm run hf:sync

# Sync with verbose logging
DEBUG=1 pnpm run hf:sync

# Sync specific dataset only (future enhancement)
pnpm run hf:sync -- --dataset=tabletop-pick-place-v1
```

## Troubleshooting

### Sync fails with authentication error
Make sure you're logged in to HF CLI:
```bash
huggingface-cli login
```

### Dataset not showing on website
1. Check `src/content/vault/` for the synced file
2. Verify frontmatter has `type: dataset` and `publish: true`
3. Run `pnpm run build` to regenerate manifest

### Changes on HF not reflecting
The sync is one-way (HF → Website). After editing on HF:
1. Run `pnpm run hf:sync`
2. Commit the updated vault files
3. Rebuild and deploy

## Future Enhancements

- [ ] Bidirectional sync (website edits push to HF)
- [ ] Automatic sync on HF webhook (when README is updated)
- [ ] HF Spaces integration for live dataset preview
- [ ] Community contribution portal
- [ ] Dataset comparison tool with live HF data
