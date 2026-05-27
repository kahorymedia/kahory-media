"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Footer from "@/components/Footer";
import { workData, categories } from "@/data/work";

export default function WorkArchivePage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  // ✅ THE MAGIC: Listen for Cmd+K or Ctrl+K to open the palette!
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsPaletteOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when palette is open
  useEffect(() => {
    if (isPaletteOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isPaletteOpen]);

  const filteredWork = activeFilter === "All" 
    ? workData 
    : workData.filter((item) => item.categories.includes(activeFilter));

  return (
    <main className="flex flex-col min-h-screen bg-black overflow-hidden relative">

      {/* --- COMMAND PALETTE OVERLAY --- */}
      <AnimatePresence>
        {isPaletteOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 overflow-y-auto"
            onClick={() => setIsPaletteOpen(false)} // Close if clicked outside
          >
            {/* The Palette Box */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl flex flex-col gap-2"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the box
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-4 px-4">
                <span className="text-white/40 uppercase tracking-[0.4em] text-[10px] font-bold">
                  Select Niche
                </span>
                <button 
                  onClick={() => setIsPaletteOpen(false)}
                  className="text-white/40 hover:text-white text-xs uppercase tracking-widest transition-colors"
                >
                  [ Esc ]
                </button>
              </div>

              {/* Massive Cinematic Category List */}
              <div className="flex flex-col">
                {categories.map((cat) => {
                  // ✅ DYNAMIC CHECK: Does this category have projects?
                  const hasProjects = cat === "All" || workData.some(item => item.categories.includes(cat));

                  return (
                    <button
                      key={cat}
                      disabled={!hasProjects}
                      onClick={() => {
                        if (hasProjects) {
                          setActiveFilter(cat);
                          setIsPaletteOpen(false);
                        }
                      }}
                      className={`group w-full text-left px-4 py-3 md:py-4 flex items-center justify-between transition-colors duration-300 ${
                        !hasProjects 
                          ? "text-white/10 cursor-not-allowed" // Dimmed and deactivated style
                          : activeFilter === cat 
                            ? "text-white" 
                            : "text-white/30 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`text-3xl md:text-5xl font-bold tracking-tighter transition-transform duration-500 ${hasProjects ? "group-hover:translate-x-4" : ""}`}>
                          {cat}
                        </span>
                        {/* Premium 'Coming Soon' Badge for empty categories */}
                        {!hasProjects && (
                          <span className="text-[8px] md:text-[10px] uppercase tracking-widest text-white/20 border border-white/10 px-2 py-1 rounded-full hidden sm:block">
                            Coming Soon
                          </span>
                        )}
                      </div>
                      
                      {activeFilter === cat && hasProjects && (
                        <motion.div layoutId="activeDot" className="w-3 h-3 rounded-full bg-[#E61919]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP NAVIGATION: UPDATED TO ONLY SHOW THE 3D ICON CENTERED */}
      <header className="absolute top-0 left-0 w-full p-6 md:px-12 md:py-8 z-40 flex items-center justify-center pointer-events-auto">
        <Link href="/" className="group transition-transform duration-300 hover:scale-110 flex items-center justify-center">
          <img 
            src="/kahory media icon png 3-d.png" 
            alt="Back to Home" 
            className="w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-[0_0_20px_rgba(230,25,25,0.2)]" 
            draggable="false"
          />
        </Link>
      </header>
      
      {/* HEADER & TRIGGER BUTTON */}
      <div className="relative z-30 w-full px-6 md:px-12 max-w-[1200px] mx-auto pt-32 md:pt-40 flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        
        <div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#E5D3B3] animate-pulse" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-[#E5D3B3] font-bold">Case Studies</span>
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="text-4xl sm:text-5xl md:text-[clamp(3.5rem,6vw,5.5rem)] font-bold tracking-tighter leading-[0.9] text-white uppercase">
            Selected <br/>
            <span className="text-[#E61919]/90 italic font-serif lowercase font-light">Works.</span>
          </motion.h1>
        </div>

        {/* THE COMMAND PALETTE TRIGGER BUTTON */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <button 
            onClick={() => setIsPaletteOpen(true)}
            className="group flex items-center justify-between gap-6 px-6 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-300 w-full md:w-auto"
          >
            <div className="flex flex-col items-start">
              <span className="text-[9px] uppercase tracking-widest text-white/40 mb-1">Current Filter</span>
              <span className="text-sm font-bold text-white tracking-wide">{activeFilter}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="hidden sm:flex items-center justify-center px-2 py-1 rounded bg-black/50 border border-white/10 text-[10px] font-mono text-white/60">
                ⌘K
              </span>
              <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center group-hover:bg-[#E61919] transition-colors">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
              </div>
            </div>
          </button>
        </motion.div>

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