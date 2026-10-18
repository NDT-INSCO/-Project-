import { NDTMethod, EducationalDefect, QuizQuestion, StandardEntry } from '../types';

export const NDT_METHODS: NDTMethod[] = [
  { id: 'vt', name: { ar: 'الفحص البصري', en: 'Visual Testing (VT)' }, description: { ar: 'فحص بصري مباشر', en: 'Direct visual examination' }, category: 'conventional' },
  { id: 'pt', name: { ar: 'السائل النافذ', en: 'Liquid Penetrant (PT)' }, description: { ar: 'كشف العيوب السطحية المفتوحة', en: 'Detect surface-breaking flaws' }, category: 'conventional' },
  { id: 'mt', name: { ar: 'الجسيمات المغناطيسية', en: 'Magnetic Particle (MT)' }, description: { ar: 'كشف العيوب في المواد الحديدية', en: 'Detect flaws in ferromagnetic materials' }, category: 'conventional' },
  { id: 'ut', name: { ar: 'الموجات فوق الصوتية', en: 'Ultrasonic Testing (UT)' }, description: { ar: 'فحص داخلي بالموجات الصوتية', en: 'Internal examination with sound waves' }, category: 'conventional' },
  { id: 'rt', name: { ar: 'التصوير الإشعاعي', en: 'Radiographic Testing (RT)' }, description: { ar: 'تصوير داخلي بالإشعاع', en: 'Internal imaging with radiation' }, category: 'conventional' },
  { id: 'et', name: { ar: 'التيارات الدوامية', en: 'Eddy Current (ET)' }, description: { ar: 'فحص بالحث الكهرومغناطيسي', en: 'Electromagnetic induction testing' }, category: 'advanced' },
  { id: 'paut', name: { ar: 'المصفوفة الطورية', en: 'Phased Array (PAUT)' }, description: { ar: 'UT متقدم بتوجيه إلكتروني', en: 'Advanced UT with electronic steering' }, category: 'advanced' },
  { id: 'tofd', name: { ar: 'فرق زمن الحيود', en: 'TOFD' }, description: { ar: 'قياس ارتفاع العيب ب_signals الأطراف', en: 'Flaw height from tip diffraction signals' }, category: 'advanced' },
];

export const EDUCATIONAL_DEFECTS: EducationalDefect[] = [
  { id: 'porosity', name: { ar: 'مسامية', en: 'Porosity' }, description: { ar: 'فقاعات غاز محاصرة في معدن اللحام', en: 'Gas pockets trapped in weld metal' }, method: 'rt', severity: 'medium' },
  { id: 'crack', name: { ar: 'شرخ', en: 'Crack' }, description: { ar: 'انكسار في المعدن', en: 'Fracture in the metal' }, method: 'mt', severity: 'high' },
  { id: 'slag', name: { ar: 'خبيث', en: 'Slag Inclusion' }, description: { ar: 'شوائب خبث محبوسة', en: 'Trapped slag impurities' }, method: 'ut', severity: 'medium' },
  { id: 'undercut', name: { ar: 'نتوء', en: 'Undercut' }, description: { ar: ' groove قرب حافة اللحام', en: 'Groove at weld toe' }, method: 'vt', severity: 'medium' },
  { id: 'lack_of_fusion', name: { ar: 'عدم انصهار', en: 'Lack of Fusion' }, description: { ar: 'عدم الالتصاق الكافي', en: 'Insufficient bonding' }, method: 'ut', severity: 'high' },
];

export const STANDARDS_LIBRARY: StandardEntry[] = [
  { id: 'asme_v', code: 'ASME Sec V', title: { ar: 'قسم الفحص', en: 'Section V - NDE' }, description: { ar: 'متطلبات الفحص غير الإتلافي', en: 'NDE requirements' }, publisher: 'ASME' },
  { id: 'asme_ix', code: 'ASME Sec IX', title: { ar: 'تأهيل اللحام', en: 'Welding Qualifications' }, description: { ar: 'تأهيل اللحّامين والإجراءات', en: 'Welder and procedure qualifications' }, publisher: 'ASME' },
  { id: 'api_570', code: 'API 570', title: { ar: 'فحص الأنابيب', en: 'Piping Inspection' }, description: { ar: 'فحص وصيانة الأنابيب في الخدمة', en: 'In-service piping inspection and maintenance' }, publisher: 'API' },
];

export const SAMPLE_QUIZZES: QuizQuestion[] = [
  { id: 'q1', question: { ar: 'ما الطريقة المناسبة لكشف شرخ سطحي فيألومنيوم؟', en: 'Which method detects surface cracks in aluminium?' }, options: [{ ar: 'MT', en: 'MT' }, { ar: 'PT', en: 'PT' }, { ar: 'RT', en: 'RT' }], correctAnswer: 1, explanation: { ar: 'PT مناسب للأسطح غير المسامية', en: 'PT suits non-porous surfaces' }, discipline: 'conventional_ndt', difficulty: 'easy' },
  { id: 'q2', question: { ar: 'ما معادلة سرعة الموجة؟', en: 'What is the wave speed equation?' }, options: [{ ar: 'v = f × λ', en: 'v = f × λ' }, { ar: 'v = f / λ', en: 'v = f / λ' }, { ar: 'v = λ / f', en: 'v = λ / f' }], correctAnswer: 0, explanation: { ar: 'السرعة = التردد × الطول الموجي', en: 'Speed = frequency × wavelength' }, discipline: 'conventional_ndt', difficulty: 'easy' },
];