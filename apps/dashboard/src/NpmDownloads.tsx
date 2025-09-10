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
      <main className='dashboard-main'>
        <div className='chart-container'>
          <h2>NPM Weekly Downloads</h2>
          
          <div className='npm-downloads-table-container'>
            <table className='npm-downloads-table'>
              <thead>
                <tr>
                  <th>Package Name</th>
                  <th>Weekly Downloads</th>
                </tr>
              </thead>
              <tbody>
                {packages.map((packageName) => (
                  <tr 
                    key={packageName} 
                    className='npm-download-row'
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
                    <td className='package-name-cell'>
                      <span className='package-name'>{packageName}</span>
                    </td>
                    <td className='download-badge-cell'>
                      <div className='download-badge'>
                        <img
                          src={`https://img.shields.io/npm/dw/${packageName}?label=npm`}
                          alt={`Weekly downloads for ${packageName}`}
                          loading="lazy"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className='stats-grid'>
          <div className='stat-card'>
            <h3>Total Packages</h3>
            <p className='stat-value'>{packages.length}</p>
            <span className='stat-change positive'>NPM Packages</span>
          </div>
          <div className='stat-card'>
            <h3>Registry</h3>
            <p className='stat-value'>NPM</p>
            <span className='stat-change positive'>Public Registry</span>
          </div>
          <div className='stat-card'>
            <h3>Update Frequency</h3>
            <p className='stat-value'>Weekly</p>
            <span className='stat-change positive'>Auto Updated</span>
          </div>
          <div className='stat-card'>
            <h3>Data Source</h3>
            <p className='stat-value'>Shields.io</p>
            <span className='stat-change positive'>Live Data</span>
          </div>
        </div>
      </main>
    </>
  );
}

export default NpmDownloads;