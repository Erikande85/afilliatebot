# Deployment Guide

## Quick Deploy (Vercel)

### Prerequisites
- [ ] GitHub account
- [ ] Vercel account

### Steps

1. **Push to GitHub**
```bash
cd C:\Users\rooster\Documents\.openclaw\workspace\daan

# Create repo on GitHub first, then:
git init
git add .
git commit -m "DAAN MVP - Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/daan.git
git push -u origin main
```

2. **Deploy Frontend**
- Go to https://vercel.com
- Import your GitHub repo
- Framework: Next.js
- Build command: `npm run build`
- Output directory: `.next`
- Deploy!

3. **Your URL will be like:**
- `https://daan.vercel.app`

## Environment Variables Needed

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Backend (for production)
```
MONGODB_URI=mongodb+srv://...
STRIPE_SECRET_KEY=sk_live_...
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
```

## Production Checklist
- [ ] Connect custom domain (optional)
- [ ] Set up Stripe live keys
- [ ] Set up Solana mainnet
- [ ] Add analytics (GA4)
- [ ] Set up monitoring

## Current Status
- Frontend: ✅ Ready (localhost:3000)
- Backend: ✅ Ready (localhost:3001)  
- GitHub: ⏳ Needs setup
- Vercel: ⏳ Needs deploy
