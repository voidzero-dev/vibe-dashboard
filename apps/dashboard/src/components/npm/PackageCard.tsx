import { Card } from '@vibe/ui';
import { Download, Package } from 'lucide-react';
import { useEffect, useState } from 'react';

interface PackageCardProps {
  packageName: string;
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toLocaleString();
}

export function PackageCard({ packageName }: PackageCardProps) {
  const [downloads, setDownloads] = useState<number | null>(null);
  const [version, setVersion] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const [downloadsRes, packageRes] = await Promise.all([
          fetch(`https://api.npmjs.org/downloads/point/last-week/${packageName}`),
          fetch(`https://registry.npmjs.org/${packageName}/latest`),
        ]);

        if (downloadsRes.ok) {
          const downloadsData = await downloadsRes.json();
          setDownloads(downloadsData.downloads);
        }

        if (packageRes.ok) {
          const packageData = await packageRes.json();
          setVersion(packageData.version);
        }
      } catch (error) {
        console.error(`Failed to fetch data for ${packageName}:`, error);
      } finally {
        setLoading(false);
      }
    };

    void fetchPackageData();
  }, [packageName]);

  const handleClick = () => {
    window.open(`https://www.npmjs.com/package/${packageName}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className='hover:shadow-lg transition-all cursor-pointer group'>
      <div
        className='p-6'
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        role='button'
        tabIndex={0}
      >
        <div className='flex items-start justify-between mb-4'>
          <h3 className='font-mono text-lg font-semibold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
            {packageName}
          </h3>
          <Package className='w-5 h-5 text-slate-400 dark:text-slate-500' />
        </div>

        <div className='space-y-3'>
          <div className='flex items-center gap-2'>
            <div className='p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg'>
              <Package className='w-4 h-4 text-blue-600 dark:text-blue-400' />
            </div>
            <div>
              <p className='text-xs text-slate-500 dark:text-slate-400'>Version</p>
              <p className='text-sm font-semibold text-slate-900 dark:text-white'>
                {loading ? (
                  <span className='inline-block h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse' />
                ) : (
                  version || 'N/A'
                )}
              </p>
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <div className='p-2 bg-green-100 dark:bg-green-900/30 rounded-lg'>
              <Download className='w-4 h-4 text-green-600 dark:text-green-400' />
            </div>
            <div>
              <p className='text-xs text-slate-500 dark:text-slate-400'>Weekly Downloads</p>
              <p className='text-sm font-semibold text-slate-900 dark:text-white'>
                {loading ? (
                  <span className='inline-block h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse' />
                ) : downloads !== null ? (
                  formatNumber(downloads)
                ) : (
                  'N/A'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}