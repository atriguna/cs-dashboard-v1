# Migration Guide - Adding Channel Account Feature

## Overview
This guide will help you add the `channel_account` feature to your existing CS Dashboard.

## Changes Made

### 1. Database Schema
- Added `channel_account` column to `cs_evaluation` table
- Added index on `channel_account` for better query performance

### 2. Frontend Updates
- Added `channel_account` field to TypeScript interface
- Added "Channel" column in the Recent Evaluations table
- Added channel filter dropdown in search filters
- Display channel information in evaluation detail modal
- Added auto-refresh every 30 seconds to keep data updated

### 3. Features
- **Search by Channel**: Filter evaluations by channel (WhatsApp, Instagram, Email, Facebook, etc.)
- **Channel Display**: View which channel each evaluation came from
- **Auto-refresh**: Dashboard automatically refreshes data every 30 seconds

## Migration Steps

### If you already have a database table:

1. **Run the migration SQL**:
   - Open your Supabase SQL Editor
   - Copy and paste the contents of `add-channel-account-migration.sql`
   - Click "Run" to execute the migration
   - This will add the `channel_account` column to your existing table

2. **Verify the migration**:
   ```sql
   SELECT ticket_id, agent_name, channel_account 
   FROM cs_evaluation 
   LIMIT 5;
   ```

3. **Update your data**:
   - The migration script includes sample data updates
   - Or you can manually update records with the correct channel information

### If you're creating a fresh database:

1. **Use the updated schema**:
   - Open your Supabase SQL Editor
   - Copy and paste the contents of `supabase-schema.sql`
   - Click "Run" to create the table with all fields including `channel_account`

## Testing

1. **Restart your development server**:
   ```bash
   npm run dev
   ```

2. **Test the features**:
   - Check if the "Channel" column appears in the table
   - Try filtering by different channels using the dropdown
   - Open evaluation details and verify channel information is displayed
   - Wait 30 seconds to verify auto-refresh is working

## Troubleshooting

### Data not updating?
- Clear your browser cache
- The dashboard now auto-refreshes every 30 seconds
- You can also manually refresh the page

### Channel column showing "N/A"?
- Make sure you ran the migration script
- Check if your existing data has `channel_account` values
- Update records manually if needed:
  ```sql
  UPDATE cs_evaluation 
  SET channel_account = 'WhatsApp' 
  WHERE ticket_id = 'YOUR-TICKET-ID';
  ```

### Filter not working?
- Make sure the index was created:
  ```sql
  CREATE INDEX IF NOT EXISTS idx_cs_evaluation_channel_account 
  ON cs_evaluation(channel_account);
  ```

## Channel Options

The system supports any channel name, but common ones include:
- WhatsApp
- Instagram
- Facebook
- Email
- Telegram
- Twitter
- Website Chat
- Phone

You can add your own channel names as needed!
