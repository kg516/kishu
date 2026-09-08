'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Compass,
  Code2,
  CheckSquare,
  FileText,
  BarChart3,
  Trophy,
  Award,
  Sparkles,
  Bell,
  Settings,
  Flame,
  Users,
  Shield,
  Layers,
  GraduationCap,
  Activity,
  AlertTriangle,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onCloseMobile }) => {
  const pathname = usePathname();
  const { currentUser, enrolledCourses, currentStreak, learningHours } = useAppStore();

  const role = currentUser?.role || 'student';
  const enrolledCount = enrolledCourses.length;

  const studentLinks = [
    { label: 'Dashboard', href: '/student', icon: LayoutDashboard },
    { label: 'My Courses', href: '/student/courses', icon: BookOpen },
    { label: 'Practice Coding', href: '/student/practice', icon: Code2 },
    { label: 'Quizzes', href: '/student/quizzes', icon: CheckSquare },
    { label: 'Assignments', href: '/student/assignments', icon: FileText },
    { label: 'Analytics', href: '/student/analytics', icon: BarChart3 },
    { label: 'Achievements', href: '/student/achievements', icon: Trophy },
    { label: 'Certificates', href: '/student/certificates', icon: Award },
    { label: 'EduAI Mentor', href: '/student/practice', icon: Sparkles, badge: 'AI' },
  ];

  const parentLinks = [
    { label: 'Dashboard', href: '/parent', icon: LayoutDashboard },
    { label: 'Child Progress', href: '/parent/performance', icon: Activity },
    { label: 'Subject Performance', href: '/parent/performance', icon: BarChart3 },
    { label: 'Activity Logs', href: '/parent/activity', icon: Layers },
    { label: 'Notifications', href: '/parent/notifications', icon: Bell, badge: 'Alerts' },
  ];

  const adminLinks = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Students Directory', href: '/admin/students', icon: Users, badge: 'At-Risk' },
    { label: 'Course Catalog', href: '/admin/courses', icon: BookOpen },
    { label: 'Notifications Hub', href: '/admin/notifications', icon: Bell },
    { label: 'Institutional Analytics', href: '/admin', icon: BarChart3 },
  ];

  const activeLinks = role === 'admin' ? adminLinks : role === 'parent' ? parentLinks : studentLinks;

  const sidebarContent = (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full select-none">
      {/* Student Capacity Indicator Card (Only for Student) */}
      {role === 'student' && (
        <div className="p-4 mx-3 mt-4 mb-2 bg-gradient-to-br from-blue-50 to-indigo-50/60 rounded-2xl border border-blue-100/80 shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Active Course Slots</span>
            </span>
            <span
              className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
                enrolledCount >= 4
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              {enrolledCount} / 4
            </span>
          </div>

          {/* Mini progress bar */}
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                enrolledCount >= 4 ? 'bg-amber-500' : 'bg-blue-600'
              }`}
              style={{ width: `${(enrolledCount / 4) * 100}%` }}
            />
          </div>

          <p className="text-[11px] text-slate-500 leading-tight">
            {enrolledCount >= 4
              ? '⚠️ 4-Course Limit Reached. Complete or drop one to add more.'
              : `${4 - enrolledCount} more course slot${4 - enrolledCount > 1 ? 's' : ''} available.`}
          </p>
        </div>
      )}

      {/* Parent Child Banner (Only for Parent) */}
      {role === 'parent' && (
        <div className="p-4 mx-3 mt-4 mb-2 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 shadow-2xs space-y-2">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
              RS
            </div>
            <div>
              <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">
                Monitored Child
              </span>
              <span className="text-xs font-bold text-slate-900">Rahul Sharma</span>
            </div>
          </div>
          <div className="text-[11px] text-slate-600 flex items-center justify-between pt-1 border-t border-emerald-100">
            <span>Last Active: <strong>Today, 6:45 PM</strong></span>
            <span className="text-emerald-700 font-bold">12d Streak</span>
          </div>
        </div>
      )}

      {/* Admin Quick Status (Only for Admin) */}
      {role === 'admin' && (
        <div className="p-4 mx-3 mt-4 mb-2 bg-purple-50/70 rounded-2xl border border-purple-200/80 shadow-2xs space-y-1.5">
          <span className="text-[10px] text-purple-800 font-bold uppercase tracking-wider block">
            Institutional Admin
          </span>
          <span className="text-xs font-bold text-slate-900">College Administration</span>
          <div className="text-[11px] text-slate-600 flex items-center justify-between pt-1 border-t border-purple-100">
            <span>Active Students: <strong>5,420</strong></span>
            <span className="text-rose-600 font-semibold">2 At-Risk</span>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {activeLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.label}
              href={link.href}
              onClick={onCloseMobile}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{link.label}</span>
              </div>
              {link.badge && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                  }`}
                >
                  {link.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Streak / Hours Tracker for Student */}
      {role === 'student' && (
        <div className="p-4 border-t border-slate-100 mx-3 mb-4 bg-slate-50 rounded-2xl flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
            <div>
              <div className="font-bold text-slate-800">{currentStreak} Days</div>
              <div className="text-[10px] text-slate-500">Streak Record</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-slate-800">{learningHours}h</div>
            <div className="text-[10px] text-slate-500">Total Hours</div>
          </div>
        </div>
      )}
    </aside>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-[calc(100vh-4rem)] sticky top-16">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
          <div className="relative z-10 w-72 h-full bg-white shadow-2xl animate-slideRight">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
