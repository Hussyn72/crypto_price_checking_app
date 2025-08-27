import React from 'react';
import { PriceData } from '../types/crypto';

interface PriceChartProps {
  data: PriceData[];
  positive: boolean;
  mini: boolean;
}

export const PriceChart: React.FC<PriceChartProps> = ({ data, positive, mini }) => {
  if (!data || data.length < 2) {
    return <div className={`${mini ? 'h-12' : 'h-full'} flex items-center justify-center text-gray-400`}>
      No data
    </div>;
  }

  const minPrice = Math.min(...data.map(d => d.price));
  const maxPrice = Math.max(...data.map(d => d.price));
  const priceRange = maxPrice - minPrice;

  const points = data.map((point, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = ((maxPrice - point.price) / priceRange) * 100;
    return `${x},${y}`;
  }).join(' ');

  const pathData = `M ${points}`;
  const fillPath = `M 0,100 L ${points} L 100,100 Z`;

  const strokeColor = positive ? '#10B981' : '#EF4444';
  const fillColor = positive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)';

  return (
    <div className={`${mini ? 'h-12' : 'h-full'} w-full`}>
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`gradient-${positive ? 'green' : 'red'}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={fillColor} stopOpacity="0.8"/>
            <stop offset="100%" stopColor={fillColor} stopOpacity="0.1"/>
          </linearGradient>
        </defs>
        
        {!mini && (
          <path
            d={fillPath}
            fill={`url(#gradient-${positive ? 'green' : 'red'})`}
          />
        )}
        
        <polyline
          points={points}
          fill="none"
          stroke={strokeColor}
          strokeWidth={mini ? "2" : "1.5"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {!mini && data.map((point, index) => (
          <circle
            key={index}
            cx={(index / (data.length - 1)) * 100}
            cy={((maxPrice - point.price) / priceRange) * 100}
            r="1.5"
            fill={strokeColor}
            opacity="0.7"
          />
        ))}
      </svg>
    </div>
  );
};