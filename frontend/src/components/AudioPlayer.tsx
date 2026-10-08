'use client';

import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, Mic } from 'lucide-react';
import { Waveform } from './Waveform';

interface AudioPlayerProps {
  src: string | null;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current || !src) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  if (!src) {
    return (
      <div className="w-full p-4 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 gap-2">
        <Mic className="w-5 h-5" />
        <span className="text-xs font-medium">No audio sample loaded</span>
      </div>
    );
  }

  return (
    <div className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center gap-4 shadow-sm">
      <audio
        ref={audioRef}
        src={src}
        onEnded={() => setIsPlaying(false)}
      />

      <button
        onClick={togglePlay}
        className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition shadow-md shadow-blue-600/30 flex-shrink-0"
      >
        {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
      </button>

      <div className="flex-1 min-w-0">
        <Waveform isPlaying={isPlaying} />
      </div>

      <Volume2 className="w-5 h-5 text-slate-400 flex-shrink-0" />
    </div>
  );
};
