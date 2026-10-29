import React, { useState } from 'react';
import { Menu, X, LogOut, User, ShieldCheck, Sparkles } from 'lucide-react';
import { EducareUser } from '../types/auth';
import { PWAInstallButton } from './PWAInstallButton';
import { EducareLogo } from './EducareLogo';

interface NavbarProps {
  currentUser?: EducareUser | null;
  onSignOut: () => void;
  onOpenEnrollment: (courseId?: string) => void;
  onOpenPortalDemo: () => void;
  onOpenTeamGraceApp?: () => void;
  onOpenCodeRiseApp?: () => void;
  onOpenAdvertClinicApp?: () => void;
  onOpenRoboMechApp?: () => void;
  onOpenBibleQuizApp?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onSignOut,
  onOpenEnrollment,
  onOpenPortalDemo,
  onOpenTeamGraceApp,
  onOpenCodeRiseApp,
  onOpenAdvertClinicApp,
  onOpenRoboMechApp,
  onOpenBibleQuizApp,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-stone-50/90 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-18">
          {/* Zone 1: Brand wordmark with realistic 3D Educare icon picture */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 group"
          >
            <EducareLogo size="sm" />
            <span className="font-display tracking-tight text-xl font-bold group-hover:text-amber-800 transition-colors">
              Educare
            </span>
          </a>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-600">
            <a
              href="#app-platform"
              className="text-amber-800 font-bold hover:text-amber-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 bg-amber-100/80 px-2.5 py-1 rounded-md border border-amber-300/80"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Study & Practise Platform</span>
            </a>
            <a
              href="#programs"
              className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
            >
              All 7 Course Apps
            </a>
            <a
              href="#pathfinder"
              className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
            >
              Pathway Finder
            </a>
            <a
              href="#timetable"
              className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
            >
              Timetable
            </a>
            <div className="flex items-center gap-1.5 pl-2 border-l border-stone-200">
              <button
                onClick={onOpenBibleQuizApp}
                className="px-2.5 py-1 rounded-md bg-indigo-950 text-amber-300 hover:bg-indigo-900 border border-amber-500/40 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer font-bold text-xs shadow-xs"
                title="Bible Quiz — A Place Where Youths Get Knowledge of the Bible (Genesis to Revelation)"
              >
                <span>📖</span>
                <span>Bible Quiz</span>
              </button>

              <button
                onClick={onOpenRoboMechApp}
                className="px-2.5 py-1 rounded-md bg-cyan-950 text-cyan-300 hover:bg-cyan-900 border border-cyan-800 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer font-bold text-xs shadow-xs"
                title="Robo Mech — Where Youths Learn a Skill (with Voice AI Tutor)"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>Robo Mech</span>
              </button>

              <button
                onClick={onOpenCodeRiseApp}
                className="px-2.5 py-1 rounded-md bg-orange-950 text-orange-300 hover:bg-orange-900 border border-orange-800 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer font-bold text-xs shadow-xs"
                title="Code Rise: Youth Coders"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                <span>Code Rise</span>
              </button>

              <button
                onClick={onOpenAdvertClinicApp}
                className="px-2.5 py-1 rounded-md bg-rose-950 text-rose-300 hover:bg-rose-900 border border-rose-800 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer font-bold text-xs shadow-xs"
                title="Advert Clinic — Where Youth Businesses Expand and Grow"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                <span>Advert Clinic</span>
              </button>

              <button
                onClick={onOpenTeamGraceApp}
                className="px-2 py-1 rounded-md bg-stone-900 text-stone-300 hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 cursor-pointer font-medium text-xs shadow-xs"
              >
                <span>Team Grace</span>
              </button>
            </div>
          </nav>

          {/* Zone 3: Actions + PWA Install + User Profile & Sign Out */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <PWAInstallButton variant="navbar" />

            <a
              href="#app-platform"
              className="px-3.5 py-1.5 text-xs font-bold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-stone-900" />
              <span>Study & Practise</span>
            </a>

            {currentUser && (
              <div className="relative flex items-center gap-2 pl-2 border-l border-stone-200">
                {/* User Capsule */}
                <div className="flex items-center gap-2 py-1 px-2 rounded-lg bg-stone-100 border border-stone-200 text-xs">
                  <div className="w-6 h-6 rounded-full bg-stone-900 text-amber-400 flex items-center justify-center font-bold text-[10px] font-mono">
                    {currentUser.avatar}
                  </div>
                  <div className="text-left hidden md:block">
                    <span className="font-bold text-stone-900 block leading-tight truncate max-w-[110px]">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] text-stone-500 block leading-tight">
                      {currentUser.badge}
                    </span>
                  </div>
                </div>

                {/* Sign Out Button */}
                <button
                  type="button"
                  onClick={onSignOut}
                  title="Sign out of Educare"
                  className="px-2.5 py-1.5 text-xs font-semibold text-stone-700 hover:text-stone-950 bg-stone-200/80 hover:bg-stone-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5 text-stone-600" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            {currentUser && (
              <button
                type="button"
                onClick={onSignOut}
                className="px-2 py-1 text-xs font-semibold text-stone-700 bg-stone-200 rounded-md flex items-center gap-1"
              >
                <LogOut className="w-3 h-3" />
                <span>Out</span>
              </button>
            )}
            <button
              onClick={() => onOpenEnrollment()}
              className="px-2.5 py-1 text-xs font-semibold text-stone-900 bg-amber-400 rounded-md whitespace-nowrap cursor-pointer"
            >
              Enroll
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-1.5 text-stone-600 hover:text-stone-900 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-stone-50 px-4 pt-3 pb-6 space-y-3">
          {currentUser && (
            <div className="p-3 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-amber-400 flex items-center justify-center font-bold text-xs font-mono">
                  {currentUser.avatar}
                </div>
                <div>
                  <div className="font-bold text-stone-900 text-xs">{currentUser.name}</div>
                  <div className="text-[10px] text-stone-500">{currentUser.badge} · {currentUser.email}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSignOut();
                }}
                className="text-xs font-semibold text-stone-700 bg-stone-200 hover:bg-stone-300 px-2.5 py-1 rounded-md flex items-center gap-1"
              >
                <LogOut className="w-3 h-3" />
                <span>Sign Out</span>
              </button>
            </div>
          )}

          <a
            href="#programs"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-stone-700 hover:text-stone-900"
          >
            Programs Catalog
          </a>
          <a
            href="#pathfinder"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-stone-700 hover:text-stone-900"
          >
            Youth Pathway Finder
          </a>
          <a
            href="#timetable"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-stone-700 hover:text-stone-900"
          >
            Weekly Schedule & Timetable
          </a>
          <a
            href="#studios"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-stone-700 hover:text-stone-900"
          >
            Studios & Labs
          </a>
          <a
            href="#tuition"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-emerald-800 hover:text-emerald-950"
          >
            100% Free Access Charter ($0)
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenPortalDemo();
            }}
            className="w-full text-left py-2 text-sm font-medium text-stone-600 hover:text-stone-900 flex items-center justify-between"
          >
            <span>Parent & Student Portal Preview</span>
          </button>
          {/* Interactive Course Apps launch section in mobile drawer */}
          <div className="pt-2 pb-1 border-t border-stone-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-2 px-1">
              Interactive Youth Apps
            </span>
            <div className="space-y-1.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBibleQuizApp?.();
                }}
                className="w-full text-left py-2 px-3 rounded-lg text-xs font-bold bg-indigo-950 text-amber-300 border border-amber-500/40 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <span>📖</span>
                  <span>Bible Quiz (OT to NT)</span>
                </span>
                <span className="text-[10px] font-mono uppercase bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded font-bold">
                  Certificates + Timetable
                </span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRoboMechApp?.();
                }}
                className="w-full text-left py-2 px-3 rounded-lg text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-800 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>Robo Mech (Voice AI Tutor)</span>
                </span>
                <span className="text-[10px] font-mono uppercase bg-cyan-900/60 px-1.5 py-0.5 rounded text-cyan-200 font-bold">
                  Mechatronics
                </span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCodeRiseApp?.();
                }}
                className="w-full text-left py-2 px-3 rounded-lg text-xs font-bold bg-orange-950 text-orange-300 border border-orange-800 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-400" />
                  <span>Code Rise (Youth Coders)</span>
                </span>
                <span className="text-[10px] font-mono uppercase bg-orange-900/60 px-1.5 py-0.5 rounded text-orange-200 font-bold">
                  Coding
                </span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdvertClinicApp?.();
                }}
                className="w-full text-left py-2 px-3 rounded-lg text-xs font-bold bg-rose-950 text-rose-300 border border-rose-800 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  <span>Advert Clinic</span>
                </span>
                <span className="text-[10px] font-mono uppercase bg-rose-900/60 px-1.5 py-0.5 rounded text-rose-200 font-bold">
                  Youth Growth
                </span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTeamGraceApp?.();
                }}
                className="w-full text-left py-2 px-3 rounded-lg text-xs font-semibold bg-stone-900 text-stone-200 border border-stone-800 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>Team Grace App</span>
                </span>
                <span className="text-[10px] font-mono uppercase bg-stone-800 px-1.5 py-0.5 rounded text-stone-300 font-bold">
                  AI Studio
                </span>
              </button>
            </div>
          </div>
          <div className="pt-2 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnrollment();
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm"
            >
              Enroll for Free ($0 Cost)
            </button>
            {currentUser && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSignOut();
                }}
                className="w-full py-2 text-center text-xs font-semibold text-stone-700 hover:text-stone-900 bg-stone-200 hover:bg-stone-300 rounded-lg flex items-center justify-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out of Educare</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
