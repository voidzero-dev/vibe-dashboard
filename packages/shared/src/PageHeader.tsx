import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function PageHeader({ title, subtitle, icon, action }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          {icon && (
            <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)] flex items-center justify-center flex-shrink-0 text-white">
              {icon}
            </div>
          )}
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">{subtitle}</p>
            )}
          </div>
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    </div>
  );
}
