'use client';

import { useState, useEffect } from 'react';
import {
  User,
  Course,
  Lesson,
  Quiz,
  QuizAttempt,
  Assignment,
  StreakDay,
  Achievement,
  Certificate,
  NotificationItem,
  AIMessage,
  SubjectAnalytics,
} from './types';
import {
  DEMO_USERS,
  DEMO_COURSES,
  DEMO_LESSONS,
  DEMO_QUIZZES,
  DEMO_ASSIGNMENTS,
  generateStreakMatrix,
  DEMO_ACHIEVEMENTS,
  DEMO_CERTIFICATES,
  DEMO_NOTIFICATIONS,
  DEMO_SUBJECT_ANALYTICS,
} from './mockData';

const STORAGE_KEY = 'smart_education_app_state_v1';

interface AppState {
  currentUser: User | null;
  courses: Course[];
  lessons: Record<string, Lesson[]>;
  quizzes: Quiz[];
  quizAttempts: QuizAttempt[];
  assignments: Assignment[];
  streakDays: StreakDay[];
  currentStreak: number;
  longestStreak: number;
  totalActiveDays: number;
  learningHours: number;
  achievements: Achievement[];
  certificates: Certificate[];
  notifications: NotificationItem[];
  analytics: SubjectAnalytics[];
  chatMessages: AIMessage[];
}

const getInitialState = (): AppState => {
  return {
    currentUser: DEMO_USERS[0], // Default to Rahul Sharma for instant demo
    courses: DEMO_COURSES,
    lessons: DEMO_LESSONS,
    quizzes: DEMO_QUIZZES,
    quizAttempts: [],
    assignments: DEMO_ASSIGNMENTS,
    streakDays: generateStreakMatrix(),
    currentStreak: 12,
    longestStreak: 18,
    totalActiveDays: 42,
    learningHours: 46.5,
    achievements: DEMO_ACHIEVEMENTS,
    certificates: DEMO_CERTIFICATES,
    notifications: DEMO_NOTIFICATIONS,
    analytics: DEMO_SUBJECT_ANALYTICS,
    chatMessages: [
      {
        id: 'welcome-1',
        sender: 'assistant',
        text: 'Hello Rahul! 👋 I am EduAI, your personal smart education mentor. You can ask me any technical doubts, programming syntax questions, code explanations, or study tips. What are we exploring today?',
        timestamp: 'Just now',
        suggestions: [
          'What is a pointer in C?',
          'Explain Python functions with an example',
          'Difference between BFS and DFS',
          'How can I improve my 12-day streak?',
        ],
      },
    ],
  };
};

export function useAppStore() {
  const [state, setState] = useState<AppState>(getInitialState);
  const [isLoaded, setIsLoaded] = useState(false);
  const [courseLimitModalOpen, setCourseLimitModalOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState((prev) => ({
          ...prev,
          ...parsed,
          // Ensure streak days are not empty
          streakDays: parsed.streakDays?.length ? parsed.streakDays : generateStreakMatrix(),
        }));
      }
    } catch (e) {
      console.error('Error loading state from localStorage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage on change
  const saveState = (updater: (prev: AppState) => AppState) => {
    setState((prev) => {
      const next = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error('Error saving state:', e);
      }
      return next;
    });
  };

  // Auth Switcher
  const setCurrentUser = (user: User | null) => {
    saveState((prev) => ({ ...prev, currentUser: user }));
  };

  const loginAs = (role: 'student' | 'parent' | 'admin') => {
    const target = DEMO_USERS.find((u) => u.role === role) || DEMO_USERS[0];
    setCurrentUser(target);
    return target;
  };

  const logout = () => {
    saveState((prev) => ({ ...prev, currentUser: null }));
  };

  // Enrollment with strict 4-Course Limit enforcement
  const enrollCourse = (courseId: string): { success: boolean; reason?: string } => {
    const activeCount = state.courses.filter((c) => c.enrolled).length;
    const target = state.courses.find((c) => c.id === courseId);

    if (!target) return { success: false, reason: 'not_found' };
    if (target.enrolled) return { success: true }; // already enrolled

    if (activeCount >= 4) {
      // 4-Course Limit reached!
      setCourseLimitModalOpen(true);
      return {
        success: false,
        reason: 'You have reached your 4-course limit. Complete or leave one of your current courses before enrolling in another course.',
      };
    }

    saveState((prev) => ({
      ...prev,
      courses: prev.courses.map((c) =>
        c.id === courseId ? { ...c, enrolled: true, progress: 0 } : c
      ),
      notifications: [
        {
          id: `notif-${Date.now()}`,
          recipientRole: 'student',
          title: `Enrolled in ${target.title}!`,
          message: `You are now enrolled in ${target.title}. You have ${activeCount + 1}/4 active courses.`,
          type: 'success',
          createdAt: 'Just now',
          read: false,
        },
        ...prev.notifications,
      ],
    }));

    return { success: true };
  };

  const unenrollCourse = (courseId: string) => {
    saveState((prev) => ({
      ...prev,
      courses: prev.courses.map((c) =>
        c.id === courseId ? { ...c, enrolled: false, progress: 0 } : c
      ),
    }));
  };

  // Lesson progress & Streak update
  const completeLesson = (courseId: string, lessonId: string) => {
    saveState((prev) => {
      const courseLessons = prev.lessons[courseId] || [];
      const updatedLessons = courseLessons.map((l) =>
        l.id === lessonId ? { ...l, isCompleted: true } : l
      );

      const completedCount = updatedLessons.filter((l) => l.isCompleted).length;
      const progress = Math.round((completedCount / (updatedLessons.length || 1)) * 100);

      // Streak increment if today not already incremented
      const todayStr = new Date().toISOString().split('T')[0];
      const updatedStreakDays = prev.streakDays.map((sd) =>
        sd.date === todayStr
          ? { ...sd, count: sd.count + 1, level: (Math.min(4, sd.level + 1) as 0 | 1 | 2 | 3 | 4) }
          : sd
      );

      // Check if certificate criteria met
      let newCertUnlocked = false;
      const updatedCertificates = prev.certificates.map((cert) => {
        if (cert.courseId === courseId) {
          const allLessonsDone = completedCount === updatedLessons.length;
          const shouldUnlock = allLessonsDone && cert.quizPassed;
          if (shouldUnlock && !cert.isUnlocked) {
            newCertUnlocked = true;
          }
          return {
            ...cert,
            lessonsCompleted: completedCount,
            totalLessons: updatedLessons.length,
            isUnlocked: shouldUnlock || cert.isUnlocked,
            issuedAt: shouldUnlock && !cert.issuedAt ? 'Just now' : cert.issuedAt,
            certificateNumber:
              shouldUnlock && !cert.certificateNumber
                ? `SMARTEDU-2026-${courseId.toUpperCase().slice(-4)}-${Math.floor(10000 + Math.random() * 90000)}`
                : cert.certificateNumber,
            grade: shouldUnlock && !cert.grade ? 'Grade A+ (Distinction)' : cert.grade,
          };
        }
        return cert;
      });

      const newNotifs: NotificationItem[] = [
        {
          id: `notif-${Date.now()}`,
          recipientRole: 'student',
          title: 'Lesson Completed! 🚀',
          message: `You finished a lesson and made progress. Streak kept alive!`,
          type: 'success',
          createdAt: 'Just now',
          read: false,
        },
      ];

      if (newCertUnlocked) {
        newNotifs.unshift({
          id: `notif-cert-${Date.now()}`,
          recipientRole: 'student',
          title: '🎉 Official Certificate Unlocked!',
          message: `Congratulations! You completed all lessons and passed the proctored exam. Your official certificate is now available.`,
          type: 'success',
          createdAt: 'Just now',
          read: false,
        });
      }

      return {
        ...prev,
        lessons: { ...prev.lessons, [courseId]: updatedLessons },
        courses: prev.courses.map((c) =>
          c.id === courseId ? { ...c, progress, isCompleted: progress === 100 } : c
        ),
        certificates: updatedCertificates,
        streakDays: updatedStreakDays,
        learningHours: Number((prev.learningHours + 0.3).toFixed(1)),
        notifications: [...newNotifs, ...prev.notifications],
      };
    });
  };

  // Quiz submission with strict proctoring verification & certificate unlock
  const submitQuizAttempt = (
    quizId: string,
    answers: number[],
    score: number,
    total: number,
    violationsCount: number = 0,
    isDisqualified: boolean = false
  ) => {
    const percentage = isDisqualified ? 0 : Math.round((score / total) * 100);
    const attempt: QuizAttempt = {
      id: `attempt-${Date.now()}`,
      quizId,
      studentId: state.currentUser?.id || 'student-1',
      score: isDisqualified ? 0 : score,
      total,
      percentage,
      completedAt: 'Just now',
      answers,
      violationsCount,
      isDisqualified,
    };

    saveState((prev) => {
      const targetQuiz = prev.quizzes.find((q) => q.id === quizId);
      const courseId = targetQuiz?.courseId;
      const passingScore = targetQuiz?.passingScore || 75;
      const passed = !isDisqualified && percentage >= passingScore;

      let certUnlocked = false;
      const updatedCertificates = prev.certificates.map((cert) => {
        if (cert.courseId === courseId) {
          const courseLessons = prev.lessons[courseId] || [];
          const allLessonsDone =
            courseLessons.length > 0 && courseLessons.every((l) => l.isCompleted);
          const shouldUnlock = allLessonsDone && passed;
          if (shouldUnlock && !cert.isUnlocked) {
            certUnlocked = true;
          }

          return {
            ...cert,
            quizPassed: passed || cert.quizPassed,
            quizScore: Math.max(cert.quizScore || 0, percentage),
            isUnlocked: shouldUnlock || cert.isUnlocked,
            issuedAt: shouldUnlock && !cert.issuedAt ? 'Just now' : cert.issuedAt,
            certificateNumber:
              shouldUnlock && !cert.certificateNumber
                ? `SMARTEDU-2026-${courseId?.toUpperCase().slice(-4)}-${Math.floor(10000 + Math.random() * 90000)}`
                : cert.certificateNumber,
            grade:
              shouldUnlock && !cert.grade
                ? percentage >= 90
                  ? 'Grade A+ (Distinction)'
                  : 'Grade A (Honors)'
                : cert.grade,
          };
        }
        return cert;
      });

      const newNotifs: NotificationItem[] = [];

      if (isDisqualified) {
        newNotifs.push({
          id: `notif-dq-${Date.now()}`,
          recipientRole: 'student',
          title: '🚨 Proctored Exam Disqualified',
          message:
            'Multiple anti-cheating violations (tab switches / window focus losses) were detected. Attempt marked invalid.',
          type: 'alert',
          createdAt: 'Just now',
          read: false,
        });
      } else if (passed) {
        newNotifs.push({
          id: `notif-pass-${Date.now()}`,
          recipientRole: 'student',
          title: `Proctored Exam Passed: ${percentage}%! 🎯`,
          message: `You passed the strict proctored assessment (${score}/${total}).`,
          type: 'success',
          createdAt: 'Just now',
          read: false,
        });

        if (certUnlocked) {
          newNotifs.push({
            id: `notif-cert-${Date.now()}`,
            recipientRole: 'student',
            title: '🏆 Course Certificate Unlocked!',
            message: `All modules and the proctored exam are complete. Your official certificate is now ready!`,
            type: 'success',
            createdAt: 'Just now',
            read: false,
          });
        }
      } else {
        newNotifs.push({
          id: `notif-fail-${Date.now()}`,
          recipientRole: 'student',
          title: `Exam Score: ${percentage}% (Passing is ${passingScore}%)`,
          message: 'Review course lessons and retake the proctored assessment to unlock your certificate.',
          type: 'warning',
          createdAt: 'Just now',
          read: false,
        });
      }

      return {
        ...prev,
        quizAttempts: [attempt, ...prev.quizAttempts],
        certificates: updatedCertificates,
        learningHours: Number((prev.learningHours + 0.2).toFixed(1)),
        notifications: [...newNotifs, ...prev.notifications],
      };
    });

    return attempt;
  };

  // Assignment submission
  const submitAssignment = (assignmentId: string, content: string) => {
    saveState((prev) => ({
      ...prev,
      assignments: prev.assignments.map((a) =>
        a.id === assignmentId
          ? {
              ...a,
              status: 'Submitted',
              submittedContent: content,
              submittedAt: 'Just now',
            }
          : a
      ),
      notifications: [
        {
          id: `notif-${Date.now()}`,
          recipientRole: 'student',
          title: 'Assignment Submitted ✅',
          message: 'Your solution was received and queued for instructor review.',
          type: 'info',
          createdAt: 'Just now',
          read: false,
        },
        ...prev.notifications,
      ],
    }));
  };

  // EduAI Chat
  const addChatMessage = (msg: AIMessage) => {
    saveState((prev) => ({
      ...prev,
      chatMessages: [...prev.chatMessages, msg],
    }));
  };

  // Notifications
  const addNotification = (notif: Omit<NotificationItem, 'id' | 'createdAt' | 'read'>) => {
    const newNotif: NotificationItem = {
      ...notif,
      id: `notif-${Date.now()}`,
      createdAt: 'Just now',
      read: false,
    };
    saveState((prev) => ({
      ...prev,
      notifications: [newNotif, ...prev.notifications],
    }));
  };

  const markNotificationAsRead = (id: string) => {
    saveState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    }));
  };

  // Reset to initial demo state
  const resetDemoData = () => {
    const initial = getInitialState();
    setState(initial);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    isLoaded,
    currentUser: state.currentUser,
    setCurrentUser,
    loginAs,
    logout,
    courses: state.courses,
    enrolledCourses: state.courses.filter((c) => c.enrolled),
    enrollCourse,
    unenrollCourse,
    courseLimitModalOpen,
    setCourseLimitModalOpen,
    lessons: state.lessons,
    completeLesson,
    quizzes: state.quizzes,
    quizAttempts: state.quizAttempts,
    submitQuizAttempt,
    assignments: state.assignments,
    submitAssignment,
    streakDays: state.streakDays,
    currentStreak: state.currentStreak,
    longestStreak: state.longestStreak,
    totalActiveDays: state.totalActiveDays,
    learningHours: state.learningHours,
    achievements: state.achievements,
    certificates: state.certificates,
    notifications: state.notifications,
    addNotification,
    markNotificationAsRead,
    analytics: state.analytics,
    chatMessages: state.chatMessages,
    addChatMessage,
    resetDemoData,
  };
}
