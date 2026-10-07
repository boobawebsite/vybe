import React, { useState } from 'react';
import {
  MapPin,
  Bell,
  Search,
  SlidersHorizontal,
  Star,
  ChevronRight,
  Heart,
  Calendar,
  Sparkles,
  BedDouble,
  UtensilsCrossed,
  GlassWater,
  Ticket,
  Palmtree,
  MoreHorizontal,
  Home as HomeIcon,
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { VYBE_DATA } from '../data/vybeData';

export default function HomeScreen({
  user,
  onSelectHotel,
  onSelectExplore,
  savedIds,
  onToggleSave
}) {
  const [selectedCategory, setSelectedCategory] = useState('hotels');
  const [searchQuery, setSearchQuery] = useState('');

  const categoryIcons = {
    hotels: BedDouble,
    restaurants: UtensilsCrossed,
    nightlife: GlassWater,
    events: Ticket,
    resorts: Palmtree,
    more: MoreHorizontal,
  };

  const filteredHotels = VYBE_DATA.hotels.filter(h =>
    h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-24 text-slate-900">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-2xl font-black tracking-tight text-slate-900 font-display">
              VYBE
            </span>
          </div>
          <span className="text-[10px] tracking-widest text-slate-400 uppercase font-medium">
            Hotels • Stays • Experiences
          </span>
        </div>

        {/* Location Dropdown & Notification */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs font-semibold border border-purple-100 transition-all">
            <MapPin className="w-3.5 h-3.5 text-purple-600" />
            <span>Uyo</span>
            <ChevronRight className="w-3 h-3 rotate-90 text-purple-500" />
          </button>

          <button className="relative w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-all">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>
        </div>
      </div>

      {/* Hero Banner: What's the VYBE today? / More than Stays */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl text-white">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"
          alt="Uyo Luxury Resort"
          className="w-full h-56 sm:h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

        <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end">
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-500/30 backdrop-blur-md border border-purple-400/30 text-purple-200 text-[10px] font-semibold w-max mb-1.5">
            <Sparkles className="w-3 h-3 text-purple-300" />
            Good evening, {user?.name || 'Daniel'} 👋
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            What's the VYBE today?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-sm">
            Hotels, restaurants, nightlife, events and more — all in Uyo.
          </p>
        </div>
      </div>

      {/* Search Bar with Filter Icon */}
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for hotels, restaurants, events..."
            className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm focus:border-purple-600 focus:ring-2 focus:ring-purple-600/10 text-sm placeholder-slate-400 outline-none transition-all"
          />
        </div>
        <button
          onClick={onSelectExplore}
          className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-purple-600 flex items-center justify-center text-slate-600 hover:text-purple-600 transition-all flex-shrink-0"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Categories Horizontal Carousel */}
      <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar pb-1 -mx-2 px-2">
        {[
          { id: 'hotels', label: 'Hotels', icon: BedDouble },
          { id: 'restaurants', label: 'Restaurants', icon: UtensilsCrossed },
          { id: 'nightlife', label: 'Nightlife', icon: GlassWater },
          { id: 'events', label: 'Events', icon: Ticket },
          { id: 'resorts', label: 'Resorts', icon: Palmtree },
          { id: 'more', label: 'More', icon: MoreHorizontal },
        ].map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex flex-col items-center justify-center min-w-[70px] sm:min-w-[80px] p-3 rounded-2xl border transition-all ${
                isActive
                  ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/20'
                  : 'bg-white text-slate-600 border-slate-200/70 hover:border-slate-300'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1.5 ${isActive ? 'text-white' : 'text-slate-600'}`} />
              <span className="text-[11px] font-semibold">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Featured in Uyo Section */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Featured in Uyo</h3>
            <p className="text-xs text-slate-500">Hand-picked luxury stays with verified reviews</p>
          </div>
          <button
            onClick={onSelectExplore}
            className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-0.5"
          >
            <span>See All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Horizontal Hotel Cards Scroll */}
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 -mx-2 px-2">
          {filteredHotels.slice(0, 3).map((hotel) => {
            const isSaved = savedIds.includes(hotel.id);
            return (
              <div
                key={hotel.id}
                onClick={() => onSelectHotel(hotel)}
                className="min-w-[270px] sm:min-w-[290px] bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer group flex-shrink-0"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-purple-600/90 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1 shadow-sm">
                    <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                    <span>{hotel.badge}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave(hotel.id);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:scale-110 transition-transform"
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
                  </button>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-base group-hover:text-purple-600 transition-colors">
                      {hotel.name}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <div className="flex items-center gap-1 font-semibold text-slate-700">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{hotel.rating}</span>
                    </div>
                    <span>•</span>
                    <span>({hotel.reviewsCount} reviews)</span>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                    <span className="truncate">{hotel.address}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-base font-extrabold text-slate-900">
                        ₦{hotel.pricePerNight.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-500 font-normal"> / night</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectHotel(hotel);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-600 text-purple-600 hover:text-white text-xs font-bold transition-all border border-purple-200"
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

      {/* Top Restaurants in Uyo */}
      <div className="space-y-3.5 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Top Restaurants</h3>
            <p className="text-xs text-slate-500">Fine dining, local soups and grills</p>
          </div>
          <button className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-0.5">
            <span>See All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {VYBE_DATA.restaurants.map((rest) => (
            <div
              key={rest.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden hover:shadow-md transition-all group"
            >
              <div className="relative h-36">
                <img
                  src={rest.image}
                  alt={rest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white">
                  <Heart className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
              <div className="p-3.5 space-y-1.5">
                <h4 className="font-bold text-slate-900 text-sm">{rest.name}</h4>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-slate-700">{rest.rating}</span>
                  <span>({rest.reviewsCount} reviews)</span>
                  <span>•</span>
                  <span>{rest.area}</span>
                </div>
                <div className="flex gap-1.5 pt-1">
                  {rest.cuisines.map((c, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[10px] font-semibold"
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

      {/* Upcoming Events: What's Happening in Uyo */}
      <div className="space-y-3.5 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Upcoming Events</h3>
            <p className="text-xs text-slate-500">Live nightlife, festivals and experiences</p>
          </div>
          <button className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-0.5">
            <span>See All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {VYBE_DATA.events.map((evt) => (
            <div
              key={evt.id}
              className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group text-white h-44 cursor-pointer"
            >
              <img
                src={evt.image}
                alt={evt.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

              <div className="absolute top-3 left-3 px-2 py-1 rounded-xl bg-purple-600 font-bold text-center leading-none text-white shadow-md">
                <span className="text-[10px] uppercase block tracking-wider">{evt.date.split(' ')[0]}</span>
                <span className="text-base font-black">{evt.date.split(' ')[1]}</span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-3.5">
                <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider block mb-0.5">
                  {evt.badge}
                </span>
                <h4 className="font-bold text-sm text-white leading-snug line-clamp-1">{evt.title}</h4>
                <div className="flex items-center justify-between mt-1 text-xs text-slate-300">
                  <span className="text-[11px] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-purple-400" />
                    {evt.location}
                  </span>
                  <span className="font-bold text-white">₦{evt.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Book with VYBE Trust Section */}
      <div className="pt-4 p-5 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4">
        <h4 className="text-base font-extrabold text-slate-900 text-center">
          Why Discover & Book with VYBE?
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {VYBE_DATA.whyBook.map((item, idx) => (
            <div key={idx} className="p-3 rounded-2xl bg-white border border-slate-200/60 text-center shadow-xs">
              <CheckCircle2 className="w-5 h-5 text-purple-600 mx-auto mb-1.5" />
              <div className="font-bold text-xs text-slate-900">{item.title}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{item.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
