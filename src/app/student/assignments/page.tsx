'use client';

import React, { useState } from 'react';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Upload,
  Send,
  Code2,
  Award,
  Calendar,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { useAppStore } from '@/lib/store';
import { Assignment } from '@/lib/types';

export default function AssignmentsPage() {
  const { assignments, submitAssignment } = useAppStore();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment>(assignments[0]);
  const [submissionText, setSubmissionText] = useState(
    selectedAssignment?.starterCode || '# Write your solution here'
  );
  const [submittedFeedback, setSubmittedFeedback] = useState(false);

  const handleSelect = (a: Assignment) => {
    setSelectedAssignment(a);
    setSubmissionText(a.submittedContent || a.starterCode || '');
    setSubmittedFeedback(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitAssignment(selectedAssignment.id, submissionText);
    setSubmittedFeedback(true);
    setTimeout(() => setSubmittedFeedback(false), 3000);
  };

  const getStatusBadge = (status: Assignment['status']) => {
    switch (status) {
      case 'Graded':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Submitted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Overdue':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200';
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
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                Coursework & Submissions
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                Assignments & Projects
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Implement practical architectures, algorithmic challenges, and receive instructor feedback.
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 font-semibold block">Total Active Tasks</span>
              <span className="text-2xl font-black text-slate-900">{assignments.length} Projects</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Assignment List */}
            <div className="lg:col-span-4 space-y-3">
              {assignments.map((a) => (
                <div
                  key={a.id}
                  onClick={() => handleSelect(a)}
                  className={`p-4 rounded-2xl border transition cursor-pointer space-y-2 ${
                    selectedAssignment.id === a.id
                      ? 'bg-white border-blue-500 shadow-md ring-2 ring-blue-500/10'
                      : 'bg-white/80 border-slate-200 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(
                        a.status
                      )}`}
                    >
                      {a.status}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{a.deadline}</span>
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm">{a.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{a.description}</p>

                  {a.status === 'Graded' && (
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                      <span>Grade Received:</span>
                      <span>{a.grade} / {a.maxPoints} pts</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Assignment Workspace & Submission Box */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-blue-600">
                    Max Points: {selectedAssignment.maxPoints} pts
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                    {selectedAssignment.title}
                  </h2>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">Deadline: <strong>{selectedAssignment.deadline}</strong></span>
                </div>
              </div>

              {/* Instructions */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
                <span className="font-bold text-slate-800 uppercase tracking-wider block">
                  Instructions & Specifications:
                </span>
                <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                  {selectedAssignment.instructions}
                </p>
              </div>

              {/* Graded Feedback if available */}
              {selectedAssignment.status === 'Graded' && selectedAssignment.feedback && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1.5 text-xs text-emerald-900">
                  <div className="flex items-center space-x-2 font-bold">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>Faculty Evaluation & Feedback (Score: {selectedAssignment.grade}/100)</span>
                  </div>
                  <p className="italic">{selectedAssignment.feedback}</p>
                </div>
              )}

              {/* Submission Area */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 flex items-center space-x-1.5">
                    <Code2 className="w-4 h-4 text-blue-600" />
                    <span>Solution Code / Written Submission</span>
                  </span>
                  {selectedAssignment.submittedAt && (
                    <span className="text-[11px] text-slate-400">
                      Last submitted: {selectedAssignment.submittedAt}
                    </span>
                  )}
                </div>

                <textarea
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  rows={8}
                  disabled={selectedAssignment.status === 'Graded'}
                  className="w-full font-mono text-xs p-4 bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition resize-y dark-scroll"
                  placeholder="Paste or write your implementation here..."
                />

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-500">
                    {submittedFeedback ? (
                      <span className="text-emerald-600 font-bold flex items-center space-x-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Submission received successfully!</span>
                      </span>
                    ) : (
                      <span>Format: UTF-8 plain text / code block</span>
                    )}
                  </span>

                  <button
                    type="submit"
                    disabled={selectedAssignment.status === 'Graded'}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center space-x-2 disabled:opacity-40"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{selectedAssignment.status === 'Submitted' ? 'Resubmit Solution' : 'Submit Assignment'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
