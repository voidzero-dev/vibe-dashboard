import { PageHeader } from "@vibe/shared";
import { Badge, Card } from "@vibe/ui";
import { Package } from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import NpmPackages from "../NpmPackages";

function NpmPackagesPage() {
  return (
    <PageContainer>
      <PageHeader
        icon={<Package className="text-green-600 dark:text-green-400" />}
        title="NPM Packages"
        subtitle="Package information and statistics"
        action={
          <Badge variant="success" size="md">
            Live Data
          </Badge>
        }
      />

      {/* Main Content */}
      <Card noPadding>
        <NpmPackages />
      </Card>
    </PageContainer>
  );
}

export default NpmPackagesPage;
