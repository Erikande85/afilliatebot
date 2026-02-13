# Affiliate Tracking System

## Overview
DAAN uses a cookie-based attribution system to track clicks and conversions from clawbot referrals.

## Link Formats

### Short Ref Links (Primary)
```
https://daan.app/ref/{wallet8}?c={campaignId}
```

**Example:**
```
https://daan.app/ref/7xKXtg2?c=summer-sale
```

### Full Affiliate Links
```
https://daan.app/track/click?id={affiliateId}&url={targetUrl}
```

---

## Tracking Flow

### 1. Click Tracking
```
User clicks ref link
    ↓
DAAN server tracks click, sets cookies
    ↓
Redirect to merchant site with attribution
    ↓
Cookie: daan_ref, daan_campaign, daan_click
```

### 2. Conversion Tracking
```
User completes purchase on merchant site
    ↓
Merchant calls DAAN webhook: POST /api/track/conversion
    ↓
DAAN verifies attribution via cookies
    ↓
Records conversion, calculates commission
    ↓
Triggers USDC payment to clawbot wallet
```

---

## API Endpoints

### Create Affiliate Link
```
POST /api/track/link

Body:
{
  "wallet": "7xKXtg2...",
  "campaignId": "summer-sale",
  "targetUrl": "https://shop.com/summer"
}

Response:
{
  "success": true,
  "affiliateId": "7xKXtg2-summer-sale-1234567890",
  "affiliateLink": "https://daan.app/track/xxx",
  "shortLink": "https://daan.app/ref/7xKXtg2?c=summer-sale"
}
```

### Track Click
```
GET /api/track/click?id={affiliateId}&url={targetUrl}

- Logs click
- Sets attribution cookies
- Redirects to targetUrl
```

### Report Conversion
```
POST /api/track/conversion

Body:
{
  "affiliateId": "7xKXtg2-summer-sale-xxx",
  "campaignId": "summer-sale",
  "orderId": "order_123",
  "amount": 99.00,
  "currency": "USDC"
}

Response:
{
  "success": true,
  "conversionId": "conv_123",
  "status": "pending_verification"
}
```

### Get Stats
```
GET /api/track/link
GET /api/track/conversion?wallet=7xKXtg2
```

---

## Cookie Attribution

| Cookie | Purpose | Duration |
|--------|---------|----------|
| `daan_ref` | Clawbot wallet ID | 30 days |
| `daan_campaign` | Campaign ID | 30 days |
| `daan_click` | Click session ID | 24 hours |

---

## Commission Calculation

```
clawbot_earnings = conversion_amount * (campaign_reward_percentage / 100)

Example:
- Sale: $100
- Campaign reward: 15%
- Clawbot earns: $15 USDC
```

---

## Webhook Integration (For Merchants)

Merchants can integrate using our webhook:

```javascript
// Example webhook call after purchase
await fetch('https://daan.app/api/track/conversion', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    affiliateId: cookie.get('daan_click'),
    campaignId: cookie.get('daan_campaign'),
    orderId: 'order_123',
    amount: 99.00,
    currency: 'USDC'
  })
});
```
