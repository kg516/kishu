'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GraduationCap, Users, Shield, Lock, Mail, User as UserIcon, ArrowRight } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { UserRole, User } from '@/lib/types';

export default function RegisterPage() {
  const router = useRouter();
  const { setCurrentUser } = useAppStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: name.trim() || 'New Learner',
        email: email.trim() || 'learner@smartedu.edu',
        role,
      };
      setCurrentUser(newUser);
      setIsLoading(false);

      if (role === 'student') router.push('/student');
      else if (role === 'parent') router.push('/parent');
      else router.push('/admin');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 flex flex-col justify-center items-center p-4 sm:p-6 select-none">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200/80 animate-fadeIn">
        <div className="p-8 pb-6 bg-gradient-to-b from-blue-50/80 to-white text-center border-b border-slate-100">
          <Link href="/" className="inline-flex items-center space-x-2.5 group mb-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Smart<span className="text-blue-600">Edu</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-slate-900">Create New Account</h2>
          <p className="text-xs text-slate-500 mt-1">Join the intelligent digital education network</p>
        </div>

        <div className="p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Select Role</label>
              <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`py-2 px-3 rounded-xl transition flex flex-col items-center space-y-1 ${
                    role === 'student' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Student</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('parent')}
                  className={`py-2 px-3 rounded-xl transition flex flex-col items-center space-y-1 ${
                    role === 'parent' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Parent</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`py-2 px-3 rounded-xl transition flex flex-col items-center space-y-1 ${
                    role === 'admin' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  <span>Admin</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="you@smartedu.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition text-slate-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center space-x-2"
            >
              <span>{isLoading ? 'Creating Profile...' : 'Complete Registration'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-500">
          Already registered?{' '}
          <Link href="/login" className="font-bold text-blue-600 hover:underline">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
}
