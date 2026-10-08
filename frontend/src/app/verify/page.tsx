'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Mic, Film, Layers } from 'lucide-react';
import { VoiceVerifier } from '@/components/VoiceVerifier';
import { VideoVerifier } from '@/components/VideoVerifier';
import { MultimodalVerifier } from '@/components/MultimodalVerifier';

function VerifyContent() {
  const searchParams = useSearchParams();
  const initialMode = searchParams.get('mode') || 'video';
  const [activeTab, setActiveTab] = useState<'voice' | 'video' | 'multimodal'>(
    initialMode as 'voice' | 'video' | 'multimodal'
  );

  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode && (mode === 'voice' || mode === 'video' || mode === 'multimodal')) {
      setActiveTab(mode);
    }
  }, [searchParams]);

  return (
    <div className="space-y-6">
      {/* Mode Selector Tab Bar */}
      <div className="bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-1 shadow-sm">
        <button
          onClick={() => setActiveTab('voice')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'voice'
              ? 'bg-blue-700 text-white shadow-md shadow-blue-700/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Mic className="w-4 h-4" />
          <span>Voice</span>
        </button>

        <button
          onClick={() => setActiveTab('video')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'video'
              ? 'bg-blue-700 text-white shadow-md shadow-blue-700/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Film className="w-4 h-4" />
          <span>Video</span>
        </button>

        <button
          onClick={() => setActiveTab('multimodal')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'multimodal'
              ? 'bg-blue-700 text-white shadow-md shadow-blue-700/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Voice + Video</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === 'voice' && <VoiceVerifier />}
        {activeTab === 'video' && <VideoVerifier />}
        {activeTab === 'multimodal' && <MultimodalVerifier />}
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading Verifier...</div>}>
      <VerifyContent />
    </Suspense>
  );
}
