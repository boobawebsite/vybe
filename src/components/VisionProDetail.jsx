import React, { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  Heart,
  Star,
  MapPin,
  Phone,
  Check,
  ShieldCheck,
  Calendar,
  Users,
  Wifi,
  Car,
  Utensils,
  Waves,
  Dumbbell,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function VisionProDetail({
  hotel,
  onBack,
  onProceedToBooking,
  isSaved,
  onToggleSave
}) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(hotel.rooms[0]);

  return (
    <div className="space-y-10 pb-28 text-slate-900 max-w-6xl mx-auto">
      {/* Back button & Title Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-purple-600 shadow-xs transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Discovery</span>
        </button>

        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-700 hover:text-purple-600">
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onToggleSave(hotel.id)}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-700 hover:text-rose-500"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Hero Media Theater */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[400px] sm:h-[480px]">
        {/* Main Large Image */}
        <div className="lg:col-span-8 relative rounded-[32px] overflow-hidden border border-slate-200 shadow-md">
          <img
            src={hotel.gallery[selectedPhotoIndex] || hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
            <div>
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-600 text-white text-xs font-bold mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>VYBE Verified Luxury</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                {hotel.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-200 flex items-center gap-1.5 mt-1">
                <MapPin className="w-4 h-4 text-purple-300" />
                {hotel.address}
              </p>
            </div>
            <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-xs font-semibold text-white">
              {selectedPhotoIndex + 1}/{hotel.gallery.length} Photos
            </span>
          </div>
        </div>

        {/* Thumbnail Sidebar */}
        <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-3 h-full">
          {hotel.gallery.slice(0, 3).map((img, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedPhotoIndex(idx)}
              className={`relative rounded-2xl overflow-hidden cursor-pointer border-2 transition-all h-28 lg:h-auto ${
                selectedPhotoIndex === idx ? 'border-purple-600 scale-102 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt="Thumb" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* 2-Column Split: Details & Rooms on Left, Booking Checkout Sidebar on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: About, Amenities, Available Rooms, Reviews */}
        <div className="lg:col-span-7 space-y-8">
          {/* About Section */}
          <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xl font-bold text-slate-900">About the Property</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              {hotel.description}
            </p>

            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Key Amenities
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {hotel.amenities.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-800"
                  >
                    <Check className="w-3.5 h-3.5 text-purple-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Room Tiers Selector */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Select Room Type</h3>
              <span className="text-xs text-purple-600 font-bold">{hotel.rooms.length} Available</span>
            </div>

            <div className="space-y-3.5">
              {hotel.rooms.map((room) => {
                const isSelected = selectedRoom.id === room.id;
                return (
                  <div
                    key={room.id}
                    onClick={() => setSelectedRoom(room)}
                    className={`bg-white p-5 rounded-[28px] cursor-pointer flex flex-col sm:flex-row gap-4 items-center border transition-all ${
                      isSelected
                        ? 'border-purple-600 ring-2 ring-purple-600/20 shadow-md'
                        : 'border-slate-200/80 hover:border-slate-300'
                    }`}
                  >
                    <img
                      src={room.image}
                      alt={room.title}
                      className="w-full sm:w-32 h-28 rounded-2xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 w-full space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-base text-slate-900">{room.title}</h4>
                        <span className="text-sm font-black text-purple-600">
                          ₦{room.price.toLocaleString()} <span className="text-xs text-slate-400 font-normal">/ night</span>
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{room.features}</p>
                      <div className="flex items-center gap-3 text-xs text-slate-600 pt-1">
                        <span>👥 {room.guests} Guests</span>
                        <span>🛏️ {room.bed}</span>
                        <span>📐 {room.size}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Guest Reviews */}
          <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Verified Guest Reviews</h3>
            <div className="space-y-3">
              {hotel.reviews.map((rev, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{rev.author}</span>
                    <span className="text-slate-400">{rev.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Reservation Panel */}
        <div className="lg:col-span-5 sticky top-28">
          <div className="bg-white p-6 sm:p-8 rounded-[36px] border border-slate-200 shadow-lg space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs uppercase tracking-wider text-purple-600 font-bold block mb-1">
                Selected Suite
              </span>
              <h3 className="text-2xl font-black text-slate-900">{selectedRoom.title}</h3>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-black text-slate-900">
                  ₦{selectedRoom.price.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500 font-medium">/ night</span>
              </div>
            </div>

            {/* Stay Dates Box */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Check-in</span>
                  <span className="font-bold text-slate-900">Fri, 10 Oct 2025</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Check-out</span>
                  <span className="font-bold text-slate-900">Sat, 11 Oct 2025</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs flex justify-between">
                <span className="text-slate-600">Guests</span>
                <span className="font-bold text-slate-900">{selectedRoom.guests} Adults</span>
              </div>
            </div>

            {/* Direct Booking Action */}
            <button
              onClick={() => onProceedToBooking(hotel, selectedRoom)}
              className="w-full py-4 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md shadow-purple-600/30 flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              <span>Reserve this Room</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-center text-[11px] text-slate-500">
              No immediate charge until front-desk confirmation. Free cancellation available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
