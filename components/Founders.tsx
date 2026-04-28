"use client";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";

// Swap these image URLs with your actual photos later!
const founders = [
  {
    name: "Aabhas Gupta",
    role: "Founder & Director",
    image: "https://i.pravatar.cc/600?img=11", 
    linkedin: "https://www.linkedin.com/in/YOUR_PROFILE",
  },
  {
    name: "Tanish Sharma",
    role: "Founder & Creative Head",
    image: "https://i.pravatar.cc/600?img=12",
    linkedin: "https://www.linkedin.com/in/YOUR_PROFILE",
  }
];

export default function Founders() {
  return (
    <section className="w-full py-24 px-6 md:px-12 bg-black border-t border-white/5 flex flex-col items-center relative z-10">
      <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/40 mb-16 font-bold text-center">
        The Minds Behind Kahory
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 w-full max-w-4xl">
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