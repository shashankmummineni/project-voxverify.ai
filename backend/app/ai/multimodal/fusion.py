import numpy as np
from typing import Dict, Any

def FuseMultimodalResults(
    video_res: Dict[str, Any] = None,
    audio_res: Dict[str, Any] = None
) -> Dict[str, Any]:
    """
    Executes Late Fusion with Modality Reliability Weighting:
    S_multimodal = (w_video * S_video + w_audio * S_audio) / (w_video + w_audio)
    
    where w_video = Face_Confidence * Face_Coverage_Ratio
          w_audio = Speech_Activity_Ratio
    """
    has_video = video_res is not None and "overall_score" in video_res
    has_audio = audio_res is not None and "overall_score" in audio_res

    if not has_video and not has_audio:
        raise ValueError("Neither video nor audio analysis could be completed.")

    if has_video and not has_audio:
        return {
            "overall_score": video_res["overall_score"],
            "overall_assessment": video_res["overall_assessment"],
            "modality_status": "Video analysis available",
            "fusion_explanation": "Only video stream was present. Verification score relies entirely on visual facial deepfake feature extraction.",
            "audio_score": None,
            "video_score": video_res["overall_score"],
            "face_detected": video_res.get("face_detected", False),
            "duration_sec": video_res.get("duration_sec", 0.0),
            "frames_analyzed": video_res.get("frames_analyzed", 0),
            "timeline": video_res.get("timeline", []),
            "suspicious_segments": video_res.get("suspicious_segments", [])
        }

    if has_audio and not has_video:
        return {
            "overall_score": audio_res["overall_score"],
            "overall_assessment": audio_res["overall_assessment"],
            "modality_status": "Audio analysis available",
            "fusion_explanation": "Only audio stream was present. Verification score relies entirely on acoustic Wav2Vec2/neural speech analysis.",
            "audio_score": audio_res["overall_score"],
            "video_score": None,
            "face_detected": False,
            "duration_sec": audio_res.get("duration_sec", 0.0),
            "frames_analyzed": 0,
            "timeline": audio_res.get("timeline", []),
            "suspicious_segments": []
        }

    # Dual modality fusion:
    s_v = video_res["overall_score"]
    s_a = audio_res["overall_score"]

    face_ratio = video_res.get("face_detection_ratio", 0.5)
    speech_ratio = audio_res.get("speech_activity_ratio", 0.5)

    # Reliability Weights
    w_v = max(0.1, face_ratio)
    w_a = max(0.1, speech_ratio)

    combined_score = round(float((w_v * s_v + w_a * s_a) / (w_v + w_a)), 2)

    if combined_score > 0.65:
        assessment = "Potentially manipulated"
    elif combined_score < 0.35:
        assessment = "Likely authentic"
    else:
        assessment = "Inconclusive"

    fusion_msg = (
        f"Late Fusion Applied: Video weight (w_v={w_v:.2f}, score={s_v}) and "
        f"Audio weight (w_a={w_a:.2f}, score={s_a}) weighted based on face detection coverage and voice activity ratio."
    )

    # Interleave timelines for dual-view graph
    timeline_v = video_res.get("timeline", [])
    
    return {
        "overall_score": combined_score,
        "overall_assessment": assessment,
        "modality_status": "Full Multimodal",
        "fusion_explanation": fusion_msg,
        "audio_score": s_a,
        "video_score": s_v,
        "face_detected": video_res.get("face_detected", True),
        "duration_sec": max(video_res.get("duration_sec", 0.0), audio_res.get("duration_sec", 0.0)),
        "frames_analyzed": video_res.get("frames_analyzed", 0),
        "timeline": timeline_v,
        "suspicious_segments": video_res.get("suspicious_segments", [])
    }
