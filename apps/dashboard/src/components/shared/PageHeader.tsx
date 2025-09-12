import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function PageHeader({ title, subtitle, icon, action }: PageHeaderProps) {
  return (
    <div className='mb-8'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3'>
            {icon}
            {title}
          </h1>
          {subtitle && (
            <p className='mt-2 text-slate-600 dark:text-slate-400'>
              {subtitle}
            </p>
          )}
        </div>
        {action}
      </div>
    </div>
  );
}
