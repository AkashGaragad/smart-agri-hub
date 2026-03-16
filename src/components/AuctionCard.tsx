import { Gavel, TrendingUp, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface AuctionCardProps {
  cropName: string;
  quality: string;
  quantity: number;
  currentBid: number;
  totalBids: number;
  onJoin?: () => void;
}

const AuctionCard = ({ cropName, quality, quantity, currentBid, totalBids, onJoin }: AuctionCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card-hover p-5 flex flex-col gap-4 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 gradient-primary px-3 py-1 rounded-bl-xl">
        <span className="text-xs font-semibold text-primary-foreground flex items-center gap-1">
          <Clock className="h-3 w-3" /> LIVE
        </span>
      </div>
      <div className="flex items-start gap-3">
        <div className="bg-primary/10 p-3 rounded-xl">
          <Gavel className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-display font-bold text-lg text-foreground">{cropName}</h3>
          <p className="text-sm text-muted-foreground">{quality} • {quantity} kg</p>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex-1 bg-accent/50 rounded-lg p-3 text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
            <TrendingUp className="h-3 w-3" /> Highest Bid
          </p>
          <p className="text-xl font-bold text-primary">₹{currentBid}</p>
        </div>
        <div className="flex-1 bg-accent/50 rounded-lg p-3 text-center">
          <p className="text-xs text-muted-foreground">Total Bids</p>
          <p className="text-xl font-bold text-foreground">{totalBids}</p>
        </div>
      </div>
      {onJoin && (
        <button onClick={onJoin} className="btn-primary w-full text-sm animate-pulse-glow">
          Join Auction
        </button>
      )}
    </motion.div>
  );
};

export default AuctionCard;
