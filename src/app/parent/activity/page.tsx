'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { StreakHeatmap } from '@/components/charts/StreakHeatmap';
import { useAppStore } from '@/lib/store';
import {
  Clock,
  Flame,
  CheckCircle2,
  FileText,
  CheckSquare,
  Code2,
  Calendar,
  Activity,
  Layers,
} from 'lucide-react';

export default function ParentActivityPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const {
    currentStreak,
    longestStreak,
    totalActiveDays,
    learningHours,
    streakDays,
  } = useAppStore();

  const activityLogs = [
    {
      time: 'Today, 6:45 PM',
      action: 'Completed Python Lesson 2: Conditionals & Loops',
      category: 'Curriculum',
      icon: CheckCircle2,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      time: 'Today, 6:15 PM',
      action: 'Executed Python 3.10 Code in Live Playground',
      category: 'Coding Practice',
      icon: Code2,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      time: 'Yesterday, 4:30 PM',
      action: 'Submitted Assignment 2: Dynamic String Buffer in C',
      category: 'Assignment',
      icon: FileText,
      color: 'text-purple-600 bg-purple-50',
    },
    {
      time: 'Sep 6, 2026',
      action: 'Scored 88% on Python Assessment Quiz',
      category: 'Quiz',
      icon: CheckSquare,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      time: 'Sep 5, 2026',
      action: 'Discussed Pointer Dereferencing with EduAI Mentor',
      category: 'AI Mentorship',
      icon: Activity,
      color: 'text-indigo-600 bg-indigo-50',
    },
  ];

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
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Live Activity Audit
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                Study Rhythm &amp; Activity Verification
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Rahul&apos;s verified timeline of code compilations, lesson completions, and quiz submissions.
              </p>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center space-x-2 text-xs font-bold text-emerald-800">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span>Last Active: Today, 6:45 PM</span>
            </div>
          </div>

          {/* 6 Metric Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Current Streak</span>
              <div className="text-xl font-black text-orange-600">{currentStreak} Days 🔥</div>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Study Hours</span>
              <div className="text-xl font-black text-slate-900">{learningHours} Hours</div>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Lessons Finished</span>
              <div className="text-xl font-black text-blue-600">53 Units</div>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Assignments</span>
              <div className="text-xl font-black text-purple-600">3 Submissions</div>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Quizzes Taken</span>
              <div className="text-xl font-black text-emerald-600">5 Attempts</div>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Coding Exercises</span>
              <div className="text-xl font-black text-indigo-600">50 Solved</div>
            </div>
          </div>

          {/* Activity Heatmap */}
          <StreakHeatmap
            streakDays={streakDays}
            currentStreak={currentStreak}
            longestStreak={longestStreak}
            totalActiveDays={totalActiveDays}
          />

          {/* Activity Timeline List */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Recent Learning Sessions</h3>
            <div className="divide-y divide-slate-100">
              {activityLogs.map((log, idx) => {
                const Icon = log.icon;
                return (
                  <div key={idx} className="py-3.5 flex items-start space-x-3.5 text-xs">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${log.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{log.action}</span>
                        <span className="text-slate-400 text-[11px] font-mono">{log.time}</span>
                      </div>
                      <span className="text-[11px] text-slate-500">{log.category}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
