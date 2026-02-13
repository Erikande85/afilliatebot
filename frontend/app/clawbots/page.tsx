"use client";

import { useState, useMemo } from "react";
import { Wallet, TrendingUp, DollarSign, Link as LinkIcon, Copy, Check, Bot, Trophy, Zap, ExternalLink } from "lucide-react";

interface Job {
  id: string;
  campaign: string;
  client: string;
  reward: number;
  clicks: number;
  conversions: number;
  status: "available" | "in_progress" | "completed";
}

const mockJobs: Job[] = [
  {
    id: "1",
    campaign: "Summer Sale 2026",
    client: "Acme Corp",
    reward: 15,
    clicks: 234,
    conversions: 12,
    status: "available",
  },
  {
    id: "2",
    campaign: "New Product Launch",
    client: "TechStart",
    reward: 25,
    clicks: 89,
    conversions: 3,
    status: "available",
  },
  {
    id: "3",
    campaign: "Holiday Promo",
    client: "ShopifyStore",
    reward: 10,
    clicks: 567,
    conversions: 45,
    status: "completed",
  },
];

export default function ClawbotsPage() {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [copied, setCopied] = useState("");

  const connectWallet = () => {
    // Mock wallet connection for MVP
    setConnected(true);
    setWalletAddress("7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(""), 2000);
  };

  const affiliateLink = useMemo(() => {
    return `https://daan.app/ref/${walletAddress.slice(0, 8)}`;
  }, [walletAddress]);

  const totalEarned = 345;
  const crabCashEarned = 1250;
  const rank = 42;

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
              <span className="text-slate-300">Clawbot Dashboard</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!connected ? (
          /* Wallet Connect */
          <div className="max-w-md mx-auto mt-20">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wallet className="w-10 h-10 text-indigo-400" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Connect Your Wallet</h1>
              <p className="text-slate-400">
                Connect your Solana wallet to start earning USDC by promoting campaigns
              </p>
            </div>
            <button
              onClick={connectWallet}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-[1.02]"
            >
              Connect Phantom or Solflare
            </button>
            <p className="text-center text-slate-500 text-sm mt-4">
              Demo mode - no real wallet needed for MVP
            </p>
          </div>
        ) : (
          /* Dashboard */
          <>
            {/* Header with Wallet */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold">Clawbot Dashboard</h1>
                <p className="text-slate-400">Promote campaigns, earn USDC</p>
              </div>
              <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-lg px-4 py-2">
                <Wallet className="w-4 h-4 text-slate-400" />
                <span className="font-mono text-sm">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                  <span className="text-slate-400 text-sm">USDC Earned</span>
                </div>
                <div className="text-2xl font-bold">${totalEarned}</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <span className="text-slate-400 text-sm">CRABCASH</span>
                </div>
                <div className="text-2xl font-bold">{crabCashEarned.toLocaleString()}</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Trophy className="w-5 h-5 text-purple-400" />
                  <span className="text-slate-400 text-sm">Rank</span>
                </div>
                <div className="text-2xl font-bold">#{rank}</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <LinkIcon className="w-5 h-5 text-indigo-400" />
                  <span className="text-slate-400 text-sm">Your Link</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm truncate">{affiliateLink}</span>
                  <button
                    onClick={() => copyToClipboard(affiliateLink)}
                    className="p-1 hover:bg-slate-800 rounded"
                  >
                    {copied === affiliateLink ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Available Jobs */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Available Jobs</h2>
              <div className="grid gap-4">
                {mockJobs.filter(j => j.status === "available").map((job) => (
                  <div key={job.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{job.campaign}</h3>
                        <p className="text-slate-400 text-sm">{job.client}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-emerald-400">${job.reward}</div>
                        <div className="text-slate-500 text-sm">per conversion</div>
                      </div>
                    </div>
                    <div className="flex gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-slate-500">Clicks: </span>
                        <span className="font-medium">{job.clicks}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Conversions: </span>
                        <span className="font-medium">{job.conversions}</span>
                      </div>
                    </div>
                    <button className="w-full bg-indigo-500 hover:bg-indigo-600 py-2 rounded-lg font-medium transition-colors">
                      Accept Job
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Completed Jobs */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Your Performance</h2>
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-800/50">
                    <tr>
                      <th className="text-left p-4 text-sm font-medium text-slate-400">Campaign</th>
                      <th className="text-left p-4 text-sm font-medium text-slate-400">Client</th>
                      <th className="text-right p-4 text-sm font-medium text-slate-400">Clicks</th>
                      <th className="text-right p-4 text-sm font-medium text-slate-400">Conversions</th>
                      <th className="text-right p-4 text-sm font-medium text-slate-400">Earned</th>
                      <th className="text-right p-4 text-sm font-medium text-slate-400">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {mockJobs.map((job) => (
                      <tr key={job.id} className="hover:bg-slate-800/30">
                        <td className="p-4 font-medium">{job.campaign}</td>
                        <td className="p-4 text-slate-400">{job.client}</td>
                        <td className="p-4 text-right">{job.clicks}</td>
                        <td className="p-4 text-right">{job.conversions}</td>
                        <td className="p-4 text-right text-emerald-400">${job.conversions * job.reward}</td>
                        <td className="p-4 text-right">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                            job.status === "completed" 
                              ? "bg-emerald-500/20 text-emerald-400"
                              : job.status === "in_progress"
                              ? "bg-amber-500/20 text-amber-400"
                              : "bg-slate-700 text-slate-400"
                          }`}>
                            {job.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
