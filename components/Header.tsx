"use client";
import Link from "next/link";
import { motion } from "framer-motion";

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
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      // Increased the vertical padding (py-10 md:py-12) to give the content more breathing room
      className="fixed top-0 left-0 w-full z-[100] px-6 py-10 md:py-12 flex justify-center pointer-events-none"
    >
      {/* TALLER HEIGHT, SHARPER FADE: h-40/56, black stays solid for 60% before fading */}
      <div className="absolute top-0 left-0 w-full h-40 md:h-56 bg-black/70 backdrop-blur-md [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] -z-10 pointer-events-none" />
      
      <div className="w-full max-w-[1200px] flex justify-between items-center relative pointer-events-auto">
        <Link href="/" className="block z-20">
          <img src="/kahory-full-logo.png" alt="Logo" className="h-16 md:h-24 w-auto object-contain" />
        </Link>

        <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-10 z-10">
          {navLinks.map((item) => (
            <a 
              key={item.name} 
              href={`#${item.href}`}
              onClick={(e) => handleScroll(e, item.href)}
              className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 hover:text-[#E5D3B3] transition-colors"
            >
              {item.name}
            </a>
          ))}
        </nav>

        <nav className="z-20">
          <Link href="/contact" className="group relative block">
            <motion.div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-white">
              Get in touch
              <div className="h-[1px] w-0 bg-[#E5D3B3] group-hover:w-full transition-all duration-700 mt-2" />
            </motion.div>
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}