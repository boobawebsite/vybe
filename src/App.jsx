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
  ShoppingBag,
  ChevronDown,
  LogOut,
  ArrowRight
} from 'lucide-react';
import WelcomeScreen from './components/WelcomeScreen';
import AuthScreen from './components/AuthScreen';
import VisionProHome from './components/VisionProHome';
import VisionProExplore from './components/VisionProExplore';
import VisionProDetail from './components/VisionProDetail';
import MobileHomeScreen from './components/MobileHomeScreen';
import MobileDetailScreen from './components/MobileDetailScreen';
import BookingFlowScreen from './components/BookingFlowScreen';
import MobileStayCheckoutScreen from './components/MobileStayCheckoutScreen';
import VisionProCheckout from './components/VisionProCheckout';
import ConfirmationScreen from './components/ConfirmationScreen';
import DealsTab from './components/DealsTab';
import AdminPortalTab from './components/AdminPortalTab';
import { BookingsTab, SavedTab, ProfileTab } from './components/AdditionalTabs';
import { VYBE_DATA } from './data/vybeData';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedHotel, setSelectedHotel] = useState(VYBE_DATA.hotels[0]);
  const [selectedRoom, setSelectedRoom] = useState(VYBE_DATA.hotels[0].rooms[0]);
  const [lastBooking, setLastBooking] = useState(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const [user, setUser] = useState({ name: 'Daniel', email: 'daniel@vybe.ng', accountType: 'personal' });
  const [authMode, setAuthMode] = useState('signup');
  const [activeCategory, setActiveCategory] = useState('hotels');
  const [savedHotelIds, setSavedHotelIds] = useState(['motion-hotel', 'ibom-tropicana']);
  const [bookingsList, setBookingsList] = useState([]);

  const handleNavCategory = (categoryId) => {
    setCurrentScreen('main');
    setActiveTab('home');
    setActiveCategory(categoryId);
    setTimeout(() => {
      const el = document.getElementById(`${categoryId}-section`) || document.getElementById(categoryId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

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
    const booking = {
      id: 'VYBE-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString(),
      ...bookingData,
    };
    setLastBooking(booking);
    setBookingsList((prev) => [booking, ...prev]);
    setCurrentScreen('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      onClick={() => { if (isProfileMenuOpen) setIsProfileMenuOpen(false); }}
      className="min-h-screen bg-white text-[#1d1d1f] flex flex-col justify-between selection:bg-purple-600 selection:text-white"
    >
      {/* 1. DESKTOP APPLE GLOBAL NAV (Visible on lg screens only when not on welcome or auth screen) */}
      {currentScreen !== 'welcome' && currentScreen !== 'auth' && (
        <header className="hidden lg:block sticky top-0 z-50">
          <div className="apple-globalnav text-xs text-[#1d1d1f] px-8 py-3">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              {/* Brand Logo & City Location */}
              <div className="flex items-center gap-4">
                <div
                  onClick={() => {
                    setCurrentScreen('main');
                    setActiveTab('explore');
                  }}
                  className="flex items-center gap-1.5 cursor-pointer font-bold text-sm tracking-tight"
                >
                  <span className="text-xl font-black tracking-tight font-display">VYBE</span>
                  <span className="w-2 h-2 rounded-full bg-purple-600 shadow-[0_0_8px_#9333ea]" />
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-[11px] font-semibold text-slate-700 border border-slate-200/80">
                  <MapPin className="w-3 h-3 text-purple-600" />
                  <span>Uyo, Akwa Ibom</span>
                </div>
              </div>

              {/* Primary Navigation Tabs */}
              <nav className="flex items-center gap-1 sm:gap-1.5">
                <button
                  onClick={() => handleNavCategory('hotels')}
                  className={`font-semibold px-3.5 py-1.5 rounded-full text-xs transition-all ${
                    currentScreen === 'main' && activeTab === 'home' && activeCategory === 'hotels'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'text-[#86868b] hover:text-[#1d1d1f] hover:bg-slate-100'
                  }`}
                >
                  Hotels
                </button>

                <button
                  onClick={() => handleNavCategory('restaurants')}
                  className={`font-semibold px-3.5 py-1.5 rounded-full text-xs transition-all ${
                    currentScreen === 'main' && activeTab === 'home' && activeCategory === 'restaurants'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'text-[#86868b] hover:text-[#1d1d1f] hover:bg-slate-100'
                  }`}
                >
                  Restaurants
                </button>

                <button
                  onClick={() => handleNavCategory('nightlife')}
                  className={`font-semibold px-3.5 py-1.5 rounded-full text-xs transition-all ${
                    currentScreen === 'main' && activeTab === 'home' && activeCategory === 'nightlife'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'text-[#86868b] hover:text-[#1d1d1f] hover:bg-slate-100'
                  }`}
                >
                  Nightlife
                </button>

                <button
                  onClick={() => handleNavCategory('events')}
                  className={`font-semibold px-3.5 py-1.5 rounded-full text-xs transition-all ${
                    currentScreen === 'main' && activeTab === 'home' && activeCategory === 'events'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'text-[#86868b] hover:text-[#1d1d1f] hover:bg-slate-100'
                  }`}
                >
                  Events
                </button>

                <button
                  onClick={() => handleNavCategory('resorts')}
                  className={`font-semibold px-3.5 py-1.5 rounded-full text-xs transition-all ${
                    currentScreen === 'main' && activeTab === 'home' && activeCategory === 'resorts'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'text-[#86868b] hover:text-[#1d1d1f] hover:bg-slate-100'
                  }`}
                >
                  Resorts
                </button>

                <div className="h-4 w-px bg-slate-200 mx-1" />

                <button
                  onClick={() => {
                    setCurrentScreen('main');
                    setActiveTab('explore');
                    setActiveCategory('map');
                  }}
                  className={`font-semibold px-3.5 py-1.5 rounded-full text-xs transition-all flex items-center gap-1.5 ${
                    currentScreen === 'main' && activeTab === 'explore'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200/80'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>VYBE Map</span>
                </button>
              </nav>

              {/* Right Side Utility Controls */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => { setCurrentScreen('main'); setActiveTab('deals'); setActiveCategory('deals'); }}
                  className={`hidden xl:inline-flex items-center gap-1 font-semibold px-3 py-1.5 rounded-full text-xs transition-all ${
                    currentScreen === 'main' && activeTab === 'deals'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Tag className="w-3.5 h-3.5 text-purple-600" />
                  <span>Deals</span>
                </button>

                <button
                  onClick={() => { setCurrentScreen('main'); setActiveTab('admin'); setActiveCategory('admin'); }}
                  className={`hidden xl:inline-flex items-center gap-1 font-semibold px-3 py-1.5 rounded-full text-xs transition-all ${
                    currentScreen === 'main' && activeTab === 'admin'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span>Host Portal</span>
                </button>
                {/* Wishlist / Saved Button with Count */}
                <button
                  onClick={() => { setCurrentScreen('main'); setActiveTab('saved'); }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all text-xs font-semibold ${
                    currentScreen === 'main' && activeTab === 'saved'
                      ? 'bg-purple-50 text-purple-700 border-purple-200'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                  title="Saved Stays"
                >
                  <Heart className={`w-3.5 h-3.5 ${savedHotelIds.length > 0 ? 'fill-rose-500 text-rose-500' : 'text-slate-500'}`} />
                  <span>Saved</span>
                  {savedHotelIds.length > 0 && (
                    <span className="w-4 h-4 rounded-full bg-purple-600 text-white text-[10px] font-black flex items-center justify-center -mr-0.5">
                      {savedHotelIds.length}
                    </span>
                  )}
                </button>

                {/* Reservations Button with Count */}
                <button
                  onClick={() => { setCurrentScreen('main'); setActiveTab('bookings'); }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all text-xs font-semibold ${
                    currentScreen === 'main' && activeTab === 'bookings'
                      ? 'bg-purple-50 text-purple-700 border-purple-200'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                  title="My Bookings"
                >
                  <CalendarCheck className="w-3.5 h-3.5 text-purple-600" />
                  <span>Bookings</span>
                  {bookingsList.length > 0 && (
                    <span className="w-4 h-4 rounded-full bg-purple-600 text-white text-[10px] font-black flex items-center justify-center -mr-0.5">
                      {bookingsList.length}
                    </span>
                  )}
                </button>

                {/* User Profile Avatar Dropdown */}
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsProfileMenuOpen(!isProfileMenuOpen);
                    }}
                    className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-semibold text-slate-800 transition-all active:scale-95"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-black text-[11px] flex items-center justify-center shadow-xs">
                      {user?.name?.[0] || 'D'}
                    </div>
                    <span>{user?.name || 'Account'}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  </button>

                  {/* Dropdown Card */}
                  {isProfileMenuOpen && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-0 top-full mt-2 w-60 rounded-2xl bg-white border border-slate-200 shadow-2xl py-2 z-50 text-xs animate-fadeIn"
                    >
                      <div className="px-4 py-2.5 border-b border-slate-100">
                        <p className="font-extrabold text-sm text-slate-900 truncate">{user?.name || 'Daniel Udoh'}</p>
                        <p className="text-[11px] text-slate-500 truncate">{user?.email || 'daniel@vybe.ng'}</p>
                        <span className="inline-block mt-1 text-[9px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                          Verified Resident • Uyo
                        </span>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={() => {
                            setCurrentScreen('main');
                            setActiveTab('profile');
                            setIsProfileMenuOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center gap-2.5 text-slate-700 font-medium"
                        >
                          <User className="w-3.5 h-3.5 text-purple-600" />
                          <span>Profile & Wallet</span>
                        </button>

                        <button
                          onClick={() => {
                            setCurrentScreen('main');
                            setActiveTab('bookings');
                            setIsProfileMenuOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center gap-2.5 text-slate-700 font-medium"
                        >
                          <CalendarCheck className="w-3.5 h-3.5 text-purple-600" />
                          <span>My Reservations ({bookingsList.length})</span>
                        </button>

                        <button
                          onClick={() => {
                            setCurrentScreen('main');
                            setActiveTab('saved');
                            setIsProfileMenuOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center gap-2.5 text-slate-700 font-medium"
                        >
                          <Heart className="w-3.5 h-3.5 text-rose-500" />
                          <span>Saved Wishlist ({savedHotelIds.length})</span>
                        </button>

                        <button
                          onClick={() => {
                            setCurrentScreen('main');
                            setActiveTab('deals');
                            setActiveCategory('deals');
                            setIsProfileMenuOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center gap-2.5 text-slate-700 font-medium"
                        >
                          <Tag className="w-3.5 h-3.5 text-purple-600" />
                          <span>Special Deals & Passes</span>
                        </button>

                        <button
                          onClick={() => {
                            setCurrentScreen('main');
                            setActiveTab('admin');
                            setActiveCategory('admin');
                            setIsProfileMenuOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center gap-2.5 text-slate-700 font-medium"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Host / Partner Dashboard</span>
                        </button>

                        <button
                          onClick={() => {
                            setCurrentScreen('welcome');
                            setIsProfileMenuOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center gap-2.5 text-slate-700 font-medium"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span>Preview Welcome Splash</span>
                        </button>
                      </div>

                      <div className="pt-1 border-t border-slate-100">
                        <button
                          onClick={() => {
                            setAuthMode('login');
                            setCurrentScreen('auth');
                            setIsProfileMenuOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-rose-50 flex items-center gap-2.5 text-rose-600 font-bold"
                        >
                          <LogOut className="w-3.5 h-3.5 text-rose-500" />
                          <span>Sign Out / Switch Account</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* 2. MAIN WORKSPACE CONTAINER (Responsive: Switches naturally between boss's exact mobile design and Apple Vision Pro desktop) */}
      <main className="flex-1 w-full">
        {currentScreen === 'welcome' && (
          <WelcomeScreen
            onGetStarted={() => {
              setAuthMode('signup');
              setCurrentScreen('auth');
            }}
            onSignIn={() => {
              setAuthMode('login');
              setCurrentScreen('auth');
            }}
            onSelectCategory={() => {
              setAuthMode('signup');
              setCurrentScreen('auth');
            }}
          />
        )}

        {currentScreen === 'auth' && (
          <AuthScreen
            initialMode={authMode}
            onLoginSuccess={(userData) => {
              setUser(userData);
              setCurrentScreen('main');
              setActiveTab('home');
              setActiveCategory('hotels');
            }}
            onBack={() => setCurrentScreen('welcome')}
          />
        )}

        {currentScreen === 'main' && (
          <>
            {activeTab === 'home' && (
              <>
                {/* On mobile: Boss's exact Figma layout with Uyo header, Featured cards, Restaurants, Events */}
                <div className="block lg:hidden">
                  <MobileHomeScreen
                    user={user}
                    onSelectHotel={handleSelectHotel}
                    onSelectExplore={() => {
                      setActiveTab('explore');
                      setActiveCategory('map');
                    }}
                    onOpenStayDetails={() => {
                      setSelectedHotel(VYBE_DATA.hotels[0]);
                      setSelectedRoom(VYBE_DATA.hotels[0].rooms[0]);
                      setCurrentScreen('booking');
                    }}
                    onGoToWelcome={() => setCurrentScreen('welcome')}
                    onOpenAuth={() => {
                      setAuthMode('login');
                      setCurrentScreen('auth');
                    }}
                    savedIds={savedHotelIds}
                    onToggleSave={toggleSaveHotel}
                  />
                </div>

                {/* On desktop: Apple Vision Pro layout matching user's screenshots */}
                <div className="hidden lg:block">
                  <VisionProHome
                    user={user}
                    onSelectHotel={handleSelectHotel}
                    onSelectExplore={() => {
                      setActiveTab('explore');
                      setActiveCategory('map');
                    }}
                    savedIds={savedHotelIds}
                    onToggleSave={toggleSaveHotel}
                    activeCategory={activeCategory}
                    onSelectCategory={handleNavCategory}
                  />
                </div>
              </>
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
              <div className="max-w-2xl mx-auto px-4">
                <BookingsTab bookings={bookingsList} onSelectHotel={handleSelectHotel} />
              </div>
            )}

            {activeTab === 'saved' && (
              <div className="max-w-2xl mx-auto px-4">
                <SavedTab savedIds={savedHotelIds} onSelectHotel={handleSelectHotel} />
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="max-w-2xl mx-auto px-4">
                <ProfileTab user={user} onLogout={() => setCurrentScreen('auth')} />
              </div>
            )}
          </>
        )}

        {currentScreen === 'detail' && (
          <>
            {/* On mobile: Exact Motion Hotel screen from design images 8 & 14 */}
            <div className="block lg:hidden">
              <MobileDetailScreen
                hotel={selectedHotel}
                onBack={() => setCurrentScreen('main')}
                onProceedToBooking={handleProceedToBooking}
                isSaved={savedHotelIds.includes(selectedHotel.id)}
                onToggleSave={toggleSaveHotel}
              />
            </div>

            {/* On desktop: Wide split layout */}
            <div className="hidden lg:block">
              <VisionProDetail
                hotel={selectedHotel}
                onBack={() => setCurrentScreen('main')}
                onProceedToBooking={handleProceedToBooking}
                isSaved={savedHotelIds.includes(selectedHotel.id)}
                onToggleSave={toggleSaveHotel}
              />
            </div>
          </>
        )}

        {currentScreen === 'booking' && (
          <>
            {/* On mobile: Boss's exact Stay Details mobile layout */}
            <div className="block lg:hidden">
              <MobileStayCheckoutScreen
                hotel={selectedHotel}
                room={selectedRoom}
                onBack={() => setCurrentScreen('detail')}
                onProceedToPayment={handleBookingComplete}
              />
            </div>

            {/* On desktop: World-class Apple Vision Pro Checkout Experience */}
            <div className="hidden lg:block">
              <VisionProCheckout
                hotel={selectedHotel}
                room={selectedRoom}
                onBack={() => setCurrentScreen('detail')}
                onProceedToPayment={handleBookingComplete}
              />
            </div>
          </>
        )}

        {currentScreen === 'confirmation' && lastBooking && (
          <div className="max-w-2xl mx-auto px-4 py-6">
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

      {/* 3. BOSS'S EXACT MOBILE BOTTOM NAVIGATION DOCK (5 tabs from design screenshots: Home, Explore, Bookings, Saved, Profile) */}
      {currentScreen !== 'welcome' && currentScreen !== 'auth' && (
        <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-2xl border-t border-slate-200/90 py-2 px-3 z-50">
          <div className="flex items-center justify-around">
            {[
              { id: 'home', label: 'Home', icon: Home },
              { id: 'explore', label: 'Explore', icon: Compass },
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
                    isActive ? 'text-purple-600 font-bold scale-105' : 'text-slate-400'
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

      {/* 4. FOOTER (Desktop only) */}
      {currentScreen !== 'welcome' && currentScreen !== 'auth' && (
        <footer className="hidden lg:block border-t border-slate-200 py-14 px-6 mt-20 text-center text-xs text-slate-500 space-y-2 bg-[#fbfbfd]">
          <p className="font-semibold text-slate-800">
            VYBE • The Spatial Layer for City Discovery & Stays — Uyo, Akwa Ibom State, Nigeria
          </p>
          <p className="text-[11px] text-slate-400 leading-relaxed max-w-2xl mx-auto">
            All trademarks, verified establishments, room inventory, and local experiences adhere to the VYBE Master Product Specification.
          </p>
        </footer>
      )}
    </div>
  );
}
