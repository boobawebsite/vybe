import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Users,
  Check,
  CreditCard,
  Building,
  Smartphone,
  ShieldCheck,
  Star,
  MapPin,
  ChevronRight,
  Clock,
  Lock,
  Sparkles,
  Info
} from 'lucide-react';

export default function VisionProCheckout({
  hotel,
  room,
  onBack,
  onProceedToPayment
}) {
  const [stayDates, setStayDates] = useState({
    checkInDate: 'Fri, 10 Oct 2025',
    checkInTime: '2:00 PM',
    checkOutDate: 'Sat, 11 Oct 2025',
    checkOutTime: '12:00 PM',
    nights: 1,
    guests: '2 Adults',
  });

  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'bank' | 'wallet'
  const [isProcessing, setIsProcessing] = useState(false);

  const activeRoom = room || (hotel && hotel.rooms ? hotel.rooms[0] : {
    title: 'Deluxe Room',
    price: 45000,
    guests: 2,
    size: '32 m²',
    bed: '1 King Bed'
  });

  const roomRate = activeRoom.price || 45000;
  const taxesFee = 2250;
  const totalAmount = roomRate + taxesFee;

  const handleProceed = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onProceedToPayment({
        hotel,
        room: activeRoom,
        stayDates,
        totalAmount,
        paymentMethod
      });
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] font-sans pb-24">
      {/* 1. TOP BREADCRUMB & BACK ACTION */}
      <div className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#86868b] hover:text-[#1d1d1f] transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to {hotel?.name || 'Property'}</span>
          </button>

          {/* Apple-style Step Timeline */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-purple-600">
              <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[11px] flex items-center justify-center font-bold">
                1
              </span>
              <span>Stay Details</span>
            </div>
            <span className="text-slate-300">/</span>
            <div className="flex items-center gap-1.5 font-medium text-slate-400">
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 text-[11px] flex items-center justify-center">
                2
              </span>
              <span>Payment</span>
            </div>
            <span className="text-slate-300">/</span>
            <div className="flex items-center gap-1.5 font-medium text-slate-400">
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 text-[11px] flex items-center justify-center">
                3
              </span>
              <span>Confirmation</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. HEADER BANNER */}
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
            Reservation & Checkout
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#1d1d1f] tracking-tight">
            Review your stay at {hotel?.name || 'Motion Hotel'}.
          </h1>
          <p className="text-sm text-[#86868b] max-w-2xl">
            Confirm your dates, select your preferred payment method, and complete your reservation. Your verified front-desk QR pass will be issued immediately.
          </p>
        </div>
      </div>

      {/* 3. MAIN TWO-COLUMN SPLIT GRID */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Property Summary, Stay Details, Payment Method, Guest Info */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: Property & Selected Room */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs flex flex-col sm:flex-row gap-5 items-center sm:items-start">
            <img
              src={hotel?.image || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'}
              alt={hotel?.name}
              className="w-full sm:w-44 h-36 rounded-2xl object-cover flex-shrink-0 shadow-xs"
            />
            <div className="flex-1 min-w-0 space-y-2 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold border border-purple-200">
                  VYBE Verified Luxury
                </span>
                <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{hotel?.rating || '4.9'}</span>
                  <span className="text-slate-400 font-normal">({hotel?.reviewsCount || '128'} reviews)</span>
                </div>
              </div>

              <h2 className="text-xl font-extrabold text-[#1d1d1f] tracking-tight">
                {hotel?.name || 'Motion Hotel'}
              </h2>

              <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-1">
                <MapPin className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                <span>{hotel?.address || 'Udo Udoma Avenue, Uyo, Akwa Ibom State'}</span>
              </p>

              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-600 font-medium">
                <span className="bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-100 font-semibold text-slate-800">
                  🛏️ {activeRoom.title || 'Deluxe Room'}
                </span>
                <span>👥 {stayDates.guests}</span>
                <span>📐 {activeRoom.size || '32 m²'}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Stay Dates & Occupancy */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-base font-extrabold text-[#1d1d1f]">Stay Details</h3>
                <p className="text-xs text-slate-400">Scheduled arrival and departure</p>
              </div>
              <button className="text-xs font-bold text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-xl transition-colors">
                Edit Dates
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl bg-[#fbfbfd] border border-slate-100 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-purple-600" />
                  <span>Check In</span>
                </div>
                <div className="text-sm font-bold text-slate-900">{stayDates.checkInDate}</div>
                <div className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>From {stayDates.checkInTime}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#fbfbfd] border border-slate-100 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-purple-600" />
                  <span>Check Out</span>
                </div>
                <div className="text-sm font-bold text-slate-900">{stayDates.checkOutDate}</div>
                <div className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Until {stayDates.checkOutTime}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#fbfbfd] border border-slate-100 text-xs">
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <Users className="w-4 h-4 text-purple-600" />
                <span>Occupancy</span>
              </div>
              <span className="font-bold text-slate-900">{stayDates.guests} • {stayDates.nights} Night</span>
            </div>
          </div>

          {/* Card 3: Payment Method Selection */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <div className="space-y-0.5">
              <h3 className="text-base font-extrabold text-[#1d1d1f]">Payment Method</h3>
              <p className="text-xs text-slate-400">Select how you want to pay</p>
            </div>

            <div className="space-y-2.5">
              {[
                {
                  id: 'card',
                  title: 'Debit / Credit Card',
                  subtitle: 'Visa, Mastercard, and Verve supported',
                  icon: CreditCard,
                  badge: 'Instant Confirmation'
                },
                {
                  id: 'bank',
                  title: 'Direct Bank Transfer',
                  subtitle: 'Transfer directly to secure VYBE escrow account',
                  icon: Building,
                  badge: 'Instant Automated Receipt'
                },
                {
                  id: 'wallet',
                  title: 'VYBE Wallet Payment',
                  subtitle: 'Pay directly with your wallet balance (₦12,500)',
                  icon: Smartphone,
                  badge: 'Zero Fees'
                },
              ].map((method) => {
                const Icon = method.icon;
                const isSelected = paymentMethod === method.id;
                return (
                  <div
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-purple-600 bg-purple-50/40 ring-1 ring-purple-600'
                        : 'border-slate-200/80 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-purple-600' : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />}
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-purple-600">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900">{method.title}</div>
                        <div className="text-[11px] text-slate-400">{method.subtitle}</div>
                      </div>
                    </div>

                    <span className="hidden sm:inline-block text-[10px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
                      {method.badge}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Bank-level Encryption Note */}
            <div className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100 flex items-center gap-3 text-xs text-purple-950 font-medium">
              <ShieldCheck className="w-4 h-4 text-purple-600 flex-shrink-0" />
              <span>Payments are encrypted with 256-bit SSL and protected by Central Bank of Nigeria compliant payment processors.</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sticky Order & Price Summary (Apple Store / Vision Pro Style) */}
        <div className="lg:col-span-5 sticky top-20 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-5">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                Order Summary
              </span>
              <h3 className="text-xl font-black text-[#1d1d1f]">
                Price Summary
              </h3>
            </div>

            {/* Exact Breakdown matching boss's figures */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span>Room Rate ({stayDates.nights} night)</span>
                <span className="font-bold text-slate-900">₦{roomRate.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Guests ({stayDates.guests})</span>
                <span className="font-bold text-slate-900">₦0</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Taxes & Service Fee (5%)</span>
                <span className="font-bold text-slate-900">₦{taxesFee.toLocaleString()}</span>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                <div>
                  <span className="font-extrabold text-sm text-[#1d1d1f] block">Total Amount</span>
                  <span className="text-[10px] text-slate-400 font-normal">Includes all taxes & fees</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-[#1d1d1f] tracking-tight">
                    ₦{totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleProceed}
              disabled={isProcessing}
              className="w-full py-4 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm shadow-md shadow-purple-600/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-60"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing Reservation...</span>
                </div>
              ) : (
                <>
                  <span>Proceed to Payment</span>
                  <span>→</span>
                </>
              )}
            </button>

            {/* Microcopy & Guarantees */}
            <div className="space-y-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Instant front-desk QR confirmation pass upon checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Free cancellation up to 24 hours prior to check-in</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                <span>Official VYBE Best Rate Guarantee in Uyo</span>
              </div>
            </div>
          </div>

          {/* Need Assistance Card */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/70 text-xs text-slate-600 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Info className="w-4 h-4 text-purple-600" />
              <span>Need help with this reservation?</span>
            </div>
            <a
              href={`tel:${hotel?.phone || '08031234567'}`}
              className="font-bold text-purple-600 hover:underline"
            >
              Call Hotel
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
