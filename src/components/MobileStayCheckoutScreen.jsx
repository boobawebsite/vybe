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
  ChevronRight,
  Edit2
} from 'lucide-react';

export default function MobileStayCheckoutScreen({
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

  const roomRate = room ? room.price : 45000;
  const taxesFee = 2250;
  const totalAmount = roomRate + taxesFee;

  return (
    <div className="min-h-screen bg-[#f8f9fc] pb-28 text-slate-900 font-sans">
      {/* 1. TOP HEADER WITH STEPPER (Exact match of image 2) */}
      <div className="bg-white px-4 pt-3 pb-4 border-b border-slate-100 flex items-center justify-between sticky top-0 z-30">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-700 active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* VYBE Logo */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <span className="text-xl font-black tracking-tight text-slate-900 font-display">
              VYBE
            </span>
          </div>
        </div>

        {/* 1 Details - 2 Payment - 3 Confirm Stepper */}
        <div className="flex items-center gap-2 text-[10px]">
          <div className="flex flex-col items-center">
            <div className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-[10px]">
              1
            </div>
            <span className="text-[9px] font-bold text-purple-600 mt-0.5">Details</span>
          </div>
          <div className="w-4 h-0.5 bg-slate-200" />
          <div className="flex flex-col items-center">
            <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-[10px]">
              2
            </div>
            <span className="text-[9px] font-medium text-slate-400 mt-0.5">Payment</span>
          </div>
          <div className="w-4 h-0.5 bg-slate-200" />
          <div className="flex flex-col items-center">
            <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-[10px]">
              3
            </div>
            <span className="text-[9px] font-medium text-slate-400 mt-0.5">Confirm</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 max-w-lg mx-auto">
        {/* 2. HOTEL SUMMARY MINI CARD */}
        <div className="bg-white p-3.5 rounded-3xl border border-slate-200/80 shadow-xs flex gap-3.5">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-24 h-20 rounded-2xl object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 truncate">{hotel.name}</h3>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                <span className="text-amber-400">★</span>
                <span className="font-bold text-slate-800">{hotel.rating}</span>
                <span>({hotel.reviewsCount} reviews)</span>
              </div>
              <p className="text-[11px] text-slate-500 truncate flex items-center gap-1 mt-0.5">
                <span className="text-purple-600">📍</span>
                {hotel.address}
              </p>
            </div>

            <div className="flex items-center gap-3 text-[10px] text-slate-600 font-semibold pt-1 border-t border-slate-100">
              <span>🛏️ {room ? room.title : 'Deluxe Room'}</span>
              <span>👥 {stayDates.guests}</span>
              <span>📐 32 m²</span>
            </div>
          </div>
        </div>

        {/* 3. STAY DETAILS BOX */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-extrabold text-slate-900">Stay Details</h4>
            <button className="flex items-center gap-1 text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-xl">
              <Edit2 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-1">
                <Calendar className="w-3.5 h-3.5 text-purple-600" />
                <span>Check In</span>
              </div>
              <div className="font-bold text-xs text-slate-900">{stayDates.checkInDate}</div>
              <div className="text-[10px] text-slate-400">{stayDates.checkInTime}</div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-1">
                <Calendar className="w-3.5 h-3.5 text-purple-600" />
                <span>Check Out</span>
              </div>
              <div className="font-bold text-xs text-slate-900">{stayDates.checkOutDate}</div>
              <div className="text-[10px] text-slate-400">{stayDates.checkOutTime}</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
            <div className="flex items-center gap-2 text-slate-700 font-semibold">
              <Users className="w-4 h-4 text-purple-600" />
              <span>Guests</span>
            </div>
            <span className="font-bold text-slate-900">{stayDates.guests} ›</span>
          </div>
        </div>

        {/* 4. PRICE SUMMARY (Exact values: ₦45,000 + ₦0 + ₦2,250 = ₦47,250) */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-2.5">
          <h4 className="text-base font-extrabold text-slate-900">Price Summary</h4>
          <div className="flex justify-between text-xs text-slate-600">
            <span>Room Rate ({stayDates.nights} night)</span>
            <span className="font-bold text-slate-900">₦{roomRate.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-xs text-slate-600">
            <span>Guests ({stayDates.guests})</span>
            <span className="font-bold text-slate-900">₦0</span>
          </div>
          <div className="flex justify-between text-xs text-slate-600">
            <span>Taxes & Service Fee</span>
            <span className="font-bold text-slate-900">₦{taxesFee.toLocaleString()}</span>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
            <span className="font-extrabold text-sm text-slate-900">Total Amount</span>
            <span className="font-black text-xl text-slate-900">
              ₦{totalAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* 5. PAYMENT METHOD SELECTOR */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
          <h4 className="text-base font-extrabold text-slate-900">Payment Method</h4>

          <div className="space-y-2">
            {[
              {
                id: 'card',
                title: 'Card Payment',
                subtitle: 'Visa, Mastercard, Verve',
                icon: CreditCard,
              },
              {
                id: 'bank',
                title: 'Bank Transfer',
                subtitle: 'Pay directly from your bank',
                icon: Building,
              },
              {
                id: 'wallet',
                title: 'Wallet Payment',
                subtitle: 'Pay with your VYBE Wallet (₦12,500)',
                icon: Smartphone,
              },
            ].map((method) => {
              const Icon = method.icon;
              const isSelected = paymentMethod === method.id;
              return (
                <div
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-purple-600 bg-purple-50/40 ring-1 ring-purple-600'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-purple-600' : 'border-slate-300'
                      }`}
                    >
                      {isSelected && (
                        <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                      )}
                    </div>
                    <Icon className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="font-bold text-xs text-slate-900">{method.title}</div>
                      <div className="text-[10px] text-slate-500">{method.subtitle}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              );
            })}
          </div>

          {/* Bank-level encryption badge */}
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-purple-50/50 text-[11px] text-purple-900 font-medium">
            <ShieldCheck className="w-4 h-4 text-purple-600 flex-shrink-0" />
            <span>Your payment is secure and protected with bank-level encryption.</span>
          </div>
        </div>

        {/* 6. PROCEED TO PAYMENT ACTION BUTTON */}
        <button
          onClick={() => onProceedToPayment({
            hotel,
            room: room || hotel.rooms[0],
            stayDates,
            totalAmount,
            paymentMethod
          })}
          className="w-full py-4 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 active:scale-98 transition-all"
        >
          <span>Proceed to Payment</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
