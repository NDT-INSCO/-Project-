import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini if key exists
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  aiClient = new GoogleGenAI({ apiKey });
}

// Educational Tutor Route
app.post('/api/ai/educational-tutor', async (req, res) => {
  try {
    const { prompt, language = 'ar', context = '' } = req.body;
    const isAr = language === 'ar';

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (aiClient) {
      const systemInstruction = isAr
        ? `أنت كبير مهندسي واستشاري الفحص غير الإتلافي (NDT Level III) والمعالجة الحرارية (PWHT) في شركة INSCO. قدم إجابات علمية دقيقة مستندة لأكواد ASME Section V, VIII, B31.3 و AWS D1.1 و API 510/570 مع المعادلات الفيزيائية المعتمدة.`
        : `You are the Principal NDT Level III & PWHT Consultant for INSCO Engineering. Provide precise, technical answers grounded in ASME Sec V, VIII, B31.3, AWS D1.1 and API 510/570 with relevant engineering formulas.`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `${prompt}\n\nTechnical Context: ${context || 'General NDT/PWHT Coursework'}`,
        config: {
          systemInstruction,
          temperature: 0.3,
        }
      });

      return res.json({ text: response.text });
    } else {
      // High-quality deterministic fallback response
      const fallbackText = isAr
        ? `[استجابة المنهج الهندسي المعتمد - إنسكو]\nفيما يخص استفسارك: "${prompt}":\nوفقاً لمواصفات ASME Section V Article 4 و AWS D1.1، يتم التحقق من سلامة الوصلة بتطبيق معايير القبول والرفض بدقة. الشقوق ونقص الانصهار مرفوضان بدون أي تسامح (Zero Tolerance). لمعادلات السرعة الصوتية أو حسابات العمر المتبقي، راجع وحدات المنهج وبطاقات الاستذكار السريع.`
        : `[INSCO Engineering Syllabus Guidance]\nRegarding: "${prompt}":\nUnder ASME Section V Article 4 and AWS D1.1, planar defects (cracks, lack of fusion) are strictly rejectable (Zero Tolerance). Review the Quick Flashcards and curriculum modules for specific code formulas and calibration procedures.`;

      return res.json({ text: fallbackText });
    }
  } catch (error: any) {
    console.error('Tutor API error:', error);
    res.status(500).json({ 
      error: 'Failed to process AI response',
      message: error?.message 
    });
  }
});

// Mount Vite or serve static files
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  const server = createServer(app);
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT} (${isProduction ? 'production' : 'development'})`);
  });
}

startServer();
