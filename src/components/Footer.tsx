import React from 'react';
import { Phone, Mail, MapPin, Globe, Award, Shield, FileText, Activity, ExternalLink, QrCode } from 'lucide-react';
import { Language } from '../types';
import { COMPANY_DETAILS } from '../data/inscoData';

interface FooterProps {
  language: Language;
  onNavigate: (tab: string) => void;
  onOpenMessenger: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onNavigate, onOpenMessenger }) => {
  const isAr = language === 'ar';

  return (
    <footer className="bg-[#070812] text-slate-400 border-t border-[#1c2146] pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#181c3c]">
          {/* Company Brand Summary */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-12 bg-gradient-to-b from-[#1e1b4b] to-[#111227] border border-amber-400 rounded-b-lg flex items-center justify-center">
                <span className="text-[10px] font-black text-amber-300">INSCO</span>
              </div>
              <div>
                <span className="text-lg font-black text-white">
                  {isAr ? 'شركة إنسكو الهندسية' : 'INSCO Engineering'}
                </span>
                <p className="text-xs text-amber-400/90 font-mono-code">
                  {COMPANY_DETAILS.sloganEn}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {isAr
                ? 'الشركة الدولية للخدمات والمقاولات - متخصصة في الفحوصات غير الإتلافية المتقدمة (NDT)، المعالجة الحرارية بعد اللحام (PWHT) بأسطول متكامل من الوحدات الأوتوماتيكية، وتوريد أطقم اللحام المعتمدة.'
                : 'International for Services & Constructions Company - Integrated NDT inspection, automatic post-weld heat treatment, and ASME-certified welding crews.'}
            </p>

            <div className="text-xs space-y-1 font-mono-code text-slate-400 bg-[#0d0f22] p-3 rounded-xl border border-[#1b2046]">
              <div>CR: {COMPANY_DETAILS.commercialReg} | Cert: {COMPANY_DETAILS.certOfInc}</div>
              <div className="text-emerald-400">EGAC CAB #120007 | Valid to 2028</div>
              <div className="text-sky-400">ENRRA Radiation Practice License</div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {isAr ? 'أقسام المنصة' : 'Platform Navigation'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('overview')} className="hover:text-amber-400 transition cursor-pointer">
                  {isAr ? 'نبذة عن إنسكو' : 'About INSCO'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-amber-400 transition cursor-pointer">
                  {isAr ? 'فحوصات NDT والمعالجة' : 'Services & Fleet'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-amber-400 transition cursor-pointer">
                  {isAr ? 'سجل الإنجازات والمشاريع' : 'Project Registers'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('accreditations')} className="hover:text-amber-400 transition cursor-pointer">
                  {isAr ? 'شهادات الآيزو والاعتمادات' : 'ISO & Licenses'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ai-platform')} className="hover:text-amber-400 transition cursor-pointer text-amber-300 font-semibold">
                  {isAr ? 'منصة الرد الذكية' : 'AI Client Platform'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('academy')} className="hover:text-amber-400 transition cursor-pointer text-sky-300 font-semibold">
                  {isAr ? 'الأكاديمية ومحاكي العيوب' : 'NDT Academy & Simulator'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faqs')} className="hover:text-amber-400 transition cursor-pointer text-amber-400 font-semibold">
                  {isAr ? 'الأسئلة الشائعة (FAQs)' : 'Technical FAQs'}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details from Brochure Page 13 & 50 */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {isAr ? 'العناوين ومراكز العمليات' : 'Headquarters & Yards'}
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-200 block">{isAr ? 'المقر الرئيسي (القاهرة):' : 'Cairo Head Office:'}</span>
                  <span>{isAr ? COMPANY_DETAILS.headOfficeAr : COMPANY_DETAILS.headOfficeEn}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-200 block">{isAr ? 'الورش ومستودع المعدات (الجيزة):' : 'Works & Stored Equipment:'}</span>
                  <span>{isAr ? COMPANY_DETAILS.worksAr : COMPANY_DETAILS.worksEn}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Globe className="w-4 h-4 text-sky-400" />
                <span>NDT.org Listing: #{COMPANY_DETAILS.ndtOrgId}</span>
              </div>
            </div>
          </div>

          {/* Direct Mobile / WhatsApp & RFQ action */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {isAr ? 'الاتصال والتعاقد الفوري' : 'Direct Mobilization'}
            </h4>

            <div className="space-y-2 text-xs">
              <a
                href="tel:+201090777202"
                className="flex items-center gap-2 p-2.5 rounded-lg bg-[#11142e] border border-[#212754] text-slate-200 hover:text-amber-400 transition"
                dir="ltr"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>+20 109 077 7202</span>
              </a>

              <a
                href="tel:+201225826396"
                className="flex items-center gap-2 p-2.5 rounded-lg bg-[#11142e] border border-[#212754] text-slate-200 hover:text-amber-400 transition"
                dir="ltr"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>+20 122 582 6396</span>
              </a>

              <a
                href={`mailto:${COMPANY_DETAILS.email}`}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-[#11142e] border border-[#212754] text-slate-200 hover:text-amber-400 transition"
              >
                <Mail className="w-4 h-4 text-sky-400" />
                <span>{COMPANY_DETAILS.email}</span>
              </a>

              <button
                onClick={onOpenMessenger}
                className="w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition cursor-pointer mt-2"
              >
                {isAr ? 'طلب عرض سعر فوري RFQ' : 'Submit Instant RFQ'}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright & legal compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {isAr ? 'شركة إنسكو الدولية للخدمات والمقاولات. جميع الحقوق محفوظة.' : 'INSCO - International for Services & Constructions Company. All rights reserved.'}
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono-code">
            <span>DOC REF: {COMPANY_DETAILS.docRef}</span>
            <span>•</span>
            <span>ISO 9001 / 14001 / 45001</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
