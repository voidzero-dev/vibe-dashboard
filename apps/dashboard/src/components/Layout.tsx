import { Outlet } from "react-router-dom";
import { AppBar } from "./layout/AppBar";
import { Sidebar } from "./layout/Sidebar";
import { useSidebar } from "../context/SidebarContext";

function Layout() {
  const { collapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl"></div>

      <Sidebar />

      {/* Main Content Area */}
      <div className={`${collapsed ? "lg:pl-20" : "lg:pl-64"} transition-all duration-300 relative z-10`}>
        <div className="flex flex-col h-screen">
          <AppBar />

          {/* Page Content */}
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;
