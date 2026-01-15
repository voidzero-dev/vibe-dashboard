import {
  BarChart3,
  ChevronLeft,
  Download,
  GitBranch,
  Home,
  Menu,
  Package,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSidebar } from "../../context/SidebarContext";

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

const navItems: NavItem[] = [
  {
    path: "/",
    label: "Home",
    icon: <Home size={20} />,
  },
  {
    path: "/rolldown-stats",
    label: "Rolldown Stats",
    icon: <Package size={20} />,
  },
  {
    path: "/minification",
    label: "Minification",
    icon: <Zap size={20} />,
  },
  {
    path: "/npm-packages",
    label: "NPM Packages",
    icon: <Download size={20} />,
  },
  {
    path: "/dependents",
    label: "GitHub Dependents",
    icon: <GitBranch size={20} />,
  },
];

export function Sidebar() {
  const location = useLocation();
  const { collapsed, setCollapsed } = useSidebar();
  const [mobileOpen, setMobileOpen] = useState(false);
  // Auto-detect dark mode from system preferences
  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[var(--card-bg)] border border-[var(--color-border)] shadow-sm"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <button
          type="button"
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-[var(--card-bg)] border-r border-[var(--color-border)]
          transition-all duration-200 z-40
          ${collapsed ? "w-20" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[var(--color-accent)] rounded-lg flex items-center justify-center">
              <BarChart3 size={20} className="text-white" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="font-semibold text-sm tracking-tight">Vibe</h1>
                <p className="text-[10px] text-[var(--color-text-muted)]">Dashboard</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 rounded-md hover:bg-[var(--color-surface)] transition-colors"
          >
            <ChevronLeft
              size={16}
              className={`text-[var(--color-text-muted)] transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4">
          <ul className="space-y-0.5">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 relative
                    ${
                      isActive(item.path)
                        ? "bg-[var(--color-accent-soft)] text-[var(--color-accent)] font-medium"
                        : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]"
                    }
                    ${collapsed ? "justify-center" : ""}
                  `}
                  title={collapsed ? item.label : undefined}
                >
                  {isActive(item.path) && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[var(--color-accent)] rounded-r-full"></span>
                  )}
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-sm">{item.label}</span>
                      {item.badge && (
                        <span className="px-2 py-0.5 text-[10px] font-mono bg-[var(--color-surface)] border border-[var(--color-border)] rounded">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
