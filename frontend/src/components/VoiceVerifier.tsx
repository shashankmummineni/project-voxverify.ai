'use client';

import React, { useState } from 'react';
import { Mic, Upload, AlertCircle, Loader2, Square, RefreshCw } from 'lucide-react';
import { AudioPlayer } from './AudioPlayer';
import { AnalysisProgress } from './AnalysisProgress';
import { VerificationResult, VerificationResultData } from './VerificationResult';

export const VoiceVerifier: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progressPct, setProgressPct] = useState(0);
  const [result, setResult] = useState<VerificationResultData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.size > 100 * 1024 * 1024) {
      setErrorMsg('File size exceeds 100 MB maximum allowed limit.');
      return;
    }
    setFile(selectedFile);
    setAudioUrl(URL.createObjectURL(selectedFile));
    setResult(null);
    setErrorMsg(null);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        const recordedFile = new File([blob], 'microphone_recording.wav', { type: 'audio/wav' });
        handleFileSelect(recordedFile);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err) {
      setErrorMsg('Microphone access denied or unsupported by browser.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setAudioUrl(null);
    setResult(null);
    setErrorMsg(null);
    setIsAnalyzing(false);
    setProgressPct(0);
  };

  const runVerification = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setProgressPct(20);
    setErrorMsg(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      setTimeout(() => setProgressPct(50), 300);
      setTimeout(() => setProgressPct(80), 700);

      // Relative URL primary target for native Vercel Serverless Function execution
      let res: Response;
      try {
        res = await fetch('/api/verify/voice', { method: 'POST', body: formData });
      } catch (netErr) {
        res = await fetch('http://localhost:8000/api/verify/voice', { method: 'POST', body: formData });
      }

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({ detail: `Server response error HTTP ${res.status}` }));
        throw new Error(errJson.detail || `Server returned HTTP status ${res.status}`);
      }

      const data = await res.json();
      data.fileName = file.name;
      data.fileType = file.type || 'audio/wav';

      setProgressPct(100);
      setTimeout(() => {
        setIsAnalyzing(false);
        setResult(data);
      }, 300);
    } catch (err: any) {
      setIsAnalyzing(false);
      setErrorMsg(err.message || 'Voice verification request failed.');
    }
  };

  return (
    <div className="space-y-6">
      {!result ? (
        <div className="caller-card space-y-6">
          <div className="border-b border-cyan-500/30 pb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Mic className="w-6 h-6 text-cyan-400" />
              Voice Deepfake Verification
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Analyze voice recordings for synthetic speech, TTS artifacts, or voice conversion manipulation using Wav2Vec2 AI.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-cyan-500/40 hover:border-cyan-400 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition text-center bg-slate-950/60 group shadow-[0_0_15px_rgba(0,240,255,0.1)]"
            >
              <Upload className="w-8 h-8 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold text-white">
                Upload Audio File
              </span>
              <span className="text-xs text-slate-400 mt-1">WAV, MP3, AAC, FLAC (Max 100MB)</span>
              <input type="file" accept="audio/*" className="hidden" onChange={handleFileInputChange} />
            </label>

            <div className="border-2 border-dashed border-cyan-500/40 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-slate-950/60">
              {!isRecording ? (
                <button
                  type="button"
                  onClick={startRecording}
                  className="flex flex-col items-center gap-2 text-white hover:text-cyan-400 transition"
                >
                  <div className="w-10 h-10 rounded-full bg-pink-950/80 border border-pink-500/60 text-pink-400 flex items-center justify-center">
                    <Mic className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold">Record Microphone Live</span>
                  <span className="text-xs text-slate-400">Click to start live audio capture</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stopRecording}
                  className="flex flex-col items-center gap-2 text-pink-400 animate-pulse"
                >
                  <div className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center">
                    <Square className="w-5 h-5 fill-current" />
                  </div>
                  <span className="text-sm font-bold">Stop Recording...</span>
                </button>
              )}
            </div>
          </div>

          {file && (
            <div className="p-3 bg-cyan-950/60 border border-cyan-500/50 rounded-lg flex items-center justify-between text-xs text-cyan-200 font-mono">
              <span>Selected Audio: <strong>{file.name}</strong> ({ (file.size / (1024 * 1024)).toFixed(2) } MB)</span>
              <button
                type="button"
                onClick={handleReset}
                className="text-[11px] font-bold text-pink-400 hover:underline"
              >
                Clear
              </button>
            </div>
          )}

          <AudioPlayer src={audioUrl} />

          {errorMsg && (
            <div className="p-3 bg-pink-950/80 border border-pink-500/60 text-pink-200 rounded-lg text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="button"
            onClick={runVerification}
            disabled={!file || isAnalyzing}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold tracking-wider transition shadow-[0_0_20px_rgba(0,240,255,0.4)] text-sm flex items-center justify-center gap-2 font-mono"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Analyzing Voice Recording...</span>
              </>
            ) : (
              <>
                <Mic className="w-5 h-5" />
                <span>RUN VOICE AI VERIFICATION</span>
              </>
            )}
          </button>
        </div>
      ) : (
        <VerificationResult result={result} onReset={handleReset} />
      )}

      {isAnalyzing && <AnalysisProgress stage="Voice AI analysis" progressPct={progressPct} />}
    </div>
  );
};
