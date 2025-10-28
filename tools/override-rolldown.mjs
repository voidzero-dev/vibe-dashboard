#!/usr/bin/env node

/**
 * Rolldown Version Override Tool
 *
 * This tool allows testing the vibe-dashboard with different rolldown-vite versions
 * from npm registry.
 */

import { execSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import https from "node:https";
import { join } from "node:path";

const DASHBOARD_PACKAGE_PATH = join(process.cwd(), "apps/dashboard/package.json");
const DIST_PATH = join(process.cwd(), "apps/dashboard/dist");
const STATS_OUTPUT_PATH = join(process.cwd(), "data/rolldown-version-stats.json");

/**
 * Fetch the last 10 stable versions from npm registry
 */
async function fetchStableVersions() {
  return new Promise((resolve, reject) => {
    const url = "https://registry.npmjs.org/rolldown-vite";

    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const packageInfo = JSON.parse(data);
            let versions = Object.keys(packageInfo.versions).sort((a, b) => {
              // Sort by publication date (most recent last)
              const dateA = new Date(packageInfo.time[a]);
              const dateB = new Date(packageInfo.time[b]);
              return dateA - dateB;
            });
            versions = versions.slice(versions.length - 10, versions.length);

            resolve(versions);
          } catch (error) {
            reject(new Error(`Failed to parse npm registry response: ${error.message}`));
          }
        });
      })
      .on("error", (error) => {
        reject(new Error(`Failed to fetch from npm registry: ${error.message}`));
      });
  });
}

/**
 * Fetch npm publication dates for all versions
 */
async function fetchNpmPublicationDates() {
  return new Promise((resolve, reject) => {
    const url = "https://registry.npmjs.org/rolldown-vite";

    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const packageInfo = JSON.parse(data);
            const publicationDates = packageInfo.time;

            resolve(publicationDates);
          } catch (error) {
            reject(new Error(`Failed to parse npm registry response for publication dates: ${error.message}`));
          }
        });
      })
      .on("error", (error) => {
        reject(new Error(`Failed to fetch npm publication dates: ${error.message}`));
      });
  });
}

function getCurrentVersion() {
  try {
    const packageJson = JSON.parse(readFileSync(DASHBOARD_PACKAGE_PATH, "utf8"));
    return packageJson.devDependencies["rolldown-vite"];
  } catch (error) {
    console.error("Error reading package.json:", error.message);
    process.exit(1);
  }
}

function updateRolldownVersion(version) {
  try {
    console.log(`📦 Updating rolldown-vite to version: ${version}`);

    // Read current package.json
    const packageJson = JSON.parse(readFileSync(DASHBOARD_PACKAGE_PATH, "utf8"));

    // Update rolldown-vite version
    packageJson.devDependencies["rolldown-vite"] = version;

    // Write back to package.json
    writeFileSync(DASHBOARD_PACKAGE_PATH, JSON.stringify(packageJson, null, 2) + "\n");

    console.log("✅ Package.json updated successfully");
    return true;
  } catch (error) {
    console.error("❌ Error updating package.json:", error.message);
    return false;
  }
}

function installDependencies() {
  try {
    console.log("📥 Installing dependencies...");
    execSync("pnpm install --no-frozen-lockfile", {
      stdio: "inherit",
      cwd: process.cwd(),
    });
    console.log("✅ Dependencies installed successfully");
    return true;
  } catch (error) {
    console.error("❌ Error installing dependencies:", error.message);
    return false;
  }
}

function buildApp() {
  try {
    console.log("🔨 Building application...");
    const startTime = Date.now();
    execSync("./node_modules/rolldown-vite/bin/vite.js build", {
      stdio: "inherit",
      cwd: join(process.cwd(), "apps/dashboard"),
    });
    const buildTime = Date.now() - startTime;
    console.log(`✅ Build completed successfully in ${buildTime}ms`);
    return { success: true, buildTime };
  } catch (error) {
    console.error("❌ Build failed:", error.message);
    return { success: false, buildTime: null };
  }
}

/**
 * Collect file statistics from the dist directory
 */
function collectDistStats(version, buildTime = null, publicationDate = null) {
  const stats = {
    version,
    timestamp: new Date().toISOString(),
    publicationDate,
    files: [],
    totalSize: 0,
    buildTime,
  };

  if (!existsSync(DIST_PATH)) {
    console.warn(`⚠️  Dist directory not found for version ${version}`);
    return stats;
  }

  try {
    // Get all files recursively
    function getFilesRecursively(dir, baseDir = "") {
      const files = [];
      const items = readdirSync(dir);

      for (const item of items) {
        const fullPath = join(dir, item);
        const relativePath = join(baseDir, item);
        const stat = statSync(fullPath);

        if (stat.isDirectory()) {
          files.push(...getFilesRecursively(fullPath, relativePath));
        } else {
          files.push({
            path: relativePath,
            size: stat.size,
            type: item.endsWith(".js")
              ? "js"
              : item.endsWith(".css")
                ? "css"
                : item.endsWith(".html")
                  ? "html"
                  : "other",
          });
        }
      }
      return files;
    }

    stats.files = getFilesRecursively(DIST_PATH);
    stats.totalSize = stats.files.reduce((total, file) => total + file.size, 0);

    console.log(`📊 Collected stats for ${stats.files.length} files (${(stats.totalSize / 1024).toFixed(2)} KB total)`);
  } catch (error) {
    console.warn(`⚠️  Error collecting stats for version ${version}:`, error.message);
  }

  return stats;
}

async function listVersions() {
  console.log("📋 Fetching available rolldown-vite versions...\n");

  try {
    // Fetch stable versions from npm
    console.log("🔍 Fetching stable versions from npm...");
    const stableVersions = await fetchStableVersions();

    console.log("\n🟢 Stable versions (last 10 from npm):");
    stableVersions.forEach((version, index) => {
      const current = getCurrentVersion() === `^${version}` || getCurrentVersion() === version;
      console.log(`  ${index + 1}. ${version} ${current ? "(current)" : ""}`);
    });

    console.log("\n💡 Usage: node override-rolldown.js <version-number-or-version-string>");
    console.log("Example: node override-rolldown.js 2  # Use second stable version");
    console.log("Example: node override-rolldown.js 7.1.2  # Use specific version");

    return { stableVersions };
  } catch (error) {
    console.error("❌ Error fetching versions:", error.message);
    console.log("\n🔄 Falling back to manual version entry...");
    console.log("💡 Usage: node override-rolldown.js <version-string>");
    console.log("Example: node override-rolldown.js 7.1.2");
    return { stableVersions: [] };
  }
}

/**
 * Collect statistics for all available rolldown versions
 */
async function collectAllVersionStats() {
  console.log("🚀 Starting comprehensive rolldown version analysis...\n");

  const allStats = [];
  let successCount = 0;
  let failureCount = 0;

  try {
    // Fetch all available versions
    console.log("🔍 Fetching all available versions...");
    const stableVersions = await fetchStableVersions();

    // Fetch npm publication dates
    console.log("📅 Fetching npm publication dates...");
    const npmPublicationDates = await fetchNpmPublicationDates();

    console.log(`📦 Found ${stableVersions.length} versions to analyze`);

    // Store original package.json for restoration
    const originalPackageJson = readFileSync(DASHBOARD_PACKAGE_PATH, "utf8");

    for (let i = 0; i < stableVersions.length; i++) {
      const version = stableVersions[i];
      const versionNumber = i + 1;

      console.log(`\n==================== VERSION ${versionNumber}/${stableVersions.length} ====================`);
      console.log(`🎯 Testing version: ${version}`);

      try {
        // Update version
        if (!updateRolldownVersion(version)) {
          console.error(`❌ Failed to update package.json for version ${version}`);
          failureCount++;
          continue;
        }

        // Install dependencies
        if (!installDependencies()) {
          console.error(`❌ Failed to install dependencies for version ${version}`);
          failureCount++;
          continue;
        }

        // Build app
        const buildResult = buildApp();
        if (!buildResult.success) {
          console.error(`❌ Build failed for version ${version}`);
          failureCount++;
          continue;
        }

        // Collect stats
        const publicationDate = npmPublicationDates[version] || null;
        const stats = collectDistStats(version, buildResult.buildTime, publicationDate);
        allStats.push(stats);
        successCount++;

        console.log(`✅ Successfully analyzed version ${version}`);
      } catch (error) {
        console.error(`❌ Unexpected error analyzing version ${version}:`, error.message);
        failureCount++;
      }
    }

    // Restore original package.json
    console.log("\n🔄 Restoring original package.json...");
    writeFileSync(DASHBOARD_PACKAGE_PATH, originalPackageJson);

    // Save results
    console.log(`\n💾 Saving results to ${STATS_OUTPUT_PATH}...`);
    writeFileSync(STATS_OUTPUT_PATH, JSON.stringify(allStats, null, 2));

    console.log("\n==================== ANALYSIS COMPLETE ====================");
    console.log(`📊 Analysis Summary:`);
    console.log(`  - Total versions analyzed: ${stableVersions.length}`);
    console.log(`  - Successful builds: ${successCount}`);
    console.log(`  - Failed builds: ${failureCount}`);
    console.log(`  - Results saved to: ${STATS_OUTPUT_PATH}`);

    if (allStats.length > 0) {
      const avgBuildTime =
        allStats.filter((s) => s.buildTime).reduce((sum, s) => sum + s.buildTime, 0) /
        allStats.filter((s) => s.buildTime).length;
      const avgTotalSize = allStats.reduce((sum, s) => sum + s.totalSize, 0) / allStats.length;

      console.log(`\n📈 Quick Stats:`);
      console.log(`  - Average build time: ${Math.round(avgBuildTime)}ms`);
      console.log(`  - Average bundle size: ${(avgTotalSize / 1024).toFixed(2)} KB`);
    }
  } catch (error) {
    console.error("❌ Fatal error during analysis:", error.message);
    process.exit(1);
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === "--list" || args[0] === "-l") {
    await listVersions();
    return;
  }

  if (args[0] === "--collect-stats" || args[0] === "--stats") {
    await collectAllVersionStats();
    return;
  }

  const input = args[0];
  let targetVersion;

  // Check if input is a number (index)
  if (/^\d+$/.test(input)) {
    console.log("🔍 Fetching version lists for index lookup...");

    try {
      const stableVersions = await fetchStableVersions();

      const index = parseInt(input, 10) - 1;

      if (index >= 0 && index < stableVersions.length) {
        targetVersion = stableVersions[index];
      } else {
        console.error(`❌ Invalid version index. Use 1-${stableVersions.length}`);
        await listVersions();
        process.exit(1);
      }
    } catch (error) {
      console.error(`❌ Error fetching versions for index lookup: ${error.message}`);
      console.log("💡 Please use a specific version string instead of an index.");
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
  const buildResult = buildApp();
  if (!buildResult.success) {
    process.exit(1);
  }

  console.log("\n🎉 Successfully updated rolldown-vite and rebuilt the application!");
  console.log(`📊 Dashboard is ready with rolldown-vite ${targetVersion}`);
}

// Handle command line arguments
if (process.argv.includes("--help") || process.argv.includes("-h")) {
  console.log("Rolldown Version Override Tool\n");
  console.log("Usage:");
  console.log("  node override-rolldown.js --list        List available versions");
  console.log("  node override-rolldown.js --stats       Collect stats for all versions");
  console.log("  node override-rolldown.js <index>       Use version by index");
  console.log("  node override-rolldown.js <version>     Use specific version");
  console.log("\nExamples:");
  console.log("  node override-rolldown.js --list");
  console.log("  node override-rolldown.js --stats");
  console.log("  node override-rolldown.js 2");
  console.log("  node override-rolldown.js 7.1.2");
  process.exit(0);
}

main().catch((error) => {
  console.error("❌ Unexpected error:", error.message);
  process.exit(1);
});
