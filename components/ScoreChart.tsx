'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ScoreChartProps {
  data: Array<{
    name: string;
    accuracy: number;
    tone: number;
    clarity: number;
    completeness: number;
    relevance: number;
  }>;
}

export default function ScoreChart({ data }: ScoreChartProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Agent Performance Breakdown
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            stroke="#9ca3af"
          />
          <YAxis 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            stroke="#9ca3af"
            domain={[0, 100]}
          />
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
          <Bar dataKey="accuracy" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="tone" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="clarity" fill="#10b981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="completeness" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          <Bar dataKey="relevance" fill="#ec4899" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
