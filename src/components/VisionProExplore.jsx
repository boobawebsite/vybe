import React, { useState, useRef, useEffect } from 'react';
import {
  MapPin,
  Star,
  Navigation,
  ChevronRight,
  ChevronLeft,
  Heart,
  SlidersHorizontal,
  Search,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Plus,
  Minus,
  Compass,
  Layers,
  RotateCcw,
  Check,
  BedDouble,
  UtensilsCrossed,
  GlassWater,
  Ticket,
  Palmtree,
  MoreHorizontal,
  Bell,
  X
} from 'lucide-react';
import { VYBE_DATA } from '../data/vybeData';

export default function VisionProExplore({ onSelectHotel, savedIds = [], onToggleSave }) {
  const [activeCategory, setActiveCategory] = useState('hotels');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePin, setActivePin] = useState(VYBE_DATA.hotels[0]);
  const [hoveredHotelId, setHoveredHotelId] = useState(null);
  const [mapZoom, setMapZoom] = useState(1);
  const [mapType, setMapType] = useState('default'); // 'default' | 'satellite'
  const [isDrawerExpanded, setIsDrawerExpanded] = useState(false);

  const carouselRef = useRef(null);
  const hotelRefs = useRef({});

  // Scroll carousel left/right
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Sync carousel position when activePin changes
  useEffect(() => {
    if (activePin && hotelRefs.current[activePin.id]) {
      hotelRefs.current[activePin.id].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activePin]);

  // Exact categories from boss's screenshot
  const categoryPills = [
    { id: 'hotels', label: 'Hotels', icon: BedDouble },
    { id: 'restaurants', label: 'Restaurants', icon: UtensilsCrossed },
    { id: 'nightlife', label: 'Nightlife', icon: GlassWater },
    { id: 'events', label: 'Events', icon: Ticket },
    { id: 'resorts', label: 'Resorts', icon: Palmtree },
    { id: 'more', label: 'More', icon: MoreHorizontal },
  ];

  // Drawer filter tabs from boss's screenshot
  const drawerTabs = [
    { id: 'all', label: 'All', icon: null },
    { id: 'hotels', label: 'Hotels', icon: BedDouble },
    { id: 'restaurants', label: 'Restaurants', icon: UtensilsCrossed },
    { id: 'nightlife', label: 'Nightlife', icon: GlassWater },
    { id: 'events', label: 'Events', icon: Ticket },
  ];

  const filteredHotels = VYBE_DATA.hotels.filter(h =>
    h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900 font-sans">
      {/* ========================================================================= */}
      {/* 1. DESKTOP VIEWPORT: FULL-SCREEN MAP WITH BOTTOM FLOATING HOTEL CAROUSEL  */}
      {/* ========================================================================= */}
      <div className="hidden lg:block relative w-full h-[calc(100vh-62px)] overflow-hidden bg-[#e5e3df]">
        {/* A. MAP CANVAS (COVERS 100% OF THE SCREEN) */}
        <div
          className="w-full h-full relative transition-transform duration-300"
          style={{ transform: `scale(${mapZoom})`, transformOrigin: 'center center' }}
        >
          {/* Map Canvas Background (Light Google Palette: roads, parks, rivers) */}
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#f1eee8" />

            {/* Parks & Green Zones (Discovery Park & Greenery) */}
            <path
              d="M 520,70 Q 640,40 720,100 T 700,240 Q 600,260 540,190 Z"
              fill="#c8e6c9"
              opacity="0.85"
            />
            <path
              d="M 850,300 Q 960,280 1020,350 T 980,450 Q 880,460 840,410 Z"
              fill="#dcedc8"
              opacity="0.75"
            />
            <circle cx="340" cy="460" r="95" fill="#c8e6c9" opacity="0.6" />

            {/* Rivers / Waterway */}
            <path
              d="M -50,190 Q 300,140 520,250 T 950,230 T 1400,320"
              fill="none"
              stroke="#aad3df"
              strokeWidth="28"
              strokeLinecap="round"
            />

            {/* Major Highways & Roads (White with Google gold accent) */}
            {/* Ikot Ekpene Road */}
            <path
              d="M 0,240 Q 400,290 680,410 T 1400,600"
              fill="none"
              stroke="#ffffff"
              strokeWidth="18"
              strokeLinecap="round"
            />
            <path
              d="M 0,240 Q 400,290 680,410 T 1400,600"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="11"
              strokeLinecap="round"
              opacity="0.75"
            />

            {/* Nwaniba Road */}
            <path
              d="M 640,0 Q 680,300 760,700"
              fill="none"
              stroke="#ffffff"
              strokeWidth="18"
              strokeLinecap="round"
            />
            <path
              d="M 640,0 Q 680,300 760,700"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="10"
              strokeLinecap="round"
              opacity="0.75"
            />

            {/* Oron Road */}
            <path
              d="M 680,410 Q 920,450 1400,520"
              fill="none"
              stroke="#ffffff"
              strokeWidth="16"
              strokeLinecap="round"
            />

            {/* Secondary Grid Lines */}
            <path d="M 240,0 L 240,900" fill="none" stroke="#ffffff" strokeWidth="7" opacity="0.8" />
            <path d="M 480,0 L 480,900" fill="none" stroke="#ffffff" strokeWidth="7" opacity="0.8" />
            <path d="M 900,0 L 900,900" fill="none" stroke="#ffffff" strokeWidth="7" opacity="0.8" />
            <path d="M 0,520 L 1400,520" fill="none" stroke="#ffffff" strokeWidth="7" opacity="0.8" />
          </svg>

          {/* Highway & Road Labels */}
          <div className="absolute top-28 left-20 text-[11px] font-bold text-slate-600 bg-white/90 px-3.5 py-1 rounded-full shadow-xs border border-slate-200">
            Ikot Ekpene Rd
          </div>

          <div className="absolute top-52 left-28 text-[11px] font-bold text-slate-600 bg-white/90 px-3.5 py-1 rounded-full shadow-xs border border-slate-200">
            Nwaniba Rd
          </div>

          <div className="absolute bottom-48 right-36 text-[11px] font-bold text-slate-600 bg-white/90 px-3.5 py-1 rounded-full shadow-xs border border-slate-200">
            Oron Rd
          </div>

          {/* City Center Landmark & Discovery Park */}
          <div className="absolute top-[48%] left-[52%] -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <span className="text-3xl font-black text-slate-800 tracking-tight block">
              Uyo
            </span>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
              CITY CENTER
            </span>
          </div>

          <div className="absolute top-[20%] left-[56%] flex items-center gap-1.5 bg-emerald-100/90 text-emerald-900 px-3 py-1 rounded-full text-xs font-bold border border-emerald-300 shadow-2xs">
            <span>🌲</span>
            <span>Discovery Park</span>
          </div>

          <div className="absolute top-[60%] left-[64%] flex items-center gap-1.5 bg-blue-100/90 text-blue-900 px-3 py-1 rounded-full text-xs font-bold border border-blue-300 shadow-2xs">
            <span>🛍️</span>
            <span>Ibom Plaza</span>
          </div>

          <div className="absolute top-[68%] left-[70%] flex items-center gap-1.5 bg-emerald-100/90 text-emerald-900 px-3 py-1 rounded-full text-xs font-bold border border-emerald-300 shadow-2xs">
            <span>🏟️</span>
            <span>Uyo Township Stadium</span>
          </div>

          {/* Circular Photo Price Pins (Exact from Boss's Screenshot) */}
          {VYBE_DATA.hotels.map((hotel) => {
            const isSelected = activePin?.id === hotel.id;
            const isHovered = hoveredHotelId === hotel.id;

            return (
              <div
                key={hotel.id}
                style={{ top: `${hotel.coordinates.y}%`, left: `${hotel.coordinates.x}%` }}
                onClick={() => {
                  setActivePin(hotel);
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 transition-transform duration-200 ${
                  isSelected || isHovered ? 'scale-120 z-40' : 'hover:scale-105'
                }`}
              >
                {/* Pin Head: Circular Photo + Price Badge Pill */}
                <div className="flex flex-col items-center">
                  {/* Price Pill Badge */}
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-black shadow-lg flex items-center gap-1 transition-all ${
                      isSelected || isHovered
                        ? 'bg-purple-600 text-white ring-4 ring-purple-600/30'
                        : 'bg-white text-slate-900 border border-slate-200'
                    }`}
                  >
                    <span>₦{hotel.pricePerNight.toLocaleString()}</span>
                  </div>

                  {/* Circular Hotel Photo Avatar with Purple Ring */}
                  <div
                    className={`w-14 h-14 rounded-full border-3 overflow-hidden shadow-xl -mt-1 bg-white relative ${
                      isSelected || isHovered
                        ? 'border-purple-600 ring-4 ring-purple-600/40'
                        : 'border-white'
                    }`}
                  >
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Purple Pin Dot Anchor */}
                  <div className="w-3 h-3 rounded-full bg-purple-600 ring-2 ring-white shadow-md -mt-1.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* B. TOP FLOATING GOOGLE SEARCH & FILTER BAR OVER MAP */}
        <div className="absolute top-4 left-6 right-6 z-30 flex items-center justify-between gap-4 pointer-events-none">
          <div className="flex items-center gap-3 flex-1 max-w-2xl pointer-events-auto bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-2 shadow-xl">
            {/* Search Input Box */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute inset-y-0 left-3.5 my-auto pointer-events-none" />
              <input
                type="text"
                placeholder="Search hotels, restaurants, landmarks in Uyo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-8 py-2 rounded-xl bg-slate-50 hover:bg-white focus:bg-white text-xs text-slate-800 placeholder-slate-400 outline-none border border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/10 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-3 my-auto text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar">
              {['All', 'Hotels', 'Restaurants', 'Nightlife', 'Events'].map((cat) => {
                const isActive = selectedFilter === cat.toLowerCase();
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedFilter(cat.toLowerCase())}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border whitespace-nowrap ${
                      isActive
                        ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Live Rates Pill */}
          <div className="pointer-events-auto bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl px-4 py-2 shadow-xl flex items-center gap-3 text-xs text-slate-600 font-medium">
            <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Rates Active
            </span>
            <span className="text-slate-300">|</span>
            <span>Uyo, Akwa Ibom</span>
          </div>
        </div>



        {/* D. BOTTOM-RIGHT FLOATING MAP CONTROLS (ZOOM & RECENTER) */}
        <div className="absolute bottom-40 right-6 z-40 flex flex-col items-center gap-2.5">
          {/* Recenter / Locate Me Button */}
          <button
            onClick={() => {
              setMapZoom(1);
              setActivePin(VYBE_DATA.hotels[0]);
            }}
            className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-xl flex items-center justify-center text-purple-600 hover:bg-slate-50 transition-all active:scale-95"
            title="Locate Me / Recenter"
          >
            <Navigation className="w-5 h-5 fill-purple-600 text-purple-600" />
          </button>

          {/* Zoom Controls */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col">
            <button
              onClick={() => setMapZoom((prev) => Math.min(prev + 0.2, 1.8))}
              className="w-11 h-10 flex items-center justify-center text-slate-700 hover:bg-slate-50 border-b border-slate-100 active:scale-95"
              title="Zoom In"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMapZoom((prev) => Math.max(prev - 0.2, 0.8))}
              className="w-11 h-10 flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95"
              title="Zoom Out"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* E. BOTTOM FLOATING HOTEL CAROUSEL ON MAP (HIGHLIGHTED BY USER IN RED BOXES) */}
        <div className="absolute bottom-5 inset-x-0 z-30 px-6 pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-3 w-full">
            {/* Scroll Left Button */}
            <button
              onClick={() => scrollCarousel('left')}
              className="w-11 h-11 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl flex items-center justify-center text-slate-700 hover:text-purple-600 hover:bg-white active:scale-90 transition-all flex-shrink-0"
              title="Previous Stays"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Horizontal Scrollable Track */}
            <div
              ref={carouselRef}
              className="flex items-center gap-4 overflow-x-auto hide-scrollbar scroll-smooth py-2 flex-1"
            >
              {filteredHotels.map((hotel) => {
                const isSelected = activePin?.id === hotel.id;
                const isSaved = savedIds.includes(hotel.id);
                const roomSpec = hotel.rooms[0] || { title: 'Deluxe Room', guests: 2, size: '32 m²' };

                return (
                  <div
                    key={hotel.id}
                    ref={(el) => (hotelRefs.current[hotel.id] = el)}
                    onClick={() => setActivePin(hotel)}
                    onMouseEnter={() => setHoveredHotelId(hotel.id)}
                    onMouseLeave={() => setHoveredHotelId(null)}
                    className={`w-[330px] min-w-[330px] rounded-3xl p-3 border transition-all duration-300 cursor-pointer flex gap-3.5 items-center select-none shadow-xl ${
                      isSelected
                        ? 'bg-white ring-2 ring-purple-600 border-purple-600 scale-[1.02] shadow-2xl'
                        : 'bg-white/95 backdrop-blur-xl border-slate-200/90 hover:bg-white hover:border-purple-300 hover:shadow-2xl'
                    }`}
                  >
                    {/* Hotel Thumbnail */}
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleSave(hotel.id);
                        }}
                        className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:scale-110 transition-transform"
                      >
                        <Heart className={`w-3 h-3 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
                      </button>
                    </div>

                    {/* Hotel Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between h-24 py-0.5">
                      <div>
                        <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{hotel.rating}</span>
                          <span className="text-slate-400 font-normal">({hotel.reviewsCount})</span>
                        </div>

                        <h4 className="font-extrabold text-xs text-slate-900 truncate mt-0.5">
                          {hotel.name}
                        </h4>

                        <p className="text-[10px] text-slate-500 truncate flex items-center gap-0.5 mt-0.5">
                          <MapPin className="w-2.5 h-2.5 text-purple-600 flex-shrink-0" />
                          <span>{hotel.address}</span>
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                        <div>
                          <span className="text-xs font-black text-slate-900">
                            ₦{hotel.pricePerNight.toLocaleString()}
                          </span>
                          <span className="text-[9px] text-slate-400 font-normal"> / nt</span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectHotel(hotel);
                          }}
                          className="px-3.5 py-1 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold shadow-xs active:scale-95 transition-all"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scroll Right Button */}
            <button
              onClick={() => scrollCarousel('right')}
              className="w-11 h-11 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl flex items-center justify-center text-slate-700 hover:text-purple-600 hover:bg-white active:scale-90 transition-all flex-shrink-0"
              title="Next Stays"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MOBILE VIEWPORT: EXACT 1-TO-1 MATCH OF BOSS'S UPLOADED SCREENSHOT       */}
      {/* ========================================================================= */}
      <div className="lg:hidden relative min-h-screen bg-white text-slate-900 pb-20 overflow-x-hidden">
        {/* Top Header Section (Exact from Screenshot: VYBE Logo, Uyo Dropdown, Bell) */}
        <div className="px-4 pt-3 pb-2 bg-white sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <span className="text-2xl font-black tracking-tight text-slate-950 font-display">
                  VYBE
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-100">
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

          {/* Search Bar with Filter Trigger */}
          <div className="flex items-center gap-2 mt-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute inset-y-0 left-3.5 my-auto pointer-events-none" />
              <input
                type="text"
                placeholder="Search this area"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-purple-600 shadow-2xs"
              />
            </div>
            <button className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-2xs flex-shrink-0">
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Category Horizontal Pills (Hotels active purple pill) */}
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4 pt-3 pb-1">
            {categoryPills.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap border ${
                    isActive
                      ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-600'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Map Area (Height 360px on mobile) */}
        <div className="relative h-[380px] w-full bg-[#f1eee8] overflow-hidden border-y border-slate-200">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#f1eee8" />

            {/* River */}
            <path
              d="M -50,140 Q 150,110 260,180 T 450,220"
              fill="none"
              stroke="#aad3df"
              strokeWidth="20"
              strokeLinecap="round"
            />

            {/* Roads */}
            <path
              d="M 0,160 Q 200,200 320,290 T 500,400"
              fill="none"
              stroke="#ffffff"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d="M 0,160 Q 200,200 320,290 T 500,400"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.7"
            />

            <path
              d="M 280,0 Q 300,180 340,400"
              fill="none"
              stroke="#ffffff"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d="M 280,0 Q 300,180 340,400"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.7"
            />
          </svg>

          {/* Road Name Labels (Exact from Screenshot) */}
          <div className="absolute top-10 left-3 text-[9px] font-bold text-slate-500 bg-white/85 px-2 py-0.5 rounded-full shadow-2xs">
            Ikot Ekpene Rd
          </div>

          <div className="absolute top-28 left-4 text-[9px] font-bold text-slate-500 bg-white/85 px-2 py-0.5 rounded-full shadow-2xs">
            Nwaniba Rd
          </div>

          {/* Landmarks (Discovery Park, Ibom Plaza, Uyo Township Stadium) */}
          <div className="absolute top-24 left-[48%] flex items-center gap-1 bg-emerald-100/90 text-emerald-900 px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-emerald-300 shadow-2xs">
            <span>🌲</span>
            <span>Discovery Park</span>
          </div>

          <div className="absolute top-[44%] left-[53%] -translate-x-1/2 text-center pointer-events-none">
            <span className="text-xl font-black text-slate-800 tracking-tight block">
              Uyo
            </span>
          </div>

          <div className="absolute top-[60%] left-[58%] flex items-center gap-1 bg-blue-100/90 text-blue-900 px-2 py-0.5 rounded-full text-[9px] font-bold border border-blue-200 shadow-2xs">
            <span>🛍️</span>
            <span>Ibom Plaza</span>
          </div>

          <div className="absolute top-[72%] left-[63%] flex items-center gap-1 bg-emerald-100/90 text-emerald-900 px-2 py-0.5 rounded-full text-[9px] font-bold border border-emerald-200 shadow-2xs">
            <span>🏟️</span>
            <span>Uyo Township Stadium</span>
          </div>

          {/* Circular Photo Price Pins (Exact 5 pins from Boss's Screenshot) */}
          {VYBE_DATA.hotels.slice(0, 5).map((hotel) => {
            const isSelected = activePin?.id === hotel.id;
            return (
              <div
                key={hotel.id}
                style={{ top: `${hotel.coordinates.y}%`, left: `${hotel.coordinates.x}%` }}
                onClick={() => {
                  setActivePin(hotel);
                  onSelectHotel(hotel);
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 flex flex-col items-center ${
                  isSelected ? 'scale-110 z-30' : ''
                }`}
              >
                {/* Price Tag Pill */}
                <div
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-black shadow-md flex items-center whitespace-nowrap ${
                    isSelected
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-slate-900 border border-slate-200'
                  }`}
                >
                  ₦{hotel.pricePerNight.toLocaleString()}
                </div>

                {/* Circular Photo Pin */}
                <div
                  className={`w-11 h-11 rounded-full border-2 overflow-hidden shadow-lg -mt-1 bg-white ${
                    isSelected ? 'border-purple-600 ring-2 ring-purple-600/30' : 'border-white'
                  }`}
                >
                  <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                </div>

                {/* Purple Anchor Dot */}
                <div className="w-2.5 h-2.5 rounded-full bg-purple-600 ring-1 ring-white shadow-sm -mt-1" />
              </div>
            );
          })}

          {/* Floating Navigation Compass (Bottom Right on Map) */}
          <button
            onClick={() => setActivePin(VYBE_DATA.hotels[0])}
            className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-purple-600 active:scale-95 z-20"
          >
            <Navigation className="w-4 h-4 fill-purple-600" />
          </button>
        </div>

        {/* BOTTOM SHEET / DRAWER: Nearby Places (From Boss's Screenshot) */}
        <div className="bg-white rounded-t-3xl shadow-xl -mt-4 relative z-30 p-4 border-t border-slate-200 space-y-4">
          {/* Pull Handle Bar */}
          <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto" />

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                Nearby Places
              </h3>
              <p className="text-[11px] text-slate-500">
                Hotels, restaurants, events and more around you
              </p>
            </div>

            <button className="text-xs font-bold text-purple-600 flex items-center gap-0.5">
              <span>See All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Drawer Filter Chips (All, Hotels, Restaurants, Nightlife, Events) */}
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-1">
            {drawerTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = selectedFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                    isActive
                      ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  {Icon && <Icon className="w-3 h-3" />}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Hotel Cards List (Motion Hotel, TOMA Hotel, Justkustino Luxury Apartment) */}
          <div className="space-y-3 pt-1">
            {filteredHotels.slice(0, 4).map((hotel) => {
              const isSaved = savedIds.includes(hotel.id);
              const roomSpec = hotel.rooms[0] || { title: 'Deluxe Room', guests: 2, size: '32 m²' };

              return (
                <div
                  key={hotel.id}
                  onClick={() => onSelectHotel(hotel)}
                  className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden p-3 flex gap-3.5 cursor-pointer active:scale-[0.99] transition-all"
                >
                  {/* Photo with Heart */}
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(hotel.id);
                      }}
                      className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white"
                    >
                      <Heart className={`w-3 h-3 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900 truncate">
                        {hotel.name}
                      </h4>

                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                        <span className="text-amber-400">★</span>
                        <span className="font-bold text-slate-800">{hotel.rating}</span>
                        <span>({hotel.reviewsCount} reviews)</span>
                      </div>

                      <p className="text-[11px] text-slate-500 truncate flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-purple-600 flex-shrink-0" />
                        <span>{hotel.address}</span>
                      </p>

                      <div className="flex items-center gap-2 text-[10px] text-slate-600 font-semibold mt-1">
                        <span>🛏️ {roomSpec.title}</span>
                        <span>👥 {roomSpec.guests} Guests</span>
                        <span>📐 {roomSpec.size || '32 m²'}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 mt-1 border-t border-slate-100">
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
                        className="px-4 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-bold active:scale-95 shadow-xs"
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
      </div>
    </div>
  );
}
