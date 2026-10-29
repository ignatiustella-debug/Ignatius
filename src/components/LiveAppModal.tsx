import React from 'react';
import { X, Globe, CheckCircle2, ArrowRight, Laptop, Play } from 'lucide-react';

interface LiveAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnroll: (courseId?: string) => void;
  onLaunchInApp?: () => void;
  appUrl?: string;
  appTitle?: string;
}

export const LiveAppModal: React.FC<LiveAppModalProps> = ({
  isOpen,
  onClose,
  onEnroll,
  onLaunchInApp,
  appUrl = 'https://team-grace.aistudio.app',
  appTitle = 'Team Grace Web App',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-4xl w-full border border-stone-200 shadow-2xl overflow-hidden my-6 relative flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="p-5 sm:p-6 border-b border-stone-200 bg-stone-50 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-stone-900 flex items-center justify-center font-bold text-sm shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                  Featured Live Learning Track
                </span>
                <span className="text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-medium">
                  Google AI Studio App
                </span>
              </div>
              <h3 className="text-xl font-bold text-stone-900 font-display">
                {appTitle} · <span className="font-mono text-sm text-stone-600">Built in Google AI Studio</span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onLaunchInApp && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onLaunchInApp();
                }}
                className="px-3.5 py-1.5 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Launch Interactive App</span>
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Overview Banner */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-stone-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <strong className="text-stone-900 font-semibold block text-sm">
                What youth learn in this engineering module:
              </strong>
              <p className="mt-0.5 text-stone-600">
                Students deconstruct and recreate full-stack web applications like <strong>Team Grace</strong>—learning modern responsive layouts, reactive states, API logic, and rapid development tools in Google AI Studio.
              </p>
            </div>
            {onLaunchInApp && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onLaunchInApp();
                }}
                className="text-xs font-bold text-stone-900 bg-amber-300 hover:bg-amber-400 px-3 py-1.5 rounded-lg shrink-0 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Launch Full App</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Interactive Preview Container */}
          <div className="border border-stone-300 rounded-xl overflow-hidden bg-stone-900 shadow-inner">
            {/* Browser chrome header */}
            <div className="px-4 py-2.5 bg-stone-800 border-b border-stone-700 flex items-center justify-between text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-stone-400 text-[11px] truncate max-w-xs sm:max-w-md">
                  Google AI Studio · Team Grace Interactive App
                </span>
              </div>
              {onLaunchInApp && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onLaunchInApp();
                  }}
                  className="text-[11px] text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Full Screen App</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* In-app preview prompt */}
            <div className="w-full h-[320px] bg-stone-900 text-stone-100 flex flex-col items-center justify-center p-8 text-center relative">
              <div className="w-14 h-14 rounded-2xl bg-stone-800 border border-stone-700 flex items-center justify-center text-amber-400 mb-4 shadow-lg">
                <Laptop className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold font-display text-white">
                Team Grace Web Application
              </h4>
              <p className="text-xs text-stone-400 max-w-md mt-2 mb-6">
                Directly ported and runnable within Educare. Includes interactive sprint planning board, youth community feed, real-time task manager, and project portfolio.
              </p>
              {onLaunchInApp && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onLaunchInApp();
                  }}
                  className="px-6 py-3 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-transform hover:scale-[1.02]"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Launch In-App Experience</span>
                </button>
              )}
            </div>
          </div>

          {/* Curriculum Learning Objectives for this app */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-stone-900 font-display uppercase tracking-wider">
              Core Competencies Mastered Through This Project:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-lg border border-stone-200 bg-stone-50/70 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-900 block">Modern Component Architecture</span>
                  <span className="text-stone-500 mt-0.5 block">
                    Building modular, reusable UI components with React, TypeScript, and utility-first styling.
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-lg border border-stone-200 bg-stone-50/70 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-900 block">Google AI Studio Workflows</span>
                  <span className="text-stone-500 mt-0.5 block">
                    Leveraging AI Studio engineering patterns to move from conceptual architecture to working software.
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-lg border border-stone-200 bg-stone-50/70 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-900 block">Interactive State & Workspaces</span>
                  <span className="text-stone-500 mt-0.5 block">
                    Managing Kanban tasks, peer feedback loops, form actions, and client-side view routers.
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-lg border border-stone-200 bg-stone-50/70 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-900 block">100% Free Access Charter</span>
                  <span className="text-stone-500 mt-0.5 block">
                    All lab workstations, cloud accounts, and developer tooling provided at zero cost ($0).
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-stone-200 bg-stone-50 flex items-center justify-between gap-4 shrink-0">
          <div className="text-xs text-stone-500">
            Course: <strong>Team Grace Full-Stack Web & App Engineering</strong> (Ages 12–18 · 100% Free)
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onEnroll('team-grace-web-studio');
              }}
              className="px-5 py-2.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Enroll for Free ($0)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
