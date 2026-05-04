import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function Navbar({ currentPage, onPageChange }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", id: "home" },
    { name: "Portfolio", id: "portfolio" },
    { name: "About", id: "about" },
    { name: "Pricing", id: "pricing" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-500">
      <div className="glass px-6 py-4 md:px-12 md:py-6 flex justify-between items-center">
        {/* Logo */}
        <motion.button 
          onClick={() => onPageChange("home")}
          className="text-2xl font-serif tracking-widest uppercase hover:text-luxury-crimson transition-colors"
          whileHover={{ scale: 1.05 }}
        >
          Aurelius
        </motion.button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-12 items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`text-xs uppercase tracking-[0.2em] font-medium transition-all relative group ${
                currentPage === item.id ? "text-luxury-crimson" : "text-luxury-ink/60 hover:text-luxury-ink"
              }`}
            >
              {item.name}
              <span className={`absolute -bottom-2 left-0 h-[1px] bg-luxury-crimson transition-all duration-300 ${
                currentPage === item.id ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </button>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange("contact")}
            className="px-6 py-2 bg-luxury-dark text-white text-[10px] uppercase tracking-[0.3em] hover:bg-luxury-crimson transition-colors"
          >
            Inquire
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-luxury-bg md:hidden pt-32 pb-12 px-6 flex flex-col justify-between"
          >
            <div className="flex flex-col gap-8">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => {
                    onPageChange(item.id);
                    setIsOpen(false);
                  }}
                  className="text-left"
                >
                  <span className={`text-4xl font-serif italic ${
                    currentPage === item.id ? "text-luxury-crimson" : "text-luxury-ink"
                  }`}>
                    {item.name}
                  </span>
                  <p className="text-[8px] uppercase tracking-[0.4em] text-luxury-ink/40 mt-1">
                    {item.id === "portfolio" ? "The Gallery" : item.id === "contact" ? "Inquiry" : "Explore"}
                  </p>
                </motion.button>
              ))}
            </div>

            <div className="space-y-4 border-t border-luxury-dark/10 pt-8">
              <p className="text-[10px] uppercase tracking-widest text-luxury-ink/60">New York Studio</p>
              <p className="text-[10px] uppercase tracking-widest text-luxury-ink/60">+1 212 555 0198</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
