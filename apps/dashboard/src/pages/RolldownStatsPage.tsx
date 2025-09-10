import { useState } from 'react';
import RolldownStats from '../RolldownStats';

function RolldownStatsPage() {
  const [selectedMetric, setSelectedMetric] = useState('bundleSize');

  return (
    <div className="min-h-screen bg-white text-black">
      <RolldownStats
        selectedMetric={selectedMetric}
        setSelectedMetric={setSelectedMetric}
      />
    </div>
  );
}

export default RolldownStatsPage;
