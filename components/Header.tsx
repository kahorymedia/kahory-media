"use client";
import Link from "next/link";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

// --- THE STANDARD GOOEY NAV BUTTON (Center Links) ---
function GooeyButton({ text, href, isScroll = false, onClick }: { text: string; href: string; isScroll?: boolean; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void; }) {
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
      {isScroll ? (
        <a href={`#${href}`} onClick={handleClick} className={buttonClasses}>{buttonContent}</a>
      ) : (
        <Link href={href} onClick={handleClick} className={buttonClasses}>{buttonContent}</Link>
      )}
      <div className="absolute inset-0 z-10 pointer-events-none" style={{ filter: 'url(#gooey-nav)' }}>
        {particles.length > 0 && <motion.div initial={{ opacity: 1, scale: 0.8 }} animate={{ opacity: 0, scale: 1.2 }} transition={{ duration: 0.5 }} className="absolute inset-0 bg-[#E61919] rounded-full" />}
        {particles.map((p) => <motion.div key={p.id} initial={{ x: "-50%", y: "-50%", scale: 1, opacity: 1 }} animate={{ x: `calc(-50% + ${p.x}px)`, y: `calc(-50% + ${p.y}px)`, scale: 0, opacity: 0 }} transition={{ duration: p.duration, ease: "easeOut" }} className="absolute top-1/2 left-1/2 bg-[#E61919] rounded-full" style={{ width: p.size, height: p.size }} />)}
      </div>
    </div>
  );
}

// --- THE MAGNETIC CTA BUTTON (Top Right) ---
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
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.3); 
    y.set(middleY * 0.3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
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
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className="relative flex items-center justify-center pointer-events-auto p-8 -m-8"
    >
      <div className="relative group pointer-events-none">
        <Link 
          href={href} 
          onClick={handleClick} 
          className="pointer-events-auto relative flex items-center justify-center px-8 py-3.5 rounded-full bg-transparent text-xs md:text-sm uppercase tracking-[0.2em] font-bold text-white z-20 transition-all duration-300"
        >
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

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isMenuOpen]);

  const navLinks = [
    { name: "About", href: "about" },
    { name: "Expertise", href: "results" }, 
    { name: "Watch", href: "work" }
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false); // Close menu on click
    const element = document.getElementById(id);
    
    if (element) {
      const headerOffset = 120; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
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
        // FIX: Scaled down the padding on laptops (md:py-8) but kept it cinematic on big screens (lg:py-12)
        className="fixed top-0 left-0 w-full z-[100] px-6 py-6 md:py-8 lg:py-12 flex justify-center pointer-events-none"
      >
        {/* FIX: Scaled down the blackout gradient background height to match the new header sizing */}
        <div className="absolute top-0 left-0 w-full h-32 md:h-48 lg:h-64 bg-black/80 md:bg-black/70 backdrop-blur-md [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] -z-10 pointer-events-none" />
        
        {/* FIX: Optimized the height of the inner container */}
        <div className="w-full max-w-[1200px] flex justify-between items-center relative pointer-events-none h-16 md:h-20 lg:h-24">
          
          <Link href="/" className="block z-[200] flex items-center h-full pointer-events-auto">
            <img src="/kahory-full-logo.png" alt="Logo" className="h-full w-auto object-contain" />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-4 lg:gap-6 z-[150] pointer-events-none">
            {navLinks.map((item) => (
              <GooeyButton key={item.name} text={item.name} href={item.href} isScroll={true} onClick={(e) => handleScroll(e, item.href)} />
            ))}
          </nav>

          {/* RIGHT CTA / MOBILE MENU TOGGLE */}
          <div className="z-[200] flex items-center h-full pointer-events-auto">
            <div className="hidden md:block">
              <MagneticCTAButton text="Get in touch" href="/contact" />
            </div>
            
            {/* Mobile Hamburger Icon */}
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

      {/* FULLSCREEN MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[140] bg-black/95 flex flex-col items-center justify-center md:hidden pointer-events-auto"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={`#${item.href}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={(e) => handleScroll(e, item.href)}
                  className="text-3xl font-bold uppercase tracking-[0.2em] text-white/70 hover:text-white"
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8">
                <Link 
                  href="/contact" 
                  onClick={() => setIsMenuOpen(false)}
                  className="px-10 py-4 rounded-full border border-[#E61919] text-sm uppercase tracking-[0.2em] font-bold text-white bg-[#E61919]/10 shadow-[0_0_20px_rgba(230,25,25,0.4)]"
                >
                  Get in touch
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}