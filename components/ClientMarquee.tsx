"use client";

export default function ClientMarquee() {
  const clients = ["Fitness Brand", "F&B Company", "Lifestyle Co.", "Tech Startup", "Infotainment", "Agency Partner"];
  
  // We duplicate the array 4 times. 
  // The CSS animation slides exactly 50% of the way through, creating a flawless, infinite mathematical loop.
  const duplicatedClients = [...clients, ...clients, ...clients, ...clients];

  return (
    <section className="w-full py-20 bg-black overflow-hidden flex flex-col items-center relative border-y border-white/5">
      
      {/* INJECTED NATIVE CSS ENGINE */}
      {/* This replaces 300 lines of JavaScript math with hardware-accelerated CSS physics */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        /* Magically pauses the entire marquee track the second the user hovers over it */
        .marquee-container:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>

      {/* Context Header */}
      <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/40 mb-12 font-bold text-center z-20 pointer-events-none">
        Trusted by ambitious brands
      </p>

      {/* Left & Right Gradient Fade Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Marquee Track Container */}
      <div className="marquee-container w-full flex overflow-hidden">
        <div className="animate-marquee flex whitespace-nowrap gap-16 md:gap-32 w-max items-center py-6">
          {duplicatedClients.map((client, index) => (
            <div 
              key={index} 
              // group/item allows us to target the specific text inside the hovered div
              className="group/item flex items-center justify-center min-w-[150px] cursor-pointer transition-transform duration-500 hover:scale-125 px-4"
            >
              <span className="text-white/30 group-hover/item:text-white group-hover/item:drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] transition-all duration-500 text-xl md:text-3xl font-bold uppercase tracking-[0.2em]">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}