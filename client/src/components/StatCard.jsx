// components/StatCard.jsx using dashboard
import React from 'react';
import { 
  ArrowUpRight, ArrowDownRight,
} from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, trend, trendValue }) => (
  <div className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-green-100">
    <div className="flex items-start justify-between">
      <div className="space-y-2">
        <span className="text-sm font-medium text-green-600">{label}</span>
        <div className="flex items-baseline space-x-2">
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          {trend && (
            <span className={`flex items-center text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              {trendValue}
            </span>
          )}
        </div>
      </div>
      <div className="p-3 bg-green-50 rounded-xl">
        <Icon className="w-6 h-6 text-green-500" />
      </div>
    </div>
  </div>
);

export default StatCard;