import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../../../types';
import { 
  Activity, 
  Sliders, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Crosshair, 
  ShieldCheck, 
  Play, 
  Pause, 
  CheckCircle2, 
  HelpCircle,
  Eye,
  Layers,
  ArrowRight,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';

interface UtFlawDetectorDeviceProps {
  language: Language;
}

// Preset specimens
export type SpecimenType = 'iiw_v1' | 'iiw_v2' | 'weld_butt' | 'corrosion_step';

export const UtFlawDetectorDevice: React.FC<UtFlawDetectorDeviceProps> = ({ language }) => {
  const isAr = language === 'ar';

  // --- Instrument Controls State ---
  const [gainDb, setGainDb] = useState<number>(42.0); // 0 to 100 dB
  const [rangeMm, setRangeMm] = useState<number>(200); // 25, 50, 100, 200, 250, 500
  const [velocityMs, setVelocityMs] = useState<number>(5920); // Carbon steel default
  const [zeroDelayUs, setZeroDelayUs] = useState<number>(0.85); // Probe zero delay (µs)
  const [probeAngleDeg, setProbeAngleDeg] = useState<number>(0); // 0°, 45°, 60°, 70°
  const [probeFrequencyMhz, setProbeFrequencyMhz] = useState<number>(4.0); // 2MHz, 4MHz

  // Dual Gates System
  const [gateAStartMm, setGateAStartMm] = useState<number>(85);
  const [gateAWidthMm, setGateAWidthMm] = useState<number>(30);
  const [gateAThresholdPct, setGateAThresholdPct] = useState<number>(50); // % FSH

  const [gateBStartMm, setGateBStartMm] = useState<number>(180);
  const [gateBWidthMm, setGateBWidthMm] = useState<number>(40);
  const [gateBThresholdPct, setGateBThresholdPct] = useState<number>(30);

  // Display rectification & freeze
  const [rectification, setRectification] = useState<'full' | 'positive' | 'rf'>('full');
  const [isFrozen, setIsFrozen] = useState<boolean>(false);
  const [isAlarmMuted, setIsAlarmMuted] = useState<boolean>(false);

  // Specimen & Probe Position
  const [activeSpecimen, setActiveSpecimen] = useState<SpecimenType>('iiw_v1');
  const [iiwPosition, setIiwPosition] = useState<'A' | 'B' | 'C' | 'D'>('B');
  const [weldProbeStandoffMm, setWeldProbeStandoffMm] = useState<number>(42); // distance from weld center
  const [corrosionStepIndex, setCorrosionStepIndex] = useState<number>(2); // 0 to 4

  // Canvas ref for real-time oscilloscope A-scan rendering
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // --------------------------------------------------------------------------
  // Acoustic Physics & Echo Simulation Engine
  // --------------------------------------------------------------------------
  interface EchoPeak {
    soundPathMm: number;
    baseAmplitudePct: number; // 0 to 100
    widthMm: number;
    label: string;
  }

  // Calculate echoes based on current specimen, probe, and position
  const getSimulatedEchoes = (): EchoPeak[] => {
    const echoes: EchoPeak[] = [];

    // Main Bang / Initial Pulse at soundPath = 0
    echoes.push({
      soundPathMm: 0,
      baseAmplitudePct: 98,
      widthMm: rangeMm * 0.04,
      label: isAr ? 'النبضة الابتدائية (Initial Pulse)' : 'Main Bang / Initial Pulse'
    });

    if (activeSpecimen === 'iiw_v1') {
      if (probeAngleDeg === 0) {
        if (iiwPosition === 'B') {
          // Position B: 0° probe oriented toward 100mm cylindrical arc
          echoes.push({
            soundPathMm: 100,
            baseAmplitudePct: 80,
            widthMm: 6,
            label: isAr ? 'صدى القوس 100 مم (R100 Arc)' : '100mm Radius Echo'
          });
          // Second multiple bounce at 200mm
          echoes.push({
            soundPathMm: 200,
            baseAmplitudePct: 38,
            widthMm: 8,
            label: isAr ? 'الارتداد المضاعف 200 مم (Multiple Bounce)' : '200mm Multiple Echo'
          });
        } else if (iiwPosition === 'A') {
          // Position A: 25mm thickness calibration
          echoes.push({ soundPathMm: 25, baseAmplitudePct: 85, widthMm: 4, label: '25mm Backwall' });
          echoes.push({ soundPathMm: 50, baseAmplitudePct: 62, widthMm: 5, label: '50mm 2nd Multiple' });
          echoes.push({ soundPathMm: 75, baseAmplitudePct: 45, widthMm: 6, label: '75mm 3rd Multiple' });
          echoes.push({ soundPathMm: 100, baseAmplitudePct: 32, widthMm: 6, label: '100mm 4th Multiple' });
        } else if (iiwPosition === 'C') {
          // Position C: 1.5mm Side Drilled Hole at 15mm depth
          echoes.push({ soundPathMm: 15, baseAmplitudePct: 55, widthMm: 3.5, label: '1.5mm SDH Hole' });
          echoes.push({ soundPathMm: 100, baseAmplitudePct: 40, widthMm: 6, label: '100mm Backwall' });
        }
      } else {
        // Angle probe on IIW block (calibrating beam index point & angle)
        echoes.push({
          soundPathMm: 100,
          baseAmplitudePct: 82,
          widthMm: 7,
          label: isAr ? 'قوس المعايرة R100 لزاوية المجس' : 'R100 Arc for Angle Verification'
        });
      }
    } else if (activeSpecimen === 'iiw_v2') {
      // V2 mini block: 25mm and 50mm radius
      echoes.push({ soundPathMm: 25, baseAmplitudePct: 84, widthMm: 4.5, label: '25mm Radius' });
      echoes.push({ soundPathMm: 50, baseAmplitudePct: 48, widthMm: 6, label: '50mm Radius' });
    } else if (activeSpecimen === 'weld_butt') {
      // V-Groove Butt Weld Inspection with Angle Beam
      const plateThicknessMm = 20; // 20mm plate
      const rad = (probeAngleDeg * Math.PI) / 180;
      
      // Calculate where beam hits weld centerline
      // In Leg 1: soundPath = d / cos(theta)
      // surfaceDistance = soundPath * sin(theta) = d * tan(theta)
      // Flaw 1: Root Crack at root depth d = 20mm
      const targetStandoffForRoot = plateThicknessMm * Math.tan(rad); // e.g. for 60°: 20 * 1.732 = 34.6 mm
      const distDiffRoot = Math.abs(weldProbeStandoffMm - targetStandoffForRoot);

      if (distDiffRoot < 8 && probeAngleDeg > 0) {
        const rootSoundPath = plateThicknessMm / Math.cos(rad);
        const amp = Math.max(10, 85 - distDiffRoot * 8);
        echoes.push({
          soundPathMm: rootSoundPath,
          baseAmplitudePct: amp,
          widthMm: 5,
          label: isAr ? 'صدى شرخ الجذر (Root Crack)' : 'Root Crack Echo'
        });
      }

      // Flaw 2: Lack of Sidewall Fusion at d = 10mm (Fill Pass)
      const targetStandoffForFusion = 10 * Math.tan(rad);
      const distDiffFusion = Math.abs(weldProbeStandoffMm - targetStandoffForFusion);
      if (distDiffFusion < 6 && probeAngleDeg >= 45) {
        const fusionSoundPath = 10 / Math.cos(rad);
        const amp = Math.max(10, 75 - distDiffFusion * 10);
        echoes.push({
          soundPathMm: fusionSoundPath,
          baseAmplitudePct: amp,
          widthMm: 4,
          label: isAr ? 'صدى نقص الانصهار (Lack of Fusion)' : 'Lack of Sidewall Fusion'
        });
      }

      // Backwall / Root geometry corner echo
      const rootCornerDist = plateThicknessMm * Math.tan(rad);
      if (Math.abs(weldProbeStandoffMm - rootCornerDist) < 12 && probeAngleDeg > 0) {
        const cornerSoundPath = plateThicknessMm / Math.cos(rad);
        echoes.push({
          soundPathMm: cornerSoundPath + 2,
          baseAmplitudePct: 35,
          widthMm: 4,
          label: isAr ? 'صدى جذر اللحام الهندسي (Root Geometry)' : 'Weld Root Geometry'
        });
      }
    } else if (activeSpecimen === 'corrosion_step') {
      // Step wedge: 2.5, 5.0, 7.5, 10.0, 12.5 mm
      const stepThicknesses = [2.5, 5.0, 7.5, 10.0, 12.5];
      const thk = stepThicknesses[corrosionStepIndex] || 5.0;
      echoes.push({ soundPathMm: thk, baseAmplitudePct: 88, widthMm: 3, label: `Backwall (${thk} mm)` });
      echoes.push({ soundPathMm: thk * 2, baseAmplitudePct: 50, widthMm: 4, label: `2nd Multiple (${thk * 2} mm)` });
      if (thk * 3 < rangeMm) {
        echoes.push({ soundPathMm: thk * 3, baseAmplitudePct: 28, widthMm: 5, label: `3rd Multiple (${thk * 3} mm)` });
      }
    }

    return echoes;
  };

  const simulatedEchoes = getSimulatedEchoes();

  // Find highest echo inside Gate A
  let gateAPeakEcho: EchoPeak | null = null;
  let gateAMaxAmp = 0;
  for (const e of simulatedEchoes) {
    if (e.soundPathMm >= gateAStartMm && e.soundPathMm <= gateAStartMm + gateAWidthMm) {
      // Calculate Gain-adjusted amplitude
      const effectiveAmp = Math.min(100, (e.baseAmplitudePct * Math.pow(10, (gainDb - 40) / 20)));
      if (effectiveAmp > gateAMaxAmp) {
        gateAMaxAmp = effectiveAmp;
        gateAPeakEcho = e;
      }
    }
  }

  const isGateAAlarmTriggered = gateAMaxAmp >= gateAThresholdPct;

  // Trigonometric flaw calculations for angle beam
  const rad = (probeAngleDeg * Math.PI) / 180;
  const soundPathMeasured = gateAPeakEcho ? (gateAPeakEcho as EchoPeak).soundPathMm : 0;
  const depthMeasured = soundPathMeasured * Math.cos(rad);
  const surfaceDistMeasured = soundPathMeasured * Math.sin(rad);

  // --------------------------------------------------------------------------
  // Canvas A-Scan Rendering Effect
  // --------------------------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Dark CRT phosphorescent background
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, width, height);

      // CRT Graticule Grid (10 divisions horizontal, 10 vertical)
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;

      // Horizontal grid lines (0 to 100% FSH)
      for (let i = 0; i <= 10; i++) {
        const y = (height / 10) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();

        // 80% FSH Reference Line (highlighted amber)
        if (i === 2) {
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.25)';
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
          ctx.strokeStyle = '#1e293b';
        }
      }

      // Vertical grid lines (Range divisions)
      for (let j = 0; j <= 10; j++) {
        const x = (width / 10) * j;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw Gate A (Cyan)
      const gateAXStart = (gateAStartMm / rangeMm) * width;
      const gateAXEnd = ((gateAStartMm + gateAWidthMm) / rangeMm) * width;
      const gateAY = height - (gateAThresholdPct / 100) * height;

      ctx.strokeStyle = isGateAAlarmTriggered ? '#ef4444' : '#06b6d4';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(gateAXStart, gateAY);
      ctx.lineTo(gateAXEnd, gateAY);
      ctx.stroke();

      // Gate A tick marks
      ctx.beginPath();
      ctx.moveTo(gateAXStart, gateAY - 5);
      ctx.lineTo(gateAXStart, gateAY + 5);
      ctx.moveTo(gateAXEnd, gateAY - 5);
      ctx.lineTo(gateAXEnd, gateAY + 5);
      ctx.stroke();

      // Gate A Label
      ctx.fillStyle = isGateAAlarmTriggered ? '#ef4444' : '#06b6d4';
      ctx.font = '10px monospace';
      ctx.fillText('GATE A', gateAXStart + 4, gateAY - 6);

      // Draw Gate B (Amber)
      const gateBXStart = (gateBStartMm / rangeMm) * width;
      const gateBXEnd = ((gateBStartMm + gateBWidthMm) / rangeMm) * width;
      const gateBY = height - (gateBThresholdPct / 100) * height;

      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(gateBXStart, gateBY);
      ctx.lineTo(gateBXEnd, gateBY);
      ctx.stroke();
      ctx.fillText('GATE B', gateBXStart + 4, gateBY - 6);

      // Generate Continuous RF / Rectified Waveform
      ctx.strokeStyle = '#22d3ee'; // Bright phosphor cyan
      ctx.lineWidth = 2;
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 4;
      ctx.beginPath();

      const numSamples = width;
      const baselineY = height - 4;

      for (let x = 0; x < numSamples; x++) {
        const currentSoundPath = (x / width) * rangeMm;
        let signalAmp = 0;

        // Sum contributions from all simulated echoes
        simulatedEchoes.forEach((echo) => {
          const dist = Math.abs(currentSoundPath - echo.soundPathMm);
          if (dist < echo.widthMm * 2) {
            // Gaussian bell envelope
            const envelope = Math.exp(-Math.pow(dist / (echo.widthMm * 0.5), 2));
            // RF oscillation carrier (sinusoidal frequency)
            const rfCarrier = Math.sin((dist / echo.widthMm) * Math.PI * 4);
            const gainFactor = Math.pow(10, (gainDb - 40) / 20);
            const peak = (echo.baseAmplitudePct * gainFactor * (height - 20)) / 100;

            if (rectification === 'full') {
              signalAmp += peak * envelope * Math.abs(rfCarrier);
            } else if (rectification === 'positive') {
              signalAmp += peak * envelope * Math.max(0, rfCarrier);
            } else {
              // RF Mode
              signalAmp += (peak * envelope * rfCarrier) / 2;
            }
          }
        });

        // Add subtle acoustic baseline electronic noise (Grass noise)
        const grassNoise = Math.sin(x * 0.3 + Date.now() * 0.01) * 1.5 + (Math.random() - 0.5) * 1.8;
        const totalY = rectification === 'rf' 
          ? (height / 2) - signalAmp + grassNoise
          : baselineY - Math.min(height - 10, signalAmp + Math.max(0, grassNoise));

        if (x === 0) {
          ctx.moveTo(x, totalY);
        } else {
          ctx.lineTo(x, totalY);
        }
      }

      ctx.stroke();
      ctx.shadowBlur = 0; // Reset glow

      // If not frozen, loop animation
      if (!isFrozen) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [
    simulatedEchoes,
    gainDb,
    rangeMm,
    gateAStartMm,
    gateAWidthMm,
    gateAThresholdPct,
    gateBStartMm,
    gateBWidthMm,
    gateBThresholdPct,
    rectification,
    isFrozen,
    isGateAAlarmTriggered
  ]);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-6 space-y-6">
      {/* Top Header & Instrument Model Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>{isAr ? 'محاكي جهاز كشف العيوب الرقمي UT (Krautkramer USM 35X)' : 'Digital Ultrasonic Flaw Detector (USM 35X Style)'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            {isAr ? 'مختبر فحص العيوب بالموجات فوق الصوتية ومعايرة الكتل' : 'Interactive Ultrasonic Flaw Detector & Calibration Lab'}
          </h3>
        </div>

        {/* Status Indicators & Mode Badges */}
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold flex items-center gap-1.5 ${
            isGateAAlarmTriggered
              ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse'
              : 'bg-slate-900 text-slate-400 border border-slate-800'
          }`}>
            <span className={`w-2 h-2 rounded-full ${isGateAAlarmTriggered ? 'bg-red-500' : 'bg-slate-600'}`} />
            <span>{isGateAAlarmTriggered ? 'ALARM ACTIVE' : 'GATE ARMED'}</span>
          </span>

          <button
            type="button"
            onClick={() => setIsFrozen(!isFrozen)}
            className={`px-3 py-1 rounded text-xs font-mono font-bold transition cursor-pointer border ${
              isFrozen
                ? 'bg-amber-500 text-slate-950 border-amber-400'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'
            }`}
          >
            {isFrozen ? 'FREEZE ON' : 'RUNNING'}
          </button>
        </div>
      </div>

      {/* Specimen & Block Selector Toolbar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          type="button"
          onClick={() => setActiveSpecimen('iiw_v1')}
          className={`p-3 rounded-xl border text-start transition cursor-pointer ${
            activeSpecimen === 'iiw_v1'
              ? 'bg-cyan-950/40 border-cyan-500 text-white shadow-md'
              : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
        >
          <div className="text-xs font-bold">{isAr ? 'كتلة IIW V1 القياسية' : 'IIW Type 1 (V1) Block'}</div>
          <div className="text-[11px] text-slate-500 font-mono mt-0.5">R100 Arc / 25mm / 1.5mm SDH</div>
        </button>

        <button
          type="button"
          onClick={() => setActiveSpecimen('iiw_v2')}
          className={`p-3 rounded-xl border text-start transition cursor-pointer ${
            activeSpecimen === 'iiw_v2'
              ? 'bg-cyan-950/40 border-cyan-500 text-white shadow-md'
              : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
        >
          <div className="text-xs font-bold">{isAr ? 'كتلة المعايرة المدمجة V2' : 'V2 Mini Angle Block'}</div>
          <div className="text-[11px] text-slate-500 font-mono mt-0.5">R25 / R50 Radius Check</div>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveSpecimen('weld_butt');
            setProbeAngleDeg(60); // Angle beam default for weld
          }}
          className={`p-3 rounded-xl border text-start transition cursor-pointer ${
            activeSpecimen === 'weld_butt'
              ? 'bg-cyan-950/40 border-cyan-500 text-white shadow-md'
              : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
        >
          <div className="text-xs font-bold">{isAr ? 'فحص وصلة لحام (Butt Weld)' : 'Butt Weld Inspection'}</div>
          <div className="text-[11px] text-slate-500 font-mono mt-0.5">Root Crack & Lack of Fusion</div>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveSpecimen('corrosion_step');
            setProbeAngleDeg(0); // 0° for thickness
          }}
          className={`p-3 rounded-xl border text-start transition cursor-pointer ${
            activeSpecimen === 'corrosion_step'
              ? 'bg-cyan-950/40 border-cyan-500 text-white shadow-md'
              : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
        >
          <div className="text-xs font-bold">{isAr ? 'كتلة السلالم (Step Wedge)' : 'Step Wedge Thickness'}</div>
          <div className="text-[11px] text-slate-500 font-mono mt-0.5">2.5mm to 12.5mm Precision</div>
        </button>
      </div>

      {/* Main Flaw Detector Cockpit Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: A-Scan CRT Display + Live Flaw Trig HUD */}
        <div className="lg:col-span-8 space-y-4">
          {/* Phosphor Oscilloscope Screen */}
          <div className="relative rounded-2xl border-2 border-slate-700 bg-black p-3 sm:p-4 shadow-2xl overflow-hidden">
            {/* Top On-Screen Readouts (HUD) */}
            <div className="flex items-center justify-between text-xs font-mono text-cyan-400 pb-2 border-b border-slate-800/80 mb-2">
              <div className="flex items-center gap-4">
                <span>GAIN: <strong className="text-white">{gainDb.toFixed(1)} dB</strong></span>
                <span>RANGE: <strong className="text-white">{rangeMm} mm</strong></span>
                <span>VEL: <strong className="text-white">{velocityMs} m/s</strong></span>
              </div>
              <div className="flex items-center gap-4">
                <span>PROBE: <strong className="text-white">{probeAngleDeg}° ({probeFrequencyMhz} MHz)</strong></span>
                <span>ZERO: <strong className="text-white">{zeroDelayUs.toFixed(2)} µs</strong></span>
              </div>
            </div>

            {/* A-Scan Display Canvas */}
            <canvas
              ref={canvasRef}
              width={640}
              height={320}
              className="w-full h-64 sm:h-80 rounded-xl bg-slate-950 border border-slate-800 cursor-crosshair select-none"
            />

            {/* Range Scale Axis below Canvas */}
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 px-1 pt-1.5">
              <span>0 mm</span>
              <span>{(rangeMm * 0.25).toFixed(0)} mm</span>
              <span>{(rangeMm * 0.5).toFixed(0)} mm</span>
              <span>{(rangeMm * 0.75).toFixed(0)} mm</span>
              <span>{rangeMm} mm</span>
            </div>
          </div>

          {/* Digital Trig Sizing Box (Sound Path, Depth, Surface Distance) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl border border-slate-800 bg-slate-900/60 font-mono text-xs">
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <div className="text-slate-500 text-[11px]">{isAr ? 'المسار الصوتي (S):' : 'Sound Path (S):'}</div>
              <div className="text-lg font-black text-cyan-400 mt-0.5">
                {soundPathMeasured > 0 ? `${soundPathMeasured.toFixed(1)} mm` : '---'}
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <div className="text-slate-500 text-[11px]">{isAr ? 'العمق المحسوب (D):' : 'Depth (D):'}</div>
              <div className="text-lg font-black text-amber-400 mt-0.5">
                {depthMeasured > 0 ? `${depthMeasured.toFixed(1)} mm` : '---'}
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <div className="text-slate-500 text-[11px]">{isAr ? 'المسافة السطحية (X):' : 'Surface Dist (X):'}</div>
              <div className="text-lg font-black text-slate-200 mt-0.5">
                {surfaceDistMeasured > 0 ? `${surfaceDistMeasured.toFixed(1)} mm` : '---'}
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <div className="text-slate-500 text-[11px]">{isAr ? 'سعة القمة (% FSH):' : 'Peak Amplitude:'}</div>
              <div className={`text-lg font-black mt-0.5 ${isGateAAlarmTriggered ? 'text-red-400' : 'text-emerald-400'}`}>
                {gateAMaxAmp > 0 ? `${gateAMaxAmp.toFixed(0)} %` : '0 %'}
              </div>
            </div>
          </div>

          {/* Real-time Physical Specimen Inspection Slider */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300">
                {activeSpecimen === 'weld_butt'
                  ? (isAr ? 'موضع المجس نسبة لخط منتصف اللحام (Standoff Distance):' : 'Probe Standoff from Weld Centerline (mm):')
                  : activeSpecimen === 'iiw_v1'
                  ? (isAr ? 'موضع المجس على كتلة IIW V1:' : 'Probe Position on IIW V1 Block:')
                  : activeSpecimen === 'corrosion_step'
                  ? (isAr ? 'الدرجة المختارة على كتلة السلالم:' : 'Selected Step on Step Wedge:')
                  : (isAr ? 'موضع المجس على كتلة V2:' : 'Probe Position on V2 Block:')
                }
              </span>
              <span className="font-mono text-cyan-400 font-bold">
                {activeSpecimen === 'weld_butt' ? `${weldProbeStandoffMm} mm` : ''}
              </span>
            </div>

            {activeSpecimen === 'weld_butt' && (
              <div className="space-y-2">
                <input
                  type="range"
                  min="10"
                  max="70"
                  value={weldProbeStandoffMm}
                  onChange={(e) => setWeldProbeStandoffMm(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>10 mm (Near Cap)</span>
                  <span>35 mm (Root Crack Zone)</span>
                  <span>50 mm (Skip Zone)</span>
                  <span>70 mm</span>
                </div>
              </div>
            )}

            {activeSpecimen === 'iiw_v1' && (
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setIiwPosition('B')}
                  className={`py-2 px-3 rounded text-xs font-mono transition cursor-pointer border ${
                    iiwPosition === 'B' ? 'bg-cyan-600 text-white border-cyan-400' : 'bg-slate-900 text-slate-300 border-slate-800'
                  }`}
                >
                  Position B (100mm Arc)
                </button>
                <button
                  type="button"
                  onClick={() => setIiwPosition('A')}
                  className={`py-2 px-3 rounded text-xs font-mono transition cursor-pointer border ${
                    iiwPosition === 'A' ? 'bg-cyan-600 text-white border-cyan-400' : 'bg-slate-900 text-slate-300 border-slate-800'
                  }`}
                >
                  Position A (25mm Steps)
                </button>
                <button
                  type="button"
                  onClick={() => setIiwPosition('C')}
                  className={`py-2 px-3 rounded text-xs font-mono transition cursor-pointer border ${
                    iiwPosition === 'C' ? 'bg-cyan-600 text-white border-cyan-400' : 'bg-slate-900 text-slate-300 border-slate-800'
                  }`}
                >
                  Position C (1.5mm SDH)
                </button>
              </div>
            )}

            {activeSpecimen === 'corrosion_step' && (
              <div className="grid grid-cols-5 gap-2">
                {[2.5, 5.0, 7.5, 10.0, 12.5].map((thk, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCorrosionStepIndex(idx)}
                    className={`py-2 rounded text-xs font-mono transition cursor-pointer border ${
                      corrosionStepIndex === idx ? 'bg-cyan-600 text-white border-cyan-400' : 'bg-slate-900 text-slate-300 border-slate-800'
                    }`}
                  >
                    {thk} mm
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Physical Controls Keypad (Knobs, Gain, Gates) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-5">
            {/* Gain Controls */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono uppercase text-slate-300 mb-2">
                <span>{isAr ? 'حساسية الكسب (Receiver Gain):' : 'Receiver Gain (dB):'}</span>
                <span className="text-cyan-400 font-bold">{gainDb.toFixed(1)} dB</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 font-mono text-xs">
                {[-6, -1, 1, 6].map((delta) => (
                  <button
                    key={delta}
                    type="button"
                    onClick={() => setGainDb((prev) => Math.min(100, Math.max(0, prev + delta)))}
                    className="py-1.5 rounded bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-slate-200 hover:text-white transition cursor-pointer"
                  >
                    {delta > 0 ? `+${delta} dB` : `${delta} dB`}
                  </button>
                ))}
              </div>
            </div>

            {/* Range Selector */}
            <div>
              <div className="text-xs font-mono uppercase text-slate-300 mb-2">
                {isAr ? 'نطاق المسار الصوتي (Range):' : 'Range Time-Base (mm):'}
              </div>
              <div className="grid grid-cols-3 gap-1.5 font-mono text-xs">
                {[50, 100, 200, 250, 500].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRangeMm(r)}
                    className={`py-1.5 rounded border transition cursor-pointer ${
                      rangeMm === r
                        ? 'bg-cyan-600 text-white border-cyan-500 font-bold'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {r} mm
                  </button>
                ))}
              </div>
            </div>

            {/* Probe Angle Selector */}
            <div>
              <div className="text-xs font-mono uppercase text-slate-300 mb-2">
                {isAr ? 'زاوية المجس (Probe Angle):' : 'Transducer Beam Angle:'}
              </div>
              <div className="grid grid-cols-4 gap-1.5 font-mono text-xs">
                {[0, 45, 60, 70].map((deg) => (
                  <button
                    key={deg}
                    type="button"
                    onClick={() => setProbeAngleDeg(deg)}
                    className={`py-1.5 rounded border transition cursor-pointer ${
                      probeAngleDeg === deg
                        ? 'bg-amber-600 text-white border-amber-500 font-bold'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {deg}°
                  </button>
                ))}
              </div>
            </div>

            {/* Velocity / Material Calibration */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300">{isAr ? 'سرعة الصوت (Velocity):' : 'Sound Velocity:'}</span>
                <span className="text-cyan-400 font-bold">{velocityMs} m/s</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 font-mono text-[11px]">
                <button
                  type="button"
                  onClick={() => setVelocityMs(5920)}
                  className={`py-1 rounded border transition cursor-pointer ${
                    velocityMs === 5920 ? 'bg-cyan-600/30 text-cyan-300 border-cyan-500' : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  Steel (5920)
                </button>
                <button
                  type="button"
                  onClick={() => setVelocityMs(3240)}
                  className={`py-1 rounded border transition cursor-pointer ${
                    velocityMs === 3240 ? 'bg-cyan-600/30 text-cyan-300 border-cyan-500' : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  Shear (3240)
                </button>
                <button
                  type="button"
                  onClick={() => setVelocityMs(6320)}
                  className={`py-1 rounded border transition cursor-pointer ${
                    velocityMs === 6320 ? 'bg-cyan-600/30 text-cyan-300 border-cyan-500' : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  Alum (6320)
                </button>
              </div>
            </div>

            {/* Gate A Adjusters */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                <span>{isAr ? 'إعدادات بوابة القياس A:' : 'Gate A Calibration:'}</span>
                <span>{gateAStartMm} - {gateAStartMm + gateAWidthMm} mm</span>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>{isAr ? 'بداية البوابة:' : 'Gate Start:'}</span>
                  <span className="font-mono">{gateAStartMm} mm</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max={rangeMm - 20}
                  value={gateAStartMm}
                  onChange={(e) => setGateAStartMm(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>{isAr ? 'عرض البوابة:' : 'Gate Width:'}</span>
                  <span className="font-mono">{gateAWidthMm} mm</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={gateAWidthMm}
                  onChange={(e) => setGateAWidthMm(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>{isAr ? 'عتبة التحذير (% FSH):' : 'Alarm Threshold:'}</span>
                  <span className="font-mono">{gateAThresholdPct} %</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={gateAThresholdPct}
                  onChange={(e) => setGateAThresholdPct(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
