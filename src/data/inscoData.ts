import { NDTMethod, ProjectRecord, ISOAccreditation, EducationalDefect, QuizQuestion } from '../types';

export const COMPANY_DETAILS = {
  nameEn: 'International for Services & Constructions Company (INSCO)',
  nameAr: 'الشركة الدولية للخدمات والمقاولات (إنسكو)',
  sloganEn: 'SEE BEYOND THE SURFACE.',
  sloganAr: 'نرى ما وراء السطح.',
  subSloganEn: 'Engineering integrity into every asset.',
  subSloganAr: 'هندسة النزاهة والموثوقية في كل أصل صناعي.',
  incorporated: '2010',
  certOfInc: '3566/2010',
  commercialReg: '209632',
  taxReg: 'Official Tax Card & Vat Stamped',
  headOfficeEn: '7-16 Bldg Project Elasliky, Autostrade Way, Maadi, Cairo, Egypt',
  headOfficeAr: 'عمارة ٧-١٦ مشروع اللاسلكي، طريق الأوتوستراد، المعادي، القاهرة',
  worksEn: 'Al Galaa St., Abo El-Nomrous, Giza 12911, Egypt',
  worksAr: 'شارع الجلاء، أبو النمرس، الجيزة ١٢٩١١',
  phones: ['+20 109 077 7202', '+20 122 582 6396'],
  fax: '+20 2 3809 8142',
  email: 'insco50@yahoo.com',
  ndtOrgId: '54161',
  docRef: 'INSCO/CP/2026-10 (Revision 5)',
};

export const QUICK_STATS = [
  { value: '20+', labelAr: 'عاماً من خبرة إدارة الجودة والتحكم QA/QC', labelEn: 'yrs QA/QC management experience' },
  { value: '100%', labelAr: 'أسطول معالجة حرارية وفحوصات NDT مملوك بالكامل', labelEn: 'Company-owned PWHT & NDT fleet' },
  { value: 'شامل', labelAr: 'تغطية متكاملة لكافة تقنيات الفحص غير الإتلافي NDT', labelEn: 'Comprehensive NDT & mechanical methods' },
  { value: '3', labelAr: 'شهادات آيزو دولية معتمدة ومجددة حتى 2028', labelEn: 'ISO systems certified through 2028' },
  { value: '0%', labelAr: 'اعتماد على التأجير - جاهزية فورية لأي موقع', labelEn: 'Zero rental dependency - immediate readiness' },
  { value: 'دولية', labelAr: 'مشاريع بترولية وصناعية كبرى بمصر وخارجها', labelEn: 'Major domestic & international projects' }
];

export const FIVE_REASONS = [
  {
    num: '01',
    titleAr: 'مورد واحد، نطاق عمل متكامل (One Supplier, Full Scope)',
    titleEn: 'One supplier, full scope',
    descAr: 'خدمات الفحص غير الإتلافي (NDT) + المعالجة الحرارية بعد اللحام (PWHT) + توريد عمالة اللحام المعتمدة، تحت مظلة نظام إدارة جودة موحد ومعتمد. واجهات أقل، ومسؤولية تعاقدية واحدة محكمة.',
    descEn: 'NDT + heat treatment + welding support + manpower under a single certified management system - fewer interfaces, one accountability.'
  },
  {
    num: '02',
    titleAr: 'الملكية تعني الجاهزية الفورية (Ownership Equals Readiness)',
    titleEn: 'Ownership equals readiness',
    descAr: 'كل جهاز فحص ووحدة معالجة حرارية مملوكة بنسبة 100% لشركة إنسكو ومخزنة بمستودعاتنا بالقاهرة والجيزة، مما يتيح التعبئة السريعة (Mobilization) لأي موقع دون انتظار أو تأخيرات سوق التأجير.',
    descEn: 'Every instrument and heat-treatment unit is company-owned and stored in Cairo - mobilization to any site without rental-market delays.'
  },
  {
    num: '03',
    titleAr: 'ثقافة جودة خاضعة للتدقيق المستمر (Audited Quality Culture)',
    titleEn: 'An audited quality culture',
    descAr: 'كبير مراجعين معتمد CQI-IRCA ضمن الهيكل الدائم للشركة، مهندسو وفنيو تفتيش معتمدون ASNT Level II، وإشراف هندسي صارم على إجراءات QA/QC مع تدقيق دوري سنوي لشهادات الآيزو الثلاث.',
    descEn: 'A CQI-IRCA lead auditor inside the company, ASNT Level II technicians, QC/QA executed by company engineers, three ISO systems surveilled annually through 2028.'
  },
  {
    num: '04',
    titleAr: 'سجل إنجازات وتراخيص عابرة للحدود (Recognition Beyond Borders)',
    titleEn: 'Recognition beyond borders',
    descAr: 'ممارسات إشعاعية مرخصة رسمياً من الهيئة المصرية للرقابة النووية والإشعاعية (ENRRA)، إدراج دولي في دليل ndt.org، وأعمال منجزة في اليمن (حقول المسيلة) وأفغانستان (قاعدة بغرام للجيش الأمريكي).',
    descEn: 'ENRRA-licensed radiation practices, listing on the www.ndt.org international directory, and completed works in Yemen, Afghanistan and the region.'
  },
  {
    num: '05',
    titleAr: 'امتثال قانوني وفني موثق بالكامل (Compliance You Can File)',
    titleEn: 'Compliance you can file',
    descAr: 'أرقام الشهادات وتواريخ الإصدار والانتهاء معلنة ومسجلة للتحقق المباشر لدى جهة الاعتماد (EGAC CAB #120007). ملف تسجيل الموردين (Vendor File) جاهز ومدعوم بكافة أدلة وملاحق التعاقدات السابقة.',
    descEn: 'Certificate numbers, issue and expiry dates published for direct verification with the accreditation body - vendor-file ready.'
  }
];

export const NDT_METHODS: NDTMethod[] = [
  {
    id: 'vt',
    code: 'VT',
    name: { ar: 'الفحص البصري (Visual Inspection)', en: 'Visual Inspection' },
    standards: 'ASME V Art. 9 - AWS D1.1 - API 570',
    category: 'surface',
    summary: {
      ar: 'الفحص المباشر وعن بُعد للحامات والمكونات لاكتشاف عدم استواء السطح والتآكل وعيوب اللحام الظاهرة.',
      en: 'Direct and remote visual examination of welds, components and structures for surface discontinuities and corrosion.'
    },
    description: {
      ar: 'خط الدفاع الأول في أي خطة تفتيش وجودة (ITP). يتم تنفيذه باستخدام محددات قياس اللحام (Weld Gauges)، المناظير الصناعية (Borescopes)، وحزم إضاءة قياسية بواسطة فاحصين معتمدين.',
      en: 'The first line of defence in any inspection plan. Executed with weld gauges, borescopes and lighting kits by qualified VT personnel.'
    },
    applications: {
      ar: ['فحص خطوط الأنابيب قبل وبعد اللحام', 'معاينة تآكل الأسطح الداخلية للأوعية', 'فحص محاذاة الوصلات والفجوات'],
      en: ['Pipeline weld bevel and finish inspection', 'Pressure vessel internal surface corrosion', 'Fit-up alignment and root opening']
    },
    equipmentUsed: {
      ar: 'محددات زوايا وارتفاع اللحام (Hi-Lo, Bridge Cam), مناظير ألياف بصرية، أجهزة قياس الضوء Lux',
      en: 'Weld gauges (Hi-Lo, Cambridge), industrial borescopes, calibrated lux meters'
    },
    advantages: {
      ar: ['سرعة التنفيذ', 'اقتصادي', 'يكتشف العيوب الهندسية فوراً'],
      en: ['Rapid execution', 'Cost-effective', 'Immediate geometric discontinuity detection']
    },
    limitations: {
      ar: ['يقتصر على السطح الظاهر فقط', 'يتطلب وصولاً بصرياً مباشراً أو منظاراً'],
      en: ['Limited to external surface', 'Requires visual or borescope access']
    }
  },
  {
    id: 'ut',
    code: 'UT',
    name: { ar: 'الفحص بالموجات فوق الصوتية (Ultrasonic Testing)', en: 'Ultrasonic Testing' },
    standards: 'ASME V Art. 4 & 5 - ASTM E797',
    category: 'volumetric',
    summary: {
      ar: 'نبضات صوتية عالية التردد تخترق سمك المعدن لتحليل الانعكاسات الناجمة عن العيوب الحجمية وقياس سماكة الجدران.',
      en: 'High-frequency sound pulses coupled into the material to analyze reflections from internal discontinuities and wall loss.'
    },
    description: {
      ar: 'يغطي الفحص الحجمي الكامل لوصلات اللحام والمسح الدقيق لسماكة الجدران (Thickness Survey). يكشف عن الشروخ الداخلية، نقص الانصهار (Lack of Fusion)، والمسامية العميقة.',
      en: 'Covers weld-volume inspection and thickness surveying. Accurately pinpoints internal cracks, lack of fusion, and porosity echoes.'
    },
    applications: {
      ar: ['فحص لحامات الأوعية المضغوطة والغلايات', 'قياس سمك خطوط البترول المعرضة للتآكل', 'فحص تشكيلات الحدادة والمسبوكات'],
      en: ['Boiler and pressure vessel full-weld inspection', 'In-service pipeline wall thickness survey', 'Forgings and heavy casting verification']
    },
    equipmentUsed: {
      ar: 'أجهزة كشف العيوب الرقمية Sonatest / Olympus مع مجسات الزاوية (Angle Probes) والترددات المتعددة',
      en: 'Digital Ultrasonic Flaw Detectors with calibrated normal and angle-beam probes'
    },
    advantages: {
      ar: ['عمق اختراق عالي جداً', 'تحديد فوري لموقع وعمق العيب بدقة مليمترية', 'لا يتطلب إخلاء الموقع (بدون إشعاع)'],
      en: ['High penetration depth', 'Instant flaw depth and location sizing', 'No radiation hazard, zero evacuation needed']
    },
    limitations: {
      ar: ['يتطلب مشغلين ذوي مهارة عالية وخبرة', 'يحتاج لوسط اقتران سائل (Couplant)'],
      en: ['Requires highly experienced Level II operators', 'Requires surface couplant gel']
    }
  },
  {
    id: 'rt',
    code: 'RT',
    name: { ar: 'الفحص الإشعاعي (Radiographic Testing)', en: 'Radiographic Testing' },
    standards: 'ASME V Art. 2 - ISO 17636',
    category: 'volumetric',
    summary: {
      ar: 'أشعة جاما (Ir-192 / Se-75) أو الأشعة السينية لاختراق المعدن وتصوير العيوب الحجمية الداخلية بسجل دائم.',
      en: 'Gamma beams (Ir-192, Se-75) or X-ray beams reveal internal volumetric defects as density variations on film or digital detectors.'
    },
    description: {
      ar: 'الأسلوب القياسي المعتمد في عقود البترول لتصوير وصلات الأنابيب. يتم تشغيله تحت ترخيص وإشراف صارم من الهيئة المصرية للرقابة النووية والإشعاعية (ENRRA) مع تحديد مناطق العزل الإشعاعي ومقاييس السلامة.',
      en: 'The benchmark standard in petroleum contracts. Executed under ENRRA-licensed radiation-safety controls with demarcated controlled areas and full dosimetry monitoring.'
    },
    applications: {
      ar: ['خطوط أنابيب نقل الغاز والنفط الخام', 'لحامات أوعية الضغط والمفاعلات الكيماوية', 'الأجزاء المعقدة والمسبوكات عالية الضغط'],
      en: ['Cross-country oil & gas pipelines', 'Pressure vessels and chemical reactors', 'High-pressure castings and valves']
    },
    equipmentUsed: {
      ar: 'أجهزة جاما ريديولوجي بكبسولات إيريديوم 192 وسيلينيوم 75، أجهزة أشعة سينية X-Ray محمولة، وأفلام صناعية عالية الحساسية',
      en: 'Gamma exposure devices (Ir-192, Se-75 sources), industrial X-ray tubes, automatic darkroom labs'
    },
    advantages: {
      ar: ['سجل وثائقي صوري دائم (Permanent Photographic Record)', 'كشف ممتاز للمسامية والخبث (Slag)', 'معتمد عالمياً لدى كبرى شركات الطاقة'],
      en: ['Permanent radiographic image record', 'Excellent volumetric flaw sensitivity', 'Universally recognized by energy majors']
    },
    limitations: {
      ar: ['يتطلب تدابير أمان إشعاعي ومسافات أمان', 'حساسية أقل للشروخ غير المتعامدة مع اتجاه الحزمة'],
      en: ['Requires radiation zone barricades', 'Less sensitive to laminations planar to the beam']
    }
  },
  {
    id: 'paut',
    code: 'PAUT',
    name: { ar: 'الفحص بالموجات فوق الصوتية المتعددة الصفيف (Phased Array UT)', en: 'Phased Array Ultrasonic Testing' },
    standards: 'ASME V Art. 4 App. - ISO 13588',
    category: 'volumetric',
    summary: {
      ar: 'مصفوفات متعددة العناصر توجه وتركز الحزم الصوتية إلكترونياً، لإنتاج مسح مصور ملون لحجم اللحام في مسار واحد.',
      en: 'Multi-element arrays steer and focus ultrasonic beams electronically, producing encoded, imageable scans of the weld volume.'
    },
    description: {
      ar: 'البديل الحديث والمتقدم للفحص الإشعاعي (Advanced NDT). يوفر تغطية أسرع بكثير وبيانات رقمية ثلاثية الأبعاد (A, B, C, S-Scans) وسجلاً رقمياً دائماً بدون أي خطر إشعاعي أو إيقاف للعمل بالموقع.',
      en: 'Advanced NDT method replacing conventional RT. Faster coverage, richer multi-angle data, encoded positional tracking, and permanent digital records without radiation stoppage.'
    },
    applications: {
      ar: ['خطوط الأنابيب البحرية والبرية سريعة الإنجاز', 'لحامات الغلايات ذات الجدران السميكة', 'فحص اللحامات أثناء التشغيل في المصافي'],
      en: ['Cross-country and offshore high-speed pipeline projects', 'Thick-walled boiler and turbine welds', 'In-service refinery inspection without shutdown']
    },
    equipmentUsed: {
      ar: 'أنظمة Phased Array متقدمة مع مشفرات حركة (Encoders) ومجسات 16/64 و 32/128 عنصر',
      en: 'Advanced Phased Array flaw detectors with motorized/manual magnetic encoders and phased array wedges'
    },
    advantages: {
      ar: ['لا يوقف العمل المحيط (آمن 100%، بدون إشعاع)', 'تحديد فوري لحجم وطول وعمق الشروخ', 'مسح رقمي ملون عالي الدقة'],
      en: ['Zero production downtime, completely radiation-free', 'Accurate sizing of flaw height and depth', 'Color coded S-scan and B-scan imaging']
    },
    limitations: {
      ar: ['تكلفة التجهيزات الأولية أعلى من الفحص العادي', 'يتطلب كفاءة تخصصية متقدمة في البرمجة والتحليل'],
      en: ['Higher initial equipment investment', 'Requires specialized data analysis training']
    }
  },
  {
    id: 'mt',
    code: 'MT',
    name: { ar: 'الفحص بالجزيئات المغناطيسية (Magnetic Particle Testing)', en: 'Magnetic Particle Testing' },
    standards: 'ASME V Art. 7 - ASTM E709',
    category: 'surface',
    summary: {
      ar: 'مغنطة الجزء ورش حبيبات الحديد؛ تؤدي الشروخ السطحية وتحت السطحية إلى تسرب المجال المغناطيسي وظهور مؤشرات واضحة.',
      en: 'The part is magnetized and iron particles applied; surface and near-surface discontinuities collect particles into visible indications.'
    },
    description: {
      ar: 'الطريقة المثلى لفحص الفولاذ والمواد القابلة للمغنطة (Ferromagnetic). تنفذ باستخدام حبيبات مرئية تحت الضوء الأبيض أو حبيبات فلورية مشعة تحت الأشعة فوق البنفسجية (Black Light / UV).',
      en: 'The method of choice for ferromagnetic welds, forgings and castings. Executed with AC/DC electromagnetic yokes using black/white contrast or fluorescent UV magnetic ink.'
    },
    applications: {
      ar: ['لحامات الهياكل المعدنية والجسور', 'أرجل منصات الحفر وأنابيب الضغط الحديدية', 'المحاور والتروس وأجزاء التوربينات'],
      en: ['Structural steel fabrication and bridge welds', 'Rig structural tubulars and crane booms', 'Turbine shafts, gears and machine forgings']
    },
    equipmentUsed: {
      ar: 'حواضن مغناطيسية كهرومغناطيسية AC/DC Yokes، ومصابيح UV عالية الشدة، وعلب رذاذ الحبيبات المتباينة',
      en: 'Electromagnetic AC/DC yokes, high-intensity 365nm UV LED lamps, white contrast & black magnetic ink'
    },
    advantages: {
      ar: ['حساسية فائقة للشروخ السطحية الدقيقة جداً', 'سريعة وموثوقة مع نتائج فورية', 'يكشف العيوب تحت السطح القريب (Near-surface)'],
      en: ['Extreme sensitivity to tight surface cracks', 'Immediate clear visual indications', 'Detects shallow subsurface discontinuities']
    },
    limitations: {
      ar: ['يعمل فقط على المواد القابلة للمغنطة (لا يصلح للستانلس الأوستنيتي أو الألومنيوم)', 'قد يتطلب إزالة المغنطة بعد الفحص'],
      en: ['Only works on ferromagnetic materials', 'Demagnetization may be required post-test']
    }
  },
  {
    id: 'pt',
    code: 'PT',
    name: { ar: 'الفحص بالسوائل النافذة (Liquid Penetrant Testing)', en: 'Liquid Penetrant Testing' },
    standards: 'ASME V Art. 6 - ISO 3452',
    category: 'surface',
    summary: {
      ar: 'سائل ذو توتر سطحي منخفض يدخل الشروخ السطحية بالخاصية الشعرية؛ وبعد وضع المُظهر تخرج الصبغة وتظهر العيوب بوضوح.',
      en: 'A low-surface-tension penetrant enters surface-breaking defects by capillary action; developer bleeds out the indication.'
    },
    description: {
      ar: 'الطريقة القياسية المعتمدة للمعادن غير الحديدية والسبائك غير القابلة للمغنطة مثل الستانلس ستيل، الألومنيوم، سبائك النيكل والتيتانيوم.',
      en: 'The definitive method for non-porous non-ferromagnetic metals where magnetic particle cannot apply, such as stainless steels and exotic alloys.'
    },
    applications: {
      ar: ['لحامات الستانلس ستيل وخطوط المواد الكيماوية', 'ريش التوربينات والمضخات ومبادلات الحرارة', 'فحص أسطح لحام الجذور (Root pass)'],
      en: ['Stainless steel piping and chemical lines', 'Turbine blades, pump impellers and flanges', 'Root pass and weld prep inspection']
    },
    equipmentUsed: {
      ar: 'مجموعات الصبغات النافذة المعتمدة (Penetrant, Cleaner/Remover, Developer) صبغات مرئية وفلورية',
      en: 'Approved solvent-removable or water-washable penetrant systems, developer powders, and UV lamps'
    },
    advantages: {
      ar: ['يعمل على جميع المواد غير المسامية', 'سهل الحمل والتطبيق في المواقع الوعرة', 'تكلفة منخفضة ووضوح عالي للعيوب المفتوحة للسطح'],
      en: ['Works on virtually all non-porous metals', 'High portability for remote site work', 'Very sensitive to open-to-surface microcracks']
    },
    limitations: {
      ar: ['يكتشف فقط العيوب المتصلة بالسطح', 'يتطلب تنظيفاً فائقاً للسطح قبل الفحص وإزالة الزيوت والدهانات'],
      en: ['Only detects defects open to surface', 'Requires meticulous surface degreasing beforehand']
    }
  },
  {
    id: 'pmi',
    code: 'PMI',
    name: { ar: 'التحليل الإيجابي للسبائك (Positive Material Identification)', en: 'Positive Material Identification' },
    standards: 'ASTM E572 - API RP 578',
    category: 'metallurgical',
    summary: {
      ar: 'أجهزة قياس الأشعة السينية الفلورية (XRF) المحمولة تحدد التركيب الكيميائي للسبائك في ثوانٍ معدودة.',
      en: 'Handheld X-ray fluorescence identifies alloy chemistry in seconds, verifying pipes, fittings and consumables match the spec.'
    },
    description: {
      ar: 'حماية قاطعة ضد خلط المواد (Material Mix-up) قبل وأثناء وبعد التصنيع والتركيب. تؤكد نسب الكروم، النيكل، الموليبدينوم، والحديد في خطوط الأنابيب وأسلاك اللحام والتجهيزات.',
      en: 'Eliminates catastrophic material mix-ups. Verifies percentages of Cr, Ni, Mo, Ti, and alloy grades (316L, Duplex, P11, P22, P91, Inconel) on-site.'
    },
    applications: {
      ar: ['فحص مواسير ومحابس المصافي ومحطات الغاز', 'التحقق من سلك اللحام والمواد الاستهلاكية', 'توثيق المواد المستلمة بالمخازن والمشاريع'],
      en: ['Refinery and petrochemical high-temp piping', 'Verification of weld filler wire and electrodes', 'Warehouse receiving inspection for alloy stock']
    },
    equipmentUsed: {
      ar: 'أجهزة XRF محمولة يدوياً Thermo Niton / Olympus Innov-X محللة للسبائك بدقة مخبرية',
      en: 'Handheld XRF / LIBS alloy analyzers with factory alloy grade libraries'
    },
    advantages: {
      ar: ['نتائج لحظية خلال 3 إلى 5 ثوانٍ', 'غير إتلافي تماماً ولا يترك أي أثر على العينة', 'سجل رقمي مباشر لنسب العناصر'],
      en: ['Instant elemental analysis in 3-5 seconds', '100% non-destructive with zero marks', 'Direct digital chemistry printout']
    },
    limitations: {
      ar: ['تقنية XRF لا تقيس عنصر الكربون بشكل مباشر (تتطلب OES للكربون)', 'تتطلب تنظيف طبقة الصدأ والدهان'],
      en: ['Standard XRF cannot measure light elements like Carbon directly', 'Surface paint must be removed']
    }
  },
  {
    id: 'ht',
    code: 'HT',
    name: { ar: 'اختبار الصلادة الموقعي (Hardness Testing)', en: 'Hardness Testing' },
    standards: 'ASTM A956 - ISO 18265',
    category: 'metallurgical',
    summary: {
      ar: 'قياسات الصلادة المحمولة (Leeb & UCI) على معدن اللحام، والمنطقة المتأثرة بالحرارة (HAZ) والمعدن الأساسي.',
      en: 'Portable Leeb and UCI hardness measurements verify material condition and the effectiveness of post-weld heat treatment.'
    },
    description: {
      ar: 'التحقق الحاسم من نجاح المعالجة الحرارية (PWHT) وتجنب هشاشة المعدن أو تشققات الإجهاد والتآكل (HIC / SSC) طبقاً لمواصفات NACE MR0175 و ASME.',
      en: 'Confirms stress relief and prevents sulfide stress cracking in sour service according to NACE MR0175 and ASME codes.'
    },
    applications: {
      ar: ['التحقق من نتائج المعالجة الحرارية PWHT', 'خطوط الغاز الحامضي (Sour Gas Service)', 'التروس والأسطح المعالجة حرارياً ضد الاحتكاك'],
      en: ['Post-weld heat treatment verification', 'Sour gas piping compliance per NACE', 'Hardened shafts and wear-resistant overlays']
    },
    equipmentUsed: {
      ar: 'أجهزة قياس صلادة إلكترونية Leeb Rebound و Ultrasonic Contact Impedance (UCI) بمعايرة قياسية',
      en: 'Portable Leeb rebound (Equotip) and UCI hardness testers with certified test blocks'
    },
    advantages: {
      ar: ['محمول ومناسب للمواقع الصعبة والمناطق الضيقة', 'تحويل فوري بين مقاييس HV, HB, HRC', 'فحص سريع متعدد النقاط'],
      en: ['Highly portable for in-situ measurements', 'Instant conversion between HV, HB, HRC', 'Fast multi-point surveying']
    },
    limitations: {
      ar: ['يتطلب سطحاً مصقولاً ومستوياً تماماً', 'سمك القطعة يجب أن يتناسب مع مبدأ القياس'],
      en: ['Requires smooth surface grinding preparation', 'Component mass/thickness constraints apply']
    }
  },
  {
    id: 'hydro',
    code: 'HYDRO',
    name: { ar: 'الاختبار الهيدروستاتيكي (Hydrostatic Testing)', en: 'Hydrostatic Testing' },
    standards: 'ASME B31.3 - API 1104',
    category: 'integrity',
    summary: {
      ar: 'ملء الأنابيب والأوعية بالماء وضغطها إلى أعلى من ضغط التشغيل للتأكد من سلامتها الإنشائية وعدم وجود أي تسريب.',
      en: 'Piping and vessels are filled and pressurized above design pressure with water to prove structural integrity and tightness.'
    },
    description: {
      ar: 'الدليل القاطع على القوة الهيكلية والإحكام التام للمنظومة قبل إطلاق الغاز أو البترول وبدء التشغيل التجاري (Commissioning). تنفذ إنسكو محطات فحص ضغط هيدروليكية متكاملة مع مسجلات الضغط والحرارة المعايرة.',
      en: 'Definitive proof of pressure boundary integrity. Executed with high-pressure pumps, certified manifolds, chart recorders and calibrated deadweight testers.'
    },
    applications: {
      ar: ['خطوط أنابيب نقل البترول والغاز', 'أوعية الضغط والمبادلات الحرارية المجمعة', 'خزانات ومراجل محطات القوى الكهربائية'],
      en: ['Long-distance transmission pipelines', 'Fabricated pressure vessels and heat exchangers', 'Power plant steam lines and boilers']
    },
    equipmentUsed: {
      ar: 'محطات اختبار هيدروليكي يدوية وأوتوماتيكية، مضخات ضغط حتى 10,000 PSI، مسجلات ضغط دائرية (Chart Recorders)',
      en: 'Hydrostatic test pump skids, calibrated Barton chart recorders, digital pressure dataloggers'
    },
    advantages: {
      ar: ['اختبار حقيقي للتحمل الميكانيكي تحت الإجهاد', 'دليل أمان إلزامي قبل الترخيص والتشغيل'],
      en: ['Definitive mechanical strength validation', 'Mandatory code hold-point for commissioning']
    },
    limitations: {
      ar: ['يتطلب توفير كميات مياه وتصريفها وتجفيف المنظومة', 'ضغط مرتفع يتطلب إجراءات سلامة قصوى'],
      en: ['Requires water supply, dewatering and drying', 'High stored energy requiring rigorous exclusion zone']
    }
  },
  {
    id: 'sr',
    code: 'SR',
    name: { ar: 'خشونة السطح وبروفايل التهيئة (Surface Roughness / Profile)', en: 'Surface Roughness / Profile' },
    standards: 'ISO 8503 - ASTM D4417 - SSPC-PA 2',
    category: 'surface',
    summary: {
      ar: 'قياس عمق البروفايل للصلب المنظف بالرمال أو الصدمات لضمان التصاق طبقات الدهان والحماية من الصدأ.',
      en: 'The anchor profile of blast-cleaned steel is measured to confirm the surface condition required for coating adhesion.'
    },
    description: {
      ar: 'نقطة توقف إلزامية (Mandatory Hold Point) قبل تطبيق أي طبقة برايمر (Primer). يقاس باستخدام أجهزة قياس العمق الرقمية أو أشرطة القياس المنسوخة (Replica Tape).',
      en: 'A mandatory inspection hold point before primer application. Measured with digital surface profile gauges and replica tape.'
    },
    applications: {
      ar: ['الخزانات البترولية ومحطات المعالجة', 'الهياكل الفولاذية البحرية المعرضة للأملاح', 'خطوط الأنابيب المدفونة والمعزولة'],
      en: ['Crude oil storage tanks and vessels', 'Offshore marine structures and jackets', 'Coated underground transmission pipelines']
    },
    equipmentUsed: {
      ar: 'أجهزة قياس عمق البروفايل الرقمية Elcometer / DeFelsko، مقارنات بصرية ISO وميكروميترات replica tape',
      en: 'Digital surface profile gauges (Elcometer/PosiTector), Testex replica tapes, surface comparators'
    },
    advantages: {
      ar: ['يضمن العمر الافتراضي لطلاء الحماية', 'سهل وسريع ويوثق رقمياً فوراً'],
      en: ['Ensures maximum coating longevity', 'Fast, repeatable, direct digital logging']
    },
    limitations: {
      ar: ['يجب إجراؤه مباشرة بعد السفع الرملي وقبل ظهور الصدأ اللحظي (Flash Rust)'],
      en: ['Must be performed immediately post-blasting before flash rust occurs']
    }
  },
  {
    id: 'pc',
    code: 'PC',
    name: { ar: 'تفتيش الدهان والطلاءات الواقية (Coating & Painting Inspection)', en: 'Painting / Coating Inspection' },
    standards: 'SSPC-PA 2 - ISO 19840 - NACE SP0188',
    category: 'integrity',
    summary: {
      ar: 'قياس سمك الطبقة الجافة (DFT) واختبار الالتصاق والمسامية بالشرارة الكهربائية (Holiday Test) لمنع التآكل.',
      en: 'Dry-film thickness, adhesion and holiday spark testing verify coating continuity and specification compliance.'
    },
    description: {
      ar: 'حماية الأصول الصناعية من التآكل الكيميائي والبيئي في البيئات القاسية. يتم كشف الثقوب المجهرية (Pinholes) ومواضع النقص وتحديدها للإصلاح المسبق.',
      en: 'Ensures durable corrosion prevention in hostile marine and chemical environments. Locates pinholes, voids, and low thickness.'
    },
    applications: {
      ar: ['عوازل الأنابيب الخارجية 3LPE / FBE', 'البطانة الداخلية لصهاريج النفط والكيماويات', 'منشآت المنصات البحرية والجسور المعدنية'],
      en: ['3LPE / FBE external pipeline coating', 'Internal lining of chemicals and crude tanks', 'Offshore structural steelwork and piping']
    },
    equipmentUsed: {
      ar: 'أجهزة DFT رقمية، أجهزة فحص العوازل بالشرارة عالية ومنخفضة الفولت (High/Low Voltage Holiday Detectors)',
      en: 'Digital DFT gauges, high voltage holiday spark testers, cross-hatch adhesion testers'
    },
    advantages: {
      ar: ['كشف 100% للثقوب المجهرية غير المرئية بالعين', 'مطابقة دقيقة للمواصفات الفنية للدهان'],
      en: ['100% detection of micro pinholes', 'Strict verification of coating dry film thickness']
    },
    limitations: {
      ar: ['اختبار الشرارة عالي الجهد يتطلب حذراً ومعايرة لمنع إتلاف طبقة الطلاء'],
      en: ['High-voltage testing requires careful voltage calibration to avoid dielectric breakdown']
    }
  },
  {
    id: 'mfl_ec',
    code: 'EC / MFL',
    name: { ar: 'التيارات الدوامية وتسرب التدفق المغناطيسي (Eddy Current & MFL)', en: 'Eddy Current & MFL' },
    standards: 'ASTM E426 - ASTM E2944 - API 653',
    category: 'integrity',
    summary: {
      ar: 'فحص التيارات الدوامية لكشف شروخ السطح وأنابيب المبادلات؛ وفحص MFL لمسح قيعان الخزانات وجدران الأنابيب بسرعة إنتاجية عالية.',
      en: 'Eddy current probes detect cracks and tube wall loss; MFL maps tank bottom corrosion at production speed.'
    },
    description: {
      ar: 'أحدث تقنيات الفحص السريع للخزانات والمبادلات الحرارية. ترسم خرائط التآكل وفقدان سماكة المعدن لقيعان الخزانات طبقاً لـ API 653 دون الحاجة لكشط الطلاءات الرقيقة.',
      en: 'High-speed screening for storage tank floors and heat exchanger tubes. Maps top/bottom plate thinning and pitting per API 653.'
    },
    applications: {
      ar: ['مسح أرضيات خزانات البترول الضخمة (Tank Floors)', 'أنابيب المبادلات الحرارية والتوربينات والمكثفات', 'فحص أنابيب ومكونات الألومنيوم والنحاس والسبائك'],
      en: ['Aboveground storage tank bottom floor scanning', 'Heat exchanger, chiller, and condenser tubing', 'Non-ferrous piping and turbine disc crack detection']
    },
    equipmentUsed: {
      ar: 'ماسحات قيعان الخزانات MFL Floor Scanners، وأجهزة التيارات الدوامية Eddy Current المتطورة متعددة الترددات',
      en: 'MFL motorized tank bottom scanners, multi-frequency eddy current tubing instruments'
    },
    advantages: {
      ar: ['سرعة فائقة في مسح مساحات شاسعة', 'يميز بين التآكل العلوي والتآكل السفلي غير المرئي', 'يعمل من خلال طبقات الطلاء الرقيقة'],
      en: ['Ultra-fast scanning of large floor areas', 'Discriminates top-side vs soil-side corrosion', 'Can inspect through thin non-conductive coatings']
    },
    limitations: {
      ar: ['طريقة مسح وتحديد أولي (Screening)، تتطلب تأكيد العمق بالموجات فوق الصوتية UT'],
      en: ['Screening tool requiring UT prove-up for exact localized remaining thickness']
    }
  }
];

export const HEAT_TREATMENT_SPECS = {
  titleAr: 'المعالجة الحرارية بعد اللحام (PWHT) والخدمات الحقلية',
  titleEn: 'Post-Weld Heat Treatment (PWHT) & Field Services',
  taglineAr: 'أسطول متكامل ومتعدد من وحدات المعالجة الحرارية الأوتوماتيكية بقدرة 65 kW مملوكة لشركة إنسكو وجاهزة للتحرك الفوري',
  taglineEn: 'Extensive fleet of fully-automatic 65 kW heat-treatment units - company owned, stored in Cairo & ready to deploy',
  highlights: [
    { ar: 'أسطول وحدات معالجة حرارية 65 kW أوتوماتيكية مملوكة بالكامل ومخزنة بالقاهرة', en: 'Extensive fleet of 65 kW automatic units, company owned, stored in Cairo' },
    { ar: 'تشغيل دورات حرارية مبرمجة على مدار ٢٤/٧ وفق مخططات ASME B31.3 & AWS D1.1', en: '24/7 programmed cycles compliant with ASME B31.3 & AWS D1.1' },
    { ar: 'أجهزة تحكم وبرمجة مستقلة ذات ٦ قنوات ومسجلات رسوم بيانية حرارية معتمدة', en: 'Independent 6-channel programmers and calibrated chart recorders' },
    { ar: 'وسائد تسخين سيراميكية مرنة ومزدوجات حرارية (Thermocouples) عالية الدقة', en: 'High-temperature ceramic heating pads and calibrated thermocouples' },
    { ar: 'تعبئة فورية لأي موقع داخل مصر وسجل أعمال حافل بالخارج', en: 'Nationwide mobilization to any site in Egypt & works abroad' }
  ],
  codes: ['ASME B31.3', 'ASME Sec VIII Div 1', 'AWS D1.1', 'API 537', 'BS EN 15614']
};

export const WELDING_MANPOWER_SPECS = {
  titleAr: 'توريد عمالة اللحام المعتمدة والخدمات البترولية',
  titleEn: 'Welding & Manpower Supply & Petroleum Services',
  highlights: [
    { ar: 'أطقم لحام معتمدة (SMAW, GTAW, GMAW, FCAW) مؤهلة وفق ASME IX و AWS D1.1', en: 'Certified welding crews qualified to ASME IX & AWS D1.1' },
    { ar: 'فنيو تركيبات مواسير وأوعية (Pipe Fitters) وعمالة ماهرة للمواقع البترولية', en: 'Piping fabricators, fitters and specialized site utilities crews' },
    { ar: 'إشراف مباشر من مهندسي مراقبة الجودة (QA/QC) التابعين لشركة إنسكو', en: 'Supervised under the same certified management system as our inspection teams' },
    { ar: 'تأجير معدات معتمدة مع المشغلين وإعداد خطط الفحص والاختبار (ITP)', en: 'Equipment rental with operators and turnkey Inspection & Test Plans' }
  ]
};

export const CERTIFICATIONS_LIST: ISOAccreditation[] = [
  {
    code: 'ISO 9001:2015',
    name: { ar: 'نظام إدارة الجودة (Quality Management System)', en: 'Quality Management System' },
    certNo: '24202QMS094',
    validThrough: '15/01/2028',
    issuingBody: 'QCS - Quality Certificate Service Middle East Africa',
    cabNumber: 'EGAC CAB #120007',
    iafCode: 'IAF 37',
    surveillanceAudits: '1st: 14/01/2026 | 2nd: 14/01/2027'
  },
  {
    code: 'ISO 14001:2015',
    name: { ar: 'نظام الإدارة البيئية (Environmental Management System)', en: 'Environmental Management System' },
    certNo: '23402EMS042',
    validThrough: '15/01/2028',
    issuingBody: 'QCS - Quality Certificate Service Middle East Africa',
    cabNumber: 'EGAC CAB #120007',
    iafCode: 'IAF 35',
    surveillanceAudits: '1st: 14/01/2026 | 2nd: 14/01/2027'
  },
  {
    code: 'ISO 45001:2018',
    name: { ar: 'نظام إدارة السلامة والصحة المهنية (Occupational Health & Safety)', en: 'Occupational Health & Safety Management' },
    certNo: '23502OHS063',
    validThrough: '15/01/2028',
    issuingBody: 'QCS - Quality Certificate Service Middle East Africa',
    cabNumber: 'EGAC CAB #120007',
    iafCode: 'IAF 35',
    surveillanceAudits: '1st: 14/01/2026 | 2nd: 14/01/2027'
  }
];

export const MAJOR_PROJECTS: ProjectRecord[] = [
  {
    id: 'burullus',
    client: 'SIEMENS / ORASCOM Construction',
    project: 'El-Burullus 4800 MW Combined Cycle Power Plant',
    country: 'Egypt',
    location: 'Kafr El-Sheikh',
    activities: 'PWHT & Full NDT subcontract on high-pressure steam pipelines & tanks',
    verifiedPhoto: true,
    photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    period: '2016 - 2018',
    documentRef: 'Subcontract Agreement - Annex E-06/07 & Siemens PO GM 783523'
  },
  {
    id: 'elsewedy',
    client: 'Elsewedy Electric - Transformers & Distribution',
    project: 'Power Transformer Works - Cairo',
    country: 'Egypt',
    location: 'Cairo Industrial Zone',
    activities: 'VT, UT, MT, PT, RT, Hardness Testing & PWHT on specialized tanks',
    verifiedPhoto: true,
    photoUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    period: '2015 - Ongoing',
    documentRef: 'Purchase Order GM102473 (specimen EGP 700,000 guarantee) - Annex E-01'
  },
  {
    id: 'petromasila',
    client: 'ADPC / PETROMASILA & ASPC',
    project: 'Cross-Country Pipelines & Masila Block Facilities',
    country: 'R.O. Yemen',
    location: 'Hadramout / Barik / Mukalla',
    activities: 'Gamma RT (Ir-192), Holiday spark test, Phased Array UT & full NDT scope',
    verifiedPhoto: true,
    photoUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    period: '2018 - 2021',
    documentRef: 'Integration Agreement - Annex E-08/09/10/11'
  },
  {
    id: 'bagram',
    client: 'U.S. Army / Serka Group & Contrack',
    project: 'Bagram Air Field - Tanker Truck Offload Facility',
    country: 'Afghanistan',
    location: 'Bagram Air Base',
    activities: 'NDT inspection & PWHT on 1500 meters of high-security fuel point lines',
    verifiedPhoto: true,
    photoUrl: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=800&q=80',
    period: '2006 - 2010',
    documentRef: 'US Army & Contrack Certificates of Appreciation - Annex B-01/02/04'
  },
  {
    id: 'october',
    client: 'PGESCO / GE - Orascom',
    project: '6th of October Power Station',
    country: 'Egypt',
    location: 'Giza / 6th of October',
    activities: 'All NDT methods on high-pressure fuel pipe lines & storage tanks',
    verifiedPhoto: true,
    photoUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    period: 'Project Register',
    documentRef: 'Project Register - Annex E'
  },
  {
    id: 'talkha',
    client: 'CMI & ARESCO',
    project: 'Talkha & El-Kureimat Power Stations',
    country: 'Egypt',
    location: 'Dakahlia & Beni Suef',
    activities: 'NDT (RT, UT, MT, PT) & Post-Weld Heat Treatment on boiler units',
    verifiedPhoto: true,
    photoUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
    period: 'Project Register',
    documentRef: 'Signed Completion Documents - Annex E'
  },
  {
    id: 'ayoun_mousa',
    client: 'MARIDIVE Offshore & AIC / Siemens',
    project: 'Ayoun Mousa Steam Power Plant',
    country: 'Egypt',
    location: 'Suez',
    activities: 'NDT & PWHT for offshore and onshore steam generation utilities',
    verifiedPhoto: true,
    photoUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
    period: 'Project Register',
    documentRef: 'Project Register - Annex E'
  },
  {
    id: 'nvoc',
    client: 'PSEW / National Vegetable Oils (NVOC)',
    project: 'NVOC Industrial Plant Facilities',
    country: 'Egypt',
    location: 'Borg El-Arab, Alexandria',
    activities: 'RT, UT, PT, MT & PWHT on industrial pressure vessels and piping',
    verifiedPhoto: true,
    photoUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    period: 'Project Register',
    documentRef: 'Project Register - Annex E'
  }
];

export const EDUCATIONAL_DEFECTS: EducationalDefect[] = [
  {
    id: 'lack_of_fusion',
    name: { ar: 'نقص الانصهار (Lack of Fusion - LOF)', en: 'Lack of Fusion (LOF)' },
    nature: {
      ar: 'عيب خطي مستوٍ (Planar defect) يحدث عند عدم اندماج معدن اللحام مع حواف المعدن الأساسي أو مع طبقة اللحام السابقة.',
      en: 'Planar discontinuity occurring when weld metal fails to fuse completely with base metal or previous passes.'
    },
    cause: {
      ar: 'تيار غير كافٍ، زاوية شعلة خاطئة، سرعة تمرير عالية جداً، أو وجود طبقة أكسيد وسخام على الحواف.',
      en: 'Insufficient heat input, incorrect electrode angle, excessive travel speed, or oxide contamination on weld bevel.'
    },
    bestDetectionMethods: ['PAUT (الأفضل لتوجيه الزوايا)', 'UT (موجات زاوية 45°/60°/70°)', 'RT (إذا كان اتجاه الشعاع موازياً لمستوى الانصهار)'],
    acceptanceCriteriaCode: 'ASME B31.3 Table 341.3.2: مرفوض تماماً (Zero Tolerance) للخدمات الحرجة.',
    severity: 'Critical'
  },
  {
    id: 'cracking',
    name: { ar: 'شروخ اللحام (Welding Cracks)', en: 'Welding Cracks (Hot & Cold)' },
    nature: {
      ar: 'أخطر العيوب الميكانيكية، قد تكون شروخاً طولية، مستعرضة، أو شروخاً في منطقة التأثر بالحرارة (HAZ) ناتجة عن الهيدروجين.',
      en: 'The most dangerous discontinuity type, including longitudinal, transverse, crater and delayed hydrogen-induced underbead cracks.'
    },
    cause: {
      ar: 'إجهادات متبقية عالية، تبريد سريع جداً، عدم التسخين المسبق (Preheat)، أو وجود رطوبة وهيدروجين في أسلاك اللحام.',
      en: 'High residual stress, fast cooling rate, lack of preheat, hydrogen trapped from damp electrodes, or improper PWHT.'
    },
    bestDetectionMethods: ['MT (للشروخ السطحية في الفولاذ)', 'PT (للشروخ السطحية في الستانلس)', 'PAUT / UT (للشروخ الداخلية)', 'RT'],
    acceptanceCriteriaCode: 'ASME Sec VIII / AWS D1.1 / API 1104: مرفوض رفضاً قاطعاً بأي طول أو حجم.',
    severity: 'Critical'
  },
  {
    id: 'porosity',
    name: { ar: 'المسامية والجيوب الغازية (Porosity & Gas Pockets)', en: 'Porosity & Gas Pockets' },
    nature: {
      ar: 'عيوب حجمية مستديرة أو أنبوبية تنشأ عن احتباس فقاعات الغاز داخل معدن اللحام أثناء تجمده السريع.',
      en: 'Volumetric rounded or wormhole cavities caused by gas entrapment in the molten weld pool during solidification.'
    },
    cause: {
      ar: 'فقدان غاز الحماية (Shielding gas) بسبب الهواء، تلوث السطح بالزيت أو الرطوبة، أو طول قوس اللحام المفرط.',
      en: 'Loss of shielding gas from wind/drafts, moisture, oil, grease, or excessively long arc length.'
    },
    bestDetectionMethods: ['RT (الفحص الإشعاعي هو الأفضل للمسامية الحجمية)', 'PAUT', 'UT'],
    acceptanceCriteriaCode: 'مسموح بنسب وتوزيعات محددة وفق جداول ASME Sec VIII Div 1 Appendix 4 و API 1104.',
    severity: 'Medium'
  },
  {
    id: 'incomplete_penetration',
    name: { ar: 'نقص التغلغل في الجذر (Incomplete Root Penetration)', en: 'Incomplete Penetration (IP)' },
    nature: {
      ar: 'فشل معدن اللحام في اختراق كامل عمق فجوة الجذر بين الماسورتين أو الجزأين الملحومين.',
      en: 'Failure of weld metal to extend into and fuse through the root of the joint.'
    },
    cause: {
      ar: 'فتحة جذر ضيقة جداً (Root face كبيرة)، سرعة سريعة، أو تيار لحام منخفض في التمريرة الأولى.',
      en: 'Too small root gap, excessive root face land, improper welder technique, or low root pass amperage.'
    },
    bestDetectionMethods: ['RT (يظهر كخط مظلم مستقيم وحاد في منتصف الوصلة)', 'UT / PAUT', 'VT (إذا كان الجذر متاحاً بالمنظار)'],
    acceptanceCriteriaCode: 'ASME B31.3: غير مسموح في الخدمات القاسية (Severe Cyclic) ومقيد بأطوال صارمة في الخدمات العادية.',
    severity: 'High'
  },
  {
    id: 'slag_inclusion',
    name: { ar: 'مخلفات الخبث المحتبس (Slag Inclusions)', en: 'Slag Inclusions' },
    nature: {
      ar: 'مواد صلبة غير معدنية ومتبقيات بودرة اللحام (Flux) تحتبس داخل خط اللحام بين الطبقات المتعاقبة.',
      en: 'Non-metallic solid material entrapped in weld metal or between weld metal and base metal.'
    },
    cause: {
      ar: 'عدم تنظيف الخبث بالشيت والفرشاة السلكية بين التمريرات، أو تجاويف اللحام العميقة ذات الزوايا الحادة.',
      en: 'Inadequate inter-pass cleaning/chipping of slag, or sharp groove angles trapping molten slag.'
    },
    bestDetectionMethods: ['RT (تظهر كأشكال غير منتظمة خفيفة الكثافة)', 'UT', 'PAUT'],
    acceptanceCriteriaCode: 'تخضع لقيود الطول والمباعدة وفق ASME Sec VIII Div 1 UW-51.',
    severity: 'Medium'
  }
];

export const STANDARDS_LIBRARY = [
  { code: 'ASME Section V', titleAr: 'الفحوصات غير الإتلافية', titleEn: 'Nondestructive Examination', scope: 'VT, UT, RT, MT, PT, PAUT general rules' },
  { code: 'ASME Section IX', titleAr: 'تأهيل اللحام وإجراءات اللحام', titleEn: 'Welding, Brazing & Fusing Qualifications', scope: 'WPS, PQR, WPQ standards' },
  { code: 'ASME B31.3', titleAr: 'أنابيب المعالجة البترولية والكيماوية', titleEn: 'Process Piping Code', scope: 'PWHT requirements, NDT acceptance criteria' },
  { code: 'AWS D1.1', titleAr: 'كود اللحام الإنشائي للصلب', titleEn: 'Structural Welding Code - Steel', scope: 'Fabrication inspection and welder qualifications' },
  { code: 'API 1104', titleAr: 'لحام خطوط الأنابيب والمرافق التابعة', titleEn: 'Welding of Pipelines and Related Facilities', scope: 'Cross-country pipelines, RT/UT flaw acceptance' },
  { code: 'API 570', titleAr: 'تفتيش وإصلاح خطوط الأنابيب أثناء الخدمة', titleEn: 'Piping Inspection Code', scope: 'In-service inspection, corrosion rate, remaining life' },
  { code: 'API 653', titleAr: 'تفتيش وإصلاح خزانات التخزين', titleEn: 'Tank Inspection, Repair, Alteration', scope: 'MFL tank floor scanning, shell settlement' },
  { code: 'ISO 9712', titleAr: 'تأهيل وترخيص كوادر NDT', titleEn: 'Non-destructive testing - Qualification and certification', scope: 'Level 1, Level 2, Level 3 competencies' },
  { code: 'SSPC-PA 2', titleAr: 'قياس سمك الدهان الجاف (DFT)', titleEn: 'Measurement of Dry Coating Thickness', scope: 'Coating acceptance rules' }
];

export const SAMPLE_QUIZZES: QuizQuestion[] = [
  {
    id: 'q1',
    question: {
      ar: 'أي من طرق الفحص غير الإتلافي التالية تعتبر الأنسب لفحص الشروخ السطحية في الفولاذ الكربوني القابل للمغنطة بدقة وسرعة؟',
      en: 'Which NDT method is most sensitive and rapid for detecting surface cracks in ferromagnetic carbon steel?'
    },
    options: {
      ar: [
        'الفحص بالجزيئات المغناطيسية (MT)',
        'الفحص الإشعاعي (RT)',
        'الفحص بالسوائل النافذة (PT)',
        'تحليل السبائك (PMI)'
      ],
      en: [
        'Magnetic Particle Testing (MT)',
        'Radiographic Testing (RT)',
        'Liquid Penetrant Testing (PT)',
        'Positive Material Identification (PMI)'
      ]
    },
    correctIndex: 0,
    explanation: {
      ar: 'طريقة MT هي الأفضل والأسرع للفولاذ القابل للمغنطة لأن تسرب المجال المغناطيسي يجذب الحبيبات فوراً نحو أدق الشروخ السطحية وتحت السطحية.',
      en: 'MT is exceptionally sensitive to fine surface and near-surface cracks on ferromagnetic steels due to magnetic flux leakage.'
    }
  },
  {
    id: 'q2',
    question: {
      ar: 'ما هو الهدف الرئيسي من إجراء المعالجة الحرارية بعد اللحام (PWHT) وفقاً لكود ASME B31.3؟',
      en: 'What is the primary engineering objective of Post-Weld Heat Treatment (PWHT) per ASME B31.3?'
    },
    options: {
      ar: [
        'تغيير لون اللحام لجعله لامعاً',
        'تخفيف الإجهادات المتبقية وخفض صلادة منطقة اللحام واستعادة المتانة',
        'إصلاح العيوب الهندسية والمسامية تلقائياً',
        'زيادة سرعة تدفق السائل داخل الأنبوب'
      ],
      en: [
        'Alter the visual cosmetic color of the weld',
        'Relieve residual welding stresses, temper hardness, and restore ductility',
        'Automatically eliminate porosity and physical voids',
        'Increase fluid flow velocity in the pipe'
      ]
    },
    correctIndex: 1,
    explanation: {
      ar: 'الهدف الأساسي من PWHT هو تخفيف الإجهادات الميكانيكية المتبقية (Residual Stresses) المتولدة أثناء انكماش اللحام، وتخفيض الصلادة في المنطقة المتأثرة بالحرارة (HAZ) لمنع الشروخ الهيدروجينية والتآكل الإجهادي.',
      en: 'PWHT relieves peak residual stresses from weld thermal cycles, tempers high-hardness microstructure in the HAZ, and prevents brittle fracture.'
    }
  },
  {
    id: 'q3',
    question: {
      ar: 'لماذا يعتبر فحص Phased Array UT (PAUT) خياراً متفوقاً في كثير من الأحيان مقارنة بالفحص الإشعاعي التقليدي (RT) في المنشآت الحية؟',
      en: 'Why is Phased Array UT (PAUT) widely preferred over conventional RT in live industrial plants?'
    },
    options: {
      ar: [
        'لأنه لا يتضمن أي مخاطر إشعاعية ولا يتطلب إخلاء الموقع أو إيقاف الأعمال المجاورة، ويوفر سجلاً رقمياً ملوناً فائق الدقة',
        'لأنه أرخص بمئة مرة ولا يحتاج إلى كهرباء',
        'لأنه يفحص الأنابيب البلاستيكية فقط دون المعادن',
        'لأنه لا يحتاج إلى مشغل معتمد'
      ],
      en: [
        'Zero radiation hazard, zero site evacuation/downtime, with calibrated sizing of flaw height/depth',
        'It requires no electricity and costs 100x less',
        'It is strictly limited to plastic components',
        'It does not require trained personnel'
      ]
    },
    correctIndex: 0,
    explanation: {
      ar: 'تقنية PAUT تقدم مسحاً حجمياً رقمياً مشفراً بدقة ثلاثية الأبعاد دون إشعاع نووي، مما يلغي تماماً الحاجة لإخلاء عمال الموقع أو إيقاف الإنتاج كما يحدث مع كبسولات الإيريديوم.',
      en: 'PAUT generates encoded volumetric records without radiation barriers, enabling simultaneous construction and inspection.'
    }
  }
];
