"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false); // Hides cursor until first move

  useEffect(() => {
    // Only run on desktop/devices with a real mouse
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const updateMousePosition = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      // FIX: Increased z-[9999] to z-[999999] so it ALWAYS floats above the funnel modal
      className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[999999] mix-blend-difference flex items-center justify-center"
      animate={{
        x: mousePosition.x - 8, // Offset by half the width/height to center it
        y: mousePosition.y - 8,
        // FIX: Removed the expanding logic. It will now stay a clean, minimal dot.
        scale: 1, 
        opacity: 1,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
        mass: 0.5
      }}
    />
  );
}