'use client';

import React, { useState } from 'react';
import { Trophy, Award, Flame, Code2, BookOpen, CheckCircle2, Lock } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { useAppStore } from '@/lib/store';

export default function AchievementsPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { achievements, currentStreak } = useAppStore();

  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  const filtered = achievements.filter((a) => {
    if (filter === 'unlocked') return a.isUnlocked;
    if (filter === 'locked') return !a.isUnlocked;
    return true;
  });

  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar onToggleMobileSidebar={() => setMobileSidebarOpen(true)} />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
          {/* Header */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                Gamified Milestones
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                Achievements & Badges
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Celebrate your coding consistency, quiz excellence, and milestone completions.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-center">
                <span className="text-[10px] uppercase font-bold text-amber-700 block">Badges Earned</span>
                <span className="text-xl font-black text-amber-900">
                  {unlockedCount} / {achievements.length}
                </span>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center space-x-2 text-xs font-semibold">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl transition ${
                filter === 'all' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              All Badges ({achievements.length})
            </button>
            <button
              onClick={() => setFilter('unlocked')}
              className={`px-4 py-2 rounded-xl transition ${
                filter === 'unlocked' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              Unlocked ({unlockedCount})
            </button>
            <button
              onClick={() => setFilter('locked')}
              className={`px-4 py-2 rounded-xl transition ${
                filter === 'locked' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              In Progress ({achievements.length - unlockedCount})
            </button>
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((ach) => (
              <div
                key={ach.id}
                className={`p-6 rounded-3xl border transition flex items-start space-x-4 ${
                  ach.isUnlocked
                    ? 'bg-white border-slate-200 shadow-sm card-hover'
                    : 'bg-slate-100/70 border-slate-200 opacity-60'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-sm ${
                    ach.isUnlocked ? 'bg-amber-50 border border-amber-200' : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {ach.icon}
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-sm">{ach.title}</h3>
                    {ach.isUnlocked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    ) : (
                      <Lock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    )}
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed">{ach.description}</p>

                  <div className="pt-2">
                    {ach.isUnlocked ? (
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Unlocked on {ach.unlockedAt}
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
                        Locked &bull; In Progress
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
