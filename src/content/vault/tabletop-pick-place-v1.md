---
title: phi-9/tabletop-pick-place-v1
description: Full-body motion capture + multi-view RGB of varied pick-and-place tasks on a tabletop
publish: false
type: dataset
category: datasets
datasetKind: model-card
tags:
  - dataset
  - phi9
  - tabletop
  - pick-place
  - motion-capture
status: published
featured: true
slug: tabletop-pick-place-v1
aliases: []
sourcePath: tabletop-pick-place-v1.md
date: '2026-02-26T00:00:00.000Z'
updated: '2026-02-27T00:00:00.000Z'
# HuggingFace Integration
hfRepoId: phi-9/tabletop-pick-place-v1
hfDownloads: 0
hfLikes: 0
access: public
tier: 2
domain: tabletop
taskType: pick-place
episodes: 500
totalHours: 25
formats:
  - lerobot
  - hdf5
  - zarr
  - mujoco
  - isaac_sim
---

> **HuggingFace Dataset**: [phi-9/tabletop-pick-place-v1](https://huggingface.co/datasets/phi-9/tabletop-pick-place-v1)
> - ⬇️ 0 downloads
> - ❤️ 0 likes
> - 🔄 Last updated: 2/27/2026

# phi-9/tabletop-pick-place-v1

Full-body motion capture dataset for tabletop manipulation tasks. This is the flagship Phi9 dataset demonstrating the highest fidelity motion capture for robot learning.

## Overview

500 episodes of human operators performing pick-and-place tasks with full-body motion capture (23 DOF at 120 Hz) synchronized with multi-view RGB video.

## Data Card

| Attribute | Value |
|-----------|-------|
| **Dataset ID** | phi-9/tabletop-pick-place-v1 |
| **Version** | 1.0.0 |
| **License** | phi9-commercial-v1 |
| **Fidelity Tier** | 2 |
| **Episodes** | 500 |
| **Total Hours** | 25 |
| **Avg Episode Length** | 180 seconds |
| **Task Success Rate** | 94% |
| **Domain** | Tabletop manipulation |
| **Task Type** | Pick-and-place |

## Files

### Episode Structure

Each episode contains synchronized multi-modal data:

| File | Description | Format |
|------|-------------|--------|
| `video_ego.mp4` | Egocentric view, 1080p60 | MP4 (H.264) |
| `video_overhead.mp4` | Overhead view, 1080p60 | MP4 (H.264) |
| `video_side.mp4` | Side view, 1080p60 | MP4 (H.264) |
| `joints.bvh` | Full-body joint trajectories (23 segments, 120 Hz) | BVH |
| `ee_right.csv` | Right hand end-effector pose (XYZ + quaternion, 120 Hz) | CSV |
| `ee_left.csv` | Left hand end-effector pose (XYZ + quaternion, 120 Hz) | CSV |
| `metadata.json` | Episode metadata | JSON |
| `instruction.txt` | Natural language task instruction | Text |

### Available Export Formats

- **LeRobot v3** - HuggingFace compatible
- **HDF5** - ALOHA-style pipelines
- **Zarr** - UMI / Diffusion Policy
- **MuJoCo** - Simulation ready
- **Isaac Sim** - NVIDIA ecosystem

## Usage

### Loading with LeRobot

```python
from lerobot.datasets import LeRobotDataset

dataset = LeRobotDataset(
    repo_id="phi-9/tabletop-pick-place-v1",
    root="./data",
    episodes=[0, 1, 2]  # Load specific episodes
)
```

### Loading with HDF5

```python
import h5py

with h5py.File("phi-9/tabletop-pick-place-v1/episodes/episode_000/data.hdf5", "r") as f:
    images = f["observations/images"][:]
    joints = f["observations/joints"][:]
    actions = f["actions"][:]
```

## Metrics

| Metric | Value | Premium Threshold |
|---|---|---|
| Sensor sync | 3.2 ms | <5ms |
| Action smoothness (jerk) | 0.014 | <0.02 |
| Episode consistency (var) | 0.12 | <0.15 |
| State space coverage | 0.78 | >0.7 |
| Task success rate | 94% | >90% |
| DOF captured | 23 (full body) | 23 = max |
| Capture frequency | 120 Hz | >100 |
| Annotation density | 4.2 /min | >3 |

## Benchmark Comparison

| Dimension | BridgeData v2 | DROID | ALOHA static | **Phi9** |
|---|---|---|---|---|
| DOF | 7 (WidowX) | 7 (Franka) | 14 (bimanual) | **23 (full body)** |
| Hz | 5 | 15 | 50 | **120** |
| Sync | ~10ms | ~5ms | <5ms | **<5ms** |
| Body coverage | Arm only | Arm only | Arms only | **Full body** |
| Retargetable to humanoid | No | No | Partial (arms) | **Yes (full kinematic chain)** |
| Rig cost | ~$2K | ~$30K | ~$28K | **~$500** |

## Changelog

### v1.0.0 (2026-02-26)

- Initial release
- 500 episodes of pick-and-place tasks
- 23 DOF full-body motion capture at 120 Hz
- 3-view synchronized RGB video at 60 fps
- LeRobot v3, HDF5, Zarr, MuJoCo, and Isaac Sim exports

---
*Synced from HuggingFace Hub* | [View on HF →](https://huggingface.co/datasets/phi-9/tabletop-pick-place-v1)
