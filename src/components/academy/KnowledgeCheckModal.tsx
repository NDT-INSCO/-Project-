import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  Award, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  X, 
  Check, 
  ShieldCheck, 
  BrainCircuit, 
  GraduationCap,
  ExternalLink
} from 'lucide-react';
import { Language } from '../../types';
import { CurriculumModule } from '../../data/curriculum/types';
import { 
  KnowledgeQuestion, 
  getKnowledgeCheckForModule, 
  recordKnowledgeCheck 
} from '../../utils/knowledgeCheckService';

export interface KnowledgeCheckModalProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  disciplineId: string;
  levelId: string;
  module: CurriculumModule;
  disciplineTitleAr?: string;
  disciplineTitleEn?: string;
  onLaunchFullQuiz?: (disciplineId: string, levelId: string, moduleId: string) => void;
  onModuleCompleted?: (moduleId: string) => void;
}

export const KnowledgeCheckModal: React.FC<KnowledgeCheckModalProps> = ({
  language,
  isOpen,
  onClose,
  disciplineId,
  levelId,
  module,
  disciplineTitleAr,
  disciplineTitleEn,
  onLaunchFullQuiz,
  onModuleCompleted
}) => {
  const isAr = language === 'ar';

  const [questionData, setQuestionData] = useState<KnowledgeQuestion | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  // Initialize or reset question whenever modal opens or module changes
  useEffect(() => {
    if (isOpen && module) {
      const q = getKnowledgeCheckForModule(
        disciplineId,
        levelId,
        module,
        disciplineTitleAr,
        disciplineTitleEn
      );
      setQuestionData(q);
      setSelectedIndex(null);
      setHasSubmitted(false);
      setShowConfetti(false);
    }
  }, [isOpen, module, disciplineId, levelId, disciplineTitleAr, disciplineTitleEn]);

  if (!isOpen || !questionData) return null;

  const isCorrect = selectedIndex !== null && selectedIndex === questionData.correctIndex;

  const handleSelectOption = (index: number) => {
    if (hasSubmitted) return;
    setSelectedIndex(index);
    setHasSubmitted(true);

    const passed = index === questionData.correctIndex;
    recordKnowledgeCheck(disciplineId, levelId, module.id, passed, index);

    if (passed) {
      setShowConfetti(true);
      if (onModuleCompleted) {
        onModuleCompleted(module.id);
      }
    }
  };

  const handleResetForRetry = () => {
    setSelectedIndex(null);
    setHasSubmitted(false);
    setShowConfetti(false);
  };

  const handleConfirmAndClose = () => {
    if (isCorrect && onModuleCompleted) {
      onModuleCompleted(module.id);
    }
    onClose();
  };

  const optionLetters = isAr ? ['أ', 'ب', 'ج', 'د'] : ['A', 'B', 'C', 'D'];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="knowledge-check-title"
    >
      <div 
        className="relative w-full max-w-2xl bg-[#0c0f26] border-2 border-amber-500/50 rounded-2xl shadow-2xl shadow-amber-500/10 overflow-hidden text-slate-100 my-auto animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Top Decorative Amber Banner */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600" />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#212754] flex items-start justify-between gap-3 bg-[#0f1330]">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-bold font-mono-code">
                <BrainCircuit className="w-3.5 h-3.5 text-amber-400" />
                <span>{isAr ? 'التحقق السريع من الفهم (سؤال واحد)' : '60-Sec Knowledge Check'}</span>
              </span>

              <span className="text-[11px] text-slate-400 font-mono-code">
                {isAr ? questionData.disciplineTitleAr : questionData.disciplineTitleEn}
              </span>
            </div>

            <h3 id="knowledge-check-title" className="text-base sm:text-lg font-black text-white leading-snug">
              {isAr ? module.titleAr : module.titleEn}
            </h3>

            <p className="text-xs text-slate-400">
              {isAr 
                ? 'اختبر مدى استيعابك للمفاهيم الهندسية والمعايير فور الانتهاء من قراءة الوحدة'
                : 'Confirm and reinforce your understanding immediately after reading this curriculum module'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1b2149] transition cursor-pointer shrink-0"
            aria-label={isAr ? 'إغلاق' : 'Close'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Question Box */}
          <div className="p-4 rounded-xl bg-[#13173d] border border-amber-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono-code">
              <span className="text-amber-400 font-bold flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" />
                <span>{isAr ? 'السؤال المستهدف:' : 'Target Question:'}</span>
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-black/40 text-slate-300 border border-[#2b336e]">
                {questionData.codeReference}
              </span>
            </div>

            <p className="text-sm sm:text-base font-bold text-white leading-relaxed">
              {isAr ? questionData.question.ar : questionData.question.en}
            </p>
          </div>

          {/* Multiple Choice Options */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold text-slate-400 flex items-center justify-between">
              <span>{isAr ? 'اختر الإجابة الصحيحة طبقاً للكود والمعايير الهندسية:' : 'Select the correct answer according to code standard:'}</span>
              {hasSubmitted && (
                <span className={`font-mono-code font-bold text-xs ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isCorrect 
                    ? (isAr ? '✓ إجابة صحيحة' : '✓ Correct Answer') 
                    : (isAr ? '✗ إجابة غير دقيقة' : '✗ Incorrect Answer')}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {(isAr ? questionData.options.ar : questionData.options.en).map((opt, idx) => {
                const isSelected = selectedIndex === idx;
                const isThisCorrect = idx === questionData.correctIndex;

                let btnStyles = 'bg-[#10132e] border-[#202758] text-slate-200 hover:border-amber-400/60 hover:bg-[#15193d]';

                if (hasSubmitted) {
                  if (isSelected && isThisCorrect) {
                    btnStyles = 'bg-emerald-950/50 border-emerald-500 text-white shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-500';
                  } else if (isSelected && !isThisCorrect) {
                    btnStyles = 'bg-rose-950/50 border-rose-500 text-rose-100 shadow-lg shadow-rose-500/20 ring-1 ring-rose-500';
                  } else if (!isSelected && isThisCorrect) {
                    btnStyles = 'bg-emerald-950/30 border-emerald-500/60 text-emerald-200 border-dashed';
                  } else {
                    btnStyles = 'bg-[#0d1026] border-[#1b2046] text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={hasSubmitted}
                    className={`w-full text-start p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${btnStyles} ${
                      hasSubmitted ? 'cursor-default' : ''
                    }`}
                  >
                    <div 
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono-code shrink-0 mt-0.5 transition ${
                        isSelected && isThisCorrect
                          ? 'bg-emerald-500 text-slate-950'
                          : isSelected && !isThisCorrect
                          ? 'bg-rose-500 text-white'
                          : hasSubmitted && isThisCorrect
                          ? 'bg-emerald-500/30 text-emerald-300'
                          : 'bg-[#1a204d] text-amber-300 border border-[#2b3474]'
                      }`}
                    >
                      {hasSubmitted ? (
                        isSelected && isThisCorrect ? (
                          <Check className="w-4 h-4 stroke-[3]" />
                        ) : isSelected && !isThisCorrect ? (
                          <X className="w-4 h-4 stroke-[3]" />
                        ) : isThisCorrect ? (
                          <Check className="w-4 h-4 text-emerald-300" />
                        ) : (
                          optionLetters[idx]
                        )
                      ) : (
                        optionLetters[idx]
                      )}
                    </div>

                    <div className="flex-1 text-xs sm:text-sm leading-relaxed">
                      {opt}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Immediate Engineering Feedback Box (Revealed after selection) */}
          {hasSubmitted && (
            <div 
              className={`p-4 sm:p-5 rounded-xl border animate-fadeIn space-y-3 ${
                isCorrect 
                  ? 'bg-[#0b1b1c] border-emerald-500/50 text-slate-200' 
                  : 'bg-[#1b1220] border-amber-500/50 text-slate-200'
              }`}
            >
              {/* Feedback Title */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  {isCorrect ? (
                    <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                      <XCircle className="w-5 h-5 text-rose-400" />
                    </div>
                  )}

                  <div>
                    <h4 className={`text-sm font-black ${isCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {isCorrect 
                        ? (isAr ? 'أحسنت! إجابة صحيحة تؤكد استيعابك للمفهوم' : 'Excellent! Concept Mastered')
                        : (isAr ? 'إجابة غير دقيقة — راجع السند الهندسي أدناه' : 'Not quite — Review the Code Analysis below')}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono-code">
                      {questionData.codeReference}
                    </span>
                  </div>
                </div>

                {isCorrect && (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold font-mono-code flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    <span>{isAr ? 'تم تسجيل إتقان الوحدة' : 'Module Completed'}</span>
                  </span>
                )}
              </div>

              {/* In-depth Engineering Explanation */}
              <div className="p-3 rounded-lg bg-black/40 border border-[#2b3368] text-xs sm:text-sm text-slate-300 leading-relaxed space-y-1.5">
                <div className="font-bold text-amber-300 font-mono-code text-[11px] flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{isAr ? 'التحليل الهندسي والمعياري:' : 'Engineering & Code Analysis:'}</span>
                </div>
                <p>
                  {isAr ? questionData.explanation.ar : questionData.explanation.en}
                </p>
              </div>

              {/* Key Takeaway */}
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold font-mono-code text-[10px] text-amber-400 block">
                    {isAr ? 'خلاصة التطبيق الميداني (Field Takeaway):' : 'Key Field Takeaway:'}
                  </span>
                  <span>{isAr ? questionData.keyTakeaway.ar : questionData.keyTakeaway.en}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-[#212754] bg-[#0c0f24] flex flex-wrap items-center justify-between gap-3">
          <div>
            {!hasSubmitted ? (
              <span className="text-xs text-slate-400">
                {isAr ? 'اختر الإجابة لعرض التحليل الهندسي الفوري' : 'Pick an answer for instant engineering breakdown'}
              </span>
            ) : (
              <div className="flex items-center gap-2">
                {!isCorrect && (
                  <button
                    onClick={handleResetForRetry}
                    className="px-3.5 py-2 rounded-xl bg-[#1a2048] hover:bg-[#222a5e] text-slate-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isAr ? 'إعادة المحاولة' : 'Try Again'}</span>
                  </button>
                )}

                {onLaunchFullQuiz && (
                  <button
                    onClick={() => {
                      onLaunchFullQuiz(disciplineId, levelId, module.id);
                      onClose();
                    }}
                    className="px-3 py-2 rounded-xl bg-[#11173d] hover:bg-[#1a235c] text-sky-300 border border-sky-500/30 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Award className="w-3.5 h-3.5 text-sky-400" />
                    <span>{isAr ? 'خوض الاختبار الشامل' : 'Full Quiz Mode'}</span>
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!hasSubmitted ? (
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-[#141838] hover:bg-[#1c224e] text-slate-400 hover:text-white text-xs font-bold transition cursor-pointer"
              >
                {isAr ? 'تخطي الآن' : 'Skip for Now'}
              </button>
            ) : (
              <button
                onClick={handleConfirmAndClose}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shadow-lg ${
                  isCorrect
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 text-slate-950 font-black shadow-emerald-500/25'
                    : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950'
                }`}
              >
                <span>{isAr ? 'متابعة وإغلاق' : 'Continue Learning'}</span>
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
