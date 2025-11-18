'use client';

import { ReactNode } from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  iconColor?: string;
}

export function KPICard({ icon: Icon, label, value, change, trend, iconColor = '#1E88E5' }: KPICardProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-2">{label}</p>
          <p className="text-3xl font-bold text-[#0A3556] mb-2">{value}</p>
          
          {change !== undefined && (
            <div className="flex items-center gap-1">
              {trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
              {trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
              <span className={`text-sm font-medium ${
                trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500'
              }`}>
                {change > 0 ? '+' : ''}{change}%
              </span>
              <span className="text-xs text-gray-500 ml-1">vs. mês anterior</span>
            </div>
          )}
        </div>
        
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${iconColor}15` }}
        >
          <Icon className="w-6 h-6" style={{ color: iconColor }} />
        </div>
      </div>
    </div>
  );
}
