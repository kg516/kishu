'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Layers,
  Award,
  AlertTriangle,
  ArrowRight,
  Code2,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { CourseLimitModal } from '@/components/common/CourseLimitModal';
import { useAppStore } from '@/lib/store';

export default function CourseCatalogPage() {
  const {
    courses,
    enrolledCourses,
    enrollCourse,
    unenrollCourse,
    courseLimitModalOpen,
    setCourseLimitModalOpen,
  } = useAppStore();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const categories = [
    'All',
    'Python',
    'C Programming',
    'C++',
    'Java',
    'JavaScript',
    'HTML & CSS',
    'Data Structures',
    'Artificial Intelligence',
    'Machine Learning',
    'Database Management',
    'Web Development',
    'Computer Networks',
  ];

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || c.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const enrolledCount = enrolledCourses.length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar onToggleMobileSidebar={() => setMobileSidebarOpen(true)} />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
          {/* Header Banner with Course Limit Guard */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                12 Accredited Computing Disciplines
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Course Catalog & Marketplace
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
                Explore engineering curriculums featuring interactive code sandboxes, timed assessments, and AI-guided explanations.
              </p>
            </div>

            {/* Capacity Box */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center md:items-end flex-shrink-0">
              <div className="text-xs font-bold text-slate-500 mb-1">Your Enrollment Capacity</div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-black text-slate-900">{enrolledCount} / 4</span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    enrolledCount >= 4
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {enrolledCount >= 4 ? 'Limit Full' : `${4 - enrolledCount} Slots Left`}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Strict 4-Course Active Rule</p>
            </div>
          </div>

          {/* Search & Filter Controls */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by topic, instructor, or language (e.g. Python, Algorithms, SQL)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-2xs"
                />
              </div>

              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full sm:w-48 bg-white px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 cursor-pointer shadow-2xs"
              >
                <option value="All">All Difficulties</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Horizontal Scrollable Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-semibold">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full transition flex-shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const isEnrolled = enrolledCourses.some((c) => c.id === course.id);

              return (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm card-hover flex flex-col justify-between overflow-hidden"
                >
                  {/* Top Gradient Banner */}
                  <div className={`h-24 bg-gradient-to-r ${course.thumbnailColor} p-4 flex items-start justify-between border-b border-slate-100`}>
                    <span className="text-[11px] font-bold uppercase tracking-wider bg-white/90 text-slate-900 px-2.5 py-1 rounded-lg shadow-2xs">
                      {course.category}
                    </span>
                    <span className="text-[11px] font-semibold bg-slate-900/80 text-white px-2 py-0.5 rounded-md backdrop-blur-xs">
                      {course.difficulty}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 space-y-3">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base hover:text-blue-600 transition">
                        <Link href={`/student/courses/${course.id}`}>{course.title}</Link>
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">Faculty: {course.instructor}</p>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Stats pills */}
                    <div className="grid grid-cols-3 gap-2 py-1 text-center text-[11px] text-slate-600 bg-slate-50 p-2 rounded-xl">
                      <div>
                        <span className="font-bold text-slate-900 block">{course.lessonsCount}</span>
                        <span className="text-[10px] text-slate-400">Lessons</span>
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block">{course.quizzesCount}</span>
                        <span className="text-[10px] text-slate-400">Quizzes</span>
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block">{course.exercisesCount}</span>
                        <span className="text-[10px] text-slate-400">Labs</span>
                      </div>
                    </div>

                    {/* Learning Objectives Preview */}
                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                        Key Competencies:
                      </span>
                      <ul className="text-xs text-slate-600 space-y-1">
                        {course.learningObjectives.slice(0, 2).map((obj, i) => (
                          <li key={i} className="flex items-start space-x-1.5 truncate">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span className="truncate">{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{course.duration}</span>
                    </span>

                    {isEnrolled ? (
                      <Link
                        href={`/student/courses/${course.id}`}
                        className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center space-x-1"
                      >
                        <span>Continue</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <button
                        onClick={() => enrollCourse(course.id)}
                        className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center space-x-1 cursor-pointer"
                      >
                        <span>Enroll Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
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
