
import React from 'react';

interface ReybanpacLogoProps {
  isAnimating: boolean;
}

export const ReybanpacLogo: React.FC<ReybanpacLogoProps> = ({ isAnimating }) => {
  return (
    <div className="relative w-64 h-auto">
      <svg viewBox="0 0 350 120" className="w-full h-full">
        <defs>
          <clipPath id="circleClip">
            <circle cx="60" cy="60" r="58" />
          </clipPath>
        </defs>

        {/* Blue Stripes */}
        <g clipPath="url(#circleClip)">
          <g className={`transition-transform duration-1000 ease-out ${isAnimating ? 'translate-x-0' : '-translate-x-full'}`}>
            {[...Array(6)].map((_, i) => (
              <rect key={i} x="0" y={i * 20} width="120" height="10" fill="#002E6D" />
            ))}
          </g>
        </g>
        
        {/* Banana */}
        <path
          d="M 60 10 C 110 10, 110 110, 60 110 C 80 110, 90 60, 60 10 Z"
          fill="#FFD100"
          stroke="#FDB813"
          strokeWidth="1"
          className={`transition-all duration-1000 ease-out delay-200 ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
        />

        {/* Main Text */}
        <g className={`transition-opacity duration-700 ease-in ${isAnimating ? 'opacity-100 delay-[800ms]' : 'opacity-0'}`}>
          <text x="125" y="65" fontFamily="Manrope, sans-serif" fontSize="32" fontWeight="800" fill="#E63946">
            REYBANPAC
          </text>
          
          {/* Crown */}
          <path d="M 305 32 L 308 38 L 311 32 L 314 38 L 317 32 L 317 40 L 305 40 Z" fill="#FFD100" stroke="#FDB813" strokeWidth="0.5" />

          {/* Sub Text */}
          <text x="125" y="85" fontFamily="Manrope, sans-serif" fontSize="12" fontWeight="600" fill="#002E6D">
            REY BANANO DEL PACIFICO C.L.
          </text>
        </g>
      </svg>
    </div>
  );
};
