import React from 'react';
import educareIconImg from '../assets/images/educare_realistic_icon_1793302621308.jpg';

interface EducareLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
  textClassName?: string;
}

export const EducareLogo: React.FC<EducareLogoProps> = ({
  size = 'md',
  className = '',
  showText = false,
  textClassName = '',
}) => {
  const sizeMap = {
    xs: 'w-6 h-6 rounded-md',
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-10 h-10 rounded-xl',
    lg: 'w-14 h-14 rounded-2xl',
    xl: 'w-20 h-20 rounded-3xl',
  };

  const currentSizeClass = sizeMap[size] || sizeMap.md;

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div
        className={`relative shrink-0 overflow-hidden shadow-md ring-1 ring-amber-400/40 bg-stone-950 flex items-center justify-center ${currentSizeClass}`}
      >
        <img
          src={educareIconImg}
          alt="Educare Youth Academy Official Realistic Emblem"
          className="w-full h-full object-cover object-center select-none transform hover:scale-105 transition-transform duration-300"
          loading="eager"
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-display font-bold tracking-tight text-stone-900 leading-tight ${textClassName || 'text-xl'}`}
          >
            Educare
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 font-mono">
            Youth Academy
          </span>
        </div>
      )}
    </div>
  );
};
