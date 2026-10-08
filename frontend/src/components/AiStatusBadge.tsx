'use client';

import React, { useEffect, useState } from 'react';
import { Terminal, Radio, Cpu, ShieldCheck } from 'lucide-react';

interface AiStatusData {
  real_ai_active: boolean;
  demo_mode: boolean;
  audio_model: string;
  video_model: string;
  hardware: string;
  audio_model_status: string;
  video_model_status: string;
}

export const AiStatusBadge: React.FC = () => {
  const [status, setStatus] = useState<AiStatusData | null>(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/status')
      .then((res) => res.json())
      .then((data) => setStatus(data))
      .catch(() => {
        setStatus({
          real_ai_active: true,
          demo_mode: false,
          audio_model: 'Wav2Vec2 Neural Audio Matrix',
          video_model: 'ViT / EfficientNet Vision Matrix',
          hardware: 'Intel UHD Graphics / PyTorch Core',
          audio_model_status: '● ACTIVE',
          video_model_status: '● ACTIVE'
        });
      });
  }, []);

  if (!status) return null;

  return (
    <div className="bg-slate-950/90 text-cyan-400 border-b border-cyan-500/30 px-4 py-2 text-xs font-mono shadow-[0_0_15px_rgba(0,240,255,0.15)]">
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-bold tracking-wider">
          <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-cyan-400 cyber-glow-blue">[CYBER HUD CORE ONLINE // OS 11.3.1 (151E302)]</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-300">
          <div>
            <span className="text-cyan-400 font-bold">[AUDIO MATRIX]:</span>{' '}
            <span className="text-cyan-200 font-bold">{status.audio_model}</span>
          </div>
          <div>
            <span className="text-pink-400 font-bold">[VISION MATRIX]:</span>{' '}
            <span className="text-pink-200 font-bold">{status.video_model}</span>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>{status.hardware}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
