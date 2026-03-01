---
title: Robotics Data Pipeline Technical Deep Dive
description: >-
  Comprehensive technical reference documenting how robotics data flows from raw
  sensor capture through training pipelines — covering formats, modalities, and
  architecture consumption patterns.
publish: false
type: note
category: research
datasetKind: other
tags:
  - full-note
  - technical
  - pipeline
  - data-formats
  - robotics-data
status: published
featured: true
slug: robotics-data-pipeline
aliases: []
sourcePath: Robotics Data Pipeline Technical Deep Dive.md
date: '2026-02-23T00:00:00.000Z'
updated: '2026-02-27T00:00:00.000Z'
---
# Robotics Data Pipeline Technical Deep Dive

## What It Is

A comprehensive technical reference documenting exactly how robotics data flows from raw sensor capture through training pipelines to deployed models — covering formats, modalities, architecture-specific consumption patterns, and what makes data valuable to labs.

---

## 1. Data Formats Used by Major Labs

### 1.1 RLDS / Open X-Embodiment (Google DeepMind)

**Format foundation:** Built on TensorFlow Datasets (TFDS), stored as serialized TFRecord files.

**Structure:**
```
Dataset
└── Episodes (sequence)
    └── Steps (per timestep)
        ├── observation
        │   ├── image (RGB, variable resolution)
        │   ├── depth (optional)
        │   ├── state (robot proprioception vector)
        │   └── natural_language_instruction (string)
        ├── action (7-dim vector: x, y, z, roll, pitch, yaw, gripper)
        ├── reward (scalar, often sparse)
        ├── is_first (bool)
        ├── is_last (bool)
        └── is_terminal (bool)
```

**Key properties:**
- Episodic structure — each episode is a complete task attempt
- Actions standardized as 7-DoF end-effector control (position delta + gripper)
- Supports heterogeneous embodiments via per-dataset feature specs
- Open X-Embodiment: 1M+ trajectories, 22 robot embodiments, 60 datasets, 34 labs
- Enables parallelized loading across frameworks
- Tightly coupled to TensorFlow ecosystem — needs adapters for PyTorch/JAX

**When used:** Pre-training cross-embodiment foundation models (RT-X series). The lingua franca for Google's robotics research.

---

### 1.2 LeRobot Format v2.1 (HuggingFace)

**On-disk structure:**
```
dataset/
├── data/
│   ├── episode_000000.parquet    # tabular step data
│   ├── episode_000001.parquet
│   └── ...
├── videos/
│   ├── observation.images.main/
│   │   ├── episode_000000.mp4
│   │   └── ...
│   ├── observation.images.wrist/
│   │   └── ...
│   └── ...
├── info.json                     # dataset metadata, codebase_version
├── episodes.jsonl                # per-episode metadata
└── episodes_stats.jsonl          # per-episode statistics
```

**Parquet columns per step:**
- `index` — global unique frame ID
- `episode_index` — which episode
- `frame_index` — position within episode
- `timestamp` — float seconds
- `observation.state` — robot joint/EE state vector
- `action` — action vector
- `observation.images.<camera_name>` — reference to video frame

**Key innovations:**
- **`delta_timestamps`**: Retrieve temporally offset frames relative to current step (e.g., `[-1.0, -0.5, -0.2, 0.0]`), giving models temporal context without duplicating data
- **Dot-notation naming**: `observation.images.wrist`, `observation.state` — standardized across datasets
- **Video-first**: Images stored as MP4 (not raw frames), massive storage savings
- **Hub integration**: Push/pull from HuggingFace Hub, streaming support
- **v3.0 planned (Sept 2025)**: Multi-episode packing for >1M episode scale, native streaming

**When used:** Community standard for sharing datasets, LeRobot training framework, and increasingly for fine-tuning pi0 via OpenPI.

---

### 1.3 Physical Intelligence pi0 / pi0.5 Data Format

**Ingestion format:** LeRobot v2.1/v3.0 (for external/fine-tuning), proprietary internal format for pre-training.

**What a training sample contains:**
```
{
  observations: {
    images: [top_view, left_wrist, right_wrist],  // variable # cameras
    state: qt,                                      // joint angle vector
  },
  actions: at,                                      // action vector
  task_description: "fold the blue towel",          // natural language
  episode_metadata: {
    robot_type: "...",
    environment: "...",
    episode_id: "...",
  }
}
```

**Scale:**
- pi0: 10,000+ hours demonstration data, 7 robot types, 68 tasks
- pi0.5: Even broader — mobile manipulators, multi-environment, cross-embodiment, web data, verbal instructions
- Terabytes of sensor data collected daily from robots with varying hardware

**Training framework:** OpenPI (JAX-based), supports multi-GPU distributed training.

**Two-stage recipe:**
1. **Pre-training**: Massive diverse data → broad generalization
2. **Post-training**: Small high-quality task-specific data → specific skills

**Action generation:**
- **Flow matching** for continuous action generation (smooth trajectories)
- **FAST tokenizer** for discrete action tokens in pre-training (pi0.5)
- Missing camera slots can be masked out (handles heterogeneous setups)

---

### 1.4 NVIDIA Isaac Sim Output Format

**Scene format:** Universal Scene Description (USD) with Material Definition Language (MDL)

**Generated data types:**
| Output | Format | Use |
|--------|--------|-----|
| RGB images | PNG/EXR | Visual perception training |
| Depth maps | EXR float | Spatial understanding |
| Semantic segmentation | PNG masks | Object classification |
| Instance segmentation | PNG masks | Individual object ID |
| 2D bounding boxes | KITTI format | Detection |
| 3D bounding boxes | KITTI format | 3D detection |
| Disparity maps | EXR | Stereo vision |
| Grasping data | Custom | Grasp point prediction |
| Trajectory data | Custom | Motion planning |
| Action/event data | Custom | RL reward signals |

**Key capability:** Domain randomization — systematic variation of lighting, textures, materials, object positions, camera poses, colors, object counts. This is what makes synthetic data useful despite the sim-to-real gap.

**Output pipeline:** Custom writers via JSON config → offline storage → training. Supports KITTI format natively, custom writers for anything else.

---

### 1.5 FAST (Frequency-space Action Sequence Tokenization)

**What it solves:** Traditional action discretization (bin each dimension independently) loses fine-grained dexterity information and creates extremely long token sequences.

**How it works:**
```
Raw action chunk (e.g., 50 timesteps × 7 DoF)
    │
    ▼ Discrete Cosine Transform (DCT)
    │  Converts time-domain → frequency-domain
    │  Most energy concentrated in low frequencies
    │  Truncate high-frequency components
    │
    ▼ Quantization
    │  Discretize the DCT coefficients
    │
    ▼ Byte Pair Encoding (BPE)
    │  Learn common coefficient patterns
    │  Merge frequent pairs into single tokens
    │
    ▼ Dense token sequence (~10x compression vs naive)
```

**Result:** Continuous robot actions represented as a short sequence of discrete tokens — just like language tokens. This enables autoregressive transformer policies to generate dexterous actions.

**Impact:**
- pi0-FAST trains 5x faster than diffusion-based pi0 with comparable performance
- Enables tasks requiring high dexterity: laundry folding, table bussing, grocery packing
- Compatible with standard autoregressive training (no diffusion head needed)
- DCT early stopping further reduces observation-to-action latency

---

### 1.6 Common Format Comparison

| Format | Storage | Structure | Ecosystem | Cloud-native | Best for |
|--------|---------|-----------|-----------|--------------|----------|
| **RLDS/TFRecord** | Binary protobuf | Episodes → Steps | TensorFlow | No | Pre-training, OXE ecosystem |
| **LeRobot (Parquet+MP4)** | Parquet + video | Episodes with dot-notation | HuggingFace/PyTorch | Yes | Sharing, fine-tuning, community |
| **HDF5** | Hierarchical binary | Groups → Datasets | Framework-agnostic | Limited | Lab-internal storage, single-file |
| **ZARR** | Chunked N-d arrays | Hierarchical + chunks | Python/cloud | Yes | Cloud pipelines, parallel I/O |
| **ROS bags** | Serialized messages | Topics × Time | ROS | No | Raw capture, debugging, replay |
| **MCAP** | Binary container | Topics × Time | Foxglove/ROS2 | Yes | Modern ROS2, data management |
| **JSONL** | Text | Line-delimited records | Any | Yes | Metadata, lightweight logs |

**Typical flow:**
```
ROS bag (capture) → HDF5 or ZARR (lab processing) → RLDS or LeRobot (training)
```

---

## 2. Full Data Pipeline: Raw Capture to Deployed Model

### Stage 1: Raw Capture

**Sensor suite (typical manipulation lab):**

| Sensor | Output | Rate | Data volume |
|--------|--------|------|-------------|
| RGB cameras (2-4) | 640×480 or 1280×720 images | 30 Hz | ~100 MB/min per camera |
| Depth camera (RealSense/ZED) | Depth maps + point clouds | 30 Hz | ~200 MB/min |
| Wrist camera | 224×224 or 640×480 | 30 Hz | ~50 MB/min |
| Joint encoders | Joint positions (6-7 DoF) | 100-1000 Hz | ~1 MB/min |
| Torque sensors | Joint torques | 100-1000 Hz | ~1 MB/min |
| F/T sensor (wrist) | 6-axis force/torque | 100-1000 Hz | ~1 MB/min |
| End-effector pose | 6-DoF SE(3) | 100 Hz | ~0.5 MB/min |
| Gripper state | Position + force | 100 Hz | ~0.1 MB/min |
| IMU | 9-axis (accel, gyro, mag) | 200 Hz | ~0.5 MB/min |
| Microphone (optional) | Audio waveform | 16-48 kHz | ~5 MB/min |

**Capture methods:**
- **Teleoperation**: VR controllers (Meta Quest), leader-follower arms (ALOHA), spacemouse, teaching pendant
- **Kinesthetic teaching**: Physically guiding the robot
- **Autonomous collection**: Robot runs existing policy, records everything
- **Simulation**: Isaac Sim, MuJoCo, SAPIEN → synthetic sensor streams

**Raw output:** ROS bags (ROS1 `.bag` or ROS2 `.db3`/`.mcap`), or direct streaming to HDF5/ZARR.

**Scale reference:** An autonomous vehicle generates ~1 TB/hour. A manipulation setup generates ~5-20 GB/hour depending on cameras.

---

### Stage 2: Processing / Cleaning

**What happens to raw data:**

1. **Time synchronization** — Align all sensor streams to common clock. Critical because cameras run at 30Hz, proprioception at 100-1000Hz, and network delays introduce jitter. Poor sync directly degrades learning.

2. **Resampling** — Downsample proprioception to match camera rate (typically 10-30 Hz for training). Interpolate or nearest-neighbor for action labels.

3. **Image processing:**
   - Crop, resize to standard resolution (224×224 for ViT, 256×256 for diffusion models)
   - Undistort lens distortion (using camera intrinsics)
   - Color normalization
   - Video encoding (raw frames → H.264/H.265 MP4)

4. **State filtering:**
   - Low-pass filter joint positions/velocities to remove encoder noise
   - Dead-band removal from teleoperation input
   - Outlier detection and removal (spikes from sensor glitches)

5. **Episode segmentation:**
   - Detect episode boundaries (task start/end triggers, gripper events, operator signals)
   - Remove dead time (setup, reset periods)
   - Mark failed episodes vs. successful episodes

6. **Action label computation:**
   - Compute action deltas from absolute positions (position[t+1] - position[t])
   - Transform between coordinate frames (base frame, end-effector frame, camera frame)
   - Normalize action ranges (typically [-1, 1])

7. **Quality filtering:**
   - Remove episodes with sensor dropout
   - Remove episodes where robot hit joint limits
   - Remove episodes with excessive teleoperation latency
   - Optionally remove suboptimal demonstrations (slow, jerky, failed)

---

### Stage 3: Annotation / Labeling

**What gets added:**

| Annotation type | Method | Purpose |
|----------------|--------|---------|
| **Language instruction** | Human post-hoc or during collection | Task conditioning for VLAs |
| **Task ID / category** | Manual or clustering | Task-conditional training |
| **Success/failure label** | Human review or automated heuristic | Filtering + reward signal |
| **Sub-task boundaries** | Human or LLM-assisted | Hierarchical task learning |
| **Object labels** | Manual bbox / segmentation | Object-centric representations |
| **Grasp type** | Domain expert | Grasp taxonomy training |
| **Contact events** | F/T sensor thresholding | Contact-rich manipulation |
| **Scene description** | VLM auto-captioning | Cross-modal alignment |
| **Difficulty rating** | Human expert | Curriculum learning |
| **Environment metadata** | Automated logging | Domain adaptation |

**Emerging trend:** LLM/VLM-assisted annotation — run GPT-4V or similar on episode videos to auto-generate language descriptions and sub-task decompositions. Reduces per-episode annotation cost from minutes to seconds.

**What makes annotation expensive:** Fine-grained temporal annotations (sub-task boundaries at specific frames), contact event labeling, grasp type classification — these require domain expertise, not just crowdworkers.

---

### Stage 4: Format Conversion

**Conversion paths:**

```
ROS bag (.bag/.db3/.mcap)
    │
    ├──► HDF5 (lab internal)
    │       ├── /episode_0/observations/images/cam_top  [N×H×W×3 uint8]
    │       ├── /episode_0/observations/state            [N×D float32]
    │       ├── /episode_0/actions                       [N×A float32]
    │       └── /episode_0/metadata                      {task, success, ...}
    │
    ├──► RLDS / TFRecord
    │       ├── Requires defining a TFDS builder
    │       ├── Map features to RLDS schema
    │       └── Serialize as TFRecord shards
    │
    └──► LeRobot (Parquet + MP4)
            ├── Encode images as MP4 video per camera per episode
            ├── Store state/action as Parquet columns
            ├── Compute and store episode statistics
            └── Push to HuggingFace Hub
```

**Tooling:**
- `rosbags` (Python) — ROS1 ↔ ROS2 bag conversion
- `rlds_dataset_builder` — Raw data → RLDS format
- `lerobot` CLI — Convert various formats → LeRobot v2.1
- Custom scripts — Most labs have bespoke conversion pipelines
- `bag2hdf5` — ROS bag → HDF5

**Key challenge:** Action space standardization. Different robots have different DoF (6 for UR5, 7 for Franka, 14 for bimanual). Labs must decide: normalize to EE-space (lose joint info) or keep native joint space (harder to cross-train).

---

### Stage 5: Pre-training

**Data requirements for foundation model pre-training:**

```
Data Pyramid (by volume, bottom to top):

▲  Real robot teleoperation data (highest quality, lowest volume)
│  │  ~10K-100K hours
│  │  Provides: grounded physical interaction, contact dynamics
│  │
│  ├── Simulation data (medium quality, high volume)
│  │  ~100K+ hours
│  │  Provides: action labels, physics, diversity via domain randomization
│  │  Exchange rate: ~8 sim samples ≈ 1 real sample
│  │
│  ├── Human manipulation video (YouTube, Ego4D, etc.)
│  │  ~1M+ hours
│  │  Provides: semantic understanding, object affordances, task structure
│  │  Warning: embodiment gap can DEGRADE performance if not handled carefully
│  │
│  └── Web-scale image-text data (inherited from VLM backbone)
│     ~Billions of image-text pairs
│     Provides: visual recognition, language understanding, common sense
```

**How data is consumed in pre-training:**

- **VLA pre-training (pi0, RT-2):** Images + language → action tokens. Model learns cross-embodiment action prediction. All modalities tokenized and fed through single transformer.
- **World model pre-training:** Video frames → predicted future frames. Model learns physics and dynamics. Consumes massive video data.
- **Representation pre-training:** Contrastive learning on image-text pairs, or masked autoencoding on video. Learned representations transferred to downstream policy.

**Modalities that matter most at pre-training:**
1. RGB images (primary visual input)
2. Language instructions (task specification)
3. Actions (the learning signal — what to predict)
4. Robot state / proprioception (essential context for action prediction)

---

### Stage 6: Post-training / Fine-tuning

**How data is used differently:**

| Aspect | Pre-training | Post-training |
|--------|-------------|---------------|
| **Volume** | 10K-100K+ hours | 50-500 episodes per task |
| **Diversity** | Maximum diversity, many tasks/robots | Narrow: specific task, specific robot |
| **Quality** | Acceptable quality at scale | Must be high quality, consistent |
| **Source** | Mixed (real + sim + video) | Almost always real teleoperation |
| **Labels** | Coarse (task description) | Fine-grained (sub-tasks, corrections) |
| **Robot** | Many embodiments | Target deployment robot only |

**Post-training methods:**
1. **Supervised fine-tuning (SFT):** Behavioral cloning on task-specific demos
2. **RL fine-tuning:** Autonomous practice with self-predicted or human rewards
3. **DPO / RLHF-style:** Preference data (which trajectory is better?)
4. **Flow matching fine-tuning:** Continue training the action diffusion head on new task data

**Critical insight:** Post-training data is where a data company has the most leverage. Labs need small volumes of very high-quality, task-specific data from target environments. This is the opposite of commodity — it's bespoke.

---

### Stage 7: Evaluation

**How data is used for evaluation:**

| Evaluation type | Data source | Metrics |
|----------------|-------------|---------|
| **Held-out test set** | Withheld episodes from same distribution | Action prediction error (MSE, L1) |
| **Simulation benchmark** | LIBERO, RoboCasa, MetaWorld | Task success rate (TSR) |
| **Real-world eval** | Physical robot running policy live | TSR, completion time, failure mode analysis |
| **Generalization eval** | Novel objects, scenes, instructions | Zero-shot TSR, few-shot adaptation speed |
| **Robustness eval** | Perturbations (lighting, distractors, pose variation) | TSR under distribution shift |
| **Safety eval** | Edge cases, failure scenarios | Collision rate, force limits, recovery rate |

**What labs actually care about (beyond TSR):**
- **Failure mode taxonomy:** Not just "did it fail" but "how did it fail" — grasp failure, planning error, perception error, timing error
- **Recovery capability:** Can the policy recover from perturbations mid-task?
- **Consistency:** Same task, same setup — how variable is performance?
- **Speed:** Time-to-completion relative to human teleoperation baseline

---

## 3. Data Modalities by Training Stage

| Modality | Capture | Processing | Pre-training | Fine-tuning | Eval |
|----------|---------|------------|-------------|-------------|------|
| **RGB video** | Primary | Crop, resize, encode | Critical | Critical | Ground truth |
| **Depth** | Often captured | Denoise, align | Moderate | Task-dependent | Spatial metrics |
| **Point clouds** | From depth/LiDAR | Filter, downsample | World models | Manipulation tasks | 3D metrics |
| **Joint positions** | Always | Filter, normalize | Important (state) | Critical | Action comparison |
| **Joint torques** | Usually | Low-pass filter | Secondary | Contact-rich tasks | Force compliance |
| **EE pose** | Derived or measured | Transform frames | Important | Critical (action space) | Trajectory metrics |
| **Language instructions** | Human annotated | Clean, standardize | Critical (VLA) | Critical (VLA) | Task specification |
| **Action labels** | From teleop/policy | Compute deltas, normalize | The training signal | The training signal | Prediction target |
| **Force/torque** | Optional sensor | Filter, threshold | Secondary | Critical for contact | Contact metrics |
| **Task metadata** | Manual/automated | Structure, validate | Useful for mixing | Essential for conditioning | Stratification |
| **Audio** | Rare | Feature extraction | Emerging | Rare | Rare |

**What matters most by stage:**
- **Pre-training:** RGB + Language + Actions + State (the VLA quad)
- **Fine-tuning:** RGB + Actions + State (tighter focus, higher quality)
- **Eval:** Task success metrics + failure analysis (data used as ground truth)

---

## 4. How Model Architectures Consume Data Differently

### 4.1 VLAs (Vision-Language-Action Models) — pi0, RT-2, Octo

**Architecture:** Pre-trained VLM backbone (PaLI-X, SigLIP, etc.) + action output head

**Data consumption:**
```
Input:  [Image tokens] + [Language tokens] + [State tokens]
Output: [Action tokens]
```

**What they need:**
- Image-text-action triplets (the core training signal)
- Language instructions per episode (task conditioning)
- Standardized action space (EE-space preferred for cross-embodiment)
- Temporal context (history of recent frames/actions)
- Large-scale diverse data for pre-training, small precise data for fine-tuning

**Action representation:**
- RT-2: Actions discretized as text tokens ("1 128 91 241 5 101 127 217")
- pi0: Flow matching (continuous) or FAST tokens (discrete)
- Octo: Diffusion action head

**Unique property:** Can leverage internet-scale VLM pre-training → language grounding "for free." This is why VLAs are winning — they inherit common sense from web data.

---

### 4.2 Imitation Learning / Behavioral Cloning

**Architecture:** CNN/ViT encoder → MLP/diffusion action decoder

**Data consumption:**
```
Input:  observation_t (image + state)
Output: action_t (or action chunk a_{t:t+k})
```

**What they need:**
- Expert demonstrations only (no exploration data, no failures)
- High consistency in demonstrations (noisy demos → noisy policy)
- Diversity of initial conditions (many starting poses, object positions)
- Typically 50-200 demonstrations per task
- State-action pairs at fixed frequency (usually 10-30 Hz)
- No language needed (task defined by training set)

**Critical constraint:** Policy is bounded by demonstration distribution — can't generalize beyond what it's seen. This makes data diversity more important than volume.

**Emerging approaches:**
- Diffusion Policy: Predicts multi-modal action distributions → handles ambiguous demonstrations
- Action chunking: Predict next K actions at once → smoother trajectories

---

### 4.3 Reinforcement Learning

**Architecture:** Actor-critic networks, or policy gradient methods

**Data consumption:**
```
Input:  state_t (observation)
Output: action_t
Signal: reward_t (scalar feedback after action)
```

**What they need:**
- Reward function (sparse: success/fail, or dense: shaped reward)
- Millions of interaction samples (state, action, reward, next_state)
- Mostly generated in simulation (real-world RL is impractical at scale)
- Reset mechanism (return to start state between episodes)
- Randomized environments for robustness

**Data characteristics:**
- Data is self-generated through exploration (not collected from humans)
- Quality improves over training (early data is random exploration)
- Requires parallel simulation for sample efficiency (1000s of environments)
- Offline RL variant: Learn from pre-collected dataset without further interaction

**Exchange rate:** ~8 simulation samples to achieve equivalent learning from 1 real teleoperation sample.

---

### 4.4 World Models

**Architecture:** Video prediction model (transformer or diffusion-based)

**Data consumption:**
```
Input:  frames_{t-k:t} + action_t
Output: predicted frame_{t+1} (or video sequence)
```

**What they need:**
- Massive amounts of video data (real + simulation + internet)
- Action-conditioned video (what happens if I do X?)
- Diverse environments and scenarios
- Potentially petabytes of data for training
- Human activity videos as supplementary data source

**What they produce:**
- Synthetic training data for downstream policies (RL agents, BC policies)
- Physics-aware predictions for planning
- Simulated environments for safe RL exploration

**Key insight:** World models are data multipliers — they consume large data to learn physics, then generate unlimited synthetic data for other approaches. This partially solves the robotics data scarcity problem.

---

## 5. What Makes a Dataset Valuable vs. Commodity

### 5.1 Quality Hierarchy

```
Tier 1: Premium (highest value per sample)
├── Expert teleop with force/torque data
├── Sub-task annotated with temporal boundaries
├── Multiple environment variations
├── Contact-rich manipulation (deformable objects, liquids)
├── Failure + recovery demonstrations
└── Calibrated multi-camera with depth

Tier 2: Standard (bulk value)
├── Clean teleop demonstrations (single camera + state)
├── Task-level language annotations
├── Success/failure labels
└── Single environment, controlled conditions

Tier 3: Commodity (low per-sample value)
├── Simulation-generated data
├── Internet video (no action labels)
├── Single-task repetitive demonstrations
└── Low-frequency, low-resolution capture
```

### 5.2 Quality Metrics Labs Actually Care About

| Metric | What it measures | Why it matters |
|--------|-----------------|----------------|
| **Time alignment precision** | Sync across sensors (< 5ms) | Misaligned data teaches wrong correlations |
| **Action smoothness** | Jerk in action trajectory | Jerky teleop → jerky policy |
| **Demonstration consistency** | Variance across demos of same task | High variance = harder to learn from |
| **State coverage** | Distribution of starting/goal states | Gaps in coverage = brittle policies |
| **Task completion rate** | % successful episodes | Failed data has limited use (unless labeled) |
| **Camera calibration accuracy** | Extrinsic/intrinsic params | Wrong calibration = wrong spatial reasoning |
| **Temporal density** | Hz of state/action recording | Low Hz loses important dynamics |
| **Annotation granularity** | Level of label detail | Coarse labels limit what models can learn |
| **Environment diversity** | # unique scenes, objects, lighting | Single-environment data doesn't generalize |
| **Embodiment diversity** | # robot types | More embodiments = better generalization |

### 5.3 What Metadata Makes Data Premium

**The difference between $1/episode and $100/episode:**

```
Commodity metadata:
  - task: "pick up object"
  - success: true
  - robot: "franka"

Premium metadata:
  - task: "pick up deformable red cloth from table edge"
  - sub_tasks: ["approach", "grasp_edge", "lift", "regrasp", "fold"]
  - sub_task_timestamps: [0.0, 1.2, 2.8, 4.1, 5.5]
  - success: true
  - difficulty: "hard"
  - failure_modes_avoided: ["cloth_slip", "table_collision"]
  - object_properties: {material: "cotton", mass: 0.05, deformable: true}
  - grasp_type: "pinch_grasp"
  - contact_events: [{t: 1.2, type: "initial_contact", force: 2.3N}]
  - environment: {lighting: "overhead_fluorescent", table_height: 0.75m}
  - operator_skill_level: "expert"
  - camera_calibration: {intrinsics: [...], extrinsics: [...]}
  - force_torque_recorded: true
```

### 5.4 Internet Video Data vs. High-Quality Teleoperation Data

| Dimension | Internet/Scraped Video | High-Quality Teleoperation |
|-----------|----------------------|---------------------------|
| **Action labels** | None (must infer from vision) | Exact joint/EE commands at every timestep |
| **Embodiment match** | Human hands ≠ robot gripper | Directly on target robot |
| **Contact dynamics** | Not measured | Force/torque data available |
| **State information** | Visual only | Full proprioceptive state |
| **Camera calibration** | Unknown | Known and calibrated |
| **Temporal precision** | Variable frame rates, edits | Fixed Hz, synchronized |
| **Task specificity** | Generic manipulation | Target deployment tasks |
| **Scale** | Practically unlimited | Expensive, 10-1000x less |
| **Embodiment gap** | Severe — can degrade performance | None |
| **Use case** | Pre-training (visual representations, semantics) | Fine-tuning (actual policy learning) |
| **Value** | ~$0.001/video | ~$10-100/episode |

**Critical finding:** Studies show that adding large amounts of human video to robot training data can actually degrade in-domain performance. The embodiment gap is real and unresolved — this is why labs pay premium for teleoperation data.

**The Build.ai comparison:** A company scraping manipulation videos from the internet provides semantic understanding data (what tasks look like) but not actionable training data (how to actually do the task on a specific robot). The gap is:
1. No action labels (the primary training signal for policies)
2. No proprioceptive state
3. Wrong embodiment (human hand vs. robot gripper)
4. No force/contact information
5. Uncontrolled viewpoints and quality

This makes internet video useful for pre-training visual encoders and world models, but insufficient for post-training/fine-tuning — which is where the actual deployment-critical learning happens.

---

## Connections

- Related: <span class="wikilink wikilink--unresolved">Robotics Data</span>, [Action Data](/vault/action-data/), <span class="wikilink wikilink--unresolved">Teleoperation</span>, [Synthetic Data Pipeline](/vault/synthetic-data-pipeline/), <span class="wikilink wikilink--unresolved">Physical Intelligence</span>, [How Labs Collect Data](/vault/how-labs-collect-data/)
- See also: <span class="wikilink wikilink--unresolved">Phi9</span>, <span class="wikilink wikilink--unresolved">Robotics Data Market</span>, <span class="wikilink wikilink--unresolved">Robotics Data Competitors</span>, <span class="wikilink wikilink--unresolved">Physical Agents Data</span>

## Open Questions

- What is the actual exchange rate between synthetic and real data for contact-rich manipulation? The ~8:1 number is for locomotion — manipulation may be worse.
- How will world models change the data value equation? If labs can generate unlimited synthetic data from small real datasets, does the unit economics of data collection collapse?
- Will FAST tokenization (or successors) become the standard action representation, displacing both naive discretization and diffusion heads?
- What's the minimum viable dataset size for fine-tuning a foundation model on a new task? Current estimates range from 50-500 episodes — can this be reduced?
- How will LeRobot v3.0's multi-episode packing change dataset distribution and sharing patterns?
- What role will RL post-training play — will it reduce dependence on demonstration data quality?

---
Last Updated: 2026-02-23
