const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  console.error('Please make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Mock data arrays
const agents = [
  'Sarah Johnson',
  'Michael Chen',
  'Emily Rodriguez',
  'David Kim',
  'Jessica Williams',
  'Alex Thompson',
];

const customerMessages = [
  'Hi, I have a problem with my recent order #12345. It hasn\'t arrived yet.',
  'Can you help me reset my password? I\'ve been locked out of my account.',
  'I was charged twice for the same transaction. Please help!',
  'The product I received is damaged. What should I do?',
  'How do I track my shipment? I can\'t find the tracking number.',
  'I want to return an item. What\'s your return policy?',
  'My discount code isn\'t working at checkout.',
  'Can I change my delivery address? The order hasn\'t shipped yet.',
  'I need to cancel my subscription. How do I do that?',
  'The app keeps crashing when I try to make a payment.',
  'I didn\'t receive my refund yet. It\'s been 2 weeks.',
  'Can you explain the difference between your premium and basic plans?',
  'I\'m having trouble connecting my account to the mobile app.',
  'Is there a way to expedite my shipping?',
  'I received the wrong item. Can you send the correct one?',
];

const csReplies = [
  'I apologize for the inconvenience. Let me check the status of your order right away. Your order is currently in transit and should arrive within 2-3 business days.',
  'I\'d be happy to help you reset your password. I\'ve sent a password reset link to your registered email address. Please check your inbox and spam folder.',
  'I sincerely apologize for the duplicate charge. I\'ve initiated a refund for the extra charge, which should appear in your account within 5-7 business days.',
  'I\'m sorry to hear about the damaged product. We\'ll send you a replacement immediately at no cost. You don\'t need to return the damaged item.',
  'Of course! Your tracking number is TRK123456789. You can track your shipment at our website or directly through the carrier\'s website.',
  'Our return policy allows returns within 30 days of purchase. I\'ll email you a prepaid return label right away. Full refund will be processed once we receive the item.',
  'Let me help you with that discount code. It appears the code has expired. However, I\'ve applied a 15% discount to your cart as a courtesy.',
  'Absolutely! I\'ve updated your delivery address. Since the order hasn\'t shipped yet, it will go to the new address you provided.',
  'I can help you cancel your subscription. I\'ve processed the cancellation, and you won\'t be charged for the next billing cycle.',
  'I apologize for the technical issue. Please try clearing your app cache or reinstalling the app. If the problem persists, our tech team will investigate further.',
  'I apologize for the delay in your refund. I\'ve escalated this to our finance team, and you should receive the refund within 2-3 business days.',
  'Great question! The premium plan includes unlimited access, priority support, and advanced features, while the basic plan has limited access. I can send you a detailed comparison.',
  'Let me help you troubleshoot the connection issue. First, make sure you\'re using the same email address for both accounts. I\'ll send you step-by-step instructions.',
  'Yes, we offer expedited shipping! I can upgrade your shipping to express delivery for an additional $15. Your order would arrive tomorrow.',
  'I sincerely apologize for the mix-up. I\'ve arranged for the correct item to be shipped today with express delivery. You can keep the wrong item as our apology.',
];

const feedbackTemplates = [
  'Excellent response with empathy and clear solution.',
  'Good handling of the issue, provided accurate information.',
  'Response could be more empathetic, but solution is correct.',
  'Great proactive approach and customer-centric solution.',
  'Clear and concise, addressed all customer concerns.',
  'Could improve on response time, but quality is good.',
  'Outstanding service recovery and compensation offered.',
  'Professional tone maintained throughout the interaction.',
  'Could provide more detailed explanation of the process.',
  'Excellent problem-solving and follow-up commitment.',
];

// Function to generate random score
function randomScore(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate random date within last 30 days
function randomDate() {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
  return date.toISOString();
}

// Function to generate a single evaluation
function generateEvaluation(ticketId) {
  const agent = agents[Math.floor(Math.random() * agents.length)];
  const customerMessage = customerMessages[Math.floor(Math.random() * customerMessages.length)];
  const csReply = csReplies[Math.floor(Math.random() * csReplies.length)];
  
  // Generate scores with some correlation (good agents tend to score higher)
  const baseScore = randomScore(60, 95);
  const variance = 10;
  
  const accuracy = Math.min(100, Math.max(0, baseScore + randomScore(-variance, variance)));
  const tone = Math.min(100, Math.max(0, baseScore + randomScore(-variance, variance)));
  const clarity = Math.min(100, Math.max(0, baseScore + randomScore(-variance, variance)));
  const completeness = Math.min(100, Math.max(0, baseScore + randomScore(-variance, variance)));
  const relevance = Math.min(100, Math.max(0, baseScore + randomScore(-variance, variance)));
  
  const overall_score = Math.round((accuracy + tone + clarity + completeness + relevance) / 5);
  
  const feedback = feedbackTemplates[Math.floor(Math.random() * feedbackTemplates.length)];
  
  return {
    ticket_id: `TICKET-${String(ticketId).padStart(6, '0')}`,
    agent_name: agent,
    customer_message: customerMessage,
    cs_reply: csReply,
    accuracy,
    tone,
    clarity,
    completeness,
    relevance,
    overall_score,
    feedback,
    created_at: randomDate(),
  };
}

// Main function to generate and insert mock data
async function generateMockData(count = 50) {
  console.log(`🚀 Generating ${count} mock evaluations...`);
  
  const evaluations = [];
  for (let i = 1; i <= count; i++) {
    evaluations.push(generateEvaluation(i));
  }
  
  // Insert data in batches of 10
  const batchSize = 10;
  let inserted = 0;
  
  for (let i = 0; i < evaluations.length; i += batchSize) {
    const batch = evaluations.slice(i, i + batchSize);
    const { data, error } = await supabase
      .from('cs_evaluation')
      .insert(batch);
    
    if (error) {
      console.error(`❌ Error inserting batch ${i / batchSize + 1}:`, error.message);
    } else {
      inserted += batch.length;
      console.log(`✅ Inserted batch ${i / batchSize + 1} (${inserted}/${evaluations.length})`);
    }
  }
  
  console.log(`\n🎉 Successfully inserted ${inserted} mock evaluations!`);
  console.log(`📊 You can now view them in your dashboard.`);
}

// Run the script
const count = process.argv[2] ? parseInt(process.argv[2]) : 50;
generateMockData(count)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
