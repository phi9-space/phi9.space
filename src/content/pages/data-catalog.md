---
title: Data Catalog
description: Structured, multi-modal, domain-diverse data ready for pretraining, policy training, and world-model pipelines.
heroSubtitle: Structured, multi-modal, domain-diverse data ready for training.
published: 2026-04-23
updated: 2026-04-23
author: Phi9
tags:
  - Lab
  - Product
  - Data
---

The Data Catalog is where phi9 captures, structures, multiplies, and ships data as a reusable research asset.

It is built on top of the capture rigs in the lab. The same demonstration moves through the catalog as multiple usable views — pretraining corpus, policy-training episodes, world-model reconstruction fragments — without being re-collected or re-aligned.

## Why data matters

Physical AI is bottlenecked by data quality, not just model quality.

It is not only how much data exists. It is whether the data preserves motion, intent, timing, task structure, and failure well enough to survive training and tell the truth in evaluation.

## What every capture carries

Every phi9 capture carries twelve synchronized capabilities. They are collected together, timed to the millisecond, and structured so any one of them can feed a training or evaluation workflow without rebuilding the rest.

**Highest-fidelity motion** — 120+ Hz full-body pose with body and hand trajectories, calibrated per session.

**Real-time multi-modal sync** — motion, video, depth, IMU, and tactile aligned within a millisecond at capture.

**Manipulative + locomotive** — fine-motor tool use and whole-body movement from the same rig, without a setup swap.

**Parent + subtask labels** — hierarchical demonstration structure with intent, success, and failure signals.

**Pipeline-ready exports** — drop into pretraining, policy training, or world-model workflows without reformatting.

**Multi-view video** — ego-centric plus wrist POV, first-person context with close-object detail.

**Depth · IMU · Tactile** — geometry, inertial context, and contact force alongside the visual stream.

**Scene metadata** — object state, lighting, calibration, and layout per capture.

**Retargeting-ready** — skeletal maps for humanoids, robot arms, and simulated agents.

**Evaluation traces** — success cases, failure modes, and transfer results across environments.

## What needs our attention

**Scale vs. fidelity.** Collecting enough physical data without losing the precision that makes it trainable.

**Intent in the data.** Capturing what the body was trying to do, not just what the camera saw.

**Transfer, not scores.** Evaluation that predicts deployment behavior, not benchmark performance.

**The full loop.** Wiring capture, structure, training, and evaluation into one research system — not three disconnected stages.

## Capture, sourcing, quality

**Capture systems.** We build rigs that go beyond narrow lab demonstrations and collect multi-modal physical behavior reusable across research, post-training, and deployment.

**Sourcing networks.** The bottleneck is not one rig — it is a network that can source, collect, and maintain data across people, places, and tasks without collapsing on quality. Some data we capture directly, some comes through partners and task-specific pipelines.

**Quality and synchronization.** Good data is synchronized, structured, and inspectable. Timing drift, missing context, and weak metadata change what a model can learn and what a benchmark can honestly claim.

**Outputs and integration.** Captured data flows directly into training and evaluation. Outputs are format-native, simulation-ready, and legible across research workflows — not locked inside one collection tool.
