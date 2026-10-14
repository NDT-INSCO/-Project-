import React, { useState, useEffect } from 'react';
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
import { Footer } from './components/Footer';
import { MessageSquare, Send, Phone, Bot, BookOpen } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('ar');
  const [currentTab, setCurrentTab] = useState<string>('overview');
  const [preSelectedMethod, setPreSelectedMethod] = useState<string>('');
  const [preSelectedQuery, setPreSelectedQuery] = useState<string>('');

  const isAr = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.documentElement.lang = isAr ? 'ar' : 'en';
  }, [isAr]);

  const handleOpenMessenger = (method?: string, query?: string) => {
    if (method) setPreSelectedMethod(method);
    if (query) setPreSelectedQuery(query);
    setCurrentTab('messenger');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen bg-[#090a16] text-slate-100 ${isAr ? 'font-sans' : 'font-sans'}`}>
      {/* Sticky Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        onOpenMessenger={() => handleOpenMessenger()}
      />

      {/* Main Content Area */}
      <main>
        {currentTab === 'overview' && (
          <>
            <Hero
              language={language}
              onNavigate={(tab) => setCurrentTab(tab)}
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
              onNavigateTab={(tab) => setCurrentTab(tab)}
            />
          </>
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
              onNavigateTab={(tab) => setCurrentTab(tab)}
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

      {/* Floating Action Button for Instant WhatsApp / Customer Contact */}
      <aside aria-label="Customer quick actions" className="fixed bottom-6 start-6 z-40 flex flex-col gap-3">
        {currentTab !== 'ai-platform' && (
          <button
            onClick={() => {
              setCurrentTab('ai-platform');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
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
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenMessenger={() => handleOpenMessenger()}
      />
    </div>
  );
}
