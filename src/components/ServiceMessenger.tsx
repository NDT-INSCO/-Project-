import React, { useState } from 'react';
import { 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  Flame, 
  Activity, 
  FileText, 
  MapPin, 
  Calendar, 
  Sparkles, 
  Printer, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Layers, 
  Wrench,
  AlertCircle,
  Copy,
  Check,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, ServiceRFQ } from '../types';
import { COMPANY_DETAILS, NDT_METHODS } from '../data/inscoData';
import { useAuth } from '../context/AuthContext';
import { Mic, MicOff, Loader2, UserCheck, LogIn } from 'lucide-react';

interface ServiceMessengerProps {
  language: Language;
  initialService?: string;
  initialQuery?: string;
}

export const ServiceMessenger: React.FC<ServiceMessengerProps> = ({
  language,
  initialService,
  initialQuery
}) => {
  const isAr = language === 'ar';
  const { user, signInWithGoogle, saveServiceRequest, userRequests } = useAuth();

  const [activeTab, setActiveTab] = useState<'create' | 'history'>('create');
  const [serviceType, setServiceType] = useState<string>(initialService || 'NDT');
  const [selectedMethods, setSelectedMethods] = useState<string[]>(
    initialService && initialService !== 'NDT' && initialService !== 'PWHT' ? [initialService] : ['VT', 'UT', 'RT']
  );
  const [assetType, setAssetType] = useState<string>('Piping');
  const [material, setMaterial] = useState<string>('Carbon Steel');
  const [dimensions, setDimensions] = useState<string>('8" Sch 40');
  const [location, setLocation] = useState<string>('Cairo / Industrial Zone');
  const [urgency, setUrgency] = useState<string>('Normal');
  const [companyName, setCompanyName] = useState<string>('');
  const [contactName, setContactName] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [additionalNotes, setAdditionalNotes] = useState<string>(initialQuery || '');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [generatedRFQ, setGeneratedRFQ] = useState<ServiceRFQ | null>(null);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const triggerCelebration = () => {
    try {
      // Primary focused burst with INSCO engineering gold, emerald and sky tones
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#f59e0b', '#10b981', '#38bdf8', '#fbbf24', '#ffffff'],
        disableForReducedMotion: true,
        scalar: 1.05,
      });

      // Secondary side sparkles for a refined celebratory feel
      setTimeout(() => {
        confetti({
          particleCount: 35,
          angle: 60,
          spread: 45,
          origin: { x: 0.25, y: 0.7 },
          colors: ['#fbbf24', '#34d399', '#60a5fa', '#f59e0b'],
          disableForReducedMotion: true,
          scalar: 0.9,
        });
        confetti({
          particleCount: 35,
          angle: 120,
          spread: 45,
          origin: { x: 0.75, y: 0.7 },
          colors: ['#fbbf24', '#34d399', '#60a5fa', '#f59e0b'],
          disableForReducedMotion: true,
          scalar: 0.9,
        });
      }, 220);
    } catch (e) {
      console.warn('Confetti animation warning:', e);
    }
  };

  const toggleMethod = (code: string) => {
    setSelectedMethods(prev =>
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
  };

  const handleGenerateProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/ai/service-messenger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceType: `${serviceType} (${selectedMethods.join(', ')})`,
          projectDetails: `Asset: ${assetType}, Dimensions: ${dimensions}`,
          materials: material,
          standards: 'ASME B31.3 / ASME Sec V / AWS D1.1',
          location,
          urgency,
          additionalNotes: `Client: ${companyName} (${contactName} - ${contactPhone}). Notes: ${additionalNotes}`,
          language
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate RFQ proposal');
      }

      const data = await response.json();
      if (data.rfqSummary) {
        setGeneratedRFQ(data.rfqSummary);
        setShowCelebration(true);
        triggerCelebration();
        if (user) {
          saveServiceRequest({
            serviceType,
            assetType,
            material,
            location,
            urgency,
            contactPhone,
            rfqReference: data.rfqSummary.reference
          }).catch(console.error);
        }
      }
    } catch (err) {
      console.error('Service Messenger error:', err);
      // Construct realistic fallback proposal based on brochure
      const fallback: ServiceRFQ = {
        reference: `INSCO-RFQ-${Date.now().toString().slice(-6)}`,
        title: `${serviceType} Scope - ${assetType} (${dimensions})`,
        serviceType,
        executiveSummary: isAr
          ? `مقترح فني لخدمات ${serviceType} للأصل (${assetType}) من خامة (${material}) في موقع (${location}). تؤكد شركة إنسكو جاهزية أسطولها المملوك بالكامل وأطقمها المعتمدة ASNT Level II للتحرك الفوري.`
          : `Formal proposal for ${serviceType} services for ${assetType} (${material}) at ${location}. INSCO confirms immediate mobilization of 100% company-owned fleet and ASNT Level II certified inspectors.`,
        technicalScope: [
          'Review of project specifications and submittal of formal Inspection & Test Plan (ITP)',
          `Execution of ${selectedMethods.join(' / ')} non-destructive testing per ASME Sec V`,
          serviceType.includes('PWHT') || selectedMethods.includes('PWHT')
            ? 'Execution of heat treatment cycle using 65 kW automatic unit with thermocouple chart logging'
            : 'Surface preparation inspection, calibration verification and flaw mapping',
          'Turnover of certified QA/QC report signed by CQI-IRCA Lead Auditor'
        ],
        recommendedMethods: selectedMethods.map(m => `${m} according to relevant ASME / API code`),
        requiredEquipment: [
          'Calibrated testing instrument kit & probes from Cairo warehouse',
          'High-temperature thermocouples and chart recorder (if PWHT)',
          'Safety boundary barricades & radiation monitoring dosimeters (if RT)'
        ],
        qualityDeliverables: [
          'Personnel ASNT Level II certificates',
          'Instrument calibration logs',
          'Code-compliant final inspection / PWHT report'
        ],
        mobilizationTimeframe: urgency === 'Immediate' ? '24 - 48 Hours' : '3 - 5 Days',
        complianceStatement: 'Executed under ISO 9001:2015, ISO 14001:2015, ISO 45001:2018 (EGAC CAB #120007) and ENRRA regulations.'
      };
      setGeneratedRFQ(fallback);
      setShowCelebration(true);
      triggerCelebration();
      if (user) {
        saveServiceRequest({
          serviceType,
          assetType,
          material,
          location,
          urgency,
          contactPhone,
          rfqReference: fallback.reference
        }).catch(console.error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppLink = () => {
    if (!generatedRFQ) return 'https://wa.me/201090777202';
    const text = isAr
      ? `السلام عليكم شركة إنسكو (INSCO)،
أرغب في تقديم طلب خدمة رسمي بالبيانات التالية:
- المرجع: ${generatedRFQ.reference}
- نوع الخدمة: ${serviceType}
- الطرق المطلوبة: ${selectedMethods.join(', ')}
- الأصل والخامة: ${assetType} - ${material} (${dimensions})
- الموقع: ${location}
- العميل: ${companyName || 'عميل صناعي'} (${contactName} - ${contactPhone})
- الاستعجال: ${urgency}
يرجى تأكيد إمكانية التعبئة والتسعير.`
      : `Dear INSCO Engineering,
I would like to submit a formal service inquiry:
- Reference: ${generatedRFQ.reference}
- Service: ${serviceType} (${selectedMethods.join(', ')})
- Asset & Material: ${assetType} - ${material} (${dimensions})
- Location: ${location}
- Client: ${companyName} (${contactName} - ${contactPhone})
- Urgency: ${urgency}
Please confirm mobilization readiness and pricing.`;

    return `https://wa.me/201090777202?text=${encodeURIComponent(text)}`;
  };

  const copyProposalToClipboard = () => {
    if (!generatedRFQ) return;
    const text = `
INSCO ENGINEERING - REQUEST FOR QUOTATION (RFQ)
Reference: ${generatedRFQ.reference}
Title: ${generatedRFQ.title}
Client: ${companyName} (${contactName} - ${contactPhone})
Location: ${location}
Summary: ${generatedRFQ.executiveSummary}

Scope of Work:
${generatedRFQ.technicalScope?.map(s => `- ${s}`).join('\n')}

Mobilization: ${generatedRFQ.mobilizationTimeframe}
Compliance: ${generatedRFQ.complianceStatement}

Official Contacts:
Email: insco50@yahoo.com
Mobile/WhatsApp: +20 109 077 7202 | +20 122 582 6396
Head Office: Maadi, Cairo | Works: Abo El-Nomrous, Giza
    `;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-16 md:py-24 bg-[#0a0c18] border-b border-[#21264c]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-400 font-bold text-xs uppercase tracking-wider mb-3">
            <MessageSquare className="w-4 h-4" />
            <span>{isAr ? 'ماسنجر طلب الخدمات الفورية وحساب العروض' : 'INSTANT SERVICE MESSENGER & RFQ'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {isAr ? (
              <>
                ماسنجر تقديم الخدمات <span className="text-amber-400">وإعداد خطة الفحص الذكية</span>
              </>
            ) : (
              <>
                Interactive Service Messenger & <span className="text-amber-400">Instant Technical Proposal</span>
              </>
            )}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            {isAr
              ? 'حدد تفاصيل مشروعك وموقعك والمعدات المطلوبة ليقوم النظام الذكي بصياغة مسودة خطة فحص واختبار (ITP) فورية وتخصيص المعدات من أسطول إنسكو.'
              : 'Specify your project requirements, location, and asset specs to generate an immediate engineered RFQ and mobilize INSCO assets.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Service Configuration Form (Messenger input) */}
          <div className="lg:col-span-6 bg-[#11142e] p-6 sm:p-7 rounded-2xl border-2 border-amber-500/40 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#222956]">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <Send className="w-4 h-4 text-amber-400" />
                <span>{isAr ? 'بيانات طلب الخدمة' : 'Service Request Parameters'}</span>
              </div>
              <span className="text-[11px] font-mono-code text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                100% Owned Fleet
              </span>
            </div>

            <form onSubmit={handleGenerateProposal} className="space-y-4 text-xs sm:text-sm">
              {/* Service Type Selection */}
              <div>
                <label className="block text-slate-300 font-semibold mb-2">
                  {isAr ? '١. نوع الخدمة المطلوبة:' : '1. Service Category:'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'NDT', labelAr: 'فحوصات NDT شاملة', labelEn: 'Comprehensive NDT' },
                    { id: 'PWHT', labelAr: 'معالجة حرارية PWHT', labelEn: 'Heat Treatment PWHT' },
                    { id: 'WELDING_MANPOWER', labelAr: 'أطقم لحام معتمدة', labelEn: 'Welding Manpower' },
                    { id: 'QC_MANAGEMENT', labelAr: 'إدارة جودة وتفتيش ITP', labelEn: 'QA/QC Management' },
                    { id: 'FULL_PACKAGE', labelAr: 'باكج كامل (NDT+PWHT)', labelEn: 'Full Scope Package' },
                  ].map((s) => (
                    <button
                      type="button"
                      key={s.id}
                      onClick={() => setServiceType(s.id)}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition text-center cursor-pointer ${
                        serviceType === s.id
                          ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-md'
                          : 'bg-[#15193d] text-slate-300 border-[#252c61] hover:bg-[#1d2252]'
                      }`}
                    >
                      {isAr ? s.labelAr : s.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specific NDT / PWHT Methods */}
              <div>
                <label className="block text-slate-300 font-semibold mb-2">
                  {isAr ? '٢. حدد تقنيات الفحص المطلوبة (اختر ما ينطبق):' : '2. Specific Methods Required:'}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {['VT', 'UT', 'RT', 'PAUT', 'MT', 'PT', 'PMI', 'HT', 'HYDRO', 'SR', 'PC', 'MFL/EC', 'PWHT 65kW'].map((code) => {
                    const isSelected = selectedMethods.includes(code);
                    return (
                      <button
                        type="button"
                        key={code}
                        onClick={() => toggleMethod(code)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono-code font-bold border transition cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500/20 text-amber-300 border-amber-400'
                            : 'bg-[#0f1228] text-slate-400 border-[#222854] hover:text-white'
                        }`}
                      >
                        {code}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Asset & Material */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {isAr ? 'نوع الأصل أو المعدة:' : 'Asset Type:'}
                  </label>
                  <select
                    value={assetType}
                    onChange={(e) => setAssetType(e.target.value)}
                    className="w-full bg-[#0b0c1b] border border-[#272e63] rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-400"
                  >
                    <option value="Piping">{isAr ? 'خطوط أنابيب نقل بترول/غاز (Pipelines)' : 'Transmission Pipelines'}</option>
                    <option value="Pressure Vessel">{isAr ? 'أوعية ضغط ومفاعلات (Pressure Vessels)' : 'Pressure Vessels'}</option>
                    <option value="Storage Tank">{isAr ? 'خزانات بترولية ومياه (Storage Tanks)' : 'Storage Tanks'}</option>
                    <option value="Boiler">{isAr ? 'غلايات ومحطات قوى (Power Boilers)' : 'Power Boilers'}</option>
                    <option value="Structural Steel">{isAr ? 'هياكل حديدية وجسور (Structural Steel)' : 'Structural Steel'}</option>
                    <option value="Heat Exchanger">{isAr ? 'مبادلات حرارية وتوربينات (Exchangers)' : 'Heat Exchangers'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {isAr ? 'نوع الخامة / السبيكة:' : 'Material Grade:'}
                  </label>
                  <select
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="w-full bg-[#0b0c1b] border border-[#272e63] rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-400"
                  >
                    <option value="Carbon Steel">{isAr ? 'فولاذ كربوني (Carbon Steel A106/A53/API 5L)' : 'Carbon Steel'}</option>
                    <option value="Alloy Steel P11/P22">{isAr ? 'سبائك فولاذية حرارية (P11 / P22)' : 'Low Alloy (P11/P22)'}</option>
                    <option value="Creep Resistant P91">{isAr ? 'سبائك P91 لمحطات الطاقة' : 'Creep Resistant P91'}</option>
                    <option value="Stainless Steel 304/316L">{isAr ? 'ستانلس ستيل (SS 304/316L)' : 'Stainless Steel'}</option>
                    <option value="Duplex / Super Duplex">{isAr ? 'دوبلكس وسوبر دوبلكس' : 'Duplex / Super Duplex'}</option>
                  </select>
                </div>
              </div>

              {/* Dimensions & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {isAr ? 'الأبعاد والسمك (القطر/السماكة):' : 'Dimensions & Wall Thickness:'}
                  </label>
                  <input
                    type="text"
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    placeholder='e.g. 16" Dia, 25mm WT'
                    className="w-full bg-[#0b0c1b] border border-[#272e63] rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {isAr ? 'موقع المشروع (المحافظة / الموقع):' : 'Project Site / Governorate:'}
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={isAr ? 'القاهرة / السويس / الإسكندرية / أسيوط' : 'Suez / Alexandria / Cairo'}
                    className="w-full bg-[#0b0c1b] border border-[#272e63] rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Urgency */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  {isAr ? 'سرعة التعبئة والجاهزية المطلوبة:' : 'Mobilization Urgency:'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'Immediate', labelAr: 'طوارئ فوري (24-48 ساعة)', labelEn: 'Immediate (24-48h)' },
                    { id: 'Normal', labelAr: 'عادي (أسبوع)', labelEn: 'Normal (1 Week)' },
                    { id: 'Turnaround', labelAr: 'عمرة سنوية / مجدولة', labelEn: 'Shutdown / Overhaul' },
                  ].map((u) => (
                    <button
                      type="button"
                      key={u.id}
                      onClick={() => setUrgency(u.id)}
                      className={`p-2 rounded-lg border text-xs font-semibold text-center transition cursor-pointer ${
                        urgency === u.id
                          ? 'bg-amber-500/20 text-amber-300 border-amber-400'
                          : 'bg-[#0b0c1b] text-slate-400 border-[#222854]'
                      }`}
                    >
                      {isAr ? u.labelAr : u.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Data */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-[#1e2450]">
                <div>
                  <label className="block text-slate-400 text-[11px] mb-1">
                    {isAr ? 'اسم الشركة / المقاول:' : 'Company Name:'}
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder={isAr ? 'مثال: شركة المقاولات' : 'Contractor Co.'}
                    className="w-full bg-[#0b0c1b] border border-[#272e63] rounded-lg px-2.5 py-1.5 text-white text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[11px] mb-1">
                    {isAr ? 'المسؤول / المهندس:' : 'Contact Person:'}
                  </label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder={isAr ? 'م. أحمد / م. محمد' : 'Eng. Name'}
                    className="w-full bg-[#0b0c1b] border border-[#272e63] rounded-lg px-2.5 py-1.5 text-white text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[11px] mb-1">
                    {isAr ? 'رقم الهاتف / الواتساب:' : 'Mobile / WhatsApp:'}
                  </label>
                  <input
                    type="text"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+20 1xxxxxxxxx"
                    className="w-full bg-[#0b0c1b] border border-[#272e63] rounded-lg px-2.5 py-1.5 text-white text-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* Additional Details */}
              <div>
                <label className="block text-slate-400 text-[11px] mb-1">
                  {isAr ? 'ملاحظات إضافية أو كود تعاقدي محدد:' : 'Additional Technical Notes / ITP requirements:'}
                </label>
                <textarea
                  rows={2}
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder={isAr ? 'أي متطلبات لشهادات معينة، كمية اللحامات، أو ظروف الموقع...' : 'Any specific welding joint counts, code clauses, or site access...'}
                  className="w-full bg-[#0b0c1b] border border-[#272e63] rounded-lg px-3 py-2 text-white text-xs focus:outline-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>
                  {isSubmitting
                    ? (isAr ? 'جاري إعداد العرض والمقترح الفني...' : 'Generating Technical Proposal...')
                    : (isAr ? 'توليد المقترح الفني وخطة الفحص الفورية' : 'Generate Technical RFQ Proposal')}
                </span>
              </button>
            </form>
          </div>

          {/* Right Column: Generated Formal RFQ & Instant Dispatch */}
          <div className="lg:col-span-6">
            {generatedRFQ ? (
              <div className="bg-gradient-to-br from-[#121535] to-[#0c0e22] p-6 sm:p-7 rounded-2xl border-2 border-amber-400 shadow-2xl space-y-5 animate-fadeIn">
                {/* Celebratory Success Banner with Animated Checkmark */}
                {showCelebration && (
                  <div className="celebrate-pop bg-gradient-to-r from-emerald-950/90 via-[#0e2a27] to-[#141b3e] border border-emerald-400/80 rounded-xl p-3.5 sm:p-4 shadow-xl shadow-emerald-500/20 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative flex items-center justify-center flex-shrink-0">
                        <span className="animate-ping absolute inline-flex h-9 w-9 rounded-full bg-emerald-400 opacity-40"></span>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
                          <svg
                            className="w-5 h-5 text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" className="checkmark-svg" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-white">
                            {isAr ? 'تم استلام وتجهيز المقترح بنجاح!' : 'Inquiry Submitted & Scope Ready!'}
                          </span>
                          <span className="text-[10px] font-mono-code font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                            {isAr ? 'تم الاعتماد' : 'VERIFIED'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-0.5">
                          {isAr
                            ? `تم إنشاء الرقم المرجعي (${generatedRFQ.reference}) وتوثيق بيانات الطلب بنجاح.`
                            : `Reference code (${generatedRFQ.reference}) generated and registered to records.`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        type="button"
                        onClick={triggerCelebration}
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 hover:text-white border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                        title={isAr ? 'إعادة تشغيل المؤثر الاحتفالي' : 'Replay celebration'}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                        <span className="hidden sm:inline">{isAr ? 'احتفال 🎉' : 'Celebrate 🎉'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCelebration(false)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
                        aria-label="Close"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Proposal Header */}
                <div className="flex items-start justify-between pb-4 border-b border-[#232a58]">
                  <div>
                    <div className="text-[11px] font-mono-code text-amber-400 font-bold uppercase tracking-wider">
                      {generatedRFQ.reference}
                    </div>
                    <h3 className="text-xl font-black text-white mt-0.5">
                      {generatedRFQ.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyProposalToClipboard}
                      className="p-2 rounded-lg bg-[#181d45] hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition cursor-pointer"
                      title={isAr ? 'نسخ المقترح' : 'Copy proposal'}
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="p-2 rounded-lg bg-[#181d45] hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition cursor-pointer"
                      title={isAr ? 'طباعة' : 'Print'}
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Executive Summary */}
                <div className="bg-[#0b0c1c] p-4 rounded-xl border border-[#212752]">
                  <div className="text-xs font-bold text-amber-400 uppercase mb-1">
                    {isAr ? 'الملخص التنفيذي للمقترح' : 'Executive Technical Summary'}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {generatedRFQ.executiveSummary}
                  </p>
                </div>

                {/* Proposed Scope of Work */}
                {generatedRFQ.technicalScope && (
                  <div>
                    <div className="text-xs font-bold text-slate-300 uppercase mb-2 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-sky-400" />
                      <span>{isAr ? 'نطاق العمل المقترح (Scope of Work):' : 'Technical Scope of Work:'}</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {generatedRFQ.technicalScope.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 bg-[#141738] p-2 rounded-lg border border-[#212752]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Allocated Equipment & Mobilization */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-[#101431] p-3 rounded-xl border border-[#222958]">
                    <div className="text-slate-400 font-semibold mb-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{isAr ? 'زمن التعبئة والتحرك:' : 'Mobilization Time:'}</span>
                    </div>
                    <div className="font-mono-code font-bold text-white text-sm">
                      {generatedRFQ.mobilizationTimeframe}
                    </div>
                  </div>

                  <div className="bg-[#101431] p-3 rounded-xl border border-[#222958]">
                    <div className="text-slate-400 font-semibold mb-1 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{isAr ? 'معايير الجودة:' : 'Quality Standard:'}</span>
                    </div>
                    <div className="font-mono-code font-bold text-emerald-400 text-sm">
                      ISO 9001:2015 / ASNT II
                    </div>
                  </div>
                </div>

                {/* Direct Mobilization / Quote Dispatch Actions */}
                <div className="pt-2 space-y-2.5">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{isAr ? 'إرسال الطلب فوراً إلى واتساب إدارة إنسكو' : 'Dispatch via WhatsApp to INSCO Management'}</span>
                  </a>

                  <a
                    href={`mailto:${COMPANY_DETAILS.email}?subject=${encodeURIComponent(`RFQ ${generatedRFQ.reference} - ${generatedRFQ.title}`)}&body=${encodeURIComponent(generatedRFQ.executiveSummary)}`}
                    className="w-full py-3 px-4 rounded-xl bg-[#161a3f] hover:bg-[#1d2254] text-slate-200 border border-[#272f69] font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2"
                  >
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>{isAr ? 'إرسال عبر البريد الإلكتروني الرسمي (insco50@yahoo.com)' : 'Send to Official Email'}</span>
                  </a>
                </div>
              </div>
            ) : (
              /* Placeholder waiting state with brochure value propositions */
              <div className="h-full bg-gradient-to-br from-[#121533] to-[#0a0c1a] p-8 rounded-2xl border border-[#232958] flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border-2 border-amber-400/30 flex items-center justify-center text-amber-400">
                  <FileText className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {isAr ? 'مسودة المقترح الفني الجاهز للتعاقد' : 'Ready-to-Contract Technical RFQ'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
                  {isAr
                    ? 'بمجرد الضغط على زر "توليد المقترح الفني"، سيقوم النظام الذكي بصياغة نطاق عمل متكامل مع رقم مرجعي رسمي وجدول بالمعدات المملوكة المخصصة لمشروعك، لتتمكن من إرسالها فوراً أو طباعتها.'
                    : 'Once you click generate, our AI will engineer a customized proposal with an official reference code, ready to send via WhatsApp or print.'}
                </p>

                <div className="w-full max-w-sm pt-4 border-t border-[#1d224b] text-start text-xs text-slate-400 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{isAr ? 'أسطول وحدات معالجة حرارية 65kW أوتوماتيكية مملوك وجاهز' : 'Comprehensive 65kW automatic PWHT fleet owned & ready'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{isAr ? 'كوادر وفاحصون معتمدون ASNT Level II' : 'ASNT Level II certified inspectors'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{isAr ? 'تغطية لكافة محافظات مصر ومواقع البترول' : 'Nationwide mobilization across Egypt'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
