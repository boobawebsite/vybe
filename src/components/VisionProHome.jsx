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
  Award
} from 'lucide-react';
import { VYBE_DATA } from '../data/vybeData';

export default function VisionProHome({
  user,
  onSelectHotel,
  onSelectExplore,
  savedIds = [],
  onToggleSave,
  activeCategory = 'hotels'
}) {
  const [selectedCategory, setSelectedCategory] = useState(activeCategory || 'hotels');
  const [searchQuery, setSearchQuery] = useState('');

  // The primary hero hotel as specified by user
  const heroHotel = VYBE_DATA.hotels[0]; // Motion Hotel

  const otherHotels = VYBE_DATA.hotels.slice(1);
  const displayedHotels = otherHotels.filter((hotel) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      hotel.name.toLowerCase().includes(q) ||
      hotel.address.toLowerCase().includes(q) ||
      hotel.description?.toLowerCase().includes(q)
    );
  });

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const el = document.getElementById('hotels-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  React.useEffect(() => {
    if (activeCategory) {
      setSelectedCategory(activeCategory);
      const el = document.getElementById(`${activeCategory}-section`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [activeCategory]);

  return (
    <div className="space-y-28 pb-32 text-[#1d1d1f]">
      {/* 1. EXACT APPLE VISION PRO HERO SECTION MATCHING USER'S SCREENSHOTS */}
      <section id="hotels" className="relative w-full min-h-[82vh] flex flex-col justify-between overflow-hidden bg-white px-4 sm:px-8 pt-4 pb-12">
        {/* Full-width Center Hero Image (Covers the screen with human subject / luxury backdrop) */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <img
            src={heroHotel.image}
            alt={heroHotel.name}
            className="w-full h-full object-cover object-center filter contrast-[1.03] brightness-[1.02]"
          />
          {/* Subtle Apple White Vignette & Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent w-full md:w-3/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent h-48 bottom-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-transparent h-24 top-0" />
        </div>

        {/* Top Empty Space to respect Subnav */}
        <div className="relative z-10" />

        {/* Center-Left Content: Exact location of "Vision Pro" and "New powerful M5 chip..." */}
        <div className="relative z-10 max-w-2xl px-4 sm:px-8 py-8 space-y-4">
          {heroHotel.isVerified && (
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50/90 backdrop-blur-md border border-purple-200/90 text-purple-900 text-xs font-semibold tracking-wide shadow-xs">
                <span className="w-4 h-4 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-xs">
                  <svg
                    className="w-2.5 h-2.5 text-white"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3.5 8 6.5 11 12.5 5" />
                  </svg>
                </span>
                <span>Verified</span>
              </span>
            </div>
          )}

          {/* Hotel Name taking the exact position and styling of "Vision Pro" */}
          <h1 className="text-5xl sm:text-7xl font-extrabold text-[#1d1d1f] tracking-tight leading-[1.05] font-display">
            {heroHotel.name}
          </h1>

          {/* Hotel Location taking the exact position of "New powerful M5 chip and comfortable Dual Knit Band." */}
          <p className="text-xl sm:text-2xl font-medium text-[#1d1d1f] leading-snug">
            {heroHotel.address}. Premier luxury suites, poolside lounge, and 24/7 power in Uyo.
          </p>

          {/* Action Buttons: "Book a demo" replaced with PRICE, and "Buy" replaced with VIEW */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            {/* Replaces "Book a demo" -> Price Button */}
            <div className="apple-btn-outline text-base py-3 px-6 font-semibold cursor-default">
              ₦{heroHotel.pricePerNight.toLocaleString()} / night
            </div>

            {/* Replaces "Buy" -> View Button */}
            <button
              onClick={() => onSelectHotel(heroHotel)}
              className="apple-btn-black text-base py-3 px-7 font-semibold shadow-sm active:scale-95"
            >
              View
            </button>
          </div>
        </div>

        {/* Bottom Floating Search Dock */}
        <div className="relative z-10 max-w-4xl mx-auto w-full px-4 pt-4">
          <form
            onSubmit={handleSearch}
            className="bg-white/95 backdrop-blur-2xl p-2.5 rounded-full border border-slate-200/90 shadow-xl flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 w-full px-4">
              <Search className="w-5 h-5 text-purple-600 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search hotels, fine dining, events or areas in Uyo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-[#1d1d1f] placeholder-slate-400 text-sm sm:text-base"
              />
            </div>

            <button
              type="submit"
              className="apple-btn-blue text-xs sm:text-sm py-2 px-5 flex items-center gap-1.5 whitespace-nowrap"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </form>
        </div>
      </section>

      {/* 2. APPLE-STYLE SECTION: "Featured Stays in Uyo" (Hotels) */}
      <section id="hotels-section" className="space-y-12 max-w-7xl mx-auto px-4 sm:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-5xl font-black text-[#1d1d1f] tracking-tight">
            An infinite canvas for discovering stays.
          </h2>
          <p className="text-base sm:text-lg text-[#86868b]">
            From serviced penthouses to boutique hotels across Akwa Ibom State.
          </p>
        </div>

        {/* 3-Column Apple Tile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedHotels.map((hotel) => {
            const isSaved = savedIds?.includes(hotel.id);
            return (
              <div
                key={hotel.id}
                onClick={() => onSelectHotel(hotel)}
                className="apple-tile cursor-pointer flex flex-col justify-between group bg-[#fbfbfd] border border-slate-200/80"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  <div className="absolute top-4 inset-x-4 flex justify-between items-center text-white">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold">
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
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xl font-bold text-[#1d1d1f] group-hover:text-purple-600 transition-colors">
                        {hotel.name}
                      </h3>
                      {hotel.isVerified && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-50 border border-purple-200/80 text-purple-700 text-xs font-semibold flex-shrink-0">
                          <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center">
                            <svg
                              className="w-2 h-2 text-white"
                              viewBox="0 0 16 16"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="3.5 8 6.5 11 12.5 5" />
                            </svg>
                          </span>
                          <span>Verified</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#86868b]">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-[#1d1d1f] font-semibold">{hotel.rating}</span>
                      <span>({hotel.reviewsCount} reviews)</span>
                      <span>•</span>
                      <span className="truncate">{hotel.address}</span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {hotel.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-black text-[#1d1d1f]">
                        ₦{hotel.pricePerNight.toLocaleString()}
                      </span>
                      <span className="text-xs text-[#86868b]"> / night</span>
                    </div>

                    <button className="apple-btn-black text-xs py-1.5 px-4">
                      View
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {displayedHotels.length === 0 && (
            <div className="col-span-full text-center py-16 bg-[#fbfbfd] rounded-3xl border border-slate-200">
              <Search className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-lg font-bold text-[#1d1d1f]">No stays found</p>
              <p className="text-sm text-[#86868b] mt-1">We couldn't find any stays matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </section>

      {/* 3. APPLE-STYLE SECTION: "Taste of the City" (Restaurants) */}
      <section id="restaurants-section" className="space-y-12 max-w-7xl mx-auto px-4 sm:px-8 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1d1d1f] tracking-tight">
              Top Restaurants in Uyo.
            </h2>
          </div>
          <button className="apple-link text-sm">
            <span>Explore</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VYBE_DATA.restaurants.map((rest) => (
            <div
              key={rest.id}
              className="apple-tile border border-slate-200/80 group cursor-pointer bg-[#fbfbfd]"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={rest.image}
                  alt={rest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-xs text-white">
                  <span className="font-semibold text-slate-200">{rest.area}</span>
                  <span className="font-bold text-amber-300 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    {rest.rating} ({rest.reviewsCount})
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold text-[#1d1d1f] group-hover:text-purple-600 transition-colors">
                  {rest.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {rest.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. APPLE-STYLE SECTION: "Nightlife & Lounges" */}
      <section id="nightlife-section" className="space-y-12 max-w-7xl mx-auto px-4 sm:px-8 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1d1d1f] tracking-tight">
              Pulse of the City After Dark.
            </h2>
          </div>
          <button className="apple-link text-sm">
            <span>Explore</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(VYBE_DATA.nightlife || []).map((venue) => (
            <div
              key={venue.id}
              className="apple-tile border border-slate-200/80 group cursor-pointer bg-[#fbfbfd]"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-xs text-white">
                  <span className="font-semibold text-slate-200">{venue.area}</span>
                  <span className="font-bold text-indigo-300 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-indigo-300 text-indigo-300" />
                    {venue.rating} ({venue.reviewsCount})
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-[#1d1d1f] group-hover:text-purple-600 transition-colors">
                    {venue.name}
                  </h3>
                  <GlassWater className="w-4 h-4 text-purple-600" />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {venue.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. APPLE-STYLE SECTION: "Entertainment & Pulse" (Events) */}
      <section id="events-section" className="space-y-12 max-w-7xl mx-auto px-4 sm:px-8 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1d1d1f] tracking-tight">
              What's happening in Uyo.
            </h2>
          </div>
          <button className="apple-link text-sm">
            <span>View all</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VYBE_DATA.events.map((evt) => (
            <div
              key={evt.id}
              className="apple-tile h-80 relative flex flex-col justify-end p-6 border border-slate-200/80 group cursor-pointer"
            >
              <img
                src={evt.image}
                alt={evt.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

              <div className="relative z-10 space-y-2 text-white">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-purple-600 text-[10px] font-black uppercase tracking-wider text-white">
                    {evt.badge}
                  </span>
                  <span className="text-xs font-semibold text-slate-200">{evt.date} • {evt.time}</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                  {evt.title}
                </h3>
                <p className="text-xs text-slate-300">{evt.location}</p>

                <div className="pt-3 border-t border-white/20 flex items-center justify-between">
                  <span className="text-sm font-black text-white">
                    ₦{evt.price.toLocaleString()}
                  </span>
                  <button className="apple-btn-blue text-xs py-1.5 px-4">
                    Reserve Pass
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. APPLE-STYLE SECTION: "Luxury Resorts & Retreats" */}
      <section id="resorts-section" className="space-y-12 max-w-7xl mx-auto px-4 sm:px-8 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1d1d1f] tracking-tight">
              World-Class Escapes in Akwa Ibom.
            </h2>
          </div>
          <button className="apple-link text-sm">
            <span>View all</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(VYBE_DATA.resorts || []).map((resort) => {
            const correspondingHotel = VYBE_DATA.hotels.find(h => h.id === resort.id) || heroHotel;
            return (
              <div
                key={resort.id}
                onClick={() => onSelectHotel(correspondingHotel)}
                className="apple-tile border border-slate-200/80 group cursor-pointer bg-[#fbfbfd]"
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={resort.image}
                    alt={resort.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider">
                      {resort.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-xs text-white">
                    <span className="font-semibold text-slate-200">{resort.area}</span>
                    <span className="font-bold text-amber-300 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                      {resort.rating} ({resort.reviewsCount})
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-[#1d1d1f] group-hover:text-purple-600 transition-colors">
                        {resort.name}
                      </h3>
                      <Palmtree className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {resort.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-black text-[#1d1d1f]">
                        ₦{resort.pricePerNight.toLocaleString()}
                      </span>
                      <span className="text-xs text-[#86868b]"> / night</span>
                    </div>

                    <button className="apple-btn-black text-xs py-1.5 px-4">
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. APPLE-STYLE SECTION: "Why VYBE" Spec Pillars */}
      <section className="rounded-[40px] bg-[#fbfbfd] border border-slate-200/80 p-8 sm:p-14 max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h3 className="text-3xl font-black text-[#1d1d1f]">Why Discover & Book with VYBE?</h3>
          <p className="text-sm text-[#86868b]">
            A verified platform for local stays, events and local commerce in Akwa Ibom.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VYBE_DATA.whyBook.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-slate-200/80 space-y-2 shadow-xs hover:border-purple-300 transition-colors"
            >
              <CheckCircle2 className="w-8 h-8 text-purple-600 mb-2" />
              <h4 className="font-bold text-base text-[#1d1d1f]">{item.title}</h4>
              <p className="text-xs text-[#86868b] leading-relaxed">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
