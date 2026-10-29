import React, { useState } from 'react';
import { PATHWAY_QUESTIONS, COURSES, Course } from '../data/educareData';
import { CourseLogo } from './CourseLogo';
import { downloadCourseStandaloneApp } from '../utils/courseAppExporter';
import { Compass, CheckCircle2, RotateCcw, ArrowRight, Sparkles, Layers, Download, BookOpen } from 'lucide-react';

interface PathwayFinderProps {
  onSelectCourse: (course: Course) => void;
  onOpenEnrollment: (courseId?: string) => void;
}

export const PathwayFinder: React.FC<PathwayFinderProps> = ({
  onSelectCourse,
  onOpenEnrollment,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<{ age?: string; interest?: string; goal?: string }>({});
  const [recommendedCourse, setRecommendedCourse] = useState<Course | null>(null);

  const handleSelectOption = (questionId: string, tag: string) => {
    const updated = { ...answers, [questionId]: tag };
    setAnswers(updated);

    if (currentStep < PATHWAY_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate match
      const matched = determineMatch(updated);
      setRecommendedCourse(matched);
    }
  };

  const determineMatch = (ans: { age?: string; interest?: string; goal?: string }): Course => {
    // If interest points to a category, look for age tier match
    const interest = ans.interest || 'stem-coding';
    const ageTier = ans.age || 'navigators';

    // Find course by interest category and age tier
    const exactMatch = COURSES.find(
      (c) => c.category === interest && c.ageTier === ageTier
    );
    if (exactMatch) return exactMatch;

    // Fallback: match by interest first
    const categoryMatch = COURSES.find((c) => c.category === interest);
    if (categoryMatch) return categoryMatch;

    // Fallback: match by age tier
    const ageMatch = COURSES.find((c) => c.ageTier === ageTier);
    if (ageMatch) return ageMatch;

    return COURSES[0];
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setRecommendedCourse(null);
  };

  const currentQ = PATHWAY_QUESTIONS[currentStep];

  return (
    <section id="pathfinder" className="py-16 sm:py-20 bg-stone-100/70 border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
            <Compass className="w-4 h-4 text-amber-600" />
            <span>Interactive Diagnostic</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 font-display">
            Find Your Child’s Ideal Learning Pathway
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            Every child’s curiosity operates on a distinct frequency. Take our 30-second assessment to discover the cohort and curriculum tailored to their developmental stage.
          </p>
        </div>

        {/* Diagnostic Box */}
        <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-10 transition-all">
          {!recommendedCourse ? (
            <div>
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                  <span>
                    Question {currentStep + 1} of {PATHWAY_QUESTIONS.length}
                  </span>
                  <span>{Math.round(((currentStep + 1) / PATHWAY_QUESTIONS.length) * 100)}% Complete</span>
                </div>
                <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 transition-all duration-300 rounded-full"
                    style={{ width: `${((currentStep + 1) / PATHWAY_QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Current Question */}
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-display">
                  {currentQ.question}
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">{currentQ.helper}</p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt) => {
                  const isSelected = answers[currentQ.id as keyof typeof answers] === opt.tag;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(currentQ.id, opt.tag)}
                      className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all flex items-start justify-between gap-4 cursor-pointer ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/50 ring-1 ring-amber-500'
                          : 'border-stone-200 hover:border-stone-400 bg-white hover:bg-stone-50/60'
                      }`}
                    >
                      <div>
                        <div className="text-base font-semibold text-stone-900">{opt.label}</div>
                        <div className="text-xs sm:text-sm text-stone-500 mt-0.5">{opt.description}</div>
                      </div>
                      <span className="text-xs font-medium text-stone-400 shrink-0 mt-1">Select →</span>
                    </button>
                  );
                })}
              </div>

              {/* Back navigation if not step 0 */}
              {currentStep > 0 && (
                <div className="mt-6 flex justify-start">
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="text-xs text-stone-500 hover:text-stone-800 underline underline-offset-4 cursor-pointer"
                  >
                    ← Previous Question
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Recommendation View */
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
                      Optimal Pathway Match
                    </span>
                    <h3 className="text-lg font-bold text-stone-900 font-display">
                      Curriculum Recommendation
                    </h3>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Assessment</span>
                </button>
              </div>

              {/* Recommended Course Card */}
              <div className="p-6 rounded-xl bg-stone-50 border border-stone-200">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-3.5">
                    <CourseLogo courseId={recommendedCourse.id} size="lg" />
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mb-1">
                        <span>{recommendedCourse.ageTierLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span>{recommendedCourse.duration}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded text-[11px] font-mono">
                          5 Levels · 50 Lessons
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-[11px]">100% Free ($0)</span>
                      </div>
                      <h4 className="text-2xl font-bold text-stone-900 font-display">
                        {recommendedCourse.title}
                      </h4>
                    </div>
                  </div>

                  <button
                    onClick={() => downloadCourseStandaloneApp(recommendedCourse)}
                    className="px-3.5 py-1.5 text-xs font-bold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 self-start"
                  >
                    <Download className="w-3.5 h-3.5 text-stone-900" />
                    <strong className="font-bold">Download on its own</strong>
                  </button>
                </div>

                <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                  {recommendedCourse.tagline}
                </p>

                {/* Highlights */}
                <div className="mt-5 space-y-2">
                  <div className="text-xs font-semibold text-stone-800 uppercase tracking-wider">
                    Core Learning Milestones:
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                    {recommendedCourse.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Lead Mentor Snippet & Direct Access */}
                <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-stone-800 text-stone-100 flex items-center justify-center text-xs font-bold font-display">
                      {recommendedCourse.leadMentor.avatar}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-stone-900">
                        Lead Mentor: {recommendedCourse.leadMentor.name}
                      </div>
                      <div className="text-xs text-stone-500">{recommendedCourse.leadMentor.role}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectCourse(recommendedCourse)}
                      className="px-4 py-2.5 text-xs font-bold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-stone-900" />
                      <span>Study & Practise (All 50 Lessons Free)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
