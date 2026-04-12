import React, { useState } from "react";
import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import { Mail, Phone, MapPin, Send } from "lucide-react";

import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

export default function Contact() {
  const { settings } = useOutletContext();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "", shootType: "", eventDate: "" });
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await axiosInstance.post("/leads", { ...formData, source: "contact_form" });
      setStatus("success");
      toast.success("Inquiry sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "", shootType: "", eventDate: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      toast.error("Failed to send inquiry.");
      setStatus("idle");
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
        className="text-5xl md:text-7xl font-black text-center mb-20 tracking-tighter text-white uppercase"
      >
        GET IN <span className="text-cyan-500">TOUCH</span>
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <h2 className="text-3xl font-bold text-white mb-6">Let's Create Together</h2>
          <p className="text-slate-400 font-light leading-relaxed mb-10">
            Tell us about your upcoming event, portrait session, or commercial project. We take on a limited number of clients per year to ensure the highest quality experience.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center text-slate-300">
              <div className="w-12 h-12 bg-slate-900 flex items-center justify-center mr-4 text-cyan-500"><Phone className="w-5 h-5"/></div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Phone</p>
                <p className="font-light">{settings?.contact?.phone || "+1 (555) 000-0000"}</p>
              </div>
            </div>
            <div className="flex items-center text-slate-300">
              <div className="w-12 h-12 bg-slate-900 flex items-center justify-center mr-4 text-cyan-500"><Mail className="w-5 h-5"/></div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Email</p>
                <p className="font-light">{settings?.contact?.email || "hello@studiopro.com"}</p>
              </div>
            </div>
            <div className="flex items-center text-slate-300">
              <div className="w-12 h-12 bg-slate-900 flex items-center justify-center mr-4 text-cyan-500"><MapPin className="w-5 h-5"/></div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Studio</p>
                <p className="font-light">{settings?.contact?.address || "123 Photography Lane, NY"}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="bg-slate-900/50 border border-slate-800 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Your Name</label>
                <input required type="text" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} className="w-full bg-slate-950 border border-slate-800 text-white px-4 py-3 outline-none focus:border-cyan-500 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Phone</label>
                <input required type="text" value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})} className="w-full bg-slate-950 border border-slate-800 text-white px-4 py-3 outline-none focus:border-cyan-500 transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Email Address</label>
              <input required type="email" value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})} className="w-full bg-slate-950 border border-slate-800 text-white px-4 py-3 outline-none focus:border-cyan-500 transition-colors" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Shoot Type (Optional)</label>
                <select value={formData.shootType} onChange={e=>setFormData({...formData, shootType: e.target.value})} className="w-full bg-slate-950 border border-slate-800 text-white px-4 py-3 outline-none focus:border-cyan-500 transition-colors appearance-none">
                  <option value="">Select an option...</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Pre-Wedding">Pre-Wedding</option>
                  <option value="Maternity">Maternity</option>
                  <option value="Baby Shoot">Baby Shoot</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Other">Other Category</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Event Date (Optional)</label>
                <input type="date" value={formData.eventDate} onChange={e=>setFormData({...formData, eventDate: e.target.value})} className="w-full bg-slate-950 border border-slate-800 text-white px-4 py-3 outline-none focus:border-cyan-500 transition-colors [color-scheme:dark]" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Message Details</label>
              <textarea required rows="4" value={formData.message} onChange={e=>setFormData({...formData, message: e.target.value})} className="w-full bg-slate-950 border border-slate-800 text-white px-4 py-3 outline-none focus:border-cyan-500 transition-colors"></textarea>
            </div>
            <button type="submit" disabled={status === "sending" || status === "success"} className="w-full bg-white text-slate-950 hover:bg-cyan-400 font-bold uppercase tracking-widest py-4 transition-colors flex items-center justify-center gap-2">
              {status === "idle" ? <><Send className="w-4 h-4"/> Send Inquiry</> : status === "sending" ? "Sending..." : "Inquiry Sent!"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
