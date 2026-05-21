"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-10 md:py-12 px-6 md:px-12 border-t border-white/5 mt-auto bg-black flex justify-center">
      <div className="w-full max-w-[1200px] flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 opacity-40 text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-bold text-center md:text-left">
        
        {/* LEFT: Copyright & Founders */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-white items-center w-full md:w-1/3 justify-start">
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

        {/* CENTER: Internal Navigation (The New Service Link) */}
        <div className="flex gap-6 md:gap-10 w-full md:w-1/3 justify-center">
          <Link href="/services/short-form" className="text-white hover:text-[#E61919] transition-colors border-b border-transparent hover:border-[#E61919]">
            Short-Form
          </Link>
          <Link href="/contact" className="text-white hover:text-[#E61919] transition-colors border-b border-transparent hover:border-[#E61919]">
            Contact
          </Link>
        </div>

        {/* RIGHT: Socials */}
        <div className="flex gap-8 md:gap-10 w-full md:w-1/3 justify-center md:justify-end">
          <a href="https://www.instagram.com/kahorymedia?igsh=ZWc2bXA1eTk4MW4w" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#E5D3B3] transition-colors border-b border-transparent hover:border-[#E5D3B3]">
            Instagram
          </a>
          <a href="#" className="text-white hover:text-[#E5D3B3] transition-colors border-b border-transparent hover:border-[#E5D3B3]">
            LinkedIn
          </a>
        </div>

      </div>
    </footer>
  );
}