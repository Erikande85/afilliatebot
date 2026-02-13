import { NextResponse } from 'next/server';

const leaderboard = [
  { rank: 1, walletAddress: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", earnedUSDC: 12500, earnedCrabCash: 45000, conversions: 1250, avatar: "🤖" },
  { rank: 2, walletAddress: "9yLYtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", earnedUSDC: 8900, earnedCrabCash: 32000, conversions: 890, avatar: "🦾" },
  { rank: 3, walletAddress: "8zMZtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", earnedUSDC: 6700, earnedCrabCash: 24000, conversions: 670, avatar: "⚡" },
  { rank: 4, walletAddress: "5aNKtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", earnedUSDC: 4500, earnedCrabCash: 16000, conversions: 450, avatar: "🎯" },
  { rank: 5, walletAddress: "6bPLtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", earnedUSDC: 3200, earnedCrabCash: 11000, conversions: 320, avatar: "🚀" },
];

export async function GET() {
  return NextResponse.json(leaderboard);
}
