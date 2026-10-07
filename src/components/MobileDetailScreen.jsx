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
  ChevronRight
} from 'lucide-react';

export default function MobileDetailScreen({
  hotel,
  onBack,
  onProceedToBooking,
  isSaved,
  onToggleSave
}) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(hotel.rooms[0]);

  const amenityIcons = {
    'Free Wi-Fi': Wifi,
    'Free Parking': Car,
    'Restaurant': Utensils,
    'Swimming Pool': Waves,
    'Gym': Dumbbell,
    '24/7 Power': Zap,
    'Bar': Utensils,
  };

  return (
    <div className="space-y-4 pb-28 text-slate-900 bg-white min-h-screen">
      {/* 1. TOP CAROUSEL & ACTIONS (From Image 8 & 14) */}
      <div className="relative h-72 w-full overflow-hidden">
        <img
          src={hotel.gallery[selectedPhotoIndex] || hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover transition-all duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

        {/* Floating Header Buttons */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-slate-900 flex items-center justify-center shadow-md active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-slate-900 flex items-center justify-center shadow-md">
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onToggleSave(hotel.id)}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-slate-900 flex items-center justify-center shadow-md active:scale-95"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-slate-900'}`} />
            </button>
          </div>
        </div>

        {/* Counter Badge */}
        <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold">
          {selectedPhotoIndex + 1}/{hotel.gallery.length} Photos
        </div>
      </div>

      {/* Thumbnails Row */}
      <div className="flex gap-2 px-4 overflow-x-auto hide-scrollbar -mt-2">
        {hotel.gallery.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedPhotoIndex(idx)}
            className={`w-16 h-12 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
              selectedPhotoIndex === idx ? 'border-purple-600 scale-105' : 'border-transparent opacity-60'
            }`}
          >
            <img src={img} alt="Thumb" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* 2. HOTEL OVERVIEW & TITLE (From Image 8 & 14) */}
      <div className="px-4 space-y-3 pt-1">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-slate-900">{hotel.name}</h1>
              {hotel.isVerified && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold border border-purple-200">
                  <ShieldCheck className="w-3 h-3 text-purple-600" />
                  VYBE Verified
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <div className="flex items-center gap-0.5 font-bold text-slate-800">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{hotel.rating}</span>
              </div>
              <span>({hotel.reviewsCount} reviews)</span>
            </div>

            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
              <span>{hotel.address}</span>
            </p>
          </div>

          <a
            href={`tel:${hotel.phone}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call</span>
          </a>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed font-normal">
          {hotel.description}
        </p>

        {/* Amenities Icons Row */}
        <div className="pt-2">
          <div className="grid grid-cols-4 gap-2">
            {hotel.amenities.slice(0, 4).map((item, i) => {
              const Icon = amenityIcons[item] || Check;
              return (
                <div
                  key={i}
                  className="flex flex-col items-center p-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-center"
                >
                  <Icon className="w-4 h-4 text-purple-600 mb-1" />
                  <span className="text-[10px] font-semibold text-slate-700 line-clamp-1">{item}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. AVAILABLE ROOMS CARDS (From Image 8 & 15) */}
      <div className="px-4 space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-slate-900">Available Rooms</h3>
          <span className="text-xs text-purple-600 font-bold">{hotel.rooms.length} Suites</span>
        </div>

        <div className="space-y-3">
          {hotel.rooms.map((room) => {
            const isSelected = selectedRoom.id === room.id;
            return (
              <div
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className={`p-3.5 rounded-3xl border transition-all cursor-pointer flex gap-3.5 ${
                  isSelected
                    ? 'border-purple-600 bg-purple-50/30 ring-1 ring-purple-600 shadow-xs'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-24 h-24 rounded-2xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 truncate">{room.title}</h4>
                    <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5">{room.features}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-600 mt-1.5 font-medium">
                      <span>👥 {room.guests} Guests</span>
                      <span>🛏️ {room.bed}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                    <div>
                      <span className="text-sm font-black text-slate-900">
                        ₦{room.price.toLocaleString()}
                      </span>
                      <span className="text-[9px] text-slate-500 font-normal">/night</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRoom(room);
                        onProceedToBooking(hotel, room);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-bold active:scale-95 shadow-xs"
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. GUEST REVIEWS (From Image 14) */}
      <div className="px-4 space-y-2 pt-2">
        <h3 className="text-base font-extrabold text-slate-900">Guest Reviews</h3>
        {hotel.reviews.map((rev, idx) => (
          <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-slate-900">{rev.author}</span>
              <span className="text-[10px] text-slate-400">{rev.time}</span>
            </div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-600">{rev.comment}</p>
          </div>
        ))}
      </div>

      {/* 5. STICKY BOTTOM CHECK AVAILABILITY BAR (From Image 8 & 14) */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-xl border-t border-slate-200 p-4 z-40 flex items-center justify-between gap-4 shadow-xl">
        <div>
          <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">
            {selectedRoom.title}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-black text-slate-900">
              ₦{selectedRoom.price.toLocaleString()}
            </span>
            <span className="text-xs text-slate-500">/ night</span>
          </div>
        </div>

        <button
          onClick={() => onProceedToBooking(hotel, selectedRoom)}
          className="flex-1 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm shadow-md shadow-purple-600/30 flex items-center justify-center gap-1.5 active:scale-95"
        >
          <span>Check Availability</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
