'use client';

import React from 'react';
import { Mic, Film, Layers, Trash2, Calendar, FileText } from 'lucide-react';

export interface HistoryItem {
  id: string;
  filename: string;
  verification_type: string;
  overall_assessment: string;
  overall_score: number;
  created_at: string;
}

interface HistoryCardProps {
  item: HistoryItem;
  onDelete: (id: string) => void;
}

export const HistoryCard: React.FC<HistoryCardProps> = ({ item, onDelete }) => {
  const isManipulated = item.overall_assessment === 'Potentially manipulated';
  const isAuthentic = item.overall_assessment === 'Likely authentic';

  const Icon = item.verification_type === 'voice' ? Mic : item.verification_type === 'video' ? Film : Layers;

  return (
    <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm flex items-center justify-between gap-4 transition hover:border-slate-300 dark:hover:border-slate-700">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5" />
        </div>

        <div className="min-w-0 space-y-0.5">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
            {item.filename}
          </h4>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="capitalize font-medium text-slate-700 dark:text-slate-300">
              {item.verification_type}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {item.created_at}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 flex-shrink-0">
        <div className="text-right">
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-full ${
              isManipulated
                ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
                : isAuthentic
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                : 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
            }`}
          >
            {item.overall_assessment}
          </span>
          <p className="text-xs text-slate-500 mt-1 font-mono">
            Score: {item.overall_score.toFixed(2)}
          </p>
        </div>

        <button
          onClick={() => onDelete(item.id)}
          className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          title="Delete record"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
