import React, { useState } from 'react';
import { Language } from '../../../types';
import { UtFlawDetectorDevice } from './UtFlawDetectorDevice';
import { PautOmniScanDevice } from './PautOmniScanDevice';
import { ComprehensiveWeldUtSimulator } from './ComprehensiveWeldUtSimulator';
import { 
  Activity, 
  Cpu, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Sliders, 
  Sparkles,
  HelpCircle,
  FileCheck,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Compass
} from 'lucide-react';

interface NdtVirtualLabWorkbenchProps {
  language: Language;
}

export const NdtVirtualLabWorkbench: React.FC<NdtVirtualLabWorkbenchProps> = ({ language }) => {
  const isAr = language === 'ar';
  const ArrowIcon = isAr ? ChevronLeft : ChevronRight;

  const [activeLabMode, setActiveLabMode] = useState<'weld_ray_tracing' | 'ut_conventional' | 'paut_phased_array'>('weld_ray_tracing');
  const [activeTheoryTab, setActiveTheoryTab] = useState<'acoustics' | 'calibration' | 'acceptance'>('acoustics');
  const [completedMissions, setCompletedMissions] = useState<string[]>([]);

  const missions = [
    {
      id: 'm1',
      title: { ar: 'معايرة سرعة الصوت في الفولاذ (5920 m/s)', en: 'Calibrate Velocity in Carbon Steel (5920 m/s)' },
      mode: 'ut_conventional',
      desc: { ar: 'اضبط سرعة الصوت والنطاق لمطابقة صدى القوس 100 مم على كتلة IIW V1.', en: 'Set velocity to 5920 m/s and verify the 100 mm arc echo.' }
    },
    {
      id: 'm2',
      title: { ar: 'ضبط حساسية الكسب المرجعية (80% FSH)', en: 'Set Reference Sensitivity to 80% FSH' },
      mode: 'ut_conventional',
      desc: { ar: 'عدّل الكسب (Gain) ليصل صدى المعايرة إلى خط الـ 80% المرجعي.', en: 'Adjust receiver gain until calibration echo reaches the 80% reference graticule line.' }
    },
    {
      id: 'm3',
      title: { ar: 'تحديد موقع شرخ الجذر بزاوية 60° (Root Crack)', en: 'Locate Root Crack with 60° Shear Probe' },
      mode: 'ut_conventional',
      desc: { ar: 'حرك المجس على وصلة اللحام لحساب عمق ومسافة الشرخ بالتثليث.', en: 'Scan butt weld to measure sound path, depth, and surface distance.' }
    },
    {
      id: 'm4',
      title: { ar: 'المسح القطاعي S-Scan وتحديد ارتفاع العيب بالمصفوفات', en: 'PAUT S-Scan Sweep & Flaw Sizing' },
      mode: 'paut_phased_array',
      desc: { ar: 'استخدم مؤشر الزاوية ومسطرة القياس لتحديد ارتفاع عيب نقص الانصهار بدقة.', en: 'Use angular cursor and calipers on S-Scan to measure flaw height Δh.' }
    }
  ];

  const handleToggleMission = (mId: string) => {
    setCompletedMissions(prev => 
      prev.includes(mId) ? prev.filter(id => id !== mId) : [...prev, mId]
    );
  };

  return (
    <div className="space-y-8">
      {/* Top Banner & Mode Switcher */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>{isAr ? 'منصة المحاكاة التفاعلية المعتمدة للتدريب الهندسي' : 'Accredited NDT Simulation & Hands-On Virtual Workbench'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              {isAr ? 'المختبر الافتراضي لأجهزة الموجات فوق الصوتية والمصفوفات الطورية' : 'Virtual Ultrasonic (UT) & Phased Array (PAUT) Inspection Lab'}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              {isAr
                ? 'محاكاة برمجية حقيقية 100% لأجهزة الفحص بالموجات فوق الصوتية الرقمية ومصفوفات الطور المتطورة. يمكنك التفاعل الكامل مع مفاتيح الكسب والنطاق والبوابات وكتل المعايرة، أو الانتقال لمسح اللحامات وتحديد أبعاد العيوب بالمصفوفات الطورية طبقاً لـ ASME و ISO.'
                : 'Full-featured physical simulations of digital flaw detectors and multi-channel phased array equipment. Adjust gain, velocity, range, gates, and blocks, or analyze sectorial sweeps with ASME flaw sizing.'}
            </p>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setActiveLabMode('weld_ray_tracing')}
              className={`px-4 py-3 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer flex items-center gap-2 border ${
                activeLabMode === 'weld_ray_tracing'
                  ? 'bg-cyan-600 text-white border-cyan-400 shadow-lg shadow-cyan-950/50'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>{isAr ? 'محاكي اللحام وتتبع الأشعة (Ray Tracing & ASME)' : 'Weld Ray Tracing & Codes'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveLabMode('ut_conventional')}
              className={`px-4 py-3 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer flex items-center gap-2 border ${
                activeLabMode === 'ut_conventional'
                  ? 'bg-cyan-600 text-white border-cyan-400 shadow-lg shadow-cyan-950/50'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>{isAr ? 'جهاز UT الرقمي (USM 35X)' : 'Conventional UT (A-Scan)'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveLabMode('paut_phased_array')}
              className={`px-4 py-3 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer flex items-center gap-2 border ${
                activeLabMode === 'paut_phased_array'
                  ? 'bg-amber-600 text-white border-amber-400 shadow-lg shadow-amber-950/50'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>{isAr ? 'جهاز PAUT المصفوفات (OmniScan)' : 'Phased Array PAUT (S-Scan)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Guided Training Missions Bar */}
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Award className="w-4 h-4 text-cyan-400" />
            <span>{isAr ? 'مهام التدريب العملي الموجه (Practical Training Missions):' : 'Guided Hands-on Training Missions:'}</span>
          </div>
          <span className="text-xs font-mono text-cyan-400">
            {completedMissions.length} / {missions.length} {isAr ? 'مكتمل' : 'Completed'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {missions.map((m) => {
            const isDone = completedMissions.includes(m.id);
            return (
              <div
                key={m.id}
                onClick={() => handleToggleMission(m.id)}
                className={`p-3 rounded-lg border transition cursor-pointer flex items-start gap-2.5 ${
                  isDone
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                    : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className={`p-1 rounded mt-0.5 ${isDone ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-500'}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className={`text-xs font-bold leading-tight ${isDone ? 'text-emerald-300' : 'text-slate-200'}`}>
                    {m.title[language]}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {m.desc[language]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Instrument Viewport */}
      {activeLabMode === 'weld_ray_tracing' ? (
        <ComprehensiveWeldUtSimulator language={language} />
      ) : activeLabMode === 'ut_conventional' ? (
        <UtFlawDetectorDevice language={language} />
      ) : (
        <PautOmniScanDevice language={language} />
      )}

      {/* Acoustic Theory & Engineering Mathematics Cheat-sheet */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base font-bold text-white">
              {isAr ? 'القوانين والمعادلات الصوتية المرجعية (Acoustic Physics & Formulas)' : 'Essential Acoustic Physics & Mathematical References'}
            </h3>
          </div>

          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono">
            <button
              type="button"
              onClick={() => setActiveTheoryTab('acoustics')}
              className={`px-3 py-1 rounded transition cursor-pointer ${
                activeTheoryTab === 'acoustics' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {isAr ? 'فيزياء الصوت' : 'Acoustics'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTheoryTab('calibration')}
              className={`px-3 py-1 rounded transition cursor-pointer ${
                activeTheoryTab === 'calibration' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {isAr ? 'المعايرة' : 'Calibration'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTheoryTab('acceptance')}
              className={`px-3 py-1 rounded transition cursor-pointer ${
                activeTheoryTab === 'acceptance' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {isAr ? 'معايير ASME' : 'ASME Codes'}
            </button>
          </div>
        </div>

        {activeTheoryTab === 'acoustics' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="text-cyan-400 font-bold">1. قانون سنيل للانكسار (Snell’s Law):</div>
              <div className="text-white text-sm font-bold bg-slate-900 p-2 rounded border border-slate-800 text-center">
                sin(θ₁) / c₁ = sin(θ₂) / c₂
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                {isAr
                  ? 'يحدد زاوية انكسار الموجة المستعرضة داخل الفولاذ عند مرورها من حذاء البرسبيكس (Perspex Wedge).'
                  : 'Calculates refracted shear wave angle inside steel from Lucite/Perspex wedge.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="text-amber-400 font-bold">2. منطقة الحقل القريب (Near Field Length):</div>
              <div className="text-white text-sm font-bold bg-slate-900 p-2 rounded border border-slate-800 text-center">
                N = D² / (4 · λ) = (D² · f) / (4 · c)
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                {isAr
                  ? 'المنطقة المضطربة القريبة من وجه المجس التي تشهد تداخلاً موجياً؛ يفضل تقييم العيوب بعدها (الحقل البعيد).'
                  : 'Zone of acoustic pressure oscillations; accurate flaw evaluation occurs in Far Field (d > N).'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="text-emerald-400 font-bold">3. مثلث تحديد موقع العيب (Trig Locating):</div>
              <div className="text-white text-sm font-bold bg-slate-900 p-2 rounded border border-slate-800 text-center">
                Depth = S · cos(θ) | Surface = S · sin(θ)
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                {isAr
                  ? 'حساب العمق الحقيقي للعيب والمسافة الأفقية من نقطة خروج الشعاع الصوتي بالمليمتر.'
                  : 'Direct geometric calculation of vertical depth and surface projection from beam index point.'}
              </p>
            </div>
          </div>
        )}

        {activeTheoryTab === 'calibration' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-cyan-400 font-bold">كتلة المعايرة القياسية IIW V1 (ISO 2400):</div>
              <ul className="space-y-1 text-slate-300 text-[11px] list-disc list-inside">
                <li>نصف القطر 100 مم لمعايرة نقطة خروج الشعاع (Index Point) وسرعة الصوت.</li>
                <li>سماكة 25 مم لمعايرة النطاق للمجسات المستقيمة 0°.</li>
                <li>ثقب جانبي 1.5 مم SDH على عمق 15 مم لضبط الحساسية وقدرة الفصل.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-amber-400 font-bold">كتلة المعايرة المدمجة V2 (ISO 7963):</div>
              <ul className="space-y-1 text-slate-300 text-[11px] list-disc list-inside">
                <li>أقواس دائرية نصف قطرها 25 مم و 50 مم للفحص الميداني السريع.</li>
                <li>ثقب جانبي بقطر 5 مم للتحقق السريع من زوايا المجسات 45°، 60°، 70°.</li>
                <li>وزن خفيف مثالي للاستخدام بمواقع الإنشاءات ومحطات الطاقة.</li>
              </ul>
            </div>
          </div>
        )}

        {activeTheoryTab === 'acceptance' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-cyan-400 font-bold">معايير ASME Section I / B31.1 للفحوصات الحجمية:</div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {isAr
                  ? 'يمنع الكود منعاً باتاً أي مؤشر ذي طبيعة تشققية أو نقص انصهار (Zero Tolerance). المؤشرات الحجمية كالخبث تقاس مقابل منحنى DAC أو عتبة الـ 20% DAC.'
                  : 'All crack-like, lack of fusion, or incomplete penetration indications are rejectable regardless of length. Volumetric inclusions are evaluated against DAC curves.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-amber-400 font-bold">معايير المصفوفات الطورية PAUT (ASME Sec. V App. VIII):</div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {isAr
                  ? 'يتم تحديد أبعاد العيب بارتفاعه (Flaw Height Δh) وطوله (Length ΔL) باستخدام طريقة هبوط الكسب -6dB، مع حفظ سجلات المسح المشفر الرقمي الكامل.'
                  : 'Flaw sizing uses encoded S-scan/C-scan datasets with -6 dB drop method for precise height and length sizing with permanent electronic record.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
