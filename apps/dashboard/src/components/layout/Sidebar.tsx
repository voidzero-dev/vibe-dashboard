import { BarChart3, ChevronLeft, Download, GitBranch, Home, Menu, Package, X, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

const navItems: NavItem[] = [
  {
    path: '/',
    label: 'Home',
    icon: <Home size={20} />,
  },
  {
    path: '/rolldown-stats',
    label: 'Rolldown Stats',
    icon: <Package size={20} />,
  },
  {
    path: '/minification',
    label: 'Minification',
    icon: <Zap size={20} />,
  },
  {
    path: '/npm-packages',
    label: 'NPM Packages',
    icon: <Download size={20} />,
  },
  {
    path: '/dependents',
    label: 'GitHub Dependents',
    icon: <GitBranch size={20} />,
  },
];

export function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Auto-detect dark mode from system preferences
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className='lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700'
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className='lg:hidden fixed inset-0 bg-black/50 z-40'
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 
          transition-all duration-300 z-40
          ${collapsed ? 'w-20' : 'w-64'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo Header */}
        <div className='h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-700'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center'>
              <BarChart3 size={24} className='text-white' />
            </div>
            {!collapsed && (
              <div>
                <h1 className='font-bold text-slate-900 dark:text-white'>Vibe</h1>
                <p className='text-xs text-slate-500 dark:text-slate-300'>Dashboard</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className='hidden lg:flex p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'
          >
            <ChevronLeft
              size={18}
              className={`text-slate-600 dark:text-slate-300 transition-transform ${collapsed ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className='flex-1 px-3 py-4'>
          <ul className='space-y-1'>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                    ${
                    isActive(item.path)
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }
                    ${collapsed ? 'justify-center' : ''}
                  `}
                  title={collapsed ? item.label : undefined}
                >
                  <span className='flex-shrink-0'>{item.icon}</span>
                  {!collapsed && (
                    <>
                      <span className='flex-1'>{item.label}</span>
                      {item.badge && (
                        <span className='px-2 py-0.5 text-xs bg-slate-200 dark:bg-slate-700 rounded-full'>
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom area - can be used for other actions in future */}
      </aside>
    </>
  );
}
