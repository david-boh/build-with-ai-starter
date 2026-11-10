import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { TickerInfo, AssetClass } from '../types/market';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  tickers: TickerInfo[];
  onSelectTicker: (ticker: TickerInfo) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  tickers,
  onSelectTicker,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | AssetClass>('All');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Filter tickers based on query and category
  const filteredTickers = tickers.filter((t) => {
    const matchesCategory = selectedCategory === 'All' || t.assetClass === selectedCategory;
    const matchesQuery =
      t.symbol.toLowerCase().includes(query.toLowerCase()) ||
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.sector.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredTickers.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredTickers[selectedIndex]) {
        onSelectTicker(filteredTickers[selectedIndex]);
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-xl shadow-2xl overflow-hidden text-[#181B24] dark:text-[#D1D4DC]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#E0E3EB] dark:border-[#2A2E39] gap-3 bg-[#FAFAFE] dark:bg-[#131722]/50">
          <Search className="w-5 h-5 text-[#737687] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search symbol, company name, or sector (e.g. NVDA, Apple, Tech)..."
            className="w-full bg-transparent text-sm font-medium focus:outline-none placeholder-[#737687] dark:placeholder-[#5A5E6B] text-[#181B24] dark:text-white"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 hover:bg-[#E0E3EB] dark:hover:bg-[#2A2E39] rounded text-[#737687]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] text-[10px] text-[#737687] font-mono shrink-0">
            ESC
          </kbd>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-[#E0E3EB] dark:border-[#2A2E39] bg-white dark:bg-[#1E222D] text-xs overflow-x-auto">
          {(['All', 'Stocks', 'Crypto', 'Indices'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedIndex(0);
              }}
              className={`px-3 py-1 rounded-full font-medium transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#131722] dark:bg-[#2962FF] text-white'
                  : 'text-[#5A5E6B] dark:text-[#8C91A0] hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto divide-y divide-[#E0E3EB]/50 dark:divide-[#2A2E39]/50">
          {filteredTickers.length === 0 ? (
            <div className="py-12 text-center text-sm text-[#737687]">
              No instruments match "{query}"
            </div>
          ) : (
            filteredTickers.map((t, idx) => {
              const isSelected = idx === selectedIndex;
              const isBull = t.changePercent >= 0;

              return (
                <div
                  key={t.symbol}
                  onClick={() => {
                    onSelectTicker(t);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[#F0F3FA] dark:bg-[#2A2E39]'
                      : 'hover:bg-[#FAFAFE] dark:hover:bg-[#1E222D]/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#E0E3EB] dark:bg-[#131722] flex items-center justify-center font-bold text-xs text-[#181B24] dark:text-white shrink-0">
                      {t.symbol.slice(0, 3)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm tracking-tight text-[#181B24] dark:text-white">
                          {t.symbol}
                        </span>
                        <span className="px-1.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded bg-[#F0F3FA] dark:bg-[#131722] text-[#5A5E6B] dark:text-[#8C91A0]">
                          {t.exchange}
                        </span>
                        <span className="text-xs text-[#737687] hidden sm:inline">
                          · {t.sector}
                        </span>
                      </div>
                      <div className="text-xs text-[#5A5E6B] dark:text-[#8C91A0] truncate max-w-xs sm:max-w-sm">
                        {t.name}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-mono font-bold text-sm text-[#181B24] dark:text-white tnum">
                      ${t.price > 1000 ? t.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : t.price.toFixed(2)}
                    </div>
                    <div
                      className={`flex items-center justify-end font-mono text-xs font-semibold tnum ${
                        isBull ? 'text-[#089981]' : 'text-[#F23645]'
                      }`}
                    >
                      {isBull ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                      {isBull ? '+' : ''}{t.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-[#FAFAFE] dark:bg-[#131722] border-t border-[#E0E3EB] dark:border-[#2A2E39] flex items-center justify-between text-[11px] text-[#737687]">
          <span>Use ↑ ↓ to navigate, Enter to select</span>
          <span>{filteredTickers.length} instruments found</span>
        </div>
      </div>
    </div>
  );
};
