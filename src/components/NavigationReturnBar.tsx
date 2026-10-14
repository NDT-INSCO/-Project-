import React from 'react';
import { Home, ArrowLeft, ArrowRight, Compass, Shield } from 'lucide-react';
import { Language } from '../types';

interface NavigationReturnBarProps {
  currentTab: string;
  onNavigateHome: () => void;
  onGoBack: () => void;
  language: Language;
}

const TAB_TITLES: Record<string, { ar: string; en: string; categoryAr: string; categoryEn: string }> = {
  operations: {
    ar: 'بوابة العمليات والتراتبيات (المدير / المشرف / العميل / العامل)',
    en: 'Operations Portal & RBAC Circles of View',
    categoryAr: 'نظام إدارة العمليات',
    categoryEn: 'Operations System'
  },
  services: {
    ar: 'الخدمات الهندسية وأسطول المعدات المملوكة',
    en: 'Core Engineering Services & Owned Fleet',
    categoryAr: 'خدمات التفتيش والمعالجة',
    categoryEn: 'Inspection & PWHT Services'
  },
  projects: {
    ar: 'سجل المشاريع الكبرى وسابقة الأعمال بالمواقع النفطية والصناعية',
    en: 'Major Projects Track Record & Industrial References',
    categoryAr: 'سابقة الأعمال',
    categoryEn: 'Track Record'
  },
  accreditations: {
    ar: 'الاعتمادات الدولية والتراخيص والشهادات القياسية',
    en: 'International Accreditations, ISO & Regulatory Licenses',
    categoryAr: 'الجودة والتراخيص',
    categoryEn: 'Quality & Licenses'
  },
  faqs: {
    ar: 'الأسئلة الشائعة والاستفسارات الفنية الشاملة',
    en: 'Comprehensive Technical FAQs & Service Guidance',
    categoryAr: 'الدعم والاستفسارات',
    categoryEn: 'Support & FAQs'
  },
  'ai-platform': {
    ar: 'المنصة التفاعلية والرد الهندسي الذكي لخدمة العملاء',
    en: 'AI Interactive Platform & Instant Engineering Guidance',
    categoryAr: 'المنصات الرقمية',
    categoryEn: 'Digital Platforms'
  },
  messenger: {
    ar: 'ماسنجر طلب الخدمات الهندسية وطلب عروض الأسعار (RFQ)',
    en: 'Service RFQ Messenger & Mobilization Dispatch',
    categoryAr: 'طلبات التعاقد والتعبئة',
    categoryEn: 'RFQs & Mobilization'
  },
  academy: {
    ar: 'الأكاديمية التعليمية التفاعلية ومحاكي عيوب اللحام والمعالجة الحرارية',
    en: 'Educational Academy, Defect Simulator & PWHT Curves',
    categoryAr: 'التعليم والتدريب',
    categoryEn: 'Training & Academy'
  }
};

export const NavigationReturnBar: React.FC<NavigationReturnBarProps> = ({
  currentTab,
  onNavigateHome,
  onGoBack,
  language
}) => {
  const isAr = language === 'ar';
  const BackArrow = isAr ? ArrowRight : ArrowLeft;
  const currentInfo = TAB_TITLES[currentTab] || {
    ar: currentTab,
    en: currentTab,
    categoryAr: 'صفحة فرعية',
    categoryEn: 'Subpage'
  };

  return (
    <nav
      aria-label="Navigation breadcrumb & return"
      className="sticky top-20 z-40 bg-[#0d1026]/95 backdrop-blur-md border-b-2 border-amber-500/30 shadow-lg px-4 sm:px-6 py-2.5 transition-all"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left / Start: Direct Return Controls */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Main Return to Home (First Page) Button */}
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-md shadow-amber-500/20 transition transform hover:scale-[1.02] active:scale-95 cursor-pointer"
            title={isAr ? 'الرجوع الفوري إلى الصفحة الأولى (الرئيسية)' : 'Return immediately to Home (First Page)'}
          >
            <Home className="w-4 h-4 text-slate-950" />
            <span>{isAr ? 'العودة إلى الصفحة الأولى (الرئيسية)' : 'Back to Home / First Page'}</span>
          </button>

          {/* Previous Page History Back Button */}
          <button
            onClick={onGoBack}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#171d44] hover:bg-[#20275c] text-slate-200 border border-slate-700 hover:border-amber-400/50 text-xs sm:text-sm font-semibold transition cursor-pointer"
            title={isAr ? 'الرجوع خطوة للخلف (الصفحة السابقة)' : 'Go Back one step'}
          >
            <BackArrow className="w-4 h-4 text-amber-400" />
            <span>{isAr ? 'رجوع للخلف' : 'Go Back'}</span>
          </button>
        </div>

        {/* Center / Breadcrumb Path */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 overflow-hidden text-ellipsis whitespace-nowrap">
          <button
            onClick={onNavigateHome}
            className="text-amber-400 hover:text-amber-300 font-bold transition flex items-center gap-1 cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>{isAr ? 'الصفحة الأولى' : 'First Page'}</span>
          </button>
          <span className="text-slate-500 font-bold">›</span>
          <span className="text-slate-400 hidden sm:inline">
            {isAr ? currentInfo.categoryAr : currentInfo.categoryEn}
          </span>
          <span className="text-slate-500 font-bold hidden sm:inline">›</span>
          <span className="text-white font-bold max-w-[200px] sm:max-w-md truncate">
            {isAr ? currentInfo.ar : currentInfo.en}
          </span>
        </div>

        {/* Right / End: Quick Help Tip */}
        <div className="hidden md:flex items-center gap-2 text-[11px] text-amber-300/80 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span>{isAr ? 'يمكنك دائماً الرجوع للرئيسية بنقرة واحدة' : '1-click return to Home anytime'}</span>
        </div>
      </div>
    </nav>
  );
};
