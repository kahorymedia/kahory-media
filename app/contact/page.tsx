"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Affirmation from "@/components/Affirmation";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwcBWql6IQEkZ78oWPCGpuFt3M0WPKxHidAfVmbt8qwmhAOnwDB4yjsVP3mvOPgNi_0/exec";

    // Format the payload to match the Google Sheet structure perfectly
    const payload = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      brandLink: "N/A", 
      objective: "Direct Contact Form", 
      budget: "N/A"
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Trigger the Green Affirmation Message
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" }); // Reset local state
      setTimeout(() => setIsSubmitted(false), 5000); 

    } catch (err) {
      alert("Failed to send the inquiry. Please try again or email hi@kahorymedia.com directly.");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    // FIX: Added 'relative overflow-hidden' to the main tag to contain the background glow
    <main className="bg-[#080808] min-h-screen text-white flex flex-col selection:bg-[#E5D3B3] selection:text-black relative overflow-hidden">
      
      {/* FIX: Re-added the missing background glow and applied GPU acceleration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E61919]/5 blur-[120px] rounded-full pointer-events-none will-change-transform transform-gpu" />

      <Affirmation show={isSubmitted} />
      <Header />
      
      {/* FIX: Added relative z-10 so the content sits correctly above the glow */}
      <section className="flex-grow pt-80 pb-32 px-6 md:px-12 w-full max-w-[1400px] mx-auto relative z-10">
        <div className="mt-12 mb-24">
          <a href="/" className="group inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-white/30 hover:text-[#E5D3B3] transition-all cursor-pointer relative z-[110]">
            <span className="group-hover:-translate-x-2 transition-transform duration-500">←</span> Return Home
          </a>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-[15vw] lg:text-[10rem] font-bold tracking-tighter leading-[0.8] uppercase italic"
          >
            Let's<br />talk.
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            // MAJOR PERFORMANCE FIX: Added 'will-change-transform transform-gpu' here. 
            // This forces the heavy 'backdrop-blur-xl' to be rendered by the dedicated GPU, eliminating WebGL lag!
            className="bg-zinc-900/20 p-8 md:p-12 rounded-3xl border border-white/5 backdrop-blur-xl will-change-transform transform-gpu"
          >
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="flex flex-col space-y-4">
                <label className="text-[10px] uppercase tracking-[0.4em] text-[#E5D3B3]">Full Name</label>
                <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} type="text" className="bg-transparent border-b border-white/10 py-3 outline-none focus:border-[#E5D3B3] transition-colors text-xl" placeholder="Your full name" />
              </div>
              <div className="flex flex-col space-y-4">
                <label className="text-[10px] uppercase tracking-[0.4em] text-[#E5D3B3]">Email Address</label>
                <input required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} type="email" className="bg-transparent border-b border-white/10 py-3 outline-none focus:border-[#E5D3B3] transition-colors text-xl" placeholder="xyz@brand.com OR xyz@gmail.com" />
              </div>
              <div className="flex flex-col space-y-4">
                <label className="text-[10px] uppercase tracking-[0.4em] text-[#E5D3B3]">Message</label>
                <textarea required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows={4} className="bg-transparent border-b border-white/10 py-3 outline-none focus:border-[#E5D3B3] transition-colors text-xl resize-none" placeholder="How can we help you? Start with introducing your project or idea." />
              </div>
              <button 
                disabled={loading}
                className="w-full py-6 bg-white text-black font-black uppercase tracking-[0.2em] rounded-full hover:bg-[#E5D3B3] transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? "SENDING..." : "SEND INQUIRY"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}