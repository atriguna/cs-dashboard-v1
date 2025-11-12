'use client';

import { LucideIcon, Info } from 'lucide-react';
import { useState } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
  description?: string;
}

export default function StatCard({ title, value, icon: Icon, trend, subtitle, description }: StatCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
            {description && (
              <div className="relative">
                <button
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  onClick={() => setShowTooltip(!showTooltip)}
                  className="p-0.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label={`Information about ${title}`}
                >
                  <Info className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                </button>
                {showTooltip && (
                  <div className="absolute left-0 top-6 z-10 w-64 p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg text-xs text-gray-600 dark:text-gray-300">
                    {description}
                  </div>
                )}
              </div>
            )}
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
          )}
          {trend && (
            <div className="mt-2 flex items-center">
              <span
                className={`text-sm font-medium ${
                  trend.isPositive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="ml-2 text-sm text-gray-500">vs last period</span>
            </div>
          )}
        </div>
        <div className="ml-4 flex-shrink-0">
          <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-3">
            <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
