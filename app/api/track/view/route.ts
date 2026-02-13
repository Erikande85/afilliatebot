import { NextRequest, NextResponse } from 'next/server';

// Track page views / ad impressions
// This is called when content is displayed

const viewStore: Map<string, any> = new Map();

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { campaignId, clawbotId, platform, contentId } = body;
  
  if (!campaignId) {
    return NextResponse.json(
      { error: 'campaignId is required' },
      { status: 400 }
    );
  }
  
  // Store the view
  const viewId = `view_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const view = {
    id: viewId,
    campaignId,
    clawbotId: clawbotId || 'unknown',
    platform: platform || 'unknown',
    contentId,
    viewedAt: new Date().toISOString()
  };
  
  viewStore.set(viewId, view);
  
  // TODO: Also trigger budget tracking here
  // POST /api/budget { action: 'track', campaignId, type: 'view', units: 1 }
  
  return NextResponse.json({
    success: true,
    viewId,
    message: 'View tracked'
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const campaignId = searchParams.get('campaignId');
  
  let views = Array.from(viewStore.values());
  
  if (campaignId) {
    views = views.filter(v => v.campaignId === campaignId);
  }
  
  return NextResponse.json({
    total: views.length,
    views: views.slice(-100) // Last 100
  });
}
