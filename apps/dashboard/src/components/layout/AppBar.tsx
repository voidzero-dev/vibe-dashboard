import { Button } from "@vibe/ui";
import { Bell, Search, User } from "lucide-react";

interface AppBarProps {
  title?: string;
  subtitle?: string;
}

export function AppBar({ title, subtitle }: AppBarProps) {
  return (
    <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 px-6 shadow-sm">
      <div className="h-full flex items-center justify-between">
        {/* Left side - Page title */}
        <div>
          {title && <h2 className="text-xl font-semibold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">{title}</h2>}
          {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
              />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all hover:bg-slate-100 dark:hover:bg-slate-800"
              />
            </div>
          </div>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="relative hover:scale-110 transition-transform"
            icon={
              <>
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50" />
              </>
            }
          />

          {/* User Menu */}
          <div className="flex items-center gap-3 pl-3 border-l border-slate-200/50 dark:border-slate-700/50">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-slate-900 dark:text-white">Admin User</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">admin@vibe.dev</p>
            </div>
            <button className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110 animate-gradient">
              <User size={18} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
