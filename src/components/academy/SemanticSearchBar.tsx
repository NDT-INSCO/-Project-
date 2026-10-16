import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Search, 
  X, 
  Sparkles, 
  BookOpen, 
  Award, 
  ShieldCheck, 
  FileText, 
  Activity, 
  ArrowRight, 
  ArrowLeft, 
  ChevronRight, 
  Clock, 
  Layers, 
  ExternalLink,
  HelpCircle,
  Calculator,
  Flame,
  Info,
  CornerDownLeft,
  GraduationCap
} from 'lucide-react';
import { Language } from '../../types';
import { searchAcademySemantic, SemanticSearchResult } from '../../utils/academySemanticSearch';
import { TechnicalTerm } from '../../data/academySemanticGlossary';

export interface SemanticSearchBarProps {
  language: Language;
  onNavigateToModule?: (disciplineId: string, levelIdx: number, moduleId?: string) => void;
  onLaunchQuiz?: (disciplineId: string, levelId?: string, moduleId?: string, moduleTitle?: { ar: string; en: string }) => void;
  className?: string;
  placeholder?: string;
}

export const SemanticSearchBar: React.FC<SemanticSearchBarProps> = ({
  language,
  onNavigateToModule,
  onLaunchQuiz,
  className = '',
  placeholder
}) => {
  const isAr = language === 'ar';
  
  const [query, setQuery] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'terms' | 'modules' | 'standards' | 'defects'>('all');
  const [selectedTermModal, setSelectedTermModal] = useState<TechnicalTerm | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global Keyboard Shortcut: Pressing '/' or 'Ctrl+K' / 'Cmd+K' focuses search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.ctrlKey || e.metaKey)) || (e.key === '/' && document.activeElement !== inputRef.current && !(document.activeElement instanceof HTMLInputElement) && !(document.activeElement instanceof HTMLTextAreaElement))) {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute live search results
  const searchResults = useMemo(() => {
    if (!query.trim() || query.trim().length < 2) return [];
    return searchAcademySemantic(query, activeCategory, 15);
  }, [query, activeCategory]);

  // Quick Trending Search Pills
  const TRENDING_SEARCHES = [
    { labelAr: 'زمن التثبيت الحراري (Soak Time)', labelEn: 'PWHT Soak Time', query: 'soak time' },
    { labelAr: 'منحنى DAC للموجات فوق الصوتية', labelEn: 'DAC Curve', query: 'dac' },
    { labelAr: 'فحص مصفوفات PAUT', labelEn: 'Phased Array PAUT', query: 'paut' },
    { labelAr: 'كود ASME B31.3 للمعالجة', labelEn: 'ASME B31.3 PWHT', query: 'asme b31.3' },
    { labelAr: 'طاقة قوس اللحام Heat Input', labelEn: 'Heat Input Formula', query: 'heat input' },
    { labelAr: 'شهادة المستوى الثاني ASNT Level II', labelEn: 'ASNT Level II', query: 'level 2' },
    { labelAr: 'عيب نقص الانصهار LOF', labelEn: 'Lack of Fusion', query: 'lack of fusion' },
    { labelAr: 'سبائك P91 والزحف الحراري', labelEn: 'P91 Creep Rupture', query: 'p91' }
  ];

  const handleSelectResult = (result: SemanticSearchResult) => {
    if (result.type === 'module' && result.disciplineId && onNavigateToModule) {
      onNavigateToModule(result.disciplineId, result.levelIdx || 0, result.moduleId);
      setIsOpen(false);
    } else if (result.type === 'term' && result.termData) {
      setSelectedTermModal(result.termData);
    } else if (result.disciplineId && onNavigateToModule) {
      onNavigateToModule(result.disciplineId, result.levelIdx || 0);
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Search Input Box */}
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-amber-400 absolute start-3.5 pointer-events-none transition-colors" />

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (!isOpen) setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder={
              placeholder ||
              (isAr
                ? 'ابحث دلالياً عن أي مصطلح فني، كود هندسي، أو وحدة دراسية (مثال: PWHT, DAC, LOF, Level II)...'
                : 'Semantic search for NDT/PWHT terms, codes, or modules (e.g. Soak Time, DAC, PAUT, ASME B31.3)...')
            }
            className="w-full bg-[#0a0d24] hover:bg-[#0d102e] focus:bg-[#0c0f33] text-white placeholder-slate-400 text-xs sm:text-sm rounded-2xl border-2 border-[#242b66] focus:border-amber-400 ps-11 pe-24 py-3.5 shadow-xl transition-all outline-none"
          />

          {/* Right Action Chips: Clear + Keyboard Shortcut */}
          <div className="absolute end-3 flex items-center gap-1.5">
            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#1a204d] transition cursor-pointer"
                title={isAr ? 'مسح' : 'Clear'}
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-1 rounded-lg bg-[#141842] border border-[#2b357a] text-[10px] font-mono-code font-bold text-slate-400">
              <span>Ctrl</span>
              <span>K</span>
            </kbd>
          </div>
        </div>
      </div>

      {/* Dropdown Results Overlay */}
      {isOpen && (
        <div className="absolute top-full start-0 w-full mt-2 bg-[#0c0f2b] border-2 border-amber-500/50 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-xl animate-fadeIn">
          {/* Category Filter Pills Bar */}
          <div className="p-3 bg-[#080a1c] border-b border-[#202758] flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-mono-code font-bold text-slate-400 me-1">
                {isAr ? 'تصفية الفئة:' : 'Filter:'}
              </span>

              <button
                onClick={() => setActiveCategory('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                    : 'bg-[#12163b] text-slate-300 hover:text-white border border-[#252d6a]'
                }`}
              >
                {isAr ? 'الكل' : 'All'}
              </button>

              <button
                onClick={() => setActiveCategory('terms')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                  activeCategory === 'terms'
                    ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                    : 'bg-[#12163b] text-amber-300 hover:text-white border border-amber-500/30'
                }`}
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{isAr ? 'المصطلحات الفنية' : 'Technical Terms'}</span>
              </button>

              <button
                onClick={() => setActiveCategory('modules')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                  activeCategory === 'modules'
                    ? 'bg-purple-600 text-white font-black shadow-sm'
                    : 'bg-[#12163b] text-purple-300 hover:text-white border border-purple-500/30'
                }`}
              >
                <GraduationCap className="w-3 h-3 text-purple-400" />
                <span>{isAr ? 'وحدات المناهج' : 'Curriculum Modules'}</span>
              </button>

              <button
                onClick={() => setActiveCategory('standards')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                  activeCategory === 'standards'
                    ? 'bg-sky-600 text-white font-black shadow-sm'
                    : 'bg-[#12163b] text-sky-300 hover:text-white border border-sky-500/30'
                }`}
              >
                <FileText className="w-3 h-3 text-sky-400" />
                <span>{isAr ? 'الأكواد والمواصفات' : 'Codes & Standards'}</span>
              </button>

              <button
                onClick={() => setActiveCategory('defects')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                  activeCategory === 'defects'
                    ? 'bg-rose-600 text-white font-black shadow-sm'
                    : 'bg-[#12163b] text-rose-300 hover:text-white border border-rose-500/30'
                }`}
              >
                <Activity className="w-3 h-3 text-rose-400" />
                <span>{isAr ? 'العيوب وطرق الفحص' : 'Defects & Methods'}</span>
              </button>
            </div>

            <div className="text-[10px] font-mono-code text-slate-400">
              {searchResults.length > 0 && `${searchResults.length} ${isAr ? 'نتائج مطابقة' : 'matches'}`}
            </div>
          </div>

          {/* Results Area */}
          <div className="max-h-[60vh] overflow-y-auto p-3 space-y-2">
            {/* If Query is empty: Show Suggested Searches */}
            {!query.trim() || query.trim().length < 2 ? (
              <div className="p-4 space-y-3">
                <div className="text-xs font-mono-code uppercase font-bold text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isAr ? 'المصطلحات والموضوعات الهندسية الشائعة للبحث السريع:' : 'SUGGESTED NDT & PWHT TOPICS:'}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {TRENDING_SEARCHES.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setQuery(item.query);
                        inputRef.current?.focus();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#141842] hover:bg-amber-500/20 text-slate-200 hover:text-amber-300 border border-[#2b357a] hover:border-amber-400/50 text-xs font-bold transition cursor-pointer text-start flex items-center gap-1.5"
                    >
                      <span>{isAr ? item.labelAr : item.labelEn}</span>
                      <CornerDownLeft className="w-3 h-3 text-slate-400" />
                    </button>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#1f2658] text-[11px] text-slate-400 flex items-center gap-2">
                  <Info className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>
                    {isAr
                      ? 'البحث الدلالي يدعم الكلمات المترادفة والمفاهيم العلمية باللغتين العربية والإنجليزية وأكواد ASME و API و AWS.'
                      : 'Semantic search matches synonyms, acronyms, and engineering concepts across Arabic, English, and ASME/API codes.'}
                  </span>
                </div>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="p-8 text-center space-y-3">
                <HelpCircle className="w-10 h-10 text-amber-400 mx-auto opacity-70" />
                <h4 className="text-sm font-bold text-white">
                  {isAr ? 'لم يتم العثور على نتائج مطابقة لهذا المصطلح' : 'No matches found for this query'}
                </h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  {isAr
                    ? 'جرب البحث بكلمات أبسط مثل "PWHT", "UT", "ASME", "كود", "لحام", أو "شروخ".'
                    : 'Try broader keywords like "PWHT", "UT", "heat input", "crack", or "ASME".'}
                </p>
              </div>
            ) : (
              searchResults.map((result) => {
                const isTerm = result.type === 'term';
                const isModule = result.type === 'module';
                const isDefect = result.type === 'defect';
                const isStandard = result.type === 'standard';

                return (
                  <div
                    key={result.id}
                    className="p-3.5 rounded-xl bg-[#101438] hover:bg-[#161c4d] border border-[#222a61] hover:border-amber-400/60 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                  >
                    <div className="flex-1 min-w-0">
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span
                          className={`text-[10px] font-mono-code font-bold uppercase px-2 py-0.5 rounded-md border ${
                            isTerm
                              ? 'bg-amber-500/20 text-amber-300 border-amber-400/30'
                              : isModule
                              ? 'bg-purple-500/20 text-purple-300 border-purple-400/30'
                              : isStandard
                              ? 'bg-sky-500/20 text-sky-300 border-sky-400/30'
                              : 'bg-rose-500/20 text-rose-300 border-rose-400/30'
                          }`}
                        >
                          {isAr ? result.typeLabelAr : result.typeLabelEn}
                        </span>

                        {result.code && (
                          <span className="text-[10px] font-mono-code text-slate-400 bg-black/40 px-2 py-0.5 rounded border border-[#273273]">
                            {result.code}
                          </span>
                        )}

                        {result.subtitleEn && (
                          <span className="text-[10px] text-slate-400 truncate max-w-xs">
                            {isAr ? result.subtitleAr : result.subtitleEn}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h4 
                        onClick={() => handleSelectResult(result)}
                        className="text-sm font-bold text-white group-hover:text-amber-300 transition cursor-pointer flex items-center gap-2"
                      >
                        <span>{isAr ? result.titleAr : result.titleEn}</span>
                        <span className="text-xs text-slate-400 font-normal">
                          ({isAr ? result.titleEn : result.titleAr})
                        </span>
                      </h4>

                      {/* Description / Summary */}
                      <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                        {isAr ? result.descriptionAr : result.descriptionEn}
                      </p>

                      {/* Formula preview if available */}
                      {result.formula && (
                        <div className="mt-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/50 border border-amber-500/30 text-[11px] font-mono-code text-amber-300">
                          <Calculator className="w-3 h-3 text-amber-400" />
                          <span>{result.formula}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions on this search result */}
                    <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                      {isTerm && result.termData && (
                        <button
                          onClick={() => setSelectedTermModal(result.termData!)}
                          className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 text-xs font-bold transition cursor-pointer flex items-center gap-1"
                        >
                          <Info className="w-3.5 h-3.5" />
                          <span>{isAr ? 'شرح المصطلح' : 'Definition'}</span>
                        </button>
                      )}

                      {isModule && result.disciplineId && onNavigateToModule && (
                        <button
                          onClick={() => {
                            onNavigateToModule(result.disciplineId!, result.levelIdx || 0, result.moduleId);
                            setIsOpen(false);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition cursor-pointer flex items-center gap-1 shadow-sm"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>{isAr ? 'فتح الوحدة' : 'Open Module'}</span>
                          {isAr ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                        </button>
                      )}

                      {onLaunchQuiz && result.disciplineId && (
                        <button
                          onClick={() => {
                            onLaunchQuiz(result.disciplineId!, result.levelId, result.moduleId, { ar: result.titleAr, en: result.titleEn });
                            setIsOpen(false);
                          }}
                          className="p-1.5 rounded-lg bg-[#181d45] hover:bg-[#222a61] text-amber-400 border border-[#2b357a] text-xs cursor-pointer transition"
                          title={isAr ? 'اختبار فهم هذا المحتوى' : 'Take Quiz'}
                        >
                          <HelpCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Technical Term Comprehensive Definition Modal */}
      {selectedTermModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#0c0e25] rounded-3xl border-2 border-amber-400/60 shadow-2xl p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setSelectedTermModal(null)}
              className="absolute top-4 end-4 w-9 h-9 rounded-full bg-[#181d45] hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer border border-[#2c3775]"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/40 text-amber-400 text-xs font-mono-code font-bold uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAr ? selectedTermModal.categoryLabelAr : selectedTermModal.categoryLabelEn}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white">
                {isAr ? selectedTermModal.termAr : selectedTermModal.termEn}
              </h3>
              <div className="text-xs sm:text-sm text-slate-400 font-mono-code mt-0.5">
                {isAr ? selectedTermModal.termEn : selectedTermModal.termAr}
              </div>
            </div>

            {/* Governing Code Banner */}
            <div className="p-3 rounded-xl bg-[#12163b] border border-[#232b66] flex items-center gap-2.5 text-xs">
              <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
              <div>
                <span className="text-slate-400">{isAr ? 'الكود والمواصفة الحاكمة:' : 'Governing Standard / Code:'} </span>
                <span className="font-mono-code font-bold text-sky-300">{selectedTermModal.governingCode}</span>
              </div>
            </div>

            {/* Comprehensive Definition */}
            <div className="space-y-2 text-xs sm:text-sm leading-relaxed text-slate-200 bg-[#080a1c] p-4 rounded-xl border border-[#1f2658]">
              <div className="font-bold text-amber-400 text-xs uppercase font-mono-code">
                {isAr ? 'التعريف والأساس العلمي الهندسي:' : 'Technical Definition & Fundamentals:'}
              </div>
              <p>{isAr ? selectedTermModal.definitionAr : selectedTermModal.definitionEn}</p>
            </div>

            {/* Mathematical Formula if applicable */}
            {selectedTermModal.formula && (
              <div className="p-3.5 rounded-xl bg-[#12163b] border border-amber-500/30 space-y-1.5">
                <div className="text-[11px] font-mono-code font-bold text-amber-400 flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isAr ? 'المعادلة الرياضية / معيار الحساب:' : 'Engineering Formula / Calculation Rule:'}</span>
                </div>
                <div className="text-sm sm:text-base font-mono-code font-bold text-white bg-black/40 p-2.5 rounded-lg border border-[#273273]">
                  {selectedTermModal.formula}
                </div>
              </div>
            )}

            {/* Practical Application */}
            {(selectedTermModal.practicalApplicationAr || selectedTermModal.practicalApplicationEn) && (
              <div className="text-xs space-y-1 p-3.5 rounded-xl bg-[#0e1233] border border-emerald-500/30">
                <div className="font-bold text-emerald-400 font-mono-code">
                  {isAr ? 'التطبيق الميداني ومعايير القبول والرفض:' : 'Field Application & Acceptance Criteria:'}
                </div>
                <p className="text-slate-300">
                  {isAr ? selectedTermModal.practicalApplicationAr : selectedTermModal.practicalApplicationEn}
                </p>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-3 border-t border-[#1f2658] flex flex-wrap items-center justify-between gap-3">
              {selectedTermModal.relatedDisciplineId && onNavigateToModule && (
                <button
                  onClick={() => {
                    onNavigateToModule(selectedTermModal.relatedDisciplineId!, 0, selectedTermModal.relatedModuleId);
                    setSelectedTermModal(null);
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{isAr ? 'دراسة الوحدة المرتبطة بهذا المصطلح في المنهج' : 'Study Related Curriculum Module'}</span>
                </button>
              )}

              {onLaunchQuiz && selectedTermModal.relatedDisciplineId && (
                <button
                  onClick={() => {
                    onLaunchQuiz(selectedTermModal.relatedDisciplineId!, selectedTermModal.relatedLevelId, selectedTermModal.relatedModuleId, {
                      ar: selectedTermModal.termAr,
                      en: selectedTermModal.termEn
                    });
                    setSelectedTermModal(null);
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#161a3f] hover:bg-[#202758] border border-[#2b357a] text-amber-300 font-bold text-xs transition cursor-pointer flex items-center gap-1.5"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isAr ? 'اختبار فهم هذا المفهوم' : 'Test Understanding (Quiz)'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
