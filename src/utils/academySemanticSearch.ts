import { ENGINEERING_DISCIPLINES, EngineeringDiscipline, DisciplineLevel, CurriculumModule } from '../data/academyCurriculum';
import { TECHNICAL_TERMS_GLOSSARY, TechnicalTerm } from '../data/academySemanticGlossary';
import { NDT_METHODS, EDUCATIONAL_DEFECTS, STANDARDS_LIBRARY } from '../data/inscoData';

export type SearchResultType = 'term' | 'module' | 'standard' | 'defect' | 'method';

export interface SemanticSearchResult {
  id: string;
  type: SearchResultType;
  typeLabelAr: string;
  typeLabelEn: string;
  titleAr: string;
  titleEn: string;
  subtitleAr?: string;
  subtitleEn?: string;
  descriptionAr: string;
  descriptionEn: string;
  badge?: string;
  score: number;
  disciplineId?: string;
  disciplineTitleAr?: string;
  disciplineTitleEn?: string;
  levelIdx?: number;
  levelId?: string;
  levelNameAr?: string;
  levelNameEn?: string;
  moduleId?: string;
  formula?: string;
  code?: string;
  termData?: TechnicalTerm;
  highlights?: string[];
}

/**
 * Normalizes text for semantic Arabic/English fuzzy matching
 */
export function normalizeText(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    // Arabic diacritics removal
    .replace(/[\u064B-\u065F\u0670]/g, '')
    // Normalize Alef variations
    .replace(/[أإآ]/g, 'ا')
    // Normalize Teh Marbuta and Heh
    .replace(/ة/g, 'ه')
    // Normalize Yeh and Alef Maksura
    .replace(/ى/g, 'ي')
    // Replace punctuation with spaces
    .replace(/[^\w\s\u0600-\u06FF]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Technical Concept Synonym & Expansion Map
 */
const SEMANTIC_SYNONYMS: Record<string, string[]> = {
  // PWHT & Heat treatment
  pwht: ['معالجه حراريه', 'حراره', 'تسخين', 'تبريد', 'تثبيت', 'soak', 'soaking', 'heat treatment', 'stress relief', 'tempering', 'cooling rate', 'p91', 'preheat', 'post weld'],
  heat: ['pwht', 'معالجه حراريه', 'تسخين', 'حراره', 'soak', 'preheat', 'interpass', 'heat input', 'energy', 'joule', 'kj'],
  soak: ['تثبيت', 'نقع', 'pwht', 'زمن التثبيت', 'holding time', 'soak time', 'soaking', 'dwell', 'حراره قصوي'],
  preheat: ['تسخين مسبق', 'بريهيت', 'hydrogen', 'هيدروجين', 'شروخ بارده', 'cracking', 'aws d1.1', 'interpass'],
  p91: ['سبائك p91', 'creep', 'زحف', 'سوپرهيتر', 'بويلر', 'مراجل', '9cr 1mo', 'high temperature', 'pwht p91'],
  
  // Ultrasonic
  ut: ['موجات فوق صوتيه', 'التراسونيك', 'ultrasound', 'ultrasonic', 'ascan', 'a-scan', 'dac', 'soundpath', 'probe', 'مجس', 'transducer', 'shear wave'],
  ultrasonic: ['ut', 'موجات فوق صوتيه', 'فحص بالموجات', 'ascan', 'paut', 'tofd', 'dac', 'refraction', 'snell', 'velocity', 'sound'],
  dac: ['منحني داك', 'داك', 'distance amplitude', 'attenuation', 'تخميد', 'معايره', 'calibration block', 'asme v'],
  paut: ['phased array', 'مصفوفات طوريه', 'فحص بي او تي', 'موجات مصفوفيه', 'focal law', 's-scan', 'sectorial'],
  tofd: ['حيود وقت الطيران', 'توفد', 'diffraction', 'crack height', 'تحديد عمق الشرخ', 'pitch catch'],
  ascan: ['a-scan', 'مسح نقطي', 'pulse echo', 'نبضه وصدي', 'amplitude', 'اتساع الاشاره'],

  // Radiography
  rt: ['اشعه', 'تصوير اشعاعي', 'radiography', 'x-ray', 'gamma', 'iqi', 'film', 'densitometer', 'كثافه ضوئيه', 'اشعه سينيه'],
  radiography: ['rt', 'اشعه', 'افلام', 'x-ray', 'gamma', 'penetrameter', 'كثافه', 'تفسير الاشعه'],
  iqi: ['بنتراميتر', 'penetrameter', 'جوده الصوره', 'wire', 'اسلاك الاشعه', 'sensitivity', 'حساسيه'],

  // Surface
  pt: ['سائل نافذ', 'بينترانت', 'penetrant', 'liquid penetrant', 'dwell time', 'خاصيه شعريه', 'سائل ملون'],
  mt: ['جزيئات مغناطيسيه', 'مغناطيسي', 'magnetic particle', 'yoke', 'curie', 'كوري', 'flux leakage'],
  et: ['تيارات دواميه', 'eddy current', 'skin effect', 'تغلغل', 'موصليه', 'conductivity'],

  // Welding & Defects
  weld: ['لحام', 'شطبه', 'قوس', 'heat input', 'smaw', 'gtaw', 'fcaw', 'welding', 'pass', 'joint', 'وصله'],
  crack: ['شرخ', 'شروخ', 'صدع', 'cracking', 'hic', 'hydrogen', 'fatigue', 'كلال', 'delayed', 'planar'],
  defect: ['عيب', 'عيوب', 'discontinuity', 'flaw', 'شروخ', 'مساميه', 'porosity', 'خبث', 'slag', 'undercut', 'نقص انصهار', 'lof'],
  porosity: ['مساميه', 'فقاعات', 'gas pore', 'مسام', 'ثقوب غازيه', 'weld defect'],
  undercut: ['نحر', 'حفر عند الحافه', 'نقص حافه', 'cambridge gauge'],
  lof: ['lack of fusion', 'نقص الانصهار', 'عدم انصهار', 'انصهار جانبي', 'planar flaw'],

  // Standards & Levels
  asme: ['كود امريكي', 'asme v', 'asme ix', 'asme b31.3', 'ug-27', 'اوعيه ضغط', 'pressure vessel', 'غلايات'],
  api: ['api 510', 'api 570', 'api 653', 'api 579', 'ffs', 'ملاءمه للخدمه', 'خزانات', 'انابيب بتروليه'],
  asnt: ['شهاده', 'تاهيل', 'level 2', 'level 3', 'مستوي ثاني', 'مستوي ثالث', 'snt-tc-1a', 'iso 9712', 'فاحص معتمد']
};

/**
 * Pre-indexes all academy content into a searchable pool
 */
interface IndexedItem {
  id: string;
  type: SearchResultType;
  titleAr: string;
  titleEn: string;
  subtitleAr?: string;
  subtitleEn?: string;
  descriptionAr: string;
  descriptionEn: string;
  searchTokens: string[];
  rawText: string;
  code?: string;
  formula?: string;
  disciplineId?: string;
  disciplineTitleAr?: string;
  disciplineTitleEn?: string;
  levelIdx?: number;
  levelId?: string;
  levelNameAr?: string;
  levelNameEn?: string;
  moduleId?: string;
  termData?: TechnicalTerm;
}

let cachedIndex: IndexedItem[] | null = null;

function buildSearchIndex(): IndexedItem[] {
  if (cachedIndex) return cachedIndex;

  const items: IndexedItem[] = [];

  // 1. Technical Terms Glossary
  TECHNICAL_TERMS_GLOSSARY.forEach(term => {
    const raw = `${term.termEn} ${term.termAr} ${term.definitionEn} ${term.definitionAr} ${term.governingCode} ${term.synonyms.join(' ')} ${term.formula || ''}`;
    items.push({
      id: `term_${term.id}`,
      type: 'term',
      titleAr: term.termAr,
      titleEn: term.termEn,
      subtitleAr: term.categoryLabelAr,
      subtitleEn: term.categoryLabelEn,
      descriptionAr: term.definitionAr,
      descriptionEn: term.definitionEn,
      code: term.governingCode,
      formula: term.formula,
      disciplineId: term.relatedDisciplineId,
      levelId: term.relatedLevelId,
      moduleId: term.relatedModuleId,
      termData: term,
      searchTokens: normalizeText(raw).split(' '),
      rawText: normalizeText(raw)
    });
  });

  // 2. Curriculum Modules across all 8 Disciplines
  ENGINEERING_DISCIPLINES.forEach(disc => {
    disc.levels.forEach((lvl, lvlIdx) => {
      lvl.modules.forEach(mod => {
        const topicsText = `${mod.topicsEn.join(' ')} ${mod.topicsAr.join(' ')}`;
        const outcomesText = `${mod.learningOutcomesEn.join(' ')} ${mod.learningOutcomesAr.join(' ')}`;
        const raw = `${mod.titleEn} ${mod.titleAr} ${topicsText} ${outcomesText} ${disc.titleEn} ${disc.titleAr} ${lvl.nameEn} ${lvl.nameAr} ${lvl.applicableCodes.join(' ')}`;

        items.push({
          id: `mod_${mod.id}`,
          type: 'module',
          titleAr: mod.titleAr,
          titleEn: mod.titleEn,
          subtitleAr: `${disc.titleAr} • ${lvl.nameAr}`,
          subtitleEn: `${disc.titleEn} • ${lvl.nameEn}`,
          descriptionAr: mod.topicsAr.slice(0, 3).join(' | '),
          descriptionEn: mod.topicsEn.slice(0, 3).join(' | '),
          code: lvl.applicableCodes[0] || 'Engineering Syllabus',
          disciplineId: disc.id,
          disciplineTitleAr: disc.titleAr,
          disciplineTitleEn: disc.titleEn,
          levelIdx: lvlIdx,
          levelId: lvl.levelId,
          levelNameAr: lvl.nameAr,
          levelNameEn: lvl.nameEn,
          moduleId: mod.id,
          searchTokens: normalizeText(raw).split(' '),
          rawText: normalizeText(raw)
        });
      });
    });
  });

  // 3. Standards Library
  STANDARDS_LIBRARY.forEach(std => {
    const raw = `${std.code} ${std.titleEn} ${std.titleAr} ${std.scope}`;
    items.push({
      id: `std_${std.code.replace(/[^a-zA-Z0-9]/g, '_')}`,
      type: 'standard',
      titleAr: std.titleAr,
      titleEn: `${std.code}: ${std.titleEn}`,
      subtitleAr: 'المواصفات والأكواد الهندسية المعتمدة',
      subtitleEn: 'Engineering Code & Standard',
      descriptionAr: std.scope,
      descriptionEn: std.scope,
      code: std.code,
      searchTokens: normalizeText(raw).split(' '),
      rawText: normalizeText(raw)
    });
  });

  // 4. Weld Defects
  EDUCATIONAL_DEFECTS.forEach(defect => {
    const raw = `${defect.name.en} ${defect.name.ar} ${defect.nature.en} ${defect.nature.ar} ${defect.cause.en} ${defect.cause.ar} ${defect.severity} ${defect.acceptanceCriteriaCode} ${defect.bestDetectionMethods.join(' ')}`;
    items.push({
      id: `defect_${defect.id}`,
      type: 'defect',
      titleAr: defect.name.ar,
      titleEn: defect.name.en,
      subtitleAr: `عيب لحام • درجة الخطورة: ${defect.severity}`,
      subtitleEn: `Weld Discontinuity • Severity: ${defect.severity}`,
      descriptionAr: defect.nature.ar,
      descriptionEn: defect.nature.en,
      code: defect.acceptanceCriteriaCode,
      searchTokens: normalizeText(raw).split(' '),
      rawText: normalizeText(raw)
    });
  });

  // 5. NDT Methods
  NDT_METHODS.forEach(meth => {
    const raw = `${meth.code} ${meth.name.en} ${meth.name.ar} ${meth.category} ${meth.standards} ${meth.description.en} ${meth.description.ar}`;
    items.push({
      id: `method_${meth.id}`,
      type: 'method',
      titleAr: meth.name.ar,
      titleEn: `${meth.code} - ${meth.name.en}`,
      subtitleAr: `طريقة فحص هندسي معتمدة • ${meth.standards}`,
      subtitleEn: `Approved NDT Method • ${meth.standards}`,
      descriptionAr: meth.description.ar,
      descriptionEn: meth.description.en,
      code: meth.standards,
      searchTokens: normalizeText(raw).split(' '),
      rawText: normalizeText(raw)
    });
  });

  cachedIndex = items;
  return items;
}

/**
 * Searches the academy content with semantic expansion and weighted scoring
 */
export function searchAcademySemantic(
  query: string,
  categoryFilter: 'all' | 'terms' | 'modules' | 'standards' | 'defects' = 'all',
  maxResults: number = 20
): SemanticSearchResult[] {
  const cleanQ = normalizeText(query);
  if (!cleanQ || cleanQ.length < 2) return [];

  const index = buildSearchIndex();
  const queryTokens = cleanQ.split(' ').filter(t => t.length > 0);

  // Expand semantic query concepts
  const expandedConcepts: string[] = [];
  queryTokens.forEach(token => {
    Object.entries(SEMANTIC_SYNONYMS).forEach(([key, synonyms]) => {
      const normKey = normalizeText(key);
      const normSyns = synonyms.map(s => normalizeText(s));
      if (normKey === token || normSyns.some(s => s.includes(token) || token.includes(s))) {
        expandedConcepts.push(normKey);
        expandedConcepts.push(...normSyns);
      }
    });
  });

  const results: SemanticSearchResult[] = [];

  index.forEach(item => {
    // Apply category filter
    if (categoryFilter === 'terms' && item.type !== 'term') return;
    if (categoryFilter === 'modules' && item.type !== 'module') return;
    if (categoryFilter === 'standards' && item.type !== 'standard') return;
    if (categoryFilter === 'defects' && item.type !== 'defect' && item.type !== 'method') return;

    let score = 0;
    const normTitleEn = normalizeText(item.titleEn);
    const normTitleAr = normalizeText(item.titleAr);
    const normDescEn = normalizeText(item.descriptionEn);
    const normDescAr = normalizeText(item.descriptionAr);
    const normCode = normalizeText(item.code || '');

    // 1. Exact full-string match on title
    if (normTitleEn.includes(cleanQ) || normTitleAr.includes(cleanQ)) {
      score += 120;
    }

    // 2. Exact match in code/standard
    if (normCode && normCode.includes(cleanQ)) {
      score += 90;
    }

    // 3. Token-level matching
    queryTokens.forEach(token => {
      if (token.length < 2) return;
      if (normTitleEn.includes(token) || normTitleAr.includes(token)) {
        score += 50;
      }
      if (normCode.includes(token)) {
        score += 40;
      }
      if (normDescEn.includes(token) || normDescAr.includes(token)) {
        score += 20;
      }
      if (item.rawText.includes(token)) {
        score += 15;
      }
    });

    // 4. Semantic Concept Expansion Match
    expandedConcepts.forEach(concept => {
      if (!concept || concept.length < 3) return;
      if (normTitleEn.includes(concept) || normTitleAr.includes(concept)) {
        score += 35;
      } else if (normCode.includes(concept)) {
        score += 25;
      } else if (item.rawText.includes(concept)) {
        score += 15;
      }
    });

    // If score threshold met, include result
    if (score >= 20) {
      let typeLabelAr = 'مصطلح هندسي';
      let typeLabelEn = 'Technical Term';

      switch (item.type) {
        case 'module':
          typeLabelAr = 'وحدة دراسية بالمنهج';
          typeLabelEn = 'Curriculum Module';
          break;
        case 'standard':
          typeLabelAr = 'كود ومواصفة';
          typeLabelEn = 'Code & Standard';
          break;
        case 'defect':
          typeLabelAr = 'عيب لحام';
          typeLabelEn = 'Weld Defect';
          break;
        case 'method':
          typeLabelAr = 'طريقة فحص NDT';
          typeLabelEn = 'NDT Method';
          break;
      }

      results.push({
        id: item.id,
        type: item.type,
        typeLabelAr,
        typeLabelEn,
        titleAr: item.titleAr,
        titleEn: item.titleEn,
        subtitleAr: item.subtitleAr,
        subtitleEn: item.subtitleEn,
        descriptionAr: item.descriptionAr,
        descriptionEn: item.descriptionEn,
        code: item.code,
        formula: item.formula,
        disciplineId: item.disciplineId,
        disciplineTitleAr: item.disciplineTitleAr,
        disciplineTitleEn: item.disciplineTitleEn,
        levelIdx: item.levelIdx,
        levelId: item.levelId,
        levelNameAr: item.levelNameAr,
        levelNameEn: item.levelNameEn,
        moduleId: item.moduleId,
        termData: item.termData,
        score
      });
    }
  });

  // Sort descending by relevance score
  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
}
