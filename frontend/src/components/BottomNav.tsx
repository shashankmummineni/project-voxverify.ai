'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Terminal, ShieldCheck, History, Settings } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/', icon: Terminal },
    { name: 'Verify', href: '/verify', icon: ShieldCheck },
    { name: 'History', href: '/history', icon: History },
    { name: 'Config', href: '/settings', icon: Settings },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 border-t border-emerald-500/40 py-2.5 px-6 backdrop-blur-md shadow-[0_-5px_20px_rgba(0,255,102,0.15)] font-mono">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center gap-1 text-[11px] font-bold tracking-wider transition ${
                isActive
                  ? 'text-emerald-400 cyber-glow-green scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px] text-emerald-400' : 'stroke-2'}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
