"use client";
import { siteData } from "@/data/content";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Work() {
  return (
    <section id="work" className="w-full bg-black flex justify-center overflow-hidden py-16 md:py-24">
      <div className="w-full max-w-[1200px]">
        
        {/* HEADER - Tightened spacing */}
        <div className="mb-8 px-6 md:px-0">
          <span className="text-[10px] uppercase tracking-[0.5em] text-[#E5D3B3] font-bold block mb-2">
            Selected Work
          </span>
          <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-bold tracking-tighter text-white leading-[1.1]">
            High-Converting <br className="hidden sm:block" />
            <span className="text-white/40 italic font-serif font-light">Narratives.</span>
          </h2>
        </div>

        {/* Mobile Swipe Indicator */}
        <div className="w-full md:hidden px-6 mb-6 flex items-center gap-2 opacity-60">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E5D3B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          <span className="text-[#E5D3B3] text-[9px] uppercase tracking-widest font-bold">Swipe to watch</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E5D3B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>

        {/* The Reel Grid - Added 'scroll-container' class for scoped scrollbar fix */}
        <div 
          className="scroll-container flex md:grid overflow-x-auto overflow-y-hidden touch-pan-x snap-x snap-mandatory md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-6 md:px-0"
        >
          <style dangerouslySetInnerHTML={{__html: `
            .scroll-container::-webkit-scrollbar { display: none; }
            .scroll-container { -ms-overflow-style: none; scrollbar-width: none; }
          `}} />

          {siteData.work.reels.map((project, i) => (
            <motion.a
              key={project.id} href={project.instaLink} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="min-w-[55vw] sm:min-w-[40vw] md:min-w-0 snap-center shrink-0 group relative block aspect-[9/16] rounded-[1.5rem] md:rounded-2xl overflow-hidden bg-zinc-900 border border-white/10"
            >
              <video 
                src={project.videoSrc} autoPlay loop muted playsInline 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-5 md:p-6 pointer-events-none">
                <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-[#E5D3B3] font-bold mb-1">
                  {project.client}
                </span>
                <h3 className="text-[16px] md:text-xl font-bold text-white tracking-tighter">
                  {project.title}
                </h3>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA SECTION - Tighter Layout */}
        <div className="mt-12 md:mt-16 flex flex-col items-center gap-4">
          
          <Link href="/work" className="group relative inline-block">
            <div className="px-8 py-4 border border-white/20 text-white rounded-full font-black uppercase tracking-[0.4em] text-[9px] md:text-[10px] overflow-hidden relative">
              <span className="relative z-10 group-hover:text-black transition-colors duration-500">Explore Case Studies</span>
              <motion.div whileHover={{ top: 0 }} className="absolute -top-full left-0 w-full h-full bg-white z-0 transition-all duration-500" />
            </div>
          </Link>

          <a href={siteData.work.driveLink} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white text-[9px] md:text-[10px] uppercase tracking-[0.4em] underline underline-offset-4 transition-all duration-300">
            View Raw Content Archive
          </a>
        </div>

      </div>
    </section>
  );
}