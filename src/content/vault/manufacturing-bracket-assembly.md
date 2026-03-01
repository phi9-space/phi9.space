---
title: phi-9/manufacturing-bracket-assembly
description: Factory floor assembly tasks with full-body motion capture - bracket insertion and screwing operations
publish: false
type: dataset
category: datasets
datasetKind: model-card
tags:
  - dataset
  - phi9
  - manufacturing
  - assembly
  - motion-capture
  - factory
status: published
featured: false
slug: manufacturing-bracket-assembly
aliases: []
sourcePath: manufacturing-bracket-assembly.md
date: '2026-02-27T00:00:00.000Z'
updated: '2026-02-27T00:00:00.000Z'
# HuggingFace Integration
hfRepoId: phi-9/manufacturing-bracket-assembly
hfDownloads: 0
hfLikes: 0
access: request
tier: 2
domain: manufacturing
taskType: assembly
episodes: 250
totalHours: 15
formats:
  - lerobot
  - hdf5
  - mujoco
---

> **HuggingFace Dataset**: [phi-9/manufacturing-bracket-assembly](https://huggingface.co/datasets/phi-9/manufacturing-bracket-assembly)
> - ⬇️ 0 downloads
> - ❤️ 0 likes
> - 🔄 Last updated: 2/27/2026
> - 🔒 **Request Access Required**

# phi-9/manufacturing-bracket-assembly

Real factory floor assembly dataset captured in Chennai, India. Full-body motion capture of bracket insertion and screwing operations performed by trained assembly workers.

## Overview

250 episodes of industrial assembly tasks performed on an actual manufacturing floor. This dataset bridges the gap between lab-collected manipulation data and real industrial environments.

## Access

This dataset requires approval. [Request access on HuggingFace →](https://huggingface.co/datasets/phi-9/manufacturing-bracket-assembly)

## Data Card

| Attribute | Value |
|-----------|-------|
| **Dataset ID** | phi-9/manufacturing-bracket-assembly |
| **Version** | 1.0.0 |
| **License** | phi9-commercial-v1 |
| **Fidelity Tier** | 2 |
| **Episodes** | 250 |
| **Total Hours** | 15 |
| **Domain** | Manufacturing |
| **Task Type** | Assembly (bracket insertion + screwing) |
| **Environment** | Factory floor, Chennai, India |
| **Operators** | 5 trained assembly workers |

## Capture Setup

| Spec | Value |
|---|---|
| Location | Manufacturing facility, Chennai |
| MoCap frequency | 120 Hz |
| Video frequency | 60 Hz |
| Camera views | 3 (overhead, side, operator POV) |
| Environment lighting | Factory LED (variable) |
| Background noise | ~75 dB (real factory conditions) |

## Data Shape

| Modality | Shape | Format | Hz |
|---|---|---|---|
| RGB video (overhead) | (T, 1920, 1080, 3) | MP4 | 60 |
| RGB video (side) | (T, 1920, 1080, 3) | MP4 | 60 |
| RGB video (POV) | (T, 1920, 1080, 3) | MP4 | 60 |
| Joint trajectories | (T, 23, 4) quaternion | BVH | 120 |
| End-effector pose (R) | (T, 7) XYZ + quat | CSV | 120 |
| Task metadata | 1 per episode | JSON | — |
| Language instruction | 1 per episode | text | — |

## Task Description

**Instruction**: "Pick up the L-bracket, align with the mounting plate, insert screws, and tighten"

**Subtasks**:
1. Reach for L-bracket from parts bin
2. Orient bracket for insertion
3. Align with mounting plate holes
4. Insert screw into first hole
5. Insert screw into second hole
6. Use screwdriver to tighten both screws
7. Verify secure attachment
8. Return screwdriver and clear workspace

## Benchmark Comparison

| Metric | FMB | IndustReal | **Phi9 Factory** |
|---|---|---|---|
| DOF | 7 (arm) | 7 (arm) | **23 (full body)** |
| Environment | Lab bench | Sim + lab | **Real factory floor** |
| Force/torque | Yes (F/T sensor) | Yes | **Optional (planned)** |
| Hz | Varies | Varies | **120** |
| Language annotations | No | No | **Yes (per episode)** |
| Real-world lighting | No | No | **Yes (factory conditions)** |

## Usage

```python
from lerobot.datasets import LeRobotDataset

# Access requires HF Hub authentication
dataset = LeRobotDataset(
    repo_id="phi-9/manufacturing-bracket-assembly",
    root="./data"
)
```

## Pricing

| Access Level | Description | Price |
|--------------|-------------|-------|
| Research License | Academic use, non-commercial | Contact for pricing |
| Commercial License | Single company, unlimited users | Contact for pricing |
| Enterprise License | Multi-site, redistribution rights | Contact for pricing |

[Request a quote →](mailto:contact@phi9.space)

## Changelog

### v1.0.0 (2026-02-27)

- Initial release
- 250 episodes from real factory floor
- 23 DOF full-body motion capture at 120 Hz
- 3-view synchronized RGB video

---
*Synced from HuggingFace Hub* | [View on HF →](https://huggingface.co/datasets/phi-9/manufacturing-bracket-assembly)
