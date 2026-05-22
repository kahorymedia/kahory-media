"use client";
import { siteData } from "@/data/content";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import Link from "next/link";

// --- SUB-COMPONENT: ROLLING NUMBER ---
function RollingNumber({ value }: { value: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  // Clean the number and suffix
  const numericValue = parseInt(value.replace(/\D/g, ""));
  const suffix = value.replace(/[0-9]/g, "");

  return (
    <div ref={ref} className="flex items-baseline text-3xl lg:text-5xl font-bold tracking-tighter leading-none text-white">
      {isInView ? (
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{numericValue}</motion.span>
      ) : (
        <span>0</span>
      )}
      <span className="text-[#E5D3B3]">{suffix}</span>
    </div>
  );
}

// --- MAIN COMPONENT: BENTO GRID ---
export default function BentoAbout() {
  const containerRef = useRef(null);
  const textRef = useRef(null); 
  
  // Animation text logic
  const philosophyText = `${siteData.about.philosophy.paragraph1} ${siteData.about.philosophy.paragraph2}`;
  const words = philosophyText.split(" ");

  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 70%", "end 30%"]
  });

  const WAVE_BARS = 32;

  return (
    <section id="about" ref={containerRef} className="w-full py-20 md:py-32 px-6 md:px-12 bg-black flex justify-center">
      <div className="w-full max-w-[1200px] flex flex-col gap-8">
        
        <h2 className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-[#E5D3B3] font-bold text-center md:text-left">
          {siteData.about.title}
        </h2>

        {/* ✅ FIXED GRID: Stacked on mobile, bento layout on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          
          {/* BOX 1: THE PHILOSOPHY (BIG BOX) */}
          <motion.div 
            className="col-span-1 md:col-span-2 lg:col-span-3 lg:row-span-2 relative overflow-hidden rounded-[2rem] bg-white/[0.02] border border-white/5 p-8 md:p-12"
          >
            <div className="relative z-10 flex flex-col gap-6 h-full">
              {/* Heading */}
              <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tighter">
                {siteData.about.philosophy.headingNormal} 
                <span className="text-[#E61919]">{siteData.about.philosophy.headingHighlight}</span>
              </h3>
              
              {/* Animated Paragraphs */}
              <div ref={textRef} className="text-lg md:text-xl font-medium leading-[1.6] text-white/60">
                {words.map((word, i) => {
                  const start = i / words.length;
                  const end = start + (1 / words.length);
                  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
                  const color = useTransform(scrollYProgress, [start, end], ["#555555", "#ffffff"]);
                  
                  return (
                    <motion.span key={i} style={{ opacity, color }} className="mr-2 inline-block">
                      {word}
                    </motion.span>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* BOX 2: THE NUMBERS */}
          <motion.div className="col-span-1 md:col-span-1 lg:col-span-2 rounded-[2rem] bg-white/[0.02] border border-white/5 p-8 flex flex-col justify-center gap-6">
            <div className="grid grid-cols-2 gap-6">
              {siteData.stats.map((stat, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <RollingNumber value={stat.value} />
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/50 font-bold">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* BOX 3: THE APPROACH */}
          <motion.div className="col-span-1 md:col-span-1 lg:col-span-2 relative overflow-hidden rounded-[2rem] bg-white/[0.02] border border-white/5 p-8 flex flex-col justify-end min-h-[250px] group">
            {/* Audio Waves */}
            <div className="absolute bottom-0 left-0 w-full h-[40%] flex items-end justify-between px-6 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
              {[...Array(WAVE_BARS)].map((_, i) => (
                <div key={i} className="w-1 bg-white/20 group-hover:bg-[#E61919] rounded-t-sm" style={{ height: `${20 + (i%3)*40}%`, animation: `eq 1s infinite alternate` }} />
              ))}
            </div>
            
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-2">Meaningful stories <br/><span className="text-[#E61919]">that stay with people.</span></h3>
              <p className="text-xs text-white/50 leading-relaxed max-w-[280px] mb-4">{siteData.about.description}</p>
              <Link href="/services/short-form" className="text-[10px] text-[#E5D3B3] font-bold uppercase tracking-widest border-b border-transparent hover:border-white">
                Explore Short-Form Production
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
      <style jsx global>{`
        @keyframes eq { 0% { transform: scaleY(0.5); } 100% { transform: scaleY(1); } }
      `}</style>
    </section>
  );
}