'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { Info } from 'lucide-react';
import { useState } from 'react';

interface TrendChartProps {
  data: Array<{
    date: string;
    count: number;
    avgScore: number;
  }>;
}

export default function TrendChart({ data }: TrendChartProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const formattedData = data.map((item) => ({
    ...item,
    displayDate: format(new Date(item.date), 'MMM dd'),
  }));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          7-Day Trend
        </h3>
        <div className="relative">
          <button
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={() => setShowTooltip(!showTooltip)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Information about 7-day trend"
          >
            <Info className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
          </button>
          {showTooltip && (
            <div className="absolute right-0 top-8 z-10 w-80 p-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg">
              <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-2">
                About 7-Day Trend
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                This chart displays evaluation activity and quality trends over the past 7 days:
              </p>
              <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1.5">
                <li className="flex items-start">
                  <span className="font-medium text-blue-600 dark:text-blue-400 mr-2">Blue Line:</span>
                  <span>Number of evaluations completed each day (left Y-axis)</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium text-green-600 dark:text-green-400 mr-2">Green Line:</span>
                  <span>Average score for evaluations on that day (right Y-axis, 0-100 scale)</span>
                </li>
              </ul>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Use this to identify patterns in evaluation volume and quality trends over time.
              </p>
            </div>
          )}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="displayDate" 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            stroke="#9ca3af"
          />
          <YAxis 
            yAxisId="left"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            stroke="#9ca3af"
            label={{ value: 'Count', angle: -90, position: 'insideLeft', fill: '#6b7280' }}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            stroke="#9ca3af"
            domain={[0, 100]}
            label={{ value: 'Avg Score', angle: 90, position: 'insideRight', fill: '#6b7280' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
          />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="count" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
            name="Evaluations"
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="avgScore" 
            stroke="#10b981" 
            strokeWidth={2}
            dot={{ fill: '#10b981', r: 4 }}
            name="Avg Score"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
