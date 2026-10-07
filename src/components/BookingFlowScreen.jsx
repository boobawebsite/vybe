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
  Tag,
  ArrowRight,
  Plus,
  CheckCircle2
} from 'lucide-react';

export default function BookingFlowScreen({
  hotel,
  room,
  onBack,
  onBookingSuccess
}) {
  const [step, setStep] = useState(1); // 1: Details & Add-ons, 2: Payment & Confirm
  const [stayDates, setStayDates] = useState({
    checkIn: 'Fri, 10 Oct 2025',
    checkOut: 'Sat, 11 Oct 2025',
    nights: 1,
    guests: 2,
  });

  const [addons, setAddons] = useState({
    breakfast: true, // ₦10,000 (for 2)
    airportPickup: false, // ₦15,000
    lateCheckout: false, // ₦10,000
    specialRequest: false,
  });

  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'bank' | 'wallet'
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculations
  const baseRoomTotal = room.price * stayDates.nights;
  const breakfastTotal = addons.breakfast ? 10000 : 0;
  const pickupTotal = addons.airportPickup ? 15000 : 0;
  const lateCheckoutTotal = addons.lateCheckout ? 10000 : 0;
  const taxesFees = Math.round(baseRoomTotal * 0.05); // 5%
  const discount = promoApplied ? 5000 : 0;

  const totalAmount = baseRoomTotal + breakfastTotal + pickupTotal + lateCheckoutTotal + taxesFees - discount;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onBookingSuccess({
        id: 'VYBE-' + Math.floor(100000 + Math.random() * 900000),
        hotel,
        room,
        stayDates,
        addons,
        totalAmount,
        paymentMethod,
        date: new Date().toLocaleDateString(),
      });
    }, 1500);
  };

  return (
    <div className="space-y-5 pb-28 text-slate-900">
      {/* Top Header with Multi-Step Stepper */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="text-center">
            <h2 className="text-base font-extrabold text-slate-900">
              {step === 1 ? 'Stay Details & Services' : 'Complete Your Booking'}
            </h2>
            <span className="text-[11px] text-slate-400">Step {step} of 2</span>
          </div>
          <div className="w-9" />
        </div>

        {/* Stepper Progress Bar */}
        <div className="flex items-center justify-between max-w-xs mx-auto">
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              step >= 1 ? 'bg-purple-600 text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              1
            </div>
            <span className="text-xs font-semibold text-slate-800">Details</span>
          </div>

          <div className={`flex-1 h-0.5 mx-3 ${step >= 2 ? 'bg-purple-600' : 'bg-slate-200'}`} />

          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              step === 2 ? 'bg-purple-600 text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              2
            </div>
            <span className="text-xs font-semibold text-slate-800">Payment</span>
          </div>
        </div>
      </div>

      {/* Hotel Summary Card */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs flex gap-3.5">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-20 h-20 rounded-2xl object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="font-bold text-sm text-slate-900 truncate">{hotel.name}</h3>
            {hotel.isVerified && (
              <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200 flex-shrink-0">
                Verified
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 truncate mt-0.5">{hotel.address}</p>
          <div className="flex items-center gap-2 text-xs text-slate-700 mt-2 font-medium">
            <span className="bg-slate-100 px-2 py-0.5 rounded-lg">{room.title}</span>
            <span>•</span>
            <span>{room.bed}</span>
          </div>
        </div>
      </div>

      {step === 1 ? (
        /* STEP 1: Stay Details, Dates & Add-on Services */
        <div className="space-y-4">
          {/* Stay Dates Box */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900">Stay Dates & Guests</h4>
              <button className="text-xs font-bold text-purple-600 hover:underline">Edit</button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-purple-600" />
                  <span>Check In</span>
                </div>
                <div className="font-bold text-xs text-slate-900">{stayDates.checkIn}</div>
                <div className="text-[10px] text-slate-500">2:00 PM</div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-purple-600" />
                  <span>Check Out</span>
                </div>
                <div className="font-bold text-xs text-slate-900">{stayDates.checkOut}</div>
                <div className="text-[10px] text-slate-500">12:00 PM</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <Users className="w-4 h-4 text-purple-600" />
                <span>{stayDates.guests} Adults • {stayDates.nights} Night</span>
              </div>
              <span className="text-xs font-bold text-purple-600">Standard Occupancy</span>
            </div>
          </div>

          {/* Add-on Services Section */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900">Add Extra Services (Optional)</h4>
              <span className="text-xs text-slate-400 font-medium">Customize your stay</span>
            </div>

            <div className="space-y-2.5">
              {[
                {
                  key: 'breakfast',
                  name: 'Full English / Nigerian Breakfast',
                  detail: 'For 2 guests daily',
                  price: 10000,
                },
                {
                  key: 'airportPickup',
                  name: 'Victor Attah Airport Pickup',
                  detail: 'Private executive sedan',
                  price: 15000,
                },
                {
                  key: 'lateCheckout',
                  name: 'Late Check-out (until 4:00 PM)',
                  detail: 'Subject to room availability',
                  price: 10000,
                },
              ].map((serv) => (
                <div
                  key={serv.key}
                  onClick={() => setAddons({ ...addons, [serv.key]: !addons[serv.key] })}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    addons[serv.key]
                      ? 'border-purple-600 bg-purple-50/50'
                      : 'border-slate-200/80 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                        addons[serv.key] ? 'bg-purple-600 border-purple-600 text-white' : 'border-slate-300'
                      }`}
                    >
                      {addons[serv.key] && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900">{serv.name}</div>
                      <div className="text-[10px] text-slate-500">{serv.detail}</div>
                    </div>
                  </div>
                  <div className="font-bold text-xs text-slate-900">
                    +₦{serv.price.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full py-4 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md shadow-purple-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <span>Continue to Payment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        /* STEP 2: Payment Method, Promo Code & Final Breakdown */
        <div className="space-y-4">
          {/* Promo Code Input */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200/80 flex gap-2">
            <div className="relative flex-1">
              <Tag className="w-4 h-4 absolute inset-y-0 left-3 my-auto text-slate-400" />
              <input
                type="text"
                placeholder="Enter promo code (try VYBE5)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs uppercase font-semibold outline-none focus:border-purple-600"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                if (promoCode.trim().toUpperCase() === 'VYBE5') {
                  setPromoApplied(true);
                }
              }}
              className="px-4 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 transition-all"
            >
              Apply
            </button>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200/80 space-y-3">
            <h4 className="text-sm font-bold text-slate-900">Select Payment Method</h4>

            <div className="space-y-2">
              {[
                {
                  id: 'card',
                  title: 'Pay with Card',
                  subtitle: 'Visa, Mastercard, Verve',
                  icon: CreditCard,
                },
                {
                  id: 'bank',
                  title: 'Bank Transfer',
                  subtitle: 'Transfer directly to VYBE account',
                  icon: Building,
                },
                {
                  id: 'wallet',
                  title: 'VYBE Wallet',
                  subtitle: 'Pay with your VYBE Wallet (₦12,500 balance)',
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
                        ? 'border-purple-600 bg-purple-50/50 ring-1 ring-purple-600'
                        : 'border-slate-200/80 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-purple-600 bg-purple-600' : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <Icon className="w-4 h-4 text-purple-600" />
                      <div>
                        <div className="font-bold text-xs text-slate-900">{method.title}</div>
                        <div className="text-[10px] text-slate-500">{method.subtitle}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Price Breakdown Summary */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200/80 space-y-2.5">
            <h4 className="text-sm font-bold text-slate-900">Price Summary</h4>
            <div className="flex justify-between text-xs text-slate-600">
              <span>Room Rate ({stayDates.nights} night)</span>
              <span>₦{baseRoomTotal.toLocaleString()}</span>
            </div>
            {addons.breakfast && (
              <div className="flex justify-between text-xs text-slate-600">
                <span>Breakfast (2 people)</span>
                <span>₦{breakfastTotal.toLocaleString()}</span>
              </div>
            )}
            {addons.airportPickup && (
              <div className="flex justify-between text-xs text-slate-600">
                <span>Airport Pickup</span>
                <span>₦{pickupTotal.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-xs text-slate-600">
              <span>Taxes & Service Fee (5%)</span>
              <span>₦{taxesFees.toLocaleString()}</span>
            </div>
            {promoApplied && (
              <div className="flex justify-between text-xs text-emerald-600 font-semibold">
                <span>Promo Discount</span>
                <span>-₦5,000</span>
              </div>
            )}
            <div className="pt-2 border-t border-slate-100 flex justify-between items-baseline">
              <span className="font-extrabold text-sm text-slate-900">Total Amount</span>
              <span className="font-black text-xl text-purple-600">
                ₦{totalAmount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Bank-level security reassurance */}
          <div className="flex items-center gap-2 text-[11px] text-slate-500 justify-center">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Your payment is secure and protected with bank-level encryption.</span>
          </div>

          {/* Pay Action Button */}
          <button
            onClick={handlePay}
            disabled={isProcessing}
            className="w-full py-4 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-base shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-60"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing Payment...</span>
              </div>
            ) : (
              <>
                <span>Pay ₦{totalAmount.toLocaleString()}</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
