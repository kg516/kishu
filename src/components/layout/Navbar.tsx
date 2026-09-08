'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  GraduationCap,
  Bell,
  Search,
  User,
  LogOut,
  Flame,
  Shield,
  Users,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  RotateCcw,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { UserRole } from '@/lib/types';

interface NavbarProps {
  onToggleMobileSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleMobileSidebar }) => {
  const router = useRouter();
  const {
    currentUser,
    loginAs,
    logout,
    notifications,
    markNotificationAsRead,
    currentStreak,
    resetDemoData,
  } = useAppStore();

  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadNotifs = notifications.filter((n) => !n.read);

  const handleRoleSwitch = (role: UserRole) => {
    loginAs(role);
    setProfileOpen(false);
    if (role === 'student') router.push('/student');
    if (role === 'parent') router.push('/parent');
    if (role === 'admin') router.push('/admin');
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/student/courses?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Mobile hamburger + Brand Logo */}
          <div className="flex items-center space-x-3">
            {onToggleMobileSidebar && (
              <button
                onClick={onToggleMobileSidebar}
                className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md group-hover:shadow-indigo-500/20 transition">
                <GraduationCap className="w-6 h-6 transform group-hover:scale-110 transition" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-slate-900 leading-tight tracking-tight">
                  Smart<span className="text-blue-600">Edu</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                  Digital Learning Ecosystem
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Global Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses, lessons, concepts (e.g. Python, Pointers, DSA)..."
                className="w-full bg-slate-100/90 hover:bg-slate-100 focus:bg-white text-xs text-slate-900 pl-10 pr-4 py-2.5 rounded-xl border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition focus:outline-hidden"
              />
            </form>
          </div>

          {/* Right: Role Switcher Pill + Streak + Notifications + Profile */}
          <div className="flex items-center space-x-3">
            {/* 1-Click Quick Portal Switcher for Judges */}
            <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => handleRoleSwitch('student')}
                className={`px-3 py-1.5 rounded-lg transition flex items-center space-x-1.5 ${
                  currentUser?.role === 'student'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Switch to Student Portal"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Student</span>
              </button>

              <button
                onClick={() => handleRoleSwitch('parent')}
                className={`px-3 py-1.5 rounded-lg transition flex items-center space-x-1.5 ${
                  currentUser?.role === 'parent'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Switch to Parent Portal"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Parent</span>
              </button>

              <button
                onClick={() => handleRoleSwitch('admin')}
                className={`px-3 py-1.5 rounded-lg transition flex items-center space-x-1.5 ${
                  currentUser?.role === 'admin'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Switch to Admin Portal"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            </div>

            {/* Streak Flame Badge if student */}
            {currentUser?.role === 'student' && (
              <Link
                href="/student"
                className="flex items-center space-x-1 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 px-2.5 py-1.5 rounded-xl text-xs font-bold transition shadow-2xs"
                title="12-Day Learning Streak Active"
              >
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span>{currentStreak}d</span>
              </Link>
            )}

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white" />
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 space-y-3 z-50 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="font-bold text-sm text-slate-900">Notifications</span>
                    <span className="text-[11px] text-blue-600 font-semibold">
                      {unreadNotifs.length} new
                    </span>
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-2 text-xs">
                    {notifications.slice(0, 5).map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationAsRead(n.id)}
                        className={`p-3 rounded-xl border transition cursor-pointer ${
                          n.read
                            ? 'bg-slate-50 border-slate-100 text-slate-600'
                            : 'bg-blue-50/60 border-blue-100 text-blue-950 font-medium'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-slate-900">{n.title}</span>
                          <span className="text-[10px] text-slate-400">{n.createdAt}</span>
                        </div>
                        <p className="text-slate-600 leading-relaxed">{n.message}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-center">
                    <button
                      onClick={() => setNotifOpen(false)}
                      className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile / Demo User Info Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-100 transition"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                  {currentUser?.name ? currentUser.name.charAt(0) : 'U'}
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 space-y-3 z-50 animate-fadeIn">
                  <div className="p-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">{currentUser?.name || 'Guest User'}</p>
                    <p className="text-[11px] text-slate-500">{currentUser?.email || 'No email'}</p>
                    <span className="inline-block mt-1 text-[10px] uppercase tracking-wider font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                      Role: {currentUser?.role || 'Guest'}
                    </span>
                  </div>

                  {/* Switch Role Inside Dropdown */}
                  <div className="space-y-1 text-xs">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-2">
                      Switch Demo Persona:
                    </span>
                    <button
                      onClick={() => handleRoleSwitch('student')}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition flex items-center justify-between"
                    >
                      <span>🎓 Student: Rahul Sharma</span>
                      {currentUser?.role === 'student' && <span className="text-[10px] text-blue-600 font-bold">Active</span>}
                    </button>
                    <button
                      onClick={() => handleRoleSwitch('parent')}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 transition flex items-center justify-between"
                    >
                      <span>👨‍👩‍👧 Parent: Anita Sharma</span>
                      {currentUser?.role === 'parent' && <span className="text-[10px] text-emerald-600 font-bold">Active</span>}
                    </button>
                    <button
                      onClick={() => handleRoleSwitch('admin')}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-purple-50 text-slate-700 hover:text-purple-700 transition flex items-center justify-between"
                    >
                      <span>🛡️ Admin: Dr. Vikram Rao</span>
                      {currentUser?.role === 'admin' && <span className="text-[10px] text-purple-600 font-bold">Active</span>}
                    </button>
                  </div>

                  <div className="pt-2 border-t border-slate-100 space-y-1">
                    <button
                      onClick={() => {
                        resetDemoData();
                        setProfileOpen(false);
                      }}
                      className="w-full text-left text-xs text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition flex items-center space-x-2"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                      <span>Reset Demo Data</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left text-xs text-rose-600 hover:text-rose-700 px-2.5 py-1.5 rounded-lg hover:bg-rose-50 transition flex items-center space-x-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
