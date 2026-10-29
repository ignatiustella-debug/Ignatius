import React, { useState } from 'react';
import { STUDIOS, Studio } from '../data/educareData';
import { Eye, Shield, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';

interface StudiosSectionProps {
  onBookVisit: () => void;
}

export const StudiosSection: React.FC<StudiosSectionProps> = ({ onBookVisit }) => {
  const [activeStudioIndex, setActiveStudioIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const activeStudio = STUDIOS[activeStudioIndex];

  return (
    <section id="studios" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
              Physical Learning Environment
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 font-display">
              State-of-the-Art Studios, Labs & Prototyping Suites
            </h2>
            <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
              Real learning requires authentic instruments. Our 8,400 sq. ft campus is engineered specifically for youth creators, providing industrial-grade tooling within strict youth-safety parameters.
            </p>
          </div>

          <div>
            <button
              onClick={onBookVisit}
              className="px-5 py-2.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Book an On-Site Studio Tour
            </button>
          </div>
        </div>

        {/* Studio Selector Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-4 mb-8 overflow-x-auto">
          {STUDIOS.map((studio, idx) => (
            <button
              key={studio.id}
              onClick={() => setActiveStudioIndex(idx)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                activeStudioIndex === idx
                  ? 'bg-stone-900 text-stone-50 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              {studio.name}
            </button>
          ))}
        </div>

        {/* Featured Studio Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Visual Frame */}
          <div className="lg:col-span-7">
            <div className="w-full h-[360px] sm:h-[440px] rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 relative shadow-xs">
              {/* Fallback container */}
              <div
                className={`absolute inset-0 bg-stone-800 text-stone-100 p-8 flex flex-col justify-end transition-opacity duration-300 ${
                  imageErrors[activeStudio.id] ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <div className="space-y-1">
                  <h4 className="text-xl font-bold font-display">{activeStudio.name}</h4>
                  <p className="text-xs text-stone-300">{activeStudio.headline}</p>
                </div>
              </div>

              {/* Generated Studio Photography */}
              {!imageErrors[activeStudio.id] && (
                <img
                  src={activeStudio.image}
                  alt={`${activeStudio.name} facility at Educare youth center`}
                  referrerPolicy="no-referrer"
                  onError={() =>
                    setImageErrors((prev) => ({ ...prev, [activeStudio.id]: true }))
                  }
                  className="w-full h-full object-cover object-center"
                />
              )}

              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 bg-stone-900/80 backdrop-blur-md text-stone-100 text-xs px-3 py-1.5 rounded-md font-medium">
                {activeStudio.capacity}
              </div>
            </div>
          </div>

          {/* Details & Equipment Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-stone-50 border border-stone-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 mb-2">
                <Cpu className="w-4 h-4 text-amber-600" />
                <span>Facility Overview</span>
              </div>

              <h3 className="text-2xl font-bold text-stone-900 font-display">
                {activeStudio.name}
              </h3>
              <p className="text-xs font-medium text-amber-800 mt-1">
                {activeStudio.headline}
              </p>
              <p className="text-sm text-stone-600 mt-3 leading-relaxed">
                {activeStudio.description}
              </p>

              {/* Equipment Inventory */}
              <div className="mt-6 pt-5 border-t border-stone-200">
                <div className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-3">
                  Key Lab Equipment & Apparatus:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeStudio.equipment.map((eq, i) => (
                    <div
                      key={i}
                      className="text-xs text-stone-700 bg-white p-2.5 rounded-lg border border-stone-200 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-tight">{eq}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Safety & Protocol Footer */}
            <div className="mt-8 pt-5 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-stone-700" />
                <span className="font-medium text-stone-800">{activeStudio.safetyTier}</span>
              </div>
              <button
                onClick={onBookVisit}
                className="text-stone-900 underline hover:text-amber-800 font-medium cursor-pointer"
              >
                Schedule Visit →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
