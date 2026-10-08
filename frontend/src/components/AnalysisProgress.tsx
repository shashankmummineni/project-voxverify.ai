'use client';

import React from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';

interface AnalysisProgressProps {
  stage: string;
  progressPct: number;
}

export const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ stage, progressPct }) => {
  const steps = [
    { name: 'Video validation', minPct: 15 },
    { name: 'Frame extraction & sampling', minPct: 35 },
    { name: 'Face detection & alignment', minPct: 60 },
    { name: 'Real AI model inference', minPct: 85 },
    { name: 'Aggregation & result generation', minPct: 100 },
  ];

  return (
    <div className="w-full caller-card space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            AI Verification in Progress...
          </h3>
        </div>
        <span className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400">
          {progressPct}%
        </span>
      </div>

      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-blue-600 h-full rounded-full transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="space-y-2 pt-2">
        {steps.map((step, idx) => {
          const isDone = progressPct >= step.minPct;
          const isCurrent = progressPct < step.minPct && (idx === 0 || progressPct >= steps[idx - 1].minPct);
          return (
            <div key={idx} className="flex items-center justify-between text-xs">
              <span
                className={`${
                  isDone
                    ? 'text-slate-900 dark:text-white font-medium'
                    : isCurrent
                    ? 'text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-slate-400 dark:text-slate-600'
                }`}
              >
                {step.name}
              </span>
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              ) : isCurrent ? (
                <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin" />
              ) : (
                <div className="w-3.5 h-3.5 rounded-full border border-slate-300 dark:border-slate-700" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
