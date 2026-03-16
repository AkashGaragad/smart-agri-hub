import { Users, Wheat, Gavel, ShoppingCart, TrendingUp, Activity } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardStats from "@/components/DashboardStats";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const stats = [
    { label: "Total Users", value: 1248, icon: Users, trend: "+18%", color: "green" },
    { label: "Total Crops", value: 342, icon: Wheat, trend: "+24%", color: "yellow" },
    { label: "Total Bids", value: 1893, icon: Gavel, trend: "+31%", color: "blue" },
    { label: "Total Orders", value: 567, icon: ShoppingCart, trend: "+12%", color: "purple" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="section-title">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Platform overview and analytics</p>
        </div>
        <DashboardStats stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
            <h3 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" /> Platform Activity
            </h3>
            <div className="space-y-4">
              {[
                { label: "New registrations today", value: "23", color: "bg-primary" },
                { label: "Crops listed today", value: "15", color: "bg-secondary" },
                { label: "Bids placed today", value: "89", color: "bg-primary" },
                { label: "Orders completed", value: "34", color: "bg-secondary" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-accent/30">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-sm text-foreground">{item.label}</span>
                  </div>
                  <span className="font-bold text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
            <h3 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" /> Revenue Overview
            </h3>
            <div className="space-y-4">
              {[
                { label: "Crop Auction Revenue", value: "₹12.4L", pct: 75 },
                { label: "Fertilizer Sales", value: "₹5.8L", pct: 55 },
                { label: "Platform Fees", value: "₹1.2L", pct: 30 },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">{item.label}</span>
                    <span className="font-bold text-foreground">{item.value}</span>
                  </div>
                  <div className="h-2 bg-accent rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.pct}%` }}
                      transition={{ duration: 1, delay: i * 0.2 }}
                      className="h-full gradient-primary rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
