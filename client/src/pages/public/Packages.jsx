import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosInstance from "../../utils/axiosInstance";
import { ArrowRight } from "lucide-react";
import LeadModal from "../../components/public/LeadModal";

export default function PublicPackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data } = await axiosInstance.get("/cms/package");
        setPackages(data);
      } catch (err) { }
      finally { setLoading(false); }
    };
    fetchPackages();
  }, []);

  const dummyPackages = [
    { title: "Wedding Day", category: "Weddings", variants: [{ name: "Premium Tier", sellingPrice: 2500, features: ["8 Hours Coverage", "2 Photographers", "Digital Gallery", "Drone Shots"] }] },
    { title: "Portrait Session", category: "Portraits", variants: [{ name: "Standard", sellingPrice: 400, features: ["2 Hours Session", "Studio Lighting", "20 Retouched Images"] }] },
    { title: "Commercial", category: "Business", variants: [{ name: "Full Day", sellingPrice: 1200, features: ["Product Shots", "Team Portraits", "Commercial License"] }] }
  ];
  const displayPackages = packages.length > 0 ? packages : dummyPackages;

  if (loading) return <div className="pt-32 min-h-screen flex justify-center text-cyan-500">Loading...</div>;

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-7xl font-black text-center mb-20 tracking-tighter text-white"
      >
        OUR <span className="text-cyan-500">PACKAGES</span>
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayPackages.map((pkg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="bg-slate-950 border border-slate-800 p-10 hover:border-cyan-500 transition-colors duration-500 group relative overflow-hidden flex flex-col"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full group-hover:bg-cyan-500/30 transition-all duration-700"></div>
            <h4 className="text-cyan-400 tracking-widest text-sm font-bold uppercase mb-4">{pkg.category}</h4>
            <h3 className="text-3xl font-black text-white mb-6">{pkg.title}</h3>

            {pkg.variants && pkg.variants[0] && (
              <>
                <div className="mb-8">
                  <span className="text-5xl font-light text-white">${pkg.variants[0].sellingPrice}</span>
                  <span className="text-slate-500 ml-2">/ start</span>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  {pkg.variants[0].features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center text-slate-400 font-light">
                      <ArrowRight className="w-4 h-4 text-cyan-500 mr-3" /> {feature}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <button 
              onClick={() => {
                setSelectedPkg({
                  title: pkg.title,
                  category: pkg.category,
                  variantName: pkg.variants?.[0]?.name || "Standard",
                });
                setIsModalOpen(true);
              }}
              className="w-full py-4 border border-slate-700 hover:border-cyan-400 text-white font-medium uppercase tracking-widest text-sm transition-colors duration-300 group-hover:bg-cyan-400 group-hover:text-slate-950 mt-auto"
            >
              Inquire Now
            </button>
          </motion.div>
        ))}
      </div>

      <LeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        prefillData={selectedPkg}
      />
    </div>
  );
}
