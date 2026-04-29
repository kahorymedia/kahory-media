"use client";
import { siteData } from "@/data/content";

export default function CtaContact() {
  
  const triggerFunnel = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-funnel'));
  };

  return (
    // FIX: Removed hardcoded paddings.
    <section className="w-full bg-foreground text-background flex justify-center">
      <div className="w-full max-w-[1200px] flex flex-col items-center text-center">
        
        {/* FIX: Implemented fluid clamp() typography! */}
        <h2 className="text-[clamp(2.5rem,8vw,5.5rem)] font-bold tracking-tighter max-w-4xl mb-4 md:mb-6 leading-[1.1]">
          {siteData.contact.headline}
        </h2>
        
        <p className="text-sm md:text-xl opacity-70 mb-10 md:mb-12 max-w-xl px-4">
          {siteData.contact.subtext}
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 items-center w-full justify-center">
          <a 
            href={`mailto:${siteData.brand.email}`}
            className="w-full md:w-auto px-6 py-4 md:px-8 bg-background text-foreground rounded-full font-bold text-sm sm:text-base md:text-lg hover:bg-[#E5D3B3] transition-colors"
          >
            hi@kahorymedia.com
          </a>
          
          <span className="text-xs md:text-sm opacity-50 uppercase tracking-widest">or</span>
          
          <button 
            onClick={triggerFunnel}
            className="text-base md:text-lg font-medium hover:text-[#E5D3B3] transition-colors border-b border-background/20 hover:border-[#E5D3B3] pb-1 cursor-pointer"
          >
            Book a Discovery Call
          </button>
        </div>
      </div>
    </section>
  );
}