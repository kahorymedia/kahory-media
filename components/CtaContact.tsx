"use client";
import { siteData } from "@/data/content";

export default function CtaContact() {
  return (
    <section className="w-full py-32 px-6 md:px-12 bg-foreground text-background">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter max-w-4xl mb-6">
          {siteData.contact.headline}
        </h2>
        <p className="text-lg md:text-xl opacity-70 mb-12 max-w-xl">
          {siteData.contact.subtext}
        </p>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <a 
            href={`mailto:${siteData.brand.email}`}
            className="px-8 py-4 bg-background text-foreground rounded-full font-bold text-lg hover:bg-[#E5D3B3] transition-colors"
          >
            hi@kahorymedia.com
          </a>
          <span className="text-sm opacity-50 uppercase tracking-widest">or</span>
          <a 
            href="#" 
            className="text-lg font-medium hover:text-[#E5D3B3] transition-colors border-b border-background/20 hover:border-[#E5D3B3] pb-1"
          >
            Book a Discovery Call
          </a>
        </div>
        
        {/* REDUNDANT FOOTER SECTION REMOVED FROM HERE */}
      </div>
    </section>
  );
}