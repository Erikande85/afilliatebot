# CONTENT FACTORY PIPELINE

## Overview

Multi-agent pipeline for creating content at scale:

```
REX (Research) → LOKI (Write) → WANDA (Thumbnail) → QUILL (Post)
     ↓              ↓              ↓                  ↓
  Keywords     First draft    Visual hook       Platform
  + data       + copy         + design          optimize
                                                  ↓
                                              ANALYTICS
```

---

## Pipeline: content-factory

**Purpose:** Create viral content from brief to posted

### Steps:

#### Step 1: REX - Research
```
INPUT: Campaign brief, target platform
OUTPUT: Keywords, trending topics, competitor analysis, data points
```

#### Step 2: LOKI - Write
```
INPUT: Research from REX
OUTPUT: 3-5 content variations (headlines, angles, hooks)
```

#### Step 3: WANDA - Visual
```
INPUT: Best content from Loki
OUTPUT: Thumbnail, cover image, visual assets
```

#### Step 4: QUILL - Post
```
INPUT: Content + visuals
OUTPUT: Platform-optimized post (TikTok, Twitter, YouTube, etc.)
```

#### Step 5: ANALYTICS - Track
```
INPUT: Posted content
OUTPUT: Engagement metrics, learnings, iteration suggestions
```

---

## Pipeline: lead-gen-factory

**Purpose:** Full funnel from prospect to lead

```
MAX (Hunt) → FURY (Qualify) → PEPPER (Nurture) → CLOSE
   ↓            ↓              ↓               ↓
Find leads   Validate       Email          Proposal
             interest      sequence       + demo
```

---

## Pipeline: seo-factory

**Purpose:** Dominate search rankings

```
VISION (Research) → LOKI (Write) → FRIDAY (Technical) → QUILL (Distribute)
     ↓                 ↓              ↓                   ↓
  Keywords          Article       Meta, structure    Link building
```

---

## Pipeline: campaign-factory

**Purpose:** Full campaign from brief to results

```
CHIEF (Strategy) → BRIEF → LOKI (Content) → WANDA (Assets) → QUILL (Distribute)
                        ↓
                   REX (Research)
```

---

## Discord Integration

Pipelines post updates to Discord channels:

- #content-factory - Content being created
- #lead-gen - New leads found
- #seo-pipeline - Ranking updates
- #campaigns - Campaign progress

---

## Running Pipelines

### Manual:
```
Pipeline: content-factory
Input: { "campaign": "summer-sale", "platform": "tiktok", "count": 5 }
```

### Scheduled (via cron):
- content-factory: Every day at 10:00
- lead-gen-factory: Every day at 9:00
- seo-factory: Every day at 7:00

---

## Example: Create 5 TikToks for Summer Sale

```json
{
  "pipeline": "content-factory",
  "input": {
    "campaign": "summer-sale-2026",
    "product": "Outdoor furniture",
    "platform": "tiktok",
    "count": 5,
    "angle": "viral-funny"
  },
  "steps": {
    "1_rex": { "task": "find_viral_angles_outdoor" },
    "2_loki": { "task": "write_hooks", "count": 5 },
    "3_wanda": { "task": "create_thumbnails" },
    "4_quill": { "task": "post_tiktok", "schedule": "now" }
  }
}
```
