import { NextRequest, NextResponse } from 'next/server';

// In-memory store for demo (use DB in production)
const clicks: Map<string, any> = new Map();
const conversions: Map<string, any> = new Map();

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { wallet, campaignId, targetUrl } = body;
  
  if (!wallet || !campaignId || !targetUrl) {
    return NextResponse.json(
      { error: 'Missing required fields: wallet, campaignId, targetUrl' },
      { status: 400 }
    );
  }
  
  // Generate unique affiliate link
  const affiliateId = `${wallet.slice(0, 8)}-${campaignId}-${Date.now()}`;
  const affiliateLink = `https://daan.app/track/${affiliateId}?url=${encodeURIComponent(targetUrl)}`;
  
  // Store link mapping
  clicks.set(affiliateId, {
    wallet,
    campaignId,
    targetUrl,
    createdAt: new Date().toISOString(),
    clicks: 0,
    conversions: 0,
    earnings: 0
  });
  
  return NextResponse.json({
    success: true,
    affiliateId,
    affiliateLink,
    shortLink: `https://daan.app/ref/${wallet.slice(0, 8)}?c=${campaignId}`
  });
}

export async function GET() {
  // Return stats
  const stats = {
    totalLinks: clicks.size,
    totalClicks: Array.from(clicks.values()).reduce((sum, c) => sum + (c.clicks || 0), 0),
    totalConversions: Array.from(conversions.values()).reduce((sum, c) => sum + 1, 0)
  };
  
  return NextResponse.json(stats);
}
