import { 
  collection, 
  getDocs, 
  setDoc, 
  doc, 
  query, 
  orderBy, 
  limit, 
  onSnapshot 
} from 'firebase/firestore';
import { db } from '../firebase/config';

export interface LeaderboardEntry {
  id: string;
  userId?: string;
  userName: string;
  userRole?: string;
  company?: string;
  country?: string; // Country ISO code or name e.g. 'SA', 'AE', 'EG', 'KW', 'QA', 'OM'
  disciplineId: string;
  disciplineTitleAr: string;
  disciplineTitleEn: string;
  levelId: string;
  levelTitleAr: string;
  levelTitleEn: string;
  score: number; // Percentage e.g. 100, 95
  correctCount: number;
  totalQuestions: number;
  timeSpentSeconds?: number;
  badgeTier: 'platinum' | 'gold' | 'silver' | 'bronze';
  completedAt: string; // ISO date string
  isCurrentUser?: boolean;
}

export const LEADERBOARD_UPDATE_EVENT = 'insco_quiz_leaderboard_updated';
const STORAGE_KEY_LEADERBOARD = 'insco_academy_local_leaderboard';

/**
 * Benchmark industry seed entries representing verified industrial NDT/PWHT engineers
 */
export const SEED_LEADERBOARD_ENTRIES: LeaderboardEntry[] = [
  {
    id: 'seed_eng_1',
    userName: 'م. طارق الغامدي (Eng. Tariq Al-Ghamdi)',
    userRole: 'Senior PWHT & Metallurgy Specialist',
    company: 'Saudi Aramco / INSCO Affiliate',
    country: 'SA',
    disciplineId: 'pwht',
    disciplineTitleAr: 'المعالجة الحرارية بعد اللحام PWHT',
    disciplineTitleEn: 'Post Weld Heat Treatment (PWHT)',
    levelId: 'level3',
    levelTitleAr: 'خبير واستشاري معالجة حرارية (Level III)',
    levelTitleEn: 'Senior Thermal Specialist (Level III)',
    score: 100,
    correctCount: 20,
    totalQuestions: 20,
    timeSpentSeconds: 168, // 2m 48s
    badgeTier: 'platinum',
    completedAt: new Date(Date.now() - 2 * 86400000).toISOString()
  },
  {
    id: 'seed_eng_2',
    userName: 'م. فاطمة الزهراني (Eng. Fatima Al-Zahrani)',
    userRole: 'ASNT Level III Ultrasonic Expert',
    company: 'SABIC Petrochemicals',
    country: 'SA',
    disciplineId: 'ut_paut',
    disciplineTitleAr: 'الموجات فوق الصوتية المتقدمة (UT & PAUT)',
    disciplineTitleEn: 'Advanced Ultrasonic (UT, PAUT & TOFD)',
    levelId: 'level3',
    levelTitleAr: 'استشاري الموجات الصوتية والفحص المتقدم (Level III)',
    levelTitleEn: 'Phased Array Level III Consultant',
    score: 100,
    correctCount: 20,
    totalQuestions: 20,
    timeSpentSeconds: 195, // 3m 15s
    badgeTier: 'platinum',
    completedAt: new Date(Date.now() - 3 * 86400000).toISOString()
  },
  {
    id: 'seed_eng_3',
    userName: 'م. مصطفى السيد (Eng. Mostafa El-Sayed)',
    userRole: 'Radiographic Interpretation Lead (RT Level II)',
    company: 'Petrojet / SUMED Pipelines',
    country: 'EG',
    disciplineId: 'rt',
    disciplineTitleAr: 'التصوير الإشعاعي الهندسي (RT)',
    disciplineTitleEn: 'Industrial Radiographic Testing (RT)',
    levelId: 'level2',
    levelTitleAr: 'فاحص ومحلل أفلام معتمد (ASNT Level II)',
    levelTitleEn: 'Certified Radiographic Inspector (Level II)',
    score: 95,
    correctCount: 19,
    totalQuestions: 20,
    timeSpentSeconds: 210, // 3m 30s
    badgeTier: 'gold',
    completedAt: new Date(Date.now() - 4 * 86400000).toISOString()
  },
  {
    id: 'seed_eng_4',
    userName: 'م. خالد المنصوري (Eng. Khaled Al-Mansouri)',
    userRole: 'Lead Welding & Inspection Engineer',
    company: 'ADNOC Gas Processing',
    country: 'AE',
    disciplineId: 'metallurgy',
    disciplineTitleAr: 'هندسة الفلزات وميتالورجيا اللحام',
    disciplineTitleEn: 'Metallurgy & Welding Engineering',
    levelId: 'level3',
    levelTitleAr: 'خبير اللحام والفلزات (Senior Metallurgist)',
    levelTitleEn: 'Chief Metallurgical Specialist',
    score: 95,
    correctCount: 19,
    totalQuestions: 20,
    timeSpentSeconds: 235, // 3m 55s
    badgeTier: 'gold',
    completedAt: new Date(Date.now() - 5 * 86400000).toISOString()
  },
  {
    id: 'seed_eng_5',
    userName: 'م. ناصر العتيبي (Eng. Nasser Al-Otaibi)',
    userRole: 'Senior NDT & Tubing Supervisor',
    company: 'Kuwait National Petroleum (KNPC)',
    country: 'KW',
    disciplineId: 'et',
    disciplineTitleAr: 'التيارات الدوامية وفحص الأنابيب (ET)',
    disciplineTitleEn: 'Eddy Current Testing & Tube Inspection',
    levelId: 'level2',
    levelTitleAr: 'فاحص تيارات دوامية معتمد (Level II)',
    levelTitleEn: 'Certified ET Inspector (Level II)',
    score: 95,
    correctCount: 19,
    totalQuestions: 20,
    timeSpentSeconds: 245, // 4m 05s
    badgeTier: 'gold',
    completedAt: new Date(Date.now() - 6 * 86400000).toISOString()
  },
  {
    id: 'seed_eng_6',
    userName: 'م. أميرة بن علي (Eng. Amira Benali)',
    userRole: 'Quality Assurance Inspector',
    company: 'INSCO Inspection Academy',
    country: 'EG',
    disciplineId: 'mt_pt',
    disciplineTitleAr: 'الفحص المغناطيسي والمواد النافذة (MT & PT)',
    disciplineTitleEn: 'Magnetic Particle & Liquid Penetrant',
    levelId: 'level2',
    levelTitleAr: 'فاحص معتمد للعيوب السطحية (Level II)',
    levelTitleEn: 'Certified Surface Inspector (Level II)',
    score: 93,
    correctCount: 14,
    totalQuestions: 15,
    timeSpentSeconds: 140, // 2m 20s
    badgeTier: 'silver',
    completedAt: new Date(Date.now() - 7 * 86400000).toISOString()
  },
  {
    id: 'seed_eng_7',
    userName: 'م. سالم الهاجري (Eng. Salem Al-Hajri)',
    userRole: 'RBI & Integrity Engineer',
    company: 'QatarEnergy LNG',
    country: 'QA',
    disciplineId: 'corrosion_rbi',
    disciplineTitleAr: 'تآكل المعادن والتفتيش المبني على المخاطر RBI',
    disciplineTitleEn: 'Corrosion Control & RBI Engineering',
    levelId: 'level2',
    levelTitleAr: 'مهندس تفتيش وسلامة أصول (Asset Integrity)',
    levelTitleEn: 'Asset Integrity Inspector (Level II)',
    score: 90,
    correctCount: 18,
    totalQuestions: 20,
    timeSpentSeconds: 260, // 4m 20s
    badgeTier: 'silver',
    completedAt: new Date(Date.now() - 8 * 86400000).toISOString()
  },
  {
    id: 'seed_eng_8',
    userName: 'م. عمر البلوشي (Eng. Omar Al-Balushi)',
    userRole: 'Thermal Heating Operations Lead',
    company: 'OQ Refinery & Petrochemicals',
    country: 'OM',
    disciplineId: 'pwht',
    disciplineTitleAr: 'المعالجة الحرارية بعد اللحام PWHT',
    disciplineTitleEn: 'Post Weld Heat Treatment (PWHT)',
    levelId: 'level2',
    levelTitleAr: 'فني معالجة حرارية معتمد (Certified Technician)',
    levelTitleEn: 'Thermal Operations Lead (Level II)',
    score: 90,
    correctCount: 18,
    totalQuestions: 20,
    timeSpentSeconds: 215, // 3m 35s
    badgeTier: 'silver',
    completedAt: new Date(Date.now() - 9 * 86400000).toISOString()
  },
  {
    id: 'seed_eng_9',
    userName: 'م. يوسف منصور (Eng. Youssef Mansour)',
    userRole: 'Certified Welding Inspector (AWS CWI)',
    company: 'MIDOR Alexandria Refinery',
    country: 'EG',
    disciplineId: 'vt',
    disciplineTitleAr: 'الفحص البصري التخصصي (VT)',
    disciplineTitleEn: 'Visual & Optical Inspection (VT)',
    levelId: 'level2',
    levelTitleAr: 'فاحص بصري معتمد لكافة الوصلات (Level II)',
    levelTitleEn: 'Certified Visual Inspector (Level II)',
    score: 90,
    correctCount: 18,
    totalQuestions: 20,
    timeSpentSeconds: 240, // 4m 00s
    badgeTier: 'silver',
    completedAt: new Date(Date.now() - 10 * 86400000).toISOString()
  },
  {
    id: 'seed_eng_10',
    userName: 'م. زياد الشمري (Eng. Ziyad Al-Shammari)',
    userRole: 'NDT Trainee & Graduate Engineer',
    company: 'King Fahd University (KFUPM) / INSCO',
    country: 'SA',
    disciplineId: 'general',
    disciplineTitleAr: 'الأساسيات الأكاديمية والفيزيائية',
    disciplineTitleEn: 'Academic & Physics Foundation',
    levelId: 'academic',
    levelTitleAr: 'الأساس الأكاديمي والفيزيائي',
    levelTitleEn: 'Academic NDT Foundation',
    score: 85,
    correctCount: 17,
    totalQuestions: 20,
    timeSpentSeconds: 270, // 4m 30s
    badgeTier: 'bronze',
    completedAt: new Date(Date.now() - 12 * 86400000).toISOString()
  }
];

/**
 * Gets local entries saved in this browser
 */
export function getLocalLeaderboardEntries(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LEADERBOARD);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

/**
 * Saves a local leaderboard entry
 */
function saveLocalLeaderboardEntry(entry: LeaderboardEntry) {
  try {
    const existing = getLocalLeaderboardEntries();
    const updated = [entry, ...existing.filter(e => e.id !== entry.id)];
    localStorage.setItem(STORAGE_KEY_LEADERBOARD, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save leaderboard locally', e);
  }
}

/**
 * Sorts leaderboard entries by score descending, then time ascending, then date descending
 */
export function sortLeaderboardEntries(entries: LeaderboardEntry[]): LeaderboardEntry[] {
  return [...entries].sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    const timeA = a.timeSpentSeconds || 9999;
    const timeB = b.timeSpentSeconds || 9999;
    if (timeA !== timeB) {
      return timeA - timeB;
    }
    return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime();
  });
}

/**
 * Fetches all leaderboard entries merged from Firestore, local storage, and benchmark seeds
 */
export async function fetchLeaderboardEntries(): Promise<LeaderboardEntry[]> {
  const localList = getLocalLeaderboardEntries();
  const firestoreList: LeaderboardEntry[] = [];

  try {
    const q = query(
      collection(db, 'quizLeaderboard'),
      orderBy('score', 'desc'),
      limit(50)
    );
    const snap = await getDocs(q);
    snap.forEach(docSnap => {
      const data = docSnap.data() as LeaderboardEntry;
      firestoreList.push({
        ...data,
        id: docSnap.id
      });
    });
  } catch (err) {
    console.warn('Firestore quizLeaderboard fetch notice (using cache/seeds):', err);
  }

  // Merge map by ID
  const map = new Map<string, LeaderboardEntry>();

  // 1. Benchmark seeds
  SEED_LEADERBOARD_ENTRIES.forEach(item => {
    map.set(item.id, item);
  });

  // 2. Local entries (mark as isCurrentUser if not set)
  localList.forEach(item => {
    map.set(item.id, { ...item, isCurrentUser: true });
  });

  // 3. Firestore live entries
  firestoreList.forEach(item => {
    const isLocalUser = localList.some(l => l.id === item.id);
    map.set(item.id, {
      ...item,
      isCurrentUser: Boolean(isLocalUser || item.isCurrentUser)
    });
  });

  const combined = Array.from(map.values());
  return sortLeaderboardEntries(combined);
}

/**
 * Submits a new score to the Global Leaderboard
 */
export async function submitLeaderboardScore(params: {
  userId?: string;
  userName: string;
  userRole?: string;
  company?: string;
  country?: string;
  disciplineId: string;
  disciplineTitleAr: string;
  disciplineTitleEn: string;
  levelId: string;
  levelTitleAr: string;
  levelTitleEn: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
  timeSpentSeconds?: number;
}): Promise<LeaderboardEntry> {
  const rand = Math.random().toString(36).substring(2, 7);
  const id = `qb_${Date.now()}_${rand}`;

  let badgeTier: 'platinum' | 'gold' | 'silver' | 'bronze' = 'bronze';
  if (params.score >= 95) {
    badgeTier = 'platinum';
  } else if (params.score >= 85) {
    badgeTier = 'gold';
  } else if (params.score >= 70) {
    badgeTier = 'silver';
  }

  const entry: LeaderboardEntry = {
    id,
    userId: params.userId || 'guest_' + rand,
    userName: params.userName.trim() || 'INSCO Candidate Engineer',
    userRole: params.userRole || 'NDT Quality Specialist',
    company: params.company || 'Industrial Inspection Professional',
    country: params.country || 'SA',
    disciplineId: params.disciplineId,
    disciplineTitleAr: params.disciplineTitleAr,
    disciplineTitleEn: params.disciplineTitleEn,
    levelId: params.levelId,
    levelTitleAr: params.levelTitleAr,
    levelTitleEn: params.levelTitleEn,
    score: Math.min(100, Math.max(0, Math.round(params.score))),
    correctCount: params.correctCount,
    totalQuestions: params.totalQuestions,
    timeSpentSeconds: params.timeSpentSeconds || 120,
    badgeTier,
    completedAt: new Date().toISOString(),
    isCurrentUser: true
  };

  // 1. Save to localStorage immediately
  saveLocalLeaderboardEntry(entry);

  // 2. Save to Firestore collection
  try {
    await setDoc(doc(db, 'quizLeaderboard', id), entry);
  } catch (err) {
    console.warn('Could not sync to Firestore quizLeaderboard immediately (stored locally):', err);
  }

  // 3. Dispatch event for UI reactivity
  try {
    window.dispatchEvent(new CustomEvent(LEADERBOARD_UPDATE_EVENT, { detail: entry }));
  } catch (e) {
    // ignore
  }

  return entry;
}

/**
 * Subscribes to live leaderboard updates from Firestore
 */
export function subscribeToLeaderboard(callback: (entries: LeaderboardEntry[]) => void): () => void {
  try {
    const q = query(collection(db, 'quizLeaderboard'), limit(60));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const firestoreItems: LeaderboardEntry[] = [];
        snapshot.forEach(docSnap => {
          firestoreItems.push({
            ...(docSnap.data() as LeaderboardEntry),
            id: docSnap.id
          });
        });

        const localList = getLocalLeaderboardEntries();
        const map = new Map<string, LeaderboardEntry>();

        SEED_LEADERBOARD_ENTRIES.forEach(item => map.set(item.id, item));
        firestoreItems.forEach(item => {
          const isMine = localList.some(l => l.id === item.id);
          map.set(item.id, { ...item, isCurrentUser: Boolean(isMine || item.isCurrentUser) });
        });
        localList.forEach(item => map.set(item.id, { ...item, isCurrentUser: true }));

        const sorted = sortLeaderboardEntries(Array.from(map.values()));
        callback(sorted);
      },
      (err) => {
        console.warn('Leaderboard onSnapshot error, falling back to local/seed:', err);
        fetchLeaderboardEntries().then(callback);
      }
    );

    return unsubscribe;
  } catch (e) {
    fetchLeaderboardEntries().then(callback);
    return () => {};
  }
}
