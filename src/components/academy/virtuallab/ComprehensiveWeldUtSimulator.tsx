import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../../../types';
import {
  Activity,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Compass,
  Cpu,
  Crosshair,
  FileCheck,
  FileText,
  Flame,
  HelpCircle,
  Info,
  Layers,
  Pause,
  Play,
  Printer,
  Radio,
  RefreshCw,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Sparkles,
  Volume2,
  VolumeX,
  XCircle,
} from 'lucide-react';

interface ComprehensiveWeldUtSimulatorProps {
  language: Language;
}

// ---------------------------------------------------------------------------
// Standard Code Definitions & Defect Types
// ---------------------------------------------------------------------------
export type InspectionCode = 'asme_viii' | 'asme_b31_3' | 'aws_d1_1' | 'api_1104' | 'iso_11666';

export type WeldFlawType =
  | 'root_crack'
  | 'lack_of_fusion'
  | 'slag_inclusion'
  | 'porosity_cluster'
  | 'toe_undercut'
  | 'incomplete_penetration';

interface DefectSpecification {
  id: WeldFlawType;
  name: { ar: string; en: string };
  category: 'Planar' | 'Volumetric';
  nominalDepthMm: number; // depth below top plate surface (mm)
  distanceFromWeldCenterMm: number; // offset X from centerline (mm)
  lengthMm: number; // actual length along weld seam (mm)
  heightMm: number; // flaw height delta-h (mm)
  reflectivityFactor: number; // 0 to 1
  optimalAngleDeg: number;
  description: { ar: string; en: string };
  nature: { ar: string; en: string };
  rejectionReason: { ar: string; en: string };
}

const WELD_FLAWS: DefectSpecification[] = [
  {
    id: 'root_crack',
    name: { ar: 'شرخ في جذر اللحام (Root Crack)', en: 'Root Crack (Planar)' },
    category: 'Planar',
    nominalDepthMm: 24.5, // near root of 25mm plate
    distanceFromWeldCenterMm: 0.5,
    lengthMm: 14,
    heightMm: 3.5,
    reflectivityFactor: 0.95,
    optimalAngleDeg: 60,
    description: {
      ar: 'شرخ طولي حاد وخطير يمتد من جذر اللحام، ينشأ بسبب إجهادات الانكماش المتبقية أو الهيدروجين الحبيسي.',
      en: 'Sharp planar longitudinal crack propagating from weld root due to thermal shrinkage stresses and hydrogen embrittlement.',
    },
    nature: {
      ar: 'عيب مستوي (Planar) حاد الحواف يركز الإجهادات، ولا يسمح به بأي طول طبقاً لكافة الأكواد.',
      en: 'Sharp planar stress-concentrating defect. Strictly rejectable at any measurable length across all standards.',
    },
    rejectionReason: {
      ar: 'مرفوض قطعياً طبقاً لكود ASME Sec VIII Div 1 (UW-51) و AWS D1.1 لأن الشروخ عيوب مستوية تؤدي لانهيار هيكلي مفاجئ.',
      en: 'Strictly UNACCEPTABLE per ASME Sec VIII Div 1 (UW-51) & AWS D1.1. Cracks are zero-tolerance planar hazards.',
    },
  },
  {
    id: 'lack_of_fusion',
    name: { ar: 'نقص انصهار جانبي (Lack of Side-Wall Fusion)', en: 'Lack of Sidewall Fusion (LOF)' },
    category: 'Planar',
    nominalDepthMm: 15.0, // along 30° bevel sidewall
    distanceFromWeldCenterMm: 5.5,
    lengthMm: 18,
    heightMm: 2.8,
    reflectivityFactor: 0.90,
    optimalAngleDeg: 60, // 60° probe normal to 30° bevel!
    description: {
      ar: 'عدم حدوث التحام ميتالورجي بين معدن اللحام وجدار الشطف المعدني الأساسي بسبب عدم كفاية الحرارة المدخلة.',
      en: 'Lack of metallurgical coalescent bonding between weld metal and joint sidewall due to insufficient heat input.',
    },
    nature: {
      ar: 'عيب مستوي مائل بمحاذاة الشطف (30°)، يعطي صدى قوياً جداً عند سقوط الشعاع بزاوية 60° (عمودية على الشطف).',
      en: 'Planar discontinuity oriented at 30° along bevel. Produces maximum specular reflection with a 60° shear wave probe.',
    },
    rejectionReason: {
      ar: 'مرفوض طبقاً لـ ASME و AWS و API 1104 لأن نقص الانصهار عيب مستوي غير مقبول.',
      en: 'Strictly UNACCEPTABLE per ASME Section VIII, AWS D1.1, and API 1104 without length tolerance.',
    },
  },
  {
    id: 'incomplete_penetration',
    name: { ar: 'نقص تغلغل في الجذر (Lack of Penetration)', en: 'Incomplete Penetration (LOP)' },
    category: 'Planar',
    nominalDepthMm: 25.0,
    distanceFromWeldCenterMm: 0.0,
    lengthMm: 22,
    heightMm: 2.2,
    reflectivityFactor: 0.88,
    optimalAngleDeg: 60,
    description: {
      ar: 'فشل معدن اللحام في الانصهار والوصول إلى عمق الجذر الكامل تاركاً فجوة خطية غير ملحومة.',
      en: 'Failure of weld metal to penetrate and fuse through the full thickness of the joint root land.',
    },
    nature: {
      ar: 'عيب ممتد في قاع الوصلة يشكل عاكساً زاويّاً (Corner Reflector) ممتازاً لموجات الصوت.',
      en: 'Root defect acting as an acoustic corner reflector, producing strong specular echoes in both 1st and 2nd legs.',
    },
    rejectionReason: {
      ar: 'مرفوض في ASME Sec VIII Div 1، ويخضع لقيود صارمة جداً (أقل من 25 مم لكل 300 مم) في API 1104.',
      en: 'Unacceptable under ASME Sec VIII; strictly limited (< 25mm aggregate in 300mm weld) in API 1104 pipelines.',
    },
  },
  {
    id: 'slag_inclusion',
    name: { ar: 'خبث محبوس بين الطبقات (Slag Inclusion)', en: 'Elongated Slag Inclusion' },
    category: 'Volumetric',
    nominalDepthMm: 11.0,
    distanceFromWeldCenterMm: 3.2,
    lengthMm: 8.5,
    heightMm: 1.6,
    reflectivityFactor: 0.62,
    optimalAngleDeg: 45,
    description: {
      ar: 'أكاسيد غير معدنية ومتبقيات بودرة اللحام (Flux) محبوسة بين باصات اللحام المتعاقبة.',
      en: 'Non-metallic solid entrapped oxides or flux residue trapped between successive weld passes.',
    },
    nature: {
      ar: 'عيب حجمي (Volumetric) غير مستوي وذو أوجه متعددة خشنة، يشتت الصوت مما يعطي صدى متعدد القمم وأقل ارتفاعاً.',
      en: 'Volumetric discontinuity with rough multi-faceted surfaces causing diffuse scattering and lower echo amplitude.',
    },
    rejectionReason: {
      ar: 'إذا تجاوز طوله المسموح (6 مم لسمك 25 مم طبقاً لـ ASME UW-51) يعتبر مرفوضاً، وإلا يقبل إذا كان أقصر.',
      en: 'Evaluated by length: Exceeds 6mm maximum limit for 25mm plate under ASME UW-51 (L = 8.5mm > 6.0mm -> REJECT).',
    },
  },
  {
    id: 'porosity_cluster',
    name: { ar: 'مجموعة مسام غازية (Porosity Cluster)', en: 'Porosity Cluster (Gas Cavities)' },
    category: 'Volumetric',
    nominalDepthMm: 13.0,
    distanceFromWeldCenterMm: 1.0,
    lengthMm: 5.0,
    heightMm: 2.0,
    reflectivityFactor: 0.48,
    optimalAngleDeg: 45,
    description: {
      ar: 'فقاعات غازية كروية محبوسة في البركة المنصهرة أثناء التجمد السريع لمعدن اللحام.',
      en: 'Entrapped gas cavities formed by gas evolution during weld pool solidification and rapid cooling.',
    },
    nature: {
      ar: 'عيب حجمي كروي مشتت، يظهر على الشاشة كحزمة نبضات صغيرة متحركة تشبه الحشائش الصوتية.',
      en: 'Spherical volumetric scatterers appearing as multiple jagged grass-like cluster peaks on the A-Scan.',
    },
    rejectionReason: {
      ar: 'مقبول طبقاً لـ ASME Sec VIII طالما أن سعته دون خط الـ 100% DAC وطوله الإجمالي لا يتجاوز الحدود المسموحة للمسام.',
      en: 'ACCEPTABLE under ASME Sec VIII if echo amplitude remains below 100% DAC and cluster dimensions meet Appendix 4.',
    },
  },
  {
    id: 'toe_undercut',
    name: { ar: 'نحر سطحي عند حرف اللحام (Toe Undercut)', en: 'Toe Undercut (Surface Groove)' },
    category: 'Planar',
    nominalDepthMm: 1.8, // near top surface
    distanceFromWeldCenterMm: 9.5, // at toe of cap
    lengthMm: 12.0,
    heightMm: 1.8,
    reflectivityFactor: 0.75,
    optimalAngleDeg: 70, // best found on second leg
    description: {
      ar: 'أخدود منخفض ذاب في المعدن الأساسي عند حافة كاب اللحام ولم يمتلئ بمعدن الإيداع.',
      en: 'A surface groove melted into base metal adjacent to weld toe and left unfilled by weld metal.',
    },
    nature: {
      ar: 'عيب سطحي خطير يركز الإجهادات، يكشف عنه باستخدام الـ Full-Skip (الارتداد الثاني) أو مجس 70° سطحي.',
      en: 'Surface stress-raiser best detected using Leg 2 (Full-Skip) reflections or a high-angle 70° shear wave probe.',
    },
    rejectionReason: {
      ar: 'مرفوض إذا زاد عمقه عن 1 مم طبقاً لـ AWS D1.1 و ASME B31.3 للخدمات الإجهادية الدورية (Severe Cyclic).',
      en: 'REJECT if depth exceeds 1.0mm under AWS D1.1 & ASME B31.3 (Severe Cyclic Service). Current depth 1.8mm -> REJECT.',
    },
  },
];

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export const ComprehensiveWeldUtSimulator: React.FC<ComprehensiveWeldUtSimulatorProps> = ({ language }) => {
  const isAr = language === 'ar';

  // --- Active Module / Workflow Step ---
  const [activeStep, setActiveStep] = useState<'scan_inspect' | 'calibration' | 'code_eval' | 'report'>('scan_inspect');

  // --- Weld Joint Geometry Parameters ---
  const [plateThicknessMm, setPlateThicknessMm] = useState<number>(25); // t = 25mm standard
  const [bevelAngleDeg] = useState<number>(30); // Single V 60° included
  const [capWidthMm] = useState<number>(18);
  const [selectedFlawId, setSelectedFlawId] = useState<WeldFlawType>('root_crack');
  const currentFlaw = WELD_FLAWS.find((f) => f.id === selectedFlawId) || WELD_FLAWS[0];

  // --- Ultrasonic Hardware & Probe Parameters ---
  const [probeAngleDeg, setProbeAngleDeg] = useState<number>(60); // 45°, 60°, 70°
  const [probeIndexXmm, setProbeIndexXmm] = useState<number>(36); // Standoff distance from weld centerline (mm)
  const [probeFrequencyMhz, setProbeFrequencyMhz] = useState<number>(4.0); // 2MHz, 4MHz
  const [velocityMs, setVelocityMs] = useState<number>(3240); // 3240 m/s for shear waves in carbon steel
  const [zeroDelayUs, setZeroDelayUs] = useState<number>(1.25); // Probe zero delay (µs)
  const [gainDb, setGainDb] = useState<number>(48.0); // Receiver Gain (dB)
  const [rangeMm, setRangeMm] = useState<number>(100); // Instrument Range (mm)
  const [delayMm] = useState<number>(0);
  const [rectification, setRectification] = useState<'full' | 'positive' | 'rf'>('full');
  const [damping, setDamping] = useState<'50_ohm' | '500_ohm'>('50_ohm');
  const [energyLevel, setEnergyLevel] = useState<'low' | 'med' | 'high'>('med');
  const [prfHz] = useState<number>(500);

  // --- Dual Gates System ---
  const [gateAStartMm, setGateAStartMm] = useState<number>(40);
  const [gateAWidthMm, setGateAWidthMm] = useState<number>(35);
  const [gateAThresholdPct, setGateAThresholdPct] = useState<number>(50); // % FSH
  const [gateBStartMm] = useState<number>(75);
  const [gateBWidthMm] = useState<number>(25);
  const [gateBThresholdPct] = useState<number>(30);

  // --- DAC / TCG System ---
  const [isDacEnabled, setIsDacEnabled] = useState<boolean>(true);
  const [dacPoints, setDacPoints] = useState<Array<{ soundPathMm: number; amplitudePct: number }>>([
    { soundPathMm: 28, amplitudePct: 80 },
    { soundPathMm: 55, amplitudePct: 62 },
    { soundPathMm: 85, amplitudePct: 44 },
  ]);

  // --- Calibration Block & Wizard ---
  const [activeCalBlock, setActiveCalBlock] = useState<'iiw_v1' | 'iiw_v2' | 'asme_basic'>('asme_basic');
  const [isAutoCalDone, setIsAutoCalDone] = useState<boolean>(false);
  const [isScanningGainActive, setIsScanningGainActive] = useState<boolean>(false); // +6dB scanning gain

  // --- Sizing & Code Compliance Evaluation ---
  const [selectedCode, setSelectedCode] = useState<InspectionCode>('asme_viii');
  const [measuredFlawLengthMm, setMeasuredFlawLengthMm] = useState<number>(14.0); // 6dB drop measured length
  const [isFrozen, setIsFrozen] = useState<boolean>(false);
  const [isAlarmMuted, setIsAlarmMuted] = useState<boolean>(false);

  // Canvas refs
  const weldCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const aScanCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // ---------------------------------------------------------------------------
  // Ultrasonic Beam Ray Tracing Mathematics
  // ---------------------------------------------------------------------------
  const angleRad = (probeAngleDeg * Math.PI) / 180;
  const sinTheta = Math.sin(angleRad);
  const cosTheta = Math.cos(angleRad);
  const tanTheta = Math.tan(angleRad);

  // Skip Distances
  const halfSkipSurfaceMm = plateThicknessMm * tanTheta; // Surface distance for Leg 1
  const fullSkipSurfaceMm = 2 * plateThicknessMm * tanTheta; // Surface distance for Leg 2
  const leg1SoundPathMm = plateThicknessMm / cosTheta;
  const leg2SoundPathMm = (2 * plateThicknessMm) / cosTheta;

  // Calculate whether beam intercepts the selected flaw
  // Probe is placed at +X (right side of weld center) pointing towards weld (negative X direction)
  // Ray position at depth d:
  // In Leg 1 (0 <= d <= t): rayX = probeIndexXmm - d * tanTheta
  // In Leg 2 (t >= d >= 0): rayX = probeIndexXmm - halfSkipSurfaceMm - (plateThicknessMm - d) * tanTheta
  const flawDepth = currentFlaw.nominalDepthMm;
  const flawX = currentFlaw.distanceFromWeldCenterMm;

  // Compute expected ray X at flaw depth for both legs
  const rayXLeg1AtFlawDepth = probeIndexXmm - flawDepth * tanTheta;
  const rayXLeg2AtFlawDepth = probeIndexXmm - halfSkipSurfaceMm - (plateThicknessMm - flawDepth) * tanTheta;

  const distToFlawLeg1 = Math.abs(rayXLeg1AtFlawDepth - flawX);
  const distToFlawLeg2 = Math.abs(rayXLeg2AtFlawDepth - flawX);

  // Beam spread tolerance (divergence envelope)
  const beamHalfWidthAtDepthMm = 3.5 + 0.05 * flawDepth;

  let isHit = false;
  let activeLeg = 1;
  let calculatedSoundPathMm = 0;
  let calculatedDepthMm = flawDepth;
  let calculatedSurfaceDistMm = flawX;

  if (distToFlawLeg1 <= beamHalfWidthAtDepthMm) {
    isHit = true;
    activeLeg = 1;
    calculatedSoundPathMm = flawDepth / cosTheta;
  } else if (distToFlawLeg2 <= beamHalfWidthAtDepthMm) {
    isHit = true;
    activeLeg = 2;
    calculatedSoundPathMm = (2 * plateThicknessMm - flawDepth) / cosTheta;
  }

  // Calculate Echo Amplitude based on angle alignment, flaw category, and Gain
  let echoAmplitudePct = 0;
  if (isHit) {
    // Angle alignment factor: peaks when probe angle matches optimal defect angle
    const angleDiff = Math.abs(probeAngleDeg - currentFlaw.optimalAngleDeg);
    const angleEfficiency = Math.max(0.2, 1 - angleDiff / 40);

    // Baseline amplitude at 45 dB
    const effectiveGain = gainDb + (isScanningGainActive ? 6 : 0);
    const gainFactor = Math.pow(10, (effectiveGain - 45) / 20);

    // Flaw reflectivity
    echoAmplitudePct = Math.min(
      100,
      Math.max(5, Math.round(75 * currentFlaw.reflectivityFactor * angleEfficiency * gainFactor))
    );
  }

  // Alarm triggered if echo exceeds Gate A threshold and falls within gate
  const isEchoInGateA =
    isHit &&
    calculatedSoundPathMm >= gateAStartMm &&
    calculatedSoundPathMm <= gateAStartMm + gateAWidthMm;
  const isAlarmTriggered = isEchoInGateA && echoAmplitudePct >= gateAThresholdPct && !isAlarmMuted;

  // ---------------------------------------------------------------------------
  // Code Acceptance / Rejection Evaluation
  // ---------------------------------------------------------------------------
  let isCodeReject = false;
  let codeClauseCitation = '';
  let codeExplanation = '';

  if (selectedCode === 'asme_viii') {
    codeClauseCitation = 'ASME Sec VIII Div 1 (UW-51 & Mandatory Appendix 12)';
    if (currentFlaw.category === 'Planar') {
      isCodeReject = true;
      codeExplanation = isAr
        ? 'مرفوض قطعياً: تنص الفقرة UW-51 على أن الشروخ ونقص الانصهار ونقص التغلغل مرفوضة أياً كان طولها.'
        : 'STRICTLY REJECT: ASME UW-51 states that cracks, lack of fusion, and incomplete penetration are unacceptable regardless of length.';
    } else {
      // Slag / Porosity evaluated by length (max 6mm for 25mm plate)
      const maxAllowedLength = 6.0;
      if (measuredFlawLengthMm > maxAllowedLength) {
        isCodeReject = true;
        codeExplanation = isAr
          ? `مرفوض: الطول المقاس (${measuredFlawLengthMm} مم) يتجاوز الحد الأقصى المسموح للعيوب الحجمية (${maxAllowedLength} مم).`
          : `REJECT: Measured length (${measuredFlawLengthMm}mm) exceeds max allowable volumetric slag limit (${maxAllowedLength}mm).`;
      } else {
        isCodeReject = false;
        codeExplanation = isAr
          ? `مقبول: الطول المقاس (${measuredFlawLengthMm} مم) ضمن الحدود المقبولة لكود ASME UW-51 (أقل من 6 مم).`
          : `ACCEPT: Measured length (${measuredFlawLengthMm}mm) is within ASME UW-51 acceptable slag limit (< 6mm).`;
      }
    }
  } else if (selectedCode === 'aws_d1_1') {
    codeClauseCitation = 'AWS D1.1 (Structural Welding Code - Clause 6 / Table 6.2)';
    // AWS Indication Rating d = a - b - c
    const a = 48.0; // defect level dB
    const b = 42.0; // zero reference level dB
    const c = Math.max(0, 2 * ((calculatedSoundPathMm / 25.4) - 1)); // attenuation factor
    const d = a - b - c;

    if (currentFlaw.category === 'Planar' || d <= 1) {
      isCodeReject = true;
      codeExplanation = isAr
        ? `مرفوض (فئة A عيب جسيم): تصنيف العيب طبقا لمعادلة AWS d = a - b - c = ${d.toFixed(1)} dB مما يجعله عيباً جسيماً مرفوضاً.`
        : `REJECT (Class A Large Flaw): AWS Indication Rating d = a - b - c = ${d.toFixed(1)} dB classifies this as unacceptable Class A defect.`;
      } else {
        isCodeReject = false;
        codeExplanation = isAr
          ? 'مقبول (فئة D عيب طفيف): شدة العيب وسعته تقع ضمن الفئة المقبولة بالهياكل الإنشائية.'
          : 'ACCEPT (Class D Minor Flaw): Indication level and amplitude fall within acceptable structural limits.';
      }
  } else if (selectedCode === 'asme_b31_3') {
    codeClauseCitation = 'ASME B31.3 Process Piping (Table 341.3.2 Severe Cyclic)';
    if (currentFlaw.category === 'Planar') {
      isCodeReject = true;
      codeExplanation = isAr
        ? 'مرفوض: لا يسمح بأي شروخ أو نقص انصهار في خطوط أنابيب العمليات البترولية المعرضة لظروف دورية قاسية.'
        : 'REJECT: Zero tolerance for cracks or lack of fusion in process piping subjected to severe cyclic conditions.';
    } else {
      isCodeReject = measuredFlawLengthMm > 6.0;
      codeExplanation = isCodeReject
        ? isAr ? 'مرفوض: حجم الخبث أو المسامية يتجاوز حدود الجدول 341.3.2.' : 'REJECT: Volumetric dimension exceeds Table 341.3.2 limits.'
        : isAr ? 'مقبول: تقع ضمن حدود الأنابيب المقبولة.' : 'ACCEPT: Within allowable piping thresholds.';
    }
  } else {
    codeClauseCitation = 'API 1104 / ISO 11666 Standard';
    isCodeReject = currentFlaw.category === 'Planar';
    codeExplanation = isCodeReject
      ? isAr ? 'مرفوض: العيوب المستوية غير مسموح بها في خطوط الأنابيب لنقل المواد البترولية.' : 'REJECT: Planar defects are prohibited in petroleum cross-country pipelines.'
      : isAr ? 'مقبول: عيب حجمي يقع دون خط الـ 100% DAC.' : 'ACCEPT: Volumetric defect below critical sizing thresholds.';
  }

  // ---------------------------------------------------------------------------
  // Render Weld Cross-Section & Acoustic Ray Tracing Canvas
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const canvas = weldCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear background
    ctx.fillStyle = '#050814';
    ctx.fillRect(0, 0, width, height);

    // Scale factors: map weld plate (e.g. 140mm wide by 35mm high) into canvas
    const originX = width / 2; // Centerline of weld
    const originY = 55; // Top plate surface Y
    const scale = Math.min((width * 0.8) / 140, (height * 0.7) / 35);

    const plateThicknessPx = plateThicknessMm * scale;
    const bottomY = originY + plateThicknessPx;
    const halfPlateWidthPx = 65 * scale;

    // 1. Draw Base Metal Plates (Left & Right)
    ctx.fillStyle = '#131a33';
    // Left plate
    ctx.beginPath();
    ctx.moveTo(originX - halfPlateWidthPx, originY);
    ctx.lineTo(originX - (capWidthMm / 2) * scale, originY);
    ctx.lineTo(originX - 1.5 * scale, bottomY); // root land
    ctx.lineTo(originX - halfPlateWidthPx, bottomY);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#273561';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Right plate
    ctx.beginPath();
    ctx.moveTo(originX + halfPlateWidthPx, originY);
    ctx.lineTo(originX + (capWidthMm / 2) * scale, originY);
    ctx.lineTo(originX + 1.5 * scale, bottomY);
    ctx.lineTo(originX + halfPlateWidthPx, bottomY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // 2. Draw Weld Metal (Single V-groove with Cap Reinforcement & Root Penetration)
    ctx.fillStyle = '#1e284a';
    ctx.beginPath();
    // Weld cap crown
    ctx.moveTo(originX - (capWidthMm / 2) * scale, originY);
    ctx.quadraticCurveTo(originX, originY - 3.5 * scale, originX + (capWidthMm / 2) * scale, originY);
    // Right bevel fusion line (30°)
    ctx.lineTo(originX + 1.5 * scale, bottomY);
    // Root penetration curve
    ctx.quadraticCurveTo(originX, bottomY + 2.5 * scale, originX - 1.5 * scale, bottomY);
    // Left bevel fusion line (30°)
    ctx.lineTo(originX - (capWidthMm / 2) * scale, originY);
    ctx.closePath();
    ctx.fill();

    // Weld bead passes texture
    ctx.strokeStyle = '#3b4d80';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Heat-Affected Zone (HAZ) outlines
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.35)';
    ctx.setLineDash([3, 3]);
    ctx.lineWidth = 1;
    // Left HAZ
    ctx.beginPath();
    ctx.moveTo(originX - ((capWidthMm / 2) + 3) * scale, originY);
    ctx.lineTo(originX - 4.5 * scale, bottomY);
    ctx.stroke();
    // Right HAZ
    ctx.beginPath();
    ctx.moveTo(originX + ((capWidthMm / 2) + 3) * scale, originY);
    ctx.lineTo(originX + 4.5 * scale, bottomY);
    ctx.stroke();
    ctx.setLineDash([]);

    // 3. Weld Centerline (dashed)
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(originX, originY - 20);
    ctx.lineTo(originX, bottomY + 20);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('WELD ℄ (X=0)', originX, originY - 24);

    // 4. Draw Flaw/Defect inside weldment
    const flawCanvasX = originX + currentFlaw.distanceFromWeldCenterMm * scale;
    const flawCanvasY = originY + currentFlaw.nominalDepthMm * scale;

    ctx.save();
    if (isHit) {
      // Glow effect when ultrasonic beam strikes flaw
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 12;
    }

    if (currentFlaw.id === 'root_crack') {
      // Sharp vertical planar crack
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(flawCanvasX, flawCanvasY - 5 * scale);
      ctx.lineTo(flawCanvasX - 1 * scale, flawCanvasY - 2 * scale);
      ctx.lineTo(flawCanvasX + 1 * scale, flawCanvasY);
      ctx.stroke();
    } else if (currentFlaw.id === 'lack_of_fusion') {
      // 30° inclined bevel flaw
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(flawCanvasX - 2 * scale, flawCanvasY - 4 * scale);
      ctx.lineTo(flawCanvasX + 2 * scale, flawCanvasY + 4 * scale);
      ctx.stroke();
    } else if (currentFlaw.id === 'slag_inclusion') {
      // Elongated irregular shape
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.ellipse(flawCanvasX, flawCanvasY, 3 * scale, 1.8 * scale, 0.2, 0, Math.PI * 2);
      ctx.fill();
    } else if (currentFlaw.id === 'porosity_cluster') {
      // Group of spherical bubbles
      ctx.fillStyle = '#38bdf8';
      for (const [ox, oy] of [[-2, -1], [1, -2], [0, 1], [-1, 2], [2, 1]]) {
        ctx.beginPath();
        ctx.arc(flawCanvasX + ox * scale, flawCanvasY + oy * scale, 1.2 * scale, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (currentFlaw.id === 'toe_undercut') {
      // Surface notch at toe
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.moveTo(flawCanvasX - 2 * scale, originY);
      ctx.lineTo(flawCanvasX, originY + 2.5 * scale);
      ctx.lineTo(flawCanvasX + 2 * scale, originY);
      ctx.closePath();
      ctx.fill();
    } else {
      // LOP in root
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(flawCanvasX - 2 * scale, bottomY - 3 * scale, 4 * scale, 3 * scale);
    }
    ctx.restore();

    // Defect label tag
    ctx.fillStyle = isHit ? '#f87171' : '#94a3b8';
    ctx.font = 'bold 9px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(
      `${currentFlaw.name[language]} (D=${currentFlaw.nominalDepthMm}mm)`,
      flawCanvasX + 6 * scale,
      flawCanvasY - 2
    );

    // 5. Draw Angle Beam Probe & Wedge on Top Plate Surface
    const probeX = originX + probeIndexXmm * scale;
    const wedgeWidthPx = 18 * scale;
    const wedgeHeightPx = 14 * scale;

    // Wedge block (acrylic/lucite plastic look)
    ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(probeX, originY); // Index point
    ctx.lineTo(probeX + wedgeWidthPx, originY);
    ctx.lineTo(probeX + wedgeWidthPx, originY - wedgeHeightPx);
    ctx.lineTo(probeX + 4 * scale, originY - wedgeHeightPx * 0.7);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Transducer crystal element sitting on wedge inclined face
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(probeX + 4 * scale, originY - wedgeHeightPx * 0.8, 8 * scale, 4 * scale);

    // Probe Index Mark Indicator
    ctx.fillStyle = '#e11d48';
    ctx.beginPath();
    ctx.arc(probeX, originY, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 9px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${probeAngleDeg}° PROBE`, probeX + wedgeWidthPx / 2, originY - wedgeHeightPx - 6);
    ctx.fillText(`X = ${probeIndexXmm}mm`, probeX + wedgeWidthPx / 2, originY - wedgeHeightPx + 4);

    // 6. Ultrasonic Beam Ray Tracing (Leg 1 & Leg 2)
    // Direct Beam (Leg 1): From probe index (probeX, originY) to bottom backwall
    const leg1EndX = probeX - halfSkipSurfaceMm * scale;
    const leg1EndY = bottomY;

    // Full Skip Beam (Leg 2): Reflected from bottom backwall up to top surface
    const leg2EndX = leg1EndX - halfSkipSurfaceMm * scale;
    const leg2EndY = originY;

    // Translucent acoustic cone (beam divergence)
    ctx.fillStyle = 'rgba(56, 189, 248, 0.08)';
    ctx.beginPath();
    ctx.moveTo(probeX, originY);
    ctx.lineTo(leg1EndX + 4 * scale, leg1EndY);
    ctx.lineTo(leg2EndX + 8 * scale, leg2EndY);
    ctx.lineTo(leg2EndX - 8 * scale, leg2EndY);
    ctx.lineTo(leg1EndX - 4 * scale, leg1EndY);
    ctx.closePath();
    ctx.fill();

    // Draw Primary Central Ray (Leg 1)
    ctx.strokeStyle = activeLeg === 1 && isHit ? '#ef4444' : '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(probeX, originY);
    ctx.lineTo(leg1EndX, leg1EndY);
    ctx.stroke();

    // Leg 1 annotation
    ctx.fillStyle = '#38bdf8';
    ctx.font = '9px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(
      `Leg 1 (Half-Skip: ${halfSkipSurfaceMm.toFixed(1)}mm)`,
      (probeX + leg1EndX) / 2 + 10,
      (originY + leg1EndY) / 2
    );

    // Draw Reflected Central Ray (Leg 2 / Full Skip)
    ctx.strokeStyle = activeLeg === 2 && isHit ? '#ef4444' : '#f59e0b';
    ctx.beginPath();
    ctx.moveTo(leg1EndX, leg1EndY);
    ctx.lineTo(leg2EndX, leg2EndY);
    ctx.stroke();

    // Leg 2 annotation
    ctx.fillStyle = '#f59e0b';
    ctx.fillText(
      `Leg 2 (Full-Skip: ${fullSkipSurfaceMm.toFixed(1)}mm)`,
      (leg1EndX + leg2EndX) / 2 - 10,
      (leg1EndY + leg2EndY) / 2
    );

    // 7. Dynamic Return Echo Bounce Ray (when flaw is hit!)
    if (isHit) {
      ctx.strokeStyle = '#22c55e';
      ctx.setLineDash([4, 3]);
      ctx.lineWidth = 2;
      ctx.beginPath();
      if (activeLeg === 1) {
        ctx.moveTo(flawCanvasX, flawCanvasY);
        ctx.lineTo(probeX, originY);
      } else {
        ctx.moveTo(flawCanvasX, flawCanvasY);
        ctx.lineTo(leg1EndX, leg1EndY);
        ctx.lineTo(probeX, originY);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Flash pulse wave rings at flaw
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.7)';
      ctx.beginPath();
      ctx.arc(flawCanvasX, flawCanvasY, 8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(flawCanvasX, flawCanvasY, 14, 0, Math.PI * 2);
      ctx.stroke();
    }
  }, [
    plateThicknessMm,
    probeAngleDeg,
    probeIndexXmm,
    capWidthMm,
    currentFlaw,
    isHit,
    activeLeg,
    language,
    halfSkipSurfaceMm,
    fullSkipSurfaceMm,
  ]);

  // ---------------------------------------------------------------------------
  // Render Flaw Detector A-Scan CRT Display Canvas
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const canvas = aScanCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Dark screen
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, width, height);

    // Draw Graticule Grid (10 divisions horizontal and vertical)
    ctx.strokeStyle = 'rgba(30, 41, 59, 0.8)';
    ctx.lineWidth = 1;

    // Horizontal grid lines (0% to 100% FSH in 10% steps)
    for (let i = 0; i <= 10; i++) {
      const y = (i / 10) * height;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();

      if (i > 0 && i < 10 && i % 2 === 0) {
        ctx.fillStyle = '#475569';
        ctx.font = '8px monospace';
        ctx.fillText(`${100 - i * 10}%`, 4, y - 2);
      }
    }

    // Vertical grid lines (0 to Range in 10 steps)
    for (let i = 0; i <= 10; i++) {
      const x = (i / 10) * width;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();

      if (i > 0) {
        ctx.fillStyle = '#475569';
        ctx.font = '8px monospace';
        ctx.fillText(`${Math.round((i / 10) * rangeMm)}`, x - 8, height - 3);
      }
    }

    // 80% FSH Reference Line (Industry standard baseline)
    const y80 = (1 - 0.8) * height;
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)';
    ctx.setLineDash([2, 2]);
    ctx.beginPath();
    ctx.moveTo(0, y80);
    ctx.lineTo(width, y80);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw DAC Curves if enabled
    if (isDacEnabled && dacPoints.length >= 2) {
      // 100% DAC Reference Curve (Amber)
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      dacPoints.forEach((pt, idx) => {
        const x = (pt.soundPathMm / rangeMm) * width;
        const y = (1 - pt.amplitudePct / 100) * height;
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // -6 dB Sizing Curve (Yellow)
      ctx.strokeStyle = 'rgba(234, 179, 8, 0.6)';
      ctx.setLineDash([3, 2]);
      ctx.beginPath();
      dacPoints.forEach((pt, idx) => {
        const x = (pt.soundPathMm / rangeMm) * width;
        const y = (1 - (pt.amplitudePct * 0.5) / 100) * height;
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // -14 dB Recording Curve (Cyan)
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.beginPath();
      dacPoints.forEach((pt, idx) => {
        const x = (pt.soundPathMm / rangeMm) * width;
        const y = (1 - (pt.amplitudePct * 0.2) / 100) * height;
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw Gate A (Cyan)
    const gateAX = (gateAStartMm / rangeMm) * width;
    const gateAWidthPx = (gateAWidthMm / rangeMm) * width;
    const gateAY = (1 - gateAThresholdPct / 100) * height;

    ctx.strokeStyle = isAlarmTriggered ? '#ef4444' : '#06b6d4';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(gateAX, gateAY);
    ctx.lineTo(gateAX + gateAWidthPx, gateAY);
    // Vertical gate ends
    ctx.moveTo(gateAX, gateAY - 4);
    ctx.lineTo(gateAX, gateAY + 4);
    ctx.moveTo(gateAX + gateAWidthPx, gateAY - 4);
    ctx.lineTo(gateAX + gateAWidthPx, gateAY + 4);
    ctx.stroke();

    ctx.fillStyle = isAlarmTriggered ? '#ef4444' : '#06b6d4';
    ctx.font = 'bold 9px monospace';
    ctx.fillText(`GATE A (${gateAThresholdPct}%)`, gateAX + 2, gateAY - 6);

    // Draw Synthetic Ultrasonic A-Scan Waveform
    const numPoints = 400;
    const wavePoints: number[] = new Array(numPoints).fill(0);

    // Baseline grass noise (0% to 4%)
    for (let i = 0; i < numPoints; i++) {
      wavePoints[i] = Math.sin(i * 0.5) * 1.5 + (Math.random() - 0.5) * 2;
    }

    // Initial Bang / Probe Interface Echo at soundPath = 0 to 4mm
    for (let i = 0; i < 20; i++) {
      const envelope = Math.exp(-Math.pow((i - 2) / 4, 2));
      wavePoints[i] += 95 * envelope;
    }

    // Defect Echo if hit!
    if (isHit && echoAmplitudePct > 0) {
      const flawPeakIdx = Math.round((calculatedSoundPathMm / rangeMm) * numPoints);
      const echoWidth = 14;

      for (let i = -echoWidth; i <= echoWidth; i++) {
        const idx = flawPeakIdx + i;
        if (idx >= 0 && idx < numPoints) {
          const envelope = Math.exp(-Math.pow(i / (echoWidth / 2.5), 2));
          // Oscillating RF carrier frequency modulated by envelope
          const carrier =
            rectification === 'full'
              ? Math.abs(Math.cos(i * 1.2))
              : rectification === 'positive'
              ? Math.max(0, Math.cos(i * 1.2))
              : Math.cos(i * 1.2);
          wavePoints[idx] += echoAmplitudePct * envelope * carrier;
        }
      }
    }

    // Render Waveform Trace
    ctx.strokeStyle = isAlarmTriggered ? '#f87171' : '#22c55e';
    ctx.lineWidth = 1.8;
    ctx.shadowColor = isAlarmTriggered ? '#ef4444' : '#22c55e';
    ctx.shadowBlur = 4;

    ctx.beginPath();
    for (let i = 0; i < numPoints; i++) {
      const x = (i / (numPoints - 1)) * width;
      const amp = Math.min(100, Math.max(0, wavePoints[i]));
      const y = height - (amp / 100) * height;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Peak Indicator Dot
    if (isHit && echoAmplitudePct > 0) {
      const peakX = (calculatedSoundPathMm / rangeMm) * width;
      const peakY = (1 - echoAmplitudePct / 100) * height;

      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(peakX, peakY, 4, 0, Math.PI * 2);
      ctx.fill();

      // Readout HUD on top of screen
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px monospace';
      ctx.fillText(
        `^ ${echoAmplitudePct}% FSH @ S=${calculatedSoundPathMm.toFixed(1)}mm (D=${calculatedDepthMm.toFixed(1)}mm)`,
        Math.max(10, Math.min(width - 240, peakX - 40)),
        Math.max(20, peakY - 12)
      );
    }
  }, [
    rangeMm,
    isDacEnabled,
    dacPoints,
    gateAStartMm,
    gateAWidthMm,
    gateAThresholdPct,
    isAlarmTriggered,
    isHit,
    echoAmplitudePct,
    calculatedSoundPathMm,
    calculatedDepthMm,
    rectification,
  ]);

  return (
    <div className="space-y-6">
      {/* Top Banner: Complete NDT Weld Simulator & Code Evaluator */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-950 via-[#0a0f29] to-slate-950 p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-3">
              <Compass className="w-4 h-4" />
              <span>
                {isAr
                  ? 'المختبر التدريبي المتكامل: تتبع الأشعة الفيزيائية وضبط الكالبريشن ومطابقة الأكواد'
                  : 'Complete Weld UT Simulator: Ray Tracing, Calibration Hardware & Code Engine'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {isAr
                ? 'محاكي فحص اللحامات بالموجات فوق الصوتية وتتبع مسارات الأشعة'
                : 'Comprehensive Ultrasonic Weld Inspection & Acoustic Ray Tracing Lab'}
            </h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              {isAr
                ? 'نظام محاكاة فيزيائي وهندسي كامل من البداية للنهاية: عاين مسار الشعاع المنكسر والمنعكس (Half-Skip و Full-Skip) داخل قطاع اللحام، وتفاعل مع كامل أزرار الكالبريشن والكسب والبوابات ومنحنى DAC، مع التحقق الفوري من قبول أو رفض العيوب طبقاً لـ ASME و AWS و ISO.'
                : 'End-to-end NDT training: observe sound ray refraction and backwall bounce inside realistic weld bevels, manipulate full flaw detector hardware calibration controls, and evaluate ASME/AWS acceptance limits.'}
            </p>
          </div>

          {/* Workflow Navigation Steps */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'scan_inspect', label: { ar: 'المسح وتتبع الأشعة', en: '1. Scan & Ray Trace' }, icon: Crosshair },
              { id: 'calibration', label: { ar: 'مفاتيح الكالبريشن الكاملة', en: '2. Full Calibration Keys' }, icon: Sliders },
              { id: 'code_eval', label: { ar: 'مطابقة الأكواد والقبول', en: '3. Code Evaluation' }, icon: ShieldCheck },
              { id: 'report', label: { ar: 'التقرير الهندسي المعتمد', en: '4. Official Test Report' }, icon: FileCheck },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeStep === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveStep(tab.id as typeof activeStep)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-2 border ${
                    isActive
                      ? 'bg-cyan-600 text-white border-cyan-400 shadow-lg shadow-cyan-950/50 scale-[1.02]'
                      : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label[language]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Target Defect Selector Carousel */}
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
          <span className="text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>{isAr ? 'اختر العيب المستهدف داخل الوصلة الملحومة:' : 'Select Target Weld Discontinuity for Simulation:'}</span>
          </span>
          <span className="text-amber-400 font-bold">
            {isAr ? 'سمك اللوح القياسي: 25 مم · زاوية الشطف: 30°' : 'Plate: 25mm Carbon Steel · Bevel: 30° Single V'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {WELD_FLAWS.map((flaw) => {
            const isSelected = selectedFlawId === flaw.id;
            return (
              <button
                key={flaw.id}
                type="button"
                onClick={() => {
                  setSelectedFlawId(flaw.id);
                  setProbeAngleDeg(flaw.optimalAngleDeg);
                }}
                className={`p-2.5 rounded-xl border text-start transition cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-cyan-950/50 border-cyan-400 text-white shadow-md'
                    : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className={flaw.category === 'Planar' ? 'text-rose-400 font-bold' : 'text-amber-400'}>
                    {flaw.category}
                  </span>
                  <span className="text-cyan-400">{flaw.optimalAngleDeg}°</span>
                </div>
                <div className="text-xs font-bold truncate">{flaw.name[language]}</div>
                <div className="text-[10px] text-slate-500 mt-1">
                  D={flaw.nominalDepthMm}mm · L={flaw.lengthMm}mm
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 1: SCANNING & ACOUSTIC RAY TRACING VIEWPORT */}
      {activeStep === 'scan_inspect' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left 8 Cols: Dual Viewport (Weld Ray Trace + A-Scan Scope) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Top View: Weld Cross-Section & Ray Tracing Canvas */}
            <div className="rounded-2xl border-2 border-slate-700 bg-black p-4 relative shadow-2xl">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-slate-800 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold">WELD CROSS-SECTION RAY TRACING (SNELL'S REFLECTION)</span>
                  <span className="text-cyan-400">| PROBE: {probeAngleDeg}° @ X={probeIndexXmm}mm</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${isHit ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-800 text-slate-400'}`}>
                    {isHit ? (isAr ? 'تم اصطدام الشعاع بالعيب!' : 'BEAM IMPINGEMENT!') : (isAr ? 'مسح حر' : 'CLEAR BEAM')}
                  </span>
                </div>
              </div>

              <canvas
                ref={weldCanvasRef}
                width={680}
                height={260}
                className="w-full h-56 sm:h-64 rounded-xl bg-slate-950 border border-slate-800 select-none cursor-ew-resize"
              />

              {/* Probe Position Scrubber Slider */}
              <div className="mt-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <Crosshair className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{isAr ? 'حرك المجس على سطح اللوح (مسافة X من المركز):' : 'Probe Standoff Distance (X mm from weld center):'}</span>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-64">
                  <input
                    type="range"
                    min="10"
                    max="80"
                    step="0.5"
                    aria-label={isAr ? 'مسافة المجس من خط المركز' : 'Probe Standoff Distance'}
                    value={probeIndexXmm}
                    onChange={(e) => setProbeIndexXmm(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                  <span className="text-xs font-mono font-bold text-cyan-400 shrink-0">{probeIndexXmm} mm</span>
                </div>
              </div>
            </div>

            {/* Bottom View: Oscilloscope Flaw Detector A-Scan */}
            <div className="rounded-2xl border-2 border-slate-700 bg-black p-4 relative shadow-2xl">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-slate-800 mb-2">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-green-400" />
                  <span className="text-white font-bold">DIGITAL FLAW DETECTOR A-SCAN DISPLAY</span>
                  <span className="text-slate-500 font-mono">0 - {rangeMm}mm</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsScanningGainActive(!isScanningGainActive)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono border transition ${
                      isScanningGainActive ? 'bg-amber-500/20 text-amber-300 border-amber-400' : 'bg-slate-900 text-slate-500 border-slate-800'
                    }`}
                  >
                    +6dB Scanning Gain {isScanningGainActive ? 'ON' : 'OFF'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAlarmMuted(!isAlarmMuted)}
                    className="text-slate-400 hover:text-white"
                  >
                    {isAlarmMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
                  </button>
                </div>
              </div>

              <canvas
                ref={aScanCanvasRef}
                width={680}
                height={200}
                className="w-full h-44 sm:h-52 rounded-xl bg-slate-950 border border-slate-800 select-none"
              />

              {/* Digital Readouts HUD */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 font-mono text-xs">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-slate-500 text-[10px]">{isAr ? 'سعة الصدى (% FSH):' : 'Echo Amplitude:'}</div>
                  <div className={`text-base font-black ${isAlarmTriggered ? 'text-rose-400' : 'text-green-400'}`}>
                    {echoAmplitudePct}%
                  </div>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-slate-500 text-[10px]">{isAr ? 'المسار الصوتي (S):' : 'Sound Path (S):'}</div>
                  <div className="text-base font-black text-amber-400">
                    {calculatedSoundPathMm.toFixed(1)} mm
                  </div>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-slate-500 text-[10px]">{isAr ? 'العمق الحقيقي (D):' : 'True Depth (D):'}</div>
                  <div className="text-base font-black text-cyan-400">
                    {calculatedDepthMm.toFixed(1)} mm
                  </div>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-slate-500 text-[10px]">{isAr ? 'المسافة السطحية (X):' : 'Surface Dist (X):'}</div>
                  <div className="text-base font-black text-slate-200">
                    {calculatedSurfaceDistMm.toFixed(1)} mm
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right 4 Cols: Quick Instrument Knobs & Defect Physics Card */}
          <div className="lg:col-span-4 space-y-4">
            {/* Quick Probe & Gain Console */}
            <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  <span>{isAr ? 'لوحة مفاتيح الفاحص السريعة' : 'Inspector Keypad Controls'}</span>
                </span>
                <span className="text-cyan-400 font-bold">{gainDb.toFixed(1)} dB</span>
              </div>

              {/* Probe Angle Selector */}
              <div>
                <div className="text-slate-400 text-[11px] mb-1">
                  {isAr ? 'زاوية المجس (Wedge Angle):' : 'Probe Wedge Angle:'}
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {[45, 60, 70].map((deg) => (
                    <button
                      key={deg}
                      type="button"
                      onClick={() => setProbeAngleDeg(deg)}
                      className={`py-1.5 rounded border font-bold transition cursor-pointer ${
                        probeAngleDeg === deg
                          ? 'bg-cyan-600 text-white border-cyan-400'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {deg}° Shear
                    </button>
                  ))}
                </div>
              </div>

              {/* Gain Adjustment Step Buttons */}
              <div>
                <div className="text-slate-400 text-[11px] mb-1 flex justify-between">
                  <span>{isAr ? 'كسب الجهاز (System Gain):' : 'System Gain (dB):'}</span>
                  <span className="text-green-400">{gainDb.toFixed(1)} dB</span>
                </div>
                <div className="grid grid-cols-4 gap-1">
                  {[-6, -1, 1, 6].map((step) => (
                    <button
                      key={step}
                      type="button"
                      onClick={() => setGainDb((prev) => Math.min(100, Math.max(0, prev + step)))}
                      className="py-1 rounded bg-slate-950 border border-slate-800 hover:border-cyan-500 text-slate-300 hover:text-white transition cursor-pointer"
                    >
                      {step > 0 ? `+${step} dB` : `${step} dB`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gate A Slider */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{isAr ? 'موضع بداية البوابة Gate A:' : 'Gate A Start (mm):'}</span>
                  <span className="text-cyan-400">{gateAStartMm} mm</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  step="1"
                  value={gateAStartMm}
                  onChange={(e) => setGateAStartMm(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />

                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{isAr ? 'مستوى إنذار البوابة (%):' : 'Gate Threshold Level (%):'}</span>
                  <span className="text-cyan-400">{gateAThresholdPct}% FSH</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  step="5"
                  value={gateAThresholdPct}
                  onChange={(e) => setGateAThresholdPct(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Defect Physical Diagnostic Card */}
            <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-amber-400" />
                  <span>{isAr ? 'التحليل الميتالورجي للعيب' : 'Flaw Metallurgical Diagnosis'}</span>
                </span>
                <span className={`px-2 py-0.5 rounded font-bold ${currentFlaw.category === 'Planar' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'}`}>
                  {currentFlaw.category}
                </span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {currentFlaw.description[language]}
              </p>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div>
                  <span className="text-slate-500">{isAr ? 'طبيعة العيب: ' : 'Nature: '}</span>
                  <span className="text-slate-200">{currentFlaw.nature[language]}</span>
                </div>
                <div className="pt-1 border-t border-slate-800/80">
                  <span className="text-slate-500">{isAr ? 'زاوية الكشف المثلى: ' : 'Optimal Probe Angle: '}</span>
                  <span className="text-cyan-400 font-bold">{currentFlaw.optimalAngleDeg}° Shear Wave</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: FULL CALIBRATION KEYS & HARDWARE REPOSITORY */}
      {activeStep === 'calibration' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-amber-400" />
                <span>{isAr ? 'جميع مفاتيح وخيارات الكالبريشن وضبط الجهاز (Full Calibration Hardware Console)' : 'Complete Hardware Calibration Keys & Electronics Setup'}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {isAr
                  ? 'محاكاة كاملة لكافة بارامترات المعايرة الكهربائية والصوتية: سرعة الصوت، التأخير الزمني، كتل المعايرة، ومنحنى DAC ثلاثي النقاط.'
                  : 'Full physical simulation of acoustic and pulser/receiver calibration parameters: Velocity, Zero Delay, DAC and IIW blocks.'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsAutoCalDone(true);
                setVelocityMs(3240);
                setZeroDelayUs(1.25);
                setRangeMm(100);
                setGainDb(48);
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition cursor-pointer flex items-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{isAr ? 'معايرة تلقائية نموذجية (Auto-Cal)' : 'Auto-Cal Standard (V1/ASME)'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
            {/* 1. Velocity & Zero Offset */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="font-bold text-cyan-400 flex items-center gap-1.5 pb-2 border-b border-slate-800">
                <Compass className="w-4 h-4" />
                <span>1. VELOCITY & PROBE ZERO (µs)</span>
              </div>

              <div>
                <div className="text-slate-400 text-[11px] mb-1">{isAr ? 'سرعة الصوت في الخامة:' : 'Material Acoustic Velocity:'}</div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={velocityMs}
                    onChange={(e) => setVelocityMs(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-white"
                  />
                  <span className="text-slate-400">m/s</span>
                </div>
                <div className="grid grid-cols-2 gap-1 mt-1.5">
                  <button
                    type="button"
                    onClick={() => setVelocityMs(3240)}
                    className={`py-1 text-[10px] rounded border ${velocityMs === 3240 ? 'bg-cyan-600 text-white border-cyan-400' : 'bg-slate-900 text-slate-400 border-slate-800'}`}
                  >
                    Steel Shear (3240)
                  </button>
                  <button
                    type="button"
                    onClick={() => setVelocityMs(5920)}
                    className={`py-1 text-[10px] rounded border ${velocityMs === 5920 ? 'bg-cyan-600 text-white border-cyan-400' : 'bg-slate-900 text-slate-400 border-slate-800'}`}
                  >
                    Steel Long. (5920)
                  </button>
                </div>
              </div>

              <div>
                <div className="text-slate-400 text-[11px] mb-1">{isAr ? 'زمن تأخير المجس (Probe Zero Delay):' : 'Probe Zero Delay (µs):'}</div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.05"
                    value={zeroDelayUs}
                    onChange={(e) => setZeroDelayUs(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-white"
                  />
                  <span className="text-slate-400">µs</span>
                </div>
              </div>
            </div>

            {/* 2. Pulser / Receiver Configuration */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="font-bold text-amber-400 flex items-center gap-1.5 pb-2 border-b border-slate-800">
                <Cpu className="w-4 h-4" />
                <span>2. PULSER & RECEIVER (P/R)</span>
              </div>

              <div>
                <div className="text-slate-400 text-[11px] mb-1">{isAr ? 'مقاومة التخميد (Damping):' : 'Damping:'}</div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDamping('50_ohm')}
                    className={`py-1.5 rounded border font-bold ${damping === '50_ohm' ? 'bg-amber-600 text-white border-amber-400' : 'bg-slate-900 text-slate-400 border-slate-800'}`}
                  >
                    50 Ω (Resolution)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDamping('500_ohm')}
                    className={`py-1.5 rounded border font-bold ${damping === '500_ohm' ? 'bg-amber-600 text-white border-amber-400' : 'bg-slate-900 text-slate-400 border-slate-800'}`}
                  >
                    500 Ω (Penetration)
                  </button>
                </div>
              </div>

              <div>
                <div className="text-slate-400 text-[11px] mb-1">{isAr ? 'طريقة تقويم الإشارة (Rectification):' : 'Signal Rectification:'}</div>
                <div className="grid grid-cols-3 gap-1">
                  {(['full', 'positive', 'rf'] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setRectification(mode)}
                      className={`py-1 rounded border capitalize ${rectification === mode ? 'bg-cyan-600 text-white border-cyan-400' : 'bg-slate-900 text-slate-400 border-slate-800'}`}
                    >
                      {mode} Wave
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Reference Calibration Blocks & DAC */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="font-bold text-green-400 flex items-center gap-1.5 pb-2 border-b border-slate-800">
                <Layers className="w-4 h-4" />
                <span>3. CALIBRATION BLOCK & DAC</span>
              </div>

              <div>
                <div className="text-slate-400 text-[11px] mb-1">{isAr ? 'كتلة المعايرة المرجعية:' : 'Reference Calibration Block:'}</div>
                <div className="grid grid-cols-3 gap-1">
                  {[
                    { id: 'asme_basic', label: 'ASME Sec V' },
                    { id: 'iiw_v1', label: 'IIW V1' },
                    { id: 'iiw_v2', label: 'IIW V2' },
                  ].map((blk) => (
                    <button
                      key={blk.id}
                      type="button"
                      onClick={() => setActiveCalBlock(blk.id as typeof activeCalBlock)}
                      className={`py-1 rounded border text-[10px] ${activeCalBlock === blk.id ? 'bg-green-600 text-white border-green-400' : 'bg-slate-900 text-slate-400 border-slate-800'}`}
                    >
                      {blk.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
                  <span>منحنى تصحيح السعة بالمسافة (DAC):</span>
                  <button
                    type="button"
                    onClick={() => setIsDacEnabled(!isDacEnabled)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${isDacEnabled ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-500'}`}
                  >
                    DAC {isDacEnabled ? 'ENABLED' : 'OFF'}
                  </button>
                </div>
                <div className="text-[10px] text-slate-500">
                  {isAr
                    ? '3 نقاط مرجعية مسجلة: 1/4T (80% FSH)، 1/2T (62% FSH)، 3/4T (44% FSH).'
                    : '3 points logged on ASME SDH: 1/4T (80%), 1/2T (62%), 3/4T (44%).'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: CODE EVALUATION & ACCEPTANCE / REJECTION */}
      {activeStep === 'code_eval' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <span>{isAr ? 'مطابقة العيوب بالأكواد الهندسية: ما المرفوض وما المسموح؟' : 'Code Compliance & Flaw Acceptance Engine'}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {isAr
                  ? 'مقارنة أبعاد وسعة العيب المكتشف مع الحدود القصوى المسموحة في الأكواد العالمية (ASME Sec VIII, AWS D1.1, API 1104, ASME B31.3).'
                  : 'Evaluate flaw length, amplitude, and category against ASME Sec VIII, AWS D1.1, and API 1104 limits.'}
              </p>
            </div>

            {/* Code Selector Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'asme_viii', label: 'ASME Sec VIII' },
                { id: 'aws_d1_1', label: 'AWS D1.1' },
                { id: 'asme_b31_3', label: 'ASME B31.3' },
                { id: 'api_1104', label: 'API 1104' },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCode(c.id as InspectionCode)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition cursor-pointer border ${
                    selectedCode === c.id
                      ? 'bg-cyan-600 text-white border-cyan-400'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* High Visibility Acceptance Verdict Banner */}
          <div className={`p-5 rounded-2xl border-2 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            isCodeReject
              ? 'bg-rose-950/30 border-rose-500/50 text-rose-200'
              : 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-xl mt-0.5 ${isCodeReject ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-slate-950'}`}>
                {isCodeReject ? <XCircle className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  {codeClauseCitation}
                </div>
                <div className="text-xl sm:text-2xl font-black mt-0.5">
                  {isCodeReject
                    ? (isAr ? 'القرار: مرفوض قطعياً (REJECTED / UNACCEPTABLE)' : 'VERDICT: REJECTED / UNACCEPTABLE')
                    : (isAr ? 'القرار: مقبول هندسياً (ACCEPTED / COMPLIANT)' : 'VERDICT: ACCEPTED / COMPLIANT')}
                </div>
                <p className="text-xs sm:text-sm mt-1.5 leading-relaxed text-slate-300">
                  {codeExplanation}
                </p>
              </div>
            </div>

            <div className="shrink-0 p-3 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-center">
              <div className="text-[10px] text-slate-500">{isAr ? 'طبيعة المؤشر:' : 'Indication Type:'}</div>
              <div className="text-base font-bold text-amber-400">{currentFlaw.category}</div>
              <div className="text-[10px] text-slate-400 mt-1">L = {measuredFlawLengthMm} mm</div>
            </div>
          </div>

          {/* Flaw Sizing & Length Measurement Slider (6 dB Drop Technique) */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>{isAr ? 'قياس طول العيب بطريقة انخفاض 6 ديسيبل (6 dB Drop Technique):' : 'Flaw Length Sizing via 6 dB Drop Technique:'}</span>
              </span>
              <span className="text-cyan-400 font-bold">{measuredFlawLengthMm.toFixed(1)} mm</span>
            </div>

            <input
              type="range"
              min="2"
              max="35"
              step="0.5"
              value={measuredFlawLengthMm}
              onChange={(e) => setMeasuredFlawLengthMm(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />

            <div className="flex justify-between text-[11px] text-slate-400 pt-1">
              <span>2 mm (Minor pore)</span>
              <span>6 mm (ASME Max Slag Limit for 25mm t)</span>
              <span>35 mm (Continuous Crack)</span>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: OFFICIAL NDT INSPECTION REPORT GENERATOR */}
      {activeStep === 'report' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <span>{isAr ? 'تقرير الفحص الهندسي المعتمد بالموجات فوق الصوتية' : 'Official Ultrasonic Examination Test Report'}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {isAr
                  ? 'نموذج تقرير NDT رسمي مطابق لمتطلبات ASME Section V Article 4 و ISO 17640.'
                  : 'Certified NDT inspection report compliant with ASME Sec V Article 4 & ISO 17640.'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition cursor-pointer flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>{isAr ? 'طباعة / تصدير PDF' : 'Print / Export PDF'}</span>
            </button>
          </div>

          {/* Certificate Table View */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-6">
            {/* Header info */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4 border-b border-slate-800 text-[11px]">
              <div>
                <span className="text-slate-500 block">Report Number:</span>
                <span className="text-white font-bold">INSCO-UT-2026-0428</span>
              </div>
              <div>
                <span className="text-slate-500 block">Inspection Date:</span>
                <span className="text-white font-bold">October 23, 2026</span>
              </div>
              <div>
                <span className="text-slate-500 block">Client / Facility:</span>
                <span className="text-white font-bold">Egyptian Refining Co. (ERC)</span>
              </div>
              <div>
                <span className="text-slate-500 block">Code & Standard:</span>
                <span className="text-cyan-400 font-bold">{codeClauseCitation}</span>
              </div>
            </div>

            {/* Equipment & Calibration details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4 border-b border-slate-800 text-[11px]">
              <div>
                <span className="text-slate-500 block">Flaw Detector:</span>
                <span className="text-slate-200">Krautkrämer USM 35X</span>
              </div>
              <div>
                <span className="text-slate-500 block">Transducer:</span>
                <span className="text-slate-200">{probeAngleDeg}° Shear Wave (4 MHz)</span>
              </div>
              <div>
                <span className="text-slate-500 block">Calibration Block:</span>
                <span className="text-slate-200">ASME Sec V Basic Block (SDH)</span>
              </div>
              <div>
                <span className="text-slate-500 block">Velocity & Delay:</span>
                <span className="text-slate-200">{velocityMs} m/s · {zeroDelayUs} µs</span>
              </div>
            </div>

            {/* Indications Findings Table */}
            <div>
              <div className="font-bold text-white mb-2 uppercase tracking-wider text-xs">
                {isAr ? 'جدول نتائج الفحص للمؤشرات المكتشفة:' : 'Recorded Ultrasonic Indications Table:'}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-slate-800">
                  <thead>
                    <tr className="bg-slate-900 text-slate-400 text-[10px]">
                      <th className="p-2 border border-slate-800">#</th>
                      <th className="p-2 border border-slate-800">Discontinuity</th>
                      <th className="p-2 border border-slate-800">Type</th>
                      <th className="p-2 border border-slate-800">Sound Path (S)</th>
                      <th className="p-2 border border-slate-800">True Depth (D)</th>
                      <th className="p-2 border border-slate-800">Length (L)</th>
                      <th className="p-2 border border-slate-800">% DAC</th>
                      <th className="p-2 border border-slate-800">Disposition</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-slate-300">
                      <td className="p-2 border border-slate-800">1</td>
                      <td className="p-2 border border-slate-800 font-bold text-white">{currentFlaw.name.en}</td>
                      <td className="p-2 border border-slate-800">{currentFlaw.category}</td>
                      <td className="p-2 border border-slate-800">{calculatedSoundPathMm.toFixed(1)} mm</td>
                      <td className="p-2 border border-slate-800">{calculatedDepthMm.toFixed(1)} mm</td>
                      <td className="p-2 border border-slate-800">{measuredFlawLengthMm} mm</td>
                      <td className="p-2 border border-slate-800 font-bold text-amber-400">{echoAmplitudePct}%</td>
                      <td className="p-2 border border-slate-800">
                        <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${isCodeReject ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                          {isCodeReject ? 'REJECT' : 'ACCEPT'}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Inspector Sign-off */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800 text-[11px]">
              <div>
                <span className="text-slate-500 block">ASNT NDT Level II Inspector:</span>
                <span className="text-white font-bold">Eng. Ahmed M. (Cert # UT-20419)</span>
              </div>
              <div className="text-end">
                <span className="text-slate-500 block">Third Party QA/QC Stamp:</span>
                <span className="text-emerald-400 font-bold">VERIFIED & ACCREDITED (ISO 9712)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
