import React, { useState, useEffect } from 'react';
import engineerImg from '../assets/images/engineer_gear_notes_1791961284901.jpg';
import { PenTool, CheckCircle2, Sparkles, FileText, Settings, Radio, Eye } from 'lucide-react';
import { Language } from '../types';

export interface AnimatedEngineerAvatarProps {
  size?: 'sm' | 'chat-bar' | 'card' | 'hero';
  language?: Language;
  showDiscussionNotes?: boolean;
  className?: string;
  renderMode?: 'vector' | 'hybrid' | 'photo';
}

const DISCUSSION_SNIPPETS = {
  ar: [
    { title: 'مناقشة العميل', text: 'فحص ولحام أنابيب خط الغاز 12" طبقاً لـ ASME B31.3 ومعايير قبول الشروخ' },
    { title: 'توثيق المواصفات', text: 'اختيار فحص Phased Array PAUT بدلاً من RT لسرعة الإنجاز بدون إشعاع' },
    { title: 'جدول PWHT', text: 'تحديد دورة التسخين عند 620°C ومعدل تبريد منضبط ومسجلات الشارت' },
    { title: 'جاهزية الأسطول', text: 'تعبئة فورية لوحدات 65 kW وأطقم التفتيش المعتمدة Level II خلال 24 ساعة' }
  ],
  en: [
    { title: 'Client Discussion', text: '12" Gas Pipeline weld inspection per ASME B31.3 crack acceptance' },
    { title: 'Spec Documentation', text: 'Selecting PAUT over RT for faster site turnaround & zero radiation' },
    { title: 'PWHT Schedule', text: 'Determining soak cycle at 620°C with 6-channel chart verification' },
    { title: 'Fleet Mobilization', text: 'Immediate 24h dispatch of 65 kW units & Level II inspection crew' }
  ]
};

/**
 * Modern Vector Illustration: Engineer wearing safety helmet and hi-vis vest,
 * emerging from an industrial mechanical gear, holding a notepad and actively
 * writing client discussion notes with an animated pen.
 */
export const EngineerGearVectorGraphic: React.FC<{
  size?: number | string;
  className?: string;
  isWriting?: boolean;
}> = ({ size = '100%', className = '', isWriting = true }) => {
  return (
    <svg
      viewBox="0 0 240 240"
      className={`overflow-visible select-none ${className}`}
      style={{ width: size, height: size }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gear Gradients */}
        <linearGradient id="gearGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="35%" stopColor="#f59e0b" />
          <stop offset="70%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>

        <linearGradient id="gearSteelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="50%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>

        <linearGradient id="portalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#090d24" />
          <stop offset="100%" stopColor="#030712" />
        </linearGradient>

        {/* Helmet Gradient */}
        <linearGradient id="helmetGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="30%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>

        {/* Safety Vest Gradients */}
        <linearGradient id="vestOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="50%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#c2410c" />
        </linearGradient>

        <linearGradient id="reflectiveSilverGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.85" />
        </linearGradient>

        {/* Notepad Gradient */}
        <linearGradient id="notepadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>

        {/* Glow Filters */}
        <filter id="gearGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <filter id="penSparkFilter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Ambient background glow ring */}
      <circle cx="120" cy="120" r="110" fill="none" stroke="#f59e0b" strokeWidth="2" strokeOpacity="0.15" />
      <circle cx="120" cy="120" r="102" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 6" strokeOpacity="0.3" className="animate-gear-reverse origin-center" />

      {/* 1. ROTATING INDUSTRIAL MECHANICAL GEAR (ترس ميكانيكي مسنن) */}
      <g className="animate-gear-slow origin-center">
        {/* Outer Gear Wheel Rim */}
        <circle cx="120" cy="120" r="92" fill="url(#gearSteelGrad)" stroke="url(#gearGoldGrad)" strokeWidth="4" />
        <circle cx="120" cy="120" r="82" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="8 4" strokeOpacity="0.6" />

        {/* 12 Outer Gear Teeth with 3D Bevels */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <g key={deg} transform={`rotate(${deg} 120 120)`}>
            {/* Tooth base */}
            <path
              d="M110 24 L113 14 L127 14 L130 24 Z"
              fill="url(#gearGoldGrad)"
              stroke="#78350f"
              strokeWidth="1.2"
            />
            {/* Tooth highlight */}
            <line x1="114" y1="16" x2="126" y2="16" stroke="#fef08a" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="111" y1="23" x2="129" y2="23" stroke="#92400e" strokeWidth="1" />
          </g>
        ))}

        {/* Inner Gear Spokes */}
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <line
            key={deg}
            x1="120"
            y1="50"
            x2="120"
            y2="78"
            stroke="#f59e0b"
            strokeWidth="3.5"
            strokeOpacity="0.7"
            transform={`rotate(${deg} 120 120)`}
          />
        ))}

        {/* Gear Fastener Rivets */}
        {[30, 90, 150, 210, 270, 330].map((deg) => (
          <circle
            key={deg}
            cx="120"
            cy="52"
            r="3"
            fill="#fef08a"
            stroke="#78350f"
            strokeWidth="1"
            transform={`rotate(${deg} 120 120)`}
          />
        ))}
      </g>

      {/* 2. CENTER APERTURE PORTAL (فتحة الترس التي يخرج منها المهندس) */}
      <circle cx="120" cy="120" r="70" fill="url(#portalGrad)" stroke="#38bdf8" strokeWidth="2.5" strokeOpacity="0.8" />
      <circle cx="120" cy="120" r="66" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.5" />

      {/* 3. THE ENGINEER FIGURE (شخص لابس خوذة وفيست طالع من الترس) */}
      <g className="animate-float-gentle origin-center">
        {/* Torso & Navy Work Uniform Base */}
        <path
          d="M72 175 Q72 135 120 135 Q168 135 168 175 L168 185 Q120 190 72 185 Z"
          fill="#0f172a"
          stroke="#1e293b"
          strokeWidth="1.5"
        />

        {/* HIGH-VISIBILITY SAFETY VEST (فيست أمان عالي الوضوح) */}
        {/* Main Vest Body in Vibrant Safety Orange */}
        <path
          d="M80 178 L86 140 Q100 136 120 137 Q140 136 154 140 L160 178 Q140 183 120 184 Q100 183 80 178 Z"
          fill="url(#vestOrangeGrad)"
          stroke="#c2410c"
          strokeWidth="1.5"
        />

        {/* Fluorescent Lime Side Accents on Vest */}
        <path d="M80 162 L83 144 L90 143 L88 165 Z" fill="#84cc16" opacity="0.9" />
        <path d="M160 162 L157 144 L150 143 L152 165 Z" fill="#84cc16" opacity="0.9" />

        {/* Reflective Silver Stripes (شريط عاكس فضي فوسفوري يلمع) */}
        {/* Horizontal main reflective band */}
        <path
          d="M82 166 Q120 171 158 166 L158 172 Q120 177 82 172 Z"
          fill="url(#reflectiveSilverGrad)"
          stroke="#ffffff"
          strokeWidth="0.5"
          className="animate-pulse"
        />
        {/* Vertical shoulder reflective harness stripes */}
        <path d="M96 140 L97 166 L103 166 L102 140 Z" fill="url(#reflectiveSilverGrad)" opacity="0.95" />
        <path d="M138 140 L137 166 L143 166 L144 140 Z" fill="url(#reflectiveSilverGrad)" opacity="0.95" />

        {/* Safety ID / Level II QA Badge clipped to vest */}
        <rect x="88" y="148" width="12" height="15" rx="1.5" fill="#f8fafc" stroke="#334155" strokeWidth="0.8" />
        <rect x="90" y="150" width="8" height="3" fill="#0284c7" />
        <line x1="90" y1="155" x2="98" y2="155" stroke="#475569" strokeWidth="0.8" />
        <line x1="90" y1="158" x2="96" y2="158" stroke="#475569" strokeWidth="0.8" />
        <circle cx="94" cy="147" r="1.5" fill="#f59e0b" />

        {/* Vest V-Neck opening with shirt collar */}
        <polygon points="120,154 110,137 130,137" fill="#0f172a" />
        <line x1="120" y1="154" x2="120" y2="183" stroke="#7c2d12" strokeWidth="1.5" />

        {/* Neck */}
        <rect x="111" y="118" width="18" height="20" rx="3" fill="#fcd34d" />
        <path d="M111 127 Q120 132 129 127" fill="none" stroke="#f59e0b" strokeWidth="1.2" />

        {/* Head / Face */}
        <ellipse cx="120" cy="108" rx="20" ry="22" fill="#fde68a" stroke="#f59e0b" strokeWidth="1" />

        {/* Focused eyes with protective engineering glasses / safety spectacles */}
        <rect x="106" y="103" width="12" height="8" rx="2" fill="#38bdf8" fillOpacity="0.4" stroke="#0284c7" strokeWidth="1.2" />
        <rect x="122" y="103" width="12" height="8" rx="2" fill="#38bdf8" fillOpacity="0.4" stroke="#0284c7" strokeWidth="1.2" />
        <line x1="118" y1="107" x2="122" y2="107" stroke="#0284c7" strokeWidth="1.2" />
        {/* Eyes pupils */}
        <circle cx="112" cy="107" r="2" fill="#0f172a" />
        <circle cx="128" cy="107" r="2" fill="#0f172a" />
        {/* Friendly confident smile */}
        <path d="M114 119 Q120 124 126 119" fill="none" stroke="#b45309" strokeWidth="1.6" strokeLinecap="round" />

        {/* SAFETY HELMET / HARD HAT (خوذة أمان صفراء هندسية) */}
        {/* Hard Hat Dome */}
        <path
          d="M97 98 C97 76 143 76 143 98 Z"
          fill="url(#helmetGrad)"
          stroke="#b45309"
          strokeWidth="2"
        />
        {/* Hard Hat Top Ridge (Reinforced Rib) */}
        <path
          d="M116 77 Q120 74 124 77 L123 98 L117 98 Z"
          fill="#fef08a"
          stroke="#d97706"
          strokeWidth="1"
        />
        {/* Hard Hat Visor / Brim */}
        <path
          d="M93 98 Q120 94 147 98 L149 102 Q120 98 91 102 Z"
          fill="#d97706"
          stroke="#78350f"
          strokeWidth="1.2"
        />
        {/* Front Headlamp / Torch on Helmet (كشاف أمامي) */}
        <rect x="114" y="90" width="12" height="7" rx="1.5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
        <circle cx="120" cy="93.5" r="3" fill="#e0f2fe" />
        <circle cx="120" cy="93.5" r="1.5" fill="#38bdf8" className="animate-ping" />
        {/* Headlamp beam cone */}
        <polygon points="116,97 124,97 136,120 104,120" fill="#38bdf8" opacity="0.15" />

        {/* 4. NOTEPAD / CLIPBOARD (نوته تدوين ملاحظات مناقشة العميل) */}
        {/* Held in Engineer's Left Hand, tilted in front */}
        <g transform="translate(68, 142) rotate(-8)">
          {/* Clipboard Board Body */}
          <rect x="0" y="0" width="46" height="58" rx="4" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
          {/* Paper Sheet */}
          <rect x="3" y="6" width="40" height="48" rx="2" fill="url(#notepadGrad)" />
          {/* Metallic Top Clip */}
          <rect x="15" y="-2" width="16" height="7" rx="1.5" fill="#f59e0b" stroke="#78350f" strokeWidth="0.8" />
          <circle cx="23" cy="1.5" r="1.5" fill="#1e293b" />

          {/* Header on Notepad: INSCO NOTES */}
          <rect x="6" y="9" width="34" height="4" rx="1" fill="#0284c7" />
          <line x1="8" y1="11" x2="28" y2="11" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" />

          {/* Ruled Notes Lines (خطوط مناقشة العميل) */}
          <line x1="6" y1="17" x2="38" y2="17" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="2 1" />
          <line x1="6" y1="22" x2="34" y2="22" stroke="#3b82f6" strokeWidth="1" />
          <line x1="6" y1="27" x2="38" y2="27" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="2 1" />
          <line x1="6" y1="32" x2="32" y2="32" stroke="#3b82f6" strokeWidth="1" />
          <line x1="6" y1="37" x2="38" y2="37" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="2 1" />
          <line x1="6" y1="42" x2="36" y2="42" stroke="#f59e0b" strokeWidth="1" />
          <line x1="6" y1="47" x2="24" y2="47" stroke="#10b981" strokeWidth="1" />

          {/* Left Hand Holding the Notepad */}
          <ellipse cx="2" cy="30" rx="4" ry="7" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
          <circle cx="2" cy="26" r="3" fill="#fde68a" />
        </g>

        {/* 5. RIGHT HAND HOLDING PEN & WRITING (قلم ونوته وبيكتب مناقشة العميل) */}
        {/* Animated Pen with dynamic writing movement */}
        <g className={isWriting ? 'animate-pen-scribble origin-center' : ''}>
          {/* Right Hand Knuckles */}
          <circle cx="126" cy="158" r="6" fill="#fde68a" stroke="#d97706" strokeWidth="1" />

          {/* Stylus / Pen Body (قلم كتابة هندسي عصري) */}
          <g transform="translate(118, 142) rotate(35)">
            {/* Pen Barrel */}
            <rect x="0" y="0" width="5" height="26" rx="2" fill="#0284c7" stroke="#0369a1" strokeWidth="0.8" />
            {/* Pen Grip Band */}
            <rect x="0" y="16" width="5" height="6" fill="#f59e0b" />
            {/* Metallic Nib / Tip */}
            <polygon points="0,26 5,26 2.5,31" fill="#e2e8f0" stroke="#475569" strokeWidth="0.5" />
            <circle cx="2.5" cy="31" r="0.8" fill="#f59e0b" />

            {/* Writing Glow & Sparkles at Nib (تأثير وميض وسحر الكتابة أثناء المناقشة) */}
            <circle cx="2.5" cy="31" r="2.5" fill="#38bdf8" opacity="0.75" className="animate-ping" />
            <circle cx="2.5" cy="31" r="1.2" fill="#ffffff" />
          </g>
        </g>

        {/* Floating Ink Scribble Particle Path */}
        <path
          d="M96 168 Q100 166 104 169 Q108 171 112 167"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray="2 3"
          className="animate-pulse"
        />
      </g>

      {/* Floating Holographic Compass / Standards Indicator Ring */}
      <g transform="translate(182, 42)" className="animate-pulse">
        <circle cx="16" cy="16" r="16" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="12" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
        <path d="M16 6 L18 16 L26 16 L19 20 L21 27 L16 22 L11 27 L13 20 L6 16 L14 16 Z" fill="#f59e0b" />
      </g>
    </svg>
  );
};

export const AnimatedEngineerAvatar: React.FC<AnimatedEngineerAvatarProps> = ({
  size = 'card',
  language = 'ar',
  showDiscussionNotes = false,
  className = '',
  renderMode = 'hybrid'
}) => {
  const isAr = language === 'ar';
  const [activeSnippetIdx, setActiveSnippetIdx] = useState(0);

  // Rotate client discussion notes every 4.2 seconds
  useEffect(() => {
    if (!showDiscussionNotes) return;
    const interval = setInterval(() => {
      setActiveSnippetIdx((prev) => (prev + 1) % DISCUSSION_SNIPPETS.ar.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [showDiscussionNotes]);

  const currentSnippet = (isAr ? DISCUSSION_SNIPPETS.ar : DISCUSSION_SNIPPETS.en)[activeSnippetIdx];

  // 1. SMALL SIZE: Used in message bubbles and inline badges
  if (size === 'sm') {
    return (
      <div className={`relative flex-shrink-0 w-8 h-8 rounded-full ${className}`}>
        {/* Rotating Outer Gear Ring */}
        <div className="absolute -inset-1 rounded-full border-2 border-dashed border-amber-400/70 animate-gear-slow pointer-events-none" />
        <div className="w-full h-full rounded-full overflow-hidden border border-amber-400 shadow-md bg-[#0d102b] flex items-center justify-center">
          <EngineerGearVectorGraphic size={32} />
        </div>
        <span className="absolute -bottom-0.5 -end-0.5 w-2.5 h-2.5 bg-emerald-400 border border-slate-900 rounded-full animate-pulse shadow-sm" />
      </div>
    );
  }

  // 2. CHAT-BAR SIZE: Used in chat window header and quick widgets
  if (size === 'chat-bar') {
    return (
      <div className={`relative flex-shrink-0 flex items-center justify-center w-12 h-12 ${className}`}>
        {/* Vector Gear Illustration */}
        <div className="w-12 h-12 flex items-center justify-center">
          <EngineerGearVectorGraphic size={48} />
        </div>
        {/* Online Status Beacon */}
        <span className="absolute bottom-0 end-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#161938] rounded-full shadow-md" />
      </div>
    );
  }

  // 3. CARD SIZE: Used in section cards and role widgets
  if (size === 'card') {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
          <EngineerGearVectorGraphic size="100%" />
          {/* Active Status Beacon */}
          <div className="absolute -bottom-1 -end-1 flex items-center gap-1 bg-[#101438] px-2 py-0.5 rounded-full border border-emerald-400/60 text-[10px] text-emerald-300 font-bold shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>AI</span>
          </div>
        </div>
      </div>
    );
  }

  // 4. HERO SIZE: Showcase graphic with rotating gear, emerging engineer, and live client discussion notebook
  return (
    <div className={`relative flex flex-col md:flex-row items-center gap-6 p-6 rounded-3xl bg-gradient-to-br from-[#12163b]/95 via-[#0e112d] to-[#151944]/95 border-2 border-amber-500/40 shadow-2xl backdrop-blur-md overflow-hidden ${className}`}>
      {/* Ambient background glows */}
      <div className="absolute -top-16 -start-16 w-52 h-52 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -end-16 w-52 h-52 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Left/Start: The Animated Engineer Emerging from Mechanical Gear */}
      <div className="relative flex-shrink-0 flex items-center justify-center w-40 h-40 sm:w-48 sm:h-48">
        <EngineerGearVectorGraphic size="100%" className="drop-shadow-[0_0_24px_rgba(245,158,11,0.35)]" />

        {/* Connected Mechanical Badge */}
        <div className="absolute -bottom-2 flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-3 py-1 rounded-full text-xs font-black shadow-lg border border-amber-300">
          <Settings className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
          <span>{isAr ? 'مهندس الموقع الذكي' : 'Smart Field Engineer'}</span>
        </div>
      </div>

      {/* Right/End: Real-Time Dynamic Client Discussion Documenter */}
      <div className="flex-1 space-y-3 text-start w-full">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#242b5c] pb-2.5">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <FileText className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                <span>{isAr ? 'توثيق مناقشة العميل الفنية' : 'Live Client Consultation & Technical Logging'}</span>
                <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  {isAr ? 'تدوين لحظي' : 'Live Sync'}
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {isAr
                  ? 'يقوم المهندس الذكي بتسجيل المواصفات، الأكواد، ومعايير القبول مباشرة أثناء مناقشة العميل'
                  : 'AI Engineer actively records standards, scope, and acceptance criteria during client discussion'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-500/25">
            <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span className="font-mono text-[11px] font-bold">ASME / API / AWS</span>
          </div>
        </div>

        {/* Animated Client Discussion Note Card */}
        <div className="p-3.5 rounded-2xl bg-[#090b1c]/80 border border-amber-500/30 shadow-inner flex items-start gap-3 transition-all duration-500">
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5 border border-amber-500/40">
            <PenTool className="w-4 h-4 animate-pen-scribble" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-amber-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                {currentSnippet.title}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {isAr ? 'نوته التفتيش الميداني ومناقشة العميل' : 'Field Discussion Sheet'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              « {currentSnippet.text} »
            </p>
          </div>
        </div>

        {/* Feature Highlights Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#14183d] text-slate-300 border border-[#262f68]">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
            <span>{isAr ? 'خوذة وسترة أمان معتمدة (HSE)' : 'Certified HSE Hard Hat & Vest'}</span>
          </span>
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#14183d] text-slate-300 border border-[#262f68]">
            <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
            <span>{isAr ? 'ترس صناعي ميكانيكي متحرك' : 'Animated Industrial Gear'}</span>
          </span>
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#14183d] text-slate-300 border border-[#262f68]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isAr ? 'قلم ونوته لتوثيق مناقشة العميل' : 'Pen & Notepad Active Logging'}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
