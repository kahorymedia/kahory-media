"use client";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useRef, useState } from "react";

export default function ClientMarquee() {
  const clients = [
    { name: "Brand One", src: "/clients/logo1.png" },
    { name: "Brand Two", src: "/clients/logo2.png" },
    { name: "Brand Three", src: "/clients/logo3.png" },
    { name: "Brand Four", src: "/clients/logo4.png" },
    { name: "Brand Five", src: "/clients/logo5.png" },
    { name: "Brand Six", src: "/clients/logo6.png" } // Added sixth logo
  ];
  
  // This duplication strategy ensures the loop stays seamless regardless of logo count
  const duplicatedClients = [...clients, ...clients, ...clients, ...clients];
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const baseVelocity = -0.65; 
  const velocityFactor = useRef(baseVelocity);

  useAnimationFrame(() => {
    if (!containerRef.current) return;

    const targetVelocity = isHovered ? 0 : baseVelocity;
    velocityFactor.current += (targetVelocity - velocityFactor.current) * 0.04;

    let moveBy = velocityFactor.current;
    let currentX = x.get();
    currentX += moveBy;

    // containerWidth will now correctly account for the 6 logos
    const containerWidth = containerRef.current.scrollWidth;
    
    // The reset logic remains valid as it relies on the dynamic width
    if (currentX <= -(containerWidth / 2)) {
      currentX = 0;
    }

    x.set(currentX);
  });

  return (
    <section 
      className="w-full bg-black overflow-hidden flex flex-col items-center relative border-y border-white/5 !py-10 md:!py-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/40 mb-6 md:mb-12 font-bold text-center z-20 pointer-events-none">
        Trusted by ambitious brands
      </p>

      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div className="w-full flex overflow-hidden">
        <motion.div 
          ref={containerRef}
          style={{ x }}
          className="flex whitespace-nowrap gap-16 md:gap-32 w-max items-center py-2 md:py-6 pointer-events-auto will-change-transform"
        >
          {duplicatedClients.map((client, index) => (
            <div 
              key={index} 
              className="group/item flex items-center justify-center min-w-[100px] md:min-w-[200px] transition-transform duration-700 hover:scale-[1.3] px-4 cursor-default will-change-transform"
            >
              <img 
                src={client.src} 
                alt={client.name} 
                draggable="false"
                decoding="async"
                className="h-12 sm:h-16 md:h-24 w-auto object-contain opacity-50 transition-all duration-700 group-hover/item:opacity-100 group-hover/item:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] pointer-events-none"
              />
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}