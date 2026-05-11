"use client";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent, useEffect, useState } from "react";

const founders = [
  {
    name: "Aabhas Gupta",
    role: "Founder & Creative Head",
    image: "/founder1.jpg", 
    linkedin: "https://www.linkedin.com/in/aabhas911",
  },
  {
    name: "Tanish Sharma",
    role: "Founder & Media Mgt",
    image: "/founder2.jpg", 
    linkedin: "https://www.linkedin.com/in/tanishsharma1007",
  }
];

// --- NATIVE BRANDED METEORS COMPONENT ---
function KahoryMeteors({ count = 35 }: { count?: number }) {
  const [meteors, setMeteors] = useState<any[]>([]);

  useEffect(() => {
    setMeteors(
      new Array(count).fill(true).map(() => ({
        id: Math.random(),
        left: Math.floor(Math.random() * 120) + "%", 
        top: Math.floor(Math.random() * 100) - 20 + "%", 
        animationDuration: Math.random() * 4 + 4 + "s", 
        animationDelay: Math.random() * 3 + "s",
        isGold: Math.random() > 0.4,
      }))
    );
  }, [count]);

  return (
    <>
      <style>{`
        @keyframes meteor-fall {
          0% { transform: translate(0px, 0px) rotate(-45deg); opacity: 0; }
          10% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translate(-1500px, 1500px) rotate(-45deg); opacity: 0; }
        }
      `}</style>
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {meteors.map((m) => (
          <span
            key={m.id}
            className="absolute h-[2px] w-[2px] rounded-full bg-white shadow-[0_0_10px_2px_#ffffff]"
            style={{
              top: m.top,
              left: m.left,
              animation: `meteor-fall ${m.animationDuration} linear infinite`,
              animationDelay: m.animationDelay,
            }}
          >
            <div 
              className={`absolute top-1/2 -translate-y-1/2 left-0 w-[120px] h-[1px] bg-gradient-to-r to-transparent ${
                m.isGold ? 'from-[#E5D3B3]' : 'from-[#E61919]'
              }`} 
            />
          </span>
        ))}
      </div>
    </>
  );
}

export default function Founders() {
  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-12 bg-black border-t border-white/5 flex flex-col items-center relative overflow-hidden">
      <KahoryMeteors count={35} />

      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black via-black/80 to-transparent z-0 pointer-events-none" />

      <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/40 mb-10 md:mb-16 font-bold text-center relative z-10">
        The Minds Behind Kahory
      </p>
      
      {/* FIX: Forced grid-cols-2 on mobile so founders stay side-by-side */}
      <div className="grid grid-cols-2 gap-3 md:gap-10 w-full max-w-4xl relative z-10">
        {founders.map((founder, idx) => (
          <FounderCard key={idx} founder={founder} />
        ))}
      </div>
    </section>
  );
}

function FounderCard({ founder }: { founder: any }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <a
      href={founder.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      // FIX: Scaled height massively down for mobile (h-[260px]) so it fits side-by-side
      className="group relative flex flex-col w-full h-[260px] md:h-[480px] rounded-[1.5rem] md:rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] transition-colors duration-500 hover:border-white/30 cursor-pointer"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-20 hidden md:block"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(229, 211, 179, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative flex-1 p-2 md:p-4 z-10 w-full h-full overflow-hidden">
        <div className="w-full h-full relative rounded-xl md:rounded-xl overflow-hidden bg-black/50">
          <img
            src={founder.image}
            alt={founder.name}
            className="w-full h-full object-cover transition-all duration-700 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
          />
        </div>
      </div>

      <div className="relative z-10 p-3 md:p-6 pt-1 md:pt-2 flex flex-col gap-0.5 md:gap-1 text-center md:text-left">
        {/* FIX: Scaled text down to fit the side-by-side grid */}
        <h3 className="text-white font-bold text-sm md:text-2xl tracking-tight">{founder.name}</h3>
        <p className="text-[#E5D3B3] text-[8px] md:text-xs font-bold tracking-[0.15em] md:tracking-[0.2em] uppercase opacity-80 leading-tight">
          {founder.role}
        </p>
      </div>
    </a>
  );
}