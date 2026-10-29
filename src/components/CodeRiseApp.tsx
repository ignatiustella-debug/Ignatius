import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Sparkles,
  Code2,
  Terminal,
  Play,
  CheckCircle2,
  Lock,
  Award,
  Volume2,
  VolumeX,
  Download,
  Share2,
  ExternalLink,
  Laptop,
  Check,
  Smartphone,
  Eye,
  RefreshCw,
} from 'lucide-react';
import { EducareUser } from '../types/auth';
import { CertificateModal } from './CertificateModal';
import { UniversalAITutor } from './UniversalAITutor';

interface CodeRiseAppProps {
  onBackToEducare: () => void;
  currentUser?: EducareUser | null;
  onSignOut?: () => void;
}

interface CodeRiseLesson {
  id: string;
  level: 1 | 2 | 3;
  title: string;
  objective: string;
  explanation: string;
  points: string[];
  code?: string;
  python?: string;
  quiz?: {
    question: string;
    options: string[];
    answer: number;
  };
  sellTo?: string;
  price?: string;
  template?: string;
  templateName?: string;
}

const CODERISE_LESSONS: CodeRiseLesson[] = [
  // LEVEL 1: WEB BASICS
  {
    id: '1',
    level: 1,
    title: 'What is Coding? Your Ticket Out',
    objective: 'Understand why coding can build freedom and income.',
    explanation:
      'Coding is how you tell a computer what to do, just like giving someone clear step-by-step instructions. If you master it, international companies and local business owners pay you for your digital creations.',
    points: [
      'A computer is not smart on its own. It only does what your code directs it to do.',
      'Coding is a universal language spoken across every country and continent.',
      'With basic web skills, you can build websites for shops, salons, and offices and charge for your work.',
    ],
    quiz: {
      question: 'What is computer coding fundamentally?',
      options: ['Giving precise instructions to a computer', 'Just browsing social media', 'Fixing physical wiring only'],
      answer: 0,
    },
  },
  {
    id: '2',
    level: 1,
    title: 'How the Internet & Websites Work',
    objective: 'How a website travels from your screen to the entire world.',
    explanation:
      'When you visit a website, your browser asks a server (a computer connected to the web 24/7) for files. Frontend is what you see (HTML, CSS, JS), and Backend is the brain that stores data.',
    points: [
      'Frontend = The visible layout, buttons, and animations.',
      'Backend = The database, user accounts, and security logic.',
      'We start by mastering Frontend so you can build visible pages immediately.',
    ],
    quiz: {
      question: 'Which part of a website does the visitor directly interact with?',
      options: ['The Frontend', 'The Server Database only', 'The Fiber Optic Cable'],
      answer: 0,
    },
  },
  {
    id: '3',
    level: 1,
    title: 'HTML — The Skeleton of Every Website',
    objective: 'Write your first real webpage markup.',
    explanation:
      'HTML (HyperText Markup Language) is the skeleton, like the blocks used to build a house. Without it, the house cannot stand.',
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #fffbeb; padding: 20px; }
    h1 { color: #ea580c; }
    p { font-size: 16px; color: #4b5563; }
    button { background: #ea580c; color: white; padding: 10px 18px; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; }
  </style>
</head>
<body>
  <h1>Hello from Youth Coders!</h1>
  <p>I am learning to build high-income web apps with Code Rise inside Educare.</p>
  <button onclick="alert('Hello world! You just clicked a live JavaScript button.')">Hire Me Now</button>
</body>
</html>`,
    points: [
      '<h1> to <h6> tags are for big headings.',
      '<p> tags are for paragraphs of text.',
      '<button> tags create clickable interactive actions.',
    ],
    quiz: {
      question: 'Which HTML tag creates a paragraph of body text?',
      options: ['<p>', '<h1>', '<button>'],
      answer: 0,
    },
  },
  {
    id: '4',
    level: 1,
    title: 'CSS — Make Your Code Beautiful',
    objective: 'Add responsive color, typography, and card layouts.',
    explanation:
      'If HTML is the skeleton, CSS is the skin, clothes, and paint. CSS is the reason some websites look like billion-dollar tech products while others look plain.',
    code: `<div style="background: linear-gradient(135deg, #18181b, #27272a); color: white; padding: 24px; border-radius: 16px; max-width: 320px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); font-family: sans-serif;">
  <span style="background: #f97316; color: white; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase;">Verified Youth Dev</span>
  <h2 style="margin-top: 12px; font-size: 20px; font-weight: bold;">Creative Web Studio</h2>
  <p style="color: #a1a1aa; font-size: 13px; line-height: 1.5;">Building mobile websites, WhatsApp order buttons, and modern online stores.</p>
  <button style="width: 100%; margin-top: 12px; background: #22c55e; color: black; border: none; padding: 10px; border-radius: 8px; font-weight: bold; cursor: pointer;">Chat on WhatsApp</button>
</div>`,
    points: [
      'Use background gradients and rounded corners (border-radius) for modern cards.',
      'Padding gives content breathing room so it looks premium.',
      'High contrast text makes pages legible on any mobile phone screen.',
    ],
    quiz: {
      question: 'What does CSS control on a website?',
      options: ['Visual style, layout, and colors', 'Computer CPU clock speed', 'Internet router cables'],
      answer: 0,
    },
  },
  {
    id: '5',
    level: 1,
    title: 'JavaScript — Make Websites Respond',
    objective: 'Add dynamic logic and live calculations.',
    explanation:
      'JavaScript is the interactive engine. It runs functions, calculates totals, toggles themes, and communicates with cloud APIs.',
    code: `<div style="font-family: sans-serif; background: #f4f4f5; padding: 20px; border-radius: 12px;">
  <h3>Quick Website Price Calculator</h3>
  <label style="font-size: 13px;">Select number of pages:</label>
  <select id="pages" onchange="calc()" style="padding: 6px; border-radius: 6px; margin-left: 8px;">
    <option value="1">1 Page Landing Site ($40)</option>
    <option value="3">3 Page Business Site ($90)</option>
    <option value="5">5 Page Full Store ($150)</option>
  </select>
  <div id="result" style="margin-top: 14px; font-weight: bold; color: #ea580c; font-size: 18px;">Total: $40</div>
</div>
<script>
  function calc() {
    const val = document.getElementById('pages').value;
    const prices = { '1': '$40', '3': '$90', '5': '$150' };
    document.getElementById('result').innerText = 'Total Quote: ' + prices[val];
  }
</script>`,
    points: [
      'Functions bundle reusable code actions.',
      'Events like onclick and onchange trigger code when users click or type.',
      'DOM manipulation allows JavaScript to update text and HTML on the fly.',
    ],
    quiz: {
      question: 'Which language makes website buttons interactive?',
      options: ['JavaScript', 'HTML only', 'SVG only'],
      answer: 0,
    },
  },

  // LEVEL 2: BUILD & SELL
  {
    id: '6',
    level: 2,
    title: 'The Small Business Website Formula',
    objective: 'The 4 essential sections every business site must have.',
    explanation:
      'Every local business—from barber shops to food catering—needs 4 core sections: Hero, Services, Proof/Reviews, and a 1-tap WhatsApp Call to Action.',
    sellTo: 'Hair salons, barbershops, and beauty studios',
    price: '$50 – $120',
    templateName: 'Hair & Beauty Studio',
    template: `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; background: #fff5f5; color: #1c1917; }
    header { background: #be123c; color: white; padding: 36px 16px; text-align: center; }
    .content { padding: 20px; max-width: 500px; margin: auto; }
    .card { background: white; padding: 16px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.06); margin-bottom: 14px; }
    .btn { display: block; text-align: center; background: #22c55e; color: white; padding: 14px; border-radius: 30px; text-decoration: none; font-weight: bold; margin-top: 16px; }
  </style>
</head>
<body>
  <header>
    <h1 style="margin:0;">Luxe Hair & Braids Studio</h1>
    <p style="margin:6px 0 0; opacity:0.9;">Professional Braiding, Styling & Wash</p>
  </header>
  <div class="content">
    <div class="card">
      <h3 style="margin-top:0;">Our Popular Services</h3>
      <p>• Knotless Braids — $35</p>
      <p>• Retouch & Treatment — $20</p>
      <p>• Men & Boys Fade Styling — $15</p>
    </div>
    <div class="card">
      <h3 style="margin-top:0;">Client Testimonial</h3>
      <p style="font-style:italic;">"Best braiding studio in town! Fast, neat, and very welcoming." — Grace O.</p>
    </div>
    <a href="https://wa.me/1234567890" class="btn">Book via WhatsApp Now</a>
  </div>
</body>
</html>`,
    points: [
      'Hero: Clear business name + what you do in one sentence.',
      'Services & Prices: Customers want to see prices before calling.',
      'Call to Action: Direct link to WhatsApp or Phone.',
    ],
  },
  {
    id: '7',
    level: 2,
    title: 'Project 1 — POS & Retail Store Website',
    objective: 'Build a lightweight site for local grocery and retail stores.',
    explanation:
      'Local stores and services miss out on nearby customers searching on Google Maps. This site gives them quick visibility and an open/closed status.',
    sellTo: 'Local grocery marts, POS points, and pharmacies',
    price: '$40 – $90',
    templateName: 'Express Grocery & POS',
    template: `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; background: #f0fdf4; color: #14532d; }
    .wrap { max-width: 460px; margin: 20px auto; padding: 20px; background: white; border-radius: 16px; border: 2px solid #22c55e; text-align: center; }
    .status { display: inline-block; padding: 6px 14px; background: #dcfce7; color: #15803d; border-radius: 20px; font-weight: bold; font-size: 13px; }
    ul { text-align: left; padding-left: 20px; line-height: 1.8; }
    .btn { display: block; background: #15803d; color: white; padding: 12px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 14px; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="status">● OPEN NOW — 24/7 Service</div>
    <h2 style="margin: 12px 0 4px;">Express Retail & POS Hub</h2>
    <p style="color: #65a30d; font-size: 13px;">Fast Withdrawals, Transfers, Groceries & Airtime</p>
    <ul>
      <li>Instant Cash Out & Bank Transfers</li>
      <li>Cold Drinks, Snacks & Essentials</li>
      <li>Power & Cable TV Bill Payments</li>
    </ul>
    <a href="https://wa.me/1234567890" class="btn">Order Delivery or Check Cash</a>
  </div>
</body>
</html>`,
    points: [
      'Fast loading without heavy dependencies.',
      'Live status indicator reassures walk-in customers.',
      'Easy to customize with client logo and address.',
    ],
  },
  {
    id: '8',
    level: 2,
    title: 'Project 2 — Restaurant & Food Menu App',
    objective: 'Build a mobile menu where patrons order with 1 tap.',
    explanation:
      'Food vendors and bakeries lose money when customers wait on crowded phone lines. An online visual menu with WhatsApp ordering closes orders in seconds.',
    sellTo: 'Bakeries, burger joints, food trucks, and meal preppers',
    price: '$60 – $150',
    templateName: 'Bistro Fast Menu',
    template: `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; background: #fafaf9; }
    header { background: #ea580c; color: white; padding: 24px; text-align: center; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 16px; max-width: 500px; margin: auto; }
    .item { background: white; border-radius: 12px; padding: 12px; text-align: center; box-shadow: 0 2px 6px rgba(0,0,0,0.06); }
    .price { font-weight: bold; color: #ea580c; margin: 6px 0; }
    button { background: #22c55e; color: white; border: none; padding: 8px 12px; border-radius: 6px; font-weight: bold; cursor: pointer; width: 100%; font-size: 12px; }
  </style>
</head>
<body>
  <header>
    <h1 style="margin:0; font-size: 22px;">Spice Bistro & Grill</h1>
    <p style="margin:4px 0 0; opacity:0.9; font-size: 13px;">Fresh food delivered warm to your doorstep</p>
  </header>
  <div class="grid">
    <div class="item">
      <div style="font-size: 32px;">🍗</div>
      <h4 style="margin:4px 0;">Crispy Wings</h4>
      <div class="price">$12.00</div>
      <button onclick="order('Crispy Wings ($12)')">Order</button>
    </div>
    <div class="item">
      <div style="font-size: 32px;">🍔</div>
      <h4 style="margin:4px 0;">Smash Burger</h4>
      <div class="price">$9.50</div>
      <button onclick="order('Smash Burger ($9.50)')">Order</button>
    </div>
    <div class="item">
      <div style="font-size: 32px;">🥗</div>
      <h4 style="margin:4px 0;">Greek Salad</h4>
      <div class="price">$7.00</div>
      <button onclick="order('Greek Salad ($7)')">Order</button>
    </div>
    <div class="item">
      <div style="font-size: 32px;">🥤</div>
      <h4 style="margin:4px 0;">Berry Cooler</h4>
      <div class="price">$3.50</div>
      <button onclick="order('Berry Cooler ($3.50)')">Order</button>
    </div>
  </div>
  <script>
    function order(dish) {
      window.open('https://wa.me/1234567890?text=' + encodeURIComponent('Hello! I want to order: ' + dish));
    }
  </script>
</body>
</html>`,
    points: [
      'CSS Grid creates an app-like card layout on mobile.',
      '1-click action triggers WhatsApp with the dish pre-filled in message text.',
      'No complicated backend checkout required for small local vendors.',
    ],
  },
  {
    id: '9',
    level: 2,
    title: 'Project 3 — Tailor & Fashion Portfolio',
    objective: 'Build a fashion gallery with photo lightbox and booking form.',
    explanation:
      'Fashion designers often only have scattered social media posts. A clean boutique website allows them to charge higher prices for custom garments.',
    sellTo: 'Fashion designers, custom tailors, and garment makers',
    price: '$80 – $200',
    templateName: 'Atelier Couture Portfolio',
    points: [
      'Photo gallery showcasing 6 bespoke outfits with pricing.',
      'Interactive lightbox preview on image tap.',
      'Measurement booking form linking straight to the designer.',
    ],
  },
  {
    id: '10',
    level: 2,
    title: 'How to Get Your First Paying Client',
    objective: 'Turn your coding skills into sustainable income.',
    explanation:
      'Writing code is only half the equation. Pitching businesses with a pre-built demo website is how you win real contracts.',
    points: [
      'Pre-build the website first with their business name and logo, then show them: "I built this for your store—if you love it, you can keep it for $50."',
      'Provide hosting for free on Vercel, Netlify, or AI Studio.',
      'Always collect a 50% deposit before writing custom code.',
    ],
  },

  // LEVEL 3: NAIRA TO DOLLARS (PYTHON & FREELANCING)
  {
    id: '11',
    level: 3,
    title: 'Python — Why Python is the Global Earning Language',
    objective: 'Understand why remote clients pay for Python scripts.',
    explanation:
      'Python is the number one language for automation, AI, and data processing. International clients on Upwork pay $25–$60/hour to automate repetitive tasks.',
    python: `# Python Automation Demo
hourly_rate = 35.0  # $35 per hour
hours_per_week = 15
weekly_earnings = hourly_rate * hours_per_week
annual_income = weekly_earnings * 52

print(f"Weekly Remote Earnings: \${weekly_earnings:.2f}")
print(f"Annual Part-Time Earnings: \${annual_income:.2f}")
print("Skills needed: Python scripts, Excel automation, Web scraping")`,
    points: [
      'Python code is clean and readable, like written English.',
      'Can run on laptops, cloud servers, or mobile via browser.',
      'Huge demand on global remote freelance platforms.',
    ],
  },
  {
    id: '12',
    level: 3,
    title: 'Automate Excel & Clean Messy Data',
    objective: 'Process thousands of sales records in 2 seconds.',
    explanation:
      'Businesses frequently have spreadsheets filled with duplicates, missing emails, and chaotic dates. A 10-line Python script cleans it instantly.',
    python: `# Clean up duplicates and calculate totals
orders = [
    {"item": "Web Design", "price": 120},
    {"item": "Logo Brand", "price": 40},
    {"item": "Web Design", "price": 120}, # duplicate
    {"item": "SEO Audit", "price": 80}
]

# Deduplicate
unique_orders = []
seen = set()
for o in orders:
    if o["item"] not in seen:
        seen.add(o["item"])
        unique_orders.append(o)

total = sum(o["price"] for o in unique_orders)
print(f"Cleaned unique orders count: {len(unique_orders)}")
print(f"Total Revenue: \${total}")`,
    points: [
      'Save business owners hundreds of manual data-entry hours.',
      'Great entry-level freelance gig ($30 to $100 per file).',
    ],
  },
  {
    id: '13',
    level: 3,
    title: 'Web Scraping — Collect Business Leads',
    objective: 'Write Python scripts to collect public business directories.',
    explanation:
      'Real estate brokers and digital marketing agencies constantly pay researchers to collect public vendor lists and contact details.',
    python: `# Simulated Lead Extraction
directory = [
    "Mama Kitchen | food | contact@mama.com | City Center",
    "Apex Motors | automotive | sales@apex.com | North Blvd",
    "Glow Spa | beauty | hello@glowspa.com | Main Mall"
]

leads = []
for entry in directory:
    name, niche, email, loc = [x.strip() for x in entry.split("|")]
    leads.append({"name": name, "niche": niche, "email": email, "location": loc})

print("Extracted Verified Leads:")
for lead in leads:
    print(f"• {lead['name']} ({lead['niche']}) -> {lead['email']}")`,
    points: [
      'Collect directory information ethically from public sources.',
      'Package verified leads as a CSV or Excel table to sell to marketing clients.',
    ],
  },
  {
    id: '14',
    level: 3,
    title: 'Packaging an International Remote Profile',
    objective: 'Build a profile that commands trust and international contracts.',
    explanation:
      'International clients look for responsiveness, clear English, and real proof of work rather than years of academic degrees.',
    points: [
      'Title: "Front-End Developer & Python Automation Specialist | Fast 24-hr Turnaround"',
      'Portfolio: Showcase your 3 Level 2 websites and Python scripts.',
      'Start with 3 discounted introductory projects to accumulate 5-star verified reviews.',
    ],
  },
  {
    id: '15',
    level: 3,
    title: 'Your Youth Tech Agency — Scale and Delegate',
    objective: 'Form a team of youth coders and deliver full digital packages.',
    explanation:
      'Once you master coding and client communication, team up with friends from Educare. One student designs, one writes code, one handles marketing.',
    points: [
      'Offer complete bundles: Website + Logo + Google Maps registration for $150.',
      'Deliver projects in 48 hours to create glowing client referrals.',
      'Graduate as a certified Code Rise Fellow with lifetime alumni access.',
    ],
  },
];

export const CodeRiseApp: React.FC<CodeRiseAppProps> = ({
  onBackToEducare,
  currentUser,
  onSignOut,
}) => {
  const [activeLevel, setActiveLevel] = useState<1 | 2 | 3>(1);
  const [selectedLessonId, setSelectedLessonId] = useState<string>('1');
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('coderise_completed');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn(e);
    }
    return ['1'];
  });

  // Code editor state
  const selectedLesson = CODERISE_LESSONS.find((l) => l.id === selectedLessonId) || CODERISE_LESSONS[0];
  const [codeDraft, setCodeDraft] = useState(selectedLesson.code || '');
  const [codeOutput, setCodeOutput] = useState(selectedLesson.code || '');
  const [pythonConsole, setPythonConsole] = useState('Press RUN to execute Python script...');
  const [pythonRunning, setPythonRunning] = useState(false);

  // Audio speech narration state
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Certificate state
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [certName, setCertName] = useState(currentUser?.name || 'Ignatius Stella');
  const [certDownloaded, setCertDownloaded] = useState(false);
  const certCanvasRef = useRef<HTMLCanvasElement>(null);

  // Quiz state
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);

  // Sync draft when lesson changes
  useEffect(() => {
    setCodeDraft(selectedLesson.code || '');
    setCodeOutput(selectedLesson.code || '');
    setPythonConsole('Press RUN to execute Python script...');
    setSelectedQuizAnswer(null);
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }, [selectedLessonId]);

  // Speech narration
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const narrationText = `${selectedLesson.title}. Objective: ${selectedLesson.objective}. ${selectedLesson.explanation}. Key concepts: ${selectedLesson.points.join('. ')}`;
    const utterance = new SpeechSynthesisUtterance(narrationText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleMarkComplete = (id: string) => {
    if (!completedLessonIds.includes(id)) {
      const updated = [...completedLessonIds, id];
      setCompletedLessonIds(updated);
      try {
        localStorage.setItem('coderise_completed', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
    }
  };

  // Run Python mock runner
  const handleRunPython = () => {
    setPythonRunning(true);
    setPythonConsole('Running script in sandbox...');
    setTimeout(() => {
      setPythonRunning(false);
      if (selectedLesson.id === '11') {
        setPythonConsole(`Weekly Remote Earnings: $525.00\nAnnual Part-Time Earnings: $27,300.00\nSkills needed: Python scripts, Excel automation, Web scraping\n[Process completed in 0.04s]`);
      } else if (selectedLesson.id === '12') {
        setPythonConsole(`Cleaned unique orders count: 3\nTotal Revenue: $240.00\n[Deduplication completed across 4 entries]`);
      } else if (selectedLesson.id === '13') {
        setPythonConsole(`Extracted Verified Leads:\n• Mama Kitchen (food) -> contact@mama.com\n• Apex Motors (automotive) -> sales@apex.com\n• Glow Spa (beauty) -> hello@glowspa.com\n[Data parsed cleanly to JSON/CSV leads table]`);
      } else {
        setPythonConsole(`Output:\nScript executed successfully. Output logged.\n[Execution completed with exit code 0]`);
      }
      handleMarkComplete(selectedLesson.id);
    }, 450);
  };

  // Render Certificate on canvas
  useEffect(() => {
    const canvas = certCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 560;

    // Background
    ctx.fillStyle = '#1c1917';
    ctx.fillRect(0, 0, 800, 560);

    // Decorative Border
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, 760, 520);

    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 2;
    ctx.strokeRect(30, 30, 740, 500);

    // Header
    ctx.fillStyle = '#f97316';
    ctx.font = 'bold 32px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CODE RISE YOUTH CODERS', 400, 90);

    ctx.fillStyle = '#fbbf24';
    ctx.font = '600 16px monospace';
    ctx.fillText('OFFICIAL CERTIFICATE OF COMPLETION', 400, 125);

    ctx.fillStyle = '#a8a29e';
    ctx.font = '16px sans-serif';
    ctx.fillText('This document certifies that', 400, 180);

    // Student Name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 38px sans-serif';
    ctx.fillText(certName || 'Student Learner', 400, 240);

    // Line under name
    ctx.fillStyle = '#f97316';
    ctx.fillRect(220, 260, 360, 3);

    // Body
    ctx.fillStyle = '#e7e5e4';
    ctx.font = '16px sans-serif';
    ctx.fillText(`Has completed Level ${activeLevel}: ${activeLevel === 1 ? 'Web Basics & HTML/CSS' : activeLevel === 2 ? 'Commercial Web & Freelance' : 'Python Automation & Remote Skills'}`, 400, 310);
    ctx.fillText('Demonstrating practical proficiency in frontend coding, client web engineering, and digital autonomy.', 400, 335);

    // Seal
    ctx.beginPath();
    ctx.arc(400, 420, 40, 0, Math.PI * 2);
    ctx.fillStyle = '#ea580c';
    ctx.fill();
    ctx.strokeStyle = '#fde047';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px monospace';
    ctx.fillText(`LVL ${activeLevel}`, 400, 425);

    // Signatures
    ctx.textAlign = 'left';
    ctx.fillStyle = '#a8a29e';
    ctx.font = '12px sans-serif';
    ctx.fillText('Educare Endowed Center', 60, 490);
    ctx.fillText('Youth Technology Faculty', 60, 510);

    ctx.textAlign = 'right';
    ctx.fillText(new Date().toLocaleDateString(), 740, 490);
    ctx.fillText('Verified Certificate ID: CR-2026-OK', 740, 510);
  }, [certName, activeLevel]);

  const handleDownloadCert = () => {
    const canvas = certCanvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `CodeRise-Level${activeLevel}-Certificate.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    setCertDownloaded(true);
    setTimeout(() => setCertDownloaded(false), 3000);
  };

  const filteredLessons = CODERISE_LESSONS.filter((l) => l.level === activeLevel);
  const totalCompletedInLevel = filteredLessons.filter((l) => completedLessonIds.includes(l.id)).length;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-stone-900/90 backdrop-blur-md border-b border-orange-500/30 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToEducare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Educare</span>
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-stone-800">
              <div className="w-8 h-8 rounded-lg bg-orange-600 text-white flex items-center justify-center font-black text-sm shadow-md">
                {"</>"}
              </div>
              <div>
                <span className="font-bold text-base text-white tracking-tight block leading-tight font-display">
                  Code<span className="text-orange-500">Rise</span>
                </span>
                <span className="text-[10px] text-orange-400 font-medium uppercase tracking-wide">
                  Youth Coders · Interactive App
                </span>
              </div>
            </div>
          </div>

          {/* Level Switcher */}
          <div className="flex items-center gap-1.5 bg-stone-950 p-1 rounded-xl border border-stone-800 text-xs font-bold">
            <button
              onClick={() => {
                setActiveLevel(1);
                setSelectedLessonId('1');
              }}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeLevel === 1 ? 'bg-orange-600 text-white shadow-xs' : 'text-stone-400 hover:text-white'
              }`}
            >
              Level 1: Web Basics
            </button>
            <button
              onClick={() => {
                setActiveLevel(2);
                setSelectedLessonId('6');
              }}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeLevel === 2 ? 'bg-orange-600 text-white shadow-xs' : 'text-stone-400 hover:text-white'
              }`}
            >
              Level 2: Build & Sell
            </button>
            <button
              onClick={() => {
                setActiveLevel(3);
                setSelectedLessonId('11');
              }}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeLevel === 3 ? 'bg-orange-600 text-white shadow-xs' : 'text-stone-400 hover:text-white'
              }`}
            >
              Level 3: Naira to Dollars
            </button>
          </div>

          {/* Right User Capsule */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleSpeech}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isSpeaking
                  ? 'bg-amber-400 text-stone-950 animate-pulse'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
              title="Voice narration by Rise AI Tutor"
            >
              {isSpeaking ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isSpeaking ? 'Listening to Rise...' : 'Listen Aloud'}</span>
            </button>

            <button
              onClick={() => setCertModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <Award className="w-3.5 h-3.5 fill-current" />
              <span>Lvl {activeLevel} Exam & Certificate</span>
            </button>

            {currentUser && (
              <div className="hidden md:flex items-center gap-2 py-1 px-2.5 rounded-lg bg-stone-800 text-xs">
                <div className="w-6 h-6 rounded-full bg-orange-600 text-white font-bold text-[10px] flex items-center justify-center">
                  {currentUser.avatar}
                </div>
                <span className="font-bold text-stone-200">{currentUser.name}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Lesson Selector & Progress (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Level Header Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-950/80 via-stone-900 to-stone-900 border border-orange-500/40 shadow-xl">
            <div className="flex items-center justify-between text-xs font-bold text-orange-400 mb-1">
              <span>TRACK PROGRESS</span>
              <span>{totalCompletedInLevel} / {filteredLessons.length} Complete</span>
            </div>
            <h2 className="text-xl font-bold text-white font-display">
              {activeLevel === 1 && 'Level 1: Web Basics'}
              {activeLevel === 2 && 'Level 2: Build & Sell'}
              {activeLevel === 3 && 'Level 3: Naira to Dollars'}
            </h2>
            <div className="w-full bg-stone-950 h-2 rounded-full mt-2.5 overflow-hidden border border-stone-800">
              <div
                className="bg-orange-500 h-full transition-all duration-300"
                style={{ width: `${(totalCompletedInLevel / filteredLessons.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Lessons List */}
          <div className="space-y-2">
            {filteredLessons.map((l) => {
              const isSelected = l.id === selectedLessonId;
              const isDone = completedLessonIds.includes(l.id);
              return (
                <button
                  key={l.id}
                  onClick={() => setSelectedLessonId(l.id)}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-orange-950/50 border-orange-500 ring-1 ring-orange-500/40 text-white'
                      : 'bg-stone-900 hover:bg-stone-850 border-stone-800 text-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                        isDone ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-stone-800 text-stone-400'
                      }`}
                    >
                      {isDone ? <Check className="w-4 h-4" /> : `0${l.id}`}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-xs sm:text-sm truncate">{l.title}</div>
                      <div className="text-[11px] text-stone-400 truncate">{l.objective}</div>
                    </div>
                  </div>
                  {l.price && (
                    <span className="text-[10px] font-bold text-amber-300 bg-amber-950/60 border border-amber-800 px-2 py-0.5 rounded shrink-0">
                      {l.price}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Certificate Generation Trigger */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-amber-950/40 via-stone-900 to-stone-900 border border-amber-500/40 text-xs space-y-2.5">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Claim Level {activeLevel} Certificate</span>
            </div>
            <p className="text-stone-300 text-[11px] leading-relaxed">
              Take the Level {activeLevel} mastery quiz to generate your diploma, download high-res PNG, and receive it via your Gmail account.
            </p>
            <button
              onClick={() => setCertModalOpen(true)}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Award className="w-4 h-4 fill-current" />
              <span>Level {activeLevel} Exam & Certificate</span>
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Lesson Workbench (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Lesson Header Card */}
          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs uppercase font-mono font-bold text-orange-400">
                Lesson {selectedLesson.id} · Level {selectedLesson.level}
              </span>
              <button
                onClick={() => handleMarkComplete(selectedLesson.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  completedLessonIds.includes(selectedLesson.id)
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-stone-800 hover:bg-stone-700 text-stone-200'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{completedLessonIds.includes(selectedLesson.id) ? 'Completed' : 'Mark as Done'}</span>
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {selectedLesson.title}
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 bg-stone-950 p-3 rounded-xl border border-stone-800">
              <strong>Objective:</strong> {selectedLesson.objective}
            </p>

            <div className="p-4 rounded-xl bg-orange-950/20 border border-orange-500/30 text-stone-200 text-xs sm:text-sm leading-relaxed">
              <p className="font-semibold text-orange-300 mb-1">Simple Explanation:</p>
              <p>{selectedLesson.explanation}</p>
            </div>

            {/* Key Points */}
            <div className="space-y-1.5 pt-2">
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Key Takeaways:</p>
              <ul className="space-y-1 text-xs sm:text-sm text-stone-300">
                {selectedLesson.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Interactive Code Editor (For HTML/CSS Lessons) */}
          {selectedLesson.code && (
            <div className="rounded-2xl bg-stone-900 border border-stone-800 overflow-hidden shadow-xl">
              <div className="p-3.5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-orange-400" />
                  <span className="text-xs font-bold text-white font-mono">Live HTML/CSS/JS Editor</span>
                </div>
                <button
                  onClick={() => {
                    setCodeOutput(codeDraft);
                    handleMarkComplete(selectedLesson.id);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs cursor-pointer shadow-xs"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>RUN CODE</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-stone-800">
                {/* Code input */}
                <div className="p-3 bg-stone-950">
                  <textarea
                    value={codeDraft}
                    onChange={(e) => setCodeDraft(e.target.value)}
                    rows={12}
                    className="w-full bg-transparent font-mono text-xs text-orange-200 resize-none outline-none leading-relaxed"
                    spellCheck={false}
                  />
                </div>
                {/* Live Preview Iframe */}
                <div className="p-3 bg-white min-h-[220px]">
                  <iframe
                    title="Live Preview"
                    srcDoc={codeOutput}
                    sandbox="allow-scripts allow-modals"
                    className="w-full h-full min-h-[200px] border-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Interactive Python Playground (For Level 3 Lessons) */}
          {selectedLesson.python && (
            <div className="rounded-2xl bg-stone-900 border border-stone-800 overflow-hidden shadow-xl">
              <div className="p-3.5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white font-mono">Interactive Python Script Engine</span>
                </div>
                <button
                  onClick={handleRunPython}
                  disabled={pythonRunning}
                  className="flex items-center gap-1.5 px-3.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{pythonRunning ? 'Running...' : 'RUN PYTHON'}</span>
                </button>
              </div>

              <div className="p-3 bg-stone-950 border-b border-stone-800 font-mono text-xs text-emerald-300">
                <pre className="whitespace-pre-wrap">{selectedLesson.python}</pre>
              </div>

              <div className="p-3 bg-black text-stone-300 font-mono text-xs">
                <div className="text-[10px] uppercase font-bold text-stone-500 mb-1">Terminal Output:</div>
                <pre className="whitespace-pre-wrap text-emerald-400">{pythonConsole}</pre>
              </div>
            </div>
          )}

          {/* Interactive Quiz Box */}
          {selectedLesson.quiz && (
            <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span>Knowledge Check</span>
              </div>
              <h3 className="text-sm font-bold text-white">{selectedLesson.quiz.question}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {selectedLesson.quiz.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedQuizAnswer(i);
                      if (i === selectedLesson.quiz!.answer) {
                        handleMarkComplete(selectedLesson.id);
                      }
                    }}
                    className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-all cursor-pointer ${
                      selectedQuizAnswer === i
                        ? i === selectedLesson.quiz!.answer
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500'
                          : 'bg-rose-500/20 text-rose-300 border-rose-500'
                        : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                    }`}
                  >
                    {String.fromCharCode(65 + i)}) {opt}
                  </button>
                ))}
              </div>
              {selectedQuizAnswer !== null && (
                <div
                  className={`p-2.5 rounded-lg text-xs font-bold ${
                    selectedQuizAnswer === selectedLesson.quiz.answer
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-rose-500/10 text-rose-400'
                  }`}
                >
                  {selectedQuizAnswer === selectedLesson.quiz.answer
                    ? '✓ Correct! Lesson objective mastered.'
                    : '✗ Not quite. Re-read the explanation above and retry.'}
                </div>
              )}
            </div>
          )}

          {/* Hidden Canvas for Certificate Rendering */}
          <canvas ref={certCanvasRef} className="hidden" />
        </div>
      </main>

      {/* Offline Universal AI Voice & Text Tutor */}
      <UniversalAITutor
        floating={true}
        accentColor="emerald"
        context={{
          courseId: 'code-rise',
          courseTitle: 'Code Rise — Youth Coders Polytechnic',
          levelNumber: activeLevel,
          levelTitle: `Level ${activeLevel}`,
          lessonTitle: selectedLesson?.title,
          concept: selectedLesson?.objective,
          explanation: selectedLesson?.explanation,
          codeSnippet: selectedLesson?.code || selectedLesson?.python,
        }}
      />

      {/* Universal Level Quiz & Real Certificate Modal */}
      <CertificateModal
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
        courseId="code-rise"
        courseTitle="Code Rise — Youth Coders Polytechnic"
        levelNumber={activeLevel}
        levelTitle={`Level ${activeLevel}: ${
          activeLevel === 1
            ? 'Web Basics & HTML/CSS/JS'
            : activeLevel === 2
            ? 'Commercial Web & Client Pitching'
            : 'Python Automation & Remote Skills'
        }`}
        tier={activeLevel === 1 ? 'Beginner' : activeLevel === 2 ? 'Intermediate' : 'Pro'}
        currentUser={currentUser}
      />
    </div>
  );
};
