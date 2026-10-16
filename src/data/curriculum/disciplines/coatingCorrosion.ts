import { EngineeringDiscipline } from '../types';

export const coatingCorrosionDiscipline: EngineeringDiscipline = {
  id: 'coating_corrosion',
  titleAr: 'فحص الدهانات والطلاء ومكافحة التآكل الصناعي (Protective Coating & Corrosion Control)',
  titleEn: 'Protective Coating, Blasting & Corrosion Inspection (NACE / AMPP / SSPC / FROSIO)',
  category: 'coating',
  badgeColor: 'yellow',
  overviewAr: 'حماية المنشآت المعدنية والمنصات البحرية وخطوط الأنابيب من التآكل الكهروكيميائي والظروف البيئية القاسية. يشمل علم الكيمياء الكهربائية وتجهيز الأسطح ومراقبة نقطة الندى، وسماكة الطلاء الجاف (DFT) طبقاً لقاعدة 80/20، واختبارات المسامية والالتصاق، وتصميم أنظمة الطلاء العالمية ISO 12944.',
  overviewEn: 'Shielding structural steel, offshore rigs, and cross-country pipelines from aggressive electrochemical degradation. Encompasses corrosion thermodynamics, surface anchor profiles, psychrometric dew point monitoring, SSPC-PA 2 80/20 DFT auditing, and ISO 12944 coating specification engineering.',
  keyTechniques: [
    'Abrasive Blast Cleaning (Grit/Garnet/Slag - ISO 8501-1 Sa 2.5/Sa 3)',
    'Climatic Dew Point Testing (Psychrometer & 3°C Delta Rule)',
    'Surface Profile Depth Gauging (Testex Replica Tape - ASTM D4417)',
    'Soluble Salt Contamination Testing (Bresle Patch - ISO 8502-6/9)',
    'Dry Film Thickness Auditing (SSPC-PA 2 80/20 Rule)',
    'Holiday Detection (High-Voltage Spark & Wet Sponge - NACE SP0188)',
    'Coating Adhesion Testing (Cross-Hatch ASTM D3359 & Dolly Pull-Off ASTM D4541)'
  ],
  globalAccreditations: ['AMPP (NACE) CIP Level 1, 2 & 3', 'SSPC PCI', 'FROSIO Level III', 'ISO 12944 (Corrosivity Categories)', 'ISO 8501-1'],
  targetIndustries: ['Offshore Drilling & Production Rigs', 'Marine Vessels & FPSOs', 'Petrochemical & Fertilizer Plants', 'Water Desalination Plants & Tanks', 'Cross-Country Underground Pipelines'],
  levels: [
    // -------------------------------------------------------------------------
    // LEVEL 1: ACADEMIC & UNIVERSITY FOUNDATIONS (المرحلة الأكاديمية والجامعية)
    // -------------------------------------------------------------------------
    {
      levelId: 'academic',
      tierCategory: 'academic',
      nameAr: 'المرحلة الأكاديمية والجامعية (University Corrosion Electrochemistry & Polymer Science)',
      nameEn: 'Academic & University Corrosion Electrochemistry Foundations',
      academicStageAr: 'المقررات الأكاديمية لطلاب كليات الهندسة والعلوم في الكيمياء الكهربائية وكيمياء البوليمرات والطقس',
      academicStageEn: 'University Degree Coursework in Electrochemical Corrosion, Polymer Chemistry & Psychrometrics',
      targetRoleAr: 'دراسة مخططات بوربيكس (Pourbaix E-pH Diagrams)، معادلة نيرنست، كيمياء بلمرة الإيبوكسي، وفيزياء نقطة الندى',
      targetRoleEn: 'Model Pourbaix thermodynamic E-pH diagrams, Nernst half-cell kinetics, epoxy polymer crosslinking, psychrometrics',
      prerequisitesAr: 'دراسة جامعية في الكيمياء الكهربائية، علم البوليمرات، الديناميكا الحرارية، وميكانيكا التآكل',
      prerequisitesEn: 'University coursework in Electrochemistry, Polymer Science, Thermodynamics, and Corrosion Engineering',
      trainingHours: 120,
      experienceMonths: 0,
      internationalCerts: ['B.Sc. Chemical / Materials / Mechanical Engineering', 'AMPP Student Member'],
      applicableCodes: ['ISO 8044 (Corrosion Terms)', 'ASTM G1 (Corrosion Testing Basics)', 'NACE Basic Corrosion'],
      responsibilitiesAr: [
        'اشتقاق شروط التآكل التلقائي من طاقة جيبس الحرة (ΔG = -n·F·E) ومعادلة نيرنست للجهد الكهربائي',
        'رسم وتفسير مخططات بوربيكس (Pourbaix Diagrams) لتحديد مناطق المناعة (Immunity) والتآكل (Corrosion) والخمول (Passivity)',
        'دراسة كيمياء ترابط البوليمرات المتصلبة بالحرارة (Thermoset Epoxies) وتفاعلات فتح حلقة الإيبوكسيد مع الأمين',
        'فهم فيزياء الرطوبة الجوية والضغط البخاري واشتقاق معادلة ماغنوس-تيتينز لحساب نقطة الندى (Dew Point)',
        'تحليل آليات التآكل الموضعي: التآكل الجلفاني (Galvanic Couple)، التآكل الشقي (Crevice)، والتآكل التنقري (Pitting)'
      ],
      responsibilitiesEn: [
        'Derive spontaneous corrosion criteria from Gibbs free energy (ΔG = -n·F·E) and Nernst half-cell electromotive series',
        'Construct and interpret Pourbaix E-pH equilibrium diagrams identifying zones of immunity, active corrosion, and passivation',
        'Analyze chemical cross-linking kinetics of thermoset coatings: Nucleophilic ring-opening of oxirane rings via polyamines',
        'Model psychrometric water vapor pressure kinetics and derive the Magnus-Tetens formula for dew point calculation',
        'Investigate localized corrosion electrochemistry: Galvanic galvanic series coupling, crevice oxygen depletion, and pitting'
      ],
      modules: [
        {
          id: 'mod_coat_acad_1',
          titleAr: 'الوحدة الأكاديمية 1: الكيمياء الكهربائية للتآكل وديناميكا الخلايا الجلفانية',
          titleEn: 'Academic Module 1: Electrochemical Corrosion Cells & Pourbaix Thermodynamics',
          duration: '45 ساعة محاضرات ونظريات كهروكيميائية',
          topicsAr: [
            'الخلية الكهروكيميائية الكلاسيكية: المصعد (Anode)، المهبط (Cathode)، الإلكتروليت الموصل، والمسار المعدني',
            'معادلة نيرنست: حساب جهد القطب الكهربائي بناءً على تركيز الأيونات ودرجة الحرارة',
            'مخطط بوربيكس (Pourbaix Diagram): مناطق الحصانة الثرموديناميكية، مناطق تكون الصدأ، ومناطق الحماية بطبقة الأكسيد الخاملة (Passivation)',
            'استقطاب الأقطاب (Polarization): الاستقطاب التنشيطي (Activation) ومعادلة تافل (Tafel Slopes) واستقطاب التركيز (Concentration)',
            'السلسلة الجلفانية في مياه البحر: التآكل التفاضلي عند تلامس صلب الكربون مع سبائك النحاس أو الفولاذ المقاوم للصدأ'
          ],
          topicsEn: [
            'The four essential elements of corrosion: Anodic dissolution, cathodic reduction, electrolyte conduction, and metallic path',
            'Nernst equation: Calculating equilibrium half-cell electrode potentials as a function of ionic activity and temperature',
            'Pourbaix E-pH thermodynamic stability diagrams: Delineating thermodynamic immunity, active corrosion, and passive oxide films',
            'Electrochemical polarization: Activation polarization, Tafel extrapolation slopes, and mass-transfer concentration overpotential',
            'Galvanic series in natural seawater: Driving forces for accelerated bimetallic corrosion between carbon steel and noble alloys'
          ],
          learningOutcomesAr: [
            'فهم الأسباب الفيزيائية والكهروكيميائية للصدأ والتآكل عند الجذور الذرية',
            'القدرة على تصميم استراتيجيات الحماية الكهروكيميائية والطلاءات العازلة المتكاملة'
          ],
          learningOutcomesEn: [
            'Master the fundamental atomic and electrochemical driving forces of metallic degradation',
            'Design symbiotic corrosion mitigation architectures combining barrier coatings and cathodic protection'
          ]
        },
        {
          id: 'mod_coat_acad_2',
          titleAr: 'الوحدة الأكاديمية 2: كيمياء البوليمرات والفيزياء الجوية والسيكرومترية',
          titleEn: 'Academic Module 2: Protective Polymer Chemistry & Psychrometric Thermodynamics',
          duration: '45 ساعة دراسات كيميائية وتجارب',
          topicsAr: [
            'كيمياء راتنجات الإيبوكسي (Epoxy Resins): تفاعل بيسفينول أ (DGEBA) مع المصلبات الأمينية وتكون الشبكة البوليمرية ثلاثية الأبعاد',
            'كيمياء البولي يوريثين (Polyurethane): تفاعل بوليول مع الإيزوسيانات الأليفاتية المقاومة للأشعة فوق البنفسجية الشمسية (UV Resistance)',
            'برايمرات الزنك الغنية (Zinc-Rich Primers): الزنك العضوي والسيليكات غير العضوية وآلية الحماية التضحوية الجلفانية (Galvanic Sacrificial Action)',
            'الفيزياء الجوية: ضغط البخار المشبع، الرطوبة النسبية (RH%)، ونقطة الندى (Dew Point)',
            'ميكانيزم تكون الصدأ الومضي (Flash Rusting) عند تكاثف طبقة رطوبة مجهرية على الصلب المسفوع'
          ],
          topicsEn: [
            'Epoxy polymer chemistry: Diglycidyl ether of bisphenol A (DGEBA) curing mechanisms with polyamides forming dense 3D networks',
            'Polyurethane chemistry: Polyol reaction with aliphatic polyisocyanates imparting exceptional solar UV photolytic stability',
            'Zinc-rich primer metallurgy: Organic vs inorganic ethyl silicates delivering galvanic sacrificial galvanic protection to steel',
            'Atmospheric psychrometrics: Saturated vapor pressure, relative humidity (RH%), and dew point thermodynamic equilibrium',
            'Flash rust kinetics: Spontaneous oxidation upon micro-condensation of moisture droplets on active blasted steel profiles'
          ],
          learningOutcomesAr: [
            'فهم كيفية عمل جزيئات الطلاء كحاجز مانع لنفاذ الماء والأكسجين والأيونات',
            'الحساب الرياضي الدقيق لظروف التكثف ونقطة الندى لمنع فشل الالتصاق'
          ],
          learningOutcomesEn: [
            'Understand molecular permeation barrier physics blocking water, oxygen, and electrolyte migration to steel',
            'Mathematically compute moisture condensation thresholds eliminating catastrophic paint delamination'
          ]
        }
      ],
      keyFormulas: [
        {
          nameAr: 'معادلة نيرنست للجهد الكهروكيميائي لخلية التآكل',
          nameEn: 'Nernst Half-Cell Potential Equation',
          formula: 'E = E° - (R × T) / (n × F) × ln(Q)',
          descriptionAr: 'تحسب جهد القطب الكهربائي الفعلي (E) بناءً على الجهد القياسي (E°)، درجة الحرارة بالكلفن (T)، وثابت فاراداي (F)، ونشاط الأيونات (Q).',
          descriptionEn: 'Calculates actual half-cell potential as a function of standard reduction potential (E°) and reaction quotient (Q).'
        },
        {
          nameAr: 'معادلة ماغنوس لحساب نقطة الندى من الحرارة والرطوبة (Magnus Formula)',
          nameEn: 'Magnus-Tetens Dew Point Equation',
          formula: 'T_dewpoint = (b × α) / (a - α) where α = (a × T) / (b + T) + ln(RH / 100)',
          descriptionAr: 'حيث a = 17.27 و b = 237.7°C، T درجة حرارة الهواء، RH نسبة الرطوبة النسبية. تحسب درجة الحرارة التي يتكثف عندها بخار الماء إلى ندى.',
          descriptionEn: 'Computes psychrometric dew point from ambient dry bulb temperature (T) and relative humidity (RH%).'
        }
      ],
      practicalSkillsChecklist: [
        { skillAr: 'إجراء تجربة خلية جلفانية معملياً وقياس فرق الجهد بين صلب كربوني وسبيكة زنك وملاحظة حماية الصلب تضحوياً', skillEn: 'Execute galvanic cell experiment measuring potential difference between steel and zinc verifying sacrificial protection', importance: 'mandatory' },
        { skillAr: 'استخدام مقياس الرطوبة الدوار (Sling Psychrometer) وجداول الضغط الجوي لحساب نقطة الندى وتأكيد شرط الـ +3°م', skillEn: 'Operate whirling sling psychrometer and psychrometric tables computing dew point and verifying +3°C safety delta', importance: 'mandatory' },
        { skillAr: 'قياس زمن الجفاف الأولي وزمن التصلب الكامل (Cure Time) لطلاء إيبوكسي سميك عبر اختبار المذيب MEK Rub Test', skillEn: 'Measure crosslinking cure state of heavy-duty industrial epoxy using solvent rub test per ASTM D5402', importance: 'mandatory' }
      ],
      referenceTextbooks: [
        { title: 'Corrosion Engineering: Principles and Solved Problems', author: 'Pierre R. Roberge', standardOrPublisher: 'McGraw-Hill' },
        { title: 'Corrosion and Corrosion Control', author: 'R. Winston Revie & Herbert H. Uhlig', standardOrPublisher: 'John Wiley & Sons' },
        { title: 'Protective Coatings: Fundamentals of Chemistry and Materials', author: 'Clive H. Hare', standardOrPublisher: 'SSPC Press' }
      ]
    },

    // -------------------------------------------------------------------------
    // LEVEL 2: CERTIFIED COATING INSPECTOR (المستوى الثاني المهني المعتمد)
    // -------------------------------------------------------------------------
    {
      levelId: 'level2',
      tierCategory: 'level2',
      nameAr: 'مفتش دهانات وطلاء صناعي معتمد دولياً (AMPP NACE CIP Level 2 / FROSIO)',
      nameEn: 'Level II (Certified Coating Inspector - AMPP NACE CIP Level 2 / FROSIO)',
      academicStageAr: 'الشهادة المهنية الأوسع انتشاراً عالمياً للتفتيش على أعمال تجهيز السطح والطلاء في الميدان',
      academicStageEn: 'Premier Global Professional Credential in Industrial Blasting, Coating Inspection & Quality Audits',
      targetRoleAr: 'فحص نظافة السطح Sa 2.5، مراقبة نقطة الندى، فحص سماكة DFT بقاعدة 80/20، واختبار المسامية والالتصاق',
      targetRoleEn: 'Inspect blast cleanliness (Sa 2.5), enforce 3°C dew-point delta, audit DFT per SSPC-PA 2, test adhesion & holidays',
      prerequisitesAr: 'شهادة المستوى الأول مع خبرة موثقة سنتان واجتياز امتحانات AMPP (NACE) أو FROSIO العملية الشاملة',
      prerequisitesEn: 'Level 1 certified with 2+ yrs documented coating inspection experience, passing AMPP/FROSIO practical examinations',
      trainingHours: 80,
      experienceMonths: 24,
      internationalCerts: ['AMPP (NACE) CIP Level 2 Certified Inspector', 'FROSIO Level III Inspector', 'SSPC Protective Coating Inspector (PCI)'],
      applicableCodes: ['SSPC-SP 10 / ISO 8501-1 Sa 2.5', 'SSPC-PA 2 (DFT Measurement)', 'ASTM D4417', 'ASTM D3359', 'NACE SP0188'],
      responsibilitiesAr: [
        'قياس ومراقبة العوامل الجوية: درجة حرارة الجو، الرطوبة النسبية RH%، درجة حرارة الصلب، وتطبيق شرط (T_steel ≥ T_dewpoint + 3°C)',
        'فحص درجة نظافة السطح بعد السفع بمقارنتها بكتالوجات الصور القياسية ISO 8501-1 (Sa 2.5 Near-White Metal)',
        'قياس خشونة السطح المجهرية (Surface Profile Depth) باستخدام شريط تيستكس (Testex Replica Tape - 50 إلى 75 µm)',
        'فحص تلوث السطح بالأملاح القابلة للذوبان بطريقة بريسل (Bresle Patch Method - ISO 8502-6/9) للتأكد من عدم تجاوز 20 mg/m²',
        'قياس سماكة الطلاء الجاف (DFT) وتطبيق قاعدة 80/20 وفقاً لمواصفة SSPC-PA 2، واختبار المسامية بالشرارة الكهربائية'
      ],
      responsibilitiesEn: [
        'Measure psychrometric weather parameters: Enforcing the strict safety delta rule (T_steel ≥ T_dewpoint + 3°C)',
        'Audit abrasive blast cleanliness visually matching standard ISO 8501-1 photographic rust grades (Sa 2.5 Near-White Metal)',
        'Measure surface anchor profile depth deploying Testex replica tape and spring micrometers (50 to 75 µm per spec)',
        'Test soluble salt surface contamination using Bresle patch conductivity extraction (ISO 8502-6/9 limit < 20 mg/m²)',
        'Audit Dry Film Thickness (DFT) enforcing the SSPC-PA 2 80/20 rule, and inspect micro-porosity using high-voltage spark detectors'
      ],
      modules: [
        {
          id: 'mod_coat_2_1',
          titleAr: 'الوحدة 1: فحص تجهيز السطح بالسفع والظروف المناخية والأملاح الذائبة',
          titleEn: 'Module 1: Surface Cleanliness (ISO 8501-1), Testex Profile & Bresle Salts',
          duration: '40 ساعة تدريب عملي وأجهزة موقعية',
          topicsAr: [
            'درجات السفع بالرمال والجرانيت: Sa 1 (Light), Sa 2 (Commercial), Sa 2.5 (Near-White), Sa 3 (White Metal)',
            'أنواع وسائط السفع (Abrasive Media): رمل السيليكا، العقيق (Garnet)، خبث النحاس (Copper Slag)، والكرات الفولاذية (Steel Shot/Grit)',
            'استخدام شريط تيستكس (Testex Press-O-Film Tape: Coarse & X-Coarse) والميكروميتر الزنبركي لقياس عمق الخشونة',
            'فحص تلوث السطح بالأملاح الذائبة بطريقة رقعة بريسل (Bresle Patch): حقن الماء المقطر وقياس التوصيل الكهربائي (Conductivity)',
            'التحقق من خلو هواء السفع من الزيوت والرطوبة باستخدام اختبار النشافة البيضاء (Blotter Test per ASTM D4285)'
          ],
          topicsEn: [
            'Abrasive blast cleanliness grades: Sa 1 (brush-off), Sa 2 (commercial), Sa 2.5 (near-white metal), and Sa 3 (white metal)',
            'Abrasive blast media selection: Crushed garnet, copper/coal slag, chilled iron grit, and steel shot profiles',
            'Surface profile measurement: Testex replica tape (Coarse & X-Coarse) and spring anvil dial micrometer procedures',
            'Soluble salt extraction per ISO 8502-6/9: Bresle patch latex chamber, deionized water injection, and micro-Siemens conductivity meters',
            'Compressed air cleanliness verification: Blotter paper test (ASTM D4285) proving zero oil and moisture contamination'
          ],
          learningOutcomesAr: [
            'ضمان إعداد السطح المعدني بأعلى المعايير العالمية لمنع أي فشل أو تقشر مستقبلي للطلاء',
            'كشف وتوثيق التلوث بالأملاح الخفية التي تسبب التقرح التناضحي (Osmotic Blistering)'
          ],
          learningOutcomesEn: [
            'Guarantee pristine surface preparation eliminating the primary cause of premature industrial coating failures',
            'Detect and quantify microscopic soluble salt chlorides that drive catastrophic osmotic blistering'
          ]
        },
        {
          id: 'mod_coat_2_2',
          titleAr: 'الوحدة 2: قياس سماكة الطلاء (SSPC-PA 2) واختبارات الثقوب (Holiday) والالتصاق',
          titleEn: 'Module 2: SSPC-PA 2 DFT Auditing, Holiday Detection & Adhesion Testing',
          duration: '40 ساعة فحوصات وتطبيقات كود',
          topicsAr: [
            'قياس سماكة الطلاء الرطب (Wet Film Thickness - WFT) باستخدام المشط المسنن قبل تبخر المذيبات',
            'تطبيق مواصفة SSPC-PA 2 لقياس سماكة الطلاء الجاف (DFT): أخذ 5 قراءات نقطية لكل مساحة 10 متر مربع وتطبيق قاعدة 80/20',
            'قاعدة 80/20 لمواصفة SSPC-PA 2: لا تقل أي قراءة نقطية عن 80% من السماكة المحددة ولا تزيد عن 120%',
            'كشف الثقوب المجهرية (Holiday Detection): الإسفنجة الرطبة منخفضة الجهد (67.5V) والشرارة عالية الجهد (High Voltage Spark per NACE SP0188)',
            'اختبارات الالتصاق: اختبار الخدش الشبكي (Cross-Hatch per ASTM D3359) واختبار الشد الهيدروليكي المباشر (Dolly Pull-Off per ASTM D4541)'
          ],
          topicsEn: [
            'Wet Film Thickness (WFT) comb gauging: Monitoring wet film thickness during spraying to guarantee target dry thickness',
            'SSPC-PA 2 Dry Film Thickness (DFT) compliance protocol: Taking 5 spot measurements per 100 sq ft (10 m²) area',
            'The SSPC-PA 2 80/20 rule: No individual spot reading may fall below 80% nor exceed 120% of designated specification',
            'Pinhole holiday detection: Low-voltage wet sponge (67.5V) for thin films vs high-voltage spark testing (NACE SP0188) for heavy linings',
            'Adhesion strength evaluation: Cross-hatch tape test (ASTM D3359 Method B) and hydraulic dolly pull-off adhesion (ASTM D4541)'
          ],
          learningOutcomesAr: [
            'التأكد من التغطية المتجانسة لطبقات الطلاء دون نقص يعرض المعدن للصدأ أو زيادة تسبب التشقق',
            'إصدار سجلات فحص جودة معتمدة تضمن عمراً تشغيلياً يتجاوز 15 سنة للمنشآت البحرية'
          ],
          learningOutcomesEn: [
            'Ensure optimal uniform film build without under-thickness rusting or excessive over-thickness mud-cracking',
            'Issue certified QA/QC inspection dossiers guaranteeing coating service lifespans exceeding 15 years'
          ]
        }
      ],
      keyFormulas: [
        {
          nameAr: 'العلاقة بين سماكة الطلاء الرطب (WFT) وسماكة الطلاء الجاف (DFT)',
          nameEn: 'Wet vs Dry Film Thickness Formula',
          formula: 'DFT = WFT × (% Volume Solids / 100) × (1 - % Thinner Added)',
          descriptionAr: 'يستخدمها الفني أثناء الرش للتأكد من أن سماكة الطلاء الرطب ستعطي السماكة الجافة المطلوبة بعد تبخر المذيب.',
          descriptionEn: 'Calculates expected Dry Film Thickness (DFT) from measured Wet Film Thickness (WFT) factoring solids volume and thinner.'
        },
        {
          nameAr: 'قاعدة فحص نقطة الندى الإلزامية قبل الرش والسفع',
          nameEn: 'Climatic 3°C Safety Delta Rule',
          formula: 'T_steel ≥ T_dewpoint + 3°C (5°F)',
          descriptionAr: 'شرط صارم عالمياً: يمنع منعاً باتاً بدء أعمال السفع بالرمال أو رش الطلاء إذا كان الفارق بين حرارة الصلب ونقطة الندى أقل من 3 درجات مئوية.',
          descriptionEn: 'Mandatory international rule: Blasting and paint application are strictly prohibited if steel temp is within 3°C of dew point.'
        }
      ],
      practicalSkillsChecklist: [
        { skillAr: 'استخدام جهاز قياس رطوبة رقمي لتحديد نقطة الندى وفحص شرط الـ +3°م على هيكل خزان بترولي', skillEn: 'Measure climatic dew point with digital gauge and verify +3°C safety delta on storage tank shell', importance: 'mandatory' },
        { skillAr: 'ضغط شريط تيستكس X-Coarse على سطح صلب مسفوع وقياس عمق الخشونة بالميكروميتر وتوثيق قيمة 65 µm', skillEn: 'Burnish Testex X-Coarse replica tape on blasted steel and measure anchor profile with spring micrometer (65 µm)', importance: 'mandatory' },
        { skillAr: 'إجراء معايرة نقطية لجهاز DFT الرقمي على شريحة معايرة وتطبيق قاعدة 80/20 على 5 مساحات فحص', skillEn: 'Calibrate digital DFT gauge on smooth shim and apply SSPC-PA 2 80/20 rule across 5 spot inspection areas', importance: 'mandatory' }
      ],
      referenceTextbooks: [
        { title: 'AMPP (NACE) Coating Inspector Program (CIP) Level 2 Manual', author: 'AMPP Standards & Education', standardOrPublisher: 'AMPP Press' },
        { title: 'SSPC-PA 2: Procedure for Determining Conformance to Dry Coating Thickness Requirements', author: 'SSPC / AMPP', standardOrPublisher: 'SSPC Standards' },
        { title: 'ISO 8501-1: Preparation of steel substrates before application of paints and related products', author: 'ISO Standards', standardOrPublisher: 'ISO' }
      ]
    },

    // -------------------------------------------------------------------------
    // LEVEL 3: PROTECTIVE COATING SPECIALIST & CORROSION PRINCIPAL (المستوى الثالث)
    // -------------------------------------------------------------------------
    {
      levelId: 'level3',
      tierCategory: 'level3',
      nameAr: 'كبير استشاريي هندسة الطلاء ومكافحة التآكل (NACE CIP Level 3 / Senior Corrosion Specialist)',
      nameEn: 'Level III (Protective Coating Principal Specialist & Corrosion Director)',
      academicStageAr: 'القمة الاستشارية في تصميم مواصفات أنظمة الطلاء العالمية ISO 12944 والتحكيم الجنائي في الانهيارات',
      academicStageEn: 'Supreme Consulting Authority in ISO 12944 Coating Specification Engineering & Forensic Failure Analysis',
      targetRoleAr: 'تصميم أنظمة الطلاء للمنصات البحرية، دراسات الحماية الكاثودية المتكاملة، والتحقيق الجنائي في تقشر الطلاء',
      targetRoleEn: 'Engineer ISO 12944 coating systems (C5/CX), manage cathodic disbondment synergy, lead forensic failure arbitrations',
      prerequisitesAr: 'شهادة NACE CIP Level 2 مع خبرة مثبتة لا تقل عن 5 سنوات واجتياز لجنة الممتحنين الاستشارية الفموية لـ AMPP (Peer Review)',
      prerequisitesEn: 'Certified NACE CIP Level 2 with 5+ yrs documented leadership, passing the prestigious AMPP Peer Review board examination',
      trainingHours: 120,
      experienceMonths: 60,
      internationalCerts: ['AMPP (NACE) CIP Level 3 Peer Review Certified', 'FROSIO Level III Certified', 'AMPP Senior Corrosion Specialist'],
      applicableCodes: ['ISO 12944 (Parts 1 to 9)', 'NORSOK M-501 (Surface Preparation & Coating)', 'NACE SP0108', 'ASTM G8 (Cathodic Disbondment)'],
      responsibilitiesAr: [
        'تصميم مواصفات أنظمة الطلاء المعقدة طبقاً لكود ISO 12944 للتصنيفات البيئية الشديدة (C5 High Marine & CX Extreme Offshore)',
        'دراسة التكامل والتوافق بين أنظمة الطلاء العازلة ومنظومات الحماية الكاثودية (Cathodic Protection Synergy)',
        'إجراء اختبارات التفكك الكاثودي (Cathodic Disbondment Testing per ASTM G8) لمنع تقشر الطلاء حول نقاط الحماية',
        'التحقيق الجنائي في انهيارات الطلاء الكبرى: التقرح التناضحي (Osmotic Blisters)، التفكك بين الطبقات (Delamination)، ونزيف الأمين (Amine Blushing)',
        'صياغة العقود الفنية والتحكيم بين الملاك والمقاولين في نزاعات ضمانات الطلاء التي تتجاوز ملايين الدولارات'
      ],
      responsibilitiesEn: [
        'Engineer bespoke multi-coat specification packages per ISO 12944 for severe marine environments (C5 Very High & CX Extreme Offshore)',
        'Govern synergistic compatibility between barrier protective coatings and impressed-current/sacrificial cathodic protection',
        'Conduct accelerated cathodic disbondment laboratory testing (ASTM G8) preventing alkaline disbondment rings at coating holidays',
        'Lead forensic failure investigations of catastrophic coating breakdowns: Osmotic blistering, inter-coat delamination, and amine blushing',
        'Author definitive contractual technical specifications and serve as expert arbitrator in multimillion-dollar coating warranty litigations'
      ],
      modules: [
        {
          id: 'mod_coat_3_1',
          titleAr: 'الوحدة 1: هندسة أنظمة الطلاء العالمية ISO 12944 و NORSOK M-501 للمنصات البحرية',
          titleEn: 'Module 1: ISO 12944 (C1-CX) Engineering & NORSOK M-501 Offshore Specifications',
          duration: '60 ساعة تصميم مواصفات وعقود',
          topicsAr: [
            'تصنيفات البيئة التآكلية لكود ISO 12944-2: من C1 (داخلية منخفضة) إلى C5 (بحرية صناعية عالية) و CX (منصات بحرية متطرفة)',
            'فئات المتانة المتوقعة (Durability Categories): منخفضة L (< 7 سنوات)، متوسطة M (7-15 سنة)، عالية H (15-25 سنة)، وفائقة VH (> 25 سنة)',
            'أنظمة الطلاء متعددة الطبقات (Multi-Coat Systems): برايمر زنك سيليكات + طبقة وسيطة إيبوكسي سميكة MIO + طبقة نهائية بولي يوريثين',
            'مواصفة NORSOK M-501 System 1 للمنصات البحرية: اختبارات التأهيل المتسارعة بالتعريض لرذاذ الملح الدوري والأشعة فوق البنفسجية UV',
            'حساب التكلفة الإجمالية لدورة حياة الطلاء (Life Cycle Cost Analysis - LCCA) وتحديد مواعيد الصيانة الوقائية'
          ],
          topicsEn: [
            'ISO 12944-2 atmospheric corrosivity categories: From C1 (heated buildings) to C5 (high salinity marine) and CX (extreme offshore splash)',
            'Coating durability expectations: Low L (< 7 yrs), Medium M (7-15 yrs), High H (15-25 yrs), and Very High VH (> 25 yrs)',
            'Multi-coat system architecture: Inorganic zinc silicate primer + high-build micaceous iron oxide (MIO) epoxy + aliphatic polyurethane topcoat',
            'NORSOK M-501 System 1 offshore qualification: Cyclic accelerated weathering testing combining salt spray, freezing, and UV condensation',
            'Coating Life Cycle Cost Analysis (LCCA): Evaluating initial capital cost versus long-term maintenance repaint frequencies'
          ],
          learningOutcomesAr: [
            'تصميم أنظمة طلاء تضمن حماية المنصات البحرية والجسور العملاقة لأكثر من 25 سنة متواصلة دون صيانة',
            'صياغة الكراسات الفنية للمناقصات والمشاريع الكبرى بثقة تامة دون أي ثغرات هندسية'
          ],
          learningOutcomesEn: [
            'Engineer robust coating systems guaranteeing 25+ years of maintenance-free service on extreme offshore structures',
            'Draft bulletproof tender specifications for major infrastructure and offshore mega-projects'
          ]
        },
        {
          id: 'mod_coat_3_2',
          titleAr: 'الوحدة 2: التحقيق الجنائي في انهيارات الطلاء والتفكك الكاثودي (Forensic Analysis)',
          titleEn: 'Module 2: Forensic Coating Failure Investigations & Cathodic Disbondment (ASTM G8)',
          duration: '60 ساعة تحقيقات مختبرية وتحكيم',
          topicsAr: [
            'التحقيق الجنائي في ظاهرة التقرح التناضحي (Osmotic Blistering): جمع عينات السوائل داخل الفقاعات وقياس تركيز الكلوريدات والأملاح',
            'ظاهرة نزيف الأمين (Amine Blushing / Carbamation): تفاعل مصلب الإيبوكسي مع رطوبة الجو و CO₂ وتكون طبقة شمعية تفقد الالتصاق',
            'التفكك الكاثودي (Cathodic Disbondment per ASTM G8): تكون أيونات الهيدروكسيل القلوية (OH⁻) حول عيوب الطلاء وفك الروابط البوليمرية',
            'الفحص بالمجهر الإلكتروني الماسح (SEM-EDX) ومطيافية الأشعة تحت الحمراء (FTIR) للتعرف على الملوثات بين طبقات الطلاء',
            'التحكيم الهندسي وتقديم شهادة الخبير المحلف في نزاعات انهيار دهانات السفن والمنصات البترولية'
          ],
          topicsEn: [
            'Forensic investigation of osmotic blistering: Fluid sampling from blister cavities and micro-chemical extraction of chloride salts',
            'Amine blushing (carbamation) mechanisms: Unreacted polyamine reacting with atmospheric moisture and CO₂ creating greasy unbondable films',
            'Cathodic disbondment kinetics (ASTM G8): High alkaline pH (OH⁻) generation at holiday sites dissolving interfacial adhesion bonds',
            'Analytical laboratory forensics: Scanning Electron Microscopy (SEM-EDX) and Fourier Transform Infrared Spectroscopy (FTIR) analysis',
            'Serving as expert witness and technical arbitrator in multimillion-dollar maritime and pipeline coating breakdown litigations'
          ],
          learningOutcomesAr: [
            'القدرة على كشف أدق الأسباب الخفية وراء تقشر أو فشل أي نظام طلاء بالمختبرات المتقدمة',
            'حسم النزاعات القضائية والهندسية بين شركات الطلاء والمقاولين والملاك بالدليل العلمي القاطع'
          ],
          learningOutcomesEn: [
            'Uncover the definitive root causes of complex coating delaminations and premature degradations via analytical forensics',
            'Definitively resolve legal and engineering disputes between coating manufacturers, fabricators, and oil majors'
          ]
        }
      ],
      keyFormulas: [
        {
          nameAr: 'حساب مقاومة التفكك الكاثودي المعجل (Cathodic Disbondment Radius)',
          nameEn: 'Cathodic Disbondment Disbonded Radius (ASTM G8)',
          formula: 'Disbonded Radius (mm) = (Average Diameter of Disbonded Area - Initial Hole Diameter) / 2',
          descriptionAr: 'المعيار الحاكم لكفاءة طلاء خطوط الأنابيب المدفونة (FBE / 3LPE): يشترط كود أرامكو ومواصفات ISO ألا يتجاوز نصف قطر التفكك 5 ملم بعد 28 يوماً عند 65°م.',
          descriptionEn: 'The critical benchmark for buried pipeline coatings (FBE/3LPE); specifications mandate radial disbondment < 5 mm after 28 days at 65°C.'
        }
      ],
      practicalSkillsChecklist: [
        { skillAr: 'تصميم نظام طلاء متكامل طبقاً لـ ISO 12944-5 لمنصة بحرية فئة CX بمتانة فائقة تتجاوز 25 سنة متضمنة 3 طبقات', skillEn: 'Design complete 3-coat system specification per ISO 12944-5 for CX extreme offshore rig with > 25 yr durability', importance: 'mandatory' },
        { skillAr: 'إجراء فحص جنائي لمشكلة تقشر بين طبقات طلاء إيبوكسي باستخدام FTIR وكشف ظاهرة نزيف الأمين Amine Blushing', skillEn: 'Execute forensic failure investigation on inter-coat delamination deploying FTIR spectroscopy detecting amine carbamation', importance: 'mandatory' },
        { skillAr: 'إجراء اختبار التفكك الكاثودي ASTM G8 على عينة أنبوب مطلية بـ FBE عند جهد -1.5V لمدة 28 يوماً وحساب نصف القطر', skillEn: 'Conduct ASTM G8 cathodic disbondment test on FBE coated pipe at -1.5V for 28 days and measure disbonded radius', importance: 'mandatory' }
      ],
      referenceTextbooks: [
        { title: 'ISO 12944: Paints and varnishes — Corrosion protection of steel structures by protective paint systems (Parts 1-9)', author: 'ISO Standards', standardOrPublisher: 'ISO Standards' },
        { title: 'NORSOK Standard M-501: Surface preparation and protective coating', author: 'Standards Norway', standardOrPublisher: 'NORSOK' },
        { title: 'Failure Analysis of Engineering Materials', author: 'Charles R. Brooks & Ashok Choudhury', standardOrPublisher: 'McGraw-Hill' }
      ]
    }
  ]
};
