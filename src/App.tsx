import React, { useEffect, useState } from 'react';
import { EducationalAcademy } from './components/EducationalAcademy';
import { Language } from './types';
import { Globe, GraduationCap } from 'lucide-react';

const LANGUAGE_KEY = 'insco_language_v1';

function readLanguage(): Language {
  try {
    return localStorage.getItem(LANGUAGE_KEY) === 'en' ? 'en' : 'ar';
  } catch {
    return 'ar';
  }
}

export const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>(readLanguage);

  const isAr = language === 'ar';

  // The static document is authored as Arabic/RTL. Without this the <html>
  // element keeps lang="ar" dir="rtl" after switching to English, which breaks
  // screen-reader pronunciation and browser translation on the English UI.
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    try {
      localStorage.setItem(LANGUAGE_KEY, language);
    } catch {
      /* private mode: language simply resets on reload */
    }
  }, [language, isAr]);

  return (
    <div dir={isAr ? 'rtl' : 'ltr'} className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-cyan-400" />
            <div>
              <h1 className="text-lg sm:text-xl font-black text-white">
                {isAr ? 'أكاديمية إنسكو NDT' : 'INSCO NDT Academy'}
              </h1>
              <p className="text-xs text-slate-400">
                {isAr ? 'الخدمات الهندسية والفحوصات غير الإتلافي' : 'Engineering Services & Non-Destructive Testing'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setLanguage(isAr ? 'en' : 'ar')}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-700 text-sm text-slate-200 hover:bg-slate-800 transition"
          >
            <Globe className="w-4 h-4" />
            {isAr ? 'English' : 'العربية'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <EducationalAcademy language={language} />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs text-slate-500">
            {isAr
              ? '© 2026 إنسكو الدولية للخدمات والمقاولات. محتوى تعليمي غير معتمد مهنياً.'
              : '© 2026 INSCO International Services & Contracting. Educational content, not professional certification.'}
          </p>
        </div>
      </footer>
    </div>
  );
};