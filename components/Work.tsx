"use client";
import { siteData } from "@/data/content";
import { motion } from "framer-motion";

export default function Work() {
  return (
    // FIX: Removed hardcoded paddings.
    <section id="work" className="w-full bg-black flex justify-center">
      <div className="w-full max-w-[1200px]">
        
        <div className="mb-12 md:mb-20">
          <span className="text-[10px] uppercase tracking-[0.5em] text-[#E5D3B3] font-bold block mb-4">
            Selected Work
          </span>
          {/* FIX: Implemented fluid clamp() typography! */}
          <h2 className="text-[clamp(2.5rem,8vw,5.5rem)] font-bold tracking-tighter text-white leading-[1.1] md:leading-none">
            High-Converting <br className="hidden sm:block" />
            <span className="text-white/40 italic font-serif font-light">Narratives.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {siteData.work.reels.map((project, i) => (
            <motion.a
              key={project.id} href={project.instaLink} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative block aspect-[9/16] rounded-2xl overflow-hidden bg-zinc-900 border border-white/10"
            >
              <video 
                src={project.videoSrc} autoPlay loop muted playsInline 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-8 pointer-events-none">
                <span className="text-[10px] uppercase tracking-[0.4em] text-[#E5D3B3] font-bold mb-2 translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
                  {project.client}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {project.title}
                </h3>
                
                <div className="hidden md:flex absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  <span className="text-white text-xl">↗</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-16 md:mt-20 flex justify-center">
          <a href={siteData.work.driveLink} target="_blank" rel="noopener noreferrer" className="group relative inline-block">
            <div className="px-8 py-4 md:px-12 md:py-5 border border-white/20 text-white rounded-full font-black uppercase tracking-[0.4em] text-[9px] md:text-[10px] overflow-hidden relative">
              <span className="relative z-10 group-hover:text-black transition-colors duration-500">View Full Portfolio</span>
              <motion.div whileHover={{ top: 0 }} className="absolute top-full left-0 w-full h-full bg-white z-0 transition-all duration-500" />
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}