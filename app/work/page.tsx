"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Footer from "@/components/Footer";
import { workData, categories } from "@/data/work";

export default function WorkArchivePage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredWork = activeFilter === "All" 
    ? workData 
    : workData.filter((item) => item.categories.includes(activeFilter));

  return (
    <main className="flex flex-col min-h-screen bg-black overflow-hidden relative">

      {/* TOP NAVIGATION */}
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
      
      {/* THE MAD LIBS HEADER & FILTER */}
      <div className="relative z-50 w-full px-6 md:px-12 max-w-[1200px] mx-auto pt-32 md:pt-40 flex flex-col gap-6 md:gap-8 mb-12">
        
        <div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} 
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-[#E5D3B3] animate-pulse" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-[#E5D3B3] font-bold">Case Studies</span>
          </motion.div>

          {/* ✅ THE MAD LIBS SENTENCE 
            This replaces the old title and filter bar entirely.
          */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
            ref={dropdownRef}
          >
            <h1 className="text-4xl sm:text-5xl md:text-[clamp(3.5rem,5.5vw,5rem)] font-bold tracking-tighter leading-[1.2] text-white">
              Show me our best work in <br className="hidden sm:block md:hidden" />
              
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="relative inline-flex items-center text-[#E61919] group transition-colors hover:text-white"
              >
                <span className="border-b-[4px] md:border-b-[6px] border-[#E61919]/40 group-hover:border-white transition-colors pb-1 md:pb-2">
                  {activeFilter}
                </span>
                <svg className={`ml-2 md:ml-4 w-8 h-8 md:w-12 md:h-12 transform transition-transform duration-500 ${isDropdownOpen ? "rotate-180 text-white" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
              </button>
              <span className="text-white">.</span>
            </h1>

            {/* The Inline Dropdown Menu */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 mt-6 z-[60] w-full sm:w-72 bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden p-3 flex flex-col gap-1 max-h-[300px] overflow-y-auto"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <style dangerouslySetInnerHTML={{__html: `::-webkit-scrollbar { display: none; }`}} />
                  
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setActiveFilter(cat); setIsDropdownOpen(false); }}
                      className={`text-left px-5 py-4 rounded-2xl text-sm md:text-base tracking-tight font-bold transition-all duration-300 ${
                        activeFilter === cat 
                          ? "bg-[#E61919] text-white" 
                          : "text-white/50 hover:text-white hover:bg-white/10 hover:translate-x-1"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>

      {/* THE GRID */}
      <section className="relative z-10 w-full px-6 md:px-12 max-w-[1200px] mx-auto mb-32 md:mb-48 min-h-[50vh]">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredWork.map((project) => (
              <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} key={project.id}>
                
                <Link href={`/work/${project.slug}`} className="group block relative w-full aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-white/5 border border-white/5 hover:border-white/20 transition-colors duration-500 cursor-pointer">
                  <img src={project.coverImage} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                  
                  <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />

                  <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-between z-10 pointer-events-none">
                    <div className="flex justify-between items-start pointer-events-auto">
                      <div className="flex flex-wrap gap-2">
                        {project.categories.slice(0, 2).map((cat, i) => (
                          <span key={i} className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-[9px] text-white/80 uppercase tracking-widest border border-white/10">
                            {cat}
                          </span>
                        ))}
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <svg className="w-3 h-3 transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </div>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.metrics.map((metric, i) => (
                          <span key={i} className="text-[10px] md:text-xs font-mono text-[#E5D3B3] font-bold">{metric}</span>
                        ))}
                      </div>
                      <span className="block text-white/50 text-xs mb-1">{project.client}</span>
                      <h3 className="text-xl md:text-2xl font-bold text-white tracking-tighter">{project.title}</h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* EXTENDED ARCHIVE CTA */}
      <section className="relative z-10 w-full px-6 md:px-12 max-w-[1200px] mx-auto py-16 md:py-24 border-t border-white/10 flex flex-col items-center justify-center text-center">
        <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-[#E61919] font-bold block mb-4">The Vault</span>
        <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tighter mb-4">Need to see more?</h2>
        <p className="text-white/50 max-w-md text-sm md:text-base font-light mb-8">Browse our complete, uncompressed content archive. Hundreds of edits, raw engagement data, and zero curation.</p>
        <a href="https://drive.google.com/drive/folders/1kiN3uBkhJswbgq8BlFfSAYQlYfiqWEZb" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white/10 hover:border-white/30 transition-all duration-300">
          Access Google Drive
          <svg className="w-4 h-4 text-[#E5D3B3] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
        </a>
      </section>

      <Footer />
    </main>
  );
}