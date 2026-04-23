---
title: Data
description: Phi9 builds data systems for physical AI, from capture and sourcing to structure, evaluation, and operational reuse.
heroSubtitle: Data systems for physical intelligence.
published: 2026-04-18
updated: 2026-04-23
author: Phi9
tags:
  - Data
navTitle: Data
---

Phi9 builds the data layer that physical AI depends on.

Before autonomy scales, data has to. We build the capture systems, sourcing networks, and structured data products that turn real-world behavior into data models can actually learn from — and that evaluation can actually trust.

## Why data matters

Physical AI is bottlenecked by data quality, not just model quality.

It is not only how much data exists. It is whether the data preserves motion, intent, timing, task structure, and failure — well enough to survive training and tell the truth in evaluation.

## What we produce

Every phi9 capture carries five synchronized layers. They are collected together, timed to the millisecond, and structured so any one of them can feed a training or evaluation workflow without rebuilding the rest.

**Motion** — full-body pose at high frame rates. Joint angles, limb trajectories, and skeletal data retargetable to humans, humanoids, and robot arms.

**Video** — first-person and third-person footage, aligned to the motion within a millisecond. RGB, depth, and optional stereo.

**Task** — segmented demonstrations with start, end, success, and intent labels. What was being done, what worked, what failed.

**Scene** — object positions, lighting, rig calibration, and quality checks. Enough context to reconstruct or simulate the moment.

**Evaluation** — success traces, failure cases, and transfer results. How a trained policy performs on captured reality versus unscripted operation.

## What needs our attention

These are the constraints we think about most. They shape what we ship next and what we decline to build.

**Scale vs. fidelity.** Collecting enough physical data without losing the precision that makes it trainable. Most physical AI work eventually breaks on this tradeoff.

**Intent in the data.** Capturing not only what happened on camera, but what the body was trying to do. Models trained on observation learn patterns. Models trained on intent learn tasks.

**Transfer, not scores.** A benchmark number means little if a policy collapses outside the benchmark. We care about the data and the evaluation that predict deployment behavior.

**The full loop.** Capture, structure, training, and evaluation still get treated as separate stages. Wiring them into one research system is where real progress becomes legible.

## Capture systems

We build capture rigs that go beyond narrow lab demonstrations.

The goal is to collect multimodal physical behavior in forms that can be reused across research, post-training, and deployment — not trapped inside a single collection surface.

## Sourcing networks

The bottleneck is not one rig. It is a network that can source, collect, and maintain data across people, places, and tasks without collapsing on quality.

Some data we capture directly. Some comes through partners and task-specific pipelines. The point is durable access to the right demonstrations, contexts, and failures.

## Quality and synchronization

Good data is synchronized, structured, and inspectable.

Timing drift, missing context, and weak metadata do not just reduce polish. They change what a model can learn, and what a benchmark can honestly claim.

## Outputs and integration

Captured data should flow directly into training and evaluation.

We care about outputs that are format-native, simulation-ready, and legible across research workflows — not locked inside one collection tool.
