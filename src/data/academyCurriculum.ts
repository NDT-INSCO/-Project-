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

export interface DisciplineLevel {
  levelId: 'level1' | 'level2' | 'level3' | 'inspector' | 'senior';
  nameAr: string;
  nameEn: string;
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

export const ENGINEERING_DISCIPLINES: EngineeringDiscipline[] = [
  // 1. الفحص غير الإتلافي التقليدي (Conventional NDT)
  {
    id: 'conventional_ndt',
    titleAr: 'علوم الفحص غير الإتلافي التقليدي (Conventional NDT)',
    titleEn: 'Conventional Non-Destructive Testing (VT, PT, MT, UT, RT)',
    category: 'ndt_conventional',
    badgeColor: 'amber',
    overviewAr: 'الركيزة الأساسية لضمان سلامة المنشآت الهندسية والمعدات الحيوية دون إلحاق أي ضرر فيزيائي بها. تشمل التقنيات الخمس الكلاسيكية المعتمدة في كافة مواصفات الطاقة والبترول العالمية.',
    overviewEn: 'The cornerstone of asset integrity, allowing inspection of materials and welds without compromising their structural soundness. Encompasses the 5 classical methods mandated by global energy codes.',
    keyTechniques: ['VT (Visual Testing)', 'PT (Liquid Penetrant)', 'MT (Magnetic Particle)', 'UT (Ultrasonic Testing)', 'RT (Radiographic Testing)'],
    globalAccreditations: ['ASNT SNT-TC-1A', 'ISO 9712', 'EN 473', 'ASME Section V', 'AWS D1.1'],
    targetIndustries: ['Oil & Gas Pipelines', 'Refineries', 'Power Plants', 'Structural Steel', 'Storage Tanks'],
    levels: [
      {
        levelId: 'level1',
        nameAr: 'المستوى الأول (Level I - فني مشغل أجهزة)',
        nameEn: 'Level I (Technician / Operator)',
        targetRoleAr: 'تنفيذ الفحص المباشر ومعايرة الأجهزة وتوثيق القراءات تحت إشراف معتمد',
        targetRoleEn: 'Perform specific calibrations, direct tests, and record results under supervision',
        prerequisitesAr: 'شهادة ثانوية صناعية أو دبلوم فني، مع اجتياز فحص حدة البصر (Jaeger 1 / Ishihara)',
        prerequisitesEn: 'Technical diploma, eye exam compliance (Jaeger 1 visual acuity and color vision)',
        trainingHours: 40,
        experienceMonths: 3,
        internationalCerts: ['ASNT Level I', 'ISO 9712 Level 1'],
        applicableCodes: ['ASME Sec V', 'ASTM E165', 'ASTM E709', 'ASTM E114'],
        responsibilitiesAr: [
          'معايرة أجهزة الفحص بالموجات فوق الصوتية والمغناطيسية وفق إجراء مكتوب (Written Procedure)',
          'تنفيذ خطوات التنظيف وإعداد الأسطح وتطبيق الكواشف الكيميائية في فحص السائل النافذ PT',
          'استخدام حوافر المغنطة (Yokes) لتنفيذ فحص MT والتأكد من قوة الرفع المغناطيسي (10 lbs AC)',
          'تسجيل البيانات الخام في كشوف الفحص الميدانية دون اتخاذ قرار القبول والرفض النهائي'
        ],
        responsibilitiesEn: [
          'Calibrate UT/MT instruments strictly in accordance with approved written procedures',
          'Execute pre-cleaning, chemical application, and dwell time control for PT testing',
          'Operate electromagnetic yokes and verify lifting power (10 lbs AC minimum)',
          'Record raw inspection readings without issuing final pass/reject dispositions'
        ],
        modules: [
          {
            id: 'mod_c1_1',
            titleAr: 'الوحدة 1: المبادئ الفيزيائية وسلوك الموجات والمغناطيسية',
            titleEn: 'Module 1: Physics Principles, Wave Behaviors & Magnetism',
            duration: '15 ساعة تدريبية',
            topicsAr: [
              'طبيعة الصوت والموجات الطولية والمستعرضة وسرعات الانتشار في الصلب (5900 m/s و 3240 m/s)',
              'المغناطيسية وخطوط الفيض المغناطيسي وتوليد التدفق المتسرب عند الشروخ',
              'الخاصية الشعرية والتوتر السطحي وزوايا التبلل في السوائل النافذة',
              'طبيعة الأشعة الكهرومغناطيسية (X-Ray & Gamma) والجرعات الإشعاعية'
            ],
            topicsEn: [
              'Acoustic physics, longitudinal and transverse shear waves, velocities in steel (5900 m/s & 3240 m/s)',
              'Ferromagnetism, magnetic flux leakage behavior at crack sites',
              'Capillary action, surface tension and contact wetting angles in dye penetrants',
              'Ionizing radiation physics, attenuation laws, and safe radiation doses'
            ],
            learningOutcomesAr: [
              'فهم كيفية انتقال الإشارات والظلال والكواشف وتحديد نوع العيب المحتمل',
              'القدرة على حساب سرعة الموجة والطول الموجي للمسبار المستخدم'
            ],
            learningOutcomesEn: [
              'Understand how signals, echoes, and penetrant actions reveal discontinuities',
              'Calculate sound velocity and probe wavelength accurately'
            ]
          },
          {
            id: 'mod_c1_2',
            titleAr: 'الوحدة 2: تشغيل المعدات والمعايرة الميدانية',
            titleEn: 'Module 2: Equipment Operation & Field Calibration',
            duration: '25 ساعة تدريبية وعملية',
            topicsAr: [
              'استخدام بلوكات المعايرة القياسية IIW Block V1 و V2 لمعايرة خط القاعدة ومجال الصوت',
              'ضبط كسب الجهاز (Gain dB) ونطاق القياس (Range) في جهاز UT الرقمي',
              'فحص تشتت وتركيز حبيبات الفحص المغناطيسي بأنبوبة الطرد المركزي (Centrifuge Tube 0.1-0.4 ml)',
              'إجراءات السلامة الإشعاعية واستخدام أجهزة القياس الجرعي (Survey Meters & Dosimeters)'
            ],
            topicsEn: [
              'Standard calibration blocks IIW V1 and V2 for time base and sound path zeroing',
              'Gain dB adjustment and screen range setting on digital UT flaw detectors',
              'Magnetic particle bath concentration verification using centrifuge settling tube',
              'Radiation safety rules, perimeter barricades, and survey meter dosimetry'
            ],
            learningOutcomesAr: [
              'معايرة الأجهزة بدقة تامة طبقاً لتعليمات كود ASME V',
              'الالتزام الصارم بضوابط السلامة المهنية والإشعاعية'
            ],
            learningOutcomesEn: [
              'Perform accurate field calibration adhering to ASME Section V instructions',
              'Strictly follow site radiation and chemical safety rules'
            ]
          }
        ],
        keyFormulas: [
          {
            nameAr: 'العلاقة بين التردد وسرعة الصوت والطول الموجي',
            nameEn: 'Acoustic Wavelength Equation',
            formula: 'λ = v / f',
            descriptionAr: 'حيث λ هو الطول الموجي بالملم، v سرعة الصوت بالوسط، f التردد بالميجاهرتز. يحدد الطول الموجي أصغر عيب يمكن اكتشافه (عادة نصف الطول الموجي).',
            descriptionEn: 'λ = wavelength (mm), v = acoustic velocity (m/s), f = frequency (MHz). The smallest detectable flaw is approximately λ/2.'
          },
          {
            nameAr: 'قانون سنيل لانكسار الموجات الصوتية',
            nameEn: "Snell's Law of Acoustic Refraction",
            formula: 'sin(θ₁) / v₁ = sin(θ₂) / v₂',
            descriptionAr: 'يحدد زاوية انكسار الموجة داخل المعدن عند استخدام مسبار الزاوية (Wedge) بزوايا 45° و 60° و 70°.',
            descriptionEn: "Determines refracted sound beam angle inside steel using perspex wedges (45°, 60°, 70°)."
          }
        ],
        practicalSkillsChecklist: [
          { skillAr: 'معايرة خط القاعدة لمسبار الزاوية على بلوك IIW V1 وضبط نقطة الخروج وتأخير المسبار', skillEn: 'Calibrate angle beam probe index point and sound path on IIW V1 block', importance: 'mandatory' },
          { skillAr: 'اختبار رفع الكتلة المغناطيسية لحافر AC Yoke بقوة لا تقل عن 4.5 كجم (10 lbs)', skillEn: 'Verify AC electromagnetic yoke lifting power (min 10 lbs / 4.5 kg)', importance: 'mandatory' },
          { skillAr: 'تطبيق السائل النافذ وإزالة الفائض دون غسيل مفرط (Over-washing prevention)', skillEn: 'Apply penetrant and clean excess dye without over-washing', importance: 'mandatory' },
          { skillAr: 'قراءة أفلام التصوير الإشعاعي وتحديد وضوح سلك مقياس جودة الصورة IQI', skillEn: 'Identify designated IQI wire on radiographic film under illuminator', importance: 'mandatory' }
        ]
      },
      {
        levelId: 'level2',
        nameAr: 'المستوى الثاني (Level II - مفتش معتمد ومفسر نتائج)',
        nameEn: 'Level II (Certified Inspector & Evaluator)',
        targetRoleAr: 'إعداد تعليمات الفحص وتفسير المؤشرات وقبول أو رفض اللحامات وتوقيع التقارير الرسمية',
        targetRoleEn: 'Set up equipment, interpret indications, accept/reject welds, sign official inspection reports',
        prerequisitesAr: 'شهادة المستوى الأول مع خبرة ميدانية موثقة لا تقل عن 12 شهراً واجتياز امتحانات ASNT الثلاثة',
        prerequisitesEn: 'Level I certified with min 12 months verified logbook, passing General, Specific, Practical exams',
        trainingHours: 80,
        experienceMonths: 12,
        internationalCerts: ['ASNT Level II', 'ISO 9712 Level 2', 'PCN Level 2'],
        applicableCodes: ['ASME Sec VIII Div 1', 'ASME B31.3', 'API 1104', 'AWS D1.1', 'ISO 5817'],
        responsibilitiesAr: [
          'تفسير وتمييز المؤشرات الحقيقية (Relevant Indications) عن الخاطئة (Non-relevant / Geometric)',
          'تقييم العيوب بناءً على معايير القبول والرفض لكود المشروع (ASME, API, AWS)',
          'تحديد أبعاد العيب وعمقه وطوله وموقعه الدقيق داخل الوصلة الملحومة',
          'صياغة تعليمات الفحص الفنية (NDT Work Instructions) وتدريب وتوجيه فنيي المستوى الأول',
          'اعتماد وتوقيع تقارير الفحص غير الإتلافي الرسمية المسلّمة لجهات التفتيش والعملاء'
        ],
        responsibilitiesEn: [
          'Distinguish relevant indications from non-relevant or geometrical false calls',
          'Evaluate flaws against applicable project acceptance/rejection criteria (ASME, API, AWS)',
          'Size discontinuity length, depth, height, and precise location within the weldment',
          'Draft method-specific NDT instructions and mentor Level I technicians',
          'Sign and endorse official NDT inspection certificates delivered to client auditors'
        ],
        modules: [
          {
            id: 'mod_c2_1',
            titleAr: 'الوحدة 1: تحليل وتفسير مؤشرات العيوب الحجمية والخطية',
            titleEn: 'Module 1: Volumetric & Planar Flaw Indication Sizing',
            duration: '40 ساعة تدريبية متقدمة',
            topicsAr: [
              'طريقة هبوط الـ 6 ديسيبل (6dB Drop Technique) لقياس طول العيب بمسبار الزاوية',
              'رسم وتطبيق منحنى تصحيح السعة مع المسافة (DAC Curve - ASME Sec V Art. 4)',
              'تفسير عيوب اللحام على أفلام الأشعة: الخبث، المسامية، نقص التغلغل، الشروخ الحارة والباردة',
              'التفرقة بين التغيرات الهندسية (Root Bead, Undercut) وعيوب اللحام الداخلية'
            ],
            topicsEn: [
              '6dB and 20dB drop sizing techniques for angle beam ultrasonic testing',
              'Distance Amplitude Correction (DAC) curve construction per ASME Section V Article 4',
              'Radiographic defect interpretation: slag inclusions, porosity nests, lack of penetration, hot/cold cracking',
              'Differentiating geometric artifacts (root bead geometry, external undercut) from internal planar flaws'
            ],
            learningOutcomesAr: [
              'حساب أبعاد العيب الحقيقية بدقة ±1 ملم',
              'اتخاذ القرار الهندسي الصائب بالقبول أو الرفض استناداً لنصوص الكود'
            ],
            learningOutcomesEn: [
              'Accurately size flaw dimensions within ±1mm tolerance',
              'Make authoritative pass/fail decisions backed by code citations'
            ]
          },
          {
            id: 'mod_c2_2',
            titleAr: 'الوحدة 2: تطبيق أكواد القبول والرفض العالمية',
            titleEn: 'Module 2: World Inspection Codes & Acceptance Standards',
            duration: '40 ساعة دراسات حالة',
            topicsAr: [
              'معايير قبول ASME B31.3 للخدمات العادية والفائقة (Normal Fluid vs Severe Cyclic)',
              'جداول قبول ASME Section VIII Div 1 Appendix 12 و Appendix 4',
              'معايير فحص خطوط الأنابيب البترولية طبقاً لـ API 1104 Section 9',
              'حدود العيوب الهندسية واللحامات الإنشائية طبقاً لـ AWS D1.1 Table 6.1'
            ],
            topicsEn: [
              'ASME B31.3 Table 341.3.2 acceptance criteria (Normal vs Severe Cyclic conditions)',
              'ASME Section VIII Div 1 Mandatory Appendices 4 (PT/MT) and 12 (UT)',
              'Cross-country pipeline inspection acceptance limits per API 1104 Section 9',
              'Structural welding inspection limits per AWS D1.1 Table 6.1 visual and NDT standards'
            ],
            learningOutcomesAr: [
              'الربط المباشر بين تقرير الفحص والفقرة المحددة بالكود المعمول به',
              'إعداد تقرير فحص لا تشوبه شائبة أمام لجان التدقيق الدولي (Auditors)'
            ],
            learningOutcomesEn: [
              'Directly map test findings to explicit code clauses',
              'Produce bulletproof inspection dossiers for third-party client audits'
            ]
          }
        ],
        keyFormulas: [
          {
            nameAr: 'حساب زاوية تشتت الحزمة الصوتية (Beam Spread Angle)',
            nameEn: 'Ultrasonic Beam Divergence Angle',
            formula: 'sin(α) = 1.22 × λ / D',
            descriptionAr: 'حيث α نصف زاوية التشتت، λ الطول الموجي، D قطر بلورة المسبار. كلما زاد التردد صغرت زاوية التشتت وزادت دقة تركيز الحزمة.',
            descriptionEn: 'α = half-divergence angle, λ = wavelength, D = crystal diameter. Higher frequency produces a tighter sound beam with less beam spread.'
          },
          {
            nameAr: 'حساب مسافة المنطقة القريبة للمسبار (Near Field Length)',
            nameEn: 'Near Field Distance (Fresnel Zone)',
            formula: 'N = (D² × f) / (4 × v) = D² / (4 × λ)',
            descriptionAr: 'المنطقة القريبة التي تتذبذب فيها شدة الصوت ولا يمكن قياس حجم العيب فيها بدقة، مما يوجب اختيار مسبار مناسب لسماكة الفحص.',
            descriptionEn: 'The near zone where acoustic pressure fluctuates wildly; defect sizing must be conducted in the far field (beyond N).'
          }
        ],
        practicalSkillsChecklist: [
          { skillAr: 'بناء منحنى DAC بـ 3 نقاط على الأقل على بلوك المعايرة ASME مع خطوط التحذير (50% DAC)', skillEn: 'Construct a 3-point DAC curve on ASME basic calibration block with 50% evaluation line', importance: 'mandatory' },
          { skillAr: 'تفسير طقم أفلام لحام تتضمن عيوب نقص تغلغل، خبث متقطع، وشروخ طولية مع تحديد الكود', skillEn: 'Interpret a complete set of weld radiographs identifying crack, lack of penetration, slag', importance: 'mandatory' },
          { skillAr: 'إجراء فحص الجسيمات المغناطيسية الفلورية في الغرفة المظلمة وقياس شدة الضوء الأسود (≥ 1000 µW/cm²)', skillEn: 'Conduct fluorescent MT in darkroom verifying black light intensity ≥ 1000 µW/cm²', importance: 'mandatory' },
          { skillAr: 'صياغة إجراء تفتيش فني NDT Procedure وإجازته من قبل Level III', skillEn: 'Draft an industrial NDT technique sheet ready for Level III approval', importance: 'mandatory' }
        ]
      },
      {
        levelId: 'level3',
        nameAr: 'المستوى الثالث (Level III - كبير الاستشاريين ورئيس قطاع الفحص)',
        nameEn: 'Level III (Consulting Authority & Quality Director)',
        targetRoleAr: 'تأسيس واعتماد إجراءات الفحص، تأهيل واعتماد الكوادر الفنية، حل النزاعات والتحكيم الهندسي',
        targetRoleEn: 'Establish & approve NDT procedures, qualify & certify staff, arbitrate code disputes with clients',
        prerequisitesAr: 'بكالوريوس هندسة مع خبرة 4 سنوات أو دبلوم عالي مع خبرة 8 سنوات، واجتياز اختبارات ASNT الأساسية والتخصصية الصارمة',
        prerequisitesEn: 'B.Sc. Engineering with 4 yrs experience or diploma with 8 yrs, passing ASNT Basic and Method examinations',
        trainingHours: 120,
        experienceMonths: 48,
        internationalCerts: ['ASNT Level III', 'ISO 9712 Level 3', 'ACCP Professional'],
        applicableCodes: ['ASNT SNT-TC-1A', 'CP-189', 'ASME Sec V', 'ISO 17025', 'ISO 9001'],
        responsibilitiesAr: [
          'صياغة وإقرار ممارسة الشركة المكتوبة (Written Practice) لتأهيل وتصديق العاملين',
          'إعداد وتدقيق واعتماد كافة إجراءات الفحص غير الإتلافي (NDT Procedures) والمصادقة عليها',
          'تمثيل الشركة كخبير محكم أمام عملاء البترول والغاز والجهات الرقابية الدولية',
          'اختيار وتصميم تقنيات الفحص للمعدات المعقدة ذات درجات الحرارة العالية أو السبائك الغريبة',
          'إجراء امتحانات التأهيل النظري والعملي لفنيي المستوى الأول والثاني'
        ],
        responsibilitiesEn: [
          'Author and enforce the corporate Written Practice for qualification & certification',
          'Review, audit, and formally stamp all corporate NDT engineering procedures',
          'Serve as chief technical arbitrator before petroleum majors and regulatory bodies',
          'Design specialized inspection methodologies for exotic alloys and high-temperature operating units',
          'Administer written and practical qualification exams for Level I and Level II candidates'
        ],
        modules: [
          {
            id: 'mod_c3_1',
            titleAr: 'الوحدة 1: تصميم واعتماد الإجراءات وحوكمة أنظمة الجودة',
            titleEn: 'Module 1: Procedure Authoring & Quality System Governance',
            duration: '60 ساعة استشارية',
            topicsAr: [
              'صياغة إجراء الفحص الهندسي متضمناً المتغيرات الأساسية وغير الأساسية (Essential & Non-essential variables)',
              'تطبيق متطلبات كود ASME Section V Article 1 وحوكمة الفحوصات',
              'متطلبات معيار ISO 17025 لاعتماد مختبرات الفحص والمعايرة',
              'التحقيق في أسباب الفشل الميتالورجي (Root Cause Failure Analysis - RCFA)'
            ],
            topicsEn: [
              'Drafting inspection procedures specifying essential and non-essential variables per ASME',
              'Enforcing ASME Section V Article 1 general requirements and quality governance',
              'ISO 17025 standard compliance for testing and calibration laboratory accreditation',
              'Metallurgical Root Cause Failure Analysis (RCFA) and structural forensics'
            ],
            learningOutcomesAr: [
              'القدرة على وضع إجراءات فحص معتمدة تفي بأعلى متطلبات كبرى شركات الطاقة (أرامكو، شل، إيني)',
              'إدارة منظومة الجودة الفنية للمختبر والامتثال التام للأكواد'
            ],
            learningOutcomesEn: [
              'Author corporate procedures meeting stringent oil supermajor requirements (Aramco, Shell, Eni)',
              'Govern laboratory QA compliance and audit readiness'
            ]
          }
        ],
        practicalSkillsChecklist: [
          { skillAr: 'مراجعة واعتماد إجراء فحص UT لوصلة لحام أنبوب غاز تحت ضغط عالي مع اعتماد المتغيرات', skillEn: 'Review and approve high-pressure gas pipeline UT procedure with variable table', importance: 'mandatory' },
          { skillAr: 'تصميم عينة معايرة خاصة (Custom Calibration Block) لقطعة ذات هندسة معقدة', skillEn: 'Design a bespoke calibration block for complex geometry component', importance: 'mandatory' },
          { skillAr: 'التحكيم في نزاع فني حول تفسير شائخة راديوجرافية بين المقاول والاستشاري', skillEn: 'Arbitrate technical dispute over film defect interpretation between EPC and owner', importance: 'mandatory' }
        ]
      }
    ]
  },

  // 2. الفحص غير الإتلافي المتقدم (Advanced NDT)
  {
    id: 'advanced_ndt',
    titleAr: 'علوم الفحص غير الإتلافي المتقدم والرقمي (Advanced NDT & Digital Inspection)',
    titleEn: 'Advanced NDT & Digital Inspection (PAUT, TOFD, ECT/ECA, GWT, CR/DR, MFL)',
    category: 'ndt_advanced',
    badgeColor: 'sky',
    overviewAr: 'التقنيات الرقمية المتقدمة التي توفر تصويراً ثلاثي الأبعاد وتسجيلاً كاملاً للبيانات (Full Data Encoding). تمكّن من استبدال التصوير الإشعاعي بالنظائر المشعة واكتشاف العيوب بدقة مليمترية أثناء تشغيل المنشأة.',
    overviewEn: 'Next-generation digital inspection providing encoded 3D imaging, digital archiving, and volumetric flaw sizing. Increasingly replacing radioactive radiography across modern industrial sites.',
    keyTechniques: ['PAUT (Phased Array UT)', 'TOFD (Time-of-Flight Diffraction)', 'ECT / ECA (Eddy Current Array)', 'GWT (Guided Wave / LRUT)', 'CR / DR (Computed & Digital Radiography)', 'MFL (Magnetic Flux Leakage)'],
    globalAccreditations: ['ISO 9712 Advanced NDT', 'CSWIP PAUT/TOFD Level 2/3', 'ASME Code Case 2235', 'API 579 FFS'],
    targetIndustries: ['Hydrogen Plants', 'Offshore Platforms', 'LNG Storage', 'Subsea Pipelines', 'Nuclear Vessels'],
    levels: [
      {
        levelId: 'level2',
        nameAr: 'مفتش تقنيات متقدمة معتمد (Advanced NDT Specialist)',
        nameEn: 'Advanced NDT Specialist / Data Analyst',
        targetRoleAr: 'برمجة قوانين التركيز البؤري (Focal Laws)، تشغيل الماسحات المشفرة، تحليل بيانات A/B/C/S-Scan',
        targetRoleEn: 'Set up focal laws, operate encoded scanners, analyze multi-view A/B/C/S-Scan acoustic data',
        prerequisitesAr: 'شهادة Level II في الفحص بالموجات فوق الصوتية UT التقليدي مع معرفة عميقة بهندسة اللحام والحاسب',
        prerequisitesEn: 'Conventional UT Level II certified with deep grounding in weld metallurgy and digital signal processing',
        trainingHours: 80,
        experienceMonths: 18,
        internationalCerts: ['CSWIP PAUT Level 2', 'ISO 9712 TOFD Level 2', 'PCN Advanced NDT'],
        applicableCodes: ['ASME Sec V Art. 4', 'ASME Code Case 2235', 'ISO 13588', 'ISO 10863'],
        responsibilitiesAr: [
          'برمجة زوايا المسح (Sectorial S-Scan من 40° إلى 70°) والمسح الإلكتروني (E-Scan)',
          'معايرة مصفوفة المجسات متعددة العناصر (16:64 أو 32:128) وضبط تعويض الكسب المعتمد على الزاوية (ACG)',
          'تنفيذ تقنية حيود وقت الطيران TOFD لاكتشاف قمم الشروخ السفلية والعلوية بدقة قياس تصل إلى 0.5 ملم',
          'معايرة التشفير الميكانيكي (Encoder Calibration) لمطابقة موضع العيب بالسنتيمتر على طول خط اللحام',
          'استخراج قطاعات العيوب ثلاثية الأبعاد وتقديم ملفات فحص رقمية مؤرشفة مدى الحياة'
        ],
        responsibilitiesEn: [
          'Program sectorial S-Scan (40° to 70°) and electronic E-Scan focal law beams',
          'Calibrate multi-element phased array probes and balance Angle Corrected Gain (ACG)',
          'Deploy Time-of-Flight Diffraction (TOFD) for tip-diffraction flaw height sizing within ±0.5mm',
          'Calibrate mechanical optical encoders to map exact linear position along the weld seam',
          'Export 3D volumetric flaw reconstructions and maintain tamper-proof digital inspection dossiers'
        ],
        modules: [
          {
            id: 'mod_adv_1',
            titleAr: 'الوحدة 1: فيزياء المصفوفات الطورية وتوليد الحزم البؤرية',
            titleEn: 'Module 1: Phased Array Beam Forming & Delay Laws Physics',
            duration: '40 ساعة تدريب عملي ومحاكاة',
            topicsAr: [
              'مبدأ هويغنز وتداخل الموجات البناء والهدام لتوجيه وتركيز الحزمة الصوتية إلكترونياً',
              'عناصر المصفوفة (Elements, Pitch, Aperture, Near-field calculations)',
              'طرق المعايرة: TCG (Time Corrected Gain) و ACG و تأخير الإسفين (Wedge Delay)',
              'تفسير شاشات العرض المتعددة: A-Scan, B-Scan (مقطع جانبي), C-Scan (منظر علوي), S-Scan (قطاع زاوية)'
            ],
            topicsEn: [
              'Huygens principle and constructive/destructive interference for electronic beam steering and focusing',
              'Array probe architecture (Element count, Pitch, Passive aperture, Active aperture)',
              'Calibration workflow: Wedge delay, Velocity verification, Angle Corrected Gain (ACG), and TCG',
              'Multi-view data analysis: Simultaneous A-Scan, B-Scan (cross-section), C-Scan (plan view), S-Scan'
            ],
            learningOutcomesAr: [
              'القدرة على كشف أدق الشروخ والعيوب المستوية الموازية لشطبة اللحام',
              'إلغاء مخاطر الإشعاع واستبدال RT بالـ PAUT طبقاً لكود ASME'
            ],
            learningOutcomesEn: [
              'Detect challenging planar defects aligned with weld bevel angles',
              'Successfully replace RT with encoded PAUT per ASME Code Case 2235'
            ]
          },
          {
            id: 'mod_adv_2',
            titleAr: 'الوحدة 2: تقنية حيود زمن الطيران TOFD وقياس ارتفاع الشروخ',
            titleEn: 'Module 2: Time of Flight Diffraction (TOFD) & Height Sizing',
            duration: '40 ساعة دراسات متقدمة',
            topicsAr: [
              'موجة السطح الجانبية (Lateral Wave) وانعكاس الجدار الخلفي (Backwall Echo)',
              'حيود الموجة عند طرفي الشرخ العلوي والسفلي (Diffracted Tip Signals) وتحويل الطور',
              'حساب عمق العيب وارتفاعه (Flaw Height Δh) باستخدام معادلات زمن الطيران',
              'المناطق العمياء في TOFD (Dead Zones) وكيفية تغطيتها بالدمج مع PAUT'
            ],
            topicsEn: [
              'Lateral wave physics, backwall reflection, and subsurface acoustics',
              'Diffraction tip signals from top and bottom flaw edges with phase reversal analysis',
              'Accurate calculation of flaw depth and true vertical extent (height sizing Δh)',
              'TOFD dead zones (near-surface and backwall) and complementary PAUT integration'
            ],
            learningOutcomesAr: [
              'قياس الارتفاع الحقيقي للشرخ لاستخدامه في دراسات الصلاحية للخدمة (Fitness-for-Service API 579)',
              'اكتشاف عيوب التعب والإجهاد في المراجل ومفاعلات التكرير'
            ],
            learningOutcomesEn: [
              'Accurately measure vertical flaw height to feed API 579 Fitness-For-Service calculations',
              'Detect in-service fatigue cracking in refinery reactors and heavy-wall drums'
            ]
          }
        ],
        keyFormulas: [
          {
            nameAr: 'حساب عمق طرف العيب في تقنية TOFD',
            nameEn: 'TOFD Flaw Depth Sizing Formula',
            formula: 'd = √[ (c × t / 2)² - s² ]',
            descriptionAr: 'حيث d عمق العيب، c سرعة موجة القص في الصلب، t زمن وصول الإشارة المحيدة، s نصف المسافة بين مسباري الإرسال والاستقبال (PCS / 2).',
            descriptionEn: 'd = flaw depth, c = longitudinal sound velocity, t = transit time of diffracted tip wave, s = half probe centre separation (PCS/2).'
          }
        ],
        practicalSkillsChecklist: [
          { skillAr: 'تثبيت ومحاذاة ماسح مشفر (Encoded Scanner) على خط لحام أنبوبي والمسح بسرعة ثابتة', skillEn: 'Mount and calibrate encoded scanner on pipe weld and perform encoded scan', importance: 'mandatory' },
          { skillAr: 'بناء خطة فحص شعاعية (Ray Tracing) وتأكيد تغطية شطبة اللحام بنسبة 100%', skillEn: 'Build probe ray-tracing simulation confirming 100% weld volume and HAZ coverage', importance: 'mandatory' },
          { skillAr: 'فصل إشارة حيود قمة الشرخ عن إشارة القاعدة وتحديد ارتفاع العيب بالملم', skillEn: 'Resolve top and bottom crack tip diffractions and calculate height in mm', importance: 'mandatory' }
        ]
      }
    ]
  },

  // 3. تفتيش وهندسة اللحام (Welding Engineering & Inspection)
  {
    id: 'welding_inspection',
    titleAr: 'علوم تفتيش وهندسة اللحام (Welding Engineering & Inspection)',
    titleEn: 'Welding Engineering & Inspection (CSWIP, AWS CWI, ASME IX, ISO 15614)',
    category: 'welding',
    badgeColor: 'emerald',
    overviewAr: 'علم التحكم في الوصلات المعدنية المنصهرة وميتالورجيا المنطقة المتأثرة بالحرارة (HAZ). يشمل اعتماد إجراءات اللحام وتأهيل اللحامين والتفتيش الميداني في مصانع الإنشاء ومواقع النفط.',
    overviewEn: 'The science of molten metallurgy, heat input control, and heat-affected zone integrity. Covers welding procedure qualification (WPS/PQR), welder testing (WPQ), and field QA/QC surveillance.',
    keyTechniques: ['SMAW (Shielded Metal Arc)', 'GTAW / TIG (Gas Tungsten Arc)', 'GMAW / MIG (Gas Metal Arc)', 'FCAW (Flux Cored Arc)', 'SAW (Submerged Arc)'],
    globalAccreditations: ['CSWIP 3.1 & 3.2 (TWI UK)', 'AWS CWI (American Welding Society)', 'IIW International Welding Engineer (IWE)', 'ASME Section IX'],
    targetIndustries: ['Boiler & Pressure Vessel Shops', 'Shipyards', 'Cross-country Pipelines', 'Structural Bridges', 'Offshore Jackets'],
    levels: [
      {
        levelId: 'inspector',
        nameAr: 'مفتش لحام معتمد (CSWIP 3.1 / AWS CWI)',
        nameEn: 'Certified Welding Inspector (CSWIP 3.1 / AWS CWI)',
        targetRoleAr: 'التفتيش البصري المباشر للحامات ومراقبة معايير اللحام قبل وأثناء وبعد عملية اللحام',
        targetRoleEn: 'Inspect welds visually, verify welding variables, witness qualification tests, review MTRs',
        prerequisitesAr: 'خبرة مهنية موثقة في اللحام أو التصنيع لا تقل عن 3 سنوات مع اجتياز الفحص النظري والعملي',
        prerequisitesEn: '3+ years documented welding fabrication experience, passing theory, code and practical specimen exams',
        trainingHours: 60,
        experienceMonths: 36,
        internationalCerts: ['CSWIP 3.1 Welding Inspector', 'AWS CWI Certified Welding Inspector'],
        applicableCodes: ['ASME Sec IX', 'AWS D1.1', 'API 1104', 'BS EN ISO 15614-1', 'ISO 5817'],
        responsibilitiesAr: [
          'التأكد من مطابقة شطبة اللحام وزاوية الميل وفجوة الجذر (Root Gap) والسنتر قبل بدء اللحام',
          'مراقبة المتغيرات أثناء اللحام: تيار اللحام (Amps)، الجهد (Volts)، سرعة الحركة، درجة حرارة التسخين المسبق (Preheat)',
          'حساب الطاقة الحرارية المدخلة (Heat Input kJ/mm) لتفادي انهيار المتانة الصدمية في HAZ',
          'فحص اللحام المنجز بصرياً باستخدام مساطر ومقاييس اللحام (CamBridge Gauge, Hi-Lo Gauge)',
          'مراجعة شهادات اختبار المواد (MTR / Mill Test Reports طبقاً لـ EN 10204 Type 3.1)'
        ],
        responsibilitiesEn: [
          'Verify fit-up, bevel angle, root gap, root face, and Hi-Lo alignment prior to arc striking',
          'Monitor in-process variables: Amperage, Voltage, Travel Speed, Preheat and Interpass temperature',
          'Calculate arc Heat Input (kJ/mm) to prevent deterioration of Charpy V-notch toughness in the HAZ',
          'Perform visual weld inspection using precision gauges (Cambridge Gauge, Hi-Lo Gauge)',
          'Review Material Test Reports (MTR / Mill Certificates per EN 10204 3.1 / 3.2)'
        ],
        modules: [
          {
            id: 'mod_w1_1',
            titleAr: 'الوحدة 1: ميتالورجيا اللحام والميكروستركشر والحرارة',
            titleEn: 'Module 1: Welding Metallurgy, Microstructure & Heat Input',
            duration: '30 ساعة تدريبية مكثفة',
            topicsAr: [
              'مخطط الحديد والكربون وأطوار الفولاذ (Austenite, Ferrite, Pearlite, Bainite, Martensite)',
              'المنطقة المتأثرة بالحرارة (HAZ - Heat Affected Zone) وتغير حجم الحبيبات وقساوتها',
              'ظاهرة الشروخ الهيدروجينية الباردة (HICC) والعوامل الأربعة المؤدية لها',
              'حساب الكربون المكافئ (Carbon Equivalent CE / CET) لتحديد درجة حرارة التسخين المسبق'
            ],
            topicsEn: [
              'Iron-Carbon phase equilibrium diagram (Austenite, Ferrite, Pearlite, Bainite, brittle Martensite)',
              'Heat Affected Zone (HAZ) grain coarsening, recrystallization, and hardness spikes',
              'Hydrogen Induced Cold Cracking (HICC) mechanism and the 4 critical contributing factors',
              'Carbon Equivalent (CE / CET) calculations per IIW and Dearden-O’Neill formulas for preheat selection'
            ],
            learningOutcomesAr: [
              'القدرة على تفسير أسباب شروخ اللحام الهيدروجينية وكيفية الوقاية منها',
              'ضبط التسخين المسبق وحفظ إلكترودات اللحام بالأفران الجافة (Holding Ovens)'
            ],
            learningOutcomesEn: [
              'Diagnose root causes of hydrogen cracking and prescribe metallurgical preventive actions',
              'Control preheat and enforce low-hydrogen consumable baking/quiver storage rules'
            ]
          },
          {
            id: 'mod_w1_2',
            titleAr: 'الوحدة 2: إعداد واعتماد مواصفات إجراءات اللحام (WPS / PQR / WPQ)',
            titleEn: 'Module 2: WPS, PQR & Welder Performance Qualification',
            duration: '30 ساعة تطبيقات أكواد',
            topicsAr: [
              'كتابة وتدقيق مواصفة إجراء اللحام (Welding Procedure Specification - WPS)',
              'سجل تأهيل الإجراء (PQR) والاختبارات الميكانيكية الإتلافية المطلوبة (Tensile, Bend, Charpy, Macro)',
              'تأهيل أداء اللحامين (WPQ) ونطاقات السماكة والأقطار وأوضاع اللحام المؤهلة (1G to 6G/6GR)',
              'المتغيرات الأساسية (Essential Variables) والمكملة (Supplementary) وغير الأساسية بكود ASME IX'
            ],
            topicsEn: [
              'Authoring and qualifying Welding Procedure Specifications (WPS) per ASME Section IX',
              'Procedure Qualification Record (PQR) mechanical testing: Transverse Tensile, Guided Bend, Charpy Impact, Macro-etch',
              'Welder Performance Qualification (WPQ) qualified thickness ranges, pipe diameters, and test positions (1G to 6G/6GR)',
              'Essential, Supplementary Essential (toughness-related), and Non-essential variables in ASME IX'
            ],
            learningOutcomesAr: [
              'القدرة على تدقيق أي ملف WPS/PQR والتأكد من مشروعيته القانونية قبل بدء العمل',
              'الإشراف على اختبارات اللحامين في موقع العمل واستبعاد غير المؤهلين'
            ],
            learningOutcomesEn: [
              'Audit WPS/PQR packages for contractual and code compliance before production starts',
              'Witness welder test coupons and issue qualified welder performance cards'
            ]
          }
        ],
        keyFormulas: [
          {
            nameAr: 'حساب الطاقة الحرارية المدخلة للقوس الكهربائي',
            nameEn: 'Arc Welding Heat Input Formula',
            formula: 'HI = (V × I × 60) / (v × 1000) × η',
            descriptionAr: 'حيث V الجهد بالفولت، I التيار بالأمبير، v سرعة حركة اللحام بالملم/دقيقة، η معامل كفاءة عملية اللحام (SMAW = 0.8, GTAW = 0.6, GMAW = 0.8, SAW = 1.0). الناتج بوحدة kJ/mm.',
            descriptionEn: 'V = Volts, I = Amps, v = Travel speed (mm/min), η = Thermal process efficiency (SMAW 0.8, TIG 0.6, SAW 1.0). Result in kJ/mm.'
          },
          {
            nameAr: 'حساب الكربون المكافئ لتحديد قابلية اللحام والتسخين',
            nameEn: 'IIW Carbon Equivalent Formula',
            formula: 'CE_IIW = C + (Mn / 6) + ((Cr + Mo + V) / 5) + ((Ni + Cu) / 15)',
            descriptionAr: 'إذا كانت قيمة CE أكبر من 0.45%، يتطلب الفولاذ تسخيناً مسبقاً إلزامياً ومراقبة دقيقة لمنع تكون المارتينسيت الهش.',
            descriptionEn: 'When CE exceeds 0.45%, preheat and interpass controls become mandatory to prevent hard, brittle martensite formation.'
          }
        ],
        practicalSkillsChecklist: [
          { skillAr: 'استخدام مقياس كامبريدج لقياس عدم المحاذاة (Hi-Lo)، عمق النحر (Undercut)، وارتفاع التدعيم', skillEn: 'Measure root misalignment, undercut depth, and cap height using Cambridge gauge', importance: 'mandatory' },
          { skillAr: 'قياس وحساب الطاقة الحرارية بلحام حقيقي باستخدام ساعة توقف وأفوميتر معاير', skillEn: 'Calculate real-time heat input on live test weld using calibrated timer and meter', importance: 'mandatory' },
          { skillAr: 'فحص عينة ماكرو (Macro-etch) مكبرة وتحديد عمق التغلغل والمنطقة الحرارية وعيوب المسامية', skillEn: 'Inspect macro-etched weld cross-section for fusion, penetration, and HAZ geometry', importance: 'mandatory' }
        ]
      }
    ]
  },

  // 4. المعالجة الحرارية وميتالورجيا المعادن (PWHT & Metallurgy)
  {
    id: 'pwht_metallurgy',
    titleAr: 'علوم المعالجة الحرارية بعد اللحام وميتالورجيا الصلب (PWHT & Thermal Engineering)',
    titleEn: 'Post Weld Heat Treatment (PWHT) & Metallurgical Engineering',
    category: 'heat_treatment',
    badgeColor: 'rose',
    overviewAr: 'إزالة الإجهادات المتبقية الناتجة عن انكماش معدن اللحام، وتخفيض قساوة المنطقة المتأثرة بالحرارة، واستعادة المتانة الصدمية لمنع الانهيار الهش (Brittle Fracture) وتصدع التآكل الإجهادي.',
    overviewEn: 'Mitigating residual stresses, tempering brittle martensitic microstructures, and restoring fracture toughness to eliminate brittle fracture and Stress Corrosion Cracking (SCC).',
    keyTechniques: ['Electrical Resistance (Ceramic Mats)', 'Induction Heating', 'Internal Gas Fired', 'Temporary Modular Furnaces', 'Localized Ring Heating'],
    globalAccreditations: ['ASME B31.3 Table 331.1.1', 'ASME Section VIII Div 1 UCS-56', 'BS 2633', 'API 510/570', 'NACE MR0175 / ISO 15156'],
    targetIndustries: ['High Pressure Steam Boilers', 'Sour Gas Plants', 'Heavy Cr-Mo Reactors', 'Reformer Tubes', 'Hydrocracker Units'],
    levels: [
      {
        levelId: 'senior',
        nameAr: 'مهندس ومشرف معالجة حرارية معتمد (PWHT Specialist Engineer)',
        nameEn: 'PWHT Specialist Engineer / Thermography Lead',
        targetRoleAr: 'حساب المنحنيات الحرارية، توزيع الثرموكبلات (Thermocouples)، مراقبة التدرج الحراري ومطابقة مواصفات NACE',
        targetRoleEn: 'Design thermal soaking cycles, plan thermocouple arrays, verify temperature gradients per ASME',
        prerequisitesAr: 'بكالوريوس هندسة ميكانيكية أو ميتالورجيا أو خبرة فنية موثقة 5 سنوات في تطبيقات المعالجة الحرارية',
        prerequisitesEn: 'B.Sc. in Metallurgy/Mechanical Engineering or 5+ yrs field heat-treatment execution experience',
        trainingHours: 60,
        experienceMonths: 24,
        internationalCerts: ['INSCO PWHT Certified Specialist', 'ASNT Materials & Processes'],
        applicableCodes: ['ASME Sec VIII Div 1 UCS-56', 'ASME B31.3', 'BS EN ISO 17663', 'NACE MR0175'],
        responsibilitiesAr: [
          'تحديد زمن النقع (Soaking Time) ودرجة الحرارة المستهدفة ومعدل التسخين والتبريد لكل سبيكة',
          'تثبيت مزدوجات القياس الحراري (Type K Thermocouples) بواسطة ماكينة اللحام النقطي (Capacitive Discharge)',
          'مراقبة تدرج الحرارة المحوري والدائري عبر سماكة الجدار لضمان عدم حدوث تشوهات هندسية',
          'مراجعة الرسم البياني المسجل (Chart Recorder Strip / Digital Datalogger) والتأكد من مطابقة الكود',
          'إجراء اختبار القساوة الميداني (Portable Hardness Testing - Equotip / UCI) لضمان عدم تجاوز 22 HRC (248 HV10)'
        ],
        responsibilitiesEn: [
          'Calculate holding temperature, soaking time, heating rate, and cooling rate for every alloy P-Number',
          'Attach Type K calibrated thermocouples using capacitive discharge resistance pin tacking',
          'Control axial and circumferential thermal gradients across heavy walls to prevent thermal stress distortion',
          'Review multi-channel calibrated chart recorder graphs and audit soaking uniformity',
          'Perform on-site portable hardness testing (UCI/Leeb) ensuring strict compliance with NACE MR0175 max 248 HV10'
        ],
        modules: [
          {
            id: 'mod_p1_1',
            titleAr: 'الوحدة 1: ديناميكا المعالجة الحرارية ودورات درجات الحرارة',
            titleEn: 'Module 1: Heat Treatment Dynamics & ASME Thermal Curves',
            duration: '30 ساعة هندسية',
            topicsAr: [
              'ميكانيزم تخفيف الإجهادات بالزحف الموضعي (Stress Relief by Thermal Creep Relaxation)',
              'جدول ASME B31.3 Table 331.1.1 وحدود السماكات المعفاة والتسخين الإلزامي',
              'المعالجة الخاصة لسبائك الكروم موليبدينوم فائقة الحساسية (P91 / P92 / P22)',
              'حساب معدلات التسخين والتبريد القصوى المسموحة لتفادي الصدمة الحرارية'
            ],
            topicsEn: [
              'Stress relief mechanisms through microscopic dislocation climb and thermal creep relaxation',
              'ASME B31.3 Table 331.1.1 exemption thickness limits and mandatory thermal soaking parameters',
              'Critical tight-window heat treatment for advanced 9Cr creep-resistant steels (Grade P91/P92)',
              'Calculating maximum permissible heating and cooling rates to prevent catastrophic thermal shocking'
            ],
            learningOutcomesAr: [
              'حساب المنحنى الحراري الكامل لأي أنبوب أو وعاء ضغط خلال دقائق',
              'التحكم الدقيق في التدرج الحراري ومنع فشل الوصلة أثناء المعالجة'
            ],
            learningOutcomesEn: [
              'Compute the complete ASME temperature-time cycle for any pressure component',
              'Master gradient control and mitigate distortion or localized buckling risks'
            ]
          }
        ],
        keyFormulas: [
          {
            nameAr: 'معدل التسخين الأقصى المسموح فوق 315°م طبقاً لكود ASME',
            nameEn: 'ASME Max Heating Rate Above 315°C',
            formula: 'Max Rate (°C/hr) = 5555 / Thickness (mm), Max 222°C/hr',
            descriptionAr: 'لضمان عدم حدوث تدرج حراري عنيف بين السطح الخارجي والداخلي للأنابيب السميكة، لا يجوز تجاوز هذا المعدل فوق درجة 315°م (600°F).',
            descriptionEn: 'To prevent destructive through-thickness thermal gradients, heating rate above 315°C must not exceed 5555/t (mm) or 222°C/hr.'
          }
        ],
        practicalSkillsChecklist: [
          { skillAr: 'لحام ثيرموكبل مزدوج K بجهاز التثبيت النقطي واختبار استمرارية المقاومة', skillEn: 'Tack weld Type K thermocouple using capacitive discharge pin unit and test circuit', importance: 'mandatory' },
          { skillAr: 'لف سخانات السيراميك (FCP Mats) والعزل الحراري الصخري وتثبيتها بشرائط الاستانلس', skillEn: 'Wrap ceramic pad heaters and ceramic fiber blanket insulation with stainless banding', importance: 'mandatory' },
          { skillAr: 'تدقيق مخطط درجات حرارة مسجل من 12 قناة وتأكيد زمن النقع والتدرج الحراري', skillEn: 'Audit 12-channel digital data-logger chart verifying soaking time and gradient band', importance: 'mandatory' }
        ]
      }
    ]
  },

  // 5. تفتيش المنشآت والمعدات الثابتة البترولية (API Plant & Vessel Inspection)
  {
    id: 'api_inspection',
    titleAr: 'تفتيش المنشآت والمعدات البترولية الثابتة (API Plant & Vessel Inspection)',
    titleEn: 'API In-Service Plant Inspection (API 510, 570, 653, 579, 580)',
    category: 'api_inspection',
    badgeColor: 'cyan',
    overviewAr: 'إدارة سلامة وموثوقية أوعية الضغط وخطوط الأنابيب وخزانات التخزين في مصافي النفط ومحطات الغاز. تشمل حساب معدلات التآكل، تحديد العمر الافتراضي المتبقي، والتفتيش أثناء فترات الصيانة الشاملة (Turnaround).',
    overviewEn: 'In-service integrity governance for refinery pressure vessels, process piping, and storage tanks. Calculates corrosion rates, remaining life, and mandatory turnaround inspection intervals.',
    keyTechniques: ['API 510 (Pressure Vessels)', 'API 570 (Piping Systems)', 'API 653 (Storage Tanks)', 'API 579 (Fitness-For-Service)', 'API 580/581 (Risk-Based Inspection)'],
    globalAccreditations: ['API 510 Certified Inspector', 'API 570 Certified Piping Inspector', 'API 653 Certified Tank Inspector', 'ASME FFS-1'],
    targetIndustries: ['Crude Refineries', 'Petrochemical Complexes', 'LNG Terminals', 'Offshore Platforms', 'Tank Farms'],
    levels: [
      {
        levelId: 'inspector',
        nameAr: 'مفتش منشآت بترولية معتمد (API 510 / API 570 / API 653 Inspector)',
        nameEn: 'Certified API In-Service Plant Inspector',
        targetRoleAr: 'حساب السماكة الأدنى المطلوبة (t_min)، حساب العمر المتبقي، تقييم آليات التلف (Damage Mechanisms)، تخطيط الصيانة',
        targetRoleEn: 'Calculate t_min, remaining service life, inspect damage mechanisms, establish inspection intervals',
        prerequisitesAr: 'بكالوريوس هندسة مع خبرة سنة واحدة أو دبلوم فني مع خبرة 3 سنوات في عمليات التفتيش البترولية مع اجتياز امتحان المعهد الأمريكي للبترول API',
        prerequisitesEn: 'B.Sc. Engineering with 1 yr or technical diploma with 3 yrs petrochemical inspection experience, passing API exam',
        trainingHours: 80,
        experienceMonths: 24,
        internationalCerts: ['API 510 Pressure Vessel Inspector', 'API 570 Piping Inspector', 'API 653 Tank Inspector'],
        applicableCodes: ['API 510', 'API 570', 'API 653', 'API 571', 'ASME Sec VIII Div 1', 'ASME B31.3'],
        responsibilitiesAr: [
          'حساب السماكة التصميمية الدنيا المطلوبة (t_min) للأسطوانات والقباب ورؤوس أوعية الضغط',
          'حساب معدل التآكل طويل وقصير الأجل (Corrosion Rate mm/year) وتحديد موعد الفحص القادم (Inspection Interval)',
          'تحديد آليات التلف النشطة طبقاً لكود API 571 (مثل التآكل تحت العازل CUI، الكبرتة، التقصف الهيدروجيني)',
          'معاينة وتقييم حالة قيعان الخزانات البترولية وجدرانها طبقاً لـ API 653 ومخاطر التسريب',
          'اعتماد أعمال الإصلاح والتعديل على الساخن (Hot Tapping & Weld Overlays) طبقاً لـ ASME PCC-2'
        ],
        responsibilitiesEn: [
          'Calculate minimum required design wall thickness (t_min) for shells, heads, and nozzles per ASME Sec VIII',
          'Compute short-term and long-term corrosion rates and define next statutory inspection interval',
          'Identify active degradation modes per API 571 (Corrosion Under Insulation CUI, Sulfidation, HIC, Creep)',
          'Inspect storage tank bottom plate settlement, annular rings, and shell thinning per API 653',
          'Approve permanent and temporary engineered weld repairs according to ASME PCC-2'
        ],
        modules: [
          {
            id: 'mod_api_1',
            titleAr: 'الوحدة 1: حسابات السماكة والتآكل والعمر المتبقي',
            titleEn: 'Module 1: Wall Thickness, Corrosion Rates & Remaining Life',
            duration: '40 ساعة دراسات حالة عملية',
            topicsAr: [
              'معادلة حساب سماكة أسطوانة وعاء الضغط تحت ضغط داخلي طبقاً لـ ASME Sec VIII UG-27',
              'حساب معدل التآكل: CR = (t_previous - t_actual) / Years',
              'حساب العمر الافتراضي المتبقي: Remaining Life = (t_actual - t_min) / CR',
              'تحديد فترة الفحص الدوري بحيث لا تتجاوز نصف العمر المتبقي أو 10 سنوات (أيهما أقل)'
            ],
            topicsEn: [
              'ASME Section VIII Div 1 UG-27 cylindrical shell minimum thickness formula',
              'Corrosion rate computation: Short-term vs long-term rate calculation methodology',
              'Remaining structural life formula: RL = (t_actual - t_min) / Corrosion Rate',
              'Establishing maximum statutory inspection interval: half remaining life or 10 years rule'
            ],
            learningOutcomesAr: [
              'حساب العمر المتبقي بدقة متناهية واتخاذ قرار استمرار المعدة بالخدمة بأمان',
              'حماية المنشأة من الانفجارات والحوادث الكارثية'
            ],
            learningOutcomesEn: [
              'Accurately predict component retirement date and ensure safe uninterrupted operation',
              'Prevent catastrophic pressurized loss-of-containment disasters'
            ]
          }
        ],
        keyFormulas: [
          {
            nameAr: 'حساب السماكة الأدنى المطلوبة لوعاء ضغط أسطواني (ASME UG-27)',
            nameEn: 'ASME Section VIII Div 1 UG-27 Shell Formula',
            formula: 't_min = (P × R) / (S × E - 0.6 × P)',
            descriptionAr: 'حيث P ضغط التصميم (psi أو bar)، R نصف القطر الداخلي (بوصة أو ملم)، S أقصى إجهاد مسموح للمعدن، E كفاءة وصلة اللحام (Joint Efficiency).',
            descriptionEn: 'P = internal design pressure, R = internal radius, S = allowable stress value, E = joint efficiency (1.0 for full RT, 0.85 for spot RT).'
          },
          {
            nameAr: 'حساب العمر التشغيلي المتبقي للمعدة',
            nameEn: 'API Remaining Life Formula',
            formula: 'Remaining Life (Years) = (t_actual - t_min) / Corrosion Rate',
            descriptionAr: 'يحدد عدد السنوات المتبقية حتى تصل سماكة الجدار إلى الحد الأدنى التصميمي الخطر.',
            descriptionEn: 'Determines the operational runway in years before wall thickness reaches critical retirement limit.'
          }
        ],
        practicalSkillsChecklist: [
          { skillAr: 'حساب t_min وعمر تشغيلي لوعاء ضغط بضغط 25 بار ومعدل تآكل 0.3 ملم/سنة', skillEn: 'Calculate t_min and remaining life for a 25 bar vessel with 0.3mm/yr corrosion', importance: 'mandatory' },
          { skillAr: 'تفتيش أنبوب معزول للبحث عن التآكل تحت العازل CUI وتحديد نقاط التفتيش الحرجة', skillEn: 'Execute CUI inspection survey on insulated piping and identify corrosion circuits', importance: 'mandatory' },
          { skillAr: 'تقييم نتائج مسح قاع خزان بترولي بجهاز تسرب الفيض المغناطيسي MFL', skillEn: 'Evaluate MFL tank floor bottom scan data and mark floor plates needing replacement', importance: 'mandatory' }
        ]
      }
    ]
  },

  // 6. فحص الدهانات والطلاء ومكافحة التآكل (Coating & Corrosion)
  {
    id: 'coating_corrosion',
    titleAr: 'فحص الدهانات والطلاء ومكافحة التآكل الصناعي (Protective Coating & Corrosion Control)',
    titleEn: 'Protective Coating, Blasting & Corrosion Inspection (NACE / AMPP / SSPC / FROSIO)',
    category: 'coating',
    badgeColor: 'yellow',
    overviewAr: 'حماية المنشآت المعدنية والمنصات البحرية وخطوط الأنابيب من التآكل الكهروكيميائي والظروف البيئية القاسية. يشمل فحص تجهيز الأسطح، الظروف الجوية، وسماكة الطلاء الجاف وخلوه من الثقوب المجهرية.',
    overviewEn: 'Shielding structural steel, marine assets, and pipelines from aggressive electrochemical degradation. Encompasses surface preparation, climatic dew-point monitoring, DFT verification, and holiday testing.',
    keyTechniques: ['Abrasive Blast Cleaning (Grit/Garnet)', 'Climatic Dew Point Testing', 'Surface Profile Measurement (Testex)', 'DFT Magnetic Gauging (SSPC-PA 2)', 'High/Low Voltage Holiday Detection'],
    globalAccreditations: ['NACE CIP Level 1/2/3 (AMPP)', 'SSPC PCI', 'FROSIO Level III', 'ISO 8501-1 / ISO 12944'],
    targetIndustries: ['Offshore Rigs', 'Marine Vessels', 'Petrochemical Plants', 'Cross-Country Pipelines', 'Water Desalination Tanks'],
    levels: [
      {
        levelId: 'inspector',
        nameAr: 'مفتش دهانات وحماية كاثودية معتمد (NACE CIP / FROSIO Inspector)',
        nameEn: 'Certified Coating Inspector (NACE CIP Level 1/2 / FROSIO)',
        targetRoleAr: 'فحص درجات نظافة السطح (Sa 2.5/Sa 3)، مراقبة نقطة الندى، فحص سماكة الطلاء الرطب والجاف والالتصاق',
        targetRoleEn: 'Inspect surface cleanliness, monitor psychrometric dew point, measure WFT/DFT, detect holidays',
        prerequisitesAr: 'معرفة بأنظمة الطلاء الصناعية واجتياز دورة وامتحانات NACE / AMPP أو FROSIO المعتمدة',
        prerequisitesEn: 'Knowledge of industrial protective systems, passing AMPP CIP Level 1/2 or FROSIO qualification exams',
        trainingHours: 60,
        experienceMonths: 18,
        internationalCerts: ['AMPP (NACE) CIP Level 1', 'AMPP (NACE) CIP Level 2', 'FROSIO Level III Inspector'],
        applicableCodes: ['SSPC-SP 10 / ISO 8501-1 Sa 2.5', 'SSPC-PA 2', 'ASTM D4417', 'ASTM D3359', 'ISO 12944'],
        responsibilitiesAr: [
          'قياس العوامل المناخية: درجة حرارة الهواء، الرطوبة النسبية RH%، درجة حرارة السطح، ونقطة الندى Dew Point',
          'تطبيق قاعدة الـ 3 درجات مئوية: التأكد من أن درجة حرارة المعدن أعلى من نقطة الندى بـ 3 درجات مئوية على الأقل',
          'فحص درجة نظافة السطح ومقارنتها بالصور المرجعية القياسية (Sa 2.5 Near-White Metal Blast)',
          'قياس خشونة السطح المجهرية (Surface Profile Depth) باستخدام شريط الاختبار Testex Tape (50-75 µm)',
          'قياس سماكة الطلاء الجاف (DFT) طبقاً لقاعدة 80/20 وفقاً لمواصفة SSPC-PA 2'
        ],
        responsibilitiesEn: [
          'Measure psychrometric weather parameters: Ambient Temp, Relative Humidity %, Steel Surface Temp, Dew Point',
          'Enforce the 3°C delta rule: Steel surface temperature must be at least 3°C above dew point to avoid moisture',
          'Assess blast cleanliness visually against standard ISO 8501-1 photographic rust grades (Sa 2.5)',
          'Measure blast anchor profile depth using Testex replica tape and spring micrometer (50-75 µm target)',
          'Verify Dry Film Thickness (DFT) with magnetic gauges enforcing the SSPC-PA 2 80/20 rule'
        ],
        modules: [
          {
            id: 'mod_coat_1',
            titleAr: 'الوحدة 1: فيزياء السطح والعوامل الجوية والتآكل',
            titleEn: 'Module 1: Surface Physics, Climatic Limits & Corrosion',
            duration: '30 ساعة تدريب عملي',
            topicsAr: [
              'آلية التآكل الكهروكيميائي: المصعد والمهبط والإلكتروليت والدائرة الكهربائية',
              'استخدام مقياس الحرارة الدوار (Sling Psychrometer) وجداول نقطة الندى',
              'فحص تلوث السطح بالأملاح القابلة للذوبان (Bresle Patch Test) لمنع التقرح التناضحي (Osmotic Blistering)',
              'أنواع الطلاءات: الإيبوكسي (Epoxy)، البولي يوريثين (Polyurethane)، والزنك العضوي وغير العضوي'
            ],
            topicsEn: [
              'Electrochemical corrosion cell mechanisms: Anode, Cathode, Electrolyte, and Metallic path',
              'Operating whirling sling psychrometer and psychrometric dew point calculation charts',
              'Testing surface soluble salt contamination using Bresle patch method to prevent osmotic blistering',
              'Industrial coating chemistries: Inorganic Zinc rich primer, High build Epoxy, UV-resistant Polyurethane'
            ],
            learningOutcomesAr: [
              'منع فشل الطلاء والتقشير والصدأ تحت الطلاء من خلال ضبط شروط التطبيق',
              'حساب الكميات وتحديد سماكة الطلاء المطلوبة بدقة'
            ],
            learningOutcomesEn: [
              'Prevent premature coating failures, delamination, and under-film rust through strict climatic control',
              'Calculate theoretical and practical coating consumption and required wet film thickness'
            ]
          }
        ],
        keyFormulas: [
          {
            nameAr: 'العلاقة بين سماكة الطلاء الرطب (WFT) وسماكة الطلاء الجاف (DFT)',
            nameEn: 'Wet Film vs Dry Film Thickness Formula',
            formula: 'DFT = WFT × (% Volume Solids / 100)',
            descriptionAr: 'يستخدمها الفني أثناء الرش للتأكد من أن سماكة الطلاء الرطب ستعطي السماكة الجافة المطلوبة بعد تبخر المذيب.',
            descriptionEn: 'Used on site with wet film comb to ensure target dry thickness after volatile solvent evaporation.'
          },
          {
            nameAr: 'قاعدة فحص نقطة الندى الإلزامية قبل الرش',
            nameEn: 'Climatic Condensation Delta Rule',
            formula: 'T_steel ≥ T_dewpoint + 3°C',
            descriptionAr: 'شرط صارم عالمياً: يمنع منعاً باتاً بدء أعمال السفع بالرمال أو رش الطلاء إذا كان الفارق أقل من 3 درجات مئوية.',
            descriptionEn: 'Absolute international rule: Blasting and coating are strictly prohibited if steel temp is within 3°C of dew point.'
          }
        ],
        practicalSkillsChecklist: [
          { skillAr: 'استخدام جهاز قياس رطوبة رقمي لتحديد نقطة الندى وفحص شرط الـ +3 درجات مئوية', skillEn: 'Measure climatic dew point with digital gauge and verify the +3°C safety delta', importance: 'mandatory' },
          { skillAr: 'ضغط شريط تيستكس Testex X-Coarse على سطح مسفوع وقياس عمق الخشونة بالميكروميتر', skillEn: 'Burnish Testex X-Coarse tape on blasted steel and measure anchor profile with micrometer', importance: 'mandatory' },
          { skillAr: 'إجراء معايرة نقطية لجهاز DFT الرقمي وتطبيق قاعدة 80/20 على 5 مساحات فحص', skillEn: 'Calibrate digital DFT gauge on smooth shim and apply SSPC-PA 2 80/20 rule on 5 spot areas', importance: 'mandatory' }
        ]
      }
    ]
  },

  // 7. إدارة وتوكيد الجودة وضبط الجودة (QA/QC Management & Vendor Inspection)
  {
    id: 'qa_qc',
    titleAr: 'إدارة وتوكيد وضبط الجودة الصناعية (QA/QC Management & Auditing)',
    titleEn: 'Industrial QA/QC Management, ITP Systems & Auditing (ISO 9001 / CQI-IRCA)',
    category: 'quality',
    badgeColor: 'indigo',
    overviewAr: 'المنظومة الإدارية والهندسية الحاكمة لجودة التصنيع والتركيب في المشاريع الكبرى. تشمل إعداد خطط الفحص والاختبار (ITP)، التحقيق في حالات عدم المطابقة (NCR)، ومراقبة الموردين والمصنعين (Vendor Inspection).',
    overviewEn: 'The executive engineering framework governing manufacturing and erection compliance. Develops Inspection & Test Plans (ITP), manages Non-Conformance Reports (NCR), and executes vendor surveillance.',
    keyTechniques: ['Inspection & Test Plans (ITP)', 'Non-Conformance Reports (NCR)', 'Vendor Shop Surveillance', 'MTR Traceability Auditing', 'Root Cause Analysis (5 Whys / Ishikawa)'],
    globalAccreditations: ['CQI-IRCA Lead Auditor (ISO 9001:2015)', 'ASQ Certified Quality Engineer (CQE)', 'ISO 17020 / ISO 17025'],
    targetIndustries: ['EPC Mega Projects', 'Pressure Equipment Fabrication', 'Pipeline Construction', 'Heavy Infrastructure', 'Turbine Manufacturing'],
    levels: [
      {
        levelId: 'senior',
        nameAr: 'مدير جودة ومراجع معتمد (QA/QC Manager & IRCA Lead Auditor)',
        nameEn: 'QA/QC Quality Director & IRCA Lead Auditor',
        targetRoleAr: 'تصميم خطط الجودة للمشروع، إقرار نقاط التوقف والمشاهدة (Hold & Witness points)، إغلاق الـ NCR، تسليم ملف الجودة النهائي (Final Dossier)',
        targetRoleEn: 'Develop Project Quality Plans, establish Hold & Witness gates, resolve NCRs, compile handover dossiers',
        prerequisitesAr: 'بكالوريوس هندسة مع خبرة لا تقل عن 7 سنوات في إدارة جودة المشاريع البترولية مع شهادة كبير مراجعين IRCA معتمدة',
        prerequisitesEn: 'B.Sc. Engineering with 7+ yrs EPC QA/QC leadership, holding certified CQI-IRCA Lead Auditor credentials',
        trainingHours: 80,
        experienceMonths: 84,
        internationalCerts: ['IRCA ISO 9001:2015 Lead Auditor', 'ASQ Certified Quality Manager (CQM/OE)'],
        applicableCodes: ['ISO 9001:2015', 'ISO 17025', 'ASME Section VIII Div 1', 'ISO 3834-2'],
        responsibilitiesAr: [
          'إعداد خطة الفحص والاختبار التفصيلية (ITP) متضمنة نقاط: Hold, Witness, Review, Monitor',
          'إدارة ومعالجة تقارير عدم المطابقة (NCR) وتحديد الأسباب الجذرية والإجراءات التصحيحية (CAPA)',
          'التدقيق على مصانع الموردين وتتبع شهادات المعادن وأرقام الصب (Heat Numbers & Traceability)',
          'إجراء التدقيق الداخلي (Internal Audits) وتجهيز المنشأة لتدقيقات الآيزو الدورية',
          'تجميع واعتماد ملف الجودة النهائي للمشروع (Final Quality Dossier / Mechanical Completion Book)'
        ],
        responsibilitiesEn: [
          'Formulate comprehensive Inspection and Test Plans (ITP) defining Hold, Witness, Review and Monitor gates',
          'Govern Non-Conformance Reports (NCR) driving Corrective and Preventive Actions (CAPA)',
          'Conduct vendor surveillance audits verifying raw material heat numbers and mill certificate traceability',
          'Lead corporate internal quality audits ensuring continuous adherence to ISO 9001 and ISO 17025 systems',
          'Review and approve final manufacturer data records (MDR / Mechanical Completion Dossier)'
        ],
        modules: [
          {
            id: 'mod_qa_1',
            titleAr: 'الوحدة 1: تصميم وتطبيق خطط الفحص والاختبار (ITP)',
            titleEn: 'Module 1: ITP Architecture & Inspection Point Governance',
            duration: '40 ساعة تدريبية استشارية',
            topicsAr: [
              'هيكلة الـ ITP وربطها بالمواصفات التعاقدية وأكواد ASME و AWS و API',
              'الفرق بين نقطة التوقف الإلزامية (Hold Point) ونقطة المشاهدة (Witness Point) ونقطة المراجعة (Review)',
              'إجراءات تسليم إخطارات التفتيش الرسمية (Request For Inspection - RFI)',
              'إدارة المواد وفحص الاستلام الموقعي (Material Receiving Inspection - MRI)'
            ],
            topicsEn: [
              'ITP development mapped directly against project contracts, client specs, and ASME/AWS/API standards',
              'Critical differentiation between Hold (mandatory stop), Witness, Review, and Surveillance inspection gates',
              'Standardized workflow for Request For Inspection (RFI) notices submitted to owner inspectors',
              'Material Receiving Inspection (MRI) protocols and positive material identification (PMI) oversight'
            ],
            learningOutcomesAr: [
              'منع أي تجاوز هندسي في مراحل التصنيع وضمان الصفر في إعادة العمل (Zero Re-work)',
              'إعداد ملفات جودة تحوز موافقة العميل والاستشاري دون تحفظات'
            ],
            learningOutcomesEn: [
              'Eliminate uninspected steps and drive fabrication toward zero-rework milestones',
              'Compile unchallengeable quality dossiers passed by the most rigorous client auditors'
            ]
          }
        ],
        practicalSkillsChecklist: [
          { skillAr: 'صياغة ITP كامل لتصنيع وعاء ضغط أسطواني بـ 15 مرحلة تفتيشية مع نقاط Hold صريحة', skillEn: 'Draft comprehensive 15-stage pressure vessel fabrication ITP with designated Hold points', importance: 'mandatory' },
          { skillAr: 'إجراء تحليل السبب الجذري (Root Cause Analysis - 5 Whys) لتقرير NCR شروخ متكررة باللحام', skillEn: 'Perform 5-Whys Root Cause Analysis on recurring weld crack NCR and prescribe CAPA', importance: 'mandatory' },
          { skillAr: 'مطابقة شهادة ميتالورجية EN 10204 3.1 مع رقم الصب المطبوع على لوح صلب بالورقة والميكروسكوب', skillEn: 'Cross-check EN 10204 3.1 MTR against stamped plate heat number ensuring 100% traceability', importance: 'mandatory' }
        ]
      }
    ]
  },

  // 8. فحص الوصول بالحبال وسلامة الأصول (Rope Access & Asset Integrity)
  {
    id: 'asset_integrity_rope',
    titleAr: 'سلامة الأصول والفحص بالوصول بالحبال (Asset Integrity & IRATA Rope Access)',
    titleEn: 'Asset Integrity Management & Industrial Rope Access (IRATA / ISO 22846)',
    category: 'asset_integrity',
    badgeColor: 'emerald',
    overviewAr: 'تنفيذ كافة تقنيات الفحص المتقدمة والمعالجة الحرارية على ارتفاعات شاهقة وفي الأماكن المحصورة والصعبة والمنصات البحرية باستخدام أحدث نظم الحبال الآمنة والمعتمدة عالمياً من IRATA.',
    overviewEn: 'Deploying advanced NDT and inspection methodologies at extreme heights, offshore flare stacks, and confined spaces using internationally accredited IRATA rope access systems.',
    keyTechniques: ['IRATA Level 1/2/3 Rigging', 'Offshore Flare Tip Inspection', 'Confined Space NDT', 'Wind Turbine Blade Testing', 'High-Angle Rescue Planning'],
    globalAccreditations: ['IRATA International Level 1, 2, 3', 'ISO 22846-1/2', 'SPRAT'],
    targetIndustries: ['Offshore Drilling Platforms', 'LNG Flare Towers', 'Wind Energy Turbines', 'Suspension Bridges', 'Storage Sphere Vessels'],
    levels: [
      {
        levelId: 'senior',
        nameAr: 'مشرف وصول بالحبال ومفتش سلامة أصول (IRATA Level 3 Safety Supervisor)',
        nameEn: 'IRATA Level 3 Rope Access Supervisor & Lead Inspector',
        targetRoleAr: 'تصميم أنظمة التثبيت والتسلق الآمن، خطط الإنقاذ على ارتفاعات، الإشراف على فرق الفحص غير الإتلافي المعلقة',
        targetRoleEn: 'Design complex rigging systems, lead high-angle rescue drills, supervise suspended NDT inspection teams',
        prerequisitesAr: 'اجتياز مستويات IRATA 1 و 2 مع 1000 ساعة مسجلة في دفتر المهام لكل مستوى واجتياز تقييم الممتحن المستقل',
        prerequisitesEn: 'Hold valid IRATA Level 1 & 2 with minimum 1000 logged rope hours per level, passing independent assessor exam',
        trainingHours: 40,
        experienceMonths: 24,
        internationalCerts: ['IRATA Level 3 Safety Supervisor', 'First Aid at Height'],
        applicableCodes: ['IRATA International Code of Practice (ICOP)', 'ISO 22846', 'OSHA 1910'],
        responsibilitiesAr: [
          'إجراء تقييم المخاطر الميداني (Job Hazard Analysis - JHA) وطريقة العمل الآمنة (RAMS)',
          'فحص وتجهيز نقاط التثبيت الرئيسية (Rigging for Rescue & Anchor Points)',
          'الإشراف المباشر على فنيي الفحص بالموجات فوق الصوتية والجسيمات المغناطيسية أثناء التعليق بالحبال',
          'تنفيذ خطط الإنقاذ المعقدة من على ارتفاعات شاهقة في زمن لا يتجاوز 5 دقائق'
        ],
        responsibilitiesEn: [
          'Conduct comprehensive site Job Hazard Analysis (JHA) and Risk Assessment Method Statements (RAMS)',
          'Select, verify, and rig primary and backup anchor systems with pre-rigged rescue capabilities',
          'Provide on-rope direct supervision for suspended NDT ultrasonic and electromagnetic technicians',
          'Execute high-angle complex rescue maneuvers within critical 5-minute suspension trauma thresholds'
        ],
        modules: [
          {
            id: 'mod_rope_1',
            titleAr: 'الوحدة 1: السلامة الهندسية والحبال وأنظمة التثبيت المتقدمة',
            titleEn: 'Module 1: High-Angle Rigging, Mechanical Advantage & Rescue',
            duration: '35 ساعة عملية وميدانية',
            topicsAr: [
              'ميكانيكا القوى وزوايا التثبيت (Y-Hang Angles) ومضاعفة القوة الحركية (Mechanical Advantage 3:1 & 5:1)',
              'مخاطر صدمة التعليق (Suspension Trauma / Orthostatic Intolerance) وكيفية التعامل معها',
              'استخدام أجهزة الفحص المدمجة المحمولة على الحزام (Harness-integrated NDT gear)',
              'إجراءات الطوارئ والإنقاذ على شعلات حقول الغاز الطبيعي والمنصات البحرية'
            ],
            topicsEn: [
              'Physics of load distribution, Y-hang rigging angles, and mechanical advantage hauling systems (3:1, 5:1)',
              'Suspension trauma pathology, harness foot-loops, and rapid emergency intervention protocols',
              'Operating lightweight battery-powered flaw detectors and eddy current gear while suspended',
              'High-temperature flare tip rescue maneuvers on offshore drilling and processing platforms'
            ],
            learningOutcomesAr: [
              'الوصول لأي نقطة تفتيشية مستحيلة دون الحاجة لسقالات باهظة الثمن',
              'ضمان سلامة 100% للفريق الفاحص على ارتفاعات تصل لـ 150 متراً'
            ],
            learningOutcomesEn: [
              'Reach inaccessible inspection targets safely without erecting costly multi-million dollar scaffolding',
              'Guarantee 100% zero-incident safety track record on heights exceeding 150 meters'
            ]
          }
        ],
        practicalSkillsChecklist: [
          { skillAr: 'تركيب نظام تثبيت بحبال مزدوجة بنظام إنقاذ مسبق Rig-for-rescue وحماية الحواف من الاحتكاك', skillEn: 'Rig twin-rope system with pre-rigged rescue and edge protection friction guards', importance: 'mandatory' },
          { skillAr: 'تنفيذ محاكاة إنقاذ لزميل فاحص فاقد للوعي على الحبال وإنزاله للأرض بأمان خلال 4 دقائق', skillEn: 'Execute full rescue of unconscious suspended technician lowering to ground within 4 min', importance: 'mandatory' }
        ]
      }
    ]
  }
];

export const WORKSHOP_LABS = [
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
