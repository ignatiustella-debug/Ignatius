import React from 'react';
import { Course } from '../data/educareData';
import { CourseLogo } from './CourseLogo';
import { CheckCircle2, Download, ExternalLink, X, Laptop, ShieldCheck } from 'lucide-react';

interface StandaloneDownloadNoticeProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

export const StandaloneDownloadNotice: React.FC<StandaloneDownloadNoticeProps> = ({
  course,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 sm:p-7 shadow-2xl border border-stone-200">
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <CourseLogo courseId={course.id} size="md" />
            <div>
              <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wider font-mono">
                Standalone Offline App Ready
              </div>
              <h3 className="text-lg font-bold text-stone-900 font-display">
                {course.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-xs text-stone-600">
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-stone-900 text-sm">
                Your standalone course application has been downloaded!
              </p>
              <p className="text-emerald-900 text-xs mt-0.5">
                Saved as an independent, single-file offline application that you can use outside Educare anytime.
              </p>
            </div>
          </div>

          <div className="space-y-2 p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-stone-700">
            <div className="font-semibold text-stone-900 text-xs flex items-center gap-1.5">
              <Laptop className="w-4 h-4 text-amber-700" />
              <span>How to access this course outside Educare:</span>
            </div>
            <ul className="space-y-1.5 text-[11px] text-stone-600 list-disc ml-4">
              <li>
                <strong>Double-click or open</strong> the downloaded <code className="bg-stone-200 px-1 py-0.5 rounded font-mono text-[10px]">.html</code> file in any browser (Chrome, Edge, Safari, Firefox).
              </li>
              <li>
                <strong>100% Offline Access:</strong> Works in airplane mode, without Wi-Fi or cellular data, and outside Educare.
              </li>
              <li>
                <strong>Complete Curriculum:</strong> All <strong>5 Levels</strong> (Beginner, Intermediate, Pro) and all <strong>50 lessons</strong> are fully embedded.
              </li>
              <li>
                <strong>Progress Saved Locally:</strong> Check off completed lessons and take personal study notes that persist automatically.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-sm transition-colors cursor-pointer"
          >
            Got It, Let's Learn!
          </button>
        </div>
      </div>
    </div>
  );
};
