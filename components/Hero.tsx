"use client";
import { siteData } from "@/data/content";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import DotField from "./DotField"; 

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();

  // We create TWO parallax tracks: A massive one for PC, and a tiny one for Mobile
  const yParallaxDesktop = useTransform(scrollY, [0, 1000], [0, -300]);
  const yParallaxMobile = useTransform(scrollY, [0, 1000], [0, -30]); 
  
  const dotOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Securely check if the user is on a phone to prevent layout breaking
  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <section className="relative min-h-[85vh] md:min-h-screen w-full flex justify-center items-center overflow-hidden bg-black px-6 md:px-12 pt-32 pb-12 md:py-32">
      
      <motion.div style={{ opacity: dotOpacity }} className="absolute inset-0 z-0">
        <DotField />
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </motion.div>

      <div className="relative flex flex-col md:flex-row items-center justify-between w-full max-w-[1200px] z-10 gap-8 md:gap-16 pointer-events-none mt-4 md:mt-0">
        
        <div className="flex flex-col space-y-6 md:space-y-8 pointer-events-auto w-full z-20">
          <div className="flex flex-col">
            <motion.h1 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[14vw] sm:text-[10vw] md:text-[clamp(3.5rem,8vw,6rem)] font-bold tracking-tighter leading-[0.85] uppercase text-white"
            >
              Stop<br />
              <span className="italic font-serif font-light lowercase tracking-tighter text-[#E5D3B3]">posting.</span>
            </motion.h1>
            <motion.h1 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[14vw] sm:text-[10vw] md:text-[clamp(3.5rem,8vw,6rem)] font-bold tracking-tighter leading-[0.85] uppercase text-white mt-1 md:mt-2"
            >
              Start<br />
              <span>Converting.</span>
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-[13px] sm:text-sm md:text-[17px] text-white/50 max-w-[280px] md:max-w-md font-light leading-relaxed"
          >
            No more cookie-cutter content. We shoot, shape, and scale your brand's story through high-end production and real media strategy.
          </motion.p>
        </div>

        <motion.div 
          style={{ y: isMobile ? yParallaxMobile : yParallaxDesktop }} 
          className="flex-1 flex justify-center md:justify-end w-full relative z-10 mt-6 md:mt-0"
        >
          <img 
            src="/kahory media icon png 3-d.png" 
            alt="Kahory Icon" 
            className="w-full max-w-[70%] sm:max-w-[60%] md:max-w-[80%] lg:max-w-[800px] h-auto drop-shadow-[0_0_150px_rgba(74,14,27,0.4)] select-none pointer-events-none"
            draggable="false"
          />
        </motion.div>

        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="absolute -top-8 right-0 md:-bottom-24 md:left-0 md:top-auto w-16 h-16 md:w-20 md:h-20 flex items-center justify-center opacity-60 z-20 pointer-events-none"
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

        <div className="absolute -bottom-32 left-0 hidden md:flex items-center gap-4 opacity-10">
           <div className="w-16 h-[1px] bg-white" />
           <span className="text-[10px] uppercase tracking-[1em] text-white">Agency 2026</span>
        </div>

        <div className="hidden sm:flex absolute -top-10 right-0 items-center gap-3 opacity-60 z-20">
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