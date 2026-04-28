"use client";

export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 md:px-12 border-t border-white/5 mt-auto bg-black">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8 opacity-40 text-[10px] uppercase tracking-[0.4em] font-bold">
        <div className="flex gap-12 text-white">
          <span>© 2026 Kahory Media</span>
          <span className="hidden md:block">Aabhas Gupta • Tanish Sharma</span>
        </div>
        <div className="flex gap-10">
          <a 
            href="https://www.instagram.com/kahorymedia?igsh=ZWc2bXA1eTk4MW4w" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-[#E5D3B3] transition-colors"
          >
            Instagram
          </a>
          {/* Kept LinkedIn as a placeholder until you have the link */}
          <a href="#" className="text-white hover:text-[#E5D3B3] transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}