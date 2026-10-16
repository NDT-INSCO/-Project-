import React, { useState } from 'react';
import { 
  Home, 
  UserCheck, 
  Bot, 
  Send, 
  GraduationCap, 
  ChevronUp, 
  ChevronDown, 
  Sparkles,
  Layers,
  Wrench,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { Language, UserRole } from '../types';
import { LanguageSelector } from './LanguageSelector';

interface UnifiedQuickDockProps {
  currentTab: string;
  onNavigateTab: (tab: string) => void;
  onOpenMessenger: () => void;
  language: Language;
  onLanguageChange?: (lang: Language) => void;
  currentRole: UserRole;
}

export const UnifiedQuickDock: React.FC<UnifiedQuickDockProps> = ({
  currentTab,
  onNavigateTab,
  onOpenMessenger,
  language,
  onLanguageChange,
  currentRole
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isAr = language === 'ar';

  const roleLabel = {
    manager: isAr ? 'المدير' : 'Manager',
    supervisor: isAr ? 'المشرف' : 'Supervisor',
    client: isAr ? 'العميل' : 'Client',
    worker: isAr ? 'العامل' : 'Worker',
    guest: isAr ? 'ضيف المنصة' : 'Guest'
  }[currentRole] || (isAr ? 'زائر' : 'Visitor');

  return (
    <aside 
      aria-label="Unified Practical Control Dock"
      className="fixed bottom-4 sm:bottom-6 start-4 sm:start-6 z-40 max-w-[calc(100vw-2rem)] select-none"
    >
      {/* Expanded quick flyout tray */}
      {isExpanded && (
        <div className="mb-2 p-2.5 rounded-2xl bg-[#0d1027]/95 backdrop-blur-xl border-2 border-amber-500/40 shadow-2xl shadow-black/80 flex flex-col gap-1.5 animate-fadeIn max-w-xs sm:max-w-sm">
          <div className="flex items-center justify-between px-2 py-1 border-b border-amber-500/20 text-xs">
            <span className="font-bold text-amber-300 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
              {isAr ? 'كبسولة التحكم والعمليات الموحدة' : 'Unified Operations Dock'}
            </span>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              aria-label="Close dock"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Practical Group 1: Navigation & Home */}
          {currentTab !== 'overview' && (
            <button
              onClick={() => {
                onNavigateTab('overview');
                setIsExpanded(false);
              }}
              className="flex items-center gap-2.5 p-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs transition cursor-pointer shadow-md"
            >
              <Home className="w-4 h-4 text-slate-950 flex-shrink-0" />
              <div className="text-start leading-tight">
                <span className="block font-black">{isAr ? 'العودة للصفحة الأولى (الرئيسية)' : 'Back to First Page (Home)'}</span>
                <span className="text-[10px] opacity-80">{isAr ? 'الرجوع المباشر للواجهة الأولى' : 'Return directly to landing overview'}</span>
              </div>
            </button>
          )}

          {/* Practical Group 2: Operations & RBAC Portal */}
          <button
            onClick={() => {
              onNavigateTab('operations');
              setIsExpanded(false);
            }}
            className={`flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              currentTab === 'operations'
                ? 'bg-amber-500/20 border border-amber-400 text-amber-300'
                : 'bg-[#151a3d] hover:bg-[#1d2454] border border-[#273273] text-slate-200'
            }`}
          >
            <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
              <UserCheck className="w-4 h-4" />
            </div>
            <div className="text-start leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="font-bold">{isAr ? 'بوابة العمليات والتراتبيات' : 'Operations & RBAC Portal'}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 font-semibold">
                  {roleLabel}
                </span>
              </div>
              <span className="text-[10px] text-slate-400">{isAr ? 'تتبع العاملين، طلبات العمل، والعملاء' : 'Live staff radar & work orders'}</span>
            </div>
          </button>

          {/* Practical Group 3: Smart AI Platform & Messenger */}
          <div className="grid grid-cols-2 gap-1.5 pt-0.5">
            <button
              onClick={() => {
                onNavigateTab('ai-platform');
                setIsExpanded(false);
              }}
              className={`flex items-center gap-1.5 p-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                currentTab === 'ai-platform'
                  ? 'bg-amber-500/20 border border-amber-400 text-amber-300'
                  : 'bg-[#151a3d] hover:bg-[#1d2454] border border-[#273273] text-slate-200'
              }`}
            >
              <Bot className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span className="truncate">{isAr ? 'منصة الرد الذكية' : 'AI Platform'}</span>
            </button>

            <button
              onClick={() => {
                onOpenMessenger();
                setIsExpanded(false);
              }}
              className="flex items-center gap-1.5 p-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs transition cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{isAr ? 'طلب عرض RFQ' : 'Request RFQ'}</span>
            </button>
          </div>

          {/* Practical Group 4: NDT Academy & Interactive Simulation Labs */}
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => {
                onNavigateTab('academy');
                setIsExpanded(false);
              }}
              className={`flex items-center gap-2 p-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                currentTab === 'academy'
                  ? 'bg-amber-500/20 border border-amber-400 text-amber-300'
                  : 'bg-[#151a3d] hover:bg-[#1d2454] border border-[#273273] text-slate-200'
              }`}
            >
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-3.5 h-3.5" />
              </div>
              <div className="text-start leading-tight">
                <span className="block font-bold">{isAr ? 'المناهج الـ 8' : '8 Curricula'}</span>
                <span className="text-[9px] text-slate-400">{isAr ? 'أساس، ليفيل 2، 3' : 'Acad, L2, L3'}</span>
              </div>
            </button>

            <button
              onClick={() => {
                onNavigateTab('workshops');
                setIsExpanded(false);
              }}
              className={`flex items-center gap-2 p-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                currentTab === 'workshops' || currentTab === 'simulation'
                  ? 'bg-amber-500/20 border border-amber-400 text-amber-300'
                  : 'bg-[#151a3d] hover:bg-[#1d2454] border border-[#273273] text-slate-200'
              }`}
            >
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                <Wrench className="w-3.5 h-3.5" />
              </div>
              <div className="text-start leading-tight">
                <div className="flex items-center gap-1">
                  <span className="block font-bold">{isAr ? 'المحاكاة الحية' : 'Live Labs'}</span>
                  <span className="text-[8px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-400 font-bold">6</span>
                </div>
                <span className="text-[9px] text-slate-400">{isAr ? 'ورش واختبارات' : 'Simulators'}</span>
              </div>
            </button>
          </div>

          {/* Language Selector in Dock */}
          {onLanguageChange && (
            <div className="pt-1 border-t border-amber-500/20">
              <span className="block text-[10px] font-bold text-amber-400/80 px-1 mb-1 uppercase">
                {isAr ? 'لغة التصفح' : 'Language'}
              </span>
              <LanguageSelector
                currentLanguage={language}
                onLanguageChange={(l) => {
                  onLanguageChange(l);
                  setIsExpanded(false);
                }}
                variant="dock"
              />
            </div>
          )}

          {/* Practical Group 5: Guest Exploration & Fast Entry */}
          <div className="pt-1 border-t border-amber-500/20">
            <button
              onClick={() => {
                onNavigateTab('operations');
                setIsExpanded(false);
              }}
              className="w-full flex items-center justify-center gap-1.5 p-2 rounded-xl bg-gradient-to-r from-cyan-950/80 to-[#10234a] hover:from-cyan-900/80 hover:to-[#172e60] border border-cyan-400/40 text-cyan-300 text-xs font-bold transition cursor-pointer shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isAr ? 'تصفح كـ ضيف حر (Guest Explorer)' : 'Explore as Guest (No Password)'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Dock Capsule (Merged and compact, strictly within page bounds) */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#0b0e22]/95 backdrop-blur-xl border-2 border-amber-500/50 shadow-2xl shadow-black/70 ring-2 ring-black/40">
        {/* Quick Home Return Button when on inner pages */}
        {currentTab !== 'overview' && (
          <button
            onClick={() => onNavigateTab('overview')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-md transition transform active:scale-95 cursor-pointer whitespace-nowrap"
            title={isAr ? 'العودة للصفحة الأولى (الرئيسية)' : 'Back to Home / First Page'}
          >
            <Home className="w-4 h-4 text-slate-950" />
            <span className="hidden sm:inline font-black">{isAr ? 'الرئيسية' : 'Home'}</span>
          </button>
        )}

        {/* Merged Practical Action 1: Operations Portal */}
        <button
          onClick={() => onNavigateTab('operations')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold transition cursor-pointer whitespace-nowrap ${
            currentTab === 'operations'
              ? 'bg-amber-500 text-slate-950 shadow-md font-black'
              : 'text-amber-300 hover:bg-[#1b2252]'
          }`}
          title={isAr ? 'بوابة العمليات والتراتبيات الميدانية' : 'Operations & RBAC Portal'}
        >
          <UserCheck className="w-4 h-4" />
          <span className="hidden md:inline">{isAr ? 'العمليات' : 'Operations'}</span>
        </button>

        {/* Merged Practical Action 2: Smart AI Platform */}
        <button
          onClick={() => onNavigateTab('ai-platform')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold transition cursor-pointer whitespace-nowrap ${
            currentTab === 'ai-platform'
              ? 'bg-amber-500 text-slate-950 shadow-md font-black'
              : 'text-amber-300 hover:bg-[#1b2252]'
          }`}
          title={isAr ? 'منصة الرد الذكية' : 'AI Client Platform'}
        >
          <Bot className="w-4 h-4" />
          <span className="hidden md:inline">{isAr ? 'المستشار الذكي' : 'AI Chat'}</span>
        </button>

        {/* Merged Practical Action 3: RFQ Messenger */}
        <button
          onClick={onOpenMessenger}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-md transition transform active:scale-95 cursor-pointer whitespace-nowrap"
          title={isAr ? 'ماسنجر طلب الخدمات و RFQ' : 'Service Messenger & RFQ'}
        >
          <Send className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isAr ? 'طلب RFQ' : 'RFQ'}</span>
        </button>

        {/* Merged Practical Action 4: Academy & Labs */}
        <button
          onClick={() => onNavigateTab('academy')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold transition cursor-pointer whitespace-nowrap ${
            currentTab === 'academy'
              ? 'bg-amber-500 text-slate-950 shadow-md font-black'
              : 'text-slate-200 hover:bg-[#1b2252]'
          }`}
          title={isAr ? 'الأكاديمية والورش التفاعلية' : 'NDT Academy & Labs'}
        >
          <GraduationCap className="w-4 h-4 text-emerald-400" />
          <span className="hidden lg:inline">{isAr ? 'الأكاديمية' : 'Academy'}</span>
        </button>

        {/* Toggle Hub Expansion for all merged options */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`p-2 rounded-full transition cursor-pointer flex items-center justify-center ${
            isExpanded
              ? 'bg-amber-500 text-slate-950'
              : 'bg-[#151a3d] text-amber-400 hover:bg-[#20285a]'
          }`}
          title={isAr ? 'فتح قائمة الأدوات العملية الموحدة' : 'Toggle Unified Practical Tools'}
          aria-expanded={isExpanded}
        >
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4 animate-bounce" />}
        </button>
      </div>
    </aside>
  );
};
