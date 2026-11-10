import React from 'react';
import { Search, Sun, Moon, Briefcase, Plus, TrendingUp } from 'lucide-react';

interface HeaderProps {
  activeView: 'overview' | 'charting' | 'screener' | 'heatmap' | 'research';
  setActiveView: (view: 'overview' | 'charting' | 'screener' | 'heatmap' | 'research') => void;
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  openSearch: () => void;
  openOrderModal: () => void;
  openPortfolio: () => void;
  portfolioValue: number;
  openPositionsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  darkMode,
  setDarkMode,
  openSearch,
  openOrderModal,
  openPortfolio,
  portfolioValue,
  openPositionsCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E0E3EB] dark:border-[#2A2E39] bg-white/95 dark:bg-[#131722]/95 backdrop-blur-md transition-colors">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div 
            onClick={() => setActiveView('overview')}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#2962FF] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <TrendingUp className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-[#181B24] dark:text-white leading-none">
                MARKET PRECISION
              </span>
              <span className="text-[10px] font-semibold text-[#737687] dark:text-[#8C91A0] tracking-wider uppercase mt-0.5">
                Institutional Workstation
              </span>
            </div>
          </div>
        </div>

        {/* Zone 2: Navigation Links (1-2 words, single line) */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2 lg:gap-3 text-sm font-medium">
          <button
            onClick={() => setActiveView('overview')}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors whitespace-nowrap shrink-0 ${
              activeView === 'overview'
                ? 'bg-[#F0F3FA] dark:bg-[#1E222D] text-[#2962FF] dark:text-white font-semibold'
                : 'text-[#434656] dark:text-[#A0A5B5] hover:text-[#181B24] dark:hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveView('charting')}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors whitespace-nowrap shrink-0 ${
              activeView === 'charting'
                ? 'bg-[#F0F3FA] dark:bg-[#1E222D] text-[#2962FF] dark:text-white font-semibold'
                : 'text-[#434656] dark:text-[#A0A5B5] hover:text-[#181B24] dark:hover:text-white'
            }`}
          >
            Pro Chart
          </button>
          <button
            onClick={() => setActiveView('screener')}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors whitespace-nowrap shrink-0 ${
              activeView === 'screener'
                ? 'bg-[#F0F3FA] dark:bg-[#1E222D] text-[#2962FF] dark:text-white font-semibold'
                : 'text-[#434656] dark:text-[#A0A5B5] hover:text-[#181B24] dark:hover:text-white'
            }`}
          >
            Screener
          </button>
          <button
            onClick={() => setActiveView('heatmap')}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors whitespace-nowrap shrink-0 ${
              activeView === 'heatmap'
                ? 'bg-[#F0F3FA] dark:bg-[#1E222D] text-[#2962FF] dark:text-white font-semibold'
                : 'text-[#434656] dark:text-[#A0A5B5] hover:text-[#181B24] dark:hover:text-white'
            }`}
          >
            Heatmap
          </button>
          <button
            onClick={() => setActiveView('research')}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors whitespace-nowrap shrink-0 ${
              activeView === 'research'
                ? 'bg-[#F0F3FA] dark:bg-[#1E222D] text-[#2962FF] dark:text-white font-semibold'
                : 'text-[#434656] dark:text-[#A0A5B5] hover:text-[#181B24] dark:hover:text-white'
            }`}
          >
            News & Ideas
          </button>
        </nav>

        {/* Zone 3: Interactive Utilities & Primary Action */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Global Search Capsule */}
          <button
            onClick={openSearch}
            className="flex items-center gap-2 px-3 py-1.5 h-8 bg-[#F0F3FA] dark:bg-[#1E222D] hover:bg-[#E5E8F4] dark:hover:bg-[#2A2E39] border border-transparent hover:border-[#2962FF]/30 text-[#434656] dark:text-[#A0A5B5] rounded-full text-xs font-medium transition-all group whitespace-nowrap shrink-0"
            title="Search symbols (Ctrl+K or ⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-[#737687] group-hover:text-[#2962FF] transition-colors" />
            <span className="hidden sm:inline">Search symbol...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-white dark:bg-[#131722] border border-[#E0E3EB] dark:border-[#2A2E39] text-[10px] text-[#737687] font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Dual Theme Switch */}
          <button
            onClick={() => setDarkMode(prev => !prev)}
            aria-label="Toggle color theme"
            className="w-8 h-8 rounded-full border border-[#E0E3EB] dark:border-[#2A2E39] bg-[#F0F3FA] dark:bg-[#1E222D] hover:bg-white dark:hover:bg-[#2A2E39] flex items-center justify-center text-[#434656] dark:text-[#D1D4DC] transition-colors shrink-0"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#434656]" />}
          </button>

          {/* Portfolio quick pill */}
          <button
            onClick={openPortfolio}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 h-8 border border-[#E0E3EB] dark:border-[#2A2E39] bg-white dark:bg-[#1E222D] hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39] rounded-md text-xs font-semibold transition-colors shrink-0"
          >
            <Briefcase className="w-3.5 h-3.5 text-[#2962FF]" />
            <span className="text-[#181B24] dark:text-white font-mono tnum">
              ${portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            {openPositionsCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 text-[10px] bg-[#2962FF]/10 text-[#2962FF] rounded-sm font-bold">
                {openPositionsCount}
              </span>
            )}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={openOrderModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 h-8 bg-[#131722] dark:bg-[#2962FF] hover:bg-[#1E222D] dark:hover:bg-[#1E50DE] text-white rounded-md text-xs font-semibold shadow-sm transition-all active:scale-95 whitespace-nowrap shrink-0"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>New Order</span>
          </button>
        </div>
      </div>
    </header>
  );
};
