"use client";
import { siteData } from "@/data/content";
import { motion } from "framer-motion";

export default function Work() {
  return (
    <section id="work" className="w-full py-40 px-6 md:px-12 bg-black">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="mb-20">
          <span className="text-[10px] uppercase tracking-[0.5em] text-[#E5D3B3] font-bold block mb-4">
            Selected Work
          </span>
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-white">
            High-Converting <br />
            <span className="text-white/40 italic font-serif font-light">Narratives.</span>
          </h2>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteData.work.reels.map((project, i) => (
            <motion.a
              key={project.id}
              href={project.instaLink}
              target="_blank" 
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative block aspect-[9/16] rounded-2xl overflow-hidden bg-zinc-900 border border-white/10"
            >
              {/* Native HTML5 Video Element optimized for silent autoplay */}
              <video 
                src={project.videoSrc}
                autoPlay 
                loop 
                muted 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />

              {/* Hover Overlay & Info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <span className="text-[10px] uppercase tracking-[0.4em] text-[#E5D3B3] font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {project.client}
                </span>
                <h3 className="text-2xl font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {project.title}
                </h3>
                
                {/* Floating "Watch Reel" arrow */}
                <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  <span className="text-white text-xl">↗</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Portfolio Drive Link */}
        <div className="mt-20 flex justify-center">
          <a 
            href={siteData.work.driveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-block"
          >
            <div className="px-12 py-5 border border-white/20 text-white rounded-full font-black uppercase tracking-[0.4em] text-[10px] overflow-hidden relative">
              <span className="relative z-10 group-hover:text-black transition-colors duration-500">View Full Portfolio</span>
              <motion.div 
                whileHover={{ top: 0 }}
                className="absolute top-full left-0 w-full h-full bg-white z-0 transition-all duration-500" 
              />
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}