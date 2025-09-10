interface NpmDownloadsProps {}

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
  'oxc-resolver'
];

function NpmDownloads({}: NpmDownloadsProps) {
  const handleCardClick = (packageName: string) => {
    const npmUrl = `https://www.npmjs.com/package/${packageName}`;
    window.open(npmUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <main className="max-w-6xl mx-auto px-8 py-8 flex flex-col gap-8">
        <div className="bg-white border border-slate-200 px-8 py-8 rounded-xl shadow-sm">
          <h2 className="mb-6 text-slate-800 text-3xl font-bold tracking-tight">NPM Weekly Downloads</h2>
          
          <div className="mx-auto mb-8 rounded-lg border border-slate-200 bg-white shadow-sm max-w-lg w-fit">
            <ul className="list-none p-0 m-0">
              {packages.map((packageName) => (
                <li 
                  key={packageName} 
                  className="flex items-center justify-between px-4 py-2 border-b border-slate-200 transition-all duration-200 cursor-pointer gap-3 min-w-fit hover:bg-slate-50 focus:outline-2 focus:outline-blue-500 focus:outline-offset-[-2px] focus:bg-slate-50 last:border-b-0"
                  onClick={() => handleCardClick(packageName)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick(packageName);
                    }
                  }}
                >
                  <span className="font-mono text-sm font-medium text-gray-700 bg-slate-100 px-2 py-1 rounded border border-slate-300 min-w-fit whitespace-nowrap">{packageName}</span>
                  <img
                    className="h-auto max-h-5 flex-shrink-0"
                    src={`https://img.shields.io/npm/dw/${packageName}?label=npm`}
                    alt={`Weekly downloads for ${packageName}`}
                    loading="lazy"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-white border border-slate-200 px-7 py-7 rounded-xl shadow-sm border-l-4 border-l-blue-500 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <h3 className="mb-3 text-slate-500 text-sm font-semibold uppercase tracking-widest">Total Packages</h3>
            <p className="mb-3 text-4xl font-bold text-slate-800 tracking-tight leading-tight">{packages.length}</p>
            <span className="text-sm font-semibold px-3 py-1.5 rounded-lg inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 bg-opacity-100 border border-emerald-200 border-opacity-200">NPM Packages</span>
          </div>
          <div className="bg-white border border-slate-200 px-7 py-7 rounded-xl shadow-sm border-l-4 border-l-blue-500 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <h3 className="mb-3 text-slate-500 text-sm font-semibold uppercase tracking-widest">Registry</h3>
            <p className="mb-3 text-4xl font-bold text-slate-800 tracking-tight leading-tight">NPM</p>
            <span className="text-sm font-semibold px-3 py-1.5 rounded-lg inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 bg-opacity-100 border border-emerald-200 border-opacity-200">Public Registry</span>
          </div>
          <div className="bg-white border border-slate-200 px-7 py-7 rounded-xl shadow-sm border-l-4 border-l-blue-500 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <h3 className="mb-3 text-slate-500 text-sm font-semibold uppercase tracking-widest">Update Frequency</h3>
            <p className="mb-3 text-4xl font-bold text-slate-800 tracking-tight leading-tight">Weekly</p>
            <span className="text-sm font-semibold px-3 py-1.5 rounded-lg inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 bg-opacity-100 border border-emerald-200 border-opacity-200">Auto Updated</span>
          </div>
          <div className="bg-white border border-slate-200 px-7 py-7 rounded-xl shadow-sm border-l-4 border-l-blue-500 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <h3 className="mb-3 text-slate-500 text-sm font-semibold uppercase tracking-widest">Data Source</h3>
            <p className="mb-3 text-4xl font-bold text-slate-800 tracking-tight leading-tight">Shields.io</p>
            <span className="text-sm font-semibold px-3 py-1.5 rounded-lg inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 bg-opacity-100 border border-emerald-200 border-opacity-200">Live Data</span>
          </div>
        </div>
      </main>
    </>
  );
}

export default NpmDownloads;