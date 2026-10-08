import './globals.css';
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { BottomNav } from '@/components/BottomNav';
import { AiStatusBadge } from '@/components/AiStatusBadge';

export const metadata = {
  title: 'VoxVerify AI - Voice & Video Deepfake Verification',
  description: 'Security-focused dual audio & video AI deepfake verification engine',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col pb-20 md:pb-6">
        <AiStatusBadge />
        <Navbar />
        <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-6 space-y-6">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
