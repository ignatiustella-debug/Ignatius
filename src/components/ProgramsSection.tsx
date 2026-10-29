import React, { useState } from 'react';
import { COURSES, Course } from '../data/educareData';
import { CourseLogo } from './CourseLogo';
import { downloadCourseStandaloneApp } from '../utils/courseAppExporter';
import { StandaloneDownloadNotice } from './StandaloneDownloadNotice';
import {
  Search,
  ArrowRight,
  Globe,
  Layers,
  Download,
  BookOpen,
  Sparkles,
  Wifi,
} from 'lucide-react';

interface ProgramsSectionProps {
  onSelectCourse: (course: Course) => void;
  onOpenEnrollment?: (courseId?: string) => void;
  onOpenLiveApp?: (url: string, title: string) => void;
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({
  onSelectCourse,
  onOpenEnrollment,
  onOpenLiveApp,
}) => {
  const [selectedAgeTier, setSelectedAgeTier] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [downloadNoticeCourse, setDownloadNoticeCourse] = useState<Course | null>(null);

  const filteredCourses = COURSES.filter((course) => {
    const matchesAge = selectedAgeTier === 'all' || course.ageTier === selectedAgeTier;
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesAge && matchesCategory && matchesSearch;
  });

  const handleDownloadStandalone = (course: Course, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    downloadCourseStandaloneApp(course);
    setDownloadNoticeCourse(course);
  };

  return (
    <section id="programs" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2 flex items-center gap-2">
              <span>Curriculum & Learning Tracks</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-emerald-700 font-bold lowercase tracking-normal">100% open & free — no enrollment required</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 font-display">
              Programs Built for Real-World Competence
            </h2>
            <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
              Every course is 100% free with immediate, open access to all 5 levels and 50 lessons. Learn online or take each course outside Educare as an independent offline app.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search courses, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs text-stone-800 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-stone-200">
          {/* Age Tier Filter */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg overflow-x-auto">
            <button
              onClick={() => setSelectedAgeTier('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                selectedAgeTier === 'all'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Ages (6–18)
            </button>
            <button
              onClick={() => setSelectedAgeTier('explorers')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                selectedAgeTier === 'explorers'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Explorers (6–9)
            </button>
            <button
              onClick={() => setSelectedAgeTier('navigators')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                selectedAgeTier === 'navigators'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Navigators (10–13)
            </button>
            <button
              onClick={() => setSelectedAgeTier('innovators')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                selectedAgeTier === 'innovators'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Innovators (14–18)
            </button>
          </div>

          {/* Discipline Track Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs text-stone-600">
            <span className="text-stone-400 text-xs hidden lg:inline mr-1">Discipline:</span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-stone-900 text-stone-50 font-semibold'
                  : 'hover:bg-stone-100 text-stone-600'
              }`}
            >
              All Tracks
            </button>
            <button
              onClick={() => setSelectedCategory('stem-coding')}
              className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                selectedCategory === 'stem-coding'
                  ? 'bg-stone-900 text-stone-50 font-semibold'
                  : 'hover:bg-stone-100 text-stone-600'
              }`}
            >
              STEM & Coding
            </button>
            <button
              onClick={() => setSelectedCategory('arts-media')}
              className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                selectedCategory === 'arts-media'
                  ? 'bg-stone-900 text-stone-50 font-semibold'
                  : 'hover:bg-stone-100 text-stone-600'
              }`}
            >
              Creative Arts
            </button>
            <button
              onClick={() => setSelectedCategory('science-labs')}
              className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                selectedCategory === 'science-labs'
                  ? 'bg-stone-900 text-stone-50 font-semibold'
                  : 'hover:bg-stone-100 text-stone-600'
              }`}
            >
              Natural Sciences
            </button>
            <button
              onClick={() => setSelectedCategory('leadership-logic')}
              className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                selectedCategory === 'leadership-logic'
                  ? 'bg-stone-900 text-stone-50 font-semibold'
                  : 'hover:bg-stone-100 text-stone-600'
              }`}
            >
              Debate & Logic
            </button>
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="group flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-stone-200/90 bg-stone-50/50 hover:bg-white hover:border-amber-300 hover:shadow-lg transition-all"
              >
                <div>
                  {/* Course Header with Beautiful Custom Logo & Unboxed Metadata */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <CourseLogo courseId={course.id} size="md" />

                    <div className="text-right">
                      <div className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded inline-block">
                        Free Access ($0)
                      </div>
                      <div className="text-[10px] text-stone-500 font-mono mt-0.5">
                        Offline Ready
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                    <span className="font-semibold text-stone-800">{course.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{course.ageRange}</span>
                    <span aria-hidden="true">·</span>
                    <span>{course.duration}</span>
                  </div>

                  {/* 5-Level Curriculum Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-100/90 border border-amber-300/80 px-2 py-0.5 rounded font-mono">
                      5 Levels · 50 Lessons
                    </span>
                    <span className="text-[10px] text-stone-500 font-medium">
                      Beginner → Pro Track
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-bold text-stone-900 font-display group-hover:text-amber-800 transition-colors">
                    {course.title}
                  </h3>
                  <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                    {course.tagline}
                  </p>

                  {/* Live Web App Badge if present */}
                  {course.liveAppUrl && (
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenLiveApp?.(course.liveAppUrl!, course.title);
                        }}
                        className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300/80 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                      >
                        <Globe className="w-3.5 h-3.5 text-rose-700" />
                        <span className="font-bold text-rose-950">Open Team Grace App (AI Studio)</span>
                        <span className="text-[10px] bg-rose-200/80 px-1 py-0.2 rounded font-mono font-semibold ml-1">APP</span>
                      </button>
                    </div>
                  )}

                  {/* Standalone Outside Educare Banner - ATTACHED IN BOLD */}
                  <div className="mt-4 p-3 bg-gradient-to-r from-amber-50 to-orange-50/80 border border-amber-200/90 rounded-xl flex items-center justify-between gap-2">
                    <div className="text-xs">
                      <div className="text-amber-950">
                        <strong className="font-extrabold text-amber-950 tracking-tight">
                          Download on its own
                        </strong>
                      </div>
                      <div className="text-[10px] text-stone-600 mt-0.5">
                        Run full 50-lesson course outside Educare offline
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleDownloadStandalone(course, e)}
                      title="Download this course as a standalone app to use outside Educare"
                      className="px-3 py-1.5 text-xs font-bold text-white bg-stone-900 hover:bg-amber-700 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-400" />
                      <strong className="font-bold">Download on its own</strong>
                    </button>
                  </div>

                  {/* Core Highlights */}
                  <div className="mt-4 pt-3 border-t border-stone-200/80 space-y-1.5">
                    <span className="text-xs font-semibold text-stone-700 block">Focus Areas:</span>
                    <ul className="space-y-1 text-xs text-stone-600">
                      {course.highlights.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-stone-400 mt-1.5 shrink-0" />
                          <span className="line-clamp-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Bottom Meta & Actions - No Enrollment Barriers! */}
                <div className="mt-5 pt-4 border-t border-stone-200/80 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-stone-200 text-stone-800 flex items-center justify-center font-bold text-[10px]">
                        {course.leadMentor.avatar}
                      </div>
                      <span className="truncate max-w-[140px]">{course.leadMentor.name}</span>
                    </div>

                    <div className="text-xs text-emerald-800 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Immediate Access</span>
                    </div>
                  </div>

                  {/* Direct Launch & Explore Actions */}
                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectCourse(course)}
                      className="w-full py-2.5 px-3 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-stone-900" />
                      <span>Explore All 50 Lessons (Free)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-stone-50 rounded-2xl border border-stone-200">
            <p className="text-sm text-stone-600">
              No courses matched your current filter criteria. Try adjusting the age bracket or clear your search term.
            </p>
            <button
              onClick={() => {
                setSelectedAgeTier('all');
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-medium text-stone-800 bg-stone-200 hover:bg-stone-300 rounded-lg transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}
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
