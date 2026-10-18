import React from 'react';
import { Language } from '../../types';

interface CurriculumCertificatesViewProps {
  language: Language;
}

export const CurriculumCertificatesView: React.FC<CurriculumCertificatesViewProps> = ({ language }) => {
  const isAr = language === 'ar';
  return (
    <div className="rounded-2xl border border-amber-400/25 bg-[#10132b] p-5">
      <h3 className="text-xl font-bold text-white mb-3">
        {isAr ? 'الشهادات والأوسمة' : 'Certificates & Badges'}
      </h3>
      <p className="text-slate-300 text-sm">
        {isAr ? 'أوسمة التقدم في الأكاديمية.' : 'Academy progress badges.'}
      </p>
    </div>
  );
};