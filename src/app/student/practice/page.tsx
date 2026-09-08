'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { CodeEditor } from '@/components/code/CodeEditor';
import { STARTER_CODE_BY_LANGUAGE } from '@/lib/codeRunner';
import { Code2, Sparkles, Terminal, Flame, BookOpen, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '@/lib/store';

function PracticeContent() {
  const searchParams = useSearchParams();
  const initialLang = searchParams?.get('lang') || 'python';

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { currentStreak, learningHours } = useAppStore();

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
              <div className="flex items-center space-x-2 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 w-fit mb-2">
                <Code2 className="w-3.5 h-3.5" />
                <span>Multi-Language Engineering Workspace</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Interactive Programming Playground
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Execute code in Python, C, C++, Java, JavaScript, and HTML/CSS. Analyze program mechanics with 1-click 10-point AI explanations.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-2xl flex items-center space-x-2 text-xs font-bold text-orange-700">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span>{currentStreak}d Streak</span>
              </div>
              <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-2xl flex items-center space-x-2 text-xs font-bold text-indigo-700">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>EduAI Ready</span>
              </div>
            </div>
          </div>

          {/* Code Editor Full Frame */}
          <div className="h-[620px] rounded-2xl overflow-hidden shadow-lg border border-slate-800">
            <CodeEditor
              initialLanguage={initialLang}
              initialCode={STARTER_CODE_BY_LANGUAGE[initialLang]}
              title="SmartEdu High-Fidelity Code Runner"
            />
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <div className="text-xs font-bold text-blue-600 flex items-center space-x-1.5">
                <Terminal className="w-4 h-4" />
                <span>Deterministic Execution</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Captures standard output streams, execution time in milliseconds, and exit codes without client vulnerabilities.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <div className="text-xs font-bold text-purple-600 flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4" />
                <span>10-Point AI Explainer</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Click &quot;Explain Code&quot; for instant line-by-line syntax breakdown, variable scoping, and optimization suggestions.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <div className="text-xs font-bold text-emerald-600 flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Streaks & Hours Sync</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Running meaningful code exercises contributes directly to your 12-day activity calendar and parental updates.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function PracticeCodingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-xs text-slate-400">Loading Playground...</div>}>
      <PracticeContent />
    </Suspense>
  );
}
