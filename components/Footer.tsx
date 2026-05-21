"use client";
import Link from "next/link";

export default function Footer() {
  return (
    // Added pb-28 on mobile to ensure the footer content clears the floating CTA
    <footer className="w-full pt-10 pb-28 md:py-12 px-6 md:px-12 border-t border-white/5 mt-auto bg-black flex justify-center">
      <div className="w-full max-w-[1200px] flex flex-col md:flex-row justify-between items-center gap-8 opacity-40 text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-bold text-center md:text-left">
        
        {/* LEFT SIDE: Identity */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-12 text-white items-center">
          <span>© 2026 Kahory Media</span>
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            <a href="https://www.linkedin.com/in/aabhas911" target="_blank" rel="noopener noreferrer" className="hover:text-[#E5D3B3] transition-colors border-b border-transparent hover:border-[#E5D3B3]">
              Aabhas Gupta
            </a>
            <span className="text-white/20">•</span>
            <a href="https://www.linkedin.com/in/tanishsharma1007" target="_blank" rel="noopener noreferrer" className="hover:text-[#E5D3B3] transition-colors border-b border-transparent hover:border-[#E5D3B3]">
              Tanish Sharma
            </a>
          </div>
        </div>

        {/* RIGHT SIDE: Navigation & Socials */}
        <div className="flex flex-wrap justify-center md:justify-end gap-6 md:gap-8 items-center">
          <Link href="/services/short-form" className="text-white hover:text-[#E61919] transition-colors">
            Short-Form
          </Link>
          <Link href="/contact" className="text-white hover:text-[#E61919] transition-colors">
            Contact
          </Link>
          
          <span className="hidden md:block text-white/20">|</span>
          
          <a href="https://www.instagram.com/kahorymedia?igsh=ZWc2bXA1eTk4MW4w" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#E5D3B3] transition-colors">
            Instagram
          </a>
          <a href="#" className="text-white hover:text-[#E5D3B3] transition-colors">
            LinkedIn
          </a>
        </div>

      </div>
    </footer>
  );
}