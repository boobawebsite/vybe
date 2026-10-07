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
    <div className="space-y-12 pb-32 text-white max-w-6xl mx-auto px-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#161617] border border-white/10 text-xs font-bold text-slate-300 hover:text-white transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Discovery</span>
        </button>

        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full bg-[#161617] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white">
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onToggleSave(hotel.id)}
            className="w-10 h-10 rounded-full bg-[#161617] border border-white/10 flex items-center justify-center text-slate-300 hover:text-rose-500"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
          </button>
        </div>
      </div>

      {/* Hero Media Theater (Apple Vision Pro Cinema Tile) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[440px] sm:h-[520px]">
        {/* Main Large Image */}
        <div className="lg:col-span-8 relative rounded-[36px] overflow-hidden border border-white/15 shadow-2xl bg-[#161617]">
          <img
            src={hotel.gallery[selectedPhotoIndex] || hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
            <div>
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-600 text-white text-xs font-bold mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>VYBE Verified Luxury</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                {hotel.name}
              </h1>
              <p className="text-sm text-slate-300 flex items-center gap-1.5 mt-2">
                <MapPin className="w-4 h-4 text-purple-400" />
                {hotel.address}
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-xs font-semibold text-white border border-white/20">
              {selectedPhotoIndex + 1}/{hotel.gallery.length} Photos
            </span>
          </div>
        </div>

        {/* Thumbnail Sidebar */}
        <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4 h-full">
          {hotel.gallery.slice(0, 3).map((img, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedPhotoIndex(idx)}
              className={`relative rounded-3xl overflow-hidden cursor-pointer border-2 transition-all h-28 lg:h-auto ${
                selectedPhotoIndex === idx ? 'border-purple-500 scale-102' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt="Thumb" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* 2-Column Split: Details & Rooms on Left, Sticky Booking Checkout Sidebar on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: About, Amenities, Available Rooms, Reviews */}
        <div className="lg:col-span-7 space-y-8">
          {/* About Section */}
          <div className="rounded-[36px] bg-[#161617] border border-white/10 p-8 space-y-4">
            <h3 className="text-2xl font-bold text-white">About the Property</h3>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              {hotel.description}
            </p>

            <div className="pt-4 border-t border-white/10">
              <h4 className="apple-eyebrow text-slate-400 mb-3">
                Key Amenities
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {hotel.amenities.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-200"
                  >
                    <Check className="w-3.5 h-3.5 text-purple-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Room Tiers Selector */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">Available Rooms</h3>
              <span className="text-xs text-purple-400 font-bold">{hotel.rooms.length} Suites</span>
            </div>

            <div className="space-y-4">
              {hotel.rooms.map((room) => {
                const isSelected = selectedRoom.id === room.id;
                return (
                  <div
                    key={room.id}
                    onClick={() => setSelectedRoom(room)}
                    className={`apple-tile p-5 cursor-pointer flex flex-col sm:flex-row gap-5 items-center border transition-all ${
                      isSelected
                        ? 'border-purple-500 ring-2 ring-purple-500/40 bg-[#1c1c1e]'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <img
                      src={room.image}
                      alt={room.title}
                      className="w-full sm:w-36 h-32 rounded-2xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 w-full space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-lg text-white">{room.title}</h4>
                        <span className="text-base font-black text-purple-400">
                          ₦{room.price.toLocaleString()} <span className="text-xs text-slate-400 font-normal">/ night</span>
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">{room.features}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
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
          <div className="rounded-[36px] bg-[#161617] border border-white/10 p-8 space-y-4">
            <h3 className="text-xl font-bold text-white">Verified Reviews</h3>
            <div className="space-y-3">
              {hotel.reviews.map((rev, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{rev.author}</span>
                    <span className="text-slate-400">{rev.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-300 text-amber-300" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Apple-Style Sticky Reservation Panel */}
        <div className="lg:col-span-5 sticky top-28">
          <div className="rounded-[36px] bg-[#161617] border border-white/15 p-8 space-y-6 shadow-2xl">
            <div className="border-b border-white/10 pb-4">
              <span className="apple-eyebrow text-purple-400 block mb-1">
                Selected Suite
              </span>
              <h3 className="text-2xl font-black text-white">{selectedRoom.title}</h3>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-3xl font-black text-white">
                  ₦{selectedRoom.price.toLocaleString()}
                </span>
                <span className="text-xs text-slate-400">/ night</span>
              </div>
            </div>

            {/* Stay Dates Box */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Check-in</span>
                  <span className="font-bold text-white">Fri, 10 Oct 2025</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Check-out</span>
                  <span className="font-bold text-white">Sat, 11 Oct 2025</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs flex justify-between">
                <span className="text-slate-300">Guests</span>
                <span className="font-bold text-white">{selectedRoom.guests} Adults</span>
              </div>
            </div>

            {/* Direct Booking Action */}
            <button
              onClick={() => onProceedToBooking(hotel, selectedRoom)}
              className="apple-btn-purple w-full py-4 text-center text-sm font-bold flex items-center justify-center gap-2"
            >
              <span>Reserve this Room</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-center text-[11px] text-slate-500">
              Instant confirmation pass with front-desk QR code verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
