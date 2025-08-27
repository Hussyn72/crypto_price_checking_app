import { CryptoCurrency, MarketData } from '../types/crypto';

export const mockCryptoData: CryptoCurrency[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    rank: 1,
    price: 67543.21,
    marketCap: 1334567890123,
    volume24h: 28456789012,
    change1h: 0.23,
    change24h: 2.45,
    change7d: -3.21,
    lastUpdated: new Date().toISOString(),
    logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png'
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    rank: 2,
    price: 3842.67,
    marketCap: 462345678901,
    volume24h: 15234567890,
    change1h: -0.12,
    change24h: 4.67,
    change7d: 8.92,
    lastUpdated: new Date().toISOString(),
    logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png'
  },
  {
    id: 'tether',
    name: 'Tether',
    symbol: 'USDT',
    rank: 3,
    price: 1.0001,
    marketCap: 118234567890,
    volume24h: 45678901234,
    change1h: 0.01,
    change24h: 0.02,
    change7d: -0.01,
    lastUpdated: new Date().toISOString(),
    logo: 'https://cryptologos.cc/logos/tether-usdt-logo.png'
  },
  {
    id: 'bnb',
    name: 'BNB',
    symbol: 'BNB',
    rank: 4,
    price: 634.89,
    marketCap: 92345678901,
    volume24h: 1876543210,
    change1h: 1.23,
    change24h: -2.34,
    change7d: 12.45,
    lastUpdated: new Date().toISOString(),
    logo: 'https://cryptologos.cc/logos/bnb-bnb-logo.png'
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    rank: 5,
    price: 198.76,
    marketCap: 93456789012,
    volume24h: 3456789012,
    change1h: -0.87,
    change24h: 6.21,
    change7d: 18.93,
    lastUpdated: new Date().toISOString(),
    logo: 'https://cryptologos.cc/logos/solana-sol-logo.png'
  }
];

export const mockMarketData: MarketData = {
  totalMarketCap: 2456789012345,
  total24hVolume: 87654321098,
  btcDominance: 54.32,
  activeCryptocurrencies: 2847
};