import React, { useState } from 'react';
import { 
  DollarSign, 
  Briefcase, 
  TrendingUp, 
  Plus, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Target, 
  FileText, 
  Lock,
  ArrowUpRight
} from 'lucide-react';
import { BrandDeal, IncomeRecord, CreatorGoal } from '../types';

interface BusinessTrackerProps {
  incomeRecords: IncomeRecord[];
  brandDeals: BrandDeal[];
  goals: CreatorGoal[];
  onAddDeal: (deal: BrandDeal) => void;
  onUpdateDealStatus: (dealId: string, status: BrandDeal['status']) => void;
}

export const BusinessTracker: React.FC<BusinessTrackerProps> = ({
  incomeRecords,
  brandDeals,
  goals,
  onAddDeal,
  onUpdateDealStatus
}) => {
  const [isAddingDeal, setIsAddingDeal] = useState(false);
  const [brandName, setBrandName] = useState('');
  const [dealValue, setDealValue] = useState(2500);
  const [deliverables, setDeliverables] = useState('');
  const [contactName, setContactName] = useState('');
  const [dueDate, setDueDate] = useState('');

  const totalIncome = incomeRecords.reduce((acc, r) => acc + r.amount, 0);
  const verifiedIncome = incomeRecords.filter(r => r.verified).reduce((acc, r) => acc + r.amount, 0);
  const estimatedIncome = incomeRecords.filter(r => !r.verified).reduce((acc, r) => acc + r.amount, 0);

  const activeDealsValue = brandDeals
    .filter(d => ['contract_signed', 'in_production', 'published', 'active', 'negotiating'].includes(d.status))
    .reduce((acc, d) => acc + (d.dealValue ?? d.payment ?? 0), 0);

  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName) return;

    const newDeal: BrandDeal = {
      id: `deal_${Date.now()}`,
      brandName,
      contactPerson: contactName || undefined,
      dealValue: Number(dealValue),
      currency: 'USD',
      deliverables: deliverables.split(',').map(s => s.trim()).filter(Boolean),
      status: 'contract_signed',
      dueDate: dueDate || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      payoutStatus: 'unpaid'
    };

    onAddDeal(newDeal);
    setIsAddingDeal(false);
    setBrandName('');
    setDeliverables('');
  };

  const getDealStatusBadge = (status: BrandDeal['status']) => {
    switch (status) {
      case 'pitched':
      case 'potential':
        return <span className="rounded bg-slate-500/20 text-slate-300 border border-slate-500/30 px-2 py-0.5 text-[10px] font-bold">Pitched</span>;
      case 'contract_signed':
      case 'negotiating':
        return <span className="rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 text-[10px] font-bold">Contract Signed</span>;
      case 'in_production':
      case 'active':
        return <span className="rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold">In Production</span>;
      case 'published':
      case 'awaiting_payment':
        return <span className="rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 text-[10px] font-bold">Published</span>;
      case 'paid':
      case 'completed':
        return <span className="rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold">Paid & Reconciled</span>;
      default:
        return <span className="rounded bg-slate-500/20 text-slate-300 border border-slate-500/30 px-2 py-0.5 text-[10px] font-bold">{status}</span>;
    }
  };

  return (
    <div className="space-y-6 font-sans pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <DollarSign className="h-4 w-4" /> Creator Business & CRM
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-400">Official vs Estimated Accounting</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Monetization & Brand Deals
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track multi-stream revenue, sponsorship deliverables, and progression toward your financial goals.
          </p>
        </div>

        <button
          onClick={() => setIsAddingDeal(true)}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-600/30 hover:opacity-95 transition"
        >
          <Plus className="h-4 w-4" />
          <span>New Brand Deal</span>
        </button>
      </div>

      {/* Revenue KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-white/10 bg-[#0c0e18] p-5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Total Monthly Revenue</span>
            <DollarSign className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-3xl font-extrabold text-white font-sans">
            ${totalIncome.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            5 Active Revenue Streams
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-xs font-medium flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" /> Official Verified Payouts
            </span>
            <span className="text-[10px] rounded bg-emerald-500/20 px-1.5 py-0.5 font-bold">API Verified</span>
          </div>
          <div className="mt-2 text-3xl font-extrabold text-white font-sans">
            ${verifiedIncome.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Connected via YouTube AdSense & Stripe
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0c0e18] p-5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Active Deal Pipeline</span>
            <Briefcase className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="mt-2 text-3xl font-extrabold text-white font-sans">
            ${activeDealsValue.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {brandDeals.filter(d => d.status !== 'paid').length} deals currently in flight
          </p>
        </div>
      </div>

      {/* Goal Progress Bars */}
      <div className="rounded-2xl border border-white/10 bg-[#0c0e18] p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Creator Milestone Progress</h3>
          </div>
          <span className="text-xs text-slate-400">Tracked in real time</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goals.map((g) => {
            const pct = Math.min(100, Math.round((g.currentValue / g.targetValue) * 100));
            return (
              <div key={g.id} className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-white">{g.title}</span>
                  <span className="text-cyan-400 font-semibold">{pct}% Complete</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500" style={{ width: `${pct}%` }} />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Current: {g.currentValue.toLocaleString()} {g.unit}</span>
                  <span>Goal: {g.targetValue.toLocaleString()} {g.unit}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Brand Deals CRM Table */}
      <div className="rounded-2xl border border-white/10 bg-[#0b0d18] overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">Sponsorship & Brand Deal Pipeline</h3>
            <p className="text-xs text-slate-400">Manage contracts, deliverables, publishing deadlines, and payouts.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 bg-white/[0.02] text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3">Sponsor / Brand</th>
                <th className="px-4 py-3">Contract Value</th>
                <th className="px-4 py-3">Deliverables</th>
                <th className="px-4 py-3">Workflow Status</th>
                <th className="px-4 py-3">Due Date</th>
                <th className="px-4 py-3 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {brandDeals.map((deal) => {
                const brandLabel = deal.brandName || deal.brand || 'Partner';
                const contactLabel = deal.contactPerson || deal.contactName;
                const valueNum = deal.dealValue ?? deal.payment ?? 0;
                const deliverablesList = Array.isArray(deal.deliverables)
                  ? deal.deliverables
                  : (typeof deal.deliverables === 'string' && deal.deliverables ? [deal.deliverables] : []);
                const dueStr = deal.dueDate || deal.deadline || 'TBD';

                return (
                  <tr key={deal.id} className="hover:bg-white/[0.02] transition">
                    <td className="px-6 py-3.5">
                      <span className="font-bold text-white text-xs">{brandLabel}</span>
                      {contactLabel && (
                        <div className="text-[10.5px] text-slate-400">{contactLabel}</div>
                      )}
                    </td>
                    <td className="px-4 py-3.5 font-bold text-emerald-400">
                      ${valueNum.toLocaleString()} {deal.currency}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex flex-wrap gap-1">
                        {deliverablesList.map((del, i) => (
                          <span key={i} className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-slate-300">
                            {del}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      {getDealStatusBadge(deal.status)}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-[11px] text-slate-400">
                      {dueStr}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <select
                        value={deal.status}
                        onChange={(e) => onUpdateDealStatus(deal.id, e.target.value as any)}
                        className="rounded-lg border border-white/10 bg-[#141724] px-2 py-1 text-[11px] text-white focus:border-cyan-500 focus:outline-none"
                      >
                        <option value="pitched">Pitched</option>
                        <option value="contract_signed">Contract Signed</option>
                        <option value="in_production">In Production</option>
                        <option value="published">Published</option>
                        <option value="paid">Paid</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Income Stream Breakdown with Official vs Estimated Labels */}
      <div className="rounded-2xl border border-white/10 bg-[#0b0d18] p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-white">Revenue Sources & Authentication Ledger</h3>
            <p className="text-xs text-slate-400">Clear visual distinction between official platform payouts and estimated offline income.</p>
          </div>
          <span className="text-xs text-emerald-400 font-mono">100% Isolated Data</span>
        </div>

        <div className="space-y-2.5">
          {incomeRecords.map((rec) => {
            const isVerified = rec.verified ?? (rec.labelType === 'official');
            const sourceTitle = rec.title || rec.source.replace(/_/g, ' ').toUpperCase();
            const periodStr = rec.period || rec.date || 'Recent Period';
            const amountNum = rec.amount || 0;

            return (
              <div
                key={rec.id}
                className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${isVerified ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                    <DollarSign className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{sourceTitle}</span>
                      {isVerified ? (
                        <span className="rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[9.5px] font-bold px-1.5 py-0.2">
                          Official Platform Verified
                        </span>
                      ) : (
                        <span className="rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[9.5px] font-bold px-1.5 py-0.2">
                          Estimated / User Entered
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400">{periodStr}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-extrabold text-white font-mono">
                    ${amountNum.toLocaleString()} {rec.currency}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Deal Modal */}
      {isAddingDeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl border border-white/15 bg-[#0e111d] p-6 shadow-2xl text-left">
            <h3 className="text-base font-bold text-white mb-1">Add Brand Deal to CRM</h3>
            <p className="text-xs text-slate-400 mb-4">Track sponsor communications and agreed deliverables.</p>

            <form onSubmit={handleCreateDeal} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Sponsor / Brand Name</label>
                <input
                  type="text"
                  placeholder="e.g. Supabase, Linear, Notion"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Deal Value (USD)</label>
                <input
                  type="number"
                  value={dealValue}
                  onChange={(e) => setDealValue(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Deliverables (Comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. 1x YouTube 60s Integration, 1x LinkedIn post"
                  value={deliverables}
                  onChange={(e) => setDeliverables(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingDeal(false)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2 text-xs font-bold text-white shadow-md hover:opacity-95"
                >
                  Add Brand Deal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
