'use client';

import React from 'react';
import { AlertCircle, CheckCircle2, UserCheck, UserX } from 'lucide-react';
import { TimelineItem } from './VideoTimeline';

interface FrameAnalysisPanelProps {
  timeline: TimelineItem[];
  onSeek: (timestampSec: number) => void;
}

export const FrameAnalysisPanel: React.FC<FrameAnalysisPanelProps> = ({ timeline, onSeek }) => {
  const higherScoringSegments = timeline.filter((item) => item.score > 0.50);

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Frame Analysis Panel
        </h4>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
          {higherScoringSegments.length} Segments Flagged
        </span>
      </div>

      {higherScoringSegments.length === 0 ? (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 rounded-lg flex items-center gap-3 text-emerald-800 dark:text-emerald-300 text-xs">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span>No suspicious frame segments detected in this recording. All analyzed frames exhibit natural consistency metrics.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
          {higherScoringSegments.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onSeek(item.timestamp_sec)}
              className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl hover:border-blue-500 transition cursor-pointer flex gap-3 items-center group"
            >
              {item.face_crop_b64 ? (
                <img
                  src={item.face_crop_b64}
                  alt={`Frame ${item.timestamp_str}`}
                  className="w-16 h-16 rounded-lg object-cover bg-slate-200 dark:bg-slate-700 flex-shrink-0 border border-slate-300 dark:border-slate-600"
                />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-slate-200 dark:bg-slate-700 flex flex-col items-center justify-center text-slate-400 text-xs flex-shrink-0">
                  <span>No Face</span>
                </div>
              )}

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                    {item.timestamp_str}
                  </span>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded ${
                      item.score > 0.65
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                    }`}
                  >
                    Score {item.score.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                  {item.face_detected ? (
                    <>
                      <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Face Detected</span>
                    </>
                  ) : (
                    <>
                      <UserX className="w-3.5 h-3.5 text-slate-400" />
                      <span>No Face Detected</span>
                    </>
                  )}
                </div>

                <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 italic">
                  "{item.observation}"
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
