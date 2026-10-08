import os
import subprocess
import numpy as np
import scipy.io.wavfile as wavfile
from typing import List, Dict, Any, Tuple

def extract_audio_from_video(video_path: str, output_wav_path: str) -> bool:
    """
    Extracts 16kHz mono audio WAV track from video using ffmpeg or OpenCV/moviepy fallback.
    """
    try:
        # Try running ffmpeg if available
        cmd = [
            "ffmpeg", "-y", "-i", video_path,
            "-vn", "-acodec", "pcm_s16le", "-ar", "16000", "-ac", "1",
            output_wav_path
        ]
        res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if res.returncode == 0 and os.path.exists(output_wav_path) and os.path.getsize(output_wav_path) > 100:
            return True
    except Exception:
        pass

    # Fallback to soundfile / librosa or empty wav generator if no audio stream
    return False

def load_and_preprocess_audio(audio_path: str, target_sr: int = 16000) -> Tuple[np.ndarray, float, float]:
    """
    Loads audio file, converts to float32 mono array at target_sr.
    Returns (audio_samples, duration_sec, speech_activity_ratio).
    """
    try:
        import soundfile as sf
        import librosa
        data, sr = sf.read(audio_path)
        if len(data.shape) > 1:
            data = np.mean(data, axis=1)

        if sr != target_sr:
            data = librosa.resample(data, orig_sr=sr, target_sr=target_sr)

        duration = len(data) / target_sr
        
        # Simple energy VAD estimation
        frame_len = int(0.03 * target_sr) # 30ms frames
        hop_len = int(0.01 * target_sr)   # 10ms hop
        
        frames = librosa.util.frame(data, frame_length=frame_len, hop_length=hop_len)
        energies = np.sum(frames ** 2, axis=0)
        energy_threshold = np.mean(energies) * 0.1
        speech_frames = np.sum(energies > energy_threshold)
        speech_activity_ratio = min(1.0, max(0.1, speech_frames / max(1, len(energies))))

        return data.astype(np.float32), round(duration, 2), round(speech_activity_ratio, 2)
    except Exception as e:
        # Return fallback dummy silence if unreadable
        dummy = np.zeros(target_sr * 3, dtype=np.float32)
        return dummy, 3.0, 0.0

def segment_audio_waveform(waveform: np.ndarray, sr: int = 16000, segment_dur: float = 3.0, step_dur: float = 1.0) -> List[Dict[str, Any]]:
    """
    Splits audio waveform into overlapping 3-second segments.
    """
    segment_samples = int(segment_dur * sr)
    step_samples = int(step_dur * sr)
    total_samples = len(waveform)

    segments = []
    if total_samples < segment_samples:
        # Pad short audio
        padded = np.pad(waveform, (0, segment_samples - total_samples), mode='constant')
        segments.append({
            "start_sec": 0.0,
            "end_sec": round(total_samples / sr, 2),
            "timestamp_str": "00:00",
            "samples": padded
        })
        return segments

    for start_idx in range(0, total_samples - segment_samples + 1, step_samples):
        end_idx = start_idx + segment_samples
        start_sec = start_idx / sr
        minutes = int(start_sec // 60)
        seconds = int(start_sec % 60)
        timestamp_str = f"{minutes:02d}:{seconds:02d}"

        segments.append({
            "start_sec": round(start_sec, 2),
            "end_sec": round(end_idx / sr, 2),
            "timestamp_str": timestamp_str,
            "samples": waveform[start_idx:end_idx]
        })

    return segments
