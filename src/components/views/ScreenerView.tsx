import React, { useState, useMemo } from 'react';
import { TickerInfo } from '../../types/market';
import { Search, ArrowUpRight, ArrowDownRight, ArrowUpDown } from 'lucide-react';

interface ScreenerViewProps {
  tickers: TickerInfo[];
  onSelectTicker: (ticker: TickerInfo) => void;
  openOrderModal: (ticker?: TickerInfo) => void;
}

type FilterCategory = 'All' | 'Gainers' | 'Losers' | 'Most Active' | 'Mega Caps' | 'High Beta';
type SortField = 'symbol' | 'price' | 'changePercent' | 'volume' | 'peRatio';

export const ScreenerView: React.FC<ScreenerViewProps> = ({
  tickers,
  onSelectTicker,
  openOrderModal,
}) => {
  const [filter, setFilter] = useState<FilterCategory>('All');
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('changePercent');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  // Sorting and filtering
  const processedTickers = useMemo(() => {
    let list = [...tickers];

    // Filter by category
    if (filter === 'Gainers') {
      list = list.filter((t) => t.changePercent > 0);
    } else if (filter === 'Losers') {
      list = list.filter((t) => t.changePercent < 0);
    } else if (filter === 'Most Active') {
      list = list.sort((a, b) => b.volume - a.volume);
    } else if (filter === 'Mega Caps') {
      list = list.filter((t) => t.marketCap.includes('T') || t.marketCap.includes('$3') || t.marketCap.includes('$2'));
    } else if (filter === 'High Beta') {
      list = list.filter((t) => t.beta > 1.4);
    }

    // Filter by search query
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.symbol.toLowerCase().includes(q) ||
          t.name.toLowerCase().includes(q) ||
          t.sector.toLowerCase().includes(q)
      );
    }

    // Sort
    list.sort((a, b) => {
      let valA: any = a[sortField];
      let valB: any = b[sortField];
      if (valA === undefined) valA = 0;
      if (valB === undefined) valB = 0;

      if (typeof valA === 'string') {
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortAsc ? valA - valB : valB - valA;
    });

    return list;
  }, [tickers, filter, search, sortField, sortAsc]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc((prev) => !prev);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Title & Description */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[#181B24] dark:text-white">
            Market Screener & Hotlists
          </h2>
          <span className="text-xs text-[#737687]">
            Real-time equity filtration, relative volume spikes, and valuation multiples
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737687]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter list by symbol or sector..."
            className="w-full pl-9 pr-3 py-1.5 bg-[#F0F3FA] dark:bg-[#1E222D] border border-transparent focus:border-[#2962FF] rounded-full text-xs text-[#181B24] dark:text-white focus:outline-none transition-all placeholder-[#737687]"
          />
        </div>
      </div>

      {/* Pill Filters Horizontal Bar (strictly following specs) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {(['All', 'Gainers', 'Losers', 'Most Active', 'Mega Caps', 'High Beta'] as FilterCategory[]).map(
          (category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`h-8 px-3.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                filter === category
                  ? 'bg-[#131722] dark:bg-[#2962FF] text-white shadow-xs'
                  : 'text-[#737687] hover:text-[#181B24] dark:hover:text-white hover:bg-[#F0F3FA] dark:hover:bg-[#1E222D]'
              }`}
            >
              {category}
            </button>
          )
        )}
      </div>

      {/* Screener Data Table with 48px row height & sticky ticker column */}
      <div className="bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-lg overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E0E3EB] dark:border-[#2A2E39] bg-[#FAFAFE] dark:bg-[#131722]/60 text-[11px] font-bold uppercase tracking-wider text-[#737687]">
                <th className="py-3 px-4 sticky left-0 bg-[#FAFAFE] dark:bg-[#131722] z-10 w-64">
                  <button
                    onClick={() => handleSort('symbol')}
                    className="flex items-center gap-1 hover:text-[#181B24] dark:hover:text-white"
                  >
                    Ticker & Company
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="py-3 px-4 text-right">
                  <button
                    onClick={() => handleSort('price')}
                    className="flex items-center justify-end gap-1 w-full hover:text-[#181B24] dark:hover:text-white"
                  >
                    Price ($)
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="py-3 px-4 text-right">
                  <button
                    onClick={() => handleSort('changePercent')}
                    className="flex items-center justify-end gap-1 w-full hover:text-[#181B24] dark:hover:text-white"
                  >
                    Change %
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="py-3 px-4 text-right">
                  <button
                    onClick={() => handleSort('volume')}
                    className="flex items-center justify-end gap-1 w-full hover:text-[#181B24] dark:hover:text-white"
                  >
                    Volume (24H)
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="py-3 px-4 text-right">Day Range</th>
                <th className="py-3 px-4 text-right">Market Cap</th>
                <th className="py-3 px-4 text-right">
                  <button
                    onClick={() => handleSort('peRatio')}
                    className="flex items-center justify-end gap-1 w-full hover:text-[#181B24] dark:hover:text-white"
                  >
                    P/E
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="py-3 px-4 text-right">Beta</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E0E3EB]/60 dark:divide-[#2A2E39]/60 text-xs">
              {processedTickers.map((item) => {
                const isGain = item.changePercent >= 0;

                return (
                  <tr
                    key={item.symbol}
                    onClick={() => onSelectTicker(item)}
                    className="h-12 hover:bg-[#F8FAFD] dark:hover:bg-[#131722]/80 cursor-pointer transition-colors group"
                  >
                    {/* Sticky Ticker Column */}
                    <td className="py-2.5 px-4 sticky left-0 bg-white dark:bg-[#1E222D] group-hover:bg-[#F8FAFD] dark:group-hover:bg-[#131722]/80 z-10">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded bg-[#F0F3FA] dark:bg-[#131722] flex items-center justify-center font-bold text-[11px] text-[#181B24] dark:text-white shrink-0">
                          {item.symbol.slice(0, 3)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-[#181B24] dark:text-white">
                              {item.symbol}
                            </span>
                            <span className="px-1 py-0.2 rounded text-[10px] bg-[#F0F3FA] dark:bg-[#131722] text-[#737687]">
                              {item.exchange}
                            </span>
                          </div>
                          <div className="text-[11px] text-[#737687] truncate max-w-[140px]">
                            {item.name}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-2.5 px-4 text-right font-mono font-bold text-[#181B24] dark:text-white tnum">
                      ${item.price > 1000 ? item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : item.price.toFixed(2)}
                    </td>

                    {/* Change % */}
                    <td className="py-2.5 px-4 text-right font-mono font-bold tnum">
                      <span
                        className={`inline-flex items-center gap-0.5 ${
                          isGain ? 'text-[#089981]' : 'text-[#F23645]'
                        }`}
                      >
                        {isGain ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                        {isGain ? '+' : ''}{item.changePercent.toFixed(2)}%
                      </span>
                    </td>

                    {/* Volume */}
                    <td className="py-2.5 px-4 text-right font-mono text-[#5A5E6B] dark:text-[#A0A5B5] tnum">
                      {(item.volume / 1000000).toFixed(2)}M
                    </td>

                    {/* Day Range */}
                    <td className="py-2.5 px-4 text-right font-mono text-[#737687] tnum">
                      ${item.low.toFixed(2)} - ${item.high.toFixed(2)}
                    </td>

                    {/* Market Cap */}
                    <td className="py-2.5 px-4 text-right font-mono text-[#181B24] dark:text-white tnum">
                      {item.marketCap}
                    </td>

                    {/* P/E Ratio */}
                    <td className="py-2.5 px-4 text-right font-mono text-[#5A5E6B] dark:text-[#A0A5B5] tnum">
                      {item.peRatio ? item.peRatio.toFixed(1) : '—'}
                    </td>

                    {/* Beta */}
                    <td className="py-2.5 px-4 text-right font-mono text-[#5A5E6B] dark:text-[#A0A5B5] tnum">
                      {item.beta.toFixed(2)}
                    </td>

                    {/* Action */}
                    <td className="py-2.5 px-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectTicker(item);
                          openOrderModal(item);
                        }}
                        className="px-2.5 py-1 rounded bg-[#F0F3FA] dark:bg-[#131722] hover:bg-[#2962FF] hover:text-white dark:hover:bg-[#2962FF] text-[#181B24] dark:text-white text-[11px] font-semibold transition-colors"
                      >
                        Trade
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
