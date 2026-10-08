'use client';

import React from 'react';
import { ShieldCheck, ShieldAlert, AlertCircle, RefreshCw, FileText, Info } from 'lucide-react';
import { VideoTimeline, TimelineItem } from './VideoTimeline';
import { FrameAnalysisPanel } from './FrameAnalysisPanel';

export interface VerificationResultData {
  id: string;
  verification_type: string;
  overall_assessment: string;
  overall_score: number;
  audio_score?: number | null;
  video_score?: number | null;
  face_detected: boolean;
  duration_sec: number;
  frames_analyzed: number;
  modality_status: string;
  fusion_explanation?: string;
  timeline: TimelineItem[];
  suspicious_segments: TimelineItem[];
  created_at: string;
  is_demo?: boolean;
  disclaimer: string;
  fileName?: string;
  fileType?: string;
}

interface VerificationResultProps {
  result: VerificationResultData;
  onSeek?: (timestampSec: number) => void;
  onReset?: () => void;
}

export const VerificationResult: React.FC<VerificationResultProps> = ({ result, onSeek, onReset }) => {
  const isManipulated = result.overall_assessment === 'Potentially manipulated';
  const isAuthentic = result.overall_assessment === 'Likely authentic';
  const confidencePct = (result.overall_score * 100).toFixed(1);

  return (
    <div className="w-full space-y-6">
      {/* Caller Security Primary Header Card */}
      <div
        className={`rounded-2xl p-6 border shadow-md transition-all ${
          isManipulated
            ? 'bg-rose-50/90 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50'
            : isAuthentic
            ? 'bg-emerald-50/90 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50'
            : 'bg-amber-50/90 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50'
        }`}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b pb-4 border-slate-200/60 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md ${
                isManipulated
                  ? 'bg-rose-600 shadow-rose-600/30'
                  : isAuthentic
                  ? 'bg-emerald-600 shadow-emerald-600/30'
                  : 'bg-amber-500 shadow-amber-500/30'
              }`}
            >
              {isManipulated ? (
                <ShieldAlert className="w-7 h-7" />
              ) : isAuthentic ? (
                <ShieldCheck className="w-7 h-7" />
              ) : (
                <AlertCircle className="w-7 h-7" />
              )}
            </div>

            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-slate-500 dark:text-slate-400">
                {result.verification_type.toUpperCase()} VERIFICATION RESULT
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {result.overall_assessment}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200 border border-blue-200 dark:border-blue-700">
              {result.modality_status}
            </span>

            {onReset && (
              <button
                onClick={onReset}
                className="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Verify Another File</span>
              </button>
            )}
          </div>
        </div>

        {/* Media Metadata Info Bar */}
        {(result.fileName || result.fileType) && (
          <div className="mt-3 flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400 font-mono bg-white/50 dark:bg-slate-900/50 p-2 rounded-lg border border-slate-200/50 dark:border-slate-800">
            <div className="flex items-center gap-1.5 truncate">
              <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span className="font-semibold text-slate-900 dark:text-white truncate">
                {result.fileName || 'Uploaded File'}
              </span>
            </div>
            {result.fileType && (
              <span className="text-slate-500 font-sans px-2 py-0.5 rounded bg-slate-200/60 dark:bg-slate-800 text-[10px] uppercase font-bold">
                {result.fileType}
              </span>
            )}
          </div>
        )}

        {/* Security Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          <div className="bg-white/80 dark:bg-slate-900/80 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Confidence Score</span>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono mt-0.5">
              {confidencePct}%
            </p>
            <span className="text-[10px] text-slate-400 font-mono">Raw Score: {result.overall_score.toFixed(2)}</span>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Frames Analyzed</span>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono mt-0.5">
              {result.frames_analyzed}
            </p>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Face Detected</span>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              {result.face_detected ? 'Yes' : 'No'}
            </p>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Duration</span>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono mt-0.5">
              {result.duration_sec.toFixed(1)} <span className="text-xs text-slate-500">sec</span>
            </p>
          </div>
        </div>

        {result.fusion_explanation && (
          <div className="mt-4 p-3 bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40 rounded-lg text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <span>{result.fusion_explanation}</span>
          </div>
        )}
      </div>

      {/* Interactive Video Timeline */}
      {result.timeline && result.timeline.length > 0 && (
        <VideoTimeline timeline={result.timeline} onSeek={(sec) => onSeek && onSeek(sec)} />
      )}

      {/* Frame Analysis Panel */}
      {result.timeline && result.timeline.length > 0 && (
        <FrameAnalysisPanel timeline={result.timeline} onSeek={(sec) => onSeek && onSeek(sec)} />
      )}

      {/* Bottom Reset Action */}
      {onReset && (
        <div className="flex justify-center pt-2">
          <button
            onClick={onReset}
            className="py-3 px-6 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold transition flex items-center gap-2 shadow-lg shadow-blue-700/20"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Verify Another File</span>
          </button>
        </div>
      )}

      {/* Standard Probabilistic Assessment Disclaimer */}
      <div className="p-4 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 rounded-xl flex items-start gap-3 text-xs text-slate-600 dark:text-slate-400">
        <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
        <span>{result.disclaimer}</span>
      </div>
    </div>
  );
};
