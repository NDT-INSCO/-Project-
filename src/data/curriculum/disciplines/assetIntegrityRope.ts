import { EngineeringDiscipline } from '../types';

export const assetIntegrityRopeDiscipline: EngineeringDiscipline = {
  id: 'asset_integrity_rope',
  titleAr: 'سلامة الأصول والفحص بالوصول بالحبال (Asset Integrity & IRATA Rope Access)',
  titleEn: 'Asset Integrity Management & Industrial Rope Access (IRATA / ISO 22846)',
  category: 'asset_integrity',
  badgeColor: 'emerald',
  overviewAr: 'تنفيذ كافة تقنيات الفحص الهندسي المتقدم وغير الإتلافي والمعالجة الحرارية على ارتفاعات شاهقة وفي الأماكن المحصورة والصعبة والمنصات البحرية دون الحاجة لسقالات باهظة التكلفة. يجمع بين الفيزياء الرياضية لتوزيع القوى على نقاط التثبيت، والمهارات الميدانية للمستوى الثاني، والقيادة الاستشارية لسلامة الأصول وفق منظومة IRATA الدولية.',
  overviewEn: 'Deploying advanced NDT and inspection methodologies at extreme heights, offshore flare stacks, and confined spaces using internationally accredited IRATA rope access systems. Combines vector statics, suspended Level 2 non-destructive testing, and Level 3 safety supervision per ISO 22846.',
  keyTechniques: [
    'IRATA Level 1/2/3 Rigging & Complex Mechanical Advantage',
    'Offshore Flare Tip Ultrasonic & Video Inspection',
    'Suspended Magnetic Particle & Eddy Current Testing',
    'Confined Space Pressure Vessel Internal Rope Surveys',
    'High-Angle Rigging-For-Rescue & Emergency Suspension Protocols',
    'Enterprise Asset Integrity Data Integration (AIMS & SAP PM)'
  ],
  globalAccreditations: ['IRATA International Level 1, 2, 3', 'ISO 22846-1 & ISO 22846-2', 'SPRAT (Society of Professional Rope Access Technicians)', 'OSHA 1910 / 1926'],
  targetIndustries: ['Offshore Drilling & Production Platforms', 'LNG Flare Stacks & Chimney Towers', 'Wind Energy Turbines', 'Suspension & Cable-Stayed Bridges', 'Spherical Gas Storage Vessels'],
  levels: [
    // -------------------------------------------------------------------------
    // LEVEL 1: ACADEMIC & UNIVERSITY FOUNDATIONS (المرحلة الأكاديمية والجامعية)
    // -------------------------------------------------------------------------
    {
      levelId: 'academic',
      tierCategory: 'academic',
      nameAr: 'المرحلة الأكاديمية والجامعية (University Statics, Vector Mechanics & Biomechanics)',
      nameEn: 'Academic & University Rigging Statics & Biomechanics Foundations',
      academicStageAr: 'المقررات الأكاديمية لطلاب كليات الهندسة والعلوم في ميكانيكا الجوامد الاستاتيكية وعلم المواد الليفية والفيزيولوجيا الحيوية',
      academicStageEn: 'University Degree Coursework in Vector Statics, Synthetic Fiber Physics & Suspension Biomechanics',
      targetRoleAr: 'دراسة وتحليل متجهات القوى على نقاط التثبيت، مضاعفة القوة الميكانيكية بالبكرات، وفيزيولوجيا صدمة التعليق الحركية',
      targetRoleEn: 'Model vector resolution on anchor systems, mechanical advantage pulley kinematics, and suspension trauma physiology',
      prerequisitesAr: 'دراسة جامعية في ميكانيكا الاستاتيكا (Engineering Statics)، فيزياء المتجهات، ميكانيكا المواد، والفيزيولوجيا الطبية',
      prerequisitesEn: 'University coursework in Engineering Statics, Vector Physics, Mechanics of Fibers, and Occupational Physiology',
      trainingHours: 120,
      experienceMonths: 0,
      internationalCerts: ['B.Sc. Mechanical / Civil / Safety Engineering', 'IRATA Technical Student Affiliate'],
      applicableCodes: ['ISO 22846-1 (Principles of Rope Access)', 'EN 1891 (Kernmantle Ropes)', 'EN 12841 (Rope Adjustment Devices)'],
      responsibilitiesAr: [
        'اشتقاق وتطبيق معادلات توازن المتجهات للقوى المؤثرة على نقاط التثبيت (Vector Force Resolution)',
        'حساب القوى المضاعفة على نقاط التثبيت عند تغير زاوية التثبيت على شكل حرف Y (Y-Hang Angle Physics)',
        'اشتقاق نسب مضاعفة القوة الحركية للبكرات (Mechanical Advantage: 2:1, 3:1 Z-Rig, 5:1 Complex Hauling)',
        'دراسة فيزيولوجيا صدمة التعليق في الأحزمة (Suspension Trauma / Orthostatic Intolerance) وميكانيزم تجمع الدم في الأطراف',
        'فهم فيزياء وخواص ألياف البولي أميد (Nylon Polyamide) في حبال Kernmantle ومعاملات الأمان (Safety Factor ≥ 10:1)'
      ],
      responsibilitiesEn: [
        'Derive vector equilibrium equations resolving static and dynamic force components acting on structural anchor points',
        'Model the trigonometric force multiplication on anchor pairs as a function of Y-hang inclusion angle (0° to 150°)',
        'Derive kinematic mechanical advantage ratios for simple and compound pulley hauling systems (2:1, 3:1 Z-rig, 5:1 complex)',
        'Analyze the pathophysiology of harness hang syndrome (suspension trauma / orthostatic shock) and venous pooling',
        'Investigate the polymer physics and energy dissipation of low-stretch Kernmantle polyamide ropes (EN 1891 Type A)'
      ],
      modules: [
        {
          id: 'mod_rope_acad_1',
          titleAr: 'الوحدة الأكاديمية 1: استاتيكا المتجهات وقوى نقاط التثبيت وزوايا Y-Hang',
          titleEn: 'Academic Module 1: Vector Statics, Anchor Force Resolution & Y-Hang Trigonometry',
          duration: '45 ساعة محاضرات وحسابات ميكانيكية',
          topicsAr: [
            'تحليل متجهات القوى في الفضاء ثلاثي الأبعاد وحساب محصلة القوى على نقاط التثبيت الرئيسية والاحتياطية',
            'فيزياء زوايا التثبيت (Y-Hang Angles): لماذا يتحمل كل طرف 50% من الحمل عند زاوية صفر، و 71% عند زاوية 90°، و 100% عند زاوية 120°، وتتضاعف إلى 193% عند زاوية 150°',
            'معادلات الاحتكاك عند الحواف الحادة ونصف قطر انحناء الحبال وفقدان قوة الشد (Bending Radius Reduction)',
            'أنظمة مضاعفة القوة الميكانيكية (Mechanical Advantage): البكرة البسيطة، نظام Z-Rig بنسبة 3:1، ونظام البكرات المركبة بنسبة 5:1',
            'معامل السقوط الديناميكي (Fall Factor = Fall Distance / Rope Length) وقوى الصدمة المنقولة لجسم الإنسان (Impact Force < 6 kN)'
          ],
          topicsEn: [
            'Three-dimensional vector force resolution: Calculating resultant static and dynamic loads acting on twin anchor nodes',
            'Trigonometric physics of Y-hang angles: Why each anchor bears 50% load at 0°, 71% at 90°, 100% at 120°, and spikes to 193% at 150°',
            'Edge friction physics, bend radius ratios (D/d rule), and tensile strength degradation across sharp steel coamings',
            'Mechanical advantage kinematic formulations: Simple 2:1 drop loops, 3:1 Z-rig hauling, and 5:1 compound block-and-tackle',
            'Dynamic fall factor mechanics (FF = Fall Distance / Active Rope Length) and peak arrest force thresholds (< 6 kN to body)'
          ],
          learningOutcomesAr: [
            'القدرة على حساب القوى الدقيقة المؤثرة على أي هيكل تثبيت وتجنب الزوايا الحرجة الخطرة (أكبر من 120°)',
            'تصميم أنظمة رفع وسحب ميكانيكية تقلل الجهد البشري بمقدار 5 أضعاف'
          ],
          learningOutcomesEn: [
            'Mathematically compute exact resultant stresses on structural anchors, strictly eliminating dangerous angles (> 120°)',
            'Design high-efficiency mechanical hauling systems slashing human pulling effort by 500%'
          ]
        },
        {
          id: 'mod_rope_acad_2',
          titleAr: 'الوحدة الأكاديمية 2: علم المواد الليفية وبيولوجيا صدمة التعليق (Suspension Trauma)',
          titleEn: 'Academic Module 2: Synthetic Fiber Materials Science & Suspension Trauma Biomechanics',
          duration: '45 ساعة أبحاث فيزيولوجية ومواد',
          topicsAr: [
            'هندسة حبال الكيرنمانتل (Kernmantle Construction): اللب الداخلي الحامل للأحمال (Core) والغلاف الخارجي الواقي (Sheath)',
            'ألياف البولي أميد 6 و 6.6: قوى الشد القصوى (MBS ≥ 22 kN)، مقاومة الاحتكاك، والتأثر بالأشعة فوق البنفسجية والأحماض',
            'فيزيولوجيا صدمة التعليق (Suspension Trauma / Orthostatic Intolerance): انعدام حركة عضلات الساقين وانحباس الدم الوريدي',
            'انخفاض العائد القلبي، نقص الأكسجين الدماغي، وفقدان الوعي خلال 5 إلى 15 دقيقة، ومخاطر متلازمة إعادة التروية (Reflow Syndrome)',
            'تصميم أحزمة الأمان لكامل الجسم (Full Body Harnesses per EN 361) وتوزيع الضغط على مناطق الفخذين والحوض'
          ],
          topicsEn: [
            'Kernmantle rope architecture: Continuous twisted polyamide load-bearing core (Kern) shielded by tightly braided protective sheath (Mantel)',
            'Polymer mechanics of Nylon 6/6.6: Minimum Breaking Strength (MBS ≥ 22 kN), abrasion resistance, and chemical/UV degradation',
            'Pathophysiology of Suspension Trauma (Orthostatic Shock): Absence of skeletal muscle pump leading to critical lower-limb venous pooling',
            'Pre-syncope progression: Reduced cardiac preload, cerebral hypoxia, loss of consciousness within 5-15 min, and post-rescue death syndrome',
            'Ergonomic biomechanics of full-body fall arrest and work positioning harnesses (EN 361 / EN 813) optimizing pelvic load distribution'
          ],
          learningOutcomesAr: [
            'فهم الأسباب الطبية والفيزيولوجية القاتلة لصدمة التعليق والتدخل الطبي الاستباقي لإنقاذ الحياة',
            'اختيار الحبال والمعدات بناءً على الفهم العلمي للمتانة والتدهور البيئي'
          ],
          learningOutcomesEn: [
            'Master the lethal medical and physiological mechanisms of suspension trauma to execute life-saving interventions',
            'Select ropes, harnesses, and hardware grounded in rigorous polymer degradation science'
          ]
        }
      ],
      keyFormulas: [
        {
          nameAr: 'حساب الحمل على كل نقطة تثبيت في نظام Y-Hang',
          nameEn: 'Y-Hang Anchor Load Equation',
          formula: 'Load_per_anchor = (Total_Load / 2) / cos(θ / 2)',
          descriptionAr: 'حيث θ هي زاوية الانفراج الكلية بين نقطتي التثبيت. عند زاوية 120° يصبح الحمل على كل نقطة مساوياً لـ 100% من الحمل الكلي، وفوق 120° يتضاعف الحمل بشكل خطر.',
          descriptionEn: 'Computes force on each anchor as inclusion angle (θ) widens; at 120° each anchor carries 100% of load, spiking dangerously beyond.'
        },
        {
          nameAr: 'معامل السقوط الديناميكي للحبل (Fall Factor)',
          nameEn: 'Dynamic Fall Factor (FF)',
          formula: 'Fall Factor (FF) = Fall Distance (h) / Length of Rope in Service (L)',
          descriptionAr: 'يحدد شدة الصدمة الميكانيكية. في الوصول بالحبال الصناعية يجب ألا يتجاوز معامل السقوط قيمة 1.0 مطلقاً لتفادي قوى صدمة تكسر العظام.',
          descriptionEn: 'Quantifies impact severity; in industrial rope access, FF must strictly remain below 1.0 to keep arrest forces below 6 kN.'
        }
      ],
      practicalSkillsChecklist: [
        { skillAr: 'حساب محصلة القوى على نقطتي تثبيت بزاوية 90° تحملان وزناً قدره 120 كجم والتحقق من معامل الأمان (≥ 10:1)', skillEn: 'Calculate resultant force on 90° twin anchor rigging bearing 120 kg mass verifying 10:1 safety margin', importance: 'mandatory' },
        { skillAr: 'تركيب نظام سحب بكرات Z-Rig بنسبة 3:1 وقياس القوة المطلوبة لرفع حمل قدره 100 كجم باستخدام ميزان دينامومتر', skillEn: 'Rig 3:1 Z-hauling system measuring pulling effort required to hoist 100 kg load using load-cell dynamometer', importance: 'mandatory' },
        { skillAr: 'فحص ميكروسكوبي لغلاف حبل كيرنمانتل تعرض لاحتكاك حافة حادة وتحديد نسبة الألياف المقطوعة المسموحة للتقاعد', skillEn: 'Inspect sheath of abraded Kernmantle rope identifying cut yarns and enforcing mandatory retirement criteria', importance: 'mandatory' }
      ],
      referenceTextbooks: [
        { title: 'IRATA International Code of Practice for Industrial Rope Access (ICOP)', author: 'IRATA International Committee', standardOrPublisher: 'IRATA' },
        { title: 'Engineering Mechanics: Statics (SI Edition)', author: 'R. C. Hibbeler', standardOrPublisher: 'Pearson' },
        { title: 'Suspension Trauma: A Review of the Medical Literature', author: 'Health and Safety Executive (HSE UK)', standardOrPublisher: 'HSE Books' }
      ]
    },

    // -------------------------------------------------------------------------
    // LEVEL 2: CERTIFIED IRATA LEAD RIGGER & SUSPENDED NDT SPECIALIST (المستوى الثاني)
    // -------------------------------------------------------------------------
    {
      levelId: 'level2',
      tierCategory: 'level2',
      nameAr: 'مفتش معلق وقائد تثبيت بحبال معتمد (IRATA Level 2 Lead Rigger & Suspended Inspector)',
      nameEn: 'Level II (IRATA Level 2 Lead Rigger & Suspended NDT Specialist)',
      academicStageAr: 'الشهادة المهنية المعتمدة للقيام بمهام التثبيت المعقد والإنقاذ على ارتفاعات وتنفيذ الفحص المعلق',
      academicStageEn: 'Professional Qualification in Advanced Rigging, High-Angle Rescues & Suspended NDT Deployment',
      targetRoleAr: 'تصميم أنظمة التثبيت المزدوجة، خطط الإنقاذ المسبق (Rig-for-Rescue)، وتنفيذ فحوصات UT/MT/VT على الارتفاعات',
      targetRoleEn: 'Rig complex multi-anchor systems, set up rig-for-rescue, execute suspended ultrasonic/magnetic inspection',
      prerequisitesAr: 'شهادة IRATA Level 1 مع 1000 ساعة مسجلة في دفتر المهام (Logbook) وتدريب مكثف واجتياز تقييم الممتحن المستقل',
      prerequisitesEn: 'Valid IRATA Level 1 with minimum 1000 logged rope hours and passing external independent assessor evaluation',
      trainingHours: 80,
      experienceMonths: 24,
      internationalCerts: ['IRATA Level 2 Technician / Lead Rigger', 'SPRAT Level II', 'First Aid at Height'],
      applicableCodes: ['IRATA ICOP', 'ISO 22846-2', 'BS 7985 (Code of practice for the use of rope access methods)'],
      responsibilitiesAr: [
        'تركيب أنظمة التثبيت بنظام الإنقاذ المسبق (Rig-for-Rescue) لتسهيل إنزال أي فاحص مصاب دون الحاجة للصعود إليه',
        'تثبيت خطوط الانحراف (Deviations) وخطوط التتبع المشدودة (Tensioned Tracking Lines) لتجاوز العوائق الهندسية',
        'تنفيذ عمليات الفحص غير الإتلافي المتقدمة (UT Thickness Gauging, Flaw Detection, MT Yoke) أثناء التعليق الكامل بالهواء',
        'حماية الحبال من الحواف الحادة باستخدام بكرات التمرير ومدافع الرول وحوافظ الخراطيم المقاومة للاحتكاك',
        'تنفيذ مناورات الإنقاذ المعقدة: إنقاذ فاحص فاقد للوعي من على الصاعدات، والإنقاذ بالحبال المتقاطعة، وإنزال المصاب للأرض'
      ],
      responsibilitiesEn: [
        'Rig primary working lines and backup systems deploying pre-rigged rescue lowerable systems for rapid emergency evacuation',
        'Install rope deviations, re-anchors, and tensioned high-line tracking ropes navigating complex industrial steelwork',
        'Perform multi-method NDT (ultrasonic thickness scanning, flaw detection, and magnetic yoke testing) fully suspended',
        'Deploy heavy-duty edge rollers, canvas sleeves, and multi-directional rope protectors safeguarding life-support lines',
        'Execute complex high-angle rescue scenarios: Rescuing incapacitated technician from ascenders, aid-climbing, and hauling'
      ],
      modules: [
        {
          id: 'mod_rope_2_1',
          titleAr: 'الوحدة 1: أنظمة التثبيت المعقدة والإنقاذ المسبق (Rig-for-Rescue)',
          titleEn: 'Module 1: Advanced Rigging Systems, Re-Anchors & Rig-for-Rescue',
          duration: '40 ساعة تدريب عملي شاق على الهياكل',
          topicsAr: [
            'أنظمة الإنقاذ المسبق (Rig-for-Rescue): استخدام أجهزة الهبوط القابلة للفك (ID / Rig Descenders) كنقاط تثبيت جاهزة للإنزال الفوري',
            'التثبيت بإعادة التثبيت (Re-belays / Intermediate Anchors): تقليل مسافة السقوط الحر وإلغاء احتكاك الحبال',
            'خطوط الانحراف الفردية والمزدوجة (Single & Double Deviations) لتغيير مسار الحبل حول الأنابيب الساخنة',
            'خطوط التتبع الأفقية المشدودة (Tensioned Lines): حساب الشد الأفقي الإضافي على نقاط التثبيت (Catenary Forces)',
            'حماية الحواف (Edge Protection): ألواح الحماية المعدنية، أسطوانات البكرات (Edge Rollers)، وحوافظ الأراميد المقاومة للقطع'
          ],
          topicsEn: [
            'Rig-for-rescue protocols: Employing lockable descenders (Petzl I’D / Rig) at anchor nodes enabling immediate top-lowering',
            'Re-anchor and re-belay engineering: Eliminating rope abrasion and controlling dynamic swing falls (pendulum effect)',
            'Directional deviations (single and double lines) steering technicians clear of high-temperature refinery steam lines',
            'Tensioned tracking lines: Modeling horizontal catenary tension forces and dynamic sag ratios across structural spans',
            'Comprehensive edge protection strategies: Heavy-duty metal edge rollers, articulating angle guards, and aramid sleeves'
          ],
          learningOutcomesAr: [
            'تثبيت خطوط صعود وهبوط آمنة بنسبة 100% للوصول لأي نقطة مستحيلة على ارتفاعات المنصات والشعلات',
            'جاهزية فورية لإنقاذ أي زميل في زمن لا يتجاوز 3 دقائق دون تعريض فريق العمل للخطر'
          ],
          learningOutcomesEn: [
            'Rig flawless twin-rope access paths reaching inaccessible targets on offshore flare booms and drill derricks',
            'Maintain immediate operational readiness to extract an injured technician within 3 minutes'
          ]
        },
        {
          id: 'mod_rope_2_2',
          titleAr: 'الوحدة 2: تقنيات الفحص غير الإتلافي المعلق ومناورات الإنقاذ المركبة',
          titleEn: 'Module 2: Suspended NDT Deployment & High-Angle Rescue Maneuvers',
          duration: '40 ساعة تفتيش معلق وإنقاذ حي',
          topicsAr: [
            'تشغيل أجهزة الفحص بالموجات فوق الصوتية المحمولة والمثبتة على الحزام (Chest Harness-Mounted Flaw Detectors)',
            'فحص سماكة جدران شعلات الغاز (Flare Tips) على ارتفاع 120 متراً في ظروف الرياح والحرارة المرتفعة',
            'إجراء فحص الجسيمات المغناطيسية لحوافر AC Yoke على وصلات الأرجل الأنبوبية للمنصات البحرية (Offshore Jacket Nodes)',
            'مناورات الإنقاذ المعقدة: الإنقاذ بالتسلق الاصطناعي (Aid Climbing Rescue) وإنقاذ المصاب العالق على حبال متقاطعة',
            'تمرير العقد (Passing Knots during Rescue) والإنزال التبادلي للمصاب في الأماكن المحصورة والضيقة'
          ],
          topicsEn: [
            'Operating lightweight ultrasonic thickness meters and flaw detectors securely tethered to chest harnesses',
            'Executing high-temperature ultrasonic thickness surveys on offshore flare tips at 120m elevations under wind loads',
            'Deploying AC electromagnetic yokes on offshore tubular jacket nodes and offshore wind turbine foundation welds',
            'Complex rescue execution: Rescuing stranded technician from aid-climbing traverses and horizontal high-lines',
            'Advanced knot-passing maneuvers during tandem rescue lower and narrow confined space extraction'
          ],
          learningOutcomesAr: [
            'تنفيذ أعمال الفحص غير الإتلافي المعقدة بأعلى جودة مع الالتزام التام بسلامة المعدات من السقوط (Drop Tool Prevention)',
            'القدرة على إنقاذ أي إنسان عالق على الحبال في أصعب الظروف المناخية والصناعية'
          ],
          learningOutcomesEn: [
            'Execute advanced NDT inspections while suspended with zero tool-drop incidents (100% tethered tools)',
            'Deliver decisive, master-level high-angle emergency rescues under extreme industrial offshore conditions'
          ]
        }
      ],
      keyFormulas: [
        {
          nameAr: 'حساب الشد الأفقي في خطوط التتبع المشدودة (Tensioned High-Line)',
          nameEn: 'Tensioned High-Line Anchor Tension (T)',
          formula: 'Tension = (Weight × Span) / (4 × Sag)',
          descriptionAr: 'حيث Weight وزن الفاحص والمعدات، Span المسافة الأفقية بين نقطتي التثبيت، Sag مقدار الانحناء الرأسي لوسط الحبل. كلما قل الانحناء تضاعف الشد على نقاط التثبيت بشكل هائل.',
          descriptionEn: 'Calculates horizontal anchor tension; reducing mid-span rope sag causes anchor forces to spike exponentially.'
        }
      ],
      practicalSkillsChecklist: [
        { skillAr: 'تركيب نظام تثبيت بحبال مزدوجة بنظام إنقاذ مسبق Rig-for-Rescue وحماية حواف صلبة والتسلق عليه', skillEn: 'Rig twin-rope system with pre-rigged rescue descender and edge protection, ascending and descending safely', importance: 'mandatory' },
        { skillAr: 'تنفيذ فحص سماكة بالموجات فوق الصوتية لـ 20 نقطة على عمود شعلة بحرية أثناء التعليق وتوثيق القراءات', skillEn: 'Execute ultrasonic thickness survey across 20 points on offshore flare stack while suspended', importance: 'mandatory' },
        { skillAr: 'تنفيذ محاكاة إنقاذ لفاحص فاقد للوعي على الصاعدات وتغيير أجهزة التثبيت وإنزاله للأرض في 4 دقائق', skillEn: 'Execute simulated rescue of unconscious climber from ascenders changing to descender in under 4 minutes', importance: 'mandatory' }
      ],
      referenceTextbooks: [
        { title: 'IRATA International Code of Practice (ICOP Part 2: Detailed Guidance)', author: 'IRATA International', standardOrPublisher: 'IRATA' },
        { title: 'Rope Rescue Technician Field Guide', author: 'CMC Rescue Inc.', standardOrPublisher: 'CMC' },
        { title: 'ISO 22846-2: Personal equipment for protection against falls — Rope access systems — Part 2: Code of practice', author: 'ISO Standards', standardOrPublisher: 'ISO' }
      ]
    },

    // -------------------------------------------------------------------------
    // LEVEL 3: IRATA LEVEL 3 SAFETY SUPERVISOR & INTEGRITY LEAD (المستوى الثالث)
    // -------------------------------------------------------------------------
    {
      levelId: 'level3',
      tierCategory: 'level3',
      nameAr: 'مشرف وصول بالحبال ورئيس سلامة الأصول (IRATA Level 3 Safety Supervisor & Integrity Director)',
      nameEn: 'Level III (IRATA Level 3 Safety Supervisor & Asset Integrity Lead)',
      academicStageAr: 'القمة الإدارية والاستشارية في إدارة عمليات الوصول بالحبال الصناعية والسلامة وإدارة سلامة الأصول الميدانية',
      academicStageEn: 'Peak Operational & Consulting Authority in Rope Access Safety Supervision, JHA/RAMS & Asset Governance',
      targetRoleAr: 'إدارة وتوجيه فرق الفحص بالحبال، اعتماد خطط تقييم المخاطر RAMS، قيادة خطط الطوارئ، وتدقيق أنظمة التثبيت',
      targetRoleEn: 'Direct site rope access inspection operations, approve RAMS/JHA risk assessments, lead emergency evacuation protocols',
      prerequisitesAr: 'شهادة IRATA Level 2 مع 1000 ساعة مسجلة إضافية (إجمالي 2000+ ساعة) واجتياز تقييم الممتحن المستقل لاختبار المستوى 3',
      prerequisitesEn: 'Valid IRATA Level 2 with min 1000 additional logged hours (2000+ total) passing rigorous independent assessor exam',
      trainingHours: 120,
      experienceMonths: 48,
      internationalCerts: ['IRATA Level 3 Safety Supervisor', 'SPRAT Level III Supervisor', 'NEBOSH International Diploma', 'Advanced Rigging Authority'],
      applicableCodes: ['IRATA ICOP', 'ISO 22846 (Parts 1 & 2)', 'OSHA 1910 Subpart D', 'API RP 54 (Offshore Safety)'],
      responsibilitiesAr: [
        'المسؤولية القانونية والفنية الكاملة عن سلامة كافة عمليات الوصول بالحبال بالموقع وفق كود IRATA الدولي',
        'صياغة واعتماد تقييم المخاطر الميداني (Job Hazard Analysis - JHA) وبيان طريقة العمل الآمنة (RAMS)',
        'تحديد وفحص واختبار نقاط التثبيت الهيكلية (Structural Anchor Proof Testing) وحساب معاملات الأمان',
        'تصميم وتدريب الفريق على خطط الإنقاذ والإخلاء المعقدة في المنصات البحرية والشعلات والأماكن المحصورة',
        'تكامل بيانات الفحص المستخرجة من الارتفاعات وربطها بنظام إدارة سلامة الأصول المؤسسية (AIMS / SAP PM)'
      ],
      responsibilitiesEn: [
        'Bear ultimate technical and legal accountability for all site rope access safety compliance per IRATA International rules',
        'Author and approve bespoke Job Hazard Analyses (JHA) and Risk Assessment Method Statements (RAMS)',
        'Select, verify, and proof-test structural rigging anchors calculating mechanical stress factors and structural margins',
        'Design site-specific high-angle and confined space emergency rescue plans conducting regular live emergency drills',
        'Integrate high-angle NDT inspection findings into corporate Asset Integrity Management Systems (AIMS / SAP PM)'
      ],
      modules: [
        {
          id: 'mod_rope_3_1',
          titleAr: 'الوحدة 1: إدارة السلامة القانونية، صياغة وثائق RAMS وتأهيل نقاط التثبيت الهيكلية',
          titleEn: 'Module 1: Statutory Safety Governance, RAMS Formulation & Anchor Proof-Testing',
          duration: '60 ساعة استشارية وتشريعات دولية',
          topicsAr: [
            'المسؤولية القانونية والتشريعية لمشرف المستوى الثالث بموجب كود IRATA ومواصفة ISO 22846-2 وقوانين OSHA',
            'صياغة وثيقة تقييم المخاطر وطريقة العمل الآمنة (Risk Assessment Method Statement - RAMS) للعمليات الحرجة',
            'فحص وتأهيل نقاط التثبيت الإنشائية: اختبار الشد الهيدروليكي (Proof Pull-Testing per EN 795) بقوة 12 إلى 15 kN',
            'إدارة متطلبات السلامة في البيئات شديدة الخطورة: الغازات الحامضية السامة (H₂S)، شعلات الحفر، والمنصات النفطية البحرية',
            'نظام فحص وتوثيق وصيانة معدات الحبال الدورية (Periodic Equipment Thorough Examination per LOLER 1998)'
          ],
          topicsEn: [
            'Statutory legal liability and duty of care for IRATA Level 3 supervisors under ISO 22846, LOLER, and OSHA regulations',
            'Authoring comprehensive, task-specific Risk Assessment Method Statements (RAMS) for high-risk offshore operations',
            'Structural anchor verification: Proof pull-testing protocols deploying hydraulic test apparatus (EN 795 to 12-15 kN)',
            'Safety management in extreme hazardous environments: Toxic sour gas (H₂S), live flare radiation, and offshore tidal zones',
            'Rigorous equipment inspection regimes: 6-month statutory thorough examination schedules complying with LOLER 1998'
          ],
          learningOutcomesAr: [
            'القيادة الكاملة لسلامة العمليات على الارتفاعات وتحقيق سجل خالٍ تماماً من الحوادث (Zero Lost Time Incidents)',
            'تأهيل واعتماد نقاط التثبيت المعقدة وفق المعايير الهندسية الصارمة'
          ],
          learningOutcomesEn: [
            'Exercise total operational safety governance achieving flawless zero-incident safety track records',
            'Authoritatively qualify and certify complex structural anchor networks satisfying engineering auditors'
          ]
        },
        {
          id: 'mod_rope_3_2',
          titleAr: 'الوحدة 2: قيادة خطط الإنقاذ الكبرى وتكامل بيانات سلامة الأصول (AIMS)',
          titleEn: 'Module 2: Major Emergency Rescue Command & Enterprise Asset Integrity Integration',
          duration: '60 ساعة تدريب قيادي وإدارة أصول',
          topicsAr: [
            'قيادة خطط الإنقاذ والإخلاء الجماعي في حالات الطوارئ القصوى من شعلات الغاز ومداخن التوليد الشاهقة',
            'إجراءات التنسيق مع فرق الإسعاف والطائرات المروحية للإخلاء الطبي السريع (Offshore Medevac Coordination)',
            'تكامل بيانات الفحص البصري وفحص الموجات فوق الصوتية والتصوير الحراري مع منصة إدارة سلامة الأصول AIMS',
            'تقييم العمر المتبقي للهياكل البحرية والأعمدة المعلقة وتحديد أولويات الصيانة المستعجلة لخفض مخاطر الانهيار',
            'إدارة وتدريب وتطوير كوادر الفحص بالحبال من المستويين الأول والثاني وتقييم كفاءتهم الميدانية'
          ],
          topicsEn: [
            'Commanding site incident response and complex high-angle multi-casualty emergency rescue campaigns',
            'Offshore medical evacuation interface: Direct liaison with helicopter search-and-rescue teams (Medevac)',
            'Integration of suspended ultrasonic, visual, and thermographic data into corporate Asset Integrity Management Systems',
            'Remaining life assessments of offshore jacket members, conductor guides, and flare booms driving priority work packs',
            'Mentoring, coaching, and auditing Level 1 and Level 2 rope technicians ensuring peak competence and safety discipline'
          ],
          learningOutcomesAr: [
            'القدرة على قيادة وإدارة أكبر مشاريع الفحص والصيانة بالوصول بالحبال للمنشآت الحيوية والمنصات النفطية',
            'ربط مخرجات التفتيش المعلق مباشرة بقرارات إدارة سلامة الأصول الاستراتيجية لتقليل المخاطر والتكاليف'
          ],
          learningOutcomesEn: [
            'Lead multi-team rope access inspection and maintenance campaigns on critical offshore oil and gas assets',
            'Directly feed high-angle inspection intelligence into strategic asset integrity decisions minimizing OPEX and risk'
          ]
        }
      ],
      keyFormulas: [
        {
          nameAr: 'حساب معامل أمان نقطة التثبيت الهيكلية (Structural Anchor Safety Margin)',
          nameEn: 'Structural Rigging Safety Factor (SF)',
          formula: 'Safety Factor (SF) = Minimum Breaking Strength (MBS) / Maximum Dynamic Working Load',
          descriptionAr: 'يشترط كود IRATA الدولي ألا يقل معامل الأمان لنقاط التثبيت الحاملة للأفراد عن 10:1 للأشرطة والمنسوجات، وعن 5:1 للمعدات الفولاذية الصلبة.',
          descriptionEn: 'IRATA International mandates a minimum 10:1 safety factor for textile rigging components and 5:1 for structural steel anchors.'
        }
      ],
      practicalSkillsChecklist: [
        { skillAr: 'صياغة واعتماد وثيقة تقييم مخاطر RAMS كاملة لعملية فحص شعلة حقل غاز طبيعي على ارتفاع 140 متراً', skillEn: 'Author and approve comprehensive RAMS dossier for 140-meter offshore flare stack inspection campaign', importance: 'mandatory' },
        { skillAr: 'اختبار نقطة تثبيت إنشائية جديدة بمكبس سحب هيدروليكي بقوة 15 kN لمدة دقيقة كاملة والتأكد من عدم وجود أي انزياح', skillEn: 'Proof pull-test structural anchor eyebolt deploying hydraulic tester at 15 kN for 60 seconds with zero displacement', importance: 'mandatory' },
        { skillAr: 'قيادة محاكاة طوارئ كاملة لإخلاء فاحص مصاب من داخل وعاء ضغط محصور ونقله لمنطقة الهبوط في أقل من 5 دقائق', skillEn: 'Command live emergency rescue drill extracting injured technician from confined sphere vessel under 5 minutes', importance: 'mandatory' }
      ],
      referenceTextbooks: [
        { title: 'IRATA International Training, Assessment and Certification Scheme (TACS)', author: 'IRATA International Committee', standardOrPublisher: 'IRATA' },
        { title: 'ISO 22846-1 & 2: Rope Access Systems (Complete Code of Practice)', author: 'ISO Standards', standardOrPublisher: 'ISO' },
        { title: 'Guidelines for the Management of Offshore Rigging and Rope Access', author: 'Step Change in Safety / Energy Institute', standardOrPublisher: 'Energy Institute' }
      ]
    }
  ]
};
