import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  User, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  MessageSquare, 
  Phone, 
  ArrowUpRight, 
  Flame, 
  Shield, 
  RefreshCw,
  Mic,
  MicOff,
  Globe,
  MapPin,
  Radio,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { Language, ChatMessage } from '../types';
import { COMPANY_DETAILS } from '../data/inscoData';
import { LiveVoiceModal } from './LiveVoiceModal';

interface AiCustomerPlatformProps {
  language: Language;
  onOpenMessengerWithQuery?: (query: string) => void;
}

export const AiCustomerPlatform: React.FC<AiCustomerPlatformProps> = ({
  language,
  onOpenMessengerWithQuery
}) => {
  const isAr = language === 'ar';
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: isAr
        ? `أهلاً بك في منصة الاستشارات الهندسية التفاعلية لشركة إنسكو (INSCO). أنا المستشار الهندسي الذكي للشركة، جاهز للإجابة على استفساراتك الفنية حول الفحوصات غير الإتلافية (NDT)، المعالجة الحرارية بعد اللحام (PWHT)، معايير أكواد ASME / API / AWS، وجاهزية أسطولنا المملوك بالكامل. يمكنك الكتابة، التحدث بالميكروفون، أو استخدام المكالمة الصوتية المباشرة!`
        : `Welcome to the INSCO Interactive Engineering Consultation Platform. I am your specialized AI engineering consultant, ready to answer your technical inquiries regarding NDT methods, PWHT cycles, ASME / API / AWS standards, and our 100% company-owned fleet. You can type, speak with microphone, or start a live voice call!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedActions: [
        { label: isAr ? 'قدرات أسطول PWHT الأوتوماتيكي' : 'PWHT Fleet Capabilities', action: 'query', payload: 'ما هي مواصفات وقدرات أسطول وحدات المعالجة الحرارية PWHT التابعة لإنسكو؟' },
        { label: isAr ? 'الفارق بين PAUT و RT' : 'PAUT vs RT Comparison', action: 'query', payload: 'ما هو الفارق بين فحص Phased Array UT والفحص الإشعاعي RT ومتى يفضل استخدام كل منهما؟' },
        { label: isAr ? 'شهادات الآيزو والتراخيص' : 'ISO Accreditations', action: 'query', payload: 'ما هي أرقام شهادات الآيزو وتراخيص شركة إنسكو الرسمية؟' }
      ]
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [activeGrounding, setActiveGrounding] = useState<'none' | 'search' | 'maps'>('none');
  const [isLiveModalOpen, setIsLiveModalOpen] = useState(false);
  const [groundingSources, setGroundingSources] = useState<any[]>([]);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = isAr ? [
    'ما هي معايير قبول الشروخ طبقاً لكود ASME B31.3؟',
    'ما هي مواصفات وقدرات أسطول وحدات PWHT التابعة لإنسكو؟',
    'هل تقدمون عمالة لحام معتمدة طبقاً لـ ASME IX و AWS D1.1؟',
    'ما هي شروط واحتياطات السلامة الإشعاعية لترخيص ENRRA لديكم؟',
    'أين تقع مواقع وورش شركة إنسكو وأقرب محطات الطاقة التي خدمتها؟'
  ] : [
    'What are crack acceptance criteria per ASME B31.3?',
    'What are the specifications of INSCO\'s PWHT fleet?',
    'Do you supply certified welders qualified to ASME IX & AWS D1.1?',
    'How do you manage radiation safety under your ENRRA license?',
    'Where are INSCO headquarters and serviced facilities located?'
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Audio Recording & Gemini 3.5 Transcribe
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = (reader.result as string).split(',')[1];
          await transcribeAudio(base64Audio);
        };
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Mic access error:', err);
      alert(isAr ? 'يرجى السماح بالوصول للميكروفون' : 'Please allow microphone access');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const transcribeAudio = async (base64Audio: string) => {
    setIsTranscribing(true);
    try {
      const res = await fetch('/api/ai/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audioBase64: base64Audio, mimeType: 'audio/webm' }),
      });
      const data = await res.json();
      if (data.text) {
        setInputText(prev => (prev ? `${prev} ${data.text}` : data.text));
      }
    } catch (err) {
      console.error('Transcription error:', err);
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    setGroundingSources([]);

    try {
      let endpoint = '/api/ai/advisor';
      let body: any = {
        message: text,
        chatHistory: messages.slice(-5),
        language
      };

      if (activeGrounding !== 'none') {
        endpoint = '/api/ai/grounded-consult';
        body = {
          query: text,
          type: activeGrounding,
          language
        };
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error('Server returned error');
      }

      const data = await response.json();
      const replyText = data.reply || data.text || (isAr ? 'تم معالجة استفسارك بنجاح.' : 'Inquiry processed.');
      
      if (data.groundingChunks) {
        setGroundingSources(data.groundingChunks);
      }

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: [
          { label: isAr ? 'طلب عرض سعر بهذا الخصوص' : 'Request Quotation', action: 'open_rfq', payload: text },
          { label: isAr ? 'محادثة عبر واتساب مباشر' : 'WhatsApp Us Directly', action: 'whatsapp' }
        ]
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('Advisor fetch error:', err);
      const fallbackMsg: ChatMessage = {
        id: `bot-fallback-${Date.now()}`,
        sender: 'assistant',
        text: isAr
          ? `بناءً على سجلات شركة إنسكو (INSCO): نمتلك أسطولاً متكاملاً وواسعاً من وحدات المعالجة الحرارية الأوتوماتيكية 65 kW جاهزة للتحرك الفوري من مستودعات القاهرة والجيزة، بالإضافة لأسطول NDT متكامل يضم مصادر جاما (Ir-192 / Se-75) وأجهزة PAUT ومحللات XRF. جميع الأعمال تخضع لإشراف كبير مراجعين CQI-IRCA وفاحصين ASNT Level II مع شهادات آيزو 9001/14001/45001 سارية حتى 2028. يمكنك التواصل معنا مباشرة على +20 109 077 7202.`
          : `INSCO operates a comprehensive, company-owned fleet of 65 kW automatic PWHT units stored in Cairo/Giza and an extensive NDT fleet (PAUT, RT Ir-192/Se-75, UT, MT, PT, PMI XRF). All works are supervised under our triple ISO-certified system (through 2028), in-house CQI-IRCA lead auditor, and ENRRA radiation licensing. You can contact us directly at +20 109 077 7202.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: [
          { label: isAr ? 'طلب عرض سعر' : 'Request RFQ', action: 'open_rfq', payload: text },
          { label: isAr ? 'واتساب' : 'WhatsApp', action: 'whatsapp' }
        ]
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = isAr ? 'ar-SA' : 'en-US';
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleActionClick = (action: string, payload?: any) => {
    if (action === 'query' && payload) {
      handleSendMessage(payload);
    } else if (action === 'open_rfq') {
      if (onOpenMessengerWithQuery) {
        onOpenMessengerWithQuery(payload || '');
      }
    } else if (action === 'whatsapp') {
      const msg = encodeURIComponent(`السلام عليكم، أتواصل معكم بخصوص استفسار عن خدمات شركة إنسكو الهندسية (NDT / PWHT).`);
      window.open(`https://wa.me/201090777202?text=${msg}`, '_blank');
    }
  };

  return (
    <section className="py-16 md:py-20 bg-[#0b0c1a] border-b border-[#21264c]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-400 font-bold text-xs uppercase tracking-wider mb-3">
            <Bot className="w-4 h-4 animate-bounce" />
            <span>{isAr ? 'المنصة التفاعلية متعددة الوسائط' : 'MULTI-MODAL INTERACTIVE PLATFORM'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {isAr ? (
              <>
                استشارات هندسية ذكية <span className="text-amber-400">بالصوت والنص والبحث المباشر</span>
              </>
            ) : (
              <>
                Smart AI Engineering <span className="text-amber-400">With Voice, Search & Maps</span>
              </>
            )}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            {isAr
              ? 'محادثة كتابية وصوتية، بحث متصل بكودات ASME وخرائط Google Maps لتحديد مواقع المحطات ومستودعات إنسكو.'
              : 'Multi-turn chat, speech transcription, Google Search/Maps grounding, and real-time live voice calls.'}
          </p>
        </div>

        {/* Feature Switches Bar (Live Voice, Search Grounding, Maps) */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 bg-[#11142e] p-3 rounded-2xl border border-[#212754]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 me-1">
              {isAr ? 'أدوات الذكاء الاصطناعي المتقدمة:' : 'Advanced Grounding:'}
            </span>

            <button
              onClick={() => setActiveGrounding(activeGrounding === 'search' ? 'none' : 'search')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                activeGrounding === 'search'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                  : 'bg-[#15193d] text-slate-300 border-[#252c61] hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span>{isAr ? 'بحث Google المباشر في الكودات' : 'Google Search Grounding'}</span>
            </button>

            <button
              onClick={() => setActiveGrounding(activeGrounding === 'maps' ? 'none' : 'maps')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                activeGrounding === 'maps'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                  : 'bg-[#15193d] text-slate-300 border-[#252c61] hover:text-white'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>{isAr ? 'خرائط المواقع والمحطات (Google Maps)' : 'Google Maps Grounding'}</span>
            </button>
          </div>

          <button
            onClick={() => setIsLiveModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs sm:text-sm shadow-md transition cursor-pointer"
          >
            <Radio className="w-4 h-4 animate-pulse" />
            <span>{isAr ? 'محادثة صوتية حية (Gemini Live)' : 'Start Live Voice Call'}</span>
          </button>
        </div>

        {/* Main Chat Container */}
        <div className="bg-[#11132b] rounded-2xl border-2 border-amber-500/40 shadow-2xl overflow-hidden flex flex-col h-[650px]">
          {/* Chat Top Bar */}
          <div className="bg-[#161938] px-5 py-3.5 border-b border-[#232958] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center font-bold shadow-md">
                <Bot className="w-6 h-6" />
                <span className="absolute -bottom-0.5 -end-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#161938] rounded-full"></span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">
                    {isAr ? 'مستشار إنسكو الهندسي الذكي' : 'INSCO Engineering AI Advisor'}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                    {isAr ? 'متصل الآن' : 'Online'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  {activeGrounding === 'search'
                    ? (isAr ? 'متصل بـ Google Search للكودات والمواصفات' : 'Connected to Google Search Grounding')
                    : activeGrounding === 'maps'
                    ? (isAr ? 'متصل بـ Google Maps للمواقع والمحطات' : 'Connected to Google Maps Grounding')
                    : (isAr ? 'مرجع معتمد لـ ASME, API, AWS, ISO, ENRRA' : 'ASME, API, AWS, ISO & ENRRA Grounded')}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/201090777202"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition"
              >
                <Phone className="w-3 h-3" />
                <span>WhatsApp</span>
              </a>
              <button
                onClick={() => setMessages([messages[0]])}
                className="p-1.5 rounded-lg bg-[#101228] text-slate-400 hover:text-white transition cursor-pointer"
                title={isAr ? 'إعادة ضبط المحادثة' : 'Reset chat'}
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#0a0c1a]/95">
            {messages.map((msg) => {
              const isAssistant = msg.sender === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[88%] sm:max-w-[80%] ${
                    isAssistant ? 'ms-0 me-auto' : 'ms-auto me-0 flex-row-reverse'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                      isAssistant
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-indigo-600 text-white'
                    }`}
                  >
                    {isAssistant ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  <div className="space-y-2">
                    <div
                      className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isAssistant
                          ? 'bg-[#141738] text-slate-200 border border-[#232958] shadow-md'
                          : 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-medium rounded-br-none shadow-md'
                      }`}
                    >
                      <div className="whitespace-pre-line">{msg.text}</div>
                    </div>

                    {/* Metadata & Quick Action bar for assistant messages */}
                    {isAssistant && (
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="text-[10px] text-slate-500 font-mono-code">{msg.timestamp}</span>

                        <button
                          onClick={() => speakText(msg.text)}
                          className="text-[11px] text-slate-400 hover:text-amber-400 flex items-center gap-1 transition cursor-pointer"
                          title="قراءة صوتية للرد"
                        >
                          {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-amber-400" /> : <Volume2 className="w-3.5 h-3.5" />}
                          <span className="hidden sm:inline">{isAr ? 'استماع' : 'Listen'}</span>
                        </button>

                        <button
                          onClick={() => copyToClipboard(msg.text, msg.id)}
                          className="text-[11px] text-slate-400 hover:text-amber-400 flex items-center gap-1 transition cursor-pointer"
                          title="نسخ النص"
                        >
                          {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span className="hidden sm:inline">{copiedId === msg.id ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'نسخ' : 'Copy')}</span>
                        </button>
                      </div>
                    )}

                    {/* Suggested follow-up buttons */}
                    {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {msg.suggestedActions.map((act, i) => (
                          <button
                            key={i}
                            onClick={() => handleActionClick(act.action, act.payload)}
                            className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[#181d45] hover:bg-amber-500 hover:text-slate-950 text-amber-300 border border-amber-500/30 transition flex items-center gap-1 cursor-pointer"
                          >
                            <span>{act.label}</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-3 max-w-[80%] items-center text-slate-400 text-xs">
                <div className="w-8 h-8 rounded-lg bg-[#141738] flex items-center justify-center border border-[#232958]">
                  <Bot className="w-4 h-4 text-amber-400 animate-spin" />
                </div>
                <div className="bg-[#141738] p-3 rounded-2xl border border-[#232958] flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]"></div>
                  <span className="ms-1 font-mono-code text-[11px] text-slate-400">
                    {isAr ? 'جاري تحليل الأكواد والبيانات الهندسية...' : 'Consulting engineering standards & INSCO fleet...'}
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick prompt suggestions carousel */}
          <div className="px-4 py-2 bg-[#0e1024] border-t border-[#1d224b] overflow-x-auto flex items-center gap-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex-shrink-0">
              {isAr ? 'أسئلة شائعة:' : 'Quick Prompts:'}
            </span>
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="text-[11px] text-slate-300 hover:text-amber-300 hover:bg-[#1a1f48] px-2.5 py-1 rounded-md bg-[#131633] border border-[#212754] flex-shrink-0 transition cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box with Voice Mic Transcription */}
          <div className="p-4 bg-[#141838] border-t border-[#232958]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              {/* Mic audio transcription button */}
              <button
                type="button"
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isTranscribing}
                className={`p-3 rounded-xl border transition cursor-pointer ${
                  isRecording
                    ? 'bg-rose-600 text-white border-rose-400 animate-pulse'
                    : isTranscribing
                    ? 'bg-amber-500/20 text-amber-300 border-amber-400'
                    : 'bg-[#0b0c1b] text-slate-300 border-[#272e63] hover:text-amber-400'
                }`}
                title={isRecording ? (isAr ? 'إيقاف التسجيل الصوتي' : 'Stop recording') : (isAr ? 'تحدث بالميكروفون (تحويل الصوت لنص)' : 'Speech to text')}
              >
                {isTranscribing ? (
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                ) : isRecording ? (
                  <MicOff className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  isRecording
                    ? (isAr ? 'جاري الاستماع... تحدث الآن...' : 'Listening... Speak now...')
                    : isTranscribing
                    ? (isAr ? 'جاري تحويل الصوت إلى نص بواسطة Gemini 3.5 Transcribe...' : 'Transcribing audio...')
                    : (isAr ? 'اكتب سؤالك الهندسي أو اضغط على الميكروفون للتحدث...' : 'Type engineering question or click mic to speak...')
                }
                className="flex-1 bg-[#0b0c1b] border border-[#272e63] focus:border-amber-400 text-white text-xs sm:text-sm px-4 py-3 rounded-xl focus:outline-none transition"
              />

              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-slate-950 font-bold transition flex items-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">{isAr ? 'إرسال' : 'Send'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Live Voice Modal */}
      <LiveVoiceModal
        isOpen={isLiveModalOpen}
        onClose={() => setIsLiveModalOpen(false)}
        language={language}
      />
    </section>
  );
};
