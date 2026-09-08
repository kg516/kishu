'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  ChevronDown,
  Minimize2,
  Maximize2,
  BookOpen,
  HelpCircle,
  Lightbulb,
  ShieldCheck,
} from 'lucide-react';
import { askEduAI } from '@/lib/aiService';
import { AIMessage } from '@/lib/types';

interface EduAIAssistantProps {
  currentCourseContext?: string;
  defaultOpen?: boolean;
}

export const EduAIAssistant: React.FC<EduAIAssistantProps> = ({
  currentCourseContext,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'welcome-init',
      sender: 'assistant',
      text: `Hello Rahul! 👋 I'm **EduAI**, your smart educational mentor.

I can explain complex coding concepts, debug your code snippets, walk you through math/CS algorithms step-by-step, or quiz you before an exam.

**Suggested topics to explore right now:**`,
      timestamp: 'Just now',
      suggestions: [
        'What is a pointer in C?',
        'What is a Python function?',
        'Difference between BFS and DFS',
        'How to protect my 12-day streak?',
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isTyping) return;

    const userMsg: AIMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const answer = await askEduAI(query, { courseName: currentCourseContext });
      const aiMsg: AIMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: answer,
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'assistant',
          text: "I encountered a minor network glitch, but I'm ready to help. Please rephrase or try again!",
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center space-x-2.5 bg-gradient-to-r from-ai-600 via-indigo-600 to-blue-600 hover:from-ai-500 hover:to-indigo-500 text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-indigo-500/25 transition-all transform hover:-translate-y-1 group"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-ai-600" />
          </div>
          <span className="font-semibold text-sm tracking-wide">Ask EduAI</span>
        </button>
      )}

      {/* Main AI Chat Widget Window */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 w-[95vw] sm:w-[460px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden transition-all duration-300 animate-slideUp ${
            isMinimized ? 'h-16' : 'h-[620px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-ai-600 via-indigo-600 to-blue-600 p-4 text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-sm">EduAI Mentor</h3>
                  <span className="text-[10px] bg-emerald-400/25 text-emerald-100 font-semibold px-1.5 py-0.2 rounded border border-emerald-300/30">
                    Online 24/7
                  </span>
                </div>
                <p className="text-[11px] text-indigo-100 truncate max-w-[200px]">
                  {currentCourseContext ? `Context: ${currentCourseContext}` : 'Intelligent Tutor & Doubt Solver'}
                </p>
              </div>
            </div>

            {/* Window Controls */}
            <div className="flex items-center space-x-1 text-white/80">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition"
                title={isMinimized ? 'Expand' : 'Minimize'}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 text-xs sm:text-sm">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start space-x-2.5 ${
                      msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.sender === 'assistant' && (
                      <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Sparkles className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 shadow-xs ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-tr-xs'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs'
                      }`}
                    >
                      <div className="whitespace-pre-wrap leading-relaxed space-y-2">
                        {msg.text.split('\n\n').map((para, i) => (
                          <div key={i}>
                            {para.startsWith('```') ? (
                              <pre className="bg-slate-900 text-emerald-400 p-2.5 rounded-lg overflow-x-auto font-mono text-xs my-1.5">
                                {para.replace(/```[a-z]*/g, '')}
                              </pre>
                            ) : (
                              <p>{para}</p>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Quick Suggestions buttons */}
                      {msg.suggestions && msg.suggestions.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1.5">
                          {msg.suggestions.map((sug, i) => (
                            <button
                              key={i}
                              onClick={() => handleSend(sug)}
                              className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium px-2.5 py-1 rounded-full border border-indigo-200 transition text-left"
                            >
                              💡 {sug}
                            </button>
                          ))}
                        </div>
                      )}

                      <span
                        className={`text-[10px] mt-1.5 block ${
                          msg.sender === 'user' ? 'text-blue-200 text-right' : 'text-slate-400'
                        }`}
                      >
                        {msg.timestamp}
                      </span>
                    </div>

                    {msg.sender === 'user' && (
                      <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center space-x-2 text-slate-400 text-xs p-2">
                    <div className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                      <Sparkles className="w-3.5 h-3.5 animate-spin" />
                    </div>
                    <span className="italic">EduAI is formulating step-by-step guidance...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-3 bg-white border-t border-slate-200 flex flex-col space-y-2">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about pointers, algorithms, syntax..."
                    className="flex-1 bg-slate-100 border border-slate-200 text-slate-900 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition disabled:opacity-40 flex-shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
                  <span className="flex items-center space-x-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    <span>Academic Integrity Safeguard Active</span>
                  </span>
                  <span>EduAI 2.0</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
