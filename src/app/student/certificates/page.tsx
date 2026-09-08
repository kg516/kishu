'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Award,
  Download,
  Printer,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Lock,
  BookOpen,
  CheckSquare,
  Sparkles,
  AlertCircle,
  Video,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { CertificateModal } from '@/components/common/CertificateModal';
import { useAppStore } from '@/lib/store';
import { Certificate } from '@/lib/types';

export default function CertificatesPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { certificates, currentUser } = useAppStore();
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  const unlockedCount = certificates.filter((c) => c.isUnlocked).length;
  const lockedCount = certificates.filter((c) => !c.isUnlocked).length;

  const filteredCerts = certificates.filter((c) => {
    if (filter === 'unlocked') return c.isUnlocked;
    if (filter === 'locked') return !c.isUnlocked;
    return true;
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
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  Accreditation &amp; Credentialing System
                </span>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                  1 Certificate Per Programming Language
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Language Certification Registry
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                Every programming language has its own independent certificate. A certificate unlocks <strong>only</strong> when you complete 100% of all lessons in that track <strong>AND</strong> pass the strict webcam-proctored examination with &ge; 75%.
              </p>
            </div>

            {/* Stats Overview */}
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
                <span className="text-[10px] uppercase font-bold text-emerald-700 block">Earned</span>
                <span className="text-xl font-black text-emerald-900">{unlockedCount}</span>
              </div>
              <div className="p-3 bg-slate-100 border border-slate-200 rounded-2xl text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">In Progress</span>
                <span className="text-xl font-black text-slate-700">{lockedCount}</span>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center space-x-2 text-xs font-semibold">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl transition ${
                filter === 'all' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              All Languages ({certificates.length})
            </button>
            <button
              onClick={() => setFilter('unlocked')}
              className={`px-4 py-2 rounded-xl transition ${
                filter === 'unlocked' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              Earned &amp; Unlocked ({unlockedCount})
            </button>
            <button
              onClick={() => setFilter('locked')}
              className={`px-4 py-2 rounded-xl transition ${
                filter === 'locked' ? 'bg-purple-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              Locked ({lockedCount})
            </button>
          </div>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCerts.map((cert) => {
              const allLessonsDone = cert.lessonsCompleted >= cert.totalLessons;
              const quizDone = cert.quizPassed;

              return (
                <div
                  key={cert.id}
                  className={`rounded-3xl border transition flex flex-col justify-between overflow-hidden ${
                    cert.isUnlocked
                      ? 'bg-white border-amber-300 shadow-md ring-2 ring-amber-500/10 card-hover'
                      : 'bg-white/90 border-slate-200 shadow-xs'
                  }`}
                >
                  {/* Card Header */}
                  <div
                    className={`p-6 border-b flex items-start justify-between ${
                      cert.isUnlocked
                        ? 'bg-gradient-to-r from-amber-500/10 via-amber-100/30 to-white border-amber-200'
                        : 'bg-slate-50 border-slate-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-3 rounded-2xl flex items-center justify-center shadow-xs ${
                          cert.isUnlocked
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        {cert.isUnlocked ? (
                          <Award className="w-8 h-8 text-amber-600" />
                        ) : (
                          <Lock className="w-8 h-8 text-slate-500" />
                        )}
                      </div>
                      <div>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            cert.isUnlocked
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {cert.isUnlocked ? 'Verified Credential Unlocked' : 'Certification Locked'}
                        </span>
                        <h3 className="font-bold text-slate-900 text-base mt-1">{cert.courseName}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4 text-xs">
                    {cert.isUnlocked ? (
                      /* Unlocked Details */
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-slate-600">
                          <span>Recipient:</span>
                          <strong className="text-slate-900 text-sm">{cert.studentName}</strong>
                        </div>
                        <div className="grid grid-cols-2 gap-2 p-3 bg-amber-50/60 rounded-xl border border-amber-100">
                          <div>
                            <span className="text-[10px] text-slate-400 block">Date Issued:</span>
                            <span className="font-semibold text-slate-800">{cert.issuedAt}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block">Distinction Grade:</span>
                            <span className="font-bold text-emerald-700">{cert.grade}</span>
                          </div>
                        </div>
                        <div className="text-[11px] font-mono text-slate-400">
                          Credential ID: <strong className="text-slate-700">{cert.certificateNumber}</strong>
                        </div>
                      </div>
                    ) : (
                      /* Locked Progress & Checklist */
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-slate-600">
                            <span>Completion Gate Requirements:</span>
                            <span className="font-bold text-purple-600">
                              {allLessonsDone && quizDone ? '100%' : allLessonsDone || quizDone ? '50%' : '0%'}
                            </span>
                          </div>
                          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-purple-600 rounded-full transition-all duration-500"
                              style={{
                                width: allLessonsDone && quizDone ? '100%' : allLessonsDone || quizDone ? '50%' : '15%',
                              }}
                            />
                          </div>
                        </div>

                        {/* Interactive Requirements Checklist */}
                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                          {/* 1. All Lessons Complete */}
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-2">
                              {allLessonsDone ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                              ) : (
                                <div className="w-4 h-4 rounded-full border-2 border-slate-300 flex-shrink-0" />
                              )}
                              <span className={allLessonsDone ? 'text-slate-900 font-semibold' : 'text-slate-600'}>
                                Complete all lessons ({cert.lessonsCompleted} / {cert.totalLessons})
                              </span>
                            </div>
                            {!allLessonsDone && (
                              <Link
                                href={`/student/courses/${cert.courseId}`}
                                className="text-[11px] font-bold text-blue-600 hover:underline"
                              >
                                Resume
                              </Link>
                            )}
                          </div>

                          {/* 2. Strict Proctored Quiz */}
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-2">
                              {quizDone ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                              ) : (
                                <div className="w-4 h-4 rounded-full border-2 border-slate-300 flex-shrink-0" />
                              )}
                              <span className={quizDone ? 'text-slate-900 font-semibold' : 'text-slate-600'}>
                                Pass Proctored Exam (&ge; 75%)
                              </span>
                            </div>
                            {!quizDone && (
                              <Link
                                href="/student/quizzes"
                                className="text-[11px] font-bold text-purple-600 hover:underline flex items-center space-x-1"
                              >
                                <Video className="w-3 h-3" />
                                <span>Take Exam</span>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer Action */}
                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    {cert.isUnlocked ? (
                      <>
                        <span className="text-[11px] text-emerald-700 font-semibold flex items-center space-x-1">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          <span>Officially Authenticated</span>
                        </span>

                        <button
                          onClick={() => setSelectedCert(cert)}
                          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition flex items-center space-x-1.5"
                        >
                          <span>View &amp; Print</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="text-[11px] text-slate-500 flex items-center space-x-1">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                          <span>Satisfy both steps to unlock</span>
                        </span>

                        <Link
                          href={`/student/courses/${cert.courseId}`}
                          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition flex items-center space-x-1"
                        >
                          <span>Go to Track</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {/* Official Certificate Modal */}
      {selectedCert && (
        <CertificateModal
          isOpen={!!selectedCert}
          onClose={() => setSelectedCert(null)}
          certificate={selectedCert}
        />
      )}
    </div>
  );
}
