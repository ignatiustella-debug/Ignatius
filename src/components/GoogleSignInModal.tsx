import React, { useState } from 'react';
import { EducareUser } from '../types/auth';
import { Shield, X, ArrowRight, UserCheck, AlertCircle, Check } from 'lucide-react';

interface GoogleSignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: EducareUser) => void;
  mode?: 'signin' | 'signup';
}

export const GoogleSignInModal: React.FC<GoogleSignInModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  mode = 'signin',
}) => {
  const [selectedAccount, setSelectedAccount] = useState<'primary' | 'custom'>('primary');
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [role, setRole] = useState<'student' | 'parent' | 'mentor'>('student');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectAccount = (accountType: 'primary' | 'custom') => {
    setSelectedAccount(accountType);
    setError(null);
  };

  const handleConfirmGoogleAuth = () => {
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      let finalName = 'Ignatius Stella';
      let finalEmail = 'ignatiustella@gmail.com';

      if (selectedAccount === 'custom') {
        const trimmedEmail = customEmail.trim().toLowerCase();
        if (!trimmedEmail || !trimmedEmail.includes('@')) {
          setIsLoading(false);
          setError('Please provide a valid Google email address.');
          return;
        }
        finalEmail = trimmedEmail;
        finalName = customName.trim() || trimmedEmail.split('@')[0].replace('.', ' ').replace(/^./, (c) => c.toUpperCase());
      }

      const initials = finalName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

      const googleUser: EducareUser = {
        id: `google-user-${Date.now()}`,
        name: finalName,
        email: finalEmail,
        role: role,
        gradeOrTitle:
          role === 'student'
            ? 'Grade 10 · Google Verified Student'
            : role === 'parent'
            ? 'Registered Guardian · Google Verified'
            : 'Faculty Mentor · Google Verified',
        avatar: initials || 'G',
        badge: 'Google Verified',
        memberSince: '2026',
        enrolledCourseIds: ['team-grace-web-studio', 'robotics-makers-01'],
      };

      setIsLoading(false);
      onSuccess(googleUser);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl bg-white text-stone-900 shadow-2xl border border-stone-200 overflow-hidden my-auto">
        {/* Google Header */}
        <div className="p-6 pb-4 border-b border-stone-100 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
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
            <div>
              <h2 className="text-lg font-bold text-stone-900 leading-tight">
                {mode === 'signup' ? 'Sign up with Google' : 'Sign in with Google'}
              </h2>
              <p className="text-xs text-stone-500">to continue to Educare Education Center</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Account Chooser */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-stone-600 font-medium">Choose an account to continue:</p>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Account 1: User's default Google Account */}
          <button
            type="button"
            onClick={() => handleSelectAccount('primary')}
            className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
              selectedAccount === 'primary'
                ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20'
                : 'border-stone-200 hover:bg-stone-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                IS
              </div>
              <div>
                <div className="font-bold text-stone-900 text-xs sm:text-sm">Ignatius Stella</div>
                <div className="text-xs text-stone-500">ignatiustella@gmail.com</div>
              </div>
            </div>
            {selectedAccount === 'primary' && (
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <Check className="w-3.5 h-3.5" />
              </span>
            )}
          </button>

          {/* Account 2: Use another Google account */}
          <div
            className={`rounded-xl border transition-all ${
              selectedAccount === 'custom'
                ? 'border-blue-600 bg-blue-50/30 ring-2 ring-blue-500/20'
                : 'border-stone-200 hover:bg-stone-50'
            }`}
          >
            <button
              type="button"
              onClick={() => handleSelectAccount('custom')}
              className="w-full p-3.5 text-left flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center border border-stone-200 font-medium text-xs">
                  +
                </div>
                <div>
                  <div className="font-bold text-stone-900 text-xs sm:text-sm">Use another Google account</div>
                  <div className="text-xs text-stone-500">Sign in with a different Gmail or Google Workspace</div>
                </div>
              </div>
              {selectedAccount === 'custom' && (
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" />
                </span>
              )}
            </button>

            {selectedAccount === 'custom' && (
              <div className="p-3.5 pt-0 space-y-2.5 border-t border-stone-100 mt-1">
                <div>
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                    Google Email Address
                  </label>
                  <input
                    type="email"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    placeholder="student@gmail.com"
                    className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="e.g. Alex Rivera"
                    className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-hidden"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Role selector */}
          <div className="pt-1 space-y-1.5">
            <label className="text-xs font-semibold text-stone-700 block">
              Select your role at Educare:
            </label>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`py-2 px-2 rounded-lg border text-center transition-all cursor-pointer font-medium ${
                  role === 'student'
                    ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                    : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                }`}
              >
                🎓 Student
              </button>
              <button
                type="button"
                onClick={() => setRole('parent')}
                className={`py-2 px-2 rounded-lg border text-center transition-all cursor-pointer font-medium ${
                  role === 'parent'
                    ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                    : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                }`}
              >
                👨‍👩‍👦 Parent
              </button>
              <button
                type="button"
                onClick={() => setRole('mentor')}
                className={`py-2 px-2 rounded-lg border text-center transition-all cursor-pointer font-medium ${
                  role === 'mentor'
                    ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                    : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                }`}
              >
                🔬 Mentor
              </button>
            </div>
          </div>

          {/* Privacy statement */}
          <div className="p-3 bg-stone-50 rounded-xl text-[11px] text-stone-500 leading-relaxed border border-stone-200/70 flex items-start gap-2">
            <Shield className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
            <span>
              Educare is 100% free. By continuing, Google will securely verify your account identity.
            </span>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={handleConfirmGoogleAuth}
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Connecting to Google...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>Continue as {selectedAccount === 'primary' ? 'Ignatius Stella' : customName || 'Google User'}</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
          <span>Protected by Google Identity Services</span>
          <button
            onClick={onClose}
            className="text-stone-600 hover:text-stone-900 font-medium cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
