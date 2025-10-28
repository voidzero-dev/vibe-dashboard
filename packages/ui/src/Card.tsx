import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  headerAction?: ReactNode;
  noPadding?: boolean;
}

export function Card({ children, className = "", title, subtitle, headerAction, noPadding = false }: CardProps) {
  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 ${className}`}
    >
      {(title || subtitle || headerAction) && (
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              {title && <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>}
              {subtitle && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
            </div>
            {headerAction && <div className="ml-4">{headerAction}</div>}
          </div>
        </div>
      )}
      <div className={noPadding ? "" : "p-6"}>{children}</div>
    </div>
  );
}

export function CardGrid({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`grid gap-6 ${className}`}>{children}</div>;
}
