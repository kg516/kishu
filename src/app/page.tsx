'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  GraduationCap,
  Sparkles,
  Code2,
  BrainCircuit,
  Flame,
  BarChart3,
  Users,
  Shield,
  CheckCircle2,
  ArrowRight,
  Play,
  Award,
  Terminal,
  Clock,
  BookOpen,
  Zap,
  Target,
  BellRing,
  HelpCircle,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';

export default function LandingPage() {
  const router = useRouter();
  const { loginAs } = useAppStore();

  const handleDemoLaunch = (role: 'student' | 'parent' | 'admin') => {
    loginAs(role);
    if (role === 'student') router.push('/student');
    if (role === 'parent') router.push('/parent');
    if (role === 'admin') router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg text-slate-900 tracking-tight leading-none">
                Smart<span className="text-blue-600">Edu</span>
              </span>
              <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-0.5">
                Digital Learning Ecosystem
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold text-slate-600">
            <a href="#problems" className="hover:text-blue-600 transition">Challenges</a>
            <a href="#solutions" className="hover:text-blue-600 transition">Solution</a>
            <a href="#features" className="hover:text-blue-600 transition">Features</a>
            <a href="#workflow" className="hover:text-blue-600 transition">How It Works</a>
            <a href="#stats" className="hover:text-blue-600 transition">Impact</a>
          </nav>

          <div className="flex items-center space-x-3">
            <Link
              href="/login"
              className="text-xs font-bold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-xl hover:bg-slate-100 transition"
            >
              Log In
            </Link>
            <button
              onClick={() => handleDemoLaunch('student')}
              className="text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-md hover:shadow-blue-500/20 transition flex items-center space-x-1.5"
            >
              <span>Explore Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-blue-50/60 via-slate-50 to-white">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-blue-400/10 to-indigo-400/10 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Value Proposition */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-blue-100/70 border border-blue-200 px-3 py-1 rounded-full text-blue-800 text-xs font-bold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                <span>Student Innovation Hackathon • Smart Education Ecosystem</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.1]">
                Learn Smarter. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                  Practice Better.
                </span> <br />
                Grow Faster.
              </h1>

              <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                An intelligent education platform that makes learning personalized, interactive and accessible for every student. Unifying Students, Parents, and Administrators in a single digital realm.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => handleDemoLaunch('student')}
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition flex items-center space-x-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start Learning Now</span>
                </button>

                <Link
                  href="/student/courses"
                  className="px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-800 text-sm font-bold rounded-2xl border border-slate-300 shadow-sm transition flex items-center space-x-2"
                >
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>Explore 12 Courses</span>
                </Link>
              </div>

              {/* Hackathon Judge Quick-Access Demo Bar */}
              <div className="pt-6 border-t border-slate-200/80">
                <span className="text-xs uppercase tracking-wider font-bold text-slate-400 block mb-2.5">
                  1-Click Instant Demo Portals for Judges:
                </span>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                  <button
                    onClick={() => handleDemoLaunch('student')}
                    className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl text-xs font-bold text-blue-800 transition flex items-center space-x-1.5"
                  >
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                    <span>Student Demo (Rahul)</span>
                  </button>

                  <button
                    onClick={() => handleDemoLaunch('parent')}
                    className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 transition flex items-center space-x-1.5"
                  >
                    <Users className="w-4 h-4 text-emerald-600" />
                    <span>Parent Demo (Anita)</span>
                  </button>

                  <button
                    onClick={() => handleDemoLaunch('admin')}
                    className="px-3.5 py-2 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl text-xs font-bold text-purple-800 transition flex items-center space-x-1.5"
                  >
                    <Shield className="w-4 h-4 text-purple-600" />
                    <span>Admin Demo (Dr. Vikram)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Dashboard Graphic Showcase */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-lg bg-slate-900 rounded-3xl p-5 shadow-2xl border border-slate-800 text-white space-y-4">
                {/* Window Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="font-mono text-slate-400 ml-2">SmartEdu Interactive Lab</span>
                  </div>
                  <span className="text-[11px] bg-blue-500/20 text-blue-400 font-semibold px-2 py-0.5 rounded border border-blue-500/30">
                    Live Runner
                  </span>
                </div>

                {/* Simulated Student Dashboard Pill */}
                <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/80 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                      RS
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-200">Rahul Sharma</div>
                      <div className="text-[11px] text-slate-400">4 Enrolled Courses &bull; 46.5 hrs</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-2.5 py-1 rounded-xl text-xs font-bold">
                    <Flame className="w-4 h-4 fill-current text-orange-400" />
                    <span>12d Streak</span>
                  </div>
                </div>

                {/* Simulated Split Coding Environment */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs space-y-2">
                  <div className="text-slate-500 text-[11px]">// Python 3.10 Code Playground</div>
                  <div className="text-emerald-400 leading-relaxed">
                    name = <span className="text-amber-300">&quot;Rahul Sharma&quot;</span><br />
                    active_streak = <span className="text-purple-300">12</span><br />
                    print(f<span className="text-amber-300">&quot;Learner: &#123;name&#125; | Streak: &#123;active_streak&#125;d 🔥&quot;</span>)
                  </div>
                  <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                    <span className="text-blue-400 font-bold">&gt;&gt; Terminal Output:</span>
                    <div className="text-slate-200 mt-1 bg-slate-900 p-2 rounded-lg border border-slate-800">
                      Learner: Rahul Sharma | Streak: 12d 🔥
                    </div>
                  </div>
                </div>

                {/* Feature Tags */}
                <div className="grid grid-cols-2 gap-2 text-center text-[11px] font-semibold">
                  <div className="p-2 bg-slate-800/60 rounded-xl border border-slate-700/60 text-indigo-300 flex items-center justify-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>10-Point AI Explainer</span>
                  </div>
                  <div className="p-2 bg-slate-800/60 rounded-xl border border-slate-700/60 text-emerald-300 flex items-center justify-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Strict 4-Course Guard</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems vs Solution Section */}
      <section id="problems" className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              The Digital Education Gap
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Why Traditional Learning Leaves Students Behind
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Standard curricula struggle to adapt to modern computing disciplines, leaving students disconnected, parents anxious, and administrators uninformed.
            </p>
          </div>

          {/* 6 Problem Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'One-Size-Fits-All Pace',
                desc: 'Rigid lecture models treat every student identically regardless of comprehension velocity or coding aptitude.',
                icon: '⚡',
              },
              {
                title: 'Lack of Personalized Guidance',
                desc: 'Students get stuck on syntax or algorithmic errors without immediate, patient, 24/7 technical mentorship.',
                icon: '🤖',
              },
              {
                title: 'Limited Programming Practice',
                desc: 'Theoretical exams fail to develop real problem-solving instincts, terminal literacy, or debugging mastery.',
                icon: '💻',
              },
              {
                title: 'Poor Parent Visibility',
                desc: 'Parents receive delayed semester report cards with zero insight into daily study habits or engagement.',
                icon: '👁️',
              },
              {
                title: 'Difficulty Tracking Progress',
                desc: 'Learners struggle to identify specific subject weak points (e.g. loops vs functions vs pointers).',
                icon: '📉',
              },
              {
                title: 'Lack of Continuous Engagement',
                desc: 'Without gamified habits, streaks, and milestone recognition, student motivation rapidly drops off.',
                icon: '⏳',
              },
            ].map((p, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 card-hover space-y-3">
                <span className="text-2xl">{p.icon}</span>
                <h3 className="font-bold text-slate-900 text-base">{p.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Solution Section Banner */}
          <div id="solutions" className="mt-16 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-indigo-800/50">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950/80 px-3 py-1 rounded-full border border-blue-800">
                  The Smart Education Solution
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  A Connected Tri-Portal Learning Ecosystem
                </h2>
                <p className="text-indigo-200 text-sm sm:text-base leading-relaxed">
                  SmartEdu replaces fragmented websites with an intelligent closed-loop platform: personalized learning for students, transparent progress monitoring for parents, and institutional analytics for administrators.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs">
                    <span className="block font-bold text-white">EduAI Assistant</span>
                    <span className="text-indigo-300 text-[11px]">Instant Mentorship</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs">
                    <span className="block font-bold text-white">Multi-Lang Runner</span>
                    <span className="text-indigo-300 text-[11px]">Python, C, Java, JS</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs">
                    <span className="block font-bold text-white">4-Course Limit</span>
                    <span className="text-indigo-300 text-[11px]">Focused Cognitive Load</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs">
                    <span className="block font-bold text-white">Streak Engine</span>
                    <span className="text-indigo-300 text-[11px]">Habit Retention</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 flex justify-center">
                <button
                  onClick={() => handleDemoLaunch('student')}
                  className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-100 text-blue-900 font-extrabold text-sm rounded-2xl shadow-xl transition transform hover:scale-105"
                >
                  Experience SmartEdu Now &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8 Feature Cards Section */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Engineered for Complete Student Excellence
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Every feature works together to build mastery, accountability, and demonstrable software competence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'AI Learning Assistant',
                desc: 'EduAI resolves doubts across CS, Math, and Science with academic integrity safeguards.',
                icon: BrainCircuit,
                color: 'text-purple-600 bg-purple-50 border-purple-200',
              },
              {
                title: 'Interactive Code Editor',
                desc: 'Write, execute, and inspect programs in Python, C, C++, Java, JS, and HTML with live stdout.',
                icon: Terminal,
                color: 'text-blue-600 bg-blue-50 border-blue-200',
              },
              {
                title: 'Personalized Curricula',
                desc: '12 structured technical courses with lessons, coding challenges, and adaptive difficulty.',
                icon: BookOpen,
                color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
              },
              {
                title: 'Subject Analytics',
                desc: 'Visual graphs tracking quiz progression, assignments, and coding accuracy for every subject.',
                icon: BarChart3,
                color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
              },
              {
                title: 'Parent Oversight Portal',
                desc: 'Dedicated parent view to monitor child progress, activity logs, and real-time alerts without modifying grades.',
                icon: Users,
                color: 'text-teal-600 bg-teal-50 border-teal-200',
              },
              {
                title: 'GitHub-Style Streaks',
                desc: 'Visual 60-day heatmap calendar rewarding genuine daily learning sessions and lessons.',
                icon: Flame,
                color: 'text-orange-600 bg-orange-50 border-orange-200',
              },
              {
                title: 'Smart Inactivity Alerts',
                desc: 'Proactively identifies students with declining engagement and alerts mentors & parents.',
                icon: BellRing,
                color: 'text-rose-600 bg-rose-50 border-rose-200',
              },
              {
                title: 'Accredited Certificates',
                desc: 'Verifiable course completion diplomas with serial ID and celebration confetti.',
                icon: Award,
                color: 'text-amber-600 bg-amber-50 border-amber-200',
              },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm card-hover space-y-3.5 flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-3 ${f.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base">{f.title}</h3>
                    <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed">{f.desc}</p>
                  </div>
                  <div className="pt-2 text-xs font-semibold text-blue-600 flex items-center space-x-1">
                    <span>Explore feature</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="workflow" className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Continuous Learning Cycle
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              How Smart Education Operates
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              From theory to execution, reflection, and institutional verification.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 text-center">
            {[
              { step: '1', title: 'Student', desc: 'Enrolls in up to 4 focused active courses' },
              { step: '2', title: 'Learn', desc: 'Explores bite-sized lessons & structured theory' },
              { step: '3', title: 'Practice', desc: 'Runs live code & tests algorithms in workspace' },
              { step: '4', title: 'Feedback', desc: 'EduAI 10-point explainer analyzes nuances' },
              { step: '5', title: 'Improve', desc: 'Tackles timed quizzes & corrects misconceptions' },
              { step: '6', title: 'Track', desc: 'Heatmap streaks, analytics, & parental sync' },
            ].map((item, i) => (
              <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 relative">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center mx-auto shadow-sm">
                  {item.step}
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Statistics */}
      <section id="stats" className="py-16 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
            <div className="p-4 space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-400">10,000+</div>
              <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                Curated Learning Resources
              </div>
            </div>
            <div className="p-4 space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">5,420+</div>
              <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                Active College Learners
              </div>
            </div>
            <div className="p-4 space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400">95%</div>
              <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                Course Completion Surge
              </div>
            </div>
            <div className="p-4 space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-purple-400">24/7</div>
              <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                EduAI Active Mentorship
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="font-bold text-white text-sm">
              SmartEdu Ecosystem &copy; 2026
            </span>
          </div>

          <div className="flex items-center space-x-6 text-slate-400">
            <button onClick={() => handleDemoLaunch('student')} className="hover:text-white transition">
              Student Portal
            </button>
            <button onClick={() => handleDemoLaunch('parent')} className="hover:text-white transition">
              Parent Portal
            </button>
            <button onClick={() => handleDemoLaunch('admin')} className="hover:text-white transition">
              Admin Portal
            </button>
          </div>

          <div className="text-slate-500">
            Built for National College Hackathon &bull; Smart Education Theme
          </div>
        </div>
      </footer>
    </div>
  );
}
