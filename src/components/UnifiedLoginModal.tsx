import React, { useState } from 'react';
import {
  Shield,
  Briefcase,
  Users,
  HardHat,
  LogIn,
  LogOut,
  CheckCircle2,
  X,
  Building2,
  Phone,
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { Language, UserRole } from '../types';
import { useAuth } from '../context/AuthContext';

interface UnifiedLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onSuccessOpenPortal?: () => void;
}

export const UnifiedLoginModal: React.FC<UnifiedLoginModalProps> = ({
  isOpen,
  onClose,
  language,
  onSuccessOpenPortal
}) => {
  const isAr = language === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const {
    user,
    userProfile,
    currentRole,
    signInWithGoogle,
    loginAsDemo,
    switchRole,
    signOut
  } = useAuth();

  const [selectedRole, setSelectedRole] = useState<UserRole>(currentRole || 'manager');
  const [customName, setCustomName] = useState('');
  const [customCompany, setCustomCompany] = useState('');
  const [activeTab, setActiveTab] = useState<'demo_roles' | 'google_auth'>('demo_roles');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authMessage, setAuthMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const roleDefinitions: {
    role: UserRole;
    titleAr: string;
    titleEn: string;
    badgeAr: string;
    badgeEn: string;
    icon: any;
    color: string;
    borderColor: string;
    bgGradient: string;
    descriptionAr: string;
    descriptionEn: string;
    capabilitiesAr: string[];
    capabilitiesEn: string[];
  }[] = [
    {
      role: 'manager',
      titleAr: 'المدير العام والتنفيذي (General Manager)',
      titleEn: 'General Manager & Executive',
      badgeAr: 'صلاحيات عليا شاملة',
      badgeEn: 'Full System Access',
      icon: Shield,
      color: 'text-amber-400',
      borderColor: 'border-amber-400',
      bgGradient: 'from-amber-500/20 via-[#191e45] to-[#0f122e]',
      descriptionAr: 'رؤية كاملة لجميع ملفات النظام، السجلات المالية والتقارير، عقود العملاء، ورادار تتبع العاملين الميداني.',
      descriptionEn: 'Full visibility across all system files, project registers, financial summaries, client contracts, and live worker tracking radar.',
      capabilitiesAr: [
        'الاطلاع على كافة ملفات التفتيش وعقود المشاريع',
        'مراقبة رادار مواقع العاملين والمعدات الحية في كل المحافظات',
        'مراجعة الإحصائيات الشاملة وتقارير التدقيق'
      ],
      capabilitiesEn: [
        'Access all inspection files and project registers',
        'Monitor live worker tracking radar across all Egypt sites',
        'Executive oversight of all company operations'
      ]
    },
    {
      role: 'supervisor',
      titleAr: 'مشرف العمليات والتجهيز (Operations Supervisor)',
      titleEn: 'Operations & Field Supervisor',
      badgeAr: 'إدارة العمليات والتكليف',
      badgeEn: 'Operations & Dispatch',
      icon: Briefcase,
      color: 'text-blue-400',
      borderColor: 'border-blue-400',
      bgGradient: 'from-blue-500/20 via-[#141b44] to-[#0d122c]',
      descriptionAr: 'القائم على الأعمال الإدارية: إصدار طلبات العمل، إسناد المهام والمعدات للفنيين، ومراجعة وتدقيق بيانات العملاء.',
      descriptionEn: 'Administrative focal point: dispatching work orders, assigning crews & 65 kW units, and verifying client records.',
      capabilitiesAr: [
        'إنشاء وإسناد أوامر العمل (Work Orders) للفرق الميدانية',
        'مراجعة وتوثيق تسجيل بيانات العملاء الجدد',
        'متابعة الحضور الميداني واعتماد تقارير الإنجاز اليومية'
      ],
      capabilitiesEn: [
        'Create & dispatch work orders to field inspectors',
        'Verify & approve enterprise client registrations',
        'Track daily field logs and sign off completed tasks'
      ]
    },
    {
      role: 'client',
      titleAr: 'العميل / المقاول المتعاقد (Enterprise Client)',
      titleEn: 'Enterprise Client / Contractor',
      badgeAr: 'بوابة العميل وطلبات العمل',
      badgeEn: 'Client Self-Service',
      icon: Building2,
      color: 'text-emerald-400',
      borderColor: 'border-emerald-400',
      bgGradient: 'from-emerald-500/20 via-[#102334] to-[#0a1524]',
      descriptionAr: 'تسجيل بيانات الشركة، تقديم طلبات العمل ومتابعة خط زمني دقيق لسير الفحص والمعالجة وتحميل التقارير المعتمدة.',
      descriptionEn: 'Company profile registration, instant work order submission, real-time progress tracking, and certificate downloads.',
      capabilitiesAr: [
        'أبلكيشن تسجيل بيانات الشركة والسجل التجاري',
        'تقديم ومتابعة طلبات العمل (Work Requests) خطوة بخطوة',
        'تحميل شهادات الفحص وتقارير المعالجة الحرارية المختومة'
      ],
      capabilitiesEn: [
        'Register enterprise company profile & tax records',
        'Submit & track work requests with live milestone pipeline',
        'Download verified test reports & certified PWHT charts'
      ]
    },
    {
      role: 'worker',
      titleAr: 'الفني / العامل الميداني (Field Technician)',
      titleEn: 'Field Technician & Inspector',
      badgeAr: 'منفذ الحضور وتتبع الأعمال',
      badgeEn: 'Field Tracking & Tasks',
      icon: HardHat,
      color: 'text-orange-400',
      borderColor: 'border-orange-400',
      bgGradient: 'from-orange-500/20 via-[#261b17] to-[#120e17]',
      descriptionAr: 'تسجيل الحضور والموقع الميداني (Check-in/GPS)، استعراض المهام المسندة، وتسجيل الإنجاز اليومي والوصلات المكتملة.',
      descriptionEn: 'Site check-in & GPS location presence, view assigned work orders, and submit daily completed joints & heat soaking logs.',
      capabilitiesAr: [
        'تسجيل الحضور وتحديث الموقع الميداني أثناء ورديات العمل',
        'عرض أوامر العمل والمواصفات الفنية المسندة للموقع',
        'تسجيل تقرير الإنجاز اليومي (الوصلات المفحوصة / درجات الحرارة)'
      ],
      capabilitiesEn: [
        'Shift check-in and GPS site location broadcasting',
        'Inspect assigned work order specifications and drawings',
        'Submit daily joint counts and thermal soaking logs'
      ]
    }
  ];

  const handleSelectRoleLogin = (role: UserRole) => {
    setIsSubmitting(true);
    loginAsDemo(
      role,
      customName.trim() || undefined,
      customCompany.trim() || undefined
    );

    setTimeout(() => {
      setIsSubmitting(false);
      setAuthMessage(
        isAr
          ? `تم تسجيل الدخول بنجاح بصلاحية: ${
              roleDefinitions.find((r) => r.role === role)?.titleAr
            }`
          : `Signed in successfully with role: ${
              roleDefinitions.find((r) => r.role === role)?.titleEn
            }`
      );
      setTimeout(() => {
        onClose();
        if (onSuccessOpenPortal) {
          onSuccessOpenPortal();
        }
      }, 600);
    }, 400);
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    setAuthMessage(null);
    try {
      await signInWithGoogle(selectedRole);
      setAuthMessage(
        isAr
          ? 'تم ربط وتسجيل الدخول عبر حساب Google بنجاح!'
          : 'Google authentication successful!'
      );
      setTimeout(() => {
        onClose();
        if (onSuccessOpenPortal) {
          onSuccessOpenPortal();
        }
      }, 700);
    } catch (err: any) {
      setAuthMessage(
        isAr
          ? 'تعذر تسجيل الدخول بـ Google. يمكنك تجربة الدخول المباشر بالصلاحية.'
          : 'Google sign-in error. You may use direct role login.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-[#131738] via-[#0d1028] to-[#090b1c] rounded-3xl border-2 border-[#2b356f] shadow-2xl overflow-hidden my-auto">
        {/* Header bar */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#171d49] via-[#101435] to-[#171d49] border-b border-[#242c62] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <span>{isAr ? 'منظومة الدخول الموحدة وتوزيع الصلاحيات' : 'Unified Industrial RBAC Login'}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 font-mono">
                  INSCO Portal
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {isAr
                  ? 'بوابة مخصصة ذات دوائر رؤية تراتبية: المدير العام • المشرفون • العملاء • الفنيون'
                  : 'Hierarchical Circles of View: General Manager • Supervisors • Clients • Field Workers'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#1b2252] hover:bg-[#252f70] text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
            title={isAr ? 'إغلاق' : 'Close'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Session Callout if logged in */}
        {userProfile && (
          <div className="mx-5 sm:mx-6 mt-4 p-3 rounded-xl bg-[#161d48] border border-amber-400/30 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300">{isAr ? 'أنت مسجل حالياً باسم:' : 'Logged in as:'}</span>
              <strong className="text-white font-bold">{userProfile.displayName}</strong>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                {isAr
                  ? roleDefinitions.find((r) => r.role === currentRole)?.titleAr
                  : roleDefinitions.find((r) => r.role === currentRole)?.titleEn}
              </span>
            </div>

            <div className="flex items-center gap-2 ms-auto">
              {onSuccessOpenPortal && (
                <button
                  onClick={() => {
                    onClose();
                    onSuccessOpenPortal();
                  }}
                  className="px-3 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  <span>{isAr ? 'فتح لوحة التحكم الخاصة بي' : 'Open My Portal'}</span>
                  <Arrow className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={() => signOut()}
                className="px-2.5 py-1 rounded bg-[#202758] hover:bg-rose-900/60 text-slate-300 hover:text-rose-200 transition flex items-center gap-1 cursor-pointer"
                title={isAr ? 'تسجيل الخروج' : 'Sign out'}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{isAr ? 'خروج' : 'Logout'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab selection for login method */}
        <div className="px-5 sm:px-6 pt-4 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('demo_roles')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'demo_roles'
                ? 'bg-amber-500 text-slate-950 shadow-lg'
                : 'bg-[#151a3e] text-slate-400 hover:text-white border border-[#232c63]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isAr ? 'الدخول السريع بحسب الصلاحيات (موصى به للاختبار)' : 'Instant Role Switch (Fast Test)'}</span>
          </button>

          <button
            onClick={() => setActiveTab('google_auth')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'google_auth'
                ? 'bg-amber-500 text-slate-950 shadow-lg'
                : 'bg-[#151a3e] text-slate-400 hover:text-white border border-[#232c63]'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>{isAr ? 'تسجيل حساب Google / بريد رسمي' : 'Google / Official Account'}</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 space-y-6">
          {authMessage && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-400/40 text-amber-300 text-xs sm:text-sm flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{authMessage}</span>
            </div>
          )}

          {activeTab === 'demo_roles' ? (
            <div>
              <div className="mb-4">
                <p className="text-xs text-slate-400">
                  {isAr
                    ? 'اختر الرتبة التي ترغب في تجربة دائرة رؤيتها وصلاحياتها في النظام:'
                    : 'Select the operational hierarchy role you wish to inspect and test:'}
                </p>
              </div>

              {/* 4 Role Selection Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {roleDefinitions.map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedRole === item.role;

                  return (
                    <div
                      key={item.role}
                      onClick={() => setSelectedRole(item.role)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative bg-gradient-to-br ${
                        item.bgGradient
                      } ${
                        isSelected
                          ? `${item.borderColor} shadow-xl scale-[1.01]`
                          : 'border-[#222955] hover:border-slate-500/60 opacity-90 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-9 h-9 rounded-xl bg-[#0a0d24] border border-white/10 flex items-center justify-center ${item.color}`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-white">
                              {isAr ? item.titleAr : item.titleEn}
                            </h3>
                            <span className="text-[11px] font-semibold text-slate-300">
                              {isAr ? item.badgeAr : item.badgeEn}
                            </span>
                          </div>
                        </div>

                        <span
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isSelected
                              ? 'border-amber-400 bg-amber-400 text-slate-950 font-bold'
                              : 'border-slate-600'
                          }`}
                        >
                          {isSelected && <span className="w-2 h-2 rounded-full bg-slate-950" />}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed mb-3">
                        {isAr ? item.descriptionAr : item.descriptionEn}
                      </p>

                      {/* Capabilities pill list */}
                      <ul className="space-y-1 text-[11px] text-slate-400 border-t border-white/5 pt-2 mb-3">
                        {(isAr ? item.capabilitiesAr : item.capabilitiesEn).map((cap, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-amber-400" />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRole(item.role);
                          handleSelectRoleLogin(item.role);
                        }}
                        disabled={isSubmitting}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md ${
                          isSelected
                            ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black'
                            : 'bg-[#181f4a] hover:bg-[#202960] text-slate-200'
                        }`}
                      >
                        <LogIn className="w-3.5 h-3.5" />
                        <span>
                          {isAr
                            ? `دخول فوري بصلاحية: ${item.badgeAr}`
                            : `Enter as ${item.badgeEn}`}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Optional custom identity name */}
              <div className="mt-4 pt-4 border-t border-[#1d2454] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">
                    {isAr ? 'الاسم الظاهر (اختياري للتدقيق):' : 'Display Name (Optional):'}
                  </label>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder={isAr ? 'مثال: م. أحمد الشناوي' : 'e.g. Eng. Ahmed'}
                    className="w-full bg-[#0a0d24] border border-[#232b5e] rounded-xl px-3 py-2 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">
                    {isAr ? 'الجهة أو الشركة (اختياري):' : 'Company / Entity (Optional):'}
                  </label>
                  <input
                    type="text"
                    value={customCompany}
                    onChange={(e) => setCustomCompany(e.target.value)}
                    placeholder={isAr ? 'مثال: شركة بتروبل / أوراسكوم' : 'e.g. Petrobel / Orascom'}
                    className="w-full bg-[#0a0d24] border border-[#232b5e] rounded-xl px-3 py-2 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>
          ) : (
            /* Google Sign-in & Formal Auth Tab */
            <div className="max-w-md mx-auto py-4 space-y-5 text-center">
              <div className="p-4 rounded-2xl bg-[#141a42] border border-[#26316f] space-y-3">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                  <LogIn className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">
                  {isAr ? 'تسجيل الدخول الرسمي السحابي (Firebase Auth)' : 'Official Cloud Authentication'}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isAr
                    ? 'قم بتسجيل الدخول باستخدام بريدك المعتمد. سيتم ربط حسابك بقاعدة بيانات Firestore وحفظ بياناتك وطلباتك بشكل دائم.'
                    : 'Sign in with your verified email via Google Auth. Your profile and work orders will sync securely with Firestore.'}
                </p>

                <div className="text-start space-y-1.5 pt-2">
                  <label className="text-xs text-slate-400">
                    {isAr ? 'اختر الرتبة الافتراضية لحسابك:' : 'Assign Initial Account Role:'}
                  </label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                    className="w-full bg-[#0a0d24] border border-[#252e64] rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                  >
                    <option value="manager">{isAr ? 'مدير عام (Manager - رؤية كل الملفات والعمليات)' : 'General Manager'}</option>
                    <option value="supervisor">{isAr ? 'مشرف تشغيل (Supervisor - إدارة طلبات العمل)' : 'Operations Supervisor'}</option>
                    <option value="client">{isAr ? 'عميل / مقاول (Client - تسجيل بيانات وطلبات عمل)' : 'Enterprise Client'}</option>
                    <option value="worker">{isAr ? 'فني / عامل (Worker - حضور وتتبع ميداني)' : 'Field Worker'}</option>
                  </select>
                </div>

                <button
                  onClick={handleGoogleSignIn}
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-xl disabled:opacity-50"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{isSubmitting ? (isAr ? 'جاري الاتصال السحابي...' : 'Connecting...') : (isAr ? 'المتابعة عبر حساب Google' : 'Continue with Google')}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
