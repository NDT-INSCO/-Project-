import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, ChevronLeft, ShieldCheck, Truck, Users, Award, FileCheck, ArrowUpRight } from 'lucide-react';
import { Language } from '../types';
import { FIVE_REASONS } from '../data/inscoData';

interface FiveReasonsProps {
  language: Language;
  onOpenMessenger: () => void;
}

export const FiveReasons: React.FC<FiveReasonsProps> = ({ language, onOpenMessenger }) => {
  const isAr = language === 'ar';
  const [activeReason, setActiveReason] = useState<number>(0);
  const Chevron = isAr ? ChevronLeft : ChevronRight;

  const reasonIcons = [ShieldCheck, Truck, Users, Award, FileCheck];

  return (
    <section className="py-16 md:py-24 bg-[#0a0b18] border-b border-[#21264c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
            <span className="w-8 h-[2px] bg-amber-400"></span>
            <span>{isAr ? 'لماذا تختار إنسكو؟' : 'WHY INSCO'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {isAr ? (
              <>
                خمسة أسباب تجعل <span className="text-amber-400">لجان الموردين</span> تعتمد إنسكو بدون تردد.
              </>
            ) : (
              <>
                Five reasons <span className="text-amber-400">vendor committees</span> say yes.
              </>
            )}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            {isAr
              ? 'الامتثال الصارم والملكية الكاملة للأصول الهندسية والاعتمادات الدولية تجعل اعتمادنا في قائمة الموردين المعتمدين (Approved Vendor List - AVL) أمراً محسوماً للمشاريع الاستراتيجية.'
              : 'Rigorous compliance, zero rental dependency, and verified accreditations make INSCO the straightforward choice for your Approved Vendor List.'}
          </p>
        </div>

        {/* Interactive Reasons Grid & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Reason Selectors List */}
          <div className="lg:col-span-5 space-y-3">
            {FIVE_REASONS.map((item, index) => {
              const Icon = reasonIcons[index];
              const isSelected = activeReason === index;
              return (
                <button
                  key={item.num}
                  onClick={() => setActiveReason(index)}
                  className={`w-full text-start p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#1e2350] to-[#161a3d] border-amber-400/80 shadow-lg shadow-amber-500/10'
                      : 'bg-[#101227] hover:bg-[#151835] border-[#222752] text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono-code font-black text-sm ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950 font-bold'
                          : 'bg-[#1b2046] text-amber-400'
                      }`}
                    >
                      {item.num}
                    </div>
                    <div>
                      <div className={`font-bold text-sm sm:text-base ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                        {isAr ? item.titleAr.split('(')[0] : item.titleEn}
                      </div>
                      <div className="text-xs text-slate-400 line-clamp-1">
                        {isAr ? item.descAr.slice(0, 50) + '...' : item.descEn.slice(0, 60) + '...'}
                      </div>
                    </div>
                  </div>
                  <Chevron className={`w-5 h-5 flex-shrink-0 transition-transform ${isSelected ? 'text-amber-400 translate-x-1 rtl:-translate-x-1' : 'text-slate-600'}`} />
                </button>
              );
            })}
          </div>

          {/* Deep Dive Card for Selected Reason */}
          <div className="lg:col-span-7">
            {FIVE_REASONS[activeReason] && (
              <div className="bg-gradient-to-br from-[#15193b] via-[#10132d] to-[#0c0e20] p-6 sm:p-8 rounded-2xl border-2 border-amber-500/30 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 end-0 transform translate-x-6 -translate-y-6 opacity-5 pointer-events-none">
                  <ShieldCheck className="w-64 h-64 text-amber-400" />
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl font-black font-mono-code text-amber-400">
                    {FIVE_REASONS[activeReason].num}
                  </span>
                  <div className="h-6 w-[2px] bg-slate-700"></div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {isAr ? FIVE_REASONS[activeReason].titleAr : FIVE_REASONS[activeReason].titleEn}
                  </h3>
                </div>

                <p className="text-slate-200 text-base sm:text-lg leading-relaxed mb-6">
                  {isAr ? FIVE_REASONS[activeReason].descAr : FIVE_REASONS[activeReason].descEn}
                </p>

                {/* Specific Proof Points based on reason */}
                <div className="bg-[#0b0d1e] p-5 rounded-xl border border-[#242b5c] space-y-3 mb-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    {isAr ? 'الأدلة والوثائق القاطعة في ملف الاعتماد' : 'Auditable Proof Points & References'}
                  </div>

                  {activeReason === 0 && (
                    <ul className="text-xs sm:text-sm text-slate-300 space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{isAr ? 'فريق واحد لإجراء الفحص NDT وتحديد العيوب ثم معالجتها حرارياً PWHT بدون تضارب بين مقاولين.' : 'Unified crew for NDT flaw detection, PWHT cycle execution, and certified welding.'}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{isAr ? 'تقرير نهائي شامل وموحد يحمل رقم تسجيل الجودة وتوقيع مهندسينا المعتمدين.' : 'Single comprehensive QA/QC final turnover dossier.'}</span>
                      </li>
                    </ul>
                  )}

                  {activeReason === 1 && (
                    <ul className="text-xs sm:text-sm text-slate-300 space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{isAr ? 'أسطول متكامل وواسع من وحدات المعالجة الحرارية 65 kW مملوك بالكامل في مستودعات القاهرة والجيزة.' : 'Extensive fleet of automatic 65 kW heat-treatment units owned and stored in Cairo.'}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{isAr ? 'كبسولات جاما (Ir-192 / Se-75) وأجهزة PAUT وأجهزة XRF مملوكة وجاهزة دون تأخير.' : 'Full gamma fleet (Ir-192, Se-75), PAUT instruments, and XRF analyzers.'}</span>
                      </li>
                    </ul>
                  )}

                  {activeReason === 2 && (
                    <ul className="text-xs sm:text-sm text-slate-300 space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{isAr ? 'كبير مراجعين مسجل CQI-IRCA بدوام كامل داخل الشركة (شهادة رقم 121 / UDN 27956).' : 'In-house CQI-IRCA Lead Auditor (Cert. No. 121 / UDN 27956).' }</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{isAr ? 'فنيون مؤهلون وفق ممارسات ASNT SNT-TC-1A و ISO 9712 للدرجة الثانية Level II.' : 'Personnel qualified to ASNT Level II and ISO 9712 practice.'}</span>
                      </li>
                    </ul>
                  )}

                  {activeReason === 3 && (
                    <ul className="text-xs sm:text-sm text-slate-300 space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{isAr ? 'ترخيص رسمي لممارسة واستخدام المصادر المشعة صادر من هيئة ENRRA بمصر.' : 'ENRRA-licensed radiation practices and site safety permits.'}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{isAr ? 'إدراج رسمي في الدليل الصناعي العالمي NDT.org برقم 54161 وسابقة أعمال باليمن وأفغانستان.' : 'Listed on www.ndt.org international directory (54161) with works abroad.'}</span>
                      </li>
                    </ul>
                  )}

                  {activeReason === 4 && (
                    <ul className="text-xs sm:text-sm text-slate-300 space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{isAr ? 'شهادات الآيزو الثلاث (9001, 14001, 45001) صادرة من QCS ومعتمدة من المجلس الوطني للاعتماد (EGAC CAB #120007).' : 'All 3 ISO certificates accredited by EGAC (CAB #120007) under IAF MLA.'}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{isAr ? 'مستندات وأوامر توريد وعقود سابقة موقعة مع كبرى الشركات العالمية مثل سيمنز وأوراسكوم والسويدي.' : 'Authentic client purchase orders and signed integration contracts.'}</span>
                      </li>
                    </ul>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div className="text-xs text-slate-400">
                    {isAr ? 'هل تحتاج لإضافة إنسكو في قائمة المقاولين المعتمدين؟' : 'Need to add INSCO to your Approved Vendor List?'}
                  </div>
                  <button
                    onClick={onOpenMessenger}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition cursor-pointer"
                  >
                    <span>{isAr ? 'طلب تسجيل المورد / عرض سعر' : 'Register Vendor / Request RFQ'}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
