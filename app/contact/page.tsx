"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Affirmation from "@/components/Affirmation";
import emailjs from '@emailjs/browser';
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // EMAILJS INTEGRATION
      await emailjs.sendForm(
        'service_3tvs6kx',   // e.g., 'service_abc123'
        'template_agkpttj',  // e.g., 'template_xyz789'
        formRef.current!,
        '_N1HP2QGhSzFF1p3n'    // e.g., 'aBcDeFgHiJkLmNoP'
      );

      // Trigger the Green Affirmation Message
      setIsSubmitted(true);
      formRef.current?.reset(); 
      setTimeout(() => setIsSubmitted(false), 5000); 

    } catch (err) {
      alert("Failed to send the inquiry. Please try again.");
      console.error("EmailJS Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#080808] min-h-screen text-white flex flex-col selection:bg-[#E5D3B3] selection:text-black">
      <Affirmation show={isSubmitted} />
      <Header />
      
      <section className="flex-grow pt-80 pb-32 px-6 md:px-12 w-full max-w-[1400px] mx-auto overflow-hidden">
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
            className="bg-zinc-900/20 p-8 md:p-12 rounded-3xl border border-white/5 backdrop-blur-xl"
          >
            {/* Added ref={formRef} here so EmailJS can read the inputs */}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-12">
              <div className="flex flex-col space-y-4">
                <label className="text-[10px] uppercase tracking-[0.4em] text-[#E5D3B3]">Full Name</label>
                <input required name="user_name" type="text" className="bg-transparent border-b border-white/10 py-3 outline-none focus:border-[#E5D3B3] transition-colors text-xl" placeholder="Your full name" />
              </div>
              <div className="flex flex-col space-y-4">
                <label className="text-[10px] uppercase tracking-[0.4em] text-[#E5D3B3]">Email Address</label>
                <input required name="user_email" type="email" className="bg-transparent border-b border-white/10 py-3 outline-none focus:border-[#E5D3B3] transition-colors text-xl" placeholder="xyz@brand.com OR xyz@gmail.com" />
              </div>
              <div className="flex flex-col space-y-4">
                <label className="text-[10px] uppercase tracking-[0.4em] text-[#E5D3B3]">Message</label>
                <textarea required name="message" rows={4} className="bg-transparent border-b border-white/10 py-3 outline-none focus:border-[#E5D3B3] transition-colors text-xl resize-none" placeholder="How can we help you? Start with introducing your project or idea." />
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