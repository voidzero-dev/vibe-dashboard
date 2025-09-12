import { TrendingDown, TrendingUp } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../ui/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down';
  linkTo?: string;
}

export function StatCard({ title, value, change, changeLabel, icon, trend, linkTo }: StatCardProps) {
  const content = (
    <div className='group relative'>
      <div className='flex items-start justify-between'>
        <div className='flex-1'>
          <p className='text-sm font-medium text-slate-600 dark:text-slate-400'>{title}</p>
          <p className='mt-2 text-3xl font-bold text-slate-900 dark:text-white'>{value}</p>
          {change !== undefined && (
            <div className='mt-2 flex items-center gap-2'>
              {trend === 'up'
                ? <TrendingUp size={16} className='text-green-600 dark:text-green-400' />
                : <TrendingDown size={16} className='text-red-600 dark:text-red-400' />}
              <span
                className={`text-sm font-medium ${
                  trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}
              >
                {change > 0 ? '+' : ''}
                {change}%
              </span>
              {changeLabel && <span className='text-sm text-slate-500 dark:text-slate-400'>{changeLabel}</span>}
            </div>
          )}
        </div>
        <div className='p-3 bg-slate-100 dark:bg-slate-800 rounded-lg'>
          {icon}
        </div>
      </div>
      {linkTo && (
        <Link
          to={linkTo}
          className='absolute inset-0 rounded-xl ring-2 ring-transparent group-hover:ring-blue-500 transition-all'
        />
      )}
    </div>
  );

  return (
    <Card className={linkTo ? 'hover:shadow-lg transition-shadow cursor-pointer' : ''}>
      {content}
    </Card>
  );
}