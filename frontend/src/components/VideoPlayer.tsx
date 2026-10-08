'use client';

import React, { forwardRef } from 'react';
import { Play, Film } from 'lucide-react';

interface VideoPlayerProps {
  src: string | null;
  onTimeUpdate?: (currentTime: number) => void;
}

export const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(({ src, onTimeUpdate }, ref) => {
  if (!src) {
    return (
      <div className="w-full aspect-video bg-slate-100 dark:bg-slate-800 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center text-slate-400 gap-2">
        <Film className="w-10 h-10 stroke-1" />
        <span className="text-sm font-medium">No video loaded</span>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-md">
      <video
        ref={ref}
        src={src}
        controls
        className="w-full h-full object-contain"
        onTimeUpdate={(e) => onTimeUpdate && onTimeUpdate((e.target as HTMLVideoElement).currentTime)}
      />
    </div>
  );
});

VideoPlayer.displayName = 'VideoPlayer';
