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
  Bell
} from 'lucide-react';
import WelcomeScreen from './components/WelcomeScreen';
import AuthScreen from './components/AuthScreen';
import VisionProHome from './components/VisionProHome';
import VisionProExplore from './components/VisionProExplore';
import VisionProDetail from './components/VisionProDetail';
import BookingFlowScreen from './components/BookingFlowScreen';
import ConfirmationScreen from './components/ConfirmationScreen';
import { BookingsTab, SavedTab, ProfileTab } from './components/AdditionalTabs';
import { VYBE_DATA } from './data/vybeData';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('main'); // default to 'main' for immediate rich preview
  const [activeTab, setActiveTab] = useState('home'); // home | explore | bookings | saved | profile
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
      {/* 1. TOP SPATIAL NAVIGATION BAR (Apple Vision Pro Glass Style) */}
      <header className="sticky top-0 z-50 px-4 sm:px-8 py-3.5 backdrop-blur-2xl bg-black/60 border-b border-white/10">
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
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-white font-display">
                VYBE
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_12px_#a855f7]" />
            </div>
            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-white/15">
              <span className="text-xs text-slate-400 font-medium">Uyo • Akwa Ibom</span>
              <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold border border-purple-500/30">
                PRO
              </span>
            </div>
          </div>

          {/* Floating Pill Tabs (Vision Pro Nav Dock) */}
          <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full apple-pill">
            {[
              { id: 'home', label: 'Discovery' },
              { id: 'explore', label: 'Living City Map' },
              { id: 'bookings', label: `Bookings (${bookingsList.length})` },
              { id: 'saved', label: `Saved (${savedHotelIds.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setCurrentScreen('main');
                  setActiveTab(tab.id);
                }}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  currentScreen === 'main' && activeTab === tab.id
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Right User & Location Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setCurrentScreen('main');
                setActiveTab('explore');
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-xs text-slate-200 border border-white/10 transition-all"
            >
              <MapPin className="w-3.5 h-3.5 text-purple-400" />
              <span>Uyo</span>
            </button>

            <button
              onClick={() => {
                setCurrentScreen('main');
                setActiveTab('profile');
              }}
              className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center border border-white/20 hover:scale-105 transition-transform"
            >
              {user.name[0]}
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE CONTAINER */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
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

            {activeTab === 'bookings' && (
              <div className="max-w-2xl mx-auto">
                <BookingsTab bookings={bookingsList} onSelectHotel={handleSelectHotel} />
              </div>
            )}

            {activeTab === 'saved' && (
              <div className="max-w-2xl mx-auto">
                <SavedTab savedIds={savedHotelIds} onSelectHotel={handleSelectHotel} />
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="max-w-2xl mx-auto">
                <ProfileTab user={user} onLogout={() => setCurrentScreen('auth')} />
              </div>
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
          <div className="max-w-2xl mx-auto">
            <BookingFlowScreen
              hotel={selectedHotel}
              room={selectedRoom}
              onBack={() => setCurrentScreen('detail')}
              onBookingSuccess={handleBookingComplete}
            />
          </div>
        )}

        {currentScreen === 'confirmation' && lastBooking && (
          <div className="max-w-2xl mx-auto">
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

      {/* 3. MOBILE BOTTOM DOCK (For mobile phones) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-black/80 backdrop-blur-2xl border-t border-white/10 p-2 z-50">
        <div className="flex items-center justify-around">
          {[
            { id: 'home', label: 'Discovery', icon: Home },
            { id: 'explore', label: 'Map', icon: Compass },
            { id: 'bookings', label: 'Bookings', icon: CalendarCheck },
            { id: 'saved', label: 'Saved', icon: Heart },
            { id: 'profile', label: 'Profile', icon: User },
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
                className={`flex flex-col items-center py-1 px-3 rounded-2xl transition-all ${
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

      {/* 4. FOOTER: Apple Vision Pro Minimalist Spatial Footer */}
      <footer className="border-t border-white/10 py-10 px-6 mt-16 text-center text-xs text-slate-500 space-y-2">
        <p className="font-semibold text-slate-400">
          VYBE • Discover. Book. Experience. — Akwa Ibom State, Nigeria
        </p>
        <p className="text-[11px] text-slate-600">
          Designed with Apple Vision Pro Spatial Web Aesthetics & Material Glass UI.
        </p>
      </footer>
    </div>
  );
}
