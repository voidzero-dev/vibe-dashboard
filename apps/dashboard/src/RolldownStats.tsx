import { Clock, Package } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import rolldownStats from '../../../rolldown-version-stats.json';

// Utility function to format numbers with commas
const formatNumberWithCommas = (num: number): string => {
  return num.toLocaleString();
};

// Utility function to format dates
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Transform rolldown stats data for charts
const buildTimeData = rolldownStats.map(stat => ({
  name: `v${stat.version}`,
  value: stat.buildTime,
  version: stat.version,
  publicationDate: (stat as any).publicationDate,
})).sort((a, b) => a.value - b.value); // Sort from smallest to largest

// Calculate bundle size differences between consecutive versions
const bundleSizeDiffData = rolldownStats.map((stat, index) => {
  if (index === 0) {
    // For the first version, show 0 difference or could show absolute value
    return {
      name: `v${stat.version}`,
      value: 0,
      previousSize: null,
      currentSize: stat.totalSize,
      isBaseline: true,
      version: stat.version,
      publicationDate: (stat as any).publicationDate,
    };
  }

  const prevSize = rolldownStats[index - 1].totalSize;
  const currentSize = stat.totalSize;
  const diff = currentSize - prevSize;

  return {
    name: `v${stat.version}`,
    value: diff,
    previousSize: prevSize,
    currentSize: currentSize,
    isBaseline: false,
    version: stat.version,
    publicationDate: (stat as any).publicationDate,
  };
}).sort((a, b) => a.value - b.value); // Sort from smallest to largest

interface RolldownStatsProps {
  selectedMetric: string;
  setSelectedMetric: (metric: string) => void;
}

function RolldownStats({ selectedMetric, setSelectedMetric }: RolldownStatsProps) {
  // Custom tooltip formatter for bundle size differences
  const bundleSizeDiffTooltipFormatter = (value: any, name: string, props: any) => {
    const data = props.payload;
    if (!data) return [value, name];

    // Format publication date if available
    const publicationDateText = data.publicationDate
      ? ` | Published: ${formatDate(data.publicationDate)}`
      : ' | Publication date unavailable';

    if (data.isBaseline) {
      return [`${formatNumberWithCommas(data.currentSize)} bytes (baseline)${publicationDateText}`, 'Bundle Size'];
    }

    const sign = value >= 0 ? '+' : '';
    const changeText = `${sign}${formatNumberWithCommas(value)} bytes`;
    const fromTo = `(${formatNumberWithCommas(data.previousSize)} → ${formatNumberWithCommas(data.currentSize)})`;

    return [`${changeText} ${fromTo}${publicationDateText}`, 'Size Change'];
  };

  // Custom tooltip formatter for build time
  const buildTimeTooltipFormatter = (value: any, name: string, props: any) => {
    const data = props.payload;
    if (!data) return [value, name];

    // Format publication date if available
    const publicationDateText = data.publicationDate
      ? ` | Published: ${formatDate(data.publicationDate)}`
      : ' | Publication date unavailable';

    return [`${value}ms${publicationDateText}`, 'Build Time'];
  };

  const rolldownMetrics = [
    { id: 'bundleSize', name: 'Bundle Size', icon: Package, data: bundleSizeDiffData, color: '#374151' },
    { id: 'buildTime', name: 'Build Time', icon: Clock, data: buildTimeData, color: '#000000' },
  ];

  const currentMetric = rolldownMetrics.find(m => m.id === selectedMetric) || rolldownMetrics[0];

  return (
    <>
      {/* Metric Navigation */}
      <nav className='dashboard-nav'>
        {rolldownMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <button
              key={metric.id}
              className={`nav-button ${selectedMetric === metric.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedMetric(metric.id);
              }}
            >
              <Icon size={20} />
              {metric.name}
            </button>
          );
        })}
      </nav>

      <main className='dashboard-main'>
        <div className='chart-container'>
          <h2>{currentMetric.name}</h2>
          <ResponsiveContainer width='100%' height={400}>
            {selectedMetric === 'bundleSize'
              ? (
                <BarChart data={currentMetric.data}>
                  <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
                  <XAxis
                    dataKey='name'
                    tick={{ fill: '#374151', fontSize: 12 }}
                    axisLine={{ stroke: '#d1d5db' }}
                    tickLine={{ stroke: '#d1d5db' }}
                  />
                  <YAxis
                    tick={{ fill: '#374151', fontSize: 12 }}
                    axisLine={{ stroke: '#d1d5db' }}
                    tickLine={{ stroke: '#d1d5db' }}
                  />
                  <Tooltip
                    formatter={bundleSizeDiffTooltipFormatter}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      color: '#111827',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Legend
                    wrapperStyle={{ color: '#374151' }}
                  />
                  <Bar dataKey='value' name='Bundle Size Change (bytes)'>
                    <LabelList
                      dataKey='value'
                      position='top'
                      formatter={(label: React.ReactNode) => {
                        const value = typeof label === 'number' ? label : Number(label) || 0;
                        if (value === 0) return 'baseline';
                        return value >= 0 ? `+${formatNumberWithCommas(value)}` : formatNumberWithCommas(value);
                      }}
                      style={{ fontSize: '11px', fill: '#374151' }}
                    />
                    {currentMetric.data.map((entry: any, index: number) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.isBaseline ? '#6b7280' : (entry.value >= 0 ? '#dc2626' : '#16a34a')}
                      />
                    ))}
                  </Bar>
                </BarChart>
              )
              : (
                <BarChart data={currentMetric.data}>
                  <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
                  <XAxis
                    dataKey='name'
                    tick={{ fill: '#374151', fontSize: 12 }}
                    axisLine={{ stroke: '#d1d5db' }}
                    tickLine={{ stroke: '#d1d5db' }}
                  />
                  <YAxis
                    tick={{ fill: '#374151', fontSize: 12 }}
                    axisLine={{ stroke: '#d1d5db' }}
                    tickLine={{ stroke: '#d1d5db' }}
                  />
                  <Tooltip
                    formatter={buildTimeTooltipFormatter}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      color: '#111827',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Legend
                    wrapperStyle={{ color: '#374151' }}
                  />
                  <Bar
                    dataKey='value'
                    fill='url(#buildTimeGradient)'
                    name='Build Time (ms)'
                  >
                    <LabelList
                      dataKey='value'
                      position='top'
                      formatter={(label: React.ReactNode) => `${label}ms`}
                      style={{ fontSize: '11px', fill: '#374151' }}
                    />
                  </Bar>
                  <defs>
                    <linearGradient id='buildTimeGradient' x1='0' y1='0' x2='0' y2='1'>
                      <stop offset='0%' stopColor='#000000' stopOpacity={1} />
                      <stop offset='100%' stopColor='#374151' stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                </BarChart>
              )}
          </ResponsiveContainer>
        </div>

        <div className='stats-grid'>
          <div className='stat-card'>
            <h3>Average Build Time</h3>
            <p className='stat-value'>
              {Math.round(buildTimeData.reduce((sum, item) => sum + item.value, 0) / buildTimeData.length)}ms
            </p>
            <span className='stat-change positive'>Across {buildTimeData.length} versions</span>
          </div>
          <div className='stat-card'>
            <h3>Latest Bundle Size</h3>
            <p className='stat-value'>
              {formatNumberWithCommas(rolldownStats[rolldownStats.length - 1]?.totalSize || 0)} bytes
            </p>
            <span className='stat-change positive'>v{rolldownStats[rolldownStats.length - 1]?.version}</span>
          </div>
          <div className='stat-card'>
            <h3>Bundle Size Range</h3>
            <p className='stat-value'>
              {Math.round(
                (Math.max(...rolldownStats.map(s => s.totalSize)) - Math.min(...rolldownStats.map(s => s.totalSize))) /
                  1024,
              )}KB
            </p>
            <span className='stat-change positive'>Size Variation</span>
          </div>
          <div className='stat-card'>
            <h3>Versions Tested</h3>
            <p className='stat-value'>{rolldownStats.length}</p>
            <span className='stat-change positive'>
              {rolldownStats[0]?.version} - {rolldownStats[rolldownStats.length - 1]?.version}
            </span>
          </div>
        </div>
      </main>
    </>
  );
}

export default RolldownStats;
