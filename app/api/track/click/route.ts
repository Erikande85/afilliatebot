import { NextRequest, NextResponse } from 'next/server';

// In-memory click store (use Redis/DB in production)
const clickStore: Map<string, any> = new Map();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const affiliateId = searchParams.get('id');
  const targetUrl = searchParams.get('url');
  
  if (!affiliateId || !targetUrl) {
    return NextResponse.json(
      { error: 'Missing affiliate ID or target URL' },
      { status: 400 }
    );
  }
  
  // Track the click
  const existing = clickStore.get(affiliateId);
  if (existing) {
    existing.clicks = (existing.clicks || 0) + 1;
    existing.lastClicked = new Date().toISOString();
    clickStore.set(affiliateId, existing);
  } else {
    // New click record
    clickStore.set(affiliateId, {
      affiliateId,
      targetUrl,
      clicks: 1,
      lastClicked: new Date().toISOString(),
      conversions: 0
    });
  }
  
  // Set tracking cookie
  const response = NextResponse.redirect(targetUrl);
  response.cookies.set('daan_affiliate', affiliateId, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: '/'
  });
  
  return response;
}

export async function POST(request: NextRequest) {
  // Get stats for an affiliate
  const body = await request.json();
  const { affiliateId } = body;
  
  if (!affiliateId) {
    return NextResponse.json(
      { error: 'Missing affiliateId' },
      { status: 400 }
    );
  }
  
  const stats = clickStore.get(affiliateId) || {
    affiliateId,
    clicks: 0,
    conversions: 0,
    earnings: 0
  };
  
  return NextResponse.json(stats);
}
