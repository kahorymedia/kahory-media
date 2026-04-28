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
      // Increased vertical padding to push the items slightly lower
      className="fixed top-0 left-0 w-full z-[100] px-6 py-12 md:py-16 flex justify-center pointer-events-none"
    >
      {/* MASSIVELY INCREASED LOWER EDGE: h-56 on mobile, h-72 on desktop */}
      <div className="absolute top-0 left-0 w-full h-56 md:h-72 bg-black/70 backdrop-blur-md [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] -z-10 pointer-events-none" />
      
      {/* Explicitly defined height so all 3 columns align perfectly to the exact same vertical center */}
      <div className="w-full max-w-[1200px] flex justify-between items-center relative pointer-events-auto h-16 md:h-24">
        
        {/* LEFT: Logo */}
        <Link href="/" className="block z-20 flex items-center h-full">
          <img src="/kahory-full-logo.png" alt="Logo" className="h-full w-auto object-contain" />
        </Link>

        {/* CENTER: Nav Links */}
        <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-10 z-10 h-full">
          {navLinks.map((item) => (
            <a 
              key={item.name} 
              href={`#${item.href}`}
              onClick={(e) => handleScroll(e, item.href)}
              // leading-none removes invisible padding above/below the font
              className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 hover:text-[#E5D3B3] transition-colors leading-none"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* RIGHT: CTA */}
        <nav className="z-20 flex items-center h-full">
          <Link href="/contact" className="group relative flex items-center">
            <motion.div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-white leading-none relative">
              Get in touch
              {/* Made the underline absolute so it doesn't push the text box upwards */}
              <div className="absolute -bottom-2 left-0 h-[1px] w-0 bg-[#E5D3B3] group-hover:w-full transition-all duration-700" />
            </motion.div>
          </Link>
        </nav>

      </div>
    </motion.header>
  );
}