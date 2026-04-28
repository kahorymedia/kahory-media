"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Header() {
  const navLinks = [
    { name: "About", href: "about" },
    { name: "Expertise", href: "results" }, 
    { name: "Watch", href: "work" }
  ];

  // State to track which item is active and which is being hovered
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string, index: number) => {
    e.preventDefault();
    setActiveIndex(index); // Update the active pill position
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-[100] px-6 py-12 md:py-16 flex justify-center pointer-events-none"
    >
      {/* THE SEAMLESS FADE LAYER */}
      <div className="absolute top-0 left-0 w-full h-56 md:h-72 bg-black/70 backdrop-blur-md [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] -z-10 pointer-events-none" />
      
      <div className="w-full max-w-[1200px] flex justify-between items-center relative pointer-events-auto h-16 md:h-24">
        
        {/* LEFT: Logo */}
        <Link href="/" className="block z-20 flex items-center h-full">
          <img src="/kahory-full-logo.png" alt="Logo" className="h-full w-auto object-contain" />
        </Link>

        {/* CENTER: The New Fluid Neon Dock Nav */}
        <nav 
          className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center p-1.5 rounded-full bg-[#050505] border border-[#E61919] shadow-[0_0_20px_rgba(230,25,25,0.3)] z-50"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {navLinks.map((item, index) => {
            const isActive = activeIndex === index;
            const isHovered = hoveredIndex === index;

            return (
              <a 
                key={item.name} 
                href={`#${item.href}`}
                onClick={(e) => handleScroll(e, item.href, index)}
                onMouseEnter={() => setHoveredIndex(index)}
                // Massively increased padding and font size for better clickability
                className={`relative px-6 py-2.5 rounded-full text-xs md:text-sm uppercase tracking-[0.2em] font-bold transition-colors duration-300 z-10 ${
                  isActive || isHovered ? "text-white" : "text-white/50"
                }`}
              >
                {/* Text is placed above the animation */}
                <span className="relative z-20 leading-none">{item.name}</span>
                
                {/* The Fluid Framer Motion Background Pill */}
                {(hoveredIndex !== null ? isHovered : isActive) && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-[#E61919]/20 border border-[#E61919]/40 rounded-full z-10 shadow-[inset_0_0_10px_rgba(230,25,25,0.4)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            )
          })}
        </nav>

        {/* RIGHT: CTA */}
        <nav className="z-20 flex items-center h-full">
          <Link href="/contact" className="group relative flex items-center">
            <motion.div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-white leading-none relative">
              Get in touch
              <div className="absolute -bottom-2 left-0 h-[1px] w-0 bg-[#E5D3B3] group-hover:w-full transition-all duration-700" />
            </motion.div>
          </Link>
        </nav>

      </div>
    </motion.header>
  );
}