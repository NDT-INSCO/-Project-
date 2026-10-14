import React, { useState } from 'react';
import { 
  BookOpen, 
  Layers, 
  Award, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Search, 
  ChevronRight, 
  ChevronDown, 
  ShieldCheck, 
  Sparkles, 
  Compass, 
  Wrench,
  Download,
  GraduationCap,
  ExternalLink
} from 'lucide-react';
import { Language } from '../../types';
import { ENGINEERING_DISCIPLINES, EngineeringDiscipline, DisciplineLevel } from '../../data/academyCurriculum';

interface DisciplineCurriculumViewProps {
  language: Language;
  onSelectWorkshop?: (workshopId: string) => void;
}

export const DisciplineCurriculumView: React.FC<DisciplineCurriculumViewProps> = ({ 
  language,
  onSelectWorkshop 
}) => {
  const isAr = language === 'ar';
  
  const [selectedDisciplineId, setSelectedDisciplineId] = useState<string>(ENGINEERING_DISCIPLINES[0].id);
  const [selectedLevelIdx, setSelectedLevelIdx] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);

  // Active discipline
  const activeDiscipline = ENGINEERING_DISCIPLINES.find(d => d.id === selectedDisciplineId) || ENGINEERING_DISCIPLINES[0];
  
  // Safe level index
  const safeLevelIdx = Math.min(selectedLevelIdx, activeDiscipline.levels.length - 1);
  const activeLevel = activeDiscipline.levels[safeLevelIdx];

  // Filter disciplines by search query
  const filteredDisciplines = ENGINEERING_DISCIPLINES.filter(d => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      d.titleAr.toLowerCase().includes(q) ||
      d.titleEn.toLowerCase().includes(q) ||
      d.keyTechniques.some(t => t.toLowerCase().includes(q)) ||
      d.globalAccreditations.some(a => a.toLowerCase().includes(q))
    );
  });

  const toggleModule = (modId: string) => {
    setExpandedModuleId(prev => prev === modId ? null : modId);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0b0c1c] via-[#12163b] to-[#0b0c1c] p-6 sm:p-8 rounded-2xl border border-amber-500/30 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-400 font-bold text-xs uppercase tracking-wider mb-3">
              <GraduationCap className="w-4 h-4" />
              <span>{isAr ? 'الموسوعة والمنهج التعليمي المتكامل لعلوم التفتيش' : 'Full Professional NDT & Engineering Curriculum'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
              {isAr ? (
                <>
                  جميع علوم التفتيش والجودة <span className="text-amber-400">بمستوياتها المهنية العالمية</span>
                </>
              ) : (
                <>
                  All Inspection Disciplines Across <span className="text-amber-400">All Professional Levels</span>
                </>
              )}
            </h3>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">
              {isAr
                ? 'تخطيط منهجي احترافي جاهز للتعلم يغطي 8 مجالات هندسية متخصصة من المستوى الأول وحتى المستوى الثالث الاستشاري، مع متطلبات الأكواد الدولية ASME و API و AWS و ISO.'
                : 'Systematic structured curriculum covering 8 core industrial inspection disciplines from Level I to Level III Consulting Director, backed by global standards.'}
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="w-full lg:w-80">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={isAr ? 'ابحث عن تقنية، كود، أو شهادة...' : 'Search discipline, method, code...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0a0d24] border border-[#232958] focus:border-amber-400 rounded-xl ps-10 pe-4 py-2.5 text-xs text-white placeholder-slate-400 transition outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Discipline List + Right Level & Curriculum Syllabus */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Disciplines Navigation (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono-code text-slate-400 px-1">
            <span>{isAr ? 'المجالات الهندسية الـ 8' : '8 CORE DISCIPLINES'}</span>
            <span>{filteredDisciplines.length} Available</span>
          </div>

          <div className="space-y-2.5">
            {filteredDisciplines.map((discipline) => {
              const isSelected = selectedDisciplineId === discipline.id;
              return (
                <button
                  key={discipline.id}
                  onClick={() => {
                    setSelectedDisciplineId(discipline.id);
                    setSelectedLevelIdx(0);
                  }}
                  className={`w-full text-start p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1a204d] border-amber-400 text-white shadow-xl shadow-amber-500/10 ring-2 ring-amber-500/20'
                      : 'bg-[#0b0c1c] border-[#202652] text-slate-300 hover:bg-[#131633] hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono-code uppercase px-2 py-0.5 rounded font-bold bg-[#111432] text-amber-300 border border-[#272e61]">
                      {discipline.category.replace('_', ' ')}
                    </span>
                    <span className="text-xs font-mono-code text-slate-400">
                      {discipline.levels.length} {isAr ? 'مستويات' : 'Levels'}
                    </span>
                  </div>

                  <div className="font-bold text-sm leading-snug">
                    {isAr ? discipline.titleAr : discipline.titleEn}
                  </div>

                  {/* Badges preview */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {discipline.keyTechniques.slice(0, 3).map((tech, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-black/40 text-slate-300 border border-[#232958]">
                        {tech.split('(')[0].trim()}
                      </span>
                    ))}
                    {discipline.keyTechniques.length > 3 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-slate-400">
                        +{discipline.keyTechniques.length - 3}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Col: Active Discipline Details & Level Tabs (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Discipline Top Card */}
          <div className="bg-[#0b0c1c] p-6 rounded-2xl border border-[#232958] shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#212752] pb-4">
              <div>
                <span className="text-[11px] font-mono-code text-amber-400 font-bold uppercase tracking-wider">
                  DISCIPLINE DOSSIER
                </span>
                <h4 className="text-2xl font-black text-white mt-0.5">
                  {isAr ? activeDiscipline.titleAr : activeDiscipline.titleEn}
                </h4>
              </div>

              {/* Accreditations tags */}
              <div className="flex flex-wrap gap-1.5">
                {activeDiscipline.globalAccreditations.map((acc, i) => (
                  <span key={i} className="text-xs font-mono-code px-2.5 py-1 rounded-lg bg-[#151940] text-sky-300 border border-sky-500/30 font-bold">
                    {acc}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              {isAr ? activeDiscipline.overviewAr : activeDiscipline.overviewEn}
            </p>

            {/* Techniques & Industries */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-[#121535] p-3.5 rounded-xl border border-[#212752]">
                <div className="font-bold text-amber-400 mb-1.5 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5" />
                  <span>{isAr ? 'التقنيات والمناهج المعتمدة:' : 'Methods & Techniques Covered:'}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeDiscipline.keyTechniques.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-[#090b1c] text-slate-200 border border-[#232958]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-[#121535] p-3.5 rounded-xl border border-[#212752]">
                <div className="font-bold text-amber-400 mb-1.5 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span>{isAr ? 'الصناعات والقطاعات المستهدفة:' : 'Target Industrial Sectors:'}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeDiscipline.targetIndustries.map((ind, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-[#090b1c] text-slate-200 border border-[#232958]">
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Qualification Level Switcher */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono-code text-slate-400 px-1">
              <span>{isAr ? 'اختر المستوى التأهيلي والشهادة:' : 'QUALIFICATION LEVELS & CERTIFICATIONS:'}</span>
              <span className="text-amber-400 font-bold">
                {activeLevel.nameAr.split('(')[0]}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {activeDiscipline.levels.map((lvl, idx) => {
                const isLvlSelected = safeLevelIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedLevelIdx(idx)}
                    className={`p-3.5 rounded-xl border transition cursor-pointer text-start flex flex-col justify-between ${
                      isLvlSelected
                        ? 'bg-amber-500 text-slate-950 font-black border-amber-400 shadow-lg shadow-amber-500/20'
                        : 'bg-[#10132b] text-slate-300 border-[#232958] hover:bg-[#171c45]'
                    }`}
                  >
                    <div className="text-[10px] font-mono-code uppercase opacity-80 mb-1">
                      {lvl.levelId.toUpperCase()}
                    </div>
                    <div className="text-xs font-bold leading-tight">
                      {isAr ? lvl.nameAr : lvl.nameEn}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Level Full Syllabus & Dossier */}
          {activeLevel && (
            <div className="bg-[#0b0c1c] p-6 rounded-2xl border border-[#232958] shadow-2xl space-y-6">
              {/* Level Title & Summary */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#212752]">
                <div>
                  <span className="text-xs font-mono-code text-amber-400 font-bold">
                    PROFESSIONAL QUALIFICATION SPECIFICATION
                  </span>
                  <h4 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                    {isAr ? activeLevel.nameAr : activeLevel.nameEn}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    {isAr ? activeLevel.targetRoleAr : activeLevel.targetRoleEn}
                  </p>
                </div>

                {/* Stats Chips */}
                <div className="flex items-center gap-3">
                  <div className="text-center p-2 rounded-xl bg-[#131633] border border-[#232958]">
                    <div className="text-[10px] text-slate-400 uppercase font-mono-code">TRAINING</div>
                    <div className="text-sm font-mono-code font-black text-amber-400">{activeLevel.trainingHours} hrs</div>
                  </div>
                  <div className="text-center p-2 rounded-xl bg-[#131633] border border-[#232958]">
                    <div className="text-[10px] text-slate-400 uppercase font-mono-code">EXPERIENCE</div>
                    <div className="text-sm font-mono-code font-black text-sky-400">{activeLevel.experienceMonths} mos</div>
                  </div>
                </div>
              </div>

              {/* Prerequisites & Codes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-[#121638] p-4 rounded-xl border border-[#232958]">
                  <div className="font-bold text-amber-400 mb-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>{isAr ? 'شروط الالتحاق والتأهيل المسبق:' : 'Eligibility & Prerequisites:'}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {isAr ? activeLevel.prerequisitesAr : activeLevel.prerequisitesEn}
                  </p>
                </div>

                <div className="bg-[#121638] p-4 rounded-xl border border-[#232958]">
                  <div className="font-bold text-sky-400 mb-1 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-sky-400" />
                    <span>{isAr ? 'الأكواد والمواصفات الحاكمة للمستوى:' : 'Governing Standards & Codes:'}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {activeLevel.applicableCodes.map((code, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-[#0b0c1c] text-sky-200 border border-sky-500/30 font-mono-code text-[11px]">
                        {code}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Responsibilities List */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  {isAr ? 'المهام والصلاحيات الهندسية المعتمدة لهذا المستوى:' : 'Authorized Engineering Scope & Duties:'}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(isAr ? activeLevel.responsibilitiesAr : activeLevel.responsibilitiesEn).map((resp, i) => (
                    <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-[#10132b] border border-[#1f2550] text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curriculum Modules Syllabus */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-wider">
                  <span>{isAr ? 'المقررات الدراسية والمنهج الأكاديمي التفصيلي:' : 'Detailed Learning Modules & Syllabus:'}</span>
                  <span className="text-amber-400 font-mono-code">{activeLevel.modules.length} Modules</span>
                </div>

                <div className="space-y-3">
                  {activeLevel.modules.map((mod) => {
                    const isExpanded = expandedModuleId === mod.id;
                    return (
                      <div key={mod.id} className="rounded-xl border border-[#232958] bg-[#121535] overflow-hidden">
                        <button
                          onClick={() => toggleModule(mod.id)}
                          className="w-full text-start p-4 flex items-center justify-between gap-3 cursor-pointer hover:bg-[#181d45] transition"
                        >
                          <div>
                            <div className="font-bold text-sm text-white">
                              {isAr ? mod.titleAr : mod.titleEn}
                            </div>
                            <div className="text-xs text-amber-400 font-mono-code mt-0.5">
                              {mod.duration}
                            </div>
                          </div>
                          {isExpanded ? (
                            <ChevronDown className="w-5 h-5 text-amber-400 shrink-0" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="p-4 bg-[#0a0c20] border-t border-[#1f2550] space-y-3 text-xs">
                            <div>
                              <div className="font-bold text-slate-400 mb-1.5 uppercase font-mono-code">
                                {isAr ? 'مواضيع المحاضرات والدروس:' : 'Lecture Topics:'}
                              </div>
                              <ul className="space-y-1 text-slate-300 list-disc list-inside">
                                {(isAr ? mod.topicsAr : mod.topicsEn).map((t, idx) => (
                                  <li key={idx} className="leading-relaxed">{t}</li>
                                ))}
                              </ul>
                            </div>

                            <div className="pt-2 border-t border-[#1b1f45]">
                              <div className="font-bold text-emerald-400 mb-1 font-mono-code">
                                {isAr ? 'مخرجات التعلم المستهدفة:' : 'Target Learning Outcomes:'}
                              </div>
                              <div className="space-y-1 text-slate-300">
                                {(isAr ? mod.learningOutcomesAr : mod.learningOutcomesEn).map((out, idx) => (
                                  <div key={idx} className="flex items-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                    <span>{out}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Key Formulas Section if available */}
              {activeLevel.keyFormulas && activeLevel.keyFormulas.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    {isAr ? 'المعادلات والقوانين الفيزيائية والهندسية الأساسية:' : 'Core Physics & Engineering Formulas:'}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeLevel.keyFormulas.map((f, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-[#090b1e] border border-[#212752] space-y-2">
                        <div className="text-xs font-bold text-amber-400">{isAr ? f.nameAr : f.nameEn}</div>
                        <div className="p-2.5 rounded-lg bg-black/60 border border-amber-500/30 text-center font-mono-code text-base text-amber-300 font-black tracking-wider">
                          {f.formula}
                        </div>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          {isAr ? f.descriptionAr : f.descriptionEn}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Practical Hands-on Skills Checklist */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  {isAr ? 'قائمة المهارات المعملية والميدانية الإلزامية لاجتياز المستوى:' : 'Mandatory Practical Laboratory Skills Checklist:'}
                </div>

                <div className="space-y-2">
                  {activeLevel.practicalSkillsChecklist.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-[#121635] border border-[#212752] text-xs">
                      <div className="flex items-center gap-2 text-slate-200">
                        <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-mono-code font-bold text-[10px]">
                          {idx + 1}
                        </span>
                        <span>{isAr ? item.skillAr : item.skillEn}</span>
                      </div>
                      <span className="text-[10px] font-mono-code font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                        {item.importance}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
