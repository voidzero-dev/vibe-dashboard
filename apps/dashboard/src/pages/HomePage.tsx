import { PageHeader } from '@vibe/shared';
import { Card } from '@vibe/ui';
import { ArrowRight, BarChart3, GitBranch, Package, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';

const getColorClasses = (color: string) => {
  const colors: Record<string, { bg: string; icon: string; hover: string }> = {
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      icon: 'text-blue-600 dark:text-blue-400',
      hover: 'hover:border-blue-300 dark:hover:border-blue-700',
    },
    amber: {
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      icon: 'text-amber-600 dark:text-amber-400',
      hover: 'hover:border-amber-300 dark:hover:border-amber-700',
    },
    green: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      icon: 'text-green-600 dark:text-green-400',
      hover: 'hover:border-green-300 dark:hover:border-green-700',
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      icon: 'text-purple-600 dark:text-purple-400',
      hover: 'hover:border-purple-300 dark:hover:border-purple-700',
    },
  };
  return colors[color] || colors.blue;
};

function HomePage() {
  const features = [
    {
      title: 'Rolldown Stats',
      description: 'Track build performance metrics and bundle size evolution across Rolldown versions',
      icon: <Package className='w-6 h-6' />,
      link: '/rolldown-stats',
      color: 'blue',
    },
    {
      title: 'Minification Benchmarks',
      description: 'Compare performance of different JavaScript minification tools and their compression ratios',
      icon: <Zap className='w-6 h-6' />,
      link: '/minification',
      color: 'amber',
    },
    {
      title: 'NPM Packages',
      description: 'Monitor package statistics including downloads, versions, and maintainer information',
      icon: <Sparkles className='w-6 h-6' />,
      link: '/npm-packages',
      color: 'green',
    },
    {
      title: 'GitHub Dependents',
      description: 'Explore repositories that depend on key packages with star counts and usage insights',
      icon: <GitBranch className='w-6 h-6' />,
      link: '/dependents',
      color: 'purple',
    },
  ];

  return (
    <PageContainer>
      <div className='text-center mb-12'>
        <div className='flex justify-center mb-6'>
          <div className='w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl'>
            <BarChart3 size={40} className='text-white' />
          </div>
        </div>
        <PageHeader
          title='Vibe Dashboard'
          subtitle='Performance metrics and analytics for JavaScript build tools and packages'
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto'>
        {features.map((feature) => {
          const colors = getColorClasses(feature.color);
          return (
            <Link key={feature.link} to={feature.link}>
              <Card className={`h-full transition-all hover:shadow-lg ${colors.hover} cursor-pointer group`}>
                <div className='p-6'>
                  <div className='flex items-start gap-4'>
                    <div className={`p-3 rounded-lg ${colors.bg}`}>
                      <div className={colors.icon}>{feature.icon}</div>
                    </div>
                    <div className='flex-1'>
                      <h3 className='text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
                        {feature.title}
                      </h3>
                      <p className='text-sm text-slate-600 dark:text-slate-400 leading-relaxed'>
                        {feature.description}
                      </p>
                    </div>
                    <ArrowRight className='w-5 h-5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all group-hover:translate-x-1' />
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </PageContainer>
  );
}

export default HomePage;