import React, { useState } from 'react';
import {
  MapPin,
  Bell,
  Search,
  SlidersHorizontal,
  Star,
  ChevronRight,
  Heart,
  Sparkles,
  BedDouble,
  UtensilsCrossed,
  GlassWater,
  Ticket,
  Palmtree,
  MoreHorizontal,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Calendar,
  Users,
  Compass
} from 'lucide-react';
import { VYBE_DATA } from '../data/vybeData';

export default function MobileHomeScreen({
  user,
  onSelectHotel,
  onSelectExplore,
  onOpenStayDetails,
  savedIds,
  onToggleSave
}) {
  const [activeCategory, setActiveCategory] = useState('hotels');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'hotels', label: 'Hotels', icon: BedDouble },
    { id: 'restaurants', label: 'Restaurants', icon: UtensilsCrossed },
    { id: 'nightlife', label: 'Nightlife', icon: GlassWater },
    { id: 'events', label: 'Events', icon: Ticket },
    { id: 'resorts', label: 'Resorts', icon: Palmtree },
    { id: 'more', label: 'More', icon: MoreHorizontal },
  ];

  const filteredHotels = VYBE_DATA.hotels.filter(h =>
    h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-5 pb-28 text-slate-900 px-4 pt-2">
      {/* 1. TOP HEADER (Exact Brand Header from Boss's Figma) */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-2xl font-black tracking-tight text-slate-900 font-display">
              VYBE
            </span>
            <span className="w-2 h-2 rounded-full bg-purple-600 shadow-[0_0_8px_#9333ea]" />
          </div>
          <span className="text-[10px] tracking-widest text-slate-400 uppercase font-bold block -mt-0.5">
            Hotels • Stays • Experiences
          </span>
        </div>

        {/* Uyo Location Dropdown & Notification Bell */}
        <div className="flex items-center gap-2">
          <button
            onClick={onSelectExplore}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-100"
          >
            <MapPin className="w-3.5 h-3.5 text-purple-600" />
            <span>Uyo</span>
            <ChevronRight className="w-3 h-3 rotate-90 text-purple-600" />
          </button>

          <button className="relative w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>
        </div>
      </div>

      {/* 2. HERO CARD: "More Than Stays / Discover Experiences" */}
      <div className="relative rounded-[28px] overflow-hidden shadow-lg text-white h-52">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80"
          alt="Uyo Luxury Stay"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <div className="absolute inset-x-5 bottom-5 space-y-1">
          <span className="text-xs font-bold text-purple-300 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Good evening, {user?.name || 'Daniel'} 👋
          </span>
          <h2 className="text-2xl font-extrabold text-white leading-tight">
            More Than Stays <br />
            <span className="text-purple-300">Discover Experiences</span>
          </h2>
          <p className="text-[11px] text-slate-200">
            Hotels, restaurants, events and more — all in Uyo.
          </p>
        </div>
      </div>

      {/* 3. SEARCH BAR & FILTER TRIGGER */}
      <div className="flex items-center gap-2.5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute inset-y-0 left-3.5 my-auto pointer-events-none" />
          <input
            type="text"
            placeholder="Search for hotels, restaurants, events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-3 rounded-2xl bg-white border border-slate-200 shadow-xs text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-purple-600"
          />
        </div>
        <button
          onClick={onSelectExplore}
          className="w-11 h-11 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-700 hover:text-purple-600 flex-shrink-0"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Direct Banner: Boss's Stay Details & Price Summary Screen */}
      {onOpenStayDetails && (
        <div
          onClick={onOpenStayDetails}
          className="p-3.5 bg-gradient-to-r from-purple-50 via-purple-100/50 to-purple-50 border border-purple-200 rounded-2xl flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all shadow-xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
              1-2-3
            </div>
            <div>
              <div className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                <span>Motion Hotel • Stay Details</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-600 text-white font-bold">Boss Design</span>
              </div>
              <div className="text-[11px] text-purple-700 font-medium">
                ₦47,250 • Stepper • Card / Bank / Wallet Checkout
              </div>
            </div>
          </div>
          <span className="text-xs font-black text-purple-600 bg-white px-3 py-1.5 rounded-xl shadow-xs border border-purple-200/80">
            Open →
          </span>
        </div>
      )}

      {/* 4. CATEGORIES HORIZONTAL CAROUSEL (Purple Active Pill) */}
      <div className="flex items-center gap-2.5 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-1">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex flex-col items-center justify-center min-w-[70px] py-2.5 px-3 rounded-2xl transition-all border ${
                isActive
                  ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/30'
                  : 'bg-white text-slate-600 border-slate-200/80'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-white' : 'text-slate-700'}`} />
              <span className="text-[11px] font-bold">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* 5. FEATURED IN UYO (Horizontal Scroll Cards with ₦ Pricing & View button) */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
            Featured in Uyo
          </h3>
          <button
            onClick={onSelectExplore}
            className="text-xs font-bold text-purple-600 flex items-center gap-0.5"
          >
            <span>See All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex gap-3.5 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-2">
          {filteredHotels.slice(0, 4).map((hotel) => {
            const isSaved = savedIds.includes(hotel.id);
            return (
              <div
                key={hotel.id}
                onClick={() => onSelectHotel(hotel)}
                className="min-w-[240px] bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden flex-shrink-0 cursor-pointer group"
              >
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-purple-600 text-white text-[9px] font-bold">
                    {hotel.badge}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave(hotel.id);
                    }}
                    className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
                  </button>
                </div>

                <div className="p-3.5 space-y-1.5">
                  <h4 className="font-extrabold text-sm text-slate-900 truncate">
                    {hotel.name}
                  </h4>

                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-slate-800">{hotel.rating}</span>
                    <span>({hotel.reviewsCount} reviews)</span>
                  </div>

                  <p className="text-[10px] text-slate-500 truncate flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-purple-600 flex-shrink-0" />
                    {hotel.address}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-black text-slate-900">
                        ₦{hotel.pricePerNight.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal"> / night</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectHotel(hotel);
                      }}
                      className="px-3 py-1 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white text-xs font-bold transition-colors border border-purple-200"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. TOP RESTAURANTS (From Image 1 & 4) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
            Top Restaurants
          </h3>
          <button className="text-xs font-bold text-purple-600 flex items-center gap-0.5">
            <span>See All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {VYBE_DATA.restaurants.map((rest) => (
            <div
              key={rest.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex gap-3 p-2.5"
            >
              <img
                src={rest.image}
                alt={rest.name}
                className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <h4 className="font-extrabold text-xs text-slate-900 truncate">{rest.name}</h4>
                  <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-0.5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-slate-800">{rest.rating}</span>
                    <span>• {rest.area}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  {rest.cuisines.map((c, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[9px] font-bold"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. UPCOMING EVENTS (From Image 4 & 7) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
            Upcoming Events
          </h3>
          <button className="text-xs font-bold text-purple-600 flex items-center gap-0.5">
            <span>See All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-2">
          {VYBE_DATA.events.map((evt) => (
            <div
              key={evt.id}
              className="min-w-[200px] h-32 rounded-2xl overflow-hidden relative flex flex-col justify-end p-3 text-white flex-shrink-0 shadow-xs"
            >
              <img
                src={evt.image}
                alt={evt.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="relative z-10 space-y-0.5">
                <span className="px-2 py-0.5 rounded-full bg-purple-600 text-[8px] font-black uppercase tracking-wider text-white">
                  {evt.badge}
                </span>
                <h4 className="font-bold text-xs leading-snug truncate">{evt.title}</h4>
                <div className="flex justify-between items-center text-[10px] text-slate-300">
                  <span>{evt.date}</span>
                  <span className="font-black text-white">₦{evt.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 8. WHY BOOK WITH VYBE (From Image 5 & 7) */}
      <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
        <h4 className="text-xs font-extrabold text-slate-900 text-center">
          Why Book with VYBE?
        </h4>
        <div className="grid grid-cols-2 gap-2 text-center">
          {VYBE_DATA.whyBook.map((item, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-white border border-slate-200/60 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-purple-600 mx-auto mb-1" />
              <div className="font-bold text-[11px] text-slate-900">{item.title}</div>
              <div className="text-[9px] text-slate-400">{item.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
