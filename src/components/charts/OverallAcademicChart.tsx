'use client';

import React from 'react';
import { Award, Clock, BookOpen, CheckCircle2, Code2, BarChart2 } from 'lucide-react';

interface OverallAcademicProps {
  overallScore: number;
  courseCompletion: number;
  quizAverage: number;
  codingAccuracy: number;
  learningHours: number;
  weeklyActivity: number[];
}

export const OverallAcademicChart: React.FC<OverallAcademicProps> = ({
  overallScore = 82,
  courseCompletion = 71,
  quizAverage = 84,
  codingAccuracy = 88,
  learningHours = 46.5,
  weeklyActivity = [4, 6, 8, 5, 7, 9, 7.5],
}) => {
  // SVG Donut calculation
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const maxWeeklyHours = 10;

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="font-bold text-slate-900 text-lg flex items-center space-x-2">
            <Award className="w-5 h-5 text-blue-600" />
            <span>Overall Academic Performance</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Holistic aggregation of coursework, algorithmic labs, and assessment velocity
          </p>
        </div>
        <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Grade: Honors (A)
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left: Interactive Donut Chart */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
          <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              {/* Background circle */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                className="text-slate-200"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Progress Arc */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                className="text-blue-600 transition-all duration-1000 ease-out"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-bold text-slate-900">{overallScore}%</span>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                Overall Score
              </span>
            </div>
          </div>

          <div className="space-y-3 w-full sm:w-auto text-xs">
            <div className="flex items-center justify-between sm:justify-start sm:space-x-3">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <span className="text-slate-600 font-medium">Course Completion</span>
              </div>
              <span className="font-bold text-slate-900">{courseCompletion}%</span>
            </div>

            <div className="flex items-center justify-between sm:justify-start sm:space-x-3">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-slate-600 font-medium">Quiz Average</span>
              </div>
              <span className="font-bold text-slate-900">{quizAverage}%</span>
            </div>

            <div className="flex items-center justify-between sm:justify-start sm:space-x-3">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                <span className="text-slate-600 font-medium">Coding Accuracy</span>
              </div>
              <span className="font-bold text-slate-900">{codingAccuracy}%</span>
            </div>

            <div className="flex items-center justify-between sm:justify-start sm:space-x-3">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-slate-600 font-medium">Learning Hours</span>
              </div>
              <span className="font-bold text-slate-900">{learningHours}h</span>
            </div>
          </div>
        </div>

        {/* Right: Weekly Study Hours Bar Chart */}
        <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 flex items-center space-x-1.5">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>Weekly Learning Distribution (Hours)</span>
            </span>
            <span className="text-indigo-600 font-semibold font-mono">
              Total: {weeklyActivity.reduce((a, b) => a + b, 0).toFixed(1)} hrs
            </span>
          </div>

          <div className="h-32 flex items-end justify-between gap-2 pt-4 px-2">
            {weeklyActivity.map((hrs, idx) => {
              const heightPct = Math.min(100, Math.round((hrs / maxWeeklyHours) * 100));
              return (
                <div key={idx} className="flex-1 flex flex-col items-center group cursor-pointer">
                  <span className="text-[10px] font-mono text-slate-500 opacity-0 group-hover:opacity-100 transition mb-1">
                    {hrs}h
                  </span>
                  <div className="w-full bg-slate-200 rounded-t-lg overflow-hidden h-24 flex items-end">
                    <div
                      className="w-full bg-gradient-to-t from-blue-600 to-indigo-500 rounded-t-lg transition-all duration-500 group-hover:from-blue-500 group-hover:to-indigo-400"
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-slate-600 font-semibold mt-1.5">
                    {daysOfWeek[idx]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
