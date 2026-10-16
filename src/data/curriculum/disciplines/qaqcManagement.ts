import { EngineeringDiscipline } from '../types';

export const qaqcManagementDiscipline: EngineeringDiscipline = {
  id: 'qa_qc',
  titleAr: 'إدارة وتوكيد وضبط الجودة الصناعية (QA/QC Management & Auditing)',
  titleEn: 'Industrial QA/QC Management, ITP Systems & Auditing (ISO 9001 / CQI-IRCA)',
  category: 'quality',
  badgeColor: 'indigo',
  overviewAr: 'المنظومة الإدارية والهندسية الحاكمة لجودة التصنيع والتركيب في كبرى المشروعات البترولية ومحطات الطاقة. تشمل إحصاءات الجودة وضبط العمليات (SPC)، خطط الفحص والاختبار (ITP)، تقارير عدم المطابقة (NCR)، تدقيقات شهادات المواد والموردين، واعتماد أختام الكود الأمريكي ASME (أختام U و S و PP) ومنظومة الآيزو ISO 9001.',
  overviewEn: 'The executive engineering framework governing manufacturing and erection compliance in energy mega-projects. Encompasses Statistical Process Control (SPC), Inspection & Test Plans (ITP), Non-Conformance Reports (NCR), vendor mill traceability, and ASME Code Stamp accreditation (U, S, PP stamps).',
  keyTechniques: [
    'Inspection & Test Plans (ITP - Hold, Witness, Review, Monitor)',
    'Non-Conformance Reports (NCR & Root Cause Analysis 5-Whys)',
    'Material Traceability & Mill Test Reports (EN 10204 Type 3.1 & 3.2)',
    'Statistical Process Control (SPC - Normal Distribution, Cp & Cpk)',
    'ASME Code Stamp Accreditation Auditing (U, S, PP Stamps & AIA)',
    'Lead Quality Auditing (ISO 9001:2015 & ISO 17025 Labs)'
  ],
  globalAccreditations: ['CQI-IRCA Lead Auditor (ISO 9001:2015)', 'ASQ Certified Quality Engineer (CQE)', 'ASME Authorized Inspector Agency Interface', 'ISO 17020 / ISO 17025'],
  targetIndustries: ['EPC Mega-Projects', 'Boiler & Pressure Vessel Fabrication', 'Cross-Country Pipelines', 'Petrochemical Complexes', 'Heavy Machinery & Turbine Manufacturing'],
  levels: [
    // -------------------------------------------------------------------------
    // LEVEL 1: ACADEMIC & UNIVERSITY FOUNDATIONS (المرحلة الأكاديمية والجامعية)
    // -------------------------------------------------------------------------
    {
      levelId: 'academic',
      tierCategory: 'academic',
      nameAr: 'المرحلة الأكاديمية والجامعية (University Quality Engineering & Statistical Process Control)',
      nameEn: 'Academic & University Quality Engineering Foundations',
      academicStageAr: 'المقررات الأكاديمية لطلاب كليات الهندسة الصناعية والميكانيكية في هندسة الجودة وضبط العمليات الإحصائي',
      academicStageEn: 'University Degree Coursework in Industrial Quality Engineering, Applied Statistics & Metrology',
      targetRoleAr: 'دراسة نظريات الجودة الشاملة (TQM)، التوزيع الطبيعي الغاوسي، خرائط شيوارت للتحكم، ومؤشرات قدرة العملية Cp و Cpk',
      targetRoleEn: 'Model Total Quality Management, Gaussian probability distributions, Shewhart control charts, and Cp/Cpk metrics',
      prerequisitesAr: 'دراسة جامعية في الاحتمالات والإحصاء الهندسي، بحوث العمليات، المترولوجيا وقياسات الأبعاد، ونظم الإدارة',
      prerequisitesEn: 'University coursework in Engineering Statistics, Operations Research, Dimensional Metrology, and Management Systems',
      trainingHours: 120,
      experienceMonths: 0,
      internationalCerts: ['B.Sc. Industrial / Mechanical Engineering', 'ASQ Student Member'],
      applicableCodes: ['ISO 9000 (Quality Fundamentals)', 'ISO 7870 (Control Charts)', 'ISO/IEC Guide 98-3 (GUM Uncertainty)'],
      responsibilitiesAr: [
        'اشتقاق وتطبيق منحنى التوزيع الطبيعي الغاوسي وحساب الانحراف المعياري (σ) ودرجات الثقة الإحصائية',
        'بناء وتحليل خرائط التحكم الإحصائي لـ شيوارت (Shewhart Control Charts: X-bar & R Charts) لاكتشاف التغيرات الشاذة',
        'حساب مؤشرات قدرة العملية (Process Capability: Cp and Cpk) ومقارنتها بمستويات سيجما الستة (Six Sigma DMAIC)',
        'دراسة نظريات المترولوجيا وحساب عدم اليقين في القياسات الهندسية (Measurement Uncertainty per ISO GUM)',
        'تطبيق أدوات الجودة السبع الأساسية: مخطط إيشيكاوا (سبب ونتيجة)، تحليل باريتو (قاعدة 80/20)، والمدرج التكراري'
      ],
      responsibilitiesEn: [
        'Derive Gaussian normal probability density functions computing sample standard deviation (σ) and confidence intervals',
        'Construct and analyze Shewhart statistical control charts (X-bar and R charts) distinguishing common from special causes',
        'Compute process capability indices (Cp and Cpk) determining defect rates and Sigma performance levels (Six Sigma)',
        'Model dimensional metrology uncertainty propagation in accordance with the Guide to the Expression of Uncertainty in Measurement (GUM)',
        'Deploy the 7 basic quality tools: Ishikawa fishbone cause-and-effect, Pareto 80/20 rule, histograms, and scatter plots'
      ],
      modules: [
        {
          id: 'mod_qa_acad_1',
          titleAr: 'الوحدة الأكاديمية 1: الإحصاء الهندسي وضبط العمليات الإحصائي (SPC)',
          titleEn: 'Academic Module 1: Applied Engineering Statistics & Statistical Process Control',
          duration: '45 ساعة محاضرات ونمذجة إحصائية',
          topicsAr: [
            'التوزيع الطبيعي الغاوسي (Gaussian Normal Distribution) ونظرية النهاية المركزية (Central Limit Theorem)',
            'حدود التحكم الإحصائية (Upper & Lower Control Limits: UCL & LCL عند ±3σ) مقابل حدود المواصفات الهندسية (USL & LSL)',
            'خرائط المتغيرات (Variable Charts: X-bar and R) وخرائط السمات والعيوب (Attribute Charts: p-chart, c-chart)',
            'مؤشرات كفاءة وقدرة العملية: حساب معامل قدرة العملية Cp ومعامل انحراف المركز Cpk (اشتراط Cpk ≥ 1.33 في التصنيع الحرج)',
            'منهجية سيجما الستة (Six Sigma DMAIC: Define, Measure, Analyze, Improve, Control) ومستوى 3.4 خطأ لكل مليون فرصة (DPMO)'
          ],
          topicsEn: [
            'Gaussian normal distribution mechanics and the Central Limit Theorem underpinning sampling inspection',
            'Statistical control limits (UCL & LCL at ±3σ) contrasted with contractual product specification limits (USL & LSL)',
            'Variables control charts (X-bar & R for continuous dimensions) and Attribute charts (p-chart for scrap fraction, c-chart for weld defect counts)',
            'Process capability metrics: Process Potential (Cp) and Centering Capability (Cpk), enforcing Cpk ≥ 1.33 for critical engineering',
            'Six Sigma DMAIC methodology: Quantifying defect reduction towards 3.4 Defects Per Million Opportunities (DPMO)'
          ],
          learningOutcomesAr: [
            'القدرة على كشف أي انحراف في جودة تصنيع اللحامات أو الأنابيب قبل خروج المنتج عن حدود المواصفات',
            'التحكم الرياضي الدقيق في تكاليف الجودة وخفض معدلات الهدر والعيوب'
          ],
          learningOutcomesEn: [
            'Detect process drifts in welding or machining lines proactively prior to producing out-of-specification scrap',
            'Mathematically optimize the Cost of Quality (CoQ) minimizing both appraisal and internal failure losses'
          ]
        },
        {
          id: 'mod_qa_acad_2',
          titleAr: 'الوحدة الأكاديمية 2: فلسفات الجودة الشاملة (TQM) وعلم المترولوجيا والقياس',
          titleEn: 'Academic Module 2: Total Quality Management Philosophies & Metrology Uncertainty',
          duration: '45 ساعة دراسات ونظريات إدارة',
          topicsAr: [
            'فلسفات رواد الجودة: مبادئ ديمنغ الأربعة عشر ودورة PDCA، ثلاثية جوران (تخطيط، ضبط، وتحسين الجودة)، ومفهوم كروسبي (الصفر في العيوب)',
            'علم المترولوجيا (Metrology): تتبع القياسات للوحدات الدولية (SI Traceability) ومعايرة أجهزة القياس',
            'حساب عدم اليقين في القياس (Measurement Uncertainty): عدم اليقين من النوع A (الإحصائي) والنوع B (المعياري) وفق ISO GUM',
            'دراسات تكرارية وتماثل أجهزة القياس (Gauge Repeatability and Reproducibility - GR&R Study)',
            'تحليل أنماط الانهيار وآثارها (Failure Mode and Effects Analysis - FMEA) وحساب رقم أولوية الخطر (RPN = S × O × D)'
          ],
          topicsEn: [
            'Foundational quality philosophies: Deming’s 14 principles and PDCA cycle, Juran’s Quality Trilogy, and Crosby’s Zero Defects',
            'Metrological science: Traceability chain to primary SI base units and periodic recalibration hierarchy',
            'Evaluation of measurement uncertainty per ISO GUM: Type A statistical variance vs Type B calibration certificate uncertainty',
            'Gauge Repeatability and Reproducibility (GR&R) analysis evaluating measurement system error against total process tolerance',
            'Failure Mode and Effects Analysis (FMEA): Quantifying Risk Priority Numbers (RPN = Severity × Occurrence × Detection)'
          ],
          learningOutcomesAr: [
            'فهم المنظومة المتكاملة التي تدير بها كبرى الشركات العالمية مثل تويوتا وجنرال إليكتريك جودة مصانعها',
            'التأكد من موثوقية كافة أدوات وأجهزة القياس والفحص المستخدمة في الموقع'
          ],
          learningOutcomesEn: [
            'Master the comprehensive quality frameworks deployed by world-class manufacturing enterprises (Toyota, GE)',
            'Verify measurement system reliability ensuring inspection gauges do not introduce false reject decisions'
          ]
        }
      ],
      keyFormulas: [
        {
          nameAr: 'حساب مؤشر قدرة العملية المئوي (Process Capability Index Cpk)',
          nameEn: 'Process Capability Index (Cpk)',
          formula: 'Cpk = Min [ (USL - μ) / (3 × σ) , (μ - LSL) / (3 × σ) ]',
          descriptionAr: 'حيث USL الحد الأقصى للمواصفة، LSL الحد الأدنى للمواصفة، μ متوسط العملية الحسابي، σ الانحراف المعياري. إذا كان Cpk < 1.0 فالعملية غير قادرة وتنتج عيوباً.',
          descriptionEn: 'Measures process capability and centering between specification limits; Cpk ≥ 1.33 is the gold standard for zero-defect production.'
        },
        {
          nameAr: 'حساب رقم أولوية الخطر في تحليل FMEA (Risk Priority Number)',
          nameEn: 'FMEA Risk Priority Number (RPN)',
          formula: 'RPN = Severity (S) × Occurrence (O) × Detection (D)',
          descriptionAr: 'حيث S درجة خطورة العيب (1-10)، O احتمالية حدوثه (1-10)، D صعوبة اكتشافه قبل الشحن (1-10). الدرجات الأعلى من 100 تتطلب إجراءً تصحيحياً فورياً.',
          descriptionEn: 'Prioritizes potential manufacturing failures to drive corrective action on high-risk engineering failure modes.'
        }
      ],
      practicalSkillsChecklist: [
        { skillAr: 'جمع 50 قراءة لسماكة طلاء وحساب المتوسط والانحراف المعياري ومؤشر Cpk والتأكد من مطابقتها للمواصفة', skillEn: 'Collect 50 coating thickness readings, compute mean, standard deviation, and Cpk verifying process capability', importance: 'mandatory' },
        { skillAr: 'بناء خريطة تحكم X-bar & R لقياس أقطار فوهات أوعية ضغط ورصد خروج قراءة خارج نطاق الـ 3 سيجما', skillEn: 'Construct X-bar and R control chart for nozzle bore machining tracking out-of-control statistical anomalies', importance: 'mandatory' },
        { skillAr: 'إعداد جدول FMEA كامل لعملية لحام خط أنابيب غاز طبيعي وتحديد الإجراءات الوقائية لخفض رقم RPN', skillEn: 'Compile complete FMEA analysis for gas pipeline welding line prescribing actions to slash high RPN risks', importance: 'mandatory' }
      ],
      referenceTextbooks: [
        { title: 'Juran’s Quality Handbook: The Complete Guide to Performance Excellence', author: 'Joseph M. Juran & A. Blanton Godfrey', standardOrPublisher: 'McGraw-Hill' },
        { title: 'Statistical Quality Control', author: 'Douglas C. Montgomery', standardOrPublisher: 'John Wiley & Sons' },
        { title: 'The Certified Quality Engineer Handbook', author: 'Connie M. Borror (ASQ)', standardOrPublisher: 'ASQ Quality Press' }
      ]
    },

    // -------------------------------------------------------------------------
    // LEVEL 2: CERTIFIED QA/QC FIELD INSPECTOR (المستوى الثاني المهني المعتمد)
    // -------------------------------------------------------------------------
    {
      levelId: 'level2',
      tierCategory: 'level2',
      nameAr: 'مفتش وضابط جودة تنفيذي معتمد بالموقع (Certified QA/QC Mechanical & Welding Inspector)',
      nameEn: 'Level II (Certified QA/QC Field Inspector & ITP Surveillance Officer)',
      academicStageAr: 'الشهادة المهنية التنفيذية لإدارة التفتيش ومطابقة المواصفات وخطط الفحص في مواقع المشروعات الكبرى',
      academicStageEn: 'Professional Field Credential in ITP Surveillance, Material Receiving & Hydrostatic Test Witnessing',
      targetRoleAr: 'تنفيذ ومراقبة خطة الفحص والاختبار (ITP)، تدقيق شهادات المعادن MTR 3.1، إصدار تقارير عدم المطابقة NCR، واختبارات الضغط',
      targetRoleEn: 'Execute ITP surveillance, audit EN 10204 3.1 mill certificates, issue and close NCRs, witness hydrotests per ASME',
      prerequisitesAr: 'شهادة في فحص اللحام (CSWIP / CWI) أو NDT Level 2 مع خبرة سنتين في إدارة جودة مواقع الإنشاءات والمصانع',
      prerequisitesEn: 'Certified CSWIP/CWI or NDT Level II with 2+ yrs documented QA/QC site surveillance and ITP execution experience',
      trainingHours: 80,
      experienceMonths: 24,
      internationalCerts: ['Certified QA/QC Mechanical Inspector', 'ASQ Certified Quality Inspector (CQI)', 'ISO 9001 Internal Auditor'],
      applicableCodes: ['ASME Section VIII Div 1 (UG-90 to UG-103)', 'ASME B31.3 Chapter VI', 'EN 10204 (Metallic Products)', 'ISO 10005 (Quality Plans)'],
      responsibilitiesAr: [
        'تنفيذ خطة الفحص والاختبار التفصيلية (ITP) والالتزام الصارم بنقاط التوقف (Hold Points) ونقاط المشاهدة (Witness)',
        'فحص استلام المواد الخام (Material Receiving Inspection - MRI) ومطابقة شهادات المطحنة (MTR Type 3.1 per EN 10204)',
        'التحقق من تتبع أرقام الصب (Heat Numbers & Plate Stamping) لضمان عدم تركيب مواد غير مطابقة أو مقلدة',
        'إصدار ومتابعة تقارير عدم المطابقة (Non-Conformance Reports - NCR) والتحقق من جودة الإصلاحات قبل الإغلاق',
        'حضور واعتماد اختبارات الضغط الهيدروستاتيكي (Hydrostatic Pressure Testing) طبقاً لـ ASME UG-99 (1.3 × MAWP)'
      ],
      responsibilitiesEn: [
        'Execute Inspection and Test Plan (ITP) protocols strictly enforcing Hold points, Witness gates, and surveillance reviews',
        'Conduct Material Receiving Inspection (MRI) auditing mill certificates (EN 10204 Type 3.1/3.2) against ASME Sec II specs',
        'Verify positive material identification (PMI) and physical heat number stamp transfers eliminating counterfeit material ingress',
        'Issue and govern Non-Conformance Reports (NCR) tracking corrective repairs and validating re-inspection clearance',
        'Witness and formally endorse hydrostatic pressure test charts according to ASME Section VIII Div 1 UG-99 (1.3 × MAWP)'
      ],
      modules: [
        {
          id: 'mod_qa_2_1',
          titleAr: 'الوحدة 1: تنفيذ خطط الفحص (ITP) وتدقيق شهادات المعادن EN 10204 والتتبع',
          titleEn: 'Module 1: ITP Execution, EN 10204 Mill Certificates & Heat Traceability',
          duration: '40 ساعة تدريب عملي ومستندات',
          topicsAr: [
            'هيكلة خطة الفحص والاختبار (ITP): نقاط التوقف الإلزامية (Hold Point)، نقاط المشاهدة (Witness)، ونقاط المراجعة المستندية (Review)',
            'شهادات المواد طبقاً لـ EN 10204: الفرق الجوهري بين شهادة Type 2.2 و Type 3.1 المستقلة و Type 3.2 المعتمدة من طرف ثالث',
            'تدقيق كيمياء شهادة المطحنة (MTR): نسبة الكربون، الكبريت، الفسفور، ومطابقتها لمواصفات ASME Section II Part A',
            'إجراءات نقل رقم الصب (Heat Number Transfer & Hard Stamping) عند تقطيع الألواح الفولاذية للأوعية',
            'فحص الفحص الإيجابي للسبائك (Positive Material Identification - PMI) بأجهزة XRF المحمولة لمنع خلط المعادن'
          ],
          topicsEn: [
            'Inspection & Test Plan (ITP) mechanics: Hold gates (mandatory sign-off), Witness points (notified presence), and Review gates',
            'EN 10204 inspection documents: Distinguishing Type 2.2 batch tests, Type 3.1 independent manufacturer, and Type 3.2 third-party validated certificates',
            'Mill Test Report (MTR) chemistry auditing: Carbon, sulfur, phosphorus limits and Charpy toughness verification per ASME Sec II',
            'Heat number hard-stamping transfer protocols during plate cutting and shell rolling ensuring 100% material traceability',
            'Positive Material Identification (PMI) deployment with handheld XRF analyzers preventing catastrophic alloy mix-ups'
          ],
          learningOutcomesAr: [
            'حماية المشروع من تسرب أي مواد غير مطابقة أو شهادات مزورة قد تؤدي لكوارث لاحقة',
            'إدارة مراحل التفتيش بسلاسة تامة دون تعطيل مسار الإنتاج أو مخالفة نصوص العقد'
          ],
          learningOutcomesEn: [
            'Shield industrial projects from counterfeit materials and defective steel heats that lead to catastrophic failures',
            'Direct site inspection milestones smoothly without fabrication delays while enforcing 100% contract compliance'
          ]
        },
        {
          id: 'mod_qa_2_2',
          titleAr: 'الوحدة 2: إدارة تقارير عدم المطابقة (NCR) واعتماد اختبارات الضغط الهيدروستاتيكي',
          titleEn: 'Module 2: NCR Governance, CAPA Root Cause & Hydrostatic Test Witnessing',
          duration: '40 ساعة تطبيقات ومحاكاة موقعية',
          topicsAr: [
            'إصدار تقرير عدم المطابقة (NCR): وصف العيب، المرجع التعاقدي المخالف، وعزل القطعة المعيبة فوراً (Hold Tagging)',
            'اقتراح واعتماد التصرف الهندسي (Disposition): إعادة العمل (Rework)، الإصلاح بموافقة العميل (Repair)، أو الرفض التام (Scrap)',
            'الإجراءات التصحيحية والوقائية (CAPA) وتطبيق منهجية لماذا الخمسة (5-Whys) لمنع تكرار العيب',
            'إجراءات اختبار الضغط الهيدروستاتيكي طبقاً لـ ASME UG-99: حساب ضغط الاختبار (1.3 × MAWP × S_test / S_design)',
            'شروط السلامة أثناء اختبار الضغط: درجة حرارة الماء (أعلى من حرارة التحول الهش بـ 17°م)، المعايرة المزدوجة لعدادات الضغط، وزمن النقع'
          ],
          topicsEn: [
            'Authoring Non-Conformance Reports (NCR): Defect characterization, contractual violation citation, and physical quarantine hold-tagging',
            'Engineering disposition evaluation: Rework to original code, engineered repair requiring client concession, or outright scrap',
            'Corrective and Preventive Actions (CAPA): Driving 5-Whys root cause analysis to eliminate recurring fabrication defects',
            'Hydrostatic test governance per ASME Section VIII Div 1 UG-99: Pressure calculation factoring temperature stress ratios',
            'Hydrotest safety physics: Water temperature limits (min 17°C above MDMT to prevent brittle rupture), dual calibrated gauges, and 30-min soak'
          ],
          learningOutcomesAr: [
            'التحكم الكامل في إغلاق حالات عدم المطابقة بجودة هندسية معتمدة من العميل والاستشاري',
            'الإشراف الآمن والمعتمد على أخطر مراحل تصنيع أوعية الضغط (اختبار الضغط الهيدروستاتيكي)'
          ],
          learningOutcomesEn: [
            'Resolve and close complex NCRs with approved CAPA dossiers satisfying third-party verification auditors',
            'Safely execute and officially endorse the most hazardous fabrication gate (high-pressure hydrostatic testing)'
          ]
        }
      ],
      keyFormulas: [
        {
          nameAr: 'حساب ضغط الاختبار الهيدروستاتيكي القياسي بكود ASME Sec VIII UG-99',
          nameEn: 'ASME Section VIII Div 1 UG-99 Hydrotest Pressure Formula',
          formula: 'P_hydro = 1.3 × MAWP × (S_test_temp / S_design_temp)',
          descriptionAr: 'حيث MAWP أقصى ضغط تشغيل مسموح، S_test إجهاد المعدن المسموح عند حرارة الاختبار، S_design إجهاد المعدن عند حرارة التشغيل. يضمن إثبات السلامة الإنشائية بنسبة 130%.',
          descriptionEn: 'Calculates mandatory test pressure: 1.3 times design pressure adjusted by allowable stress ratios at test vs design temperatures.'
        }
      ],
      practicalSkillsChecklist: [
        { skillAr: 'تدقيق ملف ITP كامل لتصنيع وعاء ضغط يتضمن 12 مرحلة وفحص نقاط التوقف الإلزامية Hold Points ومطابقتها', skillEn: 'Audit complete 12-stage pressure vessel fabrication ITP verifying mandatory Hold points against ASME VIII', importance: 'mandatory' },
        { skillAr: 'تحرير تقرير عدم مطابقة NCR لعيوب شروخ متكررة وتطبيق منهجية 5-Whys واعتماد خطة الإجراءات التصحيحية CAPA', skillEn: 'Author NCR for recurring weld cracks, perform 5-Whys root cause analysis, and approve CAPA disposition', importance: 'mandatory' },
        { skillAr: 'حساب ضغط الاختبار الهيدروستاتيكي لوعاء ضغط MAWP له 30 بار عند 350°م ومطابقة حرارة ماء الاختبار لـ MDMT', skillEn: 'Calculate UG-99 hydrotest pressure for 30 bar vessel operating at 350°C and verify test water temperature', importance: 'mandatory' }
      ],
      referenceTextbooks: [
        { title: 'ASME Boiler and Pressure Vessel Code: Section VIII Division 1 (Rules for Construction of Pressure Vessels)', author: 'ASME International', standardOrPublisher: 'ASME Standards' },
        { title: 'BS EN 10204: Metallic products — Types of inspection documents', author: 'BSI / CEN Standards', standardOrPublisher: 'CEN' },
        { title: 'Quality Management Systems for the Petroleum and Natural Gas Industry (ISO 29001)', author: 'ISO / API', standardOrPublisher: 'ISO' }
      ]
    },

    // -------------------------------------------------------------------------
    // LEVEL 3: QA/QC QUALITY DIRECTOR & IRCA LEAD AUDITOR (المستوى الثالث)
    // -------------------------------------------------------------------------
    {
      levelId: 'level3',
      tierCategory: 'level3',
      nameAr: 'مدير جودة ومراجع دولي رئيسي معتمد (QA/QC Quality Director & IRCA Lead Auditor)',
      nameEn: 'Level III (QA/QC Quality Director & Certified IRCA Lead Auditor)',
      academicStageAr: 'القمة التنفيذية والاستشارية في إدارة منظومات الجودة المؤسسية، تدقيق الموردين، واعتماد أختام كود ASME',
      academicStageEn: 'Peak Executive & Consulting Authority in Enterprise QMS Architecture, Global Vendor Surveillance & ASME Stamps',
      targetRoleAr: 'تأسيس نظم إدارة الجودة ISO 9001/17025، قيادة تدقيقات أختام ASME (U & S Stamps)، والتحكيم في منازعات الجودة الكبرى',
      targetRoleEn: 'Architect corporate QMS per ISO 9001/17025, lead ASME Code Stamp accreditation audits (U/S Stamps), arbitrate quality disputes',
      prerequisitesAr: 'بكالوريوس هندسة مع خبرة لا تقل عن 7 سنوات في قيادة جودة المشروعات البترولية الكبرى وشهادة كبير مراجعين IRCA معتمدة',
      prerequisitesEn: 'B.Sc. Engineering with 7+ yrs EPC quality leadership, certified CQI-IRCA Lead Auditor credentials and ASME accreditation experience',
      trainingHours: 120,
      experienceMonths: 84,
      internationalCerts: ['CQI-IRCA ISO 9001:2015 Lead Auditor', 'ASQ Certified Manager of Quality / Organizational Excellence (CMQ/OE)', 'ASME Accreditation Team Lead'],
      applicableCodes: ['ISO 9001:2015', 'ISO/IEC 17025 (Testing Labs)', 'ASME Section VIII Div 1 & Div 2', 'ISO 19011 (Auditing Guidelines)'],
      responsibilitiesAr: [
        'تصميم وتأسيس دليل الجودة المؤسسي (Corporate Quality Manual) والإجراءات الشاملة طبقاً لـ ISO 9001:2015',
        'قيادة وتأهيل المصانع للحصول على أختام الكود الأمريكي ASME (ختم U لأوعية الضغط، وختم S للمراجل، وختم R للإصلاحات NBIC)',
        'التعامل المباشر مع مكاتب التفتيش المصرحة (Authorized Inspection Agencies - AIA) والمفتش المعتمد (Authorized Inspector - AI)',
        'قيادة التدقيقات الفنية من الطرف الثاني (Second-Party Vendor Audits) على مصانع الصلب والمسبوكات والموردين عالمياً',
        'تمثيل الشركة أمام كبرى اللجان التحكيمية العالمية وقيادة استراتيجية التميز المؤسسي والصفر في العيوب'
      ],
      responsibilitiesEn: [
        'Architect and implement enterprise Quality Management Systems (QMS) compliant with ISO 9001:2015 and ISO/IEC 17025',
        'Lead heavy fabrication facilities through official ASME Code Stamp surveys (U Stamp for vessels, S for boilers, R for NBIC repairs)',
        'Manage contractual and regulatory interfaces with Authorized Inspection Agencies (AIA) and commissioned Authorized Inspectors (AI)',
        'Direct second-party vendor quality surveillance audits across global steel rolling mills, forging houses, and valve manufacturers',
        'Serve as supreme corporate authority in contract arbitration and drive organizational Zero-Defect operational excellence'
      ],
      modules: [
        {
          id: 'mod_qa_3_1',
          titleAr: 'الوحدة 1: تأهيل المصانع لأختام الكود الأمريكي ASME (U & S Stamps & AIA Interface)',
          titleEn: 'Module 1: ASME Code Stamp Accreditation & Authorized Inspector (AI) Governance',
          duration: '60 ساعة استشارية واعتماد أكواد',
          topicsAr: [
            'متطلبات الكود الأمريكي لاعتماد أختام ASME: دليل ضبط الجودة (Quality Control Manual per ASME Sec VIII App 10)',
            'دور ومسؤوليات وكالة التفتيش المعتمدة (Authorized Inspection Agency - AIA) والمفتش المعتمد التابع لها (AI per ASME QAI-1)',
            'إجراءات تجديد الأختام كل 3 سنوات: تصميم وتصنيع وعاء تجريبي (Demonstration Vessel) وتدقيق فريق ASME المشترك',
            'نظام إصلاحات البويلرات وأوعية الضغط وفق كود المجلس الوطني (National Board Inspection Code - NBIC Part 3 / R-Stamp)',
            'نظام إدارة وتوثيق أجهزة الفحص والمعايرة للمختبرات المعتمدة طبقاً لمواصفة ISO/IEC 17025'
          ],
          topicsEn: [
            'ASME Code Stamp accreditation rules: Authoring mandatory Quality Control Manual satisfying ASME Section VIII Appendix 10',
            'Roles and legal liabilities of the Authorized Inspection Agency (AIA) and National Board commissioned Authorized Inspector (AI)',
            'Triennial ASME joint review audit preparation: Engineering design and complete fabrication of code Demonstration Vessel',
            'In-service repair and alteration governance per National Board Inspection Code (NBIC Part 3 / R-Stamp certification)',
            'Laboratory competence management: Establishing testing and calibration quality systems complying with ISO/IEC 17025'
          ],
          learningOutcomesAr: [
            'قيادة أي منشأة صناعية للحصول على أرفع شهادات التصنيع العالمية المعتمدة من ASME والمجلس الوطني الأمريكي',
            'بناء شراكة قانونية وفنية محكمة مع المفتش المعتمد دون أي ملاحظات تدقيقية'
          ],
          learningOutcomesEn: [
            'Authoritatively guide heavy manufacturing facilities to achieve prestigious ASME and National Board Stamp credentials',
            'Establish seamless technical compliance relationships with commissioned Authorized Inspectors (AI)'
          ]
        },
        {
          id: 'mod_qa_3_2',
          titleAr: 'الوحدة 2: التدقيق المتقدم على الموردين (Vendor Audits) وإدارة المخاطر ISO 31000',
          titleEn: 'Module 2: Global Vendor Audits, CQI-IRCA Principles & ISO 31000 Risk Governance',
          duration: '60 ساعة تدقيق عملي وتحكيم',
          topicsAr: [
            'مبادئ التدقيق الدولي طبقاً لـ ISO 19011: تخطيط التدقيق، جمع الأدلة الموضوعية (Objective Evidence)، وصياغة الملاحظات',
            'التدقيق على كبرى مصانع الصلب والمسبوكات والمطروقات (Forging Shops) والتحقق من أفران الصهر وتفريغ الغازات بالخلخلة (VAD)',
            'إدارة مخاطر الجودة طبقاً لـ ISO 31000: تحديد وتقييم المخاطر الفنية والتشغيلية ووضع خطط التخفيف الاستباقية',
            'إدارة وتجميع سجلات بيانات المصنع النهائي (Manufacturer Data Report - MDR / Form U-1A) وتسليم المشروع',
            'التحكيم الفني والقانوني في منازعات جودة المواد ورفض الشحنات البحرية ذات العيوب الخفية'
          ],
          topicsEn: [
            'International auditing framework per ISO 19011: Audit planning, sampling methodologies, and corroborating objective evidence',
            'Second-party technical surveillance audits of global steel mills: Verifying vacuum degassing, electroslag remelting, and heat treating',
            'Enterprise quality risk management per ISO 31000: Risk identification, failure consequence assessment, and mitigation controls',
            'Final handover dossier architecture: Manufacturer Data Reports (MDR per ASME Form U-1A) and mechanical completion dossiers',
            'Serving as supreme technical expert and arbitrator in multimillion-dollar maritime shipment defect litigations'
          ],
          learningOutcomesAr: [
            'القيادة الاستراتيجية لمنظومات الجودة لأكبر التحالفات والشركات متعددة الجنسيات',
            'حماية استثمارات الشركة بملايين الدولارات عبر الرقابة الاستباقية الصارمة على سلاسل التوريد العالمية'
          ],
          learningOutcomesEn: [
            'Provide strategic quality leadership across major multinational engineering conglomerates and EPC joint ventures',
            'Safeguard corporate multi-million dollar investments through proactive quality surveillance of global supply chains'
          ]
        }
      ],
      keyFormulas: [
        {
          nameAr: 'حساب تكلفة الجودة الرديئة (Cost of Poor Quality - COPQ)',
          nameEn: 'Cost of Poor Quality Formulation (COPQ)',
          formula: 'COPQ = Internal Failure Costs + External Failure Costs + Appraisal Costs + Prevention Costs',
          descriptionAr: 'المقياس الإداري والمالي الحاكم لقياس نجاح منظومة الجودة: إثبات أن الاستثمار في الوقاية (Prevention) يقلل تكاليف الفشل الكارثي بعشرات الأضعاف.',
          descriptionEn: 'The executive financial model demonstrating that front-loaded prevention investment yields massive reductions in catastrophic failure costs.'
        }
      ],
      practicalSkillsChecklist: [
        { skillAr: 'صياغة دليل ضبط جودة كامل (Quality Control Manual) لمصنع أوعية ضغط لنيل ختم ASME U-Stamp طبقاً لـ App 10', skillEn: 'Author complete Quality Control Manual for pressure vessel manufacturer securing ASME U-Stamp per Appendix 10', importance: 'mandatory' },
        { skillAr: 'قيادة محاكاة تدقيق مشترك مع Authorized Inspector (AI) على وعاء تجريبي واعتماد نموذج Form U-1A', skillEn: 'Lead mock joint review audit with Authorized Inspector (AI) on demonstration vessel and endorse Form U-1A', importance: 'mandatory' },
        { skillAr: 'إجراء تدقيق من الطرف الثاني (Vendor Audit) على مصنع تصنيع صمامات بوابية والتحقق من شهادات المعادن والسبك', skillEn: 'Execute second-party vendor surveillance audit on gate valve manufacturing plant auditing casting MTRs', importance: 'mandatory' }
      ],
      referenceTextbooks: [
        { title: 'ISO 9001:2015: Quality management systems — Requirements', author: 'International Organization for Standardization', standardOrPublisher: 'ISO' },
        { title: 'ISO 19011: Guidelines for auditing management systems', author: 'International Organization for Standardization', standardOrPublisher: 'ISO' },
        { title: 'ASME Section VIII Division 1: Appendix 10 (Quality Control System)', author: 'ASME International', standardOrPublisher: 'ASME Standards' }
      ]
    }
  ]
};
