import { libraries } from '@vibe/utils';
import { LibraryBenchmarkCard } from './components/minification/LibraryBenchmarkCard';
import { MinificationStats } from './components/minification/MinificationStats';

function MinificationBenchmarks() {
  return (
    <>
      <main className='max-w-6xl mx-auto px-8 py-8 flex flex-col gap-8'>
        {/* Combined Charts for Each Library - Time and Compression Side by Side */}
        <div className='flex flex-col gap-8'>
          {libraries.map(library => <LibraryBenchmarkCard key={library} library={library} />)}
        </div>

        <MinificationStats />
      </main>
    </>
  );
}

export default MinificationBenchmarks;
