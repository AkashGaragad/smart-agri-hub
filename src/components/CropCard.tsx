import { Wheat, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface CropCardProps {
  cropName: string;
  quality: string;
  quantity: number;
  minPrice: number;
  currentBid?: number;
  onBid?: () => void;
}

const CropCard = ({ cropName, quality, quantity, minPrice, currentBid, onBid }: CropCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card-hover p-5 flex flex-col gap-4"
    >
      <div className="flex items-start justify-between">
        <div className="gradient-primary p-3 rounded-xl">
          <Wheat className="h-6 w-6 text-primary-foreground" />
        </div>
        <span className="badge-role bg-accent text-accent-foreground">{quality}</span>
      </div>
      <div>
        <h3 className="font-display font-bold text-lg text-foreground">{cropName}</h3>
        <p className="text-sm text-muted-foreground">{quantity} kg available</p>
      </div>
      <div className="flex items-center justify-between border-t border-border pt-3">
        <div>
          <p className="text-xs text-muted-foreground">Min Price</p>
          <p className="text-lg font-bold text-foreground">₹{minPrice}</p>
        </div>
        {currentBid !== undefined && (
          <div className="text-right">
            <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
              <TrendingUp className="h-3 w-3 text-primary" /> Current Bid
            </p>
            <p className="text-lg font-bold text-primary">₹{currentBid}</p>
          </div>
        )}
      </div>
      {onBid && (
        <button onClick={onBid} className="btn-primary w-full text-sm">
          Place Bid
        </button>
      )}
    </motion.div>
  );
};

export default CropCard;
