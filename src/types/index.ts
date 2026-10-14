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
