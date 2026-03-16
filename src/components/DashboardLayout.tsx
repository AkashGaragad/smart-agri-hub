import { ReactNode, useState } from "react";
import Navbar from "./Navbar";
import AppSidebar from "./AppSidebar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onMenuToggle={() => setSidebarOpen(true)} />
        <main className="page-container overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
