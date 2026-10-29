import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Mail, MapPin, Phone, Clock } from 'lucide-react';
import { EducareLogo } from './EducareLogo';

interface FooterProps {
  onOpenEnrollment: () => void;
  onOpenPortalDemo: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEnrollment, onOpenPortalDemo }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-stone-800">
          {/* Brand Col (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-white font-display">
              <EducareLogo size="sm" />
              <span>Educare</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Educare is a 100% tuition-free, philanthropically endowed education center for youth ages 6 to 18, dedicated to hands-on computational engineering, natural sciences, creative media, and youth debate.
            </p>
            <div className="pt-2 text-xs text-stone-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>420 Innovation Way, Building C, Tech Corridor</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>(555) 382-2273 (8:30 AM – 6:00 PM)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>admissions@educare-youth.org</span>
              </div>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white font-display">
              Programs
            </div>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#programs" className="hover:text-white transition-colors">
                  Explorers (Ages 6–9)
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-white transition-colors">
                  Navigators (Ages 10–13)
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-white transition-colors">
                  Innovators (Ages 14–18)
                </a>
              </li>
              <li>
                <a href="#pathfinder" className="hover:text-white transition-colors">
                  Youth Pathway Finder
                </a>
              </li>
              <li>
                <a href="#timetable" className="hover:text-white transition-colors">
                  Class Timetable
                </a>
              </li>
            </ul>
          </div>

          {/* Learning Studios & Aid (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white font-display">
              Studios & Aid
            </div>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#studios" className="hover:text-white transition-colors">
                  Robotics Maker Lab
                </a>
              </li>
              <li>
                <a href="#studios" className="hover:text-white transition-colors">
                  Digital Media Suite
                </a>
              </li>
              <li>
                <a href="#studios" className="hover:text-white transition-colors">
                  Discovery Science Lab
                </a>
              </li>
              <li>
                <a href="#tuition" className="hover:text-white transition-colors text-emerald-400 font-medium">
                  100% Free Access Charter ($0)
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenPortalDemo}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Parent & Student Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Hours & Newsletter (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-white font-display">
              Campus Visiting Hours
            </div>
            <div className="text-xs text-stone-400 space-y-1">
              <div className="flex justify-between">
                <span>Monday – Friday:</span>
                <span className="text-stone-200">8:30 AM – 7:30 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday Cohorts:</span>
                <span className="text-stone-200">9:00 AM – 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span className="text-stone-500">Closed for Maintenance</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-white mb-2 font-display">
                Youth STEM & Arts Dispatch
              </div>
              {subscribed ? (
                <div className="p-2.5 rounded-lg bg-stone-800 text-xs text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Subscribed! Look for upcoming workshop alerts.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Parent email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs bg-stone-800 border border-stone-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 text-xs font-semibold bg-amber-400 text-stone-900 rounded-lg hover:bg-amber-300 transition-colors cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Quiet Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>
            © {new Date().getFullYear()} Educare Center for Youth. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-stone-400 cursor-pointer">Safety & Child Protection Charter</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-stone-400 cursor-pointer">Accessibility Statement</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-stone-400 cursor-pointer">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
