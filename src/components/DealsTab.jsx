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
    <div className="space-y-8 pb-24 text-slate-900">
      {/* Deals Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 uppercase tracking-widest mb-1">
          <Flame className="w-3.5 h-3.5" />
          <span>Exclusive Local Offers • Section 10</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Deals & Promotions in Uyo
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Save on luxury stays, gourmet dinners, and leisure passes with verified partner codes.
        </p>
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {VYBE_DATA.deals.map((deal) => {
          const discountPct = Math.round(
            ((deal.originalPrice - deal.discountedPrice) / deal.originalPrice) * 100
          );
          const isCopied = copiedCode === deal.code;

          return (
            <div
              key={deal.id}
              className="apple-glass-card rounded-[28px] overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-md transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-rose-600 text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                  {deal.badge}
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-xs text-purple-200 font-semibold">{deal.business}</span>
                  <h4 className="text-base font-extrabold leading-snug">{deal.title}</h4>
                </div>
              </div>

              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{deal.expires}</span>
                  </div>

                  <div className="flex items-baseline gap-2 pt-2">
                    <span className="text-xl font-black text-slate-900">
                      ₦{deal.discountedPrice.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      ₦{deal.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      SAVE {discountPct}%
                    </span>
                  </div>
                </div>

                {/* Promo Code Box */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 border border-dashed border-purple-300 text-purple-700 text-xs font-mono font-bold flex-1 justify-center">
                    <Tag className="w-3.5 h-3.5 text-purple-600" />
                    <span>{deal.code}</span>
                  </div>

                  <button
                    onClick={() => handleCopy(deal.code)}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Copied' : 'Redeem'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
