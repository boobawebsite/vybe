import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  SlidersHorizontal,
  MapPin,
  Star,
  ChevronRight,
  Heart,
  Calendar,
  BedDouble,
  UtensilsCrossed,
  GlassWater,
  Ticket,
  Palmtree,
  MoreHorizontal,
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Flame,
  Award
} from 'lucide-react';
import { VYBE_DATA } from '../data/vybeData';

export default function VisionProHome({
  user,
  onSelectHotel,
  onSelectExplore,
  savedIds,
  onToggleSave
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categoryTabs = [
    { id: 'all', label: 'All Stays', icon: BedDouble },
    { id: 'hotels', label: 'Hotels', icon: BedDouble },
    { id: 'restaurants', label: 'Restaurants', icon: UtensilsCrossed },
    { id: 'nightlife', label: 'Nightlife', icon: GlassWater },
    { id: 'events', label: 'Events', icon: Ticket },
    { id: 'resorts', label: 'Resorts', icon: Palmtree },
  ];

  const filteredHotels = VYBE_DATA.hotels.filter(h =>
    h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-16 pb-24 text-white">
      {/* 1. HERO SECTION: Apple Vision Pro Cinematics */}
      <section className="relative rounded-[32px] md:rounded-[48px] overflow-hidden border border-white/10 shadow-2xl min-h-[500px] md:min-h-[580px] flex flex-col justify-between p-6 sm:p-10 md:p-14 bg-black">
        {/* Cinematic Backdrop Video/Image with Radial Vision Pro Glass Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=90"
            alt="Uyo Luxury Night"
            className="w-full h-full object-cover opacity-60 scale-105 filter saturate-150 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-radial-at-c from-purple-900/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Hero Top Pill */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full apple-pill text-xs font-medium text-slate-200">
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            <span>Spatial Discovery Layer for Uyo</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Live City Pulse • Akwa Ibom</span>
          </div>
        </div>

        {/* Hero Headline & Value Proposition */}
        <div className="relative z-10 max-w-2xl space-y-4 my-auto py-6">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] font-display">
            More Than Stays. <br />
            <span className="text-gradient-purple">Discover Experiences.</span>
          </h1>
          <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-xl">
            Hotels, restaurants, nightlife, lounges and events — all in Uyo. Book real-time rooms and explore your city through a unified spatial lens.
          </p>
        </div>

        {/* Hero Glass Floating Search Bar */}
        <div className="relative z-10 w-full max-w-3xl">
          <div className="apple-glass p-2.5 rounded-3xl md:rounded-full flex flex-col md:flex-row items-center gap-3">
            <div className="flex items-center gap-3 flex-1 w-full px-4 py-2">
              <Search className="w-5 h-5 text-purple-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search hotels, fine dining, events or areas in Uyo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-white placeholder-slate-400 text-sm md:text-base font-normal"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto justify-end px-2">
              <button
                onClick={onSelectExplore}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-xl border border-white/15 transition-all"
              >
                <SlidersHorizontal className="w-4 h-4 text-purple-400" />
                <span>Filters</span>
              </button>

              <button
                onClick={onSelectExplore}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs md:text-sm font-bold shadow-lg shadow-purple-600/30 transition-all active:scale-95"
              >
                <Compass className="w-4 h-4" />
                <span>Living Map</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY PILLS BAR (Vision Pro Floating Dock) */}
      <section className="flex items-center gap-3 overflow-x-auto hide-scrollbar py-2">
        {categoryTabs.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-bold transition-all border whitespace-nowrap ${
                isActive
                  ? 'bg-purple-600/90 text-white border-purple-500/80 shadow-lg shadow-purple-600/30'
                  : 'apple-glass text-slate-300 hover:text-white hover:border-white/25'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </section>

      {/* 3. FEATURED STAYS & HOTELS (Wide Vision Pro Grid) */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b border-white/10 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 uppercase tracking-widest mb-1">
              <Award className="w-3.5 h-3.5" />
              <span>Verified Selection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Featured Stays in Uyo
            </h2>
          </div>
          <button
            onClick={onSelectExplore}
            className="text-xs sm:text-sm font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
          >
            <span>See All ({VYBE_DATA.hotels.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3-Column Vision Pro Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => {
            const isSaved = savedIds.includes(hotel.id);
            return (
              <div
                key={hotel.id}
                onClick={() => onSelectHotel(hotel)}
                className="apple-glass-card rounded-[28px] overflow-hidden group cursor-pointer flex flex-col justify-between"
              >
                {/* Image Cover */}
                <div className="relative h-60 sm:h-64 overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                  {/* Top Badges */}
                  <div className="absolute top-4 inset-x-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-purple-600/90 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1 shadow-md">
                      <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                      {hotel.badge}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(hotel.id);
                      }}
                      className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-transform active:scale-90"
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
                    </button>
                  </div>

                  {/* Bottom Image Stats */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                    <span className="px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-md font-semibold">
                      {hotel.rooms.length} Room Types
                    </span>
                    <span className="font-bold text-amber-300 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                      {hotel.rating} ({hotel.reviewsCount} reviews)
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                        {hotel.name}
                      </h3>
                      {hotel.isVerified && (
                        <ShieldCheck className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                      <span className="truncate">{hotel.address}</span>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 pt-2 leading-relaxed">
                      {hotel.description}
                    </p>
                  </div>

                  {/* Amenities Row */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {hotel.amenities.slice(0, 4).map((amenity, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-medium text-slate-300"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>

                  {/* Price & Action */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-black text-white">
                        ₦{hotel.pricePerNight.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-400"> / night</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectHotel(hotel);
                      }}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1"
                    >
                      <span>View Rooms</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. TOP RESTAURANTS & DINING */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b border-white/10 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
              <Flame className="w-3.5 h-3.5" />
              <span>Taste of Uyo</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Top Restaurants & Culinary Spots
            </h2>
          </div>
          <button className="text-xs sm:text-sm font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1">
            <span>Explore All Dining</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VYBE_DATA.restaurants.map((rest) => (
            <div
              key={rest.id}
              className="apple-glass-card rounded-[28px] overflow-hidden group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={rest.image}
                  alt={rest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-xs text-white">
                  <span className="font-semibold text-slate-300">{rest.area}</span>
                  <span className="font-bold text-amber-300 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                    {rest.rating} ({rest.reviewsCount})
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                  {rest.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {rest.description}
                </p>
                <div className="flex gap-2 pt-1">
                  {rest.cuisines.map((c, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-300 text-[10px] font-semibold border border-purple-500/30"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. UPCOMING EVENTS & CITY EXPERIENCES */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b border-white/10 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 uppercase tracking-widest mb-1">
              <Ticket className="w-3.5 h-3.5" />
              <span>City Pulse</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Upcoming Events & Nightlife
            </h2>
          </div>
          <button className="text-xs sm:text-sm font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1">
            <span>Calendar ({VYBE_DATA.events.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VYBE_DATA.events.map((evt) => (
            <div
              key={evt.id}
              className="apple-glass-card rounded-[28px] overflow-hidden group cursor-pointer h-72 relative flex flex-col justify-end p-6"
            >
              <img
                src={evt.image}
                alt={evt.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

              <div className="relative z-10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-purple-600 text-white text-[10px] font-extrabold tracking-wider uppercase">
                    {evt.badge}
                  </span>
                  <span className="text-xs font-bold text-slate-300">{evt.date} • {evt.time}</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                  {evt.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-1">{evt.location}</p>

                <div className="pt-2 flex items-center justify-between border-t border-white/10">
                  <span className="text-sm font-black text-white">
                    ₦{evt.price.toLocaleString()}
                  </span>
                  <button className="px-3.5 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-md">
                    Reserve Pass
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. WHY VYBE VALUE PILLARS (Vision Pro Glass Grid) */}
      <section className="apple-glass p-8 md:p-12 rounded-[36px] space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Why Discover & Book with VYBE?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            A trustworthy, verified standard for local hospitality and leisure in Akwa Ibom.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VYBE_DATA.whyBook.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-colors"
            >
              <CheckCircle2 className="w-7 h-7 text-purple-400 mx-auto mb-2" />
              <div className="font-bold text-sm text-white">{item.title}</div>
              <div className="text-xs text-slate-400 mt-1">{item.subtitle}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
