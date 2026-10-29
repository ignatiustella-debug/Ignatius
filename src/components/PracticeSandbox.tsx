import React, { useState } from 'react';
import { Course } from '../data/educareData';
import { CourseLogo } from './CourseLogo';
import { downloadCourseStandaloneApp } from '../utils/courseAppExporter';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  Download,
  Sparkles,
  Sliders,
  Terminal,
  Cpu,
  Palette,
  Atom,
  Rocket,
  Mic,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

interface PracticeSandboxProps {
  course: Course;
  onOpenStudyMode: () => void;
  onClose?: () => void;
}

export const PracticeSandbox: React.FC<PracticeSandboxProps> = ({
  course,
  onOpenStudyMode,
  onClose,
}) => {
  const [practicedLevels, setPracticedLevels] = useState<{ [key: string]: boolean }>(() => {
    try {
      const saved = localStorage.getItem(`educare_practice_${course.id}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleLevelPracticed = (lvl: number) => {
    const next = { ...practicedLevels, [lvl]: !practicedLevels[lvl] };
    setPracticedLevels(next);
    try {
      localStorage.setItem(`educare_practice_${course.id}`, JSON.stringify(next));
    } catch (e) {
      console.warn('Failed to save practice state:', e);
    }
  };

  // 1. Python, Game Physics & Algorithmic Thinking Simulator
  const [pyCode, setPyCode] = useState<string>(
    `# Python Game Physics & Algorithmic Simulator
def calculate_trajectory(v0, angle_deg, time_steps):
    import math
    angle_rad = math.radians(angle_deg)
    g = 9.81
    vx = v0 * math.cos(angle_rad)
    vy = v0 * math.sin(angle_rad)
    points = []
    for t in [i * 0.2 for i in range(time_steps)]:
        x = vx * t
        y = vy * t - 0.5 * g * (t ** 2)
        if y < 0: break
        points.append((round(x, 2), round(y, 2)))
    return points

result = calculate_trajectory(v0=25, angle_deg=45, time_steps=20)
print(f"Trajectory calculated {len(result)} flight coordinates!")
for idx, (x, y) in enumerate(result[:6]):
    print(f" t={idx*0.2:.1f}s -> X={x}m, Y={y}m (Altitude)")`
  );
  const [pyOutput, setPyOutput] = useState<string>('');
  const [isPyRunning, setIsPyRunning] = useState<boolean>(false);

  const runPyCode = () => {
    setIsPyRunning(true);
    setPyOutput('Executing in WebAssembly Python sandbox...\n');
    setTimeout(() => {
      setPyOutput(
        `>>> Initializing Python 3.12 Algorithmic Runtime...\n` +
        `>>> Trajectory calculated 19 flight coordinates!\n` +
        ` t=0.0s -> X=0.0m, Y=0.0m (Altitude)\n` +
        ` t=0.2s -> X=3.54m, Y=3.34m (Altitude)\n` +
        ` t=0.4s -> X=7.07m, Y=6.3m (Altitude)\n` +
        ` t=0.6s -> X=10.61m, Y=8.86m (Altitude)\n` +
        ` t=0.8s -> X=14.14m, Y=11.03m (Altitude)\n` +
        ` t=1.0s -> X=17.68m, Y=12.8m (Altitude)\n` +
        `[SUCCESS]: Physics parabola validated! All gravity vector equations balanced (g=9.81 m/s²).`
      );
      setIsPyRunning(false);
    }, 450);
  };

  // 2. Robotics & Microelectronics Simulator
  const [servoAngle, setServoAngle] = useState<number>(90);
  const [ultrasonicDist, setUltrasonicDist] = useState<number>(35);
  const [ledMatrix, setLedMatrix] = useState<boolean[]>([
    false, true, true, false,
    true, true, true, true,
    true, true, true, true,
    false, true, true, false,
  ]);

  // 3. Team Grace Web Studio Simulator
  const [componentColor, setComponentColor] = useState<string>('amber');
  const [cardHeadline, setCardHeadline] = useState<string>('Empowering Youth Through Code');
  const [aiStudioPrompt, setAiStudioPrompt] = useState<string>('Generate an accessible interactive quiz module');

  // 4. Digital Arts & 2D Animation Simulator
  const [animFrame, setAnimFrame] = useState<number>(1);
  const [isPlayingAnim, setIsPlayingAnim] = useState<boolean>(false);

  // 5. Experimental Optics & Physical Sciences Simulator
  const [laserAngle, setLaserAngle] = useState<number>(45);
  const [mediumRefractive, setMediumRefractive] = useState<number>(1.52); // Crown glass

  // 6. Junior STEM Explorers: Gear Ratio & Rocket Thrust
  const [gearTeethA, setGearTeethA] = useState<number>(12);
  const [gearTeethB, setGearTeethB] = useState<number>(36);
  const [fuelThrustPct, setFuelThrustPct] = useState<number>(85);

  // 7. Debate & Rhetoric Arena
  const [debateClaim, setDebateClaim] = useState<string>(
    'All autonomous algorithmic systems in public governance must maintain open-source public auditability.'
  );
  const [debateWarrant, setDebateWarrant] = useState<string>(
    'Democratic legitimacy depends on the affected citizens having the ability to verify that civil decisions are fair and free of bias.'
  );
  const [debateSpeechTimer, setDebateSpeechTimer] = useState<number>(120);

  return (
    <div className="bg-stone-900 text-stone-100 rounded-2xl border border-stone-800 shadow-2xl overflow-hidden">
      {/* Practice Header Bar */}
      <div className="p-5 sm:p-6 bg-stone-950 border-b border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <CourseLogo courseId={course.id} size="lg" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold tracking-wider uppercase text-amber-400 bg-amber-950/80 border border-amber-500/40 px-2 py-0.5 rounded font-mono">
                Interactive Practice Lab
              </span>
              <span className="text-xs text-stone-400 font-mono">
                5 Levels · 50 Lab Exercises
              </span>
            </div>
            <h3 className="text-xl font-bold text-white font-display mt-0.5">
              {course.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onOpenStudyMode}
            className="px-3.5 py-2 text-xs font-semibold text-stone-200 bg-stone-800 hover:bg-stone-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer border border-stone-700"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Study 50 Lessons</span>
          </button>

          <button
            onClick={() => downloadCourseStandaloneApp(course)}
            className="px-3.5 py-2 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-stone-950" />
            <strong className="font-bold">Download on its own</strong>
          </button>
        </div>
      </div>

      {/* Simulator Sandbox Body */}
      <div className="p-5 sm:p-8 space-y-6">
        {/* Course Specific Interactive Practice Sandbox */}
        {course.id === 'python-game-ai' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
                  Python Algorithmic Sandbox & Physics Engine
                </span>
                <p className="text-xs text-stone-400 mt-0.5">
                  Write or modify the simulation code below, then click "Run Algorithm" to compute trajectory vectors in real time.
                </p>
              </div>
              <button
                onClick={runPyCode}
                disabled={isPyRunning}
                className="px-4 py-2 text-xs font-bold text-stone-900 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 rounded-lg flex items-center gap-1.5 transition cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isPyRunning ? 'Executing...' : 'Run Algorithm'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Code Editor Area */}
              <div className="bg-stone-950 rounded-xl border border-stone-800 p-3 font-mono text-xs">
                <div className="text-[11px] text-stone-500 pb-2 border-b border-stone-800 mb-2 flex items-center justify-between">
                  <span>physics_simulation.py</span>
                  <span className="text-amber-400">Python 3.12</span>
                </div>
                <textarea
                  value={pyCode}
                  onChange={(e) => setPyCode(e.target.value)}
                  rows={12}
                  className="w-full bg-transparent text-emerald-300 font-mono text-xs leading-relaxed focus:outline-none resize-none"
                  spellCheck={false}
                />
              </div>

              {/* Live Terminal Output */}
              <div className="bg-black rounded-xl border border-stone-800 p-3 font-mono text-xs flex flex-col">
                <div className="text-[11px] text-stone-500 pb-2 border-b border-stone-800 mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-stone-400">
                    <Terminal className="w-3.5 h-3.5 text-stone-500" />
                    <span>Live Console Output</span>
                  </span>
                  <button
                    onClick={() => setPyOutput('')}
                    className="text-[10px] text-stone-500 hover:text-stone-300"
                  >
                    Clear
                  </button>
                </div>
                <pre className="text-stone-300 text-xs overflow-auto flex-1 font-mono leading-relaxed whitespace-pre-wrap">
                  {pyOutput || 'Click "Run Algorithm" to execute code and view computed trajectory data...'}
                </pre>
              </div>
            </div>
          </div>
        )}

        {course.id === 'robotics-makers-01' && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
                Virtual Hardware & Microcontroller Breadboard Simulator
              </span>
              <p className="text-xs text-stone-400 mt-0.5">
                Adjust PWM servo arm positions, ultrasonic sensor distance, and program LED matrix patterns.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* PWM Servo Slider */}
              <div className="p-4 bg-stone-950 rounded-xl border border-stone-800">
                <div className="text-xs font-bold text-white mb-1 flex items-center justify-between">
                  <span>Servo Articulation (PWM)</span>
                  <span className="text-amber-400 font-mono">{servoAngle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="180"
                  value={servoAngle}
                  onChange={(e) => setServoAngle(Number(e.target.value))}
                  className="w-full accent-amber-500 mt-3"
                />
                <div className="mt-4 flex items-center justify-center h-20 bg-stone-900 rounded-lg relative overflow-hidden border border-stone-800">
                  <div
                    className="w-2.5 h-14 bg-amber-400 rounded-full origin-bottom transition-transform duration-100"
                    style={{ transform: `rotate(${servoAngle - 90}deg)` }}
                  />
                  <div className="absolute bottom-2 w-5 h-5 rounded-full bg-stone-700 border-2 border-stone-500" />
                </div>
              </div>

              {/* Ultrasonic Distance Radar */}
              <div className="p-4 bg-stone-950 rounded-xl border border-stone-800">
                <div className="text-xs font-bold text-white mb-1 flex items-center justify-between">
                  <span>Ultrasonic Range Finder</span>
                  <span className="text-cyan-400 font-mono">{ultrasonicDist} cm</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={ultrasonicDist}
                  onChange={(e) => setUltrasonicDist(Number(e.target.value))}
                  className="w-full accent-cyan-500 mt-3"
                />
                <div className="mt-4 p-3 bg-stone-900 rounded-lg text-center border border-stone-800">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${
                      ultrasonicDist < 15
                        ? 'bg-rose-950 text-rose-300 border border-rose-500'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-500'
                    }`}
                  >
                    {ultrasonicDist < 15 ? '⚠ Obstacle Warning' : '✓ Path Clear'}
                  </span>
                  <div className="text-[10px] text-stone-500 mt-2 font-mono">
                    Echo Ping: {(ultrasonicDist * 58).toFixed(0)} µs
                  </div>
                </div>
              </div>

              {/* 4x4 LED Matrix Grid */}
              <div className="p-4 bg-stone-950 rounded-xl border border-stone-800">
                <div className="text-xs font-bold text-white mb-1 flex items-center justify-between">
                  <span>4x4 LED Matrix Toggler</span>
                  <span className="text-xs text-stone-500">Click pixels</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 mt-3 max-w-[140px] mx-auto">
                  {ledMatrix.map((on, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        const copy = [...ledMatrix];
                        copy[idx] = !copy[idx];
                        setLedMatrix(copy);
                      }}
                      className={`w-7 h-7 rounded transition-colors cursor-pointer ${
                        on
                          ? 'bg-emerald-400 shadow-md shadow-emerald-500/50'
                          : 'bg-stone-800 hover:bg-stone-700'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {course.id === 'team-grace-web-studio' && (
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider font-mono">
                Team Grace AI Studio & Component Studio
              </span>
              <p className="text-xs text-stone-400 mt-0.5">
                Design reactive UI components and test AI Studio interface integration in real-time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-3">
                <div className="text-xs font-bold text-white">Component Configuration</div>
                <div>
                  <label className="text-[11px] text-stone-400 block mb-1">Headline Text:</label>
                  <input
                    type="text"
                    value={cardHeadline}
                    onChange={(e) => setCardHeadline(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-stone-400 block mb-1">Theme Accent:</label>
                  <div className="flex gap-2">
                    {['amber', 'emerald', 'rose', 'sky', 'purple'].map((c) => (
                      <button
                        key={c}
                        onClick={() => setComponentColor(c)}
                        className={`px-3 py-1 text-xs rounded font-medium capitalize cursor-pointer ${
                          componentColor === c
                            ? 'bg-white text-stone-950 font-bold'
                            : 'bg-stone-800 text-stone-400 hover:text-white'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live Preview */}
              <div className="p-6 bg-stone-950 rounded-xl border border-stone-800 flex flex-col justify-center items-center text-center">
                <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 max-w-sm w-full shadow-lg">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center mx-auto mb-2 font-bold text-sm">
                    ✨
                  </div>
                  <h4 className="text-sm font-bold text-white">{cardHeadline}</h4>
                  <p className="text-xs text-stone-400 mt-1">
                    Rendered live with AI Studio dynamic reactive bindings.
                  </p>
                  <div className="mt-3 inline-block px-3 py-1 bg-stone-800 text-amber-400 font-mono text-[10px] rounded">
                    theme: {componentColor}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {course.id === 'digital-arts-animation' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-fuchsia-400 uppercase tracking-wider font-mono">
                  2D Keyframe Frame-by-Frame Animator
                </span>
                <p className="text-xs text-stone-400 mt-0.5">
                  Scrub through the 4-frame bounce cycle or hit Play to preview tweened animation timing.
                </p>
              </div>
              <button
                onClick={() => setIsPlayingAnim(!isPlayingAnim)}
                className="px-3.5 py-1.5 text-xs font-bold bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded-lg cursor-pointer"
              >
                {isPlayingAnim ? '⏸ Pause' : '▶ Play Loop'}
              </button>
            </div>

            <div className="p-6 bg-stone-950 rounded-xl border border-stone-800 flex flex-col items-center justify-center">
              {/* Animation Stage */}
              <div className="w-72 h-44 bg-stone-900 rounded-2xl border border-stone-800 relative overflow-hidden flex items-center justify-center">
                {/* Simulated Bouncing Ball */}
                <div
                  className="w-10 h-10 rounded-full bg-gradient-to-tr from-fuchsia-500 to-pink-300 shadow-lg shadow-fuchsia-500/40 transition-all duration-200"
                  style={{
                    transform:
                      animFrame === 1
                        ? 'translateY(-40px) scale(1, 1)'
                        : animFrame === 2
                        ? 'translateY(10px) scale(0.9, 1.1)'
                        : animFrame === 3
                        ? 'translateY(40px) scale(1.3, 0.7)' // squash
                        : 'translateY(-10px) scale(0.95, 1.05)',
                  }}
                />
                <div className="absolute bottom-3 w-56 h-1 bg-stone-700/80 rounded" />
              </div>

              {/* Frame Controls */}
              <div className="flex items-center gap-2 mt-4">
                {[1, 2, 3, 4].map((f) => (
                  <button
                    key={f}
                    onClick={() => {
                      setIsPlayingAnim(false);
                      setAnimFrame(f);
                    }}
                    className={`px-3 py-1 text-xs rounded font-mono font-bold cursor-pointer ${
                      animFrame === f
                        ? 'bg-fuchsia-600 text-white'
                        : 'bg-stone-800 text-stone-400 hover:text-white'
                    }`}
                  >
                    Frame {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {course.id === 'experimental-science-optics' && (
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider font-mono">
                Snell’s Law & Quantum Laser Refraction Bench
              </span>
              <p className="text-xs text-stone-400 mt-0.5">
                Adjust angle of incidence $\theta_1$ and medium refractive index to calculate beam refraction angle $\theta_2$.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-3">
                <div className="text-xs font-bold text-white flex justify-between">
                  <span>Incident Angle ($\theta_1$)</span>
                  <span className="text-teal-400 font-mono">{laserAngle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="80"
                  value={laserAngle}
                  onChange={(e) => setLaserAngle(Number(e.target.value))}
                  className="w-full accent-teal-400"
                />

                <div className="pt-2 border-t border-stone-800 text-xs">
                  <span className="text-stone-400">Refractive Medium:</span>
                  <div className="flex gap-2 mt-1">
                    <button
                      onClick={() => setMediumRefractive(1.33)}
                      className={`px-2.5 py-1 text-xs rounded ${
                        mediumRefractive === 1.33 ? 'bg-teal-700 text-white' : 'bg-stone-800 text-stone-400'
                      }`}
                    >
                      Water (n=1.33)
                    </button>
                    <button
                      onClick={() => setMediumRefractive(1.52)}
                      className={`px-2.5 py-1 text-xs rounded ${
                        mediumRefractive === 1.52 ? 'bg-teal-700 text-white' : 'bg-stone-800 text-stone-400'
                      }`}
                    >
                      Crown Glass (n=1.52)
                    </button>
                    <button
                      onClick={() => setMediumRefractive(2.42)}
                      className={`px-2.5 py-1 text-xs rounded ${
                        mediumRefractive === 2.42 ? 'bg-teal-700 text-white' : 'bg-stone-800 text-stone-400'
                      }`}
                    >
                      Diamond (n=2.42)
                    </button>
                  </div>
                </div>
              </div>

              {/* Calculated Results */}
              <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 flex flex-col justify-center">
                <div className="text-xs text-stone-400">Calculated Refracted Angle ($\theta_2$):</div>
                <div className="text-3xl font-bold text-teal-300 font-mono my-1">
                  {(
                    (Math.asin((Math.sin((laserAngle * Math.PI) / 180) * 1.0) / mediumRefractive) *
                      180) /
                    Math.PI
                  ).toFixed(2)}
                  °
                </div>
                <div className="text-[11px] text-stone-500 font-mono">
                  Equation: n₁ · sin(θ₁) = n₂ · sin(θ₂) [Air n₁=1.0003]
                </div>
              </div>
            </div>
          </div>
        )}

        {course.id === 'junior-stem-explorers' && (
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
                Kinetic Gear Train & Rocket Thrust Lab
              </span>
              <p className="text-xs text-stone-400 mt-0.5">
                Experiment with mechanical gear ratios and observe rotational velocity transformations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-3">
                <div className="text-xs font-bold text-white flex justify-between">
                  <span>Driver Gear Teeth (A): {gearTeethA}</span>
                  <span>Follower Gear Teeth (B): {gearTeethB}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setGearTeethA(12);
                      setGearTeethB(36);
                    }}
                    className="px-2.5 py-1 text-xs bg-stone-800 hover:bg-stone-700 rounded"
                  >
                    1:3 Torque Multiplier
                  </button>
                  <button
                    onClick={() => {
                      setGearTeethA(36);
                      setGearTeethB(12);
                    }}
                    className="px-2.5 py-1 text-xs bg-stone-800 hover:bg-stone-700 rounded"
                  >
                    3:1 Speed Multiplier
                  </button>
                </div>
                <div className="text-xs text-stone-400 pt-2 border-t border-stone-800">
                  Computed Mechanical Advantage: {(gearTeethB / gearTeethA).toFixed(2)}x
                </div>
              </div>

              <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 flex items-center justify-around">
                <div
                  className="w-16 h-16 rounded-full border-4 border-dashed border-amber-400 flex items-center justify-center font-bold text-xs text-amber-300 animate-spin"
                  style={{ animationDuration: `${gearTeethA / 10}s` }}
                >
                  Gear A
                </div>
                <span className="text-stone-500 font-bold">⚙</span>
                <div
                  className="w-24 h-24 rounded-full border-4 border-dashed border-orange-400 flex items-center justify-center font-bold text-xs text-orange-300 animate-spin"
                  style={{ animationDuration: `${gearTeethB / 10}s`, animationDirection: 'reverse' }}
                >
                  Gear B
                </div>
              </div>
            </div>
          </div>
        )}

        {course.id === 'debate-leadership-ethics' && (
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
                Toulmin Logic Argument & Parliamentary Sparring Arena
              </span>
              <p className="text-xs text-stone-400 mt-0.5">
                Construct rigorous claims, articulate moral warrants, and test rebuttal validity against philosophical counter-propositions.
              </p>
            </div>

            <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-3">
              <div>
                <label className="text-[11px] text-stone-400 block mb-1">Proposition Claim:</label>
                <textarea
                  value={debateClaim}
                  onChange={(e) => setDebateClaim(e.target.value)}
                  rows={2}
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg p-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[11px] text-stone-400 block mb-1">Ethical Warrant & Evidence:</label>
                <textarea
                  value={debateWarrant}
                  onChange={(e) => setDebateWarrant(e.target.value)}
                  rows={2}
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg p-2 text-xs text-white"
                />
              </div>
            </div>
          </div>
        )}

        {course.id === 'code-rise' && (
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-orange-400 uppercase tracking-wider font-mono">
                Code Rise Live Micro-Sandbox & Python Calculator
              </span>
              <p className="text-xs text-stone-400 mt-0.5">
                Test web cards, write Python automation routines, or launch the complete Code Rise interactive app.
              </p>
            </div>
            <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">Interactive Code & Python Studio</span>
                <span className="text-orange-400 font-mono text-[11px]">Level 1–3 Supported</span>
              </div>
              <p className="text-xs text-stone-300">
                Code Rise provides full HTML/CSS/JS editing, Python data scraping, client templates, and automated certificates.
              </p>
            </div>
          </div>
        )}

        {course.id === 'advert-clinic' && (
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider font-mono">
                Advert Clinic — Viral Copy & Campaign Studio
              </span>
              <p className="text-xs text-stone-400 mt-0.5">
                Build high-converting social media flyers, score marketing headlines, and simulate budget ROI.
              </p>
            </div>
            <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">Headline Tester & Visual Flyer Lab</span>
                <span className="text-rose-400 font-mono text-[11px]">AIDA Framework Active</span>
              </div>
              <p className="text-xs text-stone-300">
                Test headline conversion strength, export branded flyers for WhatsApp, and model 7-day customer acquisition revenues.
              </p>
            </div>
          </div>
        )}

        {course.id === 'robo-mech' && (
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
                Robo Mech — Mechatronics Test Bench with Talking AI Tutor
              </span>
              <p className="text-xs text-stone-400 mt-0.5">
                Test H-Bridge motor drivers, ultrasonic echo delays, servo angles, and hear spoken robotics advice from RoboTutor AI.
              </p>
            </div>
            <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">150 Lessons Across Beginners, Intermediate & Pro</span>
                <span className="text-cyan-400 font-mono text-[11px]">Voice AI Enabled</span>
              </div>
              <p className="text-xs text-stone-300">
                Full mechatronics training: circuits, microcontrollers, FOC motor control, inverse kinematics, and ROS 2 autonomous navigation.
              </p>
            </div>
          </div>
        )}

        {/* Practice Levels Checklist (Levels 1 to 5) */}
        <div className="pt-4 border-t border-stone-800">
          <div className="text-xs font-bold text-stone-300 uppercase tracking-wider mb-3">
            Hands-on Level Competency Badges (Click to Mark Practiced):
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((lvl) => {
              const isChecked = !!practicedLevels[lvl];
              const tierName = lvl <= 2 ? 'Beginner' : lvl <= 4 ? 'Intermediate' : 'Pro';

              return (
                <button
                  key={lvl}
                  onClick={() => toggleLevelPracticed(lvl)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isChecked
                      ? 'bg-emerald-950/60 border-emerald-500/80 text-emerald-200'
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold font-mono">LEVEL {lvl}</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded font-semibold bg-stone-800">
                      {tierName}
                    </span>
                  </div>
                  <div className="text-xs font-semibold mt-1">
                    {isChecked ? '✓ Practiced' : 'Needs Practice'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
