'use client';

import React from 'react';
import { Clock } from 'lucide-react';

export interface TimelineItem {
  timestamp_sec: number;
  timestamp_str: string;
  score: number;
  face_detected: boolean;
  face_crop_b64?: string;
  observation: string;
}

interface VideoTimelineProps {
  timeline: TimelineItem[];
  currentTime?: number;
  onSeek: (timestampSec: number) => void;
}

export const VideoTimeline: React.FC<VideoTimelineProps> = ({ timeline, currentTime = 0, onSeek }) => {
  if (!timeline || timeline.length === 0) return null;

  const maxDuration = timeline[timeline.length - 1]?.timestamp_sec || 1;

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Frame-level Analysis Timeline
          </h4>
        </div>
        <span className="text-xs text-slate-500 font-mono">
          Click segment to seek video
        </span>
      </div>

      {/* Horizontal Interactive Timeline Track */}
      <div className="relative w-full h-16 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden flex items-end p-2 gap-1 border border-slate-200 dark:border-slate-700">
        {timeline.map((item, idx) => {
          const heightPct = Math.max(15, Math.min(100, item.score * 100));
          const isHighRisk = item.score > 0.60;
          const isSelected = Math.abs(currentTime - item.timestamp_sec) < 1.5;

          return (
            <button
              key={idx}
              onClick={() => onSeek(item.timestamp_sec)}
              title={`${item.timestamp_str} - Score: ${item.score} (${isHighRisk ? 'Manipulated' : 'Authentic'})`}
              className={`flex-1 group relative h-full flex flex-col justify-end items-center transition-all ${
                isSelected ? 'scale-105 z-10' : ''
              }`}
            >
              <div
                className={`w-full rounded-t transition-all ${
                  isHighRisk
                    ? 'bg-rose-500 group-hover:bg-rose-600'
                    : item.score > 0.35
                    ? 'bg-amber-400 group-hover:bg-amber-500'
                    : 'bg-emerald-500 group-hover:bg-emerald-600'
                } ${isSelected ? 'ring-2 ring-blue-500 ring-offset-1' : ''}`}
                style={{ height: `${heightPct}%` }}
              />
            </button>
          );
        })}
      </div>

      {/* Timestamp labels axis */}
      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 px-1">
        {timeline.filter((_, idx) => idx % Math.max(1, Math.floor(timeline.length / 5)) === 0).map((item, idx) => (
          <button
            key={idx}
            onClick={() => onSeek(item.timestamp_sec)}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer"
          >
            {item.timestamp_str}
          </button>
        ))}
      </div>
    </div>
  );
};
