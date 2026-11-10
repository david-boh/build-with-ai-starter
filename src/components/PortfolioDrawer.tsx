import React from 'react';
import { X, ArrowUpRight, ArrowDownRight, Trash2, RotateCcw } from 'lucide-react';
import { Position, Order } from '../types/market';

interface PortfolioDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cashBalance: number;
  positions: Position[];
  orders: Order[];
  onClosePosition: (id: string) => void;
  onResetPortfolio: () => void;
}

export const PortfolioDrawer: React.FC<PortfolioDrawerProps> = ({
  isOpen,
  onClose,
  cashBalance,
  positions,
  orders,
  onClosePosition,
  onResetPortfolio,
}) => {
  if (!isOpen) return null;

  const positionsValue = positions.reduce(
    (acc, pos) => acc + pos.shares * pos.currentPrice,
    0
  );
  const totalValue = cashBalance + positionsValue;
  const totalUnrealizedPL = positions.reduce(
    (acc, pos) => acc + pos.unrealizedPL,
    0
  );
  const totalUnrealizedPLPercent =
    totalValue > 0 ? (totalUnrealizedPL / (totalValue - totalUnrealizedPL)) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-lg bg-white dark:bg-[#1E222D] border-l border-[#E0E3EB] dark:border-[#2A2E39] shadow-2xl h-full flex flex-col text-[#181B24] dark:text-[#D1D4DC]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E0E3EB] dark:border-[#2A2E39] bg-[#FAFAFE] dark:bg-[#131722]/60">
          <div>
            <h3 className="text-base font-bold text-[#181B24] dark:text-white">
              Paper Trading Portfolio
            </h3>
            <span className="text-xs text-[#737687]">
              Simulated Execution & Position Ledger
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onResetPortfolio}
              title="Reset to $100,000 cash"
              className="p-1.5 hover:bg-[#E0E3EB] dark:hover:bg-[#2A2E39] rounded text-[#737687] hover:text-[#181B24] dark:hover:text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-[#E0E3EB] dark:hover:bg-[#2A2E39] rounded text-[#737687]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Portfolio Stats Strip */}
        <div className="grid grid-cols-2 gap-3 p-5 border-b border-[#E0E3EB] dark:border-[#2A2E39] bg-[#FAFAFE] dark:bg-[#131722]/30">
          <div className="p-3 bg-white dark:bg-[#1E222D] rounded-lg border border-[#E0E3EB] dark:border-[#2A2E39]">
            <span className="text-[11px] font-semibold text-[#737687] uppercase tracking-wider block">
              Total Account Value
            </span>
            <span className="text-lg font-mono font-bold text-[#181B24] dark:text-white tnum mt-0.5 block">
              ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="p-3 bg-white dark:bg-[#1E222D] rounded-lg border border-[#E0E3EB] dark:border-[#2A2E39]">
            <span className="text-[11px] font-semibold text-[#737687] uppercase tracking-wider block">
              Available Cash
            </span>
            <span className="text-lg font-mono font-bold text-[#181B24] dark:text-white tnum mt-0.5 block">
              ${cashBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="p-3 bg-white dark:bg-[#1E222D] rounded-lg border border-[#E0E3EB] dark:border-[#2A2E39]">
            <span className="text-[11px] font-semibold text-[#737687] uppercase tracking-wider block">
              Unrealized P&L
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <span
                className={`text-base font-mono font-bold tnum ${
                  totalUnrealizedPL >= 0 ? 'text-[#089981]' : 'text-[#F23645]'
                }`}
              >
                {totalUnrealizedPL >= 0 ? '+' : ''}${totalUnrealizedPL.toFixed(2)}
              </span>
              <span
                className={`text-xs font-mono font-medium tnum ${
                  totalUnrealizedPL >= 0 ? 'text-[#089981]' : 'text-[#F23645]'
                }`}
              >
                ({totalUnrealizedPLPercent >= 0 ? '+' : ''}{totalUnrealizedPLPercent.toFixed(2)}%)
              </span>
            </div>
          </div>

          <div className="p-3 bg-white dark:bg-[#1E222D] rounded-lg border border-[#E0E3EB] dark:border-[#2A2E39]">
            <span className="text-[11px] font-semibold text-[#737687] uppercase tracking-wider block">
              Invested Capital
            </span>
            <span className="text-lg font-mono font-bold text-[#181B24] dark:text-white tnum mt-0.5 block">
              ${positionsValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Positions & Orders Tabs */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Active Positions */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#5A5E6B] dark:text-[#8C91A0]">
                Open Positions ({positions.length})
              </h4>
            </div>

            {positions.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#737687] border border-dashed border-[#E0E3EB] dark:border-[#2A2E39] rounded-lg">
                No active positions. Execute a trade to establish a position.
              </div>
            ) : (
              <div className="space-y-2.5">
                {positions.map((pos) => {
                  const isGain = pos.unrealizedPL >= 0;
                  return (
                    <div
                      key={pos.id}
                      className="p-3.5 bg-[#FAFAFE] dark:bg-[#131722] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-lg flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#181B24] dark:text-white">
                            {pos.symbol}
                          </span>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              pos.type === 'BUY'
                                ? 'bg-[#089981]/15 text-[#089981]'
                                : 'bg-[#F23645]/15 text-[#F23645]'
                            }`}
                          >
                            {pos.type}
                          </span>
                          <span className="text-[#737687] font-mono tnum">
                            {pos.shares} shs
                          </span>
                        </div>
                        <div className="text-[#5A5E6B] dark:text-[#8C91A0] text-[11px] font-mono tnum mt-1">
                          Entry: ${pos.entryPrice.toFixed(2)} · Last: ${pos.currentPrice.toFixed(2)}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right font-mono tnum">
                          <div
                            className={`font-bold text-sm ${
                              isGain ? 'text-[#089981]' : 'text-[#F23645]'
                            }`}
                          >
                            {isGain ? '+' : ''}${pos.unrealizedPL.toFixed(2)}
                          </div>
                          <div
                            className={`text-[11px] font-medium ${
                              isGain ? 'text-[#089981]' : 'text-[#F23645]'
                            }`}
                          >
                            {isGain ? '+' : ''}{pos.unrealizedPLPercent.toFixed(2)}%
                          </div>
                        </div>

                        <button
                          onClick={() => onClosePosition(pos.id)}
                          title="Close position"
                          className="p-1.5 hover:bg-[#E0E3EB] dark:hover:bg-[#2A2E39] rounded text-[#737687] hover:text-[#F23645] transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Orders Log */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#5A5E6B] dark:text-[#8C91A0]">
                Execution Audit Log ({orders.length})
              </h4>
            </div>

            {orders.length === 0 ? (
              <div className="py-6 text-center text-xs text-[#737687] border border-dashed border-[#E0E3EB] dark:border-[#2A2E39] rounded-lg">
                No orders filled in this session.
              </div>
            ) : (
              <div className="divide-y divide-[#E0E3EB] dark:divide-[#2A2E39] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-lg overflow-hidden bg-white dark:bg-[#1E222D]">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="flex items-center justify-between px-3.5 py-2.5 text-xs font-mono tnum"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-bold ${
                          ord.side === 'BUY' ? 'text-[#089981]' : 'text-[#F23645]'
                        }`}
                      >
                        {ord.side}
                      </span>
                      <span className="font-sans font-bold text-[#181B24] dark:text-white">
                        {ord.shares} {ord.symbol}
                      </span>
                      <span className="text-[10px] text-[#737687] uppercase">
                        @{ord.orderType}
                      </span>
                    </div>

                    <div className="text-right">
                      <div className="font-bold text-[#181B24] dark:text-white">
                        ${ord.price.toFixed(2)}
                      </div>
                      <div className="text-[10px] text-[#737687]">
                        {new Date(ord.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
