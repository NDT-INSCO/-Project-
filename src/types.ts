export type Language = 'ar' | 'en';

export interface LocalizedText {
  ar: string;
  en: string;
}

export interface EducationalDefect {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  method: string;
  severity: 'low' | 'medium' | 'high';
}

export interface QuizQuestion {
  id: string;
  question: LocalizedText;
  options: LocalizedText[];
  correctAnswer: number;
  explanation: LocalizedText;
  discipline: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface NDTMethod {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  category: string;
}

export interface StandardEntry {
  id: string;
  code: string;
  title: LocalizedText;
  description: LocalizedText;
  publisher: string;
}

export interface CurriculumModule {
  id: string;
  titleAr: string;
  titleEn: string;
  duration: string;
  topicsAr: string[];
  topicsEn: string[];
  learningOutcomesAr: string[];
  learningOutcomesEn: string[];
}

export interface CurriculumLevel {
  levelId: string;
  tierCategory: string;
  nameAr: string;
  nameEn: string;
  academicStageAr: string;
  academicStageEn: string;
  targetRoleAr: string;
  targetRoleEn: string;
  prerequisitesAr: string;
  prerequisitesEn: string;
  trainingHours: number;
  experienceMonths: number;
  internationalCerts: string[];
  applicableCodes: string[];
  responsibilitiesAr: string[];
  responsibilitiesEn: string[];
  modules: CurriculumModule[];
}

export interface EngineeringDiscipline {
  id: string;
  titleAr: string;
  titleEn: string;
  category: string;
  badgeColor: string;
  overviewAr: string;
  overviewEn: string;
  keyTechniques: string[];
  globalAccreditations: string[];
  targetIndustries: string[];
  levels: CurriculumLevel[];
}