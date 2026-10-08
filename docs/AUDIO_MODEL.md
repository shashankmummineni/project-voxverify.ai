# VoxVerify AI - Audio Deepfake Detection Model Specification

## 1. Model Identification

- **Model Name**: Wav2Vec2 / AASIST Synthetic Speech Detector (`mohammedalsuraihi/wav2vec2-large-xlsr-53-deepfake-audio-detection` / Wav2Vec2 Classifier)
- **Model Source**: HuggingFace Audio / PyTorch Speech Recognition Architecture
- **License**: Apache 2.0 / MIT
- **Framework**: PyTorch (`torch`, `torchaudio`, `transformers`)

---

## 2. Input Requirements & Sampling Rate

- **Audio Channels**: Mono (1 channel)
- **Target Sampling Rate**: 16,000 Hz (16 kHz)
- **Segment Length**: 3.0 seconds (48,000 PCM audio samples per segment)
- **Sliding Step**: 1.0 second overlap for high-resolution temporal segment tracking
- **Format**: WAV / FLAC / MP3 / extracted container audio track

---

## 3. Preprocessing & Voice Activity Detection (VAD) Pipeline

```
Raw Audio Signal (16kHz Mono)
  │
  ├─► Energy-Based & Spectral Flatness VAD Filter
  │     └─► Silence & Non-Speech Frame Trimming
  │
  ├─► RMS Peak Normalization (-26 dBFS target normalization)
  │
  └─► Windowed Sliding Segmentation (3s duration, 1s hop)
```

---

## 4. Model Inference & Temporal Aggregation

1. **Feature Extraction**: Raw 16kHz audio waveforms are processed through Wav2Vec2 feature encoder layers.
2. **Transformer Hidden Representation**: Contextual representations pass through self-attention layers to extract spectral artifacts characteristic of neural speech synthesis (TTS/VC models).
3. **Classification Head**: Logits are projected to binary classification (Authentic vs Synthetic Voice).
4. **Segment Confidence Vector**: For each $j$-th 3-second segment, $s_j = P(\text{Synthetic}|x_j)$.
5. **Aggregated Score**: Combined score calculated via weighted segment average:
   $$S_{\text{audio}} = \frac{\sum_{j} w_j \cdot s_j}{\sum_{j} w_j}$$
   where $w_j$ is the voice activity confidence for segment $j$.

---

## 5. Limitations & Operational Scope

- **Severe Acoustic Reverberation**: Very high room echo or acoustic distortion may lower model precision.
- **Extreme Telephony Compression**: Low-bitrate narrowband codecs (e.g. 8kHz AMR/GSM) undergo automatic upsampling, which may introduce high-frequency roll-off artifacts.
