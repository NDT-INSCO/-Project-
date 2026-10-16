import { EngineeringDiscipline, DisciplineLevel, CurriculumModule } from '../data/curriculum/types';

export interface ModuleProgressRecord {
  moduleId: string;
  disciplineId: string;
  levelId: string;
  completedAt: string;
  byQuiz?: boolean;
  score?: number;
}

const STORAGE_KEY_MODULES = 'insco_academy_completed_modules';
const STORAGE_KEY_QUIZZES = 'insco_academy_passed_quizzes';
export const PROGRESS_UPDATE_EVENT = 'insco_academy_progress_updated';

/**
 * Retrieves the full map of completed modules from localStorage
 */
export function getCompletedModules(): Record<string, ModuleProgressRecord> {
  if (typeof window === 'undefined') return {};

  try {
    const rawModules = localStorage.getItem(STORAGE_KEY_MODULES);
    const modulesMap: Record<string, ModuleProgressRecord> = rawModules ? JSON.parse(rawModules) : {};

    // Also merge any passed quizzes for resilience
    const rawQuizzes = localStorage.getItem(STORAGE_KEY_QUIZZES);
    if (rawQuizzes) {
      const quizzesMap = JSON.parse(rawQuizzes);
      Object.keys(quizzesMap).forEach(modId => {
        if (!modulesMap[modId]) {
          modulesMap[modId] = {
            moduleId: modId,
            disciplineId: quizzesMap[modId].disciplineId || '',
            levelId: quizzesMap[modId].levelId || '',
            completedAt: quizzesMap[modId].passedAt || new Date().toISOString(),
            byQuiz: true,
            score: quizzesMap[modId].score
          };
        } else if (quizzesMap[modId].score !== undefined) {
          modulesMap[modId].byQuiz = true;
          modulesMap[modId].score = quizzesMap[modId].score;
        }
      });
    }

    return modulesMap;
  } catch (err) {
    console.warn('Error reading completed modules:', err);
    return {};
  }
}

/**
 * Checks if a specific module is completed
 */
export function isModuleCompleted(moduleId: string): boolean {
  const map = getCompletedModules();
  return Boolean(map[moduleId]);
}

/**
 * Marks a module as completed (by reading/study or via quiz)
 */
export function markModuleCompleted(
  moduleId: string, 
  disciplineId: string, 
  levelId: string, 
  byQuiz: boolean = false, 
  score?: number
): void {
  if (typeof window === 'undefined') return;

  try {
    const map = getCompletedModules();
    map[moduleId] = {
      moduleId,
      disciplineId,
      levelId,
      completedAt: new Date().toISOString(),
      byQuiz,
      score
    };

    localStorage.setItem(STORAGE_KEY_MODULES, JSON.stringify(map));

    if (byQuiz) {
      const rawQuizzes = localStorage.getItem(STORAGE_KEY_QUIZZES);
      const quizzesMap = rawQuizzes ? JSON.parse(rawQuizzes) : {};
      quizzesMap[moduleId] = {
        score: score || 100,
        passedAt: new Date().toISOString(),
        disciplineId,
        levelId
      };
      localStorage.setItem(STORAGE_KEY_QUIZZES, JSON.stringify(quizzesMap));
    }

    window.dispatchEvent(new Event(PROGRESS_UPDATE_EVENT));
  } catch (err) {
    console.warn('Error saving module completion:', err);
  }
}

/**
 * Toggles a module's completed state (e.g. from study checkbox)
 */
export function toggleModuleCompleted(
  moduleId: string, 
  disciplineId: string, 
  levelId: string
): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const map = getCompletedModules();
    let nowCompleted = false;

    if (map[moduleId]) {
      delete map[moduleId];
      nowCompleted = false;
    } else {
      map[moduleId] = {
        moduleId,
        disciplineId,
        levelId,
        completedAt: new Date().toISOString(),
        byQuiz: false
      };
      nowCompleted = true;
    }

    localStorage.setItem(STORAGE_KEY_MODULES, JSON.stringify(map));
    window.dispatchEvent(new Event(PROGRESS_UPDATE_EVENT));
    return nowCompleted;
  } catch (err) {
    console.warn('Error toggling module completion:', err);
    return false;
  }
}

/**
 * Resets progress for a list of module IDs (e.g. for a level)
 */
export function resetLevelProgress(moduleIds: string[]): void {
  if (typeof window === 'undefined') return;

  try {
    const map = getCompletedModules();
    moduleIds.forEach(id => {
      delete map[id];
    });

    localStorage.setItem(STORAGE_KEY_MODULES, JSON.stringify(map));
    window.dispatchEvent(new Event(PROGRESS_UPDATE_EVENT));
  } catch (err) {
    console.warn('Error resetting level progress:', err);
  }
}

/**
 * Computes completion stats for a specific curriculum level
 */
export function calculateLevelProgress(level: DisciplineLevel, completedMap?: Record<string, ModuleProgressRecord>) {
  const map = completedMap || getCompletedModules();
  const total = level.modules.length;
  if (total === 0) return { completed: 0, total: 0, percentage: 0, isAllCompleted: false };

  let completed = 0;
  level.modules.forEach(m => {
    if (map[m.id]) completed++;
  });

  const percentage = Math.round((completed / total) * 100);
  return {
    completed,
    total,
    percentage,
    isAllCompleted: completed === total
  };
}

export interface DetailedLevelProgress {
  completed: number;
  total: number;
  remaining: number;
  percentage: number;
  isAllCompleted: boolean;
  byQuizCount: number;
  byStudyCount: number;
  avgQuizScore: number;
  completedHours: number;
  totalHours: number;
  completedModuleIds: string[];
  pendingModuleIds: string[];
  nextModule: CurriculumModule | null;
}

/**
 * Computes comprehensive stats for a specific level including next module and hours
 */
export function calculateDetailedLevelProgress(
  level: DisciplineLevel,
  completedMap?: Record<string, ModuleProgressRecord>
): DetailedLevelProgress {
  const map = completedMap || getCompletedModules();
  const total = level.modules.length;
  
  if (total === 0) {
    return {
      completed: 0,
      total: 0,
      remaining: 0,
      percentage: 0,
      isAllCompleted: false,
      byQuizCount: 0,
      byStudyCount: 0,
      avgQuizScore: 0,
      completedHours: 0,
      totalHours: level.trainingHours || 0,
      completedModuleIds: [],
      pendingModuleIds: [],
      nextModule: null
    };
  }

  const completedModuleIds: string[] = [];
  const pendingModuleIds: string[] = [];
  let byQuizCount = 0;
  let quizScoreSum = 0;
  let nextModule: CurriculumModule | null = null;

  level.modules.forEach(m => {
    const record = map[m.id];
    if (record) {
      completedModuleIds.push(m.id);
      if (record.byQuiz) {
        byQuizCount++;
        if (record.score !== undefined) {
          quizScoreSum += record.score;
        }
      }
    } else {
      pendingModuleIds.push(m.id);
      if (!nextModule) {
        nextModule = m;
      }
    }
  });

  const completed = completedModuleIds.length;
  const remaining = total - completed;
  const percentage = Math.round((completed / total) * 100);
  const byStudyCount = completed - byQuizCount;
  const avgQuizScore = byQuizCount > 0 ? Math.round(quizScoreSum / byQuizCount) : 0;
  const totalHours = level.trainingHours || (total * 8);
  const completedHours = Math.round((completed / total) * totalHours);

  return {
    completed,
    total,
    remaining,
    percentage,
    isAllCompleted: completed === total,
    byQuizCount,
    byStudyCount,
    avgQuizScore,
    completedHours,
    totalHours,
    completedModuleIds,
    pendingModuleIds,
    nextModule
  };
}

const STORAGE_KEY_SELECTION = 'insco_academy_active_level_pref';

/**
 * Persists the user's active/current curriculum discipline and level preference
 */
export function getCurrentLevelSelection(): { disciplineId: string; levelIdx: number } {
  if (typeof window === 'undefined') return { disciplineId: 'conventional_ndt', levelIdx: 1 };
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SELECTION);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed.disciplineId === 'string' && typeof parsed.levelIdx === 'number') {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Error reading active level preference:', err);
  }
  return { disciplineId: 'conventional_ndt', levelIdx: 1 };
}

/**
 * Saves user's active level selection
 */
export function setCurrentLevelSelection(disciplineId: string, levelIdx: number): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_SELECTION, JSON.stringify({ disciplineId, levelIdx }));
    window.dispatchEvent(new Event(PROGRESS_UPDATE_EVENT));
  } catch (err) {
    console.warn('Error saving active level preference:', err);
  }
}

/**
 * Marks all modules in a level as completed
 */
export function markAllLevelModulesCompleted(level: DisciplineLevel, disciplineId: string): void {
  if (typeof window === 'undefined') return;
  try {
    const map = getCompletedModules();
    level.modules.forEach(m => {
      map[m.id] = {
        moduleId: m.id,
        disciplineId,
        levelId: level.levelId,
        completedAt: new Date().toISOString(),
        byQuiz: false
      };
    });
    localStorage.setItem(STORAGE_KEY_MODULES, JSON.stringify(map));
    window.dispatchEvent(new Event(PROGRESS_UPDATE_EVENT));
  } catch (err) {
    console.warn('Error marking all level modules completed:', err);
  }
}

/**
 * Computes completion stats for an entire engineering discipline
 */
export function calculateDisciplineProgress(discipline: EngineeringDiscipline, completedMap?: Record<string, ModuleProgressRecord>) {
  const map = completedMap || getCompletedModules();
  let total = 0;
  let completed = 0;

  discipline.levels.forEach(lvl => {
    lvl.modules.forEach(m => {
      total++;
      if (map[m.id]) completed++;
    });
  });

  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  return {
    completed,
    total,
    percentage,
    isAllCompleted: total > 0 && completed === total
  };
}

/**
 * Computes completion stats across the entire educational academy
 */
export function calculateTotalAcademyProgress(disciplines: EngineeringDiscipline[], completedMap?: Record<string, ModuleProgressRecord>) {
  const map = completedMap || getCompletedModules();
  let total = 0;
  let completed = 0;

  disciplines.forEach(d => {
    d.levels.forEach(lvl => {
      lvl.modules.forEach(m => {
        total++;
        if (map[m.id]) completed++;
      });
    });
  });

  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  return {
    completed,
    total,
    percentage
  };
}

