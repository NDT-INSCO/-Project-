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

export interface ReferenceTextbook {
  title: string;
  author: string;
  standardOrPublisher: string;
}

export interface DisciplineLevel {
  levelId: 'academic' | 'level1' | 'level2' | 'level3' | 'inspector' | 'senior';
  nameAr: string;
  nameEn: string;
  tierCategory?: 'academic' | 'level2' | 'level3';
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
  keyFormulas?: {
    nameAr: string;
    nameEn: string;
    formula: string;
    descriptionAr: string;
    descriptionEn: string;
  }[];
  practicalSkillsChecklist: {
    skillAr: string;
    skillEn: string;
    importance: 'mandatory' | 'recommended';
  }[];
  referenceTextbooks?: ReferenceTextbook[];
  academicFoundations?: {
    scienceBranchAr: string;
    scienceBranchEn: string;
    corePrinciplesAr: string[];
    corePrinciplesEn: string[];
    labExperimentsAr: string[];
    labExperimentsEn: string[];
  };
}

export interface EngineeringDiscipline {
  id: string;
  titleAr: string;
  titleEn: string;
  category: 'ndt_conventional' | 'ndt_advanced' | 'welding' | 'heat_treatment' | 'api_inspection' | 'coating' | 'quality' | 'asset_integrity';
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
  badge: string;
  descAr: string;
  descEn: string;
}
