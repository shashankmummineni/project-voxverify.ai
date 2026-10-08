from pydantic import BaseModel, Field
from typing import List, Optional

class AiStatusResponse(BaseModel):
    real_ai_active: bool
    demo_mode: bool
    audio_model: str
    video_model: str
    hardware: str
    audio_model_status: str
    video_model_status: str

class FrameScoreItem(BaseModel):
    timestamp_sec: float
    timestamp_str: str
    score: float
    face_detected: bool
    face_crop_b64: Optional[str] = None
    observation: str

class VerificationResultResponse(BaseModel):
    id: str
    verification_type: str  # "voice", "video", "multimodal"
    overall_assessment: str  # "Likely authentic", "Potentially manipulated", "Inconclusive"
    overall_score: float
    audio_score: Optional[float] = None
    video_score: Optional[float] = None
    face_detected: bool
    duration_sec: float
    frames_analyzed: int
    modality_status: str  # "Full Multimodal", "Audio analysis available", "Video analysis available"
    fusion_explanation: Optional[str] = None
    timeline: List[FrameScoreItem] = []
    suspicious_segments: List[FrameScoreItem] = []
    created_at: str
    is_demo: bool = False
    disclaimer: str = "AI detection can produce false positives and false negatives. Use results as a probabilistic assessment."

class HistoryItemResponse(BaseModel):
    id: str
    filename: str
    verification_type: str
    overall_assessment: str
    overall_score: float
    created_at: str
