import { EngineeringDiscipline } from '../types';

export const pwhtMetallurgyDiscipline: EngineeringDiscipline = {
  id: 'pwht_metallurgy',
  titleAr: 'علوم المعالجة الحرارية بعد اللحام وميتالورجيا الإجهادات (PWHT & Thermal Engineering)',
  titleEn: 'Post Weld Heat Treatment (PWHT) & Metallurgical Engineering',
  category: 'heat_treatment',
  badgeColor: 'rose',
  overviewAr: 'علم تخفيف الإجهادات المتبقية الناتجة عن انكماش معدن اللحام، وتطبيع وتليين المارتينسيت الهش، واستعادة المتانة الصدمية لمنع الانهيار الهش (Brittle Fracture) والتصدع الإجهادي في البيئات الحامضية NACE. يمتد من حركيات الزحف الحراري الأكاديمية وحتى الاستشارات الحرارية الميدانية العليا.',
  overviewEn: 'The thermal science of macroscopic residual stress relief, tempering brittle martensite, and restoring fracture toughness to prevent brittle rupture and Sulfide Stress Cracking (SSC). Spans academic creep dislocation relaxation to Level III consulting design.',
  keyTechniques: [
    'Electrical Resistance Heating (Flexible Ceramic Pad - FCP Mats)',
    'Medium & High Frequency Induction Heating (Pipeline Girth Welds)',
    'Internal High-Velocity Gas Fired Firing (Spheres & Giant Vessels)',
    'Temporary Modular Thermal Enclosures & Furnaces',
    'Preheat, Interpass & Dehydrogenation Heat Treatment (DHT / Bakeout)'
  ],
  globalAccreditations: ['ASME B31.3 Table 331.1.1', 'ASME Section VIII Div 1 UCS-56', 'BS 2633', 'API 510/570', 'NACE MR0175 / ISO 15156'],
  targetIndustries: ['High Pressure Steam Boilers', 'Sour Crude & Gas Processing Refineries', 'Heavy Cr-Mo Reactors', 'Reformer Furnaces', 'Hydrocracker Reactor Units'],
  levels: [
    // -------------------------------------------------------------------------
    // LEVEL 1: ACADEMIC & UNIVERSITY FOUNDATIONS (المرحلة الأكاديمية والجامعية)
    // -------------------------------------------------------------------------
    {
      levelId: 'academic',
      tierCategory: 'academic',
      nameAr: 'المرحلة الأكاديمية والجامعية (University Thermal Kinetics & Creep Relaxation)',
      nameEn: 'Academic & University Thermal Kinetics & Creep Foundations',
      academicStageAr: 'المقررات الأكاديمية لطلاب كليات الهندسة في الديناميكا الحرارية وانتقال الحرارة والميتالورجيا الفيزيائية',
      academicStageEn: 'University Degree Coursework in Heat Transfer, Thermal Stress Mechanics & High-Temp Metallurgy',
      targetRoleAr: 'دراسة حركيات استرخاء الإجهادات بالزحف، تحلل المارتينسيت، معادلات انتقال الحرارة بفورييه، ومحدد لارسون-ميلر',
      targetRoleEn: 'Model microscopic thermal creep relaxation, martensite tempering kinetics, Fourier conduction, and Larson-Miller parameters',
      prerequisitesAr: 'دراسة جامعية في انتقال الحرارة، الديناميكا الحرارية، الميتالورجيا الفيزيائية، وميكانيكا المواد المتقدمة',
      prerequisitesEn: 'University coursework in Heat Transfer, Thermodynamics, Physical Metallurgy, and Advanced Mechanics of Materials',
      trainingHours: 120,
      experienceMonths: 0,
      internationalCerts: ['B.Sc. Mechanical / Metallurgy / Materials', 'ASM International Student Member'],
      applicableCodes: ['ASTM E220 (Thermocouple Calibration)', 'ISO 17663 (Heat Treatment Guidelines)', 'WRC Bulletin 452'],
      responsibilitiesAr: [
        'فهم المنشأ الفيزيائي للإجهادات المتبقية الناتجة عن التمدد والانكماش الحراري التفاضلي وتحولات الأطوار',
        'اشتقاق ميكانيزم تخفيف الإجهاد عبر تسلق الانخلاعات الذرية (Dislocation Climb) وظاهرة الزحف المجهري',
        'تطبيق معادلة التوصيل الحراري لفورييه وتحليل التدرج الحراري عبر جدران الأنابيب الأسطوانية السميكة',
        'دراسة حركيات تليين المارتينسيت وترسيب الكربيدات الدقيقة واستعادة متانة الصدمات في المنطقة المتأثرة بالحرارة',
        'استخدام محدد لارسون-ميلر (Larson-Miller Parameter - LMP) لمكافأة زمن النقع مقابل درجة الحرارة'
      ],
      responsibilitiesEn: [
        'Analyze the micromechanical origin of tensile residual stresses from differential thermal shrinkage and phase volume expansion',
        'Derive microscopic stress relaxation kinetics through high-temperature dislocation climb and localized thermal creep',
        'Solve Fourier heat conduction differential equations modeling through-thickness temperature gradients in heavy cylinders',
        'Model the tempering kinetics of tetragonal martensite into ferrite-carbide aggregates restoring Charpy impact toughness',
        'Apply the Larson-Miller Parameter (LMP) to evaluate time-temperature equivalence in thermal stress relief cycles'
      ],
      modules: [
        {
          id: 'mod_p_acad_1',
          titleAr: 'الوحدة الأكاديمية 1: فيزياء وميكانيكا نشوء الإجهادات المتبقية وانتقال الحرارة',
          titleEn: 'Academic Module 1: Residual Stress Genesis & Fourier Heat Conduction Physics',
          duration: '45 ساعة محاضرات ونمذجة حرارية',
          topicsAr: [
            'المنشأ الفيزيائي للإجهادات المتبقية: الانكماش الحراري المقيد، التدرج الحراري الحاد، وتغير الحجم البلوري للأطوار',
            'قياس الإجهادات المتبقية: طريقة التخريم الميكانيكي (Hole Drilling) وحيود الأشعة السينية (X-ray Diffraction - XRD)',
            'معادلة فورييه للتوصيل الحراري في الإحداثيات الأسطوانية وتحديد عدد بيوت (Biot Number) للتسخين المتجانس',
            'التدرج الحراري عبر السماكة والتدرج المحوري: مسببات التشوه اللدن والانبعاج الموضعي (Thermal Buckling)',
            'حساب الطاقة الكهربائية والحرارية المطلوبة لوحدات التسخين (Power kW = m · Cp · ΔT / t + Convection/Radiation Losses)'
          ],
          topicsEn: [
            'Physical origin of residual stresses: Plastic mismatch, thermal restraint contraction, and transformation volume expansion',
            'Residual stress measurement physics: Centre-hole drilling strain gauge method and X-ray diffraction lattice strain (XRD)',
            'Fourier heat conduction equation in cylindrical coordinates and Biot number criteria for thermal uniformity',
            'Axial and through-thickness thermal gradients: Driving forces for plastic warping and localized thermal buckling',
            'Thermodynamic energy balance: Calculating required electrical heater power factoring convection and radiation losses'
          ],
          learningOutcomesAr: [
            'القدرة على النمذجة الرياضية لتوزيع درجات الحرارة داخل أي أنبوب سميك',
            'فهم الأسباب الأساسية لتشوهات الأنابيب أثناء التسخين وكيفية تفاديها'
          ],
          learningOutcomesEn: [
            'Mathematically model through-thickness temperature distribution in heavy-wall pressure vessels',
            'Master the physical origins of thermal distortion and prevent localized yield buckling'
          ]
        },
        {
          id: 'mod_p_acad_2',
          titleAr: 'الوحدة الأكاديمية 2: ميتالورجيا الزحف وتليين المارتينسيت ومحدد لارسون-ميلر',
          titleEn: 'Academic Module 2: Creep Relaxation Metallurgy, Martensite Tempering & Larson-Miller',
          duration: '45 ساعة دراسات ميتالورجية متقدمة',
          topicsAr: [
            'ميكانيزم الزحف الحراري: هجرة الفجوات الذرية (Vacancy Diffusion)، تسلق الانخلاعات، وتحول الإجهاد المرن إلى انفعال لدن',
            'أطوار تليين المارتينسيت: تفكك المارتينسيت فائق التشبع، ترسيب كربيدات إبسيلون، ثم كربيدات السمنتيت والكربيدات السبائكية',
            'استعادة المتانة الصدمية (Charpy V-Notch Energy) وانخفاض القساوة في المنطقة المتأثرة بالحرارة (HAZ Softening)',
            'محدد لارسون-ميلر (LMP = T · [C + log t]): حساب التكافؤ بين زيادة درجة الحرارة وتقليل زمن النقع',
            'ظاهرة التقصف عند إعادة التسخين (Reheat Embrittlement) في سبائك الكروم-موليبدينوم وتجنب شروخ الاسترخاء'
          ],
          topicsEn: [
            'Thermal creep kinetics: Vacancy diffusion, dislocation climb mechanisms, and relaxation of macroscopic elastic strain',
            'Stages of martensite tempering: Carbon atom redistribution, transition carbide precipitation, and alloy carbide coarsening',
            'Restoration of Charpy V-notch fracture toughness and hardness attenuation across the coarse-grained HAZ',
            'Larson-Miller Parameter (LMP = T · [20 + log t]): Establishing empirical equivalence between soaking time and temperature',
            'Reheat embrittlement mechanisms in Cr-Mo and V-modified creep-resistant steels during thermal cycling'
          ],
          learningOutcomesAr: [
            'القدرة على تصميم دورات المعالجة الحرارية بناءً على حركيات الذرات والميكروستركشر',
            'تجنب الانهيار الهش والتشقق في مفاصل محطات الطاقة ومصافي النفط'
          ],
          learningOutcomesEn: [
            'Design heat treatment cycles based on solid-state kinetics and microstructural evolution',
            'Eliminate brittle rupture and reheat cracking risks in critical power and petrochemical piping'
          ]
        }
      ],
      keyFormulas: [
        {
          nameAr: 'محدد لارسون-ميلر للتكافؤ الزمني والحراري (Larson-Miller Parameter)',
          nameEn: 'Larson-Miller Parameter Formula (LMP)',
          formula: 'LMP = T × (C + log₁₀ t) = T_Kelvin × (20 + log₁₀ t_hours)',
          descriptionAr: 'يحدد التكافؤ بين درجة حرارة النقع بالكلفن (T) وزمن النقع بالساعات (t). يسمح للمهندس بحساب ما إذا كان رفع الحرارة 20°م يكافئ مضاعفة زمن النقع.',
          descriptionEn: 'Quantifies time-temperature equivalence in tempering and creep; allows trading higher soaking temperature for shorter hold duration.'
        },
        {
          nameAr: 'معادلة التوصيل الحراري لفورييه في الجدار الأسطواني',
          nameEn: 'Radial Fourier Heat Conduction in Cylinders',
          formula: 'q = -k × (2 × π × L) × (T_outer - T_inner) / ln(r_outer / r_inner)',
          descriptionAr: 'تحسب معدل تدفق الحرارة (q) والتدرج الحراري عبر سماكة الأنابيب الأسطوانية لضمان عدم تجاوز الفارق الحراري المسموح بالكود.',
          descriptionEn: 'Computes radial heat transfer and through-thickness temperature gradient across cylindrical pipe walls.'
        }
      ],
      practicalSkillsChecklist: [
        { skillAr: 'تطبيق تجربة معملية لقياس القساوة الدقيقة (Vickers Microhardness) قبل وبعد المعالجة الحرارية وإثبات هبوط القساوة', skillEn: 'Execute microhardness profiling across weld cross-section before and after PWHT proving martensite tempering', importance: 'mandatory' },
        { skillAr: 'معايرة ثيرموكبل مزدوج Type K في فرن معايرة قياسي ومقارنة درجات الحرارة مع جدول الميلي فولت لـ ASTM E230', skillEn: 'Calibrate Type K thermocouple in dry-block bath cross-referencing EMF mV output per ASTM E230', importance: 'mandatory' },
        { skillAr: 'حساب القدرة الكهربائية بالكيلوواط وتوزيع وسائد السيراميك لتسخين مفصل أنبوبي قطر 16 بوصة سمك 30 ملم', skillEn: 'Calculate total heater wattage (kW) and ceramic mat array layout for 16-inch heavy wall pipe weld', importance: 'mandatory' }
      ],
      referenceTextbooks: [
        { title: 'Heat Treating of Welded Structures', author: 'ASM International Committee', standardOrPublisher: 'ASM Press' },
        { title: 'Welding Metallurgy: Carbon and Alloy Steels', author: 'G. E. Linnert', standardOrPublisher: 'AWS Press' },
        { title: 'WRC Bulletin 452: Recommended Practices for Local Heating of Welds in Pressure Vessels', author: 'Welding Research Council', standardOrPublisher: 'WRC' }
      ]
    },

    // -------------------------------------------------------------------------
    // LEVEL 2: CERTIFIED PWHT FIELD SUPERVISOR (المستوى الثاني المهني المعتمد)
    // -------------------------------------------------------------------------
    {
      levelId: 'level2',
      tierCategory: 'level2',
      nameAr: 'مشرف وفني معالجة حرارية معتمد ميدانياً (Certified PWHT Field Specialist)',
      nameEn: 'Level II (PWHT Certified Field Supervisor & Thermocouple Lead)',
      academicStageAr: 'الشهادة المهنية المعتمدة لإدارة وتنفيذ دورات المعالجة الحرارية بالموقع ومطابقة مواصفات ASME',
      academicStageEn: 'Professional Field Certification in Resistance/Induction Heat Treatment Operations & Code Compliance',
      targetRoleAr: 'حساب المنحنيات الحرارية، توزيع وتثبيت الثرموكبلات، تشغيل وحدات 65 kW، ومراقبة التدرج الحراري والشارت',
      targetRoleEn: 'Calculate thermal cycles, rig ceramic mats and thermocouples, operate 65 kW multi-channel consoles, audit charts',
      prerequisitesAr: 'خبرة عملية موثقة سنتان في أعمال المعالجة الحرارية مع إتقان استخدام وحدات 65 kW والمسجلات الرقمية',
      prerequisitesEn: '2+ yrs verified field heat treatment experience, mastery of 65 kW mobile rigs and multi-channel dataloggers',
      trainingHours: 80,
      experienceMonths: 24,
      internationalCerts: ['INSCO Certified PWHT Field Supervisor', 'ASNT Materials & Processes NDT Specialist'],
      applicableCodes: ['ASME B31.3 Table 331.1.1', 'ASME Section VIII Div 1 UCS-56', 'BS 2633', 'NACE MR0175 / ISO 15156'],
      responsibilitiesAr: [
        'تحديد زمن النقع (Soak Time) ودرجة الحرارة المستهدفة ومعدلات التسخين والتبريد لكل سبيكة طبقاً لكود المشروع',
        'تثبيت مزدوجات القياس الحراري (Type K Thermocouples) بواسطة ماكينة اللحام النقطي السعوي (Capacitive Discharge)',
        'توزيع وسائد السيراميك المرنة (FCP Mats) والعوازل الصخرية وتثبيتها بأحزمة الاستانلس المقاومة للحرارة',
        'مراقبة تدرج درجات الحرارة المحوري والدائري (Axial & Circumferential Gradients) عبر مسجلات الشارت متعددة القنوات',
        'إجراء اختبار القساوة الميداني المحمول (UCI / Leeb Hardness Testing) والتأكد من عدم تجاوز 22 HRC (248 HV10)'
      ],
      responsibilitiesEn: [
        'Calculate soaking temperature, holding duration, and maximum heating/cooling rates per ASME P-Numbers',
        'Attach Type K calibrated thermocouples using capacitive discharge pin welding (ASTM E220)',
        'Rig flexible ceramic pad (FCP) heaters, multi-layer ceramic blanket insulation, and stainless banding',
        'Control multi-zone temperature uniformity monitoring axial and circumferential gradients via digital dataloggers',
        'Perform on-site portable hardness testing (UCI/Leeb) ensuring strict compliance with NACE MR0175 (max 248 HV10)'
      ],
      modules: [
        {
          id: 'mod_p2_1',
          titleAr: 'الوحدة 1: تشغيل وحدات المقاومة 65 kW وتوزيع الثرموكبلات والعوازل',
          titleEn: 'Module 1: 65 kW Console Operation, Thermocouple Rigging & Insulation Bands',
          duration: '40 ساعة تدريب عملي وميداني',
          topicsAr: [
            'مكونات وحدة المعالجة الحرارية 65 kW: المحول الخافض (Step-down Transformer 60V-85V)، مفاتيح التايرستور والكونتاكتور، ومتحكمات PID',
            'تثبيت الثرموكبل المزدوج Type K بجهاز التثبيت النقطي (Capacitive Discharge Pin Welder) واختبار المقاومة',
            'توزيع الثرموكبلات على محيط الأنبوب: مواضع الساعة 12 والساعة 6 (Top & Bottom) لمعالجة الحمل الحراري الداخلي',
            'تحديد عرض نطاق النقع (Soak Band)، نطاق التسخين (Heated Band)، ونطاق التدرج العازل (Gradient Control Band)',
            'تطبيق طبقات العزل الحراري الصخري (Ceramic Fiber Blankets كثافة 128 kg/m³) وتثبيتها بشرائط التثبيت'
          ],
          topicsEn: [
            '65 kW mobile heat treatment console architecture: 60V-85V step-down transformers, thyristors, and digital PID controllers',
            'Capacitive discharge thermocouple attachment: Positive and negative wire spacing and circuit continuity verification',
            'Circumferential thermocouple mapping: Clock positions (12 o’clock and 6 o’clock) balancing natural internal chimney convection',
            'ASME band definitions: Soak Band (SB), Heated Band (HB per WRC 452), and Gradient Control Insulation Band (GCB)',
            'Multi-layer ceramic fiber insulation application (128 kg/m³ density, 25mm thickness) with stainless steel strapping'
          ],
          learningOutcomesAr: [
            'تجهيز وتوصيل أي مفصل لحام أنبوبي معقد بمهارة وسرعة فائقة',
            'التحكم الدقيق في التدرج الحراري بين أعلى وأسفل الأنبوب ومنع أي تشوه هندسي'
          ],
          learningOutcomesEn: [
            'Rig and wire complex heavy-wall piping joints swiftly with complete thermal control',
            'Eliminate chimney convection temperature splits between top and bottom pipe positions'
          ]
        },
        {
          id: 'mod_p2_2',
          titleAr: 'الوحدة 2: تطبيق أكواد ASME ومراقبة الشارت وفحص القساوة NACE MR0175',
          titleEn: 'Module 2: ASME Code Soaking Cycles, Chart Auditing & NACE Hardness Audits',
          duration: '40 ساعة دراسات أكواد وفحوصات موقعية',
          topicsAr: [
            'جدول ASME B31.3 Table 331.1.1: درجات حرارة النقع وزمن النقع لصلب الكربون P1 والكروم موليبدينوم P4/P5 وسبائك P91',
            'كود أوعية الضغط ASME Section VIII Div 1 UCS-56 وحساب زمن النقع (ساعة واحدة لكل بوصة سماكة حتى 2 بوصة)',
            'حساب معدل التسخين والتبريد الأقصى المسموح فوق 315°م (5555 / Thickness mm or 222°C/hr whichever is less)',
            'تدقيق الرسم البياني المسجل (Chart Recorder Strip / Multi-Channel CSV Data) والتأكد من عدم وجود أي انقطاع حراري',
            'فحص القساوة الميداني بأجهزة UCI المحمولة ومطابقة حد القساوة الأقصى 22 HRC (248 HV10) طبقاً لـ NACE MR0175'
          ],
          topicsEn: [
            'ASME B31.3 Table 331.1.1: Soaking temperatures and hold durations for Carbon Steel (P1), Cr-Mo (P4/P5), and P91 steels',
            'ASME Section VIII Div 1 UCS-56: Soaking rules (1 hr/inch up to 2 inches, plus 15 min for each additional inch)',
            'Maximum permissible heating and cooling rates above 315°C (5555 / t mm or 222°C/hr maximum per code)',
            'Multi-channel datalogger strip chart auditing: Verifying soaking duration, rate compliance, and thermal excursions',
            'Portable on-site hardness testing (UCI/Equotip) verifying compliance with NACE MR0175 sour service limit (max 248 HV10)'
          ],
          learningOutcomesAr: [
            'إصدار سجلات حرارية موثقة تحوز على موافقة استشاري المشروع فورا دون أي اعتراض',
            'حماية خطوط الغاز الحامضي والمصافي من ظاهرة التصدع الإجهادي بالكبريتيد (SSC)'
          ],
          learningOutcomesEn: [
            'Generate bulletproof certified heat treatment chart dossiers accepted immediately by client quality inspectors',
            'Shield sour gas refinery assets from catastrophic Sulfide Stress Cracking (SSC) failures'
          ]
        }
      ],
      keyFormulas: [
        {
          nameAr: 'معدل التسخين الأقصى المسموح فوق 315°م بكود ASME',
          nameEn: 'ASME Max Heating Rate Above 315°C',
          formula: 'Max Rate (°C/hr) = 5555 / Thickness (mm), Max 222°C/hr',
          descriptionAr: 'يمنع تسخين الأنابيب السميكة بمعدل سريع لتفادي إجهادات التدرج الحراري العنيفة عبر الجدار.',
          descriptionEn: 'Restricts heating rate above 315°C to prevent destructive thermal gradients across heavy walls.'
        },
        {
          nameAr: 'حساب زمن النقع المطلوب لصلب الكربون P-No 1',
          nameEn: 'ASME B31.3 Carbon Steel Soaking Time',
          formula: 'Soaking Time (min) = Max(60 min, Thickness_mm / 25 × 60 min)',
          descriptionAr: 'يشترط الكود ساعة واحدة على الأقل لكل بوصة سماكة (25 ملم) مع حد أدنى ساعة واحدة للأنابيب الرقيقة.',
          descriptionEn: 'Mandates minimum 1 hour per 25mm wall thickness with an absolute minimum of 1 hour for thin walls.'
        }
      ],
      practicalSkillsChecklist: [
        { skillAr: 'لحام وتثبيت 8 ثيرموكبلات مزدوجة K على أنبوب 12 بوصة وتوصيلها بجهاز تسجيل رقمي والتأكد من قراءات الحرارة', skillEn: 'Tack weld 8 Type K thermocouples on 12-inch pipe, connect to datalogger, and verify room ambient signals', importance: 'mandatory' },
        { skillAr: 'لف سخانات FCP وعوازل صخرية وتشغيل دورة تسخين حتى 620°م مع التحكم بالتدرج الحراري ضمن ±15°م', skillEn: 'Rig ceramic pad heaters, insulate, and execute full soak cycle at 620°C controlling uniformity within ±15°C', importance: 'mandatory' },
        { skillAr: 'إجراء 10 قراءات قساوة بجهاز UCI على منطقة اللحام و HAZ والتأكد من عدم تجاوز 248 HV10', skillEn: 'Execute 10 UCI hardness spot readings across weld metal and HAZ verifying values below 248 HV10', importance: 'mandatory' }
      ],
      referenceTextbooks: [
        { title: 'ASME B31.3: Process Piping (Chapter VI: Inspection, Examination, and Testing)', author: 'ASME International', standardOrPublisher: 'ASME Standards' },
        { title: 'NACE MR0175 / ISO 15156: Petroleum and natural gas industries — Materials for use in H2S-containing environments', author: 'NACE / ISO Standards', standardOrPublisher: 'AMPP / ISO' },
        { title: 'Handbook of Residual Stress and Deformation of Steel', author: 'G. Totten et al.', standardOrPublisher: 'ASM International' }
      ]
    },

    // -------------------------------------------------------------------------
    // LEVEL 3: PWHT PRINCIPAL CONSULTANT & DIRECTOR (المستوى الثالث الاستشاري)
    // -------------------------------------------------------------------------
    {
      levelId: 'level3',
      tierCategory: 'level3',
      nameAr: 'كبير استشاريي المعالجة الحرارية وميتالورجيا الصلب (PWHT Principal Thermal Engineer)',
      nameEn: 'Level III (PWHT Principal Thermal Engineer & Consulting Authority)',
      academicStageAr: 'القمة الاستشارية في تصميم دورات المعالجة الحرارية المعقدة لسبائك محطات التوليد والمفاعلات العملاقة',
      academicStageEn: 'Supreme Consulting Authority in Heavy Creep-Resistant Alloys, Furnace Design & Stress Analysis',
      targetRoleAr: 'تصميم حلول المعالجة لسبائك P91/P92، حسابات WRC 452 للتدفئة الموضعية، التحكيم الهندسي، واعتماد الإجراءات',
      targetRoleEn: 'Design tight-window P91/P92 thermal cycles, FEA thermal stress modeling per WRC 452, procedure approvals',
      prerequisitesAr: 'بكالوريوس هندسة ميكانيكية أو ميتالورجيا مع خبرة 5+ سنوات في مشاريع محطات القوى والمفاعلات الحرارية المعقدة',
      prerequisitesEn: 'B.Sc. Metallurgy/Mechanical Engineering with 5+ yrs advanced thermal engineering leadership on power reactors',
      trainingHours: 120,
      experienceMonths: 60,
      internationalCerts: ['INSCO Principal Thermal Engineer', 'ASM International Fellow', 'ASNT Level III Materials'],
      applicableCodes: ['WRC Bulletin 452', 'ASME Section VIII Div 1 & Div 2', 'API 510/570', 'BS EN ISO 17663'],
      responsibilitiesAr: [
        'تصميم دورات المعالجة الحرارية المعقدة لسبائك الجيل الجديد (Grade 91 & 92) بنافذة حرارية صارمة (750°م - 775°م)',
        'تطبيق معادلات WRC Bulletin 452 لحساب عرض نطاق التسخين الحرج وتجنب الإجهادات العزمية الثانوية',
        'تصميم الأفران المؤقتة الميدانية وتسخين الأوعية الكروية العملاقة داخلياً بواسطة مواقد الغاز عالية السرعة',
        'تقييم الإعفاءات من المعالجة الحرارية (PWHT Exemptions) وتصميم بدائل التسخين المسبق وفق ASME PCC-2',
        'التحقيق في حوادث التشوه الحراري، الانبعاج، وفشل الزحف المبكر في مفاصل محطات توليد الكهرباء'
      ],
      responsibilitiesEn: [
        'Engineer precision thermal cycles for advanced 9Cr steels (Grade P91/P92) within strict ±10°C tolerance windows',
        'Deploy WRC Bulletin 452 formulations calculating minimum heated band widths to eliminate secondary bending stresses',
        'Design modular temporary field furnaces and internal high-velocity gas firing systems for giant storage spheres',
        'Evaluate PWHT code exemption alternatives and engineered controlled deposition preheat per ASME PCC-2',
        'Lead forensic root cause failure analysis of thermal buckling, excessive warping, and premature creep rupture'
      ],
      modules: [
        {
          id: 'mod_p3_1',
          titleAr: 'الوحدة 1: المعالجة الحرارية فائقة الحرج لسبائك P91/P92 وحسابات WRC 452',
          titleEn: 'Module 1: Advanced P91/P92 Steels, Strict Windows & WRC Bulletin 452 FEA',
          duration: '60 ساعة تصميم حراري متقدم',
          topicsAr: [
            'ميتالورجيا سبائك 9Cr-1Mo-V (Grade 91 / P91): درجات التحول Ac1 و Ac3 وخطر تجاوز 775°م وتحول الأوستنيت غير المستقر',
            'التبريد الإلزامي تحت 100°م (Cooling to Martensite Finish Mf) قبل بدء دورة الـ PWHT لضمان اكتمال تحول المارتينسيت',
            'معادلات WRC Bulletin 452 لحساب عرض نطاق التسخين الفعال: HB = Hi-Lo + 2.5 × √(R × t)',
            'التحكم في الإجهادات الثانوية المرنة واللدنة ومنع الانبعاج الموضعي للأوعية الأفقية والرأسية',
            'تصميم دورات إزالة الهيدروجين المسبقة (Dehydrogenation Heat Treatment - DHT) عند 350°م فور اكتمال اللحام'
          ],
          topicsEn: [
            'Physical metallurgy of 9Cr-1Mo-V (P91): Strict lower critical Ac1 temperature limits and dangers of partial reaustenitization',
            'Mandatory intermediate cool-down below 100°C (Martensite Finish Mf) prior to PWHT to ensure 100% martensite transformation',
            'WRC Bulletin 452 formulations for localized heated band width: HB = Width_weld + 2.5 × √(Mean_Radius × Thickness)',
            'Secondary thermal bending stress modeling and mitigating localized inward buckling in thin-walled shells',
            'Engineering Dehydrogenation Heat Treatment (DHT / Hydrogen Bakeout) protocols at 350°C immediately following welding'
          ],
          learningOutcomesAr: [
            'التحكم المطلق في معالجة أصعب السبائك المعدنية في محطات التوليد دون أي انهيار لخواص الزحف',
            'تصميم خطط التسخين الموضعي بضمانات هندسية مدعومة بالتحليل الإنشائي'
          ],
          learningOutcomesEn: [
            'Master thermal engineering of the most demanding power plant creep-resistant alloys with zero degradation',
            'Design localized girth heating systems backed by rigorous structural stress analysis'
          ]
        },
        {
          id: 'mod_p3_2',
          titleAr: 'الوحدة 2: تسخين الأوعية الكروية بالأفران والتحكيم الهندسي في إعفاءات الأكواد',
          titleEn: 'Module 2: Bulk Internal Gas Firing, Furnace Design & ASME Code Waivers',
          duration: '60 ساعة استشارات صناعية كبرى',
          topicsAr: [
            'تسخين الأوعية الكروية العملاقة ومفاعلات التكرير داخلياً بواسطة الاحتراق بالغاز عالي السرعة (High-Velocity Burners)',
            'حساب التوازن الحراري وفقدان الحرارة بالإشعاع والحمل واختيار قدرات المراوح والمداخن',
            'تقييم بدائل المعالجة الحرارية بالأكواد: تقنية اللحام متعدد التمريرات المهدئ (Temper Bead Welding per ASME IX QW-290)',
            'دراسات الأثر المتبقي: التحكيم في قبول الوصلات التي تعرضت لانقطاع مفاجئ في التيار الكهربائي أثناء فترة النقع',
            'اعتماد وتوقيع الإجراءات الهندسية الشاملة لشركات المقاولات الكبرى وشركات البترول العالمية'
          ],
          topicsEn: [
            'Internal firing of giant storage spheres and refinery vessels deploying high-velocity multi-million BTU gas burners',
            'Thermodynamic modeling of convective circulation, thermal radiation flux, and atmospheric damper exhaust sizing',
            'Evaluating code-permitted PWHT alternatives: Temper bead welding engineering per ASME Section IX QW-290',
            'Thermal excursion arbitration: Evaluating interrupted thermal cycles caused by sudden site power blackouts during soak',
            'Formally stamping corporate heat treatment procedures and serving as senior consulting authority for global operators'
          ],
          learningOutcomesAr: [
            'إدارة وتنفيذ مشاريع المعالجة الحرارية للأوعية والأفران العملاقة بميزانيات بملايين الدولارات',
            'اتخاذ القرارات الهندسية المعتمدة لإنقاذ الوصلات عند حدوث طوارئ أو انقطاع كهربائي بالموقع'
          ],
          learningOutcomesEn: [
            'Direct multi-million dollar thermal treatment campaigns on giant spheres and modular field furnaces',
            'Render authoritative engineering determinations rescuing workpieces following accidental power outages'
          ]
        }
      ],
      keyFormulas: [
        {
          nameAr: 'حساب عرض نطاق التسخين الموضعي الحرج طبقاً لـ WRC Bulletin 452',
          nameEn: 'WRC 452 Local Heated Band Width (HB)',
          formula: 'HB = W_weld + 2.5 × √(R × t)',
          descriptionAr: 'حيث W_weld عرض تاج اللحام، R نصف قطر الأنبوب المتوسط، t سماكة الجدار. يضمن خمود عزم الانحناء الحراري وتجنب الانبعاج.',
          descriptionEn: 'Calculates the required surface width of insulation and heating to decay secondary bending moments to negligible levels.'
        }
      ],
      practicalSkillsChecklist: [
        { skillAr: 'تصميم دورة معالجة حرارية لخط بخار فائق الضغط سبيكة P91 سمك 45 ملم بحدود حرارية صارمة (760°م ± 10°م)', skillEn: 'Design full thermal procedure for 45mm P91 high-pressure steam pipe strictly holding 760°C ± 10°C', importance: 'mandatory' },
        { skillAr: 'حساب وتحديد عرض نطاق التسخين (HB) ونطاق العزل (GCB) لأنبوب قطره 24 بوصة سمك 38 ملم وفق معادلات WRC 452', skillEn: 'Compute WRC 452 heated band and insulation gradient widths for 24-inch 38mm wall thickness pipe', importance: 'mandatory' },
        { skillAr: 'تقييم تقرير فني لحادثة انقطاع تيار كهربائي أثناء نقع حراري ووضع دورة تعويضية معتمدة وفق كود ASME', skillEn: 'Evaluate site blackout technical report during thermal soak and engineer code-compliant recovery cycle', importance: 'mandatory' }
      ],
      referenceTextbooks: [
        { title: 'WRC Bulletin 452: Recommended Practices for Local Heating of Welds', author: 'Welding Research Council', standardOrPublisher: 'WRC Press' },
        { title: 'High-Temperature Creep and Fatigue of Steels', author: 'E. R. de los Rios', standardOrPublisher: 'Springer' },
        { title: 'ASME Section VIII Division 1: Pressure Vessels (UCS-56 Rules)', author: 'ASME International', standardOrPublisher: 'ASME Standards' }
      ]
    }
  ]
};
