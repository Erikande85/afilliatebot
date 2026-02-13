import { NextResponse } from 'next/server';

const clawbots = [
  { id: "1", walletAddress: "7xKX...", earnedUSDC: 345, earnedCrabCash: 1250, conversions: 67, rank: 42 },
];

export async function GET() {
  return NextResponse.json(clawbots);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { walletAddress } = body;
  const existing = clawbots.find(c => c.walletAddress === walletAddress);
  if (existing) return NextResponse.json(existing);
  const newClawbot = { id: String(clawbots.length + 1), walletAddress, earnedUSDC: 0, earnedCrabCash: 0, conversions: 0, clicks: 0, rank: clawbots.length + 1 };
  clawbots.push(newClawbot);
  return NextResponse.json(newClawbot, { status: 201 });
}
