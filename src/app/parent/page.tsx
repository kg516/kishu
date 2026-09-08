'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Flame,
  Clock,
  BookOpen,
  Award,
  TrendingUp,
  Activity,
  BellRing,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Shield,
  ArrowRight,
  Code2,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { SubjectPerformanceChart } from '@/components/charts/SubjectPerformanceChart';
import { OverallAcademicChart } from '@/components/charts/OverallAcademicChart';
import { StreakHeatmap } from '@/components/charts/StreakHeatmap';
import { useAppStore } from '@/lib/store';

export default function ParentDashboard() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const {
    currentUser,
    enrolledCourses,
    currentStreak,
    longestStreak,
    totalActiveDays,
    learningHours,
    streakDays,
    analytics,
    notifications,
  } = useAppStore();

  const parentNotifs = notifications.filter((n) => n.recipientRole === 'parent' || n.recipientRole === 'all');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar onToggleMobileSidebar={() => setMobileSidebarOpen(true)} />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto">
          {/* Parent Header Banner */}
          <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-semibold">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Parent Oversight Mode &bull; Read-Only Academic Mirror</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome, {currentUser?.name || 'Anita Sharma'}
              </h1>
              <p className="text-sm text-emerald-100 max-w-xl">
                Monitoring child: <strong className="text-white">Rahul Sharma</strong> (B.Tech Computer Science). Tracking live study habits, streaks, and subject retention.
              </p>
            </div>

            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-right flex flex-col items-end flex-shrink-0">
              <span className="text-[11px] uppercase font-bold text-emerald-300 block">Child Status</span>
              <span className="text-base font-bold text-white flex items-center space-x-1.5 mt-0.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Active Today, 6:45 PM</span>
              </span>
              <span className="text-xs text-emerald-200 mt-1">12-Day Continuous Streak 🔥</span>
            </div>
          </div>

          {/* Smart Inactivity & Milestone Notification Alert Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5 text-amber-900">
                <div className="p-2 bg-amber-100 rounded-xl text-amber-700">
                  <BellRing className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Parent Alert &amp; Inactivity System</h3>
                  <p className="text-xs text-amber-700">
                    Automated parental updates triggered by study velocity changes
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-bold bg-amber-200/80 text-amber-900 px-2.5 py-0.5 rounded-full">
                Active Notification
              </span>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-amber-200/80 text-xs text-slate-700 space-y-1">
              <div className="font-bold text-slate-900 flex items-center justify-between">
                <span>Recent Parental Alert:</span>
                <span className="text-[10px] text-slate-400">1 day ago</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                &ldquo;Your child has not been active on the learning platform recently. Encourage them to complete a lesson and continue their learning journey.&rdquo;
              </p>
              <div className="pt-2 text-[11px] text-emerald-700 font-bold flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Resolved: Rahul logged in and completed Python Lesson 2 today!</span>
              </div>
            </div>
          </div>

          {/* Child Overview Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs card-hover flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500">Current Streak</span>
                <div className="text-2xl font-black text-slate-900 flex items-center space-x-1">
                  <span>{currentStreak}</span>
                  <span className="text-xs font-bold text-orange-600">Days 🔥</span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium">{totalActiveDays} Total Active Days</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
                <Flame className="w-6 h-6 fill-current" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs card-hover flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500">Total Study Time</span>
                <div className="text-2xl font-black text-slate-900 flex items-center space-x-1">
                  <span>{learningHours}</span>
                  <span className="text-xs font-bold text-slate-400">Hours</span>
                </div>
                <span className="text-[11px] text-emerald-600 font-medium">Verified System Logs</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs card-hover flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500">Courses Enrolled</span>
                <div className="text-2xl font-black text-slate-900 flex items-center space-x-1">
                  <span>{enrolledCourses.length}</span>
                  <span className="text-xs font-bold text-slate-400">/ 4 Limit</span>
                </div>
                <span className="text-[11px] text-blue-600 font-medium">All Slots Active</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs card-hover flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500">Completed Units</span>
                <div className="text-2xl font-black text-slate-900 flex items-center space-x-1">
                  <span>53</span>
                  <span className="text-xs font-bold text-slate-400">Lessons</span>
                </div>
                <span className="text-[11px] text-purple-600 font-medium">7 Official Badges</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Course Completion Breakdown for Parents */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Enrolled Course Completion Rates</h3>
                <p className="text-xs text-slate-500">
                  Real-time synchronization with Rahul&apos;s active learning progress
                </p>
              </div>
              <span className="text-xs font-bold text-slate-400">4 Enrolled Courses</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {enrolledCourses.map((c) => (
                <div key={c.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{c.title}</span>
                    <span className="font-bold text-blue-600">{c.progress || 0}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all"
                      style={{ width: `${c.progress || 0}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{c.instructor}</span>
                    <span>{c.lessonsCount} Modules</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subject-Wise Performance Graphs for Parents */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Subject-Wise Academic Progression
                </h3>
                <p className="text-xs text-slate-500">
                  Diagnostic quiz scores and homework submissions for each subject
                </p>
              </div>
              <Link
                href="/parent/performance"
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center space-x-1"
              >
                <span>Detailed Subject Trends</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {analytics.map((item) => (
                <SubjectPerformanceChart key={item.subject} analytics={item} />
              ))}
            </div>
          </div>

          {/* Child Activity Streak Heatmap */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Consistency & Study Rhythm</h3>
              <p className="text-xs text-slate-500">
                Visual activity verification matrix — monitoring daily learning consistency
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
