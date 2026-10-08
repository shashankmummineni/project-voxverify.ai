'use client';

import React from 'react';

interface WaveformProps {
  isPlaying?: boolean;
}

export const Waveform: React.FC<WaveformProps> = ({ isPlaying = false }) => {
  const bars = [40, 75, 25, 90, 60, 30, 85, 45, 100, 65, 35, 80, 50, 20, 70, 95, 40, 60, 30, 85];

  return (
    <div className="flex items-center gap-1 h-12 py-1 px-3 bg-slate-100 dark:bg-slate-800 rounded-lg w-full overflow-hidden">
      {bars.map((height, idx) => (
        <div
          key={idx}
          className={`flex-1 rounded-full transition-all duration-300 ${
            isPlaying ? 'bg-blue-600 animate-pulse' : 'bg-slate-400 dark:bg-slate-600'
          }`}
          style={{
            height: isPlaying ? `${Math.max(15, (height * (idx % 3 + 1)) % 100)}%` : `${height}%`,
          }}
        />
      ))}
    </div>
  );
};
