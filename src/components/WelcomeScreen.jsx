import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, CreditCard, Clock, ChevronRight } from 'lucide-react';

export default function WelcomeScreen({ onGetStarted, onSignIn }) {
  return (
    <div className="relative min-h-[92vh] flex flex-col justify-between p-6 overflow-hidden bg-slate-950 text-white rounded-3xl md:rounded-[40px] shadow-2xl">
      {/* Background Hero Image with Deep Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80"
          alt="Luxury Stay in Uyo"
          className="w-full h-full object-cover opacity-60 scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090a10] via-[#090a10]/70 to-[#090a10]/40" />
        <div className="absolute inset-0 bg-radial-at-t from-purple-900/30 via-transparent to-transparent" />
      </div>

      {/* Top Branding Section */}
      <div className="relative z-10 pt-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-black tracking-tight text-white flex items-center gap-1.5 font-display">
              VYBE
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_12px_#a855f7]" />
            </span>
          </div>
          <p className="text-xs uppercase tracking-widest text-purple-300/80 font-medium mt-0.5">
            Discover. Book. Experience.
          </p>
        </div>

        {/* Spatial blur pill indicator */}
        <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-medium text-slate-200">
          Uyo, Akwa Ibom
        </div>
      </div>

      {/* Center Tagline / Vision */}
      <div className="relative z-10 my-auto py-8 max-w-md">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold mb-4 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          More Than Stays • Experiences
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1] mb-3">
          Your City. <br />
          <span className="bg-gradient-to-r from-purple-400 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
            Your VYBE.
          </span>
        </h1>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Hotels, restaurants, events, lounges and stays — all in one unified platform.
        </p>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-4 gap-2.5 mt-6">
          {[
            { label: 'Hotels', desc: 'Book stays', color: 'from-blue-600 to-indigo-600' },
            { label: 'Dining', desc: 'Top spots', color: 'from-amber-600 to-orange-600' },
            { label: 'Events', desc: "What's on", color: 'from-rose-600 to-pink-600' },
            { label: 'Shortlet', desc: 'Apartments', color: 'from-emerald-600 to-teal-600' },
          ].map((cat, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center hover:bg-white/10 transition-all cursor-pointer group"
            >
              <div className={`w-8 h-8 mx-auto rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-xs font-bold shadow-lg mb-1 group-hover:scale-105 transition-transform`}>
                {cat.label[0]}
              </div>
              <span className="text-[11px] font-semibold block text-slate-200">{cat.label}</span>
              <span className="text-[9px] text-slate-400 block">{cat.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action Card with Vision Pro Glass effect */}
      <div className="relative z-10 w-full max-w-md mx-auto space-y-3 pt-4">
        {/* Trust Badges Floating Row */}
        <div className="flex items-center justify-around py-2 px-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-[11px] text-slate-300">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verified Stays</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-600" />
          <div className="flex items-center gap-1.5">
            <CreditCard className="w-3.5 h-3.5 text-purple-400" />
            <span>Instant Pay</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-600" />
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>Real-time</span>
          </div>
        </div>

        {/* Primary Call to Action */}
        <button
          onClick={onGetStarted}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-base shadow-[0_10px_25px_-5px_rgba(124,58,237,0.5)] flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Secondary Sign In */}
        <button
          onClick={onSignIn}
          className="w-full py-3.5 px-6 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm backdrop-blur-xl transition-all active:scale-[0.98]"
        >
          Sign In to Your Account
        </button>

        <p className="text-center text-[11px] text-slate-400 pt-1">
          By proceeding, you agree to VYBE Terms of Service & Privacy.
        </p>
      </div>
    </div>
  );
}
