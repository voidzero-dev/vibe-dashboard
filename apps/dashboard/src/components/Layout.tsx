import { Package, Zap } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

function Layout() {
  const location = useLocation();

  return (
    <>
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
      </nav>

      {/* Render the current route's component */}
      <Outlet />
    </>
  );
}

export default Layout;
