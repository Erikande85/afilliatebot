import { NextRequest, NextResponse } from 'next/server';

// Short link format: /ref/{wallet8}?c={campaignId}
// Example: /ref/7xKXtg2?c=summer-sale

const linkCache: Map<string, any> = new Map();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  // Get wallet prefix and campaign ID
  const walletPrefix = request.nextUrl.pathname.split('/ref/')[1]?.split('?')[0];
  const campaignId = searchParams.get('c');
  
  if (!walletPrefix || !campaignId) {
    return NextResponse.redirect('/');
  }
  
  // Look up the actual campaign URL
  // In production, this would query the database
  const campaignUrls: Record<string, string> = {
    'summer-sale': 'https://acme.example.com/summer',
    'product-launch': 'https://techstart.io/launch',
    'holiday': 'https://shopifystore.com/holiday'
  };
  
  const targetUrl = campaignUrls[campaignId];
  
  if (!targetUrl) {
    // Campaign not found
    return NextResponse.redirect('/missions');
  }
  
  // Generate affiliate ID
  const affiliateId = `${walletPrefix}-${campaignId}-${Date.now()}`;
  
  // Track click (in production, this would be async)
  linkCache.set(affiliateId, {
    walletPrefix,
    campaignId,
    targetUrl,
    clickedAt: new Date().toISOString()
  });
  
  // Set cookie for attribution
  const response = NextResponse.redirect(targetUrl);
  response.cookies.set('daan_affiliate', affiliateId, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: '/'
  });
  
  return response;
}
