import React from 'react';
import { Shield, Activity, ArrowRight, ArrowLeft, CheckCircle2, Flame, Bot, Send, BookOpen, Download, FileText, HelpCircle } from 'lucide-react';
import { Language } from '../types';
import { COMPANY_DETAILS, QUICK_STATS } from '../data/inscoData';

interface HeroProps {
  language: Language;
  onNavigate: (tab: string) => void;
  onOpenMessenger: () => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onNavigate, onOpenMessenger }) => {
  const isAr = language === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0e1024] via-[#12142d] to-[#0a0b18] pt-8 pb-16 md:py-20 border-b border-[#21264c]">
      {/* Background industrial grid pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #f59e0b 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }}></div>

      {/* Radiant ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-amber-500/10 via-indigo-600/15 to-amber-600/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Accreditation and Document Reference Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1b1f42]/90 border border-amber-400/30 text-amber-300 text-xs shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-mono-code font-bold">{COMPANY_DETAILS.docRef}</span>
            <span className="text-slate-500">|</span>
            <span>{isAr ? 'ملف اعتماد الموردين المعتمد' : 'Official Vendor Submission'}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="px-2.5 py-1 rounded bg-[#161a38] border border-slate-700 font-mono-code">
              EGAC CAB #120007
            </span>
            <span className="px-2.5 py-1 rounded bg-[#161a38] border border-slate-700 font-mono-code">
              ENRRA Licensed
            </span>
          </div>
        </div>

        {/* Hero Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-amber-400 font-bold text-sm tracking-wider uppercase">
                <Shield className="w-4 h-4" />
                <span>{isAr ? 'الشركة الدولية للخدمات والمقاولات' : 'International for Services & Constructions'}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                {isAr ? (
                  <>
                    نرى ما وراء <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">السطح.</span>
                  </>
                ) : (
                  <>
                    SEE BEYOND <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">THE SURFACE.</span>
                  </>
                )}
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-slate-300">
                {isAr ? COMPANY_DETAILS.subSloganAr : COMPANY_DETAILS.subSloganEn}
              </p>
            </div>

            {/* Ultrasonic Pulse Line Graphic from Brochure */}
            <div className="py-2">
              <div className="flex items-center gap-2">
                <div className="h-[2px] w-12 bg-amber-400"></div>
                <svg className="w-40 h-8 text-amber-400" viewBox="0 0 160 32" fill="none">
                  <path
                    d="M0 16H35L42 2L50 30L58 10L64 22L70 16H160"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="h-[2px] flex-1 bg-gradient-to-r from-amber-400 to-transparent"></div>
              </div>
              <span className="text-[11px] font-mono-code text-amber-400/80 tracking-widest uppercase">
                {isAr ? 'إشارات فحص الموجات وإجهادات المعالجة الحرارية المتزامنة' : 'Precision NDT Waveform & Stress Relief Calibration'}
              </span>
            </div>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              {isAr
                ? 'خدمات الفحوصات غير الإتلافية (NDT) المتكاملة، المعالجة الحرارية بعد اللحام (PWHT) بأسطول واسع ومتطور من الوحدات الأوتوماتيكية بقدرة 65 kW، وتوريد أطقم اللحام المعتمدة لقطاعات البترول والغاز والمحطات الصناعية والإنشائية.'
                : 'Integrated Non-Destructive Testing, Post-Weld Heat Treatment with an extensive owned fleet of automatic 65 kW units, and certified welding services for the oil & gas, construction and industrial sectors.'}
            </p>

            {/* Triple ISO Ribbon */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
              {[
                { code: 'ISO 9001:2015', nameAr: 'إدارة الجودة QMS', nameEn: 'Quality Management' },
                { code: 'ISO 14001:2015', nameAr: 'الإدارة البيئية EMS', nameEn: 'Environmental System' },
                { code: 'ISO 45001:2018', nameAr: 'السلامة والصحة OH&S', nameEn: 'Health & Safety' },
              ].map((iso) => (
                <div
                  key={iso.code}
                  className="bg-[#141836] border border-amber-500/30 rounded-xl p-3 flex items-center gap-2.5 shadow-md"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs">
                    ISO
                  </div>
                  <div>
                    <div className="text-xs font-mono-code font-bold text-white">{iso.code}</div>
                    <div className="text-[11px] text-slate-400">{isAr ? iso.nameAr : iso.nameEn}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Hero CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={onOpenMessenger}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-amber-500/25 transition transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Send className="w-5 h-5" />
                <span>{isAr ? 'ماسنجر طلب الخدمات و RFQ' : 'Service Messenger & RFQ'}</span>
                <Arrow className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('ai-platform')}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#1d224d] hover:bg-[#252b61] text-amber-300 hover:text-white border border-amber-500/30 font-bold text-sm sm:text-base transition cursor-pointer"
              >
                <Bot className="w-5 h-5 text-amber-400" />
                <span>{isAr ? 'منصة الرد الذكية على العملاء' : 'AI Client Platform'}</span>
              </button>

              <button
                onClick={() => onNavigate('academy')}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#141836] hover:bg-[#1a2046] text-slate-200 border border-slate-700 font-semibold text-sm sm:text-base transition cursor-pointer"
              >
                <BookOpen className="w-5 h-5 text-sky-400" />
                <span>{isAr ? 'الأكاديمية التعليمية' : 'NDT Academy'}</span>
              </button>

              <button
                onClick={() => onNavigate('faqs')}
                className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-[#141836] hover:bg-[#1b2149] text-amber-300 border border-amber-500/30 hover:border-amber-400 font-semibold text-sm sm:text-base transition cursor-pointer"
              >
                <HelpCircle className="w-5 h-5 text-amber-400" />
                <span>{isAr ? 'الأسئلة الشائعة' : 'FAQs'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Fleet & Readiness Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative bg-gradient-to-br from-[#181d3f] via-[#131633] to-[#0d0f22] p-6 rounded-2xl border-2 border-amber-500/40 shadow-2xl">
              {/* Badge header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#262c5b]">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
                  <span className="font-bold text-sm text-white">
                    {isAr ? 'أسطول المعالجة الحرارية PWHT' : 'PWHT Fleet In Cairo'}
                  </span>
                </div>
                <span className="text-[11px] font-mono-code px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {isAr ? 'جاهز للتعبئة الفورية' : '100% Ready'}
                </span>
              </div>

              {/* Technical Specifications Card */}
              <div className="py-5 space-y-4">
                <div className="bg-[#0b0c1b] p-4 rounded-xl border border-[#232958]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-slate-400 text-xs">{isAr ? 'وحدات PWHT أوتوماتيكية' : 'Automatic PWHT Units'}</span>
                    <span className="text-xl font-black text-amber-400 font-mono-code">{isAr ? 'أسطول متكامل 65 kW' : '65 kW Fleet'}</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    {isAr
                      ? 'وحدات معالجة حرارية مبرمجة ذات ٦ قنوات مستقلة ومسجلات بيانية معايرة لتنفيذ دورات ٢٤/٧ طبقاً لـ ASME B31.3.'
                      : 'Equipped with independent 6-channel programmers and calibrated chart recorders for 24/7 code cycles.'}
                  </p>
                </div>

                <div className="bg-[#0b0c1b] p-4 rounded-xl border border-[#232958]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-slate-400 text-xs">{isAr ? 'أسطول الفحوصات غير الإتلافية NDT' : 'NDT Fleet Coverage'}</span>
                    <span className="text-lg font-bold text-sky-400 font-mono-code">{isAr ? 'تغطية شاملة' : 'Full Scope'}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {['PAUT', 'RT (Ir-192/Se-75)', 'UT', 'MT', 'PT', 'PMI', 'HT', 'HYDRO', 'MFL'].map((tag) => (
                      <span key={tag} className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-[#181d3f] text-slate-300 border border-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-[#121532] p-3 rounded-lg border border-[#232958]">
                    <div className="text-slate-400">{isAr ? 'المصادقة الإشعاعية' : 'Radiation Permit'}</div>
                    <div className="font-bold text-amber-300 mt-0.5">ENRRA Licensed</div>
                  </div>
                  <div className="bg-[#121532] p-3 rounded-lg border border-[#232958]">
                    <div className="text-slate-400">{isAr ? 'رئيس المراجعين' : 'Quality Audit'}</div>
                    <div className="font-bold text-emerald-400 mt-0.5">CQI-IRCA Lead Auditor</div>
                  </div>
                </div>
              </div>

              {/* Direct quote from management in brochure */}
              <blockquote className="border-s-2 border-amber-400 ps-3 py-1 my-2 bg-[#1b2046]/40 rounded-e-lg text-xs text-slate-300 italic">
                "{isAr
                  ? 'عملاؤنا لا يشترون اختبارات عادية؛ بل يشترون اليقين الهندسي. كل تقرير نصدره يحمل ثقل اعتماداتنا وتوقيع مهندسينا.'
                  : 'Our clients do not buy tests - they buy certainty. Every report we issue carries the weight of our certifications and the signature of our engineers.'}"
                <span className="block mt-1 font-semibold text-amber-400 not-italic text-[11px]">
                  — {isAr ? 'الإدارة العامة لشركة إنسكو' : 'General Management, INSCO'}
                </span>
              </blockquote>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                <span>{isAr ? 'المقر: المعادي، القاهرة | الورشة: الجيزة' : 'Cairo HQ & Giza Works'}</span>
                <button
                  onClick={() => onNavigate('services')}
                  className="text-amber-400 hover:text-amber-300 font-bold inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>{isAr ? 'استعراض الأسطول' : 'View Fleet'}</span>
                  <Arrow className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Facts Statistics Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-14 pt-10 border-t border-[#1d2246]">
          {QUICK_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="bg-[#121532]/70 hover:bg-[#161a3e] p-3.5 rounded-xl border border-[#242b5c] transition"
            >
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono-code">
                {stat.value}
              </div>
              <div className="text-xs text-slate-300 mt-1 line-clamp-2 leading-snug">
                {isAr ? stat.labelAr : stat.labelEn}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
