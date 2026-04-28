"use client";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";

// The Kahory Media service list
const servicesData = [
  {
    title: "Short-Form Strategy",
    description: "Data-driven playbooks for Instagram Reels and YouTube Shorts designed to maximize retention and organic reach.",
  },
  {
    title: "Content Ideation",
    description: "Hook-based storytelling and format development that stops the scroll and builds deep audience connection.",
  },
  {
    title: "Video Production",
    description: "High-end shooting and creative direction. We capture the raw essence of your brand with cinematic precision.",
  },
  {
    title: "Post-Production",
    description: "Dynamic editing workflows, pacing optimization, and color grading that turns raw footage into converting assets.",
  },
  {
    title: "Social Management",
    description: "End-to-end consulting and pipeline management to scale your content output without sacrificing premium quality.",
  },
  {
    title: "Brand Consulting",
    description: "Auditing your current visual identity and content systems to align with high-performing industry standards.",
  }
];

export default function Services() {
  return (
    <section id="results" className="w-full pt-32 pb-16 px-6 md:px-12 bg-black flex flex-col items-center relative z-10">
      
      {/* Section Header */}
      <div className="w-full max-w-[1200px] mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-6">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white uppercase leading-none">
          Our <br className="hidden md:block" />
          <span className="text-[#E5D3B3] italic font-serif font-light lowercase">Expertise.</span>
        </h2>
        <p className="text-white/40 max-w-sm text-sm uppercase tracking-[0.2em] font-bold">
          High-performing content formats & scalable production systems.
        </p>
      </div>

      {/* The Glow Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1200px]">
        {servicesData.map((service, idx) => (
          <ServiceCard key={idx} index={idx} title={service.title} description={service.description} />
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
      className="group relative flex flex-col w-full min-h-[320px] rounded-2xl bg-black overflow-hidden"
    >
      {/* 1. THE GLOWING BORDER LAYER (Backdrop) */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              450px circle at ${mouseX}px ${mouseY}px,
              rgba(229, 211, 179, 0.8), /* Kahory Gold */
              rgba(153, 0, 0, 0.6) 30%, /* Deep Maroon transition */
              transparent 80%
            )
          `,
        }}
      />

      {/* 2. THE INNER CARD (Creates the 1px border effect) */}
      <div className="absolute inset-[1.5px] rounded-[15px] bg-[#0a0a0a] z-10 transition-colors duration-500 group-hover:bg-[#050505]" />

      {/* 3. THE INNER SPOTLIGHT (Subtle fill glow inside the card) */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              300px circle at ${mouseX}px ${mouseY}px,
              rgba(229, 211, 179, 0.03),
              transparent 80%
            )
          `,
        }}
      />

      {/* 4. THE CONTENT */}
      <div className="relative z-20 p-8 flex flex-col h-full justify-between">
        <div>
          <span className="text-[#E5D3B3] text-xs font-mono mb-6 block opacity-70">
            0{index + 1}
          </span>
          <h3 className="text-2xl font-bold text-white mb-4 tracking-tight leading-tight">
            {title}
          </h3>
          <p className="text-white/40 text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Animated Arrow Icon */}
        <div className="mt-8 flex justify-end">
          <svg 
            className="w-6 h-6 text-white/20 transform transition-all duration-500 group-hover:text-[#E5D3B3] group-hover:translate-x-2 group-hover:-translate-y-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </div>
  );
}