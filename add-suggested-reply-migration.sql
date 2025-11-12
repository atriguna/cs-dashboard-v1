-- Migration: Add suggested_reply column to existing cs_evaluation table
-- Run this in your Supabase SQL Editor if you already have the table created

-- Add the suggested_reply column
ALTER TABLE cs_evaluation 
ADD COLUMN IF NOT EXISTS suggested_reply text;

-- Verify the migration
SELECT 
  ticket_id, 
  agent_name,
  channel_account,
  suggested_reply,
  created_at 
FROM cs_evaluation 
ORDER BY created_at DESC 
LIMIT 5;
