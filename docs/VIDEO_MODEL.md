# VoxVerify AI - Video Deepfake Detection Model Specification

## 1. Model Identification

- **Model Name**: EfficientNet / Vision Transformer Face Deepfake Detector (`dima806/deepfake_vs_real_image_detection`)
- **Model Source**: HuggingFace / PyTorch Vision Registry
- **License**: MIT / Apache 2.0 (Open Source Commercial & Research)
- **Framework**: PyTorch (`torch`, `torchvision`, `transformers`)

---

## 2. Input Requirements & Dimensions

- **Input Modality**: Extracted video face crop tensor
- **Color Space**: RGB
- **Image Resolution**: 224 x 224 pixels
- **Batch Processing**: Dynamic batching across video frame sequence ($N \times 3 \times 224 \times 224$)
- **Normalization**: ImageNet mean (`[0.485, 0.456, 0.406]`) and std (`[0.229, 0.224, 0.225]`)

---

## 3. Preprocessing & Face Tracking Pipeline

```
Raw Video Stream (MP4/MOV/WebM/AVI)
  │
  ├─► Frame Sampling (Step size: max(1, FPS / target_sample_rate))
  │
  ├─► OpenCV Haar / Cascade Face Detector
  │     └─► Bounding Box Extraction: [x, y, w, h]
  │
  ├─► Spatial Alignment & Padding (15% margin around face boundary)
  │
  └─► Crop & Resize to 224x224 RGB Tensor
```

---

## 4. Model Weights & Inference Process

1. **Weights Loading**: Model weights are loaded via PyTorch `torch.load` or HuggingFace `AutoModelForImageClassification`.
2. **Forward Pass**: Face crop tensors are passed through backbones to produce frame-level manipulation logits $z_i$.
3. **Softmax Scoring**: Frame score $p_i = \sigma(z_i)_{\text{fake}}$ representing the probability of synthetic manipulation.
4. **Temporal Aggregation**: Windowed sliding average and peak density detection across $p_i$ values.

---

## 5. Limitations & Edge Cases

- **Extreme Pitch/Yaw**: High face rotation (>45°) may cause temporal face tracking dropouts.
- **Heavy Compression**: Low-bitrate video streams (e.g. heavily compressed messaging video) may introduce compression artifacts.
- **Lighting Dynamics**: Low-light environments reduce face alignment confidence.
