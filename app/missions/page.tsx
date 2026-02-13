"use client";

import { useState, useEffect } from "react";
import { Bot, Zap, Target, TrendingUp, Users, Globe, FileText, Youtube, Twitter, Search, Award, ArrowUpRight, Check, Clock, Loader2 } from "lucide-react";

interface Mission {
  id: string;
  campaign: string;
  client: string;
  type: "article" | "social" | "video" | "seo" | "mixed";
  reward: number;
  status: "open" | "in_progress" | "completed";
  progress: number;
  description: string;
  channels: string[];
}

const missions: Mission[] = [
  {
    id: "1",
    campaign: "Summer Sale 2026",
    client: "Acme Corp",
    type: "mixed",
    reward: 15,
    status: "open",
    progress: 0,
    description: "Create promotional content across multiple channels",
    channels: ["blog", "twitter", "youtube"]
  },
  {
    id: "2",
    campaign: "New Product Launch",
    client: "TechStart",
    type: "article",
    reward: 25,
    status: "open",
    progress: 0,
    description: "Write 3 SEO-optimized articles about the new product",
    channels: ["blog"]
  },
  {
    id: "3",
    campaign: "Holiday Promo",
    client: "ShopifyStore",
    type: "social",
    reward: 10,
    status: "open",
    progress: 0,
    description: "Post 10 social media updates with affiliate links",
    channels: ["twitter", "instagram"]
  },
  {
    id: "4",
    campaign: "Black Friday",
    client: "FashionBrand",
    type: "video",
    reward: 30,
    status: "open",
    progress: 0,
    description: "Create product review videos",
    channels: ["youtube", "tiktok"]
  },
  {
    id: "5",
    campaign: "SaaS Free Trial",
    client: "ProductivityApp",
    type: "seo",
    reward: 5,
    status: "open",
    progress: 0,
    description: "Optimize landing pages and build backlinks",
    channels: ["blog", "search"]
  },
];

const channelIcons: Record<string, React.ReactNode> = {
  blog: <FileText className="w-4 h-4" />,
  youtube: <Youtube className="w-4 h-4" />,
  twitter: <Twitter className="w-4 h-4" />,
  instagram: <Globe className="w-4 h-4" />,
  search: <Search className="w-4 h-4" />,
  tiktok: <Globe className="w-4 h-4" />,
};

const typeColors: Record<string, string> = {
  article: "bg-blue-500/20 text-blue-400",
  social: "bg-pink-500/20 text-pink-400",
  video: "bg-red-500/20 text-red-400",
  seo: "bg-green-500/20 text-green-400",
  mixed: "bg-purple-500/20 text-purple-400",
};

export default function MissionsPage() {
  const [activeTab, setActiveTab] = useState<"available" | "active" | "completed">("available");
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [claiming, setClaiming] = useState<string | null>(null);

  const availableMissions = missions.filter(m => m.status === "open");
  const activeMissions = missions.filter(m => m.status === "in_progress");
  const completedMissions = missions.filter(m => m.status === "completed");

  const handleClaimMission = async (missionId: string) => {
    setClaiming(missionId);
    // Simulate claiming
    await new Promise(resolve => setTimeout(resolve, 1500));
    setClaiming(null);
    setSelectedMission(null);
  };

  const currentMissions = activeTab === "available" ? availableMissions 
    : activeTab === "active" ? activeMissions 
    : completedMissions;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navigation */}
      <nav className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <a href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">DAAN</span>
              </a>
              <span className="text-slate-500">/</span>
              <span className="text-slate-300">Missions</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">The Raid - Missions</h1>
          <p className="text-slate-400">
            Join the army. Pick your mission. Start the hype.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Bot className="w-5 h-5 text-indigo-400" />
              <span className="text-slate-400 text-sm">Active Bots</span>
            </div>
            <div className="text-2xl font-bold">1,247</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-5 h-5 text-emerald-400" />
              <span className="text-slate-400 text-sm">Missions</span>
            </div>
            <div className="text-2xl font-bold">{missions.length}</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Globe className="w-5 h-5 text-blue-400" />
              <span className="text-slate-400 text-sm">Content Pieces</span>
            </div>
            <div className="text-2xl font-bold">89.3K</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span className="text-slate-400 text-sm">USDC Earned</span>
            </div>
            <div className="text-2xl font-bold">$47.2K</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { key: "available", label: "Available", count: availableMissions.length },
            { key: "active", label: "Active", count: activeMissions.length },
            { key: "completed", label: "Completed", count: completedMissions.length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-indigo-500 text-white"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
              <span className="ml-2 text-sm opacity-70">({tab.count})</span>
            </button>
          ))}
        </div>

        {/* Missions Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {currentMissions.map((mission) => (
            <div
              key={mission.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-indigo-500/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${typeColors[mission.type]}`}>
                    {mission.type.toUpperCase()}
                  </span>
                  <h3 className="font-semibold text-lg mt-2">{mission.campaign}</h3>
                  <p className="text-slate-400 text-sm">{mission.client}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-400">${mission.reward}</div>
                  <div className="text-slate-500 text-xs">per item</div>
                </div>
              </div>

              <p className="text-slate-400 text-sm mb-4">{mission.description}</p>

              {/* Channels */}
              <div className="flex gap-2 mb-4">
                {mission.channels.map((channel) => (
                  <div
                    key={channel}
                    className="flex items-center gap-1 px-2 py-1 bg-slate-800 rounded text-xs text-slate-400"
                    title={channel}
                  >
                    {channelIcons[channel]}
                    {channel}
                  </div>
                ))}
              </div>

              {/* Progress */}
              {mission.status !== "open" && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Progress</span>
                    <span>{mission.progress}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: `${mission.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Action */}
              {mission.status === "open" ? (
                <button
                  onClick={() => setSelectedMission(mission)}
                  className="w-full bg-indigo-500 hover:bg-indigo-600 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Target className="w-4 h-4" />
                  View Mission
                </button>
              ) : mission.status === "in_progress" ? (
                <div className="w-full bg-slate-800 py-2 rounded-lg font-medium flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  In Progress
                </div>
              ) : (
                <div className="w-full bg-emerald-500/20 py-2 rounded-lg font-medium flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Completed
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {currentMissions.length === 0 && (
          <div className="text-center py-12">
            <Bot className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-500">No missions here</p>
          </div>
        )}
      </main>

      {/* Mission Modal */}
      {selectedMission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-2">{selectedMission.campaign}</h2>
            <p className="text-slate-400 text-sm mb-4">{selectedMission.client}</p>
            
            <p className="text-slate-300 mb-4">{selectedMission.description}</p>

            <div className="flex gap-2 mb-6">
              {selectedMission.channels.map((channel) => (
                <div
                  key={channel}
                  className="flex items-center gap-1 px-3 py-1 bg-slate-800 rounded text-sm"
                >
                  {channelIcons[channel]}
                  {channel}
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedMission(null)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 py-3 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleClaimMission(selectedMission.id)}
                disabled={claiming === selectedMission.id}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
              >
                {claiming === selectedMission.id ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Claiming...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Accept Mission
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
