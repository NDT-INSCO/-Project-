export type Language = 'ar' | 'en';

export interface EducationalDefect {
  id: string;
  name: { ar: string; en: string };
  nature: { ar: string; en: string };
  cause: { ar: string; en: string };
  bestDetectionMethods: string[];
  acceptanceCriteriaCode: string;
  severity: 'Critical' | 'Major' | 'Minor';
  // Optional convenience fields
  nameAr?: string;
  nameEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
}

export interface QuizQuestion {
  id: string;
  question: { ar: string; en: string };
  options: { ar: string[]; en: string[] };
  correctAnswer: number;
  correctIndex?: number;
  explanation: { ar: string; en: string };
  category?: string;
  codeReference?: string;
  // Fallbacks
  questionAr?: string;
  questionEn?: string;
  optionsAr?: string[];
  optionsEn?: string[];
  explanationAr?: string;
  explanationEn?: string;
}

export interface NdtMethodInfo {
  id: string;
  code: string;
  category?: string;
  name: { ar: string; en: string };
  standards: string;
  description: { ar: string; en: string };
  // Fallbacks
  titleAr?: string;
  titleEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
}

export interface StandardReference {
  id?: string;
  code: string;
  titleAr: string;
  titleEn: string;
  category?: string;
  scope: string;
}
