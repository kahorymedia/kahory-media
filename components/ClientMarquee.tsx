"use client";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useRef, useState } from "react";

export default function ClientMarquee() {
  // 1. UPDATE THESE PATHS ONCE YOU ADD YOUR LOGOS TO THE PUBLIC FOLDER
  // Ensure the logos are high-quality PNGs with transparent backgrounds!
  const clients = [
    { name: "Brand One", src: "/clients/logo1.png" },
    { name: "Brand Two", src: "/clients/logo2.png" },
    { name: "Brand Three", src: "/clients/logo3.png" },
    { name: "Brand Four", src: "/clients/logo4.png" }
  ];
  
  // 2. We duplicate it 6 times to ensure it never breaks on ultrawide monitors.
  const duplicatedClients = [...clients, ...clients, ...clients, ...clients, ...clients, ...clients];
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  
  const baseVelocity = -0.85; 
  const velocityFactor = useRef(baseVelocity);

  useAnimationFrame(() => {
    if (!containerRef.current) return;

    const targetVelocity = isHovered ? 0 : baseVelocity;
    
    velocityFactor.current += (targetVelocity - velocityFactor.current) * 0.04;

    let moveBy = velocityFactor.current;
    let currentX = x.get();
    currentX += moveBy;

    const containerWidth = containerRef.current.scrollWidth;
    if (currentX <= -(containerWidth / 2)) {
      currentX = 0;
    }

    x.set(currentX);
  });

  return (
    // FIX: Removed py-20 so it adheres to the global Unified Scaling padding
    <section 
      className="w-full bg-black overflow-hidden flex flex-col items-center relative border-y border-white/5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* Context Header */}
      <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/40 mb-12 font-bold text-center z-20 pointer-events-none">
        Trusted by ambitious brands
      </p>

      {/* Left & Right Gradient Fade Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Marquee Track Container */}
      <div className="w-full flex overflow-hidden">
        <motion.div 
          ref={containerRef}
          style={{ x }}
          className="flex whitespace-nowrap gap-16 md:gap-32 w-max items-center py-6 pointer-events-auto"
        >
          {duplicatedClients.map((client, index) => (
            <div 
              key={index} 
              // EXACT ORIGINAL BEHAVIOR: scale-[1.3] on hover
              className="group/item flex items-center justify-center min-w-[150px] transition-transform duration-700 hover:scale-[1.3] px-4 cursor-default"
            >
              {/* IMAGE REPLACES TEXT */}
              <img 
                src={client.src} 
                alt={client.name} 
                // EXACT ORIGINAL BEHAVIOR: opacity-30 default, full opacity and glow on hover
                className="h-8 md:h-12 w-auto object-contain opacity-30 transition-all duration-700 group-hover/item:opacity-100 group-hover/item:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] pointer-events-none"
                draggable="false"
              />
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}