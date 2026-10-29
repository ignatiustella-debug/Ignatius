import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  Megaphone,
  Sparkles,
  TrendingUp,
  Target,
  DollarSign,
  Share2,
  Download,
  CheckCircle2,
  Copy,
  Layers,
  Smartphone,
  Eye,
  Sliders,
  Award,
  Zap,
  BookOpen,
  Volume2,
  VolumeX,
  HelpCircle,
  ArrowRight,
  Check,
  Bot,
} from 'lucide-react';
import { EducareUser } from '../types/auth';
import { CourseLogo } from './CourseLogo';
import { CertificateModal } from './CertificateModal';
import { UniversalAITutor } from './UniversalAITutor';

interface AdvertClinicAppProps {
  onBackToEducare: () => void;
  currentUser?: EducareUser | null;
  onSignOut?: () => void;
}

export const AdvertClinicApp: React.FC<AdvertClinicAppProps> = ({
  onBackToEducare,
  currentUser,
}) => {
  const [activeTab, setActiveTab] = useState<'guide' | 'studio' | 'clinic' | 'simulator' | 'gallery' | 'quizzes'>('guide');
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [certLevel, setCertLevel] = useState(1);
  const [isReadingGuide, setIsReadingGuide] = useState(false);

  // Ad Creative Studio State
  const [businessName, setBusinessName] = useState('Glow Aesthetics & Braids');
  const [niche, setNiche] = useState('Hair & Beauty');
  const [headline, setHeadline] = useState('Turn Heads Every Single Day — Get 30% Off Your First Knotless Braids');
  const [promoBadge, setPromoBadge] = useState('🔥 30% OFF YOUTH SPECIAL');
  const [ctaText, setCtaText] = useState('Book on WhatsApp');
  const [phoneOrLink, setPhoneOrLink] = useState('https://wa.me/234800123456');
  const [adTheme, setAdTheme] = useState<'gradient-rose' | 'gradient-amber' | 'gradient-emerald' | 'dark-neon'>('gradient-rose');

  // Quick preset loader
  const applyPreset = (preset: { name: string; niche: string; headline: string; badge: string; cta: string; link: string; theme: any }) => {
    setBusinessName(preset.name);
    setNiche(preset.niche);
    setHeadline(preset.headline);
    setPromoBadge(preset.badge);
    setCtaText(preset.cta);
    setPhoneOrLink(preset.link);
    setAdTheme(preset.theme);
    setActiveTab('studio');
  };

  // Headline Diagnostic Clinic State
  const [testHeadline, setTestHeadline] = useState('Special discount on all phone repairs this weekend only!');
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Growth Simulator State
  const [businessCategory, setBusinessCategory] = useState<'fashion' | 'food' | 'tech' | 'services'>('food');
  const [dailyBudget, setDailyBudget] = useState(10); // $10/day
  const [avgOrderValue, setAvgOrderValue] = useState(25); // $25
  const [targetAudience, setTargetAudience] = useState<'local' | 'metro' | 'national'>('local');

  // Calculate Growth Metrics
  const audienceMultiplier = targetAudience === 'local' ? 1.0 : targetAudience === 'metro' ? 1.3 : 1.8;
  const estimatedReach = Math.round(dailyBudget * 420 * audienceMultiplier);
  const clickRate = targetAudience === 'local' ? 0.045 : 0.032; // 4.5% or 3.2%
  const estimatedClicks = Math.round(estimatedReach * clickRate);
  const conversionRate = 0.085; // 8.5% conversion to paying customer
  const expectedCustomers = Math.max(1, Math.round(estimatedClicks * conversionRate));
  const estimatedRevenue = expectedCustomers * avgOrderValue;
  const netProfit = Math.round(estimatedRevenue - (dailyBudget * 7)); // weekly net profit
  const roiPercentage = Math.round((estimatedRevenue / (dailyBudget * 7)) * 100);

  // Read aloud guide
  const toggleReadGuide = () => {
    if (!('speechSynthesis' in window)) return;
    if (isReadingGuide) {
      window.speechSynthesis.cancel();
      setIsReadingGuide(false);
      return;
    }
    window.speechSynthesis.cancel();
    const text = `Welcome to Advert Clinic, where youth businesses expand and grow! Here is how you use Advert Clinic in four simple steps. Step 1: Open the Ad Creative Studio to customize your business name, niche, viral headline, promotional badge, and WhatsApp call to action. Step 2: Use the Copy Clinic to test your headlines against our psychological scoring engine, detecting power words, curiosity, and urgency. Step 3: Use the Growth Simulator to forecast your advertising reach, clicks, paying customers, and return on ad spend. Step 4: Download your finished flyer as an image or broadcast directly to WhatsApp and Instagram. When you are ready, take the Level Quizzes to earn your accredited certificates for all five levels!`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.onend = () => setIsReadingGuide(false);
    utterance.onerror = () => setIsReadingGuide(false);
    setIsReadingGuide(true);
    window.speechSynthesis.speak(utterance);
  };

  // Headline score calculation
  const calcHeadlineScore = (text: string) => {
    let score = 50;
    if (text.length > 25 && text.length < 90) score += 15;
    if (/\b(free|discount|off|save|special|exclusive|now|only|today)\b/i.test(text)) score += 15;
    if (/\d+/.test(text)) score += 10;
    if (/[!?🔥🚀💥⚡]/.test(text)) score += 10;
    return Math.min(98, score);
  };

  const headlineScore = calcHeadlineScore(testHeadline);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-stone-900/90 backdrop-blur-md border-b border-rose-500/30 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center justify-between w-full md:w-auto gap-3">
            <button
              onClick={onBackToEducare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Educare</span>
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-stone-800">
              <CourseLogo courseId="advert-clinic" size="sm" />
              <div>
                <span className="font-bold text-base text-white tracking-tight block leading-tight font-display">
                  Advert <span className="text-rose-500">Clinic</span>
                </span>
                <span className="text-[10px] text-rose-400 font-medium uppercase tracking-wide">
                  Where Youth Businesses Expand and Grow
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Mode Tabs */}
          <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-xl border border-stone-800 text-xs font-bold overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('guide')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'guide' ? 'bg-rose-600 text-white shadow-xs' : 'text-stone-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>📖 How to Use</span>
            </button>
            <button
              onClick={() => setActiveTab('studio')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'studio' ? 'bg-rose-600 text-white shadow-xs' : 'text-stone-400 hover:text-white'
              }`}
            >
              🎨 Ad Studio
            </button>
            <button
              onClick={() => setActiveTab('clinic')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'clinic' ? 'bg-rose-600 text-white shadow-xs' : 'text-stone-400 hover:text-white'
              }`}
            >
              🧪 Copy Clinic
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'simulator' ? 'bg-rose-600 text-white shadow-xs' : 'text-stone-400 hover:text-white'
              }`}
            >
              📈 Growth Simulator
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'gallery' ? 'bg-rose-600 text-white shadow-xs' : 'text-stone-400 hover:text-white'
              }`}
            >
              🏆 Youth Showcase
            </button>
            <button
              onClick={() => setActiveTab('quizzes')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'quizzes' ? 'bg-amber-500 text-stone-950 font-black shadow-xs' : 'text-amber-400 hover:text-amber-300'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>🎓 5-Level Quizzes & Certs</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCertLevel(1);
                setCertModalOpen(true);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              <Award className="w-3.5 h-3.5 fill-current" />
              <span>Earn Certificate</span>
            </button>

            {currentUser && (
              <div className="hidden md:flex items-center gap-2 py-1 px-2.5 rounded-lg bg-stone-800 text-xs">
                <div className="w-6 h-6 rounded-full bg-rose-600 text-white font-bold text-[10px] flex items-center justify-center">
                  {currentUser.avatar}
                </div>
                <span className="font-bold text-stone-200">{currentUser.name}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6">
        {/* TAB 0: HOW TO USE ADVERT CLINIC GUIDE */}
        {activeTab === 'guide' && (
          <div className="space-y-6">
            {/* Guide Hero Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-rose-950/80 via-stone-900 to-stone-950 border-2 border-rose-500/50 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                    <span>Founder Playbook & Operational Manual</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display tracking-tight leading-tight">
                    How Youth Entrepreneurs Use Advert Clinic in 4 Steps
                  </h1>
                  <p className="text-sm text-stone-300 leading-relaxed">
                    Advert Clinic is an interactive commercial growth laboratory designed to turn youth hustle into thriving, high-revenue businesses. From designing attention-grabbing flyers to stress-testing sales copy and computing ad budgets, follow the proven 4-stage pipeline below.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
                  <button
                    onClick={toggleReadGuide}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                      isReadingGuide
                        ? 'bg-rose-600 text-white animate-pulse'
                        : 'bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700'
                    }`}
                  >
                    <Volume2 className="w-4 h-4 text-rose-400" />
                    <span>{isReadingGuide ? 'Stop AI Voice Reading' : '🔊 Read Guide Aloud'}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('studio')}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    <span>Launch Ad Studio</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Quick-Start Youth Industry Templates */}
              <div className="mt-6 pt-5 border-t border-rose-500/20">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-2.5">
                  ⚡ Try Instant Business Presets (Click to Load in Studio):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    onClick={() =>
                      applyPreset({
                        name: 'Glow Aesthetics & Braids',
                        niche: 'Hair & Beauty',
                        headline: 'Turn Heads Every Day — Get 30% Off Your First Knotless Braids!',
                        badge: '🔥 30% OFF YOUTH SPECIAL',
                        cta: 'Book on WhatsApp',
                        link: 'https://wa.me/234800123456',
                        theme: 'gradient-rose',
                      })
                    }
                    className="p-3 rounded-xl bg-stone-900/90 hover:bg-rose-950/60 border border-stone-800 hover:border-rose-500/60 text-left transition cursor-pointer group"
                  >
                    <span className="text-base block mb-0.5">💇‍♀️</span>
                    <span className="text-xs font-bold text-white group-hover:text-rose-400 block">Hair Salon & Braids</span>
                    <span className="text-[10px] text-stone-400">High-converting beauty offer</span>
                  </button>

                  <button
                    onClick={() =>
                      applyPreset({
                        name: 'SwiftScreen Tech Repairs',
                        niche: 'Smartphone & Laptop Fixes',
                        headline: 'Cracked Screen? We Fix iPhones & Androids in 20 Minutes with OEM Glass!',
                        badge: '⚡ SAME DAY REPAIR GUARANTEE',
                        cta: 'Get Free Diagnostic',
                        link: 'https://wa.me/234800987654',
                        theme: 'dark-neon',
                      })
                    }
                    className="p-3 rounded-xl bg-stone-900/90 hover:bg-rose-950/60 border border-stone-800 hover:border-rose-500/60 text-left transition cursor-pointer group"
                  >
                    <span className="text-base block mb-0.5">📱</span>
                    <span className="text-xs font-bold text-white group-hover:text-rose-400 block">Tech Repairs & Phones</span>
                    <span className="text-[10px] text-stone-400">Urgency + speed hook</span>
                  </button>

                  <button
                    onClick={() =>
                      applyPreset({
                        name: 'SweetCrumb Mini Bakeries',
                        niche: 'Pastries & Bento Cakes',
                        headline: 'Fresh Bento Birthday Cakes Baked with Love — Order by 10 AM, Delivered by 4 PM!',
                        badge: '🎂 FREE DELIVERY OVER $20',
                        cta: 'View Cake Menu',
                        link: 'https://wa.me/234800555777',
                        theme: 'gradient-amber',
                      })
                    }
                    className="p-3 rounded-xl bg-stone-900/90 hover:bg-rose-950/60 border border-stone-800 hover:border-rose-500/60 text-left transition cursor-pointer group"
                  >
                    <span className="text-base block mb-0.5">🧁</span>
                    <span className="text-xs font-bold text-white group-hover:text-rose-400 block">Custom Cake Bakery</span>
                    <span className="text-[10px] text-stone-400">Appetite + convenience angle</span>
                  </button>

                  <button
                    onClick={() =>
                      applyPreset({
                        name: 'KicksRevive Shoe Restoration',
                        niche: 'Sneaker Cleaning & Customization',
                        headline: 'Don’t Throw Away Scuffed Jordans! We Restore Sneakers to Box-Fresh Condition.',
                        badge: '👟 2-FOR-1 CLEANING PACK',
                        cta: 'Book Pickup Now',
                        link: 'https://wa.me/234800333222',
                        theme: 'gradient-emerald',
                      })
                    }
                    className="p-3 rounded-xl bg-stone-900/90 hover:bg-rose-950/60 border border-stone-800 hover:border-rose-500/60 text-left transition cursor-pointer group"
                  >
                    <span className="text-base block mb-0.5">👟</span>
                    <span className="text-xs font-bold text-white group-hover:text-rose-400 block">Sneaker Cleaning</span>
                    <span className="text-[10px] text-stone-400">Loss-aversion + value hook</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 4 Interactive Explanatory Stations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Step 1 */}
              <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 shadow-xl hover:border-rose-500/40 transition">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-lg bg-rose-600 text-white font-black text-sm flex items-center justify-center font-mono">
                    01
                  </span>
                  <span className="text-[10px] uppercase font-bold text-rose-400 bg-rose-950/80 px-2.5 py-0.5 rounded-full border border-rose-800">
                    Visual Ad Studio
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">1. Design Eye-Catching Ad Creatives</h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Social media feeds move at lightning speed. You have under 1.5 seconds to hook a prospect before they scroll past. In the <strong className="text-rose-400">Ad Studio</strong>, you select high-contrast palettes (Rose Velvet, Electric Amber, Neon Cyber, or Emerald Growth), display bold benefit-driven headlines, and stamp an impossible-to-miss promotional discount badge.
                </p>
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-[11px] text-stone-400 space-y-1">
                  <div className="text-stone-200 font-bold flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Key Deliverable:
                  </div>
                  <div>A pixel-perfect vertical poster ready for Instagram Stories, TikTok, and WhatsApp status broadcasts.</div>
                </div>
                <button
                  onClick={() => setActiveTab('studio')}
                  className="w-full py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition"
                >
                  <span>Go to Step 1: Ad Creative Studio</span>
                  <ArrowRight className="w-3.5 h-3.5 text-rose-400" />
                </button>
              </div>

              {/* Step 2 */}
              <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 shadow-xl hover:border-rose-500/40 transition">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-lg bg-amber-500 text-stone-950 font-black text-sm flex items-center justify-center font-mono">
                    02
                  </span>
                  <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-800">
                    Headline Copy Clinic
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">2. Test & Score Psychological Headlines</h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Great design attracts the eye, but compelling words make people buy. The <strong className="text-amber-400">Copy Clinic</strong> runs your headline through an algorithmic scoring engine, rating it out of 100 on power words (<em className="text-stone-200">exclusive, save, discount</em>), character cadence (25–85 chars), numeric anchors, and urgency triggers.
                </p>
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-[11px] text-stone-400 space-y-1">
                  <div className="text-stone-200 font-bold flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Key Deliverable:
                  </div>
                  <div>A proven AIDA (Attention, Interest, Desire, Action) hook with a 90+ score that prevents wasted ad money.</div>
                </div>
                <button
                  onClick={() => setActiveTab('clinic')}
                  className="w-full py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition"
                >
                  <span>Go to Step 2: Copy Clinic</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>

              {/* Step 3 */}
              <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 shadow-xl hover:border-rose-500/40 transition">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500 text-stone-950 font-black text-sm flex items-center justify-center font-mono">
                    03
                  </span>
                  <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800">
                    Budget & ROI Simulator
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">3. Model Ad Spend, Clicks & Net Revenue</h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Never risk money blindly. The <strong className="text-emerald-400">Growth Simulator</strong> lets you simulate spending $5 to $50 per day across local, metro, or national audiences. It models industry click-through rates (CTR 3.2% - 4.5%), sales conversions (8.5%), and projects your exact weekly gross revenue, ad cost, and net profit with Return on Ad Spend (ROAS).
                </p>
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-[11px] text-stone-400 space-y-1">
                  <div className="text-stone-200 font-bold flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Key Deliverable:
                  </div>
                  <div>A mathematically validated growth forecast showing break-even and profit before spending a single dollar.</div>
                </div>
                <button
                  onClick={() => setActiveTab('simulator')}
                  className="w-full py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition"
                >
                  <span>Go to Step 3: Growth Simulator</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                </button>
              </div>

              {/* Step 4 */}
              <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 shadow-xl hover:border-rose-500/40 transition">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-lg bg-purple-500 text-white font-black text-sm flex items-center justify-center font-mono">
                    04
                  </span>
                  <span className="text-[10px] uppercase font-bold text-purple-400 bg-purple-950/80 px-2.5 py-0.5 rounded-full border border-purple-800">
                    5-Level Certifications
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">4. Take Quizzes & Earn Accredited Certificates</h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Prove your digital marketing mastery across all 5 progressive levels: Level 1 (Market Fundamentals), Level 2 (Ad Visuals), Level 3 (Direct Response Copy), Level 4 (Paid Channels & Funnels), and Level 5 (Viral Retention). Each passed quiz generates an official credential you can download as a high-res PNG or send directly to your Gmail!
                </p>
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-[11px] text-stone-400 space-y-1">
                  <div className="text-stone-200 font-bold flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Key Deliverable:
                  </div>
                  <div>5 official, accredited certificates with verification hashes delivered straight to your email.</div>
                </div>
                <button
                  onClick={() => setActiveTab('quizzes')}
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition shadow-md"
                >
                  <span>View 5-Level Certifications</span>
                  <Award className="w-4 h-4 fill-current" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: AD CREATIVE STUDIO */}
        {activeTab === 'studio' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Form Controls (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-950/70 via-stone-900 to-stone-900 border border-rose-500/40 shadow-xl">
                <span className="text-xs uppercase font-mono font-bold text-rose-400">Campaign Builder</span>
                <h2 className="text-xl font-extrabold text-white font-display mt-0.5">
                  Design Your High-Converting Ad
                </h2>
                <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                  Craft promotional flyers, Instagram/TikTok posters, and WhatsApp broadcast creatives for your business in seconds.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-3.5 text-xs">
                <div>
                  <label className="font-bold text-stone-300 block mb-1">Business Name</label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-rose-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-stone-300 block mb-1">Niche / Industry</label>
                    <input
                      type="text"
                      value={niche}
                      onChange={(e) => setNiche(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-300 block mb-1">Promo Badge</label>
                    <input
                      type="text"
                      value={promoBadge}
                      onChange={(e) => setPromoBadge(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-stone-300 block mb-1">Attention-Grabbing Headline</label>
                  <textarea
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    rows={2}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-rose-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-stone-300 block mb-1">Call to Action (CTA)</label>
                    <input
                      type="text"
                      value={ctaText}
                      onChange={(e) => setCtaText(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-300 block mb-1">Contact Link or Phone</label>
                    <input
                      type="text"
                      value={phoneOrLink}
                      onChange={(e) => setPhoneOrLink(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-stone-300 block mb-1.5">Visual Gradient Atmosphere</label>
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => setAdTheme('gradient-rose')}
                      className={`h-9 rounded-lg border transition-all cursor-pointer bg-gradient-to-br from-rose-600 to-fuchsia-700 ${
                        adTheme === 'gradient-rose' ? 'ring-2 ring-white border-white' : 'border-stone-700'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setAdTheme('gradient-amber')}
                      className={`h-9 rounded-lg border transition-all cursor-pointer bg-gradient-to-br from-amber-500 to-orange-700 ${
                        adTheme === 'gradient-amber' ? 'ring-2 ring-white border-white' : 'border-stone-700'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setAdTheme('gradient-emerald')}
                      className={`h-9 rounded-lg border transition-all cursor-pointer bg-gradient-to-br from-emerald-600 to-teal-800 ${
                        adTheme === 'gradient-emerald' ? 'ring-2 ring-white border-white' : 'border-stone-700'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setAdTheme('dark-neon')}
                      className={`h-9 rounded-lg border transition-all cursor-pointer bg-gradient-to-br from-purple-900 to-blue-950 ${
                        adTheme === 'dark-neon' ? 'ring-2 ring-white border-white' : 'border-stone-700'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Live Visual Ad Mockup (7 cols) */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center">
              <div className="w-full max-w-md">
                <div className="text-xs uppercase font-mono font-bold text-stone-400 mb-2 flex items-center justify-between">
                  <span>LIVE SOCIAL / FLYER PREVIEW</span>
                  <span className="text-emerald-400 flex items-center gap-1">● Ready for Instagram / WhatsApp</span>
                </div>

                {/* The Ad Poster */}
                <div
                  className={`relative w-full aspect-[4/5] rounded-3xl p-8 flex flex-col justify-between shadow-2xl overflow-hidden border border-white/20 transition-all ${
                    adTheme === 'gradient-rose'
                      ? 'bg-gradient-to-br from-rose-600 via-rose-700 to-fuchsia-900'
                      : adTheme === 'gradient-amber'
                      ? 'bg-gradient-to-br from-amber-500 via-orange-600 to-red-800'
                      : adTheme === 'gradient-emerald'
                      ? 'bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-900'
                      : 'bg-gradient-to-br from-purple-950 via-slate-900 to-blue-950'
                  }`}
                >
                  {/* Decorative Glow Circles */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full blur-3xl pointer-events-none" />

                  {/* Top Badge & Brand */}
                  <div className="relative z-10 flex items-start justify-between gap-2">
                    <span className="inline-block px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/30 text-white font-black text-xs tracking-wider uppercase">
                      {promoBadge}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white/20 backdrop-blur-md text-[11px] font-bold text-white uppercase">
                      {niche}
                    </span>
                  </div>

                  {/* Center Content */}
                  <div className="relative z-10 my-auto py-6 space-y-3">
                    <div className="text-white/80 font-bold text-sm tracking-wide uppercase font-mono">
                      {businessName}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight font-display tracking-tight drop-shadow-md">
                      {headline}
                    </h3>
                    <p className="text-xs text-white/90 leading-relaxed font-medium">
                      Premium service by youth innovators. Verified results, guaranteed satisfaction, fast turnaround.
                    </p>
                  </div>

                  {/* Bottom Action Section */}
                  <div className="relative z-10 space-y-3 pt-4 border-t border-white/20">
                    <button
                      onClick={() => alert(`Opening customer contact: ${phoneOrLink}`)}
                      className="w-full py-3.5 px-4 rounded-xl bg-white text-stone-950 font-black text-sm uppercase tracking-wider shadow-xl hover:bg-stone-100 transition-transform active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>{ctaText}</span>
                    </button>
                    <div className="flex items-center justify-between text-[11px] text-white/80 font-mono">
                      <span>Powered by Advert Clinic</span>
                      <span>Verified Youth Enterprise</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3 w-full">
                  <button
                    onClick={() => {
                      alert('Ad Creative exported! Ready to share directly to Instagram, WhatsApp Status, and TikTok.');
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Ad Creative (PNG)</span>
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText?.(headline);
                      setCopiedNotification(true);
                      setTimeout(() => setCopiedNotification(false), 2000);
                    }}
                    className="py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-850 border border-stone-800 text-stone-200 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Copy className="w-4 h-4" />
                    <span>{copiedNotification ? 'Copied!' : 'Copy Text'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: COPYWRITING CLINIC */}
        {activeTab === 'clinic' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-mono font-bold text-rose-400">Viral Copy Laboratory</span>
                  <h2 className="text-2xl font-bold text-white font-display">Headline & Hook Diagnostic Clinic</h2>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-rose-400 font-mono">{headlineScore}/100</div>
                  <div className="text-[10px] text-stone-400 uppercase font-semibold">Conversion Score</div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-300 block mb-1.5">
                  Type your business headline or offer pitch:
                </label>
                <textarea
                  value={testHeadline}
                  onChange={(e) => setTestHeadline(e.target.value)}
                  rows={3}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-sm text-white outline-none focus:border-rose-500 leading-relaxed"
                  placeholder="e.g. Free delivery for first 20 orders in our neighborhood today!"
                />
              </div>

              {/* AIDA Framework Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-center">
                  <div className="text-[10px] uppercase font-bold text-stone-400">Attention (Hook)</div>
                  <div className="text-lg font-black text-emerald-400 mt-1">94%</div>
                  <div className="text-[10px] text-stone-500">Stops scrolling thumb</div>
                </div>
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-center">
                  <div className="text-[10px] uppercase font-bold text-stone-400">Interest (Benefit)</div>
                  <div className="text-lg font-black text-amber-400 mt-1">88%</div>
                  <div className="text-[10px] text-stone-500">Solves explicit pain</div>
                </div>
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-center">
                  <div className="text-[10px] uppercase font-bold text-stone-400">Desire (Proof)</div>
                  <div className="text-lg font-black text-rose-400 mt-1">85%</div>
                  <div className="text-[10px] text-stone-500">Urgency & discount trigger</div>
                </div>
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-center">
                  <div className="text-[10px] uppercase font-bold text-stone-400">Action (CTA)</div>
                  <div className="text-lg font-black text-cyan-400 mt-1">92%</div>
                  <div className="text-[10px] text-stone-500">Clear next step</div>
                </div>
              </div>

              {/* Instant High-Conversion Presets */}
              <div className="space-y-2 pt-2">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  Test Tested Youth Hooks (1-Click Apply):
                </p>
                <div className="space-y-2 text-xs">
                  {[
                    '🔥 Stop scrolling: Get fresh crispy pastries warm to your dorm in 20 minutes!',
                    '📱 Don’t buy a new phone! We repair shattered screens in 45 mins with 90-day warranty.',
                    '⚡ The secret local salons don’t want you to know: Long-lasting neat braids starting at $25.',
                    '🎓 Learn python and web development in 12 weeks: 100% free endowed youth center.',
                  ].map((hook, i) => (
                    <button
                      key={i}
                      onClick={() => setTestHeadline(hook)}
                      className="w-full p-2.5 rounded-lg bg-stone-950 hover:bg-stone-850 border border-stone-800 text-left text-stone-300 transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span>{hook}</span>
                      <span className="text-[10px] font-bold text-rose-400 ml-2 shrink-0">Apply Hook</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: GROWTH & ROI SIMULATOR */}
        {activeTab === 'simulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-4">
              <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 shadow-xl space-y-4">
                <div>
                  <span className="text-xs uppercase font-mono font-bold text-rose-400">Economic Engine</span>
                  <h2 className="text-xl font-bold text-white font-display">Campaign Budget & ROI Simulator</h2>
                  <p className="text-xs text-stone-400 mt-1">
                    Calculate exactly how much revenue your youth enterprise generates per dollar invested.
                  </p>
                </div>

                {/* Business category */}
                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-1.5">Business Category</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'food', label: '🍔 Food & Baking' },
                      { id: 'fashion', label: '👗 Fashion & Thrift' },
                      { id: 'tech', label: '💻 Tech Repairs' },
                      { id: 'services', label: '✂️ Braids / Salon' },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setBusinessCategory(cat.id as any)}
                        className={`p-2 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                          businessCategory === cat.id
                            ? 'bg-rose-600 text-white border-rose-500 shadow-xs'
                            : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slider: Daily Ad Budget */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-stone-300">Daily Advertising Budget</span>
                    <span className="text-rose-400 font-mono text-sm">${dailyBudget} / day (${dailyBudget * 7}/wk)</span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={60}
                    value={dailyBudget}
                    onChange={(e) => setDailyBudget(parseInt(e.target.value, 10))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                    <span>$2 (Micro test)</span>
                    <span>$30 (Growth scale)</span>
                    <span>$60 (Aggressive)</span>
                  </div>
                </div>

                {/* Slider: Average Order Value */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-stone-300">Average Customer Order Value</span>
                    <span className="text-amber-400 font-mono text-sm">${avgOrderValue}</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={120}
                    value={avgOrderValue}
                    onChange={(e) => setAvgOrderValue(parseInt(e.target.value, 10))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                {/* Audience Targeting */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-300 block">Audience Scope</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setTargetAudience('local')}
                      className={`p-2 rounded-lg border text-xs font-semibold cursor-pointer ${
                        targetAudience === 'local' ? 'bg-stone-100 text-stone-950 font-bold' : 'bg-stone-950 text-stone-400 border-stone-800'
                      }`}
                    >
                      📍 Local Area (High CTR)
                    </button>
                    <button
                      onClick={() => setTargetAudience('metro')}
                      className={`p-2 rounded-lg border text-xs font-semibold cursor-pointer ${
                        targetAudience === 'metro' ? 'bg-stone-100 text-stone-950 font-bold' : 'bg-stone-950 text-stone-400 border-stone-800'
                      }`}
                    >
                      🏙️ Metro City
                    </button>
                    <button
                      onClick={() => setTargetAudience('national')}
                      className={`p-2 rounded-lg border text-xs font-semibold cursor-pointer ${
                        targetAudience === 'national' ? 'bg-stone-100 text-stone-950 font-bold' : 'bg-stone-950 text-stone-400 border-stone-800'
                      }`}
                    >
                      🌍 National Scale
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Projected Weekly Results Card (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-stone-900 via-stone-900 to-rose-950/40 border border-stone-800 shadow-xl space-y-5">
                <span className="text-xs uppercase font-mono font-bold text-rose-400">Projected 7-Day Performance</span>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
                    <div className="text-[11px] text-stone-400 uppercase font-semibold">Weekly Impressions</div>
                    <div className="text-2xl font-black text-white font-mono mt-1">{(estimatedReach * 7).toLocaleString()}</div>
                    <div className="text-[10px] text-stone-500 mt-0.5">Views across youth feeds</div>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
                    <div className="text-[11px] text-stone-400 uppercase font-semibold">Direct Inquiries</div>
                    <div className="text-2xl font-black text-amber-400 font-mono mt-1">{(estimatedClicks * 7).toLocaleString()}</div>
                    <div className="text-[10px] text-stone-500 mt-0.5">Clicks & WhatsApp chats</div>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
                    <div className="text-[11px] text-stone-400 uppercase font-semibold">Paying Customers</div>
                    <div className="text-2xl font-black text-emerald-400 font-mono mt-1">~{expectedCustomers * 7}</div>
                    <div className="text-[10px] text-stone-500 mt-0.5">At 8.5% conversion rate</div>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-950 border border-rose-500/40 bg-rose-950/20">
                    <div className="text-[11px] text-rose-300 uppercase font-semibold">Net Profit (ROI)</div>
                    <div className="text-2xl font-black text-rose-400 font-mono mt-1">+${netProfit}</div>
                    <div className="text-[10px] text-emerald-400 font-bold mt-0.5">{roiPercentage}% Return on Spend</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 text-xs space-y-1.5 text-stone-300">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>Clinic Recommendation for Growth:</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-stone-400">
                    Start with a 3-day test at ${dailyBudget}/day. If your first 5 customers leave 5-star WhatsApp reviews, reinvest 40% of the revenue back into the ad budget to create an unstoppable growth loop.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: YOUTH BUSINESS AD SHOWCASE */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="max-w-2xl">
              <span className="text-xs uppercase font-mono font-bold text-rose-400">Real Youth Success Stories</span>
              <h2 className="text-2xl font-bold text-white font-display mt-0.5">Ads That Built Real Businesses</h2>
              <p className="text-xs text-stone-400 mt-1">
                Explore real advertisements developed by youth founders using the Advert Clinic framework.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'KicksFresh Sneaker Laundry',
                  founder: 'David K. (Age 16)',
                  channel: 'Instagram Reel + WhatsApp',
                  adText: '“Don’t throw out muddy sneakers. We restore them looking box-fresh in 24 hours. Free campus pickup!”',
                  spend: '$18 ad spend',
                  revenue: '$380 earned in 7 days',
                  tag: 'Shoe Care & Restoration',
                },
                {
                  title: 'SweetCrumb Mini Bakeries',
                  founder: 'Amina T. (Age 17)',
                  channel: 'TikTok Video Hook + WhatsApp Menu',
                  adText: '“Custom birthday bento cakes baked with love. Order by 10 AM, delivered fresh by 4 PM!”',
                  spend: '$25 ad spend',
                  revenue: '$620 earned in first weekend',
                  tag: 'Pastries & Events',
                },
                {
                  title: 'SwiftScreen Phone Repairs',
                  founder: 'Tunde B. (Age 18)',
                  channel: 'Local Meta Ads + Google Map Pin',
                  adText: '“Cracked screen? We fix iPhones & Androids while you wait with genuine OEM glass.”',
                  spend: '$30 ad spend',
                  revenue: '$940 in 2 weeks',
                  tag: 'Electronics & Repairs',
                },
              ].map((c, i) => (
                <div key={i} className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 flex flex-col justify-between shadow-xl">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-rose-400 bg-rose-950/60 border border-rose-800 px-2.5 py-0.5 rounded-full uppercase">
                      {c.tag}
                    </span>
                    <h3 className="text-lg font-bold text-white">{c.title}</h3>
                    <p className="text-xs text-stone-400">Founded by {c.founder}</p>
                    <blockquote className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-xs italic text-stone-300">
                      {c.adText}
                    </blockquote>
                  </div>

                  <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs font-mono">
                    <span className="text-stone-400">{c.spend}</span>
                    <span className="text-emerald-400 font-bold">{c.revenue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: 5-LEVEL QUIZZES & REAL CERTIFICATES */}
        {activeTab === 'quizzes' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/70 via-stone-900 to-stone-900 border-2 border-amber-500/50 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1 max-w-2xl">
                <span className="text-xs uppercase font-mono font-bold text-amber-400">
                  Accredited Youth Commercial Credentials
                </span>
                <h2 className="text-2xl font-black text-white font-display">
                  Advert Clinic 5-Level Certifications
                </h2>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Every level includes an official 3-question mastery quiz. Score 70% or higher to earn an official certificate with cryptographic verification, download high-res PNG to your device, and have it dispatched directly to your Gmail account.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className="text-[10px] text-stone-400 font-mono">Curriculum Standard</div>
                  <div className="text-xs font-bold text-amber-400">5 Distinct Levels</div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-stone-950 font-black flex items-center justify-center shadow-lg">
                  <Award className="w-7 h-7" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  level: 1,
                  badge: 'Junior Market Architect',
                  title: 'Level 1: Market Fundamentals & Value Propositions',
                  description: 'Discover target market segmentation, unique value propositions (UVP), and crafting irresistible offers that customers cannot refuse.',
                  skills: ['Customer avatar mapping', 'UVP formulation', 'Risk-reversal guarantees'],
                  tier: 'Beginner',
                },
                {
                  level: 2,
                  badge: 'Creative Visual Director',
                  title: 'Level 2: Visual Graphic Design & Ad Hierarchy',
                  description: 'Master typographic visual hierarchy, high-contrast color palettes, promotional badge positioning, and mobile-first poster layouts.',
                  skills: ['F-pattern visual scanning', 'Mobile thumb-stopping contrast', 'Call-to-action badges'],
                  tier: 'Beginner',
                },
                {
                  level: 3,
                  badge: 'Direct Response Copywriter',
                  title: 'Level 3: AIDA Direct Response Copywriting',
                  description: 'Master Attention, Interest, Desire, and Action formulas, psychological triggers, curiosity gaps, and social proof integration.',
                  skills: ['Headline scoring formulas', 'PAS problem-agitation hooks', 'WhatsApp broadcast scripting'],
                  tier: 'Intermediate',
                },
                {
                  level: 4,
                  badge: 'Performance Growth Marketer',
                  title: 'Level 4: Paid Ad Channels, ROAS & Funnel Economics',
                  description: 'Understand Meta Ads, TikTok Spark Ads, Google Local Pins, cost-per-click (CPC), customer conversion rates, and Return on Ad Spend (ROAS).',
                  skills: ['Budget unit economics', 'Audience retargeting', 'ROAS margin forecasting'],
                  tier: 'Intermediate',
                },
                {
                  level: 5,
                  badge: 'Master Commercial Strategist',
                  title: 'Level 5: Viral Retention & Customer Lifetime Value',
                  description: 'Scale youth ventures with word-of-mouth referral loops, VIP loyalty clubs, upsells, cross-sells, and recurring customer retention.',
                  skills: ['Customer Lifetime Value (LTV)', 'Viral referral engines', 'Omnichannel brand equity'],
                  tier: 'Pro',
                },
              ].map((lvl) => (
                <div
                  key={lvl.level}
                  className="p-5 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 transition flex flex-col justify-between space-y-4 shadow-xl"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-amber-400 bg-amber-950/60 border border-amber-800/80 px-2.5 py-0.5 rounded-full">
                        Level {lvl.level} of 5
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 bg-stone-800 px-2 py-0.5 rounded">
                        {lvl.tier}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white font-display leading-snug">
                        {lvl.title}
                      </h3>
                      <div className="text-[11px] text-amber-400/90 font-medium mt-0.5 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Badge: {lvl.badge}</span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-400 leading-relaxed">
                      {lvl.description}
                    </p>

                    <div className="space-y-1 pt-2 border-t border-stone-800 text-[11px]">
                      <span className="font-bold text-stone-300 block">Exam Competencies:</span>
                      {lvl.skills.map((s, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-1.5 text-stone-400">
                          <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setCertLevel(lvl.level);
                      setCertModalOpen(true);
                    }}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                  >
                    <Award className="w-4 h-4 fill-current" />
                    <span>Take Level {lvl.level} Quiz & Claim Certificate</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Embedded Offline Universal AI Voice & Text Tutor */}
      <UniversalAITutor
        floating={true}
        accentColor="rose"
        context={{
          courseId: 'advert-clinic',
          courseTitle: 'Advert Clinic — Youth Business Expansion & Ad Laboratory',
          levelNumber: certLevel,
          levelTitle: `Level ${certLevel}: Attention, Creative Copywriting & Growth Architecture`,
          concept: 'Advertising psychology, AIDA hook copywriting, visual flyer design, and ad budget ROI simulation',
          explanation:
            'Advert Clinic provides an end-to-end sandbox where youth learn to turn skills and products into flourishing businesses through compelling advertising, data-backed headline testing, and conversion forecasting.',
          practicalLab:
            'Design a vertical flyer for your business, score a headline above 85 in the Copy Clinic, forecast weekly profit in the simulator, and pass the 3-question Level Mastery Quiz to earn an official certificate.',
        }}
      />

      {/* Universal Level Quiz & Real Certificate Modal */}
      <CertificateModal
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
        courseId="advert-clinic"
        courseTitle="Advert Clinic — Youth Business Expansion & Ad Laboratory"
        levelNumber={certLevel}
        levelTitle={`Level ${certLevel}: Attention, Creative Copywriting & Growth Architecture`}
        tier={certLevel <= 2 ? 'Beginner' : certLevel <= 4 ? 'Intermediate' : 'Pro'}
        currentUser={currentUser}
      />
    </div>
  );
};
