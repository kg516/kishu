'use client';

import React from 'react';
import {
  Sparkles,
  X,
  CheckCircle,
  AlertOctagon,
  Lightbulb,
  Code,
  Layers,
  Terminal,
  Cpu,
  ArrowRight,
} from 'lucide-react';
import { CodeExplanation } from '@/lib/aiService';

interface CodeExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: string;
  explanation: CodeExplanation | null;
}

export const CodeExplanationModal: React.FC<CodeExplanationModalProps> = ({
  isOpen,
  onClose,
  language,
  explanation,
}) => {
  if (!isOpen || !explanation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/60 backdrop-blur-xs transition-opacity">
      <div className="w-full max-w-2xl h-full bg-white shadow-2xl flex flex-col border-l border-slate-200 animate-slideLeft overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-ai-600 via-indigo-600 to-blue-600 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded text-white">
                  {language.toUpperCase()} Analysis
                </span>
                <span className="text-xs text-indigo-100">10-Point AI Architecture</span>
              </div>
              <h2 className="text-lg font-bold">EduAI Deep Code Explanation</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-800 text-sm">
          {/* 1. What the code does */}
          <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-xl">
            <h3 className="font-bold text-indigo-950 flex items-center space-x-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">1</span>
              <span>What the Code Does (Summary)</span>
            </h3>
            <p className="text-indigo-900 leading-relaxed text-sm">{explanation.overview}</p>
          </div>

          {/* 2. Line-by-Line Breakdown */}
          <div>
            <h3 className="font-bold text-slate-900 flex items-center space-x-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">2</span>
              <span>Line-by-Line Breakdown</span>
            </h3>
            <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 bg-slate-50/50">
              {explanation.lineByLine.slice(0, 10).map((item) => (
                <div key={item.line} className="p-3 hover:bg-white transition flex items-start space-x-3 text-xs">
                  <span className="font-mono font-bold text-slate-400 w-8 text-right flex-shrink-0">
                    L{item.line}
                  </span>
                  <div className="flex-1 space-y-1">
                    <code className="font-mono bg-slate-200/80 px-1.5 py-0.5 rounded text-slate-800 font-medium">
                      {item.code}
                    </code>
                    <p className="text-slate-600">{item.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Important Concepts */}
          <div>
            <h3 className="font-bold text-slate-900 flex items-center space-x-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold">3</span>
              <span>Important Concepts & Idioms</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {explanation.concepts.map((concept, i) => (
                <div key={i} className="p-2.5 bg-slate-100/80 rounded-lg text-xs font-medium text-slate-700 flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                  <span>{concept}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Variables */}
          <div>
            <h3 className="font-bold text-slate-900 flex items-center space-x-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">4</span>
              <span>Variables & Memory Scope</span>
            </h3>
            <div className="space-y-2">
              {explanation.variables.map((v, i) => (
                <div key={i} className="p-2.5 bg-emerald-50/60 border border-emerald-100 rounded-lg flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono font-bold text-emerald-900">{v.name}</span>
                    <span className="ml-2 text-slate-500 font-sans">({v.type})</span>
                  </div>
                  <span className="text-emerald-700 font-medium">{v.purpose}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5, 6, 7. Functions, Loops, Conditions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center space-x-1.5 font-bold text-xs text-slate-800 mb-1.5">
                <span className="w-4 h-4 rounded-full bg-slate-800 text-white text-[10px] flex items-center justify-center">5</span>
                <span>Functions</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1">
                {explanation.functions.map((f, i) => (
                  <li key={i}>• {f}</li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center space-x-1.5 font-bold text-xs text-slate-800 mb-1.5">
                <span className="w-4 h-4 rounded-full bg-slate-800 text-white text-[10px] flex items-center justify-center">6</span>
                <span>Loops</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1">
                {explanation.loops.map((l, i) => (
                  <li key={i}>• {l}</li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center space-x-1.5 font-bold text-xs text-slate-800 mb-1.5">
                <span className="w-4 h-4 rounded-full bg-slate-800 text-white text-[10px] flex items-center justify-center">7</span>
                <span>Conditions</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1">
                {explanation.conditions.map((c, i) => (
                  <li key={i}>• {c}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 8. Expected Output */}
          <div className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs">
            <div className="flex items-center space-x-2 text-slate-400 mb-2 font-sans font-bold">
              <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 text-[10px] flex items-center justify-center font-bold">8</span>
              <Terminal className="w-4 h-4 text-amber-400" />
              <span>Expected Standard Output</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-emerald-400">
              {explanation.expectedOutput}
            </div>
          </div>

          {/* 9. Common Mistakes */}
          <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl">
            <h3 className="font-bold text-rose-950 flex items-center space-x-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs font-bold">9</span>
              <AlertOctagon className="w-4 h-4 text-rose-600" />
              <span>Common Student Pitfalls to Avoid</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-rose-900">
              {explanation.commonMistakes.map((mistake, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 10. Suggested Improvements */}
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
            <h3 className="font-bold text-emerald-950 flex items-center space-x-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">10</span>
              <Lightbulb className="w-4 h-4 text-emerald-600" />
              <span>Smart Recommendations & Best Practices</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-emerald-900">
              {explanation.suggestedImprovements.map((imp, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Powered by EduAI Educational Intelligence
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition shadow"
          >
            Done Reviewing
          </button>
        </div>
      </div>
    </div>
  );
};
