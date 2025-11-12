const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔍 Testing Supabase Connection...\n');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? '✅ Set' : '❌ Missing');
  process.exit(1);
}

console.log('✅ Credentials found');
console.log('📍 URL:', supabaseUrl);
console.log('🔑 Key:', supabaseKey.substring(0, 20) + '...\n');

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('📊 Testing database connection...\n');

    // Test 1: Check if table exists and count rows
    console.log('Test 1: Counting rows in cs_evaluation table...');
    const { count, error: countError } = await supabase
      .from('cs_evaluation')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('❌ Error counting rows:', countError.message);
      console.error('   This might mean:');
      console.error('   - Table does not exist (run supabase-schema.sql)');
      console.error('   - RLS policy is blocking access');
      return;
    }

    console.log(`✅ Table exists! Found ${count} rows\n`);

    // Test 2: Try to fetch data
    console.log('Test 2: Fetching first 5 rows...');
    const { data, error: fetchError } = await supabase
      .from('cs_evaluation')
      .select('*')
      .limit(5);

    if (fetchError) {
      console.error('❌ Error fetching data:', fetchError.message);
      return;
    }

    if (data && data.length > 0) {
      console.log(`✅ Successfully fetched ${data.length} rows`);
      console.log('\nSample data:');
      data.forEach((row, index) => {
        console.log(`\n  Row ${index + 1}:`);
        console.log(`    Ticket ID: ${row.ticket_id}`);
        console.log(`    Agent: ${row.agent_name}`);
        console.log(`    Score: ${row.overall_score}`);
        console.log(`    Created: ${row.created_at}`);
      });
    } else {
      console.log('⚠️  Query succeeded but returned 0 rows');
      console.log('   The table is empty. You need to insert data.');
      console.log('   Run: npm run generate-mock');
    }

    // Test 3: Check RLS policies
    console.log('\n\nTest 3: Checking RLS policies...');
    console.log('Run this SQL in Supabase to check policies:');
    console.log('---');
    console.log(`SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE tablename = 'cs_evaluation';`);
    console.log('---\n');

    // Test 4: Try to insert a test row
    console.log('Test 4: Testing INSERT permission...');
    const testRow = {
      ticket_id: 'TEST-' + Date.now(),
      agent_name: 'Test Agent',
      customer_message: 'Test message',
      cs_reply: 'Test reply',
      accuracy: 85,
      tone: 90,
      clarity: 88,
      completeness: 87,
      relevance: 89,
      overall_score: 87.8,
      feedback: 'Test feedback',
    };

    const { data: insertData, error: insertError } = await supabase
      .from('cs_evaluation')
      .insert([testRow])
      .select();

    if (insertError) {
      console.error('❌ Cannot insert data:', insertError.message);
      console.error('   This means RLS policies are blocking INSERT');
      console.error('   Run setup-rls-policies.sql in Supabase SQL Editor');
    } else {
      console.log('✅ Successfully inserted test row!');
      console.log('   Inserted ID:', insertData[0]?.id);
      
      // Clean up test row
      await supabase
        .from('cs_evaluation')
        .delete()
        .eq('ticket_id', testRow.ticket_id);
      console.log('   (Test row cleaned up)');
    }

    console.log('\n✅ Connection test complete!');

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

testConnection()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
