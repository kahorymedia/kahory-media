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
  const blurValue = useTransform(springValue, [0, numericValue * 0.5, numericValue], ["blur(0px)", "blur(4px)", "blur(0px)"]);

  useEffect(() => {
    if (isInView) count.set(numericValue);
    else count.set(0);
  }, [isInView, numericValue, count]);

  return (
    <motion.div ref={ref} className="flex items-baseline text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-none text-white drop-shadow-lg">
      <motion.span style={{ filter: blurValue }}>
        <motion.span>{displayValue}</motion.span>
      </motion.span>
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
                  <div key={i} className="flex flex-col gap-2">
                    <RollingNumber value={stat.value} />
                    <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-white/40 font-black">
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
            {/* Abstract SVG Pipeline Animation */}
            <svg 
              className="absolute inset-0 w-full h-full opacity-20 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none scale-110" 
              viewBox="0 0 400 300" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path 
                d="M-50,250 C100,250 150,50 250,50 C300,50 350,150 450,150" 
                stroke="url(#redGlow)" 
                strokeWidth="2" 
                strokeDasharray="20 10" 
                className="animate-[dash_10s_linear_infinite] group-hover:animate-[dash_3s_linear_infinite]" 
              />
              <motion.path 
                d="M-50,200 C50,200 100,100 200,100 C300,100 300,250 450,250" 
                stroke="url(#goldGlow)" 
                strokeWidth="1.5" 
                strokeDasharray="15 15" 
                className="animate-[dash_15s_linear_infinite_reverse] group-hover:animate-[dash_5s_linear_infinite_reverse]" 
              />
              <defs>
                <linearGradient id="redGlow" x1="0" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#E61919" stopOpacity="0" />
                  <stop offset="0.5" stopColor="#E61919" />
                  <stop offset="1" stopColor="#E61919" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="goldGlow" x1="0" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#E5D3B3" stopOpacity="0" />
                  <stop offset="0.5" stopColor="#E5D3B3" />
                  <stop offset="1" stopColor="#E5D3B3" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            {/* Content that comes into focus on hover */}
            <div className="relative z-10 filter blur-[1px] group-hover:blur-0 transition-all duration-500 transform group-hover:-translate-y-1">
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tighter mb-2">
                Attention is cheap. <br/>
                <span className="text-[#E61919]">Retention is priceless.</span>
              </h3>
              <p className="text-white/50 text-xs md:text-sm leading-relaxed max-w-sm">
                We build cinematic pipelines designed to turn passive scrollers into absolute loyalists for your brand.
              </p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Global CSS for the custom SVG dash animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
          to { stroke-dashoffset: -100; }
        }
      `}} />
    </section>
  );
}