# Authentication Setup Guide

## Overview
This dashboard now includes authentication using Supabase Auth. Users must login before accessing the dashboard.

## Features
- ✅ Email/Password authentication
- ✅ Protected routes (auto-redirect to login)
- ✅ Session management
- ✅ Logout functionality
- ✅ Beautiful login UI

## Setup Instructions

### 1. Enable Authentication in Supabase

1. **Go to your Supabase Dashboard**
   - Navigate to: https://app.supabase.com
   - Select your project

2. **Enable Email Auth**
   - Go to `Authentication` → `Providers`
   - Make sure `Email` provider is enabled
   - **Disable** "Confirm email" if you want to test without email verification
   - Click `Save`

3. **Configure Site URL** (Important!)
   - Go to `Authentication` → `URL Configuration`
   - Set `Site URL` to: `http://localhost:3001` (or your production URL)
   - Add `http://localhost:3001/**` to `Redirect URLs`
   - Click `Save`

### 2. Create Test Users

You have two options:

#### Option A: Create User via Supabase Dashboard
1. Go to `Authentication` → `Users`
2. Click `Add user` → `Create new user`
3. Enter email and password
4. Click `Create user`

#### Option B: Create User via SQL
Run this in your Supabase SQL Editor:

```sql
-- This will create a user with email and password
-- Note: You need to use Supabase Auth API or Dashboard to create users properly
-- The SQL method below is for reference only

-- Instead, use the Supabase Dashboard to create users
```

**Recommended Test User:**
- Email: `demo@example.com`
- Password: `demo123456`

### 3. Test the Login

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Access the dashboard:**
   - Open: http://localhost:3001
   - You should be automatically redirected to `/login`

3. **Login with your credentials:**
   - Enter the email and password you created
   - Click "Sign In"
   - You should be redirected to the dashboard

4. **Test Logout:**
   - Click the "Logout" button in the header
   - You should be redirected back to login page

## How It Works

### Authentication Flow

1. **User visits dashboard** → Checks for session
2. **No session found** → Redirect to `/login`
3. **User logs in** → Session stored in localStorage
4. **Session validated** → Access granted to dashboard
5. **User clicks logout** → Session cleared → Redirect to login

### File Structure

```
app/
├── login/
│   └── page.tsx          # Login page UI
├── layout.tsx            # Root layout with AuthProvider
└── page.tsx              # Protected dashboard page

components/
└── AuthProvider.tsx      # Authentication wrapper

lib/
├── auth.ts              # Auth helper functions
└── supabase.ts          # Supabase client
```

### Protected Routes

All routes except `/login` are protected. The `AuthProvider` component:
- Checks authentication on every page load
- Redirects to `/login` if not authenticated
- Allows access to dashboard if authenticated

## Security Notes

### Current Implementation
- ✅ Session stored in localStorage
- ✅ Session validated on page load
- ✅ Auto-redirect for unauthenticated users
- ✅ Logout clears session

### Production Recommendations
1. **Enable Email Confirmation** in Supabase Auth settings
2. **Use HTTPS** for production deployment
3. **Set proper CORS** in Supabase settings
4. **Configure proper redirect URLs** for production domain
5. **Enable Row Level Security (RLS)** on database tables

## Troubleshooting

### "Invalid login credentials"
- Check if user exists in Supabase Dashboard
- Verify email and password are correct
- Make sure Email provider is enabled

### Redirect loop / Stuck on login
- Clear browser localStorage
- Check Supabase Site URL configuration
- Verify redirect URLs are set correctly

### "Failed to login"
- Check browser console for errors
- Verify Supabase credentials in `.env.local`
- Check if Supabase project is active

### Session not persisting
- Check if localStorage is enabled in browser
- Clear browser cache and try again
- Verify session is being stored (check DevTools → Application → Local Storage)

## Adding Row Level Security (RLS)

To secure your database tables, add RLS policies:

```sql
-- Enable RLS on cs_evaluation table
ALTER TABLE cs_evaluation ENABLE ROW LEVEL SECURITY;

-- Policy: Allow authenticated users to read all evaluations
CREATE POLICY "Allow authenticated read access" ON cs_evaluation
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Policy: Allow authenticated users to insert evaluations
CREATE POLICY "Allow authenticated insert access" ON cs_evaluation
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');
```

## Customization

### Change Login Page Design
Edit: `app/login/page.tsx`

### Add More Auth Providers
1. Enable provider in Supabase Dashboard
2. Update login page with provider buttons
3. Use `supabase.auth.signInWithOAuth()`

### Add Password Reset
1. Create `/forgot-password` page
2. Use `supabase.auth.resetPasswordForEmail()`
3. Configure email templates in Supabase

### Add User Profile
1. Create user profile table in Supabase
2. Add profile page in dashboard
3. Fetch user data with `supabase.auth.getUser()`

## Demo Credentials

For testing purposes, create a user with:
- **Email:** demo@example.com
- **Password:** demo123456

Remember to create this user in your Supabase Dashboard!
