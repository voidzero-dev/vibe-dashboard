import { PageHeader } from '@vibe/shared';
import { Badge, Card, CardGrid } from '@vibe/ui';
import { GitBranch, Star, Package, Users, ExternalLink, Clock, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import dependentsData from '../../../../data/dependents.json';
import { PageContainer } from '../components/layout/PageContainer';

interface Dependent {
  url: string;
  stars: number;
}

interface DependentsCollection {
  topDependents: Dependent[];
  latestDependents: Dependent[];
}

interface DependentsData {
  [repo: string]: {
    [pkg: string]: DependentsCollection | Dependent[]; // Support both old and new format
  };
}

interface PackageData {
  repo: string;
  package: string;
  topDependents: Dependent[];
  latestDependents: Dependent[];
}

function DependentsPage() {
  const [viewMode, setViewMode] = useState<'top' | 'latest'>('top');
  const data = dependentsData as DependentsData;

  // Flatten the data structure to get all packages
  const allPackages: PackageData[] = [];
  Object.entries(data).forEach(([repo, packages]) => {
    Object.entries(packages).forEach(([pkg, deps]) => {
      // Handle both old format (array) and new format (object with topDependents/latestDependents)
      if (Array.isArray(deps)) {
        // Old format - treat as topDependents
        allPackages.push({
          repo,
          package: pkg,
          topDependents: deps,
          latestDependents: []
        });
      } else {
        // New format
        allPackages.push({
          repo,
          package: pkg,
          topDependents: deps.topDependents || [],
          latestDependents: deps.latestDependents || []
        });
      }
    });
  });

  // Calculate stats based on current view mode
  const totalRepos = Object.keys(data).length;
  const totalPackages = allPackages.length;

  const currentDependents = viewMode === 'top' ? 'topDependents' : 'latestDependents';
  const totalDependents = allPackages.reduce((sum, pkg) => sum + pkg[currentDependents].length, 0);

  // Get top dependent across all packages for current view
  const allDependents: Array<Dependent & { package: string; repo: string }> = [];
  allPackages.forEach(({ repo, package: pkg, topDependents, latestDependents }) => {
    const deps = viewMode === 'top' ? topDependents : latestDependents;
    deps.forEach(dep => {
      allDependents.push({ ...dep, package: pkg, repo });
    });
  });
  const topDependent = allDependents.sort((a, b) => b.stars - a.stars)[0];

  return (
    <PageContainer>
      <PageHeader
        icon={<GitBranch className='text-purple-600 dark:text-purple-400' />}
        title='GitHub Dependents'
        subtitle={viewMode === 'top' ? 'Top repositories by stars that depend on our projects' : 'Most recent repositories that depend on our projects'}
        action={
          <div className='flex items-center gap-4'>
            <div className='flex rounded-lg bg-slate-100 dark:bg-slate-800 p-1'>
              <button
                onClick={() => setViewMode('top')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'top'
                    ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <span className='flex items-center gap-1'>
                  <TrendingUp className='w-3.5 h-3.5' />
                  Top by Stars
                </span>
              </button>
              <button
                onClick={() => setViewMode('latest')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'latest'
                    ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <span className='flex items-center gap-1'>
                  <Clock className='w-3.5 h-3.5' />
                  Most Recent
                </span>
              </button>
            </div>
            <Badge variant='info' size='md'>
              {totalDependents} {viewMode === 'top' ? 'Top' : 'Latest'} Dependents
            </Badge>
          </div>
        }
      />

      {/* Stats Cards */}
      <CardGrid className='grid-cols-1 md:grid-cols-4 mb-8'>
        <Card className='bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-purple-600 dark:text-purple-300'>Repositories</p>
              <p className='text-2xl font-bold text-purple-900 dark:text-white'>{totalRepos}</p>
            </div>
            <GitBranch className='w-8 h-8 text-purple-500' />
          </div>
        </Card>

        <Card className='bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-blue-600 dark:text-blue-300'>Packages</p>
              <p className='text-2xl font-bold text-blue-900 dark:text-white'>{totalPackages}</p>
            </div>
            <Package className='w-8 h-8 text-blue-500' />
          </div>
        </Card>

        <Card className='bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-800'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-amber-600 dark:text-amber-300'>Top Stars</p>
              <p className='text-2xl font-bold text-amber-900 dark:text-white'>
                {topDependent ? topDependent.stars.toLocaleString() : '0'}
              </p>
            </div>
            <Star className='w-8 h-8 text-amber-500' />
          </div>
        </Card>

        <Card className='bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-green-600 dark:text-green-300'>Total Dependents</p>
              <p className='text-2xl font-bold text-green-900 dark:text-white'>{totalDependents}</p>
            </div>
            <Users className='w-8 h-8 text-green-500' />
          </div>
        </Card>
      </CardGrid>

      {/* All Packages in 2 Column Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {allPackages.map(({ repo, package: pkg, topDependents, latestDependents }) => {
          const dependents = viewMode === 'top' ? topDependents : latestDependents;
          return (
          <Card key={`${repo}/${pkg}`} className='p-6'>
            <div className='mb-4 flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Package className='w-4 h-4' />
                <span className='text-sm text-slate-600 dark:text-slate-400'>{repo}</span>
              </div>
              <h3 className='text-lg font-semibold'>
                {pkg}
              </h3>
              <div className='w-20'></div>
            </div>

            <div className='overflow-x-auto max-h-96 overflow-y-auto'>
              <table className='w-full text-sm'>
                <thead className='sticky top-0 bg-white dark:bg-slate-900 z-10'>
                  <tr className='border-b border-slate-200 dark:border-slate-700'>
                    <th className='text-left py-2 px-2 font-medium text-slate-600 dark:text-slate-400 w-12'>
                      #
                    </th>
                    <th className='text-left py-2 px-2 font-medium text-slate-600 dark:text-slate-400'>
                      Repository
                    </th>
                    <th className='text-right py-2 px-2 font-medium text-slate-600 dark:text-slate-400 w-24'>
                      Stars
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dependents.map((dep, index) => {
                    const repoName = dep.url.replace('https://github.com/', '');
                    return (
                      <tr
                        key={dep.url}
                        className='border-b border-slate-100 dark:border-slate-800 transition-colors duration-150 bg-white dark:bg-slate-950 hover:bg-blue-50 dark:hover:bg-blue-950/40'
                      >
                        <td className='py-2 px-2 text-slate-500 dark:text-slate-400'>
                          {index + 1}
                        </td>
                        <td className='py-2 px-2'>
                          <a
                            href={dep.url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1 group'
                          >
                            <span className='truncate'>{repoName}</span>
                            <ExternalLink className='w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0' />
                          </a>
                        </td>
                        <td className='py-2 px-2 text-right'>
                          <span className='inline-flex items-center gap-1 text-slate-600 dark:text-slate-400'>
                            <Star className='w-3 h-3' />
                            <span className='font-medium'>{dep.stars.toLocaleString()}</span>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        );
        })}
      </div>
    </PageContainer>
  );
}

export default DependentsPage;