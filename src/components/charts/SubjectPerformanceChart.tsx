'use client';

import React, { useState } from 'react';
import { TrendingUp, Award, BookOpen, CheckCircle, Target } from 'lucide-react';
import { SubjectAnalytics } from '@/lib/types';

interface SubjectPerformanceChartProps {
  analytics: SubjectAnalytics;
}

export const SubjectPerformanceChart: React.FC<SubjectPerformanceChartProps> = ({ analytics }) => {
  const [activeTab, setActiveTab] = useState<'trend' | 'breakdown'>('trend');

  const scores = analytics.quizScores;
  const maxScore = 100;
  const chartHeight = 160;
  const chartWidth = 440;
  const paddingX = 40;
  const paddingY = 25;

  // Calculate SVG line points
  const points = scores.map((score, index) => {
    const x = paddingX + (index / (scores.length - 1)) * (chartWidth - paddingX * 2);
    const y = chartHeight - paddingY - (score / maxScore) * (chartHeight - paddingY * 2);
    return { x, y, score };
  });

  const pathD = points.reduce((acc, curr, idx) => {
    return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z`;

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h4 className="font-bold text-slate-900 text-base flex items-center space-x-2">
            <span>{analytics.subject}</span>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>+{analytics.improvementPct}% Gain</span>
            </span>
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Progressive assessment results and coding accuracy trajectory
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
          <button
            onClick={() => setActiveTab('trend')}
            className={`px-3 py-1 rounded-md transition ${
              activeTab === 'trend' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Score Trend
          </button>
          <button
            onClick={() => setActiveTab('breakdown')}
            className={`px-3 py-1 rounded-md transition ${
              activeTab === 'breakdown' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Breakdown
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      {activeTab === 'trend' ? (
        <div className="space-y-2">
          <div className="relative w-full overflow-hidden bg-slate-50/70 rounded-xl border border-slate-100 p-2">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-44 overflow-visible">
              <defs>
                <linearGradient id={`grad-${analytics.subject.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[40, 60, 80, 100].map((val) => {
                const y = chartHeight - paddingY - (val / maxScore) * (chartHeight - paddingY * 2);
                return (
                  <g key={val}>
                    <line x1={paddingX} y1={y} x2={chartWidth - paddingX} y2={y} stroke="#e2e8f0" strokeDasharray="3 3" />
                    <text x={paddingX - 8} y={y + 3} textAnchor="end" fontSize="10" fill="#94a3b8">
                      {val}%
                    </text>
                  </g>
                );
              })}

              {/* Area Fill */}
              <path d={areaD} fill={`url(#grad-${analytics.subject.replace(/\s+/g, '')})`} />

              {/* Line */}
              <path d={pathD} fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

              {/* Data Points */}
              {points.map((pt, i) => (
                <g key={i}>
                  <circle cx={pt.x} cy={pt.y} r="4.5" fill="#ffffff" stroke="#2563eb" strokeWidth="2.5" className="transition transform hover:scale-150" />
                  <text x={pt.x} y={pt.y - 9} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e3a8a">
                    {pt.score}%
                  </text>
                  <text x={pt.x} y={chartHeight - 6} textAnchor="middle" fontSize="10" fill="#64748b">
                    Quiz {i + 1}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Historical Progression: {scores.join('% → ')}%</span>
            <span className="font-semibold text-blue-600">Linear Mastery Growth</span>
          </div>
        </div>
      ) : (
        /* Breakdown Bars */
        <div className="space-y-3 py-1">
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-700">Coding Practice Accuracy</span>
              <span className="text-blue-600">{analytics.codingAccuracy}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: `${analytics.codingAccuracy}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-700">Curriculum Lessons Completed</span>
              <span className="text-emerald-600">
                {analytics.completedLessons} / {analytics.totalLessons} Units
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${(analytics.completedLessons / analytics.totalLessons) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-700">Average Assignment Score</span>
              <span className="text-purple-600">
                {Math.round(analytics.assignmentScores.reduce((a, b) => a + b, 0) / analytics.assignmentScores.length)}%
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-600 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.round(analytics.assignmentScores.reduce((a, b) => a + b, 0) / analytics.assignmentScores.length)}%`,
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Stats Metric Pills */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
        <div className="p-2 bg-slate-50 rounded-xl">
          <div className="text-[10px] text-slate-500 font-medium">Average Score</div>
          <div className="text-sm font-bold text-slate-800">{analytics.avgScore}%</div>
        </div>
        <div className="p-2 bg-slate-50 rounded-xl">
          <div className="text-[10px] text-slate-500 font-medium">Highest Mark</div>
          <div className="text-sm font-bold text-emerald-600">{analytics.highestScore}%</div>
        </div>
        <div className="p-2 bg-slate-50 rounded-xl">
          <div className="text-[10px] text-slate-500 font-medium">Completed</div>
          <div className="text-sm font-bold text-blue-600">
            {Math.round((analytics.completedLessons / analytics.totalLessons) * 100)}%
          </div>
        </div>
      </div>
    </div>
  );
};
