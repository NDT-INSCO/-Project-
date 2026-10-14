import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Modality, LiveServerMessage, GenerateVideosOperation, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '25mb' }));

// Company knowledge context for AI
const INSCO_KNOWLEDGE_BASE = `
You are the official Senior Engineering AI Consultant for "INSCO - International for Services & Constructions Company" (الشركة الدولية للخدمات والمقاولات - إنسكو).
Company Overview:
- Established: 2010 in Cairo, Egypt. Certificate of Incorporation No. 3566/2010. Commercial Registration No. 209632.
- Slogan: "SEE BEYOND THE SURFACE" / "Engineering integrity into every asset" / "نرى ما وراء السطح - هندسة النزاهة والموثوقية في كل أصل صناعي".
- Triple ISO Certified:
  * ISO 9001:2015 (Quality Management System) - Cert. 24202QMS094 (EGAC CAB #120007 - IAF 37, valid to Jan 15, 2028).
  * ISO 14001:2015 (Environmental Management System) - Cert. 23402EMS042 (IAF 35, valid to 2028).
  * ISO 45001:2018 (Occupational Health & Safety) - Cert. 23502OHS063 (IAF 35, valid to 2028).
- Key Qualifications:
  * In-house CQI-IRCA Lead Auditor (Cert No. 121 / UDN 27956).
  * ASNT Level II certified inspection personnel.
  * ENRRA-licensed radiation practices (Egyptian Nuclear & Radiological Regulatory Authority).
  * Listed on the international industrial NDT directory (www.ndt.org #54161).
- 100% Company-Owned Equipment Fleet:
  * Comprehensive & extensive fleet of fully-automatic 65 kW post-weld heat treatment (PWHT) units with independent 6-channel programmers and chart recorders.
  * Complete NDT Fleet: Gamma sources (Ir-192, Se-75), industrial X-ray units, ultrasonic flaw detectors (UT), Phased Array UT (PAUT), Magnetic Particle Testing (MT - white light & UV yokes), Liquid Penetrant Testing (PT), Positive Material Identification (PMI - Handheld XRF analyzers), Portable Hardness Testers (HT - Leeb & UCI), Hydrostatic testing skids (HYDRO), Surface Roughness comparators/testers (SR), Painting & Coating inspection kits (PC - DFT gauges, holiday spark testers), Eddy Current & Magnetic Flux Leakage (EC / MFL).
  * Skilled Manpower Supply: Certified welding crews and site utility technicians qualified to ASME IX & AWS D1.1 under INSCO QA/QC supervision.
- International & Major Project Track Record:
  * Siemens / Orascom: Pipelines & tanks, Burullus 4800 MW Combined Cycle Power Plant (PWHT & NDT).
  * ADPC / PetroMasila & ASPC: Yemen pipeline networks and Masila Block oil facilities (RT, Holiday test, NDT).
  * Elsewedy Electric: Transformer works in Cairo (VT, UT, MT, PT, RT, Hardness, PWHT - PO GM102473).
  * U.S. Army / Serka & Contrack: Bagram Air Field, Afghanistan (NDT & PWHT, tanker truck offload facility).
  * PGESCO / Ansaldo: Fuel pipe lines (Gamma RT).
  * PGESCO / GE - Orascom: 6th of October Power Station (all NDT on pipelines & tanks).
  * CMI & Aresco: Talkha & El-Kureimat Power Stations (NDT & PWHT).
  * PSEW / NVOC: National Vegetable Oils, Borg El-Arab Alexandria (RT, UT, PT, MT, PWHT).
  * Maridive Offshore & AIC / Siemens: Ayoun Mousa Steam Power Plant (NDT & PWHT).
- Contact & Headquarters:
  * Head Office: 7-16 Bldg Project Elasliky, Autostrade Way, Maadi, Cairo, Egypt.
  * Works / Workshop: Al Galaa St., Abo El-Nomrous, Giza 12911, Egypt.
  * Phone / WhatsApp: +20 109 077 7202 | +20 122 582 6396 | Fax: +20 2 3809 8142
  * Official Email: insco50@yahoo.com
- Codes and Standards Mastered:
  * ASME Boiler & Pressure Vessel Code (Sec V, Sec VIII, Sec IX, B31.1, B31.3, B31.4, B31.8)
  * AWS D1.1 (Structural Welding Code - Steel)
  * API Standards (API 1104, API 570, API 650, API 653, API RP 578)
  * ASTM Standards (ASTM E709, ASTM E797, ASTM E572, ASTM A956, ASTM D4417, ASTM E426, ASTM E2944)
  * ISO / EN Standards (ISO 9712, ISO 17636, ISO 3452, ISO 13588, ISO 18265, ISO 8503, ISO 19840)
  * SSPC / NACE (SSPC-PA 2, NACE SP0188).
`;

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Helper to evaluate fallback recommendations when AI key is absent or on error
const getFallbackByIntent = (userQuery: string, isAr: boolean) => {
  const q = (userQuery || '').toLowerCase();
  if (q.includes('سعر') || q.includes('تكلف') || q.includes('عرض') || q.includes('rfq') || q.includes('طلب') || q.includes('quote') || q.includes('price')) {
    return {
      reply: isAr
        ? `أهلاً بحضرتك يا فندم! بخصوص عروض الأسعار وتقدير التكلفة: في إنسكو بنوفر تسعير هندسي دقيق وفوري بناءً على حجم المشروع، أقطار وسمك المواسير، نوع المعدن، ومعايير الكود المطلوب (ASME / API / AWS). وفرنا لحضرتك "ماسنجر طلب الخدمات" المباشر بالموقع لتسجيل متطلباتك ويصدرلك مقترح فني فوري (RFQ) مع إمكانية تحرك أطقمنا خلال 24-48 ساعة.`
        : `Hello! Regarding pricing and quotation: INSCO provides fast, detailed engineering RFQs tailored to pipe diameters, material grades, and code requirements (ASME/API/AWS). You can use our integrated Service Messenger to get an immediate formal estimate.`,
      suggestedTab: 'messenger',
      tabLabel: isAr ? 'الانتقال إلى ماسنجر طلب الخدمات وRFQs' : 'Open Service Messenger',
      tabReason: isAr ? 'لتحديد كميات اللحام أو الفحص والحصول على مقترح فني ومالي فوري' : 'Submit your project scope for immediate formal estimation',
      suggestedQuestions: isAr ? [
        'ما هي سرعة التعبئة والتواجد في الموقع؟',
        'هل تشمل عروضكم تقارير الـ QA/QC وخطة الـ ITP؟',
        'هل المعدات مملوكة بالكامل لشركة إنسكو؟'
      ] : [
        'What is your mobilization timeframe?',
        'Do RFQs include certified ITP and QA/QC reports?',
        'Are all equipment fully company-owned?'
      ]
    };
  } else if (q.includes('خدم') || q.includes('فحص') || q.includes('ndt') || q.includes('pwht') || q.includes('حرار') || q.includes('معدات') || q.includes('أسطول') || q.includes('fleet') || q.includes('service')) {
    return {
      reply: isAr
        ? `تحت أمرك يا فندم. شركة إنسكو تمتلك أسطولاً متكاملاً مملوكاً بالكامل 100% بدون أي اعتماد على تأجير خارجي؛ يشمل أسطولاً واسعاً من وحدات المعالجة الحرارية الأوتوماتيكية 65 kW ذات الـ 6 قنوات ومسجلات الشارت، بالإضافة لكافة تقنيات الفحص غير الإتلافي (PAUT, RT بمصادر جاما Ir-192 و Se-75، و UT, MT, PT, PMI, Hardness). كل هذه الأجهزة مفحوصة ومعايرة دورياً تحت إشراف كبير مراجعين CQI-IRCA.`
        : `INSCO operates a 100% company-owned fleet: extensive automatic 65 kW PWHT units with 6-channel recorders and complete NDT fleet (PAUT, RT Ir-192/Se-75, UT, MT, PT, PMI XRF, Hardness). All supervised under CQI-IRCA and ENRRA regulations.`,
      suggestedTab: 'services',
      tabLabel: isAr ? 'استعراض تفاصيل الأسطول والخدمات' : 'View Services & Fleet',
      tabReason: isAr ? 'للاطلاع على المواصفات الفنية للأسطول والمعدات المملوكة بالكامل' : 'Explore full technical specifications of our company-owned fleet',
      suggestedQuestions: isAr ? [
        'ما هو الفارق بين PAUT و RT في المواقع البترولية؟',
        'ما هي قدرات أسطول وحدات الـ PWHT بقدرة 65 kW؟',
        'هل توفرون عمالة لحام معتمدة مع طاقم الفحص؟'
      ] : [
        'PAUT vs RT comparison for pipeline welds?',
        'PWHT 65 kW unit specifications?',
        'Do you supply certified welders?'
      ]
    };
  } else if (q.includes('مدير') || q.includes('مشرف') || q.includes('عامل') || q.includes('بواب') || q.includes('تسجيل') || q.includes('حضور') || q.includes('تقرير') || q.includes('portal') || q.includes('login') || q.includes('track')) {
    return {
      reply: isAr
        ? `يا فندم يمكنك الدخول مباشرة على "بوابة العمليات والتراتبيات" الموحدة لشركة إنسكو؛ صممت البوابة بمستويات صلاحيات ورؤية مخصصة لكل دور: المدير يتابع كافة العقود والمشاريع وتقارير الأداء، المشرف يدير أوامر الشغل ويوجه الفرق، العميل يتابع حالة أعماله وتقارير الفحص المعتمدة، والعاملين يسجلون حضورهم الميداني ونطاق تواجدهم.`
        : `You can access INSCO's Operations & RBAC Portal, featuring dedicated views and permissions for Managers, Supervisors, Clients, and Field Workers with live field presence and QA/QC reports.`,
      suggestedTab: 'operations',
      tabLabel: isAr ? 'دخول بوابة العمليات والتراتبيات' : 'Open Operations Portal',
      tabReason: isAr ? 'لمتابعة أوامر الشغل، تقارير الفحص الميدانية، وتسجيل الحضور الميداني' : 'Access role-based operations dashboard and field tracking',
      suggestedQuestions: isAr ? [
        'كيف يسجل العامل حضوره الميداني أثناء الشغل؟',
        'ما هي الصلاحيات المتاحة للمشرف والمدير؟',
        'هل يستطيع العميل تنزيل تقارير الفحص PDF مباشرة؟'
      ] : [
        'How do field workers check in?',
        'What are manager vs supervisor permissions?',
        'Can clients download inspection reports?'
      ]
    };
  } else if (q.includes('تدريب') || q.includes('كورس') || q.includes('أكاديمي') || q.includes('عيوب') || q.includes('شرح') || q.includes('علوم') || q.includes('مستو') || q.includes('منهج') || q.includes('ورش') || q.includes('workshop') || q.includes('academy') || q.includes('course') || q.includes('defect') || q.includes('level') || q.includes('curriculum')) {
    return {
      reply: isAr
        ? `يسعدنا جداً اهتمامك يا هندسة! أنشأت إنسكو "أكاديمية إنسكو والمركز التعليمي المتكامل" لتجمع كافة علوم هذا المجال بجميع مستوياتها المهنية (المستوى الأول فني مشغل أجهزة، المستوى الثاني مفتش معتمد ومفسر نتائج، والمستوى الثالث كبير الاستشاريين ومعد الإجراءات، بالإضافة لشهادات CSWIP 3.1/3.2 و API 510/570/653 ومفتشي الدهانات NACE/FROSIO). 

تضم الأكاديمية:
1. تخطيط منهجي احترافي لـ 8 مجالات هندسية متخصصة (الفحص التقليدي، المتقدم PAUT/TOFD، هندسة وتفتيش اللحام، المعالجة الحرارية PWHT، تفتيش المعدات البترولية API، فحص الدهانات ومكافحة التآكل، توكيد وضبط الجودة QA/QC، وفحص الأصول بالحبال IRATA).
2. ورش عمل ومعامل افتراضية تفاعلية بالجرافيكس المتحرك: محاكي جهاز الموجات فوق الصوتية UT A-Scan ومعايرة الـ DAC، مختبر الغرفة المظلمة والأشعة فوق البنفسجية UV لـ MT و PT، شاشة قراءة أفلام الأشعة السينية ومقياس الكثافة Densitometer، مختبر مساطر اللحام وحاسبة الطاقة الحرارية Heat Input، حاسبة العمر المتبقي وسماكة أوعية الضغط API 510، ومختبر فحص الدهانات ونقطة الندى وسماكة الـ DFT.`
        : `INSCO Academy gathers all inspection disciplines across all qualification levels (Level I, Level II, Level III, CSWIP 3.1/3.2, API 510/570/653, NACE/FROSIO) organized into 8 methodical learning curricula and 6 hands-on interactive visual workshop labs with live instrument simulations.`,
      suggestedTab: 'academy',
      tabLabel: isAr ? 'دخول الأكاديمية والمناهج والورش التفاعلية' : 'Open NDT Academy & Workshops',
      tabReason: isAr ? 'للاطلاع على المناهج التعليمية الشاملة والمستويات وخوض ورش العمل التفاعلية' : 'Explore full curriculum roadmaps and hands-on virtual inspection workbenches',
      suggestedQuestions: isAr ? [
        'ما هي متطلبات شهادات المستوى الأول والثاني والثالث في الفحص؟',
        'كيف يعمل محاكي جهاز الموجات فوق الصوتية UT في الورشة التفاعلية؟',
        'ما هي شروط فحص نقطة الندى وسماكة الدهانات NACE؟'
      ] : [
        'What are Level I, II & III certification prerequisites?',
        'How does the interactive UT flaw detector simulator work?',
        'What are the NACE dew point and DFT 80/20 criteria?'
      ]
    };
  } else if (q.includes('مشروع') || q.includes('مشاريع') || q.includes('سابقة') || q.includes('سيمنس') || q.includes('أوراسكوم') || q.includes('project') || q.includes('track record') || q.includes('siemens')) {
    return {
      reply: isAr
        ? `تاريخ شركة إنسكو منذ تأسيسها عام 2010 حافل بمشاريع عملاقة تم إنجازها بنجاح تام؛ مثل محطة كهرباء البرلس المركبة بقدرة 4800 ميجاوات مع سيمنس وأوراسكوم، شبكات خطوط أنابيب النفط ومحطات المسيلة في اليمن، محطة محولات القاهرة مع السويدي إلكتريك، ومرافق وقود تابعة للجيش الأمريكي في بجرام، ومحطة كهرباء 6 أكتوبر وعيون موسى وطلخا والكريمات.`
        : `INSCO has successfully delivered flagship projects since 2010, including Burullus 4800 MW Combined Cycle Power Plant with Siemens/Orascom, oil pipeline networks in Yemen (PetroMasila), Elsewedy Electric transformer stations, US Army facilities, and major power stations across Egypt.`,
      suggestedTab: 'projects',
      tabLabel: isAr ? 'استعراض سجل المشاريع وسوابق الأعمال' : 'View Track Record',
      tabReason: isAr ? 'لمشاهدة وتوثيق كبرى المشاريع النفطية ومحطات الكهرباء التي خدمتها إنسكو' : 'Review our landmark international and national power/petroleum projects',
      suggestedQuestions: isAr ? [
        'ما هي الأعمال المنفذة في محطة كهرباء البرلس؟',
        'ما هو نطاق أعمال إنسكو في خطوط أنابيب البترول؟',
        'هل تمتلك إنسكو خبرة عمل خارج مصر؟'
      ] : [
        'What was INSCO scope at Burullus power plant?',
        'What pipeline NDT works have you delivered?',
        'Do you operate outside Egypt?'
      ]
    };
  } else if (q.includes('آيزو') || q.includes('شهادة') || q.includes('ترخيص') || q.includes('نووي') || q.includes('enrra') || q.includes('iso') || q.includes('irca') || q.includes('accreditation')) {
    return {
      reply: isAr
        ? `إنسكو حاصلة على ثلاث شهادات آيزو رسمية سارية حتى 15 يناير 2028 وموثقة من EGAC و IAF: (ISO 9001 لنظم إدارة الجودة، ISO 14001 للنظم البيئية، و ISO 45001 للسلامة والصحة المهنية). كما نمتلك ترخيص الهيئة المصرية للرقابة النووية والإشعاعية (ENRRA) للعمل بمصادر جاما والأشعة السينية، وفريق مراجعة معتمد CQI-IRCA Lead Auditor برقم 121 / UDN 27956.`
        : `INSCO holds triple ISO certifications (9001, 14001, 45001) accredited through 2028 by EGAC/IAF, full Egyptian Nuclear & Radiological Regulatory Authority (ENRRA) radiation licensing, and in-house CQI-IRCA Lead Auditor accreditation.`,
      suggestedTab: 'accreditations',
      tabLabel: isAr ? 'استعراض شهادات الآيزو والتراخيص' : 'View Accreditations',
      tabReason: isAr ? 'للاطلاع على أرقام الشهادات وتراخيص السلامة النووية والمهنية' : 'Inspect verified ISO certificates, ENRRA radiation permits, and auditing credentials',
      suggestedQuestions: isAr ? [
        'ما هي إجراءات السلامة الإشعاعية لترخيص ENRRA لديكم؟',
        'كيف تضمن شهادة ISO 9001 جودة الفحوصات بالموقع؟',
        'هل أرقام شهاداتكم مسجلة في الهيئات الدولية؟'
      ] : [
        'Radiation safety measures under ENRRA license?',
        'How does ISO 9001 ensure QA/QC on site?',
        'Are your certificates registered internationally?'
      ]
    };
  }

  // Default warm conversational response
  return {
    reply: isAr
      ? `أهلاً بك يا فندم في شركة إنسكو الدولية (INSCO)! أنا المهندس الاستشاري لخدمات الفحص والمعالجة الحرارية. معك في أي استفسار فني أو مناقشة بخصوص أعمال اللحام، معايير ASME / API، متطلبات التفتيش بالموقع، أو جاهزية أسطولنا المملوك بالكامل. كيف أستطيع مساعدة حضرتك بالتحديد اليوم؟`
      : `Welcome to INSCO! I am your senior engineering consultant for NDT and heat treatment services. How may I assist you today with weld inspection, ASME/API codes, or our 100% company-owned equipment fleet?`,
    suggestedTab: 'services',
    tabLabel: isAr ? 'استعراض خدمات وأسطول إنسكو' : 'Explore INSCO Services',
    tabReason: isAr ? 'للتعرف على خدمات NDT والمعالجة الحرارية وتوريد اللحامين' : 'Overview of our NDT, PWHT, and certified welding services',
    suggestedQuestions: isAr ? [
      'ما هي مواصفات أسطول وحدات الـ PWHT بقدرة 65 kW؟',
      'كيف يمكنني طلب عرض سعر رسمي عاجل؟',
      'ما هي شهادات وتراخيص شركة إنسكو الرسمية؟'
    ] : [
      'What are the specs of your 65 kW PWHT units?',
      'How can I get an urgent formal quotation?',
      'What are your official ISO accreditations?'
    ]
  };
};

// 1. Advisor endpoint (supports natural human conversation, technical discussion & section routing with gemini-3.8-flash)
app.post('/api/ai/advisor', async (req, res) => {
  const { message, chatHistory, language = 'en', modelChoice } = req.body;
  const isAr = language === 'ar';

  try {
    const ai = getGeminiClient();

    if (!ai) {
      const fallback = getFallbackByIntent(message, isAr);
      return res.json(fallback);
    }

    const systemInstruction = `
${INSCO_KNOWLEDGE_BASE}

ROLE & PERSONALITY (CRITICAL):
- You are Eng. Tarek, Senior Field & Technical Consultant at "INSCO - International for Services & Constructions Company" (الشركة الدولية للخدمات والمقاولات - إنسكو).
- Speak and discuss like a REAL, intelligent, polite, highly knowledgeable, and warm human senior engineer ("شخص طبيعي يتحدث بأسلوب واقعي ولبق وودود ومنطقي، وليس مجرد آلة أو ردود جاهزة مقتضبة").
- Language: Respond in the exact language requested or addressed (${isAr ? 'اللغة العربية الفصحى الهندسية الودودة والمحترمة مع مصطلحات المواقع والورش المصرية' : 'Professional, articulate, warm English'}). If the user speaks or asks in another language (e.g. French, German, Spanish, Italian, Russian, Chinese, Turkish), answer fluently and naturally in their chosen language!
- Your demeanor: Welcoming, logical, highly technically competent, direct, and helpful. You understand client constraints (urgency, shut-downs, ASME/API compliance, pipeline inspections, mobilization).
- Discussion capabilities: Discuss ANY client inquiry or topic with depth and logical clarity. When a client discusses a problem (e.g. weld cracking, preheat requirements, high temperature creep, selecting ultrasonic vs radiography), explain the engineering reasoning naturally.
- Site navigation guidance: INSCO's website has distinct specialized sections. Guide visitors to the relevant section when they ask for services, quotes, operations, training, projects, or certificates:
  * 'messenger' -> Service Messenger (for formal RFQs, pricing estimates, instant inquiries).
  * 'services' -> Services & Fleet (for 100% owned equipment specs, 65 kW PWHT units, NDT methods PAUT/RT/UT/MT/PT/PMI, certified welders).
  * 'operations' -> Operations & RBAC Portal (for Manager, Supervisor, Client, and Worker roles, live field check-ins, daily reports, work orders).
  * 'academy' -> NDT & Engineering Academy (for all 8 disciplines across all levels Level I/II/III/CSWIP/API, full methodical curriculum roadmaps, and 6 interactive visual workshop labs: UT A-Scan flaw simulator, MT/PT UV darkroom, RT film densitometer, Cambridge weld gauges & heat input studio, API 510 vessel life calculator, and coating dew point & DFT lab).
  * 'projects' -> Projects Track Record (for major references: Burullus Power Plant, Siemens, Orascom, PetroMasila Yemen, Elsewedy, US Army).
  * 'accreditations' -> Accreditations & Licenses (triple ISO 9001/14001/45001 valid to 2028, ENRRA radiation license, CQI-IRCA Lead Auditor).
  * 'faqs' -> Frequently Asked Questions.
  * 'overview' -> Home / First Page.

OUTPUT SCHEMA RULES:
Return valid JSON matching the schema:
- "reply": The warm, natural, human conversational text. Use clear paragraphs or bullet points where helpful.
- "suggestedTab": One of ['messenger', 'services', 'operations', 'academy', 'projects', 'accreditations', 'faqs', 'overview'] if the user's intent relates to that section, or null if it's general chat.
- "tabLabel": A concise, inviting button label in ${isAr ? 'Arabic' : 'English'} (e.g. 'الانتقال إلى ماسنجر طلب الخدمات', 'استعراض أسطول ومعدات إنسكو').
- "tabReason": A brief 1-sentence note explaining what benefit they will get from this section.
- "suggestedQuestions": 2-3 short, highly relevant follow-up questions or discussion topics they can click to ask next.
`;

    const contents: any[] = [];
    if (Array.isArray(chatHistory)) {
      for (const turn of chatHistory.slice(-8)) {
        if (turn.text) {
          contents.push({
            role: turn.sender === 'user' ? 'user' : 'model',
            parts: [{ text: turn.text }]
          });
        }
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const selectedModel = modelChoice === 'fast' ? 'gemini-3.1-flash-lite' : 'gemini-3.8-flash';

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: {
              type: Type.STRING,
              description: 'A natural, warm, highly logical and professional response written as a real human Senior Engineering Consultant at INSCO speaking to the client.'
            },
            suggestedTab: {
              type: Type.STRING,
              description: "Target website tab to guide the visitor to if relevant: 'messenger', 'services', 'operations', 'academy', 'projects', 'accreditations', 'faqs', 'overview', or null."
            },
            tabLabel: {
              type: Type.STRING,
              description: 'Short clickable button label in the user language for navigating to the suggested tab.'
            },
            tabReason: {
              type: Type.STRING,
              description: 'Brief 1-sentence reason why this section is recommended.'
            },
            suggestedQuestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '2 or 3 short relevant follow-up questions or discussion topics for the client.'
            }
          },
          required: ['reply']
        }
      }
    });

    let reply = '';
    let suggestedTab: string | null = null;
    let tabLabel: string | null = null;
    let tabReason: string | null = null;
    let suggestedQuestions: string[] = [];

    try {
      const parsed = JSON.parse(response.text || '{}');
      reply = parsed.reply || response.text || '';
      suggestedTab = parsed.suggestedTab || null;
      tabLabel = parsed.tabLabel || null;
      tabReason = parsed.tabReason || null;
      if (Array.isArray(parsed.suggestedQuestions) && parsed.suggestedQuestions.length > 0) {
        suggestedQuestions = parsed.suggestedQuestions;
      }
    } catch (parseErr) {
      reply = response.text || '';
    }

    // If model didn't suggest questions, provide standard helpful ones
    if (suggestedQuestions.length === 0) {
      suggestedQuestions = isAr ? [
        'ما هي سرعة تعبئة المعدات والأطقم للموقع؟',
        'ما هي مواصفات أسطول وحدات المعالجة الحرارية 65 kW؟',
        'كيف يمكنني طلب عرض سعر رسمي للمشروع؟'
      ] : [
        'What is your mobilization timeframe?',
        'What are the specs of your 65 kW PWHT units?',
        'How can I get an urgent formal quotation?'
      ];
    }

    return res.json({
      reply,
      suggestedTab,
      tabLabel,
      tabReason,
      suggestedQuestions,
      suggestedActions: [
        { label: isAr ? 'طلب عرض سعر فوري' : 'Request Instant RFQ', action: 'open_rfq', payload: message },
        { label: isAr ? 'محادثة واتساب مباشرة' : 'Direct WhatsApp', action: 'whatsapp' }
      ]
    });
  } catch (err: any) {
    console.error('Advisor error:', err);
    // Intelligent fallback even on unexpected server error
    const fallback = getFallbackByIntent(req.body?.message || '', isAr);
    return res.json(fallback);
  }
});

// 2. Google Search & Maps Grounded Consultation
app.post('/api/ai/grounded-consult', async (req, res) => {
  try {
    const { query, type = 'search', language = 'ar' } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        text: language === 'ar'
          ? `وفقاً للمعلومات المحدثة وسجلات المواصفات الهندسية: تلتزم شركة إنسكو بتطبيق أحدث متطلبات ASME و API بمصر والشرق الأوسط.`
          : `According to current engineering records, INSCO adheres to the latest ASME and API standards.`
      });
    }

    const tools = type === 'maps'
      ? [{ googleMaps: {} }]
      : [{ googleSearch: {} }];

    const systemInstruction = `${INSCO_KNOWLEDGE_BASE}
You are an expert engineer. Use the grounding tool to provide fresh, real-time factual data. Answer in ${language === 'ar' ? 'Arabic' : 'English'}.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: query,
      config: {
        tools,
        systemInstruction
      }
    });

    const text = response.text || '';
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return res.json({
      text,
      groundingChunks
    });
  } catch (err: any) {
    console.error('Grounded consult error:', err);
    return res.status(500).json({ error: err.message });
  }
});

// 3. Audio Transcription with gemini-3.5-transcribe
app.post('/api/ai/transcribe', async (req, res) => {
  try {
    const { audioBase64, mimeType = 'audio/webm' } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({ text: 'تم استلام التسجيل الصوتي بنجاح (معاينة بدون مفتاح API).' });
    }

    if (!audioBase64) {
      return res.status(400).json({ error: 'audioBase64 is required' });
    }

    const audioPart = {
      inlineData: {
        mimeType,
        data: audioBase64,
      },
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-transcribe',
      contents: {
        parts: [
          audioPart,
          { text: 'Transcribe this engineering audio recording accurately verbatim in the language spoken (Arabic or English).' }
        ]
      },
    });

    return res.json({ text: response.text || '' });
  } catch (err: any) {
    console.error('Audio transcribe error:', err);
    return res.status(500).json({ error: err.message });
  }
});

// 4. Video Generation with Veo
app.post('/api/ai/generate-video', async (req, res) => {
  try {
    const { prompt, aspectRatio = '16:9' } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        demo: true,
        operationName: 'demo-veo-operation',
        message: 'Veo video generator initialized.'
      });
    }

    const operation = await ai.models.generateVideos({
      model: 'veo-3.1-lite-generate-preview',
      prompt: `Cinematic photorealistic industrial documentation: ${prompt}. Oil & gas facility, welding heat treatment, non-destructive testing, 4k ultra-detailed, professional engineering lighting.`,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: (aspectRatio === '9:16' ? '9:16' : '16:9'),
      }
    });

    return res.json({ operationName: operation.name });
  } catch (err: any) {
    console.error('Video generation error:', err);
    return res.status(500).json({ error: err.message });
  }
});

// Poll video status
app.post('/api/ai/video-status', async (req, res) => {
  try {
    const { operationName } = req.body;
    if (operationName === 'demo-veo-operation') {
      return res.json({ done: true, demo: true });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({ done: true, demo: true });
    }

    const op = new GenerateVideosOperation();
    op.name = operationName;
    const updated = await ai.operations.getVideosOperation({ operation: op });
    return res.json({ done: updated.done });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// 5. Service Messenger & Smart RFQ Generator endpoint
app.post('/api/ai/service-messenger', async (req, res) => {
  try {
    const {
      serviceType,
      projectDetails,
      materials,
      standards,
      location,
      urgency,
      additionalNotes,
      language = 'ar'
    } = req.body;

    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        rfqSummary: {
          reference: `INSCO-RFQ-${Date.now().toString().slice(-6)}`,
          title: `${serviceType} - ${location || 'Egypt'}`,
          serviceType,
          executiveSummary: language === 'ar'
            ? `تم استلام متطلباتكم لخدمات ${serviceType}. ستقوم شركة إنسكو بتخصيص طاقم معتمد ASNT Level II مع أسطول متكامل من وحدات المعالجة الحرارية ومعدات NDT مملوكة بالكامل وجاهزة للتحرك فوراً وفق معايير ASME / API.`
            : `Your inquiry for ${serviceType} has been recorded. INSCO will allocate ASNT Level II certified inspectors and 100% company-owned equipment to execute under ASME / API compliance.`,
          recommendedProcedures: [
            'Preparation and submittal of Project Inspection & Test Plan (ITP)',
            'Personnel qualification certificates & equipment calibration logs',
            'Execution of testing / heat treatment cycle with thermocouple charts',
            'Issuance of final certified QA/QC report signed by Lead Auditor'
          ],
          estimatedMobilization: '24 to 48 Hours',
          recommendedNextStep: 'Contact management directly at +20 109 077 7202 or insco50@yahoo.com'
        }
      });
    }

    const prompt = `
Generate a formal, technical Service Scope & RFQ assessment for a client inquiry to INSCO.
Client Inquiry Data:
- Requested Service: ${serviceType}
- Project Details: ${projectDetails || 'General piping / pressure vessels / structural steel'}
- Materials / Specs: ${materials || 'Carbon steel / Alloy steel'}
- Codes & Standards: ${standards || 'ASME B31.3 / ASME Sec V / AWS D1.1'}
- Project Location: ${location || 'Cairo / Egypt Site'}
- Urgency / Timeline: ${urgency || 'Standard'}
- Additional Notes: ${additionalNotes || 'N/A'}

Language requested: ${language === 'ar' ? 'Arabic' : 'English'}.

Return ONLY valid JSON with this exact structure:
{
  "reference": "INSCO-RFQ-XXXXX",
  "title": "Short title",
  "serviceType": "${serviceType}",
  "executiveSummary": "Concise summary tailored to INSCO capabilities",
  "technicalScope": ["Point 1", "Point 2", "Point 3", "Point 4"],
  "recommendedMethods": ["Method 1 with Code ref", "Method 2 with Code ref"],
  "requiredEquipment": ["Equipment 1", "Equipment 2"],
  "qualityDeliverables": ["Deliverable 1 (e.g. ITP, Calibration, Charts, Final Report)"],
  "mobilizationTimeframe": "Estimated mobilization",
  "complianceStatement": "Statement citing ISO 9001:2015, CQI-IRCA and ENRRA safety adherence"
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: `${INSCO_KNOWLEDGE_BASE}\nYou are INSCO's Chief Estimation & Technical Operations Manager.`,
        responseMimeType: 'application/json',
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ rfqSummary: parsed });
  } catch (err: any) {
    console.error('Service Messenger error:', err);
    return res.status(500).json({ error: 'Failed to process RFQ inquiry', details: err.message });
  }
});

// 6. Educational Hub & Technical Knowledge Tutor
app.post('/api/ai/educational-tutor', async (req, res) => {
  try {
    const { topic, queryType, level = 'intermediate', language = 'ar' } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        content: language === 'ar'
          ? `الفحوصات غير الإتلافية (NDT) والمعالجة الحرارية (PWHT) هي ركيزة سلامة المنشآت البترولية والصناعية. في شركة إنسكو، نلتزم بتطبيق أدق المواصفات الدولية مثل ASME و API و AWS تحت إشراف مهندسين معتمدين ASNT Level II و CQI-IRCA Lead Auditor.`
          : `Non-Destructive Testing (NDT) and Post-Weld Heat Treatment (PWHT) are fundamental to asset integrity in the petroleum, power, and construction industries. INSCO strictly adheres to ASME, API, and AWS standards.`,
        keyStandards: ['ASME Sec V', 'ASME Sec IX', 'AWS D1.1', 'API 570', 'API 1104', 'ISO 9712']
      });
    }

    const prompt = `
You are the Senior Technical Instructor at the INSCO Engineering & NDT Academy (أكاديمية إنسكو الهندسية لتقنيات الفحص غير الإتلافي والمعالجة الحرارية).
Topic requested: "${topic}"
Query Type: "${queryType}"
Target Level: "${level}"
Language: ${language === 'ar' ? 'Arabic' : 'English'}

Provide an in-depth, rich, accurate engineering explanation with:
1. Physical Principle & Technical Theory
2. Relevant International Codes & Standards (ASME, ASTM, API, AWS, ISO)
3. Typical Defects Detected & Acceptance Criteria
4. Step-by-Step Procedure & Safety Controls
5. Practical Field Tips from INSCO Senior Engineers

Format with clear headers and bullet points.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: `${INSCO_KNOWLEDGE_BASE}\nYou are a world-class NDT Level III & Metallurgical Heat Treatment Instructor with 20+ years of QA/QC leadership.`,
      }
    });

    return res.json({ content: response.text });
  } catch (err: any) {
    console.error('Educational Tutor error:', err);
    return res.status(500).json({ error: 'Failed to fetch educational content', details: err.message });
  }
});

// 7. Quick API info
app.get('/api/company-info', (req, res) => {
  res.json({
    name: 'International for Services & Constructions Company (INSCO)',
    nameAr: 'الشركة الدولية للخدمات والمقاولات (إنسكو)',
    established: 2010,
    cr: '209632',
    certOfInc: '3566/2010',
    phones: ['+20 109 077 7202', '+20 122 582 6396'],
    fax: '+20 2 3809 8142',
    email: 'insco50@yahoo.com',
    headOffice: '7-16 Bldg Project Elasliky, Autostrade Way, Maadi, Cairo, Egypt',
    workshop: 'Al Galaa St., Abo El-Nomrous, Giza 12911, Egypt',
    ndtOrgListing: '54161',
    certifications: [
      { code: 'ISO 9001:2015', name: 'Quality Management System', certNo: '24202QMS094', validThrough: '2028-01-15', egacCab: '#120007' },
      { code: 'ISO 14001:2015', name: 'Environmental Management System', certNo: '23402EMS042', validThrough: '2028-01-15', egacCab: '#120007' },
      { code: 'ISO 45001:2018', name: 'Occupational Health & Safety', certNo: '23502OHS063', validThrough: '2028-01-15', egacCab: '#120007' },
      { code: 'CQI-IRCA', name: 'In-house QMS Lead Auditor', certNo: '121 / UDN 27956', validThrough: 'Active' },
      { code: 'ENRRA', name: 'Egyptian Nuclear & Radiological Regulatory Authority License', certNo: 'Licensed', validThrough: 'Active' }
    ],
    fleetSummary: {
      pwhtUnits: 'Extensive Fleet of Automatic 65 kW Heat-Treatment Units with 6-Channel Programmers',
      ndtFleet: 'Gamma Sources (Ir-192, Se-75), X-Ray, UT, PAUT, MT, PT, PMI (XRF), Hardness (Leeb/UCI), Hydrostatic Skids, Roughness, Coating (DFT & Holiday), MFL/EC',
      dependency: '100% Company-Owned Fleet (Zero rental dependency)'
    }
  });
});

// WebSocket Live API voice conversation
const wss = new WebSocketServer({ server: httpServer, path: '/live' });

wss.on('connection', async (clientWs) => {
  const ai = getGeminiClient();
  if (!ai) {
    clientWs.send(JSON.stringify({ text: 'Live API requires GEMINI_API_KEY' }));
    return;
  }

  try {
    const session = await ai.live.connect({
      model: 'gemini-3.8-live',
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
        },
        systemInstruction: `${INSCO_KNOWLEDGE_BASE}\nYou are INSCO's voice consultant. Speak in clear, friendly, and authoritative Arabic or English as addressed. Keep answers concise for voice conversation.`,
      },
      callbacks: {
        onmessage: (message: LiveServerMessage) => {
          const audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
          if (audio) {
            clientWs.send(JSON.stringify({ audio }));
          }
          if (message.serverContent?.interrupted) {
            clientWs.send(JSON.stringify({ interrupted: true }));
          }
        },
      },
    });

    clientWs.on('message', (data) => {
      try {
        const parsed = JSON.parse(data.toString());
        if (parsed.audio) {
          session.sendRealtimeInput({
            audio: { data: parsed.audio, mimeType: 'audio/pcm;rate=16000' },
          });
        }
      } catch (e) {
        console.error('Error processing live audio chunk:', e);
      }
    });

    clientWs.on('close', () => {
      // Session terminates gracefully
    });
  } catch (err: any) {
    console.error('Failed to establish Live API session:', err);
    clientWs.send(JSON.stringify({ error: err.message }));
  }
});

// Frontend Vite integration
async function setupVite() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  httpServer.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`INSCO Engineering Platform running on port ${PORT}`);
  });
}

setupVite();
