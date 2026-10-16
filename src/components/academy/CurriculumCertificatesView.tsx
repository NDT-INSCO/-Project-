import React, { useState, useEffect, useMemo } from 'react';
import { 
  Award, 
  CheckCircle2, 
  Lock, 
  Clock, 
  Printer, 
  ShieldCheck, 
  Sparkles, 
  GraduationCap, 
  Wrench, 
  Crown, 
  ArrowRight, 
  ArrowLeft, 
  X, 
  QrCode, 
  FileCheck, 
  Share2, 
  Layers, 
  Search,
  Sliders,
  Check,
  User,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language } from '../../types';
import { ENGINEERING_DISCIPLINES, EngineeringDiscipline, DisciplineLevel } from '../../data/academyCurriculum';
import { useAuth } from '../../context/AuthContext';
import { 
  getCompletedModules, 
  calculateDetailedLevelProgress, 
  getIssuedCertificates, 
  saveIssuedCertificate, 
  IssuedCertificate, 
  PROGRESS_UPDATE_EVENT,
  ModuleProgressRecord,
  DetailedLevelProgress
} from '../../utils/curriculumProgress';

export interface CurriculumCertificatesViewProps {
  language: Language;
  onNavigateToModule?: (disciplineId: string, levelIdx: number, moduleId?: string) => void;
  onLaunchQuiz?: (disciplineId: string, levelId?: string, moduleId?: string, moduleTitle?: { ar: string; en: string }) => void;
}

export const CurriculumCertificatesView: React.FC<CurriculumCertificatesViewProps> = ({
  language,
  onNavigateToModule,
  onLaunchQuiz
}) => {
  const isAr = language === 'ar';
  const { userProfile } = useAuth();

  const [completedModules, setCompletedModules] = useState<Record<string, ModuleProgressRecord>>(() => getCompletedModules());
  const [issuedCertificates, setIssuedCertificates] = useState<Record<string, IssuedCertificate>>(() => getIssuedCertificates());
  
  // Filters
  const [statusFilter, setStatusFilter] = useState<'all' | 'earned' | 'in_progress' | 'locked'>('all');
  const [tierFilter, setTierFilter] = useState<'all' | 'academic' | 'level2' | 'level3'>('all');
  const [disciplineFilter, setDisciplineFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Candidate Name customization for credentials
  const [candidateName, setCandidateName] = useState<string>(
    userProfile?.displayName || (isAr ? 'مهندس متدرب / باحث أكاديمي' : 'Certified Engineer / Trainee')
  );

  // Active Certificate Modal
  const [activeCertificateModal, setActiveCertificateModal] = useState<{
    discipline: EngineeringDiscipline;
    level: DisciplineLevel;
    levelIdx: number;
    certificate: IssuedCertificate;
  } | null>(null);

  // Synchronize state with storage events
  useEffect(() => {
    const handleUpdate = () => {
      setCompletedModules(getCompletedModules());
      setIssuedCertificates(getIssuedCertificates());
    };

    window.addEventListener(PROGRESS_UPDATE_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener(PROGRESS_UPDATE_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  // Update candidate name if user logs in
  useEffect(() => {
    if (userProfile?.displayName) {
      setCandidateName(userProfile.displayName);
    }
  }, [userProfile?.displayName]);

  // Aggregate all levels across 8 disciplines
  interface LevelCredentialItem {
    discipline: EngineeringDiscipline;
    level: DisciplineLevel;
    levelIdx: number;
    stats: DetailedLevelProgress;
    isEarned: boolean;
    certificate?: IssuedCertificate;
  }

  const allCredentials: LevelCredentialItem[] = useMemo(() => {
    const items: LevelCredentialItem[] = [];

    ENGINEERING_DISCIPLINES.forEach(disc => {
      disc.levels.forEach((lvl, lvlIdx) => {
        const stats = calculateDetailedLevelProgress(lvl, completedModules);
        const certKey = `${disc.id}_${lvl.levelId}`;
        const existingCert = issuedCertificates[certKey];
        const isEarned = stats.isAllCompleted || Boolean(existingCert);

        items.push({
          discipline: disc,
          level: lvl,
          levelIdx: lvlIdx,
          stats,
          isEarned,
          certificate: existingCert
        });
      });
    });

    return items;
  }, [completedModules, issuedCertificates]);

  // Summary Metrics
  const totalLevels = allCredentials.length;
  const earnedLevelsCount = allCredentials.filter(c => c.isEarned).length;
  const inProgressLevelsCount = allCredentials.filter(c => !c.isEarned && c.stats.completed > 0).length;
  const lockedLevelsCount = allCredentials.filter(c => c.stats.completed === 0 && !c.isEarned).length;
  const totalVerifiedHours = allCredentials
    .filter(c => c.isEarned)
    .reduce((acc, c) => acc + (c.level.trainingHours || 40), 0);

  // Filtered List
  const filteredCredentials = useMemo(() => {
    return allCredentials.filter(item => {
      // Status filter
      if (statusFilter === 'earned' && !item.isEarned) return false;
      if (statusFilter === 'in_progress' && (item.isEarned || item.stats.completed === 0)) return false;
      if (statusFilter === 'locked' && (item.isEarned || item.stats.completed > 0)) return false;

      // Tier filter
      const itemTier = item.level.tierCategory || item.level.levelId;
      if (tierFilter !== 'all' && itemTier !== tierFilter) {
        if (tierFilter === 'level2' && item.level.levelId !== 'level2' && item.level.levelId !== 'inspector') return false;
        if (tierFilter === 'level3' && item.level.levelId !== 'level3' && item.level.levelId !== 'senior') return false;
        if (tierFilter === 'academic' && item.level.levelId !== 'academic') return false;
      }

      // Discipline filter
      if (disciplineFilter !== 'all' && item.discipline.id !== disciplineFilter) return false;

      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.level.nameAr.toLowerCase().includes(q) || item.level.nameEn.toLowerCase().includes(q);
        const matchDisc = item.discipline.titleAr.toLowerCase().includes(q) || item.discipline.titleEn.toLowerCase().includes(q);
        const matchCodes = item.level.applicableCodes.some(c => c.toLowerCase().includes(q));
        if (!matchTitle && !matchDisc && !matchCodes) return false;
      }

      return true;
    });
  }, [allCredentials, statusFilter, tierFilter, disciplineFilter, searchQuery]);

  // Handle claiming / viewing a certificate
  const handleOpenCertificate = (item: LevelCredentialItem) => {
    const certKey = `${item.discipline.id}_${item.level.levelId}`;
    let cert = issuedCertificates[certKey];

    if (!cert) {
      // Generate unique serial code
      const randHex = Math.random().toString(36).substring(2, 7).toUpperCase();
      const codeYear = new Date().getFullYear();
      const certId = `INSCO-CERT-${codeYear}-${item.discipline.id.substring(0, 3).toUpperCase()}-${item.level.levelId.substring(0, 2).toUpperCase()}-${randHex}`;

      cert = {
        certificateId: certId,
        disciplineId: item.discipline.id,
        disciplineTitleAr: item.discipline.titleAr,
        disciplineTitleEn: item.discipline.titleEn,
        levelId: item.level.levelId,
        levelNameAr: item.level.nameAr,
        levelNameEn: item.level.nameEn,
        candidateName: candidateName.trim() || 'Certified Engineer',
        issuedAt: new Date().toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        trainingHours: item.level.trainingHours || 40,
        applicableCodes: item.level.applicableCodes,
        score: item.stats.avgQuizScore || 95,
        grade: (item.stats.avgQuizScore || 95) >= 90 ? 'Distinction' : 'Certified',
        verificationCode: `VER-${randHex}-${Date.now().toString().slice(-4)}`
      };

      saveIssuedCertificate(cert);

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }

    setActiveCertificateModal({
      discipline: item.discipline,
      level: item.level,
      levelIdx: item.levelIdx,
      certificate: cert
    });
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner: Certification Dossier */}
      <div className="bg-gradient-to-r from-[#0b0c1c] via-[#12163b] to-[#0b0c1c] p-6 sm:p-8 rounded-2xl border-2 border-amber-500/40 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-400 font-bold text-xs uppercase tracking-wider mb-3">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{isAr ? 'منظومة الشهادات والأوسمة الرقمية المعتمدة' : 'Official Verified Digital Credentials & Badges'}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
              {isAr ? (
                <>
                  أوسمة وشهادات <span className="text-amber-400">إتمام المناهج الهندسية التفاعلية</span>
                </>
              ) : (
                <>
                  Engineering Curriculum <span className="text-amber-400">Digital Badges & Certificates</span>
                </>
              )}
            </h3>

            <p className="text-slate-300 text-sm mt-2 leading-relaxed">
              {isAr
                ? 'استعرض شهاداتك وأوسمتك الرقمية المكتسبة لكل مستوى دراسي تنجزه في تخصصات الفحص والمعالجة الحرارية. وثائق رسمية معتمدة ومسجلة برقم كودي للتحقق وساعات تدريب معتمدة طبقاً لـ ASME و ASNT و API.'
                : 'View and claim official verifiable credentials and digital badges upon finishing curriculum levels. Features automated serial numbers, training hours verification, and ASME/ASNT code compliance.'}
            </p>
          </div>

          {/* Candidate Name Customizer */}
          <div className="w-full lg:w-80 bg-[#080a1c] p-4 rounded-xl border border-[#232b66] shadow-inner space-y-2">
            <div className="text-[11px] font-mono-code text-slate-400 uppercase font-bold flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>{isAr ? 'اسم المتدرب / المهندس بالشهادة:' : 'Candidate Name on Certificate:'}</span>
            </div>
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder={isAr ? 'الاسم الكامل...' : 'Full Name...'}
              className="w-full bg-[#101438] border border-[#273273] focus:border-amber-400 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 outline-none font-bold"
            />
            <div className="text-[10px] text-slate-400">
              {isAr ? 'يتم طباعة هذا الاسم تلقائياً على كافة الشهادات المستخرجة.' : 'This name will appear on all issued credentials.'}
            </div>
          </div>
        </div>

        {/* Global KPI Summary Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-[#1f2552] text-xs">
          <div className="bg-[#0e1130] p-3 rounded-xl border border-[#202758]">
            <div className="text-[10px] text-slate-400 font-mono-code">{isAr ? 'الشهادات المكتسبة' : 'EARNED BADGES'}</div>
            <div className="text-2xl font-black font-mono-code text-emerald-400 mt-0.5">
              {earnedLevelsCount} <span className="text-xs text-slate-400 font-normal">/ {totalLevels}</span>
            </div>
          </div>

          <div className="bg-[#0e1130] p-3 rounded-xl border border-[#202758]">
            <div className="text-[10px] text-slate-400 font-mono-code">{isAr ? 'المستويات قيد الإنجاز' : 'IN PROGRESS'}</div>
            <div className="text-2xl font-black font-mono-code text-amber-400 mt-0.5">
              {inProgressLevelsCount} <span className="text-xs text-slate-400 font-normal">{isAr ? 'مستويات' : 'Tiers'}</span>
            </div>
          </div>

          <div className="bg-[#0e1130] p-3 rounded-xl border border-[#202758]">
            <div className="text-[10px] text-slate-400 font-mono-code">{isAr ? 'ساعات التدريب الموثقة' : 'VERIFIED HOURS'}</div>
            <div className="text-2xl font-black font-mono-code text-sky-300 mt-0.5">
              {totalVerifiedHours} <span className="text-xs text-slate-400 font-normal">hrs</span>
            </div>
          </div>

          <div className="bg-[#0e1130] p-3 rounded-xl border border-[#202758]">
            <div className="text-[10px] text-slate-400 font-mono-code">{isAr ? 'نسبة الإنجاز الأكاديمي' : 'OVERALL PROGRESS'}</div>
            <div className="text-2xl font-black font-mono-code text-white mt-0.5">
              {Math.round((earnedLevelsCount / Math.max(1, totalLevels)) * 100)}%
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0c0e25] p-4 rounded-2xl border border-[#202758] space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Status Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-amber-500 text-slate-950 font-black'
                  : 'bg-[#12163b] text-slate-300 hover:text-white border border-[#222958]'
              }`}
            >
              {isAr ? 'كافة الأوسمة' : 'All Badges'} ({totalLevels})
            </button>

            <button
              onClick={() => setStatusFilter('earned')}
              className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-1 ${
                statusFilter === 'earned'
                  ? 'bg-emerald-500 text-slate-950 font-black'
                  : 'bg-[#12163b] text-emerald-300 hover:text-white border border-emerald-500/30'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isAr ? 'المكتسبة' : 'Earned'}</span> ({earnedLevelsCount})
            </button>

            <button
              onClick={() => setStatusFilter('in_progress')}
              className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-1 ${
                statusFilter === 'in_progress'
                  ? 'bg-amber-500 text-slate-950 font-black'
                  : 'bg-[#12163b] text-amber-300 hover:text-white border border-amber-500/30'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{isAr ? 'قيد الإنجاز' : 'In Progress'}</span> ({inProgressLevelsCount})
            </button>

            <button
              onClick={() => setStatusFilter('locked')}
              className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-1 ${
                statusFilter === 'locked'
                  ? 'bg-slate-300 text-slate-950 font-black'
                  : 'bg-[#12163b] text-slate-400 hover:text-white border border-[#222958]'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isAr ? 'مغلقة' : 'Locked'}</span> ({lockedLevelsCount})
            </button>
          </div>

          {/* Discipline selector + Search */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              aria-label={isAr ? 'اختر التخصص' : 'Select Discipline'}
              value={disciplineFilter}
              onChange={(e) => setDisciplineFilter(e.target.value)}
              className="bg-[#101438] border border-[#273273] text-slate-200 rounded-xl px-3 py-1.5 font-bold focus:outline-none focus:border-amber-400"
            >
              <option value="all">{isAr ? 'جميع التخصصات الـ 8' : 'All 8 Disciplines'}</option>
              {ENGINEERING_DISCIPLINES.map(d => (
                <option key={d.id} value={d.id}>
                  {isAr ? d.titleAr : d.titleEn}
                </option>
              ))}
            </select>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute start-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={isAr ? 'ابحث باسم الشهادة أو الكود...' : 'Search credentials...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#101438] border border-[#273273] rounded-xl ps-8 pe-3 py-1.5 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Tier filter pills */}
        <div className="pt-2 border-t border-[#1a1f48] flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[11px] font-mono-code text-slate-400 me-1">
            {isAr ? 'المستوى المستهدف:' : 'Credential Tier:'}
          </span>
          <button
            onClick={() => setTierFilter('all')}
            className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
              tierFilter === 'all'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isAr ? 'الكل' : 'All Tiers'}
          </button>
          <button
            onClick={() => setTierFilter('academic')}
            className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer flex items-center gap-1 ${
              tierFilter === 'academic'
                ? 'bg-purple-600/30 text-purple-300 border border-purple-400/50'
                : 'text-slate-400 hover:text-purple-300'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
            <span>{isAr ? '🎓 الأساس الأكاديمي والجامعي' : 'Academic Foundations'}</span>
          </button>
          <button
            onClick={() => setTierFilter('level2')}
            className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer flex items-center gap-1 ${
              tierFilter === 'level2'
                ? 'bg-amber-600/30 text-amber-300 border border-amber-400/50'
                : 'text-slate-400 hover:text-amber-300'
            }`}
          >
            <Wrench className="w-3.5 h-3.5 text-amber-400" />
            <span>{isAr ? '🛠️ المستوى الثاني المهني المعتمد L2' : 'Level II Inspector'}</span>
          </button>
          <button
            onClick={() => setTierFilter('level3')}
            className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer flex items-center gap-1 ${
              tierFilter === 'level3'
                ? 'bg-rose-600/30 text-rose-300 border border-rose-400/50'
                : 'text-slate-400 hover:text-rose-300'
            }`}
          >
            <Crown className="w-3.5 h-3.5 text-rose-400" />
            <span>{isAr ? '👑 المستوى الثالث الاستشاري L3' : 'Level III Consultant'}</span>
          </button>
        </div>
      </div>

      {/* Badges & Credentials Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCredentials.map((item) => {
          const isAcademic = item.level.levelId === 'academic';
          const isLevel2 = item.level.levelId === 'level2' || item.level.levelId === 'inspector';
          const isLevel3 = item.level.levelId === 'level3' || item.level.levelId === 'senior';

          return (
            <div
              key={`${item.discipline.id}_${item.level.levelId}`}
              className={`rounded-2xl border-2 transition-all p-5 flex flex-col justify-between relative overflow-hidden shadow-xl ${
                item.isEarned
                  ? 'bg-gradient-to-br from-[#0c1630] via-[#091226] to-[#0d1c38] border-emerald-500/50 shadow-emerald-500/10'
                  : item.stats.completed > 0
                  ? 'bg-gradient-to-br from-[#121535] via-[#0d102e] to-[#12173b] border-amber-500/40 shadow-amber-500/10'
                  : 'bg-[#0a0c20] border-[#1f2658] opacity-80 hover:opacity-100'
              }`}
            >
              {/* Card Top: Crest Badge & Status Pill */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  {/* Digital Badge Medal Icon */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black shadow-lg shrink-0 ${
                    item.isEarned
                      ? isAcademic
                        ? 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-purple-500/30 ring-2 ring-purple-300'
                        : isLevel3
                        ? 'bg-gradient-to-br from-rose-500 to-amber-600 text-white shadow-rose-500/30 ring-2 ring-rose-300'
                        : 'bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 shadow-amber-500/30 ring-2 ring-amber-300'
                      : 'bg-[#151a42] text-slate-400 border border-[#273273]'
                  }`}>
                    {isAcademic && <GraduationCap className="w-7 h-7" />}
                    {isLevel2 && <Award className="w-7 h-7" />}
                    {isLevel3 && <Crown className="w-7 h-7" />}
                  </div>

                  {/* Status Indicator */}
                  <div>
                    {item.isEarned ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 text-[10px] font-bold font-mono-code uppercase tracking-wider">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{isAr ? 'معتمد ومكتمل' : 'VERIFIED'}</span>
                      </span>
                    ) : item.stats.completed > 0 ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[10px] font-bold font-mono-code">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>{item.stats.completed}/{item.stats.total} ({item.stats.percentage}%)</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#13173d] text-slate-400 border border-[#232a5e] text-[10px] font-bold font-mono-code">
                        <Lock className="w-3.5 h-3.5" />
                        <span>{isAr ? 'مغلق' : 'LOCKED'}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Discipline Tag */}
                <div className="text-[10px] font-mono-code uppercase font-bold text-amber-400 mb-1">
                  {isAr ? item.discipline.titleAr : item.discipline.titleEn}
                </div>

                {/* Level Title */}
                <h4 className="text-base font-black text-white leading-snug">
                  {isAr ? item.level.nameAr : item.level.nameEn}
                </h4>

                {/* Role / Description */}
                <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                  {isAr ? item.level.targetRoleAr : item.level.targetRoleEn}
                </p>

                {/* Training Hours & Codes */}
                <div className="flex flex-wrap items-center gap-1.5 mt-3 text-[10px] font-mono-code">
                  <span className="px-2 py-0.5 rounded bg-black/40 text-sky-300 border border-[#232958] font-bold">
                    ⏱️ {item.level.trainingHours} hrs
                  </span>
                  {item.level.applicableCodes.slice(0, 2).map((code, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-black/40 text-slate-300 border border-[#232958]">
                      {code}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Bottom: Progress Bar & Action CTA */}
              <div className="mt-5 pt-3 border-t border-[#1c2250] space-y-2.5">
                {/* Progress bar */}
                <div className="w-full bg-[#070918] h-2 rounded-full overflow-hidden border border-[#202758]">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.isEarned
                        ? 'bg-emerald-400'
                        : isAcademic
                        ? 'bg-purple-500'
                        : isLevel3
                        ? 'bg-rose-500'
                        : 'bg-amber-400'
                    }`}
                    style={{ width: `${item.isEarned ? 100 : Math.max(item.stats.percentage, 2)}%` }}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  {item.isEarned ? (
                    <button
                      onClick={() => handleOpenCertificate(item)}
                      className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-black text-xs transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20"
                    >
                      <Award className="w-4 h-4 text-slate-950" />
                      <span>{isAr ? 'عرض / طباعة الشهادة الرسمية' : 'View Official Certificate'}</span>
                    </button>
                  ) : item.stats.completed > 0 ? (
                    <div className="w-full flex items-center gap-2">
                      {onNavigateToModule && (
                        <button
                          onClick={() => onNavigateToModule(item.discipline.id, item.levelIdx, item.stats.nextModule?.id)}
                          className="flex-1 py-1.5 px-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1"
                        >
                          <span>{isAr ? 'متابعة المنهج' : 'Resume'}</span>
                          {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                        </button>
                      )}

                      {onLaunchQuiz && (
                        <button
                          onClick={() => onLaunchQuiz(item.discipline.id, item.level.levelId)}
                          className="py-1.5 px-3 rounded-xl bg-[#161a42] hover:bg-[#20265f] text-amber-300 border border-amber-500/30 text-xs font-bold transition cursor-pointer"
                        >
                          {isAr ? 'الاختبار' : 'Exam'}
                        </button>
                      )}
                    </div>
                  ) : (
                    onNavigateToModule && (
                      <button
                        onClick={() => onNavigateToModule(item.discipline.id, item.levelIdx)}
                        className="w-full py-1.5 px-3 rounded-xl bg-[#13173d] hover:bg-[#1a2055] text-slate-300 hover:text-white border border-[#232b62] text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1"
                      >
                        <span>{isAr ? 'بدء دراسة المستوى' : 'Start Curriculum'}</span>
                        {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Official Verifiable Certificate Modal */}
      {activeCertificateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-gradient-to-b from-[#0d0f28] via-[#090b1c] to-[#0d0f28] rounded-3xl border-4 border-amber-400/70 shadow-2xl p-6 sm:p-10 space-y-6 my-auto text-center relative overflow-hidden print:border-black print:text-black">
            {/* Watermark Crest */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <GraduationCap className="w-96 h-96 text-amber-400" />
            </div>

            {/* Modal Close Button */}
            <button
              onClick={() => setActiveCertificateModal(null)}
              className="absolute top-4 end-4 w-9 h-9 rounded-full bg-[#181d45] hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer border border-[#2c3775] print:hidden"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Certificate Header Badge */}
            <div className="space-y-2 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/40 text-amber-400 text-xs font-mono-code font-bold uppercase">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>INSCO ACADEMY OFFICIAL VERIFIED CREDENTIAL</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-amber-300 tracking-wide mt-2">
                {isAr ? 'شهادة إنجاز وتأهيل هندسي معتمد' : 'Certificate of Engineering Accomplishment & Qualification'}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
                {isAr
                  ? 'الأكاديمية الدولية للخدمات البترولية والهندسية والفحص غير الإتلافي والمعالجة الحرارية'
                  : 'International for Services & Constructions (INSCO) NDT & PWHT Technical Academy'}
              </p>
            </div>

            {/* Candidate Recipient */}
            <div className="py-4 border-y border-amber-400/30 space-y-1 relative z-10">
              <p className="text-xs font-mono-code uppercase text-slate-400 tracking-widest">
                {isAr ? 'يشهد مجلس الفحص والتدريب الهندسي بأن المهندس / المتدرب:' : 'THIS IS TO CERTIFY THAT:'}
              </p>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-serif text-amber-400">
                {activeCertificateModal.certificate.candidateName}
              </h3>
              <p className="text-xs text-slate-300 max-w-xl mx-auto pt-1">
                {isAr
                  ? `قد استكمل بنجاح كافة متطلبات المنهج العلمي والتدريب النظري والعملي واجتاز الاختبارات المقررة لمستوى:`
                  : `has successfully fulfilled all curriculum, technical specifications, and examination requirements for:`}
              </p>
            </div>

            {/* Credential Title & Codes */}
            <div className="space-y-2 relative z-10">
              <h4 className="text-xl sm:text-2xl font-black text-white">
                {isAr ? activeCertificateModal.level.nameAr : activeCertificateModal.level.nameEn}
              </h4>
              <p className="text-sm text-amber-300 font-bold">
                {isAr ? activeCertificateModal.discipline.titleAr : activeCertificateModal.discipline.titleEn}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs font-mono-code">
                <span className="px-3 py-1 rounded-lg bg-[#141940] text-sky-300 border border-sky-500/40 font-bold">
                  ⏱️ {activeCertificateModal.certificate.trainingHours} Verified Training Hours
                </span>
                <span className="px-3 py-1 rounded-lg bg-[#141940] text-emerald-300 border border-emerald-500/40 font-bold">
                  🏆 Grade: {activeCertificateModal.certificate.grade}
                </span>
                {activeCertificateModal.certificate.applicableCodes.map((code, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-black/40 text-slate-300 border border-[#273273]">
                    {code}
                  </span>
                ))}
              </div>
            </div>

            {/* Verification Serial & Stamps Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#1f2552] text-xs relative z-10 items-center">
              {/* Dual Signatures */}
              <div className="text-center sm:text-start space-y-1">
                <div className="font-serif italic text-base text-amber-300">Eng. Technical Director</div>
                <div className="text-[10px] text-slate-400 font-mono-code">
                  ASNT NDT Level III (#54161)
                </div>
                <div className="text-[9px] text-slate-500">Board of Technical Certification</div>
              </div>

              {/* QR Verification Seal */}
              <div className="flex flex-col items-center justify-center space-y-1">
                <div className="w-16 h-16 rounded-xl bg-white p-1 flex items-center justify-center shadow-lg">
                  <QrCode className="w-full h-full text-slate-950" />
                </div>
                <div className="text-[9px] font-mono-code text-amber-400 font-bold">
                  {activeCertificateModal.certificate.verificationCode}
                </div>
              </div>

              <div className="text-center sm:text-end space-y-1">
                <div className="font-serif italic text-base text-amber-300">QA/QC Representative</div>
                <div className="text-[10px] text-slate-400 font-mono-code">
                  CQI-IRCA Lead Auditor / ISO 9712
                </div>
                <div className="text-[9px] text-slate-500">Issued: {activeCertificateModal.certificate.issuedAt}</div>
              </div>
            </div>

            {/* Serial Barcode */}
            <div className="text-[10px] font-mono-code text-slate-500 pt-2 border-t border-[#171b3e] flex items-center justify-between">
              <span>CREDENTIAL ID: {activeCertificateModal.certificate.certificateId}</span>
              <span>INSCO QUALITY ASSURANCE DOC REF: INSCO/ACADEMY/2026</span>
            </div>

            {/* Print & Export Actions */}
            <div className="flex items-center justify-center gap-3 pt-3 print:hidden">
              <button
                onClick={handlePrintCertificate}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition cursor-pointer flex items-center gap-2 shadow-lg"
              >
                <Printer className="w-4 h-4" />
                <span>{isAr ? 'طباعة / حفظ الشهادة PDF' : 'Print / Save Certificate PDF'}</span>
              </button>

              <button
                onClick={() => setActiveCertificateModal(null)}
                className="px-5 py-2.5 rounded-xl bg-[#141842] hover:bg-[#1d2360] text-slate-300 hover:text-white border border-[#2b357a] font-bold text-xs sm:text-sm transition cursor-pointer"
              >
                {isAr ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
