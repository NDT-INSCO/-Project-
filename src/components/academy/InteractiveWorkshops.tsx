import React from 'react';
import { Language } from '../../types';

interface InteractiveWorkshopsProps {
  language: Language;
}

export const InteractiveWorkshops: React.FC<InteractiveWorkshopsProps> = ({ language }) => {
  const isAr = language === 'ar';
  return (
    <div className="rounded-2xl border border-emerald-400/25 bg-[#10132b] p-5">
      <h3 className="text-xl font-bold text-white mb-3">
        {isAr ? 'المعامل التفاعلية' : 'Interactive Workshops'}
      </h3>
      <p className="text-slate-300 text-sm">
        {isAr ? 'تجارب تفاعلية في المعامل.' : 'Interactive laboratory experiments.'}
      </p>
    </div>
  );
};