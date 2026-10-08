# VoxVerify AI - System Architecture & Multimodal Late Fusion Specification

## 1. System Overview

VoxVerify AI consists of a high-performance Python FastAPI backend paired with a Next.js (TypeScript) client application designed with a security-focused caller-ID aesthetic.

---

## 2. Component Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                          VoxVerify Frontend (Next.js)                 │
│                                                                        │
│  ┌───────────────────────┐ ┌──────────────────────┐ ┌──────────────┐ │
│  │ VoiceVerifier         │ │ VideoVerifier        │ │ Multimodal   │ │
│  │ AudioPlayer / Waveform│ │ Player + Timeline    │ │ Verifier     │ │
│  └───────────┬───────────┘ └──────────┬───────────┘ └──────┬───────┘ │
└──────────────│────────────────────────│────────────────────│─────────┘
               │ HTTP Multipart Upload  │                    │
               ▼                        ▼                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                          VoxVerify Backend (FastAPI)                  │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ REST Endpoints: /api/verify/voice, /video, /multimodal, /status  │  │
│  └──────────────────────────────────┬───────────────────────────────┘  │
│                                     │                                  │
│         ┌───────────────────────────┴───────────────────────────┐      │
│         ▼                                                       ▼      │
│  ┌─────────────────────────────┐                 ┌────────────────────┐│
│  │ Voice AI Pipeline           │                 │ Video AI Pipeline  ││
│  │ - VAD Audio Preprocessing   │                 │ - Frame Extraction ││
│  │ - Audio Segmenter           │                 │ - Face Detection   ││
│  │ - Wav2Vec2 PyTorch Detector │                 │ - EfficientNet AI  ││
│  └──────────────┬──────────────┘                 └─────────┬──────────┘│
│                 │                                          │           │
│                 └────────────────────┬─────────────────────┘           │
│                                      ▼                                 │
│                         ┌──────────────────────────┐                   │
│                         │ Multimodal Late Fusion   │                   │
│                         │ Engine                   │                   │
│                         └────────────┬─────────────┘                   │
│                                      ▼                                 │
│                         ┌──────────────────────────┐                   │
│                         │ Result Generator &       │                   │
│                         │ Temporary File Cleanup   │                   │
│                         └──────────────────────────┘                   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Multimodal Late Fusion Method

To prevent arbitrary score averaging, VoxVerify AI applies a **Late Fusion Strategy with Modality Reliability Weighting**.

### Mathematical Formulation

Given video risk score $S_{\text{video}} \in [0, 1]$ and audio risk score $S_{\text{audio}} \in [0, 1]$:

$$S_{\text{multimodal}} = \frac{w_v \cdot S_{\text{video}} + w_a \cdot S_{\text{audio}}}{w_v + w_a}$$

where:

- **Video Modality Reliability Weight ($w_v$)**:
  $$w_v = C_{\text{face}} \times R_{\text{frames}}$$
  - $C_{\text{face}}$ = Average face detection confidence ($0.0$ if no face detected, up to $1.0$).
  - $R_{\text{frames}}$ = Ratio of sampled frames with positive face detection.

- **Audio Modality Reliability Weight ($w_a$)**:
  $$w_a = R_{\text{speech}}$$
  - $R_{\text{speech}}$ = Speech Activity Ratio (proportion of audio containing active voice detected by VAD).

### Single Modality Fallbacks

If an uploaded video contains no audio track or non-speech audio ($w_a = 0$), the fusion engine safely falls back:
- Status: `"Video analysis available"`
- Final Score: $S_{\text{multimodal}} = S_{\text{video}}$

Conversely, if a video lacks detectable faces ($w_v = 0$):
- Status: `"Audio analysis available"`
- Final Score: $S_{\text{multimodal}} = S_{\text{audio}}$
