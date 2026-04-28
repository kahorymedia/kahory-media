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
      // This tells the browser to scroll smoothly to the section
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      // If we're on the contact page, go home first
      window.location.href = `/#${id}`;
    }
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-[100] px-6 py-8 md:py-10 flex justify-center bg-gradient-to-b from-black via-black/80 to-transparent backdrop-blur-sm"
    >
      <div className="w-full max-w-[1200px] flex justify-between items-center relative">
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