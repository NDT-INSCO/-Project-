import React, { useState, useMemo } from 'react';
import { 
  Activity, 
  Flame, 
  Layers, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  RotateCcw, 
  Maximize2, 
  Eye, 
  Sun, 
  Moon, 
  Zap, 
  Thermometer, 
  Gauge, 
  Compass, 
  Sparkles,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { Language } from '../../types';
import { WORKSHOP_LABS } from '../../data/academyCurriculum';

interface InteractiveWorkshopsProps {
  language: Language;
}

export const InteractiveWorkshops: React.FC<InteractiveWorkshopsProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [activeLabId, setActiveLabId] = useState<string>('ut_lab');

  // ==========================================
  // LAB 1: UT A-Scan & Angle Beam Simulator
  // ==========================================
  const [probePositionX, setProbePositionX] = useState<number>(38); // mm from weld center
  const [probeAngle, setProbeAngle] = useState<number>(60); // 45, 60, 70 deg
  const [probeFreq, setProbeFreq] = useState<number>(4); // MHz
  const [utGainDb, setUtGainDb] = useState<number>(48); // dB
  const [plateThickness, setPlateThickness] = useState<number>(20); // mm

  // Simulated internal flaw at weld center (X=0, Depth=14mm)
  const flaw = { x: 0, depth: 14, height: 3.5, type: isAr ? 'نقص تغلغل في الجذر (Lack of Root Penetration)' : 'Lack of Root Penetration' };

  // Calculate beam acoustics
  const utCalculations = useMemo(() => {
    const angleRad = (probeAngle * Math.PI) / 180;
    // Expected distance from probe index to reach depth=14 at weld center:
    const idealSurfaceDist = flaw.depth * Math.tan(angleRad);
    const deltaDist = Math.abs(probePositionX - idealSurfaceDist);
    
    // Soundpath S
    const soundpath = flaw.depth / Math.cos(angleRad);
    
    // Signal amplitude based on beam alignment & gain
    const beamHalfWidth = 6; // mm
    const alignmentFactor = Math.max(0, 1 - (deltaDist / beamHalfWidth));
    const normalizedGain = Math.min(1.5, Math.max(0.1, (utGainDb - 20) / 30));
    const defectEchoHeight = Math.round(alignmentFactor * 85 * normalizedGain); // % FSH (Full Screen Height)
    
    // DAC Curve reference line at this soundpath
    const dacPercent = Math.max(25, Math.round(75 * Math.pow(25 / Math.max(25, soundpath), 0.6)));

    // Disposition
    const isAboveDac = defectEchoHeight >= dacPercent;
    const isRecordable = defectEchoHeight >= (dacPercent * 0.5);

    return {
      idealSurfaceDist: Math.round(idealSurfaceDist),
      actualSoundpath: Math.round(soundpath * 10) / 10,
      defectEchoHeight: Math.min(105, defectEchoHeight),
      dacPercent,
      isAboveDac,
      isRecordable,
      deltaDist: Math.round(deltaDist * 10) / 10
    };
  }, [probePositionX, probeAngle, utGainDb, plateThickness]);

  // ==========================================
  // LAB 2: PT & MT Darkroom Simulator
  // ==========================================
  const [testMethod, setTestMethod] = useState<'PT' | 'MT'>('MT');
  const [uvLightMode, setUvLightMode] = useState<boolean>(true); // UV vs White light
  const [yokePowerOn, setYokePowerOn] = useState<boolean>(true);
  const [ptCurrentStep, setPtCurrentStep] = useState<number>(4); // 0 to 5

  const ptSteps = [
    { titleAr: '1. التنظيف المسبق وإزالة الزيوت', titleEn: '1. Solvent Pre-cleaning', descAr: 'إزالة الشحوم والأتربة ورش مذيب التنظيف والتجفيف بالهواء', descEn: 'Remove grease/dirt using cleaner spray and dry surface' },
    { titleAr: '2. رش السائل النافذ الفلوري', titleEn: '2. Penetrant Application', descAr: 'تطبيق السائل وتركه لمدة زمن المكوث Dwell Time (15 دقيقة) للتغلغل الشعري', descEn: 'Apply penetrant and allow 15 min dwell time for capillary ingress' },
    { titleAr: '3. إزالة السائل النافذ الفائض', titleEn: '3. Excess Penetrant Removal', descAr: 'مسح السطح بقماش خالي من الوبر مشبع بالمذيب دون غسيل مفرط', descEn: 'Wipe surface with lint-free cloth moistened with solvent' },
    { titleAr: '4. رش المظهر الكيميائي (Developer)', titleEn: '4. Non-aqueous Developer', descAr: 'رش طبقة بيضاء رقيقة تعمل كإسفنجة تسحب السائل النافذ من الشروخ', descEn: 'Spray thin uniform white coating acting as blotter' },
    { titleAr: '5. المعاينة تحت الضوء الأسود (Inspection)', titleEn: '5. UV Darkroom Inspection', descAr: 'فحص الشروخ المضيئة تحت ضوء UV-A بطول موجي 365 نانومتر', descEn: 'Examine glowing fluorescent indications under 365nm black light' }
  ];

  // ==========================================
  // LAB 3: RT Radiographic Film & Densitometer
  // ==========================================
  const [illuminatorLux, setIlluminatorLux] = useState<number>(65); // %
  const [densitometerTarget, setDensitometerTarget] = useState<'base' | 'weld_cap' | 'crack' | 'porosity' | 'iqi'>('crack');

  const rtSpots = {
    base: { nameAr: 'المعدن الأساسي (Base Metal)', nameEn: 'Base Metal', density: 2.55, status: 'Acceptable', noteAr: 'كثافة قياسية مثالية للمعدن الأساسي (المسموح 1.8 إلى 4.0)', noteEn: 'Standard background density within ASME V limits (1.8 - 4.0)' },
    weld_cap: { nameAr: 'تاج اللحام السميك (Weld Crown)', nameEn: 'Weld Crown Reinforcement', density: 2.12, status: 'Acceptable', noteAr: 'كثافة أفتح نتيجة زيادة سماكة المعدن الملحوم', noteEn: 'Lighter tone due to increased cumulative metal thickness' },
    crack: { nameAr: 'شرخ طولي متفرع (Longitudinal Crack)', nameEn: 'Longitudinal Crack', density: 3.42, status: 'REJECTED', noteAr: 'كثافة داكنة حادة غير مسموحة طبقاً لـ ASME B31.3 و Sec VIII (مرفوض قطعاً)', noteEn: 'Sharp dark linear density, strictly rejectable per ASME codes' },
    porosity: { nameAr: 'مسامية غازية دائرية (Gas Porosity)', nameEn: 'Gas Porosity Nest', density: 3.15, status: 'Evaluated', noteAr: 'فقاعات دائرية قطرها 1.2 ملم - تقع ضمن الحدود المسموحة بالجدول', noteEn: 'Isolated spherical pores (1.2mm dia) within code limits' },
    iqi: { nameAr: 'سلك مقياس جودة الصورة (Wire IQI #10)', nameEn: 'Image Quality Wire (#10)', density: 2.48, status: 'Verified', noteAr: 'السلك الحساس مرئي بوضوح مما يؤكد حساسية الفحص الراديوجرافي 2%', noteEn: 'Designated wire is clearly discernible, confirming 2% radiographic sensitivity' }
  };

  // ==========================================
  // LAB 4: Welding Gauge & Heat Input Studio
  // ==========================================
  const [weldingVoltage, setWeldingVoltage] = useState<number>(24); // Volts
  const [weldingCurrent, setWeldingCurrent] = useState<number>(140); // Amps
  const [travelSpeed, setTravelSpeed] = useState<number>(180); // mm/min
  const [processEfficiency, setProcessEfficiency] = useState<number>(0.8); // 0.8 for SMAW, 0.6 for GTAW
  const [gaugeHiLo, setGaugeHiLo] = useState<number>(1.5); // mm
  const [gaugeUndercut, setGaugeUndercut] = useState<number>(0.6); // mm
  const [gaugeCapHeight, setGaugeCapHeight] = useState<number>(2.2); // mm

  // Heat Input Formula: HI = (V * I * 60) / (v * 1000) * efficiency (kJ/mm)
  const heatInputKjMm = useMemo(() => {
    const hi = ((weldingVoltage * weldingCurrent * 60) / (travelSpeed * 1000)) * processEfficiency;
    return Math.round(hi * 100) / 100;
  }, [weldingVoltage, weldingCurrent, travelSpeed, processEfficiency]);

  // ==========================================
  // LAB 5: API 510/570 Vessel Remaining Life Lab
  // ==========================================
  const [designPressurePsi, setDesignPressurePsi] = useState<number>(350); // psi
  const [vesselInsideRadiusIn, setVesselInsideRadiusIn] = useState<number>(24); // inches (48" ID)
  const [allowableStressPsi, setAllowableStressPsi] = useState<number>(17500); // psi (SA-516 Gr 70)
  const [jointEfficiency, setJointEfficiency] = useState<number>(1.0); // 1.0 or 0.85
  const [nominalThicknessMm, setNominalThicknessMm] = useState<number>(16.0); // mm
  const [actualThicknessMm, setActualThicknessMm] = useState<number>(13.2); // mm
  const [yearsInService, setYearsInService] = useState<number>(8); // years

  const apiCalculations = useMemo(() => {
    // ASME UG-27 formula: t_min = (P * R) / (S * E - 0.6 * P) in inches, then converted to mm
    const tMinInches = (designPressurePsi * vesselInsideRadiusIn) / (allowableStressPsi * jointEfficiency - 0.6 * designPressurePsi);
    const tMinMm = Math.round(tMinInches * 25.4 * 10) / 10;
    
    // Corrosion rate: CR = (t_nominal - t_actual) / years
    const metalLossMm = Math.max(0, nominalThicknessMm - actualThicknessMm);
    const corrosionRateMmYear = yearsInService > 0 ? Math.round((metalLossMm / yearsInService) * 1000) / 1000 : 0.05;
    
    // Remaining life: RL = (t_actual - t_min) / CR
    const remainingCorrosionAllowance = Math.max(0, actualThicknessMm - tMinMm);
    const remainingLifeYears = corrosionRateMmYear > 0 ? Math.round((remainingCorrosionAllowance / corrosionRateMmYear) * 10) / 10 : 99;
    
    // Next inspection interval (half remaining life or 10 years, whichever is less)
    const nextInspectionInterval = Math.min(10, Math.max(1, Math.round((remainingLifeYears / 2) * 10) / 10));

    return {
      tMinMm,
      corrosionRateMmYear,
      remainingCorrosionAllowance: Math.round(remainingCorrosionAllowance * 10) / 10,
      remainingLifeYears,
      nextInspectionInterval,
      isRetirementThreat: actualThicknessMm <= tMinMm
    };
  }, [designPressurePsi, vesselInsideRadiusIn, allowableStressPsi, jointEfficiency, nominalThicknessMm, actualThicknessMm, yearsInService]);

  // ==========================================
  // LAB 6: Protective Coating & Dew Point Lab
  // ==========================================
  const [ambientTempC, setAmbientTempC] = useState<number>(28); // °C
  const [relativeHumidityPercent, setRelativeHumidityPercent] = useState<number>(68); // %
  const [steelSurfaceTempC, setSteelSurfaceTempC] = useState<number>(31); // °C
  const [dftSpotReading, setDftSpotReading] = useState<number>(245); // µm (Nominal 250 µm)

  const coatingCalculations = useMemo(() => {
    // Magnus-Tetens formula for Dew Point:
    const a = 17.27;
    const b = 237.7;
    const alpha = ((a * ambientTempC) / (b + ambientTempC)) + Math.log(relativeHumidityPercent / 100.0);
    const dewPointC = Math.round(((b * alpha) / (a - alpha)) * 10) / 10;
    
    const deltaT = Math.round((steelSurfaceTempC - dewPointC) * 10) / 10;
    const isSafeToCoat = deltaT >= 3.0; // Critical 3°C delta rule
    
    // SSPC-PA 2 80/20 rule: Individual spot reading must be at least 80% of specified 250 µm (200 µm)
    const minAllowableDft = 250 * 0.8; // 200 µm
    const maxAllowableDft = 250 * 1.2; // 300 µm
    const isDftCompliant = dftSpotReading >= minAllowableDft && dftSpotReading <= maxAllowableDft;

    return {
      dewPointC,
      deltaT,
      isSafeToCoat,
      minAllowableDft,
      maxAllowableDft,
      isDftCompliant
    };
  }, [ambientTempC, relativeHumidityPercent, steelSurfaceTempC, dftSpotReading]);

  return (
    <div className="space-y-8">
      {/* Workshop Navigation Bar */}
      <div className="bg-[#0b0c1c] p-4 sm:p-5 rounded-2xl border border-[#212752] shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono-code text-amber-400 font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{isAr ? 'الورش الافتراضية التفاعلية لعلوم الفحص' : 'Interactive Virtual Inspection Workbenches'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {isAr ? 'معامل المحاكاة الهندسية وتطبيق الأكواد الميدانية' : 'Hands-on Engineering Simulators & Code Labs'}
            </h3>
          </div>
          <span className="text-xs font-mono-code px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold">
            6 WORKBENCHES AVAILABLE
          </span>
        </div>

        {/* Lab selector tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {WORKSHOP_LABS.map((lab) => {
            const isSelected = activeLabId === lab.id;
            return (
              <button
                key={lab.id}
                onClick={() => setActiveLabId(lab.id)}
                className={`text-start p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-lg shadow-amber-500/20 scale-[1.02]'
                    : 'bg-[#121535] text-slate-300 border-[#232958] hover:bg-[#1a1f48] hover:text-white'
                }`}
              >
                <div className="text-[10px] uppercase font-mono-code tracking-wider opacity-80 mb-1">
                  {lab.badge}
                </div>
                <div className="text-xs line-clamp-2 leading-tight">
                  {isAr ? lab.titleAr.split('(')[0] : lab.titleEn.split('(')[0]}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* WORKBENCH 1: ULTRASONIC TESTING (UT) A-SCAN SIMULATOR                      */}
      {/* ========================================================================= */}
      {activeLabId === 'ut_lab' && (
        <div className="bg-[#10132b] p-6 sm:p-8 rounded-2xl border-2 border-amber-500/40 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#212752]">
            <div>
              <span className="text-xs font-mono-code text-amber-400 font-bold uppercase tracking-wider">
                CONVENTIONAL NDT WORKBENCH 01
              </span>
              <h4 className="text-2xl font-black text-white mt-1">
                {isAr ? 'محاكي جهاز الموجات فوق الصوتية A-Scan ومعايرة DAC' : 'Ultrasonic A-Scan & Distance Amplitude Correction (DAC)'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {isAr
                  ? 'حرك المسبار على شطبة اللحام لكشف عيب نقص التغلغل بالعمق، ومراقبة ارتفاع النبضة الصوتية بالنسبة لمنحنى الـ DAC.'
                  : 'Slide angle beam transducer to intercept lack-of-penetration root defect and compare peak echo against ASME DAC.'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono-code px-3 py-1 rounded-lg bg-[#181d45] text-sky-300 border border-sky-500/30 font-bold">
                ASME Section V Art. 4
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: CRT Oscilloscope Screen Graphic */}
            <div className="lg:col-span-7 bg-[#05060f] p-5 rounded-2xl border-2 border-emerald-500/40 shadow-inner space-y-4">
              <div className="flex items-center justify-between text-xs font-mono-code text-emerald-400 border-b border-emerald-500/30 pb-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  DIGITAL FLAW DETECTOR CRT (EPOCH / OLYMPUS STYLE)
                </span>
                <span>RANGE: 100 mm | V: 3240 m/s</span>
              </div>

              {/* The SVG Oscilloscope Display */}
              <div className="relative w-full aspect-[16/10] bg-[#030a06] rounded-xl overflow-hidden border border-emerald-500/50">
                {/* CRT Screen Grid */}
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="utGrid" width="10%" height="10%" patternUnits="userSpaceOnUse">
                      <path d="M 0 0 L 100 0 0 100 0 0" fill="none" stroke="#052e16" strokeWidth="0.5" strokeDasharray="2,2" />
                      <line x1="0" y1="0" x2="100%" y2="0" stroke="#064e3b" strokeWidth="0.6" strokeDasharray="3,3" />
                      <line x1="0" y1="0" x2="0" y2="100%" stroke="#064e3b" strokeWidth="0.6" strokeDasharray="3,3" />
                    </pattern>
                    <linearGradient id="glowEcho" x1="0" y1="1" x2="0" y2="0">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#34d399" stopOpacity="0.9" />
                    </linearGradient>
                  </defs>

                  <rect width="100%" height="100%" fill="url(#utGrid)" />

                  {/* 100% Full Screen Height reference line */}
                  <line x1="0" y1="10%" x2="100%" y2="10%" stroke="#ef4444" strokeWidth="1" strokeDasharray="4,4" />
                  <text x="98%" y="9%" fill="#ef4444" fontSize="9" textAnchor="end" fontFamily="monospace">100% FSH</text>

                  {/* 80% Screen Calibration line */}
                  <line x1="0" y1="28%" x2="100%" y2="28%" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="4,4" />
                  <text x="98%" y="27%" fill="#f59e0b" fontSize="8" textAnchor="end" fontFamily="monospace">80% DAC REF</text>

                  {/* DAC (Distance Amplitude Correction) Curve */}
                  <path
                    d="M 50 25 Q 180 80 380 140"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2"
                  />
                  <text x="320" y="130" fill="#f59e0b" fontSize="9" fontFamily="monospace" fontWeight="bold">100% DAC CURVE</text>

                  {/* 50% DAC Evaluation Line */}
                  <path
                    d="M 50 110 Q 180 145 380 180"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="1"
                    strokeDasharray="3,3"
                  />
                  <text x="320" y="172" fill="#d97706" fontSize="8" fontFamily="monospace">50% EVALUATION LINE</text>

                  {/* Initial Pulse at Soundpath = 0 */}
                  <path d="M 5 200 L 12 40 L 18 200 L 22 170 L 26 200" fill="none" stroke="#34d399" strokeWidth="2.5" />

                  {/* Dynamic Defect Echo Spike */}
                  {utCalculations.defectEchoHeight > 5 && (
                    <g>
                      {/* X position maps to soundpath approx 28mm -> x=120 */}
                      <path
                        d={`M 110 200 L 122 ${200 - (utCalculations.defectEchoHeight * 1.8)} L 134 200`}
                        fill="url(#glowEcho)"
                        stroke="#34d399"
                        strokeWidth="3"
                      />
                      {/* Peak Echo Marker */}
                      <circle cx="122" cy={200 - (utCalculations.defectEchoHeight * 1.8)} r="3" fill="#ffffff" />
                      <text
                        x="125"
                        y={Math.max(25, 195 - (utCalculations.defectEchoHeight * 1.8))}
                        fill="#34d399"
                        fontSize="10"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {utCalculations.defectEchoHeight}% FSH ({utCalculations.actualSoundpath} mm)
                      </text>
                    </g>
                  )}

                  {/* Ground Base Line */}
                  <line x1="0" y1="200" x2="100%" y2="200" stroke="#10b981" strokeWidth="2" />
                </svg>

                {/* Status Overlay Badge inside screen */}
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm border border-emerald-500/40 p-2.5 rounded-lg text-[11px] font-mono-code space-y-1">
                  <div className="text-emerald-400 font-bold">
                    SOUNDPATH (S): <span className="text-white">{utCalculations.actualSoundpath} mm</span>
                  </div>
                  <div className="text-emerald-400 font-bold">
                    DEPTH (D): <span className="text-white">{flaw.depth} mm</span>
                  </div>
                  <div className="text-emerald-400 font-bold">
                    SURFACE DIST (X): <span className="text-white">{probePositionX} mm</span>
                  </div>
                  <div className="text-emerald-400 font-bold">
                    AMPLITUDE: <span className={utCalculations.isAboveDac ? 'text-rose-400' : 'text-amber-300'}>{utCalculations.defectEchoHeight}% FSH</span>
                  </div>
                </div>

                {/* Defect disposition flag */}
                <div className="absolute bottom-3 right-3">
                  {utCalculations.isAboveDac ? (
                    <span className="px-3 py-1.5 rounded-md bg-rose-600/90 text-white font-mono-code text-xs font-bold shadow-lg flex items-center gap-1.5 animate-pulse">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      REJECTABLE DISCONTINUITY (Above DAC)
                    </span>
                  ) : utCalculations.isRecordable ? (
                    <span className="px-3 py-1.5 rounded-md bg-amber-500/90 text-slate-950 font-mono-code text-xs font-bold shadow-lg flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5" />
                      RECORDABLE INDICATION (50%-100% DAC)
                    </span>
                  ) : (
                    <span className="px-3 py-1.5 rounded-md bg-emerald-600/90 text-white font-mono-code text-xs font-bold shadow-lg flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      ACCEPTABLE / NO FLAW DETECTED
                    </span>
                  )}
                </div>
              </div>

              {/* Physical Weld & Probe Cross-Section Diagram */}
              <div className="p-3 bg-[#0a0d24] rounded-xl border border-[#232a5c]">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  {isAr ? 'الرسم الهندسي المقطعي: مسبار الزاوية على وصلة اللحام' : 'Cross-Section: Angle Beam Probe on Weldment'}
                </div>
                <svg viewBox="0 0 300 90" className="w-full h-24 bg-[#070818] rounded-lg">
                  {/* Steel Plate Top & Bottom Faces */}
                  <rect x="10" y="20" width="280" height="50" fill="#1e244d" stroke="#3b467e" strokeWidth="1" />
                  
                  {/* Weld Geometry V-Bevel */}
                  <polygon points="135,20 165,20 152,70 148,70" fill="#2d376d" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2,2" />
                  
                  {/* Flaw at root (depth 14 in 20mm plate = near bottom) */}
                  <ellipse cx="150" cy="55" rx="3" ry="1.5" fill="#ef4444" />
                  <line x1="148" y1="55" x2="152" y2="55" stroke="#ffffff" strokeWidth="1" />

                  {/* Ultrasonic Transducer Wedge */}
                  {/* X maps to 150 + probePositionX */}
                  <polygon
                    points={`${150 + probePositionX - 12},20 ${150 + probePositionX + 12},20 ${150 + probePositionX + 6},5 ${150 + probePositionX - 6},5`}
                    fill="#f59e0b"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  <text x={150 + probePositionX} y="15" fill="#000" fontSize="7" fontWeight="bold" textAnchor="middle">
                    {probeAngle}°
                  </text>

                  {/* Acoustic Sound Beam Line */}
                  <line
                    x1={150 + probePositionX}
                    y1="20"
                    x2={150 + probePositionX - (35 * Math.tan((probeAngle * Math.PI) / 180))}
                    y2="55"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeDasharray="3,3"
                  />
                  <line
                    x1="150"
                    y1="10"
                    x2="150"
                    y2="80"
                    stroke="#64748b"
                    strokeWidth="0.8"
                    strokeDasharray="2,2"
                  />
                  <text x="150" y="86" fill="#94a3b8" fontSize="7" textAnchor="middle">Weld Centerline (X=0)</text>
                </svg>
              </div>
            </div>

            {/* Right: Instrument Physical Controls */}
            <div className="lg:col-span-5 bg-[#0b0c1c] p-6 rounded-2xl border border-[#232958] space-y-5">
              <div className="border-b border-[#212752] pb-3">
                <span className="text-xs font-mono-code text-amber-400 font-bold">OPERATOR CONTROLS</span>
                <h5 className="text-lg font-black text-white">{isAr ? 'لوحة تحكم ومعايرة الفاحص' : 'Inspector Calibration Panel'}</h5>
              </div>

              {/* Probe Position Slider */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-300">{isAr ? 'موقع المسبار من سنتر اللحام (X):' : 'Probe Distance from Center (X):'}</span>
                  <span className="text-amber-400 font-mono-code">{probePositionX} mm</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="65"
                  value={probePositionX}
                  onChange={(e) => setProbePositionX(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono-code mt-0.5">
                  <span>10 mm (Over weld)</span>
                  <span className="text-emerald-400">Target ~{utCalculations.idealSurfaceDist} mm</span>
                  <span>65 mm (Far field)</span>
                </div>
              </div>

              {/* Probe Angle Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  {isAr ? 'زاوية إسفين المسبار (Refracted Angle):' : 'Transducer Wedge Angle:'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[45, 60, 70].map((angle) => (
                    <button
                      key={angle}
                      onClick={() => setProbeAngle(angle)}
                      className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        probeAngle === angle
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-black'
                          : 'bg-[#14173b] text-slate-300 border-[#232a5c] hover:bg-[#1a1f48]'
                      }`}
                    >
                      {angle}° Angle Beam
                    </button>
                  ))}
                </div>
              </div>

              {/* Gain dB Slider */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-300">{isAr ? 'كسب الجهاز (System Gain dB):' : 'Gain (dB):'}</span>
                  <span className="text-amber-400 font-mono-code">{utGainDb} dB</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="70"
                  value={utGainDb}
                  onChange={(e) => setUtGainDb(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Educational Rule Box */}
              <div className="bg-[#121638] p-4 rounded-xl border border-amber-500/30 text-xs space-y-2">
                <div className="font-bold text-amber-400 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-amber-400" />
                  <span>{isAr ? 'قاعدة ASME Sec V Art. 4 لتقييم العيوب:' : 'ASME Sec V Art. 4 Acceptance Rule:'}</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {isAr
                    ? 'أي إشارة صوتية تتجاوز منحنى الـ 100% DAC تعتبر عيباً يستوجب الرفض إذا كانت مستوية (Planar كالشرخ أو نقص التغلغل). أما الإشارات بين 50% و 100% DAC فيتم توثيقها وقياس طولها بتقنية هبوط الـ 6 ديسيبل (6dB Drop).'
                    : 'Any acoustic indication exceeding 100% DAC is subject to rejection evaluation if planar (crack, lack of fusion). Signals between 50% and 100% must be recorded and evaluated using 6dB drop sizing.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* WORKBENCH 2: PT & MT DARKROOM INSPECTION LAB                              */}
      {/* ========================================================================= */}
      {activeLabId === 'pt_mt_darkroom' && (
        <div className="bg-[#10132b] p-6 sm:p-8 rounded-2xl border-2 border-amber-500/40 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#212752]">
            <div>
              <span className="text-xs font-mono-code text-amber-400 font-bold uppercase tracking-wider">
                CONVENTIONAL NDT WORKBENCH 02
              </span>
              <h4 className="text-2xl font-black text-white mt-1">
                {isAr ? 'مختبر السائل النافذ والجسيمات المغناطيسية والغرفة المظلمة' : 'Fluorescent PT & MT Darkroom Inspection Laboratory'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {isAr
                  ? 'اختبر العينات تحت الضوء الأبيض ثم بدّل إلى الضوء فوق البنفسجي UV-A وشاهد توهج شروخ الإجهاد الدقيقة تحت تأثير المجال المغناطيسي والخاصية الشعرية.'
                  : 'Toggle between White Light and UV-A (365nm) black light to witness fluorescent indications glowing brightly under magnetic field leakage.'}
              </p>
            </div>
            {/* Method switch */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTestMethod('MT')}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                  testMethod === 'MT'
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                    : 'bg-[#151940] text-slate-300 border-[#232958]'
                }`}
              >
                MT (Magnetic Particle)
              </button>
              <button
                onClick={() => setTestMethod('PT')}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                  testMethod === 'PT'
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                    : 'bg-[#151940] text-slate-300 border-[#232958]'
                }`}
              >
                PT (Liquid Penetrant)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Darkroom Visual Specimen View */}
            <div className={`lg:col-span-7 p-6 rounded-2xl border-2 transition-all ${
              uvLightMode
                ? 'bg-[#03030c] border-purple-500/50 shadow-2xl shadow-purple-900/30'
                : 'bg-[#131630] border-slate-600'
            }`}>
              {/* Darkroom header bar */}
              <div className="flex items-center justify-between text-xs font-mono-code mb-4">
                <span className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${uvLightMode ? 'bg-purple-500 animate-pulse' : 'bg-amber-400'}`}></span>
                  <span className={uvLightMode ? 'text-purple-300 font-bold' : 'text-slate-200'}>
                    {uvLightMode ? 'UV-A BLACK LIGHT ACTIVE (365 nm / 1200 µW/cm²)' : 'VISIBLE WHITE LIGHT ACTIVE (1100 Lux)'}
                  </span>
                </span>
                <button
                  onClick={() => setUvLightMode(!uvLightMode)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                    uvLightMode
                      ? 'bg-purple-600 text-white hover:bg-purple-500'
                      : 'bg-amber-500 text-slate-950 hover:bg-amber-400 font-black'
                  }`}
                >
                  {uvLightMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                  <span>{uvLightMode ? 'Switch to White Light' : 'Switch to UV Darkroom'}</span>
                </button>
              </div>

              {/* The Interactive Specimen Canvas */}
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-[#232a5c] flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
                  {/* Steel Plate Specimen */}
                  <rect
                    x="40"
                    y="30"
                    width="320"
                    height="160"
                    rx="8"
                    fill={uvLightMode ? '#080816' : '#334155'}
                    stroke={uvLightMode ? '#1e1b4b' : '#64748b'}
                    strokeWidth="2"
                  />

                  {/* Weld Bead Crown */}
                  <path
                    d="M 200 30 C 208 50 192 70 200 90 C 208 110 192 130 200 150 C 208 170 192 180 200 190"
                    fill="none"
                    stroke={uvLightMode ? '#13142e' : '#475569'}
                    strokeWidth="28"
                    strokeLinecap="round"
                  />

                  {/* Weld Ripple Texture */}
                  {[45, 65, 85, 105, 125, 145, 165, 180].map((yVal, i) => (
                    <path
                      key={i}
                      d={`M 188 ${yVal} Q 200 ${yVal + 8} 212 ${yVal}`}
                      fill="none"
                      stroke={uvLightMode ? '#1e214d' : '#64748b'}
                      strokeWidth="1.5"
                    />
                  ))}

                  {/* MT Yoke Poles if MT is active */}
                  {testMethod === 'MT' && (
                    <g>
                      {/* Left Yoke Leg (North Pole) */}
                      <rect x="70" y="60" width="35" height="100" rx="4" fill="#d97706" stroke="#ffffff" strokeWidth="1.5" />
                      <text x="87" y="115" fill="#000000" fontSize="14" fontWeight="bold" textAnchor="middle">N</text>

                      {/* Right Yoke Leg (South Pole) */}
                      <rect x="295" y="60" width="35" height="100" rx="4" fill="#d97706" stroke="#ffffff" strokeWidth="1.5" />
                      <text x="312" y="115" fill="#000000" fontSize="14" fontWeight="bold" textAnchor="middle">S</text>

                      {/* Magnetic flux lines when Yoke is ON */}
                      {yokePowerOn && (
                        <g opacity="0.6">
                          <path d="M 105 80 Q 200 45 295 80" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4,4" />
                          <path d="M 105 110 Q 200 110 295 110" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5,5" />
                          <path d="M 105 140 Q 200 175 295 140" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4,4" />
                        </g>
                      )}
                    </g>
                  )}

                  {/* Defect: Fatigue Toe Crack along Weld Bead */}
                  {/* Under UV + Yoke Power (or PT developer step): Bright Neon Glowing Crack */}
                  {((testMethod === 'MT' && yokePowerOn) || (testMethod === 'PT' && ptCurrentStep >= 4)) ? (
                    uvLightMode ? (
                      <g>
                        {/* Glow filter behind crack */}
                        <path
                          d="M 186 95 Q 183 110 188 125 T 184 140"
                          fill="none"
                          stroke="#39ff14"
                          strokeWidth="8"
                          opacity="0.4"
                          filter="blur(3px)"
                        />
                        {/* Sharp Neon Fluorescent Crack Line */}
                        <path
                          d="M 186 95 Q 183 110 188 125 T 184 140"
                          fill="none"
                          stroke="#a3e635"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <circle cx="186" cy="95" r="2.5" fill="#ffffff" />
                        <circle cx="184" cy="140" r="2.5" fill="#ffffff" />
                        {/* Callout line */}
                        <line x1="184" y1="120" x2="140" y2="120" stroke="#a3e635" strokeWidth="1.2" />
                        <text x="135" y="123" fill="#a3e635" fontSize="10" fontWeight="bold" textAnchor="end" fontFamily="monospace">
                          WELD TOE CRACK (18mm)
                        </text>
                      </g>
                    ) : (
                      <g>
                        {/* Under visible light: faint red/black indication */}
                        <path
                          d="M 186 95 Q 183 110 188 125 T 184 140"
                          fill="none"
                          stroke={testMethod === 'PT' ? '#dc2626' : '#0f172a'}
                          strokeWidth="2.5"
                        />
                        <text x="135" y="123" fill="#e2e8f0" fontSize="9" fontWeight="bold" textAnchor="end" fontFamily="monospace">
                          {testMethod === 'PT' ? 'DYE BLEED-OUT' : 'MAGNETIC BUILDUP'}
                        </text>
                      </g>
                    )
                  ) : (
                    /* Crack is hidden under metal without yoke/developer */
                    <g opacity="0.15">
                      <path d="M 186 95 Q 183 110 188 125 T 184 140" fill="none" stroke="#64748b" strokeWidth="0.8" />
                    </g>
                  )}
                </svg>

                {/* Darkroom Bottom Banner */}
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] font-mono-code bg-black/80 backdrop-blur-sm p-2 rounded-lg border border-[#232958]">
                  <span className="text-slate-300">
                    STATUS: <span className="text-white font-bold">{((testMethod === 'MT' && yokePowerOn) || (testMethod === 'PT' && ptCurrentStep >= 4)) ? 'DEFECT REVEALED (Toe Crack)' : 'FLAW HIDDEN (Awaiting Energy/Dwell)'}</span>
                  </span>
                  <span className={uvLightMode ? 'text-purple-400 font-bold' : 'text-amber-400 font-bold'}>
                    {uvLightMode ? 'FLUORESCENT PARTICLES ACTIVE' : 'VISIBLE CONTRAST'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Method Controls & SOP Steps */}
            <div className="lg:col-span-5 bg-[#0b0c1c] p-6 rounded-2xl border border-[#232958] space-y-5">
              {testMethod === 'MT' ? (
                <>
                  <div className="border-b border-[#212752] pb-3">
                    <span className="text-xs font-mono-code text-amber-400 font-bold">ELECTROMAGNETIC CONTROLS</span>
                    <h5 className="text-lg font-black text-white">{isAr ? 'حافر المغنطة AC Yoke والمعايرة' : 'AC Yoke & Magnetic Flux Controls'}</h5>
                  </div>

                  {/* Yoke Power Toggle */}
                  <div className="bg-[#131633] p-4 rounded-xl border border-[#212752] flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white text-sm">{isAr ? 'طاقة حافر المغنطة (AC 220V):' : 'AC Electromagnetic Yoke:'}</div>
                      <div className="text-xs text-slate-400">{isAr ? 'توليد تدفق مغناطيسي متسرب عند الشروخ' : 'Generates flux leakage across cracks'}</div>
                    </div>
                    <button
                      onClick={() => setYokePowerOn(!yokePowerOn)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                        yokePowerOn
                          ? 'bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      <Zap className="w-4 h-4" />
                      <span>{yokePowerOn ? 'YOKE ENERGIZED' : 'YOKE OFF'}</span>
                    </button>
                  </div>

                  <div className="bg-[#121638] p-4 rounded-xl border border-sky-500/30 text-xs space-y-2">
                    <div className="font-bold text-sky-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-sky-400" />
                      <span>{isAr ? 'معيار ASME Section V Art. 7:' : 'ASME Sec V Art. 7 Standard:'}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      {isAr
                        ? 'يشترط الكود فحص قوة الرفع المغناطيسي (10-lb / 4.5kg Lifting Weight Check) كل 6 أشهر أو عند أي صيانة للحافر. كما يشترط تسليط المجال في اتجاهين متعامدين (Orthogonal Fields) لضمان كشف كافة الشروخ الطولية والعرضية.'
                        : 'Code mandates a 10-lb (4.5 kg) dead-weight lift test for AC yokes prior to use. Two perpendicular inspection passes must be conducted to capture longitudinal and transverse crack orientations.'}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="border-b border-[#212752] pb-3">
                    <span className="text-xs font-mono-code text-amber-400 font-bold">PT STANDARD OPERATING PROCEDURE</span>
                    <h5 className="text-lg font-black text-white">{isAr ? 'خطوات فحص السائل النافذ القياسية' : 'Standard 5-Step Penetrant Process'}</h5>
                  </div>

                  <div className="space-y-2.5">
                    {ptSteps.map((step, idx) => (
                      <button
                        key={idx}
                        onClick={() => setPtCurrentStep(idx)}
                        className={`w-full text-start p-3 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                          ptCurrentStep === idx
                            ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md'
                            : ptCurrentStep > idx
                            ? 'bg-[#151940] text-emerald-300 border-emerald-500/30'
                            : 'bg-[#0f1129] text-slate-400 border-[#232958]'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold">{isAr ? step.titleAr : step.titleEn}</div>
                          <div className="text-[11px] opacity-80 mt-0.5">{isAr ? step.descAr : step.descEn}</div>
                        </div>
                        {ptCurrentStep > idx && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* WORKBENCH 3: RADIOGRAPHIC RT FILM & DENSITOMETER LAB                       */}
      {/* ========================================================================= */}
      {activeLabId === 'rt_illuminator' && (
        <div className="bg-[#10132b] p-6 sm:p-8 rounded-2xl border-2 border-amber-500/40 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#212752]">
            <div>
              <span className="text-xs font-mono-code text-amber-400 font-bold uppercase tracking-wider">
                CONVENTIONAL NDT WORKBENCH 03
              </span>
              <h4 className="text-2xl font-black text-white mt-1">
                {isAr ? 'شاشة قراءة أفلام الأشعة السينية ومقياس الكثافة (Densitometer)' : 'High-Intensity RT Film Illuminator & Optical Densitometer'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {isAr
                  ? 'وجه مسبار مقياس الكثافة فوق مناطق الفيلم المختلفة للتحقق من الكثافة البصرية H&D وأسلاك الـ IQI وتشخيص عيوب اللحام.'
                  : 'Place the virtual optical densitometer probe over different film zones to measure optical density and verify ASME compliance.'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono-code px-3 py-1 rounded-lg bg-[#181d45] text-amber-300 border border-amber-500/30 font-bold">
                ASME Sec V Art. 2
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Radiographic Film Viewer Screen */}
            <div className="lg:col-span-8 bg-[#05060f] p-6 rounded-2xl border-2 border-[#2b3368] space-y-4">
              <div className="flex items-center justify-between text-xs font-mono-code text-slate-300 pb-2 border-b border-[#212752]">
                <span>HIGH-INTENSITY INDUSTRIAL ILLUMINATOR (10,000 - 100,000 LUX)</span>
                <span>FILM: AGFA D7 / KODAK T200</span>
              </div>

              {/* The Radiographic Strip Canvas */}
              <div className="relative w-full aspect-[21/9] bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-2xl flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg">
                  {/* Film Base (Grey Density 2.5) */}
                  <rect x="0" y="0" width="500" height="200" fill="#383838" />

                  {/* Weld Seam (Crown has higher thickness, therefore appears lighter grey ~2.1 density) */}
                  <rect x="0" y="60" width="500" height="80" fill="#585858" />
                  <line x1="0" y1="60" x2="500" y2="60" stroke="#484848" strokeWidth="2" strokeDasharray="4,4" />
                  <line x1="0" y1="140" x2="500" y2="140" stroke="#484848" strokeWidth="2" strokeDasharray="4,4" />

                  {/* Lead Markers (Location numbers & INSCO stamp) */}
                  <text x="30" y="35" fill="#f8fafc" fontSize="16" fontFamily="monospace" fontWeight="bold">004</text>
                  <text x="440" y="35" fill="#f8fafc" fontSize="16" fontFamily="monospace" fontWeight="bold">005</text>
                  <text x="30" y="180" fill="#f8fafc" fontSize="12" fontFamily="monospace" fontWeight="bold">INSCO RT-2026</text>

                  {/* Wire IQI Penetrameter (Wire type ASTM / EN) */}
                  <g id="iqiGroup">
                    <rect x="70" y="70" width="30" height="60" fill="#6a6a6a" opacity="0.8" />
                    {/* 6 wires with graduated thickness */}
                    <line x1="74" y1="75" x2="74" y2="125" stroke="#f1f5f9" strokeWidth="2.2" />
                    <line x1="79" y1="75" x2="79" y2="125" stroke="#f1f5f9" strokeWidth="1.6" />
                    <line x1="84" y1="75" x2="84" y2="125" stroke="#f1f5f9" strokeWidth="1.2" />
                    <line x1="89" y1="75" x2="89" y2="125" stroke="#f1f5f9" strokeWidth="0.8" />
                    <line x1="94" y1="75" x2="94" y2="125" stroke="#f1f5f9" strokeWidth="0.5" />
                    <text x="70" y="138" fill="#e2e8f0" fontSize="7" fontFamily="monospace">ASTM 1B</text>
                  </g>

                  {/* Weld Defects */}
                  {/* 1. Gas Porosity (Dark spherical dots) */}
                  <g id="porositySpot">
                    <circle cx="210" cy="95" r="4.5" fill="#181818" />
                    <circle cx="218" cy="92" r="3" fill="#181818" />
                    <circle cx="215" cy="103" r="2.5" fill="#181818" />
                  </g>

                  {/* 2. Longitudinal Crack (Wavy dark jagged line) */}
                  <path
                    d="M 310 100 Q 325 96 340 102 T 365 98"
                    fill="none"
                    stroke="#0a0a0a"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />

                  {/* Densitometer Optical Target Reticle */}
                  {/* Position changes based on selected spot */}
                  <g>
                    {densitometerTarget === 'crack' && (
                      <g transform="translate(340, 100)">
                        <circle cx="0" cy="0" r="16" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,3" />
                        <line x1="-20" y1="0" x2="20" y2="0" stroke="#ef4444" strokeWidth="1" />
                        <line x1="0" y1="-20" x2="0" y2="20" stroke="#ef4444" strokeWidth="1" />
                        <rect x="25" y="-12" width="75" height="24" rx="4" fill="#000000" opacity="0.85" />
                        <text x="30" y="4" fill="#ef4444" fontSize="10" fontFamily="monospace" fontWeight="bold">D = 3.42 H&D</text>
                      </g>
                    )}
                    {densitometerTarget === 'porosity' && (
                      <g transform="translate(215, 98)">
                        <circle cx="0" cy="0" r="16" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,3" />
                        <line x1="-20" y1="0" x2="20" y2="0" stroke="#f59e0b" strokeWidth="1" />
                        <line x1="0" y1="-20" x2="0" y2="20" stroke="#f59e0b" strokeWidth="1" />
                        <rect x="25" y="-12" width="75" height="24" rx="4" fill="#000000" opacity="0.85" />
                        <text x="30" y="4" fill="#f59e0b" fontSize="10" fontFamily="monospace" fontWeight="bold">D = 3.15 H&D</text>
                      </g>
                    )}
                    {densitometerTarget === 'weld_cap' && (
                      <g transform="translate(160, 100)">
                        <circle cx="0" cy="0" r="16" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3,3" />
                        <line x1="-20" y1="0" x2="20" y2="0" stroke="#38bdf8" strokeWidth="1" />
                        <line x1="0" y1="-20" x2="0" y2="20" stroke="#38bdf8" strokeWidth="1" />
                        <rect x="25" y="-12" width="75" height="24" rx="4" fill="#000000" opacity="0.85" />
                        <text x="30" y="4" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">D = 2.12 H&D</text>
                      </g>
                    )}
                    {densitometerTarget === 'base' && (
                      <g transform="translate(160, 35)">
                        <circle cx="0" cy="0" r="16" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3,3" />
                        <line x1="-20" y1="0" x2="20" y2="0" stroke="#10b981" strokeWidth="1" />
                        <line x1="0" y1="-20" x2="0" y2="20" stroke="#10b981" strokeWidth="1" />
                        <rect x="25" y="-12" width="75" height="24" rx="4" fill="#000000" opacity="0.85" />
                        <text x="30" y="4" fill="#10b981" fontSize="10" fontFamily="monospace" fontWeight="bold">D = 2.55 H&D</text>
                      </g>
                    )}
                    {densitometerTarget === 'iqi' && (
                      <g transform="translate(85, 95)">
                        <circle cx="0" cy="0" r="16" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3,3" />
                        <line x1="-20" y1="0" x2="20" y2="0" stroke="#a855f7" strokeWidth="1" />
                        <line x1="0" y1="-20" x2="0" y2="20" stroke="#a855f7" strokeWidth="1" />
                        <rect x="25" y="-12" width="75" height="24" rx="4" fill="#000000" opacity="0.85" />
                        <text x="30" y="4" fill="#a855f7" fontSize="10" fontFamily="monospace" fontWeight="bold">D = 2.48 H&D</text>
                      </g>
                    )}
                  </g>
                </svg>
              </div>

              {/* Densitometer Live Digital Meter Box */}
              <div className="bg-[#0b0d24] p-4 rounded-xl border border-[#232958] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-black border border-amber-500/40 text-amber-400 font-mono-code font-black text-2xl tracking-widest shadow-inner">
                    {rtSpots[densitometerTarget].density.toFixed(2)}
                  </div>
                  <div>
                    <div className="text-xs font-mono-code text-slate-400">OPTICAL DENSITY (H&D)</div>
                    <div className="text-sm font-bold text-white">{isAr ? rtSpots[densitometerTarget].nameAr : rtSpots[densitometerTarget].nameEn}</div>
                  </div>
                </div>

                <div className="text-end">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono-code font-bold ${
                    rtSpots[densitometerTarget].status === 'REJECTED'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}>
                    {rtSpots[densitometerTarget].status}
                  </span>
                  <div className="text-xs text-slate-400 mt-1 max-w-xs">
                    {isAr ? rtSpots[densitometerTarget].noteAr : rtSpots[densitometerTarget].noteEn}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Spot Selection Buttons & Code Limits */}
            <div className="lg:col-span-4 bg-[#0b0c1c] p-6 rounded-2xl border border-[#232958] space-y-5">
              <div className="border-b border-[#212752] pb-3">
                <span className="text-xs font-mono-code text-amber-400 font-bold">FILM INTERPRETATION</span>
                <h5 className="text-lg font-black text-white">{isAr ? 'اختر موقع القراءة والتفسير' : 'Select Spot to Probe'}</h5>
              </div>

              <div className="space-y-2">
                {[
                  { id: 'crack', labelAr: 'الشرخ الطولي (Longitudinal Crack)', labelEn: 'Longitudinal Crack', severity: 'Critical' },
                  { id: 'porosity', labelAr: 'المسامية الغازية (Gas Porosity)', labelEn: 'Porosity Cluster', severity: 'Moderate' },
                  { id: 'weld_cap', labelAr: 'تاج اللحام السميك (Weld Crown)', labelEn: 'Weld Crown', severity: 'Acceptable' },
                  { id: 'base', labelAr: 'المعدن الأساسي (Base Metal)', labelEn: 'Base Metal Plate', severity: 'Reference' },
                  { id: 'iqi', labelAr: 'سلك مقياس الجودة IQI (Wire Penetrameter)', labelEn: 'Wire IQI Penetrameter', severity: 'Quality' }
                ].map((spot) => (
                  <button
                    key={spot.id}
                    onClick={() => setDensitometerTarget(spot.id as any)}
                    className={`w-full text-start p-3 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                      densitometerTarget === spot.id
                        ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md'
                        : 'bg-[#131633] text-slate-300 border-[#232958] hover:bg-[#1a1f48]'
                    }`}
                  >
                    <span className="text-xs">{isAr ? spot.labelAr : spot.labelEn}</span>
                    <span className="text-[10px] font-mono-code font-bold opacity-75">{spot.severity}</span>
                  </button>
                ))}
              </div>

              {/* Code Limits Info */}
              <div className="bg-[#121638] p-4 rounded-xl border border-amber-500/30 text-xs space-y-2">
                <div className="font-bold text-amber-400 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-amber-400" />
                  <span>{isAr ? 'حدود كثافة الفيلم بكود ASME V Art. 2:' : 'ASME V Art. 2 Density Limits:'}</span>
                </div>
                <ul className="text-slate-300 space-y-1 list-disc list-inside">
                  <li>{isAr ? 'أشعة سينية (X-Ray): الكثافة بين 1.8 و 4.0 H&D' : 'X-Ray Film: Density 1.8 to 4.0 H&D'}</li>
                  <li>{isAr ? 'نظائر مشعة (Gamma Iridium 192): بين 2.0 و 4.0 H&D' : 'Gamma Ray: Density 2.0 to 4.0 H&D'}</li>
                  <li>{isAr ? 'تغير الكثافة عبر منطقة الفحص: ±15% كحد أقصى' : 'Density variation across zone: max -15% / +30%'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* WORKBENCH 4: WELDING GAUGES & HEAT INPUT STUDIO                            */}
      {/* ========================================================================= */}
      {activeLabId === 'weld_inspector_gauge' && (
        <div className="bg-[#10132b] p-6 sm:p-8 rounded-2xl border-2 border-amber-500/40 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#212752]">
            <div>
              <span className="text-xs font-mono-code text-amber-400 font-bold uppercase tracking-wider">
                WELDING ENGINEERING WORKBENCH 04
              </span>
              <h4 className="text-2xl font-black text-white mt-1">
                {isAr ? 'مختبر مقاييس فحص اللحام (Cambridge Gauge) وحسابات الطاقة الحرارية' : 'Precision Welding Gauges & Arc Heat Input Studio'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {isAr
                  ? 'قِس أبعاد عدم المحاذاة والنحر والتدعيم بالمقياس الرقمي، واحسب طاقة القوس الحرارية وتأثيرها المباشر على قساوة المنطقة المتأثرة بالحرارة (HAZ).'
                  : 'Measure Hi-Lo, undercut, and cap reinforcement with virtual gauges, while calculating arc Heat Input in kJ/mm.'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono-code px-3 py-1 rounded-lg bg-[#181d45] text-emerald-300 border border-emerald-500/30 font-bold">
                CSWIP 3.1 & AWS CWI
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Visual Gauge on Weldment Diagram */}
            <div className="lg:col-span-7 bg-[#0b0c1c] p-6 rounded-2xl border border-[#232958] space-y-5">
              <div className="flex justify-between items-center text-xs font-mono-code border-b border-[#212752] pb-2">
                <span className="text-amber-400 font-bold">VIRTUAL CAMBRIDGE WELDING GAUGE</span>
                <span className="text-slate-400">TOLERANCE: ±0.2 mm</span>
              </div>

              {/* Graphic Weld Bevel with Gauge */}
              <div className="w-full aspect-[16/9] bg-[#070919] rounded-xl border border-[#232a5c] p-4 flex flex-col justify-center items-center">
                <svg viewBox="0 0 350 180" className="w-full h-full">
                  {/* Left Plate (Reference) */}
                  <rect x="20" y="80" width="130" height="60" fill="#1e244d" stroke="#3b467e" strokeWidth="1.5" />
                  
                  {/* Right Plate with Hi-Lo offset */}
                  {/* y position = 80 - (gaugeHiLo * 5) */}
                  <rect x="200" y={80 - (gaugeHiLo * 4)} width="130" height="60" fill="#1e244d" stroke="#3b467e" strokeWidth="1.5" />

                  {/* Weld Metal Crown */}
                  <path
                    d={`M 148 80 Q 175 ${80 - (gaugeCapHeight * 8)} 202 ${80 - (gaugeHiLo * 4)}`}
                    fill="#334155"
                    stroke="#f59e0b"
                    strokeWidth="2"
                  />

                  {/* Undercut Notch at Weld Toe */}
                  {gaugeUndercut > 0 && (
                    <circle cx="150" cy="80" r={gaugeUndercut * 3} fill="#ef4444" opacity="0.8" />
                  )}

                  {/* Gauge Pointer needle */}
                  <line x1="175" y1="20" x2="175" y2={80 - (gaugeCapHeight * 8)} stroke="#38bdf8" strokeWidth="2" />
                  <circle cx="175" cy="20" r="4" fill="#38bdf8" />
                  <rect x="145" y="8" width="60" height="18" rx="3" fill="#000000" stroke="#38bdf8" strokeWidth="1" />
                  <text x="175" y="21" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    {gaugeCapHeight} mm
                  </text>

                  {/* Hi-Lo Callout */}
                  <line x1="200" y1="80" x2="200" y2={80 - (gaugeHiLo * 4)} stroke="#ec4899" strokeWidth="2" />
                  <text x="210" y="70" fill="#ec4899" fontSize="9" fontWeight="bold" fontFamily="monospace">
                    Hi-Lo: {gaugeHiLo} mm
                  </text>

                  {/* Base plate labels */}
                  <text x="75" y="115" fill="#94a3b8" fontSize="10" textAnchor="middle">Pipe / Plate 1</text>
                  <text x="265" y="115" fill="#94a3b8" fontSize="10" textAnchor="middle">Pipe / Plate 2</text>
                </svg>
              </div>

              {/* Code Acceptance Dispositions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className={`p-3 rounded-xl border ${
                  gaugeHiLo <= 1.6
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                }`}>
                  <div className="font-bold mb-1">Hi-Lo Misalignment:</div>
                  <div className="text-lg font-mono-code font-black">{gaugeHiLo} mm</div>
                  <div className="text-[10px] mt-1">{gaugeHiLo <= 1.6 ? 'PASSED (≤ 1.6mm ASME)' : 'REJECTED (> 1.6mm)'}</div>
                </div>

                <div className={`p-3 rounded-xl border ${
                  gaugeUndercut <= 0.8
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                }`}>
                  <div className="font-bold mb-1">Undercut Depth:</div>
                  <div className="text-lg font-mono-code font-black">{gaugeUndercut} mm</div>
                  <div className="text-[10px] mt-1">{gaugeUndercut <= 0.8 ? 'ACCEPTABLE (≤ 0.8mm)' : 'REJECTED (> 0.8mm)'}</div>
                </div>

                <div className={`p-3 rounded-xl border ${
                  gaugeCapHeight <= 3.2
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                }`}>
                  <div className="font-bold mb-1">Reinforcement:</div>
                  <div className="text-lg font-mono-code font-black">{gaugeCapHeight} mm</div>
                  <div className="text-[10px] mt-1">{gaugeCapHeight <= 3.2 ? 'PASS (≤ 3.2mm AWS)' : 'EXCESSIVE CAP (> 3.2mm)'}</div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Heat Input Calculator */}
            <div className="lg:col-span-5 bg-[#0b0c1c] p-6 rounded-2xl border border-[#232958] space-y-5">
              <div className="border-b border-[#212752] pb-3">
                <span className="text-xs font-mono-code text-amber-400 font-bold">METALLURGICAL CALCULATOR</span>
                <h5 className="text-lg font-black text-white">{isAr ? 'حاسبة الطاقة الحرارية للقوس (kJ/mm)' : 'Arc Heat Input Calculator'}</h5>
              </div>

              {/* Sliders */}
              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-slate-300">Voltage (V):</span>
                    <span className="text-amber-400 font-mono-code">{weldingVoltage} Volts</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="35"
                    value={weldingVoltage}
                    onChange={(e) => setWeldingVoltage(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-slate-300">Amperage (I):</span>
                    <span className="text-amber-400 font-mono-code">{weldingCurrent} Amps</span>
                  </div>
                  <input
                    type="range"
                    min="70"
                    max="300"
                    value={weldingCurrent}
                    onChange={(e) => setWeldingCurrent(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-slate-300">Travel Speed (v):</span>
                    <span className="text-amber-400 font-mono-code">{travelSpeed} mm/min</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="350"
                    value={travelSpeed}
                    onChange={(e) => setTravelSpeed(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-2">Welding Process Efficiency (η):</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { name: 'SMAW (0.8)', val: 0.8 },
                      { name: 'GTAW (0.6)', val: 0.6 },
                      { name: 'SAW (1.0)', val: 1.0 }
                    ].map((proc) => (
                      <button
                        key={proc.name}
                        onClick={() => setProcessEfficiency(proc.val)}
                        className={`py-1.5 rounded-lg font-bold border transition text-[11px] cursor-pointer ${
                          processEfficiency === proc.val
                            ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                            : 'bg-[#131633] text-slate-300 border-[#232958]'
                        }`}
                      >
                        {proc.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Heat Input Output Card */}
              <div className="bg-[#121638] p-4 rounded-xl border border-amber-500/40 space-y-2">
                <div className="text-xs text-slate-400 font-mono-code">TOTAL CALCULATED HEAT INPUT:</div>
                <div className="text-3xl font-mono-code font-black text-amber-400">
                  {heatInputKjMm} <span className="text-base text-slate-300">kJ/mm</span>
                </div>
                <div className="text-xs text-slate-300 pt-2 border-t border-[#232958]">
                  {heatInputKjMm < 0.8 ? (
                    <span className="text-rose-400 font-bold">
                      {isAr ? '⚠️ طاقة منخفضة جداً: سرعة تبريد عالية وخطر تكون المارتينسيت الهش وشروخ الهيدروجين.' : '⚠️ Very low heat input: fast cooling rate risks brittle martensite and cold cracking.'}
                    </span>
                  ) : heatInputKjMm > 2.2 ? (
                    <span className="text-amber-400 font-bold">
                      {isAr ? '⚠️ طاقة مرتفعة جداً: زيادة حجم الحبيبات الميتالورجية وفقدان المتانة الصدمية Charpy.' : '⚠️ Excessive heat input: grain coarsening in HAZ reduces Charpy impact toughness.'}
                    </span>
                  ) : (
                    <span className="text-emerald-400 font-bold">
                      {isAr ? '✅ نطاق طاقة مثالي: توازن ميتالورجي ممتاز بين المتانة ومقاومة الشروخ.' : '✅ Optimal heat input range: excellent balance of toughness and crack resistance.'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* WORKBENCH 5: API 510/570 VESSEL REMAINING LIFE LAB                         */}
      {/* ========================================================================= */}
      {activeLabId === 'api_vessel_life' && (
        <div className="bg-[#10132b] p-6 sm:p-8 rounded-2xl border-2 border-amber-500/40 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#212752]">
            <div>
              <span className="text-xs font-mono-code text-amber-400 font-bold uppercase tracking-wider">
                API PLANT INTEGRITY WORKBENCH 05
              </span>
              <h4 className="text-2xl font-black text-white mt-1">
                {isAr ? 'حاسبة سماكة أوعية الضغط وتآكل الأنابيب والعمر المتبقي' : 'ASME UG-27 Minimum Thickness & API Remaining Life Lab'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {isAr
                  ? 'احسب السماكة التصميمية الدنيا المطلوبة t_min ومعدل التآكل والعمر المتبقي وموعد الفحص القادم طبقاً لـ API 510 و ASME Section VIII.'
                  : 'Compute ASME UG-27 minimum design wall thickness, annual corrosion rates, and statutory inspection intervals per API 510.'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono-code px-3 py-1 rounded-lg bg-[#181d45] text-cyan-300 border border-cyan-500/30 font-bold">
                API 510 & ASME VIII Div 1
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Variables Form */}
            <div className="lg:col-span-6 bg-[#0b0c1c] p-6 rounded-2xl border border-[#232958] space-y-4">
              <div className="border-b border-[#212752] pb-3">
                <span className="text-xs font-mono-code text-cyan-400 font-bold">DESIGN & OPERATIONAL INPUTS</span>
                <h5 className="text-lg font-black text-white">{isAr ? 'مدخلات التصميم والتشغيل' : 'Vessel Operational Parameters'}</h5>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Design Pressure (P):</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={designPressurePsi}
                      onChange={(e) => setDesignPressurePsi(Number(e.target.value))}
                      className="w-full bg-[#131633] border border-[#232958] rounded-lg px-3 py-2 text-white font-mono-code"
                    />
                    <span className="text-slate-400 font-mono-code">psi</span>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Inside Radius (R):</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={vesselInsideRadiusIn}
                      onChange={(e) => setVesselInsideRadiusIn(Number(e.target.value))}
                      className="w-full bg-[#131633] border border-[#232958] rounded-lg px-3 py-2 text-white font-mono-code"
                    />
                    <span className="text-slate-400 font-mono-code">in</span>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Allowable Stress (S):</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={allowableStressPsi}
                      onChange={(e) => setAllowableStressPsi(Number(e.target.value))}
                      className="w-full bg-[#131633] border border-[#232958] rounded-lg px-3 py-2 text-white font-mono-code"
                    />
                    <span className="text-slate-400 font-mono-code">psi</span>
                  </div>
                  <span className="text-[10px] text-slate-500">e.g. SA-516 Gr. 70 = 17,500</span>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Joint Efficiency (E):</label>
                  <select
                    value={jointEfficiency}
                    onChange={(e) => setJointEfficiency(Number(e.target.value))}
                    className="w-full bg-[#131633] border border-[#232958] rounded-lg px-3 py-2 text-white font-mono-code cursor-pointer"
                  >
                    <option value={1.0}>1.0 (Full Radiography RT)</option>
                    <option value={0.85}>0.85 (Spot Radiography)</option>
                    <option value={0.70}>0.70 (Visual Only / No RT)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Nominal Thickness:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.5"
                      value={nominalThicknessMm}
                      onChange={(e) => setNominalThicknessMm(Number(e.target.value))}
                      className="w-full bg-[#131633] border border-[#232958] rounded-lg px-3 py-2 text-white font-mono-code"
                    />
                    <span className="text-slate-400 font-mono-code">mm</span>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Actual Measured Thickness:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.1"
                      value={actualThicknessMm}
                      onChange={(e) => setActualThicknessMm(Number(e.target.value))}
                      className="w-full bg-[#131633] border border-[#232958] rounded-lg px-3 py-2 text-white font-mono-code"
                    />
                    <span className="text-slate-400 font-mono-code">mm</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Years in Continuous Service:</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="25"
                    value={yearsInService}
                    onChange={(e) => setYearsInService(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                  <span className="text-cyan-400 font-mono-code font-bold min-w-12 text-end">{yearsInService} yrs</span>
                </div>
              </div>
            </div>

            {/* Results & Health Status Card */}
            <div className="lg:col-span-6 bg-[#0b0c1c] p-6 rounded-2xl border border-[#232958] space-y-5">
              <div className="border-b border-[#212752] pb-3">
                <span className="text-xs font-mono-code text-cyan-400 font-bold">CALCULATED ASSET INTEGRITY</span>
                <h5 className="text-lg font-black text-white">{isAr ? 'النتائج الهندسية وتقييم السلامة' : 'Engineering Calculations Output'}</h5>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#131633] p-4 rounded-xl border border-[#212752]">
                  <div className="text-xs text-slate-400">MIN. REQUIRED THICKNESS (t_min):</div>
                  <div className="text-2xl font-mono-code font-black text-white mt-1">
                    {apiCalculations.tMinMm} <span className="text-xs text-slate-400">mm</span>
                  </div>
                  <div className="text-[10px] text-cyan-400 mt-1">ASME Section VIII UG-27</div>
                </div>

                <div className="bg-[#131633] p-4 rounded-xl border border-[#212752]">
                  <div className="text-xs text-slate-400">CORROSION RATE (CR):</div>
                  <div className="text-2xl font-mono-code font-black text-amber-400 mt-1">
                    {apiCalculations.corrosionRateMmYear} <span className="text-xs text-slate-400">mm/yr</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">Metal loss over {yearsInService} yrs</div>
                </div>

                <div className="bg-[#131633] p-4 rounded-xl border border-[#212752]">
                  <div className="text-xs text-slate-400">REMAINING LIFE (RL):</div>
                  <div className={`text-2xl font-mono-code font-black mt-1 ${
                    apiCalculations.remainingLifeYears > 10 ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {apiCalculations.remainingLifeYears} <span className="text-xs text-slate-400">years</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">(t_actual - t_min) / CR</div>
                </div>

                <div className="bg-[#131633] p-4 rounded-xl border border-[#212752]">
                  <div className="text-xs text-slate-400">NEXT MANDATORY INSPECTION:</div>
                  <div className="text-2xl font-mono-code font-black text-sky-300 mt-1">
                    {apiCalculations.nextInspectionInterval} <span className="text-xs text-slate-400">years</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">API 510 (Half life or 10 yrs)</div>
                </div>
              </div>

              {/* Visual Thickness Safety Gauge */}
              <div>
                <div className="flex justify-between text-xs font-mono-code mb-1">
                  <span className="text-rose-400 font-bold">t_min ({apiCalculations.tMinMm}mm)</span>
                  <span className="text-cyan-400 font-bold">Actual ({actualThicknessMm}mm)</span>
                  <span className="text-slate-400 font-bold">Nominal ({nominalThicknessMm}mm)</span>
                </div>
                <div className="w-full h-4 bg-[#141838] rounded-full overflow-hidden border border-[#232958] flex">
                  <div style={{ width: `${(apiCalculations.tMinMm / nominalThicknessMm) * 100}%` }} className="bg-rose-500 h-full"></div>
                  <div style={{ width: `${((actualThicknessMm - apiCalculations.tMinMm) / nominalThicknessMm) * 100}%` }} className="bg-emerald-500 h-full"></div>
                  <div className="bg-slate-700 h-full flex-1"></div>
                </div>
              </div>

              {/* Status Alert */}
              <div className={`p-4 rounded-xl border text-xs ${
                apiCalculations.isRetirementThreat
                  ? 'bg-rose-500/20 border-rose-500/50 text-rose-200'
                  : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200'
              }`}>
                {apiCalculations.isRetirementThreat ? (
                  <div className="flex items-center gap-2 font-bold">
                    <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                    <span>
                      {isAr
                        ? 'تحذير حرج: سماكة الوعاء الحالية دون الحد الأدنى المطلوب t_min! يجب إيقاف المعدة فوراً أو خفض ضغط التشغيل طبقاً لـ API 579 FFS.'
                        : 'CRITICAL THREAT: Actual thickness has breached t_min! Equipment must be derated or retired immediately.'}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 font-bold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>
                      {isAr
                        ? `الوعاء آمن تشغيلياً: متبقي ${apiCalculations.remainingCorrosionAllowance} ملم سماكة تآكل مسموحة وعمر افتراضي يقدر بـ ${apiCalculations.remainingLifeYears} سنة.`
                        : `Vessel is structurally safe with ${apiCalculations.remainingCorrosionAllowance}mm corrosion allowance remaining.`}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* WORKBENCH 6: PROTECTIVE COATING & DEW POINT LAB                            */}
      {/* ========================================================================= */}
      {activeLabId === 'coating_dewpoint' && (
        <div className="bg-[#10132b] p-6 sm:p-8 rounded-2xl border-2 border-amber-500/40 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#212752]">
            <div>
              <span className="text-xs font-mono-code text-amber-400 font-bold uppercase tracking-wider">
                COATING & CORROSION WORKBENCH 06
              </span>
              <h4 className="text-2xl font-black text-white mt-1">
                {isAr ? 'مختبر فحص الدهانات ونقطة الندى وسماكة الطلاء الجاف (DFT)' : 'Protective Coating Dew Point & SSPC-PA 2 DFT Lab'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {isAr
                  ? 'احسب نقطة الندى من الرطوبة النسبية وطبّق قاعدة الـ 3°C الإلزامية قبل السفع والرش، وتحقق من سماكة الطلاء بقاعدة 80/20.'
                  : 'Calculate psychrometric dew point, enforce the mandatory 3°C delta rule, and audit Dry Film Thickness (DFT) against SSPC-PA 2.'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono-code px-3 py-1 rounded-lg bg-[#181d45] text-yellow-300 border border-yellow-500/30 font-bold">
                NACE CIP / SSPC-PA 2
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Climatic Inputs & Dew Point Calculator */}
            <div className="lg:col-span-6 bg-[#0b0c1c] p-6 rounded-2xl border border-[#232958] space-y-5">
              <div className="border-b border-[#212752] pb-3">
                <span className="text-xs font-mono-code text-yellow-400 font-bold">CLIMATIC WEATHER DATA</span>
                <h5 className="text-lg font-black text-white">{isAr ? 'بيانات الطقس وحساب نقطة الندى' : 'Psychrometric Ambient Parameters'}</h5>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-slate-300">Ambient Air Temperature (Ta):</span>
                    <span className="text-yellow-400 font-mono-code">{ambientTempC}°C</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="45"
                    value={ambientTempC}
                    onChange={(e) => setAmbientTempC(Number(e.target.value))}
                    className="w-full accent-yellow-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-slate-300">Relative Humidity (RH%):</span>
                    <span className="text-yellow-400 font-mono-code">{relativeHumidityPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="95"
                    value={relativeHumidityPercent}
                    onChange={(e) => setRelativeHumidityPercent(Number(e.target.value))}
                    className="w-full accent-yellow-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-slate-300">Steel Surface Temperature (Ts):</span>
                    <span className="text-yellow-400 font-mono-code">{steelSurfaceTempC}°C</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={steelSurfaceTempC}
                    onChange={(e) => setSteelSurfaceTempC(Number(e.target.value))}
                    className="w-full accent-yellow-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Dew Point Calculations Panel */}
              <div className="bg-[#121638] p-4 rounded-xl border border-yellow-500/40 space-y-3">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400">CALCULATED DEW POINT (Tdp):</span>
                    <div className="text-2xl font-mono-code font-black text-white mt-0.5">
                      {coatingCalculations.dewPointC} °C
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400">SAFETY DELTA (Ts - Tdp):</span>
                    <div className={`text-2xl font-mono-code font-black mt-0.5 ${
                      coatingCalculations.isSafeToCoat ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      +{coatingCalculations.deltaT} °C
                    </div>
                  </div>
                </div>

                {/* Disposition */}
                <div className={`p-3 rounded-xl border text-xs font-bold flex items-center gap-2 ${
                  coatingCalculations.isSafeToCoat
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                    : 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                }`}>
                  {coatingCalculations.isSafeToCoat ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{isAr ? 'مسموح بالسفع والدهان: درجة حرارة الصلب أعلى من نقطة الندى بـ 3°C على الأقل.' : 'SAFE TO BLAST & COAT: Surface temperature exceeds dew point by ≥ 3°C.'}</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>{isAr ? 'ممنوع السفع والرش: خطر تكاثف الرطوبة وتكون الصدأ الومضي وفشل الالتصاق!' : 'STOP WORK: Condensation danger! Surface temperature is within 3°C of dew point.'}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right: SSPC-PA 2 Dry Film Thickness (DFT) Gauge */}
            <div className="lg:col-span-6 bg-[#0b0c1c] p-6 rounded-2xl border border-[#232958] space-y-5">
              <div className="border-b border-[#212752] pb-3">
                <span className="text-xs font-mono-code text-yellow-400 font-bold">DFT VERIFICATION (SSPC-PA 2)</span>
                <h5 className="text-lg font-black text-white">{isAr ? 'فحص سماكة الطلاء الجاف وقاعدة 80/20' : 'Dry Film Thickness & 80/20 Rule'}</h5>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-300">Target Specified DFT:</span>
                  <span className="text-yellow-400 font-mono-code">250 µm (Nominal)</span>
                </div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-slate-300">Measured Spot DFT:</span>
                  <span className="text-white font-mono-code font-black text-lg">{dftSpotReading} µm</span>
                </div>
                <input
                  type="range"
                  min="160"
                  max="340"
                  value={dftSpotReading}
                  onChange={(e) => setDftSpotReading(Number(e.target.value))}
                  className="w-full accent-yellow-500 cursor-pointer"
                />
              </div>

              {/* 80/20 Rule Evaluation */}
              <div className="bg-[#121638] p-4 rounded-xl border border-[#232958] space-y-3 text-xs">
                <div className="font-bold text-yellow-400 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-yellow-400" />
                  <span>{isAr ? 'قاعدة 80/20 طبقاً لمواصفة SSPC-PA 2:' : 'SSPC-PA 2 80/20 Rule Criteria:'}</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {isAr
                    ? 'لا يجوز لأي قراءة نقطية منفردة أن تقل عن 80% من السماكة المحددة (200 µm كحد أدنى)، ولا يجوز أن تزيد عن 120% (300 µm كحد أقصى للطلاءات الإيبوكسية الحساسة)، مع اشتراط أن يكون متوسط القراءات مساوياً لـ 100% (250 µm).'
                    : 'No single spot measurement may fall below 80% of specified thickness (200 µm), nor exceed 120% (300 µm), and the average of all spots must satisfy 100% (250 µm).'}
                </p>

                <div className={`p-3 rounded-xl border font-bold flex items-center gap-2 ${
                  coatingCalculations.isDftCompliant
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                    : 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                }`}>
                  {coatingCalculations.isDftCompliant ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{isAr ? 'السماكة مطابقة ومقبولة طبقاً لـ SSPC-PA 2 (بين 200 و 300 ميكرون).' : 'DFT Reading is compliant with SSPC-PA 2 limits (200 - 300 µm).'}</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>{isAr ? 'السماكة غير مطابقة! إما نقص في التغطية أو إفراط قد يؤدي للتشقق والتقشير.' : 'DFT Non-conformance: out of acceptable 80/20 specification window!'}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
