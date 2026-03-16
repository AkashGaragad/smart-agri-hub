import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sprout, Wheat, FlaskConical, TrendingUp, Leaf, Shield,
  ArrowRight, ChevronRight, Upload, Search, Bug, Sun,
  CloudRain, Thermometer, BarChart3, ShoppingBag, Users,
  Gavel, Star, Phone, Mail, MapPin
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" }
  })
};

const marketRates = [
  { crop: "Wheat", price: "₹2,275", change: "+2.3%", up: true },
  { crop: "Rice (Basmati)", price: "₹3,850", change: "+1.8%", up: true },
  { crop: "Cotton", price: "₹6,380", change: "-0.5%", up: false },
  { crop: "Soybean", price: "₹4,600", change: "+3.1%", up: true },
  { crop: "Sugarcane", price: "₹3,150", change: "+0.9%", up: true },
  { crop: "Maize", price: "₹1,962", change: "-1.2%", up: false },
];

const fertilizers = [
  { name: "Urea (46-0-0)", price: "₹267/bag", brand: "IFFCO", rating: 4.5, stock: "In Stock" },
  { name: "DAP (18-46-0)", price: "₹1,350/bag", brand: "Coromandel", rating: 4.7, stock: "In Stock" },
  { name: "NPK (10-26-26)", price: "₹1,470/bag", brand: "RCF", rating: 4.3, stock: "Limited" },
  { name: "MOP (0-0-60)", price: "₹1,700/bag", brand: "IPL", rating: 4.4, stock: "In Stock" },
  { name: "SSP (0-16-0)", price: "₹450/bag", brand: "Paradeep", rating: 4.2, stock: "In Stock" },
  { name: "Zinc Sulphate", price: "₹380/bag", brand: "Tata", rating: 4.6, stock: "Limited" },
];

const schemes = [
  {
    title: "PM-KISAN Samman Nidhi",
    desc: "Direct income support of ₹6,000/year to farmer families in three equal installments.",
    ministry: "Ministry of Agriculture",
    link: "#",
  },
  {
    title: "Pradhan Mantri Fasal Bima Yojana",
    desc: "Crop insurance scheme providing financial support to farmers suffering crop loss due to natural calamities.",
    ministry: "Ministry of Agriculture",
    link: "#",
  },
  {
    title: "Kisan Credit Card (KCC)",
    desc: "Provides farmers with affordable credit for agricultural needs at subsidized interest rates.",
    ministry: "Ministry of Finance",
    link: "#",
  },
  {
    title: "Soil Health Card Scheme",
    desc: "Provides soil health cards to farmers with crop-wise nutrient recommendations.",
    ministry: "Ministry of Agriculture",
    link: "#",
  },
  {
    title: "e-NAM (National Agriculture Market)",
    desc: "Online trading platform for agricultural commodities creating a unified national market.",
    ministry: "Ministry of Agriculture",
    link: "#",
  },
  {
    title: "Paramparagat Krishi Vikas Yojana",
    desc: "Promotes organic farming through cluster approach and PGS certification.",
    ministry: "Ministry of Agriculture",
    link: "#",
  },
];

const diseases = [
  { name: "Leaf Blight", crop: "Rice", severity: "High", icon: "🍂" },
  { name: "Powdery Mildew", crop: "Wheat", severity: "Medium", icon: "🌾" },
  { name: "Bacterial Wilt", crop: "Tomato", severity: "High", icon: "🍅" },
  { name: "Rust", crop: "Soybean", severity: "Low", icon: "🫘" },
];

const LandingPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<null | { disease: string; confidence: number; remedy: string }>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
      setResult(null);
    }
  };

  const analyzeImage = () => {
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      setResult({
        disease: "Leaf Blight (Helminthosporium)",
        confidence: 94.2,
        remedy: "Apply Mancozeb 75% WP @ 2.5g/litre or Carbendazim 50% WP @ 1g/litre. Remove infected leaves and ensure proper drainage.",
      });
      setAnalyzing(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border backdrop-blur-xl bg-background/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="gradient-primary p-2 rounded-lg">
              <Sprout className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">Smart Agri Market</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#market" className="text-muted-foreground hover:text-foreground transition-colors">Market Rates</a>
            <a href="#fertilizers" className="text-muted-foreground hover:text-foreground transition-colors">Fertilizers</a>
            <a href="#schemes" className="text-muted-foreground hover:text-foreground transition-colors">Govt Schemes</a>
            <a href="#disease" className="text-muted-foreground hover:text-foreground transition-colors">AI Detector</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login" className="btn-secondary text-sm !py-2 !px-4">Login</Link>
            <Link to="/register" className="btn-primary text-sm !py-2 !px-4">Get Started</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="gradient-hero text-primary-foreground py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-primary blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-secondary blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <motion.div initial="hidden" animate="visible" className="max-w-3xl">
            <motion.p variants={fadeUp} custom={0} className="text-primary/80 font-semibold text-sm tracking-widest uppercase mb-4">
              India's Smart Agriculture Platform
            </motion.p>
            <motion.h1 variants={fadeUp} custom={1} className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6">
              Empowering Farmers with <span className="text-primary">Technology</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-lg md:text-xl text-sidebar-foreground/70 mb-8 max-w-2xl">
              Real-time crop auctions, live market rates, AI-powered disease detection, and direct access to government schemes — all in one platform.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
              <Link to="/register" className="btn-primary text-base flex items-center gap-2">
                Start Selling <ArrowRight className="h-5 w-5" />
              </Link>
              <a href="#market" className="btn-secondary !border-sidebar-foreground/30 !text-sidebar-foreground hover:!bg-sidebar-foreground/10 text-base">
                Explore Market
              </a>
            </motion.div>
          </motion.div>
          <motion.div initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {[
              { icon: Users, label: "10K+ Farmers", sub: "Active users" },
              { icon: Wheat, label: "500+ Crops", sub: "Listed daily" },
              { icon: Gavel, label: "Live Auctions", sub: "Real-time bidding" },
              { icon: Shield, label: "Govt Verified", sub: "Trusted platform" },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} custom={i + 4} className="glass-card p-4 !bg-sidebar-accent/50 !border-sidebar-border text-center">
                <item.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="font-display font-bold text-sidebar-foreground">{item.label}</p>
                <p className="text-xs text-sidebar-foreground/60">{item.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Live Market Rates */}
      <section id="market" className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
          <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 badge-role bg-accent text-accent-foreground mb-4">
            <TrendingUp className="h-3 w-3" /> Live Mandi Rates
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1} className="section-title text-3xl md:text-4xl">
            Today's Crop Market Prices
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-muted-foreground mt-2 max-w-lg mx-auto">
            Real-time prices from major agricultural mandis across India.
          </motion.p>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {marketRates.map((item, i) => (
            <motion.div key={i} variants={fadeUp} custom={i} className="glass-card-hover p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${item.up ? "gradient-primary" : "bg-destructive/10"}`}>
                  <Wheat className={`h-5 w-5 ${item.up ? "text-primary-foreground" : "text-destructive"}`} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground">{item.crop}</h3>
                  <p className="text-sm text-muted-foreground">Per Quintal</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-display font-bold text-lg text-foreground">{item.price}</p>
                <p className={`text-sm font-semibold ${item.up ? "text-primary" : "text-destructive"}`}>
                  {item.change} {item.up ? "↑" : "↓"}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Fertilizer Shop */}
      <section id="fertilizers" className="py-16 md:py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 badge-role bg-secondary/20 text-secondary-foreground mb-4">
              <FlaskConical className="h-3 w-3" /> Fertilizer Shop
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="section-title text-3xl md:text-4xl">
              Quality Fertilizers at Best Prices
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground mt-2 max-w-lg mx-auto">
              Browse verified fertilizer products from trusted dealers.
            </motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fertilizers.map((f, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} className="glass-card-hover p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <div className="gradient-warm p-3 rounded-xl">
                    <FlaskConical className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  <span className={`badge-role text-xs ${f.stock === "In Stock" ? "bg-primary/10 text-primary" : "bg-secondary/20 text-secondary-foreground"}`}>
                    {f.stock}
                  </span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground">{f.name}</h3>
                  <p className="text-sm text-muted-foreground">{f.brand}</p>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star key={si} className={`h-3.5 w-3.5 ${si < Math.floor(f.rating) ? "text-secondary fill-secondary" : "text-border"}`} />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">{f.rating}</span>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-3">
                  <p className="text-xl font-bold font-display text-foreground">{f.price}</p>
                  <Link to="/register" className="btn-warm text-sm !py-2 !px-4 flex items-center gap-1">
                    <ShoppingBag className="h-4 w-4" /> Buy
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Government Schemes */}
      <section id="schemes" className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
          <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 badge-role bg-primary/10 text-primary mb-4">
            <Shield className="h-3 w-3" /> Government Schemes
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1} className="section-title text-3xl md:text-4xl">
            Schemes & Subsidies for Farmers
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-muted-foreground mt-2 max-w-lg mx-auto">
            Stay updated with the latest government schemes and subsidies available for Indian farmers.
          </motion.p>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {schemes.map((s, i) => (
            <motion.div key={i} variants={fadeUp} custom={i} className="glass-card-hover p-6 flex flex-col gap-3">
              <div className="gradient-primary p-3 rounded-xl w-fit">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground">{s.title}</h3>
              <p className="text-sm text-muted-foreground flex-1">{s.desc}</p>
              <div className="flex items-center justify-between border-t border-border pt-3">
                <span className="text-xs text-muted-foreground">{s.ministry}</span>
                <a href={s.link} className="text-primary text-sm font-semibold flex items-center gap-1 hover:underline">
                  Learn More <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* AI Crop Disease Detector */}
      <section id="disease" className="py-16 md:py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 badge-role bg-destructive/10 text-destructive mb-4">
              <Bug className="h-3 w-3" /> AI Powered
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="section-title text-3xl md:text-4xl">
              AI Crop Disease Detector
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground mt-2 max-w-lg mx-auto">
              Upload a photo of your crop leaf and our AI will identify diseases instantly with treatment recommendations.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Area */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.div variants={fadeUp} custom={0} className="glass-card p-6 space-y-4">
                <h3 className="font-display font-bold text-lg text-foreground">Upload Crop Image</h3>
                <label className="block border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary hover:bg-accent/30 transition-all">
                  {selectedImage ? (
                    <img src={selectedImage} alt="Uploaded crop" className="max-h-48 mx-auto rounded-lg object-cover" />
                  ) : (
                    <div>
                      <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                      <p className="text-foreground font-semibold">Click to upload or drag & drop</p>
                      <p className="text-sm text-muted-foreground mt-1">JPG, PNG up to 10MB</p>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>

                {selectedImage && (
                  <button onClick={analyzeImage} disabled={analyzing} className="btn-primary w-full flex items-center justify-center gap-2">
                    {analyzing ? (
                      <>
                        <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4" /> Detect Disease
                      </>
                    )}
                  </button>
                )}

                {result && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="border border-destructive/20 bg-destructive/5 rounded-xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-bold text-foreground">Detection Result</h4>
                      <span className="badge-role bg-destructive/10 text-destructive">{result.confidence}% match</span>
                    </div>
                    <p className="font-semibold text-destructive">{result.disease}</p>
                    <div>
                      <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">Recommended Treatment</p>
                      <p className="text-sm text-foreground">{result.remedy}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>

            {/* Common Diseases */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
              <motion.h3 variants={fadeUp} custom={0} className="font-display font-bold text-lg text-foreground">
                Common Crop Diseases
              </motion.h3>
              {diseases.map((d, i) => (
                <motion.div key={i} variants={fadeUp} custom={i + 1} className="glass-card-hover p-4 flex items-center gap-4">
                  <span className="text-2xl">{d.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-display font-bold text-foreground">{d.name}</h4>
                    <p className="text-sm text-muted-foreground">Affects: {d.crop}</p>
                  </div>
                  <span className={`badge-role ${
                    d.severity === "High" ? "bg-destructive/10 text-destructive" :
                    d.severity === "Medium" ? "bg-secondary/20 text-secondary-foreground" :
                    "bg-primary/10 text-primary"
                  }`}>
                    {d.severity}
                  </span>
                </motion.div>
              ))}

              <motion.div variants={fadeUp} custom={5} className="glass-card p-5 gradient-primary !border-0">
                <div className="flex items-start gap-3">
                  <div className="bg-primary-foreground/20 p-2 rounded-lg">
                    <Leaf className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-primary-foreground">Prevention Tips</h4>
                    <ul className="text-sm text-primary-foreground/80 mt-2 space-y-1">
                      <li>• Use certified disease-free seeds</li>
                      <li>• Maintain proper crop spacing</li>
                      <li>• Practice crop rotation regularly</li>
                      <li>• Monitor weather conditions</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="gradient-hero text-sidebar-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="gradient-primary p-2 rounded-lg">
                  <Sprout className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-display font-bold text-xl">Smart Agri Market</span>
              </div>
              <p className="text-sidebar-foreground/60 text-sm max-w-sm">
                Empowering Indian farmers with technology, fair pricing, and direct market access.
              </p>
            </div>
            <div>
              <h4 className="font-display font-bold mb-3">Quick Links</h4>
              <div className="space-y-2 text-sm text-sidebar-foreground/60">
                <a href="#market" className="block hover:text-sidebar-foreground transition-colors">Market Rates</a>
                <a href="#fertilizers" className="block hover:text-sidebar-foreground transition-colors">Fertilizers</a>
                <a href="#schemes" className="block hover:text-sidebar-foreground transition-colors">Govt Schemes</a>
                <a href="#disease" className="block hover:text-sidebar-foreground transition-colors">AI Detector</a>
              </div>
            </div>
            <div>
              <h4 className="font-display font-bold mb-3">Contact</h4>
              <div className="space-y-2 text-sm text-sidebar-foreground/60">
                <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> 1800-XXX-XXXX</p>
                <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> support@smartagri.in</p>
                <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> New Delhi, India</p>
              </div>
            </div>
          </div>
          <div className="border-t border-sidebar-border pt-6 text-center text-sm text-sidebar-foreground/40">
            © 2026 Smart Agri Market. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
