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

const DASHBOARD_PACKAGE_PATH = join(process.cwd(), 'apps/dashboard/package.json');

// Last 5 stable versions from npm (as of current check)
const STABLE_VERSIONS = [
  '7.1.4',
  '7.1.3', 
  '7.1.2',
  '7.1.1',
  '7.1.0'
];

// Future versions from pkg.pr.new (examples - these would be actual PR URLs)
const FUTURE_VERSIONS = [
  // These would be actual pkg.pr.new URLs for future versions
  // Example: 'https://pkg.pr.new/rolldown-rs/rolldown@pr-123'
  // Example: 'pkg.pr.new/rolldown-rs/vite@1234'
  // Note: Users can manually add pkg.pr.new URLs here when testing specific PRs
];

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

function listVersions() {
  console.log('📋 Available rolldown-vite versions:\n');
  
  console.log('🟢 Stable versions (last 5 from npm):');
  STABLE_VERSIONS.forEach((version, index) => {
    const current = getCurrentVersion() === `^${version}` || getCurrentVersion() === version;
    console.log(`  ${index + 1}. ${version} ${current ? '(current)' : ''}`);
  });
  
  if (FUTURE_VERSIONS.length > 0) {
    console.log('\n🚀 Future versions (from pkg.pr.new):');
    FUTURE_VERSIONS.forEach((version, index) => {
      console.log(`  ${STABLE_VERSIONS.length + index + 1}. ${version}`);
    });
  } else {
    console.log('\n🚀 Future versions (from pkg.pr.new):');
    console.log('  None configured. Add pkg.pr.new URLs to FUTURE_VERSIONS array in the script.');
  }
  
  console.log('\n💡 Usage: node override-rolldown.js <version-number-or-version-string>');
  console.log('Example: node override-rolldown.js 2  # Use version 7.1.3');
  console.log('Example: node override-rolldown.js 7.1.2  # Use specific version');
  console.log('Example: node override-rolldown.js pkg.pr.new/rolldown-rs/vite@1234  # Use pkg.pr.new URL');
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === '--list' || args[0] === '-l') {
    listVersions();
    return;
  }
  
  const input = args[0];
  let targetVersion;
  
  // Check if input is a number (index)
  if (/^\d+$/.test(input)) {
    const index = parseInt(input, 10) - 1;
    const allVersions = [...STABLE_VERSIONS, ...FUTURE_VERSIONS];
    
    if (index >= 0 && index < allVersions.length) {
      targetVersion = allVersions[index];
    } else {
      console.error(`❌ Invalid version index. Use 1-${allVersions.length}`);
      listVersions();
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

main();