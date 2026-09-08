'use client';

import React from 'react';
import { Award, X, Download, Printer, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Certificate } from '@/lib/types';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: Certificate;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  certificate,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8 border border-amber-200/60">
        {/* Modal Top Actions */}
        <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="font-semibold text-sm tracking-wide">Official Verified Certificate</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-slate-200 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 text-xs bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold px-3 py-1.5 rounded-lg transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas Area */}
        <div className="p-8 sm:p-12 bg-[#fffdfa] border-8 border-double border-amber-300 relative select-none">
          {/* Subtle Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <Award className="w-96 h-96 text-amber-900" />
          </div>

          <div className="text-center relative z-10 space-y-6">
            {/* Header Badge */}
            <div className="inline-flex items-center justify-center p-3.5 bg-amber-50 rounded-full border border-amber-300 shadow-inner">
              <Award className="w-10 h-10 text-amber-600" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700">
                Smart Education Ecosystem • Accreditation Council
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-2">
                Certificate of Academic Excellence
              </h1>
              <p className="text-xs text-slate-500 mt-1">This is officially presented to confirm that</p>
            </div>

            {/* Recipient */}
            <div className="py-2 border-b-2 border-slate-300 max-w-md mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 font-serif tracking-wide">
                {certificate.studentName}
              </h2>
            </div>

            {/* Achievement Text */}
            <div className="max-w-xl mx-auto text-slate-700 text-sm leading-relaxed">
              has successfully completed all rigorous curriculums, interactive coding labs, timed evaluations, and projects for
              <div className="mt-2 text-xl font-bold text-slate-900 font-serif">
                {certificate.courseName}
              </div>
              <div className="text-xs text-emerald-700 font-semibold mt-1 flex items-center justify-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Awarded with {certificate.grade}</span>
              </div>
            </div>

            {/* Signatures & Credentials Grid */}
            <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center border-t border-slate-200 text-xs">
              <div>
                <div className="font-serif italic text-slate-800 text-base">{certificate.instructor}</div>
                <div className="border-t border-slate-300 mt-1 pt-1 text-slate-500 font-medium">
                  Course Director & Faculty Lead
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full border-2 border-amber-500 flex items-center justify-center text-amber-600 bg-amber-50 shadow-sm">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-[10px] text-amber-700 font-bold uppercase tracking-wider mt-1">
                  Verified SmartEdu Credential
                </span>
              </div>

              <div>
                <div className="font-mono text-slate-800 font-semibold">{certificate.issuedAt}</div>
                <div className="border-t border-slate-300 mt-1 pt-1 text-slate-500 font-medium">
                  Date of Issue
                </div>
              </div>
            </div>

            {/* Certificate ID */}
            <div className="text-[11px] font-mono text-slate-400">
              Certificate Identifier: <span className="font-bold text-slate-600">{certificate.certificateNumber}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
