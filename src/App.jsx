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
  LayoutDashboard
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
    <div className="min-h-screen bg-black text-[#f5f5f7] flex flex-col justify-between selection:bg-purple-600 selection:text-white">
      {/* 1. APPLE SUBNAV STICKY GLASS HEADER */}
      <header className="sticky top-0 z-50 px-4 sm:px-8 py-3 apple-subnav">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & City Identity */}
          <div
            onClick={() => {
              setCurrentScreen('main');
              setActiveTab('home');
            }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black tracking-tight text-white font-display">
                VYBE
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_12px_#a855f7]" />
            </div>
            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-white/20">
              <span className="text-xs text-slate-400 font-medium">Uyo • Akwa Ibom</span>
            </div>
          </div>

          {/* Apple Subnav Style Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {[
              { id: 'home', label: 'Overview' },
              { id: 'explore', label: 'Living Map' },
              { id: 'deals', label: 'Deals & Offers' },
              { id: 'bookings', label: `Bookings (${bookingsList.length})` },
              { id: 'saved', label: `Saved (${savedHotelIds.length})` },
              { id: 'admin', label: 'Admin Portal' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setCurrentScreen('main');
                  setActiveTab(tab.id);
                }}
                className={`text-xs font-medium transition-colors ${
                  currentScreen === 'main' && activeTab === tab.id
                    ? 'text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setCurrentScreen('main');
                setActiveTab('explore');
              }}
              className="apple-btn-primary text-xs py-1.5 px-4 font-semibold"
            >
              Explore Uyo
            </button>

            <button
              onClick={() => {
                setCurrentScreen('main');
                setActiveTab('profile');
              }}
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center border border-white/20 hover:scale-105 transition-transform"
            >
              {user.name[0]}
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE CONTAINER */}
      <main className="flex-1 w-full pt-6">
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
          <div className="max-w-2xl mx-auto px-4">
            <BookingFlowScreen
              hotel={selectedHotel}
              room={selectedRoom}
              onBack={() => setCurrentScreen('detail')}
              onBookingSuccess={handleBookingComplete}
            />
          </div>
        )}

        {currentScreen === 'confirmation' && lastBooking && (
          <div className="max-w-2xl mx-auto px-4">
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

      {/* 3. MOBILE BOTTOM BAR */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-black/80 backdrop-blur-2xl border-t border-white/10 p-2 z-50">
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
                  isActive ? 'text-purple-400 font-bold scale-105' : 'text-slate-400'
                }`}
              >
                <Icon className="w-5 h-5 mb-0.5" />
                <span className="text-[10px]">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* 4. FOOTER: Exact Apple Vision Pro Minimalist Global Footer */}
      <footer className="border-t border-white/15 py-14 px-6 mt-20 text-center text-xs text-slate-500 space-y-3 bg-[#0a0a0c]">
        <div className="max-w-4xl mx-auto space-y-2">
          <p className="font-semibold text-slate-300">
            VYBE • The Spatial Layer for City Discovery & Stays — Uyo, Akwa Ibom State, Nigeria
          </p>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            All trademarks, verified establishments, room inventory, and local experiences adhere to the VYBE Master Product Specification. Designed with Apple Vision Pro product architecture.
          </p>
        </div>
      </footer>
    </div>
  );
}
