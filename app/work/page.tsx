"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Footer from "@/components/Footer";
import { workData, categories } from "@/data/work";

export default function WorkArchivePage() {
  const [activeFilter, setActiveFilter] = useState("All");

  // Filter the data based on the selected category
  const filteredWork = activeFilter === "All" 
    ? workData 
    : workData.filter((item) => item.category === activeFilter);

  return (
    <main className="flex flex-col min-h-screen bg-black overflow-hidden relative">

      {/* NEW: MINIMAL TOP NAVIGATION */}
      <header className="absolute top-0 left-0 w-full p-6 md:px-12 md:py-8 z-50 flex items-center justify-between pointer-events-auto">
        <Link href="/" className="group flex items-center gap-3 text-white/50 hover:text-white transition-colors duration-300">
          <svg className="w-5 h-5 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest mt-0.5">Back to Home</span>
        </Link>
        <div className="text-[#E5D3B3] font-bold tracking-[0.3em] uppercase text-[10px]">
          Kahory Media
        </div>
      </header>
      
      {/* ✅ FIX: We grouped the Header and Filters into one single container 
        using a small 'gap' to force them to stick tightly together. 
      */}
      <div className="w-full px-6 md:px-12 max-w-[1200px] mx-auto z-10 pt-28 md:pt-32 flex flex-col gap-6 md:gap-8 mb-6">
        
        {/* HEADER */}
        <div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-3 mb-2"
          >
            <div className="w-2 h-2 rounded-full bg-[#E5D3B3] animate-pulse" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-[#E5D3B3] font-bold">
              Case Studies
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-[clamp(3.5rem,6vw,5.5rem)] font-bold tracking-tighter leading-[0.9] text-white uppercase"
          >
            Selected <br/>
            <span className="text-[#E61919]/90 italic font-serif lowercase font-light">Works.</span>
          </motion.h1>
        </div>

        {/* FILTER BAR */}
        <div className="flex flex-wrap gap-4 md:gap-8 border-b border-white/10 pb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`text-[10px] md:text-xs uppercase tracking-widest font-bold transition-all duration-300 ${
                activeFilter === category 
                  ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
                  : "text-white/30 hover:text-white/70"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* THE GRID */}
      {/* ✅ FIX: Removed top margins so it sits flush against the filter line */}
      <section className="w-full px-6 md:px-12 max-w-[1200px] mx-auto z-10 mb-32 md:mb-48 min-h-[50vh]">
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredWork.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                key={project.id}
              >
                <Link href={`/work/${project.slug}`} className="group block relative w-full aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-white/5 border border-white/5 hover:border-white/20 transition-colors duration-500 cursor-pointer">
                  
                  {/* Cover Image */}
                  <img 
                    src={project.coverImage} 
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-100"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-90" />

                  {/* Card Content */}
                  <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-between z-10">
                    <div className="flex justify-between items-start">
                      <span className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-[9px] text-white/80 uppercase tracking-widest border border-white/10">
                        {project.category}
                      </span>
                      
                      <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <svg className="w-3 h-3 transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.metrics.map((metric, i) => (
                          <span key={i} className="text-[10px] md:text-xs font-mono text-[#E5D3B3] font-bold">
                            {metric}
                          </span>
                        ))}
                      </div>
                      <span className="block text-white/50 text-xs mb-1">{project.client}</span>
                      <h3 className="text-xl md:text-2xl font-bold text-white tracking-tighter">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}