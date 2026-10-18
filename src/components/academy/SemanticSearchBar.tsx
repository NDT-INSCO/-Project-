import React from 'react';
import { Language } from '../../types';

interface SemanticSearchBarProps {
  language: Language;
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