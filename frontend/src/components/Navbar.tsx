'use client';

import React from 'react';
import Link from 'next/link';
import { Terminal, Shield, Lock, Radio } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-cyan-500/40 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between font-mono">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-cyan-400/60 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.4)] group-hover:scale-105 transition-transform">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-wider text-white flex items-center gap-1.5">
              VOXVERIFY <span className="text-cyan-400 cyber-glow-blue">AI</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/50">v2.0</span>
            </span>
            <p className="text-[10px] uppercase tracking-widest font-bold text-pink-400">
              // CYBER THREAT DEEPFAKE GUARD
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-wider">
          <Link href="/" className="text-slate-300 hover:text-cyan-400 transition hover:cyber-glow-blue">
            [01] Home
          </Link>
          <Link href="/verify" className="text-slate-300 hover:text-cyan-400 transition hover:cyber-glow-blue">
            [02] Verify
          </Link>
          <Link href="/history" className="text-slate-300 hover:text-cyan-400 transition hover:cyber-glow-blue">
            [03] History
          </Link>
          <Link href="/settings" className="text-slate-300 hover:text-cyan-400 transition hover:cyber-glow-blue">
            [04] Config
          </Link>
        </nav>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1.5 rounded-lg border border-cyan-400/50 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
          <Lock className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">MATRIX ACTIVE</span>
        </div>
      </div>
    </header>
  );
};
