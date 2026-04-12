import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import PublicNavbar from "./PublicNavbar";
import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const InstagramIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>);
const FacebookIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>);
import axiosInstance from "../../utils/axiosInstance";

export default function PublicLayout() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await axiosInstance.get("/cms/site-settings");
        setSettings(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSettings();
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-sans selection:bg-cyan-500 selection:text-white flex flex-col">
      <PublicNavbar settings={settings} />

      <main className="flex-1">
        <Outlet context={{ settings }} />
      </main>

      {/* Global Footer */}
      <footer className="bg-slate-950 py-20 px-6 border-t border-slate-900 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          <div>
            <h3 className="text-2xl font-black text-white tracking-widest mb-6">
              {settings?.businessName || "STUDIO PRO"}
            </h3>
            <p className="text-slate-500 font-light leading-relaxed mb-8">
              Creating timeless visual experiences. Reach out to secure your dates for the upcoming season.
            </p>
            <div className="flex space-x-4">
              {settings?.socialLinks?.instagram && <a href={settings.socialLinks.instagram} className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-cyan-500 transition-colors"><InstagramIcon /></a>}
              {settings?.socialLinks?.facebook && <a href={settings.socialLinks.facebook} className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-cyan-500 transition-colors"><FacebookIcon /></a>}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-6">Contact Us</h3>
            <ul className="space-y-4 text-slate-400 font-light">
              <li className="flex items-center"><Phone className="w-5 h-5 mr-4 text-cyan-500" /> {settings?.contact?.phone || "+1 (555) 000-0000"}</li>
              <li className="flex items-center"><Mail className="w-5 h-5 mr-4 text-cyan-500" /> {settings?.contact?.email || "hello@studiopro.com"}</li>
              <li className="flex items-start"><MapPin className="w-5 h-5 mr-4 text-cyan-500 mt-1" /> <span className="max-w-[200px]">{settings?.contact?.address || "123 Photography Lane, NY"}</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-6">Admin Panel</h3>
            <p className="text-slate-500 font-light mb-6">Staff portal for internal management.</p>
            <Link to="/login" className="inline-block border-b border-cyan-500 text-cyan-400 pb-1 hover:text-white transition-colors">
              Access Dashboard &rarr;
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
