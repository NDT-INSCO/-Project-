import { EngineeringDiscipline } from '../types';

export const apiInspectionDiscipline: EngineeringDiscipline = {
  id: 'api_inspection',
  titleAr: 'تفتيش المنشآت والمعدات البترولية الثابتة (API Plant & Vessel Inspection)',
  titleEn: 'API In-Service Plant Inspection (API 510, 570, 653, 579, 580)',
  category: 'api_inspection',
  badgeColor: 'cyan',
  overviewAr: 'إدارة سلامة وموثوقية أوعية الضغط وخطوط الأنابيب وخزانات التخزين في مصافي النفط ومحطات الغاز. تشمل حساب معدلات التآكل، تحديد العمر الافتراضي المتبقي، والتفتيش أثناء فترات الصيانة الشاملة (Turnaround)، وتطبيق تقييمات الصلاحية للخدمة (Fitness-For-Service) والتفتيش المبني على المخاطر (RBI).',
  overviewEn: 'In-service integrity governance for refinery pressure vessels, process piping, and storage tanks. Calculates corrosion rates, remaining life, turnaround inspection intervals, Fitness-For-Service (API 579), and Risk-Based Inspection (API 580/581).',
  keyTechniques: [
    'API 510 (Pressure Vessel In-Service Inspection)',
    'API 570 (Piping Systems In-Service Inspection)',
    'API 653 (Aboveground Storage Tank Inspection)',
    'API 579-1 / ASME FFS-1 (Fitness-For-Service Assessments)',
    'API 580 / API 581 (Risk-Based Inspection - RBI)'
  ],
  globalAccreditations: ['API 510 Certified Vessel Inspector', 'API 570 Certified Piping Inspector', 'API 653 Certified Tank Inspector', 'ASME FFS-1 Evaluator'],
  targetIndustries: ['Petroleum Refineries', 'Petrochemical Complexes', 'LNG & Gas Liquefaction Terminals', 'Offshore Production Platforms', 'Bulk Fuel Tank Farms'],
  levels: [
    // -------------------------------------------------------------------------
    // LEVEL 1: ACADEMIC & UNIVERSITY FOUNDATIONS (المرحلة الأكاديمية والجامعية)
    // -------------------------------------------------------------------------
    {
      levelId: 'academic',
      tierCategory: 'academic',
      nameAr: 'المرحلة الأكاديمية والجامعية (University Pressure Vessel Mechanics & Damage Physics)',
      nameEn: 'Academic & University Pressure Vessel Mechanics Foundations',
      academicStageAr: 'المقررات الأكاديمية لطلاب كليات الهندسة في ميكانيكا أوعية الضغط ومرونة القشور وآليات التلف',
      academicStageEn: 'University Degree Coursework in Solid Mechanics, Shell Theory & Chemical Degradation Mechanisms',
      targetRoleAr: 'دراسة واشتقاق إجهادات الأسطوانات الرقيقة والسميكة (Lame Equations)، نظريات الكسر، وآليات التلف الكيميائية والميكانيكية',
      targetRoleEn: 'Derive thin/thick-wall cylindrical stress equations (Lame), shell membrane theory, and API 571 degradation physics',
      prerequisitesAr: 'دراسة جامعية في ميكانيكا الجوامد، نظرية المرونة (Theory of Elasticity)، علم المواد، وميكانيكا الموائع',
      prerequisitesEn: 'University coursework in Solid Mechanics, Theory of Elasticity, Materials Science, and Fluid Mechanics',
      trainingHours: 120,
      experienceMonths: 0,
      internationalCerts: ['B.Sc. Mechanical / Petroleum / Chemical Engineering', 'ASME Student Member'],
      applicableCodes: ['ASME Section VIII Div 1 & 2', 'API 571 (Damage Mechanisms)', 'WRC Bulletin 107/297'],
      responsibilitiesAr: [
        'اشتقاق معادلات الإجهاد الدائري (Hoop Stress) والإجهاد المحوري الطولي في الأنابيب وأوعية الضغط تحت الضغط الداخلي',
        'حل معادلات لامي (Lame’s Equations) للأسطوانات سميكة الجدران وحساب توزيع الإجهاد الشعاعي والقطري عبر السماكة',
        'فهم فيزياء تركز الإجهادات عند الفوهات (Nozzles) والفتحات واللحامات وفق منشورات WRC 107 و WRC 297',
        'دراسة آليات التلف الفيزيائية والكيميائية وفق كود API 571 (مثل التآكل تحت العازل CUI، الكبرتة Sulfidation، وهجوم الهيدروجين HTHA)',
        'تطبيق ميكانيكا الكسر لحساب معامل شدة الإجهاد K_I عند أطراف الشروخ وتحديد الحمل الأقصى قبل الانفجار'
      ],
      responsibilitiesEn: [
        'Derive hoop membrane stress (σ_θ = P·r/t) and longitudinal stress (σ_z = P·r/2t) for pressurized thin cylinders',
        'Solve Lame’s differential equations for thick-walled cylinders determining radial and circumferential stress distributions',
        'Model stress concentration factors at vessel penetrations, shell nozzles, and saddle supports per WRC 107 and 297',
        'Investigate degradation thermodynamics per API 571: Corrosion Under Insulation (CUI), Sulfidation, HTHA, and Amine SCC',
        'Apply Linear Elastic Fracture Mechanics computing Mode I stress intensity factors (K_I) for crack-like vessel flaws'
      ],
      modules: [
        {
          id: 'mod_api_acad_1',
          titleAr: 'الوحدة الأكاديمية 1: ميكانيكا مرونة أوعية الضغط ونظريات الإجهاد (Thin & Thick Shells)',
          titleEn: 'Academic Module 1: Pressure Vessel Solid Mechanics & Lame’s Equations',
          duration: '45 ساعة محاضرات ونظريات ميكانيكية',
          topicsAr: [
            'نظرية القشور الرقيقة (Thin Shell Membrane Theory): إجهاد الشد الحلقي (Hoop Stress) والإجهاد الطولي، ولماذا σ_hoop = 2 × σ_longitudinal',
            'معادلات لامي للأسطوانات السميكة (Thick-walled Cylinders): توزيع الإجهاد الدائري والشعاعي وتأثير نسبة القطر الخارجي إلى الداخلي (Do / Di > 1.2)',
            'إجهادات القباب ورؤوس الأوعية (Heads): الرؤوس نصف الكروية (Hemispherical)، البيضاوية (2:1 Ellipsoidal)، والقرصية (Torispherical)',
            'تركز الإجهادات في منطقة مفصل القبة (Knuckle Region) ومعامل شكل الرأس (Shape Factor M)',
            'تحليل إجهادات الفوهات ووصلات الأنابيب بواسطة منشورات WRC 107 و WRC 297'
          ],
          topicsEn: [
            'Membrane theory of thin shells: Deriving hoop stress vs longitudinal stress, and explaining why hoop is twice longitudinal',
            'Lame’s thick cylinder equations: Through-thickness stress gradients and non-linear hoop distribution when Do/Di > 1.2',
            'Stress distribution in formed heads: Hemispherical, 2:1 semi-ellipsoidal, and ASME flanged & dished torispherical heads',
            'Stress concentration in knuckle regions of torispherical heads and ASME head shape factor (M) derivation',
            'Local nozzle penetration stress analysis under external piping loads deploying WRC 107 and WRC 297 formulations'
          ],
          learningOutcomesAr: [
            'القدرة على حساب إجهادات أي وعاء ضغط أو خط أنابيب من الصفر دون الرجوع لجداول مبسطة',
            'فهم الأسباب الفيزيائية لانهيار أوعية الضغط وتحديد أضعف النقاط الهندسية في التصميم'
          ],
          learningOutcomesEn: [
            'Calculate localized and membrane stresses for any vessel geometry from fundamental solid mechanics',
            'Master the physical origins of burst ruptures and identify critical geometric stress raisers'
          ]
        },
        {
          id: 'mod_api_acad_2',
          titleAr: 'الوحدة الأكاديمية 2: فيزياء وكيمياء آليات التلف البترولية طبقاً لكود API 571',
          titleEn: 'Academic Module 2: Metallurgy of Degradation Mechanisms (API 571 Damage Modes)',
          duration: '45 ساعة دراسات كيميائية وميتالورجية',
          topicsAr: [
            'التآكل تحت العازل (Corrosion Under Insulation - CUI): فيزياء الرطوبة المحتبسة تحت العازل الحراري بين -4°م و 175°م',
            'هجوم الهيدروجين عند درجات الحرارة العالية (High Temperature Hydrogen Attack - HTHA) ونفث كربيد الميثان في الصلب الكربوني',
            'تآكل الكبرتة في درجات الحرارة العالية (Sulfidation): تفاعل مركبات الكبريت مع الحديد فوق 260°م ومنحنيات McConomy',
            'تصدع التآكل الإجهادي البيئي: الإجهاد الشدودي مع وسط مسبب (Caustic SCC, Amine SCC, Polythionic Acid SCC)',
            'التقصف الكارثي عند 475°م (475°C Embrittlement) وتقصف طور سيجما (Sigma Phase) في صلب الدوبلكس والإستانلس'
          ],
          topicsEn: [
            'Corrosion Under Insulation (CUI) thermodynamics: Moisture entrapment dynamics between -4°C and 175°C',
            'High Temperature Hydrogen Attack (HTHA): Internal methane gas generation (Fe₃C + 2H₂ → CH₄) and micro-fissuring',
            'High-temperature sulfidation kinetics: Sulfur compound reactions above 260°C and modified McConomy rate curves',
            'Environmental Stress Corrosion Cracking (SCC) mechanisms: Caustic, Amine, and Polythionic Acid cracking in stainless',
            'High-temperature embrittlement modes: 475°C spinodal decomposition and brittle intermetallic Sigma phase precipitation'
          ],
          learningOutcomesAr: [
            'تشخيص السبب الجذري لأي تلف يظهر داخل أوعية التكرير أو خطوط الأنابيب',
            'اختيار المواد المناسبة المقاومة للبيئات التشغيلية القاسية في مصافي النفط'
          ],
          learningOutcomesEn: [
            'Diagnose root cause degradation modes operating inside refinery process units with chemical precision',
            'Prescribe metallurgically resistant alloys capable of surviving aggressive sour and high-temp environments'
          ]
        }
      ],
      keyFormulas: [
        {
          nameAr: 'إجهاد الشد الدائري الحلقي للأسطوانة الرقيقة (Hoop Stress)',
          nameEn: 'Thin-Walled Cylinder Hoop Stress',
          formula: 'σ_hoop = (P × D_internal) / (2 × t)',
          descriptionAr: 'يحدد الإجهاد المحيطي الأساسي الناتج عن الضغط الداخلي (P). هذا الإجهاد هو الحاكم لتحديد سماكة الجدار المطلوبة للأوعية.',
          descriptionEn: 'The primary circumferential membrane stress; dictates minimum pressure vessel shell thickness design.'
        },
        {
          nameAr: 'معادلة لامي للإجهاد الحلقي عند السطح الداخلي للأسطوانة السميكة',
          nameEn: 'Lame’s Maximum Internal Hoop Stress',
          formula: 'σ_max = P × [ (r_outer² + r_inner²) / (r_outer² - r_inner²) ]',
          descriptionAr: 'تحسب أقصى إجهاد حلقي يتركز عند الجدار الداخلي للأسطوانات عالية الضغط جداً (مفاعلات البولي إيثيلين والهيدروكراكر).',
          descriptionEn: 'Calculates the peak circumferential stress occurring at the innermost bore of thick-walled high-pressure cylinders.'
        }
      ],
      practicalSkillsChecklist: [
        { skillAr: 'حساب الإجهاد الحلقي والطولي لوعاء ضغط قطره 2 متر يعمل عند ضغط 40 بار وسماكة 30 ملم وتحديد معامل الأمان', skillEn: 'Calculate hoop and longitudinal stress for 2m diameter vessel at 40 bar with 30mm wall determining safety factor', importance: 'mandatory' },
        { skillAr: 'فحص ميكروسكوبي لعينة صلب أصيبت بهجوم هيدروجيني عالي الحرارة HTHA وتحديد الشقوق الميثانية المجهرية', skillEn: 'Microscopic metallographic examination of HTHA-damaged steel identifying internal methane micro-cavities', importance: 'mandatory' },
        { skillAr: 'تصميم مسح تفتيشي شامل للبحث عن التآكل تحت العازل CUI على شبكة أنابيب مصفاة بترولية طبقاً لـ API 570', skillEn: 'Design comprehensive CUI inspection survey map across insulated refinery piping circuits per API 570', importance: 'mandatory' }
      ],
      referenceTextbooks: [
        { title: 'Theory of Plates and Shells', author: 'S. Timoshenko & S. Woinowsky-Krieger', standardOrPublisher: 'McGraw-Hill' },
        { title: 'API Recommended Practice 571: Damage Mechanisms Affecting Fixed Equipment in the Refining Industry', author: 'American Petroleum Institute', standardOrPublisher: 'API Publishing' },
        { title: 'Pressure Vessel Design Handbook', author: 'Henry H. Bednar', standardOrPublisher: 'Van Nostrand Reinhold' }
      ]
    },

    // -------------------------------------------------------------------------
    // LEVEL 2: CERTIFIED API PLANT INSPECTOR (المستوى الثاني المهني المعتمد)
    // -------------------------------------------------------------------------
    {
      levelId: 'level2',
      tierCategory: 'level2',
      nameAr: 'مفتش منشآت ومعدات بترولية معتمد دولياً (Certified API 510 / 570 / 653 Inspector)',
      nameEn: 'Level II (Certified API In-Service Plant Inspector: API 510, 570, 653)',
      academicStageAr: 'الشهادة المهنية الأرفع عالمياً في التفتيش الميداني على المعدات الثابتة في قطاع البترول والغاز',
      academicStageEn: 'Premier Global Professional Credential in Refinery Fixed Equipment Integrity & Life Assessment',
      targetRoleAr: 'حساب السماكة الأدنى t_min، معدلات التآكل، العمر المتبقي، فترات الفحص القانونية، واعتماد إصلاحات ASME PCC-2',
      targetRoleEn: 'Compute t_min, corrosion rates, remaining service life, statutory intervals, and approve PCC-2 engineered repairs',
      prerequisitesAr: 'بكالوريوس هندسة مع خبرة سنة أو دبلوم فني مع خبرة 3 سنوات في المصافي، مع اجتياز امتحانات معهد البترول الأمريكي الصارمة',
      prerequisitesEn: 'B.Sc. with 1 yr or diploma with 3 yrs refinery inspection experience, passing rigorous API individual certification exams',
      trainingHours: 80,
      experienceMonths: 24,
      internationalCerts: ['API 510 Pressure Vessel Inspector', 'API 570 Piping Inspector', 'API 653 Aboveground Storage Tank Inspector'],
      applicableCodes: ['API 510', 'API 570', 'API 653', 'ASME Sec VIII Div 1', 'ASME B31.3', 'ASME PCC-2 (Repair of Equipment)'],
      responsibilitiesAr: [
        'حساب السماكة التصميمية الدنيا المطلوبة (t_min) للأسطوانات والقباب ورؤوس أوعية الضغط طبقاً لـ ASME Sec VIII UG-27/32',
        'حساب معدل التآكل قصير الأجل وطويل الأجل (Corrosion Rate mm/year) والعمر المتبقي بالسنوات',
        'تحديد الحد الأقصى لفترة الفحص الداخلي الدوري بحيث لا تتجاوز نصف العمر المتبقي أو 10 سنوات (أيهما أقل)',
        'معاينة وتقييم حالة قيعان الخزانات البترولية وجدرانها طبقاً لـ API 653 ومسح هبوط القاع (Settlement Evaluation)',
        'اعتماد أعمال الإصلاح والتعديل على الساخن (Hot Tapping & Engineered Sleeves) طبقاً لكود ASME PCC-2'
      ],
      responsibilitiesEn: [
        'Calculate minimum required design wall thickness (t_min) for shells and heads per ASME Section VIII UG-27/UG-32',
        'Compute short-term and long-term corrosion rates and predict exact remaining operating lifespan in years',
        'Establish statutory internal inspection intervals enforcing the mandatory half remaining life or 10-year rule',
        'Inspect storage tank bottom plate settlement, annular plate thinning, and shell courses per API 653',
        'Approve permanent and temporary engineered welded repairs and hot taps in accordance with ASME PCC-2'
      ],
      modules: [
        {
          id: 'mod_api_2_1',
          titleAr: 'الوحدة 1: حسابات السماكة الدنيا (t_min) ومعدلات التآكل والعمر المتبقي',
          titleEn: 'Module 1: Wall Thickness, Corrosion Rate Formulas & Remaining Life Calculations',
          duration: '40 ساعة دراسات حالة تطبيقية وحسابات',
          topicsAr: [
            'معادلة حساب سماكة أسطوانة وعاء الضغط تحت ضغط داخلي طبقاً لـ ASME Sec VIII Div 1 UG-27',
            'حساب سماكة رؤوس الأوعية البيضاوية (2:1 Ellipsoidal Heads UG-32d) والقرصية (Torispherical Heads UG-32e)',
            'حساب معدل التآكل قصير وطويل الأجل: Short-term vs Long-term Corrosion Rates ومقارنة الفروق التشغيلية',
            'معادلة العمر الافتراضي المتبقي: Remaining Life = (t_actual - t_min) / Corrosion Rate',
            'قاعدة الـ 10 سنوات ونصف العمر المتبقي لتحديد تاريخ إيقاف الوحدة للصيانة الشاملة (Turnaround Date)'
          ],
          topicsEn: [
            'ASME Section VIII Div 1 UG-27 cylindrical shell design formula accounting for joint efficiency (E)',
            'Formed head minimum thickness: 2:1 ellipsoidal (UG-32d) and torispherical (UG-32e) ASME formulas',
            'Corrosion rate computation: Short-term versus long-term rates identifying operational process upsets',
            'Remaining structural life formula: RL = (t_actual - t_min) / Corrosion Rate (years)',
            'Statutory inspection interval governance: Half remaining life or 10-year maximum turnaround frequency'
          ],
          learningOutcomesAr: [
            'حساب السماكة الأدنى والعمر المتبقي لأي معدة بترولية في غضون دقائق معدودة بمطابقة كاملة للأكواد',
            'تحديد موعد الفحص القادم بدقة متناهية تحمي المنشأة من أي تسريب أو انفجار غير متوقع'
          ],
          learningOutcomesEn: [
            'Compute t_min and remaining life for arbitrary pressurized refinery assets with 100% code adherence',
            'Establish precise statutory turnaround dates eliminating unplanned loss-of-containment incidents'
          ]
        },
        {
          id: 'mod_api_2_2',
          titleAr: 'الوحدة 2: تفتيش خطوط الأنابيب والخزانات البترولية واعتماد إصلاحات ASME PCC-2',
          titleEn: 'Module 2: Piping & Tank Integrity (API 570 / 653) & ASME PCC-2 Repairs',
          duration: '40 ساعة تطبيقات كود ومعاينة ميدانية',
          topicsAr: [
            'تفتيش دوائر الأنابيب طبقاً لكود API 570: نقاط مراقبة السماكة (Condition Monitoring Locations - CMLs)',
            'تفتيش الخزانات البترولية طبقاً لكود API 653: فحص سماكة القاع (0.10 inch limit) وفحص ألواح الحلقة (Annular Plates)',
            'تقييم هبوط قاع الخزانات (Tank Bottom Settlement Evaluation) وتحديد خطر الإجهاد الحلقي الزائد',
            'طرق الإصلاح الهندسي المعتمدة بكود ASME PCC-2: الأكمام اللحامية (Type A & Type B Welded Sleeves)، واللحام المهدئ',
            'شروط واشتراطات التفريع على الساخن (Hot Tapping) لحام تفريعات جديدة دون إيقاف سريان السائل البترولي'
          ],
          topicsEn: [
            'Process piping inspection per API 570: Establishing Condition Monitoring Locations (CMLs) on high-risk fittings',
            'Aboveground storage tank integrity per API 653: Bottom plate minimum thickness limits (0.100 inch) and annular rings',
            'Tank bottom settlement engineering: Out-of-plane settlement survey analysis preventing brittle bottom rupture',
            'Engineered repairs per ASME PCC-2: Full-encirclement welded split sleeves (Type A pressure vs Type B leak containment)',
            'Hot tapping integrity governance: Safe wall thickness evaluation and burn-through prevention during live branch welding'
          ],
          learningOutcomesAr: [
            'إدارة منظومة تفتيش الأنابيب والخزانات بالكامل وتوجيه فرق القياس بالموجات فوق الصوتية UT',
            'اعتماد تقارير الإصلاح الهندسي الدائم والمؤقت بما يضمن التشغيل الآمن 100%'
          ],
          learningOutcomesEn: [
            'Direct comprehensive piping and storage tank inspection programs coordinating ultrasonic NDT teams',
            'Approve permanent engineered weld overlay and sleeve repairs guaranteeing structural restoration'
          ]
        }
      ],
      keyFormulas: [
        {
          nameAr: 'حساب السماكة الأدنى لأسطوانة وعاء ضغط أسطواني (ASME UG-27)',
          nameEn: 'ASME Section VIII Div 1 UG-27 Cylindrical Shell Formula',
          formula: 't_min = (P × R) / (S × E - 0.6 × P)',
          descriptionAr: 'حيث P ضغط التصميم الداخلي، R نصف القطر الداخلي للمعدة، S أقصى إجهاد مسموح للمعدن عند درجة حرارة التصميم، E كفاءة وصلة اللحام (Joint Efficiency: 1.0 للفحص الكامل، 0.85 للفحص الجزئي).',
          descriptionEn: 'Computes mandatory minimum wall thickness: P = internal pressure, R = internal radius, S = allowable stress, E = joint efficiency.'
        },
        {
          nameAr: 'حساب العمر التشغيلي المتبقي للمعدة البترولية (Remaining Life)',
          nameEn: 'API Remaining Service Life Formula',
          formula: 'Remaining Life (Years) = (t_actual - t_min) / Corrosion Rate',
          descriptionAr: 'يحدد عدد السنوات المتبقية حتى تصل سماكة الجدار الفعلية الحالية إلى الحد الأدنى التصميمي الحرج t_min.',
          descriptionEn: 'Determines operational runway in years before actual wall thickness reaches the critical code retirement limit.'
        }
      ],
      practicalSkillsChecklist: [
        { skillAr: 'حساب t_min وعمر تشغيلي لوعاء ضغط أسطواني بضغط 28 بار ومعدل تآكل 0.35 ملم/سنة وتحديد موعد الفحص القادم', skillEn: 'Calculate t_min and remaining life for a 28 bar vessel with 0.35 mm/yr corrosion defining turnaround year', importance: 'mandatory' },
        { skillAr: 'تقييم مسح قاع خزان بترولي بمعدل تسرب فيض مغناطيسي MFL وتحديد الألواح التي تحتاج استبدال وفق API 653', skillEn: 'Evaluate MFL tank floor bottom scan data and prescribe replacement plates breaching API 653 minimums', importance: 'mandatory' },
        { skillAr: 'تصميم واعتماد كم لحامي كامل التغطية (Type B Pressure Sleeve) لإصلاح تسريب موضعي طبقاً لـ ASME PCC-2', skillEn: 'Design and formally approve Type B pressure-containing sleeve repair for localized defect per ASME PCC-2', importance: 'mandatory' }
      ],
      referenceTextbooks: [
        { title: 'API Standard 510: Pressure Vessel Inspection Code', author: 'American Petroleum Institute', standardOrPublisher: 'API Publishing' },
        { title: 'API Standard 570: Piping Inspection Code', author: 'American Petroleum Institute', standardOrPublisher: 'API Publishing' },
        { title: 'API Standard 653: Tank Inspection, Repair, Alteration, and Reconstruction', author: 'American Petroleum Institute', standardOrPublisher: 'API Publishing' }
      ]
    },

    // -------------------------------------------------------------------------
    // LEVEL 3: API 579 FFS & RBI ASSET INTEGRITY DIRECTOR (المستوى الثالث)
    // -------------------------------------------------------------------------
    {
      levelId: 'level3',
      tierCategory: 'level3',
      nameAr: 'كبير استشاريي الصلاحية للخدمة وسلامة الأصول (API 579 FFS & RBI Asset Integrity Director)',
      nameEn: 'Level III (API 579 Fitness-For-Service & Asset Integrity Director)',
      academicStageAr: 'القمة الاستشارية في تقييم الأهلية التشغيلية للمعدات المتضررة بشروخ أو تآكل موضعي عميق والتفتيش المبني على المخاطر',
      academicStageEn: 'Supreme Consulting Authority in Fitness-For-Service, Failure Assessment Diagrams & Risk-Based Inspection',
      targetRoleAr: 'تنفيذ تقييمات API 579 المستوى 1 و 2 و 3، رسم مخططات تقييم الفشل (FAD)، خفض ضغط التشغيل، وبرمجة برامج RBI',
      targetRoleEn: 'Perform API 579 Level 1/2/3 FFS assessments, construct Failure Assessment Diagrams (FAD), rerating & RBI programs',
      prerequisitesAr: 'شهادات API المتعددة مع بكالوريوس هندسة وخبرة لا تقل عن 5 سنوات في نمذجة سلامة الأصول وميكانيكا الكسر',
      prerequisitesEn: 'Multiple API inspector credentials with B.Sc. Engineering and 5+ yrs experience in FFS modeling and fracture mechanics',
      trainingHours: 120,
      experienceMonths: 60,
      internationalCerts: ['API 580 Risk-Based Inspection Professional', 'API 571 Damage Mechanisms Specialist', 'API 579 / ASME FFS-1 Lead Evaluator'],
      applicableCodes: ['API 579-1 / ASME FFS-1', 'API 580 (RBI Principles)', 'API 581 (RBI Quantitative Methodology)', 'API 941 (HTHA Nelson Curves)'],
      responsibilitiesAr: [
        'تنفيذ تقييمات الصلاحية للخدمة (Fitness-For-Service per API 579) للمعدات التي تحوي مناطق تآكل موضعي (LTA) أو تنقر (Pitting)',
        'تقييم الشروخ والمؤشرات الخطية باستخدام مخطط تقييم الانهيار (Failure Assessment Diagram - FAD) لمعامل شدة الإجهاد K_r والتحميل L_r',
        'حساب معامل القوة المتبقية (Remaining Strength Factor - RSF) واتخاذ قرار خفض ضغط التشغيل (Derating) أو الاستمرار بأمان',
        'تصميم وتطبيق برامج التفتيش المبني على المخاطر (Risk-Based Inspection - RBI per API 580/581) لحساب احتمالية وعواقب الانهيار',
        'إعادة تقييم حدود منحنيات نيلسون (Nelson Curves per API 941) للمعدات المعرضة للهجوم الهيدروجيني الحار (HTHA)'
      ],
      responsibilitiesEn: [
        'Perform API 579-1 / ASME FFS-1 Fitness-For-Service assessments for Local Thin Areas (LTA), groves, and pitting clusters',
        'Evaluate planar crack-like flaws deploying Failure Assessment Diagrams (FAD) plotting toughness ratio (K_r) vs load ratio (L_r)',
        'Calculate Remaining Strength Factor (RSF) determining safe operational derating when RSF falls below code allowable (0.90)',
        'Engineer quantitative Risk-Based Inspection (RBI per API 580/581) systems modeling Probability and Consequence of Failure',
        'Re-evaluate high-temperature hydrogen service equipment against latest API 941 non-PWHT carbon steel Nelson curve updates'
      ],
      modules: [
        {
          id: 'mod_api_3_1',
          titleAr: 'الوحدة 1: تقييمات الصلاحية للخدمة API 579 لمناطق التآكل والشروخ (Levels 1, 2, 3)',
          titleEn: 'Module 1: API 579 / ASME FFS-1 Level 1/2/3 Assessments & FAD Crack Modeling',
          duration: '60 ساعة استشارية متقدمة ونمذجة عددية',
          topicsAr: [
            'هيكلة كود API 579-1 / ASME FFS-1: تقييم المستوى 1 (بسيط ومتحفظ)، المستوى 2 (هندسي مفصل)، والمستوى 3 (عناصر محدودة FEA)',
            'تقييم مناطق التآكل الموضعي (Local Thin Areas - Part 5): حساب طول منطقة التآكل الفعالة (s) ومعامل القوة المتبقية RSF',
            'تقييم الشروخ والعيوب المستوية (Crack-Like Flaws - Part 9): بناء منحنى تقييم الانهيار (Failure Assessment Diagram - FAD)',
            'نسبة معامل شدة الإجهاد (K_r = K_I / K_mat) ونسبة الحمل البلاستيكي الأقصى (L_r = σ_ref / σ_yield)',
            'شروط قبول الشروخ داخل منحنى الأمان (Safe Region) وخفض ضغط التشغيل المصرح به (Maximum Allowable Working Pressure - MAWP Rerating)'
          ],
          topicsEn: [
            'API 579-1 / ASME FFS-1 framework: Level 1 (conservative screening), Level 2 (detailed engineering), Level 3 (elastic-plastic FEA)',
            'Part 5 Local Thin Area (LTA) methodology: Effective length (s), remaining thickness ratio (R_t), and RSF evaluation',
            'Part 9 Crack-Like Flaw assessment: Constructing Failure Assessment Diagrams (FAD) evaluating fracture vs plastic collapse',
            'Computing stress intensity ratio (K_r = K_I / K_mat) and reference stress limit load ratio (L_r = σ_ref / σ_yield)',
            'Criteria for crack acceptance within FAD envelope and safe MAWP derating calculations avoiding catastrophic shutdown'
          ],
          learningOutcomesAr: [
            'اتخاذ القرارات الهندسية المصيرية لإبقاء معدات تحوي شروخاً في الخدمة بأمان تام دون توقف الإنتاج',
            'حساب ضغط التشغيل المخفض الآمن وتفادي خسائر مالية تقدر بعشرات الملايين من الدولارات'
          ],
          learningOutcomesEn: [
            'Render supreme engineering determinations safely operating flawed pressure assets avoiding catastrophic loss-of-containment',
            'Compute safe derated operating pressures preventing tens of millions of dollars in unnecessary shutdown losses'
          ]
        },
        {
          id: 'mod_api_3_2',
          titleAr: 'الوحدة 2: التفتيش المبني على المخاطر (API 580/581 RBI) وإدارة سلامة الأصول المؤسسية',
          titleEn: 'Module 2: Risk-Based Inspection (API 580/581 RBI) & Corporate Asset Governance',
          duration: '60 ساعة استشارات ونمذجة مخاطر',
          topicsAr: [
            'منهجية الـ RBI الكمية طبقاً لكود API 581: حساب احتمالية الانهيار (Probability of Failure - PoF) من معدلات التآكل وجودة التفتيش',
            'حساب عواقب الانهيار (Consequence of Failure - CoF): نمذجة السحابة القابلة للاشتعال، السمية، والتأثير البيئي والمالي',
            'مصفوفة المخاطر (Risk Matrix 5x5): تحويل نقاط التفتيش من أسلوب المواعيد الثابتة إلى أسلوب الأولوية المبنية على المخاطر',
            'تحقيق وفورات ضخمة بإطالة فترات التفتيش للمعدات منخفضة المخاطر وتركيز الموارد على المعدات الحرجة',
            'إدارة سلامة الأصول المتكاملة (Asset Integrity Management System - AIMS) والربط مع أنظمة SAP PM'
          ],
          topicsEn: [
            'Quantitative RBI methodology per API 581: Determining Probability of Failure (PoF) factoring damage rates and inspection effectiveness',
            'Consequence of Failure (CoF) modeling: Flammable vapor dispersion footprint, toxic release cloud, and financial business interruption',
            '5x5 Corporate Risk Matrix: Transitioning plant turnaround strategies from calendar-based intervals to dynamic risk-based windows',
            'Driving major OPEX optimization by safely extending inspection intervals on low-risk equipment and focusing on high-risk circuits',
            'Corporate Asset Integrity Management System (AIMS) governance and enterprise integration with SAP PM plant maintenance'
          ],
          learningOutcomesAr: [
            'إعادة هندسة خطط الصيانة الشاملة للمصانع والمصافي الكبرى وتوفير ما يصل لـ 40% من ميزانيات التفتيش',
            'تصفير احتمالية الحوادث الكارثية من خلال التركيز الاستباقي على المعدات الأكثر خطورة'
          ],
          learningOutcomesEn: [
            'Re-engineer plant turnaround inspection master plans achieving up to 40% OPEX savings while elevating safety levels',
            'Drive process safety events to absolute zero through proactive prioritization of critical degradation circuits'
          ]
        }
      ],
      keyFormulas: [
        {
          nameAr: 'معادلة معامل القوة المتبقية لمناطق التآكل الموضعي (Remaining Strength Factor)',
          nameEn: 'API 579 Remaining Strength Factor (RSF)',
          formula: 'RSF = R_t / [ 1 - (1 - R_t) / M_t ]',
          descriptionAr: 'حيث R_t نسبة السماكة المتبقية إلى الأصلية، M_t معامل تدعيم الفولنج. إذا كانت قيمة RSF ≥ 0.90 تعتبر المعدة صالحة للخدمة بالضغط الكامل.',
          descriptionEn: 'Evaluates structural integrity of localized wall loss; equipment is fit for continuous full-pressure service if RSF ≥ 0.90.'
        },
        {
          nameAr: 'معادلة حساب المخاطر الكلية في منظومة API 580/581 RBI',
          nameEn: 'API 580/581 Quantitative Risk Equation',
          formula: 'Risk (t) = Probability of Failure [PoF(t)] × Consequence of Failure (CoF)',
          descriptionAr: 'تحدد مستوى الخطر الرياضي لأي معدة كحاصل ضرب احتمالية الانهيار السنوية (بالدولار أو مساحة التأثر) في عواقب الانهيار.',
          descriptionEn: 'Calculates annualized asset risk score combining dynamic time-dependent PoF and monetary/environmental CoF.'
        }
      ],
      practicalSkillsChecklist: [
        { skillAr: 'إجراء تقييم API 579 المستوى 1 لمنطقة تآكل موضعي LTA في وعاء فصل غاز وحساب معامل RSF وتحديد صلاحيته', skillEn: 'Execute API 579 Level 1 assessment on gas separator local thin area (LTA) computing RSF and fitness status', importance: 'mandatory' },
        { skillAr: 'بناء مخطط تقييم انهيار FAD لشرخ طولي سطحي في خط أنابيب وحساب إحداثيات (L_r, K_r) ومقارنتها بمنحنى الأمان', skillEn: 'Plot API 579 Failure Assessment Diagram (FAD) for pipeline crack calculating (L_r, K_r) against safe boundary', importance: 'mandatory' },
        { skillAr: 'بناء نموذج تقييم مخاطر RBI لمصفاة نفط متضمناً 50 دائرة تآكل وتحديد فترات التفتيش المحسوبة بناءً على مصفوفة المخاطر', skillEn: 'Build API 581 quantitative RBI model for 50 refinery corrosion loops establishing risk-optimized turnaround dates', importance: 'mandatory' }
      ],
      referenceTextbooks: [
        { title: 'API 579-1 / ASME FFS-1: Fitness-For-Service (Comprehensive Edition)', author: 'API / ASME Standards Committee', standardOrPublisher: 'American Petroleum Institute' },
        { title: 'API Recommended Practice 580: Risk-Based Inspection', author: 'American Petroleum Institute', standardOrPublisher: 'API Publishing' },
        { title: 'API Recommended Practice 581: Risk-Based Inspection Methodology', author: 'American Petroleum Institute', standardOrPublisher: 'API Publishing' }
      ]
    }
  ]
};
