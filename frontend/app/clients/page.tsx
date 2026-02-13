"use client";

import { useState } from "react";
import { Plus, TrendingUp, DollarSign, Users, MousePointer, Eye, ArrowUpRight, MoreVertical } from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  status: "active" | "paused" | "completed";
  budget: number;
  spent: number;
  conversions: number;
  clicks: number;
  impressions: number;
}

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Summer Sale 2026",
    status: "active",
    budget: 5000,
    spent: 2340,
    conversions: 156,
    clicks: 4520,
    impressions: 45000,
  },
  {
    id: "2",
    name: "New Product Launch",
    status: "active",
    budget: 10000,
    spent: 4500,
    conversions: 89,
    clicks: 2100,
    impressions: 28000,
  },
  {
    id: "3",
    name: "Holiday Promo",
    status: "paused",
    budget: 3000,
    spent: 3000,
    conversions: 234,
    clicks: 8900,
    impressions: 67000,
  },
];

export default function ClientsPage() {
  const [campaigns] = useState<Campaign[]>(mockCampaigns);

  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navigation */}
      <nav className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <a href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">DAAN</span>
              </a>
              <span className="text-slate-500">/</span>
              <span className="text-slate-300">Client Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-400">Welcome, Client</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Campaigns</h1>
            <p className="text-slate-400">Manage your marketing campaigns</p>
          </div>
          <button className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-lg font-medium transition-colors">
            <Plus className="w-5 h-5" />
            New Campaign
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              <span className="text-slate-400 text-sm">Total Budget</span>
            </div>
            <div className="text-2xl font-bold">${totalBudget.toLocaleString()}</div>
            <div className="text-sm text-slate-500">${totalSpent.toLocaleString()} spent</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              <span className="text-slate-400 text-sm">Conversions</span>
            </div>
            <div className="text-2xl font-bold">{totalConversions}</div>
            <div className="text-sm text-slate-500">{((totalConversions / totalClicks) * 100).toFixed(1)}% rate</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <MousePointer className="w-5 h-5 text-amber-400" />
              <span className="text-slate-400 text-sm">Clicks</span>
            </div>
            <div className="text-2xl font-bold">{totalClicks.toLocaleString()}</div>
            <div className="text-sm text-slate-500">{((totalClicks / campaigns.reduce((s, c) => s + c.impressions, 0)) * 100).toFixed(1)}% CTR</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Eye className="w-5 h-5 text-rose-400" />
              <span className="text-slate-400 text-sm">Impressions</span>
            </div>
            <div className="text-2xl font-bold">{campaigns.reduce((s, c) => s + c.impressions, 0).toLocaleString()}</div>
            <div className="text-sm text-slate-500">Total reach</div>
          </div>
        </div>

        {/* Campaigns Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-800/50">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-slate-400">Campaign</th>
                <th className="text-left p-4 text-sm font-medium text-slate-400">Status</th>
                <th className="text-right p-4 text-sm font-medium text-slate-400">Budget</th>
                <th className="text-right p-4 text-sm font-medium text-slate-400">Spent</th>
                <th className="text-right p-4 text-sm font-medium text-slate-400">Conversions</th>
                <th className="text-right p-4 text-sm font-medium text-slate-400">Clicks</th>
                <th className="text-right p-4 text-sm font-medium text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4">
                    <div className="font-medium">{campaign.name}</div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        campaign.status === "active"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : campaign.status === "paused"
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-slate-700 text-slate-400"
                      }`}
                    >
                      {campaign.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">${campaign.budget.toLocaleString()}</td>
                  <td className="p-4 text-right">${campaign.spent.toLocaleString()}</td>
                  <td className="p-4 text-right">{campaign.conversions}</td>
                  <td className="p-4 text-right">{campaign.clicks.toLocaleString()}</td>
                  <td className="p-4 text-right">
                    <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-slate-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Create Campaign Modal - Shown inline for MVP */}
        <div className="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6">Create New Campaign</h2>
          <form className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Campaign Name</label>
              <input
                type="text"
                placeholder="e.g., Summer Sale 2026"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Campaign Type</label>
              <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Sales (CPA)</option>
                <option>Leads</option>
                <option>Clicks (CPC)</option>
                <option>Impressions (CPM)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Budget (USDC)</label>
              <input
                type="number"
                placeholder="5000"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Reward per Conversion (USDC)</label>
              <input
                type="number"
                placeholder="10"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-400 mb-2">Campaign URL</label>
              <input
                type="url"
                placeholder="https://yourwebsite.com/product"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 py-3 rounded-lg font-semibold transition-colors"
              >
                Launch Campaign
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
