import { EngineeringDiscipline } from '../types';

export const weldingInspectionDiscipline: EngineeringDiscipline = {
  id: 'welding_inspection',
  titleAr: 'علوم وهندسة وتفتيش اللحام (Welding Engineering & Metallurgy)',
  titleEn: 'Welding Engineering, Metallurgy & Inspection (CSWIP, AWS CWI, ASME IX, ISO 15614)',
  category: 'welding',
  badgeColor: 'emerald',
  overviewAr: 'علم فيزياء القوس الكهربائي وميتالورجيا انصهار وتجمد المعادن وسلوك المنطقة المتأثرة بالحرارة (HAZ). يشمل اعتماد مواصفات إجراءات اللحام (WPS/PQR)، تأهيل اللحامين، الفحص البصري بالمقاييس الدقيقة، والاختبارات الميكانيكية الإتلافية من النظريات الأكاديمية وحتى الاستشارات الدولية العليا.',
  overviewEn: 'The rigorous science of arc thermodynamics, solid-state phase transformations, and heat-affected zone integrity. Spans WPS/PQR design, welder qualifications, precision visual gauging, and destructive mechanical testing from university metallurgy to CSWIP/AWS consulting.',
  keyTechniques: [
    'SMAW / MMA (Shielded Metal Arc / Manual Metal Arc)',
    'GTAW / TIG (Gas Tungsten Arc Welding - Exotic & Root)',
    'GMAW / MIG-MAG (Gas Metal Arc Welding & Pulse)',
    'FCAW (Flux-Cored Arc Welding - Gas & Self Shielded)',
    'SAW (Submerged Arc Welding - Heavy Wall Fabrication)',
    'Destructive Testing (Tensile, Bend, Charpy Impact, Macro-etch, CTOD)'
  ],
  globalAccreditations: ['CSWIP 3.1 & 3.2 (TWI UK)', 'AWS CWI / SCWI (American Welding Society)', 'IIW International Welding Engineer (IWE)', 'ASME Section IX', 'BS EN ISO 15614-1'],
  targetIndustries: ['Boiler & Heavy Pressure Vessels', 'Shipbuilding & Marine Fabrication', 'Cross-Country Pipelines', 'Structural Steel Bridges', 'Nuclear Power Plants'],
  levels: [
    // -------------------------------------------------------------------------
    // LEVEL 1: ACADEMIC & UNIVERSITY FOUNDATIONS (المرحلة الأكاديمية والجامعية)
    // -------------------------------------------------------------------------
    {
      levelId: 'academic',
      tierCategory: 'academic',
      nameAr: 'المرحلة الأكاديمية والجامعية (University Welding Metallurgy & Arc Physics)',
      nameEn: 'Academic & University Welding Metallurgy Foundations',
      academicStageAr: 'المقررات الأكاديمية التأسيسية لطلاب كليات الهندسة (Metallurgy, Mechanical & Materials Engineering)',
      academicStageEn: 'University Degree Coursework in Physical Metallurgy, Phase Transformations & Thermodynamics',
      targetRoleAr: 'دراسة مخططات التوازن الحراري (Fe-C)، تحولات الأطوار، ميتالورجيا المنطقة المتأثرة بالحرارة HAZ، وحسابات الطاقة الحرارية',
      targetRoleEn: 'Master iron-carbon equilibrium, solid-state phase transformations, HAZ thermal kinetics, and arc physics',
      prerequisitesAr: 'دراسة جامعية في الميتالورجيا الفيزيائية، علم البلورات (Crystallography)، ميكانيكا المواد، والديناميكا الحرارية',
      prerequisitesEn: 'University coursework in Physical Metallurgy, Crystallography, Mechanics of Materials, and Thermodynamics',
      trainingHours: 120,
      experienceMonths: 0,
      internationalCerts: ['B.Sc. Metallurgy / Materials / Mechanical', 'IIW Student Affiliate'],
      applicableCodes: ['ISO 15608 (Material Grouping)', 'ASTM A370 (Mechanical Testing)', 'AWS A3.0 (Welding Terms)'],
      responsibilitiesAr: [
        'تحليل مخطط الحديد والكربون (Fe-C Phase Diagram) وتغيرات أطوار الأوستنيت، الفيريت، البيرلايت، والباينيت',
        'دراسة تحول المارتينسيت غير التوازني والمسببات المجهرية للتقصف وهشاشة اللحام',
        'تفسير منحنيات التحول أثناء التبريد المستمر (Continuous Cooling Transformation - CCT Diagrams)',
        'فهم ميكانيزم الشروخ الهيدروجينية الباردة (HICC) وحساب الكربون المكافئ (CE) لتحديد التسخين المسبق',
        'استخدام مخططات شيفلر وديلونغ (Schaeffler & DeLong Diagrams) لتحديد نسبة الفيريت في صلب الدوبلكس والإستانلس'
      ],
      responsibilitiesEn: [
        'Analyze the Iron-Carbon phase equilibrium diagram and crystal structures (FCC Austenite, BCC Ferrite, BCT Martensite)',
        'Model non-equilibrium martensitic transformation kinetics and the micromechanisms of weld embrittlement',
        'Interpret Continuous Cooling Transformation (CCT) diagrams and the impact of cooling rate (Δt₈/₅) on HAZ grain growth',
        'Master the 4-factor mechanism of Hydrogen Induced Cold Cracking (HICC) and compute Carbon Equivalents (CE)',
        'Deploy Schaeffler and DeLong constitution diagrams to balance Ferrite Number (FN) in stainless and duplex welds'
      ],
      modules: [
        {
          id: 'mod_w_acad_1',
          titleAr: 'الوحدة الأكاديمية 1: ميتالورجيا تحولات الأطوار ومخطط الحديد والكربون',
          titleEn: 'Academic Module 1: Physical Metallurgy, Fe-C Thermodynamics & CCT Diagrams',
          duration: '45 ساعة محاضرات ونظريات صلب',
          topicsAr: [
            'التركيب البلوري للحديد: حديد ألفا (BCC Ferrite)، حديد جاما (FCC Austenite)، وحديد دلتا عالي الحرارة',
            'مخطط التوازن الحراري للحديد والكربون وتفاعلات اليوتكتويد واليوتكتيك وتكون السمنتيت (Fe₃C)',
            'المنطقة المتأثرة بالحرارة (HAZ): منطقة نمو الحبيبات الخشنة (CGHAZ)، التكرير الدقيق (FGHAZ)، ومنطقة ما بين الحرجين (ICHAZ)',
            'منحنيات CCT وزمن التبريد بين 800°م و 500°م (Δt₈/₅) وتأثيره على قساوة اللحام ومقاومة الصدمات',
            'الكربون المكافئ: معادلة IIW ومعادلة Ito-Bessyo (Pcm) للصلب منخفض الكربون عالي المقاومة (HSLA)'
          ],
          topicsEn: [
            'Crystallography of iron: BCC Alpha Ferrite, FCC Gamma Austenite, and high-temperature Delta Ferrite',
            'Iron-Carbon phase equilibrium diagram: Eutectoid reaction, pearlite lamellae, and cementite (Fe₃C) stoichiometry',
            'Heat Affected Zone (HAZ) sub-zones: Coarse-Grained HAZ (CGHAZ), Fine-Grained HAZ (FGHAZ), and Intercritical HAZ (ICHAZ)',
            'Continuous Cooling Transformation (CCT) kinetics and the critical 800°C to 500°C cooling time (Δt₈/₅)',
            'Carbon Equivalent formulations: IIW formula and Ito-Bessyo (Pcm) parameter for High-Strength Low-Alloy (HSLA) steels'
          ],
          learningOutcomesAr: [
            'التنبؤ بالميكروستركشر المتولد في أي وصلة لحام قبل إشعال القوس الكهربائي',
            'حساب درجات حرارة التسخين المسبق وحرارة ما بين التمريرات لمنع الشروخ الباردة تماماً'
          ],
          learningOutcomesEn: [
            'Predict microstructural phases developed within any weldment prior to arc striking',
            'Accurately calculate preheat and interpass temperatures to eliminate cold hydrogen cracking risks'
          ]
        },
        {
          id: 'mod_w_acad_2',
          titleAr: 'الوحدة الأكاديمية 2: فيزياء القوس الكهربائي وديناميكا الغازات الواقية وميكانيكا الاختبارات',
          titleEn: 'Academic Module 2: Arc Physics, Shielding Gas Thermodynamics & Destructive Testing',
          duration: '45 ساعة محاضرات ومختبرات ميكانيكية',
          topicsAr: [
            'فيزياء عمود القوس الكهربائي: التأين الحراري، انبعاث الإلكترونات، وتأثير مجال لورنتز الكهرومغناطيسي على شكل البركة',
            'أنماط انتقال قطرات المعدن المنصهر: الانتقال بالدائرة القصيرة (Short Circuiting)، الكروي، والرشاشي والرذاذي (Spray & Pulse)',
            'الديناميكا الحرارية للغازات الواقية: الأرجون، الهيليوم، ثاني أكسيد الكربون، وتأثير جهد التأين على شكل التغلغل',
            'ميكانيكا الاختبارات الإتلافية: اختبار الشد المتقاطع (Tensile Strength)، اختبار الثني الموجه (Guided Bend)، واختبار الصدم شاربي (Charpy V-Notch)',
            'مخطط شيفلر وديلونغ: حساب مكافئ النيكل ومكافئ الكروم لتجنب الشروخ الحارة (Solidification Hot Cracking)'
          ],
          topicsEn: [
            'Arc physics: Thermal ionization, thermionic electron emission, and Lorentz electromagnetic pinch forces on weld pools',
            'Molten metal droplet transfer modes: Short-circuit dip transfer, globular transfer, axial spray, and pulsed arc',
            'Shielding gas thermodynamics: Argon, Helium, CO₂ mixtures, ionization potentials, and weld penetration profiles',
            'Mechanical testing mechanics: Transverse tensile testing, guided bend ductility (QW-160), and sub-zero Charpy V-notch toughness',
            'Schaeffler and DeLong constitution diagrams: Nickel and Chromium equivalents to eliminate hot solidification cracking'
          ],
          learningOutcomesAr: [
            'الربط الدقيق بين بارامترات القوس الكهربائي والخواص الميكانيكية للوصلة المنجزة',
            'تفسير أسباب الانهيار الميكانيكي في عينات الشد والثني والصدم'
          ],
          learningOutcomesEn: [
            'Directly correlate arc electrical parameters with the resulting mechanical integrity of the joint',
            'Interpret mechanical failure modes in tensile necking, bend ductility, and Charpy impact fractography'
          ]
        }
      ],
      keyFormulas: [
        {
          nameAr: 'حساب الطاقة الحرارية المدخلة للقوس الكهربائي (Heat Input)',
          nameEn: 'Arc Welding Heat Input Equation',
          formula: 'HI = (V × I × 60) / (v × 1000) × η',
          descriptionAr: 'حيث V الجهد بالفولت، I التيار بالأمبير، v سرعة حركة اللحام بالملم/دقيقة، η معامل كفاءة العملية (SMAW = 0.8, GTAW = 0.6, GMAW = 0.8, SAW = 1.0). الناتج بوحدة kJ/mm.',
          descriptionEn: 'Computes heat energy delivered per unit length (kJ/mm) accounting for process thermal efficiency (η).'
        },
        {
          nameAr: 'معادلة الكربون المكافئ الدولية (IIW Carbon Equivalent)',
          nameEn: 'IIW Carbon Equivalent Formula (CE)',
          formula: 'CE_IIW = C + (Mn / 6) + ((Cr + Mo + V) / 5) + ((Ni + Cu) / 15)',
          descriptionAr: 'إذا تجاوزت قيمة CE نسبة 0.40%، يصبح الصلب عرضة للتصلب المارتينسيتي ويتطلب تسخيناً مسبقاً إلزامياً لمنع الشروخ.',
          descriptionEn: 'Assesses steel hardenability; preheat is mandatory when CE exceeds 0.40% to prevent brittle martensite.'
        },
        {
          nameAr: 'معامل قابلية التشقق الهيدروجيني للصلب منخفض الكربون (Pcm)',
          nameEn: 'Ito-Bessyo Cracking Parameter (Pcm)',
          formula: 'Pcm = C + (Si / 30) + ((Mn + Cu + Cr) / 20) + (Ni / 60) + (Mo / 15) + (V / 10) + (5 × B)',
          descriptionAr: 'أدق معادلة لتحديد قابلية التصدع الهيدروجيني لخطوط الأنابيب الفولاذية الحديثة منخفضة الكربون جداً (C < 0.12%).',
          descriptionEn: 'The most accurate weldability index for modern thermo-mechanically controlled low-carbon pipeline steels.'
        }
      ],
      practicalSkillsChecklist: [
        { skillAr: 'فحص مجهري لعينة صلب ملحومة بعد الصقل والتنميش بمحلول النيتال (Nital 2%) وتحديد أطوار HAZ', skillEn: 'Microscopic examination of nital-etched weld cross-section identifying pearlite, ferrite, and martensite', importance: 'mandatory' },
        { skillAr: 'حساب الطاقة الحرارية تجريبياً بلحام تمريرة باستخدام ساعة توقف وأفوميتر معاير ومقارنتها بمواصفة WPS', skillEn: 'Calculate real-time heat input on test weld coupon using calibrated digital meters and stopwatch', importance: 'mandatory' },
        { skillAr: 'إجراء اختبار الكسر الصدمي شاربي Charpy V-Notch عند درجة -20°م وحساب الطاقة الممتصة بالجول', skillEn: 'Perform sub-zero Charpy V-notch impact testing at -20°C and measure absorbed energy in Joules', importance: 'mandatory' }
      ],
      referenceTextbooks: [
        { title: 'Welding Metallurgy (Vols 1 & 2)', author: 'George E. Linnert', standardOrPublisher: 'American Welding Society' },
        { title: 'The Metallurgy of Welding', author: 'D. Lancaster', standardOrPublisher: 'Allen & Unwin' },
        { title: 'ASM Handbook, Volume 6: Welding, Brazing, and Soldering', author: 'ASM International', standardOrPublisher: 'ASM Press' }
      ]
    },

    // -------------------------------------------------------------------------
    // LEVEL 2: CERTIFIED WELDING INSPECTOR (المستوى الثاني المهني المعتمد)
    // -------------------------------------------------------------------------
    {
      levelId: 'level2',
      tierCategory: 'level2',
      nameAr: 'مفتش لحام معتمد دولياً (CSWIP 3.1 / AWS CWI Certified Inspector)',
      nameEn: 'Level II (Certified Welding Inspector - CSWIP 3.1 / AWS CWI)',
      academicStageAr: 'الشهادة المهنية الأولى عالمياً في تفتيش وضبط جودة أعمال اللحام في المواقع والمصانع',
      academicStageEn: 'Premier Global Professional Credential in Welding Inspection Surveillance (CSWIP 3.1 / AWS CWI)',
      targetRoleAr: 'التفتيش البصري المباشر للحامات ومراقبة معايير اللحام قبل وأثناء وبعد عملية اللحام وتطبيق الأكواد',
      targetRoleEn: 'Direct visual inspection of welds, in-process variable monitoring, welder testing, code compliance enforcement',
      prerequisitesAr: 'خبرة موثقة 3 سنوات في عمليات تصنيع ولحام المنشآت الهندسية مع اجتياز امتحانات TWI أو AWS النظرية والعملية',
      prerequisitesEn: '3+ years documented welding fabrication experience, passing theory, code and practical specimen examinations',
      trainingHours: 80,
      experienceMonths: 36,
      internationalCerts: ['CSWIP 3.1 Welding Inspector (TWI)', 'AWS CWI Certified Welding Inspector', 'ISO 9712 VT Level 2'],
      applicableCodes: ['ASME Sec IX', 'AWS D1.1', 'API 1104', 'BS EN ISO 15614-1', 'ISO 5817', 'ASME B31.3'],
      responsibilitiesAr: [
        'التأكد من مطابقة شطبة اللحام وزاوية الميل وفجوة الجذر (Root Gap) وعدم المحاذاة (Hi-Lo) قبل إشعال القوس',
        'مراقبة بارامترات اللحام أثناء التنفيذ: التيار، الجهد، سرعة الحركة، درجة حرارة التسخين المسبق، ونوع السلك',
        'التأكد من حفظ وتجفيف إلكترودات اللحام منخفضة الهيدروجين في أفران الموقع (Holding Ovens عند 150°م)',
        'استخدام مساطر ومقاييس اللحام الدقيقة (Cambridge Gauge, Hi-Lo Gauge) لقياس النحر والتدعيم وأبعاد الفيلت',
        'مراجعة شهادات المواد الميتالورجية (EN 10204 Type 3.1 MTR) ومطابقة أرقام الصب (Heat Numbers)'
      ],
      responsibilitiesEn: [
        'Verify weld joint preparation, bevel angle, root face, root gap, and Hi-Lo misalignment prior to arc strike',
        'Monitor in-process variables: Amperage, Voltage, Travel Speed, Preheat/Interpass temperature, and consumable wire batch',
        'Enforce low-hydrogen electrode baking and quivered storage protocols (holding ovens at 150°C min)',
        'Deploy precision gauges (Cambridge gauge, Hi-Lo gauge) measuring undercut, reinforcement, and fillet throat',
        'Review Mill Test Reports (MTR per EN 10204 3.1) cross-referencing steel chemistry and mechanical properties'
      ],
      modules: [
        {
          id: 'mod_w2_1',
          titleAr: 'الوحدة 1: ممارسات التفتيش البصري واستخدام المقاييس وتشخيص عيوب اللحام',
          titleEn: 'Module 1: Visual Inspection Methodology, Precision Gauges & Defect Diagnosis',
          duration: '40 ساعة تدريب عملي ومقاييس',
          topicsAr: [
            'استخدام مقياس كامبريدج (Cambridge Gauge): قياس زاوية الشطبة، عمق النحر (Undercut)، وارتفاع التدعيم',
            'استخدام مقياس Hi-Lo لقياس عدم المحاذاة الداخلية للأنابيب قبل التمريرة الأولى (Root Pass)',
            'تشخيص عيوب اللحام السطحية والداخلية: الشروخ، نقص الانصهار الجانبي، نقص التغلغل، المسامية، والخبث المحبوس',
            'إجراءات تجفيف وحفظ إلكترودات اللحام القلوية (E7018) ومنع امتصاص الرطوبة الهوائية',
            'مراجعة شهادات اختبار المواد المصنعية (Mill Test Reports - EN 10204 Type 3.1)'
          ],
          topicsEn: [
            'Cambridge gauge mechanics: Measuring bevel angles, undercut depth, cap height, and fillet throat/leg dimensions',
            'Hi-Lo internal gauge operation: Verifying internal pipe bore alignment prior to root run execution',
            'Morphology of welding defects: Solidification cracks, lack of sidewall fusion, incomplete penetration, porosity, slag lines',
            'Low-hydrogen SMAW consumable handling: Baking at 350°C, holding oven storage at 150°C, and portable heated quivers',
            'Reviewing Mill Test Reports (EN 10204 Type 3.1) auditing chemistry, tensile strength, yield ratio, and Charpy values'
          ],
          learningOutcomesAr: [
            'اكتشاف ومنع 90% من عيوب اللحام في مراحل التجميع وقبل اكتمال اللحام',
            'القياس الدقيق لأبعاد اللحام وإثبات مطابقتها لمواصفات العقد'
          ],
          learningOutcomesEn: [
            'Detect and prevent over 90% of welding defects during pre-weld fit-up and in-process stages',
            'Execute micro-gauge measurements verifying strict compliance with engineering drawings'
          ]
        },
        {
          id: 'mod_w2_2',
          titleAr: 'الوحدة 2: تطبيق أكواد اللحام والتفتيش العالمية (ASME IX, AWS D1.1, API 1104)',
          titleEn: 'Module 2: Code Applications & Welder Performance Testing',
          duration: '40 ساعة دراسات أكواد وامتحانات',
          topicsAr: [
            'معايير التفتيش البصري بكود ASME B31.3 Table 341.3.2 وحدود عمق النحر (Undercut ≤ 1mm)',
            'معايير اللحامات الإنشائية بكود AWS D1.1 Table 6.1 وتصنيف الوصلات الثابتة والديناميكية',
            'معايير فحص لحام خطوط الأنابيب البترولية بكود API 1104 Section 9 ومجموع أطوال المسامية والخبث',
            'الإشراف على اختبارات تأهيل أداء اللحامين (Welder Performance Qualification - WPQ) في أوضاع 1G إلى 6G/6GR',
            'إعداد محاضر عدم المطابقة للحامات المرفوضة وتحديد خطة ومسار الحفر والإصلاح (Weld Repair Procedure)'
          ],
          topicsEn: [
            'ASME B31.3 Table 341.3.2 visual acceptance criteria: Strict undercut limits (≤ 1mm) and zero crack tolerance',
            'AWS D1.1 Table 6.1 structural visual limits for statically and cyclically loaded tubular connections',
            'API 1104 Section 9 pipeline girth weld acceptance limits for slag inclusion pockets and hollow beads',
            'Witnessing and auditing Welder Performance Qualification (WPQ) tests across 1G, 2G, 3G, 4G, 5G, and 6G/6GR positions',
            'Authoring Non-Conformance Reports (NCR) for rejectable welds and approving repair excavation procedures'
          ],
          learningOutcomesAr: [
            'التحكم الكامل في جودة أعمال اللحام في أي مشروع بترولي أو إنشائي ضخم',
            'إدارة اختبارات اللحامين واستبعاد غير المؤهلين قانونياً وفنياً'
          ],
          learningOutcomesEn: [
            'Exercise total quality oversight over welding execution across major industrial mega-projects',
            'Administer welder qualification coupons and eliminate substandard craftsmanship with code authority'
          ]
        }
      ],
      keyFormulas: [
        {
          nameAr: 'حساب سماكة الحلق النظرية لوصلة اللحام الزاوية (Fillet Weld Throat)',
          nameEn: 'Theoretical Fillet Weld Throat Formula',
          formula: 'Theoretical Throat (a) = Leg Length (z) × cos(45°) = 0.707 × z',
          descriptionAr: 'يحدد السماكة التصميمية الفعالة الحاملة للإجهاد في لحام الزاوية (Fillet) بناءً على طول ساق اللحام (Leg Length).',
          descriptionEn: 'Calculates the load-bearing design throat thickness of an equal-leg fillet weld.'
        }
      ],
      practicalSkillsChecklist: [
        { skillAr: 'استخدام مقياس كامبريدج لقياس عدم المحاذاة (Hi-Lo)، عمق النحر (Undercut)، وارتفاع التدعيم على عينة حقيقية', skillEn: 'Operate Cambridge gauge measuring Hi-Lo misalignment, undercut depth, and cap height on pipe coupon', importance: 'mandatory' },
        { skillAr: 'تدقيق شهادة اختبار ميتالورجية EN 10204 3.1 للوحة صلب A516 Gr 70 ومطابقة الكربون المكافئ ومقاومة الشد', skillEn: 'Audit EN 10204 3.1 MTR for SA-516 Gr 70 plate cross-checking CE formula and UTS against ASME Sec II', importance: 'mandatory' },
        { skillAr: 'الإشراف على اختبار لحام لوصلة أنبوبية وضع 6G ومراقبة المتغيرات وإجراء فحص الثني والماكرو', skillEn: 'Witness 6G pipe welder qualification test, monitor WPS variables, and evaluate bend/macro specimens', importance: 'mandatory' }
      ],
      referenceTextbooks: [
        { title: 'CSWIP 3.1 Welding Inspector Course Notes', author: 'TWI Training & Examination Services', standardOrPublisher: 'The Welding Institute (TWI)' },
        { title: 'AWS Welding Inspection Handbook', author: 'American Welding Society', standardOrPublisher: 'AWS Press' },
        { title: 'ASME Section IX: Welding, Brazing, and Fusing Qualifications', author: 'ASME International', standardOrPublisher: 'ASME Standards' }
      ]
    },

    // -------------------------------------------------------------------------
    // LEVEL 3: SENIOR WELDING CONSULTANT & IIW WELDING ENGINEER (المستوى الثالث)
    // -------------------------------------------------------------------------
    {
      levelId: 'level3',
      tierCategory: 'level3',
      nameAr: 'كبير استشاريي هندسة وتفتيش اللحام (CSWIP 3.2 / IIW International Welding Engineer - IWE)',
      nameEn: 'Level III (Senior Welding Consultant & IIW Welding Engineer)',
      academicStageAr: 'الرتبة الهندسية والاستشارية القصوى في هندسة وتصميم واعتماد إجراءات اللحام الدولية (IWE / CSWIP 3.2)',
      academicStageEn: 'Peak International Engineering Authority in Welding Design & Procedure Approvals (IWE / CSWIP 3.2)',
      targetRoleAr: 'تصميم واعتماد مواصفات إجراءات اللحام (WPS/PQR)، حل معضلات الكسر والتشقق، والتحكيم الهندسي الشامل',
      targetRoleEn: 'Author and qualify WPS/PQR dossiers, resolve complex cracking failures, arbitrate international engineering disputes',
      prerequisitesAr: 'بكالوريوس هندسة ميكانيكية أو ميتالورجيا مع خبرة لا تقل عن 5 سنوات واجتياز امتحانات IIW / CSWIP 3.2 المتقدمة',
      prerequisitesEn: 'B.Sc. Mechanical/Metallurgical Engineering with 5+ yrs experience, passing advanced IIW or CSWIP 3.2 exams',
      trainingHours: 120,
      experienceMonths: 60,
      internationalCerts: ['IIW International Welding Engineer (IWE)', 'CSWIP 3.2 Senior Welding Inspector', 'AWS Senior Certified Welding Inspector (SCWI)'],
      applicableCodes: ['ASME Section IX', 'BS EN ISO 15614-1', 'AWS D1.1', 'ISO 3834 (Welding Quality Requirements)', 'API 582'],
      responsibilitiesAr: [
        'تصميم وتأليف واعتماد مواصفات إجراءات اللحام (Welding Procedure Specification - WPS) وسجلات تأهيلها (PQR)',
        'تحديد وإدارة المتغيرات الأساسية (Essential Variables) والمكملة (Supplementary) المتعلقة بمتانة الصدمات في كود ASME IX',
        'تأسيس منظومة الجودة الشاملة للمصانع والورش طبقاً لمواصفة ISO 3834-2 لضمان الجودة المتكاملة للحام الانصهاري',
        'حل معضلات اللحام المعقدة: الشروخ الهيدروجينية، شروخ التمزق الصفيحي (Lamellar Tearing)، وشروخ إعادة التسخين (Reheat Cracks)',
        'تمثيل المنشأة كخبير استشاري أعلى في التحكيم الهندسي أمام عملاء النفط والهيئات العالمية'
      ],
      responsibilitiesEn: [
        'Author, engineer, and approve Welding Procedure Specifications (WPS) and Procedure Qualification Records (PQR)',
        'Govern ASME Section IX Essential, Supplementary Essential (notch-toughness related), and Non-essential variables',
        'Establish corporate welding quality management systems satisfying comprehensive ISO 3834-2 requirements',
        'Investigate and resolve critical fabrication crises: Lamellar tearing in heavy plates, reheat cracking, and DMW embrittlement',
        'Serve as supreme consulting authority in technical arbitration before international energy majors and audit bureaus'
      ],
      modules: [
        {
          id: 'mod_w3_1',
          titleAr: 'الوحدة 1: هندسة واعتماد حزم مواصفات الإجراءات (WPS / PQR per ASME IX & ISO 15614)',
          titleEn: 'Module 1: Advanced WPS/PQR Engineering & P-No / F-No / A-No Grouping',
          duration: '60 ساعة استشارية وتصميم أكواد',
          topicsAr: [
            'منظومة تصنيف المعادن في كود ASME IX: أرقام P-Numbers للمعدن الأساسي، وأرقام F-Numbers لأسلاك اللحام، وأرقام A-Numbers للتحليل الكيميائي',
            'سجل تأهيل الإجراء (PQR): شروط الاختبارات الإتلافية، عينات الشد، عينات الثني، واختبارات الصدم الإلزامية لخدمات الغاز المسال LNG',
            'نطاقات التأهيل المكتسبة: سماكات المعدن الأساسي (Thickness Range QW-451)، وأقطار الأنابيب المؤهلة، وأوضاع اللحام',
            'تصميم إجراءات لحام السبائك الخاصة: الفولاذ الأوستنيتي المقاوم للصدأ، سبائك النيكل إنكونيل (Inconel 625/825)، والتيتانيوم',
            'التأهيل وفق المواصفة الأوروبية ISO 15614-1 (Level 1 & Level 2) ومقارنتها بكود ASME IX'
          ],
          topicsEn: [
            'ASME Section IX material grouping: Base metal P-Numbers, filler metal F-Numbers, and weld deposit A-No chemical analysis',
            'Procedure Qualification Record (PQR) engineering: Tensile testing, bend tests, and mandatory Charpy impact at cryogenic LNG temps',
            'Qualified thickness ranges (QW-451), qualified pipe diameters, and deposition thickness limits per welding process',
            'Formulating specialized WPS dossiers for exotic alloys: Austenitic stainless, Super Duplex, Inconel 625/825, and Titanium',
            'ISO 15614-1 (Level 1 & Level 2) qualification workflows and rigorous cross-comparisons against ASME Section IX'
          ],
          learningOutcomesAr: [
            'القدرة على تأليف حزمة إجراءات لحام WPS/PQR متكاملة لأعقد المشاريع الصناعية دون أي خطأ تعاقدي',
            'تحقيق وفورات مالية ضخمة للشركة من خلال الاستفادة القصوى من نطاقات التأهيل المكتسبة بالأكواد'
          ],
          learningOutcomesEn: [
            'Author complete WPS/PQR engineering packages for the most complex industrial projects with zero contractual exposure',
            'Achieve massive corporate cost savings by optimizing code qualification ranges across multi-project operations'
          ]
        },
        {
          id: 'mod_w3_2',
          titleAr: 'الوحدة 2: ميكانيكا كسر اللحامات (CTOD) والتحقيق الجنائي في الانهيارات الميدانية',
          titleEn: 'Module 2: Weld Fracture Mechanics (CTOD) & Forensic Failure Investigation',
          duration: '60 ساعة تحقيقات ودراسات انهيار',
          topicsAr: [
            'اختبار فتحة قمة الشرخ (Crack Tip Opening Displacement - CTOD per BS 7448 / ASTM E1820) للخدمات البحرية الحرجة',
            'التحقيق في انهيار خطوط الأنابيب وأوعية الضغط: التفرقة بين الكسر الهش الانشقاقي (Cleavage) والكسر المطيل ذو الفجوات المجهرية (Dimples)',
            'ظاهرة التمزق الصفيحي (Lamellar Tearing) في الوصلات الزاوية السميكة واستخدام الصلب المقاوم (Z-Grade Steel)',
            'تقييم شروخ إعادة التسخين (Reheat Cracking) في سبائك الكروم موليبدينوم أثناء المعالجة الحرارية PWHT',
            'تطبيق مواصفة ISO 3834-2 لضمان الجودة الشاملة لمنشآت اللحام واعتماد ورش التصنيع'
          ],
          topicsEn: [
            'Crack Tip Opening Displacement (CTOD per BS 7448 / ASTM E1820) testing for extreme sour service offshore structures',
            'Forensic investigation of pipeline ruptures: Differentiating brittle transgranular cleavage from ductile microvoid coalescence',
            'Lamellar tearing mechanisms in heavy T-joints and prescribing Z-grade through-thickness tested plates (ASTM A770)',
            'Mitigating reheat cracking in Chromium-Molybdenum creep-resistant steels during Post Weld Heat Treatment cycles',
            'Corporate implementation of ISO 3834-2 comprehensive welding quality systems for shop and site fabrication'
          ],
          learningOutcomesAr: [
            'القيادة الهندسية للتحقيقات في الحوادث والانهيارات الميدانية وتقديم التقارير الجنائية للجهات القضائية',
            'تأهيل المصانع للحصول على شهادات الجودة الأوروبية والأمريكية الكبرى'
          ],
          learningOutcomesEn: [
            'Lead engineering failure investigations and submit authoritative forensic expert reports for legal arbitration',
            'Accredit major heavy fabrication facilities for international ASME and ISO 3834 certification stamps'
          ]
        }
      ],
      keyFormulas: [
        {
          nameAr: 'حساب فتحة قمة الشرخ في ميكانيكا الكسر (CTOD Formula)',
          nameEn: 'Crack Tip Opening Displacement (δ_CTOD)',
          formula: 'δ = [ K_I² × (1 - ν²) ] / (2 × σ_ys × E) + [ r_p × (W - a) × V_p ] / [ r_p × (W - a) + a + z ]',
          descriptionAr: 'المعادلة المعيارية (BS 7448) لحساب متانة الكسر اللدنة لوصلات اللحام الحرجة في المنصات البحرية وخطوط الأنابيب.',
          descriptionEn: 'Standard fracture mechanics equation (BS 7448) quantifying elastic-plastic crack-tip toughness.'
        }
      ],
      practicalSkillsChecklist: [
        { skillAr: 'تصميم وتأليف ملف WPS/PQR كامل بلحام مركب (GTAW Root + SMAW Fill) على أنبوب P-No 1 سمك 25 ملم مع متانة صدمات', skillEn: 'Author and qualify complete combination WPS/PQR (GTAW root + SMAW fill) on P-No 1 pipe with Charpy impact', importance: 'mandatory' },
        { skillAr: 'إجراء فحص جنائي لعينة وصلة لحام منهارة بشروخ هيدروجينية وتحديد السبب الجذري والإجراء التصحيحي', skillEn: 'Conduct forensic failure investigation on hydrogen-cracked weld identifying root cause and corrective action', importance: 'mandatory' },
        { skillAr: 'تدقيق نظام إدارة جودة اللحام لمصنع أوعية ضغط طبقاً لمتطلبات مواصفة ISO 3834-2 وتحديد بنود عدم المطابقة', skillEn: 'Audit pressure vessel fabrication facility welding quality system against ISO 3834-2 requirements', importance: 'mandatory' }
      ],
      referenceTextbooks: [
        { title: 'Welding Metallurgy and Weldability', author: 'John C. Lippold', standardOrPublisher: 'John Wiley & Sons' },
        { title: 'BS EN ISO 15614-1: Specification and qualification of welding procedures for metallic materials', author: 'BSI / ISO Standards', standardOrPublisher: 'ISO' },
        { title: 'Fracture and Fatigue of Welded Structures', author: 'K. Macdonald', standardOrPublisher: 'Woodhead Publishing' }
      ]
    }
  ]
};
