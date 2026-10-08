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
  Plus,
  Compass,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { VYBE_DATA } from '../data/vybeData';

export function BookingsTab({ bookings, onSelectHotel }) {
  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center py-24 space-y-4 max-w-md mx-auto text-slate-900">
        <div className="w-20 h-20 rounded-3xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center mx-auto shadow-sm">
          <Calendar className="w-10 h-10" />
        </div>
        <h3 className="font-extrabold text-2xl text-slate-900 tracking-tight">No active bookings yet</h3>
        <p className="text-sm text-slate-500 leading-relaxed">
          Explore Uyo's top luxury stays, resorts, and city apartments to reserve your first verified experience.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-28 text-slate-900 max-w-4xl mx-auto px-4">
      <div className="border-b border-slate-200 pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-purple-600 block">
            Verified Passes
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">My Reservations</h2>
        </div>
        <span className="px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold">
          {bookings.length} {bookings.length === 1 ? 'Stay' : 'Stays'}
        </span>
      </div>

      <div className="space-y-4">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="rounded-3xl p-6 border border-slate-200 bg-white shadow-sm space-y-4 hover:border-purple-300 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-black tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                  {b.id}
                </span>
                <h4 className="font-black text-xl text-slate-900 mt-2">{b.hotel?.name || 'Verified Stay'}</h4>
                <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-purple-600" />
                  {b.hotel?.address || 'Uyo, Akwa Ibom State'}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Confirmed</span>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 block font-semibold uppercase">Dates</span>
                <span className="font-bold text-slate-900">{b.stayDates?.checkIn || b.stayDates?.checkInDate || 'Fri, 10 Oct 2025'}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block font-semibold uppercase">Room Reserved</span>
                <span className="font-bold text-slate-900">{b.room?.title || 'Deluxe Suite'}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block font-semibold uppercase">Total Paid</span>
                <span className="font-black text-purple-600 text-sm">₦{b.totalAmount ? b.totalAmount.toLocaleString() : '47,250'}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-xs text-slate-500">
                Front desk check-in code active • Contact: +234 803 123 4567
              </span>
              <button
                onClick={() => onSelectHotel && b.hotel && onSelectHotel(b.hotel)}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1"
              >
                <span>View Stay Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
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
    <div className="space-y-8 pb-28 text-slate-900 max-w-4xl mx-auto px-4">
      <div className="border-b border-slate-200 pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-purple-600 block">
            Wishlist
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">Saved Places</h2>
        </div>
        <span className="px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold">
          {savedHotels.length} {savedHotels.length === 1 ? 'Place' : 'Places'}
        </span>
      </div>

      {savedHotels.length === 0 ? (
        <div className="text-center py-24 space-y-4">
          <div className="w-20 h-20 rounded-3xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center mx-auto shadow-sm">
            <Heart className="w-10 h-10" />
          </div>
          <h3 className="font-bold text-2xl text-slate-900 tracking-tight">Your wishlist is empty</h3>
          <p className="text-sm text-slate-500">
            Tap the heart icon on any place to save it for quick access later.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {savedHotels.map((hotel) => (
            <div
              key={hotel.id}
              onClick={() => onSelectHotel(hotel)}
              className="rounded-3xl p-4 border border-slate-200 bg-white shadow-sm flex gap-4 cursor-pointer hover:border-purple-300 hover:shadow-md transition-all group"
            >
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-28 h-28 rounded-2xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-2xs"
              />
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-black uppercase text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                    {hotel.badge}
                  </span>
                  <h4 className="font-extrabold text-base text-slate-900 group-hover:text-purple-600 transition-colors truncate mt-1">
                    {hotel.name}
                  </h4>
                  <p className="text-xs text-slate-500 truncate mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-purple-600 flex-shrink-0" />
                    <span>{hotel.address}</span>
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-sm font-black text-slate-900">
                    ₦{hotel.pricePerNight.toLocaleString()}
                    <span className="text-[10px] text-slate-400 font-normal"> / nt</span>
                  </span>
                  <span className="text-xs font-bold text-purple-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    View Suite →
                  </span>
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
    <div className="space-y-8 pb-28 text-slate-900 max-w-2xl mx-auto px-4">
      {/* Profile Header */}
      <div className="rounded-3xl p-6 border border-slate-200 bg-white shadow-sm flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-black text-2xl flex items-center justify-center shadow-md">
          {user?.name?.[0] || 'D'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-black text-xl text-slate-900 tracking-tight truncate">{user?.name || 'Daniel Udoh'}</h3>
            <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
              Verified Explorer
            </span>
          </div>
          <p className="text-xs text-slate-500 truncate mt-0.5">{user?.email || 'daniel@vybe.ng'}</p>
          <span className="text-xs text-purple-600 font-semibold block mt-1">Uyo Resident • Akwa Ibom State</span>
        </div>
      </div>

      {/* VYBE Wallet Card */}
      <div className="rounded-3xl bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-950 text-white p-8 space-y-5 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold tracking-wider uppercase text-purple-300">
            VYBE Wallet & Rewards
          </span>
          <CreditCard className="w-6 h-6 text-purple-300" />
        </div>
        <div>
          <span className="text-4xl font-black text-white">₦12,500.00</span>
          <span className="text-xs text-purple-200 block mt-1">Available Cashback & Local Booking Credit</span>
        </div>
        <div className="flex gap-3 pt-2">
          <button className="flex-1 py-2.5 rounded-full bg-white text-slate-950 text-xs font-bold hover:bg-slate-100 transition-all shadow-md">
            Top Up Balance
          </button>
          <button className="flex-1 py-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold backdrop-blur-md transition-all">
            Redeem Points
          </button>
        </div>
      </div>

      {/* Business Onboarding Prompt */}
      <div className="rounded-3xl p-6 border border-purple-200 bg-purple-50/40 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-slate-900">List Your Hotel or Business</h4>
            <p className="text-xs text-slate-500">Reach verified explorers across Uyo</p>
          </div>
        </div>
        <button
          onClick={() => setShowBusinessModal(true)}
          className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs active:scale-95 transition-all"
        >
          Partner
        </button>
      </div>

      {/* Settings List */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm divide-y divide-slate-100 overflow-hidden text-xs font-semibold text-slate-700">
        <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <User className="w-4 h-4 text-purple-600" />
            <span>Account Details & Verified KYC</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <Settings className="w-4 h-4 text-purple-600" />
            <span>Currency & Region (NGN ₦ • Nigeria)</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={onLogout}
          className="w-full p-4 flex items-center justify-between hover:bg-rose-50 text-rose-600 transition-colors"
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">List on VYBE</h3>
            <p className="text-xs text-slate-500">
              Submit your hotel, restaurant, or lounge in Uyo for review by our local team.
            </p>
            <input
              type="text"
              placeholder="Business Name"
              className="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs outline-none focus:border-purple-600"
            />
            <input
              type="tel"
              placeholder="Manager Phone (+234)"
              className="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs outline-none focus:border-purple-600"
            />
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowBusinessModal(false)}
                className="flex-1 py-3 rounded-full bg-slate-100 text-xs font-bold text-slate-700 hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Thank you! Our Uyo verification team will contact you within 24 hours.');
                  setShowBusinessModal(false);
                }}
                className="flex-1 py-3 rounded-full bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 shadow-md"
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
