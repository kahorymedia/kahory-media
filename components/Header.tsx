"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

// --- Standard Gooey Button Component ---
function GooeyButton({ text, href, isPage = false, onClick }: { text: string; href: string; isPage?: boolean; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void; }) {
  const [particles, setParticles] = useState<any[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    const newParticles = Array.from({ length: 12 }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / 12 + (Math.random() * 0.5);
      const dist = 50 + Math.random() * 40;
      return { id: Math.random(), x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, size: 10 + Math.random() * 10, duration: 0.4 + Math.random() * 0.3 };
    });
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1000);
  };

  const buttonContent = (
    <>
      <div className="absolute inset-0 rounded-full border border-[#E61919] opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_15px_rgba(230,25,25,0.6)] transition-all duration-300" />
      <span className="relative z-30">{text}</span>
    </>
  );

  const buttonClasses = "pointer-events-auto relative flex items-center justify-center px-6 py-2.5 rounded-full bg-transparent text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-white/60 hover:text-white transition-colors duration-300 z-20 cursor-pointer";

  return (
    <div className="relative group pointer-events-none">
      {isPage ? (
        <Link href={href} onClick={handleClick} className={buttonClasses}>{buttonContent}</Link>
      ) : (
        <a href={`#${href}`} onClick={handleClick} className={buttonClasses}>{buttonContent}</a>
      )}
      <div className="absolute inset-0 z-10 pointer-events-none" style={{ filter: 'url(#gooey-nav)' }}>
        {particles.length > 0 && <motion.div initial={{ opacity: 1, scale: 0.8 }} animate={{ opacity: 0, scale: 1.2 }} transition={{ duration: 0.5 }} className="absolute inset-0 bg-[#E61919] rounded-full" />}
        {particles.map((p) => <motion.div key={p.id} initial={{ x: "-50%", y: "-50%", scale: 1, opacity: 1 }} animate={{ x: `calc(-50% + ${p.x}px)`, y: `calc(-50% + ${p.y}px)`, scale: 0, opacity: 0 }} transition={{ duration: p.duration, ease: "easeOut" }} className="absolute top-1/2 left-1/2 bg-[#E61919] rounded-full" style={{ width: p.size, height: p.size }} />)}
      </div>
    </div>
  );
}

// --- DESKTOP DROPDOWN COMPONENT (For the Archive Button) ---
function ArchiveDropdownButton() {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle subtle hover delays so the menu doesn't vanish instantly if the mouse slips
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 200);
  };

  return (
    <div 
      className="relative pointer-events-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* The main visible button */}
      <button className="relative flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-transparent text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-white/60 hover:text-white transition-colors duration-300 z-20 cursor-pointer group">
        <div className="absolute inset-0 rounded-full border border-[#E61919] opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_15px_rgba(230,25,25,0.6)] transition-all duration-300" />
        <span className="relative z-30">Archive</span>
        <svg className={`relative z-30 w-3 h-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>

      {/* The Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[110%] left-1/2 -translate-x-1/2 w-48 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden p-2 flex flex-col gap-1 shadow-2xl z-50"
          >
            <Link 
              href="/work" 
              className="px-4 py-3 rounded-xl text-left text-xs uppercase tracking-widest font-bold text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              Case Studies
            </Link>
            <a 
              href="https://drive.google.com/drive/folders/1kiN3uBkhJswbgq8BlFfSAYQlYfiqWEZb" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-3 rounded-xl text-left text-xs uppercase tracking-widest font-bold text-[#E61919]/80 hover:text-[#E61919] hover:bg-[#E61919]/10 transition-colors"
            >
              Raw Vault
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- MAGNETIC CTA ---
function MagneticCTAButton({ text, href }: { text: string; href: string; }) {
  const ref = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<any[]>([]);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    x.set((clientX - (left + width / 2)) * 0.3);
    y.set((clientY - (top + height / 2)) * 0.3);
  };

  const handleClick = () => {
    const newParticles = Array.from({ length: 12 }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / 12 + (Math.random() * 0.5);
      const dist = 50 + Math.random() * 40;
      return { id: Math.random(), x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, size: 10 + Math.random() * 10, duration: 0.4 + Math.random() * 0.3 };
    });
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1000);
  };

  return (
    <motion.div ref={ref} onMouseMove={handleMouse} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ x: springX, y: springY }} className="relative flex items-center justify-center pointer-events-auto p-8 -m-8">
      <div className="relative group pointer-events-none">
        <Link href={href} onClick={handleClick} className="pointer-events-auto relative flex items-center justify-center px-8 py-3.5 rounded-full bg-transparent text-xs md:text-sm uppercase tracking-[0.2em] font-bold text-white z-20 transition-all duration-300">
          <div className="absolute inset-0 rounded-full border border-[#E61919] opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_15px_rgba(230,25,25,0.6)] transition-all duration-300" />
          <span className="relative z-30">{text}</span>
        </Link>
        <div className="absolute inset-0 z-10 pointer-events-none" style={{ filter: 'url(#gooey-nav)' }}>
          {particles.length > 0 && <motion.div initial={{ opacity: 1, scale: 0.8 }} animate={{ opacity: 0, scale: 1.2 }} transition={{ duration: 0.5 }} className="absolute inset-0 bg-[#E61919] rounded-full" />}
          {particles.map((p) => <motion.div key={p.id} initial={{ x: "-50%", y: "-50%", scale: 1, opacity: 1 }} animate={{ x: `calc(-50% + ${p.x}px)`, y: `calc(-50% + ${p.y}px)`, scale: 0, opacity: 0 }} transition={{ duration: p.duration, ease: "easeOut" }} className="absolute top-1/2 left-1/2 bg-[#E61919] rounded-full" style={{ width: p.size, height: p.size }} />)}
        </div>
      </div>
    </motion.div>
  );
}

// --- MAIN HEADER EXPORT ---
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileArchiveOpen, setIsMobileArchiveOpen] = useState(false); // Manages mobile dropdown state

  const navLinks = [
    { name: "About", href: "about", isPage: false },
    { name: "Expertise", href: "results", isPage: false },
    { name: "Watch", href: "work", isPage: false },
  ]; // Note: Archive is removed from here because it's hardcoded as a special component now

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - headerOffset, behavior: "smooth" });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <>
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
        className="fixed top-0 left-0 w-full z-[100] px-6 py-6 md:py-8 lg:py-12 flex justify-center pointer-events-none"
      >
        <div className="absolute top-0 left-0 w-full h-32 md:h-48 lg:h-64 bg-black/80 md:bg-black/70 backdrop-blur-md [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] -z-10 pointer-events-none" />

        <div className="w-full max-w-[1200px] flex justify-between items-center relative pointer-events-none h-16 md:h-20 lg:h-24">
          <Link href="/" className="block z-[200] flex items-center h-full pointer-events-auto">
            <Image src="/kahory-full-logo.png" alt="Kahory Media" width={160} height={64} priority className="h-full w-auto object-contain" />
          </Link>

          <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-2 lg:gap-4 z-[150] pointer-events-none">
            {navLinks.map((item) => (
              <GooeyButton 
                key={item.name} 
                text={item.name} 
                href={item.href} 
                isPage={item.isPage} 
                onClick={item.isPage ? undefined : (e) => handleScroll(e, item.href)} 
              />
            ))}
            
            {/* ✅ THE NEW DESKTOP DROPDOWN COMPONENT */}
            <ArchiveDropdownButton />

          </nav>

          <div className="z-[200] flex items-center h-full pointer-events-auto">
            <div className="hidden md:block">
              <MagneticCTAButton text="Get in touch" href="/contact" />
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 relative z-[200]"
            >
              <motion.span animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="w-6 h-[2px] bg-white block transition-all" />
              <motion.span animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }} className="w-6 h-[2px] bg-white block transition-all" />
              <motion.span animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="w-6 h-[2px] bg-white block transition-all" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[9999] md:hidden pointer-events-auto flex justify-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute top-24 w-[90vw] max-w-[340px] bg-[#0a0a0a]/95 backdrop-blur-3xl border border-white/15 rounded-[2rem] p-6 shadow-2xl flex flex-col items-start"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#E5D3B3] font-bold mb-6 block opacity-80">Menu</span>
              
              <nav className="flex flex-col w-full gap-2 overflow-y-auto max-h-[60vh]">
                
                {/* Standard Links */}
                {navLinks.map((item, i) => (
                  <motion.div key={item.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 + 0.1 }} className="w-full border-b border-white/5">
                    <a href={`#${item.href}`} onClick={(e) => handleScroll(e, item.href)} className="flex items-center justify-between group py-3 w-full">
                      <span className="text-xl font-bold uppercase tracking-widest text-white/80 group-hover:text-white transition-colors">{item.name}</span>
                      <span className="text-white/20">→</span>
                    </a>
                  </motion.div>
                ))}

                {/* ✅ MOBILE ARCHIVE ACCORDION */}
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }} className="w-full border-b border-white/5 flex flex-col">
                  <button 
                    onClick={() => setIsMobileArchiveOpen(!isMobileArchiveOpen)} 
                    className="flex items-center justify-between group py-3 w-full text-left"
                  >
                    <span className="text-xl font-bold uppercase tracking-widest text-white/80 group-hover:text-white transition-colors">Archive</span>
                    <svg className={`w-4 h-4 text-white/20 transition-transform duration-300 ${isMobileArchiveOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  
                  {/* Nested Links */}
                  <AnimatePresence>
                    {isMobileArchiveOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="flex flex-col overflow-hidden"
                      >
                        <Link href="/work" onClick={() => setIsMenuOpen(false)} className="py-2 pl-4 text-sm font-bold tracking-widest uppercase text-white/60 hover:text-white border-l border-white/10 mb-2 mt-1 transition-colors">
                          Case Studies
                        </Link>
                        <a href="https://drive.google.com/drive/folders/1kiN3uBkhJswbgq8BlFfSAYQlYfiqWEZb" target="_blank" rel="noopener noreferrer" className="py-2 pl-4 text-sm font-bold tracking-widest uppercase text-[#E61919]/80 hover:text-[#E61919] border-l border-[#E61919]/40 mb-3 transition-colors flex items-center justify-between">
                          Raw Vault
                          <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* CTA Button */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-6 w-full shrink-0">
                  <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="flex w-full items-center justify-center py-4 rounded-2xl border border-[#E61919] text-xs uppercase tracking-[0.2em] font-bold text-white bg-[#E61919]/10 shadow-[0_0_20px_rgba(230,25,25,0.2)] active:scale-95 transition-transform">
                    Start a Project
                  </Link>
                </motion.div>

              </nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}