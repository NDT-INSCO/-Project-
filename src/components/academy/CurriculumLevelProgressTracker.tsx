import React, { useState, useEffect, useMemo } from 'react';
import { 
  Award, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  GraduationCap, 
  Wrench, 
  Crown, 
  RotateCcw, 
  ChevronRight, 
  ChevronDown, 
  BookOpen, 
  Check, 
  HelpCircle, 
  Layers, 
  BarChart3, 
  ArrowRight, 
  ArrowLeft,
  Flame,
  ShieldCheck,
  CheckSquare,
  Square
} from 'lucide-react';
import { Language } from '../../types';
import { ENGINEERING_DISCIPLINES, EngineeringDiscipline, DisciplineLevel, CurriculumModule } from '../../data/academyCurriculum';
import { 
  getCompletedModules, 
  toggleModuleCompleted, 
  calculateDetailedLevelProgress, 
  getCurrentLevelSelection, 
  setCurrentLevelSelection, 
  resetLevelProgress, 
  markAllLevelModulesCompleted, 
  PROGRESS_UPDATE_EVENT,
  ModuleProgressRecord,
  DetailedLevelProgress
} from '../../utils/curriculumProgress';
import { 
  isModuleKnowledgeChecked, 
  KNOWLEDGE_CHECK_EVENT 
} from '../../utils/knowledgeCheckService';

export interface CurriculumLevelProgressTrackerProps {
  language: Language;
  onNavigateToModule?: (disciplineId: string, levelIdx: number, moduleId?: string) => void;
  onLaunchQuiz?: (disciplineId: string, levelId: string, moduleId?: string, moduleTitle?: { ar: string; en: string }) => void;
  onNavigateToCertificates?: () => void;
  className?: string;
  defaultExpanded?: boolean;
}

export const CurriculumLevelProgressTracker: React.FC<CurriculumLevelProgressTrackerProps> = ({
  language,
  onNavigateToModule,
  onLaunchQuiz,
  onNavigateToCertificates,
  className = '',
  defaultExpanded = true
}) => {
  const isAr = language === 'ar';

  // Retrieve or sync active discipline & level selection
  const [selection, setSelection] = useState<{ disciplineId: string; levelIdx: number }>(() => getCurrentLevelSelection());
  const [completedModules, setCompletedModules] = useState<Record<string, ModuleProgressRecord>>(() => getCompletedModules());
  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);

  // Sync with global events (storage changes, quiz completion, etc.)
  useEffect(() => {
    const handleProgressUpdate = () => {
      setCompletedModules(getCompletedModules());
      setSelection(getCurrentLevelSelection());
    };

    window.addEventListener(PROGRESS_UPDATE_EVENT, handleProgressUpdate);
    window.addEventListener(KNOWLEDGE_CHECK_EVENT, handleProgressUpdate);
    window.addEventListener('storage', handleProgressUpdate);
    return () => {
      window.removeEventListener(PROGRESS_UPDATE_EVENT, handleProgressUpdate);
      window.removeEventListener(KNOWLEDGE_CHECK_EVENT, handleProgressUpdate);
      window.removeEventListener('storage', handleProgressUpdate);
    };
  }, []);

  // Active discipline
  const activeDiscipline: EngineeringDiscipline = useMemo(() => {
    return ENGINEERING_DISCIPLINES.find(d => d.id === selection.disciplineId) || ENGINEERING_DISCIPLINES[0];
  }, [selection.disciplineId]);

  // Safe active level
  const safeLevelIdx = Math.min(selection.levelIdx, Math.max(0, activeDiscipline.levels.length - 1));
  const activeLevel: DisciplineLevel = activeDiscipline.levels[safeLevelIdx] || activeDiscipline.levels[0];

  // Detailed level progress stats
  const detailedStats: DetailedLevelProgress = useMemo(() => {
    return calculateDetailedLevelProgress(activeLevel, completedModules);
  }, [activeLevel, completedModules]);

  // Handle switching discipline
  const handleSelectDiscipline = (discId: string) => {
    const nextDisc = ENGINEERING_DISCIPLINES.find(d => d.id === discId) || ENGINEERING_DISCIPLINES[0];
    const newLevelIdx = Math.min(selection.levelIdx, nextDisc.levels.length - 1);
    setCurrentLevelSelection(discId, newLevelIdx);
    setSelection({ disciplineId: discId, levelIdx: newLevelIdx });
  };

  // Handle switching level
  const handleSelectLevel = (lvlIdx: number) => {
    setCurrentLevelSelection(selection.disciplineId, lvlIdx);
    setSelection(prev => ({ ...prev, levelIdx: lvlIdx }));
  };

  const isAcademic = activeLevel.levelId === 'academic';
  const isLevel2 = activeLevel.levelId === 'level2' || activeLevel.levelId === 'inspector';
  const isLevel3 = activeLevel.levelId === 'level3' || activeLevel.levelId === 'senior';

  return (
    <div className={`bg-gradient-to-br from-[#0c0f2b] via-[#101438] to-[#090b1e] rounded-2xl border-2 border-amber-500/40 shadow-2xl p-5 sm:p-6 transition-all ${className}`}>
      {/* Top Bar: Header, Discipline Dropdown, and Expand/Collapse Toggle */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#202758]">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/20 shrink-0">
            <BarChart3 className="w-6 h-6 text-slate-950" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-amber-400">
                {isAr ? 'مؤشر تقدم المستوى الدراسي الحالي' : 'CURRENT CURRICULUM LEVEL PROGRESS TRACKER'}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono-code bg-amber-500/10 text-amber-300 border border-amber-400/30">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{isAr ? 'تتبع فوري' : 'Live Tracking'}</span>
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-white mt-0.5 flex flex-wrap items-center gap-2">
              <span>{isAr ? activeDiscipline.titleAr : activeDiscipline.titleEn}</span>
              <span className="text-slate-500 text-xs">•</span>
              <span className={`text-xs sm:text-sm font-bold px-2 py-0.5 rounded-lg border ${
                isAcademic
                  ? 'bg-purple-900/40 text-purple-300 border-purple-500/30'
                  : isLevel3
                  ? 'bg-rose-900/40 text-rose-300 border-rose-500/30'
                  : 'bg-amber-900/40 text-amber-300 border-amber-500/30'
              }`}>
                {isAr ? activeLevel.nameAr : activeLevel.nameEn}
              </span>
            </h3>
          </div>
        </div>

        {/* Discipline Quick Selector + Collapse Toggle */}
        <div className="flex items-center gap-2.5 self-end lg:self-center">
          <div className="relative">
            <select
              aria-label={isAr ? 'اختر التخصص الهندسي' : 'Select Engineering Discipline'}
              value={activeDiscipline.id}
              onChange={(e) => handleSelectDiscipline(e.target.value)}
              className="bg-[#141842] border border-[#2d3778] hover:border-amber-400 text-slate-200 text-xs rounded-xl px-3 py-2 font-bold focus:outline-none focus:ring-2 focus:ring-amber-400 transition cursor-pointer pe-7"
            >
              {ENGINEERING_DISCIPLINES.map(d => (
                <option key={d.id} value={d.id}>
                  {isAr ? d.titleAr : d.titleEn}
                </option>
              ))}
            </select>
          </div>

          {onNavigateToCertificates && (
            <button
              onClick={onNavigateToCertificates}
              className="px-2.5 py-2 rounded-xl bg-gradient-to-r from-amber-500/15 to-amber-600/15 hover:from-amber-500/25 hover:to-amber-600/25 text-amber-300 hover:text-amber-200 border border-amber-400/40 text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shadow-sm"
              title={isAr ? 'عرض الشهادات والشارات الرقمية المكتسبة' : 'View Earned Certificates & Digital Badges'}
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">{isAr ? 'الأوسمة والشهادات' : 'Certificates'}</span>
            </button>
          )}

          <button
            onClick={() => setIsExpanded(prev => !prev)}
            className="p-2 rounded-xl bg-[#141842] hover:bg-[#1f2663] text-slate-300 hover:text-white border border-[#2d3778] text-xs transition cursor-pointer flex items-center gap-1"
            title={isAr ? (isExpanded ? 'طي تفاصيل التقدم' : 'توسيع تفاصيل التقدم') : (isExpanded ? 'Collapse' : 'Expand')}
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Level Tier Switcher Bar (Academic -> Level II -> Level III) */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-mono-code text-slate-400 me-1">
          {isAr ? 'المرحلة التأهيلية:' : 'Qualification Tier:'}
        </span>
        {activeDiscipline.levels.map((lvl, idx) => {
          const isSelected = safeLevelIdx === idx;
          const lvlStats = calculateDetailedLevelProgress(lvl, completedModules);
          const lvlIsAcademic = lvl.levelId === 'academic';
          const lvlIsLevel3 = lvl.levelId === 'level3' || lvl.levelId === 'senior';

          return (
            <button
              key={idx}
              onClick={() => handleSelectLevel(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                isSelected
                  ? lvlIsAcademic
                    ? 'bg-purple-600 text-white font-black shadow-lg shadow-purple-900/40 border border-purple-400'
                    : lvlIsLevel3
                    ? 'bg-rose-600 text-white font-black shadow-lg shadow-rose-900/40 border border-rose-400'
                    : 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20 border border-amber-400'
                  : 'bg-[#12163b] text-slate-300 border border-[#232b62] hover:bg-[#1a2055] hover:text-white'
              }`}
            >
              {lvlIsAcademic && <GraduationCap className="w-3.5 h-3.5" />}
              {!lvlIsAcademic && !lvlIsLevel3 && <Wrench className="w-3.5 h-3.5" />}
              {lvlIsLevel3 && <Crown className="w-3.5 h-3.5" />}
              <span>{isAr ? lvl.nameAr.split('(')[0].trim() : lvl.nameEn.split('(')[0].trim()}</span>
              
              {/* Module count pill */}
              <span className={`text-[10px] font-mono-code font-bold px-1.5 py-0.2 rounded-full ${
                lvlStats.isAllCompleted
                  ? 'bg-emerald-500 text-slate-950 font-black'
                  : isSelected
                  ? 'bg-black/30 text-white'
                  : 'bg-[#090b1e] text-slate-400'
              }`}>
                {lvlStats.isAllCompleted ? '✓ 100%' : `${lvlStats.completed}/${lvlStats.total}`}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main KPI Card: Big Module Completion Counter & Bar */}
      <div className="mt-4 bg-[#080a1c] p-4 sm:p-5 rounded-xl border border-[#232b66] shadow-inner space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono-code uppercase font-bold text-slate-400">
              {isAr ? 'إنجاز الوحدات الدراسية بالمستوى الحالي' : 'MODULES COMPLETED IN CURRENT LEVEL'}
            </div>
            
            <div className="flex items-baseline gap-2.5 mt-1">
              <span className={`text-3xl sm:text-4xl font-black font-mono-code ${
                detailedStats.isAllCompleted ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {detailedStats.completed}
              </span>
              <span className="text-xl sm:text-2xl font-bold text-slate-400">
                / {detailedStats.total} {isAr ? 'وحدات مقررة' : 'Modules'}
              </span>
              <span className={`text-sm sm:text-base font-black font-mono-code ms-2 px-2.5 py-0.5 rounded-lg ${
                detailedStats.isAllCompleted
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
              }`}>
                {detailedStats.percentage}% {isAr ? 'مكتمل' : 'Completed'}
              </span>
            </div>
          </div>

          {/* Quick Action Buttons for Current Level */}
          <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
            {onNavigateToModule && (
              <button
                onClick={() => onNavigateToModule(activeDiscipline.id, safeLevelIdx, detailedStats.nextModule?.id)}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-amber-500/20"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>
                  {detailedStats.isAllCompleted 
                    ? (isAr ? 'استعراض المنهج بالكامل' : 'Review Full Syllabus') 
                    : (isAr ? 'متابعة الوحدة القادمة' : 'Continue Next Module')}
                </span>
                {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            )}

            {onLaunchQuiz && (
              <button
                onClick={() => onLaunchQuiz(activeDiscipline.id, activeLevel.levelId)}
                className="px-3.5 py-2 rounded-xl bg-[#171b48] hover:bg-[#202663] text-amber-300 border border-amber-500/40 font-bold text-xs transition cursor-pointer flex items-center gap-1.5"
                title={isAr ? 'اختبار تقييم المستوى الشامل' : 'Test Full Level Exam'}
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">{isAr ? 'اختبار المستوى' : 'Level Exam'}</span>
              </button>
            )}

            {detailedStats.completed > 0 && (
              <button
                onClick={() => {
                  if (window.confirm(isAr ? 'هل أنت متأكد من رغبتك في إعادة ضبط تقدم هذا المستوى؟' : 'Reset progress for this level?')) {
                    resetLevelProgress(activeLevel.modules.map(m => m.id));
                  }
                }}
                className="p-2 rounded-xl bg-[#141842] hover:bg-rose-950/60 text-slate-400 hover:text-rose-300 border border-[#2a3472] text-xs transition cursor-pointer"
                title={isAr ? 'إعادة ضبط تقدم هذا المستوى' : 'Reset Level Progress'}
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Glowing Progress Bar */}
        <div className="w-full bg-[#050612] h-4 rounded-full border border-[#252f6b] p-0.5 overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-700 shadow-md ${
              detailedStats.isAllCompleted
                ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 shadow-emerald-500/50'
                : isAcademic
                ? 'bg-gradient-to-r from-purple-600 via-indigo-500 to-sky-400 shadow-purple-500/40'
                : isLevel3
                ? 'bg-gradient-to-r from-rose-600 via-amber-500 to-rose-400 shadow-rose-500/40'
                : 'bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300 shadow-amber-500/40'
            }`}
            style={{ width: `${Math.max(detailedStats.percentage, 2)}%` }}
          />
        </div>

        {/* Secondary KPI Badges Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
          <div className="p-2 rounded-lg bg-[#111438] border border-[#202758]">
            <div className="text-[10px] text-slate-400 font-mono-code">{isAr ? 'الوحدات المتبقية' : 'REMAINING'}</div>
            <div className="text-sm font-bold text-white mt-0.5">
              {detailedStats.remaining} {isAr ? 'وحدة' : 'Modules'}
            </div>
          </div>

          <div className="p-2 rounded-lg bg-[#111438] border border-[#202758]">
            <div className="text-[10px] text-slate-400 font-mono-code">{isAr ? 'ساعات التدريب المنجزة' : 'TRAINING HOURS'}</div>
            <div className="text-sm font-bold text-sky-300 mt-0.5">
              {detailedStats.completedHours} / {detailedStats.totalHours} hrs
            </div>
          </div>

          <div className="p-2 rounded-lg bg-[#111438] border border-[#202758]">
            <div className="text-[10px] text-slate-400 font-mono-code">{isAr ? 'اجتياز باختبار الوحدة' : 'PASSED VIA QUIZ'}</div>
            <div className="text-sm font-bold text-emerald-400 mt-0.5">
              {detailedStats.byQuizCount} {isAr ? 'وحدات' : 'Modules'} {detailedStats.avgQuizScore > 0 ? `(${detailedStats.avgQuizScore}%)` : ''}
            </div>
          </div>

          <div className="p-2 rounded-lg bg-[#111438] border border-[#202758]">
            <div className="text-[10px] text-slate-400 font-mono-code">{isAr ? 'دراسة ومراجعة المنهج' : 'STUDIED'}</div>
            <div className="text-sm font-bold text-amber-300 mt-0.5">
              {detailedStats.byStudyCount} {isAr ? 'وحدات' : 'Modules'}
            </div>
          </div>
        </div>

        {/* Milestone Callout or Next Module Alert */}
        {detailedStats.isAllCompleted ? (
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/70 via-[#0e2722] to-emerald-950/70 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-emerald-300 font-bold">
              <Award className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                {isAr
                  ? '🎉 تهانينا! أتممت دراسة كافة الوحدات المقررة لهذا المستوى بنجاح. أنت الآن مؤهل لدخول الاختبار الشامل واستلام الشهادة المعتمدة.'
                  : '🎉 Congratulations! You have successfully completed all modules in this curriculum level.'}
              </span>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 flex-wrap">
              {onNavigateToCertificates && (
                <button
                  onClick={onNavigateToCertificates}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  <Award className="w-3.5 h-3.5 text-slate-950" />
                  <span>{isAr ? 'استعراض الشهادة والشارة' : 'View Certificate & Badge'}</span>
                </button>
              )}

              {onLaunchQuiz && (
                <button
                  onClick={() => onLaunchQuiz(activeDiscipline.id, activeLevel.levelId)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition cursor-pointer shrink-0 shadow-sm"
                >
                  {isAr ? 'دخول الاختبار الشامل والشهادة' : 'Launch Full Level Exam'}
                </button>
              )}
            </div>
          </div>
        ) : detailedStats.nextModule ? (
          <div className="p-3 rounded-xl bg-[#101438] border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
              <span className="text-slate-400">{isAr ? 'الوحدة التالية المستهدفة:' : 'Next Target Module:'}</span>
              <span className="font-bold text-white">
                {isAr ? detailedStats.nextModule.titleAr : detailedStats.nextModule.titleEn}
              </span>
              <span className="text-amber-400/90 font-mono-code text-[11px]">
                ({detailedStats.nextModule.duration})
              </span>
            </div>

            {onNavigateToModule && (
              <button
                onClick={() => onNavigateToModule(activeDiscipline.id, safeLevelIdx, detailedStats.nextModule?.id)}
                className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 self-start sm:self-auto cursor-pointer text-xs"
              >
                <span>{isAr ? 'انتقل إلى الوحدة' : 'Study This Module'}</span>
                {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>
        ) : null}
      </div>

      {/* Expanded Module Step-by-Step Breakdown Grid */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-[#1f2658] space-y-3">
          <div className="flex items-center justify-between text-xs font-mono-code font-bold text-slate-300 uppercase">
            <span>{isAr ? 'خارطة الوحدات المقررة في هذا المستوى:' : 'Module Syllabus Progression in this Level:'}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => markAllLevelModulesCompleted(activeLevel, activeDiscipline.id)}
                className="text-[11px] text-amber-400 hover:text-amber-300 hover:underline cursor-pointer"
              >
                {isAr ? 'تعليم الكل كمكتمل' : 'Mark All Completed'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {activeLevel.modules.map((mod, index) => {
              const record = completedModules[mod.id];
              const isCompleted = Boolean(record);
              const isNext = !isCompleted && detailedStats.nextModule?.id === mod.id;

              return (
                <div
                  key={mod.id}
                  className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                    isCompleted
                      ? 'bg-[#0b1433] border-emerald-500/40 text-slate-200'
                      : isNext
                      ? 'bg-[#151945] border-amber-400/70 text-white shadow-md shadow-amber-500/10'
                      : 'bg-[#0a0d24] border-[#1f2552] text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {/* Completion Checkbox */}
                    <button
                      onClick={() => toggleModuleCompleted(mod.id, activeDiscipline.id, activeLevel.levelId)}
                      className="cursor-pointer shrink-0 transition"
                      title={isAr ? (isCompleted ? 'إلغاء التحديد' : 'تحديد كمكتمل') : (isCompleted ? 'Mark incomplete' : 'Mark complete')}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : isNext ? (
                        <div className="w-5 h-5 rounded-md border-2 border-amber-400 flex items-center justify-center text-[10px] font-black text-amber-400 font-mono-code">
                          {index + 1}
                        </div>
                      ) : (
                        <Square className="w-5 h-5 text-slate-500 hover:text-slate-300" />
                      )}
                    </button>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-mono-code font-bold text-slate-400">
                          M{index + 1}
                        </span>
                        <span className={`text-xs font-bold truncate ${isCompleted ? 'text-slate-200' : isNext ? 'text-white' : 'text-slate-300'}`}>
                          {isAr ? mod.titleAr : mod.titleEn}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-0.5 text-[10px] font-mono-code">
                        <span className="text-amber-400/90">{mod.duration}</span>
                        {isCompleted && (
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            ✓ {record?.byQuiz ? (isAr ? `اختبار (${record.score}%)` : `Quiz (${record.score}%)`) : (isAr ? 'تمت الدراسة' : 'Studied')}
                          </span>
                        )}
                        {isModuleKnowledgeChecked(mod.id) && (
                          <span className="text-amber-300 font-bold flex items-center gap-1">
                            ✓ {isAr ? 'فهم مستوعب' : 'Checked'}
                          </span>
                        )}
                        {isNext && (
                          <span className="text-amber-300 font-bold uppercase tracking-wider">
                            ● {isAr ? 'الوحدة التالية' : 'Up Next'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions on Module */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {onNavigateToModule && (
                      <button
                        onClick={() => onNavigateToModule(activeDiscipline.id, safeLevelIdx, mod.id)}
                        className="px-2 py-1 rounded-lg bg-[#141842] hover:bg-[#1f2663] text-slate-300 hover:text-white border border-[#273273] text-[11px] font-bold cursor-pointer transition"
                        title={isAr ? 'عرض محتوى الوحدة ومخرجاتها' : 'View Module Topics'}
                      >
                        {isAr ? 'دراسة' : 'Study'}
                      </button>
                    )}

                    {onLaunchQuiz && (
                      <button
                        onClick={() => onLaunchQuiz(activeDiscipline.id, activeLevel.levelId, mod.id, { ar: mod.titleAr, en: mod.titleEn })}
                        className="p-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-400/30 text-[11px] cursor-pointer transition"
                        title={isAr ? 'اختبار فهم هذه الوحدة' : 'Take Module Quiz'}
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
