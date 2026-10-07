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
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Tag,
  Flame,
  Award,
  Play
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

  const filteredHotels = VYBE_DATA.hotels.filter(h =>
    h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-28 pb-32 text-white">
      {/* 1. HERO SECTION: Exact Apple Vision Pro Hero Architecture */}
      <section className="relative text-center pt-8 pb-16 px-4 max-w-5xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-purple-300">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Spatial City Discovery Platform • Uyo, Nigeria</span>
        </div>

        <h1 className="apple-headline font-black tracking-tight">
          Welcome to the era of <br />
          <span className="bg-gradient-to-r from-purple-400 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
            spatial city living.
          </span>
        </h1>

        <p className="apple-subhead max-w-2xl mx-auto font-normal text-slate-300 leading-relaxed">
          VYBE seamlessly blends hotels, verified dining, living nightlife and events in Uyo into one breathtaking experience.
        </p>

        {/* Apple Vision Pro Interactive Floating Cinema Tile */}
        <div className="relative mt-12 rounded-[40px] overflow-hidden border border-white/20 shadow-[0_40px_100px_rgba(0,0,0,0.9)] max-w-4xl mx-auto h-[480px] sm:h-[560px] group">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=90"
            alt="Uyo Luxury Night"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* Vision Pro Floating Glass Search Dock */}
          <div className="absolute inset-x-4 sm:inset-x-8 bottom-8 p-3 sm:p-4 rounded-3xl sm:rounded-full bg-black/60 backdrop-blur-3xl border border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xl">
            <div className="flex items-center gap-3 w-full px-4">
              <Search className="w-5 h-5 text-purple-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search hotels, fine dining, events or areas in Uyo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-white placeholder-slate-400 text-sm sm:text-base"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end px-2">
              <button
                onClick={onSelectExplore}
                className="apple-btn-purple flex items-center gap-2 text-xs sm:text-sm whitespace-nowrap"
              >
                <Compass className="w-4 h-4" />
                <span>Launch Living Map</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. APPLE-STYLE SECTION: "An infinite canvas for discovery" */}
      <section className="space-y-12 max-w-6xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="apple-eyebrow text-purple-400">Discoveries</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            An infinite canvas for discovering Uyo.
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            From verified luxury hotels on Udo Udoma to late-night culinary spots on Nwaniba Road — explore everything in real time.
          </p>
        </div>

        {/* 3-Column Apple Tile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHotels.slice(0, 3).map((hotel) => {
            const isSaved = savedIds.includes(hotel.id);
            return (
              <div
                key={hotel.id}
                onClick={() => onSelectHotel(hotel)}
                className="apple-tile cursor-pointer flex flex-col justify-between border border-white/10 group bg-[#161617]"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161617] via-transparent to-transparent" />

                  <div className="absolute top-4 inset-x-4 flex justify-between items-center">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-white border border-white/15">
                      {hotel.badge}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(hotel.id);
                      }}
                      className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                        {hotel.name}
                      </h3>
                      {hotel.isVerified && (
                        <ShieldCheck className="w-4 h-4 text-purple-400" />
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                      <span className="text-white font-semibold">{hotel.rating}</span>
                      <span>({hotel.reviewsCount} reviews)</span>
                      <span>•</span>
                      <span className="truncate">{hotel.address}</span>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {hotel.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-black text-white">
                        ₦{hotel.pricePerNight.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-400"> / night</span>
                    </div>

                    <span className="apple-link text-xs">
                      View Rooms <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. APPLE-STYLE SECTION: "Taste of the City" */}
      <section className="space-y-12 max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="apple-eyebrow text-amber-400">Culinary & Dining</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
              Top Restaurants in Uyo.
            </h2>
          </div>
          <button className="apple-link text-sm">
            <span>Explore all dining</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VYBE_DATA.restaurants.map((rest) => (
            <div
              key={rest.id}
              className="apple-tile border border-white/10 group cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={rest.image}
                  alt={rest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161617] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-xs text-white">
                  <span className="font-semibold text-slate-300">{rest.area}</span>
                  <span className="font-bold text-amber-300 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    {rest.rating} ({rest.reviewsCount})
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  {rest.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {rest.description}
                </p>
                <div className="flex gap-2 pt-2">
                  {rest.cuisines.map((c, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-semibold text-slate-300"
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

      {/* 4. APPLE-STYLE SECTION: "Entertainment & Pulse" */}
      <section className="space-y-12 max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="apple-eyebrow text-rose-400">Events & Nightlife</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
              What's happening in Uyo.
            </h2>
          </div>
          <button className="apple-link text-sm">
            <span>View event calendar</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VYBE_DATA.events.map((evt) => (
            <div
              key={evt.id}
              className="apple-tile h-80 relative flex flex-col justify-end p-6 border border-white/10 group cursor-pointer"
            >
              <img
                src={evt.image}
                alt={evt.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161617] via-[#161617]/70 to-transparent" />

              <div className="relative z-10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-purple-600 text-[10px] font-black uppercase tracking-wider text-white">
                    {evt.badge}
                  </span>
                  <span className="text-xs font-semibold text-slate-300">{evt.date} • {evt.time}</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                  {evt.title}
                </h3>
                <p className="text-xs text-slate-400">{evt.location}</p>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-sm font-black text-white">
                    ₦{evt.price.toLocaleString()}
                  </span>
                  <button className="apple-btn-primary text-xs py-1.5 px-4">
                    Reserve Pass
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. APPLE-STYLE SECTION: "Why VYBE" Spec Pillars */}
      <section className="rounded-[40px] bg-[#161617] border border-white/10 p-8 sm:p-14 max-w-6xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="apple-eyebrow text-purple-400">Trust & Hospitality</span>
          <h3 className="text-3xl font-black text-white">Why Discover & Book with VYBE?</h3>
          <p className="text-sm text-slate-400">
            A verified platform for local stays, events and local commerce in Akwa Ibom.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VYBE_DATA.whyBook.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#1c1c1e] border border-white/5 space-y-2 hover:border-white/20 transition-colors"
            >
              <CheckCircle2 className="w-8 h-8 text-purple-400 mb-2" />
              <h4 className="font-bold text-base text-white">{item.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
