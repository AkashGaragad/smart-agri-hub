import { useState, useEffect } from "react";
import { Package, Plus, ShoppingCart, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardStats from "@/components/DashboardStats";
import FertilizerCard from "@/components/FertilizerCard";
import { addFertilizer, getFertilizers, getOrders } from "@/services/api";
import { toast } from "sonner";

const DealerDashboard = () => {
  const [fertilizers, setFertilizers] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", price: "", quantity: "", description: "" });
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const res = await getFertilizers();
      setFertilizers(res.data);
    } catch { /* empty */ }
  };

  useEffect(() => { fetchData(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addFertilizer({
        name: form.name,
        price: Number(form.price),
        quantity: Number(form.quantity),
        description: form.description,
      });
      toast.success("Product added!");
      setForm({ name: "", price: "", quantity: "", description: "" });
      setShowForm(false);
      fetchData();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: "My Products", value: fertilizers.length, icon: Package, trend: "+5%", color: "green" },
    { label: "Farmer Orders", value: 24, icon: ShoppingCart, color: "yellow" },
    { label: "Revenue", value: "₹1.2L", icon: TrendingUp, color: "green" },
    { label: "Active Listings", value: fertilizers.length, icon: Package, color: "blue" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="section-title">Dealer Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your fertilizer products</p>
        </div>
        <DashboardStats stats={stats} />

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display font-bold text-foreground">My Products</h2>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add Product
          </button>
        </div>

        {showForm && (
          <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleAdd} className="glass-card p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Product Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" required />
            <input type="number" placeholder="Price (₹)" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="input-field" required />
            <input type="number" placeholder="Quantity" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} className="input-field" required />
            <input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field" required />
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" disabled={loading} className="btn-primary text-sm">{loading ? "Adding..." : "Add Product"}</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary text-sm">Cancel</button>
            </div>
          </motion.form>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {fertilizers.map((f: any, i: number) => (
            <FertilizerCard key={i} name={f.name} price={f.price} quantity={f.quantity} description={f.description} />
          ))}
          {fertilizers.length === 0 && (
            <div className="col-span-full glass-card p-12 text-center">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No products yet. Add your first product!</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DealerDashboard;
