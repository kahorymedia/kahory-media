"use client";
import { motion, useMotionTemplate, useMotionValue, useInView } from "framer-motion";
import { MouseEvent, useRef, useEffect, useState } from "react";

const founders = [
  {
    name: "Aabhas Gupta",
    role: "Founder & Creative Head",
    image: "/founder1.jpg", 
    linkedin: "https://www.linkedin.com/in/aabhas911",
  },
  {
    name: "Tanish Sharma",
    role: "Founder & Media Management Head",
    image: "/founder2.jpg", 
    linkedin: "https://www.linkedin.com/in/tanishsharma1007",
  }
];

// --- NATIVE BRANDED METEORS COMPONENT ---
function KahoryMeteors({ count = 25 }: { count?: number }) {
  const [meteors, setMeteors] = useState<any[]>([]);

  useEffect(() => {
    // Generate random properties for each meteor on mount
    setMeteors(
      new Array(count).fill(true).map(() => ({
        id: Math.random(),
        // Randomly start across the top and right side of the screen
        left: Math.floor(Math.random() * 150) - 20 + "%", 
        top: Math.floor(Math.random() * -50) + "%", 
        animationDuration: Math.floor(Math.random() * (8 - 3) + 3) + "s",
        animationDelay: Math.random() * 2 + "s",
        // Randomly alternate between Kahory Gold and Deep Maroon tails
        isGold: Math.random() > 0.4,
      }))
    );
  }, [count]);

  return (
    <>
      <style>{`
        @keyframes meteor-fall {
          0% { transform: rotate(215deg) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          70% { opacity: 1; }
          100% { transform: rotate(215deg) translateX(-1200px); opacity: 0; }
        }
      `}</style>
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {meteors.map((m) => (
          <span
            key={m.id}
            className="absolute h-0.5 w-0.5 rounded-[9999px] bg-white/80 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]"
            style={{
              top: m.top,
              left: m.left,
              animation: `meteor-fall ${m.animationDuration} linear infinite`,
              animationDelay: m.animationDelay,
            }}
          >
            {/* The Glowing Tail */}
            <div 
              className={`absolute top-1/2 -translate-y-1/2 w-[60px] h-[1px] bg-gradient-to-r to-transparent ${
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
  const sectionRef = useRef<HTMLElement>(null);
  // Trigger animation when the section is 10% visible in the viewport
  const isInView = useInView(sectionRef, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <section 
      ref={sectionRef} 
      // Added overflow-hidden so meteors don't bleed into other sections
      className="w-full py-24 px-6 md:px-12 bg-black border-t border-white/5 flex flex-col items-center relative overflow-hidden"
    >
      {/* 1. THE METEOR BACKGROUND */}
      {isInView && <KahoryMeteors count={30} />}

      {/* 2. THE BOTTOM FADE MASK */}
      {/* This ensures the meteors fade out gracefully into pitch black before hitting the CTA section */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black via-black/80 to-transparent z-0 pointer-events-none" />

      {/* 3. THE CONTENT */}
      <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/40 mb-16 font-bold text-center relative z-10">
        The Minds Behind Kahory
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 w-full max-w-4xl relative z-10">
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
      className="group relative flex flex-col w-full h-[400px] md:h-[480px] rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] transition-colors duration-500 hover:border-white/30 cursor-pointer"
    >
      {/* Dynamic Framer Motion Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-20"
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

      {/* The Image (Grayscale by default, full color on hover) */}
      <div className="relative flex-1 p-4 z-10 w-full h-full overflow-hidden">
        <div className="w-full h-full relative rounded-xl overflow-hidden bg-black/50">
          <img
            src={founder.image}
            alt={founder.name}
            className="w-full h-full object-cover transition-all duration-700 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Typography/Info */}
      <div className="relative z-10 p-6 pt-2 flex flex-col gap-1">
        <h3 className="text-white font-bold text-2xl tracking-tight">{founder.name}</h3>
        <p className="text-[#E5D3B3] text-xs font-bold tracking-[0.2em] uppercase opacity-80">
          {founder.role}
        </p>
      </div>
    </a>
  );
}