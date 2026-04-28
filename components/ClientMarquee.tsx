"use client";
import { motion } from "framer-motion";

export default function ClientMarquee() {
  // Replace these text strings with your image paths later!
  // Example: "/logos/brand1.png"
  const clients = [
    "Fitness Brand", 
    "F&B Company", 
    "Lifestyle Co.", 
    "Tech Startup", 
    "Infotainment",
    "Agency Partner"
  ];

  // We duplicate the array so the scroll loop is perfectly seamless
  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="w-full py-16 md:py-24 bg-black overflow-hidden flex items-center relative border-y border-white/5 pointer-events-none">
      
      {/* Left & Right Gradient Fades for that premium look */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

      <motion.div
        className="flex whitespace-nowrap gap-16 md:gap-32 w-max"
        // Moves the div from 0 to -50% of its total width, then instantly snaps back to 0
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30, // Increase this number to slow it down, decrease to speed up
        }}
      >
        {duplicatedClients.map((client, index) => (
          <div 
            key={index} 
            className="flex items-center justify-center min-w-[150px]"
          >
            {/* WHEN YOU HAVE LOGOS:
              Replace the <span> below with an <img> tag like this:
              <img src={client} alt="Client Logo" className="h-12 w-auto object-contain" />
            */}
            <span className="text-white/30 text-xl md:text-2xl font-bold uppercase tracking-[0.2em]">
              {client}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}