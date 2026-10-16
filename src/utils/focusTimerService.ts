// INSCO Educational Academy Focus Study Timer Service
// Tracks active study sessions for NDT & PWHT disciplines, Pomodoro intervals, and study analytics

export type FocusTimerMode = 'pomodoro' | 'short_break' | 'long_break' | 'deep_study' | 'stopwatch';

export interface StudySessionRecord {
  id: string;
  disciplineId: string;
  disciplineName: { ar: string; en: string };
  moduleId?: string;
  moduleTitle?: { ar: string; en: string };
  mode: FocusTimerMode;
  durationSeconds: number; // actual elapsed study seconds
  targetMinutes: number; // planned minutes (e.g. 25, 45, 60, 0 for stopwatch)
  completed: boolean; // reached target
  timestamp: string; // ISO
  dateStr: string; // YYYY-MM-DD
  notes?: string;
}

export interface ActiveTimerState {
  isRunning: boolean;
  isPaused: boolean;
  mode: FocusTimerMode;
  targetSeconds: number;
  remainingSeconds: number;
  elapsedSeconds: number;
  startedAtTimestamp?: number;
  lastTickTimestamp?: number;
  disciplineId: string;
  disciplineName: { ar: string; en: string };
  moduleId?: string;
  moduleTitle?: { ar: string; en: string };
  notes?: string;
  pomodoroCycleCount: number; // completed cycles in current series
  soundEnabled: boolean;
  ambientNoiseEnabled: boolean;
}

const STORAGE_KEY_SESSIONS = 'insco_academy_study_sessions';
const STORAGE_KEY_ACTIVE_TIMER = 'insco_academy_active_focus_timer';
export const FOCUS_TIMER_EVENT = 'insco_academy_focus_timer_event';
export const FOCUS_SESSION_COMPLETED_EVENT = 'insco_academy_focus_session_completed';

// Audio Context Singleton for sound effects and ambient focus sound
let audioCtx: AudioContext | null = null;
let ambientNoiseNode: AudioNode | null = null;
let ambientGainNode: GainNode | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtxClass) {
      audioCtx = new AudioCtxClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * High-fidelity Web Audio API synth chimes for timer triggers
 */
export function playFocusSound(type: 'start' | 'pause' | 'complete' | 'tick' | 'break') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    if (type === 'start') {
      // Pleasant dual-tone ascent
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);
        gain.gain.setValueAtTime(0, now + idx * 0.09);
        gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.09 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.38);
      });
    } else if (type === 'complete') {
      // Harmonic celebration chime (C5 chord resolving to high C6)
      const chord = [523.25, 659.25, 783.99, 1046.5];
      chord.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0, now + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.22, now + idx * 0.06 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 1.25);
      });
    } else if (type === 'break') {
      // Soft calming bell
      [440, 554.37].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);
        gain.gain.setValueAtTime(0, now + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.15, now + idx * 0.12 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.85);
      });
    } else if (type === 'pause') {
      // Descending mellow tone
      [659.25, 523.25].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.28);
      });
    }
  } catch (err) {
    console.warn('Audio playback error:', err);
  }
}

/**
 * Toggles synthesized deep ambient focus noise (calming pink/brownian background)
 */
export function toggleAmbientNoise(enable: boolean, volume = 0.04) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (!enable) {
      if (ambientNoiseNode) {
        try {
          (ambientNoiseNode as AudioBufferSourceNode).stop();
          ambientNoiseNode.disconnect();
        } catch {
          // ignore
        }
        ambientNoiseNode = null;
      }
      return;
    }

    if (ambientNoiseNode) return; // already running

    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;

    // Generate Brownian / Pink noise
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5; // gain compensation
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to soft warm frequencies (sub-500Hz)
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, ctx.currentTime);

    ambientGainNode = ctx.createGain();
    ambientGainNode.gain.setValueAtTime(volume, ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(ambientGainNode);
    ambientGainNode.connect(ctx.destination);

    whiteNoise.start();
    ambientNoiseNode = whiteNoise;
  } catch (err) {
    console.warn('Ambient noise error:', err);
  }
}

/**
 * Retrieves all stored completed study sessions
 */
export function getStoredStudySessions(): StudySessionRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SESSIONS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.warn('Failed to parse study sessions:', err);
    return [];
  }
}

/**
 * Saves a completed study session
 */
export function saveStudySession(session: Omit<StudySessionRecord, 'id' | 'timestamp' | 'dateStr'>): StudySessionRecord {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const newRecord: StudySessionRecord = {
    ...session,
    id: `session_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: now.toISOString(),
    dateStr
  };

  try {
    const list = getStoredStudySessions();
    const updated = [newRecord, ...list].slice(0, 500); // keep up to 500 records
    localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(updated));

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(FOCUS_SESSION_COMPLETED_EVENT, { detail: newRecord }));
    }
  } catch (err) {
    console.warn('Failed to save study session:', err);
  }

  return newRecord;
}

/**
 * Clears or resets session history
 */
export function clearStudySessions(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_SESSIONS);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(FOCUS_SESSION_COMPLETED_EVENT));
    }
  } catch (err) {
    console.warn('Failed to clear sessions:', err);
  }
}

export interface FocusStats {
  todaySeconds: number;
  totalSeconds: number;
  totalSessions: number;
  completedSessions: number;
  currentStreakDays: number;
  disciplineBreakdown: {
    disciplineId: string;
    disciplineName: { ar: string; en: string };
    seconds: number;
    sessionsCount: number;
  }[];
  recentSessions: StudySessionRecord[];
}

/**
 * Calculates study statistics and streaks
 */
export function calculateFocusStats(): FocusStats {
  const sessions = getStoredStudySessions();
  const todayStr = new Date().toISOString().split('T')[0];

  let todaySeconds = 0;
  let totalSeconds = 0;
  let completedCount = 0;

  const disciplineMap: Record<string, { disciplineName: { ar: string; en: string }; seconds: number; sessionsCount: number }> = {};

  const uniqueDays = new Set<string>();

  sessions.forEach(s => {
    totalSeconds += s.durationSeconds;
    if (s.dateStr === todayStr) {
      todaySeconds += s.durationSeconds;
    }
    if (s.completed) {
      completedCount++;
    }
    uniqueDays.add(s.dateStr);

    const dKey = s.disciplineId || 'general_ndt';
    if (!disciplineMap[dKey]) {
      disciplineMap[dKey] = {
        disciplineName: s.disciplineName || { ar: 'دراسة هندسية عامة', en: 'General NDT Study' },
        seconds: 0,
        sessionsCount: 0
      };
    }
    disciplineMap[dKey].seconds += s.durationSeconds;
    disciplineMap[dKey].sessionsCount += 1;
  });

  // Calculate streak
  let streak = 0;
  const d = new Date();
  while (true) {
    const dStr = d.toISOString().split('T')[0];
    if (uniqueDays.has(dStr)) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else {
      // If today has no sessions yet, check yesterday before ending streak
      if (streak === 0 && dStr === todayStr) {
        d.setDate(d.getDate() - 1);
        const yStr = d.toISOString().split('T')[0];
        if (uniqueDays.has(yStr)) {
          streak++;
          d.setDate(d.getDate() - 1);
          continue;
        }
      }
      break;
    }
  }

  const disciplineBreakdown = Object.entries(disciplineMap)
    .map(([id, data]) => ({
      disciplineId: id,
      disciplineName: data.disciplineName,
      seconds: data.seconds,
      sessionsCount: data.sessionsCount
    }))
    .sort((a, b) => b.seconds - a.seconds);

  return {
    todaySeconds,
    totalSeconds,
    totalSessions: sessions.length,
    completedSessions: completedCount,
    currentStreakDays: streak,
    disciplineBreakdown,
    recentSessions: sessions.slice(0, 10)
  };
}

/**
 * Format seconds to MM:SS or HH:MM:SS
 */
export function formatTimerSeconds(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  const hrs = Math.floor(s / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;

  if (hrs > 0) {
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function formatDurationHuman(seconds: number, isAr: boolean): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);

  if (hrs > 0 && mins > 0) {
    return isAr ? `${hrs} ساعة و ${mins} دقيقة` : `${hrs}h ${mins}m`;
  }
  if (hrs > 0) {
    return isAr ? `${hrs} ساعة` : `${hrs}h`;
  }
  return isAr ? `${mins} دقيقة` : `${mins}m`;
}
