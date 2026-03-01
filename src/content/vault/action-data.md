---
title: Action Data
description: >-
  The tokens of motion — how robot action data works, why it's scarce, and how
  it enables physical agents to learn from trajectories.
publish: false
type: note
category: research
datasetKind: other
tags:
  - concept-note
  - robotics-data
  - action-data
  - vla
status: published
featured: false
slug: action-data
aliases: []
sourcePath: Action Data.md
date: '2026-02-22T00:00:00.000Z'
updated: '2026-02-27T00:00:00.000Z'
---
# Action Data

## What It Is
The "tokens" of motion. LLMs learn from words, physical agents learn from trajectories. Action data is the recording of what the robot actually did to change its state.

## Key Details

**Action Space**
The menu of possible moves. Can be discrete (up, down, left, right) or continuous (rotate Joint-1 by X degrees with Y torque).

**Hertz / Frequency**
Action data is high-frequency. A robot doesn't just pick up a cup — it executes hundreds of tiny micro-adjustments per second.

**Content**
Consists of a control vector — these are the action tokens. In models like <span class="wikilink wikilink--unresolved">Physical Intelligence</span>'s pi0-FAST, action tokens sit alongside language tokens, enabling reasoning and action in a unified stream.

**Action Tokens in Practice**
```json
"action_tokens": [32104, 32088, 32550, 32001]
// [Movement_Forward, Slight_Right_Yaw, High_Torque_Mode, Gripper_Neutral]
```

## How It Relates to Other Data Types
- <span class="wikilink wikilink--unresolved">Robotics Data Industry Report</span> — full taxonomy of data types (perception, proprioceptive, metadata)
- Action Data + Success Metadata → use RL to improve
- Action Data + Physics Metadata → sim-to-real gap bridging by matching real-world friction
- Action Data alone → basic imitation

## Who Has It
- <span class="wikilink wikilink--unresolved">Physical Intelligence</span> — 10K+ hours across 68 tasks, 7 embodiments
- Google DeepMind — Open X-Embodiment (1M+ episodes, 22 robot types)
- Build.ai — 100K hours of egocentric video, but no action labels or joint data (commodity)
- Most labs generate their own and don't sell it

## Why It's Scarce
Unlike text data, action data requires physical interaction — someone or something must actually do the task. This creates a real supply constraint. See <span class="wikilink wikilink--unresolved">Robotics Data Market</span> for pricing and <span class="wikilink wikilink--unresolved">Teleoperation Hardware</span> for collection methods.

## Connections
- <span class="wikilink wikilink--unresolved">Robotics Data</span> — parent concept
- [Synthetic Data Pipeline](/vault/synthetic-data-pipeline/) — how action data gets multiplied
- <span class="wikilink wikilink--unresolved">Teleoperation Hardware</span> — how action data gets captured
- <span class="wikilink wikilink--unresolved">Physical Intelligence</span> — biggest consumer

## Open Questions
- What is the minimum viable action dataset for post-training?
- How do action tokens differ across VLA architectures?
- What fidelity is lost when translating motion capture to robot joint space?

---
Last Updated: 2026-02-22
