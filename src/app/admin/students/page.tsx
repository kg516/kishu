'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import {
  Users,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Clock,
  BookOpen,
  ArrowRight,
  Flame,
  Mail,
  Shield,
  Eye,
  X,
} from 'lucide-react';

interface StudentRecord {
  id: string;
  name: string;
  email: string;
  coursesCount: number;
  avgProgress: number;
  streak: number;
  lastActive: string;
  status: 'Active' | 'At-Risk';
  riskReason?: string;
  parentName: string;
  parentEmail: string;
}

export default function AdminStudentsPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'At-Risk'>('All');
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);

  const students: StudentRecord[] = [
    {
      id: 'std-1',
      name: 'Rahul Sharma',
      email: 'rahul@smartedu.edu',
      coursesCount: 4,
      avgProgress: 78,
      streak: 12,
      lastActive: 'Today, 6:45 PM',
      status: 'Active',
      parentName: 'Anita Sharma',
      parentEmail: 'anita@smartedu.edu',
    },
    {
      id: 'std-2',
      name: 'Devin Thorne',
      email: 'devin@smartedu.edu',
      coursesCount: 3,
      avgProgress: 42,
      streak: 0,
      lastActive: '6 days ago',
      status: 'At-Risk',
      riskReason: 'Student activity has decreased by 18% over the last 2 weeks.',
      parentName: 'Sarah Thorne',
      parentEmail: 'sarah.thorne@example.com',
    },
    {
      id: 'std-3',
      name: 'Pooja Patel',
      email: 'pooja@smartedu.edu',
      coursesCount: 4,
      avgProgress: 88,
      streak: 21,
      lastActive: 'Today, 2:15 PM',
      status: 'Active',
      parentName: 'Rajesh Patel',
      parentEmail: 'rajesh.patel@example.com',
    },
    {
      id: 'std-4',
      name: 'Aiden Brooks',
      email: 'aiden@smartedu.edu',
      coursesCount: 2,
      avgProgress: 35,
      streak: 1,
      lastActive: '5 days ago',
      status: 'At-Risk',
      riskReason: 'Student performance has decreased by 15% over the last 2 weeks.',
      parentName: 'Mark Brooks',
      parentEmail: 'mark.brooks@example.com',
    },
    {
      id: 'std-5',
      name: 'Sneha Reddy',
      email: 'sneha@smartedu.edu',
      coursesCount: 4,
      avgProgress: 92,
      streak: 19,
      lastActive: 'Today, 5:00 PM',
      status: 'Active',
      parentName: 'Venkatesh Reddy',
      parentEmail: 'venkat.reddy@example.com',
    },
  ];

  const filtered = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                Student Directory &amp; Risk Engine
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                Student Academic Oversight
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Monitor student capacity limits, study streaks, and automatic early warning alerts for declining performance.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <span className="px-3 py-1.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl flex items-center space-x-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>2 At-Risk Students Flagged</span>
              </span>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search students by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition shadow-2xs"
              />
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <button
                onClick={() => setStatusFilter('All')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex-1 sm:flex-none ${
                  statusFilter === 'All'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                All ({students.length})
              </button>
              <button
                onClick={() => setStatusFilter('Active')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex-1 sm:flex-none ${
                  statusFilter === 'Active'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                Active (3)
              </button>
              <button
                onClick={() => setStatusFilter('At-Risk')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex-1 sm:flex-none ${
                  statusFilter === 'At-Risk'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                At-Risk (2)
              </button>
            </div>
          </div>

          {/* Students Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="p-4 sm:px-6">Student Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Enrolled</th>
                    <th className="p-4">Progress</th>
                    <th className="p-4">Streak</th>
                    <th className="p-4">Last Active</th>
                    <th className="p-4">Risk Status</th>
                    <th className="p-4 text-right sm:pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/80 transition">
                      <td className="p-4 sm:px-6 font-bold text-slate-900">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-800 font-bold flex items-center justify-center">
                            {s.name.charAt(0)}
                          </div>
                          <span>{s.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-slate-600">{s.email}</td>
                      <td className="p-4 font-bold text-slate-800">
                        {s.coursesCount} / 4
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 rounded-full"
                              style={{ width: `${s.avgProgress}%` }}
                            />
                          </div>
                          <span className="font-bold text-slate-700">{s.avgProgress}%</span>
                        </div>
                      </td>
                      <td className="p-4 font-bold text-orange-600">
                        {s.streak > 0 ? `🔥 ${s.streak}d` : '0d'}
                      </td>
                      <td className="p-4 text-slate-500 font-mono">{s.lastActive}</td>
                      <td className="p-4">
                        {s.status === 'At-Risk' ? (
                          <span className="inline-flex items-center space-x-1 text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 font-bold">
                            <AlertTriangle className="w-3 h-3" />
                            <span>At-Risk</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-bold">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Active</span>
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right sm:pr-6">
                        <button
                          onClick={() => setSelectedStudent(s)}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition"
                        >
                          View Profile
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white font-bold flex items-center justify-center">
                  {selectedStudent.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-base">{selectedStudent.name}</h3>
                  <span className="text-xs text-slate-400">{selectedStudent.email}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              {selectedStudent.riskReason && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-900 space-y-1">
                  <div className="font-bold flex items-center space-x-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Early Warning Trigger Reason:</span>
                  </div>
                  <p>{selectedStudent.riskReason}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                <div>
                  <span className="text-slate-400 block font-medium">Enrolled Courses:</span>
                  <span className="font-bold text-slate-900 text-sm">{selectedStudent.coursesCount} / 4 Slots</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Average Progress:</span>
                  <span className="font-bold text-blue-600 text-sm">{selectedStudent.avgProgress}%</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Current Streak:</span>
                  <span className="font-bold text-orange-600 text-sm">{selectedStudent.streak} Days 🔥</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Last Active Timestamp:</span>
                  <span className="font-mono text-slate-700 font-semibold">{selectedStudent.lastActive}</span>
                </div>
              </div>

              <div className="p-4 bg-purple-50/70 rounded-2xl border border-purple-100 space-y-1">
                <span className="font-bold text-purple-900 uppercase tracking-wider block text-[10px]">
                  Registered Parent Contact:
                </span>
                <p className="font-semibold text-slate-800">{selectedStudent.parentName}</p>
                <p className="text-slate-500">{selectedStudent.parentEmail}</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-5 py-2 bg-slate-900 text-white font-bold rounded-xl text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
