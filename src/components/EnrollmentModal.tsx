import React, { useState, useEffect } from 'react';
import { COURSES } from '../data/educareData';
import { X, CheckCircle2, Calendar, MapPin, Sparkles, Printer, ArrowRight } from 'lucide-react';
import { EducareUser } from '../types/auth';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCourseId?: string;
  currentUser?: EducareUser | null;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  isOpen,
  onClose,
  initialCourseId,
  currentUser,
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(initialCourseId || COURSES[0].id);
  const [selectedLevelNumber, setSelectedLevelNumber] = useState<number>(1);
  const [bookingType, setBookingType] = useState<'trial' | 'term'>('trial');
  const [studentName, setStudentName] = useState(currentUser?.name || '');
  const [studentAge, setStudentAge] = useState(currentUser?.age ? String(currentUser.age) : '14');
  const [parentName, setParentName] = useState(currentUser?.role === 'parent' ? currentUser.name : '');
  const [parentEmail, setParentEmail] = useState(currentUser?.email || '');
  const [parentPhone, setParentPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');

  useEffect(() => {
    if (initialCourseId) {
      setSelectedCourseId(initialCourseId);
    }
  }, [initialCourseId]);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'student' || currentUser.role === 'guest') {
        if (!studentName) setStudentName(currentUser.name);
        if (currentUser.age) setStudentAge(String(currentUser.age));
        if (!parentEmail) setParentEmail(currentUser.email);
      } else if (currentUser.role === 'parent') {
        if (!parentName) setParentName(currentUser.name);
        if (!parentEmail) setParentEmail(currentUser.email);
        if (!studentName) setStudentName('Liam Vance');
      }
    }
  }, [currentUser, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `EDU-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setReferenceCode(code);
    setIsSuccess(true);
  };

  const selectedCourse = COURSES.find((c) => c.id === selectedCourseId) || COURSES[0];

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div
        className="bg-white rounded-2xl max-w-xl w-full border border-stone-200 shadow-2xl overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              {bookingType === 'trial' ? 'Free Guest Pass' : 'Official Application'}
            </div>
            <h3 className="text-xl font-bold text-stone-900 font-display">
              {bookingType === 'trial' ? 'Book a Free Studio Trial Class' : 'Enroll in Term Cohort'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/50 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 max-h-[75vh] overflow-y-auto">
            {/* Booking Type Segment */}
            <div>
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1.5">
                Registration Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setBookingType('trial')}
                  className={`py-2 px-3 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                    bookingType === 'trial'
                      ? 'bg-amber-400 text-stone-900 font-bold border-amber-500 shadow-xs'
                      : 'bg-stone-100/70 border-stone-200 text-stone-600 hover:bg-stone-200/60'
                  }`}
                >
                  Free 1-Day Trial Pass ($0)
                </button>
                <button
                  type="button"
                  onClick={() => setBookingType('term')}
                  className={`py-2 px-3 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                    bookingType === 'term'
                      ? 'bg-stone-900 text-white font-bold border-stone-900 shadow-xs'
                      : 'bg-stone-100/70 border-stone-200 text-stone-600 hover:bg-stone-200/60'
                  }`}
                >
                  Full 12-Wk Cohort ($0 Free)
                </button>
              </div>
            </div>

            {/* Course Selector */}
            <div>
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1.5">
                Select Program Track
              </label>
              <select
                value={selectedCourseId}
                onChange={(e) => {
                  setSelectedCourseId(e.target.value);
                  setSelectedLevelNumber(1);
                }}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 bg-white"
              >
                {COURSES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} ({c.ageRange}) — 5 Levels & 50 Lessons
                  </option>
                ))}
              </select>
              <div className="mt-1 text-[11px] text-stone-500 flex items-center justify-between">
                <span>Mentor: {selectedCourse.leadMentor.name} · {selectedCourse.cohortSchedule}</span>
                <span className="font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                  $0 Tuition Free
                </span>
              </div>
            </div>

            {/* Starting Level Tier Selector */}
            <div>
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1.5">
                Starting Level Placement
              </label>
              <select
                value={selectedLevelNumber}
                onChange={(e) => setSelectedLevelNumber(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 bg-white"
              >
                {selectedCourse.levels.map((lvl) => (
                  <option key={lvl.levelNumber} value={lvl.levelNumber}>
                    Level {lvl.levelNumber}: {lvl.tier} Level — {lvl.title.replace(/^Level \d+:\s*/, '')} (10 Lessons)
                  </option>
                ))}
              </select>
              <div className="mt-1 text-[11px] text-stone-500">
                Covers Beginner (Levels 1–2), Intermediate (Levels 3–4), and Pro (Level 5).
              </div>
            </div>

            {/* Student Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-stone-700 block mb-1">
                  Student Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Leo Vance"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-stone-700 block mb-1">
                  Age *
                </label>
                <select
                  value={studentAge}
                  onChange={(e) => setStudentAge(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 bg-white"
                >
                  {Array.from({ length: 13 }, (_, i) => i + 6).map((age) => (
                    <option key={age} value={age}>
                      {age} years old
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Parent / Guardian Contact */}
            <div className="space-y-3 pt-1">
              <div>
                <label className="text-xs font-medium text-stone-700 block mb-1">
                  Parent / Guardian Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Vance"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-stone-700 block mb-1">
                    Guardian Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@example.com"
                    value={parentEmail}
                    onChange={(e) => setParentEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-stone-700 block mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(555) 019-2834"
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                  />
                </div>
              </div>
            </div>

            {/* Special notes */}
            <div>
              <label className="text-xs font-medium text-stone-700 block mb-1">
                Student Passions or Special Learning Accommodations (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Mention any specific projects they're excited about, dietary allergies, or sensory preferences..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 resize-none"
              />
            </div>

            {/* Submission Actions */}
            <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
              <span className="text-xs text-emerald-800 font-semibold flex items-center gap-1">
                <span>100% Free ($0) · No credit card required</span>
              </span>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{bookingType === 'trial' ? 'Claim Free Pass' : 'Complete Free Registration'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        ) : (
          /* Confirmation Success Card */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-2xl font-bold text-stone-900 font-display">
                {bookingType === 'trial' ? 'Studio Trial Pass Confirmed!' : 'Enrollment Application Received!'}
              </h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                A confirmation dossier with entry badges and parking instructions has been transmitted to <strong className="text-stone-800">{parentEmail}</strong>.
              </p>
            </div>

            {/* Printable Pass Dossier */}
            <div className="p-5 rounded-xl border border-stone-200 bg-stone-50 space-y-3 text-xs">
              <div className="flex justify-between items-center pb-3 border-b border-stone-200">
                <span className="text-stone-500 uppercase tracking-wider font-semibold">Pass Reference</span>
                <span className="font-mono font-bold text-stone-900">{referenceCode}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-stone-500 block">Student</span>
                  <span className="font-semibold text-stone-800">{studentName} ({studentAge} yrs)</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Course</span>
                  <span className="font-semibold text-stone-800">{selectedCourse.title}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Schedule Slot</span>
                  <span className="font-semibold text-stone-800">{selectedCourse.cohortSchedule}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Campus Location</span>
                  <span className="font-semibold text-stone-800">Educare Innovation Hub, Rm 104</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Curriculum Track & Level</span>
                  <span className="font-semibold text-stone-800">
                    Starting Level {selectedLevelNumber} (5 Levels · 50 Lessons)
                  </span>
                </div>
                <div>
                  <span className="text-stone-500 block">Tuition & Supplies Cost</span>
                  <span className="font-bold text-emerald-800">$0.00 (100% Free / Grant Funded)</span>
                </div>
              </div>
              <div className="pt-2 text-[11px] text-stone-500">
                * All hardware, microcontrollers, drawing styluses, and protective lab eyewear are sanitized and provided on site at zero cost.
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save Pass</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
