import React, { useState } from 'react';
import { Shield, Activity, Phone, MessageSquare, BookOpen, Send, Menu, X, Globe, Award, Briefcase, LogIn, LogOut, User, HelpCircle, UserCheck, Home, ArrowRight, ArrowLeft } from 'lucide-react';
import { Language } from '../types';
import { COMPANY_DETAILS } from '../data/inscoData';
import { useAuth } from '../context/AuthContext';

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
  const isAr = language === 'ar';
  const { user, userProfile, currentRole, signOut } = useAuth();

  const navItems = [
    { id: 'overview', labelAr: 'الرئيسية (الصفحة الأولى)', labelEn: 'Home (First Page)', icon: Home },
    { id: 'operations', labelAr: 'بوابة العمليات والتراتبيات', labelEn: 'Operations & RBAC', icon: UserCheck, highlight: true },
    { id: 'services', labelAr: 'الخدمات والأسطول', labelEn: 'Services & Fleet', icon: Activity },
    { id: 'projects', labelAr: 'سجل المشاريع', labelEn: 'Track Record', icon: Briefcase },
    { id: 'accreditations', labelAr: 'الاعتمادات والآيزو', labelEn: 'Accreditations', icon: Award },
    { id: 'faqs', labelAr: 'الأسئلة الشائعة', labelEn: 'FAQs', icon: HelpCircle },
    { id: 'ai-platform', labelAr: 'المنصة التفاعلية', labelEn: 'AI Platform', icon: MessageSquare, highlight: true },
    { id: 'messenger', labelAr: 'ماسنجر الخدمات', labelEn: 'Service Messenger', icon: Send, highlight: true },
    { id: 'academy', labelAr: 'الأكاديمية التعليمية', labelEn: 'NDT Academy', icon: BookOpen, highlight: true },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0e1022]/95 backdrop-blur-md border-b border-[#24294d] shadow-xl">
      {/* Top micro bar for corporate quick info */}
      <div className="bg-[#090a16] border-b border-[#1b1e38] text-xs py-1.5 px-4 text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-amber-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {isAr ? 'جاهزية تعبئة فورية بالمعدات المملوكة ٢٤/٧' : '24/7 Immediate Mobilization - Company-Owned Fleet'}
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-300">CR: {COMPANY_DETAILS.commercialReg}</span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-300">ISO 9001/14001/45001 (Valid to 2028)</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:+201090777202"
              className="flex items-center gap-1.5 text-slate-300 hover:text-amber-400 transition"
              dir="ltr"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>+20 109 077 7202</span>
            </a>
            <button
              onClick={() => setLanguage(isAr ? 'en' : 'ar')}
              className="flex items-center gap-1.5 text-xs bg-[#191d3d] hover:bg-[#252c5c] text-amber-300 px-2.5 py-0.5 rounded border border-amber-500/30 transition cursor-pointer"
              title="تغيير اللغة / Switch Language"
            >
              <Globe className="w-3 h-3" />
              <span className="font-bold">{isAr ? 'English' : 'عربي'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo brand */}
          <button
            onClick={() => {
              setCurrentTab('overview');
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-3.5 text-left rtl:text-right group cursor-pointer"
            title={isAr ? 'العودة إلى الصفحة الأولى (الرئيسية)' : 'Back to Home (First Page)'}
          >
            {/* INSCO Shield Emblem */}
            <div className="relative w-12 h-14 bg-gradient-to-b from-[#1e1b4b] to-[#111227] border-2 border-amber-400/80 rounded-b-xl flex items-center justify-center shadow-lg shadow-amber-500/10 group-hover:border-amber-300 transition">
              <div className="text-center">
                <span className="block text-[11px] font-black tracking-widest text-amber-300">INSCO</span>
                <div className="w-6 h-[2px] bg-amber-400 mx-auto my-0.5"></div>
                <Activity className="w-4 h-4 text-amber-400 mx-auto animate-pulse" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white group-hover:text-amber-300 transition">
                  {isAr ? 'إنسكو الهندسية' : 'INSCO'}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  NDT & PWHT
                </span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-1 max-w-[280px] sm:max-w-sm">
                {isAr ? 'الشركة الدولية للخدمات والمقاولات' : 'International for Services & Constructions'}
              </p>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                      : item.highlight
                      ? 'text-amber-300 hover:bg-[#1b2046] hover:text-white border border-amber-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-[#191d3b]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : item.highlight ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{isAr ? item.labelAr : item.labelEn}</span>
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Quick Home Return Button when on inner pages */}
            {currentTab !== 'overview' && (
              <button
                onClick={() => {
                  setCurrentTab('overview');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-md shadow-amber-500/25 transition transform hover:scale-105 active:scale-95 cursor-pointer"
                title={isAr ? 'العودة المباشرة إلى الصفحة الأولى' : 'Return directly to First Page'}
              >
                <Home className="w-3.5 h-3.5 text-slate-950" />
                <span>{isAr ? 'العودة للرئيسية' : 'Home'}</span>
              </button>
            )}

            {/* Unified Login & Role Badge Trigger */}
            <button
              onClick={() => {
                if (onOpenLoginModal) onOpenLoginModal();
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#14193d] hover:bg-[#1b2252] border border-amber-400/40 text-xs transition cursor-pointer shadow-md group"
              title={isAr ? 'منظومة الدخول وتوزيع الصلاحيات' : 'Unified Login & Role Switcher'}
            >
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                {currentRole === 'manager' && '👑'}
                {currentRole === 'supervisor' && '📋'}
                {currentRole === 'client' && '🏢'}
                {currentRole === 'worker' && '👷'}
              </div>
              <div className="text-start leading-tight">
                <span className="block text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                  {currentRole === 'manager' && (isAr ? 'المدير العام' : 'Manager')}
                  {currentRole === 'supervisor' && (isAr ? 'مشرف التشغيل' : 'Supervisor')}
                  {currentRole === 'client' && (isAr ? 'بوابة العميل' : 'Client')}
                  {currentRole === 'worker' && (isAr ? 'فني الميدان' : 'Worker')}
                </span>
                <span className="block text-[11px] text-slate-200 font-medium max-w-[110px] truncate">
                  {userProfile?.displayName?.split(' ')[0] || (isAr ? 'تسجيل الدخول' : 'Login')}
                </span>
              </div>
              <LogIn className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition" />
            </button>

            <button
              onClick={onOpenMessenger}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-md shadow-amber-500/20 transition transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{isAr ? 'طلب عرض سعر RFQ' : 'Request RFQ'}</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden flex items-center gap-2">
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
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c0e1f] border-b border-[#23274e] px-4 pt-2 pb-6 space-y-2">
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

          {navItems.map((item) => {
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
                className={`w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium transition cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-200 hover:bg-[#181d3f]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
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

          <div className="pt-3 border-t border-[#1e234c] flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenMessenger();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-lg bg-amber-500 text-slate-950 font-bold text-center flex items-center justify-center gap-2"
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
