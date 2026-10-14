import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Modality, LiveServerMessage, GenerateVideosOperation } from '@google/genai';

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

// 1. Advisor endpoint (supports complex reasoning with gemini-3.8-flash)
app.post('/api/ai/advisor', async (req, res) => {
  try {
    const { message, chatHistory, language = 'ar', modelChoice } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        reply: language === 'ar'
          ? `أهلاً بك في شركة إنسكو (INSCO). نحن رواد الفحوصات غير الإتلافية (NDT) والمعالجة الحرارية (PWHT) في مصر والشرق الأوسط، حاصلون على ثلاث شهادات آيزو (ISO 9001, 14001, 45001) وترخيص الهيئة المصرية للرقابة النووية والإشعاعية (ENRRA)، ونمتلك أسطولاً متكاملاً وواسعاً من وحدات المعالجة الحرارية الأوتوماتيكية بقدرة 65 كيلووات وأجهزة NDT المتقدمة. كيف يمكن لمهندسينا خدمتك اليوم؟`
          : `Welcome to INSCO - International for Services & Constructions Company. We are industry leaders in Non-Destructive Testing (NDT), Post-Weld Heat Treatment (PWHT), and certified welding services across Egypt and internationally, backed by triple ISO accreditation (9001/14001/45001), ENRRA radiation licensing, and a comprehensive fleet of automatic 65 kW PWHT units and NDT instruments. How may our engineering team assist you today?`,
        suggestedActions: [
          { label: language === 'ar' ? 'طلب عرض سعر فوري' : 'Request Instant RFQ', action: 'open_rfq' },
          { label: language === 'ar' ? 'استعراض أسطول المعدات' : 'View Owned Fleet', action: 'view_fleet' },
          { label: language === 'ar' ? 'الأكاديمية والتدريب الفني' : 'NDT Academy', action: 'open_academy' }
        ]
      });
    }

    const systemInstruction = `
${INSCO_KNOWLEDGE_BASE}
User Communication Goal:
You are interacting with industrial clients, contractors, QA/QC managers, procurement heads, and engineering students.
Respond politely, authoritatively, and professionally in ${language === 'ar' ? 'Arabic (اللغة العربية الفصحى الهندسية)' : 'English'}.
Highlight INSCO's genuine strengths:
- 100% company-owned equipment (zero rental market delays).
- Mobilization speed across all Egyptian governorates and international sites.
- Strict compliance with ASME, API, AWS, ISO, and ENRRA safety regulations.
- Complete scope under one management: NDT + Heat Treatment + Welding Crews + QA/QC documentation.
- At the end of helpful technical advice, suggest 2 or 3 quick next steps.
Keep responses clear, concise, and structured with bullet points.
`;

    const contents = [];
    if (Array.isArray(chatHistory)) {
      for (const turn of chatHistory.slice(-8)) {
        contents.push({
          role: turn.sender === 'user' ? 'user' : 'model',
          parts: [{ text: turn.text }]
        });
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    // Support gemini-3.8-flash or fast model
    const selectedModel = modelChoice === 'fast' ? 'gemini-3.1-flash-lite' : 'gemini-3.8-flash';

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return res.json({ reply: response.text || '' });
  } catch (err: any) {
    console.error('Advisor error:', err);
    return res.status(500).json({ error: 'Advisor service unavailable', details: err.message });
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
