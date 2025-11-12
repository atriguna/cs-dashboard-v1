'use client';

import { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, Users, Award, LogOut, User as UserIcon } from 'lucide-react';
import StatCard from '@/components/StatCard';
import ScoreChart from '@/components/ScoreChart';
import TrendChart from '@/components/TrendChart';
import DistributionChart from '@/components/DistributionChart';
import EvaluationTable from '@/components/EvaluationTable';
import { CSEvaluation } from '@/lib/supabase';
import { logout, getCurrentUser, type User } from '@/lib/auth';

interface Stats {
  totalEvaluations: number;
  averageScore: number;
  topAgent: string;
  topAgentScore: number;
  agentStats: Array<{
    name: string;
    count: number;
    averageScore: number;
    accuracy: number;
    tone: number;
    clarity: number;
    completeness: number;
    relevance: number;
  }>;
  scoreDistribution: Array<{
    range: string;
    count: number;
  }>;
  recentTrend: Array<{
    date: string;
    count: number;
    avgScore: number;
  }>;
}

export default function Home() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [evaluations, setEvaluations] = useState<CSEvaluation[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Get current user
    const user = getCurrentUser();
    setCurrentUser(user);

    async function fetchData(isInitial = false) {
      try {
        // Only show full loading screen on initial load
        if (isInitial) {
          setInitialLoading(true);
        } else {
          setRefreshing(true);
        }
        setError(null);

        // Add cache busting timestamp
        const timestamp = new Date().getTime();

        // Fetch stats
        const statsRes = await fetch(`/api/stats?_t=${timestamp}`, {
          cache: 'no-store'
        });
        if (!statsRes.ok) throw new Error('Failed to fetch stats');
        const statsData = await statsRes.json();
        setStats(statsData);

        // Fetch ALL evaluations (no limit, pagination handled in frontend)
        const evalsRes = await fetch(`/api/evaluations?_t=${timestamp}`, {
          cache: 'no-store'
        });
        if (!evalsRes.ok) throw new Error('Failed to fetch evaluations');
        const evalsData = await evalsRes.json();
        setEvaluations(evalsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching data:', err);
      } finally {
        setInitialLoading(false);
        setRefreshing(false);
      }
    }

    fetchData(true); // Initial load
    
    // Auto-refresh every 30 seconds (background refresh)
    const interval = setInterval(() => fetchData(false), 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
            Please check your Supabase configuration in .env.local
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                CS Evaluation Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                AI-powered customer service quality scoring
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${refreshing ? 'bg-yellow-500' : 'bg-green-500'} animate-pulse`}></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {refreshing ? 'Refreshing...' : 'Live'}
                </span>
              </div>
              {currentUser && (
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <UserIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {currentUser.name}
                  </span>
                </div>
              )}
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Evaluations"
            value={stats?.totalEvaluations || 0}
            icon={BarChart3}
            description="The number of customer service evaluations displayed in the dashboard. Showing up to 300 most recent interactions analyzed by the AI system."
          />
          <StatCard
            title="Average Score"
            value={stats?.averageScore.toFixed(1) || '0.0'}
            icon={TrendingUp}
            subtitle="Out of 100"
            description="The overall average quality score across all displayed evaluations. Calculated based on 5 key metrics: Accuracy, Tone, Clarity, Completeness, and Relevance."
          />
          <StatCard
            title="Top Performer"
            value={stats?.topAgent || 'N/A'}
            icon={Award}
            subtitle={stats?.topAgentScore ? `Score: ${stats.topAgentScore}/100` : undefined}
            description="The customer service agent with the highest average score. This ranking is based on all evaluations displayed in the dashboard. Use the agent filter in the table below to view specific agent performance."
          />
          <StatCard
            title="Active Agents"
            value={stats?.agentStats.length || 0}
            icon={Users}
            description="The number of unique customer service agents in the displayed evaluations. Use the agent filter in the table below to view individual agent performance."
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <TrendChart data={stats?.recentTrend || []} />
          <DistributionChart data={stats?.scoreDistribution || []} />
        </div>

        {/* Agent Performance Chart */}
        <div className="mb-8">
          <ScoreChart data={stats?.agentStats.slice(0, 5) || []} />
        </div>

        {/* Evaluations Table */}
        <EvaluationTable evaluations={evaluations} />
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Built with Love by SalingJaga Engineering
          </p>
        </div>
      </footer>
    </div>
  );
}
