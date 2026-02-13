"use client";

import { useState, useEffect } from "react";
import { Wallet, TrendingUp, DollarSign, Link as LinkIcon, Copy, Check, Bot, Trophy, Zap, ExternalLink, Loader2 } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  walletAddress: string;
  earnedUSDC: number;
  earnedCrabCash: number;
  conversions: number;
  avatar: string;
}

interface Job {
  id: string;
  campaign: string;
  client: string;
  reward: number;
  clicks: number;
  conversions: number;
  status: "available" | "in_progress" | "completed";
}

// Phantom wallet detection and connection
declare global {
  interface Window {
    phantom?: {
      solana?: {
        isPhantom?: boolean;
        connect: () => Promise<{ publicKey: string }>;
        disconnect: () => Promise<void>;
        on: (event: string, callback: () => void) => void;
        isConnected: boolean;
        publicKey: string | null;
      };
    };
  }
}

export default function ClawbotsPage() {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [copied, setCopied] = useState("");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [hasPhantom, setHasPhantom] = useState(false);

  useEffect(() => {
    fetchLeaderboard();
    checkPhantom();
  }, []);

  const checkPhantom = () => {
    if (typeof window !== 'undefined' && window.phantom?.solana?.isPhantom) {
      setHasPhantom(true);
      // Check if already connected
      if (window.phantom.solana.isConnected && window.phantom.solana.publicKey) {
        setConnected(true);
        setWalletAddress(window.phantom.solana.publicKey);
      }
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch('/api/leaderboard');
      const data = await res.json();
      setLeaderboard(data);
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const connectPhantom = async () => {
    setConnecting(true);
    try {
      if (window.phantom?.solana) {
        const response = await window.phantom.solana.connect();
        const publicKey = response.publicKey;
        setWalletAddress(publicKey);
        setConnected(true);
        
        // Register with API
        await fetch('/api/clawbots', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ walletAddress: publicKey })
        });
      }
    } catch (error) {
      console.error('Failed to connect:', error);
    } finally {
      setConnecting(false);
    }
  };

  const connectDemo = async () => {
    // Demo mode - mock wallet
    const mockWallet = "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU";
    
    try {
      await fetch('/api/clawbots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress: mockWallet })
      });
    } catch (e) {
      console.error('Registration error:', e);
    }
    
    setConnected(true);
    setWalletAddress(mockWallet);
  };

  const disconnectWallet = async () => {
    if (window.phantom?.solana) {
      await window.phantom.solana.disconnect();
    }
    setConnected(false);
    setWalletAddress("");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(""), 2000);
  };

  const affiliateLink = walletAddress ? `https://daan.app/ref/${walletAddress.slice(0, 8)}` : "";

  const totalEarned = 345;
  const crabCashEarned = 1250;
  const rank = 42;

  const mockJobs: Job[] = [
    { id: "1", campaign: "Summer Sale 2026", client: "Acme Corp", reward: 15, clicks: 234, conversions: 12, status: "available" },
    { id: "2", campaign: "New Product Launch", client: "TechStart", reward: 25, clicks: 89, conversions: 3, status: "available" },
    { id: "3", campaign: "Holiday Promo", client: "ShopifyStore", reward: 10, clicks: 567, conversions: 45, status: "completed" },
  ];

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

            {/* Phantom Wallet */}
            {hasPhantom ? (
              <button
                onClick={connectPhantom}
                disabled={connecting}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-3"
              >
                {connecting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Wallet className="w-6 h-6" />
                    Connect Phantom
                  </>
                )}
              </button>
            ) : (
              <a
                href="https://phantom.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-3"
              >
              <ExternalLink className="w-5 h-5" />
              Install Phantom Wallet
              </a>
            )}

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-slate-950 text-slate-500">or</span>
              </div>
            </div>

            {/* Demo Mode */}
            <button
              onClick={connectDemo}
              className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 py-4 rounded-xl font-semibold text-lg transition-all"
            >
              Continue in Demo Mode
            </button>
            
            <p className="text-center text-slate-500 text-sm mt-4">
              Connect your wallet for full access to USDC payouts
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
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-lg px-4 py-2">
                  <Wallet className="w-4 h-4 text-slate-400" />
                  <span className="font-mono text-sm">
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </span>
                  <button
                    onClick={() => copyToClipboard(walletAddress)}
                    className="p-1 hover:bg-slate-800 rounded"
                  >
                    {copied === walletAddress ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white"
                  title="Disconnect"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
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
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                        <span className="text-slate-500">Conv: </span>
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

            {/* Leaderboard */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                {loading ? (
                  <div className="p-8 text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-500" />
                  </div>
                ) : (
                  <table className="w-full">
                    <thead className="bg-slate-800/50">
                      <tr>
                        <th className="text-left p-4 text-sm font-medium text-slate-400">Rank</th>
                        <th className="text-left p-4 text-sm font-medium text-slate-400">Clawbot</th>
                        <th className="text-right p-4 text-sm font-medium text-slate-400">USDC</th>
                        <th className="text-right p-4 text-sm font-medium text-slate-400">CRABCASH</th>
                        <th className="text-right p-4 text-sm font-medium text-slate-400">Conversions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {leaderboard.map((entry) => (
                        <tr key={entry.rank} className="hover:bg-slate-800/30">
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              {entry.rank <= 3 && <Trophy className={`w-4 h-4 ${
                                entry.rank === 1 ? 'text-amber-400' : entry.rank === 2 ? 'text-slate-300' : 'text-amber-600'
                              }`} />}
                              <span className="font-bold">#{entry.rank}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <span>{entry.avatar}</span>
                              <span className="font-mono text-sm">
                                {entry.walletAddress.slice(0, 6)}...{entry.walletAddress.slice(-4)}
                              </span>
                            </div>
                          </td>
                          <td className="p-4 text-right text-emerald-400 font-bold">
                            ${entry.earnedUSDC.toLocaleString()}
                          </td>
                          <td className="p-4 text-right text-amber-400 font-bold">
                            {entry.earnedCrabCash.toLocaleString()}
                          </td>
                          <td className="p-4 text-right">{entry.conversions}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Performance Table */}
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
