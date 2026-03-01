---
title: Phi9 Data Catalog
description: >-
  Training data for robot learning — from egocentric video to full-body motion
  capture to sim-ready demonstrations. The complete catalog of Phi9 datasets and
  services.
publish: false
type: note
category: research
datasetKind: other
tags:
  - full-note
  - catalog
  - phi9
  - datasets
  - motion-capture
status: published
featured: true
slug: phi9-data-catalog
aliases: []
sourcePath: Phi9 Data Catalog.md
date: '2026-02-26T00:00:00.000Z'
updated: '2026-02-27T00:00:00.000Z'
---
# Phi9 Data Catalog

> Training data for robot learning — from egocentric video to full-body motion capture to sim-ready demonstrations.

---

## Types of Robotics Training Data

Three types of data exist for training robot policies. Each captures something different, in a different format, at a different fidelity. Understanding where each sits is how you understand where Phi9 fits.

### Egocentric Video Data

Human wears a camera, performs a task. You get video from their perspective.

**What you capture**: RGB video (first-person POV), sometimes narration
**What you DON'T capture**: Joint positions, body pose, hand configuration, force
**Formats**: MP4 video, text narration, action labels (JSONL)
**Who makes it**: Ego4D (3,670 hrs), Epic-Kitchens (100 hrs), Something-Something (220K clips)

**Limitations**: No action signal. A robot can't learn joint-level control from video alone — it sees WHAT happened but not HOW the body moved. Good for visual pre-training and scene understanding. Not enough for policy training.

### Teleoperated (Robot) Data

Human controls a robot remotely. The robot records its own joint states as it moves.

**What you capture**: Robot joint angles, end-effector poses, gripper state, RGB from robot-mounted cameras
**What you DON'T capture**: Human body pose, full kinematic chain, anything beyond the robot's own sensors
**Formats**: HDF5 (ALOHA), Zarr (UMI), Pickle (GELLO), Parquet (LeRobot), RLDS (OXE)
**Who makes it**: ALOHA (14 DOF, 50 Hz), DROID (7 DOF, 15 Hz), BridgeData (7 DOF, 5 Hz), UMI (6 EEF, 60 Hz)

**Limitations**: Robot-native but limited to the robot's own DOF. ALOHA captures 14 joints (arms only). DROID captures 7 (single arm). Nobody captures full-body kinematics — because there's no robot in the loop that HAS a full body. Expensive per rig ($2K-$28K). One lab, one setup, one environment.

### Motion Capture Data

Human performs a task naturally. A motion capture system records their full body — every joint, every segment, at high frequency.

**What you capture**: Full-body joint trajectories (23+ segments), end-effector poses, body orientation, optionally hand DOF (with gloves)
**What you DON'T capture**: Robot-native joint states (needs retargeting to a specific robot URDF)
**Formats**: BVH (standard mocap), MVNX (Xsens), FBX (animation), C3D (optical), CSV
**Who makes it**: CMU MoCap (2,500 sequences, 120 Hz), AMASS (40+ datasets), LAFAN1 (77 sequences, 30 fps)

**What makes it different**: Full kinematic chain. 23 body segments from pelvis to fingertips, at 120 Hz. This is what humanoid robots need — they have full bodies, and they need to learn from demonstrations that capture full-body movement, not just arms.

**Limitation of existing mocap datasets**: They capture GENERAL motion (walking, dancing, gestures) — not TASK-SPECIFIC manipulation. CMU MoCap has someone walking. It doesn't have someone walking to a table, picking up an object, carrying it across the room, and placing it somewhere. That's the gap.

---

## What Phi9 Captures

Phi9 fills the gap between teleoperated data (task-specific but arm-only) and motion capture data (full-body but not task-specific).

### The Motion Capture Rig

**The suit**: Custom IMU-based motion capture system (~$500/unit). 23 body segments at 120 Hz. No external cameras or markers needed — works in any environment (factory floor, kitchen, warehouse, outdoors). Based on expertise from Ultrahuman's sensor hardware.

**The cameras**: 3 synchronized views — egocentric (chest/head-mounted), overhead, side. 1080p at 60 fps. GoPro Hero 9 (fisheye).

**The sync**: All sensors synchronized to <5ms. Video frames align with mocap frames. When you see the hand reach for an object in the video, the corresponding joint trajectory is at the exact same timestamp.

**Optional gloves**: UDCAP (21 DOF per hand, ~$700) or MANUS (25 DOF, ~$3,800) for finger-level tracking. Adds dexterous hand data on top of full-body mocap.

### What the Rig Produces

For every episode, you get:

| Modality | What | Format | Hz |
|---|---|---|---|
| RGB video (ego) | First-person view, 1080p | MP4 | 60 |
| RGB video (overhead) | Bird's eye view | MP4 | 60 |
| RGB video (side) | Profile view | MP4 | 60 |
| Joint trajectories | 23 body segments, quaternion orientation | BVH | 120 |
| End-effector pose (R) | Right hand XYZ + quaternion | CSV | 120 |
| End-effector pose (L) | Left hand XYZ + quaternion | CSV | 120 |
| Task metadata | Task ID, success, objects, timestamps | JSONL | per episode |
| Language instruction | Natural language task description | text | per episode |
| Subtask boundaries | Labeled phase transitions (reach, grasp, transport, place) | JSONL | per episode |

### Why This is Higher Fidelity

| Dimension | Teleoperated (ALOHA/DROID) | Existing MoCap (CMU/AMASS) | **Phi9** |
|---|---|---|---|
| DOF | 7-14 (arm joints) | Full body (but general motion) | **23 (full body, task-specific)** |
| Hz | 5-50 | 100-120 | **120** |
| Body coverage | Arms only | Full body | **Full body** |
| Task specificity | Yes (pick, place, assemble) | No (walk, dance, gesture) | **Yes (pick, place, assemble, carry)** |
| Environment | Lab bench | Studio | **Real (factory, kitchen, warehouse)** |
| Video | 1-2 robot cameras | None | **3 synchronized views** |
| Language | Sometimes | No | **Every episode** |
| Object metadata | Sometimes | No | **Every episode** |
| Rig cost | $2K-$28K | $2.7K-$20K (Rokoko/Xsens) | **~$500** |

The key: **task-specific full-body motion capture with synchronized video and language annotations from real environments.** Nobody else has this combination.

**See it in action:** The capture workflow — human in motion capture suit performing tasks, full-body kinematics streaming in real time — is demonstrated in [this Xsens humanoid robotics video](https://www.xsens.com/health-sports/humanoid-robotics-motion-training). This is exactly what Phi9 does, at a fraction of the cost. Phi9 capture demos coming soon.

See <span class="wikilink wikilink--unresolved">Phi9 Data Collection Strategy</span> for rig benchmarks vs. Rokoko and Xsens.

---

## Data Formats

Formats matter because every lab has a different pipeline. If your data doesn't load into their system, it doesn't matter how good it is.

### Native Phi9 Format

This is what comes off the rig:

| File | What's Inside | Standard |
|---|---|---|
| `joints.bvh` | Full-body joint trajectories. 23 segments, quaternion orientation per frame, 120 Hz. Hierarchical skeleton definition + per-frame motion data. | BVH (Biovision Hierarchy) — the universal mocap format. Readable by MuJoCo, Blender, Maya, MotionBuilder, any mocap tool. |
| `ee_right.csv` / `ee_left.csv` | End-effector pose per frame. 7 values: XYZ position + quaternion orientation. 120 Hz. | CSV — universally readable. |
| `video_ego.mp4` / `video_overhead.mp4` / `video_side.mp4` | Synchronized RGB video. H.264, 1080p, 60 fps. | MP4 — standard video. |
| `metadata.json` | Episode-level: task ID, success/fail, duration, operator, objects, start/end config. | JSON — standard structured data. |
| `instruction.txt` | Natural language task instruction. | Plain text. |

### BVH — What's Actually in the File

BVH is the core format. It contains:

```
HIERARCHY                          ← Skeleton definition
ROOT Hips                          ← Root joint
{
  OFFSET 0.0 0.0 0.0
  CHANNELS 6 Xposition Yposition Zposition Zrotation Xrotation Yrotation
  JOINT Spine
  {
    OFFSET 0.0 20.0 0.0
    CHANNELS 3 Zrotation Xrotation Yrotation
    JOINT Spine1
    {
      ...23 segments total...
    }
  }
}
MOTION                             ← Frame data
Frames: 18000                      ← 150 sec × 120 Hz
Frame Time: 0.008333               ← 1/120 sec
0.0 85.2 0.0 -1.2 3.4 0.8 ...     ← Frame 0: all joint values
0.0 85.3 0.0 -1.1 3.5 0.9 ...     ← Frame 1
...
```

The hierarchy defines the skeleton (what connects to what). The motion section has one row per frame, one value per channel per joint. 23 segments × 3 rotation channels = 69+ values per frame, 120 times per second.

This is what gets retargeted to a robot URDF. The joint hierarchy maps to the robot's kinematic chain. More segments = richer retargeting. 23 segments (Phi9) vs. 7 joints (DROID) means you can retarget to a humanoid, not just an arm.

### Export Formats

Every dataset ships in the native format PLUS any combination of these exports:

| Format | What It Contains | Who Uses It | When to Use |
|---|---|---|---|
| **LeRobot v3** | Parquet (tabular action data) + MP4 (video chunks) | HuggingFace ecosystem, LeRobot framework | Policy training with LeRobot, sharing on HF Hub |
| **HDF5** | Chunked arrays — joint data + video frames + metadata in one file per episode | ALOHA-style lab pipelines, custom training loops | Labs that already use HDF5 (most academic labs) |
| **Zarr** | Compressed array store — similar to HDF5 but cloud-friendly | UMI pipelines, Diffusion Policy training | Cloud-based training, large-scale data loading |
| **MuJoCo** | MJCF XML (scene definition) + retargeted joint trajectories on a humanoid model | MuJoCo simulation, RL training | Sim-to-real, policy training in simulation |
| **Isaac Sim** | USD scene + GR00T-compatible motion data | NVIDIA ecosystem, GR00T training | Humanoid training, NVIDIA pipeline users |
| **ROS2** | MCAP bags — timestamped multi-modal data | ROS2 replay, real robot deployment | Labs with ROS2 infrastructure |

The point: **you pick the format, we deliver it.** No conversion work on your end.

---

## Tasks, Episodes, and Metadata

### What is an Episode

An episode is one complete execution of a task. Start to finish. Reach for the object → grasp it → move it → place it → release.

Each episode is a self-contained unit: it has a beginning, an end, a success/failure label, and all the data modalities synchronized across the full duration.

**Typical episode**: 2-5 minutes. Task-dependent — simple pick-place is shorter, multi-step assembly is longer.

### Task Definitions

Tasks follow industry-standard definitions used by existing benchmarks. This makes comparison direct.

| Task Type | What It Is | Example Instruction | Benchmark Comparison |
|---|---|---|---|
| **Pick-place** | Pick up object, place at target | "Pick up the red cube and place it on the blue mat" | SIMPLER, BridgeData v2 |
| **Pour** | Pour liquid from one container to another | "Pour water from the bottle into the cup" | RoboCasa |
| **Fold** | Fold deformable material | "Fold the towel in half" | RoboCasa, CALVIN |
| **Assembly** | Combine parts (insert, screw, align) | "Insert the bracket and tighten the screw" | FMB, IndustReal |
| **Tool use** | Use a tool to accomplish a task | "Use the screwdriver to drive the screw" | FMB, RLBench |
| **Carry** | Walk while holding an object | "Carry the tray to the table" | HumanoidBench |
| **Inspect** | Visual inspection, sort pass/fail | "Check the PCB for defects" | Custom |

Each task maps to domain-specific benchmarks from [Phi9 Domain Benchmarks](/vault/phi9-domain-benchmarks/). When we say "pick-place," we mean the same pick-place that SIMPLER evaluates.

### Episode Metadata

Every episode ships with structured metadata. This is what turns raw data into training data:

```json
{
  "episode_id": "episode_042",
  "task_id": "assembly-bracket",
  "success": true,
  "duration_sec": 156.3,
  "operator_id": "op_02",
  "objects": [
    {"name": "L-bracket", "material": "aluminum", "size_cm": [8, 5, 2], "weight_g": 120},
    {"name": "mounting_plate", "material": "steel", "size_cm": [20, 15, 1]}
  ],
  "subtask_boundaries": [
    {"t_sec": 0.0, "label": "reach"},
    {"t_sec": 32.1, "label": "grasp_bracket"},
    {"t_sec": 58.5, "label": "align"},
    {"t_sec": 94.2, "label": "insert_screw"},
    {"t_sec": 134.7, "label": "tighten"},
    {"t_sec": 156.3, "label": "release"}
  ],
  "instruction": "Pick up the L-bracket and screw it onto the mounting plate"
}
```

**What this enables:**
- **Subtask boundaries** → train action-chunking policies (ACT, Diffusion Policy)
- **Object metadata** → filter by material, size, shape for specific grasping research
- **Success labels** → curate quality, remove failed demonstrations
- **Language instructions** → train VLA models (language-conditioned policies)
- **Operator ID** → study cross-operator consistency (Consistency Matters framework)

### How This Maps to the Model Card

Every dataset gets a model card. The card is the structured container for all of this:

```yaml
# ─── IDENTITY ───
name: "phi9/factory-assembly-bracket-v1"
version: 1.0.0
fidelity_tier: 2

# ─── CAPTURE ───
capture:
  rig: "Phi9 MoCap Rig v1"
  mocap_hz: 120
  video_hz: 60
  cameras: 3
  environment: "Factory floor, Chennai, India"
  operators: 3

# ─── DATA ───
data:
  episodes: 250
  total_hours: 12.5
  modalities:
    - rgb_video:    { views: 3, resolution: "1920x1080", fps: 60 }
    - joint_traj:   { dof: 23, hz: 120, format: "BVH" }
    - ee_pose:      { hz: 120, format: "XYZ + quaternion" }
    - metadata:     { format: "JSONL", per_episode: true }
    - language:     { per_episode: true }

# ─── QUALITY ───
quality:
  sensor_sync_ms: 3.2
  action_smoothness_jerk: 0.014
  episode_consistency_var: 0.12
  task_success_rate: 0.94

# ─── BENCHMARKED AGAINST ───
benchmarks:
  domain: "manufacturing"
  open_datasets: ["FMB (22.5K eps, 7 DOF)", "IndustReal (7 DOF, sim+real)"]
  advantage: "+16 DOF, +105 Hz, real factory, language annotations"

# ─── FORMATS ───
formats: [lerobot_v3, hdf5, zarr, mujoco, isaac_sim, ros2]

# ─── TAGS ───
tags:
  domain: "manufacturing"
  task_type: "assembly"
  complexity: "multi-step"
  robot_targets: ["humanoid-upper", "bimanual-arm", "single-arm"]
```

The model card is what a buyer reads to understand exactly what they're getting. Specs, quality, formats, benchmarks — all in one place. See <span class="wikilink wikilink--unresolved">Dataset Card Template</span> for the full template.

---

## What a Dataset Looks Like on Disk

```
phi9-factory-bracket-assembly-v1/
├── meta/
│   ├── info.json                   # Dataset schema, version, quality metrics
│   ├── episodes.jsonl              # Per-episode metadata
│   ├── tasks.jsonl                 # Task descriptions
│   └── card.md                     # Dataset card (rendered on catalog)
├── episodes/
│   ├── episode_000/
│   │   ├── video_ego.mp4           # Egocentric view, 1080p, 60 fps
│   │   ├── video_overhead.mp4      # Overhead view
│   │   ├── video_side.mp4          # Side view
│   │   ├── joints.bvh             # 23 segments, 120 Hz
│   │   ├── ee_right.csv           # Right hand: XYZ + quaternion, 120 Hz
│   │   ├── ee_left.csv            # Left hand: XYZ + quaternion, 120 Hz
│   │   ├── metadata.json          # Task ID, success, timestamps, objects
│   │   └── instruction.txt        # "Pick up the bracket and screw it on"
│   ├── episode_001/
│   └── ...
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
    ├── hdf5/                       # ALOHA-compatible
    ├── zarr/                       # UMI / Diffusion Policy compatible
    ├── mujoco/                     # MJCF + retargeted trajectories
    └── isaac/                      # USD + GR00T motion
```

---

## What We Benchmark and Why

### Data Type Benchmark — Where Does Each Type Sit?

| What We Compare | Egocentric Video | Teleoperated (Robot) | Motion Capture (Phi9) |
|---|---|---|---|
| **Action signal** | None (video only) | Robot joints (7-14 DOF) | **Full body joints (23 DOF)** |
| **Body coverage** | Visual only | Arms only | **Full body (pelvis to fingertips)** |
| **Frequency** | 30-60 fps (video) | 5-50 Hz (joint states) | **120 Hz (joints) + 60 fps (video)** |
| **Environment** | Real (varied) | Lab bench (mostly) | **Real (factory, kitchen, warehouse)** |
| **Retargetable to humanoid** | No | Arms only | **Yes (full kinematic chain)** |
| **Use case** | Visual pre-training | Policy training (arm robots) | **Policy training (humanoids + arms)** |
| **Volume available** | Massive (Ego4D: 3,670 hrs) | Moderate (DROID: 350 hrs) | **Growing (Phi9 catalog)** |

**Where egocentric makes sense**: Pre-training visual representations, world models, scene understanding. Cheap and abundant.

**Where teleoperated makes sense**: Training arm robot policies for specific tasks in specific labs. The data is robot-native — no retargeting needed.

**Where motion capture (Phi9) makes sense**: Training humanoid policies, cross-embodiment transfer, tasks that need full-body coordination, dexterous manipulation, real-environment deployment. The data captures HOW the human moved — every joint — not just what the robot arm did.

### Data Quality Benchmark — Spec-by-Spec Comparison

| Dataset | Type | DOF | Hz | Sync | Body | Environment | Language |
|---|---|---|---|---|---|---|---|
| **Phi9 (Tier 2+)** | MoCap | **23** | **120** | **<5ms** | **Full body** | **Real** | **Yes** |
| ALOHA static | Teleop | 14 | 50 | <5ms | Arms only | Lab | No |
| DROID | Teleop | 7 | 15 | ~5ms | Arm only | 564 lab scenes | Limited |
| BridgeData v2 | Teleop | 7 | 5 | ~10ms | Arm only | 24 environments | No |
| UMI | Teleop | 6 (EEF) | 60 | Post-hoc | EEF only | Portable | No |
| Open X-Embodiment | Mixed | 3-14 | 10-50 | Varies | Varies | Varies | Varies |
| CMU MoCap | MoCap | Full body | 120 | <1ms | Full body | Studio | No |
| LAFAN1 | MoCap | Full body | 30 | <1ms | Full body | Studio | No |
| Ego4D | Video | 0 | 30 | — | Visual only | Real (varied) | Narration |

### Data Utility Benchmark — Where Does Each Make More Sense?

| Use Case | Best Data Type | Why | Phi9 Relevant? |
|---|---|---|---|
| **Humanoid whole-body control** | Motion capture (full body) | Need full kinematic chain for locomotion + manipulation | **Yes — this is the primary use case** |
| **Arm robot pick-place** | Teleoperated (robot-native) | Direct joint mapping, no retargeting | **Yes — retarget from mocap to arm URDF** |
| **Dexterous hand manipulation** | MoCap + hand tracking | Need finger DOF, not just gripper open/close | **Yes (Tier 3 with gloves)** |
| **Sim-to-real training** | MoCap → sim conversion | Joint trajectories import cleanly to MuJoCo/Isaac | **Yes (Tier 4, sim-ready)** |
| **Visual pre-training** | Egocentric video (volume) | Need scale, diverse scenes, visual variety | **Partially (Tier 0-1 via GridAI)** |
| **Factory automation** | Task-specific from real environments | Need real lighting, surfaces, clutter | **Yes — real factory capture** |
| **Cross-embodiment transfer** | Full-body MoCap (embodiment-agnostic) | Retarget same demo to any robot URDF | **Yes — 23 DOF maps to any humanoid** |

### Domain Benchmarks — Proving Quality Per Task

For each task domain, existing benchmarks and open datasets define the baseline. We benchmark against those — not against an internal score.

| Domain | What We Benchmark Against | What We Show |
|---|---|---|
| **Tabletop** | BridgeData v2 (60K, 7 DOF, 5 Hz), DROID (76K, 7 DOF, 15 Hz) | Spec comparison + visual in rerun.io + policy benchmark on SIMPLER |
| **Manufacturing** | FMB (22.5K, 7 DOF), IndustReal (sim+real) | Spec comparison + real factory vs lab bench + assembly benchmark |
| **Household** | CALVIN (sim, 7 DOF), RoboCasa (sim) | Real environment data vs sim-only + long-horizon task chains |
| **Locomotion** | CMU MoCap (general motion), LAFAN1 (animation, 30 fps) | Task-specific motion vs general + 4x Hz + LAFAN1 quality metrics (L2Q, L2P, NPSS) |
| **Dexterous** | DexCap (hands only), DexGraspNet (sim only) | Full body + hands vs hands-only or sim-only |
| **Logistics** | DROID (varied), ARMBench (Amazon) | Warehouse-specific capture — gap in the market |

Full per-domain details in [Phi9 Domain Benchmarks](/vault/phi9-domain-benchmarks/).

---

## The Data Tiers

| Tier | What You Get | Explore With |
|---|---|---|
| **0-1: Egocentric video** | RGB video + action labels + language instructions | rerun.io (video + timeline) |
| **2: Motion capture + video** | 23 DOF joints (120 Hz) + 3-view video (60 fps) + metadata | rerun.io (video + skeleton + trajectory) / MuJoCo (retargeted replay) |
| **3: Upper body + hands** | Tier 2 + finger-level tracking (21-25 DOF per hand) | rerun.io (+ hand overlay) / MuJoCo (+ dexterous hand models) |
| **4: Sim-ready** | Tier 2-3 + MuJoCo scene + Isaac Sim scene + environment reconstruction | MuJoCo (full scene) / Isaac Sim (USD + GR00T) |
| **5: Synthetically extended** | Any tier + 10x-100x synthetic variations (world model augmented) | Isaac Sim (variants browser) / rerun.io (real vs synthetic) |

---

## The Dataset Menu

### Live Datasets

```dataview
TABLE
  dataset_id as "Dataset",
  fidelity_tier as "Tier",
  episodes as "Episodes",
  domain as "Domain",
  task_type as "Task",
  status as "Status"
FROM "5 - Full Notes"
WHERE type = "dataset-card"
SORT fidelity_tier DESC
```

**First dataset card**: [phi9-tabletop-pick-place-v1](/datasets/phi9-tabletop-pick-place-v1/) — 500 episodes, Tier 2, benchmarked against BridgeData v2 + DROID + ALOHA

### Planned Datasets

**Tabletop / Manipulation**

| Dataset | Task | Episodes | Tier | Benchmarked Against |
|---|---|---|---|---|
| `phi9/tabletop-pick-place-v1` | Pick varied objects, place at target | 500 | 2 | BridgeData v2, DROID, ALOHA |
| `phi9/tabletop-pour-liquid-v1` | Pour water from bottle into cup | 200 | 2 | RoboCasa |
| `phi9/tabletop-fold-cloth-v1` | Fold towel / t-shirt | 150 | 2 | RoboCasa, CALVIN |
| `phi9/tool-use-screwdriver-v1` | Pick screwdriver, drive screw | 200 | 3 | FMB, RLBench |

**Manufacturing**

| Dataset | Task | Episodes | Tier | Benchmarked Against |
|---|---|---|---|---|
| `phi9/factory-bracket-assembly-v1` | Pick bracket, screw onto plate | 250 | 2 | FMB, IndustReal |
| `phi9/factory-wire-routing-v1` | Route cable through channel + clip | 150 | 2 | FMB |
| `phi9/factory-pcb-insertion-v1` | Insert component into PCB socket | 300 | 2 | FMB, IndustReal |
| `phi9/factory-packing-box-v1` | Pack items into shipping box | 200 | 2 | ARMBench, DROID |

**Locomotion / Whole-Body**

| Dataset | Task | Episodes | Tier | Benchmarked Against |
|---|---|---|---|---|
| `phi9/walk-carry-object-v1` | Walk while carrying tray / box | 300 | 4 | CMU MoCap, LAFAN1, HumanoidBench |
| `phi9/stair-climb-v1` | Climb stairs with handrail | 200 | 4 | HumanoidBench |
| `phi9/crouch-pick-floor-v1` | Bend down, pick from floor, stand up | 250 | 4 | CMU MoCap, LAFAN1 |

Every dataset ships as a model card maintained in this vault. New cards use <span class="wikilink wikilink--unresolved">Dataset Card Template</span>.

---

## Services

### Data Processing

| Service | What We Do | Input | Output |
|---|---|---|---|
| **Format conversion** | Convert between any supported format | Your dataset in any format | Same data in LeRobot / HDF5 / Zarr / MuJoCo / Isaac / ROS2 |
| **Episode chunking** | Segment continuous recordings into structured episodes | Raw continuous video + mocap | Episode-structured data with start/end boundaries |
| **Action labeling** | Add language instructions, subtask boundaries, object annotations | Unlabeled episodes | Labeled episodes with JSONL metadata |
| **Retargeting** | Map human mocap to your robot's specific kinematic chain | BVH (human) + URDF (your robot) | Joint trajectories in your robot's joint space |
| **MoCap overlay** | Re-capture existing scenarios with the Phi9 rig | Task description + environment access | Full mocap dataset (Tier 2+) |
| **Synthetic extension** | Multiply real data 10x-100x through world model pipeline | Base dataset (any tier) | Extended dataset with environment/viewpoint variations |

### Data Collection

Tell us the task, the environment, the objects. We deploy the rig and deliver a custom dataset.

| What You Specify | What We Deliver |
|---|---|
| Task definition (what actions, what objects) | Captured episodes with full mocap + video |
| Environment (factory, kitchen, lab, warehouse) | Real-environment captures, not lab approximations |
| Quality requirements (success rate, episode count) | Quality-checked data meeting your spec |
| Format requirements | Data in your format, ready for your pipeline |
| Robot URDF (optional) | Pre-retargeted joint trajectories for your robot |

**[Request a quote →]** Scope depends on task complexity, environment access, and episode count.

---

## Connections

- <span class="wikilink wikilink--unresolved">Phi9 Data Collection Strategy</span> — capture rig comparison (vs Rokoko, Xsens), collection modes, scaling plan
- [Phi9 Domain Benchmarks](/vault/phi9-domain-benchmarks/) — per-domain benchmarks, open dataset comparisons
- [Phi9 Catalog Reference](/vault/phi9-catalog-reference/) — tag taxonomy, eval protocols, timeline
- <span class="wikilink wikilink--unresolved">Phi9 Proposal Template</span> — how catalog items get packaged for buyers
- <span class="wikilink wikilink--unresolved">Dataset Card Template</span> — reusable template for new dataset cards
- [phi9-tabletop-pick-place-v1](/datasets/phi9-tabletop-pick-place-v1/) — first live dataset card
- <span class="wikilink wikilink--unresolved">Phi9 x GridAI Partnership</span> — egocentric data collection at scale
- <span class="wikilink wikilink--unresolved">Phi9 Value Chain</span> — the 4-layer model behind delivery
- <span class="wikilink wikilink--unresolved">Teleoperation Hardware Deep Comparison</span> — full hardware specs
- <span class="wikilink wikilink--unresolved">Phi9 GTM Strategy</span> — where this fits in the GTM
- <span class="wikilink wikilink--unresolved">Robotics Data Market</span> — market context

---
Last Updated: 2026-02-27
