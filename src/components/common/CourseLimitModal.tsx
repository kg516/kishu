'use client';

import React from 'react';
import { AlertTriangle, X, ArrowRight, BookOpen } from 'lucide-react';
import { Course } from '@/lib/types';
import Link from 'next/link';

interface CourseLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  enrolledCourses: Course[];
  onUnenroll?: (courseId: string) => void;
}

export const CourseLimitModal: React.FC<CourseLimitModalProps> = ({
  isOpen,
  onClose,
  enrolledCourses,
  onUnenroll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header with warning accent */}
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-6 border-b border-amber-100 flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-amber-100 rounded-xl text-amber-600 shadow-sm">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                Course Limit Reached
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                You have reached your 4-course limit
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          <p className="text-slate-600 text-sm leading-relaxed">
            SmartEdu enforces a <strong className="text-slate-900 font-semibold">4-course active capacity</strong> to ensure depth of mastery, continuous streak momentum, and cognitive balance.
          </p>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Your 4 Enrolled Courses (4 / 4 Active)
              </span>
            </div>
            <div className="space-y-2">
              {enrolledCourses.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200 text-sm"
                >
                  <div className="flex items-center space-x-2.5 overflow-hidden">
                    <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
                    <span className="font-medium text-slate-800 truncate">{c.title}</span>
                  </div>
                  <div className="flex items-center space-x-3 flex-shrink-0">
                    <span className="text-xs text-blue-600 font-semibold">{c.progress || 0}%</span>
                    {onUnenroll && (
                      <button
                        onClick={() => onUnenroll(c.id)}
                        className="text-xs text-rose-600 hover:text-rose-700 hover:underline"
                        title="Unenroll to free a slot"
                      >
                        Drop
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 bg-blue-50/80 rounded-xl border border-blue-100 text-xs text-blue-800 flex items-start space-x-2.5">
            <BookOpen className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <p>
              Complete any one of your existing courses or drop an elective to enroll in new specialized tracks!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition"
          >
            Close
          </button>
          <Link
            href="/student"
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm hover:shadow transition flex items-center space-x-1.5"
          >
            <span>Go to My Courses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
