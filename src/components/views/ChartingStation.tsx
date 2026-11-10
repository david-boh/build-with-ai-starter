import React, { useState } from 'react';
import { TickerInfo, Candle, Timeframe, ChartType } from '../../types/market';
import { TechnicalChart } from '../chart/TechnicalChart';
import { 
  Crosshair, 
  Slash, 
  Minus, 
  GitBranch, 
  Type, 
  Ruler, 
  Trash2, 
  Layers,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface ChartingStationProps {
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
  orderBook: { bids: { price: number; size: number; total: number }[]; asks: { price: number; size: number; total: number }[]; spread: number };
  openOrderModal: () => void;
}

export const ChartingStation: React.FC<ChartingStationProps> = ({
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
  orderBook,
  openOrderModal,
}) => {
  const [activeTool, setActiveTool] = useState<string>('crosshair');
  const [activeDrawings, setActiveDrawings] = useState<string[]>([]);
  const isBull = activeTicker.changePercent >= 0;

  const handleToolClick = (toolId: string) => {
    setActiveTool(toolId);
    if (toolId === 'clear') {
      setActiveDrawings([]);
    } else if (toolId !== 'crosshair') {
      setActiveDrawings((prev) => [...prev, `${toolId}-${Date.now()}`]);
    }
  };

  return (
    <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 py-4 flex flex-col space-y-4">
      {/* Top Station Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-lg">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#181B24] dark:text-white">
              {activeTicker.symbol}
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-[#F0F3FA] dark:bg-[#131722] text-[#5A5E6B] dark:text-[#8C91A0] uppercase font-bold">
              {activeTicker.exchange}
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono tnum">
            <span className="text-lg font-bold text-[#181B24] dark:text-white">
              ${activeTicker.price > 1000 ? activeTicker.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : activeTicker.price.toFixed(2)}
            </span>
            <span
              className={`flex items-center text-xs font-semibold ${
                isBull ? 'text-[#089981]' : 'text-[#F23645]'
              }`}
            >
              {isBull ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
              {isBull ? '+' : ''}{activeTicker.changePercent.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openOrderModal}
            className="px-4 py-1.5 bg-[#2962FF] hover:bg-[#1E50DE] text-white rounded text-xs font-bold tracking-wide uppercase transition-all shadow-sm"
          >
            Quick Order
          </button>
        </div>
      </div>

      {/* Main Charting Studio: Drawing tools + Canvas + DOM Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Drawing Tools Palette */}
        <div className="hidden sm:flex lg:col-span-1 flex-col items-center gap-1.5 p-2 bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-lg text-[#5A5E6B] dark:text-[#8C91A0]">
          <button
            onClick={() => handleToolClick('crosshair')}
            title="Crosshair Pointer"
            className={`p-2 rounded transition-colors ${
              activeTool === 'crosshair' ? 'bg-[#2962FF] text-white' : 'hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39]'
            }`}
          >
            <Crosshair className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleToolClick('trendline')}
            title="Trendline Tool"
            className={`p-2 rounded transition-colors ${
              activeTool === 'trendline' ? 'bg-[#2962FF] text-white' : 'hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39]'
            }`}
          >
            <Slash className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleToolClick('horizontal')}
            title="Support / Resistance Line"
            className={`p-2 rounded transition-colors ${
              activeTool === 'horizontal' ? 'bg-[#2962FF] text-white' : 'hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39]'
            }`}
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleToolClick('fibonacci')}
            title="Fibonacci Retracement"
            className={`p-2 rounded transition-colors ${
              activeTool === 'fibonacci' ? 'bg-[#2962FF] text-white' : 'hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39]'
            }`}
          >
            <GitBranch className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleToolClick('text')}
            title="Chart Annotation"
            className={`p-2 rounded transition-colors ${
              activeTool === 'text' ? 'bg-[#2962FF] text-white' : 'hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39]'
            }`}
          >
            <Type className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleToolClick('ruler')}
            title="Price / Bar Measure Ruler"
            className={`p-2 rounded transition-colors ${
              activeTool === 'ruler' ? 'bg-[#2962FF] text-white' : 'hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39]'
            }`}
          >
            <Ruler className="w-4 h-4" />
          </button>

          <div className="w-full h-px bg-[#E0E3EB] dark:bg-[#2A2E39] my-1" />

          <button
            onClick={() => handleToolClick('clear')}
            title="Clear Chart Drawings"
            className="p-2 rounded hover:bg-[#F23645]/15 hover:text-[#F23645] transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Center Main Pro Chart Viewport */}
        <div className="lg:col-span-8 space-y-3">
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

          {/* Active Overlay Tool Status */}
          <div className="flex items-center justify-between px-4 py-2 bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-lg text-xs text-[#737687]">
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#2962FF]" />
              <span>Active Tool: <strong className="text-[#181B24] dark:text-white capitalize">{activeTool}</strong></span>
              {activeDrawings.length > 0 && (
                <span className="text-[#089981]">· {activeDrawings.length} drawing layers applied</span>
              )}
            </div>
            <span>Click & drag on chart canvas to place levels</span>
          </div>
        </div>

        {/* Right DOM Ladder & Ticker Stats */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-lg p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#181B24] dark:text-white mb-3">
              Level 2 Depth of Market
            </h4>

            {/* Asks */}
            <div className="space-y-1 text-xs font-mono tnum">
              {orderBook.asks.slice().reverse().map((ask, i) => (
                <div key={`c-ask-${i}`} className="flex justify-between py-0.5 text-[#F23645]">
                  <span>${ask.price.toFixed(2)}</span>
                  <span className="text-[#5A5E6B] dark:text-[#8C91A0]">{ask.size.toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="my-2 py-1 px-2.5 bg-[#F0F3FA] dark:bg-[#131722] rounded flex justify-between text-xs font-mono font-bold text-[#181B24] dark:text-white tnum border border-[#E0E3EB] dark:border-[#2A2E39]">
              <span>Midpoint</span>
              <span>${activeTicker.price.toFixed(2)}</span>
            </div>

            {/* Bids */}
            <div className="space-y-1 text-xs font-mono tnum">
              {orderBook.bids.map((bid, i) => (
                <div key={`c-bid-${i}`} className="flex justify-between py-0.5 text-[#089981]">
                  <span>${bid.price.toFixed(2)}</span>
                  <span className="text-[#5A5E6B] dark:text-[#8C91A0]">{bid.size.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-lg p-4 text-xs space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#181B24] dark:text-white mb-2">
              Liquidity & Volume
            </h4>
            <div className="flex justify-between text-[#5A5E6B] dark:text-[#8C91A0]">
              <span>Daily Volume</span>
              <span className="font-mono font-bold text-[#181B24] dark:text-white tnum">
                {(activeTicker.volume / 1000000).toFixed(2)}M
              </span>
            </div>
            <div className="flex justify-between text-[#5A5E6B] dark:text-[#8C91A0]">
              <span>30-Day Avg Volume</span>
              <span className="font-mono font-bold text-[#181B24] dark:text-white tnum">
                {(activeTicker.avgVolume / 1000000).toFixed(2)}M
              </span>
            </div>
            <div className="flex justify-between text-[#5A5E6B] dark:text-[#8C91A0]">
              <span>Relative Volume (RVOL)</span>
              <span className="font-mono font-bold text-[#089981] tnum">
                {(activeTicker.volume / activeTicker.avgVolume).toFixed(2)}x
              </span>
            </div>
            <div className="flex justify-between text-[#5A5E6B] dark:text-[#8C91A0]">
              <span>Beta (5Y Monthly)</span>
              <span className="font-mono font-bold text-[#181B24] dark:text-white tnum">
                {activeTicker.beta.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
