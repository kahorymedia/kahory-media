"use client";
import { siteData } from "@/data/content";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();

  // Parallax for the icon
  const yParallax = useTransform(scrollY, [0, 1000], [0, -300]);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <section className="relative min-h-[110vh] w-full flex items-center overflow-hidden bg-black px-6 md:px-12 py-20">
      
      {/* SMOOTH BLENDED GRADIENT BOX */}
      <div className="absolute inset-0 z-0">
        <div className="hero-glow-mask absolute inset-0 w-full h-full opacity-60" />
        <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-black via-black/80 to-transparent z-[1]" />
      </div>

      <div className="relative flex flex-col md:flex-row items-center justify-between w-full z-10 gap-10">
        
        {/* Left Side: Refined Typography */}
        <div className="flex-1 space-y-10">
          <div className="flex flex-col">
            <motion.h1 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-8xl font-bold tracking-tighter leading-[0.85] uppercase text-white"
            >
              Stop<br />
              <span className="italic font-serif font-light lowercase tracking-tighter text-[#E5D3B3]">posting.</span>
            </motion.h1>
            <motion.h1 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-8xl font-bold tracking-tighter leading-[0.85] uppercase text-white mt-2"
            >
              Start<br />
              <span>Converting.</span>
            </motion.h1>
          </div>

          <motion.p className="text-base md:text-xl text-white/40 max-w-md font-light italic">
            "{siteData.hero.subtext}"
          </motion.p>

          <Link href="/contact" className="group relative inline-block">
            <motion.div className="px-12 py-5 border border-white/10 text-white rounded-full font-black uppercase tracking-[0.4em] text-[9px] overflow-hidden relative">
              <span className="relative z-10 group-hover:text-black transition-colors duration-500">Get Started</span>
              <motion.div 
                whileHover={{ top: 0 }}
                className="absolute top-full left-0 w-full h-full bg-white z-0 transition-all duration-500" 
              />
            </motion.div>
          </Link>
        </div>

        {/* Right Side: MASSIVE 3D ICON */}
        <motion.div 
          style={{ y: yParallax }} 
          className="flex-1 flex justify-center md:justify-end"
        >
          <img 
            src="/kahory media icon png 3-d.png" 
            alt="Kahory Icon" 
            className="w-full max-w-[600px] lg:max-w-[1000px] h-auto drop-shadow-[0_0_150px_rgba(74,14,27,0.4)] select-none pointer-events-none"
          />
        </motion.div>
      </div>

      {/* Aesthetic Bottom Info */}
      <div className="absolute bottom-10 left-12 hidden md:flex items-center gap-4 opacity-10">
         <div className="w-16 h-[1px] bg-white" />
         <span className="text-[10px] uppercase tracking-[1em] text-white">Agency 2026</span>
      </div>
    </section>
  );
}