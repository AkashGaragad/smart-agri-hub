import { useState, useEffect } from "react";
import { FlaskConical } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import FertilizerCard from "@/components/FertilizerCard";
import { getFertilizers, createOrder } from "@/services/api";
import { toast } from "sonner";

const FertilizerMarket = () => {
  const [fertilizers, setFertilizers] = useState<any[]>([]);

  useEffect(() => {
    getFertilizers().then(res => setFertilizers(res.data)).catch(() => {});
  }, []);

  const handleBuy = async (fertilizer: any) => {
    try {
      await createOrder({ fertilizerId: fertilizer._id, quantity: 1 });
      toast.success(`Ordered ${fertilizer.name}!`);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Order failed");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="section-title">Fertilizer Marketplace</h1>
          <p className="text-muted-foreground mt-1">Browse and purchase quality fertilizers</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {fertilizers.map((f: any, i: number) => (
            <FertilizerCard key={i} name={f.name} price={f.price} quantity={f.quantity} description={f.description} onBuy={() => handleBuy(f)} />
          ))}
          {fertilizers.length === 0 && (
            <div className="col-span-full glass-card p-12 text-center">
              <FlaskConical className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No fertilizers available yet.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FertilizerMarket;
