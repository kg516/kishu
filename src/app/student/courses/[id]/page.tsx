'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  FileQuestion,
  FileText,
  Award,
  Play,
  Sparkles,
  ArrowLeft,
  Flame,
  Check,
  RotateCcw,
  Video,
  ArrowRight,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { CodeEditor } from '@/components/code/CodeEditor';
import { useAppStore } from '@/lib/store';
import { DEMO_COURSES, DEMO_LESSONS } from '@/lib/mockData';

export default function CourseLearningPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = (params?.id as string) || 'course-python';

  const { courses, completeLesson, lessons: storeLessons, currentStreak, certificates } = useAppStore();

  const course = courses.find((c) => c.id === courseId) || DEMO_COURSES[0];
  const courseLessons = storeLessons[courseId] || DEMO_LESSONS[courseId] || DEMO_LESSONS['course-python'];
  const courseCert = certificates.find((c) => c.courseId === courseId);

  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'content' | 'practice' | 'quiz'>('content');
  const [completedAnimation, setCompletedAnimation] = useState(false);

  const currentLesson = courseLessons[activeLessonIndex] || courseLessons[0];

  const handleCompleteCurrentLesson = () => {
    if (currentLesson) {
      completeLesson(courseId, currentLesson.id);
      setCompletedAnimation(true);
      setTimeout(() => setCompletedAnimation(false), 2000);
    }
  };

  const handleNextLesson = () => {
    if (activeLessonIndex < courseLessons.length - 1) {
      setActiveLessonIndex(activeLessonIndex + 1);
    }
  };

  const handlePrevLesson = () => {
    if (activeLessonIndex > 0) {
      setActiveLessonIndex(activeLessonIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <Navbar />

      {/* Course Sub-Header */}
      <div className="bg-slate-900 text-white px-4 sm:px-6 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link
            href="/student/courses"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            title="Back to Catalog"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-[10px] uppercase tracking-wider font-bold text-blue-400">
              {course.category} Track
            </span>
            <h2 className="text-sm sm:text-base font-bold text-white truncate max-w-md">
              {course.title}
            </h2>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="hidden sm:flex items-center space-x-2">
            <span className="text-slate-400">Course Progress:</span>
            <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${course.progress || 0}%` }}
              />
            </div>
            <span className="font-bold text-blue-400">{course.progress || 0}%</span>
          </div>

          <div className="flex items-center space-x-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-xl font-bold">
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>{currentStreak}d Streak</span>
          </div>
        </div>
      </div>

      {/* Main Learning Workspace Container */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 gap-6">
        {/* LEFT: Course Navigation & Curriculum Outline */}
        <aside className="w-full lg:w-72 bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col space-y-4 flex-shrink-0">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Curriculum Lessons
            </span>
            <h3 className="font-bold text-slate-900 text-sm">{course.lessonsCount} Interactive Modules</h3>
          </div>

          <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
            {courseLessons.map((lesson, idx) => {
              const isCurrent = idx === activeLessonIndex;
              return (
                <button
                  key={lesson.id}
                  onClick={() => setActiveLessonIndex(idx)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs transition flex items-start justify-between space-x-2 ${
                    isCurrent
                      ? 'bg-blue-50 text-blue-900 border border-blue-200 font-bold shadow-2xs'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-start space-x-2 truncate">
                    <span className="font-mono text-slate-400 flex-shrink-0">{idx + 1}.</span>
                    <span className="truncate">{lesson.title}</span>
                  </div>
                  {lesson.isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <span className="text-[10px] text-slate-400 font-mono flex-shrink-0">{lesson.readTime}</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Supplemental Section Links */}
          <div className="pt-3 border-t border-slate-100 space-y-1 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Assessments & Quizzes
            </span>
            <Link
              href="/student/quizzes"
              className="flex items-center space-x-2 p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
            >
              <FileQuestion className="w-4 h-4 text-purple-600" />
              <span>Module Quiz (5 MCQs)</span>
            </Link>
            <Link
              href="/student/assignments"
              className="flex items-center space-x-2 p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
            >
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>Course Assignment</span>
            </Link>
            <Link
              href="/student/certificates"
              className="flex items-center space-x-2 p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
            >
              <Award className="w-4 h-4 text-amber-600" />
              <span>Course Certificates Hub</span>
            </Link>
          </div>

          {/* Individual Certificate Status Card for this Language */}
          <div className="p-3.5 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl border border-slate-800 space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-1">
                <Sparkles className="w-3 h-3" />
                <span>Language Certificate</span>
              </span>
              <span
                className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                  courseCert?.isUnlocked
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}
              >
                {courseCert?.isUnlocked ? 'Earned 🎉' : 'Locked 🔒'}
              </span>
            </div>

            {courseCert?.isUnlocked ? (
              <div className="space-y-1 text-[11px] text-slate-300">
                <p className="text-emerald-400 font-semibold">Official Certificate Unlocked!</p>
                <p className="text-[10px] text-slate-400">ID: {courseCert.certificateNumber}</p>
                <Link
                  href="/student/certificates"
                  className="mt-1 inline-flex items-center space-x-1 text-amber-400 hover:text-amber-300 font-bold"
                >
                  <span>View &amp; Print</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ) : (
              <div className="space-y-1.5 text-[11px] text-slate-300">
                <div className="flex justify-between text-[10px]">
                  <span>Modules Finished:</span>
                  <strong className="text-white">
                    {courseLessons.filter((l) => l.isCompleted).length} / {courseLessons.length}
                  </strong>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span>Proctored Exam:</span>
                  <strong className={courseCert?.quizPassed ? 'text-emerald-400' : 'text-amber-400'}>
                    {courseCert?.quizPassed ? 'Passed' : 'Required (&ge; 75%)'}
                  </strong>
                </div>
                <Link
                  href="/student/quizzes"
                  className="mt-2 w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-center flex items-center justify-center space-x-1"
                >
                  <Video className="w-3 h-3" />
                  <span>Start Proctored Exam</span>
                </Link>
              </div>
            )}
          </div>
        </aside>

        {/* CENTER & RIGHT: Split Learning Canvas */}
        <div className="flex-1 flex flex-col xl:flex-row gap-6">
          {/* Explanation Panel (Left of Workspace) */}
          <div className="w-full xl:w-1/2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-xs font-semibold text-blue-600">
                    Lesson {activeLessonIndex + 1} of {courseLessons.length} &bull; {currentLesson.readTime}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                    {currentLesson.title}
                  </h3>
                </div>

                {/* Mark as Complete Button */}
                <button
                  onClick={handleCompleteCurrentLesson}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                    currentLesson.isCompleted
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{currentLesson.isCompleted ? 'Completed' : 'Mark as Complete'}</span>
                </button>
              </div>

              {/* Lesson Summary Callout */}
              <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-100 text-xs text-blue-900 leading-relaxed">
                <strong>Key Takeaway:</strong> {currentLesson.summary}
              </div>

              {/* Lesson Markdown Content */}
              <div className="prose prose-slate prose-sm max-w-none text-slate-700 space-y-3 leading-relaxed text-xs sm:text-sm">
                <div className="whitespace-pre-wrap">{currentLesson.content}</div>
              </div>

              {/* Key Concept Points */}
              <div className="space-y-2 pt-2">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Important Architectural Concepts
                </h4>
                <div className="space-y-1.5">
                  {currentLesson.keyPoints.map((point, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practice Challenge Prompt */}
              {currentLesson.practiceQuestion && (
                <div className="p-4 bg-purple-50/70 border border-purple-100 rounded-xl space-y-2 text-xs">
                  <div className="font-bold text-purple-900 flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    <span>Hands-On Challenge</span>
                  </div>
                  <p className="text-purple-800">{currentLesson.practiceQuestion.question}</p>
                  <p className="text-[11px] text-purple-600 italic">💡 Hint: {currentLesson.practiceQuestion.hint}</p>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={handlePrevLesson}
                disabled={activeLessonIndex === 0}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition flex items-center space-x-1 disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Lesson</span>
              </button>

              <button
                onClick={handleNextLesson}
                disabled={activeLessonIndex === courseLessons.length - 1}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition flex items-center space-x-1 disabled:opacity-40"
              >
                <span>Next Lesson</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Integrated Code Editor & Terminal (Right of Workspace) */}
          <div className="w-full xl:w-1/2 flex flex-col">
            <CodeEditor
              initialLanguage={currentLesson.language || 'python'}
              initialCode={currentLesson.codeSnippet}
              title={`${currentLesson.title} — Live Lab`}
              onCodeExecuted={handleCompleteCurrentLesson}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
