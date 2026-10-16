import React, { useState, useEffect, useRef } from 'react';
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Volume2,
  VolumeX,
  Headphones,
  Flame,
  Award,
  Sparkles,
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
  X,
  ChevronDown,
  Minimize2,
  Maximize2,
  Coffee,
  Zap,
  Target
} from 'lucide-react';
import { Language } from '../../types';
import {
  FocusTimerMode,
  StudySessionRecord,
  playFocusSound,
  toggleAmbientNoise,
  getStoredStudySessions,
  saveStudySession,
  calculateFocusStats,
  formatTimerSeconds,
  formatDurationHuman,
  FOCUS_SESSION_COMPLETED_EVENT
} from '../../utils/focusTimerService';

interface FocusStudyStationProps {
  language: Language;
  preselectedDisciplineId?: string;
  preselectedDisciplineName?: { ar: string; en: string };
  preselectedModuleId?: string;
  preselectedModuleTitle?: { ar: string; en: string };
  onClose?: () => void;
  isModal?: boolean;
}

const PRESET_MODES: {
  id: FocusTimerMode;
  nameAr: string;
  nameEn: string;
  minutes: number;
  icon: typeof Timer;
  color: string;
  ringColor: string;
  descAr: string;
  descEn: string;
}[] = [
  {
    id: 'pomodoro',
    nameAr: 'بومودورو قياسي (25 دقيقة)',
    nameEn: 'Standard Pomodoro (25m)',
    minutes: 25,
    icon: Flame,
    color: 'amber',
    ringColor: '#f59e0b',
    descAr: 'تركيز مكثف لمدة 25 دقيقة يليه استراحة قصيرة لتثبيت المعلومات',
    descEn: '25 min deep focus interval followed by a short recovery break'
  },
  {
    id: 'deep_study',
    nameAr: 'جلسة تعمق هندسي (50 دقيقة)',
    nameEn: 'Deep NDT Study (50m)',
    minutes: 50,
    icon: Zap,
    color: 'cyan',
    ringColor: '#06b6d4',
    descAr: 'جلسة مطولة لمراجعة الأكواد الهندسية وحسابات المعالجة الحرارية المعقدة',
    descEn: 'Extended deep dive for ASME codes and thermal calculations'
  },
  {
    id: 'short_break',
    nameAr: 'استراحة قصيرة (5 دقائق)',
    nameEn: 'Short Break (5m)',
    minutes: 5,
    icon: Coffee,
    color: 'emerald',
    ringColor: '#10b981',
    descAr: 'استراحة لإراحة العينين واستعادة التركيز قبل الجولة التالية',
    descEn: 'Quick 5-minute pause to refresh mental alertness'
  },
  {
    id: 'long_break',
    nameAr: 'استراحة طويلة (15 دقيقة)',
    nameEn: 'Long Rest (15m)',
    minutes: 15,
    icon: Sparkles,
    color: 'purple',
    ringColor: '#a855f7',
    descAr: 'استراحة موسعة بعد إكمال 4 جولات تركيز هندسية',
    descEn: 'Extended cooldown recommended after 4 study cycles'
  },
  {
    id: 'stopwatch',
    nameAr: 'مؤقت مفتوح / عداد حر',
    nameEn: 'Free Flow Stopwatch',
    minutes: 0,
    icon: Clock,
    color: 'blue',
    ringColor: '#3b82f6',
    descAr: 'عداد مفتوح لتسجيل الوقت الفعلي للدراسة دون حد زمني مسبق',
    descEn: 'Open-ended study tracker logging exact elapsed study minutes'
  }
];

const DISCIPLINES_LIST = [
  { id: 'pwht_heat_treatment', nameAr: 'المعالجة الحرارية (PWHT)', nameEn: 'Post-Weld Heat Treatment (PWHT)', icon: '🔥' },
  { id: 'radiographic_testing', nameAr: 'الفحص الإشعاعي (RT)', nameEn: 'Radiographic Testing (RT)', icon: '☢️' },
  { id: 'ultrasonic_testing', nameAr: 'الموجات فوق الصوتية (UT)', nameEn: 'Ultrasonic Testing (UT)', icon: '📡' },
  { id: 'magnetic_particle', nameAr: 'الجسيمات المغناطيسية (MT)', nameEn: 'Magnetic Particle (MT)', icon: '🧲' },
  { id: 'liquid_penetrant', nameAr: 'السوائل النافذة (PT)', nameEn: 'Liquid Penetrant (PT)', icon: '🧪' },
  { id: 'visual_testing', nameAr: 'الفحص البصري (VT)', nameEn: 'Visual Testing (VT)', icon: '👁️' },
  { id: 'eddy_current', nameAr: 'التيارات الدوامية (ET)', nameEn: 'Eddy Current (ET)', icon: '⚡' },
  { id: 'leak_testing', nameAr: 'فحص التسريب (LT)', nameEn: 'Leak Testing (LT)', icon: '💧' },
  { id: 'asme_api_standards', nameAr: 'أكواد ASME / API / AWS', nameEn: 'ASME / API / AWS Standards', icon: '📜' },
  { id: 'general_ndt', nameAr: 'مراجعة وتأهيل عام ASNT', nameEn: 'General NDT Certification', icon: '🎓' }
];

export const FocusStudyStation: React.FC<FocusStudyStationProps> = ({
  language,
  preselectedDisciplineId,
  preselectedDisciplineName,
  preselectedModuleId,
  preselectedModuleTitle,
  onClose,
  isModal = false
}) => {
  const isAr = language === 'ar';

  // Mode & Timer Setup
  const [currentMode, setCurrentMode] = useState<FocusTimerMode>('pomodoro');
  const [selectedDiscipline, setSelectedDiscipline] = useState<{ id: string; nameAr: string; nameEn: string }>(() => {
    if (preselectedDisciplineId) {
      const match = DISCIPLINES_LIST.find(d => d.id === preselectedDisciplineId);
      if (match) return match;
      if (preselectedDisciplineName) {
        return {
          id: preselectedDisciplineId,
          nameAr: preselectedDisciplineName.ar,
          nameEn: preselectedDisciplineName.en
        };
      }
    }
    return DISCIPLINES_LIST[0]; // default PWHT
  });

  const [studyGoal, setStudyGoal] = useState<string>(
    preselectedModuleTitle ? (isAr ? preselectedModuleTitle.ar : preselectedModuleTitle.en) : ''
  );

  // Timer Core States
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [targetSeconds, setTargetSeconds] = useState<number>(25 * 60);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(25 * 60);
  const [elapsedStudySeconds, setElapsedStudySeconds] = useState<number>(0);
  const [completedPomodoros, setCompletedPomodoros] = useState<number>(0);
  const [sessionCompletedModal, setSessionCompletedModal] = useState<StudySessionRecord | null>(null);

  // Audio toggles
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [ambientSound, setAmbientSound] = useState<boolean>(false);

  // Analytics stats
  const [stats, setStats] = useState(calculateFocusStats());

  // Interval reference
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync mode changes when idle
  const handleSelectMode = (mode: FocusTimerMode) => {
    if (isRunning && !confirm(isAr ? 'هل تريد تغيير وضع المؤقت وإعادة ضبط الجولة الحالية؟' : 'Change timer mode and reset current session?')) {
      return;
    }
    stopTimerCleanup();
    setCurrentMode(mode);
    const preset = PRESET_MODES.find(m => m.id === mode);
    const secs = preset ? preset.minutes * 60 : 0;
    setTargetSeconds(secs);
    setRemainingSeconds(secs);
    setElapsedStudySeconds(0);
    setIsRunning(false);
    setIsPaused(false);
  };

  // Timer Tick Handler
  useEffect(() => {
    if (isRunning && !isPaused) {
      timerRef.current = setInterval(() => {
        if (currentMode === 'stopwatch') {
          setElapsedStudySeconds(prev => prev + 1);
        } else {
          setRemainingSeconds(prev => {
            if (prev <= 1) {
              handleSessionComplete();
              return 0;
            }
            return prev - 1;
          });
          setElapsedStudySeconds(prev => prev + 1);
        }
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, isPaused, currentMode]);

  // Ambient sound sync
  useEffect(() => {
    if (isRunning && !isPaused && ambientSound) {
      toggleAmbientNoise(true, 0.04);
    } else {
      toggleAmbientNoise(false);
    }
    return () => {
      toggleAmbientNoise(false);
    };
  }, [isRunning, isPaused, ambientSound]);

  // Listen for storage updates
  useEffect(() => {
    const refreshStats = () => setStats(calculateFocusStats());
    window.addEventListener(FOCUS_SESSION_COMPLETED_EVENT, refreshStats);
    window.addEventListener('storage', refreshStats);
    return () => {
      window.removeEventListener(FOCUS_SESSION_COMPLETED_EVENT, refreshStats);
      window.removeEventListener('storage', refreshStats);
    };
  }, []);

  const stopTimerCleanup = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = () => {
    if (soundEnabled) {
      playFocusSound('start');
    }
    setIsRunning(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    if (soundEnabled) {
      playFocusSound('pause');
    }
    setIsPaused(true);
  };

  const resumeTimer = () => {
    if (soundEnabled) {
      playFocusSound('start');
    }
    setIsPaused(false);
  };

  const resetTimer = () => {
    stopTimerCleanup();
    const preset = PRESET_MODES.find(m => m.id === currentMode);
    const secs = preset ? preset.minutes * 60 : 0;
    setRemainingSeconds(secs);
    setElapsedStudySeconds(0);
    setIsRunning(false);
    setIsPaused(false);
  };

  const handleSessionComplete = () => {
    stopTimerCleanup();
    setIsRunning(false);
    setIsPaused(false);

    const isBreak = currentMode === 'short_break' || currentMode === 'long_break';

    if (soundEnabled) {
      playFocusSound(isBreak ? 'break' : 'complete');
    }

    const durationSec = currentMode === 'stopwatch' ? elapsedStudySeconds : targetSeconds;
    const targetMins = Math.round(targetSeconds / 60);

    const record = saveStudySession({
      disciplineId: selectedDiscipline.id,
      disciplineName: { ar: selectedDiscipline.nameAr, en: selectedDiscipline.nameEn },
      moduleId: preselectedModuleId,
      moduleTitle: preselectedModuleTitle,
      mode: currentMode,
      durationSeconds: Math.max(1, durationSec),
      targetMinutes: targetMins,
      completed: true,
      notes: studyGoal.trim() || undefined
    });

    if (currentMode === 'pomodoro' || currentMode === 'deep_study') {
      setCompletedPomodoros(prev => prev + 1);
    }

    setSessionCompletedModal(record);
    setStats(calculateFocusStats());
  };

  const handleFinishEarly = () => {
    if (elapsedStudySeconds < 30) {
      if (confirm(isAr ? 'الجلسة قصيرة جداً (أقل من 30 ثانية). هل ترغب في إلغائها دون حفظ؟' : 'Session is less than 30s. Cancel without saving?')) {
        resetTimer();
        return;
      }
    }

    stopTimerCleanup();
    setIsRunning(false);
    setIsPaused(false);

    if (soundEnabled) {
      playFocusSound('complete');
    }

    const record = saveStudySession({
      disciplineId: selectedDiscipline.id,
      disciplineName: { ar: selectedDiscipline.nameAr, en: selectedDiscipline.nameEn },
      moduleId: preselectedModuleId,
      moduleTitle: preselectedModuleTitle,
      mode: currentMode,
      durationSeconds: elapsedStudySeconds,
      targetMinutes: Math.round(targetSeconds / 60),
      completed: currentMode === 'stopwatch' ? true : elapsedStudySeconds >= targetSeconds * 0.8,
      notes: studyGoal.trim() || undefined
    });

    setSessionCompletedModal(record);
    setStats(calculateFocusStats());
  };

  // Progress percentage calculation
  const currentPreset = PRESET_MODES.find(m => m.id === currentMode) || PRESET_MODES[0];
  let progressPct = 0;
  if (currentMode === 'stopwatch') {
    progressPct = Math.min(100, (elapsedStudySeconds % 3600) / 36);
  } else if (targetSeconds > 0) {
    progressPct = Math.min(100, Math.max(0, ((targetSeconds - remainingSeconds) / targetSeconds) * 100));
  }

  // Circular SVG specs
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPct / 100) * circumference;

  const displayTime = currentMode === 'stopwatch' ? formatTimerSeconds(elapsedStudySeconds) : formatTimerSeconds(remainingSeconds);

  return (
    <div className={`w-full ${isModal ? 'max-w-4xl mx-auto bg-[#0a0d1f] rounded-2xl border-2 border-[#202755] shadow-2xl overflow-hidden' : ''}`}>
      {/* Station Header */}
      <div className="flex items-center justify-between p-4 sm:p-6 bg-gradient-to-r from-[#0c0e24] via-[#101436] to-[#0c0e24] border-b border-[#21264c]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-400/40 text-amber-400 shadow-md shadow-amber-500/10">
            <Timer className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-white tracking-wide">
                {isAr ? 'مؤقت التركيز ودراسة NDT/PWHT' : 'INSCO Focus Study Station'}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400/15 text-amber-300 border border-amber-400/30">
                ASNT Deep Focus
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {isAr
                ? 'إدارة جلسات الاستذكار والتركيز في الأكواد الهندسية وتقنيات الفحص والمعالجة الحرارية'
                : 'Active study interval tracking for NDT methods, ASME codes & PWHT qualification'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Sound Mute/Unmute */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? (isAr ? 'كتم التنبيهات الصوتية' : 'Mute sound effects') : (isAr ? 'تفعيل الأصوات' : 'Enable sound')}
            className={`p-2 rounded-xl border text-xs font-semibold transition cursor-pointer ${
              soundEnabled
                ? 'bg-[#181d45] border-[#2c3475] text-amber-400 hover:bg-[#20275a]'
                : 'bg-[#10132b] border-[#1e234a] text-slate-500 hover:text-slate-300'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Ambient Noise Generator Toggle */}
          <button
            onClick={() => setAmbientSound(!ambientSound)}
            title={ambientSound ? (isAr ? 'إيقاف ضوضاء التركيز' : 'Turn off ambient white noise') : (isAr ? 'تشغيل ضوضاء التركيز (Ambient)' : 'Play ambient focus noise')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition cursor-pointer ${
              ambientSound
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                : 'bg-[#10132b] border-[#1e234a] text-slate-400 hover:text-white'
            }`}
          >
            <Headphones className="w-4 h-4" />
            <span className="hidden sm:inline">{isAr ? 'ضوضاء التركيز' : 'Focus Noise'}</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#10132b] hover:bg-rose-500/20 border border-[#1e234a] hover:border-rose-400 text-slate-400 hover:text-rose-300 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Study Workspace Body */}
      <div className="p-4 sm:p-6 space-y-6">
        {/* Preset Modes Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {PRESET_MODES.map(mode => {
            const Icon = mode.icon;
            const isSelected = currentMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => handleSelectMode(mode.id)}
                className={`flex flex-col items-center text-center p-3 rounded-xl border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#181e4b] border-amber-400 text-white shadow-lg shadow-amber-500/15 scale-[1.02]'
                    : 'bg-[#0f122c] border-[#1f2557] text-slate-400 hover:text-slate-200 hover:border-[#2f3885]'
                }`}
              >
                <div
                  className={`p-2 rounded-lg mb-1.5 ${
                    isSelected ? 'bg-amber-400 text-slate-950 font-black' : 'bg-[#161a3f] text-slate-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-black truncate max-w-full">
                  {isAr ? mode.nameAr : mode.nameEn}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  {mode.minutes > 0 ? `${mode.minutes} ${isAr ? 'دقيقة' : 'min'}` : isAr ? 'حر' : 'Open'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Configuration Bar: Discipline & Study Intention */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#0d1029] p-4 rounded-xl border border-[#21275b]">
          {/* Discipline Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <span>{isAr ? 'التخصص الهندسي المستهدف:' : 'Target Engineering Discipline:'}</span>
            </label>
            <div className="relative">
              <select
                disabled={isRunning && !isPaused}
                value={selectedDiscipline.id}
                onChange={e => {
                  const match = DISCIPLINES_LIST.find(d => d.id === e.target.value);
                  if (match) setSelectedDiscipline(match);
                }}
                className="w-full bg-[#14193f] border border-[#262e6e] rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-100 focus:outline-none focus:border-amber-400 cursor-pointer disabled:opacity-70"
              >
                {DISCIPLINES_LIST.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.icon} {isAr ? d.nameAr : d.nameEn}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Goal / Topic Target */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
              <span>{isAr ? 'هدف الجلسة والموضوع الدراسي:' : 'Study Goal & Focus Objective:'}</span>
              {preselectedModuleTitle && (
                <span className="text-[10px] text-amber-400 font-normal">
                  {isAr ? 'مرتبط بالوحدة الدراسية' : 'Linked Module'}
                </span>
              )}
            </label>
            <input
              type="text"
              placeholder={isAr ? 'مثال: مراجعة جداول ASME B31.3 أو حسابات منحنى PWHT' : 'e.g., ASME B31.3 Soak Temp or UT DAC Calibration'}
              value={studyGoal}
              onChange={e => setStudyGoal(e.target.value)}
              className="w-full bg-[#14193f] border border-[#262e6e] rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Central Circular Timer & Controls */}
        <div className="flex flex-col items-center justify-center py-6 px-4 bg-gradient-to-b from-[#0c0f2a] to-[#090b1e] rounded-2xl border-2 border-[#1f265b] relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div
            className="absolute w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700"
            style={{ backgroundColor: currentPreset.ringColor }}
          />

          {/* Mode Badge & Cycle Counter */}
          <div className="flex items-center gap-2 mb-4 z-10">
            <span
              className="px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase border"
              style={{
                backgroundColor: `${currentPreset.ringColor}20`,
                borderColor: `${currentPreset.ringColor}60`,
                color: currentPreset.ringColor
              }}
            >
              {isAr ? currentPreset.nameAr : currentPreset.nameEn}
            </span>

            {completedPomodoros > 0 && (
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-400/10 border border-amber-400/30 text-amber-300 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>{completedPomodoros} {isAr ? 'جولات مكتملة' : 'cycles'}</span>
              </span>
            )}
          </div>

          {/* Circular SVG Timer */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center z-10">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 280 280">
              {/* Background Track */}
              <circle
                cx="140"
                cy="140"
                r={radius}
                className="text-[#15193d]"
                strokeWidth="12"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Progress Ring */}
              <circle
                cx="140"
                cy="140"
                r={radius}
                stroke={currentPreset.ringColor}
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                style={{
                  transition: 'stroke-dashoffset 1s linear, stroke 0.5s ease',
                  filter: `drop-shadow(0 0 8px ${currentPreset.ringColor}70)`
                }}
              />
            </svg>

            {/* Internal Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
              <span className="text-4xl sm:text-5xl font-black text-white tracking-widest font-mono drop-shadow-md">
                {displayTime}
              </span>

              <span className="text-xs text-slate-300 font-semibold mt-2 max-w-[180px] truncate">
                {isAr ? selectedDiscipline.nameAr : selectedDiscipline.nameEn}
              </span>

              <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                {isRunning ? (
                  isPaused ? (
                    <span className="text-amber-400 font-bold">{isAr ? 'متوقف مؤقتاً' : 'Paused'}</span>
                  ) : (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                      {isAr ? 'دراسة نشطة...' : 'Deep Focus...'}
                    </span>
                  )
                ) : (
                  <span>{isAr ? 'جاهز للبدء' : 'Ready to Start'}</span>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Button Controls */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6 z-10">
            {!isRunning ? (
              <button
                onClick={startTimer}
                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/30 transition-all transform active:scale-95 cursor-pointer"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>{isAr ? 'بدء جلسة التركيز' : 'Start Focus Session'}</span>
              </button>
            ) : isPaused ? (
              <button
                onClick={resumeTimer}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/25 transition cursor-pointer"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>{isAr ? 'استئناف' : 'Resume'}</span>
              </button>
            ) : (
              <button
                onClick={pauseTimer}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#232a63] hover:bg-[#2c357e] border border-[#3b47a0] text-amber-300 font-black text-sm shadow-lg transition cursor-pointer"
              >
                <Pause className="w-5 h-5 fill-current" />
                <span>{isAr ? 'إيقاف مؤقت' : 'Pause'}</span>
              </button>
            )}

            {isRunning && (
              <button
                onClick={handleFinishEarly}
                className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-[#13173d] hover:bg-[#1c225a] border border-[#2b347d] text-emerald-300 hover:text-emerald-200 text-xs font-bold transition cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{isAr ? 'إنهاء وحفظ الجلسة' : 'Log & Save'}</span>
              </button>
            )}

            <button
              onClick={resetTimer}
              title={isAr ? 'إعادة ضبط' : 'Reset'}
              className="p-3 rounded-xl bg-[#14183d] hover:bg-[#1d2358] border border-[#252c6f] text-slate-400 hover:text-white transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Study Analytics & Learning Performance Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Card 1: Today's Time */}
          <div className="bg-[#0e112c] p-4 rounded-xl border border-[#202758]">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>{isAr ? 'وقت دراسة اليوم' : "Today's Study"}</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">
              {formatDurationHuman(stats.todaySeconds, isAr)}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              {isAr ? 'دقائق تركيز فعالة' : 'Active focus minutes'}
            </div>
          </div>

          {/* Card 2: All-Time Hours */}
          <div className="bg-[#0e112c] p-4 rounded-xl border border-[#202758]">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>{isAr ? 'إجمالي ساعات الدراسة' : 'All-Time Time'}</span>
              <Award className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">
              {formatDurationHuman(stats.totalSeconds, isAr)}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              {stats.totalSessions} {isAr ? 'جلسات مسجلة' : 'logged sessions'}
            </div>
          </div>

          {/* Card 3: Study Streak */}
          <div className="bg-[#0e112c] p-4 rounded-xl border border-[#202758]">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>{isAr ? 'سلسلة الالتزام' : 'Study Streak'}</span>
              <Flame className="w-4 h-4 text-orange-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-amber-400 flex items-center gap-1.5">
              <span>{stats.currentStreakDays}</span>
              <span className="text-xs font-bold text-slate-300">{isAr ? 'أيام متتالية' : 'days'}</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              {stats.currentStreakDays > 0 ? (isAr ? 'استمر في الزخم الهندسي!' : 'Keep momentum going!') : (isAr ? 'ابدأ جلستك الأولى اليوم' : 'Start your streak today')}
            </div>
          </div>

          {/* Card 4: Completion Rate */}
          <div className="bg-[#0e112c] p-4 rounded-xl border border-[#202758]">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>{isAr ? 'إنجاز الجولات' : 'Completion Rate'}</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-400">
              {stats.totalSessions > 0
                ? `${Math.round((stats.completedSessions / stats.totalSessions) * 100)}%`
                : '100%'}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              {stats.completedSessions} {isAr ? 'جلسات مكتملة بالكامل' : 'completed targets'}
            </div>
          </div>
        </div>

        {/* Discipline Breakdown & Recent Sessions Log */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Discipline Distribution */}
          <div className="bg-[#0e112c] p-4 rounded-xl border border-[#202758]">
            <h3 className="text-xs font-bold text-slate-200 mb-3 flex items-center justify-between">
              <span>{isAr ? 'توزيع ساعات الاستذكار حسب التخصص:' : 'Discipline Study Distribution:'}</span>
              <Target className="w-3.5 h-3.5 text-amber-400" />
            </h3>
            {stats.disciplineBreakdown.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">
                {isAr ? 'لا توجد جلسات مسجلة بعد. ابدأ أول جلسة تركيز الآن!' : 'No logged sessions yet. Start your first session now!'}
              </p>
            ) : (
              <div className="space-y-2.5">
                {stats.disciplineBreakdown.slice(0, 5).map(item => {
                  const pct = stats.totalSeconds > 0 ? Math.round((item.seconds / stats.totalSeconds) * 100) : 0;
                  return (
                    <div key={item.disciplineId} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-slate-300">
                          {isAr ? item.disciplineName.ar : item.disciplineName.en}
                        </span>
                        <span className="text-slate-400 font-mono text-[11px]">
                          {formatDurationHuman(item.seconds, isAr)} ({pct}%)
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-[#181d45] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-cyan-400 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recent Sessions History */}
          <div className="bg-[#0e112c] p-4 rounded-xl border border-[#202758]">
            <h3 className="text-xs font-bold text-slate-200 mb-3 flex items-center justify-between">
              <span>{isAr ? 'سجل الجلسات الأخيرة:' : 'Recent Study Log:'}</span>
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            </h3>
            {stats.recentSessions.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">
                {isAr ? 'السجل فارغ حالياً' : 'No recent sessions logged yet'}
              </p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {stats.recentSessions.slice(0, 5).map(session => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-[#14183d] border border-[#1f265b] text-xs"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="font-semibold text-slate-200 truncate">
                        {isAr ? session.disciplineName?.ar : session.disciplineName?.en}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {session.notes || (isAr ? 'جلسة تركيز' : 'Focus Session')} • {session.dateStr}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="font-mono font-bold text-amber-400">
                        {formatDurationHuman(session.durationSeconds, isAr)}
                      </span>
                      <div className="text-[9px] text-emerald-400">
                        {session.completed ? (isAr ? 'مكتملة ✓' : 'Target Met ✓') : (isAr ? 'محفوظة' : 'Logged')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Celebration Modal on Session Completion */}
      {sessionCompletedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="max-w-md w-full bg-[#0d1029] border-2 border-emerald-400/60 rounded-2xl p-6 text-center shadow-2xl relative">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/20">
              <Award className="w-8 h-8 animate-bounce" />
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-emerald-400/15 text-emerald-300 border border-emerald-400/30">
              {isAr ? 'جلسة دراسية ناجحة!' : 'Session Completed!'}
            </span>

            <h3 className="text-xl font-black text-white mt-3">
              {isAr ? 'أحسنت! تم تسجيل وقت دراستك بنجاح' : 'Great Job! Study Time Logged'}
            </h3>

            <p className="text-xs text-slate-300 mt-2">
              {isAr
                ? `أكملت بنجاح ${formatDurationHuman(sessionCompletedModal.durationSeconds, isAr)} في تخصص ${sessionCompletedModal.disciplineName.ar}.`
                : `You completed ${formatDurationHuman(sessionCompletedModal.durationSeconds, false)} in ${sessionCompletedModal.disciplineName.en}.`}
            </p>

            <div className="mt-4 p-3 rounded-xl bg-[#14183d] border border-[#222a63] text-xs space-y-1">
              <div className="flex justify-between text-slate-300">
                <span>{isAr ? 'المدة المسجلة:' : 'Logged Duration:'}</span>
                <span className="font-bold text-amber-400 font-mono">
                  {formatDurationHuman(sessionCompletedModal.durationSeconds, isAr)}
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>{isAr ? 'إجمالي اليوم:' : "Today's Total:"}</span>
                <span className="font-bold text-cyan-400 font-mono">
                  {formatDurationHuman(stats.todaySeconds, isAr)}
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSessionCompletedModal(null);
                  handleSelectMode('short_break');
                  startTimer();
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition cursor-pointer"
              >
                <Coffee className="w-4 h-4" />
                <span>{isAr ? 'بدء استراحة 5 دقائق' : 'Take 5m Break'}</span>
              </button>

              <button
                onClick={() => setSessionCompletedModal(null)}
                className="px-5 py-2.5 rounded-xl bg-[#1c2254] hover:bg-[#252c6e] text-slate-200 font-bold text-xs transition cursor-pointer"
              >
                <span>{isAr ? 'إغلاق ومتابعة' : 'Close & Continue'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
