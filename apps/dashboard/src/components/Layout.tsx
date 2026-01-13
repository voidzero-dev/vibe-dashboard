import { Outlet } from "react-router-dom";
import { Sidebar } from "./layout/Sidebar";
import { useSidebar } from "../context/SidebarContext";

function Layout() {
  const { collapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Sidebar />

      {/* Main Content Area */}
      <div className={`${collapsed ? "lg:pl-20" : "lg:pl-64"} transition-all duration-200`}>
        <main className="h-screen overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
