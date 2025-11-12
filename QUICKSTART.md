# ⚡ Quick Start Guide

Get your CS Evaluation Dashboard running in **3 minutes**!

## Prerequisites
- ✅ Node.js 18+ installed
- ✅ A Supabase account (free tier works!)

---

## Step 1: Configure Supabase (2 minutes)

### 1.1 Get Your Credentials
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Create a new project (or use existing)
3. Go to **Settings** → **API**
4. Copy these values:
   - **Project URL**
   - **anon public** key

### 1.2 Set Environment Variables
Edit the `.env.local` file (already created) and add your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-key-here
```

### 1.3 Create Database Table
1. In Supabase, go to **SQL Editor**
2. Copy and paste the entire content of `supabase-schema.sql`
3. Click **Run**
4. You should see: "Success. No rows returned" (this is good!)
5. Sample data will be inserted automatically

---

## Step 2: Run the Dashboard (30 seconds)

```bash
npm run dev
```

Open your browser to: **http://localhost:3000**

🎉 **Done!** You should see your dashboard with sample data.

---

## What You'll See

### Dashboard Overview
- **4 Stat Cards**: Total evaluations, average score, top agent, active agents
- **3 Charts**: 
  - 7-day trend (line chart)
  - Score distribution (pie chart)
  - Agent performance (bar chart)
- **Evaluations Table**: Recent evaluations with details

### Sample Data
The schema includes 12 sample evaluations with:
- 4 different agents (John Doe, Jane Smith, Sarah Johnson, Mike Wilson)
- Various ticket scenarios
- Scores ranging from 77 to 95
- Realistic customer messages and CS replies

---

## Troubleshooting

### "Failed to fetch stats" Error
**Problem**: Cannot connect to Supabase

**Solutions**:
1. Check `.env.local` has correct credentials
2. Verify Supabase project is active
3. Check browser console for specific error
4. Visit http://localhost:3000/api/stats directly to see error details

### No Data Showing
**Problem**: Table is empty

**Solutions**:
1. Run `supabase-schema.sql` in Supabase SQL Editor
2. Verify data exists: Run `SELECT COUNT(*) FROM cs_evaluation;` in SQL Editor
3. Check RLS policies allow read access

### Port 3000 Already in Use
**Problem**: Another app is using port 3000

**Solution**:
```bash
npm run dev -- -p 3001
```
Then visit: http://localhost:3001

### TypeScript Errors
**Problem**: Type errors during build

**Solution**:
```bash
npm install
```

---

## Next Steps

### Add Your Own Data
Insert your evaluations via Supabase dashboard or API:

```sql
INSERT INTO cs_evaluation (
  ticket_id, agent_name, customer_message, cs_reply,
  accuracy, tone, clarity, completeness, relevance,
  overall_score, feedback
) VALUES (
  'TKT-999',
  'Your Agent Name',
  'Customer question here',
  'CS reply here',
  85, 90, 88, 85, 90,
  87.6,
  'AI feedback here'
);
```

### Customize the Dashboard
- **Colors**: Edit `tailwind.config.ts`
- **Charts**: Modify components in `/components`
- **Data Logic**: Update API routes in `/app/api`

### Deploy to Production
See `README.md` for deployment instructions (Vercel recommended)

---

## File Structure Reference

```
cs-dashboard/
├── app/
│   ├── page.tsx              # Main dashboard
│   ├── layout.tsx            # App layout
│   ├── globals.css           # Styles
│   └── api/
│       ├── stats/route.ts    # Statistics API
│       └── evaluations/route.ts  # Evaluations API
├── components/
│   ├── StatCard.tsx          # Stat cards
│   ├── ScoreChart.tsx        # Bar chart
│   ├── TrendChart.tsx        # Line chart
│   ├── DistributionChart.tsx # Pie chart
│   └── EvaluationTable.tsx   # Table + modal
├── lib/
│   └── supabase.ts           # Supabase client
├── .env.local                # Your credentials (DO NOT COMMIT)
├── supabase-schema.sql       # Database setup
└── package.json              # Dependencies
```

---

## Support

- 📖 Full docs: See `README.md`
- 🔧 Setup details: See `SETUP.md`
- 📊 Project info: See `PROJECT_SUMMARY.md`

---

**Happy Analyzing! 📊✨**
