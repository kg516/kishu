'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  GraduationCap,
  Users,
  Shield,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { UserRole } from '@/lib/types';

export default function LoginPage() {
  const router = useRouter();
  const { loginAs, setCurrentUser } = useAppStore();

  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('rahul@smartedu.edu');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'student') {
      setEmail('rahul@smartedu.edu');
    } else if (role === 'parent') {
      setEmail('anita@smartedu.edu');
    } else if (role === 'admin') {
      setEmail('admin@smartedu.edu');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      loginAs(selectedRole);
      setIsLoading(false);
      if (selectedRole === 'student') router.push('/student');
      else if (selectedRole === 'parent') router.push('/parent');
      else router.push('/admin');
    }, 400);
  };

  const handleOneClickDemo = (role: UserRole) => {
    loginAs(role);
    if (role === 'student') router.push('/student');
    else if (role === 'parent') router.push('/parent');
    else router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 flex flex-col justify-center items-center p-4 sm:p-6 select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200/80 relative z-10 animate-fadeIn">
        {/* Header */}
        <div className="p-8 pb-6 bg-gradient-to-b from-blue-50/80 to-white text-center border-b border-slate-100">
          <Link href="/" className="inline-flex items-center space-x-2.5 group mb-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Smart<span className="text-blue-600">Edu</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-slate-900">Welcome Back</h2>
          <p className="text-xs text-slate-500 mt-1">
            Select your account type or use 1-click hackathon demo credentials
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="p-6 pt-4 space-y-5">
          <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-semibold">
            <button
              type="button"
              onClick={() => handleRoleChange('student')}
              className={`py-2 px-3 rounded-xl transition flex flex-col items-center space-y-1 ${
                selectedRole === 'student'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange('parent')}
              className={`py-2 px-3 rounded-xl transition flex flex-col items-center space-y-1 ${
                selectedRole === 'parent'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Parent</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange('admin')}
              className={`py-2 px-3 rounded-xl transition flex flex-col items-center space-y-1 ${
                selectedRole === 'admin'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Admin</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition text-slate-900 font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-semibold text-slate-700">Password</label>
                <a href="#" className="text-[11px] text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition text-slate-900 font-medium"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Remember this device</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <span>{isLoading ? 'Authenticating...' : `Enter as ${selectedRole.toUpperCase()}`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Logins for Hackathon Judges */}
          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center">
              1-Click Fast Judge Login
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleOneClickDemo('student')}
                className="p-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl text-center text-xs font-bold text-blue-800 transition"
              >
                Rahul (Student)
              </button>
              <button
                type="button"
                onClick={() => handleOneClickDemo('parent')}
                className="p-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-center text-xs font-bold text-emerald-800 transition"
              >
                Anita (Parent)
              </button>
              <button
                type="button"
                onClick={() => handleOneClickDemo('admin')}
                className="p-2 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl text-center text-xs font-bold text-purple-800 transition"
              >
                Admin
              </button>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-500">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-bold text-blue-600 hover:underline">
            Register new account
          </Link>
        </div>
      </div>
    </div>
  );
}
