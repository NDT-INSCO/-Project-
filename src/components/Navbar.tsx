import React, { useState, useRef, useEffect } from 'react';
import { 
  Shield, 
  Activity, 
  Phone, 
  MessageSquare, 
  BookOpen, 
  Send, 
  Menu, 
  X, 
  Globe, 
  Award, 
  Briefcase, 
  LogIn, 
  LogOut, 
  User, 
  HelpCircle, 
  UserCheck, 
  Home, 
  ChevronDown, 
  Bot, 
  GraduationCap,
  Sparkles,
  Layers,
  Wrench,
  Flame
} from 'lucide-react';
import { Language } from '../types';
import { COMPANY_DETAILS } from '../data/inscoData';
import { useAuth } from '../context/AuthContext';
import { LanguageSelector } from './LanguageSelector';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenMessenger: () => void;
  onOpenLoginModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  onOpenMessenger,
  onOpenLoginModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [academyMenuOpen, setAcademyMenuOpen] = useState(false);
  const [aiMenuOpen, setAiMenuOpen] = useState(false);
  const isAr = language === 'ar';
  const { userProfile, currentRole } = useAuth();

  const servicesRef = useRef<HTMLDivElement>(null);
  const academyRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesMenuOpen(false);
      }
      if (academyRef.current && !academyRef.current.contains(e.target as Node)) {
        setAcademyMenuOpen(false);
      }
      if (aiRef.current && !aiRef.current.contains(e.target as Node)) {
        setAiMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isServicesActive = ['services', 'projects', 'accreditations'].includes(currentTab);
  const isAcademyActive = ['academy', 'workshops', 'simulation', 'pwht', 'defects'].includes(currentTab);
  const isAiActive = ['ai-platform', 'messenger'].includes(currentTab);

  return (
    <header className="sticky top-0 z-50 bg-[#0e1022]/95 backdrop-blur-md border-b border-[#24294d] shadow-xl w-full max-w-full overflow-visible">
      {/* Top micro bar for corporate quick info */}
      <div className="bg-[#090a16] border-b border-[#1b1e38] text-xs py-1.5 px-4 text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-amber-400 font-semibold text-[11px] sm:text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {isAr ? 'جاهزية تعبئة فورية بالمعدات المملوكة ٢٤/٧' : '24/7 Immediate Mobilization - Company-Owned Fleet'}
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-300">CR: {COMPANY_DETAILS.commercialReg}</span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-300">ISO 9001/14001/45001</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="tel:+201090777202"
              className="flex items-center gap-1.5 text-slate-300 hover:text-amber-400 transition text-[11px] sm:text-xs"
              dir="ltr"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>+20 109 077 7202</span>
            </a>
            <LanguageSelector
              currentLanguage={language}
              onLanguageChange={setLanguage}
              variant="micro"
            />
          </div>
        </div>
      </div>

      {/* Main navigation container strictly bounded */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-2">
          {/* Logo brand */}
          <button
            onClick={() => {
              setCurrentTab('overview');
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2.5 sm:gap-3.5 text-left rtl:text-right group cursor-pointer flex-shrink-0"
            title={isAr ? 'العودة إلى الصفحة الأولى (الرئيسية)' : 'Back to Home (First Page)'}
          >
            {/* INSCO Shield Emblem */}
            <div className="relative w-10 sm:w-12 h-12 sm:h-14 bg-gradient-to-b from-[#1e1b4b] to-[#111227] border-2 border-amber-400/80 rounded-b-xl flex items-center justify-center shadow-lg shadow-amber-500/10 group-hover:border-amber-300 transition">
              <div className="text-center">
                <span className="block text-[10px] sm:text-[11px] font-black tracking-widest text-amber-300">INSCO</span>
                <div className="w-5 sm:w-6 h-[2px] bg-amber-400 mx-auto my-0.5"></div>
                <Activity className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-amber-400 mx-auto animate-pulse" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-lg sm:text-xl font-black tracking-tight text-white group-hover:text-amber-300 transition">
                  {isAr ? 'إنسكو الهندسية' : 'INSCO'}
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  NDT & PWHT
                </span>
              </div>
              <p className="hidden md:block text-xs text-slate-400 line-clamp-1 max-w-[220px] lg:max-w-xs">
                {isAr ? 'الشركة الدولية للخدمات والمقاولات' : 'International for Services & Constructions'}
              </p>
            </div>
          </button>

          {/* Desktop Nav Items - Merged Practical Hubs (Fits smoothly within viewport) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 flex-nowrap">
            {/* 1. Home / First Page */}
            <button
              onClick={() => {
                setCurrentTab('overview');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-2 rounded-lg text-xs xl:text-sm font-medium transition cursor-pointer whitespace-nowrap ${
                currentTab === 'overview'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-[#191d3b]'
              }`}
            >
              <Home className={`w-4 h-4 ${currentTab === 'overview' ? 'text-slate-950' : 'text-slate-400'}`} />
              <span>{isAr ? 'الرئيسية' : 'Home'}</span>
            </button>

            {/* 2. Operations & RBAC Portal */}
            <button
              onClick={() => {
                setCurrentTab('operations');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-2 rounded-lg text-xs xl:text-sm font-medium transition cursor-pointer whitespace-nowrap ${
                currentTab === 'operations'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-amber-300 hover:bg-[#1b2046] hover:text-white border border-amber-500/25'
              }`}
            >
              <UserCheck className={`w-4 h-4 ${currentTab === 'operations' ? 'text-slate-950' : 'text-amber-400'}`} />
              <span>{isAr ? 'بوابة العمليات' : 'Operations'}</span>
            </button>

            {/* 3. Merged Practical Hub: Services & Portfolio (Services, Projects, Accreditations) */}
            <div 
              ref={servicesRef} 
              className="relative"
              onMouseEnter={() => setServicesMenuOpen(true)}
              onMouseLeave={() => setServicesMenuOpen(false)}
            >
              <button
                onClick={() => {
                  if (!isServicesActive) setCurrentTab('services');
                  setServicesMenuOpen(!servicesMenuOpen);
                }}
                className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-2 rounded-lg text-xs xl:text-sm font-medium transition cursor-pointer whitespace-nowrap ${
                  isServicesActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-[#191d3b]'
                }`}
              >
                <Activity className={`w-4 h-4 ${isServicesActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{isAr ? 'الخدمات والأسطول' : 'Services & Fleet'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Services Dropdown */}
              {servicesMenuOpen && (
                <div className="absolute top-full start-0 mt-1 w-56 rounded-2xl bg-[#0c0e22]/98 backdrop-blur-xl border border-amber-500/30 shadow-2xl p-2 z-50 flex flex-col gap-1 animate-fadeIn">
                  <button
                    onClick={() => {
                      setCurrentTab('services');
                      setServicesMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-start transition ${
                      currentTab === 'services' ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40' : 'text-slate-200 hover:bg-[#191d3d]'
                    }`}
                  >
                    <Activity className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <div>
                      <span className="block font-bold">{isAr ? 'الخدمات والأسطول' : 'Services & Fleet'}</span>
                      <span className="text-[10px] text-slate-400">{isAr ? 'وحدات PWHT ومعدات NDT' : 'PWHT units & NDT gear'}</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentTab('projects');
                      setServicesMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-start transition ${
                      currentTab === 'projects' ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40' : 'text-slate-200 hover:bg-[#191d3d]'
                    }`}
                  >
                    <Briefcase className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    <div>
                      <span className="block font-bold">{isAr ? 'سجل المشاريع المنفذة' : 'Track Record'}</span>
                      <span className="text-[10px] text-slate-400">{isAr ? 'محطات الطاقة والبترول' : 'Major industrial projects'}</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentTab('accreditations');
                      setServicesMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-start transition ${
                      currentTab === 'accreditations' ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40' : 'text-slate-200 hover:bg-[#191d3d]'
                    }`}
                  >
                    <Award className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <div>
                      <span className="block font-bold">{isAr ? 'الاعتمادات والتراخيص' : 'Accreditations'}</span>
                      <span className="text-[10px] text-slate-400">{isAr ? 'ISO وتراخيص ENRRA' : 'ISO & ENRRA licensed'}</span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* 4. Academy & Interactive Workshops Dropdown */}
            <div 
              ref={academyRef} 
              className="relative"
              onMouseEnter={() => setAcademyMenuOpen(true)}
              onMouseLeave={() => setAcademyMenuOpen(false)}
            >
              <button
                onClick={() => {
                  if (!isAcademyActive) setCurrentTab('academy');
                  setAcademyMenuOpen(!academyMenuOpen);
                }}
                className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-2 rounded-lg text-xs xl:text-sm font-medium transition cursor-pointer whitespace-nowrap ${
                  isAcademyActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'text-amber-300 hover:bg-[#1b2046] hover:text-white border border-amber-500/20'
                }`}
              >
                <GraduationCap className={`w-4 h-4 ${isAcademyActive ? 'text-slate-950' : 'text-emerald-400'}`} />
                <span>{isAr ? 'الأكاديمية والورش والمحاكاة' : 'Academy & Simulators'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${academyMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Academy Dropdown */}
              {academyMenuOpen && (
                <div className="absolute top-full start-0 mt-1 w-64 rounded-2xl bg-[#0c0e22]/98 backdrop-blur-xl border border-amber-500/30 shadow-2xl p-2 z-50 flex flex-col gap-1 animate-fadeIn">
                  <button
                    onClick={() => {
                      setCurrentTab('academy');
                      setAcademyMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-start transition cursor-pointer ${
                      currentTab === 'academy' ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40' : 'text-slate-200 hover:bg-[#191d3d]'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <div>
                      <span className="block font-bold">{isAr ? 'المناهج والمسارات (8 مجالات)' : 'Curricula (8 Disciplines)'}</span>
                      <span className="text-[10px] text-slate-400">{isAr ? 'من الأساس الجامعي للمستوى 2 و3' : 'Academic, Level II & Level III'}</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentTab('workshops');
                      setAcademyMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-start transition cursor-pointer ${
                      currentTab === 'workshops' || currentTab === 'simulation' ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40' : 'text-slate-200 hover:bg-[#191d3d]'
                    }`}
                  >
                    <Wrench className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="block font-bold">{isAr ? 'معامل المحاكاة الحية' : 'Live Interactive Labs'}</span>
                        <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">6 ورش</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{isAr ? 'أجهزة UT، الأشعة RT، والمغناطيسية' : 'A-Scan UT, RT, Darkroom, DFT'}</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentTab('pwht');
                      setAcademyMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-start transition cursor-pointer ${
                      currentTab === 'pwht' || currentTab === 'defects' ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40' : 'text-slate-200 hover:bg-[#191d3d]'
                    }`}
                  >
                    <Flame className="w-4 h-4 text-rose-400 flex-shrink-0" />
                    <div>
                      <span className="block font-bold">{isAr ? 'محاكيات عيوب اللحام و PWHT' : 'Defect & PWHT Simulators'}</span>
                      <span className="text-[10px] text-slate-400">{isAr ? 'منحنيات ASME الحرارية وتشخيص العيوب' : 'ASME thermal curves & diagnostics'}</span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* 5. Merged Practical Hub: Smart AI Consultation & RFQ Messenger */}
            <div 
              ref={aiRef} 
              className="relative"
              onMouseEnter={() => setAiMenuOpen(true)}
              onMouseLeave={() => setAiMenuOpen(false)}
            >
              <button
                onClick={() => {
                  if (!isAiActive) setCurrentTab('ai-platform');
                  setAiMenuOpen(!aiMenuOpen);
                }}
                className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-2 rounded-lg text-xs xl:text-sm font-medium transition cursor-pointer whitespace-nowrap ${
                  isAiActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'text-amber-300 hover:bg-[#1b2046] hover:text-white border border-amber-500/20'
                }`}
              >
                <Bot className={`w-4 h-4 ${isAiActive ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>{isAr ? 'الاستشارة الذكية' : 'AI Consultation'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${aiMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* AI & Messenger Dropdown */}
              {aiMenuOpen && (
                <div className="absolute top-full start-0 mt-1 w-60 rounded-2xl bg-[#0c0e22]/98 backdrop-blur-xl border border-amber-500/30 shadow-2xl p-2 z-50 flex flex-col gap-1 animate-fadeIn">
                  <button
                    onClick={() => {
                      setCurrentTab('ai-platform');
                      setAiMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-start transition ${
                      currentTab === 'ai-platform' ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40' : 'text-slate-200 hover:bg-[#191d3d]'
                    }`}
                  >
                    <Bot className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <div>
                      <span className="block font-bold">{isAr ? 'منصة الرد الذكية (Gemini)' : 'AI Smart Platform'}</span>
                      <span className="text-[10px] text-slate-400">{isAr ? 'استشارات فنية وتوجيه فوري' : 'Live technical advisor'}</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentTab('messenger');
                      setAiMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-start transition ${
                      currentTab === 'messenger' ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40' : 'text-slate-200 hover:bg-[#191d3d]'
                    }`}
                  >
                    <Send className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    <div>
                      <span className="block font-bold">{isAr ? 'ماسنجر طلب الخدمات و RFQ' : 'Service Messenger'}</span>
                      <span className="text-[10px] text-slate-400">{isAr ? 'عروض أسعار فورية للمشاريع' : 'Instant formal RFQ quote'}</span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* 6. FAQs */}
            <button
              onClick={() => {
                setCurrentTab('faqs');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-2 rounded-lg text-xs xl:text-sm font-medium transition cursor-pointer whitespace-nowrap ${
                currentTab === 'faqs'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-[#191d3b]'
              }`}
            >
              <HelpCircle className={`w-4 h-4 ${currentTab === 'faqs' ? 'text-slate-950' : 'text-slate-400'}`} />
              <span>{isAr ? 'الأسئلة' : 'FAQs'}</span>
            </button>
          </nav>

          {/* Action CTAs: Unified, compact, no page displacement */}
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            {/* Quick Home Return Button when on inner pages */}
            {currentTab !== 'overview' && (
              <button
                onClick={() => {
                  setCurrentTab('overview');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-md shadow-amber-500/25 transition transform active:scale-95 cursor-pointer whitespace-nowrap"
                title={isAr ? 'العودة المباشرة إلى الصفحة الأولى' : 'Return directly to First Page'}
              >
                <Home className="w-3.5 h-3.5 text-slate-950" />
                <span className="hidden xl:inline">{isAr ? 'الرئيسية' : 'Home'}</span>
              </button>
            )}

            {/* Global Language Selector (English Default / Any Visitor Language) */}
            <LanguageSelector
              currentLanguage={language}
              onLanguageChange={setLanguage}
              variant="navbar"
            />

            {/* Unified Login & Role Badge Trigger */}
            <button
              onClick={() => {
                if (onOpenLoginModal) onOpenLoginModal();
              }}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 rounded-xl bg-[#14193d] hover:bg-[#1b2252] border border-amber-400/40 text-xs transition cursor-pointer shadow-md group whitespace-nowrap"
              title={isAr ? 'منظومة الدخول وتوزيع الصلاحيات' : 'Unified Login & Role Switcher'}
            >
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs flex-shrink-0">
                {currentRole === 'manager' && '👑'}
                {currentRole === 'supervisor' && '📋'}
                {currentRole === 'client' && '🏢'}
                {currentRole === 'worker' && '👷'}
                {currentRole === 'guest' && '✨'}
              </div>
              <div className="text-start leading-tight hidden md:block">
                <span className="block text-[9px] text-amber-400 font-bold uppercase tracking-wider">
                  {currentRole === 'manager' && (isAr ? 'المدير العام' : 'Manager')}
                  {currentRole === 'supervisor' && (isAr ? 'مشرف التشغيل' : 'Supervisor')}
                  {currentRole === 'client' && (isAr ? 'بوابة العميل' : 'Client')}
                  {currentRole === 'worker' && (isAr ? 'فني الميدان' : 'Worker')}
                  {currentRole === 'guest' && (isAr ? 'ضيف المنصة' : 'Guest')}
                </span>
                <span className="block text-[11px] text-slate-200 font-medium max-w-[85px] truncate">
                  {userProfile?.displayName?.split(' ')[0] || (isAr ? 'تسجيل الدخول' : 'Login')}
                </span>
              </div>
              <LogIn className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition flex-shrink-0" />
            </button>

            <button
              onClick={onOpenMessenger}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition transform active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isAr ? 'طلب عرض RFQ' : 'Request RFQ'}</span>
            </button>
          </div>

          {/* Mobile hamburger and mobile language quick toggle */}
          <div className="lg:hidden flex items-center gap-1.5 flex-shrink-0">
            <LanguageSelector
              currentLanguage={language}
              onLanguageChange={setLanguage}
              variant="micro"
            />
            {currentTab !== 'overview' && (
              <button
                onClick={() => {
                  setCurrentTab('overview');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-black text-xs"
              >
                <Home className="w-3.5 h-3.5" />
                <span>{isAr ? 'الرئيسية' : 'Home'}</span>
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#191d3b] text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu - Consolidated with Unified Practical Groups */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c0e1f] border-b border-[#23274e] px-4 pt-2 pb-6 space-y-2 max-h-[80vh] overflow-y-auto">
          {/* Direct Return button in mobile menu */}
          {currentTab !== 'overview' && (
            <button
              onClick={() => {
                setCurrentTab('overview');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-sm mb-2 shadow-lg cursor-pointer"
            >
              <Home className="w-4 h-4 text-slate-950" />
              <span>{isAr ? 'العودة إلى الصفحة الأولى (الرئيسية)' : 'Back to Home / First Page'}</span>
            </button>
          )}

          {/* Practical Group: Primary & Operations */}
          <div className="space-y-1">
            <span className="block text-[11px] font-bold text-amber-400/80 px-2 pt-1 uppercase">
              {isAr ? 'العمليات والتشغيل' : 'Operations & Navigation'}
            </span>
            
            <button
              onClick={() => {
                setCurrentTab('overview');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between p-2.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                currentTab === 'overview' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-200 hover:bg-[#181d3f]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Home className={`w-4 h-4 ${currentTab === 'overview' ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>{isAr ? 'الصفحة الرئيسية' : 'Home'}</span>
              </div>
            </button>

            <button
              onClick={() => {
                setCurrentTab('operations');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between p-2.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                currentTab === 'operations' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-200 hover:bg-[#181d3f]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <UserCheck className={`w-4 h-4 ${currentTab === 'operations' ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>{isAr ? 'بوابة العمليات والتراتبيات (RBAC)' : 'Operations Portal'}</span>
              </div>
              <span className="text-[10px] bg-amber-400/10 text-amber-400 border border-amber-400/30 px-2 py-0.5 rounded">
                {isAr ? 'المدير / المشرف / العامل' : '4 Roles'}
              </span>
            </button>
          </div>

          {/* Practical Group: Services & Assets */}
          <div className="space-y-1 pt-2 border-t border-[#1e234c]">
            <span className="block text-[11px] font-bold text-amber-400/80 px-2 uppercase">
              {isAr ? 'خدمات ومشاريع الشركة' : 'Services & Fleet'}
            </span>

            {[
              { id: 'services', labelAr: 'الخدمات والأسطول المملوك', labelEn: 'Services & Fleet', icon: Activity },
              { id: 'projects', labelAr: 'سجل المشاريع المنفذة', labelEn: 'Track Record', icon: Briefcase },
              { id: 'accreditations', labelAr: 'الاعتمادات والآيزو وتراخيص ENRRA', labelEn: 'Accreditations', icon: Award }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                    isActive ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-200 hover:bg-[#181d3f]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                    <span>{isAr ? item.labelAr : item.labelEn}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Practical Group: Academy, AI & Communication */}
          <div className="space-y-1 pt-2 border-t border-[#1e234c]">
            <span className="block text-[11px] font-bold text-amber-400/80 px-2 uppercase">
              {isAr ? 'الأكاديمية والاستشارة الذكية' : 'Academy & Smart Consultation'}
            </span>

            {[
              { id: 'academy', labelAr: 'المناهج التعليمية الشاملة (8 مجالات)', labelEn: 'Curricula (8 Disciplines)', icon: GraduationCap, highlight: true },
              { id: 'workshops', labelAr: 'معامل المحاكاة الحية (6 ورش تفاعلية)', labelEn: 'Live Simulation Labs (6 Workbenches)', icon: Wrench, highlight: true },
              { id: 'pwht', labelAr: 'محاكيات عيوب اللحام ومنحنيات PWHT', labelEn: 'Defect & PWHT Simulator', icon: Flame, highlight: true },
              { id: 'ai-platform', labelAr: 'منصة الرد الذكية التفاعلية', labelEn: 'AI Client Platform', icon: Bot, highlight: true },
              { id: 'messenger', labelAr: 'ماسنجر طلب الخدمات و RFQ', labelEn: 'Service Messenger', icon: Send, highlight: true },
              { id: 'faqs', labelAr: 'الأسئلة الشائعة الفنية', labelEn: 'Technical FAQs', icon: HelpCircle }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                    isActive ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-200 hover:bg-[#181d3f]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                    <span>{isAr ? item.labelAr : item.labelEn}</span>
                  </div>
                  {item.highlight && !isActive && (
                    <span className="text-[10px] bg-amber-400/10 text-amber-400 border border-amber-400/30 px-2 py-0.5 rounded">
                      {isAr ? 'تفاعلي' : 'Interactive'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Language Selector */}
          <div className="pt-2 border-t border-[#1e234c]">
            <span className="block text-[11px] font-bold text-amber-400/80 px-2 uppercase mb-1.5">
              {isAr ? 'لغة الموقع والتصفح' : 'Choose Website Language'}
            </span>
            <LanguageSelector
              currentLanguage={language}
              onLanguageChange={setLanguage}
              variant="dock"
            />
          </div>

          <div className="pt-2 border-t border-[#1e234c] flex flex-col gap-2">
            <button
              onClick={() => {
                if (onOpenLoginModal) onOpenLoginModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-lg bg-[#191e46] text-amber-300 border border-amber-400/40 text-xs font-bold text-center flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4 text-amber-400" />
              <span>{isAr ? 'منظومة الدخول وتوزيع الصلاحيات' : 'Unified Login & Roles'}</span>
            </button>

            <button
              onClick={() => {
                onOpenMessenger();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-center flex items-center justify-center gap-2 shadow-lg"
            >
              <Send className="w-4 h-4" />
              <span>{isAr ? 'ماسنجر طلب الخدمات و RFQ' : 'Service Messenger & RFQ'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
