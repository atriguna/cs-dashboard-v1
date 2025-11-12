const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://uwazjnsqbzeyjbybvepj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3YXpqbnNxYnpleWpieWJ2ZXBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4NDE4MDQsImV4cCI6MjA3ODQxNzgwNH0._fVeIMoVyrvdXuT-rQGm1CuhbAqPqJb91m89hB4HjIk';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAgents() {
  try {
    // Get all evaluations
    const { data, error } = await supabase
      .from('cs_evaluation')
      .select('agent_name, ticket_id, overall_score, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error:', error);
      return;
    }

    console.log('\n=== TOTAL RECORDS ===');
    console.log(`Total: ${data.length} evaluations\n`);

    // Check recent 50 records
    console.log('=== RECENT 50 RECORDS (shown in dashboard) ===');
    const recent50 = data.slice(0, 50);
    const recent50Agents = new Map();
    recent50.forEach(row => {
      const agent = row.agent_name || 'Unknown';
      if (!recent50Agents.has(agent)) {
        recent50Agents.set(agent, { count: 0, totalScore: 0 });
      }
      const agentData = recent50Agents.get(agent);
      agentData.count++;
      agentData.totalScore += row.overall_score || 0;
    });
    
    console.log('Agents in recent 50 records:');
    Array.from(recent50Agents.entries())
      .sort((a, b) => b[1].count - a[1].count)
      .forEach(([agent, stats]) => {
        const avgScore = (stats.totalScore / stats.count).toFixed(2);
        console.log(`  ${agent}: ${stats.count} evals, avg score: ${avgScore}`);
      });
    console.log('');

    // Group by agent
    const agentMap = new Map();
    data.forEach(row => {
      const agent = row.agent_name || 'Unknown';
      if (!agentMap.has(agent)) {
        agentMap.set(agent, {
          count: 0,
          totalScore: 0,
          tickets: new Set()
        });
      }
      const agentData = agentMap.get(agent);
      agentData.count++;
      agentData.totalScore += row.overall_score || 0;
      agentData.tickets.add(row.ticket_id);
    });

    console.log('=== AGENTS FOUND ===');
    Array.from(agentMap.entries())
      .sort((a, b) => b[1].count - a[1].count)
      .forEach(([agent, stats]) => {
        const avgScore = (stats.totalScore / stats.count).toFixed(2);
        console.log(`${agent}: ${stats.count} evals, avg score: ${avgScore}, ${stats.tickets.size} tickets`);
      });

    // Check for Nadya specifically
    console.log('\n=== SEARCH FOR "NADYA" ===');
    const nadyaRecords = data.filter(row => 
      row.agent_name && row.agent_name.toLowerCase().includes('nadya')
    );
    
    if (nadyaRecords.length > 0) {
      console.log(`Found ${nadyaRecords.length} records with "Nadya":`);
      nadyaRecords.forEach(row => {
        console.log(`- ${row.agent_name} | Ticket: ${row.ticket_id} | Score: ${row.overall_score} | Date: ${row.created_at}`);
      });
    } else {
      console.log('No records found with "Nadya" in agent_name');
    }

    // Show all unique agent names
    console.log('\n=== ALL UNIQUE AGENT NAMES ===');
    const uniqueAgents = [...new Set(data.map(row => row.agent_name))].sort();
    uniqueAgents.forEach(agent => {
      console.log(`- ${agent || '(null/empty)'}`);
    });

  } catch (err) {
    console.error('Error:', err);
  }
}

checkAgents();
