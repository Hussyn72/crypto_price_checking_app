import React, { useState } from 'react';
import { TrendingUp, Moon, Sun, Globe, Search } from 'lucide-react';
import { Currency } from '../types/crypto';

interface HeaderProps {
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  darkMode: boolean;
  onDarkModeToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  currency, 
  onCurrencyChange, 
  darkMode, 
  onDarkModeToggle 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currencies: Currency[] = ['USD', 'EUR', 'BTC', 'ETH'];

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  CryptoTracker
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Real-time crypto prices
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <Globe className="h-4 w-4" />
                <span>{currency}</span>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-24 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-10">
                  {currencies.map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        onCurrencyChange(curr);
                        setIsDropdownOpen(false);
                      }}
                      className={`block w-full px-3 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors ${
                        curr === currency 
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                          : 'text-gray-700 dark:text-gray-200'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={onDarkModeToggle}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {/* Global Search */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search crypto..."
                className="pl-9 pr-4 py-2 w-64 text-sm border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};