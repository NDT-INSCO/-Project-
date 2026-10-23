import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../../../types';
import { 
  Activity, 
  Sliders, 
  RotateCcw, 
  Crosshair, 
  ShieldCheck, 
  Layers, 
  CheckCircle2, 
  XCircle, 
  Maximize2,
  Cpu,
  Eye,
  Info
} from 'lucide-react';

interface PautOmniScanDeviceProps {
  language: Language;
}

export type PautFlawTarget = 'root_crack' | 'lack_of_fusion' | 'slag_inclusion' | 'sound_weld';

export const PautOmniScanDevice: React.FC<PautOmniScanDeviceProps> = ({ language }) => {
  const isAr = language === 'ar';

  // --- Instrument Controls State ---
  const [gainDb, setGainDb] = useState<number>(44.0); // 20 to 80 dB
  const [selectedAngleDeg, setSelectedAngleDeg] = useState<number>(55); // 40° to 70° sectorial cursor
  const [probeIndexOffsetMm, setProbeIndexOffsetMm] = useState<number>(36); // Standoff distance from weld centerline (20 to 60 mm)
  const [activeFlawTarget, setActiveFlawTarget] = useState<PautFlawTarget>('root_crack');
  const [focalDepthMm, setFocalDepthMm] = useState<number>(18); // Depth of focal plane
  const [isWeldOverlayVisible, setIsWeldOverlayVisible] = useState<boolean>(true);
  const [showSizingCaliper, setShowSizingCaliper] = useState<boolean>(true);

  // Calipers
  const [caliperY1Mm, setCaliperY1Mm] = useState<number>(16);
  const [caliperY2Mm, setCaliperY2Mm] = useState<number>(20);

  // Canvases refs
  const sScanCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const aScanCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Weld geometry constants (20mm plate thickness, 60° included bevel = 30° per side)
  const plateThicknessMm = 20;

  // Target Flaw specifications
  const flawDetails = {
    root_crack: {
      name: { ar: 'شرخ طولي بجذر اللحام (Root Crack)', en: 'Longitudinal Root Crack' },
      depthMm: 19.0,
      standoffAtPeakMm: 35.0, // Standoff where 55° hits root (20mm depth / tan(55°) ≈ 14mm, offset ~35mm)
      optimalAngleDeg: 55,
      severity: 'Critical Reject',
      asmeVerdict: 'REJECT' as const,
      reason: {
        ar: 'مرفوض قطعاً: الكود ASME Section V يمنع منعاً باتاً وجود أي شروخ مستوية أو تكسر بجذر اللحام.',
        en: 'Strictly Rejectable: Zero tolerance for planar crack-like indications per ASME Sec. V Article 4.'
      }
    },
    lack_of_fusion: {
      name: { ar: 'نقص انصهار بالجدار الجانبي (Lack of Sidewall Fusion)', en: 'Lack of Sidewall Fusion' },
      depthMm: 12.0,
      standoffAtPeakMm: 28.0,
      optimalAngleDeg: 60,
      severity: 'Major Reject',
      asmeVerdict: 'REJECT' as const,
      reason: {
        ar: 'مرفوض: انعكاس قوي ممتد بطول شطبة اللحام (30°) يتجاوز الحد الأقصى المسموح للعيوب المستوية.',
        en: 'Rejectable: Planar planar reflection exceeding allowable length limits along the 30° bevel face.'
      }
    },
    slag_inclusion: {
      name: { ar: 'شائبة خبث وسطية (Mid-Wall Slag Inclusion)', en: 'Mid-Wall Slag Inclusion' },
      depthMm: 10.0,
      standoffAtPeakMm: 38.0,
      optimalAngleDeg: 50,
      severity: 'Minor Acceptable',
      asmeVerdict: 'ACCEPT' as const,
      reason: {
        ar: 'مقبول: عيب حجمي متقطع طوله أقل من 6 مم، لا يشكل خطورة على سلامة الوعاء.',
        en: 'Acceptable: Isolated volumetric inclusion under 6 mm, conforming to ASME Section VIII acceptance standards.'
      }
    },
    sound_weld: {
      name: { ar: 'لحام سليم تام النفاذية (100% Sound Weld)', en: '100% Sound Weld Joint' },
      depthMm: 0,
      standoffAtPeakMm: 0,
      optimalAngleDeg: 55,
      severity: 'Full Pass',
      asmeVerdict: 'ACCEPT' as const,
      reason: {
        ar: 'مقبول بامتياز: نفاذية كاملة وتجانس تام بدون أي مؤشرات عيوب حجمية أو مستوية.',
        en: 'Passed: 100% complete penetration, uniform acoustic impedance, zero rejectable discontinuities.'
      }
    }
  };

  const currentFlaw = flawDetails[activeFlawTarget];

  // Flaw height calculation
  const measuredFlawHeightMm = Math.abs(caliperY2Mm - caliperY1Mm);

  // --------------------------------------------------------------------------
  // S-Scan Sectorial Sweep Rendering Effect
  // --------------------------------------------------------------------------
  useEffect(() => {
    const canvas = sScanCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Dark screen background
    ctx.fillStyle = '#05070e';
    ctx.fillRect(0, 0, width, height);

    // Ultrasonic Sectorial Pie Parameters
    // Sweep from 40° to 70°
    const originX = width * 0.2; // Probe position on top surface
    const originY = 25; // Top surface line
    const maxRadius = Math.min(width * 0.75, height * 0.9);

    const minAngleRad = (40 * Math.PI) / 180;
    const maxAngleRad = (70 * Math.PI) / 180;

    // Draw Sectorial Pie Boundary & Angle Guideline Rays
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;

    // Arc depth guidelines (every 10mm depth)
    const scaleFactor = maxRadius / 50; // 50mm sound path max
    for (let rMm = 10; rMm <= 50; rMm += 10) {
      const rPx = rMm * scaleFactor;
      ctx.beginPath();
      ctx.arc(originX, originY, rPx, minAngleRad, maxAngleRad);
      ctx.stroke();

      // Depth Label
      const labelX = originX + rPx * Math.cos(maxAngleRad) + 4;
      const labelY = originY + rPx * Math.sin(maxAngleRad);
      ctx.fillStyle = '#475569';
      ctx.font = '9px monospace';
      ctx.fillText(`${rMm}mm`, labelX, labelY);
    }

    // Angle rays (40°, 45°, 50°, 55°, 60°, 65°, 70°)
    for (let deg = 40; deg <= 70; deg += 5) {
      const aRad = (deg * Math.PI) / 180;
      const xEnd = originX + maxRadius * Math.cos(aRad);
      const yEnd = originY + maxRadius * Math.sin(aRad);

      ctx.strokeStyle = deg === 45 || deg === 60 ? 'rgba(56, 189, 248, 0.3)' : '#1e293b';
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(xEnd, yEnd);
      ctx.stroke();

      // Degree label
      ctx.fillStyle = '#64748b';
      ctx.font = '9px monospace';
      ctx.fillText(`${deg}°`, xEnd + 2, yEnd + 2);
    }

    // Top Surface Line
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(10, originY);
    ctx.lineTo(width - 10, originY);
    ctx.stroke();

    // Bottom Plate Backwall Line (at 20mm depth)
    const backwallY = originY + plateThicknessMm * scaleFactor * 0.9;
    ctx.strokeStyle = 'rgba(100, 116, 139, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(10, backwallY);
    ctx.lineTo(width - 10, backwallY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#64748b';
    ctx.font = '9px monospace';
    ctx.fillText('Backwall (20mm)', 14, backwallY - 4);

    // Weld Bevel Geometry Overlay (V-Groove)
    if (isWeldOverlayVisible) {
      const weldCenterlineX = originX + probeIndexOffsetMm * scaleFactor * 0.8;
      const bevelWidthTop = 22 * scaleFactor * 0.5;
      const rootOpening = 4 * scaleFactor * 0.5;

      ctx.strokeStyle = 'rgba(234, 179, 8, 0.5)'; // Amber weld bevel outline
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      // Left Bevel Face
      ctx.moveTo(weldCenterlineX - bevelWidthTop, originY);
      ctx.lineTo(weldCenterlineX - rootOpening, backwallY);
      // Root Face
      ctx.lineTo(weldCenterlineX + rootOpening, backwallY);
      // Right Bevel Face
      ctx.lineTo(weldCenterlineX + bevelWidthTop, originY);
      ctx.stroke();

      // Weld Centerline
      ctx.strokeStyle = 'rgba(234, 179, 8, 0.3)';
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(weldCenterlineX, originY);
      ctx.lineTo(weldCenterlineX, backwallY + 15);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#eab308';
      ctx.font = '9px monospace';
      ctx.fillText('WELD CENTER', weldCenterlineX - 25, originY - 6);
    }

    // Ultrasonic Wedge & Transducer Icon at Origin
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.moveTo(originX - 25, originY - 18);
    ctx.lineTo(originX + 15, originY - 18);
    ctx.lineTo(originX + 5, originY);
    ctx.lineTo(originX - 25, originY);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '8px monospace';
    ctx.fillText('5L64-A12', originX - 23, originY - 7);

    // Draw Simulated PAUT Flaw Indications (False-Color Heatmap)
    if (activeFlawTarget !== 'sound_weld') {
      const standoffDiff = Math.abs(probeIndexOffsetMm - currentFlaw.standoffAtPeakMm);
      // Check if probe is positioned to illuminate the flaw
      if (standoffDiff < 14) {
        const peakRad = (currentFlaw.optimalAngleDeg * Math.PI) / 180;
        const flawSoundPath = currentFlaw.depthMm / Math.cos(peakRad);
        const flawRadiusPx = flawSoundPath * scaleFactor;

        const flawX = originX + flawRadiusPx * Math.cos(peakRad);
        const flawY = originY + flawRadiusPx * Math.sin(peakRad);

        const gainMultiplier = Math.pow(10, (gainDb - 40) / 20);
        const intensity = Math.min(1.0, Math.max(0.1, (1.0 - standoffDiff / 15) * gainMultiplier));

        // Radial Color Heatmap for flaw (Red core -> Yellow -> Green -> Blue halo)
        const radGrad = ctx.createRadialGradient(flawX, flawY, 2, flawX, flawY, 22 * intensity);
        radGrad.addColorStop(0, 'rgba(239, 68, 68, 0.95)'); // Red (0 dB peak)
        radGrad.addColorStop(0.35, 'rgba(234, 179, 8, 0.85)'); // Yellow (-6 dB)
        radGrad.addColorStop(0.7, 'rgba(34, 197, 94, 0.6)'); // Green (-12 dB)
        radGrad.addColorStop(1, 'rgba(6, 182, 212, 0)'); // Cyan/Blue halo (-18 dB)

        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.ellipse(flawX, flawY, 18 * intensity, 12 * intensity, peakRad, 0, Math.PI * 2);
        ctx.fill();

        // Tip Diffraction Signal for Crack
        if (activeFlawTarget === 'root_crack') {
          const tipX = flawX - 6;
          const tipY = flawY - 8;
          ctx.fillStyle = 'rgba(56, 189, 248, 0.8)';
          ctx.beginPath();
          ctx.arc(tipX, tipY, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Active Angular Cursor (Selected Angle Ray - Bright Green Crosshair)
    const curRad = (selectedAngleDeg * Math.PI) / 180;
    const curXEnd = originX + maxRadius * Math.cos(curRad);
    const curYEnd = originY + maxRadius * Math.sin(curRad);

    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 3]);
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(curXEnd, curYEnd);
    ctx.stroke();
    ctx.setLineDash([]);

    // Angular cursor degree indicator badge
    ctx.fillStyle = '#22c55e';
    ctx.font = 'bold 10px monospace';
    ctx.fillText(`${selectedAngleDeg}° CURSOR`, curXEnd - 30, curYEnd + 14);

    // Sizing Calipers Overlay (Depth Measurement Lines)
    if (showSizingCaliper) {
      const cal1Y = originY + caliperY1Mm * scaleFactor * 0.9;
      const cal2Y = originY + caliperY2Mm * scaleFactor * 0.9;

      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(width * 0.45, cal1Y);
      ctx.lineTo(width * 0.85, cal1Y);
      ctx.moveTo(width * 0.45, cal2Y);
      ctx.lineTo(width * 0.85, cal2Y);
      ctx.stroke();

      // Measurement bracket
      ctx.strokeStyle = '#06b6d4';
      ctx.beginPath();
      ctx.moveTo(width * 0.82, cal1Y);
      ctx.lineTo(width * 0.82, cal2Y);
      ctx.stroke();

      ctx.fillStyle = '#22d3ee';
      ctx.font = 'bold 9px monospace';
      ctx.fillText(`Δh = ${measuredFlawHeightMm.toFixed(1)} mm`, width * 0.83, (cal1Y + cal2Y) / 2 + 3);
    }
  }, [
    gainDb,
    selectedAngleDeg,
    probeIndexOffsetMm,
    activeFlawTarget,
    isWeldOverlayVisible,
    showSizingCaliper,
    caliperY1Mm,
    caliperY2Mm
  ]);

  // --------------------------------------------------------------------------
  // Synchronized A-Scan Rendering Effect (For currently selected sectorial angle)
  // --------------------------------------------------------------------------
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

    // CRT Graticule
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = (height / 5) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    for (let j = 0; j <= 5; j++) {
      const x = (width / 5) * j;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Gate A (monitoring weld area)
    const gateStart = width * 0.35;
    const gateEnd = width * 0.75;
    const gateY = height * 0.5;

    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(gateStart, gateY);
    ctx.lineTo(gateEnd, gateY);
    ctx.stroke();

    // Calculate A-Scan echo peak for currently selected angle
    const angleDiff = Math.abs(selectedAngleDeg - currentFlaw.optimalAngleDeg);
    const standoffDiff = Math.abs(probeIndexOffsetMm - currentFlaw.standoffAtPeakMm);

    let peakAmp = 0;
    let peakPosPct = 0.55;

    if (activeFlawTarget !== 'sound_weld') {
      if (angleDiff < 10 && standoffDiff < 14) {
        const gainMult = Math.pow(10, (gainDb - 40) / 20);
        peakAmp = Math.min(95, (85 - angleDiff * 6 - standoffDiff * 3) * gainMult);
      }
    }

    // Draw A-scan waveform trace
    ctx.strokeStyle = '#22c55e'; // Bright green trace
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let x = 0; x < width; x++) {
      let y = height - 4;

      // Initial wedge pulse
      if (x < width * 0.1) {
        y -= (height * 0.8) * Math.exp(-Math.pow(x / (width * 0.03), 2));
      }

      // Flaw Echo
      if (peakAmp > 0) {
        const flawCenterPx = width * peakPosPct;
        const dist = Math.abs(x - flawCenterPx);
        if (dist < width * 0.08) {
          const bell = Math.exp(-Math.pow(dist / (width * 0.025), 2));
          const rf = Math.abs(Math.sin((dist / (width * 0.015)) * Math.PI * 3));
          y -= (peakAmp / 100) * (height - 20) * bell * rf;
        }
      }

      // Subtle grass
      y += (Math.random() - 0.5) * 2;

      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Readout text on A-Scan
    ctx.fillStyle = '#22c55e';
    ctx.font = '10px monospace';
    ctx.fillText(`A-SCAN @ ${selectedAngleDeg}°`, 8, 14);
    if (peakAmp > 0) {
      ctx.fillStyle = peakAmp > 50 ? '#ef4444' : '#22d3ee';
      ctx.fillText(`AMP: ${peakAmp.toFixed(0)}% FSH`, width - 90, 14);
    }
  }, [gainDb, selectedAngleDeg, probeIndexOffsetMm, activeFlawTarget]);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>{isAr ? 'محاكي جهاز الفحص المتقدم بالمصفوفات الطورية (Olympus OmniScan X3)' : 'Advanced Phased Array Ultrasonic Flaw Detector (OmniScan X3)'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            {isAr ? 'مختبر المسح القطاعي S-Scan وتحديد أبعاد عيوب اللحام' : 'Sectorial S-Scan & Flaw Sizing Phased Array Lab'}
          </h3>
        </div>

        {/* ASME Verdict Pill */}
        <div className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-bold flex items-center gap-2 ${
          currentFlaw.asmeVerdict === 'REJECT'
            ? 'bg-red-500/10 text-red-400 border-red-500/30'
            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
        }`}>
          {currentFlaw.asmeVerdict === 'REJECT' ? <XCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
          <span>ASME VERDICT: {currentFlaw.asmeVerdict}</span>
        </div>
      </div>

      {/* Flaw Sample Target Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {(['root_crack', 'lack_of_fusion', 'slag_inclusion', 'sound_weld'] as PautFlawTarget[]).map((targetKey) => {
          const detail = flawDetails[targetKey];
          const isSelected = activeFlawTarget === targetKey;
          return (
            <button
              key={targetKey}
              type="button"
              onClick={() => setActiveFlawTarget(targetKey)}
              className={`p-3 rounded-xl border text-start transition cursor-pointer ${
                isSelected
                  ? 'bg-cyan-950/40 border-cyan-500 text-white shadow-md'
                  : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-bold">{detail.name[language]}</div>
              <div className="text-[10px] font-mono text-slate-500 mt-0.5">{detail.severity}</div>
            </button>
          );
        })}
      </div>

      {/* Main Dual Screen: S-Scan + Synchronized A-Scan */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Sectorial S-Scan Canvas View */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-2xl border-2 border-slate-700 bg-black p-4 relative shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-slate-800 mb-2">
              <div className="flex items-center gap-3">
                <span className="text-white font-bold">SECTORIAL S-SCAN (40° - 70°)</span>
                <span className="text-slate-600">|</span>
                <span className="text-cyan-400">PROBE: 5L64-A12 / SA12-N55S</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsWeldOverlayVisible(!isWeldOverlayVisible)}
                  className={`px-2 py-0.5 rounded text-[10px] transition cursor-pointer border ${
                    isWeldOverlayVisible ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-slate-900 text-slate-500 border-slate-800'
                  }`}
                >
                  Weld Bevel
                </button>
                <button
                  type="button"
                  onClick={() => setShowSizingCaliper(!showSizingCaliper)}
                  className={`px-2 py-0.5 rounded text-[10px] transition cursor-pointer border ${
                    showSizingCaliper ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-900 text-slate-500 border-slate-800'
                  }`}
                >
                  Calipers
                </button>
              </div>
            </div>

            {/* S-Scan Canvas */}
            <canvas
              ref={sScanCanvasRef}
              width={640}
              height={340}
              className="w-full h-72 sm:h-84 rounded-xl bg-slate-950 border border-slate-800 select-none cursor-crosshair"
            />

            {/* dB Heatmap Legend */}
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 px-1">
              <span>-18 dB (Cyan)</span>
              <span>-12 dB (Green)</span>
              <span>-6 dB (Yellow)</span>
              <span className="text-red-400 font-bold">0 dB Peak (Red)</span>
            </div>
          </div>

          {/* Caliper Measuring Controls & Flaw Dimensions */}
          {showSizingCaliper && (
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 font-mono text-xs grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <div className="text-slate-500 text-[11px]">{isAr ? 'العمق العلوي (Y1):' : 'Upper Depth (Y1):'}</div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  step="0.5"
                  value={caliperY1Mm}
                  onChange={(e) => setCaliperY1Mm(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer mt-1"
                />
                <div className="text-slate-200 font-bold">{caliperY1Mm.toFixed(1)} mm</div>
              </div>

              <div>
                <div className="text-slate-500 text-[11px]">{isAr ? 'العمق السفلي (Y2):' : 'Lower Depth (Y2):'}</div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  step="0.5"
                  value={caliperY2Mm}
                  onChange={(e) => setCaliperY2Mm(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer mt-1"
                />
                <div className="text-slate-200 font-bold">{caliperY2Mm.toFixed(1)} mm</div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-slate-500 text-[11px]">{isAr ? 'ارتفاع العيب (Δh):' : 'Flaw Height (Δh):'}</div>
                <div className="text-base font-black text-cyan-400 mt-0.5">
                  {measuredFlawHeightMm.toFixed(1)} mm
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-slate-500 text-[11px]">{isAr ? 'قرار الكود ASME:' : 'Code Status:'}</div>
                <div className={`text-base font-black mt-0.5 ${currentFlaw.asmeVerdict === 'REJECT' ? 'text-red-400' : 'text-emerald-400'}`}>
                  {currentFlaw.asmeVerdict}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Synchronized A-Scan + Sectorial Control Sliders */}
        <div className="lg:col-span-4 space-y-4">
          {/* Synchronized A-Scan Box */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-300">
              <span className="font-bold">{isAr ? 'إشارة A-Scan المتزامنة' : 'Synchronized A-Scan Trace'}</span>
              <span className="text-cyan-400 font-bold">{selectedAngleDeg}°</span>
            </div>

            <canvas
              ref={aScanCanvasRef}
              width={320}
              height={140}
              className="w-full h-32 rounded-lg bg-black border border-slate-800 select-none"
            />
          </div>

          {/* Interactive Inspection Hardware Controls */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-4 text-xs font-mono">
            {/* Angle Scrubbing Slider */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>{isAr ? 'مؤشر الزاوية (Cursor Angle):' : 'Cursor Beam Angle:'}</span>
                <span className="text-emerald-400 font-bold">{selectedAngleDeg}°</span>
              </div>
              <input
                type="range"
                min="40"
                max="70"
                value={selectedAngleDeg}
                onChange={(e) => setSelectedAngleDeg(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>40°</span>
                <span>45°</span>
                <span>55°</span>
                <span>60°</span>
                <span>70°</span>
              </div>
            </div>

            {/* Probe Standoff Scanner Slider */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>{isAr ? 'موضع الماسح المشفر (Standoff):' : 'Encoder Standoff (mm):'}</span>
                <span className="text-cyan-400 font-bold">{probeIndexOffsetMm} mm</span>
              </div>
              <input
                type="range"
                min="20"
                max="55"
                value={probeIndexOffsetMm}
                onChange={(e) => setProbeIndexOffsetMm(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>20 mm</span>
                <span>35 mm (Weld Zone)</span>
                <span>55 mm</span>
              </div>
            </div>

            {/* Gain Controls */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>{isAr ? 'حساسية الكسب (Gain):' : 'Receiver Gain:'}</span>
                <span className="text-amber-400 font-bold">{gainDb.toFixed(1)} dB</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {[-6, -1, 1, 6].map((delta) => (
                  <button
                    key={delta}
                    type="button"
                    onClick={() => setGainDb((prev) => Math.min(80, Math.max(20, prev + delta)))}
                    className="py-1.5 rounded bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-slate-200 transition cursor-pointer"
                  >
                    {delta > 0 ? `+${delta}` : delta}
                  </button>
                ))}
              </div>
            </div>

            {/* Evaluation Notes Box */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <div className="text-cyan-400 font-bold mb-1 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                <span>{isAr ? 'ملاحظات التقييم الهندسي Level III:' : 'Level III Evaluation Notes:'}</span>
              </div>
              <p className="text-[11px] text-slate-400">
                {currentFlaw.reason[language]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
