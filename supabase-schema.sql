-- CS Evaluation Table Schema
-- Run this in your Supabase SQL Editor

-- Create the main table
CREATE TABLE IF NOT EXISTS cs_evaluation (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id text,
  agent_name text,
  channel_account text,
  customer_message text,
  cs_reply text,
  suggested_reply text,
  accuracy int CHECK (accuracy >= 0 AND accuracy <= 100),
  tone int CHECK (tone >= 0 AND tone <= 100),
  clarity int CHECK (clarity >= 0 AND clarity <= 100),
  completeness int CHECK (completeness >= 0 AND completeness <= 100),
  relevance int CHECK (relevance >= 0 AND relevance <= 100),
  overall_score float CHECK (overall_score >= 0 AND overall_score <= 100),
  feedback text,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_cs_evaluation_agent_name ON cs_evaluation(agent_name);
CREATE INDEX IF NOT EXISTS idx_cs_evaluation_created_at ON cs_evaluation(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cs_evaluation_ticket_id ON cs_evaluation(ticket_id);
CREATE INDEX IF NOT EXISTS idx_cs_evaluation_channel_account ON cs_evaluation(channel_account);

-- Enable Row Level Security (RLS)
ALTER TABLE cs_evaluation ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow read access (adjust based on your security needs)
-- This policy allows anyone with the anon key to read data
CREATE POLICY "Allow public read access" ON cs_evaluation
  FOR SELECT
  USING (true);

-- Optional: Create a policy to allow insert (if you want to add data via the app)
CREATE POLICY "Allow public insert access" ON cs_evaluation
  FOR INSERT
  WITH CHECK (true);

-- Insert sample data for testing
INSERT INTO cs_evaluation (ticket_id, agent_name, channel_account, customer_message, cs_reply, accuracy, tone, clarity, completeness, relevance, overall_score, feedback)
VALUES 
  ('TKT-001', 'John Doe', 'WhatsApp', 'I need help with my order #12345. It has not arrived yet and it has been 2 weeks.', 'I would be happy to help you with your order. Can you provide more details about the issue? Let me check the tracking information for you.', 85, 90, 88, 80, 92, 87.0, 'Great response with professional tone and clear next steps. Shows willingness to help.'),
  
  ('TKT-002', 'Jane Smith', 'Instagram', 'Product not working after 2 days of purchase. Very disappointed!', 'I sincerely apologize for the inconvenience. Let me help you troubleshoot the issue step by step. We will make this right for you.', 90, 95, 92, 88, 90, 91.0, 'Excellent empathy and problem-solving approach. Acknowledges customer frustration.'),
  
  ('TKT-003', 'John Doe', 'WhatsApp', 'I want a refund for my purchase. The product does not meet my expectations.', 'I will process your refund request immediately. You will receive it in 3-5 business days to your original payment method.', 75, 80, 85, 70, 78, 77.6, 'Could provide more details about the refund process and policy. Missing empathy statement.'),
  
  ('TKT-004', 'Sarah Johnson', 'Email', 'How do I track my shipment? I did not receive any tracking email.', 'You can track your shipment using the tracking number sent to your email. Let me resend it to you right away. Please check your spam folder as well.', 88, 85, 90, 85, 88, 87.2, 'Clear and helpful response. Proactively offers to resend and mentions spam folder.'),
  
  ('TKT-005', 'Jane Smith', 'Facebook', 'I cannot login to my account. Keep getting error message.', 'I understand the frustration with login issues. Let me reset your password and send you a secure link to create a new one. This should resolve the issue.', 92, 88, 90, 90, 92, 90.4, 'Professional handling of security issue. Clear action plan provided.'),
  
  ('TKT-006', 'Mike Wilson', 'WhatsApp', 'Wrong item delivered! I ordered blue but received red.', 'I sincerely apologize for this error. We will send the correct blue item immediately with express shipping and arrange pickup for the wrong one at no cost to you.', 95, 92, 94, 95, 95, 94.2, 'Outstanding response with clear action plan. Takes ownership and offers solution.'),
  
  ('TKT-007', 'John Doe', 'Instagram', 'Discount code SAVE20 not working at checkout.', 'Let me check that for you. The code SAVE20 expired yesterday, but I can apply a new code SAVE25 to your order which gives you even better savings.', 80, 85, 82, 78, 85, 82.0, 'Good problem solving but could be more proactive. Offers alternative solution.'),
  
  ('TKT-008', 'Sarah Johnson', 'Email', 'Product quality is not as advertised. Material feels cheap.', 'Thank you for bringing this to our attention. We take quality seriously and will investigate immediately. Would you like a replacement or full refund?', 85, 90, 88, 82, 88, 86.6, 'Shows commitment to quality. Offers clear options for resolution.'),
  
  ('TKT-009', 'Mike Wilson', 'WhatsApp', 'Shipping took too long. Order was supposed to arrive last week.', 'I apologize for the shipping delay. Let me check what happened with your order and see if we can expedite the remaining delivery time.', 78, 82, 80, 75, 80, 79.0, 'Adequate response but lacks specific action plan. Could offer compensation.'),
  
  ('TKT-010', 'Jane Smith', 'Instagram', 'Very happy with the product! Just wanted to say thank you.', 'Thank you so much for your kind words! We are thrilled to hear you are happy with your purchase. Please do not hesitate to reach out if you need anything else.', 95, 98, 95, 90, 95, 94.6, 'Excellent positive engagement. Maintains professional tone and invites future interaction.'),
  
  ('TKT-011', 'John Doe', 'Email', 'Can I change my shipping address? Order has not shipped yet.', 'Absolutely! I have updated your shipping address in our system. Your order will be sent to the new address you provided.', 90, 88, 92, 88, 92, 90.0, 'Quick and efficient response. Confirms action taken.'),
  
  ('TKT-012', 'Sarah Johnson', 'WhatsApp', 'Product arrived damaged. Box was crushed during shipping.', 'I am so sorry to hear about the damaged product. We will send you a replacement immediately and you can keep or dispose of the damaged item. No need to return it.', 92, 95, 90, 95, 92, 92.8, 'Exceptional customer service. Makes it easy for customer with no return needed.');

-- Verify the data was inserted
SELECT COUNT(*) as total_records FROM cs_evaluation;

-- Show sample of the data
SELECT 
  ticket_id, 
  agent_name,
  channel_account, 
  overall_score, 
  created_at 
FROM cs_evaluation 
ORDER BY created_at DESC 
LIMIT 5;
