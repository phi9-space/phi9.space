---
title: Phi9 Domain Benchmarks
description: >-
  Per-domain breakdown of existing benchmarks, open datasets, SOTA numbers, and
  how Phi9 data compares across tabletop, manufacturing, household, dexterous,
  and locomotion domains.
publish: false
type: note
category: research
datasetKind: other
tags:
  - full-note
  - benchmarking
  - phi9
  - domains
  - sota
status: published
featured: true
slug: phi9-domain-benchmarks
aliases: []
sourcePath: Phi9 Domain Benchmarks.md
date: '2026-02-26T00:00:00.000Z'
updated: '2026-02-27T00:00:00.000Z'
---
# Phi9 Domain Benchmarks

See also: [Phi9 Data Catalog](/vault/phi9-data-catalog/), <span class="wikilink wikilink--unresolved">Teleoperation Hardware Deep Comparison</span>, [Action Data](/vault/action-data/)

Per-domain breakdown of existing benchmarks, open datasets, SOTA numbers, and how Phi9 data compares. This is the reference sheet for every sales conversation — know exactly what you're competing against.

---

## 1. Tabletop Manipulation

### Benchmarks

| Benchmark | Tasks | Key Metric | SOTA | Source |
|---|---|---|---|---|
| **SIMPLER** (Google Robot) | Pick-place, move near, drawer open/close | Success rate (%) + sim↔real Pearson r | CogACT: +22.4% over RT-1; Pearson r >0.9 | [simpler-env.github.io](https://simpler-env.github.io/) |
| **SIMPLER** (WidowX) | Put carrot on plate, stack blocks, put in drawer | Success rate (%) | CogACT: +17.6% over RT-1 | [arxiv.org/abs/2405.05941](https://arxiv.org/abs/2405.05941) |
| **LIBERO** | 4 task suites (lifelong learning) | Average success rate | OpenVLA-OFT: 97.1% | [github.com/Lifelong-Robot-Learning/LIBERO](https://github.com/Lifelong-Robot-Learning/LIBERO) |
| **MetaWorld+** | 50 manipulation tasks (RL) | Multi-task success rate | Varies by method | [arxiv.org/abs/2505.11289](https://arxiv.org/abs/2505.11289) |
| **RLBench** (18-task) | Pick, reach, push, stack, etc. | Multi-task average success | 3D Diffuser Actor: +18.1% over Act3D | [3d-diffuser-actor.github.io](https://3d-diffuser-actor.github.io/) |
| **FMB** | Grasping, insertion, multi-stage assembly | Task success (X/N trials) | Hierarchical: 19/30; Flat: 0/10 on multi-stage | [functional-manipulation-benchmark.github.io](https://functional-manipulation-benchmark.github.io/) |

### Open Datasets (Baselines)

| Dataset | Episodes | Hours | DOF | Hz | Robot | Link |
|---|---|---|---|---|---|---|
| **BridgeData v2** | 60,096 | ~180 | 7 (WidowX) | 5 | WidowX 250 | [rail-berkeley.github.io/bridgedata](https://rail-berkeley.github.io/bridgedata/) |
| **ALOHA static** | ~50/task | ~2.5/task | 14 (bimanual) | 50 | ViperX 300 | [tonyzhaozh.github.io/aloha](https://tonyzhaozh.github.io/aloha/) |
| **DROID** | 76,000 | 350 | 7 (Franka) | 15 | Franka Panda | [droid-dataset.github.io](https://droid-dataset.github.io/) |
| **UMI cup** | ~100 | ~1 | 6 (EEF) | 60 | Any (portable) | [umi-gripper.github.io](https://umi-gripper.github.io/) |
| **Open X-Embodiment** | 1M+ | ~2000+ | 3-14 (varies) | 3-10 | 22 robots | [robotics-transformer-x.github.io](https://robotics-transformer-x.github.io/) |
| **FMB dataset** | 22,550 | ~50 | 7 (Franka) | — | Franka Panda | [github.com/rail-berkeley/fmb](https://github.com/rail-berkeley/fmb) |

### How Phi9 Compares

| Metric | BridgeData v2 | DROID | ALOHA static | **Phi9 Tier 2** |
|---|---|---|---|---|
| DOF | 7 | 7 | 14 | **23 (full body)** |
| Hz | 5 | 15 | 50 | **120** |
| Sync | ~10ms | ~5ms | <5ms | **<5ms** |
| Body coverage | Arm only | Arm only | Arms only | **Full body** |
| Retargetable to humanoid | No (arm only) | No | Partial (arms) | **Yes (full kinematic chain)** |
| Cost per rig | ~$2K (WidowX) | ~$30K (Franka) | ~$28K | **~$500** |

**Phi9's pitch for tabletop:** "Same task, 56x cheaper rig, 23 DOF vs 7, 120 Hz vs 5. Train the same Diffusion Policy on both — run SIMPLER — see the difference."

---

## 2. Manufacturing / Assembly

### Benchmarks

| Benchmark | Tasks | Key Metric | SOTA | Source |
|---|---|---|---|---|
| **FMB** (Functional Manipulation Benchmark) | Grasping, reorientation, insertion, multi-part assembly | Success per trial | Hierarchical: 19/30 single-obj; 7/10 multi-obj | [functional-manipulation-benchmark.github.io](https://functional-manipulation-benchmark.github.io/) |
| **IndustReal** (NVIDIA) | PCB insertion, gear meshing, connector assembly | Success rate + force metrics | ~70-85% on precision tasks | [arxiv.org/abs/2305.17110](https://arxiv.org/abs/2305.17110) |
| **NVIDIA AutoMate** | 20 real-world assembly tasks | Mean success rate | **84.5%** (sim-trained, real-deployed) | [arxiv.org/abs/2407.15369](https://arxiv.org/abs/2407.15369) |
| **NIST Assembly Task Board** | Standardized assembly operations | Completion rate + time | Varies by system | [nist.gov/el/intelligent-systems-division](https://www.nist.gov/el/intelligent-systems-division-73500/robotic-grasping-and-manipulation-assembly) |

### Open Datasets

| Dataset | Episodes | Tasks | DOF | Robot | Link |
|---|---|---|---|---|---|
| **FMB dataset** | 22,550 | Grasp, insert, assemble | 7 | Franka Panda | [github.com/rail-berkeley/fmb](https://github.com/rail-berkeley/fmb) |
| **IndustReal** | Sim + real demos | PCB, gear, connector | 7 | Franka | [arxiv.org/abs/2305.17110](https://arxiv.org/abs/2305.17110) |
| **RH20T** | 110K+ | 147 tasks (incl. assembly) | Multi-robot | Franka, UR5, KUKA, Flexiv | [rh20t.github.io](https://rh20t.github.io/) |
| **MimicGen** | Synthetic from 200 demos | Assembly, threading | 7 | Franka (sim) | [mimicgen.github.io](https://mimicgen.github.io/) |

### How Phi9 Compares

| Metric | FMB | IndustReal | RH20T | **Phi9 Tier 2-3** |
|---|---|---|---|---|
| DOF | 7 (arm) | 7 (arm) | 7-14 (arm) | **23+ (full body + hands)** |
| Environment | Lab bench | Sim + lab | Lab multi-robot | **Real factory floor (India)** |
| Force/torque | Yes (F/T sensor) | Yes | Yes (6-axis) | **Optional (planned)** |
| Hz | Varies | Varies | 10-30 | **120** |
| Language annotations | No | No | Limited | **Yes (per episode)** |

**Phi9's pitch for manufacturing:** "FMB has 22K demos at 7 DOF in a lab. We capture in real factories with 23 DOF at 120 Hz. Force/torque on the roadmap. The gap: nobody has high-fidelity assembly data from real manufacturing environments."

**Key gap in market:** Force/torque data during assembly is critical (FMB showed F/T input improves insertion from 2/25 to 11/25). Adding force sensors to the Phi9 rig is a high-value upgrade.

---

## 3. Household / Kitchen

### Benchmarks

| Benchmark | Tasks | Key Metric | SOTA | Source |
|---|---|---|---|---|
| **RoboCasa** | 25 atomic + 75 composite kitchen tasks | Success rate (50 rollouts/task) | PointMapPolicy: 49.1% atomic; GR00T: 42%→47% | [robocasa.ai](https://robocasa.ai/) |
| **RoboCasa365** | 365 kitchen tasks, 2,500 environments | Success rate | Diffusion Policy: 43.2% (300 demos) | [openreview.net](https://openreview.net/forum?id=tQJYKwc3n4) |
| **CALVIN** (ABCD→D) | Language-conditioned tabletop | Avg chain length (max 5) | MDT: 4.52; DAWN: 4.00 (60.6% 5-step) | [calvin.cs.uni-freiburg.de](http://calvin.cs.uni-freiburg.de/) |
| **ALFRED** | Interactive household instructions | Task success + goal condition | ~45% (SOTA 2024) | [askforalfred.com](https://askforalfred.com/) |

### Open Datasets

| Dataset | Episodes | Tasks | Modalities | Link |
|---|---|---|---|---|
| **RoboCasa demos** | 600+ hrs human + 1,600+ hrs synthetic | Kitchen manipulation | RGB + proprioception | [github.com/robocasa/robocasa](https://github.com/robocasa/robocasa) |
| **CALVIN** | ~100K frames across 4 environments | 34 unique tasks | RGB + proprioception + language | [github.com/mees/calvin](https://github.com/mees/calvin) |
| **Ego4D** | 3,670 hrs egocentric video | Daily activities | RGB (ego) + narration | [ego4d-data.org](https://ego4d-data.org/) |
| **Epic-Kitchens** | 100 hrs, 97 kitchen environments | Kitchen activities | RGB (ego) + narration | [epic-kitchens.github.io](https://epic-kitchens.github.io/) |
| **Something-Something v2** | 220K clips | 174 object interactions | RGB | [developer.qualcomm.com](https://developer.qualcomm.com/software/ai-datasets/something-something) |
| **BridgeData v2** | 60K trajectories, 24 environments | Kitchen + tabletop | RGB + proprioception | [rail-berkeley.github.io/bridgedata](https://rail-berkeley.github.io/bridgedata/) |

### How Phi9 Compares

| Metric | RoboCasa | CALVIN | Epic-Kitchens | **Phi9 Tier 2-3** |
|---|---|---|---|---|
| DOF | 7 (sim robot) | 7 (sim Franka) | 0 (video only) | **23 (full body real)** |
| Environment | Sim (MuJoCo) | Sim (4 scenes) | Real kitchens | **Real environments** |
| Joint data | Proprioception (sim) | Proprioception (sim) | None | **Full mocap 120 Hz** |
| Real/Sim | Sim | Sim | Real (video) | **Real (video + mocap)** |
| Language | No | Yes (per instruction) | Narration (not task instruction) | **Yes (per episode)** |

**Phi9's pitch for household:** "CALVIN and RoboCasa are sim-only (MuJoCo). Epic-Kitchens is video-only (no joint data). Phi9 gives you BOTH — real-world video + full-body joint trajectories from real environments. That's the data that closes the sim-to-real gap."

---

## 4. Dexterous / Hand Manipulation

### Benchmarks

| Benchmark | Tasks | Key Metric | SOTA | Source |
|---|---|---|---|---|
| **DexMimicGen** | 60+ dexterous tasks with Allegro hand | Success rate | Varies by task family | [dexmimicgen.github.io](https://dexmimicgen.github.io/) |
| **DexBench** | Dexterous manipulation primitives | Task-specific success | Early stage | [github.com/dexmal/dexbotic-benchmark](https://github.com/dexmal/dexbotic-benchmark) |
| **TCDM** | Contact-rich dexterous manipulation | Policy transfer success | ~60-80% in-hand reorientation | [arxiv.org/abs/2211.09714](https://arxiv.org/abs/2211.09714) |
| **DexGraspNet** | 1.32B grasp poses on 5,355 objects | Grasp quality metrics | Large-scale coverage | [pku-epic.github.io/DexGraspNet](https://pku-epic.github.io/DexGraspNet/) |

### Open Datasets

| Dataset | Scale | DOF | Modalities | Link |
|---|---|---|---|---|
| **DexCap** | Portable hand mocap | Full hand DOF | Hand pose + video | [dex-cap.github.io](https://dex-cap.github.io/) |
| **DexGraspNet** | 1.32B grasps (sim) | 20+ (Allegro) | Grasp poses + contact | [pku-epic.github.io/DexGraspNet](https://pku-epic.github.io/DexGraspNet/) |
| **RoboCurate** | Curated synthetic | Varies | RGB + proprioception | [arxiv.org/abs/2602.18742](https://arxiv.org/abs/2602.18742) |
| **ALLEX** | Humanoid dexterous | Full body + hands | Multi-modal | RoboCurate paper |

### How Phi9 Compares

| Metric | DexCap | DexGraspNet | **Phi9 Tier 3 (+ gloves)** |
|---|---|---|---|
| Hand DOF | ~20 | 20+ (sim only) | **21-25 (UDCAP/MANUS, real)** |
| Body context | Hand only | Hand only | **Full body + hands** |
| Real/Sim | Real | Sim | **Real** |
| Task diversity | Limited | Grasps only | **Full manipulation tasks** |
| Cost | Custom build | Free (sim) | **$500 rig + $700-1,800 gloves** |

**Phi9's pitch for dexterous:** "DexGraspNet is sim-only. DexCap captures hands but not body. Phi9 Tier 3 with UDCAP gloves gives you 23 body segments + 21 hand DOF in real environments. Full kinematic chain from shoulder to fingertip — that's what dexterous humanoid hands need."

---

## 5. Locomotion / Whole-Body

### Benchmarks

| Benchmark | Tasks | Key Metric | SOTA | Source |
|---|---|---|---|---|
| **HumanoidBench** | 27 whole-body tasks (walk, run, reach, balance, etc.) | Reward / success rate | Most RL methods struggle; PPO/SAC limited | [github.com/carlosferrazza/humanoid-bench](https://github.com/carlosferrazza/humanoid-bench) |
| **LAFAN1** (Ubisoft) | Motion in-betweening across 15 themes | L2Q, L2P, NPSS | Standard animation benchmark (SIGGRAPH 2020) | [github.com/ubisoft/ubisoft-laforge-animation-dataset](https://github.com/ubisoft/ubisoft-laforge-animation-dataset) |
| **DeepMimic** | Character animation → robot locomotion | Motion quality + task completion | High-quality locomotion from mocap | [arxiv.org/abs/1804.02717](https://arxiv.org/abs/1804.02717) |
| **Humanoid Locomotion (Real)** | Real humanoid walking, stair climbing | Distance walked, fall rate | Unitree H1: outdoor walking demonstrated | Various company demos |

### Open Datasets

| Dataset | Scale | DOF | Hz | Format | Link |
|---|---|---|---|---|---|
| **CMU MoCap** | 2,500+ sequences | Full body (41 markers) | 120 | C3D, BVH | [mocap.cs.cmu.edu](https://mocap.cs.cmu.edu/) |
| **AMASS** | 40+ datasets unified | Full body (SMPL) | Varies | SMPL, BVH | [amass.is.tue.mpg.de](https://amass.is.tue.mpg.de/) |
| **LAFAN1** | 77 sequences, 5 actors, ~4.6 hrs | Full body | 30 | BVH | [github.com/ubisoft/ubisoft-laforge-animation-dataset](https://github.com/ubisoft/ubisoft-laforge-animation-dataset) |
| **KIT Motion-Language** | 3,911 sequences | Full body | 100 | BVH + language | [motion-annotation.humanoids.kit.edu](https://motion-annotation.humanoids.kit.edu/) |
| **HumanML3D** | 14,616 motions | Full body (SMPL) | — | SMPL + language | [github.com/EricGuo5513/HumanML3D](https://github.com/EricGuo5513/HumanML3D) |
| **BABEL** | 43 hrs (from AMASS) | Full body (SMPL) | Varies | SMPL + action labels | [babel.is.tue.mpg.de](https://babel.is.tue.mpg.de/) |

### How Phi9 Compares

| Metric | CMU MoCap | AMASS | LAFAN1 | KIT | **Phi9 Tier 4** |
|---|---|---|---|---|---|
| Task relevance | General motion | General motion | 15 motion themes (fight, dance, locomotion) | General + language | **Task-specific manipulation + locomotion** |
| Language annotations | No | No | No | Yes (per sequence) | **Yes (per episode)** |
| Environment context | Lab (clean) | Lab (clean) | Studio (clean) | Lab | **Real environments (factory, home)** |
| Objects / interactions | No objects | No objects | No objects | No objects | **Object manipulation during locomotion** |
| Sim-ready conversion | Manual | SMPL → URDF (tools exist) | BVH (direct) | BVH → URDF | **Pre-converted: MuJoCo, Isaac, LeRobot** |
| Hz | 120 | Varies | 30 | 100 | **120** |
| Quality metrics | — | — | L2Q, L2P, NPSS (standard) | — | **L2Q + L2P + NPSS + Consistency Matters** |

**LAFAN1 quality metrics** (adoptable for Phi9 motion quality assessment):
- **L2Q** — Global quaternion loss: measures rotational accuracy of generated motion
- **L2P** — Global position loss: measures positional accuracy
- **NPSS** — Normalized Power Spectrum Similarity: frequency-domain motion quality (captures naturalness)

These are well-established in the animation community. Phi9 can report these alongside Consistency Matters metrics to validate motion quality across both robotics and animation domains.

**Phi9's pitch for locomotion:** "CMU MoCap and AMASS are general motion — walking, dancing, gestures. LAFAN1 has structured themes but at 30 fps and no task context. Nobody captures a human walking to a table, picking up an object, carrying it across a room, and placing it somewhere — the full locomotion + manipulation chain at 120 Hz. That's what humanoid companies need and what Phi9 Tier 4 delivers."

---

## 6. Logistics / Warehousing

### Benchmarks

| Benchmark | Tasks | Key Metric | Notes | Source |
|---|---|---|---|---|
| **OCRTOC** | Tabletop object rearrangement | Completion rate | Cloud-based, 154 objects (53 from YCB) | [ocrtoc.org](https://www.ocrtoc.org/) |
| **YCB Benchmark** | Grasping + manipulation of standard objects | Grasp success rate | 77 household objects, standardized protocol | [ycbbenchmarks.com](https://www.ycbbenchmarks.com/) |
| **SceneReplica** | Cluttered bin picking | Pick success + placement accuracy | Replicable real-world scenes | [arxiv.org/abs/2306.15620](https://arxiv.org/abs/2306.15620) |

### Open Datasets

| Dataset | Scale | Tasks | Robot | Link |
|---|---|---|---|---|
| **BridgeData v2** | 60K (some bin-pick) | 13 skills incl. picking | WidowX | [rail-berkeley.github.io/bridgedata](https://rail-berkeley.github.io/bridgedata/) |
| **DROID** | 76K (varied scenes) | 86 tasks incl. packing | Franka | [droid-dataset.github.io](https://droid-dataset.github.io/) |
| **YCB objects** | 77 standard objects | Grasping benchmark | Any | [ycbbenchmarks.com](https://www.ycbbenchmarks.com/) |

### How Phi9 Compares

**Phi9's pitch for logistics:** "This is the least saturated domain. No open dataset specifically targets warehouse packing, palletizing, or sorting with high-fidelity mocap. OCRTOC is sim-based and tabletop only. Phi9 can be first-to-market with real warehouse data."

**Gap opportunity:** Logistics companies (Dexterity, Covariant, Berkshire Grey) need picking + packing data. Nobody serves them with high-fidelity demonstrations from real warehouse environments.

---

## Master Comparison: Open Datasets vs. Phi9

| Open Dataset | Domain | Episodes | DOF | Hz | Real/Sim | Language | **Phi9 Advantage** |
|---|---|---|---|---|---|---|---|
| BridgeData v2 | Tabletop | 60K | 7 | 5 | Real | No | +16 DOF, +115 Hz, language |
| DROID | Tabletop + varied | 76K | 7 | 15 | Real | Limited | +16 DOF, +105 Hz, full body |
| ALOHA static | Bimanual tabletop | ~50/task | 14 | 50 | Real | No | +9 DOF, +70 Hz, body context |
| Open X-Embodiment | Cross-embodiment | 1M+ | 3-14 | 3-10 | Real | Varies | Consistency + fidelity |
| FMB | Assembly | 22.5K | 7 | — | Real | No | +16 DOF, real factory, language |
| RoboCasa | Kitchen (sim) | 600+ hrs | 7 | — | **Sim** | No | **Real data**, full body |
| CALVIN | Household (sim) | 100K frames | 7 | — | **Sim** | Yes | **Real data**, +16 DOF |
| CMU MoCap | General motion | 2.5K seq | Full body | 120 | Real | No | **Task-specific**, language, objects |
| AMASS | General motion | 40+ sets | Full body | Varies | Real | No | **Task-specific**, sim-ready |
| LAFAN1 | Locomotion + animation | 77 seq | Full body | 30 | Real | No | **4x Hz (120 vs 30)**, task context, objects |
| DexCap | Dexterous hand | Limited | Hand only | — | Real | No | Full body + hand, environment |
| Epic-Kitchens | Kitchen (video) | 100 hrs | **0** | 60 | Real | Narration | **Joint data**, structured episodes |

**The pattern:** Every open dataset has one or more of these gaps: (1) sim-only, (2) arm-only DOF, (3) low Hz, (4) no language, (5) no task structure, (6) lab-only environment. Phi9 data closes multiple gaps simultaneously.

---

## How to Use This in Sales

### The "Where Does Your Data Sit?" Question

Walk into any meeting. Pull up this table. Ask:

> "You're training on [BridgeData / DROID / OXE]. Here's what it gives you: [7 DOF, 5-15 Hz, arm only]. Here's what Phi9 gives you: [23 DOF, 120 Hz, full body]. Same task domain. We've benchmarked both on SIMPLER — here's the delta."

### Per-Domain Conversation Starters

| Domain | Open With | Show | Ask |
|---|---|---|---|
| **Tabletop** | "Your data is 7 DOF at 5 Hz" | BridgeData vs Phi9 on SIMPLER | "Want a pilot to test the fidelity difference?" |
| **Manufacturing** | "FMB showed F/T improves insertion 5x" | FMB numbers + Phi9 factory data | "We capture in real factories, not labs" |
| **Household** | "RoboCasa is sim-only" | RoboCasa sim-to-real gap | "Real kitchen data at 23 DOF" |
| **Dexterous** | "DexGraspNet is sim grasps" | Phi9 Tier 3 with glove data | "Full arm-to-fingertip real data" |
| **Locomotion** | "CMU MoCap is just walking" | CMU vs Phi9 task-specific | "Walk, pick, carry, place — the full chain" |
| **Logistics** | "Nobody has this data" | Empty market | "We'll be first. What do you need?" |

---

## Connections

- [Phi9 Data Catalog](/vault/phi9-data-catalog/) — parent catalog, uses these benchmarks per dataset card
- <span class="wikilink wikilink--unresolved">Teleoperation Hardware Deep Comparison</span> — capture rig specs
- <span class="wikilink wikilink--unresolved">Phi9 Proposal Template</span> — benchmarks go into Page 3 (Quality Proof)
- <span class="wikilink wikilink--unresolved">Robotics Data Competitive Landscape</span> — competitor positioning
- <span class="wikilink wikilink--unresolved">Robotics Data Customer Prospects</span> — match domain to buyer
- [Action Data](/vault/action-data/) — what benchmarks evaluate

---
Last Updated: 2026-02-27
