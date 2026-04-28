"use client";

export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 md:px-12 border-t border-white/5 mt-auto bg-black">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8 opacity-40 text-[10px] uppercase tracking-[0.4em] font-bold">
        
        {/* Left Side: Brand & Founders */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-white items-center">
          <span>© 2026 Kahory Media</span>
          <div className="flex gap-4">
            <a 
              href="https://www.linkedin.com/in/YOUR_PROFILE" 
              target="_blank" 
              className="hover:text-[#E5D3B3] transition-colors border-b border-transparent hover:border-[#E5D3B3]"
            >
              Aabhas Gupta
            </a>
            <span className="text-white/20">•</span>
            <a 
              href="https://www.linkedin.com/in/YOUR_PROFILE" 
              target="_blank" 
              className="hover:text-[#E5D3B3] transition-colors border-b border-transparent hover:border-[#E5D3B3]"
            >
              Tanish Sharma
            </a>
          </div>
        </div>

        {/* Right Side: Socials */}
        <div className="flex gap-10">
          <a 
            href="https://www.instagram.com/kahorymedia?igsh=ZWc2bXA1eTk4MW4w" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-[#E5D3B3] transition-colors"
          >
            Instagram
          </a>
          <a 
            href="#" 
            className="text-white hover:text-[#E5D3B3] transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}