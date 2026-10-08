import cv2
import os
import math
import base64
from io import BytesIO
from PIL import Image
from typing import List, Dict, Any, Tuple

# Load Haar cascade face detector from opencv data safely
face_cascade = None
try:
    if hasattr(cv2, 'data') and hasattr(cv2.data, 'haarcascades'):
        CASCADE_PATH = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
        if os.path.exists(CASCADE_PATH) and hasattr(cv2, 'CascadeClassifier'):
            face_cascade = cv2.CascadeClassifier(CASCADE_PATH)
except Exception:
    face_cascade = None

def get_video_metadata(video_path: str) -> Dict[str, Any]:
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        return {
            "duration": 0.0,
            "fps": 0.0,
            "resolution": "0x0",
            "total_frames": 0
        }
    
    fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT) or 0)
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH) or 0)
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT) or 0)
    duration = total_frames / fps if fps > 0 else 0.0
    cap.release()

    return {
        "duration": round(duration, 2),
        "fps": round(fps, 2),
        "resolution": f"{width}x{height}",
        "total_frames": total_frames
    }

def extract_frames_and_faces(video_path: str, max_samples: int = 30) -> List[Dict[str, Any]]:
    """
    Extracts evenly spaced frames from video, runs Haar cascade face detection,
    and returns frame information + face crops as PIL Images and Base64.
    """
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        return []

    fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT) or 0)

    if total_frames <= 0:
        cap.release()
        return []

    step = max(1, total_frames // max_samples)
    results = []

    frame_idx = 0
    sampled_count = 0

    while cap.isOpened() and sampled_count < max_samples:
        ret, frame = cap.read()
        if not ret:
            break

        if frame_idx % step == 0:
            timestamp_sec = round(frame_idx / fps, 2)
            minutes = int(timestamp_sec // 60)
            seconds = int(timestamp_sec % 60)
            timestamp_str = f"{minutes:02d}:{seconds:02d}"

            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            faces = []
            if face_cascade is not None:
                try:
                    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
                except Exception:
                    faces = []

            face_detected = len(faces) > 0
            face_crop_pil = None
            face_crop_b64 = None

            if face_detected:
                # Select the largest detected face
                largest_face = max(faces, key=lambda f: f[2] * f[3])
                x, y, w, h = largest_face
                
                # Add 15% margin
                margin_x = int(w * 0.15)
                margin_y = int(h * 0.15)
                x1 = max(0, x - margin_x)
                y1 = max(0, y - margin_y)
                x2 = min(frame.shape[1], x + w + margin_x)
                y2 = min(frame.shape[0], y + h + margin_y)

                face_crop_bgr = frame[y1:y2, x1:x2]
                face_crop_rgb = cv2.cvtColor(face_crop_bgr, cv2.COLOR_BGR2RGB)
                face_crop_pil = Image.fromarray(face_crop_rgb).resize((224, 224))

                buffered = BytesIO()
                face_crop_pil.save(buffered, format="JPEG", quality=80)
                face_crop_b64 = "data:image/jpeg;base64," + base64.b64encode(buffered.getvalue()).decode("utf-8")
            else:
                # Fallback to center frame crop if no face detected
                frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                h_img, w_img, _ = frame_rgb.shape
                min_dim = min(h_img, w_img)
                start_x = (w_img - min_dim) // 2
                start_y = (h_img - min_dim) // 2
                center_crop = frame_rgb[start_y:start_y+min_dim, start_x:start_x+min_dim]
                face_crop_pil = Image.fromarray(center_crop).resize((224, 224))

            results.append({
                "timestamp_sec": timestamp_sec,
                "timestamp_str": timestamp_str,
                "face_detected": face_detected,
                "face_crop_pil": face_crop_pil,
                "face_crop_b64": face_crop_b64,
                "frame_rgb": frame
            })
            sampled_count += 1

        frame_idx += 1

    cap.release()
    return results
