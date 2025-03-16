import React from 'react';
import { BarChart2, PieChart, TrendingUp } from 'lucide-react';

const Analytics = () => {
  // Simulated data for demonstration
  const stats = [
    { name: 'Sent', value: '1,234', icon: Send },
    { name: 'Opened', value: '856', icon: Mail },
    { name: 'Clicked', value: '432', icon: MousePointer },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Campaign Analytics</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
              >
                <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</dd>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h4 className="text-lg font-medium text-gray-900">Engagement Over Time</h4>
            <div className="h-64 mt-4 bg-gray-50 rounded-lg flex items-center justify-center">
              <BarChart2 className="h-8 w-8 text-gray-400" />
              <span className="ml-2 text-gray-500">Chart will be implemented</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;