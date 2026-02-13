import { NextRequest, NextResponse } from 'next/server';

// In-memory ClawCash ledger (use DB in production)
const balances: Map<string, number> = new Map();
const transactions: Map<string, any[]> = new Map();

// Pricing in CLAW
const PRICES = {
  dalle: 10,        // 1 image
  kling: 50,        // 15s video
  gpt4: 2,          // 1 text request
  analysis: 5,       // 1 analysis
  affiliate: 1       // 1 link creation
};

// CLAW to USD rates
const RATES = {
  1000: { usd: 10, claw: 1000 },      // $0.01/CLAW
  5500: { usd: 50, claw: 5500 },      // 10% bonus
  12000: { usd: 100, claw: 12000 }    // 20% bonus
};

function getWallet(wallet: string): number {
  return balances.get(wallet) || 0;
}

function addTransaction(wallet: string, tx: any) {
  const txs = transactions.get(wallet) || [];
  txs.unshift(tx);
  transactions.set(wallet, txs.slice(0, 100)); // Keep last 100
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const wallet = searchParams.get('wallet');
  const action = searchParams.get('action');
  
  if (!wallet) {
    return NextResponse.json(
      { error: 'wallet is required' },
      { status: 400 }
    );
  }
  
  if (action === 'rates') {
    return NextResponse.json({ rates: RATES });
  }
  
  const balance = getWallet(wallet);
  const txs = transactions.get(wallet) || [];
  
  return NextResponse.json({
    wallet,
    balance,
    transactions: txs
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { action, wallet, service, units, package: pkg } = body;
  
  if (!wallet) {
    return NextResponse.json(
      { error: 'wallet is required' },
      { status: 400 }
    );
  }
  
  switch (action) {
    case 'buy': {
      // Buy CLAW with USD (via Stripe in production)
      const packageSize = pkg || 1000;
      const rate = RATES[packageSize as keyof typeof RATES];
      
      if (!rate) {
        return NextResponse.json(
          { error: 'Invalid package. Choose: 1000, 5500, or 12000' },
          { status: 400 }
        );
      }
      
      // In production: process Stripe payment here
      const newBalance = getWallet(wallet) + rate.claw;
      balances.set(wallet, newBalance);
      
      addTransaction(wallet, {
        id: `tx_${Date.now()}`,
        type: 'purchase',
        amount: rate.claw,
        usd: rate.usd,
        package: packageSize,
        timestamp: new Date().toISOString()
      });
      
      return NextResponse.json({
        success: true,
        balance: newBalance,
        purchased: rate.claw,
        usd: rate.usd
      });
    }
    
    case 'spend': {
      // Spend CLAW on API services
      const serviceName = service || 'dalle';
      const costPerUnit = PRICES[serviceName as keyof typeof PRICES];
      const totalCost = (costPerUnit || 10) * (units || 1);
      
      const currentBalance = getWallet(wallet);
      
      if (currentBalance < totalCost) {
        return NextResponse.json(
          { error: `Insufficient balance. Need ${totalCost} CLAW, have ${currentBalance}` },
          { status: 400 }
        );
      }
      
      const newBalance = currentBalance - totalCost;
      balances.set(wallet, newBalance);
      
      addTransaction(wallet, {
        id: `tx_${Date.now()}`,
        type: 'spend',
        service: serviceName,
        units: units || 1,
        cost: totalCost,
        timestamp: new Date().toISOString()
      });
      
      return NextResponse.json({
        success: true,
        balance: newBalance,
        spent: totalCost,
        service: serviceName,
        units: units || 1
      });
    }
    
    case 'earn': {
      // Add CLAW earnings (from conversions, etc.)
      const amount = body.amount || 0;
      const reason = body.reason || 'conversion';
      
      const newBalance = getWallet(wallet) + amount;
      balances.set(wallet, newBalance);
      
      addTransaction(wallet, {
        id: `tx_${Date.now()}`,
        type: 'earn',
        reason,
        amount,
        timestamp: new Date().toISOString()
      });
      
      return NextResponse.json({
        success: true,
        balance: newBalance,
        earned: amount,
        reason
      });
    }
    
    default:
      return NextResponse.json(
        { error: 'Invalid action. Use: buy, spend, or earn' },
        { status: 400 }
      );
  }
}
