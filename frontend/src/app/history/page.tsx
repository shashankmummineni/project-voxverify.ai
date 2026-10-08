'use client';

import React, { useEffect, useState } from 'react';
import { History, Trash2, ShieldCheck, FileSearch } from 'lucide-react';
import { HistoryCard, HistoryItem } from '@/components/HistoryCard';

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = () => {
    fetch('/api/history')
      .then((res) => res.json())
      .then((data) => {
        setHistory(data);
        setLoading(false);
      })
      .catch(() => {
        setHistory([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = (id: string) => {
    fetch(`/api/history/${id}`, { method: 'DELETE' })
      .then(() => {
        setHistory((prev) => prev.filter((item) => item.id !== id));
      })
      .catch(() => {});
  };

  const handleClearAll = () => {
    setHistory([]);
  };

  return (
    <div className="space-y-6">
      <div className="caller-card flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Verification History
            </h2>
            <p className="text-xs text-slate-500">
              Session audit log of completed audio and video verifications.
            </p>
          </div>
        </div>

        {history.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 hover:text-rose-600 dark:text-slate-400 transition flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {loading ? (
        <div className="p-8 text-center text-xs text-slate-400">Loading audit history...</div>
      ) : history.length === 0 ? (
        <div className="caller-card py-12 text-center flex flex-col items-center justify-center gap-3 text-slate-400">
          <FileSearch className="w-10 h-10 stroke-1" />
          <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
            No verification history yet
          </span>
          <p className="text-xs text-slate-400 max-w-sm">
            Run a Voice or Video verification from the Verify screen to view persistent audit records here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <HistoryCard key={item.id} item={item} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
