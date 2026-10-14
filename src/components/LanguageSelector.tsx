import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check, Sparkles } from 'lucide-react';
import { Language } from '../types';

export interface SupportedLanguageInfo {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  isNative: boolean;
}

export const SUPPORTED_LANGUAGES: SupportedLanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English (Default)', flag: '🇬🇧', isNative: true },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية (مصر والشرق الأوسط)', flag: '🇪🇬', isNative: true },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', isNative: false },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', isNative: false },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', isNative: false },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', isNative: false },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', isNative: false },
  { code: 'zh', name: 'Chinese', nativeName: '中文 (Simplified)', flag: '🇨🇳', isNative: false },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', isNative: false },
];

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  variant?: 'micro' | 'navbar' | 'dock' | 'modal';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
  variant = 'navbar'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeGlobalLang, setActiveGlobalLang] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('insco_global_lang') || currentLanguage;
    }
    return currentLanguage;
  });
  const [notification, setNotification] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isAr = currentLanguage === 'ar';

  // Synchronize state with currentLanguage prop
  useEffect(() => {
    if (currentLanguage === 'ar' || currentLanguage === 'en') {
      setActiveGlobalLang(currentLanguage);
    }
  }, [currentLanguage]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle language selection
  const handleSelectLanguage = (lang: SupportedLanguageInfo) => {
    setActiveGlobalLang(lang.code);
    if (typeof window !== 'undefined') {
      localStorage.setItem('insco_global_lang', lang.code);
    }

    if (lang.code === 'ar') {
      onLanguageChange('ar');
      removeGoogleTranslateCookies();
      showToast(isAr ? 'تم التحويل إلى اللغة العربية' : 'Switched to Arabic (العربية)');
    } else if (lang.code === 'en') {
      onLanguageChange('en');
      removeGoogleTranslateCookies();
      showToast('Switched to English (Default)');
    } else {
      // Third-party language: set base to English for LTR layout, and trigger Google Translate
      onLanguageChange('en');
      triggerGoogleTranslation(lang.code);
      showToast(`Language adapted to ${lang.name} (${lang.nativeName})`);
    }

    setIsOpen(false);
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const removeGoogleTranslateCookies = () => {
    if (typeof document === 'undefined') return;
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
    const frame = document.querySelector('.goog-te-banner-frame');
    if (frame) frame.remove();
  };

  const triggerGoogleTranslation = (targetCode: string) => {
    if (typeof window === 'undefined') return;

    // Set cookie recognized by Google Translate
    document.cookie = `googtrans=/en/${targetCode}; path=/;`;
    document.cookie = `googtrans=/en/${targetCode}; path=/; domain=.${window.location.hostname};`;

    // Check if google translate script is loaded, otherwise load it
    const existingScript = document.getElementById('google-translate-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);

      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          { pageLanguage: 'en', includedLanguages: 'ar,en,fr,de,it,es,ru,zh-CN,tr', autoDisplay: false },
          'google_translate_element'
        );
      };
    } else {
      // Trigger translate dropdown if available
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (select) {
        select.value = targetCode;
        select.dispatchEvent(new Event('change'));
      }
    }
  };

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === activeGlobalLang) ||
    SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) ||
    SUPPORTED_LANGUAGES[0];

  return (
    <div className="relative inline-block text-start" ref={dropdownRef}>
      {/* Hidden placeholder for translation engine */}
      <div id="google_translate_element" className="hidden" aria-hidden="true" />

      {/* Micro variant (top bar) */}
      {variant === 'micro' && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 text-[11px] sm:text-xs bg-[#191d3d] hover:bg-[#252c5c] text-amber-300 px-2 sm:px-2.5 py-0.5 rounded border border-amber-500/30 transition cursor-pointer select-none"
          title="Select Language / اختر اللغة"
          aria-expanded={isOpen}
        >
          <span className="text-xs">{currentLangObj.flag}</span>
          <span className="font-bold">{currentLangObj.name}</span>
          <ChevronDown className={`w-3 h-3 text-amber-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      )}

      {/* Navbar main variant */}
      {variant === 'navbar' && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#14193d] hover:bg-[#1b2252] border border-amber-400/40 text-xs text-amber-300 transition cursor-pointer shadow-md select-none group"
          title="Language Selector / محدد اللغات"
          aria-expanded={isOpen}
        >
          <Globe className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-45 transition" />
          <span className="text-xs">{currentLangObj.flag}</span>
          <span className="font-bold text-slate-100 hidden sm:inline">{currentLangObj.name}</span>
          <ChevronDown className={`w-3 h-3 text-amber-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      )}

      {/* Dock & mobile variant */}
      {variant === 'dock' && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-2 rounded-xl bg-[#13173d] hover:bg-[#1a2155] border border-amber-400/30 text-xs text-slate-200 transition cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>{currentLangObj.flag} {currentLangObj.nativeName}</span>
          </div>
          <ChevronDown className={`w-3.5 h-3.5 text-amber-400 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full mt-2 end-0 z-50 w-64 sm:w-72 bg-[#0c0f26]/98 backdrop-blur-xl rounded-2xl border-2 border-amber-500/40 shadow-2xl p-3 space-y-2 animate-fadeIn max-w-[calc(100vw-2rem)]">
          <div className="flex items-center justify-between px-2 pb-1.5 border-b border-amber-500/20 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-white">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{isAr ? 'اختر لغة الموقع' : 'Select Language'}</span>
            </div>
            <span className="text-[10px] text-amber-400/80 font-mono">
              {SUPPORTED_LANGUAGES.length} Languages
            </span>
          </div>

          {/* Primary / Native Section */}
          <div>
            <span className="block text-[10px] font-bold text-slate-400 px-2 uppercase mb-1">
              {isAr ? 'اللغات الرئيسية للنظام' : 'Primary Gateways'}
            </span>
            <div className="space-y-1">
              {SUPPORTED_LANGUAGES.filter((l) => l.isNative).map((lang) => {
                const isSelected = activeGlobalLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleSelectLanguage(lang)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'text-slate-200 hover:bg-[#171d47]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{lang.flag}</span>
                      <div className="text-start leading-tight">
                        <span className="block">{lang.name}</span>
                        <span className={`text-[10px] ${isSelected ? 'text-slate-900' : 'text-slate-400'}`}>
                          {lang.nativeName}
                        </span>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-slate-950 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Extended International Languages */}
          <div className="pt-1.5 border-t border-[#1d2552]">
            <div className="flex items-center gap-1 px-2 mb-1">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                {isAr ? 'لغات إضافية حسب طلب الزائر' : 'International Visitor Languages'}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-1 max-h-48 overflow-y-auto pr-1">
              {SUPPORTED_LANGUAGES.filter((l) => !l.isNative).map((lang) => {
                const isSelected = activeGlobalLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleSelectLanguage(lang)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-200 font-bold'
                        : 'text-slate-300 hover:bg-[#151b42] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{lang.flag}</span>
                      <span>{lang.nativeName}</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Floating feedback toast */}
      {notification && (
        <div className="fixed bottom-20 end-6 z-50 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs shadow-2xl shadow-black/80 flex items-center gap-2 animate-fadeIn">
          <Globe className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}
    </div>
  );
};
