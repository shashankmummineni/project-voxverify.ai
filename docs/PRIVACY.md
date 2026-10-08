# VoxVerify AI - Data Privacy & Security Protocol

## 1. Privacy Principles

Voice recordings and video media contain biometric and personally identifiable information (PII). VoxVerify AI enforces strict privacy-by-design principles:

1. **Local & Ephemeral Processing**: All uploads are processed in isolated local temporary directories (`/tmp/voxverify_uploads` / `%TEMP%\voxverify_uploads`).
2. **Automated Ephemeral Deletion**: All uploaded audio/video files, extracted frame images, and audio segments are automatically purged immediately after model inference completes.
3. **No Public URLs**: Extracted frames and audio files are served exclusively via ephemeral blob memory or authenticated base64 data strings. No raw media is publicly indexed or stored on external CDNs.
4. **Filename Sanitization**: Uploaded files are stripped of original metadata, sanitized, and assigned UUID v4 identifiers (e.g. `upload_f47ac10b-58cc-4372-a567-0e02b2c3d479.mp4`).
5. **Log Privacy**: Log messages contain model status codes, frame counts, and duration metrics. Raw media streams, biometric vectors, and file names are explicitly excluded from system logs.
6. **User Control**: Users can clear session history and cached reports at any time via the Settings panel or History card controls.
