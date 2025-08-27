import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MarketOverview } from './components/MarketOverview';
import { CryptoTable } from './components/CryptoTable';
import { useCryptoData } from './hooks/useCryptoData';
import { Currency } from './types/crypto';

function App() {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [darkMode, setDarkMode] = useState(false);
  const { cryptos, marketData, loading } = useCryptoData(currency);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header 
        currency={currency}
        onCurrencyChange={setCurrency}
        darkMode={darkMode}
        onDarkModeToggle={toggleDarkMode}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MarketOverview marketData={marketData} loading={loading} />
        <CryptoTable cryptos={cryptos} loading={loading} />
      </main>

      {/* Live Updates Indicator */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg border border-gray-200 dark:border-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
              Live Updates
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;