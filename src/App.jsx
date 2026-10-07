import React, { useState } from 'react';
import {
  Home,
  Compass,
  CalendarCheck,
  Heart,
  User,
  ShieldCheck,
  Sparkles,
  MapPin,
  Bell,
  Tag,
  LayoutDashboard,
  Search,
  ShoppingBag
} from 'lucide-react';
import WelcomeScreen from './components/WelcomeScreen';
import AuthScreen from './components/AuthScreen';
import VisionProHome from './components/VisionProHome';
import VisionProExplore from './components/VisionProExplore';
import VisionProDetail from './components/VisionProDetail';
import BookingFlowScreen from './components/BookingFlowScreen';
import ConfirmationScreen from './components/ConfirmationScreen';
import DealsTab from './components/DealsTab';
import AdminPortalTab from './components/AdminPortalTab';
import { BookingsTab, SavedTab, ProfileTab } from './components/AdditionalTabs';
import { VYBE_DATA } from './data/vybeData';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('main');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedHotel, setSelectedHotel] = useState(VYBE_DATA.hotels[0]);
  const [selectedRoom, setSelectedRoom] = useState(VYBE_DATA.hotels[0].rooms[0]);
  const [lastBooking, setLastBooking] = useState(null);

  const [user, setUser] = useState({ name: 'Daniel', email: 'daniel@vybe.ng', accountType: 'personal' });
  const [savedHotelIds, setSavedHotelIds] = useState(['motion-hotel', 'ibom-tropicana']);
  const [bookingsList, setBookingsList] = useState([]);

  const toggleSaveHotel = (hotelId) => {
    setSavedHotelIds((prev) =>
      prev.includes(hotelId) ? prev.filter((id) => id !== hotelId) : [...prev, hotelId]
    );
  };

  const handleSelectHotel = (hotel) => {
    setSelectedHotel(hotel);
    setSelectedRoom(hotel.rooms[0]);
    setCurrentScreen('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToBooking = (hotel, room) => {
    setSelectedHotel(hotel);
    setSelectedRoom(room);
    setCurrentScreen('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingComplete = (bookingData) => {
    setLastBooking(bookingData);
    setBookingsList((prev) => [bookingData, ...prev]);
    setCurrentScreen('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] flex flex-col justify-between selection:bg-purple-600 selection:text-white">
      {/* 1. APPLE GLOBAL NAV (Top Black/Dark Glass Bar from Screenshot) */}
      <div className="apple-globalnav text-xs text-[#1d1d1f] px-4 sm:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6 overflow-x-auto hide-scrollbar">
            {/* Apple Logo Replaced with VYBE Brand Mark */}
            <div
              onClick={() => {
                setCurrentScreen('main');
                setActiveTab('home');
              }}
              className="flex items-center gap-1.5 cursor-pointer font-bold text-sm tracking-tight"
            >
              <span className="text-base font-black">VYBE</span>
              <span className="w-2 h-2 rounded-full bg-purple-600" />
            </div>

            <button onClick={() => { setCurrentScreen('main'); setActiveTab('home'); }} className="text-[#86868b] hover:text-[#1d1d1f] whitespace-nowrap">Stays</button>
            <button onClick={() => { setCurrentScreen('main'); setActiveTab('explore'); }} className="text-[#86868b] hover:text-[#1d1d1f] whitespace-nowrap">Living Map</button>
            <button onClick={() => { setCurrentScreen('main'); setActiveTab('deals'); }} className="text-[#86868b] hover:text-[#1d1d1f] whitespace-nowrap">Deals</button>
            <button onClick={() => { setCurrentScreen('main'); setActiveTab('bookings'); }} className="text-[#86868b] hover:text-[#1d1d1f] whitespace-nowrap">Reservations ({bookingsList.length})</button>
            <button onClick={() => { setCurrentScreen('main'); setActiveTab('saved'); }} className="text-[#86868b] hover:text-[#1d1d1f] whitespace-nowrap">Saved ({savedHotelIds.length})</button>
            <button onClick={() => { setCurrentScreen('main'); setActiveTab('admin'); }} className="text-[#86868b] hover:text-[#1d1d1f] whitespace-nowrap">Admin Portal</button>
          </div>

          <div className="flex items-center gap-4 text-[#1d1d1f]">
            <button onClick={() => { setCurrentScreen('main'); setActiveTab('explore'); }} className="hover:text-purple-600 transition-colors">
              <Search className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => { setCurrentScreen('main'); setActiveTab('profile'); }} className="hover:text-purple-600 transition-colors">
              <User className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. APPLE SUBNAV STICKY BAR (Exact header from screenshot: "Apple Vision Pro | Overview Tech Specs visionOS Book a demo Buy") */}
      <header className="sticky top-0 z-50 px-4 sm:px-8 py-3.5 apple-subnav">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Exact position of "Apple Vision Pro" title */}
          <div
            onClick={() => {
              setCurrentScreen('main');
              setActiveTab('home');
            }}
            className="cursor-pointer"
          >
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f]">
              {selectedHotel.name}
            </h2>
          </div>

          {/* Exact position of "Overview  Tech Specs  visionOS  Book a demo  Buy" */}
          <div className="flex items-center gap-5 sm:gap-7">
            <nav className="hidden md:flex items-center gap-6 text-xs font-normal text-[#1d1d1f]">
              <button
                onClick={() => {
                  setCurrentScreen('main');
                  setActiveTab('home');
                }}
                className={`transition-colors ${activeTab === 'home' ? 'text-[#1d1d1f] font-semibold border-b-2 border-black pb-0.5' : 'text-[#86868b] hover:text-[#1d1d1f]'}`}
              >
                Overview
              </button>
              <button
                onClick={() => {
                  setCurrentScreen('detail');
                }}
                className={`transition-colors ${currentScreen === 'detail' ? 'text-[#1d1d1f] font-semibold border-b-2 border-black pb-0.5' : 'text-[#86868b] hover:text-[#1d1d1f]'}`}
              >
                Amenities & Rooms
              </button>
              <button
                onClick={() => {
                  setCurrentScreen('main');
                  setActiveTab('explore');
                }}
                className={`transition-colors ${activeTab === 'explore' ? 'text-[#1d1d1f] font-semibold border-b-2 border-black pb-0.5' : 'text-[#86868b] hover:text-[#1d1d1f]'}`}
              >
                Living Map
              </button>
            </nav>

            {/* Exact position of "Book a demo" (Outline button) and "Buy" (Filled Blue button) */}
            <div className="flex items-center gap-3">
              {/* "Book a demo" changed to Price as instructed by user */}
              <div className="apple-btn-outline text-xs py-1.5 px-4 cursor-default">
                ₦{selectedHotel.pricePerNight.toLocaleString()} / night
              </div>

              {/* "Buy" changed to View as instructed by user */}
              <button
                onClick={() => handleSelectHotel(selectedHotel)}
                className="apple-btn-blue text-xs py-1.5 px-4 font-medium"
              >
                View
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 3. MAIN WORKSPACE CONTAINER */}
      <main className="flex-1 w-full">
        {currentScreen === 'welcome' && (
          <WelcomeScreen
            onGetStarted={() => setCurrentScreen('auth')}
            onSignIn={() => setCurrentScreen('auth')}
          />
        )}

        {currentScreen === 'auth' && (
          <AuthScreen
            onLoginSuccess={(userData) => {
              setUser(userData);
              setCurrentScreen('main');
            }}
            onBack={() => setCurrentScreen('main')}
          />
        )}

        {currentScreen === 'main' && (
          <>
            {activeTab === 'home' && (
              <VisionProHome
                user={user}
                onSelectHotel={handleSelectHotel}
                onSelectExplore={() => setActiveTab('explore')}
                savedIds={savedHotelIds}
                onToggleSave={toggleSaveHotel}
              />
            )}

            {activeTab === 'explore' && (
              <VisionProExplore
                onSelectHotel={handleSelectHotel}
                savedIds={savedHotelIds}
                onToggleSave={toggleSaveHotel}
              />
            )}

            {activeTab === 'deals' && (
              <DealsTab onSelectHotel={handleSelectHotel} />
            )}

            {activeTab === 'admin' && (
              <AdminPortalTab />
            )}

            {activeTab === 'bookings' && (
              <BookingsTab bookings={bookingsList} onSelectHotel={handleSelectHotel} />
            )}

            {activeTab === 'saved' && (
              <SavedTab savedIds={savedHotelIds} onSelectHotel={handleSelectHotel} />
            )}

            {activeTab === 'profile' && (
              <ProfileTab user={user} onLogout={() => setCurrentScreen('auth')} />
            )}
          </>
        )}

        {currentScreen === 'detail' && (
          <VisionProDetail
            hotel={selectedHotel}
            onBack={() => setCurrentScreen('main')}
            onProceedToBooking={handleProceedToBooking}
            isSaved={savedHotelIds.includes(selectedHotel.id)}
            onToggleSave={toggleSaveHotel}
          />
        )}

        {currentScreen === 'booking' && (
          <div className="max-w-2xl mx-auto px-4 py-8">
            <BookingFlowScreen
              hotel={selectedHotel}
              room={selectedRoom}
              onBack={() => setCurrentScreen('detail')}
              onBookingSuccess={handleBookingComplete}
            />
          </div>
        )}

        {currentScreen === 'confirmation' && lastBooking && (
          <div className="max-w-2xl mx-auto px-4 py-8">
            <ConfirmationScreen
              booking={lastBooking}
              onBackToHome={() => {
                setCurrentScreen('main');
                setActiveTab('home');
              }}
              onViewBookings={() => {
                setCurrentScreen('main');
                setActiveTab('bookings');
              }}
            />
          </div>
        )}
      </main>

      {/* 4. MOBILE BOTTOM BAR */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white/90 backdrop-blur-2xl border-t border-slate-200 p-2 z-50">
        <div className="flex items-center justify-around">
          {[
            { id: 'home', label: 'Overview', icon: Home },
            { id: 'explore', label: 'Map', icon: Compass },
            { id: 'deals', label: 'Deals', icon: Tag },
            { id: 'bookings', label: 'Bookings', icon: CalendarCheck },
            { id: 'saved', label: 'Saved', icon: Heart },
            { id: 'admin', label: 'Admin', icon: LayoutDashboard },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id && currentScreen === 'main';
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentScreen('main');
                  setActiveTab(item.id);
                }}
                className={`flex flex-col items-center py-1 px-2.5 rounded-2xl transition-all ${
                  isActive ? 'text-purple-600 font-bold scale-105' : 'text-slate-400'
                }`}
              >
                <Icon className="w-5 h-5 mb-0.5" />
                <span className="text-[10px]">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* 5. FOOTER: Apple Minimalist Light Footer */}
      <footer className="border-t border-slate-200 py-14 px-6 mt-20 text-center text-xs text-slate-500 space-y-2 bg-[#fbfbfd]">
        <p className="font-semibold text-slate-800">
          VYBE • The Spatial Layer for City Discovery & Stays — Uyo, Akwa Ibom State, Nigeria
        </p>
        <p className="text-[11px] text-slate-400 leading-relaxed max-w-2xl mx-auto">
          All trademarks, verified establishments, room inventory, and local experiences adhere to the VYBE Master Product Specification. Designed in exact alignment with the Apple Vision Pro product page structure.
        </p>
      </footer>
    </div>
  );
}
