import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  headerAction?: ReactNode;
  noPadding?: boolean;
}

export function Card({
  children,
  className = "",
  title,
  subtitle,
  headerAction,
  noPadding = false,
}: CardProps) {
  return (
    <div
      className={`bg-[var(--color-bg-elevated)] rounded-lg border border-[var(--color-border)] transition-colors duration-150 hover:border-[var(--color-border-strong)] ${className}`}
    >
      {(title || subtitle || headerAction) && (
        <div className="px-5 py-4 border-b border-[var(--color-border)]">
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <h3 className="text-sm font-semibold">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">{subtitle}</p>
              )}
            </div>
            {headerAction && <div className="ml-4">{headerAction}</div>}
          </div>
        </div>
      )}
      <div className={noPadding ? "" : "p-5"}>{children}</div>
    </div>
  );
}

export function CardGrid({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`grid gap-4 ${className}`}>{children}</div>;
}
