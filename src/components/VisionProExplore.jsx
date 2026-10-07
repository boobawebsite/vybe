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
    <div className="space-y-12 pb-28 text-white max-w-7xl mx-auto px-4">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-8">
        <div>
          <span className="apple-eyebrow text-purple-400">Living City Map</span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-1">
            Explore Uyo in real time.
          </h1>
          <p className="text-base text-slate-400 mt-2 max-w-xl">
            Spatial markers across Udo Udoma, Nwaniba Road and Ikot Ekpene. Click any pin to inspect pricing and room availability.
          </p>
        </div>

        {/* Apple Filter Pills */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {['all', 'hotels', 'restaurants', 'nightlife', 'events'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold capitalize transition-all border whitespace-nowrap ${
                selectedFilter === cat
                  ? 'bg-white text-black border-white shadow-md'
                  : 'bg-[#161617] text-slate-400 border-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Desktop Spatial View: Left Interactive Map, Right Selected Places Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Interactive Living Map Container */}
        <div className="lg:col-span-7 rounded-[40px] overflow-hidden p-3 relative h-[560px] sm:h-[640px] shadow-2xl border border-white/15 bg-[#161617]">
          <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-[#0a0a0c]">
            {/* Dark Spatial Vector Map Canvas */}
            <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid-dark-v" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#27272a" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-dark-v)" />
              {/* Roads / Rivers */}
              <path d="M-50,300 Q200,220 450,260 T900,200" fill="none" stroke="#38bdf8" strokeWidth="14" strokeLinecap="round" opacity="0.4" />
              <path d="M140,-20 Q200,280 260,650" fill="none" stroke="#a855f7" strokeWidth="9" strokeLinecap="round" opacity="0.5" />
              <path d="M-10,140 Q380,170 750,360" fill="none" stroke="#6366f1" strokeWidth="8" strokeLinecap="round" opacity="0.4" />
            </svg>

            {/* Landmarks Labels */}
            <div className="absolute top-12 left-12 text-[10px] font-bold text-slate-300 bg-black/70 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
              Ikot Ekpene Rd
            </div>
            <div className="absolute top-32 right-16 text-[10px] font-bold text-slate-300 bg-black/70 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
              Nwaniba Rd
            </div>
            <div className="absolute bottom-28 left-1/3 text-[10px] font-bold text-emerald-300 bg-emerald-950/70 px-3 py-1 rounded-full backdrop-blur-md border border-emerald-500/30">
              🌳 Discovery Park Uyo
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-black text-purple-200 bg-purple-950/80 px-4 py-2 rounded-full backdrop-blur-md border border-purple-500/40">
              📍 Central Uyo Plaza
            </div>

            {/* Glowing Price Pins */}
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
                    className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all flex items-center gap-1.5 shadow-2xl ${
                      isSelected
                        ? 'bg-purple-600 text-white ring-4 ring-purple-500/60 scale-115'
                        : 'bg-black/90 text-white border border-white/20 hover:scale-105 backdrop-blur-md'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                    <span>₦{(hotel.pricePerNight / 1000).toFixed(0)}k</span>
                  </div>
                  <div
                    className={`w-2.5 h-2.5 mx-auto -mt-1 rotate-45 transition-colors ${
                      isSelected ? 'bg-purple-600' : 'bg-black/90 border-r border-b border-white/20'
                    }`}
                  />
                </div>
              );
            })}

            {/* GPS Pin */}
            <div className="absolute bottom-5 right-5 z-20">
              <button className="w-12 h-12 rounded-full bg-black/80 backdrop-blur-md shadow-2xl border border-white/20 flex items-center justify-center text-purple-400 hover:scale-105 transition-transform">
                <Navigation className="w-5 h-5 fill-purple-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Active Card Detail & Nearby Places */}
        <div className="lg:col-span-5 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Selected Place</h3>
            <span className="text-xs text-slate-400">{VYBE_DATA.hotels.length} verified stays</span>
          </div>

          {/* Active Highlight Card */}
          {activePin && (
            <div
              onClick={() => onSelectHotel(activePin)}
              className="apple-tile p-6 cursor-pointer space-y-4 group border border-purple-500/40 bg-[#161617]"
            >
              <div className="relative h-52 rounded-2xl overflow-hidden">
                <img
                  src={activePin.image}
                  alt={activePin.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-purple-600 text-[10px] font-bold text-white">
                      Selected Marker
                    </span>
                    <h4 className="text-xl font-extrabold text-white mt-1">{activePin.name}</h4>
                  </div>
                  <span className="text-xl font-black text-white">
                    ₦{activePin.pricePerNight.toLocaleString()}
                    <span className="text-xs text-slate-400 font-normal">/night</span>
                  </span>
                </div>
              </div>

              <div className="space-y-3">
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
                  <button className="apple-btn-purple text-xs py-2 px-5 flex items-center gap-1">
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
              .slice(0, 2)
              .map((hotel) => (
                <div
                  key={hotel.id}
                  onClick={() => onSelectHotel(hotel)}
                  className="apple-tile p-4 flex gap-4 cursor-pointer border border-white/10 bg-[#161617] hover:border-white/20 transition-all group"
                >
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-20 h-20 rounded-2xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-white group-hover:text-purple-300 truncate">
                        {hotel.name}
                      </h4>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
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
                      <span className="apple-link text-xs">View →</span>
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
