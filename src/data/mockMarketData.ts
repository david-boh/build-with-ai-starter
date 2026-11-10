import { TickerInfo, SectorPerformance, MarketBreadth, NewsItem, TradeIdea, Candle, Timeframe } from '../types/market';

export const INITIAL_TICKERS: TickerInfo[] = [
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    exchange: 'NASDAQ',
    assetClass: 'Stocks',
    price: 138.45,
    change: 4.82,
    changePercent: 3.61,
    open: 134.20,
    high: 139.80,
    low: 133.90,
    previousClose: 133.63,
    volume: 58240000,
    avgVolume: 49500000,
    marketCap: '$3.41T',
    peRatio: 54.2,
    dividendYield: 0.03,
    high52W: 140.76,
    low52W: 45.22,
    sector: 'Technology',
    beta: 1.68,
    sparkline: [133.6, 134.1, 135.2, 134.8, 136.5, 137.2, 138.45]
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    exchange: 'NASDAQ',
    assetClass: 'Stocks',
    price: 228.60,
    change: 1.95,
    changePercent: 0.86,
    open: 227.10,
    high: 229.40,
    low: 226.50,
    previousClose: 226.65,
    volume: 42150000,
    avgVolume: 46200000,
    marketCap: '$3.49T',
    peRatio: 34.6,
    dividendYield: 0.44,
    high52W: 237.23,
    low52W: 164.08,
    sector: 'Technology',
    beta: 1.05,
    sparkline: [226.5, 227.0, 227.4, 228.1, 227.9, 228.3, 228.6]
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    exchange: 'NASDAQ',
    assetClass: 'Stocks',
    price: 423.80,
    change: -2.40,
    changePercent: -0.56,
    open: 427.00,
    high: 428.15,
    low: 422.50,
    previousClose: 426.20,
    volume: 19800000,
    avgVolume: 21300000,
    marketCap: '$3.15T',
    peRatio: 35.8,
    dividendYield: 0.71,
    high52W: 468.35,
    low52W: 366.50,
    sector: 'Technology',
    beta: 1.12,
    sparkline: [426.2, 427.5, 426.0, 424.8, 425.1, 423.2, 423.8]
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    exchange: 'NASDAQ',
    assetClass: 'Stocks',
    price: 321.22,
    change: 14.50,
    changePercent: 4.73,
    open: 308.50,
    high: 324.70,
    low: 307.20,
    previousClose: 306.72,
    volume: 88400000,
    avgVolume: 65100000,
    marketCap: '$1.03T',
    peRatio: 78.4,
    dividendYield: 0,
    high52W: 358.64,
    low52W: 138.80,
    sector: 'Consumer Cyclical',
    beta: 2.34,
    sparkline: [306.7, 309.2, 314.0, 312.5, 318.4, 323.0, 321.22]
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com, Inc.',
    exchange: 'NASDAQ',
    assetClass: 'Stocks',
    price: 206.15,
    change: 2.85,
    changePercent: 1.40,
    open: 204.00,
    high: 207.25,
    low: 203.80,
    previousClose: 203.30,
    volume: 34200000,
    avgVolume: 38900000,
    marketCap: '$2.16T',
    peRatio: 43.1,
    dividendYield: 0,
    high52W: 214.10,
    low52W: 139.46,
    sector: 'Consumer Cyclical',
    beta: 1.18,
    sparkline: [203.3, 204.1, 205.2, 204.8, 206.0, 205.7, 206.15]
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    exchange: 'NASDAQ',
    assetClass: 'Stocks',
    price: 179.40,
    change: -1.15,
    changePercent: -0.64,
    open: 181.20,
    high: 182.00,
    low: 178.60,
    previousClose: 180.55,
    volume: 22400000,
    avgVolume: 24800000,
    marketCap: '$2.22T',
    peRatio: 23.4,
    dividendYield: 0.45,
    high52W: 191.75,
    low52W: 129.40,
    sector: 'Communication Services',
    beta: 1.04,
    sparkline: [180.5, 181.2, 180.1, 179.8, 178.9, 179.2, 179.4]
  },
  {
    symbol: 'META',
    name: 'Meta Platforms, Inc.',
    exchange: 'NASDAQ',
    assetClass: 'Stocks',
    price: 588.30,
    change: 8.60,
    changePercent: 1.48,
    open: 582.00,
    high: 592.40,
    low: 580.80,
    previousClose: 579.70,
    volume: 14600000,
    avgVolume: 15200000,
    marketCap: '$1.48T',
    peRatio: 27.2,
    dividendYield: 0.34,
    high52W: 602.95,
    low52W: 313.66,
    sector: 'Communication Services',
    beta: 1.25,
    sparkline: [579.7, 582.1, 585.0, 584.2, 587.4, 590.1, 588.3]
  },
  {
    symbol: 'AMD',
    name: 'Advanced Micro Devices',
    exchange: 'NASDAQ',
    assetClass: 'Stocks',
    price: 148.90,
    change: 3.80,
    changePercent: 2.62,
    open: 145.50,
    high: 150.20,
    low: 144.90,
    previousClose: 145.10,
    volume: 38400000,
    avgVolume: 42000000,
    marketCap: '$240.8B',
    peRatio: 98.2,
    dividendYield: 0,
    high52W: 227.30,
    low52W: 116.04,
    sector: 'Technology',
    beta: 1.72,
    sparkline: [145.1, 146.2, 148.0, 147.2, 149.1, 148.4, 148.9]
  },
  {
    symbol: 'PLTR',
    name: 'Palantir Technologies',
    exchange: 'NYSE',
    assetClass: 'Stocks',
    price: 61.50,
    change: 3.25,
    changePercent: 5.58,
    open: 58.90,
    high: 62.10,
    low: 58.40,
    previousClose: 58.25,
    volume: 62800000,
    avgVolume: 48900000,
    marketCap: '$137.4B',
    peRatio: 112.5,
    dividendYield: 0,
    high52W: 63.40,
    low52W: 19.60,
    sector: 'Technology',
    beta: 2.15,
    sparkline: [58.2, 59.4, 60.1, 59.8, 61.2, 62.0, 61.5]
  },
  {
    symbol: 'SPY',
    name: 'SPDR S&P 500 ETF Trust',
    exchange: 'NYSE Arca',
    assetClass: 'Indices',
    price: 598.20,
    change: 3.65,
    changePercent: 0.61,
    open: 595.40,
    high: 599.10,
    low: 594.80,
    previousClose: 594.55,
    volume: 48500000,
    avgVolume: 55200000,
    marketCap: '$585B',
    peRatio: 26.8,
    dividendYield: 1.22,
    high52W: 601.50,
    low52W: 468.20,
    sector: 'Broad Market',
    beta: 1.00,
    sparkline: [594.5, 595.8, 596.5, 597.2, 598.0, 598.9, 598.2]
  },
  {
    symbol: 'QQQ',
    name: 'Invesco QQQ Trust',
    exchange: 'NASDAQ',
    assetClass: 'Indices',
    price: 512.40,
    change: 4.80,
    changePercent: 0.95,
    open: 508.90,
    high: 513.60,
    low: 508.20,
    previousClose: 507.60,
    volume: 36700000,
    avgVolume: 39500000,
    marketCap: '$292B',
    peRatio: 31.4,
    dividendYield: 0.58,
    high52W: 515.20,
    low52W: 395.10,
    sector: 'Technology Heavy',
    beta: 1.15,
    sparkline: [507.6, 509.2, 510.8, 511.4, 512.0, 513.1, 512.4]
  },
  {
    symbol: 'BTC/USD',
    name: 'Bitcoin',
    exchange: 'Coinbase',
    assetClass: 'Crypto',
    price: 88450.00,
    change: 2150.00,
    changePercent: 2.49,
    open: 86300.00,
    high: 89600.00,
    low: 85900.00,
    previousClose: 86300.00,
    volume: 42100000000,
    avgVolume: 38900000000,
    marketCap: '$1.74T',
    high52W: 93480.00,
    low52W: 36800.00,
    sector: 'Digital Currency',
    beta: 2.65,
    sparkline: [86300, 87100, 86800, 88200, 89100, 88700, 88450]
  },
  {
    symbol: 'ETH/USD',
    name: 'Ethereum',
    exchange: 'Coinbase',
    assetClass: 'Crypto',
    price: 3180.50,
    change: 78.50,
    changePercent: 2.53,
    open: 3102.00,
    high: 3220.00,
    low: 3085.00,
    previousClose: 3102.00,
    volume: 18400000000,
    avgVolume: 17200000000,
    marketCap: '$382B',
    high52W: 4090.00,
    low52W: 1980.00,
    sector: 'Smart Contracts',
    beta: 2.82,
    sparkline: [3102, 3130, 3120, 3165, 3210, 3195, 3180.5]
  },
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    exchange: 'NYSE',
    assetClass: 'Stocks',
    price: 242.10,
    change: -1.80,
    changePercent: -0.74,
    open: 244.50,
    high: 245.20,
    low: 241.60,
    previousClose: 243.90,
    volume: 8900000,
    avgVolume: 9800000,
    marketCap: '$690B',
    peRatio: 12.8,
    dividendYield: 2.02,
    high52W: 248.50,
    low52W: 168.20,
    sector: 'Financials',
    beta: 0.88,
    sparkline: [243.9, 244.8, 243.5, 242.9, 243.2, 241.8, 242.1]
  },
  {
    symbol: 'XOM',
    name: 'Exxon Mobil Corporation',
    exchange: 'NYSE',
    assetClass: 'Stocks',
    price: 118.40,
    change: -1.30,
    changePercent: -1.09,
    open: 119.80,
    high: 120.40,
    low: 117.90,
    previousClose: 119.70,
    volume: 14200000,
    avgVolume: 16500000,
    marketCap: '$468B',
    peRatio: 14.1,
    dividendYield: 3.25,
    high52W: 126.34,
    low52W: 98.20,
    sector: 'Energy',
    beta: 0.76,
    sparkline: [119.7, 120.1, 119.4, 118.8, 118.9, 118.1, 118.4]
  },
  {
    symbol: 'LLY',
    name: 'Eli Lilly and Company',
    exchange: 'NYSE',
    assetClass: 'Stocks',
    price: 792.50,
    change: 11.20,
    changePercent: 1.43,
    open: 785.00,
    high: 796.80,
    low: 782.40,
    previousClose: 781.30,
    volume: 2400000,
    avgVolume: 2900000,
    marketCap: '$752B',
    peRatio: 64.2,
    dividendYield: 0.65,
    high52W: 972.53,
    low52W: 560.20,
    sector: 'Healthcare',
    beta: 0.62,
    sparkline: [781.3, 784.0, 788.5, 786.2, 794.0, 795.1, 792.5]
  }
];

export const SECTORS_DATA: SectorPerformance[] = [
  { name: 'Technology', changePercent: 1.84, marketCapBillion: 16400, topStock: 'NVDA', topStockGain: 3.61, momentum: 'bullish' },
  { name: 'Communication Services', changePercent: 1.12, marketCapBillion: 4800, topStock: 'META', topStockGain: 1.48, momentum: 'bullish' },
  { name: 'Consumer Cyclical', changePercent: 0.95, marketCapBillion: 3900, topStock: 'TSLA', topStockGain: 4.73, momentum: 'bullish' },
  { name: 'Healthcare', changePercent: 0.42, marketCapBillion: 5200, topStock: 'LLY', topStockGain: 1.43, momentum: 'bullish' },
  { name: 'Industrials', changePercent: 0.18, marketCapBillion: 3800, topStock: 'CAT', topStockGain: 0.85, momentum: 'neutral' },
  { name: 'Financials', changePercent: -0.34, marketCapBillion: 5400, topStock: 'GS', topStockGain: 0.22, momentum: 'bearish' },
  { name: 'Basic Materials', changePercent: -0.68, marketCapBillion: 1200, topStock: 'LIN', topStockGain: -0.15, momentum: 'bearish' },
  { name: 'Consumer Defensive', changePercent: -0.75, marketCapBillion: 2600, topStock: 'COST', topStockGain: -0.42, momentum: 'bearish' },
  { name: 'Utilities', changePercent: -0.89, marketCapBillion: 1100, topStock: 'NEE', topStockGain: -0.65, momentum: 'bearish' },
  { name: 'Real Estate', changePercent: -1.15, marketCapBillion: 1400, topStock: 'PLD', topStockGain: -0.92, momentum: 'bearish' },
  { name: 'Energy', changePercent: -1.38, marketCapBillion: 2800, topStock: 'CVX', topStockGain: -1.05, momentum: 'bearish' }
];

export const MARKET_BREADTH: MarketBreadth = {
  advancers: 1845,
  decliners: 1320,
  unchanged: 185,
  newHighs: 142,
  newLows: 31,
  putCallRatio: 0.78,
  vixValue: 14.85,
  vixChange: -0.62
};

export const MARKET_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Semiconductor Capital Outlay Surges as Next-Gen AI Superclusters Scale',
    source: 'Bloomberg Markets',
    time: '18m ago',
    relatedTickers: ['NVDA', 'AMD', 'AVGO'],
    sentiment: 'bullish',
    readTime: '3 min read',
    summary: 'Hyperscalers raised full-year data center capex projections by $18.4 billion, reaffirming multi-year GPU inference capacity buildout.',
    category: 'Tech'
  },
  {
    id: 'news-2',
    title: 'Federal Reserve Minutes Signal Cautious Stance on Policy Path Ahead',
    source: 'Wall Street Journal',
    time: '42m ago',
    relatedTickers: ['SPY', 'QQQ', 'US10Y'],
    sentiment: 'neutral',
    readTime: '4 min read',
    summary: 'Policymakers emphasized incoming labor prints while remaining receptive to disinflation momentum across service components.',
    category: 'Fed'
  },
  {
    id: 'news-3',
    title: 'Automotive & Clean Energy Momentum Builds on Q4 Production Rebound',
    source: 'Reuters Financial',
    time: '1h ago',
    relatedTickers: ['TSLA', 'RIVN'],
    sentiment: 'bullish',
    readTime: '2 min read',
    summary: 'Stronger domestic delivery throughput and lower battery pack cost curves drove double-digit margin expansion across electric platforms.',
    category: 'Macro'
  },
  {
    id: 'news-4',
    title: 'Crude Futures Dip Below 200-Day Average as Global Refining Margins Soften',
    source: 'Financial Times',
    time: '2h ago',
    relatedTickers: ['XOM', 'CVX', 'CL'],
    sentiment: 'bearish',
    readTime: '3 min read',
    summary: 'Inventory builds in strategic reserves coincided with higher non-OPEC deepwater flows, curbing prompt contract spreads.',
    category: 'Commodities'
  }
];

export const TRADE_IDEAS: TradeIdea[] = [
  {
    id: 'idea-1',
    title: 'NVDA: Ascending Triangle Breakout Retest on Volume Expansion',
    author: 'Elena Rostova, CMT',
    authorRole: 'Head of Quantitative Strategy',
    symbol: 'NVDA',
    direction: 'LONG',
    entryPrice: 138.20,
    targetPrice: 155.00,
    stopLossPrice: 131.50,
    riskReward: '2.51',
    timeframe: '2-4 Weeks',
    analysis: 'Consolidation near prior all-time high resistance cleanly absorbed supply. 20-day SMA is inflecting upwards with RSI holding firmly above 58 baseline.',
    likes: 342,
    timestamp: '2h ago'
  },
  {
    id: 'idea-2',
    title: 'TSLA: Range Expansion Following High-Volume Weekly Close',
    author: 'Marcus Vance',
    authorRole: 'Senior Momentum Trader',
    symbol: 'TSLA',
    direction: 'LONG',
    entryPrice: 320.00,
    targetPrice: 360.00,
    stopLossPrice: 298.00,
    riskReward: '1.82',
    timeframe: '1-3 Weeks',
    analysis: 'Clean reclaim of the 300 psychological round number with institutional block flow. Implied volatility crush has subsided, providing favorable call skew.',
    likes: 289,
    timestamp: '4h ago'
  },
  {
    id: 'idea-3',
    title: 'XOM: Head & Shoulders Top Breakdown Testing $117 Support Floor',
    author: 'David Chen, CFA',
    authorRole: 'Energy Sector Strategist',
    symbol: 'XOM',
    direction: 'SHORT',
    entryPrice: 118.50,
    targetPrice: 109.00,
    stopLossPrice: 122.20,
    riskReward: '2.57',
    timeframe: '3-6 Weeks',
    analysis: 'Lower highs registered over the last 6 weeks while commodity cracks widen. Weekly MACD completed a bearish crossover below the zero line.',
    likes: 175,
    timestamp: '6h ago'
  }
];

// Helper to generate realistic candles for any ticker and timeframe
export function generateCandlesForTicker(ticker: TickerInfo, timeframe: Timeframe): Candle[] {
  const basePrice = ticker.price;
  const count = timeframe === '1D' ? 78 : timeframe === '5D' ? 60 : timeframe === '1M' ? 45 : timeframe === '3M' ? 65 : timeframe === '1Y' ? 120 : 180;
  const volatility = ticker.beta * 0.008;

  const candles: Candle[] = [];
  let currentPrice = basePrice * (1 - (ticker.changePercent / 100) * 0.7);

  const now = Date.now();
  const stepMs = timeframe === '1D' ? 5 * 60 * 1000 : timeframe === '5D' ? 30 * 60 * 1000 : timeframe === '1M' ? 4 * 3600 * 1000 : 24 * 3600 * 1000;

  for (let i = 0; i < count; i++) {
    const timestamp = now - (count - i) * stepMs;
    const date = new Date(timestamp);
    const timeStr = timeframe === '1D' 
      ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : timeframe === '5D'
      ? `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:00`
      : `${date.getMonth() + 1}/${date.getDate()}`;

    // Random walk with slight trend towards current ticker price
    const drift = (basePrice - currentPrice) / (count - i + 5);
    const delta = (Math.random() - 0.48) * currentPrice * volatility + drift;
    const open = Number(currentPrice.toFixed(2));
    const close = Number(Math.max(1, currentPrice + delta).toFixed(2));
    const highDelta = Math.random() * currentPrice * (volatility * 0.8);
    const lowDelta = Math.random() * currentPrice * (volatility * 0.8);
    const high = Number((Math.max(open, close) + highDelta).toFixed(2));
    const low = Number(Math.max(0.5, Math.min(open, close) - lowDelta).toFixed(2));
    const volume = Math.floor(20000 + Math.random() * 85000 * ticker.beta);

    currentPrice = close;

    candles.push({
      time: timeStr,
      timestamp,
      open,
      high,
      low,
      close,
      volume
    });
  }

  // Force last candle to match actual ticker price and range
  if (candles.length > 0) {
    const last = candles[candles.length - 1];
    last.close = ticker.price;
    last.high = Math.max(last.high, ticker.high);
    last.low = Math.min(last.low, ticker.low);
  }

  // Compute SMA 20, EMA 50, and RSI 14
  for (let i = 0; i < candles.length; i++) {
    // SMA 20
    if (i >= 19) {
      const slice = candles.slice(i - 19, i + 1);
      const sum = slice.reduce((acc, c) => acc + c.close, 0);
      candles[i].sma20 = Number((sum / 20).toFixed(2));
    }

    // EMA 50
    if (i === 49) {
      const slice = candles.slice(0, 50);
      const sum = slice.reduce((acc, c) => acc + c.close, 0);
      candles[i].ema50 = Number((sum / 50).toFixed(2));
    } else if (i > 49 && candles[i - 1].ema50 !== undefined) {
      const k = 2 / (50 + 1);
      const prevEma = candles[i - 1].ema50!;
      candles[i].ema50 = Number((candles[i].close * k + prevEma * (1 - k)).toFixed(2));
    }

    // RSI 14
    if (i >= 14) {
      let gains = 0;
      let losses = 0;
      for (let j = i - 13; j <= i; j++) {
        const diff = candles[j].close - candles[j - 1].close;
        if (diff >= 0) gains += diff;
        else losses += Math.abs(diff);
      }
      const avgGain = gains / 14;
      const avgLoss = losses / 14;
      if (avgLoss === 0) {
        candles[i].rsi = 100;
      } else {
        const rs = avgGain / avgLoss;
        candles[i].rsi = Number((100 - (100 / (1 + rs))).toFixed(1));
      }
    } else {
      candles[i].rsi = 50 + (ticker.changePercent > 0 ? 8 : -8);
    }
  }

  return candles;
}

// Generate realistic depth of market (DOM) order book
export function generateOrderBook(currentPrice: number) {
  const bids = [];
  const asks = [];

  let cumBid = 0;
  for (let i = 1; i <= 6; i++) {
    const price = Number((currentPrice - i * 0.05).toFixed(2));
    const size = Math.floor(400 + Math.random() * 2600);
    cumBid += size;
    bids.push({ price, size, total: cumBid });
  }

  let cumAsk = 0;
  for (let i = 1; i <= 6; i++) {
    const price = Number((currentPrice + i * 0.05).toFixed(2));
    const size = Math.floor(350 + Math.random() * 2800);
    cumAsk += size;
    asks.push({ price, size, total: cumAsk });
  }

  return { bids, asks, spread: 0.05 };
}
