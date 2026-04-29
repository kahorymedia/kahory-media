"use client";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

// --- NATIVE SVG ICONS (No external libraries needed) ---
function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

// --- DOCK DATA CONFIGURATION ---
const DOCK_ITEMS = [
  { name: "Home", url: "/", icon: HomeIcon },
  { name: "Instagram", url: "https://www.instagram.com/kahorymedia", icon: InstagramIcon },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/aabhas911", icon: LinkedInIcon },
  { name: "Contact", url: "/contact", icon: MailIcon },
];

export default function FloatingDock() {
  // Tracks the cursor's horizontal position across the dock
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-[500] pointer-events-auto">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="mx-auto flex h-16 items-end gap-3 md:gap-4 rounded-full bg-[#050505]/80 px-4 pb-3 backdrop-blur-md border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
      >
        {DOCK_ITEMS.map((item) => (
          <DockItem key={item.name} item={item} mouseX={mouseX} />
        ))}
      </motion.div>
    </div>
  );
}

function DockItem({ item, mouseX }: { item: typeof DOCK_ITEMS[0]; mouseX: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Measure the distance from the mouse to the absolute center of this specific icon
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Calculate dynamic width. If mouse is perfectly centered (0 distance), it scales to 60px. 
  // If the mouse is far away (150px+ distance), it stays at 40px.
  const widthSync = useTransform(distance, [-150, 0, 150], [40, 60, 40]);
  
  // Wrap the width calculation in a physics spring so it feels "bouncy" and fluid
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <div className="relative flex flex-col items-center">
      {/* THE NATIVE TOOLTIP */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 2 }}
            className="absolute -top-12 px-3 py-1.5 bg-[#E61919] text-white text-[10px] font-bold uppercase tracking-widest rounded-md whitespace-nowrap pointer-events-none"
          >
            {item.name}
            {/* The little triangle pointing down from the tooltip */}
            <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 border-[5px] border-transparent border-t-[#E61919]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* THE MAGNIFYING ICON WRAPPER */}
      <motion.div
        ref={ref}
        style={{ width, height: width }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link 
          href={item.url} 
          className="flex w-full h-full items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-[#E5D3B3] hover:border-[#E5D3B3]/50 transition-colors"
        >
          <item.icon className="w-1/2 h-1/2" />
        </Link>
      </motion.div>
    </div>
  );
}