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
      
      {/* HEADER SECTION */}
      <section className="w-full px-6 md:px-12 max-w-[1200px] mx-auto z-10 pt-32 md:pt-48 mb-16 md:mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-3 mb-6"
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
          className="text-5xl sm:text-6xl md:text-[clamp(4rem,8vw,7rem)] font-bold tracking-tighter leading-[0.9] text-white uppercase"
        >
          Selected <br/>
          <span className="text-[#E61919]/90 italic font-serif lowercase font-light">Works.</span>
        </motion.h1>
      </section>

      {/* FILTER BAR */}
      <section className="w-full px-6 md:px-12 max-w-[1200px] mx-auto z-10 mb-12">
        <div className="flex flex-wrap gap-4 md:gap-8 border-b border-white/10 pb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`text-xs md:text-sm uppercase tracking-widest font-bold transition-all duration-300 ${
                activeFilter === category 
                  ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
                  : "text-white/30 hover:text-white/70"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* THE GRID */}
      <section className="w-full px-6 md:px-12 max-w-[1200px] mx-auto z-10 mb-32 md:mb-48 min-h-[50vh]">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10"
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
                {/* Notice the href points to /work/[slug] - We will build this next! */}
                <Link href={`/work/${project.slug}`} className="group block relative w-full aspect-[4/5] md:aspect-[4/3] rounded-3xl overflow-hidden bg-white/5 border border-white/5 hover:border-white/20 transition-colors duration-500 cursor-pointer">
                  
                  {/* Cover Image */}
                  <img 
                    src={project.coverImage} 
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-100"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

                  {/* Card Content */}
                  <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between z-10">
                    <div className="flex justify-between items-start">
                      <span className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-[10px] text-white/80 uppercase tracking-widest border border-white/10">
                        {project.category}
                      </span>
                      
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <svg className="w-4 h-4 transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>

                    <div>
                      <div className="flex gap-4 mb-4">
                        {project.metrics.map((metric, i) => (
                          <span key={i} className="text-xs font-mono text-[#E5D3B3] font-bold">
                            {metric}
                          </span>
                        ))}
                      </div>
                      <span className="block text-white/50 text-sm mb-1">{project.client}</span>
                      <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tighter">
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