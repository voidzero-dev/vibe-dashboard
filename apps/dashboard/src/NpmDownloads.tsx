import { NpmStatsCards } from './components/npm/NpmStatsCards';
import { PackageDownloadsList } from './components/npm/PackageDownloadsList';

// List of npm packages to display download counts for
const packages = [
  'vite',
  'rolldown-vite',
  'rolldown',
  'tsdown',
  'oxlint',
  'oxc-parser',
  'oxc-transform',
  'oxc-minify',
  'oxc-resolver',
];

function NpmDownloads() {
  return (
    <>
      <main className='max-w-6xl mx-auto px-8 py-8 flex flex-col gap-8'>
        <div className='bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-8 py-8 rounded-xl shadow-sm'>
          <h2 className='mb-6 text-slate-800 dark:text-slate-100 text-3xl font-bold tracking-tight'>
            NPM Weekly Downloads
          </h2>

          <PackageDownloadsList packages={packages} />
        </div>

        <NpmStatsCards packagesCount={packages.length} />
      </main>
    </>
  );
}

export default NpmDownloads;
