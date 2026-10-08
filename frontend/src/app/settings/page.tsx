'use client';

import React, { useState } from 'react';
import { Settings, ShieldCheck, Lock, Cpu, Server, Trash2, Check } from 'lucide-react';

export default function SettingsPage() {
  const [privacyPolicyActive, setPrivacyPolicyActive] = useState(true);
  const [autoPurge, setAutoPurge] = useState(true);

  return (
    <div className="space-y-6">
      <div className="caller-card">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Application Settings & Security Config
            </h2>
            <p className="text-xs text-slate-500">
              Manage AI engine options, hardware acceleration, and privacy retention rules.
            </p>
          </div>
        </div>

        <div className="space-y-6 pt-6">
          {/* AI Engine Config */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-600" />
              AI Inference Engines
            </h3>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">Voice Detector Architecture</span>
                  <p className="text-slate-500 text-[11px]">Wav2Vec2-XLSR-53 / AASIST Spectrogram Model</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 font-mono font-bold">
                  ● ACTIVE
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60 dark:border-slate-700/40">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">Video Detector Architecture</span>
                  <p className="text-slate-500 text-[11px]">EfficientNet / ViT FaceForensics++ Backbone</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 font-mono font-bold">
                  ● ACTIVE
                </span>
              </div>
            </div>
          </div>

          {/* Privacy & Retention */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-600" />
              Privacy & Data Policy Controls
            </h3>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Ephemeral Storage Auto-Purge</span>
                  <p className="text-slate-500 text-[11px]">Automatically delete temporary audio and video frame buffers immediately post-inference.</p>
                </div>
                <input
                  type="checkbox"
                  checked={autoPurge}
                  onChange={(e) => setAutoPurge(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 dark:border-slate-700/40">
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Sanitize Upload Filenames</span>
                  <p className="text-slate-500 text-[11px]">Strip original file metadata and assign anonymized UUID v4 identifiers.</p>
                </div>
                <input
                  type="checkbox"
                  checked={privacyPolicyActive}
                  onChange={(e) => setPrivacyPolicyActive(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
