import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Wheat, Gavel, ShoppingCart, TrendingUp } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardStats from "@/components/DashboardStats";
import CropCard from "@/components/CropCard";
import { getCrops } from "@/services/api";

const BuyerDashboard = () => {
  const [crops, setCrops] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCrops().then(res => setCrops(res.data)).catch(() => {});
  }, []);

  const stats = [
    { label: "Available Crops", value: crops.length, icon: Wheat, trend: "Fresh", color: "green" },
    { label: "Active Auctions", value: 5, icon: Gavel, trend: "Live", color: "yellow" },
    { label: "My Orders", value: 12, icon: ShoppingCart, color: "blue" },
    { label: "Savings", value: "₹4.2K", icon: TrendingUp, color: "green" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="section-title">Buyer Dashboard</h1>
          <p className="text-muted-foreground mt-1">Browse crops and place bids</p>
        </div>
        <DashboardStats stats={stats} />
        <h2 className="text-xl font-display font-bold text-foreground">Available Crops</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {crops.map((crop: any, i: number) => (
            <CropCard
              key={i}
              cropName={crop.cropName}
              quality={crop.quality}
              quantity={crop.quantity}
              minPrice={crop.minPrice}
              currentBid={crop.currentBid || crop.minPrice}
              onBid={() => navigate("/auction")}
            />
          ))}
          {crops.length === 0 && (
            <div className="col-span-full glass-card p-12 text-center">
              <Wheat className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No crops available right now.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BuyerDashboard;
