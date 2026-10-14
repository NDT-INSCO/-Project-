export type Language = 'ar' | 'en';

export interface NDTMethod {
  id: string;
  code: string;
  name: { ar: string; en: string };
  standards: string;
  category: 'surface' | 'volumetric' | 'metallurgical' | 'integrity';
  summary: { ar: string; en: string };
  description: { ar: string; en: string };
  applications: { ar: string[]; en: string[] };
  equipmentUsed: { ar: string; en: string };
  advantages: { ar: string[]; en: string[] };
  limitations: { ar: string[]; en: string[] };
}

export interface ProjectRecord {
  id: string;
  client: string;
  project: string;
  country: string;
  location: string;
  activities: string;
  verifiedPhoto: boolean;
  photoUrl?: string;
  period?: string;
  documentRef?: string;
}

export interface ISOAccreditation {
  code: string;
  name: { ar: string; en: string };
  certNo: string;
  validThrough: string;
  issuingBody: string;
  cabNumber: string;
  iafCode: string;
  surveillanceAudits: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedActions?: { label: string; action: string; payload?: any }[];
  suggestedTab?: string;
  tabLabel?: string;
  tabReason?: string;
  suggestedQuestions?: string[];
}

export interface ServiceRFQ {
  reference: string;
  title: string;
  serviceType: string;
  executiveSummary: string;
  technicalScope: string[];
  recommendedMethods: string[];
  requiredEquipment: string[];
  qualityDeliverables: string[];
  mobilizationTimeframe: string;
  complianceStatement: string;
}

export interface EducationalDefect {
  id: string;
  name: { ar: string; en: string };
  nature: { ar: string; en: string };
  cause: { ar: string; en: string };
  bestDetectionMethods: string[];
  acceptanceCriteriaCode: string;
  severity: 'High' | 'Critical' | 'Medium';
}

export interface QuizQuestion {
  id: string;
  question: { ar: string; en: string };
  options: { ar: string[]; en: string[] };
  correctIndex: number;
  explanation: { ar: string; en: string };
}

export interface FAQItem {
  id: string;
  category: 'pwht' | 'volumetric' | 'surface' | 'compliance' | 'commercial' | 'mobilization';
  categoryLabel: { ar: string; en: string };
  question: { ar: string; en: string };
  shortAnswer: { ar: string; en: string };
  detailedAnswer: { ar: string; en: string };
  keyTakeaways: { ar: string[]; en: string[] };
  applicableCodes?: string[];
  relatedMethodCode?: string;
  frequencyBadge?: { ar: string; en: string };
  tags: string[];
}

export type UserRole = 'manager' | 'supervisor' | 'client' | 'worker';

export interface UserProfile {
  userId: string;
  email: string;
  displayName: string;
  photoUrl?: string;
  role: UserRole;
  company?: string;
  phone?: string;
  department?: string;
  status: 'active' | 'suspended';
  createdAt: string;
}

export interface ClientProfile {
  clientId: string;
  companyName: string;
  commercialRegister: string;
  taxNumber?: string;
  industrySector: string;
  contactPerson: string;
  phone: string;
  email: string;
  headquarters: string;
  assignedSupervisorId?: string;
  status: 'verified' | 'pending' | 'inactive';
  creditLimit?: string;
  createdAt: string;
}

export type WorkOrderStatus =
  | 'submitted'
  | 'approved'
  | 'technicians_dispatched'
  | 'in_progress'
  | 'testing_completed'
  | 'closed';

export interface WorkOrder {
  orderId: string;
  title: string;
  clientId: string;
  clientName: string;
  serviceType: string; // e.g., 'PWHT', 'PAUT', 'RT', 'MT/PT', 'Welders Supply'
  siteName: string;
  governorate: string;
  latitude: number;
  longitude: number;
  scopeDescription: string;
  jointsCount: number;
  equipmentAssigned: string;
  assignedSupervisorId: string;
  assignedWorkerIds: string[];
  targetCompletionDate: string;
  priority: 'normal' | 'urgent' | 'emergency';
  status: WorkOrderStatus;
  createdAt: string;
}

export type WorkerPresenceStatus =
  | 'on_site'
  | 'active_testing'
  | 'heat_soaking'
  | 'traveling'
  | 'off_duty';

export interface WorkerCheckIn {
  checkInId: string;
  workerId: string;
  workerName: string;
  craft: string; // e.g., 'Level II UT Inspector', 'PWHT Senior Technician', 'Certified Pipe Welder'
  siteName: string;
  orderId?: string;
  latitude: number;
  longitude: number;
  status: WorkerPresenceStatus;
  checkInTime: string;
  lastPing: string;
  notes?: string;
}

export interface DailyFieldReport {
  reportId: string;
  orderId: string;
  workerId: string;
  workerName: string;
  date: string;
  serviceMethod: string;
  weldsCompleted: number;
  hoursWorked: number;
  temperatureMax?: number;
  supervisorSignOff?: string;
  status: 'draft' | 'submitted' | 'approved';
  notes: string;
  createdAt: string;
}
