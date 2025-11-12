# CS Evaluation Dashboard

A modern, real-time dashboard for visualizing AI-powered customer service evaluation scores from Qontak conversations.

## ✨ Features

### 📊 Dashboard Features
- **Real-time Statistics**: Total evaluations, average scores, top performers, and active agents
- **Interactive Charts**: 
  - 7-day trend analysis with dual Y-axis
  - Score distribution pie chart
  - Agent performance breakdown
- **Evaluations Table**: 
  - Grouped by ticket ID
  - Search by ticket number
  - Filter by agent and channel
  - Detailed modal view for each ticket
- **Auto-refresh**: Dashboard updates every 30 seconds
- **Authentication**: Simple login system with demo accounts
- **Dark Mode Support**: Beautiful UI that works in light and dark themes
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### 🔐 Authentication
- Protected routes with auto-redirect
- Session management (24-hour validity)
- Demo accounts ready to use
- User display in header

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Charts**: Recharts
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Simple demo auth (upgradeable to Supabase Auth)
- **Icons**: Lucide React

## 📊 Evaluation Metrics

Each customer service interaction is scored on:

1. **Accuracy** (0-100): How correct and factual the response is
2. **Tone** (0-100): Professionalism and empathy in communication
3. **Clarity** (0-100): How clear and understandable the response is
4. **Completeness** (0-100): Whether all customer questions are addressed
5. **Relevance** (0-100): How relevant the response is to the customer's query

**Overall Score**: Weighted average of all metrics

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works fine)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd cs-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up the database**
   
   **For new database:**
   - Go to your Supabase project → SQL Editor
   - Run the SQL from `supabase-schema.sql`
   
   **For existing database:**
   - Run the SQL from `add-channel-account-migration.sql`

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Login to dashboard**
   
   Open [http://localhost:3000](http://localhost:3000)
   
   Use any of these demo accounts:
   - **Admin**: admin@example.com / admin123
   - **Demo**: demo@example.com / demo123456
   - **User**: user@example.com / password123

## 📁 Project Structure

```
cs-dashboard/
├── app/
│   ├── api/              # API routes
│   │   ├── evaluations/  # Evaluations endpoint
│   │   └── stats/        # Statistics endpoint
│   ├── login/            # Login page
│   ├── layout.tsx        # Root layout with AuthProvider
│   └── page.tsx          # Main dashboard page
├── components/           # React components
│   ├── AuthProvider.tsx  # Authentication wrapper
│   ├── EvaluationTable.tsx
│   ├── StatCard.tsx
│   ├── ScoreChart.tsx
│   ├── TrendChart.tsx
│   └── DistributionChart.tsx
├── lib/
│   ├── auth.ts          # Authentication helpers
│   └── supabase.ts      # Supabase client & types
├── scripts/             # Utility scripts
│   ├── generate-mock-data.js
│   └── test-connection.js
├── supabase-schema.sql  # Database schema
└── add-channel-account-migration.sql  # Migration for existing DB
```

## 🔧 Database Schema

### cs_evaluation Table

| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| ticket_id | text | Ticket identifier |
| agent_name | text | CS agent name |
| channel_account | text | Communication channel (WhatsApp, Email, etc) |
| customer_message | text | Customer's message |
| cs_reply | text | Agent's reply |
| accuracy | int | Accuracy score (0-100) |
| tone | int | Tone score (0-100) |
| clarity | int | Clarity score (0-100) |
| completeness | int | Completeness score (0-100) |
| relevance | int | Relevance score (0-100) |
| overall_score | float | Overall score (0-100) |
| feedback | text | AI feedback |
| created_at | timestamptz | Creation timestamp |

## 🎯 Key Features Explained

### Ticket Grouping
Evaluations with the same ticket_id are grouped together in the table. Click "View Details" to see all evaluations for that ticket.

### Channel Filtering
Filter evaluations by communication channel (WhatsApp, Instagram, Email, Facebook, etc.)

### Auto-Refresh
Dashboard automatically refreshes data every 30 seconds to show the latest evaluations.

### Data Consistency
Stats and table show the same 50 most recent evaluations for consistency.

## 🔐 Authentication

### Current Implementation (Demo)
Simple authentication with hardcoded demo users. Perfect for development and testing.

### Upgrading to Supabase Auth
See [AUTH-SETUP.md](./AUTH-SETUP.md) for instructions on implementing proper Supabase authentication for production.

## 📚 Additional Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Detailed setup guide
- **[AUTH-SETUP.md](./AUTH-SETUP.md)** - Authentication setup (Supabase Auth)
- **[MIGRATION-GUIDE.md](./MIGRATION-GUIDE.md)** - Database migration guide

## 🛠️ Utility Scripts

### Test Database Connection
```bash
node scripts/test-connection.js
```

### Generate Mock Data
```bash
node scripts/generate-mock-data.js
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Environment Variables for Production
```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Supabase](https://supabase.com/)
- Charts by [Recharts](https://recharts.org/)
- Icons by [Lucide](https://lucide.dev/)
