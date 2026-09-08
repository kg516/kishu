'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { useAppStore } from '@/lib/store';
import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Award,
  Sparkles,
  Info,
  Check,
} from 'lucide-react';
import { NotificationType } from '@/lib/types';

export default function ParentNotificationsPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { notifications, markNotificationAsRead } = useAppStore();

  const parentNotifs = notifications.filter(
    (n) => n.recipientRole === 'parent' || n.recipientRole === 'all'
  );

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'warning':
      case 'alert':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getBadgeStyle = (type: NotificationType) => {
    switch (type) {
      case 'warning':
      case 'alert':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'success':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
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
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Parent Alert Stream
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                Parent Notifications &amp; Inactivity Alerts
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Automated platform updates alerting you to student milestone achievements, overdue coursework, and study gaps.
              </p>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-700 block">Total Alerts</span>
              <span className="text-xl font-black text-emerald-900">{parentNotifs.length} Received</span>
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {parentNotifs.map((n) => (
              <div
                key={n.id}
                onClick={() => markNotificationAsRead(n.id)}
                className={`p-5 rounded-3xl border transition cursor-pointer flex items-start space-x-4 ${
                  n.read
                    ? 'bg-white border-slate-200 opacity-80'
                    : 'bg-white border-blue-300 shadow-sm ring-2 ring-blue-500/5'
                }`}
              >
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex-shrink-0">
                  {getIcon(n.type)}
                </div>

                <div className="flex-1 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900 text-sm">{n.title}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getBadgeStyle(n.type)}`}>
                        {n.type.toUpperCase()}
                      </span>
                    </div>
                    <span className="text-slate-400 text-[11px] font-mono">{n.createdAt}</span>
                  </div>

                  <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">{n.message}</p>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Target: Rahul Sharma</span>
                    {!n.read && (
                      <span className="text-blue-600 font-bold text-[11px] flex items-center space-x-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Click to mark as read</span>
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
