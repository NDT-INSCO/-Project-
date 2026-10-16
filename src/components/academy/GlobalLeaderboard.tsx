import React, { useState, useEffect, useMemo } from 'react';
import { 
  Trophy, 
  Medal, 
  Crown, 
  Award, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Search, 
  Filter, 
  ArrowRight, 
  ArrowLeft, 
  RefreshCw, 
  User, 
  Building2, 
  GraduationCap, 
  ShieldCheck, 
  Flame, 
  Target, 
  SlidersHorizontal,
  ChevronDown,
  Layers,
  HelpCircle,
  TrendingUp,
  Share2
} from 'lucide-react';
import { Language } from '../../types';
import { ENGINEERING_DISCIPLINES } from '../../data/academyCurriculum';
import { useAuth } from '../../context/AuthContext';
import { 
  LeaderboardEntry, 
  fetchLeaderboardEntries, 
  subscribeToLeaderboard,
  LEADERBOARD_UPDATE_EVENT 
} from '../../utils/quizLeaderboardService';

export interface GlobalLeaderboardProps {
  language: Language;
  onLaunchQuiz?: (disciplineId?: string, levelId?: string) => void;
  onNavigateToDiscipline?: (disciplineId: string) => void;
  className?: string;
}

const COUNTRY_FLAGS: Record<string, { flag: string; nameAr: string; nameEn: string }> = {
  SA: { flag: '🇸🇦', nameAr: 'المملكة العربية السعودية', nameEn: 'Saudi Arabia' },
  AE: { flag: '🇦🇪', nameAr: 'الإمارات العربية المتحدة', nameEn: 'United Arab Emirates' },
  EG: { flag: '🇪🇬', nameAr: 'جمهورية مصر العربية', nameEn: 'Egypt' },
  KW: { flag: '🇰🇼', nameAr: 'دولة الكويت', nameEn: 'Kuwait' },
  QA: { flag: '🇶🇦', nameAr: 'دولة قطر', nameEn: 'Qatar' },
  OM: { flag: '🇴🇲', nameAr: 'سلطنة عمان', nameEn: 'Oman' },
  BH: { flag: '🇧🇭', nameAr: 'مملكة البحرين', nameEn: 'Bahrain' },
  INT: { flag: '🌐', nameAr: 'دولي', nameEn: 'International' }
};

export const GlobalLeaderboard: React.FC<GlobalLeaderboardProps> = ({
  language,
  onLaunchQuiz,
  onNavigateToDiscipline,
  className = ''
}) => {
  const isAr = language === 'ar';
  const { userProfile, user } = useAuth();

  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Filters
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('all');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [timeframe, setTimeframe] = useState<'all' | 'month' | 'week'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Share notification
  const [shareToast, setShareToast] = useState<string | null>(null);

  // Load and subscribe to real-time leaderboard
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetchLeaderboardEntries().then(initial => {
      if (isMounted) {
        setEntries(initial);
        setIsLoading(false);
      }
    });

    const unsubscribe = subscribeToLeaderboard((updated) => {
      if (isMounted) {
        setEntries(updated);
        setIsLoading(false);
      }
    });

    const handleCustomUpdate = () => {
      fetchLeaderboardEntries().then(updated => {
        if (isMounted) setEntries(updated);
      });
    };

    window.addEventListener(LEADERBOARD_UPDATE_EVENT, handleCustomUpdate);

    return () => {
      isMounted = false;
      unsubscribe();
      window.removeEventListener(LEADERBOARD_UPDATE_EVENT, handleCustomUpdate);
    };
  }, []);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    const data = await fetchLeaderboardEntries();
    setEntries(data);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  // Filtered entries
  const filteredEntries = useMemo(() => {
    const now = Date.now();
    const oneWeek = 7 * 86400000;
    const oneMonth = 30 * 86400000;

    return entries.filter(item => {
      // Discipline filter
      if (selectedDiscipline !== 'all' && item.disciplineId !== selectedDiscipline) {
        return false;
      }

      // Tier filter
      if (selectedTier !== 'all') {
        if (selectedTier === 'level3' && item.levelId !== 'level3' && item.levelId !== 'senior') return false;
        if (selectedTier === 'level2' && item.levelId !== 'level2' && item.levelId !== 'inspector') return false;
        if (selectedTier === 'academic' && item.levelId !== 'academic') return false;
      }

      // Timeframe filter
      if (timeframe !== 'all') {
        const itemDate = new Date(item.completedAt).getTime();
        const diff = now - itemDate;
        if (timeframe === 'week' && diff > oneWeek) return false;
        if (timeframe === 'month' && diff > oneMonth) return false;
      }

      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.userName.toLowerCase().includes(q);
        const matchRole = item.userRole?.toLowerCase().includes(q) || false;
        const matchCompany = item.company?.toLowerCase().includes(q) || false;
        const matchDisc = item.disciplineTitleAr.toLowerCase().includes(q) || item.disciplineTitleEn.toLowerCase().includes(q);
        if (!matchName && !matchRole && !matchCompany && !matchDisc) return false;
      }

      return true;
    });
  }, [entries, selectedDiscipline, selectedTier, timeframe, searchQuery]);

  // Top 3 Podium
  const top1 = filteredEntries[0];
  const top2 = filteredEntries[1];
  const top3 = filteredEntries[2];
  const remainingEntries = filteredEntries.slice(3);

  // User's best personal entry
  const myBestEntry = useMemo(() => {
    return entries.find(e => e.isCurrentUser || (user && e.userId === user.uid));
  }, [entries, user]);

  const myBestRank = useMemo(() => {
    if (!myBestEntry) return null;
    const index = filteredEntries.findIndex(e => e.id === myBestEntry.id);
    return index >= 0 ? index + 1 : null;
  }, [filteredEntries, myBestEntry]);

  // Format time display
  const formatDuration = (seconds?: number) => {
    if (!seconds) return '—';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  const handleShare = (entry: LeaderboardEntry, rank: number) => {
    const text = isAr
      ? `🏆 حقق ${entry.userName} المركز #${rank} بنتيجة ${entry.score}% في اختبار ${entry.disciplineTitleAr} بأكاديمية إنسكو الهندسية!`
      : `🏆 ${entry.userName} ranked #${rank} with ${entry.score}% in ${entry.disciplineTitleEn} on INSCO Academy Leaderboard!`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setShareToast(isAr ? 'تم نسخ بيانات المركز بنجاح!' : 'Result copied to clipboard!');
      setTimeout(() => setShareToast(null), 3000);
    }
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Toast Notification */}
      {shareToast && (
        <div className="fixed bottom-6 end-6 z-50 bg-amber-500 text-slate-950 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-2xl flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4" />
          <span>{shareToast}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="relative bg-gradient-to-r from-[#0d102e] via-[#141a4a] to-[#0d102e] p-6 sm:p-8 rounded-3xl border-2 border-amber-500/40 shadow-2xl overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -end-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -start-24 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 font-mono-code font-bold text-xs uppercase tracking-wider">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>{isAr ? 'لوحة المتصدرين العالمية لأكاديمية إنسكو' : 'GLOBAL ACADEMY LEADERBOARD'}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight flex items-center gap-2">
              <span>{isAr ? 'نخبة مهندسي الفحص والمعالجة الحرارية' : 'Top Performing Inspection Engineers'}</span>
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {isAr
                ? 'تكريم رواد التميز الهندسي الحاصلين على أعلى الدرجات في اختبارات تأهيل ASNT و ASME و AWS المعتمدة. نافس زملاءك في قطاعات النفط والغاز والبتروكيماويات.'
                : 'Recognizing engineers achieving highest distinction scores in ASNT, ASME, and AWS qualification exams across oil, gas, and energy sectors.'}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            {onLaunchQuiz && (
              <button
                onClick={() => onLaunchQuiz()}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-xl shadow-amber-500/20 flex items-center gap-2 cursor-pointer scale-100 hover:scale-[1.02]"
              >
                <Flame className="w-4 h-4 text-slate-950" />
                <span>{isAr ? 'خُض الاختبار ونافس على الصدارة' : 'Challenge the Leaderboard'}</span>
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            )}

            <button
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              className="p-3 rounded-xl bg-[#12163b] hover:bg-[#1a2055] text-slate-300 hover:text-white border border-[#2b3575] transition cursor-pointer flex items-center gap-2 text-xs font-bold"
              title={isAr ? 'تحديث النتائج فورياً' : 'Refresh Leaderboard'}
            >
              <RefreshCw className={`w-4 h-4 text-amber-400 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{isAr ? 'تحديث فوري' : 'Live Sync'}</span>
            </button>
          </div>
        </div>

        {/* User's Best Status Pill */}
        {myBestEntry && (
          <div className="mt-6 pt-4 border-t border-[#232b68] flex flex-wrap items-center justify-between gap-3 text-xs bg-[#0b0e27]/60 p-3 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xs">
                #{myBestRank || '—'}
              </span>
              <div>
                <span className="text-slate-400">{isAr ? 'ترتيبك الشخصي:' : 'Your Personal Best:'} </span>
                <span className="font-bold text-white">{myBestEntry.userName}</span>
                <span className="text-slate-400"> • </span>
                <span className="text-emerald-400 font-bold">{myBestEntry.score}%</span>
                <span className="text-slate-400"> ({myBestEntry.disciplineTitleAr})</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-amber-400 text-[11px] font-mono-code">
                {isAr ? '🎯 مؤهل للتصدر العالمي' : '🎯 Verified Contender'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-[#0c0f2a] p-4 sm:p-5 rounded-2xl border border-[#202758] shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-amber-400 absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isAr
                  ? 'ابحث بالاسم، الشركة، التخصص، أو المستوى...'
                  : 'Search by engineer, company, discipline, or qualification...'
              }
              className="w-full bg-[#10143a] text-white placeholder-slate-400 text-xs rounded-xl border border-[#27306b] focus:border-amber-400 ps-9 pe-4 py-2.5 outline-none transition"
            />
          </div>

          {/* Quick Filter Selectors */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Discipline Select */}
            <div className="relative">
              <select
                aria-label={isAr ? 'تصفية حسب التخصص' : 'Filter by Discipline'}
                value={selectedDiscipline}
                onChange={(e) => setSelectedDiscipline(e.target.value)}
                className="bg-[#10143a] border border-[#27306b] hover:border-amber-400 text-slate-200 text-xs rounded-xl px-3 py-2.5 font-bold focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer pe-7"
              >
                <option value="all">{isAr ? 'جميع التخصصات (All)' : 'All Disciplines'}</option>
                {ENGINEERING_DISCIPLINES.map(d => (
                  <option key={d.id} value={d.id}>
                    {isAr ? d.titleAr : d.titleEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Tier Select */}
            <div className="relative">
              <select
                aria-label={isAr ? 'تصفية حسب المستوى' : 'Filter by Level'}
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                className="bg-[#10143a] border border-[#27306b] hover:border-amber-400 text-slate-200 text-xs rounded-xl px-3 py-2.5 font-bold focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer pe-7"
              >
                <option value="all">{isAr ? 'كافة المستويات (All Tiers)' : 'All Tiers'}</option>
                <option value="level3">{isAr ? 'المستوى الثالث (Level III Specialist)' : 'Level III Specialist'}</option>
                <option value="level2">{isAr ? 'المستوى الثاني (Level II Inspector)' : 'Level II Inspector'}</option>
                <option value="academic">{isAr ? 'الأساس الأكاديمي (Academic)' : 'Academic Foundation'}</option>
              </select>
            </div>

            {/* Timeframe Buttons */}
            <div className="flex items-center bg-[#10143a] p-1 rounded-xl border border-[#27306b]">
              <button
                onClick={() => setTimeframe('all')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  timeframe === 'all'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {isAr ? 'كل الأوقات' : 'All Time'}
              </button>
              <button
                onClick={() => setTimeframe('month')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  timeframe === 'month'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {isAr ? 'هذا الشهر' : 'Month'}
              </button>
              <button
                onClick={() => setTimeframe('week')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  timeframe === 'week'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {isAr ? 'هذا الأسبوع' : 'Week'}
              </button>
            </div>
          </div>
        </div>

        {/* Results Count & Active Filters Summary */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 font-mono-code border-t border-[#1b224e]">
          <span>
            {isAr
              ? `إجمالي المتصدرين المصنفين: ${filteredEntries.length} مهندس وفاحص`
              : `Ranked Performers: ${filteredEntries.length} engineers`}
          </span>

          {(selectedDiscipline !== 'all' || selectedTier !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedDiscipline('all');
                setSelectedTier('all');
                setTimeframe('all');
                setSearchQuery('');
              }}
              className="text-amber-400 hover:underline cursor-pointer"
            >
              {isAr ? 'إعادة ضبط الفلاتر' : 'Reset filters'}
            </button>
          )}
        </div>
      </div>

      {/* The Winner's Podium: Top 3 Performers */}
      {filteredEntries.length >= 3 && !searchQuery && (
        <div className="relative pt-6">
          <div className="text-center mb-6">
            <span className="text-xs font-mono-code font-bold uppercase tracking-widest text-amber-400">
              {isAr ? 'منصة التتويج الشرفية' : 'THE WINNER’S PODIUM'}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              {isAr ? 'الثلاثة الأوائل على مستوى المنظومة' : 'Top 3 Champion Performers'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end max-w-4xl mx-auto">
            {/* Rank 2 (Silver) */}
            <div className="order-2 md:order-1 bg-gradient-to-b from-[#141b3e] to-[#0c0f26] p-5 rounded-2xl border-2 border-slate-300/40 shadow-xl flex flex-col items-center text-center relative group hover:border-slate-200 transition">
              <div className="w-9 h-9 rounded-full bg-slate-300 text-slate-950 font-black flex items-center justify-center text-sm shadow-lg mb-3">
                🥈 2
              </div>

              <div className="w-16 h-16 rounded-2xl bg-[#1e2554] border-2 border-slate-300/50 flex items-center justify-center text-2xl font-black text-slate-200 mb-3 relative">
                <span>{top2.country ? (COUNTRY_FLAGS[top2.country]?.flag || '🌍') : '🥈'}</span>
                <span className="absolute -bottom-2 -end-2 text-[10px] font-mono-code bg-slate-200 text-slate-950 font-bold px-1.5 py-0.5 rounded">
                  {top2.score}%
                </span>
              </div>

              <h4 className="font-bold text-white text-sm line-clamp-1">{top2.userName}</h4>
              <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{top2.userRole}</p>
              <div className="text-[10px] text-slate-500 font-mono-code mt-0.5">{top2.company}</div>

              <div className="w-full mt-3 pt-3 border-t border-slate-400/20 flex items-center justify-between text-[11px]">
                <span className="text-slate-300 font-bold truncate max-w-[140px]">{isAr ? top2.disciplineTitleAr : top2.disciplineTitleEn}</span>
                <span className="font-mono-code text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {formatDuration(top2.timeSpentSeconds)}
                </span>
              </div>
            </div>

            {/* Rank 1 (Gold - Center & Taller) */}
            <div className="order-1 md:order-2 bg-gradient-to-b from-[#241e12] via-[#1c1815] to-[#0e0c15] p-6 rounded-2xl border-2 border-amber-400 shadow-2xl shadow-amber-500/20 flex flex-col items-center text-center relative group scale-[1.03] -translate-y-2">
              <div className="absolute -top-4 w-9 h-9 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black flex items-center justify-center text-base shadow-xl">
                <Crown className="w-5 h-5 text-slate-950 fill-slate-950" />
              </div>

              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500/30 to-amber-600/10 border-2 border-amber-400 flex items-center justify-center text-3xl font-black text-amber-300 mb-3 mt-1 relative shadow-inner">
                <span>{top1.country ? (COUNTRY_FLAGS[top1.country]?.flag || '🏆') : '🏆'}</span>
                <div className="absolute -bottom-2.5 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs shadow-md">
                  {top1.score}% 🌟
                </div>
              </div>

              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[10px] mb-1">
                <span>{isAr ? 'البطل المتصدر #1' : 'Champion #1'}</span>
              </div>

              <h4 className="font-black text-white text-base line-clamp-1">{top1.userName}</h4>
              <p className="text-xs text-amber-300/90 line-clamp-1 mt-0.5 font-bold">{top1.userRole}</p>
              <div className="text-[11px] text-slate-400 font-mono-code mt-0.5">{top1.company}</div>

              <div className="w-full mt-4 pt-3 border-t border-amber-400/30 flex items-center justify-between text-xs">
                <span className="text-amber-300 font-bold truncate max-w-[150px]">
                  {isAr ? top1.disciplineTitleAr : top1.disciplineTitleEn}
                </span>
                <span className="font-mono-code text-amber-400 font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {formatDuration(top1.timeSpentSeconds)}
                </span>
              </div>
            </div>

            {/* Rank 3 (Bronze) */}
            <div className="order-3 bg-gradient-to-b from-[#211612] to-[#0d0912] p-5 rounded-2xl border-2 border-amber-700/50 shadow-xl flex flex-col items-center text-center relative group hover:border-amber-600 transition">
              <div className="w-9 h-9 rounded-full bg-amber-700 text-white font-black flex items-center justify-center text-sm shadow-lg mb-3">
                🥉 3
              </div>

              <div className="w-16 h-16 rounded-2xl bg-[#2a1b15] border-2 border-amber-700/60 flex items-center justify-center text-2xl font-black text-amber-200 mb-3 relative">
                <span>{top3.country ? (COUNTRY_FLAGS[top3.country]?.flag || '🥉') : '🥉'}</span>
                <span className="absolute -bottom-2 -end-2 text-[10px] font-mono-code bg-amber-700 text-white font-bold px-1.5 py-0.5 rounded">
                  {top3.score}%
                </span>
              </div>

              <h4 className="font-bold text-white text-sm line-clamp-1">{top3.userName}</h4>
              <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{top3.userRole}</p>
              <div className="text-[10px] text-slate-500 font-mono-code mt-0.5">{top3.company}</div>

              <div className="w-full mt-3 pt-3 border-t border-amber-700/30 flex items-center justify-between text-[11px]">
                <span className="text-slate-300 font-bold truncate max-w-[140px]">{isAr ? top3.disciplineTitleAr : top3.disciplineTitleEn}</span>
                <span className="font-mono-code text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {formatDuration(top3.timeSpentSeconds)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Ranked Table / Cards */}
      <div className="bg-[#0b0e27] rounded-2xl border border-[#202758] shadow-2xl overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[#1b224d] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h3 className="font-black text-white text-sm sm:text-base">
              {isAr ? 'جدول الترتيب العام للأداء' : 'Global Performance Standings'}
            </h3>
          </div>

          <span className="text-xs font-mono-code text-slate-400">
            {filteredEntries.length} {isAr ? 'مشترك' : 'entries'}
          </span>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
            <p className="text-sm font-bold">{isAr ? 'جاري تحميل لوحة المتصدرين وتحديث النتائج...' : 'Loading live leaderboard standings...'}</p>
          </div>
        ) : filteredEntries.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-500 mx-auto" />
            <p className="text-sm font-bold text-white">{isAr ? 'لا توجد نتائج تطابق خيارات التصفية' : 'No records match your filters'}</p>
            <p className="text-xs text-slate-400">
              {isAr ? 'جرب تغيير التخصص أو البحث عن اسم آخر.' : 'Try adjusting the discipline or search query.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#171d44]">
            {filteredEntries.map((item, index) => {
              const rank = index + 1;
              const isTop1 = rank === 1;
              const isTop2 = rank === 2;
              const isTop3 = rank === 3;
              const isTop10 = rank <= 10;
              const isMine = item.isCurrentUser;

              return (
                <div
                  key={item.id}
                  className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                    isMine
                      ? 'bg-amber-500/10 border-s-4 border-amber-400'
                      : isTop1
                      ? 'bg-[#18151f]/50 hover:bg-[#1a1727]'
                      : isTop2
                      ? 'bg-[#111636]/50 hover:bg-[#141b42]'
                      : isTop3
                      ? 'bg-[#17121b]/50 hover:bg-[#1a1523]'
                      : 'hover:bg-[#0f1335]'
                  }`}
                >
                  {/* Left info: Rank, Avatar, Name, Company */}
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Rank Badge */}
                    <div className="shrink-0 flex items-center justify-center">
                      {isTop1 ? (
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black flex items-center justify-center text-xs shadow-md">
                          🥇 1
                        </div>
                      ) : isTop2 ? (
                        <div className="w-8 h-8 rounded-xl bg-slate-300 text-slate-950 font-black flex items-center justify-center text-xs shadow-md">
                          🥈 2
                        </div>
                      ) : isTop3 ? (
                        <div className="w-8 h-8 rounded-xl bg-amber-700 text-white font-black flex items-center justify-center text-xs shadow-md">
                          🥉 3
                        </div>
                      ) : (
                        <div className={`w-8 h-8 rounded-xl border flex items-center justify-center text-xs font-mono-code font-bold ${
                          isTop10
                            ? 'bg-[#141940] border-[#293575] text-amber-300'
                            : 'bg-[#0e112e] border-[#1d2350] text-slate-400'
                        }`}>
                          #{rank}
                        </div>
                      )}
                    </div>

                    {/* Flag / Avatar */}
                    <div className="w-10 h-10 rounded-xl bg-[#141842] border border-[#273273] flex items-center justify-center text-lg shrink-0">
                      <span>{item.country ? (COUNTRY_FLAGS[item.country]?.flag || '🌐') : '👤'}</span>
                    </div>

                    {/* Engineer Details */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-white text-xs sm:text-sm truncate">
                          {item.userName}
                        </span>

                        {isMine && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-slate-950 font-mono-code">
                            {isAr ? 'أنت' : 'YOU'}
                          </span>
                        )}

                        <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-[#151a44] text-slate-300 border border-[#242e6f] truncate max-w-[130px]">
                          {isAr ? item.disciplineTitleAr : item.disciplineTitleEn}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400 truncate">
                        <span>{item.userRole}</span>
                        {item.company && (
                          <>
                            <span>•</span>
                            <span className="text-slate-400">{item.company}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right info: Score Gauge, Time, Share */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-[#1c224e]">
                    {/* Score Gauge */}
                    <div className="text-end">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-[#12163b] rounded-full h-2 hidden md:block overflow-hidden border border-[#202758]">
                          <div
                            className={`h-full rounded-full ${
                              item.score >= 95
                                ? 'bg-gradient-to-r from-amber-400 to-emerald-400'
                                : item.score >= 85
                                ? 'bg-gradient-to-r from-amber-500 to-amber-400'
                                : 'bg-gradient-to-r from-sky-400 to-blue-500'
                            }`}
                            style={{ width: `${item.score}%` }}
                          />
                        </div>

                        <span className={`text-base sm:text-lg font-black font-mono-code ${
                          item.score >= 95 ? 'text-amber-400' : item.score >= 85 ? 'text-emerald-400' : 'text-sky-300'
                        }`}>
                          {item.score}%
                        </span>
                      </div>

                      <div className="text-[10px] font-mono-code text-slate-400 flex items-center justify-end gap-1.5 mt-0.5">
                        <span className="text-emerald-400 font-bold">{item.correctCount}/{item.totalQuestions} {isAr ? 'صحيحة' : 'correct'}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          {formatDuration(item.timeSpentSeconds)}
                        </span>
                      </div>
                    </div>

                    {/* Share Button */}
                    <button
                      onClick={() => handleShare(item, rank)}
                      className="p-2 rounded-xl bg-[#12173e] hover:bg-[#1c235a] text-slate-400 hover:text-amber-300 border border-[#232b66] transition cursor-pointer"
                      title={isAr ? 'مشاركة النتيجة' : 'Share Result'}
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer Info Box */}
      <div className="bg-[#0b0e25] p-5 rounded-2xl border border-[#1e2552] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
          <span>
            {isAr
              ? 'تعتمد جميع النتائج على خوارزمية قياس دقيقة معتمدة طبقاً لمعايير ASNT SNT-TC-1A و ASME BPVC. يتم تسجيل النتائج فور إتمام أي اختبار في بنك الأسئلة.'
              : 'All standings are calculated per ASNT SNT-TC-1A and ASME BPVC exam guidelines. High scores are recorded upon exam completion.'}
          </span>
        </div>

        {onLaunchQuiz && (
          <button
            onClick={() => onLaunchQuiz()}
            className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>{isAr ? 'بدء اختبار جديد' : 'Launch New Quiz'}</span>
            {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>
    </div>
  );
};
