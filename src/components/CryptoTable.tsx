import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Search, Star } from 'lucide-react';
import { CryptoCurrency } from '../types/crypto';
import { PriceChart } from './PriceChart';

interface CryptoTableProps {
  cryptos: CryptoCurrency[];
  loading: boolean;
}

export const CryptoTable: React.FC<CryptoTableProps> = ({ cryptos, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof CryptoCurrency>('rank');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null);

  const formatPrice = (price: number): string => {
    if (price < 1) return `$${price.toFixed(6)}`;
    if (price < 100) return `$${price.toFixed(4)}`;
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatMarketCap = (marketCap: number): string => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
    return `$${marketCap.toLocaleString()}`;
  };

  const formatPercentage = (change: number): string => {
    return `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
  };

  const getChangeColor = (change: number): string => {
    return change >= 0 
      ? 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20'
      : 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20';
  };

  const handleSort = (field: keyof CryptoCurrency) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedCryptos = cryptos
    .filter(crypto => 
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      const direction = sortDirection === 'asc' ? 1 : -1;
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return (aVal - bVal) * direction;
      }
      return String(aVal).localeCompare(String(bVal)) * direction;
    });

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-6 animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Top Cryptocurrencies
          </h2>
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search cryptocurrencies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full sm:w-80 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('rank')}
                  className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-100"
                >
                  <span>#</span>
                  {sortField === 'rank' && (
                    sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  )}
                </button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('price')}
                  className="flex items-center space-x-1 ml-auto hover:text-gray-700 dark:hover:text-gray-100"
                >
                  <span>Price</span>
                  {sortField === 'price' && (
                    sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  )}
                </button>
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                1h %
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                24h %
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                7d %
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Market Cap
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Volume (24h)
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Last 7 Days
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {filteredAndSortedCryptos.map((crypto) => (
              <React.Fragment key={crypto.id}>
                <tr 
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                  onClick={() => setSelectedCrypto(selectedCrypto === crypto.id ? null : crypto.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-gray-300 hover:text-yellow-400 cursor-pointer" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {crypto.rank}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={`https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=40&h=40&fit=crop&crop=center`}
                        alt={crypto.name}
                        className="h-10 w-10 rounded-full"
                        onError={(e) => {
                          e.currentTarget.src = `https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=${crypto.symbol.charAt(0)}`;
                        }}
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {crypto.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {crypto.symbol}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatPrice(crypto.price)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-lg ${getChangeColor(crypto.change1h)}`}>
                      {formatPercentage(crypto.change1h)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-lg ${getChangeColor(crypto.change24h)}`}>
                      {formatPercentage(crypto.change24h)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-lg ${getChangeColor(crypto.change7d)}`}>
                      {formatPercentage(crypto.change7d)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
                    {formatMarketCap(crypto.marketCap)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
                    {formatMarketCap(crypto.volume24h)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-24 h-12">
                      <PriceChart 
                        data={[
                          { timestamp: Date.now() - 6 * 24 * 60 * 60 * 1000, price: crypto.price * 0.95 },
                          { timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000, price: crypto.price * 0.98 },
                          { timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000, price: crypto.price * 0.92 },
                          { timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000, price: crypto.price * 1.02 },
                          { timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000, price: crypto.price * 0.99 },
                          { timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000, price: crypto.price * 1.01 },
                          { timestamp: Date.now(), price: crypto.price }
                        ]}
                        positive={crypto.change7d >= 0}
                        mini={true}
                      />
                    </div>
                  </td>
                </tr>
                {selectedCrypto === crypto.id && (
                  <tr>
                    <td colSpan={9} className="px-6 py-6 bg-gray-50 dark:bg-gray-700">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            {crypto.name} Price Chart
                          </h3>
                          <div className="h-64">
                            <PriceChart 
                              data={[
                                { timestamp: Date.now() - 6 * 24 * 60 * 60 * 1000, price: crypto.price * 0.95 },
                                { timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000, price: crypto.price * 0.98 },
                                { timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000, price: crypto.price * 0.92 },
                                { timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000, price: crypto.price * 1.02 },
                                { timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000, price: crypto.price * 0.99 },
                                { timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000, price: crypto.price * 1.01 },
                                { timestamp: Date.now(), price: crypto.price }
                              ]}
                              positive={crypto.change7d >= 0}
                              mini={false}
                            />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Market Statistics
                          </h3>
                          <div className="space-y-4">
                            <div className="flex justify-between">
                              <span className="text-gray-500 dark:text-gray-400">Market Cap Rank:</span>
                              <span className="font-medium text-gray-900 dark:text-white">#{crypto.rank}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500 dark:text-gray-400">Market Cap:</span>
                              <span className="font-medium text-gray-900 dark:text-white">{formatMarketCap(crypto.marketCap)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500 dark:text-gray-400">24h Volume:</span>
                              <span className="font-medium text-gray-900 dark:text-white">{formatMarketCap(crypto.volume24h)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500 dark:text-gray-400">Circulating Supply:</span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {(crypto.marketCap / crypto.price).toLocaleString(undefined, { maximumFractionDigits: 0 })} {crypto.symbol}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};