import { PerformanceTrendChart } from '../components/dashboard/PerformanceTrendChart';
import { RecentActivityChart } from '../components/dashboard/RecentActivityChart';
import { RecentUpdatesCard } from '../components/dashboard/RecentUpdatesCard';
import { StatsGrid } from '../components/dashboard/StatsGrid';
import { PageContainer } from '../components/layout/PageContainer';

import { PageHeader } from '@vibe/shared';

function DashboardPage() {
  return (
    <PageContainer>
      <PageHeader
        title='Dashboard Overview'
        subtitle='Monitor your project metrics and performance at a glance'
      />

      {/* Stats Grid */}
      <StatsGrid />

      {/* Charts Row */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
        <PerformanceTrendChart />
        <RecentActivityChart />
      </div>

      {/* Recent Updates */}
      <RecentUpdatesCard />
    </PageContainer>
  );
}

export default DashboardPage;
