import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Check,
  Send,
  Flame,
  ShieldCheck,
  Sparkles,
  Clock,
  Tag,
  Phone,
  MessageSquare,
  BookOpen,
  X
} from 'lucide-react';
import { Language, FAQItem } from '../types';
import { COMMON_FAQS, FAQ_CATEGORIES } from '../data/faqsData';

interface FAQsProps {
  language: Language;
  onOpenMessenger?: (method?: string, initialQuery?: string) => void;
  onNavigateTab?: (tab: string) => void;
}

export const FAQs: React.FC<FAQsProps> = ({
  language,
  onOpenMessenger,
  onNavigateTab
}) => {
  const isAr = language === 'ar';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>('pwht-power-requirements');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [helpfulRatings, setHelpfulRatings] = useState<Record<string, 'yes' | 'no'>>({});

  // Collect all unique tags for quick filter chips
  const allTags = useMemo(() => {
    const set = new Set<string>();
    COMMON_FAQS.forEach((faq) => {
      faq.tags.forEach((tag) => set.add(tag));
    });
    return Array.from(set);
  }, []);

  // Filter FAQs dynamically based on query, category, and tag
  const filteredFAQs = useMemo(() => {
    return COMMON_FAQS.filter((faq) => {
      // Category filter
      if (selectedCategory !== 'all' && faq.category !== selectedCategory) {
        return false;
      }

      // Tag filter
      if (selectedTag && !faq.tags.includes(selectedTag)) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const qAr = faq.question.ar.toLowerCase();
        const qEn = faq.question.en.toLowerCase();
        const shortAr = faq.shortAnswer.ar.toLowerCase();
        const shortEn = faq.shortAnswer.en.toLowerCase();
        const detAr = faq.detailedAnswer.ar.toLowerCase();
        const detEn = faq.detailedAnswer.en.toLowerCase();
        const tagsStr = faq.tags.join(' ').toLowerCase();
        const codesStr = (faq.applicableCodes || []).join(' ').toLowerCase();

        return (
          qAr.includes(query) ||
          qEn.includes(query) ||
          shortAr.includes(query) ||
          shortEn.includes(query) ||
          detAr.includes(query) ||
          detEn.includes(query) ||
          tagsStr.includes(query) ||
          codesStr.includes(query)
        );
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedTag]);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleCopy = (faq: FAQItem) => {
    const textToCopy = `${faq.question[language]}\n\n${faq.shortAnswer[language]}\n\n${faq.detailedAnswer[language]}\n\nالمرجع الفني: INSCO Engineering FAQ`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(faq.id);
    setTimeout(() => {
      setCopiedId((curr) => (curr === faq.id ? null : curr));
    }, 2200);
  };

  const handleRate = (id: string, rating: 'yes' | 'no') => {
    setHelpfulRatings((prev) => ({
      ...prev,
      [id]: rating
    }));
  };

  const handleAskInMessenger = (faq: FAQItem) => {
    if (onOpenMessenger) {
      onOpenMessenger(faq.relatedMethodCode, faq.question[language]);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedTag(null);
  };

  return (
    <section id="faqs" className="py-12 sm:py-16 bg-[#0a0c1a] border-t border-[#1a1f3d] relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 end-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 start-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-semibold mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>{isAr ? 'الأسئلة الشائعة والاستفسارات الهندسية' : 'Frequently Asked Technical Inquiries'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isAr ? (
              <>
                إجابات فورية لأكثر <span className="text-amber-400">استفسارات العملاء</span> تكراراً
              </>
            ) : (
              <>
                Direct Answers to <span className="text-amber-400">Common Service Inquiries</span>
              </>
            )}
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            {isAr
              ? 'موسوعة تفاعلية تغطي متطلبات المعالجة الحرارية (PWHT)، فحوصات NDT المتقدمة، اشتراطات الأكواد العالمية (ASME / API)، وسرعة التعبئة والتسعير.'
              : 'An interactive engineering knowledgebase covering PWHT power requirements, advanced volumetric testing, code compliance (ASME/API), mobilization timeframes, and commercial scope.'}
          </p>
        </div>

        {/* Search & Dynamic Filters Bar */}
        <div className="bg-[#10142b] p-4 sm:p-5 rounded-2xl border border-[#20274f] shadow-2xl mb-8 space-y-4">
          {/* Main Search Input */}
          <div className="relative">
            <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isAr
                  ? 'ابحث في الاستفسارات، الأكواد (ASME, API)، الكلمات الدلالية، أو طرق الفحص...'
                  : 'Search inquiries, code references (ASME, API), keywords, or NDT methods...'
              }
              className="w-full bg-[#0a0c1a] border border-[#262e5b] rounded-xl py-3 ps-11 pe-10 text-slate-100 placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute end-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1"
                title={isAr ? 'مسح البحث' : 'Clear search'}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-amber-500/20">
            {FAQ_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                      : 'bg-[#151a37] text-slate-300 hover:bg-[#1c234a] hover:text-white border border-[#262e5b]'
                  }`}
                >
                  {cat.id === 'pwht' && <Flame className="w-3.5 h-3.5 text-amber-300" />}
                  {cat.id === 'compliance' && <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
                  {cat.id === 'mobilization' && <Clock className="w-3.5 h-3.5 text-blue-400" />}
                  <span>{isAr ? cat.labelAr : cat.labelEn}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Tags Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-[#1a1f3d]">
            <span className="text-xs text-slate-400 flex items-center gap-1 me-1">
              <Tag className="w-3 h-3 text-amber-400" />
              {isAr ? 'وسوم سريعة:' : 'Quick Tags:'}
            </span>
            {allTags.slice(0, 10).map((tag) => {
              const isTagSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(isTagSelected ? null : tag)}
                  className={`text-xs px-2.5 py-0.5 rounded-full transition cursor-pointer border ${
                    isTagSelected
                      ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold'
                      : 'bg-[#0d1024] text-slate-400 hover:text-amber-300 border-[#22284b] hover:border-amber-400/50'
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
            {(selectedTag || searchQuery || selectedCategory !== 'all') && (
              <button
                onClick={handleClearFilters}
                className="text-xs text-amber-400 hover:text-amber-300 underline ms-auto cursor-pointer"
              >
                {isAr ? 'إعادة تعيين الفلاتر' : 'Reset Filters'}
              </button>
            )}
          </div>
        </div>

        {/* Results Counter Bar */}
        <div className="flex justify-between items-center mb-4 text-xs sm:text-sm text-slate-400 px-1">
          <div className="flex items-center gap-2">
            <span>
              {isAr ? 'عدد الاستفسارات المتاحة:' : 'Available inquiries:'}{' '}
              <strong className="text-amber-400 font-bold">{filteredFAQs.length}</strong>
            </span>
            {selectedTag && (
              <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-xs flex items-center gap-1">
                #{selectedTag}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedTag(null)} />
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (expandedId === 'ALL') {
                  setExpandedId(null);
                } else {
                  setExpandedId('ALL');
                }
              }}
              className="text-xs text-slate-400 hover:text-amber-400 transition cursor-pointer"
            >
              {expandedId === 'ALL'
                ? isAr
                  ? 'طي الكل'
                  : 'Collapse All'
                : isAr
                ? 'توسيع الكل'
                : 'Expand All'}
            </button>
          </div>
        </div>

        {/* FAQ Accordion List */}
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12 bg-[#10142b] rounded-2xl border border-[#20274f] p-8 space-y-4">
            <HelpCircle className="w-12 h-12 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">
              {isAr ? 'لم نعثر على استفسار يطابق بحثك' : 'No matching inquiries found'}
            </h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              {isAr
                ? 'يمكنك كتابة سؤالك مباشرة في ماسنجر الخدمات أو استشارة المنصة الهندسية للحصول على إجابة مخصصة فوراً.'
                : 'You can submit your custom inquiry directly in the Service Messenger or ask the AI platform for instant guidance.'}
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 bg-[#1b2146] text-slate-200 hover:text-white rounded-lg text-xs font-semibold"
              >
                {isAr ? 'مسح فلاتر البحث' : 'Clear Filters'}
              </button>
              {onOpenMessenger && (
                <button
                  onClick={() => onOpenMessenger(undefined, searchQuery)}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isAr ? 'اسأل في ماسنجر الخدمات' : 'Ask in Service Messenger'}</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-3.5">
            {filteredFAQs.map((faq) => {
              const isExpanded = expandedId === 'ALL' || expandedId === faq.id;
              const hasRated = helpfulRatings[faq.id];
              const isCopied = copiedId === faq.id;

              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl transition-all duration-200 border ${
                    isExpanded
                      ? 'bg-gradient-to-b from-[#141838] to-[#0f122c] border-amber-400/50 shadow-xl'
                      : 'bg-[#10142c] hover:bg-[#141835] border-[#1d234a] hover:border-[#2d366e]'
                  }`}
                >
                  {/* Question Header Button */}
                  <button
                    onClick={() => toggleExpand(faq.id)}
                    className="w-full text-start p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer"
                    aria-expanded={isExpanded}
                  >
                    <div className="space-y-1.5 flex-1">
                      {/* Meta badges: Category, Frequency, Code */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#1b2149] text-amber-300 border border-[#2b3571]">
                          {isAr ? faq.categoryLabel.ar : faq.categoryLabel.en}
                        </span>

                        {faq.frequencyBadge && (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-amber-400" />
                            {isAr ? faq.frequencyBadge.ar : faq.frequencyBadge.en}
                          </span>
                        )}

                        {faq.applicableCodes && faq.applicableCodes.length > 0 && (
                          <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                            [{faq.applicableCodes.join(', ')}]
                          </span>
                        )}
                      </div>

                      {/* Question Text */}
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition">
                        {isAr ? faq.question.ar : faq.question.en}
                      </h3>

                      {/* Snippet / Short Answer preview when collapsed */}
                      {!isExpanded && (
                        <p className="text-xs sm:text-sm text-slate-400 line-clamp-1">
                          {isAr ? faq.shortAnswer.ar : faq.shortAnswer.en}
                        </p>
                      )}
                    </div>

                    <div className="mt-1 flex items-center justify-center w-8 h-8 rounded-full bg-[#1b2148] text-amber-400 flex-shrink-0 transition-transform">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Body */}
                  {isExpanded && (
                    <div className="px-4 sm:px-6 pb-5 pt-1 border-t border-[#1f254f] space-y-4 animate-fadeIn">
                      {/* Quick Executive Summary Callout */}
                      <div className="bg-[#0b0e22] p-3.5 sm:p-4 rounded-xl border border-amber-500/30">
                        <h4 className="text-xs font-bold text-amber-400 mb-1 flex items-center gap-1.5">
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>{isAr ? 'الإجابة المباشرة المختصرة:' : 'Quick Direct Answer:'}</span>
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                          {isAr ? faq.shortAnswer.ar : faq.shortAnswer.en}
                        </p>
                      </div>

                      {/* Comprehensive Engineering Details */}
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 mb-1.5">
                          {isAr ? 'التفاصيل والضوابط الهندسية الميدانية:' : 'Engineering & Field Execution Details:'}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {isAr ? faq.detailedAnswer.ar : faq.detailedAnswer.en}
                        </p>
                      </div>

                      {/* Key Takeaways Checklist */}
                      {faq.keyTakeaways && (
                        <div className="bg-[#121633] p-3.5 rounded-xl border border-[#232b5d] space-y-2">
                          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-amber-400" />
                            {isAr ? 'نقاط هندسية جوهرية:' : 'Key Engineering Takeaways:'}
                          </span>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                            {(isAr ? faq.keyTakeaways.ar : faq.keyTakeaways.en).map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Action Bar (Tags, Copy, Helpful Rating, Messenger Dispatch) */}
                      <div className="pt-3 border-t border-[#1d234d] flex flex-wrap items-center justify-between gap-3 text-xs">
                        {/* Tags */}
                        <div className="flex flex-wrap items-center gap-1">
                          {faq.tags.map((t) => (
                            <span
                              key={t}
                              onClick={() => setSelectedTag(t)}
                              className="px-2 py-0.5 rounded bg-[#0d1024] text-slate-400 hover:text-amber-300 cursor-pointer border border-[#1f2650]"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 ms-auto">
                          {/* Copy Answer Button */}
                          <button
                            onClick={() => handleCopy(faq)}
                            className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#171d3e] hover:bg-[#202753] text-slate-300 transition cursor-pointer"
                            title={isAr ? 'نسخ الجواب للحافظة' : 'Copy answer to clipboard'}
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-300">{isAr ? 'تم النسخ' : 'Copied'}</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-slate-400" />
                                <span>{isAr ? 'نسخ الجواب' : 'Copy'}</span>
                              </>
                            )}
                          </button>

                          {/* Helpful Rating */}
                          <div className="flex items-center gap-1 bg-[#171d3e] px-2 py-1 rounded">
                            <span className="text-[11px] text-slate-400 me-1">
                              {isAr ? 'مفيد؟' : 'Helpful?'}
                            </span>
                            <button
                              onClick={() => handleRate(faq.id, 'yes')}
                              className={`p-0.5 rounded hover:text-emerald-400 transition ${
                                hasRated === 'yes' ? 'text-emerald-400 font-bold' : 'text-slate-400'
                              }`}
                              title={isAr ? 'نعم، مفيد' : 'Yes, helpful'}
                            >
                              <ThumbsUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleRate(faq.id, 'no')}
                              className={`p-0.5 rounded hover:text-rose-400 transition ${
                                hasRated === 'no' ? 'text-rose-400 font-bold' : 'text-slate-400'
                              }`}
                              title={isAr ? 'غير كافٍ' : 'Not helpful'}
                            >
                              <ThumbsDown className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Instant Messenger RFQ Button */}
                          {onOpenMessenger && (
                            <button
                              onClick={() => handleAskInMessenger(faq)}
                              className="flex items-center gap-1.5 px-3 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-md transition cursor-pointer"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>{isAr ? 'طلب عرض سعر للخدمة' : 'Inquire in Messenger'}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Dynamic Interactive Call-to-Action for Unanswered Questions */}
        <div className="mt-12 bg-gradient-to-r from-[#141838] via-[#1b2149] to-[#141838] rounded-2xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-start">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isAr ? 'فريق الدعم الفني والاستشاري متاح الآن' : 'Engineering Advisory Ready'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {isAr ? 'لديك استفسار بمواصفات خاصة بمشروعك؟' : 'Have a project-specific technical inquiry?'}
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              {isAr
                ? 'استخدم ماسنجر الخدمات لتوليد مقترح فني رسمي فوراً، أو تحدث مع مستشارينا المعتمدين بالمستوى الثالث (Level III) للاستشارات العاجلة.'
                : 'Use the Service Messenger to instantly generate an official technical proposal, or speak directly with our ASNT Level III engineering team.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
            {onOpenMessenger && (
              <button
                onClick={() => onOpenMessenger()}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold shadow-lg transition transform hover:scale-105 cursor-pointer flex items-center gap-2 text-sm"
              >
                <Send className="w-4 h-4" />
                <span>{isAr ? 'فتح ماسنجر الخدمات' : 'Open Service Messenger'}</span>
              </button>
            )}

            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('ai-platform')}
                className="px-4 py-3 rounded-xl bg-[#0c0f24] hover:bg-[#161c3f] text-amber-300 border border-amber-400/40 font-semibold transition cursor-pointer flex items-center gap-2 text-sm"
              >
                <MessageSquare className="w-4 h-4 text-amber-400" />
                <span>{isAr ? 'استشارة المنصة الذكية' : 'Consult AI Platform'}</span>
              </button>
            )}

            <a
              href="tel:+201090777202"
              className="px-4 py-3 rounded-xl bg-[#171e43] hover:bg-[#20295c] text-slate-200 border border-slate-700 font-semibold transition flex items-center gap-2 text-sm"
              dir="ltr"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>+20 109 077 7202</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
