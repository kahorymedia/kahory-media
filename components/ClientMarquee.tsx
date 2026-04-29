"use client";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useRef, useState } from "react";

export default function ClientMarquee() {
  const clients = ["Fitness Brand", "F&B Company", "Lifestyle Co.", "Tech Startup", "Infotainment", "Agency Partner"];
  
  // We duplicate it enough times so the loop never breaks
  const duplicatedClients = [...clients, ...clients, ...clients, ...clients];
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  
  // Custom scroll logic for smooth deceleration
  // 1.5 is the base speed. Adjust this number to make the base scroll faster/slower.
  const baseVelocity = -0.5; 
  const velocityFactor = useRef(baseVelocity);

  useAnimationFrame(() => {
    if (!containerRef.current) return;

    // Smoothly interpolate the speed
    // If hovered, target speed is 0. If not hovered, target speed is baseVelocity.
    const targetVelocity = isHovered ? 0 : baseVelocity;
    
    // 0.05 is the "damping" factor. A lower number makes the stop/start smoother and slower.
    velocityFactor.current += (targetVelocity - velocityFactor.current) * 0.04;

    let moveBy = velocityFactor.current;
    
    // Get the current position
    let currentX = x.get();
    currentX += moveBy;

    // INFINITE LOOP LOGIC:
    // When the container has scrolled exactly 50% of its width, snap it back to 0.
    // Because the content is duplicated, the user will never see the snap.
    const containerWidth = containerRef.current.scrollWidth;
    if (currentX <= -(containerWidth / 2)) {
      currentX = 0;
    }

    x.set(currentX);
  });

  return (
    <section 
      className="w-full py-20 bg-black overflow-hidden flex flex-col items-center relative border-y border-white/5"
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
              className="group/item flex items-center justify-center min-w-[150px] transition-transform duration-700 hover:scale-[1.3] px-4 cursor-default"
            >
              {/* FIX: pointer-events-none stops the cursor from glitching/expanding over the text */}
              {/* FIX: Custom text-shadow replaces drop-shadow to fix the boxy glow */}
              <span className="text-white/30 group-hover/item:text-white transition-all duration-700 text-xl md:text-3xl font-bold uppercase tracking-[0.2em] pointer-events-none [text-shadow:0_0_0_transparent] group-hover/item:[text-shadow:0_0_20px_rgba(255,255,255,0.8)]">
                {client}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}