import React from 'react';
import { Language } from '../../types';

interface SemanticSearchBarProps {
  language: Language;
  /** Jump into the curriculum module shown in the search results. */
  onNavigateToModule?: (disciplineId: string, levelIdx: number, moduleId?: string) => void;
  /** Launch the module self-check for the selected result. */
  onLaunchQuiz?: (disciplineId: string, levelId?: string, moduleId?: string, moduleTitle?: { ar: string; en: string }) => void;
}

export const SemanticSearchBar: React.FC<SemanticSearchBarProps> = ({ language }) => {
  const isAr = language === 'ar';
  return (
    <div className="rounded-xl border border-slate-700 bg-[#0b0d1e] p-3">
      <input
        type="search"
        placeholder={isAr ? 'ابحث في مصطلحات NDT...' : 'Search NDT terms...'}
        className="w-full bg-transparent text-white text-sm outline-none"
        aria-label={isAr ? 'بحث دلالي' : 'Semantic search'}
      />
    </div>
  );
};