import React, { useState } from 'react';
import {
  Users,
  Building2,
  CalendarCheck,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  ShieldCheck,
  TrendingUp,
  Search,
  Check,
  X
} from 'lucide-react';
import { VYBE_DATA } from '../data/vybeData';

export default function AdminPortalTab() {
  const [activeSubTab, setActiveSubTab] = useState('verifications');
  const [businesses, setBusinesses] = useState([
    {
      id: 'biz-1',
      name: 'Ewet Penthouse Suites',
      category: 'Hotels & Stays',
      manager: 'Emem Bassey',
      phone: '+234 803 999 1234',
      status: 'pending',
      date: 'Today, 10:14 AM',
      cacNumber: 'RC-1849204',
      address: 'Plot 12 Ewet Housing, Uyo'
    },
    {
      id: 'biz-2',
      name: 'The Palm Lounge & Grill',
      category: 'Nightlife & Dining',
      manager: 'Kufre Akpan',
      phone: '+234 812 555 7890',
      status: 'pending',
      date: 'Yesterday',
      cacNumber: 'RC-9981240',
      address: 'Nwaniba Road, Uyo'
    },
    {
      id: 'biz-3',
      name: 'Motion Hotel',
      category: 'Hotels',
      manager: 'Front Office Director',
      phone: '+234 803 123 4567',
      status: 'approved',
      date: 'Oct 02, 2026',
      cacNumber: 'RC-1140922',
      address: 'Udo Udoma Avenue, Uyo'
    }
  ]);

  const handleApprove = (id) => {
    setBusinesses(prev => prev.map(b => b.id === id ? { ...b, status: 'approved' } : b));
  };

  const handleReject = (id) => {
    setBusinesses(prev => prev.map(b => b.id === id ? { ...b, status: 'rejected' } : b));
  };

  return (
    <div className="space-y-12 pb-28 text-white max-w-6xl mx-auto px-4">
      {/* Top Admin Header */}
      <div className="border-b border-white/10 pb-8 flex flex-col sm:flex-row justify-between sm:items-end gap-6">
        <div>
          <span className="apple-eyebrow text-purple-400">Master Specification • Section 21 & 27</span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-1">
            Admin Verification & Analytics.
          </h1>
          <p className="text-base text-slate-400 mt-2">
            City verification queue, listings moderation & commerce metrics for Uyo.
          </p>
        </div>

        {/* Apple Subnav Style Controls */}
        <div className="flex gap-2 p-1.5 bg-[#161617] rounded-full border border-white/10 self-start sm:self-auto">
          {[
            { id: 'verifications', label: 'KYC & Verifications' },
            { id: 'metrics', label: 'North-Star Metrics' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                activeSubTab === tab.id
                  ? 'bg-white text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeSubTab === 'verifications' ? (
        /* Business KYC & Verification Queue */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white">
              Pending Partner Verifications ({businesses.filter(b => b.status === 'pending').length})
            </h3>
            <span className="text-xs text-slate-400">Physical & Corporate Registry review</span>
          </div>

          <div className="space-y-4">
            {businesses.map((biz) => (
              <div
                key={biz.id}
                className="apple-tile p-6 border border-white/10 bg-[#161617] flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3">
                    <h4 className="font-extrabold text-lg text-white">{biz.name}</h4>
                    <span className="px-3 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-slate-300">
                      {biz.category}
                    </span>
                    <span className={`px-3 py-0.5 rounded-full text-[10px] font-bold ${
                      biz.status === 'approved'
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30'
                        : biz.status === 'rejected'
                        ? 'bg-rose-950/80 text-rose-400 border border-rose-500/30'
                        : 'bg-amber-950/80 text-amber-400 border border-amber-500/30'
                    }`}>
                      {biz.status.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400">
                    Manager: <span className="text-slate-200 font-semibold">{biz.manager}</span> ({biz.phone}) • CAC: {biz.cacNumber}
                  </p>
                  <p className="text-xs text-slate-500">📍 {biz.address}</p>
                </div>

                {biz.status === 'pending' ? (
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <button
                      onClick={() => handleReject(biz.id)}
                      className="flex-1 md:flex-none px-5 py-2.5 rounded-full bg-white/10 hover:bg-rose-500/20 hover:text-rose-400 text-slate-300 text-xs font-bold transition-all"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleApprove(biz.id)}
                      className="apple-btn-purple flex-1 md:flex-none text-xs py-2.5 px-6 font-bold"
                    >
                      Approve & Verify
                    </button>
                  </div>
                ) : (
                  <span className="text-xs font-bold text-slate-500">Action logged</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Section 27 North-Star Metrics Dashboard */
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Weekly Active Users (WAU)', val: '14,820', change: '+24% this week', icon: Users },
              { label: 'Uyo Discovery Sessions', val: '62,490', change: '+38% repeat visits', icon: TrendingUp },
              { label: 'Gross Stays Booked', val: '₦18.4M', change: '84 confirmed rooms', icon: DollarSign },
              { label: 'Verified Businesses', val: '42', change: 'Hotels, dining & clubs', icon: Building2 },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="apple-tile p-6 border border-white/10 bg-[#161617] space-y-3">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold uppercase tracking-wider">{stat.label}</span>
                    <Icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="text-3xl font-black text-white">{stat.val}</div>
                  <div className="text-xs font-bold text-emerald-400">{stat.change}</div>
                </div>
              );
            })}
          </div>

          <div className="apple-tile p-8 border border-white/10 bg-[#161617] space-y-4">
            <h4 className="font-extrabold text-xl text-white">Uyo City Launch Readiness Checklist</h4>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-center gap-3 text-emerald-400">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span>Single-city initial launch (Uyo, Akwa Ibom) strictly configured to avoid market dilution.</span>
              </div>
              <div className="flex items-center gap-3 text-emerald-400">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span>Transparent rule-based ranking engine active before collecting behavioral training data.</span>
              </div>
              <div className="flex items-center gap-3 text-emerald-400">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span>Nigerian payment channels enabled (Cards, Bank Transfer, Paystack/Flutterwave ready, VYBE Wallet).</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
