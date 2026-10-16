import React, { useState, useEffect, useMemo } from 'react';
import { 
  BookOpen, 
  Layers, 
  Award, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Search, 
  ChevronRight, 
  ChevronDown, 
  ShieldCheck, 
  Sparkles, 
  Compass, 
  Wrench, 
  GraduationCap, 
  Crown, 
  Calculator, 
  BookMarked,
  Library,
  ArrowRight,
  HelpCircle,
  Check,
  X,
  BarChart3,
  RotateCcw,
  Square,
  CheckSquare
} from 'lucide-react';
import { Language } from '../../types';
import { ENGINEERING_DISCIPLINES, EngineeringDiscipline, DisciplineLevel, CurriculumModule } from '../../data/academyCurriculum';
import { CurriculumQuizEngine } from './CurriculumQuizEngine';
import { 
  getCompletedModules, 
  toggleModuleCompleted, 
  calculateLevelProgress, 
  calculateDisciplineProgress, 
  calculateDetailedLevelProgress,
  getCurrentLevelSelection,
  setCurrentLevelSelection,
  markAllLevelModulesCompleted,
  PROGRESS_UPDATE_EVENT, 
  resetLevelProgress, 
  ModuleProgressRecord 
} from '../../utils/curriculumProgress';

interface DisciplineCurriculumViewProps {
  language: Language;
  initialDisciplineId?: string;
  initialLevelIdx?: number;
  initialTargetModuleId?: string;
  onSelectWorkshop?: (workshopId: string) => void;
  onLaunchQuiz?: (
    disciplineId: string,
    levelId?: string,
    moduleId?: string,
    moduleTitle?: { ar: string; en: string }
  ) => void;
}

export const DisciplineCurriculumView: React.FC<DisciplineCurriculumViewProps> = ({ 
  language,
  initialDisciplineId,
  initialLevelIdx,
  initialTargetModuleId,
  onSelectWorkshop,
  onLaunchQuiz
}) => {
  const isAr = language === 'ar';
  
  const savedPref = getCurrentLevelSelection();
  const [selectedDisciplineId, setSelectedDisciplineId] = useState<string>(
    initialDisciplineId || savedPref.disciplineId || ENGINEERING_DISCIPLINES[0].id
  );
  const [selectedLevelIdx, setSelectedLevelIdx] = useState<number>(
    initialLevelIdx !== undefined ? initialLevelIdx : (savedPref.levelIdx || 0)
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(initialTargetModuleId || null);
  const [tierFilter, setTierFilter] = useState<'all' | 'academic' | 'level2' | 'level3'>('all');
  const [moduleFilter, setModuleFilter] = useState<'all' | 'completed' | 'pending'>('all');

  // React to prop changes (e.g. from global progress tracker navigation)
  useEffect(() => {
    if (initialDisciplineId) setSelectedDisciplineId(initialDisciplineId);
    if (initialLevelIdx !== undefined) setSelectedLevelIdx(initialLevelIdx);
    if (initialTargetModuleId) {
      setExpandedModuleId(initialTargetModuleId);
      setTimeout(() => {
        const el = document.getElementById(`module-${initialTargetModuleId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 200);
    }
  }, [initialDisciplineId, initialLevelIdx, initialTargetModuleId]);

  // Track completed modules map from localStorage with reactive synchronization
  const [completedModules, setCompletedModules] = useState<Record<string, ModuleProgressRecord>>(() => getCompletedModules());

  useEffect(() => {
    const handleProgressChange = () => {
      setCompletedModules(getCompletedModules());
    };

    window.addEventListener(PROGRESS_UPDATE_EVENT, handleProgressChange);
    window.addEventListener('storage', handleProgressChange);
    return () => {
      window.removeEventListener(PROGRESS_UPDATE_EVENT, handleProgressChange);
      window.removeEventListener('storage', handleProgressChange);
    };
  }, []);

  // Modal State for instant targeted module quiz
  const [modalQuizTarget, setModalQuizTarget] = useState<{
    disciplineId: string;
    levelId: 'academic' | 'level1' | 'level2' | 'level3';
    moduleId: string;
    moduleTitle: { ar: string; en: string };
  } | null>(null);

  // Quick Formula Interactive Calculator State
  const [calcWavelengthV, setCalcWavelengthV] = useState<number>(5920); // m/s in steel
  const [calcWavelengthF, setCalcWavelengthF] = useState<number>(4); // MHz
  const calcWavelengthResult = (calcWavelengthV / (calcWavelengthF * 1000)).toFixed(2); // mm

  const [calcHeatInputV, setCalcHeatInputV] = useState<number>(24); // Volts
  const [calcHeatInputI, setCalcHeatInputI] = useState<number>(140); // Amps
  const [calcHeatInputSpeed, setCalcHeatInputSpeed] = useState<number>(180); // mm/min
  const [calcHeatInputEff, setCalcHeatInputEff] = useState<number>(0.8); // SMAW
  const calcHeatInputResult = (((calcHeatInputV * calcHeatInputI * 60) / (calcHeatInputSpeed * 1000)) * calcHeatInputEff).toFixed(2); // kJ/mm

  // Active discipline
  const activeDiscipline = ENGINEERING_DISCIPLINES.find(d => d.id === selectedDisciplineId) || ENGINEERING_DISCIPLINES[0];
  
  // Safe level index
  const safeLevelIdx = Math.min(selectedLevelIdx, activeDiscipline.levels.length - 1);
  const activeLevel = activeDiscipline.levels[safeLevelIdx];

  // Compute progress for active level and active discipline
  const activeLevelProgress = useMemo(() => {
    return calculateLevelProgress(activeLevel, completedModules);
  }, [activeLevel, completedModules]);

  const detailedLevelStats = useMemo(() => {
    return calculateDetailedLevelProgress(activeLevel, completedModules);
  }, [activeLevel, completedModules]);

  const activeDisciplineProgress = useMemo(() => {
    return calculateDisciplineProgress(activeDiscipline, completedModules);
  }, [activeDiscipline, completedModules]);

  const handleSelectDiscipline = (dId: string) => {
    setSelectedDisciplineId(dId);
    const disc = ENGINEERING_DISCIPLINES.find(item => item.id === dId) || ENGINEERING_DISCIPLINES[0];
    const newLvl = Math.min(selectedLevelIdx, disc.levels.length - 1);
    setSelectedLevelIdx(newLvl);
    setCurrentLevelSelection(dId, newLvl);
  };

  const handleSelectLevelIdx = (idx: number) => {
    setSelectedLevelIdx(idx);
    setCurrentLevelSelection(selectedDisciplineId, idx);
  };

  // Filter disciplines by search query
  const filteredDisciplines = ENGINEERING_DISCIPLINES.filter(d => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      d.titleAr.toLowerCase().includes(q) ||
      d.titleEn.toLowerCase().includes(q) ||
      d.keyTechniques.some(t => t.toLowerCase().includes(q)) ||
      d.globalAccreditations.some(a => a.toLowerCase().includes(q))
    );
  });

  const handleTierFilterClick = (tier: 'all' | 'academic' | 'level2' | 'level3') => {
    setTierFilter(tier);
    if (tier === 'all') return;
    
    // Switch active level to match tier
    const foundIdx = activeDiscipline.levels.findIndex(l => l.tierCategory === tier || l.levelId === tier);
    if (foundIdx !== -1) {
      handleSelectLevelIdx(foundIdx);
    }
  };

  const toggleModule = (modId: string) => {
    setExpandedModuleId(prev => prev === modId ? null : modId);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0b0c1c] via-[#12163b] to-[#0b0c1c] p-6 sm:p-8 rounded-2xl border-2 border-amber-500/30 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-400 font-bold text-xs uppercase tracking-wider mb-3">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>{isAr ? 'الموسوعة والمنهج التعليمي المتكامل من البداية للنهاية' : 'Comprehensive Engineering Curriculum (Full Science Progression)'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
              {isAr ? (
                <>
                  العلوم الهندسية <span className="text-amber-400">من الأساس الأكاديمي والجامعي إلى المستوى الثاني والثالث</span>
                </>
              ) : (
                <>
                  Engineering Science: <span className="text-amber-400">From University Foundations to Level II & Level III</span>
                </>
              )}
            </h3>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">
              {isAr
                ? 'منهج علمي وتطبيقي شامل يغطي 8 تخصصات هندسية من فيزياء الموجات والمعادن الجامعية للطلاب، إلى مهارات وتطبيقات المستوى الثاني للمفتشين المعتمدين، وصولاً إلى التحكيم الهندسي واعتماد الإجراءات الاستشارية للمستوى الثالث.'
                : 'Comprehensive curriculum across 8 disciplines: from academic wave physics and metallurgy taught in engineering faculties, to practical Level II code evaluation, up to Level III consulting and procedure approvals.'}
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="w-full lg:w-80">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={isAr ? 'ابحث عن تقنية، كود، أو شهادة...' : 'Search discipline, method, code...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0a0d24] border border-[#232958] focus:border-amber-400 rounded-xl ps-10 pe-4 py-2.5 text-xs text-white placeholder-slate-400 transition outline-none"
              />
            </div>
          </div>
        </div>

        {/* Global Level Tier Navigation Tabs (Academic / Level 2 / Level 3) */}
        <div className="mt-6 pt-5 border-t border-[#1f2552] flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono-code font-bold text-slate-400 me-2">
            {isAr ? 'المسار التعليمي المستهدف:' : 'Curriculum Tier:'}
          </span>

          <button
            onClick={() => handleTierFilterClick('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              tierFilter === 'all'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                : 'bg-[#121535] text-slate-300 border border-[#222858] hover:bg-[#1a1f48] hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isAr ? 'جميع المستويات (المنظومة الكاملة)' : 'All 3 Levels'}</span>
          </button>

          <button
            onClick={() => handleTierFilterClick('academic')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              tierFilter === 'academic'
                ? 'bg-purple-600 text-white font-black shadow-lg shadow-purple-900/30 ring-2 ring-purple-400/50'
                : 'bg-[#121535] text-purple-300 border border-purple-500/30 hover:bg-[#1c1840] hover:text-purple-200'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
            <span>{isAr ? '🎓 التعليم الجامعي والأكاديمي (University Science)' : '🎓 Academic & University Science'}</span>
          </button>

          <button
            onClick={() => handleTierFilterClick('level2')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              tierFilter === 'level2'
                ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/25 ring-2 ring-amber-400/50'
                : 'bg-[#121535] text-amber-300 border border-amber-500/30 hover:bg-[#1f1d38] hover:text-amber-200'
            }`}
          >
            <Wrench className="w-3.5 h-3.5 text-amber-400" />
            <span>{isAr ? '🛠️ المستوى الثاني المهني المعتمد (Level II Inspector)' : '🛠️ Level II Certified Inspector'}</span>
          </button>

          <button
            onClick={() => handleTierFilterClick('level3')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              tierFilter === 'level3'
                ? 'bg-rose-600 text-white font-black shadow-lg shadow-rose-900/30 ring-2 ring-rose-400/50'
                : 'bg-[#121535] text-rose-300 border border-rose-500/30 hover:bg-[#25152a] hover:text-rose-200'
            }`}
          >
            <Crown className="w-3.5 h-3.5 text-rose-400" />
            <span>{isAr ? '👑 المستوى الثالث الاستشاري (Level III Consultant)' : '👑 Level III Principal Consultant'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Discipline List + Right Level & Curriculum Syllabus */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Disciplines Navigation (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono-code text-slate-400 px-1">
            <span>{isAr ? 'المجالات الهندسية الـ 8' : '8 CORE DISCIPLINES'}</span>
            <span>{filteredDisciplines.length} Available</span>
          </div>

          <div className="space-y-2.5">
            {filteredDisciplines.map((discipline) => {
              const isSelected = selectedDisciplineId === discipline.id;
              return (
                <button
                  key={discipline.id}
                  onClick={() => {
                    handleSelectDiscipline(discipline.id);
                    // Retain tier category if possible
                    if (tierFilter !== 'all') {
                      const idx = discipline.levels.findIndex(l => l.tierCategory === tierFilter || l.levelId === tierFilter);
                      handleSelectLevelIdx(idx !== -1 ? idx : 0);
                    } else {
                      handleSelectLevelIdx(0);
                    }
                  }}
                  className={`w-full text-start p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1a204d] border-amber-400 text-white shadow-xl shadow-amber-500/10 ring-2 ring-amber-500/20'
                      : 'bg-[#0b0c1c] border-[#202652] text-slate-300 hover:bg-[#131633] hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono-code uppercase px-2 py-0.5 rounded font-bold bg-[#111432] text-amber-300 border border-[#272e61]">
                      {discipline.category.replace('_', ' ')}
                    </span>
                    <span className="text-xs font-mono-code text-slate-400 flex items-center gap-1">
                      <span>{discipline.levels.length}</span>
                      <span className="text-[10px] text-amber-400/80">{isAr ? 'مراحل (أكاديمي + L2 + L3)' : 'Tiers'}</span>
                    </span>
                  </div>

                  <div className="font-bold text-sm leading-snug">
                    {isAr ? discipline.titleAr : discipline.titleEn}
                  </div>

                  {/* Badges preview */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {discipline.keyTechniques.slice(0, 3).map((tech, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-black/40 text-slate-300 border border-[#232958]">
                        {tech.split('(')[0].trim()}
                      </span>
                    ))}
                    {discipline.keyTechniques.length > 3 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-slate-400">
                        +{discipline.keyTechniques.length - 3}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Col: Active Discipline Details & Level Tabs (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Discipline Top Card */}
          <div className="bg-[#0b0c1c] p-6 rounded-2xl border border-[#232958] shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#212752] pb-4">
              <div>
                <span className="text-[11px] font-mono-code text-amber-400 font-bold uppercase tracking-wider">
                  DISCIPLINE DOSSIER
                </span>
                <h4 className="text-2xl font-black text-white mt-0.5">
                  {isAr ? activeDiscipline.titleAr : activeDiscipline.titleEn}
                </h4>
              </div>

              {/* Accreditations tags */}
              <div className="flex flex-wrap gap-1.5">
                {activeDiscipline.globalAccreditations.map((acc, i) => (
                  <span key={i} className="text-xs font-mono-code px-2.5 py-1 rounded-lg bg-[#151940] text-sky-300 border border-sky-500/30 font-bold">
                    {acc}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              {isAr ? activeDiscipline.overviewAr : activeDiscipline.overviewEn}
            </p>

            {/* Techniques & Industries */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-[#121535] p-3.5 rounded-xl border border-[#212752]">
                <div className="font-bold text-amber-400 mb-1.5 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5" />
                  <span>{isAr ? 'التقنيات والمناهج المعتمدة:' : 'Methods & Techniques Covered:'}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeDiscipline.keyTechniques.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-[#090b1c] text-slate-200 border border-[#232958]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-[#121535] p-3.5 rounded-xl border border-[#212752]">
                <div className="font-bold text-amber-400 mb-1.5 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span>{isAr ? 'الصناعات والقطاعات المستهدفة:' : 'Target Industrial Sectors:'}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeDiscipline.targetIndustries.map((ind, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-[#090b1c] text-slate-200 border border-[#232958]">
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Qualification Level Switcher (The 3 Core Tiers) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono-code text-slate-400 px-1">
              <span>{isAr ? 'اختر المرحلة التأهيلية (أكاديمي / المستوى الثاني / المستوى الثالث):' : 'SELECT QUALIFICATION TIER:'}</span>
              <span className="text-amber-400 font-bold">
                {activeLevel.nameAr.split('(')[0]}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {activeDiscipline.levels.map((lvl, idx) => {
                const isLvlSelected = safeLevelIdx === idx;
                const isAcademic = lvl.levelId === 'academic';
                const isLevel2 = lvl.levelId === 'level2' || lvl.levelId === 'inspector';
                const isLevel3 = lvl.levelId === 'level3' || lvl.levelId === 'senior';

                const lvlProg = calculateLevelProgress(lvl, completedModules);

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectLevelIdx(idx)}
                    className={`p-3.5 rounded-xl border transition cursor-pointer text-start flex flex-col justify-between ${
                      isLvlSelected
                        ? isAcademic
                          ? 'bg-purple-600 text-white font-black border-purple-400 shadow-lg shadow-purple-900/40'
                          : isLevel3
                          ? 'bg-rose-600 text-white font-black border-rose-400 shadow-lg shadow-rose-900/40'
                          : 'bg-amber-500 text-slate-950 font-black border-amber-400 shadow-lg shadow-amber-500/20'
                        : 'bg-[#10132b] text-slate-300 border-[#232958] hover:bg-[#171c45]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5 gap-2">
                      <div className="text-[10px] font-mono-code uppercase opacity-90 flex items-center gap-1 font-bold">
                        {isAcademic && <GraduationCap className="w-3.5 h-3.5" />}
                        {isLevel2 && <Wrench className="w-3.5 h-3.5" />}
                        {isLevel3 && <Crown className="w-3.5 h-3.5" />}
                        <span>
                          {isAcademic ? 'ACADEMIC TIER' : isLevel3 ? 'LEVEL III / CONSULTANT' : 'LEVEL II / INSPECTOR'}
                        </span>
                      </div>

                      {/* Mini level completion badge */}
                      <span className={`text-[10px] font-mono-code font-bold px-1.5 py-0.5 rounded shrink-0 ${
                        lvlProg.isAllCompleted
                          ? 'bg-emerald-500 text-slate-950 font-black'
                          : isLvlSelected
                          ? 'bg-black/30 text-white'
                          : 'bg-[#0a0d24] text-slate-300 border border-[#232958]'
                      }`}>
                        {lvlProg.isAllCompleted ? '✓ 100%' : `${lvlProg.completed}/${lvlProg.total} (${lvlProg.percentage}%)`}
                      </span>
                    </div>

                    <div className="text-xs font-bold leading-tight">
                      {isAr ? lvl.nameAr : lvl.nameEn}
                    </div>

                    <div className="text-[10px] opacity-75 mt-1.5 line-clamp-1">
                      {isAr ? lvl.targetRoleAr : lvl.targetRoleEn}
                    </div>

                    {/* Progress mini-bar */}
                    <div className="w-full bg-black/30 h-1.5 rounded-full mt-2.5 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          lvlProg.isAllCompleted ? 'bg-emerald-400' : isLvlSelected ? 'bg-white' : 'bg-amber-400'
                        }`}
                        style={{ width: `${lvlProg.percentage}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Level Full Syllabus & Dossier */}
          {activeLevel && (
            <div className="bg-[#0b0c1c] p-6 rounded-2xl border border-[#232958] shadow-2xl space-y-6">
              {/* Level Title & Summary */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#212752]">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono-code font-bold mb-1">
                    {activeLevel.levelId === 'academic' ? (
                      <span className="text-purple-400 flex items-center gap-1">
                        <GraduationCap className="w-4 h-4" />
                        <span>UNIVERSITY & ACADEMIC ENGINEERING CURRICULUM</span>
                      </span>
                    ) : activeLevel.levelId === 'level3' || activeLevel.levelId === 'senior' ? (
                      <span className="text-rose-400 flex items-center gap-1">
                        <Crown className="w-4 h-4" />
                        <span>LEVEL III PRINCIPAL CONSULTANT SPECIFICATION</span>
                      </span>
                    ) : (
                      <span className="text-amber-400 flex items-center gap-1">
                        <Wrench className="w-4 h-4" />
                        <span>CERTIFIED LEVEL II INSPECTION SPECIFICATION</span>
                      </span>
                    )}
                  </div>

                  <h4 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                    {isAr ? activeLevel.nameAr : activeLevel.nameEn}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                    {isAr ? activeLevel.targetRoleAr : activeLevel.targetRoleEn}
                  </p>
                  {activeLevel.academicStageAr && (
                    <div className="mt-2 text-xs font-semibold text-sky-300 bg-[#12193b] p-2 rounded-lg border border-sky-500/20">
                      {isAr ? activeLevel.academicStageAr : activeLevel.academicStageEn}
                    </div>
                  )}
                </div>

                {/* Stats Chips */}
                <div className="flex items-center gap-3">
                  <div className="text-center p-2.5 rounded-xl bg-[#131633] border border-[#232958]">
                    <div className="text-[10px] text-slate-400 uppercase font-mono-code">{isAr ? 'ساعات التدريب' : 'TRAINING'}</div>
                    <div className="text-sm font-mono-code font-black text-amber-400">{activeLevel.trainingHours} hrs</div>
                  </div>
                  <div className="text-center p-2.5 rounded-xl bg-[#131633] border border-[#232958]">
                    <div className="text-[10px] text-slate-400 uppercase font-mono-code">{isAr ? 'الخبرة الميدانية' : 'EXPERIENCE'}</div>
                    <div className="text-sm font-mono-code font-black text-sky-400">{activeLevel.experienceMonths} mos</div>
                  </div>
                </div>
              </div>

              {/* Prerequisites & Codes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-[#121638] p-4 rounded-xl border border-[#232958]">
                  <div className="font-bold text-amber-400 mb-1.5 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>{isAr ? 'شروط الالتحاق والتأهيل المسبق:' : 'Eligibility & Prerequisites:'}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {isAr ? activeLevel.prerequisitesAr : activeLevel.prerequisitesEn}
                  </p>
                </div>

                <div className="bg-[#121638] p-4 rounded-xl border border-[#232958]">
                  <div className="font-bold text-sky-400 mb-1.5 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-sky-400" />
                    <span>{isAr ? 'الأكواد والمواصفات الحاكمة للمستوى:' : 'Governing Standards & Codes:'}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {activeLevel.applicableCodes.map((code, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-[#0b0c1c] text-sky-200 border border-sky-500/30 font-mono-code text-[11px]">
                        {code}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Responsibilities List */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{isAr ? 'المهام والصلاحيات الهندسية المعتمدة لهذا المستوى:' : 'Authorized Engineering Scope & Duties:'}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(isAr ? activeLevel.responsibilitiesAr : activeLevel.responsibilitiesEn).map((resp, i) => (
                    <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-[#10132b] border border-[#1f2550] text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current Level Progress Tracking Widget */}
              <div className="bg-gradient-to-r from-[#11163a] via-[#0c0f2a] to-[#11163a] p-4 sm:p-5 rounded-2xl border-2 border-amber-400/40 shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-black shrink-0">
                      <BarChart3 className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono-code uppercase font-bold text-amber-400 tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>{isAr ? 'مؤشر إنجاز المستوى الدراسي الحالي' : 'CURRENT LEVEL MODULE PROGRESSION'}</span>
                      </div>
                      <h5 className="text-sm sm:text-base font-black text-white mt-0.5">
                        {isAr
                          ? `تم إنجاز ${detailedLevelStats.completed} من أصل ${detailedLevelStats.total} وحدات مقررة`
                          : `Completed ${detailedLevelStats.completed} of ${detailedLevelStats.total} Curriculum Modules`}
                      </h5>
                    </div>
                  </div>

                  {/* Percentage Counter, Mark All Done, & Quick Reset */}
                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <div className="text-end">
                      <span className={`text-2xl sm:text-3xl font-black font-mono-code ${
                        detailedLevelStats.isAllCompleted ? 'text-emerald-400' : 'text-amber-400'
                      }`}>
                        {detailedLevelStats.percentage}%
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {!detailedLevelStats.isAllCompleted && (
                        <button
                          onClick={() => {
                            if (window.confirm(isAr ? 'هل ترغب في تعليم كافة وحدات هذا المستوى كمكتملة؟' : 'Mark all modules in this level as completed?')) {
                              markAllLevelModulesCompleted(activeLevel, activeDiscipline.id);
                            }
                          }}
                          className="px-2.5 py-1.5 rounded-xl bg-[#151c4a] hover:bg-[#1d2766] text-amber-300 border border-[#2b3985] text-xs font-bold transition cursor-pointer"
                          title={isAr ? 'تعليم جميع الوحدات كمكتملة' : 'Mark All Completed'}
                        >
                          {isAr ? 'إكمال الكل' : 'Complete All'}
                        </button>
                      )}

                      {detailedLevelStats.completed > 0 && (
                        <button
                          onClick={() => {
                            if (window.confirm(isAr ? 'هل أنت متأكد من رغبتك في إعادة ضبط تقدم هذا المستوى؟' : 'Reset module progress for this level?')) {
                              resetLevelProgress(activeLevel.modules.map(m => m.id));
                            }
                          }}
                          className="p-2 rounded-xl bg-[#181d45] hover:bg-rose-950/60 text-slate-400 hover:text-rose-300 border border-[#273273] text-xs transition cursor-pointer"
                          title={isAr ? 'إعادة ضبط تقدم المستوى' : 'Reset Level Progress'}
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Animated Glowing Progress Bar */}
                <div className="w-full bg-[#070918] h-3.5 rounded-full border border-[#232958] p-0.5 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-700 shadow-sm ${
                      detailedLevelStats.isAllCompleted
                        ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 shadow-emerald-500/50'
                        : activeLevel.levelId === 'academic'
                        ? 'bg-gradient-to-r from-purple-600 via-indigo-500 to-sky-400 shadow-purple-500/40'
                        : activeLevel.levelId === 'level3' || activeLevel.levelId === 'senior'
                        ? 'bg-gradient-to-r from-rose-600 via-amber-500 to-rose-400 shadow-rose-500/40'
                        : 'bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300 shadow-amber-500/40'
                    }`}
                    style={{ width: `${Math.max(detailedLevelStats.percentage, 2)}%` }}
                  />
                </div>

                {/* Secondary KPI Badges Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-[#0e1130] border border-[#202758]">
                    <div className="text-[10px] text-slate-400 font-mono-code">{isAr ? 'الوحدات المتبقية' : 'REMAINING'}</div>
                    <div className="text-sm font-bold text-white mt-0.5">
                      {detailedLevelStats.remaining} {isAr ? 'وحدة' : 'Modules'}
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-[#0e1130] border border-[#202758]">
                    <div className="text-[10px] text-slate-400 font-mono-code">{isAr ? 'الساعات المعتمدة' : 'LOGGED HOURS'}</div>
                    <div className="text-sm font-bold text-sky-300 mt-0.5">
                      {detailedLevelStats.completedHours} / {detailedLevelStats.totalHours} hrs
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-[#0e1130] border border-[#202758]">
                    <div className="text-[10px] text-slate-400 font-mono-code">{isAr ? 'اجتياز باختبار الوحدة' : 'QUIZ VERIFIED'}</div>
                    <div className="text-sm font-bold text-emerald-400 mt-0.5">
                      {detailedLevelStats.byQuizCount} {isAr ? 'وحدات' : 'Modules'} {detailedLevelStats.avgQuizScore > 0 ? `(${detailedLevelStats.avgQuizScore}%)` : ''}
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-[#0e1130] border border-[#202758]">
                    <div className="text-[10px] text-slate-400 font-mono-code">{isAr ? 'دراسة منهجية' : 'SYLLABUS STUDY'}</div>
                    <div className="text-sm font-bold text-amber-300 mt-0.5">
                      {detailedLevelStats.byStudyCount} {isAr ? 'وحدات' : 'Modules'}
                    </div>
                  </div>
                </div>

                {/* Next Up Module Notification or Celebration */}
                {detailedLevelStats.isAllCompleted ? (
                  <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-950/70 via-[#0e2722] to-emerald-950/70 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                    <div className="flex items-center gap-2 text-emerald-300 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>
                        {isAr 
                          ? '🎉 مبروك! أتممت بنجاح كافة وحدات هذا المستوى الدراسي. أنت مؤهل الآن للاختبار الشامل والشهادة!'
                          : '🎉 Outstanding! All modules in this level are completed. You are qualified for the full exam!'}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        if (onLaunchQuiz) {
                          onLaunchQuiz(activeDiscipline.id, activeLevel.levelId);
                        } else {
                          setModalQuizTarget({
                            disciplineId: activeDiscipline.id,
                            levelId: activeLevel.levelId as any,
                            moduleId: activeLevel.modules[0]?.id || '',
                            moduleTitle: { ar: activeLevel.nameAr, en: activeLevel.nameEn }
                          });
                        }
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition cursor-pointer self-start sm:self-auto shadow-md"
                    >
                      {isAr ? 'اختبار تقييم المستوى الشامل والشهادة' : 'Take Full Level Exam'}
                    </button>
                  </div>
                ) : detailedLevelStats.nextModule ? (
                  <div className="p-3 rounded-xl bg-[#0e1233] border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
                      <span className="text-slate-400">{isAr ? 'الوحدة التالية المقترحة للدراسة:' : 'Suggested Next Module:'}</span>
                      <span className="font-bold text-white">
                        {isAr ? detailedLevelStats.nextModule.titleAr : detailedLevelStats.nextModule.titleEn}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <button
                        onClick={() => {
                          if (detailedLevelStats.nextModule) {
                            toggleModule(detailedLevelStats.nextModule.id);
                            const el = document.getElementById(`module-${detailedLevelStats.nextModule.id}`);
                            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }
                        }}
                        className="px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 font-bold transition cursor-pointer"
                      >
                        {isAr ? 'ابدأ دراستها الآن' : 'Study Now'}
                      </button>

                      <button
                        onClick={() => {
                          if (onLaunchQuiz) {
                            onLaunchQuiz(activeDiscipline.id, activeLevel.levelId);
                          } else {
                            setModalQuizTarget({
                              disciplineId: activeDiscipline.id,
                              levelId: activeLevel.levelId as any,
                              moduleId: activeLevel.modules[0]?.id || '',
                              moduleTitle: { ar: activeLevel.nameAr, en: activeLevel.nameEn }
                            });
                          }
                        }}
                        className="px-3 py-1 rounded-lg bg-[#191f4f] hover:bg-[#232b6e] text-slate-300 hover:text-white border border-[#2b3780] font-bold transition cursor-pointer"
                      >
                        {isAr ? 'اختبار المستوى' : 'Level Exam'}
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Curriculum Modules Syllabus */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <span>{isAr ? 'المقررات الدراسية والمنهج الأكاديمي التفصيلي:' : 'Detailed Learning Modules & Syllabus:'}</span>
                  </div>

                  {/* Module Filter Pills */}
                  <div className="flex items-center gap-1.5 self-start sm:self-auto">
                    <button
                      onClick={() => setModuleFilter('all')}
                      className={`px-2.5 py-1 rounded-lg font-bold font-mono-code transition cursor-pointer ${
                        moduleFilter === 'all'
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-[#101435] text-slate-400 hover:text-white border border-[#222a61]'
                      }`}
                    >
                      {isAr ? 'الكل' : 'All'} ({activeLevel.modules.length})
                    </button>

                    <button
                      onClick={() => setModuleFilter('completed')}
                      className={`px-2.5 py-1 rounded-lg font-bold font-mono-code transition cursor-pointer flex items-center gap-1 ${
                        moduleFilter === 'completed'
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-[#101435] text-emerald-400/90 hover:text-emerald-300 border border-[#222a61]'
                      }`}
                    >
                      <Check className="w-3 h-3" />
                      <span>{isAr ? 'المكتملة' : 'Done'}</span> ({detailedLevelStats.completed})
                    </button>

                    <button
                      onClick={() => setModuleFilter('pending')}
                      className={`px-2.5 py-1 rounded-lg font-bold font-mono-code transition cursor-pointer ${
                        moduleFilter === 'pending'
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-[#101435] text-slate-400 hover:text-white border border-[#222a61]'
                      }`}
                    >
                      {isAr ? 'المتبقية' : 'Pending'} ({detailedLevelStats.remaining})
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {activeLevel.modules
                    .filter((m) => {
                      if (moduleFilter === 'completed') return Boolean(completedModules[m.id]);
                      if (moduleFilter === 'pending') return !completedModules[m.id];
                      return true;
                    })
                    .map((mod) => {
                    const isExpanded = expandedModuleId === mod.id;
                    const modRecord = completedModules[mod.id];
                    const isCompleted = Boolean(modRecord);
                    const isNextUp = !isCompleted && detailedLevelStats.nextModule?.id === mod.id;

                    return (
                      <div 
                        key={mod.id} 
                        id={`module-${mod.id}`}
                        className={`rounded-xl border transition-all overflow-hidden ${
                          isCompleted
                            ? 'border-emerald-500/40 bg-[#0e1635]'
                            : isNextUp
                            ? 'border-amber-400/80 bg-[#141842] shadow-lg shadow-amber-500/10 ring-1 ring-amber-400/30'
                            : 'border-[#232958] bg-[#121535]'
                        }`}
                      >
                        <div className="p-4 flex items-center justify-between gap-3 cursor-pointer hover:bg-[#181d45] transition">
                          <button
                            onClick={() => toggleModule(mod.id)}
                            className="flex-1 text-start flex items-center justify-between gap-3 cursor-pointer"
                          >
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-bold text-sm text-white">
                                  {isAr ? mod.titleAr : mod.titleEn}
                                </span>
                                {isNextUp && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/50 text-[10px] font-bold font-mono-code uppercase tracking-wider">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                                    <span>{isAr ? 'الوحدة التالية' : 'Up Next'}</span>
                                  </span>
                                )}
                              </div>

                              <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                <span className="text-xs text-amber-400 font-mono-code">
                                  {mod.duration}
                                </span>

                                {/* Completion status badge */}
                                {isCompleted && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold font-mono-code">
                                    <Check className="w-3 h-3 text-emerald-400" />
                                    <span>
                                      {modRecord?.byQuiz && modRecord?.score !== undefined
                                        ? (isAr ? `اجتياز بالاختبار (${modRecord.score}%)` : `Passed Quiz (${modRecord.score}%)`)
                                        : (isAr ? 'تمت الدراسة بنجاح' : 'Studied & Completed')}
                                    </span>
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              {isExpanded ? (
                                <ChevronDown className="w-5 h-5 text-amber-400 shrink-0" />
                              ) : (
                                <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
                              )}
                            </div>
                          </button>

                          {/* Quick Interactive Checkbox Toggle */}
                          <div className="shrink-0 ps-2 border-s border-[#232a58]">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleModuleCompleted(mod.id, activeDiscipline.id, activeLevel.levelId);
                              }}
                              className={`p-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                                isCompleted
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 hover:bg-emerald-500/30'
                                  : 'bg-[#181d45] text-slate-400 hover:text-white border border-[#273273] hover:bg-[#202758]'
                              }`}
                              title={isAr ? (isCompleted ? 'إلغاء التعليم كمكتمل' : 'تعليم الوحدة كمكتملة بعد الدراسة') : (isCompleted ? 'Mark as incomplete' : 'Mark module as completed')}
                            >
                              {isCompleted ? (
                                <>
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                  <span className="hidden sm:inline">{isAr ? 'مكتمل' : 'Done'}</span>
                                </>
                              ) : (
                                <>
                                  <Square className="w-4 h-4" />
                                  <span className="hidden sm:inline">{isAr ? 'تعليم كمكتمل' : 'Mark Done'}</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="p-4 bg-[#0a0c20] border-t border-[#1f2550] space-y-4 text-xs">
                            <div>
                              <div className="font-bold text-slate-400 mb-1.5 uppercase font-mono-code">
                                {isAr ? 'مواضيع المحاضرات والدروس:' : 'Lecture Topics:'}
                              </div>
                              <ul className="space-y-1 text-slate-300 list-disc list-inside">
                                {(isAr ? mod.topicsAr : mod.topicsEn).map((t, idx) => (
                                  <li key={idx} className="leading-relaxed">{t}</li>
                                ))}
                              </ul>
                            </div>

                            <div className="pt-2 border-t border-[#1b1f45]">
                              <div className="font-bold text-emerald-400 mb-1 font-mono-code">
                                {isAr ? 'مخرجات التعلم المستهدفة:' : 'Target Learning Outcomes:'}
                              </div>
                              <div className="space-y-1 text-slate-300">
                                {(isAr ? mod.learningOutcomesAr : mod.learningOutcomesEn).map((out, idx) => (
                                  <div key={idx} className="flex items-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                    <span>{out}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Module Quiz Mode Call-To-Action */}
                            <div className="pt-3 border-t border-[#1b1f45] flex flex-wrap items-center justify-between gap-3 bg-[#0d1029] p-3 rounded-xl border border-amber-500/20">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                                  <Award className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="text-xs font-bold text-white flex items-center gap-2">
                                    <span>{isAr ? 'اختبار فهم واستيعاب الوحدة:' : 'Module Knowledge Check:'}</span>
                                    {isCompleted && (
                                      <span className="text-[10px] text-emerald-400 font-mono-code">
                                        ✓ {isAr ? 'تم الاجتياز بنجاح' : 'Passed'} {modRecord?.score !== undefined ? `(${modRecord.score}%)` : ''}
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[10px] text-slate-400">
                                    {isAr ? 'اختبر فهمك لمفاهيم الوحدة والمعايير والأكواد بعد الانتهاء من دراستها' : 'Test your comprehension of module topics and applicable codes'}
                                  </div>
                                </div>
                              </div>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (onLaunchQuiz) {
                                    onLaunchQuiz(activeDiscipline.id, activeLevel.levelId, mod.id, { ar: mod.titleAr, en: mod.titleEn });
                                  } else {
                                    setModalQuizTarget({
                                      disciplineId: activeDiscipline.id,
                                      levelId: activeLevel.levelId as any,
                                      moduleId: mod.id,
                                      moduleTitle: { ar: mod.titleAr, en: mod.titleEn }
                                    });
                                  }
                                }}
                                className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md"
                              >
                                <HelpCircle className="w-3.5 h-3.5" />
                                <span>
                                  {isCompleted 
                                    ? (isAr ? 'إعادة اختبار الوحدة' : 'Retake Module Quiz') 
                                    : (isAr ? 'ابدأ اختبار الوحدة (Quiz Mode)' : 'Start Module Quiz')}
                                </span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Key Formulas Section */}
              {activeLevel.keyFormulas && activeLevel.keyFormulas.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-amber-400" />
                    <span>{isAr ? 'المعادلات والقوانين الفيزيائية والهندسية الأساسية:' : 'Core Physics & Engineering Formulas:'}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeLevel.keyFormulas.map((f, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-[#090b1e] border border-[#212752] space-y-2">
                        <div className="text-xs font-bold text-amber-400">{isAr ? f.nameAr : f.nameEn}</div>
                        <div className="p-2.5 rounded-lg bg-black/60 border border-amber-500/30 text-center font-mono-code text-base text-amber-300 font-black tracking-wider">
                          {f.formula}
                        </div>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          {isAr ? f.descriptionAr : f.descriptionEn}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Quick Interactive Formula Sandbox for Students */}
                  <div className="mt-3 p-4 rounded-xl bg-[#11163b] border border-amber-500/30 text-xs space-y-3">
                    <div className="flex items-center justify-between border-b border-[#21285e] pb-2">
                      <span className="font-bold text-amber-300 flex items-center gap-1.5">
                        <Calculator className="w-3.5 h-3.5" />
                        <span>{isAr ? 'حاسبة تفاعلية سريعة لقوانين الفحص (Interactive Equation Sandbox)' : 'Interactive Formula Sandbox'}</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono-code">LIVE CALCULATION</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Sub-calculator 1: Wavelength λ = v / f */}
                      <div className="p-3 rounded-lg bg-[#0a0d26] border border-[#1f2552] space-y-2">
                        <div className="font-bold text-white text-[11px]">
                          {isAr ? '1. حساب الطول الموجي λ = v / f (أصغر عيب يمكن اكتشافه λ/2)' : '1. Acoustic Wavelength λ = v / f'}
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div>
                            <span className="text-slate-400 block">Velocity (v) m/s:</span>
                            <input
                              type="number"
                              value={calcWavelengthV}
                              onChange={(e) => setCalcWavelengthV(Number(e.target.value))}
                              className="w-full bg-[#14193d] border border-[#2a356a] rounded px-2 py-1 text-white text-xs font-mono"
                            />
                          </div>
                          <div>
                            <span className="text-slate-400 block">Frequency (f) MHz:</span>
                            <input
                              type="number"
                              value={calcWavelengthF}
                              onChange={(e) => setCalcWavelengthF(Number(e.target.value))}
                              className="w-full bg-[#14193d] border border-[#2a356a] rounded px-2 py-1 text-white text-xs font-mono"
                            />
                          </div>
                        </div>
                        <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono font-bold text-[11px] flex justify-between items-center">
                          <span>Wavelength λ = {calcWavelengthResult} mm</span>
                          <span className="text-[10px] text-slate-400">Min Flaw ≈ {(Number(calcWavelengthResult) / 2).toFixed(2)} mm</span>
                        </div>
                      </div>

                      {/* Sub-calculator 2: Heat Input HI = (V * I * 60) / (v * 1000) * η */}
                      <div className="p-3 rounded-lg bg-[#0a0d26] border border-[#1f2552] space-y-2">
                        <div className="font-bold text-white text-[11px]">
                          {isAr ? '2. حساب الطاقة الحرارية للقوس الكهربائي HI (kJ/mm)' : '2. Welding Arc Heat Input HI (kJ/mm)'}
                        </div>
                        <div className="grid grid-cols-3 gap-1.5 text-[10px]">
                          <div>
                            <span className="text-slate-400 block">Volts (V):</span>
                            <input
                              type="number"
                              value={calcHeatInputV}
                              onChange={(e) => setCalcHeatInputV(Number(e.target.value))}
                              className="w-full bg-[#14193d] border border-[#2a356a] rounded px-1.5 py-1 text-white text-xs font-mono"
                            />
                          </div>
                          <div>
                            <span className="text-slate-400 block">Amps (I):</span>
                            <input
                              type="number"
                              value={calcHeatInputI}
                              onChange={(e) => setCalcHeatInputI(Number(e.target.value))}
                              className="w-full bg-[#14193d] border border-[#2a356a] rounded px-1.5 py-1 text-white text-xs font-mono"
                            />
                          </div>
                          <div>
                            <span className="text-slate-400 block">Speed (mm/min):</span>
                            <input
                              type="number"
                              value={calcHeatInputSpeed}
                              onChange={(e) => setCalcHeatInputSpeed(Number(e.target.value))}
                              className="w-full bg-[#14193d] border border-[#2a356a] rounded px-1.5 py-1 text-white text-xs font-mono"
                            />
                          </div>
                        </div>
                        <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono font-bold text-[11px] flex justify-between items-center">
                          <span>Heat Input = {calcHeatInputResult} kJ/mm</span>
                          <span className="text-[10px] text-slate-400">η = {calcHeatInputEff} (SMAW)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Reference Textbooks Section */}
              {activeLevel.referenceTextbooks && activeLevel.referenceTextbooks.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <Library className="w-4 h-4 text-sky-400" />
                    <span>{isAr ? 'المراجع والكتب الدراسية الجامعية والأكواد المعتمدة:' : 'Authorized Engineering Textbooks & Reference Standards:'}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {activeLevel.referenceTextbooks.map((tb, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-[#0e122b] border border-[#202758] space-y-1 text-xs">
                        <div className="flex items-center gap-1.5 text-sky-300 font-bold">
                          <BookMarked className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                          <span className="truncate">{tb.title}</span>
                        </div>
                        <div className="text-[11px] text-slate-300">{tb.author}</div>
                        <div className="text-[10px] font-mono-code text-slate-400">{tb.standardOrPublisher}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Practical Hands-on Skills Checklist */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{isAr ? 'قائمة المهارات المعملية والميدانية الإلزامية لاجتياز المستوى:' : 'Mandatory Practical Laboratory Skills Checklist:'}</span>
                </div>

                <div className="space-y-2">
                  {activeLevel.practicalSkillsChecklist.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-[#121635] border border-[#212752] text-xs">
                      <div className="flex items-center gap-2 text-slate-200">
                        <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-mono-code font-bold text-[10px]">
                          {idx + 1}
                        </span>
                        <span>{isAr ? item.skillAr : item.skillEn}</span>
                      </div>
                      <span className="text-[10px] font-mono-code font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                        {item.importance}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Targeted Module Quiz Modal Overlay */}
      {modalQuizTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-[#0c0e25] rounded-3xl border-2 border-amber-400/60 shadow-2xl p-4 sm:p-6 my-auto max-h-[92vh] overflow-y-auto">
            {/* Modal Close Button */}
            <button
              onClick={() => {
                setModalQuizTarget(null);
                setCompletedModules(getCompletedModules());
              }}
              className="absolute top-4 end-4 w-9 h-9 rounded-full bg-[#181d45] hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer z-20 border border-[#2c3775]"
              title={isAr ? 'إغلاق الاختبار' : 'Close Quiz'}
            >
              <X className="w-5 h-5" />
            </button>

            <CurriculumQuizEngine
              language={language}
              initialDisciplineId={modalQuizTarget.disciplineId}
              initialLevelId={modalQuizTarget.levelId}
              initialModuleId={modalQuizTarget.moduleId}
              initialModuleTitle={modalQuizTarget.moduleTitle}
              onCloseTargetedQuiz={() => {
                setModalQuizTarget(null);
                setCompletedModules(getCompletedModules());
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
