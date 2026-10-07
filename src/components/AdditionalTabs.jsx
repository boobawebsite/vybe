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
      <div className="text-center py-16 space-y-3">
        <div className="w-16 h-16 rounded-3xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
          <Calendar className="w-8 h-8" />
        </div>
        <h3 className="font-bold text-base text-slate-800">No active bookings yet</h3>
        <p className="text-xs text-slate-500 max-w-xs mx-auto">
          Explore Uyo's top hotels, restaurants, and events to reserve your first experience.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-24">
      <div className="pt-2">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">My Bookings</h2>
        <p className="text-xs text-slate-500">Upcoming stays and verified passes</p>
      </div>

      <div className="space-y-3.5">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-4 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                  {b.id}
                </span>
                <h4 className="font-extrabold text-base text-slate-900 mt-1">{b.hotel.name}</h4>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-purple-600" />
                  {b.hotel.address}
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                Confirmed
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 p-2.5 rounded-2xl bg-slate-50 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">Dates</span>
                <span className="font-bold text-slate-800">{b.stayDates.checkIn}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">Total Paid</span>
                <span className="font-black text-purple-600">₦{b.totalAmount.toLocaleString()}</span>
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
    <div className="space-y-4 pb-24">
      <div className="pt-2">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Saved Places</h2>
        <p className="text-xs text-slate-500">Your favorite hotels, dining spots and experiences</p>
      </div>

      {savedHotels.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-base text-slate-800">Your wishlist is empty</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Tap the heart icon on any place to save it for quick access later.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {savedHotels.map((hotel) => (
            <div
              key={hotel.id}
              onClick={() => onSelectHotel(hotel)}
              className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs flex gap-3.5 cursor-pointer hover:shadow-md transition-all group"
            >
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-20 h-20 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-purple-600 truncate">
                    {hotel.name}
                  </h4>
                  <p className="text-xs text-slate-500 truncate mt-0.5">{hotel.address}</p>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                  <span className="text-xs font-black text-slate-900">
                    ₦{hotel.pricePerNight.toLocaleString()}/night
                  </span>
                  <span className="text-xs font-bold text-purple-600">View →</span>
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
    <div className="space-y-5 pb-24 text-slate-900">
      {/* Profile Header */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-black text-2xl flex items-center justify-center shadow-md">
          {user?.name?.[0] || 'D'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-black text-lg text-slate-900 truncate">{user?.name || 'Daniel Udoh'}</h3>
            <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
              Verified
            </span>
          </div>
          <p className="text-xs text-slate-500 truncate">{user?.email || 'daniel@vybe.ng'}</p>
          <span className="text-[11px] text-purple-600 font-semibold block mt-1">Uyo Resident</span>
        </div>
      </div>

      {/* VYBE Wallet Card */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-700 p-5 rounded-3xl text-white shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-purple-200 font-bold">VYBE Wallet</span>
          <CreditCard className="w-5 h-5 text-purple-300" />
        </div>
        <div>
          <span className="text-2xl font-black">₦12,500.00</span>
          <span className="text-xs text-purple-200 block">Available Rewards & Cashback</span>
        </div>
        <div className="flex gap-2 pt-1">
          <button className="flex-1 py-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-xs font-bold transition-all">
            Top Up
          </button>
          <button className="flex-1 py-2 rounded-xl bg-white text-purple-700 hover:bg-purple-50 text-xs font-bold transition-all">
            Redeem Points
          </button>
        </div>
      </div>

      {/* Business Onboarding Prompt (Matches PRD Section 12) */}
      <div className="p-4 rounded-3xl bg-slate-50 border border-purple-200/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-slate-900">List Your Place or Hotel</h4>
            <p className="text-[10px] text-slate-500">Reach thousands discovering Uyo daily</p>
          </div>
        </div>
        <button
          onClick={() => setShowBusinessModal(true)}
          className="px-3.5 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 transition-all"
        >
          Partner
        </button>
      </div>

      {/* Settings List */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden text-xs font-semibold text-slate-700">
        <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <User className="w-4 h-4 text-purple-600" />
            <span>Account Details & KYC</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <Settings className="w-4 h-4 text-purple-600" />
            <span>Preferences & Currency (NGN ₦)</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-4 h-4 text-purple-600" />
            <span>Help & 24/7 Support</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={onLogout}
          className="w-full p-4 flex items-center justify-between hover:bg-rose-50 text-rose-600 transition-colors"
        >
          <div className="flex items-center gap-3">
            <LogOut className="w-4 h-4 text-rose-600" />
            <span>Sign Out</span>
          </div>
          <ChevronRight className="w-4 h-4 text-rose-400" />
        </button>
      </div>

      {/* Business Modal Popup */}
      {showBusinessModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-black text-slate-900">List on VYBE</h3>
            <p className="text-xs text-slate-500">
              Submit your hotel, restaurant, or event in Uyo for review by our city team.
            </p>
            <input
              type="text"
              placeholder="Business Name"
              className="w-full p-3 rounded-xl border border-slate-200 text-xs"
            />
            <input
              type="tel"
              placeholder="Manager Phone (+234)"
              className="w-full p-3 rounded-xl border border-slate-200 text-xs"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowBusinessModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 text-xs font-bold text-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Thank you! Our Uyo verification team will contact you within 24 hours.');
                  setShowBusinessModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
