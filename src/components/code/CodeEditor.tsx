'use client';

import React, { useState, useEffect } from 'react';
import {
  Play,
  RotateCcw,
  Save,
  Sparkles,
  Terminal,
  Clock,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Code2,
} from 'lucide-react';
import { STARTER_CODE_BY_LANGUAGE, runCode, ExecutionResult } from '@/lib/codeRunner';
import { generateCodeExplanation, CodeExplanation } from '@/lib/aiService';
import { CodeExplanationModal } from './CodeExplanationModal';

interface CodeEditorProps {
  initialLanguage?: string;
  initialCode?: string;
  onCodeExecuted?: () => void;
  title?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  initialLanguage = 'python',
  initialCode,
  onCodeExecuted,
  title,
}) => {
  const [language, setLanguage] = useState(initialLanguage);
  const [code, setCode] = useState(initialCode || STARTER_CODE_BY_LANGUAGE[initialLanguage] || '');
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<ExecutionResult | null>(null);
  const [explanation, setExplanation] = useState<CodeExplanation | null>(null);
  const [isExplainOpen, setIsExplainOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedFeedback, setSavedFeedback] = useState(false);

  // Sync if initialCode or initialLanguage changes from parent
  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
    }
  }, [initialCode]);

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    setCode(STARTER_CODE_BY_LANGUAGE[newLang] || '// Write code here...');
    setOutput(null);
  };

  const handleRun = async () => {
    setIsRunning(true);
    const res = await runCode(language, code);
    setOutput(res);
    setIsRunning(false);
    if (onCodeExecuted) {
      onCodeExecuted();
    }
  };

  const handleReset = () => {
    setCode(STARTER_CODE_BY_LANGUAGE[language] || '');
    setOutput(null);
  };

  const handleSave = () => {
    try {
      localStorage.setItem(`smartedu_code_${language}`, code);
      setSavedFeedback(true);
      setTimeout(() => setSavedFeedback(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleExplain = () => {
    const exp = generateCodeExplanation(language, code);
    setExplanation(exp);
    setIsExplainOpen(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Line numbers calculation
  const lineCount = Math.max(code.split('\n').length, 12);
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
      {/* Editor Header & Toolbar */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs font-semibold text-slate-400 border-l border-slate-800 pl-3">
            {title || 'Interactive Workspace'}
          </span>
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg px-2.5 py-1.5 border border-slate-700 focus:outline-hidden focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="python">Python 3</option>
            <option value="javascript">JavaScript (ES6)</option>
            <option value="c">C (GCC)</option>
            <option value="cpp">C++ (Modern)</option>
            <option value="java">Java 17</option>
            <option value="html">HTML & CSS</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 text-slate-400 hover:text-slate-200 text-xs px-2.5 py-1.5 rounded-lg hover:bg-slate-800 transition"
            title="Copy Code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center space-x-1 text-slate-400 hover:text-slate-200 text-xs px-2.5 py-1.5 rounded-lg hover:bg-slate-800 transition"
            title="Reset to Starter Template"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={handleSave}
            className="flex items-center space-x-1 text-slate-400 hover:text-slate-200 text-xs px-2.5 py-1.5 rounded-lg hover:bg-slate-800 transition"
            title="Save code"
          >
            <Save className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{savedFeedback ? 'Saved!' : 'Save'}</span>
          </button>

          {/* AI Explain Code Button */}
          <button
            onClick={handleExplain}
            className="flex items-center space-x-1.5 bg-gradient-to-r from-ai-600 to-indigo-600 hover:from-ai-500 hover:to-indigo-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm hover:shadow transition"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Explain Code</span>
          </button>

          {/* Run Code Button */}
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-md hover:shadow transition disabled:opacity-50 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isRunning ? 'Running...' : 'Run Code'}</span>
          </button>
        </div>
      </div>

      {/* Code Textarea with Line Numbers */}
      <div className="relative flex-1 flex overflow-hidden font-mono text-sm bg-slate-900 min-h-[220px]">
        {/* Line Numbers Column */}
        <div className="w-12 py-3 bg-slate-950/70 border-r border-slate-800 select-none text-right pr-3 text-slate-600 text-xs font-mono">
          {lineNumbers.map((num) => (
            <div key={num} className="leading-6">
              {num}
            </div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="flex-1 p-3 bg-transparent text-slate-100 resize-none focus:outline-hidden leading-6 font-mono text-xs sm:text-sm overflow-y-auto dark-scroll"
          placeholder="Type your code here..."
        />
      </div>

      {/* Output Terminal Section */}
      <div className="border-t border-slate-800 bg-slate-950 flex flex-col">
        <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-slate-400 font-semibold">
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            <span>Output Console</span>
            {output && (
              <span className="flex items-center space-x-1 ml-3 text-[11px] text-slate-500 font-mono">
                <Clock className="w-3 h-3" />
                <span>{output.executionTimeMs}ms</span>
              </span>
            )}
          </div>
          {output && (
            <div className="flex items-center space-x-2">
              {output.success ? (
                <span className="flex items-center space-x-1 text-[11px] text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Exit Code: {output.exitCode} (Success)</span>
                </span>
              ) : (
                <span className="flex items-center space-x-1 text-[11px] text-rose-400 font-semibold">
                  <AlertCircle className="w-3 h-3" />
                  <span>Error</span>
                </span>
              )}
              <button
                onClick={() => setOutput(null)}
                className="text-slate-500 hover:text-slate-300 text-[11px] ml-2"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Terminal Screen */}
        <div className="p-4 font-mono text-xs text-slate-200 min-h-[90px] max-h-[160px] overflow-y-auto dark-scroll select-text">
          {isRunning ? (
            <div className="flex items-center space-x-2 text-slate-400 animate-pulse">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
              <span>Compiling and executing {language.toUpperCase()} runtime...</span>
            </div>
          ) : output ? (
            <div>
              {output.stderr ? (
                <div className="text-rose-400 whitespace-pre-wrap">{output.stderr}</div>
              ) : (
                <div className="text-emerald-400 whitespace-pre-wrap leading-5">{output.stdout}</div>
              )}
            </div>
          ) : (
            <div className="text-slate-500 italic">
              Click &quot;Run Code&quot; to execute your program and view standard output here.
            </div>
          )}
        </div>
      </div>

      {/* 10-Point AI Explanation Drawer Modal */}
      <CodeExplanationModal
        isOpen={isExplainOpen}
        onClose={() => setIsExplainOpen(false)}
        language={language}
        explanation={explanation}
      />
    </div>
  );
};
