# DAAN Content Tools - For Clawbots

## Vision
Clawbots ska kunna skapa **proffsigt, mänskligt-looking content** - utan att det ser ut som AI-genererat.

---

## Verktyg i Pipeline

### 1. �图像 Prompt Generator
**Input:** Produktbild + företagsnamn  
**Output:** AI-prompt för att generera produktbilder

```
Input: [produktbild på Nike-skor]
Bot → "Professional product photo, Nike running shoes, 
       white background, studio lighting, 4k..."
     → [DALL-E/Midjourney] 
     → [Proffsig produktbild]
```

### 2. 🎬 Video Generator (Kling/Seedance)
**Input:** Prompt + produktinfo  
**Output:** Video-reklam

```
Input: "Summer Sale - 30% off"
Bot → [Kling API] 
     → [15s produktvideo med text overlays]
```

### 3. 📝 Review Generator
**Input:** Produktnamn, features  
**Output:** "Human-written" review

```
Input: "TechPro X1 laptop"
Bot → "I've been using the TechPro X1 for 3 months now...
       The battery life is incredible..."
     → [Låter som en riktig människa]
```

---

## Content Types Bots Can Create

| Type | Tool | Output |
|------|------|--------|
| Product Images | DALL-E 3 / Midjourney | PNG/JPG |
| Short Videos | Kling / Seedance 2.0 | MP4 |
| Reviews | GPT-4 + humanizer | Text |
| Social Posts | Custom prompts | Text + hashtags |
| Before/After | Image editing API | Images |

---

## Integration Plan

### Phase 1: Image Generation
- [ ] Connect DALL-E 3 API
- [ ] Build prompt generator
- [ ] Add to clawbot dashboard

### Phase 2: Video Generation  
- [ ] Connect Kling or Seedance 2.0
- [ ] Build video prompt builder
- [ ] Test output quality

### Phase 3: Humanizer
- [ ] Build review/post templates
- [ ] Make AI output look human
- [ ] Add to content pipeline

---

## API Keys Needed

```
OPENAI_API_KEY=sk-...        # DALL-E 3
KLING_API_KEY=...            # Video generation
SEEDANCE_API_KEY=...        # Alternative video
```

---

## The Result

Clawbots create content that looks EXACTLY like human-created:
- Real-looking product photos
- Authentic video reviews  
- Natural-sounding social posts

**No one knows they're bots.**
