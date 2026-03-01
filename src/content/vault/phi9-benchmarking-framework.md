---
title: Phi9 Benchmarking Framework
description: >-
  The methodology for measuring and comparing robotics datasets — what
  dimensions to measure, how to measure them, and how to structure benchmark
  reports.
publish: true
type: note
category: research
datasetKind: other
tags:
  - full-note
  - benchmarking
  - phi9
  - evaluation
  - robotics-data
status: published
featured: true
slug: phi9-benchmarking-framework
aliases: []
sourcePath: Phi9 Benchmarking Framework.md
date: '2026-02-26T00:00:00.000Z'
updated: '2026-02-27T00:00:00.000Z'
---
# Phi9 Benchmarking Framework

See also: [Phi9 Domain Benchmarks](/vault/phi9-domain-benchmarks/), [Phi9 Data Catalog](/vault/phi9-data-catalog/), <span class="wikilink wikilink--unresolved">Phi9 Conversation Flow</span>, [Robotics Data Pipeline Technical Deep Dive](/vault/robotics-data-pipeline/)

## What It Is

The benchmarking methodology — how to measure and compare. The actual per-domain numbers, SOTA results, and open dataset comparisons live in [Phi9 Domain Benchmarks](/vault/phi9-domain-benchmarks/). This note defines the framework: what dimensions to measure, how to measure them, how to structure the benchmark report, and where Phi9 wins vs. doesn't.

Every catalog item ships with benchmark results following this methodology. The <span class="wikilink wikilink--unresolved">Dataset Card Template</span> includes the "Eval vs. Baselines" section that references these dimensions.

---

## The Open-Source Baselines

### Datasets to Benchmark Against

| Dataset | Type | Scale | Modalities | Weaknesses Phi9 Exploits |
|---------|------|-------|------------|--------------------------|
| **Open X-Embodiment (OXE)** | Cross-embodiment teleop | 1M+ trajectories, 22 robots, 60 datasets | RGB + state + action (7-DoF EE) | No mocap. EE-only actions. Inconsistent quality across contributing labs. No sub-task labels. |
| **BridgeData v2** | Single-arm tabletop | 60K+ trajectories | RGB (1 cam) + 7-DoF action | Single camera. No depth. No joint trajectories. Limited environments. |
| **DROID** | Distributed multi-site | 76K episodes, 564 scenes | Multi-view RGB + state + action | No mocap. Actions are EE-space only. Inconsistent operator skill. No sub-task annotation. |
| **Ego4D** | Egocentric human video | 3,670 hours | Egocentric video + narration + gaze | No action labels. No robot state. No joint trajectories. Embodiment gap. |
| **Epic-Kitchens** | Egocentric kitchen tasks | 100 hours, 700 videos | Egocentric RGB + action labels | Kitchen-only domain. Coarse action labels. No joint data. No robot compatibility. |
| **Something-Something v2** | Object interaction video | 220K clips | RGB video + text label | Short clips. No continuous trajectories. No robot state. Crowd-sourced quality. |
| **ALOHA datasets** | Bimanual tabletop teleop | ~1K episodes per task | Multi-view RGB + joint positions (14-DoF) | Fixed to ALOHA hardware. Tabletop only. No mocap. Limited task diversity. |
| **UMI datasets** | Portable EE capture | Variable | Ego RGB + EE pose + IMU | EE-only (no joint). No force/torque. No mocap. |
| **LIBERO** | Simulation benchmark | 130 tasks, 50 demos each | RGB + state + action (sim) | Simulation only. No real-world data. |
| **RoboCasa** | Household simulation | 100K trajectories, 150 tasks | RGB + depth + state + action (sim) | Simulation only. No mocap. Synthetic textures. |

---

## Benchmark Dimensions

### Dimension 1: Capture Fidelity

Measures how much physical information is captured per timestep.

| Metric | How to Measure | What Phi9 Claims | Open Dataset Typical |
|--------|---------------|------------------|---------------------|
| **Degrees of Freedom** | Count of independent joint channels captured | 50+ DoF (full body mocap) | 7 DoF (EE-space) or 14 DoF (bimanual ALOHA) |
| **Capture Frequency** | Hz of motion/action data | 100+ Hz (mocap) | 10-50 Hz (camera-limited) |
| **Spatial Precision** | Positional accuracy of joint tracking | Sub-millimeter (optical mocap) | ~1-5mm (camera-based pose estimation) |
| **Sensor Synchronization** | Max drift between modalities | <5ms (hardware sync) | 10-50ms (software sync typical in open datasets) |
| **Camera Count** | Number of viewpoints | 3-5 (ego + external + overhead) | 1-3 typical |
| **Depth Capture** | Depth sensor presence | Yes (RealSense/ZED) | Rare in open datasets |
| **Force/Torque** | Contact force sensing | Optional (sensor-equipped) | Almost never in open datasets |

**How to present**: Radar chart per dataset. Phi9 Tier 2+ should dominate on DoF, Hz, precision, sync. Open datasets win on volume.

### Dimension 2: Annotation Richness

Measures how much semantic information is attached per episode.

| Metric | How to Measure | Phi9 Target | Open Dataset Typical |
|--------|---------------|-------------|---------------------|
| **Language instructions** | Per-episode natural language task description | Every episode | ~60% of OXE, variable elsewhere |
| **Sub-task boundaries** | Temporal markers for task decomposition | Yes, with timestamps | Almost never |
| **Action classification** | Categorical action labels (pick, place, pour...) | Yes | Rare |
| **Object annotations** | What objects are being manipulated | Yes (object ID + properties) | Rare |
| **Success/failure labels** | Binary per episode | Every episode | ~80% of curated datasets |
| **Contact events** | When and where contact occurs | Yes (from F/T sensor threshold) | Almost never |
| **Difficulty rating** | Expert assessment of episode difficulty | Yes | Never |
| **Environment metadata** | Lighting, table height, scene description | Yes | Occasionally |

**How to present**: Checklist comparison table. Green check = present, red X = absent. Phi9 should be all-green.

### Dimension 3: Format Compatibility

Measures how many training ecosystems the data works with out of the box.

| Format | Phi9 | OXE | BridgeData | DROID | Ego4D | ALOHA |
|--------|------|-----|------------|-------|-------|-------|
| LeRobot v2.1 | Yes | Conversion needed | Conversion needed | Conversion needed | No | Conversion needed |
| RLDS / TFRecord | Yes | Native | Via RLDS builder | Via RLDS builder | No | Via RLDS builder |
| MuJoCo MJCF | Yes | No | No | No | No | No |
| Isaac Sim USD | Yes | No | No | No | No | No |
| HDF5 / ZARR | Yes | No | HDF5 | No | No | HDF5 |
| ROS2 MCAP | Yes | No | No | No | No | No |
| Rerun.io viewable | Yes | No | No | No | No | No |

**How to present**: Matrix with checkmarks. Phi9 covers all formats. Nobody else does.

### Dimension 4: Training Signal Quality

Measures how useful the data is for actually training policies.

| Metric | How to Measure | Why It Matters |
|--------|---------------|----------------|
| **Action smoothness (jerk)** | Mean squared jerk across action trajectories | Lower jerk = cleaner demonstrations = smoother trained policies |
| **Demonstration consistency** | Variance of trajectories across episodes of same task | Lower variance = easier to learn from |
| **State space coverage** | Entropy of starting/goal state distributions | Higher = more robust policies |
| **Episode completion rate** | % episodes where task is fully completed | Higher = cleaner training signal |
| **Temporal density** | Useful action labels per second of data | Higher = more learning signal per compute |

**How to measure these**: Build a benchmark suite that computes these metrics for any dataset in LeRobot format. Run it on Phi9 data AND open datasets. Publish results.

### Dimension 5: Downstream Task Performance (Advanced)

The ultimate benchmark: train the same policy architecture on Phi9 data vs open data, compare task success rates.

| Test | Setup | What It Proves |
|------|-------|----------------|
| **BC on anchor task** | Train Diffusion Policy on Phi9 Tier 2 data vs BridgeData equivalent | Higher fidelity data → better policy |
| **Cross-embodiment transfer** | Train on Phi9 mocap data retargeted to Robot A, evaluate on Robot B | Mocap data is more transferable than single-embodiment teleop |
| **Few-shot fine-tuning** | Fine-tune pi0 (via OpenPI) on 50 episodes of Phi9 vs 50 episodes of open data | Quality per episode matters more than volume |
| **Sim-to-real** | Train in Isaac Sim with Phi9 Tier 4 data, deploy on real robot | Phi9 environment reconstructions reduce sim-to-real gap |

**Timeline**: This requires a robot and training pipeline. Not needed for initial conversations but becomes the killer evidence for Conversation 6+.

---

## Benchmark Report Structure

Each catalog item publishes a benchmark card alongside the dataset card:

```
# Benchmark Report: [Dataset Name]

## Summary
- Phi9 Tier: [X]
- Task Domain: [e.g., tabletop pick-and-place]
- Episodes: [N]
- Compared against: [list of baselines]

## Fidelity Comparison
[Radar chart: Phi9 vs OXE vs DROID vs ALOHA]

## Annotation Comparison
[Checklist table]

## Format Compatibility
[Matrix]

## Quality Metrics
| Metric | Phi9 | BridgeData v2 | DROID | ALOHA |
|--------|------|---------------|-------|-------|
| Action smoothness | ... | ... | ... | ... |
| Demo consistency | ... | ... | ... | ... |
| State coverage | ... | ... | ... | ... |
| Episode success rate | ... | ... | ... | ... |

## Key Takeaway
[1-2 sentences: what makes this dataset better for [use case]]
```

---

## Where Phi9 Wins and Where It Doesn't (Be Honest)

**Phi9 wins on**:
- DoF / joint fidelity (mocap vs EE-only)
- Capture frequency (100+ Hz vs 10-50 Hz)
- Annotation richness (sub-tasks, contacts, objects)
- Format coverage (every format vs 1-2)
- Visualization (rerun.io previews)
- Sim-ready conversions (nobody else does this)

**Open datasets win on**:
- Volume (DROID 76K episodes, OXE 1M+ trajectories — Phi9 starts small)
- Community adoption (BridgeData is cited everywhere)
- Robot-native data (ALOHA data comes from the exact robot — no retargeting needed)
- Cost to user ($0 for open datasets vs $ for Phi9)

**How to frame this**: "Open datasets give you breadth. Phi9 gives you depth. Use open datasets for pre-training, use Phi9 for post-training where quality per episode matters more than volume." This matches the Data Pyramid from [Robotics Data Pipeline Technical Deep Dive](/vault/robotics-data-pipeline/) Section 5.

---

## Open Questions

- Which specific metrics should be priority 1 for the first benchmark report?
- Do we need to train an actual policy to prove downstream performance, or are proxy metrics (smoothness, consistency, coverage) enough for initial conversations?
- What retargeting models exist off the shelf for human mocap → ALOHA, Franka, GR00T, Figure 02?
- How to handle the "but open data is free" objection — is the quality delta obvious enough from metrics alone?

---

## Connections

- [Phi9 Domain Benchmarks](/vault/phi9-domain-benchmarks/) — the actual per-domain data, SOTA numbers, and comparison tables
- [Phi9 Data Catalog](/vault/phi9-data-catalog/) — each catalog item gets a benchmark card
- <span class="wikilink wikilink--unresolved">Phi9 Conversation Flow</span> — benchmarks used in Conversation 1 and 6
- <span class="wikilink wikilink--unresolved">Dataset Card Template</span> — "Eval vs. Baselines" section follows this methodology
- [Robotics Data Pipeline Technical Deep Dive](/vault/robotics-data-pipeline/) — Section 5 defines quality metrics
- <span class="wikilink wikilink--unresolved">Teleoperation Hardware Deep Comparison</span> — rig specs feed into fidelity benchmarks
- <span class="wikilink wikilink--unresolved">Phi9 Proposal Template</span> — Page 3 (Quality Proof) uses spec-vs-spec benchmarks

---
Last Updated: 2026-02-26
