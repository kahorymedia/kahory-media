"use client";
import Link from "next/link";

export default function Footer() {
  return (
    // Maintained pb-28 on mobile so the floating CTA doesn't cover anything
    <footer className="w-full pt-20 md:pt-32 pb-28 md:pb-12 px-6 md:px-12 bg-black border-t border-white/5 mt-auto flex justify-center relative overflow-hidden">
      
      {/* Subtle Background Glow for Identity */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#E61919] blur-[150px] opacity-[0.03] pointer-events-none" />

      <div className="w-full max-w-[1200px] flex flex-col z-10">
        
        {/* === TIER 1: BRAND IDENTITY & MAIN CTA === */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-16 md:mb-24">
          
          <div className="flex flex-col max-w-md">
            <span className="text-[#E61919] text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-4 block drop-shadow-sm">
              Kahory Media
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-[0.9] mb-4">
              Stop posting.<br/>
              <span className="text-white/40 italic font-serif font-light lowercase">Start converting.</span>
            </h2>
          </div>

          <div className="flex flex-col md:items-end gap-4 md:gap-6">
            <p className="text-white/40 text-sm md:text-base font-light max-w-[250px] md:max-w-xs md:text-right">
              Ready to build a cinematic pipeline for your brand?
            </p>
            <Link href="/contact" className="group flex items-center gap-4 text-white hover:text-[#E5D3B3] transition-colors duration-500">
              <span className="text-xl md:text-3xl font-bold tracking-tighter border-b-2 border-transparent group-hover:border-[#E5D3B3] pb-1 transition-all duration-300">
                Start a Project
              </span>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#E5D3B3] group-hover:bg-white/5 transition-all duration-500">
                <svg className="w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </Link>
          </div>

        </div>

        {/* === TIER 2: UTILITY LINKS & LEGAL === */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 lg:gap-4 pt-8 border-t border-white/10 text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold">

          {/* LEFT: Identity & Founders */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center text-white/40 w-full lg:w-1/3">
            <span>© 2026 Kahory</span>
            <div className="hidden sm:block w-[1px] h-3 bg-white/20" />
            <div className="flex gap-3">
              <a href="https://www.linkedin.com/in/aabhas911" target="_blank" rel="noopener noreferrer" className="hover:text-[#E5D3B3] transition-colors">
                Aabhas Gupta
              </a>
              <span className="text-white/20">•</span>
              <a href="https://www.linkedin.com/in/tanishsharma1007" target="_blank" rel="noopener noreferrer" className="hover:text-[#E5D3B3] transition-colors">
                Tanish Sharma
              </a>
            </div>
          </div>

          {/* CENTER: Navigation (Added 'Work' here) */}
          <div className="flex flex-wrap gap-8 w-full lg:w-1/3 lg:justify-center">
            <Link href="/services/short-form" className="text-white/70 hover:text-[#E61919] transition-colors">
              Short-Form
            </Link>
            <Link href="/work" className="text-white/70 hover:text-[#E61919] transition-colors">
              Work
            </Link>
            <Link href="/contact" className="text-white/70 hover:text-[#E61919] transition-colors">
              Contact
            </Link>
          </div>

          {/* RIGHT: Socials */}
          <div className="flex gap-8 w-full lg:w-1/3 lg:justify-end">
            <a href="https://www.instagram.com/kahorymedia?igsh=ZWc2bXA1eTk4MW4w" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-[#E5D3B3] transition-colors">
              Instagram
            </a>
            <a href="#" className="text-white/70 hover:text-[#E5D3B3] transition-colors">
              LinkedIn
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}