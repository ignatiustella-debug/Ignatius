import {
  CourseLesson,
  CourseLevel,
  CourseTier,
  COURSE_CURRICULA,
} from './courseCurriculum';

export type { CourseLesson, CourseLevel, CourseTier };
export { COURSE_CURRICULA };

export interface Course {
  id: string;
  title: string;
  tagline: string;
  category: 'stem-coding' | 'arts-media' | 'science-labs' | 'leadership-logic';
  categoryLabel: string;
  ageRange: string;
  ageTier: 'explorers' | 'navigators' | 'innovators';
  ageTierLabel: string;
  cohortSchedule: string;
  duration: string;
  sessionHours: string;
  classSize: string;
  maxSeats: number;
  availableSeats: number;
  tuition: number; // per 12-week semester
  leadMentor: {
    name: string;
    role: string;
    avatar: string;
    background: string;
  };
  highlights: string[];
  toolsProvided: string[];
  syllabus: { week: number; title: string; objective: string }[];
  levels: CourseLevel[]; // 5 comprehensive levels x 10 lessons each = 50 lessons
  featuredProject: string;
  popular?: boolean;
  liveAppUrl?: string;
  liveAppLabel?: string;
}

export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  time: string;
  courseTitle: string;
  courseId: string;
  room: string;
  ageRange: string;
  instructor: string;
  capacity: number;
  enrolled: number;
  status: 'Open' | 'Almost Full' | 'Waitlist';
}

export interface Studio {
  id: string;
  name: string;
  headline: string;
  description: string;
  image: string;
  equipment: string[];
  capacity: string;
  safetyTier: string;
}

export interface StudentProject {
  id: string;
  title: string;
  studentName: string;
  studentAge: number;
  program: string;
  description: string;
  toolsUsed: string[];
  recognition: string;
  completionDate: string;
  liveAppUrl?: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  targetAge: string;
  description: string;
  spotsTotal: number;
  spotsLeft: number;
  speaker: string;
  cost: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  relationship: string;
  studentInfo: string;
  programTaken: string;
}

// Catalog data
export const COURSES: Course[] = [
  {
    id: 'robotics-makers-01',
    title: 'Applied Robotics & Embedded IoT',
    tagline: 'Design, solder, wire, and program autonomous rovers and smart sensor modules.',
    category: 'stem-coding',
    categoryLabel: 'STEM & Robotics',
    ageRange: 'Ages 11–15',
    ageTier: 'navigators',
    ageTierLabel: 'Navigators (10–13)',
    cohortSchedule: 'Tuesdays & Thursdays, 4:30 PM – 6:00 PM',
    duration: '12 Weeks',
    sessionHours: '3 hrs / week',
    classSize: 'Max 10 Students',
    maxSeats: 10,
    availableSeats: 3,
    tuition: 0,
    popular: true,
    leadMentor: {
      name: 'Dr. Aris Thorne',
      role: 'Mechatronics Engineer & Robotics Lead',
      avatar: 'AT',
      background: 'Former robotics research fellow; 8 years youth mentoring.',
    },
    highlights: [
      'Microcontroller architecture (ESP32 & Arduino)',
      'CAD 3D modeling and precision 3D printing',
      'Ultrasonic obstacle avoidance & sensor telemetry',
      'End-of-term Autonomous Obstacle Course Tournament',
    ],
    toolsProvided: ['Personal ESP32 Dev Kit', 'Soldering Station Access', '3D Filament Quota', 'Custom Chassis'],
    syllabus: [
      { week: 1, title: 'Circuit Fundamentals & Logic', objective: 'Ohm’s law, breadboarding, and digital input/output.' },
      { week: 4, title: 'CAD Chassis Engineering', objective: 'Parametric modeling in Onshape and 3D printing tolerances.' },
      { week: 8, title: 'Sensor Integration & PWM', objective: 'Calibrating lidar, sonar, and motor drive controllers.' },
      { week: 12, title: 'Grand Rover Challenge & Showcase', objective: 'Autonomous navigation trials judged by community engineers.' },
    ],
    featuredProject: 'Autonomous terrain rover with live sensor telemetry feedback',
    levels: COURSE_CURRICULA['robotics-makers-01'],
  },
  {
    id: 'python-game-ai',
    title: 'Python Architecture & Neural Play',
    tagline: 'From procedural Python syntax to training interactive game algorithms and vision models.',
    category: 'stem-coding',
    categoryLabel: 'Computer Science',
    ageRange: 'Ages 13–18',
    ageTier: 'innovators',
    ageTierLabel: 'Innovators (14–18)',
    cohortSchedule: 'Wednesdays & Fridays, 5:00 PM – 6:30 PM',
    duration: '12 Weeks',
    sessionHours: '3 hrs / week',
    classSize: 'Max 12 Students',
    maxSeats: 12,
    availableSeats: 4,
    tuition: 0,
    popular: true,
    leadMentor: {
      name: 'Sofia Valenzuela',
      role: 'Senior Software Engineer & Youth Instructor',
      avatar: 'SV',
      background: 'Open-source contributor; specialized in creative algorithmic coding.',
    },
    highlights: [
      'Data structures, OOP, and asynchronous programming in Python 3.12',
      'Pygame engine mechanics and 2D physics simulation',
      'Introduction to neural network decision making (reinforcement concepts)',
      'Git version control and collaborative GitHub teamwork',
    ],
    toolsProvided: ['Dedicated High-Spec Workstation', 'Educare Code Cloud Sandbox', 'GitHub Student Suite'],
    syllabus: [
      { week: 1, title: 'Core Python Syntax & Algorithms', objective: 'Clean code, functions, dictionaries, and computational complexity.' },
      { week: 4, title: 'Game Physics & Collision Geometry', objective: 'Frame rate decoupling, vectors, and particle emitters.' },
      { week: 8, title: 'Machine Learning Agent Foundations', objective: 'Building heuristic and Q-learning pathfinding bots.' },
      { week: 12, title: 'Multiplayer Showcase', objective: 'Local networked demonstration and portfolio code review.' },
    ],
    featuredProject: 'Adaptive AI-driven tactical platformer with custom neural enemy bots',
    levels: COURSE_CURRICULA['python-game-ai'],
  },
  {
    id: 'team-grace-web-studio',
    title: 'Team Grace: Full-Stack Web & AI Studio Engineering',
    tagline: 'Learn to design, code, and deploy live production web apps like the Team Grace platform—mastering modern UI, component logic, and Google AI Studio.',
    category: 'stem-coding',
    categoryLabel: 'Web Apps & AI Studio',
    ageRange: 'Ages 12–18',
    ageTier: 'innovators',
    ageTierLabel: 'Innovators (14–18)',
    cohortSchedule: 'Wednesdays, 4:30 PM – 7:00 PM',
    duration: '12 Weeks',
    sessionHours: '2.5 hrs / week',
    classSize: 'Max 10 Students',
    maxSeats: 10,
    availableSeats: 3,
    tuition: 0,
    popular: true,
    liveAppUrl: 'internal-team-grace-app',
    liveAppLabel: 'Open Interactive Team Grace App',
    leadMentor: {
      name: 'Tariq Al-Mansoor',
      role: 'Full-Stack Lead & Cloud Systems Mentor',
      avatar: 'TM',
      background: 'Ex-startup engineering lead; teaches modern web engines and reactive frameworks to youth.',
    },
    highlights: [
      'Modern web application architecture: React, TypeScript, and Tailwind CSS',
      'Deconstructing and building the Team Grace application in Google AI Studio',
      'Reactive state, dynamic sprint boards, and interactive user flows',
      'End-of-term deployment and hosting directly in AI Studio',
    ],
    toolsProvided: ['Dedicated High-Performance Workstation', 'AI Studio Cloud Workspace', 'GitHub Developer Suite'],
    syllabus: [
      { week: 1, title: 'Web Anatomy & Responsive Layouts', objective: 'Structuring semantic markup, typography tokens, and responsive UI foundations.' },
      { week: 4, title: 'Interactive Components & State', objective: 'Dynamic forms, reactive events, state hooks, and client-side navigation.' },
      { week: 8, title: 'Cloud Backend & Data Flow', objective: 'Connecting APIs, managing persistent application data, and user authentication.' },
      { week: 12, title: 'Live App Deployment on AI Studio', objective: 'Publishing production web apps (such as Team Grace) for public showcase.' },
    ],
    featuredProject: 'Interactive Team Grace community web platform running live on AI Studio',
    levels: COURSE_CURRICULA['team-grace-web-studio'],
  },
  {
    id: 'digital-arts-animation',
    title: 'Visual Storytelling & 2D/3D Animation',
    tagline: 'Master digital illustration, concept art, storyboarding, and frame-by-frame motion craft.',
    category: 'arts-media',
    categoryLabel: 'Creative Arts & Media',
    ageRange: 'Ages 10–16',
    ageTier: 'navigators',
    ageTierLabel: 'Navigators (10–13)',
    cohortSchedule: 'Mondays, 4:30 PM – 7:00 PM',
    duration: '12 Weeks',
    sessionHours: '2.5 hrs / week',
    classSize: 'Max 10 Students',
    maxSeats: 10,
    availableSeats: 2,
    tuition: 0,
    leadMentor: {
      name: 'Camila Reyes',
      role: 'Visual Concept Designer & Animator',
      avatar: 'CR',
      background: 'Independent animation director; guest artist at youth media festivals.',
    },
    highlights: [
      'Anatomy, perspective drawing, and dynamic character silhouettes',
      'Wacom Cintiq Pro drawing workflow and color theory',
      '12 Principles of Animation: timing, squash, and arc physics',
      'Audio sync and short film post-production',
    ],
    toolsProvided: ['Wacom Cintiq 24 Pro Tablet', 'Procreate & Blender Suite', 'Individual Stylus Pen Kit'],
    syllabus: [
      { week: 1, title: 'Character Design & Silhouette Math', objective: 'Shape language, expression sheets, and thumbnailing.' },
      { week: 5, title: 'Keyframes, In-betweens & Anticipation', objective: 'Frame-by-frame fluid motion studies.' },
      { week: 9, title: 'Background Painting & Lighting Layers', objective: 'Atmospheric perspective and cinematic color keys.' },
      { week: 12, title: 'Youth Short Film Premiere', objective: 'Curated screening in our auditorium for family and guests.' },
    ],
    featuredProject: 'Original 45-second animated narrative short with scored sound effects',
    levels: COURSE_CURRICULA['digital-arts-animation'],
  },
  {
    id: 'experimental-science-optics',
    title: 'Experimental Chemistry & Laser Optics',
    tagline: 'Safe, hands-on scientific investigation with real laboratory apparatus and spectroscopy.',
    category: 'science-labs',
    categoryLabel: 'Natural Sciences',
    ageRange: 'Ages 12–17',
    ageTier: 'innovators',
    ageTierLabel: 'Innovators (14–18)',
    cohortSchedule: 'Saturdays, 10:00 AM – 1:00 PM',
    duration: '12 Weeks',
    sessionHours: '3 hrs / week',
    classSize: 'Max 8 Students',
    maxSeats: 8,
    availableSeats: 2,
    tuition: 0,
    leadMentor: {
      name: 'Julian Vance, M.Sc.',
      role: 'Biochemist & Laboratory Director',
      avatar: 'JV',
      background: '10+ years laboratory research in environmental analytical spectroscopy.',
    },
    highlights: [
      'Safe laboratory protocol, micro-pipetting, and quantitative titration',
      'Prism dispersion, laser refraction, and wavelength diffraction',
      'Exothermic calorimetry and reaction kinetics analysis',
      'Real research notebook synthesis and scientific poster creation',
    ],
    toolsProvided: ['Personal Lab Coat & Safety Eyewear', 'Spectrophotometer Time', 'Reagents & Glassware Kit'],
    syllabus: [
      { week: 1, title: 'Safety Protocols & Lab Glassware Mastery', objective: 'Precision measurement, error propagation, safety hygiene.' },
      { week: 4, title: 'Chemical Thermodynamics & Kinetics', objective: 'Measuring enthalpy change and catalyst velocity.' },
      { week: 8, title: 'Optics, Lasers & Wave Properties', objective: 'Total internal reflection, Snell’s law, laser spectrometry.' },
      { week: 12, title: 'Poster Symposium & Independent Research', objective: 'Peer review session and scientific presentation.' },
    ],
    featuredProject: 'DIY spectroscope testing local environmental water contaminants',
    levels: COURSE_CURRICULA['experimental-science-optics'],
  },
  {
    id: 'junior-stem-explorers',
    title: 'Junior Makers & Mechanical Discoveries',
    tagline: 'Spark curiosity through pulleys, simple machines, kinetic sculptures, and basic block logic.',
    category: 'stem-coding',
    categoryLabel: 'Junior Explorers',
    ageRange: 'Ages 6–9',
    ageTier: 'explorers',
    ageTierLabel: 'Explorers (6–9)',
    cohortSchedule: 'Saturdays, 9:30 AM – 11:30 AM',
    duration: '10 Weeks',
    sessionHours: '2 hrs / week',
    classSize: 'Max 8 Students',
    maxSeats: 8,
    availableSeats: 3,
    tuition: 0,
    leadMentor: {
      name: 'Nora Lindqvist',
      role: 'Early Childhood STEM Specialist',
      avatar: 'NL',
      background: 'Montessori-trained elementary STEM educator and maker educator.',
    },
    highlights: [
      'Simple machines: gears, cams, levers, and gravitational ramps',
      'Tangible tactile coding using modular physical blocks',
      'Structural bridge strength tests and cardboard prototyping',
      'Team problem-solving and communicative peer presentations',
    ],
    toolsProvided: ['Wooden Mechanical Explorer Kit', 'Modular Logic Tiles', 'Safety Prototyping Tools'],
    syllabus: [
      { week: 1, title: 'Pulleys, Wheels & Mechanical Advantage', objective: 'Lifting heavy weights with smart rope systems.' },
      { week: 4, title: 'Kinetic Marble Mazes & Velocity', objective: 'Energy conservation and trajectory planning.' },
      { week: 7, title: 'Story-Driven Robotic Adventures', objective: 'Mapping routes using physical command tiles.' },
      { week: 10, title: 'Young Inventors Fair', objective: 'Exhibition of student-built mechanical inventions.' },
    ],
    featuredProject: 'Hand-cranked kinetic automaton with moving planetary gears',
    levels: COURSE_CURRICULA['junior-stem-explorers'],
  },
  {
    id: 'debate-leadership-ethics',
    title: 'Youth Parliamentary Debate & Public Discourse',
    tagline: 'Hone rhetorical eloquence, structured argumentation, active listening, and ethical reasoning.',
    category: 'leadership-logic',
    categoryLabel: 'Debate & Leadership',
    ageRange: 'Ages 12–18',
    ageTier: 'innovators',
    ageTierLabel: 'Innovators (14–18)',
    cohortSchedule: 'Thursdays, 5:30 PM – 7:30 PM',
    duration: '12 Weeks',
    sessionHours: '2 hrs / week',
    classSize: 'Max 12 Students',
    maxSeats: 12,
    availableSeats: 5,
    tuition: 0,
    leadMentor: {
      name: 'Alistair Sterling',
      role: 'Debate Coach & Constitutional Fellow',
      avatar: 'AS',
      background: 'National collegiate debate champion and adjudicator for international youth tournaments.',
    },
    highlights: [
      'Parliamentary & Worlds Schools debate motion formatting',
      'Logical fallacy deconstruction and empirical evidence evaluation',
      'Impromptu speaking, cadence control, and poise under cross-examination',
      'Mock Youth United Nations assembly simulation',
    ],
    toolsProvided: ['Debate Research Archive Access', 'Speech Filming & Audio Analysis', 'Tournament Entry Prep'],
    syllabus: [
      { week: 1, title: 'Claims, Warrants, and Evidence Frameworks', objective: 'Structuring arguments with watertight logical chains.' },
      { week: 5, title: 'Cross-Examination & Rebuttal Tactics', objective: 'Dismantling opposition logic and framing core impacts.' },
      { week: 9, title: 'Global Issues & Ethical Dilemmas', objective: 'AI ethics, climate governance, and resource equity debates.' },
      { week: 12, title: 'Educare Youth Parliamentary Showcase', objective: 'Formal tournament debate with visiting guest judges.' },
    ],
    featuredProject: 'Research dossier and position paper on youth civic technology engagement',
    levels: COURSE_CURRICULA['debate-leadership-ethics'],
  },
  {
    id: 'code-rise',
    title: 'Code Rise: Youth Coders',
    tagline: 'Learn to code, build websites, games, and apps through fun, hands-on coding lessons, real project templates, and interactive tutoring.',
    category: 'stem-coding',
    categoryLabel: 'Web Apps & Python',
    ageRange: 'Ages 10–18',
    ageTier: 'innovators',
    ageTierLabel: 'Innovators (14–18)',
    cohortSchedule: 'Mondays & Thursdays, 4:00 PM – 6:00 PM',
    duration: '12 Weeks',
    sessionHours: '3 hrs / week',
    classSize: 'Max 12 Students',
    maxSeats: 12,
    availableSeats: 4,
    tuition: 0,
    popular: true,
    liveAppUrl: 'internal-code-rise',
    liveAppLabel: 'Open Interactive Code Rise App',
    leadMentor: {
      name: 'Emeka Nwosu',
      role: 'Full-Stack Lead & Youth Technology Educator',
      avatar: 'EN',
      background: 'Software engineer & author of practical youth coding curricula.',
    },
    highlights: [
      'HTML5, CSS3, and modern JavaScript web foundations',
      'Commercial website templates: POS shops, food menus & tailor portfolios',
      'Python automation, data cleaning, and web scraping scripts',
      'Upwork freelancing profile setup and international client pitching',
    ],
    toolsProvided: ['Personal Cloud Dev Sandbox', 'Python Playground', 'Live Code Editor', 'Offline Web App'],
    syllabus: [
      { week: 1, title: 'Web Basics & HTML Skeleton', objective: 'Build and style your first responsive web card.' },
      { week: 4, title: 'Interactive JavaScript Functions', objective: 'Create dynamic forms and live price calculators.' },
      { week: 8, title: 'Commercial Project Templates', objective: 'Deploy real business websites with WhatsApp order buttons.' },
      { week: 12, title: 'Python Automation & Upwork Dollar Agency', objective: 'Launch your remote freelance profile and client pipeline.' },
    ],
    featuredProject: 'Full-featured commercial web portfolio with automated WhatsApp ordering and Python data tool',
    levels: COURSE_CURRICULA['code-rise'],
  },
  {
    id: 'advert-clinic',
    title: 'Advert Clinic — Where Youth Businesses Expand and Grow',
    tagline: 'The interactive advertising studio & growth clinic where young entrepreneurs design viral ads, diagnose copy, and scale revenue.',
    category: 'leadership-logic',
    categoryLabel: 'Marketing & Business',
    ageRange: 'Ages 12–18',
    ageTier: 'innovators',
    ageTierLabel: 'Innovators (14–18)',
    cohortSchedule: 'Tuesdays, 4:30 PM – 7:00 PM',
    duration: '12 Weeks',
    sessionHours: '2.5 hrs / week',
    classSize: 'Max 10 Students',
    maxSeats: 10,
    availableSeats: 3,
    tuition: 0,
    popular: true,
    liveAppUrl: 'internal-advert-clinic',
    liveAppLabel: 'Open Interactive Advert Clinic App',
    leadMentor: {
      name: 'Zara Adebayo',
      role: 'Creative Director & Growth Strategist',
      avatar: 'ZA',
      background: 'Ad agency creative lead; has scaled over 40 youth business campaigns.',
    },
    highlights: [
      'AIDA advertising psychology and thumb-stopping visual hooks',
      'Interactive campaign builder: flyers, social carousels & video scripts',
      'Copywriting Diagnostic Clinic with real-time conversion scoring',
      'Budget & ROI growth simulator with live customer acquisition metrics',
    ],
    toolsProvided: ['Ad Creative Studio', 'Headline Tester Engine', 'Growth Calculator', 'Ad Image Exporter'],
    syllabus: [
      { week: 1, title: 'Attention & Viral Hook Psychology', objective: 'Craft scroll-stopping headlines with high conversion scores.' },
      { week: 4, title: 'Visual Ad Creative & Flyer Design', objective: 'Design high-converting flyers and Instagram carousel ads.' },
      { week: 8, title: 'WhatsApp Commerce & Video Reels', objective: 'Set up automated WhatsApp catalogs and viral TikTok scripts.' },
      { week: 12, title: 'Paid Ad Scaling & Agency Management', objective: 'Launch paid Meta ad campaigns with positive net ROI.' },
    ],
    featuredProject: 'Multi-channel promotional ad campaign generating over $400 in documented youth sales',
    levels: COURSE_CURRICULA['advert-clinic'],
  },
  {
    id: 'robo-mech',
    title: 'Robo Mech — Where Youths Learn a Skill',
    tagline: 'Comprehensive robotics and mechatronics across Beginners, Intermediate, and Pro tracks with 150 lessons and a voice AI tutor that talks aloud.',
    category: 'stem-coding',
    categoryLabel: 'Robotics & Mechatronics',
    ageRange: 'Ages 8–18+',
    ageTier: 'innovators',
    ageTierLabel: 'All Tiers (8–18)',
    cohortSchedule: 'Saturdays, 10:00 AM – 2:00 PM',
    duration: '12 Weeks',
    sessionHours: '4 hrs / week',
    classSize: 'Max 12 Students',
    maxSeats: 12,
    availableSeats: 2,
    tuition: 0,
    popular: true,
    liveAppUrl: 'internal-robo-mech',
    liveAppLabel: 'Open Interactive Robo Mech App',
    leadMentor: {
      name: 'Dr. Aris Thorne & RoboTutor AI',
      role: 'Mechatronics Lead & Voice AI Robotics Faculty',
      avatar: 'RM',
      background: 'Mechatronics research fellow & creator of the Robo Mech voice AI tutoring engine.',
    },
    highlights: [
      'Beginners, Intermediate, and Pro tracks: 15 levels, 150 lessons total',
      'Voice AI Tutor ("RoboTutor") that speaks lesson explanations out loud',
      'Electronics, H-Bridges, BLDC motors, FOC, and differential kinematics',
      'Embedded Linux, ROS 2 nodes, SLAM, Nav2, and 6-axis MoveIt manipulation',
    ],
    toolsProvided: ['Interactive Simulation Bench', 'Voice AI Tutor Engine', 'ESP32 & Raspberry Pi Lab', 'LIDAR Rover'],
    syllabus: [
      { week: 1, title: 'Circuits, Microcontrollers & PWM Motors', objective: 'Build working H-bridge motor circuits and read sensors.' },
      { week: 4, title: 'CAD Mechanical Design & Brushless FOC', objective: 'Model 3D linkages and tune Field Oriented Control.' },
      { week: 8, title: 'Kinematics Math & Native ROS 2 Nodes', objective: 'Calculate Inverse Kinematics and control robots over ROS 2 topics.' },
      { week: 12, title: 'SLAM Mapping, Nav2 & Autonomous Rover', objective: 'Deploy autonomous navigation and 6-axis manipulator cells.' },
    ],
    featuredProject: 'Complete autonomous rover and 3-DOF robotic arm with talking voice AI telemetry',
    levels: COURSE_CURRICULA['robo-mech'],
  },
  {
    id: 'bible-quiz',
    title: 'Bible Quiz — Where Youths Get Knowledge of the Bible',
    tagline: 'An inspirational scripture app covering the Old Testament through the New Testament with interactive quizzes, real printable certificates, progress tracking, and a 7-day study timetable.',
    category: 'leadership-logic',
    categoryLabel: 'Scripture & Moral Wisdom',
    ageRange: 'All Ages (Youth & Families)',
    ageTier: 'innovators',
    ageTierLabel: 'All Youth Tiers',
    cohortSchedule: 'Sundays & Daily Reading, 9:00 AM – 11:30 AM',
    duration: '12 Weeks',
    sessionHours: '3 hrs / week',
    classSize: 'Open Youth Assembly',
    maxSeats: 30,
    availableSeats: 12,
    tuition: 0,
    popular: true,
    liveAppUrl: 'internal-bible-quiz',
    liveAppLabel: 'Open Interactive Bible Quiz App',
    leadMentor: {
      name: 'Pastor David O. & Bible Faculty',
      role: 'Dean of Biblical Studies & Youth Ministry',
      avatar: 'BQ',
      background: 'Theologian, youth mentor & educator dedicated to biblical literacy from Genesis to Revelation.',
    },
    highlights: [
      'Comprehensive Old Testament (Law, History, Wisdom, Prophets) & New Testament (Gospels, Acts, Epistles, Revelation)',
      'Real canvas-rendered Certificate of Scripture Mastery for every completed quiz',
      'Download diploma as high-res PNG & 1-click dispatch to your Gmail account',
      '7-day structured Bible reading timetable with daily memory verses and practical actions',
      '100% offline access with persistent progress tracking on phone and computer',
    ],
    toolsProvided: ['Scripture Quiz Engine', '7-Day Reading Timetable', 'Canvas Diploma Generator', 'Offline Bible App'],
    syllabus: [
      { week: 1, title: 'The Pentateuch & Creation Covenants', objective: 'Master Genesis, Exodus, and the Ten Commandments.' },
      { week: 4, title: 'Kingdom History & David’s Heart of Worship', objective: 'Study the conquest, heroic judges, and King David.' },
      { week: 8, title: 'The Gospels: The Life & Cross of Jesus', objective: 'Understand the parables, miracles, and resurrection.' },
      { week: 12, title: 'Acts, The Armor of God & New Jerusalem', objective: 'Experience Pentecost, apostolic faith, and eternal hope.' },
    ],
    featuredProject: 'Grand Scripture Scholar Portfolio with complete Old & New Testament certifications',
    levels: COURSE_CURRICULA['bible-quiz'],
  },
];

// Timetable schedule
export const TIMETABLE_SLOTS: TimetableSlot[] = [
  { id: 'tt-1', day: 'Monday', time: '4:30 PM – 7:00 PM', courseTitle: 'Visual Storytelling & 2D/3D Animation', courseId: 'digital-arts-animation', room: 'Creative Media Suite', ageRange: 'Ages 10–16', instructor: 'Camila Reyes', capacity: 10, enrolled: 8, status: 'Almost Full' },
  { id: 'tt-2', day: 'Monday', time: '5:30 PM – 7:00 PM', courseTitle: 'Math Explorers & Geometric Logic', courseId: 'junior-stem-explorers', room: 'Logic Hall A', ageRange: 'Ages 8–11', instructor: 'Nora Lindqvist', capacity: 10, enrolled: 6, status: 'Open' },
  { id: 'tt-3', day: 'Tuesday', time: '4:30 PM – 6:00 PM', courseTitle: 'Applied Robotics & Embedded IoT', courseId: 'robotics-makers-01', room: 'Robotics & Maker Lab', ageRange: 'Ages 11–15', instructor: 'Dr. Aris Thorne', capacity: 10, enrolled: 7, status: 'Open' },
  { id: 'tt-4', day: 'Tuesday', time: '6:15 PM – 7:45 PM', courseTitle: 'Youth Sound Design & Electronic Music', courseId: 'digital-arts-animation', room: 'Audio Lab 2', ageRange: 'Ages 12–17', instructor: 'Camila Reyes', capacity: 8, enrolled: 7, status: 'Almost Full' },
  { id: 'tt-5', day: 'Wednesday', time: '5:00 PM – 6:30 PM', courseTitle: 'Python Architecture & Neural Play', courseId: 'python-game-ai', room: 'Computation Studio', ageRange: 'Ages 13–18', instructor: 'Sofia Valenzuela', capacity: 12, enrolled: 8, status: 'Open' },
  { id: 'tt-12', day: 'Wednesday', time: '4:30 PM – 7:00 PM', courseTitle: 'Team Grace: Full-Stack Web & App Engineering', courseId: 'team-grace-web-studio', room: 'Computation Studio', ageRange: 'Ages 12–18', instructor: 'Tariq Al-Mansoor', capacity: 10, enrolled: 7, status: 'Open' },
  { id: 'tt-6', day: 'Thursday', time: '4:30 PM – 6:00 PM', courseTitle: 'Applied Robotics & Embedded IoT', courseId: 'robotics-makers-01', room: 'Robotics & Maker Lab', ageRange: 'Ages 11–15', instructor: 'Dr. Aris Thorne', capacity: 10, enrolled: 7, status: 'Open' },
  { id: 'tt-7', day: 'Thursday', time: '5:30 PM – 7:30 PM', courseTitle: 'Youth Parliamentary Debate & Public Discourse', courseId: 'debate-leadership-ethics', room: 'Seminar Arena', ageRange: 'Ages 12–18', instructor: 'Alistair Sterling', capacity: 12, enrolled: 7, status: 'Open' },
  { id: 'tt-8', day: 'Friday', time: '5:00 PM – 6:30 PM', courseTitle: 'Python Architecture & Neural Play', courseId: 'python-game-ai', room: 'Computation Studio', ageRange: 'Ages 13–18', instructor: 'Sofia Valenzuela', capacity: 12, enrolled: 8, status: 'Open' },
  { id: 'tt-9', day: 'Saturday', time: '9:30 AM – 11:30 AM', courseTitle: 'Junior Makers & Mechanical Discoveries', courseId: 'junior-stem-explorers', room: 'Discovery Studio', ageRange: 'Ages 6–9', instructor: 'Nora Lindqvist', capacity: 8, enrolled: 5, status: 'Open' },
  { id: 'tt-10', day: 'Saturday', time: '10:00 AM – 1:00 PM', courseTitle: 'Experimental Chemistry & Laser Optics', courseId: 'experimental-science-optics', room: 'Science & Optics Lab', ageRange: 'Ages 12–17', instructor: 'Julian Vance', capacity: 8, enrolled: 6, status: 'Almost Full' },
  { id: 'tt-11', day: 'Saturday', time: '2:00 PM – 4:30 PM', courseTitle: 'Open Youth Project Incubator & Hack Lab', courseId: 'robotics-makers-01', room: 'Robotics & Maker Lab', ageRange: 'All Ages 10+', instructor: 'Faculty Team', capacity: 16, enrolled: 14, status: 'Almost Full' },
];

// Studios
export const STUDIOS: Studio[] = [
  {
    id: 'studio-maker-lab',
    name: 'The Robotics & Hardware Maker Lab',
    headline: 'Where physical electronics meet precision prototyping.',
    description: 'Equipped with eight temperature-controlled soldering benches, four dual-extruder 3D printers, laser cutters, oscilloscope testing equipment, and full component bins.',
    image: '/src/assets/images/studio_maker_lab_1792701236747.jpg',
    equipment: ['4x Prusa MK4 3D Printers', 'Glowforge Pro Laser Cutter', 'Rigol Digital Oscilloscopes', '8x Hakko ESD Soldering Benches'],
    capacity: '12 Students max',
    safetyTier: 'Level 2 Lab Safety Certification Required',
  },
  {
    id: 'studio-creative-arts',
    name: 'Digital Arts & Media Suite',
    headline: 'State-of-the-art visual computing for youth creators.',
    description: 'Featuring 24-inch Wacom Cintiq displays, color-calibrated 4K monitors, ergonomic workstations, and industry-standard creative software for 2D, 3D, and audio rendering.',
    image: '/src/assets/images/creative_arts_youth_1792701237882.jpg',
    equipment: ['12x Wacom Cintiq Pro 24"', 'Mac Studio M2 Workstations', 'Shure SM7B Vocal Microphones', 'Color-Calibrated IPS Screens'],
    capacity: '12 Students max',
    safetyTier: 'Ergonomic & Screen-Rest Health Monitored',
  },
  {
    id: 'studio-science-optics',
    name: 'Discovery Science & Optics Lab',
    headline: 'Rigorous empirical science with professional research-grade instruments.',
    description: 'Designed for safe, hands-on inquiry with certified chemical fume hoods, UV-Vis spectrophotometers, laser optics rails, and precision analytical balances.',
    image: '/src/assets/images/student_science_experiment_1792701237704.jpg',
    equipment: ['Laminar Flow Fume Hood', 'UV-Vis Spectrophotometer', 'Laser Interferometer Rails', 'Compound Microscope Stations (1000x)'],
    capacity: '10 Students max',
    safetyTier: 'OSHA & Youth Eyewear Safety Mandated',
  },
];

// Student Projects
export const STUDENT_PROJECTS: StudentProject[] = [
  {
    id: 'proj-team-grace',
    title: 'Team Grace: Interactive Community & Youth App',
    studentName: 'Youth Cohort Alpha',
    studentAge: 15,
    program: 'Full-Stack Web & AI Studio Engineering',
    description: 'A live-deployed web application for collaborative youth teams built in Google AI Studio, featuring responsive UI architecture, event scheduling, sprint boards, and team directories.',
    toolsUsed: ['React', 'TypeScript', 'Tailwind CSS', 'Google AI Studio Engine', 'Interactive Applet'],
    recognition: 'Live AI Studio Youth App Case Study',
    completionDate: 'April 2026',
    liveAppUrl: 'internal-team-grace-app',
  },
  {
    id: 'proj-1',
    title: 'AquaSense: IoT Water Purity Sentinel',
    studentName: 'Maya K.',
    studentAge: 15,
    program: 'Applied Robotics & Embedded IoT',
    description: 'A floating solar-powered water probe measuring turbidity, pH, and dissolved oxygen in local urban ponds, transmitting live telemetry via LoRaWAN to a public web dashboard.',
    toolsUsed: ['ESP32', 'LoRaWAN', '3D Printed Buoy', 'Python Data API'],
    recognition: '1st Place, Regional Youth Environmental Tech Challenge 2025',
    completionDate: 'November 2025',
  },
  {
    id: 'proj-2',
    title: 'Aura of the Canopy: Animated Short',
    studentName: 'Leo & Saffron',
    studentAge: 14,
    program: 'Visual Storytelling & 2D/3D Animation',
    description: 'A hand-drawn 2D animated film depicting an ancient forest spirit adapting to encroaching urban infrastructure, exploring climate empathy and environmental ethics.',
    toolsUsed: ['Wacom Cintiq', 'Procreate Dreams', 'Blender', 'Audacity'],
    recognition: 'Official Selection, International Youth Film Festival 2025',
    completionDate: 'January 2026',
  },
  {
    id: 'proj-3',
    title: 'SolarTrack: Dual-Axis Micro-Array',
    studentName: 'Julian H. & Tariq M.',
    studentAge: 16,
    program: 'Applied Robotics & Clean Energy',
    description: 'An algorithm-driven dual-axis solar collector that follows the sun using photoresistors and stepper motors, boosting micro-panel energy yield by 31%.',
    toolsUsed: ['Arduino Nano', 'NEMA 17 Steppers', 'Cad Prototyping', 'C++'],
    recognition: 'Excellence in Engineering Award, State Science Exposition',
    completionDate: 'February 2026',
  },
  {
    id: 'proj-4',
    title: 'CivicYouth: Parliamentary Policy Proposal',
    studentName: 'Sophie T.',
    studentAge: 14,
    program: 'Youth Parliamentary Debate',
    description: 'A comprehensive 24-page policy analysis examining equitable digital device access for rural middle school districts, presented to the municipal education council.',
    toolsUsed: ['Empirical Literature Analysis', 'Parliamentary Briefing Format'],
    recognition: 'Best Delegate & Youth Citizen Commendation',
    completionDate: 'March 2026',
  },
];

// Community Events
export const COMMUNITY_EVENTS: CommunityEvent[] = [
  {
    id: 'event-1',
    title: 'Spring Youth Hackathon & Maker Sprint',
    date: 'Saturday, May 16, 2026',
    time: '10:00 AM – 4:00 PM',
    location: 'Educare Main Innovation Hall',
    targetAge: 'Ages 10–18',
    description: 'A fast-paced, collaborative 6-hour hackathon where youth teams design hardware or software solutions addressing local community sustainability.',
    spotsTotal: 40,
    spotsLeft: 9,
    speaker: 'Mentored by Educare Faculty & Visiting Tech Engineers',
    cost: 'Free Admission (Lunch & Materials Provided)',
  },
  {
    id: 'event-2',
    title: 'Open Science Lab: The Physics of Superconductivity',
    date: 'Wednesday, May 27, 2026',
    time: '5:30 PM – 7:00 PM',
    location: 'Discovery Science & Optics Lab',
    targetAge: 'Ages 12–18 & Parents',
    description: 'Live cryogenic demonstration with liquid nitrogen and magnetic levitation, followed by an interactive discussion on high-efficiency electrical grids.',
    spotsTotal: 25,
    spotsLeft: 6,
    speaker: 'Julian Vance & Visiting University Physics Fellow',
    cost: 'Free Admission',
  },
  {
    id: 'event-3',
    title: 'Parent & Youth Seminar: Navigating Future STEM Careers',
    date: 'Saturday, June 6, 2026',
    time: '11:00 AM – 12:30 PM',
    location: 'Seminar Arena & Virtual Stream',
    targetAge: 'Parents of Youth Ages 10–18',
    description: 'Demystifying university admissions, project-based portfolios, and fostering deep critical thinking skills beyond standardized rote tests.',
    spotsTotal: 60,
    spotsLeft: 18,
    speaker: 'Educare Academic Directors & University Admissions Advisors',
    cost: 'Free Admission',
  },
];

// Testimonials
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote: 'Maya joined Educare hesitant about coding and physics. After two terms in Navigators Robotics, she captained her middle school team to regional finals. The 1:8 mentor ratio and hands-on lab time made all the difference.',
    author: 'Elena Rostova',
    relationship: 'Parent of Maya',
    studentInfo: 'Age 13 · 3rd Term Student',
    programTaken: 'Applied Robotics & Python',
  },
  {
    id: 'test-2',
    quote: 'In ordinary school, science was memorizing diagrams for tests. At Educare, we actually synthesized compounds and aligned lasers on optical rails. It clarified what I want to study in university.',
    author: 'Marcus Chen',
    relationship: 'Student',
    studentInfo: 'Age 17 · High School Senior',
    programTaken: 'Experimental Chemistry & Laser Optics',
  },
  {
    id: 'test-3',
    quote: 'The balance between creative freedom and structured technical discipline is unmatched. My son built an actual playable game engine and gained immense confidence in problem-solving.',
    author: 'David O’Connell',
    relationship: 'Parent of Liam',
    studentInfo: 'Age 11 · 2nd Term Student',
    programTaken: 'Python Architecture & Game Design',
  },
];

// Pathway Finder Questions
export interface PathwayQuestion {
  id: string;
  question: string;
  helper: string;
  options: {
    id: string;
    label: string;
    description: string;
    tag: string;
  }[];
}

export const PATHWAY_QUESTIONS: PathwayQuestion[] = [
  {
    id: 'age',
    question: 'What is the student’s current age group?',
    helper: 'Our curricula are strictly tailored to developmental cognitive stages.',
    options: [
      { id: 'opt-age-1', label: 'Ages 6 to 9', description: 'Early exploration, sensory mechanics, and visual storytelling.', tag: 'explorers' },
      { id: 'opt-age-2', label: 'Ages 10 to 13', description: 'Logic foundations, coding, robotics, and creative digital arts.', tag: 'navigators' },
      { id: 'opt-age-3', label: 'Ages 14 to 18', description: 'Advanced computational engineering, lab research, and debate.', tag: 'innovators' },
    ],
  },
  {
    id: 'interest',
    question: 'What activity naturally captures their focus at home?',
    helper: 'We connect their natural curiosities with real technical mastery.',
    options: [
      { id: 'opt-int-1', label: 'Tinkering, building machines & coding', description: 'Loves taking things apart, building hardware, video games.', tag: 'stem-coding' },
      { id: 'opt-int-2', label: 'Drawing, storytelling & visual creations', description: 'Spends hours sketching, designing characters, video editing.', tag: 'arts-media' },
      { id: 'opt-int-3', label: 'Science experiments & how nature works', description: 'Asks big questions about chemistry, space, and biology.', tag: 'science-labs' },
      { id: 'opt-int-4', label: 'Debating, logic puzzles & leadership', description: 'Strong opinions, loves strategic board games, natural orator.', tag: 'leadership-logic' },
    ],
  },
  {
    id: 'goal',
    question: 'What is the primary objective for joining Educare?',
    helper: 'Helps us recommend the best cohort pacing and mentorship track.',
    options: [
      { id: 'opt-goal-1', label: 'Build tangible portfolio projects', description: 'Create working hardware or software to showcase and enter competitions.', tag: 'portfolio' },
      { id: 'opt-goal-2', label: 'Discover a genuine lifelong passion', description: 'Explore multiple disciplines with hands-on joy without exam pressure.', tag: 'discovery' },
      { id: 'opt-goal-3', label: 'Gain an academic & future career edge', description: 'Master rigorous problem solving for top high school & university paths.', tag: 'academic' },
    ],
  },
];
