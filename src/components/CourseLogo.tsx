import React from 'react';

interface CourseLogoProps {
  courseId: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const CourseLogo: React.FC<CourseLogoProps> = ({
  courseId,
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-7 h-7',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const dimension = sizeMap[size] || sizeMap.md;

  // 1. Robotics, Microelectronics & Rapid Prototyping
  if (courseId === 'robotics-makers-01') {
    return (
      <div className={`relative shrink-0 rounded-xl overflow-hidden shadow-sm flex items-center justify-center bg-gradient-to-br from-emerald-950 via-slate-900 to-cyan-950 p-1.5 ${dimension} ${className}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="robo-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <radialGradient id="robo-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </radialGradient>
          </defs>
          {/* Hexagon Frame */}
          <polygon points="50,6 90,28 90,72 50,94 10,72 10,28" stroke="url(#robo-glow)" strokeWidth="3.5" fill="#041f1e" fillOpacity="0.7" />
          {/* Circuit Grid Lines */}
          <line x1="50" y1="6" x2="50" y2="30" stroke="#10b981" strokeWidth="2" strokeDasharray="2 2" />
          <line x1="10" y1="72" x2="35" y2="58" stroke="#06b6d4" strokeWidth="2" />
          <line x1="90" y1="72" x2="65" y2="58" stroke="#06b6d4" strokeWidth="2" />
          {/* Robotic Articulated Arm / Gripper */}
          <path d="M50 30 L66 46 L58 58 L50 50 L42 58 L34 46 Z" fill="url(#robo-glow)" />
          {/* Microcontroller CPU Chip */}
          <rect x="40" y="58" width="20" height="20" rx="3" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
          <circle cx="50" cy="68" r="4" fill="url(#robo-core)" />
          <line x1="36" y1="63" x2="40" y2="63" stroke="#34d399" strokeWidth="1.5" />
          <line x1="36" y1="73" x2="40" y2="73" stroke="#34d399" strokeWidth="1.5" />
          <line x1="60" y1="63" x2="64" y2="63" stroke="#34d399" strokeWidth="1.5" />
          <line x1="60" y1="73" x2="64" y2="73" stroke="#34d399" strokeWidth="1.5" />
          <circle cx="50" cy="18" r="3" fill="#67e8f9" />
        </svg>
      </div>
    );
  }

  // 2. Python, Game Physics & Algorithmic Thinking
  if (courseId === 'python-game-ai') {
    return (
      <div className={`relative shrink-0 rounded-xl overflow-hidden shadow-sm flex items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-emerald-950 p-1.5 ${dimension} ${className}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="py-blue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
            <linearGradient id="py-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          {/* Game Physics Trajectory Arc */}
          <path d="M15 80 Q 50 15 85 80" stroke="#4f46e5" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
          {/* Dual Algorithmic Python Serpents */}
          {/* Top Blue Serpent */}
          <path
            d="M50 14 C32 14 30 24 30 24 L30 36 L52 36 L52 40 L20 40 C20 40 10 40 10 54 C10 68 20 68 20 68 L26 68 L26 56 C26 46 36 46 36 46 L58 46 C68 46 72 40 72 30 C72 18 64 14 50 14 Z"
            fill="url(#py-blue)"
          />
          <circle cx="38" cy="24" r="2.5" fill="#ffffff" />
          {/* Bottom Gold/Emerald Serpent */}
          <path
            d="M50 86 C68 86 70 76 70 76 L70 64 L48 64 L48 60 L80 60 C80 60 90 60 90 46 C90 32 80 32 80 32 L74 32 L74 44 C74 54 64 54 64 54 L42 54 C32 54 28 60 28 70 C28 82 36 86 50 86 Z"
            fill="url(#py-yellow)"
          />
          <circle cx="62" cy="76" r="2.5" fill="#0f172a" />
          {/* Neural Synaptic Nodes */}
          <circle cx="50" cy="50" r="3" fill="#f8fafc" />
          <circle cx="85" cy="80" r="4" fill="#38bdf8" />
          <line x1="50" y1="50" x2="85" y2="80" stroke="#38bdf8" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }

  // 3. Team Grace: Web & AI App Studio (AI Studio)
  if (courseId === 'team-grace-web-studio') {
    return (
      <div className={`relative shrink-0 rounded-xl overflow-hidden shadow-sm flex items-center justify-center bg-gradient-to-br from-rose-950 via-stone-900 to-amber-950 p-1.5 ${dimension} ${className}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="tg-prism" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <linearGradient id="tg-core" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#facc15" />
            </linearGradient>
          </defs>
          {/* Multi-Faceted AI Studio Diamond Prism */}
          <polygon points="50,12 88,44 50,90 12,44" fill="url(#tg-prism)" opacity="0.9" />
          {/* Inner facet highlights */}
          <polygon points="50,12 88,44 50,56" fill="#fecdd3" opacity="0.4" />
          <polygon points="50,12 12,44 50,56" fill="#f43f5e" opacity="0.3" />
          <polygon points="50,56 88,44 50,90" fill="#be123c" opacity="0.5" />
          <polygon points="50,56 12,44 50,90" fill="#fbbf24" opacity="0.5" />
          {/* Code Braces < > In Center */}
          <path d="M42 46 L34 52 L42 58" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M58 46 L66 52 L58 58" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Studio Star Sparkle */}
          <path d="M50 24 L52 30 L58 32 L52 34 L50 40 L48 34 L42 32 L48 30 Z" fill="#ffffff" />
        </svg>
      </div>
    );
  }

  // 4. Digital Arts, 2D Animation & World Building
  if (courseId === 'digital-arts-animation') {
    return (
      <div className={`relative shrink-0 rounded-xl overflow-hidden shadow-sm flex items-center justify-center bg-gradient-to-br from-fuchsia-950 via-purple-950 to-pink-950 p-1.5 ${dimension} ${className}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="art-rainbow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="50%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
          {/* Creative Animation Keyframe Arcs */}
          <path d="M18 78 Q 30 22 82 28" stroke="url(#art-rainbow)" strokeWidth="3" strokeLinecap="round" />
          <path d="M26 84 Q 50 40 84 48" stroke="#f472b6" strokeWidth="2" strokeDasharray="3 3" opacity="0.7" />
          {/* Stylus Digital Pen */}
          <path d="M76 16 L88 28 L44 72 L32 74 L34 62 Z" fill="#ffffff" stroke="#c084fc" strokeWidth="2" />
          <polygon points="32,74 34,62 44,72" fill="#d946ef" />
          <circle cx="30" cy="76" r="2.5" fill="#f43f5e" />
          {/* Keyframe Diamond */}
          <polygon points="20,48 26,42 32,48 26,54" fill="#38bdf8" />
          <polygon points="68,66 74,60 80,66 74,72" fill="#fbbf24" />
          {/* Light Sparkles */}
          <circle cx="82" cy="22" r="3" fill="#fbcfe8" />
          <circle cx="58" cy="34" r="2" fill="#ffffff" />
        </svg>
      </div>
    );
  }

  // 5. Experimental Physical Sciences & Applied Optics
  if (courseId === 'experimental-science-optics') {
    return (
      <div className={`relative shrink-0 rounded-xl overflow-hidden shadow-sm flex items-center justify-center bg-gradient-to-br from-teal-950 via-slate-900 to-sky-950 p-1.5 ${dimension} ${className}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="optics-laser" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
          {/* Precision Triangular Optical Prism */}
          <polygon points="50,22 84,80 16,80" stroke="#2dd4bf" strokeWidth="3" fill="#0f2b2c" fillOpacity="0.8" />
          {/* Coherent Incident White Laser Beam */}
          <line x1="8" y1="52" x2="35" y2="52" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
          {/* Internal Refraction Beam */}
          <line x1="35" y1="52" x2="58" y2="56" stroke="#99f6e4" strokeWidth="2" />
          {/* Split Spectrum Rays (Red, Yellow, Cyan, Violet) */}
          <line x1="58" y1="56" x2="92" y2="44" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="58" y1="56" x2="92" y2="52" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
          <line x1="58" y1="56" x2="92" y2="60" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
          <line x1="58" y1="56" x2="92" y2="68" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" />
          {/* Quantum Electron Orbital Ring */}
          <ellipse cx="50" cy="52" rx="38" ry="14" stroke="#5eead4" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
          <circle cx="78" cy="46" r="2.5" fill="#38bdf8" />
        </svg>
      </div>
    );
  }

  // 6. Junior STEM Explorers: Machines & Wonder
  if (courseId === 'junior-stem-explorers') {
    return (
      <div className={`relative shrink-0 rounded-xl overflow-hidden shadow-sm flex items-center justify-center bg-gradient-to-br from-amber-950 via-stone-900 to-orange-950 p-1.5 ${dimension} ${className}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="rocket-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>
          {/* Kinetic Mechanical Cogwheel */}
          <circle cx="40" cy="62" r="18" stroke="#fbbf24" strokeWidth="3" fill="#1c1917" />
          <circle cx="40" cy="62" r="6" fill="#f59e0b" />
          {/* Gear teeth */}
          <rect x="37" y="40" width="6" height="6" rx="1" fill="#fbbf24" />
          <rect x="37" y="78" width="6" height="6" rx="1" fill="#fbbf24" />
          <rect x="18" y="59" width="6" height="6" rx="1" fill="#fbbf24" />
          <rect x="56" y="59" width="6" height="6" rx="1" fill="#fbbf24" />
          {/* High-Thrust Aero Rocket */}
          <g transform="translate(10, -5) rotate(15 50 50)">
            <path d="M50 16 C58 28 60 44 58 58 L42 58 C40 44 42 28 50 16 Z" fill="url(#rocket-grad)" />
            {/* Rocket Fins */}
            <path d="M42 46 L34 58 L42 58 Z" fill="#b45309" />
            <path d="M58 46 L66 58 L58 58 Z" fill="#b45309" />
            {/* Porthole */}
            <circle cx="50" cy="34" r="4.5" fill="#ffffff" stroke="#78350f" strokeWidth="1.5" />
            <circle cx="50" cy="34" r="2.5" fill="#38bdf8" />
            {/* Rocket Exhaust Plume */}
            <path d="M46 58 L50 74 L54 58 Z" fill="#fde047" />
          </g>
          {/* Wonder Stars */}
          <circle cx="80" cy="22" r="3" fill="#fde68a" />
          <circle cx="20" cy="26" r="2" fill="#ffffff" />
        </svg>
      </div>
    );
  }

  // Code Rise: Youth Coders
  if (courseId === 'code-rise' || courseId === 'code-rise-coders') {
    return (
      <div className={`relative shrink-0 rounded-xl overflow-hidden shadow-sm flex items-center justify-center bg-gradient-to-br from-orange-950 via-stone-900 to-amber-950 p-1.5 ${dimension} ${className}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="coderise-fire" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="50%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#facc15" />
            </linearGradient>
            <linearGradient id="coderise-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1c1917" />
              <stop offset="100%" stopColor="#292524" />
            </linearGradient>
          </defs>
          <rect x="8" y="8" width="84" height="84" rx="16" fill="url(#coderise-bg)" stroke="#ea580c" strokeWidth="2.5" />
          {/* Code Brackets */}
          <path d="M26 34 L16 48 L26 62" stroke="#fdba74" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M74 34 L84 48 L74 62" stroke="#fdba74" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Rising Steps Bar Graph */}
          <rect x="33" y="58" width="8" height="18" rx="2" fill="#fb923c" />
          <rect x="45" y="46" width="8" height="30" rx="2" fill="#f97316" />
          <rect x="57" y="32" width="8" height="44" rx="2" fill="url(#coderise-fire)" />
          {/* Sun / Rising Star */}
          <circle cx="61" cy="20" r="4.5" fill="#facc15" />
          {/* Terminal prompt symbol */}
          <path d="M42 22 L46 26 L42 30" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  // Advert Clinic: Where Youth Businesses Expand and Grow
  if (courseId === 'advert-clinic' || courseId === 'advert-clinic-growth') {
    return (
      <div className={`relative shrink-0 rounded-xl overflow-hidden shadow-sm flex items-center justify-center bg-gradient-to-br from-fuchsia-950 via-stone-900 to-rose-950 p-1.5 ${dimension} ${className}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="advert-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="50%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#c026d3" />
            </linearGradient>
            <linearGradient id="gold-growth" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>
          <rect x="8" y="8" width="84" height="84" rx="16" fill="#18181b" stroke="#f43f5e" strokeWidth="2" />
          {/* Megaphone Body */}
          <path d="M22 42 L34 36 L52 24 L52 68 L34 56 L22 56 Z" fill="url(#advert-glow)" stroke="#fda4af" strokeWidth="1.5" />
          <path d="M30 56 L34 74 L42 74 L38 56 Z" fill="#e11d48" />
          {/* Acoustic Sound Waves */}
          <path d="M58 36 C64 42 64 50 58 56" stroke="#fb7185" strokeWidth="3" strokeLinecap="round" />
          <path d="M66 30 C76 40 76 56 66 66" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
          {/* Growth Rocket / Exponential Arrow */}
          <path d="M54 68 L72 34 L82 44" stroke="url(#gold-growth)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <polygon points="72,34 82,34 82,44" fill="#34d399" />
          {/* Sparkles */}
          <circle cx="78" cy="22" r="3" fill="#facc15" />
          <circle cx="28" cy="26" r="2" fill="#38bdf8" />
        </svg>
      </div>
    );
  }

  // Robo Mech: Where Youths Learn a Skill
  if (courseId === 'robo-mech' || courseId === 'robo-mech-robotics') {
    return (
      <div className={`relative shrink-0 rounded-xl overflow-hidden shadow-sm flex items-center justify-center bg-gradient-to-br from-cyan-950 via-slate-900 to-blue-950 p-1.5 ${dimension} ${className}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="robomech-metal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <radialGradient id="robomech-eye" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="100%" stopColor="#0284c7" />
            </radialGradient>
          </defs>
          <rect x="8" y="8" width="84" height="84" rx="16" fill="#0b1329" stroke="#38bdf8" strokeWidth="2.5" />
          {/* Robotic Torque Gears */}
          <circle cx="50" cy="50" r="26" stroke="#0ea5e9" strokeWidth="3" strokeDasharray="5 3" fill="#0f172a" />
          <circle cx="50" cy="50" r="14" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
          {/* AI Optical Eye / Sensor */}
          <circle cx="50" cy="50" r="7" fill="url(#robomech-eye)" />
          {/* Articulated Gripper Arms */}
          <path d="M26 30 L40 40 L34 50" stroke="url(#robomech-metal)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M74 30 L60 40 L66 50" stroke="url(#robomech-metal)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          {/* Hydraulic Actuator Piston */}
          <line x1="50" y1="20" x2="50" y2="34" stroke="#67e8f9" strokeWidth="3" strokeLinecap="round" />
          <circle cx="50" cy="20" r="3" fill="#38bdf8" />
          {/* Audio Wave Signals from AI Voice Tutor */}
          <path d="M38 74 Q 44 68 50 74 T 62 74" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <circle cx="32" cy="74" r="1.5" fill="#67e8f9" />
          <circle cx="68" cy="74" r="1.5" fill="#67e8f9" />
        </svg>
      </div>
    );
  }

  // 11. Bible Quiz — A Place Where Youths Get Knowledge of the Bible
  if (courseId === 'bible-quiz') {
    return (
      <div className={`relative shrink-0 rounded-xl overflow-hidden shadow-sm flex items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-amber-950 p-1.5 ${dimension} ${className}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="bible-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="40%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <radialGradient id="bible-glow" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0c1222" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Radiant Aura */}
          <circle cx="50" cy="45" r="38" fill="url(#bible-glow)" />
          {/* Light Rays */}
          <line x1="50" y1="10" x2="50" y2="20" stroke="#fde047" strokeWidth="2" strokeLinecap="round" />
          <line x1="28" y1="18" x2="35" y2="26" stroke="#fde047" strokeWidth="2" strokeLinecap="round" />
          <line x1="72" y1="18" x2="65" y2="26" stroke="#fde047" strokeWidth="2" strokeLinecap="round" />
          {/* Holy Cross */}
          <rect x="47.5" y="16" width="5" height="22" rx="1.5" fill="url(#bible-gold)" />
          <rect x="40" y="22" width="20" height="5" rx="1.5" fill="url(#bible-gold)" />
          {/* Open Book (Holy Bible) Spine & Cover */}
          <path d="M14 74 Q 32 68 50 74 Q 68 68 86 74 L 88 42 Q 68 36 50 42 Q 32 36 12 42 Z" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="2.5" />
          {/* Open Pages */}
          <path d="M16 71 Q 33 65 50 71 L 50 43 Q 33 37 16 43 Z" fill="#fffbeb" />
          <path d="M84 71 Q 67 65 50 71 L 50 43 Q 67 37 84 43 Z" fill="#fef3c7" />
          {/* Center Spine Divider */}
          <line x1="50" y1="42" x2="50" y2="72" stroke="#b45309" strokeWidth="2.5" />
          {/* Gilded Text Lines */}
          <line x1="22" y1="48" x2="44" y2="48" stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="22" y1="54" x2="44" y2="54" stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="22" y1="60" x2="38" y2="60" stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="56" y1="48" x2="78" y2="48" stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="56" y1="54" x2="78" y2="54" stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="56" y1="60" x2="72" y2="60" stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" />
          {/* Purple Bookmark Ribbon */}
          <path d="M48 42 L48 84 L52 78 L56 84 L56 42 Z" fill="#9333ea" />
          {/* Alpha & Omega Indicators */}
          <text x="24" y="68" fill="#b45309" fontSize="6" fontFamily="serif" fontWeight="bold">Α</text>
          <text x="72" y="68" fill="#b45309" fontSize="6" fontFamily="serif" fontWeight="bold">Ω</text>
        </svg>
      </div>
    );
  }

  // 7. Competitive Debate, Moral Philosophy & Rhetoric (Default)
  return (
    <div className={`relative shrink-0 rounded-xl overflow-hidden shadow-sm flex items-center justify-center bg-gradient-to-br from-amber-950 via-stone-900 to-indigo-950 p-1.5 ${dimension} ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="debate-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
        </defs>
        {/* Laurel Wreath */}
        <path d="M24 64 C18 48 22 28 42 20" stroke="url(#debate-gold)" strokeWidth="3" strokeLinecap="round" />
        <path d="M76 64 C82 48 78 28 58 20" stroke="url(#debate-gold)" strokeWidth="3" strokeLinecap="round" />
        {/* Classical Ionic Pillar / Column */}
        <rect x="36" y="26" width="28" height="6" rx="2" fill="#ffffff" />
        <rect x="40" y="32" width="5" height="38" fill="url(#debate-gold)" />
        <rect x="47.5" y="32" width="5" height="38" fill="#ffffff" />
        <rect x="55" y="32" width="5" height="38" fill="url(#debate-gold)" />
        <rect x="34" y="70" width="32" height="7" rx="2" fill="#ffffff" />
        {/* Balance Scales & Acoustic Speech Waves */}
        <path d="M22 36 Q 30 32 38 36" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
        <path d="M62 36 Q 70 32 78 36" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
        <circle cx="50" cy="16" r="3.5" fill="#facc15" />
      </svg>
    </div>
  );
};
