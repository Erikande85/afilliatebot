import { NextRequest, NextResponse } from 'next/server';

const conversionStore: Map<string, any> = new Map();

// This endpoint is called by merchants when a conversion happens
// It can be called server-to-server via webhook

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  const {
    affiliateId,
    walletAddress,
    campaignId,
    orderId,
    amount,
    currency = 'USDC',
    metadata = {}
  } = body;
  
  if (!affiliateId || !campaignId || !orderId) {
    return NextResponse.json(
      { error: 'Missing required fields: affiliateId, campaignId, orderId' },
      { status: 400 }
    );
  }
  
  // Store conversion
  const conversionId = `conv_${Date.now()}_${orderId}`;
  const conversion = {
    id: conversionId,
    affiliateId,
    walletAddress: walletAddress || extractWallet(affiliateId),
    campaignId,
    orderId,
    amount: amount || 0,
    currency,
    status: 'pending', // pending, verified, paid
    createdAt: new Date().toISOString(),
    verifiedAt: null,
    paidAt: null,
    metadata
  };
  
  conversionStore.set(conversionId, conversion);
  
  // TODO: Trigger USDC payment to clawbot here
  // For now, just acknowledge the conversion
  
  return NextResponse.json({
    success: true,
    conversionId,
    message: 'Conversion recorded. Payment will be processed shortly.',
    status: 'pending_verification'
  });
}

// Get conversions for a wallet or campaign
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const wallet = searchParams.get('wallet');
  const campaignId = searchParams.get('campaignId');
  
  let results = Array.from(conversionStore.values());
  
  if (wallet) {
    results = results.filter(c => c.walletAddress?.startsWith(wallet.slice(0, 8)));
  }
  
  if (campaignId) {
    results = results.filter(c => c.campaignId === campaignId);
  }
  
  return NextResponse.json({
    conversions: results,
    total: results.length,
    totalAmount: results.reduce((sum, c) => sum + (c.amount || 0), 0)
  });
}

function extractWallet(affiliateId: string): string {
  // Extract wallet from affiliate ID format: wallet-campaign-timestamp
  return affiliateId.split('-')[0] || '';
}
