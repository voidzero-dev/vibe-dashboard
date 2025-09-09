import { BarChart3, Download, Package, Zap } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

function Layout() {
  const location = useLocation();

  return (
    <>
      {/* Rolldown-Vite Dashboard Banner */}
      <div className='dashboard-banner'>
        <div className='banner-content'>
          <BarChart3 size={16} />
          <span>Rolldown-Vite Dashboard</span>
        </div>
      </div>

      {/* Page Navigation */}
      <nav className='page-nav'>
        <Link
          to='/'
          className={`page-button ${location.pathname === '/' ? 'active' : ''}`}
        >
          <Package size={20} />
          Rolldown Stats
        </Link>
        <Link
          to='/minification'
          className={`page-button ${location.pathname === '/minification' ? 'active' : ''}`}
        >
          <Zap size={20} />
          Minification Benchmarks
        </Link>
        <Link
          to='/npm-downloads'
          className={`page-button ${location.pathname === '/npm-downloads' ? 'active' : ''}`}
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
