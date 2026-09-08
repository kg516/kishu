'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Shield,
  Users,
  BookOpen,
  TrendingUp,
  Award,
  Clock,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  ArrowRight,
  BellRing,
  Activity,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { useAppStore } from '@/lib/store';

export default function AdminDashboard() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { courses, notifications } = useAppStore();

  const kpis = [
    { label: 'Total Enrolled Students', value: '5,420', change: '+12% this month', icon: Users, color: 'text-blue-600 bg-blue-50' },
    { label: 'Daily Active Learners', value: '4,890', change: '90.2% DAU Ratio', icon: Activity, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Accredited Courses', value: courses.length.toString(), change: '12 Disciplines', icon: BookOpen, color: 'text-purple-600 bg-purple-50' },
    { label: 'Avg Platform Mastery', value: '81.2%', change: '+4.2% YoY Growth', icon: TrendingUp, color: 'text-amber-600 bg-amber-50' },
    { label: 'Logged Study Hours', value: '142.8k', change: 'Verified sessions', icon: Clock, color: 'text-indigo-600 bg-indigo-50' },
    { label: 'At-Risk Inactivity Flags', value: '2', change: 'Early Warning Active', icon: AlertTriangle, color: 'text-rose-600 bg-rose-50' },
  ];

  // Daily active learners bars
  const dauData = [
    { day: 'Mon', count: 4200 },
    { day: 'Tue', count: 4600 },
    { day: 'Wed', count: 5100 },
    { day: 'Thu', count: 4950 },
    { day: 'Fri', count: 5300 },
    { day: 'Sat', count: 4890 },
    { day: 'Sun', count: 4400 },
  ];
  const maxDau = 6000;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar onToggleMobileSidebar={() => setMobileSidebarOpen(true)} />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto">
          {/* Admin Header */}
          <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 bg-purple-500/20 text-purple-300 border border-purple-400/30 px-3 py-1 rounded-full text-xs font-semibold">
                <Shield className="w-3.5 h-3.5 text-purple-400" />
                <span>Institutional Governance &bull; SmartEdu Administrator</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Academic Operations Command
              </h1>
              <p className="text-sm text-purple-200 max-w-xl">
                Global health metrics, course enrollment densities, and early warning risk monitoring across student batches.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <Link
                href="/admin/notifications"
                className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center space-x-2"
              >
                <BellRing className="w-4 h-4" />
                <span>Broadcast Alert</span>
              </Link>
              <Link
                href="/admin/courses"
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition flex items-center space-x-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Manage Courses</span>
              </Link>
            </div>
          </div>

          {/* Early Warning System Alert Box */}
          <div className="p-5 bg-rose-50 border border-rose-200 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start space-x-3">
              <div className="p-2.5 bg-rose-100 text-rose-600 rounded-xl flex-shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-rose-950 text-sm">
                    Early Warning Intelligence Active
                  </h3>
                  <span className="text-[10px] bg-rose-200 text-rose-900 font-bold px-2 py-0.2 rounded-full">
                    2 Flags Triggered
                  </span>
                </div>
                <p className="text-xs text-rose-800 leading-relaxed">
                  2 students have recorded a <strong>&gt;15% decrease in activity</strong> over the past 2 weeks. Automated mentor checks and parental notifications are dispatched.
                </p>
              </div>
            </div>

            <Link
              href="/admin/students"
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition flex-shrink-0 flex items-center space-x-1.5 self-start sm:self-center"
            >
              <span>Review Flagged Students</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Platform KPIs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {kpis.map((kpi, idx) => {
              const Icon = kpi.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs card-hover space-y-2 flex flex-col justify-between"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${kpi.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900">{kpi.value}</div>
                    <div className="text-xs font-semibold text-slate-500 mt-0.5 truncate">{kpi.label}</div>
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium">{kpi.change}</div>
                </div>
              );
            })}
          </div>

          {/* Charts Row: DAU & Course Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Daily Active Learners */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Weekly Active Learners (DAU)</h3>
                  <p className="text-xs text-slate-500">
                    Live system concurrency across desktop, tablet, and mobile clients
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Healthy Concurrency
                </span>
              </div>

              <div className="h-44 flex items-end justify-between gap-3 pt-4 px-2">
                {dauData.map((d, i) => {
                  const heightPct = Math.round((d.count / maxDau) * 100);
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center group cursor-pointer">
                      <span className="text-[10px] font-mono text-slate-500 opacity-0 group-hover:opacity-100 transition mb-1">
                        {d.count}
                      </span>
                      <div className="w-full bg-slate-100 rounded-t-xl overflow-hidden h-36 flex items-end">
                        <div
                          className="w-full bg-gradient-to-t from-purple-600 to-indigo-500 rounded-t-xl transition-all duration-500 group-hover:from-purple-500 group-hover:to-indigo-400"
                          style={{ height: `${heightPct}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-600 font-semibold mt-2">{d.day}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Course Capacity Density */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Course Enrollments</h3>
                  <p className="text-xs text-slate-500">Distribution across popular disciplines</p>
                </div>
                <Link href="/admin/courses" className="text-xs font-bold text-blue-600 hover:underline">
                  All Courses
                </Link>
              </div>

              <div className="space-y-3 pt-1">
                {[
                  { name: 'Python for Intelligent Systems', pct: 94, students: '1,420' },
                  { name: 'Data Structures & Algorithms', pct: 88, students: '1,310' },
                  { name: 'C Programming & Systems', pct: 76, students: '1,050' },
                  { name: 'Artificial Intelligence Fundamentals', pct: 64, students: '890' },
                  { name: 'Modern Full-Stack Engineering', pct: 58, students: '750' },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-800 truncate max-w-[200px]">{item.name}</span>
                      <span className="text-slate-500">{item.students} Students ({item.pct}%)</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-600 rounded-full transition-all"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
