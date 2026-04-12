import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosInstance from "../../utils/axiosInstance";

export default function About() {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const { data } = await axiosInstance.get("/cms/about");
        setAbout(data);
      } catch (err) {
        // ignore
      }
    };
    fetchAbout();
  }, []);

  const aboutData = about?.title ? about : {
    title: "The Artist Behind the Lens",
    description: "Every frame we capture is unscripted, genuine, and timeless. With a signature style bridging cinematic beauty with photojournalism, we chase the raw, unfiltered emotions of life's most precious moments. \\n\\nWe believe that true photography isn't about posing; it's about connecting with your subjects until they forget the camera is even there.",
    image: "https://images.unsplash.com/photo-1554048612-b6a482dd2bfb?q=80&w=1964&auto=format&fit=crop"
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-7xl font-black text-center mb-20 tracking-tighter"
      >
        ABOUT <span className="text-cyan-500">US</span>
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="relative h-[700px] w-full">
          <img src={aboutData.image} alt="About Us" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl" />
          <div className="absolute -bottom-8 -left-8 w-64 h-64 border-2 border-cyan-500 z-0 hidden md:block"></div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-8 text-white">{aboutData.title}</h2>
          <div className="text-slate-400 text-lg leading-relaxed font-light space-y-6">
            {aboutData.description.split('\\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
