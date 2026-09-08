'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { useAppStore } from '@/lib/store';
import {
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  Clock,
  CheckCircle2,
  X,
  Layers,
  Award,
  Search,
} from 'lucide-react';
import { Course, DifficultyLevel } from '@/lib/types';

export default function AdminCoursesPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { courses } = useAppStore();
  const [courseList, setCourseList] = useState<Course[]>(courses);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New course form fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Python');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Beginner');
  const [instructor, setInstructor] = useState('');
  const [duration, setDuration] = useState('12 hours');
  const [description, setDescription] = useState('');

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const newCourse: Course = {
      id: `course-${Date.now()}`,
      title: title.trim() || 'New Advanced Course',
      category,
      difficulty,
      instructor: instructor.trim() || 'Faculty Director',
      duration,
      description: description.trim() || 'Comprehensive computing curriculum with live coding labs.',
      lessonsCount: 16,
      quizzesCount: 4,
      exercisesCount: 10,
      learningObjectives: ['Core foundations', 'Hands-on practice', 'Timed assessments'],
      thumbnailColor: 'from-blue-600/20 to-purple-600/20',
      iconName: 'BookOpen',
      enrolled: false,
      progress: 0,
    };

    setCourseList([newCourse, ...courseList]);
    setIsAddModalOpen(false);
    setTitle('');
    setDescription('');
    setInstructor('');
  };

  const handleDeleteCourse = (id: string) => {
    setCourseList(courseList.filter((c) => c.id !== id));
  };

  const filtered = courseList.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                Curriculum Administration
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                Course Catalog Management
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Author new courses, manage syllabus lessons, calibrate timed quizzes, and monitor enrollments.
              </p>
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-2xl shadow-md transition flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Course</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search existing courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition shadow-2xs"
            />
          </div>

          {/* Courses Table / List */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="p-4 sm:px-6">Course Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Difficulty</th>
                    <th className="p-4">Faculty Lead</th>
                    <th className="p-4">Duration</th>
                    <th className="p-4">Modules</th>
                    <th className="p-4 text-right sm:pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((course) => (
                    <tr key={course.id} className="hover:bg-slate-50/80 transition">
                      <td className="p-4 sm:px-6 font-bold text-slate-900 max-w-xs truncate">
                        {course.title}
                      </td>
                      <td className="p-4 font-semibold text-purple-700">{course.category}</td>
                      <td className="p-4">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
                          {course.difficulty}
                        </span>
                      </td>
                      <td className="p-4 text-slate-600">{course.instructor}</td>
                      <td className="p-4 text-slate-500 font-mono">{course.duration}</td>
                      <td className="p-4 font-bold text-slate-800">{course.lessonsCount} Units</td>
                      <td className="p-4 text-right sm:pr-6 space-x-2">
                        <button
                          onClick={() => handleDeleteCourse(course.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="Delete Course"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Add Course Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 bg-purple-900 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <BookOpen className="w-5 h-5 text-purple-300" />
                <h3 className="font-bold text-base">Create Accredited Course</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-purple-300 hover:text-white rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCourse} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Cloud Systems"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 text-slate-900 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
                  >
                    <option value="Python">Python</option>
                    <option value="C Programming">C Programming</option>
                    <option value="C++">C++</option>
                    <option value="Java">Java</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Data Structures">Data Structures</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Database Management">Database Management</option>
                    <option value="Web Development">Web Development</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Difficulty</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Faculty Lead</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Elena Vance"
                    value={instructor}
                    onChange={(e) => setInstructor(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Duration</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 18 hours"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Outline learning outcomes and technical competencies..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 font-medium resize-none"
                />
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow"
                >
                  Publish Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
