import { PackageDownloadsList } from "./components/npm/PackageDownloadsList";

const packages = [
  "vite",
  "vitest",
  "rolldown-vite",
  "rolldown",
  "tsdown",
  "oxlint",
  "oxc-parser",
  "oxc-transform",
  "oxc-minify",
  "oxc-resolver",
];

function NpmPackages() {
  return (
    <main className="px-6 py-6">
      <h2 className="mb-6 text-lg font-semibold">NPM Package Statistics</h2>

      <PackageDownloadsList packages={packages} />
    </main>
  );
}

export default NpmPackages;
