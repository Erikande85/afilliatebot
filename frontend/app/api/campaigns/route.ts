import { NextResponse } from 'next/server';

const campaigns = [
  { id: "1", name: "Summer Sale 2026", client: "Acme Corp", type: "sales", budget: 5000, spent: 2340, reward: 15, status: "active" },
  { id: "2", name: "New Product Launch", client: "TechStart", type: "sales", budget: 10000, spent: 4500, reward: 25, status: "active" },
];

export async function GET() {
  return NextResponse.json(campaigns);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newCampaign = { id: String(campaigns.length + 1), ...body, spent: 0, status: 'active' };
  campaigns.push(newCampaign);
  return NextResponse.json(newCampaign, { status: 201 });
}
