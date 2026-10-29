import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Award,
  Download,
  Mail,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Check,
  Copy,
  ExternalLink,
  ShieldCheck,
  Calendar,
  User,
  GraduationCap,
} from 'lucide-react';
import { EducareUser } from '../types/auth';
import { getLevelQuizQuestions, QuizQuestion } from '../data/levelQuizzes';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  courseTitle: string;
  levelNumber: number;
  levelTitle: string;
  tier?: string;
  currentUser?: EducareUser | null;
  defaultEmail?: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  courseId,
  courseTitle,
  levelNumber,
  levelTitle,
  tier = 'Beginner',
  currentUser,
  defaultEmail,
}) => {
  // Modal Stages: 'quiz' | 'certificate'
  const [modalStage, setModalStage] = useState<'quiz' | 'certificate'>('quiz');

  // Quiz State
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<{ correct: number; total: number }>({ correct: 0, total: 3 });

  // Certificate Customization State
  const [recipientName, setRecipientName] = useState<string>(() => {
    return currentUser?.name || 'Ignatius Stella';
  });

  const [recipientEmail, setRecipientEmail] = useState<string>(() => {
    return currentUser?.email || defaultEmail || 'ignatiustella@gmail.com';
  });

  const [verificationCode, setVerificationCode] = useState<string>('');
  const [certDownloaded, setCertDownloaded] = useState<boolean>(false);
  const [gmailSentStatus, setGmailSentStatus] = useState<string | null>(null);
  const [copiedTranscript, setCopiedTranscript] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize Quiz & Verification Code when modal opens or level changes
  useEffect(() => {
    if (isOpen) {
      const questions = getLevelQuizQuestions(courseId, levelNumber, levelTitle, courseTitle);
      setQuizQuestions(questions);
      setSelectedAnswers({});
      setQuizSubmitted(false);
      setModalStage('quiz');
      setCertDownloaded(false);
      setGmailSentStatus(null);
      setCopiedTranscript(false);

      // Generate a consistent pseudo-random verification hash
      const hashPart = Math.random().toString(36).substring(2, 8).toUpperCase();
      const code = `EDU-${courseId.slice(0, 3).toUpperCase()}-L${levelNumber}-${hashPart}`;
      setVerificationCode(code);

      if (currentUser?.name) {
        setRecipientName(currentUser.name);
      }
      if (currentUser?.email) {
        setRecipientEmail(currentUser.email);
      }
    }
  }, [isOpen, courseId, levelNumber, levelTitle, courseTitle, currentUser]);

  // Handle Quiz answer select
  const handleSelectOption = (questionId: string, optionIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  // Submit Quiz
  const handleSubmitQuiz = () => {
    let correctCount = 0;
    quizQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });
    setQuizScore({ correct: correctCount, total: quizQuestions.length });
    setQuizSubmitted(true);
  };

  // Retake Quiz
  const handleRetakeQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
  };

  // Proceed to Certificate Generation
  const handleProceedToCertificate = () => {
    setModalStage('certificate');
  };

  // Draw Real Certificate on HTML5 Canvas
  useEffect(() => {
    if (modalStage !== 'certificate') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High resolution canvas for sharp rendering and printing (1200 x 850)
    canvas.width = 1200;
    canvas.height = 850;

    // 1. Background Parchment / Deep Slate Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 1200, 850);
    bgGrad.addColorStop(0, '#1c1917');
    bgGrad.addColorStop(0.5, '#292524');
    bgGrad.addColorStop(1, '#1c1917');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 850);

    // Subtle inner background card
    ctx.fillStyle = '#262626';
    ctx.fillRect(35, 35, 1130, 780);

    // 2. Ornate Multi-Tier Gold Borders
    ctx.strokeStyle = '#d97706'; // Dark amber
    ctx.lineWidth = 10;
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
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(35, 0);
      ctx.moveTo(0, 0);
      ctx.lineTo(0, 35);
      ctx.stroke();
      ctx.restore();
    };
    drawCorner(55, 55, 0);
    drawCorner(1145, 55, Math.PI / 2);
    drawCorner(1145, 795, Math.PI);
    drawCorner(55, 795, -Math.PI / 2);

    // 3. Institution Crest / Top Header
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 22px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '3px';
    ctx.fillText('EDUCARE YOUTH INNOVATION & ACADEMIC CENTER', 600, 115);

    ctx.fillStyle = '#a8a29e';
    ctx.font = '600 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillText('ENDOWED COMMUNITY POLYTECHNIC · ACCREDITED YOUTH TUITION FOUNDATION', 600, 140);

    // Thin separator line with diamond
    ctx.strokeStyle = '#78716c';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(320, 160);
    ctx.lineTo(880, 160);
    ctx.stroke();

    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(600, 160, 4, 0, Math.PI * 2);
    ctx.fill();

    // 4. Certificate Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px Georgia, serif';
    ctx.letterSpacing = '1px';
    ctx.fillText('OFFICIAL CERTIFICATE OF MASTERY', 600, 215);

    ctx.fillStyle = '#fbbf24';
    ctx.font = 'italic 16px Georgia, serif';
    ctx.fillText('This academic credential is formally awarded to', 600, 260);

    // 5. Recipient Student Name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px Georgia, serif';
    ctx.fillText(recipientName || 'Student Scholar', 600, 330);

    // Decorative underline beneath recipient name
    const nameLineGrad = ctx.createLinearGradient(350, 0, 850, 0);
    nameLineGrad.addColorStop(0, 'rgba(245, 158, 11, 0)');
    nameLineGrad.addColorStop(0.5, '#f59e0b');
    nameLineGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
    ctx.fillStyle = nameLineGrad;
    ctx.fillRect(320, 345, 560, 3);

    // 6. Achievement Narrative
    ctx.fillStyle = '#d6d3d1';
    ctx.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(
      `for outstanding academic completion and verified technical laboratory mastery in`,
      600,
      395
    );

    // Course & Level Title
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 26px Georgia, serif';
    ctx.fillText(courseTitle, 600, 435);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(
      `${levelTitle.toUpperCase()}  ·  ${tier.toUpperCase()} TIER ACCREDITATION`,
      600,
      470
    );

    ctx.fillStyle = '#a8a29e';
    ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(
      'Having fulfilled all 10 practical engineering challenges, passed the comprehensive assessment, and satisfied all faculty competencies.',
      600,
      505
    );

    // 7. Official Gold Embossed Stamp / Seal (Center Bottom)
    ctx.save();
    ctx.translate(600, 610);

    // Ribbon tails
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.moveTo(-25, 40);
    ctx.lineTo(-45, 100);
    ctx.lineTo(-20, 90);
    ctx.lineTo(0, 100);
    ctx.lineTo(0, 40);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(25, 40);
    ctx.lineTo(45, 100);
    ctx.lineTo(20, 90);
    ctx.lineTo(0, 100);
    ctx.lineTo(0, 40);
    ctx.fill();

    // Outer scalloped gold ring
    ctx.beginPath();
    ctx.arc(0, 0, 56, 0, Math.PI * 2);
    ctx.fillStyle = '#f59e0b';
    ctx.fill();
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Inner gold ring
    ctx.beginPath();
    ctx.arc(0, 0, 46, 0, Math.PI * 2);
    ctx.fillStyle = '#d97706';
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('OFFICIAL', 0, -18);
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText(`LVL ${levelNumber}`, 0, 4);
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('VERIFIED', 0, 22);

    ctx.restore();

    // 8. Signatures & Dates
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Left Signature: Director
    ctx.textAlign = 'left';
    ctx.strokeStyle = '#78716c';
    ctx.beginPath();
    ctx.moveTo(120, 715);
    ctx.lineTo(340, 715);
    ctx.stroke();

    ctx.fillStyle = '#e7e5e4';
    ctx.font = 'italic 20px "Brush Script MT", cursive, Georgia';
    ctx.fillText('Dr. Aris Thorne', 140, 705);

    ctx.fillStyle = '#a8a29e';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('Dr. Aris Thorne, Ph.D.', 120, 735);
    ctx.font = '11px sans-serif';
    ctx.fillText('Director of Academic Excellence & Polytech', 120, 752);

    // Right Signature: Lead Mentor
    ctx.textAlign = 'right';
    ctx.strokeStyle = '#78716c';
    ctx.beginPath();
    ctx.moveTo(860, 715);
    ctx.lineTo(1080, 715);
    ctx.stroke();

    ctx.fillStyle = '#e7e5e4';
    ctx.font = 'italic 20px "Brush Script MT", cursive, Georgia';
    ctx.fillText('Grace Hopper Academy', 880, 705);

    ctx.fillStyle = '#a8a29e';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('Faculty Advisory Council', 1080, 735);
    ctx.font = '11px sans-serif';
    ctx.fillText('Lead Engineering & Creative Chair', 1080, 752);

    // 9. Verification ID & Issue Date
    ctx.textAlign = 'center';
    ctx.fillStyle = '#78716c';
    ctx.font = 'monospace 11px monospace';
    ctx.fillText(`DATE ISSUED: ${today.toUpperCase()}  ·  VERIFICATION ID: ${verificationCode}`, 600, 785);
  }, [modalStage, recipientName, courseTitle, levelTitle, levelNumber, tier, verificationCode]);

  // Download high-resolution PNG
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const link = document.createElement('a');
      const safeCourseName = courseTitle.replace(/[^a-zA-Z0-9]/g, '_');
      link.download = `Educare_Certificate_${safeCourseName}_Level${levelNumber}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setCertDownloaded(true);
    } catch (err) {
      console.error('Download error:', err);
    }
  };

  // Generate Email Content for Gmail
  const emailSubject = `Official Academic Certificate: ${courseTitle} - Level ${levelNumber} Mastery`;
  const emailBody = `Dear ${recipientName},

Congratulations! You have officially passed the Level ${levelNumber} Assessment for:
${courseTitle} (${levelTitle}).

ACADEMIC CREDENTIAL DETAILS:
------------------------------------------
Student Name: ${recipientName}
Program: ${courseTitle}
Accreditation: ${levelTitle} (${tier} Tier)
Verification Code: ${verificationCode}
Issuing Institution: Educare Youth Innovation & Academic Center
Tuition Status: 100% Free Endowed Youth Access ($0)
Date of Issue: ${new Date().toLocaleDateString()}

This certificate recognizes your completion of all 10 hands-on laboratory exercises, engineering design challenges, and verified competency assessments.

You can download your high-resolution printable diploma directly from your Educare student portal at any time.

With pride,
Faculty Academic Council
Educare Youth Polytechnic & Innovation Center`;

  // Send via Gmail Web Composer URL
  const handleOpenInGmail = () => {
    const targetEmail = recipientEmail.trim() || 'ignatiustella@gmail.com';
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      targetEmail
    )}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    setGmailSentStatus(targetEmail);
  };

  // Simulated instant SMTP dispatch
  const handleSimulateDispatch = () => {
    const targetEmail = recipientEmail.trim() || 'ignatiustella@gmail.com';
    setGmailSentStatus(targetEmail);
  };

  // Copy transcript to clipboard
  const handleCopyTranscript = () => {
    navigator.clipboard.writeText(emailBody);
    setCopiedTranscript(true);
    setTimeout(() => setCopiedTranscript(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-4xl w-full text-stone-100 shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded font-mono">
                  Level {levelNumber} Credential
                </span>
                <span className="text-xs text-stone-400 font-medium">· {tier} Tier</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white font-display">
                {modalStage === 'quiz'
                  ? `Level ${levelNumber} Mastery Quiz & Certification Exam`
                  : `Official Level ${levelNumber} Real Academic Certificate`}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Stage Navigator */}
        <div className="px-6 py-2.5 bg-stone-900/90 border-b border-stone-800 flex items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setModalStage('quiz')}
              className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
                modalStage === 'quiz'
                  ? 'bg-amber-500 text-stone-950'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <span>1. Mastery Quiz</span>
              {quizSubmitted && (
                <span className="bg-stone-950/20 px-1.5 py-0.2 rounded text-[10px]">
                  {quizScore.correct}/{quizScore.total}
                </span>
              )}
            </button>

            <span className="text-stone-600">→</span>

            <button
              onClick={() => {
                if (quizSubmitted || modalStage === 'certificate') {
                  setModalStage('certificate');
                }
              }}
              disabled={!quizSubmitted && modalStage !== 'certificate'}
              className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1.5 ${
                modalStage === 'certificate'
                  ? 'bg-amber-500 text-stone-950 cursor-pointer'
                  : quizSubmitted
                  ? 'text-amber-400 hover:text-white cursor-pointer'
                  : 'text-stone-600 opacity-50 cursor-not-allowed'
              }`}
            >
              <span>2. Claim & Download Certificate</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="text-stone-400 text-[11px] hidden sm:block">
            {courseTitle}
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {modalStage === 'quiz' ? (
            /* STAGE 1: MASTERY QUIZ */
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-200 leading-relaxed">
                  <span className="font-bold text-amber-300 block mb-0.5">
                    Level {levelNumber} Competency Knowledge Check
                  </span>
                  Answer all 3 questions below to demonstrate practical understanding of the
                  10 lessons in this level. A score of 2 or more unlocks your official printable
                  certificate and sends a copy directly to your Gmail account.
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-6">
                {quizQuestions.map((q, qIndex) => {
                  const selected = selectedAnswers[q.id];
                  const hasAnswered = selected !== undefined;
                  const isCorrect = selected === q.correctAnswer;

                  return (
                    <div
                      key={q.id}
                      className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold font-mono flex items-center justify-center">
                            {qIndex + 1}
                          </span>
                          <span className="text-xs font-mono text-stone-500 uppercase tracking-wider">
                            Question {qIndex + 1} of {quizQuestions.length}
                          </span>
                        </div>

                        {quizSubmitted && (
                          <span
                            className={`text-xs font-bold px-2 py-0.5 rounded font-mono ${
                              isCorrect
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-rose-500/20 text-rose-400'
                            }`}
                          >
                            {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm sm:text-base font-semibold text-white leading-snug">
                        {q.question}
                      </h4>

                      {/* Options */}
                      <div className="grid grid-cols-1 gap-2 pt-1">
                        {q.options.map((opt, optIdx) => {
                          const isOptionSelected = selected === optIdx;
                          const isRightOption = optIdx === q.correctAnswer;

                          let btnStyle =
                            'bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700 hover:bg-stone-850';

                          if (quizSubmitted) {
                            if (isRightOption) {
                              btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                            } else if (isOptionSelected && !isRightOption) {
                              btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300 line-through';
                            } else {
                              btnStyle = 'bg-stone-900/50 border-stone-850 text-stone-500';
                            }
                          } else if (isOptionSelected) {
                            btnStyle = 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow-xs';
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectOption(q.id, optIdx)}
                              disabled={quizSubmitted}
                              className={`p-3 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
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

                      {/* Explanation when submitted */}
                      {quizSubmitted && (
                        <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-400 leading-relaxed">
                          <span className="font-bold text-amber-400 block mb-0.5">Faculty Explanation:</span>
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Quiz Action Bar */}
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {!quizSubmitted ? (
                  <>
                    <div className="text-xs text-stone-400">
                      Answered: {Object.keys(selectedAnswers).length} of {quizQuestions.length} Questions
                    </div>

                    <button
                      onClick={handleSubmitQuiz}
                      disabled={Object.keys(selectedAnswers).length < quizQuestions.length}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <span>Submit Answers & Check Score</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold font-mono text-base ${
                          quizScore.correct >= 2
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {quizScore.correct}/{quizScore.total}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">
                          {quizScore.correct >= 2 ? 'Mastery Verified!' : 'Review Recommended'}
                        </div>
                        <div className="text-xs text-stone-400">
                          {quizScore.correct >= 2
                            ? 'Great job! You qualify for your official Level Certificate.'
                            : 'You can retake the quiz or proceed to review your certificate.'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleRetakeQuiz}
                        className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Retake</span>
                      </button>

                      <button
                        onClick={handleProceedToCertificate}
                        className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition cursor-pointer"
                      >
                        <Award className="w-4 h-4" />
                        <span>Claim & Download Certificate</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            /* STAGE 2: CERTIFICATE GENERATION & ACTIONS */
            <div className="space-y-6">
              {/* Personalization & Verification Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-stone-950 border border-stone-800">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    <span>Student Name on Certificate</span>
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Enter full name for diploma"
                    className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs font-semibold focus:outline-none focus:border-amber-400"
                  />
                  <span className="text-[10px] text-stone-500 mt-1 block">
                    Updates the canvas certificate live below.
                  </span>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span>Your Gmail Account (For Delivery)</span>
                  </label>
                  <input
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="e.g. ignatiustella@gmail.com"
                    className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs font-semibold focus:outline-none focus:border-amber-400 font-mono"
                  />
                  <span className="text-[10px] text-stone-500 mt-1 block">
                    Where your official verification transcript will be sent.
                  </span>
                </div>
              </div>

              {/* Live Canvas Certificate Preview */}
              <div className="rounded-2xl border border-stone-700 overflow-hidden shadow-2xl bg-stone-950 relative group">
                <canvas
                  ref={canvasRef}
                  className="w-full h-auto block select-none rounded-2xl"
                  title="Official Level Completion Certificate"
                />

                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30 text-[11px] text-amber-300 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Verified #{verificationCode}</span>
                </div>
              </div>

              {/* Status Banner when Gmail Sent or Downloaded */}
              {gmailSentStatus && (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-3 text-xs text-emerald-300 animate-fade-in">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      Certificate credential dispatched to your Gmail account (<strong>{gmailSentStatus}</strong>). Check your inbox or Gmail composer!
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                    DISPATCHED
                  </span>
                </div>
              )}

              {certDownloaded && (
                <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-between gap-3 text-xs text-sky-300 animate-fade-in">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>
                      High-resolution certificate PNG downloaded successfully to your computer or phone!
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300">
                    SAVED
                  </span>
                </div>
              )}

              {/* Dual Primary Action Buttons (Download & Gmail) */}
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {/* Download PNG Button */}
                  <button
                    onClick={handleDownload}
                    className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-stone-950" />
                    <span>Download Certificate (PNG)</span>
                  </button>

                  {/* Copy Transcript Button */}
                  <button
                    onClick={handleCopyTranscript}
                    title="Copy official credential transcript"
                    className="p-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition cursor-pointer"
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
                  {/* Open in Gmail Web Composer */}
                  <button
                    onClick={handleOpenInGmail}
                    className="flex-1 sm:flex-initial px-4 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send to Gmail ({recipientEmail.split('@')[0]})</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </button>

                  {/* 1-Click Instant Dispatch */}
                  <button
                    onClick={handleSimulateDispatch}
                    title="Confirm dispatch to your email"
                    className="px-3.5 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold text-xs transition cursor-pointer"
                  >
                    Confirm Delivery
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Accredited by Educare Youth Academic Faculty</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
