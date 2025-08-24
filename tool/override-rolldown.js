#!/usr/bin/env node

/**
 * Rolldown Version Override Tool
 * 
 * This tool allows testing the vibe-dashboard with different rolldown-vite versions:
 * - Last 5 stable versions from npm
 * - Future/experimental versions from pkg.pr.new
 */

const { execSync } = require('child_process');
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
const https = require('https');

const DASHBOARD_PACKAGE_PATH = join(process.cwd(), 'apps/dashboard/package.json');

/**
 * Fetch the last 5 stable versions from npm registry
 */
async function fetchStableVersions() {
  return new Promise((resolve, reject) => {
    const url = 'https://registry.npmjs.org/rolldown-vite';
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const packageInfo = JSON.parse(data);
          const versions = Object.keys(packageInfo.versions)
            .filter(v => !v.includes('-')) // Filter out pre-release versions
            .sort((a, b) => {
              // Sort by version number (semver)
              const parseVersion = (v) => v.split('.').map(num => parseInt(num, 10));
              const [aMajor, aMinor, aPatch] = parseVersion(a);
              const [bMajor, bMinor, bPatch] = parseVersion(b);
              
              if (aMajor !== bMajor) return bMajor - aMajor;
              if (aMinor !== bMinor) return bMinor - aMinor;
              return bPatch - aPatch;
            })
            .slice(0, 5); // Get last 5 versions
          
          resolve(versions);
        } catch (error) {
          reject(new Error(`Failed to parse npm registry response: ${error.message}`));
        }
      });
    }).on('error', (error) => {
      reject(new Error(`Failed to fetch from npm registry: ${error.message}`));
    });
  });
}

/**
 * Fetch future versions from pkg.pr.new API using authoredDate filtering
 */
async function fetchFutureVersions(lastNpmVersionDate) {
  return new Promise((resolve, reject) => {
    const url = 'https://pkg.pr.new/api/repo/commits?owner=rolldown&repo=rolldown';
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          
          // Extract commits from the nested structure
          const commits = response.target?.history?.nodes || [];
          
          const futureCommits = commits
            .filter(commit => {
              const commitDate = new Date(commit.authoredDate);
              return commitDate > lastNpmVersionDate;
            })
            .slice(0, 10) // Limit to 10 most recent future commits
            .map(commit => `pkg.pr.new/rolldown@${commit.abbreviatedOid}`);
          
          resolve(futureCommits);
        } catch (error) {
          reject(new Error(`Failed to parse pkg.pr.new API response: ${error.message}`));
        }
      });
    }).on('error', (error) => {
      reject(new Error(`Failed to fetch from pkg.pr.new API: ${error.message}`));
    });
  });
}

/**
 * Get the publication date of the latest npm version
 */
async function getLatestNpmVersionDate() {
  return new Promise((resolve, reject) => {
    const url = 'https://registry.npmjs.org/rolldown-vite';
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const packageInfo = JSON.parse(data);
          const latestVersion = packageInfo['dist-tags'].latest;
          const latestVersionInfo = packageInfo.versions[latestVersion];
          const publishDate = new Date(packageInfo.time[latestVersion]);
          
          resolve(publishDate);
        } catch (error) {
          reject(new Error(`Failed to get latest npm version date: ${error.message}`));
        }
      });
    }).on('error', (error) => {
      reject(new Error(`Failed to fetch npm version date: ${error.message}`));
    });
  });
}

function getCurrentVersion() {
  try {
    const packageJson = JSON.parse(readFileSync(DASHBOARD_PACKAGE_PATH, 'utf8'));
    return packageJson.devDependencies['rolldown-vite'];
  } catch (error) {
    console.error('Error reading package.json:', error.message);
    process.exit(1);
  }
}

function isPkgPrNewUrl(version) {
  return version.includes('pkg.pr.new') || version.startsWith('https://pkg.pr.new');
}

function updateRolldownVersion(version) {
  try {
    console.log(`📦 Updating rolldown-vite to version: ${version}`);
    
    // Read current package.json
    const packageJson = JSON.parse(readFileSync(DASHBOARD_PACKAGE_PATH, 'utf8'));
    
    // Update rolldown-vite version
    packageJson.devDependencies['rolldown-vite'] = version;
    
    // Write back to package.json
    writeFileSync(DASHBOARD_PACKAGE_PATH, JSON.stringify(packageJson, null, 2) + '\n');
    
    if (isPkgPrNewUrl(version)) {
      console.log('🚀 Using experimental version from pkg.pr.new');
    }
    console.log('✅ Package.json updated successfully');
    return true;
  } catch (error) {
    console.error('❌ Error updating package.json:', error.message);
    return false;
  }
}

function installDependencies() {
  try {
    console.log('📥 Installing dependencies...');
    execSync('pnpm install --no-frozen-lockfile', { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    console.log('✅ Dependencies installed successfully');
    return true;
  } catch (error) {
    console.error('❌ Error installing dependencies:', error.message);
    return false;
  }
}

function buildApp() {
  try {
    console.log('🔨 Building application...');
    execSync('pnpm build', { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    console.log('✅ Build completed successfully');
    return true;
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    return false;
  }
}

async function listVersions() {
  console.log('📋 Fetching available rolldown-vite versions...\n');
  
  try {
    // Fetch stable versions from npm
    console.log('🔍 Fetching stable versions from npm...');
    const stableVersions = await fetchStableVersions();
    
    // Get latest npm version date for filtering future versions
    console.log('📅 Getting latest npm version date...');
    const latestNpmDate = await getLatestNpmVersionDate();
    
    // Fetch future versions from pkg.pr.new
    console.log('🚀 Fetching future versions from pkg.pr.new...');
    const futureVersions = await fetchFutureVersions(latestNpmDate);
    
    console.log('\n🟢 Stable versions (last 5 from npm):');
    stableVersions.forEach((version, index) => {
      const current = getCurrentVersion() === `^${version}` || getCurrentVersion() === version;
      console.log(`  ${index + 1}. ${version} ${current ? '(current)' : ''}`);
    });
    
    if (futureVersions.length > 0) {
      console.log('\n🚀 Future versions (from pkg.pr.new):');
      futureVersions.forEach((version, index) => {
        console.log(`  ${stableVersions.length + index + 1}. ${version}`);
      });
    } else {
      console.log('\n🚀 Future versions (from pkg.pr.new):');
      console.log('  No future versions found (all commits are older than latest npm version).');
    }
    
    console.log('\n💡 Usage: node override-rolldown.js <version-number-or-version-string>');
    console.log('Example: node override-rolldown.js 2  # Use second stable version');
    console.log('Example: node override-rolldown.js 7.1.2  # Use specific version');
    console.log('Example: node override-rolldown.js pkg.pr.new/rolldown-rs/rolldown@1234567  # Use pkg.pr.new URL');
    
    return { stableVersions, futureVersions };
  } catch (error) {
    console.error('❌ Error fetching versions:', error.message);
    console.log('\n🔄 Falling back to manual version entry...');
    console.log('💡 Usage: node override-rolldown.js <version-string>');
    console.log('Example: node override-rolldown.js 7.1.2');
    console.log('Example: node override-rolldown.js pkg.pr.new/rolldown-rs/rolldown@1234567');
    return { stableVersions: [], futureVersions: [] };
  }
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === '--list' || args[0] === '-l') {
    await listVersions();
    return;
  }
  
  const input = args[0];
  let targetVersion;
  
  // Check if input is a number (index)
  if (/^\d+$/.test(input)) {
    console.log('🔍 Fetching version lists for index lookup...');
    
    try {
      const stableVersions = await fetchStableVersions();
      const latestNpmDate = await getLatestNpmVersionDate();
      const futureVersions = await fetchFutureVersions(latestNpmDate);
      
      const index = parseInt(input, 10) - 1;
      const allVersions = [...stableVersions, ...futureVersions];
      
      if (index >= 0 && index < allVersions.length) {
        targetVersion = allVersions[index];
      } else {
        console.error(`❌ Invalid version index. Use 1-${allVersions.length}`);
        await listVersions();
        process.exit(1);
      }
    } catch (error) {
      console.error(`❌ Error fetching versions for index lookup: ${error.message}`);
      console.log('💡 Please use a specific version string instead of an index.');
      process.exit(1);
    }
  } else {
    // Assume it's a version string
    targetVersion = input;
  }
  
  console.log(`🎯 Target version: ${targetVersion}`);
  console.log(`📍 Current version: ${getCurrentVersion()}\n`);
  
  // Update version
  if (!updateRolldownVersion(targetVersion)) {
    process.exit(1);
  }
  
  // Install dependencies
  if (!installDependencies()) {
    process.exit(1);
  }
  
  // Build app
  if (!buildApp()) {
    process.exit(1);
  }
  
  console.log('\n🎉 Successfully updated rolldown-vite and rebuilt the application!');
  console.log(`📊 Dashboard is ready with rolldown-vite ${targetVersion}`);
}

// Handle command line arguments
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log('Rolldown Version Override Tool\n');
  console.log('Usage:');
  console.log('  node override-rolldown.js --list        List available versions');
  console.log('  node override-rolldown.js <index>       Use version by index (1-5)');
  console.log('  node override-rolldown.js <version>     Use specific version');
  console.log('  node override-rolldown.js <pkg.pr.new>  Use pkg.pr.new URL');
  console.log('\nExamples:');
  console.log('  node override-rolldown.js --list');
  console.log('  node override-rolldown.js 2');
  console.log('  node override-rolldown.js 7.1.2');
  console.log('  node override-rolldown.js pkg.pr.new/rolldown-rs/vite@1234');
  process.exit(0);
}

main().catch(error => {
  console.error('❌ Unexpected error:', error.message);
  process.exit(1);
});