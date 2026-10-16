import { 
  CurriculumModule,
  DisciplineLevel,
  EngineeringDiscipline,
  WorkshopLab,
  ReferenceTextbook
} from './curriculum/types';

import { conventionalNdtDiscipline } from './curriculum/disciplines/conventionalNdt';
import { advancedNdtDiscipline } from './curriculum/disciplines/advancedNdt';
import { weldingInspectionDiscipline } from './curriculum/disciplines/weldingInspection';
import { pwhtMetallurgyDiscipline } from './curriculum/disciplines/pwhtMetallurgy';
import { apiInspectionDiscipline } from './curriculum/disciplines/apiInspection';
import { coatingCorrosionDiscipline } from './curriculum/disciplines/coatingCorrosion';
import { qaqcManagementDiscipline } from './curriculum/disciplines/qaqcManagement';
import { assetIntegrityRopeDiscipline } from './curriculum/disciplines/assetIntegrityRope';

export type {
  CurriculumModule,
  DisciplineLevel,
  EngineeringDiscipline,
  WorkshopLab,
  ReferenceTextbook
};

export const ENGINEERING_DISCIPLINES: EngineeringDiscipline[] = [
  conventionalNdtDiscipline,
  advancedNdtDiscipline,
  weldingInspectionDiscipline,
  pwhtMetallurgyDiscipline,
  apiInspectionDiscipline,
  coatingCorrosionDiscipline,
  qaqcManagementDiscipline,
  assetIntegrityRopeDiscipline
];

export const WORKSHOP_LABS: WorkshopLab[] = [
  {
    id: 'ut_lab',
    titleAr: 'مختبر الموجات فوق الصوتية والمعايرة الافتراضي (UT A-Scan & Flaw Sizing Lab)',
    titleEn: 'Ultrasonic A-Scan & Angle Beam Flaw Sizing Lab',
    disciplineId: 'conventional_ndt',
    badge: 'Interactive Instrument',
    descAr: 'محاكاة حية لشاشة جهاز الموجات فوق الصوتية A-Scan الرقمي. حرك المسبار على شطبة اللحام أو بلوك المعايرة لرؤية النبضات وانعكاسات العيوب والتحقق من خط الـ DAC وحساب عمق العيب وزاويته.',
    descEn: 'Live digital A-scan flaw detector simulation. Drag the probe along the weld bevel to observe real-time echoes, evaluate against DAC curves, and calculate soundpath/depth.'
  },
  {
    id: 'pt_mt_darkroom',
    titleAr: 'مختبر السائل النافذ والجسيمات المغناطيسية الفلورية (PT & MT Darkroom Lab)',
    titleEn: 'PT & Fluorescent MT Darkroom Inspection Lab',
    disciplineId: 'conventional_ndt',
    badge: 'UV Blacklight Simulator',
    descAr: 'غرفة فحص تفاعلية مع حوافر المغنطة والإضاءة فوق البنفسجية (UV 365nm). اختبر العينات تحت الضوء الأبيض ثم أشعل الضوء الأسود لرؤية التوهج الفلوري للشروخ المجهرية الدقيقة.',
    descEn: 'Interactive darkroom workbench with magnetic yoke and 365nm UV black light. Reveal microscopic fatigue cracks and compare white-light vs fluorescent indications.'
  },
  {
    id: 'rt_illuminator',
    titleAr: 'مختبر فحص أفلام الأشعة السينية ومقياس الكثافة (RT Radiographic Illuminator)',
    titleEn: 'Radiographic Film Illuminator & Densitometer Lab',
    disciplineId: 'conventional_ndt',
    badge: 'X-Ray Density Analyzer',
    descAr: 'محاكي شاشة قراءة أفلام اللحام بالأشعة. حرك مسبار مقياس الكثافة الضوئية (Densitometer) لقراءة كثافة H&D وتأكد من أسلاك مقياس جودة الصورة IQI وتشخيص عيوب اللحام.',
    descEn: 'High-intensity radiographic illuminator simulator. Move optical densitometer probe across film, verify wire IQI visibility, and diagnose weld defect shadows.'
  },
  {
    id: 'weld_inspector_gauge',
    titleAr: 'مختبر مقاييس فحص اللحام والطاقة الحرارية (Weld Gauges & Heat Input Studio)',
    titleEn: 'Welding Inspection Gauges & Heat Input Studio',
    disciplineId: 'welding_inspection',
    badge: 'Digital Cambridge Gauge',
    descAr: 'استخدم مقياس كامبريدج الافتراضي لقياس عدم المحاذاة Hi-Lo وعمق النحر Undercut وسماكة التدعيم، مع حاسبة مباشرة لمدخلات الطاقة الحرارية والتأثير على قساوة اللحام.',
    descEn: 'Operate virtual Cambridge and Hi-Lo gauges to measure misalignment, undercut depth, and cap height, with real-time arc Heat Input calculator.'
  },
  {
    id: 'api_vessel_life',
    titleAr: 'مختبر أوعية الضغط وتقدير العمر المتبقي (API 510/570 Remaining Life Lab)',
    titleEn: 'API 510/570 Vessel Minimum Thickness & Remaining Life Lab',
    disciplineId: 'api_inspection',
    badge: 'ASME Formula Engine',
    descAr: 'تطبيق معادلة ASME UG-27 لحساب السماكة الدنيا لوعاء ضغط أسطواني، ومعدل التآكل والعمر المتبقي بالسنوات وموعد الفحص القادم وفقاً لمعايير API 510.',
    descEn: 'Interactive ASME UG-27 pressure vessel design formula, calculating minimum thickness t_min, annual corrosion rate, and remaining operating lifespan.'
  },
  {
    id: 'coating_dewpoint',
    titleAr: 'مختبر الدهانات ونقطة الندى وسماكة الطلاء (Coating Dew Point & DFT Studio)',
    titleEn: 'Coating Dew Point & SSPC-PA 2 DFT Studio',
    disciplineId: 'coating_corrosion',
    badge: 'Climatic 3°C Rule & DFT',
    descAr: 'حاسبة فيزيائية مباشرة لنقطة الندى من الرطوبة النسبية وحرارة الجو وتطبيق شرط الـ 3°C الإلزامي، مع فحص سماكة الطلاء الجاف وتطبيق قاعدة 80/20 لمواصفة SSPC-PA 2.',
    descEn: 'Live psychrometric dew point calculator checking the mandatory +3°C safety delta, plus Dry Film Thickness (DFT) verification under SSPC-PA 2 80/20 rule.'
  }
];
