---
title: Phi9 Catalog Reference
description: >-
  Technical deep dive behind the Phi9 catalog — scoring formulas, tag
  taxonomies, eval protocols, and quality dimensions.
publish: false
type: note
category: research
datasetKind: other
tags:
  - full-note
  - catalog
  - phi9
  - reference
  - technical
status: published
featured: false
slug: phi9-catalog-reference
aliases: []
sourcePath: Phi9 Catalog Reference.md
date: '2026-02-27T00:00:00.000Z'
updated: '2026-02-27T00:00:00.000Z'
---
# Phi9 Catalog Reference

See also: [Phi9 Data Catalog](/vault/phi9-data-catalog/), [Phi9 Domain Benchmarks](/vault/phi9-domain-benchmarks/), <span class="wikilink wikilink--unresolved">Dataset Card Template</span>

Technical deep dive behind the catalog. Scoring formulas, tag taxonomies, eval protocols, marketplace roadmap, and internal processes. The catalog is the presentation — this note is the engine room.

---

## Quality Dimensions — What We Measure

Instead of an internal composite score, we prove quality by benchmarking against open datasets on measurable dimensions. Each dataset card reports these metrics directly — buyers compare on specs, not a proprietary number.

### Per-Dataset Quality Metrics

| Dimension | What It Measures | Premium Threshold |
|---|---|---|
| **DOF captured** | Body segments with joint data | 23 = full body |
| **Capture frequency** | Joint data sample rate | >100 Hz |
| **Sensor sync** | Inter-sensor timing drift | <5ms |
| **Action smoothness (jerk)** | Motion quality — lower is cleaner | <0.02 |
| **Episode consistency (var)** | Cross-episode repeatability | <0.15 |
| **Task success rate** | Percentage of usable demonstrations | >90% |
| **Annotation density** | Subtask labels per minute | >3/min |
| **State space coverage** | Diversity of captured configurations | >0.7 |

### Motion Quality Metrics (from LAFAN1 / animation community)

| Metric | What It Measures | How We Test |
|---|---|---|
| **L2Q** (quaternion loss) | Rotational accuracy of captured motion | Compare Phi9 BVH vs reference BVH on same task |
| **L2P** (position loss) | Positional accuracy | Same |
| **NPSS** (power spectrum similarity) | Frequency-domain motion naturalness | Run on Phi9 captures, compare to LAFAN1 reference |

### How Open Datasets Compare on These Dimensions

| Dataset | DOF | Hz | Sync | Body | Environment | Language |
|---|---|---|---|---|---|---|
| **Phi9 (Tier 2+)** | **23** | **120** | **<5ms** | **Full body** | **Real** | **Yes** |
| ALOHA static | 14 | 50 | <5ms | Arms only | Lab | No |
| DROID | 7 | 15 | ~5ms | Arm only | 564 lab scenes | Limited |
| BridgeData v2 | 7 | 5 | ~10ms | Arm only | 24 environments | No |
| UMI | 6 (EEF) | 60 | Post-hoc | EEF only | Portable | No |
| Open X-Embodiment | 3-14 | 10-50 | Varies | Varies | Varies | Varies |
| CMU MoCap | Full body | 120 | <1ms | Full body | Studio | No |
| LAFAN1 | Full body | 30 | <1ms | Full body | Studio | No |

---

## Model Card Schema

Every dataset card uses this YAML schema in the Obsidian frontmatter (see <span class="wikilink wikilink--unresolved">Dataset Card Template</span>):

```yaml
# ─── PHI9 DATASET MODEL CARD ───
name: "phi9/factory-assembly-bracket-v1"
version: 1.0.0
created: 2026-03-XX
license: "phi9-commercial-v1"  # or "cc-by-nc-4.0" for open items

# ─── CAPTURE ───
capture:
  rig: "Phi9 MoCap Rig v1"           # ~$500 custom rig
  rig_cost: "$500"
  mocap_hz: 120
  video_hz: 60
  cameras: 3                          # ego + overhead + side
  camera_type: "GoPro Hero 9 (fisheye)"
  gloves: false                       # or "UDCAP 21-DOF" if used
  environment: "Factory floor, Chennai, India"
  operator_training_hours: 4

# ─── DATA SHAPE ───
data:
  episodes: 250
  total_hours: 12.5
  avg_episode_length_sec: 180
  modalities:
    - rgb_video:
        views: [ego, overhead, side]
        resolution: "1920x1080"
        fps: 60
    - joint_trajectories:
        dof: 23                       # full body segments
        hz: 120
        format: "BVH + MVNX"
    - end_effector_pose:
        hz: 120
        format: "XYZ + quaternion"
    - task_metadata:
        format: "JSONL"
        fields: [task_id, success, language_instruction, subtask_boundaries, objects]
    - language_instructions:
        per_episode: true
        example: "Pick up the L-bracket from the bin and screw it onto the mounting plate"

# ─── FORMATS AVAILABLE ───
formats:
  - lerobot_v3:    "Parquet + MP4 (HuggingFace-ready)"
  - hdf5:          "Chunked HDF5 with joint + video arrays"
  - zarr:          "Zarr archive (UMI-compatible)"
  - mujoco:        "MJCF + retargeted trajectories"
  - isaac_sim:     "USD scene + GR00T-compatible motion"
  - ros2_mcap:     "MCAP bags for ROS2 replay"

# ─── QUALITY ───
quality:
  fidelity_tier: 2
  sensor_sync_ms: 3.2
  action_smoothness_jerk: 0.014
  episode_consistency_var: 0.12
  state_space_coverage: 0.78
  task_success_rate: 0.94
  annotation_density: 4.2
  dof_captured: 23
  capture_frequency_hz: 120

# ─── TAGS ───
tags:
  domain: "manufacturing"
  task_type: "assembly"
  complexity: "multi-step"
  robot_targets: ["humanoid-upper", "bimanual-arm", "single-arm"]
  objects: ["metal-bracket", "screws", "mounting-plate"]
  environment: "factory"
  body_region: "upper-body + hands"

# ─── BENCHMARKED AGAINST ───
benchmarks:
  domain: "manufacturing"
  open_datasets: ["FMB (22.5K eps, 7 DOF)", "IndustReal (7 DOF, sim+real)"]
  advantage: "+16 DOF, +105 Hz, real factory, language annotations"
```

---

## Data Type Tags — Full Taxonomy

Tags serve three purposes: (1) catalog filtering for buyers, (2) internal quality grouping, (3) eval routing.

### By Modality

| Tag | What It Means | Tiers |
|---|---|---|
| `#rgb-ego` | Egocentric RGB video | 0-5 |
| `#rgb-external` | External camera views (overhead, side) | 1-5 |
| `#mocap-full-body` | 23-segment full body motion capture | 2-5 |
| `#mocap-upper` | Upper body + hands focused capture | 3-5 |
| `#hand-tracking` | Finger-level DOF (gloves) | 3-5 |
| `#force-torque` | Contact force data | 3-5 |
| `#language` | Natural language task instructions | 1-5 |
| `#sim-ready` | Importable to MuJoCo / Isaac Sim | 4-5 |
| `#synthetic` | World-model augmented variants | 5 |

### By Domain

| Tag | Examples | Buyer Persona |
|---|---|---|
| `#manufacturing` | Assembly, inspection, packing, wire routing | Industrial arm companies |
| `#household` | Cooking, cleaning, folding, organizing | Humanoid companies |
| `#tabletop` | Pick-place, pouring, stacking, sorting | VLA labs, research labs |
| `#logistics` | Packing, palletizing, sorting, scanning | Warehouse robotics |
| `#locomotion` | Walking, stairs, carrying, crouching | Humanoid companies |
| `#dexterous` | Screwing, pinching, threading, key insertion | Dexterous hand companies |

### By Complexity

| Tag | Definition | Typical SOTA |
|---|---|---|
| `#single-step` | One atomic action (pick, place, push) | 80-97% |
| `#multi-step` | Sequence of 2-5 actions in order | 60-85% |
| `#long-horizon` | 5+ sequential actions, planning required | ~21% (5-step chain) |
| `#contact-rich` | Precise force control (assembly, insertion) | 70-85% |
| `#bimanual` | Two-handed coordination required | 80%+ |

### By Robot Target

| Tag | Compatible Embodiments |
|---|---|
| `#humanoid-full` | GR00T, Figure 02, Unitree H1, 1X Neo |
| `#humanoid-upper` | Upper body humanoids, torso-only |
| `#bimanual-arm` | ALOHA-type dual arm setups |
| `#single-arm` | Franka, UR5, xArm, WidowX |
| `#mobile-manipulator` | Mobile base + arm (Stretch, TidyBot) |
| `#dexterous-hand` | Allegro, LEAP, Shadow Hand |

### Tag Combos → Auto-Eval Protocol

| Tag Combination | Auto-Run Eval |
|---|---|
| `#tabletop` + `#single-step` | SIMPLER (Google Robot tasks) |
| `#tabletop` + `#language` | CALVIN ABC-D |
| `#household` + `#multi-step` | RoboCasa atomic + composite |
| `#manufacturing` + `#contact-rich` | Custom SIMPLER variant |
| `#locomotion` + `#humanoid-full` | Isaac Sim humanoid rollout |
| `#sim-ready` + any domain | ManiSkill3 |

---

## Eval Stack — How We Prove Quality

```
Level 1: Capture Metrics                ← Every dataset card
  → Jerk, smoothness, consistency, completion time
  → Based on "Consistency Matters" (ACM THRI, 2024)
  → Motion metrics: L2Q, L2P, NPSS (from LAFAN1 benchmark)

Level 2: Spec-vs-Spec Comparison        ← Every dataset card
  → Head-to-head table vs open datasets on factual dimensions
  → DOF, Hz, sync, body coverage, environment, language
  → No internal score — let the specs speak

Level 3: Policy Benchmark               ← When proposing to a buyer
  → Same policy trained on Phi9 vs. competitor data
  → Evaluated on SIMPLER, LIBERO, or domain benchmark
  → The proof: "Here's the success rate delta"

Level 4: Sim-to-Real Transfer           ← When buyer has a specific robot
  → Retarget to their URDF → run in sim → compare to real
  → Typical sim-to-real gap: 24-30%
```

### The 3 Numbers That Justify Everything

1. **DROID +22%**: Co-training with higher-quality data gives +22% in-distribution, +17% OOD over OXE
2. **Re-Mix +38%**: Optimized data mixtures outperform uniform by +38% — curation > volume
3. **Data Scaling Laws**: Diversity (environments x objects) > raw episode count — $500 rig x 10 sites beats $28K ALOHA x 1 lab

### Comparison Protocol

```
1. Identify buyer's current training data
2. Pull closest open dataset from [Phi9 Domain Benchmarks](/vault/phi9-domain-benchmarks/)
3. Fill head-to-head table on dataset card
4. If buyer needs policy proof → run Level 3 benchmark
5. Present: "Here's what you get today. Here's what Phi9 gives you."
```

---

## Open-Source Strategy

- **What to open**: 1-2 small datasets from Tier 0-1, published on HuggingFace with full cards
- **Why**: Gets cited in papers, builds trust, drives inbound
- **What NOT to open**: Tier 2+ mocap data, Tier 4+ sim-ready — premium moat
- **Format**: LeRobot v2.1 on HuggingFace Hub, viewable via rerun.io

---

## Marketplace Roadmap

```
Phase 1 (Now)      → Direct 1:1 deals. Build catalog. Prove quality.
Phase 2 (Month 3+) → HuggingFace Hub presence. Open 1-2 datasets. Inbound.
Phase 3 (Month 6+) → Self-serve catalog on phi9.space. Browse → preview → buy.
Phase 4 (Month 12+)→ Full marketplace. Third-party sellers. Phi9 certifies quality.
```

Phase 4 is the real play: become the **marketplace** for robotics data. Like HuggingFace for models, but for robot training data.

### First 5 Target Deals

| # | Buyer Type | Catalog Match | Ask |
|---|---|---|---|
| 1 | VLA lab (pre-training) | Tier 1-2, tabletop tasks | $10K-30K |
| 2 | Humanoid company | Tier 4, walk + carry | $50K-150K |
| 3 | Industrial arm company | Tier 2-3, assembly tasks | $30K-100K |
| 4 | Research lab (fine-tuning) | Tier 2, pick-place | $5K-20K |
| 5 | Sim company (digital twins) | Tier 4-5, any domain | $50K-200K |

---

## Catalog Build Timeline

### Month 1: Foundation

| Week | Deliverable | Status |
|---|---|---|
| W1 | Capture rig operational ($500 rig validated) | In progress |
| W2 | First 10-50 episodes of `phi9/tabletop-pick-place-v1` | Planned |
| W3 | Run Consistency Matters + LAFAN1 motion metrics | Planned |
| W4 | Convert to LeRobot v3 + HDF5. Run quality metrics. First card. | Planned |

**Exit**: One fully filled dataset card with real metrics, viewable in rerun.io.

### Month 2: Eval + First Sales

| Week | Deliverable |
|---|---|
| W5 | Train Diffusion Policy on Phi9 data. Baseline: BridgeData v2. |
| W6 | Run SIMPLER eval. Report success rate delta. |
| W7 | Capture 100-200 more episodes (diversity increase). |
| W8 | Send pilot proposal to first 3 prospects. |

**Exit**: Head-to-head benchmark proof. First proposal sent.

### Month 3-6: Scale

| Month | Focus |
|---|---|
| M3 | 3 dataset cards live. 1 open-source on HuggingFace. |
| M4 | 5-7 cards. First custom capture contract. SIMPLER leaderboard. |
| M5 | Factory capture operational (India). First DaaS. |
| M6 | 10+ cards. Self-serve catalog on phi9.space. First Tier 4. |

### Month 7-12: Marketplace

| Phase | Milestone |
|---|---|
| M7-8 | 20+ datasets. Auto eval pipeline. |
| M9-10 | Third-party sellers onboard. |
| M11-12 | Full marketplace live. |

### Critical Path

```
Rig works → First dataset → First benchmark → First sale
  Week 1      Week 4          Week 6          Week 8
```

---

## Open Questions

- Minimum catalog size to be credible at launch? (3? 10? 20?)
- rerun.io hosting — self-hosted or per-customer links?
- Target humanoid models for retargeting? (GR00T, H1, Figure 02?)
- Quality credibility — third-party validation of capture metrics?
- SIMPLER eval setup time — can it fit in Week 5-6?
- Consistency Matters metrics — automate or manual per dataset?
- Data Scaling Laws — how many environments before power-law kicks in?

---

## Connections

- [Phi9 Data Catalog](/vault/phi9-data-catalog/) — the presentation this supports
- [Phi9 Domain Benchmarks](/vault/phi9-domain-benchmarks/) — per-domain benchmark details
- <span class="wikilink wikilink--unresolved">Dataset Card Template</span> — template using this schema
- <span class="wikilink wikilink--unresolved">Phi9 Proposal Template</span> — how catalog items get packaged
- <span class="wikilink wikilink--unresolved">Teleoperation Hardware Deep Comparison</span> — hardware specs
- <span class="wikilink wikilink--unresolved">Robotics Data Market</span> — pricing context
- <span class="wikilink wikilink--unresolved">Phi9 GTM Strategy</span> — where this fits in the GTM

---
Last Updated: 2026-02-27
