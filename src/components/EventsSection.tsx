import React, { useState } from 'react';
import { COMMUNITY_EVENTS, CommunityEvent } from '../data/educareData';
import { Calendar, Clock, MapPin, CheckCircle2, Ticket, Users } from 'lucide-react';

export const EventsSection: React.FC = () => {
  const [rsvpEvents, setRsvpEvents] = useState<Record<string, boolean>>({});
  const [activeModalEvent, setActiveModalEvent] = useState<CommunityEvent | null>(null);
  const [rsvpForm, setRsvpForm] = useState({ name: '', email: '', attendees: '1' });
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const handleOpenRsvp = (event: CommunityEvent) => {
    setActiveModalEvent(event);
    setSubmittedMessage(null);
  };

  const handleConfirmRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalEvent) return;
    setRsvpEvents((prev) => ({ ...prev, [activeModalEvent.id]: true }));
    setSubmittedMessage(`Confirmed! A guest pass for ${rsvpForm.name || 'you'} has been emailed to ${rsvpForm.email || 'your email'}.`);
    setTimeout(() => {
      setActiveModalEvent(null);
      setSubmittedMessage(null);
      setRsvpForm({ name: '', email: '', attendees: '1' });
    }, 2500);
  };

  return (
    <section className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
            Community & Free Open Labs
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 font-display">
            Upcoming Weekend Workshops & Hackathons
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Free community access sessions for youth and parents. Come test our lab equipment, participate in open challenges, and meet our faculty mentors.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {COMMUNITY_EVENTS.map((event) => {
            const hasRsvp = rsvpEvents[event.id];
            return (
              <div
                key={event.id}
                className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between hover:border-stone-300 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-3">
                    <span className="font-semibold text-stone-900">{event.targetAge}</span>
                    <span className="text-emerald-700 font-semibold">{event.cost}</span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 font-display">
                    {event.title}
                  </h3>

                  <div className="mt-4 space-y-2 text-xs text-stone-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-stone-600 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div className="text-xs text-stone-500">
                    <span className="font-semibold text-stone-800 tabular-nums">
                      {hasRsvp ? event.spotsLeft - 1 : event.spotsLeft}
                    </span>{' '}
                    spots remaining
                  </div>

                  {hasRsvp ? (
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>RSVP Confirmed</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleOpenRsvp(event)}
                      className="px-3.5 py-1.5 text-xs font-medium text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg transition-colors cursor-pointer"
                    >
                      Free RSVP
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* RSVP Modal */}
        {activeModalEvent && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full border border-stone-200 shadow-xl p-6 sm:p-8 relative">
              <h3 className="text-xl font-bold text-stone-900 font-display">
                Reserve Free Pass
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                {activeModalEvent.title} · {activeModalEvent.date}
              </p>

              {submittedMessage ? (
                <div className="my-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span>{submittedMessage}</span>
                </div>
              ) : (
                <form onSubmit={handleConfirmRsvp} className="mt-5 space-y-4">
                  <div>
                    <label className="text-xs font-medium text-stone-700 block mb-1">
                      Guardian / Attendee Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rachel Adams"
                      value={rsvpForm.name}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-stone-700 block mb-1">
                      Email Address for Confirmation
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rachel@example.com"
                      value={rsvpForm.email}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-stone-700 block mb-1">
                      Number of Attendees
                    </label>
                    <select
                      value={rsvpForm.attendees}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, attendees: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                    >
                      <option value="1">1 Person (Student or Parent)</option>
                      <option value="2">2 People (Parent + Student)</option>
                      <option value="3">3 People (Family)</option>
                    </select>
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveModalEvent(null)}
                      className="px-4 py-2 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm cursor-pointer"
                    >
                      Confirm Free Ticket
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
