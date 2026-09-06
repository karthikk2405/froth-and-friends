import React from 'react';

interface FrothLogoProps {
  className?: string;
  variant?: 'full' | 'icon' | 'badge' | 'light';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const FrothLogo: React.FC<FrothLogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md',
}) => {
  const sizeMap = {
    xs: 'h-7',
    sm: 'h-9',
    md: 'h-11',
    lg: 'h-14',
    xl: 'h-20',
  };

  // The Signature Froth & Friends Smiling Speech Bubble Icon
  const BubbleIcon = ({ iconSize = 40, isWhite = false }: { iconSize?: number; isWhite?: boolean }) => (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 drop-shadow-sm select-none"
    >
      {/* 3 Joy Sparks above top-left */}
      <g stroke={isWhite ? '#FFFFFF' : '#141512'} strokeWidth="4.5" strokeLinecap="round">
        <line x1="14" y1="18" x2="6" y2="12" />
        <line x1="25" y1="11" x2="24" y2="2" />
        <line x1="36" y1="18" x2="43" y2="11" />
      </g>

      {/* Main Chat Bubble Body */}
      {/* Rounded squircle with bottom-left speech tail */}
      <path
        d="M24 22 H76 C84 22 90 28 90 36 V72 C90 80 84 86 76 86 H38 L22 98 V86 C16 86 10 80 10 72 V36 C10 28 16 22 24 22 Z"
        fill="#D4E72B"
        stroke={isWhite ? '#FFFFFF' : '#141512'}
        strokeWidth="5"
        strokeLinejoin="round"
      />

      {/* Happy closed arched eyes (smiling) */}
      <path
        d="M26 48 C30 40 40 40 44 48"
        stroke="#141512"
        strokeWidth="5.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M56 48 C60 40 70 40 74 48"
        stroke="#141512"
        strokeWidth="5.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Joyful open smiling mouth */}
      <g>
        {/* Mouth outline and dark cavity */}
        <path
          d="M34 60 C34 76 66 76 66 60 Z"
          fill="#141512"
          stroke="#141512"
          strokeWidth="3"
        />
        {/* Cute Pink Tongue */}
        <path
          d="M42 66 C44 74 56 74 58 66 C53 64 47 64 42 66 Z"
          fill="#FF5F7E"
        />
      </g>
    </svg>
  );

  if (variant === 'icon') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <BubbleIcon iconSize={size === 'xs' ? 28 : size === 'sm' ? 36 : size === 'md' ? 44 : size === 'lg' ? 56 : 72} />
      </div>
    );
  }

  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-2 bg-[#D4E72B] px-3.5 py-1.5 rounded-2xl border-2 border-[#141512] shadow-[2px_2px_0px_#141512] font-brand font-black tracking-tight text-[#141512] ${className}`}>
        <BubbleIcon iconSize={26} />
        <div className="flex flex-col leading-none text-left">
          <span className="text-[12px] uppercase font-extrabold tracking-wider">Froth &</span>
          <span className="text-[13px] uppercase font-black tracking-tight">Friends</span>
        </div>
      </div>
    );
  }

  // Full variant (or light variant for dark headers/footers)
  const isLight = variant === 'light';

  return (
    <div className={`flex items-center gap-2.5 ${sizeMap[size]} ${className}`}>
      <BubbleIcon 
        iconSize={size === 'xs' ? 28 : size === 'sm' ? 34 : size === 'md' ? 42 : size === 'lg' ? 52 : 68} 
        isWhite={isLight}
      />
      
      <div className="flex flex-col justify-center leading-[0.92] select-none text-left">
        <span 
          className={`font-brand font-black uppercase tracking-wider ${
            isLight ? 'text-white' : 'text-[#141512]'
          } ${
            size === 'xs' ? 'text-xs' : size === 'sm' ? 'text-sm' : size === 'md' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-3xl'
          }`}
        >
          Froth &
        </span>
        <span 
          className={`font-brand font-black uppercase tracking-tight ${
            isLight ? 'text-[#D4E72B]' : 'text-[#141512]'
          } ${
            size === 'xs' ? 'text-[11px]' : size === 'sm' ? 'text-xs' : size === 'md' ? 'text-[17px]' : size === 'lg' ? 'text-2xl' : 'text-3xl'
          }`}
        >
          Friends
        </span>
      </div>
    </div>
  );
};
