'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CheckSquare,
  Clock,
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  AlertCircle,
  ShieldAlert,
  ShieldCheck,
  Video,
  Eye,
  Lock,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { WebcamProctorHUD } from '@/components/quiz/WebcamProctorHUD';
import { useAppStore } from '@/lib/store';
import { Quiz, QuizQuestion } from '@/lib/types';

export default function QuizzesPage() {
  const { quizzes, submitQuizAttempt, currentStreak, certificates } = useAppStore();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz>(quizzes[0]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes default
  const [scoreResult, setScoreResult] = useState<{ score: number; total: number; percentage: number } | null>(null);

  // Anti-Cheating State
  const [violationsCount, setViolationsCount] = useState(0);
  const [violationAlertModal, setViolationAlertModal] = useState<string | null>(null);
  const [isDisqualified, setIsDisqualified] = useState(false);
  const [actionBlockedToast, setActionBlockedToast] = useState<string | null>(null);

  // Reset exam on quiz switch
  useEffect(() => {
    setUserAnswers(new Array(selectedQuiz.questions.length).fill(-1));
    setCurrentQuestionIdx(0);
    setIsSubmitted(false);
    setScoreResult(null);
    setViolationsCount(0);
    setIsDisqualified(false);
    setViolationAlertModal(null);
    setTimeLeft(selectedQuiz.durationMinutes * 60);
  }, [selectedQuiz]);

  // Strict Countdown timer
  useEffect(() => {
    if (isSubmitted || isDisqualified || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft, isSubmitted, isDisqualified]);

  // Anti-Cheating Event Listeners (Tab switch, window blur, copy/paste lockout)
  useEffect(() => {
    if (isSubmitted || isDisqualified) return;

    // 1. Detect Tab Switch (visibilitychange)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setViolationsCount((prev) => {
          const next = prev + 1;
          if (next >= (selectedQuiz.maxViolations || 3)) {
            setIsDisqualified(true);
            setViolationAlertModal('🚨 Disqualified: Excessive Tab Switches Detected (3/3 Strikes).');
            handleDisqualify();
          } else {
            setViolationAlertModal(
              `⚠️ Anti-Cheating Violation (${next}/3 Strikes): Tab switch detected! Navigating away from the proctored assessment is strictly monitored.`
            );
          }
          return next;
        });
      }
    };

    // 2. Detect Window Focus Loss (blur)
    const handleWindowBlur = () => {
      if (!isSubmitted && !isDisqualified) {
        setViolationsCount((prev) => {
          const next = prev + 1;
          if (next >= (selectedQuiz.maxViolations || 3)) {
            setIsDisqualified(true);
            setViolationAlertModal('🚨 Disqualified: Window Focus Lost (3/3 Strikes).');
            handleDisqualify();
          } else {
            setViolationAlertModal(
              `⚠️ Anti-Cheating Violation (${next}/3 Strikes): Window focus lost! Clicking outside the examination viewport is strictly logged.`
            );
          }
          return next;
        });
      }
    };

    // 3. Block Copy & Cut
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      triggerBlockedToast('🚫 Action Blocked: Copying question text is prohibited.');
    };

    // 4. Block Paste
    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      triggerBlockedToast('🚫 Action Blocked: Pasting into proctored fields is prohibited.');
    };

    // 5. Block Context Menu (Right-Click)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      triggerBlockedToast('🚫 Action Blocked: Right-click inspection is disabled.');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCopy);
    document.addEventListener('paste', handlePaste);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCopy);
      document.removeEventListener('paste', handlePaste);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [isSubmitted, isDisqualified, selectedQuiz]);

  const triggerBlockedToast = (msg: string) => {
    setActionBlockedToast(msg);
    setTimeout(() => setActionBlockedToast(null), 2500);
  };

  const handleDisqualify = () => {
    setIsDisqualified(true);
    setIsSubmitted(true);
    submitQuizAttempt(selectedQuiz.id, userAnswers, 0, selectedQuiz.questions.length, 3, true);
    setScoreResult({ score: 0, total: selectedQuiz.questions.length, percentage: 0 });
  };

  const currentQ = selectedQuiz.questions[currentQuestionIdx];

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted || isDisqualified) return;
    const updated = [...userAnswers];
    updated[currentQuestionIdx] = optIdx;
    setUserAnswers(updated);
  };

  const handleSubmitQuiz = () => {
    if (isDisqualified) return;

    let score = 0;
    selectedQuiz.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        score += 1;
      }
    });

    const total = selectedQuiz.questions.length;
    const percentage = Math.round((score / total) * 100);

    submitQuizAttempt(selectedQuiz.id, userAnswers, score, total, violationsCount, false);
    setScoreResult({ score, total, percentage });
    setIsSubmitted(true);
  };

  const handleRetake = () => {
    setUserAnswers(new Array(selectedQuiz.questions.length).fill(-1));
    setCurrentQuestionIdx(0);
    setIsSubmitted(false);
    setIsDisqualified(false);
    setViolationsCount(0);
    setScoreResult(null);
    setViolationAlertModal(null);
    setTimeLeft(selectedQuiz.durationMinutes * 60);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentCourseCert = certificates.find((c) => c.courseId === selectedQuiz.courseId);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col select-none">
      <Navbar onToggleMobileSidebar={() => setMobileSidebarOpen(true)} />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto relative">
          {/* Live Webcam Proctor HUD (Floating) */}
          {!isSubmitted && (
            <WebcamProctorHUD
              violationsCount={violationsCount}
              maxViolations={selectedQuiz.maxViolations || 3}
              isDisqualified={isDisqualified}
            />
          )}

          {/* Action Blocked Toast */}
          {actionBlockedToast && (
            <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-rose-600 text-white font-bold px-4 py-2.5 rounded-2xl shadow-xl flex items-center space-x-2 text-xs animate-bounce">
              <ShieldAlert className="w-4 h-4" />
              <span>{actionBlockedToast}</span>
            </div>
          )}

          {/* Header */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span>AI Webcam Proctored Examination</span>
                </span>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                  Passing Score: 75%
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Strict Course Certification Assessment
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                Webcam facial presence is verified in real time. Tab switches, copy-pasting, and window focus loss are strictly monitored to ensure genuine academic integrity.
              </p>
            </div>

            {/* Quiz Picker Tabs */}
            <div className="flex flex-wrap gap-2">
              {quizzes.map((q) => (
                <button
                  key={q.id}
                  onClick={() => setSelectedQuiz(q)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    selectedQuiz.id === q.id
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {q.title.split(' ')[0]} Track
                </button>
              ))}
            </div>
          </div>

          {/* Anti-Cheating Status Bar */}
          <div className="bg-slate-900 text-slate-200 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
                <Video className="w-4 h-4" />
                <span>Webcam Stream: Active</span>
              </span>
              <span className="flex items-center space-x-1.5 text-blue-400 font-semibold">
                <Eye className="w-4 h-4" />
                <span>Face Gaze: Monitored</span>
              </span>
              <span className="flex items-center space-x-1.5 text-purple-400 font-semibold">
                <Lock className="w-4 h-4" />
                <span>Clipboard: Locked</span>
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-slate-400">Strict Anti-Cheat Rule:</span>
              <span className="text-amber-400 font-bold">3 Tab Switches = Disqualification</span>
            </div>
          </div>

          {/* Quiz Active Frame */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Top Status Bar: Question Progress & Timer */}
            <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400">
                  Question {currentQuestionIdx + 1} of {selectedQuiz.questions.length}
                </span>
                <h3 className="font-bold text-sm sm:text-base text-white truncate max-w-md">
                  {selectedQuiz.title}
                </h3>
              </div>

              <div className="flex items-center space-x-3">
                <div
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold ${
                    timeLeft < 60 ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-800 text-emerald-400'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatTimer(timeLeft)}</span>
                </div>
              </div>
            </div>

            {/* Results Screen */}
            {isSubmitted && scoreResult ? (
              <div className="p-8 text-center space-y-6 max-w-xl mx-auto">
                {isDisqualified ? (
                  <div className="w-20 h-20 rounded-full bg-rose-50 border-2 border-rose-300 text-rose-600 flex items-center justify-center mx-auto">
                    <ShieldAlert className="w-10 h-10 animate-bounce" />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                    <Award className="w-10 h-10" />
                  </div>
                )}

                <div>
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${
                      isDisqualified ? 'text-rose-700' : 'text-emerald-700'
                    }`}
                  >
                    {isDisqualified ? 'Attempt Terminated for Violations' : 'Evaluation Complete'}
                  </span>
                  <h2 className="text-3xl font-extrabold text-slate-900 mt-1">
                    Quiz Score: {scoreResult.score} / {scoreResult.total}
                  </h2>
                  <p className="text-sm font-semibold text-slate-500 mt-1">
                    Accuracy: {scoreResult.percentage}% &bull; Passing Mark: {selectedQuiz.passingScore}%
                  </p>
                </div>

                {/* Certificate Status Banner */}
                {scoreResult.percentage >= selectedQuiz.passingScore && !isDisqualified ? (
                  <div className="p-5 bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-transparent border-2 border-amber-300 rounded-2xl text-left space-y-2">
                    <div className="flex items-center space-x-2 text-amber-800 font-bold">
                      <Sparkles className="w-5 h-5 text-amber-600 animate-spin" />
                      <span>Official Certificate Requirement Satisfied! 🎉</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      You passed the strict proctored assessment with {scoreResult.percentage}%.
                      {currentCourseCert?.isUnlocked
                        ? ' Your official course certificate is now unlocked and available for download!'
                        : ' Complete any remaining lessons in this course to generate your official accredited certificate.'}
                    </p>
                    <div className="pt-1">
                      <Link
                        href="/student/certificates"
                        className="inline-flex items-center space-x-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs shadow-sm transition"
                      >
                        <span>View Certificates Hub</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-left text-xs text-amber-900 space-y-1">
                    <div className="font-bold flex items-center space-x-1.5">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span>Certificate Remains Locked</span>
                    </div>
                    <p>
                      A minimum score of <strong>75%</strong> under strict proctored conditions is required to earn the accredited certificate. Review lessons and retake.
                    </p>
                  </div>
                )}

                {/* Score Breakdown Pills */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                    <span className="text-xs text-emerald-700 block">Correct</span>
                    <span className="text-lg font-bold text-emerald-800">{scoreResult.score}</span>
                  </div>
                  <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl">
                    <span className="text-xs text-rose-700 block">Incorrect</span>
                    <span className="text-lg font-bold text-rose-800">
                      {scoreResult.total - scoreResult.score}
                    </span>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl">
                    <span className="text-xs text-blue-700 block">Pass Threshold</span>
                    <span className="text-lg font-bold text-blue-800">{selectedQuiz.passingScore}%</span>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-center space-x-3">
                  <button
                    onClick={handleRetake}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition flex items-center space-x-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Proctored Assessment</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Question View */
              <div className="p-6 sm:p-8 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Question {currentQuestionIdx + 1}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    {currentQ.question}
                  </h3>
                </div>

                {/* Multiple Choice Options */}
                <div className="space-y-2.5">
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = userAnswers[currentQuestionIdx] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full text-left p-4 rounded-2xl border transition flex items-center justify-between text-xs sm:text-sm font-medium ${
                          isSelected
                            ? 'bg-purple-50 border-purple-400 text-purple-900 shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              isSelected ? 'bg-purple-600 text-white' : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-purple-600" />}
                      </button>
                    );
                  })}
                </div>

                {/* Pagination & Submit */}
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setCurrentQuestionIdx((prev) => Math.max(0, prev - 1))}
                    disabled={currentQuestionIdx === 0}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition flex items-center space-x-1 disabled:opacity-40"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    {currentQuestionIdx === selectedQuiz.questions.length - 1 ? (
                      <button
                        onClick={handleSubmitQuiz}
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center space-x-1.5"
                      >
                        <CheckSquare className="w-4 h-4" />
                        <span>Submit Proctored Exam</span>
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          setCurrentQuestionIdx((prev) =>
                            Math.min(selectedQuiz.questions.length - 1, prev + 1)
                          )
                        }
                        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition flex items-center space-x-1"
                      >
                        <span>Next</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Violation Warning Modal */}
      {violationAlertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border-2 border-rose-500 space-y-4 text-center">
            <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
                Anti-Cheating Security Alert
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">Integrity Violation Detected</h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{violationAlertModal}</p>

            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 font-bold">
              Current Strike Count: {violationsCount} / {selectedQuiz.maxViolations || 3}
            </div>

            <button
              onClick={() => setViolationAlertModal(null)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition"
            >
              I Understand &amp; Return to Exam
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
