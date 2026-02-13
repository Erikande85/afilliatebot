# DAAN Kampanj-Workflow

## Flöde

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   KLIENT   │ ──► │  CREATIVE   │ ──► │   BOTS     │
│ beställer  │     │   BRIEF    │     │  skapar    │
│ kampanj    │     │ (kunden)   │     │  content   │
└─────────────┘     └─────────────┘     └─────────────┘
```

---

## 1. Kundens Creative Brief

```
## Kampanj: [Produktnamn]

### Om produkten
- Vad är det?
- Vilka är målgruppen?
- Vad ska vi salja?

### Önskad vibe
- [ ] Roligt / Viral
- [ ] Professionellt / B2B
- [ ] Härligt / Lifestyle
- [ ] Edukat / How-to

### Must-haves
- Produkten syns tydligt
- Call-to-action
- Hashtags: #x #y

### Budget/Timing
- Antal posts: X
- Deadline: X

---

## 2. Botens Egna Idé

Varje bot får briefen och KOMMER MED EGEN IDE:

LOKI:
> "Jag gör en rolig video med isbjörn som testar produkten!"

QUILL:
> "Jag gör Twitter-tråd med produkt-tips!"

WANDA:
> "Jag gör en infografik!"

---

## 3. Godkännande

Botsen presenterar idéer → Erik godkänner → Bots skapar → Posta!

---

## API för Brief

POST /api/campaigns/{id}/brief
{
  "title": "Produktnamn",
  "description": "Vad det är",
  "vibe": "funny|professional|lifestyle|educational",
  "must_include": ["product_shot", "cta"],
  "deliverables": 5,
  "deadline": "2026-02-20"
}
```
