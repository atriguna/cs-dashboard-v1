# Deploy Next.js Dashboard ke Cloudflare Pages

## ✅ Apakah Possible?

**YA!** Next.js 14 bisa di-deploy ke Cloudflare Pages menggunakan **@cloudflare/next-on-pages**.

## 📋 Prerequisites

1. Akun Cloudflare (gratis)
2. Repository GitHub/GitLab (untuk auto-deployment)
3. Supabase database sudah setup

## 🚀 Cara Deploy

### Opsi 1: Deploy via Cloudflare Dashboard (Recommended)

#### Step 1: Push ke GitHub

```bash
# Initialize git (jika belum)
git init
git add .
git commit -m "Initial commit - CS Dashboard"

# Push ke GitHub
git remote add origin https://github.com/username/cs-dashboard.git
git branch -M main
git push -u origin main
```

#### Step 2: Install Dependencies untuk Cloudflare

```bash
npm install --save-dev @cloudflare/next-on-pages
```

#### Step 3: Update package.json

Tambahkan script untuk Cloudflare build:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "pages:build": "npx @cloudflare/next-on-pages",
    "pages:dev": "npx @cloudflare/next-on-pages --watch",
    "pages:deploy": "npm run pages:build && wrangler pages deploy .vercel/output/static"
  }
}
```

#### Step 4: Update next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Required for Cloudflare Pages
  output: 'export', // For static export
  images: {
    unoptimized: true, // Cloudflare doesn't support Next.js Image Optimization
  },
}

module.exports = nextConfig
```

**⚠️ CATATAN PENTING:** 
Karena dashboard ini menggunakan **API Routes** (`/api/stats` dan `/api/evaluations`), kita **TIDAK bisa** menggunakan `output: 'export'`. 

Kita harus menggunakan **Cloudflare Workers** dengan `@cloudflare/next-on-pages`.

#### Step 5: Buat wrangler.toml

```toml
name = "cs-dashboard"
compatibility_date = "2024-01-01"
pages_build_output_dir = ".vercel/output/static"

[env.production]
vars = { NODE_ENV = "production" }
```

#### Step 6: Setup di Cloudflare Dashboard

1. Login ke [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Pilih **Pages** di sidebar
3. Klik **Create a project**
4. Connect ke GitHub repository
5. Configure build settings:
   - **Framework preset**: Next.js
   - **Build command**: `npx @cloudflare/next-on-pages`
   - **Build output directory**: `.vercel/output/static`
   - **Node version**: 18 atau 20

#### Step 7: Set Environment Variables

Di Cloudflare Pages Settings → Environment Variables, tambahkan:

```
NEXT_PUBLIC_SUPABASE_URL=https://uwazjnsqbzeyjbybvepj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

#### Step 8: Deploy!

Klik **Save and Deploy**. Cloudflare akan otomatis build dan deploy.

---

### Opsi 2: Deploy via Wrangler CLI

#### Step 1: Install Wrangler

```bash
npm install -g wrangler
```

#### Step 2: Login ke Cloudflare

```bash
wrangler login
```

#### Step 3: Build dan Deploy

```bash
# Build untuk Cloudflare
npx @cloudflare/next-on-pages

# Deploy
wrangler pages deploy .vercel/output/static --project-name=cs-dashboard
```

---

## ⚠️ Limitasi Cloudflare Pages vs Vercel

| Feature | Vercel | Cloudflare Pages |
|---------|--------|------------------|
| Next.js API Routes | ✅ Full support | ⚠️ Via Workers (ada limitasi) |
| Image Optimization | ✅ Built-in | ❌ Perlu disable |
| Edge Runtime | ✅ | ✅ |
| Serverless Functions | ✅ | ⚠️ Via Workers (max 1MB) |
| Auto-scaling | ✅ | ✅ |
| Free Tier | 100GB bandwidth | Unlimited bandwidth |
| Build Time | Fast | Fast |
| Cold Start | ~100ms | ~0ms (Edge) |

---

## 🔧 Modifikasi yang Diperlukan

### 1. API Routes Compatibility

Cloudflare Workers memiliki limitasi:
- Max script size: 1MB (after compression)
- No Node.js APIs (fs, path, dll)
- Supabase client harus compatible dengan Edge Runtime

### 2. Update API Routes untuk Edge Runtime

Tambahkan di setiap API route:

```typescript
// app/api/stats/route.ts
export const runtime = 'edge'; // Add this line

export async function GET() {
  // ... existing code
}
```

### 3. Supabase Client untuk Edge

Supabase JS client sudah compatible dengan Edge Runtime, jadi tidak perlu perubahan.

---

## 🎯 Rekomendasi

### Untuk Dashboard Ini:

**Opsi A: Vercel (Recommended)**
- ✅ Zero config, langsung deploy
- ✅ Full Next.js support
- ✅ Automatic HTTPS
- ✅ Preview deployments
- ✅ Analytics built-in

**Opsi B: Cloudflare Pages**
- ✅ Unlimited bandwidth (gratis)
- ✅ Faster edge network
- ✅ Lower latency global
- ⚠️ Perlu setup tambahan
- ⚠️ Beberapa limitasi

### Kesimpulan:

**Untuk production dengan traffic tinggi**: Cloudflare Pages (unlimited bandwidth)
**Untuk development/MVP**: Vercel (easier setup)

---

## 📚 Resources

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Next.js on Cloudflare](https://developers.cloudflare.com/pages/framework-guides/nextjs/)
- [@cloudflare/next-on-pages](https://github.com/cloudflare/next-on-pages)
- [Vercel Deployment](https://vercel.com/docs)

---

**Last Updated**: 2025-11-12
**Status**: Ready for deployment to both platforms
