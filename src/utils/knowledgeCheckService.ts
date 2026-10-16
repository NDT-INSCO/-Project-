import { CurriculumModule } from '../data/curriculum/types';
import { CURRICULUM_QUIZ_BANK, CurriculumQuizQuestion } from '../data/curriculum/curriculumQuizBank';
import { markModuleCompleted } from './curriculumProgress';

export interface KnowledgeQuestion {
  id: string;
  disciplineId: string;
  levelId: string;
  moduleId: string;
  disciplineTitleAr: string;
  disciplineTitleEn: string;
  moduleTitleAr: string;
  moduleTitleEn: string;
  question: {
    ar: string;
    en: string;
  };
  options: {
    ar: [string, string, string, string];
    en: [string, string, string, string];
  };
  correctIndex: number;
  codeReference: string;
  explanation: {
    ar: string;
    en: string;
  };
  keyTakeaway: {
    ar: string;
    en: string;
  };
}

export interface KnowledgeCheckRecord {
  moduleId: string;
  passed: boolean;
  score: number;
  selectedOption: number;
  completedAt: string;
}

export const KNOWLEDGE_CHECK_EVENT = 'insco_knowledge_check_updated';
const STORAGE_KEY_CHECKS = 'insco_academy_knowledge_checks';

/**
 * Curated high-impact single-question checks mapped to specific modules
 */
const CURATED_MODULE_QUESTIONS: Record<string, Partial<KnowledgeQuestion>> = {
  // Conventional NDT Modules
  'mod_c_acad_1': {
    question: {
      ar: 'ما هي العلاقة الفيزيائية بين تردد الموجة فوق الصوتية (Frequency) والطول الموجي (Wavelength) وقدرة الفحص على كشف العيوب المجهرية؟',
      en: 'What is the physical relationship between ultrasonic frequency, acoustic wavelength, and flaw detection sensitivity?'
    },
    options: {
      ar: [
        'كلما زاد التردد قل الطول الموجي وزادت قدرة الموجة على اكتشاف العيوب الأصغر حجماً',
        'كلما زاد التردد زاد الطول الموجي وقلت حساسية الجهاز',
        'التردد لا يؤثر نهائياً على سرعة الصوت أو طول الموجة داخل الفولاذ',
        'التردد المنخفض دائماً أفضل في الكشف عن الشروخ الشعرية السطحية'
      ],
      en: [
        'Higher frequency yields shorter wavelength, enhancing sensitivity for detecting microscopic flaws',
        'Higher frequency increases wavelength, reducing inspection sensitivity',
        'Frequency has zero effect on sound velocity or wavelength in steel',
        'Low frequency is always superior for resolving surface hairline micro-cracks'
      ]
    },
    correctIndex: 0,
    codeReference: 'Acoustic Physics & ASME Section V Article 4',
    explanation: {
      ar: 'وفق المعادلة λ = v / f، زيادة التردد f مع ثبات سرعة الصوت v في الوسط تجعل الطول الموجي λ أقصر، والحد الأدنى النظري لاكتشاف العيوب هو (λ/2)، لذا الترددات الأعلى ترصد عيوباً أدق.',
      en: 'According to λ = v / f, higher frequency shortens wavelength. Since minimum detectable flaw size is theoretically bounded by λ/2, higher frequencies resolve significantly smaller discontinuities.'
    },
    keyTakeaway: {
      ar: 'اختر ترددات أعلى (4-10 MHz) للمقاطع الرقيقة والعيوب الدقيقة، وترددات أقل (1-2.25 MHz) للمقاطع السميكة ذات الحبيبات الخشنة.',
      en: 'Select higher frequencies for thin sections and fine cracks; select lower frequencies for heavy attenuation or coarse grains.'
    }
  },
  'mod_c_l2_1': {
    question: {
      ar: 'أثناء المعايرة وفق ASME Section V Art. 4، ما هو الغرض الأساسي من رسم منحنى تصحيح السعة مع المسافة (DAC Curve)؟',
      en: 'During ultrasonic calibration per ASME Sec V Art. 4, what is the primary purpose of constructing a Distance Amplitude Correction (DAC) curve?'
    },
    options: {
      ar: [
        'تعويض التوهين الطبيعي وتشتت حزمة الموجات الصوتية لتقييم العيوب بنفس المعيار على أعماق مختلفة',
        'تحديد سرعة دوران مضخة التبريد داخل أنبوب البترول',
        'قياس سمك طبقة الدهان الخارجي للأنبوب فقط',
        'إلغاء الحاجة لاستخدام الجل المقترن (Couplant)'
      ],
      en: [
        'Compensating for natural sound beam attenuation and divergence to evaluate flaws equally at varying depths',
        'Determining the rotational speed of crude oil pipeline pumps',
        'Measuring only the dry film thickness of external protective coatings',
        'Eliminating the operational requirement for liquid acoustic couplant'
      ]
    },
    correctIndex: 0,
    codeReference: 'ASME Section V Article 4 (T-434 / T-470)',
    explanation: {
      ar: 'مع انتقال الصوت في المعدن يقل ارتفاع الصدى تدريجياً بسبب الامتصاص والتشتت. يربط منحنى DAC قمم الانعكاسات من ثقوب مرجعية متطابقة على أعماق مختلفة، مما يوفر خط مرجعي موحد للرفض أو القبول.',
      en: 'As sound travels through metal, echo amplitude attenuates. The DAC curve connects reference echoes from identical side-drilled holes at various depths, establishing an equalized rejection threshold.'
    },
    keyTakeaway: {
      ar: 'منحنى DAC يمنع التقليل الخاطئ من خطورة العيوب العميقة التي تعطي صدى صغيراً بسبب طول المسار الصوتي.',
      en: 'The DAC curve prevents false underestimation of deep flaws whose echo heights are attenuated by travel distance.'
    }
  },
  'mod_c_l3_1': {
    question: {
      ar: 'ما هي الصلاحية القانونية والفنية الحصرية لمهندس المستوى الثالث (ASNT Level III) وفقاً لـ SNT-TC-1A؟',
      en: 'What is the exclusive legal and professional prerogative of an ASNT Level III specialist under SNT-TC-1A?'
    },
    options: {
      ar: [
        'تأليف واعتماد إجراءات الفحص NDT وتأهيل واختبار كوادر المستويين الأول والثاني وتفسير متطلبات الكود',
        'تشغيل كاميرات الفحص الإشعاعي الميدانية دون تصريح سلامة نووية',
        'تنظيف وحف أسطح اللحام بفرشاة السلك قبل الفحص',
        'إلغاء متطلبات الفحص المحددة في عقد المالك دون موافقة كتابية'
      ],
      en: [
        'Authoring and approving NDT procedures, qualifying Level I/II personnel, and interpreting code mandates',
        'Operating field gamma ray cameras without nuclear regulatory licensing',
        'Grinding and wire-brushing weld surfaces prior to testing',
        'Unilaterally canceling contractual inspection requirements without client written consent'
      ]
    },
    correctIndex: 0,
    codeReference: 'ASNT SNT-TC-1A Section 4 & ISO 9712 Clause 6.3',
    explanation: {
      ar: 'مهندس المستوى الثالث هو السلطة الهندسية العليا المسؤولة عن صياغة واعتماد الإجراءات الفنية المكتوبة، والإشراف على برامج التدريب، وإجراء الامتحانات العملية والنظرية وتوثيق الشهادات.',
      en: 'An ASNT Level III holds supreme technical authority to draft and validate written procedures, administer qualification examinations, and interpret engineering acceptance standards.'
    },
    keyTakeaway: {
      ar: 'المستوى الثالث لا يمثل مجرد درجة فنية بل مسؤولية قانونية كاملة عن دقة وموثوقية منظومة الفحص برمتها.',
      en: 'Level III certification carries full regulatory and legal accountability for inspection integrity.'
    }
  },
  // Advanced NDT Modules
  'mod_a_acad_1': {
    question: {
      ar: 'في تقنية الموجات فوق الصوتية المصفوفة (Phased Array PAUT)، كيف يتم توجيه وتركيز حزمة الموجات دون تحريك المسبار؟',
      en: 'In Phased Array Ultrasonic Testing (PAUT), how is beam steering and focusing achieved without physically moving the probe?'
    },
    options: {
      ar: [
        'عن طريق تطبيق تأخيرات زمنية بمقياس النانو ثانية (Focal Laws) على نبضات العناصر البلورية المتعددة',
        'باستخدام مغناطيس دائم يدور بسرعة 3000 دورة بالدقيقة داخل المسبار',
        'بتسخين كريستالة الفحص إلى درجات حرارة تتجاوز نقطة كوري',
        'بإمالة الشاشة الرقمية للجهاز بزاوية 45 درجة أثناء المسح'
      ],
      en: [
        'By applying precise nanosecond time delays (Focal Laws) to individual multi-element crystals',
        'By utilizing a permanent magnet spinning at 3000 RPM inside the wedge',
        'By heating the transducer crystal beyond its Curie temperature',
        'By tilting the digital instrument display at a 45-degree angle during scanning'
      ]
    },
    correctIndex: 0,
    codeReference: 'ASME Section V Article 4 Mandatory Appendix V',
    explanation: {
      ar: 'تعتمد PAUT على مبدأ هيجنز للتداخل البنائي؛ حيث تطلق العناصر المتعددة نبضاتها بفوارق زمنية نانوية دقيقة (Focal Laws)، فتتحد الموجات الصغيرة لتشكل جبهة موجية واحدة موجهة ومركزة عند العمق والزاوية المطلوبة.',
      en: 'PAUT relies on Huygens principle of wave superposition. By pulsing multiple piezoelectric elements with nanosecond phase offsets (focal laws), wavelets constructively interfere into steered beams.'
    },
    keyTakeaway: {
      ar: 'قوانين البؤرة تتيح فحص زوايا متعددة (S-Scan) ومسح حجم اللحام كاملاً من موضع مسار واحد.',
      en: 'Focal laws allow comprehensive volumetric coverage via multi-angle Sectorial Scans from a fixed index line.'
    }
  },
  'mod_a_l2_1': {
    question: {
      ar: 'ما هي الميزة الفزيائية الأساسية لتقنية TOFD (Time-of-Flight Diffraction) مقارنة بطرق الصدى والسعة التقليدية؟',
      en: 'What is the primary physical advantage of Time-of-Flight Diffraction (TOFD) compared to traditional amplitude-based UT?'
    },
    options: {
      ar: [
        'تعتمد على زمن وصول موجات الحيود الدقيقة المنطلقة من قمة وقاع العيب وليس على سعة الانعكاس',
        'تتطلب صبغ خط اللحام باللون الفلوري الأخضر قبل توجيه المجس',
        'لا تحتاج إلى وسيط مقترن مائي نهائياً على جميع الأسطح',
        'تستطيع فحص الأنابيب دون الحاجة لمولد كهربائي أو بطاريات'
      ],
      en: [
        'It measures precise arrival times of diffracted tip wavelets from flaw edges rather than relying on echo amplitude',
        'It requires fluorescent green coating of weld beads prior to probe placement',
        'It requires zero acoustic couplant on any carbon steel or alloy surfaces',
        'It operates without any electrical generator or rechargeable battery supply'
      ]
    },
    correctIndex: 0,
    codeReference: 'ISO 10863 & ASME Section V Article 4 App III',
    explanation: {
      ar: 'تنتج قمم العيوب ونهاياتها موجات حيود كروية ضعيفة للغاية ولكنها متسقة في زمن وصولها. عبر زوج من مجسات الإرسال والاستقبال، يحسب TOFD عمق وارتفاع الشرخ بدقة كسر مليمتر بغض النظر عن اتجاه أو خشونة سطح العيب.',
      en: 'Flaw edges generate spherical diffraction tip signals. By measuring the flight time between transmitter and receiver probes, TOFD calculates flaw depth and through-wall height with sub-millimeter precision.'
    },
    keyTakeaway: {
      ar: 'تقنية TOFD هي المعيار الذهبي لحساب عمق وارتفاع الشروخ بدقة تفوق أي طريقة صدى كلاسيكية.',
      en: 'TOFD is the definitive industry benchmark for vertical flaw height sizing and crack growth monitoring.'
    }
  },
  // Welding Inspection Modules
  'mod_w_acad_1': {
    question: {
      ar: 'ما هو الفرق الجوهري بين مواصفة إجراء اللحام (WPS) وسجل تأهيل الإجراء (PQR) وفقاً لـ ASME Section IX؟',
      en: 'What is the fundamental difference between a Welding Procedure Specification (WPS) and Procedure Qualification Record (PQR) per ASME IX?'
    },
    options: {
      ar: [
        'الـ WPS هي وثيقة التعليمات الميدانية للملحم، بينما الـ PQR هو سجل الاختبارات المعملية المعتمدة التي تثبت صحة الإجراء',
        'الـ WPS خاصة بالفحص بالأشعة والـ PQR خاصة بفحص الصبغة فقط',
        'لا يوجد أي فرق بينهما ويمكن استبدالهما ببعضهما في الموقع',
        'الـ PQR يصدره الملحم بنفسه بينما الـ WPS تصدرها البلدية'
      ],
      en: [
        'The WPS is the instruction document for production welding, while the PQR is the certified laboratory test record proving suitability',
        'The WPS applies only to radiography, while the PQR applies solely to dye penetrant testing',
        'They are completely synonymous and interchangeable on fabrication sites',
        'The PQR is issued by the welder, while the WPS is issued by the municipal licensing board'
      ]
    },
    correctIndex: 0,
    codeReference: 'ASME Section IX (QW-100 & QW-200)',
    explanation: {
      ar: 'سجل PQR يوثق المتغيرات الفعلية أثناء لحام عينة الاختبار ونتائج الاختبارات الميكانيكية (الشد والانحناء والصلادة). بناءً على نجاح الـ PQR، تتم صياغة الـ WPS لتوجيه الملحم في المصنع أو الموقع ضمن الحدود المسموح بها.',
      en: 'The PQR documents actual fabrication variables and certified mechanical destructive tests (tensile, bend, toughness). The WPS provides operational parameters for production welders based on supporting PQRs.'
    },
    keyTakeaway: {
      ar: 'لا يمكن اعتماد أو تطبيق أي WPS إنتاجية دون الاستناد إلى PQR مؤهل ومختبر معملياً بنجاح.',
      en: 'No production WPS is code-valid without reference to a qualified, mechanically tested PQR.'
    }
  },
  // PWHT & Metallurgy Modules
  'mod_p_acad_1': {
    question: {
      ar: 'ما هو الهدف الأساسي لإجراء المعالجة الحرارية بعد اللحام (PWHT) لخطوط الأنابيب وأوعية الضغط وفق ASME B31.3 و ASME VIII؟',
      en: 'What is the primary engineering objective of Post Weld Heat Treatment (PWHT) per ASME B31.3 and ASME Section VIII?'
    },
    options: {
      ar: [
        'تخفيف الإجهادات المتبقية العالية (Residual Stresses) وتخفيض الصلادة وتحسين المتانة في منطقة اللحام ومنطقة التأثر الحراري HAZ',
        'تغيير لون سطح الأنبوب الخارجي إلى اللون الذهبي اللامع للديكور',
        'تسخين الأنبوب لزيادة سيولة البترول الخام المتدفق فقط',
        'إخفاء مسامات اللحام وعيوب الاختراق غير المكتمل'
      ],
      en: [
        'Relieving peak residual stresses, tempering high hardness, and restoring fracture toughness in the weld and HAZ',
        'Shifting the exterior pipe surface color to golden bronze for aesthetic decoration',
        'Heating the line solely to lower the viscosity of flowing crude hydrocarbons',
        'Melting the weld crown to visually conceal root porosity and lack of penetration'
      ]
    },
    correctIndex: 0,
    codeReference: 'ASME B31.3 Table 331.1.1 & ASME Section VIII Div 1 UCS-56',
    explanation: {
      ar: 'يترك اللحام إجهادات شد متبقية تقترب من نقطة خضوع المعدن مع تكون بنى مجهرية هشة كالمارتنزيت في الـ HAZ. يقوم الـ PWHT بتنشيط آليات الزحف المجهري لتفريغ هذه الإجهادات وتحسين مقاومة التصدع الإجهادي (SCC).',
      en: 'Welding induces residual tensile stresses near yield strength and forms brittle martensitic phases. PWHT activates thermal creep relaxation to relieve residual stresses and soften peak HAZ hardness.'
    },
    keyTakeaway: {
      ar: 'الـ PWHT يمنع الكوارث الميدانية الناتجة عن الانهيار الهش (Brittle Fracture) وتآكل الإجهاد الكبريتي (SSC/HIC).',
      en: 'Proper PWHT prevents catastrophic brittle ruptures and sour service stress corrosion cracking.'
    }
  },
  'mod_p_l2_1': {
    question: {
      ar: 'وفقاً لـ ASME B31.3، ما هو الإجراء المعتمد عند تجاوز معدل التسخين أو التبريد الأقصى المسموح به أثناء دورة الـ PWHT؟',
      en: 'Under ASME B31.3, what is the consequence of exceeding maximum allowable heating or cooling rates during PWHT?'
    },
    options: {
      ar: [
        'يؤدي التدرج الحراري الشديد إلى إحداث إجهادات حرارية تشوه الوصلة وقد تسبب شروخاً فورية في منطقة HAZ',
        'يحسن من سرعة تسليم المشروع دون أي أثر سلبي على الخواص الميكانيكية',
        'يزيد من كفاءة العزل الحراري لمادة السيراميك',
        'لا يمثل أي خطورة طالما أن درجة حرارة النقع (Soak Temp) تم الوصول إليها'
      ],
      en: [
        'Severe thermal gradients induce thermal shock stresses that can distort joints and trigger immediate HAZ cracking',
        'It accelerates project schedule with zero detrimental impact on mechanical metallurgy',
        'It improves the dielectric insulation rating of ceramic heating elements',
        'It poses zero metallurgical concern as long as the peak soak temperature was reached'
      ]
    },
    correctIndex: 0,
    codeReference: 'ASME B31.3 Para 331.1.4 & API RP 577',
    explanation: {
      ar: 'تحدد الأكواد معدلات تسخين وتبريد مدروسة (مثل 335°C/hr مقسومة على السمك) لتجنب حدوث تفاوت كبير في درجات الحرارة بين الأسطح الداخلية والخارجية والمقاطع المجاورة، مما يحمي الوصلة من الشروخ الحرارية.',
      en: 'Codes strictly limit heating and cooling rates (e.g. 335°C/hr / thickness) to restrict steep through-wall thermal gradients that would otherwise induce severe secondary thermal stresses.'
    },
    keyTakeaway: {
      ar: 'التحكم الدقيق بمعدلات التبريد يماثل في أهميته درجة حرارة النقع لمنع إعادة تصليب الفولاذ.',
      en: 'Controlled cooling rates are as critical as soak temperature to prevent re-hardening and thermal shock.'
    }
  },
  // API Inspection Modules
  'mod_api_acad_1': {
    question: {
      ar: 'ما هو الاختصاص الأساسي لكل من أكواد API 510 و API 570 و API 653 في المنشآت البترولية والبتروكيماوية؟',
      en: 'What are the specific domains governed respectively by API 510, API 570, and API 653 in operating plants?'
    },
    options: {
      ar: [
        'API 510 لأوعية الضغط، API 570 لشبكات أنابيب العمليات، و API 653 لصهاريج التخزين فوق الأرض',
        'API 510 للرافعات، API 570 لحفر الآبار، و API 653 لدهان المكاتب',
        'جميعها تختص فقط بفحص خراطيم المياه ومعدات الإطفاء',
        'أكواد خاصة بأسعار بيع براميل النفط في الأسواق العالمية'
      ],
      en: [
        'API 510 for Pressure Vessels, API 570 for Process Piping, and API 653 for Aboveground Storage Tanks',
        'API 510 for cranes, API 570 for well drilling, and API 653 for office architectural painting',
        'All three apply exclusively to municipal fire hydrant hoses and deluge nozzles',
        'They govern financial trade valuation and pricing of petroleum commodities'
      ]
    },
    correctIndex: 0,
    codeReference: 'API In-Service Inspection Standards Trio (510 / 570 / 653)',
    explanation: {
      ar: 'تشكل هذه الأكواد الثلاثة منظومة التفتيش أثناء الخدمة للسلامة التشغيلية بالمنشآت النفطية: API 510 للأوعية تحت الضغط، API 570 لأنظمة الأنابيب، و API 653 لخزانات التخزين الكبيرة في المستودعات والمصافي.',
      en: 'These three standards constitute the in-service asset integrity framework: API 510 governs pressure vessels, API 570 controls process piping systems, and API 653 regulates aboveground storage tanks.'
    },
    keyTakeaway: {
      ar: 'فهم وتطبيق ثلاثية الـ API يضمن مطابقة المنشآت لأعلى معايير السلامة التشغيلية ومنع التسريبات الكارثية.',
      en: 'Mastery of the API inspection trio ensures regulatory compliance and prevents catastrophic loss of containment.'
    }
  }
};

/**
 * Retrieves or builds a single-question knowledge check for any curriculum module
 */
export function getKnowledgeCheckForModule(
  disciplineId: string,
  levelId: string,
  module: CurriculumModule,
  disciplineTitleAr?: string,
  disciplineTitleEn?: string
): KnowledgeQuestion {
  // 1. Check curated module-specific questions first
  if (CURATED_MODULE_QUESTIONS[module.id]) {
    const curated = CURATED_MODULE_QUESTIONS[module.id];
    return {
      id: `kc_${module.id}`,
      disciplineId,
      levelId,
      moduleId: module.id,
      disciplineTitleAr: disciplineTitleAr || 'الأكاديمية الهندسية',
      disciplineTitleEn: disciplineTitleEn || 'INSCO Engineering Academy',
      moduleTitleAr: module.titleAr,
      moduleTitleEn: module.titleEn,
      question: curated.question!,
      options: curated.options!,
      correctIndex: curated.correctIndex ?? 0,
      codeReference: curated.codeReference || 'International Engineering Standard',
      explanation: curated.explanation!,
      keyTakeaway: curated.keyTakeaway!
    };
  }

  // 2. Check if curriculum quiz bank has a question for this moduleId
  const bankMatch = CURRICULUM_QUIZ_BANK.find(q => q.moduleId === module.id);
  if (bankMatch) {
    return {
      id: `kc_${bankMatch.id}`,
      disciplineId,
      levelId,
      moduleId: module.id,
      disciplineTitleAr: bankMatch.disciplineTitleAr,
      disciplineTitleEn: bankMatch.disciplineTitleEn,
      moduleTitleAr: module.titleAr,
      moduleTitleEn: module.titleEn,
      question: bankMatch.question,
      options: bankMatch.options,
      correctIndex: bankMatch.correctIndex,
      codeReference: bankMatch.codeReference,
      explanation: bankMatch.explanation,
      keyTakeaway: bankMatch.keyTakeaway
    };
  }

  // 3. Check if quiz bank has questions for this discipline & level
  const levelMatches = CURRICULUM_QUIZ_BANK.filter(
    q => q.disciplineId === disciplineId && q.levelId === levelId
  );
  if (levelMatches.length > 0) {
    // Select one stably based on module id hash
    const charSum = module.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const chosen = levelMatches[charSum % levelMatches.length];
    return {
      id: `kc_${module.id}_${chosen.id}`,
      disciplineId,
      levelId,
      moduleId: module.id,
      disciplineTitleAr: chosen.disciplineTitleAr,
      disciplineTitleEn: chosen.disciplineTitleEn,
      moduleTitleAr: module.titleAr,
      moduleTitleEn: module.titleEn,
      question: chosen.question,
      options: chosen.options,
      correctIndex: chosen.correctIndex,
      codeReference: chosen.codeReference,
      explanation: chosen.explanation,
      keyTakeaway: chosen.keyTakeaway
    };
  }

  // 4. Procedural synthesis grounded in the module's real topics and learning outcomes
  const firstTopicAr = module.topicsAr?.[0] || 'المعايير الهندسية وجودة الفحص';
  const firstTopicEn = module.topicsEn?.[0] || 'Engineering Standards & Inspection Quality';
  const firstOutcomeAr = module.learningOutcomesAr?.[0] || 'القدرة على تطبيق معايير الكود المعتمدة';
  const firstOutcomeEn = module.learningOutcomesEn?.[0] || 'Ability to apply certified code criteria';

  return {
    id: `kc_proc_${module.id}`,
    disciplineId,
    levelId,
    moduleId: module.id,
    disciplineTitleAr: disciplineTitleAr || 'الأكاديمية الهندسية والتفتيش',
    disciplineTitleEn: disciplineTitleEn || 'Engineering & Inspection Academy',
    moduleTitleAr: module.titleAr,
    moduleTitleEn: module.titleEn,
    question: {
      ar: `في إطار دراسة "${module.titleAr}"، ما هو الإجراء الهندسي الإلزامي لضمان جودة تطبيق موضوع (${firstTopicAr})؟`,
      en: `In the study of "${module.titleEn}", what is the mandatory engineering protocol to ensure reliable execution of (${firstTopicEn})?`
    },
    options: {
      ar: [
        `التحقق من مطابقة الإجراء للمعايير الدولية المعتمدة وتوثيق المعايرة الميدانية بدقة (${firstOutcomeAr})`,
        'الاعتماد على التقدير البصري غير المعاير واختصار خطوات الفحص الميداني',
        'تجاهل متطلبات وثيقة الممارسة المكتوبة (Written Practice) للشركة',
        'إيقاف المعايرة الدورية للأجهزة لتقليل زمن إنجاز المشروع'
      ],
      en: [
        `Verifying procedural compliance with international codes and precisely documenting field calibration (${firstOutcomeEn})`,
        'Relying on uncalibrated visual estimation while skipping mandated quality steps',
        'Disregarding company Written Practice requirements and procedure specifications',
        'Halting periodic calibration schedules to artificially shorten delivery timelines'
      ]
    },
    correctIndex: 0,
    codeReference: 'ASME / API / ASNT Industrial Inspection Standards',
    explanation: {
      ar: `تنص جميع الأكواد الهندسية على أن تطبيق موضوع (${firstTopicAr}) يتطلب التزاماً صارماً بالإجراء الفني المكتوب المعتمد من مهندس مؤهل (Level III/Inspector)، مع توثيق كافة ظروف المعايرة والنتائج لضمان سلامة المنشأة الصناعية.`,
      en: `All industrial standards mandate that implementing (${firstTopicEn}) requires strict compliance with written procedures validated by certified specialists, accompanied by rigorous auditable calibration records.`
    },
    keyTakeaway: {
      ar: `التطبيق الحرفي للإجراءات المعتمدة هو خط الدفاع الأول لمنع الحوادث الصناعية وضمان سلامة الأصول.`,
      en: `Strict procedural adherence serves as the primary barrier against catastrophic operational failures.`
    }
  };
}

/**
 * Returns all stored knowledge check records
 */
export function getStoredKnowledgeChecks(): Record<string, KnowledgeCheckRecord> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CHECKS);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.warn('Error reading knowledge checks:', err);
    return {};
  }
}

/**
 * Checks whether a module has been tested with a Knowledge Check
 */
export function isModuleKnowledgeChecked(moduleId: string): boolean {
  const map = getStoredKnowledgeChecks();
  return Boolean(map[moduleId] && map[moduleId].passed);
}

/**
 * Records knowledge check result and automatically marks module completed if passed
 */
export function recordKnowledgeCheck(
  disciplineId: string,
  levelId: string,
  moduleId: string,
  passed: boolean,
  selectedOption: number
): void {
  if (typeof window === 'undefined') return;

  try {
    const map = getStoredKnowledgeChecks();
    map[moduleId] = {
      moduleId,
      passed,
      score: passed ? 100 : 0,
      selectedOption,
      completedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY_CHECKS, JSON.stringify(map));

    // If passed, also mark module completed in curriculum progress
    if (passed) {
      markModuleCompleted(moduleId, disciplineId, levelId, true, 100);
    }

    // Dispatch global events
    window.dispatchEvent(new CustomEvent(KNOWLEDGE_CHECK_EVENT, { 
      detail: { moduleId, passed, disciplineId, levelId } 
    }));
  } catch (err) {
    console.warn('Error recording knowledge check:', err);
  }
}
