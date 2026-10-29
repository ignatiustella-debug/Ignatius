import React, { useState } from 'react';
import { Course, CourseLevel, CourseLesson } from '../data/educareData';
import { CourseLogo } from './CourseLogo';
import { downloadCourseStandaloneApp } from '../utils/courseAppExporter';
import { PracticeSandbox } from './PracticeSandbox';
import { CertificateModal } from './CertificateModal';
import { EducareUser } from '../types/auth';
import {
  X,
  Check,
  Clock,
  Award,
  Wrench,
  ArrowRight,
  Globe,
  Layers,
  Sparkles,
  BookOpen,
  ChevronRight,
  CheckCircle2,
  FlaskConical,
  GraduationCap,
  Download,
  Play,
  RotateCcw,
  Mail,
  Volume2,
  VolumeX,
  Bot,
  HelpCircle,
} from 'lucide-react';
import { UniversalAITutor } from './UniversalAITutor';

interface CourseModalProps {
  course: Course | null;
  onClose: () => void;
  onOpenLiveApp?: (url: string, title: string) => void;
  initialMode?: 'study' | 'practise';
  currentUser?: EducareUser | null;
}

export const CourseModal: React.FC<CourseModalProps> = ({
  course,
  onClose,
  onOpenLiveApp,
  initialMode = 'study',
  currentUser,
}) => {
  const [modalTab, setModalTab] = useState<'study' | 'practise'>(initialMode);
  const [selectedLevelIdx, setSelectedLevelIdx] = useState<number>(0);
  const [expandedLessonNum, setExpandedLessonNum] = useState<number | null>(null);
  const [certModalOpen, setCertModalOpen] = useState<boolean>(false);
  const [speakingLessonNum, setSpeakingLessonNum] = useState<number | null>(null);
  const [completedLessons, setCompletedLessons] = useState<{ [key: string]: boolean }>(() => {
    if (!course) return {};
    try {
      const saved = localStorage.getItem(`educare_study_progress_${course.id}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleReadLesson = (lesson: CourseLesson) => {
    if (!('speechSynthesis' in window)) return;
    if (speakingLessonNum === lesson.lessonNumber) {
      window.speechSynthesis.cancel();
      setSpeakingLessonNum(null);
      return;
    }
    window.speechSynthesis.cancel();
    const text = `Lesson ${lesson.lessonNumber}: ${lesson.title}. Duration: ${lesson.durationMinutes} minutes. Description: ${lesson.description}. Practical hands-on lab: ${lesson.practicalLab}. Skills learned: ${lesson.skillsLearned.join(', ')}. Key deliverable: ${lesson.keyDeliverable || 'Complete lab milestone'}.`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.onend = () => setSpeakingLessonNum(null);
    utterance.onerror = () => setSpeakingLessonNum(null);
    setSpeakingLessonNum(lesson.lessonNumber);
    window.speechSynthesis.speak(utterance);
  };

  if (!course) return null;

  const levels: CourseLevel[] = course.levels || [];
  const currentLevel: CourseLevel | undefined = levels[selectedLevelIdx] || levels[0];

  const toggleLessonCompleted = (levelNum: number, lessonNum: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const key = `L${levelNum}_#${lessonNum}`;
    const next = { ...completedLessons, [key]: !completedLessons[key] };
    setCompletedLessons(next);
    try {
      localStorage.setItem(`educare_study_progress_${course.id}`, JSON.stringify(next));
    } catch (err) {
      console.warn('Failed to save progress:', err);
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Beginner':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
          badge: 'bg-emerald-600 text-white',
          tabActive: 'bg-emerald-700 text-white ring-2 ring-emerald-600',
          tabInactive: 'bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100',
          dot: 'bg-emerald-500',
        };
      case 'Intermediate':
        return {
          bg: 'bg-sky-50 text-sky-800 border-sky-300',
          badge: 'bg-sky-600 text-white',
          tabActive: 'bg-sky-700 text-white ring-2 ring-sky-600',
          tabInactive: 'bg-sky-50 text-sky-900 border border-sky-200 hover:bg-sky-100',
          dot: 'bg-sky-500',
        };
      case 'Pro':
        return {
          bg: 'bg-purple-50 text-purple-900 border-purple-300',
          badge: 'bg-purple-700 text-white',
          tabActive: 'bg-purple-800 text-white ring-2 ring-purple-700',
          tabInactive: 'bg-purple-50 text-purple-950 border border-purple-200 hover:bg-purple-100',
          dot: 'bg-purple-600',
        };
      default:
        return {
          bg: 'bg-stone-50 text-stone-800 border-stone-200',
          badge: 'bg-stone-700 text-white',
          tabActive: 'bg-stone-900 text-white',
          tabInactive: 'bg-stone-100 text-stone-700 hover:bg-stone-200',
          dot: 'bg-stone-500',
        };
    }
  };

  const completedCount = Object.values(completedLessons).filter(Boolean).length;
  const progressPct = Math.round((completedCount / 50) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div
        className="bg-white rounded-2xl max-w-5xl w-full border border-stone-200 shadow-2xl overflow-hidden relative my-6 flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="course-modal-title"
      >
        {/* Header Bar with Course Logo & Bold Download Action */}
        <div className="p-5 sm:p-6 border-b border-stone-200 bg-stone-50 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <CourseLogo courseId={course.id} size="lg" />
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mb-1.5">
                <span className="font-semibold text-stone-800">{course.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{course.ageRange}</span>
                <span aria-hidden="true">·</span>
                <span>{course.duration}</span>
                <span aria-hidden="true">·</span>
                <span className="font-bold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded text-[11px]">
                  100% Free Tuition ($0)
                </span>
              </div>
              <h3 id="course-modal-title" className="text-xl sm:text-2xl font-bold text-stone-900 font-display">
                {course.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
                {course.tagline}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {course.liveAppUrl && onOpenLiveApp && (
              <button
                onClick={() => {
                  onClose();
                  onOpenLiveApp(course.liveAppUrl!, course.title);
                }}
                className="px-3 py-1.5 text-xs font-black text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Launch App</span>
              </button>
            )}

            <button
              onClick={() => downloadCourseStandaloneApp(course)}
              title="Download standalone offline application outside Educare"
              className="px-3 py-1.5 text-xs font-bold text-stone-900 bg-stone-200 hover:bg-stone-300 border border-stone-300 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Download className="w-3.5 h-3.5 text-stone-900" />
              <strong className="font-bold">Download on its own</strong>
            </button>

            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition-colors cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Study Mode vs Practise Mode Tab Bar */}
        <div className="px-6 py-2.5 bg-stone-100 border-b border-stone-200 flex items-center justify-between gap-4 flex-wrap text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setModalTab('study')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                modalTab === 'study'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              <span>Study Lessons (5 Levels · 50 Lessons)</span>
            </button>

            <button
              onClick={() => setModalTab('practise')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                modalTab === 'practise'
                  ? 'bg-stone-900 text-amber-400 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Practise Sandbox (Interactive Simulator)</span>
            </button>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-stone-600">
            <span>Offline Saved: {completedCount}/50 Lessons ({progressPct}%)</span>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
          {modalTab === 'practise' ? (
            <PracticeSandbox
              course={course}
              onOpenStudyMode={() => setModalTab('study')}
            />
          ) : (
            <>
              {/* Quick Specifications */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-stone-100/70 border border-stone-200 text-xs">
                <div>
                  <span className="text-stone-500 block">Class Schedule</span>
                  <span className="font-semibold text-stone-900 mt-0.5 block">{course.cohortSchedule}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Class Ratio</span>
                  <span className="font-semibold text-stone-900 mt-0.5 block">{course.classSize}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Access Status</span>
                  <span className="font-bold text-emerald-800 mt-0.5 block">
                    Immediate Free Access
                  </span>
                </div>
                <div>
                  <span className="text-stone-500 block">Tuition & Supplies</span>
                  <span className="font-bold text-emerald-800 mt-0.5 block">
                    100% Free ($0)
                  </span>
                </div>
              </div>

              {/* Interactive 5-Level Curriculum Selector */}
              <div className="border border-stone-200 rounded-2xl p-5 sm:p-6 bg-stone-50/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-amber-700" />
                      <h4 className="text-base font-bold text-stone-900 font-display">
                        Interactive 5-Level Curriculum & Lesson Explorer
                      </h4>
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Select any level below to review its 10 lessons, hands-on lab challenges, and competencies.
                    </p>
                  </div>

                  <div className="text-xs font-semibold text-stone-600 bg-white border border-stone-200 px-3 py-1 rounded-md self-start sm:self-auto">
                    Total: 50 Lessons
                  </div>
                </div>

                {/* Level Tabs (5 Levels) */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-5">
                  {levels.map((lvl, idx) => {
                    const isSelected = selectedLevelIdx === idx;
                    const colors = getTierColor(lvl.tier);

                    return (
                      <button
                        key={lvl.levelNumber}
                        onClick={() => {
                          setSelectedLevelIdx(idx);
                          setExpandedLessonNum(null);
                        }}
                        className={`p-3 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? colors.tabActive + ' shadow-md scale-[1.02]'
                            : colors.tabInactive
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-[11px] font-bold uppercase tracking-wider opacity-90">
                              Level {lvl.levelNumber}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-1.5 py-0.2 rounded font-mono ${
                                isSelected ? 'bg-white/20 text-white' : 'bg-stone-200/80 text-stone-800'
                              }`}
                            >
                              {lvl.tier}
                            </span>
                          </div>
                          <div className="text-xs font-semibold line-clamp-1 leading-tight">
                            {lvl.title.replace(/^Level \d+:\s*/, '')}
                          </div>
                        </div>

                        <div className="text-[10px] opacity-80 mt-2 font-mono flex items-center justify-between">
                          <span>10 Lessons</span>
                          <span>~{lvl.estimatedHours}h</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Active Level Header & Details Card */}
                {currentLevel && (
                  <div className="p-4 sm:p-5 rounded-xl bg-white border border-stone-200 shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-stone-100">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                              getTierColor(currentLevel.tier).badge
                            }`}
                          >
                            {currentLevel.tier} Level
                          </span>
                          <span className="text-xs text-stone-500 font-medium font-mono">
                            Level {currentLevel.levelNumber} of 5
                          </span>
                        </div>
                        <h5 className="text-lg font-bold text-stone-900 font-display">
                          {currentLevel.title}
                        </h5>
                        <p className="text-xs text-stone-600 mt-1 max-w-2xl leading-relaxed">
                          {currentLevel.description}
                        </p>
                      </div>

                      <div className="text-right shrink-0 flex flex-col items-end">
                        <div className="text-xs text-stone-500 font-mono">Estimated Duration</div>
                        <div className="text-sm font-bold text-stone-800 font-mono">
                          {currentLevel.estimatedHours} Hours
                        </div>
                        <button
                          onClick={() => setCertModalOpen(true)}
                          className="mt-2 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors shrink-0"
                        >
                          <Award className="w-3.5 h-3.5 fill-current" />
                          <span>Level {currentLevel.levelNumber} Exam & Certificate</span>
                        </button>
                      </div>
                    </div>

                    {/* 10 Lessons List for Active Level */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                          10 Lessons in Level {currentLevel.levelNumber}:
                        </span>
                        <span className="text-[11px] text-stone-500">
                          Click any lesson to inspect description & practical lab
                        </span>
                      </div>

                      <div className="space-y-2">
                        {currentLevel.lessons.map((lesson) => {
                          const isExpanded = expandedLessonNum === lesson.lessonNumber;
                          const lessonKey = `L${currentLevel.levelNumber}_#${lesson.lessonNumber}`;
                          const isDone = !!completedLessons[lessonKey];

                          return (
                            <div
                              key={lesson.lessonNumber}
                              className={`rounded-xl border transition-all overflow-hidden ${
                                isDone
                                  ? 'border-emerald-300 bg-emerald-50/30'
                                  : isExpanded
                                  ? 'border-amber-400 bg-amber-50/30 shadow-xs'
                                  : 'border-stone-200 bg-stone-50/70 hover:bg-stone-50'
                              }`}
                            >
                              <div
                                onClick={() =>
                                  setExpandedLessonNum(isExpanded ? null : lesson.lessonNumber)
                                }
                                className="p-3.5 flex items-center justify-between gap-3 cursor-pointer select-none"
                              >
                                <div className="flex items-center gap-3">
                                  <button
                                    onClick={(e) =>
                                      toggleLessonCompleted(currentLevel.levelNumber, lesson.lessonNumber, e)
                                    }
                                    title={isDone ? 'Mark as incomplete' : 'Mark as complete'}
                                    className="p-1 text-stone-400 hover:text-emerald-700 transition"
                                  >
                                    <CheckCircle2
                                      className={`w-4 h-4 ${
                                        isDone ? 'text-emerald-600 fill-emerald-100' : 'text-stone-300'
                                      }`}
                                    />
                                  </button>

                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-[10px] font-bold text-stone-500 font-mono">
                                        Lesson {lesson.lessonNumber}
                                      </span>
                                      <span className="text-stone-300">·</span>
                                      <span className="text-xs font-bold text-stone-900">
                                        {lesson.title}
                                      </span>
                                    </div>
                                    <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">
                                      {lesson.description}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                  <span className="text-[10px] text-stone-500 font-mono hidden sm:inline">
                                    {lesson.durationMinutes} min
                                  </span>
                                  <ChevronRight
                                    className={`w-4 h-4 text-stone-400 transition-transform ${
                                      isExpanded ? 'rotate-90 text-stone-700' : ''
                                    }`}
                                  />
                                </div>
                              </div>

                              {/* Expanded Lesson Drawer */}
                              {isExpanded && (
                                <div className="p-4 pt-1 border-t border-stone-200/80 bg-white space-y-3 text-xs animate-fade-in">
                                  <div className="p-3 bg-stone-50 rounded-lg border border-stone-200/80">
                                    <div className="font-bold text-amber-900 flex items-center gap-1.5 mb-1">
                                      <FlaskConical className="w-3.5 h-3.5 text-amber-700" />
                                      <span>Hands-On Practical Lab:</span>
                                    </div>
                                    <p className="text-stone-700 leading-relaxed">
                                      {lesson.practicalLab}
                                    </p>
                                  </div>

                                  <div>
                                    <div className="font-semibold text-stone-800 mb-1">
                                      Skills Learned:
                                    </div>
                                    <ul className="space-y-1">
                                      {lesson.skillsLearned.map((skill: string, sIdx: number) => (
                                        <li key={sIdx} className="flex items-center gap-2 text-stone-600">
                                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                          <span>{skill}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  {lesson.keyDeliverable && (
                                    <div className="pt-2 border-t border-stone-100 flex items-center gap-2 text-stone-500 text-[11px]">
                                      <span className="font-semibold text-stone-700">Deliverable:</span>
                                      <span>{lesson.keyDeliverable}</span>
                                    </div>
                                  )}

                                  {/* AI Voice Read Aloud Button */}
                                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleReadLesson(lesson);
                                      }}
                                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs ${
                                        speakingLessonNum === lesson.lessonNumber
                                          ? 'bg-amber-500 text-stone-950 animate-pulse'
                                          : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300'
                                      }`}
                                    >
                                      <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                                      <span>{speakingLessonNum === lesson.lessonNumber ? 'Stop AI Voice Reading' : '🔊 Read Aloud with AI'}</span>
                                    </button>

                                    <span className="text-[10px] text-stone-400 font-mono">
                                      AI Voice & Practice Questions Below
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Level Capstone Certification & Quiz Card */}
                    <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-amber-50 via-stone-50 to-amber-50/60 border-2 border-amber-300/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
                      <div className="flex items-start gap-3">
                        <div className="w-11 h-11 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold shrink-0 shadow-sm">
                          <Award className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-amber-900 uppercase font-mono">
                              Level {currentLevel.levelNumber} Real Credential
                            </span>
                            <span className="text-stone-300">·</span>
                            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.2 rounded font-mono">
                              {currentLevel.capstoneBadge}
                            </span>
                          </div>
                          <h6 className="text-sm font-bold text-stone-900 mt-1">
                            Ready to test your knowledge and claim your official Level {currentLevel.levelNumber} Certificate?
                          </h6>
                          <p className="text-xs text-stone-600 mt-0.5">
                            Pass the 3-question mastery quiz to generate your diploma, download PNG to your device, and send it to your Gmail account.
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => setCertModalOpen(true)}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer shrink-0"
                      >
                        <Award className="w-4 h-4 fill-current" />
                        <span>Take Level {currentLevel.levelNumber} Quiz & Claim Certificate</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Tools & Equipment Provided */}
              <div>
                <div className="flex items-center gap-2 text-sm font-bold text-stone-900 font-display mb-2">
                  <Wrench className="w-4 h-4 text-stone-600" />
                  <span>Dedicated Tools & Materials Provided (Included Free)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {course.toolsProvided.map((tool, idx) => (
                    <div
                      key={idx}
                      className="text-xs text-stone-700 bg-stone-100 border border-stone-200 rounded-md px-3 py-1.5 flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{tool}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lead Mentor Bio */}
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-stone-800 text-stone-50 flex items-center justify-center text-sm font-bold shrink-0 font-display">
                  {course.leadMentor.avatar}
                </div>
                <div>
                  <div className="text-sm font-bold text-stone-900">{course.leadMentor.name}</div>
                  <div className="text-xs text-stone-500 font-medium">{course.leadMentor.role}</div>
                  <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                    {course.leadMentor.background}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer with Bold Download on its own */}
        <div className="p-5 sm:p-6 border-t border-stone-200 bg-stone-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-stone-600 flex items-center gap-2">
            <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-[11px]">$0 Free Tuition</span>
            <span>· All 5 Levels (50 Lessons) Fully Accessible</span>
          </div>

          <div className="flex items-center justify-end gap-3 flex-wrap">
            <button
              onClick={() => downloadCourseStandaloneApp(course)}
              className="px-4 py-2 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-stone-950" />
              <strong className="font-bold">Download on its own</strong>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-700 bg-stone-200 hover:bg-stone-300 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Offline Universal AI Voice & Text Tutor */}
      <UniversalAITutor
        floating={true}
        accentColor="amber"
        context={{
          courseId: course.id,
          courseTitle: course.title,
          levelNumber: currentLevel?.levelNumber,
          levelTitle: currentLevel?.title,
          lessonNumber: expandedLessonNum || 1,
          lessonTitle: currentLevel?.lessons.find((l) => l.lessonNumber === expandedLessonNum)?.title || currentLevel?.lessons[0]?.title,
          concept: currentLevel?.lessons.find((l) => l.lessonNumber === expandedLessonNum)?.description || currentLevel?.description,
          practicalLab: currentLevel?.lessons.find((l) => l.lessonNumber === expandedLessonNum)?.practicalLab,
        }}
      />

      {currentLevel && (
        <CertificateModal
          isOpen={certModalOpen}
          onClose={() => setCertModalOpen(false)}
          courseId={course.id}
          courseTitle={course.title}
          levelNumber={currentLevel.levelNumber}
          levelTitle={currentLevel.title}
          tier={currentLevel.tier}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};
