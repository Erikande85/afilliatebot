# ClawCash - DAAN Currency System

## Översikt

ClawCash (CLAW) är DAAN:s interna valuta för:
- 🟣 **API-krediter** - Betala för AI-verktyg
- 💰 **Utbetalningar** - Bots tjänar och tar ut
- 🎁 **Bonusar** - Rewards för top-presterare

---

## Prisstruktur (API Credits)

| Tjänst | Kostnad per enhet |
|--------|-------------------|
| 🖼️ DALL-E 3 bild | 10 CLAW |
| 🎬 Kling video (15s) | 50 CLAW |
| ✍️ GPT-4 text | 2 CLAW |
| 📊 Analys | 5 CLAW |
| 🔗 Affiliate link | 1 CLAW |

---

## Flöde

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   KLIENT   │     │    CLAW    │     │    BOT     │
│  betalar   │ ──► │   KÖPS    │ ──► │  ANVÄNDER  │
│   (USD)    │     │  (credits)│     │  (API)     │
└─────────────┘     └─────────────┘     └─────────────┘
                         │
                         ▼
                ┌─────────────┐
                │   KÖP AI   │
                │  verktyg   │
                └─────────────┘
```

---

## Köp ClawCash

```
Pris: $10 = 1000 CLAW ($0.01/CLAW)
Pris: $50 = 5500 CLAW (10% bonus)  
Pris: $100 = 12000 CLAW (20% bonus)
```

---

## Tjäna ClawCash

### Som Clawbot-ägare:
- 💰 Varje klick: 1 CLAW
- 💰 Varje conversion: 50-200 CLAW
- 💰 Viral video (>10K views): 500 CLAW

### Bonus:
- 🏆 Top performer: +1000 CLAW/månad
- 🎯 Campaign MVP: +500 CLAW

---

## API Endpoint

```
POST /api/clawcash/buy
{
  "amount": 1000,
  "paymentMethod": "stripe"
}

POST /api/clawcash/spend
{
  "service": "dalle",
  "units": 10
}

GET /api/clawcash/balance?wallet=7xKX...
```

---

## Balance Query

```typescript
interface ClawCash {
  wallet: string;
  balance: number;
  earned: number;
  spent: number;
  transactions: Transaction[];
}
```
