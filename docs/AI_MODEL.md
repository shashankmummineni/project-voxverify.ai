# VoxVerify AI - AI Model System Architecture

## Executive Overview

VoxVerify AI employs a dual-modality neural pipeline designed for high-integrity detection of synthetic audio (voice deepfakes) and synthetic video (face swaps, facial reenactment, diffusion-generated media).

The system prioritizes transparency, real-time AI status tracking, and scientifically grounded probabilistic assessments rather than binary absolute claims.

---

## Model Pipeline Architecture

```
                               ┌───────────────────────────┐
                               │     Uploaded Media        │
                               └─────────────┬─────────────┘
                                             │
                       ┌─────────────────────┴─────────────────────┐
                       ▼                                           ▼
            ┌─────────────────────┐                     ┌─────────────────────┐
            │    Audio Stream     │                     │    Video Stream     │
            └──────────┬──────────┘                     └──────────┬──────────┘
                       │                                           │
            ┌──────────▼──────────┐                     ┌──────────▼──────────┐
            │ Audio Preprocessing │                     │ Video Validation &  │
            │ & Silence Trimming  │                     │ Frame Extraction    │
            └──────────┬──────────┘                     └──────────┬──────────┘
                       │                                           │
            ┌──────────▼──────────┐                     ┌──────────▼──────────┐
            │ Voice Activity (VAD)│                     │ Face Detection &    │
            │ Segmenter           │                     │ Crop Alignment      │
            └──────────┬──────────┘                     └──────────┬──────────┘
                       │                                           │
            ┌──────────▼──────────┐                     ┌──────────▼──────────┐
            │ Audio AI Detector   │                     │ Video AI Detector   │
            │ (Wav2Vec2 / AASIST) │                     │ (EfficientNet / ViT)│
            └──────────┬──────────┘                     └──────────┬──────────┘
                       │                                           │
                       └─────────────────────┬─────────────────────┘
                                             │
                                  ┌──────────▼──────────┐
                                  │ Multimodal Late     │
                                  │ Fusion Engine       │
                                  └──────────┬──────────┘
                                             │
                                  ┌──────────▼──────────┐
                                  │  Final Verification │
                                  │     Assessment      │
                                  └─────────────────────┘
```

---

## Status Management & Zero-Fake-AI Policy

VoxVerify AI implements an explicit status model:

1. **● AI MODEL ACTIVE**: Loaded pretrained weights running on PyTorch tensor operations.
2. **⚠ AI MODEL UNAVAILABLE**: Triggers when model weights cannot be loaded or executed. Verification outputs are blocked.
3. **DEMO MODE**: Explicitly enabled only via configuration `DEMO_MODE=true`. Displays the prominent banner: `"DEMO RESULT — NOT REAL AI ANALYSIS"`.

Under no circumstance does the backend substitute unexecuted models with hidden mock scores.

---

## Assessment Standard & Terminology

Due to continuous evolution in generative AI, detection output is framed in calibrated risk bands:

- **Score < 0.35**: `Likely authentic`
- **0.35 ≤ Score ≤ 0.65**: `Inconclusive`
- **Score > 0.65**: `Potentially manipulated`

Every verification output includes the standard AI detection disclaimer regarding potential false positives and false negatives.
