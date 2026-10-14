import React, { useState } from 'react';
import {
  Shield,
  Briefcase,
  Users,
  HardHat,
  Building2,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Plus,
  Send,
  Eye,
  Search,
  Filter,
  Flame,
  Activity,
  Layers,
  Award,
  Download,
  Calendar,
  Radio,
  Navigation,
  Check,
  ChevronRight,
  ChevronDown,
  RefreshCw,
  Phone,
  Mail,
  UserCheck,
  Home
} from 'lucide-react';
import {
  Language,
  UserRole,
  ClientProfile,
  WorkOrder,
  WorkOrderStatus,
  WorkerCheckIn,
  DailyFieldReport,
  WorkerPresenceStatus
} from '../types';
import { useAuth } from '../context/AuthContext';

interface OperationsPortalProps {
  language: Language;
  onOpenMessenger?: (method?: string, query?: string) => void;
  onOpenLoginModal?: () => void;
  onBackToHome?: () => void;
}

export const OperationsPortal: React.FC<OperationsPortalProps> = ({
  language,
  onOpenMessenger,
  onOpenLoginModal,
  onBackToHome
}) => {
  const isAr = language === 'ar';
  const {
    userProfile,
    currentRole,
    switchRole,
    clients,
    addClient,
    workOrders,
    addWorkOrder,
    updateWorkOrderStatus,
    workerCheckIns,
    submitWorkerCheckIn,
    fieldReports,
    submitFieldReport
  } = useAuth();

  // Internal navigation tab inside portal
  const [activeTab, setActiveTab] = useState<string>('default');

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Client Application Modal Form State
  const [showClientForm, setShowClientForm] = useState(false);
  const [newClient, setNewClient] = useState({
    companyName: '',
    commercialRegister: '',
    taxNumber: '',
    industrySector: 'النفط والغاز (Oil & Gas)',
    contactPerson: '',
    phone: '',
    email: '',
    headquarters: 'القاهرة / الإسكندرية / السويس'
  });

  // Work Order Application Form State
  const [showWorkOrderForm, setShowWorkOrderForm] = useState(false);
  const [newOrder, setNewOrder] = useState({
    title: '',
    clientId: clients[0]?.clientId || 'cli-petrobel',
    clientName: clients[0]?.companyName || 'شركة بترول بلاعيم',
    serviceType: 'PWHT',
    siteName: '',
    governorate: 'السويس (Suez)',
    latitude: 29.9668,
    longitude: 32.5498,
    scopeDescription: '',
    jointsCount: 12,
    equipmentAssigned: 'وحدة معالجة حرارية أوتوماتيكية 65 kW (INSCO-HTU-01)',
    assignedSupervisorId: 'sup-samir',
    assignedWorkerIds: ['wrk-hassan'],
    targetCompletionDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
    priority: 'urgent' as 'normal' | 'urgent' | 'emergency'
  });

  // Worker Check-In & Location Form State
  const [showCheckInForm, setShowCheckInForm] = useState(false);
  const [workerSiteName, setWorkerSiteName] = useState('حقل ظهر / مجمع بورسعيد - وحدة التبريد');
  const [workerStatus, setWorkerStatus] = useState<WorkerPresenceStatus>('on_site');
  const [workerNotes, setWorkerNotes] = useState('');

  // Daily Field Report Form State
  const [showReportForm, setShowReportForm] = useState(false);
  const [selectedOrderIdForReport, setSelectedOrderIdForReport] = useState<string>(
    workOrders[0]?.orderId || ''
  );
  const [reportWelds, setReportWelds] = useState(4);
  const [reportHours, setReportHours] = useState(8);
  const [reportTemp, setReportTemp] = useState(620);
  const [reportMethod, setReportMethod] = useState('PWHT 65kW');
  const [reportNotes, setReportNotes] = useState('');

  // Form submission feedback
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(null), 4000);
  };

  // Handle Client Registration Submit
  const handleClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.companyName || !newClient.contactPerson || !newClient.phone) return;

    await addClient({
      companyName: newClient.companyName,
      commercialRegister: newClient.commercialRegister || 'Pending-CR',
      taxNumber: newClient.taxNumber || 'Pending-Tax',
      industrySector: newClient.industrySector,
      contactPerson: newClient.contactPerson,
      phone: newClient.phone,
      email: newClient.email || 'client@company.com',
      headquarters: newClient.headquarters,
      status: 'verified',
      creditLimit: 'EGP 1,000,000'
    });

    setShowClientForm(false);
    showNotification(isAr ? 'تم تسجيل وتوثيق بيانات العميل بنجاح!' : 'Client registered successfully!');
    setNewClient({
      companyName: '',
      commercialRegister: '',
      taxNumber: '',
      industrySector: 'النفط والغاز (Oil & Gas)',
      contactPerson: '',
      phone: '',
      email: '',
      headquarters: ''
    });
  };

  // Handle Work Order Submit
  const handleWorkOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrder.title || !newOrder.siteName) return;

    const matchedClient = clients.find((c) => c.clientId === newOrder.clientId);

    await addWorkOrder({
      title: newOrder.title,
      clientId: newOrder.clientId,
      clientName: matchedClient ? matchedClient.companyName : newOrder.clientName,
      serviceType: newOrder.serviceType,
      siteName: newOrder.siteName,
      governorate: newOrder.governorate,
      latitude: newOrder.latitude,
      longitude: newOrder.longitude,
      scopeDescription: newOrder.scopeDescription || 'مواصفات تفتيش ومعالجة حرارية طبقا للمواصفة القياسية',
      jointsCount: Number(newOrder.jointsCount) || 1,
      equipmentAssigned: newOrder.equipmentAssigned,
      assignedSupervisorId: newOrder.assignedSupervisorId,
      assignedWorkerIds: newOrder.assignedWorkerIds,
      targetCompletionDate: newOrder.targetCompletionDate,
      priority: newOrder.priority,
      status: 'submitted'
    });

    setShowWorkOrderForm(false);
    showNotification(isAr ? 'تم إنشاء وإرسال طلب العمل بنجاح!' : 'Work Order created successfully!');
    setNewOrder({
      title: '',
      clientId: clients[0]?.clientId || 'cli-petrobel',
      clientName: clients[0]?.companyName || '',
      serviceType: 'PWHT',
      siteName: '',
      governorate: 'السويس (Suez)',
      latitude: 29.9668,
      longitude: 32.5498,
      scopeDescription: '',
      jointsCount: 12,
      equipmentAssigned: 'وحدة معالجة حرارية أوتوماتيكية 65 kW (INSCO-HTU-01)',
      assignedSupervisorId: 'sup-samir',
      assignedWorkerIds: ['wrk-hassan'],
      targetCompletionDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      priority: 'urgent'
    });
  };

  // Handle Worker Location Check-In Submit
  const handleCheckInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitWorkerCheckIn({
      workerId: userProfile?.userId || 'wrk-current',
      workerName: userProfile?.displayName || 'الفني الميداني',
      craft: 'PWHT & NDT Field Specialist',
      siteName: workerSiteName,
      latitude: 29.9668 + (Math.random() - 0.5) * 0.05,
      longitude: 32.5498 + (Math.random() - 0.5) * 0.05,
      status: workerStatus,
      checkInTime: new Date().toISOString(),
      notes: workerNotes || (isAr ? 'تسجيل تواجد ومباشرة مهام الوردية في الموقع' : 'On-site shift check-in logged')
    });

    setShowCheckInForm(false);
    showNotification(isAr ? 'تم تسجيل حضورك وإحداثيات موقعك الميداني بنجاح!' : 'Site check-in & location updated!');
  };

  // Handle Field Report Submit
  const handleFieldReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitFieldReport({
      orderId: selectedOrderIdForReport || (workOrders[0]?.orderId ?? 'WO-DEFAULT'),
      workerId: userProfile?.userId || 'wrk-current',
      workerName: userProfile?.displayName || 'حسن عبد الرحمن',
      date: new Date().toISOString().split('T')[0],
      serviceMethod: reportMethod,
      weldsCompleted: Number(reportWelds) || 1,
      hoursWorked: Number(reportHours) || 8,
      temperatureMax: Number(reportTemp) || undefined,
      supervisorSignOff: 'م. سمير رضوان',
      status: 'submitted',
      notes: reportNotes || (isAr ? 'تم إتمام الأعمال وفق جداول الـ ITP' : 'Daily work executed per ITP')
    });

    setShowReportForm(false);
    showNotification(isAr ? 'تم إرسال تقرير العمل اليومي للمشرف بنجاح!' : 'Field report submitted!');
  };

  // Filtered lists
  const filteredWorkOrders = workOrders.filter((wo) => {
    if (statusFilter !== 'all' && wo.status !== statusFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        wo.orderId.toLowerCase().includes(q) ||
        wo.title.toLowerCase().includes(q) ||
        wo.clientName.toLowerCase().includes(q) ||
        wo.siteName.toLowerCase().includes(q) ||
        wo.serviceType.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getStatusBadge = (status: WorkOrderStatus) => {
    switch (status) {
      case 'submitted':
        return { labelAr: 'تم التقديم / قيد المراجعة', labelEn: 'Submitted', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
      case 'approved':
        return { labelAr: 'معتمد وجاهز للتكليف', labelEn: 'Approved', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' };
      case 'technicians_dispatched':
        return { labelAr: 'تم تحريك الأطقم والمعدات', labelEn: 'Mobilized', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' };
      case 'in_progress':
        return { labelAr: 'جاري التنفيذ بالموقع', labelEn: 'In Progress', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 animate-pulse' };
      case 'testing_completed':
        return { labelAr: 'تم اكتمال الفحص والمعالجة', labelEn: 'Completed', color: 'bg-emerald-500/30 text-emerald-200 border-emerald-500/60' };
      case 'closed':
        return { labelAr: 'مغلق ومسلم للعميل', labelEn: 'Closed', color: 'bg-slate-700/50 text-slate-300 border-slate-600' };
      default:
        return { labelAr: status, labelEn: status, color: 'bg-slate-800 text-slate-300 border-slate-700' };
    }
  };

  const getWorkerStatusBadge = (status: WorkerPresenceStatus) => {
    switch (status) {
      case 'on_site':
        return { labelAr: 'متواجد بالموقع', labelEn: 'On Site', dotColor: 'bg-emerald-400' };
      case 'active_testing':
        return { labelAr: 'مباشرة الفحص الآن', labelEn: 'Active Testing', dotColor: 'bg-blue-400 animate-ping' };
      case 'heat_soaking':
        return { labelAr: 'تثبيت حراري (PWHT Soaking)', labelEn: 'Heat Soaking', dotColor: 'bg-amber-400 animate-pulse' };
      case 'traveling':
        return { labelAr: 'في الطريق إلى الموقع', labelEn: 'Traveling', dotColor: 'bg-purple-400' };
      case 'off_duty':
        return { labelAr: 'انتهاء الوردية', labelEn: 'Off Duty', dotColor: 'bg-slate-500' };
    }
  };

  return (
    <div className="min-h-screen bg-[#080918] text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Control Bar: Active Role Identity & Circle of View Switcher */}
        <div className="bg-gradient-to-r from-[#14193d] via-[#101435] to-[#14193d] p-5 sm:p-6 rounded-3xl border-2 border-[#26316f] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4 text-start w-full md:w-auto">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border-2 border-amber-400/50 flex items-center justify-center text-amber-400 shadow-inner flex-shrink-0">
              {currentRole === 'manager' && <Shield className="w-8 h-8" />}
              {currentRole === 'supervisor' && <Briefcase className="w-8 h-8 text-blue-400" />}
              {currentRole === 'client' && <Building2 className="w-8 h-8 text-emerald-400" />}
              {currentRole === 'worker' && <HardHat className="w-8 h-8 text-orange-400" />}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold border border-amber-400/40 uppercase tracking-wider">
                  {currentRole === 'manager' && (isAr ? 'دائرة رؤية: المدير العام' : 'Circle: General Manager')}
                  {currentRole === 'supervisor' && (isAr ? 'دائرة رؤية: المشرف الإداري' : 'Circle: Operations Supervisor')}
                  {currentRole === 'client' && (isAr ? 'دائرة رؤية: بوابة العميل' : 'Circle: Enterprise Client')}
                  {currentRole === 'worker' && (isAr ? 'دائرة رؤية: منفذ العامل الميداني' : 'Circle: Field Technician')}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  ID: {userProfile?.userId}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
                {userProfile?.displayName}
              </h1>
              <p className="text-xs text-slate-300">
                {userProfile?.company} • {userProfile?.department}
              </p>
            </div>
          </div>

          {/* Quick Role Switcher Buttons to test and demonstrate all circles of view */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto bg-[#0b0e24] p-2 rounded-2xl border border-[#232b5f]">
            <span className="text-xs text-slate-400 font-semibold px-2">
              {isAr ? 'تبديل التراتبية للاختبار:' : 'Switch Hierarchy:'}
            </span>

            <button
              onClick={() => switchRole('manager')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                currentRole === 'manager'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:bg-[#1a2046]'
              }`}
              title={isAr ? 'صلاحيات المدير الكاملة' : 'Manager'}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{isAr ? 'المدير' : 'Manager'}</span>
            </button>

            <button
              onClick={() => switchRole('supervisor')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                currentRole === 'supervisor'
                  ? 'bg-blue-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:bg-[#1a2046]'
              }`}
              title={isAr ? 'الأعمال الإدارية والتكليف' : 'Supervisor'}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>{isAr ? 'المشرف' : 'Supervisor'}</span>
            </button>

            <button
              onClick={() => switchRole('client')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                currentRole === 'client'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:bg-[#1a2046]'
              }`}
              title={isAr ? 'تسجيل العميل وطلبات العمل' : 'Client'}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{isAr ? 'العميل' : 'Client'}</span>
            </button>

            <button
              onClick={() => switchRole('worker')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                currentRole === 'worker'
                  ? 'bg-orange-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:bg-[#1a2046]'
              }`}
              title={isAr ? 'تتبع حضور العاملين وأماكنهم' : 'Worker'}
            >
              <HardHat className="w-3.5 h-3.5" />
              <span>{isAr ? 'العامل' : 'Worker'}</span>
            </button>

            {onOpenLoginModal && (
              <button
                onClick={onOpenLoginModal}
                className="px-2.5 py-1.5 rounded-xl bg-[#1b2252] hover:bg-[#252f70] text-amber-300 text-xs font-semibold transition cursor-pointer"
                title={isAr ? 'تسجيل دخول موحد' : 'Login Modal'}
              >
                <UserCheck className="w-3.5 h-3.5" />
              </button>
            )}

            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95"
                title={isAr ? 'العودة إلى الصفحة الأولى (الرئيسية)' : 'Return to Home / First Page'}
              >
                <Home className="w-3.5 h-3.5 text-slate-950" />
                <span>{isAr ? 'العودة للرئيسية' : 'Home'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Global Notification Banner */}
        {actionSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 text-emerald-200 text-sm flex items-center gap-2.5 animate-fadeIn shadow-xl">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span className="font-bold">{actionSuccess}</span>
          </div>
        )}

        {/* =========================================================================
            ROLE CIRCLE 1: MANAGER (المدير العام) - Full file oversight & Live Radar
           ========================================================================= */}
        {currentRole === 'manager' && (
          <div className="space-y-6">
            {/* Manager Circle Header Callout */}
            <div className="bg-[#101431] border border-amber-400/40 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5 text-amber-300 font-semibold">
                <Shield className="w-5 h-5 text-amber-400" />
                <span>
                  {isAr
                    ? 'دائرة تحكم المدير العام: صلاحيات استعراض كافة الملفات والعقود، إحصاءات الإنجاز، ورادار تتبع انتشار الفرق الميدانية.'
                    : 'General Manager Command: Unrestricted file access, operations audit, and live national field tracking radar.'}
                </span>
              </div>
              <div className="flex items-center gap-2 ms-auto">
                <span className="px-2.5 py-1 rounded bg-[#181f4a] text-slate-300 border border-[#273273]">
                  {isAr ? 'إجمالي طلبات العمل:' : 'Work Orders:'} <strong>{workOrders.length}</strong>
                </span>
                <span className="px-2.5 py-1 rounded bg-[#181f4a] text-emerald-300 border border-[#273273]">
                  {isAr ? 'العملاء المسجلون:' : 'Clients:'} <strong>{clients.length}</strong>
                </span>
                <span className="px-2.5 py-1 rounded bg-[#181f4a] text-amber-300 border border-[#273273]">
                  {isAr ? 'الفنيون الميدانيون الحاضرون:' : 'On-Site Staff:'} <strong>{workerCheckIns.length}</strong>
                </span>
              </div>
            </div>

            {/* Manager Live Worker Location Tracking Radar */}
            <div className="bg-[#101533] rounded-3xl border border-[#21295c] p-6 shadow-2xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
                    <Radio className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <span>{isAr ? 'رادار تتبع العاملين الميداني وأماكن تواجدهم' : 'Live Field Worker Tracking & Presence Radar'}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        {isAr ? 'تحديث حي' : 'Live Sync'}
                      </span>
                    </h2>
                    <p className="text-xs text-slate-400">
                      {isAr
                        ? 'مراقبة فورية لمواقع الفنيين في محطات البترول والغاز وتوقفات الصيانة (حقل ظهر، العين السخنة، مسطرد، الإسكندرية)'
                        : 'Real-time GPS coordinates and active shift presence of NDT technicians and PWHT operators across Egypt sites.'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowCheckInForm(true)}
                  className="px-3.5 py-2 rounded-xl bg-[#1b2250] hover:bg-[#252f70] text-amber-300 text-xs font-bold transition flex items-center gap-2 cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>{isAr ? 'محاكاة تسجيل موقع عامل' : 'Simulate Worker Location'}</span>
                </button>
              </div>

              {/* Worker Presence Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
                {workerCheckIns.map((worker) => {
                  const badge = getWorkerStatusBadge(worker.status);
                  return (
                    <div
                      key={worker.checkInId}
                      className="p-4 rounded-2xl bg-gradient-to-b from-[#151b43] to-[#0d112d] border border-[#242c67] hover:border-amber-400/50 transition space-y-2.5 shadow-md"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-full ${badge.dotColor} flex-shrink-0`} />
                          <h3 className="text-sm font-bold text-white leading-tight">
                            {worker.workerName}
                          </h3>
                        </div>
                      </div>

                      <div className="text-[11px] text-amber-300 font-semibold">
                        {worker.craft}
                      </div>

                      <div className="p-2 rounded-xl bg-[#090c20] border border-[#1b2149] text-xs space-y-1">
                        <div className="flex items-start gap-1.5 text-slate-200">
                          <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{worker.siteName}</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                          <span>Lat: {worker.latitude.toFixed(4)}</span>
                          <span>Lng: {worker.longitude.toFixed(4)}</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-300 italic line-clamp-2">
                        "{worker.notes || (isAr ? 'يباشر مهام التفتيش' : 'On-duty')}"
                      </div>

                      <div className="pt-1.5 border-t border-[#1b224e] flex items-center justify-between text-[10px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{new Date(worker.lastPing).toLocaleTimeString(isAr ? 'ar-EG' : 'en-US')}</span>
                        </span>
                        <span className="text-emerald-400 font-semibold">
                          {isAr ? badge.labelAr : badge.labelEn}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Master Work Orders & Client Records Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left 2 Cols: Master Work Orders */}
              <div className="lg:col-span-2 bg-[#101533] rounded-3xl border border-[#21295c] p-6 shadow-2xl space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <FileText className="w-5 h-5 text-amber-400" />
                      <span>{isAr ? 'سجل كافة طلبات العمل والمشاريع (Master Work Orders)' : 'Master Work Orders Register'}</span>
                    </h2>
                    <p className="text-xs text-slate-400">
                      {isAr
                        ? 'إشراف المدير العام على جميع مراحل التنفيذ والمعدات المكلفة ومواعيد التسليم.'
                        : 'Executive oversight of all work dispatches, allocated 65 kW units, and inspection deadlines.'}
                    </p>
                  </div>

                  <button
                    onClick={() => setShowWorkOrderForm(true)}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition flex items-center gap-1.5 cursor-pointer shadow-lg"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isAr ? 'إصدار أمر عمل جديد' : 'New Work Order'}</span>
                  </button>
                </div>

                {/* Filter and Search */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder={isAr ? 'بحث في الطلبات، العميل، الموقع...' : 'Search orders, clients, sites...'}
                      className="w-full bg-[#0a0d24] border border-[#232b5e] rounded-xl py-2 ps-9 pe-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-[#0a0d24] border border-[#232b5e] rounded-xl py-2 px-3 text-slate-200 focus:outline-none focus:border-amber-400"
                  >
                    <option value="all">{isAr ? 'جميع الحالات' : 'All Statuses'}</option>
                    <option value="submitted">{isAr ? 'قيد المراجعة' : 'Submitted'}</option>
                    <option value="approved">{isAr ? 'معتمد' : 'Approved'}</option>
                    <option value="in_progress">{isAr ? 'جاري التنفيذ' : 'In Progress'}</option>
                    <option value="testing_completed">{isAr ? 'مكتمل' : 'Completed'}</option>
                  </select>
                </div>

                {/* Master Work Orders List */}
                <div className="space-y-3">
                  {filteredWorkOrders.map((order) => {
                    const st = getStatusBadge(order.status);
                    return (
                      <div
                        key={order.orderId}
                        className="p-4 rounded-2xl bg-[#141a40] border border-[#232d66] hover:border-amber-400/40 transition space-y-2.5"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-amber-400">
                                {order.orderId}
                              </span>
                              <span className="text-xs px-2 py-0.5 rounded bg-[#1e275f] text-slate-200 font-semibold">
                                {order.serviceType}
                              </span>
                              {order.priority === 'urgent' || order.priority === 'emergency' ? (
                                <span className="text-[11px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold">
                                  {isAr ? 'طارئ ⚡' : 'Urgent ⚡'}
                                </span>
                              ) : null}
                            </div>
                            <h3 className="text-sm font-bold text-white mt-1">
                              {order.title}
                            </h3>
                            <div className="text-xs text-slate-300">
                              {order.clientName} • <span className="text-amber-300">{order.siteName}</span>
                            </div>
                          </div>

                          <div className="text-end">
                            <span className={`inline-block text-xs px-2.5 py-1 rounded-full border font-bold ${st.color}`}>
                              {isAr ? st.labelAr : st.labelEn}
                            </span>
                            <div className="text-[11px] text-slate-400 mt-1">
                              {isAr ? 'تاريخ التسليم المستهدف:' : 'Target:'} {order.targetCompletionDate}
                            </div>
                          </div>
                        </div>

                        <p className="text-xs text-slate-300 line-clamp-2">
                          {order.scopeDescription}
                        </p>

                        <div className="pt-2 border-t border-[#1e2659] flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                          <div>
                            <span>{isAr ? 'عدد الوصلات:' : 'Joints:'} <strong className="text-white">{order.jointsCount}</strong></span>
                            <span className="mx-2">|</span>
                            <span>{isAr ? 'المعدات:' : 'Equipment:'} <strong className="text-amber-300">{order.equipmentAssigned}</strong></span>
                          </div>

                          <div className="flex items-center gap-2">
                            <select
                              value={order.status}
                              onChange={(e) => updateWorkOrderStatus(order.orderId, e.target.value as WorkOrderStatus)}
                              className="bg-[#0b0e24] border border-[#2b3571] rounded-lg px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                            >
                              <option value="submitted">{isAr ? 'قيد المراجعة' : 'Submitted'}</option>
                              <option value="approved">{isAr ? 'اعتماد الطلب' : 'Approve'}</option>
                              <option value="technicians_dispatched">{isAr ? 'تحريك الأطقم' : 'Dispatch'}</option>
                              <option value="in_progress">{isAr ? 'جاري التنفيذ' : 'In Progress'}</option>
                              <option value="testing_completed">{isAr ? 'اكتمال الفحص' : 'Complete'}</option>
                              <option value="closed">{isAr ? 'إغلاق وتسليم' : 'Close'}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Col: Client Dossier & Files Archive */}
              <div className="bg-[#101533] rounded-3xl border border-[#21295c] p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-emerald-400" />
                    <span>{isAr ? 'سجل بيانات العملاء' : 'Clients Dossier'}</span>
                  </h2>
                  <button
                    onClick={() => setShowClientForm(true)}
                    className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{isAr ? 'إضافة عميل' : 'Add'}</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {clients.map((c) => (
                    <div
                      key={c.clientId}
                      className="p-3.5 rounded-2xl bg-[#141a40] border border-[#232c63] space-y-1.5 text-xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-white text-sm">
                          {c.companyName}
                        </h3>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                          {c.status}
                        </span>
                      </div>
                      <div className="text-slate-300">{c.industrySector}</div>
                      <div className="text-slate-400 flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-amber-400" />
                        <span dir="ltr">{c.phone}</span>
                      </div>
                      <div className="text-slate-400 flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-sky-400" />
                        <span>{c.email}</span>
                      </div>
                      <div className="pt-2 border-t border-[#1d2554] flex items-center justify-between text-[11px] text-slate-400">
                        <span>CR: {c.commercialRegister}</span>
                        <span className="text-amber-300 font-mono font-bold">{c.creditLimit}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stamped Documents & Files Archive Preview */}
                <div className="pt-3 border-t border-[#1d2554] space-y-2">
                  <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>{isAr ? 'أرشيف ملفات التفتيش والاعتمادات' : 'Official Files Archive'}</span>
                  </h3>
                  <div className="space-y-1.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-[#0b0e24] border border-[#1b224d] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-amber-400" />
                        <span className="text-slate-200">ISO 9001/14001/45001 Dossier.pdf</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-mono">Valid to 2028</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0b0e24] border border-[#1b224d] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Flame className="w-4 h-4 text-orange-400" />
                        <span className="text-slate-200">PWHT 65kW Calibration Certs.pdf</span>
                      </div>
                      <span className="text-[10px] text-amber-400 font-mono">Calibrated</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0b0e24] border border-[#1b224d] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-blue-400" />
                        <span className="text-slate-200">ENRRA Radiation Practice License.pdf</span>
                      </div>
                      <span className="text-[10px] text-blue-300 font-mono">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            ROLE CIRCLE 2: SUPERVISOR (مشرف العمليات) - Administrative & Work Order Dispatch
           ========================================================================= */}
        {currentRole === 'supervisor' && (
          <div className="space-y-6">
            <div className="bg-[#101431] border border-blue-400/40 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5 text-blue-300 font-semibold">
                <Briefcase className="w-5 h-5 text-blue-400" />
                <span>
                  {isAr
                    ? 'دائرة تحكم مشرف العمليات: القائم على الأعمال الإدارية، إصدار وتكليف طلبات العمل، اعتماد تقارير العاملين ومراجعة العملاء.'
                    : 'Operations Supervisor Desk: Administrative workflow, dispatching work orders, allocating technicians & equipment, and verifying client records.'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowWorkOrderForm(true)}
                  className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 text-xs font-black transition flex items-center gap-1.5 cursor-pointer shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isAr ? 'إنشاء وتكليف طلب عمل' : 'Dispatch Work Order'}</span>
                </button>
                <button
                  onClick={() => setShowClientForm(true)}
                  className="px-3.5 py-2 rounded-xl bg-[#1b2354] hover:bg-[#253073] text-emerald-300 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Building2 className="w-4 h-4" />
                  <span>{isAr ? 'تسجيل عميل جديد' : 'Register Client'}</span>
                </button>
              </div>
            </div>

            {/* Supervisor Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left 2 Cols: Work Orders Dispatcher */}
              <div className="lg:col-span-2 bg-[#101533] rounded-3xl border border-[#21295c] p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-400" />
                    <span>{isAr ? 'إدارة وتكليف طلبات العمل (Work Orders)' : 'Work Orders Management'}</span>
                  </h2>
                  <span className="text-xs text-slate-400">
                    {workOrders.length} {isAr ? 'طلبات مسجلة' : 'Registered Orders'}
                  </span>
                </div>

                <div className="space-y-3">
                  {workOrders.map((order) => {
                    const st = getStatusBadge(order.status);
                    return (
                      <div
                        key={order.orderId}
                        className="p-4 rounded-2xl bg-[#141a40] border border-[#232d66] space-y-3"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-blue-400">
                                {order.orderId}
                              </span>
                              <span className="text-xs px-2 py-0.5 rounded bg-[#1e275f] text-slate-200 font-semibold">
                                {order.serviceType}
                              </span>
                              <span className={`text-[11px] px-2.5 py-0.5 rounded-full border font-bold ${st.color}`}>
                                {isAr ? st.labelAr : st.labelEn}
                              </span>
                            </div>
                            <h3 className="text-base font-bold text-white mt-1">
                              {order.title}
                            </h3>
                            <div className="text-xs text-slate-300">
                              {isAr ? 'العميل:' : 'Client:'} <strong>{order.clientName}</strong> • {order.siteName}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                const nextStatus: WorkOrderStatus =
                                  order.status === 'submitted'
                                    ? 'approved'
                                    : order.status === 'approved'
                                    ? 'technicians_dispatched'
                                    : order.status === 'technicians_dispatched'
                                    ? 'in_progress'
                                    : 'testing_completed';
                                updateWorkOrderStatus(order.orderId, nextStatus);
                                showNotification(isAr ? 'تم تحديث حالة طلب العمل بنجاح!' : 'Order updated!');
                              }}
                              className="px-3 py-1.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>{isAr ? 'ترقية المرحلة' : 'Advance'}</span>
                            </button>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-[#0c0f24] text-xs text-slate-300 space-y-1">
                          <div>{order.scopeDescription}</div>
                          <div className="text-amber-400 font-semibold pt-1">
                            {isAr ? 'المعدات المخصصة:' : 'Assigned Equipment:'} {order.equipmentAssigned}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Col: Daily Field Reports Sign-off by Supervisor */}
              <div className="bg-[#101533] rounded-3xl border border-[#21295c] p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>{isAr ? 'تقارير الفنيين الميدانية' : 'Technician Field Reports'}</span>
                  </h2>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                    {fieldReports.length} {isAr ? 'تقارير' : 'Reports'}
                  </span>
                </div>

                <div className="space-y-3">
                  {fieldReports.map((rep) => (
                    <div
                      key={rep.reportId}
                      className="p-3.5 rounded-2xl bg-[#141a40] border border-[#232c63] space-y-2 text-xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="font-mono text-amber-400 font-bold">{rep.reportId}</span>
                          <h3 className="font-bold text-white">{rep.workerName}</h3>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">
                          {rep.serviceMethod}
                        </span>
                      </div>

                      <div className="text-slate-300 bg-[#0b0e24] p-2.5 rounded-xl border border-[#1d2454]">
                        "{rep.notes}"
                      </div>

                      <div className="flex items-center justify-between text-slate-400 text-[11px] pt-1">
                        <span>{isAr ? 'الوصلات المنجزة:' : 'Welds:'} <strong className="text-emerald-400">{rep.weldsCompleted}</strong></span>
                        <span>{isAr ? 'ساعات العمل:' : 'Hours:'} <strong className="text-white">{rep.hoursWorked}h</strong></span>
                        <span className="text-emerald-300 font-bold">{isAr ? 'معتمد' : 'Approved'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            ROLE CIRCLE 3: CLIENT (العميل) - Submit Work Application & Track Orders
           ========================================================================= */}
        {currentRole === 'client' && (
          <div className="space-y-6">
            <div className="bg-[#101431] border border-emerald-400/40 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5 text-emerald-300 font-semibold">
                <Building2 className="w-5 h-5 text-emerald-400" />
                <span>
                  {isAr
                    ? 'بوابة العميل الرقمية: تسجيل وتحديث بيانات الشركة، إرسال طلبات العمل (Work Requests)، وتتبع مراحل الفحص وتحميل التقارير.'
                    : 'Enterprise Client Portal: Company registration, instant work order submission, and verified certification downloads.'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowWorkOrderForm(true)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black transition flex items-center gap-1.5 cursor-pointer shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isAr ? 'تقديم طلب عمل جديد' : 'Submit Work Request'}</span>
                </button>
                <button
                  onClick={() => setShowClientForm(true)}
                  className="px-3.5 py-2 rounded-xl bg-[#142646] hover:bg-[#1a3461] text-emerald-300 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border border-emerald-500/30"
                >
                  <Building2 className="w-4 h-4" />
                  <span>{isAr ? 'تحديث بيانات الشركة' : 'Update Company Profile'}</span>
                </button>
              </div>
            </div>

            {/* Client Orders Pipeline Track Record */}
            <div className="bg-[#101533] rounded-3xl border border-[#21295c] p-6 shadow-2xl space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-emerald-400" />
                    <span>{isAr ? 'متابعة مراحل طلبات العمل الخاصة بكم' : 'My Active Work Orders Pipeline'}</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    {isAr
                      ? 'متابعة حية من لحظة استلام التكليف، تجهيز المعدات 65 kW، وصول الفنيين إلى الموقع وحتى إصدار الشهادات.'
                      : 'Real-time progression tracking from order review, equipment mobilization, on-site testing to stamped deliverables.'}
                  </p>
                </div>

                <div className="text-xs font-mono text-emerald-300 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30">
                  {isAr ? 'الشركة:' : 'Client:'} {userProfile?.company || 'شركة بترول بلاعيم (Petrobel)'}
                </div>
              </div>

              {/* Work Orders Pipeline Cards */}
              <div className="space-y-4">
                {workOrders.map((order) => {
                  const st = getStatusBadge(order.status);
                  const steps = [
                    { id: 'submitted', labelAr: 'تم تقديم الطلب', labelEn: 'Submitted' },
                    { id: 'approved', labelAr: 'اعتماد المواصفات', labelEn: 'Approved' },
                    { id: 'technicians_dispatched', labelAr: 'تعبئة الأطقم والمعدات', labelEn: 'Mobilized' },
                    { id: 'in_progress', labelAr: 'جاري التنفيذ الميداني', labelEn: 'In Progress' },
                    { id: 'testing_completed', labelAr: 'اعتماد وتسليم التقرير', labelEn: 'Completed' }
                  ];

                  const getStepIndex = (status: WorkOrderStatus) => {
                    switch (status) {
                      case 'submitted': return 0;
                      case 'approved': return 1;
                      case 'technicians_dispatched': return 2;
                      case 'in_progress': return 3;
                      case 'testing_completed': return 4;
                      case 'closed': return 4;
                      default: return 0;
                    }
                  };

                  const currentIndex = getStepIndex(order.status);

                  return (
                    <div
                      key={order.orderId}
                      className="p-5 rounded-2xl bg-[#141a40] border border-[#232d66] space-y-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-amber-400">
                              {order.orderId}
                            </span>
                            <span className="text-xs px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold">
                              {order.serviceType}
                            </span>
                            <span className="text-xs text-slate-400">
                              {isAr ? 'الموقع:' : 'Site:'} <strong className="text-white">{order.siteName}</strong>
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-white mt-1">
                            {order.title}
                          </h3>
                        </div>

                        <div className="text-end">
                          <span className={`inline-block text-xs px-3 py-1 rounded-full border font-bold ${st.color}`}>
                            {isAr ? st.labelAr : st.labelEn}
                          </span>
                          <div className="text-[11px] text-slate-400 mt-1">
                            {isAr ? 'تاريخ الإنجاز المستهدف:' : 'Target Date:'} <strong>{order.targetCompletionDate}</strong>
                          </div>
                        </div>
                      </div>

                      {/* Visual Milestone Step Progression */}
                      <div className="pt-2">
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                          {steps.map((stStep, idx) => {
                            const isDone = idx <= currentIndex;
                            const isCurrent = idx === currentIndex;
                            return (
                              <div
                                key={stStep.id}
                                className={`p-2.5 rounded-xl border transition ${
                                  isCurrent
                                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                                    : isDone
                                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                                    : 'bg-[#0b0e24] border-[#1d2454] text-slate-500'
                                }`}
                              >
                                <div className="text-[10px] font-mono mb-0.5">
                                  {isDone ? '✓ المرحلة ' + (idx + 1) : 'المرحلة ' + (idx + 1)}
                                </div>
                                <div>{isAr ? stStep.labelAr : stStep.labelEn}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-[#0b0e24] text-xs text-slate-300 flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <span>{isAr ? 'عدد الوصلات المطلوبة:' : 'Joints:'} <strong className="text-white">{order.jointsCount}</strong></span>
                          <span className="mx-2">|</span>
                          <span>{isAr ? 'المعدات المعتمدة:' : 'Equipment:'} <strong className="text-amber-400">{order.equipmentAssigned}</strong></span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => showNotification(isAr ? 'جاري تجهيز تقرير الفحص المعتمد...' : 'Generating stamped report...')}
                            className="px-3 py-1.5 rounded-lg bg-[#1a2350] hover:bg-[#232e6a] text-slate-200 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5 text-amber-400" />
                            <span>{isAr ? 'تحميل التقرير المختوم' : 'Download Report'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            ROLE CIRCLE 4: WORKER (العامل / الفني) - Site Check-In & Task Tracker
           ========================================================================= */}
        {currentRole === 'worker' && (
          <div className="space-y-6">
            <div className="bg-[#101431] border border-orange-400/40 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5 text-orange-300 font-semibold">
                <HardHat className="w-5 h-5 text-orange-400" />
                <span>
                  {isAr
                    ? 'منفذ الفني والعامل الميداني: تسجيل الحضور والموقع الميداني (Check-in/GPS)، متابعة مهام العمل المسندة، وتسجيل إنجاز الوصلات يومياً.'
                    : 'Field Worker Operations Portal: Shift check-in, GPS location broadcasting, assigned work orders, and daily execution logs.'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowCheckInForm(true)}
                  className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 text-xs font-black transition flex items-center gap-1.5 cursor-pointer shadow-lg"
                >
                  <MapPin className="w-4 h-4" />
                  <span>{isAr ? 'تسجيل التواجد والموقع الميداني' : 'Shift Site Check-In'}</span>
                </button>

                <button
                  onClick={() => setShowReportForm(true)}
                  className="px-3.5 py-2 rounded-xl bg-[#261d19] hover:bg-[#382b25] text-amber-300 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border border-orange-500/30"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isAr ? 'تسجيل إنجاز اليوم' : 'Daily Field Log'}</span>
                </button>
              </div>
            </div>

            {/* Worker Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left 2 Cols: My Assigned Work Orders */}
              <div className="lg:col-span-2 bg-[#101533] rounded-3xl border border-[#21295c] p-6 shadow-2xl space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <HardHat className="w-5 h-5 text-orange-400" />
                  <span>{isAr ? 'مهام العمل المسندة إليك بالموقع' : 'My Assigned Work Tasks'}</span>
                </h2>

                <div className="space-y-3">
                  {workOrders.slice(0, 2).map((order) => {
                    const st = getStatusBadge(order.status);
                    return (
                      <div
                        key={order.orderId}
                        className="p-4 rounded-2xl bg-[#141a40] border border-[#232d66] space-y-3"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <span className="font-mono text-xs font-bold text-amber-400">
                              {order.orderId}
                            </span>
                            <h3 className="text-base font-bold text-white mt-1">
                              {order.title}
                            </h3>
                            <div className="text-xs text-slate-300 flex items-center gap-1.5 mt-0.5">
                              <MapPin className="w-3.5 h-3.5 text-amber-400" />
                              <span>{order.siteName}</span>
                            </div>
                          </div>

                          <span className={`inline-block text-xs px-2.5 py-1 rounded-full border font-bold ${st.color}`}>
                            {isAr ? st.labelAr : st.labelEn}
                          </span>
                        </div>

                        <div className="p-3 rounded-xl bg-[#0b0e24] text-xs text-slate-300 space-y-1.5">
                          <p>{order.scopeDescription}</p>
                          <div className="text-amber-400 font-semibold">
                            {isAr ? 'المعدات المطلوبة للاستخدام:' : 'Assigned Equipment:'} {order.equipmentAssigned}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-[#1d2554] flex items-center justify-between text-xs text-slate-400">
                          <span>{isAr ? 'الوصلات المستهدفة:' : 'Target Joints:'} <strong className="text-white">{order.jointsCount}</strong></span>
                          <button
                            onClick={() => {
                              setSelectedOrderIdForReport(order.orderId);
                              setShowReportForm(true);
                            }}
                            className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition cursor-pointer"
                          >
                            {isAr ? 'تسجيل إنجاز لهذه المهمة' : 'Log Progress'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Col: Active Location Status */}
              <div className="bg-[#101533] rounded-3xl border border-[#21295c] p-6 shadow-2xl space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-emerald-400" />
                  <span>{isAr ? 'بيانات التواجد الحالية' : 'Current Shift Presence'}</span>
                </h2>

                <div className="p-4 rounded-2xl bg-[#141a40] border border-emerald-500/30 space-y-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-bold text-white text-sm">
                      {isAr ? 'متواجد ونشط بالموقع' : 'Active On-Site'}
                    </span>
                  </div>

                  <div className="text-slate-300">
                    <div className="text-slate-400 mb-0.5">{isAr ? 'الموقع المسجل:' : 'Registered Site:'}</div>
                    <div className="font-semibold text-amber-300">
                      حقل ظهر / مجمع بورسعيد - وحدة التبريد
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#090c20] font-mono text-[11px] text-slate-400 space-y-1">
                    <div>GPS: 31.2653° N, 32.3019° E</div>
                    <div className="text-emerald-400">{isAr ? 'دقة الإشارة: ± 3 أمتار (عبر القمر الصناعي)' : 'Accuracy: ± 3m'}</div>
                  </div>

                  <button
                    onClick={() => setShowCheckInForm(true)}
                    className="w-full py-2 px-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-black text-xs transition cursor-pointer shadow-md"
                  >
                    {isAr ? 'تحديث الموقع / تغيير الوردية' : 'Update Location / Status'}
                  </button>
                </div>

                {/* Safety & Checklist Reminder */}
                <div className="p-3.5 rounded-2xl bg-[#141836] border border-[#242c67] text-xs space-y-1.5">
                  <span className="font-bold text-amber-300 flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-amber-400" />
                    {isAr ? 'ضوابط السلامة والجودة (QHS):' : 'Quality & Safety Rules:'}
                  </span>
                  <ul className="text-slate-300 space-y-1 text-[11px]">
                    <li>• {isAr ? 'ارتداء مهمات الوقاية الشخصية PPE الكاملة' : 'Wear mandatory PPE'}</li>
                    <li>• {isAr ? 'فحص عزل وسادات السيراميك والتأكد من جهد 65V' : 'Check ceramic pad insulation (65V)'}</li>
                    <li>• {isAr ? 'الاحتفاظ بمخططات التسجيل الحراري الأصلية' : 'Maintain original thermal chart logs'}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            MODAL 1: Client Registration Form (أبلكيشن عمل لتسجيل بيانات العملاء)
           ========================================================================= */}
        {showClientForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
            <div className="relative w-full max-w-xl bg-gradient-to-b from-[#14193f] via-[#0e122e] to-[#0a0d24] rounded-3xl border-2 border-emerald-500/50 shadow-2xl p-6 sm:p-7 space-y-4 my-auto">
              <div className="flex items-center justify-between pb-3 border-b border-[#21295e]">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {isAr ? 'أبلكيشن تسجيل وتوثيق بيانات العميل' : 'Client Registration Application'}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {isAr ? 'تسجيل الشركات والمقاولين لدى شركة إنسكو' : 'Register Enterprise Client Profile'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowClientForm(false)}
                  className="w-8 h-8 rounded-full bg-[#1b2252] text-slate-300 hover:text-white flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleClientSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">
                    {isAr ? 'اسم الشركة / المقاول (بالكامل):' : 'Company Name:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newClient.companyName}
                    onChange={(e) => setNewClient({ ...newClient, companyName: e.target.value })}
                    placeholder={isAr ? 'مثال: شركة بتروجت / أوراسكوم للإنشاءات' : 'Company Name'}
                    className="w-full bg-[#0a0d24] border border-[#232b5e] rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">
                      {isAr ? 'رقم السجل التجاري (CR):' : 'Commercial Register (CR):'}
                    </label>
                    <input
                      type="text"
                      value={newClient.commercialRegister}
                      onChange={(e) => setNewClient({ ...newClient, commercialRegister: e.target.value })}
                      placeholder="104829/Cairo"
                      className="w-full bg-[#0a0d24] border border-[#232b5e] rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">
                      {isAr ? 'الرقم الضريبي:' : 'Tax Number:'}
                    </label>
                    <input
                      type="text"
                      value={newClient.taxNumber}
                      onChange={(e) => setNewClient({ ...newClient, taxNumber: e.target.value })}
                      placeholder="200-349-182"
                      className="w-full bg-[#0a0d24] border border-[#232b5e] rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">
                      {isAr ? 'المسؤول / مهندس الاتصال:' : 'Contact Person:'}
                    </label>
                    <input
                      type="text"
                      required
                      value={newClient.contactPerson}
                      onChange={(e) => setNewClient({ ...newClient, contactPerson: e.target.value })}
                      placeholder={isAr ? 'م. أحمد الشناوي' : 'Eng. Contact Person'}
                      className="w-full bg-[#0a0d24] border border-[#232b5e] rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">
                      {isAr ? 'رقم الهاتف / الواتساب:' : 'Phone Number:'}
                    </label>
                    <input
                      type="text"
                      required
                      value={newClient.phone}
                      onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                      placeholder="+20 100 123 4567"
                      className="w-full bg-[#0a0d24] border border-[#232b5e] rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">
                      {isAr ? 'البريد الإلكتروني الرسمي:' : 'Official Email:'}
                    </label>
                    <input
                      type="email"
                      value={newClient.email}
                      onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                      placeholder="procurement@company.com"
                      className="w-full bg-[#0a0d24] border border-[#232b5e] rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">
                      {isAr ? 'قطاع النشاط الصناعي:' : 'Industry Sector:'}
                    </label>
                    <select
                      value={newClient.industrySector}
                      onChange={(e) => setNewClient({ ...newClient, industrySector: e.target.value })}
                      className="w-full bg-[#0a0d24] border border-[#232b5e] rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-400"
                    >
                      <option value="النفط والغاز (Oil & Gas)">النفط والغاز (Oil & Gas)</option>
                      <option value="محطات الكهرباء والطاقة (Power Stations)">محطات الكهرباء والطاقة (Power Stations)</option>
                      <option value="تصنيع أوعية الضغط والغلايات (Pressure Vessels)">تصنيع أوعية الضغط والغلايات (Pressure Vessels)</option>
                      <option value="المقاولات والمنشآت الإنشائية (Infrastructure)">المقاولات والمنشآت الإنشائية (Infrastructure)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">
                    {isAr ? 'المقر الرئيسي / عنوان الموقع:' : 'Headquarters / Location:'}
                  </label>
                  <input
                    type="text"
                    value={newClient.headquarters}
                    onChange={(e) => setNewClient({ ...newClient, headquarters: e.target.value })}
                    placeholder={isAr ? 'القاهرة / السويس / الإسكندرية' : 'Headquarters'}
                    className="w-full bg-[#0a0d24] border border-[#232b5e] rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="pt-3 border-t border-[#21295e] flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowClientForm(false)}
                    className="px-4 py-2 rounded-xl bg-[#1b2250] text-slate-300 hover:text-white"
                  >
                    {isAr ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black cursor-pointer shadow-lg"
                  >
                    {isAr ? 'حفظ وتوثيق العميل' : 'Save & Register Client'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* =========================================================================
            MODAL 2: Work Order Application Form (ابلكيشن لطلبات العمل)
           ========================================================================= */}
        {showWorkOrderForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
            <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#14193f] via-[#0e122e] to-[#0a0d24] rounded-3xl border-2 border-amber-400/50 shadow-2xl p-6 sm:p-7 space-y-4 my-auto">
              <div className="flex items-center justify-between pb-3 border-b border-[#21295e]">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {isAr ? 'أبلكيشن إصدار طلب عمل جديد (Work Order Request)' : 'New Work Order Request Application'}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {isAr ? 'تكليف خدمات المعالجة الحرارية PWHT وفحوصات NDT المتقدمة' : 'PWHT & NDT Service Dispatch'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowWorkOrderForm(false)}
                  className="w-8 h-8 rounded-full bg-[#1b2252] text-slate-300 hover:text-white flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleWorkOrderSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">
                    {isAr ? 'عنوان المهمة / المشروع:' : 'Work Order Title / Scope:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newOrder.title}
                    onChange={(e) => setNewOrder({ ...newOrder, title: e.target.value })}
                    placeholder={isAr ? 'مثال: معالجة حرارية لوصلات خط الغاز بضغط 120 بار' : 'Work Order Title'}
                    className="w-full bg-[#0a0d24] border border-[#232b5e] rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">
                      {isAr ? 'العميل المستفيد:' : 'Client Company:'}
                    </label>
                    <select
                      value={newOrder.clientId}
                      onChange={(e) => {
                        const sel = clients.find((c) => c.clientId === e.target.value);
                        setNewOrder({
                          ...newOrder,
                          clientId: e.target.value,
                          clientName: sel ? sel.companyName : ''
                        });
                      }}
                      className="w-full bg-[#0a0d24] border border-[#232b5e] rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-amber-400"
                    >
                      {clients.map((c) => (
                        <option key={c.clientId} value={c.clientId}>
                          {c.companyName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">
                      {isAr ? 'نوع الخدمة المطلوبة:' : 'Service Type:'}
                    </label>
                    <select
                      value={newOrder.serviceType}
                      onChange={(e) => setNewOrder({ ...newOrder, serviceType: e.target.value })}
                      className="w-full bg-[#0a0d24] border border-[#232b5e] rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-amber-400"
                    >
                      <option value="PWHT">معالجة حرارية بعد اللحام (PWHT 65kW)</option>
                      <option value="PAUT">موجات فوق صوتية طورية (PAUT / TOFD)</option>
                      <option value="RT">فحص إشعاعي صناعي جاما راديولوجي (RT)</option>
                      <option value="UT">فحص بالموجات فوق الصوتية وقياس السماكة (UT)</option>
                      <option value="MT/PT">فحص حبيبات مغناطيسية وسوائل نافذة (MT/PT)</option>
                      <option value="PMI">تحليل طيفي للسبائك وقياس الصلادة (PMI & Hardness)</option>
                      <option value="Welders">توريد أطقم لحام معتمدة (Certified Welders)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">
                      {isAr ? 'موقع العمل الميداني / المحطة:' : 'Field Site / Station:'}
                    </label>
                    <input
                      type="text"
                      required
                      value={newOrder.siteName}
                      onChange={(e) => setNewOrder({ ...newOrder, siteName: e.target.value })}
                      placeholder={isAr ? 'مثال: محطة العين السخنة - مستودع C4' : 'Site Name'}
                      className="w-full bg-[#0a0d24] border border-[#232b5e] rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">
                      {isAr ? 'المحافظة / النطاق الجغرافي:' : 'Governorate:'}
                    </label>
                    <select
                      value={newOrder.governorate}
                      onChange={(e) => setNewOrder({ ...newOrder, governorate: e.target.value })}
                      className="w-full bg-[#0a0d24] border border-[#232b5e] rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-amber-400"
                    >
                      <option value="السويس (Suez)">السويس والقناة (Suez)</option>
                      <option value="بورسعيد (Port Said)">بورسعيد وحقل ظهر (Port Said)</option>
                      <option value="الإسكندرية (Alexandria)">الإسكندرية وبرج العرب (Alexandria)</option>
                      <option value="القاهرة والجيزة (Cairo)">القاهرة والجيزة والعاصمة (Cairo)</option>
                      <option value="الصحراء الغربية (Western Desert)">الصحراء الغربية والحقول (Western Desert)</option>
                      <option value="البحر الأحمر (Red Sea)">البحر الأحمر وخليج الزيت (Red Sea)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">
                      {isAr ? 'عدد الوصلات المتوقعة:' : 'Joints Count:'}
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={newOrder.jointsCount}
                      onChange={(e) => setNewOrder({ ...newOrder, jointsCount: Number(e.target.value) })}
                      className="w-full bg-[#0a0d24] border border-[#232b5e] rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">
                      {isAr ? 'درجة الأولوية والتعبئة:' : 'Priority:'}
                    </label>
                    <select
                      value={newOrder.priority}
                      onChange={(e) => setNewOrder({ ...newOrder, priority: e.target.value as any })}
                      className="w-full bg-[#0a0d24] border border-[#232b5e] rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-amber-400"
                    >
                      <option value="normal">{isAr ? 'عادي (مجدول)' : 'Normal'}</option>
                      <option value="urgent">{isAr ? 'عاجل (تعبئة سريعة)' : 'Urgent'}</option>
                      <option value="emergency">{isAr ? 'طارئ 24/7 (توقف صيانة مفاجئ)' : 'Emergency Shutdown'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">
                      {isAr ? 'تاريخ التسليم المستهدف:' : 'Target Date:'}
                    </label>
                    <input
                      type="date"
                      value={newOrder.targetCompletionDate}
                      onChange={(e) => setNewOrder({ ...newOrder, targetCompletionDate: e.target.value })}
                      className="w-full bg-[#0a0d24] border border-[#232b5e] rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">
                    {isAr ? 'المعدات المخصصة للعملية:' : 'Allocated Equipment:'}
                  </label>
                  <input
                    type="text"
                    value={newOrder.equipmentAssigned}
                    onChange={(e) => setNewOrder({ ...newOrder, equipmentAssigned: e.target.value })}
                    className="w-full bg-[#0a0d24] border border-[#232b5e] rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">
                    {isAr ? 'تفاصيل نطاق العمل والمواصفات القياسية:' : 'Scope & Standards (ASME / API):'}
                  </label>
                  <textarea
                    rows={3}
                    value={newOrder.scopeDescription}
                    onChange={(e) => setNewOrder({ ...newOrder, scopeDescription: e.target.value })}
                    placeholder={isAr ? 'اذكر قطر الأنابيب، السماكة، كود التفتيش ASME B31.3 أو Sec VIII...' : 'Scope details'}
                    className="w-full bg-[#0a0d24] border border-[#232b5e] rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="pt-3 border-t border-[#21295e] flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowWorkOrderForm(false)}
                    className="px-4 py-2 rounded-xl bg-[#1b2250] text-slate-300 hover:text-white"
                  >
                    {isAr ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black cursor-pointer shadow-lg"
                  >
                    {isAr ? 'إصدار أمر العمل رسمياً' : 'Issue Work Order'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* =========================================================================
            MODAL 3: Worker Shift Location Check-in (منفذ العاملين لتتبع أماكن التواجد)
           ========================================================================= */}
        {showCheckInForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
            <div className="relative w-full max-w-lg bg-gradient-to-b from-[#14193f] via-[#0e122e] to-[#0a0d24] rounded-3xl border-2 border-orange-500/50 shadow-2xl p-6 sm:p-7 space-y-4 my-auto">
              <div className="flex items-center justify-between pb-3 border-b border-[#21295e]">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {isAr ? 'تسجيل التواجد والموقع الميداني للفني' : 'Worker Site & Location Check-In'}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {isAr ? 'هيكل تتبع العاملين وأماكن تواجدهم أثناء العمل' : 'Live Field Presence & Radar Ping'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCheckInForm(false)}
                  className="w-8 h-8 rounded-full bg-[#1b2252] text-slate-300 hover:text-white flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCheckInSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">
                    {isAr ? 'الموقع أو المحطة الميدانية الحالية:' : 'Site / Plant Location:'}
                  </label>
                  <select
                    value={workerSiteName}
                    onChange={(e) => setWorkerSiteName(e.target.value)}
                    className="w-full bg-[#0a0d24] border border-[#232b5e] rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-orange-400"
                  >
                    <option value="حقل ظهر / مجمع بورسعيد - وحدة التبريد">حقل ظهر / مجمع بورسعيد - وحدة التبريد</option>
                    <option value="ميناء العين السخنة - مستودع سوميد البترولي">ميناء العين السخنة - مستودع سوميد البترولي</option>
                    <option value="خط أنابيب السويس - الكيلو 42">خط أنابيب السويس - الكيلو 42</option>
                    <option value="محطة كهرباء 6 أكتوبر المركبة">محطة كهرباء 6 أكتوبر المركبة</option>
                    <option value="مصفاة ميدور - الإسكندرية">مصفاة ميدور - الإسكندرية</option>
                    <option value="العاصمة الإدارية - محطة التبريد المركزي">العاصمة الإدارية - محطة التبريد المركزي</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">
                    {isAr ? 'حالة التواجد الحالية:' : 'Current Presence Status:'}
                  </label>
                  <select
                    value={workerStatus}
                    onChange={(e) => setWorkerStatus(e.target.value as WorkerPresenceStatus)}
                    className="w-full bg-[#0a0d24] border border-[#232b5e] rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-orange-400"
                  >
                    <option value="on_site">{isAr ? 'متواجد بالموقع وجاهز للعمل' : 'On Site & Ready'}</option>
                    <option value="active_testing">{isAr ? 'مباشرة الفحص والاختبار الآن' : 'Active Testing'}</option>
                    <option value="heat_soaking">{isAr ? 'مرحلة التثبيت الحراري (PWHT Soaking)' : 'PWHT Soaking'}</option>
                    <option value="traveling">{isAr ? 'في الطريق إلى موقع العمل' : 'Traveling to Site'}</option>
                    <option value="off_duty">{isAr ? 'انتهاء الوردية وتسليم الموقع' : 'Off Duty'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">
                    {isAr ? 'ملاحظات الوردية أو رقم الوصلة:' : 'Shift Notes / Active Joint:'}
                  </label>
                  <textarea
                    rows={2}
                    value={workerNotes}
                    onChange={(e) => setWorkerNotes(e.target.value)}
                    placeholder={isAr ? 'مثال: تم تركيب وسادات السيراميك والمزدوجات وجاري رفع درجة الحرارة بمعدل 120°C/hr' : 'Notes'}
                    className="w-full bg-[#0a0d24] border border-[#232b5e] rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-orange-400"
                  />
                </div>

                <div className="p-3 rounded-xl bg-[#090c20] border border-[#1c224e] text-slate-400 text-[11px] flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>
                    {isAr
                      ? 'سيتم بث إحداثيات موقعك عبر نظام التتبع الجغرافي للمشرفين والمدير العام تلقائياً.'
                      : 'Your location coordinates will sync with the operational tracking radar.'}
                  </span>
                </div>

                <div className="pt-3 border-t border-[#21295e] flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCheckInForm(false)}
                    className="px-4 py-2 rounded-xl bg-[#1b2250] text-slate-300 hover:text-white"
                  >
                    {isAr ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-black cursor-pointer shadow-lg"
                  >
                    {isAr ? 'تأكيد الحضور والموقع' : 'Confirm Check-In'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* =========================================================================
            MODAL 4: Daily Field Work Progress Report (تسجيل إنجاز العمل اليومي)
           ========================================================================= */}
        {showReportForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
            <div className="relative w-full max-w-lg bg-gradient-to-b from-[#14193f] via-[#0e122e] to-[#0a0d24] rounded-3xl border-2 border-amber-400/50 shadow-2xl p-6 sm:p-7 space-y-4 my-auto">
              <div className="flex items-center justify-between pb-3 border-b border-[#21295e]">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {isAr ? 'تسجيل تقرير الإنجاز الميداني اليومي' : 'Daily Field Progress Report'}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {isAr ? 'توثيق عدد الوصلات المفحوصة وساعات العمل' : 'Joint Counts & Thermal Cycles Log'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowReportForm(false)}
                  className="w-8 h-8 rounded-full bg-[#1b2252] text-slate-300 hover:text-white flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleFieldReportSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">
                    {isAr ? 'أمر العمل المرتبط:' : 'Associated Work Order:'}
                  </label>
                  <select
                    value={selectedOrderIdForReport}
                    onChange={(e) => setSelectedOrderIdForReport(e.target.value)}
                    className="w-full bg-[#0a0d24] border border-[#232b5e] rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-amber-400"
                  >
                    {workOrders.map((o) => (
                      <option key={o.orderId} value={o.orderId}>
                        {o.orderId} - {o.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">
                      {isAr ? 'الوصلات المكتملة:' : 'Completed Welds:'}
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={reportWelds}
                      onChange={(e) => setReportWelds(Number(e.target.value))}
                      className="w-full bg-[#0a0d24] border border-[#232b5e] rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">
                      {isAr ? 'ساعات التشغيل:' : 'Hours Worked:'}
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={reportHours}
                      onChange={(e) => setReportHours(Number(e.target.value))}
                      className="w-full bg-[#0a0d24] border border-[#232b5e] rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">
                      {isAr ? 'أقصى حرارة (°C):' : 'Max Temp (°C):'}
                    </label>
                    <input
                      type="number"
                      value={reportTemp}
                      onChange={(e) => setReportTemp(Number(e.target.value))}
                      className="w-full bg-[#0a0d24] border border-[#232b5e] rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">
                    {isAr ? 'ملاحظات الفحص ونتائج القراءات:' : 'Inspection Notes & Verification:'}
                  </label>
                  <textarea
                    rows={3}
                    value={reportNotes}
                    onChange={(e) => setReportNotes(e.target.value)}
                    placeholder={isAr ? 'مثال: تم اجتياز الفحص بدون عيوب، المخططات الحرارية مطابقة للكود ASME B31.3' : 'Notes'}
                    className="w-full bg-[#0a0d24] border border-[#232b5e] rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="pt-3 border-t border-[#21295e] flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowReportForm(false)}
                    className="px-4 py-2 rounded-xl bg-[#1b2250] text-slate-300 hover:text-white"
                  >
                    {isAr ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black cursor-pointer shadow-lg"
                  >
                    {isAr ? 'إرسال التقرير للاعتماد' : 'Submit Daily Report'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
