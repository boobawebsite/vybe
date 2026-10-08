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
    <div className="min-h-screen bg-white text-[#1d1d1f] flex flex-col justify-between selection:bg-purple-600 selection:text-white">
      {/* 1. DESKTOP APPLE GLOBAL NAV & SUBNAV (Visible on lg screens only when not on welcome screen) */}
      {currentScreen !== 'welcome' && (
        <div className="hidden lg:block">
          <div className="apple-globalnav text-xs text-[#1d1d1f] px-8 py-2.5">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-6">
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

                <button onClick={() => setCurrentScreen('welcome')} className="text-purple-600 font-bold hover:text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">First Page (Welcome)</button>
                <button onClick={() => { setCurrentScreen('main'); setActiveTab('home'); }} className="text-[#86868b] hover:text-[#1d1d1f]">Stays</button>
                <button onClick={() => { setCurrentScreen('main'); setActiveTab('explore'); }} className="text-[#86868b] hover:text-[#1d1d1f]">Living Map</button>
                <button onClick={() => { setCurrentScreen('main'); setActiveTab('deals'); }} className="text-[#86868b] hover:text-[#1d1d1f]">Deals</button>
                <button onClick={() => { setCurrentScreen('booking'); }} className="text-[#86868b] hover:text-[#1d1d1f]">Stay Details (Checkout)</button>
                <button onClick={() => { setCurrentScreen('main'); setActiveTab('bookings'); }} className="text-[#86868b] hover:text-[#1d1d1f]">Reservations ({bookingsList.length})</button>
                <button onClick={() => { setCurrentScreen('main'); setActiveTab('saved'); }} className="text-[#86868b] hover:text-[#1d1d1f]">Saved ({savedHotelIds.length})</button>
                <button onClick={() => { setCurrentScreen('main'); setActiveTab('admin'); }} className="text-[#86868b] hover:text-[#1d1d1f]">Admin Portal</button>
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

        {/* Desktop Sticky Apple Subnav (Visible on main discovery & detail screens) */}
        {currentScreen !== 'booking' && currentScreen !== 'confirmation' && (
          <header className="sticky top-0 z-50 px-8 py-3.5 apple-subnav">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div
                onClick={() => {
                  setCurrentScreen('main');
                  setActiveTab('home');
                }}
                className="cursor-pointer"
              >
                <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">
                  {selectedHotel.name}
                </h2>
              </div>

              <div className="flex items-center gap-7">
                <nav className="flex items-center gap-6 text-xs font-normal text-[#1d1d1f]">
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

                <div className="flex items-center gap-3">
                  <div className="apple-btn-outline text-xs py-1.5 px-4 cursor-default">
                    ₦{selectedHotel.pricePerNight.toLocaleString()} / night
                  </div>

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
        )}
      </div>
      )}

      {/* 2. MAIN WORKSPACE CONTAINER (Responsive: Switches naturally between boss's exact mobile design and Apple Vision Pro desktop) */}
      <main className="flex-1 w-full">
        {currentScreen === 'welcome' && (
          <WelcomeScreen
            onGetStarted={() => setCurrentScreen('main')}
            onSignIn={() => setCurrentScreen('auth')}
            onSelectCategory={(catId) => {
              setCurrentScreen('main');
              setActiveTab(catId === 'shops' ? 'explore' : 'home');
            }}
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
              <>
                {/* On mobile: Boss's exact Figma layout with Uyo header, Featured cards, Restaurants, Events */}
                <div className="block lg:hidden">
                  <MobileHomeScreen
                    user={user}
                    onSelectHotel={handleSelectHotel}
                    onSelectExplore={() => setActiveTab('explore')}
                    onOpenStayDetails={() => {
                      setSelectedHotel(VYBE_DATA.hotels[0]);
                      setSelectedRoom(VYBE_DATA.hotels[0].rooms[0]);
                      setCurrentScreen('booking');
                    }}
                    onGoToWelcome={() => setCurrentScreen('welcome')}
                    savedIds={savedHotelIds}
                    onToggleSave={toggleSaveHotel}
                  />
                </div>

                {/* On desktop: Apple Vision Pro layout matching user's screenshots */}
                <div className="hidden lg:block">
                  <VisionProHome
                    user={user}
                    onSelectHotel={handleSelectHotel}
                    onSelectExplore={() => setActiveTab('explore')}
                    savedIds={savedHotelIds}
                    onToggleSave={toggleSaveHotel}
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
      {currentScreen !== 'welcome' && (
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
      {currentScreen !== 'welcome' && (
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
