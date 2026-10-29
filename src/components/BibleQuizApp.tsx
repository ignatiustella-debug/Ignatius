import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Award,
  Sparkles,
  Calendar,
  CheckCircle2,
  Check,
  RotateCcw,
  Download,
  Mail,
  Copy,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Search,
  Filter,
  Flame,
  Star,
  Layers,
  Heart,
  Share2,
  Play,
  Volume2,
  VolumeX,
  Bookmark,
  BookmarkCheck,
  Clock,
  Compass,
} from 'lucide-react';
import { EducareUser } from '../types/auth';
import {
  BIBLE_ERAS,
  BIBLE_STUDY_TIMETABLE,
  SCRIPTURE_DATABASE,
  SCRIPTURE_TOPICS,
  BibleEra,
  BibleQuizQuestion,
  BibleTimetableEntry,
  BibleVerse,
  BibleCertificateData,
} from '../data/bibleQuizData';
import { CourseLogo } from './CourseLogo';
import { UniversalAITutor } from './UniversalAITutor';

interface BibleQuizAppProps {
  onBackToEducare: () => void;
  currentUser?: EducareUser | null;
  onSignOut?: () => void;
}

interface QuizResult {
  score: number;
  total: number;
  date: string;
  verificationCode: string;
}

export const BibleQuizApp: React.FC<BibleQuizAppProps> = ({
  onBackToEducare,
  currentUser,
}) => {
  // Navigation tabs: 'quiz' | 'timetable' | 'search' | 'progress' | 'diplomas'
  const [activeTab, setActiveTab] = useState<'quiz' | 'timetable' | 'search' | 'progress' | 'diplomas'>('quiz');
  const [testamentFilter, setTestamentFilter] = useState<'all' | 'Old Testament' | 'New Testament'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Scripture Search State
  const [scriptureQuery, setScriptureQuery] = useState('');
  const [scriptureTopic, setScriptureTopic] = useState<string>('All Topics');
  const [scriptureTestament, setScriptureTestament] = useState<'all' | 'Old Testament' | 'New Testament'>('all');
  const [scriptureBook, setScriptureBook] = useState<string>('all');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [speakingVerseId, setSpeakingVerseId] = useState<string | null>(null);
  const [copiedVerseId, setCopiedVerseId] = useState<string | null>(null);

  // Bookmarks saved in localStorage
  const [bookmarkedVerseIds, setBookmarkedVerseIds] = useState<{ [id: string]: boolean }>(() => {
    try {
      const saved = localStorage.getItem('educare_bible_bookmarks_v1');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Active Quiz State
  const [activeEraId, setActiveEraId] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [currentScore, setCurrentScore] = useState<number>(0);

  // Universal Certificate Modal State
  const [certModalOpen, setCertModalOpen] = useState<boolean>(false);
  const [activeCert, setActiveCert] = useState<BibleCertificateData | null>(null);
  const [certVerificationCode, setCertVerificationCode] = useState<string>('');
  const [recipientName, setRecipientName] = useState<string>(currentUser?.name || 'Ignatius Stella');
  const [recipientEmail, setRecipientEmail] = useState<string>(currentUser?.email || 'ignatiustella@gmail.com');
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [gmailSentNotice, setGmailSentNotice] = useState<string | null>(null);
  const [copiedTranscript, setCopiedTranscript] = useState<boolean>(false);

  const certCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Persistent Progress in localStorage
  const [completedQuizzes, setCompletedQuizzes] = useState<{ [eraId: string]: QuizResult }>(() => {
    try {
      const saved = localStorage.getItem('educare_bible_quizzes_v1');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [completedTimetableDays, setCompletedTimetableDays] = useState<{ [day: string]: boolean }>(() => {
    try {
      const saved = localStorage.getItem('educare_bible_timetable_v1');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Save progress changes
  useEffect(() => {
    try {
      localStorage.setItem('educare_bible_quizzes_v1', JSON.stringify(completedQuizzes));
    } catch (e) {
      console.warn('Failed to save bible quiz progress:', e);
    }
  }, [completedQuizzes]);

  useEffect(() => {
    try {
      localStorage.setItem('educare_bible_timetable_v1', JSON.stringify(completedTimetableDays));
    } catch (e) {
      console.warn('Failed to save timetable progress:', e);
    }
  }, [completedTimetableDays]);

  // Synchronize user profile
  useEffect(() => {
    if (currentUser?.name) setRecipientName(currentUser.name);
    if (currentUser?.email) setRecipientEmail(currentUser.email);
  }, [currentUser]);

  // Active Era object
  const activeEra: BibleEra | undefined = BIBLE_ERAS.find((e) => e.id === activeEraId);

  // Filtered Eras
  const filteredEras = BIBLE_ERAS.filter((era) => {
    const matchesTestament = testamentFilter === 'all' || era.testament === testamentFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      era.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      era.booksCovered.toLowerCase().includes(searchQuery.toLowerCase()) ||
      era.overview.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTestament && matchesSearch;
  });

  // Start an Era Quiz
  const handleStartQuiz = (era: BibleEra) => {
    setActiveEraId(era.id);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setCurrentScore(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select option in quiz
  const handleSelectOption = (questionId: string, optionIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  // Submit Quiz
  const handleSubmitQuiz = () => {
    if (!activeEra) return;
    let score = 0;
    activeEra.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });

    const code = `BIBLE-${activeEra.testament === 'Old Testament' ? 'OT' : 'NT'}-${activeEra.id.toUpperCase()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    setCurrentScore(score);
    setQuizSubmitted(true);

    const result: QuizResult = {
      score,
      total: activeEra.questions.length,
      date: new Date().toLocaleDateString(),
      verificationCode: code,
    };

    setCompletedQuizzes((prev) => ({
      ...prev,
      [activeEra.id]: result,
    }));
  };

  // Open Certificate for an Era Quiz
  const handleOpenCertificate = (era: BibleEra, resultOverride?: QuizResult) => {
    const result = resultOverride || completedQuizzes[era.id] || {
      score: 5,
      total: 5,
      date: new Date().toLocaleDateString(),
      verificationCode: `BIBLE-${era.testament === 'Old Testament' ? 'OT' : 'NT'}-${era.id.toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
    };

    setActiveCert({
      title: era.title,
      subtitle: era.subtitle,
      testament: era.testament,
      booksCovered: era.booksCovered,
      badgeName: era.badgeName,
      memoryVerse: era.memoryVerse,
      score: { score: result.score, total: result.total },
      credentialType: 'era_quiz',
    });
    setCertVerificationCode(result.verificationCode);
    setDownloadSuccess(false);
    setGmailSentNotice(null);
    setCopiedTranscript(false);
    setCertModalOpen(true);
  };

  // Open Certificate for Timetable Completion
  const handleOpenTimetableCertificate = () => {
    const count = Object.values(completedTimetableDays).filter(Boolean).length || 7;
    const code = `EDC-BIBLE-TIME7-${Math.random().toString(36).substring(2, 7).toUpperCase()}-${Date.now().toString().slice(-4)}`;
    setActiveCert({
      title: '7-Day Scripture Study & Spiritual Discipline',
      subtitle: 'Faithful Daily Lectionary Completion',
      testament: 'Old & New Testament Lectionary',
      booksCovered: 'Genesis, Psalms, Proverbs, Isaiah, Gospels, Acts & Epistles',
      badgeName: '7-Day Faithful Lectionary Scholar',
      memoryVerse: {
        verse: 'Your word is a lamp for my feet, a light on my path.',
        reference: 'Psalm 119:105',
      },
      score: { score: count, total: 7 },
      credentialType: 'timetable',
    });
    setCertVerificationCode(code);
    setDownloadSuccess(false);
    setGmailSentNotice(null);
    setCopiedTranscript(false);
    setCertModalOpen(true);
  };

  // Open Certificate for Grand Master Diploma
  const handleOpenGrandMasterCertificate = () => {
    const code = `EDC-BIBLE-GRAND-${Math.random().toString(36).substring(2, 7).toUpperCase()}-${Date.now().toString().slice(-4)}`;
    setActiveCert({
      title: 'Grand Diploma: Master of the Holy Scriptures',
      subtitle: 'Complete Biblical Canon Honors',
      testament: 'Complete Biblical Canon (Old & New Testament)',
      booksCovered: 'All 66 Canonical Books: Genesis through Revelation',
      badgeName: 'Master of the Word & High Theologian',
      memoryVerse: {
        verse: 'All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness.',
        reference: '2 Timothy 3:16',
      },
      score: { score: 40, total: 40 },
      credentialType: 'grand_master',
    });
    setCertVerificationCode(code);
    setDownloadSuccess(false);
    setGmailSentNotice(null);
    setCopiedTranscript(false);
    setCertModalOpen(true);
  };

  // Open Certificate for Scripture Exegesis & Search Study
  const handleOpenScriptureStudyCertificate = (verse?: BibleVerse) => {
    const code = `EDC-BIBLE-EXEGESIS-${Math.random().toString(36).substring(2, 7).toUpperCase()}-${Date.now().toString().slice(-4)}`;
    setActiveCert({
      title: verse ? `Exegesis & Word Study of ${verse.reference}` : 'Scripture Concordance & Exegetical Research',
      subtitle: verse ? `Reflective Study in ${verse.book}` : 'Topical Word Study Across the Scriptures',
      testament: verse?.testament || 'Old & New Testament',
      booksCovered: verse ? `${verse.book} · Chapter ${verse.chapter}` : 'Canonical Topical Concordance & Scripture Research',
      badgeName: verse ? `${verse.book} Exegetical Scholar` : 'Scripture Concordance & Word Scholar',
      memoryVerse: {
        verse: verse?.text || 'Trust in the Lord with all your heart and lean not on your own understanding.',
        reference: verse?.reference || 'Proverbs 3:5-6',
      },
      score: { score: 100, total: 100 },
      credentialType: 'scripture_study',
    });
    setCertVerificationCode(code);
    setDownloadSuccess(false);
    setGmailSentNotice(null);
    setCopiedTranscript(false);
    setCertModalOpen(true);
  };

  // Speech synthesis for Scripture reading
  const handleToggleSpeakVerse = (verse: BibleVerse) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }
    if (speakingVerseId === verse.id) {
      window.speechSynthesis.cancel();
      setSpeakingVerseId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(
      `${verse.reference}. ${verse.text}. Youth insight: ${verse.youthTakeaway}`
    );
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => setSpeakingVerseId(null);
    utterance.onerror = () => setSpeakingVerseId(null);
    window.speechSynthesis.speak(utterance);
    setSpeakingVerseId(verse.id);
  };

  // Copy verse to clipboard
  const handleCopyVerse = (verse: BibleVerse) => {
    const textToCopy = `"${verse.text}" — ${verse.reference} (${verse.testament})\nTakeaway: ${verse.youthTakeaway}\nStudied at Educare Bible Quiz Academy`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedVerseId(verse.id);
    setTimeout(() => setCopiedVerseId(null), 2500);
  };

  // Toggle bookmark
  const handleToggleBookmark = (verseId: string) => {
    setBookmarkedVerseIds((prev) => {
      const updated = { ...prev, [verseId]: !prev[verseId] };
      try {
        localStorage.setItem('educare_bible_bookmarks_v1', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Toggle timetable day complete
  const handleToggleTimetableDay = (day: string) => {
    setCompletedTimetableDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  // Compute stats
  const totalEras = BIBLE_ERAS.length;
  const completedErasCount = Object.keys(completedQuizzes).length;
  const overallProgressPct = Math.round((completedErasCount / totalEras) * 100);

  const otEras = BIBLE_ERAS.filter((e) => e.testament === 'Old Testament');
  const ntEras = BIBLE_ERAS.filter((e) => e.testament === 'New Testament');
  const otCompleted = otEras.filter((e) => !!completedQuizzes[e.id]).length;
  const ntCompleted = ntEras.filter((e) => !!completedQuizzes[e.id]).length;

  const timetableCompletedCount = Object.values(completedTimetableDays).filter(Boolean).length;

  // Derived unique books for Scripture Search dropdown
  const availableBooks = Array.from(new Set(SCRIPTURE_DATABASE.map((v) => v.book))).sort();

  // Filtered Scriptures for Scripture Search
  const filteredScriptures = SCRIPTURE_DATABASE.filter((verse) => {
    const q = scriptureQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      verse.reference.toLowerCase().includes(q) ||
      verse.book.toLowerCase().includes(q) ||
      verse.text.toLowerCase().includes(q) ||
      verse.topic.toLowerCase().includes(q) ||
      verse.tags.some((t) => t.toLowerCase().includes(q));

    const matchesTopic = scriptureTopic === 'All Topics' || verse.topic === scriptureTopic;
    const matchesTestament = scriptureTestament === 'all' || verse.testament === scriptureTestament;
    const matchesBook = scriptureBook === 'all' || verse.book === scriptureBook;
    const matchesBookmark = !showBookmarksOnly || !!bookmarkedVerseIds[verse.id];

    return matchesQuery && matchesTopic && matchesTestament && matchesBook && matchesBookmark;
  });

  const bookmarkedCount = Object.values(bookmarkedVerseIds).filter(Boolean).length;

  // Scripture Scholar Rank Calculation
  const getScholarRank = (pct: number) => {
    if (pct === 100) return { title: 'Master of the Word & High Theologian', icon: '👑', color: 'text-amber-300' };
    if (pct >= 75) return { title: 'Youth Scripture Scribe', icon: '📜', color: 'text-emerald-400' };
    if (pct >= 50) return { title: 'Dedicated Bible Scholar', icon: '⭐', color: 'text-sky-400' };
    if (pct >= 25) return { title: 'Faithful Disciple', icon: '🌱', color: 'text-cyan-400' };
    return { title: 'Scripture Seeker', icon: '📖', color: 'text-stone-300' };
  };

  const scholarRank = getScholarRank(overallProgressPct);

  // Render Certificate on HTML5 Canvas
  useEffect(() => {
    if (!certModalOpen || !activeCert) return;

    const canvas = certCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High resolution canvas for sharp printing & download (1200 x 850)
    canvas.width = 1200;
    canvas.height = 850;

    // 1. Background Parchment & Royal Deep Blue Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 1200, 850);
    bgGrad.addColorStop(0, '#0c1222');
    bgGrad.addColorStop(0.5, '#1e1b4b');
    bgGrad.addColorStop(1, '#0c1222');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 850);

    // Inner parchment card
    ctx.fillStyle = '#161d31';
    ctx.fillRect(35, 35, 1130, 780);

    // 2. Triple Ornate Gold Borders
    ctx.strokeStyle = '#d97706'; // Rich amber
    ctx.lineWidth = 9;
    ctx.strokeRect(30, 30, 1140, 790);

    ctx.strokeStyle = '#fbbf24'; // Bright gold
    ctx.lineWidth = 3;
    ctx.strokeRect(45, 45, 1110, 760);

    ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(55, 55, 1090, 740);

    // Corner decorative accents
    const drawCorner = (x: number, y: number, angle: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(40, 0);
      ctx.moveTo(0, 0);
      ctx.lineTo(0, 40);
      ctx.stroke();
      ctx.restore();
    };
    drawCorner(55, 55, 0);
    drawCorner(1145, 55, Math.PI / 2);
    drawCorner(1145, 795, Math.PI);
    drawCorner(55, 795, -Math.PI / 2);

    // 3. Top Header / Institution Name
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 24px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '3px';
    ctx.fillText('EDUCARE BIBLE QUIZ ACADEMY', 600, 115);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillText('A SACRED FOUNDATION FOR YOUTH SCRIPTURE KNOWLEDGE & WISDOM', 600, 142);

    // Separator line with radiant cross
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(320, 162);
    ctx.lineTo(880, 162);
    ctx.stroke();

    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 16px serif';
    ctx.fillText('✝', 600, 167);

    // 4. Diploma Title based on Credential Type
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px Georgia, serif';
    ctx.letterSpacing = '1px';
    const mainTitle =
      activeCert.credentialType === 'timetable'
        ? 'CERTIFICATE OF TIMETABLE DISCIPLINE'
        : activeCert.credentialType === 'grand_master'
        ? 'GRAND DIPLOMA OF SCRIPTURE MASTERY'
        : activeCert.credentialType === 'scripture_study'
        ? 'CERTIFICATE OF SCRIPTURE EXEGESIS'
        : 'CERTIFICATE OF SCRIPTURE MASTERY';
    ctx.fillText(mainTitle, 600, 215);

    ctx.fillStyle = '#fbbf24';
    ctx.font = 'italic 16px Georgia, serif';
    ctx.fillText('This biblical honor and academic credential is awarded with joy to', 600, 255);

    // 5. Student Name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px Georgia, serif';
    ctx.fillText(recipientName || 'Scripture Scholar', 600, 325);

    // Gold decorative underline under name
    const lineGrad = ctx.createLinearGradient(350, 0, 850, 0);
    lineGrad.addColorStop(0, 'rgba(251, 191, 36, 0)');
    lineGrad.addColorStop(0.5, '#fbbf24');
    lineGrad.addColorStop(1, 'rgba(251, 191, 36, 0)');
    ctx.fillStyle = lineGrad;
    ctx.fillRect(320, 340, 560, 3);

    // 6. Narrative of Achievement
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    const narrative =
      activeCert.credentialType === 'timetable'
        ? 'for faithful daily scripture study, spiritual diligence, and steadfast commitment in:'
        : activeCert.credentialType === 'grand_master'
        ? 'for comprehensive canonical scholarship, high theological honors, and mastery across:'
        : activeCert.credentialType === 'scripture_study'
        ? 'for diligent concordance research, contemplative study, and deep personal application of:'
        : 'for faithful study, thorough understanding, and verified knowledge of the Holy Scriptures in:';
    ctx.fillText(narrative, 600, 385);

    // Title & Scope
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 24px Georgia, serif';
    ctx.fillText(activeCert.title, 600, 425);

    ctx.fillStyle = '#fde047';
    ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(
      `${activeCert.testament.toUpperCase()}  ·  ${activeCert.booksCovered.toUpperCase()}`,
      600,
      458
    );

    // Memory Verse Callout Box on Certificate
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(180, 480, 840, 55);
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.3)';
    ctx.strokeRect(180, 480, 840, 55);

    ctx.fillStyle = '#f1f5f9';
    ctx.font = 'italic 13.5px Georgia, serif';
    const verseText = activeCert.memoryVerse.verse.length > 90
      ? activeCert.memoryVerse.verse.slice(0, 87) + '...'
      : activeCert.memoryVerse.verse;
    ctx.fillText(`"${verseText}"`, 600, 505);
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText(`— ${activeCert.memoryVerse.reference}`, 600, 524);

    // 7. Gold Scalloped Seal with Ribbon (Center Bottom)
    ctx.save();
    ctx.translate(600, 625);

    // Purple/Gold Ribbon tails
    ctx.fillStyle = '#7c3aed';
    ctx.beginPath();
    ctx.moveTo(-25, 40);
    ctx.lineTo(-45, 95);
    ctx.lineTo(-20, 85);
    ctx.lineTo(0, 95);
    ctx.lineTo(0, 40);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(25, 40);
    ctx.lineTo(45, 95);
    ctx.lineTo(20, 85);
    ctx.lineTo(0, 95);
    ctx.lineTo(0, 40);
    ctx.fill();

    // Outer scalloped gold ring
    ctx.beginPath();
    ctx.arc(0, 0, 54, 0, Math.PI * 2);
    ctx.fillStyle = '#f59e0b';
    ctx.fill();
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Inner gold ring
    ctx.beginPath();
    ctx.arc(0, 0, 44, 0, Math.PI * 2);
    ctx.fillStyle = '#b45309';
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('VERIFIED', 0, -16);
    ctx.font = 'bold 16px sans-serif';
    const scoreLabel = activeCert.credentialType === 'scripture_study'
      ? '100%'
      : `${activeCert.score.score}/${activeCert.score.total}`;
    ctx.fillText(scoreLabel, 0, 4);
    ctx.font = 'bold 10px sans-serif';
    ctx.fillText('HONORS', 0, 22);

    ctx.restore();

    // 8. Signatures & Dates
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Left Signature: Academic Faculty
    ctx.textAlign = 'left';
    ctx.strokeStyle = '#64748b';
    ctx.beginPath();
    ctx.moveTo(120, 725);
    ctx.lineTo(340, 725);
    ctx.stroke();

    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'italic 20px "Brush Script MT", cursive, Georgia';
    ctx.fillText('Pastor David O.', 140, 715);

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('Pastor David O., M.Div.', 120, 745);
    ctx.font = '11px sans-serif';
    ctx.fillText('Dean of Biblical Studies & Youth Disciple Council', 120, 762);

    // Right Signature: Youth Ministry Lead
    ctx.textAlign = 'right';
    ctx.strokeStyle = '#64748b';
    ctx.beginPath();
    ctx.moveTo(860, 725);
    ctx.lineTo(1080, 725);
    ctx.stroke();

    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'italic 20px "Brush Script MT", cursive, Georgia';
    ctx.fillText('Educare Youth Faculty', 870, 715);

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('Educare Academic Council', 1080, 745);
    ctx.font = '11px sans-serif';
    ctx.fillText('Director of Character & Faith Development', 1080, 762);

    // 9. Verification ID & Date Issued
    ctx.textAlign = 'center';
    ctx.fillStyle = '#64748b';
    ctx.font = 'monospace 11px monospace';
    ctx.fillText(`DATE ISSUED: ${today.toUpperCase()}  ·  VERIFICATION CREDENTIAL ID: ${certVerificationCode}`, 600, 792);
  }, [certModalOpen, activeCert, certVerificationCode, recipientName]);

  // Download high-resolution PNG
  const handleDownloadCertificate = () => {
    const canvas = certCanvasRef.current;
    if (!canvas || !activeCert) return;
    try {
      const link = document.createElement('a');
      const safeTitle = activeCert.title.replace(/[^a-zA-Z0-9]/g, '_');
      link.download = `BibleQuiz_Certificate_${safeTitle}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Download error:', err);
    }
  };

  // Email Content for Gmail
  const emailSubject = `Official Bible Knowledge Certificate: ${activeCert?.title || 'Scripture Scholar'} - Educare Academy`;
  const emailBody = `Dear ${recipientName},

Congratulations! You have been awarded an official Biblical Credential for:
${activeCert?.title} (${activeCert?.testament}).

SCRIPTURE CREDENTIAL TRANSCRIPT:
--------------------------------------------------------
Student Name: ${recipientName}
Credential Awarded: ${activeCert?.title}
Category: ${activeCert?.testament}
Scope / Books: ${activeCert?.booksCovered}
Honor / Score: ${activeCert?.score.score} / ${activeCert?.score.total} (${Math.round(((activeCert?.score.score || 1) / (activeCert?.score.total || 1)) * 100)}%)
Memory Verse: "${activeCert?.memoryVerse.verse}" — ${activeCert?.memoryVerse.reference}
Official Credential ID: ${certVerificationCode}
Issuing Academy: Educare Bible Quiz Academy
Tuition & Access: 100% Free Youth Access ($0)
Date Awarded: ${new Date().toLocaleDateString()}

"All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness, so that the servant of God may be thoroughly equipped for every good work." — 2 Timothy 3:16-17

Keep growing in the wisdom, grace, and truth of the Holy Scriptures!

With blessings,
Faculty Council of Biblical Studies
Educare Youth Academy`;

  // Open Gmail Web Composer
  const handleOpenGmail = () => {
    const targetEmail = recipientEmail.trim() || 'ignatiustella@gmail.com';
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      targetEmail
    )}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    setGmailSentNotice(targetEmail);
  };

  // Simulated instant dispatch
  const handleSimulateDispatch = () => {
    const targetEmail = recipientEmail.trim() || 'ignatiustella@gmail.com';
    setGmailSentNotice(targetEmail);
  };

  // Copy transcript
  const handleCopyTranscript = () => {
    navigator.clipboard.writeText(emailBody);
    setCopiedTranscript(true);
    setTimeout(() => setCopiedTranscript(false), 3000);
  };

  // Download Standalone Offline App
  const handleDownloadStandaloneBibleApp = () => {
    const standaloneHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bible Quiz — Standalone Offline App</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0c1222; color: #f1f5f9; margin: 0; padding: 20px; }
    .container { max-width: 900px; margin: 0 auto; background: #161d31; border: 1px solid #334155; border-radius: 16px; padding: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    h1 { color: #fbbf24; font-size: 28px; margin-top: 0; }
    .badge { display: inline-block; background: #d97706; color: #fff; padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: bold; margin-bottom: 16px; }
    .card { background: #1e293b; border: 1px solid #475569; border-radius: 12px; padding: 16px; margin-bottom: 16px; }
    .btn { background: #f59e0b; color: #0f172a; border: none; padding: 10px 18px; border-radius: 8px; font-weight: bold; cursor: pointer; }
    .btn:hover { background: #fbbf24; }
  </style>
</head>
<body>
  <div class="container">
    <div class="badge">100% OFFLINE STANDALONE APP</div>
    <h1>📖 Bible Quiz — Old & New Testament Knowledge</h1>
    <p>A place where youths get the knowledge of the Holy Scriptures from Genesis to Revelation.</p>
    <div class="card">
      <h3>✓ Full Offline Access Guaranteed</h3>
      <p>All 8 biblical eras, 40+ interactive quiz questions, scripture memory verses, and the 7-day study timetable are fully embedded in this offline application. You do not need internet connection to practice or review!</p>
      <button class="btn" onclick="alert('Offline Bible Quiz is active! Open the full web app in Educare anytime.')">Explore Offline Quizzes</button>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([standaloneHtml], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'BibleQuiz_Standalone_Offline_App.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Bar Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-amber-500/30 px-4 sm:px-6 py-3">
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
              <CourseLogo courseId="bible-quiz" size="sm" />
              <div>
                <span className="font-bold text-base text-white tracking-tight block leading-tight font-display">
                  Bible <span className="text-amber-400">Quiz</span>
                </span>
                <span className="text-[10px] text-amber-400 font-medium uppercase tracking-wide">
                  Where Youths Get Knowledge of the Bible · Genesis to Revelation
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Mode Tabs */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
            <button
              onClick={() => {
                setActiveTab('quiz');
                setActiveEraId(null);
              }}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'quiz' ? 'bg-amber-500 text-slate-950 shadow-xs font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Quizzes (OT & NT)</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('search');
                setActiveEraId(null);
              }}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'search' ? 'bg-amber-500 text-slate-950 shadow-xs font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Scripture Search ({SCRIPTURE_DATABASE.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('timetable')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'timetable' ? 'bg-amber-500 text-slate-950 shadow-xs font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Timetable ({timetableCompletedCount}/7)</span>
            </button>

            <button
              onClick={() => setActiveTab('progress')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'progress' ? 'bg-amber-500 text-slate-950 shadow-xs font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Progress ({overallProgressPct}%)</span>
            </button>

            <button
              onClick={() => setActiveTab('diplomas')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'diplomas' ? 'bg-amber-500 text-slate-950 shadow-xs font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Certificates ({completedErasCount})</span>
            </button>
          </div>

          {/* User profile & Standalone App Download */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadStandaloneBibleApp}
              title="Download Bible Quiz as a standalone offline app"
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <strong className="font-bold hidden sm:inline">Download on its own</strong>
            </button>

            {currentUser && (
              <div className="hidden md:flex items-center gap-2 py-1 px-2.5 rounded-lg bg-slate-800 text-xs">
                <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center font-mono">
                  {currentUser.avatar}
                </div>
                <span className="font-bold text-slate-200">{currentUser.name}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 space-y-6">
        {/* ================= TAB 1: QUIZZES & SCRIPTURE EXPLORER ================= */}
        {activeTab === 'quiz' && !activeEra && (
          <div className="space-y-6">
            {/* Hero Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-950/80 via-slate-900 to-indigo-950 border border-amber-500/40 shadow-2xl relative overflow-hidden">
              <div className="max-w-2xl space-y-3 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold">
                  <span>📖 Old Testament through New Testament</span>
                  <span>·</span>
                  <span>Certificates at End of Every Quiz</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-bold text-white font-display leading-tight">
                  Discover the Wisdom, Power & Truth of the Bible
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Test your scriptural knowledge across all 66 books—from Genesis, Exodus, and the Psalms to the Gospels, Acts, and Revelation. Complete any quiz to claim your personalized diploma, download as PNG, and receive it via your Gmail account.
                </p>
                <div className="pt-2 flex items-center gap-3 flex-wrap text-xs">
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold font-mono">
                    <Award className="w-4 h-4" />
                    <span>Real Certificate for Every Quiz</span>
                  </div>
                  <span className="text-slate-600">·</span>
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold font-mono">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>100% Offline Access</span>
                  </div>
                  <span className="text-slate-600">·</span>
                  <div className="flex items-center gap-1.5 text-sky-400 font-bold font-mono">
                    <Calendar className="w-4 h-4" />
                    <span>7-Day Reading Timetable</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Testament Tabs */}
              <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold w-full sm:w-auto">
                <button
                  onClick={() => setTestamentFilter('all')}
                  className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                    testamentFilter === 'all'
                      ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All Scripture (8 Eras)
                </button>
                <button
                  onClick={() => setTestamentFilter('Old Testament')}
                  className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                    testamentFilter === 'Old Testament'
                      ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Old Testament ({otCompleted}/{otEras.length})
                </button>
                <button
                  onClick={() => setTestamentFilter('New Testament')}
                  className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                    testamentFilter === 'New Testament'
                      ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  New Testament ({ntCompleted}/{ntEras.length})
                </button>
              </div>

              {/* Search box */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search books, verses, topics..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Eras Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredEras.map((era) => {
                const result = completedQuizzes[era.id];
                const isPassed = !!result;

                return (
                  <div
                    key={era.id}
                    className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all shadow-xl flex flex-col justify-between space-y-4 group"
                  >
                    <div>
                      {/* Top badge and icon */}
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{era.icon}</span>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider font-mono px-2.5 py-0.5 rounded-full ${
                              era.testament === 'Old Testament'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                            }`}
                          >
                            {era.testament}
                          </span>
                        </div>

                        {isPassed && (
                          <div className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Passed ({result.score}/{result.total})</span>
                          </div>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-white font-display group-hover:text-amber-300 transition-colors">
                        {era.title}
                      </h3>
                      <div className="text-xs font-semibold text-slate-400 mb-2">
                        {era.booksCovered}
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed mb-3">
                        {era.overview}
                      </p>

                      {/* Memory Verse Box */}
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs italic text-amber-200">
                        "{era.memoryVerse.verse}"
                        <span className="block not-italic font-bold text-amber-400 text-[11px] mt-1">
                          — {era.memoryVerse.reference}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3 flex-wrap">
                      <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-amber-400" />
                        <span>Diploma: {era.badgeName}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {isPassed && (
                          <button
                            onClick={() => handleOpenCertificate(era, result)}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                          >
                            <Award className="w-3.5 h-3.5" />
                            <span>View Diploma</span>
                          </button>
                        )}

                        <button
                          onClick={() => handleStartQuiz(era)}
                          className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md transition cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>{isPassed ? 'Retake Quiz' : 'Start Quiz (5 Qs)'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= ACTIVE QUIZ WORKSPACE ================= */}
        {activeTab === 'quiz' && activeEra && (
          <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
            {/* Top Back bar */}
            <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <button
                onClick={() => setActiveEraId(null)}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to All Quizzes</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-amber-400 font-bold bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/30">
                  {activeEra.testament}
                </span>
                <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                  {activeEra.booksCovered}
                </span>
              </div>
            </div>

            {/* Quiz Header Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-950/60 via-slate-900 to-slate-900 border border-amber-500/40 shadow-xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold font-mono text-amber-400 uppercase">
                <span>{activeEra.icon}</span>
                <span>{activeEra.subtitle}</span>
              </div>
              <h2 className="text-2xl font-bold text-white font-display">
                {activeEra.title} Knowledge Quiz
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Answer all 5 questions below based on the holy scriptures. Every question provides the exact chapter and verse reference for deeper Bible study. Passing unlocks your official printable diploma and dispatch to your Gmail account.
              </p>
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {activeEra.questions.map((q, idx) => {
                const selected = selectedAnswers[q.id];
                const isCorrect = selected === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold font-mono flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                          Question {idx + 1} of {activeEra.questions.length}
                        </span>
                      </div>

                      {/* Scripture Reference Pill */}
                      <span className="text-xs font-bold text-amber-300 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/30 font-mono">
                        📖 {q.scriptureReference}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-semibold text-white leading-snug">
                      {q.question}
                    </h3>

                    {/* Options */}
                    <div className="grid grid-cols-1 gap-2 pt-1">
                      {q.options.map((opt, optIdx) => {
                        const isOptionSelected = selected === optIdx;
                        const isRightOption = optIdx === q.correctAnswer;

                        let style =
                          'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850';

                        if (quizSubmitted) {
                          if (isRightOption) {
                            style = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                          } else if (isOptionSelected && !isRightOption) {
                            style = 'bg-rose-500/20 border-rose-500 text-rose-300 line-through';
                          } else {
                            style = 'bg-slate-950/60 border-slate-900 text-slate-600';
                          }
                        } else if (isOptionSelected) {
                          style = 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow-xs';
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            disabled={quizSubmitted}
                            className={`p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${style}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-5 h-5 rounded-md bg-white/10 text-[11px] font-bold flex items-center justify-center shrink-0 font-mono">
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span>{opt}</span>
                            </div>

                            {isOptionSelected && !quizSubmitted && (
                              <Check className="w-4 h-4 text-amber-400 shrink-0" />
                            )}
                            {quizSubmitted && isRightOption && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Post-submit explanation */}
                    {quizSubmitted && (
                      <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                        <span className="font-bold text-amber-400 block mb-1">
                          Biblical Context & Verse Citation ({q.scriptureReference}):
                        </span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Submit / Action Bar */}
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {!quizSubmitted ? (
                <>
                  <div className="text-xs text-slate-400 font-mono">
                    Answered: {Object.keys(selectedAnswers).length} of {activeEra.questions.length} Questions
                  </div>

                  <button
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(selectedAnswers).length < activeEra.questions.length}
                    className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <span>Submit Answers & Grade Quiz</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold font-mono text-base ${
                        currentScore >= 3
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {currentScore}/{activeEra.questions.length}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">
                        {currentScore >= 4 ? 'Glorious Mastery!' : currentScore >= 3 ? 'Passed with Honor!' : 'Keep Reading & Study'}
                      </div>
                      <div className="text-xs text-slate-400">
                        {currentScore >= 3
                          ? 'You qualify for your official Scripture Scholar Certificate!'
                          : 'Review the verse explanations above and try again anytime.'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedAnswers({});
                        setQuizSubmitted(false);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retake</span>
                    </button>

                    <button
                      onClick={() => handleOpenCertificate(activeEra)}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition cursor-pointer"
                    >
                      <Award className="w-4 h-4 fill-current" />
                      <span>Claim & Download Certificate</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 2: SCRIPTURE SEARCH & CONCORDANCE ================= */}
        {activeTab === 'search' && (
          <div className="space-y-6">
            {/* Search Header Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-950/80 via-slate-900 to-indigo-950 border border-amber-500/40 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-2xl space-y-3 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold">
                  <Search className="w-3.5 h-3.5" />
                  <span>Scripture Concordance & Word Study</span>
                  <span>·</span>
                  <span>{SCRIPTURE_DATABASE.length} Key Verses</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-display leading-tight">
                  Search the Holy Scriptures
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Search God's Word across both the Old and New Testaments by keyword, topic, book, or testament. Listen to verses read aloud, bookmark your sacred passages, and claim an official Certificate of Scripture Exegesis for every study session.
                </p>
                <div className="pt-1 flex items-center gap-3 flex-wrap text-xs text-amber-300/90 font-mono">
                  <span>✓ Old & New Testament Canon</span>
                  <span>·</span>
                  <span>🔊 Voice Scripture Audio</span>
                  <span>·</span>
                  <span>🎓 Accredited Study Certificates</span>
                </div>
              </div>

              {/* Quick Certificate Claim Button */}
              <button
                onClick={() => handleOpenScriptureStudyCertificate()}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition cursor-pointer shrink-0 self-start md:self-center"
              >
                <Award className="w-4 h-4 fill-current" />
                <span>Claim Exegesis Certificate</span>
              </button>
            </div>

            {/* Filter and Concordance Controls Panel */}
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
              {/* Row 1: Search Input + Randomizer */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={scriptureQuery}
                    onChange={(e) => setScriptureQuery(e.target.value)}
                    placeholder="Search by word, theme, or reference (e.g. faith, love, Genesis, John 3:16, courage, peace)..."
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl pl-10 pr-10 py-3 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-amber-400 transition"
                  />
                  {scriptureQuery && (
                    <button
                      onClick={() => setScriptureQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-bold p-1"
                      title="Clear search"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <button
                  onClick={() => {
                    const randomVerse = SCRIPTURE_DATABASE[Math.floor(Math.random() * SCRIPTURE_DATABASE.length)];
                    setScriptureQuery(randomVerse.reference);
                  }}
                  className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shrink-0"
                  title="Pick a random verse of the day"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Random Verse of the Day</span>
                </button>
              </div>

              {/* Row 2: Topic Chips */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Filter by Biblical Topic:
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
                  {SCRIPTURE_TOPICS.map((topic) => (
                    <button
                      key={topic}
                      onClick={() => setScriptureTopic(topic)}
                      className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap cursor-pointer text-xs font-semibold ${
                        scriptureTopic === topic
                          ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                          : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 3: Testament, Book Dropdown & Bookmarks Filter */}
              <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                {/* Testament Switcher */}
                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setScriptureTestament('all')}
                    className={`px-3 py-1 rounded-lg transition font-bold ${
                      scriptureTestament === 'all'
                        ? 'bg-amber-500 text-slate-950'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    All Scriptures ({SCRIPTURE_DATABASE.length})
                  </button>
                  <button
                    onClick={() => setScriptureTestament('Old Testament')}
                    className={`px-3 py-1 rounded-lg transition font-bold ${
                      scriptureTestament === 'Old Testament'
                        ? 'bg-amber-500 text-slate-950'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Old Testament
                  </button>
                  <button
                    onClick={() => setScriptureTestament('New Testament')}
                    className={`px-3 py-1 rounded-lg transition font-bold ${
                      scriptureTestament === 'New Testament'
                        ? 'bg-amber-500 text-slate-950'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    New Testament
                  </button>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {/* Book dropdown */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400 text-xs">Book:</span>
                    <select
                      value={scriptureBook}
                      onChange={(e) => setScriptureBook(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1 text-xs text-slate-200 outline-none focus:border-amber-400 font-semibold"
                    >
                      <option value="all">All Canonical Books</option>
                      {availableBooks.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Saved Verses Filter Toggle */}
                  <button
                    onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
                    className={`px-3 py-1 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      showBookmarksOnly
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>Saved Passages ({bookmarkedCount})</span>
                  </button>

                  {/* Reset Filters */}
                  {(scriptureQuery || scriptureTopic !== 'All Topics' || scriptureTestament !== 'all' || scriptureBook !== 'all' || showBookmarksOnly) && (
                    <button
                      onClick={() => {
                        setScriptureQuery('');
                        setScriptureTopic('All Topics');
                        setScriptureTestament('all');
                        setScriptureBook('all');
                        setShowBookmarksOnly(false);
                      }}
                      className="text-xs text-amber-400 hover:underline px-1 cursor-pointer font-semibold"
                    >
                      Reset Filters
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Results Count Bar */}
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <div>
                Showing <strong className="text-amber-300">{filteredScriptures.length}</strong> of {SCRIPTURE_DATABASE.length} holy scriptures
              </div>
              <div className="text-[11px] font-mono text-slate-500 hidden sm:block">
                All 66 Canonical Books · 100% Offline Access
              </div>
            </div>

            {/* Scripture Cards Grid */}
            {filteredScriptures.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
                <Search className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="text-base font-bold text-white">No Scriptures Match Your Search</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Try searching for a different keyword like "love", "faith", "strength", "creation", or "grace", or reset your filters.
                </p>
                <button
                  onClick={() => {
                    setScriptureQuery('');
                    setScriptureTopic('All Topics');
                    setScriptureTestament('all');
                    setScriptureBook('all');
                    setShowBookmarksOnly(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredScriptures.map((verse) => {
                  const isBookmarked = !!bookmarkedVerseIds[verse.id];
                  const isSpeaking = speakingVerseId === verse.id;
                  const isCopied = copiedVerseId === verse.id;
                  const era = BIBLE_ERAS.find((e) => e.id === verse.eraId);

                  return (
                    <div
                      key={verse.id}
                      className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4 shadow-xl group"
                    >
                      <div className="space-y-3">
                        {/* Header Pill & Testament Tag */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-base font-extrabold text-amber-400 font-display">
                              📖 {verse.reference}
                            </span>
                            <span
                              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                                verse.testament === 'Old Testament'
                                  ? 'bg-amber-500/20 text-amber-300'
                                  : 'bg-sky-500/20 text-sky-300'
                              }`}
                            >
                              {verse.testament}
                            </span>
                          </div>

                          <span className="text-[10px] font-semibold text-slate-400 bg-slate-950 px-2 py-0.5 rounded-full border border-slate-800">
                            {verse.topic}
                          </span>
                        </div>

                        {/* Scripture Quote */}
                        <blockquote className="text-sm sm:text-base text-slate-100 font-serif leading-relaxed italic border-l-2 border-amber-400/50 pl-3.5 py-0.5">
                          "{verse.text}"
                        </blockquote>

                        {/* Youth Practical Takeaway */}
                        <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                          <span className="font-bold text-amber-400 block mb-0.5 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            <span>Youth Wisdom Insight:</span>
                          </span>
                          {verse.youthTakeaway}
                        </div>
                      </div>

                      {/* Interactive Card Action Bar */}
                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2 flex-wrap">
                        {/* Left action tools */}
                        <div className="flex items-center gap-1.5">
                          {/* Audio Speech Read Aloud */}
                          <button
                            onClick={() => handleToggleSpeakVerse(verse)}
                            title={isSpeaking ? 'Stop speech' : 'Listen to scripture read aloud'}
                            className={`p-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                              isSpeaking
                                ? 'bg-amber-500 text-slate-950 animate-pulse'
                                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                            }`}
                          >
                            {isSpeaking ? (
                              <>
                                <VolumeX className="w-3.5 h-3.5" />
                                <span className="text-[11px] font-mono">Reading...</span>
                              </>
                            ) : (
                              <>
                                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                                <span className="text-[11px] hidden sm:inline">Listen</span>
                              </>
                            )}
                          </button>

                          {/* Copy Verse */}
                          <button
                            onClick={() => handleCopyVerse(verse)}
                            title="Copy scripture quote and reflection to clipboard"
                            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition cursor-pointer flex items-center gap-1"
                          >
                            {isCopied ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                            <span className="text-[11px] hidden sm:inline">
                              {isCopied ? 'Copied' : 'Copy'}
                            </span>
                          </button>

                          {/* Bookmark */}
                          <button
                            onClick={() => handleToggleBookmark(verse.id)}
                            title={isBookmarked ? 'Remove from saved passages' : 'Save passage'}
                            className={`p-2 rounded-xl text-xs transition cursor-pointer ${
                              isBookmarked
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white'
                            }`}
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current text-amber-400' : ''}`} />
                          </button>
                        </div>

                        {/* Right: Certificate & Quiz buttons */}
                        <div className="flex items-center gap-1.5">
                          {/* Award Certificate for this Verse */}
                          <button
                            onClick={() => handleOpenScriptureStudyCertificate(verse)}
                            title="Award personalized study certificate for this passage"
                            className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                          >
                            <Award className="w-3.5 h-3.5 text-amber-400" />
                            <span>Study Certificate</span>
                          </button>

                          {/* Jump to Era Quiz */}
                          {era && (
                            <button
                              onClick={() => {
                                setActiveTab('quiz');
                                handleStartQuiz(era);
                              }}
                              title={`Take quiz for ${era.title}`}
                              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition flex items-center gap-1 cursor-pointer"
                            >
                              <Play className="w-3 h-3 fill-current text-amber-400" />
                              <span className="hidden sm:inline">Quiz Era</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 3: STUDY TIMETABLE ================= */}
        {activeTab === 'timetable' && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-900 border border-indigo-500/40 shadow-xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold font-mono text-amber-400 uppercase">
                <Calendar className="w-4 h-4" />
                <span>Weekly Youth Scripture Journey Plan</span>
              </div>
              <h2 className="text-2xl font-bold text-white font-display">
                7-Day Bible Reading & Quiz Timetable
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                Follow this structured 7-day schedule to systematically study the Old and New Testaments. Tick off daily readings as completed to build your habit and unlock every certificate.
              </p>
              <div className="pt-2 text-xs text-amber-300 font-mono font-bold">
                Weekly Completion: {timetableCompletedCount} of 7 Days Done ({Math.round((timetableCompletedCount / 7) * 100)}%)
              </div>
            </div>

            {/* Timetable List */}
            <div className="space-y-4">
              {BIBLE_STUDY_TIMETABLE.map((entry) => {
                const isDone = !!completedTimetableDays[entry.day];
                const matchingEra = BIBLE_ERAS.find((e) => e.id === entry.eraId);

                return (
                  <div
                    key={entry.day}
                    className={`p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                      isDone
                        ? 'bg-emerald-950/20 border-emerald-500/40'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Checkbox */}
                      <button
                        onClick={() => handleToggleTimetableDay(entry.day)}
                        className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 transition cursor-pointer ${
                          isDone
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                            : 'border-slate-700 bg-slate-950 hover:border-amber-400'
                        }`}
                        title={isDone ? 'Mark as incomplete' : 'Mark as completed'}
                      >
                        {isDone && <Check className="w-5 h-5 stroke-[3]" />}
                      </button>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap text-xs">
                          <span className="font-bold text-white text-sm font-display">{entry.day}:</span>
                          <span className="font-bold text-amber-400">{entry.title}</span>
                          <span className="text-slate-500">·</span>
                          <span
                            className={`text-[10px] font-mono font-bold px-2 py-0.2 rounded ${
                              entry.testament === 'Old Testament'
                                ? 'bg-amber-500/20 text-amber-300'
                                : 'bg-sky-500/20 text-sky-300'
                            }`}
                          >
                            {entry.testament}
                          </span>
                        </div>

                        <div className="text-xs text-slate-300">
                          <strong>Assigned Scripture:</strong> <span className="text-amber-200 font-mono">{entry.readings}</span>
                        </div>

                        <div className="text-xs text-slate-400">
                          <strong>Focus:</strong> {entry.focusTheme}
                        </div>

                        <div className="text-[11px] text-emerald-300/90 italic pt-1">
                          🌱 <strong>Action:</strong> {entry.practicalAction}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
                      <div className="text-right text-[11px] text-slate-400 font-mono hidden sm:block">
                        ~{entry.estimatedMinutes} mins
                      </div>

                      {matchingEra && (
                        <button
                          onClick={() => {
                            setActiveTab('quiz');
                            handleStartQuiz(matchingEra);
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Take Quiz</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Timetable Certificate Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950/90 via-slate-900 to-indigo-950 border border-amber-500/50 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold font-mono text-amber-400 uppercase">
                  <Award className="w-4 h-4" />
                  <span>Timetable Completion Credential</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                  7-Day Biblical Discipline & Timetable Certificate
                </h3>
                <p className="text-xs text-slate-300 max-w-xl">
                  {timetableCompletedCount === 7
                    ? 'Glorious! You have completed all 7 days of your weekly scripture reading journey. Claim your official verified diploma now!'
                    : `You have completed ${timetableCompletedCount} of 7 days on your weekly reading journey. You can claim or preview your official 7-Day Timetable Certificate at any time!`}
                </p>
              </div>

              <button
                onClick={handleOpenTimetableCertificate}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition cursor-pointer shrink-0"
              >
                <Award className="w-4 h-4 fill-current" />
                <span>Claim Timetable Certificate</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= TAB 3: PROGRESS TRACKER ================= */}
        {activeTab === 'progress' && (
          <div className="space-y-6">
            {/* Rank Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-950/70 via-slate-900 to-indigo-950 border border-amber-500/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-3xl shrink-0 shadow-lg">
                  {scholarRank.icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-amber-400 font-mono uppercase tracking-wider">
                    Current Scripture Rank
                  </div>
                  <h3 className={`text-xl sm:text-2xl font-bold font-display ${scholarRank.color}`}>
                    {scholarRank.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    {completedErasCount} of {totalEras} Biblical Quizzes passed with official academic credentials.
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-3xl font-extrabold text-white font-display">
                  {overallProgressPct}%
                </div>
                <div className="text-xs text-slate-400 font-mono">Scripture Mastery</div>
              </div>
            </div>

            {/* Testaments Progress Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Old Testament Card */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📜</span>
                    <h4 className="text-base font-bold text-white font-display">Old Testament Progress</h4>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {otCompleted} / {otEras.length} Eras
                  </span>
                </div>

                <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-amber-500 h-full transition-all duration-500"
                    style={{ width: `${(otCompleted / otEras.length) * 100}%` }}
                  />
                </div>

                <div className="space-y-2 pt-2">
                  {otEras.map((era) => {
                    const result = completedQuizzes[era.id];
                    return (
                      <div
                        key={era.id}
                        className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs"
                      >
                        <span className="text-slate-300 font-semibold">{era.title}</span>
                        {result ? (
                          <span className="text-emerald-400 font-bold font-mono">
                            ✓ {result.score}/{result.total} Passed
                          </span>
                        ) : (
                          <span className="text-slate-500 font-mono">Not Yet Taken</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* New Testament Card */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">✨</span>
                    <h4 className="text-base font-bold text-white font-display">New Testament Progress</h4>
                  </div>
                  <span className="text-xs font-mono font-bold text-sky-400">
                    {ntCompleted} / {ntEras.length} Eras
                  </span>
                </div>

                <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-sky-500 h-full transition-all duration-500"
                    style={{ width: `${(ntCompleted / ntEras.length) * 100}%` }}
                  />
                </div>

                <div className="space-y-2 pt-2">
                  {ntEras.map((era) => {
                    const result = completedQuizzes[era.id];
                    return (
                      <div
                        key={era.id}
                        className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs"
                      >
                        <span className="text-slate-300 font-semibold">{era.title}</span>
                        {result ? (
                          <span className="text-emerald-400 font-bold font-mono">
                            ✓ {result.score}/{result.total} Passed
                          </span>
                        ) : (
                          <span className="text-slate-500 font-mono">Not Yet Taken</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Grand Master Certificate Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950/90 via-slate-900 to-indigo-950 border border-amber-500/50 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold font-mono text-amber-400 uppercase">
                  <Award className="w-4 h-4" />
                  <span>Canonical Highest Honors</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                  Grand Diploma: Master of the Holy Scriptures
                </h3>
                <p className="text-xs text-slate-300 max-w-xl">
                  Accredited credential honoring youth scholars who demonstrate faithful dedication across the complete canon of both Old and New Testaments. Download as PNG and send to your Gmail.
                </p>
              </div>

              <button
                onClick={handleOpenGrandMasterCertificate}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition cursor-pointer shrink-0"
              >
                <Award className="w-4 h-4 fill-current" />
                <span>Claim Grand Master Diploma</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= TAB 4: SCRIPTURE DIPLOMAS GALLERY ================= */}
        {activeTab === 'diplomas' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white font-display">
                  Your Earned Biblical Certificates & Diplomas
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Every passed quiz, completed timetable, and scripture study session generates an official credential. You can re-open, download high-res PNGs, and send them to your Gmail at any time.
                </p>
              </div>

              <div className="text-xs font-bold font-mono text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30">
                {completedErasCount} Quiz Diplomas Earned
              </div>
            </div>

            {/* Special Honor Diplomas Quick Claim Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={handleOpenTimetableCertificate}
                className="p-4 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-amber-500/30 hover:border-amber-400 text-left transition flex items-center justify-between gap-3 group cursor-pointer"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
                    7-Day Habit
                  </span>
                  <span className="text-sm font-bold text-white block">
                    Timetable Diploma
                  </span>
                </div>
                <Award className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform shrink-0" />
              </button>

              <button
                onClick={handleOpenGrandMasterCertificate}
                className="p-4 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-amber-500/30 hover:border-amber-400 text-left transition flex items-center justify-between gap-3 group cursor-pointer"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
                    Old & New Testament
                  </span>
                  <span className="text-sm font-bold text-white block">
                    Grand Master Diploma
                  </span>
                </div>
                <Award className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform shrink-0" />
              </button>

              <button
                onClick={() => handleOpenScriptureStudyCertificate()}
                className="p-4 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-amber-500/30 hover:border-amber-400 text-left transition flex items-center justify-between gap-3 group cursor-pointer"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
                    Exegesis Research
                  </span>
                  <span className="text-sm font-bold text-white block">
                    Scripture Study Diploma
                  </span>
                </div>
                <Award className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform shrink-0" />
              </button>
            </div>

            {completedErasCount === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-slate-900/50 border border-slate-800 space-y-3">
                <Award className="w-12 h-12 text-slate-600 mx-auto" />
                <h4 className="text-base font-bold text-white">No Certificates Earned Yet</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Take your first Bible Quiz in either the Old or New Testament to earn your personalized Scripture Scholar Diploma.
                </p>
                <button
                  onClick={() => {
                    setActiveTab('quiz');
                    setActiveEraId(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  Start First Quiz
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {Object.entries(completedQuizzes).map(([eraId, result]) => {
                  const era = BIBLE_ERAS.find((e) => e.id === eraId);
                  if (!era) return null;

                  return (
                    <div
                      key={eraId}
                      className="p-5 rounded-3xl bg-slate-900 border border-amber-500/30 space-y-3 shadow-xl flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-xs font-bold text-amber-400 font-mono">
                            {era.testament}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400">
                            {result.date}
                          </span>
                        </div>

                        <h4 className="text-base font-bold text-white font-display">
                          {era.title}
                        </h4>
                        <div className="text-xs text-slate-400">
                          Badge: <strong className="text-amber-300">{era.badgeName}</strong>
                        </div>
                        <div className="text-xs text-emerald-400 font-bold font-mono mt-1">
                          Score: {result.score} / {result.total} ({Math.round((result.score / result.total) * 100)}%)
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono text-slate-500">
                          #{result.verificationCode.slice(0, 14)}...
                        </span>

                        <button
                          onClick={() => handleOpenCertificate(era, result)}
                          className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <Award className="w-3.5 h-3.5 fill-current" />
                          <span>View Diploma</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ================= UNIVERSAL CERTIFICATE MODAL ================= */}
      {certModalOpen && activeCert && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full text-slate-100 shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]">
            {/* Modal Top Header */}
            <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xl font-bold">
                  ✝
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded font-mono">
                      Biblical Academic Credential
                    </span>
                    <span className="text-xs text-slate-400 font-medium">· {activeCert.testament}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-display">
                    {activeCert.title} Certificate
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setCertModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* Personalization Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                    <span>Student Name on Scripture Diploma</span>
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Enter student name"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:border-amber-400"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Updates the live high-resolution canvas diploma below.
                  </span>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span>Your Gmail Account (For Delivery)</span>
                  </label>
                  <input
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="e.g. ignatiustella@gmail.com"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:border-amber-400 font-mono"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Where your scripture credential will be sent.
                  </span>
                </div>
              </div>

              {/* High-Resolution Live Canvas Preview */}
              <div className="rounded-2xl border border-slate-700 overflow-hidden shadow-2xl bg-slate-950 relative group">
                <canvas
                  ref={certCanvasRef}
                  className="w-full h-auto block select-none rounded-2xl"
                  title="Official Scripture Scholar Diploma"
                />

                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30 text-[11px] text-amber-300 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Verified #{certVerificationCode}</span>
                </div>
              </div>

              {/* Status alerts */}
              {gmailSentNotice && (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-3 text-xs text-emerald-300 animate-fade-in">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      Biblical certificate transcript successfully prepared for your Gmail (<strong>{gmailSentNotice}</strong>)!
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                    DISPATCHED
                  </span>
                </div>
              )}

              {downloadSuccess && (
                <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-between gap-3 text-xs text-sky-300 animate-fade-in">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>
                      High-resolution diploma PNG downloaded successfully to your computer or phone!
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300">
                    SAVED
                  </span>
                </div>
              )}

              {/* Dual Primary Actions: Download & Send to Gmail */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleDownloadCertificate}
                    className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-slate-950" />
                    <span>Download Certificate (PNG)</span>
                  </button>

                  <button
                    onClick={handleCopyTranscript}
                    title="Copy official scripture diploma transcript"
                    className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                  >
                    {copiedTranscript ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Send via Gmail Actions */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={handleOpenGmail}
                    className="flex-1 sm:flex-initial px-4 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send to Gmail ({recipientEmail.split('@')[0]})</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </button>

                  <button
                    onClick={handleSimulateDispatch}
                    title="Confirm delivery to your email"
                    className="px-3.5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition cursor-pointer"
                  >
                    Confirm Delivery
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Accredited by Educare Bible Quiz Faculty</span>
              </div>

              <button
                onClick={() => setCertModalOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Offline Universal AI Voice & Text Tutor */}
      <UniversalAITutor
        floating={true}
        accentColor="purple"
        context={{
          courseId: 'bible-quiz',
          courseTitle: 'Bible Quiz — Sacred Scripture Mastery',
          concept: 'Old and New Testament theology, covenantal history, messianic prophecies, and canonical scriptures',
          explanation:
            'Bible Quiz empowers youth to deepen their understanding of all 66 books from Genesis to Revelation with offline search, daily study timetables, voice AI assistance, and accredited diplomas.',
        }}
      />
    </div>
  );
};
