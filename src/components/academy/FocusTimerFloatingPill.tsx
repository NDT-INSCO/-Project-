import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, Maximize2, Flame, Sparkles } from 'lucide-react';
import { Language } from '../../types';
import { formatTimerSeconds, formatDurationHuman, calculateFocusStats, FOCUS_SESSION_COMPLETED_EVENT } from '../../utils/focusTimerService';

interface FocusTimerFloatingPillProps {
  language: Language;
  onOpenStation: () => void;
  isRunning?: boolean;
}

export const FocusTimerFloatingPill: React.FC<FocusTimerFloatingPillProps> = ({
  language,
  onOpenStation
}) => {
  const isAr = language === 'ar';
  const [stats, setStats] = useState(calculateFocusStats());

  useEffect(() => {
    const handleUpdate = () => {
      setStats(calculateFocusStats());
    };
    window.addEventListener(FOCUS_SESSION_COMPLETED_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener(FOCUS_SESSION_COMPLETED_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return (
    <div className="fixed bottom-5 left-5 z-40 animate-fadeIn">
      <button
        onClick={onOpenStation}
        className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-[#0d1029]/95 hover:bg-[#14183d] border-2 border-amber-400/50 hover:border-amber-400 text-white shadow-2xl shadow-amber-500/20 backdrop-blur-md transition-all transform hover:scale-105 cursor-pointer group"
        title={isAr ? 'فتح محطة مؤقت التركيز ودراسة NDT' : 'Open NDT Focus Study Station'}
      >
        <div className="relative">
          <div className="p-1.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/40 group-hover:scale-110 transition">
            <Timer className="w-4 h-4" />
          </div>
          {stats.todaySeconds > 0 && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0d1029]" />
          )}
        </div>

        <div className="text-left">
          <div className="text-[10px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
            <span>{isAr ? 'مؤقت التركيز' : 'Focus Timer'}</span>
            {stats.currentStreakDays > 0 && (
              <span className="text-orange-400 font-extrabold flex items-center">
                🔥{stats.currentStreakDays}d
              </span>
            )}
          </div>
          <div className="text-xs font-mono font-bold text-slate-200">
            {stats.todaySeconds > 0
              ? `${isAr ? 'اليوم: ' : 'Today: '}${formatDurationHuman(stats.todaySeconds, isAr)}`
              : isAr ? 'جاهز للدراسة' : 'Ready to Study'}
          </div>
        </div>

        <div className="p-1 rounded-lg bg-[#191f4d] text-slate-400 group-hover:text-white transition">
          <Maximize2 className="w-3.5 h-3.5" />
        </div>
      </button>
    </div>
  );
};
