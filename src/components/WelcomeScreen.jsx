import React from 'react';
import {
  BedDouble,
  Utensils,
  Ticket,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  MapPin,
  ChevronRight
} from 'lucide-react';

export default function WelcomeScreen({ onGetStarted, onSignIn, onSelectCategory }) {
  const categories = [
    {
      id: 'hotels',
      title: 'Hotels',
      subtitle: 'Book your stay',
      icon: BedDouble,
      gradient: 'from-[#4338ca] to-[#3b82f6]',
      bgGlow: 'rgba(59, 130, 246, 0.4)',
    },
    {
      id: 'restaurants',
      title: 'Restaurants',
      subtitle: 'Great food near you',
      icon: Utensils,
      gradient: 'from-[#d97706] to-[#b45309]',
      bgGlow: 'rgba(217, 119, 6, 0.4)',
    },
    {
      id: 'events',
      title: 'Events',
      subtitle: "What's happening",
      icon: Ticket,
      gradient: 'from-[#e11d48] to-[#be123c]',
      bgGlow: 'rgba(225, 29, 72, 0.4)',
    },
    {
      id: 'shops',
      title: 'Shops & More',
      subtitle: 'Explore the city',
      icon: ShoppingBag,
      gradient: 'from-[#059669] to-[#047857]',
      bgGlow: 'rgba(5, 150, 105, 0.4)',
    },
  ];

  const handleCategoryClick = (catId) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    } else {
      onGetStarted();
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#07070a] text-white overflow-hidden flex flex-col justify-between selection:bg-purple-600 selection:text-white">
      {/* 1. CINEMATIC BACKGROUND (Illuminated waterfront skyline & luxury city bridge at dusk/night) */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=2000&q=85"
          alt="VYBE City Skyline"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.85] contrast-[1.1] transition-transform duration-1000"
        />
        {/* Multilayered radial and linear dark gradients for spatial contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060609] via-[#060609]/40 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-[#060609]/90" />
        <div className="absolute inset-0 bg-radial-at-t from-purple-900/30 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* 2. TOP APPLE NAV BAR (Desktop only, minimal and elegant) */}
      <header className="relative z-20 w-full px-6 sm:px-12 pt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center text-2xl sm:text-3xl font-black tracking-tight font-display text-white">
            <span>V</span>
            <span className="bg-gradient-to-br from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
              Y
            </span>
            <span>BE</span>
          </div>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />
          <span className="hidden sm:inline-block text-xs uppercase tracking-widest text-slate-400 font-semibold pl-2">
            Uyo, Akwa Ibom
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onSignIn}
            className="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={onGetStarted}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold backdrop-blur-md transition-all active:scale-95"
          >
            Explore Stays →
          </button>
        </div>
      </header>

      {/* 3. MAIN CONTENT CONTAINER (Responsive: Mobile 1-to-1 match of boss's image, Desktop Apple Vision Pro Cinema) */}
      <main className="relative z-10 w-full flex-1 flex flex-col justify-between px-6 sm:px-12 py-8 max-w-6xl mx-auto">
        {/* BRAND HERO SECTION (Exact layout from image: VYBE + Discover. Book. Experience. + purple line + subtitle) */}
        <div className="pt-6 sm:pt-12 max-w-xl space-y-2">
          {/* Main Logo */}
          <div className="flex items-baseline text-5xl sm:text-7xl font-black tracking-tight font-display text-white drop-shadow-md">
            <span>V</span>
            <span className="bg-gradient-to-br from-purple-400 via-purple-500 to-indigo-400 bg-clip-text text-transparent">
              Y
            </span>
            <span>BE</span>
          </div>

          {/* Tagline */}
          <p className="text-base sm:text-xl font-bold tracking-tight text-white drop-shadow-sm">
            Discover. Book. Experience.
          </p>

          {/* Purple Accent Bar */}
          <div className="w-12 h-0.5 bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7]" />

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-slate-200/90 font-normal leading-relaxed pt-1 max-w-md drop-shadow-sm">
            Hotels, restaurants, events, lounges and more — all in one app.
          </p>
        </div>

        {/* BOTTOM SECTION: Boss's Floating Glassmorphic Card + Dots + Footer Tagline */}
        <div className="w-full max-w-md mx-auto lg:max-w-xl lg:mx-0 lg:ml-auto pt-8 pb-4 space-y-5">
          {/* FLOATING GLASS CARD (Exact 1-to-1 match of boss's image) */}
          <div className="rounded-[36px] bg-[#12131a]/85 backdrop-blur-2xl border border-white/15 p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-5">
            {/* 4 Category Icon Tiles */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className="flex flex-col items-center text-center group cursor-pointer focus:outline-none"
                  >
                    {/* Rounded Square Icon Badge */}
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-white shadow-lg transition-transform duration-200 group-hover:scale-105 group-active:scale-95`}
                    >
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
                    </div>

                    {/* Category Title */}
                    <span className="font-extrabold text-[11px] sm:text-xs text-white mt-2 block tracking-tight group-hover:text-purple-300 transition-colors">
                      {cat.title}
                    </span>

                    {/* Category Subtitle */}
                    <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium leading-tight block mt-0.5">
                      {cat.subtitle}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ACTION BUTTONS (Exact match: Pure White Get Started Pill + Dark/Purple Outline Sign In Pill) */}
            <div className="space-y-3 pt-2">
              {/* 1. Get Started → */}
              <button
                onClick={onGetStarted}
                className="w-full py-4 px-6 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl active:scale-[0.98] transition-all"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* 2. Sign In */}
              <button
                onClick={onSignIn}
                className="w-full py-3.5 px-6 rounded-full bg-[#181924]/60 hover:bg-[#202230]/80 border border-purple-500/60 hover:border-purple-400 text-white font-bold text-sm sm:text-base flex items-center justify-center transition-all active:scale-[0.98] backdrop-blur-md"
              >
                <span>Sign In</span>
              </button>
            </div>
          </div>

          {/* 3 Pagination Carousel Dots (● ○ ○) */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <span className="w-2 h-2 rounded-full bg-white" />
            <span className="w-2 h-2 rounded-full bg-white/40" />
            <span className="w-2 h-2 rounded-full bg-white/40" />
          </div>

          {/* Footer Tagline (Your City. Your VYBE.) */}
          <div className="text-center">
            <p className="text-xs sm:text-sm font-semibold text-slate-300 tracking-wide">
              Your City. Your{' '}
              <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent font-extrabold">
                VYBE.
              </span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
