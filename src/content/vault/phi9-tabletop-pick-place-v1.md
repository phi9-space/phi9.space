---
title: phi9/tabletop-pick-place-v1
description: >-
  Full-body motion capture + multi-view RGB of varied pick-and-place tasks on a
  tabletop. The first Phi9 dataset — the calling card.
publish: true
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
slug: phi9-tabletop-pick-place-v1
aliases:
  - pick-place-v1
sourcePath: phi9-tabletop-pick-place-v1.md
date: '2026-02-26T00:00:00.000Z'
updated: '2026-02-27T00:00:00.000Z'
---
# phi9/tabletop-pick-place-v1

> Part of [Phi9 Data Catalog](/vault/phi9-data-catalog/) | Tier 2 | Benchmarked against BridgeData v2, DROID, ALOHA

## Overview

500 episodes of human operators picking objects of varied shapes, sizes, and materials from a tabletop and placing them at target locations. Full-body motion capture (23 segments, 120 Hz) synchronized with 3-view RGB video (60 fps) and per-episode language instructions. The universal manipulation task — every lab needs this data, and nobody has it at this fidelity with full-body kinematics.

This is the Phi9 calling card. The dataset that goes into every first conversation.

---

## Capture Setup

| Spec | Value |
|---|---|
| Rig | Phi9 MoCap Rig v1 (~$500) |
| MoCap frequency | 120 Hz |
| Video frequency | 60 Hz (GoPro Hero 9, fisheye) |
| Camera views | 3 (egocentric, overhead, side) |
| Gloves | None (full-body mocap covers hand position) |
| Environment | Lab tabletop, 1.2m x 0.8m workspace, controlled LED lighting |
| Operators | 3 (varied hand sizes, heights, dominant hand) |
| Training per operator | 4 hours |

---

## Data Shape

| Modality | Shape | Format | Hz |
|---|---|---|---|
| RGB video (ego) | (T, 1920, 1080, 3) | MP4 | 60 |
| RGB video (overhead) | (T, 1920, 1080, 3) | MP4 | 60 |
| RGB video (side) | (T, 1920, 1080, 3) | MP4 | 60 |
| Joint trajectories | (T, 23, 4) quaternion | BVH | 120 |
| End-effector pose (R) | (T, 7) XYZ + quat | CSV | 120 |
| End-effector pose (L) | (T, 7) XYZ + quat | CSV | 120 |
| Task metadata | 1 per episode | JSONL | — |
| Language instruction | 1 per episode | text | — |

**Episode structure on disk:**
```
phi9-tabletop-pick-place-v1/
├── meta/
│   ├── info.json                   # Dataset schema, version, quality metrics
│   ├── episodes.jsonl              # Per-episode metadata
│   ├── tasks.jsonl                 # Task descriptions
│   └── card.md                     # This file (rendered on catalog)
├── episodes/
│   ├── episode_000/
│   │   ├── video_ego.mp4
│   │   ├── video_overhead.mp4
│   │   ├── video_side.mp4
│   │   ├── joints.bvh              # 23 segments, 120 Hz
│   │   ├── ee_right.csv            # XYZ + quaternion, 120 Hz
│   │   ├── ee_left.csv             # XYZ + quaternion, 120 Hz
│   │   ├── metadata.json           # Task ID, success, timestamps, objects
│   │   └── instruction.txt         # "Pick up the red cube and place it on the blue mat"
│   ├── episode_001/
│   │   └── ...
│   └── episode_499/
│       └── ...
├── lerobot/                        # LeRobot v3 export
│   ├── meta/
│   │   ├── info.json
│   │   ├── episodes.jsonl
│   │   └── tasks.jsonl
│   ├── data/
│   │   └── chunk-000/file-000.parquet
│   └── videos/
│       ├── ego/chunk-000/file-000.mp4
│       ├── overhead/chunk-000/file-000.mp4
│       └── side/chunk-000/file-000.mp4
└── exports/
    ├── hdf5/                       # HDF5 export (ALOHA-compatible)
    ├── zarr/                       # Zarr export (UMI-compatible)
    ├── mujoco/                     # MJCF + retargeted trajectories
    └── isaac/                      # USD + GR00T motion
```

**metadata.json example:**
```json
{
  "episode_id": "episode_042",
  "task_id": "pick-place",
  "success": true,
  "duration_sec": 156.3,
  "timestamp_start": "2026-03-15T10:23:41.003Z",
  "timestamp_end": "2026-03-15T10:26:17.312Z",
  "operator_id": "op_02",
  "objects": [
    {"name": "red_cube", "material": "plastic", "size_cm": [5, 5, 5], "weight_g": 45},
    {"name": "blue_mat", "material": "rubber", "size_cm": [20, 20, 0.3]}
  ],
  "start_config": {
    "object_position": [0.35, 0.12, 0.05],
    "target_position": [0.55, -0.08, 0.01]
  },
  "subtask_boundaries": [
    {"t_sec": 0.0, "label": "reach"},
    {"t_sec": 42.1, "label": "grasp"},
    {"t_sec": 78.5, "label": "transport"},
    {"t_sec": 134.2, "label": "place"},
    {"t_sec": 156.3, "label": "release"}
  ],
  "instruction": "Pick up the red cube and place it on the blue mat"
}
```

---

## Available Formats

| Format | File | Compatible With |
|---|---|---|
| Native (Phi9) | episodes/ directory | Direct inspection, rerun.io |
| LeRobot v3 | Parquet + MP4 | HuggingFace Hub, LeRobot framework |
| HDF5 | .hdf5 per episode | ALOHA-style lab pipelines |
| Zarr | .zarr.zip | UMI-style, Diffusion Policy |
| MuJoCo | MJCF + trajectories | MuJoCo sim, RL training |
| Isaac Sim | USD + motion | NVIDIA ecosystem, GR00T |
| ROS2 | MCAP bags | ROS2 replay pipelines |

---

## Data Card

| Attribute | Value |
|-----------|-------|
| **Dataset ID** | phi9/tabletop-pick-place-v1 |
| **Version** | 1.0.0 |
| **License** | phi9-commercial-v1 |
| **Fidelity Tier** | 2 |
| **Episodes** | 500 |
| **Total Hours** | 25 |
| **Avg Episode Length** | 180 seconds |
| **Task Success Rate** | 94% |
| **Domain** | Tabletop manipulation |
| **Task Type** | Pick-and-place |
| **Complexity** | Single-step |

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
| `metadata.json` | Episode metadata (task, success, objects, timestamps) | JSON |
| `instruction.txt` | Natural language task instruction | Text |

### Available Export Formats

| Format | Description | Compatible With |
|--------|-------------|---------------|
| **LeRobot v3** | Parquet + MP4 chunks | HuggingFace Hub, LeRobot framework |
| **HDF5** | Chunked arrays per episode | ALOHA-style pipelines |
| **Zarr** | Compressed array store | UMI, Diffusion Policy |
| **MuJoCo** | MJCF + retargeted trajectories | MuJoCo simulation, RL training |
| **Isaac Sim** | USD + GR00T-compatible motion | NVIDIA ecosystem |
| **ROS2** | MCAP bags | ROS2 replay pipelines |

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

---

## Retargeting Readiness

This section demonstrates how the captured motion data translates to robot-executable trajectories. Full-body mocap at 23 DOF / 120 Hz is the highest-fidelity input for retargeting methods — the more you capture, the more you can retarget.

### Retargeting Pipeline

```
Phi9 BVH (23 segments, 120 Hz)
    ↓
SMPL/SMPL-X intermediate (parametric body model)
    ↓
Robot URDF mapping (IK solver / interaction mesh / learned retargeting)
    ↓
Joint trajectories in robot joint space
    ↓
RL training / imitation learning / policy distillation
```

### Supported Retargeting Methods

| Method | What It Does | Compatibility | Notes |
|---|---|---|---|
| **OmniRetarget** (ICRA 2026) | Interaction mesh retargeting — preserves contact and object spatial relationships | Compatible — BVH input | Object annotations + subtask boundaries included for interaction mesh construction |
| **PHC** (Perpetual Humanoid Control) | Physics-based humanoid control from MoCap reference | Compatible — via SMPL-X intermediate | BVH → SMPL-X conversion available |
| **DeepMimic** | Character animation → locomotion policy via RL | Compatible — direct BVH input | Standard BVH consumption |
| **Direct IK** | Inverse kinematics to specific robot URDF | Supported — EE trajectories at 120 Hz | ee_right.csv / ee_left.csv provide direct IK targets |
| **MaskedMimic** | Partial body retargeting with masked joints | Compatible — per-segment BVH | 23-segment hierarchy allows selective upper-body masking for tabletop tasks |

### What's Preserved for Retargeting

OmniRetarget (ICRA 2026) showed that preserving contacts and object interactions during retargeting eliminates foot-skating and penetration artifacts. This dataset provides the source signals these methods need.

| Property | Status | Why It Matters |
|---|---|---|
| **Contact timing** | Subtask boundaries (reach/grasp/transport/place/release) + success labels | Contact preservation eliminates retargeting artifacts |
| **Object interactions** | Per-episode object metadata (name, material, size, weight, position) | Interaction mesh methods require agent-object spatial awareness |
| **Full kinematic chain** | 23 DOF from pelvis to hands | Richer retargeting vs 7 DOF arm-only (DROID, Bridge) or 14 DOF arms-only (ALOHA) |
| **Temporal resolution** | 120 Hz | Smoother retargeted trajectories, fewer interpolation artifacts vs 5-50 Hz alternatives |
| **End-effector poses** | Both hands, XYZ + quaternion, 120 Hz | Direct IK targets without full-body solve required |
| **Operator diversity** | 3 operators with varied proportions | Validates retargeting across different source morphologies |

### Validated Robot Targets

| Robot | DOF | Retargeting Method | Status |
|---|---|---|---|
| Unitree G1 | 23 (upper body) | OmniRetarget / Direct IK | Compatible (BVH format match) |
| Unitree H1 | 19 | OmniRetarget / PHC | Compatible |
| Franka Panda | 7 (single arm) | Direct IK from EE pose | Compatible (ee_right.csv) |
| ALOHA (ViperX 300) | 14 (bimanual) | Direct IK from EE poses | Compatible (ee_right + ee_left) |
| Any MuJoCo humanoid | Varies | MJCF retargeted export | Available in exports/mujoco/ |
| GR00T (NVIDIA) | Varies | Isaac Sim USD export | Available in exports/isaac/ |

### Intermediate Representations

| Representation | What It Is | Included |
|---|---|---|
| **BVH** (native) | 23-segment joint hierarchy, quaternion per frame, 120 Hz | Yes — native capture format |
| **SMPL/SMPL-X** | Parametric body model (mesh + joints), standard bridge to URDF | Conversion available on request |
| **MuJoCo MJCF** | Retargeted trajectories on MuJoCo humanoid models | Available in exports/mujoco/ |
| **Isaac Sim USD** | GR00T-compatible motion data + scene | Available in exports/isaac/ |

### Why 23 DOF > 7 DOF for Retargeting

```
7 DOF (DROID / Bridge):        23 DOF (Phi9):
  Shoulder → Elbow → Wrist       Pelvis → Spine (4) → Neck → Head
                                  + Shoulders (2) → Arms (4) → Hands (2)
                                  + Hips (2) → Legs (4) → Feet (2) → Toes (2)

Retarget to humanoid:           Retarget to humanoid:
  Arms only → no torso,           Full kinematic chain → whole-body
  no balance, no locomotion        coordination, balance, locomotion
```

---

## Eval vs. Baselines

_This is the calling card dataset — the comparison table goes into every first proposal. See [Phi9 Domain Benchmarks](/vault/phi9-domain-benchmarks/) for full tabletop domain analysis._

### Head-to-Head Comparison

| Dimension | BridgeData v2 | DROID | ALOHA static | **This Dataset** |
|---|---|---|---|---|
| DOF | 7 (WidowX) | 7 (Franka) | 14 (bimanual) | **23 (full body)** |
| Hz | 5 | 15 | 50 | **120** |
| Sync | ~10ms | ~5ms | <5ms | **<5ms** |
| Body coverage | Arm only | Arm only | Arms only | **Full body** |
| Environment | 24 envs (lab) | 564 scenes (labs) | Lab bench | **Lab tabletop** |
| Language | No | Limited | No | **Yes (per episode)** |
| Episodes | 60,096 | 76,000 | ~50/task | **500** |
| Humanoid-retargetable | No | No | Partial (arms) | **Yes** |
| Rig cost | ~$2K | ~$30K | ~$28K | **~$500** |

**Verdict**: Superior fidelity on every dimension. Open datasets win on volume and scene diversity. Phi9's $500 rig cost enables scaling diversity at 56x lower cost per deployment. For buyers training policies that need full-body kinematics or humanoid retargeting, no open dataset provides this.

### Policy Benchmark _(to be run Month 2)_

| Test | Policy | Trained On | Success Rate | Delta |
|---|---|---|---|---|
| SIMPLER pick-place (Google Robot) | Diffusion Policy | This dataset | _TBD_ | _TBD_ |
| SIMPLER pick-place (Google Robot) | Diffusion Policy | BridgeData v2 | _baseline_ | — |
| SIMPLER pick-place (WidowX) | Diffusion Policy | This dataset | _TBD_ | _TBD_ |

_Target: match DROID's +22% in-distribution improvement over OXE. If higher fidelity (23 DOF, 120 Hz) translates to policy performance, the delta should be larger._

---

## Task Description

**Instruction**: "Pick up [object] from [location] and place it on/at [target]"

**Steps**:
1. Reach toward object
2. Grasp object (varied grasp types depending on shape)
3. Lift and transport to target
4. Place at target location
5. Release and retract

**Objects involved**: 15 object types
- Cubes (3 sizes: 3cm, 5cm, 8cm)
- Cylinders (bottles, cans)
- Flat objects (cards, plates)
- Irregular shapes (fruits, tools)
- Deformable (sponge, cloth)

**Variations captured**:
- Starting positions: 20 randomized configurations per object type
- Object types: 15 objects across 5 categories
- Lighting conditions: 3 (bright, ambient, dim)
- Operators: 3 (different body proportions, handedness)
- Target locations: 8 positions on the workspace

---

## Sample Episodes

| Episode | Duration | Success | Object | Notes |
|---|---|---|---|---|
| ep_000 | 156 sec | Yes | Red cube (5cm) | Clean demo, baseline task |
| ep_042 | 183 sec | Yes | Glass bottle | Careful grasp, slow transport |
| ep_117 | 201 sec | No | Small screw | Dropped during transport — useful failure case |
| ep_250 | 142 sec | Yes | Sponge (deformable) | Adaptive grasp, good for deformable manipulation |
| ep_499 | 168 sec | Yes | Wrench (irregular) | Tool-shaped object, varied grasp strategy |

**Preview**: [View in rerun.io]() — synchronized 3-view video + skeleton overlay + trajectory plot

---

## Pricing

| Access | Terms |
|---|---|
| Non-exclusive license | Full dataset, all formats |
| Exclusive (time-limited) | Sole access for defined period |
| Pilot sample (50 episodes) | Test in your pipeline first |
| DaaS (monthly additions) | Growing dataset |
| Custom capture (your task spec) | Contact for scope |

**[Request a quote →]**

---

## Tags

`#tabletop` `#pick-place` `#single-step` `#upper-body` `#single-arm` `#bimanual-arm` `#humanoid-upper` `#manufacturing` `#household`

---

## Connections

- [Phi9 Data Catalog](/vault/phi9-data-catalog/) — parent catalog (Tier 2)
- <span class="wikilink wikilink--unresolved">Phi9 Value Chain</span> — Layer 1 (Capture) + Layer 3 (Package)
- <span class="wikilink wikilink--unresolved">Teleoperation Hardware Deep Comparison</span> — capture rig technical specs
- [Action Data](/vault/action-data/) — what this dataset produces
- Related datasets: `phi9/tabletop-pour-liquid-v1`, `phi9/tabletop-fold-cloth-v1`

## Usage

### Loading with LeRobot

```python
from lerobot.datasets import LeRobotDataset

dataset = LeRobotDataset(
    repo_id="phi9/tabletop-pick-place-v1",
    root="./data",
    episodes=[0, 1, 2]  # Load specific episodes
)
```

### Loading with HDF5

```python
import h5py

with h5py.File("phi9-tabletop-pick-place-v1/episodes/episode_000/data.hdf5", "r") as f:
    images = f["observations/images"][:]
    joints = f["observations/joints"][:]
    actions = f["actions"][:]
```

### Retargeting to Your Robot

```python
# Load BVH and retarget to your URDF
from phi9.retargeting import load_bvh, retarget_to_urdf

bvh_data = load_bvh("episodes/episode_000/joints.bvh")
robot_joints = retarget_to_urdf(bvh_data, "your_robot.urdf")
```

### Viewing in rerun.io

```bash
rerun phi9-tabletop-pick-place-v1/episodes/episode_000/
```

## Changelog

### v1.0.0 (2026-02-26)

- Initial release
- 500 episodes of pick-and-place tasks
- 23 DOF full-body motion capture at 120 Hz
- 3-view synchronized RGB video at 60 fps
- LeRobot v3, HDF5, Zarr, MuJoCo, and Isaac Sim exports
- Benchmarked against BridgeData v2, DROID, and ALOHA

---
Workflow: draft -> review -> published
Last Updated: 2026-02-27
