"use client";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";

const servicesData = [
  { title: "Short-Form Strategy", description: "Data-driven playbooks for Instagram Reels and YouTube Shorts designed to maximize retention and organic reach." },
  { title: "Content Ideation", description: "Hook-based storytelling and format development that stops the scroll and builds deep audience connection." },
  { title: "Video Production", description: "High-end shooting and creative direction. We capture the raw essence of your brand with cinematic precision." },
  { title: "Post-Production", description: "Dynamic editing workflows, pacing optimization, and color grading that turns raw footage into converting assets." },
  { title: "Social Management", description: "End-to-end consulting and pipeline management to scale your content output without sacrificing premium quality." },
  { title: "Brand Consulting", description: "Auditing your current visual identity and content systems to align with high-performing industry standards." }
];

export default function Services() {
  return (
    <section id="results" className="w-full bg-black flex flex-col items-center relative z-10 overflow-hidden">
      
      <div className="w-full max-w-[1200px] mb-6 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-2 md:gap-6 px-6 md:px-0">
        <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tighter text-white uppercase leading-none">
          Our <br className="hidden md:block" />
          <span className="text-[#E5D3B3] italic font-serif font-light lowercase">Expertise.</span>
        </h2>
        <p className="text-white/40 max-w-sm text-[10px] md:text-sm uppercase tracking-[0.2em] font-bold">
          High-performing content formats & scalable production systems.
        </p>
      </div>

      {/* Swipe Indicator */}
      <div className="w-full md:hidden px-6 mb-4 flex items-center gap-2 opacity-60">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E5D3B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        <span className="text-[#E5D3B3] text-[9px] uppercase tracking-widest font-bold">Swipe to explore</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E5D3B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>

      <div 
        // ✅ FIX: Added a scoped class 'services-scroll' for the scrollbar CSS
        className="services-scroll flex md:grid overflow-x-auto overflow-y-hidden touch-pan-x snap-x snap-mandatory md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-[1200px] px-6 md:px-0 pb-8 md:pb-0"
      >
        {/* ✅ FIX: Scoped the hidden scrollbar strictly to this container */}
        <style dangerouslySetInnerHTML={{__html: `
          .services-scroll::-webkit-scrollbar { display: none; }
          .services-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />
        
        {servicesData.map((service, idx) => (
          <div key={idx} className="w-[85vw] sm:w-[60vw] max-w-[340px] md:w-auto md:max-w-none snap-center shrink-0 flex">
            <ServiceCard index={idx} title={service.title} description={service.description} />
          </div>
        ))}
      </div>
    </section>
  );
}

function ServiceCard({ title, description, index }: { title: string; description: string; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      // ✅ FIX: Removed heavy hover color shifts. It stays completely static except for the subtle light effect.
      className="group relative flex flex-col w-full h-auto min-h-[250px] md:min-h-[300px] rounded-[1.5rem] md:rounded-2xl bg-[#0a0a0a] border border-white/5 overflow-hidden cursor-default"
    >
      {/* Subtler Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-700 group-hover:opacity-100 hidden md:block"
        style={{ background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(229, 211, 179, 0.15), rgba(153, 0, 0, 0.05) 40%, transparent 80%)` }}
      />

      <div className="relative z-20 p-6 md:p-8 flex flex-col h-full gap-4 md:gap-6">
        <span className="text-[#E5D3B3] text-[10px] md:text-xs font-mono block opacity-70">
          0{index + 1}
        </span>
        <h3 className="text-[20px] md:text-2xl font-bold text-white tracking-tight leading-tight whitespace-normal break-words">
          {title}
        </h3>
        <p className="text-white/50 text-[13px] md:text-sm leading-relaxed whitespace-normal mt-auto">
          {description}
        </p>
        {/* ✅ FIX: Removed the fake clickable arrow completely */}
      </div>
    </div>
  );
}