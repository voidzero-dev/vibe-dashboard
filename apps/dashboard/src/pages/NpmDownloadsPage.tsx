import { BarChart3 } from 'lucide-react';
import NpmDownloads from '../NpmDownloads';

function NpmDownloadsPage() {
  return (
    <div className='dashboard'>
      <header className='dashboard-header'>
        <div className='header-content'>
          <div className='logo'>
            <BarChart3 size={28} />
            <h1>NPM Downloads</h1>
          </div>
          <p className='header-subtitle'>
            Weekly download statistics for key packages
          </p>
        </div>
      </header>

      <NpmDownloads />
    </div>
  );
}

export default NpmDownloadsPage;