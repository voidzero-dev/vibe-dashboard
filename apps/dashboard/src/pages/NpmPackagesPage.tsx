import { PageHeader } from "@vibe/shared";
import { Badge } from "@vibe/ui";
import { Package } from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import NpmPackages from "../NpmPackages";

function NpmPackagesPage() {
  return (
    <PageContainer>
      <PageHeader
        icon={<Package size={20} />}
        title="NPM Packages"
        subtitle="Package downloads, versions, and statistics"
        action={
          <Badge variant="success" size="md">
            Live Data
          </Badge>
        }
      />

      {/* Main Content */}
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] overflow-hidden">
        <NpmPackages />
      </div>
    </PageContainer>
  );
}

export default NpmPackagesPage;
