'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Info } from 'lucide-react';
import { useState } from 'react';

interface DistributionChartProps {
  data: Array<{
    range: string;
    count: number;
  }>;
}

// Color mapping based on score range
const COLOR_MAP: Record<string, string> = {
  '0-20': '#ef4444',    // Red - Poor
  '21-40': '#f59e0b',   // Orange - Below average
  '41-60': '#eab308',   // Yellow - Average
  '61-80': '#10b981',   // Green - Good
  '81-100': '#3b82f6',  // Blue - Excellent
};

export default function DistributionChart({ data }: DistributionChartProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  // Filter out zero values to prevent label overlap
  const chartData = data
    .filter((item) => item.count > 0)
    .map((item) => ({
      name: item.range,
      value: item.count,
      color: COLOR_MAP[item.range] || '#6b7280', // Default gray if range not found
    }));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Score Distribution
        </h3>
        <div className="relative">
          <button
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={() => setShowTooltip(!showTooltip)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Information about score distribution"
          >
            <Info className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
          </button>
          {showTooltip && (
            <div className="absolute right-0 top-8 z-10 w-80 p-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg">
              <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-2">
                About Score Distribution
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                This chart shows how CS evaluation scores are distributed across different ranges:
              </p>
              <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                <li><span className="font-medium text-red-600 dark:text-red-400">0-20:</span> Poor performance - needs immediate attention</li>
                <li><span className="font-medium text-orange-600 dark:text-orange-400">21-40:</span> Below average - requires improvement</li>
                <li><span className="font-medium text-yellow-600 dark:text-yellow-400">41-60:</span> Average - meets basic standards</li>
                <li><span className="font-medium text-green-600 dark:text-green-400">61-80:</span> Good - above average performance</li>
                <li><span className="font-medium text-blue-600 dark:text-blue-400">81-100:</span> Excellent - outstanding service</li>
              </ul>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                The overall score is calculated as the average of 5 metrics: Accuracy, Tone, Clarity, Completeness, and Relevance.
              </p>
            </div>
          )}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={({ name, percent }) => {
              // Only show label if percentage is significant enough
              if (percent < 0.02) return '';
              return `${name}: ${(percent * 100).toFixed(0)}%`;
            }}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            minAngle={5}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
          />
          <Legend 
            wrapperStyle={{ fontSize: '12px' }}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
