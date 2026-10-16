export interface CurriculumQuizQuestion {
  id: string;
  disciplineId: string;
  levelId: 'academic' | 'level1' | 'level2' | 'level3';
  moduleId?: string;
  disciplineTitleAr: string;
  disciplineTitleEn: string;
  levelNameAr: string;
  levelNameEn: string;
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

export const CURRICULUM_QUIZ_BANK: CurriculumQuizQuestion[] = [
  // =========================================================================
  // 1. CONVENTIONAL NDT (الموجات فوق الصوتية، الأشعة، المغناطيسية، السوائل)
  // =========================================================================
  {
    id: 'c_ndt_acad_1',
    disciplineId: 'conventional_ndt',
    levelId: 'academic',
    moduleId: 'mod_c_acad_1',
    disciplineTitleAr: 'الفحص غير الإتلافي التقليدي (Conventional NDT)',
    disciplineTitleEn: 'Conventional Non-Destructive Testing',
    levelNameAr: 'المرحلة الأكاديمية والجامعية',
    levelNameEn: 'Academic & University Stage',
    question: {
      ar: 'إذا كانت سرعة الموجات الصوتية الطولية في الفولاذ الكربوني 5920 m/s، وتستخدم مسباراً بتردد 4 MHz، فما هو الطول الموجي (Wavelength λ) وما هو أصغر عيب يمكن نظرياً اكتشافه بحساسية النصف موجة (λ/2)؟',
      en: 'Given a longitudinal acoustic velocity of 5920 m/s in carbon steel with a 4 MHz transducer, what is the wavelength (λ) and the theoretical minimum flaw size resolvable at λ/2?'
    },
    options: {
      ar: [
        'الطول الموجي 1.48 mm وأصغر عيب 0.74 mm',
        'الطول الموجي 2.96 mm وأصغر عيب 1.48 mm',
        'الطول الموجي 0.67 mm وأصغر عيب 0.33 mm',
        'الطول الموجي 4.00 mm وأصغر عيب 2.00 mm'
      ],
      en: [
        'Wavelength 1.48 mm, theoretical minimum detectable flaw 0.74 mm',
        'Wavelength 2.96 mm, theoretical minimum detectable flaw 1.48 mm',
        'Wavelength 0.67 mm, theoretical minimum detectable flaw 0.33 mm',
        'Wavelength 4.00 mm, theoretical minimum detectable flaw 2.00 mm'
      ]
    },
    correctIndex: 0,
    codeReference: 'Acoustic Wave Physics & ASME Section V Article 4',
    explanation: {
      ar: 'وفقاً لمعادلة انتشار الموجات: λ = v / f = 5920 / (4 × 10^6) = 0.00148 m = 1.48 mm. والحد النظري الأدنى لاكتشاف العيوب هو نصف الطول الموجي (λ/2) = 0.74 mm، فأي عيب أصغر من ذلك سيتجاوزه الصدى دون انعكاس واضح.',
      en: 'Using the wave relation λ = v / f = 5920 / (4e6) = 1.48 mm. The theoretical resolution threshold is λ/2 = 0.74 mm, below which diffraction dominates over reflection.'
    },
    keyTakeaway: {
      ar: 'زيادة التردد تُقلل الطول الموجي فتزيد من الحساسية لاكتشاف العيوب الأصغر حجماً.',
      en: 'Higher frequency reduces wavelength, enhancing sensitivity for finer flaw detection.'
    }
  },
  {
    id: 'c_ndt_l2_1',
    disciplineId: 'conventional_ndt',
    levelId: 'level2',
    moduleId: 'mod_c_l2_1',
    disciplineTitleAr: 'الفحص غير الإتلافي التقليدي (Conventional NDT)',
    disciplineTitleEn: 'Conventional Non-Destructive Testing',
    levelNameAr: 'المستوى الثاني التطبيقي والميداني',
    levelNameEn: 'Level II Certified Practitioner',
    question: {
      ar: 'عند معايرة جهاز الموجات فوق الصوتية لإنشاء منحنى DAC وفقاً لـ ASME Section V Art. 4، ما هو الإجراء المعتمد عند هبوط صدى العيب إلى ما دون مستوى منحنى الرفض؟',
      en: 'During ultrasonic calibration per ASME Sec V Art. 4, how is an indication evaluated when its amplitude exceeds 100% of the Distance Amplitude Correction (DAC) curve vs 20% DAC?'
    },
    options: {
      ar: [
        'أي صدى يتجاوز 100% DAC يتم تقييمه لتحديد الطول وإذا تجاوز حدود الكود يُرفض، بينما ما دون 20% DAC لا يُسجل',
        'جميع الانعكاسات حتى 10% DAC تعتبر مرفوضة فوراً',
        'لا يُستخدم منحنى DAC إلا مع سبائك التيتانيوم فقط',
        'يتم زيادة كسب الجهاز Gain بمقدار 50 dB لتسجيل كل شائبة'
      ],
      en: [
        'Echoes exceeding 100% DAC are evaluated for length and rejected if code limits are exceeded, while echoes below 20% DAC are non-recordable',
        'Any reflection even at 10% DAC requires immediate weld rejection',
        'DAC curves are only applicable to titanium alloys',
        'Instrument gain must be increased by 50 dB to record every microscopic grain boundary'
      ]
    },
    correctIndex: 0,
    codeReference: 'ASME Section V Article 4 T-470 & ASME B31.3',
    explanation: {
      ar: 'كود ASME Section V يحدد خط التقييم (Evaluation Level) عادة عند 50% أو 100% DAC، ومستوى التسجيل (Recording Level) عند 20% DAC. العيوب التي تتعدى 100% DAC تُقاس أبعادها بدقة وتُقارن بمعيار القبول في كود التصنيع.',
      en: 'ASME Sec V sets evaluation levels referenced to the DAC curve (typically 100% DAC). Indications above reference level require geometric investigation and length sizing.'
    },
    keyTakeaway: {
      ar: 'منحنى DAC يعوض التوهين الطبيعي للموجات الصوتية مع زيادة المسار الصوتي داخل المعدن.',
      en: 'The DAC curve compensates for sound beam attenuation and spread as path length increases.'
    }
  },
  {
    id: 'c_ndt_l3_1',
    disciplineId: 'conventional_ndt',
    levelId: 'level3',
    moduleId: 'mod_c_l3_1',
    disciplineTitleAr: 'الفحص غير الإتلافي التقليدي (Conventional NDT)',
    disciplineTitleEn: 'Conventional Non-Destructive Testing',
    levelNameAr: 'المستوى الثالث والاستشاري',
    levelNameEn: 'Level III Consultant & Authority',
    question: {
      ar: 'ما هي المسؤولية الحصرية لمهندس المستوى الثالث (ASNT Level III) وفقاً لوثيقة الممارسة المكتوبة (Written Practice) المعتمدة تحت SNT-TC-1A؟',
      en: 'What is the exclusive legal and professional mandate of an ASNT Level III certified personnel under SNT-TC-1A Written Practice?'
    },
    options: {
      ar: [
        'تأليف واعتماد إجراءات الفحص NDT Procedures، وتأهيل وتدريب كوادر المستوى الأول والثاني، والتحكيم في نتائج الفحص الخلافية',
        'تنظيف أسطح اللحام بفرشاة السلك وإعداد السقالات في الموقع',
        'تشغيل أجهزة التصوير بالأشعة دون الحاجة إلى ترخيص رقابة نووية',
        'توقيع محاضر الاستلام دون مراجعة معايير الكود المعتمدة'
      ],
      en: [
        'Authoring and approving NDT procedures, establishing the Written Practice, qualifying/examining Level I & II personnel, and arbitrating technical disputes',
        'Performing wire brushing of weld seams and erecting site scaffolding',
        'Operating industrial radiography cameras without nuclear regulatory licensing',
        'Signing handover reports without reviewing code technical requirements'
      ]
    },
    correctIndex: 0,
    codeReference: 'ASNT SNT-TC-1A Para 4.3 & ISO 9712 Clause 6.3',
    explanation: {
      ar: 'مهندس المستوى الثالث هو السلطة الفنية العليا المسؤولة عن الممارسة المكتوبة للشركة، وتطوير الإجراءات الهندسية (NDT Procedures)، وإجراء الاختبارات واعتماد شهادات المستوى الأول والثاني، وتفسير متطلبات الأكواد.',
      en: 'An ASNT Level III possesses the sole technical authority to establish Written Practices, author and approve technical procedures, and certify Level I & II personnel.'
    },
    keyTakeaway: {
      ar: 'المستوى الثالث لا يقتصر على تنفيذ الفحص بل يمتد للحوكمة وضمان مطابقة المنظومة للأكواد الدولية.',
      en: 'Level III responsibility focuses on technical governance, qualification integrity, and code compliance.'
    }
  },

  // =========================================================================
  // 2. ADVANCED NDT (الفحص المتقدم: PAUT, TOFD, Eddy Current)
  // =========================================================================
  {
    id: 'a_ndt_acad_1',
    disciplineId: 'ndt_advanced',
    levelId: 'academic',
    moduleId: 'mod_a_acad_1',
    disciplineTitleAr: 'الفحص غير الإتلافي المتقدم (Advanced NDT)',
    disciplineTitleEn: 'Advanced Non-Destructive Testing',
    levelNameAr: 'المرحلة الأكاديمية والجامعية',
    levelNameEn: 'Academic & University Stage',
    question: {
      ar: 'كيف يتحقق التوجيه الإلكتروني للشعاع (Electronic Beam Steering & Focusing) في مسبار الفحص بالموجات فوق الصوتية المصفوفة (Phased Array)؟',
      en: 'How is electronic beam steering and dynamic depth focusing physically achieved in Phased Array Ultrasonic Testing (PAUT)?'
    },
    options: {
      ar: [
        'بتطبيق تأخيرات زمنية بمقياس النانو ثانية (Nanosecond Focal Laws) على إثارة العناصر البيزوكهربائية المتعددة بشكل متسلسل',
        'بتحريك المسبار يدوياً بسرعة فائقة بزاوية 90 درجة',
        'بتسخين كريستالة المسبار إلى 200 درجة مئوية لتغيير اتجاه الصوت',
        'باستخدام مرآة عاكسة داخلية تدور بمحرك كهربائي'
      ],
      en: [
        'By applying calculated nanosecond time delays (focal laws) sequentially pulsing multi-element piezoelectric crystals',
        'By vibrating the transducer manually at high velocity at 90 degrees',
        'By heating the transducer crystal to 200°C to alter sound direction',
        'By utilizing an internal mechanical mirror rotating with an electric motor'
      ]
    },
    correctIndex: 0,
    codeReference: 'Wave Huygens Principle & ASME Section V Article 4 Mandatory App V',
    explanation: {
      ar: 'يعتمد PAUT على مبدأ هيجنز للتداخل البناء للموجات. من خلال برمجة قوانين البؤرة (Focal Laws) بتأخيرات نانوية محسوبة، تتداخل مقدمات الموجات الفرعية لتصنع جبهة موجية موجهة بزاوية محددة وبؤرة مركزة بدقة.',
      en: 'Huygens principle governs PAUT: precisely calculated nanosecond time delays applied to independent crystal elements create constructive interference wavefronts steered at desired angles.'
    },
    keyTakeaway: {
      ar: 'قوانين البؤرة (Focal Laws) تتيح فحص حجم اللحام كاملاً بزوايا قطاعية متعددة دون تحريك المسبار ذهاباً وإياباً.',
      en: 'Focal laws allow comprehensive volumetric coverage via S-Scans without physical rastering.'
    }
  },
  {
    id: 'a_ndt_l2_1',
    disciplineId: 'ndt_advanced',
    levelId: 'level2',
    moduleId: 'mod_a_l2_1',
    disciplineTitleAr: 'الفحص غير الإتلافي المتقدم (Advanced NDT)',
    disciplineTitleEn: 'Advanced Non-Destructive Testing',
    levelNameAr: 'المستوى الثاني التطبيقي والميداني',
    levelNameEn: 'Level II Certified Practitioner',
    question: {
      ar: 'في فحص TOFD (Time of Flight Diffraction)، ما هي الإشارتان المرجعيتان اللتان تحددان السطح العلوي والسفلي للقطعة وتظهران في صورة المسح العادي؟',
      en: 'In Time of Flight Diffraction (TOFD), what are the two fundamental reference signals bounding the component thickness on the A/D-scan display?'
    },
    options: {
      ar: [
        'الموجة الجانبية (Lateral Wave) وانعكاس الجدار الخلفي (Backwall Echo)',
        'صدى الشفة وصدى الجذر',
        'موجة شوكلي وموجة كولومب',
        'نبضة الليزر ونبضة الضوء'
      ],
      en: [
        'The sub-surface Lateral Wave and the Bottom Backwall Reflection',
        'Bevel echo and root face echo',
        'Shockley wave and Coulomb pulse',
        'Laser optical pulse and white light echo'
      ]
    },
    correctIndex: 0,
    codeReference: 'ISO 10863 / ASME Section V Article 4 Mandatory App III',
    explanation: {
      ar: 'الموجة الجانبية (Lateral Wave) تسير تحت السطح المباشر بأسرع زمن وصول، بينما صدى القاع (Backwall) ينعكس من الجدار الداخلي. أي تشتت أو حيود (Diffraction) بين هاتين الإشارتين يشير إلى قمة أو قاع شرخ داخلي بدقة مليمترية.',
      en: 'The Lateral Wave runs sub-surface, arriving first, while the Backwall Reflection bounds the inner surface. Tip diffraction signals situated between them reveal crack height.'
    },
    keyTakeaway: {
      ar: 'تقنية TOFD لا تعتمد على سعة الانعكاس بل على زمن طيران موجات الحيود، مما يجعلها الأدق عالمياً في قياس ارتفاع الشرخ.',
      en: 'TOFD relies on diffraction arrival times rather than echo amplitude, providing unmatched height sizing.'
    }
  },
  {
    id: 'a_ndt_l3_1',
    disciplineId: 'ndt_advanced',
    levelId: 'level3',
    moduleId: 'mod_a_l3_1',
    disciplineTitleAr: 'الفحص غير الإتلافي المتقدم (Advanced NDT)',
    disciplineTitleEn: 'Advanced Non-Destructive Testing',
    levelNameAr: 'المستوى الثالث والاستشاري',
    levelNameEn: 'Level III Consultant & Authority',
    question: {
      ar: 'عند اعتماد خطة التأهيل الفني لـ PAUT بدلاً من التصوير الإشعاعي (RT) وفقاً لـ ASME Section VIII Div 1 & 2 (Code Case 2235)، ما هو الشرط الإلزامي لجمع البيانات؟',
      en: 'When qualifying Phased Array UT to replace radiography under ASME Code Case 2235, what is the mandatory requirement regarding scan data acquisition?'
    },
    options: {
      ar: [
        'يجب استخدام مشفر موضعي رقمي (Calibrated Position Encoder) لتسجيل وحفظ كافة بيانات A-scan و S-scan الخام غير المعالجة لأرشفة المسح كاملاً',
        'يُكتفى بالمشاهدة المباشرة للشاشة وتدوين الملاحظات على ورقة',
        'يجب إجراء الفحص في الظلام الدامس فقط',
        'يجب دهان اللحام باللون الأخضر قبل الفحص'
      ],
      en: [
        'A calibrated optical/magnetic position encoder must be used to record raw unprocessed A-scan/S-scan data for permanent auditable archiving',
        'Manual unencoded scanning with hand-written logs is fully sufficient',
        'Inspection must be conducted exclusively in complete darkness',
        'Weld cap must be painted green prior to scanning'
      ]
    },
    correctIndex: 0,
    codeReference: 'ASME Section VIII Div 1 & 2 / Code Case 2235 / Section V App VIII',
    explanation: {
      ar: 'يشترط كود ASME في بدائل الأشعة أن يكون الفحص مشفراً ميكانيكياً (Encoded) مع تسجيل البيانات الخام بنسبة 100% بحيث يمكن إعادة تشغيل المسح وتدقيقه في أي وقت من قبل جهة التفتيش الخارجية.',
      en: 'Code Case 2235 mandates motorized or manual encoded scanning with full volume raw data recording to ensure permanent auditability matching radiographic films.'
    },
    keyTakeaway: {
      ar: 'التشفير الموضعي (Encoding) يحول الموجات فوق الصوتية إلى سجل دائم ومعتمد كالأفلام الإشعاعية.',
      en: 'Calibrated position encoding gives volumetric ultrasound the archival permanence of radiography.'
    }
  },

  // =========================================================================
  // 3. WELDING INSPECTION & METALLURGY (تفتيش اللحام وميتالورجيا الوصلات)
  // =========================================================================
  {
    id: 'weld_acad_1',
    disciplineId: 'welding_inspection',
    levelId: 'academic',
    moduleId: 'mod_w_acad_1',
    disciplineTitleAr: 'تفتيش اللحام وميتالورجيا الوصلات (Welding Inspection)',
    disciplineTitleEn: 'Welding Inspection & Metallurgy',
    levelNameAr: 'المرحلة الأكاديمية والجامعية',
    levelNameEn: 'Academic & University Stage',
    question: {
      ar: 'ما هي صيغة حساب الطاقة الحرارية المدخلة (Arc Heat Input) للحام القوسي وما تأثير زيادة الطاقة الحرارية على البنية المجهرية للمنطقة المتأثرة بالحرارة (HAZ)؟',
      en: 'What is the formula for welding Arc Heat Input, and what metallurgical effect does excessively high heat input have on the HAZ grain size?'
    },
    options: {
      ar: [
        'Heat Input = (V × I × 60 / S × 1000) × η، وتؤدي زيادتها إلى نمو الحبيبات البلورية (Grain Coarsening) مما يقلل المتانة الصدمية',
        'Heat Input = V + I + S، وتؤدي زيادتها إلى زيادة الصلادة بنسبة 500%',
        'Heat Input = V × S / I، وتؤدي زيادتها إلى تبخير الأكسجين من المعدن',
        'Heat Input = I² × R، وتمنع انصهار سلك اللحام تماماً'
      ],
      en: [
        'Heat Input = (V × I × 60 / S × 1000) × η (kJ/mm), causing grain coarsening in the HAZ and degrading Charpy impact toughness',
        'Heat Input = V + I + S, increasing hardness by 500%',
        'Heat Input = V × S / I, vaporizing all oxygen from the molten pool',
        'Heat Input = I² × R, preventing filler wire fusion'
      ]
    },
    correctIndex: 0,
    codeReference: 'Welding Metallurgy & EN 1011-1 / ASME Section IX',
    explanation: {
      ar: 'معادلة الطاقة الحرارية المدخلة هي ناتج الجهد × التيار × 60 مقسوماً على سرعة اللحام × 1000 ومضروباً في كفاءة القوس η. الزيادة المفرطة في الحرارة تبطئ معدل التبريد مما يسمح للحبيبات الأوستينيتية بالنمو المفرط في HAZ وتفقد الوصلة متانة الصدمات (Charpy V-Notch Toughness).',
      en: 'Heat input directly governs cooling rate (t8/5). Excessive heat input creates a very slow cooling cycle, promoting coarse ferrite and pearlite grains in the coarse-grained HAZ.'
    },
    keyTakeaway: {
      ar: 'التحكم في Heat Input يضمن التوازن الدقيق بين منع التصلب المفرط (Hardness) وتفادي خشونة الحبيبات.',
      en: 'Controlling heat input prevents both brittle martensite formation and grain coarsening toughness loss.'
    }
  },
  {
    id: 'weld_l2_1',
    disciplineId: 'welding_inspection',
    levelId: 'level2',
    moduleId: 'mod_w_l2_1',
    disciplineTitleAr: 'تفتيش اللحام وميتالورجيا الوصلات (Welding Inspection)',
    disciplineTitleEn: 'Welding Inspection & Metallurgy',
    levelNameAr: 'المستوى الثاني التطبيقي والميداني',
    levelNameEn: 'Level II Certified Practitioner',
    question: {
      ar: 'وفقاً لكود AWS D1.1 و ASME B31.3 للخدمات العادية، ما هو الحد الأقصى المسموح به لعمق النحر (Undercut) على سطح لحام الأنابيب الإنشائية؟',
      en: 'According to AWS D1.1 and ASME B31.3 Normal Fluid Service, what is the standard acceptance threshold for weld undercut depth?'
    },
    options: {
      ar: [
        'لا يتجاوز 1 mm (أو 1/32 بوصة)، ولا يزيد عن 10% من سماكة الجدار لأطوال قصيرة محددة',
        'مسموح حتى 5 mm طالما كان اللحام مغطى بالدهان',
        'مرفوض تماماً حتى لو كان عمقه 0.01 mm',
        'مسموح بأي عمق بشرط ألا يتجاوز طول النحر 2 متر'
      ],
      en: [
        'Not exceeding 1 mm (1/32 in), or 10% of nominal wall thickness for qualified cumulative lengths',
        'Permitted up to 5 mm if coated with primer',
        'Strictly zero tolerance down to 0.01 mm depth',
        'Any depth is permissible if total cumulative length is under 2 meters'
      ]
    },
    correctIndex: 0,
    codeReference: 'AWS D1.1 Table 6.1 / ASME B31.3 Table 341.3.2',
    explanation: {
      ar: 'كود AWS D1.1 و ASME B31.3 يضعان حداً صارماً للنحر عند 1 mm (أو 1/32") للأنابيب الإنشائية لكونه يشكل حزاً مركزاً للإجهادات (Stress Raiser) قد ينشأ منه شرخ إجهادي تحت الأحمال الديناميكية.',
      en: 'Codes limit undercut to ≤ 1 mm (1/32 in) because sharp undercut transitions act as severe notch stress risers prone to fatigue initiation.'
    },
    keyTakeaway: {
      ar: 'استخدام مقياس كامبريدج (Cambridge Gauge) الميداني يضمن قياس عمق النحر بدقة مليمترية قبل الاعتماد.',
      en: 'Digital Cambridge and undercut gauges ensure precise verification of notch depth in the field.'
    }
  },
  {
    id: 'weld_l3_1',
    disciplineId: 'welding_inspection',
    levelId: 'level3',
    moduleId: 'mod_w_l3_1',
    disciplineTitleAr: 'تفتيش اللحام وميتالورجيا الوصلات (Welding Inspection)',
    disciplineTitleEn: 'Welding Inspection & Metallurgy',
    levelNameAr: 'المستوى الثالث والاستشاري',
    levelNameEn: 'Level III Consultant & Authority',
    question: {
      ar: 'في كود ASME Section IX، ما هو الفرق الجوهري بين المتغير الأساسي (Essential Variable) والمتغير غير الأساسي (Nonessential Variable) في مواصفة إجراء اللحام WPS؟',
      en: 'Under ASME Section IX, what is the critical regulatory distinction between an Essential Variable and a Nonessential Variable on a Welding Procedure Specification (WPS)?'
    },
    options: {
      ar: [
        'تغيير المتغير الأساسي يؤثر على الخواص الميكانيكية للوصلة ويتطلب إعادة تأهيل وإعداد سجل اختبار PQR جديد، بينما المتغير غير الأساسي يمكن تعديله على الـ WPS دون اختبار جديد',
        'المتغير الأساسي يخص لون ماكينة اللحام فقط',
        'المتغيرات الأساسية تخص عمال اللحام، بينما غير الأساسية تخص المفتشين',
        'لا يوجد فرق في كود ASME Section IX'
      ],
      en: [
        'A change in an Essential Variable alters mechanical properties, legally requiring re-qualification and a new PQR, whereas Nonessential Variables can be revised on the WPS without re-testing',
        'Essential variables only govern equipment brand and chassis color',
        'Essential variables apply to welders, nonessential to inspectors',
        'There is no technical difference under ASME Sec IX'
      ]
    },
    correctIndex: 0,
    codeReference: 'ASME Section IX QW-200.1 & QW-250',
    explanation: {
      ar: 'المتغير الأساسي (مثل نوع المعدن الأساسي P-Number، ومعدن الحشو F-Number، والتسخين المسبق، والمعالجة الحرارية PWHT) يغير الخواص الميكانيكية، لذا يُلزم الكود بإجراء اختبار شد وثني جديد في سجل PQR عند تغييره.',
      en: 'Essential variables are conditions affecting the mechanical properties of the welded joint. Any alteration beyond qualified ranges legally invalidates the procedure unless re-qualified by PQR tests.'
    },
    keyTakeaway: {
      ar: 'إعادة التأهيل بـ PQR إلزامي عند تجاوز حدود المتغيرات الأساسية لضمان سلامة الخطوط والأوعية تحت الضغط.',
      en: 'PQR qualification establishes legal evidence of weld strength and ductility within essential limits.'
    }
  },

  // =========================================================================
  // 4. PWHT & METALLURGICAL THERMAL PROCESSING (المعالجة الحرارية بعد اللحام)
  // =========================================================================
  {
    id: 'pwht_acad_1',
    disciplineId: 'pwht_metallurgy',
    levelId: 'academic',
    moduleId: 'mod_p_acad_1',
    disciplineTitleAr: 'المعالجة الحرارية بعد اللحام وميتالورجيا الإجهادات (PWHT & Metallurgy)',
    disciplineTitleEn: 'Post Weld Heat Treatment & Metallurgy',
    levelNameAr: 'المرحلة الأكاديمية والجامعية',
    levelNameEn: 'Academic & University Stage',
    question: {
      ar: 'ما هو الميكانيزم الفيزيائي المجهري المسؤول عن تخفيف الإجهادات المتبقية أثناء المعالجة الحرارية في منطقة درجات الحرارة العالية (590°C - 650°C)؟',
      en: 'What is the microscopic physical mechanism primarily responsible for macroscopic residual stress relief during thermal soaking at 590°C - 650°C?'
    },
    options: {
      ar: [
        'انخفاض نقطة خضوع الفولاذ عند الحرارة وظاهرة الزحف الحراري وتسلق الانخلاعات الذرية (Dislocation Climb & Creep)',
        'تحول الفولاذ الكربوني إلى سائل لزج داخل الماسورة',
        'تبخر الكربون من شبكة الحديد ومغادرته المعدن',
        'انكماش حجم المعدن بنسبة 40%'
      ],
      en: [
        'Drastic reduction of steel yield strength at elevated temperature coupled with thermal creep and dislocation climb',
        'Transition of carbon steel into liquid slag inside the pipe',
        'Complete evaporation of carbon atoms from the iron lattice',
        'Volumetric shrinkage of the alloy by 40%'
      ]
    },
    correctIndex: 0,
    codeReference: 'Thermal Creep Kinetics & WRC Bulletin 452',
    explanation: {
      ar: 'عند تسخين الفولاذ إلى ما فوق 550°C، تنخفض مقاومة الخضوع للمعدن بدرجة كبيرة، وتتسارع حركة الانخلاعات الذرية (Dislocation Climb) بفعل الطاقة الحرارية، مما يتيح للإجهادات الميكانيكية المحبوسة الاسترخاء عبر التشوه اللدن المجهري بالزحف (Thermal Creep).',
      en: 'At soaking temperatures, yield strength plummets while thermal activation facilitates atomic vacancy migration and dislocation climb, converting high elastic stress into negligible plastic creep strain.'
    },
    keyTakeaway: {
      ar: 'المعالجة الحرارية تحول الإجهادات المرنة الشديدة إلى تشوه زحف مجهري آمن يخفف التوتر السطحي.',
      en: 'PWHT converts destructive elastic residual stresses into benign microscopic creep relaxation.'
    }
  },
  {
    id: 'pwht_l2_1',
    disciplineId: 'pwht_metallurgy',
    levelId: 'level2',
    moduleId: 'mod_p_l2_1',
    disciplineTitleAr: 'المعالجة الحرارية بعد اللحام وميتالورجيا الإجهادات (PWHT & Metallurgy)',
    disciplineTitleEn: 'Post Weld Heat Treatment & Metallurgy',
    levelNameAr: 'المستوى الثاني التطبيقي والميداني',
    levelNameEn: 'Level II Certified Practitioner',
    question: {
      ar: 'وفقاً لكود ASME B31.3 Table 331.1.1، ما هي حرارة النقع الموصى بها وزمن النقع الأدنى لمواسير الفولاذ الكربوني P-No. 1 بسماكة جدار 50 mm؟',
      en: 'According to ASME B31.3 Table 331.1.1, what is the mandatory soaking temperature and minimum hold duration for P-No. 1 carbon steel piping with a 50 mm wall thickness?'
    },
    options: {
      ar: [
        'درجة حرارة 593°C إلى 649°C، وزمن نقع ساعتان (1 ساعة لكل 25 mm)',
        'درجة حرارة 300°C وزمن نقع 10 دقائق',
        'درجة حرارة 1100°C وزمن نقع 24 ساعة',
        'درجة حرارة 450°C وزمن نقع 30 دقيقة'
      ],
      en: [
        '593°C to 649°C (1100°F - 1200°F), with a hold duration of 2 hours (1 hr per 25 mm)',
        '300°C for 10 minutes',
        '1100°C for 24 hours',
        '450°C for 30 minutes'
      ]
    },
    correctIndex: 0,
    codeReference: 'ASME B31.3 Table 331.1.1 / AWS D10.10',
    explanation: {
      ar: 'كود ASME B31.3 يحدد لسبائك P-1 مدى حراري بين 593°C و 649°C، بمعدل زمن نقع ساعة واحدة لكل 25 mm من السماكة (1 hr / 25 mm) بحد أدنى ساعة، وبالتالي فإن سماكة 50 mm تتطلب ساعتين كاملتين.',
      en: 'ASME B31.3 specifies 593°C - 649°C for P1 materials, requiring 1 hour per 25 mm (1 inch) of thickness, establishing a 2-hour minimum soak for 50 mm piping.'
    },
    keyTakeaway: {
      ar: 'قاعدة الساعة لكل بوصة تضمن وصول التوزيع الحراري المتجانس لكامل عمق جدار الأنبوب السميك.',
      en: 'The 1 hr / inch rule ensures thorough cross-sectional thermal saturation throughout heavy wall pipe.'
    }
  },
  {
    id: 'pwht_l3_1',
    disciplineId: 'pwht_metallurgy',
    levelId: 'level3',
    moduleId: 'mod_p_l3_1',
    disciplineTitleAr: 'المعالجة الحرارية بعد اللحام وميتالورجيا الإجهادات (PWHT & Metallurgy)',
    disciplineTitleEn: 'Post Weld Heat Treatment & Metallurgy',
    levelNameAr: 'المستوى الثالث والاستشاري',
    levelNameEn: 'Level III Consultant & Authority',
    question: {
      ar: 'عند معالجة صلب P91 (9Cr-1Mo-V) حرارياً، لماذا يعتبر تجاوز درجة الحرارة الحرجة الدنيا (Lower Critical Temp Ac1 ≈ 790°C) خطأً هندسياً كارثياً؟',
      en: 'During PWHT of Grade 91 (9Cr-1Mo-V) creep-strength enhanced ferritic steel, why is exceeding the lower critical transformation temperature (Ac1 ≈ 790°C) metallurgically catastrophic?'
    },
    options: {
      ar: [
        'لأنه يؤدي إلى إعادة تكوين الأوستينيت جزئياً والذي يتحول عند التبريد إلى مارتينسيت جديد هش غير مهدأ (Untempered Martensite) وانهيار مقاومة الزحف في درجات الحرارة العالية',
        'لأنه يجعل الأنبوب يصدأ فوراً تحت المطر',
        'لأنه يغير وزن الأنبوب الإجمالي',
        'لأنه يحرق المزدوجات الحرارية فقط دون التأثير على المعدن'
      ],
      en: [
        'It causes partial re-austenitization, transforming on cooling into brittle untempered martensite and permanently destroying high-temperature creep strength',
        'It causes immediate surface rust under ambient humidity',
        'It changes the gross gravitational weight of the piping spool',
        'It destroys thermocouple wires without metallurgical consequences'
      ]
    },
    correctIndex: 0,
    codeReference: 'ASME Section I PW-39 / API TR 938-B / EPRI P91 Guidelines',
    explanation: {
      ar: 'سبائك P91 تتطلب نطاقاً ضيقاً للغاية (750°C - 775°C). إذا تجاوزت الحرارة Ac1، يتحول الهيكل جزئياً لأوستينيت ثم إلى مارتينسيت هش فائق الصلابة غير مهدأ بعد التبريد، مما يتسبب في شروخ الزحف من النوع الرابع (Type IV Cracking) وانفجار أنابيب البخار.',
      en: 'Exceeding Ac1 in P91 initiates partial transformation to austenite, which on cooling forms brittle fresh martensite devoid of fine MX precipitate dispersion, drastically curtailing creep rupture life.'
    },
    keyTakeaway: {
      ar: 'في سبائك P91 الفائقة، التحكم في نافذة الحرارة الدقيقة يحمي من انهيار منظومة البخار الحرج.',
      en: 'Tight thermal window management in CSEF steels safeguards high-pressure steam power boilers.'
    }
  },

  // =========================================================================
  // 5. API IN-SERVICE PLANT INSPECTION (تفتيش المنشآت البترولية)
  // =========================================================================
  {
    id: 'api_acad_1',
    disciplineId: 'api_inspection',
    levelId: 'academic',
    moduleId: 'mod_api_acad_1',
    disciplineTitleAr: 'تفتيش المنشآت والمعدات البترولية (API Plant Inspection)',
    disciplineTitleEn: 'API In-Service Plant Inspection',
    levelNameAr: 'المرحلة الأكاديمية والجامعية',
    levelNameEn: 'Academic & University Stage',
    question: {
      ar: 'في ميكانيكا أوعية الضغط الأسطوانية الرقيقة (Thin Shells)، لماذا يكون إجهاد الشد الحلقي (Hoop Stress) ضعف الإجهاد الطولي المحوري (Longitudinal Stress)؟',
      en: 'In thin-walled cylindrical pressure vessel membrane mechanics, why is the circumferential (hoop) stress exactly double the longitudinal stress?'
    },
    options: {
      ar: [
        'لأن اتزان القوى في المقطع الطولي يعطي σ_hoop = (P × r) / t، بينما اتزان القوى على نهايات الوعاء الدائرية يعطي σ_long = (P × r) / (2 × t)',
        'لأن ضغط الغاز يكون أثقل في الجوانب من القمم',
        'لأن لحامات الأسطوانة تكون أضعف طولياً',
        'لأن صمامات الأمان تفرغ الضغط في اتجاه واحد فقط'
      ],
      en: [
        'Because force equilibrium across a longitudinal plane yields σ_hoop = P·r/t, whereas axial end-cap equilibrium yields σ_long = P·r/(2t)',
        'Because internal gas pressure exerts double mass sideways',
        'Because longitudinal weld seams are inherently half as strong',
        'Because safety relief valves vent pressure unidirectionally'
      ]
    },
    correctIndex: 0,
    codeReference: 'ASME Section VIII Div 1 UG-27 / Membrane Mechanics',
    explanation: {
      ar: 'بموجب معادلات الاتزان الاستاتيكي: مساحة المقاومة الطولية لضغط المائع هي ضعف مساحة المقاومة للضغط النهائي، ومن هنا فإن إجهاد الطوق الحلقي يكون ضعف الإجهاد المحوري، ولهذا تكون لحامات الأسطوانة الطولية أكثر حرجاً من اللحامات المحيطية.',
      en: 'Force equilibrium demonstrates that longitudinal seam cross-sections support twice the projected pressure load of circumferential sections, making hoop stress σ_h = 2 × σ_l.'
    },
    keyTakeaway: {
      ar: 'اللحامات الطولية في الأوعية والأنابيب تتعرض لضعف الإجهاد الميكانيكي، مما يجعل تفتيشها الأكثر أولوية.',
      en: 'Longitudinal vessel seams experience twice the stress of circumferential girth welds.'
    }
  },
  {
    id: 'api_l2_1',
    disciplineId: 'api_inspection',
    levelId: 'level2',
    moduleId: 'mod_api_l2_1',
    disciplineTitleAr: 'تفتيش المنشآت والمعدات البترولية (API Plant Inspection)',
    disciplineTitleEn: 'API In-Service Plant Inspection',
    levelNameAr: 'المستوى الثاني التطبيقي والميداني',
    levelNameEn: 'Level II Certified Practitioner',
    question: {
      ar: 'وفقاً لـ API 510 و API 570، إذا كانت السماكة الفعلية لوعاء ضغط 12 mm، والسماكة الدنيا المطلوبة بالكود (t_min) هي 8 mm، ومعدل التآكل السنوي المقاس هو 0.4 mm/year، فما هو العمر المتبقي (Remaining Life) وموعد الفحص القادم؟',
      en: 'Under API 510/570, if actual vessel thickness is 12 mm, design minimum t_min is 8 mm, and annual corrosion rate is 0.4 mm/year, what is the remaining life and maximum internal inspection interval?'
    },
    options: {
      ar: [
        'العمر المتبقي 10 سنوات، وأقصى موعد للفحص الداخلي القادم هو 5 سنوات (نصف العمر المتبقي بحد أقصى 10 سنوات)',
        'العمر المتبقي 4 سنوات، وموعد الفحص القادم بعد أسبوعين',
        'العمر المتبقي 20 سنة، والفحص القادم بعد 20 سنة',
        'الوعاء تالف ويجب إخراجه من الخدمة فوراً'
      ],
      en: [
        'Remaining life is 10 years; maximum next internal inspection interval is 5 years (half remaining life, not exceeding 10 years)',
        'Remaining life is 4 years; next inspection in 2 weeks',
        'Remaining life is 20 years; next inspection in 20 years',
        'Vessel is condemned and must be retired immediately'
      ]
    },
    correctIndex: 0,
    codeReference: 'API 510 Section 7.1.1 & Section 6.5.1',
    explanation: {
      ar: 'معادلة العمر المتبقي: Remaining Life = (t_actual - t_min) / Corrosion Rate = (12 - 8) / 0.4 = 10 سنوات. وكود API 510 يشترط ألا تتجاوز الفترة بين الفحوصات الداخلية نصف العمر المتبقي أو 10 سنوات أيهما أقل (10 / 2 = 5 سنوات).',
      en: 'Remaining Life = (t_actual - t_min) / CR = (12 - 8)/0.4 = 10 years. API 510 stipulates that next inspection interval shall not exceed half remaining life or 10 years, whichever is less (5 years).'
    },
    keyTakeaway: {
      ar: 'قاعدة نصف العمر المتبقي تحمي المنشآت من الوصول الحرج لسمك الانهيار قبل موعد الفحص الدوري.',
      en: 'The half-life rule ensures plants are re-inspected well before reaching minimum required thickness.'
    }
  },
  {
    id: 'api_l3_1',
    disciplineId: 'api_inspection',
    levelId: 'level3',
    moduleId: 'mod_api_l3_1',
    disciplineTitleAr: 'تفتيش المنشآت والمعدات البترولية (API Plant Inspection)',
    disciplineTitleEn: 'API In-Service Plant Inspection',
    levelNameAr: 'المستوى الثالث والاستشاري',
    levelNameEn: 'Level III Consultant & Authority',
    question: {
      ar: 'في تقييمات الصلاحية للخدمة (Fitness-For-Service) وفق كود API 579-1 / ASME FFS-1، متى يُسمح لمستشار الفحص باعتماد تقييم المستوى الثالث (Level 3 Assessment) لشرخ مكتشف؟',
      en: 'In Fitness-For-Service assessments per API 579-1 / ASME FFS-1, what distinguishes a Level 3 assessment of crack-like flaws from Levels 1 and 2?'
    },
    options: {
      ar: [
        'يتضمن نمذجة العناصر المحدودة ثلاثية الأبعاد (3D Finite Element Analysis)، وتطبيق ميكانيكا الكسر المرنة اللدنة (EPFM) وحساب منحنى انهيار الكسر (Failure Assessment Diagram - FAD)',
        'يعتمد على فحص المظهر الخارجي بالعين المجردة فقط',
        'يتم بدون الرجوع لضغوط ودرجات حرارة التشغيل',
        'يسمح بتجاهل الشروخ بشرط تشغيل المصنع بنصف طاقته'
      ],
      en: [
        'It utilizes rigorous 3D Finite Element elastic-plastic fracture mechanics, computing J-integrals and plotting on the Failure Assessment Diagram (FAD)',
        'It relies exclusively on subjective visual examination',
        'It is performed without factoring operating pressures or thermal transients',
        'It ignores cracks if plant production is reduced to 50%'
      ]
    },
    correctIndex: 0,
    codeReference: 'API 579-1 / ASME FFS-1 Part 9 (Crack-Like Flaws)',
    explanation: {
      ar: 'تقييم المستوى الثالث هو الأكثر تقدماً، ويستخدم تحليل الإجهادات بالعناصر المحدودة ثلاثية الأبعاد (FEA) لحساب معامل شدة الإجهاد K_I والحمل الحرج للبنية (Plastic Collapse Load) وإسقاط النتيجة على مخطط FAD لإثبات الأمان ضد الانهيار الكارثي.',
      en: 'Level 3 FFS represents the definitive technical assessment, employing FEA and elastic-plastic fracture mechanics (J-Integral/CTOD) plotted on the Failure Assessment Diagram (FAD).'
    },
    keyTakeaway: {
      ar: 'تقييمات FFS تمكن المصافي من تشغيل المعدات بأمان وتجنب الإيقاف الطارئ باهظ التكاليف.',
      en: 'API 579 FFS prevents unnecessary shutdowns by engineering safe operating envelopes.'
    }
  },

  // =========================================================================
  // 6. COATING & CORROSION CONTROL (الدهانات ومكافحة التآكل الصناعي)
  // =========================================================================
  {
    id: 'coat_acad_1',
    disciplineId: 'coating_corrosion',
    levelId: 'academic',
    moduleId: 'mod_coat_acad_1',
    disciplineTitleAr: 'الدهانات ومكافحة التآكل الصناعي (Coating & Corrosion)',
    disciplineTitleEn: 'Industrial Coating & Corrosion Engineering',
    levelNameAr: 'المرحلة الأكاديمية والجامعية',
    levelNameEn: 'Academic & University Stage',
    question: {
      ar: 'ما هي الشروط الأربعة الإلزامية في خلية التآكل الكهروكيميائية (Electrochemical Corrosion Cell)، وكيف يمنع نظام الطلاء حدوث التآكل؟',
      en: 'What are the four indispensable elements of an electrochemical corrosion cell, and how does a barrier coating prevent degradation?'
    },
    options: {
      ar: [
        'الأنود (Anode)، الكاثود (Cathode)، الإلكتروليت الموصل (Electrolyte)، والمسار المعدني (Metallic Path)؛ ويعمل الطلاء كحاجز عازل يعزل الإلكتروليت والأكسجين عن المعدن',
        'الحرارة، والضغط، والرياح، والغبار فقط',
        'الكهرباء العالية، والمغناطيس، والحديد، والصدأ',
        'الماء العذب فقط دون أي شرط آخر'
      ],
      en: [
        'Anode, Cathode, Electrolyte, and Metallic Return Path; barrier coatings isolate the substrate from electrolyte and dissolved oxygen',
        'Heat, pressure, wind velocity, and ambient dust only',
        'High voltage, magnet, iron, and rust deposits',
        'Fresh water immersion without electrical conductivity'
      ]
    },
    correctIndex: 0,
    codeReference: 'NACE / AMPP Corrosion Basics & Fontana Corrosion Engineering',
    explanation: {
      ar: 'لكي يحدث التآكل لا بد من توافر 4 عناصر: قطب أنود متآكل، وقطب كاثود مستقبل للإلكترونات، وإلكتروليت رطب ناقل للأيونات، ومسار توصيل معدني. الطلاء العازل (Barrier Coating) يكسر الخلية بعزل الرطوبة والأيونات عن السطح.',
      en: 'Eliminating any of the 4 cell components stops corrosion. High-performance epoxy and polyurethane coatings interrupt the electrolyte pathway at the steel interface.'
    },
    keyTakeaway: {
      ar: 'كسر الاتصال بين السطح المعدني والإلكتروليت يوقف التفاعل الكهروكيميائي تماماً.',
      en: 'Interrupting the electrolyte-substrate interface terminates electrochemical oxidation.'
    }
  },
  {
    id: 'coat_l2_1',
    disciplineId: 'coating_corrosion',
    levelId: 'level2',
    moduleId: 'mod_coat_l2_1',
    disciplineTitleAr: 'الدهانات ومكافحة التآكل الصناعي (Coating & Corrosion)',
    disciplineTitleEn: 'Industrial Coating & Corrosion Engineering',
    levelNameAr: 'المستوى الثاني التطبيقي والميداني',
    levelNameEn: 'Level II Certified Practitioner',
    question: {
      ar: 'وفقاً لمواصفات SSPC و ISO 8502-4، ما هو الشرط المناخي الإلزامي المسبق قبل البدء في تطبيق دهان الهياكل الفولاذية؟',
      en: 'According to SSPC guidelines and ISO 8502-4, what is the mandatory climatic rule regarding steel substrate temperature and ambient dew point before coating application?'
    },
    options: {
      ar: [
        'يجب أن تكون درجة حرارة سطح الفولاذ أعلى من نقطة الندى (Dew Point) بـ 3°C على الأقل (T_steel ≥ T_dew + 3°C)',
        'يجب أن تكون درجة حرارة الفولاذ مطابقة تماماً لنقطة الندى',
        'يجب تطبيق الدهان أثناء هطول الأمطار لضمان الترطيب',
        'لا توجد شروط مناخية طالما الدهان سريع الجفاف'
      ],
      en: [
        'Steel surface temperature must be at least 3°C (5°F) above the ambient dew point (T_steel ≥ T_dew + 3°C)',
        'Steel substrate temperature must match dew point exactly',
        'Coatings must be applied during rainfall to facilitate cure',
        'No climatic restrictions apply if fast-drying primer is utilized'
      ]
    },
    correctIndex: 0,
    codeReference: 'ISO 8502-4 / SSPC-PA 1 & SSPC-PA 2',
    explanation: {
      ar: 'شرط الـ +3°C الإلزامي يمنع تكثف طبقة ميكروسكوبية غير مرئية من بخار الماء على السطح الفولاذي، والتي إذا حُبست تحت طبقة الدهان تسبب فقاعات الرطوبة (Osmotic Blistering) وفشل الالتصاق.',
      en: 'The mandatory +3°C safety buffer prevents imperceptible moisture condensation on the blast-cleaned steel, which causes osmotic blistering and adhesive delamination.'
    },
    keyTakeaway: {
      ar: 'قاعدة الـ 3°C تضمن بيئة تطبيق جافة كيميائياً تمنع التقشر وتضمن عمر الحماية التصميمي.',
      en: 'The +3°C rule eliminates micro-condensation, guaranteeing expected coating design life.'
    }
  },

  // =========================================================================
  // 7. QA/QC & INSPECTION MANAGEMENT (إدارة وتوكيد الجودة)
  // =========================================================================
  {
    id: 'qa_acad_1',
    disciplineId: 'qaqc_management',
    levelId: 'academic',
    moduleId: 'mod_qa_acad_1',
    disciplineTitleAr: 'إدارة وتوكيد وضبط الجودة (QA/QC Management)',
    disciplineTitleEn: 'Quality Assurance & Quality Control Management',
    levelNameAr: 'المرحلة الأكاديمية والجامعية',
    levelNameEn: 'Academic & University Stage',
    question: {
      ar: 'ما هو الفرق الجوهري الأكاديمي بين توكيد الجودة (Quality Assurance - QA) وضبط الجودة (Quality Control - QC) في المشاريع الهندسية؟',
      en: 'What is the fundamental engineering and managerial distinction between Quality Assurance (QA) and Quality Control (QC)?'
    },
    options: {
      ar: [
        'توكيد الجودة (QA) يركز على منع حدوث الأخطاء من خلال الإجراءات والخطط والأنظمة (Proactive / Process-oriented)، بينما ضبط الجودة (QC) يركز على كشف العيوب في المنتج النهائي عبر الفحص والاختبار (Reactive / Product-oriented)',
        'QA يخص المشتريات فقط، و QC يخص الحسابات',
        'لا يوجد فرق بين المصطلحين ويستخدمان لنفس المعنى تماماً',
        'QC مسؤول عن إدارة الشركة و QA مسؤول عن تنظيف الموقع'
      ],
      en: [
        'Quality Assurance (QA) is proactive and process-oriented, focusing on preventing nonconformances via procedures and systems, whereas Quality Control (QC) is reactive and product-oriented, inspecting and verifying physical output',
        'QA governs purchasing, QC manages accounting',
        'The two terms are technically identical and interchangeable',
        'QC governs corporate leadership, QA manages site cleanliness'
      ]
    },
    correctIndex: 0,
    codeReference: 'ISO 9000:2015 Clause 3.3 / ASQ Body of Knowledge',
    explanation: {
      ar: 'توكيد الجودة (QA) يضمن أن العمليات مصممة بشكل يمنع الخطأ (مثل تدقيق خطة ITP والتأكد من معايرة الأجهزة)، بينما ضبط الجودة (QC) هو الفحص الفعلي للقطعة (مثل قياس الأبعاد أو فحص اللحام بالأشعة) لرفض أو قبول المنتج.',
      en: 'QA provides confidence that quality requirements will be fulfilled through proactive systemic controls, whereas QC comprises the operational techniques and physical inspections verifying actual compliance.'
    },
    keyTakeaway: {
      ar: 'توكيد الجودة يصنع المنظومة المانعة للخلل، بينما ضبط الجودة يراقب المنتج على خط التنفيذ.',
      en: 'QA builds the preventive ecosystem, while QC validates the finished product.'
    }
  },
  {
    id: 'qa_l2_1',
    disciplineId: 'qaqc_management',
    levelId: 'level2',
    moduleId: 'mod_qa_l2_1',
    disciplineTitleAr: 'إدارة وتوكيد وضبط الجودة (QA/QC Management)',
    disciplineTitleEn: 'Quality Assurance & Quality Control Management',
    levelNameAr: 'المستوى الثاني التطبيقي والميداني',
    levelNameEn: 'Level II Certified Practitioner',
    question: {
      ar: 'في خطة الفحص والاختبار (Inspection & Test Plan - ITP)، ما هو التوصيف المعتمد لنقطة الإيقاف (Hold Point - H) مقارنة بنقطة المشاهدة (Witness Point - W)؟',
      en: 'On an approved Inspection & Test Plan (ITP), what is the contractual definition of a Hold Point (H) compared to a Witness Point (W)?'
    },
    options: {
      ar: [
        'نقطة الإيقاف (H) تلزم المقاول بوقف العمل تماماً ولا يجوز الاستمرار للمرحلة التالية إلا بعد حضور وتوقيع ممثل العميل/الاستشاري، بينما نقطة المشاهدة (W) تسمح بالاستمرار إذا تم إخطار العميل رسمياً ولم يحضر في الموعد المحدد',
        'نقطة الإيقاف تعني إيقاف عمال الموقع عن العمل نهائياً وفسخ العقد',
        'نقطة المشاهدة تلزم بتصوير فيديو مباشر فقط دون فحص',
        'كلا النقطتين تسمحان بالاستمرار دون إشعار العميل'
      ],
      en: [
        'A Hold Point (H) legally forbids proceeding to the subsequent manufacturing step without inspection and formal sign-off by client/inspector, whereas a Witness Point (W) allows progression if timely notice was given and the inspector failed to attend',
        'A Hold Point mandates immediate contract termination',
        'A Witness Point requires streaming live video without inspection',
        'Both points allow proceeding without formal notification'
      ]
    },
    correctIndex: 0,
    codeReference: 'ISO 10005 / ASME Quality Control Systems',
    explanation: {
      ar: 'نقطة الإيقاف (Hold Point) حاسمة، مثل فحص الفراغ الهيدروستاتيكي Hydrotest أو غلق فتحات التفتيش؛ الاستمرار دون توقيع العميل يعد مخالفة كبرى (Major NCR). أما Witness فيكفي إخطار الطرف الآخر بوقت كافٍ (مثلاً 24 ساعة).',
      en: 'Hold Points are non-negotiable milestones (e.g. pressure test). Production cannot resume until the inspector inspects and signs the document. Witness points allow documented proceeding if the notified party declines attendance.'
    },
    keyTakeaway: {
      ar: 'احترام نقاط الإيقاف يحمي المشاريع من إعادة فك اللحامات أو إلغاء شهادات المطابقة.',
      en: 'Strict Hold Point compliance prevents costly un-building and regulatory rejection.'
    }
  },

  // =========================================================================
  // 8. ASSET INTEGRITY & ROPE ACCESS (سلامة الأصول والفحص بالحبال IRATA)
  // =========================================================================
  {
    id: 'rope_acad_1',
    disciplineId: 'asset_integrity_rope',
    levelId: 'academic',
    moduleId: 'mod_rope_acad_1',
    disciplineTitleAr: 'سلامة الأصول والفحص بالحبال (Asset Integrity & Rope Access)',
    disciplineTitleEn: 'Asset Integrity & IRATA Rope Access',
    levelNameAr: 'المرحلة الأكاديمية والجامعية',
    levelNameEn: 'Academic & University Stage',
    question: {
      ar: 'عند توزيع حبلين على نقطتي تثبيت بزاوية انفراج داخلية (Y-Hang Angle) تساوي 120 درجة، ما هي النسبة المئوية لوزن الفني المعلق التي تتحملها كل نقطة تثبيت؟',
      en: 'In high-angle rigging statics, when a suspended technician is rigged to two anchor points forming a Y-hang included angle of 120°, what percentage of the load is borne by EACH individual anchor?'
    },
    options: {
      ar: [
        '100% من وزن الفني على كل نقطة تثبيت (تتضاعف القوة الإجمالية)',
        '50% من وزن الفني على كل نقطة تثبيت',
        '25% من وزن الفني على كل نقطة تثبيت',
        '0% لأن الحبال تمتص الجاذبية'
      ],
      en: [
        '100% of the technician weight on each individual anchor point (load doubles across the system)',
        '50% of the technician weight on each anchor point',
        '25% of the technician weight on each anchor point',
        '0% because synthetic fiber absorbs gravitational load'
      ]
    },
    correctIndex: 0,
    codeReference: 'IRATA International Code of Practice (ICOP) Part 2 / Vector Statics',
    explanation: {
      ar: 'وفقاً لحساب المثلثات ومتجهات القوى: Force = (Weight / 2) / cos(θ/2). فعند زاوية 120°، cos(60°) = 0.5، وبالتالي Force = Weight / (2 × 0.5) = Weight (100%). كلما زادت زاوية التثبيت عن 90°، تضاعف الحمل بشكل خطير على النقاط، ولذلك توصي IRATA بألا تزيد الزاوية عن 90° ويفضل أقل من 60°.',
      en: 'Vector resolution shows that at 120°, the tension in each leg equals 100% of the suspended load. Angles wider than 90° exponentially amplify anchor loads, violating IRATA safety rigging principles.'
    },
    keyTakeaway: {
      ar: 'إبقاء زاوية التثبيت Y-Hang ضيقة (أقل من 60°) يضمن تقاسم الحمل بنسبة آمنة لا تتجاوز 58% لكل مرسى.',
      en: 'Maintaining Y-hang angles under 60° ensures anchor loads remain comfortably below 58% of body weight.'
    }
  },
  {
    id: 'rope_l2_1',
    disciplineId: 'asset_integrity_rope',
    levelId: 'level2',
    moduleId: 'mod_rope_l2_1',
    disciplineTitleAr: 'سلامة الأصول والفحص بالحبال (Asset Integrity & Rope Access)',
    disciplineTitleEn: 'Asset Integrity & IRATA Rope Access',
    levelNameAr: 'المستوى الثاني التطبيقي والميداني',
    levelNameEn: 'Level II Certified Practitioner',
    question: {
      ar: 'ما هو المبدأ الأساسي لنظام السلامة المزدوج (Two-Rope System) المعتمد في منظومة IRATA و ISO 22846 أثناء تنفيذ عمليات الفحص الهندسي المعلق؟',
      en: 'What is the foundational safety tenet of the Two-Rope System mandated by IRATA and ISO 22846 during suspended inspection operations?'
    },
    options: {
      ar: [
        'يجب أن يكون الفني متصلاً دائماً وبشكل مستقل بحبل عمل رئيسي (Working Line) وحبل أمان احتياطي منفصل تماماً (Backup Safety Line) مع جهاز مانع للسقوط',
        'استخدام حبل واحد فقط لتوفير التكاليف وسرعة الحركة',
        'ربط الحبلين معاً في نفس القفل المعدني الواحد',
        'فصل حبل الأمان أثناء استخدام أجهزة الفحص لتجنب التشويش'
      ],
      en: [
        'The technician must remain continuously and independently connected to both a Working Line and an independent Backup Safety Line with a mobile fall arrester',
        'Utilizing a single rope to economize weight and accelerate ascent',
        'Connecting both ropes into a single shared carabiner',
        'Disconnecting the backup line during ultrasonic scanning to minimize electrical interference'
      ]
    },
    correctIndex: 0,
    codeReference: 'ISO 22846-1 Clause 5.2 / IRATA ICOP Part 2',
    explanation: {
      ar: 'تعتمد منظومة IRATA على الحماية الذاتية الفائقة (Fail-Safe 100%): في حال انقطاع حبل العمل أو فشل جهاز الهبوط، يمسك جهاز منع السقوط (مثل ASAP) على حبل الأمان المستقل فوراً ويمنع السقوط دون أي تدخل يدوي من الفني.',
      en: 'The dual-rope philosophy ensures complete redundancy: catastrophic failure of any single component on the working line immediately transfers the suspended load to the backup line without shock loading.'
    },
    keyTakeaway: {
      ar: 'ازدواجية الأمان تمنح فنيي إنسكو سجلاً خالياً من الحوادث على ارتفاعات المنصات البحرية والشعلات.',
      en: 'Systemic redundancy sustains a pristine safety record at extreme offshore heights.'
    }
  }
];
