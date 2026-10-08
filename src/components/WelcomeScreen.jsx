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
  ChevronRight,
  Search,
  User,
  Compass
} from 'lucide-react';

export default function WelcomeScreen({ onGetStarted, onSignIn, onSelectCategory }) {
  const categories = [
    {
      id: 'hotels',
      title: 'Hotels',
      subtitle: 'Book your stay',
      desktopDesc: 'Verified luxury stays & suites across Uyo',
      icon: BedDouble,
      gradient: 'from-[#4338ca] to-[#3b82f6]',
      ringColor: 'group-hover:border-blue-400/50',
    },
    {
      id: 'restaurants',
      title: 'Restaurants',
      subtitle: 'Great food near you',
      desktopDesc: 'Award-winning cuisine & local culinary icons',
      icon: Utensils,
      gradient: 'from-[#d97706] to-[#b45309]',
      ringColor: 'group-hover:border-amber-400/50',
    },
    {
      id: 'events',
      title: 'Events',
      subtitle: "What's happening",
      desktopDesc: 'Festivals, live music & cultural nightlife',
      icon: Ticket,
      gradient: 'from-[#e11d48] to-[#be123c]',
      ringColor: 'group-hover:border-rose-400/50',
    },
    {
      id: 'shops',
      title: 'Shops & More',
      subtitle: 'Explore the city',
      desktopDesc: 'Boutiques, wellness resorts & leisure attractions',
      icon: ShoppingBag,
      gradient: 'from-[#059669] to-[#047857]',
      ringColor: 'group-hover:border-emerald-400/50',
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
    <div className="relative min-h-screen w-full bg-[#050508] text-white overflow-hidden selection:bg-purple-600 selection:text-white font-sans">
      {/* 1. CINEMATIC BACKGROUND (Illuminated waterfront skyline & luxury city bridge at dusk/night) */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=2400&q=90"
          alt="VYBE City Skyline"
          className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.15]"
        />
        {/* Apple-grade subtle spatial lighting gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/40 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#050508]/95" />
        <div className="absolute inset-0 bg-radial-at-t from-purple-900/25 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* 2. DESKTOP VIEWPORT: EXACTLY HOW APPLE DESIGNS APPLE VISION PRO HERO     */}
      {/* ========================================================================= */}
      <div className="hidden lg:flex relative z-10 min-h-screen flex-col justify-between">
        {/* Apple-Style Global Nav */}
        <header className="w-full bg-black/40 backdrop-blur-xl border-b border-white/10 px-10 py-3.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div
                onClick={onGetStarted}
                className="flex items-center cursor-pointer font-extrabold text-base tracking-tight"
              >
                <span className="text-xl font-black font-display tracking-tight text-white">
                  V<span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">Y</span>BE
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onSignIn}
                className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={onGetStarted}
                className="px-5 py-2 rounded-full bg-white text-black hover:bg-slate-100 text-xs font-bold transition-all active:scale-95 shadow-md flex items-center gap-1.5"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </header>

        {/* Central Apple Vision Pro Hero Theatre */}
        <main className="max-w-6xl mx-auto px-10 py-12 w-full flex-1 flex flex-col justify-center items-center text-center space-y-8">
          {/* Majestic Hero Headline (Apple Scale) */}
          <div className="space-y-4 max-w-4xl">
            <div className="flex items-center justify-center text-7xl xl:text-8xl font-black font-display tracking-tight text-white">
              <span>V</span>
              <span className="bg-gradient-to-br from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent px-1">
                Y
              </span>
              <span>BE</span>
            </div>

            <h1 className="text-4xl xl:text-5xl font-black text-white tracking-tight leading-tight">
              Discover. Book. Experience.
            </h1>

            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mx-auto shadow-[0_0_12px_#a855f7]" />

            <p className="text-lg xl:text-xl text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
              Hotels, restaurants, events, lounges and more — all in one unified platform.
            </p>
          </div>

          {/* Apple Action Buttons */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              onClick={onGetStarted}
              className="px-8 py-4 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-black text-base flex items-center gap-2.5 shadow-xl hover:shadow-2xl active:scale-95 transition-all"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <button
              onClick={onSignIn}
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-base backdrop-blur-xl transition-all active:scale-95"
            >
              <span>Sign In</span>
            </button>
          </div>

          {/* Apple Vision Pro Spatial Frosted Glass Dock (4 Category Cards) */}
          <div className="grid grid-cols-4 gap-5 w-full max-w-5xl pt-8">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`group relative rounded-[28px] p-6 text-left cursor-pointer transition-all duration-300 bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-2xl border border-white/15 ${cat.ringColor} hover:-translate-y-1 hover:shadow-2xl`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-7 h-7 stroke-[2.2]" />
                  </div>

                  <h3 className="font-extrabold text-lg text-white group-hover:text-purple-300 transition-colors flex items-center justify-between">
                    <span>{cat.title}</span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h3>

                  <p className="text-xs font-semibold text-purple-300/90 mt-1">
                    {cat.subtitle}
                  </p>

                  <p className="text-[11px] text-slate-400 font-normal mt-2 leading-relaxed">
                    {cat.desktopDesc}
                  </p>
                </div>
              );
            })}
          </div>
        </main>

      </div>

      {/* ========================================================================= */}
      {/* 3. MOBILE VIEWPORT: EXACT 1-TO-1 MATCH OF BOSS'S UPLOADED SCREENSHOT       */}
      {/* ========================================================================= */}
      <div className="lg:hidden relative z-10 min-h-screen flex flex-col justify-between p-6 pt-12 pb-8">
        {/* Top Branding Section (From Boss's Screenshot) */}
        <div className="space-y-2">
          {/* VYBE Logo */}
          <div className="flex items-baseline text-5xl font-black tracking-tight font-display text-white">
            <span>V</span>
            <span className="bg-gradient-to-br from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
              Y
            </span>
            <span>BE</span>
          </div>

          {/* Tagline */}
          <p className="text-base font-bold tracking-tight text-white">
            Discover. Book. Experience.
          </p>

          {/* Purple Accent Divider */}
          <div className="w-12 h-0.5 bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7]" />

          {/* Subtitle */}
          <p className="text-xs text-slate-200 font-normal leading-relaxed pt-1 max-w-[280px]">
            Hotels, restaurants, events, lounges and more — all in one app.
          </p>
        </div>

        {/* Floating Glassmorphic Card + Buttons + Footer */}
        <div className="w-full space-y-4 pt-6">
          {/* Glass Card Container */}
          <div className="rounded-[36px] bg-[#12131a]/85 backdrop-blur-2xl border border-white/15 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-5">
            {/* 4 Category Icon Tiles */}
            <div className="grid grid-cols-4 gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className="flex flex-col items-center text-center group cursor-pointer focus:outline-none"
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform`}
                    >
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>

                    <span className="font-extrabold text-[11px] text-white mt-2 block tracking-tight">
                      {cat.title}
                    </span>

                    <span className="text-[9px] text-slate-400 font-medium leading-tight block mt-0.5">
                      {cat.subtitle}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-1">
              <button
                onClick={onGetStarted}
                className="w-full py-4 px-6 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl active:scale-[0.98] transition-all"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                onClick={onSignIn}
                className="w-full py-3.5 px-6 rounded-full bg-[#181924]/60 hover:bg-[#202230]/80 border border-purple-500/60 hover:border-purple-400 text-white font-bold text-sm flex items-center justify-center transition-all active:scale-[0.98] backdrop-blur-md"
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

          {/* Footer Tagline */}
          <div className="text-center">
            <p className="text-xs font-semibold text-slate-300 tracking-wide">
              Your City. Your{' '}
              <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent font-extrabold">
                VYBE.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
