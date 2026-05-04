import { motion } from "motion/react";
import { Instagram, Twitter, Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-luxury-dark text-white py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <h3 className="font-serif text-3xl tracking-widest uppercase">Aurelius</h3>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Capturing the essence of high fashion and luxury editorial through a lens of artistic precision.
            </p>
            <div className="flex gap-6">
              <Instagram className="w-5 h-5 cursor-pointer hover:text-luxury-gold transition-colors" />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-luxury-blue transition-colors" />
              <Mail className="w-5 h-5 cursor-pointer hover:text-luxury-crimson transition-colors" />
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">Navigation</h4>
            <ul className="space-y-4">
              {["Portfolio", "About", "Services", "Contact", "The Journal"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm hover:text-luxury-crimson transition-colors flex items-center gap-2 group">
                    {item}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">Studio</h4>
            <p className="text-sm text-white/60 leading-loose">
              7th Avenue, 10011<br />
              Manhattan, NY<br />
              +1 212 555 0198
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">Newsletter</h4>
            <p className="text-sm text-white/60">Join the exclusive circle.</p>
            <div className="flex border-b border-white/20 py-2">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-white/20"
              />
              <button className="text-[10px] uppercase tracking-widest hover:text-luxury-gold transition-colors">Join</button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
            © 2026 Aurelius Studio. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

        <motion.h2 
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center text-[15vw] leading-none font-serif tracking-tighter opacity-10 mt-12 pointer-events-none select-none"
        >
          AURELIUS
        </motion.h2>
      </div>
    </footer>
  );
}
