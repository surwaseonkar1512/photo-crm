import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Camera, ArrowRight } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";

export default function Home() {
  const [data, setData] = useState({
    siteSettings: null,
    banners: [],
    about: null,
    packages: [],
    testimonials: [],
    contact: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicData = async () => {
      try {
        const [settingsRes, bannerRes, aboutRes, packageRes, testimonialRes, contactRes] = await Promise.all([
          axiosInstance.get("/cms/site-settings"),
          axiosInstance.get("/cms/banner?public=true"),
          axiosInstance.get("/cms/about"),
          axiosInstance.get("/cms/package"),
          axiosInstance.get("/cms/testimonial?public=true"),
          axiosInstance.get("/cms/contact")
        ]);

        setData({
          siteSettings: settingsRes.data,
          banners: bannerRes.data || [],
          about: aboutRes.data,
          packages: packageRes.data || [],
          testimonials: testimonialRes.data || [],
          contact: contactRes.data
        });
      } catch (err) {
        console.error("Error fetching site data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPublicData();
  }, []);

  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
        <Camera className="w-12 h-12 text-cyan-500" />
      </motion.div>
    </div>
  );

  const heroBanner = data.banners.length > 0 ? data.banners[0] : {
    title: "CAPTURING ETERNITY",
    subtitle: "Premium Photography Services",
    slogan: "Every frame tells a story.",
    mainImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop",
  };

  const aboutUs = data.about && data.about.title ? data.about : {
    title: "About The Artist",
    description: "With over a decade of experience in capturing the raw, unfiltered emotions of life's most precious moments, our studio specializes in creating timeless visual legacies. We believe that true beauty lies in authenticity.",
    image: "https://images.unsplash.com/photo-1554048612-b6a482dd2bfb?q=80&w=1964&auto=format&fit=crop"
  };

  const dummyPackages = [
    { title: "Wedding Day", category: "Weddings", variants: [{ name: "Premium Tier", sellingPrice: 2500, features: ["8 Hours Coverage", "2 Photographers", "Digital Gallery", "Drone Shots"] }] },
    { title: "Portrait Session", category: "Portraits", variants: [{ name: "Standard", sellingPrice: 400, features: ["2 Hours Session", "Studio Lighting", "20 Retouched Images"] }] },
  ];
  const displayPackages = data.packages.length > 0 ? data.packages : dummyPackages;

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans overflow-x-hidden selection:bg-cyan-500 selection:text-white">

      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: yHero, opacity: opacityHero }} className="absolute inset-0 z-0">
          <img src={heroBanner.mainImage} alt="Hero" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/60 to-slate-950"></div>
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="uppercase tracking-[0.3em] text-cyan-400 text-sm md:text-base font-medium mb-4">
            {heroBanner.subtitle}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6 leading-tight">
            {heroBanner.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-xl md:text-2xl text-slate-300 font-light mb-10 max-w-2xl mx-auto">
            {heroBanner.slogan}
          </motion.p>
          <motion.a initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.6 }} href="#packages" className="inline-block bg-white text-slate-950 px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-cyan-400 transition-colors duration-300">
            View Packages
          </motion.a>
        </div>
      </section>

      {/* 2. ABOUT US */}
      <section className="py-32 px-6 bg-slate-950 relative" id="about">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative h-[600px] w-full">
            <img src={aboutUs.image} alt="About Us" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" />
            <div className="absolute -bottom-8 -right-8 w-64 h-64 border-2 border-cyan-500 z-0"></div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-8 text-white">{aboutUs.title}</h2>
            <p className="text-slate-400 text-lg leading-relaxed font-light mb-10">
              {aboutUs.description}
            </p>
            {data.siteSettings?.signature && (
              <img src={data.siteSettings.signature} alt="Signature" className="h-16 invert opacity-80" />
            )}
          </motion.div>
        </div>
      </section>

      {/* 3. PACKAGES */}
      <section className="py-32 bg-slate-900 border-t border-slate-800" id="packages">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-white">Our Packages</h2>
            <div className="w-24 h-1 bg-cyan-500 mx-auto mt-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPackages.map((pkg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-slate-950 border border-slate-800 p-10 hover:border-cyan-500 transition-colors duration-500 group relative overflow-hidden"
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
                    <ul className="space-y-4 mb-10">
                      {pkg.variants[0].features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center text-slate-400 font-light">
                          <ArrowRight className="w-4 h-4 text-cyan-500 mr-3" /> {feature}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <button className="w-full py-4 border border-slate-700 hover:border-cyan-400 text-white font-medium uppercase tracking-widest text-sm transition-colors duration-300 group-hover:bg-cyan-400 group-hover:text-slate-950">
                  Book Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
