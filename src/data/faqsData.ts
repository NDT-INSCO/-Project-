import { FAQItem } from '../types';

export const COMMON_FAQS: FAQItem[] = [
  {
    id: 'pwht-power-requirements',
    category: 'pwht',
    categoryLabel: {
      ar: 'المعالجة الحرارية (PWHT)',
      en: 'Heat Treatment (PWHT)'
    },
    question: {
      ar: 'ما هي متطلبات الطاقة الكهربائية والموقع اللازمة لتشغيل وحدات المعالجة الحرارية 65 kW؟',
      en: 'What power supply and site requirements are needed for INSCO 65 kW heat treatment units?'
    },
    shortAnswer: {
      ar: 'تتطلب وحدات المعالجة الحرارية مصدر تيار ثلاثي الأوجه (380V - 440V / 50-60Hz) بقدرة 65–70 kVA، أو يمكننا توفير مولدات ديزل متنقلة مجهزة بالكامل.',
      en: 'Units require a 3-phase power supply (380V-440V, 50-60Hz) rated at 65-70 kVA, or INSCO can mobilize fully-equipped portable diesel generators.'
    },
    detailedAnswer: {
      ar: 'وحدات المعالجة الحرارية الأوتوماتيكية بقوة 65 kW المملوكة لشركة إنسكو مصممة للعمل في مختلف البيئات الصناعية القاسية (المصافي، محطات التوليد، خطوط الأنابيب الصحراوية). تتضمن كل وحدة محولاً خافضاً للجهد (Step-down transformer) يحول التيار إلى جهد آمن (65V/85V) لتغذية وسادات السيراميك المرنة (FCPs). كما تشتمل على مسجلات حرارة رقمية دقيقة مجهزة بمعايرة معتمدة ومزدوجات حرارية (K-Type Thermocouples) توزع بدقة على خط اللحام والمناطق المجاورة.',
      en: 'INSCO company-owned 65 kW automatic heat treatment units are engineered for demanding field conditions (refineries, power plants, desert pipeline spreads). Each unit features an isolated step-down transformer supplying low secondary operating voltages (65V/85V) for flexible ceramic pads (FCPs). Complete with calibrated multi-channel chart recorders and K-type thermocouples attached precisely along weld joints and heat-affected zones.'
    },
    keyTakeaways: {
      ar: [
        'مصدر كهربائي 380-440V ثلاثي الأطوار أو مولد متنقل خاص بشركة إنسكو',
        'جهد تشغيلي آمن 65V/85V للوسادات السيراميكية يضمن سلامة الكوادر',
        'مسجلات حرارية رقمية معتمدة مع شهادات معايرة سنوية سارية'
      ],
      en: [
        '380-440V 3-phase supply or INSCO-mobilized site generator',
        '65V/85V safe secondary pad voltage ensuring worker safety',
        'Calibrated multi-channel digital chart recorders with traceable certificates'
      ]
    },
    applicableCodes: ['ASME B31.3', 'ASME Section VIII Div 1', 'BS EN ISO 17663'],
    relatedMethodCode: 'PWHT',
    frequencyBadge: {
      ar: 'استفسار متكرر جداً ⭐',
      en: 'High Frequency ⭐'
    },
    tags: ['PWHT', 'Power', 'ASME B31.3', 'Electrical', '65 kW']
  },
  {
    id: 'paut-vs-rt',
    category: 'volumetric',
    categoryLabel: {
      ar: 'الفحوصات الحجمية (Volumetric NDT)',
      en: 'Volumetric Testing'
    },
    question: {
      ar: 'هل يمكن استبدال الفحص الإشعاعي (RT) بفحص الموجات فوق الصوتية الطورية (PAUT) لتجنب إخلاء الموقع؟',
      en: 'Can Phased Array Ultrasonic Testing (PAUT) replace Radiography (RT) to eliminate plant shutdowns?'
    },
    shortAnswer: {
      ar: 'نعم، معتمد دولياً طبقاً لـ ASME Code Case 2235 و ASME Sec VIII Div 1 & 2، حيث يوفر فحصاً حجمياً عالي الدقة دون أي إشعاع نووي أو توقف للمصنع.',
      en: 'Yes, fully recognized under ASME Code Case 2235 and ASME Section VIII. PAUT provides high-resolution volumetric imaging with zero radiation hazard and zero site evacuation.'
    },
    detailedAnswer: {
      ar: 'يعد فحص PAUT بالتعاون مع TOFD البديل الأحدث والأكثر أماناً للفحص الإشعاعي في المواقع النفطية الحية. بفضل خلوه التام من المواد المشعة، يمكن لأعمال التركيبات واللحامات المجاورة الاستمرار دون الحاجة لإخلاء العمال أو الانتظار لساعات الليل. كما يوفر PAUT قياساً دقيقاً ثلاثي الأبعاد لعمق وارتفاع العيب (Flaw Height & Depth Sizing)، وتخزيناً رقمياً مشفراً غير قابل للتلاعب لجميع البيانات.',
      en: 'PAUT (often combined with TOFD) is the premier non-hazardous alternative to conventional isotope RT in operating facilities. With zero ionizing radiation, hot work and surrounding construction continue without work halts or mandatory perimeter evacuations. PAUT additionally delivers precise 3D flaw depth and through-wall height sizing with fully encoded, auditable digital records.'
    },
    keyTakeaways: {
      ar: [
        'انعدام مخاطر الإشعاع بالكامل (Zero Radiation Hazard)',
        'استمرار أعمال البناء والتركيب في الموقع دون انقطاع',
        'تحديد دقيق لارتفاع وعمق العيوب في اللحامات السميكة والرقيقة'
      ],
      en: [
        'Zero radiation hazard, 100% safe for simultaneous plant activities',
        'Continuous production without nighttime work constraints',
        'Superior volumetric sizing and encoded digital archival records'
      ]
    },
    applicableCodes: ['ASME Code Case 2235', 'ASME Sec V Art. 4', 'API 1104 App. IV'],
    relatedMethodCode: 'PAUT',
    frequencyBadge: {
      ar: 'الأكثر طلباً للشركات الكبرى',
      en: 'Top Enterprise Request'
    },
    tags: ['PAUT', 'RT', 'ASME 2235', 'Radiation Free', 'Zero Evacuation']
  },
  {
    id: 'mobilization-turnaround',
    category: 'mobilization',
    categoryLabel: {
      ar: 'التعبئة وسرعة الاستجابة',
      en: 'Mobilization & Readiness'
    },
    question: {
      ar: 'ما هي سرعة استجابة وتعبئة فرق إنسكو للمواقع الطارئة أو توقفات الصيانة المفاجئة (Emergency Shutdowns)؟',
      en: 'How fast can INSCO mobilize crews and equipment for emergency shutdowns or urgent work?'
    },
    shortAnswer: {
      ar: 'تعبئة فورية خلال 24 إلى 48 ساعة في كافة أنحاء جمهورية مصر العربية، مع جاهزية فرق طوارئ مخصصة للتحرك السريع على مدار 24/7.',
      en: 'Immediate mobilization within 24 to 48 hours nationwide across Egypt, with 24/7 on-call emergency response crews ready for rapid deployment.'
    },
    detailedAnswer: {
      ar: 'تمتلك شركة إنسكو أسطولاً متكاملاً ومملوكاً بالكامل من المعدات وسيارات الخدمة الميدانية، ومستودعات مركزية في القاهرة والدلتا والسويس والإسكندرية. هذا الاستقلال الكامل عن الاستئجار من أطراف ثالثة يتيح لنا تجهيز الفنيين المعتمدين والمعدات وشهادات المعايرة خلال ساعات معدودة من استلام أمر التكليف الرسمي (Work Order / LOI).',
      en: 'INSCO maintains a comprehensive, 100% company-owned equipment fleet and strategic operational hubs serving Cairo, Suez Canal, Delta, Alexandria, and Upper Egypt. Complete independence from third-party rental equipment enables us to dispatch certified technicians, calibrated instruments, and consumable packages within hours of official work order release.'
    },
    keyTakeaways: {
      ar: [
        'جاهزية فورية على مدار الساعة (24/7 On-Call Support)',
        'معدات مملوكة بالكامل دون انتظار تأجير من أطراف خارجية',
        'تغطية جغرافية شاملة لمحطات الطاقة، المصافي، والحقول البترولية'
      ],
      en: [
        '24/7 round-the-clock emergency mobilization readiness',
        'Fully company-owned fleet eliminating external rental bottlenecks',
        'Nationwide reach covering refineries, offshore terminals, and power plants'
      ]
    },
    applicableCodes: ['ISO 9001:2015', 'Company Emergency Procedures'],
    relatedMethodCode: 'PWHT',
    frequencyBadge: {
      ar: 'استفسار متكرر جداً ⭐',
      en: 'High Frequency ⭐'
    },
    tags: ['Mobilization', 'Emergency', '24/7', 'Turnaround', 'Fleet']
  },
  {
    id: 'inspector-certifications',
    category: 'compliance',
    categoryLabel: {
      ar: 'الاعتمادات ومؤهلات الكوادر',
      en: 'Accreditations & Qualifications'
    },
    question: {
      ar: 'ما هي الشهادات والمؤهلات المهنية التي يحملها مهندسو وفاحصو شركة إنسكو؟',
      en: 'What certifications and credentials do INSCO inspection engineers hold?'
    },
    shortAnswer: {
      ar: 'جميع الكوادر مؤهلة ومعتمدة رسمياً وفق معايير ASNT SNT-TC-1A و ISO 9712 للمستويات الأول والثاني والثالث (Level I, II, III).',
      en: 'All inspection personnel are formally certified per ASNT SNT-TC-1A and ISO 9712 Level I, II, and Level III standards.'
    },
    detailedAnswer: {
      ar: 'تخضع كوادر إنسكو الفنية لبرنامج تأهيل وتدريب دوري صارم بإشراف مباشر من فاحصين استشاريين معتمدين بالمستوى الثالث (ASNT NDT Level III). كل فاحص يحمل ملف اعتماد مهني يشمل سجل ساعات الفحص، شهادات الكفاءة النظرية والعملية، وفحص حدة البصر وتفريق الألوان سنوي طبقاً لـ Jaeger 1. بالإضافة لترخيص مسؤولي الحماية من الإشعاع (RPO) الصادر عن هيئة الرقابة النووية والإشعاعية (ENRRA).',
      en: 'INSCO technicians undergo rigorous continuous training overseen directly by in-house ASNT NDT Level III consultants. Each inspector holds a complete qualification docket including certified logged field hours, theoretical/practical test records, and annual Jaeger 1 / Ishihara visual acuity certifications, plus ENRRA-certified Radiation Protection Officer licenses.'
    },
    keyTakeaways: {
      ar: [
        'اعتمادات ASNT SNT-TC-1A و ISO 9712 للمستويات II و III',
        'تراخيص تشغيل إشعاعي سارية من هيئة الرقابة النووية والإشعاعية (ENRRA)',
        'نظام إدارة جودة معتمد وفق ISO 9001 و 14001 و 45001 سارٍ حتى 2028'
      ],
      en: [
        'ASNT SNT-TC-1A & ISO 9712 Level II and Level III credentials',
        'Valid ENRRA radiation operating and safety licenses',
        'Certified ISO 9001/14001/45001 integrated management systems valid to 2028'
      ]
    },
    applicableCodes: ['ASNT SNT-TC-1A', 'ISO 9712', 'ENRRA Radiation Regs'],
    relatedMethodCode: 'UT',
    tags: ['Certifications', 'ASNT', 'ISO 9712', 'ENRRA', 'Level III']
  },
  {
    id: 'calibration-traceability',
    category: 'compliance',
    categoryLabel: {
      ar: 'الاعتمادات ومؤهلات الكوادر',
      en: 'Accreditations & Qualifications'
    },
    question: {
      ar: 'هل تُرفق تقارير الفحص بشهادات معايرة سارية للأجهزة ووسائل التسجيل الحراري؟',
      en: 'Are inspection reports accompanied by traceable calibration certificates for all instruments?'
    },
    shortAnswer: {
      ar: 'نعم، كل جهاز أو مجس أو مسجل حراري مستخدم في الموقع مصحوب بشهادة معايرة معتمدة وسارية قابلة للتتبع دولياً (NIST / National Standards).',
      en: 'Yes, every instrument, probe, and temperature recorder deployed on-site is accompanied by valid, traceable calibration certificates.'
    },
    detailedAnswer: {
      ar: 'تتضمن حزمة تسليم العمل (Job Pack) لكل مشروع صناعي: شهادات معايرة أجهزة كشف العيوب بالموجات فوق الصوتية، قوالب المعايرة (IIW Type 1 & 2 / ASME Cal Blocks)، مسجلات الحرارة الرقمية متعددة القنوات، أجهزة قياس الكثافة الضوئية (Densitometers)، وأجهزة قياس الضوء ومغناطيسية الحواضن (Yokes / Gaussmeters). تُقدم هذه الشهادات لمهندسي الطرف الثالث (TPI) وجهات الاعتماد قبل بدء العمل.',
      en: 'The project Quality Dossier includes valid calibration certificates for all ultrasonic flaw detectors, reference calibration blocks (IIW Type 1 & 2, ASME blocks), digital multi-channel temperature chart recorders, optical film densitometers, lux meters, and magnetic yokes/field indicators. All documentation is made available for Third-Party Inspection (TPI) client review prior to task commencement.'
    },
    keyTakeaways: {
      ar: [
        'شهادات معايرة دورية معتمدة لكل جهاز قبل النزول للميدان',
        'تضمين الشهادات في الملف الهندسي النهائي (Quality Dossier)',
        'التوافق الكامل مع متطلبات شركات التفتيش الدولية (TPI) واستشاريي المشاريع'
      ],
      en: [
        'Periodic accredited calibration for all equipment prior to dispatch',
        'Full calibration certificates included in the technical close-out dossier',
        '100% compliance with client TPI and code specifications'
      ]
    },
    applicableCodes: ['ISO 10012', 'ASME Section V Art. 1', 'NIST Traceability'],
    relatedMethodCode: 'UT',
    tags: ['Calibration', 'Traceability', 'TPI', 'QA/QC', 'Certificates']
  },
  {
    id: 'mt-vs-pt-selection',
    category: 'surface',
    categoryLabel: {
      ar: 'الفحوصات السطحية (Surface NDT)',
      en: 'Surface Testing'
    },
    question: {
      ar: 'كيف أختار بين الفحص بالجزيئات المغناطيسية (MT) والفحص بالسوائل النافذة (PT) للحامات؟',
      en: 'How do I choose between Magnetic Particle (MT) and Liquid Penetrant (PT) for weld inspection?'
    },
    shortAnswer: {
      ar: 'طريقة MT مخصصة حصراً للمعادن القابلة للمغنطة (كالفولاذ الكربوني) وتكتشف العيوب السطحية وتحت السطحية بسرعة فائقة. أما PT فتستخدم لجميع المعادن غير المغناطيسية (كالستانلس ستيل وسبائك النيكل).',
      en: 'MT is strictly for ferromagnetic alloys (carbon steels) detecting both surface and near-surface cracks rapidly. PT is suited for non-magnetic alloys (stainless steels, nickel alloys, aluminum).'
    },
    detailedAnswer: {
      ar: 'يوصى باستخدام الفحص المغناطيسي (MT) باستخدام حواضن المجال المتناوب (AC Yoke) للحامات الفولاذ الكربوني نظراً لسرعته العالية وقدرته على اختراق طبقات الطلاء الرقيقة وكشف الشروخ تحت السطحية حتى عمق 2-3 ملم دون الحاجة لتنظيف كيميائي عميق. بينما يعتبر الفحص بالسوائل النافذة (PT) الحل المثالي للفولاذ الأوستنيتي المقاوم للصدأ (SS 304/316) والمعادن غير الحديدية، ويتطلب تنظيفاً دقيقاً للسطح ووقتاً للتغلغل (Dwell time 10-20 دقيقة).',
      en: 'AC electromagnetic yokes (MT) are the preferred industry choice for carbon steel welds due to rapid test cycles, ability to detect near-surface flaws up to 2-3mm depth, and tolerance for thin primer coats. Liquid Penetrant (PT) is the indispensable choice for austenitic stainless steel (SS 304, 316) and non-ferrous metals, requiring meticulous degreasing and a penetrant dwell time of 10-20 minutes.'
    },
    keyTakeaways: {
      ar: [
        'الفولاذ الكربوني (CS): الفحص المغناطيسي MT هو الأسرع والأكثر حساسية',
        'الستانلس ستيل وسبائك النحاس والألمنيوم: الفحص بالسوائل النافذة PT هو الخيار المعتمد',
        'طريقة MT لا تتأثر بانسداد الشروخ بالسوائل كما في PT'
      ],
      en: [
        'Carbon steel: MT is the faster, more sensitive method for surface & near-surface cracks',
        'Stainless steel, aluminum, brass: PT is the recognized code solution',
        'MT is less prone to contamination masking compared to liquid penetrants'
      ]
    },
    applicableCodes: ['ASME Sec V Art. 6 & 7', 'ASTM E709', 'ASTM E165', 'ISO 9934'],
    relatedMethodCode: 'MT',
    tags: ['MT', 'PT', 'Carbon Steel', 'Stainless Steel', 'Crack Detection']
  },
  {
    id: 'pmi-alloy-verification',
    category: 'surface',
    categoryLabel: {
      ar: 'الفحوصات السطحية والسبائكية',
      en: 'Metallurgical & Surface NDT'
    },
    question: {
      ar: 'كيف يتم إجراء فحص التحليل الطيفي للسبائك (PMI) في الموقع وما هي دقته؟',
      en: 'How is Positive Material Identification (PMI) conducted on-site and what is its precision?'
    },
    shortAnswer: {
      ar: 'يتم الفحص بواسطة أجهزة تحليل فلورية الأشعة السينية المحمولة (Handheld XRF) دون إتلاف العينة، وتظهر النتيجة ونسبة العناصر ودرجة السبيكة في غضون ثوانٍ.',
      en: 'Conducted using handheld X-ray Fluorescence (XRF) analyzers without sample destruction, generating exact elemental percentages and alloy grade matches within seconds.'
    },
    detailedAnswer: {
      ar: 'أجهزة PMI المحمولة لدى إنسكو تقوم بقياس نسب العناصر السبائكية الحساسة مثل الكروم (Cr)، النيكل (Ni)، الموليبدينوم (Mo)، المنجنيز (Mn)، التيتانيوم (Ti) وغيرها في غضون 5 إلى 15 ثانية. يتم مطابقة التركيب الكيميائي المقاس فورياً مع مكتبة المواصفات القياسية (ASTM/UNS/DIN) لتأكيد درجة المعدن ومنع استخدام خامات غير مطابقة في خطوط البخار والغاز والمفاعلات الكيماوية.',
      en: 'INSCO handheld XRF analyzers quantify critical alloying elements including Chromium (Cr), Nickel (Ni), Molybdenum (Mo), Titanium (Ti), and Vanadium (V) within 5 to 15 seconds. Measured chemistry is matched immediately against pre-loaded ASTM/UNS/DIN material libraries to confirm material grade compliance and prevent hazardous material mix-ups in sour service and high-pressure steam systems.'
    },
    keyTakeaways: {
      ar: [
        'فحص غير إتلافي تماماً (Non-Destructive) لا يترك أي أثر على المعدن',
        'تحديد فوري لدرجة السبيكة (مثل SS 316L, Inconel 625, Hastelloy, Chrome-Moly)',
        'إصدار تقرير فني رقمي فوري بتركيز العناصر ونسب الأخطاء الإحصائية'
      ],
      en: [
        '100% non-destructive with zero surface ablation',
        'Instant grade verification (SS 316L, Duplex 2205, Inconel 625, P11, P22)',
        'Immediate digital certificate with chemical breakdown and statistical accuracy'
      ]
    },
    applicableCodes: ['API 578', 'ASTM E1476', 'MSS-SP-137'],
    relatedMethodCode: 'PMI',
    tags: ['PMI', 'XRF', 'Alloy Analysis', 'Material Verification', 'API 578']
  },
  {
    id: 'report-turnaround',
    category: 'commercial',
    categoryLabel: {
      ar: 'التقارير والمعاملات التجارية',
      en: 'Reporting & Commercial'
    },
    question: {
      ar: 'ما هي مدة استلام التقارير الفنية المعتمدة بعد انتهاء الفحص أو المعالجة الحرارية؟',
      en: 'What is the turnaround time for receiving official certified technical reports?'
    },
    shortAnswer: {
      ar: 'يتم تسليم مسودة النتائج الأولية (Daily Field Report) في نفس اليوم بالموقع، ويصدر التقرير النهائي المعتمد والمختوم خلال 12 إلى 24 ساعة.',
      en: 'Preliminary daily field reports are signed on-site upon shift completion, with official stamped technical reports delivered within 12 to 24 hours.'
    },
    detailedAnswer: {
      ar: 'ندرك في إنسكو أن سرعة اتخاذ القرارات في المشاريع وتمرير اللحامات أمر حيوي لتفادي غرامات التأخير. لذلك يحصل مهندس ضبط الجودة بالمشروع على كشف فوري بالموقع، بينما تتم مراجعة البيانات وفحص الأفلام أو المخططات الحرارية بواسطة مهندس NDT Level III واعتماد التقرير الرقمي الرسمي بختم الشركة وإرساله عبر البريد الإلكتروني ومنصة العميل.',
      en: 'At INSCO we understand that rapid inspection turnaround directly affects construction milestones and hydrotest approvals. Clients receive an immediate on-site Daily Inspection Log at the end of each shift, while final raw data, thermal charts, and radiographic films are reviewed and certified by an in-house Level III engineer, with official stamped PDF reports delivered within 12-24 hours.'
    },
    keyTakeaways: {
      ar: [
        'تقرير ميداني فوري (Daily Progress Log) بنهاية كل وردية عمل',
        'تقرير هندسي نهائي معتمد ومختوم خلال 12-24 ساعة كحد أقصى',
        'مخططات حرارية أصلية موقعة لكل دورة معالجة حرارية (PWHT Chart)'
      ],
      en: [
        'Immediate daily field progress log signed on-site each shift',
        'Final certified and stamped engineering report within 12-24 hours',
        'Original certified thermal recorder charts for each PWHT run'
      ]
    },
    applicableCodes: ['ISO 9001:2015', 'Client QA/QC Specifications'],
    relatedMethodCode: 'VT',
    tags: ['Reporting', 'Turnaround', '24 Hours', 'Level III', 'Quality Dossier']
  },
  {
    id: 'service-engagement-models',
    category: 'commercial',
    categoryLabel: {
      ar: 'التقارير والمعاملات التجارية',
      en: 'Reporting & Commercial'
    },
    question: {
      ar: 'هل تقدم شركة إنسكو خدماتها بنظام التنفيذ الكامل (Turnkey) أم تأجير المعدات فقط؟',
      en: 'Does INSCO provide complete turnkey services (crews + equipment) or equipment rental only?'
    },
    shortAnswer: {
      ar: 'نقدم النموذجين: التنفيذ المتكامل (Turnkey Service) بما يشمل الكوادر المعتمدة والمعدات والمستهلكات والتقارير، بالإضافة إلى عقود الإتاحة وتأجير المعدات للمشاريع طويلة الأجل.',
      en: 'We provide both: Full turnkey solutions (certified operators + equipment + consumables + reporting) as well as long-term equipment rental and availability contracts.'
    },
    detailedAnswer: {
      ar: 'النموذج الأكثر شيوعاً في عقود البترول والمقاولات هو التنفيذ المتكامل الشامل (All-inclusive Turnkey)، حيث تتولى إنسكو نقل المعدات، توفير الفاحصين المؤهلين والمشرفين، تأمين المواد الاستهلاكية (المواد النافذة، المساحيق المغناطيسية، كابلات التسخين والعوازل)، وإصدار التقارير الهندسية. كما نوفر للشركات ذات الكوادر الداخلية خيار توريد وتأجير محطات المعالجة الحرارية وأجهزة الفحص مع الدعم الفني والمعايرة الدورية.',
      en: 'Our primary offering for energy and infrastructure contracts is the comprehensive turnkey package, where INSCO supplies mobilised equipment, certified inspection personnel, Level III supervisory oversight, consumables (penetrants, magnetic inks, ceramic blankets), and approved reporting. For clients with in-house certified staff, we also offer standalone equipment lease agreements complete with calibration certificates and technical standby support.'
    },
    keyTakeaways: {
      ar: [
        'عقود تنفيذ متكاملة شاملة للأفراد والأجهزة والمستهلكات',
        'عقود إتاحة وتأجير مرنة للأجهزة ووحدات المعالجة الحرارية للمشاريع الكبرى',
        'فواتير واضحة وقوائم أسعار تفصيلية شفافة تتناسب مع موازنات المشروعات'
      ],
      en: [
        'All-inclusive turnkey execution: technicians, equipment, and consumables',
        'Flexible equipment rental agreements with full technical backup',
        'Transparent unit-rate or lump-sum pricing tailored to project budgets'
      ]
    },
    applicableCodes: ['FIDIC Contracts', 'Corporate Procurement Standards'],
    relatedMethodCode: 'PWHT',
    frequencyBadge: {
      ar: 'استفسار متكرر جداً ⭐',
      en: 'High Frequency ⭐'
    },
    tags: ['Turnkey', 'Rental', 'Commercial', 'Pricing', 'Contracts']
  },
  {
    id: 'enrra-radiation-safety',
    category: 'volumetric',
    categoryLabel: {
      ar: 'الفحوصات الحجمية والإشعاعية',
      en: 'Volumetric & Radiation Safety'
    },
    question: {
      ar: 'كيف تضمن شركة إنسكو السلامة الإشعاعية أثناء تنفيذ الفحص الإشعاعي (RT) في المواقع المأهولة؟',
      en: 'How does INSCO manage radiation safety during Radiographic Testing (RT) on active sites?'
    },
    shortAnswer: {
      ar: 'نتبع بروتوكول حماية صارم مرخص من هيئة الرقابة النووية والإشعاعية (ENRRA) يشمل حساب مسافات الأمان، استخدام كوليماتورات الرصاص، والتنفيذ في الورديات الليلية.',
      en: 'We enforce strict safety protocols licensed by ENRRA, including calculated safety perimeters, directional tungsten collimators, and scheduled nighttime execution.'
    },
    detailedAnswer: {
      ar: 'يتم تشغيل كل كاميرا إشعاعية (Ir-192 / Se-75) بواسطة ضابط حماية إشعاعية مرخص (Certified RPO) وفاحص معتمد. يتم حساب مسافة الأمان الإشعاعي (Controlled Area Barrier at 2.5 µSv/h) بدقة، وتثبيت أشرطة تحذيرية مضيئة وإشارات إشعاع فسفورية مع أجهزة مسح إشعاعي فورية (Geiger Survey Meters) وأجهزة قياس الجرعات الشخصية (TLD / EPD). كما نفضل جدولة الفحص الإشعاعي بعد ساعات العمل العادية لضمان صفر تعرض للعاملين الآخرين.',
      en: 'Every gamma exposure device is operated under the direct supervision of an ENRRA-certified Radiation Protection Officer (RPO) and Level II radiographer. Controlled area boundaries are demarcated at 2.5 µSv/h using high-visibility radiation tape, flashing warning lights, and audio alarms. Operators use calibrated survey meters and personal electronic dosimeters (EPDs/TLDs). Radiography is predominantly scheduled during night shifts to guarantee zero exposure to site personnel.'
    },
    keyTakeaways: {
      ar: [
        'ترخيص كامل وساري من الهيئة المصرية للرقابة النووية والإشعاعية (ENRRA)',
        'حواجز أمان وعزل محددة بأجهزة مسح إشعاعي معايرة',
        'جدولة ليلية لتفادي إيقاف فرق العمل الإنشائية الأخرى'
      ],
      en: [
        'Full operating licenses from ENRRA and compliance with IAEA codes',
        'Physical safety barriers demarcated with calibrated survey instruments',
        'Night-shift scheduling to prevent disruption to other construction teams'
      ]
    },
    applicableCodes: ['ENRRA Regulations', 'IAEA Safety Standards', 'ASME Sec V Art. 2'],
    relatedMethodCode: 'RT',
    tags: ['RT', 'Radiation Safety', 'ENRRA', 'Gamma', 'Safety Perimeter']
  }
];

export const FAQ_CATEGORIES = [
  { id: 'all', labelAr: 'جميع الاستفسارات', labelEn: 'All Inquiries', count: COMMON_FAQS.length },
  { id: 'pwht', labelAr: 'المعالجة الحرارية (PWHT)', labelEn: 'Heat Treatment (PWHT)' },
  { id: 'volumetric', labelAr: 'الفحوصات الحجمية (PAUT/RT/UT)', labelEn: 'Volumetric & Radiation' },
  { id: 'surface', labelAr: 'الفحوصات السطحية (MT/PT/PMI)', labelEn: 'Surface & Materials' },
  { id: 'compliance', labelAr: 'الاعتمادات والجودة', labelEn: 'Certifications & QA' },
  { id: 'mobilization', labelAr: 'التعبئة وسرعة الاستجابة', labelEn: 'Mobilization & Fleets' },
  { id: 'commercial', labelAr: 'التقارير وعروض الأسعار', labelEn: 'Commercial & Proposals' }
];
