import React, { useState } from 'react';
import { ArrowRight, Compass, ShieldCheck, Sparkles, Users, Award, BookOpen, Download } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface HeroProps {
  onOpenEnrollment: () => void;
  onExplorePrograms: () => void;
  onStartQuiz: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenEnrollment,
  onExplorePrograms,
  onStartQuiz,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-20 overflow-hidden bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Term Notice Banner */}
        <div className="mb-6 inline-flex items-center gap-2 text-xs font-medium text-stone-600 bg-stone-100/90 border border-stone-200/90 rounded-md px-3 py-1.5">
          <span className="font-semibold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded text-[11px]">100% Free Tuition</span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span>Community & Grant Funded Youth Programs</span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <a href="#tuition" className="text-stone-900 underline hover:text-amber-700 transition-colors">
            Learn About Free Access
          </a>
        </div>

        {/* 2-Column Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
          {/* Left Column: Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.08] font-display"
              style={{ textWrap: 'balance' }}
            >
              Where Curious Minds Become Visionary Makers & Thinkers.
            </h1>

            <p className="mt-6 text-lg text-stone-600 leading-relaxed max-w-2xl">
              Educare is a 100% tuition-free youth center for ages 6 to 18. Through project-driven robotics, full-stack web engineering, experimental sciences, digital media, and parliamentary debate, we ensure high-caliber mentorship and state-of-the-art labs are freely accessible to every young creator.
            </p>

            {/* CTAs - Direct Access to Study & Practise Platform */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#app-platform"
                className="px-6 py-3.5 text-sm font-bold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-stone-900" />
                <span>Choose App to Study & Practise</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <PWAInstallButton variant="hero" />

              <button
                onClick={onStartQuiz}
                className="px-5 py-3.5 text-sm font-medium text-stone-700 bg-stone-100 hover:bg-stone-200/90 border border-stone-300/80 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-stone-500" />
                <span>Find Your Child’s Path</span>
              </button>
            </div>

            {/* Quiet Trust Markers */}
            <div className="mt-10 pt-6 border-t border-stone-200/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-stone-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span className="font-semibold text-stone-800">100% Free Tuition & Supplies</span>
              </div>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-stone-600" />
                <span>1:8 Dedicated Mentor Ratio</span>
              </div>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-stone-600" />
                <span>Hardware & Software Included</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative flex items-center">
            <div className="w-full h-full min-h-[380px] sm:min-h-[460px] rounded-2xl overflow-hidden border border-stone-300/80 shadow-md bg-stone-200 relative">
              {/* Fallback container */}
              <div
                className={`absolute inset-0 bg-stone-800 text-stone-100 p-8 flex flex-col justify-end transition-opacity duration-300 ${
                  imageLoaded && !imageError ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              >
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-wider text-amber-400 font-medium">Hands-On Studio Learning</span>
                  <h3 className="text-xl font-bold font-display">Collaborative Robotics & Applied Engineering</h3>
                  <p className="text-xs text-stone-300">Real projects, real circuitry, and peer mentorship in action.</p>
                </div>
              </div>

              {/* High-res generated photograph */}
              {!imageError && (
                <img
                  src="/src/assets/images/hero_youth_learning_1792701236594.jpg"
                  alt="Educare youth students collaborating around an autonomous robotics rover prototype in a modern studio lab"
                  referrerPolicy="no-referrer"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  className={`w-full h-full object-cover object-center transition-opacity duration-500 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              )}

              {/* Subtle caption scrim */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/80 via-stone-900/40 to-transparent p-5 text-stone-100">
                <p className="text-xs font-semibold text-stone-200">Educare Innovation Lab — Cohort 26</p>
                <p className="text-xs text-stone-300 mt-0.5">Students calibrating autonomous sensor rover telemetry</p>
              </div>
            </div>
          </div>
        </div>

        {/* Claim-to-Proof Metric Strip (Full-width row directly below hero split) */}
        <div className="mt-14 pt-10 border-t border-stone-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-bold text-stone-900 font-display tabular-nums tracking-tight">
                1:8
              </div>
              <div className="text-sm font-semibold text-stone-800">Mentor-to-Youth Ratio</div>
              <p className="text-xs text-stone-500 leading-normal">
                Strict limits so each student receives 1-on-1 code reviews and design critique.
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-bold text-stone-900 font-display tabular-nums tracking-tight">
                94%
              </div>
              <div className="text-sm font-semibold text-stone-800">Project Completion Rate</div>
              <p className="text-xs text-stone-500 leading-normal">
                Every student leaves each 12-week semester with an authentic working portfolio piece.
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-bold text-stone-900 font-display tabular-nums tracking-tight">
                1,450+
              </div>
              <div className="text-sm font-semibold text-stone-800">Youth Mentored</div>
              <p className="text-xs text-stone-500 leading-normal">
                Across 28 collaborative cohorts in STEM, arts, sciences, and rhetoric since 2021.
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-bold text-stone-900 font-display tabular-nums tracking-tight">
                48
              </div>
              <div className="text-sm font-semibold text-stone-800">Tournament Recognitions</div>
              <p className="text-xs text-stone-500 leading-normal">
                In regional FIRST robotics, science congresses, and youth parliamentary debate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
