import { FlaskConical, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

interface FertilizerCardProps {
  name: string;
  price: number;
  quantity: number;
  description: string;
  onBuy?: () => void;
}

const FertilizerCard = ({ name, price, quantity, description, onBuy }: FertilizerCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card-hover p-5 flex flex-col gap-4"
    >
      <div className="flex items-start justify-between">
        <div className="gradient-warm p-3 rounded-xl">
          <FlaskConical className="h-6 w-6 text-secondary-foreground" />
        </div>
        <span className="badge-role bg-secondary/20 text-secondary-foreground">{quantity} units</span>
      </div>
      <div>
        <h3 className="font-display font-bold text-lg text-foreground">{name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </div>
      <div className="flex items-center justify-between border-t border-border pt-3">
        <div>
          <p className="text-xs text-muted-foreground">Price</p>
          <p className="text-xl font-bold text-foreground">₹{price}</p>
        </div>
        {onBuy && (
          <button onClick={onBuy} className="btn-warm text-sm flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" /> Buy
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default FertilizerCard;
