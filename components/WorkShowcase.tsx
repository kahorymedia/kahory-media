"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

// --- PLACEHOLDER DATA (You will swap these out later) ---
const projects = [
  {
    id: 1,
    title: "Urban Run",
    category: "Commercial",
    videoSrc: "https://cdn.coverr.co/videos/coverr-running-in-the-city-2646/1080p.mp4",
    posterSrc: "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Project Ignite",
    category: "Social Campaign",
    videoSrc: "https://cdn.coverr.co/videos/coverr-boxing-workout-5147/1080p.mp4",
    posterSrc: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Night Drive",
    category: "Short Film",
    videoSrc: "https://cdn.coverr.co/videos/coverr-driving-a-porsche-in-the-dark-3221/1080p.mp4",
    posterSrc: "https://images.unsplash.com/photo-1503376713356-1d34190ba33b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "The Summit",
    category: "Documentary",
    videoSrc: "https://cdn.coverr.co/videos/coverr-hiking-in-the-snowy-mountains-4638/1080p.mp4",
    posterSrc: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800",
  }
];

function ProjectCard({ project }: { project: any }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      // Small promise catch to prevent console errors if it loads too fast
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      // Optional: reset video to start when they hover off
      videoRef.current.currentTime = 0; 
    }
  };

  return (
    <motion.div 
      className="relative group cursor-pointer w-full overflow-hidden rounded-3xl aspect-[4/5] md:aspect-video bg-white/5 border border-white/5 hover:border-white/20 transition-colors duration-500"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 0.98 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Cover Image */}
      <img 
        src={project.posterSrc} 
        alt={project.title}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
      />
      
      {/* Video Player */}
      <video
        ref={videoRef}
        src={project.videoSrc}
        poster={project.posterSrc}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

      {/* Center PLAY Button */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
      >
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 text-white">
          <svg className="w-6 h-6 md:w-8 md:h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </motion.div>

      {/* Text Content (Bottom Left) */}
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-20 flex justify-between items-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <div>
          <span className="text-[#E61919] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase block mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {project.category}
          </span>
          <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tighter">
            {project.title}
          </h3>
        </div>
        
        {/* Arrow Icon (Bottom Right) */}
        <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white/50 group-hover:border-white group-hover:text-white transition-colors duration-300">
          <svg className="w-4 h-4 transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkShowcase() {
  return (
    <section id="work" className="w-full py-24 md:py-32 px-6 md:px-12 bg-black flex justify-center items-center">
      <div className="w-full max-w-[1200px] flex flex-col gap-12 md:gap-20">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-[#E5D3B3] font-bold block mb-4">
              Selected Works
            </span>
            <h2 className="text-4xl md:text-[clamp(3rem,6vw,5rem)] leading-[0.9] font-bold tracking-tighter text-white uppercase">
              We don't make ads.<br/>
              <span className="text-[#E61919]/80 font-light italic font-serif lowercase">We make cinema.</span>
            </h2>
          </div>
          <p className="text-white/50 max-w-sm text-sm md:text-base font-light leading-relaxed">
            A curated selection of our highest-performing campaigns, short films, and digital pipelines designed to capture and retain absolute loyalists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

      </div>
    </section>
  );
}