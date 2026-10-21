export interface CurriculumModule {
  id: string;
  titleAr: string;
  titleEn: string;
  duration: string;
  topicsAr: string[];
  topicsEn?: string[];
  keyTopics?: string[];
  learningOutcomesAr?: string[];
  learningOutcomesEn?: string[];
  flashcardDeckId?: string;
  quizId?: string;
}

export interface KeyFormula {
  nameAr: string;
  nameEn: string;
  formula: string;
  noteAr?: string;
  noteEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
}

export interface PracticalSkill {
  id?: string;
  titleAr?: string;
  titleEn?: string;
  skillAr?: string;
  skillEn?: string;
  codeStandard?: string;
  importance?: string;
  [key: string]: any;
}

export interface ReferenceTextbook {
  title: string;
  author?: string;
  standardOrPublisher?: string;
  year?: string;
}

export interface DisciplineLevel {
  levelId: 'academic' | 'level1' | 'level2' | 'level3';
  tierCategory?: string;
  nameAr: string;
  nameEn: string;
  academicStageAr?: string;
  academicStageEn?: string;
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
  keyFormulas?: KeyFormula[];
  practicalSkillsChecklist?: PracticalSkill[];
  referenceTextbooks?: ReferenceTextbook[];
  academicFoundations?: any;
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
  levels: DisciplineLevel[];
}

export interface WorkshopLab {
  id: string;
  titleAr: string;
  titleEn: string;
  disciplineId: string;
  descriptionAr: string;
  descriptionEn: string;
  iconName: string;
  interactiveTool: string;
  tags: string[];
}
