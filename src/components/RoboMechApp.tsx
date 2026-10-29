import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Bot,
  Cpu,
  Sliders,
  CheckCircle2,
  Check,
  Send,
  Download,
  Copy,
  ExternalLink,
  ChevronRight,
  Gauge,
  Radio,
  Zap,
  Mic,
  Activity,
  Layers,
  Award,
} from 'lucide-react';
import { EducareUser } from '../types/auth';
import { CourseLogo } from './CourseLogo';
import { CertificateModal } from './CertificateModal';
import { ROBO_MECH_DATA, RoboMechTrack, RoboMechLevel, RoboMechLesson } from '../data/roboMechData';
import { UniversalAITutor } from './UniversalAITutor';

interface RoboMechAppProps {
  onBackToEducare: () => void;
  currentUser?: EducareUser | null;
  onSignOut?: () => void;
}

export const RoboMechApp: React.FC<RoboMechAppProps> = ({
  onBackToEducare,
  currentUser,
}) => {
  // Navigation State
  const [activeTrackId, setActiveTrackId] = useState<'beginners' | 'intermediate' | 'pro'>('beginners');
  const [activeLevelNumber, setActiveLevelNumber] = useState<number>(1);
  const [selectedLessonId, setSelectedLessonId] = useState<string>('b1-1');

  // Track & Level data
  const currentTrack: RoboMechTrack = ROBO_MECH_DATA[activeTrackId];
  const currentLevel: RoboMechLevel = currentTrack.levels.find((l) => l.levelNumber === activeLevelNumber) || currentTrack.levels[0];
  const currentLesson: RoboMechLesson = currentLevel.lessons.find((l) => l.id === selectedLessonId) || currentLevel.lessons[0];

  // Completion State
  const [certModalOpen, setCertModalOpen] = useState<boolean>(false);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('robomech_completed');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn(e);
    }
    return ['b1-1'];
  });

  // Talking AI Tutor Voice State
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [voiceRate, setVoiceRate] = useState<number>(0.95);
  const [tutorOpen, setTutorOpen] = useState<boolean>(false);
  const [tutorMessages, setTutorMessages] = useState<Array<{ sender: 'user' | 'tutor'; text: string }>>([
    {
      sender: 'tutor',
      text: "Hello! I am RoboTutor, your voice AI robotics mentor. Tap 'Speak Lesson' or ask me any question about circuits, microcontrollers, kinematics, or ROS 2!",
    },
  ]);
  const [userQuestion, setUserQuestion] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  // Simulation Bench States
  const [simPwM, setSimPwm] = useState<number>(180); // 0 to 255
  const [simDirection, setSimDirection] = useState<'FORWARD' | 'REVERSE' | 'BRAKE'>('FORWARD');
  const [simRadarDist, setSimRadarDist] = useState<number>(35); // cm
  const [servoArmAngle, setServoArmAngle] = useState<number>(65); // degrees
  const [pidKp, setPidKp] = useState<number>(2.4);

  // Sync selected lesson when level changes
  useEffect(() => {
    if (currentLevel.lessons.length > 0) {
      setSelectedLessonId(currentLevel.lessons[0].id);
    }
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }, [activeTrackId, activeLevelNumber]);

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  const handleToggleSpeakLesson = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToSpeak = `Lesson ${currentLesson.number}: ${currentLesson.title}. Key concept: ${currentLesson.concept}. Explanation: ${currentLesson.explanation}. Practical Lab: ${currentLesson.practicalLab}. Mentor Tip: ${currentLesson.mentorTip}`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = voiceRate;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = voiceRate;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleAskTutor = (questionText?: string) => {
    const q = questionText || userQuestion.trim();
    if (!q) return;

    const newMsgs = [...tutorMessages, { sender: 'user' as const, text: q }];
    setTutorMessages(newMsgs);
    setUserQuestion('');

    // Answer synthesis
    setTimeout(() => {
      let reply = `Regarding "${q}": In mechatronics, always verify your power ground references and check for sensor noise before tuning controller gains. Keep experimenting on the simulation bench!`;

      const lower = q.toLowerCase();
      if (lower.includes('pwm') || lower.includes('motor')) {
        reply = "Pulse Width Modulation rapidly toggles DC voltage at high frequency. The duty cycle (0% to 100%) controls the average voltage delivered to the motor armature, smoothly adjusting rotational speed without wasting power through hot resistors!";
      } else if (lower.includes('h-bridge') || lower.includes('direction')) {
        reply = "An H-Bridge uses four electronic switches (typically MOSFETs) configured like an H. By switching diagonal pairs, you reverse the polarity of current flowing through the motor terminals, enabling bidirectional forward and reverse motion!";
      } else if (lower.includes('pid') || lower.includes('tuning')) {
        reply = "PID stands for Proportional, Integral, and Derivative control. P reacts to current error, I eliminates lingering steady-state drift by accumulating past error, and D acts as an anticipatory brake by measuring how fast the error is changing!";
      } else if (lower.includes('kinematics') || lower.includes('ik') || lower.includes('fk')) {
        reply = "Forward Kinematics calculates where the gripper is in 3D space given known joint motor angles. Inverse Kinematics solves the harder opposite problem: calculating the exact motor angles required to place the tool at an exact (X, Y, Z) Cartesian coordinate!";
      } else if (lower.includes('slam') || lower.includes('ros')) {
        reply = "Simultaneous Localization and Mapping uses probabilistic mathematics like particle filters and graph optimization to build an unknown room floor plan while concurrently tracking where the robot is located inside that map!";
      }

      setTutorMessages([...newMsgs, { sender: 'tutor' as const, text: reply }]);
      speakText(reply);
    }, 300);
  };

  const handleToggleComplete = (id: string) => {
    let updated: string[];
    if (completedLessonIds.includes(id)) {
      updated = completedLessonIds.filter((x) => x !== id);
    } else {
      updated = [...completedLessonIds, id];
    }
    setCompletedLessonIds(updated);
    try {
      localStorage.setItem('robomech_completed', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
  };

  const totalInCurrentLevel = currentLevel.lessons.length;
  const completedInCurrentLevel = currentLevel.lessons.filter((l) => completedLessonIds.includes(l.id)).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Bar Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-cyan-500/30 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToEducare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Educare</span>
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <CourseLogo courseId="robo-mech" size="sm" />
              <div>
                <span className="font-bold text-base text-white tracking-tight block leading-tight font-display">
                  Robo <span className="text-cyan-400">Mech</span>
                </span>
                <span className="text-[10px] text-cyan-400 font-medium uppercase tracking-wide">
                  Where Youths Learn a Skill · 150 Master Lessons
                </span>
              </div>
            </div>
          </div>

          {/* Track Switcher (Beginners, Intermediate, Pro) */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
            <button
              onClick={() => {
                setActiveTrackId('beginners');
                setActiveLevelNumber(1);
              }}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTrackId === 'beginners' ? 'bg-cyan-500 text-slate-950 shadow-xs font-extrabold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Beginners (50 Lessons)
            </button>
            <button
              onClick={() => {
                setActiveTrackId('intermediate');
                setActiveLevelNumber(1);
              }}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTrackId === 'intermediate' ? 'bg-cyan-500 text-slate-950 shadow-xs font-extrabold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Intermediate (50 Lessons)
            </button>
            <button
              onClick={() => {
                setActiveTrackId('pro');
                setActiveLevelNumber(1);
              }}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTrackId === 'pro' ? 'bg-cyan-500 text-slate-950 shadow-xs font-extrabold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Pro (50 Lessons)
            </button>
          </div>

          {/* Voice AI Tutor Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleSpeakLesson}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-sm ${
                isSpeaking
                  ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300 animate-pulse'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
              }`}
              title="Voice AI Tutor that can talk out loud"
            >
              {isSpeaking ? <Volume2 className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              <span>{isSpeaking ? 'Talking...' : 'AI Tutor Talk'}</span>
            </button>

            <button
              onClick={() => setCertModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Lvl {activeLevelNumber} Diploma</span>
            </button>

            <button
              onClick={() => setTutorOpen(!tutorOpen)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ask Tutor</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Track Navigator & 10 Lessons List (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Track Summary Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/80 via-slate-900 to-slate-900 border border-cyan-500/40 shadow-xl space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono font-bold text-cyan-400">
              <span className="uppercase">{currentTrack.name}</span>
              <span>Level {activeLevelNumber} of 5</span>
            </div>
            <h2 className="text-lg font-bold text-white font-display leading-snug">
              {currentLevel.title}
            </h2>
            <p className="text-xs text-slate-300">
              {currentLevel.objective}
            </p>
            <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
              <span>{completedInCurrentLevel}/{totalInCurrentLevel} Completed</span>
              <span className="font-bold text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/80">
                Badge: {currentLevel.badge}
              </span>
            </div>
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
              <div
                className="bg-cyan-500 h-full transition-all duration-300"
                style={{ width: `${(completedInCurrentLevel / totalInCurrentLevel) * 100}%` }}
              />
            </div>

            {/* Level Quiz & Real Certificate Trigger */}
            <button
              onClick={() => setCertModalOpen(true)}
              className="w-full mt-2.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 hover:from-amber-400 hover:to-amber-200 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <Award className="w-4 h-4 fill-current text-slate-950" />
              <span>Level {activeLevelNumber} Exam & Certificate</span>
            </button>
          </div>

          {/* Level Selector Tabs (1 to 5) */}
          <div className="grid grid-cols-5 gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs font-bold">
            {[1, 2, 3, 4, 5].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setActiveLevelNumber(lvl)}
                className={`py-2 rounded-lg text-center transition-all cursor-pointer ${
                  activeLevelNumber === lvl
                    ? 'bg-cyan-500 text-slate-950 font-black shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Lvl {lvl}
              </button>
            ))}
          </div>

          {/* 10 Lessons List */}
          <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
            {currentLevel.lessons.map((lesson) => {
              const isSelected = lesson.id === selectedLessonId;
              const isDone = completedLessonIds.includes(lesson.id);
              return (
                <button
                  key={lesson.id}
                  onClick={() => setSelectedLessonId(lesson.id)}
                  className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-cyan-950/60 border-cyan-400 ring-1 ring-cyan-400/40 text-white'
                      : 'bg-slate-900 hover:bg-slate-850 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                        isDone
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isDone ? <Check className="w-3.5 h-3.5" /> : lesson.number}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-xs truncate">{lesson.title}</div>
                      <div className="text-[10px] text-slate-400 truncate">{lesson.concept}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
                </button>
              );
            })}
          </div>

          {/* Interactive Simulator Quick Launch Card */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
              <Sliders className="w-4 h-4" />
              <span>Interactive Mechatronic Test Bench</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Test PWM duty cycles, ultrasonic echoes, and robotic servo angles live below.
            </p>
          </div>
        </div>

        {/* Right Column: Detailed Lesson & Talking AI Tutor (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Lesson Deep Explanation Card */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 text-[10px] font-mono font-bold uppercase">
                  {currentTrack.name} · Level {currentLevel.levelNumber} · Lesson {currentLesson.number}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">ID: {currentLesson.id}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleSpeakLesson}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    isSpeaking
                      ? 'bg-amber-400 text-slate-950 animate-pulse'
                      : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isSpeaking ? 'Pause Voice' : 'Read Aloud'}</span>
                </button>

                <button
                  onClick={() => handleToggleComplete(currentLesson.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    completedLessonIds.includes(currentLesson.id)
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{completedLessonIds.includes(currentLesson.id) ? 'Mastered' : 'Mark Done'}</span>
                </button>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
              {currentLesson.title}
            </h1>

            {/* Core Concept */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                💡
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">
                  Core Engineering Principle
                </span>
                <p className="text-xs sm:text-sm text-slate-200 font-medium mt-0.5">
                  {currentLesson.concept}
                </p>
              </div>
            </div>

            {/* Good In-Depth Explanation */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Comprehensive Explanation:
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                {currentLesson.explanation}
              </p>
            </div>

            {/* Hardware Schematic */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Hardware Wire Diagram & Schematic Flow:</span>
                </h3>
              </div>
              <pre className="p-3.5 rounded-xl bg-black border border-slate-800 text-xs font-mono text-cyan-300 whitespace-pre-wrap overflow-x-auto leading-relaxed">
                {currentLesson.schematicText}
              </pre>
            </div>

            {/* Code / Firmware Snippet */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                  <span>C++ Firmware / Algorithm Implementation:</span>
                </h3>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText?.(currentLesson.codeSnippet);
                    setCopiedCode(true);
                    setTimeout(() => setCopiedCode(false), 2000);
                  }}
                  className="text-[11px] text-cyan-400 hover:underline cursor-pointer flex items-center gap-1 font-mono"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
              <pre className="p-3.5 rounded-xl bg-black border border-slate-800 text-xs font-mono text-emerald-300 whitespace-pre-wrap overflow-x-auto leading-relaxed">
                {currentLesson.codeSnippet}
              </pre>
            </div>

            {/* Practical Lab Challenge & Mentor Pro-Tip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs space-y-1">
                <span className="font-bold text-cyan-300 block flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" /> Hands-On Lab Challenge
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {currentLesson.practicalLab}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs space-y-1">
                <span className="font-bold text-amber-300 block flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Senior Faculty Pro-Tip
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {currentLesson.mentorTip}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Live Mechatronic Simulation Bench */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white font-display">Live Mechatronic Simulation Bench</h3>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                ● Hardware Loop Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* Simulator 1: PWM H-Bridge Motor Control */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200">DC Motor & H-Bridge</span>
                  <span className="font-mono text-cyan-400 font-bold">{Math.round((simPwM / 255) * 100)}% Speed</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={255}
                  value={simPwM}
                  onChange={(e) => setSimPwm(parseInt(e.target.value, 10))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="grid grid-cols-3 gap-1">
                  <button
                    onClick={() => setSimDirection('FORWARD')}
                    className={`py-1 rounded text-[10px] font-bold cursor-pointer ${
                      simDirection === 'FORWARD' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    FWD
                  </button>
                  <button
                    onClick={() => setSimDirection('BRAKE')}
                    className={`py-1 rounded text-[10px] font-bold cursor-pointer ${
                      simDirection === 'BRAKE' ? 'bg-rose-500 text-white' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    BRAKE
                  </button>
                  <button
                    onClick={() => setSimDirection('REVERSE')}
                    className={`py-1 rounded text-[10px] font-bold cursor-pointer ${
                      simDirection === 'REVERSE' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    REV
                  </button>
                </div>
                <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between pt-1">
                  <span>Tachometer:</span>
                  <span className="text-emerald-400 font-bold">
                    {simDirection === 'BRAKE' ? '0 RPM' : `${Math.round((simPwM / 255) * 480)} RPM`}
                  </span>
                </div>
              </div>

              {/* Simulator 2: Ultrasonic Echo Distance Ping */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200">Ultrasonic Sonar (HC-SR04)</span>
                  <span className={`font-mono font-bold ${simRadarDist < 20 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {simRadarDist} cm
                  </span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={120}
                  value={simRadarDist}
                  onChange={(e) => setSimRadarDist(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
                <div className="p-2 rounded bg-slate-900 text-[10px] text-slate-300 font-mono">
                  Echo Time: {Math.round(simRadarDist / 0.017)} μs
                </div>
                <div className="text-[11px] flex items-center justify-between">
                  <span>Safety Status:</span>
                  <span className={`font-bold ${simRadarDist < 20 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`}>
                    {simRadarDist < 20 ? '⚠️ COLLISION BRAKE' : '✓ CLEAR PATH'}
                  </span>
                </div>
              </div>

              {/* Simulator 3: Servo Angle & Inverse Kinematics */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200">Joint Angle Servo</span>
                  <span className="font-mono text-amber-400 font-bold">{servoArmAngle}°</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={180}
                  value={servoArmAngle}
                  onChange={(e) => setServoArmAngle(parseInt(e.target.value, 10))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="p-2 rounded bg-slate-900 text-[10px] text-slate-300 font-mono">
                  Pulse: {1000 + Math.round((servoArmAngle / 180) * 1000)} μs
                </div>
                <div className="text-[11px] flex items-center justify-between font-mono">
                  <span>End Effector Z:</span>
                  <span className="text-cyan-300 font-bold">
                    {Math.round(Math.sin((servoArmAngle * Math.PI) / 180) * 150)} mm
                  </span>
                </div>
              </div>
            </div>

            {/* Official Level Mastery Quiz & Real Certificate Banner */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-950/80 via-slate-900 to-cyan-950/80 border-2 border-amber-500/60 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black flex items-center justify-center shrink-0 shadow-lg">
                  <Award className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 border border-amber-800/80 px-2 py-0.5 rounded-full">
                      Level {activeLevelNumber} of 5 · Official Credential
                    </span>
                    <span className="text-[10px] text-cyan-300 font-bold bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                      {currentLevel.badge}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white font-display">
                    Earn Your Accredited Level {activeLevelNumber} Certificate
                  </h4>
                  <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                    Test your mechatronics mastery on Level {activeLevelNumber} ({currentLevel.title}). Pass the 3-question quiz (70%+) to generate your cryptographic certificate, download a printable PNG, and send it directly to your Gmail account.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setCertModalOpen(true)}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition cursor-pointer shrink-0"
              >
                <Award className="w-4 h-4 fill-current" />
                <span>Take Level {activeLevelNumber} Quiz & Claim Certificate</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Offline Universal AI Voice & Text Tutor */}
      <UniversalAITutor
        floating={true}
        accentColor="cyan"
        isOpen={tutorOpen}
        onClose={() => setTutorOpen(false)}
        context={{
          courseId: 'robo-mech',
          courseTitle: `Robo Mech — ${currentTrack.name} Track`,
          levelNumber: activeLevelNumber,
          levelTitle: `Level ${activeLevelNumber}: ${currentLevel.title}`,
          lessonNumber: currentLesson.number,
          lessonTitle: currentLesson.title,
          concept: currentLesson.concept,
          explanation: currentLesson.explanation,
          practicalLab: currentLesson.practicalLab,
          codeSnippet: currentLesson.codeSnippet,
        }}
      />

      {/* Universal Level Quiz & Real Certificate Modal */}
      <CertificateModal
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
        courseId="robo-mech"
        courseTitle={`Robo Mech — ${currentTrack.name} Track`}
        levelNumber={activeLevelNumber}
        levelTitle={`Level ${activeLevelNumber}: ${currentLevel.title}`}
        tier={activeTrackId === 'beginners' ? 'Beginner' : activeTrackId === 'intermediate' ? 'Intermediate' : 'Pro'}
        currentUser={currentUser}
      />
    </div>
  );
};
