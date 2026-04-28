"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

// --- THE PARTICLE EXPLOSION COMPONENT ---
// Replaces the outdated DOM-injection code with clean Framer Motion physics
function ParticleBurst() {
  const particles = Array.from({ length: 15 }).map((_, i) => {
    const angle = (i / 15) * Math.PI * 2 + Math.random() * 0.5;
    const distance = 30 + Math.random() * 50; // Shoot out up to 80px
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    const size = 3 + Math.random() * 5; // Dots between 3px and 8px
    const isRed = Math.random() > 0.3; // 70% chance of Red, 30% chance of Gold
    const color = isRed ? '#E61919' : '#E5D3B3'; 
    const duration = 0.5 + Math.random() * 0.4;

    return { x, y, size, color, duration };
  });

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
          animate={{ x: p.x, y: p.y, scale: 1, opacity: 0 }}
          transition={{ duration: p.duration, ease: "easeOut" }}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 10px ${p.color}`
          }}
        />
      ))}
    </div>
  );
}

export default function Header() {
  const navLinks = [
    { name: "About", href: "about" },
    { name: "Expertise", href: "results" }, 
    { name: "Watch", href: "work" }
  ];

  // We use this to force the animation to replay EVERY time a button is clicked
  const [clickTriggers, setClickTriggers] = useState<{ [key: number]: number }>({ 0: 0, 1: 0, 2: 0 });

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string, index: number) => {
    e.preventDefault();
    
    // Trigger the particle explosion
    setClickTriggers(prev => ({ ...prev, [index]: prev[index] + 1 }));

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
      {/* THE FADE BACKGROUND */}
      <div className="absolute top-0 left-0 w-full h-56 md:h-72 bg-black/70 backdrop-blur-md [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] -z-10 pointer-events-none" />
      
      <div className="w-full max-w-[1200px] flex justify-between items-center relative pointer-events-auto h-16 md:h-24">
        
        {/* LEFT: Logo */}
        <Link href="/" className="block z-[150] flex items-center h-full">
          <img src="/kahory-full-logo.png" alt="Logo" className="h-full w-auto object-contain" />
        </Link>

        {/* CENTER: The Individual Neon Buttons */}
        {/* z-[150] ensures the custom splash cursor NEVER hides these buttons */}
        <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-6 z-[150]">
          {navLinks.map((item, index) => (
            <a 
              key={item.name} 
              href={`#${item.href}`}
              onClick={(e) => handleScroll(e, item.href, index)}
              // Individual black buttons, neon border, larger padding (px-8 py-3.5)
              className="group relative px-8 py-3.5 rounded-full bg-[#050505] border border-[#E61919] shadow-[0_0_12px_rgba(230,25,25,0.4)] text-xs md:text-sm uppercase tracking-[0.2em] font-bold text-white/80 hover:text-white transition-all duration-300 hover:bg-[#E61919]/10 hover:shadow-[0_0_25px_rgba(230,25,25,0.8)]"
            >
              <span className="relative z-20 leading-none block">{item.name}</span>
              
              {/* Renders the particle explosion on click */}
              {clickTriggers[index] > 0 && <ParticleBurst key={clickTriggers[index]} />}
            </a>
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
  );
}