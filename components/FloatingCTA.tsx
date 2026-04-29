"use client";
import GlassSurface from "./GlassSurface";

export default function FloatingCTA() {
  // In the next step, we will connect this to open the Interactive Funnel Modal
  const openFunnel = () => {
    console.log("Opening Interactive Funnel...");
  };

  return (
    // Positioned dead center, right above the dock (bottom-28)
    <div className="fixed bottom-[110px] md:bottom-[120px] left-1/2 -translate-x-1/2 z-[500] pointer-events-auto">
      <div onClick={openFunnel} className="group cursor-pointer">
        <GlassSurface 
          width={220} 
          height={54} 
          borderRadius={27} 
          blur={8} 
          opacity={0.8}
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-[#E61919] rounded-full animate-pulse shadow-[0_0_8px_#E61919]" />
            <span className="text-white font-bold tracking-[0.2em] text-[10px] md:text-[11px] uppercase group-hover:text-[#E5D3B3] transition-colors">
              Start a Project
            </span>
          </div>
        </GlassSurface>
      </div>
    </div>
  );
}