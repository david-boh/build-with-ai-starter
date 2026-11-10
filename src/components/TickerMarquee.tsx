import React from 'react';
import { TickerInfo } from '../types/market';
import { ArrowUpRight, ArrowDownRight, Radio } from 'lucide-react';

interface TickerMarqueeProps {
  tickers: TickerInfo[];
  activeTicker: TickerInfo;
  onSelectTicker: (ticker: TickerInfo) => void;
  isStreaming: boolean;
  toggleStreaming: () => void;
}

export const TickerMarquee: React.FC<TickerMarqueeProps> = ({
  tickers,
  activeTicker,
  onSelectTicker,
  isStreaming,
  toggleStreaming,
}) => {
  return (
    <div className="w-full bg-[#FAFAFE] dark:bg-[#131722] border-b border-[#E0E3EB] dark:border-[#2A2E39] select-none text-xs overflow-hidden transition-colors">
      <div className="max-w-[1536px] mx-auto px-4 flex items-center h-9">
        {/* Stream Status Control */}
        <button
          onClick={toggleStreaming}
          title={isStreaming ? "Live simulation active (click to pause)" : "Simulation paused (click to resume)"}
          className="flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-semibold text-[#737687] dark:text-[#8C91A0] hover:text-[#181B24] dark:hover:text-white transition-colors shrink-0 mr-3 border-r border-[#E0E3EB] dark:border-[#2A2E39] pr-3"
        >
          <Radio className={`w-3 h-3 ${isStreaming ? 'text-[#089981] animate-pulse' : 'text-[#737687]'}`} />
          <span className="font-mono uppercase">{isStreaming ? 'LIVE' : 'PAUSED'}</span>
        </button>

        {/* Horizontal Scroll Ticker Strip */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth flex-1 py-1">
          {tickers.map((t) => {
            const isBull = t.changePercent >= 0;
            const isSelected = activeTicker.symbol === t.symbol;

            return (
              <button
                key={t.symbol}
                onClick={() => onSelectTicker(t)}
                className={`flex items-center gap-2 px-2.5 py-1 rounded transition-all shrink-0 ${
                  isSelected
                    ? 'bg-[#E5E8F4] dark:bg-[#1E222D] border border-[#2962FF]/50 text-[#181B24] dark:text-white'
                    : 'hover:bg-[#F0F3FA] dark:hover:bg-[#1E222D]/60 text-[#434656] dark:text-[#A0A5B5]'
                }`}
              >
                <span className="font-bold tracking-tight text-[#181B24] dark:text-white text-[11px]">
                  {t.symbol}
                </span>

                <span className="font-mono font-medium tnum text-[11px]">
                  ${t.price > 1000 ? t.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : t.price.toFixed(2)}
                </span>

                <span
                  className={`flex items-center font-mono font-semibold text-[11px] tnum ${
                    isBull ? 'text-[#089981]' : 'text-[#F23645]'
                  }`}
                >
                  {isBull ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {isBull ? '+' : ''}{t.changePercent.toFixed(2)}%
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
