import { EngineeringDiscipline } from '../types';

export const advancedNdtDiscipline: EngineeringDiscipline = {
  id: 'ndt_advanced',
  titleAr: 'علوم وتقنيات الفحص غير الإتلافي المتقدم (Advanced NDT - PAUT, TOFD, ECA, Guided Waves)',
  titleEn: 'Advanced Non-Destructive Testing (Phased Array, TOFD, Eddy Current Array, Guided Waves)',
  category: 'ndt_advanced',
  badgeColor: 'sky',
  overviewAr: 'الجيل الرقمي الأحدث في التفتيش بالموجات الصوتية والكهرومغناطيسية متعددة العناصر. يوفر تصويراً حجمياً ثلاثي الأبعاد للعيوب، وتحديد دقيق لارتفاع الشروخ وعمقها، مع التوثيق الرقمي الكامل المشفر بديلاً عن التصوير الإشعاعي وخطر الإشعاع.',
  overviewEn: 'Next-generation acoustic and electromagnetic imaging deploying multi-element arrays. Delivers 3D volumetric flaw reconstructions, sub-millimeter height sizing, and encoded digital archiving replacing hazardous radiography.',
  keyTechniques: [
    'PAUT (Phased Array Ultrasonic Testing - ASME Sec V App IV / Code Case 2235)',
    'TOFD (Time of Flight Diffraction - ASME Sec V App III / ISO 10863)',
    'ECA (Eddy Current Array - ASME Sec V Art. 8 / ISO 15549)',
    'LRUT / GWT (Long Range Guided Wave Testing - ASTM E2775)',
    'TFM / FMC (Total Focusing Method & Full Matrix Capture - ASME Sec V App XI)'
  ],
  globalAccreditations: ['CSWIP PAUT / TOFD Level 2 & 3', 'ISO 9712 Advanced NDT', 'PCN Advanced NDT', 'ASME Code Case 2235'],
  targetIndustries: ['Sour Gas Pipelines', 'Nuclear Reactor Pressure Vessels', 'Heavy Hydrocrackers', 'Wind Turbine Shafts', 'Aerospace Composites'],
  levels: [
    // -------------------------------------------------------------------------
    // LEVEL 1: ACADEMIC & UNIVERSITY FOUNDATIONS (المرحلة الأكاديمية والجامعية)
    // -------------------------------------------------------------------------
    {
      levelId: 'academic',
      tierCategory: 'academic',
      nameAr: 'المرحلة الأكاديمية والجامعية (University Advanced Wave Physics & DSP)',
      nameEn: 'Academic & University Multi-Element Wave Physics',
      academicStageAr: 'المقررات الأكاديمية المتقدمة لطلاب الهندسة في معالجة الإشارات وفيزياء الموجات المتراكبة',
      academicStageEn: 'Advanced University Coursework in Digital Signal Processing & Wavelet Synthesis',
      targetRoleAr: 'دراسة واشتقاق مبدأ هويغنز للتراكب الموجي، قوانين التأخير الزمني (Focal Laws)، ومعادلات عمق اختراق التيارات الدوامية',
      targetRoleEn: 'Derive Huygens constructive/destructive interference, time-delay focal laws, and eddy current skin depth dynamics',
      prerequisitesAr: 'دراسة متقدمة في الرياضيات التطبيقية، تحويلات فورييه (FFT)، الكهرومغناطيسية، والفيزياء الموجية',
      prerequisitesEn: 'Advanced Applied Mathematics, Fourier Analysis (FFT), Electromagnetism, and Wave Mechanics',
      trainingHours: 120,
      experienceMonths: 0,
      internationalCerts: ['B.Sc. Mechanical / Electrical / Physics', 'ASNT Student Member'],
      applicableCodes: ['ISO 18563 (Phased Array Probes)', 'ISO 10863 (TOFD Physics)', 'ASTM E2904'],
      responsibilitiesAr: [
        'اشتقاق معادلات تأخير زمن الإثارة (Delay Laws) لتوجيه وتركيز الحزمة الصوتية بزاوية وبؤرة محددة',
        'حساب مسافة الفصوص الجانبية وفصوص الشبكة (Grating Lobes) والشروط الهندسية لمنع ظهورها (Pitch ≤ λ/2)',
        'فهم فيزياء حيود الموجات عند حواف الشروخ (Diffraction Tip Mechanics) وانعكاس الطور 180 درجة',
        'اشتقاق عمق اختراق التيارات الدوامية السطحية (Skin Depth δ) من معادلات ماكسويل الكهرومغناطيسية',
        'دراسة منحنيات التشتت (Dispersion Curves) لانتشار الموجات الموجهة في الأنابيب والصفائح'
      ],
      responsibilitiesEn: [
        'Mathematically derive excitation delay laws to electronically steer and focus acoustic wavefronts',
        'Calculate grating lobe spatial distributions and verify the geometric anti-aliasing rule (Pitch ≤ λ/2)',
        'Model acoustic diffraction tip physics at sharp crack apexes with 180-degree phase reversal analysis',
        'Derive electromagnetic eddy current standard skin depth (δ) directly from Maxwell’s curl equations',
        'Analyze dispersion curves and phase velocity vs frequency relationships for guided wave modes'
      ],
      modules: [
        {
          id: 'mod_adv_acad_1',
          titleAr: 'الوحدة الأكاديمية 1: فيزياء تراكب الموجات وهندسة مصفوفات الفحص (PAUT & TFM)',
          titleEn: 'Academic Module 1: Wavelet Synthesis, Huygens Interference & Focal Laws',
          duration: '45 ساعة محاضرات ونمذجة عددية',
          topicsAr: [
            'مبدأ هويغنز-فرينل: الموجة كغلاف لموجات كروية ثانوية ناتجة عن إثارة بلورات المصفوفة بيزوكهربائياً',
            'هندسة المسبار متعدد العناصر: عرض العنصر (Width)، خطوة التوزيع (Pitch)، والفتحة النشطة (Active Aperture)',
            'ظاهرة فصوص الشبكة (Grating Lobes): كيف تتولد حزم صوتية زائفة وكيفية منعها بتصميم المسبار المناسب',
            'طرق التركيز: التركيز النقطي (Focus Depth)، خطة شعاع المسار (Ray Tracing)، وقوانين التركيز البؤري (Focal Laws)',
            'مصفوفة الالتقاط الكاملة (Full Matrix Capture - FMC) وخوارزمية التركيز الشامل (Total Focusing Method - TFM)'
          ],
          topicsEn: [
            'Huygens-Fresnel wave interference: Spherical wavelets synthesized via pulsed multi-element piezo-elements',
            'Phased array transducer architecture: Element width, pitch, passive aperture, and active array length',
            'Grating lobes physics: Spatial aliasing of acoustic waves and geometric probe pitch suppression criteria',
            'Acoustic beam synthesis: Dynamic depth focusing (DDF), ray-tracing models, and focal law generation algorithms',
            'Full Matrix Capture (FMC) acquisition architectures and real-time Total Focusing Method (TFM) algorithms'
          ],
          learningOutcomesAr: [
            'القدرة على برمجة ومحاكاة الحزم الصوتية لجميع أنواع مسابير المصفوفات الطورية',
            'فهم الفارق الفيزيائي الدقيق بين تقنية PAUT الكلاسيكية وتقنية TFM المجهرية الحديثة'
          ],
          learningOutcomesEn: [
            'Program and simulate dynamic acoustic beams for diverse array transducer topologies',
            'Grasp the exact mathematical differences between analog phased array beamforming and pixelated TFM'
          ]
        },
        {
          id: 'mod_adv_acad_2',
          titleAr: 'الوحدة الأكاديمية 2: فيزياء حيود قمة العيب TOFD وكهرومغناطيسية التيارات الدوامية ECA',
          titleEn: 'Academic Module 2: TOFD Tip Diffraction Physics & Eddy Current Skin Depth',
          duration: '45 ساعة نظريات وتجارب معملية',
          topicsAr: [
            'فيزياء حيود وقت الطيران (TOFD): موجة السطح الجانبية (Lateral Wave) وانعكاس القاع وحيود طرفي الشرخ',
            'انقلاب الطور (Phase Inversion 180°): كيف نميز إشارة قمة الشرخ العلوية عن السفلية بناءً على قطبية الموجة',
            'معادلات عمق التيارات الدوامية: الموصلية الكهربائية (Conductivity %IACS) والنفاذية المغناطيسية والتردد',
            'مستوى المعاوقة المركبة (Impedance Plane Diagram): المقاومة الأومية والمفاعلة الحثية وزاوية الطور',
            'الموجات الموجهة بعيدة المدى (Guided Waves): الموجات الالتوائية T(0,1) والموجات الطولية L(0,2) في الأنابيب'
          ],
          topicsEn: [
            'Time-of-Flight Diffraction physics: Lateral wave propagation, backwall reflection, and apex diffracted wavelets',
            'Phase inversion dynamics: Resolving top vs bottom crack tip diffractions via 180-degree polarity reversal',
            'Eddy current skin effect: Electrical conductivity (%IACS), magnetic permeability, and excitation frequency',
            'Complex impedance plane analysis: Normalised resistance, inductive reactance, and phase lag defect angles',
            'Long-range guided wave propagation: Torsional T(0,1) non-dispersive modes vs longitudinal L(0,2) in pipelines'
          ],
          learningOutcomesAr: [
            'فهم الأسس الرياضية لقياس ارتفاع الشروخ بدقة تفوق كافة وسائل الفحص الأخرى',
            'فهم كيفية اكتشاف التآكل والشقوق السطحية دون تلامس مباشر مع المعدن'
          ],
          learningOutcomesEn: [
            'Master the mathematical foundations of sub-millimeter crack height sizing via acoustic diffraction',
            'Understand non-contact electromagnetic defect screening and impedance vector rotations'
          ]
        }
      ],
      keyFormulas: [
        {
          nameAr: 'حساب شرط تجنب فصوص الشبكة الزائفة (Grating Lobes)',
          nameEn: 'Array Pitch Anti-Grating Lobe Criterion',
          formula: 'Pitch (e) ≤ λ / (1 + sin θ_max)',
          descriptionAr: 'يضمن عدم تولد حزم صوتية ثانوية زائفة تشوه الصورة عند توجيه الحزمة لأقصى زاوية مسح (θ_max).',
          descriptionEn: 'Dictates maximum probe element spacing to prevent unwanted secondary beams during angular steering.'
        },
        {
          nameAr: 'معادلة حساب عمق طرف الشرخ في تقنية TOFD',
          nameEn: 'TOFD Flaw Depth Sizing Formula',
          formula: 'd = √[ (c × t / 2)² - s² ]',
          descriptionAr: 'حيث d عمق العيب، c سرعة الصوت الطولية، t زمن وصول الإشارة المحيدة، s نصف المسافة بين مسباري الإرسال والاستقبال (PCS / 2).',
          descriptionEn: 'Calculates true depth (d) from diffracted transit time (t), velocity (c), and half-probe separation (s).'
        },
        {
          nameAr: 'عمق الاختراق القياسي للتيارات الدوامية (Skin Depth)',
          nameEn: 'Standard Eddy Current Skin Depth (δ)',
          formula: 'δ = 1 / √(π × f × μ × σ) = 50.3 × √[ 1 / (f × μ_r × σ) ]',
          descriptionAr: 'العمق الذي تنخفض عنده كثافة التيارات الدوامية إلى 37% (1/e) من قيمتها عند السطح. الناتج بالملم.',
          descriptionEn: 'Depth where eddy current density decays to 37% of surface value as function of frequency (f), permeability (μ), and conductivity (σ).'
        }
      ],
      practicalSkillsChecklist: [
        { skillAr: 'محاكاة انتشار حزمة صوتية لـ 32 عنصراً وحساب زاوية انحراف الحزمة وزمن التأخير الزمني لكل عنصر', skillEn: 'Simulate 32-element acoustic beam steering and compute individual element time delay laws', importance: 'mandatory' },
        { skillAr: 'تطبيق تجربة TOFD على عينة فولاذية بها شرخ إجهادي وتأكيد انقلاب الطور بموجة الإشارة RF Waveform', skillEn: 'Conduct TOFD laboratory test on fatigue crack verifying 180-degree phase reversal on unrectified RF signal', importance: 'mandatory' },
        { skillAr: 'قياس موصلية سبائك مختلفة (%IACS) بجهاز التيارات الدوامية وإثبات انخفاض عمق الاختراق مع زيادة التردد', skillEn: 'Measure conductivity of alloys via eddy current gauge and verify skin depth decay at higher frequencies', importance: 'mandatory' }
      ],
      referenceTextbooks: [
        { title: 'Advances in Phased Array Ultrasonic Technology Applications', author: 'Olympus NDT Engineering Team', standardOrPublisher: 'Olympus Press' },
        { title: 'Time of Flight Diffraction Technology', author: 'TWI / British Institute of NDT', standardOrPublisher: 'BINDT' },
        { title: 'Electromagnetic Nondestructive Evaluation', author: 'J. R. Bowler', standardOrPublisher: 'IOS Press' }
      ]
    },

    // -------------------------------------------------------------------------
    // LEVEL 2: CERTIFIED ADVANCED NDT SPECIALIST (المستوى الثاني المهني المعتمد)
    // -------------------------------------------------------------------------
    {
      levelId: 'level2',
      tierCategory: 'level2',
      nameAr: 'مفتش تقنيات متقدمة ومحلل بيانات معتمد (Advanced NDT Data Analyst)',
      nameEn: 'Level II (Advanced NDT Specialist & Data Analyst)',
      academicStageAr: 'شهادة الاعتماد التخصصي المتقدم (CSWIP / ISO 9712 / PCN PAUT & TOFD Level 2)',
      academicStageEn: 'Professional Qualification & Certification (CSWIP / ISO 9712 PAUT & TOFD Level 2)',
      targetRoleAr: 'برمجة قوانين التركيز، تشغيل الماسحات المشفرة، تحليل بيانات A/B/C/S-Scan، وتقديم ملفات فحص رقمية',
      targetRoleEn: 'Set up focal laws, operate encoded automated crawlers, analyze A/B/C/S-Scan data, evaluate flaws per ASME',
      prerequisitesAr: 'شهادة المستوى الثاني في UT التقليدي مع تدريب مكثف 80 ساعة واجتياز اختبارات تحليل البيانات الرقمية',
      prerequisitesEn: 'Conventional UT Level II certified with 80 hrs advanced training, passing blind data analysis examinations',
      trainingHours: 80,
      experienceMonths: 18,
      internationalCerts: ['CSWIP PAUT Level 2', 'ISO 9712 TOFD Level 2', 'PCN Advanced NDT (PAUT/TOFD/ECA)'],
      applicableCodes: ['ASME Sec V Art. 4 App IV & III', 'ASME Code Case 2235', 'ISO 13588', 'ISO 10863', 'API 1104 App A'],
      responsibilitiesAr: [
        'معايرة وتأكيد سرعة الصوت وزاوية الإسفين وتأخير الإسفين (Wedge Delay) وموازنة حساسية الزوايا (ACG)',
        'بناء منحنى الكسب المصحح زمنياً (Time Corrected Gain - TCG) عبر كامل نطاق سمك جدار اللحام',
        'تشغيل ومعايرة الماسحات الميكانيكية المشفرة (Optical Wheel Encoders) لربط موضع العيب بخط السنتر',
        'تحليل عروض البيانات المتزامنة: العرض القطاعي S-Scan والعرض الجانبي B-Scan والعلوي C-Scan و TOFD D-Scan',
        'قياس ارتفاع العيب الحقيقي (Flaw Through-Wall Height Δh) لتزويد تقييمات السلامة والأهلية للخدمة (API 579 FFS)'
      ],
      responsibilitiesEn: [
        'Calibrate acoustic velocity, probe wedge delay, and balance Angle Corrected Gain (ACG) across array',
        'Construct Time Corrected Gain (TCG) curves across the full inspection volume and wall thickness',
        'Calibrate optical position encoders to map exact linear coordinate of flaws along the weld seam',
        'Analyze simultaneous multi-view data: Sectorial S-Scan, cross-sectional B-Scan, plan C-Scan, and TOFD D-Scan',
        'Accurately measure vertical through-wall flaw height (Δh) to feed API 579 Fitness-For-Service calculations'
      ],
      modules: [
        {
          id: 'mod_adv_2_1',
          titleAr: 'الوحدة 1: معايرة مسابير المصفوفات وتوليد خطط الفحص (Scan Plans)',
          titleEn: 'Module 1: Phased Array Calibration & Ray-Tracing Scan Plans',
          duration: '40 ساعة تدريبية معملية',
          topicsAr: [
            'تصميم خطة الفحص (Scan Plan): نمذجة شطبة اللحام وتأكيد تغطية الحزم الصوتية لمنطقة اللحام والـ HAZ بنسبة 100%',
            'معايرة تعويض الكسب المعتمد على الزاوية (Angle Corrected Gain - ACG) لمساواة الحساسية من 40° إلى 70°',
            'معايرة الكسب المصحح زمنياً (TCG) على بلوك ASME متعدد الثقوب الجانبية لضمان ثبات حساسية الأعماق',
            'المسح الإلكتروني الخطي (Linear E-Scan) والمسح القطاعي الزاوي (Sectorial S-Scan)',
            'تطبيق كود ASME Code Case 2235 لاستبدال فحص الأشعة RT بفحص PAUT الرقمي المشفر بالكامل'
          ],
          topicsEn: [
            'Scan plan design: Modeling weld bevel geometry ensuring 100% volumetric and HAZ ray-tracing coverage',
            'Angle Corrected Gain (ACG) calibration balancing sensitivity across all steered angles (40° to 70°)',
            'Time Corrected Gain (TCG) calibration on multi-hole ASME blocks guaranteeing uniform depth response',
            'Electronic linear scanning (E-Scan) vs sectorial angular scanning (S-Scan) deployment strategies',
            'Enforcing ASME Code Case 2235 requirements for replacing radiographic testing with fully encoded PAUT'
          ],
          learningOutcomesAr: [
            'تصميم خطة فحص شعاعية محكمة خالية من أي مناطق عمياء في مفصل اللحام',
            'معايرة أجهزة PAUT المتطورة في أقل من 15 دقيقة بجاهزية عمل ميدانية تامة'
          ],
          learningOutcomesEn: [
            'Design flawless ray-tracing scan plans with zero blind zones within the weldment volume',
            'Execute multi-step PAUT instrument calibrations swiftly with complete field readiness'
          ]
        },
        {
          id: 'mod_adv_2_2',
          titleAr: 'الوحدة 2: تحليل وتفسير بيانات TOFD وقياس أبعاد العيوب الحرجة',
          titleEn: 'Module 2: TOFD Data Analysis, Tip Resolution & Flaw Sizing',
          duration: '40 ساعة دراسة حالات حقيقية',
          topicsAr: [
            'ضبط المسافة الفاصلة بين مسباري الإرسال والاستقبال (Probe Centre Separation - PCS) ومحاذاة الشطبة',
            'قراءة وتحليل شاشات TOFD الرمادية (Greyscale D-Scans) وتفسير انحناءات عيوب القمة والقاع',
            'تحديد الشروخ السطحية والشروخ الداخلية ونقص التغلغل ونقص الانصهار الجانبي بدقة ±0.5 ملم',
            'معالجة مشاكل المناطق العمياء (Lateral Wave & Backwall Dead Zones) بدمج TOFD مع مسارات PAUT الزاوية',
            'إعداد تقرير التفتيش المتقدم الرقمي المتضمن لقطات ثلاثية الأبعاد وخرائط العيوب ومطابقة ASME Sec V Art. 4'
          ],
          topicsEn: [
            'Probe Centre Separation (PCS) optimization for designated thickness depth focusing',
            'Greyscale D-scan data interpretation: Resolving hyperbolic diffractions from top and bottom flaw apexes',
            'Characterizing surface-breaking cracks, embedded flaws, lack of penetration, and sidewall lack of fusion (±0.5mm)',
            'Mitigating near-surface and backwall dead zones through synchronized complementary PAUT sectors',
            'Compiling digital advanced inspection dossiers with 3D volumetric renders per ASME Sec V Article 4'
          ],
          learningOutcomesAr: [
            'قياس الارتفاع الحقيقي الدقيق لأي شرخ داخلي بدقة تكفي لحسابات الأمان بالغة الحرج',
            'اعتماد تقارير فحص PAUT/TOFD معترف بها من كافة شركات النفط العالمية'
          ],
          learningOutcomesEn: [
            'Measure true vertical flaw height with precision satisfying critical safety engineering assessments',
            'Author authoritative digital PAUT/TOFD dossiers acceptable to global oil and gas operators'
          ]
        }
      ],
      keyFormulas: [
        {
          nameAr: 'حساب المسافة المثلى بين مسباري TOFD (Probe Centre Separation)',
          nameEn: 'Optimal TOFD Probe Centre Separation (PCS)',
          formula: 'PCS = 2 × (2/3 × Thickness) × tan(θ)',
          descriptionAr: 'يحدد المسافة الفاصلة بين مسبار الإرسال والاستقبال لتركيز حزمة الحزم المحيدة عند عمق ثلثي السماكة حيث تتركز غالبية عيوب اللحام.',
          descriptionEn: 'Calculates optimum transducer separation (PCS) to focus intersection beams at two-thirds wall depth.'
        },
        {
          nameAr: 'حساب ارتفاع الشرخ الصافي بتقنية TOFD (Flaw Height)',
          nameEn: 'TOFD Flaw Height Sizing (Δh)',
          formula: 'Δh = d_bottom - d_top = √[(c × t₂/2)² - s²] - √[(c × t₁/2)² - s²]',
          descriptionAr: 'الفارق بين عمق طرف الشرخ السفلي (d_bottom) وعمق طرف الشرخ العلوي (d_top) المستخرجين من زمن وصول إشارات الحيود.',
          descriptionEn: 'Calculates true through-wall flaw height (Δh) from diffracted transit arrival times of bottom and top tips.'
        }
      ],
      practicalSkillsChecklist: [
        { skillAr: 'تثبيت ومحاذاة ماسح مشفر (Semi-automated Scanner) على خط لحام ومسح بطول 1 متر بدون فقد بيانات', skillEn: 'Mount and align encoded scanner on pipeline weld and perform 1-meter scan without data dropouts', importance: 'mandatory' },
        { skillAr: 'معايرة TCG و ACG على مصفوفة 32:128 والتحقق من حساسية ثقوب ASME الجانبية بنسبة ±1 dB', skillEn: 'Calibrate TCG and ACG on 32:128 array probe verifying ASME SDH response uniformity within ±1 dB', importance: 'mandatory' },
        { skillAr: 'تحليل ملف بيانات TOFD به شرخ سطحي وشرخ داخلي واستخراج ارتفاع العيب بالملم وكتابة التقرير', skillEn: 'Analyze TOFD raw data file resolving surface and embedded cracks, measure height (Δh), and report', importance: 'mandatory' }
      ],
      referenceTextbooks: [
        { title: 'BS EN ISO 13588: Non-destructive testing of welds — Ultrasonic testing — Use of automated phased array', author: 'ISO Standards', standardOrPublisher: 'ISO' },
        { title: 'BS EN ISO 10863: Ultrasonic testing — Use of time-of-flight diffraction technique (TOFD)', author: 'ISO Standards', standardOrPublisher: 'ISO' },
        { title: 'ASME Boiler and Pressure Vessel Code: Code Case 2235 (Latest Revision)', author: 'ASME International', standardOrPublisher: 'ASME Press' }
      ]
    },

    // -------------------------------------------------------------------------
    // LEVEL 3: ADVANCED NDT PRINCIPAL CONSULTANT (المستوى الثالث الاستشاري)
    // -------------------------------------------------------------------------
    {
      levelId: 'level3',
      tierCategory: 'level3',
      nameAr: 'المستوى الثالث الاستشاري ورئيس قطاع التقنيات المتقدمة (Advanced NDT Level III Authority)',
      nameEn: 'Level III (Advanced NDT Principal Consultant & Technical Director)',
      academicStageAr: 'القمة الاستشارية في اعتماد أنظمة الفحص بالمصفوفات والماسحات الآلية والتحكيم الدولي',
      academicStageEn: 'Peak Consulting Authority in Advanced Array Architectures, Automated Systems & Arbitration',
      targetRoleAr: 'تصميم واعتماد إجراءات PAUT/TOFD، تأهيل أنظمة الفحص الآلية AUT، والتحكيم الهندسي في المشاريع العملاقة',
      targetRoleEn: 'Author and approve PAUT/TOFD procedures, qualify automated AUT pipeline systems, arbitrate complex code disputes',
      prerequisitesAr: 'شهادة Level III معتمدة من ASNT أو ISO 9712 مع خبرة مثبتة في مشاريع خطوط الأنابيب وأوعية الضغط العملاقة',
      prerequisitesEn: 'Certified Level III (ASNT / ISO 9712) with extensive documented track record in pipeline and reactor AUT projects',
      trainingHours: 120,
      experienceMonths: 48,
      internationalCerts: ['ASNT Level III (PAUT / TOFD / UT)', 'ISO 9712 Level 3 Advanced NDT', 'CSWIP Level 3'],
      applicableCodes: ['DNV-ST-F101 (Submarine Pipelines)', 'API 1104 App A', 'ASME Section V Art. 4', 'ISO 17025'],
      responsibilitiesAr: [
        'صياغة واعتماد إجراءات الفحص المتقدمة (PAUT / TOFD / ECA / TFM Procedures) وختمها رسمياً',
        'تأهيل أنظمة الفحص الأوتوماتيكي لخطوط الأنابيب البحرية (Automated Ultrasonic Testing - AUT Qualification)',
        'إجراء تجارب العينات العمياء (Blind Flawed Sample Trials) وحساب منحنيات احتمالية الاكتشاف (POD Curves)',
        'التحكيم الفني عند الاختلاف بين قراءات PAUT وقراءات الفحوصات الإتلافية المجهرية',
        'تدريب وتأهيل واختبار محللي البيانات ومفتشي المستوى الثاني للتقنيات المتقدمة'
      ],
      responsibilitiesEn: [
        'Author, review, and formally approve advanced NDT procedures (PAUT, TOFD, ECA, TFM) per ASME Section V',
        'Lead qualification and validation trials for offshore pipeline Automated Ultrasonic Testing (AUT) systems',
        'Execute blind flawed specimen validation programs and construct empirical Probability of Detection (POD) curves',
        'Serve as ultimate technical arbitrator when reconciling AUT sizing data against metallographic micro-sections',
        'Administer rigorous qualification and certification examinations for Level II Advanced NDT data analysts'
      ],
      modules: [
        {
          id: 'mod_adv_3_1',
          titleAr: 'الوحدة 1: تأهيل منظومات الفحص الآلية AUT وفق مواصفات DNV و API 1104 App A',
          titleEn: 'Module 1: Automated Ultrasonic Testing (AUT) Qualification & POD Validation',
          duration: '60 ساعة استشارية متقدمة',
          topicsAr: [
            'معايير تأهيل أنظمة الفحص الآلي وفق كود DNV-ST-F101 للخطوط البحرية وأوعية الضغط النووية',
            'تصميم عينات المعايرة ذات الشروخ الصناعية المحفورة بالشرارة الكهربائية (EDM Notches & Flat Bottom Holes)',
            'حساب منحنيات احتمالية الاكتشاف (Probability of Detection - POD) والحد الأدنى لحجم العيب القابل للرصد',
            'التأهيل الميداني للماسحات الآلية والزحافات المغناطيسية السريعة (Fast Crawler Systems)',
            'اعتماد تقنيات Total Focusing Method (TFM) الحديثة وفق كود ASME Section V Mandatory Appendix XI'
          ],
          topicsEn: [
            'AUT qualification frameworks according to DNV-ST-F101 submarine pipeline and nuclear vessel specifications',
            'Engineering design of specialized calibration blocks featuring electro-discharge machined (EDM) precision notches',
            'Empirical Probability of Detection (POD) curve modeling and determining 90/95 sizing capability thresholds',
            'Field qualification of automated mechanized crawlers, multi-probe bands, and multi-channel data acquisition',
            'Formal procedure approval for Total Focusing Method (TFM) complying with ASME Section V Appendix XI'
          ],
          learningOutcomesAr: [
            'القدرة على قيادة وتأهيل أكبر مشاريع فحص خطوط الأنابيب والمصافي البترولية دولياً',
            'اعتماد تقنيات TFM الأحدث عالمياً وتطبيقها بنجاح تام في الميدان'
          ],
          learningOutcomesEn: [
            'Lead multi-million dollar pipeline and refinery AUT qualification programs internationally',
            'Authoritatively qualify and deploy state-of-the-art TFM inspection architectures in the field'
          ]
        },
        {
          id: 'mod_adv_3_2',
          titleAr: 'الوحدة 2: التحكيم الهندسي وتكامل البيانات مع تقييمات الصلاحية للخدمة (API 579 FFS)',
          titleEn: 'Module 2: Advanced Technical Arbitration & API 579 FFS Integration',
          duration: '60 ساعة تطبيقات ومحاكاة',
          topicsAr: [
            'تغذية بيانات أبعاد العيوب (Flaw Length 2c, Flaw Height 2a) في برامج تقييم الأهلية للخدمة API 579',
            'التعامل مع العيوب المعقدة: الشروخ المتفرعة، التآكل الإجهادي المتشعب (SCC Clustered Cracks)، وفقاعات الهيدروجين (HIC)',
            'حل النزاعات والطعون الفنية بين المقاول العام واستشاري المالك حول دقة قياسات الماسحات',
            'تصميم حلول فحص الوصلات المعدنية غير المتجانسة (Dissimilar Metal Welds - DMW) في محطات الطاقة'
          ],
          topicsEn: [
            'Direct integration of ultrasonic volumetric flaw dimensions into API 579 / ASME FFS-1 assessment spreadsheets',
            'Resolving complex degradation morphologies: Stress Corrosion Cracking (SCC) colonies and Hydrogen Induced Cracking (HIC)',
            'Arbitrating contentious technical disputes between EPC contractors and client auditors regarding sizing tolerances',
            'Engineering inspection strategies for highly challenging Dissimilar Metal Welds (DMW) in power boilers'
          ],
          learningOutcomesAr: [
            'اتخاذ القرارات الهندسية المصيرية بشأن إيقاف أو استمرار تشغيل المعدات البترولية الحيوية',
            'تمثيل المنشأة كخبير استشاري أعلى أمام كبرى الهيئات والشركات العالمية'
          ],
          learningOutcomesEn: [
            'Make critical engineering determinations regarding safe operation or emergency shutdown of vital energy assets',
            'Represent corporations as supreme consulting authorities before world energy consortiums and regulators'
          ]
        }
      ],
      keyFormulas: [
        {
          nameAr: 'حساب احتمالية الاكتشاف بدرجة ثقة (POD 90/95 Criterion)',
          nameEn: 'Probability of Detection 90/95 Logistic Equation',
          formula: 'POD(a) = 1 / [ 1 + e^(-(β₀ + β₁ × ln(a))) ]',
          descriptionAr: 'النموذج الإحصائي اللوجستي المعتمد دولياً لتحديد أصغر حجم عيب (a) يمكن للمنظومة اكتشافه بنسبة 90% مع مستوى ثقة 95%.',
          descriptionEn: 'Logistic statistical regression model establishing the 90% detection capability threshold with 95% statistical confidence.'
        }
      ],
      practicalSkillsChecklist: [
        { skillAr: 'صياغة واعتماد إجراء فحص PAUT/TOFD كامل لخط أنابيب غاز حامضي 36 بوصة طبقاً لـ ASME Sec V و API 1104', skillEn: 'Author and stamp complete PAUT/TOFD procedure for 36-inch sour gas pipeline per ASME V and API 1104', importance: 'mandatory' },
        { skillAr: 'تصميم بلوك معايرة أوتوماتيكي معقد يتضمن 8 ثقوب EDM مائلة بزوايا الشطبة المختلفة', skillEn: 'Design complex AUT calibration block with 8 EDM notches oriented along varying bevel fusion angles', importance: 'mandatory' },
        { skillAr: 'إجراء مراجعة تحكيمية لملف فحص شق إجهادي متنازع عليه بين مقاول الحفر وشركة البترول وحسم القرار', skillEn: 'Arbitrate contested sizing data of fatigue crack dispute between drilling contractor and oil major', importance: 'mandatory' }
      ],
      referenceTextbooks: [
        { title: 'DNV-ST-F101: Submarine pipeline systems (Automated Ultrasonic Testing)', author: 'DNV GL Standards', standardOrPublisher: 'DNV' },
        { title: 'API 579-1 / ASME FFS-1: Fitness-For-Service', author: 'American Petroleum Institute & ASME', standardOrPublisher: 'API/ASME' },
        { title: 'Non-Destructive Examination: Ultrasonic Total Focusing Method Handbook', author: 'ASME Committee on NDE', standardOrPublisher: 'ASME Standards' }
      ]
    }
  ]
};
