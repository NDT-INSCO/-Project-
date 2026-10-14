import React, { useState } from 'react';
import { 
  Activity, 
  Flame, 
  Wrench, 
  FileCheck2, 
  Search, 
  Eye, 
  Zap, 
  Layers, 
  Sliders, 
  ShieldCheck, 
  CheckCircle2, 
  X, 
  Send, 
  ArrowRight, 
  ArrowLeft,
  ChevronRight,
  Settings,
  Cpu,
  Users
} from 'lucide-react';
import { Language, NDTMethod } from '../types';
import { NDT_METHODS, HEAT_TREATMENT_SPECS, WELDING_MANPOWER_SPECS } from '../data/inscoData';

interface ServicesSectionProps {
  language: Language;
  onSelectMethodForRFQ: (methodCode: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ language, onSelectMethodForRFQ }) => {
  const isAr = language === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalMethod, setActiveModalMethod] = useState<NDTMethod | null>(null);

  const categories = [
    { id: 'all', labelAr: 'كافة الخدمات (All)', labelEn: 'All Services' },
    { id: 'volumetric', labelAr: 'فحوصات حجمية (PAUT, RT, UT)', labelEn: 'Volumetric (PAUT, RT, UT)' },
    { id: 'surface', labelAr: 'فحوصات سطحية (MT, PT, VT, SR)', labelEn: 'Surface (MT, PT, VT, SR)' },
    { id: 'metallurgical', labelAr: 'تحليل المعادن والصلادة (PMI, HT)', labelEn: 'Metallurgical (PMI, HT)' },
    { id: 'integrity', labelAr: 'سلامة الأصول (HYDRO, PC, MFL)', labelEn: 'Asset Integrity (HYDRO, PC, MFL)' },
    { id: 'pwht', labelAr: 'المعالجة الحرارية (PWHT 16x65kW)', labelEn: 'Heat Treatment (PWHT)' },
  ];

  const filteredMethods = selectedCategory === 'all'
    ? NDT_METHODS
    : selectedCategory === 'pwht'
    ? []
    : NDT_METHODS.filter(m => m.category === selectedCategory);

  return (
    <section id="services-section" className="py-16 md:py-24 bg-[#0c0d1b] border-b border-[#21264c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-400 font-bold text-xs uppercase tracking-wider mb-3">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>{isAr ? 'النشاط الرئيسي والخدمات الهندسية' : 'CORE ENGINEERING SERVICES'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {isAr ? (
              <>
                تغطية شاملة لكل <span className="text-amber-400">طرق الفحص والمعالجة</span>
              </>
            ) : (
              <>
                Complete Method Coverage Under <span className="text-amber-400">One Certified System</span>
              </>
            )}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-4">
            {isAr
              ? 'مهندسون معتمدون، ومعدات مملوكة بالكامل ١٠٠٪ في مستودعاتنا بالقاهرة، جاهزة للتحرك الفوري وفق أكواد ASME, AWS, API, ISO, BSI.'
              : 'Company engineers and 100% company-owned equipment ready at your site, executed to ASME, AWS, API, ISO, BSI standards.'}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'bg-[#15193b] text-slate-300 hover:text-white hover:bg-[#1e2455] border border-[#272e61]'
              }`}
            >
              {isAr ? cat.labelAr : cat.labelEn}
            </button>
          ))}
        </div>

        {/* PWHT Special Feature Section when PWHT or All is selected */}
        {(selectedCategory === 'all' || selectedCategory === 'pwht') && (
          <div className="mb-14 bg-gradient-to-r from-[#171a3d] via-[#12142d] to-[#1c183d] rounded-2xl border-2 border-amber-500/50 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono-code font-bold text-amber-400 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30">
                  <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>AUTOMATIC 65 kW PWHT FLEET - COMPANY OWNED</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {isAr ? HEAT_TREATMENT_SPECS.titleAr : HEAT_TREATMENT_SPECS.titleEn}
                </h3>

                <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                  {isAr ? HEAT_TREATMENT_SPECS.taglineAr : HEAT_TREATMENT_SPECS.taglineEn}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {HEAT_TREATMENT_SPECS.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>{isAr ? h.ar : h.en}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-xs text-slate-400 font-semibold">{isAr ? 'الأكواد المعمول بها:' : 'Codes:'}</span>
                  {HEAT_TREATMENT_SPECS.codes.map((c) => (
                    <span key={c} className="text-xs font-mono-code px-2 py-0.5 rounded bg-[#0e1026] text-amber-300 border border-[#2b336e]">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 bg-[#0a0c1b] p-5 rounded-xl border border-amber-500/30 text-center space-y-4">
                <div className="p-4 rounded-lg bg-gradient-to-b from-[#1b1f48] to-[#0e1026] border border-[#29326d]">
                  <div className="text-2xl font-black font-mono-code text-amber-400">{isAr ? 'أسطول متكامل' : 'EXTENSIVE FLEET'}</div>
                  <div className="text-xs text-slate-300 mt-1">{isAr ? 'وحدات 65kW أوتوماتيكية مجهزة بالكامل' : '65 kW Automatic Heat Treatment Units'}</div>
                  <div className="text-[11px] text-emerald-400 font-semibold mt-1">24/7 Programmed Cycles</div>
                </div>

                <button
                  onClick={() => onSelectMethodForRFQ('PWHT')}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isAr ? 'طلب خدمات المعالجة الحرارية' : 'Book PWHT Services'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 12 NDT Methods Grid */}
        {selectedCategory !== 'pwht' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredMethods.map((method) => (
              <div
                key={method.id}
                className="bg-gradient-to-b from-[#131633] to-[#0d0f22] rounded-2xl border border-[#232958] hover:border-amber-400/60 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 group relative"
              >
                <div>
                  {/* Top Badge & Code */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1d224d] to-[#12142e] border border-amber-400/40 text-amber-300 font-mono-code font-black text-base flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                      {method.code}
                    </span>
                    <span className="text-[10px] font-mono-code text-slate-400 px-2 py-0.5 rounded bg-[#0a0c1a] border border-[#1f244c] line-clamp-1 max-w-[150px]">
                      {method.standards.split('-')[0]}
                    </span>
                  </div>

                  {/* Title & Standards */}
                  <h3 className="font-bold text-white text-base group-hover:text-amber-300 transition line-clamp-1">
                    {isAr ? method.name.ar : method.name.en}
                  </h3>

                  <div className="text-[11px] font-mono-code text-amber-400/90 mt-1 mb-3 line-clamp-1">
                    {method.standards}
                  </div>

                  {/* Brief Summary */}
                  <p className="text-slate-300 text-xs leading-relaxed line-clamp-3 mb-4">
                    {isAr ? method.summary.ar : method.summary.en}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-[#1e2450] flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveModalMethod(method)}
                    className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1 transition cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-sky-400" />
                    <span>{isAr ? 'شرح الاختبار' : 'Details'}</span>
                  </button>

                  <button
                    onClick={() => onSelectMethodForRFQ(method.code)}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/30 transition flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isAr ? 'طلب فحص' : 'Request'}</span>
                    <Arrow className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Welding & Manpower Supply Banner */}
        <div className="mt-14 bg-gradient-to-r from-[#11142e] to-[#181a38] p-6 sm:p-8 rounded-2xl border border-[#232958] shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400">
                <Wrench className="w-4 h-4" />
                <span>ASME IX & AWS D1.1 CERTIFIED CREWS</span>
              </div>
              <h3 className="text-2xl font-black text-white">
                {isAr ? WELDING_MANPOWER_SPECS.titleAr : WELDING_MANPOWER_SPECS.titleEn}
              </h3>
              <p className="text-slate-300 text-sm">
                {isAr
                  ? 'توريد عمالة اللحام المعتمدة وكوادر تجميع المواسير وخدمات تأجير المعدات مع المشغلين تحت إشراف هندسي صارم من مهندسي إنسكو، وبنفس معايير نظام الجودة المعتمد.'
                  : 'Certified welding crews and site-utility manpower mobilized under INSCO engineers and QC/QA procedures, qualified to project codes.'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {WELDING_MANPOWER_SPECS.highlights.map((hl, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{isAr ? hl.ar : hl.en}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                onClick={() => onSelectMethodForRFQ('WELDING_MANPOWER')}
                className="w-full py-3 px-4 rounded-xl bg-[#1d224d] hover:bg-[#252c63] text-amber-300 border border-amber-500/30 font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Users className="w-4 h-4 text-amber-400" />
                <span>{isAr ? 'طلب أطقم لحام وعمالة معتمدة' : 'Request Welding Manpower'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Method Details Modal */}
      {activeModalMethod && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#10132b] border-2 border-amber-500/60 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative text-start">
            <button
              onClick={() => setActiveModalMethod(null)}
              className="absolute top-5 end-5 p-2 rounded-lg bg-[#181c3d] text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1d224d] to-[#12142e] border-2 border-amber-400 text-amber-300 font-mono-code font-black text-xl flex items-center justify-center shadow-lg">
                {activeModalMethod.code}
              </span>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {isAr ? activeModalMethod.name.ar : activeModalMethod.name.en}
                </h3>
                <div className="text-xs font-mono-code text-amber-400 mt-0.5">
                  {activeModalMethod.standards}
                </div>
              </div>
            </div>

            <div className="space-y-5 text-sm">
              {/* Detailed Technical Description */}
              <div className="bg-[#0b0c1b] p-4 rounded-xl border border-[#232958]">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                  {isAr ? 'الوصف الهندسي ومبدأ العمل' : 'Technical Description & Principle'}
                </div>
                <p className="text-slate-200 leading-relaxed text-xs sm:text-sm">
                  {isAr ? activeModalMethod.description.ar : activeModalMethod.description.en}
                </p>
              </div>

              {/* Equipment Used */}
              <div>
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-sky-400" />
                  <span>{isAr ? 'المعدات والأجهزة المستخدمة' : 'Equipment & Instruments'}</span>
                </div>
                <p className="text-xs text-slate-300 bg-[#141838] p-3 rounded-lg border border-[#222752]">
                  {isAr ? activeModalMethod.equipmentUsed.ar : activeModalMethod.equipmentUsed.en}
                </p>
              </div>

              {/* Applications */}
              <div>
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  {isAr ? 'أهم التطبيقات والمشاريع' : 'Key Field Applications'}
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {(isAr ? activeModalMethod.applications.ar : activeModalMethod.applications.en).map((app, i) => (
                    <li key={i} className="flex items-start gap-1.5 bg-[#121532] p-2 rounded border border-[#20254e]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Advantages & Limitations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-[#0e172a] p-3.5 rounded-xl border border-emerald-500/30">
                  <div className="font-bold text-emerald-400 mb-1.5">{isAr ? 'المميزات الرئيسية' : 'Advantages'}</div>
                  <ul className="space-y-1 text-slate-300">
                    {(isAr ? activeModalMethod.advantages.ar : activeModalMethod.advantages.en).map((adv, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#1f1624] p-3.5 rounded-xl border border-amber-500/30">
                  <div className="font-bold text-amber-400 mb-1.5">{isAr ? 'القيود والاشتراطات' : 'Limitations'}</div>
                  <ul className="space-y-1 text-slate-300">
                    {(isAr ? activeModalMethod.limitations.ar : activeModalMethod.limitations.en).map((lim, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        <span>{lim}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="mt-6 pt-4 border-t border-[#232958] flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-400">
                {isAr ? 'جميع الفحوصات تحت إشراف فاحصين معتمدين ASNT Level II' : 'Supervised by ASNT Level II certified inspectors'}
              </span>
              <button
                onClick={() => {
                  const code = activeModalMethod.code;
                  setActiveModalMethod(null);
                  onSelectMethodForRFQ(code);
                }}
                className="py-2.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isAr ? `طلب فحص بتقنية (${activeModalMethod.code})` : `Request ${activeModalMethod.code} Inspection`}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
