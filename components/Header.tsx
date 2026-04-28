"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  // Replaced "Results" and "Services" with a single "Expertise" link
  const navLinks = [
    { name: "About", href: "/#about" },
    { name: "Expertise", href: "/#results" }, // Scrolls to the top of the Results/Services block
    { name: "Watch", href: "/#work" }
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-[100] px-6 py-8 md:py-10 flex justify-center bg-gradient-to-b from-black via-black/80 to-transparent backdrop-blur-sm [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]"
    >
      <div className="w-full max-w-[1200px] flex justify-between items-center relative">
        
        {/* Left: Massive Logo */}
        <Link href="/" className="block z-20">
          <img src="/kahory-full-logo.png" alt="Logo" className="h-16 md:h-24 w-auto object-contain hover:scale-105 transition-transform" />
        </Link>

        {/* Center: Updated Navigation Links */}
        <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-10 z-10">
          {navLinks.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 hover:text-[#E5D3B3] transition-colors"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Right: Floating CTA */}
        <nav className="z-20">
          <Link href="/contact" className="group relative block">
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-white transition-all group-hover:text-[#E5D3B3]"
            >
              Get in touch
              <motion.div className="h-[1px] w-0 bg-[#E5D3B3] group-hover:w-full transition-all duration-700 mt-2" />
            </motion.div>
          </Link>
        </nav>
        
      </div>
    </motion.header>
  );
}