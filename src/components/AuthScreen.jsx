import React, { useState } from 'react';
import { User, Phone, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, CreditCard, MapPin, ArrowLeft } from 'lucide-react';

export default function AuthScreen({ onLoginSuccess, onBack }) {
  const [isLogin, setIsLogin] = useState(false);
  const [accountType, setAccountType] = useState('personal'); // 'personal' | 'business'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Daniel Udoh',
    phone: '8031234567',
    email: 'daniel@vybe.ng',
    password: 'password123',
    businessName: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess({
      name: isLogin ? 'Daniel' : formData.name.split(' ')[0] || 'Daniel',
      email: formData.email,
      accountType,
    });
  };

  return (
    <div className="min-h-[92vh] flex flex-col justify-between p-6 bg-slate-900 text-slate-100 rounded-3xl md:rounded-[40px] relative overflow-hidden shadow-2xl">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-purple-600/20 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-600/20 blur-[90px] pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between pb-4">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/15 flex items-center justify-center text-white border border-white/10 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="text-center">
          <span className="text-2xl font-black tracking-tight text-white flex items-center gap-1 font-display">
            VYBE
            <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />
          </span>
          <span className="text-[10px] text-purple-300 tracking-wider uppercase block">Hotels • Stays • Experiences</span>
        </div>

        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Form Content */}
      <div className="relative z-10 my-auto py-4 max-w-md w-full mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {isLogin ? 'Welcome Back' : 'Create your account'}
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            {isLogin
              ? 'Sign in to access your bookings and saved places.'
              : 'Join VYBE to discover and book amazing places and experiences.'}
          </p>
        </div>

        {!isLogin && (
          <div className="grid grid-cols-2 p-1 bg-white/10 rounded-2xl mb-5 backdrop-blur-md border border-white/10">
            <button
              type="button"
              onClick={() => setAccountType('personal')}
              className={`py-2.5 text-xs font-bold rounded-xl transition-all ${
                accountType === 'personal'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Personal
            </button>
            <button
              type="button"
              onClick={() => setAccountType('business')}
              className={`py-2.5 text-xs font-bold rounded-xl transition-all ${
                accountType === 'business'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Business
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {!isLogin && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                placeholder={accountType === 'personal' ? 'Full Name' : 'Business / Organization Name'}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/5 border border-white/15 focus:border-purple-500 focus:bg-white/10 text-white placeholder-slate-400 text-sm outline-none transition-all"
              />
            </div>
          )}

          <div className="relative flex">
            <div className="flex items-center gap-1.5 px-3 py-3 rounded-l-2xl bg-white/10 border border-r-0 border-white/15 text-white text-xs font-medium">
              <span className="text-base leading-none">🇳🇬</span>
              <span>+234</span>
            </div>
            <input
              type="tel"
              required
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full pl-3 pr-4 py-3 rounded-r-2xl bg-white/5 border border-white/15 focus:border-purple-500 focus:bg-white/10 text-white placeholder-slate-400 text-sm outline-none transition-all"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              required
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/5 border border-white/15 focus:border-purple-500 focus:bg-white/10 text-white placeholder-slate-400 text-sm outline-none transition-all"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-10 pr-11 py-3 rounded-2xl bg-white/5 border border-white/15 focus:border-purple-500 focus:bg-white/10 text-white placeholder-slate-400 text-sm outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-[0_10px_20px_-5px_rgba(124,58,237,0.5)] flex items-center justify-center gap-2 transition-all active:scale-[0.98] mt-2"
          >
            <span>{isLogin ? 'Sign In' : 'Sign Up'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Social Logins */}
        <div className="mt-5 text-center">
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-white/10" />
            <span className="flex-shrink mx-4 text-[11px] text-slate-400">or continue with</span>
            <div className="flex-grow border-t border-white/10" />
          </div>

          <div className="grid grid-cols-3 gap-3 mt-3">
            {[
              { name: 'Google', icon: 'G' },
              { name: 'Apple', icon: '' },
              { name: 'Facebook', icon: 'f' },
            ].map((prov, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onLoginSuccess({ name: 'Daniel', email: 'daniel@vybe.ng', accountType })}
                className="py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
              >
                <span>{prov.icon}</span>
              </button>
            ))}
          </div>

          {/* Toggle between Login and Signup */}
          <p className="text-xs text-slate-400 mt-5">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-purple-400 font-bold hover:underline ml-1"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>

      {/* Trust Badges Bottom Card */}
      <div className="relative z-10 grid grid-cols-3 gap-2 p-3 rounded-2xl bg-white/5 border border-white/10 text-center max-w-md mx-auto w-full">
        <div className="flex flex-col items-center">
          <ShieldCheck className="w-4 h-4 text-emerald-400 mb-1" />
          <span className="text-[10px] font-semibold text-slate-200">Verified</span>
          <span className="text-[9px] text-slate-400">Businesses</span>
        </div>
        <div className="flex flex-col items-center border-x border-white/10">
          <CreditCard className="w-4 h-4 text-purple-400 mb-1" />
          <span className="text-[10px] font-semibold text-slate-200">Secure</span>
          <span className="text-[9px] text-slate-400">Payments</span>
        </div>
        <div className="flex flex-col items-center">
          <MapPin className="w-4 h-4 text-blue-400 mb-1" />
          <span className="text-[10px] font-semibold text-slate-200">Real-time</span>
          <span className="text-[9px] text-slate-400">Availability</span>
        </div>
      </div>
    </div>
  );
}
