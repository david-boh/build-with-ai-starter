import React from 'react';
import { TickerInfo, Candle, Timeframe, ChartType, SectorPerformance, MarketBreadth } from '../../types/market';
import { TechnicalChart } from '../chart/TechnicalChart';
import { ArrowUpRight, ArrowDownRight, Compass, ShieldAlert, Layers } from 'lucide-react';

interface OverviewDashboardProps {
  activeTicker: TickerInfo;
  candles: Candle[];
  timeframe: Timeframe;
  setTimeframe: (tf: Timeframe) => void;
  chartType: ChartType;
  setChartType: (type: ChartType) => void;
  showSMA: boolean;
  setShowSMA: (val: boolean | ((prev: boolean) => boolean)) => void;
  showEMA: boolean;
  setShowEMA: (val: boolean | ((prev: boolean) => boolean)) => void;
  showRSI: boolean;
  setShowRSI: (val: boolean | ((prev: boolean) => boolean)) => void;
  showVolume: boolean;
  setShowVolume: (val: boolean | ((prev: boolean) => boolean)) => void;
  sectors: SectorPerformance[];
  marketBreadth: MarketBreadth;
  orderBook: { bids: { price: number; size: number; total: number }[]; asks: { price: number; size: number; total: number }[]; spread: number };
  watchlist: TickerInfo[];
  onSelectTicker: (ticker: TickerInfo) => void;
  openOrderModal: () => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  activeTicker,
  candles,
  timeframe,
  setTimeframe,
  chartType,
  setChartType,
  showSMA,
  setShowSMA,
  showEMA,
  setShowEMA,
  showRSI,
  setShowRSI,
  showVolume,
  setShowVolume,
  sectors,
  marketBreadth,
  orderBook,
  watchlist,
  onSelectTicker,
  openOrderModal,
}) => {
  const isBull = activeTicker.changePercent >= 0;

  // Day Range calculation
  const dayRangePercent =
    activeTicker.high === activeTicker.low
      ? 50
      : Math.min(
          100,
          Math.max(0, ((activeTicker.price - activeTicker.low) / (activeTicker.high - activeTicker.low)) * 100)
        );

  // 52W Range calculation
  const range52WPercent =
    activeTicker.high52W === activeTicker.low52W
      ? 50
      : Math.min(
          100,
          Math.max(0, ((activeTicker.price - activeTicker.low52W) / (activeTicker.high52W - activeTicker.low52W)) * 100)
        );

  return (
    <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* 8/4 Primary Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 8-Column Split: Active Ticker Header + Pro Chart + Technical Score */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Ticker Hero Banner */}
          <div className="bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-lg p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-2xl font-extrabold tracking-tight text-[#181B24] dark:text-white">
                    {activeTicker.symbol}
                  </h1>
                  <span className="px-2 py-0.5 rounded text-xs font-bold tracking-wider uppercase bg-[#F0F3FA] dark:bg-[#131722] text-[#5A5E6B] dark:text-[#8C91A0] border border-[#E0E3EB] dark:border-[#2A2E39]">
                    {activeTicker.exchange}
                  </span>
                  <span className="text-xs text-[#737687]">
                    · {activeTicker.name} · {activeTicker.sector}
                  </span>
                </div>

                <div className="flex items-baseline gap-3 mt-2">
                  <span className="text-3xl font-extrabold font-mono tracking-tight text-[#181B24] dark:text-white tnum">
                    ${activeTicker.price > 1000 ? activeTicker.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : activeTicker.price.toFixed(2)}
                  </span>
                  <span
                    className={`flex items-center font-mono font-bold text-base tnum ${
                      isBull ? 'text-[#089981]' : 'text-[#F23645]'
                    }`}
                  >
                    {isBull ? <ArrowUpRight className="w-4 h-4 stroke-[2.5]" /> : <ArrowDownRight className="w-4 h-4 stroke-[2.5]" />}
                    {isBull ? '+' : ''}{activeTicker.change.toFixed(2)} ({isBull ? '+' : ''}{activeTicker.changePercent.toFixed(2)}%)
                  </span>
                  <span className="text-xs text-[#737687]">Today</span>
                </div>
              </div>

              {/* Quick Trade CTA Button */}
              <div className="flex items-center gap-2 sm:self-center">
                <button
                  onClick={openOrderModal}
                  className="px-5 py-2.5 rounded-lg bg-[#2962FF] hover:bg-[#1E50DE] text-white text-xs font-bold tracking-wide uppercase shadow-sm transition-all active:scale-95"
                >
                  Trade {activeTicker.symbol}
                </button>
              </div>
            </div>

            {/* Range Meters & Fundamentals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 pt-4 border-t border-[#E0E3EB] dark:border-[#2A2E39]">
              {/* Day's Range Track */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-[#5A5E6B] dark:text-[#8C91A0]">
                  <span>Day's Range</span>
                  <span className="font-mono tnum">
                    ${activeTicker.low.toFixed(2)} — ${activeTicker.high.toFixed(2)}
                  </span>
                </div>
                <div className="relative w-full h-1.5 bg-[#F0F3FA] dark:bg-[#131722] rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 bottom-0 left-0 bg-[#2962FF] rounded-full"
                    style={{ width: `${dayRangePercent}%` }}
                  />
                </div>
              </div>

              {/* 52-Week Range Track */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-[#5A5E6B] dark:text-[#8C91A0]">
                  <span>52-Week Range</span>
                  <span className="font-mono tnum">
                    ${activeTicker.low52W.toFixed(2)} — ${activeTicker.high52W.toFixed(2)}
                  </span>
                </div>
                <div className="relative w-full h-1.5 bg-[#F0F3FA] dark:bg-[#131722] rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 bottom-0 left-0 bg-[#089981] rounded-full"
                    style={{ width: `${range52WPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mt-4 pt-4 border-t border-[#E0E3EB] dark:border-[#2A2E39] text-xs">
              <div>
                <span className="text-[#737687] block text-[11px]">Open</span>
                <span className="font-mono font-bold text-[#181B24] dark:text-white tnum">
                  ${activeTicker.open.toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-[#737687] block text-[11px]">Volume</span>
                <span className="font-mono font-bold text-[#181B24] dark:text-white tnum">
                  {(activeTicker.volume / 1000000).toFixed(2)}M
                </span>
              </div>
              <div>
                <span className="text-[#737687] block text-[11px]">Avg Volume</span>
                <span className="font-mono font-bold text-[#181B24] dark:text-white tnum">
                  {(activeTicker.avgVolume / 1000000).toFixed(2)}M
                </span>
              </div>
              <div>
                <span className="text-[#737687] block text-[11px]">Market Cap</span>
                <span className="font-mono font-bold text-[#181B24] dark:text-white tnum">
                  {activeTicker.marketCap}
                </span>
              </div>
              <div>
                <span className="text-[#737687] block text-[11px]">P/E Ratio</span>
                <span className="font-mono font-bold text-[#181B24] dark:text-white tnum">
                  {activeTicker.peRatio ? activeTicker.peRatio.toFixed(1) : '—'}
                </span>
              </div>
              <div>
                <span className="text-[#737687] block text-[11px]">Beta</span>
                <span className="font-mono font-bold text-[#181B24] dark:text-white tnum">
                  {activeTicker.beta.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Technical Chart Component */}
          <TechnicalChart
            ticker={activeTicker}
            candles={candles}
            timeframe={timeframe}
            setTimeframe={setTimeframe}
            chartType={chartType}
            setChartType={setChartType}
            showSMA={showSMA}
            setShowSMA={setShowSMA}
            showEMA={showEMA}
            setShowEMA={setShowEMA}
            showRSI={showRSI}
            setShowRSI={setShowRSI}
            showVolume={showVolume}
            setShowVolume={setShowVolume}
          />

          {/* Technical Summary Indicators Meter */}
          <div className="bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#2962FF]" />
                <h3 className="text-sm font-bold text-[#181B24] dark:text-white uppercase tracking-wider">
                  Technical Indicator Consensus
                </h3>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-[#089981]/15 text-[#089981]">
                BULLISH OUTLOOK
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-[#FAFAFE] dark:bg-[#131722] rounded-lg border border-[#E0E3EB] dark:border-[#2A2E39]">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[#737687] font-semibold">Oscillators</span>
                  <span className="font-bold text-[#089981]">BUY</span>
                </div>
                <div className="text-[11px] text-[#5A5E6B] dark:text-[#8C91A0]">
                  RSI (14) at 58.4 (Neutral/Bullish), MACD histogram positive, Stoch %K above %D.
                </div>
              </div>

              <div className="p-3 bg-[#FAFAFE] dark:bg-[#131722] rounded-lg border border-[#E0E3EB] dark:border-[#2A2E39]">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[#737687] font-semibold">Moving Averages</span>
                  <span className="font-bold text-[#089981]">STRONG BUY</span>
                </div>
                <div className="text-[11px] text-[#5A5E6B] dark:text-[#8C91A0]">
                  Price trading above 20-day SMA, 50-day EMA, and 200-day trend baseline.
                </div>
              </div>

              <div className="p-3 bg-[#FAFAFE] dark:bg-[#131722] rounded-lg border border-[#E0E3EB] dark:border-[#2A2E39]">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[#737687] font-semibold">Pivots & Support</span>
                  <span className="font-bold text-[#2962FF] font-mono tnum">${(activeTicker.price * 0.96).toFixed(2)}</span>
                </div>
                <div className="text-[11px] text-[#5A5E6B] dark:text-[#8C91A0]">
                  Immediate support at ${(activeTicker.price * 0.96).toFixed(2)}, next resistance at ${(activeTicker.price * 1.05).toFixed(2)}.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Split: Sector Performance Breadth + Order Book DOM + Watchlist */}
        <div className="lg:col-span-4 space-y-6">
          {/* Sector Breadth Gauges with Bi-Directional Indicator Bars */}
          <div className="bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#2962FF]" />
                <h3 className="text-sm font-bold text-[#181B24] dark:text-white uppercase tracking-wider">
                  Sector Breadth & Momentum
                </h3>
              </div>
              <span className="text-[11px] text-[#737687] font-mono">1D Performance</span>
            </div>

            {/* Performance Bars matching specification */}
            <div className="space-y-3">
              {sectors.map((sec) => {
                const isGain = sec.changePercent >= 0;
                const absPercent = Math.min(100, (Math.abs(sec.changePercent) / 2.5) * 50);

                return (
                  <div key={sec.name} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#181B24] dark:text-white font-medium truncate pr-2">
                        {sec.name}
                      </span>
                      <span
                        className={`font-mono font-bold tnum shrink-0 ${
                          isGain ? 'text-[#089981]' : 'text-[#F23645]'
                        }`}
                      >
                        {isGain ? '+' : ''}{sec.changePercent.toFixed(2)}%
                      </span>
                    </div>

                    {/* Bi-directional track from center line */}
                    <div className="relative w-full h-1.5 bg-[#F0F3FA] dark:bg-[#131722] rounded-full overflow-hidden">
                      {/* Center zero divider */}
                      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[#E0E3EB] dark:bg-[#2A2E39] z-10" />
                      {isGain ? (
                        <div
                          className="absolute top-0 bottom-0 left-1/2 bg-[#089981] rounded-r"
                          style={{ width: `${absPercent}%` }}
                        />
                      ) : (
                        <div
                          className="absolute top-0 bottom-0 right-1/2 bg-[#F23645] rounded-l"
                          style={{ width: `${absPercent}%` }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Depth of Market (DOM) / Order Book */}
          <div className="bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#181B24] dark:text-white uppercase tracking-wider">
                Order Book Depth
              </h3>
              <span className="text-xs font-mono text-[#737687]">
                Spread: ${orderBook.spread.toFixed(2)}
              </span>
            </div>

            {/* Asks (Sells - Red) */}
            <div className="space-y-1 text-xs font-mono tnum">
              {orderBook.asks.slice().reverse().map((ask, i) => (
                <div
                  key={`ask-${i}`}
                  className="relative flex justify-between px-2 py-1 overflow-hidden"
                >
                  <div
                    className="absolute top-0 bottom-0 right-0 bg-[#F23645]/10 rounded-l"
                    style={{ width: `${Math.min(100, (ask.size / 3000) * 100)}%` }}
                  />
                  <span className="text-[#F23645] font-semibold z-10">${ask.price.toFixed(2)}</span>
                  <span className="text-[#5A5E6B] dark:text-[#8C91A0] z-10">{ask.size.toLocaleString()}</span>
                  <span className="text-[#737687] z-10">{ask.total.toLocaleString()}</span>
                </div>
              ))}
            </div>

            {/* Current Last Price Midpoint */}
            <div className="my-2 py-1.5 px-3 bg-[#F0F3FA] dark:bg-[#131722] rounded flex justify-between items-center text-xs font-mono tnum border border-[#E0E3EB] dark:border-[#2A2E39]">
              <span className="text-[#737687] font-sans font-medium">Last Price</span>
              <span className="font-bold text-sm text-[#181B24] dark:text-white">
                ${activeTicker.price.toFixed(2)}
              </span>
            </div>

            {/* Bids (Buys - Green) */}
            <div className="space-y-1 text-xs font-mono tnum">
              {orderBook.bids.map((bid, i) => (
                <div
                  key={`bid-${i}`}
                  className="relative flex justify-between px-2 py-1 overflow-hidden"
                >
                  <div
                    className="absolute top-0 bottom-0 right-0 bg-[#089981]/10 rounded-l"
                    style={{ width: `${Math.min(100, (bid.size / 3000) * 100)}%` }}
                  />
                  <span className="text-[#089981] font-semibold z-10">${bid.price.toFixed(2)}</span>
                  <span className="text-[#5A5E6B] dark:text-[#8C91A0] z-10">{bid.size.toLocaleString()}</span>
                  <span className="text-[#737687] z-10">{bid.total.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Watchlist Widget */}
          <div className="bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#181B24] dark:text-white uppercase tracking-wider">
                Watchlist
              </h3>
              <span className="text-xs text-[#737687]">{watchlist.length} symbols</span>
            </div>

            <div className="divide-y divide-[#E0E3EB]/60 dark:divide-[#2A2E39]/60">
              {watchlist.map((item) => {
                const isSelected = item.symbol === activeTicker.symbol;
                const isGain = item.changePercent >= 0;

                return (
                  <div
                    key={item.symbol}
                    onClick={() => onSelectTicker(item)}
                    className={`flex items-center justify-between py-2.5 px-2 rounded cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[#F0F3FA] dark:bg-[#2A2E39]'
                        : 'hover:bg-[#FAFAFE] dark:hover:bg-[#131722]'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs text-[#181B24] dark:text-white">
                        {item.symbol}
                      </div>
                      <div className="text-[11px] text-[#737687] truncate max-w-[120px]">
                        {item.name}
                      </div>
                    </div>

                    <div className="text-right font-mono tnum">
                      <div className="font-bold text-xs text-[#181B24] dark:text-white">
                        ${item.price > 1000 ? item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : item.price.toFixed(2)}
                      </div>
                      <div
                        className={`text-[11px] font-semibold flex items-center justify-end ${
                          isGain ? 'text-[#089981]' : 'text-[#F23645]'
                        }`}
                      >
                        {isGain ? '+' : ''}{item.changePercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
