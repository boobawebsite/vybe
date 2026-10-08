import React from 'react';
import {
  CheckCircle2,
  Calendar,
  Users,
  MapPin,
  QrCode,
  Download,
  Share2,
  ArrowRight,
  ShieldCheck,
  Building
} from 'lucide-react';

export default function ConfirmationScreen({ booking, onBackToHome, onViewBookings }) {
  return (
    <div className="space-y-5 pb-24 text-slate-900 max-w-md mx-auto">
      {/* Top Success Badge */}
      <div className="text-center pt-4 space-y-2">
        <div className="w-16 h-16 rounded-full bg-emerald-100 border-4 border-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-md animate-bounce">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Booking Confirmed!</h2>
        <p className="text-xs text-slate-500">
          Your reservation is confirmed and verified with the hotel front desk.
        </p>
      </div>

      {/* Digital Pass / Ticket Card with QR Code */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-purple-700 to-indigo-700 p-5 text-white">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-purple-200 font-bold block">
                Booking Reference
              </span>
              <span className="text-lg font-black tracking-wider">{booking.id}</span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold">
              PAID & CONFIRMED
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-xl font-bold">{booking.hotel.name}</h3>
            <p className="text-xs text-purple-200 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-purple-300" />
              {booking.hotel.address}
            </p>
          </div>
        </div>

        {/* Stay Details */}
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Check-in</span>
              <span className="font-bold text-slate-800">{booking.stayDates?.checkIn || booking.stayDates?.checkInDate || 'Fri, 10 Oct 2025'}</span>
              <span className="text-slate-500 block text-[10px]">From {booking.stayDates?.checkInTime || '2:00 PM'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Check-out</span>
              <span className="font-bold text-slate-800">{booking.stayDates?.checkOut || booking.stayDates?.checkOutDate || 'Sat, 11 Oct 2025'}</span>
              <span className="text-slate-500 block text-[10px]">Until {booking.stayDates?.checkOutTime || '12:00 PM'}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Reserved Room</span>
              <span className="font-bold text-slate-800">{booking.room.title}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Paid</span>
              <span className="font-black text-purple-600 text-sm">
                ₦{booking.totalAmount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* QR Code Section for Hotel Front-desk scanning */}
          <div className="pt-4 border-t-2 border-dashed border-slate-200 text-center space-y-2">
            <div className="w-36 h-36 mx-auto p-2.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center">
              <QrCode className="w-full h-full text-slate-900" />
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Present this QR code at front desk for instant contactless check-in
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5">
        <button
          onClick={onViewBookings}
          className="w-full py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md transition-all"
        >
          View in My Bookings
        </button>

        <button
          onClick={onBackToHome}
          className="w-full py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all"
        >
          Back to City Discovery
        </button>
      </div>
    </div>
  );
}
