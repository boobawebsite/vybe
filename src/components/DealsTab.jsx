import React, { useState } from 'react';
import {
  Tag,
  Copy,
  Check,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Flame
} from 'lucide-react';
import { VYBE_DATA } from '../data/vybeData';

export default function DealsTab({ onSelectHotel }) {
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="space-y-12 pb-28 text-slate-900 max-w-6xl mx-auto px-4">
      {/* Deals Header */}
      <div className="border-b border-slate-200 pb-8 text-center max-w-3xl mx-auto space-y-2">
        <span className="text-xs uppercase font-extrabold tracking-wider text-purple-600 block">
          Exclusive City Promotions
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Deals & Promotions in Uyo
        </h1>
        <p className="text-base text-slate-600 mt-2">
          Save on luxury stays, gourmet dinners, and leisure passes with verified partner promo codes.
        </p>
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {VYBE_DATA.deals.map((deal) => {
          const discountPct = Math.round(
            ((deal.originalPrice - deal.discountedPrice) / deal.originalPrice) * 100
          );
          const isCopied = copiedCode === deal.code;

          return (
            <div
              key={deal.id}
              className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm flex flex-col justify-between group hover:border-purple-300 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-rose-600 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                  {deal.badge}
                </div>
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-xs text-purple-300 font-bold block">{deal.business}</span>
                  <h4 className="text-lg font-black leading-snug">{deal.title}</h4>
                </div>
              </div>

              <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{deal.expires}</span>
                  </div>

                  <div className="flex items-baseline gap-2 pt-2">
                    <span className="text-2xl font-black text-slate-900">
                      ₦{deal.discountedPrice.toLocaleString()}
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      ₦{deal.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      SAVE {discountPct}%
                    </span>
                  </div>
                </div>

                {/* Promo Code Box & Action */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 border border-dashed border-purple-300 text-purple-800 text-xs font-mono font-bold flex-1 justify-center">
                      <Tag className="w-3.5 h-3.5 text-purple-600" />
                      <span>{deal.code}</span>
                    </div>

                    <button
                      onClick={() => handleCopy(deal.code)}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 active:scale-95"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  {onSelectHotel && (
                    <button
                      onClick={() => {
                        const matched = VYBE_DATA.hotels.find(h => h.id === deal.hotelId) || VYBE_DATA.hotels[0];
                        onSelectHotel(matched);
                      }}
                      className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Explore this Stay</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
