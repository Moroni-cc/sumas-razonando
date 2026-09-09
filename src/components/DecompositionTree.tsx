import React from 'react';

interface DecompositionTreeProps {
  topNumber: number;
  leftValue?: number | string;
  rightValue?: number | string;
  isEditable?: boolean;
  onLeftChange?: (val: string) => void;
  onRightChange?: (val: string) => void;
  leftStatus?: 'correct' | 'incorrect' | 'neutral';
  rightStatus?: 'correct' | 'incorrect' | 'neutral';
  colorTheme?: 'green' | 'blue' | 'yellow' | 'pink' | 'purple';
}

export const DecompositionTree: React.FC<DecompositionTreeProps> = ({
  topNumber,
  leftValue = '',
  rightValue = '',
  isEditable = false,
  onLeftChange,
  onRightChange,
  leftStatus = 'neutral',
  rightStatus = 'neutral',
  colorTheme = 'blue',
}) => {
  const themeStyles = {
    green: {
      topBg: 'bg-emerald-500 text-white',
      circleBorder: 'border-emerald-500 text-emerald-700 bg-emerald-50',
      lineColor: '#10b981',
    },
    blue: {
      topBg: 'bg-sky-500 text-white',
      circleBorder: 'border-sky-500 text-sky-700 bg-sky-50',
      lineColor: '#0284c7',
    },
    yellow: {
      topBg: 'bg-amber-500 text-white',
      circleBorder: 'border-amber-500 text-amber-800 bg-amber-50',
      lineColor: '#d97706',
    },
    pink: {
      topBg: 'bg-rose-500 text-white',
      circleBorder: 'border-rose-500 text-rose-700 bg-rose-50',
      lineColor: '#e11d48',
    },
    purple: {
      topBg: 'bg-purple-500 text-white',
      circleBorder: 'border-purple-500 text-purple-700 bg-purple-50',
      lineColor: '#9333ea',
    },
  }[colorTheme];

  const getStatusBorder = (status: 'correct' | 'incorrect' | 'neutral') => {
    if (status === 'correct') return 'border-green-500 bg-green-100 text-green-800 ring-2 ring-green-400';
    if (status === 'incorrect') return 'border-red-500 bg-red-100 text-red-800 ring-2 ring-red-400';
    return themeStyles.circleBorder;
  };

  return (
    <div className="flex flex-col items-center select-none py-2 my-1">
      {/* Top Number Circle */}
      <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold shadow-md ${themeStyles.topBg}`}>
        {topNumber}
      </div>

      {/* Branch SVG lines */}
      <svg className="w-28 h-8 sm:w-32 sm:h-10 my-1 overflow-visible" viewBox="0 0 120 40">
        <path
          d="M 60 2 L 25 38"
          stroke={themeStyles.lineColor}
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 60 2 L 95 38"
          stroke={themeStyles.lineColor}
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Two Branch Circles */}
      <div className="flex justify-between w-32 sm:w-36 gap-2">
        {/* Left Circle */}
        <div className="flex-1 flex justify-center">
          {isEditable ? (
            <input
              type="text"
              inputMode="numeric"
              maxLength={2}
              value={leftValue}
              onChange={(e) => onLeftChange && onLeftChange(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="?"
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 text-center text-lg sm:text-xl font-bold outline-none transition-all ${getStatusBorder(
                leftStatus
              )}`}
            />
          ) : (
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center text-lg sm:text-xl font-bold shadow-sm ${getStatusBorder(
                leftStatus
              )}`}
            >
              {leftValue}
            </div>
          )}
        </div>

        {/* Right Circle */}
        <div className="flex-1 flex justify-center">
          {isEditable ? (
            <input
              type="text"
              inputMode="numeric"
              maxLength={2}
              value={rightValue}
              onChange={(e) => onRightChange && onRightChange(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="?"
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 text-center text-lg sm:text-xl font-bold outline-none transition-all ${getStatusBorder(
                rightStatus
              )}`}
            />
          ) : (
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center text-lg sm:text-xl font-bold shadow-sm ${getStatusBorder(
                rightStatus
              )}`}
            >
              {rightValue}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
