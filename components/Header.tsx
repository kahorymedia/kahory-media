"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

// --- THE GOOEY NEON BUTTON COMPONENT ---
// Recreates the liquid particle explosion from your reference code using React & Framer Motion
function GooeyNavButton({ item, onNavigate }: { item: any, onNavigate: any }) {
  const [particles, setParticles] = useState<any[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onNavigate(e, item.href);

    // Generate the explosive particles
    const newParticles = Array.from({ length: 12 }).map((_, i) => {
      // Math to distribute particles in a 360-degree circle with slight randomness
      const angle = (Math.PI * 2 * i) / 12 + (Math.random() * 0.5);
      const dist = 50 + Math.random() * 40; 
      return {
        id: Math.random(),
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        size: 10 + Math.random() * 10, 
        duration: 0.4 + Math.random() * 0.3
      };
    });

    setParticles(newParticles);
    
    // Clean up particles after animation finishes
    setTimeout(() => setParticles([]), 1000);
  };

  return (
    <div className="relative group">
      {/* 1. THE BUTTON ITSELF */}
      <a
        href={`#${item.href}`}
        onClick={handleClick}
        // Black button, larger size, white text
        className="relative flex items-center justify-center px-8 py-3.5 rounded-full bg-[#050505] text-xs md:text-sm uppercase tracking-[0.2em] font-bold text-white z-20 cursor-pointer"
      >
        {/* HOVER BORDER: Invisible by default, flashes Neon Red ONLY on hover */}
        <div className="absolute inset-0 rounded-full border border-[#E61919] opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_15px_rgba(230,25,25,0.6)] transition-all duration-300" />
        
        <span className="relative z-30">{item.name}</span>
      </a>

      {/* 2. THE GOOEY EXPLOSION LAYER */}
      {/* This uses the hidden SVG filter defined at the top of the Header to create the liquid merging effect */}
      <div className="absolute inset-0 z-10 pointer-events-none" style={{ filter: 'url(#gooey-nav)' }}>
        {/* The center blob that flashes on click */}
        {particles.length > 0 && (
          <motion.div
            initial={{ opacity: 1, scale: 0.8 }}
            animate={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-[#E61919] rounded-full"
          />
        )}
        
        {/* The shooting particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: "-50%", y: "-50%", scale: 1, opacity: 1 }}
            animate={{ 
              x: `calc(-50% + ${p.x}px)`, 
              y: `calc(-50% + ${p.y}px)`, 
              scale: 0, 
              opacity: 0 
            }}
            transition={{ duration: p.duration, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 bg-[#E61919] rounded-full"
            style={{ width: p.size, height: p.size }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Header() {
  const navLinks = [
    { name: "About", href: "about" },
    { name: "Expertise", href: "results" }, 
    { name: "Watch", href: "work" }
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <>
      {/* HIDDEN SVG FILTER: This acts as the mathematical engine for the "Gooey" liquid effect */}
      <svg className="pointer-events-none absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="gooey-nav">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 w-full z-[100] px-6 py-12 md:py-16 flex justify-center pointer-events-none"
      >
        {/* THE FADE BACKGROUND */}
        <div className="absolute top-0 left-0 w-full h-56 md:h-72 bg-black/70 backdrop-blur-md [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] -z-10 pointer-events-none" />
        
        <div className="w-full max-w-[1200px] flex justify-between items-center relative pointer-events-auto h-16 md:h-24">
          
          {/* LEFT: Logo */}
          <Link href="/" className="block z-[150] flex items-center h-full">
            <img src="/kahory-full-logo.png" alt="Logo" className="h-full w-auto object-contain" />
          </Link>

          {/* CENTER: The Individual Gooey Buttons */}
          <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-6 z-[150]">
            {navLinks.map((item) => (
              <GooeyNavButton key={item.name} item={item} onNavigate={handleScroll} />
            ))}
          </nav>

          {/* RIGHT: CTA */}
          <nav className="z-[150] flex items-center h-full">
            <Link href="/contact" className="group relative flex items-center">
              <motion.div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-white leading-none relative">
                Get in touch
                <div className="absolute -bottom-2 left-0 h-[1px] w-0 bg-[#E5D3B3] group-hover:w-full transition-all duration-700" />
              </motion.div>
            </Link>
          </nav>

        </div>
      </motion.header>
    </>
  );
}