import { useState, useEffect } from 'react';
import { CryptoCurrency, MarketData, Currency } from '../types/crypto';
import { mockCryptoData, mockMarketData } from '../services/mockData';

export const useCryptoData = (currency: Currency = 'USD') => {
  const [cryptos, setCryptos] = useState<CryptoCurrency[]>([]);
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In production, replace with actual CoinMarketCap API calls
        setCryptos(mockCryptoData);
        setMarketData(mockMarketData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch crypto data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Set up interval for real-time updates
    const interval = setInterval(fetchData, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, [currency]);

  return { cryptos, marketData, loading, error };
};