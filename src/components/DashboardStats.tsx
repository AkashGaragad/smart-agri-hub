import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Stat {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color?: string;
}

interface DashboardStatsProps {
  stats: Stat[];
}

const colorMap: Record<string, string> = {
  green: "gradient-primary",
  yellow: "gradient-warm",
  blue: "bg-blue-500",
  purple: "bg-purple-500",
};

const DashboardStats = ({ stats }: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="stat-card"
        >
          <div className="flex items-center justify-between">
            <div className={`${colorMap[stat.color || "green"]} p-3 rounded-xl`}>
              <stat.icon className="h-5 w-5 text-primary-foreground" />
            </div>
            {stat.trend && (
              <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                {stat.trend}
              </span>
            )}
          </div>
          <div>
            <p className="text-2xl font-bold font-display text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;
