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
import { NavigationReturnBar } from './components/NavigationReturnBar';
import { Footer } from './components/Footer';
import { UnifiedLoginModal } from './components/UnifiedLoginModal';
import { UnifiedQuickDock } from './components/UnifiedQuickDock';
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
  'academy',
  'workshops',
  'simulation',
  'pwht',
  'defects'
];

export default function App() {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('insco_preferred_lang');
      if (saved === 'ar' || saved === 'en') {
        return saved;
      }
    }
    // Default entry gate is English as requested by user
    return 'en';
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('insco_preferred_lang', lang);
    }
  }, []);

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
    <div className={`min-h-screen w-full max-w-full overflow-x-hidden relative bg-[#090a16] text-slate-100 ${isAr ? 'font-sans' : 'font-sans'}`}>
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
              onNavigateTab={(tab) => navigateToTab(tab)}
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

        {['academy', 'workshops', 'simulation', 'pwht', 'defects'].includes(currentTab) && (
          <div className="pt-4">
            <EducationalAcademy 
              language={language} 
              initialSubTab={
                currentTab === 'workshops' || currentTab === 'simulation'
                  ? 'workshops'
                  : currentTab === 'pwht'
                  ? 'pwht_curve'
                  : currentTab === 'defects'
                  ? 'defects'
                  : 'curriculum'
              }
            />
          </div>
        )}
      </main>

      {/* Unified Practical Control & Operations Floating Dock (strictly bounded inside page) */}
      <UnifiedQuickDock
        currentTab={currentTab}
        onNavigateTab={(tab) => navigateToTab(tab)}
        onOpenMessenger={() => handleOpenMessenger()}
        language={language}
        onLanguageChange={setLanguage}
        currentRole={currentRole}
      />

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
