import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, X, PhoneCall, Radio, Sparkles, Activity } from 'lucide-react';
import { Language } from '../types';
import { AnimatedEngineerAvatar } from './AnimatedEngineerAvatar';

interface LiveVoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const LiveVoiceModal: React.FC<LiveVoiceModalProps> = ({ isOpen, onClose, language }) => {
  const isAr = language === 'ar';
  const [isConnected, setIsConnected] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);

  useEffect(() => {
    if (isOpen) {
      startLiveSession();
    } else {
      stopLiveSession();
    }

    return () => {
      stopLiveSession();
    };
  }, [isOpen]);

  const startLiveSession = async () => {
    setErrorMsg(null);
    try {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/live`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = async () => {
        setIsConnected(true);
        await initAudioRecording(ws);
      };

      ws.onmessage = async (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.audio) {
            playAudioChunk(data.audio);
          }
          if (data.interrupted) {
            // Stop current playback if model got interrupted
          }
          if (data.error) {
            setErrorMsg(data.error);
          }
        } catch (e) {
          console.error('Error handling live message:', e);
        }
      };

      ws.onerror = (e) => {
        console.error('WebSocket error:', e);
        setErrorMsg(isAr ? 'تعذر الاتصال بخدمة الصوت الحي. تأكد من تفعيل السيرفر ومفتاح API.' : 'Live audio session disconnected.');
        setIsConnected(false);
      };

      ws.onclose = () => {
        setIsConnected(false);
        setIsTalking(false);
      };
    } catch (err: any) {
      console.error('Error starting live session:', err);
      setErrorMsg(err.message);
    }
  };

  const initAudioRecording = async (ws: WebSocket) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
        },
      });
      mediaStreamRef.current = stream;

      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 16000,
      });
      audioContextRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      const processor = audioCtx.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      processor.onaudioprocess = (e) => {
        if (ws.readyState === WebSocket.OPEN) {
          const inputData = e.inputBuffer.getChannelData(0);
          // Convert Float32 to Int16 PCM
          const pcm16 = new Int16Array(inputData.length);
          for (let i = 0; i < inputData.length; i++) {
            const s = Math.max(-1, Math.min(1, inputData[i]));
            pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
          }
          const base64 = btoa(
            String.fromCharCode.apply(null, Array.from(new Uint8Array(pcm16.buffer)))
          );
          ws.send(JSON.stringify({ audio: base64 }));
        }
      };

      source.connect(processor);
      processor.connect(audioCtx.destination);
      setIsTalking(true);
    } catch (err: any) {
      console.error('Mic access error:', err);
      setErrorMsg(isAr ? 'يرجى السماح بالوصول إلى الميكروفون للتحدث.' : 'Microphone permission required for voice conversation.');
    }
  };

  const playAudioChunk = (base64Audio: string) => {
    try {
      const binaryString = atob(base64Audio);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Check for playback audio context (24kHz)
      const playbackCtx = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 24000,
      });

      const int16 = new Int16Array(bytes.buffer);
      const float32 = new Float32Array(int16.length);
      for (let i = 0; i < int16.length; i++) {
        float32[i] = int16[i] / 32768.0;
      }

      const audioBuffer = playbackCtx.createBuffer(1, float32.length, 24000);
      audioBuffer.getChannelData(0).set(float32);

      const source = playbackCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(playbackCtx.destination);
      source.start(0);
    } catch (e) {
      console.error('Playback error:', e);
    }
  };

  const stopLiveSession = () => {
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setIsConnected(false);
    setIsTalking(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-gradient-to-b from-[#141838] via-[#0f1128] to-[#0a0b18] border-2 border-amber-500/60 rounded-3xl max-w-md w-full p-6 text-center shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 end-4 p-2 rounded-full bg-[#1b2048] text-slate-400 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-400 text-xs font-mono-code font-bold mb-4">
          <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
          <span>GEMINI 3.8 LIVE AUDIO API</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-white mb-1">
          {isAr ? 'المحادثة الصوتية الحية المباشرة' : 'Real-time Live Audio Session'}
        </h3>
        <p className="text-xs text-slate-300 max-w-xs mx-auto mb-8">
          {isAr
            ? 'تحدث بصوتك مباشرة مع المستشار الهندسي لشركة إنسكو، واسمع الإجابة في الوقت الفعلي.'
            : 'Speak naturally with INSCO Senior Engineer and receive low-latency vocal responses.'}
        </p>

        {/* Pulsing Visual Wave with Animated Engineer Emerging from Gear */}
        <div className="relative mb-6 flex flex-col items-center justify-center">
          <div className={`absolute w-36 h-36 rounded-full bg-gradient-to-tr from-amber-500 to-indigo-600 opacity-25 blur-xl pointer-events-none ${isTalking ? 'animate-ping' : ''}`}></div>
          <AnimatedEngineerAvatar size="card" language={language} className={isTalking ? 'scale-110 transition-transform duration-300' : 'scale-100 transition-transform duration-300'} />
          <div className="mt-2 text-[11px] text-amber-300 font-bold flex items-center gap-1.5">
            <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span>{isTalking ? (isAr ? 'المهندس يتحدث معك الآن...' : 'Engineer is speaking...') : (isAr ? 'المهندس يستمع ويدون ملاحظاتك...' : 'Listening & documenting...')}</span>
          </div>
        </div>

        {/* Audio Wave Indicators */}
        <div className="flex justify-center items-center gap-1.5 h-8 mb-6">
          {[40, 70, 30, 90, 60, 100, 50, 80, 45, 95].map((h, i) => (
            <div
              key={i}
              className="w-1 bg-gradient-to-t from-amber-500 to-amber-300 rounded-full transition-all duration-150"
              style={{
                height: isTalking ? `${h}%` : '15%',
              }}
            ></div>
          ))}
        </div>

        {errorMsg && (
          <div className="text-xs text-rose-300 bg-rose-950/40 border border-rose-500/30 p-2.5 rounded-xl mb-4">
            {errorMsg}
          </div>
        )}

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => {
              if (isConnected) stopLiveSession();
              else startLiveSession();
            }}
            className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer ${
              isConnected
                ? 'bg-rose-600 hover:bg-rose-500 text-white'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
            }`}
          >
            {isConnected ? (
              <>
                <MicOff className="w-4 h-4" />
                <span>{isAr ? 'إنهاء المكالمة' : 'End Voice Call'}</span>
              </>
            ) : (
              <>
                <PhoneCall className="w-4 h-4" />
                <span>{isAr ? 'بدء المكالمة' : 'Start Voice Call'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
