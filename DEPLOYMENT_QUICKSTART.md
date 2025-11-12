# 🚀 Quick Deployment Guide

## Pilihan Platform

### 1️⃣ Vercel (Easiest - Recommended untuk pemula)

**Kelebihan:**
- ✅ Zero configuration
- ✅ Auto-deploy dari Git
- ✅ Preview deployments
- ✅ Built-in analytics
- ✅ 100GB bandwidth gratis

**Langkah Deploy:**

1. **Push ke GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/cs-dashboard.git
   git push -u origin main
   ```

2. **Import ke Vercel**
   - Buka [vercel.com](https://vercel.com)
   - Klik "Add New Project"
   - Import dari GitHub
   - Vercel auto-detect Next.js

3. **Set Environment Variables**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://uwazjnsqbzeyjbybvepj.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
   ```

4. **Deploy!**
   - Klik "Deploy"
   - Tunggu ~2 menit
   - Done! ✅

**URL:** `https://cs-dashboard.vercel.app`

---

### 2️⃣ Cloudflare Pages (Best untuk traffic tinggi)

**Kelebihan:**
- ✅ Unlimited bandwidth (gratis!)
- ✅ Faster global edge network
- ✅ Lower latency
- ✅ DDoS protection built-in

**Langkah Deploy:**

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Push ke GitHub** (sama seperti Vercel)

3. **Deploy via Cloudflare Dashboard**
   - Login ke [dash.cloudflare.com](https://dash.cloudflare.com)
   - Pilih **Pages** → **Create a project**
   - Connect GitHub repository
   - Build settings:
     - Framework: **Next.js**
     - Build command: `npx @cloudflare/next-on-pages`
     - Build output: `.vercel/output/static`
     - Node version: **18**

4. **Set Environment Variables**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://uwazjnsqbzeyjbybvepj.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
   NODE_VERSION=18
   ```

5. **Deploy!**
   - Klik "Save and Deploy"
   - Tunggu ~3-5 menit
   - Done! ✅

**URL:** `https://cs-dashboard.pages.dev`

---

### 3️⃣ Deploy via CLI (Advanced)

#### Cloudflare Wrangler

```bash
# Install wrangler globally
npm install -g wrangler

# Login
wrangler login

# Build
npm run pages:build

# Deploy
wrangler pages deploy .vercel/output/static --project-name=cs-dashboard
```

---

## 📋 Checklist Sebelum Deploy

- [ ] Supabase database sudah setup
- [ ] Environment variables sudah dicatat
- [ ] Code sudah di-push ke GitHub
- [ ] Dependencies sudah di-install (`npm install`)
- [ ] Build berhasil lokal (`npm run build`)

---

## 🔧 Troubleshooting

### Build Error: "Module not found"
```bash
# Clear cache dan reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### API Routes tidak jalan di Cloudflare
- Pastikan sudah ada `export const runtime = 'edge';` di setiap API route
- Check Cloudflare Functions logs di dashboard

### Environment Variables tidak terbaca
- Pastikan prefix `NEXT_PUBLIC_` untuk client-side variables
- Redeploy setelah update env vars

---

## 📊 Perbandingan Platform

| Feature | Vercel | Cloudflare Pages |
|---------|--------|------------------|
| **Setup** | ⭐⭐⭐⭐⭐ Sangat mudah | ⭐⭐⭐⭐ Mudah |
| **Bandwidth** | 100GB/bulan | ♾️ Unlimited |
| **Build Time** | ~2 min | ~3-5 min |
| **Global CDN** | ✅ | ✅ |
| **Analytics** | ✅ Built-in | ⚠️ Perlu setup |
| **Preview Deploy** | ✅ | ✅ |
| **Custom Domain** | ✅ Gratis | ✅ Gratis |
| **Free Tier** | ✅ Generous | ✅ Very generous |

---

## 🎯 Rekomendasi

**Untuk MVP/Testing:** → **Vercel** (paling mudah)

**Untuk Production dengan traffic tinggi:** → **Cloudflare Pages** (unlimited bandwidth)

**Untuk Enterprise:** → **Vercel Pro** atau **Cloudflare Workers**

---

## 🔗 Resources

- [Vercel Docs](https://vercel.com/docs)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

**Built with ❤️ by SalingJaga Engineering**
