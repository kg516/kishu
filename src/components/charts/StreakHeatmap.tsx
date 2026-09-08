'use client';

import React, { useState } from 'react';
import { Flame, Calendar, Trophy, Zap, AlertCircle } from 'lucide-react';
import { StreakDay } from '@/lib/types';

interface StreakHeatmapProps {
  streakDays: StreakDay[];
  currentStreak: number;
  longestStreak: number;
  totalActiveDays: number;
  isInactiveWarning?: boolean;
}

export const StreakHeatmap: React.FC<StreakHeatmapProps> = ({
  streakDays,
  currentStreak,
  longestStreak,
  totalActiveDays,
  isInactiveWarning = false,
}) => {
  const [hoveredDay, setHoveredDay] = useState<StreakDay | null>(null);

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-emerald-200 hover:bg-emerald-300';
      case 2:
        return 'bg-emerald-400 hover:bg-emerald-500';
      case 3:
        return 'bg-emerald-600 hover:bg-emerald-700';
      case 4:
        return 'bg-emerald-800 hover:bg-emerald-900';
      default:
        return 'bg-slate-100 hover:bg-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
      {/* Top Banner with Flame */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Flame className="w-7 h-7 fill-current animate-bounce" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-bold text-slate-900">
                {currentStreak} Day Learning Streak
              </h3>
              <span className="text-xs bg-orange-100 text-orange-800 font-bold px-2 py-0.5 rounded-full">
                Active 🔥
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Meaningful sessions logged: Quizzes, code runs, and lesson completions.
            </p>
          </div>
        </div>

        {/* Quick Stats Badges */}
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-xs text-slate-500 flex items-center justify-end space-x-1">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>Longest Streak</span>
            </div>
            <div className="font-bold text-slate-800 text-sm">{longestStreak} Days</div>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div className="text-right">
            <div className="text-xs text-slate-500 flex items-center justify-end space-x-1">
              <Zap className="w-3.5 h-3.5 text-blue-500" />
              <span>Total Active Days</span>
            </div>
            <div className="font-bold text-slate-800 text-sm">{totalActiveDays} Days</div>
          </div>
        </div>
      </div>

      {/* Inactive Warning Alert if applicable */}
      {isInactiveWarning && (
        <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start space-x-2.5 text-xs text-amber-900">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold">Keep your streak alive!</strong>
            <p className="mt-0.5">
              We miss you! Your learning journey is waiting. Complete a lesson today to keep your streak alive.
            </p>
          </div>
        </div>
      )}

      {/* GitHub-style Heatmap Grid */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center space-x-1.5 font-medium">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Activity History (Last 60 Days)</span>
          </span>
          <div className="flex items-center space-x-1.5 text-[11px]">
            <span>Less</span>
            <span className="w-2.5 h-2.5 rounded-xs bg-slate-100 border border-slate-200" />
            <span className="w-2.5 h-2.5 rounded-xs bg-emerald-200" />
            <span className="w-2.5 h-2.5 rounded-xs bg-emerald-400" />
            <span className="w-2.5 h-2.5 rounded-xs bg-emerald-600" />
            <span className="w-2.5 h-2.5 rounded-xs bg-emerald-800" />
            <span>More</span>
          </div>
        </div>

        {/* Responsive Grid of Days */}
        <div className="p-3 bg-slate-50/70 border border-slate-200 rounded-xl overflow-x-auto">
          <div className="flex items-center gap-1.5 min-w-[540px]">
            {streakDays.map((day) => (
              <div
                key={day.date}
                onMouseEnter={() => setHoveredDay(day)}
                onMouseLeave={() => setHoveredDay(null)}
                className={`w-3.5 h-5 rounded-xs cursor-pointer transition-transform transform hover:scale-125 ${getLevelColor(
                  day.level
                )}`}
                title={`${day.date}: ${day.count} activities logged`}
              />
            ))}
          </div>
        </div>

        {/* Hovered day info preview */}
        <div className="h-5 text-xs text-slate-500 flex items-center justify-between px-1">
          {hoveredDay ? (
            <span className="font-medium text-slate-700">
              {hoveredDay.date}: <strong className="text-emerald-700">{hoveredDay.count} activities</strong> (quizzes, lessons, code runs)
            </span>
          ) : (
            <span className="text-slate-400">Hover over any day square to inspect daily learning volume.</span>
          )}
          <span className="text-[11px] text-emerald-600 font-semibold">Consistent Daily Habit = High Retention</span>
        </div>
      </div>
    </div>
  );
};
