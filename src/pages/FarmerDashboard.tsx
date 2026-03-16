import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wheat, Plus, ShoppingCart, FlaskConical, Landmark } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardStats from "@/components/DashboardStats";
import CropCard from "@/components/CropCard";
import { addCrop, getCrops } from "@/services/api";
import { toast } from "sonner";

const FarmerDashboard = () => {
  const [crops, setCrops] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ cropName: "", quality: "", quantity: "", minPrice: "" });
  const [loading, setLoading] = useState(false);

  const fetchCrops = async () => {
    try {
      const res = await getCrops();
      setCrops(res.data);
    } catch { /* empty */ }
  };

  useEffect(() => { fetchCrops(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addCrop({
        cropName: form.cropName,
        quality: form.quality,
        quantity: Number(form.quantity),
        minPrice: Number(form.minPrice),
      });
      toast.success("Crop listed for auction!");
      setForm({ cropName: "", quality: "", quantity: "", minPrice: "" });
      setShowForm(false);
      fetchCrops();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to add crop");
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: "Total Crops", value: crops.length, icon: Wheat, trend: "+12%", color: "green" },
    { label: "Active Auctions", value: 3, icon: ShoppingCart, trend: "Live", color: "yellow" },
    { label: "Fertilizer Orders", value: 8, icon: FlaskConical, color: "blue" },
    { label: "Govt Schemes", value: 5, icon: Landmark, color: "purple" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="section-title">Farmer Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your crops and auctions</p>
        </div>

        <DashboardStats stats={stats} />

        {/* Add Crop Section */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display font-bold text-foreground">My Crops</h2>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm flex items-center gap-2">
            <Plus className="h-4 w-4" /> List Crop
          </button>
        </div>

        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            onSubmit={handleAdd}
            className="glass-card p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input placeholder="Crop Name" value={form.cropName} onChange={(e) => setForm({ ...form, cropName: e.target.value })} className="input-field" required />
            <input placeholder="Quality (A/B/C)" value={form.quality} onChange={(e) => setForm({ ...form, quality: e.target.value })} className="input-field" required />
            <input type="number" placeholder="Quantity (kg)" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} className="input-field" required />
            <input type="number" placeholder="Minimum Price (₹)" value={form.minPrice} onChange={(e) => setForm({ ...form, minPrice: e.target.value })} className="input-field" required />
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" disabled={loading} className="btn-primary text-sm">{loading ? "Adding..." : "Add Crop"}</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary text-sm">Cancel</button>
            </div>
          </motion.form>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {crops.map((crop: any, i: number) => (
            <CropCard key={i} cropName={crop.cropName} quality={crop.quality} quantity={crop.quantity} minPrice={crop.minPrice} />
          ))}
          {crops.length === 0 && (
            <div className="col-span-full glass-card p-12 text-center">
              <Wheat className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No crops listed yet. Add your first crop!</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FarmerDashboard;
