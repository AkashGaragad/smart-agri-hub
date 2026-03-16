import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Gavel, TrendingUp, Send, Zap } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import AuctionCard from "@/components/AuctionCard";
import { getCrops } from "@/services/api";
import socket from "@/services/socket";
import { toast } from "sonner";

interface Bid {
  cropId: string;
  amount: number;
  bidder: string;
  time: string;
}

const AuctionPage = () => {
  const [crops, setCrops] = useState<any[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<any>(null);
  const [bidAmount, setBidAmount] = useState("");
  const [liveBids, setLiveBids] = useState<Bid[]>([]);
  const [highestBid, setHighestBid] = useState(0);

  useEffect(() => {
    getCrops().then(res => setCrops(res.data)).catch(() => {});
    socket.connect();
    socket.on("newBid", (bid: Bid) => {
      setLiveBids(prev => [bid, ...prev]);
      if (bid.amount > highestBid) setHighestBid(bid.amount);
      toast.success(`New bid: ₹${bid.amount}`);
    });
    return () => { socket.off("newBid"); socket.disconnect(); };
  }, [highestBid]);

  const handleBid = () => {
    if (!selectedCrop || !bidAmount) return;
    const amount = Number(bidAmount);
    if (amount <= highestBid) {
      toast.error("Bid must be higher than current highest bid");
      return;
    }
    socket.emit("placeBid", { cropId: selectedCrop._id, amount, bidder: "You" });
    setBidAmount("");
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="section-title flex items-center gap-2">
            <Gavel className="h-7 w-7 text-primary" /> Live Auction
          </h1>
          <p className="text-muted-foreground mt-1">Real-time crop bidding marketplace</p>
        </div>

        {selectedCrop ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Auction Detail */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-foreground">{selectedCrop.cropName}</h2>
                    <p className="text-muted-foreground">{selectedCrop.quality} quality • {selectedCrop.quantity} kg</p>
                  </div>
                  <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full animate-pulse-glow">
                    <Zap className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold text-primary">LIVE</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-accent/50 rounded-xl p-4 text-center">
                    <p className="text-sm text-muted-foreground">Minimum Price</p>
                    <p className="text-2xl font-bold text-foreground">₹{selectedCrop.minPrice}</p>
                  </div>
                  <div className="gradient-primary rounded-xl p-4 text-center">
                    <p className="text-sm text-primary-foreground/80">Highest Bid</p>
                    <p className="text-2xl font-bold text-primary-foreground">₹{highestBid || selectedCrop.minPrice}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <input
                    type="number"
                    placeholder="Enter bid amount (₹)"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="input-field flex-1"
                  />
                  <button onClick={handleBid} className="btn-primary flex items-center gap-2">
                    <Send className="h-4 w-4" /> Place Bid
                  </button>
                </div>
              </motion.div>

              <button onClick={() => setSelectedCrop(null)} className="btn-secondary text-sm">
                ← Back to Auctions
              </button>
            </div>

            {/* Live Bids Feed */}
            <div className="glass-card p-6 h-fit max-h-[500px] overflow-y-auto">
              <h3 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" /> Live Bids
              </h3>
              <div className="space-y-3">
                {liveBids.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-8">No bids yet. Be the first!</p>
                )}
                {liveBids.map((bid, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-accent/30"
                  >
                    <div>
                      <p className="text-sm font-semibold text-foreground">{bid.bidder}</p>
                      <p className="text-xs text-muted-foreground">{bid.time || "Just now"}</p>
                    </div>
                    <span className="font-bold text-primary">₹{bid.amount}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {crops.map((crop: any, i: number) => (
              <AuctionCard
                key={i}
                cropName={crop.cropName}
                quality={crop.quality}
                quantity={crop.quantity}
                currentBid={crop.currentBid || crop.minPrice}
                totalBids={crop.totalBids || 0}
                onJoin={() => {
                  setSelectedCrop(crop);
                  setHighestBid(crop.currentBid || crop.minPrice);
                }}
              />
            ))}
            {crops.length === 0 && (
              <div className="col-span-full glass-card p-12 text-center">
                <Gavel className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No active auctions right now.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AuctionPage;
