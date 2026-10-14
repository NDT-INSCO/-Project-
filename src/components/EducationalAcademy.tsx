import React, { useState } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  Flame, 
  Activity, 
  Search, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  BrainCircuit, 
  Sliders, 
  Layers, 
  Info, 
  Send,
  Award,
  RefreshCw,
  Film
} from 'lucide-react';
import { Language, EducationalDefect, QuizQuestion } from '../types';
import { NDT_METHODS, EDUCATIONAL_DEFECTS, STANDARDS_LIBRARY, SAMPLE_QUIZZES } from '../data/inscoData';
import { IndustrialVideoGen } from './IndustrialVideoGen';

interface EducationalAcademyProps {
  language: Language;
}

export const EducationalAcademy: React.FC<EducationalAcademyProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [activeSubTab, setActiveSubTab] = useState<'methods' | 'defects' | 'pwht_curve' | 'standards' | 'quiz' | 'ask_ai' | 'video_gen'>('defects');

  // Defect Simulator State
  const [selectedDefect, setSelectedDefect] = useState<EducationalDefect>(EDUCATIONAL_DEFECTS[0]);

  // PWHT Simulator State
  const [steelGrade, setSteelGrade] = useState<'P1' | 'P4_P5' | 'P91'>('P1');
  const [wallThicknessMm, setWallThicknessMm] = useState<number>(25);

  // Quiz State
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(SAMPLE_QUIZZES);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  // AI Tutor State
  const [aiTopic, setAiTopic] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  // PWHT Calculations based on ASME B31.3
  const getPWHTParameters = () => {
    switch (steelGrade) {
      case 'P1': // Carbon Steel
        return {
          name: isAr ? 'فولاذ كربوني (Carbon Steel - P-No. 1)' : 'Carbon Steel (P-No. 1)',
          minSoakTemp: 595,
          maxSoakTemp: 650,
          soakTimeMin: Math.max(60, Math.round((wallThicknessMm / 25) * 60)),
          heatingRate: 200,
          coolingRate: 250,
          color: '#f59e0b',
          codeClause: 'ASME B31.3 Table 331.1.1 P-No. 1'
        };
      case 'P4_P5': // Low Alloy Cr-Mo (P11 / P22)
        return {
          name: isAr ? 'سبائك كروم موليبدينوم (Low Alloy Cr-Mo - P4/P5)' : 'Cr-Mo Alloy Steel (P4/P5)',
          minSoakTemp: 705,
          maxSoakTemp: 760,
          soakTimeMin: Math.max(120, Math.round((wallThicknessMm / 25) * 120)),
          heatingRate: 150,
          coolingRate: 150,
          color: '#ef4444',
          codeClause: 'ASME B31.3 Table 331.1.1 P-No. 4/5A'
        };
      case 'P91': // Creep Resistant 9Cr-1Mo-V
        return {
          name: isAr ? 'سبائك P91 لمحطات التوليد والمراجل الفائقة' : 'Modified 9Cr-1Mo-V (P-No. 15E)',
          minSoakTemp: 750,
          maxSoakTemp: 775,
          soakTimeMin: Math.max(120, Math.round((wallThicknessMm / 25) * 120)),
          heatingRate: 100,
          coolingRate: 100,
          color: '#ec4899',
          codeClause: 'ASME B31.3 / ASME Sec I PW-39 (Strict ±10°C Window)'
        };
    }
  };

  const pwht = getPWHTParameters();

  const handleQuizAnswer = (optionIdx: number) => {
    if (showAnswer) return;
    setSelectedOption(optionIdx);
    setShowAnswer(true);
    if (optionIdx === quizQuestions[currentQuizIndex].correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    setSelectedOption(null);
    setShowAnswer(false);
    if (currentQuizIndex < quizQuestions.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setShowAnswer(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const handleAskAiTutor = async (topicToSend?: string) => {
    const q = (topicToSend || aiTopic).trim();
    if (!q || isAiLoading) return;

    setIsAiLoading(true);
    setAiResponse('');

    try {
      const response = await fetch('/api/ai/educational-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: q,
          queryType: 'explain_method',
          level: 'advanced',
          language
        })
      });

      if (!response.ok) {
        throw new Error('Educational tutor failed');
      }

      const data = await response.json();
      setAiResponse(data.content || '');
    } catch (err) {
      console.error(err);
      setAiResponse(
        isAr
          ? `في تقنيات الفحص غير الإتلافي والمعالجة الحرارية، يتم تطبيق مواصفات ASME Section V و Section IX و AWS D1.1 بدقة لضمان اكتشاف كافة العيوب الداخلية والسطحية مثل الشروخ ونقص التغلغل قبل دخول المعدة للخدمة. تشترط الأكواد تأهيل الكوادر الفاحصة لشهادة ASNT Level II كحد أدنى للتوقيع على تقارير القبول والرفض.`
          : `In NDT and PWHT engineering, ASME Section V and AWS D1.1 enforce strict acceptance criteria for volumetric defects (porosity, slag, lack of fusion) and planar defects (cracks). ASNT Level II certified inspection personnel are required to sign off on compliance reports.`
      );
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#080914] border-b border-[#21264c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-400 font-bold text-xs uppercase tracking-wider mb-3">
            <BookOpen className="w-4 h-4" />
            <span>{isAr ? 'الأكاديمية التعليمية والتطوير الهندسي' : 'INSCO NDT & PWHT ACADEMY'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {isAr ? (
              <>
                المركز التعليمي <span className="text-amber-400">في علوم الفحص والمعالجة الحرارية</span>
              </>
            ) : (
              <>
                Interactive Knowledge Hub for <span className="text-amber-400">NDT & Heat Treatment</span>
              </>
            )}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3">
            {isAr
              ? 'أدوات محاكاة تفاعلية لفحص عيوب اللحام، محاكي منحنيات المعالجة الحرارية PWHT، بنك أسئلة وتأهيل لاختبارات ASNT، ومستشار أكاديمي مدعوم بالذكاء الاصطناعي.'
              : 'Interactive weld defect simulator, PWHT thermal curve calculator, ASNT practice exams, and ASME/API code explorer.'}
          </p>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'defects', labelAr: 'محاكي عيوب اللحام (Defect Simulator)', labelEn: 'Defect Simulator', icon: Activity },
            { id: 'pwht_curve', labelAr: 'محاكي منحنيات PWHT الحرارية', labelEn: 'PWHT Thermal Curve', icon: Flame },
            { id: 'methods', labelAr: 'دليل تقنيات الفحص الـ 12', labelEn: '12 NDT Methods Guide', icon: Layers },
            { id: 'standards', labelAr: 'مكتبة الأكواد (ASME / API / AWS)', labelEn: 'Standards Library', icon: FileText },
            { id: 'quiz', labelAr: 'اختبار المعرفة وتأهيل ASNT', labelEn: 'Knowledge Quiz', icon: HelpCircle },
            { id: 'video_gen', labelAr: 'توليد فيديو المحاكاة (Veo 3)', labelEn: 'Veo Video Generator', icon: Film },
            { id: 'ask_ai', labelAr: 'اسأل المستشار الأكاديمي الذكي', labelEn: 'Ask AI Professor', icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                    : 'bg-[#121535] text-slate-300 hover:text-white hover:bg-[#1a1f48] border border-[#232958]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isCurrent ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>{isAr ? tab.labelAr : tab.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Sub-Tab 1: Defect Diagnostic Simulator */}
        {activeSubTab === 'defects' && (
          <div className="bg-[#10132b] p-6 sm:p-8 rounded-2xl border-2 border-amber-500/40 shadow-2xl">
            <div className="max-w-2xl mb-6">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {isAr ? 'محاكي تشخيص عيوب اللحام وقواعد القبول' : 'Weld Discontinuity & Defect Simulator'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {isAr
                  ? 'اختر نوع العيب الشائع لاكتشاف سببه الفيزيائي، وأنسب طرق NDT لاكتشافه، ومعيار قبوله أو رفضه طبقاً لـ ASME B31.3 و AWS D1.1.'
                  : 'Select a common weld defect to examine its root metallurgical cause, optimal NDT detection techniques, and ASME acceptance limits.'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Defect Selector Pills */}
              <div className="lg:col-span-4 space-y-2.5">
                {EDUCATIONAL_DEFECTS.map((defect) => {
                  const isSelected = selectedDefect.id === defect.id;
                  return (
                    <button
                      key={defect.id}
                      onClick={() => setSelectedDefect(defect)}
                      className={`w-full text-start p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-[#1d224e] border-amber-400 text-white shadow-md'
                          : 'bg-[#0b0c1c] border-[#202652] text-slate-300 hover:bg-[#141738]'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-xs sm:text-sm">
                          {isAr ? defect.name.ar : defect.name.en}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                          {isAr ? defect.nature.ar : defect.nature.en}
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-mono-code px-2 py-0.5 rounded font-bold ${
                          defect.severity === 'Critical'
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {defect.severity}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Defect Detailed Analysis Board */}
              <div className="lg:col-span-8 bg-[#0b0c1c] p-6 rounded-2xl border border-[#232958] space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1f2550]">
                  <div>
                    <span className="text-[10px] font-mono-code text-amber-400 font-bold uppercase tracking-wider">
                      METALLURGICAL DEFECT DOSSIER
                    </span>
                    <h4 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                      {isAr ? selectedDefect.name.ar : selectedDefect.name.en}
                    </h4>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold font-mono-code ${
                      selectedDefect.severity === 'Critical'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    {isAr ? `درجة الخطورة: ${selectedDefect.severity}` : `Severity: ${selectedDefect.severity}`}
                  </span>
                </div>

                {/* Nature & Physical Root Cause */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="bg-[#131633] p-4 rounded-xl border border-[#212752]">
                    <div className="font-bold text-amber-400 mb-1">{isAr ? 'طبيعة العيب في اللحام:' : 'Nature of Discontinuity:'}</div>
                    <p className="text-slate-300 leading-relaxed">
                      {isAr ? selectedDefect.nature.ar : selectedDefect.nature.en}
                    </p>
                  </div>

                  <div className="bg-[#131633] p-4 rounded-xl border border-[#212752]">
                    <div className="font-bold text-amber-400 mb-1">{isAr ? 'السبب الرئيسي أثناء اللحام:' : 'Root Cause in Welding:'}</div>
                    <p className="text-slate-300 leading-relaxed">
                      {isAr ? selectedDefect.cause.ar : selectedDefect.cause.en}
                    </p>
                  </div>
                </div>

                {/* Best Detection NDT Methods */}
                <div>
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    {isAr ? 'أفضل طرق الفحص غير الإتلافي لاكتشافه بدقة:' : 'Recommended NDT Methods for Detection:'}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedDefect.bestDetectionMethods.map((m, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#181d45] text-sky-300 border border-sky-500/30"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Code Acceptance Criteria */}
                <div className="bg-[#15122b] p-4 rounded-xl border border-amber-500/40">
                  <div className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>{isAr ? 'معيار القبول والرفض بالكود الدولي:' : 'Code Acceptance Criteria:'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 font-mono-code leading-relaxed">
                    {selectedDefect.acceptanceCriteriaCode}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sub-Tab 2: PWHT Thermal Curve Generator */}
        {activeSubTab === 'pwht_curve' && (
          <div className="bg-[#10132b] p-6 sm:p-8 rounded-2xl border-2 border-amber-500/40 shadow-2xl space-y-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono-code font-bold text-amber-400 mb-1">
                <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>THERMAL CYCLE SIMULATION PER ASME B31.3 & AWS D1.1</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {isAr ? 'محاكي منحنى المعالجة الحرارية بعد اللحام (PWHT Curve)' : 'PWHT Thermal Curve Interactive Simulator'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {isAr
                  ? 'اختر سبيكة المعدن وسمك الجدار لحساب أقصى معدل تسخين، ودرجة حرارة النقع (Soak Temp)، وزمن الثبات، ومعدل التبريد المحكوم كما يطبقه أسطول وحدات إنسكو الأوتوماتيكية.'
                  : 'Select material grade and wall thickness to calculate code-compliant heating rate, soak duration, and cooling cycle.'}
              </p>
            </div>

            {/* Interactive Sliders & Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#0b0c1c] p-5 rounded-xl border border-[#212752]">
              <div>
                <label className="block text-slate-300 text-xs font-bold mb-2">
                  {isAr ? 'نوع السبيكة والمجموعة (P-Number):' : 'Steel Material Grade:'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'P1', label: 'Carbon Steel (P1)' },
                    { id: 'P4_P5', label: 'Cr-Mo (P4/P5)' },
                    { id: 'P91', label: 'Creep P91 (15E)' },
                  ].map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setSteelGrade(g.id as any)}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition text-center cursor-pointer ${
                        steelGrade === g.id
                          ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-md'
                          : 'bg-[#15193d] text-slate-300 border-[#252c61]'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-slate-300 text-xs font-bold">
                    {isAr ? 'سماكة الجدار (Wall Thickness):' : 'Wall Thickness (mm):'}
                  </label>
                  <span className="text-amber-400 font-mono-code font-bold text-sm">
                    {wallThicknessMm} mm ({Math.round(wallThicknessMm / 25.4 * 10) / 10}")
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="120"
                  step="5"
                  value={wallThicknessMm}
                  onChange={(e) => setWallThicknessMm(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono-code">
                  <span>10 mm (Min)</span>
                  <span>50 mm</span>
                  <span>120 mm (Heavy Wall)</span>
                </div>
              </div>
            </div>

            {/* Calculated Values Dashboard */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-[#131635] p-4 rounded-xl border border-[#232958]">
                <div className="text-[11px] text-slate-400">{isAr ? 'حرارة النقع الموصى بها' : 'Soak Temperature'}</div>
                <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono-code mt-1">
                  {pwht.minSoakTemp}°C - {pwht.maxSoakTemp}°C
                </div>
                <div className="text-[10px] text-slate-400 mt-1">{pwht.codeClause}</div>
              </div>

              <div className="bg-[#131635] p-4 rounded-xl border border-[#232958]">
                <div className="text-[11px] text-slate-400">{isAr ? 'زمن النقع المحسوب' : 'Soak Duration'}</div>
                <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono-code mt-1">
                  {pwht.soakTimeMin} {isAr ? 'دقيقة' : 'mins'} ({Math.round(pwht.soakTimeMin / 60 * 10) / 10}h)
                </div>
                <div className="text-[10px] text-slate-400 mt-1">1 hr per 25mm thickness</div>
              </div>

              <div className="bg-[#131635] p-4 rounded-xl border border-[#232958]">
                <div className="text-[11px] text-slate-400">{isAr ? 'أقصى معدل تسخين' : 'Max Heating Rate'}</div>
                <div className="text-xl sm:text-2xl font-black text-sky-400 font-mono-code mt-1">
                  ≤ {pwht.heatingRate}°C / hr
                </div>
                <div className="text-[10px] text-slate-400 mt-1">Above 300°C</div>
              </div>

              <div className="bg-[#131635] p-4 rounded-xl border border-[#232958]">
                <div className="text-[11px] text-slate-400">{isAr ? 'أقصى معدل تبريد' : 'Max Cooling Rate'}</div>
                <div className="text-xl sm:text-2xl font-black text-indigo-400 font-mono-code mt-1">
                  ≤ {pwht.coolingRate}°C / hr
                </div>
                <div className="text-[10px] text-slate-400 mt-1">Controlled down to 300°C</div>
              </div>
            </div>

            {/* Interactive SVG Heating Curve Diagram */}
            <div className="bg-[#0b0c1c] p-6 rounded-2xl border border-[#242b5c]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-400" />
                  <span>{isAr ? 'المخطط الحراري الزمني المتزامن (Temperature vs Time Chart)' : 'Code Thermal Chart Visualization'}</span>
                </span>
                <span className="text-[11px] font-mono-code text-slate-400">
                  {isAr ? 'تسجيل دقيق بست قنوات مبرمجة' : 'INSCO 6-Channel Automated Recording'}
                </span>
              </div>

              {/* Chart SVG */}
              <div className="w-full h-64 relative bg-[#060814] rounded-xl border border-[#1b2046] p-4 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 600 220" fill="none">
                  {/* Grid Lines */}
                  <line x1="50" y1="20" x2="570" y2="20" stroke="#1c2146" strokeDasharray="3 3" />
                  <line x1="50" y1="70" x2="570" y2="70" stroke="#1c2146" strokeDasharray="3 3" />
                  <line x1="50" y1="120" x2="570" y2="120" stroke="#1c2146" strokeDasharray="3 3" />
                  <line x1="50" y1="170" x2="570" y2="170" stroke="#1c2146" strokeDasharray="3 3" />

                  {/* Axis */}
                  <line x1="50" y1="190" x2="570" y2="190" stroke="#475569" strokeWidth="1.5" />
                  <line x1="50" y1="10" x2="50" y2="190" stroke="#475569" strokeWidth="1.5" />

                  {/* Temperature Labels */}
                  <text x="15" y="25" fill="#94a3b8" fontSize="10" fontFamily="monospace">800°C</text>
                  <text x="15" y="75" fill="#94a3b8" fontSize="10" fontFamily="monospace">600°C</text>
                  <text x="15" y="125" fill="#94a3b8" fontSize="10" fontFamily="monospace">400°C</text>
                  <text x="15" y="175" fill="#94a3b8" fontSize="10" fontFamily="monospace">200°C</text>
                  <text x="50" y="208" fill="#94a3b8" fontSize="10" fontFamily="monospace">0h</text>
                  <text x="200" y="208" fill="#94a3b8" fontSize="10" fontFamily="monospace">Heating</text>
                  <text x="340" y="208" fill="#94a3b8" fontSize="10" fontFamily="monospace">Soaking ({pwht.soakTimeMin}m)</text>
                  <text x="480" y="208" fill="#94a3b8" fontSize="10" fontFamily="monospace">Cooling</text>

                  {/* PWHT Curve Plot */}
                  <path
                    d={`M 50 180 L 220 50 L 380 50 L 530 180`}
                    stroke={pwht.color}
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Soak highlight area */}
                  <rect x="220" y="45" width="160" height="10" fill={pwht.color} opacity="0.3" rx="3" />
                  <circle cx="220" cy="50" r="5" fill="#fff" />
                  <circle cx="380" cy="50" r="5" fill="#fff" />

                  <text x="250" y="38" fill={pwht.color} fontSize="12" fontWeight="bold">
                    Soak: {pwht.minSoakTemp}°C - {pwht.maxSoakTemp}°C
                  </text>
                </svg>
              </div>

              <div className="mt-3 text-xs text-slate-400 flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>
                  {isAr
                    ? 'توفر إنسكو أسطولاً واسعاً ومتطوراً من وحدات المعالجة الحرارية 65 kW قادرة على التحكم الدقيق في منحنيات التسخين والتبريد لتجنب أي صدمة حرارية (Thermal Shock) أو تشوهات في الهيكل.'
                    : 'INSCO\'s extensive fleet of automatic 65 kW units executes precise digital ramp-soak programming with thermocouple feedback on every joint.'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Sub-Tab 3: 12 NDT Methods Guide */}
        {activeSubTab === 'methods' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {NDT_METHODS.map((method) => (
                <div
                  key={method.id}
                  className="bg-[#10132b] p-5 rounded-2xl border border-[#232958] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-300 font-mono-code font-black text-sm flex items-center justify-center border border-amber-500/30">
                      {method.code}
                    </span>
                    <span className="text-[10px] font-mono-code text-slate-400 px-2 py-0.5 rounded bg-[#0b0c1c]">
                      {method.category}
                    </span>
                  </div>

                  <h4 className="font-bold text-white text-base">
                    {isAr ? method.name.ar : method.name.en}
                  </h4>
                  <div className="text-[11px] font-mono-code text-amber-400">
                    {method.standards}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isAr ? method.description.ar : method.description.en}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sub-Tab 4: Standards Library */}
        {activeSubTab === 'standards' && (
          <div className="bg-[#10132b] p-6 sm:p-8 rounded-2xl border border-[#232958] space-y-6">
            <div className="max-w-2xl">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {isAr ? 'مكتبة المواصفات والأكواد الهندسية المعتمدة' : 'International Codes & Standards Directory'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {isAr
                  ? 'جميع إجراءات التفتيش والاختبار بشركة إنسكو محررة وفقاً لأحدث إصدارات هذه الأكواد العالمية.'
                  : 'All INSCO method procedures and acceptance criteria are issued per these international standards.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {STANDARDS_LIBRARY.map((std, i) => (
                <div key={i} className="bg-[#0b0d1e] p-4 rounded-xl border border-[#202652] space-y-2">
                  <div className="text-xs font-mono-code font-bold text-amber-400">
                    {std.code}
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    {isAr ? std.titleAr : std.titleEn}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {std.scope}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sub-Tab 5: Interactive Quiz & Certification Exam */}
        {activeSubTab === 'quiz' && (
          <div className="max-w-3xl mx-auto bg-[#10132b] p-6 sm:p-8 rounded-2xl border-2 border-amber-500/40 shadow-2xl">
            {!quizCompleted ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#212752]">
                  <span className="text-xs font-bold text-amber-400 uppercase font-mono-code">
                    {isAr ? `السؤال ${currentQuizIndex + 1} من ${quizQuestions.length}` : `Question ${currentQuizIndex + 1} of ${quizQuestions.length}`}
                  </span>
                  <span className="text-xs font-mono-code text-slate-400">
                    {isAr ? `النتيجة الحالية: ${score}` : `Current Score: ${score}`}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                  {isAr ? quizQuestions[currentQuizIndex].question.ar : quizQuestions[currentQuizIndex].question.en}
                </h3>

                <div className="space-y-2.5">
                  {(isAr ? quizQuestions[currentQuizIndex].options.ar : quizQuestions[currentQuizIndex].options.en).map((opt, optIdx) => {
                    const isSelected = selectedOption === optIdx;
                    const isCorrect = optIdx === quizQuestions[currentQuizIndex].correctIndex;
                    let btnStyle = 'bg-[#141838] hover:bg-[#1a2048] border-[#252c61] text-slate-200';

                    if (showAnswer) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-600/30 border-emerald-400 text-emerald-200 font-bold';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-600/30 border-rose-400 text-rose-200';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={showAnswer}
                        onClick={() => handleQuizAnswer(optIdx)}
                        className={`w-full text-start p-3.5 rounded-xl border text-xs sm:text-sm transition flex items-center justify-between cursor-pointer ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {showAnswer && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                        {showAnswer && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {showAnswer && (
                  <div className="bg-[#0b0d1e] p-4 rounded-xl border border-amber-500/30 space-y-2 animate-fadeIn">
                    <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                      <Info className="w-4 h-4" />
                      <span>{isAr ? 'التفسير الهندسي من مهندسي إنسكو:' : 'Engineering Explanation:'}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {isAr ? quizQuestions[currentQuizIndex].explanation.ar : quizQuestions[currentQuizIndex].explanation.en}
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={handleNextQuiz}
                        className="py-2 px-5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer"
                      >
                        {currentQuizIndex < quizQuestions.length - 1
                          ? (isAr ? 'السؤال التالي' : 'Next Question')
                          : (isAr ? 'عرض النتيجة النهائية' : 'View Final Score')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border-2 border-amber-400">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-white">
                  {isAr ? 'اكتمل الاختبار الهندسي بنجاح!' : 'Quiz Completed!'}
                </h3>
                <p className="text-slate-300 text-sm">
                  {isAr
                    ? `لقد حصلت على ${score} من إجمالي ${quizQuestions.length} أسئلة.`
                    : `You scored ${score} out of ${quizQuestions.length} questions.`}
                </p>
                <button
                  onClick={resetQuiz}
                  className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm cursor-pointer inline-flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>{isAr ? 'إعادة الاختبار' : 'Retry Quiz'}</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Sub-Tab 6: Ask AI Professor */}
        {activeSubTab === 'ask_ai' && (
          <div className="max-w-4xl mx-auto bg-[#10132b] p-6 sm:p-8 rounded-2xl border-2 border-amber-500/40 shadow-2xl space-y-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono-code font-bold text-amber-400 mb-1">
                <BrainCircuit className="w-4 h-4" />
                <span>AI NDT LEVEL III CONSULTANT</span>
              </div>
              <h3 className="text-2xl font-black text-white">
                {isAr ? 'اسأل أستاذ NDT والمعالجة الحرارية الذكي' : 'Ask the Senior NDT & Metallurgy Tutor'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {isAr
                  ? 'اكتب أي موضوع أو معضلة هندسية تخص اللحام أو الفحص أو الكود لتحصل على شرح علمي عميق.'
                  : 'Ask any technical concept regarding metallurgy, flaw characterization, or code rules.'}
              </p>
            </div>

            {/* Quick Question Pills */}
            <div className="flex flex-wrap gap-2">
              {[
                'كيف نميز بين عيب Lack of Fusion وعيب Porosity في قراءة Phased Array؟',
                'ما هي متطلبات شهادة ASNT Level II والتدريب المطلوب لكل طريقة؟',
                'ما هو تأثير الهيدروجين في الشروخ الباردة وما دور التسخين المسبق Preheat؟',
                'ما الفرق بين اختبار الصلادة بطريقة Leeb وطريقة UCI بالموقع؟'
              ].map((pill, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setAiTopic(pill);
                    handleAskAiTutor(pill);
                  }}
                  className="text-xs text-slate-300 hover:text-amber-300 bg-[#0c0e20] hover:bg-[#161a3d] px-3 py-1.5 rounded-lg border border-[#212754] transition cursor-pointer"
                >
                  {pill}
                </button>
              ))}
            </div>

            {/* Input Box */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={aiTopic}
                onChange={(e) => setAiTopic(e.target.value)}
                placeholder={isAr ? 'اكتب موضوع الاستفسار التعليمي...' : 'Enter your question for the tutor...'}
                className="flex-1 bg-[#0b0c1c] border border-[#272e63] rounded-xl px-4 py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
              />
              <button
                onClick={() => handleAskAiTutor()}
                disabled={!aiTopic.trim() || isAiLoading}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isAr ? 'شرح الموضوع' : 'Explain'}</span>
              </button>
            </div>

            {/* Tutor Response Box */}
            {(isAiLoading || aiResponse) && (
              <div className="bg-[#0b0c1c] p-6 rounded-xl border border-amber-500/30 text-xs sm:text-sm leading-relaxed text-slate-200 whitespace-pre-line animate-fadeIn">
                {isAiLoading ? (
                  <div className="flex items-center gap-3 text-amber-400">
                    <Sparkles className="w-5 h-5 animate-spin" />
                    <span>{isAr ? 'جاري تحضير الشرح الهندسي التخصصي...' : 'Preparing in-depth metallurgical analysis...'}</span>
                  </div>
                ) : (
                  aiResponse
                )}
              </div>
            )}
          </div>
        )}

        {/* Sub-Tab 7: Veo Video Generator */}
        {activeSubTab === 'video_gen' && (
          <IndustrialVideoGen language={language} />
        )}
      </div>
    </section>
  );
};
