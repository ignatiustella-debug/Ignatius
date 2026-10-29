import React, { useState } from 'react';
import { STUDENT_PROJECTS, TESTIMONIALS, StudentProject } from '../data/educareData';
import { Award, Wrench, Quote, ExternalLink, Calendar, CheckCircle2, Globe } from 'lucide-react';

interface StudentShowcaseSectionProps {
  onOpenLiveApp?: (url: string, title: string) => void;
}

export const StudentShowcaseSection: React.FC<StudentShowcaseSectionProps> = ({
  onOpenLiveApp,
}) => {
  const [activeProject, setActiveProject] = useState<StudentProject | null>(STUDENT_PROJECTS[0]);

  return (
    <section className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
            Tangible Outcomes & Proof
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 font-display">
            Student Projects & Competition Honors
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Every cohort culminates in independent work that can be tested, demonstrated, and submitted to scientific congresses or art festivals.
          </p>
        </div>

        {/* 2-Column Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Projects Selector List (Left) */}
          <div className="lg:col-span-5 space-y-3">
            {STUDENT_PROJECTS.map((proj) => {
              const isSelected = activeProject?.id === proj.id;
              return (
                <button
                  key={proj.id}
                  onClick={() => setActiveProject(proj)}
                  className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all cursor-pointer flex flex-col gap-1.5 ${
                    isSelected
                      ? 'bg-white border-stone-400 shadow-sm ring-1 ring-stone-400'
                      : 'bg-stone-100/60 hover:bg-white border-stone-200 text-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span>{proj.program}</span>
                    <span className="font-medium text-stone-700">
                      {proj.studentName} ({proj.studentAge} yrs)
                    </span>
                  </div>
                  <div className="text-base font-bold text-stone-900 font-display">{proj.title}</div>
                  <div className="text-xs text-amber-800 font-medium flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                    <span className="truncate">{proj.recognition}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Project Dossier (Right) */}
          {activeProject && (
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mb-2">
                  <span>Student: {activeProject.studentName}</span>
                  <span aria-hidden="true">·</span>
                  <span>Age {activeProject.studentAge}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeProject.completionDate}</span>
                </div>
                <h3 className="text-2xl font-bold text-stone-900 font-display">
                  {activeProject.title}
                </h3>
                <div className="mt-1 text-xs font-semibold text-amber-800 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>{activeProject.recognition}</span>
                </div>
              </div>

              <div className="text-sm text-stone-600 leading-relaxed">
                {activeProject.description}
              </div>

              {/* Technologies / Tools Used */}
              <div className="pt-4 border-t border-stone-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                    Stack & Tooling Applied:
                  </div>
                  {activeProject.liveAppUrl && (
                    <button
                      type="button"
                      onClick={() => onOpenLiveApp?.(activeProject.liveAppUrl!, activeProject.title)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 px-3 py-1.5 rounded-lg shadow-xs transition-colors cursor-pointer"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Launch Team Grace App (AI Studio)</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeProject.toolsUsed.map((tool, i) => (
                    <span
                      key={i}
                      className="text-xs text-stone-700 bg-stone-100 px-3 py-1 rounded-md border border-stone-200"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verification & Portfolio Ownership */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-800 block">Authenticated Student Project</span>
                  <span className="text-stone-500 mt-0.5 block">
                    Synthesized independently during Educare semester lab cycles. All source code, CAD blueprints, and exhibition rights remain 100% student property.
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Claim-to-Proof Adjacent Testimonials */}
        <div className="pt-12 border-t border-stone-200">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-6">
            Parent & Youth Perspectives
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-xl bg-white border border-stone-200 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <Quote className="w-5 h-5 text-amber-500/80" />
                  <p className="text-sm text-stone-700 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-stone-100">
                  <div className="text-sm font-bold text-stone-900">{t.author}</div>
                  <div className="text-xs text-stone-500">{t.relationship} ({t.studentInfo})</div>
                  <div className="text-xs text-amber-800 font-medium mt-1">Course: {t.programTaken}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
