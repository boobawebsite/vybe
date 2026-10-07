import React, { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  Heart,
  Star,
  MapPin,
  Phone,
  Check,
  Wifi,
  Car,
  Utensils,
  Waves,
  Dumbbell,
  Zap,
  ShieldCheck,
  ChevronRight,
  Calendar,
  Users
} from 'lucide-react';

export default function PlaceDetailScreen({
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
    <div className="space-y-5 pb-28 text-slate-900">
      {/* Top Navigation & Media Gallery */}
      <div className="relative rounded-3xl overflow-hidden shadow-lg -mx-2 sm:mx-0">
        <div className="relative h-64 sm:h-80 w-full">
          <img
            src={hotel.gallery[selectedPhotoIndex] || hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/30" />

          {/* Top Actions Floating Bar */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-all">
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onToggleSave(hotel.id)}
                className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-all"
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
              </button>
            </div>
          </div>

          {/* Photos Counter Indicator */}
          <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-semibold">
            {selectedPhotoIndex + 1}/{hotel.gallery.length} Photos
          </div>
        </div>

        {/* Thumbnail Selector Row */}
        <div className="flex gap-2 p-2 bg-slate-900 overflow-x-auto hide-scrollbar">
          {hotel.gallery.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedPhotoIndex(idx)}
              className={`w-16 h-12 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                selectedPhotoIndex === idx ? 'border-purple-500 scale-105' : 'border-transparent opacity-60'
              }`}
            >
              <img src={img} alt="Thumb" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Hotel Title & Verified Header */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {hotel.name}
              </h1>
              {hotel.isVerified && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-[10px] font-bold">
                  <ShieldCheck className="w-3 h-3 text-purple-600" />
                  VYBE Verified
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <div className="flex items-center gap-1 font-bold text-slate-800">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{hotel.rating}</span>
              </div>
              <span>•</span>
              <span>({hotel.reviewsCount} reviews)</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-2">
              <MapPin className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
              <span>{hotel.address}</span>
            </div>
          </div>

          <a
            href={`tel:${hotel.phone}`}
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold transition-all border border-purple-200"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call</span>
          </a>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
          {hotel.description}
        </p>

        {/* Amenity Badges */}
        <div className="pt-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Key Amenities
          </h4>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {hotel.amenities.map((item, i) => {
              const Icon = amenityIcons[item] || Check;
              return (
                <div
                  key={i}
                  className="flex flex-col items-center p-2.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-center"
                >
                  <Icon className="w-4 h-4 text-purple-600 mb-1" />
                  <span className="text-[10px] font-semibold text-slate-700 line-clamp-1">
                    {item}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Available Room Tiers */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">Available Rooms</h3>
          <span className="text-xs text-purple-600 font-bold">{hotel.rooms.length} options</span>
        </div>

        <div className="space-y-3">
          {hotel.rooms.map((room) => {
            const isSelected = selectedRoom.id === room.id;
            return (
              <div
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className={`p-4 rounded-3xl border transition-all cursor-pointer bg-white ${
                  isSelected
                    ? 'border-purple-600 ring-2 ring-purple-600/20 shadow-md'
                    : 'border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div className="flex gap-4">
                  <img
                    src={room.image}
                    alt={room.title}
                    className="w-24 h-24 rounded-2xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-slate-900">{room.title}</h4>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'bg-purple-600 border-purple-600 text-white' : 'border-slate-300'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{room.features}</p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-600 mt-2">
                        <span>👥 {room.guests} Guests</span>
                        <span>🛏️ {room.bed}</span>
                        <span>📐 {room.size}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-2">
                      <span className="text-sm font-black text-slate-900">
                        ₦{room.price.toLocaleString()}{' '}
                        <span className="text-[10px] font-normal text-slate-500">/ night</span>
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRoom(room);
                          onProceedToBooking(hotel, room);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-xs"
                      >
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Guest Reviews Section */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Guest Reviews</h3>
          <span className="text-xs text-purple-600 font-bold">See All ({hotel.reviewsCount})</span>
        </div>

        <div className="space-y-3">
          {hotel.reviews.map((rev, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center">
                    {rev.author[0]}
                  </div>
                  <span className="font-bold text-xs text-slate-800">{rev.author}</span>
                </div>
                <span className="text-[10px] text-slate-400">{rev.time}</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600">{rev.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Bottom Booking Action Bar */}
      <div className="fixed bottom-0 inset-x-0 p-4 bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-2xl z-40 max-w-lg mx-auto">
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-slate-500 font-medium block">
              {selectedRoom.title} • {selectedRoom.guests} Guests
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
            className="flex-1 py-3.5 px-6 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md shadow-purple-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <span>Book Now</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
