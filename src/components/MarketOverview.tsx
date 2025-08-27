import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';
import { MarketData } from '../types/crypto';

interface MarketOverviewProps {
  marketData: MarketData | null;
  loading: boolean;
}

export const MarketOverview: React.FC<MarketOverviewProps> = ({ marketData, loading }) => {
  const formatNumber = (num: number): string => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };

  const formatPercentage = (num: number): string => {
    return `${num.toFixed(2)}%`;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!marketData) return null;

  const stats = [
    {
      title: 'Total Market Cap',
      value: formatNumber(marketData.totalMarketCap),
      change: '+2.4%',
      icon: DollarSign,
      positive: true
    },
    {
      title: '24h Volume',
      value: formatNumber(marketData.total24hVolume),
      change: '+8.2%',
      icon: Activity,
      positive: true
    },
    {
      title: 'BTC Dominance',
      value: formatPercentage(marketData.btcDominance),
      change: '-0.3%',
      icon: TrendingDown,
      positive: false
    },
    {
      title: 'Active Cryptos',
      value: marketData.activeCryptocurrencies.toLocaleString(),
      change: '+12',
      icon: TrendingUp,
      positive: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <stat.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className={`px-2 py-1 rounded-lg text-sm font-medium ${
              stat.positive 
                ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                : 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'
            }`}>
              {stat.change}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
            {stat.title}
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
};