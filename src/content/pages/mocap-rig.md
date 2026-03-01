---
title: Phi9 MoCap Rig v1
description: Full-body motion capture synchronized with egocentric video. Built for physical AI data capture at scale.
heroSubtitle: The motion capture system built for physical AI.
---

## The Problem with Current Robotics Data

**Egocentric video doesn't scale for physical AI.**

You get what the camera sees. But you don't get how the body moved. Joint angles. The full kinematic chain that makes manipulation possible.

Existing datasets capture 7-14 degrees of freedom — arms only. That works for pick-and-place. It doesn't work for humanoids that need to walk, reach, bend, and coordinate their entire body.

**High-fidelity dexterity data doesn't exist at scale.**

Motion capture systems require studios. Camera rigs. Hours of setup. They capture actors in controlled environments — not humans performing real tasks in real environments.

We built something different.

## The Solution

**Phi9 MoCap Rig v1** captures full-body human motion synchronized with egocentric video. No studio. No camera setup. Works in any environment.

Wear the suit. Attach the head-mounted camera. Perform tasks naturally. The system captures everything — what you saw, and how your body moved.

**The result:** Training data that scales. Full-body kinematics at 100 Hz, paired with first-person video, from real-world environments.

## Core Specifications

| Specification | Value |
|--------------|-------|
| **Capture Mode** | Full-body or upper-body |
| **Frequency** | 100 Hz |
| **Egocentric Video** | Synchronized, head-mounted |
| **Sync Drift** | <3ms (mocap + video) |
| **Environment** | Anywhere — homes, factories, outdoors |
| **Setup Time** | <5 minutes |
| **Calibration** | 30 seconds |
| **Battery** | 6 hours continuous |
| **Output Formats** | BVH, MVNX, CSV, HDF5, LeRobot v2.1 |

## Why This Matters for Physical AI

### Pre-Training
Foundation models need massive, diverse motion data. Our rigs deploy anywhere — capture thousands of hours of natural human behavior across environments. Not actors in studios. Real people doing real tasks.

### Mid-Training
Domain adaptation requires task-specific demonstrations. Record manipulation sequences with full joint trajectories. Retarget to any humanoid platform.

### Post-Training
Fine-tuning needs high-quality reference data. Per-episode quality metrics. Clean synchronization. Metadata that actually helps models learn.

## Data Quality

**Synchronized capture:** Motion and video align at the frame level. When the hand reaches for an object in video, the corresponding joint trajectory is at the exact same timestamp. <3ms drift across 6-hour sessions.

**Metadata-rich:** Every episode ships with task labels, subtask boundaries, object annotations, and quality scores. The metadata that makes data usable for training.

**Format-native:** Export directly to LeRobot, HDF5, MuJoCo, Isaac Sim. Data formats that integrate with your existing pipeline — no conversion friction.

## Comparison

| System | Body Coverage | Frequency | Environment | Egocentric Sync |
|--------|--------------|-----------|-------------|-----------------|
| **Phi9 MoCap v1** | **Full body / Upper body** | **100 Hz** | **Anywhere** | **Yes (<3ms)** |
| Xsens MVN | Full body | 60-240 Hz | Studio-limited | Separate system |
| Rokoko Smartsuit | Full body | 100 Hz | Studio-limited | Separate system |
| ALOHA | Arms only | 50 Hz | Lab only | No |
| UMI | End-effector | Variable | Field | Yes (EE only) |
| Egocentric video only | None | 30-60 Hz | Anywhere | N/A |

**The difference:** We combine full-body motion capture with synchronized egocentric video, designed for field deployment, at a price point that scales.

## Ease of Use

**One operator. Five minutes. Any environment.**

No camera calibration. No studio setup. No technical expertise required.

Put on the suit. Calibrate in 30 seconds. Start capturing.

This simplicity enables something important: **anyone can contribute data.** Not just trained operators in labs. Anyone wearing the suit, performing everyday tasks in their home, workplace, or any environment.

**The result:** Data diversity that reflects real-world complexity. Not sterile lab demonstrations.

## Integration with Phi9 Data Pipeline

The rig isn't standalone hardware. It's the capture layer of the Phi9 data infrastructure.

**Captured data flows directly into:**
- Automated quality scoring
- Episode segmentation
- Format conversion (LeRobot, HDF5, Zarr, MuJoCo, Isaac Sim, ROS2)
- Retargeting to humanoid URDFs
- Language annotation pipelines

**You capture. We process. You train.**

## Use Cases

**Humanoid Robotics Training**
Full-body demonstrations for bipedal locomotion, manipulation, and whole-body coordination. Retarget to Figure, 1X, Unitree, Tesla, or any humanoid platform.

**Imitation Learning Research**
Behavior cloning, inverse RL, diffusion policies — trained on complete joint trajectories with synchronized visual observation.

**Physical AI Development**
Pre-training corpora, domain-specific mid-training, fine-tuning datasets. The data infrastructure for embodied intelligence.

## From Capture to Training

1. **Wear the rig** — Full-body suit + head-mounted camera
2. **Calibrate** — 30 seconds
3. **Perform tasks** — Natural motion in real environments
4. **Upload** — Data flows into Phi9 pipeline
5. **Export** — Ready-to-train formats for your framework

## Get Started

Building physical AI? You need data infrastructure that scales.

**Contact:** founders@phi9.space
