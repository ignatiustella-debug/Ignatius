import React, { useState } from 'react';
import { TIMETABLE_SLOTS, TimetableSlot } from '../data/educareData';
import { Calendar, Clock, MapPin, User, CheckCircle2 } from 'lucide-react';

interface TimetableSectionProps {
  onOpenEnrollment: (courseId?: string) => void;
}

export const TimetableSection: React.FC<TimetableSectionProps> = ({ onOpenEnrollment }) => {
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [selectedRoom, setSelectedRoom] = useState<string>('all');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const filteredSlots = TIMETABLE_SLOTS.filter((slot) => {
    const matchesDay = slot.day === selectedDay;
    const matchesRoom = selectedRoom === 'all' || slot.room === selectedRoom;
    return matchesDay && matchesRoom;
  });

  return (
    <section id="timetable" className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
              Weekly Cohort Schedule
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 font-display">
              Interactive Timetable & Studio Sessions
            </h2>
            <p className="mt-2 text-stone-600 text-sm sm:text-base max-w-2xl">
              All studio labs run on fixed weekly cohorts with open drop-in office hours every Saturday afternoon. Book a 1-day guest pass to shadow any active session.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => onOpenEnrollment()}
              className="px-4 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Book Single-Day Pass
            </button>
          </div>
        </div>

        {/* Day Selector Buttons */}
        <div className="flex items-center gap-1.5 p-1.5 bg-stone-200/70 rounded-xl overflow-x-auto mb-6">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`flex-1 min-w-[100px] py-2.5 text-xs font-medium rounded-lg text-center transition-all whitespace-nowrap cursor-pointer ${
                selectedDay === day
                  ? 'bg-white text-stone-900 font-bold shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Timetable Table / Cards */}
        {filteredSlots.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSlots.map((slot) => {
              const seatsLeft = slot.capacity - slot.enrolled;
              return (
                <div
                  key={slot.id}
                  className="bg-white rounded-xl border border-stone-200/90 p-5 shadow-xs hover:border-stone-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Time & Room header */}
                    <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                      <div className="flex items-center gap-1.5 font-medium text-stone-800">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>{slot.time}</span>
                      </div>
                      <span className="text-stone-400">{slot.ageRange}</span>
                    </div>

                    <h4 className="text-base font-bold text-stone-900 font-display">
                      {slot.courseTitle}
                    </h4>

                    {/* Room & Instructor */}
                    <div className="mt-3 space-y-1.5 text-xs text-stone-600">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        <span>{slot.room}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-stone-400" />
                        <span>Lead Mentor: {slot.instructor}</span>
                      </div>
                    </div>
                  </div>

                  {/* Seat capacity & button */}
                  <div className="mt-5 pt-4 border-t border-stone-100">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-stone-500">Cohort Capacity</span>
                      <span className="font-semibold text-stone-800 tabular-nums">
                        {slot.enrolled} / {slot.capacity} Enrolled
                      </span>
                    </div>

                    {/* Capacity visual bar */}
                    <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden mb-3">
                      <div
                        className={`h-full rounded-full ${
                          seatsLeft <= 2 ? 'bg-amber-600' : 'bg-emerald-600'
                        }`}
                        style={{ width: `${(slot.enrolled / slot.capacity) * 100}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-stone-500">
                        {seatsLeft > 0 ? `${seatsLeft} spots open` : 'Waitlist only'}
                      </span>
                      <button
                        onClick={() => onOpenEnrollment(slot.courseId)}
                        className="px-3 py-1.5 text-xs font-medium text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors cursor-pointer"
                      >
                        Claim Trial Seat
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-10 text-center bg-white rounded-xl border border-stone-200">
            <p className="text-sm text-stone-600">
              No active classes scheduled for this filter. Please select another day or studio.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
