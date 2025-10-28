import { Outlet } from "react-router-dom";
import { AppBar } from "./layout/AppBar";
import { Sidebar } from "./layout/Sidebar";

function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />

      {/* Main Content Area */}
      <div className="lg:pl-64 transition-all duration-300">
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
