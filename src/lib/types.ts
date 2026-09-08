export type UserRole = 'student' | 'parent' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  childId?: string; // For parent
  studentId?: string;
}

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Course {
  id: string;
  title: string;
  category: string;
  difficulty: DifficultyLevel;
  duration: string;
  lessonsCount: number;
  quizzesCount: number;
  exercisesCount: number;
  description: string;
  learningObjectives: string[];
  instructor: string;
  thumbnailColor: string;
  iconName: string;
  enrolled?: boolean;
  progress?: number; // 0-100
  isCompleted?: boolean;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  order: number;
  readTime: string;
  summary: string;
  content: string; // Markdown or rich HTML
  codeSnippet?: string;
  language?: string;
  keyPoints: string[];
  practiceQuestion?: {
    question: string;
    hint: string;
    starterCode?: string;
  };
  isCompleted?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  durationMinutes: number;
  questions: QuizQuestion[];
  passingScore: number;
  isProctored?: boolean;
  maxViolations?: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  score: number;
  total: number;
  percentage: number;
  completedAt: string;
  answers: number[];
  violationsCount?: number;
  isDisqualified?: boolean;
}

export type AssignmentStatus = 'Pending' | 'Submitted' | 'Graded' | 'Overdue';

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  deadline: string;
  maxPoints: number;
  status: AssignmentStatus;
  instructions: string;
  starterCode?: string;
  submittedContent?: string;
  submittedAt?: string;
  grade?: number;
  feedback?: string;
}

export interface StreakDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  isUnlocked: boolean;
  category: 'streak' | 'course' | 'quiz' | 'coding';
}

export interface Certificate {
  id: string;
  studentName: string;
  courseName: string;
  courseId: string;
  issuedAt?: string;
  certificateNumber?: string;
  instructor: string;
  grade?: string;
  isUnlocked: boolean;
  lessonsCompleted: number;
  totalLessons: number;
  quizPassed: boolean;
  quizScore?: number;
  requiredPassingScore: number;
}

export type NotificationType = 'info' | 'warning' | 'success' | 'alert';

export interface NotificationItem {
  id: string;
  recipientRole: 'all' | 'student' | 'parent' | 'admin';
  recipientId?: string;
  title: string;
  message: string;
  type: NotificationType;
  createdAt: string;
  read: boolean;
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  codeSnippet?: string;
  suggestions?: string[];
}

export interface SubjectAnalytics {
  subject: string;
  quizScores: number[];
  assignmentScores: number[];
  codingAccuracy: number;
  completedLessons: number;
  totalLessons: number;
  trend: 'up' | 'down' | 'stable';
  avgScore: number;
  highestScore: number;
  improvementPct: number;
}
