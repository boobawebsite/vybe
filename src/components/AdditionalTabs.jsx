import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  User,
  Heart,
  Settings,
  HelpCircle,
  LogOut,
  CreditCard,
  Building2,
  Plus
} from 'lucide-react';
import { VYBE_DATA } from '../data/vybeData';

export function BookingsTab({ bookings, onSelectHotel }) {
  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center py-24 space-y-4 max-w-md mx-auto text-white">
        <div className="w-20 h-20 rounded-3xl bg-[#161617] border border-white/10 text-purple-400 flex items-center justify-center mx-auto shadow-2xl">
          <Calendar className="w-10 h-10" />
        </div>
        <h3 className="font-extrabold text-2xl text-white">No active bookings yet</h3>
        <p className="text-sm text-slate-400 leading-relaxed">
          Explore Uyo's top hotels, restaurants, and events to reserve your first verified experience.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-28 text-white max-w-3xl mx-auto px-4">
      <div className="border-b border-white/10 pb-6">
        <span className="apple-eyebrow text-purple-400">Verified Passes</span>
        <h2 className="text-3xl font-black text-white tracking-tight mt-1">My Bookings</h2>
      </div>

      <div className="space-y-4">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="apple-tile p-6 border border-white/10 bg-[#161617] space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-black tracking-wider text-purple-300 bg-purple-950/80 px-3 py-1 rounded-full border border-purple-500/30">
                  {b.id}
                </span>
                <h4 className="font-black text-xl text-white mt-2">{b.hotel.name}</h4>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-purple-400" />
                  {b.hotel.address}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                Confirmed
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/5 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold uppercase">Dates</span>
                <span className="font-bold text-white">{b.stayDates.checkIn}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold uppercase">Total Paid</span>
                <span className="font-black text-purple-400 text-sm">₦{b.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SavedTab({ savedIds, onSelectHotel }) {
  const savedHotels = VYBE_DATA.hotels.filter((h) => savedIds.includes(h.id));

  return (
    <div className="space-y-8 pb-28 text-white max-w-3xl mx-auto px-4">
      <div className="border-b border-white/10 pb-6">
        <span className="apple-eyebrow text-purple-400">Wishlist</span>
        <h2 className="text-3xl font-black text-white tracking-tight mt-1">Saved Places</h2>
      </div>

      {savedHotels.length === 0 ? (
        <div className="text-center py-24 space-y-4">
          <div className="w-20 h-20 rounded-3xl bg-[#161617] border border-white/10 text-purple-400 flex items-center justify-center mx-auto">
            <Heart className="w-10 h-10" />
          </div>
          <h3 className="font-bold text-2xl text-white">Your wishlist is empty</h3>
          <p className="text-sm text-slate-400">
            Tap the heart icon on any place to save it for quick access later.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {savedHotels.map((hotel) => (
            <div
              key={hotel.id}
              onClick={() => onSelectHotel(hotel)}
              className="apple-tile p-4 border border-white/10 bg-[#161617] flex gap-4 cursor-pointer hover:border-white/20 transition-all group"
            >
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-24 h-24 rounded-2xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-base text-white group-hover:text-purple-300 truncate">
                    {hotel.name}
                  </h4>
                  <p className="text-xs text-slate-400 truncate mt-1">{hotel.address}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <span className="text-sm font-black text-white">
                    ₦{hotel.pricePerNight.toLocaleString()}/night
                  </span>
                  <span className="apple-link text-xs">View Suite →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function ProfileTab({ user, onLogout }) {
  const [showBusinessModal, setShowBusinessModal] = useState(false);

  return (
    <div className="space-y-8 pb-28 text-white max-w-2xl mx-auto px-4">
      {/* Profile Header */}
      <div className="apple-tile p-6 border border-white/10 bg-[#161617] flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-black text-2xl flex items-center justify-center shadow-lg">
          {user?.name?.[0] || 'D'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-black text-xl text-white truncate">{user?.name || 'Daniel Udoh'}</h3>
            <span className="text-[10px] font-bold text-purple-300 bg-purple-950/80 px-2.5 py-0.5 rounded-full border border-purple-500/30">
              Verified
            </span>
          </div>
          <p className="text-xs text-slate-400 truncate mt-0.5">{user?.email || 'daniel@vybe.ng'}</p>
          <span className="text-xs text-purple-400 font-semibold block mt-1">Uyo Resident • Akwa Ibom</span>
        </div>
      </div>

      {/* VYBE Wallet Card */}
      <div className="rounded-[32px] bg-gradient-to-br from-purple-900/60 via-[#1c1c1e] to-black border border-purple-500/30 p-8 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <span className="apple-eyebrow text-purple-300">VYBE Wallet & Rewards</span>
          <CreditCard className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <span className="text-4xl font-black text-white">₦12,500.00</span>
          <span className="text-xs text-slate-400 block mt-1">Available Cashback & Local Booking Credit</span>
        </div>
        <div className="flex gap-3 pt-2">
          <button className="apple-btn-primary flex-1 text-xs py-2.5 font-bold">
            Top Up Balance
          </button>
          <button className="apple-btn-purple flex-1 text-xs py-2.5 font-bold">
            Redeem Points
          </button>
        </div>
      </div>

      {/* Business Onboarding Prompt */}
      <div className="apple-tile p-6 border border-purple-500/30 bg-[#161617] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-950/80 border border-purple-500/30 text-purple-400 flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-white">List Your Hotel or Business</h4>
            <p className="text-xs text-slate-400">Reach verified explorers across Uyo</p>
          </div>
        </div>
        <button
          onClick={() => setShowBusinessModal(true)}
          className="apple-btn-purple text-xs py-2 px-5 font-bold"
        >
          Partner
        </button>
      </div>

      {/* Settings List */}
      <div className="apple-tile border border-white/10 bg-[#161617] divide-y divide-white/5 overflow-hidden text-xs font-semibold text-slate-300">
        <button className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
          <div className="flex items-center gap-3">
            <User className="w-4 h-4 text-purple-400" />
            <span>Account Details & Verified KYC</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </button>

        <button className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
          <div className="flex items-center gap-3">
            <Settings className="w-4 h-4 text-purple-400" />
            <span>Currency & Region (NGN ₦ • Nigeria)</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </button>

        <button
          onClick={onLogout}
          className="w-full p-4 flex items-center justify-between hover:bg-rose-950/20 text-rose-400 transition-colors"
        >
          <div className="flex items-center gap-3">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </div>
          <ChevronRight className="w-4 h-4 text-rose-500" />
        </button>
      </div>

      {/* Business Modal Popup */}
      {showBusinessModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161617] border border-white/15 rounded-[32px] p-8 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-2xl font-black text-white">List on VYBE</h3>
            <p className="text-xs text-slate-400">
              Submit your hotel, restaurant, or lounge in Uyo for review by our local team.
            </p>
            <input
              type="text"
              placeholder="Business Name"
              className="w-full p-3.5 rounded-2xl bg-white/5 border border-white/10 text-white text-xs outline-none"
            />
            <input
              type="tel"
              placeholder="Manager Phone (+234)"
              className="w-full p-3.5 rounded-2xl bg-white/5 border border-white/10 text-white text-xs outline-none"
            />
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowBusinessModal(false)}
                className="flex-1 py-3 rounded-full bg-white/10 text-xs font-bold text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Thank you! Our Uyo verification team will contact you within 24 hours.');
                  setShowBusinessModal(false);
                }}
                className="apple-btn-purple flex-1 py-3 text-xs font-bold"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
