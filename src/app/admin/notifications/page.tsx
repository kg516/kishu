'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { useAppStore } from '@/lib/store';
import {
  Bell,
  Send,
  Users,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  Info,
} from 'lucide-react';
import { NotificationType } from '@/lib/types';

export default function AdminNotificationsPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { notifications, addNotification } = useAppStore();

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [recipientRole, setRecipientRole] = useState<'all' | 'student' | 'parent'>('all');
  const [type, setType] = useState<NotificationType>('info');
  const [dispatchedSuccess, setDispatchedSuccess] = useState(false);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    addNotification({
      recipientRole,
      title: title.trim(),
      message: message.trim(),
      type,
    });

    setTitle('');
    setMessage('');
    setDispatchedSuccess(true);
    setTimeout(() => setDispatchedSuccess(false), 3000);
  };

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
                Institutional Communications Hub
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                Notification &amp; Announcement Broadcaster
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Dispatch targeted alerts, inactivity nudges, and curriculum announcements to Students and Parents.
              </p>
            </div>

            <div className="p-3 bg-purple-50 border border-purple-200 rounded-2xl text-center">
              <span className="text-[10px] uppercase font-bold text-purple-700 block">Total Dispatches</span>
              <span className="text-xl font-black text-purple-900">{notifications.length} Messages</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Compose Form */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-900 text-base">Compose Broadcast Message</h3>
                <p className="text-xs text-slate-500">
                  Fill details and target audience for instant delivery
                </p>
              </div>

              <form onSubmit={handleBroadcast} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Target Audience</label>
                  <select
                    value={recipientRole}
                    onChange={(e) => setRecipientRole(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 font-semibold"
                  >
                    <option value="all">Broadcast to All (Students + Parents)</option>
                    <option value="student">Students Only (Learning Nudge / Streak)</option>
                    <option value="parent">Parents Only (Inactivity / Milestone)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Notification Category</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as NotificationType)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 font-semibold"
                  >
                    <option value="info">General Information / Announcement</option>
                    <option value="warning">Inactivity Warning / Milestone Risk</option>
                    <option value="alert">Critical Academic Alert / Overdue</option>
                    <option value="success">Achievement Recognition / Distinction</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subject Headline</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Inactivity Reminder: Complete your Python module"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Notification Body</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write detailed guidance or announcement..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 font-medium resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Dispatch Notification Immediately</span>
                </button>

                {dispatchedSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-center font-bold flex items-center justify-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Notification successfully broadcasted to live state!</span>
                  </div>
                )}
              </form>
            </div>

            {/* Right: Notification History Feed */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Platform Dispatch History</h3>
                  <p className="text-xs text-slate-500">Live feed across all role queues</p>
                </div>
                <span className="text-xs text-slate-400 font-mono">Real-time</span>
              </div>

              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{n.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{n.createdAt}</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{n.message}</p>
                    <div className="pt-1 flex items-center justify-between text-[11px]">
                      <span className="text-purple-700 font-bold uppercase">To: {n.recipientRole}</span>
                      <span className="text-slate-400">Type: {n.type}</span>
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
