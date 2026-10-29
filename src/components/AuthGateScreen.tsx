import React, { useState } from 'react';
import { EducareUser } from '../types/auth';
import { GoogleSignInModal } from './GoogleSignInModal';
import { DownloadAppModal } from './DownloadAppModal';
import { FloatingDownloadSign } from './FloatingDownloadSign';
import { EducareLogo } from './EducareLogo';
import {
  GraduationCap,
  Lock,
  Mail,
  User,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  Download,
  Smartphone,
  Laptop,
  Check,
  WifiOff,
} from 'lucide-react';

interface AuthGateScreenProps {
  onSignIn: (user: EducareUser) => void;
}

export const AuthGateScreen: React.FC<AuthGateScreenProps> = ({ onSignIn }) => {
  const [tab, setTab] = useState<'signin' | 'register'>('signin');

  // Google Modal State
  const [googleModalOpen, setGoogleModalOpen] = useState(false);
  const [googleMode, setGoogleMode] = useState<'signin' | 'signup'>('signin');

  // Download App Modal State
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  // Sign-in form state
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [signInError, setSignInError] = useState<string | null>(null);

  // Registration form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState<'student' | 'parent' | 'mentor'>('student');
  const [regAge, setRegAge] = useState('14');
  const [regGrade, setRegGrade] = useState('Grade 9');
  const [regError, setRegError] = useState<string | null>(null);
  const [regSuccess, setRegSuccess] = useState(false);

  const handleOpenGoogle = (mode: 'signin' | 'signup') => {
    setGoogleMode(mode);
    setGoogleModalOpen(true);
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignInError(null);

    const emailTrimmed = signInEmail.trim().toLowerCase();
    if (!emailTrimmed) {
      setSignInError('Please enter your email or username.');
      return;
    }
    if (!signInPassword) {
      setSignInError('Please enter your password.');
      return;
    }

    if (signInPassword.length < 4) {
      setSignInError('Password must be at least 4 characters.');
      return;
    }

    // Generate authenticated user profile from valid credentials
    const cleanName = emailTrimmed.includes('@')
      ? emailTrimmed.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
      : emailTrimmed.replace(/\b\w/g, (c) => c.toUpperCase());

    const initials = cleanName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'EU';

    const customUser: EducareUser = {
      id: `user-${Date.now()}`,
      name: cleanName,
      email: emailTrimmed.includes('@') ? emailTrimmed : `${emailTrimmed}@educare.org`,
      role: 'student',
      gradeOrTitle: 'Student Member',
      avatar: initials,
      badge: 'Student Member',
      memberSince: '2026',
      enrolledCourseIds: ['team-grace-web-studio'],
    };

    onSignIn(customUser);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);

    if (!regName.trim()) {
      setRegError('Please provide your full name.');
      return;
    }
    if (!regEmail.trim() || !regEmail.includes('@')) {
      setRegError('Please provide a valid email address.');
      return;
    }
    if (regPassword.length < 6) {
      setRegError('Password must be at least 6 characters.');
      return;
    }

    const initials = regName
      .trim()
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const newUser: EducareUser = {
      id: `user-reg-${Date.now()}`,
      name: regName.trim(),
      email: regEmail.trim().toLowerCase(),
      role: regRole,
      age: regRole === 'student' ? parseInt(regAge, 10) || 14 : undefined,
      gradeOrTitle:
        regRole === 'student'
          ? `${regGrade} · Age ${regAge}`
          : regRole === 'parent'
          ? 'Registered Guardian'
          : 'Volunteer Educator',
      avatar: initials || 'EU',
      badge:
        regRole === 'student'
          ? 'Student Member'
          : regRole === 'parent'
          ? 'Parent & Guardian'
          : 'Faculty Mentor',
      memberSince: '2026',
      enrolledCourseIds: [],
    };

    setRegSuccess(true);
    setTimeout(() => {
      onSignIn(newUser);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col justify-between selection:bg-amber-400 selection:text-stone-950 relative">
      {/* Top Bar Banner with Download Sign */}
      <header className="border-b border-stone-800 bg-stone-950/90 px-4 sm:px-8 py-3.5 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <EducareLogo size="md" />
            <div>
              <span className="font-bold tracking-tight text-lg sm:text-xl text-white font-display block leading-tight">
                Educare
              </span>
              <span className="text-[11px] text-amber-400 font-medium tracking-wide uppercase">
                Education Center for Youth · 100% Free
              </span>
            </div>
          </div>

          {/* Prominent Download App Sign in Header */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setDownloadModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-400 hover:text-amber-300 border border-amber-400/40 text-xs font-bold transition-all shadow-sm cursor-pointer"
              title="Download Educare app on phone or computer"
            >
              <Download className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="hidden sm:inline">Download App (Phone & PC)</span>
              <span className="sm:hidden">Download App</span>
              <span className="hidden md:flex items-center gap-1 text-[10px] text-stone-300 bg-stone-900 px-1.5 py-0.5 rounded border border-stone-700">
                <Smartphone className="w-3 h-3 text-amber-400" />
                <Laptop className="w-3 h-3 text-amber-400" />
              </span>
            </button>

            <div className="hidden lg:flex items-center gap-1.5 text-xs text-stone-400 bg-stone-900 border border-stone-800 px-3 py-1.5 rounded-lg">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Authentication Required</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Split Grid */}
      <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full items-center">
          {/* Left Hero / Center Overview (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tuition-Free Endowed Center for Youth (Ages 6–18)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display leading-[1.15]">
              Welcome to Educare Learning Center
            </h1>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Please sign in or create your free account to access our complete 5-level course curricula, interactive practice sandboxes, and offline application suites.
            </p>

            {/* Value checklist */}
            <div className="space-y-3 pt-2 text-xs sm:text-sm text-stone-300">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>100% Free ($0):</strong> All equipment, workstations, components & tools provided.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>7 Complete Course Apps:</strong> 5 progressive levels, 50 lessons & labs each.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Interactive Practice:</strong> Live physics simulators, radar benches & canvas labs.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Standalone Offline Apps:</strong> Download every course outside Educare on its own.</span>
              </div>
            </div>

            {/* Prominent Download Sign Card */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-stone-950 to-stone-900 border border-amber-400/40 text-xs text-stone-300 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-400 text-stone-950 flex items-center justify-center font-bold">
                    <Download className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-white text-sm">Download Educare App</span>
                </div>
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <WifiOff className="w-2.5 h-2.5" /> Offline Ready
                </span>
              </div>
              <p className="text-stone-400 text-xs leading-relaxed mb-3">
                Easily download Educare directly to your <strong>iPhone, Android phone, Windows PC, or Mac</strong> with one click.
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDownloadModalOpen(true)}
                  className="flex-1 py-2 px-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <Laptop className="w-3.5 h-3.5" />
                  <span>Get App for Phone or Computer</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Card / Auth Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-stone-950 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
              {/* Tab Switcher: Strictly Sign In or Create Account */}
              <div className="grid grid-cols-2 gap-1 bg-stone-900 p-1 rounded-xl mb-6 border border-stone-800 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setTab('signin')}
                  className={`py-2.5 rounded-lg transition-all cursor-pointer text-center font-bold ${
                    tab === 'signin'
                      ? 'bg-amber-400 text-stone-950 shadow-sm'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setTab('register')}
                  className={`py-2.5 rounded-lg transition-all cursor-pointer text-center font-bold ${
                    tab === 'register'
                      ? 'bg-amber-400 text-stone-950 shadow-sm'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* TAB 1: SIGN IN */}
              {tab === 'signin' && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-xl font-bold text-white font-display">Sign In to Educare</h2>
                    <p className="text-xs text-stone-400 mt-1">
                      Choose Google or enter your student/parent email to access the center.
                    </p>
                  </div>

                  {/* Primary Requirement: CONTINUE WITH GOOGLE BUTTON */}
                  <div>
                    <button
                      type="button"
                      onClick={() => handleOpenGoogle('signin')}
                      className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 transition-all shadow-md flex items-center justify-center gap-3 cursor-pointer group"
                    >
                      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                      <span className="font-extrabold tracking-tight">Continue with Google</span>
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="relative flex items-center justify-center my-4">
                    <div className="border-t border-stone-800 w-full" />
                    <span className="bg-stone-950 px-3 text-[11px] font-semibold text-stone-500 uppercase tracking-wider relative">
                      or sign in with email
                    </span>
                  </div>

                  {/* Email & Password Form */}
                  <form onSubmit={handleSignInSubmit} className="space-y-4">
                    {signInError && (
                      <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                        {signInError}
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-stone-300">
                        Email Address or Username
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={signInEmail}
                          onChange={(e) => setSignInEmail(e.target.value)}
                          placeholder="e.g. student@educare.org"
                          className="w-full bg-stone-900 border border-stone-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-lg pl-10 pr-3 py-2.5 text-xs text-white placeholder:text-stone-500 outline-hidden transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-stone-300">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={signInPassword}
                          onChange={(e) => setSignInPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-stone-900 border border-stone-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-lg pl-10 pr-10 py-2.5 text-xs text-white placeholder:text-stone-500 outline-hidden transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <label className="flex items-center gap-2 text-stone-400 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="rounded border-stone-700 bg-stone-900 text-amber-400 focus:ring-amber-400"
                        />
                        <span>Remember me</span>
                      </label>
                      <span className="text-stone-500 text-[11px]">Protected by Endowed Charter</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-amber-400 hover:bg-amber-300 text-stone-950 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Sign In & Enter Educare</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="pt-4 border-t border-stone-900 flex items-center justify-between text-xs text-stone-400">
                      <span>Don't have an account yet?</span>
                      <button
                        type="button"
                        onClick={() => setTab('register')}
                        className="text-amber-400 font-semibold hover:underline cursor-pointer"
                      >
                        Create Free Account ($0)
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 2: REGISTER */}
              {tab === 'register' && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-xl font-bold text-white font-display">Create Free Youth Account</h2>
                    <p className="text-xs text-stone-400 mt-1">
                      100% Free Tuition. Join our community to access courses, simulators & labs.
                    </p>
                  </div>

                  {/* Primary Requirement: SIGN UP WITH GOOGLE */}
                  <div>
                    <button
                      type="button"
                      onClick={() => handleOpenGoogle('signup')}
                      className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 transition-all shadow-md flex items-center justify-center gap-3 cursor-pointer group"
                    >
                      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                      <span className="font-extrabold tracking-tight">Sign up with Google</span>
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="relative flex items-center justify-center my-4">
                    <div className="border-t border-stone-800 w-full" />
                    <span className="bg-stone-950 px-3 text-[11px] font-semibold text-stone-500 uppercase tracking-wider relative">
                      or register with email
                    </span>
                  </div>

                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    {regError && (
                      <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                        {regError}
                      </div>
                    )}

                    {regSuccess && (
                      <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        <span>Account registered! Entering Educare center...</span>
                      </div>
                    )}

                    {/* Role picker */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-stone-300 block">I am joining as a:</label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setRegRole('student')}
                          className={`p-2.5 rounded-lg border text-xs font-medium text-left transition-all cursor-pointer ${
                            regRole === 'student'
                              ? 'bg-amber-400 text-stone-950 border-amber-400 font-bold shadow-xs'
                              : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-stone-700'
                          }`}
                        >
                          🎓 Student
                        </button>
                        <button
                          type="button"
                          onClick={() => setRegRole('parent')}
                          className={`p-2.5 rounded-lg border text-xs font-medium text-left transition-all cursor-pointer ${
                            regRole === 'parent'
                              ? 'bg-amber-400 text-stone-950 border-amber-400 font-bold shadow-xs'
                              : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-stone-700'
                          }`}
                        >
                          👨‍👩‍👦 Guardian
                        </button>
                        <button
                          type="button"
                          onClick={() => setRegRole('mentor')}
                          className={`p-2.5 rounded-lg border text-xs font-medium text-left transition-all cursor-pointer ${
                            regRole === 'mentor'
                              ? 'bg-amber-400 text-stone-950 border-amber-400 font-bold shadow-xs'
                              : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-stone-700'
                          }`}
                        >
                          🔬 Faculty
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-stone-300">Full Name</label>
                        <input
                          type="text"
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          placeholder="e.g. Maya Chen"
                          className="w-full bg-stone-900 border border-stone-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-lg px-3 py-2 text-xs text-white placeholder:text-stone-500 outline-hidden"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-stone-300">Email Address</label>
                        <input
                          type="email"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          placeholder="e.g. maya@student.educare.org"
                          className="w-full bg-stone-900 border border-stone-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-lg px-3 py-2 text-xs text-white placeholder:text-stone-500 outline-hidden"
                        />
                      </div>
                    </div>

                    {regRole === 'student' && (
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-stone-300">Youth Age</label>
                          <select
                            value={regAge}
                            onChange={(e) => setRegAge(e.target.value)}
                            className="w-full bg-stone-900 border border-stone-800 focus:border-amber-400 rounded-lg px-3 py-2 text-xs text-white outline-hidden cursor-pointer"
                          >
                            {Array.from({ length: 13 }, (_, i) => i + 6).map((age) => (
                              <option key={age} value={age}>
                                {age} years old
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-stone-300">Current Grade</label>
                          <select
                            value={regGrade}
                            onChange={(e) => setRegGrade(e.target.value)}
                            className="w-full bg-stone-900 border border-stone-800 focus:border-amber-400 rounded-lg px-3 py-2 text-xs text-white outline-hidden cursor-pointer"
                          >
                            <option value="Elementary (Grades 1–4)">Elementary (Grades 1–4)</option>
                            <option value="Middle School (Grades 5–8)">Middle School (Grades 5–8)</option>
                            <option value="Grade 9 (High School)">Grade 9 (High School)</option>
                            <option value="Grade 10 (High School)">Grade 10 (High School)</option>
                            <option value="Grade 11 (High School)">Grade 11 (High School)</option>
                            <option value="Grade 12 (High School)">Grade 12 (High School)</option>
                          </select>
                        </div>
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-stone-300">Create Password</label>
                      <input
                        type="password"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="Minimum 6 characters"
                        className="w-full bg-stone-900 border border-stone-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-lg px-3 py-2 text-xs text-white placeholder:text-stone-500 outline-hidden"
                      />
                    </div>

                    <div className="p-3 rounded-lg bg-stone-900/80 border border-stone-800 text-[11px] text-stone-400 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Tuition is 100% free under the Educare Community Endowment. Zero payment required.</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-amber-400 hover:bg-amber-300 text-stone-950 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Complete Free Registration ($0)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="pt-4 border-t border-stone-900 flex items-center justify-between text-xs text-stone-400">
                      <span>Already have an account?</span>
                      <button
                        type="button"
                        onClick={() => setTab('signin')}
                        className="text-amber-400 font-semibold hover:underline cursor-pointer"
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer Strip */}
      <footer className="border-t border-stone-800 bg-stone-950/60 py-4 px-4 sm:px-8 text-center text-xs text-stone-500">
        <p>
          Educare Education Center for Youth · 100% Tuition-Free Community Charter · Safe Student Data Policy
        </p>
      </footer>

      {/* Google Sign-In Modal */}
      <GoogleSignInModal
        isOpen={googleModalOpen}
        onClose={() => setGoogleModalOpen(false)}
        onSuccess={(googleUser) => {
          setGoogleModalOpen(false);
          onSignIn(googleUser);
        }}
        mode={googleMode}
      />

      {/* Download App Modal */}
      <DownloadAppModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />

      {/* Persistent Floating Download Sign */}
      <FloatingDownloadSign />
    </div>
  );
};
