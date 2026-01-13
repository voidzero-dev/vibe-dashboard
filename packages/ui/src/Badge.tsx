import type { ReactNode } from "react";

export interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info" | "accent";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({ children, variant = "default", size = "md", className = "" }: BadgeProps) {
  const variantClasses = {
    default:
      "bg-[var(--color-surface)] text-[var(--color-text-muted)] border-[var(--color-border)]",
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    danger: "bg-red-500/10 text-red-400 border-red-500/20",
    info: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    accent:
      "bg-[var(--color-accent-soft)] text-[var(--color-accent)] border-[var(--color-accent)]/20",
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs",
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-md border ${variantClasses[variant]} ${
        sizeClasses[size]
      } ${className}`}
    >
      {children}
    </span>
  );
}
