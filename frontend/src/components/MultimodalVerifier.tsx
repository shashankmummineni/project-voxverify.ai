'use client';

import React, { useState, useRef } from 'react';
import { Layers, Upload, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { VideoPlayer } from './VideoPlayer';
import { AnalysisProgress } from './AnalysisProgress';
import { VerificationResult, VerificationResultData } from './VerificationResult';

export const MultimodalVerifier: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progressPct, setProgressPct] = useState(0);
  const [result, setResult] = useState<VerificationResultData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.size > 100 * 1024 * 1024) {
      setErrorMsg('File size exceeds 100 MB maximum allowed limit.');
      return;
    }
    setFile(selectedFile);
    setVideoUrl(URL.createObjectURL(selectedFile));
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

  const handleSeek = (timestampSec: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = timestampSec;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleReset = () => {
    setFile(null);
    setVideoUrl(null);
    setResult(null);
    setErrorMsg(null);
    setIsAnalyzing(false);
    setProgressPct(0);
  };

  const runVerification = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setProgressPct(10);
    setErrorMsg(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      setTimeout(() => setProgressPct(40), 400);
      setTimeout(() => setProgressPct(75), 900);
      setTimeout(() => setProgressPct(95), 1400);

      // Relative URL primary target for native Vercel Serverless Function execution
      let res: Response;
      try {
        res = await fetch('/api/verify/multimodal', { method: 'POST', body: formData });
      } catch (netErr) {
        res = await fetch('http://localhost:8000/api/verify/multimodal', { method: 'POST', body: formData });
      }

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({ detail: `Server response error HTTP ${res.status}` }));
        throw new Error(errJson.detail || `Server returned HTTP status ${res.status}`);
      }

      const data = await res.json();
      data.fileName = file.name;
      data.fileType = file.type || 'video/mp4';

      setProgressPct(100);
      setTimeout(() => {
        setIsAnalyzing(false);
        setResult(data);
      }, 300);
    } catch (err: any) {
      setIsAnalyzing(false);
      setErrorMsg(err.message || 'Multimodal verification request failed.');
    }
  };

  return (
    <div className="space-y-6">
      {!result ? (
        <div className="caller-card space-y-6">
          <div className="border-b border-cyan-500/30 pb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-pink-400" />
              Voice + Video Multimodal Verification
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Simultaneously evaluates audio acoustic streams and video facial frame streams using Late Fusion weighting.
            </p>
          </div>

          <label
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-pink-500/40 hover:border-pink-400 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition text-center bg-slate-950/60 group shadow-[0_0_15px_rgba(255,0,160,0.1)]"
          >
            <Upload className="w-10 h-10 text-pink-400 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-semibold text-white">
              Upload Video with Audio Stream
            </span>
            <span className="text-xs text-slate-400 mt-1">MP4, MOV, WebM, AVI (Max 100MB)</span>
            <input type="file" accept="video/*" className="hidden" onChange={handleFileInputChange} />
          </label>

          {file && (
            <div className="p-3 bg-pink-950/60 border border-pink-500/50 rounded-lg flex items-center justify-between text-xs text-pink-200 font-mono">
              <span>Multimodal Media: <strong>{file.name}</strong> ({ (file.size / (1024 * 1024)).toFixed(2) } MB)</span>
              <button
                type="button"
                onClick={handleReset}
                className="text-[11px] font-bold text-cyan-400 hover:underline"
              >
                Clear
              </button>
            </div>
          )}

          <VideoPlayer ref={videoRef} src={videoUrl} />

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
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 hover:from-pink-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold tracking-wider transition shadow-[0_0_20px_rgba(255,0,160,0.4)] text-sm flex items-center justify-center gap-2 font-mono"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Running Dual Stream Late Fusion...</span>
              </>
            ) : (
              <>
                <Layers className="w-5 h-5" />
                <span>RUN MULTIMODAL AI VERIFICATION</span>
              </>
            )}
          </button>
        </div>
      ) : (
        <VerificationResult result={result} onSeek={handleSeek} onReset={handleReset} />
      )}

      {isAnalyzing && <AnalysisProgress stage="Dual stream late fusion" progressPct={progressPct} />}
    </div>
  );
};
