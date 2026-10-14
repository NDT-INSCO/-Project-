import React, { useState } from 'react';
import { Award, ShieldCheck, CheckCircle2, FileCheck, ExternalLink, Calendar, Building, Sparkles, Download } from 'lucide-react';
import { Language } from '../types';
import { CERTIFICATIONS_LIST, COMPANY_DETAILS } from '../data/inscoData';

interface AccreditationsProps {
  language: Language;
}

export const Accreditations: React.FC<AccreditationsProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [selectedCert, setSelectedCert] = useState<string>('ISO 9001:2015');

  return (
    <section className="py-16 md:py-24 bg-[#0c0e1e] border-b border-[#21264c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>{isAr ? 'الاعتمادات الدولية والتراخيص الرسمية' : 'AUDITABLE PROOF & ACCREDITATION'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {isAr ? (
              <>
                أنظمة معتمدة. <span className="text-amber-400">أدلة قابلة للتدقيق.</span>
              </>
            ) : (
              <>
                Certified Systems. <span className="text-amber-400">Auditable Proof.</span>
              </>
            )}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-4">
            {isAr
              ? 'ثلاث شهادات آيزو دولية سارية حتى 2028 معتمدة من المجلس الوطني للاعتماد (EGAC)، وكبير مراجعين مسجل CQI-IRCA، وترخيص كامل للسلامة الإشعاعية من ENRRA.'
              : 'Triple ISO-certified management system through 2028 with full EGAC / IAF MLA accreditation, in-house CQI-IRCA lead auditor, and ENRRA licensed radiation practice.'}
          </p>
        </div>

        {/* 3 ISO System Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {CERTIFICATIONS_LIST.map((cert) => {
            const isSelected = selectedCert === cert.code;
            return (
              <div
                key={cert.code}
                onClick={() => setSelectedCert(cert.code)}
                className={`p-6 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#181d45] to-[#10132f] border-amber-400 shadow-xl shadow-amber-500/15'
                    : 'bg-[#121533] border-[#222854] hover:border-slate-500 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 font-black text-xs font-mono-code flex items-center justify-center shadow-md">
                    ISO
                  </span>
                  <span className="text-[11px] font-mono-code font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {cert.iafCode}
                  </span>
                </div>

                <h3 className="text-lg font-black text-white mb-1">{cert.code}</h3>
                <div className="text-xs text-amber-300/90 font-medium mb-4">
                  {isAr ? cert.name.ar : cert.name.en}
                </div>

                <div className="space-y-2 text-xs border-t border-[#202652] pt-3 text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">{isAr ? 'رقم الشهادة:' : 'Certificate No:'}</span>
                    <span className="font-mono-code font-bold text-white">{cert.certNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{isAr ? 'الصلاحية:' : 'Valid Through:'}</span>
                    <span className="font-mono-code text-emerald-400 font-semibold">{cert.validThrough}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{isAr ? 'المجلس الوطني:' : 'Accreditation:'}</span>
                    <span className="font-mono-code text-slate-200">{cert.cabNumber}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed In-house Lead Auditor & Regulatory Licenses Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CQI-IRCA Lead Auditor Card */}
          <div className="bg-gradient-to-br from-[#141838] to-[#0d0f22] p-6 rounded-2xl border border-amber-500/40 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#1e2454] border border-amber-400/40 flex items-center justify-center text-amber-300">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono-code text-amber-400 uppercase font-bold tracking-wider">
                  IN-HOUSE QUALITY AUDIT LEADERSHIP
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  CQI-IRCA Certified Lead Auditor
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isAr
                ? 'كبير مراجعين لنظم إدارة الجودة QMS ISO 9001:2015 معتمد من معهد الجودة القانوني وسجل المراجعين الدولي (CQI & IRCA - UK) برقم شهادة 121 / UDN 27956. يضمن الإشراف والامتثال التام لجميع متطلبات الفحص غير الإتلافي NDT والمعالجة الحرارية PWHT وأعمال اللحام.'
                : 'QMS ISO 9001:2015 Auditor / Lead Auditor - CQI-IRCA certified course No. 18096, Certificate No. 121 / UDN 27956. Certified scope: provision of NDT services, heat treatment and welding services.'}
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div className="bg-[#0b0d1e] p-3 rounded-lg border border-[#21264e]">
                <div className="text-slate-400">{isAr ? 'رقم الشهادة' : 'Cert No.'}</div>
                <div className="font-mono-code font-bold text-amber-300 mt-0.5">No. 121 / UDN 27956</div>
              </div>
              <div className="bg-[#0b0d1e] p-3 rounded-lg border border-[#21264e]">
                <div className="text-slate-400">{isAr ? 'الدورات المعتمدة' : 'Accredited Scope'}</div>
                <div className="font-bold text-emerald-400 mt-0.5">NDT & PWHT Services</div>
              </div>
            </div>
          </div>

          {/* ENRRA Radiation Safety License Card */}
          <div className="bg-gradient-to-br from-[#141838] to-[#0d0f22] p-6 rounded-2xl border border-amber-500/40 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#1e2454] border border-amber-400/40 flex items-center justify-center text-amber-300">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono-code text-amber-400 uppercase font-bold tracking-wider">
                  REGULATORY & SAFETY COMPLIANCE
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  ENRRA Radiation Practice License
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isAr
                ? 'ترخيص رسمي صادر من الهيئة المصرية للرقابة النووية والإشعاعية (ENRRA) لحيازة واستخدام المصادر المشعة (Ir-192 و Se-75) في أغراض التصوير الإشعاعي الصناعي، مع ضوابط حماية إشعاعية صارمة ومسؤولي وقاية إشعاعية معتمدين.'
                : 'Official radiation practice and use license issued by the Egyptian Nuclear & Radiological Regulatory Authority (ENRRA) covering gamma and X-ray operations, with licensed radiation protection officers.'}
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div className="bg-[#0b0d1e] p-3 rounded-lg border border-[#21264e]">
                <div className="text-slate-400">{isAr ? 'الهيئة المنظمة' : 'Regulator'}</div>
                <div className="font-bold text-amber-300 mt-0.5">ENRRA - Cairo, Egypt</div>
              </div>
              <div className="bg-[#0b0d1e] p-3 rounded-lg border border-[#21264e]">
                <div className="text-slate-400">{isAr ? 'الدليل الدولي' : 'Directory'}</div>
                <div className="font-bold text-sky-400 mt-0.5">www.ndt.org (#54161)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
