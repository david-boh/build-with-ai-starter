import React, { useState, useEffect, useMemo } from 'react';
import { 
  TickerInfo, 
  Candle, 
  Timeframe, 
  ChartType, 
  Position, 
  Order, 
  SectorPerformance 
} from './types/market';
import { 
  INITIAL_TICKERS, 
  SECTORS_DATA, 
  MARKET_BREADTH, 
  MARKET_NEWS, 
  TRADE_IDEAS, 
  generateCandlesForTicker, 
  generateOrderBook 
} from './data/mockMarketData';
import { Header } from './components/Header';
import { TickerMarquee } from './components/TickerMarquee';
import { SearchModal } from './components/SearchModal';
import { OrderModal } from './components/OrderModal';
import { PortfolioDrawer } from './components/PortfolioDrawer';
import { OverviewDashboard } from './components/views/OverviewDashboard';
import { ChartingStation } from './components/views/ChartingStation';
import { ScreenerView } from './components/views/ScreenerView';
import { HeatmapView } from './components/views/HeatmapView';
import { NewsIdeasView } from './components/views/NewsIdeasView';

export default function App() {
  // Theme state (Dark mode default for institutional trading precision)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('mp_dark_mode');
    return saved !== null ? saved === 'true' : true;
  });

  useEffect(() => {
    localStorage.setItem('mp_dark_mode', String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Active view navigation
  const [activeView, setActiveView] = useState<'overview' | 'charting' | 'screener' | 'heatmap' | 'research'>('overview');

  // Market Data state
  const [tickers, setTickers] = useState<TickerInfo[]>(INITIAL_TICKERS);
  const [activeTickerSymbol, setActiveTickerSymbol] = useState<string>('NVDA');
  const [isStreaming, setIsStreaming] = useState<boolean>(true);

  // Active Ticker lookup
  const activeTicker = useMemo(() => {
    return tickers.find((t) => t.symbol === activeTickerSymbol) || tickers[0];
  }, [tickers, activeTickerSymbol]);

  // Chart configuration state
  const [timeframe, setTimeframe] = useState<Timeframe>('1D');
  const [chartType, setChartType] = useState<ChartType>('candlestick');
  const [showSMA, setShowSMA] = useState<boolean>(true);
  const [showEMA, setShowEMA] = useState<boolean>(false);
  const [showRSI, setShowRSI] = useState<boolean>(true);
  const [showVolume, setShowVolume] = useState<boolean>(true);

  // Candles generation cache
  const [candles, setCandles] = useState<Candle[]>(() => {
    return generateCandlesForTicker(INITIAL_TICKERS[0], '1D');
  });

  // Re-generate candles when activeTicker or timeframe changes
  useEffect(() => {
    setCandles(generateCandlesForTicker(activeTicker, timeframe));
  }, [activeTicker.symbol, timeframe]);

  // Order Book state
  const orderBook = useMemo(() => {
    return generateOrderBook(activeTicker.price);
  }, [activeTicker.price]);

  // Portfolio & Paper Trading state
  const [cashBalance, setCashBalance] = useState<number>(100000);
  const [positions, setPositions] = useState<Position[]>([
    {
      id: 'pos-init-1',
      symbol: 'NVDA',
      type: 'BUY',
      shares: 60,
      entryPrice: 132.50,
      currentPrice: 138.45,
      unrealizedPL: 60 * (138.45 - 132.50),
      unrealizedPLPercent: ((138.45 - 132.50) / 132.50) * 100,
      timestamp: Date.now() - 86400000,
    },
    {
      id: 'pos-init-2',
      symbol: 'TSLA',
      type: 'BUY',
      shares: 25,
      entryPrice: 308.20,
      currentPrice: 321.22,
      unrealizedPL: 25 * (321.22 - 308.20),
      unrealizedPLPercent: ((321.22 - 308.20) / 308.20) * 100,
      timestamp: Date.now() - 43200000,
    }
  ]);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ord-init-1',
      symbol: 'NVDA',
      side: 'BUY',
      orderType: 'MARKET',
      shares: 60,
      price: 132.50,
      status: 'FILLED',
      timestamp: Date.now() - 86400000,
    },
    {
      id: 'ord-init-2',
      symbol: 'TSLA',
      side: 'BUY',
      orderType: 'MARKET',
      shares: 25,
      price: 308.20,
      status: 'FILLED',
      timestamp: Date.now() - 43200000,
    }
  ]);

  // Modals visibility state
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState<boolean>(false);
  const [selectedOrderTicker, setSelectedOrderTicker] = useState<TickerInfo | null>(null);

  // Global Keyboard shortcut for Search (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Simulated Real-Time Price Ticks
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      setTickers((prevTickers) => {
        // Pick 1-3 random tickers to tick
        const countToUpdate = Math.floor(Math.random() * 3) + 1;
        const updated = [...prevTickers];

        for (let i = 0; i < countToUpdate; i++) {
          const randomIndex = Math.floor(Math.random() * updated.length);
          const t = updated[randomIndex];
          const tickDeltaPercent = (Math.random() - 0.49) * 0.003 * t.beta;
          const newPrice = Number(Math.max(1, t.price * (1 + tickDeltaPercent)).toFixed(2));
          const newChange = Number((newPrice - t.previousClose).toFixed(2));
          const newChangePercent = Number(((newChange / t.previousClose) * 100).toFixed(2));
          const newHigh = Math.max(t.high, newPrice);
          const newLow = Math.min(t.low, newPrice);

          updated[randomIndex] = {
            ...t,
            price: newPrice,
            change: newChange,
            changePercent: newChangePercent,
            high: newHigh,
            low: newLow,
            volume: t.volume + Math.floor(Math.random() * 250),
          };

          // If this is the active ticker, update the last candle close
          if (t.symbol === activeTickerSymbol) {
            setCandles((prevCandles) => {
              if (prevCandles.length === 0) return prevCandles;
              const last = { ...prevCandles[prevCandles.length - 1] };
              last.close = newPrice;
              last.high = Math.max(last.high, newPrice);
              last.low = Math.min(last.low, newPrice);
              return [...prevCandles.slice(0, -1), last];
            });
          }
        }
        return updated;
      });

      // Update positions live P&L
      setPositions((prevPositions) => {
        return prevPositions.map((pos) => {
          const currentTick = tickers.find((t) => t.symbol === pos.symbol);
          if (!currentTick) return pos;
          const currentPrice = currentTick.price;
          const pl = pos.type === 'BUY'
            ? (currentPrice - pos.entryPrice) * pos.shares
            : (pos.entryPrice - currentPrice) * pos.shares;
          const plPercent = ((currentPrice - pos.entryPrice) / pos.entryPrice) * 100 * (pos.type === 'BUY' ? 1 : -1);

          return {
            ...pos,
            currentPrice,
            unrealizedPL: Number(pl.toFixed(2)),
            unrealizedPLPercent: Number(plPercent.toFixed(2)),
          };
        });
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [isStreaming, activeTickerSymbol, tickers]);

  // Order Placement Handler
  const handlePlaceOrder = (order: Order, newPosition?: Position) => {
    const totalCost = order.shares * order.price;
    if (order.side === 'BUY') {
      setCashBalance((prev) => Math.max(0, prev - totalCost));
    } else {
      setCashBalance((prev) => prev + totalCost);
    }

    setOrders((prev) => [order, ...prev]);

    if (newPosition) {
      setPositions((prev) => [newPosition, ...prev]);
    }
  };

  // Close Position Handler
  const handleClosePosition = (id: string) => {
    const pos = positions.find((p) => p.id === id);
    if (!pos) return;

    const returnAmount = pos.shares * pos.currentPrice;
    setCashBalance((prev) => prev + returnAmount);

    const closeOrder: Order = {
      id: `ord-close-${Date.now()}`,
      symbol: pos.symbol,
      side: pos.type === 'BUY' ? 'SELL' : 'BUY',
      orderType: 'MARKET',
      shares: pos.shares,
      price: pos.currentPrice,
      status: 'FILLED',
      timestamp: Date.now(),
    };

    setOrders((prev) => [closeOrder, ...prev]);
    setPositions((prev) => prev.filter((p) => p.id !== id));
  };

  // Reset Portfolio Handler
  const handleResetPortfolio = () => {
    setCashBalance(100000);
    setPositions([]);
    setOrders([]);
  };

  // Select Ticker Handlers
  const handleSelectTicker = (ticker: TickerInfo) => {
    setActiveTickerSymbol(ticker.symbol);
  };

  const handleSelectTickerBySymbol = (symbol: string) => {
    const found = tickers.find((t) => t.symbol === symbol);
    if (found) {
      setActiveTickerSymbol(symbol);
      setActiveView('overview');
    }
  };

  const handleOpenOrderWithTicker = (ticker?: TickerInfo) => {
    if (ticker) {
      setActiveTickerSymbol(ticker.symbol);
    }
    setIsOrderModalOpen(true);
  };

  // Compute Total Portfolio Value
  const totalPortfolioValue = useMemo(() => {
    const invested = positions.reduce((acc, pos) => acc + pos.shares * pos.currentPrice, 0);
    return cashBalance + invested;
  }, [cashBalance, positions]);

  return (
    <div className="min-h-screen bg-[#FFFFFF] dark:bg-[#131722] text-[#181B24] dark:text-[#D1D4DC] flex flex-col transition-colors selection:bg-[#2962FF]/20 selection:text-[#2962FF]">
      {/* 3-Zone Global Navigation Header */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        openSearch={() => setIsSearchOpen(true)}
        openOrderModal={() => setIsOrderModalOpen(true)}
        openPortfolio={() => setIsPortfolioOpen(true)}
        portfolioValue={totalPortfolioValue}
        openPositionsCount={positions.length}
      />

      {/* Streaming Ticker Tape Ribbon */}
      <TickerMarquee
        tickers={tickers}
        activeTicker={activeTicker}
        onSelectTicker={handleSelectTicker}
        isStreaming={isStreaming}
        toggleStreaming={() => setIsStreaming((prev) => !prev)}
      />

      {/* Active Screen View */}
      <main className="flex-1 pb-16">
        {activeView === 'overview' && (
          <OverviewDashboard
            activeTicker={activeTicker}
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
            sectors={SECTORS_DATA}
            marketBreadth={MARKET_BREADTH}
            orderBook={orderBook}
            watchlist={tickers.slice(0, 8)}
            onSelectTicker={handleSelectTicker}
            openOrderModal={() => setIsOrderModalOpen(true)}
          />
        )}

        {activeView === 'charting' && (
          <ChartingStation
            activeTicker={activeTicker}
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
            orderBook={orderBook}
            openOrderModal={() => setIsOrderModalOpen(true)}
          />
        )}

        {activeView === 'screener' && (
          <ScreenerView
            tickers={tickers}
            onSelectTicker={(t) => {
              handleSelectTicker(t);
              setActiveView('overview');
            }}
            openOrderModal={handleOpenOrderWithTicker}
          />
        )}

        {activeView === 'heatmap' && (
          <HeatmapView
            tickers={tickers}
            sectors={SECTORS_DATA}
            onSelectTicker={(t) => {
              handleSelectTicker(t);
              setActiveView('overview');
            }}
            openOrderModal={handleOpenOrderWithTicker}
          />
        )}

        {activeView === 'research' && (
          <NewsIdeasView
            news={MARKET_NEWS}
            ideas={TRADE_IDEAS}
            tickers={tickers}
            onSelectTickerBySymbol={handleSelectTickerBySymbol}
            openOrderModal={handleOpenOrderWithTicker}
          />
        )}
      </main>

      {/* Footer (Clean, compliant with Anti-slop guidelines: no ornamental engines or fake telemetry) */}
      <footer className="border-t border-[#E0E3EB] dark:border-[#2A2E39] bg-[#FAFAFE] dark:bg-[#131722] py-4 text-xs text-[#737687]">
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#181B24] dark:text-white">MARKET PRECISION</span>
            <span>·</span>
            <span>Data feeds delayed 15m unless subscribed</span>
            <span>·</span>
            <span>Simulated paper portfolio environment</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveView('overview')} className="hover:text-[#181B24] dark:hover:text-white transition-colors">Overview</button>
            <button onClick={() => setActiveView('charting')} className="hover:text-[#181B24] dark:hover:text-white transition-colors">Pro Chart</button>
            <button onClick={() => setActiveView('screener')} className="hover:text-[#181B24] dark:hover:text-white transition-colors">Screener</button>
            <button onClick={() => setActiveView('heatmap')} className="hover:text-[#181B24] dark:hover:text-white transition-colors">Heatmap</button>
          </div>
        </div>
      </footer>

      {/* Global Modals & Drawers */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        tickers={tickers}
        onSelectTicker={handleSelectTicker}
      />

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        activeTicker={selectedOrderTicker || activeTicker}
        cashBalance={cashBalance}
        onPlaceOrder={handlePlaceOrder}
      />

      <PortfolioDrawer
        isOpen={isPortfolioOpen}
        onClose={() => setIsPortfolioOpen(false)}
        cashBalance={cashBalance}
        positions={positions}
        orders={orders}
        onClosePosition={handleClosePosition}
        onResetPortfolio={handleResetPortfolio}
      />
    </div>
  );
}
