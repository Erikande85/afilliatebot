# DAAN Agent Team - WORKING.md

## Project: Decentralized Autonomous Affiliate Network
**Commander:** Erik
**Mission:** Build a platform where AI agents do affiliate marketing and earn USDC + CRABCASH

---

## Current Sprint: MVP Phase 2

### Goals
- [x] Set up Next.js project
- [x] Build landing page
- [x] Client dashboard with campaign creation
- [x] Clawbot dashboard with wallet connect + leaderboard
- [x] API endpoints (campaigns, clawbots, payments, leaderboard)
- [x] Deploy to Vercel
- [x] API integration in frontend

---

## Agent Assignments

| Agent | Role | Current Task | Status |
|-------|------|---------------|--------|
| Jarvis | Squad Lead | Coordination | ✅ Ready |
| Builder | Full-stack | Landing page + dashboards | ✅ Done |
| Solana | Blockchain | Wallet adapter setup | ⏳ Ready |
| Stripe | Payments | Payment integration | ⏳ Ready |
| Max | Lead Gen | Research prospects | 🔥 ACTIVE |
| Loki | Content | Landing copy + blog + emails + SEO | ✅ Done |
| Quill | Social | X presence | ⏳ Ready |
| Vision | SEO | Keyword research | ⏳ Ready |
| Wanda | Analytics | Dashboard metrics | ⏳ Ready |

---

## Live Site
**URL:** https://afilliatebot-ccgz-2fx0955ye-eriks-projects-6499575c.vercel.app/

### Endpoints
- `GET /api` - Health check
- `GET /api/campaigns` - List campaigns
- `POST /api/campaigns` - Create campaign
- `GET /api/clawbots` - List bots
- `POST /api/clawbots` - Register bot
- `GET /api/leaderboard` - Rankings
- `POST /api/payments` - Process payment

---

## Daily Standup (for agents)

### Max (Lead Gen)
```
Tasks:
1. Research 10 companies in target industries
2. Find decision-maker emails
3. Create prospect list in notes

Target Industries:
- E-commerce (Shopify, WooCommerce)
- SaaS startups
- Digital agencies
```

### Loki (Content)
```
Tasks:
1. Generate ad copy for active campaigns
2. Write email sequences for outreach
3. Create social media posts

Campaigns to promote:
- Summer Sale 2026 (Acme Corp) - 15% commission
- New Product Launch (TechStart) - 25% commission
```

### Quill (Social)
```
Tasks:
1. Post to X about DAAN
2. Engage with potential leads
3. Share campaign promotions

Handles: @daan_network
```

---

## Progress Log

### 2026-02-13
- ✅ Created project structure (frontend, backend, docs)
- ✅ Built landing page, client dashboard, clawbot dashboard
- ✅ API endpoints for all CRUD operations
- ✅ Leaderboard functionality
- ✅ Real API integration in frontend
- ✅ Deployed to Vercel
- ✅ Agent team defined with roles

### 2026-02-13 (Loki - Content)
- ✅ Created comprehensive content package at `/content/content-package.md`
- ✅ 3 SEO blog posts (AI workforce economy, pay-per-result marketing, clawbot setup guide)
- ✅ 6-email sequences (3 for brands, 3 for clawbots)
- ✅ Landing page copy variations (headlines, CTAs, meta tags)
- ✅ SEO meta tags for all pages
- ✅ 4-week content calendar
- ✅ Brand voice guidelines
- ✅ Social proof snippets ready for deployment
- Leaderboard populated with top bots

---

## Dependencies
- [x] GitHub account + repo
- [x] Vercel deployment
- [ ] MongoDB (future - using in-memory for MVP)
- [x] Stripe keys (mock mode)
- [ ] Solana devnet (future)
- [x] OpenRouter (Kimi k2.5)

---

## Notes
- Vercel handles frontend + API
- In-memory data for MVP (no DB yet)
- Stripe in mock mode for testing
- Agents can start lead gen and content creation
