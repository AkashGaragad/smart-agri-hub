import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard, Wheat, ShoppingCart, Gavel,
  FlaskConical, Package, Users, BarChart3, X, Sprout
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const roleLinks: Record<string, { to: string; icon: React.ElementType; label: string }[]> = {
  farmer: [
    { to: "/farmer", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/farmer/crops", icon: Wheat, label: "My Crops" },
    { to: "/farmer/orders", icon: ShoppingCart, label: "Orders" },
    { to: "/fertilizer-market", icon: FlaskConical, label: "Fertilizers" },
  ],
  buyer: [
    { to: "/buyer", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/buyer/browse", icon: Wheat, label: "Browse Crops" },
    { to: "/auction", icon: Gavel, label: "Live Auction" },
    { to: "/buyer/orders", icon: ShoppingCart, label: "My Orders" },
  ],
  dealer: [
    { to: "/dealer", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/dealer/products", icon: Package, label: "My Products" },
    { to: "/dealer/orders", icon: ShoppingCart, label: "Farmer Orders" },
    { to: "/fertilizer-market", icon: FlaskConical, label: "Marketplace" },
  ],
  admin: [
    { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/admin/users", icon: Users, label: "Users" },
    { to: "/admin/analytics", icon: BarChart3, label: "Analytics" },
  ],
};

const AppSidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { user } = useAuth();
  const location = useLocation();

  const links = roleLinks[user?.role || "farmer"] || roleLinks.farmer;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm md:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 md:z-auto h-screen w-64 bg-sidebar text-sidebar-foreground flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="gradient-primary p-2 rounded-lg">
              <Sprout className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-sidebar-foreground">SAM</span>
          </div>
          <button onClick={onClose} className="md:hidden p-1 rounded hover:bg-sidebar-accent">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 sidebar-nav">
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={onClose}
                className={`sidebar-link ${isActive ? "sidebar-link-active" : ""}`}
              >
                <link.icon className="h-5 w-5" />
                <span className="text-sm">{link.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="glass-card p-3 rounded-lg bg-sidebar-accent/50">
            <p className="text-xs text-sidebar-foreground/60">Logged in as</p>
            <p className="text-sm font-semibold text-sidebar-foreground truncate">{user?.name}</p>
            <p className="text-xs text-sidebar-primary capitalize">{user?.role}</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AppSidebar;
