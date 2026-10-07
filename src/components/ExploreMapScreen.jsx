import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Star,
  Navigation,
  List,
  Map as MapIcon,
  ChevronRight,
  Wifi,
  Sparkles,
  Heart,
  ExternalLink
} from 'lucide-react';
import { VYBE_DATA } from '../data/vybeData';

export default function ExploreMapScreen({ onSelectHotel, savedIds, onToggleSave }) {
  const [viewMode, setViewMode] = useState('map'); // 'map' | 'list'
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activePin, setActivePin] = useState(VYBE_DATA.hotels[0]);

  return (
    <div className="space-y-4 pb-24 text-slate-900">
      {/* Header with Search and Map/List Toggle */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Explore Uyo</h2>
          <p className="text-xs text-slate-500">Living city map of hotels, events and places</p>
        </div>

        {/* Map / List Switcher */}
        <div className="flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200">
          <button
            onClick={() => setViewMode('map')}
            className={`p-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
              viewMode === 'map'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Map</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
              viewMode === 'list'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">List</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
        {[
          { id: 'all', label: 'All Places' },
          { id: 'hotels', label: 'Hotels' },
          { id: 'restaurants', label: 'Restaurants' },
          { id: 'nightlife', label: 'Nightlife' },
          { id: 'events', label: 'Events' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
              selectedFilter === tab.id
                ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {viewMode === 'map' ? (
        /* Interactive Map Canvas Container */
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-lg h-[460px] sm:h-[520px] bg-[#eef1f6]">
          {/* Stylized Vector Map Graphic Layer */}
          <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#cbd5e1" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Curving River / Roads */}
            <path d="M-50,280 Q200,200 400,240 T800,180" fill="none" stroke="#93c5fd" strokeWidth="12" strokeLinecap="round" />
            <path d="M120,-20 Q180,260 220,550" fill="none" stroke="#fed7aa" strokeWidth="8" strokeLinecap="round" />
            <path d="M-10,120 Q350,150 700,320" fill="none" stroke="#fed7aa" strokeWidth="7" strokeLinecap="round" />
          </svg>

          {/* Landmarks Labels */}
          <div className="absolute top-10 left-12 text-[10px] font-bold text-slate-500 bg-white/70 px-2 py-0.5 rounded-md backdrop-blur-xs pointer-events-none">
            Ikot Ekpene Rd
          </div>
          <div className="absolute top-28 right-16 text-[10px] font-bold text-slate-500 bg-white/70 px-2 py-0.5 rounded-md backdrop-blur-xs pointer-events-none">
            Nwaniba Rd
          </div>
          <div className="absolute bottom-24 left-1/3 text-[10px] font-bold text-emerald-700 bg-emerald-50/80 px-2 py-0.5 rounded-md backdrop-blur-xs pointer-events-none">
            🌳 Discovery Park
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[11px] font-extrabold text-slate-600 bg-white/90 px-3 py-1 rounded-full shadow-sm pointer-events-none">
            📍 Central Uyo
          </div>

          {/* Interactive Pricing Map Pins */}
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
                  className={`px-3 py-1.5 rounded-full text-xs font-black transition-all flex items-center gap-1.5 shadow-lg ${
                    isSelected
                      ? 'bg-purple-600 text-white ring-4 ring-purple-300/60 scale-110'
                      : 'bg-white text-slate-900 border border-slate-200 hover:scale-105'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                  <span>₦{(hotel.pricePerNight / 1000).toFixed(0)}k</span>
                </div>
                {/* Pointer indicator */}
                <div
                  className={`w-2.5 h-2.5 mx-auto -mt-1 rotate-45 transition-colors ${
                    isSelected ? 'bg-purple-600' : 'bg-white border-r border-b border-slate-200'
                  }`}
                />
              </div>
            );
          })}

          {/* User Location GPS Pin */}
          <div className="absolute bottom-4 right-4 z-20">
            <button className="w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-purple-600 hover:scale-105 transition-transform">
              <Navigation className="w-5 h-5 fill-purple-600" />
            </button>
          </div>

          {/* Active Card Bottom Overlay */}
          {activePin && (
            <div
              onClick={() => onSelectHotel(activePin)}
              className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 bg-white/95 backdrop-blur-xl rounded-2xl p-3 border border-white/60 shadow-xl cursor-pointer hover:shadow-2xl transition-all z-30"
            >
              <div className="flex items-center gap-3">
                <img
                  src={activePin.image}
                  alt={activePin.name}
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-sm text-slate-900 truncate">
                      {activePin.name}
                    </h4>
                    <span className="text-xs font-black text-purple-600">
                      ₦{activePin.pricePerNight.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                    <div className="flex items-center gap-0.5 font-bold text-slate-700">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{activePin.rating}</span>
                    </div>
                    <span>•</span>
                    <span className="truncate">{activePin.address}</span>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100">
                    <span className="text-[10px] text-slate-400 font-medium">Deluxe Room • 2 Guests</span>
                    <span className="text-[11px] font-bold text-purple-600 flex items-center gap-0.5">
                      View Rooms <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* List Mode View */
        <div className="space-y-3">
          {VYBE_DATA.hotels.map((hotel) => (
            <div
              key={hotel.id}
              onClick={() => onSelectHotel(hotel)}
              className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer flex gap-3.5 group"
            >
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-24 h-24 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-slate-900 group-hover:text-purple-600 truncate">
                      {hotel.name}
                    </h4>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(hotel.id);
                      }}
                      className="text-slate-400 hover:text-rose-500"
                    >
                      <Heart className={`w-4 h-4 ${savedIds.includes(hotel.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-slate-800">{hotel.rating}</span>
                    <span>({hotel.reviewsCount})</span>
                  </div>
                  <div className="text-[11px] text-slate-500 truncate mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-purple-600" />
                    {hotel.address}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                  <span className="text-sm font-black text-slate-900">
                    ₦{hotel.pricePerNight.toLocaleString()}<span className="text-[10px] font-normal text-slate-400">/night</span>
                  </span>
                  <span className="text-xs font-bold text-purple-600">View Rooms →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
