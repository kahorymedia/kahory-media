"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  
  // 1. PERFORMANCE: Use direct GPU motion values instead of React state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 2. PERFORMANCE: Tighten the spring physics to eliminate the "rubber band" lag
  const springConfig = { damping: 40, stiffness: 600, mass: 0.1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const updateMousePosition = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      // Update values directly, skipping React renders
      mouseX.set(e.clientX - 8); 
      mouseY.set(e.clientY - 8);
    };

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[999999] mix-blend-difference flex items-center justify-center will-change-transform"
      style={{
        x: smoothX,
        y: smoothY,
      }}
    />
  );
}