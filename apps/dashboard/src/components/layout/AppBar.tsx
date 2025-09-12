import { Bell, Search, User } from 'lucide-react';
import { Button } from '../ui/Button';

interface AppBarProps {
  title?: string;
  subtitle?: string;
}

export function AppBar({ title, subtitle }: AppBarProps) {
  return (
    <header className='h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-6'>
      <div className='h-full flex items-center justify-between'>
        {/* Left side - Page title */}
        <div>
          {title && (
            <h2 className='text-xl font-semibold text-slate-900 dark:text-white'>
              {title}
            </h2>
          )}
          {subtitle && (
            <p className='text-sm text-slate-500 dark:text-slate-400'>
              {subtitle}
            </p>
          )}
        </div>

        {/* Right side - Actions */}
        <div className='flex items-center gap-3'>
          {/* Search */}
          <div className='hidden md:flex items-center'>
            <div className='relative'>
              <Search size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' />
              <input
                type='text'
                placeholder='Search...'
                className='pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>
          </div>

          {/* Notifications */}
          <Button
            variant='ghost'
            size='sm'
            className='relative'
            icon={
              <>
                <Bell size={18} />
                <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full' />
              </>
            }
          />

          {/* User Menu */}
          <div className='flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-slate-700'>
            <div className='hidden sm:block text-right'>
              <p className='text-sm font-medium text-slate-900 dark:text-white'>Admin User</p>
              <p className='text-xs text-slate-500 dark:text-slate-400'>admin@vibe.dev</p>
            </div>
            <button className='w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
              <User size={18} className='text-white' />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
