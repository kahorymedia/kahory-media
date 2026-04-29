"use client";
import { siteData } from "@/data/content";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

// --- SUB-COMPONENT: ROLLING NUMBER ---
function RollingNumber({ value }: { value: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  
  const numericValue = parseInt(value.replace(/\D/g, ""));
  const suffix = value.replace(/[0-9]/g, "");

  const count = useMotionValue(0);
  
  const springValue = useSpring(count, {
    stiffness: 40, damping: 20, restDelta: 0.001
  });

  const displayValue = useTransform(springValue, (latest) => Math.floor(latest));

  useEffect(() => {
    if (isInView) count.set(numericValue);
    else count.set(0);
  }, [isInView, numericValue, count]);

  return (
    <motion.div ref={ref} className="flex items-baseline text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-none text-white drop-shadow-lg">
      <motion.span>{displayValue}</motion.span>
      <span className="text-[#E5D3B3]">{suffix}</span>
    </motion.div>
  );
}

// --- MAIN COMPONENT: BENTO GRID ---
export default function BentoAbout() {
  const container = useRef(null);
  const words = siteData.about.description.split(" ");

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 80%", "end 40%"]
  });

  // 32 bars for the Cinematic Equalizer
  const WAVE_BARS = 32;

  return (
    <section id="about" ref={container} className="w-full py-20 md:py-32 px-6 md:px-12 bg-black flex justify-center min-h-screen items-center">
      <div className="w-full max-w-[1200px] flex flex-col gap-6">
        
        {/* Section Header */}
        <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-[#E5D3B3] font-bold block mb-4 md:mb-8 text-center md:text-left">
          {siteData.about.title}
        </span>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6 auto-rows-fr">
          
          {/* ==========================================
              BOX 1: THE STORY (LEFT SIDE - BIG RECTANGLE)
              ========================================== */}
          <motion.div 
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="lg:col-span-3 lg:row-span-2 relative overflow-hidden rounded-[2rem] bg-white/[0.02] border border-white/5 p-8 md:p-12 group transition-colors duration-500 hover:border-white/15 hover:bg-white/[0.04]"
          >
            {/* Background Glow that activates on hover */}
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#E61919] rounded-full blur-[100px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none will-change-transform transform-gpu" />

            <div className="relative z-10 flex flex-col justify-center h-full">
              <p className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tighter leading-[1.15] flex flex-wrap gap-x-2 md:gap-x-3 gap-y-2">
                {words.map((word, i) => {
                  const start = i / words.length;
                  const end = start + (1 / words.length);
                  
                  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
                  const color = useTransform(scrollYProgress, [start, end], ["#555555", "#ffffff"]);
                  
                  return (
                    <motion.span key={i} style={{ opacity, color }} className="text-white drop-shadow-sm">
                      {word}
                    </motion.span>
                  );
                })}
              </p>
            </div>
          </motion.div>

          {/* ==========================================
              BOX 2: THE NUMBERS (TOP RIGHT)
              ========================================== */}
          <motion.div 
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="lg:col-span-2 relative overflow-hidden rounded-[2rem] bg-white/[0.02] border border-white/5 p-8 group transition-colors duration-500 hover:border-[#E5D3B3]/30 hover:bg-white/[0.04] min-h-[300px]"
          >
            {/* Hover Spotlight */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E5D3B3] rounded-full blur-[80px] opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none will-change-transform transform-gpu" />

            <div className="relative z-10 h-full flex flex-col justify-between gap-8">
              <div className="grid grid-cols-2 gap-8 w-full h-full items-center">
                {siteData.stats.map((stat, i) => (
                  <div key={i} className="flex flex-col gap-2 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                    <RollingNumber value={stat.value} />
                    <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-white/40 font-black group-hover:text-white/70 transition-colors duration-500">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ==========================================
              BOX 3: THE PHILOSOPHY (BOTTOM RIGHT)
              ========================================== */}
          <motion.div 
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="lg:col-span-2 relative overflow-hidden rounded-[2rem] bg-white/[0.02] border border-white/5 p-8 group transition-colors duration-500 hover:border-[#E61919]/30 hover:bg-white/[0.04] min-h-[250px] flex flex-col justify-end"
          >
            
            {/* OPTION 3: CINEMATIC FREQUENCY WAVEFORM */}
            <div className="absolute bottom-0 left-0 w-full h-[65%] flex items-end justify-between px-6 pb-0 opacity-40 group-hover:opacity-100 transition-opacity duration-700 z-0 pointer-events-none">
              {[...Array(WAVE_BARS)].map((_, i) => {
                // Determine the "Band of Retention" (The center bars)
                const isCenter = i >= 11 && i <= 20;
                
                // Dormant colors are grey. On hover, the center explodes into Maroon & Gold
                const colorClass = isCenter 
                  ? (i % 2 === 0 ? "bg-white/10 group-hover:bg-[#E5D3B3] group-hover:shadow-[0_0_15px_#E5D3B3]" : "bg-white/10 group-hover:bg-[#E61919] group-hover:shadow-[0_0_15px_#E61919]") 
                  : "bg-white/10 group-hover:bg-white/20";
                
                // Create deterministic pseudo-random values to avoid hydration errors
                const duration = 0.8 + (i % 4) * 0.2; // Rhythms of 0.8s, 1.0s, 1.2s, 1.4s
                const delay = (i % 5) * -0.25; // Staggered start times
                
                // Mathematically scale the base heights so the edges are short and the center is tall
                const centerFactor = 1 - Math.abs((WAVE_BARS / 2) - i) / (WAVE_BARS / 2); 
                const baseHeight = 20 + centerFactor * 50; // Ranges from 20% to 70% tall
                
                return (
                  <div 
                    key={i} 
                    className={`eq-bar w-[3px] sm:w-1 md:w-1.5 rounded-t-sm transition-colors duration-700 ${colorClass}`}
                    style={{ 
                      height: `${baseHeight}%`, 
                      '--duration': `${duration}s`, 
                      '--delay': `${delay}s` 
                    } as React.CSSProperties}
                  />
                );
              })}
            </div>

            {/* Gradient Overlay to ensure text readability when the wave spikes */}
            <div className="absolute inset-x-0 bottom-0 h-[80%] bg-gradient-to-t from-black/80 via-black/40 to-transparent z-0 pointer-events-none transition-opacity duration-500" />

            {/* CONTENT: Razor crisp text that brightens on hover */}
            <div className="relative z-10 transition-all duration-500 transform group-hover:-translate-y-1">
              <h3 className="text-xl md:text-2xl font-bold text-white/60 group-hover:text-white tracking-tighter mb-2 transition-colors duration-500 drop-shadow-md">
                Attention is cheap. <br/>
                <span className="text-[#E61919]/70 group-hover:text-[#E61919] transition-colors duration-500">Retention is priceless.</span>
              </h3>
              <p className="text-white/40 group-hover:text-white/80 text-xs md:text-sm leading-relaxed max-w-[280px] transition-colors duration-500 drop-shadow-md">
                We build cinematic pipelines designed to turn passive scrollers into absolute loyalists for your brand.
              </p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Global CSS for the Equalizer physics */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes eq-idle {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(0.8); }
        }
        @keyframes eq-active {
          0%, 100% { transform: scaleY(0.6); }
          50% { transform: scaleY(1.5); }
        }
        .eq-bar {
          transform-origin: bottom;
          will-change: transform;
          animation: eq-idle var(--duration) ease-in-out infinite var(--delay);
        }
        .group:hover .eq-bar {
          animation: eq-active var(--duration) ease-in-out infinite var(--delay);
        }
      `}} />
    </section>
  );
}