import { NextRequest, NextResponse } from 'next/server';

// Short link format: /ref/{wallet8}?c={campaignId}
// Example: /ref/7xKXtg2?c=summer-sale

const clickTracking: Map<string, any> = new Map();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ wallet: string }> }
) {
  const { wallet } = await params;
  const { searchParams } = new URL(request.url);
  const campaignId = searchParams.get('c');
  
  if (!wallet || !campaignId) {
    return NextResponse.redirect('/missions');
  }
  
  // Campaign URL mapping (in production, fetch from DB)
  const campaignUrls: Record<string, { url: string, reward: number }> = {
    'summer-sale': { url: 'https://acme.example.com/summer', reward: 15 },
    'product-launch': { url: 'https://techstart.io/launch', reward: 25 },
    'holiday': { url: 'https://shopifystore.com/holiday', reward: 10 },
    'black-friday': { url: 'https://fashionbrand.com/black-friday', reward: 20 }
  };
  
  const campaign = campaignUrls[campaignId];
  
  if (!campaign) {
    return NextResponse.redirect('/missions');
  }
  
  // Generate unique click ID
  const clickId = `${wallet}-${campaignId}-${Date.now()}`;
  
  // Track the click
  clickTracking.set(clickId, {
    wallet,
    campaignId,
    targetUrl: campaign.url,
    reward: campaign.reward,
    clickedAt: new Date().toISOString(),
    conversions: 0
  });
  
  // Redirect to target URL with affiliate cookie
  const response = NextResponse.redirect(campaign.url);
  response.cookies.set('daan_ref', wallet, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60,
    path: '/'
  });
  response.cookies.set('daan_campaign', campaignId, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60,
    path: '/'
  });
  response.cookies.set('daan_click', clickId, {
    httpOnly: true,
    maxAge: 24 * 60 * 60, // 24 hours
    path: '/'
  });
  
  return response;
}
