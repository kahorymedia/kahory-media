"use client";
import { motion } from "framer-motion";

export default function ClientMarquee() {
  const clients = ["Fitness Brand", "F&B Company", "Lifestyle Co.", "Tech Startup", "Infotainment", "Agency Partner"];
  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="w-full py-20 bg-black overflow-hidden flex flex-col items-center relative border-y border-white/5 pointer-events-none">
      
      {/* NEW: The context header */}
      <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/40 mb-12 font-bold text-center z-20">
        Trusted by ambitious brands
      </p>

      {/* Left & Right Gradient Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

      <motion.div
        className="flex whitespace-nowrap gap-16 md:gap-32 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
      >
        {duplicatedClients.map((client, index) => (
          <div key={index} className="flex items-center justify-center min-w-[150px]">
            <span className="text-white/30 text-xl md:text-2xl font-bold uppercase tracking-[0.2em]">
              {client}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}