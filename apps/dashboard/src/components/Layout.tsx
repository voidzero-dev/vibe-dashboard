import { BarChart3, Download, Package, Zap } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

function Layout() {
  const location = useLocation();

  return (
    <>
      {/* Rolldown-Vite Dashboard Banner */}
      <div className="bg-slate-100 border-b border-slate-300 px-8 py-3 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center gap-2.5 text-sm font-semibold text-slate-600 tracking-tight">
          <BarChart3 size={16} />
          <span>Rolldown-Vite Dashboard</span>
        </div>
      </div>

      {/* Page Navigation */}
      <nav className="bg-slate-50 border-b border-slate-200 px-8 py-4 flex gap-2 max-w-6xl mx-auto">
        <Link
          to='/'
          className={`flex items-center gap-2 px-5 py-3 border rounded-lg cursor-pointer font-medium text-sm transition-all duration-200 tracking-tight text-decoration-none min-w-36 justify-center ${
            location.pathname === '/' 
              ? 'bg-slate-600 border-slate-600 text-white hover:bg-slate-800 hover:border-slate-800' 
              : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-100 hover:border-slate-400 hover:text-slate-800'
          }`}
        >
          <Package size={20} />
          Rolldown Stats
        </Link>
        <Link
          to='/minification'
          className={`flex items-center gap-2 px-5 py-3 border rounded-lg cursor-pointer font-medium text-sm transition-all duration-200 tracking-tight text-decoration-none min-w-36 justify-center ${
            location.pathname === '/minification' 
              ? 'bg-slate-600 border-slate-600 text-white hover:bg-slate-800 hover:border-slate-800' 
              : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-100 hover:border-slate-400 hover:text-slate-800'
          }`}
        >
          <Zap size={20} />
          Minification Benchmarks
        </Link>
        <Link
          to='/npm-downloads'
          className={`flex items-center gap-2 px-5 py-3 border rounded-lg cursor-pointer font-medium text-sm transition-all duration-200 tracking-tight text-decoration-none min-w-36 justify-center ${
            location.pathname === '/npm-downloads' 
              ? 'bg-slate-600 border-slate-600 text-white hover:bg-slate-800 hover:border-slate-800' 
              : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-100 hover:border-slate-400 hover:text-slate-800'
          }`}
        >
          <Download size={20} />
          NPM Downloads
        </Link>
      </nav>

      {/* Render the current route's component */}
      <Outlet />
    </>
  );
}

export default Layout;
