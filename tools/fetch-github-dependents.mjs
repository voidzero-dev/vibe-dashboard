#!/usr/bin/env node

import { getDependents } from 'top-github-dependents-by-stars';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Hardcoded repositories and their packages with dependent types
const repositories = {
  'oxc-project/oxc': {
    'oxlint': 'repositories',
    'oxc-parser': 'packages'
  },
  'oxc-project/oxc-resolver': {
    'oxc-resolver': 'packages'
  },
  'rolldown/rolldown': {
    'rolldown': 'repositories'
  },
  'rolldown/tsdown': {
    'tsdown': 'repositories'
  },
};

async function fetchDependents() {
  console.log('Fetching top GitHub dependents...');

  // Check for GitHub token
  const token = process.env.GHTOPDEP_TOKEN || process.env.GITHUB_TOKEN;
  if (!token) {
    console.error('❌ Error: GitHub token is required');
    console.error('Please set GHTOPDEP_TOKEN or GITHUB_TOKEN environment variable');
    process.exit(1);
  }

  const allDependents = {};

  // Process each repository and its packages
  const allFetches = [];

  for (const [repoPath, packagesConfig] of Object.entries(repositories)) {
    console.log(`\n📦 Processing repository: ${repoPath}`);
    allDependents[repoPath] = {};

    const packageFetches = Object.entries(packagesConfig).map(async ([pkg, dependentType]) => {
      console.log(`  → Fetching dependents for package: ${pkg} (type: ${dependentType})`);

      try {
        // Fetch top 20 dependents using the API with configured type
        const result = await getDependents(repoPath, {
          type: dependentType,
          rows: 20,
          minStars: 0,
          packageName: pkg,
          token: token
        });

        // Transform to our format - save both top and latest dependents
        const topDependents = (result.repositories || []).map(repo => ({
          url: repo.url,
          stars: repo.stars
        }));

        const latestDependents = (result.latestDependents || []).map(repo => ({
          url: repo.url,
          stars: repo.stars
        }));

        allDependents[repoPath][pkg] = {
          topDependents,
          latestDependents
        };

        console.log(`  ✅ Found ${topDependents.length} top + ${latestDependents.length} latest dependents for ${pkg}`);

        // Show top 5 for this package
        if (topDependents.length > 0) {
          console.log(`  Top 5 dependents by stars:`);
          topDependents.slice(0, 5).forEach((dep, i) => {
            console.log(`    ${i + 1}. ${dep.url} - ⭐ ${dep.stars}`);
          });
        }
      } catch (error) {
        console.error(`  ❌ Error fetching dependents for ${pkg}:`, error.message);
        allDependents[repoPath][pkg] = {
          topDependents: [],
          latestDependents: []
        };
      }
    });

    allFetches.push(...packageFetches);
  }

  await Promise.all(allFetches);

  // Save all results to a single JSON file
  const outputPath = path.join(__dirname, '..', 'data', 'dependents.json');

  // Ensure data directory exists
  await fs.mkdir(path.join(__dirname, '..', 'data'), { recursive: true });

  // Save to JSON file with pretty formatting
  await fs.writeFile(outputPath, JSON.stringify(allDependents, null, 2));

  console.log(`\n✅ Successfully saved all dependents to ${outputPath}`);

  // Summary
  const totalPackages = Object.values(repositories).reduce((sum, packages) => sum + Object.keys(packages).length, 0);
  console.log(`\n📊 Summary:`);
  console.log(`  - Repositories processed: ${Object.keys(repositories).length}`);
  console.log(`  - Packages processed: ${totalPackages}`);
}

// Run the script
fetchDependents().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
