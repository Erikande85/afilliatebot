import { NextResponse } from 'next/server';

const campaigns = [
  { 
    id: "1", 
    name: "Summer Sale 2026", 
    client: "Acme Corp", 
    type: "sales", 
    budget: 5000, 
    spent: 2340, 
    reward: 15, 
    status: "active",
    url: "https://acme.example.com/summer",
    conversions: 156,
    clicks: 4520,
    impressions: 45000
  },
  { 
    id: "2", 
    name: "New Product Launch", 
    client: "TechStart", 
    type: "sales", 
    budget: 10000, 
    spent: 4500, 
    reward: 25, 
    status: "active",
    url: "https://techstart.io/launch",
    conversions: 89,
    clicks: 2100,
    impressions: 28000
  },
  { 
    id: "3", 
    name: "Holiday Promo", 
    client: "ShopifyStore", 
    type: "sales", 
    budget: 3000, 
    spent: 3000, 
    reward: 10, 
    status: "completed",
    url: "https://shopifystore.com/holiday",
    conversions: 234,
    clicks: 8900,
    impressions: 67000
  },
  { 
    id: "4", 
    name: "Black Friday Early Access", 
    client: "FashionBrand", 
    type: "sales", 
    budget: 8000, 
    spent: 1200, 
    reward: 20, 
    status: "active",
    url: "https://fashionbrand.com/black-friday",
    conversions: 45,
    clicks: 1200,
    impressions: 15000
  },
  { 
    id: "5", 
    name: "SaaS Free Trial", 
    client: "ProductivityApp", 
    type: "leads", 
    budget: 2000, 
    spent: 800, 
    reward: 5, 
    status: "active",
    url: "https://productivityapp.com/trial",
    conversions: 160,
    clicks: 3200,
    impressions: 22000
  },
];

export async function GET() {
  return NextResponse.json(campaigns);
}

export async function POST(request: Request) {
  const body = await request.json();
  
  const newCampaign = { 
    id: String(campaigns.length + 1), 
    name: body.name || "New Campaign",
    client: body.client || "Demo Client",
    type: body.type || "sales",
    budget: body.budget || 1000,
    spent: 0,
    reward: body.reward || 10,
    status: 'active',
    url: body.url || "",
    conversions: 0,
    clicks: 0,
    impressions: 0
  };
  
  campaigns.push(newCampaign);
  return NextResponse.json(newCampaign, { status: 201 });
}
