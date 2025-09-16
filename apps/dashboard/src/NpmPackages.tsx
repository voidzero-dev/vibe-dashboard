import { PackageDownloadsList } from './components/npm/PackageDownloadsList';

// List of npm packages to display download counts for
const packages = [
  'vite',
  'vitest',
  'rolldown-vite',
  'rolldown',
  'tsdown',
  'oxlint',
  'oxc-parser',
  'oxc-transform',
  'oxc-minify',
  'oxc-resolver',
];

function NpmPackages() {
  return (
    <>
      <main className='max-w-7xl mx-auto px-8 py-8'>
        <h2 className='mb-6 text-slate-800 dark:text-slate-100 text-3xl font-bold tracking-tight'>
          NPM Package Statistics
        </h2>

        <PackageDownloadsList packages={packages} />
      </main>
    </>
  );
}

export default NpmPackages;
