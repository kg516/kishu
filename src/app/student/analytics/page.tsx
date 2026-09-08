'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Flame,
  Zap,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { SubjectPerformanceChart } from '@/components/charts/SubjectPerformanceChart';
import { OverallAcademicChart } from '@/components/charts/OverallAcademicChart';
import { StreakHeatmap } from '@/components/charts/StreakHeatmap';
import { useAppStore } from '@/lib/store';

export default function AnalyticsPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const {
    analytics,
    learningHours,
    currentStreak,
    longestStreak,
    totalActiveDays,
    streakDays,
    enrolledCourses,
  } = useAppStore();

  const avgScoreAll = Math.round(
    analytics.reduce((acc, curr) => acc + curr.avgScore, 0) / (analytics.length || 1)
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar onToggleMobileSidebar={() => setMobileSidebarOpen(true)} />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto">
          {/* Header */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Cognitive Intelligence Engine
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                Performance Analytics & Trends
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Deep-dive diagnostic charts tracking subject-wise growth, algorithmic velocity, and assessment accuracy.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl text-center">
                <span className="text-[10px] uppercase font-bold text-blue-600 block">Overall GPA</span>
                <span className="text-xl font-black text-blue-900">{avgScoreAll}% (Honors)</span>
              </div>
            </div>
          </div>

          {/* Holistic Overview Chart */}
          <OverallAcademicChart
            overallScore={avgScoreAll}
            courseCompletion={78}
            quizAverage={84}
            codingAccuracy={88}
            learningHours={learningHours}
            weeklyActivity={[4, 6, 8, 5, 7, 9, 7.5]}
          />

          {/* Subject-Wise Performance Graphs Grid */}
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Subject-Specific Performance Graphs</h2>
              <p className="text-xs text-slate-500">
                Individual curves for each enrolled discipline with assessment progression and accuracy breakdown
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {analytics.map((item) => (
                <SubjectPerformanceChart key={item.subject} analytics={item} />
              ))}
            </div>
          </div>

          {/* Streak Activity Heatmap */}
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Habit Formation & Learning Consistency</h2>
              <p className="text-xs text-slate-500">
                GitHub-style calendar matrix reflecting daily cognitive submissions and lessons
              </p>
            </div>

            <StreakHeatmap
              streakDays={streakDays}
              currentStreak={currentStreak}
              longestStreak={longestStreak}
              totalActiveDays={totalActiveDays}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
