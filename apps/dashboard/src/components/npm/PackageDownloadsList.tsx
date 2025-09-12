interface PackageDownloadsListProps {
  packages: string[];
}

export function PackageDownloadsList({ packages }: PackageDownloadsListProps) {
  const handleCardClick = (packageName: string) => {
    const npmUrl = `https://www.npmjs.com/package/${packageName}`;
    window.open(npmUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className='mx-auto mb-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm max-w-lg w-fit'>
      <ul className='list-none p-0 m-0'>
        {packages.map((packageName) => (
          <li
            key={packageName}
            className='flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-slate-700 transition-all duration-200 cursor-pointer gap-3 min-w-fit hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-2 focus:outline-blue-500 focus:outline-offset-[-2px] focus:bg-slate-50 dark:focus:bg-slate-700 last:border-b-0'
            onClick={() => handleCardClick(packageName)}
            role='button'
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCardClick(packageName);
              }
            }}
          >
            <span className='font-mono text-sm font-medium text-gray-700 dark:text-gray-300 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded border border-slate-300 dark:border-slate-600 min-w-fit whitespace-nowrap'>
              {packageName}
            </span>
            <img
              className='h-auto max-h-5 flex-shrink-0'
              src={`https://img.shields.io/npm/dw/${packageName}?label=npm`}
              alt={`Weekly downloads for ${packageName}`}
              loading='lazy'
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
