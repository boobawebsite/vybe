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
    <div className="space-y-12 pb-28 text-slate-900 max-w-6xl mx-auto px-4">
      {/* Top Admin Header */}
      <div className="border-b border-slate-200 pb-8 flex flex-col sm:flex-row justify-between sm:items-end gap-6">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-purple-600 block">
            Host & Business Portal
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mt-1">
            Verification & Analytics
          </h1>
          <p className="text-base text-slate-600 mt-2">
            City verification queue, listings moderation & commerce metrics for Uyo.
          </p>
        </div>

        {/* Subnav Style Controls */}
        <div className="flex gap-2 p-1.5 bg-slate-100 rounded-full border border-slate-200 self-start sm:self-auto">
          {[
            { id: 'verifications', label: 'KYC & Verifications' },
            { id: 'metrics', label: 'North-Star Metrics' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                activeSubTab === tab.id
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
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
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Pending Partner Verifications ({businesses.filter(b => b.status === 'pending').length})
            </h3>
            <span className="text-xs text-slate-500 font-medium">Physical & Corporate Registry review</span>
          </div>

          <div className="space-y-4">
            {businesses.map((biz) => (
              <div
                key={biz.id}
                className="rounded-3xl p-6 border border-slate-200 bg-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-slate-300 transition-all"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h4 className="font-extrabold text-lg text-slate-900">{biz.name}</h4>
                    <span className="px-3 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-700">
                      {biz.category}
                    </span>
                    <span className={`px-3 py-0.5 rounded-full text-[10px] font-bold ${
                      biz.status === 'approved'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : biz.status === 'rejected'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {biz.status.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600">
                    Manager: <span className="text-slate-900 font-semibold">{biz.manager}</span> ({biz.phone}) • CAC: {biz.cacNumber}
                  </p>
                  <p className="text-xs text-slate-500">📍 {biz.address}</p>
                </div>

                {biz.status === 'pending' ? (
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <button
                      onClick={() => handleReject(biz.id)}
                      className="flex-1 md:flex-none px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 text-xs font-bold transition-all border border-slate-200"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleApprove(biz.id)}
                      className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs active:scale-95 transition-all"
                    >
                      Approve & Verify
                    </button>
                  </div>
                ) : (
                  <span className="text-xs font-bold text-slate-400">Action logged</span>
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
                <div key={i} className="rounded-3xl p-6 border border-slate-200 bg-white shadow-sm space-y-3">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="text-xs font-semibold uppercase tracking-wider">{stat.label}</span>
                    <Icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-3xl font-black text-slate-900">{stat.val}</div>
                  <div className="text-xs font-bold text-emerald-600">{stat.change}</div>
                </div>
              );
            })}
          </div>

          <div className="rounded-3xl p-8 border border-slate-200 bg-white shadow-sm space-y-4">
            <h4 className="font-black text-xl text-slate-900 tracking-tight">Uyo City Launch Readiness Checklist</h4>
            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex items-center gap-3 text-emerald-600">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span>Single-city initial launch (Uyo, Akwa Ibom) strictly configured to avoid market dilution.</span>
              </div>
              <div className="flex items-center gap-3 text-emerald-600">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span>Transparent rule-based ranking engine active before collecting behavioral training data.</span>
              </div>
              <div className="flex items-center gap-3 text-emerald-600">
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
