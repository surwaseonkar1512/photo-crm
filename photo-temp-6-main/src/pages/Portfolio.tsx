import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Search } from "lucide-react";

const PROJECTS = [
  { id: 1, title: "Velvet Dream", category: "Editorial", city: "Milan", image: "https://picsum.photos/seed/p1/800/1000", size: "tall" },
  { id: 2, title: "Noir Elegance", category: "Campaign", city: "Paris", image: "https://picsum.photos/seed/p2/800/800", size: "square" },
  { id: 3, title: "Azure Horizon", category: "Concept", city: "London", image: "https://picsum.photos/seed/p3/1200/800", size: "wide" },
  { id: 4, title: "The Glass House", category: "Architecture", city: "NY", image: "https://picsum.photos/seed/p4/800/1000", size: "tall" },
  { id: 5, title: "Golden Hour", category: "Editorial", city: "Dubai", image: "https://picsum.photos/seed/p5/800/800", size: "square" },
  { id: 6, title: "Urban Silence", category: "Concept", city: "Tokyo", image: "https://picsum.photos/seed/p6/1200/800", size: "wide" },
  { id: 7, title: "Silk Road", category: "Fashion", city: "Beijing", image: "https://picsum.photos/seed/p7/800/1000", size: "tall" },
  { id: 8, title: "Marble Muse", category: "Editorial", city: "Rome", image: "https://picsum.photos/seed/p8/800/800", size: "square" },
];

const CATEGORIES = ["All", "Editorial", "Campaign", "Concept", "Architecture", "Fashion"];

export default function Portfolio() {
  const [filter, setFilter] = useState("All");

  const filteredProjects = PROJECTS.filter(p => filter === "All" || p.category === filter);

  return (
    <div className="pt-32 min-h-screen px-6 md:px-12 pb-32">
      <div className="max-w-screen-2xl mx-auto">
        <header className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12">
          <div>
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-luxury-gold mb-4 block">Our Work</span>
            <h1 className="text-8xl md:text-9xl font-serif italic-small tracking-tighter">THE <br /> GALLERY</h1>
          </div>
          
          <div className="flex flex-wrap gap-4 md:gap-8 border-b border-luxury-dark/10 pb-4">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all ${
                  filter === cat ? "text-luxury-crimson" : "text-luxury-ink/40 hover:text-luxury-ink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 auto-rows-[200px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer shadow-xl ${
                  project.size === "tall" ? "lg:col-span-4 lg:row-span-3" : 
                  project.size === "wide" ? "lg:col-span-8 lg:row-span-2" : 
                  "lg:col-span-4 lg:row-span-2"
                }`}
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold font-bold mb-2">
                    {project.category} — {project.city}
                  </span>
                  <h3 className="text-3xl font-serif text-white">{project.title}</h3>
                  <div className="h-[1px] w-0 group-hover:w-full bg-luxury-blue mt-4 transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Floating Search/Menu for Gallery */}
        <div className="fixed bottom-12 right-12 z-40 bg-luxury-dark text-white p-6 rounded-full shadow-2xl flex items-center gap-4 cursor-pointer hover:scale-110 transition-transform">
          <Search className="w-6 h-6" />
          <span className="text-[10px] uppercase tracking-widest font-bold pr-2 hidden md:block">Search Archive</span>
        </div>
      </div>
    </div>
  );
}
