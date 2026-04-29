"use client";
import { siteData } from "@/data/content";
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import DotField from "./DotField"; 

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();

  const yParallax = useTransform(scrollY, [0, 1000], [0, -300]);
  const dotOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    // FIX: Changed min-h-[110vh] to min-h-screen
    <section className="relative min-h-screen w-full flex justify-center items-center overflow-hidden bg-black px-6 md:px-12 py-20">
      
      {/* 1. THE INTERACTIVE DOT FIELD BACKGROUND */}
      <motion.div style={{ opacity: dotOpacity }} className="absolute inset-0 z-0">
        <DotField />
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </motion.div>

      {/* THE INNER WRAPPER: Locks max width */}
      <div className="relative flex flex-col md:flex-row items-center justify-between w-full max-w-[1200px] z-10 gap-10 pointer-events-none">
        
        <div className="flex-1 space-y-10 pointer-events-auto">
          <div className="flex flex-col">
            <motion.h1 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.5rem,8vw,6rem)] font-bold tracking-tighter leading-[0.85] uppercase text-white"
            >
              Stop<br />
              <span className="italic font-serif font-light lowercase tracking-tighter text-[#E5D3B3]">posting.</span>
            </motion.h1>
            <motion.h1 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.5rem,8vw,6rem)] font-bold tracking-tighter leading-[0.85] uppercase text-white mt-2"
            >
              Start<br />
              <span>Converting.</span>
            </motion.h1>
          </div>

          <motion.p className="text-base md:text-xl text-white/40 max-w-md font-light italic">
            "{siteData.hero.subtext}"
          </motion.p>

          <div className="flex items-center gap-8 pt-4">
            
            {/* THE TRANSPARENT SHAPE-BLUR BUTTON */}
            <GetStartedButton />

            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="w-16 h-16 md:w-20 md:h-20 relative flex items-center justify-center opacity-90"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#E5D3B3] fill-current">
                <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                <text fontSize="11" fontWeight="bold" letterSpacing="4">
                  <textPath href="#circlePath">
                    KAHORY MEDIA • EST 2026 • 
                  </textPath>
                </text>
              </svg>
              <div className="absolute w-1.5 h-1.5 bg-white rounded-full" />
            </motion.div>
          </div>
        </div>

        <motion.div 
          style={{ y: yParallax }} 
          className="flex-1 flex justify-center md:justify-end"
        >
          <img 
            src="/kahory media icon png 3-d.png" 
            alt="Kahory Icon" 
            className="w-full max-w-[600px] lg:max-w-[800px] h-auto drop-shadow-[0_0_150px_rgba(74,14,27,0.4)] select-none pointer-events-none"
          />
        </motion.div>

        {/* LOCKED ABSOLUTE ELEMENTS */}
        <div className="absolute -bottom-32 left-0 hidden md:flex items-center gap-4 opacity-10">
           <div className="w-16 h-[1px] bg-white" />
           <span className="text-[10px] uppercase tracking-[1em] text-white">Agency 2026</span>
        </div>

        <div className="absolute -top-10 right-0 flex items-center gap-3 opacity-60 z-20">
          <motion.div 
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"
          />
          <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-white">
            REC • 00:00:00
          </span>
        </div>
      </div>
    </section>
  );
}

// --- THE TRANSPARENT SHAPE BLUR BUTTON ---
function GetStartedButton() {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  function handleMouseLeave() {
    mouseX.set(-1000);
    mouseY.set(-1000);
  }

  return (
    <Link 
      href="/contact" 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative inline-flex items-center justify-center pointer-events-auto"
    >
      <motion.div
        className="absolute -inset-[4px] rounded-full opacity-0 group-hover:opacity-100 blur-[8px] transition-opacity duration-500 z-0 pointer-events-none"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              120px circle at ${mouseX}px ${mouseY}px,
              rgba(230, 25, 25, 0.8), 
              rgba(229, 211, 179, 0.4) 40%, 
              transparent 80%
            )
          `,
        }}
      />
      <motion.div
        className="absolute -inset-[1px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              80px circle at ${mouseX}px ${mouseY}px,
              rgba(230, 25, 25, 1),
              transparent 100%
            )
          `,
        }}
      />
      <div className="relative z-10 px-14 py-6 bg-transparent group-hover:bg-[#050505] border border-white/10 group-hover:border-transparent rounded-full font-black uppercase tracking-[0.4em] text-[10px] md:text-[11px] overflow-hidden transition-colors duration-500">
        <span className="relative z-20 text-white">Get Started</span>
      </div>
    </Link>
  );
}