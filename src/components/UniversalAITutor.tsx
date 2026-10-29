import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Send,
  Sparkles,
  HelpCircle,
  X,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Award,
  BookOpen,
  MessageSquare,
  Wand2,
  Sliders,
  ExternalLink,
} from 'lucide-react';

export interface LessonContext {
  courseId?: string;
  courseTitle?: string;
  levelNumber?: number;
  levelTitle?: string;
  lessonNumber?: number;
  lessonTitle?: string;
  concept?: string;
  explanation?: string;
  practicalLab?: string;
  codeSnippet?: string;
}

interface UniversalAITutorProps {
  context?: LessonContext;
  isOpen?: boolean;
  onClose?: () => void;
  floating?: boolean; // If true, renders a floating activator button in bottom-right
  accentColor?: 'amber' | 'rose' | 'cyan' | 'emerald' | 'indigo' | 'purple';
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
  quizQuestion?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    userAnswer?: number;
    isCorrect?: boolean;
  };
}

// Comprehensive offline domain knowledge bases for deep, developed explanations
const DOMAIN_KNOWLEDGE: Record<string, { keywords: string[]; title: string; answer: string; relatedConcepts: string[] }[]> = {
  robotics: [
    {
      keywords: ['kinematics', 'forward kinematics', 'inverse kinematics', 'arm', 'angles', 'coordinates'],
      title: 'Forward & Inverse Robot Kinematics',
      answer:
        'In robotics, Kinematics governs the spatial motion of mechanical linkages without considering mass or forces. Forward Kinematics (FK) calculates the end-effector cartesian coordinates (X, Y, Z) given joint angles (θ1, θ2... θn) using trigonometric rotation matrices and Denavit-Hartenberg (D-H) parameter tables. Inverse Kinematics (IK) solves the reverse: given a target coordinate in 3D space, it computes the exact motor shaft angles required. Because IK often involves nonlinear trigonometric equations with multiple solutions or singular configurations (where the arm loses a degree of freedom), modern robots employ analytical geometric solvers or Jacobian matrix pseudoinverses.',
      relatedConcepts: ['Denavit-Hartenberg Parameters', 'Jacobian Matrix', 'Singularity Avoidance', 'End-Effector Trajectories'],
    },
    {
      keywords: ['pid', 'controller', 'tuning', 'proportional', 'integral', 'derivative', 'error'],
      title: 'Closed-Loop PID Control & Dynamic Tuning',
      answer:
        'A Proportional-Integral-Derivative (PID) controller continuously computes an error value e(t) as the difference between a desired setpoint r(t) and measured process variable y(t). The Proportional term (Kp * e) provides immediate restorative torque proportional to current error. The Integral term (Ki * ∫e dt) accumulates past errors to eliminate steady-state offset caused by friction or gravity. The Derivative term (Kd * de/dt) calculates the rate of change to damp oscillations and anticipate overshoot. When tuning mechatronic systems using the classic Ziegler-Nichols frequency response method, you first increase Kp until continuous oscillation occurs (Ku), then set Ki and Kd based on the critical period (Tu) while implementing anti-windup clamping on the integral accumulator.',
      relatedConcepts: ['Ziegler-Nichols Method', 'Steady-State Error', 'Anti-Windup Clamping', 'Bode Stability Margins'],
    },
    {
      keywords: ['motor', 'h-bridge', 'l298n', 'pwm', 'back-emf', 'mosfet', 'driver'],
      title: 'H-Bridge Motor Drivers & Inductive Flyback Protection',
      answer:
        'Microcontroller GPIO pins output 3.3V or 5V with a maximum current rating of 20–40mA—insufficient to drive inductive electromagnetic coils in DC motors. An H-Bridge circuit configures 4 switching transistors (typically N-channel and P-channel MOSFETs) in an "H" shape. When diagonal transistors Q1 and Q4 are turned ON, current flows forward through the motor armature; turning Q2 and Q3 ON reverses the polarity and shaft direction. High-frequency Pulse Width Modulation (PWM, typically 10kHz–25kHz) controls average rotational speed. Because electric motor coils store magnetic energy, turning them off causes an instantaneous inductive voltage spike (V = L * di/dt) known as back-EMF, which can exceed hundreds of volts. Fast-recovery flyback Schottky diodes or internal MOSFET body diodes are mandatory to safely clamp reverse voltage transients into the DC power rails.',
      relatedConcepts: ['MOSFET Gate Drivers', 'Flyback Schottky Diodes', 'Duty Cycle Modulation', 'Dead-Time Insertion'],
    },
    {
      keywords: ['can bus', 'protocol', 'communication', 'differential', 'telemetry', 'wiring'],
      title: 'Controller Area Network (CAN Bus) & Robust Telemetry',
      answer:
        'Originally designed by Bosch for harsh automotive environments, CAN Bus (ISO 11898) is the industry standard for multi-master, real-time mechatronics communication. It utilizes a twisted pair of wires designated CAN_High (CANH) and CAN_Low (CANL). Rather than relying on a noisy single-ended ground reference, CAN transmits data differentially: a logic "0" (dominant bit) drives CANH up to 3.5V and CANL down to 1.5V (a 2.0V differential), while a logic "1" (recessive bit) lets both float at 2.5V (0V differential). This differential pair cancels out severe electromagnetic interference (EMI) from motor brush arcs. CAN frames include an 11-bit or 29-bit identifier that simultaneously dictates message priority through non-destructive bitwise arbitration, a Cyclic Redundancy Check (CRC) for error detection, and automatic hardware retransmission.',
      relatedConcepts: ['Differential Signaling', 'Non-Destructive Bitwise Arbitration', '120Ω Termination Resistors', 'CANopen Protocol'],
    },
    {
      keywords: ['kalman', 'sensor fusion', 'imu', 'gyroscope', 'accelerometer', 'mpu6050', 'filter'],
      title: 'Kalman Filtering & 6-Axis Inertial Sensor Fusion',
      answer:
        'A 6-axis IMU combines a 3-axis MEMS accelerometer and a 3-axis gyroscope. Accelerometers accurately measure gravity to calculate static tilt angles (roll and pitch), but are susceptible to severe high-frequency vibrational noise from mechanical motors. Gyroscopes measure angular rate of rotation dynamically without vibration sensitivity, but suffer from low-frequency integration drift that accumulates over time. A linear Kalman filter operates in a two-stage recursive loop: Prediction (using the gyroscope rate integration model to forecast the state covariance) and Update (incorporating accelerometer gravity vectors with measurement noise variance R). This computes the optimal mathematical estimate of real-time robot orientation, enabling two-wheeled balancing rovers and quadcopter drones to maintain stable equilibrium.',
      relatedConcepts: ['State Covariance Matrix', 'MEMS Drift Compensation', 'Complementary Filter', 'Quaternions vs Euler Angles'],
    },
  ],
  advertising: [
    {
      keywords: ['advertising', 'how to use', 'advert clinic', 'steps', 'workflow', 'guide'],
      title: 'How to Use Advert Clinic to Scale Youth Businesses',
      answer:
        'To successfully expand your youth business using Advert Clinic, follow this 4-step commercial workflow:\n1. Ad Creative Studio: Select your industry niche (Fashion, Tech, Food, Services). Choose a high-impact color palette (Rose Gradient, Obsidian Neon, Emerald Trust), insert a compelling headline, and specify a clear Call-to-Action (WhatsApp direct link or order page).\n2. Headline Diagnostic Clinic: Paste your marketing hook into the diagnostic scanner. The tool evaluates psychological triggers, urgency words (e.g. "Exclusive", "30% Off", "Now"), length, and emotional resonance to output an optimization score (0–100%).\n3. Growth & ROI Simulator: Set your daily ad budget ($5–$100), choose audience scope (hyper-local neighborhood vs metropolitan vs national), and enter your average customer order value ($10–$250). The algorithm computes weekly estimated reach, click-through rate (CTR), conversion volume, and net profit.\n4. Campaign Export & Launch: Click "Download Poster (PNG)" to save high-resolution marketing flyers formatted for Instagram Stories, TikTok feeds, and WhatsApp Status updates.',
      relatedConcepts: ['AIDA Framework', 'Call to Action (CTA)', 'Conversion Rate Optimization', 'Customer Acquisition Cost'],
    },
    {
      keywords: ['roi', 'budget', 'conversion', 'metrics', 'ctr', 'cac', 'ltv'],
      title: 'Commercial Advertising Metrics & Growth Economics',
      answer:
        'Modern performance marketing relies on five quantifiable financial levers:\n1. Impressions & Reach: Total visual exposures of your ad.\n2. Click-Through Rate (CTR): The percentage of viewers who take action (CTR = [Clicks / Impressions] * 100). A healthy local ad averages 3%–5%.\n3. Conversion Rate (CVR): The percentage of visitors who complete a paid purchase (CVR = [Buyers / Total Clicks] * 100). E-commerce benchmarks hover between 2% and 8%.\n4. Customer Acquisition Cost (CAC): Total marketing expenditure divided by new customers acquired.\n5. Return on Ad Spend (ROAS) & Net ROI: Revenue generated divided by advertising cost. When your customer Lifetime Value (LTV) exceeds 3x your CAC, your youth enterprise is primed for rapid exponential growth.',
      relatedConcepts: ['Return on Ad Spend (ROAS)', 'Cost Per Click (CPC)', 'Funnel Optimization', 'A/B Split Testing'],
    },
    {
      keywords: ['headline', 'copywriting', 'hook', 'aida', 'attention'],
      title: 'Psychological Copywriting & The AIDA Blueprint',
      answer:
        'The classical AIDA framework structures every successful commercial advertisement:\n- Attention (Hook): Stop the viewer from scrolling within 1.5 seconds by highlighting an acute customer pain point, bold promise, or striking visual contrast.\n- Interest: Present your unique mechanism or special secret (e.g., "Handcrafted in 24 hours with organic shea butter").\n- Desire: Paint a vivid sensory picture of life after using your solution (social admiration, saved time, confidence).\n- Action: A single, low-friction directive with urgent incentive (e.g., "Tap the WhatsApp link below — first 10 callers receive a free styling kit").',
      relatedConcepts: ['Social Proof', 'Risk Reversal Guarantee', 'Urgency & Scarcity', 'Unique Selling Proposition (USP)'],
    },
  ],
  coding: [
    {
      keywords: ['react', 'component', 'props', 'state', 'hook', 'useeffect'],
      title: 'React Architecture, State Immutability & Lifecycle Hooks',
      answer:
        'React operates on a declarative component paradigm powered by a Virtual DOM reconciliation engine (Fiber). State represents mutable data that triggers UI re-renders when updated. Crucially, state must be treated as immutable—never mutate objects directly; always return new references using spread operators or state updater callbacks (setCount(prev => prev + 1)). The useEffect hook synchronizes components with external systems (DOM listeners, network requests, speech synthesis, timers). Always specify explicit dependency arrays to prevent memory leaks or runaway infinite re-render cycles, and return cleanup functions to unbind event listeners on component unmount.',
      relatedConcepts: ['Virtual DOM Reconciliation', 'Fiber Tree Architecture', 'Pure Components', 'Custom Hooks Pattern'],
    },
    {
      keywords: ['python', 'oop', 'class', 'inheritance', 'polymorphism', 'dunder'],
      title: 'Object-Oriented Architecture & Python Dunder Methods',
      answer:
        'Object-Oriented Programming (OOP) packages state (attributes) and behavior (methods) into reusable Blueprint Classes. Python incorporates special "dunder" (double underscore) methods that define fundamental behavior: __init__ constructs and initializes new instances, __str__ returns human-readable representation, and __repr__ provides an unambiguous developer representation. Inheritance allows derived subclasses to extend parent classes (using super()), while Polymorphism enables uniform interfaces across distinct object types (e.g., calling player.update() regardless of whether player is a Human or AIBot instance).',
      relatedConcepts: ['Encapsulation', 'Method Resolution Order (MRO)', 'Composition over Inheritance', 'Abstract Base Classes'],
    },
  ],
  bible: [
    {
      keywords: ['bible', 'scripture', 'genesis', 'revelation', 'testament', 'gospel', 'law'],
      title: 'The Canonical Architecture: From Genesis to Revelation',
      answer:
        'The Holy Bible consists of 66 canonical books divided across two major testaments:\n- Old Testament (39 Books): The Pentateuch or Torah (Genesis through Deuteronomy, laying divine creation, the Fall, covenants with Abraham, and Mosaic law); Historical Books (Joshua through Esther, detailing Israel’s kingdoms and exile); Wisdom Literature (Job, Psalms, Proverbs, Ecclesiastes, Song of Songs, exploring worship, prayer, and character); and the Prophets (Isaiah through Malachi, calling for moral justice and foretelling the Messiah).\n- New Testament (27 Books): The Four Gospels (Matthew, Mark, Luke, John, documenting the incarnation, ministry, miracles, crucifixion, and resurrection of Jesus); the Book of Acts (birth and mission of the early church empowered by the Holy Spirit); the Pauline & General Epistles (Romans through Jude, establishing core Christian theology and practical love); and the Book of Revelation (apocalyptic prophecy of Christ’s final victory, the defeat of evil, and the New Jerusalem).',
      relatedConcepts: ['Covenantal Theology', 'Messianic Prophecies', 'Beatitudes & Agape Love', 'Apocalyptic Eschatology'],
    },
  ],
};

export const UniversalAITutor: React.FC<UniversalAITutorProps> = ({
  context,
  isOpen: controlledIsOpen,
  onClose,
  floating = true,
  accentColor = 'amber',
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState<boolean>(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  // Speech Recognition (Voice Input) State
  const [isListening, setIsListening] = useState<boolean>(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(false);
  const recognitionRef = useRef<any>(null);

  // Speech Synthesis (Voice Output) State
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [voiceRate, setVoiceRate] = useState<number>(1.0);
  const [voiceMuted, setVoiceMuted] = useState<boolean>(false);

  // Lesson Read-Aloud Player State
  const [isReadingLesson, setIsReadingLesson] = useState<boolean>(false);
  const [readProgress, setReadProgress] = useState<string>('');

  // Chat conversation state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'tutor',
      text: `Hello! I am your AI Master Tutor. I am 100% offline-capable, ready to talk with voice, write deep explanations, quiz you on any topic, or read your lessons out loud. How can I help your studies today?`,
      timestamp: 'Just now',
    },
  ]);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'chat' | 'lesson-reader' | 'quiz-generator'>('chat');

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Initialize Speech Recognition on Mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        setSpeechSupported(true);
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            setInputQuery(transcript);
            handleSendMessage(transcript);
          }
        };

        recognition.onerror = (event: any) => {
          console.warn('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSpeaking]);

  // Voice Speaking Helper
  const speakText = (text: string, onComplete?: () => void) => {
    if (voiceMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      onComplete?.();
      return;
    }
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#`[\]()]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = voiceRate;
    utterance.pitch = 1.0;

    // Pick a natural English voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) =>
        v.lang.startsWith('en') &&
        (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel'))
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      onComplete?.();
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      onComplete?.();
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsReadingLesson(false);
  };

  // Toggle Microphone Voice Input
  const toggleListening = () => {
    if (!speechSupported || !recognitionRef.current) {
      alert('Voice microphone input is not supported in this browser. You can type your question in the text box!');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      stopSpeaking();
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.warn(e);
      }
    }
  };

  // Offline AI Query Answer Generator
  const generateOfflineAnswer = (query: string): { text: string; related?: string[] } => {
    const q = query.toLowerCase();

    // Check if query is about the current lesson context
    if (context && (q.includes('this lesson') || q.includes('current lesson') || q.includes('what are we learning') || q.includes('explain lesson'))) {
      return {
        text: `Here is a full breakdown of "${context.lessonTitle || context.courseTitle}":\n\n🎯 Core Concept:\n${context.concept || 'Foundational principles and hands-on laboratory application.'}\n\n📖 Deep Technical Explanation:\n${context.explanation || 'This lesson establishes theoretical models followed by physical testing to ensure rigorous technical mastery.'}\n\n🔬 Practical Lab Challenge:\n${context.practicalLab || 'Apply what you have learned by constructing, testing, and recording telemetry values on your workstation.'}`,
        related: ['Generate Practice Quiz', 'Read Lesson Aloud', 'Key Takeaways'],
      };
    }

    // Check domain knowledge base
    for (const domain of Object.values(DOMAIN_KNOWLEDGE)) {
      for (const entry of domain) {
        if (entry.keywords.some((kw) => q.includes(kw))) {
          return {
            text: `💡 **${entry.title}**\n\n${entry.answer}`,
            related: entry.relatedConcepts,
          };
        }
      }
    }

    // Check specific topics like quizzes or how to use
    if (q.includes('advert') || q.includes('marketing') || q.includes('business') || q.includes('expand')) {
      return {
        text: `📊 **Advert Clinic Commercial Strategy**:\nAdvert Clinic helps youth businesses expand through high-converting poster design, psychology-backed headline scoring, and real-time ROI budget simulation. When launching an ad, focus on an irresistible offer with clear urgency, guaranteed quality, and a direct WhatsApp link to capture immediate sales.`,
        related: ['Headline Hook Scoring', 'Conversion Rate Simulator', 'Ad Poster Styling'],
      };
    }

    if (q.includes('robot') || q.includes('mech') || q.includes('circuit') || q.includes('motor')) {
      return {
        text: `🤖 **Advanced Mechatronics Principle**:\nRobotics merges mechanical linkages, power electronics, and embedded software. For autonomous navigation, remember that sensors provide raw data that must be filtered (e.g. via Kalman or Complementary filters) before feeding into a closed-loop PID controller governing PWM motor outputs.`,
        related: ['Kinematics & Linkages', 'PID Motor Control', 'Sensor Fusion'],
      };
    }

    if (q.includes('code') || q.includes('python') || q.includes('program') || q.includes('web')) {
      return {
        text: `💻 **Software Architecture Insight**:\nClean code prioritizes modularity, readability, and predictable state flow. Whether building interactive 2D physics in Python with delta-time integration or reactive web interfaces in TypeScript, ensure functions do one job well and handle errors gracefully.`,
        related: ['Object-Oriented Programming', 'Algorithm Efficiency', 'State Management'],
      };
    }

    if (q.includes('bible') || q.includes('verse') || q.includes('scripture') || q.includes('god')) {
      return {
        text: `📖 **Biblical Wisdom & Truth**:\n"All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness" (2 Timothy 3:16). From the sovereign creation in Genesis through the sacrificial grace of Jesus in the Gospels and the glorious promise in Revelation, God's Word guides your moral character and youth leadership.`,
        related: ['7-Day Bible Timetable', 'Scripture Concordance', 'Old & New Testament Eras'],
      };
    }

    // Default developed answer
    return {
      text: `Excellent question! In ${context?.courseTitle || 'your studies'}, excellence comes from understanding fundamental principles rather than memorizing surface facts. Every physical circuit, software algorithm, marketing campaign, and philosophical argument obeys strict laws of cause and effect. What specific concept would you like me to elaborate on or quiz you on?`,
      related: ['Generate Practice Quiz', 'Read Lesson Aloud', 'Step-by-Step Breakdown'],
    };
  };

  // Handle Sending a Message
  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputQuery;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');

    // Answer logic
    setTimeout(() => {
      const isQuizRequest =
        text.toLowerCase().includes('quiz') ||
        text.toLowerCase().includes('test me') ||
        text.toLowerCase().includes('ask me a question');

      if (isQuizRequest) {
        generatePracticeQuestion();
      } else {
        const result = generateOfflineAnswer(text);
        const tutorMsg: ChatMessage = {
          id: `t-${Date.now()}`,
          sender: 'tutor',
          text: result.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, tutorMsg]);
        speakText(result.text);
      }
    }, 450);
  };

  // Generate Interactive Practice Question
  const generatePracticeQuestion = () => {
    const sampleQuestions = [
      {
        question: `In robotics and mechatronics, why do we use a Closed-Loop PID Controller instead of simply running motors at constant PWM speed?`,
        options: [
          'Because constant speed causes batteries to explode immediately',
          'To dynamically adjust power based on real-time feedback error, compensating for payload variations and terrain friction',
          'Because microcontrollers cannot output digital signals without a PID library',
          'PID controllers eliminate the need for electrical ground wires',
        ],
        correctIndex: 1,
        explanation:
          'Open-loop control cannot compensate for disturbances like climbing an incline or bearing friction. A PID controller measures real-time encoder feedback and applies proportional, integral, and derivative corrections to maintain the exact desired setpoint.',
      },
      {
        question: `When designing an advertisement for a youth enterprise, what is the primary objective of the AIDA "Attention" (Hook) phase?`,
        options: [
          'To immediately demand full payment before explaining the product',
          'To stop user scrolling within 1.5 seconds using visual contrast or acute pain-point resonance',
          'To list 50 paragraphs of detailed product specifications',
          'To hide the business name to create mystery',
        ],
        correctIndex: 1,
        explanation:
          'In modern digital media, users scroll past thousands of posts per minute. The hook must instantly halt the scroll and establish relevance within the first 1.5 to 3 seconds.',
      },
      {
        question: `In Python game architecture, why must movement coordinates be multiplied by "delta time" (dt)?`,
        options: [
          'To translate Python into C++ assembly instructions',
          'To ensure character movement speed remains constant regardless of whether the screen runs at 30 FPS or 144 FPS',
          'To reduce computer battery temperature',
          'To enable multiplayer networking protocols',
        ],
        correctIndex: 1,
        explanation:
          'Without delta-time normalization, games running on faster graphics cards execute more loop iterations per second, causing the game physics to run in uncontrollable super-speed.',
      },
      {
        question: `According to 2 Timothy 3:16, what is the divine source and primary utility of the Holy Scriptures?`,
        options: [
          'Written purely as ancient poetry without modern moral application',
          'All Scripture is God-breathed and useful for teaching, rebuking, correcting, and training in righteousness',
          'It is only relevant to historians studying archaeological artifacts',
          'It replaces the need to exercise personal kindness or community love',
        ],
        correctIndex: 1,
        explanation:
          'Scripture is divinely inspired ("God-breathed") and equips youth believers with moral discernment, ethical clarity, and righteous character.',
      },
    ];

    const chosen = sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)];

    const quizMsg: ChatMessage = {
      id: `quiz-${Date.now()}`,
      sender: 'tutor',
      text: `🧠 **Interactive Knowledge Check**:\nHere is a question to test your mastery. Select the best answer below:`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quizQuestion: {
        question: chosen.question,
        options: chosen.options,
        correctIndex: chosen.correctIndex,
        explanation: chosen.explanation,
      },
    };

    setMessages((prev) => [...prev, quizMsg]);
    speakText(`Here is a practice question to test your knowledge: ${chosen.question}`);
  };

  // Handle User Answering Quiz Question
  const handleAnswerQuiz = (msgId: string, optionIdx: number) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === msgId && msg.quizQuestion) {
          const isCorrect = optionIdx === msg.quizQuestion.correctIndex;
          const updated = {
            ...msg,
            quizQuestion: {
              ...msg.quizQuestion,
              userAnswer: optionIdx,
              isCorrect,
            },
          };
          const feedback = isCorrect
            ? `Correct! Excellent work. ${msg.quizQuestion.explanation}`
            : `Not quite. The correct answer was option ${String.fromCharCode(65 + msg.quizQuestion.correctIndex)}. ${msg.quizQuestion.explanation}`;
          speakText(feedback);
          return updated;
        }
        return msg;
      })
    );
  };

  // Read Aloud Current Lesson Content
  const handleReadLessonAloud = () => {
    if (!context) {
      alert('No lesson is currently open. Select any lesson in your course curriculum to read it aloud!');
      return;
    }

    if (isReadingLesson) {
      stopSpeaking();
      return;
    }

    const script = `Lesson ${context.lessonNumber || ''}: ${context.lessonTitle || context.courseTitle || 'Curriculum Overview'}. 
Core Concept: ${context.concept || ''}. 
Detailed Technical Explanation: ${context.explanation || ''}. 
Practical Lab Challenge: ${context.practicalLab || ''}.`;

    setIsReadingLesson(true);
    setReadProgress('Reading lesson content...');
    speakText(script, () => {
      setIsReadingLesson(false);
      setReadProgress('Finished reading lesson.');
    });
  };

  // Theme styling based on accentColor
  const themeClasses = {
    amber: {
      btn: 'bg-amber-400 hover:bg-amber-300 text-stone-950',
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      border: 'border-amber-400/40',
      activeTab: 'bg-amber-400 text-stone-950',
    },
    rose: {
      btn: 'bg-rose-500 hover:bg-rose-400 text-white',
      badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      border: 'border-rose-400/40',
      activeTab: 'bg-rose-500 text-white',
    },
    cyan: {
      btn: 'bg-cyan-500 hover:bg-cyan-400 text-stone-950',
      badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      border: 'border-cyan-400/40',
      activeTab: 'bg-cyan-500 text-stone-950',
    },
    emerald: {
      btn: 'bg-emerald-500 hover:bg-emerald-400 text-stone-950',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      border: 'border-emerald-400/40',
      activeTab: 'bg-emerald-500 text-stone-950',
    },
    indigo: {
      btn: 'bg-indigo-500 hover:bg-indigo-400 text-white',
      badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      border: 'border-indigo-400/40',
      activeTab: 'bg-indigo-500 text-white',
    },
    purple: {
      btn: 'bg-purple-500 hover:bg-purple-400 text-white',
      badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      border: 'border-purple-400/40',
      activeTab: 'bg-purple-500 text-white',
    },
  }[accentColor];

  const handleClose = () => {
    stopSpeaking();
    if (onClose) onClose();
    setInternalIsOpen(false);
  };

  return (
    <>
      {/* Floating Trigger Button (Always visible on bottom-left / bottom-right when requested) */}
      {floating && !isOpen && (
        <button
          onClick={() => setInternalIsOpen(true)}
          className={`fixed bottom-20 right-5 z-40 px-4 py-2.5 rounded-full ${themeClasses.btn} font-bold text-xs shadow-2xl flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer border border-white/20`}
          title="Open Talking & Writing Offline AI Tutor"
        >
          <Bot className="w-4 h-4 animate-bounce" />
          <span>AI Tutor (Talk & Listen)</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </button>
      )}

      {/* Main AI Tutor Modal Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-fade-in">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-2xl w-full text-stone-100 shadow-2xl overflow-hidden my-4 flex flex-col h-[85vh] max-h-[750px]">
            {/* Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border-b border-stone-800 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-stone-800 border border-stone-700 flex items-center justify-center text-amber-400 shadow-sm shrink-0">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white font-display">
                      Offline Voice AI Tutor
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      100% Offline
                    </span>
                  </div>
                  <span className="text-xs text-stone-400 block truncate max-w-[280px] sm:max-w-md">
                    {context?.lessonTitle ? `Studying: ${context.lessonTitle}` : context?.courseTitle || 'All Curriculum Apps'}
                  </span>
                </div>
              </div>

              {/* Header Voice Controls & Close */}
              <div className="flex items-center gap-1.5">
                {/* Voice Rate Selector */}
                <button
                  onClick={() => setVoiceRate((r) => (r === 1.0 ? 1.2 : r === 1.2 ? 0.8 : 1.0))}
                  title="Adjust Voice Speed"
                  className="px-2 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-[10px] font-mono text-stone-300 font-bold"
                >
                  {voiceRate}x
                </button>

                {/* Mute / Unmute Voice */}
                <button
                  onClick={() => {
                    if (!voiceMuted) stopSpeaking();
                    setVoiceMuted(!voiceMuted);
                  }}
                  title={voiceMuted ? 'Unmute AI Voice' : 'Mute AI Voice'}
                  className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition cursor-pointer"
                >
                  {voiceMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                </button>

                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Sub-Header Actions: Read Aloud Lesson + Quick Quiz */}
            <div className="px-4 py-2.5 bg-stone-950/80 border-b border-stone-800/80 flex items-center justify-between gap-2 overflow-x-auto shrink-0">
              <div className="flex items-center gap-2">
                {/* Read Aloud Button */}
                <button
                  onClick={handleReadLessonAloud}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    isReadingLesson
                      ? 'bg-amber-400 text-stone-950 animate-pulse'
                      : 'bg-stone-800 hover:bg-stone-700 text-stone-200'
                  }`}
                  title="Read currently selected lesson content aloud with voice"
                >
                  {isReadingLesson ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current text-amber-400" />}
                  <span>{isReadingLesson ? 'Pause Lesson Reading' : 'Read Lesson Aloud'}</span>
                </button>

                {/* Quick Practice Question Button */}
                <button
                  onClick={generatePracticeQuestion}
                  className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  title="Generate an interactive practice question"
                >
                  <Wand2 className="w-3.5 h-3.5 text-rose-400" />
                  <span>Quiz Me Now</span>
                </button>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-2 text-xs text-stone-400">
                {isSpeaking && (
                  <span className="flex items-center gap-1 text-[11px] font-mono text-amber-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                    AI Speaking...
                  </span>
                )}
                {isListening && (
                  <span className="flex items-center gap-1 text-[11px] font-mono text-rose-400 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                    Listening to Microphone...
                  </span>
                )}
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`p-4 rounded-2xl max-w-[88%] text-xs sm:text-sm leading-relaxed space-y-2 ${
                      msg.sender === 'user'
                        ? 'bg-stone-800 text-stone-100 border border-stone-700 rounded-br-xs'
                        : 'bg-stone-950 text-stone-200 border border-stone-800 rounded-bl-xs'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.text}</div>

                    {/* Interactive Quiz Card inside message if present */}
                    {msg.quizQuestion && (
                      <div className="mt-3 p-3.5 rounded-xl bg-stone-900 border border-stone-800 space-y-3">
                        <div className="font-bold text-amber-300 text-xs sm:text-sm">
                          {msg.quizQuestion.question}
                        </div>

                        <div className="space-y-1.5">
                          {msg.quizQuestion.options.map((opt, optIdx) => {
                            const isChosen = msg.quizQuestion?.userAnswer === optIdx;
                            const isCorrectOpt = optIdx === msg.quizQuestion?.correctIndex;
                            const hasAnswered = msg.quizQuestion?.userAnswer !== undefined;

                            let btnStyle = 'bg-stone-950 hover:bg-stone-800 text-stone-300 border-stone-800';
                            if (hasAnswered) {
                              if (isCorrectOpt) {
                                btnStyle = 'bg-emerald-950/60 text-emerald-300 border-emerald-500 font-bold';
                              } else if (isChosen && !isCorrectOpt) {
                                btnStyle = 'bg-rose-950/60 text-rose-300 border-rose-500 line-through';
                              }
                            }

                            return (
                              <button
                                key={optIdx}
                                onClick={() => !hasAnswered && handleAnswerQuiz(msg.id, optIdx)}
                                disabled={hasAnswered}
                                className={`w-full p-2.5 rounded-lg border text-left text-xs transition flex items-start gap-2.5 cursor-pointer ${btnStyle}`}
                              >
                                <span className="font-mono font-bold text-stone-400 shrink-0">
                                  {String.fromCharCode(65 + optIdx)}.
                                </span>
                                <span>{opt}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation feedback */}
                        {msg.quizQuestion.userAnswer !== undefined && (
                          <div
                            className={`p-2.5 rounded-lg text-xs leading-relaxed ${
                              msg.quizQuestion.isCorrect
                                ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                                : 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
                            }`}
                          >
                            <span className="font-bold block mb-0.5">
                              {msg.quizQuestion.isCorrect ? '✓ Correct Answer!' : '✕ Needs Review:'}
                            </span>
                            {msg.quizQuestion.explanation}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] text-stone-500 px-1 mt-1 font-mono">
                    {msg.sender === 'user' ? 'You' : 'AI Tutor'} · {msg.timestamp}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-4 py-2 bg-stone-950 border-t border-stone-800 flex items-center gap-1.5 overflow-x-auto shrink-0 no-scrollbar">
              <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider shrink-0">
                Ask:
              </span>
              {[
                'Explain this lesson in simple terms',
                'What is the practical lab challenge?',
                'Give me a tricky quiz question',
                'How do I apply this in a real project?',
              ].map((suggestion, sIdx) => (
                <button
                  key={sIdx}
                  onClick={() => handleSendMessage(suggestion)}
                  className="px-2.5 py-1 rounded-full bg-stone-900 hover:bg-stone-800 text-[11px] text-stone-300 border border-stone-800 whitespace-nowrap cursor-pointer transition"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Bottom Input Bar with Voice Mic & Text Input */}
            <div className="p-3 sm:p-4 bg-stone-950 border-t border-stone-800 flex items-center gap-2 shrink-0">
              {/* Voice Microphone Toggle */}
              <button
                onClick={toggleListening}
                title={isListening ? 'Stop listening' : 'Ask question using your microphone (Voice Input)'}
                className={`p-3 rounded-2xl transition flex items-center justify-center shrink-0 cursor-pointer ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/30'
                    : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
                }`}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-amber-400" />}
              </button>

              {/* Text Input */}
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={isListening ? 'Listening to your voice...' : 'Type or speak a question to the AI Tutor...'}
                className="flex-1 bg-stone-900 border border-stone-700 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-stone-500 outline-none focus:border-amber-400 transition"
              />

              {/* Send Button */}
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputQuery.trim()}
                className={`p-3 rounded-2xl font-bold transition flex items-center justify-center shrink-0 cursor-pointer ${
                  inputQuery.trim()
                    ? `${themeClasses.btn} shadow-md`
                    : 'bg-stone-800 text-stone-600 cursor-not-allowed'
                }`}
                title="Send question"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
