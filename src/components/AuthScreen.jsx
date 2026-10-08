import React, { useState } from 'react';
import {
  User,
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  MapPin,
  ArrowLeft,
  ChevronDown,
  Sparkles,
  Check
} from 'lucide-react';

export default function AuthScreen({ onLoginSuccess, onBack, initialMode = 'signup' }) {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [accountType, setAccountType] = useState('personal'); // 'personal' | 'business'
  const [showPassword, setShowPassword] = useState(false);

  React.useEffect(() => {
    setIsLogin(initialMode === 'login');
  }, [initialMode]);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess({
      name: formData.fullName ? formData.fullName.split(' ')[0] : 'Daniel',
      email: formData.email || 'daniel@vybe.ng',
      accountType,
    });
  };

  const handleSocialAuth = (provider) => {
    onLoginSuccess({
      name: 'Daniel',
      email: `daniel.${provider.toLowerCase()}@vybe.ng`,
      accountType,
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#f5f5f7] text-[#1d1d1f] font-sans relative selection:bg-purple-600 selection:text-white">
      {/* ========================================================================= */}
      {/* 1. DESKTOP VIEWPORT: APPLE VISION PRO SPLIT STAGE                         */}
      {/* ========================================================================= */}
      <div className="hidden lg:flex min-h-screen">
        {/* Left Side: Cinematic Luxury Resort Visual & Spatial Trust Glass Card */}
        <div className="w-1/2 relative bg-slate-950 overflow-hidden flex flex-col justify-between p-12 text-white">
          <img
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1800&q=85"
            alt="Luxury Resort Stays in Uyo"
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.75] contrast-[1.1] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />
          <div className="absolute inset-0 bg-radial-at-tl from-purple-900/30 via-transparent to-transparent pointer-events-none" />

          {/* Top Left Branding */}
          <div className="relative z-10 flex items-center justify-between">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </button>

            <span className="text-[11px] font-bold uppercase tracking-widest text-purple-300 bg-white/10 px-3 py-1 rounded-full backdrop-blur-md border border-white/15">
              Uyo • Akwa Ibom State
            </span>
          </div>

          {/* Middle Copy */}
          <div className="relative z-10 max-w-lg space-y-4 my-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 text-xs font-semibold text-purple-300">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>One Unified Account</span>
            </div>

            <h1 className="text-4xl xl:text-5xl font-black text-white tracking-tight leading-tight">
              Your gateway to luxury stays & curated city experiences.
            </h1>

            <p className="text-slate-300 text-sm leading-relaxed">
              Create your account to unlock instant verified reservations, contactless QR front-desk check-in, and exclusive promotions across Uyo.
            </p>
          </div>

          {/* Floating Dark Glass Trust Card */}
          <div className="relative z-10 rounded-[28px] bg-black/60 backdrop-blur-2xl border border-white/15 p-5 shadow-2xl max-w-md">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center mb-1.5 border border-purple-500/30">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-xs text-white">Verified</span>
                <span className="text-[10px] text-slate-400">Businesses</span>
              </div>

              <div className="flex flex-col items-center border-x border-white/10 px-2">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center mb-1.5 border border-purple-500/30">
                  <CreditCard className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-xs text-white">Secure</span>
                <span className="text-[10px] text-slate-400">Payments</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center mb-1.5 border border-purple-500/30">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-xs text-white">Real-time</span>
                <span className="text-[10px] text-slate-400">Availability</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Clean Apple Vision Pro Form Card */}
        <div className="w-1/2 flex items-center justify-center p-12 bg-white overflow-y-auto">
          <div className="max-w-md w-full space-y-6">
            {/* Logo and Tagline */}
            <div>
              <div className="flex items-center">
                <span className="text-3xl font-black tracking-tight font-display text-slate-950">
                  V<span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Y</span>BE
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-500 mt-1">
                Discover. Book. Experience.
              </p>
              <div className="w-10 h-0.5 bg-purple-600 rounded-full mt-2" />
            </div>

            {/* Header */}
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {isLogin ? 'Welcome back to VYBE' : 'Create your account'}
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isLogin
                  ? 'Sign in to access your bookings, favorites, and passes.'
                  : 'Join VYBE to discover and book amazing places and experiences.'}
              </p>
            </div>

            {/* Account Type Segmented Switcher */}
            {!isLogin && (
              <div className="p-1 bg-slate-100 rounded-2xl flex gap-1">
                <button
                  type="button"
                  onClick={() => setAccountType('personal')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                    accountType === 'personal'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Personal
                </button>
                <button
                  type="button"
                  onClick={() => setAccountType('business')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                    accountType === 'business'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Business
                </button>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {!isLogin && (
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute inset-y-0 left-3.5 my-auto pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder={accountType === 'personal' ? 'Full Name' : 'Business Name'}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-all"
                  />
                </div>
              )}

              {/* Phone with Nigerian Flag Prefix */}
              <div className="flex rounded-2xl border border-slate-200 bg-white focus-within:border-purple-600 focus-within:ring-1 focus-within:ring-purple-600 transition-all overflow-hidden">
                <div className="flex items-center gap-1.5 px-3 py-3 bg-slate-50 border-r border-slate-200 text-slate-700 text-xs font-semibold flex-shrink-0">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-sm">🇳🇬</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                  <span>+234</span>
                </div>
                <input
                  type="tel"
                  required
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-3 pr-4 py-3 bg-transparent text-xs text-slate-900 placeholder-slate-400 outline-none"
                />
              </div>

              {/* Email Address */}
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute inset-y-0 left-3.5 my-auto pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-all"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute inset-y-0 left-3.5 my-auto pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-10 py-3 rounded-2xl border border-slate-200 bg-white text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Primary Action Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm shadow-md shadow-purple-600/30 flex items-center justify-center gap-2 active:scale-98 transition-all pt-3.5"
              >
                <span>{isLogin ? 'Sign In' : 'Sign Up'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Social Logins */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-[11px] font-medium text-slate-400">or continue with</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {/* Google */}
                <button
                  type="button"
                  onClick={() => handleSocialAuth('Google')}
                  className="py-2.5 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center active:scale-95 shadow-2xs"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                </button>

                {/* Apple */}
                <button
                  type="button"
                  onClick={() => handleSocialAuth('Apple')}
                  className="py-2.5 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center active:scale-95 shadow-2xs text-black"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 170 170">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.96-14.34-6.42-9.78-11.39-20.95-14.93-33.51-3.53-12.56-5.3-24.11-5.3-34.66 0-14.13 3.43-26.04 10.28-35.73 6.85-9.69 15.66-14.65 26.43-14.88 4.89 0 10.51 1.45 16.85 4.35 6.34 2.91 10.05 4.41 11.14 4.52 1.63-.44 5.68-2.12 12.14-5.06 6.46-2.94 12.04-4.24 16.74-3.91 12.83.65 23.37 5.76 31.63 15.33-11.09 6.74-16.52 16.09-16.3 28.05.22 9.35 3.91 17.29 11.09 23.81 7.18 6.53 15.87 10.11 26.09 10.76-2.18 6.53-4.68 13.05-7.5 19.57zM119.22 31.09c0-7.39 2.61-14.24 7.83-20.55 5.22-6.31 11.85-10.22 19.89-11.74.87 7.61-1.63 14.68-7.5 21.2-5.87 6.52-12.61 10.22-20.22 11.09z" />
                  </svg>
                </button>

                {/* Facebook */}
                <button
                  type="button"
                  onClick={() => handleSocialAuth('Facebook')}
                  className="py-2.5 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center active:scale-95 shadow-2xs"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Toggle Sign In / Sign Up */}
            <div className="text-center pt-2">
              <p className="text-xs text-slate-500">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-purple-600 font-bold hover:underline"
                >
                  {isLogin ? 'Create Account' : 'Sign In'}
                </button>
              </p>
            </div>

            {/* Terms */}
            <p className="text-[10px] text-slate-400 text-center leading-relaxed">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-purple-600 font-semibold hover:underline">Terms of Service</a>{' '}
              and{' '}
              <a href="#" className="text-purple-600 font-semibold hover:underline">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MOBILE VIEWPORT: EXACT 1-TO-1 MATCH OF BOSS'S UPLOADED SCREENSHOT       */}
      {/* ========================================================================= */}
      <div className="lg:hidden relative min-h-screen bg-white text-slate-900 overflow-x-hidden flex flex-col justify-between p-5 pt-8 pb-6">
        {/* Background Resort Image Peek (Top Right organic swoop) */}
        <div className="absolute top-0 right-0 w-44 h-80 overflow-hidden pointer-events-none rounded-bl-[100px] z-0">
          <img
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
            alt="Resort"
            className="w-full h-full object-cover filter brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white via-white/40" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 space-y-4">
          {/* Top Back & Brand Section */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-baseline text-4xl font-black tracking-tight font-display text-slate-950">
                <span>V</span>
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Y</span>
                <span>BE</span>
              </div>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">
                Discover. Book. Experience.
              </p>
              <div className="w-10 h-0.5 bg-purple-600 rounded-full mt-1.5" />
            </div>

            {onBack && (
              <button
                onClick={onBack}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Form Header */}
          <div className="space-y-1 pt-1">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {isLogin ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className="text-xs text-slate-500 leading-snug">
              {isLogin
                ? 'Sign in to access your bookings and saved places.'
                : 'Join VYBE to discover and book amazing places and experiences.'}
            </p>
          </div>

          {/* Account Type Toggle */}
          {!isLogin && (
            <div className="p-1 bg-slate-100 rounded-2xl flex gap-1">
              <button
                type="button"
                onClick={() => setAccountType('personal')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  accountType === 'personal'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600'
                }`}
              >
                Personal
              </button>
              <button
                type="button"
                onClick={() => setAccountType('business')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  accountType === 'business'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600'
                }`}
              >
                Business
              </button>
            </div>
          )}

          {/* Input Fields */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {!isLogin && (
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute inset-y-0 left-3.5 my-auto pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder={accountType === 'personal' ? 'Full Name' : 'Business Name'}
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-purple-600 shadow-2xs"
                />
              </div>
            )}

            {/* Phone with Nigerian Flag */}
            <div className="flex rounded-2xl border border-slate-200 bg-white shadow-2xs overflow-hidden focus-within:border-purple-600">
              <div className="flex items-center gap-1 px-3 py-3 bg-slate-50 border-r border-slate-200 text-slate-700 text-xs font-semibold flex-shrink-0">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-sm">🇳🇬</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
                <span>+234</span>
              </div>
              <input
                type="tel"
                required
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-3 pr-4 py-3 bg-transparent text-xs text-slate-900 placeholder-slate-400 outline-none"
              />
            </div>

            {/* Email Address */}
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute inset-y-0 left-3.5 my-auto pointer-events-none" />
              <input
                type="email"
                required
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-purple-600 shadow-2xs"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute inset-y-0 left-3.5 my-auto pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-10 py-3 rounded-2xl border border-slate-200 bg-white text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-purple-600 shadow-2xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3.5 flex items-center text-slate-400"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm shadow-md shadow-purple-600/30 flex items-center justify-center gap-2 active:scale-98 transition-all"
            >
              <span>{isLogin ? 'Sign In' : 'Sign Up'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Social Logins */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[11px] font-medium text-slate-400">or continue with</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {/* Google */}
              <button
                type="button"
                onClick={() => handleSocialAuth('Google')}
                className="py-2.5 rounded-2xl border border-slate-200 bg-white flex items-center justify-center active:scale-95 shadow-2xs"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              </button>

              {/* Apple */}
              <button
                type="button"
                onClick={() => handleSocialAuth('Apple')}
                className="py-2.5 rounded-2xl border border-slate-200 bg-white flex items-center justify-center active:scale-95 shadow-2xs text-black"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.96-14.34-6.42-9.78-11.39-20.95-14.93-33.51-3.53-12.56-5.3-24.11-5.3-34.66 0-14.13 3.43-26.04 10.28-35.73 6.85-9.69 15.66-14.65 26.43-14.88 4.89 0 10.51 1.45 16.85 4.35 6.34 2.91 10.05 4.41 11.14 4.52 1.63-.44 5.68-2.12 12.14-5.06 6.46-2.94 12.04-4.24 16.74-3.91 12.83.65 23.37 5.76 31.63 15.33-11.09 6.74-16.52 16.09-16.3 28.05.22 9.35 3.91 17.29 11.09 23.81 7.18 6.53 15.87 10.11 26.09 10.76-2.18 6.53-4.68 13.05-7.5 19.57zM119.22 31.09c0-7.39 2.61-14.24 7.83-20.55 5.22-6.31 11.85-10.22 19.89-11.74.87 7.61-1.63 14.68-7.5 21.2-5.87 6.52-12.61 10.22-20.22 11.09z" />
                </svg>
              </button>

              {/* Facebook */}
              <button
                type="button"
                onClick={() => handleSocialAuth('Facebook')}
                className="py-2.5 rounded-2xl border border-slate-200 bg-white flex items-center justify-center active:scale-95 shadow-2xs"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Sign In Toggle */}
          <div className="text-center pt-1">
            <p className="text-xs text-slate-500">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-purple-600 font-bold hover:underline"
              >
                {isLogin ? 'Create Account' : 'Sign In'}
              </button>
            </p>
          </div>

          {/* Legal */}
          <p className="text-[10px] text-slate-400 text-center leading-relaxed">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-purple-600 font-semibold">Terms of Service</a>{' '}
            and{' '}
            <a href="#" className="text-purple-600 font-semibold">Privacy Policy</a>.
          </p>
        </div>

        {/* Floating Trust Card (Bottom Right from Boss's Screenshot) */}
        <div className="fixed bottom-14 right-4 z-20 rounded-3xl bg-[#181924]/85 backdrop-blur-xl border border-white/15 p-3.5 shadow-2xl space-y-2.5 text-white max-w-[155px]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-300 flex-shrink-0">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-bold leading-tight">Verified Businesses</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-300 flex-shrink-0">
              <CreditCard className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-bold leading-tight">Secure Payments</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-300 flex-shrink-0">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-bold leading-tight">Real-time Availability</span>
          </div>
        </div>

        {/* 3 Pagination Carousel Dots (○ ● ○) */}
        <div className="flex items-center justify-center gap-2 pt-4">
          <span className="w-2 h-2 rounded-full bg-slate-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-purple-600 shadow-[0_0_8px_#9333ea]" />
          <span className="w-2 h-2 rounded-full bg-slate-300" />
        </div>

        {/* Footer Tagline */}
        <div className="text-center pt-1">
          <p className="text-xs font-semibold text-slate-500">
            Your City. Your{' '}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent font-extrabold">
              VYBE.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
