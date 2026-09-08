'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Video,
  VideoOff,
  ShieldAlert,
  ShieldCheck,
  Eye,
  AlertTriangle,
  Volume2,
  Maximize,
  Sparkles,
} from 'lucide-react';

interface WebcamProctorHUDProps {
  violationsCount: number;
  maxViolations?: number;
  isDisqualified?: boolean;
}

export const WebcamProctorHUD: React.FC<WebcamProctorHUDProps> = ({
  violationsCount,
  maxViolations = 3,
  isDisqualified = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isSimulated, setIsSimulated] = useState(false);
  const [audioLevel, setAudioLevel] = useState(25);

  // Initialize webcam
  useEffect(() => {
    let stream: MediaStream | null = null;

    async function setupCamera() {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 320, height: 240 },
            audio: false,
          });

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            setHasCamera(true);
            setCameraError(null);
          }
        } else {
          setCameraError('Camera API not available in current context');
          setIsSimulated(true);
        }
      } catch (err: any) {
        console.warn('Webcam permission not granted, switching to AI proctor simulation:', err);
        setCameraError(err.message || 'Permission denied');
        setIsSimulated(true);
      }
    }

    setupCamera();

    // Audio level fluctuation simulation
    const audioInterval = setInterval(() => {
      setAudioLevel(Math.floor(Math.random() * 30) + 15);
    }, 1200);

    return () => {
      clearInterval(audioInterval);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="fixed top-20 right-6 z-40 w-64 bg-slate-900/95 backdrop-blur-md rounded-2xl border-2 border-slate-700 shadow-2xl overflow-hidden animate-fadeIn select-none text-white">
      {/* HUD Header */}
      <div className="px-3 py-2 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between text-[11px]">
        <div className="flex items-center space-x-1.5 font-bold">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span className="text-rose-400">AI PROCTOR LIVE</span>
        </div>
        <span
          className={`px-2 py-0.5 rounded-md font-mono font-bold text-[10px] ${
            violationsCount > 0 ? 'bg-rose-500 text-white' : 'bg-emerald-500/20 text-emerald-400'
          }`}
        >
          Strikes: {violationsCount} / {maxViolations}
        </span>
      </div>

      {/* Camera Feed Screen */}
      <div className="relative h-36 bg-slate-950 flex items-center justify-center overflow-hidden">
        {hasCamera && !isSimulated ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover transform -scale-x-100"
          />
        ) : (
          /* Simulated AI Proctor Stream */
          <div className="w-full h-full bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 flex flex-col items-center justify-center p-3 text-center space-y-1 relative">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-indigo-600/30 border-2 border-indigo-400 border-dashed animate-spin flex items-center justify-center">
                <Eye className="w-6 h-6 text-indigo-300" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-900" />
            </div>
            <span className="text-[11px] font-bold text-slate-200">AI Computer Vision Active</span>
            <span className="text-[9px] text-slate-400">
              {cameraError ? 'Demo Emulation Active (Testing Mode)' : 'Biometric Stream'}
            </span>
          </div>
        )}

        {/* Bounding Box Overlay */}
        <div className="absolute inset-3 border border-emerald-500/40 rounded-xl pointer-events-none flex flex-col justify-between p-1.5">
          <div className="flex justify-between items-center text-[9px] text-emerald-400 font-mono">
            <span>[FACE_01 DETECTED]</span>
            <span>99.4%</span>
          </div>
          <div className="flex justify-between items-center text-[9px] text-emerald-400 font-mono">
            <span>GAZE: CENTERED</span>
            <span>AUDIO: NORMAL</span>
          </div>
        </div>

        {/* Disqualified Alert Overlay */}
        {isDisqualified && (
          <div className="absolute inset-0 bg-rose-950/90 flex flex-col items-center justify-center p-3 text-center space-y-1 z-10">
            <ShieldAlert className="w-8 h-8 text-rose-500 animate-bounce" />
            <span className="text-xs font-bold text-white">DISQUALIFIED</span>
            <span className="text-[10px] text-rose-200">Cheating Violations Exceeded</span>
          </div>
        )}
      </div>

      {/* Real-time Status Indicators */}
      <div className="p-2.5 bg-slate-950 space-y-1.5 text-[10px] border-t border-slate-800">
        <div className="flex items-center justify-between text-slate-300">
          <span className="flex items-center space-x-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>Clipboard Lockdown</span>
          </span>
          <span className="text-emerald-400 font-semibold font-mono">SECURE</span>
        </div>

        <div className="flex items-center justify-between text-slate-300">
          <span className="flex items-center space-x-1">
            <Eye className="w-3 h-3 text-blue-400" />
            <span>Tab Switch Monitor</span>
          </span>
          <span className="text-blue-400 font-semibold font-mono">ACTIVE</span>
        </div>

        <div className="flex items-center justify-between text-slate-300">
          <span className="flex items-center space-x-1">
            <Volume2 className="w-3 h-3 text-purple-400" />
            <span>Room Audio Level</span>
          </span>
          <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all"
              style={{ width: `${audioLevel}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
