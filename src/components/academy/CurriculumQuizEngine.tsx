import React, { useState, useEffect, useMemo } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  HelpCircle, 
  BookOpen, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  ChevronRight, 
  ArrowRight, 
  ArrowLeft, 
  Printer, 
  Clock, 
  Info, 
  FileCheck, 
  GraduationCap,
  Sliders,
  Filter,
  Check,
  RotateCcw,
  Trophy
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language } from '../../types';
import { ENGINEERING_DISCIPLINES } from '../../data/academyCurriculum';
import { CURRICULUM_QUIZ_BANK, CurriculumQuizQuestion } from '../../data/curriculum/curriculumQuizBank';
import { useAuth } from '../../context/AuthContext';
import { markModuleCompleted } from '../../utils/curriculumProgress';
import { submitLeaderboardScore } from '../../utils/quizLeaderboardService';

export interface CurriculumQuizEngineProps {
  language: Language;
  initialDisciplineId?: string;
  initialLevelId?: 'academic' | 'level1' | 'level2' | 'level3';
  initialModuleId?: string;
  initialModuleTitle?: { ar: string; en: string };
  onCloseTargetedQuiz?: () => void;
  onNavigateToDiscipline?: (disciplineId: string) => void;
  onOpenLeaderboard?: () => void;
}

export const CurriculumQuizEngine: React.FC<CurriculumQuizEngineProps> = ({
  language,
  initialDisciplineId,
  initialLevelId,
  initialModuleId,
  initialModuleTitle,
  onCloseTargetedQuiz,
  onNavigateToDiscipline,
  onOpenLeaderboard
}) => {
  const isAr = language === 'ar';
  const { userProfile } = useAuth();

  // Filter States
  const [selectedDisciplineId, setSelectedDisciplineId] = useState<string>(initialDisciplineId || 'all');
  const [selectedLevelId, setSelectedLevelId] = useState<string>(initialLevelId || 'all');
  const [activeModuleId, setActiveModuleId] = useState<string | undefined>(initialModuleId);

  // Quiz Operational State
  const [mode, setMode] = useState<'practice' | 'exam'>('practice');
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [candidateName, setCandidateName] = useState<string>(
    userProfile?.displayName || (isAr ? 'مهندس متدرب / باحث أكاديمي' : 'Certified Engineer / Student')
  );
  const [isReviewMode, setIsReviewMode] = useState<boolean>(false);
  const [quizStartTime, setQuizStartTime] = useState<number>(() => Date.now());
  const [hasSubmittedLeaderboard, setHasSubmittedLeaderboard] = useState<boolean>(false);

  // Sync when props change (e.g. user clicked another module in curriculum)
  useEffect(() => {
    if (initialDisciplineId) setSelectedDisciplineId(initialDisciplineId);
    if (initialLevelId) setSelectedLevelId(initialLevelId);
    if (initialModuleId) {
      setActiveModuleId(initialModuleId);
      setCurrentIdx(0);
      setSelectedAnswers({});
      setShowExplanation(false);
      setIsCompleted(false);
      setIsReviewMode(false);
      setQuizStartTime(Date.now());
      setHasSubmittedLeaderboard(false);
    }
  }, [initialDisciplineId, initialLevelId, initialModuleId]);

  // Filtered Question Pool
  const filteredQuestions = useMemo(() => {
    return CURRICULUM_QUIZ_BANK.filter(q => {
      if (activeModuleId && q.moduleId === activeModuleId) return true;
      if (selectedDisciplineId !== 'all' && q.disciplineId !== selectedDisciplineId) return false;
      if (selectedLevelId !== 'all' && q.levelId !== selectedLevelId) return false;
      return true;
    });
  }, [selectedDisciplineId, selectedLevelId, activeModuleId]);

  // Questions to display (in normal or review mode)
  const displayQuestions = useMemo(() => {
    if (!isReviewMode) return filteredQuestions;
    // Show only incorrectly answered questions in review mode
    return filteredQuestions.filter((q, idx) => {
      const chosen = selectedAnswers[idx];
      return chosen !== undefined && chosen !== q.correctIndex;
    });
  }, [filteredQuestions, isReviewMode, selectedAnswers]);

  const currentQ = displayQuestions[currentIdx] || displayQuestions[0];

  // Score Calculation
  const score = useMemo(() => {
    let correct = 0;
    filteredQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });
    return correct;
  }, [filteredQuestions, selectedAnswers]);

  const percentage = filteredQuestions.length > 0 ? Math.round((score / filteredQuestions.length) * 100) : 0;
  const isPassed = percentage >= 70;

  // Trigger celebration confetti on pass & submit score to Global Leaderboard
  useEffect(() => {
    if (isCompleted) {
      if (isPassed) {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {
          // ignore if not supported
        }

        // Persist passed module to progress tracking
        if (activeModuleId) {
          markModuleCompleted(
            activeModuleId,
            currentQ?.disciplineId || '',
            currentQ?.levelId || '',
            true,
            percentage
          );
        }
      }

      // Auto-submit score to Global Leaderboard if not already submitted
      if (!hasSubmittedLeaderboard && filteredQuestions.length > 0) {
        setHasSubmittedLeaderboard(true);
        const timeSpent = Math.max(15, Math.round((Date.now() - quizStartTime) / 1000));
        const matchedDiscipline = ENGINEERING_DISCIPLINES.find(d => d.id === (currentQ?.disciplineId || selectedDisciplineId));
        
        submitLeaderboardScore({
          userId: userProfile?.userId,
          userName: candidateName,
          userRole: userProfile?.role ? `${userProfile.role.toUpperCase()} Engineer` : (isAr ? 'مهندس فحص وتفتيش' : 'Inspection Specialist'),
          company: userProfile?.company || (isAr ? 'أكاديمية إنسكو الهندسية' : 'INSCO Academy Trainee'),
          country: 'SA',
          disciplineId: currentQ?.disciplineId || selectedDisciplineId || 'general',
          disciplineTitleAr: matchedDiscipline?.titleAr || (isAr ? 'الفحص الهندسي والمعالجة الحرارية' : 'NDT & PWHT Examination'),
          disciplineTitleEn: matchedDiscipline?.titleEn || 'NDT & PWHT Examination',
          levelId: currentQ?.levelId || selectedLevelId || 'level2',
          levelTitleAr: selectedLevelId === 'level3' ? 'المستوى الثالث (Level III)' : selectedLevelId === 'academic' ? 'الأساس الأكاديمي' : 'المستوى الثاني (Level II)',
          levelTitleEn: selectedLevelId === 'level3' ? 'Level III Specialist' : selectedLevelId === 'academic' ? 'Academic Foundation' : 'Level II Inspector',
          score: percentage,
          correctCount: score,
          totalQuestions: filteredQuestions.length,
          timeSpentSeconds: timeSpent
        });
      }
    }
  }, [isCompleted, isPassed, activeModuleId, percentage, currentQ, hasSubmittedLeaderboard, filteredQuestions.length, quizStartTime, candidateName, userProfile, selectedDisciplineId, selectedLevelId, score, isAr]);

  // Handlers
  const handleSelectOption = (optIdx: number) => {
    if (selectedAnswers[currentIdx] !== undefined && mode === 'practice') {
      return; // already answered in practice mode
    }

    setSelectedAnswers(prev => ({
      ...prev,
      [currentIdx]: optIdx
    }));

    if (mode === 'practice') {
      setShowExplanation(true);
    }
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIdx < displayQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    setShowExplanation(false);
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setIsCompleted(false);
    setIsReviewMode(false);
    setQuizStartTime(Date.now());
    setHasSubmittedLeaderboard(false);
  };

  const handleStartReview = () => {
    setIsReviewMode(true);
    setCurrentIdx(0);
    setShowExplanation(true);
    setIsCompleted(false);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  // If no questions match filter
  if (!currentQ || displayQuestions.length === 0) {
    return (
      <div className="bg-[#10132b] p-8 rounded-2xl border-2 border-amber-500/30 text-center space-y-4">
        <HelpCircle className="w-12 h-12 text-amber-400 mx-auto opacity-75" />
        <h4 className="text-xl font-black text-white">
          {isAr ? 'لم يتم العثور على أسئلة مطابقة لهذا الفلتر' : 'No questions found for the selected filter'}
        </h4>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          {isAr
            ? 'يرجى اختيار تخصص آخر أو تحديد "جميع التخصصات" لتصفح بنك الأسئلة الشامل.'
            : 'Please choose another engineering discipline or select "All Disciplines" to view the full question bank.'}
        </p>
        <button
          onClick={() => {
            setSelectedDisciplineId('all');
            setSelectedLevelId('all');
            setActiveModuleId(undefined);
            handleReset();
          }}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer inline-flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{isAr ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Targeted Module Banner if opened from specific syllabus module */}
      {activeModuleId && (
        <div className="bg-gradient-to-r from-amber-500/20 via-[#192252] to-amber-500/10 p-4 sm:p-5 rounded-2xl border-2 border-amber-400/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono-code font-bold text-amber-400 uppercase tracking-wider">
                {isAr ? 'اختبار تقييم فهم الوحدة الدراسية المستهدفة' : 'Targeted Module Understanding Examination'}
              </div>
              <h4 className="text-base sm:text-lg font-black text-white">
                {initialModuleTitle 
                  ? (isAr ? initialModuleTitle.ar : initialModuleTitle.en) 
                  : (isAr ? currentQ.disciplineTitleAr : currentQ.disciplineTitleEn)}
              </h4>
              <div className="text-xs text-slate-300 mt-0.5">
                {isAr ? currentQ.levelNameAr : currentQ.levelNameEn}
              </div>
            </div>
          </div>

          {onCloseTargetedQuiz && (
            <button
              onClick={onCloseTargetedQuiz}
              className="text-xs px-3.5 py-1.5 rounded-xl bg-[#0e1128] hover:bg-[#1a204d] border border-[#26316b] text-slate-300 hover:text-white transition cursor-pointer self-end sm:self-center"
            >
              {isAr ? '← العودة للمنهج' : '← Back to Curriculum'}
            </button>
          )}
        </div>
      )}

      {/* Main Filter & Scope Bar (Visible when not locked to a single module) */}
      {!activeModuleId && (
        <div className="bg-[#0b0c1c] p-4 sm:p-5 rounded-2xl border border-[#212752] space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono-code font-bold text-amber-400 uppercase flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                <span>{isAr ? 'تخصيص نمط الاختبار والشهادة' : 'Exam Configuration & Scope'}</span>
              </span>
              <h3 className="text-lg font-black text-white mt-1">
                {isAr ? 'بنك اختبارات المستوى الأكاديمي، المستوى الثاني والمستوى الثالث' : 'Academic, Level II & Level III Examination Engine'}
              </h3>
            </div>

            {/* Mode Toggle: Practice vs Exam */}
            <div className="flex items-center gap-2 bg-[#121638] p-1.5 rounded-xl border border-[#232a5e] self-start md:self-auto">
              <button
                onClick={() => {
                  setMode('practice');
                  setShowExplanation(selectedAnswers[currentIdx] !== undefined);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  mode === 'practice'
                    ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{isAr ? 'نمط التدريب الفوري' : 'Practice Mode'}</span>
              </button>

              <button
                onClick={() => {
                  setMode('exam');
                  setShowExplanation(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  mode === 'exam'
                    ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{isAr ? 'نمط الاختبار القياسي' : 'Exam Mode'}</span>
              </button>

              {onOpenLeaderboard && (
                <button
                  onClick={onOpenLeaderboard}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 bg-[#171d47] hover:bg-[#202863] text-amber-300 border border-amber-400/40 shadow-sm"
                  title={isAr ? 'عرض لوحة المتصدرين العالمية' : 'View Global Leaderboard'}
                >
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isAr ? 'لوحة المتصدرين' : 'Leaderboard'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Discipline Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2 border-t border-[#1a1f48]">
            {/* Discipline Dropdown */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">
                {isAr ? 'التخصص الهندسي المطلوب:' : 'Select Discipline:'}
              </label>
              <select
                value={selectedDisciplineId}
                onChange={(e) => {
                  setSelectedDisciplineId(e.target.value);
                  handleReset();
                }}
                className="w-full bg-[#121638] border border-[#252c61] focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white outline-none cursor-pointer"
              >
                <option value="all">{isAr ? '⭐ جميع التخصصات (اختبار شامل 360°)' : '⭐ All Disciplines (Comprehensive Exam)'}</option>
                {ENGINEERING_DISCIPLINES.map(d => (
                  <option key={d.id} value={d.id}>
                    {isAr ? d.titleAr : d.titleEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Level Tier Dropdown */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">
                {isAr ? 'المستوى المستهدف للتأهيل:' : 'Curriculum Level:'}
              </label>
              <select
                value={selectedLevelId}
                onChange={(e) => {
                  setSelectedLevelId(e.target.value);
                  handleReset();
                }}
                className="w-full bg-[#121638] border border-[#252c61] focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white outline-none cursor-pointer"
              >
                <option value="all">{isAr ? 'جميع المستويات (أساس + ليفيل 2 + 3)' : 'All Levels (Academic + L2 + L3)'}</option>
                <option value="academic">{isAr ? 'المرحلة الأكاديمية والجامعية للطلاب' : 'Academic & University Stage'}</option>
                <option value="level2">{isAr ? 'المستوى الثاني التطبيقي والميداني (Level II)' : 'Certified Level II Standard'}</option>
                <option value="level3">{isAr ? 'المستوى الثالث والاستشاري والتحكيم (Level III)' : 'Level III Consultant & Authority'}</option>
              </select>
            </div>

            {/* Candidate Name Input */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">
                {isAr ? 'اسم المهندس / المتدرب للشهادة:' : 'Candidate Name for Certificate:'}
              </label>
              <input
                type="text"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                placeholder={isAr ? 'أدخل اسمك الكريم...' : 'Enter your name...'}
                className="w-full bg-[#121638] border border-[#252c61] focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Question Execution Workbench */}
      {!isCompleted ? (
        <div className="bg-[#10132b] p-6 sm:p-8 rounded-2xl border-2 border-amber-500/40 shadow-2xl space-y-6">
          {/* Question Status Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#212752]">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 font-black font-mono-code text-xs">
                {currentIdx + 1} / {displayQuestions.length}
              </span>
              <span className="text-xs font-bold text-slate-300">
                {isAr ? currentQ.disciplineTitleAr : currentQ.disciplineTitleEn}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/30 font-semibold">
                {isAr ? currentQ.levelNameAr : currentQ.levelNameEn}
              </span>
            </div>

            {/* Code Reference Badge */}
            <div className="text-end">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono-code text-amber-400/90 bg-[#0a0c20] px-2.5 py-1 rounded-lg border border-amber-500/30">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentQ.codeReference}</span>
              </span>
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white leading-relaxed">
              {isAr ? currentQ.question.ar : currentQ.question.en}
            </h3>
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            {(isAr ? currentQ.options.ar : currentQ.options.en).map((opt, optIdx) => {
              const isSelected = selectedAnswers[currentIdx] === optIdx;
              const isCorrect = optIdx === currentQ.correctIndex;
              
              let cardStyle = 'bg-[#131738] hover:bg-[#1a204c] border-[#252c63] text-slate-200';
              let badgeStyle = 'bg-[#1e2554] text-slate-300 border-[#323d7d]';

              if (mode === 'practice' && selectedAnswers[currentIdx] !== undefined) {
                if (isCorrect) {
                  cardStyle = 'bg-emerald-950/40 border-emerald-400 text-emerald-100 font-bold';
                  badgeStyle = 'bg-emerald-500 text-slate-950 border-emerald-400 font-black';
                } else if (isSelected) {
                  cardStyle = 'bg-rose-950/40 border-rose-400 text-rose-100';
                  badgeStyle = 'bg-rose-500 text-white border-rose-400 font-black';
                }
              } else if (mode === 'exam' && isSelected) {
                cardStyle = 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold';
                badgeStyle = 'bg-amber-500 text-slate-950 border-amber-400 font-black';
              }

              const letters = ['A', 'B', 'C', 'D'];

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full text-start p-4 rounded-xl border text-xs sm:text-sm transition flex items-center justify-between gap-3 cursor-pointer ${cardStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-lg border text-xs flex items-center justify-center shrink-0 ${badgeStyle}`}>
                      {letters[optIdx]}
                    </span>
                    <span className="leading-relaxed">{opt}</span>
                  </div>

                  {mode === 'practice' && selectedAnswers[currentIdx] !== undefined && (
                    <div className="shrink-0">
                      {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                      {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Practice Mode Deep Explanation Box */}
          {mode === 'practice' && showExplanation && (
            <div className="bg-[#0b0e24] p-5 rounded-2xl border-2 border-amber-500/40 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-amber-400 flex items-center gap-2">
                  <Info className="w-4 h-4 text-amber-400" />
                  <span>{isAr ? 'التحليل الهندسي المعتمد من استشاريي إنسكو:' : 'INSCO Level III Engineering Rationale:'}</span>
                </div>
                <span className="text-[10px] font-mono-code text-slate-400">
                  {currentQ.codeReference}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {isAr ? currentQ.explanation.ar : currentQ.explanation.en}
              </p>

              <div className="pt-2 border-t border-[#1d2557] flex items-center gap-2 text-xs text-emerald-300">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  <strong>{isAr ? 'الخلاصة الميدانية:' : 'Key Takeaway:'} </strong>
                  {isAr ? currentQ.keyTakeaway.ar : currentQ.keyTakeaway.en}
                </span>
              </div>
            </div>
          )}

          {/* Stepper Navigation Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-[#212752]">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="px-4 py-2 rounded-xl bg-[#141838] hover:bg-[#1a2048] disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
              <span>{isAr ? 'السابق' : 'Previous'}</span>
            </button>

            {/* Stepper Dots (only up to 10 visible for neatness) */}
            <div className="hidden sm:flex items-center gap-1.5">
              {displayQuestions.slice(0, 15).map((_, i) => {
                const answered = selectedAnswers[i] !== undefined;
                const isCurrent = currentIdx === i;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentIdx(i);
                      setShowExplanation(mode === 'practice' && selectedAnswers[i] !== undefined);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition cursor-pointer ${
                      isCurrent
                        ? 'bg-amber-400 ring-2 ring-amber-400/50 scale-125'
                        : answered
                        ? 'bg-emerald-500'
                        : 'bg-slate-700 hover:bg-slate-500'
                    }`}
                    title={`Question ${i + 1}`}
                  />
                );
              })}
            </div>

            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentIdx] === undefined}
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md"
            >
              <span>
                {currentIdx < displayQuestions.length - 1
                  ? (isAr ? 'التالي' : 'Next')
                  : (isAr ? 'إنهاء وحساب النتيجة' : 'Finish & View Score')}
              </span>
              <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      ) : (
        /* Results, Performance Dashboard & Digital Certificate */
        <div className="space-y-6 animate-fadeIn">
          {/* Summary Score Card */}
          <div className="bg-[#10132b] p-6 sm:p-8 rounded-2xl border-2 border-amber-500/40 shadow-2xl text-center space-y-6">
            <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center border-4 ${
              isPassed 
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-400 shadow-lg shadow-emerald-500/20' 
                : 'bg-amber-500/20 text-amber-400 border-amber-400 shadow-lg shadow-amber-500/20'
            }`}>
              <Award className="w-10 h-10" />
            </div>

            <div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-mono-code font-bold mb-2 uppercase tracking-wider bg-[#161a3d] text-amber-400 border border-amber-400/30">
                {isPassed 
                  ? (percentage >= 90 ? (isAr ? 'مرتبة الشرف والامتياز - مؤهل للاستشارات' : 'Honors Distinction - Level III Consulting Ready') : (isAr ? 'ناجح - اجتياز معايير المستوى الثاني' : 'Passed - Certified Level II Standard'))
                  : (isAr ? 'يحتاج إلى مراجعة إضافية للمنهج' : 'Academic Review Recommended')}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {isPassed ? (isAr ? 'تهانينا! تم اجتياز الاختبار بنجاح' : 'Congratulations! Exam Passed') : (isAr ? 'نتيجة الاختبار الهندسي' : 'Examination Results')}
              </h3>
              <p className="text-sm text-slate-300 mt-2 max-w-xl mx-auto">
                {isAr
                  ? `أحرزت ${score} من إجمالي ${filteredQuestions.length} أسئلة بنسبة مئوية بلغت ${percentage}%. تم تسجيل النتيجة في سجل تقدمك الأكاديمي.`
                  : `You scored ${score} out of ${filteredQuestions.length} questions (${percentage}%). Your result is logged in your curriculum progress.`}
              </p>
            </div>

            {/* Quick KPI stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto text-center">
              <div className="bg-[#131635] p-3 rounded-xl border border-[#232958]">
                <div className="text-[10px] text-slate-400 font-mono-code">{isAr ? 'النسبة المئوية' : 'PERCENTAGE'}</div>
                <div className={`text-2xl font-black font-mono-code mt-0.5 ${isPassed ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {percentage}%
                </div>
              </div>
              <div className="bg-[#131635] p-3 rounded-xl border border-[#232958]">
                <div className="text-[10px] text-slate-400 font-mono-code">{isAr ? 'الإجابات الصحيحة' : 'CORRECT'}</div>
                <div className="text-2xl font-black font-mono-code text-emerald-400 mt-0.5">
                  {score}
                </div>
              </div>
              <div className="bg-[#131635] p-3 rounded-xl border border-[#232958]">
                <div className="text-[10px] text-slate-400 font-mono-code">{isAr ? 'الإجابات الخاطئة' : 'INCORRECT'}</div>
                <div className="text-2xl font-black font-mono-code text-rose-400 mt-0.5">
                  {filteredQuestions.length - score}
                </div>
              </div>
              <div className="bg-[#131635] p-3 rounded-xl border border-[#232958]">
                <div className="text-[10px] text-slate-400 font-mono-code">{isAr ? 'حالة الاعتماد' : 'STATUS'}</div>
                <div className={`text-base font-black mt-1 ${isPassed ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {isPassed ? (isAr ? 'معتمد' : 'QUALIFIED') : (isAr ? 'إعادة' : 'RETEST')}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-[#1f2552]">
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm cursor-pointer inline-flex items-center gap-2 shadow-md"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{isAr ? 'إعادة الاختبار من جديد' : 'Retake Exam'}</span>
              </button>

              {filteredQuestions.length - score > 0 && (
                <button
                  onClick={handleStartReview}
                  className="px-5 py-2.5 rounded-xl bg-[#161a3f] hover:bg-[#202758] border border-[#293375] text-amber-300 font-bold text-xs sm:text-sm cursor-pointer inline-flex items-center gap-2"
                >
                  <HelpCircle className="w-4 h-4 text-amber-400" />
                  <span>{isAr ? 'مراجعة الأسئلة الخاطئة وتفسيراتها' : 'Review Incorrect Answers'}</span>
                </button>
              )}

              {isPassed && (
                <button
                  onClick={handlePrintCertificate}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm cursor-pointer inline-flex items-center gap-2 shadow-md"
                >
                  <Printer className="w-4 h-4" />
                  <span>{isAr ? 'طباعة / حفظ شهادة الإنجاز' : 'Print / Save Certificate'}</span>
                </button>
              )}

              {onOpenLeaderboard && (
                <button
                  onClick={onOpenLeaderboard}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 border border-amber-400 text-amber-300 font-bold text-xs sm:text-sm cursor-pointer inline-flex items-center gap-2 shadow-sm"
                >
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>{isAr ? 'عرض النتيجة في لوحة المتصدرين' : 'View on Leaderboard'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Verifiable Certificate Card (Shown when passed) */}
          {isPassed && (
            <div className="bg-gradient-to-b from-[#0d0f28] via-[#090b1c] to-[#0d0f28] p-8 sm:p-10 rounded-3xl border-4 border-amber-400/60 shadow-2xl relative overflow-hidden text-center space-y-6 print:border-black print:text-black">
              {/* Background Watermark Crest */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <GraduationCap className="w-96 h-96 text-amber-400" />
              </div>

              {/* Certificate Header */}
              <div className="space-y-2 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/40 text-amber-400 text-xs font-mono-code font-bold uppercase">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>INSCO ACADEMY OFFICIAL VERIFIED CERTIFICATE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-amber-300 tracking-wide">
                  {isAr ? 'شهادة إنجاز واجتياز المعايير الهندسية' : 'Certificate of Engineering Achievement'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  {isAr 
                    ? 'الأكاديمية الدولية للخدمات البترولية والهندسية والفحص غير الإتلافي والمعالجة الحرارية'
                    : 'International for Services & Constructions (INSCO) NDT & PWHT Technical Academy'}
                </p>
              </div>

              {/* Candidate Presentation */}
              <div className="space-y-2 py-4 relative z-10 border-y border-amber-500/20 max-w-2xl mx-auto">
                <div className="text-xs text-slate-400 uppercase tracking-widest font-mono-code">
                  {isAr ? 'تُمنح هذه الشهادة رسمياً إلى المهندس / الباحث:' : 'This Certificate is Proudly Awarded to:'}
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white font-serif tracking-tight border-b-2 border-amber-400/40 pb-2 inline-block px-8">
                  {candidateName}
                </div>
                <p className="text-xs text-slate-300 max-w-lg mx-auto pt-2 leading-relaxed">
                  {isAr
                    ? `تقدير واعتراف باجتياز اختبار التقييم المعرفي بنجاح بمعدل (${percentage}%) في مجال:`
                    : `In formal recognition of successfully passing the theoretical and code qualification assessment with a score of (${percentage}%) in:`}
                </p>
                <div className="text-base sm:text-lg font-bold text-amber-400">
                  {initialModuleTitle
                    ? (isAr ? initialModuleTitle.ar : initialModuleTitle.en)
                    : (selectedDisciplineId !== 'all' 
                        ? (isAr ? currentQ.disciplineTitleAr : currentQ.disciplineTitleEn) 
                        : (isAr ? 'المنهج المتكامل الشامل لكافة فروع الفحص غير الإتلافي والمعالجة الحرارية' : 'Comprehensive Multi-Discipline Engineering Curriculum'))}
                </div>
                <div className="text-xs text-sky-300 font-mono-code">
                  {selectedLevelId !== 'all' ? (isAr ? currentQ.levelNameAr : currentQ.levelNameEn) : 'All Curriculum Levels (Academic, Level II, Level III)'}
                </div>
              </div>

              {/* Verification & Signatures Footer */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 max-w-2xl mx-auto items-end relative z-10 text-xs">
                <div className="text-start">
                  <div className="text-[10px] text-slate-500 uppercase font-mono-code">{isAr ? 'تاريخ المنح' : 'DATE OF ISSUE'}</div>
                  <div className="text-slate-300 font-mono-code font-bold mt-0.5">
                    {new Date().toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">Verified on INSCO Radar</div>
                </div>

                {/* Golden Seal Emblem */}
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full border-2 border-amber-400 bg-amber-400/10 flex items-center justify-center mx-auto shadow-lg shadow-amber-400/20">
                    <Award className="w-8 h-8 text-amber-400" />
                  </div>
                  <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider mt-1">
                    SEAL OF VERIFICATION
                  </div>
                </div>

                <div className="text-end">
                  <div className="text-[10px] text-slate-500 uppercase font-mono-code">{isAr ? 'رقم الشهادة المعتمد' : 'CERTIFICATE ID'}</div>
                  <div className="text-amber-400 font-mono-code font-bold mt-0.5">
                    INSCO-ACAD-{(Date.now() % 1000000).toString().padStart(6, '0')}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">ISO 9001:2015 Accredited</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
