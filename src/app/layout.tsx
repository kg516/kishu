import type { Metadata } from 'next';
import './globals.css';
import { EduAIAssistant } from '@/components/ai/EduAIAssistant';

export const metadata: Metadata = {
  title: 'SmartEdu — Intelligent Learning Ecosystem',
  description: 'An intelligent digital education platform connecting Students, Parents, and Administrators with personalized learning, multi-language coding, AI assistance, and progress tracking.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col font-sans antialiased">
        {children}
        <EduAIAssistant />
      </body>
    </html>
  );
}
