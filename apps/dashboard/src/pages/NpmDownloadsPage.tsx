import { BarChart3 } from 'lucide-react';
import NpmDownloads from '../NpmDownloads';

function NpmDownloadsPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <header className="bg-slate-700 border-b border-slate-600 text-white px-8 py-5 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-start gap-6">
          <div className="flex items-center gap-3">
            <BarChart3 size={28} />
            <h1 className="m-0 text-2xl font-semibold text-white tracking-tight">NPM Downloads</h1>
          </div>
          <p className="m-0 text-sm font-normal text-slate-300 tracking-wide">
            Weekly download statistics for key packages
          </p>
        </div>
      </header>

      <NpmDownloads />
    </div>
  );
}

export default NpmDownloadsPage;