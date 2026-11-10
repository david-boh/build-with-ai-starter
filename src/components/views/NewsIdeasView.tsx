import React, { useState } from 'react';
import { NewsItem, TradeIdea, TickerInfo } from '../../types/market';
import { ArrowUpRight, ArrowDownRight, Newspaper, Lightbulb, ThumbsUp } from 'lucide-react';

interface NewsIdeasViewProps {
  news: NewsItem[];
  ideas: TradeIdea[];
  tickers: TickerInfo[];
  onSelectTickerBySymbol: (symbol: string) => void;
  openOrderModal: (ticker?: TickerInfo) => void;
}

export const NewsIdeasView: React.FC<NewsIdeasViewProps> = ({
  news,
  ideas,
  tickers,
  onSelectTickerBySymbol,
  openOrderModal,
}) => {
  const [activeTab, setActiveTab] = useState<'news' | 'ideas'>('news');
  const [newsFilter, setNewsFilter] = useState<string>('All');
  const [likedIdeas, setLikedIdeas] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string) => {
    setLikedIdeas((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredNews = newsFilter === 'All'
    ? news
    : news.filter((n) => n.category === newsFilter);

  return (
    <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Title & Segmented Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[#181B24] dark:text-white">
            Market Intelligence & Trade Ideas
          </h2>
          <span className="text-xs text-[#737687]">
            Macro commentary, earnings releases, and verified technical trade setups
          </span>
        </div>

        {/* Tab switch */}
        <div className="flex items-center bg-[#E5E8F4] dark:bg-[#1E222D] p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('news')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === 'news'
                ? 'bg-white dark:bg-[#2A2E39] text-[#2962FF] dark:text-white shadow-xs'
                : 'text-[#5A5E6B] dark:text-[#8C91A0] hover:text-[#181B24] dark:hover:text-white'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            Top Stories & Macro
          </button>
          <button
            onClick={() => setActiveTab('ideas')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === 'ideas'
                ? 'bg-white dark:bg-[#2A2E39] text-[#2962FF] dark:text-white shadow-xs'
                : 'text-[#5A5E6B] dark:text-[#8C91A0] hover:text-[#181B24] dark:hover:text-white'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            Community Trade Ideas
          </button>
        </div>
      </div>

      {activeTab === 'news' ? (
        <div className="space-y-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {(['All', 'Tech', 'Fed', 'Macro', 'Commodities'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setNewsFilter(cat)}
                className={`h-8 px-3.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                  newsFilter === cat
                    ? 'bg-[#131722] dark:bg-[#2962FF] text-white'
                    : 'text-[#737687] hover:bg-[#F0F3FA] dark:hover:bg-[#1E222D]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* News List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNews.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-lg p-5 flex flex-col justify-between hover:border-[#2962FF]/40 transition-colors"
              >
                <div>
                  {/* Clean unboxed metadata with · separators */}
                  <div className="flex items-center gap-2 text-xs text-[#737687] mb-2 font-medium">
                    <span className="text-[#2962FF] font-semibold">{item.source}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.time}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.readTime}</span>
                  </div>

                  <h3 className="text-base font-bold text-[#181B24] dark:text-white leading-snug hover:text-[#2962FF] transition-colors cursor-pointer">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#5A5E6B] dark:text-[#A0A5B5] mt-2.5 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                {/* Footer with ticker tags & sentiment */}
                <div className="mt-4 pt-3 border-t border-[#E0E3EB]/60 dark:border-[#2A2E39]/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    {item.relatedTickers.map((sym) => (
                      <button
                        key={sym}
                        onClick={() => onSelectTickerBySymbol(sym)}
                        className="px-2 py-0.5 rounded bg-[#F0F3FA] dark:bg-[#131722] text-[#2962FF] hover:bg-[#2962FF] hover:text-white dark:hover:bg-[#2962FF] text-[11px] font-bold font-mono transition-colors"
                      >
                        ${sym}
                      </button>
                    ))}
                  </div>

                  <span
                    className={`font-semibold text-[11px] uppercase ${
                      item.sentiment === 'bullish'
                        ? 'text-[#089981]'
                        : item.sentiment === 'bearish'
                        ? 'text-[#F23645]'
                        : 'text-[#737687]'
                    }`}
                  >
                    {item.sentiment}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Trade Ideas List */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ideas.map((idea) => {
            const isLong = idea.direction === 'LONG';
            const isLiked = likedIdeas[idea.id];
            const currentLikes = idea.likes + (isLiked ? 1 : 0);

            return (
              <div
                key={idea.id}
                className="bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-lg p-5 flex flex-col justify-between hover:border-[#2962FF]/50 transition-all"
              >
                <div>
                  {/* Author Lockup */}
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <div>
                      <span className="font-bold text-[#181B24] dark:text-white block">
                        {idea.author}
                      </span>
                      <span className="text-[11px] text-[#737687] block">
                        {idea.authorRole} · {idea.timestamp}
                      </span>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                        isLong
                          ? 'bg-[#089981]/15 text-[#089981]'
                          : 'bg-[#F23645]/15 text-[#F23645]'
                      }`}
                    >
                      {idea.direction}
                    </span>
                  </div>

                  {/* Title & Setup Details */}
                  <h4 className="text-sm font-bold text-[#181B24] dark:text-white leading-snug">
                    {idea.title}
                  </h4>

                  {/* Trade Parameters Table */}
                  <div className="grid grid-cols-3 gap-2 my-3 p-2.5 bg-[#FAFAFE] dark:bg-[#131722] rounded border border-[#E0E3EB] dark:border-[#2A2E39] text-center font-mono tnum">
                    <div>
                      <span className="text-[10px] text-[#737687] block uppercase">Entry</span>
                      <span className="text-xs font-bold text-[#181B24] dark:text-white">
                        ${idea.entryPrice.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#089981] block uppercase">Target</span>
                      <span className="text-xs font-bold text-[#089981]">
                        ${idea.targetPrice.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#F23645] block uppercase">Stop Loss</span>
                      <span className="text-xs font-bold text-[#F23645]">
                        ${idea.stopLossPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#5A5E6B] dark:text-[#A0A5B5] leading-relaxed">
                    {idea.analysis}
                  </p>
                </div>

                {/* Footer with actions */}
                <div className="mt-4 pt-3 border-t border-[#E0E3EB]/60 dark:border-[#2A2E39]/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleLike(idea.id)}
                      className={`flex items-center gap-1.5 transition-colors ${
                        isLiked ? 'text-[#2962FF] font-bold' : 'text-[#737687] hover:text-[#181B24] dark:hover:text-white'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{currentLikes}</span>
                    </button>
                    <span className="text-[#737687] font-mono">R:R {idea.riskReward}</span>
                  </div>

                  <button
                    onClick={() => onSelectTickerBySymbol(idea.symbol)}
                    className="px-3 py-1 rounded bg-[#2962FF] hover:bg-[#1E50DE] text-white text-xs font-semibold transition-colors"
                  >
                    Inspect {idea.symbol}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
