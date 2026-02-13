import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { action, amount } = body;

  if (action === 'checkout') {
    return NextResponse.json({ sessionId: "mock_" + Date.now(), url: `http://localhost:3000/clients?success=true&amount=${amount}` });
  }

  if (action === 'usdc_transfer') {
    return NextResponse.json({ success: true, transactionHash: "mock_tx_" + Date.now() });
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}

export async function GET() {
  return NextResponse.json({ funded: true, balance: 5000, spent: 2340 });
}
