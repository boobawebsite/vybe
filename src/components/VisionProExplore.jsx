import React, { useState } from 'react';
import {
  MapPin,
  Star,
  Navigation,
  List,
  Map as MapIcon,
  ChevronRight,
  Heart,
  SlidersHorizontal,
  Search,
  Sparkles,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { VYBE_DATA } from '../data/vybeData';

export default function VisionProExplore({ onSelectHotel, savedIds, onToggleSave }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activePin, setActivePin] = useState(VYBE_DATA.hotels[0]);

  return (
    <div className="space-y-8 pb-24 text-white">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-widest mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Living Spatial City Map</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Explore Uyo
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Browse live hotel markers, venues, and experiences across Akwa Ibom State.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {['all', 'hotels', 'restaurants', 'nightlife', 'events'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold capitalize transition-all border whitespace-nowrap ${
                selectedFilter === cat
                  ? 'bg-purple-600 text-white border-purple-500 shadow-md'
                  : 'apple-glass text-slate-300 hover:text-white hover:border-white/25'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Desktop Spatial View: Left Interactive Map, Right Selected Places Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Interactive Living Map Container (7 Columns on Desktop) */}
        <div className="lg:col-span-7 apple-glass rounded-[36px] overflow-hidden p-3 relative h-[520px] sm:h-[620px] shadow-2xl">
          <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-[#0d0f17]">
            {/* Dark Mode Spatial Stylized Map Canvas */}
            <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid-dark" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#334155" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-dark)" />
              {/* Roads / Rivers */}
              <path d="M-50,300 Q200,220 450,260 T900,200" fill="none" stroke="#38bdf8" strokeWidth="14" strokeLinecap="round" opacity="0.4" />
              <path d="M140,-20 Q200,280 260,650" fill="none" stroke="#a855f7" strokeWidth="9" strokeLinecap="round" opacity="0.5" />
              <path d="M-10,140 Q380,170 750,360" fill="none" stroke="#6366f1" strokeWidth="8" strokeLinecap="round" opacity="0.4" />
            </svg>

            {/* Landmarks Labels */}
            <div className="absolute top-12 left-12 text-[10px] font-bold text-slate-300 bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-md border border-white/10">
              Ikot Ekpene Rd
            </div>
            <div className="absolute top-32 right-16 text-[10px] font-bold text-slate-300 bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-md border border-white/10">
              Nwaniba Rd
            </div>
            <div className="absolute bottom-28 left-1/3 text-[10px] font-bold text-emerald-300 bg-emerald-950/60 px-2.5 py-1 rounded-md backdrop-blur-md border border-emerald-500/20">
              🌳 Discovery Park Uyo
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-black text-purple-200 bg-purple-950/70 px-4 py-1.5 rounded-full backdrop-blur-md border border-purple-500/30">
              📍 Central Uyo Plaza
            </div>

            {/* Spatial Glowing Price Pins */}
            {VYBE_DATA.hotels.map((hotel) => {
              const isSelected = activePin?.id === hotel.id;
              return (
                <div
                  key={hotel.id}
                  style={{ top: `${hotel.coordinates.y}%`, left: `${hotel.coordinates.x}%` }}
                  onClick={() => setActivePin(hotel)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                >
                  <div
                    className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-xl ${
                      isSelected
                        ? 'bg-purple-600 text-white ring-4 ring-purple-500/50 scale-110 shadow-purple-500/50'
                        : 'bg-black/80 text-white border border-white/20 hover:scale-105 backdrop-blur-md'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                    <span>₦{(hotel.pricePerNight / 1000).toFixed(0)}k</span>
                  </div>
                  <div
                    className={`w-2.5 h-2.5 mx-auto -mt-1 rotate-45 transition-colors ${
                      isSelected ? 'bg-purple-600' : 'bg-black/80 border-r border-b border-white/20'
                    }`}
                  />
                </div>
              );
            })}

            {/* GPS Pin */}
            <div className="absolute bottom-5 right-5 z-20">
              <button className="w-11 h-11 rounded-full bg-black/70 backdrop-blur-md shadow-xl border border-white/20 flex items-center justify-center text-purple-400 hover:scale-105 transition-transform">
                <Navigation className="w-5 h-5 fill-purple-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Active Card Detail & Nearby Places (5 Columns on Desktop) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Nearby Places</h3>
            <span className="text-xs text-slate-400">{VYBE_DATA.hotels.length} verified stays</span>
          </div>

          {/* Active Highlight Card */}
          {activePin && (
            <div
              onClick={() => onSelectHotel(activePin)}
              className="apple-glass-card rounded-[28px] p-5 cursor-pointer space-y-4 group border-purple-500/40"
            >
              <div className="relative h-48 rounded-2xl overflow-hidden">
                <img
                  src={activePin.image}
                  alt={activePin.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-600 text-[10px] font-bold text-white">
                      Selected Pin
                    </span>
                    <h4 className="text-lg font-extrabold text-white mt-1">{activePin.name}</h4>
                  </div>
                  <span className="text-lg font-black text-white">
                    ₦{activePin.pricePerNight.toLocaleString()}
                    <span className="text-xs text-slate-400 font-normal">/night</span>
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                  <span className="font-bold text-white">{activePin.rating}</span>
                  <span>({activePin.reviewsCount} reviews)</span>
                  <span>•</span>
                  <span className="truncate">{activePin.address}</span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {activePin.description}
                </p>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-purple-300 font-semibold">
                    {activePin.rooms.length} room tiers available
                  </span>
                  <button className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all flex items-center gap-1">
                    <span>View Rooms</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Other List Cards */}
          <div className="space-y-3 pt-2">
            {VYBE_DATA.hotels
              .filter((h) => h.id !== activePin?.id)
              .slice(0, 3)
              .map((hotel) => (
                <div
                  key={hotel.id}
                  onClick={() => onSelectHotel(hotel)}
                  className="apple-glass rounded-2xl p-3 flex gap-3.5 cursor-pointer hover:border-white/25 transition-all group"
                >
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-white group-hover:text-purple-400 truncate">
                        {hotel.name}
                      </h4>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                        <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                        <span className="text-white font-semibold">{hotel.rating}</span>
                        <span>•</span>
                        <span className="truncate">{hotel.address}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-white/10">
                      <span className="text-xs font-black text-white">
                        ₦{hotel.pricePerNight.toLocaleString()}/night
                      </span>
                      <span className="text-[11px] font-bold text-purple-400">View →</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
