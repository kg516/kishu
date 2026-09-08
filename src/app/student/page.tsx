'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Flame,
  BookOpen,
  Clock,
  Award,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Code2,
  Sparkles,
  AlertCircle,
  FileText,
  Play,
  Lightbulb,
  Target,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { StreakHeatmap } from '@/components/charts/StreakHeatmap';
import { SubjectPerformanceChart } from '@/components/charts/SubjectPerformanceChart';
import { OverallAcademicChart } from '@/components/charts/OverallAcademicChart';
import { CourseLimitModal } from '@/components/common/CourseLimitModal';
import { useAppStore } from '@/lib/store';

export default function StudentDashboard() {
  const {
    currentUser,
    courses,
    enrolledCourses,
    unenrollCourse,
    courseLimitModalOpen,
    setCourseLimitModalOpen,
    currentStreak,
    longestStreak,
    totalActiveDays,
    learningHours,
    streakDays,
    achievements,
    assignments,
    analytics,
  } = useAppStore();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Student metrics
  const activeCount = enrolledCourses.length;
  const avgCompletion =
    activeCount > 0
      ? Math.round(enrolledCourses.reduce((acc, c) => acc + (c.progress || 0), 0) / activeCount)
      : 0;

  const pendingAssignmentsCount = assignments.filter((a) => a.status === 'Pending').length;
  const unlockedAchievementsCount = achievements.filter((a) => a.isUnlocked).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar onToggleMobileSidebar={() => setMobileSidebarOpen(true)} />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3 py-1 rounded-full text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>Personalized Learning Journey Active</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Good morning, {currentUser?.name || 'Rahul Sharma'} 👋
                </h1>
                <p className="text-sm text-indigo-200 max-w-xl leading-relaxed">
                  You are making steady progress! Today&apos;s goal: Complete 1 Python functions lesson and 1 practice exercise to maintain your 12-day streak.
                </p>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/student/courses/course-python"
                  className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center space-x-2"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Resume Python</span>
                </Link>
                <Link
                  href="/student/practice"
                  className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition flex items-center space-x-2"
                >
                  <Code2 className="w-4 h-4" />
                  <span>Code Playground</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* 1. Daily Learning Streak */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs card-hover flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500">Learning Streak</span>
                <div className="text-2xl font-black text-slate-900 flex items-center space-x-1.5">
                  <span>{currentStreak}</span>
                  <span className="text-xs font-bold text-orange-600">Days</span>
                </div>
                <span className="text-[11px] text-emerald-600 font-medium">🔥 Top 5% Consistent</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center">
                <Flame className="w-6 h-6 fill-current" />
              </div>
            </div>

            {/* 2. Course Slots Capacity (4 Limit) */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs card-hover flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500">Enrolled Courses</span>
                <div className="text-2xl font-black text-slate-900 flex items-center space-x-1.5">
                  <span>{activeCount}</span>
                  <span className="text-xs font-bold text-slate-400">/ 4 Max</span>
                </div>
                <span className="text-[11px] text-blue-600 font-medium">{avgCompletion}% Avg Completion</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
            </div>

            {/* 3. Learning Hours */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs card-hover flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500">Total Learning</span>
                <div className="text-2xl font-black text-slate-900 flex items-center space-x-1.5">
                  <span>{learningHours}</span>
                  <span className="text-xs font-bold text-slate-400">Hours</span>
                </div>
                <span className="text-[11px] text-indigo-600 font-medium">+2.4 hrs this week</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
            </div>

            {/* 4. Achievements / Assignments */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs card-hover flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500">Pending Tasks</span>
                <div className="text-2xl font-black text-slate-900 flex items-center space-x-1.5">
                  <span>{pendingAssignmentsCount}</span>
                  <span className="text-xs font-bold text-amber-600">Due Soon</span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium">{unlockedAchievementsCount} Badges Unlocked</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* GitHub-style Streak Activity Heatmap */}
          <StreakHeatmap
            streakDays={streakDays}
            currentStreak={currentStreak}
            longestStreak={longestStreak}
            totalActiveDays={totalActiveDays}
          />

          {/* Smart Personalized Recommendation Engine */}
          <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 rounded-2xl p-6 border border-indigo-100 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Recommended For You</h3>
                <p className="text-xs text-slate-500">
                  AI-driven personalized suggestions based on recent quiz scores and coding accuracy
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-xl border border-indigo-100/80 shadow-2xs space-y-2">
                <div className="text-xs font-bold text-indigo-600 flex items-center space-x-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Momentum Opportunity</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Your Python quiz score improved to <strong>88%</strong>! Try the next <strong>Functions & Scope</strong> lesson to lock in mastery.
                </p>
                <Link
                  href="/student/courses/course-python"
                  className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 hover:underline pt-1"
                >
                  <span>Start Lesson 3</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="p-4 bg-white rounded-xl border border-indigo-100/80 shadow-2xs space-y-2">
                <div className="text-xs font-bold text-amber-600 flex items-center space-x-1.5">
                  <Target className="w-3.5 h-3.5" />
                  <span>Targeted Practice</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  You struggled with nested pointer syntax in C. Practice the <strong>Memory Allocation</strong> lab to boost confidence.
                </p>
                <Link
                  href="/student/practice?lang=c"
                  className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 hover:underline pt-1"
                >
                  <span>Open C Lab</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="p-4 bg-white rounded-xl border border-indigo-100/80 shadow-2xs space-y-2">
                <div className="text-xs font-bold text-orange-600 flex items-center space-x-1.5">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Streak Milestone</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Complete <strong>20 minutes</strong> of coding practice today to push your learning streak to <strong>13 consecutive days</strong>!
                </p>
                <Link
                  href="/student/practice"
                  className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 hover:underline pt-1"
                >
                  <span>Quick 20m Code Run</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Active Enrolled Courses (4 Max Enforced) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                  <span>My Active Enrolled Courses</span>
                  <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">
                    {activeCount} / 4 Slots Enrolled
                  </span>
                </h3>
                <p className="text-xs text-slate-500">
                  Focused study tracks. Complete or drop a course before taking on additional tracks.
                </p>
              </div>

              <Link
                href="/student/courses"
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
              >
                <span>Browse Course Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrolledCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm card-hover flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                        {course.category} &bull; {course.difficulty}
                      </span>
                      <span className="text-xs font-bold text-slate-700">{course.progress || 0}% Complete</span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 hover:text-blue-600 transition">
                      <Link href={`/student/courses/${course.id}`}>{course.title}</Link>
                    </h4>

                    <p className="text-xs text-slate-500 line-clamp-2">{course.description}</p>

                    {/* Progress Bar */}
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-500"
                        style={{ width: `${course.progress || 0}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">{course.lessonsCount} Lessons &bull; {course.duration}</span>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => unenrollCourse(course.id)}
                        className="text-slate-400 hover:text-rose-600 transition"
                        title="Leave course to free up a slot"
                      >
                        Drop
                      </button>
                      <Link
                        href={`/student/courses/${course.id}`}
                        className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs transition"
                      >
                        Resume
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Analytics Overview */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Academic Trajectory & Analytics</h3>
                <p className="text-xs text-slate-500">
                  Subject-level mastery curves and historical assessment performance
                </p>
              </div>
              <Link
                href="/student/analytics"
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
              >
                <span>View Full Analytics</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <OverallAcademicChart
              overallScore={82}
              courseCompletion={avgCompletion}
              quizAverage={84}
              codingAccuracy={88}
              learningHours={learningHours}
              weeklyActivity={[4, 6, 8, 5, 7, 9, 7.5]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {analytics.slice(0, 2).map((item) => (
                <SubjectPerformanceChart key={item.subject} analytics={item} />
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* 4-Course Limit Modal */}
      <CourseLimitModal
        isOpen={courseLimitModalOpen}
        onClose={() => setCourseLimitModalOpen(false)}
        enrolledCourses={enrolledCourses}
        onUnenroll={unenrollCourse}
      />
    </div>
  );
}
