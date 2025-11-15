import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Enable Edge Runtime for Cloudflare compatibility
export const runtime = 'edge';

export async function GET() {
  try {

    
    // Get recent evaluations from Supabase (same as table display)
    // Using same limit as evaluations table for consistency
    // Fetch ALL evaluations for accurate statistics
    // Using range instead of limit to bypass Supabase's 1000 row limit
    const { data: evaluations, error } = await supabase
      .from('cs_evaluation')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(0, 29999); // Fetch up to 10000 records



    if (error) {
      console.error('Error fetching evaluations from Supabase:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!evaluations || evaluations.length === 0) {
      return NextResponse.json({
        totalEvaluations: 0,
        averageScore: 0,
        topAgent: 'N/A',
        agentStats: [],
        scoreDistribution: [],
        recentTrend: [],
      });
    }

    // Calculate total evaluations
    const totalEvaluations = evaluations.length;

    // Calculate average score
    const totalScore = evaluations.reduce(
      (sum: number, evaluation: any) => sum + (evaluation.overall_score || 0),
      0
    );
    const averageScore = totalScore / totalEvaluations;

    // Calculate agent stats
    const agentMap = new Map();
    evaluations.forEach((evaluation: any) => {
      const agent = evaluation.agent_name || 'Unknown';
      if (!agentMap.has(agent)) {
        agentMap.set(agent, {
          name: agent,
          count: 0,
          totalScore: 0,
          scores: {
            accuracy: 0,
            tone: 0,
            clarity: 0,
            completeness: 0,
            relevance: 0,
          },
        });
      }
      const agentData = agentMap.get(agent);
      agentData.count += 1;
      agentData.totalScore += evaluation.overall_score || 0;
      agentData.scores.accuracy += evaluation.accuracy || 0;
      agentData.scores.tone += evaluation.tone || 0;
      agentData.scores.clarity += evaluation.clarity || 0;
      agentData.scores.completeness += evaluation.completeness || 0;
      agentData.scores.relevance += evaluation.relevance || 0;
    });

    const agentStats = Array.from(agentMap.values())
      .map((agent) => ({
        name: agent.name,
        count: agent.count,
        averageScore: agent.totalScore / agent.count,
        accuracy: agent.scores.accuracy / agent.count,
        tone: agent.scores.tone / agent.count,
        clarity: agent.scores.clarity / agent.count,
        completeness: agent.scores.completeness / agent.count,
        relevance: agent.scores.relevance / agent.count,
      }))
      .sort((a, b) => b.averageScore - a.averageScore);

    // Debug logging
    console.log('Top 3 Agents:', agentStats.slice(0, 3).map(a => ({
      name: a.name,
      score: a.averageScore.toFixed(2),
      count: a.count
    })));

    const topAgent = agentStats[0]?.name || 'N/A';
    const topAgentScore = agentStats[0]?.averageScore || 0;

    // Score distribution (0-20, 21-40, 41-60, 61-80, 81-100)
    const scoreRanges = [
      { range: '0-20', count: 0 },
      { range: '21-40', count: 0 },
      { range: '41-60', count: 0 },
      { range: '61-80', count: 0 },
      { range: '81-100', count: 0 },
    ];

    evaluations.forEach((evaluation: any) => {
      const score = evaluation.overall_score || 0;
      if (score <= 20) scoreRanges[0].count++;
      else if (score <= 40) scoreRanges[1].count++;
      else if (score <= 60) scoreRanges[2].count++;
      else if (score <= 80) scoreRanges[3].count++;
      else scoreRanges[4].count++;
    });

    // Recent trend (last 7 days)
    const now = new Date();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(now);
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split('T')[0];
    });

    const trendMap = new Map(last7Days.map((date) => [date, { date, count: 0, avgScore: 0, totalScore: 0 }]));

    evaluations.forEach((evaluation: any) => {
      const date = evaluation.created_at.split('T')[0];
      if (trendMap.has(date)) {
        const dayData = trendMap.get(date)!;
        dayData.count += 1;
        dayData.totalScore += evaluation.overall_score || 0;
      }
    });

    const recentTrend = Array.from(trendMap.values()).map((day) => ({
      date: day.date,
      count: day.count,
      avgScore: day.count > 0 ? day.totalScore / day.count : 0,
    }));

    return NextResponse.json({
      totalEvaluations,
      averageScore: Math.round(averageScore * 10) / 10,
      topAgent,
      topAgentScore: Math.round(topAgentScore * 10) / 10,
      agentStats,
      scoreDistribution: scoreRanges,
      recentTrend,
    });
  } catch (error) {
    console.error('Error in stats API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
