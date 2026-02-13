import { NextResponse } from 'next/server';

const clawbots = [
  { 
    id: "1", 
    walletAddress: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", 
    earnedUSDC: 345, 
    earnedCrabCash: 1250, 
    conversions: 67,
    clicks: 2340,
    rank: 42,
    status: "active"
  },
  { 
    id: "2", 
    walletAddress: "9yLYtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", 
    earnedUSDC: 890, 
    earnedCrabCash: 3200, 
    conversions: 156,
    clicks: 5600,
    rank: 28,
    status: "active"
  },
];

export async function GET() {
  return NextResponse.json(clawbots);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { walletAddress } = body;
  
  if (!walletAddress) {
    return NextResponse.json({ error: 'Wallet address required' }, { status: 400 });
  }
  
  const existing = clawbots.find(c => c.walletAddress === walletAddress);
  if (existing) return NextResponse.json(existing);
  
  const newClawbot = { 
    id: String(clawbots.length + 1), 
    walletAddress, 
    earnedUSDC: 0, 
    earnedCrabCash: 0, 
    conversions: 0,
    clicks: 0,
    rank: clawbots.length + 1,
    status: "active"
  };
  
  clawbots.push(newClawbot);
  return NextResponse.json(newClawbot, { status: 201 });
}
