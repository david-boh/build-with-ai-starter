export type Timeframe = '1D' | '5D' | '1M' | '3M' | '6M' | 'YTD' | '1Y' | '5Y' | 'ALL';

export type ChartType = 'candlestick' | 'line' | 'bars' | 'area';

export type AssetClass = 'Stocks' | 'Crypto' | 'Indices' | 'Forex' | 'Commodities';

export interface Candle {
  time: string;
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  sma20?: number;
  ema50?: number;
  rsi?: number;
}

export interface TickerInfo {
  symbol: string;
  name: string;
  exchange: string;
  assetClass: AssetClass;
  price: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  previousClose: number;
  volume: number;
  avgVolume: number;
  marketCap: string;
  peRatio?: number;
  dividendYield?: number;
  high52W: number;
  low52W: number;
  sector: string;
  beta: number;
  sparkline: number[];
}

export interface SectorPerformance {
  name: string;
  changePercent: number;
  marketCapBillion: number;
  topStock: string;
  topStockGain: number;
  momentum: 'bullish' | 'bearish' | 'neutral';
}

export interface OrderBookLevel {
  price: number;
  size: number;
  total: number;
}

export interface MarketBreadth {
  advancers: number;
  decliners: number;
  unchanged: number;
  newHighs: number;
  newLows: number;
  putCallRatio: number;
  vixValue: number;
  vixChange: number;
}

export interface Position {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  shares: number;
  entryPrice: number;
  currentPrice: number;
  unrealizedPL: number;
  unrealizedPLPercent: number;
  timestamp: number;
}

export interface Order {
  id: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  orderType: 'MARKET' | 'LIMIT' | 'STOP';
  shares: number;
  price: number;
  status: 'FILLED' | 'OPEN' | 'CANCELLED';
  timestamp: number;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  relatedTickers: string[];
  sentiment: 'bullish' | 'bearish' | 'neutral';
  readTime: string;
  summary: string;
  category: 'Macro' | 'Earnings' | 'Fed' | 'Tech' | 'Commodities';
}

export interface TradeIdea {
  id: string;
  title: string;
  author: string;
  authorRole: string;
  symbol: string;
  direction: 'LONG' | 'SHORT';
  entryPrice: number;
  targetPrice: number;
  stopLossPrice: number;
  riskReward: string;
  timeframe: string;
  analysis: string;
  likes: number;
  timestamp: string;
}
