import React, { useState } from 'react';
import { TickerInfo, SectorPerformance } from '../../types/market';
import { LayoutGrid, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface HeatmapViewProps {
  tickers: TickerInfo[];
  sectors: SectorPerformance[];
  onSelectTicker: (ticker: TickerInfo) => void;
  openOrderModal: (ticker?: TickerInfo) => void;
}

export const HeatmapView: React.FC<HeatmapViewProps> = ({
  tickers,
  sectors,
  onSelectTicker,
  openOrderModal,
}) => {
  const [selectedSector, setSelectedSector] = useState<string>('All');

  const filteredTickers = selectedSector === 'All'
    ? tickers
    : tickers.filter((t) => t.sector.toLowerCase().includes(selectedSector.toLowerCase()));

  // Helper for color coding based on performance
  const getPerformanceBg = (change: number) => {
    if (change >= 3) return 'bg-[#089981] text-white';
    if (change >= 1.5) return 'bg-[#089981]/85 text-white';
    if (change > 0) return 'bg-[#089981]/40 text-[#181B24] dark:text-white';
    if (change === 0) return 'bg-[#737687]/20 text-[#181B24] dark:text-white';
    if (change > -1.5) return 'bg-[#F23645]/40 text-[#181B24] dark:text-white';
    if (change > -3) return 'bg-[#F23645]/85 text-white';
    return 'bg-[#F23645] text-white';
  };

  return (
    <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Title & Sector Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[#181B24] dark:text-white flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-[#2962FF]" />
            Market Capitalization Heatmap
          </h2>
          <span className="text-xs text-[#737687]">
            Visual market breadth and relative equity dispersion across major US sectors
          </span>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#737687] self-start sm:self-center">
          <span>-3%</span>
          <div className="flex h-3 rounded overflow-hidden">
            <div className="w-4 bg-[#F23645]" />
            <div className="w-4 bg-[#F23645]/60" />
            <div className="w-4 bg-[#737687]/30" />
            <div className="w-4 bg-[#089981]/60" />
            <div className="w-4 bg-[#089981]" />
          </div>
          <span>+3%</span>
        </div>
      </div>

      {/* Sector Pill Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => setSelectedSector('All')}
          className={`h-8 px-3.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
            selectedSector === 'All'
              ? 'bg-[#131722] dark:bg-[#2962FF] text-white'
              : 'text-[#737687] hover:bg-[#F0F3FA] dark:hover:bg-[#1E222D]'
          }`}
        >
          All Sectors
        </button>
        {sectors.map((sec) => (
          <button
            key={sec.name}
            onClick={() => setSelectedSector(sec.name)}
            className={`h-8 px-3.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
              selectedSector === sec.name
                ? 'bg-[#131722] dark:bg-[#2962FF] text-white'
                : 'text-[#737687] hover:bg-[#F0F3FA] dark:hover:bg-[#1E222D]'
            }`}
          >
            {sec.name}
          </button>
        ))}
      </div>

      {/* Dynamic Heatmap Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 min-h-[480px]">
        {filteredTickers.map((ticker) => {
          const isLarge = ticker.symbol === 'NVDA' || ticker.symbol === 'AAPL' || ticker.symbol === 'MSFT' || ticker.symbol === 'BTC/USD';
          const isGain = ticker.changePercent >= 0;
          const bgClass = getPerformanceBg(ticker.changePercent);

          return (
            <div
              key={ticker.symbol}
              onClick={() => onSelectTicker(ticker)}
              className={`p-4 rounded-lg flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.02] shadow-xs ${bgClass} ${
                isLarge ? 'col-span-2 row-span-2 min-h-[160px]' : 'min-h-[110px]'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-extrabold text-base sm:text-lg tracking-tight block">
                    {ticker.symbol}
                  </span>
                  <span className="text-[11px] opacity-85 truncate block max-w-[130px]">
                    {ticker.name}
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-black/20">
                  {ticker.sector.split(' ')[0]}
                </span>
              </div>

              <div className="mt-3 flex items-end justify-between font-mono tnum">
                <div>
                  <span className="text-xs font-semibold block">
                    ${ticker.price > 1000 ? ticker.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ticker.price.toFixed(2)}
                  </span>
                  <span className="text-[10px] opacity-75">
                    MCap: {ticker.marketCap}
                  </span>
                </div>

                <div className="text-right flex items-center gap-0.5 font-bold text-sm">
                  {isGain ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {isGain ? '+' : ''}{ticker.changePercent.toFixed(2)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
