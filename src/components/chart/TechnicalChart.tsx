import React, { useState, useMemo, useRef } from 'react';
import { Candle, Timeframe, ChartType, TickerInfo } from '../../types/market';
import { SlidersHorizontal, BarChart3, LineChart, CandlestickChart } from 'lucide-react';

interface TechnicalChartProps {
  ticker: TickerInfo;
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
}

export const TechnicalChart: React.FC<TechnicalChartProps> = ({
  ticker,
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
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Geometry calculations
  const width = 1000;
  const mainHeight = showRSI ? 330 : 420;
  const rsiHeight = showRSI ? 100 : 0;
  const totalSvgHeight = mainHeight + rsiHeight;
  const paddingRight = 75; // for price axis
  const paddingBottom = 26; // for time axis
  const paddingTop = 20;

  const chartAreaWidth = width - paddingRight;
  const chartAreaHeight = mainHeight - paddingTop - paddingBottom;

  // Compute price bounds
  const { minPrice, maxPrice, priceRange, minTime, maxTime } = useMemo(() => {
    if (!candles || candles.length === 0) {
      return { minPrice: 0, maxPrice: 100, priceRange: 100, minTime: 0, maxTime: 0 };
    }
    let min = Infinity;
    let max = -Infinity;
    for (const c of candles) {
      if (c.low < min) min = c.low;
      if (c.high > max) max = c.high;
      if (showSMA && c.sma20) {
        if (c.sma20 < min) min = c.sma20;
        if (c.sma20 > max) max = c.sma20;
      }
      if (showEMA && c.ema50) {
        if (c.ema50 < min) min = c.ema50;
        if (c.ema50 > max) max = c.ema50;
      }
    }
    const buffer = (max - min) * 0.06;
    return {
      minPrice: Math.max(0, min - buffer),
      maxPrice: max + buffer,
      priceRange: max - min + buffer * 2 || 1,
      minTime: candles[0].timestamp,
      maxTime: candles[candles.length - 1].timestamp,
    };
  }, [candles, showSMA, showEMA]);

  // Max volume for volume bars
  const maxVolume = useMemo(() => {
    return Math.max(...candles.map((c) => c.volume), 1);
  }, [candles]);

  // Helpers to convert to SVG coordinate space
  const getX = (index: number) => {
    if (candles.length <= 1) return chartAreaWidth / 2;
    return (index / (candles.length - 1)) * (chartAreaWidth - 20) + 10;
  };

  const getY = (price: number) => {
    return paddingTop + chartAreaHeight * (1 - (price - minPrice) / priceRange);
  };

  const getRsiY = (rsiVal: number) => {
    const top = mainHeight + 15;
    const height = rsiHeight - 30;
    return top + height * (1 - rsiVal / 100);
  };

  // Generate paths for line / area / SMA / EMA
  const linePath = useMemo(() => {
    if (candles.length === 0) return '';
    return candles.reduce((acc, c, i) => {
      const x = getX(i);
      const y = getY(c.close);
      return `${acc} ${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }, '');
  }, [candles, minPrice, priceRange]);

  const areaPath = useMemo(() => {
    if (candles.length === 0) return '';
    const baseLine = linePath;
    const lastX = getX(candles.length - 1);
    const firstX = getX(0);
    const bottomY = mainHeight - paddingBottom;
    return `${baseLine} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  }, [linePath, candles, mainHeight, paddingBottom]);

  const smaPath = useMemo(() => {
    if (!showSMA) return '';
    let started = false;
    let path = '';
    candles.forEach((c, i) => {
      if (c.sma20 !== undefined) {
        const x = getX(i);
        const y = getY(c.sma20);
        path += `${started ? ' L' : ' M'} ${x} ${y}`;
        started = true;
      }
    });
    return path;
  }, [candles, showSMA, minPrice, priceRange]);

  const emaPath = useMemo(() => {
    if (!showEMA) return '';
    let started = false;
    let path = '';
    candles.forEach((c, i) => {
      if (c.ema50 !== undefined) {
        const x = getX(i);
        const y = getY(c.ema50);
        path += `${started ? ' L' : ' M'} ${x} ${y}`;
        started = true;
      }
    });
    return path;
  }, [candles, showEMA, minPrice, priceRange]);

  const rsiPath = useMemo(() => {
    if (!showRSI) return '';
    let started = false;
    let path = '';
    candles.forEach((c, i) => {
      if (c.rsi !== undefined) {
        const x = getX(i);
        const y = getRsiY(c.rsi);
        path += `${started ? ' L' : ' M'} ${x} ${y}`;
        started = true;
      }
    });
    return path;
  }, [candles, showRSI, mainHeight, rsiHeight]);

  // Handle mouse move for crosshair
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || candles.length === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    // Convert clientX to SVG x
    const scaleX = width / rect.width;
    const scaleY = totalSvgHeight / rect.height;
    const svgX = clientX * scaleX;
    const svgY = clientY * scaleY;

    setCursorPos({ x: svgX, y: svgY });

    // Find closest candle
    const ratio = Math.max(0, Math.min(1, (svgX - 10) / (chartAreaWidth - 20)));
    const idx = Math.min(candles.length - 1, Math.max(0, Math.round(ratio * (candles.length - 1))));
    setHoverIndex(idx);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
    setCursorPos(null);
  };

  const activeCandle = hoverIndex !== null && candles[hoverIndex] ? candles[hoverIndex] : candles[candles.length - 1];
  const isUp = activeCandle ? activeCandle.close >= activeCandle.open : true;

  // Price axis grid lines
  const priceGridSteps = 5;
  const priceGridValues = useMemo(() => {
    const list = [];
    for (let i = 0; i <= priceGridSteps; i++) {
      const price = minPrice + (priceRange / priceGridSteps) * i;
      list.push(price);
    }
    return list;
  }, [minPrice, priceRange]);

  const candleWidth = Math.max(2, Math.min(12, (chartAreaWidth / (candles.length || 1)) * 0.72));

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-lg overflow-hidden select-none">
      {/* Chart Toolbar Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 border-b border-[#E0E3EB] dark:border-[#2A2E39] bg-[#FAFAFE] dark:bg-[#131722]/60">
        {/* Timeframe Selectors */}
        <div className="flex items-center gap-1">
          {(['1D', '5D', '1M', '3M', '6M', '1Y', 'ALL'] as Timeframe[]).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors whitespace-nowrap shrink-0 ${
                timeframe === tf
                  ? 'bg-[#131722] dark:bg-[#2962FF] text-white shadow-sm'
                  : 'text-[#5A5E6B] dark:text-[#A0A5B5] hover:text-[#181B24] dark:hover:text-white hover:bg-[#E5E8F4] dark:hover:bg-[#2A2E39]'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* Chart Style & Indicators Toggles */}
        <div className="flex items-center gap-2">
          {/* Chart Types */}
          <div className="flex items-center bg-[#E5E8F4] dark:bg-[#131722] p-0.5 rounded">
            <button
              onClick={() => setChartType('candlestick')}
              title="Candlestick Chart"
              className={`p-1 rounded text-xs transition-colors ${
                chartType === 'candlestick'
                  ? 'bg-white dark:bg-[#2A2E39] text-[#2962FF] dark:text-white shadow-xs'
                  : 'text-[#737687] hover:text-[#181B24] dark:hover:text-white'
              }`}
            >
              <CandlestickChart className="w-4 h-4" />
            </button>
            <button
              onClick={() => setChartType('line')}
              title="Line Chart"
              className={`p-1 rounded text-xs transition-colors ${
                chartType === 'line'
                  ? 'bg-white dark:bg-[#2A2E39] text-[#2962FF] dark:text-white shadow-xs'
                  : 'text-[#737687] hover:text-[#181B24] dark:hover:text-white'
              }`}
            >
              <LineChart className="w-4 h-4" />
            </button>
            <button
              onClick={() => setChartType('area')}
              title="Mountain / Area Chart"
              className={`p-1 rounded text-xs transition-colors ${
                chartType === 'area'
                  ? 'bg-white dark:bg-[#2A2E39] text-[#2962FF] dark:text-white shadow-xs'
                  : 'text-[#737687] hover:text-[#181B24] dark:hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
            </button>
          </div>

          <div className="h-4 w-px bg-[#E0E3EB] dark:bg-[#2A2E39] mx-1" />

          {/* Technical Indicator Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowSMA((prev) => !prev)}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors whitespace-nowrap shrink-0 ${
                showSMA
                  ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                  : 'text-[#737687] hover:bg-[#E5E8F4] dark:hover:bg-[#2A2E39]'
              }`}
            >
              SMA (20)
            </button>
            <button
              onClick={() => setShowEMA((prev) => !prev)}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors whitespace-nowrap shrink-0 ${
                showEMA
                  ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30'
                  : 'text-[#737687] hover:bg-[#E5E8F4] dark:hover:bg-[#2A2E39]'
              }`}
            >
              EMA (50)
            </button>
            <button
              onClick={() => setShowVolume((prev) => !prev)}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors whitespace-nowrap shrink-0 ${
                showVolume
                  ? 'bg-[#2962FF]/15 text-[#2962FF] dark:text-[#7EA2FF] border border-[#2962FF]/30'
                  : 'text-[#737687] hover:bg-[#E5E8F4] dark:hover:bg-[#2A2E39]'
              }`}
            >
              Volume
            </button>
            <button
              onClick={() => setShowRSI((prev) => !prev)}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors whitespace-nowrap shrink-0 ${
                showRSI
                  ? 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30'
                  : 'text-[#737687] hover:bg-[#E5E8F4] dark:hover:bg-[#2A2E39]'
              }`}
            >
              RSI (14)
            </button>
          </div>
        </div>
      </div>

      {/* Real-time OHLC Metric Ribbon */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-1.5 bg-white dark:bg-[#1E222D] border-b border-[#E0E3EB]/60 dark:border-[#2A2E39]/60 text-xs text-[#5A5E6B] dark:text-[#8C91A0] font-mono tnum">
        <span className="font-bold text-[#181B24] dark:text-white">
          {ticker.symbol} · {timeframe}
        </span>
        {activeCandle && (
          <>
            <span>
              O: <strong className={isUp ? 'text-[#089981]' : 'text-[#F23645]'}>{activeCandle.open.toFixed(2)}</strong>
            </span>
            <span>
              H: <strong className={isUp ? 'text-[#089981]' : 'text-[#F23645]'}>{activeCandle.high.toFixed(2)}</strong>
            </span>
            <span>
              L: <strong className={isUp ? 'text-[#089981]' : 'text-[#F23645]'}>{activeCandle.low.toFixed(2)}</strong>
            </span>
            <span>
              C: <strong className={isUp ? 'text-[#089981]' : 'text-[#F23645]'}>{activeCandle.close.toFixed(2)}</strong>
            </span>
            <span>
              Vol: <strong>{activeCandle.volume.toLocaleString()}</strong>
            </span>
            {showSMA && activeCandle.sma20 && (
              <span className="text-amber-500">
                SMA20: <strong>{activeCandle.sma20.toFixed(2)}</strong>
              </span>
            )}
            {showEMA && activeCandle.ema50 && (
              <span className="text-blue-500">
                EMA50: <strong>{activeCandle.ema50.toFixed(2)}</strong>
              </span>
            )}
            {showRSI && activeCandle.rsi && (
              <span className="text-purple-500">
                RSI: <strong>{activeCandle.rsi.toFixed(1)}</strong>
              </span>
            )}
            <span className="text-[#737687] text-[11px] ml-auto">
              Time: {activeCandle.time}
            </span>
          </>
        )}
      </div>

      {/* Interactive SVG Chart Viewport */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full cursor-crosshair overflow-hidden bg-white dark:bg-[#1E222D]"
        style={{ height: `${totalSvgHeight}px` }}
      >
        <svg
          viewBox={`0 0 ${width} ${totalSvgHeight}`}
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2962FF" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#2962FF" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="rsiBandGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9333EA" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#9333EA" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Grid lines (horizontal) */}
          {priceGridValues.map((val) => {
            const y = getY(val);
            return (
              <g key={val}>
                <line
                  x1={0}
                  y1={y}
                  x2={chartAreaWidth}
                  y2={y}
                  stroke="currentColor"
                  className="text-[#E0E3EB]/70 dark:text-[#2A2E39]/60"
                  strokeDasharray="2 3"
                  strokeWidth="1"
                />
                {/* Price label on right axis */}
                <text
                  x={chartAreaWidth + 8}
                  y={y + 3}
                  className="fill-[#737687] dark:fill-[#8C91A0] text-[10px] font-mono tnum"
                >
                  {val.toFixed(2)}
                </text>
              </g>
            );
          })}

          {/* Volume Bars (rendered in background of main chart) */}
          {showVolume &&
            candles.map((c, i) => {
              const x = getX(i);
              const barHeight = (c.volume / maxVolume) * 70;
              const y = mainHeight - paddingBottom - barHeight;
              const isGreen = c.close >= c.open;
              return (
                <rect
                  key={`vol-${i}`}
                  x={x - candleWidth / 2}
                  y={y}
                  width={candleWidth}
                  height={barHeight}
                  fill={isGreen ? '#089981' : '#F23645'}
                  opacity={0.35}
                />
              );
            })}

          {/* Chart Rendering Mode */}
          {chartType === 'area' && (
            <>
              <path d={areaPath} fill="url(#areaGradient)" />
              <path d={linePath} fill="none" stroke="#2962FF" strokeWidth="2" />
            </>
          )}

          {chartType === 'line' && (
            <path d={linePath} fill="none" stroke="#2962FF" strokeWidth="2" />
          )}

          {chartType === 'candlestick' &&
            candles.map((c, i) => {
              const x = getX(i);
              const openY = getY(c.open);
              const closeY = getY(c.close);
              const highY = getY(c.high);
              const lowY = getY(c.low);
              const isGreen = c.close >= c.open;
              const color = isGreen ? '#089981' : '#F23645';
              const topY = Math.min(openY, closeY);
              const bodyHeight = Math.max(1.5, Math.abs(closeY - openY));

              return (
                <g key={`candle-${i}`}>
                  {/* Candle Wick (High-Low) */}
                  <line
                    x1={x}
                    y1={highY}
                    x2={x}
                    y2={lowY}
                    stroke={color}
                    strokeWidth="1.2"
                  />
                  {/* Candle Real Body (Open-Close) */}
                  <rect
                    x={x - candleWidth / 2}
                    y={topY}
                    width={candleWidth}
                    height={bodyHeight}
                    fill={color}
                    rx="1"
                  />
                </g>
              );
            })}

          {/* Overlay Indicators */}
          {showSMA && <path d={smaPath} fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />}
          {showEMA && <path d={emaPath} fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" />}

          {/* Subchart: RSI (14) */}
          {showRSI && (
            <g>
              {/* Divider between Main and Subchart */}
              <line
                x1={0}
                y1={mainHeight}
                x2={width}
                y2={mainHeight}
                stroke="currentColor"
                className="text-[#E0E3EB] dark:text-[#2A2E39]"
                strokeWidth="1.5"
              />

              {/* 70 Overbought & 30 Oversold lines */}
              <rect
                x={0}
                y={getRsiY(70)}
                width={chartAreaWidth}
                height={getRsiY(30) - getRsiY(70)}
                fill="url(#rsiBandGradient)"
              />
              <line
                x1={0}
                y1={getRsiY(70)}
                x2={chartAreaWidth}
                y2={getRsiY(70)}
                stroke="#DC2626"
                strokeDasharray="2 3"
                strokeWidth="1"
                opacity="0.6"
              />
              <text x={chartAreaWidth + 8} y={getRsiY(70) + 3} className="fill-[#DC2626] text-[9px] font-mono">
                70 OB
              </text>

              <line
                x1={0}
                y1={getRsiY(30)}
                x2={chartAreaWidth}
                y2={getRsiY(30)}
                stroke="#16A34A"
                strokeDasharray="2 3"
                strokeWidth="1"
                opacity="0.6"
              />
              <text x={chartAreaWidth + 8} y={getRsiY(30) + 3} className="fill-[#16A34A] text-[9px] font-mono">
                30 OS
              </text>

              {/* RSI Curve */}
              <path d={rsiPath} fill="none" stroke="#A855F7" strokeWidth="1.5" />
            </g>
          )}

          {/* Time scale tick labels */}
          {candles
            .filter((_, i) => i % Math.max(1, Math.floor(candles.length / 6)) === 0)
            .map((c) => {
              const index = candles.indexOf(c);
              const x = getX(index);
              return (
                <text
                  key={`time-${index}`}
                  x={x}
                  y={mainHeight - 8}
                  textAnchor="middle"
                  className="fill-[#737687] dark:fill-[#8C91A0] text-[9px] font-mono"
                >
                  {c.time}
                </text>
              );
            })}

          {/* Interactive Crosshair & Cursor HUD */}
          {cursorPos && hoverIndex !== null && (
            <g>
              {/* Vertical Crosshair Line */}
              <line
                x1={getX(hoverIndex)}
                y1={0}
                x2={getX(hoverIndex)}
                y2={totalSvgHeight}
                stroke="#737687"
                strokeDasharray="3 3"
                strokeWidth="1"
                opacity="0.75"
              />

              {/* Horizontal Crosshair Line */}
              {cursorPos.y <= mainHeight && (
                <>
                  <line
                    x1={0}
                    y1={cursorPos.y}
                    x2={chartAreaWidth}
                    y2={cursorPos.y}
                    stroke="#737687"
                    strokeDasharray="3 3"
                    strokeWidth="1"
                    opacity="0.75"
                  />

                  {/* Active Price Badge on Right Axis */}
                  {(() => {
                    const priceAtCursor =
                      minPrice + (priceRange * (mainHeight - paddingBottom - cursorPos.y)) / chartAreaHeight;
                    return (
                      <g transform={`translate(${chartAreaWidth}, ${cursorPos.y - 10})`}>
                        <rect x={0} y={0} width={68} height={20} fill="#131722" rx="3" />
                        <text
                          x={34}
                          y={13}
                          fill="#FFFFFF"
                          textAnchor="middle"
                          className="font-mono text-[10px] font-bold tnum"
                        >
                          {priceAtCursor.toFixed(2)}
                        </text>
                      </g>
                    );
                  })()}
                </>
              )}

              {/* Active Timestamp Badge on Bottom Axis */}
              <g transform={`translate(${getX(hoverIndex) - 30}, ${mainHeight - 18})`}>
                <rect x={0} y={0} width={60} height={16} fill="#131722" rx="3" />
                <text
                  x={30}
                  y={11}
                  fill="#FFFFFF"
                  textAnchor="middle"
                  className="font-mono text-[9px] font-medium"
                >
                  {candles[hoverIndex]?.time}
                </text>
              </g>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};
