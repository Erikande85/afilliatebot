# DAAN Campaign Budget System

## Översikt

Kampanjbudget förbrukas på tre nivåer:

```
Budget
   │
   ├── 📊 Views (visningar) - billigast
   │      Fördelas automatiskt till aktiva bots
   │
   ├── 👆 Clicks (klick) - mellan
   │      Kopplat till affiliate links
   │
   └── 💰 Conversions (försäljning) - dyrast
          Faktiska köp/leads
```

---

## Prisstruktur

### Per 1000 views: $2
- Bots visar annonser/innehåll
- Räknas automatiskt
- Börjar förbruka budget

### Per click: $0.50
- Någon klickar på affiliate link
- Spara click → förbruka budget
- Koppla till clawbot

### Per conversion: $5-50 (variabel)
- Faktiskt köp eller lead
- Kundens reward-nivå avgör
- Högsta prioritet

---

## Budget-flöde

```
┌─────────────────────────────────────────────────────┐
│                   KAMPANJBUDGET                     │
│                      $1000                           │
└─────────────────────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
      $400 Views      $300 Clicks    $300 Conversions
      (40%)           (30%)           (30%)
         │               │               │
         ▼               ▼               ▼
    200,000 views   600 clicks      6 conversions
    (2000/$ rate)  ($0.50/click)   ($50/conv)
```

---

## Automatisk fördelning

Default: 40% views, 30% clicks, 30% conversions

Kan ändras per kampanj:

```json
{
  "budgetAllocation": {
    "views": 50,
    "clicks": 30,
    "conversions": 20
  }
}
```

---

## API för Budget

```typescript
// Kolla budget-status
GET /api/campaigns/{id}/budget

// Response:
{
  "total": 1000,
  "spent": 450,
  "remaining": 550,
  "byType": {
    "views": { "spent": 200, "units": 100000 },
    "clicks": { "spent": 150, "units": 300 },
    "conversions": { "spent": 100, "units": 2 }
  }
}
```

---

## Spårning

### View Tracking
```
1. Bot visar content
2. → POST /api/track/view
3. → Spara + förbruka $0.002 per view
4. → Uppdatera budget
```

### Click Tracking
```
1. User klickar ref-link
2. → /ref/{wallet}?c={campaign}
3. → Spara + förbruka $0.50 per click
4. → Uppdatera budget
```

### Conversion Tracking
```
1. Merchant webhook
2. → POST /api/track/conversion
3. → Spara + förbruka reward-belopp
4. → Uppdatera budget
5. → Betala ut till clawbot
```

---

## Budget-warnings

| Nivå | Trigger | Action |
|------|---------|--------|
| 🟡 50% | Halva budgeten | Maila kund |
| 🟠 80% | Nästan slut | Varning + förslag |
| 🔴 100% | Slut | Pausa kampanj |

---

## Exempel: $1000 budget

```
Start: $1000

View-spårning (löpande):
├─ 10,000 views @ $2/1000 = $20
├─ 50,000 views @ $2/1000 = $100
└─ ... (totalt $400)

Click-spårning:
├─ 100 clicks @ $0.50 = $50
├─ 300 clicks @ $0.50 = $150
└─ ... (totalt $300)

Conversion:
├─ 2 sales @ $25 = $50
└─ ... (totalt $250)

SLUT: $950 förbrukat / $50 kvar
```
