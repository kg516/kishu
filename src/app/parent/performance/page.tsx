'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { SubjectPerformanceChart } from '@/components/charts/SubjectPerformanceChart';
import { OverallAcademicChart } from '@/components/charts/OverallAcademicChart';
import { useAppStore } from '@/lib/store';
import { TrendingUp, BarChart3, ShieldCheck } from 'lucide-react';

export default function ParentPerformancePage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { analytics, learningHours } = useAppStore();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar onToggleMobileSidebar={() => setMobileSidebarOpen(true)} />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Parental Academic Audit
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                Rahul&apos;s Subject Performance Graphs
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Transparent weekly and monthly trends tracking quiz grades, coding accuracy, and curriculum completion.
              </p>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center space-x-2 text-xs font-bold text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified Institutional Record</span>
            </div>
          </div>

          <OverallAcademicChart
            overallScore={82}
            courseCompletion={78}
            quizAverage={84}
            codingAccuracy={88}
            learningHours={learningHours}
            weeklyActivity={[4, 6, 8, 5, 7, 9, 7.5]}
          />

          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Granular Subject-Wise Graphs</h3>
              <p className="text-xs text-slate-500">
                Continuous score evolution across Python, C Systems, Mathematics & Algorithms, and AI
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {analytics.map((item) => (
                <SubjectPerformanceChart key={item.subject} analytics={item} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
