# DAAN Hosting Guide

## Frontend (Next.js)

### Option 1: Vercel (Recommended)
- **Cost:** Free tier available
- **URL:** yourname.vercel.app
- **Auto-deploy:** Yes (GitHub integration)

### Option 2: Netlify
- **Cost:** Free tier available
- **URL:** yourname.netlify.app

### Option 3: Cloudflare Pages
- **Cost:** Free
- **URL:** yourname.pages.dev

---

## Backend (Express API)

### Option 1: Railway
- **Cost:** $5/month (with free tier)
- **Easy:** GitHub push → auto-deploy
- **URL:** yourapp.railway.app

### Option 2: Render
- **Cost:** Free tier available
- **URL:** yourapp.onrender.com

### Option 3: Fly.io
- **Cost:** Free tier
- **URL:** yourapp.fly.dev

### Option 4: Heroku
- **Cost:** Free (sleeps after 30 min)
- **URL:** yourapp.herokuapp.com

---

## Database (MongoDB)

### MongoDB Atlas
- **Cost:** Free tier (512MB)
- **Setup:** Create account, get connection string

---

## Recommended Stack for MVP

| Service | Type | Cost |
|---------|------|------|
| Vercel | Frontend | Free |
| Railway | Backend | $5/mo |
| MongoDB Atlas | Database | Free |

**Total: ~$5/month**

---

## Quick Deploy Commands

### Vercel (Frontend)
```bash
npm i -g vercel
cd frontend
vercel
```

### Railway (Backend)
```bash
npm i -g @railway/cli
railway login
railway init
railway up
```

---

## Environment Variables Needed

### Frontend (.env)
```
NEXT_PUBLIC_API_URL=https://daan-api.railway.app/api
```

### Backend (.env)
```
PORT=3001
MONGODB_URI=mongodb+srv://...
STRIPE_SECRET_KEY=sk_test_...
SOLANA_RPC_URL=https://api.devnet.solana.com
```
