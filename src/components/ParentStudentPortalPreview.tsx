import React, { useState } from 'react';
import { X, User, CheckCircle2, Clock, BookOpen, Award, FileText, ArrowRight, Download } from 'lucide-react';
import { EducareLogo } from './EducareLogo';

interface ParentStudentPortalPreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ParentStudentPortalPreview: React.FC<ParentStudentPortalPreviewProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeRole, setActiveRole] = useState<'parent' | 'student'>('parent');
  const [downloadNotice, setDownloadNotice] = useState(false);

  if (!isOpen) return null;

  const handleSimulateDownload = () => {
    setDownloadNotice(true);
    setTimeout(() => setDownloadNotice(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-4xl w-full border border-stone-200 shadow-2xl overflow-hidden my-8">
        {/* Top bar with role switch */}
        <div className="px-6 py-4 border-b border-stone-200 bg-stone-900 text-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <EducareLogo size="xs" />
            <div>
              <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                Educare Portal Simulation
              </div>
              <div className="text-sm font-bold font-display text-white">
                Student & Family Experience Preview
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Role Switcher */}
            <div className="flex items-center p-1 bg-stone-800 rounded-lg text-xs">
              <button
                onClick={() => setActiveRole('parent')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  activeRole === 'parent'
                    ? 'bg-white text-stone-900 font-semibold'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                Parent View
              </button>
              <button
                onClick={() => setActiveRole('student')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  activeRole === 'student'
                    ? 'bg-white text-stone-900 font-semibold'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                Student View
              </button>
            </div>

            <button
              onClick={onClose}
              className="text-stone-400 hover:text-white transition-colors p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dashboard Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto bg-stone-50">
          {/* Student Profile Header */}
          <div className="p-5 rounded-xl bg-white border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center text-lg font-bold font-display">
                MK
              </div>
              <div>
                <h4 className="text-lg font-bold text-stone-900 font-display">
                  Maya Kovacs · Age 13
                </h4>
                <div className="text-xs text-stone-500 mt-0.5">
                  Cohort: Navigators Applied Robotics & IoT · Lead Mentor: Dr. Aris Thorne
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSimulateDownload}
                className="px-3.5 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Term Transcript</span>
              </button>
            </div>
          </div>

          {downloadNotice && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Simulated download: Maya_Kovacs_Term2_Progress_Report.pdf generated successfully.</span>
            </div>
          )}

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white border border-stone-200">
              <div className="text-xs text-stone-500">Attendance</div>
              <div className="text-2xl font-bold text-stone-900 font-display tabular-nums mt-1">
                96%
              </div>
              <div className="text-[11px] text-emerald-700 mt-0.5">11 of 12 Sessions</div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-stone-200">
              <div className="text-xs text-stone-500">Capstone Status</div>
              <div className="text-2xl font-bold text-stone-900 font-display tabular-nums mt-1">
                Stage 4
              </div>
              <div className="text-[11px] text-stone-500 mt-0.5">Telemetry Tuning</div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-stone-200">
              <div className="text-xs text-stone-500">Milestone Badges</div>
              <div className="text-2xl font-bold text-stone-900 font-display tabular-nums mt-1">
                7 / 8
              </div>
              <div className="text-[11px] text-stone-500 mt-0.5">ESP32 & Soldering</div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-stone-200">
              <div className="text-xs text-stone-500">Next Lab Session</div>
              <div className="text-2xl font-bold text-stone-900 font-display mt-1">
                Thu 4:30 PM
              </div>
              <div className="text-[11px] text-stone-500 mt-0.5">Maker Lab B</div>
            </div>
          </div>

          {/* Mentor Feedback & Insights */}
          <div className="p-5 rounded-xl bg-white border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                Weekly Mentor Observation & Coaching Note
              </div>
              <span className="text-xs text-stone-400">Recorded Yesterday</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-stone-50 p-3.5 rounded-lg border border-stone-100">
              "Maya successfully resolved an elusive timing jitter on her rover's pulse-width modulation motor controller. Rather than swapping out hardware prematurely, she used the oscilloscope to trace the voltage drop. She also stepped up to assist her teammate Noah with ESP32 pinout wiring. Exceptional analytical poise."
            </p>
            <div className="text-xs text-stone-500 flex items-center justify-between">
              <span>Feedback provided by Dr. Aris Thorne</span>
              <span className="text-stone-400">Term 2026</span>
            </div>
          </div>

          {/* Milestones Checklist */}
          <div className="p-5 rounded-xl bg-white border border-stone-200">
            <div className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-3">
              Term Learning Objectives & Competencies
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium text-stone-900">Breadboarding, Resistor Networks & Ohm's Law Validation</span>
                </div>
                <span className="text-emerald-800 font-semibold">Mastered</span>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium text-stone-900">Parametric CAD Chassis Modeling & 3D Printing Tolerances</span>
                </div>
                <span className="text-emerald-800 font-semibold">Mastered</span>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium text-stone-900">Ultrasonic Echo Distance Calculation & PID Motor Feedback</span>
                </div>
                <span className="text-emerald-800 font-semibold">Mastered</span>
              </div>

              <div className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span className="font-medium text-stone-900">Final Obstacle Course Run & Technical Presentation</span>
                </div>
                <span className="text-amber-800 font-semibold">In Progress (Week 12)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            Parents receive real-time SMS attendance alerts and weekly portfolio updates.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
