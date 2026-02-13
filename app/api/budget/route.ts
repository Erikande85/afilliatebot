import { NextRequest, NextResponse } from 'next/server';

// In-memory budget tracking (use DB in production)
const budgets: Map<string, any> = new Map();

// Price per unit
const PRICES = {
  view: 0.002,      // $2 per 1000 views
  click: 0.50,     // $0.50 per click
  conversion: 10    // Default $10 per conversion (varies by campaign)
};

// Default allocation percentages
const DEFAULT_ALLOCATION = {
  views: 40,
  clicks: 30,
  conversions: 30
};

// Initialize a campaign budget
function initBudget(campaignId: string, total: number, allocation = DEFAULT_ALLOCATION) {
  budgets.set(campaignId, {
    campaignId,
    total,
    spent: 0,
    remaining: total,
    allocation,
    byType: {
      views: { spent: 0, units: 0 },
      clicks: { spent: 0, units: 0 },
      conversions: { spent: 0, units: 0 }
    },
    history: []
  });
}

// Initialize demo budgets
initBudget('1', 5000, { views: 40, clicks: 30, conversions: 30 }); // Summer Sale
initBudget('2', 10000, { views: 30, clicks: 30, conversions: 40 }); // Product Launch
initBudget('4', 8000, { views: 35, clicks: 35, conversions: 30 }); // Black Friday

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const campaignId = searchParams.get('campaignId');
  
  if (campaignId) {
    const budget = budgets.get(campaignId);
    if (!budget) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }
    return NextResponse.json(budget);
  }
  
  // Return all budgets
  return NextResponse.json(Array.from(budgets.values()));
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { action, campaignId, type, units, amount, reward } = body;
  
  switch (action) {
    case 'create': {
      // Create new budget for campaign
      if (!campaignId || !body.total) {
        return NextResponse.json(
          { error: 'campaignId and total required' },
          { status: 400 }
        );
      }
      
      initBudget(campaignId, body.total, body.allocation || DEFAULT_ALLOCATION);
      
      return NextResponse.json({
        success: true,
        budget: budgets.get(campaignId)
      });
    }
    
    case 'track': {
      // Track usage (view, click, or conversion)
      if (!campaignId || !type || !units) {
        return NextResponse.json(
          { error: 'campaignId, type, and units required' },
          { status: 400 }
        );
      }
      
      const budget = budgets.get(campaignId);
      if (!budget) {
        return NextResponse.json(
          { error: 'Budget not found. Create it first.' },
          { status: 404 }
        );
      }
      
      const typeKey = type === 'view' ? 'views' : type === 'click' ? 'clicks' : 'conversions';
      const price = type === 'conversion' ? (reward || PRICES.conversion) : PRICES[type as keyof typeof PRICES];
      const cost = price * units;
      
      // Check if enough budget
      if (budget.remaining < cost) {
        return NextResponse.json({
          success: false,
          error: 'Insufficient budget',
          remaining: budget.remaining,
          needed: cost
        }, { status: 400 });
      }
      
      // Update budget
      budget.spent += cost;
      budget.remaining -= cost;
      budget.byType[typeKey].spent += cost;
      budget.byType[typeKey].units += units;
      
      // Add to history
      budget.history.push({
        type,
        units,
        cost,
        timestamp: new Date().toISOString()
      });
      
      // Check for warnings
      const percentUsed = (budget.spent / budget.total) * 100;
      let warning = null;
      if (percentUsed >= 100) {
        warning = 'BUDGET_DEPLETED';
      } else if (percentUsed >= 80) {
        warning = 'LOW_BUDGET';
      } else if (percentUsed >= 50) {
        warning = 'HALF_USED';
      }
      
      return NextResponse.json({
        success: true,
        budget,
        warning,
        tracked: {
          type,
          units,
          cost
        }
      });
    }
    
    case 'allocate': {
      // Reallocate budget percentages
      if (!campaignId || !body.allocation) {
        return NextResponse.json(
          { error: 'campaignId and allocation required' },
          { status: 400 }
        );
      }
      
      const budget = budgets.get(campaignId);
      if (!budget) {
        return NextResponse.json({ error: 'Budget not found' }, { status: 404 });
      }
      
      // Validate allocation totals 100
      const total = Object.values(body.allocation).reduce((a: any, b: any) => a + b, 0);
      if (total !== 100) {
        return NextResponse.json(
          { error: 'Allocation must sum to 100' },
          { status: 400 }
        );
      }
      
      budget.allocation = body.allocation;
      
      return NextResponse.json({
        success: true,
        budget
      });
    }
    
    default:
      return NextResponse.json(
        { error: 'Invalid action. Use: create, track, or allocate' },
        { status: 400 }
      );
  }
}
