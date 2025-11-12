-- Migration: Add channel_account column to existing cs_evaluation table
-- Run this in your Supabase SQL Editor if you already have the table created

-- Add the channel_account column
ALTER TABLE cs_evaluation 
ADD COLUMN IF NOT EXISTS channel_account text;

-- Add the suggested_reply column
ALTER TABLE cs_evaluation 
ADD COLUMN IF NOT EXISTS suggested_reply text;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_cs_evaluation_channel_account ON cs_evaluation(channel_account);

-- Update existing records with sample channel data (optional)
-- You can skip this if you want to update the data manually
UPDATE cs_evaluation 
SET channel_account = CASE 
  WHEN agent_name = 'John Doe' THEN 
    CASE 
      WHEN ticket_id LIKE '%001' THEN 'WhatsApp'
      WHEN ticket_id LIKE '%003' THEN 'WhatsApp'
      WHEN ticket_id LIKE '%007' THEN 'Instagram'
      WHEN ticket_id LIKE '%011' THEN 'Email'
      ELSE 'WhatsApp'
    END
  WHEN agent_name = 'Jane Smith' THEN 
    CASE 
      WHEN ticket_id LIKE '%002' THEN 'Instagram'
      WHEN ticket_id LIKE '%005' THEN 'Facebook'
      WHEN ticket_id LIKE '%010' THEN 'Instagram'
      ELSE 'Instagram'
    END
  WHEN agent_name = 'Sarah Johnson' THEN 
    CASE 
      WHEN ticket_id LIKE '%004' THEN 'Email'
      WHEN ticket_id LIKE '%008' THEN 'Email'
      WHEN ticket_id LIKE '%012' THEN 'WhatsApp'
      ELSE 'Email'
    END
  WHEN agent_name = 'Mike Wilson' THEN 'WhatsApp'
  ELSE 'WhatsApp'
END
WHERE channel_account IS NULL;

-- Verify the migration
SELECT 
  ticket_id, 
  agent_name,
  channel_account,
  created_at 
FROM cs_evaluation 
ORDER BY created_at DESC 
LIMIT 10;
