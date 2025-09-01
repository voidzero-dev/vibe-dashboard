import { BarChart3 } from 'lucide-react';
import { useState } from 'react';
import RolldownStats from '../RolldownStats';

function RolldownStatsPage() {
  const [selectedMetric, setSelectedMetric] = useState('bundleSize');

  return (
    <div className='dashboard'>
      <header className='dashboard-header'>
        <div className='header-content'>
          <div className='logo'>
            <BarChart3 size={28} />
            <h1>Rolldown-Vite Dashboard</h1>
          </div>
          <p className='header-subtitle'>
            Statistics collected from different Rolldown-Vite versions
          </p>
        </div>
      </header>

      <RolldownStats
        selectedMetric={selectedMetric}
        setSelectedMetric={setSelectedMetric}
      />
    </div>
  );
}

export default RolldownStatsPage;
