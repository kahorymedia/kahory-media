"use client";
import { siteData } from "@/data/content";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import Link from "next/link";

// --- SUB-COMPONENT: ROLLING NUMBER ---
function RollingNumber({ value }: { value: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  const numericValue = parseInt(value.replace(/\D/g, ""));
  const suffix = value.replace(/[0-9]/g, "");

  const count = useMotionValue(0);
  const springValue = useSpring(count, { stiffness: 40, damping: 20, restDelta: 0.001 });
  const displayValue = useTransform(springValue, (latest) => Math.floor(latest));

  useEffect(() => {
    if (isInView) count.set(numericValue);
    else count.set(0);
  }, [isInView, numericValue, count]);

  return (
    <motion.div ref={ref} className="flex items-baseline text-xl sm:text-3xl md:text-4xl lg:text-6xl font-bold tracking-tighter leading-none text-white drop-shadow-lg">
      <motion.span>{displayValue}</motion.span>
      <span className="text-[#E5D3B3] text-sm md:text-[0.6em] ml-0.5">{suffix}</span>
    </motion.div>
  );
}

// --- MAIN COMPONENT: BENTO GRID ---
export default function BentoAbout() {
  const container = useRef(null);
  const textRef = useRef(null); 
  
  // ✅ Split words by paragraph to allow proper formatting
  const words1 = siteData.about.philosophy.paragraph1.split(" ");
  const words2 = siteData.about.philosophy.paragraph2.split(" ");
  const totalWords = words1.length + words2.length;

  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 85%", "end 60%"]
  });

  const WAVE_BARS = 32;

  return (
    <section id="about" ref={container} className="w-full py-20 md:py-32 px-4 md:px-12 bg-black flex justify-center min-h-screen items-center">
      <div className="w-full max-w-[1200px] flex flex-col gap-6">
        
        <h2 className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-[#E5D3B3] font-bold block mb-2 md:mb-8 text-center md:text-left">
          {siteData.about.title}
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-6 auto-rows-fr">
          
          {/* BOX 1: THE PHILOSOPHY (BIG BOX) */}
          <motion.div 
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="col-span-2 lg:col-span-3 lg:row-span-2 relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-white/[0.02] border border-white/5 p-6 md:p-12 group transition-colors duration-500 hover:border-white/15 hover:bg-white/[0.04]"
          >
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#E61919] rounded-full blur-[100px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none will-change-transform transform-gpu" />

            <div className="relative z-10 flex flex-col justify-center h-full gap-4 md:gap-6">
              <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-[1.05]">
                {siteData.about.philosophy.headingNormal} 
                <span className="text-[#E61919]">{siteData.about.philosophy.headingHighlight}</span>
              </h3>
              
              {/* ✅ Parent ref tracks the scroll for both paragraphs */}
              <div ref={textRef} className="flex flex-col gap-4 md:gap-6 text-[11px] sm:text-sm md:text-2xl font-medium tracking-tight leading-[1.6] text-white/60">
                
                {/* PARAGRAPH 1 */}
                <div className="flex flex-wrap gap-x-1.5 md:gap-x-2 gap-y-0.5 md:gap-y-1">
                  {words1.map((word, i) => {
                    const globalIndex = i;
                    const start = globalIndex / totalWords;
                    const end = start + (1 / totalWords);
                    
                    // Specific highlight targeting
                    const isGolden = 
                      word.includes("Kahory") || 
                      word.includes("kahani") || 
                      (word.includes("story") && words1[i + 1]?.includes("itself"));

                    const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
                    // Highlighted words transition from a dark gold to bright gold, others from gray to white
                    const color = useTransform(
                      scrollYProgress, 
                      [start, end], 
                      [isGolden ? "#7A6A4D" : "#555555", isGolden ? "#E5D3B3" : "#ffffff"]
                    );
                    
                    return (
                      <motion.span key={`p1-${i}`} style={{ opacity, color }} className="drop-shadow-sm">
                        {word}
                      </motion.span>
                    );
                  })}
                </div>

                {/* PARAGRAPH 2 */}
                <div className="flex flex-wrap gap-x-1.5 md:gap-x-2 gap-y-0.5 md:gap-y-1">
                  {words2.map((word, i) => {
                    const globalIndex = words1.length + i;
                    const start = globalIndex / totalWords;
                    const end = start + (1 / totalWords);
                    
                    const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
                    const color = useTransform(scrollYProgress, [start, end], ["#555555", "#ffffff"]);
                    
                    return (
                      <motion.span key={`p2-${i}`} style={{ opacity, color }} className="drop-shadow-sm">
                        {word}
                      </motion.span>
                    );
                  })}
                </div>

              </div>
            </div>
          </motion.div>

          {/* BOX 2: THE NUMBERS (SIDE-BY-SIDE WIDGET) */}
          <motion.div 
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="col-span-1 lg:col-span-2 relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-white/[0.02] border border-white/5 p-4 md:p-8 group transition-colors duration-500 hover:border-[#E5D3B3]/30 hover:bg-white/[0.04] min-h-[180px] md:min-h-[300px]"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E5D3B3] rounded-full blur-[80px] opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none will-change-transform transform-gpu" />

            <div className="relative z-10 h-full flex flex-col justify-center gap-8">
              <div className="grid grid-cols-2 gap-4 md:gap-8 w-full h-full content-center">
                {siteData.stats.map((stat, i) => (
                  <div key={i} className="flex flex-col gap-0.5 md:gap-2 opacity-70 group-hover:opacity-100 transition-opacity duration-500 items-center text-center md:items-start md:text-left">
                    <RollingNumber value={stat.value} />
                    <span className="text-[7px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.4em] text-white/40 font-black group-hover:text-white/70 transition-colors duration-500">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* BOX 3: THE APPROACH (SIDE-BY-SIDE WIDGET) */}
          <motion.div 
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="col-span-1 lg:col-span-2 relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-white/[0.02] border border-white/5 p-4 md:p-8 group transition-colors duration-500 hover:border-[#E61919]/30 hover:bg-white/[0.04] min-h-[180px] md:min-h-[250px] flex flex-col justify-center md:justify-end"
          >
            <div className="absolute bottom-0 left-0 w-full h-[50%] md:h-[65%] flex items-end justify-between px-3 md:px-6 pb-0 opacity-40 group-hover:opacity-100 transition-opacity duration-700 z-0 pointer-events-none">
              {[...Array(WAVE_BARS)].map((_, i) => {
                const isCenter = i >= 11 && i <= 20;
                const colorClass = isCenter 
                  ? (i % 2 === 0 ? "bg-white/10 group-hover:bg-[#E5D3B3] group-hover:shadow-[0_0_15px_#E5D3B3]" : "bg-white/10 group-hover:bg-[#E61919] group-hover:shadow-[0_0_15px_#E61919]") 
                  : "bg-white/10 group-hover:bg-white/20";
                
                const duration = 0.8 + (i % 4) * 0.2; 
                const delay = (i % 5) * -0.25; 
                const centerFactor = 1 - Math.abs((WAVE_BARS / 2) - i) / (WAVE_BARS / 2); 
                const baseHeight = 20 + centerFactor * 50; 
                
                return (
                  <div 
                    key={i} 
                    className={`eq-bar w-[2px] sm:w-[3px] md:w-1.5 rounded-t-sm transition-colors duration-700 ${colorClass}`}
                    style={{ 
                      height: `${baseHeight}%`, 
                      '--duration': `${duration}s`, 
                      '--delay': `${delay}s` 
                    } as React.CSSProperties}
                  />
                );
              })}
            </div>

            <div className="absolute inset-x-0 bottom-0 h-[90%] md:h-[80%] bg-gradient-to-t from-black/95 via-black/70 to-transparent z-0 pointer-events-none transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col justify-center items-center text-center md:items-start md:text-left h-full transition-all duration-500 transform group-hover:-translate-y-1">
              <h3 className="text-[11px] sm:text-xs md:text-2xl font-bold text-white/60 group-hover:text-white tracking-tighter mb-1.5 md:mb-2 transition-colors duration-500 drop-shadow-md">
                Meaningful stories <br className="hidden md:block" />
                <span className="text-[#E61919]/70 group-hover:text-[#E61919] transition-colors duration-500 md:block"> that stay with people.</span>
              </h3>
              
              <p className="block text-white/50 group-hover:text-white/90 text-[7px] sm:text-[8px] md:text-sm leading-relaxed max-w-[320px] transition-colors duration-500 drop-shadow-md line-clamp-3 md:line-clamp-none">
                {siteData.about.description}
              </p>
              
              <div className="mt-2 md:mt-4 flex">
                <Link href="/services/short-form" className="inline-flex items-center gap-1 md:gap-2 text-[7px] md:text-xs text-[#E5D3B3] hover:text-white transition-colors font-bold uppercase tracking-widest border-b border-transparent hover:border-white pb-0.5">
                  Explore <span className="hidden sm:inline">Short-Form</span>
                  <svg className="w-2 h-2 md:w-3 md:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

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