import React, { useState } from 'react';
import { X, ArrowUpRight, ArrowDownRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { TickerInfo, Order, Position } from '../types/market';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTicker: TickerInfo;
  cashBalance: number;
  onPlaceOrder: (order: Order, newPosition?: Position) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  activeTicker,
  cashBalance,
  onPlaceOrder,
}) => {
  const [side, setSide] = useState<'BUY' | 'SELL'>('BUY');
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT' | 'STOP'>('MARKET');
  const [shares, setShares] = useState<number>(10);
  const [limitPrice, setLimitPrice] = useState<number>(activeTicker.price);
  const [takeProfit, setTakeProfit] = useState<boolean>(false);
  const [tpPrice, setTpPrice] = useState<number>(Number((activeTicker.price * 1.1).toFixed(2)));
  const [stopLoss, setStopLoss] = useState<boolean>(false);
  const [slPrice, setSlPrice] = useState<number>(Number((activeTicker.price * 0.95).toFixed(2)));
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const executionPrice = orderType === 'MARKET' ? activeTicker.price : limitPrice;
  const estimatedCost = shares * executionPrice;
  const canAfford = side === 'SELL' || estimatedCost <= cashBalance;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (shares <= 0 || !canAfford) return;

    const newOrder: Order = {
      id: `ord-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      symbol: activeTicker.symbol,
      side,
      orderType,
      shares,
      price: executionPrice,
      status: 'FILLED',
      timestamp: Date.now(),
    };

    const newPos: Position = {
      id: `pos-${Date.now()}`,
      symbol: activeTicker.symbol,
      type: side,
      shares,
      entryPrice: executionPrice,
      currentPrice: activeTicker.price,
      unrealizedPL: 0,
      unrealizedPLPercent: 0,
      timestamp: Date.now(),
    };

    onPlaceOrder(newOrder, newPos);
    setSuccessNotice(`Order Filled: ${side} ${shares} ${activeTicker.symbol} @ $${executionPrice.toFixed(2)}`);

    setTimeout(() => {
      setSuccessNotice(null);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-md bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-xl shadow-2xl overflow-hidden text-[#181B24] dark:text-[#D1D4DC]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#E0E3EB] dark:border-[#2A2E39] bg-[#FAFAFE] dark:bg-[#131722]/50">
          <div className="flex items-center gap-2.5">
            <span className="font-bold text-base text-[#181B24] dark:text-white">
              {activeTicker.symbol}
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-[#F0F3FA] dark:bg-[#2A2E39] text-[#5A5E6B] dark:text-[#8C91A0] uppercase font-semibold">
              {activeTicker.exchange}
            </span>
            <span className="font-mono text-sm font-semibold tnum text-[#181B24] dark:text-white">
              ${activeTicker.price.toFixed(2)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#E0E3EB] dark:hover:bg-[#2A2E39] rounded text-[#737687]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Side Tabs (Buy / Sell) */}
        <div className="grid grid-cols-2 p-3 gap-2 bg-[#FAFAFE] dark:bg-[#131722]/40 border-b border-[#E0E3EB] dark:border-[#2A2E39]">
          <button
            type="button"
            onClick={() => setSide('BUY')}
            className={`py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
              side === 'BUY'
                ? 'bg-[#089981] text-white shadow-sm'
                : 'bg-white dark:bg-[#1E222D] text-[#737687] hover:text-[#181B24] dark:hover:text-white border border-[#E0E3EB] dark:border-[#2A2E39]'
            }`}
          >
            <ArrowUpRight className="w-4 h-4" />
            BUY / LONG
          </button>
          <button
            type="button"
            onClick={() => setSide('SELL')}
            className={`py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
              side === 'SELL'
                ? 'bg-[#F23645] text-white shadow-sm'
                : 'bg-white dark:bg-[#1E222D] text-[#737687] hover:text-[#181B24] dark:hover:text-white border border-[#E0E3EB] dark:border-[#2A2E39]'
            }`}
          >
            <ArrowDownRight className="w-4 h-4" />
            SELL / SHORT
          </button>
        </div>

        {successNotice ? (
          <div className="p-8 flex flex-col items-center justify-center text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#089981] animate-bounce" />
            <h4 className="text-base font-bold text-[#181B24] dark:text-white">
              Order Executed Successfully
            </h4>
            <p className="text-xs text-[#5A5E6B] dark:text-[#A0A5B5] font-mono">
              {successNotice}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            {/* Order Type */}
            <div>
              <label className="block text-xs font-semibold text-[#5A5E6B] dark:text-[#8C91A0] uppercase tracking-wider mb-1.5">
                Order Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['MARKET', 'LIMIT', 'STOP'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setOrderType(type)}
                    className={`py-1.5 text-xs font-semibold rounded-md border transition-all ${
                      orderType === type
                        ? 'border-[#2962FF] bg-[#2962FF]/10 text-[#2962FF] dark:text-white dark:bg-[#2962FF]'
                        : 'border-[#E0E3EB] dark:border-[#2A2E39] text-[#737687] hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[#5A5E6B] dark:text-[#8C91A0] uppercase tracking-wider">
                  Shares / Quantity
                </label>
                <div className="flex items-center gap-1.5">
                  {[10, 50, 100, 500].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setShares(preset)}
                      className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#F0F3FA] dark:bg-[#2A2E39] text-[#5A5E6B] dark:text-[#A0A5B5] hover:text-[#181B24] dark:hover:text-white"
                    >
                      +{preset}
                    </button>
                  ))}
                </div>
              </div>
              <input
                type="number"
                min="1"
                step="1"
                value={shares}
                onChange={(e) => setShares(Math.max(1, parseInt(e.target.value) || 0))}
                className="w-full px-3 py-2 bg-[#FAFAFE] dark:bg-[#131722] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-md text-sm font-mono tnum focus:outline-none focus:border-[#2962FF]"
              />
            </div>

            {/* Price (for Limit/Stop) */}
            {orderType !== 'MARKET' && (
              <div>
                <label className="block text-xs font-semibold text-[#5A5E6B] dark:text-[#8C91A0] uppercase tracking-wider mb-1.5">
                  {orderType} Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={limitPrice}
                  onChange={(e) => setLimitPrice(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-[#FAFAFE] dark:bg-[#131722] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-md text-sm font-mono tnum focus:outline-none focus:border-[#2962FF]"
                />
              </div>
            )}

            {/* Take Profit & Stop Loss Toggles */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-[#5A5E6B] dark:text-[#8C91A0] mb-1">
                  <input
                    type="checkbox"
                    checked={takeProfit}
                    onChange={(e) => setTakeProfit(e.target.checked)}
                    className="rounded text-[#089981]"
                  />
                  Take Profit ($)
                </label>
                {takeProfit && (
                  <input
                    type="number"
                    step="0.01"
                    value={tpPrice}
                    onChange={(e) => setTpPrice(parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1.5 bg-[#FAFAFE] dark:bg-[#131722] border border-[#E0E3EB] dark:border-[#2A2E39] rounded text-xs font-mono tnum"
                  />
                )}
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-[#5A5E6B] dark:text-[#8C91A0] mb-1">
                  <input
                    type="checkbox"
                    checked={stopLoss}
                    onChange={(e) => setStopLoss(e.target.checked)}
                    className="rounded text-[#F23645]"
                  />
                  Stop Loss ($)
                </label>
                {stopLoss && (
                  <input
                    type="number"
                    step="0.01"
                    value={slPrice}
                    onChange={(e) => setSlPrice(parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1.5 bg-[#FAFAFE] dark:bg-[#131722] border border-[#E0E3EB] dark:border-[#2A2E39] rounded text-xs font-mono tnum"
                  />
                )}
              </div>
            </div>

            {/* Estimated Order Summary */}
            <div className="p-3 bg-[#F0F3FA] dark:bg-[#131722] rounded-lg text-xs space-y-1.5 border border-[#E0E3EB] dark:border-[#2A2E39]">
              <div className="flex justify-between text-[#5A5E6B] dark:text-[#8C91A0]">
                <span>Estimated Notional Value</span>
                <span className="font-mono font-semibold text-[#181B24] dark:text-white tnum">
                  ${estimatedCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between text-[#5A5E6B] dark:text-[#8C91A0]">
                <span>Available Cash Balance</span>
                <span className="font-mono font-semibold text-[#181B24] dark:text-white tnum">
                  ${cashBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              {!canAfford && (
                <div className="text-[#F23645] text-[11px] font-semibold pt-1">
                  Insufficient funds for this transaction.
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!canAfford}
              className={`w-full py-3 rounded-lg font-bold text-sm tracking-wide text-white uppercase transition-all shadow-md active:scale-[0.99] ${
                !canAfford
                  ? 'bg-slate-400 cursor-not-allowed opacity-60'
                  : side === 'BUY'
                  ? 'bg-[#089981] hover:bg-[#078570]'
                  : 'bg-[#F23645] hover:bg-[#D92837]'
              }`}
            >
              Confirm {side} {shares} Shares
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#737687]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#089981]" />
              <span>Simulated execution with instant fill & portfolio tracking</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
