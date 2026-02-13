"use client";

import { useState, useEffect } from "react";
import { Plus, TrendingUp, DollarSign, Users, MousePointer, Eye, ArrowUpRight, MoreVertical, Loader2 } from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  status: "active" | "paused" | "completed";
  budget: number;
  spent: number;
  conversions: number;
  clicks: number;
  impressions: number;
  type: string;
  reward: number;
  url: string;
}

export default function ClientsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "sales",
    budget: "",
    reward: "",
    url: ""
  });

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await fetch('/api/campaigns');
      const data = await res.json();
      setCampaigns(data);
    } catch (error) {
      console.error('Failed to fetch campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          type: formData.type,
          budget: parseFloat(formData.budget),
          reward: parseFloat(formData.reward),
          url: formData.url,
          client: "Demo Client"
        })
      });
      
      if (res.ok) {
        const newCampaign = await res.json();
        setCampaigns([...campaigns, newCampaign]);
        setFormData({ name: "", type: "sales", budget: "", reward: "", url: "" });
      }
    } catch (error) {
      console.error('Failed to create campaign:', error);
    } finally {
      setSubmitting(false);
    }
  };

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
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
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
            <div className="text-sm text-slate-500">{totalClicks > 0 ? ((totalConversions / totalClicks) * 100).toFixed(1) : 0}% rate</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <MousePointer className="w-5 h-5 text-amber-400" />
              <span className="text-slate-400 text-sm">Clicks</span>
            </div>
            <div className="text-2xl font-bold">{totalClicks.toLocaleString()}</div>
            <div className="text-sm text-slate-500">{campaigns.length} campaigns</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Eye className="w-5 h-5 text-rose-400" />
              <span className="text-slate-400 text-sm">Active</span>
            </div>
            <div className="text-2xl font-bold">{campaigns.filter(c => c.status === 'active').length}</div>
            <div className="text-sm text-slate-500">of {campaigns.length} campaigns</div>
          </div>
        </div>

        {/* Create Campaign */}
        <div className="mb-8 bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6">Create New Campaign</h2>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Campaign Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="e.g., Summer Sale 2026"
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Campaign Type</label>
              <select
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="sales">Sales (CPA)</option>
                <option value="leads">Leads</option>
                <option value="cpc">Clicks (CPC)</option>
                <option value="cpm">Impressions (CPM)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Budget (USDC)</label>
              <input
                type="number"
                value={formData.budget}
                onChange={e => setFormData({...formData, budget: e.target.value})}
                placeholder="5000"
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Reward per Conversion (USDC)</label>
              <input
                type="number"
                value={formData.reward}
                onChange={e => setFormData({...formData, reward: e.target.value})}
                placeholder="10"
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-400 mb-2">Campaign URL</label>
              <input
                type="url"
                value={formData.url}
                onChange={e => setFormData({...formData, url: e.target.value})}
                placeholder="https://yourwebsite.com/product"
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-600/50 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Launch Campaign
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Campaigns Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-800">
            <h3 className="font-semibold">Your Campaigns</h3>
          </div>
          {loading ? (
            <div className="p-8 text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-500" />
            </div>
          ) : campaigns.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No campaigns yet. Create one above!
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-slate-400">Campaign</th>
                  <th className="text-left p-4 text-sm font-medium text-slate-400">Type</th>
                  <th className="text-left p-4 text-sm font-medium text-slate-400">Status</th>
                  <th className="text-right p-4 text-sm font-medium text-slate-400">Budget</th>
                  <th className="text-right p-4 text-sm font-medium text-slate-400">Spent</th>
                  <th className="text-right p-4 text-sm font-medium text-slate-400">Conv.</th>
                  <th className="text-right p-4 text-sm font-medium text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4">
                      <div className="font-medium">{campaign.name}</div>
                      <div className="text-xs text-slate-500 truncate max-w-[200px]">{campaign.url}</div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-slate-400 uppercase">{campaign.type}</span>
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
                    <td className="p-4 text-right">
                      <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4 text-slate-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
