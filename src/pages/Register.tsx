import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "@/services/api";
import { motion } from "framer-motion";
import { Sprout, Mail, Lock, User, ArrowRight, Wheat, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("farmer");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser({ name, email, password, role });
      toast.success("Account created! Please sign in.");
      navigate("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 gradient-hero items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-primary/20" style={{
              width: Math.random() * 100 + 50, height: Math.random() * 100 + 50,
              top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
            }} />
          ))}
        </div>
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="relative z-10 text-center">
          <div className="gradient-primary p-4 rounded-2xl inline-block mb-6">
            <Sprout className="h-12 w-12 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold font-display text-primary-foreground mb-4">Join the Revolution</h1>
          <p className="text-lg text-primary-foreground/70 max-w-md">
            Start trading crops, bidding in auctions, and growing your agri business today
          </p>
        </motion.div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="gradient-primary p-2 rounded-lg">
              <Sprout className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">Smart Agri Market</span>
          </div>

          <h2 className="text-3xl font-bold font-display text-foreground mb-2">Create account</h2>
          <p className="text-muted-foreground mb-8">Join Smart Agri Market today</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} className="input-field pl-11" required />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field pl-11" required />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field pl-11" required />
            </div>

            <div>
              <p className="text-sm font-medium text-foreground mb-2">I am a</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "farmer", label: "Farmer", icon: Wheat },
                  { value: "buyer", label: "Buyer", icon: ShoppingCart },
                ].map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                      role === r.value
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    <r.icon className="h-5 w-5" />
                    <span className="font-medium text-sm">{r.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary flex items-center justify-center gap-2 mt-2">
              {loading ? "Creating..." : (<>Create Account <ArrowRight className="h-4 w-4" /></>)}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
