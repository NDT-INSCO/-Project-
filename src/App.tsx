import React, { useState, useEffect, useCallback } from 'react';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FiveReasons } from './components/FiveReasons';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsTrackRecord } from './components/ProjectsTrackRecord';
import { Accreditations } from './components/Accreditations';
import { AiCustomerPlatform } from './components/AiCustomerPlatform';
import { ServiceMessenger } from './components/ServiceMessenger';
import { EducationalAcademy } from './components/EducationalAcademy';
import { FAQs } from './components/FAQs';
import { OperationsPortal } from './components/OperationsPortal';
import { UnifiedLoginModal } from './components/UnifiedLoginModal';
import { NavigationReturnBar } from './components/NavigationReturnBar';
import { Footer } from './components/Footer';
import { Send, Bot, UserCheck, Home, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from './context/AuthContext';

const VALID_TABS = [
  'overview',
  'operations',
  'services',
  'projects',
  'accreditations',
  'faqs',
  'ai-platform',
  'messenger',
  'academy'
];

export default function App() {
  const [language, setLanguage] = useState<Language>('ar');
  const [currentTab, setCurrentTab] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (VALID_TABS.includes(hash)) {
        return hash;
      }
    }
    return 'overview';
  });

  const [preSelectedMethod, setPreSelectedMethod] = useState<string>('');
  const [preSelectedQuery, setPreSelectedQuery] = useState<string>('');
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const { currentRole } = useAuth();

  const isAr = language === 'ar';

  // Synchronize document direction and language
  useEffect(() => {
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.documentElement.lang = isAr ? 'ar' : 'en';
  }, [isAr]);

  // Robust Tab Navigation with full Browser History support
  const navigateToTab = useCallback((tab: string, addToHistory = true) => {
    const targetTab = VALID_TABS.includes(tab) ? tab : 'overview';

    if (addToHistory) {
      // Push state into browser history stack
      window.history.pushState({ tab: targetTab }, '', `#${targetTab}`);
    } else {
      window.history.replaceState({ tab: targetTab }, '', `#${targetTab}`);
    }

    setCurrentTab(targetTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Browser Back / Forward and Hash change listener
  useEffect(() => {
    // Ensure initial state has the tab object in browser history
    const initialHash = window.location.hash.replace('#', '');
    const initialTab = VALID_TABS.includes(initialHash) ? initialHash : 'overview';
    window.history.replaceState({ tab: initialTab }, '', initialTab === 'overview' ? ' ' : `#${initialTab}`);

    const handlePopState = (event: PopStateEvent) => {
      const stateTab = event.state?.tab;
      const hashTab = window.location.hash.replace('#', '');
      const resolvedTab = stateTab || (VALID_TABS.includes(hashTab) ? hashTab : 'overview');
      
      setCurrentTab(resolvedTab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (VALID_TABS.includes(hash)) {
        setCurrentTab(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (!hash) {
        setCurrentTab('overview');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Universal Go Back handler
  const handleGoBack = useCallback(() => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigateToTab('overview');
    }
  }, [navigateToTab]);

  const handleOpenMessenger = (method?: string, query?: string) => {
    if (method) setPreSelectedMethod(method);
    if (query) setPreSelectedQuery(query);
    navigateToTab('messenger');
  };

  return (
    <div className={`min-h-screen bg-[#090a16] text-slate-100 ${isAr ? 'font-sans' : 'font-sans'}`}>
      {/* Sticky Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => navigateToTab(tab)}
        language={language}
        setLanguage={setLanguage}
        onOpenMessenger={() => handleOpenMessenger()}
        onOpenLoginModal={() => setLoginModalOpen(true)}
      />

      {/* Prominent Return and Breadcrumb Bar when not on Home (First Page) */}
      {currentTab !== 'overview' && (
        <NavigationReturnBar
          currentTab={currentTab}
          onNavigateHome={() => navigateToTab('overview')}
          onGoBack={handleGoBack}
          language={language}
        />
      )}

      {/* Main Content Area */}
      <main>
        {currentTab === 'overview' && (
          <>
            <Hero
              language={language}
              onNavigate={(tab) => navigateToTab(tab)}
              onOpenMessenger={() => handleOpenMessenger()}
            />
            <FiveReasons
              language={language}
              onOpenMessenger={() => handleOpenMessenger()}
            />
            <ServicesSection
              language={language}
              onSelectMethodForRFQ={(methodCode) => handleOpenMessenger(methodCode)}
            />
            <ProjectsTrackRecord
              language={language}
              onOpenMessenger={() => handleOpenMessenger()}
            />
            <Accreditations language={language} />
            <FAQs
              language={language}
              onOpenMessenger={handleOpenMessenger}
              onNavigateTab={(tab) => navigateToTab(tab)}
            />
          </>
        )}

        {currentTab === 'operations' && (
          <div className="pt-2">
            <OperationsPortal
              language={language}
              onOpenMessenger={handleOpenMessenger}
              onOpenLoginModal={() => setLoginModalOpen(true)}
              onBackToHome={() => navigateToTab('overview')}
            />
          </div>
        )}

        {currentTab === 'services' && (
          <div className="pt-4">
            <ServicesSection
              language={language}
              onSelectMethodForRFQ={(methodCode) => handleOpenMessenger(methodCode)}
            />
          </div>
        )}

        {currentTab === 'projects' && (
          <div className="pt-4">
            <ProjectsTrackRecord
              language={language}
              onOpenMessenger={() => handleOpenMessenger()}
            />
          </div>
        )}

        {currentTab === 'accreditations' && (
          <div className="pt-4">
            <Accreditations language={language} />
          </div>
        )}

        {currentTab === 'faqs' && (
          <div className="pt-4">
            <FAQs
              language={language}
              onOpenMessenger={handleOpenMessenger}
              onNavigateTab={(tab) => navigateToTab(tab)}
            />
          </div>
        )}

        {currentTab === 'ai-platform' && (
          <div className="pt-4">
            <AiCustomerPlatform
              language={language}
              onOpenMessengerWithQuery={(query) => handleOpenMessenger(undefined, query)}
            />
          </div>
        )}

        {currentTab === 'messenger' && (
          <div className="pt-4">
            <ServiceMessenger
              language={language}
              initialService={preSelectedMethod}
              initialQuery={preSelectedQuery}
            />
          </div>
        )}

        {currentTab === 'academy' && (
          <div className="pt-4">
            <EducationalAcademy language={language} />
          </div>
        )}
      </main>

      {/* Floating Action Button for Instant Navigation & Quick Actions */}
      <aside aria-label="Customer quick actions" className="fixed bottom-6 start-6 z-40 flex flex-col gap-3">
        {/* Instant 1-Click Return to First Page Floating Button */}
        {currentTab !== 'overview' && (
          <button
            onClick={() => navigateToTab('overview')}
            className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black shadow-2xl transition transform hover:scale-105 active:scale-95 cursor-pointer text-xs sm:text-sm border-2 border-amber-300 ring-4 ring-amber-500/20"
            title={isAr ? 'العودة الفورية إلى الصفحة الأولى (الرئيسية)' : 'Immediate Return to Home / First Page'}
          >
            <Home className="w-5 h-5 text-slate-950" />
            <span>{isAr ? 'العودة للصفحة الأولى' : 'Back to Home'}</span>
          </button>
        )}

        {currentTab !== 'operations' && (
          <button
            onClick={() => navigateToTab('operations')}
            className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-[#182054] to-[#11173f] hover:from-[#212c75] hover:to-[#171f54] text-amber-300 border-2 border-amber-400 shadow-2xl transition transform hover:scale-105 cursor-pointer text-xs sm:text-sm font-bold"
            title={isAr ? 'بوابة العمليات والتراتبيات' : 'Open Operations Portal'}
          >
            <UserCheck className="w-5 h-5 text-amber-400 animate-pulse" />
            <span className="hidden sm:inline">
              {currentRole === 'manager' && (isAr ? 'بوابة المدير' : 'Manager')}
              {currentRole === 'supervisor' && (isAr ? 'بوابة المشرف' : 'Supervisor')}
              {currentRole === 'client' && (isAr ? 'بوابة العميل' : 'Client')}
              {currentRole === 'worker' && (isAr ? 'منفذ العامل' : 'Worker')}
            </span>
          </button>
        )}

        {currentTab !== 'ai-platform' && (
          <button
            onClick={() => navigateToTab('ai-platform')}
            className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#1b204e] hover:bg-[#252c6a] text-amber-300 border-2 border-amber-400 shadow-xl transition transform hover:scale-105 cursor-pointer text-xs sm:text-sm font-bold"
            title={isAr ? 'فتح منصة الرد الذكية' : 'Open AI Client Platform'}
          >
            <Bot className="w-5 h-5 text-amber-400 animate-pulse" />
            <span className="hidden sm:inline">{isAr ? 'منصة الرد الذكية' : 'AI Platform'}</span>
          </button>
        )}

        {currentTab !== 'messenger' && (
          <button
            onClick={() => handleOpenMessenger()}
            className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black shadow-2xl transition transform hover:scale-105 cursor-pointer text-xs sm:text-sm"
            title={isAr ? 'فتح ماسنجر الخدمات' : 'Open Service Messenger'}
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">{isAr ? 'ماسنجر الخدمات' : 'Service Messenger'}</span>
          </button>
        )}
      </aside>

      {/* Official Footer */}
      <Footer
        language={language}
        onNavigate={(tab) => navigateToTab(tab)}
        onOpenMessenger={() => handleOpenMessenger()}
      />

      {/* Unified Professional Login Modal for 4 Roles */}
      <UnifiedLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        language={language}
        onSuccessOpenPortal={() => navigateToTab('operations')}
      />
    </div>
  );
}
