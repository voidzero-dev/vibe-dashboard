interface NpmStatsCardsProps {
  packagesCount: number;
}

export function NpmStatsCards({ packagesCount }: NpmStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-7 py-7 rounded-xl shadow-sm border-l-4 border-l-blue-500 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <h3 className="mb-3 text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-widest">
          Total Packages
        </h3>
        <p className="mb-3 text-4xl font-bold text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
          {packagesCount}
        </p>
        <span className="text-sm font-semibold px-3 py-1.5 rounded-lg inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 bg-opacity-100 border border-emerald-200 border-opacity-200">
          NPM Packages
        </span>
      </div>
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-7 py-7 rounded-xl shadow-sm border-l-4 border-l-blue-500 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <h3 className="mb-3 text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-widest">
          Registry
        </h3>
        <p className="mb-3 text-4xl font-bold text-slate-800 dark:text-slate-100 tracking-tight leading-tight">NPM</p>
        <span className="text-sm font-semibold px-3 py-1.5 rounded-lg inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 bg-opacity-100 border border-emerald-200 border-opacity-200">
          Public Registry
        </span>
      </div>
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-7 py-7 rounded-xl shadow-sm border-l-4 border-l-blue-500 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <h3 className="mb-3 text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-widest">
          Update Frequency
        </h3>
        <p className="mb-3 text-4xl font-bold text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
          Weekly
        </p>
        <span className="text-sm font-semibold px-3 py-1.5 rounded-lg inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 bg-opacity-100 border border-emerald-200 border-opacity-200">
          Auto Updated
        </span>
      </div>
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-7 py-7 rounded-xl shadow-sm border-l-4 border-l-blue-500 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <h3 className="mb-3 text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-widest">
          Data Source
        </h3>
        <p className="mb-3 text-4xl font-bold text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
          Shields.io
        </p>
        <span className="text-sm font-semibold px-3 py-1.5 rounded-lg inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 bg-opacity-100 border border-emerald-200 border-opacity-200">
          Live Data
        </span>
      </div>
    </div>
  );
}
