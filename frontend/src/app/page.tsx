'use client';

import React from 'react';
import Link from 'next/link';
import { Mic, Film, Layers, Terminal, ArrowRight, ShieldAlert, Cpu, Lock, Radio, Activity } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-8 py-4 font-mono">
      {/* Top HUD System Info Box matching attached hacker photo */}
      <div className="caller-card border-cyan-500/50 bg-slate-950/80 p-4 shadow-[0_0_25px_rgba(0,240,255,0.25)] space-y-2">
        <div className="flex items-center justify-between text-xs border-b border-cyan-500/30 pb-2">
          <div className="flex items-center gap-2 text-cyan-400 font-bold tracking-wider">
            <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="cyber-glow-blue">[CYBER SYSTEM DIAGNOSTICS // HUD MATRIX]</span>
          </div>
          <span className="text-[10px] text-pink-400 font-bold">[REAL-TIME MONITOR]</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-mono text-slate-300">
          <div><span className="text-cyan-400 font-bold">Role:</span> Foreground</div>
          <div><span className="text-cyan-400 font-bold">Parent Process:</span> launchd [1]</div>
          <div><span className="text-cyan-400 font-bold">Coalition:</span> com.apple.springboard [71]</div>
          <div><span className="text-pink-400 font-bold">OS Version:</span> OS 11.3.1 (151E302)</div>
          <div><span className="text-pink-400 font-bold">Baseband Version:</span> 4.56.00</div>
          <div><span className="text-pink-400 font-bold">Report Version:</span> 104</div>
        </div>
      </div>

      {/* Cyber Hacking Banner */}
      <div className="caller-card bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950/80 border-cyan-400/50 shadow-[0_0_35px_rgba(0,240,255,0.25)] p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/60 text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            <Radio className="w-4 h-4 animate-pulse" />
            [CYBER THREAT DEEPFAKE GUARD ONLINE]
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-wider text-white">
            VOXVERIFY <span className="text-cyan-400 cyber-glow-blue">AI</span>
          </h1>
          <p className="text-slate-200 text-xs md:text-sm leading-relaxed">
            Neural cyber-security matrix executing PyTorch deepfake verification across acoustic audio waveforms and video frame matrices.
          </p>
        </div>
      </div>

      {/* Primary Verification Selector Screen */}
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-extrabold tracking-wider text-white uppercase cyber-glow-blue">
            // SELECT NEURAL VERIFICATION MATRIX
          </h2>
          <p className="text-xs text-cyan-400">
            [Choose a target analysis modality below to initiate real-time AI scan]
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Voice Mode */}
          <Link
            href="/verify?mode=voice"
            className="group caller-card border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,240,255,0.35)] transition-all flex flex-col justify-between p-6 cursor-pointer"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-cyan-400/60 text-cyan-400 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                <Mic className="w-7 h-7" />
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-pink-400">[MODALITY 01]</span>
                <h3 className="text-lg font-bold text-white mt-0.5 flex items-center gap-2 group-hover:text-cyan-400 transition">
                  🎙 VOICE SCAN
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Execute Wav2Vec2 neural audio scan on voice clips for synthetic speech & TTS cloning.
                </p>
              </div>
            </div>

            <div className="pt-6 flex items-center text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-all">
              <span>[INITIATE VOICE SCAN]</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>

          {/* Video Mode */}
          <Link
            href="/verify?mode=video"
            className="group caller-card border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,240,255,0.35)] transition-all flex flex-col justify-between p-6 cursor-pointer"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-cyan-400/60 text-cyan-400 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                <Film className="w-7 h-7" />
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-pink-400">[MODALITY 02]</span>
                <h3 className="text-lg font-bold text-white mt-0.5 flex items-center gap-2 group-hover:text-cyan-400 transition">
                  🎥 VIDEO SCAN
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Execute ViT / EfficientNet vision matrix scan for face swaps & frame reenactment.
                </p>
              </div>
            </div>

            <div className="pt-6 flex items-center text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-all">
              <span>[INITIATE VIDEO SCAN]</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>

          {/* Voice + Video Mode */}
          <Link
            href="/verify?mode=multimodal"
            className="group caller-card border-pink-500/50 bg-pink-950/20 hover:border-pink-400 hover:shadow-[0_0_30px_rgba(255,0,160,0.35)] transition-all flex flex-col justify-between p-6 cursor-pointer"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-pink-600 text-white flex items-center justify-center shadow-[0_0_20px_rgba(255,0,160,0.4)]">
                <Layers className="w-7 h-7" />
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-pink-950 text-pink-300 border border-pink-500/60">
                  [RECOMMENDED]
                </span>
                <h3 className="text-lg font-bold text-white mt-1 flex items-center gap-2 group-hover:text-pink-400 transition">
                  🔊🎥 VOICE + VIDEO
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Execute joint dual-stream audio & video scan with Late Fusion reliability weighting.
                </p>
              </div>
            </div>

            <div className="pt-6 flex items-center text-xs font-bold text-pink-400 group-hover:translate-x-1 transition-all">
              <span>[RUN MULTIMODAL SCAN]</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>
        </div>
      </div>

      {/* Security Guarantee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/40 flex items-start gap-3 shadow-[0_0_20px_rgba(0,240,255,0.15)]">
          <Lock className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              [EPHEMERAL PRIVACY GUARANTEE]
            </h4>
            <p className="text-xs text-slate-300">
              Files process in isolated RAM/temporary buffers and automatically purge immediately post-scan.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-pink-500/40 flex items-start gap-3 shadow-[0_0_20px_rgba(255,0,160,0.15)]">
          <Cpu className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-pink-400 uppercase tracking-wider">
              [GENUINE PYTORCH HARDWARE TENSORS]
            </h4>
            <p className="text-xs text-slate-300">
              Zero fake score generation. Predictions pass live forward tensor calculations on loaded neural weights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
