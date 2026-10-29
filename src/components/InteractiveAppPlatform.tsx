import React, { useState } from 'react';
import { COURSES, Course } from '../data/educareData';
import { CourseLogo } from './CourseLogo';
import { PracticeSandbox } from './PracticeSandbox';
import { downloadCourseStandaloneApp } from '../utils/courseAppExporter';
import { StandaloneDownloadNotice } from './StandaloneDownloadNotice';
import {
  BookOpen,
  Sparkles,
  Download,
  CheckCircle2,
  Play,
  ArrowRight,
  Layers,
  Search,
  Filter,
  GraduationCap,
  ChevronRight,
  Globe,
  Award,
} from 'lucide-react';

interface InteractiveAppPlatformProps {
  onSelectCourseForStudy: (course: Course) => void;
  onOpenLiveApp?: (url: string, title: string) => void;
}

export const InteractiveAppPlatform: React.FC<InteractiveAppPlatformProps> = ({
  onSelectCourseForStudy,
  onOpenLiveApp,
}) => {
  const [activeAppId, setActiveAppId] = useState<string>('python-game-ai');
  const [platformMode, setPlatformMode] = useState<'study' | 'practise'>('practise');
  const [downloadNoticeCourse, setDownloadNoticeCourse] = useState<Course | null>(null);
  const [filterQuery, setFilterQuery] = useState<string>('');

  const currentCourse = COURSES.find((c) => c.id === activeAppId) || COURSES[0];

  const filteredApps = COURSES.filter((c) => {
    return (
      c.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
      c.tagline.toLowerCase().includes(filterQuery.toLowerCase()) ||
      c.categoryLabel.toLowerCase().includes(filterQuery.toLowerCase())
    );
  });

  const handleDownload = (course: Course, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    downloadCourseStandaloneApp(course);
    setDownloadNoticeCourse(course);
  };

  return (
    <section id="app-platform" className="py-16 sm:py-24 bg-stone-900 text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-stone-800">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded-full mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Interactive Learning & Practice Platform</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
              Choose an App to Study or Practise
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-300 max-w-2xl leading-relaxed">
              Every course inside Educare operates as an interactive learning application. Study all 50 lessons or enter the live sandbox to practise hands-on skills with instant feedback.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center p-1 bg-stone-950 rounded-xl border border-stone-800 self-start md:self-auto">
            <button
              onClick={() => setPlatformMode('practise')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                platformMode === 'practise'
                  ? 'bg-amber-400 text-stone-950 shadow-md'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Practise Sandbox</span>
            </button>
            <button
              onClick={() => setPlatformMode('study')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                platformMode === 'study'
                  ? 'bg-amber-400 text-stone-950 shadow-md'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Study Curriculum</span>
            </button>
          </div>
        </div>

        {/* 7 Interactive App Tiles Carousel / Grid */}
        <div className="mb-10">
          <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>Select from {COURSES.length} Educare Applications:</span>
            <span className="text-amber-400 font-mono">100% Free · Offline Capable</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {COURSES.map((course) => {
              const isActive = course.id === activeAppId;

              return (
                <button
                  key={course.id}
                  onClick={() => setActiveAppId(course.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                    isActive
                      ? 'bg-stone-800/90 border-amber-400 ring-2 ring-amber-400/50 shadow-xl scale-[1.02]'
                      : 'bg-stone-950/70 border-stone-800 hover:border-stone-700 hover:bg-stone-800/50'
                  }`}
                >
                  {/* Top Bar with Logo & Tag */}
                  <div className="flex items-center justify-between gap-1 mb-2.5">
                    <CourseLogo courseId={course.id} size="sm" />
                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-stone-900 border border-stone-700 text-stone-300 font-mono">
                      5 Lvl
                    </span>
                  </div>

                  {/* Title & Age */}
                  <div>
                    <h4 className="text-xs font-bold text-white line-clamp-2 leading-tight group-hover:text-amber-300 transition-colors">
                      {course.title}
                    </h4>
                    <p className="text-[10px] text-stone-400 mt-1 line-clamp-1">
                      {course.categoryLabel}
                    </p>
                  </div>

                  {/* Active Indicator Pin */}
                  {isActive && (
                    <div className="mt-2.5 pt-2 border-t border-stone-700/80 flex items-center justify-between text-[10px] text-amber-300 font-bold font-mono">
                      <span>ACTIVE</span>
                      <span>50 Lessons</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected App Stage: Practise or Study Mode */}
        {platformMode === 'practise' ? (
          <div className="space-y-6">
            <PracticeSandbox
              course={currentCourse}
              onOpenStudyMode={() => onSelectCourseForStudy(currentCourse)}
            />
          </div>
        ) : (
          /* Study Mode Overview */
          <div className="bg-stone-950 rounded-2xl border border-stone-800 p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
              <div className="flex items-center gap-4">
                <CourseLogo courseId={currentCourse.id} size="xl" />
                <div>
                  <div className="flex items-center gap-2 text-xs text-stone-400 mb-1">
                    <span className="font-semibold text-amber-400">{currentCourse.categoryLabel}</span>
                    <span>·</span>
                    <span>{currentCourse.ageRange}</span>
                    <span>·</span>
                    <span className="font-bold text-emerald-400">100% Free Access</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-display">
                    {currentCourse.title}
                  </h3>
                  <p className="text-xs text-stone-300 mt-1 max-w-2xl leading-relaxed">
                    {currentCourse.tagline}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {currentCourse.liveAppUrl && onOpenLiveApp && (
                  <button
                    onClick={() => onOpenLiveApp(currentCourse.liveAppUrl!, currentCourse.title)}
                    className="px-4 py-2.5 text-xs font-black text-slate-950 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{currentCourse.liveAppLabel || 'Launch Interactive App'}</span>
                  </button>
                )}

                <button
                  onClick={() => onSelectCourseForStudy(currentCourse)}
                  className="px-4 py-2.5 text-xs font-bold text-white bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-xl shadow-sm transition flex items-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>5-Level Syllabus (50 Lessons)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={(e) => handleDownload(currentCourse, e)}
                  className="px-4 py-2.5 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 border border-amber-400/40 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <strong className="font-bold">Download on its own</strong>
                </button>
              </div>
            </div>

            {/* 5 Levels Road Map Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {(currentCourse.levels || []).map((lvl) => (
                <div
                  key={lvl.levelNumber}
                  className="p-4 rounded-xl bg-stone-900 border border-stone-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold text-stone-400 mb-1">
                      <span>LEVEL {lvl.levelNumber}</span>
                      <span className="text-amber-400">{lvl.tier}</span>
                    </div>
                    <div className="text-xs font-semibold text-white line-clamp-2">
                      {lvl.title.replace(/^Level \d+:\s*/, '')}
                    </div>
                  </div>
                  <div className="text-[10px] text-stone-400 font-mono mt-3 pt-2 border-t border-stone-800/80 space-y-1">
                    <div>10 Lessons · Labs Included</div>
                    <div className="text-amber-400 font-bold flex items-center gap-1">
                      <Award className="w-3 h-3 text-amber-400" />
                      <span>Exam & Real Diploma</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Banner with Standalone Offline App Guarantee */}
        <div className="mt-8 p-4 bg-stone-950 rounded-2xl border border-stone-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold">
              ✓
            </div>
            <div>
              <span className="font-bold text-stone-200">
                Want to study or practice any of these apps outside Educare?
              </span>
              <p className="text-stone-400 text-[11px] mt-0.5">
                Click <strong className="text-white font-bold">"Download on its own"</strong> on any course app to get an offline standalone application file that runs without internet!
              </p>
            </div>
          </div>

          <button
            onClick={() => handleDownload(currentCourse)}
            className="px-4 py-2 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition cursor-pointer self-start sm:self-auto shrink-0 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-stone-950" />
            <strong className="font-bold">Download on its own</strong>
          </button>
        </div>
      </div>

      {/* Standalone Download Confirmation Notice */}
      <StandaloneDownloadNotice
        course={downloadNoticeCourse}
        isOpen={!!downloadNoticeCourse}
        onClose={() => setDownloadNoticeCourse(null)}
      />
    </section>
  );
};
