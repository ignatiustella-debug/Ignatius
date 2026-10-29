import React, { useState } from 'react';
import { Check, ShieldCheck, Heart, Sparkles, ArrowRight, Gift } from 'lucide-react';

interface TuitionCalculatorSectionProps {
  onOpenEnrollment: () => void;
}

export const TuitionCalculatorSection: React.FC<TuitionCalculatorSectionProps> = ({
  onOpenEnrollment,
}) => {
  const [coursesPerWeek, setCoursesPerWeek] = useState<number>(1);
  const [termPlan, setTermPlan] = useState<'semester' | 'annual' | 'summer'>('semester');
  const [needLaptopLoaner, setNeedLaptopLoaner] = useState<boolean>(false);

  const termHours = coursesPerWeek * (termPlan === 'summer' ? 12 : termPlan === 'annual' ? 72 : 36);

  return (
    <section id="tuition" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 mb-2">
            <Gift className="w-3.5 h-3.5 text-emerald-700" />
            <span>100% Tuition-Free & Philanthropically Endowed</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 font-display">
            Every Program is 100% Free for Youth
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            At Educare, world-class education is never gated by financial barriers. Every class, workshop, microcontroller kit, 3D printing filament, chemical reagent, and high-end studio workstation is provided at <strong className="text-stone-900 font-bold">$0 cost to all families</strong>.
          </p>
        </div>

        {/* 2-Column Free Cost Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Deck (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-stone-50 p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-6">
            {/* Control 1: Term Commitment */}
            <div>
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
                1. Select Program Commitment (All 100% Free)
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setTermPlan('semester')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    termPlan === 'semester'
                      ? 'bg-white border-stone-900 shadow-sm text-stone-900 font-semibold ring-1 ring-stone-900'
                      : 'bg-stone-100/60 border-stone-200 text-stone-600 hover:bg-white'
                  }`}
                >
                  <div className="text-xs sm:text-sm font-bold">12-Wk Semester</div>
                  <div className="text-[11px] text-emerald-700 font-medium mt-0.5">$0 Free</div>
                </button>

                <button
                  type="button"
                  onClick={() => setTermPlan('annual')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    termPlan === 'annual'
                      ? 'bg-white border-stone-900 shadow-sm text-stone-900 font-semibold ring-1 ring-stone-900'
                      : 'bg-stone-100/60 border-stone-200 text-stone-600 hover:bg-white'
                  }`}
                >
                  <div className="text-xs sm:text-sm font-bold">Full Academic Year</div>
                  <div className="text-[11px] text-emerald-700 font-medium mt-0.5">$0 Free</div>
                </button>

                <button
                  type="button"
                  onClick={() => setTermPlan('summer')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    termPlan === 'summer'
                      ? 'bg-white border-stone-900 shadow-sm text-stone-900 font-semibold ring-1 ring-stone-900'
                      : 'bg-stone-100/60 border-stone-200 text-stone-600 hover:bg-white'
                  }`}
                >
                  <div className="text-xs sm:text-sm font-bold">Summer Intensive</div>
                  <div className="text-[11px] text-emerald-700 font-medium mt-0.5">$0 Free</div>
                </button>
              </div>
            </div>

            {/* Control 2: Weekly Courses */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                  2. Number of Concurrent Learning Tracks
                </label>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Unlimited Free Access
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setCoursesPerWeek(num)}
                    className={`py-2.5 rounded-xl border text-center transition-all cursor-pointer text-xs sm:text-sm ${
                      coursesPerWeek === num
                        ? 'bg-white border-stone-900 font-semibold text-stone-900 shadow-sm ring-1 ring-stone-900'
                        : 'bg-stone-100/60 border-stone-200 text-stone-600 hover:bg-white'
                    }`}
                  >
                    {num} {num === 1 ? 'Track' : 'Tracks'} ($0)
                  </button>
                ))}
              </div>
            </div>

            {/* Control 3: Hardware & Device Support */}
            <div className="pt-2">
              <label className="flex items-start gap-3 p-4 rounded-xl border border-stone-200 bg-white cursor-pointer hover:border-stone-300 transition-colors">
                <input
                  type="checkbox"
                  checked={needLaptopLoaner}
                  onChange={(e) => setNeedLaptopLoaner(e.target.checked)}
                  className="mt-1 w-4 h-4 text-emerald-600 rounded border-stone-300 focus:ring-emerald-500 cursor-pointer"
                />
                <div>
                  <span className="text-sm font-semibold text-stone-900 block">
                    Free Take-Home Loaner Device & Kit ($0)
                  </span>
                  <span className="text-xs text-stone-500 block mt-0.5">
                    Need a laptop or dedicated hardware kit for home practice? We supply free loaner MacBooks, ESP32 boards, and sensor packs.
                  </span>
                </div>
              </label>
            </div>

            {/* Endowment Mission Callout */}
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-stone-700 space-y-1.5">
              <div className="font-semibold text-amber-950 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-amber-700" />
                <span>How is Educare 100% Free?</span>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Educare is funded through civic tech endowments, science foundations, and technology education grants. We have zero shareholders, charge zero tuition, and mandate zero mandatory donations.
              </p>
            </div>
          </div>

          {/* Results Summary Card (Right 5 Cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-stone-900 text-stone-100 flex flex-col justify-between shadow-md">
            <div>
              <div className="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Total Family Investment</span>
              </div>

              <div className="mt-4 pb-6 border-b border-stone-800">
                <div className="text-xs text-stone-400">Total Net Tuition & Fees</div>
                <div className="text-4xl sm:text-5xl font-bold font-display tracking-tight text-white mt-1 tabular-nums">
                  $0.00
                </div>
                <div className="text-xs text-emerald-400 mt-1.5 font-medium">
                  100% Fully Covered for All Enrolled Youth
                </div>
              </div>

              {/* Itemized Free Breakdown */}
              <div className="py-4 space-y-2.5 text-xs text-stone-300 border-b border-stone-800">
                <div className="flex justify-between">
                  <span className="text-stone-400">Direct Mentor Studio Instruction:</span>
                  <span className="text-emerald-400 font-semibold tabular-nums">{termHours} Hours ($0 Free)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">All Robotics & Electronic Parts (ESP32, Sensors):</span>
                  <span className="text-emerald-400 font-semibold">$0 (Included)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">3D Printing Filaments & Laser Cut Materials:</span>
                  <span className="text-emerald-400 font-semibold">$0 (Unlimited)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Software Passes (GitHub, AI Studio, Blender):</span>
                  <span className="text-emerald-400 font-semibold">$0 (Included)</span>
                </div>
                {needLaptopLoaner && (
                  <div className="flex justify-between text-amber-300">
                    <span>Take-Home Loaner Laptop:</span>
                    <span>$0 (Free Loan)</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-stone-400">Registration or Application Fee:</span>
                  <span className="text-emerald-400 font-semibold">$0 (Never Charged)</span>
                </div>
              </div>

              {/* Transparent Guarantees */}
              <div className="mt-4 space-y-2 text-xs text-stone-400">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>No credit card required for registration or attendance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>All completed projects & prototypes remain student property</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-800">
              <button
                onClick={onOpenEnrollment}
                className="w-full py-3.5 text-sm font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Register Your Child for Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
