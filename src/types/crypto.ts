export interface CryptoCurrency {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  price: number;
  marketCap: number;
  volume24h: number;
  change1h: number;
  change24h: number;
  change7d: number;
  lastUpdated: string;
  logo?: string;
}

export interface PriceData {
  timestamp: number;
  price: number;
}

export interface MarketData {
  totalMarketCap: number;
  total24hVolume: number;
  btcDominance: number;
  activeCryptocurrencies: number;
}

export type Currency = 'USD' | 'EUR' | 'BTC' | 'ETH';
export type TimeRange = '1H' | '24H' | '7D' | '30D' | '1Y';