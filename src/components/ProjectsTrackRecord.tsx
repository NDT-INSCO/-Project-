import React, { useState } from 'react';
import { Briefcase, MapPin, Calendar, FileText, CheckCircle2, Globe, Building2, Shield, ExternalLink } from 'lucide-react';
import { Language, ProjectRecord } from '../types';
import { MAJOR_PROJECTS } from '../data/inscoData';

interface ProjectsTrackRecordProps {
  language: Language;
  onOpenMessenger: () => void;
}

export const ProjectsTrackRecord: React.FC<ProjectsTrackRecordProps> = ({ language, onOpenMessenger }) => {
  const isAr = language === 'ar';
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filters = [
    { id: 'all', labelAr: 'كافة المشاريع', labelEn: 'All Projects' },
    { id: 'Egypt', labelAr: 'مشاريع مصر', labelEn: 'Egypt Projects' },
    { id: 'international', labelAr: 'المشاريع الدولية (اليمن وأفغانستان)', labelEn: 'International Works' },
  ];

  const filteredProjects = selectedFilter === 'all'
    ? MAJOR_PROJECTS
    : selectedFilter === 'Egypt'
    ? MAJOR_PROJECTS.filter(p => p.country === 'Egypt')
    : MAJOR_PROJECTS.filter(p => p.country !== 'Egypt');

  return (
    <section className="py-16 md:py-24 bg-[#090a16] border-b border-[#21264c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
              <span className="w-8 h-[2px] bg-amber-400"></span>
              <span>{isAr ? 'سجل الإنجازات وسابقة الأعمال' : 'TRACK RECORD'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {isAr ? (
                <>
                  أعمال منجزة في <span className="text-amber-400">كبرى المنشآت الحيوية</span>
                </>
              ) : (
                <>
                  Proven Where It <span className="text-amber-400">Matters Most</span>
                </>
              )}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              {isAr
                ? 'سجلات مشاريع موثقة 2010 - 2025 مع كبرى الشركات العالمية مثل سيمنز، أوراسكوم للإنشاءات، السويدي إليكتريك، والجيش الأمريكي، مدعومة بأوامر التوريد وعقود الباطن الموقعة.'
                : 'Project registers 2010-2025 and signed client documents (purchase orders, subcontracts, performance guarantees) reproduced in official Annexes.'}
            </p>
          </div>

          {/* Country / Category Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedFilter === f.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-[#141836] text-slate-300 hover:text-white border border-[#232958]'
                }`}
              >
                {isAr ? f.labelAr : f.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="bg-gradient-to-b from-[#131633] to-[#0d0f22] rounded-2xl border border-[#212752] hover:border-amber-400/50 overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* Image banner */}
              <div className="relative h-44 overflow-hidden bg-[#0a0c18]">
                {proj.photoUrl && (
                  <img
                    src={proj.photoUrl}
                    alt={proj.project}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 opacity-80 hover:opacity-100"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f22] via-[#0d0f22]/40 to-transparent"></div>

                {/* Country Badge */}
                <div className="absolute top-3 end-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm text-[11px] font-bold text-amber-300 border border-amber-400/30">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  <span>{proj.country}</span>
                </div>

                {/* Verified Tag */}
                <div className="absolute bottom-3 start-3 text-[10px] font-mono-code font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  {isAr ? 'عقد موثق بالملحق E' : 'Verified Annex E'}
                </div>
              </div>

              {/* Body Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-xs font-mono-code font-bold text-amber-400 tracking-wide line-clamp-1">
                    {proj.client}
                  </div>
                  <h3 className="font-bold text-white text-base leading-snug line-clamp-2">
                    {proj.project}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                    <span className="line-clamp-1">{proj.location}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-[#1e234c]">
                  <div className="text-xs text-slate-300 bg-[#0a0c1a] p-2.5 rounded-lg border border-[#1b2046] leading-relaxed">
                    <span className="font-semibold text-amber-300/90 block mb-0.5 text-[11px]">
                      {isAr ? 'الأنشطة المنفذة:' : 'Activities:'}
                    </span>
                    {proj.activities}
                  </div>

                  {proj.documentRef && (
                    <div className="text-[11px] font-mono-code text-slate-400 line-clamp-1">
                      {proj.documentRef}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Projects Table Reference from Brochure Page 11 */}
        <div className="mt-12 bg-[#10132b] rounded-2xl border border-[#222854] p-5 sm:p-6 shadow-xl overflow-x-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>{isAr ? 'جدول سجل مشاريع شركة إنسكو المعتمد (2010 - 2025)' : 'INSCO Approved Project Registers (2010 - 2025)'}</span>
            </div>
            <span className="text-xs font-mono-code text-amber-400/80">
              ASME - ANSI - AWS - API - BSI - EN - IIW - JIS - AISC
            </span>
          </div>

          <table className="w-full text-xs text-start">
            <thead>
              <tr className="border-b border-[#20254e] text-slate-400">
                <th className="py-2.5 px-3 font-semibold">{isAr ? 'العميل / الاستشاري' : 'Client / Contractor'}</th>
                <th className="py-2.5 px-3 font-semibold">{isAr ? 'المشروع والموقع' : 'Project & Site'}</th>
                <th className="py-2.5 px-3 font-semibold">{isAr ? 'نطاق الفحص والمعالجة' : 'Executed Activities'}</th>
                <th className="py-2.5 px-3 font-semibold">{isAr ? 'مستند الإسناد' : 'Evidence Reference'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#171b3e] text-slate-200">
              <tr>
                <td className="py-3 px-3 font-bold text-amber-300">SIEMENS / ORASCOM</td>
                <td className="py-3 px-3">El-Burullus 4800 MW CCPP - Egypt</td>
                <td className="py-3 px-3">RT (X-ray), PT, MT, Phased Array UT & PWHT</td>
                <td className="py-3 px-3 font-mono-code text-slate-400">Subcontract E-06 / E-07</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-amber-300">ADPC / PETROMASILA</td>
                <td className="py-3 px-3">Pipelines & Masila Block - R.O. Yemen</td>
                <td className="py-3 px-3">RT (gamma-ray Ir-192), holiday spark test, NDT</td>
                <td className="py-3 px-3 font-mono-code text-slate-400">Integration Agreement E-08</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-amber-300">El Sewedy Electric</td>
                <td className="py-3 px-3">Power Transformer Works - Cairo</td>
                <td className="py-3 px-3">VT, UT, MT, PT, RT, Hardness testing, PWHT</td>
                <td className="py-3 px-3 font-mono-code text-slate-400">Purchase Order GM102473</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-amber-300">U.S. Army / Serka & Contrack</td>
                <td className="py-3 px-3">Bagram Air Field - Afghanistan</td>
                <td className="py-3 px-3">NDT & PWHT for 1500m tanker offload fuel lines</td>
                <td className="py-3 px-3 font-mono-code text-slate-400">Cert. of Appreciation B-02</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-amber-300">PGESCO / GE - Orascom</td>
                <td className="py-3 px-3">6th of October Power Station - Egypt</td>
                <td className="py-3 px-3">All NDT on fuel pipe lines & storage tanks</td>
                <td className="py-3 px-3 font-mono-code text-slate-400">Project Register</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-amber-300">CMI & ARESCO</td>
                <td className="py-3 px-3">Talkha & El-Kureimat Power Stations</td>
                <td className="py-3 px-3">NDT & Post-Weld Heat Treatment on boilers</td>
                <td className="py-3 px-3 font-mono-code text-slate-400">Signed Documents Annex E</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
