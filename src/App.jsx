import React, { useState } from 'react';
import {
  Home,
  Compass,
  CalendarCheck,
  Heart,
  User,
  Monitor,
  Smartphone,
  ChevronRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import WelcomeScreen from './components/WelcomeScreen';
import AuthScreen from './components/AuthScreen';
import HomeScreen from './components/HomeScreen';
import ExploreMapScreen from './components/ExploreMapScreen';
import PlaceDetailScreen from './components/PlaceDetailScreen';
import BookingFlowScreen from './components/BookingFlowScreen';
import ConfirmationScreen from './components/ConfirmationScreen';
import { BookingsTab, SavedTab, ProfileTab } from './components/AdditionalTabs';
import { VYBE_DATA } from './data/vybeData';

export default function App() {
  // Navigation State
  const [currentScreen, setCurrentScreen] = useState('welcome'); // welcome | auth | main | detail | booking | confirmation
  const [activeTab, setActiveTab] = useState('home'); // home | explore | bookings | saved | profile
  const [selectedHotel, setSelectedHotel] = useState(VYBE_DATA.hotels[0]);
  const [selectedRoom, setSelectedRoom] = useState(VYBE_DATA.hotels[0].rooms[0]);
  const [lastBooking, setLastBooking] = useState(null);

  // User & Data State
  const [user, setUser] = useState({ name: 'Daniel', email: 'daniel@vybe.ng', accountType: 'personal' });
  const [savedHotelIds, setSavedHotelIds] = useState(['motion-hotel', 'ibom-tropicana']);
  const [bookingsList, setBookingsList] = useState([]);

  // Device Layout Preview Mode (Desktop Vision Pro glass view vs Standard Full view)
  const [desktopLayoutMode, setDesktopLayoutMode] = useState('responsive'); // 'responsive' | 'vision-pro'

  const toggleSaveHotel = (hotelId) => {
    setSavedHotelIds((prev) =>
      prev.includes(hotelId) ? prev.filter((id) => id !== hotelId) : [...prev, hotelId]
    );
  };

  const handleSelectHotel = (hotel) => {
    setSelectedHotel(hotel);
    setSelectedRoom(hotel.rooms[0]);
    setCurrentScreen('detail');
  };

  const handleProceedToBooking = (hotel, room) => {
    setSelectedHotel(hotel);
    setSelectedRoom(room);
    setCurrentScreen('booking');
  };

  const handleBookingComplete = (bookingData) => {
    setLastBooking(bookingData);
    setBookingsList((prev) => [bookingData, ...prev]);
    setCurrentScreen('confirmation');
  };

  return (
    <div className="min-h-screen bg-[#07080c] text-slate-100 flex flex-col justify-between selection:bg-purple-600 selection:text-white">
      {/* Apple Vision Pro Ambient Desktop Canvas Header */}
      <header className="hidden lg:flex items-center justify-between px-8 py-4 bg-slate-900/60 backdrop-blur-2xl border-b border-white/10 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-white font-display">
              VYBE
            </span>
            <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]" />
          </div>
          <span className="text-xs text-slate-400 font-medium pl-3 border-l border-white/10">
            Uyo City Discovery & Stays • Spatial Web Experience
          </span>
        </div>

        {/* Vision Pro Floating Pill Navigation for Desktop */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 shadow-xl">
          <button
            onClick={() => {
              setCurrentScreen('main');
              setActiveTab('home');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              currentScreen === 'main' && activeTab === 'home'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Discovery
          </button>
          <button
            onClick={() => {
              setCurrentScreen('main');
              setActiveTab('explore');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              currentScreen === 'main' && activeTab === 'explore'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Living City Map
          </button>
          <button
            onClick={() => {
              setCurrentScreen('main');
              setActiveTab('bookings');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              currentScreen === 'main' && activeTab === 'bookings'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Bookings ({bookingsList.length})
          </button>
          <button
            onClick={() => {
              setCurrentScreen('main');
              setActiveTab('saved');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              currentScreen === 'main' && activeTab === 'saved'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Saved ({savedHotelIds.length})
          </button>
        </div>

        {/* User Account Quick Switcher */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs font-bold text-white block">{user.name}</span>
            <span className="text-[10px] text-purple-400">Verified Uyo Explorer</span>
          </div>
          <button
            onClick={() => {
              setCurrentScreen('main');
              setActiveTab('profile');
            }}
            className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-bold text-sm flex items-center justify-center border border-white/20 hover:scale-105 transition-transform"
          >
            {user.name[0]}
          </button>
        </div>
      </header>

      {/* Main Body Layout: Clean, Natural, Responsive (NO fake phone borders) */}
      <main className="flex-1 flex justify-center items-start p-0 sm:p-4 md:p-6 lg:p-8">
        <div className="w-full max-w-md lg:max-w-xl xl:max-w-2xl bg-slate-50 text-slate-900 min-h-screen sm:min-h-[85vh] sm:rounded-[36px] shadow-2xl relative overflow-hidden border border-slate-200/50">
          <div className="p-4 sm:p-6">
            {/* Screen Router */}
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
                onBack={() => setCurrentScreen('welcome')}
              />
            )}

            {currentScreen === 'main' && (
              <>
                {activeTab === 'home' && (
                  <HomeScreen
                    user={user}
                    onSelectHotel={handleSelectHotel}
                    onSelectExplore={() => setActiveTab('explore')}
                    savedIds={savedHotelIds}
                    onToggleSave={toggleSaveHotel}
                  />
                )}

                {activeTab === 'explore' && (
                  <ExploreMapScreen
                    onSelectHotel={handleSelectHotel}
                    savedIds={savedHotelIds}
                    onToggleSave={toggleSaveHotel}
                  />
                )}

                {activeTab === 'bookings' && (
                  <BookingsTab
                    bookings={bookingsList}
                    onSelectHotel={handleSelectHotel}
                  />
                )}

                {activeTab === 'saved' && (
                  <SavedTab
                    savedIds={savedHotelIds}
                    onSelectHotel={handleSelectHotel}
                  />
                )}

                {activeTab === 'profile' && (
                  <ProfileTab
                    user={user}
                    onLogout={() => setCurrentScreen('welcome')}
                  />
                )}
              </>
            )}

            {currentScreen === 'detail' && (
              <PlaceDetailScreen
                hotel={selectedHotel}
                onBack={() => setCurrentScreen('main')}
                onProceedToBooking={handleProceedToBooking}
                isSaved={savedHotelIds.includes(selectedHotel.id)}
                onToggleSave={toggleSaveHotel}
              />
            )}

            {currentScreen === 'booking' && (
              <BookingFlowScreen
                hotel={selectedHotel}
                room={selectedRoom}
                onBack={() => setCurrentScreen('detail')}
                onBookingSuccess={handleBookingComplete}
              />
            )}

            {currentScreen === 'confirmation' && lastBooking && (
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
            )}
          </div>

          {/* Clean Unified Mobile Bottom Bar (Active on main tabs) */}
          {currentScreen === 'main' && (
            <nav className="fixed sm:sticky bottom-0 inset-x-0 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 p-2 sm:p-2.5 z-40 max-w-md lg:max-w-xl xl:max-w-2xl mx-auto">
              <div className="flex items-center justify-around">
                {[
                  { id: 'home', label: 'Home', icon: Home },
                  { id: 'explore', label: 'Explore', icon: Compass },
                  { id: 'bookings', label: 'Bookings', icon: CalendarCheck },
                  { id: 'saved', label: 'Saved', icon: Heart },
                  { id: 'profile', label: 'Profile', icon: User },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`flex flex-col items-center py-1 px-3 rounded-2xl transition-all ${
                        isActive
                          ? 'text-purple-600 font-bold scale-105'
                          : 'text-slate-400 hover:text-slate-700 font-medium'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                      <span className="text-[10px] tracking-tight">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
          )}
        </div>
      </main>

      {/* Footer Branding Info */}
      <footer className="text-center py-4 text-xs text-slate-500">
        <span>VYBE • Discover. Book. Experience. • Uyo, Akwa Ibom State</span>
      </footer>
    </div>
  );
}
